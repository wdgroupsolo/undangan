import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, Compass, MessageCircle, ChevronDown, 
  CreditCard, ExternalLink, Volume2, VolumeX, Share2, Award
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
          return 'opacity-0 scale-[0.9]';
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
// CORNER ORNAMENT (Art Deco Double Hairline SVG)
// =========================================================================
export const RegalCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 38, className = '' }) => {
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
      {/* Outer hairline border corner */}
      <path d="M 2 46 L 2 12 Q 2 2 12 2 L 46 2" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
      {/* Inner hairline accent */}
      <path d="M 7 42 L 7 14 Q 7 7 14 7 L 42 7" stroke="#F5D77F" strokeWidth="0.8" strokeOpacity="0.5" fill="none" />
      {/* Elegant diamond node */}
      <polygon points="12,12 15,9 12,6 9,9" fill="#E8C36A" opacity="0.9" />
    </svg>
  );
};

// =========================================================================
// GILDED BOTANICAL FLORALS (Ultra-Luxury Gold Rose & Olive Sprigs)
// =========================================================================

// Gilded Rose / Peony Component (Black-Gold Aesthetic)
export const GildedGoldRose: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 46,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`drop-shadow-[0_4px_14px_rgba(212,175,55,0.45)] filter ${className}`}
  >
    <defs>
      <radialGradient id="gildedPetalOuter" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFF9E6" />
        <stop offset="55%" stopColor="#F5D77F" />
        <stop offset="100%" stopColor="#C59B27" />
      </radialGradient>
      <radialGradient id="gildedPetalInner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFDF5" />
        <stop offset="65%" stopColor="#E5C16C" />
        <stop offset="100%" stopColor="#9A7822" />
      </radialGradient>
      <radialGradient id="gildedPistil" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="50%" stopColor="#FFDE6A" />
        <stop offset="100%" stopColor="#7A5A12" />
      </radialGradient>
    </defs>
    {/* Outer 6 gold petals */}
    {[0, 60, 120, 180, 240, 300].map((deg, i) => (
      <path
        key={`gold_outer_${i}`}
        d="M50 50 C28 26, 32 8, 50 10 C68 8, 72 26, 50 50 Z"
        transform={`rotate(${deg} 50 50)`}
        fill="url(#gildedPetalOuter)"
        stroke="#FFEAA7"
        strokeWidth="0.7"
        strokeOpacity="0.9"
      />
    ))}
    {/* Mid 6 gold petals */}
    {[30, 90, 150, 210, 270, 330].map((deg, i) => (
      <path
        key={`gold_mid_${i}`}
        d="M50 50 C36 32, 38 18, 50 20 C62 18, 64 32, 50 50 Z"
        transform={`rotate(${deg} 50 50)`}
        fill="url(#gildedPetalInner)"
        stroke="#D4AF37"
        strokeWidth="0.75"
      />
    ))}
    {/* Core Gold Pistil & Stamens */}
    <circle cx="50" cy="50" r="10" fill="url(#gildedPistil)" stroke="#FFF1BA" strokeWidth="0.8" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((stamenAngle, sIdx) => (
      <g key={`gold_stamen_${sIdx}`} transform={`rotate(${stamenAngle} 50 50)`}>
        <line x1="50" y1="50" x2="50" y2="42" stroke="#FFFDF5" strokeWidth="1.2" />
        <circle cx="50" cy="41" r="1.4" fill="#FFF9E6" stroke="#D4AF37" strokeWidth="0.4" />
      </g>
    ))}
    <circle cx="50" cy="50" r="4" fill="#664E14" opacity="0.9" />
  </svg>
);

// Gilded Botanical Olive & Eucalyptus Branch
export const GildedOliveBranch: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 48,
  rotation = 0,
  className = '',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 80 80"
    style={{ transform: `rotate(${rotation}deg)` }}
    className={`drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)] ${className}`}
  >
    <path d="M12 68 Q40 40 68 12" stroke="#D4AF37" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M26 54 C16 50, 18 38, 28 42 C32 44, 34 52, 26 54 Z" fill="#D4AF37" fillOpacity="0.5" stroke="#F5D77F" strokeWidth="0.8" />
    <path d="M38 42 C30 32, 36 22, 45 26 C48 30, 46 39, 38 42 Z" fill="#E5C16C" fillOpacity="0.55" stroke="#FFEAA7" strokeWidth="0.8" />
    <path d="M50 30 C44 20, 52 14, 58 18 C61 22, 58 28, 50 30 Z" fill="#D4AF37" fillOpacity="0.5" stroke="#F5D77F" strokeWidth="0.8" />
    <path d="M60 20 C58 12, 66 8, 70 12 C72 16, 68 20, 60 20 Z" fill="#E5C16C" fillOpacity="0.55" stroke="#FFEAA7" strokeWidth="0.8" />
  </svg>
);

