import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, 
  ExternalLink, Bookmark, Sun
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
// TERRACOTTA BOHO CORNER FLOURISH (Bohemian Geometric Arches)
// =========================================================================
export const BohoCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 38 }) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'rotate-90',
    'bottom-right': 'rotate-180',
    'bottom-left': '-rotate-90',
  }[position];

  return (
    <div className={`pointer-events-none transform ${rotation} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 56 V24 C4 12.9543 12.9543 4 24 4 H56" stroke="#964B35" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 56 V28 C12 19.1634 19.1634 12 28 12 H56" stroke="#C47B5D" strokeWidth="1" strokeDasharray="2 3" />
        <circle cx="24" cy="24" r="3.5" fill="#964B35" />
        <circle cx="36" cy="12" r="2" fill="#DDBBAE" />
        <circle cx="12" cy="36" r="2" fill="#DDBBAE" />
        <circle cx="4" cy="56" r="2" fill="#964B35" />
        <circle cx="56" cy="4" r="2" fill="#964B35" />
      </svg>
    </div>
  );
};

// =========================================================================
// DRIED PALM FAN SPEAR (Classic Bohemian Fan Leaf)
// =========================================================================
export const BohoDriedPalmSpear: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 54,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="palmSpearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#DF9C7B" />
        <stop offset="50%" stopColor="#C47B5D" />
        <stop offset="100%" stopColor="#964B35" />
      </linearGradient>
      <linearGradient id="palmRibGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FAF5EE" />
        <stop offset="100%" stopColor="#DDBBAE" />
      </linearGradient>
    </defs>
    {/* Stem */}
    <path d="M40 70 L40 118" stroke="#964B35" strokeWidth="3" strokeLinecap="round" />
    {/* Fan leaf spear blades */}
    <path d="M40 10 L40 70" stroke="url(#palmRibGrad)" strokeWidth="2.5" />
    <path d="M26 18 Q33 45 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.8" />
    <path d="M54 18 Q47 45 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.8" />
    <path d="M15 32 Q28 52 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.5" />
    <path d="M65 32 Q52 52 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.5" />
    <path d="M8 50 Q24 60 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.2" />
    <path d="M72 50 Q56 60 40 70" stroke="url(#palmRibGrad)" strokeWidth="1.2" />
    {/* Spear contour */}
    <path
      d="M40 8 L48 20 L57 16 L61 30 L70 28 L72 45 L78 48 L70 65 L40 75 L10 65 L2 48 L8 45 L10 28 L19 30 L23 16 L32 20 Z"
      fill="url(#palmSpearGrad)"
      fillOpacity="0.88"
      stroke="#7A3926"
      strokeWidth="1"
    />
  </svg>
);

// =========================================================================
// FLUFFY PAMPAS PLUME (Soft Textured Dried Boho Grass)
// =========================================================================
export const BohoPampasPlume: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 56,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 110"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <linearGradient id="pampasGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF9F5" />
        <stop offset="40%" stopColor="#F5DEC9" />
        <stop offset="80%" stopColor="#DFB9A0" />
        <stop offset="100%" stopColor="#C47B5D" />
      </linearGradient>
    </defs>
    {/* Arching stalk */}
    <path d="M30 108 Q32 60 28 8" stroke="#A3583E" strokeWidth="2" strokeLinecap="round" />
    {/* Fluffy plumes */}
    <path d="M28 12 Q20 18 14 26 Q24 24 28 22" fill="url(#pampasGrad)" />
    <path d="M29 16 Q38 22 44 30 Q35 28 29 25" fill="url(#pampasGrad)" />
    <path d="M28 26 Q16 34 10 44 Q22 40 28 36" fill="url(#pampasGrad)" />
    <path d="M29 30 Q42 38 48 48 Q37 44 29 39" fill="url(#pampasGrad)" />
    <path d="M27 42 Q14 52 8 64 Q22 58 28 52" fill="url(#pampasGrad)" />
    <path d="M29 46 Q45 56 50 68 Q38 62 29 55" fill="url(#pampasGrad)" />
    <path d="M27 60 Q16 70 12 80 Q24 74 28 68" fill="url(#pampasGrad)" />
    <path d="M29 64 Q42 74 46 84 Q36 78 29 72" fill="url(#pampasGrad)" />
  </svg>
);

// =========================================================================
// TERRACOTTA GARDEN ROSE (Rich Layered Blooming Floral)
// =========================================================================
export const BohoTerracottaRose: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 46,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none ${className}`}
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <defs>
      <radialGradient id="roseTerracottaOuter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#DF9C7B" />
        <stop offset="65%" stopColor="#BA654C" />
        <stop offset="100%" stopColor="#964B35" />
      </radialGradient>
      <radialGradient id="roseTerracottaCore" cx="45%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#FFF4ED" />
        <stop offset="40%" stopColor="#F5DEC9" />
        <stop offset="80%" stopColor="#BA654C" />
        <stop offset="100%" stopColor="#7A3926" />
      </radialGradient>
      <filter id="bohoRoseShadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#7A3926" floodOpacity="0.25" />
      </filter>
    </defs>

    {/* Outer Petals Layer */}
    <g filter="url(#bohoRoseShadow)">
      <path d="M50 8 Q65 14 74 28 Q58 35 50 25 Q42 35 26 28 Q35 14 50 8Z" fill="url(#roseTerracottaOuter)" stroke="#7A3926" strokeWidth="0.8" />
      <path d="M84 32 Q94 48 88 64 Q74 56 70 46 Q76 38 84 32Z" fill="url(#roseTerracottaOuter)" stroke="#7A3926" strokeWidth="0.8" />
      <path d="M78 68 Q68 88 48 92 Q46 76 56 68 Q68 66 78 68Z" fill="url(#roseTerracottaOuter)" stroke="#7A3926" strokeWidth="0.8" />
      <path d="M42 92 Q22 86 16 68 Q28 64 36 70 Q44 76 42 92Z" fill="url(#roseTerracottaOuter)" stroke="#7A3926" strokeWidth="0.8" />
      <path d="M14 62 Q6 45 18 30 Q26 38 30 48 Q22 56 14 62Z" fill="url(#roseTerracottaOuter)" stroke="#7A3926" strokeWidth="0.8" />
    </g>

    {/* Mid Petals Spiral */}
    <path d="M50 24 C62 24 72 32 72 44 C72 58 60 68 48 68 C34 68 26 56 26 44 C26 30 38 24 50 24Z" fill="url(#roseTerracottaOuter)" stroke="#6A2E1F" strokeWidth="1" />
    <path d="M36 34 Q50 30 62 38 Q56 50 42 50 Q34 44 36 34Z" fill="#C47B5D" stroke="#7A3926" strokeWidth="0.8" />
    <path d="M62 42 Q66 54 54 62 Q44 58 50 48 Q56 46 62 42Z" fill="#C47B5D" stroke="#7A3926" strokeWidth="0.8" />

    {/* Center Core Petals */}
    <circle cx="48" cy="48" r="14" fill="url(#roseTerracottaCore)" stroke="#6A2E1F" strokeWidth="1" />
    <path d="M44 43 Q52 40 54 48 Q48 54 42 50 Q40 45 44 43Z" fill="#FFF4ED" stroke="#964B35" strokeWidth="0.7" />
  </svg>
);

