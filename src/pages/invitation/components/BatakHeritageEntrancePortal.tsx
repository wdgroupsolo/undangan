import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, ChevronRight } from 'lucide-react';
import { JogloFallingPetals, JogloButterflies } from '../themes/JogloMaroonHeritageTheme';

interface BatakHeritageEntrancePortalProps {
  onComplete: () => void;
  guestName?: string;
  groomName?: string;
  brideName?: string;
}

export const BatakHeritageEntrancePortal: React.FC<BatakHeritageEntrancePortalProps> = ({
  onComplete,
  guestName = 'Tamu Undangan',
  groomName = 'Steven',
  brideName = 'Bunga'
}) => {
  // Animation stages: 'intro' -> 'unlocking' -> 'opening' -> 'gliding' -> 'exiting'
  const [stage, setStage] = useState<'intro' | 'unlocking' | 'opening' | 'gliding' | 'exiting'>('intro');
  const [canSkip, setCanSkip] = useState(false);
  const isFinishedRef = useRef(false);

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setStage('exiting');
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    // 0.3s: Enable instant skip
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 300);

    // Stage 1: Unlocking - Golden seal resonates with golden light burst (0.6s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 600);

    // Stage 2: Opening - Authentic heavy 3D wooden doors swing open with real thickness (1.1s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1100);

    // Stage 3: Gliding - Smooth cinematic pass-through without background jump (2.2s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2200);

    // Stage 4: Seamless transition handoff directly into invitation (3.6s)
    const tExit = setTimeout(() => {
      handleFinish();
    }, 3600);

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
      className={`fixed top-0 right-0 h-full w-full lg:w-[42%] z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#7e2231]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.85)] transition-opacity duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } ${canSkip ? 'cursor-pointer' : ''}`}
    >
      <style>{`
        @keyframes seal-divine-pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.65)) drop-shadow(0 2px 8px rgba(0,0,0,0.8));
          }
          50% {
            transform: scale(1.06);
            filter: drop-shadow(0 0 26px rgba(255, 235, 140, 1)) drop-shadow(0 0 45px rgba(212, 175, 55, 0.7));
          }
        }

        @keyframes god-rays-drift {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.08) rotate(1.5deg);
          }
        }

        @keyframes gold-flare-flash {
          0% {
            opacity: 0;
            transform: scale(0.6);
          }
          50% {
            opacity: 0.95;
            transform: scale(1.2);
          }
          100% {
            opacity: 0;
            transform: scale(2.0);
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. SEAMLESS HD CONTINUOUS COURTYARD BACKDROP (Exact match with Hero)     */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/themes/joglo-maroon-hero-clean.jpg" 
          alt="Rumah Adat Bolon Batak" 
          className="w-full h-full object-cover object-center brightness-[1.02]"
        />
        {/* Soft atmospheric morning haze */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20" />
      </div>

      {/* Floating Courtyard Butterflies */}
      <JogloButterflies />

      {/* Falling Romantic Peony Petals */}
      <JogloFallingPetals className="z-30 opacity-75" />

      {/* ========================================================================= */}
      {/* 2. ARCHITECTURAL 3D PORTAL FRAME & SOLID CARVED WOODEN DOORS              */}
      {/* ========================================================================= */}
      <div 
        className="relative w-full h-full max-w-[500px] max-h-[100dvh] flex items-center justify-center will-change-transform z-10"
        style={{
          transform: isGliding ? 'scale(1.75)' : 'scale(1)',
          opacity: isGliding ? 0 : 1,
          transformOrigin: '50% 55%',
          transition: isGliding 
            ? 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.3s cubic-bezier(0.4, 0, 0.8, 1)' 
            : 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        {/* 768 x 1376 Aspect Frame Canvas */}
        <div 
          className="relative w-full aspect-[768/1376] max-h-[100dvh] flex items-center justify-center overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
          style={{ perspective: '1100px', transformStyle: 'preserve-3d' }}
        >
          
          {/* A. Recessed Door Jamb / Kusen Pintu Kayu Gelap (Deep 3D Architectural Depth) */}
          <div 
            className="absolute z-5 pointer-events-none"
            style={{
              left: '27.5%',
              top: '23.0%',
              width: '45.0%',
              height: '63.0%',
              background: 'radial-gradient(ellipse at center, rgba(30,10,6,0.3) 0%, rgba(15,5,3,0.95) 100%)',
              boxShadow: 'inset 0 0 50px rgba(0,0,0,0.95), inset 0 20px 40px rgba(0,0,0,0.9)',
              borderRadius: '130px 130px 0 0',
            }}
          />

          {/* B. Volumetric Divine Light Burst (Beams through opening doorway) */}
          <div 
            className={`absolute z-6 pointer-events-none transition-opacity duration-1000 ease-out ${
              isDoorsOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              left: '20%',
              right: '20%',
              top: '20%',
              bottom: '10%',
              background: 'radial-gradient(ellipse at 50% 55%, rgba(255, 245, 190, 0.95) 0%, rgba(245, 185, 45, 0.45) 35%, transparent 70%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'god-rays-drift 4s ease-in-out infinite' : 'none',
            }}
          />

          {/* C. LEFT 3D SOLID WOODEN DOOR LEAF (Clean Arched Wood + 3D Edge Thickness) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '28.255%',
              top: '23.619%',
              width: '21.745%',
              height: '61.846%',
              transformOrigin: '0% 50%',
              transformStyle: 'preserve-3d',
              transform: isDoorsOpen 
                ? 'rotateY(-78deg) translateZ(4px)' 
                : 'rotateY(0deg) translateZ(0px)',
              transition: 'transform 1.85s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.72) contrast(1.15) drop-shadow(8px 4px 18px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Carved Teak Face (100% Clean Arched Wooden Relief) */}
            <img 
              src="/themes/batak-door-left.png" 
              alt="Pintu Gerbang Kiri" 
              className="w-full h-full object-contain object-left-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 14px - Solid Wood Thickness) */}
            <div 
              className="absolute pointer-events-none"
              style={{
                top: 0,
                bottom: 0,
                right: 0,
                width: '14px',
                transformOrigin: 'right center',
                transform: 'rotateY(-90deg)',
                background: 'linear-gradient(to right, #1d0904, #3a170d, #220b05)',
                borderRight: '1px solid #c9982e',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.9)',
              }}
            />

            {/* Back Face (Deep Antique Teak) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-14px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #2a0e07, #190703)',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.85)',
              }}
            />

            {/* Specular Ambient Wood Relief Shadow overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* D. RIGHT 3D SOLID WOODEN DOOR LEAF (Clean Arched Wood + 3D Edge Thickness) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '50.0%',
              top: '23.619%',
              width: '21.745%',
              height: '61.846%',
              transformOrigin: '100% 50%',
              transformStyle: 'preserve-3d',
              transform: isDoorsOpen 
                ? 'rotateY(78deg) translateZ(4px)' 
                : 'rotateY(0deg) translateZ(0px)',
              transition: 'transform 1.85s cubic-bezier(0.16, 1, 0.3, 1), filter 1.6s ease',
              filter: isDoorsOpen 
                ? 'brightness(0.72) contrast(1.15) drop-shadow(-8px 4px 18px rgba(0,0,0,0.95))' 
                : 'brightness(1) contrast(1) drop-shadow(-2px 0 6px rgba(0,0,0,0.6))',
            }}
          >
            {/* Front Carved Teak Face (100% Clean Arched Wooden Relief) */}
            <img 
              src="/themes/batak-door-right.png" 
              alt="Pintu Gerbang Kanan" 
              className="w-full h-full object-contain object-right-top select-none pointer-events-none block"
            />

            {/* REAL 3D EXTRUDED SIDE EDGE (Tebal Daun Pintu 14px - Solid Wood Thickness) */}
            <div 
              className="absolute pointer-events-none"
              style={{
                top: 0,
                bottom: 0,
                left: 0,
                width: '14px',
                transformOrigin: 'left center',
                transform: 'rotateY(90deg)',
                background: 'linear-gradient(to left, #1d0904, #3a170d, #220b05)',
                borderLeft: '1px solid #c9982e',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.9)',
              }}
            />

            {/* Back Face (Deep Antique Teak) */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: 'translateZ(-14px) rotateY(180deg)',
                background: 'linear-gradient(to bottom, #2a0e07, #190703)',
                boxShadow: 'inset 0 0 25px rgba(0,0,0,0.85)',
              }}
            />

            {/* Specular Ambient Wood Relief Shadow overlay */}
            <div 
              className={`absolute inset-0 bg-gradient-to-l from-black/60 via-black/20 to-transparent pointer-events-none transition-opacity duration-1200 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-0'
              }`}
            />
          </div>

          {/* E. ROYAL GOLD GORGA MEDALLION SEAL (Central Lock Mechanism) */}
          <div 
            className="absolute z-20 pointer-events-none will-change-transform"
            style={{
              left: '50.0%',
              top: '57.413%',
              width: '19.53%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div 
              className="relative w-full aspect-square flex items-center justify-center will-change-transform"
              style={{
                transform: stage === 'intro' 
                  ? 'scale(1)' 
                  : stage === 'unlocking' 
                    ? 'scale(1.22)' 
                    : 'scale(1.45)',
                opacity: isDoorsOpen ? 0 : 1,
                filter: stage === 'unlocking' 
                  ? 'drop-shadow(0 0 30px rgba(255, 230, 130, 1)) drop-shadow(0 0 55px rgba(212, 175, 55, 0.8))' 
                  : 'drop-shadow(0 4px 14px rgba(0,0,0,0.85))',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease-out, filter 0.5s ease',
                animation: stage === 'intro' ? 'seal-divine-pulse 3.5s ease-in-out infinite' : 'none',
              }}
            >
              <img 
                src="/themes/batak-door-seal.png" 
                alt="Gembok Emas Gorga" 
                className="w-full h-full object-contain"
              />

              {/* Radiant Light Flare Shockwaves on Unlock */}
              {stage === 'unlocking' && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-90" />
                  <div 
                    className="absolute -inset-10 rounded-full bg-radial from-white via-amber-300/50 to-transparent"
                    style={{ animation: 'gold-flare-flash 0.85s ease-out forwards' }}
                  />
                </>
              )}
            </div>
          </div>

          {/* F. FOREGROUND ARCH FRAME (Carved Wooden Lion Pediment & Floral Garland) */}
          <div className="absolute inset-0 z-25 pointer-events-none select-none">
            <img 
              src="/themes/batak-door-frame.png" 
              alt="Gerbang Rumah Bolon Adat Batak" 
              className="w-full h-full object-cover select-none drop-shadow-[0_12px_40px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Top Title Cartouche overlay */}
          <div 
            className={`absolute top-5 sm:top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none ${
              isDoorsOpen ? 'opacity-0 -translate-y-5 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-5 py-2 rounded-full bg-black/65 backdrop-blur-md border border-[#c9982e]/60 shadow-[0_6px_25px_rgba(0,0,0,0.6)] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span className="text-[11px] font-serif tracking-[0.28em] uppercase text-[#edd59e] font-semibold drop-shadow-sm">
                Pesta Adat Batak Heritage
              </span>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            </div>
          </div>

          {/* Bottom Guest VIP Badge overlay */}
          <div 
            className={`absolute bottom-7 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 translate-y-5 scale-95' : 'opacity-100 translate-y-0 scale-100'
            }`}
          >
            <div className="px-5 py-3 rounded-2xl bg-[#1c080d]/90 backdrop-blur-md border border-[#8a1c2e]/70 shadow-[0_8px_30px_rgba(0,0,0,0.7)]">
              <p className="text-[10px] uppercase font-serif tracking-[0.2em] text-[#e0aab5] font-medium">
                Selamat Datang
              </p>
              <p className="text-sm font-serif font-bold text-white tracking-wide mt-0.5 truncate drop-shadow">
                {guestName}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Skip Button */}
      <div 
        onClick={(e) => {
          if (canSkip) {
            e.stopPropagation();
            handleFinish();
          }
        }}
        className={`absolute bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 px-4 py-2 rounded-full bg-black/65 hover:bg-black/90 backdrop-blur-md border border-[#d4af37]/40 hover:border-[#d4af37] text-[#edd59e] hover:text-white text-[11px] font-serif tracking-widest uppercase flex items-center gap-1.5 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${
          canSkip ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-0 pointer-events-none'
        }`}
      >
        <span>Lewati</span>
        <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
      </div>
    </div>
  );
};
