import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sparkles, ChevronRight, Crown } from 'lucide-react';

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
    }, 450);
  }, [onComplete]);

  useEffect(() => {
    // Enable skip button after 0.5s
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 500);

    // Stage 1: Unlocking - Wax seal glows and radiates 24K gold aura (0.45s)
    const tUnlock = setTimeout(() => {
      if (!isFinishedRef.current) setStage('unlocking');
    }, 450);

    // Stage 2: Opening - Velvet curtains swing open with 3D depth (1.05s)
    const tOpen = setTimeout(() => {
      if (!isFinishedRef.current) setStage('opening');
    }, 1050);

    // Stage 3: Gliding - Smooth cinematic glide directly into invitation (2.2s)
    const tGlide = setTimeout(() => {
      if (!isFinishedRef.current) setStage('gliding');
    }, 2200);

    // Stage 4: Exit & handoff to invitation (3.2s)
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
  }, [handleFinish]);

  const isDoorsOpen = stage === 'opening' || stage === 'gliding' || stage === 'exiting';
  const isGliding = stage === 'gliding' || stage === 'exiting';
  const isExiting = stage === 'exiting';

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#ECC880]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#041610] transition-all duration-600 ease-out ${
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
            transform: scale(1.035);
            filter: drop-shadow(0 10px 24px rgba(0,0,0,0.95)) drop-shadow(0 0 22px rgba(255, 235, 175, 0.75));
          }
        }

        @keyframes emerald-gold-rays {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.1) rotate(1.5deg);
          }
        }
      `}</style>

      {/* 1. Deep Ballroom Ambient Backdrop */}
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
        {/* Soft luxury emerald vignette overlays */}
        <div className="absolute inset-0 z-2 bg-radial from-transparent via-[#03150F]/75 to-[#020D0A]/98" />
        <div className="absolute inset-0 z-2 bg-gradient-to-t from-[#020D0A] via-transparent to-[#020D0A]/90" />
      </div>

      {/* 2. Floating Golden Sparks */}
      <div className="absolute inset-0 z-5 pointer-events-none overflow-hidden">
        {[...Array(14)].map((_, i) => (
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

      {/* 3. 3D Velvet Folio & Portal Frame */}
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
        <div 
          className="relative w-full aspect-[768/1376] max-h-[96dvh] flex items-center justify-center overflow-hidden rounded-[40px] shadow-[0_30px_90px_rgba(0,0,0,0.95)] border border-[#ECC880]/30"
          style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
        >
          {/* A. Inner Grand Hall Sanctuary */}
          <div 
            className="absolute inset-0 z-5 pointer-events-none transition-all duration-1000"
            style={{
              background: isDoorsOpen
                ? 'radial-gradient(ellipse at 50% 50%, #153e2e 0%, #082218 50%, #03120d 100%)'
                : 'radial-gradient(ellipse at 50% 45%, rgba(16, 50, 36, 0.45) 0%, rgba(3, 14, 10, 0.95) 70%, rgba(2, 8, 5, 0.99) 100%)',
              boxShadow: 'inset 0 0 60px rgba(0,0,0,0.95)',
            }}
          />

          {/* B. Volumetric Royal Golden Flare */}
          <div 
            className={`absolute inset-0 z-8 pointer-events-none transition-all duration-1000 ease-out ${
              isDoorsOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 248, 210, 0.92) 0%, rgba(236, 200, 128, 0.45) 45%, transparent 75%)',
              mixBlendMode: 'screen',
              animation: isDoorsOpen ? 'emerald-gold-rays 3.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* C. 3D Left Velvet Curtain Panel */}
          <div 
            className="absolute top-0 bottom-0 left-0 w-1/2 z-10 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform"
            style={{
              transformOrigin: 'left center',
              transform: isDoorsOpen 
                ? 'perspective(1200px) rotateY(-85deg) scaleX(0.7)' 
                : 'perspective(1200px) rotateY(0deg) scaleX(1)',
              background: 'linear-gradient(135deg, #0d3827 0%, #072318 60%, #03120d 100%)',
              borderRight: '2px solid #ECC880',
              boxShadow: 'inset -8px 0 20px rgba(0,0,0,0.7), 6px 0 16px rgba(0,0,0,0.85)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#ECC880_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            <div className="absolute inset-y-0 right-2 w-px bg-gradient-to-b from-transparent via-[#ECC880]/50 to-transparent" />
          </div>

          {/* D. 3D Right Velvet Curtain Panel */}
          <div 
            className="absolute top-0 bottom-0 right-0 w-1/2 z-10 transition-transform duration-1000 cubic-bezier(0.16, 1, 0.3, 1) will-change-transform"
            style={{
              transformOrigin: 'right center',
              transform: isDoorsOpen 
                ? 'perspective(1200px) rotateY(85deg) scaleX(0.7)' 
                : 'perspective(1200px) rotateY(0deg) scaleX(1)',
              background: 'linear-gradient(225deg, #0d3827 0%, #072318 60%, #03120d 100%)',
              borderLeft: '2px solid #ECC880',
              boxShadow: 'inset 8px 0 20px rgba(0,0,0,0.7), -6px 0 16px rgba(0,0,0,0.85)',
            }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(#ECC880_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
            <div className="absolute inset-y-0 left-2 w-px bg-gradient-to-b from-transparent via-[#ECC880]/50 to-transparent" />
          </div>

          {/* E. Center Royal Wax Seal & Shield Crest */}
          <div 
            className="absolute z-20 transition-all duration-700 will-change-transform flex flex-col items-center justify-center pointer-events-none"
            style={{
              transform: isDoorsOpen ? 'scale(1.8) translateY(-30px)' : 'scale(1) translateY(0)',
              opacity: isDoorsOpen ? 0 : 1,
              animation: !isDoorsOpen ? 'emerald-seal-pulse 2.8s ease-in-out infinite' : 'none',
            }}
          >
            {/* Wax Seal Disk */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center bg-gradient-to-br from-[#ECC880] via-[#C5A059] to-[#8C6D2B] p-1 shadow-[0_12px_32px_rgba(0,0,0,0.9),0_0_24px_rgba(236,200,128,0.5)] border-2 border-[#FFF8DE]">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c3123] via-[#072117] to-[#04150E] flex flex-col items-center justify-center border border-[#ECC880]/70 text-[#ECC880] p-2 text-center">
                <Crown className="w-5 h-5 text-[#ECC880] mb-0.5 drop-shadow-sm" />
                <span className="font-serif text-lg sm:text-xl font-bold tracking-widest text-[#FFF6DC] drop-shadow-md">
                  {groomInitial} &amp; {brideInitial}
                </span>
                <span className="text-[8px] font-sans uppercase tracking-[0.2em] text-[#ECC880]/90 font-medium">
                  EMERALD ROYAL
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <div className="mt-4 px-4 py-1 rounded-full bg-[#04150E]/90 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-widest uppercase font-serif font-bold shadow-md">
              Memasuki Resepsi Kerajaan
            </div>
            <div className="text-white/80 text-[11px] font-sans mt-1">
              {guestName}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Skip Button */}
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
