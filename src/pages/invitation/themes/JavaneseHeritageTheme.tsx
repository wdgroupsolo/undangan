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

// Intertwined Calligraphic Monogram Emblem (Matches User Reference Top Logo)
const JavaneseMonogram: React.FC<{ initials?: string; className?: string }> = ({ 
  initials = 'HA', 
  className = '' 
}) => (
  <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
    <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center relative">
      {/* Outer Hairline Rings with Batik Accents */}
      <div className="absolute inset-0 rounded-full border border-[#8c2d38]/25 scale-95" />
      <div className="absolute inset-1.5 rounded-full border border-[#8c2d38]/40" />
      
      {/* 4 Cardinal Dot Accents */}
      <span className="absolute top-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
      <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
      <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
      <span className="absolute right-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />

      {/* Intertwined Calligraphic Monogram SVG */}
      <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 text-[#6a1a24] drop-shadow-sm">
        {/* Letter H Flourish */}
        <path 
          d="M32 24 C32 24, 30 45, 30 74 M46 26 C46 26, 44 47, 44 72 M28 48 C36 47, 44 47, 48 48" 
          stroke="currentColor" 
          strokeWidth="3.2" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Curving Swash Over Letter A */}
        <path 
          d="M24 32 C35 15, 60 16, 70 34 C76 46, 75 62, 64 72 C55 80, 36 78, 40 60 C42 50, 56 46, 68 54" 
          stroke="currentColor" 
          strokeWidth="2.4" 
          strokeLinecap="round" 
          fill="none" 
        />
        {/* Letter A / D Arch */}
        <path 
          d="M54 74 L66 26 L76 74 M58 58 L72 58" 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          fill="none" 
        />
      </svg>
    </div>
  </div>
);

