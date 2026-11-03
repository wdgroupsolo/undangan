import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { 
  FallingPineParticles,
  FloatingLakeMist,
  FloatingGoldenDust
} from '../themes/NirwanaSaranganTheme';

interface NirwanaSaranganEntrancePortalProps {
  onComplete: () => void;
  guestName?: string;
  groomName?: string;
  brideName?: string;
  coverImage?: string;
  weddingDate?: string;
  themeSlug?: string;
}

export const NirwanaSaranganEntrancePortal: React.FC<NirwanaSaranganEntrancePortalProps> = ({
  onComplete,
  guestName = 'Tamu Undangan',
  groomName = 'Steven',
  brideName = 'Bunga',
  coverImage = '/themes/nirwana-sarangan/couple-cover.jpg',
  weddingDate = 'Jumat, 20 November 2026',
  themeSlug = 'nirwana-sarangan'
}) => {
  // Animation stages: 'intro' -> 'unlocking' -> 'opening' -> 'gliding' -> 'exiting'
  const [stage, setStage] = useState<'intro' | 'unlocking' | 'opening' | 'gliding' | 'exiting'>('intro');
  const [canSkip, setCanSkip] = useState(false);
  const isFinishedRef = useRef(false);

  const isRoyalWayang = themeSlug === 'royal-wayang-gold' || themeSlug === 'royal-wayang' || themeSlug === 'joglo-wayang';

  // Compute initials for the wax seal: e.g. "S & B", "Y & F", "A & O"
  const groomInitial = groomName ? groomName.trim().charAt(0).toUpperCase() : (isRoyalWayang ? 'A' : 'S');
  const brideInitial = brideName ? brideName.trim().charAt(0).toUpperCase() : (isRoyalWayang ? 'O' : 'B');

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setStage('exiting');
    setTimeout(() => {
      onComplete();
    }, 450);
  };

  useEffect(() => {
    // 0.6s: Enable skip button
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 600);

    // Stage 1: Unlocking - Golden seal resonates with 24K radiant flare (0.45s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 450);

    // Stage 2: Opening - 3D Emerald velvet folio gates swing open with realistic depth (1.05s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1050);

    // Stage 3: Gliding - Smooth cinematic glide through the opened gates directly into the invitation (2.2s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2200);

    // Stage 4: Seamless transition handoff directly into invitation (3.2s)
    const tExit = setTimeout(() => {
      handleFinish();
    }, 3200);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(tSkip);
      clearTimeout(tUnlock);
      clearTimeout(tOpen);
      clearTimeout(tGlide);
      clearTimeout(tExit);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isDoorsOpen = stage === 'opening' || stage === 'gliding' || stage === 'exiting';
  const isGliding = stage === 'gliding' || stage === 'exiting';
  const isExiting = stage === 'exiting';

  return (
    <div 
      className={`fixed top-0 right-0 h-full ${
        isRoyalWayang ? 'w-full lg:w-[42%]' : 'w-full lg:w-7/12 xl:w-1/2'
      } z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#C5A059]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#041610] transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      <style>{`
        @keyframes nirwana-seal-pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 6px 16px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.35));
          }
          50% {
            transform: scale(1.025);
            filter: drop-shadow(0 8px 20px rgba(0,0,0,0.9)) drop-shadow(0 0 16px rgba(245, 215, 120, 0.6));
          }
        }

        @keyframes nirwana-god-rays {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.08) rotate(1.2deg);
          }
        }

        @keyframes nirwana-gold-flare {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.15);
          }
          100% {
            opacity: 0;
            transform: scale(1.35);
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. SCENIC TELAGA SARANGAN / ROYAL WAYANG BACKDROP                         */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: isGliding ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        {isRoyalWayang ? (
          <>
            {/* Royal Wayang Gold backdrop */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/themes/royal-wayang-bg.jpg)' }}
            />
            {/* Soft luxury dark gold & charcoal vignette overlays */}
            <div className="absolute inset-0 z-2 bg-radial from-transparent via-[#0f0c05]/75 to-[#000000]/95" />
            <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#0a0705] via-transparent to-[#0a0705]/90" />
          </>
        ) : (
          <>
            {/* Scenic lake image background fallback */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/themes/nirwana-sarangan/lakeview-panorama.jpg)' }}
            />
            <video 
              src="/gemini_generated_video_55ad2241.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] saturate-[1.1] relative z-1"
            />
            {/* Soft luxury emerald vignette overlays */}
            <div className="absolute inset-0 z-2 bg-radial from-transparent via-[#03150F]/65 to-[#020D0A]/95" />
            <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#020D0A] via-transparent to-[#020D0A]/85" />
          </>
        )}
      </div>

      {/* Billowing Mountain Lake Mist (Nirwana) */}
      {!isRoyalWayang && <FloatingLakeMist />}

      {/* Shimmering Golden Dust Particles */}
      <FloatingGoldenDust count={isRoyalWayang ? 16 : 12} />

      {/* Falling 24K Gold Foil Flakes & Starlight Diamonds */}
      <FallingPineParticles count={10} className="z-25 opacity-70" />

      {/* ========================================================================= */}
      {/* 2. PHOTOREALISTIC 3D ROYAL GILDED ARCH GATE & INNER REVEAL SANCTUM        */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-full max-w-[500px] max-h-[100dvh] flex items-center justify-center will-change-transform z-10 p-2 sm:p-4"
        style={{
          transform: isGliding ? 'scale(2.3)' : 'scale(1)',
          opacity: isGliding ? 0 : 1,
          transformOrigin: '50% 50%',
          transition: isGliding 
            ? 'transform 1.25s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.95s cubic-bezier(0.4, 0, 0.8, 1)' 
            : 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        {/* 768 x 1376 Aspect Frame Canvas with 3D Architectural Perspective */}
        <div 
          className="relative w-full aspect-[768/1376] max-h-[96dvh] flex items-center justify-center overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >

          {/* A. RECESSED INNER DOORWAY INTERIOR (Deep 3D Architectural Depth behind the doors) */}
          <div 
            className="absolute z-5 pointer-events-none transition-all duration-1000"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '81.25%',
              height: '83.43%',
              background: isDoorsOpen
                ? 'radial-gradient(ellipse at 50% 50%, #153e2e 0%, #082218 50%, #03120d 100%)'
                : 'radial-gradient(ellipse at 50% 45%, rgba(16, 50, 36, 0.45) 0%, rgba(3, 14, 10, 0.95) 70%, rgba(2, 8, 5, 0.99) 100%)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95)',
              borderRadius: '240px 240px 0 0',
            }}
          />

          {/* B. VOLUMETRIC DIVINE GOLDEN LIGHT BURST (Beams forward directly as doors open) */}
          <div 
            className={`absolute inset-0 z-8 pointer-events-none transition-all duration-1000 ease-out ${
              isDoorsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 248, 210, 0.92) 0%, rgba(212, 175, 55, 0.45) 45%, transparent 75%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'nirwana-god-rays 3.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* C. LEFT 3D SOLID CARVED EMERALD DOOR LEAF (With Real 12px 3D Side Thickness) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '40.625%',
              height: '83.5%',
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              transform: isDoorsOpen 
                ? 'rotateY(-80deg) translateZ(4px)' 
                : 'rotateY(0deg) translateZ(0px)',
              transition: 'transform 1.45s cubic-bezier(0.16, 1, 0.3, 1), filter 1.3s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.76) contrast(1.12) drop-shadow(12px 6px 24px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-left.png" 
              alt="Pintu Gerbang Kiri Nirwana" 
              className="w-full h-full object-contain object-left-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 12px - Solid Velvet & Gold Trim) */}
            <div 
              className="absolute pointer-events-none"
              style={{
                top: 0,
                bottom: 0,
                right: 0,
                width: '12px',
                transformOrigin: 'right center',
                transform: 'rotateY(-90deg)',
                background: 'linear-gradient(to right, #09261a, #1a4a35, #0a2217)',
                borderRight: '1.5px solid #d4af37',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.85)',
              }}
            />

            {/* Back Face (Deep Royal Emerald Velvet) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-12px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #061c14, #020d09)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
              }}
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1000 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* D. RIGHT 3D SOLID CARVED EMERALD DOOR LEAF (With Real 12px 3D Side Thickness) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '50.0%',
              top: '8.43%',
              width: '40.625%',
              height: '83.5%',
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              transform: isDoorsOpen 
                ? 'rotateY(80deg) translateZ(4px)' 
                : 'rotateY(0deg) translateZ(0px)',
              transition: 'transform 1.45s cubic-bezier(0.16, 1, 0.3, 1), filter 1.3s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.76) contrast(1.12) drop-shadow(-12px 6px 24px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(-2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-right.png" 
              alt="Pintu Gerbang Kanan Nirwana" 
              className="w-full h-full object-contain object-right-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 12px - Solid Velvet & Gold Trim) */}
            <div 
              className="absolute pointer-events-none"
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                width: '12px',
                transformOrigin: 'left center',
                transform: 'rotateY(90deg)',
                background: 'linear-gradient(to left, #09261a, #1a4a35, #0a2217)',
                borderLeft: '1.5px solid #d4af37',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.85)',
              }}
            />

            {/* Back Face (Deep Royal Emerald Velvet) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-12px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #061c14, #020d09)',
                border: '1px solid rgba(197, 160, 89, 0.35)',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.9)',
              }}
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1000 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* E. ROYAL 24K GOLD CARVED MEDALLION SEAL (Central Lock Mechanism) */}
          <div 
            className="absolute z-20 pointer-events-none will-change-transform"
            style={{
              left: '50.0%',
              top: '49.855%',
              width: '37.89%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className="relative w-full aspect-square flex items-center justify-center will-change-transform"
              style={{
                transform: stage === 'intro' 
                  ? 'scale(1)' 
                  : stage === 'unlocking' 
                    ? 'scale(1.16)' 
                    : 'scale(1.28)',
                opacity: isDoorsOpen ? 0 : 1,
                filter: stage === 'unlocking' 
                  ? 'drop-shadow(0 8px 25px rgba(0,0,0,0.9)) drop-shadow(0 0 24px rgba(255, 225, 130, 0.85))' 
                  : 'drop-shadow(0 6px 18px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.35))',
                transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, filter 0.4s ease',
                animation: stage === 'intro' ? 'nirwana-seal-pulse 3.6s ease-in-out infinite' : 'none',
              }}
            >
              {/* Photorealistic 24K Gold Carved Medallion Seal */}
              <img 
                src="/themes/nirwana-door-seal.png" 
                alt="Medali Emas Nirwana" 
                className="w-full h-full object-contain select-none"
              />

              {/* Dynamic Monogram Initials overlaid in center of medallion */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="w-[61%] h-[61%] rounded-full flex flex-col items-center justify-center text-center">
                  <div className="flex items-center justify-center leading-none">
                    <span 
                      className="font-serif font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#F2D7A5] to-[#B89045] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {groomInitial}
                    </span>
                    <span 
                      className="font-serif italic font-normal text-xs sm:text-sm text-[#F0DAA8] mx-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      &amp;
                    </span>
                    <span 
                      className="font-serif font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#F2D7A5] to-[#B89045] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {brideInitial}
                    </span>
                  </div>
                </div>
              </div>

              {/* Radiant Light Flare Shockwaves on Unlock */}
              {stage === 'unlocking' && (
                <>
                  <div className="absolute inset-0 rounded-full border border-amber-300 animate-ping opacity-75 pointer-events-none" />
                  <div 
                    className="absolute -inset-6 rounded-full bg-radial from-white/70 via-amber-300/30 to-transparent pointer-events-none"
                    style={{ animation: 'nirwana-gold-flare 0.75s ease-out forwards' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* F. FOREGROUND ARCH FRAME (Solid 24K Gold Corinthian Pilasters & Pediment Arch) */}
          <div className="absolute inset-0 z-25 pointer-events-none select-none">
            <img 
              src="/themes/nirwana-door-frame.png" 
              alt="Gerbang Megah Nirwana Sarangan" 
              className="w-full h-full object-cover select-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* G. TOP ROYAL CARTOUCHE BADGE */}
          <div 
            className={`absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-600 text-center pointer-events-none w-11/12 max-w-xs ${
              stage !== 'intro' ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-[#020D0A]/85 backdrop-blur-md border border-[#C5A059]/60 shadow-[0_6px_25px_rgba(0,0,0,0.7)] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.26em] uppercase text-[#F3E5AB] font-semibold drop-shadow-sm truncate">
                {isRoyalWayang ? 'ROYAL WAYANG GOLD • THE SACRED WEDDING' : 'HOTEL NIRWANA SARANGAN'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
            </div>
          </div>

          {/* H. BOTTOM RECIPIENT GUEST VIP BADGE (Dynamic if guestName is given) */}
          {guestName && guestName.trim() !== '' && guestName !== 'Tamu Undangan' && (
            <div 
              className={`absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 transition-all duration-600 text-center pointer-events-none w-11/12 max-w-xs ${
                stage !== 'intro' ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              <div className="px-5 py-3 rounded-2xl bg-[#041610]/92 backdrop-blur-md border border-[#C5A059]/50 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
                <p className="text-[9px] uppercase font-serif tracking-[0.22em] text-[#A2D2C3] font-medium">
                  Kepada Yth. Tamu Kehormatan:
                </p>
                <p className="text-sm sm:text-base font-serif font-bold text-white tracking-wide mt-0.5 truncate drop-shadow">
                  {guestName}
                </p>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Instant Skip Button - Accessible min 44x44px target */}
      <button 
        type="button"
        aria-label="Lewati animasi gerbang"
        onClick={(e) => {
          e.stopPropagation();
          handleFinish();
        }}
        className={`absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2.5 min-h-[44px] min-w-[44px] rounded-full bg-[#020D0A]/85 hover:bg-[#020D0A] backdrop-blur-md border border-[#C5A059]/60 hover:border-[#C5A059] text-[#F3E5AB] hover:text-white text-[11px] font-serif tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.8)] focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-[#020D0A] cursor-pointer ${
          canSkip ? 'opacity-100 pointer-events-auto active:scale-95' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span>Lewati</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E2C792]" />
      </button>
    </div>
  );
};

export default NirwanaSaranganEntrancePortal;
