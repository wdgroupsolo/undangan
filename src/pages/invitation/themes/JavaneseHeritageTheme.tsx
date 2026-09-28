import React, { useEffect, useState, useRef } from 'react';
import { 
  Calendar, MapPin, Gift, CreditCard, Clock, Heart, Send, Check, X, Copy, 
  ChevronLeft, ChevronRight, Sparkles, Navigation, CheckCircle2, XCircle
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

// Self-contained Instagram Icon SVG
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Javanese Batik Truntum & Kawung Motif Corner Ornaments
const JavaneseBatikCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-35 text-[#8c2d38]">
      {/* Central Flower Petals (Ceplok/Kawung geometry) */}
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.4" />
      {/* 4 Petals */}
      <path d="M50 20 C62 32, 62 42, 50 50 C38 42, 38 32, 50 20 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M50 80 C62 68, 62 58, 50 50 C38 58, 38 68, 50 80 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M20 50 C32 38, 42 38, 50 50 C42 62, 32 62, 20 50 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M80 50 C68 38, 58 38, 50 50 C58 62, 68 62, 80 50 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      {/* Diagonal Starlets (Truntum motifs) */}
      <circle cx="28" cy="28" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="72" cy="28" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="72" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="72" cy="72" r="3" fill="currentColor" opacity="0.5" />
      <path d="M28 22 L28 34 M22 28 L34 28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M72 22 L72 34 M66 28 L78 28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M28 66 L28 78 M22 72 L34 72" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M72 66 L72 78 M66 72 L78 72" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  </div>
);

// Traditional Javanese Gunungan / Batik Floral Divider
const JavaneseDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#8c2d38]/50 to-[#8c2d38]" />
    <div className="flex items-center gap-1.5 text-[#8c2d38]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8c2d38]">
        {/* Stylized Lotus / Gunungan Bud */}
        <path d="M12 2 C13 7, 18 10, 18 14 C18 17.5, 15.3 20.5, 12 21 C8.7 20.5, 6 17.5, 6 14 C6 10, 11 7, 12 2 Z" opacity="0.85" />
        <path d="M12 7 C12 11, 15 13, 15 15.5 C15 17.5, 13.5 19, 12 19.5 C10.5 19, 9 17.5, 9 15.5 C9 13, 12 11, 12 7 Z" fill="#fcf8f2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
    </div>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#8c2d38]/50 to-[#8c2d38]" />
  </div>
);

// Intertwined Calligraphic Monogram Emblem (Matches User Reference Top Logo exactly)
export const JavaneseMonogram: React.FC<{ initials?: string; className?: string }> = ({ 
  initials = 'HA', 
  className = '' 
}) => (
  <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
    <svg 
      viewBox="0 0 110 135" 
      fill="none" 
      className="w-16 h-20 sm:w-20 sm:h-24 text-[#5c131c] drop-shadow-[0_2px_4px_rgba(92,19,28,0.22)]"
    >
      {/* Front Serif D Stem */}
      <path 
        d="M58 24 L58 108 M50 24 L66 24 M50 108 L66 108" 
        stroke="currentColor" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Front D Outer Curve */}
      <path 
        d="M58 24 C90 24, 98 44, 98 66 C98 88, 90 108, 58 108" 
        stroke="currentColor" 
        strokeWidth="3.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Back Intertwined D / Calligraphic Flourish Swash */}
      <path 
        d="M36 86 C22 76, 26 56, 38 42 C48 30, 68 26, 76 25 M76 25 L76 96 C76 108, 62 116, 46 116 C30 116, 18 104, 34 90 C48 78, 72 86, 82 95" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  </div>
);

// Climbing Ivy / Betel Vines on Left Arch Border (Curling over the maroon frame)
const ArchLeftVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 50 110" fill="none" className="w-11 h-22 sm:w-13 sm:h-26 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      {/* Curling green stem */}
      <path 
        d="M18 105 C24 85, 12 70, 22 50 C28 36, 16 20, 26 6" 
        stroke="#4f633a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Leaf 1 (Bottom) */}
      <path 
        d="M18 90 C8 88, 2 76, 10 68 C22 62, 26 76, 18 90 Z" 
        fill="#556b3e" 
        stroke="#3c4d2b" 
        strokeWidth="0.8" 
      />
      <path d="M12 76 C15 78, 18 84, 18 90" stroke="#79945c" strokeWidth="0.8" />

      {/* Leaf 2 (Middle Left, Heart Shape) */}
      <path 
        d="M16 56 C4 52, 0 38, 12 30 C22 24, 28 40, 16 56 Z" 
        fill="#637c49" 
        stroke="#42552f" 
        strokeWidth="0.8" 
      />
      <path d="M12 36 C15 42, 16 48, 16 56" stroke="#87a666" strokeWidth="0.8" />

      {/* Leaf 3 (Middle Right, Curling Over Arch Border) */}
      <path 
        d="M24 44 C36 40, 46 46, 42 58 C36 68, 25 56, 24 44 Z" 
        fill="#4c6037" 
        stroke="#334224" 
        strokeWidth="0.8" 
      />
      <path d="M36 50 C31 52, 27 48, 24 44" stroke="#6f8c51" strokeWidth="0.8" />

      {/* Leaf 4 (Top Bud) */}
      <path 
        d="M26 14 C18 10, 16 0, 25 2 C32 4, 34 12, 26 14 Z" 
        fill="#6b854e" 
        stroke="#475a34" 
        strokeWidth="0.8" 
      />
    </svg>
  </div>
);

