import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, Copy, Check, 
  ChevronLeft, ChevronRight, Gift,
  X, Navigation, 
  Clock, Sparkles, ShieldCheck,
  Crown, Star, Award, CreditCard, Send,
  Maximize2, Package, MessageCircle, QrCode, Download, ExternalLink,
  Heart, User, Users, Shirt, Car, Wifi, Info, CheckCircle2, Compass, Gem,
  Camera, RefreshCw, SwitchCamera, Image as ImageIcon, Upload, Barcode
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode, clearBarcodePass } from '../../../utils/barcodePass';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Victorian Royal Gilded Acanthus Corner Ornaments for High-End Folios
export const EmeraldGoldCorner: React.FC<{ color?: string; size?: number; className?: string }> = ({ 
  color = '#ECC880', 
  size = 48,
  className = ''
}) => (
  <>
    {/* Top Left */}
    <div className={`absolute top-2 left-2 pointer-events-none opacity-90 z-20 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="emeraldGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="35%" stopColor="#ECC880" />
            <stop offset="75%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
        </defs>
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Top Right */}
    <div className={`absolute top-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Bottom Left */}
    <div className={`absolute bottom-2 left-2 pointer-events-none opacity-90 z-20 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Bottom Right */}
    <div className={`absolute bottom-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  </>
);

// High-end EMV Smart Gold Chip for Bank / Priority Cards
export const EMVGoldSmartChip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-11 h-8 rounded-md bg-gradient-to-br from-[#FFE9A0] via-[#D4AF37] to-[#8C6D2B] p-[1.5px] shadow-sm relative overflow-hidden flex-shrink-0 ${className}`}>
    <div className="w-full h-full rounded-[4px] bg-gradient-to-br from-[#E8D5A3] via-[#C5A059] to-[#997632] relative flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#61450C]/60" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-[#61450C]/60" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-[#61450C]/60" />
      <div className="w-4 h-3.5 rounded-sm border border-[#61450C]/70 relative z-1 bg-[#D4AF37]/40" />
    </div>
  </div>
);

// Bank Guilloche Fine-Line Watermark
export const GuillocheVelvetWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.06,
  className = ''
}) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="guillochePatternEmerald" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#ECC880" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="#ECC880" strokeWidth="0.5" />
          <path d="M10 60 Q 60 10, 110 60 Q 60 110, 10 60 Z" fill="none" stroke="#ECC880" strokeWidth="0.4" />
          <path d="M60 10 Q 110 60, 60 110 Q 10 60, 60 10 Z" fill="none" stroke="#ECC880" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guillochePatternEmerald)" />
    </svg>
  </div>
);

