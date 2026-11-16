import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, 
  ExternalLink, Bookmark
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
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.08, rootMargin: '20px 0px 20px 0px' }
    );

    observer.observe(el);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [initialVisible]);

  const getAnimClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10 scale-[0.98]';
        case 'fade-down':
          return 'opacity-0 -translate-y-8 scale-[0.98]';
        case 'zoom-in':
          return 'opacity-0 scale-[0.92]';
        case 'slide-left':
          return 'opacity-0 -translate-x-8';
        case 'slide-right':
          return 'opacity-0 translate-x-8';
        case 'fade-in':
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      className={`transition-all will-change-transform ${getAnimClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

// =========================================================================
// ROSE GOLD CORNER ORNAMENT (Art Deco Hairline Arc)
// =========================================================================
export const RoseGoldCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 32, className = '' }) => {
  const getTransforms = () => {
    switch (position) {
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-x-[-1] scale-y-[-1]';
      case 'top-left':
      default: return '';
    }
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      className={`${getTransforms()} ${className} pointer-events-none`}
    >
      <path d="M 2 46 L 2 14 Q 2 2 14 2 L 46 2" stroke="#D89B9B" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
      <path d="M 7 42 L 7 15 Q 7 7 15 7 L 42 7" stroke="#E8B6BA" strokeWidth="0.8" strokeOpacity="0.55" fill="none" />
      <circle cx="12" cy="12" r="2" fill="#B26974" opacity="0.9" />
    </svg>
  );
};

// =========================================================================
// BLOOMING ROSE GOLD FLORALS (Dusty Rose & Peony Sprigs)
// =========================================================================

// Blooming Rose Gold Peony Rose Component
export const RoseGoldPeonyRose: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 48,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`drop-shadow-[0_4px_12px_rgba(216,155,155,0.35)] filter ${className}`}
  >
    <defs>
      <radialGradient id="roseGoldPetalOuter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF7F8" />
        <stop offset="65%" stopColor="#F8DCE0" />
        <stop offset="100%" stopColor="#E8B2B9" />
      </radialGradient>
      <radialGradient id="roseGoldPetalInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF0F2" />
        <stop offset="65%" stopColor="#ECA5AF" />
        <stop offset="100%" stopColor="#C97380" />
      </radialGradient>
      <radialGradient id="roseGoldPistil" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFE0B2" />
        <stop offset="60%" stopColor="#E2929D" />
        <stop offset="100%" stopColor="#9C4452" />
      </radialGradient>
    </defs>
    {/* Outer 6 blush petals */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <path
        key={`rose_outer_${i}`}
        d="M50 50 C28 26, 32 8, 50 10 C68 8, 72 26, 50 50 Z"
        transform={`rotate(${deg} 50 50)`}
        fill="url(#roseGoldPetalOuter)"
        stroke="#D9949E"
        strokeWidth="0.8"
        strokeOpacity="0.85"
      />
    ))}
    {/* Mid 6 rose petals */}
    {[30, 90, 150, 210, 270, 330].map((deg, i) => (
      <path
        key={`rose_mid_${i}`}
        d="M50 50 C36 32, 38 18, 50 20 C62 18, 64 32, 50 50 Z"
        transform={`rotate(${deg} 50 50)`}
        fill="url(#roseGoldPetalInner)"
        stroke="#B26974"
        strokeWidth="0.75"
        strokeOpacity="0.9"
      />
    ))}
    {/* Inner petal swirl */}
    {[15, 75, 135, 195, 255, 315].map((deg, i) => (
      <path
        key={`rose_inner_${i}`}
        d="M50 50 C42 38, 43 28, 50 29 C57 28, 58 38, 50 50 Z"
        transform={`rotate(${deg} 50 50)`}
        fill="#FFF2F4"
        stroke="#C97380"
        strokeWidth="0.7"
      />
    ))}
    {/* Core Pistil & Gold Stamens */}
    <circle cx="50" cy="50" r="10" fill="url(#roseGoldPistil)" stroke="#B26974" strokeWidth="0.8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((stamenAngle, sIdx) => (
      <g key={`stamen_${sIdx}`} transform={`rotate(${stamenAngle} 50 50)`}>
        <line x1="50" y1="50" x2="50" y2="42" stroke="#FFFBF5" strokeWidth="1.2" />
        <circle cx="50" cy="41" r="1.4" fill="#FFE082" stroke="#C97380" strokeWidth="0.4" />
      </g>
    ))}
    <circle cx="50" cy="50" r="4" fill="#8B3D4A" opacity="0.9" />
  </svg>
);

// Sage & Rose Gold Eucalyptus Leaf Spray
export const RoseGoldEucalyptus: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 48,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`drop-shadow-xs ${className}`}
  >
    <path d="M12 68 Q40 40 68 12" stroke="#C88E96" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M26 54 C16 50, 18 38, 28 42 C32 44, 34 52, 26 54 Z" fill="#FCE4E8" fillOpacity="0.75" stroke="#D9949E" strokeWidth="0.8" />
    <path d="M38 42 C30 32, 36 22, 45 26 C48 30, 46 39, 38 42 Z" fill="#DCE5DB" fillOpacity="0.75" stroke="#9BB09A" strokeWidth="0.8" />
    <path d="M50 30 C44 20, 52 14, 58 18 C61 22, 58 28, 50 30 Z" fill="#FCE4E8" fillOpacity="0.75" stroke="#D9949E" strokeWidth="0.8" />
    <path d="M60 20 C58 12, 66 8, 70 12 C72 16, 68 20, 60 20 Z" fill="#DCE5DB" fillOpacity="0.75" stroke="#9BB09A" strokeWidth="0.8" />
  </svg>
);

// High-End Corner Floral Cluster (Rose, Buds & Eucalyptus Leaves)
export const RoseGoldFloralCornerCluster: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 96, className = '' }) => {
  const getTransform = () => {
    switch (position) {
      case 'top-right': return 'scale-x-[-1]';
      case 'bottom-left': return 'scale-y-[-1]';
      case 'bottom-right': return 'scale-x-[-1] scale-y-[-1]';
      case 'top-left':
      default: return '';
    }
  };

  return (
    <div 
      className={`pointer-events-none select-none z-10 ${getTransform()} ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
      aria-hidden="true"
    >
      <div className="relative w-full h-full">
        <div className="absolute -top-1 -left-2 opacity-90">
          <RoseGoldEucalyptus size={size * 0.75} rotation={-10} />
        </div>
        <div className="absolute top-5 left-5 opacity-80">
          <RoseGoldEucalyptus size={size * 0.58} rotation={50} />
        </div>
        <div className="absolute top-1 left-1">
          <RoseGoldPeonyRose size={size * 0.58} rotation={15} />
        </div>
        <div className="absolute top-8 left-8">
          <RoseGoldPeonyRose size={size * 0.36} rotation={65} />
        </div>
      </div>
    </div>
  );
};