// High-End Gilded Corner Cluster (Gold Rose + Bud + Olive Branch)
export const GildedFloralCornerCluster: React.FC<{
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
          <GildedOliveBranch size={size * 0.75} rotation={-10} />
        </div>
        <div className="absolute top-5 left-5 opacity-80">
          <GildedOliveBranch size={size * 0.58} rotation={50} />
        </div>
        <div className="absolute top-1 left-1">
          <GildedGoldRose size={size * 0.58} rotation={15} />
        </div>
        <div className="absolute top-8 left-8">
          <GildedGoldRose size={size * 0.36} rotation={65} />
        </div>
      </div>
    </div>
  );
};

// Gilded Arch Garland Crown (Drapes on Couple Arch)
export const GildedArchFloralCrown: React.FC<{ className?: string; size?: number }> = ({ 
  className = '',
  size = 220
}) => (
  <div 
    className={`pointer-events-none select-none flex items-center justify-center -space-x-2 drop-shadow-[0_6px_18px_rgba(212,175,55,0.4)] ${className}`}
    style={{ width: `${size}px` }}
    aria-hidden="true"
  >
    <GildedOliveBranch size={size * 0.22} rotation={-35} />
    <GildedGoldRose size={size * 0.22} rotation={-15} />
    <GildedGoldRose size={size * 0.32} rotation={0} className="z-10 -translate-y-1 scale-105" />
    <GildedGoldRose size={size * 0.22} rotation={15} />
    <GildedOliveBranch size={size * 0.22} rotation={75} />
  </div>
);

