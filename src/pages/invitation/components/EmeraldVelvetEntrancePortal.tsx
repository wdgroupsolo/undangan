import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronRight, Crown, Sparkles } from 'lucide-react';

interface EmeraldVelvetEntrancePortalProps {
  onComplete: () => void;
  guestName?: string;
  groomName?: string;
  brideName?: string;
  coverImage?: string;
  weddingDate?: string;
}

export const EmeraldVelvetEntrancePortal: React.FC<EmeraldVelvetEntrancePortalProps> = ({
  onComplete,
  guestName = 'Tamu Undangan',
  groomName = 'Steven',
  brideName = 'Bunga',
  coverImage,
  weddingDate = 'Senin, 12 Oktober 2026'
}) => {
  // Animation stages: 'intro' -> 'unlocking' -> 'opening' -> 'gliding' -> 'exiting'
  const [stage, setStage] = useState<'intro' | 'unlocking' | 'opening' | 'gliding' | 'exiting'>('intro');
  const [canSkip, setCanSkip] = useState(false);
  const isFinishedRef = useRef(false);

  const groomInitial = groomName ? groomName.trim().charAt(0).toUpperCase() : 'S';
  const brideInitial = brideName ? brideName.trim().charAt(0).toUpperCase() : 'B';

  const handleFinish = useCallback(() => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setStage('exiting');
    setTimeout(() => {
      onComplete();
    }, 380);
  }, [onComplete]);

  useEffect(() => {
    // Enable skip button after 0.5s
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 500);

    // Stage 1: Unlocking - Golden seal resonates with 24K radiant flare shockwave (0.45s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 450);

    // Stage 2: Opening - 3D Emerald Velvet gates swing open with realistic depth (1.05s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1050);

    // Stage 3: Gliding - Smooth cinematic glide directly into the royal sanctuary (2.2s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2200);

    // Stage 4: Seamless transition handoff directly into digital invitation (3.15s)
    const tExit = setTimeout(() => {
      handleFinish();
    }, 3150);

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
  }, [handleFinish]);

  const isDoorsOpen = stage === 'opening' || stage === 'gliding' || stage === 'exiting';
  const isGliding = stage === 'gliding' || stage === 'exiting';
  const isExiting = stage === 'exiting';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#ECC880]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.95)] bg-[#041610] transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 pointer-events-auto scale-100'
      }`}
    >
      <style>{`
        @keyframes emerald-seal-pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 6px 16px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(236, 200, 128, 0.45));
          }
          50% {
            transform: scale(1.03);
            filter: drop-shadow(0 10px 24px rgba(0,0,0,0.95)) drop-shadow(0 0 20px rgba(255, 235, 175, 0.75));
          }
        }

        @keyframes emerald-god-rays {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.08) rotate(1.5deg);
          }
        }

        @keyframes emerald-gold-flare {
          0% {
            opacity: 0;
            transform: scale(0.8);
          }
          50% {
            opacity: 0.85;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(1.4);
          }
        }
      `}</style>

      {/* 1. Deep Ballroom Ambient Backdrop with Warm Vignette */}
      <div 
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none transition-transform duration-1000 ease-out will-change-transform"
        style={{
          transform: isGliding ? 'scale(1.2)' : 'scale(1)'
        }}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${coverImage || '/photos/photo-3.jpg'})` }}
        />
        <div className="absolute inset-0 z-2 bg-radial from-transparent via-[#03150F]/80 to-[#020D0A]/98" />
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#020D0A] via-[#041610]/60 to-[#020D0A]/95" />
      </div>

      {/* 2. Floating 24K Golden Stardust Sparks */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#ECC880]"
            style={{
              width: `${(i % 3) * 2 + 3}px`,
              height: `${(i % 3) * 2 + 3}px`,
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 95}%`,
              opacity: (i % 5 + 4) / 10,
              filter: 'blur(0.5px) drop-shadow(0 0 6px #ECC880)',
              animation: `pulse ${(i % 3) + 2}s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 3. PHOTOREALISTIC 3D ROYAL GILDED ARCH GATE & INNER REVEAL SANCTUM        */}
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

          {/* A. RECESSED INNER SANCTUARY: Grand Royal Hallway with Couple Portrait */}
          <div 
            className="absolute z-5 overflow-hidden transition-all duration-1000"
            style={{
              left: '9.375%',
              top: '8.43%',
              width: '81.25%',
              height: '83.43%',
              borderRadius: '240px 240px 0 0',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95), 0 0 35px rgba(236,200,128,0.25)',
            }}
          >
            {/* Romantic Couple Photo inside the Sanctuary */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1200 ease-out will-change-transform"
              style={{
                backgroundImage: `url(${coverImage || '/photos/photo-3.jpg'})`,
                transform: isDoorsOpen ? (isGliding ? 'scale(1.18)' : 'scale(1.06)') : 'scale(1)',
              }}
            />
            {/* Royal Emerald & Warm Golden Atmospheric Vignettes */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#041610] via-[#041610]/45 to-black/35" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#041610]/30 to-[#041610]/75" />

            {/* Welcome Greeting inside the Hallway */}
            <div className={`absolute bottom-8 inset-x-4 text-center transition-all duration-800 pointer-events-none ${
              isDoorsOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041610]/85 border border-[#ECC880]/60 text-[#ECC880] text-[9.5px] font-serif uppercase tracking-[0.25em] font-bold shadow-md mb-2">
                <Crown className="w-3 h-3 text-[#ECC880]" />
                <span>MEMASUKI RESEPSI KERAJAAN</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF2D6] to-[#ECC880] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {groomName} &amp; {brideName}
              </h3>
              <p className="text-xs text-[#A0C4B4] font-serif italic mt-1 drop-shadow-md">
                Grand Ballroom Sahara Hotel • {weddingDate}
              </p>
            </div>
          </div>

          {/* B. VOLUMETRIC ROYAL GOLDEN LIGHT BURST */}
          <div 
            className={`absolute inset-0 z-8 pointer-events-none transition-all duration-1000 ease-out ${
              isDoorsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 248, 210, 0.95) 0%, rgba(236, 200, 128, 0.45) 45%, transparent 75%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'emerald-god-rays 3.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* C. LEFT 3D SOLID CARVED EMERALD & GOLD DOOR LEAF */}
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
                ? 'brightness(0.78) contrast(1.12) drop-shadow(12px 6px 24px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-left.png" 
              alt="Pintu Gerbang Kiri Kerajaan" 
              className="w-full h-full object-contain object-left-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 12px) */}
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
                borderRight: '1.5px solid #ECC880',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.85)',
              }}
            />

            {/* Back Face (Deep Royal Emerald Velvet) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-12px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #061c14, #020d09)',
                border: '1px solid rgba(236, 200, 128, 0.35)',
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

          {/* D. RIGHT 3D SOLID CARVED EMERALD & GOLD DOOR LEAF */}
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
                ? 'brightness(0.78) contrast(1.12) drop-shadow(-12px 6px 24px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(-2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Photorealistic Carved Velvet & 24K Gold Face */}
            <img 
              src="/themes/nirwana-door-right.png" 
              alt="Pintu Gerbang Kanan Kerajaan" 
              className="w-full h-full object-contain object-right-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 12px) */}
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
                borderLeft: '1.5px solid #ECC880',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.85)',
              }}
            />

            {/* Back Face (Deep Royal Emerald Velvet) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-12px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #061c14, #020d09)',
                border: '1px solid rgba(236, 200, 128, 0.35)',
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

          {/* E. ROYAL 24K GOLD CARVED MEDALLION SEAL (Central Latch Mechanism) */}
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
                    : 'scale(1.3)',
                opacity: isDoorsOpen ? 0 : 1,
                filter: stage === 'unlocking' 
                  ? 'drop-shadow(0 8px 25px rgba(0,0,0,0.9)) drop-shadow(0 0 24px rgba(255, 235, 175, 0.9))' 
                  : 'drop-shadow(0 6px 18px rgba(0,0,0,0.85)) drop-shadow(0 0 8px rgba(236, 200, 128, 0.45))',
                transition: 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out, filter 0.4s ease',
                animation: stage === 'intro' ? 'emerald-seal-pulse 3.2s ease-in-out infinite' : 'none',
              }}
            >
              {/* Photorealistic 24K Gold Carved Medallion */}
              <img 
                src="/themes/nirwana-door-seal.png" 
                alt="Medali Emas Kerajaan" 
                className="w-full h-full object-contain select-none"
              />

              {/* Dynamic Monogram Initials overlaid in center of medallion */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                <div className="w-[62%] h-[62%] rounded-full flex flex-col items-center justify-center text-center">
                  <Crown className="w-3.5 h-3.5 text-[#ECC880] mb-0.5 drop-shadow-sm shrink-0" />
                  <div className="flex items-center justify-center leading-none">
                    <span 
                      className="font-serif font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#ECC880] to-[#B89045] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                    >
                      {groomInitial}
                    </span>
                    <span 
                      className="font-serif italic font-normal text-xs text-[#ECC880] mx-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                    >
                      &amp;
                    </span>
                    <span 
                      className="font-serif font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#ECC880] to-[#B89045] drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                    >
                      {brideInitial}
                    </span>
                  </div>
                  <span className="text-[7.5px] font-sans uppercase tracking-[0.2em] text-[#ECC880]/90 font-semibold mt-0.5">
                    EMERALD ROYAL
                  </span>
                </div>
              </div>

              {/* Radiant Light Flare Shockwaves on Unlock */}
              {stage === 'unlocking' && (
                <>
                  <div className="absolute inset-0 rounded-full border border-[#ECC880] animate-ping opacity-75 pointer-events-none" />
                  <div 
                    className="absolute -inset-6 rounded-full bg-radial from-white/70 via-[#ECC880]/40 to-transparent pointer-events-none"
                    style={{ animation: 'emerald-gold-flare 0.75s ease-out forwards' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* F. FOREGROUND ARCH FRAME (Solid 24K Gold Corinthian Columns & Pediment Arch) */}
          <div className="absolute inset-0 z-25 pointer-events-none select-none">
            <img 
              src="/themes/nirwana-door-frame.png" 
              alt="Gerbang Megah Kerajaan" 
              className="w-full h-full object-cover select-none drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]"
            />
          </div>

          {/* G. TOP ROYAL CARTOUCHE BADGE */}
          <div 
            className={`absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-600 text-center pointer-events-none w-11/12 max-w-xs ${
              stage !== 'intro' ? 'opacity-0 -translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-[#020D0A]/85 backdrop-blur-md border border-[#ECC880]/60 shadow-[0_6px_25px_rgba(0,0,0,0.7)] flex items-center justify-center gap-2">
              <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
              <span className="text-[10px] uppercase font-serif tracking-[0.25em] text-[#ECC880] font-bold">
                WD ROYAL MASTERPIECE
              </span>
            </div>
          </div>

          {/* H. BOTTOM GUEST RECOGNITION BADGE */}
          <div 
            className={`absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-600 text-center pointer-events-none w-11/12 max-w-xs ${
              stage !== 'intro' ? 'opacity-0 translate-y-4 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-4 py-2 rounded-2xl bg-[#020D0A]/90 backdrop-blur-md border border-[#ECC880]/50 shadow-[0_6px_25px_rgba(0,0,0,0.7)] text-center">
              <span className="text-[9px] uppercase tracking-widest text-[#ECC880]/90 font-serif block">
                Kepada Yth:
              </span>
              <span className="text-xs font-serif font-bold text-white tracking-wide block truncate">
                {guestName}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 4. Luxury Skip Button */}
      {canSkip && (
        <button
          type="button"
          onClick={handleFinish}
          className="absolute bottom-6 right-6 z-30 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#04150E]/85 hover:bg-[#072218] border border-[#ECC880]/70 text-[#ECC880] text-xs font-serif font-bold tracking-wider uppercase transition-all active:scale-95 shadow-lg backdrop-blur-md cursor-pointer"
        >
          <span>Lewati</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
