import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, Heart, Clock, Sparkles, Copy, Check, 
  ChevronDown, MessageCircle, Send, Music, Volume2, VolumeX,
  CreditCard, Gift, User, Phone, Share2, Download, Info,
  ChevronLeft, ChevronRight, Play, Pause, Camera, RefreshCw, X,
  Maximize2, Eye, ShieldCheck, Shirt, ExternalLink, QrCode, Barcode,
  Crown, Compass, Wine, Gem, Award, Package, Wifi
} from 'lucide-react';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode, clearBarcodePass } from '../../../utils/barcodePass';

// =========================================================================
// SCROLL REVEAL COMPONENT (Optimized for Mobile & Desktop Performance)
// =========================================================================
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'zoom-in' | 'fade-in' | 'slide-left' | 'slide-right';
  delay?: number;
  duration?: number;
  className?: string;
  initialVisible?: boolean;
}> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  initialVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;
    const el = ref.current;
    if (!el) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight * 0.92 && rect.bottom >= 0) {
        setIsVisible(true);
        return true;
      }
      return false;
    };

    if (checkVisibility()) return;

    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.05, rootMargin: '0px 0px 40px 0px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    const handleScroll = () => {
      if (checkVisibility()) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveDuration = isMobile ? Math.min(duration, 400) : duration;
  const effectiveDelay = isMobile ? Math.min(delay, 50) : delay;

  const getAnimClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up': return isMobile ? 'opacity-0 translate-y-4' : 'opacity-0 translate-y-8';
        case 'fade-down': return isMobile ? 'opacity-0 -translate-y-4' : 'opacity-0 -translate-y-8';
        case 'zoom-in': return 'opacity-0 scale-95';
        case 'slide-left': return isMobile ? 'opacity-0 translate-x-4' : 'opacity-0 translate-x-8';
        case 'slide-right': return isMobile ? 'opacity-0 -translate-x-4' : 'opacity-0 -translate-x-8';
        case 'fade-in': default: return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={ref}
      style={{
        transitionDuration: `${effectiveDuration}ms`,
        transitionDelay: `${effectiveDelay}ms`,
      }}
      className={`transition-all ease-out transform-gpu ${getAnimClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// =========================================================================
// FLOATING BURGUNDY GOLDEN STARDUST (Ambient Velvet Embers over Content)
// =========================================================================
export const FloatingBurgundyStardust: React.FC<{ count?: number }> = ({ count = 28 }) => {
  const [particles] = useState(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i * 100) / count + (Math.random() * 6 - 3)}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
      color: i % 3 === 0 ? '#B88B4A' : i % 3 === 1 ? '#D4AF37' : '#F5E5C9',
      opacity: Math.random() * 0.6 + 0.25,
      symbol: i % 4 === 0 ? '✦' : i % 4 === 1 ? '•' : i % 4 === 2 ? '★' : '✧'
    }));
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      <style>{`
        @keyframes burgundyFloat {
          0% { transform: translateY(0px) rotate(0deg) scale(0.8); opacity: 0.2; }
          50% { transform: translateY(-40px) rotate(180deg) scale(1.15); opacity: 0.85; }
          100% { transform: translateY(-80px) rotate(360deg) scale(0.8); opacity: 0.15; }
        }
      `}</style>
      {particles.map(p => (
        <span
          key={p.id}
          className="absolute font-serif"
          style={{
            left: p.left,
            top: p.top,
            fontSize: `${p.size * 3}px`,
            color: p.color,
            opacity: p.opacity,
            animation: `burgundyFloat ${p.duration}s ease-in-out infinite`,
            animationDelay: `${p.delay}s`,
            textShadow: `0 0 10px ${p.color}88, 0 0 20px rgba(184,139,74,0.4)`
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};

// =========================================================================
// GUILLOCHE ROYAL BURGUNDY WATERMARK
// =========================================================================
export const GuillocheBurgundyWatermark: React.FC<{ opacity?: number }> = ({ opacity = 0.07 }) => (
  <div 
    className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" 
    style={{ opacity }}
  >
    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
      <defs>
        <pattern id="guillocheBurgundyPattern" width="70" height="70" patternUnits="userSpaceOnUse">
          <ellipse cx="35" cy="35" rx="30" ry="18" fill="none" stroke="#B88B4A" strokeWidth="0.6" strokeDasharray="2,2" />
          <ellipse cx="35" cy="35" rx="18" ry="30" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="2,2" />
          <circle cx="35" cy="35" r="14" fill="none" stroke="#B88B4A" strokeWidth="0.5" />
          <circle cx="35" cy="35" r="5" fill="none" stroke="#F5E5C9" strokeWidth="0.4" />
          <circle cx="35" cy="35" r="1.5" fill="#B88B4A" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guillocheBurgundyPattern)" />
    </svg>
  </div>
);

// =========================================================================
// BAROQUE ANTIQUE BRONZE / GOLD CORNER FLOURISH
// =========================================================================
export const BurgundyBaroqueCornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 52, className = '' }) => {
  const getRotation = () => {
    switch (position) {
      case 'top-left': return 'rotate(0deg)';
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
    }
  };

  return (
    <div 
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: getRotation(), width: size, height: size }}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
        <path
          d="M 12 12 Q 50 14, 88 12 Q 86 46, 88 88 Q 54 86, 12 88 Q 14 50, 12 12 Z"
          stroke="#B88B4A"
          strokeWidth="1.2"
          fill="none"
          strokeDasharray="2,3"
        />
        <path
          d="M 6 6 L 36 6 Q 16 16, 6 36 Z"
          fill="url(#burgundyGoldGrad)"
          opacity="0.8"
        />
        <path
          d="M 10 10 C 22 24, 34 20, 48 10 C 20 34, 24 22, 10 48 Z"
          fill="#D4AF37"
          opacity="0.6"
        />
        <circle cx="16" cy="16" r="3.5" fill="#B88B4A" />
        <circle cx="16" cy="16" r="1.5" fill="#FFF7F8" />
        <defs>
          <linearGradient id="burgundyGoldGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#B88B4A" />
            <stop offset="100%" stopColor="#80182A" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

// =========================================================================
// BURGUNDY GOLD FILIGREE DIVIDER
// =========================================================================
export const BurgundyGoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center my-4 select-none ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#B88B4A] to-transparent" />
    <div className="mx-2.5 flex items-center gap-1.5">
      <span className="text-[#B88B4A] text-xs">✦</span>
      <div className="w-2.5 h-2.5 rotate-45 border border-[#B88B4A] bg-[#2A060C] shadow-[0_0_8px_rgba(184,139,74,0.6)]" />
      <span className="text-[#B88B4A] text-xs">✦</span>
    </div>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#B88B4A] to-transparent" />
  </div>
);

// =========================================================================
// BURGUNDY CAMEO OVAL ARCH FRAME (Victorian Oval & Wax Seal Medallion)
// =========================================================================
export const BurgundyCameoFrame: React.FC<{
  imageSrc: string;
  altText: string;
  className?: string;
  frameWidthClass?: string;
  frameHeightClass?: string;
}> = ({
  imageSrc,
  altText,
  className = '',
  frameWidthClass = 'w-48 sm:w-56',
  frameHeightClass = 'h-64 sm:h-76',
}) => {
  const getCleanPhoto = (src: string) => {
    if (!src || src.includes('photo-3.jpg') || src.includes('theme-preview.jpg') || src.includes('nirwana')) {
      return '/photos/photo-7.jpg';
    }
    return src;
  };

  const [imgSrc, setImgSrc] = useState(getCleanPhoto(imageSrc));

  useEffect(() => {
    if (imageSrc) {
      setImgSrc(getCleanPhoto(imageSrc));
    }
  }, [imageSrc]);

  return (
    <div className={`relative mx-auto ${frameWidthClass} ${frameHeightClass} flex items-center justify-center group ${className}`}>
      {/* Outer Bordeaux Velvet Halo Glow */}
      <div className="absolute -inset-4 rounded-[42px] bg-gradient-to-tr from-[#801636]/40 via-transparent to-[#D4AF37]/30 blur-xl pointer-events-none" />

      {/* Antique Gold Outer Orbit Dashed Line */}
      <div className="absolute -inset-2.5 rounded-[36px] border border-[#E5C57B]/35 border-dashed pointer-events-none" />

      {/* Main Image Container with Arched Royal Cameo Dome */}
      <div className="relative w-full h-full rounded-t-[100px] rounded-b-[28px] p-[2.5px] bg-gradient-to-b from-[#F5E5C9] via-[#D4AF37] to-[#4A0B1F] shadow-[0_18px_45px_rgba(25,3,10,0.85)] overflow-hidden">
        <div className="w-full h-full rounded-t-[98px] rounded-b-[26px] overflow-hidden relative bg-[#1A040B]">
          <img
            src={imgSrc}
            alt={altText}
            onError={() => {
              if (imgSrc !== '/photos/photo-7.jpg') setImgSrc('/photos/photo-7.jpg');
            }}
            className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95 contrast-[1.02]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A040B]/70 via-transparent to-[#1A040B]/20 pointer-events-none" />

          {/* Subtle Metallic Golden Sheen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-[#E5C57B]/25 to-transparent pointer-events-none"
              style={{ animation: 'burgundySheen 6s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>

      {/* Apex Antique Gold Medallion Crown Crest */}
      <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none flex flex-col items-center w-max">
        <div className="relative w-10 h-10 rounded-full bg-[#1F050E]/95 border border-[#E5C57B] shadow-[0_6px_18px_rgba(25,3,10,0.9)] flex items-center justify-center">
          <Crown className="w-4.5 h-4.5 text-[#E5C57B]" />
        </div>
      </div>

      {/* Bottom Wax Seal Badge (strict single-line pill so it never wraps or overlaps text below) */}
      <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none w-max max-w-[95vw]">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B0713]/95 border border-[#E5C57B]/75 text-[9.5px] font-serif tracking-wider text-[#F5E5C9] shadow-lg whitespace-nowrap">
          <Wine className="w-3 h-3 text-[#E5C57B] shrink-0" />
          <span className="whitespace-nowrap">ROYAL BORDEAUX ∞</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// EMV SMART CHIP COMPONENT FOR VELVET DIGITAL CARDS
// =========================================================================
export const EMVBurgundySmartChip: React.FC = () => (
  <div className="relative w-9 h-7 rounded-md bg-gradient-to-br from-[#D4AF37] via-[#B88B4A] to-[#80182A] p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-[#D4AF37]/50">
    <div className="w-full h-full rounded-sm border border-black/30 flex flex-col justify-between p-[2px]">
      <div className="flex justify-between w-full h-[3px]">
        <div className="w-2 border-b border-black/30" />
        <div className="w-2 border-b border-black/30" />
      </div>
      <div className="w-full h-[1px] bg-black/25" />
      <div className="flex justify-between w-full h-[3px]">
        <div className="w-2 border-t border-black/30" />
        <div className="w-2 border-t border-black/30" />
      </div>
    </div>
  </div>
);

// =========================================================================
// PROPS INTERFACE
// =========================================================================
interface BurgundyWineThemeProps {
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

interface CalendarEventData {
  title: string;
  description: string;
  location: string;
  startTime: string;
  endTime: string;
}

// =========================================================================
// MAIN BURGUNDY WINE CLASSIC THEME COMPONENT
// =========================================================================
export const BurgundyWineTheme: React.FC<BurgundyWineThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  music,
  guestName = 'Tamu Undangan',
  isOpening = true,
}) => {
  // Names & Parents
  const groomName = couple?.groom_name || 'Steven';
  const brideName = couple?.bride_name || 'Bunga';
  const groomFullName = couple?.groom_full_name || 'Steven Christian Wijaya, S.E.';
  const brideFullName = couple?.bride_full_name || 'Bunga Citra Lestari, S.E.';
  const groomParents = couple?.groom_parents || 'Putra sulung dari Bpk. Hadi Wijaya & Ibu Linda Handayani';
  const brideParents = couple?.bride_parents || 'Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const groomInstagram = couple?.groom_instagram || 'steven_wijaya';
  const brideInstagram = couple?.bride_instagram || 'bunga_lestari';

  // Photos
  const rawCouplePhoto = invitation?.settings?.cover_photo || couple?.cover_photo_url || couple?.cover_photo || couple?.couple_photo || '';
  const couplePhoto = (rawCouplePhoto && !rawCouplePhoto.includes('photo-3.jpg') && !rawCouplePhoto.includes('theme-preview.jpg') && !rawCouplePhoto.includes('nirwana'))
    ? rawCouplePhoto
    : '/photos/photo-7.jpg';
  const coverImage = invitation?.cover_image || couplePhoto;
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/photo-7.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/photo-4.jpg';

  // Section Tracking for Bottom Dock
  const [activeSection, setActiveSection] = useState('sampul');
  const navContainerRef = useRef<HTMLDivElement | null>(null);

  // Dresscode State
  const [attireGender, setAttireGender] = useState<'gentlemen' | 'ladies'>('gentlemen');
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);

  // Gift Tab State
  const [giftTab, setGiftTab] = useState<'transfer' | 'physical'>('transfer');
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Calendar Reminder Modal
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<CalendarEventData | null>(null);

  // Gallery Fullscreen Lightbox & Tabs
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'prewedding' | 'ceremony' | 'reception'>('all');

  // AR Photobooth Camera Modal State (150k/250k VIP Feature)
  const [isCameraModalOpen, setIsCameraModalOpen] = useState(false);
  const [photoboothMode, setPhotoboothMode] = useState<'choice' | 'camera' | 'uploaded-preview'>('choice');
  const [uploadedRawImage, setUploadedRawImage] = useState<string | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isStoryGuideOpen, setIsStoryGuideOpen] = useState(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraFacingMode, setCameraFacingMode] = useState<'user' | 'environment'>('user');
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);
  const [snapshotNotification, setSnapshotNotification] = useState<{ visible: boolean; url: string } | null>(null);
  const [isFlashing, setIsFlashing] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // VIP Barcode Pass (250k Masterpiece Tier)
  const isDemo = true;
  const [savedPass, setSavedPass] = useState<any>(null);
  const [showBarcodePreview, setShowBarcodePreview] = useState(true);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'ragu' | 'tidak_hadir'>('hadir');
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpList, setRsvpList] = useState<Array<{ name: string; attendance: string; message: string; timestamp: string }>>([
    { name: 'Dr. Raymond Surya & Keluarga', attendance: 'attending', message: 'Selamat untuk Steven & Bunga! Semoga pernikahan senantiasa dipenuhi kehangatan dan kebahagiaan abadi.', timestamp: '10 menit lalu' },
    { name: 'Clarissa & Jonathan', attendance: 'attending', message: 'Happy wedding! Ga sabar hadir di pesta resepsi anggun Bordeaux Grand Ballroom.', timestamp: '35 menit lalu' },
    { name: 'Keluarga Besar Wijaya (Surabaya)', attendance: 'attending', message: 'Matur suksma dan selamat menempuh hidup baru berdua. Berkah melimpah.', timestamp: '1 jam lalu' },
    { name: 'Amanda Putri, S.Ds.', attendance: 'attending', message: 'A truly magnificent wedding! Selamat Bunga sayang dan Steven, langgeng sampai kakek nenek.', timestamp: '3 jam lalu' },
  ]);

  // Load Stored VIP Pass
  useEffect(() => {
    const existing = loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'burgundy');
    if (existing) setSavedPass(existing);
  }, [invitation?.id, invitation?.slug, guestName]);

  const activeBarcodePass = savedPass || {
    code: 'WD-WINE-9842',
    name: guestName,
    guests: 2,
    table: 'Table 01 - Bordeaux Grand Ballroom',
    gate: 'Pintu Masuk Sayap Barat (Palace Lobby)',
    status: 'CONFIRMED'
  };

  // Section Observer for Dynamic Floating Pill Dock
  useEffect(() => {
    const sectionIds = [
      'sampul', 'mempelai', 'acara', 'dresscode', 'concierge',
      'kisah', 'galeri', 'photobooth', 'kado', 'vip-pass'
    ];

    const handleScroll = () => {
      const triggerY = window.innerHeight * 0.42;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY && rect.bottom >= 80) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll active nav item into center view on mobile/narrow screens
  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        const container = navContainerRef.current;
        const scrollLeft = activeEl.offsetLeft - (container.offsetWidth / 2) + (activeEl.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }
  }, [activeSection]);

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 48, hours: 14, minutes: 22, seconds: 40 });
  useEffect(() => {
    const targetDate = events[0]?.event_date 
      ? new Date(events[0].event_date).getTime() 
      : new Date('2026-10-12T09:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [events]);

  // Handle Copy to Clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    setTimeout(() => setIsCopied(null), 2500);
  };

  // Display Events Fallback
  const displayEvents = events.length > 0 ? events : [
    {
      title: 'Pemberkatan & Janji Suci',
      date: 'Senin, 12 Oktober 2026',
      time: '09.00 - 11.00 WIB',
      location: 'Chateau Sainte-Anne Ballroom',
      address: 'Jl. Surya Kencana No. 88, Menteng, Jakarta Pusat',
      maps_url: 'https://maps.google.com',
      badge: 'Sakral & Khidmat',
      zone: 'WIB'
    },
    {
      title: 'Resepsi Perjamuan Bordeaux',
      date: 'Senin, 12 Oktober 2026',
      time: '18.30 - 21.30 WIB',
      location: 'Grand Ballroom de Bordeaux',
      address: 'Jl. Surya Kencana No. 88, Menteng, Jakarta Pusat',
      maps_url: 'https://maps.google.com',
      badge: 'Royal Banquet Night',
      zone: 'WIB'
    }
  ];

  // Display Stories Fallback
  const displayStories = stories.length > 0 ? stories : [
    {
      year: '2021',
      title: 'Pertemuan Pertama di Kota Tua',
      story: 'Sebuah perjumpaan tak terduga di pameran seni klasik, di mana pembicaraan tentang buku dan musik klasik membawa kami melangkah bersama.',
      coordinate: 'VERONA'
    },
    {
      year: '2023',
      title: 'Janji di Bawah Pohon Ek Tua',
      story: 'Dua tahun saling mendukung dalam suka dan duka, meneguhkan komitmen untuk saling menjaga seumur hidup.',
      coordinate: 'BORDEAUX'
    },
    {
      year: '2026',
      title: 'Menuju Ikatan Abadi',
      story: 'Dengan restu keluarga tercinta, kami memantapkan hati untuk menyatukan dua jiwa dalam sakramen pernikahan suci.',
      coordinate: 'PARIS'
    }
  ];

  // Display Gallery Fallback
  const displayGallery = gallery.length > 0 ? gallery : [
    { image_url: '/photos/photo-3.jpg', caption: 'The Royal Matrimony - Steven & Bunga', category: 'prewedding' },
    { image_url: '/photos/photo-4.jpg', caption: 'Groom Portrait - Steven', category: 'prewedding' },
    { image_url: '/photos/photo-5.jpg', caption: 'Bride Portrait - Bunga', category: 'prewedding' },
    { image_url: '/photos/photo-7.jpg', caption: 'Sacred Promises in Bordeaux Velvet', category: 'ceremony' },
    { image_url: '/photos/photo-8.jpg', caption: 'Chateau Ballroom Elegance', category: 'reception' },
    { image_url: '/photos/photo-9.jpg', caption: 'The Eternal Celebration', category: 'reception' },
  ];

  const filteredGallery = displayGallery.filter(item => {
    if (activeGalleryTab === 'all') return true;
    return item.category === activeGalleryTab || !item.category;
  });

  // Display Gifts Fallback
  const displayGifts = gifts.length > 0 ? gifts : [
    {
      bank_name: 'BCA PRIORITAS',
      account_number: '8835 9012 3445',
      account_name: 'Steven Christian Wijaya',
      id: 'bca'
    },
    {
      bank_name: 'MANDIRI PRIORITAS',
      account_number: '1410 0988 7761 2',
      account_name: 'Bunga Citra Lestari',
      id: 'mandiri'
    }
  ];

  // RSVP Submit Handler
  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    setIsSubmittingRsvp(true);
    setTimeout(() => {
      const newEntry = {
        name: rsvpName,
        attendance: rsvpStatus === 'hadir' ? 'attending' : 'declined',
        message: rsvpMessage || (rsvpStatus === 'hadir' ? 'Selamat menempuh hidup baru!' : 'Mohon maaf belum dapat hadir, doa terbaik untuk kedua mempelai.'),
        timestamp: 'Baru saja'
      };

      setRsvpList(prev => [newEntry, ...prev]);

      const passData = {
        code: `WD-WINE-${Math.floor(1000 + Math.random() * 9000)}`,
        name: rsvpName,
        guests: rsvpCount,
        table: 'Table 01 - Bordeaux Grand Ballroom',
        gate: 'Pintu Masuk Sayap Barat (Palace Lobby)',
        status: 'CONFIRMED'
      };

      setSavedPass(passData);
      saveBarcodePass(passData, invitation?.id, invitation?.slug, 'burgundy');
      setIsSubmittingRsvp(false);
      setShowBarcodePreview(true);
      setRsvpMessage('');
    }, 800);
  };

  // Save Pass Handler
  const handleSavePass = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 780;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background Gradient
    const bg = ctx.createLinearGradient(0, 0, 0, 780);
    bg.addColorStop(0, '#3A0812');
    bg.addColorStop(0.5, '#26050C');
    bg.addColorStop(1, '#1A0307');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 600, 780);

    // Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 4;
    ctx.strokeRect(20, 20, 560, 740);

    // Inner Dashed Border
    ctx.strokeStyle = '#B88B4A';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 6]);
    ctx.strokeRect(30, 30, 540, 720);
    ctx.setLineDash([]);

    // Header Badge
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 16px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ VIP BORDEAUX ACCESS PASS ✦', 300, 75);

    // Couple Names
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 28px serif';
    ctx.fillText(`${groomName} & ${brideName}`, 300, 115);

    ctx.fillStyle = '#D4AF37';
    ctx.font = '13px sans-serif';
    ctx.fillText('THE SACRED MATRIMONY', 300, 140);

    // Divider
    ctx.strokeStyle = '#B88B4A';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(80, 160);
    ctx.lineTo(520, 160);
    ctx.stroke();

    // Guest Info
    ctx.fillStyle = '#F5E5C9';
    ctx.font = '13px sans-serif';
    ctx.fillText('NAMA TAMU UNDANGAN:', 300, 195);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px serif';
    ctx.fillText(activeBarcodePass?.name || guestName, 300, 230);

    // Table & Gate
    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 16px serif';
    ctx.fillText(activeBarcodePass?.table || 'Table 01 - Bordeaux Grand Ballroom', 300, 265);

    ctx.fillStyle = '#D4B4B9';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Pintu Masuk: ${activeBarcodePass?.gate || 'Palace Lobby'} • Terkonfirmasi ${activeBarcodePass?.guests || 1} Tamu`, 300, 290);

    // Barcode Simulation
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(80, 330, 440, 130);

    ctx.fillStyle = '#1A0307';
    ctx.font = 'bold 14px monospace';
    ctx.fillText(activeBarcodePass?.code || 'WD-WINE-9842', 300, 445);

    for (let i = 100; i < 500; i += 7) {
      const w = ((i * 13) % 4) + 1;
      ctx.fillRect(i, 350, w, 65);
    }

    // QR Code simulation
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(210, 485, 180, 180);

    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      ctx.drawImage(qrImg, 220, 495, 160, 160);

      ctx.fillStyle = '#D4AF37';
      ctx.font = '11px monospace';
      ctx.fillText('TUNJUKKAN TIKET INI PADA PETUGAS RESEPSI', 300, 715);

      const link = document.createElement('a');
      link.download = `Tiket_VIP_Bordeaux_${(activeBarcodePass?.name || guestName).replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(`INV:${invitation?.id || 'BORDEAUX'}|GUEST:${activeBarcodePass.name}|ATT:attending|CODE:${activeBarcodePass.code}`)}`;
  };

  // AR Photobooth Camera & Upload Logic
  const startCamera = async (facing: 'user' | 'environment') => {
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(t => t.stop());
      }
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      });
      setCameraStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err: any) {
      setCameraError('Gagal mengakses kamera. Pastikan izin kamera telah disetujui di browser.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(t => t.stop());
      setCameraStream(null);
    }
  };

  const flipCamera = () => {
    const nextFacing = cameraFacingMode === 'user' ? 'environment' : 'user';
    setCameraFacingMode(nextFacing);
    startCamera(nextFacing);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    setIsFlashing(true);
    setIsCapturing(true);

    setTimeout(() => {
      setIsFlashing(false);
      const video = videoRef.current;
      if (!video) return;

      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw Video Feed
      const vidRatio = video.videoWidth / video.videoHeight;
      const targetRatio = 1080 / 1920;
      let sWidth = video.videoWidth;
      let sHeight = video.videoHeight;
      let sx = 0;
      let sy = 0;

      if (vidRatio > targetRatio) {
        sWidth = video.videoHeight * targetRatio;
        sx = (video.videoWidth - sWidth) / 2;
      } else {
        sHeight = video.videoWidth / targetRatio;
        sy = (video.videoHeight - sHeight) / 2;
      }

      ctx.save();
      if (cameraFacingMode === 'user') {
        ctx.translate(1080, 0);
        ctx.scale(-1, 1);
      }
      ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, 1080, 1920);
      ctx.restore();

      // Draw Royal Burgundy Velvet Frame Overlay
      drawBurgundyARFrame(ctx, 1080, 1920);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      setCapturedSnapshot(dataUrl);
      setIsCapturing(false);
      setIsPreviewOpen(true);
      stopCamera();
    }, 180);
  };

  const handleUploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 1080;
        canvas.height = 1920;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Draw Image Covering 1080x1920
        const imgRatio = img.width / img.height;
        const targetRatio = 1080 / 1920;
        let sWidth = img.width;
        let sHeight = img.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > targetRatio) {
          sWidth = img.height * targetRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / targetRatio;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, 1080, 1920);
        drawBurgundyARFrame(ctx, 1080, 1920);

        const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
        setCapturedSnapshot(dataUrl);
        setIsProcessingUpload(false);
        setIsPreviewOpen(true);
        setPhotoboothMode('uploaded-preview');
      };
      img.src = evt.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const drawBurgundyARFrame = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Outer Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // Inner Dashed Line
    ctx.strokeStyle = '#B88B4A';
    ctx.lineWidth = 3;
    ctx.setLineDash([12, 12]);
    ctx.strokeRect(50, 50, width - 100, height - 100);
    ctx.setLineDash([]);

    // Corner Ornaments
    ctx.fillStyle = '#D4AF37';
    [
      [60, 60],
      [width - 60, 60],
      [60, height - 60],
      [width - 60, height - 60]
    ].forEach(([cx, cy]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.fill();
    });

    // Top Header Banner
    ctx.fillStyle = 'rgba(38, 5, 12, 0.88)';
    ctx.fillRect(100, 70, width - 200, 120);
    ctx.strokeStyle = '#B88B4A';
    ctx.lineWidth = 3;
    ctx.strokeRect(100, 70, width - 200, 120);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 26px serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ BURGUNDY WINE CLASSIC WEDDING ✦', width / 2, 125);

    ctx.fillStyle = '#FFF7F8';
    ctx.font = '18px sans-serif';
    ctx.fillText('MEMORIES IN BORDEAUX VELVET', width / 2, 160);

    // Bottom Footer Card
    ctx.fillStyle = 'rgba(26, 3, 7, 0.92)';
    ctx.fillRect(80, height - 230, width - 160, 160);
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 3;
    ctx.strokeRect(80, height - 230, width - 160, 160);

    ctx.fillStyle = '#FFF7F8';
    ctx.font = 'bold 44px serif';
    ctx.fillText(`${groomName} & ${brideName}`, width / 2, height - 160);

    ctx.fillStyle = '#D4AF37';
    ctx.font = 'bold 20px serif';
    ctx.fillText('SENIN, 12 OKTOBER 2026 • JAKARTA', width / 2, height - 110);
  };

  const downloadBurgundyFramePNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1080, 1920);
    drawBurgundyARFrame(ctx, 1080, 1920);

    const link = document.createElement('a');
    link.download = `Frame_Burgundy_Classic_${groomName}_${brideName}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="relative w-full min-h-screen bg-[#19030A] text-[#FFF7F8] font-sans selection:bg-[#E5C57B] selection:text-[#19030A] overflow-x-hidden">
      {/* Ambient Floating Golden Embers & Stardust */}
      <FloatingBurgundyStardust count={22} />

      {/* =========================================================================
          DESKTOP 50/50 SPLIT SCREEN: LEFT FIXED SCENIC SHOWCASE ASIDE
          ========================================================================= */}
      <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-8 xl:p-12 overflow-hidden bg-[#19030A] border-r border-[#D4AF37]/30 shadow-2xl select-none">
        {/* Background image with cinematic Royal Bordeaux wine vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
          style={{ backgroundImage: `url(${couplePhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#19030A] via-[#260611]/70 via-60% to-[#19030A]/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(128,22,54,0.22)_0%,rgba(25,3,10,0.6)_60%,rgba(25,3,10,0.94)_100%)] pointer-events-none" />

        {/* Guilloche Watermark & Baroque Corner Flourishes */}
        <GuillocheBurgundyWatermark opacity={0.05} />
        <div className="absolute inset-6 rounded-3xl border border-[#D4AF37]/25 pointer-events-none z-10" />
        <div className="absolute top-5 left-5"><BurgundyBaroqueCornerFlourish position="top-left" size={54} /></div>
        <div className="absolute top-5 right-5"><BurgundyBaroqueCornerFlourish position="top-right" size={54} /></div>
        <div className="absolute bottom-5 left-5"><BurgundyBaroqueCornerFlourish position="bottom-left" size={54} /></div>
        <div className="absolute bottom-5 right-5"><BurgundyBaroqueCornerFlourish position="bottom-right" size={54} /></div>

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#24050F]/85 backdrop-blur-md border border-[#E5C57B]/40 text-[#F5E5C9] text-[10px] font-serif uppercase tracking-[0.25em] shadow-md font-bold">
            <Wine className="w-3.5 h-3.5 text-[#E5C57B]" />
            <span>BURGUNDY WINE CLASSIC</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#24050F]/80 backdrop-blur-md border border-[#E5C57B]/25 text-xs font-serif text-[#E0C2CA]">
            <span>Khusus Untuk:</span>
            <span className="text-white font-bold tracking-wide max-w-[150px] truncate">{guestName}</span>
          </div>
        </div>

        {/* Center Typography & Countdown */}
        <div className="relative z-10 my-auto text-left max-w-md">
          <span className="text-[10px] font-serif uppercase tracking-[0.35em] text-[#E5C57B] font-semibold block mb-2">
            THE SACRED MATRIMONY OF
          </span>
          <h1 className="font-serif text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF7F8] to-[#F5E5C9] drop-shadow-[0_4px_25px_rgba(25,3,10,0.8)] leading-tight">
            {groomName} <span className="font-light italic text-[#E5C57B]">&amp;</span> {brideName}
          </h1>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs xl:text-sm text-[#E0C2CA] mt-3 font-serif">
            <Calendar className="w-3.5 h-3.5 text-[#E5C57B] shrink-0" />
            <span>
              {displayEvents[0]?.event_date 
                ? new Date(displayEvents[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                : 'Senin, 12 Oktober 2026'}
            </span>
            <span className="text-[#E5C57B]/50">•</span>
            <MapPin className="w-3.5 h-3.5 text-[#E5C57B] shrink-0" />
            <span>{displayEvents[0]?.location || 'Chateau Sainte-Anne Ballroom'}</span>
          </div>

          {/* Countdown Grid */}
          <div className="mt-8 pt-5 border-t border-[#E5C57B]/25">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3 h-3 text-[#E5C57B]" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#E5C57B] uppercase font-bold">
                HITUNG MUNDUR HARI BAHAGIA
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 max-w-sm">
              {[
                { label: 'HARI', val: timeLeft.days },
                { label: 'JAM', val: timeLeft.hours },
                { label: 'MENIT', val: timeLeft.minutes },
                { label: 'DETIK', val: timeLeft.seconds },
              ].map((tile, idx) => (
                <div key={idx} className="bg-[#24050F]/85 backdrop-blur-md rounded-2xl p-2.5 border border-[#E5C57B]/30 text-center hover:border-[#E5C57B]/65 transition-colors shadow-md">
                  <span className="font-serif text-2xl xl:text-3xl font-bold text-white block leading-tight">
                    {String(tile.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] font-mono tracking-widest text-[#E5C57B] uppercase block mt-1 font-semibold">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Venue Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#E0C2CA] pt-3 border-t border-[#E5C57B]/25">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#E5C57B]" />
            <span className="font-serif text-white/90 text-[11px] sm:text-xs">
              {displayEvents[0]?.location || 'Chateau Sainte-Anne Ballroom, Jakarta'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <Crown className="w-3.5 h-3.5 text-[#E5C57B]" />
            <span className="text-[#E5C57B] font-serif font-bold tracking-wider text-[10px] sm:text-xs">Masterpiece 250k</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN SCROLLABLE CONTENT (Mobile Fullscreen / Desktop Right Panel)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 pb-28 shadow-2xl lg:border-l lg:border-[#D4AF37]/30 bg-[#19030A]">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
            ========================================================================= */}
        <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 border-b border-[#D4AF37]/30 overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,rgba(128,22,54,0.38)_0%,rgba(25,3,10,0.98)_80%)]">
          <GuillocheBurgundyWatermark opacity={0.05} />
          
          <div className="absolute top-3 left-3"><BurgundyBaroqueCornerFlourish position="top-left" size={44} /></div>
          <div className="absolute top-3 right-3"><BurgundyBaroqueCornerFlourish position="top-right" size={44} /></div>

          {/* Top Title Banner */}
          <ScrollReveal animation="fade-down" initialVisible={true} className="relative z-10 pt-10 sm:pt-6 px-4 max-w-md mx-auto w-full">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.35em] text-[#E5C57B] font-bold block mb-1">
              THE SACRED WEDDING INVITATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF7F8] to-[#F5E5C9]">
              {groomName} <span className="font-light italic text-[#E5C57B]">&amp;</span> {brideName}
            </h1>
            <p className="text-xs text-[#E0C2CA] font-serif mt-1.5 font-light italic">
              "Dua jiwa menyatu dalam hangatnya cinta abadi dan janji suci selamanya."
            </p>
          </ScrollReveal>

          {/* Central Cameo Portrait (Extra vertical padding prevents top crown & bottom badge collisions) */}
          <ScrollReveal animation="zoom-in" delay={150} initialVisible={true} className="relative z-10 my-auto pt-7 pb-5 flex flex-col items-center max-w-md mx-auto w-full">
            <div className="mb-6">
              <BurgundyCameoFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-[clamp(124px,23dvh,220px)]"
                frameHeightClass="h-[clamp(164px,30dvh,288px)]"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-4 py-1 xs:py-1.5 rounded-full bg-[#260611]/90 border border-[#E5C57B]/50 shadow-sm text-white">
              <Wine className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#E5C57B]" />
              <span className="text-[9px] xs:text-[10px] font-serif uppercase tracking-[0.2em] font-bold text-[#F5E5C9]">
                THE ROYAL BORDEAUX MATRIMONY
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info (Mobile Only) */}
          <ScrollReveal animation="fade-up" delay={200} initialVisible={true} className="relative z-10 w-full flex flex-col items-center pb-3 xs:pb-4 max-w-md mx-auto lg:hidden">
            <div className="w-full max-w-[280px] xs:max-w-xs p-3 xs:p-3.5 rounded-2xl bg-[#260611]/90 border border-[#E5C57B]/45 shadow-xs mb-2.5 xs:mb-3 text-center">
              <span className="text-[9.5px] xs:text-[10px] uppercase tracking-widest text-[#E5C57B] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-white block truncate">
                {guestName}
              </span>
            </div>

            {/* Countdown Tiles */}
            <div className="grid grid-cols-4 gap-1.5 xs:gap-2 w-full max-w-[280px] xs:max-w-xs mb-2.5 xs:mb-3">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="p-1.5 xs:p-2 rounded-xl bg-[#2F0815]/90 border border-[#E5C57B]/35 shadow-xs text-center">
                  <span className="block text-sm xs:text-base sm:text-lg font-serif font-bold text-[#FFF7F8]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] xs:text-[8.5px] uppercase tracking-wider text-[#E5C57B] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[11px] text-[#E0C2CA] font-serif italic">
              {displayEvents[0]?.event_date 
                ? new Date(displayEvents[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                : 'Senin, 12 Oktober 2026'} • {displayEvents[0]?.location || 'Chateau Sainte-Anne'}
            </p>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            SECTION 2: AYAT & PUISI EROPA KLASIK
            ========================================================================= */}
        <section id="kutipan" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden text-center bg-gradient-to-b from-[#1F050A] to-[#26050C]">
          <GuillocheBurgundyWatermark opacity={0.06} />
          <div className="max-w-md mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <div className="w-10 h-10 mx-auto rounded-full bg-[#3D0B14] border border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] mb-3">
                <Wine className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <p className="font-serif italic text-sm sm:text-base text-[#FFF7F8] leading-relaxed">
                "Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu, apa yang telah dipersatukan Tuhan, tidak boleh diceraikan manusia."
              </p>
              <div className="mt-4 pt-3 border-t border-[#B88B4A]/30 inline-block">
                <span className="text-xs font-serif font-bold text-[#D4AF37] tracking-widest uppercase">
                  (MATIUS 19:6 / QS. AR-RUM : 21)
                </span>
                <p className="text-xs text-[#D4B4B9] mt-2 italic font-serif">
                  "Sebagaimana anggur terbaik yang matang bersama waktu, demikianlah cinta suci ini mengalir abadi melintasi masa."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: MEMPELAI (THE ROYAL BORDEAUX GROOM & BRIDE)
            ========================================================================= */}
        <section id="mempelai" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                PASANGAN PENGANTIN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Kedua Mempelai
              </h2>
              <BurgundyGoldDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6 sm:space-y-8">
              {/* Groom Profile */}
              <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                <div className="mb-6 pt-6 sm:pt-8">
                  <BurgundyCameoFrame
                    imageSrc={groomPhoto}
                    altText={groomName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                  />
                </div>
                <span className="text-[10.5px] uppercase tracking-widest text-[#D4AF37] font-serif font-bold">
                  Pengantin Pria
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#D4B4B9] mt-1 max-w-xs">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <a
                    href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2E0911] text-[#F5E5C9] border border-[#B88B4A]/50 text-[11px] font-medium hover:bg-[#3D0B14] transition-colors shadow-xs"
                  >
                    <span>@{groomInstagram.replace('@', '')}</span>
                  </a>
                )}
              </ScrollReveal>

              {/* Cosmic Ring Connection Bridge (Spaced with generous breathing room) */}
              <div className="my-10 sm:my-14 py-2 flex items-center justify-center">
                <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#B88B4A]/40 to-[#D4AF37]" />
                <div className="mx-4 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#26050C] border border-[#D4AF37] flex items-center justify-center shadow-[0_0_18px_rgba(212,175,55,0.4)]">
                  <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37] fill-[#D4AF37]/30 animate-pulse" />
                </div>
                <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#B88B4A]/40 to-[#D4AF37]" />
              </div>

              {/* Bride Profile */}
              <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center pt-8 sm:pt-12">
                <div className="mb-6 pt-6 sm:pt-8">
                  <BurgundyCameoFrame
                    imageSrc={bridePhoto}
                    altText={brideName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                  />
                </div>
                <span className="text-[10.5px] uppercase tracking-widest text-[#D4AF37] font-serif font-bold">
                  Pengantin Wanita
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#D4B4B9] mt-1 max-w-xs">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <a
                    href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#2E0911] text-[#F5E5C9] border border-[#B88B4A]/50 text-[11px] font-medium hover:bg-[#3D0B14] transition-colors shadow-xs"
                  >
                    <span>@{brideInstagram.replace('@', '')}</span>
                  </a>
                )}
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 4: RANGKAIAN ACARA (THE ROYAL CELEBRATION EVENTS)
            ========================================================================= */}
        <section id="acara" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#26050C] to-[#1F050A]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                JADWAL SAKRAL &amp; PERJAMUAN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Rangkaian Acara
              </h2>
              <BurgundyGoldDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6">
              {displayEvents.map((evt: any, idx: number) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className="relative p-5 sm:p-7 rounded-3xl bg-[#2E0911]/90 border border-[#B88B4A]/60 shadow-[0_15px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(184,139,74,0.25)] text-center overflow-hidden group">
                    <GuillocheBurgundyWatermark opacity={0.06} />

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#3D0B14] text-[10px] font-serif tracking-widest uppercase text-[#D4AF37] border border-[#D4AF37]/40 mb-3 shadow-xs font-semibold">
                      <Wine size={12} className="text-[#D4AF37]" />
                      <span>{evt.badge || (idx === 0 ? 'Pemberkatan Suci' : 'Resepsi Perjamuan')}</span>
                    </div>

                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mb-2">
                      {evt.title || (idx === 0 ? 'Pemberkatan Pernikahan' : 'Resepsi Pernikahan')}
                    </h3>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-xs sm:text-sm text-[#F5E5C9] my-3 font-serif">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-[#D4AF37]" />
                        <span>{evt.date || 'Senin, 12 Oktober 2026'}</span>
                      </div>
                      <span className="hidden sm:inline text-[#D4AF37]">•</span>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-[#D4AF37]" />
                        <span>{evt.time || (idx === 0 ? '09.00 - 11.00 WIB' : '18.30 - 21.30 WIB')}</span>
                      </div>
                    </div>

                    <p className="font-serif text-sm font-semibold text-white mt-2">
                      {evt.location || 'Chateau Sainte-Anne Grand Ballroom'}
                    </p>
                    <p className="text-xs text-[#D4B4B9] max-w-sm mx-auto mt-1 font-sans">
                      {evt.address || 'Jl. Surya Kencana No. 88, Menteng, Jakarta Pusat'}
                    </p>

                    <div className="mt-5 pt-4 border-t border-[#B88B4A]/25 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={evt.maps_url || 'https://maps.google.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#B88B4A] to-[#80182A] text-[#1A0307] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md hover:brightness-110 active:scale-95"
                      >
                        <MapPin size={13} className="text-[#1A0307]" />
                        <span>Petunjuk Lokasi Maps</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          const title = `Pernikahan ${groomName} & ${brideName} (${evt.title || 'Acara'})`;
                          const desc = `Menghadiri pernikahan agung ${groomName} & ${brideName}. Lokasi: ${evt.location || 'Chateau Sainte-Anne'}.`;
                          const loc = evt.address || evt.location || 'Jakarta';
                          const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=20261012T020000Z/20261012T050000Z&details=${encodeURIComponent(desc)}&location=${encodeURIComponent(loc)}`;
                          window.open(googleCalUrl, '_blank');
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#1F050A] hover:bg-[#2A060C] text-[#F5E5C9] border border-[#B88B4A]/60 text-xs font-serif font-bold tracking-wider uppercase transition-colors cursor-pointer shadow-sm"
                      >
                        <Calendar size={13} className="text-[#D4AF37]" />
                        <span>Simpan ke Kalender</span>
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: DRESS CODE & COLOR PALETTE
            ========================================================================= */}
        <section id="dresscode" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#1F050A] via-[#26050C] to-[#1F050A] text-center">
          <GuillocheBurgundyWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0B14] border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Shirt className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>PANDUAN BUSANA &amp; DRESS CODE</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Bordeaux Velvet Elegance
              </h2>
              <BurgundyGoldDivider />
              <p className="text-xs text-[#D4B4B9] max-w-sm mx-auto mb-6">
                Demi keselarasan dokumentasi dan suasana pesta yang elegan, para tamu undangan dihimbau mengenakan busana bernuansa formal aristokrat.
              </p>
            </ScrollReveal>

            {/* Gender Toggle */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="inline-flex p-1 rounded-full bg-[#1A0307] border border-[#B88B4A]/50 mb-6 shadow-inner">
                <button
                  type="button"
                  onClick={() => setAttireGender('gentlemen')}
                  className={`px-5 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                    attireGender === 'gentlemen'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] shadow-sm'
                      : 'text-[#D4B4B9] hover:text-white'
                  }`}
                >
                  Gentlemen (Pria)
                </button>
                <button
                  type="button"
                  onClick={() => setAttireGender('ladies')}
                  className={`px-5 py-1.5 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                    attireGender === 'ladies'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] shadow-sm'
                      : 'text-[#D4B4B9] hover:text-white'
                  }`}
                >
                  Ladies (Wanita)
                </button>
              </div>

              {/* Attire Description Card */}
              <div className="p-5 sm:p-7 rounded-3xl bg-[#2E0911]/90 border border-[#B88B4A]/50 shadow-xl max-w-md mx-auto mb-6 text-left">
                <h4 className="font-serif text-base font-bold text-white mb-2 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                  <span>{attireGender === 'gentlemen' ? 'Formal Black Tie / Dark Tuxedo' : 'Evening Gown / Velvet Bordeaux Glam'}</span>
                </h4>
                <p className="text-xs text-[#D4B4B9] leading-relaxed">
                  {attireGender === 'gentlemen'
                    ? 'Jas formal gelap (Hitam, Charcoal, atau Deep Bordeaux) dipadukan kemeja putih rapi dan dasi kupu-kupu atau dasi sutra emas antik.'
                    : 'Gaun malam panjang anggun bernuansa bordeaux velvet, champagne gold, atau bronze silk dengan aksesoris perhiasan klasik yang anggun.'}
                </p>
              </div>

              {/* Palette Swatches */}
              <div className="max-w-md mx-auto">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#D4AF37] block mb-3 font-bold">
                  REKOMENDASI PALET WARNA (KLIK UNTUK SALIN HEX)
                </span>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { hex: '#480D17', name: 'Bordeaux Wine', desc: 'Kemewahan beludru bordeaux' },
                    { hex: '#B88B4A', name: 'Antique Bronze', desc: 'Aksen emas perunggu antik' },
                    { hex: '#F5E5C9', name: 'Champagne Silk', desc: 'Sutra hangat champagne' },
                    { hex: '#1A0307', name: 'Velvet Noir', desc: 'Hitam malam aristokrat' },
                  ].map((color, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleCopy(color.hex, `color-${idx}`)}
                      className="group p-2 rounded-2xl bg-[#1A0307] border border-[#B88B4A]/40 flex flex-col items-center hover:border-[#D4AF37] transition-all cursor-pointer shadow-xs active:scale-95"
                    >
                      <div 
                        className="w-10 h-10 rounded-full border border-white/20 shadow-md mb-1.5 flex items-center justify-center transition-transform group-hover:scale-110" 
                        style={{ backgroundColor: color.hex }}
                      >
                        {isCopied === `color-${idx}` && <Check size={14} className="text-white drop-shadow" />}
                      </div>
                      <span className="text-[9px] font-serif font-bold text-white block truncate w-full text-center">
                        {color.name}
                      </span>
                      <span className="text-[8px] font-mono text-[#D4AF37] block">
                        {isCopied === `color-${idx}` ? 'Tersalin' : color.hex}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: VVIP CONCIERGE & VALET SERVICE
            ========================================================================= */}
        <section id="concierge" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden text-center bg-gradient-to-b from-[#1F050A] via-[#2A060C] to-[#1F050A]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                LAYANAN KHUSUS TAMU VIP
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                VVIP Concierge &amp; Protocol
              </h2>
              <BurgundyGoldDivider />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-8">
              {[
                {
                  icon: Crown,
                  title: 'Valet Parking VIP',
                  desc: 'Layanan drop-off gratis langsung di lobi utama Chateau Sainte-Anne.'
                },
                {
                  icon: Wine,
                  title: 'Private Reception Lounge',
                  desc: 'Ruang tunggu eksklusif ber-AC dengan sajian canapé & mocktail selamat datang.'
                },
                {
                  icon: Compass,
                  title: 'Pemandu Meja Jamuan',
                  desc: 'Petugas khusus siap memandu tamu VIP menuju meja perjamuan nomor Anda.'
                }
              ].map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <ScrollReveal key={idx} animation="zoom-in" delay={idx * 120}>
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#26050C]/85 border border-[#B88B4A]/40 text-center shadow-md hover:border-[#D4AF37] transition-colors">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#3D0B14] border border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-2.5 shadow-sm">
                        <IconComponent size={18} />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-white mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-[#D4B4B9] leading-snug">
                        {item.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: KISAH CINTA (ROYAL EUROPEAN LOVE JOURNEY)
            ========================================================================= */}
        <section id="kisah" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#1F050A] via-[#26050C] to-[#1F050A]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                PERJALANAN DUA JIWA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Kisah Kasih Abadi
              </h2>
              <BurgundyGoldDivider />
            </ScrollReveal>

            {/* Glowing European Love Story Line */}
            <div className="mt-8 relative border-l-2 border-dashed border-[#B88B4A]/60 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-8">
              {displayStories.map((story, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className="relative group">
                    {/* Glowing Node Wax Seal */}
                    <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-8 h-8 rounded-full bg-[#26050C] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.7)] group-hover:scale-110 transition-transform">
                      <Wine className="w-4 h-4 text-[#D4AF37]" />
                    </div>

                    <div className="p-4 sm:p-5 rounded-2xl bg-[#2E0911]/85 border border-[#B88B4A]/40 shadow-md text-left">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[11px] font-mono tracking-widest text-[#D4AF37] font-bold">
                          {story.year} • {story.coordinate}
                        </span>
                        <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
                      </div>
                      <h4 className="font-serif text-base sm:text-lg font-bold text-white mb-1.5">
                        {story.title}
                      </h4>
                      <p className="text-xs text-[#D4B4B9] leading-relaxed font-sans">
                        {story.story}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: GALERI FOTO (BORDEAUX EDITORIAL MAGAZINE & TABS)
            ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#1F050A] via-[#26050C] to-[#1F050A]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                DOKUMENTASI INDAH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Galeri Momen Bahagia
              </h2>
              <BurgundyGoldDivider />
            </ScrollReveal>

            {/* Category Filter Tabs */}
            <ScrollReveal animation="fade-up" delay={100} className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-6">
              {[
                { id: 'all', label: 'Semua Momen', count: displayGallery.length },
                { id: 'prewedding', label: 'Prewedding', count: displayGallery.filter(g => g.category === 'prewedding').length || 3 },
                { id: 'ceremony', label: 'Janji Suci', count: displayGallery.filter(g => g.category === 'ceremony').length || 1 },
                { id: 'reception', label: 'Resepsi Grand', count: displayGallery.filter(g => g.category === 'reception').length || 2 },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveGalleryTab(tab.id as any)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeGalleryTab === tab.id
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] font-bold shadow-md scale-105'
                      : 'bg-[#26050C]/90 text-[#D4B4B9] border border-[#B88B4A]/40 hover:text-white'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeGalleryTab === tab.id ? 'bg-[#1A0307]/20 text-[#1A0307]' : 'bg-black/30 text-[#D4B4B9]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </ScrollReveal>

            {/* Featured Masterpiece Hero Showcase (Cinema Mode) */}
            <ScrollReveal animation="zoom-in" delay={150} className="mb-6">
              <div 
                onClick={() => setActivePhotoIndex(0)}
                className="relative rounded-3xl overflow-hidden aspect-[16/10] border-2 border-[#D4AF37]/70 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(212,175,55,0.3)] cursor-pointer group"
              >
                <img
                  src={filteredGallery[0]?.image_url || '/photos/photo-7.jpg'}
                  alt="Featured Hero"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0307]/90 via-transparent to-black/20" />
                
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A0307]/80 backdrop-blur-md border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] font-serif uppercase tracking-widest flex items-center gap-1.5 font-bold shadow-sm">
                  <Maximize2 size={11} />
                  <span>Mode Sinema</span>
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 text-left">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37] block font-bold">
                    PREVIEW UTAMA • {filteredGallery[0]?.caption || 'The Sacred Matrimony in Bordeaux'}
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white drop-shadow-md">
                    {groomName} &amp; {brideName}
                  </h4>
                </div>
              </div>
            </ScrollReveal>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3.5">
              {filteredGallery.map((item, idx) => (
                <ScrollReveal key={idx} animation="zoom-in" delay={idx * 70}>
                  <div
                    onClick={() => setActivePhotoIndex(idx)}
                    className="relative aspect-square rounded-2xl overflow-hidden border border-[#B88B4A]/50 shadow-md group cursor-pointer hover:border-[#D4AF37] transition-all"
                  >
                    <img
                      src={item.image_url}
                      alt={item.caption || `Foto ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[#1A0307]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-[#26050C]/90 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center shadow-md">
                        <Maximize2 size={14} />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: AR PHOTOBOOTH KAMERA (150k/250k VIP FEATURE)
            ========================================================================= */}
        <section id="photobooth" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden text-center bg-gradient-to-b from-[#1F050A] via-[#2A060C] to-[#1F050A]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#D4AF37] font-serif font-bold">
                KENANG-KENANGAN KHUSUS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                AR Burgundy Photobooth
              </h2>
              <BurgundyGoldDivider />
              <p className="text-xs text-[#D4B4B9] max-w-sm mx-auto mb-6">
                Abadikan momen bahagia Anda menggunakan kamera ponsel dengan bingkai beludru bordeaux &amp; ukiran emas antik, lalu unduh dan bagikan ke Instagram Story!
              </p>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={150}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#26050C]/85 border border-[#B88B4A]/50 shadow-xl flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#B88B4A] flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.5)] mb-4">
                  <Camera className="w-8 h-8 text-[#1A0307]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Ambil Foto dengan Frame Bordeaux
                </h3>
                <p className="text-xs text-[#D4B4B9] max-w-xs mb-5">
                  Kamera akan otomatis membingkai foto Anda dengan ornamen aristokrat emas antik &amp; nama kedua mempelai.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoboothMode('choice');
                    setIsCameraModalOpen(true);
                  }}
                  className="py-3 px-6 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E5C9] to-[#D4AF37] text-[#1A0307] font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Buka AR Photobooth</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: TANDA KASIH & AMPLOP DIGITAL (GIFT & REGISTRY)
            ========================================================================= */}
        <section id="kado" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#26050C] to-[#1F050A] text-center">
          <GuillocheBurgundyWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0B14] border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>TANDA KASIH &amp; AMPLOP DIGITAL</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Amplop Digital &amp; Hadiah
              </h2>
              <BurgundyGoldDivider />
              <p className="text-xs text-[#D4B4B9] max-w-sm mx-auto mb-6">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika hendak memberikan tanda kasih, dapat disalurkan melalui rekening eksklusif di bawah ini.
              </p>
            </ScrollReveal>

            {/* Tab Selector: Transfer vs Physical */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
                <button
                  type="button"
                  onClick={() => setGiftTab('transfer')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer shadow-xs ${
                    giftTab === 'transfer'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] border-2 border-white'
                      : 'bg-[#26050C]/80 text-[#D4B4B9] border border-[#B88B4A]/40 hover:text-white'
                  }`}
                >
                  <CreditCard size={14} />
                  <span>Transfer Bank &amp; Rekening</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGiftTab('physical')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer shadow-xs ${
                    giftTab === 'physical'
                      ? 'bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] border-2 border-white'
                      : 'bg-[#26050C]/80 text-[#D4B4B9] border border-[#B88B4A]/40 hover:text-white'
                  }`}
                >
                  <Package size={14} />
                  <span>Kirim Kado Fisik</span>
                </button>
              </div>
            </ScrollReveal>

            {giftTab === 'transfer' ? (
              <div className="space-y-4 max-w-sm mx-auto">
                {displayGifts.map((bank: any, idx: number) => (
                  <ScrollReveal key={idx} animation="zoom-in" delay={idx * 150}>
                    <div className="relative p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-br from-[#3D0B14] via-[#26050C] to-[#1A0307] border border-[#D4AF37]/60 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(212,175,55,0.25)] text-left overflow-hidden text-white hover:scale-[1.02] transition-transform">
                      <GuillocheBurgundyWatermark opacity={0.08} />

                      {/* Header Card: Bank & EMV Chip */}
                      <div className="flex items-center justify-between mb-3 xs:mb-4 relative z-10">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="font-serif font-bold text-sm xs:text-base sm:text-lg tracking-wider text-white">
                            {bank.bank_name}
                          </span>
                          <span className="text-[8px] xs:text-[8.5px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                            PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <Wifi size={15} className="text-[#D4AF37] rotate-90 opacity-80" />
                          <EMVBurgundySmartChip />
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mb-2.5 xs:mb-3 relative z-10">
                        <span className="text-[8.5px] xs:text-[9px] font-serif uppercase tracking-widest text-[#D4B4B9] block">
                          NOMOR REKENING PRIORITAS
                        </span>
                        <div className="font-mono text-sm xs:text-lg sm:text-2xl font-bold tracking-wider text-white mt-0.5 truncate">
                          {bank.account_number}
                        </div>
                      </div>

                      {/* Card Holder & Copy Button */}
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pt-2.5 xs:pt-3 border-t border-[#B88B4A]/25 relative z-10">
                        <div>
                          <span className="text-[8.5px] xs:text-[9px] font-sans uppercase tracking-wider text-[#D4B4B9] block">
                            ATAS NAMA
                          </span>
                          <span className="font-serif text-[11px] xs:text-xs font-semibold text-[#F5E5C9]">
                            {bank.account_name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(bank.account_number.replace(/\s+/g, ''), bank.id)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 xs:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] text-[10px] xs:text-[11px] font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                        >
                          {isCopied === bank.id ? (
                            <>
                              <Check size={12} className="text-[#1A0307]" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} className="text-[#1A0307]" />
                              <span>Salin No. Rek</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            ) : (
              <ScrollReveal animation="zoom-in" delay={150}>
                <div className="p-6 rounded-3xl bg-[#26050C]/90 border border-[#D4AF37]/60 max-w-sm mx-auto text-center shadow-xl text-white">
                  <Package className="w-8 h-8 text-[#D4AF37] mx-auto mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    Alamat Kirim Hadiah Fisik
                  </h4>
                  <p className="text-xs text-[#D4B4B9] leading-relaxed mb-4 font-sans">
                    {couple?.gift_address || 'Jl. Surya Kencana No. 88, Menteng, Jakarta Pusat (Kediaman Mempelai)'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(couple?.gift_address || 'Jl. Surya Kencana No. 88, Menteng, Jakarta Pusat', 'addr')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] text-xs font-serif font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md hover:brightness-110"
                  >
                    {isCopied === 'addr' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied === 'addr' ? 'Alamat Tersalin' : 'Salin Alamat Lengkap'}</span>
                  </button>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: VIP GUEST CHECK-IN PASS & RSVP FORM
            ========================================================================= */}
        <section id="vip-pass" className="relative p-6 sm:p-10 border-b border-[#B88B4A]/30 overflow-hidden bg-gradient-to-b from-[#1F050A] via-[#26050C] to-[#1F050A] text-center">
          <GuillocheBurgundyWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D0B14] border border-[#D4AF37]/60 text-[#D4AF37] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Barcode className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>VIP PASS &amp; PRESENSI BARCODE / QR</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Konfirmasi Kehadiran &amp; Tiket VIP
              </h2>
              <BurgundyGoldDivider />
              <p className="text-xs text-[#D4B4B9] max-w-sm mx-auto mb-6">
                Sistem otomatis menerbitkan <strong>Tiket Barcode &amp; QR Resmi</strong> untuk discan petugas saat tiba di lokasi resepsi.
              </p>
            </ScrollReveal>

            {/* Toggle View Pass Ticket */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowBarcodePreview(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-[#26050C] hover:bg-[#3D0B14] text-[#D4AF37] border border-[#D4AF37]/60 transition-colors cursor-pointer shadow-md"
                >
                  <Barcode size={14} />
                  <span>{activeBarcodePass ? (showBarcodePreview && !savedPass ? 'Tutup Tiket' : 'Tampilkan Tiket Barcode VIP') : 'Lihat Contoh Barcode VIP'}</span>
                </button>
              </div>
            </ScrollReveal>

            {/* VIP GUEST VERIFIED PASS CARD */}
            {activeBarcodePass && (
              <ScrollReveal animation="zoom-in" delay={180} duration={850}>
                <div className="relative bg-gradient-to-br from-[#3D0B14] via-[#26050C] to-[#1A0307] text-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl border border-[#D4AF37]/70 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(212,175,55,0.35)] mb-8 text-center overflow-hidden max-w-[340px] xs:max-w-sm mx-auto z-10">
                  <GuillocheBurgundyWatermark opacity={0.09} />

                  <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-[#D4AF37]/20 text-[9.5px] xs:text-[10px] text-[#D4AF37] mb-2.5 xs:mb-3 border border-[#D4AF37]/50">
                    <Crown size={12} className="text-[#D4AF37]" />
                    <span className="font-serif tracking-widest font-bold uppercase">
                      BORDEAUX VIP ACCESS PASS
                    </span>
                  </div>

                  <h3 className="font-serif text-lg xs:text-xl font-bold text-white mb-1">
                    {activeBarcodePass.name}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 rounded-full text-[9.5px] xs:text-[10px] font-sans font-semibold my-1.5 xs:my-2 bg-emerald-950/90 text-emerald-200 border border-emerald-400/50">
                    <span>✓ Terkonfirmasi Hadir ({activeBarcodePass.guests || 1} Tamu)</span>
                  </div>

                  <p className="text-[10px] xs:text-[11px] text-[#D4AF37] mb-2.5 xs:mb-3 font-serif">
                    {displayEvents[0]?.location || 'Chateau Sainte-Anne • Jakarta'}
                  </p>

                  {/* VVIP Seating & Gate Info */}
                  <div className="grid grid-cols-2 gap-1.5 xs:gap-2 my-2.5 xs:my-3 max-w-xs mx-auto text-left">
                    <div className="p-1.5 xs:p-2 rounded-xl bg-[#1A0307]/90 border border-[#B88B4A]/30 shadow-inner">
                      <span className="text-[7.5px] xs:text-[8px] text-[#D4B4B9] block uppercase font-sans">Meja Jamuan</span>
                      <span className="text-[10px] xs:text-[11px] font-serif font-bold text-[#D4AF37] truncate block">{activeBarcodePass.table || 'Table 01 - Bordeaux'}</span>
                    </div>
                    <div className="p-1.5 xs:p-2 rounded-xl bg-[#1A0307]/90 border border-[#B88B4A]/30 shadow-inner">
                      <span className="text-[7.5px] xs:text-[8px] text-[#D4B4B9] block uppercase font-sans">Pintu Akses</span>
                      <span className="text-[10px] xs:text-[11px] font-serif font-bold text-[#D4AF37] truncate block">Palace Lobby</span>
                    </div>
                  </div>

                  {/* QR Code Graphic with Laser Scanline Animation */}
                  <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 mx-auto bg-white p-2 rounded-2xl border-2 border-[#D4AF37] shadow-md flex items-center justify-center my-2.5 xs:my-3 overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`INV:${invitation?.id || 'BORDEAUX'}|GUEST:${activeBarcodePass.name}|ATT:attending|CODE:${activeBarcodePass.code}`)}`}
                      alt="QR Code Tiket"
                      className="w-full h-full object-contain"
                    />
                    <div 
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none"
                      style={{ animation: 'cardScanline 2.5s ease-in-out infinite' }}
                    />
                  </div>

                  {/* Authentic Linear Barcode Graphic (Code-128 Vertical SVG Bars) */}
                  <div className="relative my-2 xs:my-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 bg-white rounded-xl border border-[#D4AF37]/70 flex flex-col items-center shadow-md overflow-hidden">
                    <svg viewBox="0 0 160 32" className="w-full max-w-[170px] xs:max-w-[210px] h-8 xs:h-9 text-[#1A0307]" preserveAspectRatio="none">
                      {[2,1,3,1,1,2,1,3,2,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,2,1].map((w, idx) => (
                        idx % 2 === 0 ? <rect key={idx} x={idx * 3.6} y="0" width={w} height="32" fill="currentColor" /> : null
                      ))}
                    </svg>
                    <span className={`font-mono font-bold text-[11px] xs:text-xs tracking-[0.25em] ${isDemo ? 'text-red-700 line-through' : 'text-[#1A0307]'} mt-1`}>
                      {activeBarcodePass.code}
                    </span>
                    {isDemo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none">
                        <span className="bg-[#80182A]/95 text-white font-bold text-[8.5px] xs:text-[9px] px-2 py-0.5 rounded tracking-widest uppercase shadow">
                          BARCODE DEMO (TERKUNCI)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-center gap-2.5 mt-3">
                    <button
                      type="button"
                      onClick={handleSavePass}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E5C9] to-[#D4AF37] text-[#1A0307] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                    >
                      <Download size={14} />
                      <span>Simpan Tiket ke Galeri</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedPass(null);
                        clearBarcodePass(invitation?.id, invitation?.slug, activeBarcodePass?.name || guestName, 'burgundy');
                        setShowBarcodePreview(false);
                      }}
                      className="inline-block text-[11px] text-[#D4AF37] hover:underline font-serif font-semibold cursor-pointer"
                    >
                      ← Ubah Konfirmasi Kehadiran
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* RSVP Submission Form */}
            <ScrollReveal animation="fade-up" delay={200} duration={850}>
              <form onSubmit={handleSubmitRSVP} className="relative z-10 max-w-md mx-auto p-5 sm:p-7 rounded-3xl bg-[#26050C]/90 border border-[#D4AF37]/50 text-left shadow-xl text-white">
                <h4 className="font-serif text-lg font-bold text-white text-center mb-4">
                  Formulir RSVP Kehadiran
                </h4>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#D4AF37] block mb-1">
                    Nama Lengkap Anda
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#19030A] border border-[#E5C57B]/35 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C57B] focus-visible:border-[#E5C57B]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#D4AF37] block mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 xs:gap-2">
                    {[
                      { id: 'hadir', label: 'Hadir' },
                      { id: 'ragu', label: 'Ragu-ragu' },
                      { id: 'tidak_hadir', label: 'Berhalangan' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRsvpStatus(opt.id as any)}
                        className={`py-2 px-1 xs:px-2 min-h-[44px] rounded-xl text-[10px] xs:text-xs font-serif transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E5C9] ${
                          rsvpStatus === opt.id
                            ? 'bg-gradient-to-r from-[#E5C57B] to-[#C8A252] text-[#19030A] font-bold shadow-xs'
                            : 'bg-[#19030A] text-[#E0C2CA] border border-[#E5C57B]/30 hover:text-white'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#D4AF37] block mb-1">
                    Jumlah Tamu Hadir
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={e => setRsvpCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#19030A] border border-[#E5C57B]/35 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C57B] focus-visible:border-[#E5C57B]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-serif text-[#D4AF37] block mb-1">
                    Ucapan Doa &amp; Harapan
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={e => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#19030A] border border-[#E5C57B]/35 text-white text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5C57B] focus-visible:border-[#E5C57B] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#F5E5C9] to-[#D4AF37] text-[#1A0307] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-95"
                >
                  {isSubmittingRsvp ? (
                    <span>Mengirim Konfirmasi...</span>
                  ) : (
                    <>
                      <Send size={14} />
                      <span>Kirim Konfirmasi &amp; Terbitkan Tiket</span>
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>

            {/* Live Wishes Feed */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="mt-8 sm:mt-10 max-w-md mx-auto text-left relative z-10">
                <h4 className="font-serif text-sm sm:text-base font-bold text-white mb-4 flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#D4AF37]" />
                  <span>Untaian Doa &amp; Ucapan ({rsvpList.length})</span>
                </h4>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {rsvpList.map((w, idx) => (
                    <ScrollReveal key={idx} animation="fade-up" delay={(idx % 4) * 60}>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#26050C]/80 border border-[#B88B4A]/30 text-xs shadow-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif font-bold text-white text-xs sm:text-sm">
                            {w.name}
                          </span>
                          <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                            w.attendance === 'attending' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300'
                          }`}>
                            {w.attendance === 'attending' ? 'Hadir' : 'Berhalangan'}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#D4B4B9] leading-relaxed font-sans">
                          {w.message}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 12: PENUTUP / FOOTER (Royal Bordeaux Sign-off)
            ========================================================================= */}
        <footer className="relative pt-8 sm:pt-12 pb-32 sm:pb-36 px-4 sm:px-6 text-center max-w-xl mx-auto overflow-hidden">
          <ScrollReveal animation="fade-up" className="relative z-10 flex flex-col items-center">
            {/* Glowing Cameo Icon */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/20 blur-xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-[#26050C] border border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <Wine className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
              Terima Kasih
            </h2>

            <p className="font-serif text-xs sm:text-sm text-[#F5E5C9] leading-relaxed max-w-md mx-auto mb-6 px-2 font-light">
              Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi ikatan suci pernikahan kami.
            </p>

            <BurgundyGoldDivider />

            <div className="mt-5 mb-8 space-y-1">
              <p className="text-[10px] sm:text-[10.5px] font-serif tracking-[0.25em] uppercase text-[#D4AF37] font-semibold">
                KAMI YANG BERBAHAGIA
              </p>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF7F8] to-[#F5E5C9] drop-shadow-sm tracking-wide">
                {groomName} &amp; {brideName}
              </div>
              <p className="text-[11px] sm:text-xs text-[#D4B4B9] font-serif italic">
                Beserta segenap keluarga besar kedua mempelai
              </p>
            </div>

            <div className="w-full pt-6 border-t border-[#B88B4A]/20 flex flex-col items-center gap-1.5">
              <span className="text-[9.5px] text-[#8C6D3F] font-mono tracking-widest uppercase">
                BURGUNDY WINE CLASSIC • {new Date().getFullYear()}
              </span>
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] font-serif tracking-[0.2em] text-[#D4AF37]/80 hover:text-[#D4AF37] uppercase transition-colors"
              >
                WD DIGITAL INVITATION
              </a>
            </div>
          </ScrollReveal>
        </footer>
      </main>

      {/* Floating Bottom Navigation Bar with Dynamic Velvet Gold Pill Dock */}
      <nav aria-label="Navigasi Undangan" className={`fixed bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 max-w-[calc(100vw-20px)] sm:max-w-max px-1.5 xs:px-2 pointer-events-auto transition-opacity duration-300 ${activePhotoIndex !== null ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}>
        <div 
          ref={navContainerRef}
          className="bg-[#19030A]/95 backdrop-blur-xl border border-[#E5C57B]/55 rounded-full py-1 xs:py-1.5 px-1.5 xs:px-2 sm:px-3 shadow-[0_12px_36px_rgba(0,0,0,0.85)] flex items-center justify-start sm:justify-center gap-0.5 xs:gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {[
            { id: 'sampul', label: 'Cover', icon: Wine },
            { id: 'mempelai', label: 'Mempelai', icon: User },
            { id: 'acara', label: 'Acara', icon: Calendar },
            { id: 'dresscode', label: 'Busana', icon: Shirt },
            { id: 'concierge', label: 'VVIP', icon: Crown },
            { id: 'kisah', label: 'Cerita', icon: Heart },
            { id: 'galeri', label: 'Galeri', icon: Maximize2 },
            { id: 'photobooth', label: 'Filter AR', icon: Camera },
            { id: 'kado', label: 'Kado', icon: CreditCard },
            { id: 'vip-pass', label: 'RSVP', icon: Barcode },
          ].map(item => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                data-nav-id={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveSection(item.id);
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className={`transition-all duration-300 flex items-center gap-1 sm:gap-1.5 rounded-full cursor-pointer select-none shrink-0 snap-center min-h-[36px] min-w-[36px] justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E5C9] ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#F2E0B6] via-[#E5C57B] to-[#D4AF37] text-[#19030A] px-2.5 xs:px-3 sm:px-3.5 py-1.5 font-serif font-bold text-[10px] xs:text-xs shadow-md scale-105' 
                    : 'text-[#E0C2CA]/75 hover:text-white hover:bg-white/10 p-2 text-xs'
                }`}
                title={item.label}
                aria-label={item.label}
              >
                <IconComponent size={14} className={`shrink-0 ${isActive ? 'text-[#19030A]' : 'text-[#E5C57B]'}`} />
                {isActive && (
                  <span className="text-[10px] xs:text-[11px] font-bold tracking-wide whitespace-nowrap animate-fade-in">
                    {item.label}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      </nav>

      {/* =========================================================================
          LIGHTBOX PHOTO MODAL (Swipe / Prev / Next)
          ========================================================================= */}
      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 sm:p-8"
          onClick={() => setActivePhotoIndex(null)}
        >
          {/* Top Bar with Counter & Close */}
          <div className="w-full flex items-center justify-between z-10" onClick={e => e.stopPropagation()}>
            <div className="px-3 py-1 rounded-full bg-[#26050C] border border-[#D4AF37]/50 text-xs font-serif text-[#D4AF37]">
              Foto {activePhotoIndex + 1} dari {filteredGallery.length}
            </div>
            <button
              type="button"
              onClick={() => setActivePhotoIndex(null)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Photo with Prev / Next Buttons */}
          <div className="relative my-auto max-w-4xl max-h-[75vh] flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setActivePhotoIndex((activePhotoIndex - 1 + filteredGallery.length) % filteredGallery.length)}
              className="absolute -left-3 sm:-left-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#26050C]/90 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-lg z-20"
            >
              <ChevronLeft size={20} />
            </button>

            <img
              src={filteredGallery[activePhotoIndex]?.image_url}
              alt="Fullscreen Preview"
              className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-[#D4AF37]/50 shadow-2xl"
            />

            <button
              type="button"
              onClick={() => setActivePhotoIndex((activePhotoIndex + 1) % filteredGallery.length)}
              className="absolute -right-3 sm:-right-12 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#26050C]/90 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all shadow-lg z-20"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Caption */}
          <div className="text-center z-10 max-w-md" onClick={e => e.stopPropagation()}>
            <p className="font-serif text-sm text-white drop-shadow">
              {filteredGallery[activePhotoIndex]?.caption || `Dokumentasi Pernikahan ${groomName} & ${brideName}`}
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          AR PHOTOBOOTH MODAL (Camera & Upload)
          ========================================================================= */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-md bg-[#26050C] border-2 border-[#D4AF37] rounded-3xl p-5 sm:p-6 shadow-2xl text-center text-white overflow-hidden">
            <button
              type="button"
              onClick={() => {
                stopCamera();
                setIsCameraModalOpen(false);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors cursor-pointer z-20"
            >
              <X size={18} />
            </button>

            {photoboothMode === 'choice' && (
              <div className="py-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#3D0B14] border-2 border-[#D4AF37] flex items-center justify-center text-[#D4AF37] mb-3 shadow-md">
                  <Camera size={26} />
                </div>
                <h3 className="font-serif text-xl font-bold text-white mb-1">
                  AR Burgundy Photobooth
                </h3>
                <p className="text-xs text-[#D4B4B9] max-w-xs mx-auto mb-6">
                  Pilih cara mengambil foto dengan bingkai beludru bordeaux berbalut ornamen emas klasik.
                </p>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setPhotoboothMode('camera');
                      startCamera(cameraFacingMode);
                    }}
                    className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md hover:brightness-110 active:scale-95"
                  >
                    <Camera size={16} />
                    <span>Buka Kamera Sekarang</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3 rounded-full bg-[#1A0307] text-[#F5E5C9] border border-[#D4AF37]/60 font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-sm hover:bg-[#3D0B14] active:scale-95"
                  >
                    <Download size={16} />
                    <span>Upload Foto dari Galeri</span>
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleUploadPhoto}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={downloadBurgundyFramePNG}
                    className="inline-block text-[11px] text-[#D4AF37] hover:underline font-serif font-semibold mt-2 cursor-pointer"
                  >
                    ↓ Download Frame PNG Transparan
                  </button>
                </div>
              </div>
            )}

            {photoboothMode === 'camera' && (
              <div className="relative flex flex-col items-center">
                <div className="relative w-full aspect-[9/16] max-h-[60vh] bg-black rounded-2xl overflow-hidden border border-[#D4AF37] shadow-inner mb-4">
                  {cameraError ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <p className="text-xs text-red-300 mb-3">{cameraError}</p>
                      <button
                        type="button"
                        onClick={() => startCamera(cameraFacingMode)}
                        className="px-4 py-2 rounded-full bg-[#D4AF37] text-[#1A0307] font-bold text-xs"
                      >
                        Coba Lagi
                      </button>
                    </div>
                  ) : (
                    <>
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`w-full h-full object-cover ${cameraFacingMode === 'user' ? 'scale-x-[-1]' : ''}`}
                      />
                      {/* Frame Guide Overlay in Viewfinder */}
                      <div className="absolute inset-3 rounded-xl border border-[#D4AF37]/60 border-dashed pointer-events-none flex flex-col justify-between p-3 text-center">
                        <span className="text-[9px] font-serif uppercase tracking-widest text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded-full mx-auto">
                          ✦ BURGUNDY AR FRAME ✦
                        </span>
                        <span className="text-[10px] font-serif font-bold text-white bg-black/60 px-2.5 py-1 rounded-full mx-auto">
                          {groomName} &amp; {brideName}
                        </span>
                      </div>
                    </>
                  )}

                  {isFlashing && (
                    <div className="absolute inset-0 bg-white pointer-events-none animate-ping" />
                  )}
                </div>

                <div className="flex items-center justify-center gap-4 w-full">
                  <button
                    type="button"
                    onClick={flipCamera}
                    className="w-11 h-11 rounded-full bg-[#1A0307] border border-[#B88B4A] text-[#D4AF37] flex items-center justify-center shadow cursor-pointer hover:scale-105 active:scale-95"
                    title="Ganti Kamera Depan/Belakang"
                  >
                    <RefreshCw size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={capturePhoto}
                    disabled={isCapturing || Boolean(cameraError)}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F5E5C9] border-4 border-[#1A0307] text-[#1A0307] flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-[#1A0307] flex items-center justify-center">
                      <Camera size={24} />
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setPhotoboothMode('choice');
                    }}
                    className="w-11 h-11 rounded-full bg-[#1A0307] border border-[#B88B4A] text-[#D4B4B9] flex items-center justify-center shadow cursor-pointer hover:scale-105 active:scale-95"
                    title="Kembali"
                  >
                    <ChevronLeft size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Snapshot Preview Modal */}
      {isPreviewOpen && capturedSnapshot && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between items-center p-4 sm:p-6">
          <div className="w-full flex items-center justify-between">
            <span className="text-xs font-serif text-[#D4AF37]">
              Pratinjau Foto Bordeaux
            </span>
            <button
              type="button"
              onClick={() => {
                setIsPreviewOpen(false);
                setCapturedSnapshot(null);
                setPhotoboothMode('choice');
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          <div className="my-auto max-w-sm max-h-[70vh] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-2xl">
            <img src={capturedSnapshot} alt="Hasil Foto" className="w-full h-full object-contain" />
          </div>

          <div className="w-full max-w-sm flex flex-col gap-2">
            <a
              href={capturedSnapshot}
              download={`Bordeaux_Photo_${groomName}_${brideName}.jpg`}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B88B4A] text-[#1A0307] font-serif font-bold text-xs uppercase tracking-wider text-center shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              ↓ Simpan Foto ke Galeri HP
            </a>
            <button
              type="button"
              onClick={() => {
                setIsPreviewOpen(false);
                setCapturedSnapshot(null);
                setPhotoboothMode('camera');
                startCamera(cameraFacingMode);
              }}
              className="w-full py-2.5 rounded-full bg-[#26050C] text-[#F5E5C9] border border-[#B88B4A]/60 font-serif text-xs font-semibold hover:bg-[#3D0B14] cursor-pointer"
            >
              Ambil Ulang Foto
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