// Climbing Ivy / Betel Vines on Right Arch Border (Curling over the maroon frame)
const ArchRightVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 50 110" fill="none" className="w-11 h-22 sm:w-13 sm:h-26 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      {/* Curling green stem */}
      <path 
        d="M32 105 C26 85, 38 70, 28 50 C22 36, 34 20, 24 6" 
        stroke="#4f633a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Leaf 1 (Bottom Right) */}
      <path 
        d="M32 90 C42 88, 48 76, 40 68 C28 62, 24 76, 32 90 Z" 
        fill="#4c6037" 
        stroke="#334224" 
        strokeWidth="0.8" 
      />
      <path d="M38 76 C35 78, 32 84, 32 90" stroke="#6f8c51" strokeWidth="0.8" />

      {/* Leaf 2 (Middle Right, Heart Shape) */}
      <path 
        d="M34 56 C46 52, 50 38, 38 30 C28 24, 22 40, 34 56 Z" 
        fill="#637c49" 
        stroke="#42552f" 
        strokeWidth="0.8" 
      />
      <path d="M38 36 C35 42, 34 48, 34 56" stroke="#87a666" strokeWidth="0.8" />

      {/* Leaf 3 (Middle Left, Curling Inwards) */}
      <path 
        d="M26 44 C14 40, 4 46, 8 58 C14 68, 25 56, 26 44 Z" 
        fill="#556b3e" 
        stroke="#3c4d2b" 
        strokeWidth="0.8" 
      />
      <path d="M14 50 C19 52, 23 48, 26 44" stroke="#79945c" strokeWidth="0.8" />

      {/* Leaf 4 (Top Bud) */}
      <path 
        d="M24 14 C32 10, 34 0, 25 2 C18 4, 16 12, 24 14 Z" 
        fill="#6b854e" 
        stroke="#475a34" 
        strokeWidth="0.8" 
      />
    </svg>
  </div>
);

// Realistic Burgundy Orchid & Cream Peony Floral Corner for Photo Card (Top Right)
const PhotoCornerFloralTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      {/* Delicate twig with buds */}
      <path d="M40 85 C65 60, 75 35, 92 10" stroke="#5a1820" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="85" cy="18" r="3" fill="#8c2530" />
      <circle cx="75" cy="28" r="3.5" fill="#a4333e" />
      <circle cx="94" cy="10" r="2.5" fill="#f0d5b0" />

      {/* Main Burgundy Orchid Center Flower */}
      <g transform="translate(62, 45)">
        <path d="M0 0 C-10 -18, 10 -18, 0 0" fill="#7a1d27" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C-18 12, -22 -2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C18 12, 22 -2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <ellipse cx="-10" cy="-6" rx="10" ry="7" fill="#68151e" transform="rotate(-20 -10 -6)" />
        <ellipse cx="10" cy="-6" rx="10" ry="7" fill="#68151e" transform="rotate(20 10 -6)" />
        <path d="M-6 2 C-10 12, 10 12, 6 2 Z" fill="#9e2b36" />
        <circle cx="0" cy="0" r="2.5" fill="#f3da9f" />
      </g>

      {/* Cream / Golden Peony Flower Accent */}
      <g transform="translate(80, 68)">
        <circle cx="0" cy="0" r="14" fill="#e8cfad" stroke="#c4a57b" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="10" fill="#f3dfc3" />
        <circle cx="0" cy="0" r="6" fill="#faebd7" />
        <circle cx="0" cy="0" r="3" fill="#df9b8e" />
      </g>

      {/* Small Orchid Blossom */}
      <g transform="translate(42, 68)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#781c25" />
        <circle cx="0" cy="0" r="2" fill="#fadcaf" />
      </g>
    </svg>
  </div>
);

// Realistic Burgundy Orchid & Cream Peony Floral Corner for Photo Card (Bottom Left)
const PhotoCornerFloralBottomLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      {/* Delicate twig with buds */}
      <path d="M60 15 C35 40, 25 65, 8 90" stroke="#5a1820" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="82" r="3" fill="#8c2530" />
      <circle cx="25" cy="72" r="3.5" fill="#a4333e" />
      <circle cx="6" cy="90" r="2.5" fill="#f0d5b0" />

      {/* Main Burgundy Orchid Center Flower */}
      <g transform="translate(38, 55)">
        <path d="M0 0 C-10 18, 10 18, 0 0" fill="#7a1d27" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C-18 -12, -22 2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C18 -12, 22 2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <ellipse cx="-10" cy="6" rx="10" ry="7" fill="#68151e" transform="rotate(20 -10 6)" />
        <ellipse cx="10" cy="6" rx="10" ry="7" fill="#68151e" transform="rotate(-20 10 6)" />
        <path d="M-6 -2 C-10 -12, 10 -12, 6 -2 Z" fill="#9e2b36" />
        <circle cx="0" cy="0" r="2.5" fill="#f3da9f" />
      </g>

      {/* Cream / Golden Peony Flower Accent */}
      <g transform="translate(20, 32)">
        <circle cx="0" cy="0" r="14" fill="#e8cfad" stroke="#c4a57b" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="10" fill="#f3dfc3" />
        <circle cx="0" cy="0" r="6" fill="#faebd7" />
        <circle cx="0" cy="0" r="3" fill="#df9b8e" />
      </g>

      {/* Small Orchid Blossom */}
      <g transform="translate(58, 32)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#781c25" />
        <circle cx="0" cy="0" r="2" fill="#fadcaf" />
      </g>
    </svg>
  </div>
);