// =========================================================================
// BOHO FLORAL CORNER CLUSTER (Dried Palm Spear, Pampas & Terracotta Rose)
// =========================================================================
export const BohoFloralCornerCluster: React.FC<{
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
        {/* Fan Palm Spear background */}
        <div className="absolute -top-3 -left-3 opacity-90">
          <BohoDriedPalmSpear size={size * 0.75} rotation={-15} />
        </div>
        {/* Soft Fluffy Pampas plumes */}
        <div className="absolute top-2 left-6 opacity-85">
          <BohoPampasPlume size={size * 0.72} rotation={35} />
        </div>
        <div className="absolute top-6 left-1 opacity-80">
          <BohoPampasPlume size={size * 0.65} rotation={-45} />
        </div>
        {/* Center Terracotta Rose */}
        <div className="absolute top-2 left-2 z-10 drop-shadow-md">
          <BohoTerracottaRose size={size * 0.52} rotation={15} />
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// BOHO ARCH FLORAL CROWN (Grand Dried Bouquet for Arched Window)
// =========================================================================
export const BohoArchFloralCrown: React.FC<{ className?: string; size?: number }> = ({ 
  className = '', 
  size = 200 
}) => (
  <div 
    className={`pointer-events-none flex items-center justify-center select-none ${className}`}
    style={{ width: size, height: size * 0.38 }}
  >
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Central Terracotta Rose */}
      <div className="relative z-20 drop-shadow-lg">
        <BohoTerracottaRose size={size * 0.28} rotation={0} />
      </div>

      {/* Left Rose & Pampas */}
      <div className="absolute left-[20%] top-[12%] z-15 -translate-y-1 drop-shadow-md">
        <BohoTerracottaRose size={size * 0.21} rotation={-25} />
      </div>
      <div className="absolute left-[6%] -top-[8%] z-10">
        <BohoDriedPalmSpear size={size * 0.36} rotation={-50} />
      </div>
      <div className="absolute left-[2%] top-[18%] z-5 opacity-90">
        <BohoPampasPlume size={size * 0.38} rotation={-75} />
      </div>

      {/* Right Rose & Pampas */}
      <div className="absolute right-[20%] top-[12%] z-15 -translate-y-1 drop-shadow-md">
        <BohoTerracottaRose size={size * 0.21} rotation={25} />
      </div>
      <div className="absolute right-[6%] -top-[8%] z-10">
        <BohoDriedPalmSpear size={size * 0.36} rotation={50} />
      </div>
      <div className="absolute right-[2%] top-[18%] z-5 opacity-90">
        <BohoPampasPlume size={size * 0.38} rotation={75} />
      </div>
    </div>
  </div>
);

