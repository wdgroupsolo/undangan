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
// GRAND SUNDA SIGER CROWN (9-Peak Royal Sundanese Crown)
// =========================================================================
export const SundaSigerCrown: React.FC<{ size?: number; className?: string }> = ({ 
  size = 54, 
  className = '' 
}) => (
  <svg
    width={size}
    height={size * 0.65}
    viewBox="0 0 100 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="sigerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF1BA" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#8F711C" />
      </linearGradient>
      <linearGradient id="sigerGemsGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#F5D77F" />
      </linearGradient>
    </defs>
    
    {/* Base Tiara Arch */}
    <path 
      d="M6 56 C24 50, 40 46, 50 46 C60 46, 76 50, 94 56 C78 52, 60 49, 50 49 C40 49, 22 52, 6 56 Z" 
      fill="url(#sigerGoldGrad)" 
      stroke="#7A5D12" 
      strokeWidth="0.8" 
    />
    <path 
      d="M12 60 C30 55, 42 53, 50 53 C58 53, 70 55, 88 60 C72 57, 58 55, 50 55 C42 55, 28 57, 12 60 Z" 
      fill="url(#sigerGoldGrad)" 
      opacity="0.8" 
    />

    {/* 9 Peaks of Siger (Center Highest, Cascading Down Gracefully) */}
    {/* Center Peak #5 */}
    <path d="M50 4 L55 28 L45 28 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.7" />
    <path d="M47 18 L50 7 L53 18 L50 24 Z" fill="url(#sigerGemsGrad)" />
    <circle cx="50" cy="5" r="2.2" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.6" />

    {/* Peaks #4 & #6 */}
    <path d="M38 12 L44 32 L34 31 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.6" />
    <circle cx="38" cy="13" r="1.8" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />
    <path d="M62 12 L66 31 L56 32 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.6" />
    <circle cx="62" cy="13" r="1.8" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />

    {/* Peaks #3 & #7 */}
    <path d="M28 20 L35 36 L24 34 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.6" />
    <circle cx="28" cy="21" r="1.6" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />
    <path d="M72 20 L76 34 L65 36 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.6" />
    <circle cx="72" cy="21" r="1.6" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />

    {/* Peaks #2 & #8 */}
    <path d="M19 28 L26 40 L16 38 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.5" />
    <circle cx="19" cy="29" r="1.4" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />
    <path d="M81 28 L84 38 L74 40 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.5" />
    <circle cx="81" cy="29" r="1.4" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />

    {/* Peaks #1 & #9 (Outer Wings) */}
    <path d="M11 36 L18 45 L9 44 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.5" />
    <circle cx="11" cy="37" r="1.2" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />
    <path d="M89 36 L91 44 L82 45 Z" fill="url(#sigerGoldGrad)" stroke="#7A5D12" strokeWidth="0.5" />
    <circle cx="89" cy="37" r="1.2" fill="#FFFFFF" stroke="#8F711C" strokeWidth="0.5" />

    {/* Intricate Filigree Lace Under the Peaks */}
    <path 
      d="M16 42 Q30 36 50 36 Q70 36 84 42 Q70 45 50 45 Q30 45 16 42 Z" 
      fill="url(#sigerGoldGrad)" 
      stroke="#7A5D12" 
      strokeWidth="0.6" 
    />
    <circle cx="50" cy="40" r="2" fill="#FFFFFF" />
    <circle cx="40" cy="40" r="1.5" fill="#FFF1BA" />
    <circle cx="60" cy="40" r="1.5" fill="#FFF1BA" />
  </svg>
);

// =========================================================================
// RONCE MELATI TITISAN (Cascading Jasmine Buds Strand)
// =========================================================================
export const RonceMelatiTitisan: React.FC<{ 
  height?: number; 
  className?: string;
  side?: 'left' | 'right';
}> = ({ 
  height = 90, 
  className = '',
  side = 'left' 
}) => {
  const isRight = side === 'right';
  return (
    <svg
      width={height * 0.35}
      height={height}
      viewBox="0 0 32 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none drop-shadow-sm ${className}`}
      style={{ transform: isRight ? 'scaleX(-1)' : 'none' }}
    >
      <defs>
        <radialGradient id="melatiPearl" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="65%" stopColor="#F5F9F6" />
          <stop offset="100%" stopColor="#DFE8E2" />
        </radialGradient>
      </defs>
      {/* Golden Cap */}
      <path d="M12 4 C14 2, 18 2, 20 4 L22 8 L10 8 Z" fill="#D4AF37" stroke="#8F711C" strokeWidth="0.5" />
      {/* Strand Stem */}
      <path d="M16 8 Q14 35 17 60 Q18 75 16 88" stroke="#4A6B53" strokeWidth="1" strokeDasharray="1.5 2" />

      {/* Jasmine Buds (Bawang Sebungkul & Kuncup Melati) */}
      <circle cx="16" cy="12" r="3.2" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="15" cy="20" r="3.0" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="16" cy="28" r="2.8" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="17" cy="36" r="2.6" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="16" cy="44" r="2.4" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="17" cy="52" r="2.2" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="18" cy="60" r="2.0" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="17" cy="68" r="1.8" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="16" cy="76" r="1.6" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
      <circle cx="16" cy="84" r="1.4" fill="url(#melatiPearl)" stroke="#C3D1C8" strokeWidth="0.5" />
    </svg>
  );
};

