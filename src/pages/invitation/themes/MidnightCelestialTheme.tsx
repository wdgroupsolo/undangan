import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, ChevronRight,
  ExternalLink, Bookmark, Crown, Video, Shirt, Info,
  Camera, SwitchCamera, Image as ImageIcon, Loader2, Download,
  QrCode, Barcode, CheckCircle2, Star, Moon, Compass, Gem, X, Music, CreditCard,
  RefreshCw, Upload, Navigation
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode } from '../../../utils/barcodePass';

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// =========================================================================
// SCROLL REVEAL UTILITY
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
    window.addEventListener('scroll', checkVisibility, { passive: true });
    window.addEventListener('resize', checkVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', checkVisibility);
      window.removeEventListener('resize', checkVisibility);
    };
  }, []);

  const getAnimClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up': return 'opacity-0 translate-y-8';
        case 'fade-down': return 'opacity-0 -translate-y-8';
        case 'zoom-in': return 'opacity-0 scale-90';
        case 'slide-left': return 'opacity-0 translate-x-8';
        case 'slide-right': return 'opacity-0 -translate-x-8';
        case 'fade-in': default: return 'opacity-0';
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
      className={`transition-all ease-out ${getAnimClass()} ${className}`}
    >
      {children}
    </div>
  );
};

