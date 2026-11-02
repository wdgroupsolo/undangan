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

    // Stage 1: Unlocking - Golden seal resonates with 24K flare & central seam unlock (0.6s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 600);

    // Stage 2: Opening - 3D Emerald velvet folio gates swing open with realistic depth (1.15s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1150);

    // Stage 3: Gliding - Smooth cinematic 3D camera fly-through through the opened gates (2.5s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2500);

    // Stage 4: Seamless transition handoff into invitation (3.8s)
    const tExit = setTimeout(() => {
      handleFinish();
    }, 3800);

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
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#03130d] transition-opacity duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } ${canSkip ? 'cursor-pointer' : ''}`}
    >
      <style>{`
        @keyframes nirwana-seal-breathe {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 6px 18px rgba(0,0,0,0.9)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.4));
          }
          50% {
            transform: scale(1.03);
            filter: drop-shadow(0 8px 24px rgba(0,0,0,0.95)) drop-shadow(0 0 22px rgba(255, 225, 130, 0.75));
          }
        }

        @keyframes nirwana-god-rays-beam {
          0% {
            opacity: 0;
            transform: scale(0.9) rotate(0deg);
          }
          30% {
            opacity: 0.95;
            transform: scale(1.1) rotate(1deg);
          }
          70% {
            opacity: 1;
            transform: scale(1.22) rotate(-1deg);
          }
          100% {
            opacity: 0.7;
            transform: scale(1.35) rotate(1.5deg);
          }
        }

        @keyframes nirwana-shockwave-ring {
          0% {
            opacity: 0.9;
            transform: scale(0.85);
            border-width: 3px;
          }
          100% {
            opacity: 0;
            transform: scale(2.2);
            border-width: 0.5px;
          }
        }

        @keyframes nirwana-light-pillar {
          0% {
            opacity: 0;
            transform: scaleX(0.2);
          }
          40% {
            opacity: 1;
            transform: scaleX(1.4);
          }
          100% {
            opacity: 0.85;
            transform: scaleX(1.1);
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. SCENIC TELAGA SARANGAN & HOTEL NIRWANA RESORT DRONE VIDEO BACKDROP     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Fallback image behind video for zero-delay loading */}
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
          className="w-full h-full object-cover object-center brightness-[0.72] contrast-[1.12] saturate-[1.15]"
        />
        {/* Cinematic royal emerald vignette overlays */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#03150F]/70 to-[#020D0A]/95" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020D0A] via-transparent to-[#020D0A]/85" />
      </div>

      {/* Billowing Mountain Lake Mist */}
      <FloatingLakeMist />

      {/* Shimmering Golden Dust Particles */}
      <FloatingGoldenDust count={18} />

      {/* Falling 24K Gold Foil Flakes & Starlight Particles */}
      <FallingPineParticles count={14} className="z-25 opacity-75" />

      {/* ========================================================================= */}
      {/* 2. 3D ROYAL GILDED ARCH GATEWAY & WALK-THROUGH STAGE CONTAINER           */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-full max-w-[540px] max-h-[100dvh] flex items-center justify-center will-change-transform z-10 p-2 sm:p-4"
        style={{
          transform: isGliding 
            ? 'scale(2.35) translateZ(350px)' 
            : 'scale(1) translateZ(0px)',
          opacity: isGliding ? 0 : 1,
          transformOrigin: '50% 50%',
          transition: isGliding 
            ? 'transform 1.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.35s cubic-bezier(0.4, 0, 0.8, 1)' 
            : 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        {/* 768 x 1376 Aspect Frame Canvas with 3D Architectural Perspective */}
        <div 
          className="relative w-full aspect-[768/1376] max-h-[96dvh] flex items-center justify-center overflow-hidden rounded-t-[240px] shadow-[0_35px_100px_rgba(0,0,0,0.98),0_0_50px_rgba(197,160,89,0.3)]"
          style={{ perspective: '1600px', transformStyle: 'preserve-3d' }}
        >

          {/* A. RECESSED INNER DOOR JAMB DEPTH (Behind the doors) */}
          <div 
            className="absolute z-5 pointer-events-none"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '81.25%',
              height: '83.43%',
              background: 'radial-gradient(ellipse at 50% 40%, rgba(18, 52, 38, 0.7) 0%, rgba(3, 14, 10, 0.98) 100%)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95), inset 0 0 25px rgba(197,160,89,0.2)',
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
              padding: '28px 22px 32px 22px',
              background: 'radial-gradient(ellipse at 50% 35%, #0B2B1F 0%, #051811 65%, #020C08 100%)',
              boxShadow: 'inset 0 0 45px rgba(0,0,0,0.9), inset 0 1px 2px rgba(226,199,146,0.3)',
              transform: isDoorsOpen ? 'scale(1)' : 'scale(0.96)',
              opacity: isDoorsOpen ? 1 : 0.4,
              transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease-out',
            }}
          >
            {/* Top Crown & Hotel Crest */}
            <div className="pt-2 flex flex-col items-center">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/50 shadow-md backdrop-blur-xs">
                <Crown className="w-3.5 h-3.5 text-[#E2C792]" />
                <span className="text-[10px] font-serif font-bold uppercase tracking-[0.25em] text-[#F3E5AB]">
                  HOTEL NIRWANA SARANGAN
                </span>
                <Crown className="w-3.5 h-3.5 text-[#E2C792]" />
              </div>
              <p className="text-[9px] font-serif tracking-[0.3em] text-[#A2D2C3] uppercase mt-1.5">
                The Royal Lakeside Destination Wedding
              </p>
            </div>

            {/* Arched Couple Photo Showcase with 24K Halo Frame */}
            <div className="relative w-44 sm:w-52 aspect-[3/4] rounded-t-[110px] rounded-b-2xl overflow-hidden border-2 border-[#C5A059] shadow-[0_20px_45px_rgba(0,0,0,0.9),0_0_25px_rgba(197,160,89,0.35)] my-auto group">
              <img 
                src={coverImage} 
                alt={`${groomName} & ${brideName}`} 
                className="w-full h-full object-cover object-center scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020C08]/90 via-transparent to-transparent" />
              <div className="absolute inset-0 ring-1 ring-inset ring-[#FFF9E8]/40 rounded-t-[110px] rounded-b-2xl" />
              
              {/* Couple Name Overlay at bottom of photo */}
              <div className="absolute bottom-3 inset-x-2 text-center pointer-events-none">
                <span className="text-[10px] font-serif tracking-[0.2em] text-[#E2C792] uppercase font-medium">
                  Selamat Datang
                </span>
              </div>
            </div>

            {/* Couple Names & Date */}
            <div className="pb-2 flex flex-col items-center w-full">
              <h1 
                className="text-2xl sm:text-3xl font-serif text-white font-normal tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomName} <span className="font-light italic text-[#E2C792] mx-1">&amp;</span> {brideName}
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
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 248, 205, 0.95) 0%, rgba(212, 175, 55, 0.5) 35%, transparent 72%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'nirwana-god-rays-beam 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* D. VERTICAL LIGHT BEAM PILLAR (Appears at crack of opening) */}
          <div 
            className={`absolute z-9 pointer-events-none transition-opacity duration-700 ease-out ${
              stage === 'unlocking' || (isDoorsOpen && !isGliding) ? 'opacity-90' : 'opacity-0'
            }`}
            style={{
              left: '49.2%',
              top: '8.5%',
              width: '1.6%',
              height: '83.5%',
              background: 'linear-gradient(to bottom, rgba(255,248,220,0.95), rgba(255,225,130,1), rgba(212,175,55,0.8))',
              filter: 'blur(3px) drop-shadow(0 0 15px rgba(255,245,180,0.9))',
              mixBlendMode: 'screen',
              animation: 'nirwana-light-pillar 0.8s ease-out forwards',
            }}
          />

          {/* E. LEFT 3D SOLID CARVED EMERALD DOOR LEAF (Hinged at left 0%) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '40.625%',
              height: '83.5%',
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              transform: isGliding 
                ? 'rotateY(-92deg) translateX(-45px)' 
                : isDoorsOpen 
                  ? 'rotateY(-84deg)' 
                  : 'rotateY(0deg)',
              transition: isGliding
                ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease'
                : 'transform 1.9s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.68) contrast(1.2) drop-shadow(14px 4px 28px rgba(0,0,0,0.98))' 
                : 'brightness(1) contrast(1)',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-left.png" 
              alt="Pintu Gerbang Kiri Nirwana" 
              className="w-full h-full object-contain object-left-top select-none pointer-events-none block"
            />

            {/* Dynamic 3D Door Thickness / Edge Bevel (Visible when rotated into 3D) */}
            <div 
              className={`absolute top-0 right-0 h-full w-[10px] pointer-events-none transition-opacity duration-700 ${
                isDoorsOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'rotateY(90deg) translateZ(5px)',
                transformOrigin: 'right center',
                background: 'linear-gradient(to bottom, #7A5C22 0%, #C5A059 25%, #4E3A15 70%, #8C6D2B 100%)',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)',
              }}
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-85' : 'opacity-0'
              }`}
            />
          </div>

          {/* F. RIGHT 3D SOLID CARVED EMERALD DOOR LEAF (Hinged at right 100%) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '50.0%',
              top: '8.43%',
              width: '40.625%',
              height: '83.5%',
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              transform: isGliding 
                ? 'rotateY(92deg) translateX(45px)' 
                : isDoorsOpen 
                  ? 'rotateY(84deg)' 
                  : 'rotateY(0deg)',
              transition: isGliding
                ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), filter 1.4s ease'
                : 'transform 1.9s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.68) contrast(1.2) drop-shadow(-14px 4px 28px rgba(0,0,0,0.98))' 
                : 'brightness(1) contrast(1)',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-right.png" 
              alt="Pintu Gerbang Kanan Nirwana" 
              className="w-full h-full object-contain object-right-top select-none pointer-events-none block"
            />

            {/* Dynamic 3D Door Thickness / Edge Bevel (Visible when rotated into 3D) */}
            <div 
              className={`absolute top-0 left-0 h-full w-[10px] pointer-events-none transition-opacity duration-700 ${
                isDoorsOpen ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transform: 'rotateY(-90deg) translateZ(5px)',
                transformOrigin: 'left center',
                background: 'linear-gradient(to bottom, #7A5C22 0%, #C5A059 25%, #4E3A15 70%, #8C6D2B 100%)',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.8)',
              }}
            />

            {/* Ambient Shadow Overlay on Open */}
            <div 
              className={`absolute inset-0 bg-gradient-to-l from-black/75 via-black/25 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-85' : 'opacity-0'
              }`}
            />
          </div>

          {/* G. ROYAL 24K GOLD CARVED MEDALLION SEAL (Central Lock Mechanism) */}
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
                    ? 'scale(1.18)' 
                    : 'scale(1.4)',
                opacity: isDoorsOpen ? 0 : 1,
                filter: stage === 'unlocking' 
                  ? 'drop-shadow(0 10px 30px rgba(0,0,0,0.95)) drop-shadow(0 0 30px rgba(255, 230, 140, 0.9))' 
                  : 'drop-shadow(0 6px 18px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))',
                transition: 'transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.55s ease-out, filter 0.55s ease',
                animation: stage === 'intro' ? 'nirwana-seal-breathe 3.4s ease-in-out infinite' : 'none',
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
                  <div 
                    className="absolute inset-0 rounded-full border-2 border-[#FFE9A0] pointer-events-none"
                    style={{ animation: 'nirwana-shockwave-ring 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
                  />
                  <div 
                    className="absolute -inset-8 rounded-full bg-radial from-white/80 via-amber-300/40 to-transparent pointer-events-none"
                    style={{ filter: 'blur(4px)' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* H. FOREGROUND ARCH FRAME (Solid 24K Gold Corinthian Pilasters & Pediment Arch) */}
          <div className="absolute inset-0 z-25 pointer-events-none select-none">
            <img 
              src="/themes/nirwana-door-frame.png" 
              alt="Gerbang Megah Nirwana Sarangan" 
              className="w-full h-full object-cover select-none drop-shadow-[0_18px_50px_rgba(0,0,0,0.98)]"
            />
          </div>

          {/* I. TOP ROYAL CARTOUCHE BADGE */}
          <div 
            className={`absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 -translate-y-6 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-[#020D0A]/88 backdrop-blur-md border border-[#C5A059]/60 shadow-[0_6px_25px_rgba(0,0,0,0.7)] flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.26em] uppercase text-[#F3E5AB] font-semibold drop-shadow-sm truncate">
                HOTEL NIRWANA SARANGAN
              </span>
              <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
            </div>
          </div>

          {/* J. BOTTOM RECIPIENT GUEST VIP BADGE */}
          <div 
            className={`absolute bottom-6 sm:bottom-7 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 translate-y-6 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-5 py-3 rounded-2xl bg-[#041610]/95 backdrop-blur-md border border-[#C5A059]/60 shadow-[0_10px_35px_rgba(0,0,0,0.85)]">
              <p className="text-[9px] uppercase font-serif tracking-[0.22em] text-[#A2D2C3] font-medium">
                Kepada Yth. Tamu Kehormatan:
              </p>
              <p className="text-sm sm:text-base font-serif font-bold text-white tracking-wide mt-0.5 truncate drop-shadow">
                {guestName}
              </p>
              <p className="text-[9px] font-sans text-[#E2C792]/75 tracking-wider mt-1">
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
        className={`absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2 rounded-full bg-[#020D0A]/85 hover:bg-[#020D0A] backdrop-blur-md border border-[#C5A059]/60 hover:border-[#C5A059] text-[#F3E5AB] hover:text-white text-[11px] font-serif tracking-widest uppercase flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.8)] ${
          canSkip ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span>Lewati</span>
        <ChevronRight className="w-3.5 h-3.5 text-[#E2C792]" />
      </div>
    </div>
  );
};