// Floating Shimmering Emerald & Gold Stardust Particles
export const FloatingEmeraldStardust: React.FC<{ count?: number; className?: string }> = ({ count = 16, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${(i % 3) * 2 + 2}px`,
            height: `${(i % 3) * 2 + 2}px`,
            backgroundColor: i % 2 === 0 ? '#ECC880' : '#4ADE80',
            top: `${(i * 17) % 95}%`,
            left: `${(i * 23) % 95}%`,
            opacity: (i % 6 + 3) / 10,
            filter: 'blur(0.5px) drop-shadow(0 0 6px #ECC880)',
            animation: `pulse ${(i % 3) + 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

// Royal Crown Crest Monogram
export const EmeraldRoyalCrest: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  initials,
  size = 'md',
  className = ''
}) => {
  const dim = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';
  const textSz = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm';
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className={`${dim} rounded-full bg-gradient-to-br from-[#ECC880] via-[#C5A059] to-[#8C6D2B] p-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.5)] shrink-0`}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c3123] via-[#072117] to-[#04150E] flex flex-col items-center justify-center border border-[#ECC880]/60 text-[#ECC880] px-1">
          <Crown className="w-4 h-4 text-[#ECC880] mb-0.5 shrink-0" />
          <span className={`font-serif font-bold tracking-widest text-[#FFF8E2] whitespace-nowrap select-none ${textSz}`}>
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
};

// Smooth Royal Scroll Reveal with Spring Easing & Intersectional Observer
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'zoom-in' | 'slide-left' | 'slide-right' | 'arch-reveal' | 'fade-in';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}> = ({ children, animation = 'fade-up', delay = 0, duration = 850, className = '', once = true }) => {
  const [hasRevealed, setHasRevealed] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (hasRevealed && once) return;

    const checkVisibility = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top < windowHeight - 10 && rect.bottom > 10) {
        setHasRevealed(true);
        return true;
      }
      return false;
    };

    // Check immediately on mount
    checkVisibility();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasRevealed(true);
          if (once) observer.unobserve(el);
        }
      },
      { 
        threshold: 0.02, 
        rootMargin: '20px 0px 20px 0px' 
      }
    );

    observer.observe(el);

    // Fast event-driven scroll fallback
    const handleScroll = () => {
      if (checkVisibility() && once) {
        window.removeEventListener('scroll', handleScroll);
        observer.disconnect();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasRevealed, once]);

  const getAnimClass = () => {
    if (!hasRevealed) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-12 scale-[0.96]';
        case 'fade-down':
          return 'opacity-0 -translate-y-12 scale-[0.96]';
        case 'zoom-in':
          return 'opacity-0 scale-[0.90]';
        case 'slide-left':
          return 'opacity-0 -translate-x-12';
        case 'slide-right':
          return 'opacity-0 translate-x-12';
        case 'arch-reveal':
          return 'opacity-0 translate-y-14 scale-[0.95]';
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
      className={`transition-all will-change-transform will-change-opacity ${getAnimClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: hasRevealed ? `${delay}ms` : '0ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {children}
    </div>
  );
};

// Cascading 24K Gold Foil Flakes & Twinkling Diamond Stars
export const FallingEmeraldGoldParticles: React.FC<{ count?: number; className?: string }> = ({ count = 16, className = '' }) => {
  const particles = [
    { left: '4%', duration: '14s', delay: '0s', size: 14, type: 'foil', rot: 45 },
    { left: '15%', duration: '18s', delay: '2.5s', size: 18, type: 'star', rot: 0 },
    { left: '26%', duration: '16s', delay: '1.2s', size: 12, type: 'foil', rot: 120 },
    { left: '42%', duration: '20s', delay: '4.8s', size: 20, type: 'star', rot: 15 },
    { left: '58%', duration: '15s', delay: '3.1s', size: 16, type: 'foil', rot: 210 },
    { left: '71%', duration: '19s', delay: '6.4s', size: 14, type: 'star', rot: 0 },
    { left: '85%', duration: '17s', delay: '1.8s', size: 13, type: 'foil', rot: 75 },
    { left: '94%', duration: '21s', delay: '7.5s', size: 16, type: 'foil', rot: 160 },
    { left: '21%', duration: '17.5s', delay: '8.8s', size: 15, type: 'star', rot: 30 },
    { left: '52%', duration: '16.5s', delay: '10.2s', size: 14, type: 'foil', rot: 290 },
    { left: '67%', duration: '22s', delay: '8.5s', size: 18, type: 'star', rot: 0 },
    { left: '80%', duration: '18.5s', delay: '11.1s', size: 12, type: 'foil', rot: 95 },
  ].slice(0, count);

  return (
    <div className={`pointer-events-none fixed inset-0 z-15 overflow-hidden select-none ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: '-35px',
            left: p.left,
            animation: `goldParticleDrift ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transformOrigin: 'center center',
          }}
        >
          {p.type === 'star' ? (
            <svg 
              width={p.size} 
              height={p.size} 
              viewBox="0 0 24 24" 
              fill="none" 
              style={{
                animation: 'starTwinkle 3.2s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 5px rgba(236,200,128,0.9))'
              }}
            >
              <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="#FFEAA7" />
              <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
            </svg>
          ) : (
            <div 
              style={{
                width: p.size,
                height: p.size * 0.75,
                borderRadius: '2px',
                background: 'linear-gradient(135deg, #FFFDF0 0%, #ECC880 40%, #C5A059 70%, #8C6D2B 100%)',
                animation: `goldFoilTumble ${parseFloat(p.duration) * 0.3}s ease-in-out infinite alternate`,
                boxShadow: '0 0 8px rgba(236,200,128,0.5)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

// Banknote Guilloché Rosette Parchment Watermark for Warm Ivory Cards
export const GuillocheParchmentWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.08,
  className = ''
}) => (
  <div 
    className={`absolute inset-0 pointer-events-none overflow-hidden rounded-3xl select-none z-0 ${className}`}
    style={{ opacity }}
  >
    <svg viewBox="0 0 400 600" fill="none" className="w-full h-full text-[#C5A059]">
      <g stroke="currentColor" strokeWidth="0.8">
        <circle cx="200" cy="300" r="140" strokeDasharray="3 3" />
        <circle cx="200" cy="300" r="110" />
        <circle cx="200" cy="300" r="80" strokeDasharray="4 2" />
        <circle cx="200" cy="300" r="50" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(0 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(30 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(60 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(90 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(120 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(150 200 300)" />
        <path d="M40 80 Q200 20 360 80" strokeWidth="1" />
        <path d="M40 520 Q200 580 360 520" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

// Royal Calligraphic Flourish Underline (Symmetrical Spiraling Ribbon with Diamond Jewel)
export const RoyalCalligraphicDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center w-full max-w-[280px] mx-auto select-none ${className}`}>
    <svg viewBox="0 0 280 28" fill="none" className="w-full h-auto drop-shadow-xs">
      <defs>
        <linearGradient id="calliGoldGradEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="30%" stopColor="#E8CD8C" />
          <stop offset="70%" stopColor="#ECC880" />
          <stop offset="100%" stopColor="#8C6D2B" />
        </linearGradient>
      </defs>
      {/* Center 4-Point Diamond Jewel */}
      <path d="M140 6 L143.5 14 L140 22 L136.5 14 Z" fill="url(#calliGoldGradEmerald)" />
      <circle cx="140" cy="14" r="1.5" fill="#FFFDF5" />
      <circle cx="130" cy="14" r="1.8" fill="url(#calliGoldGradEmerald)" />
      <circle cx="150" cy="14" r="1.8" fill="url(#calliGoldGradEmerald)" />

      {/* Left Calligraphic Swirl */}
      <path d="M124 14 C105 14, 85 8, 65 14 C52 18, 44 12, 38 6 C32 0, 24 4, 26 12 C28 20, 38 22, 48 18 C60 14, 75 16, 95 14" stroke="url(#calliGoldGradEmerald)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="28" cy="10" r="1.5" fill="url(#calliGoldGradEmerald)" />
      <path d="M20 14 L6 14" stroke="url(#calliGoldGradEmerald)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="2" cy="14" r="1.2" fill="url(#calliGoldGradEmerald)" />

      {/* Right Calligraphic Swirl */}
      <path d="M156 14 C175 14, 195 8, 215 14 C228 18, 236 12, 242 6 C248 0, 256 4, 254 12 C252 20, 242 22, 232 18 C220 14, 205 16, 185 14" stroke="url(#calliGoldGradEmerald)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="252" cy="10" r="1.5" fill="url(#calliGoldGradEmerald)" />
      <path d="M260 14 L274 14" stroke="url(#calliGoldGradEmerald)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="278" cy="14" r="1.2" fill="url(#calliGoldGradEmerald)" />
    </svg>
  </div>
);

// Imperial Royal Emerald & 24K Gold Monogram Wax Seal with Sculpted Laurel Wreath & Crown
export const EmeraldRoyalWaxSeal: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg'; showWreath?: boolean }> = ({ 
  initials, 
  size = 'md',
  showWreath = true 
}) => {
  const dim = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-24 h-24' : 'w-20 h-20';
  const fontSz = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';
  const wreathInset = size === 'sm' ? '-inset-8' : size === 'lg' ? '-inset-12' : '-inset-10';

  return (
    <div className="relative inline-flex items-center justify-center select-none my-3 group">
      {/* Outer Golden Aura Halo */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#ECC880]/25 via-[#FFE7A8]/30 to-[#ECC880]/25 blur-xl animate-pulse pointer-events-none" />
      
      {/* Handcrafted Sculpted Laurel Wreath with Crown Pediment */}
      {showWreath && (
        <div className={`absolute ${wreathInset} pointer-events-none z-0 flex items-center justify-center`}>
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full opacity-90">
            <defs>
              <linearGradient id="emeraldWreathGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E8" />
                <stop offset="25%" stopColor="#E2C792" />
                <stop offset="65%" stopColor="#ECC880" />
                <stop offset="100%" stopColor="#8C6D2B" />
              </linearGradient>
            </defs>

            {/* Top Crown Pediment */}
            <g transform="translate(56, 12) scale(0.7)">
              <path d="M5 24 L8 9 L17 19 L25 4 L33 19 L42 9 L45 24 Z" fill="url(#emeraldWreathGrad)" stroke="#8C6D2B" strokeWidth="0.8" />
              <circle cx="25" cy="4" r="2.5" fill="#FFF9E8" />
              <circle cx="8" cy="9" r="2" fill="#FFF9E8" />
              <circle cx="42" cy="9" r="2" fill="#FFF9E8" />
              <rect x="5" y="24" width="40" height="3" rx="1.5" fill="url(#emeraldWreathGrad)" />
            </g>

            {/* Left Laurel Branch */}
            <g>
              <path d="M70 128 C45 125, 20 102, 22 68 C24 45, 36 28, 52 24" stroke="url(#emeraldWreathGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M22 68 C14 62, 10 50, 15 44 C20 48, 22 58, 22 68 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M22 68 C26 58, 32 50, 36 55 C32 62, 26 66, 22 68 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M28 88 C18 84, 14 74, 18 68 C24 72, 26 80, 28 88 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M28 88 C32 80, 38 72, 42 77 C38 83, 32 87, 28 88 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M38 106 C28 104, 24 96, 28 90 C34 94, 36 100, 38 106 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M38 106 C42 98, 48 92, 52 96 C48 102, 42 105, 38 106 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M53 120 C43 120, 38 114, 42 108 C48 112, 50 116, 53 120 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M26 48 C22 38, 24 28, 30 24 C34 30, 32 40, 26 48 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M38 34 C35 27, 40 20, 48 20 C49 26, 44 32, 38 34 Z" fill="url(#emeraldWreathGrad)" />
            </g>

            {/* Right Laurel Branch */}
            <g transform="translate(140, 0) scale(-1, 1)">
              <path d="M70 128 C45 125, 20 102, 22 68 C24 45, 36 28, 52 24" stroke="url(#emeraldWreathGrad)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M22 68 C14 62, 10 50, 15 44 C20 48, 22 58, 22 68 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M22 68 C26 58, 32 50, 36 55 C32 62, 26 66, 22 68 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M28 88 C18 84, 14 74, 18 68 C24 72, 26 80, 28 88 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M28 88 C32 80, 38 72, 42 77 C38 83, 32 87, 28 88 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M38 106 C28 104, 24 96, 28 90 C34 94, 36 100, 38 106 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M38 106 C42 98, 48 92, 52 96 C48 102, 42 105, 38 106 Z" fill="url(#emeraldWreathGrad)" opacity="0.9" />
              <path d="M53 120 C43 120, 38 114, 42 108 C48 112, 50 116, 53 120 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M26 48 C22 38, 24 28, 30 24 C34 30, 32 40, 26 48 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M38 34 C35 27, 40 20, 48 20 C49 26, 44 32, 38 34 Z" fill="url(#emeraldWreathGrad)" />
            </g>

            {/* Bottom Silk Ribbon Knot */}
            <g transform="translate(62, 122)">
              <ellipse cx="8" cy="4" rx="4" ry="3" fill="url(#emeraldWreathGrad)" />
              <path d="M4 4 C-2 7, -8 12, -7 16 C-2 15, 2 8, 4 4 Z" fill="url(#emeraldWreathGrad)" />
              <path d="M12 4 C18 7, 24 12, 23 16 C18 15, 14 8, 12 4 Z" fill="url(#emeraldWreathGrad)" />
            </g>
          </svg>
        </div>
      )}

      {/* Realistic 3D Hot-Wax Stamped Disc (Emerald Velvet Tone) */}
      <div className={`${dim} rounded-full bg-gradient-to-br from-[#1E5243] via-[#12352B] to-[#0A1F18] shadow-[0_12px_32px_rgba(4,22,16,0.65),inset_0_2px_5px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.8)] flex items-center justify-center border-2 border-[#ECC880]/80 relative transition-transform duration-500 group-hover:scale-105 z-10 shrink-0`}>
        {/* Inner Debossed 24K Gold Rope Ring */}
        <div className="w-[82%] h-[82%] rounded-full border border-dashed border-[#ECC880]/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.75)] flex items-center justify-center bg-[#071F17]/95">
          <div className="w-[88%] h-[88%] rounded-full border border-[#ECC880]/40 flex items-center justify-center px-1">
            <span className={`font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#ECC880] to-[#B89045] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] whitespace-nowrap select-none shrink-0 ${fontSz}`}>
              {initials}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Royal Gilded Botanical Arch Garland
export const GildedEmeraldAcanthusFlourish: React.FC<{ side: 'left' | 'right'; className?: string }> = ({ side, className = '' }) => {
  const isRight = side === 'right';
  return (
    <div 
      className={`absolute top-0 ${isRight ? '-right-6 sm:-right-8 scale-x-[-1]' : '-left-6 sm:-left-8'} pointer-events-none z-25 w-20 sm:w-26 h-36 sm:h-46 ${className}`}
      style={{
        filter: 'drop-shadow(0 6px 14px rgba(4, 22, 16, 0.35))',
        animation: `royalBranchSway ${isRight ? '8s' : '7s'} ease-in-out infinite alternate`,
      }}
    >
      <svg viewBox="0 0 90 150" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id={`emeraldGoldLeaf_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E8" />
            <stop offset="30%" stopColor="#E5CBA0" />
            <stop offset="70%" stopColor="#ECC880" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
        </defs>
        <path d="M10 145 C18 100, 38 55, 78 12" stroke={`url(#emeraldGoldLeaf_${side})`} strokeWidth="2.8" strokeLinecap="round" />
        <g>
          <path d="M78 12 C85 6, 88 1, 90 0 C87 6, 83 14, 78 12 Z" fill={`url(#emeraldGoldLeaf_${side})`} />
          <path d="M78 12 C72 5, 65 3, 60 4 C66 7, 73 10, 78 12 Z" fill={`url(#emeraldGoldLeaf_${side})`} opacity="0.95" />
          <path d="M68 32 C78 24, 88 23, 90 26 C84 31, 74 34, 68 32 Z" fill={`url(#emeraldGoldLeaf_${side})`} />
          <path d="M68 32 C76 36, 82 43, 84 50 C78 46, 72 40, 68 32 Z" fill={`url(#emeraldGoldLeaf_${side})`} opacity="0.9" />
          <circle cx="71" cy="27" r="2.5" fill="#FFF9E8" stroke="#8C6D2B" strokeWidth="0.5" />
          <circle cx="76" cy="30" r="2" fill="#ECC880" />
        </g>
      </svg>
    </div>
  );
};

// Unified Royal Photobooth Frame Overlay (Viewfinder & Uploaded Photo Preview)
export const RoyalPhotoboothFrameOverlay: React.FC<{
  initials?: string;
  title?: string;
  hashtag?: string;
}> = ({
  initials = 'S & B',
  title = 'THE ROYAL WEDDING • STEVEN & BUNGA',
  hashtag = '#StevenBungaRoyalWedding',
}) => (
  <>
    {/* Overlaid Gold Framing */}
    <div className="absolute inset-1.5 xs:inset-2 border border-[#ECC880]/60 rounded-lg xs:rounded-xl pointer-events-none">
      <div className="absolute inset-1 border border-dashed border-[#ECC880]/40 rounded-md xs:rounded-lg pointer-events-none" />
      <EmeraldGoldCorner size={24} color="#ECC880" />
    </div>

    {/* Top Seal */}
    <div className="absolute top-2.5 xs:top-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
      <div className="w-8 h-8 xs:w-10 xs:h-10 rounded-full bg-[#041610]/85 border border-[#ECC880] shadow-[0_0_12px_rgba(236,200,128,0.7)] flex flex-col items-center justify-center">
        <Crown className="w-2.5 h-2.5 xs:w-3 xs:h-3 text-[#ECC880]" />
        <span className="font-serif font-bold text-[7px] xs:text-[8px] text-[#ECC880] leading-none">{initials}</span>
      </div>
    </div>

    {/* Bottom Watermark Overlay */}
    <div className="absolute bottom-1.5 xs:bottom-2 left-1.5 xs:left-2 right-1.5 xs:right-2 text-center pointer-events-none z-10">
      <div className="bg-[#041610]/80 backdrop-blur-xs border border-[#ECC880]/50 rounded-lg py-1 xs:py-1.5 px-1.5 xs:px-2">
        <p className="font-serif font-bold text-[8.5px] xs:text-[10px] text-[#FFF8E2] leading-tight">
          {title}
        </p>
        <p className="text-[7px] xs:text-[7.5px] font-mono text-[#ECC880] mt-0.5">
          {hashtag}
        </p>
      </div>
    </div>
  </>
);

export interface EmeraldVelvetRoyalThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: any;
  isOpening?: boolean;
  guestName?: string;
}

export const EmeraldVelvetRoyalTheme: React.FC<EmeraldVelvetRoyalThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName: propGuestName
}) => {
  const toast = useToast();

  // Couple Info & Dynamic Identifiers (Fully customizable per wedding)
  const groomName = couple?.groom_nickname || couple?.groom_name || 'Steven';
  const brideName = couple?.bride_nickname || couple?.bride_name || 'Bunga';
  const groomFullName = couple?.groom_full_name || couple?.groom_name || 'Steven Pratama, S.Kom.';
  const brideFullName = couple?.bride_full_name || couple?.bride_name || 'Bunga Citra Lestari, S.E.';
  const groomParents = couple?.groom_parents || 'Putra pertama dari Bpk. Bambang Pratama & Ibu Siti Rahayu';
  const brideParents = couple?.bride_parents || 'Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/photo-7.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/photo-4.jpg';
  const coupleInitials = `${groomName.trim().charAt(0).toUpperCase()} & ${brideName.trim().charAt(0).toUpperCase()}`;
  const photoboothTitle = `THE ROYAL WEDDING • ${groomName.trim().toUpperCase()} & ${brideName.trim().toUpperCase()}`;
  const cleanGroom = groomName.replace(/[^a-zA-Z0-9]/g, '');
  const cleanBride = brideName.replace(/[^a-zA-Z0-9]/g, '');
  const weddingHashtag = invitation?.hashtag || `#${cleanGroom}${cleanBride}RoyalWedding`;
  const safeFilenameBase = `Royal_Moments_${cleanGroom}_${cleanBride}`;

  // Only true when explicitly opened via "Demo Tema" button from landing page/catalog (?demo=true)
  const isDemo = typeof window !== 'undefined' && (
    new URLSearchParams(window.location.search).get('demo') === 'true' ||
    (invitation?.id === 'demo-theme-invitation' && !invitation?.client_id)
  );

  // VIP Barcode check-in feature: Active for 150k++ Royal Tier unless explicitly disabled
  const useBarcode = invitation?.settings?.use_barcode !== false || isDemo;

  const [activeSection, setActiveSection] = useState('cover');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'prewedding' | 'ceremony' | 'reception'>('all');
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [giftTab, setGiftTab] = useState<'transfer' | 'physical'>('transfer');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [calendarModalEvent, setCalendarModalEvent] = useState<CalendarEventData | null>(null);
  const [attireGender, setAttireGender] = useState<'gentlemen' | 'ladies'>('gentlemen');
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Royal AR Filter & Live Camera States
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
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hasCopiedHashtag, setHasCopiedHashtag] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll active nav item into center of the dock on mobile screens
  useEffect(() => {
    if (navContainerRef.current) {
      const activeEl = navContainerRef.current.querySelector(`[data-nav-id="${activeSection}"]`) as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeSection]);

  // Stop camera helper
  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  // Open Photobooth Choice Modal (Kamera / Unggah Foto)
  const openPhotoboothModal = () => {
    setIsCameraModalOpen(true);
    setPhotoboothMode('choice');
    setUploadedRawImage(null);
    setIsPreviewOpen(false);
    setSnapshotNotification(null);
    setCameraError(null);
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

  // Start camera handler with Full HD capability & facingMode support
  const startCamera = async (facing: 'user' | 'environment' = cameraFacingMode) => {
    setCameraError(null);
    setIsCameraModalOpen(true);
    setPhotoboothMode('camera');
    setUploadedRawImage(null);
    setIsPreviewOpen(false);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setCameraError('Kamera tidak didukung pada peramban ini.');
        return;
      }
      if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
      }
      
      // Request Full HD camera stream (1080p / 4K sensor capability)
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing,
            width: { min: 1080, ideal: 1920, max: 3840 },
            height: { min: 1080, ideal: 1920, max: 3840 }
          },
          audio: false
        });
      } catch {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: facing,
            width: { ideal: 1280 },
            height: { ideal: 720 }
          },
          audio: false
        });
      }
      
      setCameraStream(stream);
      setCameraFacingMode(facing);
    } catch (err: any) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Izin akses kamera belum diizinkan atau kamera tidak tersedia pada perangkat.');
    }
  };

  const toggleCameraFacingMode = () => {
    const next = cameraFacingMode === 'user' ? 'environment' : 'user';
    startCamera(next);
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
    if (isCameraModalOpen && cameraStream && videoRef.current) {
      videoRef.current.srcObject = cameraStream;
      videoRef.current.play().catch(e => console.log('Autoplay error:', e));
    }
  }, [isCameraModalOpen, cameraStream]);

  // Cleanup camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  // Draw high-resolution 24K Royal Gold Frame onto canvas context
  const drawRoyalGoldFrame = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    isTransparent = false
  ) => {
    // 1. Subtle atmospheric vignette & lighting (skip for transparent PNG sticker)
    if (!isTransparent) {
      const vignette = ctx.createRadialGradient(
        width / 2, height / 2, width * 0.35,
        width / 2, height / 2, width * 0.85
      );
      vignette.addColorStop(0, 'rgba(0, 0, 0, 0)');
      vignette.addColorStop(1, 'rgba(4, 22, 16, 0.45)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);
    }

    // Helper for rounded rectangles with fallback
    const strokeRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.stroke();
    };
    const fillRounded = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(x, y, w, h, r);
      } else {
        ctx.rect(x, y, w, h);
      }
      ctx.fill();
    };

    // Outer & Inner Gold Borders (matching the rounded border in the overlay)
    const outerMargin = Math.round(width * 0.018);
    const outerRadius = Math.round(width * 0.024);
    const innerMargin = Math.round(width * 0.032);
    const innerRadius = Math.round(width * 0.018);

    // 24K Outer Border
    ctx.strokeStyle = '#ECC880';
    ctx.lineWidth = Math.max(3, Math.round(width * 0.005));
    strokeRounded(outerMargin, outerMargin, width - outerMargin * 2, height - outerMargin * 2, outerRadius);

    // Inner Dashed Gold Border
    ctx.strokeStyle = 'rgba(236, 200, 128, 0.65)';
    ctx.lineWidth = Math.max(1.5, Math.round(width * 0.002));
    ctx.setLineDash([Math.round(width * 0.012), Math.round(width * 0.008)]);
    strokeRounded(innerMargin, innerMargin, width - innerMargin * 2, height - innerMargin * 2, innerRadius);
    ctx.setLineDash([]);

    // 2. Acanthus Corner Flourishes (Exact SVG geometry matching EmeraldGoldCorner)
    const drawAcanthusCorner = (
      originX: number,
      originY: number,
      scaleX: number,
      scaleY: number,
      size: number
    ) => {
      ctx.save();
      ctx.translate(originX, originY);
      const scale = size / 64;
      ctx.scale(scaleX * scale, scaleY * scale);

      const grad = ctx.createLinearGradient(0, 0, 64, 64);
      grad.addColorStop(0, '#FFFDF2');
      grad.addColorStop(0.35, '#ECC880');
      grad.addColorStop(0.75, '#C5A059');
      grad.addColorStop(1, '#8C6D2B');

      ctx.strokeStyle = grad;
      ctx.fillStyle = grad;
      ctx.lineCap = 'round';

      // Outer stem
      ctx.lineWidth = 1.8;
      const p1 = new Path2D('M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4');
      ctx.stroke(p1);

      // Inner parallel stem
      ctx.lineWidth = 1.0;
      ctx.globalAlpha = 0.8;
      const p2 = new Path2D('M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8');
      ctx.stroke(p2);

      // Rosette circle at (12, 12)
      ctx.globalAlpha = 1.0;
      ctx.beginPath();
      ctx.arc(12, 12, 3.2, 0, Math.PI * 2);
      ctx.fill();

      // Acanthus leaves
      ctx.globalAlpha = 0.92;
      const p3 = new Path2D('M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z');
      ctx.fill(p3);
      const p4 = new Path2D('M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z');
      ctx.fill(p4);

      // Diagonal filigree stem
      ctx.lineWidth = 1.2;
      const p5 = new Path2D('M12 12 L34 34');
      ctx.stroke(p5);

      ctx.restore();
    };

    const cornerSize = Math.round(width * 0.11);
    const cornerInset = innerMargin + Math.round(width * 0.008);

    // Top-Left
    drawAcanthusCorner(cornerInset, cornerInset, 1, 1, cornerSize);
    // Top-Right
    drawAcanthusCorner(width - cornerInset, cornerInset, -1, 1, cornerSize);
    // Bottom-Left
    drawAcanthusCorner(cornerInset, height - cornerInset, 1, -1, cornerSize);
    // Bottom-Right
    drawAcanthusCorner(width - cornerInset, height - cornerInset, -1, -1, cornerSize);

    // 3. Top Royal Monogram Medallion with Crown and S & B
    const sealX = width / 2;
    const sealY = Math.round(height * 0.075);
    const sealR = Math.round(width * 0.055);

    // Medallion background circle
    ctx.fillStyle = 'rgba(4, 22, 16, 0.88)';
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR, 0, Math.PI * 2);
    ctx.fill();

    // Medallion Gold Border
    ctx.strokeStyle = '#ECC880';
    ctx.lineWidth = Math.max(2, Math.round(width * 0.0035));
    ctx.stroke();

    // Medallion Inner Gold Ring
    ctx.strokeStyle = 'rgba(236, 200, 128, 0.55)';
    ctx.lineWidth = Math.max(1, Math.round(width * 0.0015));
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealR - Math.round(width * 0.007), 0, Math.PI * 2);
    ctx.stroke();

    // Medallion Crown Icon
    ctx.save();
    const crownW = Math.round(sealR * 0.65);
    ctx.translate(sealX - crownW / 2, sealY - Math.round(sealR * 0.55));
    const crownScale = crownW / 24;
    ctx.scale(crownScale, crownScale);
    ctx.strokeStyle = '#ECC880';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    const crownBody = new Path2D('M2 6 L5 17 L19 17 L22 6 L16 12 L12 5 L8 12 Z');
    ctx.stroke(crownBody);
    const crownBase = new Path2D('M5 20 L19 20');
    ctx.stroke(crownBase);
    ctx.restore();

    // Medallion Dynamic Initials Text
    ctx.fillStyle = '#ECC880';
    ctx.font = `bold ${Math.round(sealR * 0.42)}px "Cinzel", "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(coupleInitials, sealX, sealY + Math.round(sealR * 0.32));

    // 4. Bottom Watermark Plaque (Translucent rounded plaque matching overlay)
    const plaqueMargin = Math.round(width * 0.04);
    const plaqueW = width - (plaqueMargin * 2);
    const plaqueH = Math.round(height * 0.062);
    const plaqueX = plaqueMargin;
    const plaqueY = height - plaqueH - Math.round(height * 0.032);
    const plaqueRadius = Math.round(plaqueH * 0.22);

    // Semi-translucent dark background
    ctx.fillStyle = 'rgba(4, 22, 16, 0.82)';
    fillRounded(plaqueX, plaqueY, plaqueW, plaqueH, plaqueRadius);

    // Gold border
    ctx.strokeStyle = 'rgba(236, 200, 128, 0.55)';
    ctx.lineWidth = Math.max(1.5, Math.round(width * 0.002));
    strokeRounded(plaqueX, plaqueY, plaqueW, plaqueH, plaqueRadius);

    // Title: Dynamic Couple Title
    ctx.fillStyle = '#FFF8E2';
    ctx.font = `bold ${Math.round(plaqueH * 0.30)}px "Cinzel", "Playfair Display", Georgia, serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(photoboothTitle, width / 2, plaqueY + Math.round(plaqueH * 0.38));

    // Subtitle: Dynamic Wedding Hashtag
    ctx.fillStyle = '#ECC880';
    ctx.font = `${Math.round(plaqueH * 0.22)}px monospace, "Courier New", sans-serif`;
    ctx.fillText(weddingHashtag, width / 2, plaqueY + Math.round(plaqueH * 0.72));
  };

  // Generic composite function for both live video stream and uploaded image
  const compositePhoto = (
    source: CanvasImageSource,
    sourceW: number,
    sourceH: number,
    isMirrored: boolean
  ): string | null => {
    const canvas = canvasRef.current || document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const TARGET_W = 1440;
    const TARGET_H = 1920;
    canvas.width = TARGET_W;
    canvas.height = TARGET_H;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    const targetAspect = TARGET_W / TARGET_H;
    const sourceAspect = sourceW / sourceH;

    let sX = 0, sY = 0, sW = sourceW, sH = sourceH;
    if (sourceAspect > targetAspect) {
      sW = sourceH * targetAspect;
      sX = (sourceW - sW) / 2;
    } else {
      sH = sourceW / targetAspect;
      sY = (sourceH - sH) / 2;
    }

    ctx.save();
    if (isMirrored) {
      ctx.translate(TARGET_W, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(source, sX, sY, sW, sH, 0, 0, TARGET_W, TARGET_H);
    ctx.restore();

    drawRoyalGoldFrame(ctx, TARGET_W, TARGET_H);

    const dataUrl = canvas.toDataURL('image/png', 0.98);

    // Instant direct auto-download to device
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `${safeFilenameBase}_HD_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    return dataUrl;
  };

  // Capture snapshot to canvas in crystal-clear Full HD (1440x1920, 3:4) with Royal Gold Frame
  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    // Trigger visual shutter flash effect
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 180);

    const vW = video.videoWidth || 1080;
    const vH = video.videoHeight || 1440;
    const isMirrored = cameraFacingMode === 'user';
    const dataUrl = compositePhoto(video, vW, vH, isMirrored);
    if (!dataUrl) return;

    setCapturedSnapshot(dataUrl);
    setSnapshotNotification({ visible: true, url: dataUrl });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setSnapshotNotification(prev => prev ? { ...prev, visible: false } : null);
    }, 4500);
  };

  // Process uploaded photo from phone/device gallery with automatic gold frame & download
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessingUpload(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawUrl = event.target?.result as string;
      setUploadedRawImage(rawUrl);
      const img = new Image();
      img.onload = () => {
        const dataUrl = compositePhoto(img, img.naturalWidth, img.naturalHeight, false);
        setIsProcessingUpload(false);
        if (!dataUrl) return;

        setCapturedSnapshot(dataUrl);
        setPhotoboothMode('uploaded-preview');
        setSnapshotNotification({ visible: true, url: dataUrl });

        if (notificationTimeoutRef.current) {
          clearTimeout(notificationTimeoutRef.current);
        }
        notificationTimeoutRef.current = setTimeout(() => {
          setSnapshotNotification(prev => prev ? { ...prev, visible: false } : null);
        }, 4500);
      };
      img.onerror = () => {
        setIsProcessingUpload(false);
        toast.error('Gagal memproses file foto yang diunggah. Silakan gunakan format JPG atau PNG.');
      };
      img.src = rawUrl;
    };
    reader.onerror = () => {
      setIsProcessingUpload(false);
      toast.error('Gagal membaca file foto.');
    };
    reader.readAsDataURL(file);

    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  // Download snapshot
  const downloadSnapshot = () => {
    if (!capturedSnapshot) return;
    const a = document.createElement('a');
    a.href = capturedSnapshot;
    a.download = `${safeFilenameBase}_HD_${Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Foto HD berhasil diunduh ke galeri Anda');
  };

  // Generate & Download 1080x1920 Transparent Royal Frame PNG for Instagram Story Sticker
  const downloadRoyalFramePNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 1080, 1920);
    drawRoyalGoldFrame(ctx, 1080, 1920, true);

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `Royal_Frame_Stiker_${cleanGroom}_${cleanBride}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success('Stiker Frame Royal Emas (PNG) berhasil diunduh ke galeri!');
  };

  // Share full photo to Instagram Stories using Web Share API or download + open guide
  const sharePhotoToInstagramStory = async (imageUrl?: string) => {
    try {
      const srcToUse = imageUrl || capturedSnapshot || displayGallery[0]?.url || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=900';
      
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Draw dark background
      ctx.fillStyle = '#041610';
      ctx.fillRect(0, 0, 1080, 1920);

      // Load target image
      const img = new window.Image();
      img.crossOrigin = 'anonymous';
      img.src = srcToUse;
      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      // Draw image to fill canvas (center crop)
      const scale = Math.max(1080 / (img.naturalWidth || 1080), 1920 / (img.naturalHeight || 1920));
      const w = (img.naturalWidth || 1080) * scale;
      const h = (img.naturalHeight || 1920) * scale;
      const x = (1080 - w) / 2;
      const y = (1920 - h) / 2;
      ctx.drawImage(img, x, y, w, h);

      // If the source image is not already framed (e.g. not capturedSnapshot), draw the frame
      if (srcToUse !== capturedSnapshot) {
        drawRoyalGoldFrame(ctx, 1080, 1920);
      }

      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
      if (!blob) return;
      const file = new File([blob], `${safeFilenameBase}_Story.png`, { type: 'image/png' });

      const igGroom = invitation?.instagram_groom ? `@${invitation.instagram_groom.replace('@', '')}` : '';
      const igBride = invitation?.instagram_bride ? `@${invitation.instagram_bride.replace('@', '')}` : '';
      const shareCaption = `${weddingHashtag} ${igGroom} ${igBride}`.trim();

      // Check if Web Share API with files is supported
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `The Royal Wedding • ${groomName} & ${brideName}`,
          text: shareCaption
        });
        toast.success('Pilih Instagram Stories untuk langsung membagikan foto!');
      } else {
        // Auto-download to device and open guidance modal
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${safeFilenameBase}_Story.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        toast.success('Foto berbingkai emas telah disimpan ke galeri ponsel!');
        setIsStoryGuideOpen(true);
      }
    } catch (err: any) {
      if (err.name !== 'AbortError') {
        console.warn('Share error:', err);
        setIsStoryGuideOpen(true);
      }
    }
  };

  // Open Instagram Story Camera directly or open custom filter URL
  const handleOpenInstagramStory = () => {
    if (invitation?.ig_filter_url && invitation.ig_filter_url.startsWith('http') && !invitation.ig_filter_url.includes('628941046109988')) {
      window.open(invitation.ig_filter_url, '_blank');
      return;
    }

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = 'instagram://story-camera';
      setTimeout(() => {
        window.open('https://www.instagram.com/create/story/', '_blank');
      }, 1200);
    } else {
      window.open('https://www.instagram.com/create/story/', '_blank');
    }
  };

  const handleCopyHashtag = (tag = weddingHashtag) => {
    navigator.clipboard.writeText(tag);
    setHasCopiedHashtag(true);
    toast.success(`Hashtag ${tag} berhasil disalin!`);
    setTimeout(() => setHasCopiedHashtag(false), 2500);
  };

  // Scroll spy & real-time progress tracker
  useEffect(() => {
    const sectionIds = [
      'cover',
      'couple',
      'event',
      'dresscode',
      'concierge',
      'story',
      'gallery',
      'filter',
      'gift',
      'pass'
    ];

    const handleScroll = () => {
      // 1. Calculate scroll progress (0 - 100%)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const current = (window.scrollY / docHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }

      // 2. Active Section Spy
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
    // Run immediately on mount
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Guest Name Resolution
  const guestName = (() => {
    if (propGuestName && propGuestName.trim() !== '') return propGuestName.trim();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const to = urlParams.get('to');
      if (to && to.trim()) {
        return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
      }
    }
    return invitation?.settings?.default_guest_name || 'Tamu Undangan';
  })();

  // Default Photos fallback with bespoke royal categories
  const rawGallery = (gallery && gallery.length > 0) ? gallery : [
    { id: '1', image_url: '/photos/photo-1.jpg', caption: 'Kebersamaan & Tawa Bahagia', category: 'prewedding' },
    { id: '2', image_url: '/photos/photo-3.jpg', caption: 'Romansa Kasih Steven & Bunga', category: 'prewedding' },
    { id: '3', image_url: '/photos/photo-4.jpg', caption: 'Pesona Anggun Mempelai Putri', category: 'ceremony' },
    { id: '4', image_url: '/photos/photo-5.jpg', caption: 'Genggaman Menuju Masa Depan', category: 'reception' },
    { id: '5', image_url: '/photos/photo-6.jpg', caption: 'Senyum Bahagia Hari Sakral', category: 'ceremony' },
    { id: '6', image_url: '/photos/photo-7.jpg', caption: 'Ketulusan Hati Mempelai Pria', category: 'prewedding' },
    { id: '7', image_url: '/photos/photo-8.jpg', caption: 'Langkah Menuju Janji Suci', category: 'ceremony' },
    { id: '8', image_url: '/photos/photo-9.jpg', caption: 'Menuju Pelaminan Bahagia', category: 'reception' },
  ];

  const normalizedGallery = rawGallery.map((item: any, idx: number) => ({
    ...item,
    category: item.category || (idx % 3 === 0 ? 'prewedding' : idx % 3 === 1 ? 'ceremony' : 'reception')
  }));

  const filteredGallery = activeGalleryTab === 'all' 
    ? normalizedGallery 
    : normalizedGallery.filter((item: any) => item.category === activeGalleryTab);

  const displayGallery = filteredGallery.length > 0 ? filteredGallery : normalizedGallery;

  const safeGalleryIdx = displayGallery.length > 0 
    ? ((activeGalleryIdx % displayGallery.length) + displayGallery.length) % displayGallery.length 
    : 0;
  const currentShowcasePhoto = displayGallery[safeGalleryIdx] || displayGallery[0] || {
    image_url: '/photos/photo-3.jpg',
    caption: `Romansa Kasih ${groomName} & ${brideName}`
  };

  // Keyboard navigation for full lightbox modal
  useEffect(() => {
    if (!selectedPhoto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPhoto(null);
      } else if (e.key === 'ArrowLeft') {
        setActiveGalleryIdx((prev) => {
          const next = prev > 0 ? prev - 1 : displayGallery.length - 1;
          setSelectedPhoto(displayGallery[next]?.image_url || null);
          return next;
        });
      } else if (e.key === 'ArrowRight') {
        setActiveGalleryIdx((prev) => {
          const next = prev < displayGallery.length - 1 ? prev + 1 : 0;
          setSelectedPhoto(displayGallery[next]?.image_url || null);
          return next;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, displayGallery]);

  // Love Story default fallback
  const displayStories = (stories && stories.length > 0) ? stories : [
    {
      id: 'st-1',
      title: 'Awal Mula Pertemuan',
      date: '14 Februari 2022',
      story: 'Takdir mempertemukan kami di sebuah simposium arsitektur di Yogyakarta. Dari sekadar obrolan hangat tentang estetika, berlanjut menjadi ikatan yang tak terpisahkan.',
      image_url: '/photos/photo-1.jpg'
    },
    {
      id: 'st-2',
      title: 'Menyemai Komitmen',
      date: '20 Mei 2024',
      story: 'Setelah dua tahun saling mengenal dan membersamai dalam setiap suka dan duka, kami memutuskan untuk melangkah ke jenjang yang lebih serius.',
      image_url: '/photos/photo-5.jpg'
    },
    {
      id: 'st-3',
      title: 'Lamaran Khidmat',
      date: '10 Januari 2026',
      story: 'Di hadapan kedua keluarga besar yang kami muliakan, kami mengikat janji pertunangan dengan penuh rasa syukur dan doa tulus.',
      image_url: '/photos/photo-3.jpg'
    },
    {
      id: 'st-4',
      title: 'Menuju Pelaminan Suci',
      date: '12 Oktober 2026',
      story: 'Kini saatnya kami menyempurnakan separuh agama dalam ikatan pernikahan yang agung, dipenuhi berkah dan rahmat Allah SWT.',
      image_url: '/photos/photo-9.jpg'
    }
  ];

  // Bank Gift default fallback
  const displayGifts = (gifts && gifts.length > 0) ? gifts : [
    {
      id: 'g-1',
      bank_name: 'BCA',
      account_number: '7825 0918 22',
      account_name: 'Steven Pratama',
      qr_image: ''
    },
    {
      id: 'g-2',
      bank_name: 'Bank Mandiri',
      account_number: '138 00 2918 2011',
      account_name: 'Bunga Citra Lestari',
      qr_image: ''
    }
  ];

  // Events fallback
  const displayEvents = (events && events.length > 0) ? events : [
    {
      id: 'ev-1',
      event_type: 'Akad Nikah',
      event_name: 'Akad Nikah Suci',
      date: '2026-10-12',
      start_time: '08:00',
      end_time: '10:00',
      location: 'Grand Ballroom Sahara Hotel',
      address: 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah',
      map_url: 'https://maps.google.com'
    },
    {
      id: 'ev-2',
      event_type: 'Resepsi',
      event_name: 'Grand Royal Banquet',
      date: '2026-10-12',
      start_time: '11:00',
      end_time: '14:00',
      location: 'Grand Ballroom Sahara Hotel',
      address: 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah',
      map_url: 'https://maps.google.com'
    }
  ];

  // Countdown timer
  const weddingDateStr = invitation?.wedding_date || '2026-10-12T08:00:00+07:00';
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

  // Barcode / Check-in Pass (Persisted per guest & invitation)
  const [savedPass, setSavedPass] = useState<any>(() => {
    return loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'emerald') || null;
  });
  const [showBarcodePreview, setShowBarcodePreview] = useState(false);

  // Sync saved barcode pass whenever invitation or guestName changes
  useEffect(() => {
    if (!useBarcode) return;
    const existing = loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'emerald');
    if (existing) {
      setSavedPass(existing as any);
    }
  }, [invitation?.id, invitation?.slug, guestName, useBarcode]);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'uncertain'>('attending');
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; message: string; date: string; status: string }>>([
    {
      id: 'w-1',
      name: 'Bpk. Hendra & Ibu Ratna',
      message: 'Selamat menempuh hidup baru Steven & Bunga. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dalam limpahan berkah.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: 'w-2',
      name: 'dr. Dimas & Nadia, S.Ked',
      message: 'Happy wedding! Undangan pernikahannya luar biasa megah dan anggun. Bahagia selalu selamanya!',
      date: '1 jam yang lalu',
      status: 'attending'
    },
    {
      id: 'w-3',
      name: 'Rian Pratama & Rekan Kantor',
      message: 'Selamat berbahagia bro Steven! Lancar sampai hari H resepsi agung.',
      date: '3 jam yang lalu',
      status: 'attending'
    }
  ]);

  // Load real-time wishes & RSVP entries from database
  useEffect(() => {
    if (!invitation?.id) return;
    rsvpService.getRsvpsByInvitation(invitation.id).then(data => {
      if (data && data.length > 0) {
        setWishes(data.map((item: RSVPItem) => ({
          id: item.id,
          name: item.name,
          message: item.message || 'Semoga berbahagia selalu dalam ikatan suci pernikahan.',
          date: item.created_at ? new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }) : 'Terkonfirmasi',
          status: item.attendance || 'attending'
        })));
      }
    }).catch(err => {
      console.warn('Realtime RSVP fetch info:', err);
    });
  }, [invitation?.id]);

  const activeBarcodePass = savedPass || (showBarcodePreview ? {
    name: (rsvpName.trim() || (guestName !== 'Tamu Undangan' ? guestName : '') || 'Bpk. Muhammad Ilham'),
    attendance: rsvpStatus,
    guests: rsvpCount,
    code: generateStableBarcodeCode('ROYAL', invitation?.id || invitation?.slug || 'EMERALD', rsvpName.trim() || guestName, savedPass?.code),
    table: 'VVIP Royal Table 01'
  } : null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    toast.success('Nomor rekening berhasil disalin');
    setTimeout(() => setIsCopied(null), 2500);
  };

  const handleSavePass = () => {
    if (!activeBarcodePass) return;
    saveBarcodePass(activeBarcodePass, invitation?.id, invitation?.slug, 'emerald');
    setSavedPass(activeBarcodePass);

    // Render high-resolution authentic VIP Pass card image for phone gallery download
    try {
      const passCanvas = document.createElement('canvas');
      passCanvas.width = 720;
      passCanvas.height = 1140;
      const ctx = passCanvas.getContext('2d');
      if (ctx) {
        // 1. Rich Emerald Velvet Gradient Background
        const bgGrad = ctx.createLinearGradient(0, 0, 720, 1140);
        bgGrad.addColorStop(0, '#0c3324');
        bgGrad.addColorStop(0.5, '#072017');
        bgGrad.addColorStop(1, '#041610');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 720, 1140);

        // 2. 24K Gold Outer & Inner Frame
        ctx.strokeStyle = '#ECC880';
        ctx.lineWidth = 4;
        ctx.strokeRect(28, 28, 720 - 56, 1140 - 56);

        ctx.strokeStyle = 'rgba(236, 200, 128, 0.45)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([8, 6]);
        ctx.strokeRect(40, 40, 720 - 80, 1140 - 80);
        ctx.setLineDash([]);

        // 3. Header Monogram / Title
        ctx.fillStyle = '#ECC880';
        ctx.font = 'bold 22px "Cinzel", Georgia, serif';
        ctx.textAlign = 'center';
        ctx.fillText('ROYAL VIP ACCESS PASS', 360, 95);

        ctx.fillStyle = '#FFF8E2';
        ctx.font = 'bold 17px "Cinzel", Georgia, serif';
        ctx.fillText(photoboothTitle, 360, 130);

        // Gold divider
        ctx.strokeStyle = 'rgba(236, 200, 128, 0.6)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(160, 150);
        ctx.lineTo(560, 150);
        ctx.stroke();

        // 4. Guest Name
        ctx.fillStyle = '#ECC880';
        ctx.font = '15px "Cinzel", Georgia, serif';
        ctx.fillText('TAMU KEHORMATAN', 360, 190);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 30px "Cinzel", Georgia, serif';
        ctx.fillText(activeBarcodePass.name || 'Tamu Undangan', 360, 235);

        // Status Badge
        ctx.fillStyle = 'rgba(236, 200, 128, 0.2)';
        ctx.fillRect(200, 265, 320, 36);
        ctx.strokeStyle = '#ECC880';
        ctx.lineWidth = 1;
        ctx.strokeRect(200, 265, 320, 36);

        ctx.fillStyle = '#ECC880';
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText(`✓ Terkonfirmasi Hadir (${activeBarcodePass.guests || 1} Tamu)`, 360, 289);

        // Venue & Seating
        ctx.fillStyle = '#A0C4B4';
        ctx.font = '14px sans-serif';
        const venueText = events[0]?.location || 'Grand Ballroom Sahara Hotel • Solo';
        ctx.fillText(venueText, 360, 335);

        // Seating Box
        ctx.fillStyle = 'rgba(4, 22, 16, 0.85)';
        ctx.fillRect(110, 360, 500, 68);
        ctx.strokeStyle = 'rgba(236, 200, 128, 0.5)';
        ctx.strokeRect(110, 360, 500, 68);

        ctx.fillStyle = '#A0C4B4';
        ctx.font = '12px sans-serif';
        ctx.fillText('MEJA JAMUAN', 235, 385);
        ctx.fillText('PINTU AKSES', 485, 385);

        ctx.fillStyle = '#ECC880';
        ctx.font = 'bold 15px "Cinzel", Georgia, serif';
        ctx.fillText(activeBarcodePass.table || 'Table 01 - Emerald', 235, 412);
        ctx.fillText('Lobby Barat Valet', 485, 412);

        // QR Code Container
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(235, 455, 250, 250);
        ctx.strokeStyle = '#ECC880';
        ctx.lineWidth = 3;
        ctx.strokeRect(235, 455, 250, 250);

        // Draw QR code image from DOM if available
        const qrImgEl = document.querySelector('img[alt="QR Code Tiket"]') as HTMLImageElement;
        if (qrImgEl && qrImgEl.complete && qrImgEl.naturalWidth > 0) {
          try {
            ctx.drawImage(qrImgEl, 245, 465, 230, 230);
          } catch {}
        } else {
          ctx.fillStyle = '#103023';
          ctx.font = 'bold 15px sans-serif';
          ctx.fillText('QR CODE CHECK-IN', 360, 585);
        }

        // Linear Code-128 Barcode Graphic Box
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(170, 735, 380, 115);
        ctx.strokeStyle = '#ECC880';
        ctx.lineWidth = 2;
        ctx.strokeRect(170, 735, 380, 115);

        // Draw authentic vertical Code-128 lines
        ctx.fillStyle = '#041610';
        const barPattern = [2,1,3,1,1,2,1,3,2,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,2,1];
        let currentX = 195;
        barPattern.forEach((w, idx) => {
          if (idx % 2 === 0) {
            ctx.fillRect(currentX, 755, w * 3.0, 55);
          }
          currentX += w * 3.0 + 2.5;
        });

        ctx.fillStyle = isDemo ? '#B91C1C' : '#041610';
        ctx.font = 'bold 15px monospace';
        ctx.fillText(activeBarcodePass.code, 360, 835);

        // Instructions
        ctx.fillStyle = '#A0C4B4';
        ctx.font = 'italic 13.5px "Cinzel", Georgia, serif';
        if (isDemo) {
          ctx.fillStyle = '#F59E0B';
          ctx.fillText('🔒 BARCODE DEMO PORTOFOLIO (TERKUNCI)', 360, 890);
        } else {
          ctx.fillText('Tunjukkan Barcode atau QR Code ini kepada panitia saat tiba di lokasi.', 360, 890);
        }

        // Footer brand
        ctx.fillStyle = '#ECC880';
        ctx.font = 'bold 13.5px "Cinzel", Georgia, serif';
        ctx.fillText('WDGROUPCOMPANY • MASTERPIECE ROYAL EDITION', 360, 960);

        // Convert to downloadable image file
        const dataUrl = passCanvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        const cleanName = (activeBarcodePass.name || 'Tamu').replace(/[^a-zA-Z0-9]/g, '_');
        downloadLink.download = `Royal_VIP_Pass_${cleanName}.png`;
        downloadLink.href = dataUrl;
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    } catch (e) {
      console.warn('Canvas pass download fallback:', e);
    }

    toast.success('Tiket VIP Pass berhasil disimpan ke perangkat');
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      // 1. Submit to Supabase / database via rsvpService
      if (invitation?.id) {
        try {
          await rsvpService.submitRsvp({
            invitation_id: invitation.id,
            name: rsvpName.trim(),
            attendance: rsvpStatus === 'uncertain' ? 'maybe' : rsvpStatus,
            number_of_guests: rsvpCount,
            message: rsvpMessage.trim() || null,
            invitation_title: invitation?.title || `The Royal Wedding of ${groomName} & ${brideName}`,
            client_name: `${groomName} & ${brideName}`
          });
        } catch (dbErr) {
          console.warn('Database RSVP save info (fallback local):', dbErr);
        }
      }

      const newWish = {
        id: `w-${Date.now()}`,
        name: rsvpName.trim(),
        message: rsvpMessage.trim() || 'Semoga berbahagia selalu dalam lindungan Tuhan.',
        date: 'Baru saja',
        status: rsvpStatus
      };

      setWishes(prev => [newWish, ...prev]);

      const stableCode = generateStableBarcodeCode(
        'ROYAL',
        invitation?.id || invitation?.slug || 'EMERALD',
        rsvpName.trim(),
        savedPass?.code
      );

      const passData = {
        name: rsvpName.trim(),
        attendance: rsvpStatus,
        guests: rsvpCount,
        code: stableCode,
        table: 'VVIP Royal Table 01',
        timestamp: new Date().toISOString()
      };

      saveBarcodePass(passData, invitation?.id, invitation?.slug, 'emerald');
      setSavedPass(passData);
      setShowBarcodePreview(true);

      toast.success('Konfirmasi RSVP & Tiket VIP berhasil diterbitkan!');
      setRsvpMessage('');
    } catch {
      toast.error('Gagal mengirim RSVP, silakan coba lagi');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#041610] text-[#F5FFF9] font-sans selection:bg-[#ECC880] selection:text-[#041610] overflow-x-hidden">
      
      {/* Royal Gold Scroll Progress Bar with Travelling Diamond Star */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/40">
        <div 
          className="relative h-full bg-gradient-to-r from-[#8C6D2B] via-[#ECC880] to-[#FFFDF0] transition-all duration-150 shadow-[0_0_12px_rgba(236,200,128,0.95)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Diamond Star Glow Head at the tip of progress */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rotate-45 bg-[#FFFDF0] border border-[#ECC880] shadow-[0_0_8px_#ECC880,0_0_14px_rgba(255,255,255,0.9)] rounded-[1px]" />
        </div>
      </div>

      {/* Background Ambience & Cascading 24K Gold Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041610] via-[#08231A] to-[#041610]" />
        <GuillocheVelvetWatermark opacity={0.05} />
        <FloatingEmeraldStardust count={20} />
        <FallingEmeraldGoldParticles count={16} />
      </div>

      <style>{`
        @keyframes goldParticleDrift {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          12% { opacity: 0.95; }
          88% { opacity: 0.85; }
          100% { transform: translateY(115vh) rotate(360deg); opacity: 0; }
        }
        @keyframes starTwinkle {
          0% { transform: scale(0.7) rotate(0deg); opacity: 0.35; }
          50% { transform: scale(1.35) rotate(45deg); opacity: 1; }
          100% { transform: scale(0.7) rotate(90deg); opacity: 0.35; }
        }
        @keyframes goldFoilTumble {
          0% { transform: rotate3d(1, 1, 0, 0deg) scale(0.85); }
          50% { transform: rotate3d(1, 0.5, 1, 180deg) scale(1.2); }
          100% { transform: rotate3d(0.5, 1, 0.5, 360deg) scale(0.85); }
        }
        @keyframes royalBranchSway {
          0% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(2.2deg) translateY(-3px); }
        }
        @keyframes goldShimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          35%, 100% { transform: translateX(350%) skewX(-20deg); }
        }
        @keyframes ambientAuraPulse {
          0%, 100% { transform: scale(1); opacity: 0.15; }
          50% { transform: scale(1.18); opacity: 0.32; }
        }
        @keyframes photoAuraPulse {
          0% { box-shadow: 0 0 15px rgba(236, 200, 128, 0.4), 0 15px 35px rgba(4, 22, 16, 0.5); }
          100% { box-shadow: 0 0 35px rgba(255, 235, 175, 0.8), 0 20px 45px rgba(4, 22, 16, 0.7); }
        }
        @keyframes crestGleam {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(236, 200, 128, 0.3)); }
          50% { filter: drop-shadow(0 0 14px rgba(255, 235, 175, 0.9)); }
        }
        @keyframes royalFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes cardScanline {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 0.85; }
          100% { transform: translateY(220%); opacity: 0; }
        }
      `}</style>

      {/* DESKTOP SPLIT LAYOUT CONTAINER */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* DESKTOP LEFT ASIDE (Fixed on Large Screens) */}
        <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-6 xl:p-8 2xl:p-10 overflow-hidden bg-[#041610] border-r border-[#ECC880]/30 shadow-2xl select-none">
          {/* Background image with cinematic warm royal vignette */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ backgroundImage: `url(${couple?.cover_photo_url || couple?.cover_photo || '/photos/photo-3.jpg'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041610] via-[#041610]/75 via-55% to-[#041610]/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(4,22,16,0.6)_70%,rgba(4,22,16,0.95)_100%)] pointer-events-none" />
          
          {/* Architectural Gilded Hairline Frames & Acanthus Corner Ornaments */}
          <div className="absolute inset-3 sm:inset-4 xl:inset-5 rounded-3xl border border-[#ECC880]/30 pointer-events-none z-15" />
          <div className="absolute inset-4 sm:inset-5 xl:inset-6 rounded-2xl border border-[#ECC880]/15 pointer-events-none z-15" />
          <EmeraldGoldCorner size={40} color="#ECC880" />

          <GuillocheVelvetWatermark opacity={0.06} />
          <FloatingEmeraldStardust count={18} />

          {/* Top Aside Header Bar */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#041610]/85 backdrop-blur-md border border-[#ECC880]/50 text-[#ECC880] text-[10.5px] tracking-[0.25em] uppercase font-serif font-bold shadow-md">
              <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
              <span>THE ROYAL MASTERPIECE</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041610]/80 backdrop-blur-md border border-[#ECC880]/35 text-[#ECC880] text-[9.5px] font-serif tracking-widest uppercase shadow-xs">
              <ShieldCheck className="w-3 h-3 text-[#ECC880]" />
              <span>SULTAN EDITION</span>
            </div>
          </div>

          {/* Center Couple Profile, VIP Badge & Monogram */}
          <div className="relative z-10 my-auto text-left py-2 sm:py-3">
            {/* VIP Guest Recognition Cartouche */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-[#0d3827]/90 via-[#072318]/95 to-[#041610]/98 border border-[#ECC880]/60 shadow-lg text-white mb-2.5">
              <Crown className="w-3 h-3 text-[#ECC880]" />
              <span className="text-[10px] uppercase tracking-wider text-[#ECC880]/85 font-serif font-medium">Spesial Untuk:</span>
              <span className="text-xs font-serif font-bold text-[#FFF8E2] tracking-wide">{guestName}</span>
              <span className="text-[8px] bg-gradient-to-r from-[#ECC880] to-[#C5A059] text-[#041610] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider shadow-xs">VIP</span>
            </div>

            <EmeraldRoyalCrest initials={coupleInitials} size="md" className="!items-start mb-2.5" />
            
            <span className="text-[10.5px] font-serif uppercase tracking-[0.3em] text-[#ECC880] font-semibold block mb-1">
              THE WEDDING CELEBRATION OF
            </span>
            <h1 className="font-serif text-3xl xl:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E2] via-[#ECC880] to-[#E2C792] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
              {groomName} &amp; {brideName}
            </h1>
            
            <div className="flex items-center gap-2 text-xs xl:text-sm text-[#A0C4B4] mt-1.5 font-serif">
              <Calendar className="w-3.5 h-3.5 text-[#ECC880] shrink-0" />
              <span>Senin, 12 Oktober 2026</span>
              <span className="text-[#ECC880]/60">•</span>
              <MapPin className="w-3.5 h-3.5 text-[#ECC880] shrink-0" />
              <span>Solo, Jawa Tengah</span>
            </div>
            
            <div className="w-20 h-0.5 bg-gradient-to-r from-[#ECC880] via-[#ECC880]/60 to-transparent my-2.5 sm:my-3" />
            <p className="text-xs text-white/85 max-w-sm leading-relaxed font-light">
              Menyatukan dua insan dalam ikatan suci pernikahan berbalut tradisi luhur dan keagungan bernuansa Emerald &amp; Gold.
            </p>

            {/* Aside Live Countdown Card with Calendar & Maps Actions */}
            <div className="relative p-3.5 sm:p-4 rounded-2xl bg-gradient-to-b from-[#082319]/90 via-[#051C14]/95 to-[#041610]/98 backdrop-blur-md border border-[#ECC880]/50 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(236,200,128,0.2)] text-center max-w-sm mt-3 sm:mt-4">
              <div className="absolute inset-1 rounded-xl border border-[#ECC880]/20 pointer-events-none" />
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[9.5px] tracking-[0.25em] font-serif uppercase text-[#ECC880] font-bold flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#ECC880]" />
                  <span>HITUNG MUNDUR HARI SAKRAL</span>
                </span>
                <span className="text-[9px] text-[#A0C4B4] font-serif italic">Solo, Jateng</span>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {[
                  { label: 'HARI', val: timeLeft.days },
                  { label: 'JAM', val: timeLeft.hours },
                  { label: 'MENIT', val: timeLeft.minutes },
                  { label: 'DETIK', val: timeLeft.seconds },
                ].map((tile, idx) => (
                  <div key={idx} className="bg-gradient-to-b from-[#041610]/95 via-black/80 to-[#041610]/95 rounded-xl p-2 border border-[#ECC880]/35 text-center shadow-inner relative group hover:border-[#ECC880] transition-colors">
                    <span className="font-serif text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#ECC880] to-[#C5A059] block leading-tight">
                      {String(tile.val).padStart(2, '0')}
                    </span>
                    <span className="text-[7.5px] font-sans tracking-widest text-[#ECC880]/90 uppercase font-semibold">
                      {tile.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions for Desktop Viewers */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-[#ECC880]/20">
                <button
                  type="button"
                  onClick={() => {
                    const ev = displayEvents[0];
                    setCalendarModalEvent({
                      title: `The Wedding of ${groomName} & ${brideName}`,
                      description: `Menghadiri pernikahan suci ${groomFullName} & ${brideFullName}. ${ev?.location || 'Grand Ballroom Sahara Hotel'}.`,
                      location: ev?.location || 'Grand Ballroom Sahara Hotel, Solo',
                      eventDate: ev?.date || '2026-10-12',
                      startTime: ev?.start_time || '08:00',
                      endTime: ev?.end_time || '14:00',
                    });
                  }}
                  className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#ECC880]/15 hover:bg-[#ECC880]/25 border border-[#ECC880]/50 text-[#ECC880] text-[10px] font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Calendar className="w-3 h-3 text-[#ECC880]" />
                  <span>Simpan Tanggal</span>
                </button>

                <a
                  href={displayEvents[0]?.map_url || displayEvents[0]?.google_maps_url || 'https://maps.google.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-[#ECC880]/15 hover:bg-[#ECC880]/25 border border-[#ECC880]/50 text-[#ECC880] text-[10px] font-serif font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs active:scale-95"
                >
                  <Navigation className="w-3 h-3 text-[#ECC880]" />
                  <span>Petunjuk Arah</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Venue Footer */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#A0C4B4] pt-3 border-t border-[#ECC880]/25">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#ECC880] shrink-0" />
              <span className="font-serif text-white/90 text-[11px] sm:text-xs">Grand Ballroom Sahara Hotel</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#ECC880] shrink-0" />
              <span className="text-[#ECC880] font-serif font-bold tracking-wider text-[10px] sm:text-xs">WD Royal Masterpiece</span>
            </div>
          </div>
        </aside>

        {/* RIGHT SIDE (Scrollable Folio on Desktop, Full Width on Mobile) */}
        <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen bg-[#041610] relative z-10 px-2.5 xs:px-4 sm:px-8 xl:px-12 py-6 sm:py-8 pb-28 sm:pb-36">
        
        {/* ========================================================================= */}
        {/* 1. HERO COVER SECTION (Warm Imperial Ivory & 24K Gold Folio)            */}
        {/* ========================================================================= */}
        <section id="cover" className="relative text-center py-8 xs:py-10 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 max-w-2xl mx-auto">
            {/* Tactile Banknote Guilloché Watermark */}
            <GuillocheParchmentWatermark opacity={0.08} />

            {/* Inset Gold Dashed & Hairline Frames */}
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <div className="absolute inset-4 xs:inset-5 sm:inset-6 rounded-[18px] xs:rounded-[22px] border border-[#ECC880]/30 pointer-events-none" />

            {/* Gilded Victorian Acanthus Corners */}
            <EmeraldGoldCorner size={56} color="#ECC880" />

            {/* Gold Shimmer Sweep Light Animation */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px] xs:rounded-[32px] sm:rounded-[36px]">
              <div 
                className="absolute inset-y-0 w-36 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none -translate-x-full"
                style={{ animation: 'goldShimmerSweep 6s ease-in-out infinite' }}
              />
            </div>

            {/* 3D Sculpted Emerald & Gold Wax Seal Monogram */}
            <ScrollReveal animation="zoom-in" delay={150}>
              <div className="relative z-10 my-3 xs:my-4 sm:my-5">
                <EmeraldRoyalWaxSeal initials={coupleInitials} size="md" showWreath={true} />
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-down" delay={200}>
              <div className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.3em] uppercase font-serif font-bold shadow-xs mb-3">
                <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#C5A059] animate-pulse" />
                <span>THE ROYAL SACRED CELEBRATION</span>
                <Sparkles className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#C5A059] animate-pulse" />
              </div>
            </ScrollReveal>

            {/* Couple Arch Portrait with Flanking Gilded Botanical Flourishes */}
            <ScrollReveal animation="zoom-in" delay={250} duration={900}>
              <div className="relative w-40 h-54 xs:w-48 xs:h-64 sm:w-56 sm:h-74 mx-auto my-4 xs:my-5 z-10">
                <GildedEmeraldAcanthusFlourish side="left" />
                <GildedEmeraldAcanthusFlourish side="right" />

                <div 
                  className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] p-1 bg-gradient-to-b from-[#FFF2D6] via-[#ECC880] to-[#8C6D2B] shadow-[0_20px_50px_rgba(4,22,16,0.35)] group"
                  style={{ animation: 'photoAuraPulse 4s ease-in-out infinite alternate' }}
                >
                  <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                    <img 
                      src={couple?.cover_photo_url || couple?.cover_photo || '/photos/photo-3.jpg'} 
                      alt={`${groomName} & ${brideName}`} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/70 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#ECC880]/50 rounded-t-full rounded-b-xl pointer-events-none" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Grand Couple Headline in Rich Emerald Foil Gradient */}
            <ScrollReveal animation="fade-up" delay={300}>
              <h1 className="relative z-10 font-serif text-2xl xs:text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#1C4736] via-[#103023] to-[#081F16] drop-shadow-xs mt-3">
                {groomName} &amp; {brideName}
              </h1>

              <p className="relative z-10 font-serif italic text-xs sm:text-sm text-[#5B7569] mt-2 font-medium">
                Senin, 12 Oktober 2026 • Grand Ballroom Sahara
              </p>

              <RoyalCalligraphicDivider className="my-3 relative z-10" />
            </ScrollReveal>

            {/* VIP Guest Invitation Cartouche on Ivory */}
            <ScrollReveal animation="fade-up" delay={350}>
              <div className="relative z-10 my-4 mx-auto max-w-sm p-3.5 xs:p-4 rounded-2xl bg-[#041610]/5 border border-[#ECC880]/60 shadow-xs text-center">
                <span className="text-[9px] xs:text-[10px] tracking-widest uppercase font-serif text-[#8C6D2B] font-semibold block">
                  KEPADA YTH. BAPAK/IBU/SAUDARA/I :
                </span>
                <div className="text-base xs:text-lg font-serif font-bold text-[#103023] mt-1">
                  {guestName}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#103023] text-[#ECC880] text-[9.5px] xs:text-[10px] font-serif font-bold mt-2 border border-[#ECC880]/50 shadow-xs">
                  <Crown className="w-3 h-3 text-[#ECC880]" />
                  <span>Tamu Undangan VIP</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Opulent 24K Royal Chronometer Vault */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="relative z-10 mt-6 pt-5 border-t border-[#ECC880]/30 max-w-md mx-auto">
                <span className="text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.25em] font-serif uppercase text-[#8C6D2B] block mb-3 font-bold">
                  ✦ HITUNG MUNDUR MENUJU HARI SAKRAL ✦
                </span>
                <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-2.5">
                  {[
                    { label: 'HARI', val: timeLeft.days },
                    { label: 'JAM', val: timeLeft.hours },
                    { label: 'MENIT', val: timeLeft.minutes },
                    { label: 'DETIK', val: timeLeft.seconds },
                  ].map((tile, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-[#0C241B] via-[#071912] to-[#04120D] rounded-xl xs:rounded-2xl p-1.5 xs:p-2 sm:p-2.5 border border-[#ECC880]/60 text-center shadow-md">
                      <span className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] to-[#ECC880] block leading-tight">
                        {String(tile.val).padStart(2, '0')}
                      </span>
                      <span className="text-[7px] xs:text-[7.5px] sm:text-[8px] font-sans tracking-wider xs:tracking-widest text-[#ECC880] uppercase">
                        {tile.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

        {/* ========================================================================= */}
        {/* 2. COUPLE PRESENTATION SECTION (Royal Illuminated Diptych)               */}
        {/* ========================================================================= */}
        <section id="couple" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            {/* Gilded Bismillah Cartouche */}
            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-block my-2">
                <div className="px-4 xs:px-6 sm:px-8 py-2 xs:py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] border-2 border-[#ECC880] shadow-md flex items-center justify-center">
                  <span className="text-base xs:text-xl sm:text-2xl font-serif text-[#FFF8E2] tracking-wider xs:tracking-widest">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                </div>
              </div>
            </ScrollReveal>

            {/* Ayat Panel */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="max-w-md mx-auto my-4 xs:my-6 p-3.5 xs:p-5 rounded-2xl bg-[#041610]/5 border border-[#ECC880]/50 relative z-10">
                <p className="font-serif italic text-xs sm:text-sm text-[#15382B] leading-relaxed">
                  &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                </p>
                <span className="text-[9px] xs:text-[10px] font-serif tracking-widest text-[#8C6D2B] uppercase block mt-2 font-bold">
                  (QS. AR-RUM : 21)
                </span>
              </div>
            </ScrollReveal>

            <RoyalCalligraphicDivider className="my-3 xs:my-4 relative z-10" />

            {/* Couple Diptych Showcase */}
            <div className="space-y-5 xs:space-y-6 max-w-md mx-auto relative z-10 mt-5 xs:mt-6">
              {/* Groom Card */}
              <ScrollReveal animation="slide-left" delay={180} duration={900}>
                <div className="relative p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] text-center shadow-xl overflow-hidden hover:scale-[1.01] transition-transform">
                  <GuillocheVelvetWatermark opacity={0.06} />
                  <div 
                    className="relative w-32 h-44 xs:w-36 xs:h-48 sm:w-40 sm:h-52 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] shadow-md mb-3 xs:mb-4 p-1 bg-gradient-to-b from-[#FFF2D6] via-[#ECC880] to-[#8C6D2B]"
                    style={{ animation: 'photoAuraPulse 3.5s ease-in-out infinite alternate' }}
                  >
                    <img src={groomPhoto} alt={groomName} className="w-full h-full object-cover rounded-t-full rounded-b-xl" />
                  </div>
                  <span className="text-[9.5px] xs:text-[10px] font-serif uppercase tracking-[0.2em] xs:tracking-[0.25em] text-[#ECC880] font-bold block mb-1">
                    MEMPELAI PRIA
                  </span>
                  <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#FFF8E2]">
                    {groomFullName}
                  </h3>
                  <p className="text-xs text-[#A0C4B4] mt-1 font-sans">
                    {groomParents}
                  </p>
                  {couple?.groom_instagram && (
                    <a 
                      href={`https://instagram.com/${couple.groom_instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 xs:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-[10px] xs:text-[11px] font-sans font-bold mt-2.5 xs:mt-3 shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      <InstagramIcon size={13} />
                      <span>{couple.groom_instagram}</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>

              {/* Heart Divider */}
              <ScrollReveal animation="zoom-in" delay={220}>
                <div className="flex items-center justify-center gap-2 xs:gap-3 my-2 text-[#ECC880]">
                  <div className="w-12 xs:w-16 h-px bg-gradient-to-r from-transparent to-[#ECC880]" />
                  <Heart className="w-5 xs:w-6 h-5 xs:h-6 text-[#ECC880] fill-[#ECC880]/30 animate-pulse" />
                  <div className="w-12 xs:w-16 h-px bg-gradient-to-l from-transparent to-[#ECC880]" />
                </div>
              </ScrollReveal>

              {/* Bride Card */}
              <ScrollReveal animation="slide-right" delay={260} duration={900}>
                <div className="relative p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] text-center shadow-xl overflow-hidden hover:scale-[1.01] transition-transform">
                  <GuillocheVelvetWatermark opacity={0.06} />
                  <div 
                    className="relative w-32 h-44 xs:w-36 xs:h-48 sm:w-40 sm:h-52 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] shadow-md mb-3 xs:mb-4 p-1 bg-gradient-to-b from-[#FFF2D6] via-[#ECC880] to-[#8C6D2B]"
                    style={{ animation: 'photoAuraPulse 3.5s ease-in-out infinite alternate 1.5s' }}
                  >
                    <img src={bridePhoto} alt={brideName} className="w-full h-full object-cover rounded-t-full rounded-b-xl" />
                  </div>
                  <span className="text-[9.5px] xs:text-[10px] font-serif uppercase tracking-[0.2em] xs:tracking-[0.25em] text-[#ECC880] font-bold block mb-1">
                    MEMPELAI WANITA
                  </span>
                  <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-[#FFF8E2]">
                    {brideFullName}
                  </h3>
                  <p className="text-xs text-[#A0C4B4] mt-1 font-sans">
                    {brideParents}
                  </p>
                  {couple?.bride_instagram && (
                    <a 
                      href={`https://instagram.com/${couple.bride_instagram.replace('@', '')}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 xs:px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-[10px] xs:text-[11px] font-sans font-bold mt-2.5 xs:mt-3 shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                      <InstagramIcon size={13} />
                      <span>{couple.bride_instagram}</span>
                    </a>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </section>

        {/* ========================================================================= */}
        {/* 3. EVENT AGENDA SECTION (Royal Banquet Decree)                           */}
        {/* ========================================================================= */}
        <section id="event" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <div className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
              <Calendar className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>ROYAL BANQUET DECREE</span>
            </div>

            <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
              Rangkaian Acara Sakral
            </h2>
            <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-5 sm:mb-6 leading-relaxed">
              Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada prosesi sakral kami.
            </p>

            <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6 sm:mb-8" />

            <div className="space-y-5 xs:space-y-6 max-w-md mx-auto relative z-10">
              {displayEvents.map((ev, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 150} duration={850}>
                  <div className="p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] text-center relative overflow-hidden shadow-xl text-white">
                    <GuillocheVelvetWatermark opacity={0.06} />
                    <div className="absolute top-0 right-0 px-3 xs:px-4 py-1 rounded-bl-xl bg-[#ECC880] text-[#041610] text-[9px] xs:text-[10px] font-serif font-bold uppercase tracking-wider">
                      {ev.event_type}
                    </div>

                    <h3 className="font-serif text-lg xs:text-xl sm:text-2xl font-bold text-[#ECC880] mt-2 mb-2 xs:mb-3">
                      {ev.event_name}
                    </h3>

                    <div className="flex items-center justify-center gap-2 text-xs xs:text-sm text-[#FFF8E2] mb-1 font-serif">
                      <Calendar className="w-3.5 xs:w-4 h-3.5 xs:h-4 text-[#ECC880]" />
                      <span>{ev.date}</span>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-[11px] xs:text-xs text-[#A0C4B4] mb-3 xs:mb-4">
                      <Clock className="w-3 xs:w-3.5 h-3 xs:h-3.5 text-[#ECC880]" />
                      <span>{ev.start_time} - {ev.end_time} WIB</span>
                    </div>

                    <div className="pt-3 border-t border-[#ECC880]/20 text-[11px] xs:text-xs text-white/80 mb-4 xs:mb-5 leading-relaxed">
                      <strong className="block text-white font-serif text-xs xs:text-sm mb-1">{ev.location}</strong>
                      {ev.address}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5">
                      <a
                        href={ev.map_url || 'https://maps.google.com'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 xs:px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-[11px] xs:text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Petunjuk Lokasi Maps</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          setCalendarModalEvent({
                            title: `Pernikahan ${groomName} & ${brideName} - ${ev.event_name}`,
                            description: `Pernikahan agung ${groomFullName} & ${brideFullName} bertempat di ${ev.location}`,
                            location: `${ev.location}, ${ev.address}`,
                            eventDate: ev.date,
                            startTime: ev.start_time,
                            endTime: ev.end_time
                          });
                        }}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 xs:px-5 py-2.5 rounded-full bg-[#041610] hover:bg-[#08261C] border border-[#ECC880]/60 text-[#ECC880] text-[11px] xs:text-xs font-serif font-semibold tracking-wider uppercase transition-colors cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Simpan Kalender</span>
                      </button>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

        {/* ========================================================================= */}
        {/* ROYAL DRESS CODE & PALETTE CONCIERGE                                      */}
        {/* ========================================================================= */}
        <section id="dresscode" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            {/* Tactile Banknote Guilloché Rosette */}
            <GuillocheParchmentWatermark opacity={0.08} />

            {/* Inset Gold Dashed & Hairline Frames */}
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <div className="absolute inset-4 xs:inset-5 sm:inset-6 rounded-[18px] xs:rounded-[22px] border border-[#ECC880]/30 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Shirt className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>PANDUAN BUSANA RESMI</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Royal Attire &amp; Dress Code
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light leading-relaxed">
                Untuk menyempurnakan suasana agung pesta malam kerajaan, kami mengundang para tamu kehormatan untuk mengenakan busana bertema <strong>Royal Black Tie &amp; Emerald Velvet</strong>.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6" />
            </ScrollReveal>

            {/* Gender Tab Switcher */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="relative z-10 flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setAttireGender('gentlemen')}
                  className={`inline-flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-5 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs font-serif font-bold transition-all cursor-pointer shadow-sm ${
                    attireGender === 'gentlemen'
                      ? 'bg-gradient-to-r from-[#0C241B] to-[#041610] text-[#ECC880] border-2 border-[#ECC880]'
                      : 'bg-white/80 text-[#5B7569] border border-[#ECC880]/50 hover:text-[#103023]'
                  }`}
                >
                  <User size={14} />
                  <span>Tamu Pria (Gentlemen)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAttireGender('ladies')}
                  className={`inline-flex items-center gap-1.5 xs:gap-2 px-3.5 xs:px-5 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs font-serif font-bold transition-all cursor-pointer shadow-sm ${
                    attireGender === 'ladies'
                      ? 'bg-gradient-to-r from-[#0C241B] to-[#041610] text-[#ECC880] border-2 border-[#ECC880]'
                      : 'bg-white/80 text-[#5B7569] border border-[#ECC880]/50 hover:text-[#103023]'
                  }`}
                >
                  <Users size={14} />
                  <span>Tamu Wanita (Ladies)</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Attire Guide Card */}
            <ScrollReveal animation="fade-up" delay={200} duration={850}>
              <div className="relative z-10 p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] text-left max-w-md mx-auto shadow-xl mb-6 xs:mb-8 text-white overflow-hidden">
                <GuillocheVelvetWatermark opacity={0.06} />

                {attireGender === 'gentlemen' ? (
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center flex-shrink-0 text-[#ECC880] shadow-xs">
                        <Shirt size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs xs:text-sm font-bold text-[#FFF8E2] mb-0.5">
                          Setelan Jas Formal / Batik Tulis Sutra
                        </h4>
                        <p className="text-[11px] xs:text-xs text-[#A0C4B4] leading-relaxed">
                          Black tie tuxedo, formal suit berwarna emerald gelap atau hitam arang, atau kemeja batik tulis sutra motif klasik lengan panjang.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-[#ECC880]/20">
                      <div className="w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center flex-shrink-0 text-[#ECC880] shadow-xs">
                        <Gem size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs xs:text-sm font-bold text-[#FFF8E2] mb-0.5">
                          Aksesoris &amp; Sepatu
                        </h4>
                        <p className="text-[11px] xs:text-xs text-[#A0C4B4] leading-relaxed">
                          Dasi kupu-kupu atau dasi sutra warna emas/champagne, serta sepatu pantofel formal berbahan kulit mengkilap.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-start gap-3">
                      <div className="w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center flex-shrink-0 text-[#ECC880] shadow-xs">
                        <Shirt size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs xs:text-sm font-bold text-[#FFF8E2] mb-0.5">
                          Gaun Malam Velvet / Kebaya Mewah
                        </h4>
                        <p className="text-[11px] xs:text-xs text-[#A0C4B4] leading-relaxed">
                          Evening gown berbahan beludru (velvet) emerald, gaun satin sutra elegan, atau kebaya modern bertabur payet benang emas.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 pt-3 border-t border-[#ECC880]/20">
                      <div className="w-8 xs:w-9 h-8 xs:h-9 rounded-full bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center flex-shrink-0 text-[#ECC880] shadow-xs">
                        <Sparkles size={16} />
                      </div>
                      <div>
                        <h4 className="font-serif text-xs xs:text-sm font-bold text-[#FFF8E2] mb-0.5">
                          Aksesoris &amp; Tata Rias
                        </h4>
                        <p className="text-[11px] xs:text-xs text-[#A0C4B4] leading-relaxed">
                          Clutch bag bernuansa emas/emerald, perhiasan emas atau mutiara, serta sepatu heels atau selop pesta yang anggun.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Etiquette Alert */}
                <div className="mt-4 pt-3 border-t border-[#ECC880]/20 flex items-center gap-2.5 text-[10px] xs:text-[11px] text-[#ECC880] relative z-10">
                  <Info size={14} className="flex-shrink-0 text-[#ECC880]" />
                  <span>Dimohon tidak mengenakan busana dominan putih polos demi menghormati gaun pengantin.</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Interactive Official Color Palette Swatches */}
            <ScrollReveal animation="zoom-in" delay={250}>
              <div className="max-w-md mx-auto relative z-10">
                <span className="text-[9px] xs:text-[10px] tracking-[0.2em] font-serif uppercase text-[#8C6D2B] block mb-3 font-bold">
                  ✦ PALET WARNA RESMI PERAYAAN ✦
                </span>
                <div className="grid grid-cols-4 gap-1.5 xs:gap-2 sm:gap-2.5">
                  {[
                    { hex: '#041610', name: 'Imperial Emerald', desc: 'Warna utama beludru pekat' },
                    { hex: '#0D3B2E', name: 'Royal Pine', desc: 'Aksen hijau hutan bangsawan' },
                    { hex: '#ECC880', name: '24K Gold', desc: 'Sentuhan bordir & perhiasan' },
                    { hex: '#FDFBF7', name: 'Imperial Ivory', desc: 'Aksen sutra kemeja & mutiara' },
                  ].map((swatch, idx) => (
                    <div 
                      key={idx}
                      onClick={() => {
                        setSelectedSwatch(swatch.name);
                        toast.info(`${swatch.name} (${swatch.hex}): ${swatch.desc}`);
                      }}
                      className="cursor-pointer group flex flex-col items-center p-1.5 xs:p-2 sm:p-2.5 rounded-xl xs:rounded-2xl bg-white/90 border border-[#ECC880] hover:border-[#8C6D2B] transition-all hover:scale-105 shadow-sm"
                    >
                      <div 
                        className="w-7 h-7 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full border-2 border-[#ECC880] shadow-md mb-1.5 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: swatch.hex }}
                      />
                      <span className="font-serif text-[8.5px] xs:text-[10px] text-[#103023] font-bold block truncate max-w-full">
                        {swatch.name}
                      </span>
                      <span className="font-mono text-[7px] xs:text-[8px] text-[#8C6D2B] font-semibold">
                        {swatch.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

        {/* ========================================================================= */}
        {/* VVIP CONCIERGE & VALET SERVICE SECTION                                    */}
        {/* ========================================================================= */}
        <section id="concierge" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>FASILITAS SULTAN &amp; LAYANAN KHUSUS</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Layanan &amp; Protokol Tamu VVIP
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light leading-relaxed">
                Sebagai tamu kehormatan, Anda berhak menikmati serangkaian fasilitas eksklusif yang telah disiapkan khusus oleh keluarga kedua mempelai.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6 sm:mb-8" />
            </ScrollReveal>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-md sm:max-w-xl mx-auto mb-8 text-left">
              {/* Perk 1: Valet */}
              <ScrollReveal animation="fade-up" delay={150}>
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <GuillocheVelvetWatermark opacity={0.06} />
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center text-[#ECC880] mb-3">
                      <Car size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                      Valet Parking Gratis
                    </h4>
                    <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                      Layanan parkir valet khusus tanpa biaya di Lobby Barat. Tunjukkan tiket VIP QR Pass Anda kepada petugas.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold relative z-10">
                    ✓ Bebas Antrean Parkir
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 2: Private Table */}
              <ScrollReveal animation="fade-up" delay={250}>
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <GuillocheVelvetWatermark opacity={0.06} />
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center text-[#ECC880] mb-3">
                      <Crown size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                      Royal Table 01
                    </h4>
                    <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                      Tempat duduk sofa VIP di baris utama dengan layanan hidangan pribadi oleh waiter &amp; butler pesta.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold relative z-10">
                    ✓ Emerald Suite Table
                  </div>
                </div>
              </ScrollReveal>

              {/* Perk 3: Fast-Track QR */}
              <ScrollReveal animation="fade-up" delay={350}>
                <div className="p-4 rounded-2xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] shadow-md relative overflow-hidden flex flex-col justify-between text-white h-full">
                  <GuillocheVelvetWatermark opacity={0.06} />
                  <div className="relative z-10">
                    <div className="w-9 h-9 rounded-xl bg-[#ECC880]/20 border border-[#ECC880]/50 flex items-center justify-center text-[#ECC880] mb-3">
                      <QrCode size={18} />
                    </div>
                    <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                      Fast-Track Presensi
                    </h4>
                    <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                      Pintu masuk prioritas dengan pemindaian barcode instan untuk registrasi kehadiran dan pengantaran ke meja tamu.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold relative z-10">
                    ✓ Pintu Masuk Barat VVIP
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Concierge Action Buttons */}
            <ScrollReveal animation="fade-up" delay={400}>
              <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md"
                >
                  <Navigation size={14} />
                  <span>Rute Jalur Drop-Off VVIP</span>
                </a>
                <a
                  href={`https://wa.me/6285707909415?text=${encodeURIComponent(`Halo Concierge Wedding Steven & Bunga, saya ${guestName} ingin menanyakan info perihal kedatangan tamu VVIP.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#041610] hover:bg-[#08261C] border border-[#ECC880]/60 text-[#ECC880] text-xs font-serif font-semibold tracking-wider uppercase transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>Hubungi Concierge Tamu</span>
                </a>
              </div>
            </ScrollReveal>
          </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE LOVE STORY JOURNEY (Royal Illuminated Chronicle)            */}
        {/* ========================================================================= */}
        <section id="story" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[22px] xs:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[9px] xs:text-[10px] tracking-[0.2em] xs:tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Heart className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>OUR LOVE CHRONICLE</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Kisah Cinta &amp; Janji Abadi
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light leading-relaxed">
                Perjalanan dua jiwa yang dipertemukan takdir dan dipersatukan dalam ikatan suci pernikahan.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6 sm:mb-8" />
            </ScrollReveal>

            <div className="space-y-4 xs:space-y-6 max-w-md mx-auto text-left relative z-10">
              {displayStories.map((st, idx) => (
                <ScrollReveal key={idx} animation="fade-up" delay={idx * 140} duration={850}>
                  <div className="relative p-3.5 xs:p-5 rounded-2xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] flex flex-col sm:flex-row gap-3 xs:gap-4 items-center sm:items-start shadow-xl text-white overflow-hidden">
                    <GuillocheVelvetWatermark opacity={0.06} />

                    {st.image_url && (
                      <div className="w-20 h-20 xs:w-24 xs:h-24 rounded-xl overflow-hidden border-2 border-[#ECC880]/70 flex-shrink-0 shadow-md relative z-10">
                        <img src={st.image_url} alt={st.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="relative z-10 text-center sm:text-left">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECC880]/20 text-[9px] xs:text-[9.5px] font-serif font-bold tracking-widest text-[#ECC880] uppercase mb-1.5 border border-[#ECC880]/40">
                        <Crown size={11} className="text-[#ECC880]" />
                        <span>{st.date}</span>
                      </div>
                      <h3 className="font-serif text-sm xs:text-base font-bold text-[#FFF8E2] mb-1">
                        {st.title}
                      </h3>
                      <p className="text-[11px] xs:text-xs text-[#A0C4B4] leading-relaxed font-sans">
                        {st.story}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </section>

        {/* ========================================================================= */}
        {/* 5. PHOTO MASONRY GALLERY & FULL LIGHTBOX                                */}
        {/* ========================================================================= */}
        <section id="gallery" className="relative pt-8 xs:pt-10 sm:pt-12 pb-14 sm:pb-20 px-3 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-12 sm:mb-20 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[20px] xs:rounded-[26px] sm:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>MOMEN BAHAGIA</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Galeri Momen Berharga
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light">
                Potret kebahagiaan dan kehangatan romansa cinta kami yang terabadikan abadi.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6" />
            </ScrollReveal>

            {/* Gallery Category Tabs */}
            <ScrollReveal animation="fade-down" delay={150}>
              <div className="relative z-10 flex items-center justify-center gap-1.5 max-w-md mx-auto mb-7 flex-wrap">
                {[
                  { id: 'all', label: 'Semua', count: normalizedGallery.length },
                  { id: 'prewedding', label: 'Prewedding', count: normalizedGallery.filter((g: any) => g.category === 'prewedding').length },
                  { id: 'ceremony', label: 'Seremonial', count: normalizedGallery.filter((g: any) => g.category === 'ceremony').length },
                  { id: 'reception', label: 'Romansa', count: normalizedGallery.filter((g: any) => g.category === 'reception').length },
                ].map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveGalleryTab(tab.id as any);
                      setActiveGalleryIdx(0);
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-[11px] font-serif transition-all cursor-pointer shadow-xs inline-flex items-center gap-1.5 ${
                      activeGalleryTab === tab.id
                        ? 'bg-gradient-to-r from-[#0C241B] to-[#041610] text-[#ECC880] border-2 border-[#ECC880] font-bold shadow-md scale-102'
                        : 'bg-white/85 text-[#5B7569] border border-[#ECC880]/50 hover:text-[#103023] hover:border-[#ECC880]'
                    }`}
                  >
                    <span>{tab.label}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono ${
                      activeGalleryTab === tab.id 
                        ? 'bg-[#ECC880]/20 text-[#ECC880]' 
                        : 'bg-[#103023]/10 text-[#5B7569]'
                    }`}>
                      {tab.count}
                    </span>
                  </button>
                ))}
              </div>
            </ScrollReveal>

            {/* Royal Masterpiece Featured Showcase (Cinema Mode) */}
            <ScrollReveal animation="zoom-in" delay={180} duration={800}>
              <div className="relative max-w-xl mx-auto mb-6">
                {/* Outer Gilded Royal Frame */}
                <div className="relative p-2 sm:p-2.5 rounded-3xl bg-gradient-to-b from-[#E2C792]/50 via-[#C5A059]/30 to-[#8C6D2B]/50 border-2 border-[#ECC880] shadow-[0_20px_50px_rgba(0,0,0,0.45),0_0_30px_rgba(236,200,128,0.25)]">
                  <div className="relative rounded-2xl overflow-hidden bg-[#0A1B14] group">
                    <EmeraldGoldCorner size={40} className="pointer-events-none" />

                    {/* Top Badges Bar: Photo Counter & Quick Enlarge */}
                    <div className="absolute top-3 inset-x-3 sm:top-3.5 sm:inset-x-3.5 z-20 flex items-center justify-between pointer-events-none">
                      <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041610]/85 backdrop-blur-md border border-[#ECC880]/70 text-[#FFF8E2] text-[10px] sm:text-[11px] font-serif shadow-md">
                        <Sparkles className="w-3 h-3 text-[#ECC880] animate-pulse" />
                        <span>Foto {safeGalleryIdx + 1} dari {displayGallery.length}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedPhoto(currentShowcasePhoto.image_url)}
                        className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#041610]/85 hover:bg-[#ECC880] backdrop-blur-md border border-[#ECC880]/70 text-[#FFF8E2] hover:text-[#041610] text-[10px] sm:text-[11px] font-serif transition-all shadow-md group/zoom cursor-pointer"
                        title="Lihat Layar Penuh"
                      >
                        <Maximize2 className="w-3 h-3 text-[#ECC880] group-hover/zoom:text-[#041610] transition-colors" />
                        <span className="hidden sm:inline font-medium">Perbesar</span>
                      </button>
                    </div>

                    {/* Main Showcase Image */}
                    <div 
                      onClick={() => setSelectedPhoto(currentShowcasePhoto.image_url)}
                      className="relative aspect-[16/10] sm:aspect-[16/9] w-full cursor-pointer overflow-hidden flex items-center justify-center bg-black/40"
                    >
                      <img 
                        key={currentShowcasePhoto.id || safeGalleryIdx}
                        src={currentShowcasePhoto.image_url} 
                        alt={currentShowcasePhoto.caption || `Galeri ${safeGalleryIdx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/95 via-[#041610]/30 to-black/30 pointer-events-none" />
                    </div>

                    {/* Navigation Arrow: Prev */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIdx(prev => (prev > 0 ? prev - 1 : displayGallery.length - 1));
                      }}
                      aria-label="Foto Sebelumnya"
                      className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#041610]/85 hover:bg-[#ECC880] backdrop-blur-md border border-[#ECC880]/80 text-[#FFF8E2] hover:text-[#041610] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 z-20 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>

                    {/* Navigation Arrow: Next */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveGalleryIdx(prev => (prev < displayGallery.length - 1 ? prev + 1 : 0));
                      }}
                      aria-label="Foto Selanjutnya"
                      className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#041610]/85 hover:bg-[#ECC880] backdrop-blur-md border border-[#ECC880]/80 text-[#FFF8E2] hover:text-[#041610] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 z-20 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>

                    {/* Gilded Caption Overlay Banner */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#041610] via-[#041610]/85 to-transparent pt-7 pb-3 px-4 text-center pointer-events-none">
                      <p className="font-serif text-xs sm:text-sm text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF2] via-[#ECC880] to-[#E2C792] font-semibold tracking-wide">
                        ✦ {currentShowcasePhoto.caption || `Romansa Kasih ${groomName} & ${brideName}`} ✦
                      </p>
                      <p className="text-[10px] text-[#ECC880]/70 tracking-widest uppercase font-serif mt-0.5">
                        Ketuk foto untuk melihat layar penuh
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Horizontal Filmstrip Ribbon */}
            <div className="relative z-10 max-w-xl mx-auto mb-8">
              <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-2.5 py-1 px-1 overflow-x-auto no-scrollbar scroll-smooth">
                {displayGallery.map((item: any, idx: number) => {
                  const isActive = idx === safeGalleryIdx;
                  return (
                    <button
                      key={item.id || idx}
                      type="button"
                      onClick={() => setActiveGalleryIdx(idx)}
                      className={`relative flex-shrink-0 w-13 h-16 sm:w-15 sm:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                        isActive
                          ? 'border-2 border-[#ECC880] scale-105 shadow-[0_0_14px_rgba(236,200,128,0.7)] ring-2 ring-[#ECC880]/60 opacity-100 z-10'
                          : 'border border-[#ECC880]/50 opacity-60 hover:opacity-100 hover:border-[#ECC880] hover:scale-102'
                      }`}
                    >
                      <img 
                        src={item.image_url} 
                        alt={item.caption || `Thumbnail ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-[#ECC880]/15 pointer-events-none ring-1 ring-inset ring-[#ECC880]" />
                      )}
                      <div className="absolute bottom-1 right-1 px-1 rounded bg-[#041610]/80 text-[8px] sm:text-[9px] font-mono text-[#ECC880] leading-tight">
                        {idx + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Full Gilded Photo Mosaic Grid */}
            <div className="relative z-10 max-w-lg mx-auto mb-4 flex items-center justify-between text-left px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ECC880]" />
                <h3 className="font-serif text-xs sm:text-sm font-bold text-[#103023] uppercase tracking-wider">
                  Koleksi Potret Terpilih
                </h3>
              </div>
              <span className="text-[10px] font-serif text-[#8C6D2B] bg-[#041610]/5 px-2.5 py-0.5 rounded-full border border-[#ECC880]/40">
                {displayGallery.length} Potret
              </span>
            </div>

            {/* Balanced 2-Column Photo Grid (Uniform Aspect Ratio, Zero Gaps) */}
            <div className="relative z-10 grid grid-cols-2 gap-2 xs:gap-3 sm:gap-3.5 max-w-lg mx-auto">
              {displayGallery.map((img: any, idx: number) => {
                const isSelected = idx === safeGalleryIdx;
                return (
                  <ScrollReveal key={img.id || idx} animation="zoom-in" delay={(idx % 4) * 70} duration={600}>
                    <div 
                      onClick={() => {
                        setActiveGalleryIdx(idx);
                        setSelectedPhoto(img.image_url);
                      }}
                      className={`relative group rounded-2xl overflow-hidden border-2 cursor-pointer shadow-md transition-all duration-300 aspect-[4/5] ${
                        isSelected
                          ? 'border-[#ECC880] ring-2 ring-[#ECC880]/70 shadow-[0_4px_20px_rgba(236,200,128,0.4)]'
                          : 'border-[#ECC880]/70 hover:border-[#ECC880] hover:shadow-lg'
                      }`}
                    >
                      <img 
                        src={img.image_url} 
                        alt={img.caption || `Galeri ${idx + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Permanent Gilded Footnote Bar */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#041610]/95 via-[#041610]/60 to-transparent pt-6 pb-2.5 px-2.5 text-left flex items-end justify-between">
                        <div className="min-w-0 pr-1">
                          <p className="text-[10px] sm:text-xs text-[#FFF8E2] font-serif italic truncate">
                            {img.caption || 'Steven & Bunga'}
                          </p>
                          <span className="text-[9px] text-[#ECC880]/80 font-serif uppercase tracking-wider block">
                            {img.category === 'prewedding' ? 'Prewedding' : img.category === 'ceremony' ? 'Seremonial' : 'Romansa'}
                          </span>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-[#ECC880]/20 flex items-center justify-center flex-shrink-0 text-[#ECC880] opacity-80 group-hover:opacity-100 group-hover:bg-[#ECC880] group-hover:text-[#041610] transition-all">
                          <Maximize2 className="w-2.5 h-2.5" />
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </section>

        {/* ========================================================================= */}
        {/* ROYAL AR FILTER & INSTAGRAM STORY MOMENTS                                */}
        {/* ========================================================================= */}
        <section id="filter" className="relative pt-8 xs:pt-10 sm:pt-12 pb-12 xs:pb-16 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-12 sm:mb-20 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[20px] xs:rounded-[26px] sm:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>EXCLUSIVE AR EXPERIENCE</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Filter Instagram &amp; Momen Royal
              </h2>

              <p className="relative z-10 text-xs sm:text-sm text-[#5B7569] max-w-lg mx-auto mb-4 font-light leading-relaxed">
                Abadikan momen kebahagiaan Anda bersama kami menggunakan filter story Instagram eksklusif berbingkai emas 24K Royal Emerald khas {groomName} &amp; {brideName}.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-8" />
            </ScrollReveal>

            {/* Interactive AR Viewport & Experience Showcase */}
            <div className="relative z-10 max-w-xl mx-auto space-y-8">
              {/* Luxury Smartphone Mockup with Simulated Royal Lens */}
              <ScrollReveal animation="zoom-in" delay={200}>
                <div className="relative mx-auto max-w-[240px] xs:max-w-[270px] sm:max-w-[300px]">
                  {/* Smartphone Body / Chassis */}
                  <div className="relative rounded-[40px] p-3 sm:p-3.5 bg-gradient-to-b from-[#152a20] via-[#041610] to-[#010906] border-2 border-[#ECC880] shadow-[0_20px_50px_rgba(0,0,0,0.75),0_0_35px_rgba(236,200,128,0.35)]">
                    {/* Speaker & Dynamic Notch */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#041610] border border-[#ECC880]/40 rounded-full z-20 flex items-center justify-center gap-2 px-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#102419] border border-[#ECC880]/50" />
                      <div className="w-8 h-1 rounded-full bg-[#ECC880]/30" />
                    </div>

                    {/* Viewport Screen with Royal Lens Frame */}
                    <div className="relative aspect-[9/16] rounded-[28px] overflow-hidden bg-[#041610] border border-[#ECC880]/60 shadow-inner group">
                      {/* Background Couple Photo */}
                      <img 
                        src={displayGallery[0]?.url || 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&q=80&w=900'} 
                        alt="Royal Filter Lens Preview" 
                        className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] group-hover:scale-105 transition-transform duration-700" 
                      />

                      {/* AR Viewport Shading Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/90 via-transparent to-[#041610]/70 pointer-events-none" />

                      {/* AR HUD: Camera Status Bars */}
                      <div className="absolute top-7 left-3 right-3 flex items-center justify-between text-[8px] font-mono tracking-wider text-[#ECC880] z-10 pointer-events-none">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#041610]/70 backdrop-blur-xs border border-[#ECC880]/50">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          <span className="font-bold">REC 4K</span>
                        </div>
                        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#041610]/70 backdrop-blur-xs border border-[#ECC880]/50">
                          <Sparkles className="w-2.5 h-2.5 text-[#ECC880]" />
                          <span>ROYAL AR LENS</span>
                        </div>
                      </div>

                      {/* Bespoke Royal Frame Overlay: Acanthus Corners */}
                      <div className="absolute inset-2 border border-[#ECC880]/60 rounded-[20px] pointer-events-none">
                        <EmeraldGoldCorner size={28} color="#ECC880" />
                      </div>

                      {/* Golden Twinkling Sparkles in Lens */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute top-1/4 left-5 w-1.5 h-1.5 bg-[#FFF2B2] rounded-full shadow-[0_0_8px_#ECC880] animate-pulse" />
                        <div className="absolute top-1/3 right-6 w-2 h-2 bg-[#FFF2B2] rounded-full shadow-[0_0_10px_#ECC880] animate-pulse delay-300" />
                        <div className="absolute bottom-1/3 left-8 w-1 h-1 bg-[#FFF2B2] rounded-full shadow-[0_0_6px_#ECC880] animate-pulse delay-700" />
                      </div>

                      {/* Viewfinder Center Crosshair Reticle */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                        <div className="w-10 h-10 border border-[#ECC880]/80 rounded-full flex items-center justify-center">
                          <div className="w-2 h-0.5 bg-[#ECC880]" />
                        </div>
                      </div>

                      {/* Royal Top Crown Monogram Medallion */}
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 text-center pointer-events-none">
                        <div className="w-12 h-12 mx-auto rounded-full bg-[#041610]/85 border-2 border-[#ECC880] shadow-[0_0_15px_rgba(236,200,128,0.6)] flex flex-col items-center justify-center p-1 backdrop-blur-xs">
                          <Crown className="w-3.5 h-3.5 text-[#ECC880] mb-0.5" />
                          <span className="font-serif font-bold text-[9px] text-[#ECC880] tracking-widest leading-none">{coupleInitials}</span>
                        </div>
                      </div>

                      {/* Bottom Story Filter Caption & Watermark */}
                      <div className="absolute bottom-3 left-3 right-3 text-center z-10 pointer-events-none">
                        <div className="bg-[#041610]/85 backdrop-blur-md border border-[#ECC880]/60 rounded-xl p-2.5 shadow-lg">
                          <p className="font-serif font-bold text-[11px] text-[#FFF8E2] tracking-wider leading-snug">
                            {groomName.toUpperCase()} &amp; {brideName.toUpperCase()}
                          </p>
                          <p className="text-[8px] font-serif text-[#ECC880] tracking-widest uppercase mt-0.5">
                            {events[0]?.date || 'Senin, 12 Oktober 2026'}
                          </p>
                          <div className="mt-1.5 pt-1.5 border-t border-[#ECC880]/30 inline-block px-2">
                            <span className="text-[8px] font-mono text-[#ECC880] font-semibold">
                              {weddingHashtag}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Action Buttons, Sticker Downloader & Hashtag Copier */}
              <ScrollReveal animation="fade-up" delay={300}>
                <div className="space-y-3.5 max-w-md mx-auto">
                  {/* Primary CTA: Buka Royal Photobooth (Kamera & Galeri) */}
                  <button
                    type="button"
                    onClick={openPhotoboothModal}
                    className="w-full py-3.5 sm:py-4 px-6 rounded-2xl bg-gradient-to-r from-[#C5A059] via-[#ECC880] to-[#D4AF37] text-[#041610] font-serif font-bold text-sm sm:text-base tracking-wide shadow-[0_10px_30px_rgba(236,200,128,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Camera className="w-5 h-5 text-[#041610]" />
                    <span>Buka Royal Photobooth (Kamera &amp; Galeri)</span>
                    <Sparkles className="w-4 h-4 text-[#041610]" />
                  </button>

                  {/* Secondary Action: Unduh Stiker Frame Emas (PNG Transparan) */}
                  <button
                    type="button"
                    onClick={downloadRoyalFramePNG}
                    className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FAF6ED] to-[#F3ECE0] hover:from-[#F3ECE0] hover:to-[#EAE0D0] border border-[#ECC880] text-[#103023] font-serif font-semibold text-xs sm:text-sm tracking-wide shadow-xs hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#8C6D2B]" />
                    <span>Unduh Stiker Frame Emas (PNG Transparan)</span>
                  </button>

                  {/* Direct Guide Trigger Button */}
                  <button
                    type="button"
                    onClick={() => setIsStoryGuideOpen(true)}
                    className="w-full py-2 px-3 text-[11px] sm:text-xs text-[#8C6D2B] hover:text-[#103023] font-serif inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="underline underline-offset-2">Foto belum muncul di Instagram? Baca panduan cara pasang</span>
                  </button>

                  {/* Official Wedding Hashtag & Copy Card */}
                  <div className="p-4 rounded-2xl bg-[#041610]/5 border border-[#ECC880]/60 backdrop-blur-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
                    <div className="text-center sm:text-left">
                      <span className="text-[10px] font-serif uppercase tracking-widest text-[#8C6D2B] font-bold block mb-0.5">
                        Official Wedding Hashtag
                      </span>
                      <p className="font-mono font-bold text-xs sm:text-sm text-[#103023]">
                        {weddingHashtag}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyHashtag(weddingHashtag)}
                      className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#041610] text-[#ECC880] border border-[#ECC880]/60 hover:bg-[#ECC880] hover:text-[#041610] text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {hasCopiedHashtag ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Salin Hashtag</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </section>

        {/* ========================================================================= */}
        {/* 6. WEDDING GIFT & EMV SMART DEBIT CARD                                   */}
        {/* ========================================================================= */}
        <section id="gift" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[20px] xs:rounded-[26px] sm:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Gift className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>TANDA KASIH &amp; KADO DIGITAL</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Amplop Digital &amp; Hadiah
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda hendak memberikan tanda kasih, dapat melalui rekening eksklusif di bawah ini.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6" />
            </ScrollReveal>

            {/* Tab Selector */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="relative z-10 flex items-center justify-center gap-1.5 xs:gap-2 mb-6 xs:mb-8 flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={() => setGiftTab('transfer')}
                  className={`inline-flex items-center gap-1.5 px-3.5 xs:px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer shadow-xs ${
                    giftTab === 'transfer'
                      ? 'bg-gradient-to-r from-[#0C241B] to-[#041610] text-[#ECC880] border-2 border-[#ECC880] font-bold'
                      : 'bg-white/80 text-[#5B7569] border border-[#ECC880]/50 hover:text-[#103023]'
                  }`}
                >
                  <CreditCard size={14} />
                  <span>Transfer Bank &amp; QRIS</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGiftTab('physical')}
                  className={`inline-flex items-center gap-1.5 px-3.5 xs:px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer shadow-xs ${
                    giftTab === 'physical'
                      ? 'bg-gradient-to-r from-[#0C241B] to-[#041610] text-[#ECC880] border-2 border-[#ECC880] font-bold'
                      : 'bg-white/80 text-[#5B7569] border border-[#ECC880]/50 hover:text-[#103023]'
                  }`}
                >
                  <Package size={14} />
                  <span>Kirim Kado Fisik</span>
                </button>
              </div>
            </ScrollReveal>

            {giftTab === 'transfer' ? (
              <div className="space-y-4 xs:space-y-6 max-w-sm mx-auto relative z-10">
                {displayGifts.map((gift, idx) => (
                  <ScrollReveal key={idx} animation="zoom-in" delay={idx * 150} duration={850}>
                    <div className="relative p-4 xs:p-5 sm:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-br from-[#0c3324] via-[#08261a] to-[#041610] border-2 border-[#ECC880] shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(236,200,128,0.25)] text-left overflow-hidden text-white hover:scale-[1.02] transition-transform">
                      <GuillocheVelvetWatermark opacity={0.08} />

                      {/* Header Card: Bank & Chip */}
                      <div className="flex items-center justify-between mb-4 xs:mb-6 relative z-10">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base xs:text-lg tracking-wider text-[#FFF8E2]">
                            {gift.bank_name}
                          </span>
                          <span className="text-[8.5px] xs:text-[9px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#ECC880]/20 text-[#ECC880] border border-[#ECC880]/40">
                            PRIORITY
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Wifi size={16} className="text-[#ECC880] rotate-90 opacity-80" />
                          <EMVGoldSmartChip />
                        </div>
                      </div>

                      {/* Card Number */}
                      <div className="mb-3 xs:mb-4 relative z-10">
                        <span className="text-[9px] xs:text-[10px] font-serif uppercase tracking-widest text-[#ECC880]/80 block">
                          NOMOR REKENING PRIORITAS
                        </span>
                        <div className="font-mono text-base xs:text-lg sm:text-2xl font-bold tracking-wider xs:tracking-widest text-[#FFF8E2] mt-0.5 truncate">
                          {gift.account_number}
                        </div>
                      </div>

                      {/* Card Holder & Copy Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-[#ECC880]/20 relative z-10">
                        <div>
                          <span className="text-[9px] font-sans uppercase tracking-wider text-[#A0C4B4] block">
                            ATAS NAMA
                          </span>
                          <span className="font-serif text-xs font-semibold text-white">
                            {gift.account_name}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopy(gift.account_number.replace(/\s+/g, ''), gift.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-[11px] font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                        >
                          {isCopied === gift.id ? (
                            <>
                              <Check size={12} className="text-[#041610]" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} className="text-[#041610]" />
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
                <div className="relative z-10 p-4 xs:p-6 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] max-w-sm mx-auto text-center shadow-xl text-white">
                  <Package className="w-8 h-8 text-[#ECC880] mx-auto mb-3" />
                  <h4 className="font-serif text-base font-bold text-[#FFF8E2] mb-1">
                    Alamat Kirim Hadiah Fisik
                  </h4>
                  <p className="text-xs text-[#A0C4B4] leading-relaxed mb-4 font-sans">
                    {couple?.gift_address || 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah (Kediaman Mempelai)'}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(couple?.gift_address || 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah', 'addr')}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all cursor-pointer shadow-md"
                  >
                    {isCopied === 'addr' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{isCopied === 'addr' ? 'Alamat Tersalin' : 'Salin Alamat Lengkap'}</span>
                  </button>
                </div>
              </ScrollReveal>
            )}
          </section>

        {/* ========================================================================= */}
        {/* 7. VIP GUEST CHECK-IN PASS & RSVP LIVE WISHES                           */}
        {/* ========================================================================= */}
        <section id="pass" className="relative py-8 xs:py-10 sm:py-12 px-3.5 xs:px-5 sm:px-8 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.7),0_0_50px_rgba(236,200,128,0.35)] overflow-hidden mb-10 sm:mb-14 text-center max-w-2xl mx-auto">
            <GuillocheParchmentWatermark opacity={0.08} />
            <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[20px] xs:rounded-[26px] sm:rounded-[28px] border-2 border-dashed border-[#ECC880]/50 pointer-events-none" />
            <EmeraldGoldCorner size={56} color="#ECC880" />

            <ScrollReveal animation="fade-down" delay={100}>
              <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/10 border border-[#ECC880]/70 text-[#8C6D2B] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-xs mb-3">
                <Barcode className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>VIP PASS &amp; PRESENSI BARCODE / QR</span>
              </div>

              <h2 className="relative z-10 font-serif text-2xl sm:text-4xl font-bold text-[#103023] mb-2">
                Konfirmasi Kehadiran &amp; Tiket VIP
              </h2>

              <p className="relative z-10 text-xs text-[#5B7569] max-w-md mx-auto mb-4 font-light">
                Sistem otomatis menerbitkan <strong>Tiket Barcode &amp; QR Resmi</strong> untuk discan petugas saat tiba di lokasi resepsi.
              </p>

              <RoyalCalligraphicDivider className="my-2 relative z-10 mb-6" />
            </ScrollReveal>

            {/* Toggle View Pass Ticket */}
            <ScrollReveal animation="fade-up" delay={150}>
              <div className="mb-6 relative z-10">
                <button
                  type="button"
                  onClick={() => setShowBarcodePreview(prev => !prev)}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-[#041610] hover:bg-[#08261C] text-[#ECC880] border border-[#ECC880]/60 transition-colors cursor-pointer shadow-md"
                >
                  <Barcode size={14} />
                  <span>{activeBarcodePass ? (showBarcodePreview && !savedPass ? 'Tutup Tiket' : 'Tampilkan Tiket Barcode VIP') : 'Lihat Contoh Barcode VIP'}</span>
                </button>
              </div>
            </ScrollReveal>

            {/* VIP GUEST VERIFIED PASS CARD */}
            {activeBarcodePass && (
              <ScrollReveal animation="zoom-in" delay={180} duration={850}>
                <div className="relative bg-gradient-to-br from-[#0c3324] via-[#072017] to-[#041610] text-white p-4 xs:p-6 sm:p-8 rounded-2xl xs:rounded-[32px] border-2 border-[#ECC880] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(236,200,128,0.35)] mb-8 xs:mb-10 text-center overflow-hidden max-w-sm mx-auto z-10">
                  <EmeraldGoldCorner size={28} color="#ECC880" />
                  <GuillocheVelvetWatermark opacity={0.09} />

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECC880]/20 text-[10px] text-[#ECC880] mb-3 border border-[#ECC880]/50">
                    <Crown size={12} className="text-[#ECC880]" />
                    <span className="font-serif tracking-widest font-bold uppercase">
                      ROYAL VIP ACCESS PASS
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-white mb-1">
                    {activeBarcodePass.name}
                  </h3>

                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-sans font-semibold my-2 bg-emerald-950/90 text-emerald-200 border border-emerald-400/50">
                    <span>✓ Terkonfirmasi Hadir ({activeBarcodePass.guests || 1} Tamu)</span>
                  </div>

                  <p className="text-[11px] text-[#ECC880] mb-3 font-serif">
                    {events[0]?.location || 'Grand Ballroom Sahara Hotel • Solo'}
                  </p>

                  {/* Sultan VVIP Seating & Gate Info */}
                  <div className="grid grid-cols-2 gap-2 my-3 max-w-xs mx-auto text-left">
                    <div className="p-2 rounded-xl bg-[#041610]/80 border border-[#ECC880]/30 shadow-inner">
                      <span className="text-[8px] text-[#A0C4B4] block uppercase font-sans">Meja Jamuan</span>
                      <span className="text-[11px] font-serif font-bold text-[#ECC880] truncate block">{activeBarcodePass.table || 'Table 01 - Emerald'}</span>
                    </div>
                    <div className="p-2 rounded-xl bg-[#041610]/80 border border-[#ECC880]/30 shadow-inner">
                      <span className="text-[8px] text-[#A0C4B4] block uppercase font-sans">Pintu Akses</span>
                      <span className="text-[11px] font-serif font-bold text-[#ECC880] truncate block">Lobby Barat Valet</span>
                    </div>
                  </div>

                  {/* QR Code Graphic with Laser Scanline Animation */}
                  <div className="relative w-28 h-28 xs:w-36 xs:h-36 mx-auto bg-white p-2 rounded-2xl border-2 border-[#ECC880] shadow-md flex items-center justify-center my-3 overflow-hidden">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`INV:${invitation?.id || 'EMERALD'}|GUEST:${activeBarcodePass.name}|ATT:attending|CODE:${activeBarcodePass.code}`)}`}
                      alt="QR Code Tiket"
                      className="w-full h-full object-contain"
                    />
                    {/* Laser Scanline */}
                    <div 
                      className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent pointer-events-none"
                      style={{ animation: 'cardScanline 2.5s ease-in-out infinite' }}
                    />
                  </div>

                  {/* Authentic Linear Barcode Graphic (Code-128 Vertical SVG Bars) */}
                  <div className="relative my-2.5 px-3 py-2 bg-white rounded-xl border-2 border-[#ECC880]/70 flex flex-col items-center shadow-md overflow-hidden">
                    <svg viewBox="0 0 160 32" className="w-full max-w-[210px] h-9 text-[#041610]" preserveAspectRatio="none">
                      {[2,1,3,1,1,2,1,3,2,1,2,3,1,1,2,1,3,1,2,1,1,3,2,1,1,2,3,1,2,1,3,1,1,2,1,2,3,1,1,2,1,3,2,1].map((w, idx) => (
                        idx % 2 === 0 ? <rect key={idx} x={idx * 3.6} y="0" width={w} height="32" fill="currentColor" /> : null
                      ))}
                    </svg>
                    <span className={`font-mono font-bold text-xs tracking-[0.25em] ${isDemo ? 'text-red-700 line-through' : 'text-[#041610]'} mt-1`}>
                      {activeBarcodePass.code}
                    </span>
                    {isDemo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none">
                        <span className="bg-amber-600/95 text-white font-bold text-[9px] px-2.5 py-0.5 rounded tracking-widest uppercase shadow">
                          BARCODE DEMO (TERKUNCI)
                        </span>
                      </div>
                    )}
                  </div>

                  {isDemo ? (
                    <div className="bg-[#041610]/90 border border-amber-400/50 rounded-xl p-2.5 my-2.5 text-center text-white">
                      <p className="text-[11px] font-serif font-bold text-amber-300">
                        🔒 Barcode Demo Portofolio (Terkunci)
                      </p>
                      <p className="text-[10px] text-[#A0C4B4] mt-0.5 leading-normal">
                        Barcode &amp; QR ini terkunci khusus demo portofolio dan tidak dapat di-scan untuk presensi tamu sungguhan.
                      </p>
                    </div>
                  ) : (
                    <p className="text-[10.5px] text-[#A0C4B4] italic leading-snug my-2.5 max-w-[270px] mx-auto font-serif">
                      Tunjukkan Barcode atau QR Code ini kepada panitia saat tiba di lokasi resepsi agung.
                    </p>
                  )}

                  <div className="flex flex-col items-center gap-2.5 mt-3">
                    <button
                      type="button"
                      onClick={handleSavePass}
                      className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                      <Download size={14} />
                      <span>Simpan Tiket ke Galeri</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSavedPass(null);
                        clearBarcodePass(invitation?.id, invitation?.slug, activeBarcodePass?.name || guestName, 'emerald');
                        setShowBarcodePreview(false);
                      }}
                      className="inline-block text-[11px] text-[#ECC880] hover:underline font-serif font-semibold cursor-pointer"
                    >
                      ← Ubah Konfirmasi Kehadiran
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            )}

            {/* RSVP Submission Form */}
            <ScrollReveal animation="fade-up" delay={200} duration={850}>
              <form onSubmit={handleRsvpSubmit} className="relative z-10 max-w-md mx-auto p-4 xs:p-6 sm:p-7 rounded-2xl xs:rounded-3xl bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] text-left shadow-xl text-white">
                <h4 className="font-serif text-lg font-bold text-[#FFF8E2] text-center mb-4">
                  Formulir RSVP Kehadiran
                </h4>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#ECC880] block mb-1">
                    Nama Lengkap Anda
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={e => setRsvpName(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880]"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#ECC880] block mb-1">
                    Konfirmasi Kehadiran
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 xs:gap-2">
                    {[
                      { id: 'attending', label: 'Hadir' },
                      { id: 'uncertain', label: 'Ragu-ragu' },
                      { id: 'not_attending', label: 'Berhalangan' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setRsvpStatus(opt.id as any)}
                        className={`py-2 px-1 xs:px-2 rounded-xl text-[10px] xs:text-xs font-serif transition-all cursor-pointer ${
                          rsvpStatus === opt.id
                            ? 'bg-[#ECC880] text-[#041610] font-bold shadow-xs'
                            : 'bg-[#041610] text-[#A0C4B4] border border-[#ECC880]/30'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-xs font-serif text-[#ECC880] block mb-1">
                    Jumlah Tamu Hadir
                  </label>
                  <select
                    value={rsvpCount}
                    onChange={e => setRsvpCount(Number(e.target.value))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880]"
                  >
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                    <option value={4}>4 Orang</option>
                  </select>
                </div>

                <div className="mb-5">
                  <label className="text-xs font-serif text-[#ECC880] block mb-1">
                    Ucapan Doa &amp; Harapan
                  </label>
                  <textarea
                    rows={3}
                    value={rsvpMessage}
                    onChange={e => setRsvpMessage(e.target.value)}
                    placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-[#ECC880] to-[#D4AF37] hover:brightness-110 text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
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

            {/* Live Guestbook Wishes List */}
            <ScrollReveal animation="fade-up" delay={250}>
              <div className="mt-8 xs:mt-10 max-w-md mx-auto text-left relative z-10">
                <h4 className="font-serif text-sm xs:text-base font-bold text-[#103023] mb-4 flex items-center gap-2">
                  <MessageCircle size={16} className="text-[#8C6D2B]" />
                  <span>Untaian Doa &amp; Ucapan ({wishes.length})</span>
                </h4>

                <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                  {wishes.map((w, idx) => (
                    <ScrollReveal key={w.id} animation="fade-up" delay={(idx % 4) * 60}>
                      <div className="p-3.5 xs:p-4 rounded-2xl bg-white/90 border border-[#ECC880]/60 text-xs shadow-xs">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-serif font-bold text-[#103023] text-xs xs:text-sm">
                            {w.name}
                          </span>
                          <span className="text-[10px] text-[#5B7569]">
                            {w.date}
                          </span>
                        </div>
                        <p className="text-[#364B42] leading-relaxed font-sans text-[11px] xs:text-xs">
                          {w.message}
                        </p>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </section>

        {/* ========================================================================= */}
        {/* 8. ROYAL CLOSING & FOOTER FOLIO                                          */}
        {/* ========================================================================= */}
        <ScrollReveal animation="fade-up" duration={900}>
          <footer className="relative pt-4 xs:pt-6 pb-28 sm:pb-36 px-2.5 xs:px-4 text-center max-w-2xl mx-auto">
            {/* Royal Closing Folio Card */}
            <div className="relative p-5 xs:p-7 sm:p-11 rounded-[26px] xs:rounded-[32px] sm:rounded-[36px] bg-gradient-to-b from-[#0C241B] via-[#071912] to-[#04120D] border-2 border-[#ECC880] shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_50px_rgba(236,200,128,0.25)] overflow-hidden mb-8 text-white">
              <GuillocheVelvetWatermark opacity={0.06} />
              <div className="absolute inset-2.5 xs:inset-3 sm:inset-4 rounded-[20px] xs:rounded-[26px] sm:rounded-[28px] border-2 border-dashed border-[#ECC880]/30 pointer-events-none" />
              <EmeraldGoldCorner size={48} color="#ECC880" />

              <div className="relative z-10">
                {/* Monogram Seal */}
                <div className="relative mb-4 inline-block">
                  <div className="absolute -inset-4 rounded-full bg-[#ECC880]/15 blur-xl pointer-events-none" />
                  <EmeraldRoyalCrest initials={coupleInitials} size="md" />
                </div>

                {/* Badge Header */}
                <div className="inline-flex items-center gap-2 px-3.5 xs:px-4 py-1 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/50 text-[#ECC880] text-[9.5px] xs:text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.25em] font-semibold mb-3.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
                  <span>SALAM HORMAT &amp; DOA RESTU</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
                </div>

                {/* Closing Words */}
                <p className="font-serif italic text-xs sm:text-sm text-[#D5E6DE] leading-relaxed max-w-md mx-auto mb-4 font-light">
                  &ldquo;Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu bagi ikatan suci pernikahan kami.&rdquo;
                </p>

                <RoyalCalligraphicDivider className="my-2.5 max-w-[220px] mx-auto opacity-80" />

                {/* Family & Couple Names */}
                <p className="text-[9.5px] xs:text-[10px] sm:text-[11px] font-serif tracking-[0.25em] uppercase text-[#ECC880]/85 font-medium mt-3 mb-1">
                  KAMI YANG BERBAHAGIA
                </p>
                <div className="font-serif text-xl xs:text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF2] via-[#ECC880] to-[#E2C792] drop-shadow-md tracking-wide mb-1">
                  {groomName} &amp; {brideName}
                </div>
                <p className="text-[10.5px] xs:text-[11px] sm:text-xs text-[#A0C4B4]/80 font-serif italic">
                  Beserta segenap keluarga besar kedua mempelai
                </p>
              </div>
            </div>

            {/* Elegant Royal Brand Credit & Link */}
            <div className="relative z-10 flex flex-col items-center">
              {/* Hairline Divider with Diamond */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-[#ECC880]/40" />
                <div className="w-1.5 h-1.5 rotate-45 bg-[#ECC880]/80" />
                <div className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-[#ECC880]/40" />
              </div>

              {/* Prestigious Royal Brand Link (No Instagram icon / handle appearance) */}
              <a
                href="https://www.instagram.com/wdgroupcompany?exln=aXl1bHBqbHd2NGV6"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex flex-col items-center gap-1 cursor-pointer transition-all duration-300"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ECC880]/10 hover:bg-[#ECC880]/20 border border-[#ECC880]/40 hover:border-[#ECC880]/70 transition-all shadow-xs">
                  <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
                  <span className="text-[11px] font-serif font-bold tracking-[0.25em] text-[#ECC880] group-hover:text-[#FFF8E2] uppercase transition-colors">
                    WDGROUPCOMPANY
                  </span>
                  <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
                </div>
                <span className="text-[9.5px] font-serif tracking-[0.22em] text-[#A0C4B4]/70 group-hover:text-[#ECC880]/80 uppercase transition-colors">
                  MASTERPIECE ROYAL EDITION
                </span>
              </a>
            </div>
          </footer>
        </ScrollReveal>

        </main>
      </div>

      {/* Floating Bottom Navigation Bar with Dynamic Royal Gold Pill Dock */}
      <nav className={`fixed bottom-3 xs:bottom-4 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 max-w-[96vw] sm:max-w-max px-1.5 xs:px-2 pointer-events-auto transition-opacity duration-300 ${selectedPhoto ? 'opacity-0 pointer-events-none invisible' : 'opacity-100'}`}>
        <div 
          ref={navContainerRef}
          className="bg-[#041610]/95 backdrop-blur-xl border border-[#ECC880]/60 rounded-full py-1 xs:py-1.5 px-1.5 xs:px-2 sm:px-3 shadow-[0_12px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(236,200,128,0.3)] flex items-center justify-start sm:justify-center gap-0.5 xs:gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {[
            { id: 'cover', label: 'Cover', icon: Sparkles },
            { id: 'couple', label: 'Mempelai', icon: User },
            { id: 'event', label: 'Acara', icon: Calendar },
            { id: 'dresscode', label: 'Busana', icon: Shirt },
            { id: 'concierge', label: 'VVIP', icon: Crown },
            { id: 'story', label: 'Cerita', icon: Heart },
            { id: 'gallery', label: 'Galeri', icon: Maximize2 },
            { id: 'filter', label: 'Filter AR', icon: Camera },
            { id: 'gift', label: 'Kado', icon: CreditCard },
            { id: 'pass', label: 'RSVP', icon: Barcode },
          ].map(item => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                data-nav-id={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`transition-all duration-300 flex items-center gap-1 sm:gap-1.5 rounded-full cursor-pointer select-none shrink-0 snap-center ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#041610] px-2.5 xs:px-3 sm:px-3.5 py-1.5 font-serif font-bold text-[10px] xs:text-xs shadow-[0_0_15px_rgba(236,200,128,0.75)] scale-105' 
                    : 'text-[#ECC880]/75 hover:text-white hover:bg-white/10 p-1.5 xs:p-2 text-xs'
                }`}
                title={item.label}
              >
                <IconComponent size={14} className={`shrink-0 ${isActive ? 'text-[#041610]' : 'text-[#ECC880]'}`} />
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

      {/* Fullscreen Lightbox Modal with Full Carousel Controls & Keyboard Support */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-3 sm:p-6 backdrop-blur-md"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Close Button */}
          <button 
            type="button"
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-[#041610]/90 border border-[#ECC880] text-[#ECC880] hover:bg-[#ECC880] hover:text-[#041610] flex items-center justify-center cursor-pointer shadow-xl transition-all z-30"
            title="Tutup"
          >
            <X size={20} />
          </button>

          {/* Prev Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextIdx = safeGalleryIdx > 0 ? safeGalleryIdx - 1 : displayGallery.length - 1;
              setActiveGalleryIdx(nextIdx);
              setSelectedPhoto(displayGallery[nextIdx].image_url);
            }}
            aria-label="Foto Sebelumnya"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#041610]/85 border border-[#ECC880] text-[#ECC880] hover:bg-[#ECC880] hover:text-[#041610] flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all z-30"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              const nextIdx = safeGalleryIdx < displayGallery.length - 1 ? safeGalleryIdx + 1 : 0;
              setActiveGalleryIdx(nextIdx);
              setSelectedPhoto(displayGallery[nextIdx].image_url);
            }}
            aria-label="Foto Selanjutnya"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#041610]/85 border border-[#ECC880] text-[#ECC880] hover:bg-[#ECC880] hover:text-[#041610] flex items-center justify-center cursor-pointer shadow-2xl hover:scale-105 active:scale-95 transition-all z-30"
          >
            <ChevronRight size={24} />
          </button>

          {/* Photo & Caption Container */}
          <div 
            className="relative max-w-3xl w-full max-h-[90vh] flex flex-col items-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#ECC880] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(236,200,128,0.3)] bg-black/50">
              <img 
                src={selectedPhoto} 
                alt={displayGallery[safeGalleryIdx]?.caption || 'Foto Galeri'} 
                className="max-w-full max-h-[75vh] object-contain"
              />
            </div>

            {/* Lightbox Caption Pill */}
            <div className="mt-3.5 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#041610]/95 border border-[#ECC880]/70 text-[#FFF8E2] shadow-xl text-center">
              <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
              <span className="font-serif text-xs sm:text-sm font-medium">
                {displayGallery[safeGalleryIdx]?.caption || `${groomName} & ${brideName}`}
              </span>
              <span className="text-[10px] text-[#ECC880] font-mono px-2 py-0.5 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/30">
                {safeGalleryIdx + 1} / {displayGallery.length}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Live Royal AR Camera Viewfinder Modal */}
      {isCameraModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-2.5 xs:p-3 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg max-h-[92vh] sm:max-h-[90vh] rounded-[24px] xs:rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#08241b] via-[#041610] to-[#010906] border-2 border-[#ECC880] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(236,200,128,0.4)] p-3.5 xs:p-4 sm:p-6 flex flex-col overflow-y-auto no-scrollbar">
            <EmeraldGoldCorner size={36} color="#ECC880" />
            <canvas ref={canvasRef} className="hidden" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-2.5 xs:pb-3 mb-2.5 xs:mb-3 border-b border-[#ECC880]/30 relative z-10 shrink-0">
              <div className="inline-flex items-center gap-1.5 xs:gap-2 min-w-0">
                {photoboothMode !== 'choice' && (
                  <button
                    type="button"
                    onClick={() => {
                      stopCamera();
                      setPhotoboothMode('choice');
                      setUploadedRawImage(null);
                    }}
                    className="p-1 -ml-1 rounded-full text-[#ECC880] hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                    title="Kembali ke Pilihan"
                  >
                    <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5" />
                  </button>
                )}
                <Crown className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-[#ECC880] shrink-0" />
                <span className="font-serif font-bold text-xs xs:text-sm sm:text-base text-[#FFF8E2] tracking-wider truncate">
                  {photoboothMode === 'choice' && 'Royal Photobooth Studio'}
                  {photoboothMode === 'camera' && 'Lensa Kamera Royal'}
                  {photoboothMode === 'uploaded-preview' && 'Hasil Foto Royal HD'}
                </span>
              </div>
              <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
                {photoboothMode === 'camera' && !cameraError && (
                  <button
                    type="button"
                    onClick={toggleCameraFacingMode}
                    className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#ECC880]/20 hover:bg-[#ECC880]/30 text-[#ECC880] flex items-center justify-center transition-colors cursor-pointer"
                    title="Balik Kamera Depan / Belakang"
                  >
                    <SwitchCamera className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={closeCameraModal}
                  className="w-7 h-7 xs:w-8 xs:h-8 rounded-full bg-[#ECC880]/20 hover:bg-[#ECC880]/30 text-[#ECC880] flex items-center justify-center transition-colors cursor-pointer"
                  title="Tutup Modal"
                >
                  <X className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                </button>
              </div>
            </div>

            {/* Hidden Elements: Canvas and Gallery File Input */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {/* Mode 1: Choice Screen (Pilih Kamera Langsung atau Unggah Foto Galeri) */}
            {photoboothMode === 'choice' && (
              <div className="py-1 xs:py-2 space-y-3 xs:space-y-4 text-center animate-fade-in my-auto">
                {/* Badge & Subtitle */}
                <div className="space-y-1 xs:space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/40 text-[#ECC880] text-[9px] xs:text-[10px] font-serif uppercase tracking-[0.2em] font-semibold">
                    <Sparkles className="w-3 h-3 text-[#ECC880]" />
                    <span>PILIH METODE FOTO</span>
                    <Sparkles className="w-3 h-3 text-[#ECC880]" />
                  </div>
                  <p className="font-serif text-[11px] xs:text-xs text-[#A0C4B4] max-w-xs mx-auto leading-relaxed">
                    Pilih cara untuk mengabadikan momen berharga bersama bingkai royal {groomName} &amp; {brideName}:
                  </p>
                </div>

                {/* Main Choice Cards */}
                <div className="space-y-2.5 xs:space-y-3 pt-0.5 xs:pt-1">
                  {/* Option 1: Gunakan Kamera Langsung */}
                  <button
                    type="button"
                    onClick={chooseCameraMode}
                    className="w-full p-3 xs:p-3.5 sm:p-4 rounded-xl xs:rounded-2xl bg-gradient-to-r from-[#0C241B] to-[#061C14] hover:from-[#113125] hover:to-[#0A271C] border-2 border-[#ECC880]/60 hover:border-[#ECC880] text-left transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(236,200,128,0.3)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-2.5 xs:gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 xs:gap-3.5 min-w-0">
                      <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl xs:rounded-2xl bg-gradient-to-tr from-[#C5A059] to-[#ECC880] flex items-center justify-center text-[#041610] shadow-[0_0_15px_rgba(236,200,128,0.5)] group-hover:scale-105 transition-transform shrink-0">
                        <Camera className="w-5 h-5 xs:w-6 xs:h-6" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
                          <h4 className="font-serif font-bold text-xs xs:text-sm sm:text-base text-[#FFF8E2] group-hover:text-[#ECC880] transition-colors truncate">
                            Gunakan Kamera Langsung
                          </h4>
                          <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-[#ECC880]/20 text-[#ECC880] text-[8px] xs:text-[9px] font-serif tracking-wider uppercase font-semibold">
                            Live
                          </span>
                        </div>
                        <p className="text-[10px] xs:text-[11px] text-[#A0C4B4]/90 font-sans mt-0.5 leading-snug">
                          Ambil foto selfie secara langsung dengan frame emas seketika
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-[#ECC880]/70 group-hover:text-[#ECC880] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>

                  {/* Option 2: Unggah Foto dari Galeri */}
                  <button
                    type="button"
                    onClick={triggerUploadPhoto}
                    disabled={isProcessingUpload}
                    className="w-full p-3 xs:p-3.5 sm:p-4 rounded-xl xs:rounded-2xl bg-gradient-to-r from-[#0C241B] to-[#061C14] hover:from-[#113125] hover:to-[#0A271C] border-2 border-[#ECC880]/60 hover:border-[#ECC880] text-left transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(236,200,128,0.3)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-between gap-2.5 xs:gap-3 group cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5 xs:gap-3.5 min-w-0">
                      <div className="w-10 h-10 xs:w-11 xs:h-11 sm:w-12 sm:h-12 rounded-xl xs:rounded-2xl bg-[#041610] border border-[#ECC880] flex items-center justify-center text-[#ECC880] shadow-[0_0_15px_rgba(236,200,128,0.3)] group-hover:scale-105 transition-transform shrink-0">
                        {isProcessingUpload ? (
                          <RefreshCw className="w-5 h-5 xs:w-6 xs:h-6 animate-spin text-[#ECC880]" />
                        ) : (
                          <ImageIcon className="w-5 h-5 xs:w-6 xs:h-6" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 xs:gap-2 flex-wrap">
                          <h4 className="font-serif font-bold text-xs xs:text-sm sm:text-base text-[#FFF8E2] group-hover:text-[#ECC880] transition-colors truncate">
                            Unggah Foto dari Galeri
                          </h4>
                          <span className="px-1.5 xs:px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[8px] xs:text-[9px] font-serif tracking-wider uppercase font-semibold">
                            Otomatis
                          </span>
                        </div>
                        <p className="text-[10px] xs:text-[11px] text-[#A0C4B4]/90 font-sans mt-0.5 leading-snug">
                          Pilih foto terbaik dari ponsel, otomatis dipasang ke frame royal emas
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 text-[#ECC880]/70 group-hover:text-[#ECC880] group-hover:translate-x-1 transition-all shrink-0" />
                  </button>
                </div>

                {/* Secondary Option */}
                <div className="pt-1.5 xs:pt-2 border-t border-[#ECC880]/20">
                  <button
                    type="button"
                    onClick={downloadRoyalFramePNG}
                    className="w-full py-2 xs:py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-[#ECC880]/30 text-[#ECC880] text-[11px] xs:text-xs font-serif flex items-center justify-center gap-1.5 xs:gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#ECC880]" />
                    <span>Unduh Stiker Frame Emas Saja (PNG Transparan)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Mode 2: Uploaded Result Preview */}
            {photoboothMode === 'uploaded-preview' && (
              <div className="space-y-3 xs:space-y-4 animate-fade-in my-auto">
                <div className="relative aspect-[3/4] max-h-[46vh] xs:max-h-[48vh] sm:max-h-[52vh] md:max-h-[56vh] w-auto mx-auto rounded-xl xs:rounded-2xl overflow-hidden bg-black border-2 border-[#ECC880] shadow-[0_15px_50px_rgba(0,0,0,0.85),0_0_30px_rgba(236,200,128,0.4)] shrink-0">
                  <img
                    src={uploadedRawImage || capturedSnapshot || ''}
                    alt="Hasil Foto Royal HD"
                    className="w-full h-full object-cover"
                  />

                  {/* Compact Notification Toast Overlay */}
                  {snapshotNotification?.visible && (
                    <div className="absolute top-2.5 xs:top-3 inset-x-2.5 xs:inset-x-3 z-30 animate-fade-in pointer-events-auto">
                      <div className="bg-[#041610]/95 backdrop-blur-md border border-[#ECC880] rounded-xl xs:rounded-2xl p-2 xs:p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(236,200,128,0.35)] flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 xs:gap-2 min-w-0">
                          <Check className="w-3.5 h-3.5 xs:w-4 xs:h-4 text-emerald-400 shrink-0" />
                          <div className="min-w-0 text-left">
                            <p className="text-[11px] xs:text-xs font-serif font-bold text-[#FFF8E2] truncate">
                              Foto HD Berhasil Disimpan!
                            </p>
                            <p className="text-[9px] xs:text-[10px] text-[#A0C4B4] font-sans truncate">
                              Tersimpan otomatis ke galeri ponsel
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSnapshotNotification(null)}
                          className="p-1 rounded-full hover:bg-white/10 text-[#ECC880]/80 hover:text-white transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Unified Royal Photobooth Frame Overlay (Exact match to Camera) */}
                  <RoyalPhotoboothFrameOverlay
                    initials={coupleInitials}
                    title={photoboothTitle}
                    hashtag={weddingHashtag}
                  />
                </div>

                {/* Primary Action: Bagikan Foto ke Instagram Story */}
                <button
                  type="button"
                  onClick={() => sharePhotoToInstagramStory(capturedSnapshot || undefined)}
                  className="w-full py-2.5 xs:py-3 px-3 xs:px-4 rounded-xl xs:rounded-2xl bg-gradient-to-r from-[#ECC880] via-[#FAF6ED] to-[#D4AF37] text-[#041610] font-serif font-bold text-xs xs:text-sm tracking-wide shadow-[0_4px_18px_rgba(236,200,128,0.5)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 xs:gap-2 cursor-pointer"
                >
                  <InstagramIcon size={15} />
                  <span>Bagikan Foto ke Instagram Story</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#041610]" />
                </button>

                {/* Secondary Action Row */}
                <div className="flex items-center gap-1.5 xs:gap-2">
                  <button
                    type="button"
                    onClick={downloadSnapshot}
                    className="flex-1 py-2 xs:py-2.5 px-2 xs:px-3 rounded-lg xs:rounded-xl bg-white/10 hover:bg-white/20 text-[#ECC880] border border-[#ECC880]/50 font-serif text-[11px] xs:text-xs font-semibold flex items-center justify-center gap-1 xs:gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                    <span>Unduh Ulang</span>
                  </button>
                  <button
                    type="button"
                    onClick={triggerUploadPhoto}
                    className="flex-1 py-2 xs:py-2.5 px-2 xs:px-3 rounded-lg xs:rounded-xl bg-[#0C241B] hover:bg-[#113125] text-[#ECC880] border border-[#ECC880]/50 font-serif text-[11px] xs:text-xs font-semibold flex items-center justify-center gap-1 xs:gap-1.5 transition-colors cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                    <span>Ganti Foto</span>
                  </button>
                  <button
                    type="button"
                    onClick={chooseCameraMode}
                    className="px-2.5 xs:px-3 py-2 xs:py-2.5 rounded-lg xs:rounded-xl bg-[#0C241B] hover:bg-[#113125] text-[#ECC880] border border-[#ECC880]/50 font-serif text-[11px] xs:text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    title="Beralih ke Kamera Langsung"
                  >
                    <Camera className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Mode 3: Live Camera Viewport */}
            {photoboothMode === 'camera' && (
              cameraError ? (
                <div className="py-6 xs:py-8 px-3 xs:px-4 text-center rounded-xl xs:rounded-2xl bg-[#041610] border border-[#ECC880]/30 space-y-3 xs:space-y-4 animate-fade-in my-auto">
                  <div className="w-10 h-10 xs:w-12 xs:h-12 mx-auto rounded-full bg-amber-950/60 border border-amber-500/50 flex items-center justify-center text-[#ECC880]">
                    <Camera className="w-5 h-5 xs:w-6 xs:h-6" />
                  </div>
                  <p className="text-[11px] xs:text-xs text-[#FFF8E2]/90 leading-relaxed font-sans max-w-xs mx-auto">
                    {cameraError}
                  </p>
                  <p className="text-[10px] xs:text-[11px] text-[#ECC880]/80">
                    Anda tetap dapat mengunggah foto dari galeri atau mengunduh stiker frame emas:
                  </p>
                  <div className="flex flex-col gap-2 pt-1 max-w-xs mx-auto">
                    <button
                      type="button"
                      onClick={triggerUploadPhoto}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ECC880] via-[#FAF6ED] to-[#D4AF37] text-[#041610] font-serif font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
                    >
                      <ImageIcon className="w-3.5 h-3.5 text-[#041610]" />
                      <span>Unggah Foto dari Galeri</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        closeCameraModal();
                        downloadRoyalFramePNG();
                      }}
                      className="w-full py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/60 text-[#ECC880] font-serif text-xs flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10 transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Stiker Frame Emas (PNG)</span>
                    </button>
                  </div>
                </div>
              ) : isPreviewOpen && capturedSnapshot ? (
                /* Full Photo Inspector */
                <div className="space-y-3 xs:space-y-4 animate-fade-in my-auto">
                  <div className="relative aspect-[3/4] max-h-[46vh] xs:max-h-[48vh] sm:max-h-[52vh] md:max-h-[56vh] w-auto mx-auto rounded-xl xs:rounded-2xl overflow-hidden border-2 border-[#ECC880] shadow-xl shrink-0">
                    <img src={capturedSnapshot} alt="Hasil Foto Royal HD" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      type="button"
                      onClick={downloadSnapshot}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#041610] font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Unduh Ulang</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => sharePhotoToInstagramStory(capturedSnapshot)}
                      className="flex-1 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880] text-[#ECC880] font-serif font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <InstagramIcon size={13} />
                      <span>Bagikan ke IG Story</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsPreviewOpen(false)}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#ECC880] border border-[#ECC880]/50 font-serif text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Kembali Kamera</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Live Camera Stream Viewport with Royal Overlay */
                <div className="space-y-3 xs:space-y-4 my-auto">
                  <div className="relative aspect-[3/4] max-h-[46vh] xs:max-h-[48vh] sm:max-h-[52vh] md:max-h-[56vh] w-auto mx-auto rounded-xl xs:rounded-2xl overflow-hidden bg-black border-2 border-[#ECC880] shadow-2xl shrink-0">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className={`w-full h-full object-cover ${cameraFacingMode === 'user' ? '-scale-x-100' : ''}`}
                    />

                    {/* Shutter Flash Animation */}
                    {isFlashing && (
                      <div className="absolute inset-0 bg-white/85 z-40 animate-fade-out pointer-events-none" />
                    )}

                    {/* Simple Non-Intrusive Notification Banner after Taking Photo */}
                    {snapshotNotification?.visible && (
                      <div className="absolute top-2.5 xs:top-3 inset-x-2.5 xs:inset-x-3 z-30 animate-fade-in pointer-events-auto">
                        <div className="bg-[#041610]/95 backdrop-blur-md border border-[#ECC880] rounded-xl xs:rounded-2xl p-2 xs:p-2.5 shadow-[0_12px_35px_rgba(0,0,0,0.85),0_0_20px_rgba(236,200,128,0.35)] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <button
                              type="button"
                              onClick={() => setIsPreviewOpen(true)}
                              className="relative w-8 h-10 xs:w-9 xs:h-12 rounded-lg overflow-hidden border border-[#ECC880] shrink-0 shadow-sm bg-black group/thumb cursor-pointer hover:scale-105 transition-transform"
                              title="Ketuk untuk melihat preview"
                            >
                              <img src={snapshotNotification.url} alt="HD Thumbnail" className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/30 group-hover/thumb:bg-transparent transition-colors flex items-center justify-center">
                                <Sparkles className="w-3 h-3 text-[#ECC880]" />
                              </div>
                            </button>
                            <div className="min-w-0 text-left">
                              <div className="flex items-center gap-1">
                                <Check className="w-3 h-3 xs:w-3.5 xs:h-3.5 text-emerald-400 shrink-0" />
                                <p className="text-[11px] xs:text-xs font-serif font-bold text-[#FFF8E2] truncate">
                                  Foto HD Berhasil Disimpan!
                                </p>
                              </div>
                              <p className="text-[9px] xs:text-[10px] text-[#A0C4B4] font-sans truncate">
                                Tersimpan otomatis ke galeri ponsel
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0">
                            <button
                              type="button"
                              onClick={() => sharePhotoToInstagramStory(snapshotNotification.url)}
                              className="px-2 xs:px-2.5 py-1 xs:py-1.5 rounded-lg xs:rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#041610] text-[9px] xs:text-[10px] font-serif font-bold flex items-center gap-1 cursor-pointer shadow-xs hover:brightness-110 active:scale-95 transition-all"
                              title="Bagikan ke Instagram Story"
                            >
                              <InstagramIcon size={12} />
                              <span className="hidden xs:inline">IG Story</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setSnapshotNotification(null)}
                              className="p-1 rounded-full hover:bg-white/10 text-[#ECC880]/80 hover:text-white transition-colors cursor-pointer"
                              title="Tutup Notifikasi"
                            >
                              <X className="w-3 h-3 xs:w-3.5 xs:h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Unified Royal Photobooth Frame Overlay */}
                    <RoyalPhotoboothFrameOverlay
                      initials={coupleInitials}
                      title={photoboothTitle}
                      hashtag={weddingHashtag}
                    />
                  </div>

                  {/* Shutter / Capture Button & Secondary Options */}
                  <div className="flex items-center justify-between px-1 xs:px-2 pt-0.5 xs:pt-1">
                    {/* Left: Thumbnail preview OR trigger upload photo */}
                    {capturedSnapshot ? (
                      <button
                        type="button"
                        onClick={() => setIsPreviewOpen(true)}
                        className="relative w-10 h-10 xs:w-12 xs:h-12 rounded-xl overflow-hidden border-2 border-[#ECC880] shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer group"
                        title="Lihat Hasil Foto Terakhir"
                      >
                        <img src={capturedSnapshot} alt="Thumbnail Terakhir" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#041610]/20 group-hover:bg-transparent transition-colors" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={triggerUploadPhoto}
                        className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-[#ECC880]/50 text-[#ECC880] flex items-center justify-center transition-colors cursor-pointer"
                        title="Unggah Foto dari Galeri"
                      >
                        <ImageIcon className="w-4 h-4" />
                      </button>
                    )}

                    {/* Center: Main Royal Gold Shutter Button */}
                    <button
                      type="button"
                      onClick={captureSnapshot}
                      className="w-14 h-14 xs:w-16 xs:h-16 rounded-full bg-gradient-to-tr from-[#ECC880] via-[#FAF6ED] to-[#D4AF37] border-4 border-[#041610] shadow-[0_0_25px_rgba(236,200,128,0.8)] hover:scale-105 active:scale-90 transition-all flex items-center justify-center cursor-pointer"
                      title="Ambil Foto HD Kenang-kenangan"
                    >
                      <div className="w-10 h-10 xs:w-12 xs:h-12 rounded-full border-2 border-[#041610]/80 flex items-center justify-center">
                        <Camera className="w-4 h-4 xs:w-5 xs:h-5 text-[#041610]" />
                      </div>
                    </button>

                    {/* Right: Switch Front / Back Camera */}
                    <button
                      type="button"
                      onClick={toggleCameraFacingMode}
                      className="w-10 h-10 xs:w-11 xs:h-11 rounded-full bg-white/10 hover:bg-white/20 border border-[#ECC880]/50 text-[#ECC880] flex items-center justify-center transition-colors cursor-pointer"
                      title="Ganti Kamera Depan / Belakang"
                    >
                      <SwitchCamera className="w-4 h-4 xs:w-5 xs:h-5" />
                    </button>
                  </div>

                  {/* Secondary Option: Appears ONLY AFTER Taking Photo */}
                  {capturedSnapshot && (
                    <div className="pt-1.5 xs:pt-2 animate-fade-in">
                      <button
                        type="button"
                        onClick={() => sharePhotoToInstagramStory(capturedSnapshot)}
                        className="w-full py-2 xs:py-2.5 sm:py-3 px-3 xs:px-4 rounded-xl xs:rounded-2xl bg-gradient-to-r from-[#ECC880] via-[#FAF6ED] to-[#D4AF37] text-[#041610] font-serif font-bold text-xs xs:text-sm tracking-wide shadow-[0_4px_18px_rgba(236,200,128,0.5)] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 xs:gap-2 cursor-pointer"
                      >
                        <InstagramIcon size={15} />
                        <span>Bagikan Foto ke Instagram Story</span>
                        <Sparkles className="w-3.5 h-3.5 text-[#041610]" />
                      </button>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Panduan Menampilkan Foto di Instagram Story Modal */}
      {isStoryGuideOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-sm sm:max-w-md rounded-[32px] bg-gradient-to-b from-[#08241b] via-[#041610] to-[#010906] border-2 border-[#ECC880] shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(236,200,128,0.4)] p-5 sm:p-6 overflow-hidden text-left">
            <EmeraldGoldCorner size={36} color="#ECC880" />

            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#ECC880]/30 relative z-10">
              <div className="inline-flex items-center gap-2">
                <Crown className="w-4 h-4 text-[#ECC880]" />
                <span className="font-serif font-bold text-sm text-[#FFF8E2] tracking-wider">
                  Panduan Pasang Foto di IG Story
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsStoryGuideOpen(false)}
                className="w-8 h-8 rounded-full bg-[#ECC880]/20 hover:bg-[#ECC880]/30 text-[#ECC880] flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup Panduan"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Explanation why photo doesn't appear automatically in native camera */}
            <div className="space-y-4 text-xs text-[#FFF8E2]/90 leading-relaxed relative z-10">
              <div className="p-3 rounded-xl bg-[#ECC880]/10 border border-[#ECC880]/40 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#ECC880] flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-[#ECC880]">
                  <strong>Kenapa foto tidak langsung muncul di kamera?</strong> Karena sistem keamanan Instagram, browser web tidak diizinkan menyisipkan foto ke kamera Instagram secara otomatis tanpa persetujuan pengguna.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ECC880] text-[#041610] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-bold text-[#FFF8E2] font-serif">Foto Tersimpan di Galeri</p>
                    <p className="text-[11px] text-[#A0C4B4]">
                      Foto berbingkai emas {groomName} &amp; {brideName} sudah otomatis diunduh ke galeri ponsel Anda.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ECC880] text-[#041610] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-bold text-[#FFF8E2] font-serif">Buka Instagram Story</p>
                    <p className="text-[11px] text-[#A0C4B4]">
                      Buka aplikasi Instagram, lalu geser ke kanan untuk masuk ke mode Story.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ECC880] text-[#041610] font-bold text-xs flex items-center justify-center flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-bold text-[#FFF8E2] font-serif">Pilih Foto dari Galeri (Pojok Kiri Bawah)</p>
                    <p className="text-[11px] text-[#A0C4B4]">
                      Usap layar ke atas (<em>swipe up</em>) atau ketuk kotak galeri di pojok kiri bawah layar Story untuk memilih foto berbingkai emas ini.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons in Modal */}
              <div className="pt-2 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsStoryGuideOpen(false);
                    handleOpenInstagramStory();
                  }}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#ECC880] to-[#D4AF37] text-[#041610] font-serif font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <InstagramIcon size={16} />
                  <span>Buka Aplikasi Instagram Story</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const igGroom = invitation?.instagram_groom ? `@${invitation.instagram_groom.replace('@', '')}` : '';
                    const igBride = invitation?.instagram_bride ? `@${invitation.instagram_bride.replace('@', '')}` : '';
                    handleCopyHashtag(`${weddingHashtag} ${igGroom} ${igBride}`.trim());
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#ECC880] border border-[#ECC880]/50 font-serif text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Salin Hashtag &amp; Tag Mempelai</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {calendarModalEvent && (
        <CalendarReminderModal
          isOpen={Boolean(calendarModalEvent)}
          onClose={() => setCalendarModalEvent(null)}
          event={calendarModalEvent}
        />
      )}

    </div>
  );
};

export default EmeraldVelvetRoyalTheme;