// =========================================================================
// SUNDA FLORAL CORNER CLUSTER (Siger Filigree, Ronce Melati & Sirih Leaf)
// =========================================================================
export const SundaFloralCornerCluster: React.FC<{
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
        {/* Golden Sunda Filigree Arch */}
        <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className="absolute inset-0">
          <path d="M4 4 C35 4, 60 12, 75 30" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 14 C28 14, 48 22, 60 38" stroke="#E5C158" strokeWidth="1" strokeDasharray="2 3" />
          <path d="M4 4 C4 35, 12 60, 30 75" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M14 4 C14 28, 22 48, 38 60" stroke="#E5C158" strokeWidth="1" strokeDasharray="2 3" />
          {/* Daun Sirih Accent */}
          <path d="M8 8 Q24 18 16 34 Q8 26 8 8Z" fill="#2D4638" stroke="#D4AF37" strokeWidth="0.8" />
        </svg>

        {/* Small Siger Crown Accent */}
        <div className="absolute top-2 left-2 z-10">
          <SundaSigerCrown size={size * 0.45} />
        </div>

        {/* Cascading Melati Strand */}
        <div className="absolute top-7 left-1 z-5">
          <RonceMelatiTitisan height={size * 0.65} />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// SUNDA ARCH CROWN (Grand Arched Siger + Twin Melati Strands)
// =========================================================================
export const SundaArchCrown: React.FC<{ size?: number; className?: string }> = ({ 
  size = 195, 
  className = '' 
}) => (
  <div 
    className={`pointer-events-none flex items-center justify-center select-none ${className}`}
    style={{ width: size, height: size * 0.45 }}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Left Ronce Melati */}
      <div className="absolute left-[12%] top-[30%] z-10">
        <RonceMelatiTitisan height={size * 0.42} side="left" />
      </div>

      {/* Center Grand Siger Crown */}
      <div className="relative z-20 drop-shadow-xl">
        <SundaSigerCrown size={size * 0.52} />
      </div>

      {/* Right Ronce Melati */}
      <div className="absolute right-[12%] top-[30%] z-10">
        <RonceMelatiTitisan height={size * 0.42} side="right" />
      </div>
    </div>
  </div>
);

// =========================================================================
// SUNDA BATIK DIVIDER
// =========================================================================
export const SundaBatikDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 opacity-85 ${className}`}>
    <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#2D4638]" />
    <div className="flex items-center gap-1.5 text-[#D4AF37]">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
      <SundaSigerCrown size={24} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#D4AF37]" />
    </div>
    <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#2D4638]" />
  </div>
);

// =========================================================================
// SUNDA BATIK WATERMARK PATTERN (Kawung & Daun Sirih Priangan)
// =========================================================================
export const SundaBatikWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden opacity-[0.038] select-none ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="sundaBatikPattern" width="72" height="72" patternUnits="userSpaceOnUse">
          <path d="M36 0 C44 14 58 22 72 36 C58 50 44 58 36 72 C28 58 14 50 0 36 C14 22 28 14 36 0Z" fill="none" stroke="#2D4638" strokeWidth="1" />
          <circle cx="36" cy="36" r="9" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="36" cy="36" r="3.5" fill="#2D4638" />
          <circle cx="0" cy="0" r="3" fill="#D4AF37" />
          <circle cx="72" cy="0" r="3" fill="#D4AF37" />
          <circle cx="0" cy="72" r="3" fill="#D4AF37" />
          <circle cx="72" cy="72" r="3" fill="#D4AF37" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#sundaBatikPattern)" />
    </svg>
  </div>
);

// =========================================================================
// FALLING MELATI PETALS & GOLDEN STARDUST
// =========================================================================
export const FallingMelatiPetals: React.FC = () => {
  const petals = [
    { left: '8%', delay: '0s', duration: '12s', size: 12, rot: '20deg' },
    { left: '22%', delay: '3s', duration: '15s', size: 14, rot: '-30deg' },
    { left: '36%', delay: '1s', duration: '13s', size: 10, rot: '45deg' },
    { left: '52%', delay: '5s', duration: '17s', size: 13, rot: '-15deg' },
    { left: '68%', delay: '2.2s', duration: '14s', size: 11, rot: '60deg' },
    { left: '82%', delay: '4.5s', duration: '16s', size: 15, rot: '-35deg' },
    { left: '92%', delay: '0.5s', duration: '11s', size: 12, rot: '25deg' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-25">
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute -top-6 animate-melati-fall opacity-70"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            animationIterationCount: 'infinite',
            animationTimingFunction: 'linear',
          }}
        >
          {/* Jasmine bud / petal SVG */}
          <svg
            width={p.size}
            height={p.size * 1.3}
            viewBox="0 0 20 26"
            fill="none"
            style={{ transform: `rotate(${p.rot})` }}
          >
            <circle cx="10" cy="12" r="7" fill="#FFFFFF" stroke="#DFE8E2" strokeWidth="0.8" />
            <path d="M10 2 C12 6, 14 10, 10 18 C6 10, 8 6, 10 2Z" fill="#F5F9F6" />
            <circle cx="10" cy="12" r="2.5" fill="#FFF1BA" />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes melatiFall {
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
        .animate-melati-fall {
          animation-name: melatiFall;
        }
      `}</style>
    </div>
  );
};

