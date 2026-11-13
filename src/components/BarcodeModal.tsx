import React, { useState, useEffect } from 'react';
import { 
  QrCode, 
  X, 
  Check, 
  Download, 
  ExternalLink, 
  ShieldCheck, 
  Copy, 
  Sparkles,
  Camera
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BarcodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  invitation: {
    id: string;
    title?: string;
    slug: string;
    settings?: any;
    client?: { name?: string };
  } | null;
  onSave: (useBarcode: boolean) => Promise<void> | void;
  isLoading?: boolean;
}

export const BarcodeModal: React.FC<BarcodeModalProps> = ({
  isOpen,
  onClose,
  invitation,
  onSave,
  isLoading = false,
}) => {
  const [useBarcode, setUseBarcode] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync state whenever invitation changes or modal opens
  useEffect(() => {
    if (invitation) {
      setUseBarcode(invitation.settings?.use_barcode === true);
    }
  }, [invitation, isOpen]);

  // Handle ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !invitation) return null;

  const sampleCode = `VIP-${(invitation.slug || 'PASS').slice(0, 4).toUpperCase()}-8821`;
  const qrData = `INV:${invitation.id}|SLUG:${invitation.slug}|PASS:${sampleCode}|TAMU:Bpk. Bambang Wijaya|ATT:attending|PAX:2`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=350x350&data=${encodeURIComponent(qrData)}`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQr = () => {
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `qrcode-${invitation.slug}-sample.png`;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden z-10 flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200 font-jakarta">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-stone-100 flex items-center justify-between bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center border border-amber-200 shadow-2xs">
              <QrCode size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900 leading-tight flex items-center gap-2">
                <span>VIP Barcode Pass & QR Presensi</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                  Resepsionis
                </span>
              </h3>
              <p className="text-xs text-stone-500 mt-0.5">
                {invitation.title || 'Undangan Pengantin'} &bull; <span className="font-mono text-stone-600">/{invitation.slug}</span>
              </p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors flex items-center justify-center cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* Mode Switcher Cards */}
          <div>
            <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              Pilih Mode RSVP Undangan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option 1: VIP Barcode (Active) */}
              <button
                type="button"
                onClick={() => setUseBarcode(true)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  useBarcode
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold flex items-center gap-1.5 ${useBarcode ? 'text-amber-900' : 'text-stone-700'}`}>
                    <QrCode size={14} className={useBarcode ? 'text-amber-600' : 'text-stone-400'} />
                    VIP Barcode Aktif
                  </span>
                  {useBarcode && (
                    <span className="w-5 h-5 rounded-full bg-amber-600 text-white flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-stone-500 leading-relaxed">
                  Tamu yang konfirmasi kehadiran otomatis mendapat tiket QR barcode untuk discan di meja resepsionis.
                </p>
              </button>

              {/* Option 2: Standar RSVP (Inactive) */}
              <button
                type="button"
                onClick={() => setUseBarcode(false)}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                  !useBarcode
                    ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                    : 'bg-white border-stone-200 hover:border-stone-300'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold ${!useBarcode ? 'text-white' : 'text-stone-700'}`}>
                    Standar RSVP
                  </span>
                  {!useBarcode && (
                    <span className="w-5 h-5 rounded-full bg-white text-stone-900 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} />
                    </span>
                  )}
                </div>
                <p className={`text-[11px] leading-relaxed ${!useBarcode ? 'text-stone-300' : 'text-stone-500'}`}>
                  Form RSVP standar (nama, ucapan & konfirmasi kehadiran biasa) tanpa menghasilkan tiket barcode.
                </p>
              </button>

            </div>
          </div>

          {/* QR Code Pass Preview (Live Display) */}
          <div className="rounded-xl border border-stone-200 bg-stone-50/50 p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                <Sparkles size={14} className="text-amber-600" />
                <span>Pratinjau Tiket Barcode Resepsionis</span>
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                useBarcode 
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                  : 'bg-stone-200 text-stone-600'
              }`}>
                {useBarcode ? 'Status: Fitur Aktif' : 'Status: Nonaktif'}
              </span>
            </div>

            {useBarcode ? (
              <div className="bg-white rounded-xl border border-stone-200 p-4 shadow-xs flex flex-col sm:flex-row items-center gap-4">
                {/* QR Code Visual Image */}
                <div className="relative w-36 h-36 bg-stone-900 p-2.5 rounded-xl shrink-0 flex items-center justify-center shadow-md border border-stone-800">
                  <img 
                    src={qrUrl}
                    alt="QR Code Pass Sample"
                    className="w-full h-full object-contain rounded-md bg-white p-1"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/qr-code.png';
                    }}
                  />
                  <div className="absolute -bottom-2 bg-amber-500 text-stone-950 text-[9px] font-black uppercase px-2 py-0.5 rounded-full shadow-xs tracking-wider">
                    VIP PASS
                  </div>
                </div>

                {/* QR Ticket Metadata */}
                <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">
                      Simulasi Tiket Tamu
                    </span>
                    <h4 className="text-sm font-bold text-stone-900 truncate">
                      {invitation.title}
                    </h4>
                  </div>

                  <div className="space-y-1 text-xs text-stone-600 bg-stone-50 p-2.5 rounded-lg border border-stone-200/60 font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Kode:</span>
                      <span className="font-bold text-stone-900">{sampleCode}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Tamu:</span>
                      <span className="text-stone-700">Bpk. Bambang Wijaya</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-stone-400">Akses:</span>
                      <span className="text-emerald-700 font-semibold">2 Pax &bull; Hadir</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
                    >
                      {copied ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                      <span>{copied ? 'Tersalin' : 'Salin Kode'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDownloadQr}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors cursor-pointer"
                    >
                      <Download size={12} />
                      <span>Unduh QR</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-dashed border-stone-300 p-6 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-stone-100 text-stone-400 mx-auto flex items-center justify-center">
                  <QrCode size={20} />
                </div>
                <p className="text-xs font-medium text-stone-700">
                  Fitur Barcode VIP sedang dinonaktifkan
                </p>
                <p className="text-[11px] text-stone-500 max-w-sm mx-auto">
                  Klik opsi <strong>VIP Barcode Aktif</strong> di atas untuk memunculkan tiket barcode presensi digital bagi para tamu.
                </p>
              </div>
            )}
          </div>

          {/* Quick Info & Receptionist Scanner Link */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-3.5 flex items-start gap-3">
            <ShieldCheck size={18} className="text-blue-600 shrink-0 mt-0.5" />
            <div className="flex-1 text-xs text-blue-900 leading-relaxed">
              <span className="font-bold">Integrasi Scanner Meja Resepsionis:</span>
              <p className="mt-0.5 text-blue-800 text-[11px]">
                Petugas penerima tamu dapat memindai tiket barcode tamu secara langsung menggunakan kamera HP / laptop di halaman rekap RSVP.
              </p>
              <div className="mt-2">
                <Link
                  to="/admin/rsvp"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 font-bold text-[11px] text-blue-700 hover:text-blue-900 underline underline-offset-2"
                >
                  <Camera size={13} />
                  <span>Buka Scanner Kamera di Menu RSVP &rarr;</span>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-stone-200 bg-stone-50/80 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => onSave(useBarcode)}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-xs transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="animate-spin text-sm">&bull;</span>
            ) : (
              <Check size={14} strokeWidth={2.5} />
            )}
            <span>Simpan Pengaturan Barcode</span>
          </button>
        </div>

      </div>
    </div>
  );
};
