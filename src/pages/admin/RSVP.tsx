import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { rsvpService, RSVPItem } from '../../services/rsvpService';
import { invitationService } from '../../services/invitationService';
import { 
  Search, 
  Trash2, 
  Download, 
  Users, 
  CheckCircle2, 
  XCircle, 
  Filter,
  MessageSquare,
  Building2
} from 'lucide-react';
import { format } from 'date-fns';
import { id as localeId } from 'date-fns/locale';
import { useToast } from '../../context/ToastContext';

export const RSVP: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvitationId, setSelectedInvitationId] = useState<string>('');
  const [selectedAttendance, setSelectedAttendance] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const toast = useToast();

  // Fetch all invitations for client/invitation filter
  const { data: invitations } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getInvitations,
  });

  // Fetch RSVPs (optionally filtered by invitation)
  const { data: rsvps, isLoading } = useQuery({
    queryKey: ['rsvps', selectedInvitationId],
    queryFn: () => rsvpService.getAllRsvps(selectedInvitationId || undefined),
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: rsvpService.deleteRsvp,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rsvps'] });
      toast.success('Data RSVP berhasil dihapus.');
      setDeletingId(null);
    },
    onError: () => {
      toast.error('Gagal menghapus data RSVP.');
      setDeletingId(null);
    },
  });

  // Filtered RSVPs by search and attendance
  const filteredRsvps = useMemo(() => {
    if (!rsvps) return [];
    return rsvps.filter((item) => {
      const matchSearch = 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));

      const isAttending = item.attendance === 'attending' || (item as any).attending === true;
      const matchAttendance = 
        selectedAttendance === 'all' ||
        (selectedAttendance === 'attending' && isAttending) ||
        (selectedAttendance === 'not_attending' && !isAttending);

      return matchSearch && matchAttendance;
    });
  }, [rsvps, searchTerm, selectedAttendance]);

  // Statistics calculation
  const stats = useMemo(() => {
    if (!rsvps) return { total: 0, attending: 0, notAttending: 0, totalGuests: 0 };
    let attending = 0;
    let notAttending = 0;
    let totalGuests = 0;

    rsvps.forEach((item) => {
      const isAttending = item.attendance === 'attending' || (item as any).attending === true;
      const count = Number(item.number_of_guests || (item as any).guests_count || 1);
      if (isAttending) {
        attending += 1;
        totalGuests += count;
      } else {
        notAttending += 1;
      }
    });

    return {
      total: rsvps.length,
      attending,
      notAttending,
      totalGuests,
    };
  }, [rsvps]);

  // CSV Export handler
  const handleExportCSV = () => {
    if (!filteredRsvps || filteredRsvps.length === 0) {
      toast.error('Tidak ada data RSVP untuk diekspor.');
      return;
    }

    const headers = ['No', 'Nama Tamu', 'Status Kehadiran', 'Jumlah Tamu', 'Doa & Ucapan', 'Undangan', 'Klien', 'Waktu'];
    const rows = filteredRsvps.map((item, index) => {
      const isAttending = item.attendance === 'attending' || (item as any).attending === true;
      const count = item.number_of_guests || (item as any).guests_count || 1;
      const invTitle = item.invitation?.title || 'The Wedding of Agni & Putri';
      const clientName = item.invitation?.client?.name || 'AGNI KAHURIPAN';
      const dateStr = item.created_at ? format(new Date(item.created_at), 'yyyy-MM-dd HH:mm') : '-';
      const cleanMessage = item.message ? `"${item.message.replace(/"/g, '""')}"` : '""';

      return [
        index + 1,
        `"${item.name.replace(/"/g, '""')}"`,
        isAttending ? 'Hadir' : 'Berhalangan',
        isAttending ? count : 0,
        cleanMessage,
        `"${invTitle.replace(/"/g, '""')}"`,
        `"${clientName.replace(/"/g, '""')}"`,
        `"${dateStr}"`
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `data-rsvp-${format(new Date(), 'yyyyMMdd-HHmm')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success('File CSV berhasil diunduh!');
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Export Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">RSVP &amp; Buku Tamu</h1>
          <p className="text-sm text-gray-500 mt-1">
            Data kehadiran dan doa restu tamu undangan secara real-time per klien.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={!filteredRsvps || filteredRsvps.length === 0}
          className="flex items-center space-x-2 bg-white text-gray-700 border border-gray-300 px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors font-medium shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Download size={18} className="text-gray-500" />
          <span>Ekspor CSV</span>
        </button>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Users size={22} />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Total Respons</div>
            <div className="text-2xl font-bold text-gray-900 mt-0.5">{stats.total}</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Konfirmasi Hadir</div>
            <div className="text-2xl font-bold text-gray-900 mt-0.5">
              {stats.attending}{' '}
              <span className="text-xs font-normal text-gray-500">
                ({stats.totalGuests} orang)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <XCircle size={22} />
          </div>
          <div>
            <div className="text-xs font-medium text-gray-500 uppercase tracking-wider">Berhalangan</div>
            <div className="text-2xl font-bold text-gray-900 mt-0.5">{stats.notAttending}</div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          
          {/* Client / Invitation Selector */}
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Building2 size={18} className="text-gray-400 shrink-0" />
            <select
              value={selectedInvitationId}
              onChange={(e) => setSelectedInvitationId(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
            >
              <option value="">Semua Klien &amp; Undangan</option>
              {invitations?.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.title || inv.slug} ({inv.client?.name || 'Tanpa Klien'})
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center flex-1 md:justify-end">
            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-400 shrink-0" />
              <select
                value={selectedAttendance}
                onChange={(e) => setSelectedAttendance(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="all">Semua Kehadiran</option>
                <option value="attending">Hanya Hadir</option>
                <option value="not_attending">Hanya Berhalangan</option>
              </select>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari nama tamu / ucapan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Tamu Undangan</th>
                <th className="px-6 py-4">Klien / Undangan</th>
                <th className="px-6 py-4">Kehadiran</th>
                <th className="px-6 py-4">Doa &amp; Ucapan</th>
                <th className="px-6 py-4">Waktu</th>
                <th className="px-6 py-4 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Memuat data RSVP...
                  </td>
                </tr>
              ) : filteredRsvps.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center max-w-sm mx-auto space-y-2">
                      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                        <MessageSquare size={22} />
                      </div>
                      <div className="font-semibold text-gray-800">Belum ada data RSVP</div>
                      <p className="text-xs text-gray-500">
                        {selectedInvitationId 
                          ? 'Belum ada konfirmasi kehadiran tamu untuk undangan klien yang dipilih.'
                          : 'Tamu yang mengisi form RSVP di undangan pernikahan akan otomatis tercatat di sini.'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRsvps.map((item) => {
                  const isAttending = item.attendance === 'attending' || (item as any).attending === true;
                  const guestCount = item.number_of_guests || (item as any).guests_count || 1;
                  const invTitle = item.invitation?.title || 'The Wedding of Agni & Putri';
                  const clientName = item.invitation?.client?.name || 'AGNI KAHURIPAN';

                  return (
                    <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* Guest Name & Avatar */}
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {item.name ? item.name.charAt(0).toUpperCase() : 'T'}
                          </div>
                          <span className="font-semibold text-gray-900">{item.name}</span>
                        </div>
                      </td>

                      {/* Client / Invitation Info */}
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-800 text-xs">{invTitle}</div>
                        <div className="text-gray-400 text-[11px] mt-0.5">{clientName}</div>
                      </td>

                      {/* Attendance Badge */}
                      <td className="px-6 py-4">
                        {isAttending ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={13} />
                            <span>Hadir ({guestCount} orang)</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                            <XCircle size={13} />
                            <span>Berhalangan</span>
                          </span>
                        )}
                      </td>

                      {/* Message */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-gray-600 italic text-xs line-clamp-2" title={item.message || ''}>
                          {item.message ? `"${item.message}"` : <span className="text-gray-400 not-italic">Tanpa pesan</span>}
                        </p>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                        {item.created_at ? (
                          format(new Date(item.created_at), 'd MMM yyyy, HH:mm', { locale: localeId })
                        ) : (
                          '-'
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus konfirmasi RSVP dari "${item.name}"?`)) {
                              setDeletingId(item.id);
                              deleteMutation.mutate(item.id);
                            }
                          }}
                          disabled={deletingId === item.id}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus RSVP"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