export const GoldenPrianganGlow: React.FC = () => {
  const sparks = [
    { top: '12%', left: '14%', size: '3px', delay: '0s', dur: '4s' },
    { top: '26%', left: '82%', size: '4px', delay: '1.5s', dur: '5s' },
    { top: '40%', left: '20%', size: '2px', delay: '2.2s', dur: '3.8s' },
    { top: '58%', left: '74%', size: '3px', delay: '0.9s', dur: '4.6s' },
    { top: '72%', left: '16%', size: '4px', delay: '3.3s', dur: '5.1s' },
    { top: '86%', left: '86%', size: '3px', delay: '1.8s', dur: '4.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {sparks.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#E5C158] opacity-45 animate-ping"
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
// SUNDA SIGER THEME COMPONENT
// =========================================================================
export interface SundaSigerThemeProps {
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

export const SundaSigerTheme: React.FC<SundaSigerThemeProps> = ({
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
      name: 'Keluarga Bpk. H. Cecep Suherman',
      status: 'Hadir',
      wishes: 'Wilujeng ngambah sagara rumah tangga kanggo cep Steven & neng Bunga. Mugi janten kulawarga anu sakinah, mawaddah, warahmah.',
      time: '1 jam yang lalu',
    },
    {
      name: 'Teh Nuraeni & Kang Asep',
      status: 'Hadir',
      wishes: 'Barakallahu lakuma wa baraka alaikuma. Mugia runtut raut sauyunan sabobot sapihanean dugi ka paketrok iteuk.',
      time: '3 jam yang lalu',
    },
    {
      name: 'Deden Prasetya',
      status: 'Hadir',
      wishes: 'Selamat menempuh hidup baru Steven & Bunga! Bahagia selalu selamanya.',
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

  const couplePhoto = couple?.cover_photo_url || couple?.cover_photo || '/photos/steven-bunga/cover-arch.jpg';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/steven-bunga/groom.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/steven-bunga/bride.jpg';

  // 70k Tier Rich Gallery (up to 6 photos)
  const displayGallery = (gallery && gallery.length >= 3) ? gallery.slice(0, 6) : [
    { image_url: couplePhoto, caption: 'Ijab Kabul & Janji Suci' },
    { image_url: groomPhoto, caption: 'Panganten Pameget' },
    { image_url: bridePhoto, caption: 'Panganten Istri Siger' },
    { image_url: '/photos/photo-1.jpg', caption: 'Prosesi Sungkeman Sakral' },
    { image_url: '/photos/photo-5.jpg', caption: 'Saweran & Huap Lingkung' },
    { image_url: '/photos/photo-7.jpg', caption: 'Kebersamaan Abadi' },
  ];

  return (
    <div className="min-h-screen bg-[#F7F9F7] text-[#1E2D24] font-sans relative selection:bg-[#D4AF37] selection:text-[#1E2D24] overflow-x-hidden">
      {/* Falling Jasmine Petals & Golden Priangan Glow */}
      <FallingMelatiPetals />
      <GoldenPrianganGlow />

      {/* =========================================================================
          LEFT PANEL (DESKTOP ONLY: Fixed 42% / 50% Panel with Photo & Guest Name)
          ========================================================================= */}
      <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#1B3326] text-white border-r border-[#D4AF37]/40">
        
        {/* Panoramic Parahyangan Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img 
            src={couplePhoto} 
            alt={`${groomName} & ${brideName}`} 
            className="w-full h-full object-cover object-center filter brightness-90 scale-105"
          />
          {/* Deep Sage & Parahyangan Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14261D] via-[#1E3A2B]/85 to-[#0F1E16]/90" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#14261D]/40 to-[#14261D]/90" />
          <SundaBatikWatermark className="opacity-[0.06]" />
        </div>

        {/* Gilded Inner Arch Frame Line */}
        <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#D4AF37]/45 pointer-events-none z-10" />

        {/* Central Content Column */}
        <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
          
          {/* TOP: Badges */}
          <div className="w-full flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183123]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Walimatul'ursy</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183123]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Sunda Siger</span>
            </div>
          </div>

          {/* CENTER: Couple Portrait & Recipient Guest Card */}
          <div className="my-auto w-full flex flex-col items-center text-center py-4">
            
            {/* Arched Couple Photo Frame with Siger Arch Crown */}
            <div className="relative mb-3">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <SundaArchCrown size={195} />
              </div>
              <div className="relative mx-auto w-40 h-52 xl:w-48 xl:h-60 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] group">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                  <img 
                    src={couplePhoto} 
                    alt={`${groomName} & ${brideName}`}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14261D]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-1 text-[#FFF1BA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                THE WEDDING CELEBRATION OF
              </p>
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            </div>

            {/* Couple Names */}
            <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#F5D77F] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              {groomName} <span className="text-xl xl:text-2xl text-[#D4AF37] font-light italic font-serif">&amp;</span> {brideName}
            </h1>

            <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3" />

            {/* Recipient Guest Card */}
            <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#254634]/90 via-[#183123]/95 to-[#0E1E15]/98 backdrop-blur-md border border-[#D4AF37]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.25)] mb-3">
              <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />
              
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold mb-0.5 text-center">
                Kepada Yth. Bapak/Ibu/Saudara/i :
              </p>
              
              <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                {guestName}
              </h2>
              
              <p className="text-[9.5px] tracking-wider text-[#DFE8E2] text-center font-sans mt-0.5">
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
                <div key={idx} className="p-2 rounded-xl bg-gradient-to-b from-[#254634]/75 to-[#14261D]/85 backdrop-blur-md border border-[#D4AF37]/45 shadow-md">
                  <span className="block text-lg xl:text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-[#DFE8E2] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* BOTTOM: Venue Info */}
          <div className="w-full flex items-center justify-between text-xs text-[#DFE8E2] border-t border-[#D4AF37]/35 pt-3">
            <span className="font-serif tracking-wide text-[#F9E5BA] flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Bale Sawala Parahyangan
            </span>
            <span className="font-sans text-[#FFF8E7]">Bandung, Jawa Barat</span>
          </div>

        </div>

      </aside>

      {/* =========================================================================
          RIGHT PANEL (Scrollable Main Invitation Content on Desktop)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 bg-[#F7F9F7] pb-24 shadow-2xl lg:border-l lg:border-[#D4AF37]/35">
        <div className="relative w-full min-h-screen">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
        ========================================================================= */}
        <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#F7F9F7] border-b border-[#D4AF37]/40 overflow-hidden">
          {/* Subtle Ambient Sage Radial Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22)_0%,rgba(247,249,247,0.98)_70%)]" />

          {/* 4 Corner Sunda Filigree & Melati Clusters */}
          <div className="absolute top-0 left-0"><SundaFloralCornerCluster position="top-left" size={96} /></div>
          <div className="absolute top-0 right-0"><SundaFloralCornerCluster position="top-right" size={96} /></div>
          <div className="absolute bottom-0 left-0"><SundaFloralCornerCluster position="bottom-left" size={96} /></div>
          <div className="absolute bottom-0 right-0"><SundaFloralCornerCluster position="bottom-right" size={96} /></div>

          {/* Top Headline */}
          <ScrollReveal animation="fade-down" delay={100} className="relative z-10 pt-4 max-w-md mx-auto w-full">
            <span className="text-[10px] sm:text-xs tracking-[0.34em] uppercase text-[#2D4638] font-serif font-bold">
              WALIMATUL'URSY ADAT SUNDA
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1E2D24] mt-2">
              {groomName} <span className="font-light italic text-[#D4AF37]">&amp;</span> {brideName}
            </h1>
            <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#586E60] mt-1.5 font-medium">
              {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          {/* Arched Couple Photo Window with Siger Crown */}
          <ScrollReveal animation="zoom-in" delay={200} className="relative z-10 my-auto py-4 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                <SundaArchCrown size={195} />
              </div>
              <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-t-[110px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] shadow-[0_14px_35px_rgba(45,70,56,0.25)]">
                <div className="w-full h-full rounded-t-[104px] rounded-b-xl overflow-hidden relative">
                  <img
                    src={couplePhoto}
                    alt={`${groomName} & ${brideName}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/95 border border-[#D4AF37]/50 shadow-xs">
              <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#2D4638] font-bold">
                Sunda Siger Parahyangan
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info */}
          <ScrollReveal animation="fade-up" delay={300} className="relative z-10 w-full flex flex-col items-center pb-4">
            <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#D4AF37]/40 shadow-xs mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#586E60] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-[#2D4638] block truncate">
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
                <div key={idx} className="bg-white rounded-xl p-2 border border-[#D4AF37]/40 text-center shadow-xs">
                  <span className="block font-serif text-base sm:text-lg font-bold text-[#2D4638]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-sans tracking-wider uppercase text-[#586E60]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('mempelai')}
              className="mt-4 flex flex-col items-center gap-1 text-[#2D4638] opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-[9px] tracking-widest uppercase font-serif font-semibold">GULIR KA HANDAP</span>
              <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
            </button>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            SECTION 2: MEMPELAI (COUPLE PROFILES)
        ========================================================================= */}
        <section id="mempelai" className="relative p-6 sm:p-10 bg-white border-b border-[#D4AF37]/35 overflow-hidden">
          {/* Subtle Priangan Batik Watermark Texture */}
          <SundaBatikWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              {/* Bismillah Calligraphy */}
              <div className="mb-2 select-none">
                <p className="font-serif text-xl sm:text-2xl text-[#2D4638] tracking-widest leading-relaxed opacity-90" dir="rtl" style={{ fontFamily: "'Traditional Arabic', 'Scheherazade New', 'Amiri', serif" }}>
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <div className="w-16 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-1" />
              </div>

              {/* Sampurasun & Salam Pembuka */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F9F7] text-[#2D4638] text-[10.5px] font-serif font-bold tracking-[0.2em] uppercase border border-[#D4AF37]/40 mb-2.5">
                <Crown className="w-3 h-3 text-[#D4AF37]" />
                <span>Sampurasun • Assalamu'alaikum Wr. Wb.</span>
              </div>

              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold block">
                PANGANTEN PAMEGET &amp; ISTRI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
                Kedua Mempelai
              </h2>
              <SundaBatikDivider />
              
              {/* Sundanese Blessing Quote & Quran Ayat */}
              <p className="text-xs sm:text-sm text-[#3E5245] leading-relaxed max-w-md mx-auto italic font-serif">
                "Mugia Gusti Nu Maha Suci salawasna maparin karahayuan, kabagjaan, sareng ngaraketkeun tali asih dina ngambah sagara rumah tangga."
                <br />
                <span className="text-[11px] not-italic font-sans font-semibold text-[#2D4638] mt-1.5 block">
                  (QS. Ar-Rum: 21)
                </span>
              </p>
            </ScrollReveal>

            {/* Groom & Bride Cards */}
            <div className="mt-8 space-y-8">
              {/* Groom Profile */}
              <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  {/* Sunda Arch Crown Accent for Groom */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <SundaSigerCrown size={32} />
                  </div>
                  <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-[90px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] shadow-[0_8px_25px_rgba(45,70,56,0.2)]">
                    <img
                      src={groomPhoto}
                      alt={groomName}
                      className="w-full h-full object-cover object-center rounded-t-[86px] rounded-b-xl"
                    />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2D24]">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#3E5245] mt-1 max-w-xs">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <a
                    href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F9F7] text-[#2D4638] border border-[#D4AF37]/50 text-[11px] font-medium hover:bg-[#EAF0EB] transition-colors"
                  >
                    <InstagramIcon size={13} />
                    <span>@{groomInstagram.replace('@', '')}</span>
                  </a>
                )}
              </ScrollReveal>

              {/* Ampersand Botanical Bridge with Melati */}
              <div className="flex items-center justify-center my-2">
                <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
                <div className="mx-3 w-9 h-9 rounded-full bg-[#F7F9F7] border border-[#D4AF37] flex items-center justify-center shadow-xs">
                  <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]/30" />
                </div>
                <div className="w-12 h-[1px] bg-[#D4AF37]/60" />
              </div>

              {/* Bride Profile */}
              <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center">
                <div className="relative mb-3">
                  {/* Sunda Arch Crown Accent for Bride */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                    <SundaSigerCrown size={32} />
                  </div>
                  <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-[90px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] shadow-[0_8px_25px_rgba(45,70,56,0.2)]">
                    <img
                      src={bridePhoto}
                      alt={brideName}
                      className="w-full h-full object-cover object-center rounded-t-[86px] rounded-b-xl"
                    />
                  </div>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2D24]">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#3E5245] mt-1 max-w-xs">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <a
                    href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F9F7] text-[#2D4638] border border-[#D4AF37]/50 text-[11px] font-medium hover:bg-[#EAF0EB] transition-colors"
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
            SECTION 3: KISAH CINTA & PROSESI ADAT (LOVE STORY & ADAT TRADITION)
        ========================================================================= */}
        <section id="cerita" className="relative p-6 sm:p-10 bg-[#F7F9F7] border-b border-[#D4AF37]/35 overflow-hidden">
          {/* Subtle Priangan Batik Watermark Texture */}
          <SundaBatikWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                LALAMPAHAN ASIH &amp; ADAT PARAHYANGAN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
                Kisah &amp; Upacara Adat
              </h2>
              <SundaBatikDivider />

              {/* Tab Switcher: Prosesi Adat Sunda vs Kisah Cinta */}
              <div className="flex items-center justify-center gap-1.5 p-1 rounded-full bg-white/90 border border-[#D4AF37]/45 max-w-xs mx-auto shadow-xs my-4">
                <button
                  type="button"
                  onClick={() => setAdatTab('upacara')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-serif font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    adatTab === 'upacara'
                      ? 'bg-[#2D4638] text-[#FFF1BA] shadow-xs scale-102 border border-[#D4AF37]/50'
                      : 'text-[#586E60] hover:text-[#2D4638]'
                  }`}
                >
                  Prosesi Adat
                </button>
                <button
                  type="button"
                  onClick={() => setAdatTab('cerita')}
                  className={`flex-1 py-1.5 px-3 rounded-full text-[11px] font-serif font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    adatTab === 'cerita'
                      ? 'bg-[#2D4638] text-[#FFF1BA] shadow-xs scale-102 border border-[#D4AF37]/50'
                      : 'text-[#586E60] hover:text-[#2D4638]'
                  }`}
                >
                  Kisah Cinta
                </button>
              </div>
            </ScrollReveal>

            {/* TAB CONTENT 1: RUNTUYAN 5 UPACARA ADAT SUNDA (70K SIGNATURE) */}
            {adatTab === 'upacara' && (
              <div className="mt-6 space-y-4">
                {[
                  {
                    step: 'I',
                    title: 'Ngeuyeuk Seureuh',
                    sub: 'Nampi Wejangan & Pidu\'a ti Sepuh',
                    meaning: 'Ritual sakral wengi sateuacan akad nikah. Calon panganten nampi pituah sepuh bari ngaropea seureuh, mayang jambe, jeung benang bodas minangka pralambang kasaluyuan sarta bekel ngawangun kulawarga.',
                    symbol: 'Daun Seureuh, Mayang Pinang, Benang Bodas',
                  },
                  {
                    step: 'II',
                    title: 'Siraman & Nincak Endog',
                    sub: 'Pembersihan Lahir Batin & Kasatiaan',
                    meaning: 'Dibersihan ku cai kembang 7 rupa pikeun ngaleungitkeun rereged sateuacan ijab kabul. Disusul ku nincak endog jeung dikumbah sampean ku panganten istri minangka tanda bakti jeung kasatiaan.',
                    symbol: 'Cai Kembang 7 Rupa, Endog Hayam Kampung',
                  },
                  {
                    step: 'III',
                    title: 'Saweran Panganten',
                    sub: 'Mipir Rezeki & Bagja Babarengan',
                    meaning: 'Taburan beas koneng, duit kencring, permen, jeung kunyit dipirig ku tembang kidung sawer pituah sepuh. Lambang rezeki nu ngocor, kabagjaan amis pait kahirupan, sarta sumanget tutulung ka sasama.',
                    symbol: 'Beas Koneng, Duit Renceh, Kunyit & Permen',
                  },
                  {
                    step: 'IV',
                    title: 'Meuleum Harupat & Nincak Elekan',
                    sub: 'Ngadalikeun Nafsu & Kawijaksanaan',
                    meaning: 'Panganten pameget nyeungeut tujuh tangkal lidi harupat tuluy dipareuman ku panganten istri. Perlambang salaki jeung pamajikan kudu pinter silih tiiskeun amarah sarta bijak dina nyanghareupan cocobi.',
                    symbol: 'Tujuh Tangkal Harupat, Kendi Cai',
                  },
                  {
                    step: 'V',
                    title: 'Huap Lingkung & Pabetot Bakakak',
                    sub: 'Silih Asih & Rezeki Sasarengan',
                    meaning: 'Sepuh duanana nyuapan tumpeng kuning minangka tanda panungtung asih ka budak. Dituluykeun silih betot bakakak hayam; sing saha wae nu meunang bagian gede kudu leuwih getol nyiar rezeki pikeun duaan.',
                    symbol: 'Bakakak Hayam Kampung, Tumpeng Kuning',
                  },
                ].map((item, idx) => (
                  <ScrollReveal key={idx} animation="fade-up" delay={idx * 80} className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs hover:shadow-md transition-all">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#2D4638] text-[#FFF1BA] shrink-0 flex items-center justify-center font-serif font-bold text-xs shadow-xs border border-[#D4AF37]/40">
                        {item.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-1 mb-0.5">
                          <h4 className="font-serif text-base font-bold text-[#1E2D24]">
                            {item.title}
                          </h4>
                          <span className="text-[9.5px] uppercase tracking-wider text-[#D4AF37] font-serif font-semibold">
                            Adat Sunda
                          </span>
                        </div>
                        <p className="text-[11px] font-serif text-[#2D4638] font-semibold italic mb-1.5">
                          {item.sub}
                        </p>
                        <p className="text-xs text-[#3E5245] leading-relaxed mb-2.5">
                          {item.meaning}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F9F7] text-[10px] text-[#586E60] font-sans border border-[#D4AF37]/30">
                          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
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
                <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-[#D4AF37]/50" />
                <div className="space-y-6">
                  {(stories && stories.length > 0 ? stories : [
                    {
                      year: '2021',
                      title: 'Awal Patepang',
                      content: 'Takdir ti Gusti Nu Maha Suci ngahijikeun jalan hirup urang duaan. Tina silaturahmi basajan, mekar rasa asih anu tulus dina ati.',
                    },
                    {
                      year: '2024',
                      title: 'Ngeuyeuk Seureuh & Lamaran',
                      content: 'Kalayan restu ti sepuh, urang duaan ngayakeun raraketan tali wargi, nyaluyukeun tekad pikeun ngambah kahirupan babarengan.',
                    },
                    {
                      year: '2026',
                      title: 'Mungkas Jangji Suci',
                      content: 'Dina dinten anu mulya ieu, urang duaan ngucapkeun ijab kabul dipirig ku alunan kecapi suling sareng ronce melati suci.',
                    },
                  ]).map((item, idx) => (
                    <ScrollReveal key={idx} animation="fade-up" delay={idx * 120} className="relative pl-14">
                      <div className="absolute left-3.5 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-[#2D4638] text-[#D4AF37] border-2 border-white flex items-center justify-center shadow-xs">
                        <Heart className="w-3 h-3 fill-[#D4AF37]" />
                      </div>
                      <div className="p-4 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F7F9F7] text-[#2D4638] text-[10px] font-bold tracking-wider font-serif mb-1 border border-[#D4AF37]/30">
                          {item.year || '2026'}
                        </span>
                        <h4 className="font-serif text-base font-bold text-[#1E2D24]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#3E5245] leading-relaxed mt-1">
                          {item.content || item.description}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            )}

            {/* SUNDANESE PARIBASA & DOA PANGANTEN BANNER */}
            <ScrollReveal animation="fade-up" delay={200} className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#254634] via-[#1B3326] to-[#14261D] text-white border border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(27,51,38,0.35)] text-center relative overflow-hidden">
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#D4AF37]/15 blur-xl pointer-events-none" />
              <SundaSigerCrown size={36} className="mx-auto mb-2 opacity-95" />
              <p className="font-serif text-sm sm:text-base italic text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#FFF1BA] to-[#F5D77F] leading-relaxed max-w-md mx-auto drop-shadow-sm">
                "Ka cai jadi saleuwi, ka darat jadi salebak. Runtut raut sauyunan, sabobot sapihanean, dugi ka paketrok iteuk."
              </p>
              <div className="w-20 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-2" />
              <p className="text-[10px] text-[#DFE8E2] uppercase tracking-[0.2em] font-sans font-semibold">
                Paribasa Luhur Sunda • Kompak Seia Sekata Dugi Ka Pakétrok Ituk
              </p>
            </ScrollReveal>

          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ACARA PERNIKAHAN (EVENTS)
        ========================================================================= */}
        <section id="acara" className="relative p-6 sm:p-10 bg-white border-b border-[#D4AF37]/35 overflow-hidden">
          {/* Subtle Priangan Batik Watermark Texture */}
          <SundaBatikWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                RUNTUYAN ACARA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
                Rangkaian Acara
              </h2>
              <SundaBatikDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6">
              {(events && events.length > 0 ? events : [
                {
                  title: 'Akad Nikah',
                  date: 'Senin, 28 Desember 2026',
                  time: '08:00 - 10:00 WIB',
                  location: 'Masjid Agung Al-Mubarak Parahyangan',
                  address: 'Jl. Lembah Priangan No. 88, Bandung Barat',
                  maps_url: 'https://maps.google.com',
                },
                {
                  title: 'Resepsi & Saweran Adat',
                  date: 'Senin, 28 Desember 2026',
                  time: '11:00 - 14:00 WIB',
                  location: 'Bale Sawala Parahyangan Convention Hall',
                  address: 'Jl. R.E. Martadinata No. 120, Bandung',
                  maps_url: 'https://maps.google.com',
                },
              ]).map((evt, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} className="relative p-6 rounded-3xl bg-[#F7F9F7] border border-[#D4AF37]/45 shadow-sm text-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/40 text-[10px] font-serif uppercase tracking-[0.2em] text-[#2D4638] font-bold mb-3">
                    <Crown className="w-3 h-3 text-[#D4AF37]" />
                    <span>{evt.title}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2D24]">
                    {evt.title}
                  </h3>

                  <div className="my-4 space-y-2 text-xs sm:text-sm text-[#3E5245]">
                    <div className="flex items-center justify-center gap-2">
                      <Calendar className="w-4 h-4 text-[#D4AF37]" />
                      <span>{evt.date || 'Senin, 28 Desember 2026'}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Clock className="w-4 h-4 text-[#D4AF37]" />
                      <span>{evt.time || '09:00 WIB - Selesai'}</span>
                    </div>
                    <div className="flex items-start justify-center gap-2 pt-1">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div className="text-left max-w-xs">
                        <strong className="block font-serif text-[#1E2D24]">{evt.location}</strong>
                        <span className="text-[11px] text-[#586E60] leading-tight block mt-0.5">{evt.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <a
                      href={evt.maps_url || 'https://maps.google.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2D4638] text-[#FFF1BA] text-xs font-serif font-bold tracking-wider hover:bg-[#1E3326] shadow-sm transition-all border border-[#D4AF37]/40"
                    >
                      <MapPin className="w-3.5 h-3.5" />
                      <span>PUDIKEUN LOKASI</span>
                    </a>

                    <a
                      href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title + ' - ' + groomName + ' & ' + brideName)}&details=${encodeURIComponent('Pernikahan Adat Sunda ' + groomName + ' & ' + brideName + ' di ' + evt.location)}&location=${encodeURIComponent(evt.address || '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#2D4638] border border-[#D4AF37]/50 text-xs font-serif font-semibold tracking-wider hover:bg-[#EAF0EB] transition-all"
                    >
                      <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>CATET TANGGAL</span>
                    </a>
                  </div>
                </ScrollReveal>
              ))}

              {/* PANDUAN BUSANA / DRESS CODE TAMU */}
              <ScrollReveal animation="fade-up" delay={200} className="p-6 rounded-3xl bg-[#F7F9F7] border border-[#D4AF37]/45 shadow-xs text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D4AF37]/40 text-[10px] font-serif uppercase tracking-[0.2em] text-[#2D4638] font-bold mb-2">
                  <Shirt className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Panduan Busana Tamu</span>
                </div>
                <h4 className="font-serif text-lg font-bold text-[#1E2D24] mb-1">
                  Dress Code Pernikahan
                </h4>
                <p className="text-xs text-[#3E5245] max-w-sm mx-auto mb-4 leading-relaxed">
                  Demi keselarasan dan keanggunan dokumentasi prosesi adat, para tamu undangan dipersilakan mengenakan busana bernuansa:
                </p>

                {/* 4 Palette Swatches */}
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#2D4638] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#2D4638] mt-1 font-bold">Sage Green</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#8F711C] mt-1 font-bold">Gold Priangan</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#F5E6BE] border-2 border-white shadow-sm" />
                    <span className="text-[9px] font-serif text-[#7A6124] mt-1 font-bold">Champagne</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-[#FFFFFF] border-2 border-[#D4AF37]/50 shadow-sm" />
                    <span className="text-[9px] font-serif text-[#586E60] mt-1 font-bold">Ivory Melati</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#586E60] italic mt-3.5">
                  Pria: Batik Lengan Panjang / Kemeja Formal • Wanita: Kebaya / Gaun Santun
                </p>
              </ScrollReveal>

              {/* SIARAN LANGSUNG (LIVE STREAMING) */}
              <ScrollReveal animation="fade-up" delay={250} className="p-6 rounded-3xl bg-gradient-to-br from-[#254634] to-[#14261D] text-white border border-[#D4AF37]/60 shadow-[0_12px_35px_rgba(27,51,38,0.35)] text-center relative overflow-hidden">
                <div className="absolute top-3.5 right-4 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600/90 text-white text-[9px] font-bold uppercase tracking-wider animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  LIVE VIRTUAL
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 border border-[#D4AF37]/50 flex items-center justify-center mx-auto mb-2 text-[#FFF1BA]">
                  <Video className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-[#FFF1BA]">
                  Siaran Langsung Akad Nikah
                </h4>
                <p className="text-xs text-[#DFE8E2] max-w-sm mx-auto mt-1 mb-4 leading-relaxed">
                  Bagi sanak keluarga dan kerabat yang berhalangan hadir secara langsung di lokasi, kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan prosesi sakral melalui siaran virtual.
                </p>
                <a
                  href="https://youtube.com/live"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#FFF1BA] to-[#E5C158] hover:opacity-95 text-[#1E2D24] text-xs font-serif font-bold tracking-wider transition-all shadow-md active:scale-95"
                >
                  <Video className="w-4 h-4 text-[#1E2D24]" />
                  <span>GABUNG SIARAN YOUTUBE LIVE</span>
                </a>
              </ScrollReveal>

            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: GALERI FOTO ADAT (UP TO 6 PHOTOS - 70K TIER)
        ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 bg-[#F7F9F7] border-b border-[#D4AF37]/35 overflow-hidden">
          <SundaBatikWatermark />

          <div className="max-w-2xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                GALERI PANGANTEN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
                Galeri Foto Adat Sunda
              </h2>
              <SundaBatikDivider />
              <p className="text-xs text-[#3E5245] max-w-xs mx-auto">
                Dokumentasi kabagjaan urang duaan dina raraga ngambah dinten anu pinuh ku kaberkahan.
              </p>
            </ScrollReveal>

            {/* 6 Photos Grid (70k Tier Richer Gallery) */}
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
                    className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden p-1 bg-white border border-[#D4AF37]/45 shadow-xs group-hover:shadow-md transition-all group-hover:scale-[1.02]"
                  >
                    <div className="w-full h-full rounded-xl overflow-hidden relative">
                      <img
                        src={img.image_url}
                        alt={img.caption || `Foto Galeri ${idx + 1}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#2D4638]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[#FFF1BA] text-[11px] font-serif font-bold bg-[#1B3326]/85 px-3 py-1 rounded-full backdrop-blur-xs border border-[#D4AF37]/40">
                          Tingali Foto
                        </span>
                      </div>
                    </div>
                  </div>
                  {img.caption && (
                    <p className="text-center text-[10px] font-serif text-[#586E60] mt-1 italic truncate">
                      {img.caption}
                    </p>
                  )}
                </ScrollReveal>
              ))}
            </div>

            {/* Modal Zoom Preview (Portaled to document.body so it floats cleanly over all sections & desktop panels) */}
            {selectedImage && typeof document !== 'undefined' && createPortal(
              <div
                onClick={() => setSelectedImage(null)}
                className="fixed inset-0 z-[99999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
                style={{ isolation: 'isolate' }}
              >
                <div 
                  className="relative max-w-xl w-full max-h-[90vh] rounded-2xl overflow-hidden p-2 sm:p-3 bg-gradient-to-b from-[#FFF2D6] via-[#D4AF37] to-[#1E3A2B] shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-[#D4AF37] flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative w-full h-full max-h-[82vh] rounded-xl overflow-hidden bg-black/40 flex items-center justify-center">
                    <img
                      src={selectedImage}
                      alt="Preview Foto Galeri"
                      className="w-full h-full object-contain max-h-[80vh] rounded-lg select-none"
                    />
                  </div>

                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-black/75 hover:bg-[#1E3A2B] text-[#FFF2D6] hover:text-white border border-[#D4AF37]/70 flex items-center justify-center font-bold text-base transition-colors shadow-lg z-30 cursor-pointer"
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
            SECTION 6: AMPLOP DIGITAL & KADO
        ========================================================================= */}
        <section id="hadiah" className="relative p-6 sm:p-10 bg-white border-b border-[#D4AF37]/35 overflow-hidden">
          <SundaBatikWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                TANDA TRESNA &amp; KADO
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
                Amplop Digital &amp; Kado
              </h2>
              <SundaBatikDivider />
              <p className="text-xs text-[#3E5245] max-w-md mx-auto leading-relaxed">
                Kacida bingahna upami para wargi sadaya tiasa rawuh sareng maparin pidu'a. Nanging saupami bade masihan tanda tresna, tiasa ngalangkungan:
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
                  className="relative p-5 rounded-2xl bg-[#F7F9F7] border border-[#D4AF37]/45 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[#2D4638] border border-[#D4AF37]/40 text-[10px] font-bold tracking-wider mb-1">
                      {gift.bank_name || 'BANK'}
                    </div>
                    <div className="font-mono text-base sm:text-lg font-bold text-[#1E2D24] tracking-wider">
                      {gift.account_number}
                    </div>
                    <div className="text-xs text-[#586E60]">
                      a.n. {gift.account_name}
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(gift.account_number, gift.account_number)}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#2D4638] text-[#FFF1BA] text-xs font-serif font-bold tracking-wider hover:bg-[#1E3326] transition-all cursor-pointer shadow-xs border border-[#D4AF37]/30"
                  >
                    {copiedAccount === gift.account_number ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#FFF1BA]" />
                        <span>TERSALIN!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>SALIN NOMOR</span>
                      </>
                    )}
                  </button>
                </ScrollReveal>
              ))}

              {/* Gift Delivery Address */}
              <ScrollReveal animation="fade-up" delay={250} className="p-5 rounded-2xl bg-[#F7F9F7] border border-[#D4AF37]/45 shadow-xs">
                <div className="flex items-center gap-2 mb-2 text-[#2D4638]">
                  <Gift className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-serif text-sm font-bold">Kintun Kado Fisik</span>
                </div>
                <p className="text-xs text-[#3E5245] leading-relaxed">
                  Penerima: <strong>{groomName} &amp; {brideName}</strong>
                  <br />
                  Jl. Lembah Priangan No. 88, Ciumbuleuit, Bandung 40142
                  <br />
                  No. HP: 0857-0790-9415
                </p>
                <button
                  onClick={() => copyToClipboard('Steven & Bunga - Jl. Lembah Priangan No. 88, Ciumbuleuit, Bandung 40142 (HP: 0857-0790-9415)', 'address')}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#2D4638] border border-[#D4AF37]/40 text-[11px] font-semibold hover:bg-[#EAF0EB] transition-all"
                >
                  {copiedAddress ? (
                    <>
                      <Check className="w-3 h-3 text-[#2D4638]" />
                      <span>ALAMAT TERSALIN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#D4AF37]" />
                      <span>SALIN ALAMAT</span>
                    </>
                  )}
                </button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: RSVP & BUKU DOA (RSVP & WISHES)
        ========================================================================= */}
        <section id="rsvp" className="relative p-6 sm:p-10 bg-[#F7F9F7] border-b border-[#D4AF37]/35 overflow-hidden">
          <SundaBatikWatermark />

          <div className="max-w-xl mx-auto w-full relative z-10">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
              KONFIRMASI &amp; UNTAIAN DU'A
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E2D24] mt-1">
              Konfirmasi Kasumpingan &amp; Doa
            </h2>
            <SundaBatikDivider />
            <p className="text-xs text-[#3E5245] max-w-xs mx-auto">
              Mugia kersa maparin konfirmasi kasumpingan sarta ngintunkeun untaian du'a restu.
            </p>
          </ScrollReveal>

          {/* RSVP Form */}
          <ScrollReveal animation="fade-up" delay={120} className="mt-8 p-6 rounded-3xl bg-white border border-[#D4AF37]/45 shadow-sm">
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E2D24] font-bold mb-1">
                  JENENGAN LENGKAP *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Conto: Bpk. H. Cecep Suherman"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F7] border border-[#D4AF37]/40 text-xs text-[#1E2D24] focus:outline-none focus:ring-2 focus:ring-[#2D4638]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E2D24] font-bold mb-1">
                  KONFIRMASI KASUMPINGAN *
                </label>
                <select
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F7] border border-[#D4AF37]/40 text-xs text-[#1E2D24] focus:outline-none focus:ring-2 focus:ring-[#2D4638]/40"
                >
                  <option value="hadir">Bale Kasumpingan (Bakal Sumping)</option>
                  <option value="ragu">Rangu-rangu (Teu Acan Tangtos)</option>
                  <option value="tidak_hadir">Hapunten Teu Tiasa Sumping</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E2D24] font-bold mb-1">
                  JUMLAH UNDANGAN ANU SUMPING
                </label>
                <select
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F7] border border-[#D4AF37]/40 text-xs text-[#1E2D24] focus:outline-none focus:ring-2 focus:ring-[#2D4638]/40"
                >
                  <option value="1">1 Jalmi</option>
                  <option value="2">2 Jalmi</option>
                  <option value="3">3 Jalmi</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#1E2D24] font-bold mb-1">
                  UNTAIAN DU'A &amp; PANGDU'A *
                </label>
                <textarea
                  required
                  rows={3}
                  value={rsvpWishes}
                  onChange={(e) => setRsvpWishes(e.target.value)}
                  placeholder="Seratkeun du'a pangharepan anu sae kanggo kadua mempelai..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#F7F9F7] border border-[#D4AF37]/40 text-xs text-[#1E2D24] focus:outline-none focus:ring-2 focus:ring-[#2D4638]/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#2D4638] text-[#FFF1BA] text-xs font-serif font-bold uppercase tracking-widest hover:bg-[#1E3326] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40"
              >
                <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>KINTUN KONFIRMASI &amp; DU'A</span>
              </button>

              {rsvpSubmitted && (
                <div className="p-3 rounded-xl bg-[#EAF5EC] border border-[#89C593] text-center text-xs text-[#1B4D24] font-medium">
                  ✓ Hatur nuhun! Konfirmasi kasumpingan sareng untaian du'a parantos katampi kalayan sae.
                </div>
              )}
            </form>
          </ScrollReveal>

          {/* Wishes List */}
          <div className="mt-8 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#1E2D24] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Untaian Du'a Para Wargi ({wishesList.length})</span>
            </h4>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {wishesList.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#D4AF37]/35 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-xs font-bold text-[#1E2D24]">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F7F9F7] text-[#2D4638] font-medium border border-[#D4AF37]/30">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#3E5245] leading-relaxed">
                    {item.wishes}
                  </p>
                  <span className="text-[9px] text-[#586E60] mt-1 block">
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
        <footer className="relative p-8 text-center bg-[#F7F9F7] border-t border-[#D4AF37]/50 overflow-hidden pb-24">
          <ScrollReveal animation="fade-up" className="max-w-md mx-auto">
            <SundaSigerCrown size={38} className="mx-auto mb-2 opacity-85" />
            <p className="text-xs text-[#3E5245] italic font-serif leading-relaxed">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E2D24] mt-3">
              {groomName} &amp; {brideName}
            </h3>

            {/* 70k Heritage Tier Branding */}
            <div className="mt-6 pt-5 border-t border-[#D4AF37]/35 flex flex-col items-center gap-1.5">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#586E60] font-semibold">
                WD DIGITAL INVITATION • PAKET HERITAGE (70K)
              </span>
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#2D4638] hover:underline font-serif font-bold"
              >
                <InstagramIcon size={13} className="text-[#D4AF37]" />
                <span>@wdgroupcompany</span>
                <ExternalLink size={11} className="text-[#D4AF37]" />
              </a>
            </div>
          </ScrollReveal>
        </footer>

        </div> {/* Close inner full-width card container */}

        {/* =========================================================================
            FLOATING PILL NAVBAR WITH SCROLLSPY (SAGE & GOLD ACCENTS)
        ========================================================================= */}
        <div className="fixed bottom-4 right-0 w-full lg:w-7/12 xl:w-1/2 flex justify-center pointer-events-none z-40 px-3">
          <nav className="pointer-events-auto w-full max-w-md bg-white/95 backdrop-blur-md rounded-full py-2 px-3 border border-[#D4AF37]/50 shadow-[0_8px_30px_rgba(45,70,56,0.22)] flex items-center justify-between">
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
                      ? 'bg-[#2D4638] text-[#FFF1BA] shadow-xs scale-105 border border-[#D4AF37]/40'
                      : 'text-[#586E60] hover:text-[#2D4638]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'stroke-[2.5] text-[#D4AF37]' : 'stroke-[1.8]'}`} />
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

export default SundaSigerTheme;