// Arched Floral Garland Crown (Drapes Elegantly Over Couple Arch)
export const RoseGoldArchFloralCrown: React.FC<{ className?: string; size?: number }> = ({ 
  className = '',
  size = 220
}) => (
  <div 
    className={`pointer-events-none select-none flex items-center justify-center -space-x-2 drop-shadow-[0_6px_16px_rgba(216,155,155,0.35)] ${className}`}
    style={{ width: `${size}px` }}
    aria-hidden="true"
  >
    <RoseGoldEucalyptus size={size * 0.22} rotation={-35} />
    <RoseGoldPeonyRose size={size * 0.22} rotation={-15} />
    <RoseGoldPeonyRose size={size * 0.32} rotation={0} className="z-10 -translate-y-1 scale-105" />
    <RoseGoldPeonyRose size={size * 0.22} rotation={15} />
    <RoseGoldEucalyptus size={size * 0.22} rotation={75} />
  </div>
);

// High-End Editorial Floral Divider with Rose Bud
export const RoseGoldFloralDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D89B9B]/50" />
    <div className="flex items-center gap-1.5 text-[#B26974]">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <path d="M4 16 C10 13, 14 11, 28 16" stroke="#D89B9B" strokeWidth="1" strokeLinecap="round" />
        <path d="M10 14 C8 10, 12 7, 14 10 C14 13, 12 15, 10 14 Z" fill="#FCE4E8" fillOpacity="0.6" stroke="#D89B9B" strokeWidth="0.8" />
        <path d="M22 14 C24 10, 20 7, 18 10 C18 13, 20 15, 22 14 Z" fill="#FCE4E8" fillOpacity="0.6" stroke="#D89B9B" strokeWidth="0.8" />
        <circle cx="16" cy="15" r="3.2" fill="#FFF0F2" stroke="#B26974" strokeWidth="1" />
        <circle cx="16" cy="15" r="1.2" fill="#B26974" />
      </svg>
    </div>
    <div className="w-12 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D89B9B]/50" />
  </div>
);

// Falling Blush & Rose Gold Petals (Soft Ambient Breeze)
export const RoseGoldFallingPetals: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes fallAndSwayRose {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(50vh) translateX(32px) rotate(160deg) scale(1.06);
            opacity: 0.9;
          }
          85% {
            opacity: 0.75;
          }
          100% {
            transform: translateY(105vh) translateX(-22px) rotate(320deg) scale(0.95);
            opacity: 0;
          }
        }
      `}</style>
      {[
        { left: '6%', dur: '12s', delay: '0s', size: 16, rotate: '15deg' },
        { left: '18%', dur: '17s', delay: '3.5s', size: 14, rotate: '-25deg' },
        { left: '32%', dur: '15s', delay: '1s', size: 17, rotate: '45deg' },
        { left: '48%', dur: '19s', delay: '5s', size: 13, rotate: '-10deg' },
        { left: '62%', dur: '14s', delay: '2s', size: 16, rotate: '30deg' },
        { left: '76%', dur: '18s', delay: '4.2s', size: 15, rotate: '-35deg' },
        { left: '88%', dur: '16s', delay: '0.8s', size: 14, rotate: '20deg' },
        { left: '95%', dur: '20s', delay: '6s', size: 16, rotate: '-15deg' },
      ].map((p, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(216,155,155,0.35)]"
          style={{
            left: p.left,
            top: '-30px',
            animation: `fallAndSwayRose ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 24 32" fill="none" style={{ transform: `rotate(${p.rotate})` }}>
            <path
              d="M12 2 C18 6, 22 14, 20 22 C18 28, 12 30, 8 28 C3 25, 2 17, 6 10 C8 5, 10 2, 12 2 Z"
              fill="url(#rosePetalGradEnhanced)"
              stroke="#E8B6BA"
              strokeWidth="0.85"
              strokeOpacity="0.85"
            />
            <path
              d="M12 4 C13 12, 12 20, 10 26"
              stroke="#D9949E"
              strokeWidth="0.6"
              strokeOpacity="0.7"
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="rosePetalGradEnhanced" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
                <stop offset="50%" stopColor="#FDE4E7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#ECA5AF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