// Floating Floral & Gold Sparkle Particles
export const JavanesePetals: React.FC<{ count?: number }> = ({ count = 10 }) => {
  const petals = [
    { top: '10%', left: '12%', size: 14, duration: '9s', delay: '0s', rot: '25deg' },
    { top: '24%', left: '85%', size: 18, duration: '12s', delay: '1.5s', rot: '-40deg' },
    { top: '40%', left: '16%', size: 12, duration: '8.5s', delay: '3s', rot: '65deg' },
    { top: '56%', left: '82%', size: 16, duration: '11s', delay: '0.8s', rot: '-15deg' },
    { top: '72%', left: '10%', size: 14, duration: '10s', delay: '2.2s', rot: '45deg' },
    { top: '88%', left: '76%', size: 20, duration: '13s', delay: '1.8s', rot: '-50deg' },
    { top: '32%', left: '70%', size: 12, duration: '9.5s', delay: '2.5s', rot: '30deg' },
    { top: '64%', left: '25%', size: 15, duration: '10.5s', delay: '0.4s', rot: '-35deg' },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute opacity-65"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rot})`,
            animation: `javanese-petal-float ${p.duration} ease-in-out infinite ${p.delay}`,
            willChange: 'transform, opacity',
          }}
        >
          {/* Burgundy / Terracotta Orchid Petal Shape */}
          <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-[#7a1e28]">
            <path 
              d="M15 2 C22 8, 28 16, 26 23 C24 28, 17 29, 13 26 C8 22, 6 14, 15 2 Z" 
              fill="currentColor" 
              opacity="0.75" 
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

interface JavaneseHeritageThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const JavaneseHeritageTheme: React.FC<JavaneseHeritageThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
}) => {
  const toast = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  // State management
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [wishName, setWishName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [wishAttendance, setWishAttendance] = useState('Hadir');
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState<Array<{ name: string; attendance: string; message: string; date: string }>>([
    {
      name: 'Raden Mas Suryo & Istri',
      attendance: 'Hadir',
      message: 'Nderek mangayubagyo, selamat menempuh hidup baru Habib & Adiba. Mugi tansah pinaringan berkah, ayem tentrem, lan sakinah mawaddah warahmah.',
      date: '10 menit lalu'
    },
    {
      name: 'Alyasha Putri',
      attendance: 'Hadir',
      message: 'Happy Wedding Habib & Adiba! Semoga menjadi keluarga yang penuh cinta dan kebahagiaan selalu ❤️',
      date: '25 menit lalu'
    }
  ]);

  // Couple names - Habib & Adiba as canonical demo
  const groomNick = (() => {
    const nick = couple?.groom_nickname?.trim();
    const full = couple?.groom_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'bagas' && nick.toLowerCase() !== 'steven') return nick;
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'steven') return full.split(' ')[0];
    return 'Habib';
  })();

  const brideNick = (() => {
    const nick = couple?.bride_nickname?.trim();
    const full = couple?.bride_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'siti' && nick.toLowerCase() !== 'bunga') return nick;
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'bunga') return full.split(' ')[0];
    return 'Adiba';
  })();

  const groomFullName = (() => {
    const full = couple?.groom_full_name?.trim();
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'steven pratama') return full;
    return 'HABIB YULIANTO';
  })();

  const brideFullName = (() => {
    const full = couple?.bride_full_name?.trim();
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'bunga lestari') return full;
    return 'ADIBA PUTRI SYAKILLA';
  })();

  // Events fallback
  const defaultEvents = [
    {
      id: 'default-akad',
      name: 'Akad Nikah',
      event_date: '2025-12-28',
      start_time: '08.00',
      end_time: '10.00 WIB',
      location: 'Pendopo Agung Candi Borobudur',
      address: 'Kawasan Wisata Candi Borobudur, Magelang, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Candi+Borobudur',
    },
    {
      id: 'default-resepsi',
      name: 'Resepsi Pernikahan',
      event_date: '2025-12-28',
      start_time: '11.00',
      end_time: '14.00 WIB',
      location: 'Grand Heritage Ballroom',
      address: 'Plataran Heritage Borobudur, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Plataran+Heritage+Borobudur',
    }
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  // Countdown timer
  const targetDateStr = displayEvents?.[0]?.event_date || '2025-12-28';
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Gallery fallback
  const defaultGallery = [
    { image_url: '/photos/photo-1.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Tatap Penuh Makna' },
    { image_url: '/photos/photo-4.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Langkah Bersama' },
    { image_url: '/photos/photo-5.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Janji Hati' },
    { image_url: '/photos/photo-7.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Harmoni Kasih' },
    { image_url: '/photos/photo-6.jpg', span: 'col-span-2', aspect: 'aspect-[16/10]', caption: 'Dalam Naungan Restu' },
    { image_url: '/photos/photo-8.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Senyum Bahagia' },
    { image_url: '/photos/photo-9.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]', caption: 'Menuju Hari Abadi' },
  ];

  const displayGallery = (gallery && gallery.length > 0)
    ? gallery.map((item, idx) => ({
        image_url: item.image_url,
        span: idx === 4 ? 'col-span-2' : 'col-span-1',
        aspect: idx === 4 ? 'aspect-[16/10]' : 'aspect-[3/4]',
        caption: item.caption || 'Momen Bahagia'
      }))
    : defaultGallery;

  // Love stories fallback
  const defaultStories = [
    {
      year: '2021',
      title: 'Awal Pertemuan',
      description: 'Pertemuan tak sengaja di pelataran Candi Borobudur saat senja. Sebuah perbincangan sederhana yang menumbuhkan rasa kagum dan saling mengenal satu sama lain.'
    },
    {
      year: '2023',
      title: 'Menjalin Komitmen',
      description: 'Setelah dua tahun saling membersamai dalam suka dan duka, kami meyakinkan hati untuk saling berkomitmen melangkah menuju jenjang yang lebih serius.'
    },
    {
      year: '2025',
      title: 'Lamaran & Restu',
      description: 'Dengan memohon doa dan restu dari kedua orang tua dan keluarga besar, kami mengikat janji pertunangan secara sakral dan bersiap menyongsong hari pernikahan.'
    },
    {
      year: '2026',
      title: 'Ijab Qabul & Bahagia',
      description: 'Alhamdulillah, hari yang kami nantikan tiba. Bersatunya dua insan dalam ikatan suci pernikahan, melangkah bersama membangun keluarga yang sakinah, mawaddah, warahmah.'
    }
  ];

  const displayStories = stories && stories.length > 0 ? stories : defaultStories;

  // Gifts fallback
  const defaultGifts = [
    {
      provider: 'BCA',
      account_number: '7820192831',
      account_name: `${groomNick} Pratama`,
    },
    {
      provider: 'MANDIRI',
      account_number: '1370019283741',
      account_name: `${brideNick} Shakila`,
    },
    {
      provider: 'BSI (Bank Syariah Indonesia)',
      account_number: '7192837465',
      account_name: `${groomNick} & ${brideNick}`,
    }
  ];

  const displayGifts = (gifts && gifts.length > 0) ? gifts : defaultGifts;

  // Copy helper
  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Submit wish
  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) {
      toast.error('Mohon isi nama dan ucapan Anda');
      return;
    }

    setWishes(prev => [
      {
        name: wishName,
        attendance: wishAttendance,
        message: wishText,
        date: 'Baru saja'
      },
      ...prev
    ]);
    setWishName('');
    setWishText('');
    toast.success('Terima kasih atas doa dan restu Anda!');
  };

  // Format date helper
  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return 'Minggu, 28 Desember 2025';
    try {
      const clean = String(dateStr).split('T')[0];
      const parts = clean.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
      return 'Minggu, 28 Desember 2025';
    } catch {
      return 'Minggu, 28 Desember 2025';
    }
  };

  // Format arch date strictly matching reference format (e.g. 28 . 12 . 2025)
  const formattedArchDate = (() => {
    const rawDate = events?.[0]?.event_date;
    if (rawDate) {
      try {
        const clean = String(rawDate).split('T')[0];
        const parts = clean.split('-');
        if (parts.length === 3) {
          return `${parts[2]} . ${parts[1]} . ${parts[0]}`;
        }
      } catch (_) {}
    }
    return '28 . 12 . 2025';
  })();

  return (
    <div className="min-h-screen text-[#3d1117] bg-[#fbf7f0] selection:bg-[#7c1d29] selection:text-white relative overflow-x-hidden font-serif">
      
      {/* Inline Keyframes & Micro-animations */}
      <style>{`
        @keyframes javanese-petal-float {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
            opacity: 0.3;
          }
          50% {
            transform: translate3d(8px, -18px, 0) rotate(20deg) scale(1.1);
            opacity: 0.85;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
            opacity: 0.3;
          }
        }

        @keyframes shimmer-sweep-gold {
          0% {
            transform: translateX(-150%) skewX(-20deg);
          }
          100% {
            transform: translateX(250%) skewX(-20deg);
          }
        }

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.03); opacity: 1; }
        }

        @keyframes scroll-pill-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.85;
          }
          50% {
            transform: translateY(12px);
            opacity: 1;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* DESKTOP LEFT SIDE: Fixed 58% Panoramic Borobudur Landscape View           */}
      {/* ========================================================================= */}
      <div className="hidden lg:block lg:w-[58%] fixed top-0 left-0 h-screen z-0 overflow-hidden bg-[#24090d]">
        {/* Background Image: High-res Borobudur Sunset Landscape */}
        <img
          src="/themes/javanese-heritage-desktop.jpg"
          alt="Borobudur Heritage Landscape"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Ambient Dark Gradient Vignette for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24090d] via-transparent to-black/60" />

        {/* Ambient Petal Drift on Left Panel */}
        <JavanesePetals count={8} />

        {/* Content on Left Side */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-20 text-white z-10 select-none">
          <p 
            className="text-sm xl:text-base uppercase tracking-[0.35em] text-[#e8c5b8] font-sans font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            The Wedding of
          </p>

          <h1 
            className="text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[#ffffff] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {groomNick} <span className="font-light italic text-[#df9b8e]">&amp;</span> {brideNick}
          </h1>

          <p 
            className="text-xl xl:text-2xl text-[#f5e6d8] font-serif font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-8"
          >
            {formatEventDate(targetDateStr)}
          </p>

          <div className="bg-black/45 border border-[#df9b8e]/40 backdrop-blur-md rounded-2xl px-6 py-4 max-w-sm shadow-2xl">
            <p className="text-[11px] uppercase tracking-widest text-[#e8c5b8] font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-xl font-semibold text-white tracking-wide mt-1 font-serif">
              {guestName}
            </p>
            <p className="text-[11px] text-white/70 italic mt-1 font-serif">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Scrollable Invitation (42% width on desktop, 100% on mobile)  */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] lg:ml-[58%] min-h-screen relative z-10 bg-[#fbf7f0] shadow-[0_0_60px_rgba(0,0,0,0.3)] border-l border-[#8c2d38]/20">

        {/* ========================================================================= */}
        {/* 1. HERO / COVER CARD (Exact recreation of 'seperti ini' reference)         */}
        {/* ========================================================================= */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-3 py-6 sm:py-8 overflow-hidden select-none">
          
          {/* Background Scene: Authentic Borobudur Stupas & Vintage Orchid Borders */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Backdrop" 
              className="w-full h-full object-cover object-center origin-center"
            />
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0]/15 via-transparent to-[#fbf7f0]/25" />
          </div>

          {/* Floating Petals Drift */}
          <JavanesePetals count={8} />

          {/* ========================================================================= */}
          {/* THE SIGNATURE DOUBLE MAROON OVAL ARCH FRAME (Matching 'seperti ini' screenshot) */}
          {/* ========================================================================= */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] min-h-[580px] sm:min-h-[620px] max-h-[92vh] flex flex-col items-center justify-between p-4 sm:p-5 my-auto">
            
            {/* Outer Maroon Arch Line */}
            <div className="absolute inset-0 rounded-[190px] sm:rounded-[215px] border-[2.5px] border-[#5c131c] shadow-[0_4px_24px_rgba(92,19,28,0.18)] pointer-events-none z-10" />

            {/* Inner Maroon Arch Line with 5px gap */}
            <div className="absolute inset-[5px] rounded-[185px] sm:rounded-[210px] border-[1.5px] border-[#5c131c]/90 pointer-events-none z-10" />

            {/* Soft inner radial parchment glow for contrast */}
            <div className="absolute inset-[7px] rounded-[183px] sm:rounded-[208px] bg-gradient-to-b from-[#fbf7f0]/60 via-[#fbf7f0]/25 to-[#fbf7f0]/50 pointer-events-none z-0" />

            {/* Climbing Green Ivy / Betel Vines on Left Arch Border */}
            <ArchLeftVine className="absolute -left-3.5 top-[32%] z-20 pointer-events-none" />

            {/* Climbing Green Ivy / Betel Vines on Right Arch Border */}
            <ArchRightVine className="absolute -right-3.5 top-[37%] z-20 pointer-events-none" />

            {/* TOP: Calligraphic Monogram */}
            <div className="relative z-20 pt-7 sm:pt-9">
              <JavaneseMonogram />
            </div>

            {/* MIDDLE: Typography - THE WEDDING OF HABIB & ADIBA */}
            <div className="relative z-20 my-auto py-2 space-y-2 text-center">
              <p 
                className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#6a1a24] font-serif font-semibold drop-shadow-xs"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                THE WEDDING OF
              </p>

              <h1 
                className="text-[32px] sm:text-[38px] leading-tight text-[#4e0e16] font-normal tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomNick.toUpperCase()} <span className="font-light italic text-[#7c1d29]">&amp;</span> {brideNick.toUpperCase()}
              </h1>

              <p 
                className="text-xs sm:text-[13px] tracking-[0.25em] text-[#6a1a24] font-serif pt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {formattedArchDate}
              </p>
            </div>

            {/* BOTTOM: Vertical Capsule Scroll Down Indicator matching 'seperti ini' screenshot */}
            <div className="relative z-20 pb-7 sm:pb-9 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('ayat-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll ke Bawah"
                className="flex flex-col items-center group cursor-pointer animate-fade-in transition-transform hover:scale-110 active:scale-95"
              >
                <div className="w-[22px] h-[42px] rounded-full border-[1.8px] border-[#6a1a24] flex items-start justify-center pt-2 shadow-xs group-hover:border-[#4e0e16] transition-colors">
                  {/* Animated sliding scroll pill dot */}
                  <div 
                    className="w-[3px] h-[7px] rounded-full bg-[#6a1a24] group-hover:bg-[#4e0e16]"
                    style={{ animation: 'scroll-pill-bounce 2s ease-in-out infinite' }}
                  />
                </div>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WITH LOVE & AYAT SUCI (Exact recreation of 'ini bawahnya' screenshot)   */}
        {/* ========================================================================= */}
        <section id="ayat-section" className="py-14 px-5 sm:px-8 relative z-10 bg-[#fbf7f0] border-t border-[#8c2d38]/15 text-center overflow-hidden">
          {/* Subtle Ambient Petals */}
          <JavanesePetals count={6} />

          <div className="max-w-md mx-auto relative z-10 space-y-7">
            
            {/* Couple Window Photo Card with Corner Floral Sprays */}
            <div className="relative mx-auto max-w-[310px] sm:max-w-[340px] px-2 pt-2">
              
              {/* Floral Accent Top Right Corner */}
              <PhotoCornerFloralTopRight className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

              {/* Floral Accent Bottom Left Corner */}
              <PhotoCornerFloralBottomLeft className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

              {/* Photo Container */}
              <div className="relative z-10 w-full aspect-[4/3.2] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(92,19,28,0.18)] border border-[#8c2d38]/20 bg-[#efe7db]">
                <img 
                  src="/themes/habib-adiba-window.jpg" 
                  alt="Habib & Adiba" 
                  className="w-full h-full object-cover object-center scale-102"
                />
              </div>
            </div>

            {/* WITH LOVE Heading */}
            <div className="space-y-4 pt-1">
              <h2 
                className="text-2xl sm:text-3xl font-normal text-[#5c131c] tracking-[0.2em] uppercase font-serif drop-shadow-xs"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                WITH LOVE
              </h2>

              {/* Holy Verse Quote (Exact Wording from Screenshot) */}
              <p className="text-xs sm:text-[13px] text-[#42151b] font-serif leading-[1.85] px-2 sm:px-4 drop-shadow-xs">
                &ldquo;Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
              </p>

              {/* Citation */}
              <p 
                className="text-xs sm:text-[13px] font-serif font-medium text-[#5c131c] tracking-wide"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                (Q.S. Ar. Rum : 21)
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 3. BRIDE & GROOM SECTION (Exact recreation of user reference screenshots)  */}
        {/* ========================================================================= */}
        <section id="mempelai-section" className="relative py-12 px-3 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden">
          
          {/* Subtle Ambient Background Borobudur & Floral Garland Motif */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Background" 
              className="w-full h-full object-cover object-bottom opacity-70 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0] via-[#fbf7f0]/40 to-[#fbf7f0]/85" />
          </div>

          {/* Centered Thin Maroon Border Card Container */}
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center">
            
            {/* Header: BRIDE & GROOM */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.25em] text-[#5c131c] font-normal uppercase mb-3 select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              BRIDE &amp; GROOM
            </h2>

            {/* Greeting & Invitation Intro */}
            <div className="space-y-1.5 text-center mb-8 px-1">
              <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] font-semibold leading-relaxed">
                Assalamualaikum Wr. Wb.
              </p>
              <p className="text-[11px] sm:text-xs font-serif text-[#5a1c24] leading-relaxed">
                Dengan memohon rahmat dan ridho Allah SWT,<br />
                kami bermaksud mengundang<br />
                Bapak/Ibu/Saudara/i untuk menghadiri acara<br />
                pernikahan putra-putri kami:
              </p>
            </div>

            {/* ========================================================================= */}
            {/* BRIDE (Adiba - Comes First Matching Reference)                           */}
            {/* ========================================================================= */}
            <div className="w-full flex flex-col items-center">
              {/* Bride Oval Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[1.5px] border-[#5c131c]/50 p-1 bg-[#fbf7f0] shadow-md mb-2">
                <img 
                  src={couple?.bride_photo_url || '/themes/adiba-portrait.png'} 
                  alt={brideNick}
                  className="w-full h-full object-cover object-top rounded-[50%]"
                />
              </div>

              {/* Script Nickname */}
              <p 
                className="text-3xl sm:text-4xl text-[#5c131c] tracking-wide my-1 select-none"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {brideNick}
              </p>

              {/* Full Name in All-Caps Serif */}
              <h3 
                className="text-base sm:text-lg text-[#5c131c] font-bold tracking-[0.14em] uppercase font-serif mt-0.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {brideFullName}
              </h3>

              {/* Parents Info */}
              <p className="text-xs sm:text-[13px] text-[#4e1b22] font-serif leading-relaxed mt-2 max-w-[260px]">
                Putri dari Pasangan Bapak {couple?.bride_father_name || 'Anas Rifai'}<br />
                &amp; Ibu {couple?.bride_mother_name || 'Kholifah'}
              </p>

              {/* Circular Maroon Instagram Button */}
              <a
                href={`https://instagram.com/${(couple?.bride_instagram || 'adibasyakilla').replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${brideNick}`}
                className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* ========================================================================= */}
            {/* FLORAL AMPERSAND DIVIDER (Matching Reference)                            */}
            {/* ========================================================================= */}
            <div className="flex items-center justify-center my-7 select-none">
              <img 
                src="/themes/floral-ampersand.png" 
                alt="&" 
                className="w-7 h-9 object-contain drop-shadow-xs"
              />
            </div>

            {/* ========================================================================= */}
            {/* GROOM (Habib - Comes Second Matching Reference)                          */}
            {/* ========================================================================= */}
            <div className="w-full flex flex-col items-center">
              {/* Groom Oval Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[1.5px] border-[#5c131c]/50 p-1 bg-[#fbf7f0] shadow-md mb-2">
                <img 
                  src={couple?.groom_photo_url || '/themes/habib-portrait.png'} 
                  alt={groomNick}
                  className="w-full h-full object-cover object-top rounded-[50%]"
                />
              </div>

              {/* Script Nickname */}
              <p 
                className="text-3xl sm:text-4xl text-[#5c131c] tracking-wide my-1 select-none"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {groomNick}
              </p>

              {/* Full Name in All-Caps Serif */}
              <h3 
                className="text-base sm:text-lg text-[#5c131c] font-bold tracking-[0.14em] uppercase font-serif mt-0.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomFullName}
              </h3>

              {/* Parents Info */}
              <p className="text-xs sm:text-[13px] text-[#4e1b22] font-serif leading-relaxed mt-2 max-w-[260px]">
                Putra dari Pasangan Bapak {couple?.groom_father_name || 'H. M. Dawam'}<br />
                &amp; Ibu {couple?.groom_mother_name || 'Dewi Sudarwati (Almh)'}
              </p>

              {/* Circular Maroon Instagram Button */}
              <a
                href={`https://instagram.com/${(couple?.groom_instagram || 'habibyulianto').replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${groomNick}`}
                className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COUNTDOWN TIMER SECTION (Menuju Hari Bahagia)                           */}
        {/* ========================================================================= */}
        <section className="py-14 px-5 sm:px-8 relative z-10 bg-[#3d1117] text-white text-center shadow-inner overflow-hidden">
          <div className="max-w-md mx-auto space-y-6">
            <p className="text-xs uppercase tracking-[0.25em] text-[#e8c5b8] font-sans font-medium">
              Waktu Menuju Bahagia
            </p>
            <h2 
              className="text-3xl sm:text-4xl text-[#fff8ea] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Menuju Hari Bahagia
            </h2>

            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto pt-2">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="flex flex-col items-center bg-[#290a0f] border border-[#df9b8e]/35 rounded-2xl py-3 px-1 shadow-md"
                >
                  <span 
                    className="text-2xl sm:text-3xl text-[#f3da9f] font-normal"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {String(item.value)}
                  </span>
                  <span className="text-[10px] text-[#e8c5b8] font-serif uppercase tracking-wider mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#e8c5b8]/90 font-serif italic pt-1">
              {formatEventDate(targetDateStr)}
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. RANGKAIAN ACARA (Wedding Events)                                       */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#fbf7f0]">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Agenda Bahagia
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Rangkaian Acara
              </h2>
              <JavaneseDivider />
            </div>

            <div className="space-y-6">
              {displayEvents.map((evt, idx) => (
                <div 
                  key={evt.id || idx}
                  className="bg-[#fdfaf5] border border-[#8c2d38]/25 rounded-[2rem] p-6 shadow-md relative overflow-hidden text-center space-y-3"
                >
                  <JavaneseBatikCorner className="absolute top-2 left-2 w-14 h-14" />
                  <JavaneseBatikCorner className="absolute top-2 right-2 w-14 h-14 -scale-x-100" />
                  
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#8c2d38]/10 text-[#8c2d38] text-[11px] font-serif uppercase tracking-widest font-semibold">
                    {evt.name}
                  </span>

                  <h3 
                    className="text-2xl text-[#4e0e16] font-normal pt-1"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {evt.name}
                  </h3>

                  <div className="space-y-1 text-xs text-[#5c242c] font-serif">
                    <p className="font-semibold text-sm text-[#3d1117]">
                      {formatEventDate(evt.event_date)}
                    </p>
                    <p className="flex items-center justify-center gap-1.5 text-[#8c2d38]">
                      <Clock className="w-3.5 h-3.5" />
                      Pukul : {evt.start_time} - {evt.end_time || 'Selesai'}
                    </p>
                  </div>

                  <div className="border-t border-[#8c2d38]/15 pt-3 space-y-1">
                    <p className="text-sm font-semibold text-[#4e0e16]">
                      {evt.location}
                    </p>
                    <p className="text-xs text-[#6e2b34] leading-relaxed px-4">
                      {evt.address || 'Kawasan Candi Borobudur, Jawa Tengah'}
                    </p>
                  </div>

                  {evt.maps_url && (
                    <div className="pt-2">
                      <a
                        href={evt.maps_url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#8c2d38] hover:bg-[#6e1e27] text-white text-xs font-serif uppercase tracking-wider transition-all shadow-md cursor-pointer"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Buka Google Maps</span>
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. LOVE STORY (Kisah Cinta Kami)                                          */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#f7f0e6] border-y border-[#8c2d38]/15">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Perjalanan Kasih
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kisah Cinta Kami
              </h2>
              <JavaneseDivider />
            </div>

            <div className="relative border-l-2 border-[#8c2d38]/30 ml-4 sm:ml-6 space-y-8 text-left">
              {displayStories.map((story, i) => (
                <div key={i} className="relative pl-6 sm:pl-8">
                  {/* Timeline Badge */}
                  <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#8c2d38] border-2 border-[#f7f0e6] shadow-sm" />

                  <div className="bg-[#fbf7f0] rounded-2xl p-4 sm:p-5 shadow-sm border border-[#8c2d38]/20 space-y-1.5">
                    <span className="text-[11px] font-sans font-bold text-[#8c2d38] tracking-widest uppercase">
                      {story.year}
                    </span>
                    <h4 
                      className="text-lg text-[#4e0e16] font-medium"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {story.title}
                    </h4>
                    <p className="text-xs text-[#5c242c] font-serif leading-relaxed">
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. GALERI MOMEN BAHAGIA (Gallery & Lightbox)                               */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#fbf7f0]">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Potret Bahagia
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Galeri Kenangan
              </h2>
              <JavaneseDivider />
            </div>

            <div className="grid grid-cols-2 gap-3">
              {displayGallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIdx(idx)}
                  className={`${item.span} ${item.aspect} rounded-2xl overflow-hidden shadow-md border border-[#8c2d38]/25 relative group cursor-pointer`}
                >
                  <img 
                    src={item.image_url} 
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <span className="text-xs text-white font-serif italic">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Lightbox Modal */}
        {activeLightboxIdx !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setActiveLightboxIdx(null)}
          >
            <button 
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
              onClick={() => setActiveLightboxIdx(null)}
            >
              <X className="w-7 h-7" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx(prev => (prev! > 0 ? prev! - 1 : displayGallery.length - 1));
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img 
              src={displayGallery[activeLightboxIdx].image_url} 
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx(prev => (prev! < displayGallery.length - 1 ? prev! + 1 : 0));
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 8. AMPLOP DIGITAL / WEDDING GIFT                                          */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#f7f0e6] border-y border-[#8c2d38]/15">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Tanda Kasih
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Amplop Digital
              </h2>
              <JavaneseDivider />
              <p className="text-xs text-[#5c242c] font-serif leading-relaxed px-4">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika Anda ingin memberikan tanda kasih, Anda dapat melalui:
              </p>
            </div>

            <div className="space-y-4">
              {displayGifts.map((gift, idx) => (
                <div 
                  key={idx}
                  className="bg-[#fbf7f0] rounded-2xl p-5 shadow-sm border border-[#8c2d38]/25 text-left space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between border-b border-[#8c2d38]/15 pb-2">
                    <span className="font-sans font-bold text-sm text-[#4e0e16] tracking-wider">
                      {gift.provider}
                    </span>
                    <CreditCard className="w-4 h-4 text-[#8c2d38]" />
                  </div>

                  <div className="space-y-0.5">
                    <p className="text-[11px] text-[#7a2832] font-serif">Nomor Rekening :</p>
                    <p className="text-lg font-mono font-bold text-[#3d1117] tracking-wider">
                      {gift.account_number}
                    </p>
                    <p className="text-xs text-[#5c242c] font-serif">
                      a.n {gift.account_name}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(gift.account_number, idx)}
                    className="w-full py-2 px-4 rounded-xl bg-[#8c2d38]/10 hover:bg-[#8c2d38] text-[#8c2d38] hover:text-white transition-all text-xs font-serif flex items-center justify-center gap-1.5 cursor-pointer border border-[#8c2d38]/25"
                  >
                    {copiedIndex === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Salin Nomor Rekening</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. DOA & UCAPAN RESTU (RSVP & Wishes)                                     */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#fbf7f0]">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Doa &amp; Kehadiran
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Ucapan &amp; Doa Restu
              </h2>
              <JavaneseDivider />
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitWish} className="bg-[#f7f0e6] rounded-[2rem] p-6 shadow-sm border border-[#8c2d38]/25 text-left space-y-4">
              <div>
                <label className="block text-xs font-serif text-[#4e0e16] mb-1 font-semibold">
                  Nama Anda :
                </label>
                <input
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Tuliskan nama Anda..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c2d38]/30 bg-[#fbf7f0] text-sm text-[#3d1117] focus:outline-none focus:border-[#8c2d38]"
                />
              </div>

              <div>
                <label className="block text-xs font-serif text-[#4e0e16] mb-1 font-semibold">
                  Konfirmasi Kehadiran :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Hadir', 'Tidak Hadir'].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setWishAttendance(opt)}
                      className={`py-2 px-3 rounded-xl border text-xs font-serif flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                        wishAttendance === opt
                          ? 'bg-[#8c2d38] text-white border-[#8c2d38]'
                          : 'bg-[#fbf7f0] text-[#6e2b34] border-[#8c2d38]/25 hover:border-[#8c2d38]'
                      }`}
                    >
                      {opt === 'Hadir' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-serif text-[#4e0e16] mb-1 font-semibold">
                  Ucapan &amp; Doa Restu :
                </label>
                <textarea
                  rows={3}
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Berikan ucapan selamat & doa restu..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#8c2d38]/30 bg-[#fbf7f0] text-sm text-[#3d1117] focus:outline-none focus:border-[#8c2d38] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#8c2d38] hover:bg-[#6e1e27] text-white text-xs font-serif uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim Ucapan</span>
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {wishes.map((w, idx) => (
                <div 
                  key={idx}
                  className="bg-[#fdfaf5] border border-[#8c2d38]/20 rounded-2xl p-4 text-left shadow-sm space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-[#4e0e16] font-serif">
                      {w.name}
                    </span>
                    <span className="text-[10px] text-white bg-[#8c2d38]/80 px-2 py-0.5 rounded-full font-sans">
                      {w.attendance}
                    </span>
                  </div>
                  <p className="text-xs text-[#5c242c] font-serif leading-relaxed">
                    {w.message}
                  </p>
                  <p className="text-[10px] text-[#9a4b56] font-sans">
                    {w.date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. PENUTUP & UCAPAN TERIMA KASIH (Closing)                               */}
        {/* ========================================================================= */}
        <section className="py-20 px-6 sm:px-8 relative z-10 bg-[#2b0c11] text-[#f5e8da] text-center overflow-hidden">
          <JavanesePetals count={6} />

          <div className="max-w-md mx-auto space-y-6 relative z-10">
            <JavaneseMonogram initials={`${groomNick[0]}${brideNick[0]}`} />

            <h2 
              className="text-3xl sm:text-4xl text-[#fff8ea] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Matur Nuwun
            </h2>

            <p className="text-xs text-[#e8c5b8] font-serif leading-relaxed px-4">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu kepada kami.
            </p>

            <p className="text-xs font-serif italic text-[#df9b8e]">
              Wassalamu’alaikum Warahmatullahi Wabarakatuh
            </p>

            <JavaneseDivider className="opacity-60" />

            <p className="text-sm font-serif font-semibold text-[#f3da9f] tracking-wide">
              Kami yang Berbahagia :
            </p>
            <p 
              className="text-2xl text-[#ffffff] font-normal"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {groomNick} &amp; {brideNick}
            </p>
            <p className="text-xs text-[#e8c5b8]/80 font-serif">
              Beserta Seluruh Keluarga Besar
            </p>

            <div className="pt-8 text-[11px] text-[#e8c5b8]/60 font-sans tracking-widest uppercase">
              WD Group Solo • Digital Wedding Invitation
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