// Golden Falling Petals Animation (Subtle Ambient Gold Breeze)
export const GoldenFallingPetals: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      <style>{`
        @keyframes fallAndSwayGold {
          0% { transform: translateY(-40px) translateX(0px) rotate(0deg) scale(0.9); opacity: 0; }
          15% { opacity: 0.85; }
          50% { transform: translateY(50vh) translateX(30px) rotate(160deg) scale(1.05); opacity: 0.9; }
          85% { opacity: 0.7; }
          100% { transform: translateY(105vh) translateX(-20px) rotate(320deg) scale(0.95); opacity: 0; }
        }
      `}</style>
      {[
        { left: '6%', dur: '13s', delay: '0s', size: 15, rotate: '15deg' },
        { left: '20%', dur: '17s', delay: '3.5s', size: 13, rotate: '-25deg' },
        { left: '35%', dur: '15s', delay: '1s', size: 16, rotate: '45deg' },
        { left: '50%', dur: '19s', delay: '5s', size: 12, rotate: '-10deg' },
        { left: '65%', dur: '14s', delay: '2s', size: 16, rotate: '30deg' },
        { left: '80%', dur: '18s', delay: '4s', size: 14, rotate: '-35deg' },
        { left: '92%', dur: '16s', delay: '0.8s', size: 13, rotate: '20deg' },
      ].map((p, idx) => (
        <div
          key={idx}
          className="absolute pointer-events-none select-none drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
          style={{
            left: p.left,
            top: '-30px',
            animation: `fallAndSwayGold ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        >
          <svg width={p.size} height={p.size * 1.3} viewBox="0 0 24 32" fill="none" style={{ transform: `rotate(${p.rotate})` }}>
            <path
              d="M12 2 C18 6, 22 14, 20 22 C18 28, 12 30, 8 28 C3 25, 2 17, 6 10 C8 5, 10 2, 12 2 Z"
              fill="url(#goldPetalGrad)"
              stroke="#FFEAA7"
              strokeWidth="0.75"
              strokeOpacity="0.85"
            />
            <path d="M12 4 C13 12, 12 20, 10 26" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.7" strokeLinecap="round" />
            <defs>
              <linearGradient id="goldPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E6" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#F5D77F" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#C59B27" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

// =========================================================================
// FLOATING GOLDEN STARDUST (Lightweight CSS Particles)
// =========================================================================
export const GoldenStardust: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes floatDust {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-380px) rotate(180deg); opacity: 0; }
        }
      `}</style>
      {[
        { left: '8%', top: '25%', size: 3, dur: '12s', delay: '0s' },
        { left: '22%', top: '65%', size: 2.5, dur: '15s', delay: '3s' },
        { left: '82%', top: '18%', size: 3.5, dur: '11s', delay: '1.5s' },
        { left: '92%', top: '75%', size: 2, dur: '14s', delay: '4s' },
        { left: '48%', top: '45%', size: 2.8, dur: '16s', delay: '2s' },
        { left: '15%', top: '85%', size: 3.2, dur: '13s', delay: '5s' },
        { left: '75%', top: '50%', size: 2.2, dur: '17s', delay: '6s' },
      ].map((p, idx) => (
        <div 
          key={idx}
          className="absolute rounded-full bg-gradient-to-tr from-[#D4AF37] via-[#FFF1BA] to-[#FFE699] shadow-[0_0_8px_rgba(212,175,55,0.7)]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatDust ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

interface NoirGoldThemeProps {
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

export const NoirGoldTheme: React.FC<NoirGoldThemeProps> = ({
  invitation,
  couple,
  events,
  gallery,
  gifts,
  guestName = 'Tamu Undangan',
}) => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'opening' | 'couple' | 'event' | 'gallery' | 'gift' | 'wishes'>('opening');
  
  // Bank Account Copied State
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Gallery Modal Lightbox
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
      message: 'Selamat menempuh hidup baru. Semoga menjadi keluarga sakinah, mawaddah, warahmah serta senantiasa diberkahi kebahagiaan.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: '2',
      name: 'Rian & Sarah',
      message: 'Happy wedding! Semoga cinta kalian selalu bertumbuh dan langgeng sampai maut memisahkan.',
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
        // Fallback demo date 45 days in future so timer is always active and ticking in demo
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

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  // Submit RSVP
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

  // Safe couple display data (default to canonical demo couple Steven & Bunga)
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
      location_name: 'The Grand Ballroom Hotel Heritage',
      address: 'Jl. Jenderal Sudirman Kav. 12, Jakarta Pusat',
      maps_url: 'https://maps.google.com'
    }
  ];

  // Gallery items (Starter tier: 3 curated photos)
  const galleryItems = (gallery && gallery.length >= 3) ? gallery.slice(0, 3) : [
    { id: 'g1', image_url: couplePhoto, caption: 'Janji Suci Dua Hati' },
    { id: 'g2', image_url: '/photos/photo-1.jpg', caption: 'Kisah Kasih Abadi' },
    { id: 'g3', image_url: '/photos/photo-5.jpg', caption: 'Langkah Menuju Hari Bahagia' }
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
    <div className="relative min-h-screen bg-[#0A0B0D] text-stone-100 font-sans selection:bg-[#D4AF37] selection:text-black antialiased">
      
      {/* Background Subtle Noise & Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(212,175,55,0.12),rgba(10,11,13,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(212,175,55,0.08),rgba(10,11,13,0))]" />
      </div>

      {/* Golden Floating Stardust & Falling Petals */}
      <GoldenStardust />
      <GoldenFallingPetals />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-4 pb-28">

        {/* ================================================================= */}
        {/* SECTION 1: HERO / OPENING CARD                                    */}
        {/* ================================================================= */}
        <section id="section-opening" className="min-h-[85vh] flex flex-col items-center justify-center pt-8 pb-12">
          
          <ScrollReveal animation="zoom-in" duration={850} initialVisible={true} className="w-full">
            <div className="relative w-full rounded-[32px] p-4 sm:p-5 bg-gradient-to-b from-[#141519] via-[#0E0F12] to-[#121317] border border-[#D4AF37]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.1)] overflow-hidden">
              
              {/* Double Hairline Inner Border */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-[26px] border border-[#F5D77F]/20 pointer-events-none" />

              {/* Gilded Floral Corner Clusters */}
              <div className="absolute -top-1 -left-1"><GildedFloralCornerCluster position="top-left" size={96} /></div>
              <div className="absolute -top-1 -right-1"><GildedFloralCornerCluster position="top-right" size={96} /></div>
              <div className="absolute -bottom-1 -left-1"><GildedFloralCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute -bottom-1 -right-1"><GildedFloralCornerCluster position="bottom-right" size={96} /></div>

              {/* Regal Four Corners (Hairline Nodes) */}
              <div className="absolute top-3.5 left-3.5 opacity-60"><RegalCorner position="top-left" size={28} /></div>
              <div className="absolute top-3.5 right-3.5 opacity-60"><RegalCorner position="top-right" size={28} /></div>
              <div className="absolute bottom-3.5 left-3.5 opacity-60"><RegalCorner position="bottom-left" size={28} /></div>
              <div className="absolute bottom-3.5 right-3.5 opacity-60"><RegalCorner position="bottom-right" size={28} /></div>

              {/* Content Inside Frame */}
              <div className="relative z-10 flex flex-col items-center text-center px-3 py-6 sm:py-8">
                
                {/* Top Badge: Walimatulurs / The Wedding Of */}
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1A1B20] border border-[#D4AF37]/30 mb-5 shadow-xs">
                  <Sparkles size={12} className="text-[#F5D77F]" />
                  <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.28em] text-[#E5C16C] font-semibold">
                    The Wedding Celebration
                  </span>
                  <Sparkles size={12} className="text-[#F5D77F]" />
                </div>

                {/* Couple Prewedding Photo in Arch/Oval Gold Frame with Gilded Floral Crown */}
                <div className="relative mb-6">
                  {/* Floral Crown Atop Frame */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <GildedArchFloralCrown size={200} />
                  </div>
                  {/* Base Botanical Leaves */}
                  <div className="absolute -bottom-2 -left-3 z-15 pointer-events-none">
                    <GildedOliveBranch size={40} rotation={-15} />
                  </div>
                  <div className="absolute -bottom-2 -right-3 z-15 pointer-events-none">
                    <GildedOliveBranch size={40} rotation={75} />
                  </div>

                  <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-[#F5D77F] via-[#D4AF37] to-[#8A6A1E] shadow-[0_10px_35px_rgba(0,0,0,0.7)] group">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img 
                        src={couplePhoto} 
                        alt={`${groomName} & ${brideName}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Couple Names */}
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#FFF1BA] via-[#ECC880] to-[#C99E3D] bg-clip-text text-transparent drop-shadow-sm mb-2">
                  {groomName} &amp; {brideName}
                </h1>

                {/* Wedding Date in Gold Label */}
                <p className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#D1D5DB] mb-6 font-medium">
                  {new Date(weddingDateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>

                {/* Guest Greeting Pill */}
                <div className="w-full max-w-xs p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/25 backdrop-blur-xs mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#F5D77F] block truncate">
                    {guestName}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm pt-2 border-t border-[#D4AF37]/20">
                  {[
                    { label: 'Hari', val: timeLeft.days },
                    { label: 'Jam', val: timeLeft.hours },
                    { label: 'Menit', val: timeLeft.minutes },
                    { label: 'Detik', val: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-gradient-to-b from-[#18191E] to-[#0E0F12] border border-[#D4AF37]/30 shadow-inner"
                    >
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#F5D77F]">
                        {String(item.val).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-stone-400 font-semibold mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </ScrollReveal>

          {/* Scroll Down Prompt */}
          <div className="flex flex-col items-center gap-1.5 mt-6 text-[#D4AF37]/70 animate-bounce">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll Ke Bawah</span>
            <ChevronDown size={14} />
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 2: GREETING & AYAT SUCI                                   */}
        {/* ================================================================= */}
        <section id="section-greeting" className="py-8">
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="relative rounded-3xl p-6 sm:p-8 bg-[#121317] border border-[#D4AF37]/30 shadow-xl text-center">
              
              <div className="absolute top-2.5 left-2.5"><RegalCorner position="top-left" size={26} /></div>
              <div className="absolute top-2.5 right-2.5"><RegalCorner position="top-right" size={26} /></div>
              <div className="absolute bottom-2.5 left-2.5"><RegalCorner position="bottom-left" size={26} /></div>
              <div className="absolute bottom-2.5 right-2.5"><RegalCorner position="bottom-right" size={26} /></div>

              {/* Bismillah Calligraphy */}
              <div className="text-xl sm:text-2xl font-serif text-[#F5D77F] mb-4 tracking-wider">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </div>

              <h2 className="font-serif text-lg sm:text-xl font-bold text-white mb-3">
                Assalamu’alaikum Warahmatullahi Wabarakatuh
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-md mx-auto mb-6">
                Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta’ala, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:
              </p>

              {/* Quran Verse Card */}
              <div className="p-4 rounded-2xl bg-black/40 border border-[#D4AF37]/20 text-stone-300 italic text-xs leading-relaxed">
                &ldquo;Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                <span className="block mt-2 font-serif font-semibold text-[#ECC880] not-italic text-[11px] tracking-wider uppercase">
                  QS. Ar-Rum: 21
                </span>
              </div>

            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: PROFIL MEMPELAI (THE COUPLE)                           */}
        {/* ================================================================= */}
        <section id="section-couple" className="py-8 space-y-6">
          
          <div className="text-center space-y-1 mb-2">
            <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Mempelai Bahagia
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              The Happy Couple
            </h3>
          </div>

          {/* Groom Card */}
          <ScrollReveal animation="slide-left" duration={800}>
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#141519] to-[#0E0F12] border border-[#D4AF37]/35 shadow-lg flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left overflow-hidden">
              {/* Corner Floral Accent */}
              <div className="absolute -top-1 -left-1"><GildedFloralCornerCluster position="top-left" size={68} /></div>

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFF1BA] to-[#9F7824] shadow-md z-10">
                <img 
                  src={groomPhoto} 
                  alt={groomFullName} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="space-y-1.5 flex-1 relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#1F2026] text-[#F5D77F] text-[10px] font-bold uppercase tracking-wider border border-[#D4AF37]/30">
                  Pengantin Pria
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  {groomFullName}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {groomParents}
                </p>
                <div className="pt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#E5C16C] hover:text-[#FFF1BA] transition-colors"
                  >
                    <InstagramIcon size={13} />
                    <span>@{groomName.toLowerCase()}</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* & Ampersand Divider with Gilded Roses */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
            <GildedGoldRose size={26} rotation={-20} />
            <div className="w-10 h-10 rounded-full bg-[#18191E] border border-[#D4AF37]/50 flex items-center justify-center font-serif text-lg font-bold text-[#F5D77F] shadow-md">
              &amp;
            </div>
            <GildedGoldRose size={26} rotation={20} />
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
          </div>

          {/* Bride Card */}
          <ScrollReveal animation="slide-right" duration={800}>
            <div className="relative rounded-3xl p-6 bg-gradient-to-b from-[#141519] to-[#0E0F12] border border-[#D4AF37]/35 shadow-lg flex flex-col sm:flex-row-reverse items-center gap-5 text-center sm:text-right overflow-hidden">
              {/* Corner Floral Accent */}
              <div className="absolute -top-1 -right-1"><GildedFloralCornerCluster position="top-right" size={68} /></div>

              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden shrink-0 p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFF1BA] to-[#9F7824] shadow-md z-10">
                <img 
                  src={bridePhoto} 
                  alt={brideFullName} 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="space-y-1.5 flex-1 relative z-10">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#1F2026] text-[#F5D77F] text-[10px] font-bold uppercase tracking-wider border border-[#D4AF37]/30">
                  Pengantin Wanita
                </span>
                <h4 className="font-serif text-xl font-bold text-white">
                  {brideFullName}
                </h4>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {brideParents}
                </p>
                <div className="pt-2">
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#E5C16C] hover:text-[#FFF1BA] transition-colors"
                  >
                    <InstagramIcon size={13} />
                    <span>@{brideName.toLowerCase()}</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </section>

        {/* ================================================================= */}
        {/* SECTION 4: DETAIL ACARA (AKAD & RESEPSI)                          */}
        {/* ================================================================= */}
        <section id="section-event" className="py-8 space-y-6">
          
          <div className="text-center space-y-1 mb-2">
            <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Agenda Sakral
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Waktu &amp; Tempat Acara
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {mainEvents.map((evt, idx) => (
              <ScrollReveal key={evt.id || idx} animation="fade-up" delay={idx * 150} duration={800}>
                <div className="relative rounded-3xl p-6 bg-[#131418] border border-[#D4AF37]/35 shadow-xl">
                  
                  {/* Top Header of Event Card */}
                  <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/20 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-[#1E1F26] text-[#F5D77F] flex items-center justify-center border border-[#D4AF37]/30">
                        <Clock size={16} />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-white">
                        {evt.title || evt.event_name || evt.name || (idx === 0 ? 'Akad Nikah' : 'Resepsi Pernikahan')}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono tracking-wider text-[#F5D77F] uppercase bg-[#1A1B22] px-2.5 py-1 rounded-md border border-[#D4AF37]/30">
                      WIB
                    </span>
                  </div>

                  {/* Date & Time */}
                  <div className="space-y-3 mb-5 text-xs sm:text-sm text-stone-300">
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-white">
                          {evt.date || (evt.event_date ? new Date(evt.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Sabtu, 26 Desember 2026')}
                        </span>
                        <span className="text-stone-400 text-xs">
                          {evt.time || (evt.start_time ? `${evt.start_time} - ${evt.end_time || 'Selesai'} WIB` : '09:00 - 12:00 WIB')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block text-white">
                          {evt.location_name || evt.venue_name || evt.location || 'Gedung Pertemuan Utama'}
                        </span>
                        <span className="text-stone-400 text-xs leading-relaxed">
                          {evt.address || evt.location_address || 'Jl. Utama No. 12, Kota Surakarta'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions: Google Maps */}
                  <div className="pt-2">
                    <a
                      href={evt.maps_url || evt.google_maps_url || evt.maps_link || 'https://maps.google.com'}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#24252D] to-[#17181F] hover:from-[#2E303A] hover:to-[#202129] text-[#F5D77F] font-bold text-xs flex items-center justify-center gap-2 border border-[#D4AF37]/40 shadow-xs transition-all active:scale-95"
                    >
                      <MapPin size={14} />
                      <span>Petunjuk Lokasi Google Maps</span>
                      <ExternalLink size={13} />
                    </a>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 5: CURATED MINI GALLERY (3 FOTO PILIHAN)                  */}
        {/* ================================================================= */}
        <section id="section-gallery" className="py-8 space-y-5">
          
          <div className="text-center space-y-1 mb-2">
            <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Potret Kenangan
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Galeri Momen Indah
            </h3>
          </div>

          <ScrollReveal animation="zoom-in" duration={800}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              
              {/* Photo 1: Big Vertical Highlight (Col-Span 2) */}
              <div 
                onClick={() => setSelectedPhoto(galleryItems[0]?.image_url)}
                className="col-span-2 relative aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#D4AF37]/50 via-[#1A1B22] to-[#D4AF37]/30 cursor-pointer group shadow-lg"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={galleryItems[0]?.image_url} 
                    alt="Gallery 1" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <span className="font-serif text-xs text-[#F5D77F] font-medium tracking-wide">
                      {galleryItems[0]?.caption || 'Janji Suci Dua Hati'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo 2 */}
              <div 
                onClick={() => setSelectedPhoto(galleryItems[1]?.image_url)}
                className="relative aspect-square rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#D4AF37]/40 via-[#1A1B22] to-[#D4AF37]/20 cursor-pointer group shadow-md"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={galleryItems[1]?.image_url} 
                    alt="Gallery 2" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                    <span className="font-serif text-[11px] text-[#F5D77F] font-medium truncate">
                      {galleryItems[1]?.caption || 'Kisah Kasih'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Photo 3 */}
              <div 
                onClick={() => setSelectedPhoto(galleryItems[2]?.image_url)}
                className="relative aspect-square rounded-2xl overflow-hidden p-1 bg-gradient-to-b from-[#D4AF37]/40 via-[#1A1B22] to-[#D4AF37]/20 cursor-pointer group shadow-md"
              >
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img 
                    src={galleryItems[2]?.image_url} 
                    alt="Gallery 3" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-3">
                    <span className="font-serif text-[11px] text-[#F5D77F] font-medium truncate">
                      {galleryItems[2]?.caption || 'Langkah Bersama'}
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </ScrollReveal>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div 
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
            >
              <div className="relative max-w-2xl max-h-[90vh] rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-2xl">
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
        {/* SECTION 6: VIP BLACK GOLD DIGITAL ENVELOPE                        */}
        {/* ================================================================= */}
        <section id="section-gift" className="py-8 space-y-6">
          
          <div className="text-center space-y-1 mb-2">
            <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Tanda Kasih
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Amplop Digital &amp; Kado
            </h3>
            <p className="text-xs text-stone-400 max-w-sm mx-auto pt-1 leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Bagi yang ingin memberikan tanda kasih secara cashless:
            </p>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((acc, idx) => (
              <ScrollReveal key={acc.id || idx} animation="fade-up" delay={idx * 150} duration={800}>
                {/* VIP Black Gold Card Design (Simulated Titanium Priority Card) */}
                <div className="relative rounded-3xl p-6 bg-gradient-to-br from-[#1A1B22] via-[#101115] to-[#16171E] border border-[#D4AF37]/45 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.1)] overflow-hidden">
                  
                  {/* Subtle Card Shimmer Background */}
                  <div className="absolute -right-16 -top-16 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

                  {/* Top Bar of Card */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <CreditCard size={18} className="text-[#F5D77F]" />
                      <span className="font-serif text-xs font-bold tracking-[0.2em] uppercase text-[#F5D77F]">
                        PRIORITY WEDDING GIFT
                      </span>
                    </div>
                    <span className="font-serif font-bold text-sm text-white px-3 py-1 rounded-lg bg-[#24252E] border border-[#D4AF37]/30">
                      {acc.bank_name}
                    </span>
                  </div>

                  {/* Simulated Gold EMV Chip */}
                  <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#9F7824] via-[#F5D77F] to-[#D4AF37] border border-[#FFE8A3] shadow-inner mb-4 relative z-10 flex items-center justify-center">
                    <div className="w-8 h-5 border border-black/30 rounded-xs" />
                  </div>

                  {/* Account Number & Copy Button */}
                  <div className="relative z-10 space-y-1 mb-4">
                    <span className="text-[10px] tracking-widest uppercase text-stone-400 block font-mono">
                      Nomor Rekening
                    </span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-lg sm:text-xl font-bold tracking-wider text-white">
                        {acc.account_number}
                      </span>
                      <button
                        onClick={() => handleCopy(acc.account_number, acc.id || String(idx))}
                        className="py-1.5 px-3 rounded-xl bg-[#24252E] hover:bg-[#2E303B] text-[#F5D77F] font-bold text-xs flex items-center gap-1.5 border border-[#D4AF37]/40 transition-all active:scale-95 cursor-pointer shrink-0"
                      >
                        {copiedAccount === (acc.id || String(idx)) ? (
                          <>
                            <Check size={13} className="text-emerald-400" />
                            <span className="text-emerald-400">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy size={13} />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Account Holder Name */}
                  <div className="relative z-10 pt-2 border-t border-[#D4AF37]/20 flex justify-between items-center text-xs">
                    <span className="text-stone-400 text-[10px] uppercase tracking-wider">Atas Nama:</span>
                    <span className="font-serif font-bold text-stone-200 uppercase tracking-wide">
                      {acc.account_holder}
                    </span>
                  </div>

                </div>
              </ScrollReveal>
            ))}
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 7: BUKU UCAPAN & RSVP DIGITAL                             */}
        {/* ================================================================= */}
        <section id="section-wishes" className="py-8 space-y-6">
          
          <div className="text-center space-y-1 mb-2">
            <span className="text-[10px] uppercase font-serif tracking-[0.3em] text-[#D4AF37] font-semibold block">
              Doa &amp; Kehadiran
            </span>
            <h3 className="font-serif text-2xl font-bold text-white">
              Buku Tamu &amp; RSVP
            </h3>
          </div>

          {/* RSVP Form Card */}
          <ScrollReveal animation="fade-up" duration={800}>
            <div className="rounded-3xl p-6 bg-[#131418] border border-[#D4AF37]/35 shadow-xl">
              
              <form onSubmit={handleSubmitRsvp} className="space-y-4">
                
                {/* Guest Name Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">
                    Nama Anda
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Tuliskan nama Anda"
                    required
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#0E0F12] border border-[#D4AF37]/30 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5D77F] transition-colors"
                  />
                </div>

                {/* Attendance Radio Options */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'attending', label: 'Hadir' },
                      { key: 'uncertain', label: 'Ragu-ragu' },
                      { key: 'absent', label: 'Tidak Hadir' },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        type="button"
                        onClick={() => setRsvpStatus(opt.key as any)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all border ${
                          rsvpStatus === opt.key
                            ? 'bg-[#D4AF37] text-black border-[#F5D77F] shadow-xs'
                            : 'bg-[#18191E] text-stone-400 border-stone-800 hover:border-stone-700'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Number of Guests */}
                {rsvpStatus === 'attending' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-stone-300 block">
                      Jumlah Tamu Hadir
                    </label>
                    <select
                      value={rsvpCount}
                      onChange={(e) => setRsvpCount(Number(e.target.value))}
                      className="w-full py-2.5 px-3.5 rounded-xl bg-[#0E0F12] border border-[#D4AF37]/30 text-white text-xs focus:outline-none focus:border-[#F5D77F]"
                    >
                      <option value={1}>1 Orang</option>
                      <option value={2}>2 Orang</option>
                      <option value={3}>3 Orang</option>
                      <option value={4}>4 Orang</option>
                    </select>
                  </div>
                )}

                {/* Wishes Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-stone-300 block">
                    Untaian Doa &amp; Ucapan
                  </label>
                  <textarea 
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                    required
                    className="w-full py-2.5 px-3.5 rounded-xl bg-[#0E0F12] border border-[#D4AF37]/30 text-white placeholder-stone-500 text-xs focus:outline-none focus:border-[#F5D77F] transition-colors resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#B38F24] hover:from-[#ECC880] hover:to-[#C99E3D] text-black font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-60 cursor-pointer"
                >
                  <Send size={14} />
                  <span>{isSubmittingRsvp ? 'Mengirimkan...' : 'Kirim Ucapan &amp; Konfirmasi'}</span>
                </button>

                {rsvpSuccess && (
                  <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs text-center font-medium animate-fade-in">
                    Terima kasih, doa dan konfirmasi kehadiran Anda telah tersimpan.
                  </div>
                )}

              </form>

            </div>
          </ScrollReveal>

          {/* Wishes Feed */}
          <div className="space-y-3 pt-2">
            <h4 className="font-serif text-sm font-bold text-[#F5D77F] tracking-wide flex items-center gap-2">
              <MessageCircle size={15} />
              <span>Untaian Doa Tamu ({wishes.length})</span>
            </h4>

            <div className="space-y-2.5 max-h-80 overflow-y-auto no-scrollbar pr-1">
              {wishes.map((w) => (
                <div 
                  key={w.id} 
                  className="p-3.5 rounded-2xl bg-[#121317] border border-[#D4AF37]/20 shadow-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-serif font-bold text-white">{w.name}</span>
                    <span className="text-[10px] text-stone-500">{w.date}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {w.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 8: PENUTUP & FOOTER                                       */}
        {/* ================================================================= */}
        <footer className="pt-8 pb-4 text-center space-y-4 border-t border-[#D4AF37]/20">
          
          <div className="space-y-2">
            <p className="text-xs text-stone-400 max-w-sm mx-auto leading-relaxed">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
            </p>
            <p className="font-serif text-sm font-bold text-stone-200">
              Wassalamu’alaikum Warahmatullahi Wabarakatuh
            </p>
            <p className="font-serif text-base font-bold text-[#F5D77F] pt-1">
              Kami yang berbahagia,
            </p>
            <p className="font-serif text-lg font-bold text-white">
              {groomName} &amp; {brideName}
            </p>
            <p className="text-[11px] text-stone-500">
              Beserta segenap keluarga besar kedua mempelai
            </p>
          </div>

          {/* Brand Watermark */}
          <div className="pt-6 border-t border-stone-800/80 flex flex-col items-center gap-1.5 text-stone-500 text-[10px]">
            <GildedGoldRose size={24} className="opacity-80" />
            <a 
              href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-serif font-bold text-[11px] text-[#E5C16C] hover:text-[#ffd778] tracking-[0.25em] uppercase transition-colors cursor-pointer"
            >
              WD DIGITAL INVITATION • PAKET STARTER
            </a>
          </div>

        </footer>

      </div>

      {/* ================================================================= */}
      {/* FLOATING BOTTOM NAVIGATION BAR (Option A: Noir Gold Pill + ScrollSpy) */}
      {/* ================================================================= */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[94%] max-w-lg bg-[#141519]/95 backdrop-blur-lg border border-[#D4AF37]/50 rounded-full py-1.5 px-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(212,175,55,0.2)] flex items-center justify-between">
        {[
          { id: 'section-opening', tab: 'opening' as const, label: 'Sampul', icon: Calendar },
          { id: 'section-couple', tab: 'couple' as const, label: 'Mempelai', icon: Heart },
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
              className={`relative flex flex-col items-center justify-center py-1.5 px-2.5 sm:px-3.5 rounded-full transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'text-[#FFF1BA] bg-gradient-to-b from-[#2A2B35] to-[#181920] border border-[#D4AF37]/65 shadow-[0_0_14px_rgba(212,175,55,0.3)] font-bold -translate-y-0.5'
                  : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
              }`}
            >
              <Icon size={16} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-[#F5D77F]' : ''}`} />
              <span className={`text-[8px] sm:text-[9px] tracking-wider uppercase mt-0.5 font-medium ${isActive ? 'text-[#FFF1BA] font-bold' : ''}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#F5D77F] shadow-[0_0_8px_rgba(245,215,127,0.9)]" />
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
};
export default NoirGoldTheme;
