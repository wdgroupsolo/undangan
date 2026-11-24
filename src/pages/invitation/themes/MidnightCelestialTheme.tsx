import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, MessageCircle, ChevronDown, ChevronRight, ChevronLeft,
  ExternalLink, Bookmark, Crown, Video, Shirt, Info,
  Camera, SwitchCamera, Image as ImageIcon, Loader2, Download,
  QrCode, Barcode, CheckCircle2, Star, Moon, Compass, Gem, X, Music, CreditCard,
  RefreshCw, Upload, Navigation, User, Users, Car, Wifi, Package, Maximize2
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode, clearBarcodePass } from '../../../utils/barcodePass';

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// =========================================================================
// SCROLL REVEAL UTILITY (High-Performance IntersectionObserver with Mobile Pre-trigger)
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
  duration = 500,
  className = '',
  initialVisible = false,
}) => {
  const [isVisible, setIsVisible] = useState(initialVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isVisible) return;
    const el = ref.current;
    if (!el) return;

    // Fast immediate viewport check on mount
    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Pre-trigger buffer (250px ahead of viewport) so content is ready before reaching screen
      if (rect.top < windowHeight + 250 && rect.bottom > -100) {
        setIsVisible(true);
        return true;
      }
      return false;
    };

    if (checkVisibility()) return;

    // Native IntersectionObserver with generous rootMargin for smooth mobile momentum scrolling
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        {
          threshold: 0,
          rootMargin: '300px 0px 300px 0px',
        }
      );
      observer.observe(el);
      return () => observer.disconnect();
    }

    // Scroll listener fallback for older mobile webviews
    const handleScroll = () => {
      if (checkVisibility()) {
        window.removeEventListener('scroll', handleScroll);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  // Mobile optimization: eliminate artificial delays and use snappy durations so content never feels lagging
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
// FLOATING CELESTIAL STARDUST OVERLAY (Twinkling ambient particles & star sparkles)
// =========================================================================
export const FloatingCelestialStardust: React.FC<{ count?: number; className?: string }> = ({ count = 28, className = '' }) => {
  return (
    <div className={`fixed inset-0 pointer-events-none z-20 overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => {
        const size = (i % 4) * 1.5 + 2;
        const isStarShape = i % 5 === 0;
        const isCyan = i % 3 === 0;
        const isIndigo = i % 4 === 0;
        const color = isCyan ? '#38BDF8' : (isIndigo ? '#818CF8' : '#F8FAFC');
        const duration = (i % 4) * 2 + 3.5;
        const delay = (i % 5) * 0.7;
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: isStarShape ? 'transparent' : color,
              top: `${(i * 17 + 5) % 96}%`,
              left: `${(i * 23 + 3) % 96}%`,
              opacity: ((i % 5) + 3) / 10,
              boxShadow: isStarShape ? 'none' : `0 0 8px ${color}, 0 0 16px ${color}`,
              animation: `celestialFloat ${duration}s ease-in-out infinite alternate ${delay}s`,
            }}
          >
            {isStarShape && (
              <span style={{ color, fontSize: `${size + 4}px`, lineHeight: 1 }} className="drop-shadow-[0_0_8px_#38BDF8] select-none">
                ✦
              </span>
            )}
          </div>
        );
      })}
    </div>
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
// EMV SILVER SMART CHIP & GUILLOCHE WATERMARK
// =========================================================================
export const EMVSilverSmartChip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-11 h-8 rounded-md bg-gradient-to-br from-[#FFFFFF] via-[#94A3B8] to-[#475569] p-[1.5px] shadow-sm relative overflow-hidden flex-shrink-0 ${className}`}>
    <div className="w-full h-full rounded-[4px] bg-gradient-to-br from-[#F8FAFC] via-[#CBD5E1] to-[#64748B] relative flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#1E293B]/60" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-[#1E293B]/60" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-[#1E293B]/60" />
      <div className="w-4 h-3.5 rounded-sm border border-[#1E293B]/70 relative z-1 bg-[#94A3B8]/40" />
    </div>
  </div>
);

export const GuillocheCelestialWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.05,
  className = ''
}) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="guillochePatternCelestial" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#38BDF8" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
          <path d="M10 60 Q 60 10, 110 60 Q 60 110, 10 60 Z" fill="none" stroke="#38BDF8" strokeWidth="0.4" />
          <path d="M60 10 Q 110 60, 60 110 Q 10 60, 60 10 Z" fill="none" stroke="#E2E8F0" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guillochePatternCelestial)" />
    </svg>
  </div>
);

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

  // Demo status check (?demo=true)
  const isDemo = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('demo') === 'true' ||
    (invitation?.id === 'demo-theme-invitation' && !invitation?.client_id)
  );

  // Active section for floating navbar
  const [activeSection, setActiveSection] = useState('sampul');
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Dresscode and Concierge interactive states
  const [attireGender, setAttireGender] = useState<'gentlemen' | 'ladies'>('gentlemen');
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);

  // Gift tab state
  const [giftTab, setGiftTab] = useState<'transfer' | 'physical'>('transfer');
  const [isCopied, setIsCopied] = useState<string | null>(null);

  // Calendar reminder modal
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<CalendarEventData | null>(null);

  // Gallery fullscreen lightbox modal & category filter tabs
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'prewedding' | 'ceremony' | 'reception'>('all');

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

  // VIP Barcode Pass (150k Masterpiece Tier)
  const [savedPass, setSavedPass] = useState<any>(() => 
    loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'celestial')
  );
  const [showBarcodePreview, setShowBarcodePreview] = useState(false);

  useEffect(() => {
    const existing = loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'celestial');
    if (existing) {
      setSavedPass(existing);
    }
  }, [invitation?.id, invitation?.slug, guestName]);

  const activeBarcodePass = savedPass || (isDemo ? {
    name: guestName,
    code: generateStableBarcodeCode(invitation?.id, invitation?.slug, guestName, 'celestial'),
    guests: 2,
    status: 'attending',
    table: 'Table 01 - Celestial Starlight',
    gate: 'Lobby Utama Starlight'
  } : (showBarcodePreview ? {
    name: guestName,
    code: generateStableBarcodeCode(invitation?.id, invitation?.slug, guestName, 'celestial'),
    guests: 1,
    status: 'attending',
    table: 'Table 01 - Celestial Starlight',
    gate: 'Lobby Utama Starlight'
  } : null));

  // Auto-scroll active nav item into center of the dock on mobile screens
  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  // Active Section Spy on Scroll
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

  // Generic Copy Handler
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    toast.success('Berhasil disalin ke clipboard!');
    setTimeout(() => setIsCopied(null), 2500);
  };

  // Gallery items with rock-solid fallback & category mapping
  const rawGallery = gallery && gallery.length > 0 ? gallery : [
    { url: '/photos/photo-7.jpg', caption: 'Starlight Romance', category: 'prewedding' },
    { url: '/photos/photo-1.jpg', caption: 'Kebersamaan & Tawa Bahagia', category: 'prewedding' },
    { url: '/photos/photo-4.jpg', caption: 'Pesona Anggun Mempelai Putri', category: 'ceremony' },
    { url: '/photos/photo-5.jpg', caption: 'Genggaman Menuju Masa Depan', category: 'ceremony' },
    { url: '/photos/photo-6.jpg', caption: 'Senyum Bahagia Hari Sakral', category: 'reception' },
    { url: '/photos/photo-8.jpg', caption: 'Langkah Menuju Janji Suci', category: 'reception' },
  ];
  const defaultCats = ['prewedding', 'prewedding', 'ceremony', 'ceremony', 'reception', 'reception'];
  const displayGallery = rawGallery.map((item: any, i: number) => ({
    url: item?.url || item?.image_url || [
      '/photos/photo-7.jpg',
      '/photos/photo-1.jpg',
      '/photos/photo-4.jpg',
      '/photos/photo-5.jpg',
      '/photos/photo-6.jpg',
      '/photos/photo-8.jpg'
    ][i % 6],
    caption: item?.caption || `Momen Bahagia ${i + 1}`,
    category: item?.category || defaultCats[i % 6],
  }));

  const filteredGallery = activeGalleryTab === 'all'
    ? displayGallery
    : displayGallery.filter((item: any) => item.category === activeGalleryTab);

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
    { id: '1', bank_name: 'BCA Digital', account_number: '8830 1928 4710', account_name: `${groomName.toUpperCase()} ADIWIJAYA` },
    { id: '2', bank_name: 'Bank Mandiri', account_number: '1370 0293 8472', account_name: `${brideName.toUpperCase()} CITRA LESTARI` },
  ];

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
    const code = generateStableBarcodeCode(invitation?.id, invitation?.slug, rsvpName.trim(), 'celestial');
    const newPass = {
      code,
      name: rsvpName.trim(),
      attendance: rsvpStatus === 'ragu' ? 'maybe' : (rsvpStatus === 'hadir' ? 'attending' : 'not_attending'),
      guests: rsvpCount,
      table: 'Table 01 - Celestial Starlight',
      gate: 'Lobby Utama Starlight'
    };

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
    } catch (e) {
      console.warn('RSVP submit error:', e);
    } finally {
      saveBarcodePass(newPass, invitation?.id, invitation?.slug, 'celestial');
      setSavedPass(newPass);
      setShowBarcodePreview(true);
      setIsSubmittingRsvp(false);
      setRsvpSubmitted(true);
      toast.success('Konfirmasi berhasil! Tiket VIP Pass diterbitkan.');
    }
  };

  // High-Resolution VIP Access Pass Card Download (Canvas JPEG Generator)
  const handleSavePass = () => {
    if (!activeBarcodePass) return;
    saveBarcodePass(activeBarcodePass, invitation?.id, invitation?.slug, 'celestial');
    setSavedPass(activeBarcodePass);

    try {
      const passCanvas = document.createElement('canvas');
      passCanvas.width = 720;
      passCanvas.height = 1140;
      const ctx = passCanvas.getContext('2d');
      if (ctx) {
        // 1. Midnight Starlight Gradient Background
        const bgGrad = ctx.createLinearGradient(0, 0, 720, 1140);
        bgGrad.addColorStop(0, '#0B152B');
        bgGrad.addColorStop(0.5, '#060D1E');
        bgGrad.addColorStop(1, '#030712');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 720, 1140);

        // 2. Silver Starlight Outer & Inner Frame
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 4;
        ctx.strokeRect(28, 28, 720 - 56, 1140 - 56);

        ctx.strokeStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(40, 40, 720 - 80, 1140 - 80);
        ctx.setLineDash([]);

        // 3. Header Monogram / Title
        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 22px "Cinzel", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('CELESTIAL VIP ACCESS PASS', 360, 95);

        ctx.fillStyle = '#F8FAFC';
        ctx.font = 'bold 16px "Cinzel", Georgia, serif';
        ctx.fillText(`THE CELESTIAL WEDDING • ${groomName.toUpperCase()} & ${brideName.toUpperCase()}`, 360, 130);

        // Cyan Divider
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(160, 150);
        ctx.lineTo(560, 150);
        ctx.stroke();

        // 4. Guest Name
        ctx.fillStyle = '#BAE6FD';
        ctx.font = '14px "Cinzel", Georgia, serif';
        ctx.fillText('TAMU KEHORMATAN VIP', 360, 190);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 28px "Cinzel", Georgia, serif';
        ctx.fillText(activeBarcodePass.name || 'Tamu Undangan', 360, 235);

        // Status Badge
        ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
        ctx.fillRect(200, 265, 320, 36);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, 265, 320, 36);

        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`✓ Terkonfirmasi Hadir (${activeBarcodePass.guests || 1} Tamu)`, 360, 289);

        // Venue & Seating
        ctx.fillStyle = '#94A3B8';
        ctx.font = '14px sans-serif';
        const venueText = displayEvents[0]?.location || 'The Celestial Ballroom, Jakarta Selatan';
        ctx.fillText(venueText, 360, 335);

        // Seating Box
        ctx.fillStyle = 'rgba(11, 21, 43, 0.9)';
        ctx.fillRect(110, 360, 500, 68);
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.5)';
        ctx.strokeRect(110, 360, 500, 68);

        ctx.fillStyle = '#94A3B8';
        ctx.font = '12px sans-serif';
        ctx.fillText('MEJA JAMUAN', 235, 385);
        ctx.fillText('PINTU AKSES', 485, 385);

        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 15px "Cinzel", Georgia, serif';
        ctx.fillText(activeBarcodePass.table || 'Table 01 - Celestial Starlight', 235, 412);
        ctx.fillText('Lobby Utama Starlight', 485, 412);

        // QR Code Container
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(235, 455, 250, 250);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 3;
        ctx.strokeRect(235, 455, 250, 250);

        // Draw QR code image from DOM if available
        const qrImgEl = document.querySelector('img[alt="QR Code Tiket"]') as HTMLImageElement;
        if (qrImgEl && qrImgEl.complete && qrImgEl.naturalWidth > 0) {
          try {
            ctx.drawImage(qrImgEl, 245, 465, 230, 230);
          } catch {}
        } else {
          ctx.fillStyle = '#030712';
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText('QR CODE CHECK-IN', 360, 585);
        }

        // Linear Code-128 Barcode Graphic Box
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(170, 735, 380, 115);
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 2;
        ctx.strokeRect(170, 735, 380, 115);

        // Draw authentic vertical Code-128 lines
        ctx.fillStyle = '#030712';
        const barPattern = [2,1,3,1,1,2,1,3,2,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,2,1];
        let currentX = 195;
        barPattern.forEach((w, idx) => {
          if (idx % 2 === 0) {
            ctx.fillRect(currentX, 755, w * 3.0, 55);
          }
          currentX += w * 3.0 + 2.5;
        });

        ctx.fillStyle = isDemo ? '#B91C1C' : '#030712';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(activeBarcodePass.code, 360, 835);

        // Instructions
        ctx.fillStyle = '#94A3B8';
        ctx.font = 'italic 13.5px "Cinzel", Georgia, serif';
        if (isDemo) {
          ctx.fillStyle = '#F59E0B';
          ctx.fillText('🔒 BARCODE DEMO PORTOFOLIO (TERKUNCI)', 360, 890);
        } else {
          ctx.fillText('Tunjukkan Barcode atau QR Code ini kepada panitia saat tiba di lokasi.', 360, 890);
        }

        // Footer brand
        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 13.5px "Cinzel", Georgia, serif';
        ctx.fillText('WDGROUPCOMPANY • MIDNIGHT CELESTIAL EDITION', 360, 1070);

        const dataUrl = passCanvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `Celestial_VIP_Pass_${(activeBarcodePass.name || 'Guest').replace(/\s+/g, '_')}.jpg`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        toast.success('Tiket VIP Pass berhasil disimpan ke galeri!');
      }
    } catch {
      toast.error('Gagal mengunduh gambar tiket.');
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
        @keyframes cardScanline {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 96%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        @keyframes celestialFloat {
          0% { transform: translateY(0px) scale(0.85); opacity: 0.25; }
          50% { transform: translateY(-16px) scale(1.15); opacity: 0.9; }
          100% { transform: translateY(-32px) scale(0.85); opacity: 0.25; }
        }
      `}</style>

      {/* Interactive Twinkling Stars & Meteor Canvas */}
      <CelestialBackgroundCanvas />

      {/* Floating Starlight Particles & Shimmering Constellations Overlay */}
      <FloatingCelestialStardust count={32} />

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
      <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-8 xl:p-12 overflow-hidden bg-[#030712] border-r border-[#38BDF8]/20 shadow-2xl select-none">
        {/* Background image with cinematic midnight starlight vignette */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
          style={{ backgroundImage: `url(${couplePhoto})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 via-60% to-[#030712]/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,7,18,0.5)_60%,rgba(3,7,18,0.92)_100%)] pointer-events-none" />

        {/* Single Subtle Hairline Starlight Frame */}
        <div className="absolute inset-6 rounded-3xl border border-white/10 pointer-events-none z-10" />
        <div className="absolute top-5 left-5"><CelestialCornerFlourish position="top-left" size={50} /></div>
        <div className="absolute top-5 right-5"><CelestialCornerFlourish position="top-right" size={50} /></div>
        <div className="absolute bottom-5 left-5"><CelestialCornerFlourish position="bottom-left" size={50} /></div>
        <div className="absolute bottom-5 right-5"><CelestialCornerFlourish position="bottom-right" size={50} /></div>

        {/* Top Header Bar */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#030712]/75 backdrop-blur-md border border-[#38BDF8]/40 text-[#BAE6FD] text-[10px] font-serif uppercase tracking-[0.25em] shadow-md font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span>MIDNIGHT CELESTIAL</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#030712]/70 backdrop-blur-md border border-white/10 text-xs font-serif text-[#94A3B8]">
            <span>Khusus Untuk:</span>
            <span className="text-white font-bold tracking-wide max-w-[150px] truncate">{guestName}</span>
          </div>
        </div>

        {/* Center Typography & Floating Minimalist Countdown */}
        <div className="relative z-10 my-auto text-left max-w-md">
          <span className="text-[10px] font-serif uppercase tracking-[0.35em] text-[#38BDF8] font-semibold block mb-2">
            THE WEDDING CELEBRATION OF
          </span>
          <h1 className="font-serif text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#BAE6FD] drop-shadow-[0_4px_25px_rgba(56,189,248,0.35)] leading-tight">
            {groomName} <span className="font-light italic text-[#38BDF8]">&amp;</span> {brideName}
          </h1>

          <div className="flex items-center gap-2 text-xs xl:text-sm text-[#94A3B8] mt-3 font-serif">
            <Calendar className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span>
              {displayEvents[0]?.event_date 
                ? new Date(displayEvents[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                : 'Senin, 12 Oktober 2026'}
            </span>
            <span className="text-[#38BDF8]/50">•</span>
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
            <span className="truncate max-w-[180px]">{displayEvents[0]?.location || 'The Celestial Ballroom, Jakarta'}</span>
          </div>

          {/* Clean Floating Starlight Countdown */}
          <div className="mt-8 pt-5 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3 h-3 text-[#38BDF8]" />
              <span className="text-[9px] font-mono tracking-[0.25em] text-[#38BDF8] uppercase font-bold">
                HITUNG MUNDUR ACARA
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2.5 max-w-sm">
              {[
                { label: 'HARI', val: timeLeft.days },
                { label: 'JAM', val: timeLeft.hours },
                { label: 'MENIT', val: timeLeft.minutes },
                { label: 'DETIK', val: timeLeft.seconds },
              ].map((tile, idx) => (
                <div key={idx} className="bg-[#030712]/75 backdrop-blur-md rounded-2xl p-2.5 border border-white/10 text-center hover:border-[#38BDF8]/40 transition-colors">
                  <span className="font-serif text-2xl xl:text-3xl font-bold text-white block leading-tight">
                    {String(tile.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] font-mono tracking-widest text-[#94A3B8] uppercase block mt-1 font-semibold">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Venue Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-[#94A3B8] pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="font-serif text-white/80 text-[11px] sm:text-xs">The Celestial Ballroom, Jakarta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Crown className="w-3.5 h-3.5 text-[#38BDF8]" />
            <span className="text-[#38BDF8] font-serif font-bold tracking-wider text-[10px] sm:text-xs">Masterpiece Edition</span>
          </div>
        </div>
      </aside>

      {/* =========================================================================
          RIGHT MAIN SCROLLABLE CONTENT (Mobile Fullscreen / Desktop Right Panel)
          ========================================================================= */}
      <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 pb-28 shadow-2xl lg:border-l lg:border-[#94A3B8]/30 bg-[#030712]/92 backdrop-blur-xs">
        
        {/* =========================================================================
            SECTION 1: HERO / SAMPUL
            ========================================================================= */}
        <section id="sampul" className="relative w-full min-h-[100dvh] flex flex-col justify-between items-center text-center p-6 sm:p-8 border-b border-[#94A3B8]/30 overflow-hidden">
          <div className="absolute top-0 left-0"><CelestialCornerFlourish position="top-left" size={80} /></div>
          <div className="absolute top-0 right-0"><CelestialCornerFlourish position="top-right" size={80} /></div>

          {/* Top Title */}
          <ScrollReveal animation="fade-down" delay={100} initialVisible={true} className="relative z-10 pt-4 max-w-md mx-auto w-full">
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
          <ScrollReveal animation="zoom-in" delay={150} initialVisible={true} className="relative z-10 my-auto py-2 xs:py-3 pt-4 xs:pt-6 flex flex-col items-center max-w-md mx-auto w-full">
            <div className="mb-2.5 xs:mb-3">
              <CelestialCrescentFrame
                imageSrc={couplePhoto}
                altText={`${groomName} & ${brideName}`}
                frameWidthClass="w-40 xs:w-48 sm:w-56"
                frameHeightClass="h-54 xs:h-62 sm:h-74"
              />
            </div>
            <div className="inline-flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-4 py-1 xs:py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/50 shadow-sm text-white">
              <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#38BDF8]" />
              <span className="text-[9px] xs:text-[10px] font-serif uppercase tracking-[0.2em] font-bold text-[#BAE6FD]">
                THE CELESTIAL WEDDING
              </span>
            </div>
          </ScrollReveal>

          {/* Countdown & Recipient Info (Visible on mobile, hidden on desktop since aside handles it) */}
          <ScrollReveal animation="fade-up" delay={200} initialVisible={true} className="relative z-10 w-full flex flex-col items-center pb-3 xs:pb-4 max-w-md mx-auto lg:hidden">
            <div className="w-full max-w-[280px] xs:max-w-xs p-3 xs:p-3.5 rounded-2xl bg-[#0E1A38]/90 border border-[#94A3B8]/40 shadow-xs mb-2.5 xs:mb-3 text-center">
              <span className="text-[9.5px] xs:text-[10px] uppercase tracking-widest text-[#38BDF8] block mb-0.5">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold text-white block truncate">
                {guestName}
              </span>
            </div>

            {/* Countdown */}
            <div className="grid grid-cols-4 gap-1.5 xs:gap-2 w-full max-w-[280px] xs:max-w-xs mb-2.5 xs:mb-3">
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="p-1.5 xs:p-2 rounded-xl bg-[#0B152B]/85 border border-[#94A3B8]/30 shadow-xs text-center">
                  <span className="block text-sm xs:text-base sm:text-lg font-serif font-bold text-[#F8FAFC]">
                    {String(item.val).padStart(2, '0')}
                  </span>
                  <span className="text-[7.5px] xs:text-[8.5px] uppercase tracking-wider text-[#94A3B8] font-sans">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="flex flex-col items-center text-[#94A3B8] text-[9.5px] xs:text-[10px] tracking-widest uppercase">
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

            <div className="mt-8 space-y-6 sm:space-y-8">
              {/* Groom Profile */}
              <ScrollReveal animation="fade-up" delay={150} className="flex flex-col items-center text-center">
                <div className="mb-3 pt-6 sm:pt-8">
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

              {/* Cosmic Ring Connection Bridge (Spaced with generous breathing room) */}
              <div className="my-10 sm:my-14 py-2 flex items-center justify-center">
                <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-r from-transparent via-[#94A3B8]/40 to-[#38BDF8]" />
                <div className="mx-4 w-10 sm:w-11 h-10 sm:h-11 rounded-full bg-[#0B152B] border border-[#38BDF8] flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                  <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-[#38BDF8] fill-[#38BDF8]/30 animate-pulse" />
                </div>
                <div className="w-14 sm:w-24 h-[1px] bg-gradient-to-l from-transparent via-[#94A3B8]/40 to-[#38BDF8]" />
              </div>

              {/* Bride Profile */}
              <ScrollReveal animation="fade-up" delay={250} className="flex flex-col items-center text-center pt-8 sm:pt-12">
                <div className="mb-3 pt-6 sm:pt-8">
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
            SECTION 4: DRESS CODE & COLOR PALETTE
            ========================================================================= */}
        <section id="dresscode" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] via-[#060D1E] to-[#030712] text-center">
          <GuillocheCelestialWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/60 text-[#38BDF8] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Shirt className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>PANDUAN BUSANA RESMI</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Starlight Attire &amp; Dress Code
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                Untuk menyelaraskan nuansa gemerlap semesta dan keanggunan malam, kami mengundang para tamu kehormatan untuk mengenakan busana bertema <strong>Midnight Navy &amp; Silver Starlight</strong>.
              </p>
            </ScrollReveal>

            {/* Gender Toggle */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setAttireGender('gentlemen')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer shadow-sm ${
                    attireGender === 'gentlemen'
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] border-2 border-white'
                      : 'bg-[#0B152B]/80 text-[#94A3B8] border border-[#94A3B8]/40 hover:text-white'
                  }`}
                >
                  <User size={14} />
                  <span>Tamu Pria (Gentlemen)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttireGender('ladies')}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer shadow-sm ${
                    attireGender === 'ladies'
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] border-2 border-white'
                      : 'bg-[#0B152B]/80 text-[#94A3B8] border border-[#94A3B8]/40 hover:text-white'
                  }`}
                >
                  <Users size={14} />
                  <span>Tamu Wanita (Ladies)</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Attire Guide Box */}
            <ScrollReveal animation="fade-up" delay={200}>
              <div className="p-5 sm:p-6 rounded-3xl bg-[#0B152B]/90 border border-[#38BDF8]/50 text-left max-w-md mx-auto shadow-xl mb-8 text-white relative overflow-hidden">
                <GuillocheCelestialWatermark opacity={0.06} />
                {attireGender === 'gentlemen' ? (
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center shrink-0 text-[#38BDF8] shadow-xs">
                        <Shirt size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                          Setelan Jas Formal / Batik Tulis Sutra
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          Black tie tuxedo, formal suit berwarna midnight blue pekat, abu-abu perak, atau kemeja batik sutra motif klasik berlengan panjang.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-[#94A3B8]/20">
                      <div className="w-9 h-9 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center shrink-0 text-[#38BDF8] shadow-xs">
                        <Gem size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                          Aksesoris &amp; Sepatu
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          Dasi sutra warna perak atau midnight navy, jam tangan formal, serta sepatu pantofel kulit mengkilap.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center shrink-0 text-[#38BDF8] shadow-xs">
                        <Shirt size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                          Gaun Malam Anggun / Kebaya Modern
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          Evening gown bernuansa midnight navy atau silver starlight, gaun satin sutra elegan, atau kebaya modern bertabur payet kristal perak.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 pt-3 border-t border-[#94A3B8]/20">
                      <div className="w-9 h-9 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center shrink-0 text-[#38BDF8] shadow-xs">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                          Aksesoris &amp; Tata Rias
                        </h4>
                        <p className="text-xs text-[#94A3B8] leading-relaxed">
                          Clutch bag bernuansa perak/glitter, perhiasan mutiara atau platinum, serta sepatu heels pesta yang senada.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-4 pt-3 border-t border-[#94A3B8]/20 flex items-center gap-2 text-[11px] text-[#BAE6FD] relative z-10">
                  <Info size={14} className="shrink-0 text-[#38BDF8]" />
                  <span>Dimohon tidak mengenakan busana dominan putih polos demi menghormati gaun pengantin.</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Color Swatches */}
            <ScrollReveal animation="zoom-in" delay={250}>
              <div className="max-w-md mx-auto relative z-10">
                <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#38BDF8] block mb-3 font-bold">
                  ✦ PALET WARNA RESMI PERAYAAN ✦
                </span>
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                  {[
                    { hex: '#030712', name: 'Imperial Midnight', desc: 'Warna dasar pekat ruang angkasa' },
                    { hex: '#0B152B', name: 'Nebula Navy', desc: 'Aksen biru kosmik bangsawan' },
                    { hex: '#38BDF8', name: 'Celestial Cyan', desc: 'Kilauan cahaya starlight' },
                    { hex: '#E2E8F0', name: 'Silver Starlight', desc: 'Sentuhan perak kristal elegan' },
                  ].map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedSwatch(swatch.name);
                        toast.info(`${swatch.name} (${swatch.hex}): ${swatch.desc}`);
                      }}
                      className="cursor-pointer group flex flex-col items-center p-2 sm:p-2.5 rounded-2xl bg-[#0B152B]/80 border border-[#94A3B8]/30 hover:border-[#38BDF8] transition-all hover:scale-105 shadow-sm"
                    >
                      <div 
                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/60 shadow-md mb-1.5 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="font-serif text-[9px] sm:text-[10px] text-white font-bold block truncate max-w-full">
                        {swatch.name}
                      </span>
                      <span className="font-mono text-[7.5px] sm:text-[8px] text-[#38BDF8] font-semibold">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 5: VVIP CONCIERGE & VALET SERVICE
            ========================================================================= */}
        <section id="concierge" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden text-center bg-gradient-to-b from-[#030712] via-[#081226] to-[#030712]">
          <GuillocheCelestialWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/60 text-[#38BDF8] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Crown className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>FASILITAS VVIP &amp; LAYANAN KHUSUS</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Layanan &amp; Protokol Tamu VVIP
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                Sebagai tamu kehormatan, Anda berhak menikmati serangkaian fasilitas eksklusif yang disiapkan khusus oleh kedua mempelai.
              </p>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-md sm:max-w-xl mx-auto mb-8 text-left">
              {/* Perk 1: Valet */}
              <ScrollReveal animation="fade-up" delay={150}>
                <div className="p-4 rounded-2xl bg-[#0B152B]/90 border border-[#38BDF8]/50 shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] mb-3">
                      <Car size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white mb-1">
                      Valet Parking Gratis
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Layanan parkir valet khusus tanpa biaya di Lobby Starlight. Tunjukkan tiket VIP QR Pass Anda kepada petugas.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#94A3B8]/20 text-[10px] text-[#38BDF8] font-serif font-semibold relative z-10">
                    ✓ Bebas Antrean Parkir
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 2: Private Table */}
              <ScrollReveal animation="fade-up" delay={250}>
                <div className="p-4 rounded-2xl bg-[#0B152B]/90 border border-[#38BDF8]/50 shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] mb-3">
                      <Crown size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white mb-1">
                      Celestial Table 01
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Tempat duduk sofa VVIP di baris utama dengan layanan hidangan pribadi oleh butler perjamuan.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#94A3B8]/20 text-[10px] text-[#38BDF8] font-serif font-semibold relative z-10">
                    ✓ Starlight Suite Table
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 3: Fast-Track QR */}
              <ScrollReveal animation="fade-up" delay={350}>
                <div className="p-4 rounded-2xl bg-[#0B152B]/90 border border-[#38BDF8]/50 shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#38BDF8]/20 border border-[#38BDF8]/50 flex items-center justify-center text-[#38BDF8] mb-3">
                      <QrCode size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-white mb-1">
                      Fast-Track Presensi
                    </h4>
                    <p className="text-xs text-[#94A3B8] leading-relaxed">
                      Pintu masuk prioritas dengan pemindaian barcode instan untuk registrasi dan pengantaran ke meja tamu.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#94A3B8]/20 text-[10px] text-[#38BDF8] font-serif font-semibold relative z-10">
                    ✓ Pintu Akses Starlight VVIP
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Action Buttons */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:brightness-110"
                >
                  <Navigation size={14} />
                  <span>Rute Jalur Drop-Off VVIP</span>
                </a>
                <a
                  href={`https://wa.me/6285707909415?text=${encodeURIComponent(`Halo Concierge Wedding ${groomName} & ${brideName}, saya ${guestName} ingin menanyakan info perihal kedatangan tamu VVIP.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0B152B] hover:bg-[#112042] border border-[#38BDF8]/60 text-[#38BDF8] text-xs font-serif font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>Hubungi Concierge Tamu</span>
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* =========================================================================
            SECTION 6: KISAH CINTA (CONSTELLATION LOVE JOURNEY)
            ========================================================================= */}
        <section id="kisah" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] via-[#060D1E] to-[#030712]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                PERJALANAN CINTA
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Rasi Bintang Cinta Kami
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-2 font-serif italic">
                Setiap pertemuan dan janji suci kami tertulis indah dalam peta rasi semesta.
              </p>
            </ScrollReveal>

            {/* Radiant Constellation Timeline */}
            <div className="mt-8 space-y-7 relative before:absolute before:inset-y-0 before:left-5 sm:before:left-1/2 before:-translate-x-1/2 before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-[#38BDF8] before:to-transparent">
              {displayStories.map((item: any, idx: number) => {
                const orbitLabels = ['ORBIT I • PERTEMUAN KOSMIS', 'ORBIT II • JANJI BINTANG', 'ORBIT III • MENUJU KEABADIAN'];
                return (
                  <ScrollReveal key={idx} animation="fade-up" delay={idx * 150}>
                    <div className={`relative flex flex-col sm:flex-row items-start sm:items-center ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''} gap-4`}>
                      <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-6">
                        <div className="relative p-5 rounded-2xl bg-gradient-to-br from-[#0E1A38]/95 via-[#0A132B] to-[#040817] border border-[#38BDF8]/40 shadow-[0_12px_30px_rgba(0,0,0,0.6)] hover:border-[#38BDF8]/70 transition-all group overflow-hidden">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[9px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold px-2 py-0.5 rounded-full bg-[#38BDF8]/15 border border-[#38BDF8]/30">
                              {orbitLabels[idx % 3]}
                            </span>
                            <span className="text-[11px] font-mono font-bold text-white">
                              {item.year}
                            </span>
                          </div>
                          <h4 className="font-serif font-bold text-base text-white group-hover:text-[#BAE6FD] transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-[#CBD5E1] mt-1.5 leading-relaxed font-light">
                            {item.story}
                          </p>
                        </div>
                      </div>

                      {/* Central Glowing Constellation Node */}
                      <div className="absolute left-5 sm:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#040814] border-2 border-[#38BDF8] flex items-center justify-center z-10 shadow-[0_0_18px_rgba(56,189,248,0.7)]">
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_#38BDF8]" />
                        <div className="absolute -inset-1 rounded-full border border-[#38BDF8]/40 animate-ping pointer-events-none" />
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* =========================================================================
            SECTION 7: GALERI FOTO (STARLIGHT EDITORIAL MAGAZINE & TABS)
            ========================================================================= */}
        <section id="galeri" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] via-[#050B18] to-[#030712]">
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-up" className="text-center">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#38BDF8] font-serif font-bold">
                MEMORI INDAH
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Galeri Foto Bahagia
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-4 font-serif">
                Dokumentasi penuh cinta dan kehangatan dalam bingkai malam kosmis.
              </p>
            </ScrollReveal>

            {/* Category Filter Tabs */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap mt-4 mb-6">
              {[
                { id: 'all', label: 'Semua Momen', count: displayGallery.length },
                { id: 'prewedding', label: 'Prewedding', count: displayGallery.filter((i: any) => i.category === 'prewedding').length },
                { id: 'ceremony', label: 'Akad / Janji Suci', count: displayGallery.filter((i: any) => i.category === 'ceremony').length },
                { id: 'reception', label: 'Resepsi Starlight', count: displayGallery.filter((i: any) => i.category === 'reception').length },
              ].map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveGalleryTab(tab.id as any);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] font-serif transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5 ${
                    activeGalleryTab === tab.id
                      ? 'bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] font-bold shadow-[0_0_15px_rgba(56,189,248,0.4)] scale-105'
                      : 'bg-[#0B152B]/85 text-[#94A3B8] border border-[#38BDF8]/30 hover:text-white hover:border-[#38BDF8]'
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                    activeGalleryTab === tab.id ? 'bg-[#030712]/20 text-[#030712] font-bold' : 'bg-white/10 text-[#38BDF8]'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Featured Masterpiece Hero Showcase (Cinema Mode) */}
            {filteredGallery.length > 0 && (
              <ScrollReveal animation="zoom-in" duration={850} className="mb-4">
                <div 
                  onClick={() => setActivePhotoIndex(0)}
                  className="relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border-2 border-[#38BDF8]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.3)] bg-[#0A132B] group cursor-pointer"
                >
                  <img
                    src={filteredGallery[0].url}
                    alt={filteredGallery[0].caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-[#030712]/20 to-transparent flex items-end justify-between p-4 sm:p-6">
                    <div>
                      <span className="text-[9px] font-mono tracking-widest text-[#38BDF8] uppercase font-bold block mb-1">
                        ★ FEATURED • STARLIGHT PORTRAIT
                      </span>
                      <h3 className="font-serif text-base sm:text-lg font-bold text-white drop-shadow-sm">
                        {filteredGallery[0].caption}
                      </h3>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8] text-[#38BDF8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Maximize2 size={16} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* Paired Editorial Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {filteredGallery.slice(1).map((item: any, idx: number) => (
                <ScrollReveal key={idx + 1} animation="zoom-in" delay={idx * 80}>
                  <div
                    onClick={() => setActivePhotoIndex(idx + 1)}
                    className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#94A3B8]/40 shadow-lg cursor-pointer group bg-[#0E1A38]"
                  >
                    <img
                      src={item.url}
                      alt={item.caption || `Foto ${idx + 2}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
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
            SECTION 8: AR PHOTOBOOTH KAMERA (150k VIP FEATURE)
            ========================================================================= */}
        <section id="photobooth" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden text-center bg-gradient-to-b from-[#030712] via-[#081226] to-[#030712]">
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
                  Kamera akan otomatis membingkai foto Anda dengan ornamen bintang perak &amp; nama kedua mempelai.
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
            SECTION 9: TANDA KASIH & AMPLOP DIGITAL (GIFT & REGISTRY)
            ========================================================================= */}
        <section id="kado" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#060D1E] to-[#030712] text-center">
          <GuillocheCelestialWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/60 text-[#38BDF8] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Gift className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>TANDA KASIH &amp; KADO DIGITAL</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Amplop Digital &amp; Hadiah
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
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
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] border-2 border-white'
                      : 'bg-[#0B152B]/80 text-[#94A3B8] border border-[#94A3B8]/40 hover:text-white'
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
                      ? 'bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] border-2 border-white'
                      : 'bg-[#0B152B]/80 text-[#94A3B8] border border-[#94A3B8]/40 hover:text-white'
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
                    <div className="relative p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-br from-[#0E1A38] via-[#0A132B] to-[#040817] border border-[#38BDF8]/60 shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(56,189,248,0.25)] text-left overflow-hidden text-white hover:scale-[1.02] transition-transform">
                      <GuillocheCelestialWatermark opacity={0.08} />

                      {/* Header Card: Bank & EMV Chip */}
                      <div className="flex items-center justify-between mb-3 xs:mb-4 relative z-10">
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <span className="font-serif font-bold text-sm xs:text-base sm:text-lg tracking-wider text-white">
                            {bank.bank_name}
                          </span>
                          <span className="text-[8px] xs:text-[8.5px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40">
                            PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 xs:gap-2">
                          <Wifi size={15} className="text-[#38BDF8] rotate-90 opacity-80" />
                          <EMVSilverSmartChip />
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mb-2.5 xs:mb-3 relative z-10">
                        <span className="text-[8.5px] xs:text-[9px] font-serif uppercase tracking-widest text-[#94A3B8] block">
                          NOMOR REKENING PRIORITAS
                        </span>
                        <div className="font-mono text-sm xs:text-lg sm:text-2xl font-bold tracking-wider text-white mt-0.5 truncate">
                          {bank.account_number}
                        </div>
                      </div>

                      {/* Card Holder & Copy Button */}
                      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2 pt-2.5 xs:pt-3 border-t border-[#94A3B8]/20 relative z-10">
                        <div>
                          <span className="text-[8.5px] xs:text-[9px] font-sans uppercase tracking-wider text-[#94A3B8] block">
                            ATAS NAMA
                          </span>
                          <span className="font-serif text-[11px] xs:text-xs font-semibold text-[#BAE6FD]">
                            {bank.account_name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(bank.account_number.replace(/\s+/g, ''), bank.id)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 xs:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#38BDF8] to-white text-[#030712] text-[10px] xs:text-[11px] font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                        >
                          {isCopied === bank.id ? (
                            <>
                              <Check size={12} className="text-[#030712]" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} className="text-[#030712]" />
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
                <div className="p-6 rounded-3xl bg-[#0B152B]/90 border border-[#38BDF8]/60 max-w-sm mx-auto text-center shadow-xl text-white">
                  <Package className="w-8 h-8 text-[#38BDF8] mx-auto mb-3" />
                  <h4 className="font-serif text-base font-bold text-white mb-1">
                    Alamat Kirim Hadiah Fisik
                  </h4>
                  <p className="text-xs text-[#94A3B8] leading-relaxed mb-4 font-sans">
                    {couple?.gift_address || 'Jl. Surya Kencana No. 88, Jakarta Selatan (Kediaman Mempelai)'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(couple?.gift_address || 'Jl. Surya Kencana No. 88, Jakarta Selatan', 'addr')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#38BDF8] to-[#818CF8] text-[#030712] text-xs font-serif font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md hover:brightness-110"
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
            SECTION 10: VIP GUEST CHECK-IN PASS & RSVP FORM
            ========================================================================= */}
        <section id="vip-pass" className="relative p-6 sm:p-10 border-b border-[#94A3B8]/30 overflow-hidden bg-gradient-to-b from-[#030712] via-[#081126] to-[#030712] text-center">
          <GuillocheCelestialWatermark opacity={0.06} />
          <div className="max-w-xl mx-auto relative z-10">
            <ScrollReveal animation="fade-down">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/60 text-[#38BDF8] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Barcode className="w-3.5 h-3.5 text-[#38BDF8]" />
                <span>VIP PASS &amp; PRESENSI BARCODE / QR</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Konfirmasi Kehadiran &amp; Tiket VIP
              </h2>
              <CelestialStarlightDivider />
              <p className="text-xs text-[#94A3B8] max-w-sm mx-auto mb-6">
                Sistem otomatis menerbitkan <strong>Tiket Barcode &amp; QR Resmi</strong> untuk discan petugas saat tiba di lokasi resepsi.
              </p>
            </ScrollReveal>

            {/* Toggle View Pass Ticket */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="mb-6">
                <button
                  type="button"
                  onClick={() => setShowBarcodePreview(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-[#0B152B] hover:bg-[#112042] text-[#38BDF8] border border-[#38BDF8]/60 transition-colors cursor-pointer shadow-md"
                >
                  <Barcode size={14} />
                  <span>{activeBarcodePass ? (showBarcodePreview && !savedPass ? 'Tutup Tiket' : 'Tampilkan Tiket Barcode VIP') : 'Lihat Contoh Barcode VIP'}</span>
                </button>
              </div>
            </ScrollReveal>

            {/* VIP GUEST VERIFIED PASS CARD */}
            {activeBarcodePass && (
              <ScrollReveal animation="zoom-in" delay={180} duration={850}>
                <div className="relative bg-gradient-to-br from-[#0E1A38] via-[#081226] to-[#030712] text-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-3xl border border-[#38BDF8]/60 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(56,189,248,0.35)] mb-8 text-center overflow-hidden max-w-[340px] xs:max-w-sm mx-auto z-10">
                  <GuillocheCelestialWatermark opacity={0.09} />

                  <div className="inline-flex items-center gap-1.5 xs:gap-2 px-2.5 xs:px-3 py-1 rounded-full bg-[#38BDF8]/20 text-[9.5px] xs:text-[10px] text-[#38BDF8] mb-2.5 xs:mb-3 border border-[#38BDF8]/50">
                    <Crown size={12} className="text-[#38BDF8]" />
                    <span className="font-serif tracking-widest font-bold uppercase">
                      CELESTIAL VIP ACCESS PASS
                    </span>
                  </div>

                  <h3 className="font-serif text-lg xs:text-xl font-bold text-white mb-1">
                    {activeBarcodePass.name}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 rounded-full text-[9.5px] xs:text-[10px] font-sans font-semibold my-1.5 xs:my-2 bg-emerald-950/90 text-emerald-200 border border-emerald-400/50">
                    <span>✓ Terkonfirmasi Hadir ({activeBarcodePass.guests || 1} Tamu)</span>
                  </div>

                  <p className="text-[10px] xs:text-[11px] text-[#38BDF8] mb-2.5 xs:mb-3 font-serif">
                    {displayEvents[0]?.location || 'The Celestial Ballroom • Jakarta'}
                  </p>

                  {/* VVIP Seating & Gate Info */}
                  <div className="grid grid-cols-2 gap-1.5 xs:gap-2 my-2.5 xs:my-3 max-w-xs mx-auto text-left">
                    <div className="p-1.5 xs:p-2 rounded-xl bg-[#050B18]/90 border border-[#38BDF8]/30 shadow-inner">
                      <span className="text-[7.5px] xs:text-[8px] text-[#94A3B8] block uppercase font-sans">Meja Jamuan</span>
                      <span className="text-[10px] xs:text-[11px] font-serif font-bold text-[#38BDF8] truncate block">{activeBarcodePass.table || 'Table 01 - Celestial'}</span>
                    </div>
                    <div className="p-1.5 xs:p-2 rounded-xl bg-[#050B18]/90 border border-[#38BDF8]/30 shadow-inner">
                      <span className="text-[7.5px] xs:text-[8px] text-[#94A3B8] block uppercase font-sans">Pintu Akses</span>
                      <span className="text-[10px] xs:text-[11px] font-serif font-bold text-[#38BDF8] truncate block">Lobby Utama Starlight</span>
                    </div>
                  </div>

                  {/* QR Code Graphic with Laser Scanline Animation */}
                  <div className="relative w-28 h-28 xs:w-32 xs:h-32 sm:w-36 sm:h-36 mx-auto bg-white p-2 rounded-2xl border-2 border-[#38BDF8] shadow-md flex items-center justify-center my-2.5 xs:my-3 overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`INV:${invitation?.id || 'CELESTIAL'}|GUEST:${activeBarcodePass.name}|ATT:attending|CODE:${activeBarcodePass.code}`)}`}
                      alt="QR Code Tiket"
                      className="w-full h-full object-contain"
                    />
                    {/* Laser Scanline */}
                    <div 
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#38BDF8] to-transparent pointer-events-none"
                      style={{ animation: 'cardScanline 2.5s ease-in-out infinite' }}
                    />
                  </div>

                  {/* Authentic Linear Barcode Graphic (Code-128 Vertical SVG Bars) */}
                  <div className="relative my-2 xs:my-2.5 px-2.5 xs:px-3 py-1.5 xs:py-2 bg-white rounded-xl border border-[#38BDF8]/70 flex flex-col items-center shadow-md overflow-hidden">
                    <svg viewBox="0 0 160 32" className="w-full max-w-[170px] xs:max-w-[210px] h-8 xs:h-9 text-[#030712]" preserveAspectRatio="none">
                      {[2,1,3,1,1,2,1,3,2,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,2,1].map((w, idx) => (
                        idx % 2 === 0 ? <rect key={idx} x={idx * 3.6} y="0" width={w} height="32" fill="currentColor" /> : null
                      ))}
                    </svg>
                    <span className={`font-mono font-bold text-[11px] xs:text-xs tracking-[0.25em] ${isDemo ? 'text-red-700 line-through' : 'text-[#030712]'} mt-1`}>
                      {activeBarcodePass.code}
                    </span>
                    {isDemo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none">
                        <span className="bg-sky-600/95 text-white font-bold text-[8.5px] xs:text-[9px] px-2 py-0.5 rounded tracking-widest uppercase shadow">
                          BARCODE DEMO (TERKUNCI)
                        </span>
                      </div>
                    )}
                  </div>

                  {isDemo ? (
                    <div className="bg-[#050B18]/90 border border-sky-400/50 rounded-xl p-2.5 my-2.5 text-center text-white">
                      <p className="text-[11px] font-serif font-bold text-sky-300">
                        🔒 Barcode Demo Portofolio (Terkunci)
                      </p>
                      <p className="text-[10px] text-[#94A3B8] mt-0.5 leading-normal">
                        Barcode &amp; QR ini terkunci khusus demo portofolio dan tidak dapat di-scan untuk presensi tamu sungguhan.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10.5px] text-[#94A3B8] italic leading-snug my-2.5 max-w-[270px] mx-auto font-serif">
                      Tunjukkan Barcode atau QR Code ini kepada panitia saat tiba di lokasi resepsi.
                    </p>
                  )}

                  <div className="flex flex-col items-center gap-2.5 mt-3">
                    <button
                      type="button"
                      onClick={handleSavePass}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer hover:brightness-110 active:scale-95"
                    >
                      <Download size={14} />
                      <span>Simpan Tiket ke Galeri</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedPass(null);
                        clearBarcodePass(invitation?.id, invitation?.slug, activeBarcodePass?.name || guestName, 'celestial');
                        setShowBarcodePreview(false);
                      }}
                      className="inline-block text-[11px] text-[#38BDF8] hover:underline font-serif font-semibold cursor-pointer"
                    >
                      ← Ubah Konfirmasi Kehadiran
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* RSVP Submission Form */}
            <ScrollReveal animation="fade-up" delay={200} duration={850}>
              <form onSubmit={handleSubmitRSVP} className="relative z-10 max-w-md mx-auto p-5 sm:p-7 rounded-3xl bg-[#0B152B]/90 border border-[#38BDF8]/50 text-left shadow-xl text-white">
                <h4 className="font-serif text-lg font-bold text-white text-center mb-4">
                  Formulir RSVP Kehadiran
                </h4>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#38BDF8] block mb-1">
                    Nama Lengkap Anda
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white text-xs focus:outline-hidden focus:border-[#38BDF8]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#38BDF8] block mb-1">
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
                        className={`py-2 px-1 xs:px-2 rounded-xl text-[10px] xs:text-xs font-serif transition-all cursor-pointer ${
                          rsvpStatus === opt.id
                            ? 'bg-gradient-to-r from-[#38BDF8] to-white text-[#030712] font-bold shadow-xs'
                            : 'bg-[#050B18] text-[#94A3B8] border border-[#94A3B8]/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#38BDF8] block mb-1">
                    Jumlah Tamu Hadir
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={e => setRsvpCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white text-xs focus:outline-hidden focus:border-[#38BDF8]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-serif text-[#38BDF8] block mb-1">
                    Ucapan Doa &amp; Harapan
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={e => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border border-[#94A3B8]/40 text-white text-xs focus:outline-hidden focus:border-[#38BDF8] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer hover:brightness-110 active:scale-95"
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
                  <MessageCircle size={16} className="text-[#38BDF8]" />
                  <span>Untaian Doa &amp; Ucapan ({rsvpList.length})</span>
                </h4>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {rsvpList.map((w, idx) => (
                    <ScrollReveal key={idx} animation="fade-up" delay={(idx % 4) * 60}>
                      <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0B152B]/80 border border-[#94A3B8]/30 text-xs shadow-xs">
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
                        <p className="text-[11px] text-[#CBD5E1] leading-relaxed">
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
            SECTION 11: PENUTUP / FOOTER (Open Celestial Starlight Sign-off)
            ========================================================================= */}
        <footer className="relative pt-8 sm:pt-12 pb-32 sm:pb-36 px-4 sm:px-6 text-center max-w-xl mx-auto overflow-hidden">
          <ScrollReveal animation="fade-up" className="relative z-10 flex flex-col items-center">
            {/* Glowing Moon & Star Icon */}
            <div className="relative mb-4 flex items-center justify-center">
              <div className="absolute -inset-3 rounded-full bg-[#38BDF8]/20 blur-xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-[#0B152B] border border-[#38BDF8]/60 flex items-center justify-center shadow-[0_0_20px_rgba(56,189,248,0.35)]">
                <Moon className="w-6 h-6 text-[#BAE6FD] fill-[#38BDF8]/25 -rotate-12" />
                <Star className="w-3 h-3 text-[#38BDF8] fill-[#38BDF8] absolute top-1.5 right-1.5 animate-pulse" />
              </div>
            </div>

            {/* Title */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mb-3">
              Terima Kasih
            </h2>

            {/* Heartfelt Closing Words */}
            <p className="font-serif text-xs sm:text-sm text-[#CBD5E1] leading-relaxed max-w-md mx-auto mb-6 px-2 font-light">
              Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi ikatan suci pernikahan kami.
            </p>

            {/* Starlight Divider */}
            <CelestialStarlightDivider />

            {/* Couple Signature */}
            <div className="mt-5 mb-8 space-y-1">
              <p className="text-[10px] sm:text-[10.5px] font-serif tracking-[0.25em] uppercase text-[#38BDF8] font-semibold">
                KAMI YANG BERBAHAGIA
              </p>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#BAE6FD] drop-shadow-sm tracking-wide">
                {groomName} &amp; {brideName}
              </div>
              <p className="text-[11px] sm:text-xs text-[#94A3B8] font-serif italic">
                Beserta segenap keluarga besar kedua mempelai
              </p>
            </div>

            {/* Clean, Subtle Brand Credit */}
            <div className="w-full pt-6 border-t border-[#94A3B8]/20 flex flex-col items-center gap-1.5">
              <span className="text-[9.5px] text-[#64748B] font-mono tracking-widest uppercase">
                THE CELESTIAL WEDDING • {new Date().getFullYear()}
              </span>
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9.5px] font-serif tracking-[0.2em] text-[#38BDF8]/70 hover:text-[#38BDF8] uppercase transition-colors"
              >
                WD DIGITAL INVITATION
              </a>
            </div>
          </ScrollReveal>
        </footer>
      </main>

      {/* Floating Bottom Navigation Bar with Dynamic Starlight Silver Pill Dock */}
      <nav className={`fixed bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 max-w-[calc(100vw-20px)] sm:max-w-max px-1.5 xs:px-2 pointer-events-auto transition-opacity duration-300 ${activePhotoIndex !== null ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}>
        <div 
          ref={navContainerRef}
          className="bg-[#040814]/95 backdrop-blur-xl border border-[#38BDF8]/60 rounded-full py-1 xs:py-1.5 px-1.5 xs:px-2 sm:px-3 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(56,189,248,0.3)] flex items-center justify-start sm:justify-center gap-0.5 xs:gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {[
            { id: 'sampul', label: 'Cover', icon: Sparkles },
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
                className={`transition-all duration-300 flex items-center gap-1 sm:gap-1.5 rounded-full cursor-pointer select-none shrink-0 snap-center ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#38BDF8] via-[#7DD3FC] to-white text-[#030712] px-2.5 xs:px-3 sm:px-3.5 py-1.5 font-serif font-bold text-[10px] xs:text-xs shadow-[0_0_15px_rgba(56,189,248,0.7)] scale-105' 
                    : 'text-[#BAE6FD]/70 hover:text-white hover:bg-white/10 p-1.5 xs:p-2 text-xs'
                }`}
                title={item.label}
              >
                <IconComponent size={14} className={`shrink-0 ${isActive ? 'text-[#030712]' : 'text-[#38BDF8]'}`} />
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
          PORTALED FULLSCREEN LIGHTBOX FOR GALLERY (Interactive Carousel & Counter)
          ========================================================================= */}
      {activePhotoIndex !== null && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 xs:p-4 animate-fade-in select-none">
          {/* Close button */}
          <button
            type="button"
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#0E1A38]/90 border border-[#38BDF8]/60 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-transform cursor-pointer z-30 shadow-[0_0_15px_rgba(56,189,248,0.4)]"
          >
            <X className="w-5 h-5 text-[#38BDF8]" />
          </button>

          {/* Photo Counter Pill */}
          <div className="absolute top-5 left-5 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0B152B]/90 border border-[#38BDF8]/50 text-white text-[10px] sm:text-xs font-mono font-bold shadow-md">
            <Sparkles size={12} className="text-[#38BDF8]" />
            <span>Foto {activePhotoIndex + 1} dari {filteredGallery.length}</span>
          </div>

          {/* Previous Arrow */}
          {filteredGallery.length > 1 && (
            <button
              type="button"
              onClick={() => setActivePhotoIndex(prev => prev !== null ? (prev - 1 + filteredGallery.length) % filteredGallery.length : 0)}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0B152B]/85 hover:bg-[#162955] border border-[#38BDF8]/60 text-[#38BDF8] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 shadow-lg"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Next Arrow */}
          {filteredGallery.length > 1 && (
            <button
              type="button"
              onClick={() => setActivePhotoIndex(prev => prev !== null ? (prev + 1) % filteredGallery.length : 0)}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#0B152B]/85 hover:bg-[#162955] border border-[#38BDF8]/60 text-[#38BDF8] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer z-20 shadow-lg"
            >
              <ChevronRight size={22} />
            </button>
          )}

          <div className="relative max-w-lg w-full max-h-[85vh] rounded-3xl overflow-hidden border-2 border-[#38BDF8]/60 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_30px_rgba(56,189,248,0.3)] bg-[#050B18]">
            <img
              src={filteredGallery[activePhotoIndex]?.url}
              alt={filteredGallery[activePhotoIndex]?.caption || 'Preview'}
              className="w-full h-auto max-h-[72vh] object-contain mx-auto"
            />
            {filteredGallery[activePhotoIndex]?.caption && (
              <div className="p-3.5 sm:p-4 text-center bg-[#0B152B]/95 border-t border-[#38BDF8]/30">
                <p className="font-serif text-xs sm:text-sm font-bold text-white tracking-wide">
                  {filteredGallery[activePhotoIndex]?.caption}
                </p>
                <span className="text-[9.5px] font-mono text-[#38BDF8] uppercase tracking-widest block mt-0.5">
                  THE CELESTIAL MEMORIES
                </span>
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
