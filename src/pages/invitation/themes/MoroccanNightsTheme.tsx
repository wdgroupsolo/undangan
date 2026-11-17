import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, 
  ExternalLink, Bookmark, Crown, Video, Shirt, Info, Moon, Star
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
// AUTHENTIC MOROCCAN MOTIFS & ARCHITECTURAL ELEMENTS (SVG)
// =========================================================================

// 1. Royal 8-Pointed Rub el Hizb / Moroccan Zellij Star Medallion
export const MoroccanKhatimStar: React.FC<{ size?: number; color?: string; className?: string }> = ({ 
  size = 40, 
  color = '#DE9B35', 
  className = '' 
}) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 100 100" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`inline-block drop-shadow-sm ${className}`}
  >
    <defs>
      <linearGradient id="moroccanGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4D0" />
        <stop offset="35%" stopColor="#E5B54F" />
        <stop offset="70%" stopColor="#DE9B35" />
        <stop offset="100%" stopColor="#966012" />
      </linearGradient>
    </defs>
    {/* Outer 8-pointed star created by two rotated squares */}
    <rect x="20" y="20" width="60" height="60" rx="4" stroke="url(#moroccanGoldGrad)" strokeWidth="2.5" fill="rgba(222,155,53,0.12)" />
    <rect x="20" y="20" width="60" height="60" rx="4" transform="rotate(45 50 50)" stroke="url(#moroccanGoldGrad)" strokeWidth="2.5" fill="rgba(222,155,53,0.12)" />
    {/* Inner decorative octagon & floral star */}
    <circle cx="50" cy="50" r="16" stroke="url(#moroccanGoldGrad)" strokeWidth="1.8" fill="none" />
    <circle cx="50" cy="50" r="6" fill="url(#moroccanGoldGrad)" />
    {/* 8 radiating spear points */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, idx) => (
      <path 
        key={idx} 
        d="M 50 20 L 52 26 L 48 26 Z" 
        transform={`rotate(${angle} 50 50)`} 
        fill="url(#moroccanGoldGrad)" 
      />
    ))}
  </svg>
);

// 2. Hanging Moroccan Filigree Fanous Brass Lantern with Flickering Flame Glow
export const MoroccanFanousLantern: React.FC<{ 
  size?: number; 
  chainHeight?: number; 
  className?: string;
  glowColor?: string;
}> = ({ 
  size = 56, 
  chainHeight = 40, 
  className = '',
  glowColor = 'rgba(245,158,11,0.5)'
}) => (
  <div className={`relative flex flex-col items-center ${className}`}>
    {/* Hanging Chain */}
    {chainHeight > 0 && (
      <div 
        style={{ height: `${chainHeight}px` }} 
        className="w-[1.5px] bg-gradient-to-b from-[#FFF4D0]/80 via-[#DE9B35] to-[#966012]" 
      />
    )}
    {/* Lantern Body */}
    <svg 
      width={size} 
      height={size * 1.5} 
      viewBox="0 0 80 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_8px_16px_rgba(222,155,53,0.35)]"
    >
      <defs>
        <linearGradient id="fanousBrass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="30%" stopColor="#E5B54F" />
          <stop offset="70%" stopColor="#DE9B35" />
          <stop offset="100%" stopColor="#7E4F0E" />
        </linearGradient>
        <radialGradient id="lanternFlameGlow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#FFF9E0" stopOpacity="1" />
          <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.85" />
          <stop offset="70%" stopColor="#D97706" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Top Hanging Ring */}
      <circle cx="40" cy="8" r="6" stroke="url(#fanousBrass)" strokeWidth="2.5" fill="none" />
      
      {/* Onion Dome Top Spire */}
      <path d="M 40 14 C 40 14 36 22 30 26 L 50 26 C 44 22 40 14 40 14 Z" fill="url(#fanousBrass)" />
      
      {/* Upper Cap with Cutout Windows */}
      <path d="M 26 26 L 54 26 L 58 36 L 22 36 Z" fill="url(#fanousBrass)" stroke="#FFF4D0" strokeWidth="0.8" />
      <circle cx="34" cy="31" r="2" fill="#0A172E" />
      <circle cx="40" cy="31" r="2" fill="#0A172E" />
      <circle cx="46" cy="31" r="2" fill="#0A172E" />

      {/* Glass Body with Moroccan Geometric Lattice */}
      <path d="M 22 36 L 58 36 L 66 76 L 50 96 L 30 96 L 14 76 Z" fill="#0D1F3C" stroke="url(#fanousBrass)" strokeWidth="2" />
      
      {/* Inner Glowing Amber Flame */}
      <circle cx="40" cy="62" r="20" fill="url(#lanternFlameGlow)" className="animate-pulse" style={{ animationDuration: '2.5s' }} />
      <ellipse cx="40" cy="62" rx="4" ry="9" fill="#FFFBEB" className="animate-pulse" style={{ animationDuration: '1.8s' }} />

      {/* Intricate Filigree Moorish Window Frames on Glass */}
      <path d="M 40 36 L 40 96 M 22 36 L 30 96 M 58 36 L 50 96" stroke="url(#fanousBrass)" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M 14 76 L 66 76" stroke="url(#fanousBrass)" strokeWidth="1.2" />

      {/* Bottom Tapered Base & Finial */}
      <path d="M 30 96 L 50 96 L 44 108 L 36 108 Z" fill="url(#fanousBrass)" />
      <circle cx="40" cy="112" r="3.5" fill="url(#fanousBrass)" />
    </svg>
  </div>
);

