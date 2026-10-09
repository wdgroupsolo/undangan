import React from 'react';
import { ShieldAlert, MessageSquare, Lock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface WebClientMaintenanceScreenProps {
  brandName?: string;
  title?: string;
  message?: string;
  contactPhone?: string;
}

export const WebClientMaintenanceScreen: React.FC<WebClientMaintenanceScreenProps> = ({
  brandName = 'WD GROUP',
  title = 'Website Sedang Dalam Pemeliharaan',
  message = 'Layanan website publik kami sedang dinonaktifkan sementara untuk pembaharuan sistem. Kami akan segera kembali online.',
  contactPhone = '6285707909415'
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Tim ${brandName}, saya ingin konsultasi layanan pembuatan undangan pernikahan digital.`
    );
    window.open(`https://wa.me/${contactPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-stone-950 text-stone-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-lg w-full bg-stone-900/90 border border-stone-800 rounded-3xl p-8 sm:p-10 text-center shadow-2xl backdrop-blur-md">
        
        {/* Emblem / Icon */}
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-5 shadow-inner">
          <ShieldAlert size={34} />
        </div>

        {/* Brand Name */}
        <div className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-2">
          {brandName}
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
          {title}
        </h1>

        {/* Message */}
        <p className="text-sm text-stone-400 leading-relaxed mb-8">
          {message}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleWhatsApp}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3 rounded-xl transition-all text-sm cursor-pointer shadow-lg shadow-emerald-600/20"
          >
            <MessageSquare size={16} />
            <span>Chat WhatsApp</span>
          </button>

          <button
            onClick={handleReload}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-5 py-3 rounded-xl transition-all text-sm cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Coba Muat Ulang</span>
          </button>
        </div>

        {/* Admin Link at the bottom */}
        <div className="mt-8 pt-6 border-t border-stone-800/80 flex items-center justify-between text-xs text-stone-500">
          <span>Khusus Administrator:</span>
          <Link 
            to="/admin/login" 
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium hover:underline"
          >
            <Lock size={12} />
            <span>Masuk Panel Admin</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
