import React, { useState, useMemo, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  guestService, 
  Guest 
} from '../../services/guestService';
import { invitationService } from '../../services/invitationService';
import { 
  Search, 
  Upload, 
  Download, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  ExternalLink, 
  Users, 
  FileSpreadsheet, 
  Share2, 
  MessageSquare, 
  Globe, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight, 
  X,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Guests: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInvitationId, setSelectedInvitationId] = useState<string>('e2000000-0000-0000-0000-000000000002');
  const [customDomain, setCustomDomain] = useState<string>('https://rsvp.wdgroupcompany.biz.id');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(25);

  // Modals state
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkCopyModalOpen, setIsBulkCopyModalOpen] = useState(false);
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Single Guest Form State
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestPhone, setNewGuestPhone] = useState('');
  const [newGuestCode, setNewGuestCode] = useState('');

  // Import Modal State
  const [importTab, setImportTab] = useState<'upload' | 'paste'>('upload');
  const [rawPastedText, setRawPastedText] = useState('');
  const [parsedPreview, setParsedPreview] = useState<{ name: string; phone?: string; code?: string }[]>([]);
  const [importMode, setImportMode] = useState<'append' | 'replace'>('append');
  const [isParsing, setIsParsing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const toast = useToast();

  // 1. Fetch Invitations for selector
  const { data: invitations } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getInvitations,
  });

  // Current selected invitation
  const currentInvitation = useMemo(() => {
    if (!invitations || invitations.length === 0) {
      return {
        id: 'e2000000-0000-0000-0000-000000000002',
        title: 'The Wedding of Agni & Putri',
        slug: 'agni-putri'
      };
    }
    const found = invitations.find(inv => inv.id === selectedInvitationId);
    return found || invitations[0];
  }, [invitations, selectedInvitationId]);

  // Active slug
  const activeSlug = currentInvitation?.slug || 'agni-putri';

  // 2. Fetch Guests
  const { data: guests, isLoading } = useQuery({
    queryKey: ['guests', selectedInvitationId],
    queryFn: () => guestService.getGuests(selectedInvitationId || undefined),
  });

  // Helper to generate full URL
  const getGuestUrl = (guestName: string) => {
    const cleanDomain = (customDomain.trim() || 'https://rsvp.wdgroupcompany.biz.id').replace(/\/+$/, '');
    const encoded = encodeURIComponent(guestName.trim());
    return `${cleanDomain}/invitation/${activeSlug}?to=${encoded}`;
  };

  // Helper to generate WhatsApp invitation message
  const getWhatsAppMessage = (guestName: string) => {
    const link = getGuestUrl(guestName);
    return `Kepada Yth.
Bapak/Ibu/Saudara/i *${guestName}*

Assalamu'alaikum Warahmatullahi Wabarakatuh / Salam Sejahtera,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 *${currentInvitation.title || 'The Wedding of Agni & Putri'}*
📅 *Minggu, 25 Oktober 2026*

Untuk informasi jadwal acara, peta lokasi, dan konfirmasi kehadiran, silakan buka tautan undangan digital berikut:
${link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Wassalamu'alaikum Warahmatullahi Wabarakatuh.`;
  };

  // Mutations
  const addMutation = useMutation({
    mutationFn: guestService.addGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Tamu berhasil ditambahkan.');
      setIsAddModalOpen(false);
      setNewGuestName('');
      setNewGuestPhone('');
      setNewGuestCode('');
    },
    onError: () => toast.error('Gagal menambahkan tamu.')
  });

  const batchAddMutation = useMutation({
    mutationFn: guestService.addBatchGuests,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success(`${data.length} tamu berhasil diimpor.`);
      setIsImportModalOpen(false);
      setParsedPreview([]);
      setRawPastedText('');
      if (fileInputRef.current) fileInputRef.current.value = '';
    },
    onError: () => toast.error('Gagal mengimpor daftar tamu.')
  });

  const deleteMutation = useMutation({
    mutationFn: guestService.deleteGuest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Data tamu berhasil dihapus.');
      setDeletingId(null);
    },
    onError: () => {
      toast.error('Gagal menghapus data tamu.');
      setDeletingId(null);
    }
  });

  const clearAllMutation = useMutation({
    mutationFn: () => guestService.clearGuests(selectedInvitationId || undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guests'] });
      toast.success('Seluruh data tamu berhasil dikosongkan.');
      setIsClearConfirmOpen(false);
    },
    onError: () => toast.error('Gagal mengosongkan data tamu.')
  });

  // Parse CSV / Text Logic
  const parseRawInput = (text: string) => {
    if (!text || text.trim() === '') {
      setParsedPreview([]);
      return;
    }

    setIsParsing(true);
    try {
      const lines = text
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0);

      if (lines.length === 0) {
        setParsedPreview([]);
        setIsParsing(false);
        return;
      }

      // Check if line 1 is header
      const firstLineLower = lines[0].toLowerCase();
      const hasHeader = 
        firstLineLower.includes('nama') || 
        firstLineLower.includes('name') || 
        firstLineLower.includes('phone') || 
        firstLineLower.includes('telepon') ||
        firstLineLower.includes('no_hp');

      const dataLines = hasHeader ? lines.slice(1) : lines;
      const parsedItems: { name: string; phone?: string; code?: string }[] = [];

      dataLines.forEach((line, idx) => {
        // Detect delimiter (comma, semicolon, tab)
        let delimiter = ',';
        if (line.includes('\t')) delimiter = '\t';
        else if (line.includes(';')) delimiter = ';';
        else if (line.includes(',')) delimiter = ',';
        else delimiter = '';

        let name = '';
        let phone = '';

        if (delimiter) {
          const parts = line.split(delimiter).map(p => p.trim().replace(/^["']|["']$/g, ''));
          name = parts[0] || '';
          phone = parts[1] || '';
        } else {
          name = line.replace(/^["']|["']$/g, '').trim();
        }

        // Clean number prefixes if any (e.g., "1. aan" -> "aan")
        name = name.replace(/^\d+[\.\-\)]\s*/, '').trim();

        if (name) {
          parsedItems.push({
            name,
            phone: phone || undefined,
            code: `GST-${String(idx + 1).padStart(3, '0')}`
          });
        }
      });

      setParsedPreview(parsedItems);
    } catch (err) {
      console.error('Error parsing input:', err);
      toast.error('Terjadi kesalahan saat memproses data input.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      parseRawInput(content);
    };
    reader.onerror = () => {
      toast.error('Gagal membaca file yang dipilih.');
    };
    reader.readAsText(file);
  };

  const handleExecuteImport = async () => {
    if (parsedPreview.length === 0) {
      toast.error('Tidak ada data tamu yang valid untuk diimpor.');
      return;
    }

    if (importMode === 'replace') {
      await guestService.clearGuests(selectedInvitationId);
    }

    const payload = parsedPreview.map((item, idx) => ({
      invitation_id: selectedInvitationId,
      name: item.name,
      phone: item.phone || null,
      guest_code: item.code || `GST-${String(idx + 1).padStart(3, '0')}`,
      status: 'active'
    }));

    batchAddMutation.mutate(payload);
  };

  // Copy Single Link
  const handleCopyLink = (id: string, name: string) => {
    const url = getGuestUrl(name);
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    toast.success(`Link untuk ${name} berhasil disalin!`);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy WhatsApp Message
  const handleSendWhatsApp = (name: string, phone?: string | null) => {
    const msg = getWhatsAppMessage(name);
    const cleanPhone = phone ? phone.replace(/[^0-9]/g, '') : '';
    const targetUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(targetUrl, '_blank');
  };

  // Export CSV
  const handleExportCSV = () => {
    if (!filteredGuests || filteredGuests.length === 0) {
      toast.error('Tidak ada data tamu untuk diekspor.');
      return;
    }

    const headers = ['No', 'Nama Tamu', 'Kode Tamu', 'Nomor Telepon', 'Link Undangan Online'];
    const rows = filteredGuests.map((g, idx) => [
      idx + 1,
      `"${g.name.replace(/"/g, '""')}"`,
      `"${g.guest_code || ''}"`,
      `"${g.phone || ''}"`,
      `"${getGuestUrl(g.name)}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `daftar-tamu-${activeSlug}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Daftar tamu berhasil diunduh dalam format CSV.');
  };

  // Filtered Guests
  const filteredGuests = useMemo(() => {
    if (!guests) return [];
    return guests.filter(g => {
      const matchSearch = 
        g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (g.guest_code && g.guest_code.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (g.phone && g.phone.includes(searchTerm));
      return matchSearch;
    });
  }, [guests, searchTerm]);

  // Pagination Logic
  const totalItems = filteredGuests.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedGuests = useMemo(() => {
    if (pageSize >= 1000) return filteredGuests;
    const start = (currentPage - 1) * pageSize;
    return filteredGuests.slice(start, start + pageSize);
  }, [filteredGuests, currentPage, pageSize]);

  // Bulk Links Text
  const bulkLinksText = useMemo(() => {
    if (!filteredGuests) return '';
    return filteredGuests
      .map((g, idx) => `${idx + 1}. ${g.name} - ${getGuestUrl(g.name)}`)
      .join('\n');
  }, [filteredGuests, customDomain, activeSlug]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Users size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manajemen Tamu Undangan</h1>
              <p className="text-sm text-gray-500">
                Kelola nama tamu, impor CSV massal, dan bagikan tautan personal otomatis ke WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs cursor-pointer"
          >
            <Upload size={16} />
            Impor CSV / Teks
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-4 py-2.5 rounded-xl font-medium text-sm transition-all shadow-xs cursor-pointer"
          >
            <Plus size={16} />
            Tambah Tamu
          </button>

          <button
            onClick={() => setIsBulkCopyModalOpen(true)}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
            title="Salin Semua Link untuk Diberikan ke Klien"
          >
            <Copy size={16} />
            Salin Semua Link
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
            title="Download CSV"
          >
            <Download size={16} />
            Unduh CSV
          </button>
        </div>
      </div>

      {/* 2. Filter & Domain Settings Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-5 rounded-2xl shadow-xs border border-gray-100">
        {/* Invitation Selector */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Pilih Undangan Digital
          </label>
          <select
            value={selectedInvitationId}
            onChange={(e) => {
              setSelectedInvitationId(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
          >
            <option value="e2000000-0000-0000-0000-000000000002">
              The Wedding of Agni & Putri (/invitation/agni-putri)
            </option>
            {invitations?.filter(inv => inv.id !== 'e2000000-0000-0000-0000-000000000002').map(inv => (
              <option key={inv.id} value={inv.id}>
                {inv.title || 'Undangan'} (/invitation/{inv.slug})
              </option>
            ))}
          </select>
        </div>

        {/* Custom Domain Input */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider flex items-center justify-between">
            <span>Domain Website Resmi</span>
            <span className="text-[11px] text-amber-600 font-normal">Otomatis Terhubung</span>
          </label>
          <div className="relative">
            <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={customDomain}
              onChange={(e) => setCustomDomain(e.target.value)}
              placeholder="https://rsvp.wdgroupcompany.biz.id"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
            />
          </div>
        </div>

        {/* Quick Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1.5 uppercase tracking-wider">
            Cari Tamu ({filteredGuests.length} Ditemukan)
          </label>
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Ketik nama atau kode tamu..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. Stats Mini Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Total Tamu</span>
            <p className="text-2xl font-bold text-gray-900">{guests?.length || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Link Siap Bagikan</span>
            <p className="text-2xl font-bold text-amber-600">{guests?.length || 0}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Share2 size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Slug Undangan</span>
            <p className="text-sm font-bold text-gray-900 truncate max-w-[140px]">{activeSlug}</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ExternalLink size={18} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Reset Semua Tamu</span>
            <button
              onClick={() => setIsClearConfirmOpen(true)}
              className="text-xs text-red-600 hover:text-red-700 font-semibold block mt-1 hover:underline cursor-pointer"
            >
              Kosongkan Data
            </button>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Trash2 size={18} />
          </div>
        </div>
      </div>

      {/* 4. Guest Table */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-100 overflow-hidden">
        {isLoading ? (
          <div className="py-20 text-center">
            <RefreshCw size={28} className="animate-spin text-amber-600 mx-auto mb-3" />
            <p className="text-sm text-gray-500">Memuat data tamu undangan...</p>
          </div>
        ) : filteredGuests.length === 0 ? (
          <div className="py-20 px-6 text-center">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileSpreadsheet size={30} />
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {searchTerm ? 'Tidak ada tamu yang cocok dengan pencarian' : 'Belum Ada Daftar Tamu'}
            </h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
              {searchTerm 
                ? `Coba kata kunci pencarian lain untuk nama "${searchTerm}".`
                : 'Mulai dengan mengimpor daftar tamu dari file CSV atau tempel teks nama langsung.'}
            </p>
            {!searchTerm && (
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setIsImportModalOpen(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
                >
                  Impor File CSV Sekarang
                </button>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-5 py-2.5 rounded-xl font-medium text-sm transition-all cursor-pointer"
                >
                  Tambah Manual
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50/75 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3.5 px-4 w-12 text-center">No</th>
                    <th className="py-3.5 px-4">Nama Tamu</th>
                    <th className="py-3.5 px-4">Kode Tamu</th>
                    <th className="py-3.5 px-4">Tautan Undangan Personal</th>
                    <th className="py-3.5 px-4 text-center w-44">Aksi Cepat</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedGuests.map((guest, index) => {
                    const rowNumber = (currentPage - 1) * pageSize + index + 1;
                    const url = getGuestUrl(guest.name);
                    const isCopied = copiedId === guest.id;

                    return (
                      <tr key={guest.id} className="hover:bg-amber-50/30 transition-colors">
                        <td className="py-3.5 px-4 text-center font-mono text-gray-400 text-xs">
                          {rowNumber}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="font-semibold text-gray-900 block">{guest.name}</span>
                          {guest.phone && (
                            <span className="text-xs text-gray-400 font-mono">{guest.phone}</span>
                          )}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-xs font-mono font-medium">
                            {guest.guest_code || `GST-${String(rowNumber).padStart(3, '0')}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2 max-w-md">
                            <span className="truncate text-xs font-mono text-gray-500 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-200/60 select-all">
                              {url}
                            </span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Copy Link */}
                            <button
                              onClick={() => handleCopyLink(guest.id, guest.name)}
                              className={`p-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                                isCopied 
                                  ? 'bg-emerald-600 text-white' 
                                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                              }`}
                              title="Salin Link Undangan"
                            >
                              {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            </button>

                            {/* WhatsApp Share */}
                            <button
                              onClick={() => handleSendWhatsApp(guest.name, guest.phone)}
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all cursor-pointer"
                              title="Kirim ke WhatsApp"
                            >
                              <MessageSquare size={14} />
                            </button>

                            {/* Open Direct in New Tab */}
                            <a
                              href={url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-all"
                              title="Buka Undangan"
                            >
                              <ExternalLink size={14} />
                            </a>

                            {/* Delete Guest */}
                            <button
                              onClick={() => {
                                if (window.confirm(`Hapus tamu "${guest.name}"?`)) {
                                  deleteMutation.mutate(guest.id);
                                }
                              }}
                              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                              title="Hapus Tamu"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination & Summary Bar */}
            <div className="p-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span>
                  Menampilkan {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalItems)} dari {totalItems} tamu
                </span>
                <div className="flex items-center gap-1">
                  <span>Per halaman:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="border border-gray-200 rounded-md px-2 py-1 bg-white text-gray-700"
                  >
                    <option value={15}>15</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                    <option value={1000}>Semua</option>
                  </select>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="px-3 py-1 font-medium text-gray-700">
                    Halaman {currentPage} dari {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ========================================================================= */}
      {/* MODAL: Import CSV / Teks                                                  */}
      {/* ========================================================================= */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Upload size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Impor Tamu Massal</h3>
                  <p className="text-xs text-gray-500">Mendukung format file CSV atau tempel teks nama langsung.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsImportModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab switch */}
            <div className="flex border-b border-gray-100 mt-4 mb-4">
              <button
                onClick={() => setImportTab('upload')}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  importTab === 'upload' 
                    ? 'border-amber-600 text-amber-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Upload File .CSV / .TXT
              </button>
              <button
                onClick={() => setImportTab('paste')}
                className={`flex-1 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
                  importTab === 'paste' 
                    ? 'border-amber-600 text-amber-600' 
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                Tempel Daftar Teks
              </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-1">
              {importTab === 'upload' ? (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Pilih File CSV atau TXT
                  </label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-gray-300 hover:border-amber-500 rounded-xl p-8 text-center cursor-pointer transition-all bg-gray-50/50 hover:bg-amber-50/20"
                  >
                    <input 
                      ref={fileInputRef} 
                      type="file" 
                      accept=".csv,.txt" 
                      onChange={handleFileUpload} 
                      className="hidden" 
                    />
                    <FileSpreadsheet size={36} className="mx-auto text-amber-600 mb-2" />
                    <p className="text-sm font-semibold text-gray-700">Klik untuk memilih file CSV</p>
                    <p className="text-xs text-gray-400 mt-1">Format kolom CSV: <code className="bg-gray-100 px-1 py-0.5 rounded text-gray-600">nama</code> atau cukup satu nama per baris</p>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-2">
                    Tempel Daftar Nama Tamu (Satu Nama per Baris)
                  </label>
                  <textarea
                    rows={8}
                    value={rawPastedText}
                    onChange={(e) => {
                      setRawPastedText(e.target.value);
                      parseRawInput(e.target.value);
                    }}
                    placeholder={`aan\nadel\nadenanta\nadim bukori\nOZI & RATNA`}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm font-mono text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    Tip: Anda bisa menempel langsung daftar nama seperti di Excel atau chat.
                  </p>
                </div>
              )}

              {/* Mode Options */}
              <div className="bg-gray-50 p-3.5 rounded-xl border border-gray-200/60 flex items-center justify-between text-xs">
                <span className="font-medium text-gray-700">Metode Impor:</span>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'append'}
                      onChange={() => setImportMode('append')}
                      className="accent-amber-600"
                    />
                    <span>Tambahkan ke daftar ada</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer text-red-600">
                    <input
                      type="radio"
                      name="importMode"
                      checked={importMode === 'replace'}
                      onChange={() => setImportMode('replace')}
                      className="accent-amber-600"
                    />
                    <span>Timpa semua tamu lama</span>
                  </label>
                </div>
              </div>

              {/* Preview Box */}
              {parsedPreview.length > 0 && (
                <div className="border border-emerald-200 bg-emerald-50/50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-600" />
                      Terdeteksi {parsedPreview.length} Tamu Siap Diimpor
                    </span>
                    <span className="text-[11px] text-emerald-600">Menampilkan 5 contoh pertama</span>
                  </div>
                  <div className="space-y-1 font-mono text-xs text-gray-600">
                    {parsedPreview.slice(0, 5).map((item, idx) => (
                      <div key={idx} className="flex justify-between bg-white px-2 py-1 rounded border border-emerald-100">
                        <span>{idx + 1}. {item.name}</span>
                        <span className="text-gray-400">{item.code}</span>
                      </div>
                    ))}
                    {parsedPreview.length > 5 && (
                      <p className="text-[11px] text-gray-400 italic pt-1 text-center">
                        ... dan {parsedPreview.length - 5} tamu lainnya.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={() => setIsImportModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleExecuteImport}
                disabled={parsedPreview.length === 0 || batchAddMutation.isPending}
                className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
              >
                {batchAddMutation.isPending ? 'Mengimpor...' : `Simpan ${parsedPreview.length} Tamu`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Tambah Tamu Manual                                                 */}
      {/* ========================================================================= */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-gray-100">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <h3 className="font-bold text-gray-900 text-lg">Tambah Tamu Baru</h3>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!newGuestName.trim()) {
                  toast.error('Nama tamu tidak boleh kosong.');
                  return;
                }
                addMutation.mutate({
                  invitation_id: selectedInvitationId,
                  name: newGuestName.trim(),
                  phone: newGuestPhone.trim() || null,
                  guest_code: newGuestCode.trim() || `GST-${Math.floor(100 + Math.random() * 900)}`,
                  status: 'active'
                });
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nama Tamu Undangan *
                </label>
                <input
                  type="text"
                  required
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  placeholder="Contoh: Budi Santoso"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Nomor WhatsApp / HP (Opsional)
                </label>
                <input
                  type="text"
                  value={newGuestPhone}
                  onChange={(e) => setNewGuestPhone(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  Kode Tamu (Opsional, otomatis bila kosong)
                </label>
                <input
                  type="text"
                  value={newGuestCode}
                  onChange={(e) => setNewGuestCode(e.target.value)}
                  placeholder="Contoh: GST-001"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-mono"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={addMutation.isPending}
                  className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  {addMutation.isPending ? 'Menyimpan...' : 'Simpan Tamu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Salin Semua Link (Untuk Klien)                                     */}
      {/* ========================================================================= */}
      {isBulkCopyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Daftar Link Tamu Siap Kirim ke Klien</h3>
                  <p className="text-xs text-gray-500">Format bersih (Nomor. Nama - Link Undangan) siap disalin.</p>
                </div>
              </div>
              <button 
                onClick={() => setIsBulkCopyModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-2">
              Total {filteredGuests.length} tautan siap salin:
            </p>

            <textarea
              readOnly
              rows={12}
              value={bulkLinksText}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3.5 text-xs font-mono text-gray-800 focus:outline-hidden select-all"
            />

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
              <span className="text-xs text-gray-400">
                Klik tombol salin di bawah untuk menyalin seluruh baris ke clipboard.
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsBulkCopyModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer"
                >
                  Tutup
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(bulkLinksText);
                    toast.success('Seluruh daftar tautan berhasil disalin ke clipboard!');
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Copy size={16} />
                  Salin Semua Tautan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: Konfirmasi Kosongkan Tamu                                          */}
      {/* ========================================================================= */}
      {isClearConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Kosongkan Semua Tamu?</h3>
            <p className="text-xs text-gray-500 mb-5">
              Tindakan ini akan menghapus seluruh data tamu pada undangan ini. Anda dapat mengimpor kembali kapan saja dari file CSV.
            </p>
            <div className="flex items-center justify-center gap-2.5">
              <button
                onClick={() => setIsClearConfirmOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-medium cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => clearAllMutation.mutate()}
                disabled={clearAllMutation.isPending}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold cursor-pointer"
              >
                {clearAllMutation.isPending ? 'Menghapus...' : 'Ya, Kosongkan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
