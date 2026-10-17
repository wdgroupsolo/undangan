import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight, Crown } from 'lucide-react';
import { 
  RoyalCalligraphicDivider, 
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
}

export const NirwanaSaranganEntrancePortal: React.FC<NirwanaSaranganEntrancePortalProps> = ({
  onComplete,
  guestName = 'Tamu Undangan',
  groomName = 'Steven',
  brideName = 'Bunga',
  coverImage = '/themes/nirwana-sarangan/couple-cover.jpg',
  weddingDate = 'Sabtu, 24 Oktober 2026'
}) => {
  // Animation stages: 'intro' -> 'unlocking' -> 'opening' -> 'gliding' -> 'exiting'
  const [stage, setStage] = useState<'intro' | 'unlocking' | 'opening' | 'gliding' | 'exiting'>('intro');
  const [canSkip, setCanSkip] = useState(false);
  const isFinishedRef = useRef(false);

  // Compute initials for the wax seal: e.g. "S & B"
  const groomInitial = groomName ? groomName.trim().charAt(0).toUpperCase() : 'S';
  const brideInitial = brideName ? brideName.trim().charAt(0).toUpperCase() : 'B';
  const sealInitials = `${groomInitial}&${brideInitial}`;

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setStage('exiting');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    // 0.25s: Enable instant skip
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 250);

    // Stage 1: Unlocking - Golden seal resonates with divine emerald & 24K flare (0.7s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 700);

    // Stage 2: Opening - 3D Emerald velvet folio gates swing open with realistic depth (1.2s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1200);

    // Stage 3: Gliding - Smooth cinematic glide through the opened gates into the invitation (2.4s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2400);

    // Stage 4: Seamless transition handoff into invitation (3.7s)
    const tExit = setTimeout(() => {
      handleFinish();
    }, 3700);

    return () => {
      clearTimeout(tSkip);
      clearTimeout(tUnlock);
      clearTimeout(tOpen);
      clearTimeout(tGlide);
      clearTimeout(tExit);
    };
  }, []);

  const isDoorsOpen = stage === 'opening' || stage === 'gliding' || stage === 'exiting';
  const isGliding = stage === 'gliding' || stage === 'exiting';
  const isExiting = stage === 'exiting';

  return (
    <div 
      onClick={() => {
        if (canSkip) handleFinish();
      }}
      className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#C5A059]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#041610] transition-opacity duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } ${canSkip ? 'cursor-pointer' : ''}`}
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
      {/* 1. SCENIC TELAGA SARANGAN & HOTEL NIRWANA DRONE VIDEO BACKDROP           */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video 
          src="/gemini_generated_video_55ad2241.mp4" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.08] saturate-[1.1]"
        />
        {/* Soft luxury emerald vignette overlays */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#03150F]/65 to-[#020D0A]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020D0A] via-transparent to-[#020D0A]/85" />
      </div>

      {/* Billowing Mountain Lake Mist */}
      <FloatingLakeMist />

      {/* Shimmering Golden Dust Particles */}
      <FloatingGoldenDust count={12} />

      {/* Falling 24K Gold Foil Flakes & Starlight Diamonds */}
      <FallingPineParticles count={10} className="z-25 opacity-70" />

      {/* ========================================================================= */}
      {/* 2. PHOTOREALISTIC 3D ROYAL GILDED ARCH GATE & INNER REVEAL SANCTUM        */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-full max-w-[500px] max-h-[100dvh] flex items-center justify-center will-change-transform z-10 p-2 sm:p-4"
        style={{
          transform: isGliding ? 'scale(1.8)' : 'scale(1)',
          opacity: isGliding ? 0 : 1,
          transformOrigin: '50% 52%',
          transition: isGliding 
            ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s cubic-bezier(0.4, 0, 0.8, 1)' 
            : 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        {/* 768 x 1376 Aspect Frame Canvas with 3D Architectural Perspective */}
        <div 
          className="relative w-full aspect-[768/1376] max-h-[96dvh] flex items-center justify-center overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
          style={{ perspective: '1300px', transformStyle: 'preserve-3d' }}
        >

          {/* A. RECESSED INNER DOOR JAMB DEPTH (Behind the doors) */}
          <div 
            className="absolute z-5 pointer-events-none"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '81.25%',
              height: '83.43%',
              background: 'radial-gradient(ellipse at center, rgba(16, 44, 32, 0.45) 0%, rgba(2, 10, 7, 0.98) 100%)',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.95)',
              borderRadius: '240px 240px 0 0',
            }}
          />

          {/* B. INNER SANCTUM REVEAL CARD (Revealed when folio doors swing open) */}
          <div 
            className="absolute z-6 flex flex-col items-center justify-between text-center overflow-hidden"
            style={{
              left: '10.5%',
              top: '9.5%',
              width: '79.0%',
              height: '81.5%',
              borderRadius: '230px 230px 0 0',
              padding: '24px 20px 28px 20px',
              background: 'radial-gradient(ellipse at 50% 35%, #082218 0%, #04140e 65%, #020a07 100%)',
              boxShadow: 'inset 0 0 40px rgba(0,0,0,0.85)',
            }}
          >
            {/* Top Crest */}
            <div className="pt-2 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/40 shadow-sm">
                <Crown className="w-3 h-3 text-[#E2C792]" />
                <span className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] text-[#F3E5AB]">
                  HOTEL NIRWANA SARANGAN
                </span>
                <Crown className="w-3 h-3 text-[#E2C792]" />
              </div>
              <p className="text-[9px] font-serif tracking-[0.3em] text-[#A2D2C3] uppercase mt-1.5">
                The Royal Lakeside Wedding
              </p>
            </div>

            {/* Arched Couple Photo */}
            <div className="relative w-40 sm:w-48 aspect-[3/4] rounded-t-[100px] rounded-b-2xl overflow-hidden border-2 border-[#C5A059] shadow-[0_15px_35px_rgba(0,0,0,0.85)] my-auto group">
              <img 
                src={coverImage} 
                alt={`${groomName} & ${brideName}`} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020C08]/85 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#FFF9E8]/30 rounded-t-[100px] rounded-b-2xl" />
            </div>

            {/* Couple Names & Date */}
            <div className="pb-2 flex flex-col items-center w-full">
              <h1 
                className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomName} <span className="font-light italic text-[#E2C792]">&amp;</span> {brideName}
              </h1>

              <RoyalCalligraphicDivider className="my-1.5 opacity-90 scale-90" />

              <p className="text-xs font-serif text-[#F3E5AB] tracking-widest uppercase">
                {weddingDate}
              </p>
              <p className="text-[10px] text-[#A2D2C3] font-serif tracking-wider italic mt-0.5">
                Telaga Sarangan, Magetan, Jawa Timur
              </p>
            </div>
          </div>

          {/* C. VOLUMETRIC DIVINE GOLDEN LIGHT BURST (Beams forward through opening doors) */}
          <div 
            className={`absolute inset-0 z-8 pointer-events-none transition-opacity duration-1000 ease-out ${
              isDoorsOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 245, 190, 0.95) 0%, rgba(197, 160, 89, 0.45) 40%, transparent 75%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'nirwana-god-rays 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* D. LEFT 3D SOLID CARVED EMERALD DOOR LEAF */}
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
                ? 'rotateY(-78deg)' 
                : 'rotateY(0deg)',
              transition: 'transform 1.85s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.75) contrast(1.15) drop-shadow(10px 4px 22px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1)',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-left.png" 
              alt="Pintu Gerbang Kiri Nirwana" 
              className="w-full h-full object-contain object-left-top select-none pointer-events-none block"
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* E. RIGHT 3D SOLID CARVED EMERALD DOOR LEAF */}
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
                ? 'rotateY(78deg)' 
                : 'rotateY(0deg)',
              transition: 'transform 1.85s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.75) contrast(1.15) drop-shadow(-10px 4px 22px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1)',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-right.png" 
              alt="Pintu Gerbang Kanan Nirwana" 
              className="w-full h-full object-contain object-right-top select-none pointer-events-none block"
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* F. ROYAL 24K GOLD CARVED MEDALLION SEAL (Central Lock Mechanism) */}
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
                    ? 'scale(1.15)' 
                    : 'scale(1.35)',
                opacity: isDoorsOpen ? 0 : 1,
                filter: stage === 'unlocking' 
                  ? 'drop-shadow(0 8px 25px rgba(0,0,0,0.9)) drop-shadow(0 0 24px rgba(255, 225, 130, 0.75))' 
                  : 'drop-shadow(0 6px 18px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(212, 175, 55, 0.35))',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease',
                animation: stage === 'intro' ? 'nirwana-seal-pulse 3.6s ease-in-out infinite' : 'none',
              }}
            >
              {/* Photorealistic 24K Gold Carved Medallion Seal */}
              <img 
                src="/themes/nirwana-door-seal.png" 
                alt="Medali Emas Nirwana" 
                className="w-full h-full object-contain select-none"
              />

              {/* Dynamic 24K Monogram Initials overlaid in center of medallion */}
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
                    style={{ animation: 'nirwana-gold-flare 0.85s ease-out forwards' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* G. FOREGROUND ARCH FRAME (Solid 24K Gold Corinthian Pilasters & Pediment Arch) */}
          <div className="absolute inset-0 z-25 pointer-events-none select-none">
            <img 
              src="/themes/nirwana-door-frame.png" 
              alt="Gerbang Megah Nirwana Sarangan" 
              className="w-full h-full object-cover select-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* H. TOP ROYAL CARTOUCHE BADGE */}
          <div 
            className={`absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 -translate-y-5 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-[#020D0A]/85 backdrop-blur-md border border-[#C5A059]/60 shadow-[0_6px_25px_rgba(0,0,0,0.7)] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.26em] uppercase text-[#F3E5AB] font-semibold drop-shadow-sm truncate">
                HOTEL NIRWANA SARANGAN
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
            </div>
          </div>

          {/* I. BOTTOM RECIPIENT GUEST VIP BADGE */}
          <div 
            className={`absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 translate-y-5 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-5 py-3 rounded-2xl bg-[#041610]/92 backdrop-blur-md border border-[#C5A059]/50 shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
              <p className="text-[9px] uppercase font-serif tracking-[0.22em] text-[#A2D2C3] font-medium">
                Kepada Yth. Tamu Kehormatan:
              </p>
              <p className="text-sm sm:text-base font-serif font-bold text-white tracking-wide mt-0.5 truncate drop-shadow">
                {guestName}
              </p>
              <p className="text-[9px] font-sans text-[#E2C792]/70 tracking-wider mt-1">
                Ketuk di mana saja untuk melewati
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Instant Skip Button */}
      <div 
        onClick={(e) => {
          if (canSkip) {
            e.stopPropagation();
            handleFinish();
          }
        }}
        className={`absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2 rounded-full bg-[#020D0A]/80 hover:bg-[#020D0A] backdrop-blur-md border border-[#C5A059]/50 hover:border-[#C5A059] text-[#F3E5AB] hover:text-white text-[11px] font-serif tracking-widest uppercase flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.7)] ${
          canSkip ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span>Lewati</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E2C792]" />
      </div>
    </div>
  );
};