// 3. Moorish Horseshoe Arch Portal Frame (Lengkung Tapal Kuda Maroko Alhambra)
export const MoroccanHorseshoeArch: React.FC<{ 
  size?: number; 
  className?: string;
  strokeColor?: string;
}> = ({ 
  size = 180, 
  className = '',
  strokeColor = '#DE9B35'
}) => (
  <svg 
    width={size} 
    height={size * 0.45} 
    viewBox="0 0 200 90" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={`pointer-events-none drop-shadow-md ${className}`}
  >
    <defs>
      <linearGradient id="horseshoeGold" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFF4D0" />
        <stop offset="50%" stopColor="#DE9B35" />
        <stop offset="100%" stopColor="#966012" />
      </linearGradient>
    </defs>
    {/* Outer Moorish Arch Keystone Peak */}
    <path 
      d="M 10 90 L 10 45 C 10 20 40 8 100 8 C 160 8 190 20 190 45 L 190 90" 
      stroke="url(#horseshoeGold)" 
      strokeWidth="3" 
      fill="none" 
    />
    {/* Inner Scalloped Cusp Trim (Multifoil Arch) */}
    <path 
      d="M 22 90 L 22 50 
         C 22 42 30 38 38 34
         C 46 30 56 26 70 22
         C 84 18 94 16 100 16
         C 106 16 116 18 130 22
         C 144 26 154 30 162 34
         C 170 38 178 42 178 50
         L 178 90" 
      stroke="url(#horseshoeGold)" 
      strokeWidth="1.5" 
      strokeDasharray="4 3" 
      fill="none" 
    />
    {/* Center Arabesque Finial Star */}
    <circle cx="100" cy="8" r="4.5" fill="url(#horseshoeGold)" />
    <path d="M 100 0 L 102 5 L 107 7 L 102 9 L 100 14 L 98 9 L 93 7 L 98 5 Z" fill="#FFF4D0" />
    {/* Side Medallion Emblems */}
    <circle cx="22" cy="48" r="3" fill="url(#horseshoeGold)" />
    <circle cx="178" cy="48" r="3" fill="url(#horseshoeGold)" />
  </svg>
);

// 4. Moroccan Corner Arabesque Cluster
export const MoroccanCornerArabesque: React.FC<{ 
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 72, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
      default: return 'none';
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: getTransform() }}
      className={`pointer-events-none drop-shadow-sm opacity-90 ${className}`}
    >
      <defs>
        <linearGradient id="cornerGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D6" />
          <stop offset="50%" stopColor="#DE9B35" />
          <stop offset="100%" stopColor="#8C5B12" />
        </linearGradient>
      </defs>
      {/* Outer corner L-border */}
      <path d="M 6 90 L 6 18 C 6 10 10 6 18 6 L 90 6" stroke="url(#cornerGoldGrad)" strokeWidth="2.5" fill="none" />
      <path d="M 14 80 L 14 24 C 14 18 18 14 24 14 L 80 14" stroke="url(#cornerGoldGrad)" strokeWidth="1" strokeDasharray="3 2" fill="none" />
      {/* Corner Floral Arabesque Scroll */}
      <path d="M 18 18 C 28 28 32 46 22 56 C 14 64 26 72 32 64 C 40 52 50 50 64 32 C 72 26 64 14 56 22 C 46 32 28 28 18 18 Z" fill="rgba(222,155,53,0.18)" stroke="url(#cornerGoldGrad)" strokeWidth="1.2" />
      <circle cx="28" cy="28" r="4" fill="url(#cornerGoldGrad)" />
      <circle cx="10" cy="10" r="2.5" fill="#FFF4D0" />
    </svg>
  );
};

// 5. Moroccan Arabesque Ornamental Divider
export const MoroccanDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 w-full max-w-xs mx-auto py-2 ${className}`}>
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#DE9B35]/70 to-[#DE9B35]" />
    <div className="flex items-center gap-1 text-[#DE9B35]">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#DE9B35]" />
      <MoroccanKhatimStar size={24} />
      <div className="w-1.5 h-1.5 rotate-45 bg-[#DE9B35]" />
    </div>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#DE9B35]/70 to-[#DE9B35]" />
  </div>
);

// 6. Moroccan Zellij Arabesque Mosaic Background Watermark
export const MoroccanZellijWatermark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.06] ${className}`}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="moroccanZellijTile" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* Central 8-pointed star */}
          <rect x="20" y="20" width="40" height="40" stroke="#FFF7D6" strokeWidth="1.2" fill="none" />
          <rect x="20" y="20" width="40" height="40" transform="rotate(45 40 40)" stroke="#FFF7D6" strokeWidth="1.2" fill="none" />
          {/* Radiating Moroccan tile lines */}
          <line x1="0" y1="40" x2="80" y2="40" stroke="#FFF7D6" strokeWidth="0.8" />
          <line x1="40" y1="0" x2="40" y2="80" stroke="#FFF7D6" strokeWidth="0.8" />
          <line x1="0" y1="0" x2="80" y2="80" stroke="#FFF7D6" strokeWidth="0.8" />
          <line x1="80" y1="0" x2="0" y2="80" stroke="#FFF7D6" strokeWidth="0.8" />
          <circle cx="40" cy="40" r="10" stroke="#FFF7D6" strokeWidth="0.8" fill="none" />
          {/* 4 corner diamonds */}
          <polygon points="0,0 8,0 0,8" fill="#FFF7D6" />
          <polygon points="80,0 72,0 80,8" fill="#FFF7D6" />
          <polygon points="0,80 8,80 0,72" fill="#FFF7D6" />
          <polygon points="80,80 72,80 80,72" fill="#FFF7D6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#moroccanZellijTile)" />
    </svg>
  </div>
);

