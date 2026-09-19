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
  TrendingUp, 
  Sparkles, 
  Eye, 
  Calendar,
  CheckCircle2,
  Clock,
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
      value: data?.stats.totalClients || 0, 
      icon: Users, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50',
      border: 'border-blue-100',
      trend: '+12% bln ini'
    },
    { 
      name: 'Undangan Aktif', 
      value: data?.stats.totalInvitations || 0, 
      icon: Mail, 
      color: 'text-primary-700', 
      bg: 'bg-primary-50',
      border: 'border-primary-100',
      trend: 'Siap sebar'
    },
    { 
      name: 'Tema Tersedia', 
      value: data?.stats.activeThemes || 0, 
      icon: Palette, 
      color: 'text-emerald-600', 
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
      trend: 'Katalog aktif'
    },
    { 
      name: 'Total RSVP Masuk', 
      value: data?.stats.totalRsvps || 0, 
      icon: MessageSquareHeart, 
      color: 'text-rose-600', 
      bg: 'bg-rose-50',
      border: 'border-rose-100',
      trend: 'Real-time'
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-800 rounded-full animate-spin" />
        <p className="text-sm font-medium text-stone-500">Memuat data dashboard...</p>
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
    <div className="space-y-8 max-w-7xl mx-auto pb-12 font-jakarta">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-950 via-primary-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative shapes */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 left-1/3 w-64 h-64 bg-primary-600/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-amber-200 border border-white/10 backdrop-blur-md">
              <Sparkles size={13} className="text-amber-300" />
              <span>WD Group • Master Admin Control</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-cinzel text-white">
              Ringkasan Operasional Undangan
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 flex items-center space-x-2">
              <Calendar size={14} className="text-amber-300" />
              <span>{todayStr}</span>
              <span>•</span>
              <span className="text-emerald-300 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
                <span>Sistem Sinkronisasi Normal</span>
              </span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/admin/invitations/create"
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-stone-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-lg transition-all"
            >
              <Plus size={16} />
              <span>Buat Undangan Baru</span>
            </Link>
            <Link
              to="/"
              target="_blank"
              className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-sm border border-white/15 backdrop-blur-md transition-all"
            >
              <Eye size={16} />
              <span>Lihat Web Publik</span>
            </Link>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div 
            key={stat.name} 
            className={`bg-white rounded-2xl p-6 border ${stat.border} shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3.5 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className="text-[11px] font-bold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-full flex items-center space-x-1">
                <TrendingUp size={12} className="text-emerald-600" />
                <span>{stat.trend}</span>
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">{stat.name}</p>
              <p className="text-3xl font-extrabold text-stone-900 mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Shortcuts */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200/80 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4">Pintasan Tindakan Cepat</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Link 
            to="/admin/invitations/create" 
            className="p-4 rounded-xl border border-stone-100 bg-stone-50 hover:bg-primary-50 hover:border-primary-200 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Plus size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-primary-900">Buat Undangan</p>
            <p className="text-xs text-stone-500 mt-0.5">Tambah acara pengantin baru</p>
          </Link>

          <Link 
            to="/admin/clients" 
            className="p-4 rounded-xl border border-stone-100 bg-stone-50 hover:bg-blue-50 hover:border-blue-200 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Users size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-blue-900">Kelola Klien</p>
            <p className="text-xs text-stone-500 mt-0.5">Daftar calon mempelai</p>
          </Link>

          <Link 
            to="/admin/themes" 
            className="p-4 rounded-xl border border-stone-100 bg-stone-50 hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <Palette size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-emerald-900">Katalog Tema</p>
            <p className="text-xs text-stone-500 mt-0.5">Aktifkan &amp; kelola tema</p>
          </Link>

          <Link 
            to="/admin/rsvp" 
            className="p-4 rounded-xl border border-stone-100 bg-stone-50 hover:bg-rose-50 hover:border-rose-200 transition-all text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-bold mb-2 group-hover:scale-105 transition-transform">
              <MessageSquareHeart size={16} />
            </div>
            <p className="font-bold text-sm text-stone-900 group-hover:text-rose-900">Rekap RSVP</p>
            <p className="text-xs text-stone-500 mt-0.5">Lihat doa &amp; konfirmasi hadir</p>
          </Link>
        </div>
      </div>

      {/* Main Split Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Recent Invitations (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-stone-900">Daftar Undangan Terbaru</h2>
                <p className="text-xs text-stone-500">Undangan yang baru saja dibuat atau diperbarui</p>
              </div>
              <Link 
                to="/admin/invitations" 
                className="text-xs font-bold text-primary-700 hover:text-primary-900 flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {data?.recentInvitations.map((inv) => {
                const clientName = (Array.isArray(inv.client) ? inv.client[0]?.name : (inv.client as any)?.name) || 'Klien';
                const isCopied = copiedSlug === inv.slug;

                return (
                  <div 
                    key={inv.id} 
                    className="p-4 rounded-2xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/70 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-stone-900">{inv.title || 'Tanpa Judul'}</span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 ${
                          inv.status === 'published' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${inv.status === 'published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                          <span>{inv.status}</span>
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 flex items-center space-x-2">
                        <span>{clientName}</span>
                        <span>•</span>
                        <code className="text-primary-700 font-mono text-[11px]">/{inv.slug}</code>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopyLink(inv.slug)}
                        title="Salin Tautan Undangan"
                        className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors text-xs font-semibold flex items-center space-x-1"
                      >
                        {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span className="hidden sm:inline">{isCopied ? 'Tersalin' : 'Salin'}</span>
                      </button>

                      <a
                        href={`/invitation/${inv.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Buka Undangan Langsung"
                        className="p-2 rounded-xl bg-primary-50 border border-primary-200 hover:bg-primary-100 text-primary-800 transition-colors text-xs font-semibold flex items-center space-x-1"
                      >
                        <ExternalLink size={14} />
                        <span className="hidden sm:inline">Preview</span>
                      </a>
                    </div>
                  </div>
                );
              })}

              {data?.recentInvitations.length === 0 && (
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

          <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <span>Menampilkan 5 aktivitas undangan terakhir</span>
            <Link to="/admin/invitations" className="text-primary-700 font-semibold hover:underline">
              Kelola Semua &rarr;
            </Link>
          </div>
        </div>

        {/* Recent Clients (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-stone-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-lg font-bold text-stone-900">Klien Terbaru</h2>
                <p className="text-xs text-stone-500">Daftar calon mempelai terdaftar</p>
              </div>
              <Link 
                to="/admin/clients" 
                className="text-xs font-bold text-primary-700 hover:text-primary-900 flex items-center space-x-1"
              >
                <span>Lihat Semua</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>

            <div className="space-y-3">
              {data?.recentClients.map((client) => (
                <div 
                  key={client.id} 
                  className="p-3.5 rounded-2xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50/70 transition-all flex items-center space-x-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-800 font-bold flex items-center justify-center text-sm uppercase">
                    {client.name?.charAt(0) || 'K'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-stone-900 truncate">{client.name}</p>
                    <p className="text-xs text-stone-500 truncate">{client.email || 'Tidak ada email'}</p>
                  </div>
                </div>
              ))}

              {data?.recentClients.length === 0 && (
                <div className="text-center py-10 border border-dashed border-stone-200 rounded-2xl text-stone-500 space-y-2">
                  <Users size={32} className="mx-auto text-stone-300" />
                  <p className="text-sm font-semibold">Belum ada klien terdaftar</p>
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

          <div className="pt-4 mt-4 border-t border-stone-100">
            <div className="bg-primary-50/80 rounded-2xl p-4 border border-primary-100 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-primary-700 text-white flex items-center justify-center font-bold">
                <CheckCircle2 size={18} />
              </div>
              <div className="text-xs">
                <p className="font-bold text-primary-900">Tips Operasional</p>
                <p className="text-stone-600">Bagikan format WhatsApp kustom nama tamu agar respon tamu meningkat 2x lipat.</p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
