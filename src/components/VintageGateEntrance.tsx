import React, { useEffect, useState } from 'react';

interface VintageGateEntranceProps {
  onComplete: () => void;
}

export const VintageGateEntrance: React.FC<VintageGateEntranceProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // 1. Gate starts swinging open after a brief pause
    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, 400);

    // 2. Camera starts zooming gently into the waterfall
    const zoomTimer = setTimeout(() => {
      setIsZooming(true);
    }, 1800);

    // 3. Allow user to tap/skip
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 1200);

    // 4. Smooth fade out and trigger onComplete
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3800);

    const finishTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(zoomTimer);
      clearTimeout(skipTimer);
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExiting(true);
    setTimeout(onComplete, 400);
  };

  return (
    <div 
      onClick={() => {
        if (canSkip) {
          setIsExiting(true);
          setTimeout(onComplete, 400);
        }
      }}
      className={`fixed top-0 right-0 h-full w-full lg:w-[42%] z-50 flex items-center justify-center overflow-hidden select-none transition-opacity duration-700 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      } ${canSkip ? 'cursor-pointer' : ''}`}
    >
      {/* 9:16 Responsive Container */}
      <div 
        className={`relative w-full h-full max-w-lg mx-auto flex items-center justify-center overflow-hidden transition-transform duration-[2.5s] ease-out ${
          isZooming ? 'scale-[1.12]' : 'scale-100'
        }`}
        style={{ perspective: '1600px' }}
      >
        {/* Ambient Subtle Vignette (Optional) */}
        <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />

        {/* Layer 2: 3D Double Gate Doors Container */}
        {/* Full size container to place the transparent gate images */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none flex"
          style={{
            perspective: '2000px',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Left Door */}
          <div
            className="w-1/2 h-full relative"
            style={{
              transformOrigin: 'left center',
              transform: isOpen 
                ? 'perspective(2000px) rotateY(-110deg)' 
                : 'perspective(2000px) rotateY(0deg)',
              transition: 'transform 3s cubic-bezier(0.25, 1, 0.35, 1)',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src="/gate1.png"
              alt="Left Gate"
              className="absolute right-0 w-[100%] h-full object-fill sm:object-cover object-right"
            />
          </div>

          {/* Right Door */}
          <div
            className="w-1/2 h-full relative"
            style={{
              transformOrigin: 'right center',
              transform: isOpen 
                ? 'perspective(2000px) rotateY(110deg)' 
                : 'perspective(2000px) rotateY(0deg)',
              transition: 'transform 3s cubic-bezier(0.25, 1, 0.35, 1)',
              backfaceVisibility: 'hidden',
            }}
          >
            <img
              src="/gate2.png"
              alt="Right Gate"
              className="absolute left-0 w-[100%] h-full object-fill sm:object-cover object-left"
            />
          </div>
        </div>

        {/* Soft Golden Light Rays / Sparkle Reveal after opening */}
        <div 
          className={`absolute inset-0 z-30 pointer-events-none transition-opacity duration-1000 ${
            isOpen ? 'opacity-40' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(245, 230, 180, 0.35) 0%, transparent 65%)',
          }}
        />

        {/* Skip Button */}
        <div 
          onClick={handleSkip}
          className={`absolute bottom-6 right-6 z-40 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#d4af37]/40 text-white/90 text-[11px] font-sans tracking-widest uppercase transition-all duration-300 hover:scale-105 ${
            canSkip ? 'opacity-100 cursor-pointer hover:bg-black/80' : 'opacity-0 pointer-events-none'
          }`}
        >
          Lewati ➔
        </div>
      </div>
    </div>
  );
};
