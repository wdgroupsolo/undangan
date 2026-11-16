import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, 
  ExternalLink, Bookmark, Crown, Video, Shirt, Info
} from 'lucide-react';

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// =========================================================================
// SCROLL REVEAL UTILITY (Smooth Intersection Observer Animations)
// =========================================================================
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'zoom-in' | 'slide-left' | 'slide-right' | 'fade-in';
  delay?: number;
  duration?: number;
  className?: string;
  initialVisible?: boolean;
}> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  initialVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
        setIsVisible(true);
      }
    };

    checkVisibility();
    const timer = setTimeout(checkVisibility, 80);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const getAnimationClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up': return 'opacity-0 translate-y-8';
        case 'fade-down': return 'opacity-0 -translate-y-8';
        case 'zoom-in': return 'opacity-0 scale-90';
        case 'slide-left': return 'opacity-0 -translate-x-8';
        case 'slide-right': return 'opacity-0 translate-x-8';
        case 'fade-in': return 'opacity-0';
        default: return 'opacity-0 translate-y-8';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-out ${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// =========================================================================
// BUNGA KAMBOJA (JEPUN BALI) - 5-Petaled Frangipani Blossom
// =========================================================================
export const BaliKambojaFlower: React.FC<{ size?: number; className?: string }> = ({ 
  size = 40, 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`inline-block pointer-events-none drop-shadow-[0_2px_8px_rgba(228,172,45,0.4)] ${className}`}
  >
    <defs>
      <linearGradient id="kambojaPetal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="65%" stopColor="#FFFDF0" />
        <stop offset="100%" stopColor="#FEE479" />
      </linearGradient>
      <radialGradient id="kambojaCenter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#F9A825" />
        <stop offset="60%" stopColor="#FDD835" />
        <stop offset="100%" stopColor="#FFF59D" stopOpacity="0" />
      </radialGradient>
    </defs>
    
    {/* 5 Overlapping Petals */}
    {[0, 72, 144, 216, 288].map((angle, idx) => (
      <path
        key={idx}
        d="M50 50 C42 32, 28 14, 46 8 C62 4, 62 26, 50 50 Z"
        fill="url(#kambojaPetal)"
        stroke="#E6B800"
        strokeWidth="0.6"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}

    {/* Radiant Center Pollen Glow */}
    <circle cx="50" cy="50" r="14" fill="url(#kambojaCenter)" />
    <circle cx="50" cy="50" r="4.5" fill="#E65100" opacity="0.8" />
  </svg>
);

// =========================================================================
// FALLING KAMBOJA (JEPUN BALI) PETALS & GOLDEN PARTICLES ANIMATION
// =========================================================================
export const FallingKambojaPetals: React.FC = () => {
  const petals = [
    { left: '4%', delay: '0s', duration: '13s', size: 26, rot: 45 },
    { left: '16%', delay: '4s', duration: '16s', size: 32, rot: -30 },
    { left: '28%', delay: '8s', duration: '14s', size: 22, rot: 75 },
    { left: '42%', delay: '2s', duration: '18s', size: 30, rot: 15 },
    { left: '58%', delay: '6s', duration: '15s', size: 24, rot: -60 },
    { left: '72%', delay: '1s', duration: '17s', size: 34, rot: 90 },
    { left: '86%', delay: '9s', duration: '13s', size: 20, rot: -45 },
    { left: '94%', delay: '5s', duration: '19s', size: 28, rot: 30 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-15 overflow-hidden">
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute -top-12 pointer-events-none"
          style={{
            left: p.left,
            animation: `fallingPetalDrift ${p.duration} linear infinite`,
            animationDelay: p.delay,
          }}
        >
          <div
            style={{
              transform: `rotate(${p.rot}deg)`,
              animation: 'petalSway 4s ease-in-out infinite alternate',
            }}
          >
            <BaliKambojaFlower size={p.size} />
          </div>
        </div>
      ))}
      <style>{`
        @keyframes fallingPetalDrift {
          0% { transform: translateY(-50px) rotate(0deg); opacity: 0; }
          10% { opacity: 0.9; }
          90% { opacity: 0.85; }
          100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes petalSway {
          0% { transform: translateX(-15px) rotate(-15deg); }
          100% { transform: translateX(15px) rotate(15deg); }
        }
        @keyframes goldShimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          50%, 100% { transform: translateX(250%) skewX(-20deg); }
        }
      `}</style>
    </div>
  );
};

// =========================================================================
// GERBANG CANDI BENTAR PURA AGUNG BALI (SVG Architectural Crest)
// =========================================================================
export const BaliCandiBentarPortal: React.FC<{ size?: number; className?: string }> = ({ 
  size = 180, 
  className = '' 
}) => (
  <div 
    className={`pointer-events-none flex items-center justify-center select-none ${className}`}
    style={{ width: size, height: size * 0.44 }}
  >
    <svg 
      width={size} 
      height={size * 0.44} 
      viewBox="0 0 200 88" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_4px_16px_rgba(229,178,50,0.45)]"
    >
      <defs>
        <linearGradient id="candiGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="25%" stopColor="#FCE59F" />
          <stop offset="60%" stopColor="#E5B232" />
          <stop offset="85%" stopColor="#C48E1D" />
          <stop offset="100%" stopColor="#783A1E" />
        </linearGradient>
        <linearGradient id="candiDarkGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#8A3D28" />
          <stop offset="100%" stopColor="#3D140A" />
        </linearGradient>
      </defs>

      {/* LEFT TOWER (Candi Bentar Sayap Kiri) */}
      <g>
        {/* Tier 1 Base */}
        <polygon points="12,86 92,86 92,72 24,72" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="1" />
        <polygon points="26,72 92,72 92,60 36,60" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.8" />
        {/* Tier 2 Mid Column with Prada Carvings */}
        <polygon points="38,60 92,60 92,44 48,44" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="0.9" />
        <polygon points="50,44 92,44 92,30 58,30" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.8" />
        {/* Tier 3 Stepped Pinnacle (Murda Tower Peak) */}
        <polygon points="60,30 92,30 92,16 68,16" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="0.8" />
        <polygon points="70,16 92,16 92,6 78,6" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.7" />
        {/* Pinnacle Finial (Padma Crest) */}
        <path d="M92 6 L92 0 L84 6 Z" fill="url(#candiGoldGrad)" stroke="#E5B232" strokeWidth="0.6" />
        <circle cx="88" cy="10" r="1.5" fill="#FFFFFF" />
      </g>

      {/* RIGHT TOWER (Candi Bentar Sayap Kanan - Symmetric Mirror) */}
      <g>
        <polygon points="188,86 108,86 108,72 176,72" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="1" />
        <polygon points="174,72 108,72 108,60 164,60" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.8" />
        <polygon points="162,60 108,60 108,44 152,44" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="0.9" />
        <polygon points="150,44 108,44 108,30 142,30" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.8" />
        <polygon points="140,30 108,30 108,16 132,16" fill="url(#candiDarkGrad)" stroke="#E5B232" strokeWidth="0.8" />
        <polygon points="130,16 108,16 108,6 122,6" fill="url(#candiGoldGrad)" stroke="#783A1E" strokeWidth="0.7" />
        <path d="M108 6 L108 0 L116 6 Z" fill="url(#candiGoldGrad)" stroke="#E5B232" strokeWidth="0.6" />
        <circle cx="112" cy="10" r="1.5" fill="#FFFFFF" />
      </g>

      {/* Central Sacred Gap Accent: Twin Kamboja & Sunburst */}
      <circle cx="100" cy="44" r="5" fill="#FDF3A7" stroke="#E5B232" strokeWidth="0.8" />
      <circle cx="100" cy="44" r="2.5" fill="#E65100" />
      <line x1="100" y1="20" x2="100" y2="34" stroke="#E5B232" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  </div>
);

// =========================================================================
// CORNER UKIRAN PRADA KAMASAN CLUSTER (Patra Punggel & Daun Sulur Emas)
// =========================================================================
export const BaliKamasanCornerCluster: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 96 }) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div
      className={`pointer-events-none transform ${rotation} ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="relative w-full h-full">
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="absolute inset-0">
          <defs>
            <linearGradient id="kamasanGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFDF5" />
              <stop offset="35%" stopColor="#FDE69E" />
              <stop offset="70%" stopColor="#E5B232" />
              <stop offset="100%" stopColor="#8A3D28" />
            </linearGradient>
          </defs>

          {/* Outer Corner Filigree Band */}
          <path d="M4 4 C40 4, 70 14, 86 36" stroke="url(#kamasanGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M4 14 C32 14, 56 22, 70 42" stroke="#E5B232" strokeWidth="1" strokeDasharray="3 2" />
          <path d="M4 4 C4 40, 14 70, 36 86" stroke="url(#kamasanGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M14 4 C14 32, 22 56, 42 70" stroke="#E5B232" strokeWidth="1" strokeDasharray="3 2" />

          {/* Patra Punggel Curled Tendrils (Khas Kamasan Klungkung) */}
          <path 
            d="M8 8 C28 14, 38 28, 30 42 C24 50, 14 44, 18 34 C22 24, 34 22, 26 12 Z" 
            fill="url(#kamasanGoldGrad)" 
            stroke="#783A1E" 
            strokeWidth="0.6" 
          />
          <circle cx="28" cy="28" r="2.2" fill="#FFFFFF" stroke="#8A3D28" strokeWidth="0.4" />
        </svg>

        {/* Small Golden Kamboja Center Accent */}
        <div className="absolute top-2 left-2 z-10">
          <BaliKambojaFlower size={size * 0.38} />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// BALI PRADA DIVIDER (Ornate Prada Gold Leaf & Frangipani)
// =========================================================================
export const BaliPradaDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 opacity-90 ${className}`}>
    <div className="h-[1.5px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#E5B232] to-[#8A3D28]" />
    <div className="flex items-center gap-2 text-[#E5B232]">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#E5B232]" />
      <BaliKambojaFlower size={26} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#E5B232]" />
    </div>
    <div className="h-[1.5px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#E5B232] to-[#8A3D28]" />
  </div>
);