// Floating warm rose-gold light particles
export const RoseGoldParticles: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes floatRoseGoldSlow {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          25% { opacity: 0.65; }
          75% { opacity: 0.55; }
          100% { transform: translateY(-320px) rotate(140deg); opacity: 0; }
        }
      `}</style>
      {[
        { left: '10%', top: '22%', size: 3, dur: '13s', delay: '0s' },
        { left: '26%', top: '68%', size: 2.2, dur: '16s', delay: '2s' },
        { left: '84%', top: '18%', size: 3.5, dur: '12s', delay: '1s' },
        { left: '90%', top: '72%', size: 2, dur: '15s', delay: '3.5s' },
        { left: '50%', top: '42%', size: 2.8, dur: '17s', delay: '1.5s' },
      ].map((p, idx) => (
        <div 
          key={idx}
          className="absolute rounded-full bg-gradient-to-tr from-[#D89B9B] via-[#FCE4E8] to-[#FFFFFF] shadow-[0_0_6px_rgba(216,155,155,0.5)]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatRoseGoldSlow ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

interface RoseGoldThemeProps {
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

export const RoseGoldTheme: React.FC<RoseGoldThemeProps> = ({
  invitation,
  couple,
  events,
  gallery,
  gifts,
  guestName = 'Tamu Undangan',
}) => {
  const [activeTab, setActiveTab] = useState<'opening' | 'couple' | 'story' | 'event' | 'gallery' | 'gift' | 'wishes'>('opening');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'uncertain' | 'absent'>('attending');
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wishes List
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; message: string; date: string; status: string }>>([
    {
      id: '1',
      name: 'Bpk. Hendra & Keluarga',
      message: 'Selamat menempuh hidup baru untuk Steven & Bunga. Semoga menjadi keluarga sakinah, mawaddah, warahmah serta senantiasa diberkahi kebahagiaan dan cinta abadi.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: '2',
      name: 'Rian & Sarah',
      message: 'Happy wedding day! Tema rose gold ini sangat romantis dan manis sekali. Bahagia dan langgeng selamanya.',
      date: '1 jam yang lalu',
      status: 'attending'
    },
    {
      id: '3',
      name: 'Keluarga Besar Alumni',
      message: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fii khoir. Doa terbaik untuk kedua mempelai.',
      date: '3 jam yang lalu',
      status: 'attending'
    }
  ]);

  // Countdown timer state
  const weddingDateStr = invitation?.wedding_date || '2026-12-28T09:00:00+07:00';
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 14, minutes: 28, seconds: 15 });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      let target = new Date(weddingDateStr).getTime();
      if (isNaN(target) || target <= now) {
        target = now + (45 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000) + (28 * 60 * 1000);
      }
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [weddingDateStr]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  const handleSubmitRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    setIsSubmittingRsvp(true);
    setTimeout(() => {
      setWishes(prev => [
        {
          id: Date.now().toString(),
          name: rsvpName.trim(),
          message: rsvpMessage.trim(),
          date: 'Baru saja',
          status: rsvpStatus
        },
        ...prev
      ]);
      setIsSubmittingRsvp(false);
      setRsvpSuccess(true);
      setRsvpMessage('');
      setTimeout(() => setRsvpSuccess(false), 4000);
    }, 600);
  };

  // Safe couple display data
  const groomName = couple?.groom_nickname || couple?.groom_name || 'Steven';
  const groomFullName = couple?.groom_full_name || couple?.groom_name || 'Steven Pratama, S.Kom.';
  const groomParents = couple?.groom_parents || 'Putra pertama dari Bpk. Bambang Pratama & Ibu Siti Rahayu';
  const groomPhoto = couple?.groom_photo || couple?.groom_photo_url || '/photos/photo-7.jpg';

  const brideName = couple?.bride_nickname || couple?.bride_name || 'Bunga';
  const brideFullName = couple?.bride_full_name || couple?.bride_name || 'Bunga Citra Lestari, S.E.';
  const brideParents = couple?.bride_parents || 'Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const bridePhoto = couple?.bride_photo || couple?.bride_photo_url || '/photos/photo-8.jpg';

  const couplePhoto = invitation?.settings?.cover_photo || couple?.cover_photo || '/themes/nirwana-sarangan/couple-cover.jpg';

  // Events data
  const mainEvents = (events && events.length > 0) ? events : [
    {
      id: 'akad',
      title: 'Akad Nikah',
      date: 'Sabtu, 26 Desember 2026',
      time: '08:00 - 10:00 WIB',
      location_name: 'Masjid Agung Baitul Makmur',
      address: 'Jl. Merdeka No. 45, Kebayoran Baru, Jakarta Selatan',
      maps_url: 'https://maps.google.com'
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      date: 'Sabtu, 26 Desember 2026',
      time: '11:00 - 14:00 WIB',
      location_name: 'The Rosewood Grand Ballroom',
      address: 'Jl. Jenderal Sudirman Kav. 12, Jakarta Pusat',
      maps_url: 'https://maps.google.com'
    }
  ];

  // Love stories
  const loveStories = [
    {
      year: '2022',
      title: 'Awal Perjumpaan',
      desc: 'Pertemuan pertama yang hangat di bawah semilir sore, mengawali kisah cinta manis yang tak pernah pudar.'
    },
    {
      year: '2024',
      title: 'Mengikat Komitmen',
      desc: 'Menyadari bahwa setiap perjalanan terasa lebih bermakna bersama, kami sepakat melangkah lebih dekat menuju masa depan.'
    },
    {
      year: '2025',
      title: 'Prosesi Lamaran',
      desc: 'Dikelilingi doa restu keluarga tercinta, ikatan suci diresmikan sebagai janji menuju hari bahagia.'
    },
    {
      year: '2026',
      title: 'Hari Bahagia',
      desc: 'Dengan penuh rasa syukur, kami mengundang Anda menjadi saksi pengucapan janji sehidup semati kami.'
    }
  ];

  // Gallery items (Starter: 3 photos)
  const galleryItems = (gallery && gallery.length >= 3) ? gallery.slice(0, 3) : [
    { id: 'g1', image_url: couplePhoto, caption: 'Janji Suci Dua Hati', tag: 'Romantic Walk' },
    { id: 'g2', image_url: '/photos/photo-1.jpg', caption: 'Kisah Kasih Abadi', tag: 'Forever Yours' },
    { id: 'g3', image_url: '/photos/photo-5.jpg', caption: 'Langkah Menuju Bahagia', tag: 'Pure Love' }
  ];

  // Bank accounts
  const bankAccounts = (gifts && gifts.length > 0) ? gifts : [
    {
      id: 'bca-1',
      bank_name: 'BCA',
      account_number: '8220918231',
      account_holder: `${groomName.toUpperCase()} / ${brideName.toUpperCase()}`,
      type: 'bank'
    },
    {
      id: 'mandiri-1',
      bank_name: 'Bank Mandiri',
      account_number: '1370019283712',
      account_holder: `${groomName.toUpperCase()} / ${brideName.toUpperCase()}`,
      type: 'bank'
    }
  ];

  // ScrollSpy to update active bottom navigation tab automatically on scroll
  useEffect(() => {
    const sectionMapping: Array<{ id: string; tab: typeof activeTab }> = [
      { id: 'section-opening', tab: 'opening' },
      { id: 'section-couple', tab: 'couple' },
      { id: 'section-story', tab: 'story' },
      { id: 'section-event', tab: 'event' },
      { id: 'section-gallery', tab: 'gallery' },
      { id: 'section-gift', tab: 'gift' },
      { id: 'section-wishes', tab: 'wishes' },
    ];

    const handleScroll = () => {
      const scrollY = window.scrollY + 280;
      for (let i = sectionMapping.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionMapping[i].id);
        if (el && el.offsetTop <= scrollY) {
          setActiveTab(sectionMapping[i].tab);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string, tab: typeof activeTab) => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FFF7F8] text-[#332024] font-sans selection:bg-[#D89B9B] selection:text-white antialiased">
      
      {/* Background Soft Blush Radial Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(216,155,155,0.18),rgba(255,247,248,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(216,155,155,0.1),rgba(255,247,248,0))]" />
      </div>

      {/* Floating Gentle Rose Stardust & Falling Petals */}
      <RoseGoldParticles />
      <RoseGoldFallingPetals />

      {/* Main Invitation Container (Centered Single-Column for Starter 50k Package) */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-28">

        {/* ================================================================= */}
        {/* SECTION 1: HERO / OPENING CARD                                    */}
        {/* ================================================================= */}
        <section id="section-opening" className="min-h-[85vh] flex flex-col items-center justify-center pt-4 pb-12">
          
          <ScrollReveal animation="zoom-in" duration={850} initialVisible={true} className="w-full">
            <div className="relative w-full rounded-[38px] p-6 sm:p-8 bg-white border border-[#E8B6BA] shadow-[0_20px_50px_rgba(200,140,150,0.18)] flex flex-col items-center text-center overflow-hidden">
              
              {/* Rich Blooming Rose Gold Floral Corner Frames */}
              <div className="absolute -top-1 -left-1"><RoseGoldFloralCornerCluster position="top-left" size={105} /></div>
              <div className="absolute -top-1 -right-1"><RoseGoldFloralCornerCluster position="top-right" size={105} /></div>
              <div className="absolute -bottom-1 -left-1"><RoseGoldFloralCornerCluster position="bottom-left" size={105} /></div>
              <div className="absolute -bottom-1 -right-1"><RoseGoldFloralCornerCluster position="bottom-right" size={105} /></div>

              {/* Four Rose Gold Corners (Hairline Nodes) */}
              <div className="absolute top-4 left-4 opacity-70"><RoseGoldCorner position="top-left" size={26} /></div>
              <div className="absolute top-4 right-4 opacity-70"><RoseGoldCorner position="top-right" size={26} /></div>
              <div className="absolute bottom-4 left-4 opacity-70"><RoseGoldCorner position="bottom-left" size={26} /></div>
              <div className="absolute bottom-4 right-4 opacity-70"><RoseGoldCorner position="bottom-right" size={26} /></div>

              {/* Volume Subheader */}
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold mb-4 relative z-10">
                <span>EST. 2026</span>
                <span>•</span>
                <span>WEDDING INVITATION</span>
              </div>

              {/* Arched Fine-Art Portrait Frame with Rose Garland Crown */}
              <div className="relative mb-6 z-10">
                {/* Arch Floral Crown */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                  <RoseGoldArchFloralCrown size={200} />
                </div>
                {/* Botanical Leaves at the Arch Base */}
                <div className="absolute -bottom-2 -left-3 z-15 pointer-events-none">
                  <RoseGoldEucalyptus size={42} rotation={-15} />
                </div>
                <div className="absolute -bottom-2 -right-3 z-15 pointer-events-none">
                  <RoseGoldEucalyptus size={42} rotation={75} />
                </div>

                <div className="relative w-48 h-64 sm:w-56 sm:h-72 rounded-t-[110px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FCE4E8] via-[#D89B9B] to-[#A85865] shadow-[0_12px_35px_rgba(200,130,140,0.25)] group">
                  <div className="w-full h-full rounded-t-[104px] rounded-b-xl overflow-hidden relative">
                    <img 
                      src={couplePhoto} 
                      alt={`${groomName} & ${brideName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Couple Names in Chic Serif */}
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#332024] mb-2">
                {groomName} <span className="font-light italic text-[#B26974]">&amp;</span> {brideName}
              </h1>

              {/* Wedding Date */}
              <p className="text-xs sm:text-sm font-sans tracking-[0.22em] uppercase text-[#7D565E] mb-6 font-medium">
                {new Date(weddingDateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>

              {/* Guest Greeting Pill */}
              <div className="w-full max-w-xs p-3 rounded-2xl bg-[#FFF2F4] border border-[#E8B6BA]/60 shadow-xs mb-6">
                <span className="text-[10px] uppercase tracking-widest text-[#8A636B] block mb-0.5">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </span>
                <span className="font-serif text-sm font-bold text-[#B26974] block truncate">
                  {guestName}
                </span>
              </div>

              {/* Typographic Countdown */}
              <div className="w-full max-w-sm pt-4 border-t border-[#E8B6BA] flex items-center justify-between px-2">
                {[
                  { label: 'Hari', val: timeLeft.days },
                  { label: 'Jam', val: timeLeft.hours },
                  { label: 'Menit', val: timeLeft.minutes },
                  { label: 'Detik', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <React.Fragment key={idx}>
                    <div className="flex flex-col items-center">
                      <span className="font-mono text-xl sm:text-2xl font-bold text-[#B26974]">
                        {String(item.val).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] uppercase tracking-widest text-[#8A636B] font-semibold mt-0.5">
                        {item.label}
                      </span>
                    </div>
                    {idx < 3 && <div className="h-6 w-[1px] bg-[#E8B6BA]/60" />}
                  </React.Fragment>
                ))}
              </div>

            </div>
          </ScrollReveal>

          {/* Scroll Down Prompt */}
          <div className="flex flex-col items-center gap-1.5 mt-6 text-[#B26974] animate-bounce">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll Ke Bawah</span>
            <ChevronDown size={14} />
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 2: GREETING & AYAT SUCI                                   */}
        {/* ================================================================= */}
        <section className="py-8 text-center">
          <ScrollReveal animation="fade-up">
            <div className="relative p-6 sm:p-8 rounded-[32px] bg-white border border-[#E8B6BA] shadow-xs">
              <RoseGoldFloralDivider className="mb-3" />

              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-3">
                Doa &amp; Harapan Suci
              </span>

              <p className="font-serif italic text-sm sm:text-base text-[#4C353A] leading-relaxed max-w-md mx-auto mb-4">
                &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
              </p>
              
              <span className="text-xs font-sans tracking-widest uppercase text-[#B26974] font-semibold block mb-2">
                (QS. Ar-Rum: 21)
              </span>

              <RoseGoldFloralDivider className="mt-4" />
            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: KEDUA MEMPELAI                                         */}
        {/* ================================================================= */}
        <section id="section-couple" className="py-10 space-y-8">
          
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              Kedua Mempelai
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Maha Suci Allah yang Mempersatukan
            </h2>
            <p className="text-xs text-[#7D565E] max-w-sm mx-auto mt-2">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan putra-putri kami:
            </p>
          </ScrollReveal>

          {/* Groom Card */}
          <ScrollReveal animation="slide-left" delay={100}>
            <div className="relative rounded-tl-[48px] rounded-br-[48px] rounded-tr-2xl rounded-bl-2xl p-6 bg-white border border-[#E8B6BA] shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left overflow-hidden">
              <div className="absolute -top-1 -left-1"><RoseGoldFloralCornerCluster position="top-left" size={72} /></div>

              <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-tl-[40px] rounded-br-[40px] rounded-tr-xl rounded-bl-xl overflow-hidden p-1 bg-gradient-to-tr from-[#D89B9B] to-[#FCE4E8] shrink-0 shadow-md">
                <img 
                  src={groomPhoto} 
                  alt={groomFullName}
                  className="w-full h-full object-cover object-center rounded-tl-[36px] rounded-br-[36px] rounded-tr-lg rounded-bl-lg" 
                />
              </div>
              <div className="flex-1 space-y-2 relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FFF0F2] text-[#B26974] border border-[#E8B6BA]/60 text-[10px] uppercase font-bold tracking-wider">
                  The Groom
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#332024]">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#6B4D53] leading-relaxed">
                  {groomParents}
                </p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B26974] hover:text-[#8B3D4A] transition-colors pt-1 font-medium"
                >
                  <InstagramIcon size={14} />
                  <span>@{groomName.toLowerCase()}_pratama</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Floral Ampersand Divider */}
          <div className="flex items-center justify-center gap-3 py-3">
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-r from-transparent to-[#D89B9B]/50" />
            <div className="flex items-center gap-2">
              <RoseGoldPeonyRose size={30} rotation={-25} />
              <span className="font-serif italic text-2xl text-[#B26974] px-1 font-light">&amp;</span>
              <RoseGoldPeonyRose size={30} rotation={25} />
            </div>
            <div className="w-12 sm:w-20 h-[1px] bg-gradient-to-l from-transparent to-[#D89B9B]/50" />
          </div>

          {/* Bride Card */}
          <ScrollReveal animation="slide-right" delay={150}>
            <div className="relative rounded-tr-[48px] rounded-bl-[48px] rounded-tl-2xl rounded-br-2xl p-6 bg-white border border-[#E8B6BA] shadow-sm flex flex-col sm:flex-row-reverse items-center gap-6 text-center sm:text-right overflow-hidden">
              <div className="absolute -top-1 -right-1"><RoseGoldFloralCornerCluster position="top-right" size={72} /></div>

              <div className="relative w-32 h-40 sm:w-36 sm:h-44 rounded-tr-[40px] rounded-bl-[40px] rounded-tl-xl rounded-br-xl overflow-hidden p-1 bg-gradient-to-tr from-[#D89B9B] to-[#FCE4E8] shrink-0 shadow-md">
                <img 
                  src={bridePhoto} 
                  alt={brideFullName}
                  className="w-full h-full object-cover object-center rounded-tr-[36px] rounded-bl-[36px] rounded-tl-lg rounded-br-lg" 
                />
              </div>
              <div className="flex-1 space-y-2 relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FFF0F2] text-[#B26974] border border-[#E8B6BA]/60 text-[10px] uppercase font-bold tracking-wider">
                  The Bride
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#332024]">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#6B4D53] leading-relaxed">
                  {brideParents}
                </p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#B26974] hover:text-[#8B3D4A] transition-colors pt-1 font-medium"
                >
                  <InstagramIcon size={14} />
                  <span>@{brideName.toLowerCase()}_lestari</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </section>

        {/* ================================================================= */}
        {/* SECTION 4: LOVE STORY TIMELINE                                    */}
        {/* ================================================================= */}
        <section id="section-story" className="py-10 space-y-6">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              Our Journey
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Kisah Kasih &amp; Perjalanan Cinta
            </h2>
            <p className="text-xs text-[#7D565E] max-w-sm mx-auto mt-2">
              Setiap langkah yang kami lalui adalah untaian takdir indah yang menyatukan dua hati:
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {loveStories.map((story, idx) => (
              <ScrollReveal key={idx} animation={idx % 2 === 0 ? 'slide-left' : 'slide-right'} delay={idx * 100}>
                <div className="relative rounded-3xl p-5 bg-white border border-[#E8B6BA] shadow-xs flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#D89B9B] to-[#FCE4E8] text-[#8B3D4A] flex flex-col items-center justify-center shrink-0 border border-[#E8B6BA] shadow-xs">
                    <Bookmark size={16} />
                    <span className="text-[9px] font-bold font-mono mt-0.5">{story.year}</span>
                  </div>
                  <div className="space-y-1 flex-1">
                    <h4 className="font-serif text-base font-bold text-[#332024]">{story.title}</h4>
                    <p className="text-xs text-[#6B4D53] leading-relaxed">{story.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: RANGKAIAN ACARA (AKAD & RESEPSI)                       */}
        {/* ================================================================= */}
        <section id="section-event" className="py-10 space-y-6">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              Agenda Sakral
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Waktu &amp; Tempat Acara
            </h2>
          </ScrollReveal>

          <div className="space-y-5">
            {mainEvents.map((evt, idx) => (
              <ScrollReveal key={evt.id || idx} animation="fade-up" delay={idx * 150}>
                <div className="relative rounded-[32px] p-6 bg-white border border-[#E8B6BA] shadow-sm overflow-hidden">
                  <div className="absolute top-0 right-0"><RoseGoldFloralCornerCluster position="top-right" size={60} /></div>

                  <div className="flex items-center gap-2 pb-3 border-b border-[#E8B6BA]/60 mb-4">
                    <div className="w-8 h-8 rounded-full bg-[#FFF0F2] text-[#B26974] flex items-center justify-center border border-[#E8B6BA]">
                      <Clock size={16} />
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#332024]">{evt.title}</h4>
                  </div>

                  <div className="space-y-3 mb-5 text-xs text-[#6B4D53]">
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-[#B26974] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#332024]">{evt.date}</span>
                        <span className="text-[11px] text-[#8A636B]">{evt.time}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[#B26974] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-[#332024]">{evt.location_name}</span>
                        <span className="text-[11px] text-[#8A636B] leading-relaxed">{evt.address}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={evt.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#D89B9B] via-[#C87D8A] to-[#B26974] hover:brightness-105 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <MapPin size={14} />
                    <span>Petunjuk Lokasi Google Maps</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: GALERI MOMEN INDAH                                     */}
        {/* ================================================================= */}
        <section id="section-gallery" className="py-10 space-y-6">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              Memories
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Galeri Momen Indah
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div 
              onClick={() => setSelectedPhoto(galleryItems[0]?.image_url)}
              className="col-span-2 relative aspect-[16/10] rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#E8B6BA] to-[#FCE4E8] cursor-pointer group shadow-md"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={galleryItems[0]?.image_url} 
                  alt="Gallery 1" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-4">
                  <span className="font-serif text-xs text-white font-medium tracking-wide">
                    {galleryItems[0]?.caption}
                  </span>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setSelectedPhoto(galleryItems[1]?.image_url)}
              className="relative aspect-square rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#E8B6BA] to-[#FCE4E8] cursor-pointer group shadow-xs"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={galleryItems[1]?.image_url} 
                  alt="Gallery 2" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div 
              onClick={() => setSelectedPhoto(galleryItems[2]?.image_url)}
              className="relative aspect-square rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#E8B6BA] to-[#FCE4E8] cursor-pointer group shadow-xs"
            >
              <div className="w-full h-full rounded-xl overflow-hidden relative">
                <img 
                  src={galleryItems[2]?.image_url} 
                  alt="Gallery 3" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div 
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
            >
              <div className="relative max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden border border-[#E8B6BA] shadow-2xl">
                <img src={selectedPhoto} alt="Zoom Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </section>

        {/* ================================================================= */}
        {/* SECTION 7: AMPLOP DIGITAL & TANDA KASIH                           */}
        {/* ================================================================= */}
        <section id="section-gift" className="py-10 space-y-6">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              Wedding Gift
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Tanda Kasih &amp; Amplop Digital
            </h2>
            <p className="text-xs text-[#7D565E] max-w-sm mx-auto mt-2">
              Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin memberikan tanda kasih secara cashless:
            </p>
          </ScrollReveal>

          <div className="space-y-4">
            {bankAccounts.map((acc, idx) => (
              <ScrollReveal key={acc.id || idx} animation="fade-up" delay={idx * 100}>
                <div className="relative rounded-3xl p-6 bg-white border border-[#E8B6BA] shadow-sm overflow-hidden">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif font-bold text-base text-[#332024]">{acc.bank_name}</span>
                    <span className="text-[10px] font-bold tracking-widest text-[#B26974] bg-[#FFF0F2] px-3 py-1 rounded-full border border-[#E8B6BA]/60">
                      TRANSFER BANK
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FFF7F8] border border-[#E8B6BA]/60 mb-3">
                    <span className="font-mono text-base sm:text-lg font-bold text-[#332024] tracking-wider">
                      {acc.account_number}
                    </span>
                    <button
                      onClick={() => handleCopy(acc.account_number, acc.id || String(idx))}
                      className="py-1.5 px-3.5 rounded-xl bg-gradient-to-r from-[#D89B9B] to-[#B26974] text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
                    >
                      {copiedAccount === (acc.id || String(idx)) ? (
                        <>
                          <Check size={13} />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Salin</span>
                        </>
                      )}
                    </button>
                  </div>

                  <span className="text-xs text-[#6B4D53] block">
                    Atas Nama: <strong className="text-[#332024] font-serif uppercase">{acc.account_holder}</strong>
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: BUKU TAMU & RSVP DIGITAL                               */}
        {/* ================================================================= */}
        <section id="section-wishes" className="py-10 space-y-6">
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#B26974] font-bold block mb-2">
              RSVP &amp; Wishes
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#332024]">
              Untaian Doa &amp; Konfirmasi
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up">
            <div className="rounded-[32px] p-6 sm:p-8 bg-white border border-[#E8B6BA] shadow-sm">
              <form onSubmit={handleSubmitRsvp} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B4D53] block mb-1.5">
                    Nama Lengkap
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Nama Anda"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F8] border border-[#E8B6BA] text-sm text-[#332024] focus:outline-none focus:border-[#B26974] transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B4D53] block mb-1.5">
                    Konfirmasi Kehadiran
                  </label>
                  <select 
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F8] border border-[#E8B6BA] text-sm text-[#332024] focus:outline-none focus:border-[#B26974] transition-colors"
                  >
                    <option value="attending">Hadir</option>
                    <option value="uncertain">Masih Ragu</option>
                    <option value="absent">Tidak Hadir</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6B4D53] block mb-1.5">
                    Untaian Doa &amp; Ucapan
                  </label>
                  <textarea 
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    rows={3}
                    placeholder="Tuliskan ucapan selamat serta doa restu untuk kedua mempelai..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FFF7F8] border border-[#E8B6BA] text-sm text-[#332024] focus:outline-none focus:border-[#B26974] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#D89B9B] via-[#C87D8A] to-[#B26974] hover:brightness-105 text-white font-serif text-sm font-bold tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmittingRsvp ? 'Mengirim...' : 'Kirim RSVP & Doa Restu'}</span>
                </button>
              </form>

              {/* Wishes Feed */}
              <div className="mt-8 pt-6 border-t border-[#E8B6BA] space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#6B4D53]">
                    Ucapan Tamu ({wishes.length})
                  </span>
                  <span className="text-[10px] text-[#B26974] font-semibold">Terkonfirmasi</span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-2xl bg-[#FFF7F8] border border-[#E8B6BA]/60 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#332024]">{w.name}</span>
                        <span className="text-[10px] text-[#B26974] font-medium">{w.date}</span>
                      </div>
                      <p className="text-[#6B4D53] leading-relaxed mt-1">
                        {w.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================= */}
        {/* CLOSING / FOOTER                                                  */}
        {/* ================================================================= */}
        <footer className="pt-8 pb-12 text-center space-y-4">
          <RoseGoldFloralDivider className="mx-auto" />

          <h3 className="font-serif text-2xl font-bold text-[#332024]">
            {groomName} &amp; {brideName}
          </h3>

          <p className="text-xs text-[#7D565E] max-w-xs mx-auto leading-relaxed">
            Terima kasih atas doa restu dan kehadiran Bapak/Ibu/Saudara/i di hari bahagia kami.
          </p>

          <a 
            href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] tracking-widest uppercase text-[#B26974] hover:text-[#8B3D4A] font-semibold pt-4 inline-block transition-colors cursor-pointer"
          >
            WD DIGITAL INVITATION • PAKET STARTER
          </a>
        </footer>

      </div>

      {/* ================================================================= */}
      {/* BOTTOM FLOATING NAVIGATION BAR (Option A: Rose Gold Pill + ScrollSpy) */}
      {/* ================================================================= */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-white/94 backdrop-blur-lg border border-[#E8B6BA]/70 rounded-full py-1.5 px-2.5 shadow-[0_12px_35px_rgba(200,130,140,0.28)] flex items-center justify-between">
        {[
          { id: 'section-opening', tab: 'opening' as const, label: 'Sampul', icon: Calendar },
          { id: 'section-couple', tab: 'couple' as const, label: 'Mempelai', icon: Heart },
          { id: 'section-story', tab: 'story' as const, label: 'Cerita', icon: Bookmark },
          { id: 'section-event', tab: 'event' as const, label: 'Acara', icon: Clock },
          { id: 'section-gallery', tab: 'gallery' as const, label: 'Galeri', icon: Sparkles },
          { id: 'section-gift', tab: 'gift' as const, label: 'Hadiah', icon: Gift },
          { id: 'section-wishes', tab: 'wishes' as const, label: 'RSVP', icon: MessageCircle },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.tab;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id, item.tab)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-2 sm:px-3 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#66202C] bg-gradient-to-r from-[#FFF0F2] via-[#FDE4E7] to-[#FFF0F2] border border-[#D9949E]/70 shadow-xs font-bold -translate-y-0.5'
                  : 'text-[#8A636B] hover:text-[#332024] hover:bg-rose-50/60'
              }`}
            >
              <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-[#B26974]' : ''}`} />
              <span className={`text-[8px] sm:text-[9px] tracking-wider uppercase mt-0.5 font-medium ${isActive ? 'text-[#66202C] font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#B26974] shadow-[0_0_6px_rgba(178,105,116,0.9)]" />
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
};
export default RoseGoldTheme;
