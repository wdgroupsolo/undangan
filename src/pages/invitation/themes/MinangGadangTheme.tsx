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
// SCROLL REVEAL COMPONENT
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
// =========================================================================
// ATAP GONJONG RUMAH GADANG (Authentic Architectural Curved Roof of Minangkabau)
// =========================================================================
export const MinangGonjongRoof: React.FC<{ size?: number; className?: string }> = ({ 
  size = 64, 
  className = '' 
}) => (
  <svg
    width={size}
    height={size * 0.42}
    viewBox="0 0 160 68"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="gonjongRoofGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF7E6" />
        <stop offset="30%" stopColor="#F5D77F" />
        <stop offset="70%" stopColor="#E1A83E" />
        <stop offset="100%" stopColor="#8C570A" />
      </linearGradient>
      <linearGradient id="gonjongFasciaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8C1D28" />
        <stop offset="100%" stopColor="#4A0D14" />
      </linearGradient>
    </defs>

    {/* Architectural Rumah Gadang Sweeping Roof Body (Concave Eaves) */}
    <path
      d="M8 32 C28 42, 54 48, 80 48 C106 48, 132 42, 152 32 C132 40, 106 44, 80 44 C54 44, 28 40, 8 32 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.8"
    />

    {/* Carved Wooden Fascia Board (Papan Lambai-Lambai) */}
    <path
      d="M18 42 C40 50, 60 52, 80 52 C100 52, 120 50, 142 42 L140 48 C120 56, 100 58, 80 58 C60 58, 40 56, 20 48 Z"
      fill="url(#gonjongFasciaGrad)"
      stroke="#E1A83E"
      strokeWidth="0.6"
    />

    {/* Carved Pucuk Rebung Motif in Fascia */}
    {[36, 50, 65, 80, 95, 110, 124].map((x, i) => (
      <polygon
        key={`fascia-rebung-${i}`}
        points={`${x},54 ${x - 3.5},50 ${x + 3.5},50`}
        fill="#E1A83E"
      />
    ))}

    {/* Left Outer Horn Peak (Gonjong Suaso Kiri Luar) */}
    <path
      d="M12 40 C14 26, 10 12, 4 4 C14 14, 22 28, 28 40 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.7"
    />
    <circle cx="4" cy="4" r="2" fill="#FFFFFF" stroke="#8C570A" strokeWidth="0.4" />

    {/* Left Inner Horn Peak (Gonjong Kiri Dalam) */}
    <path
      d="M32 42 C35 28, 32 16, 26 8 C36 18, 42 28, 46 42 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.7"
    />
    <circle cx="26" cy="8" r="1.8" fill="#FFF2D6" stroke="#8C570A" strokeWidth="0.4" />

    {/* Center Roof Crest / Puncak Bubungan */}
    <path
      d="M74 46 C77 34, 79 24, 80 18 C81 24, 83 34, 86 46 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.7"
    />
    <circle cx="80" cy="18" r="2.2" fill="#FFFFFF" stroke="#8C570A" strokeWidth="0.4" />

    {/* Right Inner Horn Peak (Gonjong Kanan Dalam) */}
    <path
      d="M114 42 C118 28, 124 18, 134 8 C128 16, 125 28, 128 42 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.7"
    />
    <circle cx="134" cy="8" r="1.8" fill="#FFF2D6" stroke="#8C570A" strokeWidth="0.4" />

    {/* Right Outer Horn Peak (Gonjong Suaso Kanan Luar) */}
    <path
      d="M132 40 C138 28, 146 14, 156 4 C150 12, 146 26, 148 40 Z"
      fill="url(#gonjongRoofGold)"
      stroke="#5A0D14"
      strokeWidth="0.7"
    />
    <circle cx="156" cy="4" r="2" fill="#FFFFFF" stroke="#8C570A" strokeWidth="0.4" />
  </svg>
);

// =========================================================================
// MAHKOTA SUNTIANG GADANG EMAS MINANGKABAU (Royal Multi-Tiered Bridal Headdress)
// =========================================================================
export const MinangRoyalSuntiangCrown: React.FC<{ size?: number; className?: string }> = ({ 
  size = 140, 
  className = '' 
}) => (
  <div 
    className={`pointer-events-none select-none flex items-center justify-center ${className}`}
    style={{ width: size, height: size * 0.52 }}
  >
    <svg
      width={size}
      height={size * 0.52}
      viewBox="0 0 160 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full drop-shadow-[0_4px_16px_rgba(225,168,62,0.45)]"
    >
      <defs>
        <linearGradient id="suntiangGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF5" />
          <stop offset="20%" stopColor="#FDEAB2" />
          <stop offset="50%" stopColor="#F1C246" />
          <stop offset="80%" stopColor="#D9941E" />
          <stop offset="100%" stopColor="#8C570A" />
        </linearGradient>
        <linearGradient id="suntiangBaseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFEAA7" />
          <stop offset="50%" stopColor="#DF9F28" />
          <stop offset="100%" stopColor="#7A4506" />
        </linearGradient>
        <radialGradient id="rubyGemGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FF7A8A" />
          <stop offset="45%" stopColor="#C41E3A" />
          <stop offset="100%" stopColor="#4A050D" />
        </radialGradient>
        <radialGradient id="pearlGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#FFF6DE" />
          <stop offset="100%" stopColor="#E2C485" />
        </radialGradient>
      </defs>

      {/* ============================================================== */}
      {/* JURAI SUNTIANG / KOTE-KOTE (CASCADING GOLDEN BEAD TASSELS) */}
      {/* ============================================================== */}
      {/* Left Jurai Strand 1 (Outer) */}
      <g stroke="url(#suntiangGoldGrad)" strokeWidth="1" strokeLinecap="round">
        <line x1="22" y1="58" x2="18" y2="65" />
        <line x1="18" y1="65" x2="15" y2="72" />
        <line x1="15" y1="72" x2="13" y2="78" />
      </g>
      <circle cx="22" cy="58" r="2.2" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="18" cy="65" r="2" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="15" cy="72" r="1.8" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      {/* Left Jurai Teardrop Charm */}
      <path d="M13 78 C11 80, 11 83, 13 84 C15 83, 15 80, 13 78 Z" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.5" />
      <circle cx="13" cy="81" r="0.8" fill="#FFFFFF" />

      {/* Left Jurai Strand 2 (Inner) */}
      <g stroke="url(#suntiangGoldGrad)" strokeWidth="0.9" strokeLinecap="round">
        <line x1="29" y1="58" x2="26" y2="64" />
        <line x1="26" y1="64" x2="24" y2="71" />
      </g>
      <circle cx="29" cy="58" r="1.9" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="26" cy="64" r="1.7" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <path d="M24 71 C22 73, 22 75, 24 76 C26 75, 26 73, 24 71 Z" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />

      {/* Right Jurai Strand 1 (Outer) */}
      <g stroke="url(#suntiangGoldGrad)" strokeWidth="1" strokeLinecap="round">
        <line x1="138" y1="58" x2="142" y2="65" />
        <line x1="142" y1="65" x2="145" y2="72" />
        <line x1="145" y1="72" x2="147" y2="78" />
      </g>
      <circle cx="138" cy="58" r="2.2" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="142" cy="65" r="2" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="145" cy="72" r="1.8" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      {/* Right Jurai Teardrop Charm */}
      <path d="M147 78 C149 80, 149 83, 147 84 C145 83, 145 80, 147 78 Z" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.5" />
      <circle cx="147" cy="81" r="0.8" fill="#FFFFFF" />

      {/* Right Jurai Strand 2 (Inner) */}
      <g stroke="url(#suntiangGoldGrad)" strokeWidth="0.9" strokeLinecap="round">
        <line x1="131" y1="58" x2="134" y2="64" />
        <line x1="134" y1="64" x2="136" y2="71" />
      </g>
      <circle cx="131" cy="58" r="1.9" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <circle cx="134" cy="64" r="1.7" fill="url(#pearlGrad)" stroke="#7A4506" strokeWidth="0.4" />
      <path d="M136 71 C138 73, 138 75, 136 76 C134 75, 134 73, 136 71 Z" fill="url(#suntiangGoldGrad)" stroke="#7A4506" strokeWidth="0.4" />

      {/* ============================================================== */}
      {/* BASE TIARA RIM (PELAT DASAR KERUT SUNTIANG) */}
      {/* ============================================================== */}
      {/* Lower Arch Band */}
      <path
        d="M20 59 Q80 47 140 59 L138 64 Q80 52 22 64 Z"
        fill="url(#suntiangBaseGrad)"
        stroke="#683905"
        strokeWidth="0.7"
      />
      {/* Upper Arch Filigree Ridge */}
      <path
        d="M23 57 Q80 45 137 57 L136 59 Q80 47 24 59 Z"
        fill="url(#suntiangGoldGrad)"
        stroke="#7A4506"
        strokeWidth="0.5"
      />
      {/* Arch Intan Pearls Row */}
      {[-50, -42, -34, -26, -18, -10, -2, 6, 14, 22, 30, 38, 46].map((offset, idx) => {
        const cy = 54 - Math.cos((offset / 54) * (Math.PI / 2.5)) * 4.5;
        return (
          <circle
            key={`base-pearl-${idx}`}
            cx={80 + offset}
            cy={cy}
            r={1.2}
            fill="url(#pearlGrad)"
            stroke="#6E3D06"
            strokeWidth="0.3"
          />
        );
      })}

      {/* ============================================================== */}
      {/* TIER 1: BUNGO SARUNAI (FIRST FAN OF GOLDEN BLOSSOMS) */}
      {/* ============================================================== */}
      {[-44, -36, -28, -20, -12, -4, 4, 12, 20, 28, 36, 44].map((offset, idx) => {
        const angle = (offset / 52) * 0.42;
        const baseY = 52 - Math.cos(angle * 2.5) * 6;
        const peakY = baseY - 11 - Math.cos(angle * 2) * 4;
        return (
          <g key={`t1-blossom-${idx}`}>
            <path
              d={`M${80 + offset - 3.5} ${baseY} Q${80 + offset} ${baseY - 5} ${80 + offset} ${peakY} Q${80 + offset} ${baseY - 5} ${80 + offset + 3.5} ${baseY} Z`}
              fill="url(#suntiangGoldGrad)"
              stroke="#683905"
              strokeWidth="0.45"
            />
            <circle
              cx={80 + offset}
              cy={baseY - 4}
              r={1.7}
              fill="url(#suntiangGoldGrad)"
              stroke="#5A2E03"
              strokeWidth="0.3"
            />
            <circle
              cx={80 + offset}
              cy={peakY}
              r={1.3}
              fill="url(#pearlGrad)"
              stroke="#6E3D06"
              strokeWidth="0.3"
            />
          </g>
        );
      })}

      {/* ============================================================== */}
      {/* TIER 2: KEMBANG GOYANG (MIDDLE RADIATING FAN) */}
      {/* ============================================================== */}
      {[-38, -30, -22, -14, -6, 6, 14, 22, 30, 38].map((offset, idx) => {
        const angle = (offset / 46) * 0.55;
        const baseY = 46 - Math.cos(angle * 2) * 6;
        const peakY = baseY - 15 - Math.cos(angle * 1.8) * 6;
        return (
          <g key={`t2-fan-${idx}`}>
            <path
              d={`M${80 + offset - 4} ${baseY} C${80 + offset - 2} ${baseY - 8}, ${80 + offset - 1} ${peakY + 3}, ${80 + offset} ${peakY} C${80 + offset + 1} ${peakY + 3}, ${80 + offset + 2} ${baseY - 8}, ${80 + offset + 4} ${baseY} Z`}
              fill="url(#suntiangGoldGrad)"
              stroke="#683905"
              strokeWidth="0.5"
            />
            <line
              x1={80 + offset}
              y1={baseY}
              x2={80 + offset}
              y2={peakY + 2}
              stroke="#FFE599"
              strokeWidth="0.5"
            />
            <circle
              cx={80 + offset}
              cy={baseY - 6}
              r={2}
              fill="url(#suntiangGoldGrad)"
              stroke="#683905"
              strokeWidth="0.3"
            />
            <circle
              cx={80 + offset}
              cy={baseY - 6}
              r={0.8}
              fill="#FFFFFF"
            />
            <circle
              cx={80 + offset}
              cy={peakY}
              r={1.5}
              fill="url(#pearlGrad)"
              stroke="#6E3D06"
              strokeWidth="0.35"
            />
          </g>
        );
      })}

      {/* ============================================================== */}
      {/* TIER 3: PINNACLES & TAJUK MAHKOTA (UPPER MAJESTIC SPIRES) */}
      {/* ============================================================== */}
      {[-26, 26].map((offset, i) => (
        <g key={`t3-spire-3-${i}`}>
          <path
            d={`M${80 + offset - 3.5} 36 L${80 + offset} 18 L${80 + offset + 3.5} 36 Z`}
            fill="url(#suntiangGoldGrad)"
            stroke="#683905"
            strokeWidth="0.5"
          />
          <circle cx={80 + offset} cy={18} r={1.8} fill="url(#pearlGrad)" stroke="#6E3D06" strokeWidth="0.4" />
        </g>
      ))}

      {[-17, 17].map((offset, i) => (
        <g key={`t3-spire-2-${i}`}>
          <path
            d={`M${80 + offset - 4} 34 L${80 + offset} 13 L${80 + offset + 4} 34 Z`}
            fill="url(#suntiangGoldGrad)"
            stroke="#683905"
            strokeWidth="0.5"
          />
          <circle cx={80 + offset} cy={13} r={2} fill="url(#pearlGrad)" stroke="#6E3D06" strokeWidth="0.4" />
        </g>
      ))}

      {[-9, 9].map((offset, i) => (
        <g key={`t3-spire-1-${i}`}>
          <path
            d={`M${80 + offset - 4.5} 32 L${80 + offset} 9 L${80 + offset + 4.5} 32 Z`}
            fill="url(#suntiangGoldGrad)"
            stroke="#683905"
            strokeWidth="0.5"
          />
          <circle cx={80 + offset} cy={9} r={2.2} fill="url(#pearlGrad)" stroke="#6E3D06" strokeWidth="0.4" />
        </g>
      ))}

      {/* ============================================================== */}
      {/* GRAND CENTER TAJUK (ROYAL CREST & RUBY GEMSTONE) */}
      {/* ============================================================== */}
      <path
        d="M74 34 L77 18 L76 7 L80 4 L84 7 L83 18 L86 34 Z"
        fill="url(#suntiangGoldGrad)"
        stroke="#5A2E03"
        strokeWidth="0.6"
      />
      <circle cx="80" cy="4" r="2.8" fill="url(#pearlGrad)" stroke="#683905" strokeWidth="0.5" />
      <circle cx="79.2" cy="3.2" r="0.9" fill="#FFFFFF" />

      {/* Center Sunburst Filigree */}
      <circle cx="80" cy="27" r="7.5" fill="url(#suntiangGoldGrad)" stroke="#683905" strokeWidth="0.6" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <line
            key={`sunray-${i}`}
            x1={80 + Math.cos(rad) * 4.5}
            y1={27 + Math.sin(rad) * 4.5}
            x2={80 + Math.cos(rad) * 7.5}
            y2={27 + Math.sin(rad) * 7.5}
            stroke="#FFEAA7"
            strokeWidth="0.7"
          />
        );
      })}
      {/* Royal Ruby Gem Center */}
      <circle cx="80" cy="27" r="4.2" fill="url(#rubyGemGrad)" stroke="#4A050D" strokeWidth="0.6" />
      <circle cx="78.8" cy="25.8" r="1.3" fill="#FFFFFF" opacity="0.85" />
      <circle cx="80" cy="18" r="1.5" fill="url(#pearlGrad)" stroke="#683905" strokeWidth="0.3" />

    </svg>
  </div>
);

