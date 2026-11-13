import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService } from '../../services/invitationService';
import { ConfirmModal } from '../../components/ConfirmModal';
import { BarcodeModal } from '../../components/BarcodeModal';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  PauseCircle, 
  PlayCircle, 
  QrCode,
  Mail,
  CheckCircle2,
  Calendar,
  Copy,
  Check,
  X
} from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const Invitations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'paused' | 'barcode'>('all');
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  // Custom Modal Confirmation State
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: React.ReactNode;
    confirmText: string;
    variant: 'danger' | 'warning' | 'info';
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Konfirmasi',
    variant: 'danger',
    onConfirm: () => {},
  });

  // VIP Barcode Pass & QR Preview Modal State
  const [barcodeModalData, setBarcodeModalData] = useState<any | null>(null);

  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: invitations, isLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getInvitations,
  });

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    toast.success(`Tautan /invitation/${slug} tersalin!`);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const deleteMutation = useMutation({
    mutationFn: invitationService.deleteInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      toast.success('Undangan berhasil dihapus.');
    },
    onError: () => toast.error('Gagal menghapus undangan.')
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, slug, status }: { id: string; slug: string; status: 'published' | 'paused' }) =>
      invitationService.updateInvitation(id, { status, slug }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', variables.slug] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
      if (variables.status === 'paused') {
        toast.info(`Undangan /invitation/${variables.slug} berhasil dijeda. Halaman publik otomatis dinonaktifkan.`);
      } else {
        toast.success(`Undangan /invitation/${variables.slug} berhasil diaktifkan kembali.`);
      }
    },
    onError: () => toast.error('Gagal mengubah status undangan.')
  });

  const updateBarcodeSettingMutation = useMutation({
    mutationFn: ({ id, slug, currentSettings, enabled }: { id: string; slug: string; currentSettings: any; enabled: boolean }) =>
      invitationService.updateInvitation(id, {
        slug,
        settings: {
          ...(currentSettings || {}),
          use_barcode: enabled,
        },
      }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', variables.slug] });
      setBarcodeModalData(null);
      if (variables.enabled) {
        toast.success(`VIP Barcode aktif untuk /${variables.slug}. Tamu otomatis mendapat tiket QR presensi!`);
      } else {
        toast.info(`Mode Barcode dinonaktifkan untuk /${variables.slug}. Kembali ke Standar RSVP.`);
      }
    },
    onError: () => toast.error('Gagal mengubah pengaturan barcode.')
  });

  // Counts for Top Stat Cards
  const counts = useMemo(() => {
    if (!invitations) return { all: 0, published: 0, paused: 0, barcode: 0 };
    return {
      all: invitations.length,
      published: invitations.filter(i => i.status === 'published').length,
      paused: invitations.filter(i => i.status === 'paused').length,
      barcode: invitations.filter(i => !!i.settings?.use_barcode).length,
    };
  }, [invitations]);

  // Filtering
  const filteredInvitations = useMemo(() => {
    if (!invitations) return [];
    return invitations.filter(inv => {
      // 1. Status Filter
      if (statusFilter === 'published' && inv.status !== 'published') return false;
      if (statusFilter === 'paused' && inv.status !== 'paused') return false;
      if (statusFilter === 'barcode' && !inv.settings?.use_barcode) return false;

      // 2. Search Term
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      const matchTitle = inv.title && inv.title.toLowerCase().includes(term);
      const matchClient = inv.client?.name && inv.client.name.toLowerCase().includes(term);
      const matchSlug = inv.slug && inv.slug.toLowerCase().includes(term);
      return matchTitle || matchClient || matchSlug;
    });
  }, [invitations, statusFilter, searchTerm]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-jakarta">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Invitations Management</h1>
          <p className="text-sm text-stone-500 mt-1">
            Kelola seluruh undangan digital klien, status rilis publik, dan integrasi check-in barcode VIP.
          </p>
        </div>
        <Link 
          to="/admin/invitations/create"
          className="flex items-center space-x-2 bg-primary-800 hover:bg-primary-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-xs transition-all cursor-pointer shrink-0"
        >
          <Plus size={18} />
          <span>Buat Undangan Baru</span>
        </Link>
      </div>

      {/* 4 Interactive KPI / Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        
        {/* All Invitations */}
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'all' 
              ? 'bg-stone-900 text-white border-stone-900 shadow-sm' 
              : 'bg-white border-stone-200/80 hover:border-stone-300 hover:shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-semibold ${statusFilter === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
              Semua Undangan
            </span>
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              statusFilter === 'all' ? 'bg-white/10 text-white' : 'bg-stone-100 text-stone-600'
            }`}>
              <Mail size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-2xl font-bold ${statusFilter === 'all' ? 'text-white' : 'text-stone-900'}`}>
              {counts.all}
            </span>
            <span className={`text-xs ${statusFilter === 'all' ? 'text-stone-300' : 'text-stone-500'}`}>
              Undangan
            </span>
          </div>
          <p className={`text-[11px] mt-1 ${statusFilter === 'all' ? 'text-stone-400' : 'text-stone-400'}`}>
            Seluruh acara pengantin
          </p>
        </button>

        {/* Published Card */}
        <button
          type="button"
          onClick={() => setStatusFilter('published')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'published' 
              ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs' 
              : 'bg-white border-stone-200/80 hover:border-emerald-300 hover:shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">Live / Publikasi</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-950">{counts.published}</span>
            <span className="text-xs font-semibold text-emerald-700">Aktif</span>
          </div>
          <p className="text-[11px] text-emerald-700/80 mt-1">Dapat diakses publik</p>
        </button>

        {/* Paused Card */}
        <button
          type="button"
          onClick={() => setStatusFilter('paused')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'paused' 
              ? 'bg-amber-50/80 border-amber-500 ring-2 ring-amber-500/20 shadow-xs' 
              : 'bg-white border-stone-200/80 hover:border-amber-300 hover:shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Dijeda (Paused)</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <PauseCircle size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-950">{counts.paused}</span>
            <span className="text-xs font-semibold text-amber-700">Tertunda</span>
          </div>
          <p className="text-[11px] text-amber-700/80 mt-1">Nonaktif sementara</p>
        </button>

        {/* VIP Barcode Card */}
        <button
          type="button"
          onClick={() => setStatusFilter('barcode')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            statusFilter === 'barcode' 
              ? 'bg-indigo-50/80 border-indigo-500 ring-2 ring-indigo-500/20 shadow-xs' 
              : 'bg-white border-stone-200/80 hover:border-indigo-300 hover:shadow-2xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-900">VIP Barcode</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
              <QrCode size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-indigo-950">{counts.barcode}</span>
            <span className="text-xs font-semibold text-indigo-700">Check-in</span>
          </div>
          <p className="text-[11px] text-indigo-700/80 mt-1">Sistem scan barcode aktif</p>
        </button>

      </div>

      {/* Main Table Container */}
      <div className="bg-white rounded-2xl shadow-2xs border border-stone-200/80 overflow-hidden">
        
        {/* Search Bar & Filter Summary */}
        <div className="p-4 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-stone-50/40">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={17} />
            <input 
              type="text" 
              placeholder="Cari berdasarkan judul, nama klien, atau slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-9 py-2 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-600 bg-white text-sm placeholder:text-stone-400 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Menampilkan <strong>{filteredInvitations.length}</strong> dari <strong>{counts.all}</strong> undangan</span>
            {statusFilter !== 'all' && (
              <button
                onClick={() => setStatusFilter('all')}
                className="text-primary-700 font-semibold hover:underline cursor-pointer ml-1"
              >
                Reset Filter
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-stone-600">
            <thead className="bg-stone-50 text-stone-700 uppercase font-semibold border-b border-stone-200 text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4">Judul &amp; Tautan Undangan</th>
                <th className="px-6 py-4">Klien / Mempelai</th>
                <th className="px-6 py-4">Status Publik</th>
                <th className="px-6 py-4">Tanggal Acara</th>
                <th className="px-6 py-4 text-right">Aksi Cepat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="w-7 h-7 border-2 border-stone-300 border-t-primary-800 rounded-full animate-spin" />
                      <span className="text-xs font-medium">Memuat data undangan...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredInvitations?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-400">
                    <Mail size={32} className="mx-auto text-stone-300 mb-2" />
                    <p className="text-sm font-semibold text-stone-700">Tidak ada undangan yang cocok</p>
                    <p className="text-xs text-stone-400 mt-0.5">Coba ubah kata kunci pencarian atau reset filter.</p>
                  </td>
                </tr>
              ) : (
                filteredInvitations?.map(invitation => {
                  const isPublished = invitation.status === 'published';
                  const isPaused = invitation.status === 'paused';
                  const isCopied = copiedSlug === invitation.slug;

                  return (
                    <tr key={invitation.id} className="hover:bg-stone-50/70 transition-colors">
                      
                      {/* Title & Slug */}
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-stone-900 text-sm">{invitation.title || 'Tanpa Judul'}</span>
                            {invitation.settings?.use_barcode ? (
                              <button
                                type="button"
                                onClick={() => setBarcodeModalData(invitation)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
                                title="Fitur Barcode VIP Aktif. Klik untuk lihat tiket QR / atur mode"
                              >
                                <QrCode size={11} className="text-amber-600" />
                                <span>VIP Barcode</span>
                              </button>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setBarcodeModalData(invitation)}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-100 text-stone-600 border border-stone-200 hover:bg-stone-200/80 transition-colors cursor-pointer"
                                title="Standar RSVP. Klik untuk aktifkan tiket QR Barcode"
                              >
                                <span>Standar RSVP</span>
                              </button>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <code className="text-stone-500 text-xs font-mono bg-stone-100 px-1.5 py-0.5 rounded">
                              /{invitation.slug}
                            </code>
                            <button
                              onClick={() => handleCopyLink(invitation.slug)}
                              title="Salin tautan undangan"
                              className="text-stone-400 hover:text-stone-700 p-0.5 rounded transition-colors cursor-pointer"
                            >
                              {isCopied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Client */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-800 font-bold text-xs flex items-center justify-center shrink-0">
                            {invitation.client?.name?.charAt(0) || 'K'}
                          </div>
                          <span className="font-semibold text-stone-900 text-sm">
                            {invitation.client?.name || '-'}
                          </span>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                          isPaused ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          invitation.status === 'archived' ? 'bg-red-50 text-red-700 border border-red-200' : 
                          'bg-stone-100 text-stone-700 border border-stone-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isPublished ? 'bg-emerald-500 animate-pulse' :
                            isPaused ? 'bg-amber-500' : 'bg-stone-400'
                          }`} />
                          {invitation.status}
                        </span>
                      </td>

                      {/* Wedding Date */}
                      <td className="px-6 py-4 text-stone-500">
                        {invitation.wedding_date ? (
                          <div className="flex items-center gap-1.5 text-xs font-medium">
                            <Calendar size={13} className="text-stone-400" />
                            <span>{format(new Date(invitation.wedding_date), 'dd MMM yyyy')}</span>
                          </div>
                        ) : (
                          <span className="text-stone-400 text-xs">-</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          
                          {/* 1. VIP Barcode Modal Trigger */}
                          <button
                            onClick={() => setBarcodeModalData(invitation)}
                            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all cursor-pointer ${
                              invitation.settings?.use_barcode
                                ? 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200 shadow-2xs font-bold'
                                : 'bg-stone-50 text-stone-400 border-stone-200 hover:text-stone-700 hover:bg-stone-100'
                            }`}
                            title={
                              invitation.settings?.use_barcode
                                ? 'VIP Barcode Aktif (Klik untuk lihat tiket QR & atur mode)'
                                : 'Standar RSVP (Klik untuk lihat & aktifkan VIP Barcode)'
                            }
                          >
                            <QrCode size={16} />
                          </button>

                          {/* 2. Pause / Resume Action Toggle */}
                          {isPublished ? (
                            <button
                              onClick={() => {
                                setConfirmDialog({
                                  isOpen: true,
                                  title: 'Jeda Undangan Publik',
                                  message: (
                                    <div className="space-y-1.5">
                                      <p>Jeda undangan <strong className="text-stone-900">"{invitation.title}"</strong>?</p>
                                      <p className="text-xs text-stone-500">Website publik akan otomatis dinonaktifkan sementara dan menampilkan layar penangguhan ke tamu tanpa menghapus data undangan.</p>
                                    </div>
                                  ),
                                  confirmText: 'Ya, Jeda Undangan',
                                  variant: 'warning',
                                  onConfirm: () => {
                                    updateStatusMutation.mutate({ id: invitation.id, slug: invitation.slug, status: 'paused' });
                                    setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                                  }
                                });
                              }}
                              className="w-8 h-8 rounded-lg bg-stone-50 text-amber-600 border border-stone-200 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                              title="Jeda Undangan (Otomatis Nonaktifkan Web Publik)"
                            >
                              <PauseCircle size={16} />
                            </button>
                          ) : (
                            <button
                              onClick={() => {
                                updateStatusMutation.mutate({ id: invitation.id, slug: invitation.slug, status: 'published' });
                              }}
                              className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-100 transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                              title="Aktifkan Kembali Undangan (Web Publik Live)"
                            >
                              <PlayCircle size={16} />
                            </button>
                          )}

                          {/* 3. View Public Page */}
                          <a 
                            href={`/invitation/${invitation.slug}`} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="w-8 h-8 rounded-lg bg-stone-50 text-stone-500 border border-stone-200 hover:text-primary-800 hover:bg-primary-50 hover:border-primary-300 transition-all flex items-center justify-center cursor-pointer shadow-2xs" 
                            title="Buka Undangan Langsung (Preview)"
                          >
                            <ExternalLink size={16} />
                          </a>

                          {/* 4. Edit */}
                          <Link 
                            to={`/admin/invitations/${invitation.id}`} 
                            className="w-8 h-8 rounded-lg bg-stone-50 text-stone-500 border border-stone-200 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center cursor-pointer shadow-2xs" 
                            title="Edit Data Undangan"
                          >
                            <Edit2 size={16} />
                          </Link>

                          {/* 5. Delete */}
                          <button 
                            onClick={() => {
                              setConfirmDialog({
                                isOpen: true,
                                title: 'Hapus Undangan',
                                message: (
                                  <div className="space-y-1.5">
                                    <p>Yakin ingin menghapus undangan <strong className="text-stone-900">"{invitation.title}"</strong>?</p>
                                    <p className="text-xs text-stone-500">Tautan <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700 font-mono">/invitation/{invitation.slug}</code> dan seluruh data acara pengantin akan dihapus secara permanen.</p>
                                  </div>
                                ),
                                confirmText: 'Ya, Hapus Undangan',
                                variant: 'danger',
                                onConfirm: () => {
                                  deleteMutation.mutate(invitation.id);
                                  setConfirmDialog(prev => ({ ...prev, isOpen: false }));
                                }
                              });
                            }}
                            className="w-8 h-8 rounded-lg bg-stone-50 text-stone-400 border border-stone-200 hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-all flex items-center justify-center cursor-pointer shadow-2xs" 
                            title="Hapus Undangan"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reusable Luxury Confirm Modal */}
      <ConfirmModal
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        confirmText={confirmDialog.confirmText}
        variant={confirmDialog.variant}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() => setConfirmDialog(prev => ({ ...prev, isOpen: false }))}
      />

      {/* VIP Barcode Pass & QR Preview Modal */}
      <BarcodeModal
        isOpen={!!barcodeModalData}
        onClose={() => setBarcodeModalData(null)}
        invitation={barcodeModalData}
        isLoading={updateBarcodeSettingMutation.isPending}
        onSave={(enabled) => {
          if (!barcodeModalData) return;
          updateBarcodeSettingMutation.mutate({
            id: barcodeModalData.id,
            slug: barcodeModalData.slug,
            currentSettings: barcodeModalData.settings,
            enabled,
          });
        }}
      />
    </div>
  );
};