// Floating Floral & Gold Sparkle Particles
const JavanesePetals: React.FC<{ count?: number }> = ({ count = 10 }) => {
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
  const [hasOpened, setHasOpened] = useState<boolean>(false);
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
    return 'Habibie Pratama Putra, S.T.';
  })();

  const brideFullName = (() => {
    const full = couple?.bride_full_name?.trim();
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'bunga lestari') return full;
    return 'Adiba Shakila Az-Zahra, S.Ked.';
  })();

  // Events fallback
  const defaultEvents = [
    {
      id: 'default-akad',
      name: 'Akad Nikah',
      event_date: '2026-10-12',
      start_time: '08.00',
      end_time: '10.00 WIB',
      location: 'Pendopo Agung Candi Borobudur',
      address: 'Kawasan Wisata Candi Borobudur, Magelang, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Candi+Borobudur',
    },
    {
      id: 'default-resepsi',
      name: 'Resepsi Pernikahan',
      event_date: '2026-10-12',
      start_time: '11.00',
      end_time: '14.00 WIB',
      location: 'Grand Heritage Ballroom',
      address: 'Plataran Heritage Borobudur, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Plataran+Heritage+Borobudur',
    }
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  // Countdown timer
  const targetDateStr = displayEvents?.[0]?.event_date || '2026-10-12';
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
    if (!dateStr) return 'Sabtu, 12 Oktober 2026';
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
      return 'Sabtu, 12 Oktober 2026';
    } catch {
      return 'Sabtu, 12 Oktober 2026';
    }
  };

  const handleOpenInvitation = () => {
    setHasOpened(true);
    try {
      window.dispatchEvent(new CustomEvent('wedding:play-bgm'));
    } catch (_) {}
    // Smooth scroll down slightly to quote
    setTimeout(() => {
      const quoteEl = document.getElementById('ayat-section');
      if (quoteEl) {
        quoteEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

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
        {/* 1. HERO / COVER CARD (Exact recreation of user reference screenshot)       */}
        {/* ========================================================================= */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-between text-center px-4 py-8 overflow-hidden select-none">
          
          {/* Background Scene: Authentic Borobudur Stupas & Vintage Orchid Borders */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Backdrop" 
              className="w-full h-full object-cover object-center origin-center"
            />
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0]/20 via-transparent to-[#fbf7f0]/30" />
          </div>

          {/* Floating Petals Drift */}
          <JavanesePetals count={10} />

          {/* Top Monogram Logo (Intertwined H & A / H & D from reference image) */}
          <div className="relative z-10 pt-4 sm:pt-6">
            <JavaneseMonogram initials={`${groomNick[0]}${brideNick[0]}`} />
          </div>

          {/* Main Title & Couple Names */}
          <div className="relative z-10 my-auto py-6 space-y-3">
            <p 
              className="text-[11px] sm:text-xs tracking-[0.3em] uppercase text-[#6a1a24] font-serif font-semibold drop-shadow-sm"
            >
              THE WEDDING OF
            </p>

            <h1 
              className="text-4xl sm:text-5xl text-[#58141e] font-normal tracking-wide drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {groomNick.toUpperCase()} <span className="font-light italic text-[#8c2d38]">&amp;</span> {brideNick.toUpperCase()}
            </h1>

            {/* Guest Invitation Box */}
            <div className="pt-4 space-y-1">
              <p className="text-xs sm:text-sm text-[#7a2832] font-serif italic">
                Dear :
              </p>
              <h3 
                className="text-xl sm:text-2xl text-[#3d1117] font-serif italic font-medium tracking-wide drop-shadow-sm"
              >
                {guestName}
              </h3>
            </div>
          </div>

          {/* Bottom Action: "BUKA UNDANGAN" Button */}
          <div className="relative z-10 pb-6 w-full max-w-[280px]">
            <button
              onClick={handleOpenInvitation}
              className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_8px_25px_rgba(106,26,36,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#7c1d29] via-[#63141f] to-[#4e0e16] border border-[#d4af37]/50"
            >
              {/* Shimmer Light Ray */}
              <div 
                className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full"
                style={{ animation: 'shimmer-sweep-gold 2.6s ease-in-out infinite' }}
              />

              <div className="relative flex items-center justify-center gap-2">
                <span className="text-xs sm:text-sm font-serif font-bold uppercase tracking-[0.25em] text-[#fff6e6] drop-shadow-sm">
                  BUKA UNDANGAN
                </span>
                <Sparkles className="w-3.5 h-3.5 text-[#f3da9f]" />
              </div>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. AYAT SUCI & DOA SECTION (QS Ar-Rum 21)                                  */}
        {/* ========================================================================= */}
        <section id="ayat-section" className="py-16 px-6 sm:px-8 relative z-10 bg-[#fbf7f0] border-t border-[#8c2d38]/15 text-center">
          <div className="max-w-md mx-auto space-y-5">
            {/* Arabic Bismillah */}
            <p className="text-xl sm:text-2xl text-[#6a1a24] font-serif tracking-widest leading-loose">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            <JavaneseDivider />

            <p className="text-xs sm:text-[13px] text-[#4a1c22] font-serif italic leading-relaxed px-2">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
            </p>

            <p className="text-xs font-serif font-semibold text-[#8c2d38] uppercase tracking-widest">
              — QS. Ar-Rum Ayat 21 —
            </p>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. KEDUA MEMPELAI (The Couple)                                           */}
        {/* ========================================================================= */}
        <section className="py-16 px-5 sm:px-8 relative z-10 bg-[#f7f0e6] border-y border-[#8c2d38]/15">
          <div className="max-w-md mx-auto text-center space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8c2d38] font-serif font-semibold">
                Sang Mempelai
              </p>
              <h2 
                className="text-3xl sm:text-4xl text-[#4e0e16] font-normal mt-1"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kedua Mempelai
              </h2>
              <JavaneseDivider />
              <p className="text-xs text-[#5c242c] font-serif leading-relaxed px-3">
                Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami bermaksud melangsungkan pernikahan:
              </p>
            </div>

            {/* Groom Profile */}
            <div className="bg-[#fbf7f0] rounded-[2rem] p-6 shadow-md border border-[#8c2d38]/20 relative overflow-hidden">
              <JavaneseBatikCorner className="absolute -top-3 -left-3 w-16 h-16" />
              <JavaneseBatikCorner className="absolute -bottom-3 -right-3 w-16 h-16 -scale-100" />
              
              <div className="relative z-10 flex flex-col items-center space-y-3">
                <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-[50%] overflow-hidden border-2 border-[#8c2d38] p-1 bg-[#fffaf5] shadow-lg">
                  <img 
                    src={couple?.groom_photo_url || '/groom-default.png'} 
                    alt={groomNick}
                    className="w-full h-full object-cover object-top rounded-[50%]"
                  />
                </div>
                <h3 
                  className="text-2xl text-[#4e0e16] font-normal"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#63272e] font-serif leading-relaxed">
                  Putra dari Pasangan :<br />
                  <span className="font-semibold text-[#3d1117]">
                    Bapak {couple?.groom_father_name || 'H. Ahmad Supriyanto'} &amp; Ibu {couple?.groom_mother_name || 'Hj. Siti Aminah'}
                  </span>
                </p>
                <a
                  href={`https://instagram.com/${(couple?.groom_instagram || groomNick).toLowerCase().replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8c2d38]/10 text-[#8c2d38] border border-[#8c2d38]/30 hover:bg-[#8c2d38] hover:text-white transition-all text-xs font-sans"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{couple?.groom_instagram || groomNick.toLowerCase()}</span>
                </a>
              </div>
            </div>

            <div className="text-2xl font-serif italic text-[#8c2d38]">&amp;</div>

            {/* Bride Profile */}
            <div className="bg-[#fbf7f0] rounded-[2rem] p-6 shadow-md border border-[#8c2d38]/20 relative overflow-hidden">
              <JavaneseBatikCorner className="absolute -top-3 -left-3 w-16 h-16" />
              <JavaneseBatikCorner className="absolute -bottom-3 -right-3 w-16 h-16 -scale-100" />
              
              <div className="relative z-10 flex flex-col items-center space-y-3">
                <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-[50%] overflow-hidden border-2 border-[#8c2d38] p-1 bg-[#fffaf5] shadow-lg">
                  <img 
                    src={couple?.bride_photo_url || '/bride-default.png'} 
                    alt={brideNick}
                    className="w-full h-full object-cover object-top rounded-[50%]"
                  />
                </div>
                <h3 
                  className="text-2xl text-[#4e0e16] font-normal"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#63272e] font-serif leading-relaxed">
                  Putri dari Pasangan :<br />
                  <span className="font-semibold text-[#3d1117]">
                    Bapak {couple?.bride_father_name || 'H. Bambang Sugiarto'} &amp; Ibu {couple?.bride_mother_name || 'Hj. Endang Lestari'}
                  </span>
                </p>
                <a
                  href={`https://instagram.com/${(couple?.bride_instagram || brideNick).toLowerCase().replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#8c2d38]/10 text-[#8c2d38] border border-[#8c2d38]/30 hover:bg-[#8c2d38] hover:text-white transition-all text-xs font-sans"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@{couple?.bride_instagram || brideNick.toLowerCase()}</span>
                </a>
              </div>
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