// =========================================================================
// MINANG SONGKET ARCH FLANK (Royal Gilded Kaluk Paku & Daun Sirih Flourish)
// =========================================================================
export const MinangSongketArchFlank: React.FC<{ 
  side: 'left' | 'right'; 
  className?: string;
}> = ({ side, className = '' }) => {
  const isRight = side === 'right';
  return (
    <div 
      className={`absolute top-0 ${isRight ? '-right-5 sm:-right-7 scale-x-[-1]' : '-left-5 sm:-left-7'} pointer-events-none z-25 w-18 sm:w-22 h-36 sm:h-44 ${className}`}
      style={{
        filter: 'drop-shadow(0 4px 10px rgba(122, 24, 34, 0.35))',
      }}
    >
      <svg viewBox="0 0 85 155" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id={`minangFlankGold_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="25%" stopColor="#FCE49E" />
            <stop offset="60%" stopColor="#E1A83E" />
            <stop offset="85%" stopColor="#C48E28" />
            <stop offset="100%" stopColor="#7A4506" />
          </linearGradient>
          <radialGradient id={`minangPearl_${side}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#E5C158" />
          </radialGradient>
        </defs>

        {/* Curving Main Gilded Vine Hugging the Arch Shoulder */}
        <path 
          d="M10 148 C16 105, 34 52, 78 8" 
          stroke={`url(#minangFlankGold_${side})`} 
          strokeWidth="2.2" 
          strokeLinecap="round" 
        />
        {/* Inner parallel accent wire */}
        <path 
          d="M14 140 C20 102, 36 56, 74 16" 
          stroke={`url(#minangFlankGold_${side})`} 
          strokeWidth="0.8" 
          strokeDasharray="2 3" 
          opacity="0.85" 
        />

        {/* APEX CLUSTER (Kaluk Paku Curled Fern at the top peak) */}
        <g>
          <path 
            d="M78 8 C84 4, 87 7, 85 11 C83 14, 79 12, 79 10" 
            stroke={`url(#minangFlankGold_${side})`} 
            strokeWidth="1.5" 
            strokeLinecap="round" 
          />
          <path 
            d="M74 14 C82 8, 86 3, 86 0 C82 5, 76 10, 74 14 Z" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.4" 
          />
          <circle cx="78" cy="8" r="2.2" fill={`url(#minangPearl_${side})`} stroke="#7A4506" strokeWidth="0.4" />
        </g>

        {/* UPPER SHOULDER LEAF & REBUNG CLUSTER (Y=30 to Y=60) */}
        <g>
          <path 
            d="M56 34 C42 26, 28 30, 20 40 C30 38, 44 38, 56 34 Z" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.5" 
          />
          <polygon 
            points="58,34 46,24 52,22" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.4" 
          />
          <path 
            d="M52 42 C40 48, 30 52, 24 48 C18 44, 20 36, 28 36 C34 36, 36 42, 30 44" 
            stroke={`url(#minangFlankGold_${side})`} 
            strokeWidth="1.3" 
            strokeLinecap="round" 
            fill="none" 
          />
          <circle cx="56" cy="34" r="2.5" fill={`url(#minangPearl_${side})`} stroke="#683905" strokeWidth="0.5" />
          <circle cx="28" cy="44" r="1.5" fill={`url(#minangPearl_${side})`} stroke="#683905" strokeWidth="0.3" />
        </g>

        {/* MID-FLANK DAUN SIRIH & TENDRILS (Y=65 to Y=100) */}
        <g>
          <path 
            d="M36 72 C22 66, 12 72, 8 82 C18 80, 28 78, 36 72 Z" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.45" 
          />
          <path 
            d="M30 88 C18 84, 10 92, 6 102 C16 98, 24 94, 30 88 Z" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.45" 
          />
          <path 
            d="M32 78 C24 82, 18 86, 14 84" 
            stroke={`url(#minangFlankGold_${side})`} 
            strokeWidth="1" 
            strokeLinecap="round" 
          />
          <circle cx="33" cy="74" r="2" fill={`url(#minangPearl_${side})`} stroke="#7A4506" strokeWidth="0.4" />
        </g>

        {/* LOWER HANGING JURAI BEAD TASSEL (Y=105 to Y=152) */}
        <g>
          <line x1="16" y1="108" x2="13" y2="120" stroke={`url(#minangFlankGold_${side})`} strokeWidth="1" strokeLinecap="round" />
          <line x1="13" y1="120" x2="11" y2="134" stroke={`url(#minangFlankGold_${side})`} strokeWidth="1" strokeLinecap="round" />
          <line x1="11" y1="134" x2="9" y2="145" stroke={`url(#minangFlankGold_${side})`} strokeWidth="0.9" strokeLinecap="round" />

          <circle cx="16" cy="108" r="2" fill={`url(#minangPearl_${side})`} stroke="#683905" strokeWidth="0.4" />
          <circle cx="13" cy="120" r="1.8" fill={`url(#minangFlankGold_${side})`} stroke="#683905" strokeWidth="0.4" />
          <circle cx="11" cy="134" r="1.6" fill={`url(#minangPearl_${side})`} stroke="#683905" strokeWidth="0.4" />

          <path 
            d="M9 145 C6 148, 6 153, 9 155 C12 153, 12 148, 9 145 Z" 
            fill={`url(#minangFlankGold_${side})`} 
            stroke="#683905" 
            strokeWidth="0.5" 
          />
          <circle cx="9" cy="151" r="0.8" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
};

// Suntiang Crown Alias (compatible with existing references)
export const MinangSuntiangCrown: React.FC<{ size?: number; className?: string }> = ({ 
  size = 56, 
  className = '' 
}) => (
  <MinangRoyalSuntiangCrown size={size} className={className} />
);

// =========================================================================
// MINANG ROYAL OCTAGON FRAME (Segi Delapan Marawa Songket Emas)
// =========================================================================
export const MinangRoyalOctagonFrame: React.FC<{
  imageSrc: string;
  altText: string;
  className?: string;
  frameWidthClass?: string;
  frameHeightClass?: string;
  variant?: 'crimson' | 'cream';
}> = ({
  imageSrc,
  altText,
  className = '',
  frameWidthClass = 'w-48 sm:w-56',
  frameHeightClass = 'h-62 sm:h-74',
  variant = 'cream',
}) => {
  const isCrimson = variant === 'crimson';
  const octClip = 'polygon(16% 0%, 84% 0%, 100% 12.3%, 100% 87.7%, 84% 100%, 16% 100%, 0% 87.7%, 0% 12.3%)';

  return (
    <div className={`relative mx-auto ${frameWidthClass} ${frameHeightClass} flex items-center justify-center group ${className}`}>
      {/* Outer Floating Octagonal Halo (Delicate 1px Gold Line offset by 8px) */}
      <div 
        className="absolute -inset-2.5 pointer-events-none z-0"
        style={{
          filter: isCrimson 
            ? 'drop-shadow(0 14px 30px rgba(0,0,0,0.85)) drop-shadow(0 0 15px rgba(225,168,62,0.3))' 
            : 'drop-shadow(0 14px 28px rgba(122,24,34,0.25)) drop-shadow(0 0 12px rgba(225,168,62,0.2))',
        }}
      >
        <svg viewBox="0 0 100 130" fill="none" className="w-full h-full" preserveAspectRatio="none">
          <polygon
            points="16,1 84,1 99,16 99,114 84,129 16,129 1,114 1,16"
            stroke="#E1A83E"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            opacity="0.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      {/* Main Image Container Clipped to Octagon */}
      <div 
        className="relative w-full h-full overflow-hidden z-10 p-[3px] bg-gradient-to-b from-[#FFF2D6] via-[#E1A83E] to-[#7A1822] shadow-xl"
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
          {/* Bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          {/* Metallic Gold Light Sweep Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
              style={{ animation: 'goldShimmerSweep 5s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>

      {/* Gilded Metallic Songket Frame Overlay (SVG Borders, Inset Lines & Corner Jewels) */}
      <svg 
        viewBox="0 0 100 130" 
        fill="none" 
        className="absolute inset-0 w-full h-full pointer-events-none z-20"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`octGoldGrad_${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="25%" stopColor="#FCE49E" />
            <stop offset="55%" stopColor="#E1A83E" />
            <stop offset="85%" stopColor="#C48E28" />
            <stop offset="100%" stopColor="#7A4506" />
          </linearGradient>
          <linearGradient id={`octInnerGrad_${variant}`} x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F9E09B" />
            <stop offset="100%" stopColor="#B37C1C" />
          </linearGradient>
          <radialGradient id={`octJewelPearl_${variant}`} cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#E5C158" />
          </radialGradient>
          <radialGradient id={`octJewelRuby_${variant}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FF7A8A" />
            <stop offset="45%" stopColor="#C41E3A" />
            <stop offset="100%" stopColor="#4A050D" />
          </radialGradient>
        </defs>

        {/* Outer Heavy Gilded Bevel (2.4px) */}
        <polygon
          points="16,1 84,1 99,16 99,114 84,129 16,129 1,114 1,16"
          stroke={`url(#octGoldGrad_${variant})`}
          strokeWidth="2.4"
          vectorEffect="non-scaling-stroke"
        />

        {/* Inner Delicate Inset Frame (1px dashed) */}
        <polygon
          points="18.5,4 81.5,4 96,18.5 96,111.5 81.5,126 18.5,126 4,111.5 4,18.5"
          stroke={`url(#octInnerGrad_${variant})`}
          strokeWidth="0.9"
          strokeDasharray="3 2"
          opacity="0.85"
          vectorEffect="non-scaling-stroke"
        />

        {/* 4 Corner Chamfer Songket Diamonds (Bungo Intan Pandai Sikek) */}
        {[
          { cx: 8.5, cy: 8.5 },
          { cx: 91.5, cy: 8.5 },
          { cx: 91.5, cy: 121.5 },
          { cx: 8.5, cy: 121.5 },
        ].map((pt, i) => (
          <g key={`chamfer-jewel-${i}`}>
            {/* Diamond Rhombus */}
            <polygon
              points={`${pt.cx},${pt.cy - 3.2} ${pt.cx + 2.8},${pt.cy} ${pt.cx},${pt.cy + 3.2} ${pt.cx - 2.8},${pt.cy}`}
              fill={`url(#octGoldGrad_${variant})`}
              stroke="#683905"
              strokeWidth="0.4"
            />
            {/* Center Pearl */}
            <circle cx={pt.cx} cy={pt.cy} r="1.1" fill={`url(#octJewelPearl_${variant})`} stroke="#683905" strokeWidth="0.2" />
          </g>
        ))}

        {/* Cardinal Apex & Base Jewels */}
        {/* Top Center Diamond */}
        <g>
          <polygon
            points="50,0.5 52.5,2.5 50,4.5 47.5,2.5"
            fill={`url(#octGoldGrad_${variant})`}
            stroke="#683905"
            strokeWidth="0.4"
          />
          <circle cx="50" cy="2.5" r="0.9" fill={`url(#octJewelRuby_${variant})`} />
        </g>

        {/* Bottom Center Diamond */}
        <g>
          <polygon
            points="50,125.5 52.5,127.5 50,129.5 47.5,127.5"
            fill={`url(#octGoldGrad_${variant})`}
            stroke="#683905"
            strokeWidth="0.4"
          />
          <circle cx="50" cy="127.5" r="0.9" fill={`url(#octJewelRuby_${variant})`} />
        </g>

        {/* Left & Right Center Pips */}
        <circle cx="1" cy="65" r="1.3" fill={`url(#octGoldGrad_${variant})`} stroke="#683905" strokeWidth="0.3" />
        <circle cx="99" cy="65" r="1.3" fill={`url(#octGoldGrad_${variant})`} stroke="#683905" strokeWidth="0.3" />
      </svg>

      {/* Twinkling Ambient Sparkles */}
      <Sparkles className="w-3.5 h-3.5 text-[#FFF1BA] absolute top-1 right-2 animate-pulse z-30 drop-shadow-[0_0_6px_#E1A83E]" />
      <Sparkles className="w-3 h-3 text-[#FFF1BA] absolute bottom-2 left-2 animate-pulse z-30 drop-shadow-[0_0_6px_#E1A83E]" />
    </div>
  );
};

// =========================================================================
// CORNER SONGKET PANDAI SIKEK CLUSTER (Pucuak Rebuang & Kaluak Paku)
// =========================================================================
export const MinangCornerSongketCluster: React.FC<{
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
            <linearGradient id="songketBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="40%" stopColor="#E1A83E" />
              <stop offset="100%" stopColor="#7A1822" />
            </linearGradient>
          </defs>

          {/* Outer Border Line */}
          <path d="M4 4 L80 4 C50 12, 12 50, 4 80 Z" fill="none" stroke="url(#songketBorderGrad)" strokeWidth="1.5" />
          <path d="M10 10 L65 10 C42 18, 18 42, 10 65 Z" fill="none" stroke="#E1A83E" strokeWidth="1" strokeDasharray="2 3" />

          {/* Pucuak Rebuang Motif (Triangle Bamboo Shoot) */}
          <polygon points="12,12 28,12 20,4 Z" fill="#7A1822" stroke="#E1A83E" strokeWidth="0.8" />
          <polygon points="28,12 44,12 36,4 Z" fill="#7A1822" stroke="#E1A83E" strokeWidth="0.8" />
          <polygon points="12,28 12,12 4,20 Z" fill="#7A1822" stroke="#E1A83E" strokeWidth="0.8" />
          <polygon points="12,44 12,28 4,36 Z" fill="#7A1822" stroke="#E1A83E" strokeWidth="0.8" />

          {/* Kaluak Paku Spiral Accent */}
          <path d="M16 16 C30 20, 28 36, 18 32 C12 30, 14 22, 20 22 C24 22, 26 26, 24 28" stroke="#E1A83E" strokeWidth="1.2" strokeLinecap="round" fill="none" />
        </svg>

        {/* Mini Suntiang Accent */}
        <div className="absolute top-2 left-2 z-10">
          <MinangSuntiangCrown size={size * 0.42} />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MINANG ARCH SUNTIANG GADANG (Royal Crown Header for Photo Arch)
// =========================================================================
export const MinangArchGonjong: React.FC<{ size?: number; className?: string }> = ({ 
  size = 145, 
  className = '' 
}) => (
  <MinangRoyalSuntiangCrown size={size} className={className} />
);

// =========================================================================
// SONGKET PANDAI SIKEK WATERMARK PATTERN
// =========================================================================
export const MinangSongketWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.038] select-none ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="minangSongketPattern" width="76" height="76" patternUnits="userSpaceOnUse">
          {/* Diamond Rhombus Weave */}
          <path d="M38 0 L76 38 L38 76 L0 38 Z" fill="none" stroke="#7A1822" strokeWidth="1" />
          <path d="M38 12 L64 38 L38 64 L12 38 Z" fill="none" stroke="#E1A83E" strokeWidth="0.8" strokeDasharray="2 2" />
          
          {/* Pucuak Rebuang Small Triangles inside */}
          <polygon points="38,20 44,28 32,28" fill="#7A1822" />
          <polygon points="38,56 44,48 32,48" fill="#7A1822" />
          <polygon points="20,38 28,44 28,32" fill="#7A1822" />
          <polygon points="56,38 48,44 48,32" fill="#7A1822" />

          {/* Center Pearl */}
          <circle cx="38" cy="38" r="3" fill="#E1A83E" />
          {/* Corner florets */}
          <circle cx="0" cy="0" r="3" fill="#E1A83E" />
          <circle cx="76" cy="0" r="3" fill="#E1A83E" />
          <circle cx="0" cy="76" r="3" fill="#E1A83E" />
          <circle cx="76" cy="76" r="3" fill="#E1A83E" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#minangSongketPattern)" />
    </svg>
  </div>
);

// =========================================================================
// MINANG BATIK DIVIDER
// =========================================================================
export const MinangBatikDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-col items-center justify-center my-5 opacity-90 ${className}`}>
    <div className="flex items-center justify-center gap-3 w-full max-w-xs">
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#E1A83E] to-[#7A1822]" />
      <div className="flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#1A1113] border border-[#E1A83E]/60" />
        <span className="w-2 h-2 rounded-full bg-[#7A1822] border border-[#E1A83E]/70 shadow-xs" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#E1A83E] shadow-xs" />
      </div>
      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#E1A83E] to-[#7A1822]" />
    </div>
  </div>
);

// =========================================================================
// FALLING MELATI EMAS & MARAWA SPARKLES
// =========================================================================
export const FallingMelatiEmas: React.FC = () => {
  const petals = [
    { left: '7%', delay: '0s', duration: '12s', size: 12, rot: '20deg' },
    { left: '24%', delay: '3s', duration: '15s', size: 14, rot: '-30deg' },
    { left: '38%', delay: '1.2s', duration: '13s', size: 10, rot: '45deg' },
    { left: '55%', delay: '5s', duration: '17s', size: 13, rot: '-15deg' },
    { left: '70%', delay: '2.5s', duration: '14s', size: 11, rot: '60deg' },
    { left: '85%', delay: '4s', duration: '16s', size: 15, rot: '-35deg' },
    { left: '94%', delay: '0.8s', duration: '11s', size: 12, rot: '25deg' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-25">
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute -top-6 animate-minang-fall opacity-70"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            style={{ transform: `rotate(${p.rot})` }}
          >
            <circle cx="10" cy="12" r="7" fill="#FFFDF8" stroke="#E1A83E" strokeWidth="0.8" />
            <path d="M10 2 C12 6, 14 10, 10 18 C6 10, 8 6, 10 2Z" fill="#FFF5DC" />
            <circle cx="10" cy="12" r="2.2" fill="#E1A83E" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes minangFall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.75;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(20px);
          }
          90% {
            opacity: 0.65;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-15px);
            opacity: 0;
          }
        }
        @keyframes goldShimmerSweep {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          40%, 100% {
            transform: translateX(350%) skewX(-20deg);
          }
        }
        .animate-minang-fall {
          animation-name: minangFall;
        }
      `}</style>
    </div>
  );
};

