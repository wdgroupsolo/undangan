import React from 'react';
import { PauseCircle, RefreshCw, MessageSquare, ShieldAlert } from 'lucide-react';

interface InvitationPausedScreenProps {
  groomName?: string;
  brideName?: string;
  weddingTitle?: string;
  contactPhone?: string;
}

export const InvitationPausedScreen: React.FC<InvitationPausedScreenProps> = ({
  groomName = 'Agni',
  brideName = 'Putri',
  weddingTitle = 'The Wedding of Agni & Putri',
  contactPhone = '6285707909415'
}) => {
  const handleReload = () => {
    window.location.reload();
  };

  const handleContactOrganizer = () => {
    const text = encodeURIComponent(
      `Halo Admin WD Group / Penyelenggara, saya ingin menanyakan perihal website undangan pernikahan ${weddingTitle} yang sedang ditangguhkan.`
    );
    window.open(`https://wa.me/${contactPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0705] text-[#f8ede3] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden select-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-600/15 rounded-full blur-[140px]" />
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      {/* Luxury Border Box */}
      <div className="relative z-10 max-w-lg w-full bg-linear-to-b from-[#18120d]/90 to-[#120d09]/95 border border-amber-500/30 rounded-3xl p-7 sm:p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.85)] backdrop-blur-md">
        
        {/* Golden Emblem / Icon */}
        <div className="relative mx-auto w-20 h-20 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-linear-to-tr from-amber-600/30 to-amber-300/30 blur-md animate-pulse" />
          <div className="relative w-20 h-20 rounded-full border-2 border-amber-400/50 bg-[#1e150f] flex items-center justify-center shadow-inner">
            <PauseCircle size={40} className="text-amber-400" />
          </div>
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-4">
          <ShieldAlert size={13} className="text-amber-400" />
          <span>Status: Dijeda Sementara</span>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-amber-200 tracking-wide mb-2">
          Undangan Sedang Ditangguhkan
        </h1>

        {/* Couple Title */}
        <div className="text-sm font-serif italic text-amber-400/80 mb-5">
          {weddingTitle || `The Wedding of ${groomName} & ${brideName}`}
        </div>

        {/* Divider Flourish */}
        <div className="flex items-center justify-center gap-3 my-4 opacity-50">
          <div className="h-px w-16 bg-linear-to-r from-transparent to-amber-400" />
          <div className="w-2 h-2 rotate-45 border border-amber-400" />
          <div className="h-px w-16 bg-linear-to-l from-transparent to-amber-400" />
        </div>

        {/* Informative Explanation */}
        <p className="text-sm text-stone-300/90 leading-relaxed mb-8 px-2 font-light">
          Akses ke halaman undangan pernikahan digital ini sedang dinonaktifkan sementara oleh pihak penyelenggara atau keluarga mempelai. Silakan coba kembali beberapa saat lagi.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleReload}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-linear-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-semibold px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-amber-600/20 text-sm cursor-pointer"
          >
            <RefreshCw size={16} />
            <span>Muat Ulang Halaman</span>
          </button>

          <button
            onClick={handleContactOrganizer}
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 bg-stone-900/80 hover:bg-stone-800 text-stone-300 hover:text-white border border-amber-500/20 px-5 py-3 rounded-xl transition-all duration-200 text-sm cursor-pointer"
          >
            <MessageSquare size={16} className="text-amber-400" />
            <span>Tanya Penyelenggara</span>
          </button>
        </div>

        {/* Subtle Brand Footer */}
        <div className="mt-8 pt-5 border-t border-amber-500/15 text-[11px] text-stone-500 tracking-wider">
          WD GROUP DIGITAL WEDDING INVITATION
        </div>
      </div>
    </div>
  );
};