// =========================================================================
// BALI KAMASAN ORNAMENTAL WATERMARK (Delicate Sacred Weave & Lotus Filigree)
// =========================================================================
export const BaliPolengWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.032] select-none ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="baliKamasanPattern" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Delicate Diamond Lotus Weave (Tanpa kotak-kotak catur) */}
          <path d="M40 2 L78 40 L40 78 L2 40 Z" fill="none" stroke="#E5B232" strokeWidth="0.8" />
          <path d="M40 14 L66 40 L40 66 L14 40 Z" fill="none" stroke="#783A1E" strokeWidth="0.6" strokeDasharray="3 3" />
          {/* Subtle Center Kamboja Pollen */}
          <circle cx="40" cy="40" r="3" fill="#E5B232" />
          <circle cx="40" cy="40" r="1.2" fill="#FFFFFF" />
          <circle cx="40" cy="2" r="1.5" fill="#E5B232" />
          <circle cx="78" cy="40" r="1.5" fill="#E5B232" />
          <circle cx="40" cy="78" r="1.5" fill="#E5B232" />
          <circle cx="2" cy="40" r="1.5" fill="#E5B232" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#baliKamasanPattern)" />
    </svg>
  </div>
);

// =========================================================================
// BALI ROYAL PRADA OCTAGON FRAME (Segi Delapan Prada Emas & Kamboja)
// =========================================================================
export const BaliRoyalPradaFrame: React.FC<{
  imageSrc: string;
  altText: string;
  className?: string;
  frameWidthClass?: string;
  frameHeightClass?: string;
  variant?: 'terracotta' | 'cream';
}> = ({
  imageSrc,
  altText,
  className = '',
  frameWidthClass = 'w-48 sm:w-56',
  frameHeightClass = 'h-62 sm:h-74',
  variant = 'cream',
}) => {
  const isTerracotta = variant === 'terracotta';
  const octClip = 'polygon(16% 0%, 84% 0%, 100% 12.3%, 100% 87.7%, 84% 100%, 16% 100%, 0% 87.7%, 0% 12.3%)';

  return (
    <div className={`relative mx-auto ${frameWidthClass} ${frameHeightClass} flex items-center justify-center group ${className}`}>
      {/* Outer Floating Halo with Gold Prada Shadow */}
      <div 
        className="absolute -inset-2.5 pointer-events-none z-0"
        style={{
          filter: isTerracotta 
            ? 'drop-shadow(0 14px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 16px rgba(229,178,50,0.35))' 
            : 'drop-shadow(0 14px 28px rgba(120,58,30,0.25)) drop-shadow(0 0 14px rgba(229,178,50,0.22))',
        }}
      >
        <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <polygon
            points="16,1 84,1 99,16 99,114 84,129 16,129 1,114 1,16"
            stroke="#E5B232"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.55"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Main Image Container Clipped to Symmetrical Octagon */}
      <div 
        className="relative w-full h-full overflow-hidden z-10 p-[3px] bg-gradient-to-b from-[#FFFDF5] via-[#E5B232] to-[#783A1E] shadow-xl"
        style={{
          clipPath: octClip,
          WebkitClipPath: octClip,
        }}
      >
        <div 
          className="w-full h-full relative overflow-hidden"
          style={{
            clipPath: octClip,
            WebkitClipPath: octClip,
          }}
        >
          <img
            src={imageSrc}
            alt={altText}
            className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
          {/* Metallic Gold Light Sweep Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
              style={{ animation: 'goldShimmerSweep 5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>

      {/* Gilded SVG Prada Overlay Borders & Corner Ornaments */}
      <svg 
        viewBox="0 0 100 130" 
        fill="none" 
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`baliPradaGrad_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="25%" stopColor="#FCE49E" />
            <stop offset="55%" stopColor="#E5B232" />
            <stop offset="85%" stopColor="#C48E1D" />
            <stop offset="100%" stopColor="#783A1E" />
          </linearGradient>
          <linearGradient id={`baliPradaInner_${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FCE59F" />
            <stop offset="100%" stopColor="#A86F15" />
          </linearGradient>
        </defs>

        {/* Outer Heavy Gilded Bevel (2.4px) */}
        <polygon
          points="16,1 84,1 99,16 99,114 84,129 16,129 1,114 1,16"
          stroke={`url(#baliPradaGrad_${variant})`}
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />

        {/* Inner Delicate Inset Frame (1px dashed) */}
        <polygon
          points="18.5,4 81.5,4 96,18.5 96,111.5 81.5,126 18.5,126 4,111.5 4,18.5"
          stroke={`url(#baliPradaInner_${variant})`}
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.85"
          vectorEffect="non-scaling-stroke"
        />

        {/* 4 Chamfer Corner Jewels (Patra Prada Dots) */}
        {[
          { cx: 8.5, cy: 8.5 },
          { cx: 91.5, cy: 8.5 },
          { cx: 91.5, cy: 121.5 },
          { cx: 8.5, cy: 121.5 },
        ].map((pt, i) => (
          <g key={`bali-chamfer-${i}`}>
            <polygon
              points={`${pt.cx},${pt.cy - 3} ${pt.cx + 2.5},${pt.cy} ${pt.cx},${pt.cy + 3} ${pt.cx - 2.5},${pt.cy}`}
              fill={`url(#baliPradaGrad_${variant})`}
              stroke="#783A1E"
              strokeWidth="0.4"
            />
            <circle cx={pt.cx} cy={pt.cy} r="1" fill="#FFFFFF" />
          </g>
        ))}

        {/* Cardinal Jewels */}
        <circle cx="50" cy="2.5" r="1.3" fill={`url(#baliPradaGrad_${variant})`} stroke="#783A1E" strokeWidth="0.3" />
        <circle cx="50" cy="127.5" r="1.3" fill={`url(#baliPradaGrad_${variant})`} stroke="#783A1E" strokeWidth="0.3" />
      </svg>

      {/* Twinkling Ambient Sparkles */}
      <Sparkles className="w-3.5 h-3.5 text-[#FFFDF5] absolute top-1 right-2 animate-pulse z-30 drop-shadow-[0_0_6px_#E5B232]" />
      <Sparkles className="w-3 h-3 text-[#FFFDF5] absolute bottom-2 left-2 animate-pulse z-30 drop-shadow-[0_0_6px_#E5B232]" />
    </div>
  );
};

// =========================================================================
// BALI PENJOR FLANK (Janur Penjor Emas Upacara Agung Bali)
// =========================================================================
export const BaliPenjorFlank: React.FC<{
  side: 'left' | 'right';
  className?: string;
  variant?: 'terracotta' | 'cream';
}> = ({ side, className = '', variant = 'cream' }) => {
  const isLeft = side === 'left';
  const isTerracotta = variant === 'terracotta';

  return (
    <div
      className={`absolute ${isLeft ? '-left-6 sm:-left-9 -scale-x-100' : '-right-6 sm:-right-9'} top-[-18px] sm:top-[-24px] bottom-0 w-8 sm:w-11 pointer-events-none z-15 select-none ${className}`}
      style={{
        filter: isTerracotta
          ? 'drop-shadow(0 4px 12px rgba(229,178,50,0.45))'
          : 'drop-shadow(0 4px 10px rgba(120,58,30,0.25))',
      }}
    >
      <svg viewBox="0 0 50 320" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`penjorBambooGrad_${side}_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="25%" stopColor="#FDE69E" />
            <stop offset="60%" stopColor="#E5B232" />
            <stop offset="85%" stopColor="#C48E1D" />
            <stop offset="100%" stopColor="#783A1E" />
          </linearGradient>
          <linearGradient id={`penjorJanurGrad_${side}_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="50%" stopColor="#F7C948" />
            <stop offset="100%" stopColor="#B26A1A" />
          </linearGradient>
        </defs>

        {/* Curving Bamboo Trunk (Tiang Bambu Melengkung) */}
        <path
          d="M 12 320 C 14 200, 16 110, 24 50 C 28 22, 36 6, 46 10 C 50 14, 48 24, 40 32"
          stroke={`url(#penjorBambooGrad_${side}_${variant})`}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M 14 320 C 16 200, 18 110, 26 50 C 30 24, 37 10, 45 14"
          stroke="#FFFDF5"
          strokeWidth="1"
          strokeOpacity="0.8"
        />

        {/* Bamboo Nodes (Ruas Bambu) */}
        {[70, 120, 175, 230, 285].map((y, idx) => (
          <ellipse
            key={`node-${idx}`}
            cx={13 + idx * 0.2}
            cy={y}
            rx="3"
            ry="1.2"
            fill="#783A1E"
            stroke="#FDE69E"
            strokeWidth="0.8"
          />
        ))}

        {/* Fan Palm Ornaments along Trunk (Hiasan Janur Kipas) */}
        {[
          { y: 65, span: 18, rot: -28 },
          { y: 105, span: 22, rot: -22 },
          { y: 155, span: 24, rot: -16 },
          { y: 210, span: 22, rot: -10 },
          { y: 265, span: 18, rot: -6 },
        ].map((item, idx) => (
          <g key={`frond-${idx}`} transform={`translate(16, ${item.y}) rotate(${item.rot})`}>
            {/* Fan of young palm leaves (Janur) */}
            <path
              d={`M 0 0 C 8 -10, ${item.span} -6, ${item.span + 6} -2 C ${item.span} 4, 8 4, 0 0 Z`}
              fill={`url(#penjorJanurGrad_${side}_${variant})`}
              stroke="#783A1E"
              strokeWidth="0.5"
            />
            <path
              d={`M 0 0 C 6 -14, ${item.span - 2} -12, ${item.span + 2} -8`}
              stroke="#FFFDF5"
              strokeWidth="0.6"
            />
          </g>
        ))}

        {/* Hanging Sampian Penjor & Tassels from Tip (Sampian Gantung & Ronce) */}
        <g transform="translate(40, 32)">
          {/* Main Sampian Diamond Fan */}
          <polygon
            points="0,0 8,14 0,26 -8,14"
            fill={`url(#penjorJanurGrad_${side}_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.6"
          />
          <circle cx="0" cy="13" r="2.5" fill="#FFFDF5" stroke="#E5B232" strokeWidth="0.6" />

          {/* Flowing Janur Tassel Ribbons (Ronce Juntai Emas) */}
          <path
            d="M -3 26 C -6 45, 2 60, -2 80"
            stroke={`url(#penjorBambooGrad_${side}_${variant})`}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 0 26 C 2 48, -2 65, 1 88"
            stroke="#FFFDF5"
            strokeWidth="1"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 3 26 C 6 44, 0 62, 4 82"
            stroke={`url(#penjorBambooGrad_${side}_${variant})`}
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
          />

          {/* Dangling Jewel Drops */}
          <circle cx="-2" cy="81" r="1.5" fill="#E5B232" />
          <circle cx="1" cy="89" r="1.8" fill="#FFFDF5" stroke="#783A1E" strokeWidth="0.4" />
          <circle cx="4" cy="83" r="1.5" fill="#E5B232" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// BALI CANDI BENTAR TOWER WING (Sayap Gapura Pura Agung Khas Bali)
// =========================================================================
export const BaliCandiBentarTowerWing: React.FC<{
  side: 'left' | 'right';
  className?: string;
  variant?: 'terracotta' | 'cream';
}> = ({ side, className = '', variant = 'cream' }) => {
  const isLeft = side === 'left';
  const isTerracotta = variant === 'terracotta';

  return (
    <div
      className={`absolute ${isLeft ? '-left-5 sm:-left-7' : '-right-5 sm:-right-7 -scale-x-100'} inset-y-2 w-9 sm:w-12 pointer-events-none z-10 select-none ${className}`}
      style={{
        filter: isTerracotta
          ? 'drop-shadow(0 6px 16px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(229,178,50,0.35))'
          : 'drop-shadow(0 6px 14px rgba(120,58,30,0.28)) drop-shadow(0 0 8px rgba(229,178,50,0.2))',
      }}
    >
      <svg viewBox="0 0 60 260" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`candiWingDark_${side}_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isTerracotta ? '#45160A' : '#782818'} />
            <stop offset="50%" stopColor={isTerracotta ? '#280A04' : '#561A0E'} />
            <stop offset="100%" stopColor={isTerracotta ? '#140301' : '#330E07'} />
          </linearGradient>
          <linearGradient id={`candiWingGold_${side}_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="30%" stopColor="#FDE69E" />
            <stop offset="70%" stopColor="#E5B232" />
            <stop offset="100%" stopColor="#8A3D28" />
          </linearGradient>
        </defs>

        {/* TIER 1: BEBATURAN (Wide Stepped Stone Base / Kaki Candi) */}
        <g>
          <polygon
            points="2,260 58,260 58,228 10,228"
            fill={`url(#candiWingDark_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="1.2"
          />
          <polygon
            points="12,228 58,228 58,212 18,212"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.8"
          />
          {/* Base Padmasana Carvings (Relief Kelopak Bunga) */}
          <path d="M 6 252 Q 18 244 32 252 Q 44 244 56 252" stroke="#FFFDF5" strokeWidth="0.8" fill="none" />
          <circle cx="20" cy="220" r="1.8" fill="#FFFFFF" />
          <circle cx="36" cy="220" r="1.8" fill="#FFFFFF" />
          <circle cx="50" cy="220" r="1.8" fill="#FFFFFF" />
        </g>

        {/* TIER 2: BATUR TENGAH (Lower Main Column Body) */}
        <g>
          <polygon
            points="16,212 58,212 58,165 24,165"
            fill={`url(#candiWingDark_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="1.1"
          />
          <polygon
            points="22,165 58,165 58,152 28,152"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.8"
          />
          {/* Prada Diamond Inlay */}
          <polygon
            points="34,188 42,176 50,188 42,200"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#FFFDF5"
            strokeWidth="0.6"
          />
          <circle cx="42" cy="188" r="1.5" fill="#FFFFFF" />
        </g>

        {/* TIER 3: AWAK CANDI (Upper Column with Balinese Prada Moldings) */}
        <g>
          <polygon
            points="26,152 58,152 58,102 34,102"
            fill={`url(#candiWingDark_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="1"
          />
          <polygon
            points="32,102 58,102 58,90 38,90"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.8"
          />
          {/* Carved Horizontal Relief Ribs */}
          <line x1="30" y1="130" x2="56" y2="130" stroke="#E5B232" strokeWidth="0.9" />
          <line x1="32" y1="124" x2="56" y2="124" stroke="#FFFDF5" strokeWidth="0.6" strokeDasharray="2 2" />
        </g>

        {/* TIER 4: STEPPED PINNACLE (Menara Bertingkat Meru) */}
        <g>
          <polygon
            points="36,90 58,90 58,52 42,52"
            fill={`url(#candiWingDark_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="0.9"
          />
          <polygon
            points="40,52 58,52 58,40 46,40"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.7"
          />
        </g>

        {/* TIER 5: MURDA / FINIAL PEAK (Puncak Lotus Kori Agung) */}
        <g>
          <polygon
            points="44,40 58,40 58,16 50,16"
            fill={`url(#candiWingDark_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="0.8"
          />
          {/* Crown Spire / Padma Flame */}
          <path
            d="M 58 16 C 58 8, 54 2, 54 0 C 50 6, 48 12, 50 16 Z"
            fill={`url(#candiWingGold_${side}_${variant})`}
            stroke="#E5B232"
            strokeWidth="0.6"
          />
          <circle cx="54" cy="8" r="2.2" fill="#FFFFFF" stroke="#E5B232" strokeWidth="0.6" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// BALI KAMBOJA CROWN APEX (Mahkota Bunga Kamboja & Sandat Surya Dewata)
// =========================================================================
export const BaliKambojaCrownApex: React.FC<{
  className?: string;
  variant?: 'terracotta' | 'cream';
}> = ({ className = '', variant = 'cream' }) => {
  const isTerracotta = variant === 'terracotta';

  return (
    <div
      className={`absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 z-25 pointer-events-none select-none flex flex-col items-center ${className}`}
      style={{
        filter: isTerracotta
          ? 'drop-shadow(0 4px 14px rgba(229,178,50,0.5)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))'
          : 'drop-shadow(0 4px 12px rgba(120,58,30,0.3)) drop-shadow(0 2px 6px rgba(229,178,50,0.35))',
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* Radiating Golden Sunburst Halo Behind (Surya Dewata) */}
        <svg viewBox="0 0 100 50" fill="none" className="w-24 sm:w-28 h-12 absolute -top-4 pointer-events-none">
          <defs>
            <linearGradient id={`suryaRayGrad_${variant}`} x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#E5B232" stopOpacity="0.2" />
              <stop offset="70%" stopColor="#FCE59F" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFDF5" stopOpacity="1" />
            </linearGradient>
          </defs>
          {/* Fan Rays */}
          {[-50, -35, -20, -8, 8, 20, 35, 50].map((angle, idx) => (
            <line
              key={`ray-${idx}`}
              x1="50"
              y1="46"
              x2={50 + 44 * Math.sin((angle * Math.PI) / 180)}
              y2={46 - 44 * Math.cos((angle * Math.PI) / 180)}
              stroke={`url(#suryaRayGrad_${variant})`}
              strokeWidth={idx % 2 === 0 ? "1.6" : "1"}
              strokeLinecap="round"
            />
          ))}
          {/* Arc connecting rays */}
          <path d="M 12 42 A 40 40 0 0 1 88 42" stroke="#E5B232" strokeWidth="0.8" strokeDasharray="3 2" />
        </svg>

        {/* Flanking Twin Golden Sandat Curving Sprigs */}
        <div className="flex items-center justify-center -space-x-1 relative z-10">
          <svg viewBox="0 0 40 24" fill="none" className="w-8 sm:w-9 h-5 scale-x-[-1]">
            <path d="M 4 20 Q 18 16 32 4 Q 22 2 10 14" fill="#FDE69E" stroke="#783A1E" strokeWidth="0.6" />
            <circle cx="28" cy="6" r="1.6" fill="#FFFDF5" />
            <circle cx="16" cy="14" r="1.4" fill="#E5B232" />
          </svg>

          {/* Central Blooming Balinese Kamboja (Frangipani) */}
          <div className="relative z-20 mx-[-4px]">
            <BaliKambojaFlower size={36} />
            <Sparkles className="w-3.5 h-3.5 text-[#FFFDF5] absolute -top-1 -right-1 animate-pulse drop-shadow-[0_0_6px_#E5B232]" />
          </div>

          <svg viewBox="0 0 40 24" fill="none" className="w-8 sm:w-9 h-5">
            <path d="M 4 20 Q 18 16 32 4 Q 22 2 10 14" fill="#FDE69E" stroke="#783A1E" strokeWidth="0.6" />
            <circle cx="28" cy="6" r="1.6" fill="#FFFDF5" />
            <circle cx="16" cy="14" r="1.4" fill="#E5B232" />
          </svg>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// BALI PADMASANA BASE (Undakan Batu Candi & Kelopak Teratai Emas)
// =========================================================================
export const BaliPadmaBase: React.FC<{
  className?: string;
  variant?: 'terracotta' | 'cream';
}> = ({ className = '', variant = 'cream' }) => {
  const isTerracotta = variant === 'terracotta';

  return (
    <div
      className={`absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 z-25 pointer-events-none select-none w-36 sm:w-44 h-7 ${className}`}
      style={{
        filter: isTerracotta
          ? 'drop-shadow(0 6px 14px rgba(0,0,0,0.85)) drop-shadow(0 0 10px rgba(229,178,50,0.35))'
          : 'drop-shadow(0 4px 10px rgba(120,58,30,0.25)) drop-shadow(0 0 8px rgba(229,178,50,0.25))',
      }}
    >
      <svg viewBox="0 0 160 28" fill="none" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`padmaBaseGrad_${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#783A1E" />
            <stop offset="25%" stopColor="#E5B232" />
            <stop offset="50%" stopColor="#FFFDF5" />
            <stop offset="75%" stopColor="#E5B232" />
            <stop offset="100%" stopColor="#783A1E" />
          </linearGradient>
          <linearGradient id={`padmaStoneGrad_${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isTerracotta ? '#45160A' : '#8A3220'} />
            <stop offset="100%" stopColor={isTerracotta ? '#1A0502' : '#45150D'} />
          </linearGradient>
        </defs>

        {/* Tier 1: Plinth Foundation */}
        <polygon
          points="8,26 152,26 144,18 16,18"
          fill={`url(#padmaStoneGrad_${variant})`}
          stroke={`url(#padmaBaseGrad_${variant})`}
          strokeWidth="1"
        />

        {/* Tier 2: Stepped Inset with Gold Trim */}
        <polygon
          points="20,18 140,18 134,10 26,10"
          fill={`url(#padmaStoneGrad_${variant})`}
          stroke={`url(#padmaBaseGrad_${variant})`}
          strokeWidth="1"
        />

        {/* Lotus Petals Across Plinth (Kelopak Teratai Emas Padmasana) */}
        {[
          { x: 38 },
          { x: 56 },
          { x: 74 },
          { x: 92 },
          { x: 110 },
          { x: 128 },
        ].map((pt, idx) => (
          <path
            key={`petal-${idx}`}
            d={`M ${pt.x - 7} 18 Q ${pt.x} 8 ${pt.x + 7} 18 Z`}
            fill={`url(#padmaBaseGrad_${variant})`}
            stroke="#783A1E"
            strokeWidth="0.5"
          />
        ))}

        {/* Center Royal Medallion */}
        <circle cx="80" cy="10" r="4.5" fill="#FFFDF5" stroke="#E5B232" strokeWidth="1" />
        <circle cx="80" cy="10" r="2.2" fill="#E5B232" />
      </svg>
    </div>
  );
};

// =========================================================================
// BALI MAJESTIC PURA FRAME (Candi Bentar, Penjor Emas, Kamboja & Padmasana)
// =========================================================================
export const BaliMajesticPuraFrame: React.FC<{
  imageSrc: string;
  altText: string;
  className?: string;
  frameWidthClass?: string;
  frameHeightClass?: string;
  variant?: 'terracotta' | 'cream';
}> = ({
  imageSrc,
  altText,
  className = '',
  frameWidthClass = 'w-48 sm:w-56',
  frameHeightClass = 'h-62 sm:h-74',
  variant = 'cream',
}) => {
  return (
    <div className={`relative mx-auto ${frameWidthClass} ${frameHeightClass} flex items-center justify-center ${className}`}>
      {/* 1. Behind: Ceremonial Penjor Flanks (Left & Right) */}
      <BaliPenjorFlank side="left" variant={variant} />
      <BaliPenjorFlank side="right" variant={variant} />

      {/* 2. Behind: Candi Bentar Gateway Towers (Left & Right Wings) */}
      <BaliCandiBentarTowerWing side="left" variant={variant} />
      <BaliCandiBentarTowerWing side="right" variant={variant} />

      {/* 3. Center: Core Octagon Prada Photo Frame */}
      <BaliRoyalPradaFrame
        imageSrc={imageSrc}
        altText={altText}
        frameWidthClass="w-full"
        frameHeightClass="h-full"
        variant={variant}
      />

      {/* 4. Top Apex: Mahkota Bunga Kamboja & Surya Dewata */}
      <BaliKambojaCrownApex variant={variant} />

      {/* 5. Bottom Base: Alas Undakan Teratai Padmasana */}
      <BaliPadmaBase variant={variant} />
    </div>
  );
};

// =========================================================================
// MAIN BALI ROYAL KAMASAN THEME COMPONENT (Paket 70k - Adat & Heritage)
// =========================================================================
export interface BaliKamasanThemeProps {
  invitation: any;
  couple?: any;
  events?: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  guestName?: string;
}

export const BaliKamasanTheme: React.FC<BaliKamasanThemeProps> = ({
  invitation,
  couple,
  events,
  stories,
  gallery,
  gifts,
  guestName = 'Tamu Undangan',
}) => {
  const [activeTab, setActiveTab] = useState<'sampul' | 'mempelai' | 'adat' | 'acara' | 'galeri' | 'punia' | 'rsvp'>('sampul');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpWishes, setRsvpWishes] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState<Array<{ name: string; status: string; wishes: string; time: string }>>([
    {
      name: 'Ida Bagus Made Dharma & Keluarga',
      status: 'Hadir',
      wishes: 'Om Swastyastu. Rahajeng ngemargiang Pawiwahan Agung antuk Steven & Bunga. Dumogi langgeng riwekasan, labda karya, manggih kerahayuan lan shanti.',
      time: '1 jam yang lalu',
    },
    {
      name: 'I Gusti Ayu Dewi Lestari',
      status: 'Hadir',
      wishes: 'Selamat menempuh hidup baru Steven & Bunga. Dumogi Ida Sang Hyang Widhi Wasa ngicenin karahajengan lan kasukertan ring kulawarga anyar.',
      time: '3 jam yang lalu',
    },
    {
      name: 'Kadek Surya Pratama',
      status: 'Hadir',
      wishes: 'Rahajeng pawiwahan semeton! Semoga cinta dan kesetiaan selalu menyertai perjalanan suci ini.',
      time: '5 jam yang lalu',
    },
  ]);

  // Couple Data Fallbacks
  const groomName = couple?.groom_name || 'Steven';
  const groomFullName = couple?.groom_full_name || 'Steven Pratama, S.Kom.';
  const groomParents = couple?.groom_parents || 'Putra pertama dari Bpk. Bambang Pratama & Ibu Siti Rahayu';
  const groomInstagram = couple?.groom_instagram || 'steven_pratama';

  const brideName = couple?.bride_name || 'Bunga';
  const brideFullName = couple?.bride_full_name || 'Bunga Citra Lestari, S.E.';
  const brideParents = couple?.bride_parents || 'Putri bungsu dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const brideInstagram = couple?.bride_instagram || 'bunga_citra';

  const couplePhoto = couple?.cover_photo_url || couple?.cover_photo || '/photos/steven-bunga/cover-arch.jpg';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/steven-bunga/groom.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/steven-bunga/bride.jpg';

  // 70k Tier Rich Curated Gallery (6 Photos)
  const displayGallery = (gallery && gallery.length >= 3) ? gallery.slice(0, 6) : [
    { image_url: couplePhoto, caption: 'Upacara Pawiwahan & Janji Suci' },
    { image_url: groomPhoto, caption: 'Sang Purusa Payas Agung' },
    { image_url: bridePhoto, caption: 'Sang Pradana Anggun Berkamboja' },
    { image_url: '/photos/photo-1.jpg', caption: 'Prosesi Sakral Madengen-dengen' },
    { image_url: '/photos/photo-5.jpg', caption: 'Nunas Kerahayuan ring Merajan' },
    { image_url: '/photos/photo-7.jpg', caption: 'Asung Kertha Wara Nugraha' },
  ];

  // Target Date & Countdown
  const targetDate = new Date(invitation?.wedding_date || '2026-10-12T09:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Copy Account Toast Handler
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // RSVP Form Submit
  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    const newEntry = {
      name: rsvpName.trim(),
      status: rsvpStatus === 'hadir' ? 'Hadir' : rsvpStatus === 'ragu' ? 'Ragu-ragu' : 'Tidak Hadir',
      wishes: rsvpWishes.trim() || 'Selamat menempuh hidup baru.',
      time: 'Baru saja',
    };

    setWishesList([newEntry, ...wishesList]);
    setRsvpSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2E1E17] font-sans relative selection:bg-[#E5B232] selection:text-[#2E1E17] overflow-x-hidden">
      {/* Falling Kamboja Petals & Golden Stardust */}
      <FallingKambojaPetals />

      {/* =========================================================================
          LEFT PANEL (DESKTOP ONLY: Fixed 42% / 50% Panel with Photo & Guest Name)
          ========================================================================= */}
      <aside className="hidden lg:flex w-5/12 xl:w-1/2 h-[100dvh] fixed left-0 top-0 z-30 flex-col justify-between p-8 xl:p-12 overflow-hidden select-none bg-[#240A04] text-white border-r border-[#E5B232]/35 shadow-2xl">
        {/* Deep Terracotta & Bali Teak Ambient Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-[#1F0703] via-[#381308]/90 to-[#1A0502]/95" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,178,50,0.25)_0%,rgba(31,7,3,0.95)_75%)]" />
          <BaliPolengWatermark className="opacity-[0.05]" />
        </div>

        {/* Gilded Inner Frame Line */}
        <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#E5B232]/45 pointer-events-none z-10" />

        {/* Central Content Column */}
        <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
          {/* TOP: Badges */}
          <div className="w-full flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D140A]/85 backdrop-blur-md border border-[#E5B232]/60 shadow-lg text-[#FFFDF5] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Crown className="w-3.5 h-3.5 text-[#E5B232]" />
              <span>Pawiwahan Agung</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D140A]/85 backdrop-blur-md border border-[#E5B232]/60 shadow-lg text-[#FFFDF5] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B232]" />
              <span>Adat Bali Kamasan</span>
            </div>
          </div>

          {/* CENTER: Couple Portrait & Recipient Guest Card */}
          <div className="my-auto w-full flex flex-col items-center text-center py-4">
            {/* Royal Majestic Pura Candi Bentar Frame */}
            <div className="mb-3 pt-2">
              <BaliMajesticPuraFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-44 xl:w-52"
                frameHeightClass="h-58 xl:h-68"
                variant="terracotta"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-1 text-[#FFFDF5]">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B232] animate-pulse" />
              <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                PAWIWAHAN AGUNG OF
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#E5B232] animate-pulse" />
            </div>

            {/* Couple Names */}
            <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#FCE49E] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {groomName} <span className="text-xl xl:text-2xl text-[#E5B232] font-light italic font-serif">&amp;</span> {brideName}
            </h1>

            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E5B232] to-transparent mb-3" />

            {/* Recipient Guest Card */}
            <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#3D140A]/90 via-[#2A0C06]/95 to-[#150402]/98 backdrop-blur-md border border-[#E5B232]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(229,178,50,0.25)] mb-3">
              <div className="absolute inset-1.5 rounded-xl border border-[#E5B232]/25 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#E5B232] font-serif font-semibold mb-0.5 text-center">
                Kepada Yth. Bapak/Ibu/Saudara/i :
              </p>
              <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                {guestName}
              </h2>
              <p className="text-[9.5px] tracking-wider text-[#FCE5D8] text-center font-sans mt-0.5">
                Matur suksma atas kehadiran &amp; doa restu semeton sinamian
              </p>
            </div>

            {/* Live Countdown Timer */}
            <div className="w-full grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-gradient-to-b from-[#3D140A]/80 to-[#1F0703]/90 backdrop-blur-md border border-[#E5B232]/45 shadow-md">
                  <span className="block text-lg xl:text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] to-[#FCE59F]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#FCE5D8] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM: Venue Info */}
          <div className="w-full flex items-center justify-between text-xs text-[#FCE5D8] border-t border-[#E5B232]/35 pt-3">
            <span className="font-serif tracking-wide text-[#FCE59F] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E5B232]" />
              Puri Ageng Kamasan
            </span>
            <span className="font-sans text-[#FFF8E7]">Klungkung, Bali</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT PANEL (Scrollable Main Invitation Content on Desktop)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 bg-[#FDFBF7] pb-24 shadow-2xl lg:border-l lg:border-[#E5B232]/35">
        <div className="relative w-full min-h-screen">
          
          {/* =========================================================================
              SECTION 1: HERO / SAMPUL
          ========================================================================= */}
          <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FDFBF7] border-b border-[#E5B232]/40 overflow-hidden">
            {/* Subtle Ambient Radial Glow & Poleng Watermark */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(229,178,50,0.22)_0%,rgba(253,251,247,0.98)_70%)]" />
            <BaliPolengWatermark />

            {/* 4 Corner Kamasan Filigree Clusters */}
            <div className="absolute top-0 left-0"><BaliKamasanCornerCluster position="top-left" size={96} /></div>
            <div className="absolute top-0 right-0"><BaliKamasanCornerCluster position="top-right" size={96} /></div>
            <div className="absolute bottom-0 left-0"><BaliKamasanCornerCluster position="bottom-left" size={96} /></div>
            <div className="absolute bottom-0 right-0"><BaliKamasanCornerCluster position="bottom-right" size={96} /></div>

            {/* Top Headline */}
            <ScrollReveal animation="fade-down" delay={100} className="relative z-10 pt-4 max-w-md mx-auto w-full">
              <span className="text-[10px] sm:text-xs tracking-[0.34em] uppercase text-[#783A1E] font-serif font-bold">
                PAWIWAHAN AGUNG ADAT BALI
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2E1E17] mt-2">
                {groomName} <span className="font-light italic text-[#E5B232]">&amp;</span> {brideName}
              </h1>
              <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#785A4E] mt-1.5 font-medium">
                {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </ScrollReveal>

            {/* Royal Majestic Pura Candi Bentar Frame */}
            <ScrollReveal animation="zoom-in" delay={200} className="relative z-10 my-auto py-3 pt-6 flex flex-col items-center max-w-md mx-auto w-full">
              <div className="mb-3">
                <BaliMajesticPuraFrame
                  imageSrc={couplePhoto}
                  altText={`${groomName} & ${brideName}`}
                  frameWidthClass="w-48 sm:w-56"
                  frameHeightClass="h-62 sm:h-74"
                  variant="cream"
                />
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E5B232]/50 shadow-sm">
                <Crown className="w-3.5 h-3.5 text-[#E5B232]" />
                <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#783A1E] font-bold">
                  Bali Royal Kamasan
                </span>
              </div>
            </ScrollReveal>

            {/* Countdown & Recipient Info */}
            <ScrollReveal animation="fade-up" delay={300} className="relative z-10 w-full flex flex-col items-center pb-4 max-w-md mx-auto">
              <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#E5B232]/45 shadow-xs mb-3.5">
                <span className="text-[10px] uppercase tracking-widest text-[#785A4E] block mb-0.5">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <span className="font-serif text-sm font-bold text-[#783A1E] block truncate">
                  {guestName}
                </span>
              </div>

              {/* Countdown Cards */}
              <div className="grid grid-cols-4 gap-2 w-full max-w-xs">
                {[
                  { label: 'HARI', val: timeLeft.days },
                  { label: 'JAM', val: timeLeft.hours },
                  { label: 'MENIT', val: timeLeft.minutes },
                  { label: 'DETIK', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-2 border border-[#E5B232]/40 text-center shadow-xs">
                    <span className="block font-serif text-base sm:text-lg font-bold text-[#783A1E]">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] font-sans tracking-wider uppercase text-[#785A4E]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </section>

          {/* =========================================================================
              SECTION 2: SLOKA SAKRAL WEDA & SALAM PEMBUKA HINDU
          ========================================================================= */}
          <section className="relative p-6 sm:p-10 bg-white border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full text-center relative z-10">
              <ScrollReveal animation="fade-up">
                {/* Sacred Omkara Symbol / Salam Pembuka */}
                <span className="text-[10px] tracking-[0.32em] uppercase text-[#E5B232] font-serif font-bold block mb-1">
                  MANTRA ASUNG KERTHA WARA NUGRAHA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17]">
                  Om Swastyastu
                </h2>
                <BaliPradaDivider />

                <div className="p-5 sm:p-6 rounded-2xl bg-[#FDFBF7] border border-[#E5B232]/45 shadow-xs my-4">
                  <p className="font-serif text-xs sm:text-sm text-[#783A1E] font-semibold leading-relaxed italic mb-2">
                    "Ihaiva stam ma vi yaustam, visvam ayur vyasnutam.<br />
                    Kridantau putrair naptrbhir, modamanau sve grhe."
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#523226] leading-relaxed">
                    "Wahai pasangan mempelai, tetaplah engkau berdua bersatu di sini, jangan pernah terpisahkan. Semoga engkau menikmati hidup bersama seutuhnya, rukun berbahagia bersama anak dan cucumu di rumah yang penuh anugerah dan kedamaian."
                  </p>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#C48E1D] font-sans font-bold block mt-3">
                    — Rgveda X.85.42 —
                  </span>
                </div>

                <p className="text-xs sm:text-[12.5px] text-[#523226] leading-relaxed max-w-lg mx-auto mt-4">
                  Atas Asung Kertha Wara Nugraha Ida Sang Hyang Widhi Wasa, Tuhan Yang Maha Esa, kami bermaksud menyelenggarakan Upacara Pawiwahan Agung putra dan putri kami tercinta:
                </p>
              </ScrollReveal>
            </div>
          </section>

          {/* =========================================================================
              SECTION 3: MEMPELAI (SANG PURUSA & SANG PRADANA)
          ========================================================================= */}
          <section id="mempelai" className="relative p-6 sm:p-10 bg-[#FDFBF7] border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold block">
                  SANG PURUSA &amp; SANG PRADANA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Kedua Mempelai
                </h2>
                <BaliPradaDivider />
              </ScrollReveal>

              {/* Groom & Bride Cards */}
              <div className="mt-8 space-y-8">
                {/* Groom Profile (Sang Purusa) */}
                <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                  <div className="mb-3 relative pt-4">
                    <BaliKambojaCrownApex variant="cream" className="scale-75 -top-5" />
                    <BaliRoyalPradaFrame
                      imageSrc={groomPhoto}
                      altText={groomName}
                      frameWidthClass="w-36 sm:w-44"
                      frameHeightClass="h-48 sm:h-58"
                      variant="cream"
                    />
                  </div>
                  
                  <span className="text-[10.5px] uppercase tracking-widest text-[#E5B232] font-serif font-bold">
                    Sang Purusa (Pengantin Pria)
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1E17] mt-0.5">
                    {groomFullName}
                  </h3>
                  <span className="text-[11px] font-serif text-[#783A1E] italic font-semibold">
                    (Gelar Adat Ksatria Dalem Kamasan)
                  </span>
                  <p className="text-xs text-[#523226] mt-1 max-w-xs">
                    {groomParents}
                  </p>
                  {groomInstagram && (
                    <a
                      href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#783A1E] border border-[#E5B232]/50 text-[11px] font-medium hover:bg-[#F8F3E8] transition-colors shadow-xs"
                    >
                      <InstagramIcon size={13} />
                      <span>@{groomInstagram.replace('@', '')}</span>
                    </a>
                  )}
                </ScrollReveal>

                {/* Botanical Bridge with Kamboja Heart */}
                <div className="flex items-center justify-center my-2">
                  <div className="w-12 h-[1px] bg-[#E5B232]/60" />
                  <div className="mx-3 w-9 h-9 rounded-full bg-white border border-[#E5B232] flex items-center justify-center shadow-xs">
                    <Heart className="w-4 h-4 text-[#E5B232] fill-[#E5B232]/30" />
                  </div>
                  <div className="w-12 h-[1px] bg-[#E5B232]/60" />
                </div>

                {/* Bride Profile (Sang Pradana) */}
                <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center">
                  <div className="mb-3 relative pt-4">
                    <BaliKambojaCrownApex variant="cream" className="scale-75 -top-5" />
                    <BaliRoyalPradaFrame
                      imageSrc={bridePhoto}
                      altText={brideName}
                      frameWidthClass="w-36 sm:w-44"
                      frameHeightClass="h-48 sm:h-58"
                      variant="cream"
                    />
                  </div>

                  <span className="text-[10.5px] uppercase tracking-widest text-[#E5B232] font-serif font-bold">
                    Sang Pradana (Pengantin Wanita)
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1E17] mt-0.5">
                    {brideFullName}
                  </h3>
                  <span className="text-[11px] font-serif text-[#783A1E] italic font-semibold">
                    (Diah Anggun Pradana Kamasan)
                  </span>
                  <p className="text-xs text-[#523226] mt-1 max-w-xs">
                    {brideParents}
                  </p>
                  {brideInstagram && (
                    <a
                      href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#783A1E] border border-[#E5B232]/50 text-[11px] font-medium hover:bg-[#F8F3E8] transition-colors shadow-xs"
                    >
                      <InstagramIcon size={13} />
                      <span>@{brideInstagram.replace('@', '')}</span>
                    </a>
                  )}
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 4: TATA UPACARA SAKRAL PAWIWAHAN ADAT BALI
          ========================================================================= */}
          <section id="adat" className="relative p-6 sm:p-10 bg-white border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold">
                  TRADISI LELUHUR DEWATA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Prosesi Pawiwahan Adat Bali
                </h2>
                <BaliPradaDivider />
                <p className="text-xs text-[#523226] max-w-md mx-auto leading-relaxed">
                  Penyatuan sakral lahir dan batin berlandaskan ajaran Dharma, diiringi doa suci restu leluhur dan keluarga agung:
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-4">
                {[
                  {
                    step: 'I',
                    title: 'Upacara Memadik (Peminangan)',
                    sub: 'Nunas Restu Keluarga Pradana',
                    meaning: 'Pihak keluarga Purusa mendatangi kediaman Pradana membawa pejati dan canang sari untuk meminang sang gadis secara terhormat.',
                    symbol: 'Pejati, Canang Sari, Dupa Wangi',
                  },
                  {
                    step: 'II',
                    title: 'Upacara Mepamit (Nunas Idin)',
                    sub: 'Pamitan ring Sanggah / Merajan',
                    meaning: 'Pengantin wanita memohon pamit dan doa restu di hadapan leluhur keluarga asalnya karena akan bersatu dalam naungan keluarga sang suami.',
                    symbol: 'Banten Mepamit, Tirtha Suci Merajan',
                  },
                  {
                    step: 'III',
                    title: 'Upacara Madengen-dengen',
                    sub: 'Pembersihan Rohani Makala-kalaan',
                    meaning: 'Pembersihan spiritual kedua mempelai dipimpin Pemangku untuk menyucikan Tri Kaya Parisudha (Pikiran, Perkataan, Perbuatan) dari energi negatif.',
                    symbol: 'Tetimpug, Tikeh Dadakan, Kala Hyang',
                  },
                  {
                    step: 'IV',
                    title: 'Mewidhi Widhana & Mapepada',
                    sub: 'Penyaksian Janji Suci ring Ida Sang Hyang Widhi',
                    meaning: 'Puncak upacara pernikahan sakral disaksikan Sang Hyang Widhi Wasa, Tri Murti, dan para saksi. Ditandai pemercikan Tirtha Amertha oleh Ida Pedanda.',
                    symbol: 'Tirtha Amertha, Siwa Raditya, Benang Tridatu',
                  },
                ].map((item, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" delay={idx * 100}>
                    <div className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5B232]/45 hover:border-[#E5B232] transition-colors shadow-xs">
                      <div className="flex items-start gap-3.5">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E5B232] to-[#783A1E] text-white flex items-center justify-center font-serif font-bold text-sm shrink-0 shadow-xs">
                          {item.step}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-serif text-base font-bold text-[#783A1E]">
                            {item.title}
                          </h4>
                          <span className="text-[10px] uppercase tracking-wider text-[#C48E1D] font-medium block">
                            {item.sub}
                          </span>
                          <p className="text-xs text-[#523226] mt-1.5 leading-relaxed">
                            {item.meaning}
                          </p>
                          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white border border-[#E5B232]/40 text-[9.5px] text-[#783A1E] font-medium">
                            <span>Simbol Adat:</span>
                            <span className="font-semibold">{item.symbol}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 5: RANGKAIAN ACARA (PAWIWAHAN & RESEPSI)
          ========================================================================= */}
          <section id="acara" className="relative p-6 sm:p-10 bg-[#FDFBF7] border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold">
                  WAKTU &amp; LOKASI SAKRAL
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Rangkaian Acara
                </h2>
                <BaliPradaDivider />
                <p className="text-xs text-[#523226] max-w-md mx-auto leading-relaxed">
                  Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir menyaksikan dan mendoakan upacara kami:
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-6">
                {/* Event 1: Upacara Pawiwahan */}
                <ScrollReveal animation="fade-up" delay={150}>
                  <div className="p-6 rounded-3xl bg-white border border-[#E5B232]/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(229,178,50,0.18)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#E5B232] flex items-center justify-center">
                        <BaliKambojaFlower size={18} />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#783A1E]">
                        Upacara Pawiwahan
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs text-[#523226] border-y border-[#E5B232]/30 py-3.5 my-3">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#E5B232] shrink-0" />
                        <span className="font-medium">
                          {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#E5B232] shrink-0" />
                        <span>Pukul 09.00 - 11.30 WITA</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#E5B232] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#2E1E17]">Puri Ageng Kamasan</strong>
                          <span>Jl. Raya Kamasan No. 18, Klungkung, Bali</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
                      <a
                        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Upacara+Pawiwahan+Steven+%26+Bunga&dates=20261012T010000Z/20261012T033000Z&details=Upacara+Pawiwahan+Agung+Adat+Bali+Steven+%26+Bunga&location=Puri+Ageng+Kamasan,+Klungkung,+Bali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FDFBF7] border border-[#E5B232] text-[#783A1E] text-xs font-semibold hover:bg-[#F8F3E8] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#E5B232]" />
                        <span>Simpan Tanggal</span>
                      </a>
                      <a
                        href="https://maps.google.com/?q=Puri+Ageng+Kamasan+Klungkung+Bali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#783A1E] to-[#9E4B28] text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-xs"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#FCE59F]" />
                        <span>Petunjuk Lokasi (Maps)</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Event 2: Resepsi Pawiwahan */}
                <ScrollReveal animation="fade-up" delay={250}>
                  <div className="p-6 rounded-3xl bg-white border border-[#E5B232]/50 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(229,178,50,0.18)_0%,transparent_70%)] pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-full bg-[#FDFBF7] border border-[#E5B232] flex items-center justify-center">
                        <Crown className="w-4 h-4 text-[#E5B232]" />
                      </div>
                      <h3 className="font-serif text-xl font-bold text-[#783A1E]">
                        Resepsi Pawiwahan
                      </h3>
                    </div>

                    <div className="space-y-2 text-xs text-[#523226] border-y border-[#E5B232]/30 py-3.5 my-3">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#E5B232] shrink-0" />
                        <span className="font-medium">
                          {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#E5B232] shrink-0" />
                        <span>Pukul 13.00 WITA - Selesai</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#E5B232] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-[#2E1E17]">Bale Wantilan Mandala Puri Kamasan</strong>
                          <span>Jl. Raya Kamasan No. 18, Klungkung, Bali</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
                      <a
                        href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Resepsi+Pawiwahan+Steven+%26+Bunga&dates=20261012T050000Z/20261012T100000Z&details=Resepsi+Pawiwahan+Agung+Adat+Bali+Steven+%26+Bunga&location=Bale+Wantilan+Puri+Kamasan,+Klungkung,+Bali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-[#FDFBF7] border border-[#E5B232] text-[#783A1E] text-xs font-semibold hover:bg-[#F8F3E8] transition-colors"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#E5B232]" />
                        <span>Simpan Tanggal</span>
                      </a>
                      <a
                        href="https://maps.google.com/?q=Puri+Ageng+Kamasan+Klungkung+Bali"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#783A1E] to-[#9E4B28] text-white text-xs font-semibold hover:opacity-95 transition-opacity shadow-xs"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#FCE59F]" />
                        <span>Petunjuk Lokasi (Maps)</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 6: GALERI FOTO (6 FOTO 70K TIER & SEGI DELAPAN PRADA LIGHTBOX)
          ========================================================================= */}
          <section id="galeri" className="relative p-6 sm:p-10 bg-white border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold">
                  MOMEN SAKRAL &amp; BAHAGIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Galeri Pawiwahan
                </h2>
                <BaliPradaDivider />
                <p className="text-xs text-[#523226] max-w-md mx-auto leading-relaxed">
                  Untaian potret kenangan indah dalam balutan keagungan busana Payas Agung adat Bali Kamasan:
                </p>
              </ScrollReveal>

              {/* Gallery Grid (6 Photos for 70k Tier) */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6">
                {displayGallery.map((img, idx) => (
                  <ScrollReveal
                    key={idx}
                    animation="zoom-in"
                    delay={idx * 80}
                    className="group relative cursor-pointer"
                  >
                    <div
                      onClick={() => setSelectedImage(img.image_url)}
                      className="w-full h-44 sm:h-52 overflow-hidden p-[2.5px] bg-gradient-to-b from-[#FFFDF5] via-[#E5B232] to-[#783A1E] shadow-sm group-hover:shadow-lg transition-all group-hover:scale-[1.02] relative"
                      style={{
                        clipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                        WebkitClipPath: 'polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px)',
                      }}
                    >
                      <div 
                        className="w-full h-full overflow-hidden relative"
                        style={{
                          clipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)',
                          WebkitClipPath: 'polygon(14px 0, calc(100% - 14px) 0, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0 calc(100% - 14px), 0 14px)',
                        }}
                      >
                        <img
                          src={img.image_url}
                          alt={img.caption || `Foto Galeri ${idx + 1}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-[#783A1E]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-[#FFFDF5] text-[11px] font-serif font-bold bg-[#3D140A]/90 px-3.5 py-1.5 rounded-full backdrop-blur-xs border border-[#E5B232]/60 shadow-md">
                            Cingak Foto
                          </span>
                        </div>
                      </div>
                    </div>
                    {img.caption && (
                      <p className="text-center text-[10px] font-serif text-[#785A4E] mt-1.5 italic truncate">
                        {img.caption}
                      </p>
                    )}
                  </ScrollReveal>
                ))}
              </div>

              {/* Modal Zoom Preview (Royal Octagon Prada Segi Delapan Mewah) */}
              {selectedImage && typeof document !== 'undefined' && createPortal(
                <div
                  onClick={() => setSelectedImage(null)}
                  className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-pointer"
                  style={{ isolation: 'isolate' }}
                >
                  <div 
                    className="relative max-w-4xl w-auto max-h-[90vh] flex items-center justify-center group"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Outer Floating Octagonal Halo */}
                    <div 
                      className="absolute -inset-2.5 sm:-inset-3.5 pointer-events-none z-0"
                      style={{
                        filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.95)) drop-shadow(0 0 25px rgba(229,178,50,0.4))',
                      }}
                    >
                      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" preserveAspectRatio="none">
                        <polygon
                          points="10,1 90,1 99,10 99,90 90,99 10,99 1,90 1,10"
                          stroke="#E5B232"
                          strokeWidth="0.8"
                          strokeDasharray="4 3"
                          opacity="0.6"
                          vectorEffect="non-scaling-stroke"
                        />
                      </svg>
                    </div>

                    {/* Main Image Container Clipped to Octagon */}
                    <div 
                      className="relative overflow-hidden z-10 p-1 sm:p-1.5 bg-gradient-to-b from-[#FFFDF5] via-[#E5B232] to-[#783A1E] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                      style={{
                        clipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                        WebkitClipPath: 'polygon(24px 0, calc(100% - 24px) 0, 100% 24px, 100% calc(100% - 24px), calc(100% - 24px) 100%, 24px 100%, 0 calc(100% - 24px), 0 24px)',
                      }}
                    >
                      <div 
                        className="relative overflow-hidden bg-black/60 flex items-center justify-center max-h-[82vh]"
                        style={{
                          clipPath: 'polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)',
                          WebkitClipPath: 'polygon(22px 0, calc(100% - 22px) 0, 100% 22px, 100% calc(100% - 22px), calc(100% - 22px) 100%, 22px 100%, 0 calc(100% - 22px), 0 22px)',
                        }}
                      >
                        <img
                          src={selectedImage}
                          alt="Preview Foto Galeri"
                          className="w-auto h-auto max-w-[85vw] max-h-[80vh] object-contain select-none block"
                        />
                      </div>
                    </div>

                    {/* Gilded SVG Octagon Overlay */}
                    <svg 
                      viewBox="0 0 100 100" 
                      fill="none" 
                      className="absolute inset-0 w-full h-full pointer-events-none z-20"
                      preserveAspectRatio="none"
                    >
                      <defs>
                        <linearGradient id="modalBaliPrada" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FFFDF7" />
                          <stop offset="25%" stopColor="#FCE49E" />
                          <stop offset="55%" stopColor="#E5B232" />
                          <stop offset="85%" stopColor="#C48E1D" />
                          <stop offset="100%" stopColor="#783A1E" />
                        </linearGradient>
                      </defs>

                      <polygon
                        points="10,1 90,1 99,10 99,90 90,99 10,99 1,90 1,10"
                        stroke="url(#modalBaliPrada)"
                        strokeWidth="2.5"
                        vectorEffect="non-scaling-stroke"
                      />

                      <polygon
                        points="12,3 88,3 97,12 97,88 88,97 12,97 3,88 3,12"
                        stroke="#FCE59F"
                        strokeWidth="1"
                        strokeDasharray="4 2"
                        opacity="0.85"
                        vectorEffect="non-scaling-stroke"
                      />

                      {[
                        { cx: 5.5, cy: 5.5 },
                        { cx: 94.5, cy: 5.5 },
                        { cx: 94.5, cy: 94.5 },
                        { cx: 5.5, cy: 94.5 },
                      ].map((pt, i) => (
                        <g key={`modal-bali-jewel-${i}`}>
                          <polygon
                            points={`${pt.cx},${pt.cy - 2.8} ${pt.cx + 2.5},${pt.cy} ${pt.cx},${pt.cy + 2.8} ${pt.cx - 2.5},${pt.cy}`}
                            fill="url(#modalBaliPrada)"
                            stroke="#783A1E"
                            strokeWidth="0.4"
                          />
                          <circle cx={pt.cx} cy={pt.cy} r="1" fill="#FFFFFF" />
                        </g>
                      ))}
                    </svg>

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedImage(null)}
                      className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#783A1E] hover:bg-[#4E1E0F] text-[#FFFDF5] hover:text-white border-2 border-[#E5B232] flex items-center justify-center font-bold text-sm sm:text-base transition-transform hover:scale-110 shadow-xl z-30 cursor-pointer"
                      aria-label="Tutup preview"
                    >
                      ✕
                    </button>
                  </div>
                </div>,
                document.body
              )}
            </div>
          </section>

          {/* =========================================================================
              SECTION 7: TANDA KASIH & DANA PUNIA PAWIWAHAN
          ========================================================================= */}
          <section id="punia" className="relative p-6 sm:p-10 bg-[#FDFBF7] border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold">
                  TANDA KASIH &amp; DANA PUNIA
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Punia Kasih &amp; Kado
                </h2>
                <BaliPradaDivider />
                <p className="text-xs text-[#523226] max-w-md mx-auto leading-relaxed">
                  Kehadiran serta doa restu Bapak/Ibu/Saudara/i merupakan anugerah terindah bagi kami. Namun apabila hendak mengirimkan tanda kasih / dana punia, dapat disalurkan melalui:
                </p>
              </ScrollReveal>

              <div className="mt-8 space-y-4">
                {/* Bank Account 1 */}
                <ScrollReveal animation="fade-up" delay={100}>
                  <div className="p-5 rounded-2xl bg-white border border-[#E5B232]/50 shadow-xs relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-md bg-[#FDFBF7] text-[#783A1E] border border-[#E5B232]/40 font-bold text-xs tracking-wider">
                        BCA
                      </span>
                      <span className="text-[10px] text-[#785A4E] font-medium">Bank Central Asia</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-base sm:text-lg font-bold text-[#2E1E17] tracking-wider">
                          1234 5678 90
                        </span>
                        <span className="text-xs text-[#523226]">a.n. Steven Pratama</span>
                      </div>
                      <button
                        onClick={() => handleCopy('1234567890', 'bca')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#783A1E] text-white text-xs font-semibold hover:bg-[#5E2512] transition-colors shadow-xs cursor-pointer"
                      >
                        {copiedAccount === 'bca' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#FCE59F]" />
                            <span className="text-[#FCE59F]">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Nomor</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Bank Account 2 */}
                <ScrollReveal animation="fade-up" delay={200}>
                  <div className="p-5 rounded-2xl bg-white border border-[#E5B232]/50 shadow-xs relative overflow-hidden">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-md bg-[#FDFBF7] text-[#783A1E] border border-[#E5B232]/40 font-bold text-xs tracking-wider">
                        MANDIRI
                      </span>
                      <span className="text-[10px] text-[#785A4E] font-medium">Bank Mandiri</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block font-mono text-base sm:text-lg font-bold text-[#2E1E17] tracking-wider">
                          9876 5432 10
                        </span>
                        <span className="text-xs text-[#523226]">a.n. Bunga Citra Lestari</span>
                      </div>
                      <button
                        onClick={() => handleCopy('9876543210', 'mandiri')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#783A1E] text-white text-xs font-semibold hover:bg-[#5E2512] transition-colors shadow-xs cursor-pointer"
                      >
                        {copiedAccount === 'mandiri' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#FCE59F]" />
                            <span className="text-[#FCE59F]">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Nomor</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Physical Gift Delivery */}
                <ScrollReveal animation="fade-up" delay={300}>
                  <div className="p-5 rounded-2xl bg-white border border-[#E5B232]/50 shadow-xs">
                    <div className="flex items-center gap-2 mb-2">
                      <Gift className="w-4 h-4 text-[#E5B232]" />
                      <h4 className="font-serif text-sm font-bold text-[#783A1E]">
                        Kirim Kado Fisik
                      </h4>
                    </div>
                    <p className="text-xs text-[#523226] leading-relaxed mb-3">
                      Puri Ageng Kamasan, Jl. Raya Kamasan No. 18, Desa Kamasan, Klungkung, Bali 80716 (Penerima: Steven &amp; Bunga)
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <button
                        onClick={() => handleCopyAddress('Puri Ageng Kamasan, Jl. Raya Kamasan No. 18, Desa Kamasan, Klungkung, Bali 80716')}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FDFBF7] text-[#783A1E] border border-[#E5B232] text-xs font-semibold hover:bg-[#F8F3E8] transition-colors cursor-pointer"
                      >
                        {copiedAddress ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-[#C48E1D]" />
                            <span>Alamat Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Alamat</span>
                          </>
                        )}
                      </button>
                      <a
                        href="https://api.whatsapp.com/send?phone=6285707909415&text=Om%20Swastyastu%2C%20saya%20telah%20mengirimkan%20tanda%20kasih%20/%20punia%20untuk%20pernikahan%20Steven%20%26%20Bunga."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-700 text-white text-xs font-semibold hover:bg-emerald-800 transition-colors shadow-xs"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Konfirmasi via WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </section>

          {/* =========================================================================
              SECTION 8: BUKU TAMU & DOA RESTU (RSVP DIGITAL)
          ========================================================================= */}
          <section id="rsvp" className="relative p-6 sm:p-10 bg-white border-b border-[#E5B232]/35 overflow-hidden">
            <BaliPolengWatermark />

            <div className="max-w-xl mx-auto w-full relative z-10">
              <ScrollReveal animation="fade-up" className="text-center">
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E5B232] font-serif font-bold">
                  KONFIRMASI &amp; DOA RESTU
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1E17] mt-1">
                  Buku Tamu Digital
                </h2>
                <BaliPradaDivider />
                <p className="text-xs text-[#523226] max-w-md mx-auto leading-relaxed">
                  Mohon konfirmasi kehadiran dan tuliskan untaian doa restu semeton demi kelancaran upacara suci ini:
                </p>
              </ScrollReveal>

              {/* RSVP Form */}
              <ScrollReveal animation="fade-up" delay={150}>
                <form onSubmit={handleRsvpSubmit} className="mt-8 p-5 sm:p-6 rounded-3xl bg-[#FDFBF7] border border-[#E5B232]/50 shadow-xs space-y-4">
                  {rsvpSubmitted && (
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Suksma! Konfirmasi kehadiran &amp; doa restu Anda telah berhasil dikirimkan.</span>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-serif font-bold text-[#783A1E] mb-1">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Masukkan nama Anda..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5B232]/50 text-xs text-[#2E1E17] focus:outline-none focus:border-[#783A1E] focus:ring-1 focus:ring-[#783A1E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold text-[#783A1E] mb-1">
                      Konfirmasi Kehadiran
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { val: 'hadir', label: 'Hadir' },
                        { val: 'ragu', label: 'Ragu-ragu' },
                        { val: 'tidak_hadir', label: 'Berhalangan' },
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => setRsvpStatus(item.val as any)}
                          className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            rsvpStatus === item.val
                              ? 'bg-[#783A1E] text-white border-[#783A1E] shadow-xs'
                              : 'bg-white text-[#523226] border-[#E5B232]/40 hover:bg-[#F8F3E8]'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold text-[#783A1E] mb-1">
                      Jumlah Tamu
                    </label>
                    <select
                      value={rsvpGuests}
                      onChange={(e) => setRsvpGuests(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5B232]/50 text-xs text-[#2E1E17] focus:outline-none focus:border-[#783A1E]"
                    >
                      <option value="1">1 Orang</option>
                      <option value="2">2 Orang</option>
                      <option value="3">3 Orang</option>
                      <option value="4">4 Orang</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-serif font-bold text-[#783A1E] mb-1">
                      Doa Restu &amp; Ucapan
                    </label>
                    <textarea
                      rows={3}
                      value={rsvpWishes}
                      onChange={(e) => setRsvpWishes(e.target.value)}
                      placeholder="Tuliskan ucapan dan doa restu Anda..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E5B232]/50 text-xs text-[#2E1E17] focus:outline-none focus:border-[#783A1E] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#783A1E] to-[#9E4B28] text-white font-serif font-bold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FCE59F]" />
                    <span>Kirim Doa Restu</span>
                  </button>
                </form>
              </ScrollReveal>

              {/* Wishes Feed */}
              <div className="mt-8 space-y-3">
                <span className="text-xs font-serif font-bold text-[#783A1E] block mb-2">
                  Untaian Doa Restu ({wishesList.length})
                </span>
                {wishesList.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FDFBF7] border border-[#E5B232]/35 shadow-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-serif font-bold text-xs text-[#2E1E17]">
                        {item.name}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-white text-[#783A1E] border border-[#E5B232]/30 font-medium">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#523226] leading-relaxed">
                      "{item.wishes}"
                    </p>
                    <span className="text-[9.5px] text-[#785A4E] block mt-1.5">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* =========================================================================
              CLOSING FOOTER / OM SHANTI SHANTI SHANTI OM
          ========================================================================= */}
          <footer className="relative p-8 sm:p-12 bg-[#240A04] text-white text-center border-t border-[#E5B232]/40 overflow-hidden">
            <BaliPolengWatermark className="opacity-[0.05]" />

            <div className="max-w-md mx-auto relative z-10">
              <BaliCandiBentarPortal size={120} className="mx-auto mb-3" />
              <p className="font-serif text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#FCE59F]">
                Om Shanti, Shanti, Shanti, Om
              </p>
              <p className="text-xs text-[#FCE5D8] mt-2 leading-relaxed">
                Matur suksma yang sebesar-besarnya atas segala perhatian, kehadiran, dan doa restu semeton sinamian.
              </p>
              <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E5B232] to-transparent my-4" />
              <p className="font-serif text-base font-bold text-[#FCE59F]">
                {groomName} &amp; {brideName}
              </p>
              <span className="text-[10px] tracking-widest uppercase text-[#A87258] block mt-1">
                Beserta Seluruh Keluarga Besar
              </span>
            </div>
          </footer>

        </div>
      </main>

      {/* =========================================================================
          FLOATING BOTTOM CAPSULE NAVBAR (Aligned to Right Column on Desktop)
          ========================================================================= */}
      <div className="fixed bottom-4 right-0 w-full lg:w-7/12 xl:w-1/2 flex justify-center pointer-events-none z-40 px-3">
        <nav className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-md rounded-full py-2 px-3 border border-[#E5B232]/50 shadow-[0_8px_30px_rgba(120,58,30,0.22)] flex items-center justify-between">
          {[
            { id: 'sampul', label: 'Sampul', icon: Calendar },
            { id: 'mempelai', label: 'Mempelai', icon: Heart },
            { id: 'adat', label: 'Adat', icon: Bookmark },
            { id: 'acara', label: 'Acara', icon: Clock },
            { id: 'galeri', label: 'Galeri', icon: Sparkles },
            { id: 'punia', label: 'Punia', icon: Gift },
            { id: 'rsvp', label: 'RSVP', icon: MessageCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as any);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'text-white bg-gradient-to-r from-[#783A1E] to-[#9E4B28] shadow-xs scale-105'
                    : 'text-[#785A4E] hover:text-[#783A1E]'
                }`}
              >
                <Icon size={14} />
                <span className="text-[9px] font-sans font-semibold tracking-wider mt-0.5">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