// =========================================================================
// BOHO FLORAL DIVIDER (Bohemian Wheat & Terracotta Diamond Motif)
// =========================================================================
export const BohoFloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 opacity-85 ${className}`}>
    <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#C47B5D] to-[#964B35]" />
    <div className="flex items-center gap-1 text-[#964B35]">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#DDBBAE]" />
      <BohoTerracottaRose size={20} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#DDBBAE]" />
    </div>
    <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#C47B5D] to-[#964B35]" />
  </div>
);

// =========================================================================
// FLOATING DRIED PETALS & SUNSET DUST
// =========================================================================
export const BohoFloatingPetals: React.FC = () => {
  const petals = [
    { left: '6%', delay: '0s', duration: '13s', size: 14, rot: '25deg' },
    { left: '18%', delay: '3.5s', duration: '16s', size: 18, rot: '-35deg' },
    { left: '32%', delay: '1.2s', duration: '14s', size: 12, rot: '45deg' },
    { left: '48%', delay: '6s', duration: '18s', size: 16, rot: '-20deg' },
    { left: '62%', delay: '2.5s', duration: '15s', size: 13, rot: '60deg' },
    { left: '76%', delay: '4.8s', duration: '17s', size: 19, rot: '-40deg' },
    { left: '88%', delay: '0.8s', duration: '12s', size: 15, rot: '30deg' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-25">
      {petals.map((p, i) => (
        <div
          key={i}
          className="absolute -top-8 animate-fall opacity-65"
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
            <path
              d="M10 0 C18 6 20 18 10 26 C0 18 2 6 10 0 Z"
              fill={i % 2 === 0 ? '#C47B5D' : '#BA654C'}
              fillOpacity="0.75"
            />
          </svg>
        </div>
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.7;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) translateX(25px);
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(105vh) rotate(360deg) translateX(-20px);
            opacity: 0;
          }
        }
        .animate-fall {
          animation-name: fall;
        }
      `}</style>
    </div>
  );
};

