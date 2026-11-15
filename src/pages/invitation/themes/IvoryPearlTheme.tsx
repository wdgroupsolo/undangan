import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, Compass, MessageCircle, ChevronDown, 
  ExternalLink, Disc, Share2, Award, Bookmark
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
// CORNER ORNAMENT (Minimalist Editorial Double Hairline)
// =========================================================================
export const PearlCorner: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  size?: number;
  className?: string;
}> = ({ position, size = 36, className = '' }) => {
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
      {/* Outer hairline border */}
      <path d="M 2 46 L 2 14 Q 2 2 14 2 L 46 2" stroke="#C5A880" strokeWidth="1.2" strokeOpacity="0.8" fill="none" />
      {/* Inner hairline accent */}
      <path d="M 7 42 L 7 15 Q 7 7 15 7 L 42 7" stroke="#D9C2A4" strokeWidth="0.8" strokeOpacity="0.55" fill="none" />
      {/* Delicate pearl dot */}
      <circle cx="12" cy="12" r="2" fill="#B38F5C" opacity="0.9" />
    </svg>
  );
};

// =========================================================================
// FLOATING PEARL SHIMMER (Subtle Warm Atmospheric Particles)
// =========================================================================
export const PearlShimmer: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <style>{`
        @keyframes floatPearl {
          0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          25% { opacity: 0.65; }
          75% { opacity: 0.55; }
          100% { transform: translateY(-360px) rotate(160deg); opacity: 0; }
        }
      `}</style>
      {[
        { left: '10%', top: '30%', size: 3.5, dur: '13s', delay: '0s' },
        { left: '26%', top: '68%', size: 2.5, dur: '16s', delay: '2.5s' },
        { left: '80%', top: '22%', size: 3.8, dur: '12s', delay: '1s' },
        { left: '90%', top: '78%', size: 2.2, dur: '15s', delay: '4s' },
        { left: '50%', top: '48%', size: 3, dur: '17s', delay: '2s' },
        { left: '18%', top: '88%', size: 3.2, dur: '14s', delay: '5s' },
        { left: '72%', top: '55%', size: 2.4, dur: '18s', delay: '6s' },
      ].map((p, idx) => (
        <div 
          key={idx}
          className="absolute rounded-full bg-gradient-to-tr from-[#C5A880] via-[#E8D9C5] to-[#FFFFFF] shadow-[0_0_8px_rgba(197,168,128,0.5)]"
          style={{
            left: p.left,
            top: p.top,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animation: `floatPearl ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

interface IvoryPearlThemeProps {
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

export const IvoryPearlTheme: React.FC<IvoryPearlThemeProps> = ({
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
      message: 'Selamat menempuh hidup baru untuk Steven & Bunga. Semoga menjadi keluarga sakinah, mawaddah, warahmah serta senantiasa diberkahi rezeki dan kebahagiaan.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: '2',
      name: 'Rian & Sarah',
      message: 'Happy wedding day! Tema undangannya sangat cantik dan elegan. Semoga cinta kalian selalu bertumbuh sampai maut memisahkan.',
      date: '1 jam yang lalu',
      status: 'attending'
    },
    {
      id: '3',
      name: 'Keluarga Besar Alumni',
      message: 'Baarakallahu laka wa baaraka alaika wa jamaa bainakuma fii khoir. Doa terbaik untuk kalian berdua di hari yang sakral ini.',
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

  // Copy bank account helper
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

  // Couple display data
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
      location_name: 'Masjid Agung Al-Barkah',
      address: 'Jl. Merdeka No. 45, Kebayoran Baru, Jakarta Selatan',
      maps_url: 'https://maps.google.com'
    },
    {
      id: 'resepsi',
      title: 'Resepsi Pernikahan',
      date: 'Sabtu, 26 Desember 2026',
      time: '11:00 - 14:00 WIB',
      location_name: 'The Pearl Ballroom Hotel Grand Cemerlang',
      address: 'Jl. Jenderal Sudirman Kav. 12, Jakarta Pusat',
      maps_url: 'https://maps.google.com'
    }
  ];

  // Gallery items (Starter tier: 3 curated photos)
  const galleryItems = (gallery && gallery.length >= 3) ? gallery.slice(0, 3) : [
    { id: 'g1', image_url: couplePhoto, caption: 'Janji Suci Dua Insan' },
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

  const scrollToSection = (id: string, tab: typeof activeTab) => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2C2723] font-sans selection:bg-[#C5A880] selection:text-white antialiased">
      
      {/* Background Subtle Pearl Gradient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,168,128,0.14),rgba(253,251,247,0))]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_120%,rgba(197,168,128,0.08),rgba(253,251,247,0))]" />
      </div>

      {/* Floating Warm Pearl Shimmer */}
      <PearlShimmer />

      {/* Main Container */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-4 pb-28">

        {/* ================================================================= */}
        {/* SECTION 1: HERO / OPENING CARD                                    */}
        {/* ================================================================= */}
        <section id="section-opening" className="min-h-[85vh] flex flex-col items-center justify-center pt-8 pb-12">
          
          <ScrollReveal animation="zoom-in" duration={850} initialVisible={true} className="w-full">
            <div className="relative w-full rounded-[34px] p-5 sm:p-6 bg-white/90 backdrop-blur-sm border border-[#EADBCC] shadow-[0_20px_50px_rgba(180,160,140,0.16),0_0_30px_rgba(197,168,128,0.1)]">
              
              {/* Double Hairline Inner Border */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-[28px] border border-[#C5A880]/30 pointer-events-none" />

              {/* Regal Four Corners */}
              <div className="absolute top-3 left-3"><PearlCorner position="top-left" size={32} /></div>
              <div className="absolute top-3 right-3"><PearlCorner position="top-right" size={32} /></div>
              <div className="absolute bottom-3 left-3"><PearlCorner position="bottom-left" size={32} /></div>
              <div className="absolute bottom-3 right-3"><PearlCorner position="bottom-right" size={32} /></div>

              {/* Content Inside Frame */}
              <div className="relative z-10 flex flex-col items-center text-center px-2 py-6 sm:py-8">
                
                {/* Top Badge: The Wedding Celebration */}
                <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FAF5EE] border border-[#C5A880]/40 mb-5 shadow-xs">
                  <Sparkles size={12} className="text-[#B38F5C]" />
                  <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.28em] text-[#8C6D3F] font-semibold">
                    The Wedding Celebration
                  </span>
                  <Sparkles size={12} className="text-[#B38F5C]" />
                </div>

                {/* Couple Prewedding Photo in Arch Frame */}
                <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-full overflow-hidden p-1.5 bg-gradient-to-b from-[#EADBCC] via-[#C5A880] to-[#9E7B4B] shadow-[0_12px_35px_rgba(180,150,120,0.25)] mb-6 group">
                  <div className="w-full h-full rounded-full overflow-hidden relative">
                    <img 
                      src={couplePhoto} 
                      alt={`${groomName} & ${brideName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Couple Names in Elegant Serif */}
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2A241E] drop-shadow-xs mb-2">
                  {groomName} <span className="font-light italic text-[#B38F5C]">&amp;</span> {brideName}
                </h1>

                {/* Wedding Date */}
                <p className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase text-[#6B6158] mb-6 font-medium">
                  {new Date(weddingDateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>

                {/* Guest Greeting Pill */}
                <div className="w-full max-w-xs p-3 rounded-2xl bg-[#FAF6F0] border border-[#C5A880]/35 shadow-xs mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-[#7D736A] block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#8C6D3F] block truncate">
                    {guestName}
                  </span>
                </div>

                {/* Countdown Timer */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-sm pt-2 border-t border-[#EADBCC]">
                  {[
                    { label: 'Hari', val: timeLeft.days },
                    { label: 'Jam', val: timeLeft.hours },
                    { label: 'Menit', val: timeLeft.minutes },
                    { label: 'Detik', val: timeLeft.seconds },
                  ].map((item, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center justify-center p-2 rounded-xl bg-[#FAF6F0] border border-[#C5A880]/30 shadow-xs"
                    >
                      <span className="font-mono text-lg sm:text-xl font-bold text-[#8C6D3F]">
                        {String(item.val).padStart(2, '0')}
                      </span>
                      <span className="text-[9px] uppercase tracking-wider text-[#7D736A] font-semibold mt-0.5">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

              </div>

            </div>
          </ScrollReveal>

          {/* Scroll Down Prompt */}
          <div className="flex flex-col items-center gap-1.5 mt-6 text-[#9E7B4B] animate-bounce">
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll Ke Bawah</span>
            <ChevronDown size={14} />
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 2: GREETING & AYAT SUCI                                   */}
        {/* ================================================================= */}
        <section className="py-12 text-center">
          <ScrollReveal animation="fade-up">
            <div className="relative p-6 sm:p-8 rounded-[30px] bg-white/80 border border-[#EADBCC] shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#FAF5EE] border border-[#C5A880]/40 flex items-center justify-center mx-auto mb-4 text-[#B38F5C]">
                <Heart size={18} fill="#C5A880" fillOpacity={0.2} />
              </div>

              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-3">
                Doa &amp; Harapan Suci
              </span>

              <p className="font-serif italic text-sm sm:text-base text-[#4A423B] leading-relaxed max-w-md mx-auto mb-4">
                &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
              </p>
              
              <span className="text-xs font-sans tracking-widest uppercase text-[#8C6D3F] font-semibold">
                (QS. Ar-Rum: 21)
              </span>
            </div>
          </ScrollReveal>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: BRIDE & GROOM PROFILE                                  */}
        {/* ================================================================= */}
        <section id="section-couple" className="py-12 space-y-8">
          
          <ScrollReveal animation="fade-up" className="text-center mb-8">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-2">
              Kedua Mempelai
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A241E]">
              Maha Suci Allah yang Mempersatukan
            </h2>
            <p className="text-xs text-[#6B6158] max-w-sm mx-auto mt-2">
              Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan pernikahan putra-putri kami:
            </p>
          </ScrollReveal>

          {/* Groom Card */}
          <ScrollReveal animation="slide-left" delay={100}>
            <div className="relative rounded-[28px] p-5 sm:p-6 bg-white border border-[#EADBCC] shadow-sm flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#C5A880] to-[#EADBCC] shrink-0 shadow-md">
                <img 
                  src={groomPhoto} 
                  alt={groomFullName}
                  className="w-full h-full object-cover object-center rounded-full" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C6D3F] border border-[#C5A880]/30 text-[10px] uppercase font-bold tracking-wider">
                  Mempelai Pria
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A241E]">
                  {groomFullName}
                </h3>
                <p className="text-xs text-[#5A524C] leading-relaxed">
                  {groomParents}
                </p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6D3F] hover:text-[#5C4524] transition-colors pt-1 font-medium"
                >
                  <InstagramIcon size={14} />
                  <span>@{groomName.toLowerCase()}_pratama</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Ampersand Divider */}
          <div className="flex items-center justify-center py-2">
            <div className="w-12 h-[1px] bg-[#C5A880]/40" />
            <span className="font-serif italic text-2xl text-[#8C6D3F] px-4 font-light">&amp;</span>
            <div className="w-12 h-[1px] bg-[#C5A880]/40" />
          </div>

          {/* Bride Card */}
          <ScrollReveal animation="slide-right" delay={150}>
            <div className="relative rounded-[28px] p-5 sm:p-6 bg-white border border-[#EADBCC] shadow-sm flex flex-col sm:flex-row-reverse items-center gap-5 text-center sm:text-right">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-[#C5A880] to-[#EADBCC] shrink-0 shadow-md">
                <img 
                  src={bridePhoto} 
                  alt={brideFullName}
                  className="w-full h-full object-cover object-center rounded-full" 
                />
              </div>
              <div className="flex-1 space-y-2">
                <span className="inline-block px-3 py-0.5 rounded-full bg-[#FAF5EE] text-[#8C6D3F] border border-[#C5A880]/30 text-[10px] uppercase font-bold tracking-wider">
                  Mempelai Wanita
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A241E]">
                  {brideFullName}
                </h3>
                <p className="text-xs text-[#5A524C] leading-relaxed">
                  {brideParents}
                </p>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#8C6D3F] hover:text-[#5C4524] transition-colors pt-1 font-medium"
                >
                  <InstagramIcon size={14} />
                  <span>@{brideName.toLowerCase()}_lestari</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

        </section>

        {/* ================================================================= */}
        {/* SECTION 4: EVENTS / ACARA PERNIKAHAN                              */}
        {/* ================================================================= */}
        <section id="section-event" className="py-12 space-y-6">
          
          <ScrollReveal animation="fade-up" className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-2">
              Jadwal &amp; Lokasi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A241E]">
              Rangkaian Acara Pernikahan
            </h2>
          </ScrollReveal>

          {mainEvents.map((evt, idx) => (
            <ScrollReveal key={evt.id || idx} animation="fade-up" delay={idx * 150}>
              <div className="relative rounded-[30px] p-6 bg-white border border-[#EADBCC] shadow-sm hover:border-[#C5A880]/60 transition-colors">
                
                {/* Event Title with Decorative Icon */}
                <div className="flex items-center justify-between border-b border-[#EADBCC] pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#FAF5EE] border border-[#C5A880]/40 flex items-center justify-center text-[#8C6D3F]">
                      <Calendar size={15} />
                    </div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A241E]">
                      {evt.title}
                    </h3>
                  </div>
                  <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#8C6D3F] bg-[#FAF5EE] px-3 py-1 rounded-full border border-[#C5A880]/30">
                    Sesi {idx + 1}
                  </span>
                </div>

                {/* Event Details */}
                <div className="space-y-3.5 mb-6 text-sm text-[#4A423B]">
                  <div className="flex items-start gap-3">
                    <Calendar size={16} className="text-[#8C6D3F] shrink-0 mt-0.5" />
                    <span className="font-medium">{evt.date}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={16} className="text-[#8C6D3F] shrink-0 mt-0.5" />
                    <span>{evt.time}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={16} className="text-[#8C6D3F] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#2A241E]">{evt.location_name}</p>
                      <p className="text-xs text-[#6B6158] mt-0.5">{evt.address}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <a 
                    href={evt.maps_url || 'https://maps.google.com'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#FAF5EE] hover:bg-[#F2E8DC] border border-[#C5A880]/40 text-xs font-semibold text-[#8C6D3F] transition-colors"
                  >
                    <Compass size={14} />
                    <span>Google Maps</span>
                  </a>

                  <a 
                    href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title + ' ' + groomName + ' & ' + brideName)}&details=${encodeURIComponent('Pernikahan ' + groomName + ' & ' + brideName + ' di ' + evt.location_name)}&location=${encodeURIComponent(evt.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#2A241E] hover:bg-[#3D352D] text-white text-xs font-semibold transition-colors"
                  >
                    <Bookmark size={14} />
                    <span>Simpan Agenda</span>
                  </a>
                </div>

              </div>
            </ScrollReveal>
          ))}

        </section>

        {/* ================================================================= */}
        {/* SECTION 5: GALLERY SHOWCASE                                       */}
        {/* ================================================================= */}
        <section id="section-gallery" className="py-12 space-y-6">
          
          <ScrollReveal animation="fade-up" className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-2">
              Galeri Momen
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A241E]">
              Potret Kebahagiaan
            </h2>
            <p className="text-xs text-[#6B6158] max-w-sm mx-auto mt-2">
              Setiap potret merekam senyuman dan komitmen cinta kami berdua.
            </p>
          </ScrollReveal>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {galleryItems.map((item, idx) => (
              <ScrollReveal key={item.id || idx} animation="zoom-in" delay={idx * 100}>
                <div 
                  onClick={() => setSelectedPhoto(item.image_url)}
                  className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-[4/5] bg-[#EADBCC] border border-[#EADBCC] shadow-xs"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.caption || 'Foto Prewedding'} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                    <p className="text-[11px] text-white font-medium">{item.caption}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Lightbox Modal */}
          {selectedPhoto && (
            <div 
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
            >
              <div className="relative max-w-lg max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={selectedPhoto} 
                  alt="Enlarged Photo" 
                  className="w-full h-full object-contain" 
                />
              </div>
            </div>
          )}

        </section>

        {/* ================================================================= */}
        {/* SECTION 6: WEDDING GIFT / KADO DIGITAL                            */}
        {/* ================================================================= */}
        <section id="section-gift" className="py-12 space-y-6">
          
          <ScrollReveal animation="fade-up" className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-2">
              Tanda Kasih
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A241E]">
              Kado &amp; Amplop Digital
            </h2>
            <p className="text-xs text-[#6B6158] max-w-sm mx-auto mt-2 leading-relaxed">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika hendak memberikan tanda kasih, dapat melalui rekening berikut:
            </p>
          </ScrollReveal>

          {/* Bank Cards */}
          <div className="space-y-4">
            {bankAccounts.map((bank, idx) => (
              <ScrollReveal key={bank.id || idx} animation="fade-up" delay={idx * 120}>
                <div className="relative rounded-[26px] p-5 sm:p-6 bg-white border border-[#EADBCC] shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#FAF5EE] border border-[#C5A880]/40 flex items-center justify-center text-[#8C6D3F]">
                        <Gift size={18} />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#2A241E] uppercase tracking-wider block">
                          {bank.bank_name}
                        </span>
                        <span className="text-[11px] text-[#7D736A]">Transfer Bank Digital</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-serif font-bold uppercase tracking-wider text-[#8C6D3F] bg-[#FAF5EE] px-2.5 py-1 rounded-full border border-[#C5A880]/30">
                      Terverifikasi
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF6F0] border border-[#EADBCC] flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#7D736A]">Nomor Rekening:</p>
                      <p className="font-mono text-base sm:text-lg font-bold text-[#2A241E] tracking-wider mt-0.5">
                        {bank.account_number}
                      </p>
                      <p className="text-xs text-[#5A524C] mt-0.5">
                        a.n {bank.account_holder}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopy(bank.account_number, bank.id)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                        copiedAccount === bank.id
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#2A241E] hover:bg-[#3D352D] text-white'
                      }`}
                    >
                      {copiedAccount === bank.id ? (
                        <>
                          <Check size={14} />
                          <span>Tersalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={14} />
                          <span>Salin No.</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </section>

        {/* ================================================================= */}
        {/* SECTION 7: RSVP & WISHES                                          */}
        {/* ================================================================= */}
        <section id="section-wishes" className="py-12 space-y-6">
          
          <ScrollReveal animation="fade-up" className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] text-[#8C6D3F] font-bold block mb-2">
              Konfirmasi Kehadiran
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A241E]">
              RSVP &amp; Doa Restu
            </h2>
            <p className="text-xs text-[#6B6158] max-w-sm mx-auto mt-2">
              Mohon konfirmasikan kehadiran Bapak/Ibu/Saudara/i untuk kenyamanan penyelenggaraan acara.
            </p>
          </ScrollReveal>

          {/* Form Card */}
          <ScrollReveal animation="fade-up">
            <div className="relative rounded-[30px] p-6 bg-white border border-[#EADBCC] shadow-sm">
              
              {rsvpSuccess && (
                <div className="mb-5 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                  <Check size={16} className="text-emerald-600 shrink-0" />
                  <span>Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah tersimpan.</span>
                </div>
              )}

              <form onSubmit={handleSubmitRsvp} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A524C] mb-1.5">
                    Nama Lengkap *
                  </label>
                  <input 
                    type="text" 
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Contoh: Bpk. Budi Santoso & Keluarga"
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#EADBCC] text-sm text-[#2A241E] focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A524C] mb-1.5">
                    Konfirmasi Kehadiran *
                  </label>
                  <select
                    value={rsvpStatus}
                    onChange={(e) => setRsvpStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#EADBCC] text-sm text-[#2A241E] focus:outline-none focus:border-[#C5A880] transition-colors"
                  >
                    <option value="attending">✓ Hadir Memenuhi Undangan</option>
                    <option value="uncertain">? Masih Ragu / Belum Pasti</option>
                    <option value="absent">✕ Maaf, Berhalangan Hadir</option>
                  </select>
                </div>

                {rsvpStatus === 'attending' && (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#5A524C] mb-1.5">
                      Jumlah Tamu Hadir
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[1, 2, 3].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setRsvpCount(num)}
                          className={`py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            rsvpCount === num
                              ? 'bg-[#8C6D3F] text-white shadow-xs'
                              : 'bg-[#FAF6F0] text-[#5A524C] border border-[#EADBCC] hover:bg-[#F2E8DC]'
                          }`}
                        >
                          {num === 3 ? '3+ Orang' : `${num} Orang`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#5A524C] mb-1.5">
                    Ucapan &amp; Doa Restu *
                  </label>
                  <textarea 
                    value={rsvpMessage}
                    onChange={(e) => setRsvpMessage(e.target.value)}
                    rows={3}
                    placeholder="Tuliskan ucapan selamat serta doa restu untuk kedua mempelai..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF6F0] border border-[#EADBCC] text-sm text-[#2A241E] focus:outline-none focus:border-[#C5A880] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingRsvp}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2A241E] hover:bg-[#3D352D] text-white font-serif text-sm font-bold tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmittingRsvp ? 'Mengirim...' : 'Kirim RSVP & Doa Restu'}</span>
                </button>
              </form>

              {/* Wishes Feed */}
              <div className="mt-8 pt-6 border-t border-[#EADBCC] space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#5A524C]">
                    Ucapan Tamu ({wishes.length})
                  </span>
                  <span className="text-[10px] text-[#8C6D3F] font-semibold">Terkonfirmasi</span>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {wishes.map((w) => (
                    <div key={w.id} className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EADBCC] text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#2A241E]">{w.name}</span>
                        <span className="text-[10px] text-[#8C6D3F] font-medium">{w.date}</span>
                      </div>
                      <p className="text-[#5A524C] leading-relaxed mt-1">
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
          <div className="w-12 h-12 rounded-full bg-white border border-[#C5A880]/40 flex items-center justify-center mx-auto text-[#8C6D3F] shadow-xs">
            <Heart size={20} fill="#C5A880" fillOpacity={0.2} />
          </div>

          <h3 className="font-serif text-2xl font-bold text-[#2A241E]">
            {groomName} &amp; {brideName}
          </h3>

          <p className="text-xs text-[#6B6158] max-w-xs mx-auto leading-relaxed">
            Terima kasih atas doa restu dan kehadiran Bapak/Ibu/Saudara/i di hari bahagia kami.
          </p>

          <p className="text-[10px] tracking-widest uppercase text-[#9E7B4B] font-semibold pt-4">
            WD DIGITAL INVITATION • PAKET STARTER
          </p>
        </footer>

      </div>

      {/* ================================================================= */}
      {/* BOTTOM FLOATING NAVIGATION BAR                                    */}
      {/* ================================================================= */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-white/90 backdrop-blur-md border border-[#C5A880]/40 rounded-full py-2 px-3 shadow-[0_10px_30px_rgba(180,160,140,0.25)] flex items-center justify-around">
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
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-full transition-all cursor-pointer ${
                isActive
                  ? 'text-[#8C6D3F] bg-[#FAF5EE] font-bold scale-105'
                  : 'text-[#6B6158] hover:text-[#2A241E]'
              }`}
            >
              <Icon size={16} />
              <span className="text-[9px] tracking-wider uppercase mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
