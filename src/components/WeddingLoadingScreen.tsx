import React from 'react';

interface WeddingLoadingScreenProps {
  groomName?: string;
  brideName?: string;
}

export const WeddingLoadingScreen: React.FC<WeddingLoadingScreenProps> = ({ groomName, brideName }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0e0b08] text-white select-none overflow-hidden px-6">
      {/* Cinematic Ambient Warm Glow */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          background: 'radial-gradient(ellipse at 50% 45%, rgba(212, 175, 55, 0.18) 0%, rgba(18, 14, 11, 0.88) 60%, rgba(10, 8, 6, 1) 100%)'
        }}
      />
      
      {/* Subtle Polka / Star Dust Texture */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#e5c07b 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}
      />

      {/* Main Glassmorphism Card */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-sm w-full py-9 px-7 backdrop-blur-xl bg-black/35 rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
        
        {/* Animated Interlocking Golden Rings Container */}
        <div className="relative w-24 h-24 mb-5 flex items-center justify-center">
          {/* Outer Breathing Halo */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/25 via-yellow-200/35 to-amber-600/15 blur-xl animate-pulse" />
          
          {/* Spinning Shimmer Border */}
          <div 
            className="absolute inset-1 rounded-full border border-dashed border-amber-300/40 animate-spin"
            style={{ animationDuration: '14s' }}
          />

          {/* SVG Golden Interlocking Rings with Diamond */}
          <svg className="w-16 h-16 relative z-10 drop-shadow-[0_4px_16px_rgba(212,175,55,0.7)]" viewBox="0 0 64 64" fill="none">
            <defs>
              <linearGradient id="loadGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF7D6" />
                <stop offset="30%" stopColor="#ECC867" />
                <stop offset="70%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#8C6214" />
              </linearGradient>
              <radialGradient id="loadSparkle" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FFF8D6" />
                <stop offset="100%" stopColor="#E2B747" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Left Ring */}
            <circle cx="25" cy="36" r="16" stroke="url(#loadGold)" strokeWidth="4.5" fill="none" />
            {/* Right Ring */}
            <circle cx="39" cy="28" r="16" stroke="url(#loadGold)" strokeWidth="4.5" fill="none" />
            {/* Front Overlap Arc */}
            <path d="M 23 20 A 16 16 0 0 1 33 24" stroke="url(#loadGold)" strokeWidth="4.5" strokeLinecap="round" fill="none" />
            {/* Diamond Setting */}
            <polygon points="39,4 44,9 39,13 34,9" fill="#FFFFFF" stroke="#E2BE53" strokeWidth="0.8" />
            {/* Sparkle */}
            <circle cx="39" cy="7" r="1.5" fill="#FFFFFF" />
            <path d="M 39 1 L 40.5 5.5 L 45 7 L 40.5 8.5 L 39 13 L 37.5 8.5 L 33 7 L 37.5 5.5 Z" fill="url(#loadSparkle)" />
          </svg>
        </div>

        {/* Small Tagline */}
        <p 
          className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#ecc867] font-medium mb-3 drop-shadow-sm"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          The Wedding Celebration
        </p>

        {/* Couple Names */}
        {(groomName || brideName) ? (
          <h2 
            className="text-2xl sm:text-3xl text-white font-normal tracking-wide mb-3 flex items-center justify-center gap-2 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}
          >
            <span>{groomName}</span>
            <span className="text-xl font-serif italic text-[#ecc867] font-light">&amp;</span>
            <span>{brideName}</span>
          </h2>
        ) : (
          <h2 
            className="text-xl sm:text-2xl text-white font-normal tracking-widest mb-3 uppercase"
            style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}
          >
            Special Invitation
          </h2>
        )}

        {/* Golden Flourish Divider */}
        <div className="flex items-center justify-center gap-2.5 my-3 w-40">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
          <div className="w-1.5 h-1.5 rotate-45 bg-[#ecc867] shadow-[0_0_8px_rgba(236,200,103,0.9)]" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent" />
        </div>

        {/* Elegant Animated Status */}
        <div className="mt-4 flex flex-col items-center gap-3">
          <p 
            className="text-xs sm:text-[13px] text-gray-300 font-light tracking-wide flex items-center gap-1"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>Menyiapkan momen bahagia</span>
            <span className="inline-flex tracking-widest text-[#ecc867] animate-pulse">...</span>
          </p>

          {/* Smooth Golden Progress Bar */}
          <div className="w-36 h-[3px] bg-white/15 rounded-full overflow-hidden relative">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-amber-400 via-[#fff2b8] to-amber-500" 
              style={{
                width: '55%',
                animation: 'loadingSweep 1.8s ease-in-out infinite'
              }}
            />
          </div>
        </div>

      </div>

      {/* Keyframe animation style for sweep effect */}
      <style>{`
        @keyframes loadingSweep {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(45%); }
          100% { transform: translateX(190%); }
        }
      `}</style>
    </div>
  );
};