// 7. Ambient Glowing Golden Stardust & Night Stars
export const FloatingSaharaStardust: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden select-none">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-[#FFF4D0] animate-pulse"
          style={{
            top: `${(i * 19) % 94}%`,
            left: `${(i * 27) % 92}%`,
            width: `${(i % 3) + 2}px`,
            height: `${(i % 3) + 2}px`,
            opacity: 0.25 + (i % 5) * 0.12,
            boxShadow: '0 0 8px rgba(222,155,53,0.8), 0 0 14px rgba(245,158,11,0.5)',
            animationDuration: `${2.2 + (i % 4) * 0.8}s`,
            animationDelay: `${(i * 0.35)}s`
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// MOROCCAN ARABIAN NIGHTS THEME PROPS
// =========================================================================
export interface MoroccanNightsThemeProps {
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

export const MoroccanNightsTheme: React.FC<MoroccanNightsThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName = 'Tamu Undangan',
}) => {
  const [activeSection, setActiveSection] = useState('sampul');
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
      name: 'Habib & Syarifah Zahra Al-Haddad',
      status: 'Hadir',
      wishes: 'Barakallahu laka wa baraka alaika wa jama’a bainakuma fii khair. Semoga menjadi keluarga yang senantiasa dinaungi rahmat, sakinah, mawaddah, wa rahmah.',
      time: '1 jam yang lalu',
    },
    {
      name: 'Keluarga Bpk. H. Ahmad Farhan',
      status: 'Hadir',
      wishes: 'Selamat menempuh babak baru kehidupan pernikahan. Semoga ikatan suci ini abadi hingga jannah-Nya.',
      time: '3 jam yang lalu',
    },
    {
      name: 'Fariha & Zaidan',
      status: 'Hadir',
      wishes: 'MasyaAllah tabarakallah, indah sekali temanya! Doa terbaik untuk kedua mempelai bahagia selalu selamanya.',
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

  // ScrollSpy observer for bottom navigation
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
      setActiveSection(id);
    }
  };

  const handleCopyAccount = (accNumber: string) => {
    navigator.clipboard.writeText(accNumber);
    setCopiedAccount(accNumber);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleCopyAddress = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpWishes.trim()) return;
    const newEntry = {
      name: rsvpName.trim(),
      status: rsvpStatus === 'hadir' ? 'Hadir' : rsvpStatus === 'tidak_hadir' ? 'Tidak Hadir' : 'Ragu-ragu',
      wishes: rsvpWishes.trim(),
      time: 'Baru saja',
    };
    setWishesList([newEntry, ...wishesList]);
    setRsvpWishes('');
    setRsvpSubmitted(true);
    setTimeout(() => setRsvpSubmitted(false), 4000);
  };

  // Safe couple fields
  const groomName = couple?.groom_name || 'Steven Pratama';
  const groomFullName = couple?.groom_full_name || 'Steven Pratama, S.T.';
  const groomFather = couple?.groom_father || 'Bpk. Hendra Pratama';
  const groomMother = couple?.groom_mother || 'Ibu Dewi Sartika';
  const groomInstagram = couple?.groom_instagram || 'steven.pratama';
  const groomPhoto = couple?.groom_photo || couple?.groom_photo_url || '/photos/photo-1.jpg';

  const brideName = couple?.bride_name || 'Bunga Citra';
  const brideFullName = couple?.bride_full_name || 'Bunga Citra Lestari, S.I.Kom.';
  const brideFather = couple?.bride_father || 'Bpk. Gunawan Wibisono';
  const brideMother = couple?.bride_mother || 'Ibu Ratna Anggraini';
  const brideInstagram = couple?.bride_instagram || 'bungacitra';
  const bridePhoto = couple?.bride_photo || couple?.bride_photo_url || '/photos/photo-2.jpg';

  const weddingDateStr = new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const akadEvent = events.find(e => e.title?.toLowerCase().includes('akad') || e.title?.toLowerCase().includes('nikah') || e.title?.toLowerCase().includes('pemberkatan')) || {
    title: 'Akad Nikah / Ijab Qabul',
    date: '2026-12-28',
    start_time: '08:00',
    end_time: '10:00',
    venue_name: 'Masjid Agung Al-Kautsar Grand Alhambra',
    venue_address: 'Jl. Boulevard Andalusia No. 88, Royal Residence, Jawa Barat',
    maps_url: 'https://maps.google.com'
  };

  const resepsiEvent = events.find(e => e.title?.toLowerCase().includes('resepsi') || e.title?.toLowerCase().includes('walimah')) || {
    title: 'Walimatul \'Ursy & Resepsi',
    date: '2026-12-28',
    start_time: '11:00',
    end_time: '14:00',
    venue_name: 'Grand Sahara Ballroom & Oasis Pavilion',
    venue_address: 'Jl. Boulevard Andalusia No. 88, Royal Residence, Jawa Barat',
    maps_url: 'https://maps.google.com'
  };

  const defaultStories = stories.length > 0 ? stories : [
    {
      year: '2022',
      title: 'Awal Pertemuan di Kota Casablanca',
      story: 'Takdir mempertemukan kami dalam sebuah simposium desain di mana percakapan sederhana tentang arsitektur Moriska berubah menjadi benih kasih yang tulus.'
    },
    {
      year: '2024',
      title: 'Khitbah & Komitmen Suci',
      story: 'Di bawah naungan hangat keluarga besar, restu tercurah saat ikrar khitbah terucap dengan niat mulia membangun rumah tangga yang diridhai-Nya.'
    },
    {
      year: '2026',
      title: 'Menuju Pelaminan (Walimatul \'Ursy)',
      story: 'Dengan memohon rahmat Allah SWT, kami menyatukan dua hati dan keluarga dalam ikatan suci pernikahan yang kekal selamanya.'
    }
  ];

  const defaultGifts = gifts.length > 0 ? gifts : [
    {
      bank_name: 'BCA (Bank Central Asia)',
      account_number: '8830192847',
      account_name: groomFullName,
      type: 'bank'
    },
    {
      bank_name: 'Bank Syariah Indonesia (BSI)',
      account_number: '7192847192',
      account_name: brideFullName,
      type: 'bank'
    }
  ];

  const defaultGallery = gallery.length > 0 ? gallery : [
    { image_url: '/photos/photo-1.jpg', caption: 'Kisah Kasih Abadi' },
    { image_url: '/photos/photo-2.jpg', caption: 'Dalam Naungan Rahmat' },
    { image_url: '/photos/photo-3.jpg', caption: 'Senyum Menuju Pelaminan' },
    { image_url: '/photos/photo-4.jpg', caption: 'Langkah Menuju Hari Bahagia' },
  ];

  return (
    <div className="relative min-h-screen bg-[#081224] text-[#FFF9EF] font-sans selection:bg-[#DE9B35] selection:text-[#081224] overflow-x-hidden">
      {/* Background Ambience: Zellij Tile Pattern & Floating Sahara Stardust */}
      <MoroccanZellijWatermark />
      <FloatingSaharaStardust />

      {/* TOP DECORATIVE HANGING LANTERNS */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-4 sm:px-8 pointer-events-none">
        <MoroccanFanousLantern size={48} chainHeight={45} className="hidden sm:flex" />
        <MoroccanFanousLantern size={38} chainHeight={25} />
        <div className="flex-1" />
        <MoroccanFanousLantern size={42} chainHeight={35} />
        <MoroccanFanousLantern size={52} chainHeight={55} className="hidden sm:flex" />
      </div>

      {/* =====================================================================
          SECTION 1: HERO / COVER (SAMPUL)
          ===================================================================== */}
      <section id="sampul" className="relative min-h-[92vh] flex flex-col justify-center items-center text-center px-4 pt-20 pb-16">
        {/* Subtle radial sapphire glow behind hero */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(222,155,53,0.18)_0%,rgba(8,18,36,0.95)_75%)] pointer-events-none" />

        <ScrollReveal animation="fade-down" delay={100} className="relative z-10 max-w-lg mx-auto">
          {/* Top Royal Arabesque Medallion */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102242]/90 border border-[#DE9B35]/60 shadow-[0_4px_20px_rgba(222,155,53,0.25)] mb-4">
            <Moon className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
            <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#FFF4D0] font-semibold">
              Walimatul 'Ursy • Arabian Moroccan Royal
            </span>
            <Star className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
          </div>

          <h2 className="text-xs sm:text-sm font-serif uppercase tracking-[0.35em] text-[#DE9B35] mb-2 font-bold">
            THE WEDDING CELEBRATION OF
          </h2>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] my-2">
            {groomName} <span className="font-light italic text-[#DE9B35] text-3xl sm:text-4xl">&amp;</span> {brideName}
          </h1>

          <MoroccanDivider className="my-3" />

          <p className="font-serif text-sm sm:text-base text-[#D1DCE8] tracking-widest mt-1">
            {weddingDateStr}
          </p>
        </ScrollReveal>

        {/* Arched Couple Portrait in Alhambra Horseshoe Arch */}
        <ScrollReveal animation="zoom-in" delay={250} className="relative z-10 my-6">
          <div className="relative mx-auto w-52 h-72 sm:w-60 sm:h-80">
            {/* Top Arch SVG Crown */}
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-20">
              <MoroccanHorseshoeArch size={240} />
            </div>

            {/* Glowing Moroccan Framed Photo Box */}
            <div className="w-full h-full rounded-t-[110px] rounded-b-3xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FFF4D0] via-[#DE9B35] to-[#102242] shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_25px_rgba(222,155,53,0.3)] group">
              <div className="w-full h-full rounded-t-[105px] rounded-b-2xl overflow-hidden relative">
                <img 
                  src={couple?.cover_photo || couple?.cover_photo_url || bridePhoto} 
                  alt={`${groomName} & ${brideName}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081224]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Recipient Plaque */}
        <ScrollReveal animation="fade-up" delay={350} className="relative z-10 max-w-sm w-full mx-auto">
          <div className="p-4 rounded-2xl bg-[#102242]/90 border border-[#DE9B35]/50 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-md">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif block mb-1">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </span>
            <p className="text-base sm:text-lg font-serif font-bold text-[#FFF9EF] tracking-wide">
              {guestName}
            </p>
            <p className="text-[10px] text-[#A6B6C8] font-sans mt-0.5">
              Tanpa mengurangi rasa hormat, kami mengundang Anda untuk hadir dan memberikan doa restu.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* =====================================================================
          SECTION 2: AYAT SUCI (SURAH AR-RUM : 21)
          ===================================================================== */}
      <section className="relative py-14 px-4 bg-[#0A172E]/90 border-y border-[#DE9B35]/30">
        <div className="absolute top-0 left-0"><MoroccanCornerArabesque position="top-left" size={60} /></div>
        <div className="absolute top-0 right-0"><MoroccanCornerArabesque position="top-right" size={60} /></div>
        <div className="absolute bottom-0 left-0"><MoroccanCornerArabesque position="bottom-left" size={60} /></div>
        <div className="absolute bottom-0 right-0"><MoroccanCornerArabesque position="bottom-right" size={60} /></div>

        <div className="max-w-2xl mx-auto text-center relative z-10">
          <ScrollReveal animation="fade-up">
            <p className="text-xl sm:text-2xl font-serif text-[#DE9B35] mb-4 tracking-wider leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <p className="text-base sm:text-lg font-serif text-[#FFF4D0] leading-loose mb-4 px-2" dir="rtl">
              وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ
            </p>

            <MoroccanDivider className="my-3" />

            <blockquote className="text-xs sm:text-sm text-[#D1DCE8] leading-relaxed italic font-serif px-4">
              "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
            </blockquote>
            <span className="inline-block mt-3 text-[11px] font-serif font-bold text-[#DE9B35] uppercase tracking-widest">
              (QS. Ar-Rum : 21)
            </span>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3: MEMPELAI (THE HAPPY COUPLE)
          ===================================================================== */}
      <section id="mempelai" className="relative py-20 px-4 max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
            <Crown className="w-3.5 h-3.5 text-[#DE9B35]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
              Sang Mempelai
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
            Mempelai Pria &amp; Wanita
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
            Dengan penuh rasa syukur kepada Allah SWT, kami memperkenalkan kedua mempelai yang akan mengikat janji suci.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-14 items-center">
          {/* GROOM CARD */}
          <ScrollReveal animation="slide-right" delay={150}>
            <div className="relative p-6 sm:p-8 rounded-[36px] bg-[#102242]/80 border border-[#DE9B35]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-center group">
              <div className="absolute top-0 right-0"><MoroccanCornerArabesque position="top-right" size={48} /></div>
              <div className="absolute bottom-0 left-0"><MoroccanCornerArabesque position="bottom-left" size={48} /></div>

              {/* Groom Photo in Moorish Arch */}
              <div className="relative mx-auto w-40 h-52 sm:w-44 sm:h-56 mb-5">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <MoroccanHorseshoeArch size={190} />
                </div>
                <div className="w-full h-full rounded-t-[90px] rounded-b-2xl overflow-hidden border-2 border-[#DE9B35] p-1 bg-gradient-to-b from-[#FFF4D0] via-[#DE9B35] to-[#102242]">
                  <img 
                    src={groomPhoto} 
                    alt={groomName}
                    className="w-full h-full object-cover object-top rounded-t-[84px] rounded-b-xl group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>

              <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif font-bold block mb-1">
                Mempelai Pria
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF9EF] mb-1">
                {groomFullName}
              </h3>
              <p className="text-xs text-[#D1DCE8] leading-relaxed mb-4">
                Putra tercinta dari <br />
                <span className="font-semibold text-[#FFF4D0]">{groomFather}</span> &amp; <span className="font-semibold text-[#FFF4D0]">{groomMother}</span>
              </p>

              {groomInstagram && (
                <a
                  href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081224] border border-[#DE9B35]/60 text-[#FFF4D0] text-xs hover:bg-[#DE9B35] hover:text-[#081224] transition-all duration-300 shadow-sm"
                >
                  <InstagramIcon size={14} />
                  <span>@{groomInstagram.replace('@', '')}</span>
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* BRIDE CARD */}
          <ScrollReveal animation="slide-left" delay={250}>
            <div className="relative p-6 sm:p-8 rounded-[36px] bg-[#102242]/80 border border-[#DE9B35]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] text-center group">
              <div className="absolute top-0 left-0"><MoroccanCornerArabesque position="top-left" size={48} /></div>
              <div className="absolute bottom-0 right-0"><MoroccanCornerArabesque position="bottom-right" size={48} /></div>

              {/* Bride Photo in Moorish Arch */}
              <div className="relative mx-auto w-40 h-52 sm:w-44 sm:h-56 mb-5">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-10">
                  <MoroccanHorseshoeArch size={190} />
                </div>
                <div className="w-full h-full rounded-t-[90px] rounded-b-2xl overflow-hidden border-2 border-[#DE9B35] p-1 bg-gradient-to-b from-[#FFF4D0] via-[#DE9B35] to-[#102242]">
                  <img 
                    src={bridePhoto} 
                    alt={brideName}
                    className="w-full h-full object-cover object-top rounded-t-[84px] rounded-b-xl group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
              </div>

              <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif font-bold block mb-1">
                Mempelai Wanita
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#FFF9EF] mb-1">
                {brideFullName}
              </h3>
              <p className="text-xs text-[#D1DCE8] leading-relaxed mb-4">
                Putri tercinta dari <br />
                <span className="font-semibold text-[#FFF4D0]">{brideFather}</span> &amp; <span className="font-semibold text-[#FFF4D0]">{brideMother}</span>
              </p>

              {brideInstagram && (
                <a
                  href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#081224] border border-[#DE9B35]/60 text-[#FFF4D0] text-xs hover:bg-[#DE9B35] hover:text-[#081224] transition-all duration-300 shadow-sm"
                >
                  <InstagramIcon size={14} />
                  <span>@{brideInstagram.replace('@', '')}</span>
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: COUNTDOWN & SAVE THE DATE
          ===================================================================== */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-[#081224] via-[#0D1F3C] to-[#081224] border-y border-[#DE9B35]/30 text-center">
        <ScrollReveal animation="fade-up" className="max-w-xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
            <Clock className="w-3.5 h-3.5 text-[#DE9B35]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
              Menghitung Hari Bahagia
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#FFF9EF] mb-2">
            Save The Date
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C8] mb-8">
            Kami menantikan kehadiran dan doa restu Anda dalam hitungan waktu:
          </p>

          {/* 4 Moroccan Brass Countdown Tiles */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto mb-8">
            {[
              { label: 'Hari', value: timeLeft.days },
              { label: 'Jam', value: timeLeft.hours },
              { label: 'Menit', value: timeLeft.minutes },
              { label: 'Detik', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div 
                key={idx}
                className="relative p-3 sm:p-4 rounded-2xl bg-[#102242]/90 border border-[#DE9B35]/60 shadow-[0_8px_25px_rgba(0,0,0,0.6)] backdrop-blur-md"
              >
                <div className="text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF4D0] to-[#DE9B35]">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#D1DCE8] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          {/* Add to Google Calendar Button */}
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`The Wedding of ${groomName} & ${brideName}`)}&dates=${invitation?.wedding_date ? new Date(invitation.wedding_date).toISOString().replace(/-|:|\.\d\d\d/g, "") : '20261228T010000Z'}/${invitation?.wedding_date ? new Date(invitation.wedding_date).toISOString().replace(/-|:|\.\d\d\d/g, "") : '20261228T070000Z'}&details=${encodeURIComponent(`Walimatul 'Ursy ${groomFullName} & ${brideFullName}. Kami sangat menantikan kehadiran Anda!`)}&location=${encodeURIComponent(akadEvent.venue_name || 'Grand Sahara Ballroom')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gradient-to-r from-[#DE9B35] via-[#E5B54F] to-[#C78726] text-[#081224] text-xs font-serif font-bold uppercase tracking-wider shadow-[0_6px_25px_rgba(222,155,53,0.35)] hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Calendar className="w-4 h-4 text-[#081224]" />
            <span>Simpan ke Google Calendar</span>
          </a>
        </ScrollReveal>
      </section>

      {/* =====================================================================
          SECTION 5: RANGKAIAN ACARA (WEDDING EVENTS)
          ===================================================================== */}
      <section id="acara" className="relative py-20 px-4 max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#DE9B35]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
              Waktu &amp; Tempat Acara
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
            Rangkaian Acara Walimah
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
            InsyaAllah seluruh rangkaian acara akad dan resepsi diselenggarakan dengan penuh keberkahan:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AKAD NIKAH CARD */}
          <ScrollReveal animation="fade-up" delay={150}>
            <div className="relative p-6 sm:p-8 rounded-[32px] bg-[#102242]/85 border border-[#DE9B35]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full group">
              <div className="absolute top-0 right-0"><MoroccanCornerArabesque position="top-right" size={44} /></div>
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#081224] border border-[#DE9B35]/60 flex items-center justify-center text-[#DE9B35] mb-4 shadow-inner">
                  <Bookmark className="w-6 h-6" />
                </div>
                <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif font-bold block mb-1">
                  Ijab Qabul &amp; Khutbah Nikah
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FFF9EF] mb-4">
                  {akadEvent.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#D1DCE8] mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#DE9B35] shrink-0" />
                    <span>{weddingDateStr}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#DE9B35] shrink-0" />
                    <span>Pukul {akadEvent.start_time} - {akadEvent.end_time} WIB</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#DE9B35] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#FFF4D0]">{akadEvent.venue_name}</p>
                      <p className="text-[11px] text-[#A6B6C8] mt-0.5 leading-relaxed">{akadEvent.venue_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {akadEvent.maps_url && (
                <a
                  href={akadEvent.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#081224] hover:bg-[#DE9B35] text-[#FFF4D0] hover:text-[#081224] border border-[#DE9B35]/60 text-xs font-serif font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* RESEPSI CARD */}
          <ScrollReveal animation="fade-up" delay={250}>
            <div className="relative p-6 sm:p-8 rounded-[32px] bg-[#102242]/85 border border-[#DE9B35]/50 shadow-[0_16px_40px_rgba(0,0,0,0.5)] flex flex-col justify-between h-full group">
              <div className="absolute top-0 right-0"><MoroccanCornerArabesque position="top-right" size={44} /></div>
              
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#081224] border border-[#DE9B35]/60 flex items-center justify-center text-[#DE9B35] mb-4 shadow-inner">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif font-bold block mb-1">
                  Jamuan Walimatul 'Ursy
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#FFF9EF] mb-4">
                  {resepsiEvent.title}
                </h3>

                <div className="space-y-3 text-xs sm:text-sm text-[#D1DCE8] mb-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#DE9B35] shrink-0" />
                    <span>{weddingDateStr}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#DE9B35] shrink-0" />
                    <span>Pukul {resepsiEvent.start_time} - {resepsiEvent.end_time} WIB</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#DE9B35] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#FFF4D0]">{resepsiEvent.venue_name}</p>
                      <p className="text-[11px] text-[#A6B6C8] mt-0.5 leading-relaxed">{resepsiEvent.venue_address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {resepsiEvent.maps_url && (
                <a
                  href={resepsiEvent.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#081224] hover:bg-[#DE9B35] text-[#FFF4D0] hover:text-[#081224] border border-[#DE9B35]/60 text-xs font-serif font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Petunjuk Arah Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: KISAH CINTA (LOVE STORY)
          ===================================================================== */}
      <section id="cerita" className="relative py-20 px-4 bg-[#0A172E]/70 border-y border-[#DE9B35]/30">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal animation="fade-up" className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
              <Heart className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
                Kisah &amp; Jejak Kasih
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
              Perjalanan Cinta Kami
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
              Bagaimana takdir mempertemukan kami dalam rangkaian babak berharga:
            </p>
          </ScrollReveal>

          <div className="relative pl-6 sm:pl-8 border-l-2 border-[#DE9B35]/50 space-y-10 my-4 ml-4 sm:ml-8">
            {defaultStories.map((story, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="relative group">
                  {/* Glowing 8-Pointed Star Node on Timeline */}
                  <div className="absolute -left-[37px] sm:-left-[45px] top-1.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#081224] border-2 border-[#DE9B35] flex items-center justify-center text-[#DE9B35] shadow-[0_0_12px_rgba(222,155,53,0.5)]">
                    <MoroccanKhatimStar size={16} />
                  </div>

                  <div className="p-5 sm:p-6 rounded-2xl bg-[#102242]/80 border border-[#DE9B35]/40 shadow-lg">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#081224] text-[#DE9B35] text-xs font-serif font-bold tracking-wider mb-2">
                      {story.year}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#FFF9EF] mb-2">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#D1DCE8] leading-relaxed font-sans">
                      {story.story}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: GALERI FOTO (MOMEN BAHAGIA)
          ===================================================================== */}
      <section id="galeri" className="relative py-20 px-4 max-w-4xl mx-auto">
        <ScrollReveal animation="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#DE9B35]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
              Potret Kebahagiaan
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
            Galeri Mempelai
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
            Setiap detik yang terabadikan dalam lembaran kenangan indah kami:
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {defaultGallery.map((img, idx) => (
            <ScrollReveal key={idx} animation="zoom-in" delay={idx * 100}>
              <div 
                onClick={() => setSelectedImage(img.image_url)}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border border-[#DE9B35]/40 shadow-md p-1 bg-[#102242]"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={img.image_url} 
                    alt={img.caption || `Galeri Foto ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081224]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-[11px] text-[#FFF4D0] font-serif italic line-clamp-1">
                      {img.caption || 'Momen Indah Kami'}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* LIGHTBOX MODAL */}
        {selectedImage && createPortal(
          <div 
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div className="relative max-w-2xl w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-[#DE9B35] shadow-2xl">
              <img 
                src={selectedImage} 
                alt="Enlarged gallery view" 
                className="w-full h-auto object-contain max-h-[80vh]"
              />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#081224]/80 border border-[#DE9B35] text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>
          </div>,
          document.body
        )}
      </section>

      {/* =====================================================================
          SECTION 8: TANDA KASIH (WEDDING GIFT / AMPLOP DIGITAL)
          ===================================================================== */}
      <section id="hadiah" className="relative py-20 px-4 bg-[#0A172E]/80 border-y border-[#DE9B35]/30">
        <div className="max-w-2xl mx-auto text-center">
          <ScrollReveal animation="fade-up" className="mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
              <Gift className="w-3.5 h-3.5 text-[#DE9B35]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
                Tanda Kasih &amp; Kado
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
              Amplop Digital &amp; Kado Fisik
            </h2>
            <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
              Doa restu Anda adalah karunia terindah bagi kami. Bagi yang berkenan memberikan tanda kasih, dapat disalurkan melalui:
            </p>
          </ScrollReveal>

          {/* BANK ACCOUNTS */}
          <div className="space-y-4 mb-8">
            {defaultGifts.map((gift, idx) => (
              <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                <div className="relative p-5 sm:p-6 rounded-2xl bg-[#102242]/90 border border-[#DE9B35]/60 shadow-lg text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-serif uppercase tracking-widest text-[#DE9B35] font-bold block mb-1">
                      {gift.bank_name}
                    </span>
                    <p className="font-mono text-xl sm:text-2xl font-bold text-[#FFF4D0] tracking-wider my-0.5">
                      {gift.account_number}
                    </p>
                    <p className="text-xs text-[#D1DCE8]">
                      a.n {gift.account_name}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopyAccount(gift.account_number)}
                    className="self-start sm:self-center px-4 py-2 rounded-xl bg-[#081224] hover:bg-[#DE9B35] text-[#FFF4D0] hover:text-[#081224] border border-[#DE9B35]/60 text-xs font-serif font-bold tracking-wider flex items-center gap-2 transition-all duration-300 shadow-sm cursor-pointer"
                  >
                    {copiedAccount === gift.account_number ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin No Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* PHYSICAL GIFT ADDRESS */}
          <ScrollReveal animation="fade-up" delay={300}>
            <div className="p-5 sm:p-6 rounded-2xl bg-[#102242]/70 border border-[#DE9B35]/40 text-left">
              <div className="flex items-center gap-2 text-[#DE9B35] mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-serif uppercase tracking-wider font-bold">Kirim Kado Fisik</span>
              </div>
              <p className="text-xs sm:text-sm text-[#D1DCE8] leading-relaxed mb-3">
                Kediaman Mempelai: <br />
                <span className="font-semibold text-[#FFF9EF]">Kompleks Royal Andalusia Garden Blok B8 No. 12, Jawa Barat 40182</span>
              </p>
              <button
                onClick={() => handleCopyAddress('Kompleks Royal Andalusia Garden Blok B8 No. 12, Jawa Barat 40182')}
                className="px-3.5 py-1.5 rounded-lg bg-[#081224] text-[#FFF4D0] hover:bg-[#DE9B35] hover:text-[#081224] border border-[#DE9B35]/60 text-xs font-serif transition-colors flex items-center gap-2 cursor-pointer"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Alamat Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Salin Alamat</span>
                  </>
                )}
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: RSVP & BUKU DOA TAMU (GUESTBOOK)
          ===================================================================== */}
      <section id="rsvp" className="relative py-20 px-4 max-w-3xl mx-auto">
        <ScrollReveal animation="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#102242] border border-[#DE9B35]/50 mb-2">
            <MessageCircle className="w-3.5 h-3.5 text-[#DE9B35]" />
            <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#FFF4D0]">
              Konfirmasi Kehadiran &amp; Doa
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] via-[#FFF0C2] to-[#DE9B35]">
            RSVP &amp; Buku Doa Tamu
          </h2>
          <p className="text-xs sm:text-sm text-[#A6B6C8] max-w-md mx-auto mt-2">
            Mohon konfirmasikan kehadiran Anda dan sampaikan untaian doa restu untuk kedua mempelai:
          </p>
        </ScrollReveal>

        {/* RSVP FORM */}
        <ScrollReveal animation="fade-up" delay={150}>
          <form 
            onSubmit={handleRsvpSubmit}
            className="p-6 sm:p-8 rounded-[32px] bg-[#102242]/90 border border-[#DE9B35]/60 shadow-[0_16px_40px_rgba(0,0,0,0.6)] mb-12 space-y-4"
          >
            <div>
              <label className="text-xs font-serif uppercase tracking-wider text-[#DE9B35] font-bold block mb-1.5">
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                placeholder="Tuliskan nama Anda..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#081224] border border-[#DE9B35]/40 text-[#FFF9EF] text-sm focus:outline-none focus:border-[#DE9B35]"
              />
            </div>

            <div>
              <label className="text-xs font-serif uppercase tracking-wider text-[#DE9B35] font-bold block mb-1.5">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: 'hadir', label: 'Hadir' },
                  { value: 'tidak_hadir', label: 'Tidak Hadir' },
                  { value: 'ragu', label: 'Ragu-ragu' },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRsvpStatus(opt.value as any)}
                    className={`py-2 px-2 rounded-xl text-xs font-serif font-semibold border transition-all cursor-pointer ${
                      rsvpStatus === opt.value
                        ? 'bg-[#DE9B35] text-[#081224] border-[#DE9B35] shadow-md'
                        : 'bg-[#081224] text-[#D1DCE8] border-[#DE9B35]/40 hover:border-[#DE9B35]'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {rsvpStatus === 'hadir' && (
              <div>
                <label className="text-xs font-serif uppercase tracking-wider text-[#DE9B35] font-bold block mb-1.5">
                  Jumlah Tamu (Pax)
                </label>
                <select
                  value={rsvpGuests}
                  onChange={(e) => setRsvpGuests(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#081224] border border-[#DE9B35]/40 text-[#FFF9EF] text-sm focus:outline-none focus:border-[#DE9B35]"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                  <option value="3">3 Orang</option>
                  <option value="4">4 Orang</option>
                </select>
              </div>
            )}

            <div>
              <label className="text-xs font-serif uppercase tracking-wider text-[#DE9B35] font-bold block mb-1.5">
                Ucapan &amp; Doa Restu
              </label>
              <textarea
                required
                rows={3}
                value={rsvpWishes}
                onChange={(e) => setRsvpWishes(e.target.value)}
                placeholder="Tuliskan doa restu untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#081224] border border-[#DE9B35]/40 text-[#FFF9EF] text-sm focus:outline-none focus:border-[#DE9B35] resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#DE9B35] via-[#E5B54F] to-[#C78726] text-[#081224] text-xs font-serif font-bold uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Konfirmasi &amp; Doa</span>
            </button>

            {rsvpSubmitted && (
              <p className="text-xs text-center text-emerald-400 font-serif mt-2">
                Terima kasih! Konfirmasi dan doa restu Anda telah berhasil terkirim.
              </p>
            )}
          </form>
        </ScrollReveal>

        {/* WISHES LIST */}
        <div className="space-y-3">
          <h3 className="text-xs font-serif uppercase tracking-widest text-[#DE9B35] font-bold mb-4">
            Untaian Doa Selamat ({wishesList.length})
          </h3>
          {wishesList.map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-[#102242]/70 border border-[#DE9B35]/30 space-y-1"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-serif font-bold text-[#FFF4D0]">{item.name}</span>
                <span className="text-[10px] text-[#8C9EB2]">{item.time}</span>
              </div>
              <p className="text-xs text-[#D1DCE8] leading-relaxed font-sans">
                {item.wishes}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: DO'A PENUTUP & FOOTER
          ===================================================================== */}
      <footer className="relative py-16 px-4 bg-[#060D1A] border-t border-[#DE9B35]/40 text-center">
        <ScrollReveal animation="fade-up" className="max-w-md mx-auto space-y-4">
          <MoroccanKhatimStar size={36} />
          
          <h3 className="font-serif text-2xl font-bold text-[#FFF9EF]">
            Terima Kasih
          </h3>
          <p className="text-xs sm:text-sm text-[#D1DCE8] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi kami.
          </p>

          <p className="text-xs font-serif text-[#DE9B35] italic">
            "Jazakumullahu Khairan Katsiran"
          </p>

          <div className="pt-4 border-t border-[#DE9B35]/20">
            <p className="font-serif text-sm font-semibold text-[#FFF4D0]">
              Kami yang berbahagia,
            </p>
            <p className="font-serif text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9EF] to-[#DE9B35] mt-1">
              {groomName} &amp; {brideName}
            </p>
            <p className="text-[10px] text-[#8C9EB2] mt-1">
              Beserta segenap keluarga besar kedua belah pihak
            </p>
          </div>

          <div className="pt-6">
            <a
              href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#102242] border border-[#DE9B35]/40 text-[10px] font-serif uppercase tracking-widest text-[#D1DCE8] hover:text-[#DE9B35] hover:border-[#DE9B35] transition-colors"
            >
              <span>Digital Invitation Powered by</span>
              <span className="font-bold text-[#DE9B35]">WD Group</span>
            </a>
          </div>
        </ScrollReveal>
      </footer>

      {/* =====================================================================
          BOTTOM FLOATING NAVIGATION DOCK
          ===================================================================== */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 py-2 rounded-full bg-[#081224]/90 backdrop-blur-md border border-[#DE9B35]/60 shadow-[0_8px_30px_rgba(0,0,0,0.7)] flex items-center gap-1.5 sm:gap-2">
        {[
          { id: 'sampul', label: 'Sampul' },
          { id: 'mempelai', label: 'Mempelai' },
          { id: 'acara', label: 'Acara' },
          { id: 'cerita', label: 'Cerita' },
          { id: 'galeri', label: 'Galeri' },
          { id: 'hadiah', label: 'Hadiah' },
          { id: 'rsvp', label: 'RSVP' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-serif uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              activeSection === item.id
                ? 'bg-[#DE9B35] text-[#081224] font-bold shadow-sm'
                : 'text-[#D1DCE8] hover:text-[#FFF4D0]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

