import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

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
}) => {
  const [canSkip, setCanSkip] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const isFinishedRef = useRef(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleFinish = () => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  useEffect(() => {
    // Show skip control after 1.5s to prevent accidental dismiss on initial button click
    const tSkip = setTimeout(() => {
      setCanSkip(true);
    }, 1500);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Explicitly start video playback on mount
    const v = videoRef.current;
    if (v) {
      v.muted = true;
      v.defaultMuted = true;
      v.playsInline = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Entrance video autoplay delayed/prevented:', err);
          setCanSkip(true);
        });
      }
    }

    return () => {
      clearTimeout(tSkip);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#C5A059]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#03130d] transition-opacity duration-600 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Seamless crossfade backdrop matching gate opening final frame */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: 'url(/themes/nirwana-sarangan/gate-video-final.jpg)' }}
      />

      {/* Main Gate Opening Animation Video (Clean without text overlays) */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        <video 
          ref={videoRef}
          poster="/themes/nirwana-sarangan/gate-video-poster.jpg"
          autoPlay 
          muted 
          playsInline
          className="w-full h-full object-cover object-center"
          onTimeUpdate={() => {
            // Completes as gate swings fully open and camera glides onto the terrace (~3.8s)
            if (videoRef.current && videoRef.current.currentTime >= 3.8) {
              handleFinish();
            }
          }}
          onEnded={handleFinish}
          onError={(e) => {
            console.warn('Video load or playback error in NirwanaSaranganEntrancePortal:', e);
            setCanSkip(true);
          }}
        >
          <source src="/gemini_generated_video_1f694672.mp4" type="video/mp4" />
          <source src="/themes/nirwana-sarangan/gemini_generated_video_1f694672.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Skip Button - Accessible min 44x44px target */}
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
