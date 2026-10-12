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
  // Animation stages: 'locked' -> 'unlocking' -> 'opening' -> 'zooming' -> 'exiting'
  const [stage, setStage] = useState<'locked' | 'unlocking' | 'opening' | 'zooming' | 'exiting'>('locked');
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
    // Stage 1: Unlocking - Golden seal pulses and glows (0.3s)
    const t1 = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 300);

    // Allow skip after 0.6s
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 600);

    // Stage 2: Opening - Doors swing open in 3D perspective, rays & butterflies burst (0.8s)
    const t2 = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 800);

    // Stage 3: Zooming - Camera smoothly pushes through the open doorway toward courtyard (2.0s)
    const t3 = setTimeout(() => {
      if (!isFinishedRef.current) setStage('zooming');
    }, 2000);

    // Stage 4: Exiting - Smooth silk crossfade dissolve into opened invitation (3.1s)
    const t4 = setTimeout(() => {
      handleFinish();
    }, 3100);

    return () => {
      clearTimeout(t1);
      clearTimeout(tSkip);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const isDoorsOpen = stage === 'opening' || stage === 'zooming' || stage === 'exiting';
  const isZooming = stage === 'zooming' || stage === 'exiting';
  const isExiting = stage === 'exiting';

  return (
    <div 
      onClick={() => {
        if (canSkip) handleFinish();
      }}
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#140609] transition-opacity duration-700 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } ${canSkip ? 'cursor-pointer' : ''}`}
      style={{ perspective: '1600px' }}
    >
      {/* Background Ambient Dark Mood with Radial Warmth */}
      <div className="absolute inset-0 bg-radial from-[#380612] via-[#1a0408] to-[#0a0103] pointer-events-none" />

      {/* Floating Courtyard Butterflies */}
      <JogloButterflies />

      {/* Floating Peony Petals drifting across screen */}
      <JogloFallingPetals className="z-30 opacity-80" />

      {/* Main Architectural Portal Container */}
      <div 
        className="relative w-full h-full max-w-[520px] max-h-[100dvh] flex items-center justify-center will-change-transform"
        style={{
          transform: isZooming ? 'scale(1.36)' : 'scale(1)',
          transformOrigin: '50% 55%',
          transition: isZooming 
            ? 'transform 1.35s cubic-bezier(0.25, 1, 0.5, 1)' 
            : 'transform 0.4s ease-out',
        }}
      >
        {/* Aspect Ratio Box matching batak-royal-doors (768 x 1376) */}
        <div className="relative w-full aspect-[768/1376] max-h-[100dvh] flex items-center justify-center overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)]">
          
          {/* 1. Courtyard Landscape Destination (Behind the Doorway) */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img 
              src="/themes/joglo-maroon-hero-clean.jpg" 
              alt="Rumah Bolon Batak Heritage" 
              className={`w-full h-full object-cover object-center transition-all duration-1200 ease-out ${
                isDoorsOpen ? 'brightness-105 contrast-105 scale-105' : 'brightness-75 scale-100'
              }`}
            />
            
            {/* Soft Warm Golden Sunlight Filter */}
            <div 
              className={`absolute inset-0 bg-gradient-to-t from-[#2a040c]/60 via-transparent to-amber-500/15 pointer-events-none transition-opacity duration-1000 ${
                isDoorsOpen ? 'opacity-80' : 'opacity-20'
              }`} 
            />

            {/* Glowing Golden Ray Burst pouring through doorway when opened */}
            <div 
              className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ease-out ${
                isDoorsOpen ? 'opacity-90' : 'opacity-0'
              }`}
              style={{
                background: 'radial-gradient(circle at 50% 56%, rgba(255, 235, 160, 0.85) 0%, rgba(212, 160, 40, 0.45) 30%, transparent 68%)',
                mixBlendMode: 'screen',
              }}
            />
          </div>

          {/* 2. Left Wooden Door Wing (3D Perspective Rotation) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '28.255%',
              top: '23.619%',
              width: '21.745%',
              height: '61.846%',
              transformOrigin: '0% 50%',
              transform: isDoorsOpen 
                ? 'perspective(1200px) rotateY(-86deg)' 
                : 'perspective(1200px) rotateY(0deg)',
              transition: 'transform 1.45s cubic-bezier(0.25, 1, 0.5, 1), filter 1.45s ease',
              filter: isDoorsOpen ? 'brightness(0.68) contrast(1.15)' : 'brightness(1)',
            }}
          >
            <img 
              src="/themes/batak-door-left.png" 
              alt="Pintu Gerbang Kiri" 
              className="w-full h-full object-cover object-left-top select-none pointer-events-none drop-shadow-[4px_0_12px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* 3. Right Wooden Door Wing (3D Perspective Rotation) */}
          <div 
            className="absolute z-10 will-change-transform"
            style={{
              left: '50.0%',
              top: '23.619%',
              width: '21.745%',
              height: '61.846%',
              transformOrigin: '100% 50%',
              transform: isDoorsOpen 
                ? 'perspective(1200px) rotateY(86deg)' 
                : 'perspective(1200px) rotateY(0deg)',
              transition: 'transform 1.45s cubic-bezier(0.25, 1, 0.5, 1), filter 1.45s ease',
              filter: isDoorsOpen ? 'brightness(0.68) contrast(1.15)' : 'brightness(1)',
            }}
          >
            <img 
              src="/themes/batak-door-right.png" 
              alt="Pintu Gerbang Kanan" 
              className="w-full h-full object-cover object-right-top select-none pointer-events-none drop-shadow-[-4px_0_12px_rgba(0,0,0,0.65)]"
            />
          </div>

          {/* 4. Golden Brass Center Seal / Medallion Lock */}
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
              className={`relative w-full aspect-square flex items-center justify-center transition-all duration-700 ease-out ${
                stage === 'locked' 
                  ? 'scale-100 opacity-100 drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]' 
                  : stage === 'unlocking'
                    ? 'scale-125 opacity-100 drop-shadow-[0_0_25px_rgba(255,215,0,0.95)]'
                    : 'scale-150 opacity-0'
              }`}
            >
              <img 
                src="/themes/batak-door-seal.png" 
                alt="Gembok Emas Gorga" 
                className="w-full h-full object-contain"
              />

              {/* Shimmer Burst Ring on Unlock */}
              {stage === 'unlocking' && (
                <div className="absolute inset-0 rounded-full border-2 border-amber-300 animate-ping opacity-75" />
              )}
            </div>
          </div>

          {/* 5. Architectural Arch Frame (Foreground with floral arch & carved roof) */}
          <img 
            src="/themes/batak-door-frame.png" 
            alt="Gerbang Rumah Bolon Adat Batak" 
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-25 drop-shadow-[0_10px_35px_rgba(0,0,0,0.75)]"
          />

          {/* Top Title Cartouche overlay during entrance */}
          <div 
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none ${
              isDoorsOpen ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="px-5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#c9982e]/50 shadow-[0_4px_15px_rgba(0,0,0,0.5)]">
              <p className="text-[11px] font-serif tracking-[0.25em] uppercase text-[#edd59e] font-semibold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>Pesta Adat Batak Heritage</span>
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              </p>
            </div>
          </div>

          {/* Bottom Welcome Note overlay before opening */}
          <div 
            className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-all duration-700 text-center pointer-events-none w-11/12 max-w-xs ${
              isDoorsOpen ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
            }`}
          >
            <div className="px-4 py-2.5 rounded-2xl bg-[#1c080d]/85 backdrop-blur-md border border-[#8a1c2e]/60 shadow-[0_6px_20px_rgba(0,0,0,0.6)]">
              <p className="text-[10px] uppercase font-serif tracking-widest text-[#d8a4af]">
                Selamat Datang
              </p>
              <p className="text-sm font-serif font-bold text-white tracking-wide mt-0.5 truncate">
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
        className={`absolute bottom-6 right-6 z-40 px-4 py-2 rounded-full bg-black/55 hover:bg-black/80 backdrop-blur-md border border-white/20 text-white/90 text-[11px] font-serif tracking-wider uppercase flex items-center gap-1.5 transition-all duration-300 shadow-lg ${
          canSkip ? 'opacity-100 cursor-pointer active:scale-95' : 'opacity-40 pointer-events-none'
        }`}
      >
        <span>Lewati</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </div>
    </div>
  );
};