export const BohoSunburstDust: React.FC = () => {
  const dust = [
    { top: '15%', left: '12%', size: '3px', delay: '0s', dur: '4s' },
    { top: '28%', left: '84%', size: '4px', delay: '1.2s', dur: '5s' },
    { top: '42%', left: '22%', size: '2px', delay: '2.5s', dur: '3.5s' },
    { top: '56%', left: '76%', size: '3px', delay: '0.8s', dur: '4.5s' },
    { top: '68%', left: '18%', size: '4px', delay: '3.1s', dur: '5.2s' },
    { top: '82%', left: '88%', size: '3px', delay: '1.9s', dur: '4.2s' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {dust.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#DF9C7B] opacity-40 animate-ping"
          style={{
            top: d.top,
            left: d.left,
            width: d.size,
            height: d.size,
            animationDelay: d.delay,
            animationDuration: d.dur,
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// THEME COMPONENT PROPS
// =========================================================================
export interface TerracottaBohoThemeProps {
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

// =========================================================================
// MAIN TERRACOTTA BOHO RUSTIC THEME (PAKET STARTER 50K)
// =========================================================================
export const TerracottaBohoTheme: React.FC<TerracottaBohoThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName = 'Tamu Undangan',
}) => {
  // Navigation active tab with ScrollSpy
  const [activeSection, setActiveSection] = useState('sampul');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Gallery modal zoom
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpWishes, setRsvpWishes] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [wishesList, setWishesList] = useState<Array<{ name: string; status: string; wishes: string; time: string }>>([
    {
      name: 'Rian & Sarah',
      status: 'Hadir',
      wishes: 'Selamat menempuh hidup baru! Semoga selalu bahagia, langgeng, dan penuh berkah cinta selamanya.',
      time: '1 jam yang lalu',
    },
    {
      name: 'Keluarga Budi Santoso',
      status: 'Hadir',
      wishes: 'Barakallahu lakuma wa baraka alaikuma wa jamaa bainakuma fii khoir. Sakinah mawaddah warahmah.',
      time: '3 jam yang lalu',
    },
    {
      name: 'Dinda Ayu Prameswari',
      status: 'Hadir',
      wishes: 'Happy wedding! Bahagia selalu kalian berdua sampai maut memisahkan.',
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

  // Starter tier default gallery (3 photos)
  const displayGallery = (gallery && gallery.length > 0) ? gallery.slice(0, 3) : [
    { image_url: couplePhoto, caption: 'Kisah Awal Perjumpaan' },
    { image_url: groomPhoto, caption: 'Langkah Menuju Komitmen' },
    { image_url: bridePhoto, caption: 'Janji Suci Selamanya' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF5EE] text-[#2E1D16] font-sans relative selection:bg-[#E29D84] selection:text-[#2E1D16]">
      {/* Floating Botanical & Dust Effects */}
      <BohoFloatingPetals />
      <BohoSunburstDust />

      {/* Main Single-Column Centered Wrapper (50k Starter Standard) */}
      <main className="relative max-w-xl mx-auto shadow-2xl bg-white border-x border-[#DDBBAE]/50 overflow-hidden">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
        ========================================================================= */}
        <section id="sampul" className="relative min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FAF5EE] border-b border-[#DDBBAE]/40 overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(223,156,123,0.25)_0%,rgba(250,245,238,0.98)_70%)]" />

          {/* 4 Corner Dried Botanical Clusters */}
          <div className="absolute -top-1 -left-1"><BohoFloralCornerCluster position="top-left" size={90} /></div>
          <div className="absolute -top-1 -right-1"><BohoFloralCornerCluster position="top-right" size={90} /></div>
          <div className="absolute -bottom-1 -left-1"><BohoFloralCornerCluster position="bottom-left" size={90} /></div>
          <div className="absolute -bottom-1 -right-1"><BohoFloralCornerCluster position="bottom-right" size={90} /></div>

          {/* 4 Boho Corner Filigrees */}
          <div className="absolute top-3 left-3 opacity-60"><BohoCorner position="top-left" size={28} /></div>
          <div className="absolute top-3 right-3 opacity-60"><BohoCorner position="top-right" size={28} /></div>
          <div className="absolute bottom-3 left-3 opacity-60"><BohoCorner position="bottom-left" size={28} /></div>
          <div className="absolute bottom-3 right-3 opacity-60"><BohoCorner position="bottom-right" size={28} /></div>

          {/* Top Headline */}
          <ScrollReveal animation="fade-down" delay={100} className="relative z-10 pt-4">
            <span className="text-[10px] sm:text-xs tracking-[0.32em] uppercase text-[#964B35] font-serif font-bold">
              THE WEDDING CELEBRATION OF
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2E1D16] mt-2">
              {groomName} <span className="font-light italic text-[#C47B5D]">&amp;</span> {brideName}
            </h1>
            <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#8A6B5F] mt-1.5 font-medium">
              {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          {/* Arched Couple Photo Window with Crown */}
          <ScrollReveal animation="zoom-in" delay={200} className="relative z-10 my-auto py-4 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                <BohoArchFloralCrown size={185} />
              </div>
              <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-t-[110px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FAF5EE] via-[#DDBBAE] to-[#964B35] shadow-[0_12px_35px_rgba(150,75,53,0.22)]">
                <div className="w-full h-full rounded-t-[104px] rounded-b-xl overflow-hidden relative">
                  <img
                    src={couplePhoto}
                    alt={`${groomName} & ${brideName}`}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-[#DDBBAE] shadow-xs">
              <Sun className="w-3.5 h-3.5 text-[#964B35]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#964B35] font-bold">
                Terracotta Boho Rustic
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info */}
          <ScrollReveal animation="fade-up" delay={300} className="relative z-10 w-full flex flex-col items-center pb-4">
            <div className="w-full max-w-xs p-3 rounded-2xl bg-white/90 border border-[#DDBBAE]/70 shadow-xs mb-4">
              <span className="text-[10px] uppercase tracking-widest text-[#8A6B5F] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-[#964B35] block truncate">
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
                <div key={idx} className="bg-white rounded-xl p-2 border border-[#DDBBAE] text-center shadow-xs">
                  <span className="block font-serif text-base sm:text-lg font-bold text-[#964B35]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] font-sans tracking-wider uppercase text-[#8A6B5F]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollToSection('mempelai')}
              className="mt-4 flex flex-col items-center gap-1 text-[#964B35] opacity-80 hover:opacity-100 transition-opacity"
            >
              <span className="text-[9px] tracking-widest uppercase font-serif font-semibold">GULIR KE BAWAH</span>
              <ChevronDown className="w-4 h-4 animate-bounce" />
            </button>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            SECTION 2: MEMPELAI (COUPLE PROFILES)
        ========================================================================= */}
        <section id="mempelai" className="relative p-6 sm:p-10 bg-white border-b border-[#DDBBAE]/40 overflow-hidden">
          {/* Section Heading */}
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              THE HAPPY COUPLE
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Kedua Mempelai
            </h2>
            <BohoFloralDivider />
            <p className="text-xs sm:text-sm text-[#5A3E34] leading-relaxed max-w-md mx-auto italic font-serif">
              "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya."
              <br />
              <span className="text-[11px] not-italic font-sans font-semibold text-[#964B35] mt-1 block">
                (QS. Ar-Rum: 21)
              </span>
            </p>
          </ScrollReveal>

          {/* Groom & Bride Cards */}
          <div className="mt-8 space-y-8">
            {/* Groom Profile */}
            <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-[90px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-[#FAF5EE] via-[#C47B5D] to-[#964B35] shadow-[0_8px_25px_rgba(150,75,53,0.18)]">
                  <img
                    src={groomPhoto}
                    alt={groomName}
                    className="w-full h-full object-cover object-center rounded-t-[86px] rounded-b-xl"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16]">
                {groomFullName}
              </h3>
              <p className="text-xs text-[#5A3E34] mt-1 max-w-xs">
                {groomParents}
              </p>
              {groomInstagram && (
                <a
                  href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#964B35] border border-[#DDBBAE] text-[11px] font-medium hover:bg-[#F5EBE1] transition-colors"
                >
                  <InstagramIcon size={13} />
                  <span>@{groomInstagram.replace('@', '')}</span>
                </a>
              )}
            </ScrollReveal>

            {/* Ampersand Botanical Bridge */}
            <div className="flex items-center justify-center my-2">
              <div className="w-12 h-[1px] bg-[#DDBBAE]" />
              <div className="mx-3 w-9 h-9 rounded-full bg-[#FAF5EE] border border-[#DDBBAE] flex items-center justify-center">
                <Heart className="w-4 h-4 text-[#964B35] fill-[#964B35]/20" />
              </div>
              <div className="w-12 h-[1px] bg-[#DDBBAE]" />
            </div>

            {/* Bride Profile */}
            <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center">
              <div className="relative mb-3">
                <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-t-[90px] rounded-b-2xl overflow-hidden p-1 bg-gradient-to-b from-[#FAF5EE] via-[#C47B5D] to-[#964B35] shadow-[0_8px_25px_rgba(150,75,53,0.18)]">
                  <img
                    src={bridePhoto}
                    alt={brideName}
                    className="w-full h-full object-cover object-center rounded-t-[86px] rounded-b-xl"
                  />
                </div>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16]">
                {brideFullName}
              </h3>
              <p className="text-xs text-[#5A3E34] mt-1 max-w-xs">
                {brideParents}
              </p>
              {brideInstagram && (
                <a
                  href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF5EE] text-[#964B35] border border-[#DDBBAE] text-[11px] font-medium hover:bg-[#F5EBE1] transition-colors"
                >
                  <InstagramIcon size={13} />
                  <span>@{brideInstagram.replace('@', '')}</span>
                </a>
              )}
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: KISAH CINTA (LOVE STORY)
        ========================================================================= */}
        <section id="cerita" className="relative p-6 sm:p-10 bg-[#FAF5EE] border-b border-[#DDBBAE]/40 overflow-hidden">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              OUR JOURNEY
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Kisah Perjalanan Cinta
            </h2>
            <BohoFloralDivider />
          </ScrollReveal>

          <div className="mt-8 relative">
            {/* Timeline Line */}
            <div className="absolute left-6 top-3 bottom-3 w-0.5 bg-[#DDBBAE]" />

            <div className="space-y-6">
              {(stories && stories.length > 0 ? stories : [
                {
                  year: '2021',
                  title: 'Awal Pertemuan',
                  content: 'Takdir mempertemukan kami di sebuah acara kampus. Dari percakapan sederhana tentang buku dan kopi, benih cinta mulai tumbuh perlahan.',
                },
                {
                  year: '2023',
                  title: 'Menjalin Komitmen',
                  content: 'Setelah melewati berbagai cerita dan suka duka bersama, kami memutuskan untuk saling melangkah dengan komitmen tulus menuju masa depan.',
                },
                {
                  year: '2026',
                  title: 'Menuju Pelaminan',
                  content: 'Dengan restu kedua orang tua dan rahmat Tuhan Yang Maha Esa, kami siap mengikrarkan janji suci pernikahan untuk melangkah bersama selamanya.',
                },
              ]).map((item, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 120} className="relative pl-14">
                  {/* Timeline Badge */}
                  <div className="absolute left-3.5 top-1 -translate-x-1/2 w-6 h-6 rounded-full bg-[#964B35] text-white border-2 border-white flex items-center justify-center shadow-xs">
                    <Heart className="w-3 h-3 fill-white" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white border border-[#DDBBAE]/80 shadow-xs">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF5EE] text-[#964B35] text-[10px] font-bold tracking-wider font-serif mb-1">
                      {item.year || '2026'}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#2E1D16]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5A3E34] leading-relaxed mt-1">
                      {item.content || item.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: ACARA PERNIKAHAN (EVENTS)
        ========================================================================= */}
        <section id="acara" className="relative p-6 sm:p-10 bg-white border-b border-[#DDBBAE]/40 overflow-hidden">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              WEDDING EVENTS
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Rangkaian Acara
            </h2>
            <BohoFloralDivider />
          </ScrollReveal>

          <div className="mt-8 space-y-6">
            {(events && events.length > 0 ? events : [
              {
                title: 'Akad Nikah',
                date: 'Senin, 28 Desember 2026',
                time: '08:00 - 10:00 WIB',
                location: 'Masjid Agung Al-Mubarak',
                address: 'Jl. Merdeka Barat No. 45, Kebayoran Baru, Jakarta Selatan',
                maps_url: 'https://maps.google.com',
              },
              {
                title: 'Resepsi Pernikahan',
                date: 'Senin, 28 Desember 2026',
                time: '11:00 - 14:00 WIB',
                location: 'The Bohemian Glass House Ballroom',
                address: 'Jl. Surya Kencana No. 128, Cilandak, Jakarta Selatan',
                maps_url: 'https://maps.google.com',
              },
            ]).map((evt, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} className="relative p-6 rounded-3xl bg-[#FAF5EE] border border-[#DDBBAE] shadow-sm text-center">
                {/* Event Corner Flourish */}
                <div className="absolute top-2.5 left-2.5 opacity-40"><BohoCorner position="top-left" size={24} /></div>
                <div className="absolute top-2.5 right-2.5 opacity-40"><BohoCorner position="top-right" size={24} /></div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#DDBBAE] text-[10px] font-serif uppercase tracking-[0.2em] text-[#964B35] font-bold mb-3">
                  <Sun className="w-3 h-3 text-[#964B35]" />
                  <span>{evt.title}</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16]">
                  {evt.title}
                </h3>

                <div className="my-4 space-y-2 text-xs sm:text-sm text-[#5A3E34]">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="w-4 h-4 text-[#964B35]" />
                    <span>{evt.date || 'Senin, 28 Desember 2026'}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4 text-[#964B35]" />
                    <span>{evt.time || '09:00 WIB - Selesai'}</span>
                  </div>
                  <div className="flex items-start justify-center gap-2 pt-1">
                    <MapPin className="w-4 h-4 text-[#964B35] shrink-0 mt-0.5" />
                    <div className="text-left max-w-xs">
                      <strong className="block font-serif text-[#2E1D16]">{evt.location}</strong>
                      <span className="text-[11px] text-[#8A6B5F] leading-tight block mt-0.5">{evt.address}</span>
                    </div>
                  </div>
                </div>

                {/* Event Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                  <a
                    href={evt.maps_url || 'https://maps.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#964B35] text-white text-xs font-serif font-bold tracking-wider hover:bg-[#7A3926] shadow-sm transition-all"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>PETUNJUK LOKASI</span>
                  </a>

                  <a
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title + ' - ' + groomName + ' & ' + brideName)}&details=${encodeURIComponent('Pernikahan ' + groomName + ' & ' + brideName + ' di ' + evt.location)}&location=${encodeURIComponent(evt.address || '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#964B35] border border-[#DDBBAE] text-xs font-serif font-semibold tracking-wider hover:bg-[#F5EBE1] transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>SIMPAN TANGGAL</span>
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: GALERI FOTO (3 PHOTOS - STARTER TIER)
        ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 bg-[#FAF5EE] border-b border-[#DDBBAE]/40 overflow-hidden">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              MEMORIES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Galeri Foto
            </h2>
            <BohoFloralDivider />
            <p className="text-xs text-[#5A3E34] max-w-xs mx-auto">
              Potret kebahagiaan kami dalam menyambut hari bersejarah.
            </p>
          </ScrollReveal>

          {/* 3 Photos Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {displayGallery.map((img, idx) => (
              <ScrollReveal
                key={idx}
                animation="zoom-in"
                delay={idx * 120}
                className="group relative cursor-pointer"
              >
                <div
                  onClick={() => setSelectedImage(img.image_url)}
                  className="w-full h-72 sm:h-56 rounded-2xl overflow-hidden p-1 bg-white border border-[#DDBBAE] shadow-sm group-hover:shadow-md transition-all group-hover:scale-[1.02]"
                >
                  <div className="w-full h-full rounded-xl overflow-hidden relative">
                    <img
                      src={img.image_url}
                      alt={img.caption || `Foto Galeri ${idx + 1}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-white text-xs font-serif font-bold bg-[#964B35]/85 px-3 py-1 rounded-full backdrop-blur-xs">
                        Lihat Foto
                      </span>
                    </div>
                  </div>
                </div>
                {img.caption && (
                  <p className="text-center text-[11px] font-serif text-[#8A6B5F] mt-1.5 italic">
                    {img.caption}
                  </p>
                )}
              </ScrollReveal>
            ))}
          </div>

          {/* Modal Zoom Preview */}
          {selectedImage && (
            <div
              onClick={() => setSelectedImage(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            >
              <div className="relative max-w-md w-full max-h-[85vh] rounded-2xl overflow-hidden p-2 bg-white/10 border border-white/20">
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="w-full h-full object-contain max-h-[80vh] rounded-xl"
                />
                <button
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center font-bold text-sm"
                >
                  ✕
                </button>
              </div>
            </div>
          )}
        </section>

        {/* =========================================================================
            SECTION 6: AMPLOP DIGITAL & KADO (DIGITAL ENVELOPE)
        ========================================================================= */}
        <section id="hadiah" className="relative p-6 sm:p-10 bg-white border-b border-[#DDBBAE]/40 overflow-hidden">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              WEDDING GIFT
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Amplop Digital &amp; Kado
            </h2>
            <BohoFloralDivider />
            <p className="text-xs text-[#5A3E34] max-w-md mx-auto leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat menyampaikannya melalui:
            </p>
          </ScrollReveal>

          {/* Bank Cards */}
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
                className="relative p-5 rounded-2xl bg-[#FAF5EE] border border-[#DDBBAE] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="inline-block px-2.5 py-0.5 rounded-full bg-white text-[#964B35] border border-[#DDBBAE] text-[10px] font-bold tracking-wider mb-1">
                    {gift.bank_name || 'BANK'}
                  </div>
                  <div className="font-mono text-base sm:text-lg font-bold text-[#2E1D16] tracking-wider">
                    {gift.account_number}
                  </div>
                  <div className="text-xs text-[#8A6B5F]">
                    a.n. {gift.account_name}
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(gift.account_number, gift.account_number)}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#964B35] text-white text-xs font-serif font-bold tracking-wider hover:bg-[#7A3926] transition-all cursor-pointer shadow-xs"
                >
                  {copiedAccount === gift.account_number ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>TERSALIN!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>SALIN NOMOR</span>
                    </>
                  )}
                </button>
              </ScrollReveal>
            ))}

            {/* Gift Delivery Address */}
            <ScrollReveal animation="fade-up" delay={250} className="p-5 rounded-2xl bg-[#FAF5EE] border border-[#DDBBAE] shadow-xs">
              <div className="flex items-center gap-2 mb-2 text-[#964B35]">
                <Gift className="w-4 h-4" />
                <span className="font-serif text-sm font-bold">Kirim Kado Fisik</span>
              </div>
              <p className="text-xs text-[#5A3E34] leading-relaxed">
                Penerima: <strong>{groomName} &amp; {brideName}</strong>
                <br />
                Jl. Cempaka Putih Indah No. 18, Kebayoran Baru, Jakarta Selatan 12150
                <br />
                No. HP: 0857-0790-9415
              </p>
              <button
                onClick={() => copyToClipboard('Steven & Bunga - Jl. Cempaka Putih Indah No. 18, Kebayoran Baru, Jakarta Selatan 12150 (HP: 0857-0790-9415)', 'address')}
                className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-[#964B35] border border-[#DDBBAE] text-[11px] font-semibold hover:bg-[#F5EBE1] transition-all"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3 h-3" />
                    <span>ALAMAT TERSALIN!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>SALIN ALAMAT</span>
                  </>
                )}
              </button>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: RSVP & UCAPAN (RSVP & WISHES)
        ========================================================================= */}
        <section id="rsvp" className="relative p-6 sm:p-10 bg-[#FAF5EE] border-b border-[#DDBBAE]/40 overflow-hidden">
          <ScrollReveal animation="fade-up" className="text-center">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#964B35] font-serif font-bold">
              ATTENDANCE &amp; WISHES
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2E1D16] mt-1">
              Konfirmasi Kehadiran &amp; Doa
            </h2>
            <BohoFloralDivider />
            <p className="text-xs text-[#5A3E34] max-w-xs mx-auto">
              Mohon kesediaan Anda untuk mengonfirmasi kehadiran serta memberikan untaian doa restu.
            </p>
          </ScrollReveal>

          {/* RSVP Form */}
          <ScrollReveal animation="fade-up" delay={120} className="mt-8 p-6 rounded-3xl bg-white border border-[#DDBBAE] shadow-sm">
            <form onSubmit={handleRsvpSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#2E1D16] font-bold mb-1">
                  NAMA LENGKAP *
                </label>
                <input
                  type="text"
                  required
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Contoh: Bpk. Muhammad Ilham"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#DDBBAE] text-xs text-[#2E1D16] focus:outline-none focus:ring-2 focus:ring-[#964B35]/40"
                />
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#2E1D16] font-bold mb-1">
                  KONFIRMASI KEHADIRAN *
                </label>
                <select
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#DDBBAE] text-xs text-[#2E1D16] focus:outline-none focus:ring-2 focus:ring-[#964B35]/40"
                >
                  <option value="hadir">Hadir (Saya akan hadir)</option>
                  <option value="ragu">Ragu-ragu (Belum pasti)</option>
                  <option value="tidak_hadir">Tidak Hadir (Maaf, tidak dapat hadir)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#2E1D16] font-bold mb-1">
                  JUMLAH TAMU YANG HADIR
                </label>
                <select
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#DDBBAE] text-xs text-[#2E1D16] focus:outline-none focus:ring-2 focus:ring-[#964B35]/40"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-serif uppercase tracking-wider text-[#2E1D16] font-bold mb-1">
                  UNTAIAN DOA &amp; UCAPAN SELAMAT *
                </label>
                <textarea
                  required
                  rows={3}
                  value={rsvpWishes}
                  onChange={(e) => setRsvpWishes(e.target.value)}
                  placeholder="Tuliskan ucapan selamat dan doa terbaik Anda untuk kedua mempelai..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF5EE] border border-[#DDBBAE] text-xs text-[#2E1D16] focus:outline-none focus:ring-2 focus:ring-[#964B35]/40 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#964B35] text-white text-xs font-serif font-bold uppercase tracking-widest hover:bg-[#7A3926] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>KIRIM KONFIRMASI &amp; DOA RESTU</span>
              </button>

              {rsvpSubmitted && (
                <div className="p-3 rounded-xl bg-[#F0F8F1] border border-[#A6D5AA] text-center text-xs text-[#22632A] font-medium">
                  ✓ Terima kasih! Konfirmasi kehadiran dan untaian doa Anda telah berhasil terkirim.
                </div>
              )}
            </form>
          </ScrollReveal>

          {/* Wishes List */}
          <div className="mt-8 space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#2E1D16] flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-[#964B35]" />
              <span>Untaian Doa Tamu Undangan ({wishesList.length})</span>
            </h4>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {wishesList.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-[#DDBBAE]/70 shadow-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-xs font-bold text-[#2E1D16]">{item.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF5EE] text-[#964B35] font-medium border border-[#DDBBAE]/60">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#5A3E34] leading-relaxed">
                    {item.wishes}
                  </p>
                  <span className="text-[9px] text-[#8A6B5F] mt-1 block">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: FOOTER & CLOSING (PAKET STARTER BRANDING)
        ========================================================================= */}
        <footer className="relative p-8 text-center bg-[#FAF5EE] border-t border-[#DDBBAE]/60 overflow-hidden pb-24">
          <ScrollReveal animation="fade-up" className="max-w-md mx-auto">
            <BohoTerracottaRose size={36} className="mx-auto mb-2 opacity-80" />
            <p className="text-xs text-[#5A3E34] italic font-serif leading-relaxed">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E1D16] mt-3">
              {groomName} &amp; {brideName}
            </h3>

            {/* Starter Tier Branding */}
            <div className="mt-6 pt-5 border-t border-[#DDBBAE]/40 flex flex-col items-center gap-1.5">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#8A6B5F] font-semibold">
                WD DIGITAL INVITATION • PAKET STARTER
              </span>
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#964B35] hover:underline font-serif font-bold"
              >
                <InstagramIcon size={13} />
                <span>@wdgroupcompany</span>
                <ExternalLink size={11} />
              </a>
            </div>
          </ScrollReveal>
        </footer>

        {/* =========================================================================
            OPTION A: FLOATING PILL NAVBAR WITH SCROLLSPY
        ========================================================================= */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-md bg-white/95 backdrop-blur-md rounded-full py-2 px-3 border border-[#DDBBAE] shadow-[0_8px_30px_rgba(150,75,53,0.18)] flex items-center justify-between">
          {[
            { id: 'sampul', label: 'Sampul', icon: Sun },
            { id: 'mempelai', label: 'Mempelai', icon: Heart },
            { id: 'cerita', label: 'Cerita', icon: Bookmark },
            { id: 'acara', label: 'Acara', icon: Calendar },
            { id: 'galeri', label: 'Galeri', icon: Clock },
            { id: 'hadiah', label: 'Hadiah', icon: Gift },
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
                    ? 'bg-[#964B35] text-white shadow-xs scale-105'
                    : 'text-[#8A6B5F] hover:text-[#964B35]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                <span className={`text-[8px] sm:text-[9px] font-serif tracking-wider uppercase mt-0.5 ${isActive ? 'font-bold' : 'font-normal'}`}>
                  {tab.label}
                </span>
              </button>
            );
          })}
        </nav>

      </main>
    </div>
  );
};

export default TerracottaBohoTheme;
