import React, { useState, useEffect } from 'react';
import { 
  siteSettingsService, 
  SiteSettings, 
  DEFAULT_SITE_SETTINGS 
} from '../../services/siteSettingsService';
import { 
  Globe, 
  ShieldAlert, 
  CheckCircle2, 
  PauseCircle, 
  PlayCircle, 
  Save, 
  RefreshCw, 
  ExternalLink, 
  Building2, 
  Phone, 
  Mail, 
  MapPin, 
  User, 
  Bell, 
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

export const Settings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>(siteSettingsService.getSettingsSync());
  const [activeTab, setActiveTab] = useState<'general' | 'client' | 'admin'>('general');
  const [isSaving, setIsSaving] = useState(false);
  const toast = useToast();

  useEffect(() => {
    siteSettingsService.getSettings().then(setSettings);
  }, []);

  const handleChange = (field: keyof SiteSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSaving(true);
    try {
      await siteSettingsService.updateSettings(settings);
      toast.success('Pengaturan sistem berhasil disimpan.');
    } catch {
      toast.error('Gagal menyimpan pengaturan.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleTogglePause = async () => {
    const nextStatus = settings.client_status === 'live' ? 'paused' : 'live';
    const confirmMsg = nextStatus === 'paused'
      ? 'Jeda Web Client sekarang?\n\nPengunjung yang membuka website utama (landing page & katalog) otomatis dialihkan ke layar pemeliharaan sistem.'
      : 'Aktifkan Web Client kembali?\n\nWebsite publik akan langsung bisa diakses kembali oleh seluruh pengunjung.';

    if (window.confirm(confirmMsg)) {
      setIsSaving(true);
      try {
        const updated = await siteSettingsService.updateSettings({ client_status: nextStatus });
        setSettings(updated);
        if (nextStatus === 'paused') {
          toast.info('Web Client berhasil dijeda. Layar pemeliharaan aktif.');
        } else {
          toast.success('Web Client berhasil diaktifkan kembali. Website publik kini LIVE.');
        }
      } catch {
        toast.error('Gagal memperbarui status web client.');
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleResetDefaults = () => {
    if (window.confirm('Kembalikan semua pengaturan ke konfigurasi bawaan WD Group?')) {
      setSettings(DEFAULT_SITE_SETTINGS);
      siteSettingsService.updateSettings(DEFAULT_SITE_SETTINGS);
      toast.info('Pengaturan telah dikembalikan ke nilai default.');
    }
  };

  const isLive = settings.client_status === 'live';

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Pengaturan Sistem (Settings)</h1>
              <p className="text-sm text-gray-500">
                Pusat kendali status web client publik, identitas brand, kontak, dan konfigurasi admin.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3.5 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-all cursor-pointer"
          >
            Reset Default
          </button>
          <button
            type="button"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Save size={16} />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Action Card: Web Client Pause / Live Switch */}
      <div className={`p-6 rounded-2xl border transition-all ${
        isLive 
          ? 'bg-linear-to-r from-emerald-950/90 via-stone-900 to-stone-900 border-emerald-500/30 text-white' 
          : 'bg-linear-to-r from-amber-950/95 via-stone-900 to-stone-900 border-amber-500/40 text-white'
      } shadow-lg relative overflow-hidden`}>
        {/* Ambient Glow */}
        <div className={`absolute -right-10 -top-10 w-64 h-64 rounded-full blur-[90px] pointer-events-none ${
          isLive ? 'bg-emerald-500/15' : 'bg-amber-500/20'
        }`} />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider backdrop-blur-xs border">
              {isLive ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-300">Status: Web Client Aktif (LIVE)</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span className="text-amber-300">Status: Web Client Dijeda (PAUSED)</span>
                </>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
              {isLive 
                ? 'Website Publik Sedang Terbuka & Aktif' 
                : 'Website Publik Sedang Dinonaktifkan Sementara'}
            </h2>

            <p className="text-sm text-stone-300 leading-relaxed">
              {isLive 
                ? 'Seluruh pengunjung dapat mengakses halaman utama, katalog tema, dan layanan publik secara normal.'
                : 'Pengunjung yang membuka website publik akan melihat halaman pemeliharaan sistem. Panel admin tetap bisa diakses normal.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            {/* The Main Pause / Resume Action Button */}
            <button
              type="button"
              onClick={handleTogglePause}
              disabled={isSaving}
              className={`flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-sm transition-all shadow-md cursor-pointer ${
                isLive
                  ? 'bg-amber-500 hover:bg-amber-400 text-stone-950 hover:shadow-amber-500/25'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-stone-950 hover:shadow-emerald-500/25'
              }`}
            >
              {isLive ? (
                <>
                  <PauseCircle size={19} className="text-stone-950" />
                  <span>Jeda Web Client (Pause)</span>
                </>
              ) : (
                <>
                  <PlayCircle size={19} className="text-stone-950" />
                  <span>Aktifkan Web Client (Go Live)</span>
                </>
              )}
            </button>

            {/* Preview Public Site */}
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-semibold text-xs text-stone-300 hover:text-white bg-white/10 hover:bg-white/15 border border-white/10 transition-all"
            >
              <ExternalLink size={15} />
              <span>Buka Website</span>
            </a>
          </div>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex border-b border-gray-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'general'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Pesan Pemeliharaan (Maintenance)
        </button>
        <button
          onClick={() => setActiveTab('client')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'client'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Identitas & Kontak Web Client
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`pb-3 border-b-2 transition-all cursor-pointer ${
            activeTab === 'admin'
              ? 'border-amber-600 text-amber-600'
              : 'border-transparent text-gray-400 hover:text-gray-600'
          }`}
        >
          Konfigurasi Web Admin
        </button>
      </div>

      {/* 4. Tab Contents */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* TAB 1: Maintenance Message */}
        {activeTab === 'general' && (
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-5">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Kustomisasi Pesan Pemeliharaan Web Client
              </h3>
              <p className="text-xs text-gray-500">
                Teks ini otomatis tampil kepada pengunjung saat Web Client dijeda (Paused).
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Judul Halaman Pemeliharaan
                </label>
                <input
                  type="text"
                  value={settings.maintenance_title}
                  onChange={(e) => handleChange('maintenance_title', e.target.value)}
                  placeholder="Contoh: Website Sedang Dalam Pemeliharaan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Keterangan / Pesan Untuk Pengunjung
                </label>
                <textarea
                  rows={4}
                  value={settings.maintenance_message}
                  onChange={(e) => handleChange('maintenance_message', e.target.value)}
                  placeholder="Tuliskan keterangan mengenai proses pemeliharaan atau estimasi kembali online..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                />
              </div>

              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
                <ShieldAlert size={18} className="text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 leading-relaxed">
                  <strong>Tips:</strong> Saat status dijeda, pengunjung tetap dapat menghubungi admin langsung melalui tombol WhatsApp darurat yang tertera pada layar pemeliharaan.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Web Client Branding & Contact */}
        {activeTab === 'client' && (
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Informasi & Profil Web Client (Landing Page)
              </h3>
              <p className="text-xs text-gray-500">
                Data identitas resmi yang ditampilkan pada halaman utama website publik dan katalog tema.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Nama Brand / Usaha
                </label>
                <div className="relative">
                  <Building2 size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.brand_name}
                    onChange={(e) => handleChange('brand_name', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Slogan / Tagline
                </label>
                <div className="relative">
                  <Sparkles size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.tagline}
                    onChange={(e) => handleChange('tagline', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Domain Resmi Website
                </label>
                <div className="relative">
                  <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.primary_domain}
                    onChange={(e) => handleChange('primary_domain', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Nomor WhatsApp CS / Pemesanan
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.contact_phone}
                    onChange={(e) => handleChange('contact_phone', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-mono focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Instagram Resmi
                </label>
                <div className="relative">
                  <InstagramIcon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.contact_instagram}
                    onChange={(e) => handleChange('contact_instagram', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Email Kontak
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={settings.contact_email}
                    onChange={(e) => handleChange('contact_email', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Alamat Studio / Kantor
                </label>
                <div className="relative">
                  <MapPin size={16} className="absolute left-3.5 top-3 text-gray-400" />
                  <input
                    type="text"
                    value={settings.office_address}
                    onChange={(e) => handleChange('office_address', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Web Admin Config */}
        {activeTab === 'admin' && (
          <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100 space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">
                Pengaturan Web Admin
              </h3>
              <p className="text-xs text-gray-500">
                Kelola profil pengelola sistem dan notifikasi RSVP undangan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Nama Administrator
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={settings.admin_name}
                    onChange={(e) => handleChange('admin_name', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">
                  Email Akun Administrator
                </label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={settings.admin_email}
                    onChange={(e) => handleChange('admin_email', e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Bell size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Notifikasi RSVP Tamu</h4>
                  <p className="text-xs text-gray-500">Tampilkan notifikasi saat ada konfirmasi kehadiran tamu baru.</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enable_rsvp_notifications}
                  onChange={(e) => handleChange('enable_rsvp_notifications', e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600" />
              </label>
            </div>
          </div>
        )}

        {/* Bottom Save Action */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm font-semibold transition-all cursor-pointer"
          >
            Batal / Reset
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-xs cursor-pointer"
          >
            <Save size={16} />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan Semua Perubahan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};
