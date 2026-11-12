import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, Compass, MessageCircle, ChevronDown, Crown
} from 'lucide-react';
import { SakuraFlower, SakuraLeaves, SakuraVerticalBough } from '../components/SakuraBlossoms';

// =========================================================================
// SCROLL REVEAL COMPONENT (Replays Smoothly on Scroll - "Kaya Baru Muncul")
// =========================================================================
export const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'zoom-in' | 'slide-left' | 'slide-right' | 'bloom-reveal' | 'fade-in';
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 800,
  className = '',
  once = false,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check if element is already in viewport on mount
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
      setIsVisible(true);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [once]);

  const getAnimClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10 scale-[0.97]';
        case 'fade-down':
          return 'opacity-0 -translate-y-8 scale-[0.97]';
        case 'zoom-in':
          return 'opacity-0 scale-[0.88]';
        case 'slide-left':
          return 'opacity-0 -translate-x-10';
        case 'slide-right':
          return 'opacity-0 translate-x-10';
        case 'bloom-reveal':
          return 'opacity-0 scale-[0.35] rotate-[-20deg]';
        case 'fade-in':
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0';
  };

  const timingFunction = animation === 'bloom-reveal'
    ? 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    : 'cubic-bezier(0.16, 1, 0.3, 1)';

  return (
    <div
      ref={ref}
      className={`transition-all will-change-transform ${getAnimClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        transitionTimingFunction: timingFunction,
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </div>
  );
};

interface KualaLumpurHeritageThemeProps {
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

export const KualaLumpurHeritageTheme: React.FC<KualaLumpurHeritageThemeProps> = ({
  invitation: _invitation,
  couple,
  events: _events,
  stories: _stories,
  gallery: _gallery,
  gifts: _gifts,
  guestName = 'Tuan/Puan/Saudara/Saudari',
  isOpening: _isOpening = false
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'opening' | 'profile' | 'event' | 'location' | 'rsvp' | 'gift'>('opening');
  
  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpAttendance, setRsvpAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wishes List State
  const [wishesList, setWishesList] = useState([
    {
      id: 1,
      name: 'Tengku Farhan & Isteri',
      relationship: 'Sahabat Pengantin',
      message: 'Tahniah buat Hafiz dan Syafika! Semoga bahtera perkahwinan yang dibina berkekalan hingga ke anak cucu dan sentiasa dirahmati Allah SWT.',
      time: 'Baru saja'
    },
    {
      id: 2,
      name: 'Datin Salmah & Keluarga',
      relationship: 'Keluarga',
      message: 'Barakallahu lakuma wa baraka alaikuma wa jama\'a bainakuma fi khair. Selamat melangkah ke alam perkahwinan anakanda berdua.',
      time: '1 jam yang lalu'
    },
    {
      id: 3,
      name: 'Aiman Hakimi',
      relationship: 'Rakan Sekerja',
      message: 'Selamat pengantin baru Hafiz! Semoga perkahwinan ini membawa barakah, mawaddah dan sakinah selamanya.',
      time: '3 jam yang lalu'
    }
  ]);

  // Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-28T10:00:00+08:00').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) return;

    setIsSubmittingRsvp(true);
    setTimeout(() => {
      const newWish = {
        id: Date.now(),
        name: rsvpName,
        relationship: 'Tamu Undangan',
        message: rsvpMessage,
        time: 'Baru saja'
      };
      setWishesList([newWish, ...wishesList]);
      setIsSubmittingRsvp(false);
      setRsvpSuccess(true);
      setRsvpMessage('');
      setTimeout(() => setRsvpSuccess(false), 4000);
    }, 800);
  };

  const scrollToSection = (id: string, tab: 'opening' | 'profile' | 'event' | 'location' | 'rsvp' | 'gift') => {
    setActiveTab(tab);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const groomName = couple?.groom_nickname || couple?.groom_name || 'Hafiz';
  const brideName = couple?.bride_nickname || couple?.bride_name || 'Syafika';
  const groomFullName = couple?.groom_full_name || 'Muhammad Hafiz Bin Razak';
  const brideFullName = couple?.bride_full_name || 'Nur Syafika Binti Zulkifli';

  return (
    <div className="relative w-full min-h-screen bg-[#FDF8F7] text-[#4A2D35] selection:bg-[#F0C2CC] selection:text-[#5A1D2D] font-serif overflow-x-hidden">
      
      {/* Global CSS for Animations */}
      <style>{`
        @keyframes kl-shimmer-sweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          100% { transform: translateX(250%) skewX(-20deg); }
        }
        @keyframes kl-pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(224, 83, 108, 0.3), 0 8px 25px rgba(148, 59, 78, 0.4); }
          50% { box-shadow: 0 0 30px rgba(224, 83, 108, 0.6), 0 12px 35px rgba(148, 59, 78, 0.6); }
        }
        @keyframes kl-kenburns {
          0% { transform: scale(1); }
          50% { transform: scale(1.06); }
          100% { transform: scale(1); }
        }
        .animate-kenburns {
          animation: kl-kenburns 28s ease-in-out infinite;
        }
      `}</style>

      {/* =========================================================================
          DESKTOP SPLIT LAYOUT WRAPPER (Left Panel: Sticky / Right Panel: Scrollable)
          ========================================================================= */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* =========================================================================
            LEFT PANEL (DESKTOP ONLY: Fixed 48% / 50% Panel with Photo & Guest Name)
            ========================================================================= */}
        <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#38141D] text-white">
          
          {/* Panoramic Watercolor Background with Slow Ken-Burns */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/kuala-lumpur-heritage/cover-skyline.jpg" 
              alt="Kuala Lumpur Skyline Watercolor" 
              className="w-full h-full object-cover object-center animate-kenburns filter brightness-90"
            />
            {/* Rich Rose-Wine Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#2B0B13] via-[#3B111D]/80 to-[#1F060D]/85" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#2B0B13]/40 to-[#2B0B13]/90" />
          </div>

          {/* Gilded Inner Arch Frame Line - Symmetrical Royal Border */}
          <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#D4AF37]/45 pointer-events-none z-10" />

          {/* Symmetrical Central Content Column (100% Horizontal & Vertical Balance) */}
          <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">

            {/* TOP: Symmetrical Royal Badges (Left & Right Balanced) */}
            <div className="w-full flex items-center justify-between">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#421420]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#F9E5BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Walimatulurus</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#421420]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#F9E5BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Kuala Lumpur Heritage</span>
              </div>
            </div>

            {/* CENTER: Couple Showcase & Recipient Guest Card */}
            <div className="my-auto w-full flex flex-col items-center text-center py-4">
              
              {/* Arched Couple Photo Frame with Royal Gold Songket Border */}
              <div className="relative mx-auto w-40 h-52 xl:w-48 xl:h-60 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1 bg-gradient-to-b from-[#FFF2D6] via-[#D4AF37] to-[#8C6D2B] mb-3 group">
                <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                  <img 
                    src="/themes/kuala-lumpur-heritage/couple-portrait.jpg" 
                    alt={`${groomName} & ${brideName}`}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B0B13]/70 via-transparent to-transparent pointer-events-none" />
                  {/* Shimmer light sweep */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-full rounded-b-xl">
                    <div 
                      className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                      style={{ animation: 'kl-shimmer-sweep 5s ease-in-out infinite' }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 mb-1 text-[#E8B5BE]">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                  THE WEDDING CELEBRATION OF
                </p>
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
              </div>

              {/* Couple Names */}
              <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF2F5] to-[#F5CCD5] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                {groomName} <span className="text-xl xl:text-2xl text-[#D4AF37] font-light italic font-serif">&amp;</span> {brideName}
              </h1>

              <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3" />

              {/* RECIPIENT GUEST CARD */}
              <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#4A1725]/90 via-[#360F1A]/95 to-[#240810]/98 backdrop-blur-md border border-[#D4AF37]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.25)] mb-3">
                <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />
                
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold mb-0.5 text-center">
                  Kepada Yth. Bapak/Ibu/Saudara/i :
                </p>
                
                <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                  {guestName}
                </h2>
                
                <p className="text-[9.5px] tracking-wider text-[#F0C2CC] text-center font-sans mt-0.5">
                  Merupakan satu kehormatan atas kehadiran &amp; doa restu Anda
                </p>
              </div>

              {/* Live Countdown Timer on Left Desktop Panel - Symmetrical Warm Gilded Styling */}
              <div className="w-full grid grid-cols-4 gap-2.5 text-center">
                <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#421420]/75 to-[#2B0B13]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-md">
                  <span className="block text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">{timeLeft.days}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#E8BAC5] font-sans">Hari</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#421420]/75 to-[#2B0B13]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-md">
                  <span className="block text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">{timeLeft.hours}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#E8BAC5] font-sans">Jam</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#421420]/75 to-[#2B0B13]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-md">
                  <span className="block text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">{timeLeft.minutes}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#E8BAC5] font-sans">Minit</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gradient-to-b from-[#421420]/75 to-[#2B0B13]/85 backdrop-blur-md border border-[#D4AF37]/40 shadow-md">
                  <span className="block text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] to-[#F9E5BA]">{timeLeft.seconds}</span>
                  <span className="text-[9.5px] uppercase tracking-widest text-[#E8BAC5] font-sans">Saat</span>
                </div>
              </div>

            </div>

            {/* BOTTOM: Venue Info on Desktop (Matches exact column width & horizontal balance) */}
            <div className="w-full flex items-center justify-between text-xs text-[#E8BAC5] border-t border-[#D4AF37]/35 pt-4">
              <span className="font-serif tracking-wide text-[#F9E5BA] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                Dewan Perdana Felda
              </span>
              <span className="font-sans text-[#F3D3DA]">Kuala Lumpur, Malaysia</span>
            </div>

          </div>

        </aside>

        {/* =========================================================================
            RIGHT PANEL (Scrollable Main Invitation Content)
            ========================================================================= */}
        <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen relative z-10 bg-[#FDF8F7] pb-24">

          <div className="relative max-w-[460px] mx-auto min-h-screen bg-white/80 backdrop-blur-md shadow-[0_0_50px_rgba(180,90,110,0.15)] border-x border-[#F2D6DC]/60">

            {/* Desktop Outer Flanking Botanical Sakura Boughs (Memanjang dari Atas Sampai Bawah di Area Putih Desktop) */}
            <div className="hidden lg:block pointer-events-none select-none" aria-hidden="true">
              <SakuraVerticalBough side="left" className="-left-20 xl:-left-28" />
              <SakuraVerticalBough side="right" className="-right-20 xl:-right-28" />
            </div>

            {/* ========================================================
                SECTION 1: HERO / OPENING CARD (Screenshot 2 Match)
                ======================================================== */}
            <section id="section-opening" className="relative min-h-[92vh] flex flex-col items-center justify-center p-3 sm:p-6 overflow-hidden">
              
              {/* Outer Flanking Sakura Sprays: Kiri & Kanan (Di Area Margin Luar Kartu pada Tablet & Desktop) */}
              <div className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 pointer-events-none z-15 hidden sm:flex flex-col items-center gap-8">
                <div className="relative animate-pulse" style={{ animationDuration: '6s' }}>
                  <div className="absolute -top-3 -left-3 pointer-events-none">
                    <SakuraLeaves size={58} rotation={-35} />
                  </div>
                  <SakuraFlower size={54} rotation={15} />
                  <div className="absolute -bottom-4 left-6 z-15">
                    <SakuraFlower size={36} rotation={-25} />
                  </div>
                  <div className="absolute -top-5 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white shadow-xs" />
                </div>
                <div className="relative scale-y-[-1] mt-6">
                  <div className="absolute -top-2 -left-3 pointer-events-none">
                    <SakuraLeaves size={50} rotation={30} />
                  </div>
                  <SakuraFlower size={44} rotation={-12} />
                  <div className="absolute -top-3 left-6 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white" />
                </div>
              </div>

              <div className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 pointer-events-none z-15 hidden sm:flex flex-col items-center gap-8 scale-x-[-1]">
                <div className="relative animate-pulse" style={{ animationDuration: '6.5s' }}>
                  <div className="absolute -top-3 -left-3 pointer-events-none">
                    <SakuraLeaves size={58} rotation={-35} />
                  </div>
                  <SakuraFlower size={54} rotation={15} />
                  <div className="absolute -bottom-4 left-6 z-15">
                    <SakuraFlower size={36} rotation={-25} />
                  </div>
                  <div className="absolute -top-5 left-4 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white shadow-xs" />
                </div>
                <div className="relative scale-y-[-1] mt-6">
                  <div className="absolute -top-2 -left-3 pointer-events-none">
                    <SakuraLeaves size={50} rotation={30} />
                  </div>
                  <SakuraFlower size={44} rotation={-12} />
                  <div className="absolute -top-3 left-6 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white" />
                </div>
              </div>

              {/* Sudut Putih Atas & Bawah: Bunga Sakura Mengambang */}
              <div className="absolute top-4 left-3 pointer-events-none z-10 hidden xs:block">
                <SakuraFlower size={34} rotation={-20} />
              </div>
              <div className="absolute top-4 right-3 pointer-events-none z-10 hidden xs:block scale-x-[-1]">
                <SakuraFlower size={34} rotation={-20} />
              </div>
              <div className="absolute bottom-16 left-3 pointer-events-none z-10 hidden xs:block">
                <SakuraFlower size={32} rotation={35} />
              </div>
              <div className="absolute bottom-16 right-3 pointer-events-none z-10 hidden xs:block scale-x-[-1]">
                <SakuraFlower size={32} rotation={35} />
              </div>

              {/* Botanical Floral Frame Container with Subtle Shimmer */}
              <ScrollReveal animation="fade-up" duration={900} className="w-full flex justify-center">
                <div className="relative w-full aspect-[9/13] max-w-[340px] sm:max-w-[380px] rounded-[36px] p-2.5 bg-gradient-to-b from-[#FFF5F7] via-[#FFFFFF] to-[#FFF0F3] shadow-[0_20px_50px_rgba(180,90,110,0.22)] border-2 border-[#E8BAC5] flex items-center justify-center">
                  
                  {/* ================= 1. ATAS KIRI (TOP LEFT) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={120} duration={700} className="absolute -top-3 -left-3 pointer-events-none z-20 flex items-center justify-center">
                    <div className="absolute -top-2 -left-2 pointer-events-none">
                      <SakuraLeaves size={62} rotation={-35} />
                    </div>
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '5s' }}>
                      <SakuraFlower size={54} rotation={15} />
                    </div>
                    <div className="absolute top-6 left-7 z-15">
                      <SakuraFlower size={36} rotation={50} />
                    </div>
                    <div className="absolute -top-1 left-10 z-5 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-[#FFF0F3] shadow-xs" />
                  </ScrollReveal>

                  {/* ================= 2. ATAS KANAN (TOP RIGHT) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={160} duration={700} className="absolute -top-3 -right-3 pointer-events-none z-20 flex items-center justify-center scale-x-[-1]">
                    <div className="absolute -top-2 -left-2 pointer-events-none">
                      <SakuraLeaves size={62} rotation={-35} />
                    </div>
                    <div className="relative z-10 animate-pulse" style={{ animationDuration: '5.5s' }}>
                      <SakuraFlower size={54} rotation={15} />
                    </div>
                    <div className="absolute top-6 left-7 z-15">
                      <SakuraFlower size={36} rotation={50} />
                    </div>
                    <div className="absolute -top-1 left-10 z-5 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-[#FFF0F3] shadow-xs" />
                  </ScrollReveal>

                  {/* ================= 3. KIRI TENGAH (LEFT MIDDLE) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={260} duration={700} className="absolute top-1/2 -left-4 sm:-left-5 -translate-y-1/2 pointer-events-none z-25 flex items-center justify-center">
                    <div className="absolute -top-3 -left-2 pointer-events-none">
                      <SakuraLeaves size={58} rotation={25} />
                    </div>
                    <div className="relative z-10">
                      <SakuraFlower size={52} rotation={-15} />
                    </div>
                    <div className="absolute -bottom-5 left-4 z-15">
                      <SakuraFlower size={36} rotation={40} />
                    </div>
                    <div className="absolute -top-4 left-6 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white shadow-xs" />
                  </ScrollReveal>

                  {/* ================= 4. KANAN TENGAH (RIGHT MIDDLE) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={300} duration={700} className="absolute top-1/2 -right-4 sm:-right-5 -translate-y-1/2 pointer-events-none z-25 flex items-center justify-center scale-x-[-1]">
                    <div className="absolute -top-3 -left-2 pointer-events-none">
                      <SakuraLeaves size={58} rotation={25} />
                    </div>
                    <div className="relative z-10">
                      <SakuraFlower size={52} rotation={-15} />
                    </div>
                    <div className="absolute -bottom-5 left-4 z-15">
                      <SakuraFlower size={36} rotation={40} />
                    </div>
                    <div className="absolute -top-4 left-6 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white shadow-xs" />
                  </ScrollReveal>

                  {/* Inner Rounded Couple Photo Card */}
                  <div className="relative w-full h-full rounded-[28px] overflow-hidden border border-[#EAAFB9]/70 shadow-inner group">
                    <img 
                      src="/themes/kuala-lumpur-heritage/couple-portrait.jpg" 
                      alt={`${groomName} & ${brideName}`} 
                      className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Soft Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#36131C]/65 via-transparent to-transparent pointer-events-none" />

                    {/* Couple Name Tag on Photo Bottom */}
                    <div className="absolute bottom-4 inset-x-4 text-center z-10">
                      <span className="inline-block px-5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#E5A8B4] text-[#631E30] text-xs font-serif font-bold tracking-[0.25em] uppercase shadow-sm">
                        {groomName} &amp; {brideName}
                      </span>
                    </div>
                  </div>

                  {/* ================= 5. BAWAH KIRI (BOTTOM LEFT) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={380} duration={700} className="absolute -bottom-3 -left-3 pointer-events-none z-20 flex items-center justify-center">
                    <div className="absolute -bottom-2 -left-2 pointer-events-none">
                      <SakuraLeaves size={64} rotation={80} />
                    </div>
                    <div className="relative z-10">
                      <SakuraFlower size={56} rotation={-30} />
                    </div>
                    <div className="absolute bottom-6 left-7 z-15">
                      <SakuraFlower size={38} rotation={20} />
                    </div>
                  </ScrollReveal>

                  {/* ================= 6. BAWAH KANAN (BOTTOM RIGHT) ================= */}
                  <ScrollReveal animation="bloom-reveal" delay={420} duration={700} className="absolute -bottom-3 -right-3 pointer-events-none z-20 flex items-center justify-center scale-x-[-1]">
                    <div className="absolute -bottom-2 -left-2 pointer-events-none">
                      <SakuraLeaves size={64} rotation={80} />
                    </div>
                    <div className="relative z-10">
                      <SakuraFlower size={56} rotation={-30} />
                    </div>
                    <div className="absolute bottom-6 left-7 z-15">
                      <SakuraFlower size={38} rotation={20} />
                    </div>
                  </ScrollReveal>
                </div>
              </ScrollReveal>

              {/* Scroll Down Indicator */}
              <ScrollReveal animation="fade-up" delay={550} duration={700}>
                <div 
                  onClick={() => scrollToSection('section-greeting', 'profile')}
                  className="mt-6 flex flex-col items-center gap-1.5 cursor-pointer text-[#8C4656] hover:text-[#5E1E2C] transition-colors"
                >
                  <span className="text-[11px] font-sans tracking-[0.25em] uppercase font-medium">Scroll Ke Bawah</span>
                  <ChevronDown className="w-4 h-4 animate-bounce text-[#C2657A]" />
                </div>
              </ScrollReveal>
            </section>

            {/* ========================================================
                SECTION 2: ISLAMIC GREETING & LANDMARK ARCH (Screenshot 3 Match)
                ======================================================== */}
            <section id="section-greeting" className="relative min-h-[95vh] flex flex-col items-center justify-center p-4 sm:p-6 overflow-hidden">
              <ScrollReveal animation="fade-up" duration={900} className="w-full flex justify-center">
                {/* Palace Arch Card Container */}
                <div className="relative w-full aspect-[9/15] max-w-[380px] rounded-[38px] p-5 bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF0F4] border-2 border-[#E5B2BD] shadow-[0_20px_50px_rgba(180,90,110,0.18)] flex flex-col justify-between overflow-hidden">
                  
                  {/* Top Royal Moorish Dome Outline Notch */}
                  <div className="relative z-10 flex flex-col items-center pt-2">
                    <div className="w-12 h-1 bg-[#D896A4] rounded-full mb-3" />
                    
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#5C1A2B] tracking-wide mb-3">
                      Assalamu'alaikum Wr.Wb.
                    </h2>
                    
                    <p className="text-xs sm:text-sm leading-relaxed text-[#6E3544] text-center max-w-[280px] font-serif">
                      Dengan segala hormatnya, kami ingin menjemput Tuan/Puan/Saudara/Saudari untuk hadir ke majlis resepsi perkahwinan kami.
                    </p>
                  </div>

                  {/* Quranic Verse Surah Ar-Rum: 21 */}
                  <div className="relative z-10 my-auto text-center px-3 py-3 bg-white/75 backdrop-blur-sm rounded-2xl border border-[#F0CDD4] shadow-sm">
                    <p className="text-[11px] italic text-[#7A3648] leading-relaxed">
                      "Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang."
                    </p>
                    <p className="text-[10px] font-bold text-[#9C4D61] mt-1.5 uppercase tracking-wider">
                      — QS. Ar-Rum: 21 —
                    </p>
                  </div>

                  {/* Bottom Backdrop: Bangunan Sultan Abdul Samad & KLCC Landmark */}
                  <div className="relative w-full h-[42%] rounded-2xl overflow-hidden border border-[#EAAFB9]/70 shadow-sm mt-2">
                    <img 
                      src="/themes/kuala-lumpur-heritage/landmark-arch.jpg" 
                      alt="Bangunan Sultan Abdul Samad & KLCC" 
                      className="w-full h-full object-cover object-bottom"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#40121E]/55 via-transparent to-transparent" />
                    
                    <div className="absolute bottom-2.5 inset-x-3 text-center">
                      <p className="text-[10px] tracking-[0.2em] uppercase text-white font-serif font-medium drop-shadow-md">
                        Kuala Lumpur, Malaysia
                      </p>
                    </div>
                  </div>

                </div>
              </ScrollReveal>
            </section>

            {/* ========================================================
                SECTION 3: PROFILE MEMPELAI (RAJA SEHARI)
                ======================================================== */}
            <section id="section-profile" className="py-12 px-5 sm:px-6 relative">
              
              <ScrollReveal animation="fade-down" duration={700}>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center justify-center gap-2 mb-2">
                    <div className="w-8 h-[1px] bg-[#D4AF37]" />
                    <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold">
                      Raja Sehari
                    </span>
                    <div className="w-8 h-[1px] bg-[#D4AF37]" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#521727] font-normal">
                    Mempelai Bahagia
                  </h2>
                </div>
              </ScrollReveal>

              {/* Groom Profile Card */}
              <ScrollReveal animation="fade-up" delay={100} duration={800}>
                <div className="bg-white/95 rounded-3xl p-6 border border-[#F0C5CE] shadow-[0_10px_30px_rgba(200,120,135,0.12)] mb-6 text-center relative overflow-hidden transition-all hover:shadow-lg">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#C5A059] via-[#E8B5BE] to-[#D8304D] shadow-md mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/themes/kuala-lumpur-heritage/couple-portrait.jpg" 
                        alt={groomFullName}
                        className="w-full h-full object-cover object-top" 
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#5C1A2B] tracking-wide mb-1">
                    {groomFullName}
                  </h3>
                  <p className="text-xs text-[#8C3D4F] font-serif mb-3">
                    Putra sulung dari Tn. Hj. Razak &amp; Pn. Hjh. Mariam
                  </p>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#F0B8C4] text-[11px] font-sans text-[#7D293C]">
                    Pengantin Lelaki
                  </span>
                </div>
              </ScrollReveal>

              {/* Ampersand Divider */}
              <ScrollReveal animation="zoom-in" delay={180} duration={600}>
                <div className="flex items-center justify-center my-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFF0F4] border border-[#E8BAC5] flex items-center justify-center shadow-sm">
                    <span className="text-xl font-serif text-[#C5A059] font-bold italic">&amp;</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Bride Profile Card */}
              <ScrollReveal animation="fade-up" delay={260} duration={800}>
                <div className="bg-white/95 rounded-3xl p-6 border border-[#F0C5CE] shadow-[0_10px_30px_rgba(200,120,135,0.12)] text-center relative overflow-hidden transition-all hover:shadow-lg">
                  <div className="w-24 h-24 mx-auto rounded-full p-1 bg-gradient-to-tr from-[#D8304D] via-[#E8B5BE] to-[#C5A059] shadow-md mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden border-2 border-white">
                      <img 
                        src="/themes/kuala-lumpur-heritage/couple-portrait.jpg" 
                        alt={brideFullName}
                        className="w-full h-full object-cover object-center" 
                      />
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-[#5C1A2B] tracking-wide mb-1">
                    {brideFullName}
                  </h3>
                  <p className="text-xs text-[#8C3D4F] font-serif mb-3">
                    Putri kedua dari Dato' Zulkifli &amp; Datin Salmah
                  </p>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFF0F3] border border-[#F0B8C4] text-[11px] font-sans text-[#7D293C]">
                    Pengantin Perempuan
                  </span>
                </div>
              </ScrollReveal>

            </section>

            {/* ========================================================
                SECTION 4: ACARA & MAJLIS
                ======================================================== */}
            <section id="section-event" className="py-12 px-5 sm:px-6 relative bg-gradient-to-b from-transparent via-[#FFF2F5] to-transparent">
              
              <ScrollReveal animation="fade-down" duration={700}>
                <div className="text-center mb-8">
                  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                    Atur Cara
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#521727] font-normal">
                    Majlis Perkahwinan
                  </h2>
                </div>
              </ScrollReveal>

              {/* Mobile Countdown Timer (Hidden on Desktop Left Panel) */}
              <ScrollReveal animation="zoom-in" delay={100} duration={750}>
                <div className="lg:hidden bg-white rounded-3xl p-5 border border-[#F0C2CC] shadow-[0_10px_30px_rgba(200,120,135,0.1)] mb-8 text-center">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#8C3D4F] font-medium mb-3">
                    Menghitung Hari Bahagia
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    <div className="p-2.5 rounded-2xl bg-[#FFF2F5] border border-[#F5D5DC]">
                      <span className="block text-xl font-bold font-serif text-[#5C1A2B]">{timeLeft.days}</span>
                      <span className="text-[10px] uppercase font-sans text-[#9C4D61]">Hari</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FFF2F5] border border-[#F5D5DC]">
                      <span className="block text-xl font-bold font-serif text-[#5C1A2B]">{timeLeft.hours}</span>
                      <span className="text-[10px] uppercase font-sans text-[#9C4D61]">Jam</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FFF2F5] border border-[#F5D5DC]">
                      <span className="block text-xl font-bold font-serif text-[#5C1A2B]">{timeLeft.minutes}</span>
                      <span className="text-[10px] uppercase font-sans text-[#9C4D61]">Minit</span>
                    </div>
                    <div className="p-2.5 rounded-2xl bg-[#FFF2F5] border border-[#F5D5DC]">
                      <span className="block text-xl font-bold font-serif text-[#5C1A2B]">{timeLeft.seconds}</span>
                      <span className="text-[10px] uppercase font-sans text-[#9C4D61]">Saat</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Majlis Akad Nikah Card */}
              <ScrollReveal animation="fade-up" delay={150} duration={800}>
                <div className="bg-white/95 rounded-3xl p-6 border border-[#F0C2CC] shadow-md mb-6 relative">
                  <div className="flex items-center gap-2.5 text-[#C5A059] mb-3">
                    <Calendar className="w-5 h-5 text-[#C5A059]" />
                    <h3 className="text-lg font-serif font-bold text-[#5C1A2B]">Majlis Akad Nikah</h3>
                  </div>
                  
                  <p className="text-sm font-semibold text-[#4A1A26] mb-1">Sabtu, 28 November 2026</p>
                  <p className="text-xs text-[#7A3648] flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#C5A059]" />
                    09:30 AM — 11:30 AM MYT
                  </p>
                  
                  <div className="pt-3 border-t border-[#F5D7DE] text-xs text-[#6B2F3D]">
                    <p className="font-semibold text-[#541B28]">Masjid Wilayah Persekutuan</p>
                    <p className="mt-0.5">Jalan Tuanku Abdul Halim, Kompleks Kerajaan, 50480 Kuala Lumpur</p>
                  </div>
                </div>
              </ScrollReveal>

              {/* Majlis Resepsi Card */}
              <ScrollReveal animation="fade-up" delay={250} duration={800}>
                <div className="bg-white/95 rounded-3xl p-6 border border-[#F0C2CC] shadow-md relative">
                  <div className="flex items-center gap-2.5 text-[#D8304D] mb-3">
                    <Sparkles className="w-5 h-5 text-[#D8304D]" />
                    <h3 className="text-lg font-serif font-bold text-[#5C1A2B]">Majlis Bersanding &amp; Resepsi</h3>
                  </div>
                  
                  <p className="text-sm font-semibold text-[#4A1A26] mb-1">Sabtu, 28 November 2026</p>
                  <p className="text-xs text-[#7A3648] flex items-center gap-1.5 mb-3">
                    <Clock className="w-3.5 h-3.5 text-[#D8304D]" />
                    12:00 PM — 04:30 PM MYT
                  </p>
                  
                  <div className="pt-3 border-t border-[#F5D7DE] text-xs text-[#6B2F3D]">
                    <p className="font-semibold text-[#541B28]">Dewan Perdana Felda Kuala Lumpur</p>
                    <p className="mt-0.5">Jalan Gurney 1, Kampung Datuk Keramat, 54000 Kuala Lumpur</p>
                  </div>
                </div>
              </ScrollReveal>

            </section>

            {/* ========================================================
                SECTION 5: LOKASI MAJLIS & MAPS / WAZE
                ======================================================== */}
            <section id="section-location" className="py-12 px-5 sm:px-6 relative">
              
              <ScrollReveal animation="fade-down" duration={700}>
                <div className="text-center mb-8">
                  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                    Panduan Arah
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#521727] font-normal">
                    Lokasi Majlis
                  </h2>
                </div>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={150} duration={850}>
                <div className="bg-white rounded-3xl p-6 border border-[#F0C2CC] shadow-md text-center">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#FFF0F4] border border-[#F0B8C4] flex items-center justify-center text-[#D8304D] mb-3">
                    <MapPin className="w-6 h-6" />
                  </div>

                  <h3 className="text-base font-bold font-serif text-[#5C1A2B] mb-1">
                    Dewan Perdana Felda
                  </h3>
                  <p className="text-xs text-[#7A3648] leading-relaxed max-w-[280px] mx-auto mb-6">
                    Jalan Gurney 1, Kampung Datuk Keramat, 54000 Kuala Lumpur, Wilayah Persekutuan Kuala Lumpur
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://waze.com/ul?q=Dewan+Perdana+Felda+Kuala+Lumpur" 
                      target="_blank" 
                      rel="noreferrer"
                      className="py-3 px-4 rounded-full bg-[#244B39] text-white text-xs font-sans font-medium flex items-center justify-center gap-2 shadow-sm hover:bg-[#1B3A2C] transition-colors"
                    >
                      <Compass className="w-4 h-4 text-[#A8D5BC]" />
                      Buka Waze
                    </a>
                    <a 
                      href="https://maps.google.com/?q=Dewan+Perdana+Felda+Kuala+Lumpur" 
                      target="_blank" 
                      rel="noreferrer"
                      className="py-3 px-4 rounded-full bg-gradient-to-r from-[#943B4E] to-[#732435] text-white text-xs font-sans font-medium flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-opacity"
                    >
                      <MapPin className="w-4 h-4 text-[#FFD4DD]" />
                      Google Maps
                    </a>
                  </div>
                </div>
              </ScrollReveal>

            </section>

            {/* ========================================================
                SECTION 6: SALAM KAUT & HADIAH
                ======================================================== */}
            <section id="section-gift" className="py-12 px-5 sm:px-6 relative bg-gradient-to-b from-transparent via-[#FFF4F6] to-transparent">
              
              <ScrollReveal animation="fade-down" duration={700}>
                <div className="text-center mb-8">
                  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                    Tanda Ingatan
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#521727] font-normal">
                    Salam Kaut &amp; Hadiah
                  </h2>
                  <p className="text-xs text-[#7A3648] mt-2 max-w-[300px] mx-auto">
                    Doa restu anda sudah melengkapkan hari bahagia kami. Namun jika ingin menitipkan tanda ingatan, dapat melalui saluran berikut:
                  </p>
                </div>
              </ScrollReveal>

              {/* Maybank Card */}
              <ScrollReveal animation="fade-up" delay={100} duration={800}>
                <div className="bg-white rounded-3xl p-5 border border-[#F0C2CC] shadow-sm mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">Maybank</span>
                    <Gift className="w-4 h-4 text-[#D8304D]" />
                  </div>
                  <p className="text-sm font-mono font-bold text-[#4A1A26] tracking-wider mb-0.5">
                    1640 1234 5678
                  </p>
                  <p className="text-xs text-[#7A3648] mb-4">a.n. MUHAMMAD HAFIZ BIN RAZAK</p>
                  
                  <button 
                    onClick={() => handleCopy('164012345678', 1)}
                    className="w-full py-2.5 px-4 rounded-full border border-[#D896A4] text-xs font-sans text-[#732435] hover:bg-[#FFF0F3] transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedIndex === 1 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">Nombor Akaun Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C5A059]" />
                        <span>Salin Nombor Akaun</span>
                      </>
                    )}
                  </button>
                </div>
              </ScrollReveal>

              {/* CIMB Bank Card */}
              <ScrollReveal animation="fade-up" delay={200} duration={800}>
                <div className="bg-white rounded-3xl p-5 border border-[#F0C2CC] shadow-sm mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D8304D]">CIMB Bank</span>
                    <Gift className="w-4 h-4 text-[#D8304D]" />
                  </div>
                  <p className="text-sm font-mono font-bold text-[#4A1A26] tracking-wider mb-0.5">
                    7012 9876 5432
                  </p>
                  <p className="text-xs text-[#7A3648] mb-4">a.n. NUR SYAFIKA BINTI ZULKIFLI</p>
                  
                  <button 
                    onClick={() => handleCopy('701298765432', 2)}
                    className="w-full py-2.5 px-4 rounded-full border border-[#D896A4] text-xs font-sans text-[#732435] hover:bg-[#FFF0F3] transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedIndex === 2 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-green-700 font-medium">Nombor Akaun Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#D8304D]" />
                        <span>Salin Nombor Akaun</span>
                      </>
                    )}
                  </button>
                </div>
              </ScrollReveal>

              {/* Physical Gift Delivery Address */}
              <ScrollReveal animation="fade-up" delay={300} duration={800}>
                <div className="p-4 rounded-2xl bg-white/70 border border-[#F5D5DC] text-center text-xs text-[#7A3648]">
                  <p className="font-semibold text-[#541B28] mb-1">Alamat Kirim Hadiah Fizikal:</p>
                  <p className="leading-relaxed">No. 28, Jalan Ampang Hilir, Taman U-Thant, 55000 Kuala Lumpur, Malaysia</p>
                </div>
              </ScrollReveal>

            </section>

            {/* ========================================================
                SECTION 7: RSVP & UCAPAN DOA (WISHES)
                ======================================================== */}
            <section id="section-rsvp" className="py-12 px-5 sm:px-6 relative">
              
              <ScrollReveal animation="fade-down" duration={700}>
                <div className="text-center mb-8">
                  <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#C5A059] font-bold block mb-1">
                    Kehadiran &amp; Restu
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-serif text-[#521727] font-normal">
                    RSVP &amp; Ucapan Doa
                  </h2>
                </div>
              </ScrollReveal>

              {/* RSVP Form */}
              <ScrollReveal animation="fade-up" delay={150} duration={850}>
                <form onSubmit={handleRsvpSubmit} className="bg-white rounded-3xl p-6 border border-[#F0C2CC] shadow-md mb-8">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-sans font-semibold text-[#541B28] mb-1">Nama Anda</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Masukkan nama penuh"
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8B5BE] text-xs font-sans text-[#4A1A26] focus:outline-none focus:border-[#C5A059] bg-[#FFFDFC]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-sans font-semibold text-[#541B28] mb-1">Pengesahan Kehadiran</label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setRsvpAttendance('hadir')}
                          className={`py-2 px-2 rounded-xl text-xs font-sans font-medium transition-all ${
                            rsvpAttendance === 'hadir' 
                              ? 'bg-[#2E6B47] text-white shadow-sm' 
                              : 'bg-[#F9ECEF] text-[#6B2F3D] border border-[#F0C2CC]'
                          }`}
                        >
                          Hadir
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpAttendance('tidak_hadir')}
                          className={`py-2 px-2 rounded-xl text-xs font-sans font-medium transition-all ${
                            rsvpAttendance === 'tidak_hadir' 
                              ? 'bg-[#8C2D41] text-white shadow-sm' 
                              : 'bg-[#F9ECEF] text-[#6B2F3D] border border-[#F0C2CC]'
                          }`}
                        >
                          Tidak Hadir
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpAttendance('ragu')}
                          className={`py-2 px-2 rounded-xl text-xs font-sans font-medium transition-all ${
                            rsvpAttendance === 'ragu' 
                              ? 'bg-[#C5A059] text-white shadow-sm' 
                              : 'bg-[#F9ECEF] text-[#6B2F3D] border border-[#F0C2CC]'
                          }`}
                        >
                          Masih Ragu
                        </button>
                      </div>
                    </div>

                    {rsvpAttendance === 'hadir' && (
                      <div>
                        <label className="block text-xs font-sans font-semibold text-[#541B28] mb-1">Jumlah Tamu Hadir</label>
                        <select 
                          value={rsvpGuestCount} 
                          onChange={(e) => setRsvpGuestCount(e.target.value)}
                          className="w-full px-4 py-2.5 rounded-xl border border-[#E8B5BE] text-xs font-sans text-[#4A1A26] focus:outline-none focus:border-[#C5A059] bg-[#FFFDFC]"
                        >
                          <option value="1">1 Orang</option>
                          <option value="2">2 Orang</option>
                          <option value="3">3 Orang</option>
                          <option value="4">4 Orang</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-sans font-semibold text-[#541B28] mb-1">Ucapan &amp; Doa Restu</label>
                      <textarea 
                        required
                        rows={3}
                        placeholder="Titipkan ucapan selamat & doa restu buat kedua mempelai..."
                        value={rsvpMessage}
                        onChange={(e) => setRsvpMessage(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8B5BE] text-xs font-sans text-[#4A1A26] focus:outline-none focus:border-[#C5A059] bg-[#FFFDFC] resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingRsvp}
                      className="w-full py-3 px-6 rounded-full bg-gradient-to-r from-[#943B4E] via-[#7B2537] to-[#5C1A2B] text-white text-xs font-sans font-semibold tracking-wider uppercase shadow-md hover:opacity-95 transition-opacity flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isSubmittingRsvp ? (
                        <span>Menghantar...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Hantar Ucapan &amp; RSVP</span>
                        </>
                      )}
                    </button>

                    {rsvpSuccess && (
                      <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs text-center font-medium">
                        Terima kasih! Ucapan &amp; konfirmasi kehadiran Anda telah berjaya direkodkan.
                      </div>
                    )}
                  </div>
                </form>
              </ScrollReveal>

              {/* Wishes Feed */}
              <ScrollReveal animation="fade-up" delay={250} duration={850}>
                <div className="space-y-3">
                  <h3 className="text-sm font-serif font-bold text-[#541B28] mb-3 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-[#D8304D]" />
                    Ucapan Doa Sahabat &amp; Keluarga ({wishesList.length})
                  </h3>
                  
                  {wishesList.map((wish) => (
                    <div key={wish.id} className="p-4 rounded-2xl bg-white border border-[#F0CDD4] shadow-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-[#5C1A2B] font-serif">{wish.name}</span>
                        <span className="text-[10px] text-[#A66172] font-sans">{wish.time}</span>
                      </div>
                      <p className="text-xs text-[#6B2F3D] leading-relaxed font-serif">
                        {wish.message}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </section>

            {/* ========================================================
                SECTION 8: PANTUN PENUTUP & FOOTER
                ======================================================== */}
            <footer className="py-12 px-6 text-center border-t border-[#F2D6DC] bg-[#FFF8FA]">
              <ScrollReveal animation="fade-up" duration={800}>
                <div className="w-10 h-10 mx-auto rounded-full bg-white border border-[#EAAFB9] flex items-center justify-center text-[#D8304D] mb-4 shadow-sm">
                  <Heart className="w-5 h-5 fill-[#D8304D] text-[#D8304D]" />
                </div>

                <p className="text-xs italic text-[#7A3648] leading-relaxed max-w-[280px] mx-auto mb-4 font-serif">
                  Bunga cempaka harum mewangi,<br />
                  Disunting dara di tepi kolam;<br />
                  Ijab kabul kini termeteri,<br />
                  Moga berkekalan hingga ke jannah.
                </p>

                <p className="text-sm font-serif font-bold text-[#5C1A2B] tracking-wide mb-1">
                  {groomName} &amp; {brideName}
                </p>
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#A66172] font-sans">
                  Kuala Lumpur, Malaysia
                </p>
                <p className="text-[9px] text-[#C28593] mt-6 font-sans">
                  &copy; 2026 WD Group Wedding Invitation. All rights reserved.
                </p>
              </ScrollReveal>
            </footer>

          </div>

          {/* ========================================================
              BOTTOM NAVIGATION BAR (Attached to Right Column on Desktop)
              ======================================================== */}
          <nav className="fixed bottom-0 right-0 w-full lg:w-7/12 xl:w-1/2 z-40 bg-white/95 backdrop-blur-lg border-t border-[#F0C2CC] shadow-[0_-4px_20px_rgba(200,120,135,0.15)] py-2 px-3">
            <div className="max-w-[420px] mx-auto flex items-center justify-around">
              
              <button 
                onClick={() => scrollToSection('section-opening', 'opening')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'opening' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                    <polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                </div>
                <span className="text-[10px] font-sans tracking-tight">Opening</span>
              </button>

              <button 
                onClick={() => scrollToSection('section-profile', 'profile')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'profile' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Heart className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans tracking-tight">Profile</span>
              </button>

              <button 
                onClick={() => scrollToSection('section-event', 'event')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'event' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans tracking-tight">Acara</span>
              </button>

              <button 
                onClick={() => scrollToSection('section-location', 'location')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'location' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans tracking-tight">Lokasi</span>
              </button>

              <button 
                onClick={() => scrollToSection('section-gift', 'gift')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'gift' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <Gift className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans tracking-tight">Hadiah</span>
              </button>

              <button 
                onClick={() => scrollToSection('section-rsvp', 'rsvp')}
                className={`flex flex-col items-center gap-1 transition-colors ${
                  activeTab === 'rsvp' ? 'text-[#D8304D] font-bold' : 'text-[#8A515F] hover:text-[#5C1A2B]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-sans tracking-tight">RSVP</span>
              </button>

            </div>
          </nav>

        </main>

      </div>

    </div>
  );
};