export const GoldenMarawaGlow: React.FC = () => {
  const sparks = [
    { top: '10%', left: '12%', size: '3px', delay: '0s', dur: '4s' },
    { top: '24%', left: '85%', size: '4px', delay: '1.5s', dur: '5s' },
    { top: '42%', left: '18%', size: '2px', delay: '2.2s', dur: '3.8s' },
    { top: '60%', left: '78%', size: '3px', delay: '0.9s', dur: '4.6s' },
    { top: '75%', left: '14%', size: '4px', delay: '3.3s', dur: '5.1s' },
    { top: '88%', left: '88%', size: '3px', delay: '1.8s', dur: '4.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {sparks.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#E1A83E] opacity-50 animate-ping"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.dur,
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// MINANG GADANG THEME PROPS & COMPONENT
// =========================================================================
export interface MinangGadangThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: any;
  guestName?: string;
  isOpening?: boolean;
}

export const MinangGadangTheme: React.FC<MinangGadangThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName = 'Tamu Undangan',
}) => {
  const [activeSection, setActiveSection] = useState('sampul');
  const [adatTab, setAdatTab] = useState<'upacara' | 'cerita'>('upacara');
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
      name: 'Keluarga Bpk. H. Datuk Maruhun Basa',
      status: 'Hadir',
      wishes: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fii khoir. Salamaik manampuah hiduik baru kando Steven jo dindo Bunga, samawa saumua hiduik.',
      time: '1 jam yang lalu',
    },
    {
      name: 'Uni Rahmawati & Uda Zulkifli',
      status: 'Hadir',
      wishes: 'Salamaik baralek gadang! Barek samo dipikua, ringan samo dijinjiang. Sakinah mawaddah warahmah dunia akhirat.',
      time: '3 jam yang lalu',
    },
    {
      name: 'Keluarga Rang Chaniago',
      status: 'Hadir',
      wishes: 'Selamat menempuh hidup baru Steven & Bunga! Semoga senantiasa rukun dan bahagia selalu.',
      time: '5 jam yang lalu',
    },
  ]);

  // Countdown State
  const targetDate = new Date(invitation?.wedding_date || '2026-12-28T09:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [invitation?.wedding_date]);

  // ScrollSpy observer
  useEffect(() => {
    const sectionIds = ['sampul', 'mempelai', 'cerita', 'acara', 'galeri', 'hadiah', 'rsvp'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 240;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    if (type === 'address') {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } else {
      setCopiedAccount(type);
      setTimeout(() => setCopiedAccount(null), 2500);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpWishes.trim()) return;
    const newEntry = {
      name: rsvpName,
      status: rsvpStatus === 'hadir' ? 'Hadir' : rsvpStatus === 'tidak_hadir' ? 'Tidak Hadir' : 'Ragu-ragu',
      wishes: rsvpWishes,
      time: 'Baru saja',
    };
    setWishesList([newEntry, ...wishesList]);
    setRsvpSubmitted(true);
    setRsvpWishes('');
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  // Names formatting
  const groomName = couple?.groom_nickname || couple?.groom_name || couple?.groom_full_name || 'Steven';
  const brideName = couple?.bride_nickname || couple?.bride_name || couple?.bride_full_name || 'Bunga';
  const groomFullName = couple?.groom_full_name || 'Steven Pratama, S.T.';
  const brideFullName = couple?.bride_full_name || 'Bunga Citra Lestari, S.E.';
  const groomParents = couple?.groom_parents || 'Putra tercinta dari Bpk. Bambang Wijaya & Ibu Sri Rahayu';
  const brideParents = couple?.bride_parents || 'Putri tercinta dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const groomInstagram = couple?.groom_instagram || 'steven.pratama';
  const brideInstagram = couple?.bride_instagram || 'bunga.citra';

  const couplePhoto = couple?.cover_photo_url || couple?.cover_photo || '/themes/minang-gadang/theme-preview.jpg';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/steven-bunga/groom.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/steven-bunga/bride.jpg';

  // 70k Tier Rich Gallery (up to 6 photos)
  const displayGallery = (gallery && gallery.length >= 3) ? gallery.slice(0, 6) : [
    { image_url: couplePhoto, caption: 'Ijab Kabul & Batuka Tando' },
    { image_url: groomPhoto, caption: 'Marapulai Bagala Sutan' },
    { image_url: bridePhoto, caption: 'Anak Daro Basuntiang Ameh' },
    { image_url: '/photos/photo-1.jpg', caption: 'Prosesi Malam Bainai' },
    { image_url: '/photos/photo-5.jpg', caption: 'Makan Bajamba di Rumah Gadang' },
    { image_url: '/photos/photo-7.jpg', caption: 'Kalamak kasiah salamo-lamo' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#1E1617] font-sans relative selection:bg-[#E1A83E] selection:text-[#1E1617] overflow-x-hidden">
      {/* Falling Golden Jasmine & Marawa Sparkles */}
      <FallingMelatiEmas />
      <GoldenMarawaGlow />

      {/* =========================================================================
          LEFT PANEL (DESKTOP ONLY: Fixed 42% / 50% Panel with Photo & Guest Name)
          ========================================================================= */}
      <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#1A1113] text-white border-r border-[#E1A83E]/40">
        
        {/* Panoramic Rumah Gadang Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src={couplePhoto} 
            alt={`${groomName} & ${brideName}`} 
            className="w-full h-full object-cover object-center filter brightness-90 scale-105"
          />
          {/* Deep Maroon & Marawa Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#140A0C] via-[#3A0F16]/85 to-[#1A0A0E]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#250A0E]/40 to-[#140A0C]/90" />
          <MinangSongketWatermark className="opacity-[0.06]" />
        </div>

        {/* Gilded Inner Arch Frame Line */}
        <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#E1A83E]/45 pointer-events-none z-10" />

        {/* Central Content Column */}
        <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
          
          {/* TOP: Badges */}
          <div className="w-full flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#350E14]/85 backdrop-blur-md border border-[#E1A83E]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Crown className="w-3.5 h-3.5 text-[#E1A83E]" />
              <span>Baralek Gadang</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#350E14]/85 backdrop-blur-md border border-[#E1A83E]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#E1A83E]" />
              <span>Adat Minangkabau</span>
            </div>
          </div>

          {/* CENTER: Couple Portrait & Recipient Guest Card */}
          <div className="my-auto w-full flex flex-col items-center text-center py-4">
            
            {/* Royal Octagon Couple Photo Frame with Songket Gold Border */}
            <div className="mb-3">
              <MinangRoyalOctagonFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-44 xl:w-52"
                frameHeightClass="h-58 xl:h-68"
                variant="crimson"
              />
            </div>

            <div className="flex items-center justify-center gap-2 mb-1 text-[#FFF1BA]">
              <Sparkles className="w-3.5 h-3.5 text-[#E1A83E] animate-pulse" />
              <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                THE WEDDING CELEBRATION OF
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#E1A83E] animate-pulse" />
            </div>

            {/* Couple Names */}
            <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#F5D77F] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {groomName} <span className="text-xl xl:text-2xl text-[#E1A83E] font-light italic font-serif">&amp;</span> {brideName}
            </h1>

            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1A83E] to-transparent mb-3" />

            {/* Recipient Guest Card */}
            <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#350E14]/90 via-[#260B10]/95 to-[#150609]/98 backdrop-blur-md border border-[#E1A83E]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(225,168,62,0.25)] mb-3">
              <div className="absolute inset-1.5 rounded-xl border border-[#E1A83E]/25 pointer-events-none" />
              
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#E1A83E] font-serif font-semibold mb-0.5 text-center">
                Kepada Yth. Bapak/Ibu/Saudara/i :
              </p>
              
              <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                {guestName}
              </h2>
              
              <p className="text-[9.5px] tracking-wider text-[#E8D4C8] text-center font-sans mt-0.5">
                Merupakan satu kehormatan atas kehadiran &amp; doa restu Anda
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
                <div key={idx} className="p-2 rounded-xl bg-gradient-to-b from-[#3A1017]/80 to-[#200A0E]/90 backdrop-blur-md border border-[#E1A83E]/45 shadow-md">
                  <span className="block text-lg xl:text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#E8D4C8] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* BOTTOM: Venue Info */}
          <div className="w-full flex items-center justify-between text-xs text-[#E8D4C8] border-t border-[#E1A83E]/35 pt-3">
            <span className="font-serif tracking-wide text-[#F9E5BA] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E1A83E]" />
              Rumah Gadang Puti Bungsu
            </span>
            <span className="font-sans text-[#FFF8E7]">Padang, Sumatera Barat</span>
          </div>

        </div>

      </aside>

      {/* =========================================================================
          RIGHT PANEL (Scrollable Main Invitation Content on Desktop)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 bg-[#FAF6F0] pb-24 shadow-2xl lg:border-l lg:border-[#E1A83E]/35">
        <div className="relative w-full min-h-screen">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
        ========================================================================= */}
        <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FAF6F0] border-b border-[#E1A83E]/40 overflow-hidden">
          {/* Subtle Ambient Marawa Radial Glow & Songket Watermark */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(225,168,62,0.22)_0%,rgba(250,246,240,0.98)_70%)]" />
          <MinangSongketWatermark />

          {/* 4 Corner Songket & Suntiang Clusters */}
          <div className="absolute top-0 left-0"><MinangCornerSongketCluster position="top-left" size={96} /></div>
          <div className="absolute top-0 right-0"><MinangCornerSongketCluster position="top-right" size={96} /></div>
          <div className="absolute bottom-0 left-0"><MinangCornerSongketCluster position="bottom-left" size={96} /></div>
          <div className="absolute bottom-0 right-0"><MinangCornerSongketCluster position="bottom-right" size={96} /></div>

          {/* Top Headline */}
          <ScrollReveal animation="fade-down" delay={100} className="relative z-10 pt-4 max-w-md mx-auto w-full">
            <span className="text-[10px] sm:text-xs tracking-[0.34em] uppercase text-[#7A1822] font-serif font-bold">
              BARALEK GADANG ADAT MINANGKABAU
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1E1617] mt-2">
              {groomName} <span className="font-light italic text-[#E1A83E]">&amp;</span> {brideName}
            </h1>
            <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#855B52] mt-1.5 font-medium">
              {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          {/* Royal Octagon Couple Photo Window with Songket Gold Border */}
          <ScrollReveal animation="zoom-in" delay={200} className="relative z-10 my-auto py-3 flex flex-col items-center max-w-md mx-auto w-full">
            <div className="mb-2.5">
              <MinangRoyalOctagonFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-48 sm:w-56"
                frameHeightClass="h-62 sm:h-74"
                variant="cream"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#E1A83E]/50 shadow-sm">
              <Crown className="w-3.5 h-3.5 text-[#E1A83E]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#7A1822] font-bold">
                Minang Rumah Gadang
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info */}
          <ScrollReveal animation="fade-up" delay={300} className="relative z-10 w-full flex flex-col items-center pb-4 max-w-md mx-auto">
            <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#E1A83E]/40 shadow-xs mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#855B52] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-[#7A1822] block truncate">
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
                <div key={idx} className="bg-white rounded-xl p-2 border border-[#E1A83E]/40 text-center shadow-xs">
                  <span className="block font-serif text-base sm:text-lg font-bold text-[#7A1822]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-sans tracking-wider uppercase text-[#855B52]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('mempelai')}
              className="mt-4 flex flex-col items-center gap-1 text-[#7A1822] opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-[9px] tracking-widest uppercase font-serif font-semibold">GULIA KA BAWAH</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#E1A83E]" />
            </button>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            SECTION 2: MEMPELAI (ANAK DARO & MARAPULAI)
        ========================================================================= */}
        <section id="mempelai" className="relative p-6 sm:p-10 bg-white border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              {/* Bismillah Calligraphy */}
              <div className="mb-2 select-none">
                <p className="font-serif text-xl sm:text-2xl text-[#7A1822] tracking-widest leading-relaxed opacity-90" dir="rtl" style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', serif" }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1A83E] to-transparent mt-1" />
              </div>

              {/* Salam Pembuka Adat Minangkabau */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6F0] text-[#7A1822] text-[10.5px] font-serif font-bold tracking-[0.2em] uppercase border border-[#E1A83E]/40 mb-2.5">
                <Crown className="w-3 h-3 text-[#E1A83E]" />
                <span>Assalamu'alaikum Wr. Wb. • Manuruik Adat Nan Kawi</span>
              </div>

              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold block">
                ANAK DARO &amp; MARAPULAI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Kedua Mempelai
              </h2>
              <MinangBatikDivider />
              
              {/* Petuah Syarak & Quran Ayat */}
              <p className="text-xs sm:text-sm text-[#4E2B2A] leading-relaxed max-w-md mx-auto italic font-serif">
                "Manuruik syarak nan lazim, manuruik adat nan kawi. Mambina rumah tanggo nan sakinah, mawaddah, warahmah, saukua mangko jadi, sasuai mangko takik."
                <br />
                <span className="text-[11px] not-italic font-sans font-semibold text-[#7A1822] mt-1.5 block">
                  (QS. Ar-Rum: 21)
                </span>
              </p>

              {/* Pantun Pasambahan Manjapuik Alek */}
              <div className="mt-5 p-4 rounded-2xl bg-[#FAF6F0] border border-[#E1A83E]/45 text-center relative overflow-hidden shadow-xs max-w-md mx-auto">
                <p className="font-serif text-xs sm:text-[12.5px] text-[#7A1822] italic leading-relaxed">
                  "Barek samo dipikua, ringan samo dijinjiang,<br />
                  Kok jauah basentak jalang, kok dakek basentak rantang.<br />
                  Ilia sarangkuah dayuang, mudiak saantak galah,<br />
                  Basamo kito maramekan alek, maharok doa restu nan barakah."
                </p>
                <span className="text-[9.5px] uppercase tracking-widest text-[#9E6E16] font-sans font-bold block mt-2">
                  — Pasambahan Manjapuik Alek Minangkabau —
                </span>
              </div>
            </ScrollReveal>

            {/* Groom & Bride Cards */}
            <div className="mt-8 space-y-8">
              {/* Groom Profile (Marapulai) */}
              <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <MinangRoyalOctagonFrame
                    imageSrc={groomPhoto}
                    altText={groomName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                    variant="cream"
                  />
                </div>
                
                <span className="text-[10.5px] uppercase tracking-widest text-[#E1A83E] font-serif font-bold">
                  Marapulai (Pengantin Pria)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1617] mt-0.5">
                  {groomFullName}
                </h3>
                <span className="text-[11px] font-serif text-[#7A1822] italic font-semibold">
                  (Gadang Bagala Sutan Palito Alam)
                </span>
                <p className="text-xs text-[#523230] mt-1 max-w-xs">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <a
                    href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#7A1822] border border-[#E1A83E]/50 text-[11px] font-medium hover:bg-[#F3EBE0] transition-colors"
                  >
                    <InstagramIcon size={13} />
                    <span>@{groomInstagram.replace('@', '')}</span>
                  </a>
                )}
              </ScrollReveal>

              {/* Ampersand Botanical Bridge with Gold Filigree */}
              <div className="flex items-center justify-center my-2">
                <div className="w-12 h-[1px] bg-[#E1A83E]/60" />
                <div className="mx-3 w-9 h-9 rounded-full bg-[#FAF6F0] border border-[#E1A83E] flex items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 text-[#E1A83E] fill-[#E1A83E]/30" />
                </div>
                <div className="w-12 h-[1px] bg-[#E1A83E]/60" />
              </div>

              {/* Bride Profile (Anak Daro) */}
              <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center">
                <div className="mb-3">
                  <MinangRoyalOctagonFrame
                    imageSrc={bridePhoto}
                    altText={brideName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                    variant="cream"
                  />
                </div>

                <span className="text-[10.5px] uppercase tracking-widest text-[#E1A83E] font-serif font-bold">
                  Anak Daro (Pengantin Wanita)
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1617] mt-0.5">
                  {brideFullName}
                </h3>
                <span className="text-[11px] font-serif text-[#7A1822] italic font-semibold">
                  (Puti Bungsu Ranah Minang)
                </span>
                <p className="text-xs text-[#523230] mt-1 max-w-xs">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <a
                    href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF6F0] text-[#7A1822] border border-[#E1A83E]/50 text-[11px] font-medium hover:bg-[#F3EBE0] transition-colors"
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
            SECTION 3: KISAH CINTA & PROSESI BARALEK GADANG (ADAT MINANGKABAU)
        ========================================================================= */}
        <section id="cerita" className="relative p-6 sm:p-10 bg-[#FAF6F0] border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold">
                LALAMPAHAN KASIAH &amp; ADAT BARALEK GADANG
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Kisah &amp; Prosesi Adat
              </h2>
              <MinangBatikDivider />

              {/* Tab Switcher: Prosesi Adat Minang vs Kisah Kasiah */}
              <div className="flex items-center justify-center gap-1.5 p-1 rounded-full bg-white/90 border border-[#E1A83E]/45 max-w-xs mx-auto shadow-xs my-4">
                <button
                  type="button"
                  onClick={() => setAdatTab('upacara')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-serif font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    adatTab === 'upacara'
                      ? 'bg-[#7A1822] text-[#FFF1BA] shadow-xs scale-102 border border-[#E1A83E]/50'
                      : 'text-[#855B52] hover:text-[#7A1822]'
                  }`}
                >
                  Prosesi Adat
                </button>
                <button
                  type="button"
                  onClick={() => setAdatTab('cerita')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-serif font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    adatTab === 'cerita'
                      ? 'bg-[#7A1822] text-[#FFF1BA] shadow-xs scale-102 border border-[#E1A83E]/50'
                      : 'text-[#855B52] hover:text-[#7A1822]'
                  }`}
                >
                  Kisah Kasiah
                </button>
              </div>
            </ScrollReveal>

            {/* TAB CONTENT 1: RUNTUYAN 5 UPACARA ADAT BARALEK GADANG */}
            {adatTab === 'upacara' && (
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: 'I',
                    title: 'Batimbang Tando & Maminang',
                    sub: 'Tando Karik Bapaneh & Pinangan Sepuh',
                    meaning: 'Keluarga kadua balah pihak batamu untuak mambicarokan pinangan sarta batuka tando (cincin atau karih pusaka). Pralambang ikatan janji nan kokoh manuruik adat Minang.',
                    symbol: 'Karih Pusaka, Carano Sirih, Kain Salempang',
                  },
                  {
                    step: 'II',
                    title: 'Malam Bainai',
                    sub: 'Pemerahan Inai & Pituah Rang Gaek',
                    meaning: 'Ritual sakral wengi sateuacan akad. Para bako jo ninik mamak mangoleskan daun inai sirah ka kuku jari calon anak daro sabagai tando kasucian jo doa kasalamatan.',
                    symbol: 'Daun Inai Sirah, Aia Bungo Tujuah Rupo',
                  },
                  {
                    step: 'III',
                    title: 'Manjapuik Marapulai',
                    sub: 'Prosesi Panjapuikan Rang Mudo',
                    meaning: 'Rombongan kaluarga anak daro mandatangi rumah marapulai mambao carano baisi sirih langkok untuak manjapuik marapulai baarak manuju tampek akad nikah.',
                    symbol: 'Carano Sirih, Payuang Kuning Kebesaran',
                  },
                  {
                    step: 'IV',
                    title: 'Ijab Kabul & Batuka Tando',
                    sub: 'Janji Suci di Hadapan Penghulu Syarak',
                    meaning: 'Pangucapan ijab kabul di muko panghulu adat jo syarak. Sasudah sah, kadua mempelai batuka tando pasambahan sarato manyarahkan mahar.',
                    symbol: 'Kitab Suci Al-Qur\'an, Seperangkat Alat Sholat',
                  },
                  {
                    step: 'V',
                    title: 'Basanding & Makan Bajamba',
                    sub: 'Dulang Sarato & Kasiah Bakalamak',
                    meaning: 'Kedua mempelai basanding di Rumah Gadang diiriangi musik talempong jo saluang. Disusul tradisi makan bajamba basamo para tamu sacaro baradok di ateh dulang.',
                    symbol: 'Pelaminan Minang Khas, Dulang Jamba',
                  },
                ].map((item, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" delay={idx * 80} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E1A83E]/40 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#7A1822] text-[#FFF1BA] shrink-0 flex items-center justify-center font-serif font-bold text-xs shadow-xs border border-[#E1A83E]/40">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                          <h4 className="font-serif text-base font-bold text-[#1E1617]">
                            {item.title}
                          </h4>
                          <span className="text-[9.5px] uppercase tracking-wider text-[#E1A83E] font-serif font-semibold">
                            Adat Minang
                          </span>
                        </div>
                        <p className="text-[11px] font-serif text-[#7A1822] font-semibold italic mb-1.5">
                          {item.sub}
                        </p>
                        <p className="text-xs text-[#523230] leading-relaxed mb-2.5">
                          {item.meaning}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-[10px] text-[#855B52] font-sans border border-[#E1A83E]/30">
                          <Sparkles className="w-3 h-3 text-[#E1A83E]" />
                          <span>Simbol: {item.symbol}</span>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            )}

            {/* TAB CONTENT 2: TIMELINE KISAH CINTA */}
            {adatTab === 'cerita' && (
              <div className="mt-6 relative">
                <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-[#E1A83E]/50" />
                <div className="space-y-6">
                  {(stories && stories.length > 0 ? stories : [
                    {
                      year: '2021',
                      title: 'Awal Basobok',
                      content: 'Takdir dari Illahi Rabbi mampatamukan langkah hiduik kami duaan. Dari panjalangan kawan sabaririk, tumbuah raso kasiah nan tulus di dalam dado.',
                    },
                    {
                      year: '2024',
                      title: 'Batimbang Tando & Lamaran',
                      content: 'Dapek restu dari kadua urang gaek jo ninik mamak, kami bakaul untuak manyatukan duo kaluarga gadang dalam ikatan nan sakral.',
                    },
                    {
                      year: '2026',
                      title: 'Janji Suci Baralek Gadang',
                      content: 'Dina hari nan rancak ko, kami mangucapan ijab kabul dipayungi atap gonjong Rumah Gadang jo iringan alunan saluang talempong.',
                    },
                  ]).map((item, idx) => (
                    <ScrollReveal key={idx} animation="fade-up" delay={idx * 120} className="relative pl-14">
                      <div className="absolute left-3.5 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-[#7A1822] text-[#E1A83E] border-2 border-white flex items-center justify-center shadow-xs">
                        <Heart className="w-3 h-3 fill-[#E1A83E]" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-[#E1A83E]/40 shadow-xs">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-[#7A1822] text-[10px] font-bold tracking-wider font-serif mb-1 border border-[#E1A83E]/30">
                          {item.year || '2026'}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1E1617]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#523230] leading-relaxed mt-1">
                          {item.content || item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}

            {/* PITUAH BUDI PEKERTI MINANGKABAU */}
            <ScrollReveal animation="fade-up" delay={180} className="mt-8 p-5 rounded-2xl bg-white border border-[#E1A83E]/45 shadow-xs text-center relative overflow-hidden">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FAF6F0] text-[#7A1822] text-[10px] font-serif font-bold tracking-wider mb-2 border border-[#E1A83E]/40">
                <Sparkles className="w-3 h-3 text-[#E1A83E]" />
                <span>Pituah Budi Pekerti Minangkabau</span>
              </div>
              <p className="font-serif text-sm sm:text-base font-bold text-[#1E1617] italic leading-relaxed">
                "Nan kurik kundi, nan merah sago.<br />
                Nan baik budi, nan indah baso."
              </p>
              <p className="text-xs text-[#523230] mt-1.5 max-w-sm mx-auto leading-relaxed font-sans">
                Budi pekerti luhur sarato tutur baso nan santun manjadi tiang utamo dalam managakkan mahligai rumah tanggo nan sakinah, mawaddah, warahmah.
              </p>
            </ScrollReveal>

            {/* MINANGKABAU PARIBASA BANNER */}
            <ScrollReveal animation="fade-up" delay={220} className="mt-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#4A0D14] via-[#2F080D] to-[#1A0407] text-white border border-[#E1A83E]/60 shadow-[0_12px_35px_rgba(74,13,20,0.35)] text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#E1A83E]/15 blur-xl pointer-events-none" />
              <MinangGonjongRoof size={38} className="mx-auto mb-2 opacity-95" />
              <p className="font-serif text-sm sm:text-base italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#FFF1BA] to-[#F5D77F] leading-relaxed max-w-md mx-auto drop-shadow-sm">
                "Adat basandi syarak, syarak basandi Kitabullah. Barek samo dipikua, ringan samo dijinjiang. Ka kaba samo mangabakan, ka sakik samo dirasokan."
              </p>
              <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1A83E] to-transparent my-2" />
              <p className="text-[10px] text-[#E8D4C8] uppercase tracking-[0.2em] font-sans font-semibold">
                Falsafah Luhur Minangkabau • Karukunan &amp; Kasatujuan Saukua
              </p>
            </ScrollReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ACARA PERNIKAHAN (EVENTS & BARALEK)
        ========================================================================= */}
        <section id="acara" className="relative p-6 sm:p-10 bg-white border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold">
                RUNTUYAN ACARA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Rangkaian Acara
              </h2>
              <MinangBatikDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6">
              {(events && events.length > 0 ? events : [
                {
                  title: 'Akad Nikah',
                  date: 'Senin, 28 Desember 2026',
                  time: '08:00 - 10:00 WIB',
                  location: 'Masjid Raya Sumatera Barat',
                  address: 'Jl. Khatib Sulaiman, Alai Parak Kopi, Padang',
                  maps_url: 'https://maps.google.com',
                },
                {
                  title: 'Baralek Gadang & Resepsi',
                  date: 'Senin, 28 Desember 2026',
                  time: '11:00 - 17:00 WIB',
                  location: 'Rumah Gadang Puti Bungsu Convention Hall',
                  address: 'Jl. Gajah Mada No. 88, Gunung Pangilun, Padang',
                  maps_url: 'https://maps.google.com',
                },
              ]).map((evt, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} className="relative p-6 rounded-3xl bg-[#FAF6F0] border border-[#E1A83E]/45 shadow-sm text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E1A83E]/40 text-[10px] font-serif uppercase tracking-[0.2em] text-[#7A1822] font-bold mb-3">
                    <Crown className="w-3 h-3 text-[#E1A83E]" />
                    <span>{evt.title}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1617]">
                    {evt.title}
                  </h3>

                  <div className="my-4 space-y-2 text-xs sm:text-sm text-[#523230]">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-[#E1A83E]" />
                      <span>{evt.date || 'Senin, 28 Desember 2026'}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-[#E1A83E]" />
                      <span>{evt.time || '09:00 WIB - Selesai'}</span>
                    </div>
                    <div className="flex items-start justify-center gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-[#E1A83E] shrink-0 mt-0.5" />
                      <div className="text-left max-w-xs">
                        <strong className="block font-serif text-[#1E1617]">{evt.location}</strong>
                        <span className="text-[11px] text-[#855B52] leading-tight block mt-0.5">{evt.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <a
                      href={evt.maps_url || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#7A1822] text-[#FFF1BA] text-xs font-serif font-bold tracking-wider hover:bg-[#5E121A] shadow-sm transition-all border border-[#E1A83E]/40"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>PETUNJUK LOKASI (MAPS)</span>
                    </a>

                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title + ' - ' + groomName + ' & ' + brideName)}&details=${encodeURIComponent('Pernikahan Adat Minang ' + groomName + ' & ' + brideName + ' di ' + evt.location)}&location=${encodeURIComponent(evt.address || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#7A1822] border border-[#E1A83E]/50 text-xs font-serif font-semibold tracking-wider hover:bg-[#F3EBE0] transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#E1A83E]" />
                      <span>SIMPAN TANGGAL</span>
                    </a>
                  </div>
                </ScrollReveal>
              ))}

              {/* PANDUAN BUSANA / DRESS CODE TAMU */}
              <ScrollReveal animation="fade-up" delay={200} className="p-6 rounded-3xl bg-[#FAF6F0] border border-[#E1A83E]/45 shadow-xs text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#E1A83E]/40 text-[10px] font-serif uppercase tracking-[0.2em] text-[#7A1822] font-bold mb-2">
                  <Shirt className="w-3.5 h-3.5 text-[#E1A83E]" />
                  <span>Panduan Busana Tamu</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1E1617] mb-1">
                  Dress Code Pernikahan
                </h4>
                <p className="text-xs text-[#523230] max-w-sm mx-auto mb-4 leading-relaxed">
                  Demi keselarasan dan keagungan dokumentasi prosesi Baralek Gadang, para tamu undangan dianjurkan mengenakan busana bernuansa:
                </p>

                {/* 4 Palette Swatches */}
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#7A1822] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#7A1822] mt-1 font-bold">Marun Minang</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#E1A83E] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#9E6E16] mt-1 font-bold">Emas Songket</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#1A1113] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#1E1617] mt-1 font-bold">Hitam Beludru</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#E1A83E]/50 shadow-sm" />
                    <span className="text-[9px] font-serif text-[#855B52] mt-1 font-bold">Krem Sutra</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#855B52] italic mt-3.5">
                  Pria: Baju Kurung / Batik Lengan Panjang • Wanita: Kebaya Tradisional / Baju Koto Gadang
                </p>
              </ScrollReveal>

              {/* SIARAN LANGSUNG (LIVE STREAMING) */}
              <ScrollReveal animation="fade-up" delay={250} className="p-6 rounded-3xl bg-gradient-to-br from-[#4A0D14] via-[#2F080D] to-[#1A0407] text-white border border-[#E1A83E]/60 shadow-[0_12px_35px_rgba(74,13,20,0.35)] text-center relative overflow-hidden">
                <div className="absolute top-3.5 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-bold uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  LIVE VIRTUAL
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-[#E1A83E]/50 flex items-center justify-center mx-auto mb-2 text-[#FFF1BA]">
                  <Video className="w-5 h-5 text-[#E1A83E]" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#FFF1BA]">
                  Siaran Langsung Akad &amp; Baralek
                </h4>
                <p className="text-xs text-[#E8D4C8] max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                  Bagi sanak saudara di ranah rantau yang berhalangan hadir langsung di Rumah Gadang, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan prosesi sakral melalui siaran virtual.
                </p>
                <a
                  href="https://youtube.com/live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#E1A83E] via-[#FFF1BA] to-[#F5D77F] hover:opacity-95 text-[#1E1617] text-xs font-serif font-bold tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Video className="w-4 h-4 text-[#1E1617]" />
                  <span>GABUNG SIARAN YOUTUBE LIVE</span>
                </a>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: GALERI FOTO ADAT (UP TO 6 PHOTOS - 70K TIER)
        ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 bg-[#FAF6F0] border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-2xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold">
                GALERI MEMPELAI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Galeri Baralek Gadang
              </h2>
              <MinangBatikDivider />
              <p className="text-xs text-[#523230] max-w-xs mx-auto">
                Dokumentasi kabagjaan kadua mempelai dalam busana megah adat Minangkabau.
              </p>
            </ScrollReveal>

            {/* 6 Photos Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {displayGallery.map((img, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="zoom-in"
                  delay={idx * 80}
                  className="group relative cursor-pointer"
                >
                  <div
                    onClick={() => setSelectedImage(img.image_url)}
                    className="w-full h-44 sm:h-52 overflow-hidden p-[2.5px] bg-gradient-to-b from-[#FFF2D6] via-[#E1A83E] to-[#7A1822] shadow-sm group-hover:shadow-lg transition-all group-hover:scale-[1.02] relative"
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
                      <div className="absolute inset-0 bg-[#7A1822]/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[#FFF1BA] text-[11px] font-serif font-bold bg-[#4A0D14]/90 px-3.5 py-1.5 rounded-full backdrop-blur-xs border border-[#E1A83E]/60 shadow-md">
                          Caliak Foto
                        </span>
                      </div>
                    </div>
                  </div>
                  {img.caption && (
                    <p className="text-center text-[10px] font-serif text-[#855B52] mt-1.5 italic truncate">
                      {img.caption}
                    </p>
                  )}
                </ScrollReveal>
              ))}
            </div>

            {/* Modal Zoom Preview (Royal Octagon Segi Delapan Mewah) */}
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
                  {/* Outer Floating Octagonal Halo (Delicate gold line offset) */}
                  <div 
                    className="absolute -inset-2.5 sm:-inset-3.5 pointer-events-none z-0"
                    style={{
                      filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.95)) drop-shadow(0 0 25px rgba(225,168,62,0.4))',
                    }}
                  >
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full" preserveAspectRatio="none">
                      <polygon
                        points="10,1 90,1 99,10 99,90 90,99 10,99 1,90 1,10"
                        stroke="#E1A83E"
                        strokeWidth="0.8"
                        strokeDasharray="4 3"
                        opacity="0.6"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </div>

                  {/* Main Image Container Clipped to Symmetrical Octagon */}
                  <div 
                    className="relative overflow-hidden z-10 p-1 sm:p-1.5 bg-gradient-to-b from-[#FFF2D6] via-[#E1A83E] to-[#7A1822] shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
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

                  {/* Gilded SVG Octagon Overlay (Borders & Corner Jewels) */}
                  <svg 
                    viewBox="0 0 100 100" 
                    fill="none" 
                    className="absolute inset-0 w-full h-full pointer-events-none z-20"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="modalOctGold" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFFDF7" />
                        <stop offset="25%" stopColor="#FCE49E" />
                        <stop offset="55%" stopColor="#E1A83E" />
                        <stop offset="85%" stopColor="#C48E28" />
                        <stop offset="100%" stopColor="#7A4506" />
                      </linearGradient>
                      <linearGradient id="modalOctInner" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFFFFF" />
                        <stop offset="50%" stopColor="#F9E09B" />
                        <stop offset="100%" stopColor="#B37C1C" />
                      </linearGradient>
                    </defs>

                    {/* Outer Heavy Gilded Bevel */}
                    <polygon
                      points="10,1 90,1 99,10 99,90 90,99 10,99 1,90 1,10"
                      stroke="url(#modalOctGold)"
                      strokeWidth="2.5"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* Inner Delicate Inset Frame */}
                    <polygon
                      points="12,3 88,3 97,12 97,88 88,97 12,97 3,88 3,12"
                      stroke="url(#modalOctInner)"
                      strokeWidth="1"
                      strokeDasharray="4 2"
                      opacity="0.85"
                      vectorEffect="non-scaling-stroke"
                    />

                    {/* 4 Corner Chamfer Songket Jewels */}
                    {[
                      { cx: 5.5, cy: 5.5 },
                      { cx: 94.5, cy: 5.5 },
                      { cx: 94.5, cy: 94.5 },
                      { cx: 5.5, cy: 94.5 },
                    ].map((pt, i) => (
                      <g key={`modal-jewel-${i}`}>
                        <polygon
                          points={`${pt.cx},${pt.cy - 2.8} ${pt.cx + 2.5},${pt.cy} ${pt.cx},${pt.cy + 2.8} ${pt.cx - 2.5},${pt.cy}`}
                          fill="url(#modalOctGold)"
                          stroke="#683905"
                          strokeWidth="0.4"
                        />
                        <circle cx={pt.cx} cy={pt.cy} r="1" fill="#FFFFFF" />
                      </g>
                    ))}
                  </svg>

                  {/* Elegant Floating Close Button */}
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute -top-3.5 -right-3.5 sm:-top-4 sm:-right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#7A1822] hover:bg-[#520E15] text-[#FFF2D6] hover:text-white border-2 border-[#E1A83E] flex items-center justify-center font-bold text-sm sm:text-base transition-transform hover:scale-110 shadow-xl z-30 cursor-pointer"
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
            SECTION 6: AMPLOP DIGITAL & KADO (TANDO KASIH)
        ========================================================================= */}
        <section id="hadiah" className="relative p-6 sm:p-10 bg-white border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold">
                TANDO KASIH &amp; KADO
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Amplop Digital &amp; Kado
              </h2>
              <MinangBatikDivider />
              <p className="text-xs text-[#523230] max-w-md mx-auto leading-relaxed">
                Suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Namun apabila hendak mengirimkan tanda kasih, dapat disalurkan melalui:
              </p>
            </ScrollReveal>

            <div className="mt-8 space-y-4">
              {(gifts && gifts.length > 0 ? gifts : [
                {
                  bank_name: 'BCA',
                  account_number: '7410293847',
                  account_name: 'Steven Pratama',
                },
                {
                  bank_name: 'Bank Mandiri',
                  account_number: '1370019283746',
                  account_name: 'Bunga Citra Lestari',
                },
              ]).map((gift, idx) => (
                <ScrollReveal
                  key={idx}
                  animation="fade-up"
                  delay={idx * 120}
                  className="relative p-5 rounded-2xl bg-[#FAF6F0] border border-[#E1A83E]/45 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[#7A1822] border border-[#E1A83E]/40 text-[10px] font-bold tracking-wider mb-1">
                      {gift.bank_name || 'BANK'}
                    </div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#1E1617] tracking-wider">
                      {gift.account_number}
                    </div>
                    <div className="text-xs text-[#855B52]">
                      a.n. {gift.account_name}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(gift.account_number, gift.account_number)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#7A1822] text-[#FFF1BA] text-xs font-serif font-bold tracking-wider hover:bg-[#5E121A] transition-all cursor-pointer shadow-xs border border-[#E1A83E]/30"
                  >
                    {copiedAccount === gift.account_number ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FFF1BA]" />
                        <span>TERSALIN!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#E1A83E]" />
                        <span>SALIN NOMOR</span>
                      </>
                    )}
                  </button>
                </ScrollReveal>
              ))}

              {/* Gift Delivery Address */}
              <ScrollReveal animation="fade-up" delay={250} className="p-5 rounded-2xl bg-[#FAF6F0] border border-[#E1A83E]/45 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[#7A1822]">
                  <Gift className="w-4 h-4 text-[#E1A83E]" />
                  <span className="font-serif text-sm font-bold">Kirim Kado Fisik</span>
                </div>
                <p className="text-xs text-[#523230] leading-relaxed">
                  Penerima: <strong>{groomName} &amp; {brideName}</strong>
                  <br />
                  Jl. Khatib Sulaiman No. 88, Lolong Belanti, Padang 25136
                  <br />
                  No. HP: 0857-0790-9415
                </p>
                <button
                  onClick={() => copyToClipboard('Steven & Bunga - Jl. Khatib Sulaiman No. 88, Lolong Belanti, Padang 25136 (HP: 0857-0790-9415)', 'address')}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#7A1822] border border-[#E1A83E]/40 text-[11px] font-semibold hover:bg-[#F3EBE0] transition-all"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3 h-3 text-[#7A1822]" />
                      <span>ALAMAT TERSALIN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#E1A83E]" />
                      <span>SALIN ALAMAT</span>
                    </>
                  )}
                </button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: RSVP & BUKU DOA (KONFIRMASI KAHADIRAN)
        ========================================================================= */}
        <section id="rsvp" className="relative p-6 sm:p-10 bg-[#FAF6F0] border-b border-[#E1A83E]/35 overflow-hidden">
          <MinangSongketWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#E1A83E] font-serif font-bold">
                KONFIRMASI &amp; UNTAIAN DU'A
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1617] mt-1">
                Konfirmasi Kehadiran &amp; Doa
              </h2>
              <MinangBatikDivider />
              <p className="text-xs text-[#523230] max-w-xs mx-auto">
                Bapak/Ibu/Saudara/i dimohon mangagiah konfirmasi kahadiran sarato maagiah doa restu.
              </p>
            </ScrollReveal>

            {/* RSVP Form */}
            <ScrollReveal animation="fade-up" delay={120} className="mt-8 p-6 rounded-3xl bg-white border border-[#E1A83E]/45 shadow-sm">
              <form onSubmit={handleRsvpSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E1617] font-bold mb-1">
                    NAMA LENGKAP *
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Bpk. H. Datuk Maruhun"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E1A83E]/40 text-xs text-[#1E1617] focus:outline-none focus:ring-2 focus:ring-[#7A1822]/40"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E1617] font-bold mb-1">
                    KONFIRMASI KEHADIRAN *
                  </label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E1A83E]/40 text-xs text-[#1E1617] focus:outline-none focus:ring-2 focus:ring-[#7A1822]/40"
                  >
                    <option value="hadir">Bakal Hadir (Insya Allah Hadir)</option>
                    <option value="ragu">Masih Ragu-ragu</option>
                    <option value="tidak_hadir">Mohon Maaf Belum Dapat Hadir</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E1617] font-bold mb-1">
                    JUMLAH TAMU YANG HADIR
                  </label>
                  <select
                    value={rsvpGuests}
                    onChange={(e) => setRsvpGuests(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E1A83E]/40 text-xs text-[#1E1617] focus:outline-none focus:ring-2 focus:ring-[#7A1822]/40"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E1617] font-bold mb-1">
                    UNTAIAN DOA &amp; UCAPAN SELAMAT *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={rsvpWishes}
                    onChange={(e) => setRsvpWishes(e.target.value)}
                    placeholder="Tuliskan doa restu yang baik untuk kedua mempelai..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#E1A83E]/40 text-xs text-[#1E1617] focus:outline-none focus:ring-2 focus:ring-[#7A1822]/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-full bg-[#7A1822] text-[#FFF1BA] text-xs font-serif font-bold uppercase tracking-widest hover:bg-[#5E121A] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E1A83E]/40"
                >
                  <Send className="w-3.5 h-3.5 text-[#E1A83E]" />
                  <span>KIRIM KONFIRMASI &amp; DOA</span>
                </button>

                {rsvpSubmitted && (
                  <div className="p-3 rounded-xl bg-[#EAF5EC] border border-[#89C593] text-center text-xs text-[#1B4D24] font-medium">
                    ✓ Terima kasih! Konfirmasi kehadiran dan untaian doa restu telah tersimpan dengan baik.
                  </div>
                )}
              </form>
            </ScrollReveal>

            {/* Wishes List */}
            <div className="mt-8 space-y-3">
              <h4 className="font-serif text-sm font-bold text-[#1E1617] flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-[#E1A83E]" />
                <span>Untaian Doa Para Tamu ({wishesList.length})</span>
              </h4>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {wishesList.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-white border border-[#E1A83E]/35 shadow-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-xs font-bold text-[#1E1617]">{item.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[#7A1822] font-medium border border-[#E1A83E]/30">
                        {item.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#523230] leading-relaxed">
                      {item.wishes}
                    </p>
                    <span className="text-[9px] text-[#855B52] mt-1 block">
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FOOTER (70K HERITAGE BRANDING)
        ========================================================================= */}
        <footer className="relative p-8 text-center bg-[#FAF6F0] border-t border-[#E1A83E]/50 overflow-hidden pb-24">
          <ScrollReveal animation="fade-up" className="max-w-md mx-auto">
            <MinangGonjongRoof size={42} className="mx-auto mb-2 opacity-90" />
            <p className="text-xs text-[#523230] italic font-serif leading-relaxed">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1617] mt-3">
              {groomName} &amp; {brideName}
            </h3>

            {/* 70k Heritage Tier Branding */}
            <div className="mt-6 pt-5 border-t border-[#E1A83E]/35 flex flex-col items-center gap-1.5">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#855B52] font-semibold">
                WD DIGITAL INVITATION • PAKET HERITAGE (70K)
              </span>
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#7A1822] hover:underline font-serif font-bold"
              >
                <InstagramIcon size={13} className="text-[#E1A83E]" />
                <span>@wdgroupcompany</span>
                <ExternalLink size={11} className="text-[#E1A83E]" />
              </a>
            </div>
          </ScrollReveal>
        </footer>

        </div> {/* Close inner full-width card container */}

        {/* =========================================================================
            FLOATING PILL NAVBAR WITH SCROLLSPY (MARAWA MAROON & GOLD ACCENTS)
        ========================================================================= */}
        <div className="fixed bottom-4 right-0 w-full lg:w-7/12 xl:w-1/2 flex justify-center pointer-events-none z-40 px-3">
          <nav className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-md rounded-full py-2 px-3 border border-[#E1A83E]/50 shadow-[0_8px_30px_rgba(122,24,34,0.22)] flex items-center justify-between">
            {[
              { id: 'sampul', label: 'Sampul', icon: Crown },
              { id: 'mempelai', label: 'Mempelai', icon: Heart },
              { id: 'cerita', label: 'Adat', icon: Bookmark },
              { id: 'acara', label: 'Acara', icon: Calendar },
              { id: 'galeri', label: 'Galeri', icon: Clock },
              { id: 'hadiah', label: 'Kado', icon: Gift },
              { id: 'rsvp', label: 'RSVP', icon: MessageCircle },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => scrollToSection(tab.id)}
                  className={`flex flex-col items-center justify-center py-1 px-1.5 sm:px-2 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-[#7A1822] text-[#FFF1BA] shadow-xs scale-105 border border-[#E1A83E]/40'
                      : 'text-[#855B52] hover:text-[#7A1822]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'stroke-[2.5] text-[#E1A83E]' : 'stroke-[1.8]'}`} />
                  <span className={`text-[8px] sm:text-[9px] font-serif tracking-wider uppercase mt-0.5 ${isActive ? 'font-bold' : 'font-normal'}`}>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

      </main>
    </div>
  );
};

export default MinangGadangTheme;
