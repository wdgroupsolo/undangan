import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Users, 
  Mail, 
  Palette, 
  MessageSquareHeart, 
  Plus, 
  ExternalLink, 
  Copy, 
  Check, 
  Eye, 
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: adminService.getDashboardStats
  });

  const handleCopyLink = (slug: string) => {
    const fullUrl = `${window.location.origin}/invitation/${slug}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const stats = [
    { 
      name: 'Total Klien', 
      value: data?.stats?.totalClients ?? 1, 
      unit: 'Mempelai',
      subtitle: 'Calon pengantin terdaftar',
      icon: Users, 
      color: 'text-blue-700', 
      bg: 'bg-blue-50',
    },
    { 
      name: 'Undangan Aktif', 
      value: data?.stats?.totalInvitations ?? 1, 
      unit: 'Undangan',
      subtitle: 'Siap disebar ke tamu',
      icon: Mail, 
      color: 'text-amber-800', 
      bg: 'bg-amber-50',
    },
    { 
      name: 'Tema Katalog', 
      value: data?.stats?.activeThemes ?? 9, 
      unit: 'Desain',
      subtitle: 'Semua tema aktif & siap demo',
      icon: Palette, 
      color: 'text-emerald-700', 
      bg: 'bg-emerald-50',
    },
    { 
      name: 'Total RSVP Masuk', 
      value: data?.stats?.totalRsvps ?? 0, 
      unit: 'Respon',
      subtitle: 'Konfirmasi kehadiran & ucapan',
      icon: MessageSquareHeart, 
      color: 'text-rose-700', 
      bg: 'bg-rose-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-10 h-10 border-3 border-stone-200 border-t-primary-800 rounded-full animate-spin" />
        <p className="text-sm font-medium text-stone-500">Memuat ringkasan dashboard...</p>
      </div>
    );
  }

  const todayStr = new Intl.DateTimeFormat('id-ID', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  }).format(new Date());

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 font-jakarta">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1 border-b border-stone-100">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-bold text-stone-900 tracking-tight">Dashboard Operasional</h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Sistem Normal
            </span>
          </div>
          <p className="text-sm text-stone-500 mt-1 flex flex-wrap items-center gap-x-2">
            <span>Ringkasan performa undangan digital, katalog tema, dan status klien.</span>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <span className="text-stone-400 text-xs font-medium">{todayStr}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 bg-white hover:bg-stone-50 text-stone-700 font-medium px-4 py-2.5 rounded-xl text-sm border border-stone-200 shadow-2xs transition-all"
          >
            <Eye size={16} className="text-stone-500" />
            <span>Lihat Web Publik</span>
          </Link>
          <Link
            to="/admin/invitations/create"
            className="flex items-center gap-2 bg-primary-800 hover:bg-primary-900 text-white font-medium px-4 py-2.5 rounded-xl text-sm shadow-xs transition-all"
          >
            <Plus size={16} />
            <span>Buat Undangan Baru</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-stone-300 transition-all flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-stone-500">{stat.name}</span>
              <div className={`w-8 h-8 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <stat.icon size={16} />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-stone-900">{stat.value}</span>
                <span className="text-xs font-semibold text-stone-500">{stat.unit}</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-300 inline-block" />
                <span>{stat.subtitle}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200/80 shadow-2xs">
        <div className="flex items-center justify-between mb-3.5">
          <div>
            <h2 className="text-sm font-bold text-stone-900">Akses Cepat Fitur</h2>
            <p className="text-xs text-stone-500">Pintasan langsung ke menu operasional utama</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link 
            to="/admin/invitations/create" 
            className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-amber-50/60 hover:border-amber-300 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Plus size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-amber-900">Buat Undangan</p>
            <p className="text-xs text-stone-500 mt-0.5">Tambah acara pengantin baru</p>
          </Link>

          <Link 
            to="/admin/clients" 
            className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-blue-50/60 hover:border-blue-300 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Users size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-blue-900">Kelola Klien</p>
            <p className="text-xs text-stone-500 mt-0.5">Daftar calon mempelai</p>
          </Link>

          <Link 
            to="/admin/themes" 
            className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-emerald-50/60 hover:border-emerald-300 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Palette size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-emerald-900">Katalog Tema</p>
            <p className="text-xs text-stone-500 mt-0.5">Atur 9 tema & paket harga</p>
          </Link>

          <Link 
            to="/admin/rsvp" 
            className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-rose-50/60 hover:border-rose-300 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <MessageSquareHeart size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-rose-900">Rekap RSVP</p>
            <p className="text-xs text-stone-500 mt-0.5">Konfirmasi kehadiran & ucapan</p>
          </Link>
        </div>
      </div>

      {/* Main Split Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Recent Invitations (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-100">
              <div>
                <h2 className="text-base font-bold text-stone-900">Daftar Undangan Terbaru</h2>
                <p className="text-xs text-stone-500">Undangan yang baru saja dibuat atau aktif</p>
              </div>
              <Link 
                to="/admin/invitations" 
                className="text-xs font-semibold text-primary-800 hover:text-primary-900 flex items-center gap-1 hover:underline"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {data?.recentInvitations?.map((inv) => {
                const clientName = (Array.isArray(inv.client) ? inv.client[0]?.name : (inv.client as any)?.name) || 'Klien';
                const isCopied = copiedSlug === inv.slug;

                return (
                  <div 
                    key={inv.id} 
                    className="p-4 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/60 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{inv.title || 'Tanpa Judul'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                          inv.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span>{inv.status}</span>
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center gap-2">
                        <span className="font-medium text-stone-600">{clientName}</span>
                        <span className="text-stone-300">•</span>
                        <code className="text-primary-700 font-mono text-[11px] bg-primary-50/70 px-1.5 py-0.5 rounded">/{inv.slug}</code>
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleCopyLink(inv.slug)}
                        title="Salin Tautan Undangan"
                        className="p-2 px-3 rounded-lg bg-white border border-stone-200 hover:bg-stone-50 text-stone-600 transition-colors text-xs font-medium flex items-center gap-1.5 cursor-pointer shadow-2xs"
                      >
                        {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{isCopied ? 'Tersalin' : 'Salin'}</span>
                      </button>

                      <a
                        href={`/invitation/${inv.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Buka Undangan Langsung"
                        className="p-2 px-3 rounded-lg bg-primary-50/80 border border-primary-200 hover:bg-primary-100 text-primary-800 transition-colors text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                      >
                        <ExternalLink size={14} />
                        <span>Preview</span>
                      </a>
                    </div>
                  </div>
                );
              })}

              {(data?.recentInvitations?.length ?? 0) === 0 && (
                <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl text-stone-500 space-y-2">
                  <Mail size={32} className="mx-auto text-stone-300" />
                  <p className="text-sm font-semibold">Belum ada undangan yang dibuat</p>
                  <Link 
                    to="/admin/invitations/create"
                    className="inline-block text-xs font-bold text-primary-700 hover:underline"
                  >
                    + Buat Undangan Pertama
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Clients (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-2xs">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-stone-100">
              <div>
                <h2 className="text-base font-bold text-stone-900">Klien Terbaru</h2>
                <p className="text-xs text-stone-500">Daftar calon mempelai terdaftar</p>
              </div>
              <Link 
                to="/admin/clients" 
                className="text-xs font-semibold text-primary-800 hover:text-primary-900 flex items-center gap-1 hover:underline"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {data?.recentClients?.map((client) => (
                <div 
                  key={client.id} 
                  className="p-3 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/60 transition-all flex items-center gap-3"
                >
                  <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-xs uppercase shrink-0">
                    {client.name?.charAt(0) || 'K'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-stone-900 truncate">{client.name}</p>
                    <p className="text-xs text-stone-500 truncate">{client.email || 'Tidak ada email'}</p>
                  </div>
                </div>
              ))}

              {(data?.recentClients?.length ?? 0) === 0 && (
                <div className="text-center py-8 border border-dashed border-stone-200 rounded-2xl text-stone-500 space-y-2">
                  <Users size={28} className="mx-auto text-stone-300" />
                  <p className="text-xs font-semibold">Belum ada klien terdaftar</p>
                  <Link 
                    to="/admin/clients"
                    className="inline-block text-xs font-bold text-primary-700 hover:underline"
                  >
                    + Tambah Klien
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Operational Tips Banner */}
          <div className="bg-stone-50/80 rounded-2xl p-4 border border-stone-200/70 flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center font-bold shrink-0 mt-0.5">
              <CheckCircle2 size={16} />
            </div>
            <div className="text-xs space-y-1">
              <p className="font-bold text-stone-900">Tips Distribusi Undangan</p>
              <p className="text-stone-500 leading-relaxed">
                Bagikan format WhatsApp dengan menyertakan parameter <code className="text-primary-700 bg-primary-50 px-1 py-0.5 rounded text-[11px]">?to=Nama+Tamu</code> agar undangan lebih personal dan tingkat konfirmasi RSVP meningkat.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