// =========================================================================
// INTERACTIVE CELESTIAL BACKGROUND CANVAS (Twinkling Stars & Shooting Meteors)
// =========================================================================
export const CelestialBackgroundCanvas: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate stars
    const starCount = Math.floor(Math.min(width, 1440) * 0.08);
    const stars: Array<{
      x: number;
      y: number;
      radius: number;
      alpha: number;
      twinkleSpeed: number;
      color: string;
    }> = [];

    const starColors = ['#FFFFFF', '#E2E8F0', '#BAE6FD', '#C7D2FE', '#F8FAFC'];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.4,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.006,
        color: starColors[Math.floor(Math.random() * starColors.length)],
      });
    }

    // Shooting stars
    interface Meteor {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }
    const meteors: Meteor[] = [];

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.8 + width * 0.1,
        y: Math.random() * height * 0.4,
        length: Math.random() * 80 + 60,
        speed: Math.random() * 6 + 7,
        angle: (Math.PI / 4) + (Math.random() * 0.15 - 0.075),
        alpha: 1,
        active: true,
      });
    };

    let meteorTimer = setInterval(() => {
      if (Math.random() > 0.4) spawnMeteor();
    }, 4500);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      for (let star of stars) {
        star.alpha += star.twinkleSpeed;
        if (star.alpha > 1 || star.alpha < 0.15) {
          star.twinkleSpeed = -star.twinkleSpeed;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
        ctx.fillStyle = star.color;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra flare on large stars
        if (star.radius > 1.4 && star.alpha > 0.6) {
          ctx.strokeStyle = star.color;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(star.x - star.radius * 2.5, star.y);
          ctx.lineTo(star.x + star.radius * 2.5, star.y);
          ctx.moveTo(star.x, star.y - star.radius * 2.5);
          ctx.lineTo(star.x, star.y + star.radius * 2.5);
          ctx.stroke();
        }
        ctx.restore();
      }

      // Render meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        if (!m.active) continue;

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0)');
        grad.addColorStop(0.7, `rgba(186, 230, 253, ${m.alpha * 0.6})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${m.alpha})`);

        ctx.save();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();

        // Glowing meteor head
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(m.x, m.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.alpha -= 0.012;

        if (m.alpha <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearInterval(meteorTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

// =========================================================================
// CELESTIAL STARLIGHT DIVIDER (Silver Constellation & Crescent)
// =========================================================================
export const CelestialStarlightDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-6 opacity-90 select-none ${className}`}>
    <div className="h-[1.5px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#94A3B8] to-[#E2E8F0]" />
    <div className="flex items-center gap-2 text-[#E2E8F0]">
      <div className="w-1.5 h-1.5 rotate-45 bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="drop-shadow-[0_0_10px_rgba(255,255,255,0.75)]">
        <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="0.5" />
        <circle cx="12" cy="12" r="2" fill="#38BDF8" />
      </svg>
      <div className="w-1.5 h-1.5 rotate-45 bg-[#38BDF8] shadow-[0_0_8px_#38BDF8]" />
    </div>
    <div className="h-[1.5px] w-14 sm:w-24 bg-gradient-to-l from-transparent via-[#94A3B8] to-[#E2E8F0]" />
  </div>
);

// =========================================================================
// CORNER CONSTELLATION FLOURISH
// =========================================================================
export const CelestialCornerFlourish: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}> = ({ position, className = '', size = 80 }) => {
  const rotation = {
    'top-left': 'rotate-0',
    'top-right': 'scale-x-[-1]',
    'bottom-left': 'scale-y-[-1]',
    'bottom-right': 'scale-[-1]',
  }[position];

  return (
    <div className={`pointer-events-none select-none ${rotation} ${className}`}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <defs>
          <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Constellation arc lines */}
        <path d="M 6 90 C 6 40, 40 6, 90 6" stroke="url(#silverGrad)" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.65" />
        <path d="M 14 90 C 14 48, 48 14, 90 14" stroke="#E2E8F0" strokeWidth="1" opacity="0.4" />
        
        {/* Major Stars */}
        <circle cx="12" cy="50" r="2.5" fill="#FFFFFF" className="animate-pulse" />
        <circle cx="30" cy="30" r="3" fill="#38BDF8" className="animate-pulse" />
        <circle cx="50" cy="12" r="2" fill="#FFFFFF" />
        
        {/* Corner 8-point star */}
        <g transform="translate(16, 16)">
          <path d="M 12 0 L 14 9 L 24 12 L 14 15 L 12 24 L 10 15 L 0 12 L 10 9 Z" fill="#F8FAFC" stroke="#38BDF8" strokeWidth="0.5" />
          <circle cx="12" cy="12" r="2" fill="#38BDF8" />
        </g>
      </svg>
    </div>
  );
};

// =========================================================================
// CELESTIAL ROYAL CREST MONOGRAM
// =========================================================================
export const CelestialRoyalCrest: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  initials,
  size = 'md',
  className = ''
}) => {
  const dim = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';
  const textSz = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm';
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className={`${dim} rounded-full bg-gradient-to-br from-white via-[#94A3B8] to-[#38BDF8] p-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.3)] shrink-0`}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0B152B] via-[#060D1E] to-[#030712] flex flex-col items-center justify-center border border-[#94A3B8]/60 text-[#BAE6FD] px-1 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.25)_0%,transparent_70%)] pointer-events-none" />
          <Moon className="w-4 h-4 text-[#38BDF8] mb-0.5 shrink-0" />
          <span className={`font-serif font-bold tracking-widest text-[#F8FAFC] whitespace-nowrap select-none ${textSz} relative z-10`}>
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// CELESTIAL CRESCENT MOON & STARLIGHT PHOTO FRAME
// =========================================================================
export const CelestialCrescentFrame: React.FC<{
  imageSrc: string;
  altText: string;
  className?: string;
  frameWidthClass?: string;
  frameHeightClass?: string;
  variant?: 'midnight' | 'silver';
}> = ({
  imageSrc,
  altText,
  className = '',
  frameWidthClass = 'w-48 sm:w-56',
  frameHeightClass = 'h-64 sm:h-76',
}) => {
  const [imgSrc, setImgSrc] = useState(imageSrc || '/photos/photo-7.jpg');

  useEffect(() => {
    if (imageSrc) {
      setImgSrc(imageSrc);
    }
  }, [imageSrc]);

  return (
    <div className={`relative mx-auto ${frameWidthClass} ${frameHeightClass} flex items-center justify-center group ${className}`}>
      {/* Outer Cosmic Halo Glow */}
      <div className="absolute -inset-4 rounded-[42px] bg-gradient-to-tr from-[#38BDF8]/20 via-transparent to-[#818CF8]/25 blur-xl pointer-events-none" />

      {/* Silver Starlight Outer Astrological Orbit Line */}
      <div className="absolute -inset-2.5 rounded-[36px] border border-[#94A3B8]/40 border-dashed pointer-events-none" />

      {/* Main Image Container with Arched Celestial Dome */}
      <div className="relative w-full h-full rounded-t-[100px] rounded-b-[28px] p-[2.5px] bg-gradient-to-b from-[#FFFFFF] via-[#94A3B8] to-[#1E293B] shadow-[0_20px_50px_rgba(3,7,18,0.9),0_0_30px_rgba(56,189,248,0.25)] overflow-hidden">
        <div className="w-full h-full rounded-t-[98px] rounded-b-[26px] overflow-hidden relative bg-[#060D1E]">
          <img
            src={imgSrc}
            alt={altText}
            onError={() => {
              if (imgSrc !== '/photos/photo-7.jpg') {
                setImgSrc('/photos/photo-7.jpg');
              }
            }}
            className="w-full h-full object-cover object-top sm:object-center transition-transform duration-700 group-hover:scale-105 filter brightness-95"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050B18]/70 via-transparent to-[#050B18]/30 pointer-events-none" />
          
          {/* Subtle Metallic Silver Starlight Sheen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
              style={{ animation: 'celestialSheen 6s ease-in-out infinite' }}
            />
          </div>
        </div>
      </div>

      {/* Apex Silver Crescent Moon & Star Crest */}
      <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none flex flex-col items-center">
        <div className="relative w-12 h-12 rounded-full bg-[#0B152B]/90 backdrop-blur-md border border-[#E2E8F0] shadow-[0_0_20px_rgba(255,255,255,0.7),0_0_10px_rgba(56,189,248,0.5)] flex items-center justify-center">
          <Moon className="w-6 h-6 text-[#F8FAFC] fill-[#E2E8F0]/30 -rotate-12" />
          <Star className="w-3.5 h-3.5 text-[#38BDF8] fill-[#38BDF8] absolute top-2 right-2 animate-pulse" />
        </div>
      </div>

      {/* Bottom Constellation Coordinates Badge */}
      <div className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A1329]/95 backdrop-blur-md border border-[#94A3B8]/60 text-[10px] font-mono tracking-wider text-[#BAE6FD] shadow-lg">
          <Sparkles className="w-3 h-3 text-[#38BDF8]" />
          <span>EST. CELESTIAL ∞</span>
        </div>
      </div>
    </div>
  );
};

// =========================================================================
// MAIN MIDNIGHT CELESTIAL STAR THEME (Paket Rp 150.000 Masterpiece)
// =========================================================================
export interface MidnightCelestialThemeProps {
  invitation: any;
  couple?: any;
  events?: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: string;
  guestName?: string;
  isOpening?: boolean;
}

export const MidnightCelestialTheme: React.FC<MidnightCelestialThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName = 'Tamu Undangan',
  isOpening = true,
}) => {
  const toast = useToast();

  // Active section for floating navbar
  const [activeSection, setActiveSection] = useState('sampul');

  // Calendar reminder modal
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<CalendarEventData | null>(null);

  // Gallery fullscreen lightbox modal
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  // AR Photobooth Camera Modal State (150k VIP Feature)
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
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpCount, setRsvpCount] = useState<number>(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpList, setRsvpList] = useState<RSVPItem[]>([]);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Bank Copy State
  const [copiedBankIdx, setCopiedBankIdx] = useState<number | null>(null);

  // Couple Data
  const groomName = couple?.groom_name || couple?.groom_nickname || invitation?.groom_name || 'Steven';
  const groomFullName = couple?.groom_full_name || invitation?.groom_full_name || 'Steven Adiwijaya, S.T.';
  const groomParents = couple?.groom_parents || invitation?.groom_parents || 'Putra Pertama dari Bpk. Ir. Hendra Adiwijaya & Ibu Meliana';
  const groomInstagram = couple?.groom_instagram || invitation?.groom_instagram || '@steven.adi';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/photo-7.jpg';

  const brideName = couple?.bride_name || couple?.bride_nickname || invitation?.bride_name || 'Bunga';
  const brideFullName = couple?.bride_full_name || invitation?.bride_full_name || 'Bunga Citra Lestari, S.Ds.';
  const brideParents = couple?.bride_parents || invitation?.bride_parents || 'Putri Kedua dari Bpk. Wijaya Kusuma & Ibu Anita Suryani';
  const brideInstagram = couple?.bride_instagram || invitation?.bride_instagram || '@bunga.lestari';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/photo-4.jpg';

  const rawCouplePhoto = invitation?.settings?.cover_photo || couple?.cover_photo_url || couple?.cover_photo || '';
  const couplePhoto = (rawCouplePhoto && !rawCouplePhoto.includes('photo-3.jpg') && !rawCouplePhoto.includes('theme-preview.jpg'))
    ? rawCouplePhoto
    : '/photos/photo-7.jpg';

  const coupleInitials = `${(groomName[0] || 'S').toUpperCase()}${(brideName[0] || 'B').toUpperCase()}`;

  // Wedding Date & Countdown
  const targetDateStr = invitation?.wedding_date || '2026-10-12T09:00:00';
  const targetDate = new Date(targetDateStr);

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // VIP Barcode Pass (150k Masterpiece Tier)
  const [barcodeCode, setBarcodeCode] = useState('');
  useEffect(() => {
    const saved = loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'celestial');
    if (saved && saved.code) {
      setBarcodeCode(saved.code);
    } else {
      const newCode = generateStableBarcodeCode('VIP', invitation?.slug || 'CELESTIAL', guestName);
      setBarcodeCode(newCode);
      saveBarcodePass({ code: newCode, name: guestName, attendance: 'attending', guests: 2 }, invitation?.id, invitation?.slug, 'celestial');
    }
  }, [guestName, groomName, invitation?.id, invitation?.slug]);

  // Gallery items with rock-solid fallback to valid Steven & Bunga photos
  const rawGallery = gallery && gallery.length > 0 ? gallery : [
    { url: '/photos/photo-7.jpg', caption: 'Starlight Romance' },
    { url: '/photos/photo-1.jpg', caption: 'Kebersamaan & Tawa Bahagia' },
    { url: '/photos/photo-4.jpg', caption: 'Pesona Anggun Mempelai Putri' },
    { url: '/photos/photo-5.jpg', caption: 'Genggaman Menuju Masa Depan' },
    { url: '/photos/photo-6.jpg', caption: 'Senyum Bahagia Hari Sakral' },
    { url: '/photos/photo-8.jpg', caption: 'Langkah Menuju Janji Suci' },
  ];
  const displayGallery = rawGallery.map((item: any, i: number) => ({
    url: item?.url || item?.image_url || [
      '/photos/photo-7.jpg',
      '/photos/photo-1.jpg',
      '/photos/photo-4.jpg',
      '/photos/photo-5.jpg',
      '/photos/photo-6.jpg',
      '/photos/photo-8.jpg'
    ][i % 6],
    caption: item?.caption || `Momen Bahagia ${i + 1}`
  }));

  // Events
  const displayEvents = events.length > 0 ? events : [
    {
      title: 'Akad Nikah / Pemberkatan',
      date: 'Senin, 12 Oktober 2026',
      time: '08:00 - 10:00 WIB',
      location: 'The Celestial Ballroom',
      address: 'Jl. Surya Kencana No. 88, Jakarta Selatan',
      maps_url: 'https://maps.google.com',
    },
    {
      title: 'Resepsi Gala Celestial',
      date: 'Senin, 12 Oktober 2026',
      time: '18:30 - 21:30 WIB',
      location: 'The Celestial Ballroom',
      address: 'Jl. Surya Kencana No. 88, Jakarta Selatan',
      maps_url: 'https://maps.google.com',
    },
  ];

  // Love Story
  const displayStories = stories.length > 0 ? stories : [
    { year: '2021', title: 'Pertemuan Pertama', story: 'Di bawah langit malam kota, dua pandangan bertemu tanpa sengaja di sebuah galeri seni astronomi.' },
    { year: '2023', title: 'Komitmen & Janji', story: 'Setelah melewati berbagai musim kehidupan, kami yakin bahwa semesta telah menakdirkan langkah kami bersatu.' },
    { year: '2026', title: 'Menuju Keabadian', story: 'Dengan restu kedua orang tua dan doa semeton keluarga, kami mengikat janji suci pernikahan selamanya.' },
  ];

  // Bank accounts
  const displayGifts = gifts.length > 0 ? gifts : [
    { bank_name: 'BCA Digital', account_number: '8830 1928 4710', account_holder: `${groomName.toUpperCase()} ADIWIJAYA` },
    { bank_name: 'Bank Mandiri', account_number: '1370 0293 8472', account_holder: `${brideName.toUpperCase()} CITRA LESTARI` },
  ];

  // Copy bank account
  const handleCopyBank = (accNum: string, idx: number) => {
    navigator.clipboard.writeText(accNum.replace(/\s+/g, ''));
    setCopiedBankIdx(idx);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedBankIdx(null), 2500);
  };

  // RSVP Fetch & Submit
  useEffect(() => {
    const fetchRSVP = async () => {
      try {
        if (!invitation?.id) return;
        const list = await rsvpService.getRsvpsByInvitation(invitation.id);
        setRsvpList(list || []);
      } catch (e) {
        console.warn('Failed to fetch RSVP:', e);
      }
    };
    fetchRSVP();
  }, [invitation?.id]);

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon isi nama Anda');
      return;
    }
    setIsSubmittingRsvp(true);
    try {
      if (invitation?.id) {
        await rsvpService.submitRsvp({
          invitation_id: invitation.id,
          name: rsvpName.trim(),
          attendance: rsvpStatus === 'ragu' ? 'maybe' : (rsvpStatus === 'hadir' ? 'attending' : 'not_attending'),
          number_of_guests: rsvpCount,
          message: rsvpMessage.trim() || null,
        });
        const updated = await rsvpService.getRsvpsByInvitation(invitation.id);
        setRsvpList(updated || []);
      }
      setRsvpSubmitted(true);
      toast.success('Doa & konfirmasi kehadiran berhasil dikirim!');
    } catch {
      setRsvpSubmitted(true);
      toast.success('Terima kasih atas doa restunya!');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Draw high-resolution Celestial Silver & Sky Frame onto canvas context
  const drawCelestialSilverFrame = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    isTransparent = false
  ) => {
    if (!isTransparent) {
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.35,
        width / 2, height / 2, width * 0.85
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(3, 7, 18, 0.55)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    const strokeRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.stroke();
    };
    const fillRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof (ctx as any).roundRect === 'function') {
        (ctx as any).roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fill();
    };

    const outerMargin = Math.round(width * 0.02);
    const outerRadius = Math.round(width * 0.024);
    const innerMargin = Math.round(width * 0.035);
    const innerRadius = Math.round(width * 0.018);

    // Silver Outer Border
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = Math.max(3, Math.round(width * 0.005));
    strokeRounded(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, outerRadius);

    // Inner Dashed Sky Blue Border
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
    ctx.lineWidth = Math.max(1.5, Math.round(width * 0.002));
    ctx.setLineDash([Math.round(width * 0.012), Math.round(width * 0.008)]);
    strokeRounded(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2, innerRadius);
    ctx.setLineDash([]);

    // 2. Top Celestial Monogram Medallion with Crescent Moon and Initials
    const sealX = width / 2;
    const sealY = Math.round(height * 0.075);
    const sealR = Math.round(width * 0.055);

    ctx.fillStyle = 'rgba(5, 11, 24, 0.9)';
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = Math.max(2, Math.round(width * 0.0035));
    ctx.stroke();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
    ctx.lineWidth = Math.max(1, Math.round(width * 0.0015));
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - Math.round(width * 0.007), 0, Math.PI * 2);
    ctx.stroke();

    // Medallion Dynamic Initials
    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(sealR * 0.45)}px "Cinzel", "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(coupleInitials, sealX, sealY + 2);

    // 3. Bottom Watermark Plaque
    const plaqueMargin = Math.round(width * 0.04);
    const plaqueW = width - (plaqueMargin * 2);
    const plaqueH = Math.round(height * 0.065);
    const plaqueX = plaqueMargin;
    const plaqueY = height - plaqueH - Math.round(height * 0.035);
    const plaqueRadius = Math.round(plaqueH * 0.22);

    ctx.fillStyle = 'rgba(5, 11, 24, 0.88)';
    fillRounded(plaqueX, plaqueY, plaqueW, plaqueH, plaqueRadius);

    ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
    ctx.lineWidth = Math.max(1.5, Math.round(width * 0.002));
    strokeRounded(plaqueX, plaqueY, plaqueW, plaqueH, plaqueRadius);

    // Plaque Text
    ctx.fillStyle = '#38BDF8';
    ctx.font = `bold ${Math.round(plaqueH * 0.22)}px "Cinzel", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('THE CELESTIAL WEDDING CELEBRATION', width / 2, plaqueY + plaqueH * 0.32);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = `bold ${Math.round(plaqueH * 0.28)}px "Playfair Display", Georgia, serif`;
    ctx.fillText(`${groomName.toUpperCase()} & ${brideName.toUpperCase()}`, width / 2, plaqueY + plaqueH * 0.68);
  };

  // Choose Camera Mode
  const chooseCameraMode = () => {
    setPhotoboothMode('camera');
    setUploadedRawImage(null);
    startCamera('user');
  };

  // Choose Upload Photo
  const triggerUploadPhoto = () => {
    fileInputRef.current?.click();
  };

  // Camera Management for AR Photobooth
  const startCamera = async (facing: 'user' | 'environment' = cameraFacingMode) => {
    setCameraError(null);
    setIsCameraModalOpen(true);
    setPhotoboothMode('camera');
    setUploadedRawImage(null);
    setIsPreviewOpen(false);
    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1920 }, height: { ideal: 1080 } },
          audio: false,
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: facing, width: { ideal: 1280 }, height: { ideal: 720 } },
          audio: false,
        });
      }
      setCameraStream(stream);
      setCameraFacingMode(facing);
    } catch (e) {
      console.warn('Camera error:', e);
      setCameraError('Izin akses kamera belum diaktifkan pada peramban ini.');
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
  };

  const closeCameraModal = () => {
    stopCamera();
    setIsCameraModalOpen(false);
    setPhotoboothMode('choice');
    setUploadedRawImage(null);
    setIsPreviewOpen(false);
    setSnapshotNotification(null);
    setCameraError(null);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
  };

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // Fast Full HD JPEG Snapshot Capture with Starlight Silver Frame
  const captureSnapshot = () => {
    if (!videoRef.current || isCapturing) return;
    const video = videoRef.current;

    setIsFlashing(true);
    setIsCapturing(true);

    requestAnimationFrame(() => {
      setTimeout(() => {
        try {
          const canvas = canvasRef.current || document.createElement('canvas');
          const TARGET_W = 1080;
          const TARGET_H = 1440;
          canvas.width = TARGET_W;
          canvas.height = TARGET_H;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const vW = video.videoWidth || 1080;
          const vH = video.videoHeight || 1440;
          const isMirrored = cameraFacingMode === 'user';

          ctx.save();
          if (isMirrored) {
            ctx.translate(TARGET_W, 0);
            ctx.scale(-1, 1);
          }
          ctx.drawImage(video, 0, 0, vW, vH, 0, 0, TARGET_W, TARGET_H);
          ctx.restore();

          // Overlay Celestial Platinum Frame
          drawCelestialSilverFrame(ctx, TARGET_W, TARGET_H, false);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          setCapturedSnapshot(dataUrl);
          setSnapshotNotification({ visible: true, url: dataUrl });
          if (notificationTimeoutRef.current) clearTimeout(notificationTimeoutRef.current);
          notificationTimeoutRef.current = setTimeout(() => {
            setSnapshotNotification(null);
          }, 8000);
        } finally {
          setIsFlashing(false);
          setIsCapturing(false);
        }
      }, 40);
    });
  };

  // Upload Photo from Gallery Handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Harap pilih file gambar (JPG, PNG, WebP).');
      return;
    }

    setIsProcessingUpload(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const TARGET_W = 1080;
          const TARGET_H = 1440;
          canvas.width = TARGET_W;
          canvas.height = TARGET_H;
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          const imgAspect = img.width / img.height;
          const targetAspect = TARGET_W / TARGET_H;
          let drawW = TARGET_W;
          let drawH = TARGET_H;
          let offsetX = 0;
          let offsetY = 0;

          if (imgAspect > targetAspect) {
            drawH = TARGET_H;
            drawW = TARGET_H * imgAspect;
            offsetX = (TARGET_W - drawW) / 2;
          } else {
            drawW = TARGET_W;
            drawH = TARGET_W / imgAspect;
            offsetY = (TARGET_H - drawH) / 2;
          }

          ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
          drawCelestialSilverFrame(ctx, TARGET_W, TARGET_H, false);

          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          setUploadedRawImage(dataUrl);
          setCapturedSnapshot(dataUrl);
          setPhotoboothMode('uploaded-preview');
          setIsCameraModalOpen(true);
          toast.success('Foto berhasil dipasang ke frame starlight!');
        } catch {
          toast.error('Gagal memproses gambar galeri.');
        } finally {
          setIsProcessingUpload(false);
          if (fileInputRef.current) fileInputRef.current.value = '';
        }
      };
      img.onerror = () => {
        toast.error('Gagal memuat gambar.');
        setIsProcessingUpload(false);
      };
      img.src = event.target?.result as string;
    };
    reader.onerror = () => {
      toast.error('Gagal membaca berkas.');
      setIsProcessingUpload(false);
    };
    reader.readAsDataURL(file);
  };

  const downloadCelestialFramePNG = () => {
    try {
      const canvas = document.createElement('canvas');
      const TARGET_W = 1080;
      const TARGET_H = 1440;
      canvas.width = TARGET_W;
      canvas.height = TARGET_H;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, TARGET_W, TARGET_H);
      drawCelestialSilverFrame(ctx, TARGET_W, TARGET_H, true);
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `Celestial_Frame_${groomName}_${brideName}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Template bingkai transparan berhasil diunduh!');
    } catch {
      toast.error('Gagal membuat frame transparan.');
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#F8FAFC] font-sans relative selection:bg-[#38BDF8] selection:text-[#030712] overflow-x-hidden">
      <style>{`
        @keyframes celestialSheen {
          0% { transform: translateX(-150%) skewX(-20deg); }
          40%, 100% { transform: translateX(350%) skewX(-20deg); }
        }
      `}</style>

      {/* Interactive Twinkling Stars & Meteor Canvas */}
      <CelestialBackgroundCanvas />

      {/* Atmospheric Nebula Glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-[#38BDF8]/10 via-[#818CF8]/10 to-transparent blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-[#6366F1]/10 via-[#0EA5E9]/10 to-transparent blur-[100px] rounded-full" />
      </div>

      {/* Hidden File Input for Gallery Photo Upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* =========================================================================
          DESKTOP LEFT FIXED ASIDE (Cinematic Full Showcase on Large Screens)
          ========================================================================= */}
      <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-6 xl:p-8 2xl:p-10 overflow-hidden bg-[#030712] border-r border-[#38BDF8]/30 shadow-2xl select-none">
        {/* Background image with cinematic midnight starlight vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
          style={{ backgroundImage: `url(${couplePhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#050B18]/80 via-55% to-[#030712]/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.6)_70%,rgba(3,7,18,0.95)_100%)] pointer-events-none" />

        {/* Architectural Silver Hairline Frames & Corner Constellations */}
        <div className="absolute inset-4 rounded-3xl border border-[#94A3B8]/30 pointer-events-none z-10" />
        <div className="absolute inset-5 rounded-2xl border border-[#38BDF8]/20 pointer-events-none z-10" />
        <div className="absolute top-4 left-4"><CelestialCornerFlourish position="top-left" size={60} /></div>
        <div className="absolute top-4 right-4"><CelestialCornerFlourish position="top-right" size={60} /></div>
        <div className="absolute bottom-4 left-4"><CelestialCornerFlourish position="bottom-left" size={60} /></div>
        <div className="absolute bottom-4 right-4"><CelestialCornerFlourish position="bottom-right" size={60} /></div>

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B152B]/90 backdrop-blur-md border border-[#38BDF8]/60 text-[#BAE6FD] text-[10.5px] font-serif uppercase tracking-[0.2em] shadow-md font-bold">
            <Crown className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>THE ROYAL MASTERPIECE</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B152B]/85 backdrop-blur-md border border-[#94A3B8]/40 text-[#BAE6FD] text-[9.5px] font-serif tracking-widest uppercase shadow-xs">
            <Sparkles className="w-3 h-3 text-[#38BDF8]" />
            <span>MIDNIGHT CELESTIAL</span>
          </div>
        </div>

        {/* Center Content: VIP Cartouche, Monogram, Typography & Countdown */}
        <div className="relative z-10 my-auto text-left py-2 sm:py-3 max-w-md">
          {/* VIP Recognition Cartouche */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0E1A38]/90 via-[#0A132B]/95 to-[#040817]/98 border border-[#38BDF8]/60 shadow-lg text-white mb-2.5">
            <Crown className="w-3 h-3 text-[#38BDF8]" />
            <span className="text-[10px] uppercase tracking-wider text-[#BAE6FD]/85 font-serif font-medium">Spesial Untuk:</span>
            <span className="text-xs font-serif font-bold text-white tracking-wide truncate max-w-[160px]">{guestName}</span>
            <span className="text-[8px] bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs">VIP</span>
          </div>

          <CelestialRoyalCrest initials={coupleInitials} size="md" className="!items-start mb-2.5" />
          
          <span className="text-[10.5px] font-serif uppercase tracking-[0.3em] text-[#38BDF8] font-semibold block mb-1">
            THE CELESTIAL WEDDING OF
          </span>
          <h1 className="font-serif text-3xl xl:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#BAE6FD] drop-shadow-[0_4px_25px_rgba(56,189,248,0.4)]">
            {groomName} <span className="font-light italic text-[#38BDF8]">&amp;</span> {brideName}
          </h1>

          <div className="flex items-center gap-2 text-xs xl:text-sm text-[#94A3B8] mt-1.5 font-serif">
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>Senin, 12 Oktober 2026</span>
            <span className="text-[#38BDF8]/60">•</span>
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>The Celestial Ballroom, Jakarta</span>
          </div>

          <div className="w-20 h-0.5 bg-gradient-to-r from-[#38BDF8] via-[#38BDF8]/60 to-transparent my-2.5 sm:my-3" />
          <p className="text-xs text-white/85 max-w-sm leading-relaxed font-light">
            Menyatukan dua insan dalam ikatan suci pernikahan di bawah naungan keagungan bintang dan semesta cinta abadi bernuansa Midnight &amp; Silver.
          </p>

          {/* Aside Live Countdown Card */}
          <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#0B152B]/90 via-[#070E20]/95 to-[#030712]/98 backdrop-blur-md border border-[#38BDF8]/50 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.2)] text-center max-w-sm mt-3 sm:mt-4">
            <div className="absolute inset-1 rounded-xl border border-[#94A3B8]/20 pointer-events-none" />
            <div className="flex items-center justify-between mb-2 px-1">
              <span className="text-[9.5px] tracking-[0.25em] font-serif uppercase text-[#38BDF8] font-bold flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                <span>HITUNG MUNDUR HARI SAKRAL</span>
              </span>
              <span className="text-[9px] text-[#94A3B8] font-serif italic">Jakarta Selatan</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: 'HARI', val: timeLeft.days },
                { label: 'JAM', val: timeLeft.hours },
                { label: 'MENIT', val: timeLeft.minutes },
                { label: 'DETIK', val: timeLeft.seconds },
              ].map((tile, idx) => (
                <div key={idx} className="bg-gradient-to-b from-[#040817]/95 via-black/80 to-[#040817]/95 rounded-xl p-2 border border-[#94A3B8]/35 text-center shadow-inner relative group hover:border-[#38BDF8] transition-colors">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-[#F8FAFC] to-[#BAE6FD] block leading-tight">
                    {String(tile.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] font-sans tracking-widest text-[#BAE6FD]/90 uppercase font-semibold">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Actions for Desktop Viewers */}
            <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-[#94A3B8]/20">
              <button
                type="button"
                onClick={() => {
                  const ev = displayEvents[0];
                  setSelectedCalendarEvent({
                    title: `The Wedding of ${groomName} & ${brideName}`,
                    description: `Menghadiri pernikahan suci ${groomFullName} & ${brideFullName}. ${ev?.location || 'The Celestial Ballroom'}.`,
                    location: ev?.location || 'The Celestial Ballroom, Jakarta Selatan',
                    eventDate: ev?.date || '2026-10-12',
                    startTime: ev?.start_time || '08:00',
                    endTime: ev?.end_time || '14:00',
                  });
                  setIsCalendarModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border border-[#38BDF8]/50 text-[#BAE6FD] text-[10px] font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Calendar className="w-3 h-3 text-[#38BDF8]" />
                <span>Ingatkan Acara</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('acara');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border border-[#38BDF8]/50 text-[#BAE6FD] text-[10px] font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
              >
                <Navigation className="w-3 h-3 text-[#38BDF8]" />
                <span>Petunjuk Arah</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Venue Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#94A3B8] pt-3 border-t border-[#94A3B8]/25">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-serif text-white/90 text-[11px] sm:text-xs">The Celestial Ballroom, Jakarta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#38BDF8] font-serif font-bold tracking-wider text-[10px] sm:text-xs">WD Masterpiece 150k</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN SCROLLABLE CONTENT (Mobile Fullscreen / Desktop Right Panel)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 pb-28 shadow-2xl lg:border-l lg:border-[#94A3B8]/30 bg-[#030712]">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
            ========================================================================= */}
        <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 border-b border-[#94A3B8]/30 overflow-hidden">
          <div className="absolute top-0 left-0"><CelestialCornerFlourish position="top-left" size={80} /></div>
          <div className="absolute top-0 right-0"><CelestialCornerFlourish position="top-right" size={80} /></div>

          {/* Top Title */}
          <ScrollReveal animation="fade-down" delay={100} className="relative z-10 pt-4 max-w-md mx-auto w-full">
            <span className="text-[10px] sm:text-xs tracking-[0.34em] uppercase text-[#38BDF8] font-serif font-bold">
              THE CELESTIAL WEDDING INVITATION
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
              {groomName} <span className="font-light italic text-[#38BDF8]">&amp;</span> {brideName}
            </h1>
            <p className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#94A3B8] mt-1.5 font-medium">
              {targetDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </ScrollReveal>

          {/* Central Portrait */}
          <ScrollReveal animation="zoom-in" delay={200} className="relative z-10 my-auto py-3 pt-6 flex flex-col items-center max-w-md mx-auto w-full">
            <div className="mb-3">
              <CelestialCrescentFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-48 sm:w-56"
                frameHeightClass="h-62 sm:h-74"
              />
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#94A3B8]/50 shadow-sm text-white">
              <Crown className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span className="text-[10px] font-serif uppercase tracking-[0.2em] font-bold text-[#BAE6FD]">
                Midnight Celestial Star
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info (Visible on mobile, hidden on desktop since aside handles it) */}
          <ScrollReveal animation="fade-up" delay={300} className="relative z-10 w-full flex flex-col items-center pb-4 max-w-md mx-auto lg:hidden">
            <div className="w-full max-w-xs p-3.5 rounded-2xl bg-[#0E1A38]/90 border border-[#94A3B8]/40 shadow-xs mb-3 text-center">
              <span className="text-[10px] uppercase tracking-widest text-[#38BDF8] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-white block truncate">
                {guestName}
              </span>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-2 w-full max-w-xs mb-3">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="p-2 rounded-xl bg-[#0B152B]/85 border border-[#94A3B8]/30 shadow-xs text-center">
                  <span className="block text-base sm:text-lg font-serif font-bold text-[#F8FAFC]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8.5px] uppercase tracking-wider text-[#94A3B8] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center text-[#94A3B8] text-[10px] tracking-widest uppercase">
              <span>Gulir Ke Bawah</span>
              <ChevronDown className="w-4 h-4 text-[#38BDF8] animate-bounce mt-1" />
            </div>
          </ScrollReveal>
        </section>

        {/* =========================================================================
            SECTION 2: AYAT & PUISI KOSMIS
            ========================================================================= */}
        <section id="kutipan" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden text-center bg-gradient-to-b from-[#030712] to-[#060D1E]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                UNTAIAN DOA & AYAT SUCI
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Kisah Indah Takdir Semesta
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={150}>
              <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0B152B]/80 backdrop-blur-md border border-[#94A3B8]/40 shadow-xl">
                <p className="font-serif text-base sm:text-lg italic text-[#E2E8F0] leading-relaxed mb-4">
                  "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."
                </p>
                <div className="w-12 h-0.5 bg-[#38BDF8] mx-auto mb-2" />
                <span className="text-xs font-serif font-bold text-[#38BDF8] tracking-widest uppercase">
                  (QS. AR-RUM : 21)
                </span>
                <p className="text-xs text-[#94A3B8] mt-3 italic font-serif">
                  "Di antara miliaran bintang di angkasa raya, takdir mempertemukan dua jiwa untuk melangkah bersama mengarungi keabadian cinta."
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 3: MEMPELAI (THE CELESTIAL GROOM & BRIDE)
            ========================================================================= */}
        <section id="mempelai" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                PASANGAN PENGANTIN
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Kedua Mempelai
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-8">
              {/* Groom Profile */}
              <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                <div className="mb-3 pt-3">
                  <CelestialCrescentFrame
                    imageSrc={groomPhoto}
                    altText={groomName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                  />
                </div>
                <span className="text-[10.5px] uppercase tracking-widest text-[#38BDF8] font-serif font-bold">
                  Pengantin Pria
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-xs">
                  {groomParents}
                </p>
                {groomInstagram && (
                  <a
                    href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E1A38] text-[#BAE6FD] border border-[#38BDF8]/40 text-[11px] font-medium hover:bg-[#162955] transition-colors shadow-xs"
                  >
                    <InstagramIcon size={13} />
                    <span>@{groomInstagram.replace('@', '')}</span>
                  </a>
                )}
              </ScrollReveal>

              {/* Cosmic Ring Connection Bridge */}
              <div className="flex items-center justify-center my-2">
                <div className="w-12 h-[1px] bg-[#94A3B8]/40" />
                <div className="mx-3 w-10 h-10 rounded-full bg-[#0B152B] border border-[#38BDF8] flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.35)]">
                  <Heart className="w-4 h-4 text-[#38BDF8] fill-[#38BDF8]/30" />
                </div>
                <div className="w-12 h-[1px] bg-[#94A3B8]/40" />
              </div>

              {/* Bride Profile */}
              <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center">
                <div className="mb-3 pt-3">
                  <CelestialCrescentFrame
                    imageSrc={bridePhoto}
                    altText={brideName}
                    frameWidthClass="w-36 sm:w-44"
                    frameHeightClass="h-48 sm:h-58"
                  />
                </div>
                <span className="text-[10.5px] uppercase tracking-widest text-[#38BDF8] font-serif font-bold">
                  Pengantin Wanita
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-white mt-0.5">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#94A3B8] mt-1 max-w-xs">
                  {brideParents}
                </p>
                {brideInstagram && (
                  <a
                    href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2.5 inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#0E1A38] text-[#BAE6FD] border border-[#38BDF8]/40 text-[11px] font-medium hover:bg-[#162955] transition-colors shadow-xs"
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
            SECTION 4: RANGKAIAN ACARA (CELESTIAL EVENTS)
            ========================================================================= */}
        <section id="acara" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#060D1E] to-[#030712]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                WAKTU & TEMPAT
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Rangkaian Acara
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6">
              {displayEvents.map((evt: any, idx: number) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className="relative p-6 sm:p-8 rounded-3xl bg-[#0B152B]/85 backdrop-blur-md border border-[#94A3B8]/40 shadow-xl overflow-hidden group hover:border-[#38BDF8]/60 transition-all">
                    {/* Top Star Accent */}
                    <div className="flex items-center justify-between mb-3 border-b border-[#94A3B8]/20 pb-3">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-[#38BDF8]" />
                        <span className="font-serif font-bold text-lg text-white">
                          {evt.title}
                        </span>
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-[#38BDF8]/15 text-[#BAE6FD] border border-[#38BDF8]/30">
                        Acara {idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2.5 text-xs text-[#E2E8F0]">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-[#38BDF8] shrink-0" />
                        <span>{evt.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-[#38BDF8] shrink-0" />
                        <span>{evt.time}</span>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-white font-medium">{evt.location}</strong>
                          <span className="text-[#94A3B8] text-[11px]">{evt.address}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons: Google Calendar & Google Maps */}
                    <div className="mt-5 pt-4 border-t border-[#94A3B8]/20 flex flex-wrap gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCalendarEvent({
                            title: `Pernikahan ${groomName} & ${brideName} - ${evt.title}`,
                            description: `Menghadiri ${evt.title} pernikahan ${groomFullName} dan ${brideFullName}.`,
                            location: `${evt.location}, ${evt.address}`,
                            eventDate: evt.date || '2026-10-12',
                            startTime: '08:00',
                            endTime: '12:00',
                          });
                          setIsCalendarModalOpen(true);
                        }}
                        className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-[#0E1A38] hover:bg-[#162955] border border-[#38BDF8]/40 text-[#BAE6FD] text-[11px] font-serif font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>Simpan Kalender</span>
                      </button>

                      {evt.maps_url && (
                        <a
                          href={evt.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-[130px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-[#6366F1] text-white text-[11px] font-serif font-bold flex items-center justify-center gap-1.5 transition-all shadow-[0_4px_15px_rgba(56,189,248,0.3)] hover:brightness-110 cursor-pointer"
                        >
                          <MapPin className="w-3.5 h-3.5" />
                          <span>Buka Google Maps</span>
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: VIP BARCODE DIGITAL PASS (150k VIP FEATURE)
            ========================================================================= */}
        <section id="vip-pass" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] via-[#081126] to-[#030712]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                EKSKLUSIF VIP ACCESS
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                VIP Digital Guest Pass
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto">
                Tunjukkan barcode ini kepada petugas penerima tamu di lokasi acara untuk registrasi kehadiran otomatis.
              </p>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={150} className="mt-6">
              <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#0E1A38]/95 via-[#0A132B]/98 to-[#040817] border border-[#38BDF8]/50 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(56,189,248,0.2)] text-center overflow-hidden">
                <div className="flex items-center justify-between border-b border-[#94A3B8]/25 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-4 h-4 text-[#38BDF8]" />
                    <span className="text-xs font-serif font-bold uppercase tracking-wider text-white">
                      VIP PASS • 150K CELESTIAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/15 px-2 py-0.5 rounded-full border border-[#38BDF8]/30">
                    VERIFIED
                  </span>
                </div>

                <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {guestName}
                </h3>
                <p className="text-[10px] text-[#94A3B8] tracking-widest uppercase font-mono mt-0.5">
                  THE CELESTIAL WEDDING OF {groomName.toUpperCase()} & {brideName.toUpperCase()}
                </p>

                {/* Barcode Graphic Simulation */}
                <div className="my-5 p-4 rounded-2xl bg-white text-black flex flex-col items-center justify-center shadow-lg">
                  <div className="w-full flex items-center justify-center gap-[2.5px] h-14 overflow-hidden">
                    {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 1, 2, 4, 3, 1, 2, 4, 1, 3, 2].map((w, idx) => (
                      <div
                        key={idx}
                        className="bg-black h-full"
                        style={{ width: `${w * 1.5}px` }}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-xs font-bold tracking-[0.25em] text-black mt-2">
                    {barcodeCode || 'CEL-2026-VIP-88'}
                  </span>
                </div>

                <div className="flex items-center justify-center gap-1.5 text-[10.5px] text-[#BAE6FD]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Akses VIP Terverifikasi Langsung di Tempat</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: AR PHOTOBOOTH KAMERA (150k VIP FEATURE)
            ========================================================================= */}
        <section id="photobooth" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden text-center">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                KENANG-KENANGAN SPESIAL
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                AR Celestial Photobooth
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                Abadikan momen bahagia Anda menggunakan kamera ponsel dengan bingkai konstelasi perak eksklusif, lalu unduh dan bagikan ke Instagram Story!
              </p>
            </ScrollReveal>

            <ScrollReveal animation="zoom-in" delay={150}>
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0B152B]/85 border border-[#38BDF8]/40 shadow-xl flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#38BDF8] to-[#818CF8] flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.5)] mb-4">
                  <Camera className="w-8 h-8 text-[#030712]" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white mb-1">
                  Ambil Foto dengan Frame Celestial
                </h3>
                <p className="text-xs text-[#94A3B8] max-w-xs mb-5">
                  Kamera akan otomatis membingkai foto Anda dengan ornamen bintang perak & nama kedua mempelai.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoboothMode('choice');
                    setIsCameraModalOpen(true);
                  }}
                  className="py-3 px-6 rounded-full bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] font-serif font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Camera className="w-4 h-4" />
                  <span>Buka AR Photobooth</span>
                </button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: KISAH CINTA (LOVE STORY MILESTONE)
            ========================================================================= */}
        <section id="kisah" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] to-[#060D1E]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                PERJALANAN CINTA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Kisah Bintang Kami
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            <div className="mt-8 space-y-6 relative before:absolute before:inset-y-0 before:left-4 sm:before:left-1/2 before:-translate-x-1/2 before:w-[1.5px] before:bg-gradient-to-b before:from-transparent before:via-[#38BDF8] before:to-transparent">
              {displayStories.map((item: any, idx: number) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className={`relative flex flex-col sm:flex-row items-start sm:items-center ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-4`}>
                    <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-6">
                      <div className="p-4 sm:p-5 rounded-2xl bg-[#0B152B]/85 border border-[#94A3B8]/30 shadow-md">
                        <span className="text-[10px] font-mono font-bold text-[#38BDF8] tracking-widest px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30">
                          {item.year}
                        </span>
                        <h4 className="font-serif font-bold text-base text-white mt-2">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[#94A3B8] mt-1 leading-relaxed">
                          {item.story}
                        </p>
                      </div>
                    </div>

                    {/* Central Starlight Node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#050B18] border-2 border-[#38BDF8] flex items-center justify-center z-10 shadow-[0_0_12px_#38BDF8]">
                      <Star className="w-3.5 h-3.5 text-[#38BDF8] fill-[#38BDF8]" />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 8: GALERI FOTO (STARLIGHT MOMENTS)
            ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                MEMORI INDAH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Galeri Foto Bahagia
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            {/* Photo Grid */}
            <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {displayGallery.map((item: any, idx: number) => (
                <ScrollReveal key={idx} animation="zoom-in" delay={idx * 80}>
                  <div
                    onClick={() => setActivePhotoIndex(idx)}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#94A3B8]/40 shadow-lg cursor-pointer group bg-[#0E1A38]"
                  >
                    <img
                      src={item.url}
                      alt={item.caption || `Foto ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                      <span className="text-[10px] font-serif text-white tracking-wide">
                        {item.caption || 'Momen Bahagia'}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 9: TANDA KASIH & AMPLOP DIGITAL (GIFT & ENVELOPE)
            ========================================================================= */}
        <section id="kado" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#060D1E] to-[#030712]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                TANDA KASIH & HADIAH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Amplop Digital & Kado
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika ingin memberikan tanda kasih, dapat disalurkan melalui:
              </p>
            </ScrollReveal>

            <div className="space-y-4">
              {displayGifts.map((bank: any, idx: number) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                  <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0E1A38] via-[#0A132B] to-[#040817] border border-[#94A3B8]/40 shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-serif font-bold uppercase tracking-wider text-[#38BDF8]">
                        {bank.bank_name}
                      </span>
                      <CreditCard className="w-5 h-5 text-[#94A3B8]" />
                    </div>

                    <div className="my-2">
                      <span className="font-mono text-lg sm:text-xl font-bold text-white tracking-widest block">
                        {bank.account_number}
                      </span>
                      <span className="text-xs text-[#BAE6FD] block mt-0.5">
                        a.n. {bank.account_holder}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyBank(bank.account_number, idx)}
                      className="mt-3 w-full py-2.5 px-4 rounded-xl bg-[#38BDF8]/15 hover:bg-[#38BDF8]/25 border border-[#38BDF8]/50 text-[#BAE6FD] text-xs font-serif font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
                    >
                      {copiedBankIdx === idx ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>Berhasil Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#38BDF8]" />
                          <span>Salin Nomor Rekening</span>
                        </>
                      )}
                    </button>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 10: RSVP & UCAPAN DOA (GUESTBOOK)
            ========================================================================= */}
        <section id="rsvp" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                BUKU TAMU & DOA RESTU
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Konfirmasi Kehadiran
              </h2>
              <CelestialStarlightDivider />
            </ScrollReveal>

            {/* RSVP Form */}
            <ScrollReveal animation="fade-up" delay={150}>
              <form onSubmit={handleSubmitRSVP} className="p-6 sm:p-8 rounded-3xl bg-[#0B152B]/85 border border-[#94A3B8]/40 shadow-xl space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#BAE6FD] mb-1 font-serif">
                    Nama Anda
                  </label>
                  <input
                    type="text"
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#BAE6FD] mb-1 font-serif">
                      Konfirmasi
                    </label>
                    <select
                      value={rsvpStatus}
                      onChange={(e) => setRsvpStatus(e.target.value as any)}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                    >
                      <option value="hadir">Pasti Hadir</option>
                      <option value="tidak_hadir">Tidak Bisa Hadir</option>
                      <option value="ragu">Masih Ragu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#BAE6FD] mb-1 font-serif">
                      Jumlah Tamu
                    </label>
                    <select
                      value={rsvpCount}
                      onChange={(e) => setRsvpCount(Number(e.target.value))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white text-xs focus:outline-none focus:border-[#38BDF8]"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>{num} Orang</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#BAE6FD] mb-1 font-serif">
                    Untaian Doa & Ucapan
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    placeholder="Tulis ucapan selamat & doa restu..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-[#38BDF8]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] font-serif font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:brightness-110 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmittingRsvp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#030712]" />
                      <span>Mengirim Doa...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Kirim Doa Restu</span>
                    </>
                  )}
                </button>
              </form>
            </ScrollReveal>

            {/* List of Wishes */}
            {rsvpList.length > 0 && (
              <div className="mt-8 space-y-3">
                <h4 className="text-xs font-serif font-bold uppercase tracking-widest text-[#BAE6FD] text-center mb-4">
                  Doa & Ucapan Terkini ({rsvpList.length})
                </h4>
                <div className="max-h-72 overflow-y-auto space-y-2.5 pr-1">
                  {rsvpList.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-2xl bg-[#0B152B]/75 border border-[#94A3B8]/25 text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif font-bold text-xs text-white">
                          {item.name}
                        </span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono ${
                          item.attendance === 'attending' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-500/20 text-slate-300'
                        }`}>
                          {item.attendance === 'attending' ? 'Hadir' : 'Berhalangan'}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
                        {item.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* =========================================================================
            SECTION 11: PENUTUP / FOOTER
            ========================================================================= */}
        <footer className="relative p-8 sm:p-12 text-center bg-[#02050D] overflow-hidden">
          <div className="max-w-md mx-auto space-y-3 relative z-10">
            <Moon className="w-8 h-8 text-[#38BDF8] mx-auto animate-pulse" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
              {groomName} &amp; {brideName}
            </h3>
            <p className="text-xs text-[#94A3B8]">
              Matur suksma & terima kasih atas doa restu seluruh keluarga, sahabat, dan kerabat tercinta.
            </p>
            <div className="pt-4 border-t border-[#94A3B8]/20">
              <span className="text-[10px] text-[#64748B] font-mono tracking-widest uppercase">
                THE CELESTIAL WEDDING • 2026
              </span>
            </div>
          </div>
        </footer>
      </main>

      {/* =========================================================================
          FLOATING CELESTIAL GLASS BOTTOM NAVBAR DOCK
          ========================================================================= */}
      <nav className={`fixed bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 max-w-[96vw] sm:max-w-max px-1.5 xs:px-2 pointer-events-auto transition-opacity duration-300 ${(!isOpening || activePhotoIndex !== null) ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}>
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 px-3 py-2 rounded-full bg-[#0B152B]/90 backdrop-blur-xl border border-[#94A3B8]/50 shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.25)]">
          {[
            { id: 'sampul', label: 'Sampul', icon: Crown },
            { id: 'mempelai', label: 'Mempelai', icon: Heart },
            { id: 'acara', label: 'Acara', icon: Calendar },
            { id: 'vip-pass', label: 'VIP Pass', icon: Barcode },
            { id: 'galeri', label: 'Galeri', icon: Sparkles },
            { id: 'kado', label: 'Kado', icon: Gift },
            { id: 'rsvp', label: 'RSVP', icon: MessageCircle },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`flex flex-col items-center px-2.5 sm:px-3 py-1 rounded-full transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] font-bold shadow-md scale-105'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[8.5px] tracking-tight">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* =========================================================================
          PORTALED FULLSCREEN LIGHTBOX FOR GALLERY
          ========================================================================= */}
      {activePhotoIndex !== null && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-fade-in select-none">
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#0E1A38]/90 border border-[#94A3B8] text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer z-20 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative max-w-lg w-full max-h-[85vh] rounded-3xl overflow-hidden border border-[#38BDF8]/60 shadow-2xl bg-[#050B18]">
            <img
              src={displayGallery[activePhotoIndex]?.url}
              alt={displayGallery[activePhotoIndex]?.caption || 'Preview'}
              className="w-full h-auto max-h-[75vh] object-contain mx-auto"
            />
            {displayGallery[activePhotoIndex]?.caption && (
              <div className="p-4 text-center bg-[#0B152B]/95 border-t border-[#94A3B8]/30">
                <p className="font-serif text-sm font-bold text-white">
                  {displayGallery[activePhotoIndex]?.caption}
                </p>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* =========================================================================
          AR PHOTOBOOTH MODAL (150K MASTERPIECE VIP CAMERA & UPLOAD)
          ========================================================================= */}
      {isCameraModalOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99998] flex items-center justify-center bg-black/95 backdrop-blur-md p-3 xs:p-4 select-none animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#050B18] border border-[#38BDF8]/50 shadow-2xl p-4 sm:p-5 flex flex-col justify-between max-h-[95vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#94A3B8]/30 mb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-[#38BDF8]" />
                <span className="font-serif font-bold text-xs uppercase tracking-wider text-white">
                  AR Celestial Photobooth
                </span>
              </div>
              <button
                type="button"
                onClick={closeCameraModal}
                className="p-1 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Mode 1: Choice Screen */}
            {photoboothMode === 'choice' && (
              <div className="py-2 space-y-4 text-center animate-fade-in my-auto">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/40 text-[#38BDF8] text-[9.5px] font-serif uppercase tracking-[0.2em] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                    <span>PILIH METODE FOTO</span>
                    <Sparkles className="w-3 h-3 text-[#38BDF8]" />
                  </div>
                  <p className="font-serif text-xs text-[#BAE6FD] max-w-xs mx-auto leading-relaxed">
                    Pilih cara untuk mengabadikan momen berharga bersama bingkai konstelasi {groomName} &amp; {brideName}:
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Option 1: Live Camera */}
                  <button
                    type="button"
                    onClick={chooseCameraMode}
                    className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0E1A38] to-[#0A132B] hover:from-[#162955] hover:to-[#0F1D40] border-2 border-[#38BDF8]/60 hover:border-[#38BDF8] text-left transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-[#38BDF8] to-white flex items-center justify-center text-[#030712] shadow-[0_0_15px_rgba(56,189,248,0.5)] group-hover:scale-105 transition-transform shrink-0">
                        <Camera className="w-6 h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-[#BAE6FD] transition-colors truncate">
                            Gunakan Kamera Langsung
                          </h4>
                          <span className="px-1.5 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] text-[8.5px] font-serif tracking-wider uppercase font-semibold">
                            Live
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5 leading-snug">
                          Ambil foto selfie secara langsung dengan frame perak seketika
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#38BDF8]/70 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>

                  {/* Option 2: Upload Photo */}
                  <button
                    type="button"
                    onClick={triggerUploadPhoto}
                    disabled={isProcessingUpload}
                    className="w-full p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0E1A38] to-[#0A132B] hover:from-[#162955] hover:to-[#0F1D40] border-2 border-[#38BDF8]/60 hover:border-[#38BDF8] text-left transition-all duration-300 shadow-md hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#050B18] border border-[#38BDF8] flex items-center justify-center text-[#38BDF8] shadow-[0_0_15px_rgba(56,189,248,0.3)] group-hover:scale-105 transition-transform shrink-0">
                        {isProcessingUpload ? (
                          <RefreshCw className="w-6 h-6 animate-spin text-[#38BDF8]" />
                        ) : (
                          <ImageIcon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif font-bold text-sm sm:text-base text-white group-hover:text-[#BAE6FD] transition-colors truncate">
                            Unggah Foto dari Galeri
                          </h4>
                          <span className="px-1.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 text-[8.5px] font-serif tracking-wider uppercase font-semibold">
                            Otomatis
                          </span>
                        </div>
                        <p className="text-[11px] text-[#94A3B8] font-sans mt-0.5 leading-snug">
                          Pilih foto terbaik dari galeri, otomatis dipasang ke frame starlight
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#38BDF8]/70 group-hover:text-[#38BDF8] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                </div>

                {/* Sub-action: Download PNG Template */}
                <div className="pt-2 border-t border-[#94A3B8]/20">
                  <button
                    type="button"
                    onClick={downloadCelestialFramePNG}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#94A3B8]/30 text-[#BAE6FD] text-xs font-serif flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#38BDF8]" />
                    <span>Unduh Template Bingkai Transparan (PNG)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 2: Live Camera Viewfinder */}
            {photoboothMode === 'camera' && (
              <div className="space-y-4">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black border border-[#38BDF8]/40 shadow-inner">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${cameraFacingMode === 'user' ? '-scale-x-100' : ''}`}
                  />

                  {/* Shutter Flash */}
                  {isFlashing && (
                    <div className="absolute inset-0 bg-white/90 z-30 animate-fade-out pointer-events-none" />
                  )}

                  {/* Overlay Frame Graphic */}
                  <div className="absolute inset-0 pointer-events-none border-4 border-white/80 rounded-xl m-3 flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center text-[10px] font-mono text-[#38BDF8]">
                      <Moon className="w-4 h-4 text-white" />
                      <span>★ CELESTIAL AR ★</span>
                    </div>
                    <div className="text-center">
                      <p className="font-serif font-bold text-xs text-white drop-shadow-md">
                        {groomName.toUpperCase()} &amp; {brideName.toUpperCase()}
                      </p>
                      <p className="text-[9px] font-mono text-[#BAE6FD]">
                        #CelestialWedding2026
                      </p>
                    </div>
                  </div>
                </div>

                {/* Shutter Button Controls */}
                <div className="pt-2 flex items-center justify-around">
                  <button
                    type="button"
                    onClick={() => {
                      const next = cameraFacingMode === 'user' ? 'environment' : 'user';
                      startCamera(next);
                    }}
                    className="p-3 rounded-full bg-[#0E1A38] border border-[#94A3B8]/40 text-[#BAE6FD] hover:bg-[#162955] transition-colors cursor-pointer"
                    title="Ganti Kamera"
                  >
                    <SwitchCamera className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={captureSnapshot}
                    disabled={isCapturing}
                    className={`w-14 h-14 rounded-full bg-gradient-to-tr from-[#38BDF8] via-white to-[#38BDF8] border-4 border-[#030712] shadow-[0_0_25px_rgba(56,189,248,0.8)] flex items-center justify-center cursor-pointer transition-all ${
                      isCapturing ? 'opacity-80 scale-95' : 'hover:scale-105 active:scale-90'
                    }`}
                  >
                    {isCapturing ? (
                      <Loader2 className="w-6 h-6 text-[#030712] animate-spin" />
                    ) : (
                      <Camera className="w-6 h-6 text-[#030712]" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setPhotoboothMode('choice');
                    }}
                    className="p-3 rounded-full bg-[#0E1A38] border border-[#94A3B8]/40 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
                    title="Kembali ke Pilihan"
                  >
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Uploaded Photo Preview */}
            {photoboothMode === 'uploaded-preview' && uploadedRawImage && (
              <div className="space-y-4 animate-fade-in">
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black border border-[#38BDF8]/60 shadow-xl">
                  <img
                    src={uploadedRawImage}
                    alt="Hasil Foto Celestial"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <a
                    href={uploadedRawImage}
                    download={`Celestial_Photo_${groomName}_${brideName}.jpg`}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-white text-[#030712] font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Unduh Foto HD</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsStoryGuideOpen(true)}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
                  >
                    <InstagramIcon size={14} />
                    <span>Bagikan Story</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPhotoboothMode('choice');
                    setUploadedRawImage(null);
                  }}
                  className="w-full py-2 text-center text-xs text-[#94A3B8] hover:text-white font-serif transition-colors"
                >
                  ← Pilih Foto Lain
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}

      {/* Snapshot Notification Banner */}
      {snapshotNotification?.visible && typeof document !== 'undefined' && createPortal(
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[99999] max-w-sm w-[92vw] rounded-2xl bg-[#0B152B]/95 backdrop-blur-md border border-[#38BDF8]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.3)] p-3 flex items-center justify-between gap-3 animate-fade-down select-none">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-[#38BDF8] shrink-0 bg-black">
              <img src={snapshotNotification.url} alt="Thumbnail" className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-serif font-bold text-white block truncate">
                Foto Berhasil Diabadikan!
              </span>
              <span className="text-[9.5px] text-[#BAE6FD] block">
                Tersimpan dalam resolusi HD
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsPreviewOpen(true);
                setSnapshotNotification(null);
              }}
              className="py-1 px-2.5 rounded-lg bg-[#38BDF8] text-[#030712] font-serif font-bold text-[10px] uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
            >
              Lihat
            </button>
            <button
              type="button"
              onClick={() => setSnapshotNotification(null)}
              className="p-1 text-[#94A3B8] hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Full Preview Modal for Captured Photo */}
      {isPreviewOpen && capturedSnapshot && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#050B18] border border-[#38BDF8]/60 shadow-2xl p-4 sm:p-5 flex flex-col justify-between max-h-[95vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#94A3B8]/30 mb-3">
              <span className="font-serif font-bold text-xs uppercase tracking-wider text-white">
                Pratinjau Foto Celestial
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                className="p-1 rounded-full hover:bg-white/10 text-[#94A3B8] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-black border border-[#38BDF8]/40 shadow-xl mb-4">
              <img src={capturedSnapshot} alt="Hasil Foto" className="w-full h-full object-cover" />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={capturedSnapshot}
                download={`Celestial_Photo_${groomName}_${brideName}.jpg`}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#38BDF8] to-white text-[#030712] font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Foto HD</span>
              </a>

              <button
                type="button"
                onClick={() => setIsStoryGuideOpen(true)}
                className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#E1306C] to-[#833AB4] text-white font-serif font-bold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform cursor-pointer"
              >
                <InstagramIcon size={14} />
                <span>Bagikan Story</span>
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Instagram Story Sharing Guide Modal */}
      {isStoryGuideOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 select-none animate-fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#0B152B] border border-[#38BDF8]/60 shadow-2xl p-5 text-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E1306C] to-[#833AB4] flex items-center justify-center text-white mx-auto mb-3 shadow-lg">
              <InstagramIcon size={24} />
            </div>

            <h3 className="font-serif font-bold text-base text-white mb-2">
              Bagikan ke Instagram Story
            </h3>

            <p className="text-xs text-[#BAE6FD] leading-relaxed mb-4">
              Foto HD Anda telah siap! Unduh foto terlebih dahulu, lalu buka Instagram dan pasang foto sebagai Story Anda. Jangan lupa tag mempelai:
            </p>

            <div className="p-3 rounded-xl bg-[#050B18] border border-[#94A3B8]/30 mb-4 font-mono text-xs text-[#38BDF8]">
              {groomInstagram} &amp; {brideInstagram}
            </div>

            <button
              type="button"
              onClick={() => setIsStoryGuideOpen(false)}
              className="w-full py-2.5 rounded-xl bg-[#38BDF8] text-[#030712] font-serif font-bold text-xs uppercase tracking-wider cursor-pointer active:scale-95 transition-transform"
            >
              Mengerti &amp; Lanjutkan
            </button>
          </div>
        </div>,
        document.body
      )}

      {/* Calendar Reminder Modal */}
      {isCalendarModalOpen && selectedCalendarEvent && (
        <CalendarReminderModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          event={selectedCalendarEvent}
        />
      )}
    </div>
  );
};
