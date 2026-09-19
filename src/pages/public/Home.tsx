import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { themeService, REAL_SPLIT_FLORAL_THEME } from '../../services/themeService';
import { 
  Sparkles, 
  Heart, 
  Music, 
  MapPin, 
  Calendar, 
  Gift, 
  CheckCircle2, 
  Users, 
  ChevronDown, 
  ChevronUp,
  Star, 
  Play, 
  Pause, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  ExternalLink, 
  MessageCircle, 
  Check, 
  Menu, 
  X,
  Palette,
  Zap,
  Clock
} from 'lucide-react';

export const Home: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Real live countdown ticker in mockup
  const [countdown, setCountdown] = useState({
    days: 124,
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Smooth Scroll-To-Top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { data: activeThemes } = useQuery({
    queryKey: ['themes', 'active'],
    queryFn: themeService.getActiveThemes,
  });

  // Always guaranteed to have at least Split Floral theme immediately
  const displayThemes = (activeThemes && activeThemes.length > 0) 
    ? activeThemes 
    : [REAL_SPLIT_FLORAL_THEME];

  // IntersectionObserver for Butter-Smooth Scroll Reveals with Safety Timer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale');
    elements.forEach((el) => observer.observe(el));

    // Safety fallback: ensure nothing stays invisible
    const safetyTimer = setTimeout(() => {
      document.querySelectorAll('.reveal-init, .reveal-left, .reveal-right, .reveal-scale').forEach((el) => {
        el.classList.add('revealed');
      });
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [displayThemes]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs = [
    {
      q: 'Berapa lama waktu yang dibutuhkan untuk membuat undangan?',
      a: 'Sangat cepat! Anda dapat membuat undangan digital selesai hanya dalam waktu 5-15 menit. Anda cukup memilih tema yang disukai, mengisi informasi mempelai & acara, lalu undangan langsung aktif dan siap dibagikan.'
    },
    {
      q: 'Apakah saya bisa mengganti lagu atau backsound musik sendiri?',
      a: 'Tentu saja. Kami menyediakan berbagai pilihan backsound romantis populer, dan Anda juga dapat mengunggah lagu favorit pilihan Anda sendiri untuk hari istimewa Anda.'
    },
    {
      q: 'Bagaimana cara membagikan undangan dengan nama tamu yang berbeda?',
      a: 'Di dashboard WD Group, terdapat fitur "Kustom Nama Tamu". Anda cukup memasukkan daftar nama tamu, dan sistem kami akan membuatkan tautan personal otomatis (contoh: /invitation/kevin-jessica?to=Budi+Santoso) lengkap dengan teks ucapan untuk WhatsApp.'
    },
    {
      q: 'Apakah ada batasan jumlah tamu undangan yang bisa diundang?',
      a: 'Tidak ada batasan! Anda dapat mengundang ratusan hingga ribuan tamu tanpa biaya tambahan per tamu.'
    },
    {
      q: 'Apakah tamu bisa langsung konfirmasi kehadiran (RSVP) & mengirim amplop?',
      a: 'Ya, seluruh data konfirmasi RSVP tamu akan langsung tersimpan di sistem dan dapat dipantau di dashboard admin secara real-time. Untuk amplop digital, tamu dapat menyalin nomor rekening atau scan QRIS langsung.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-jakarta selection:bg-primary-500 selection:text-white overflow-x-hidden">
      {/* Background Decorative Blur Spheres with Smooth Organic Float */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-100/60 blur-3xl animate-orb-1" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-rose-100/50 blur-3xl animate-orb-2" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-100/40 blur-3xl animate-orb-3" />
      </div>

      {/* Top Notification Bar */}
      <div className="bg-primary-900 text-primary-100 text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium tracking-wide flex flex-wrap items-center justify-center gap-1.5 relative z-50 leading-tight">
        <Sparkles size={13} className="text-amber-300 animate-pulse shrink-0" />
        <span>Tema Eksklusif Split Floral kini telah hadir dengan video entrance arch &amp; musik saxophone!</span>
        <a href="#themes" className="underline font-bold text-white hover:text-amber-200 ml-1">Lihat Tema &rarr;</a>
      </div>

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/70 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5 sm:space-x-3 group">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 flex items-center justify-center text-white shadow-md shadow-primary-900/20 group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-lg sm:text-xl font-bold tracking-widest text-amber-200">WD</span>
            </div>
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-primary-900 tracking-tight font-cinzel leading-none">WD GROUP</div>
              <div className="text-[9px] sm:text-[10px] tracking-[0.2em] sm:tracking-[0.25em] text-primary-600 font-semibold uppercase mt-0.5">Wedding Invitation</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-600">
            <a href="#hero" className="hover:text-primary-800 transition-colors">Beranda</a>
            <a href="#features" className="hover:text-primary-800 transition-colors">Fitur Unggulan</a>
            <a href="#themes" className="hover:text-primary-800 transition-colors">Tema Desain</a>
            <a href="#how-it-works" className="hover:text-primary-800 transition-colors">Cara Kerja</a>
            <a href="#pricing" className="hover:text-primary-800 transition-colors">Paket Harga</a>
            <a href="#testimonials" className="hover:text-primary-800 transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-primary-800 transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link 
              to="/admin/login" 
              className="px-4 py-2.5 text-sm font-semibold text-primary-800 hover:text-primary-900 hover:bg-primary-50 rounded-xl transition-all"
            >
              Admin Portal
            </Link>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20tertarik%20membuat%20undangan%20pernikahan%20digital"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-800 hover:to-primary-950 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle size={16} className="text-emerald-300" />
              <span>Konsultasi WA</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-1.5 sm:space-x-2">
            <Link 
              to="/admin/login" 
              className="text-xs font-semibold px-2.5 py-1.5 bg-primary-50 text-primary-800 rounded-lg"
            >
              Login
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-5 py-4 space-y-3 shadow-xl animate-reveal-up max-h-[calc(100dvh-4rem)] overflow-y-auto">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Beranda</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Fitur Unggulan</a>
            <a href="#themes" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Tema Desain</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Cara Kerja</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Paket Harga</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">Testimoni</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1 text-sm font-medium text-stone-700 hover:text-primary-700">FAQ</a>
            <div className="pt-3 border-t border-stone-100 flex flex-col space-y-2">
              <Link to="/admin/login" className="w-full text-center py-2.5 text-xs font-semibold text-primary-800 bg-primary-50 rounded-xl">
                Masuk Dashboard Admin
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-8 pb-16 sm:pt-12 sm:pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        {/* Ambient Floating Rose & Gold Petals */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-12 left-[10%] w-3.5 h-3.5 rounded-full bg-rose-300/40 blur-[0.5px] animate-petal-1" />
          <div className="absolute top-28 left-[40%] w-4 h-2.5 rounded-full bg-amber-200/35 rotate-45 animate-petal-2" />
          <div className="absolute top-6 right-[18%] w-3 h-4 rounded-full bg-rose-200/45 -rotate-12 animate-petal-3" />
          <div className="absolute top-44 right-[8%] w-3.5 h-3.5 rounded-full bg-amber-300/30 animate-petal-4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-5 sm:space-y-6 reveal-left">
              
              {/* Luxury Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/95 border border-primary-200/80 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-xs hover:border-primary-400 transition-colors">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span className="text-[11px] sm:text-xs font-semibold text-primary-900 tracking-wide uppercase">
                  Digital Wedding Invitation Platform • WD Group
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.2]">
                  Abadikan Momen Indah dengan <span className="font-playfair italic font-normal text-primary-700 underline decoration-amber-300 decoration-wavy decoration-2">Undangan Digital</span> yang Elegan
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  Ciptakan kesan pertama yang tak terlupakan bagi para tamu. Dilengkapi transisi video pintu gerbang megah, alunan saxophone romantis, RSVP otomatis, dan navigasi lokasi akurat.
                </p>
              </div>

              {/* Action Buttons with Shimmer Light Sweep */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 w-full">
                <a 
                  href="#themes"
                  className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-white font-bold text-sm sm:text-base shadow-xl shadow-primary-900/20 hover:shadow-2xl hover:shadow-primary-900/30 transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-3 group relative overflow-hidden"
                >
                  {/* Subtle Shimmer Reflection */}
                  <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                  <Sparkles size={18} className="text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
                  <span>Lihat Tema Split Floral</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300" />
                </a>

                <Link 
                  to="/themes"
                  className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white text-stone-800 font-bold text-sm sm:text-base border border-stone-300/80 hover:bg-stone-50 hover:border-primary-400 hover:shadow-md transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
                >
                  <Smartphone size={18} className="text-primary-700" />
                  <span>Katalog Tema</span>
                </Link>
              </div>

              {/* Social Proof Mini */}
              <div className="pt-5 sm:pt-6 border-t border-stone-200/80 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-6 text-sm text-stone-600">
                <div className="flex items-center space-x-2.5 group cursor-default">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform group-hover:scale-105" src="/photos/photo-1.jpg" alt="User 1" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform group-hover:scale-105" src="/photos/photo-3.jpg" alt="User 2" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover transition-transform group-hover:scale-105" src="/photos/photo-4.jpg" alt="User 3" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={13} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-stone-800">1.000+ Tamu Terlayani</span>
                  </div>
                </div>

                <div className="h-4 w-px bg-stone-300 hidden sm:block" />

                <div className="flex items-center space-x-2">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span className="text-xs font-medium">Garansi 100% Aktif &amp; Siap Pakai</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Mockup Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full reveal-right">
              
              {/* Floating Badge: RSVP Counter (Tablet & Desktop) */}
              <div className="hidden min-[540px]:flex absolute -left-4 sm:-left-8 top-12 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-stone-100 items-center space-x-3 z-20 animate-float-gentle hover:scale-105 transition-transform duration-300 cursor-default">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">RSVP Real-Time</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-800">348 Tamu Hadir</p>
                </div>
              </div>

              {/* Floating Badge: Digital Envelope (Tablet & Desktop) */}
              <div className="hidden min-[540px]:flex absolute -right-4 sm:-right-6 bottom-20 bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl shadow-xl border border-stone-100 items-center space-x-3 z-20 animate-float-reverse hover:scale-105 transition-transform duration-300 cursor-default">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Gift size={18} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase tracking-wider">Amplop Digital</p>
                  <p className="text-xs sm:text-sm font-extrabold text-stone-800">Transfer &amp; QRIS Aman</p>
                </div>
              </div>

              {/* Phone Frame Mockup with Interactive Tilt / Hover */}
              <div className="w-full max-w-[275px] min-[380px]:max-w-[305px] sm:max-w-[330px] rounded-[40px] sm:rounded-[48px] bg-stone-950 p-3 sm:p-3.5 shadow-[0_20px_50px_-10px_rgba(44,30,26,0.3)] sm:shadow-[0_25px_60px_-15px_rgba(44,30,26,0.35)] border-[4px] sm:border-[5px] border-stone-800 relative mx-auto transition-transform duration-500 hover:scale-[1.02]">
                
                {/* Speaker & Camera Notch */}
                <div className="w-28 sm:w-32 h-3.5 sm:h-4 bg-stone-900 rounded-full mx-auto mb-2 flex items-center justify-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-stone-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60" />
                </div>

                {/* Phone Screen Container */}
                <div className="rounded-[30px] sm:rounded-[36px] bg-[#fbf9f6] overflow-hidden border border-stone-200/40 relative text-center">
                  
                  {/* Music Player Header Pill */}
                  <div className="bg-primary-900 text-white px-3 py-2 flex items-center justify-between text-xs relative">
                    {/* Floating Notes when playing */}
                    {isPlayingAudio && (
                      <div className="absolute -top-3 right-4 pointer-events-none">
                        <span className="absolute text-amber-300 text-xs animate-music-note-1 font-bold">♪</span>
                        <span className="absolute text-amber-200 text-sm animate-music-note-2 font-bold -left-3">♫</span>
                        <span className="absolute text-rose-300 text-[10px] animate-music-note-3 font-bold left-3">♩</span>
                      </div>
                    )}

                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-all hover:scale-110 active:scale-95"
                        title={isPlayingAudio ? 'Jeda Musik' : 'Putar Musik'}
                      >
                        {isPlayingAudio ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                      </button>
                      <div className="text-left leading-tight">
                        <p className="text-[9px] text-amber-200 font-semibold tracking-wider uppercase">Now Playing</p>
                        <p className="text-[11px] font-medium truncate max-w-[120px] sm:max-w-[130px]">Beautiful In White</p>
                      </div>
                    </div>
                    {/* Animated Equalizer */}
                    <div className="flex items-end space-x-0.5 h-4">
                      <div className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingAudio ? 'animate-sound-1' : 'h-1'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingAudio ? 'animate-sound-2' : 'h-2'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingAudio ? 'animate-sound-3' : 'h-1'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full transition-all ${isPlayingAudio ? 'animate-sound-2' : 'h-3'}`} />
                    </div>
                  </div>

                  {/* Invitation Preview Hero */}
                  <div className="relative h-56 sm:h-64 overflow-hidden group">
                    <img 
                      src="/bg-floral.jpg" 
                      alt="Tema Split Floral" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-4 sm:p-5 text-white">
                      <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">Tema Split Floral</p>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide mt-0.5">Kevin &amp; Jessica</h3>
                      <p className="text-[10px] sm:text-[11px] text-stone-200 mt-1 font-light flex items-center space-x-1">
                        <Calendar size={11} className="text-amber-300 inline" />
                        <span>Sabtu, 24 Oktober 2026</span>
                      </p>
                    </div>
                  </div>

                  {/* Live Dynamic Countdown Box */}
                  <div className="p-3.5 sm:p-4 bg-white border-b border-stone-100">
                    <div className="flex items-center justify-center space-x-1.5 mb-1.5 sm:mb-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <p className="text-[9px] sm:text-[10px] font-bold text-stone-400 uppercase tracking-widest">Menuju Hari Bahagia</p>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="bg-primary-50/90 p-1 sm:p-1.5 rounded-lg border border-primary-100 hover:border-primary-300 transition-colors">
                        <span className="block text-xs sm:text-sm font-bold text-primary-900 font-mono">{countdown.days}</span>
                        <span className="text-[8px] sm:text-[9px] text-primary-700">Hari</span>
                      </div>
                      <div className="bg-primary-50/90 p-1 sm:p-1.5 rounded-lg border border-primary-100 hover:border-primary-300 transition-colors">
                        <span className="block text-xs sm:text-sm font-bold text-primary-900 font-mono">{String(countdown.hours).padStart(2, '0')}</span>
                        <span className="text-[8px] sm:text-[9px] text-primary-700">Jam</span>
                      </div>
                      <div className="bg-primary-50/90 p-1 sm:p-1.5 rounded-lg border border-primary-100 hover:border-primary-300 transition-colors">
                        <span className="block text-xs sm:text-sm font-bold text-primary-900 font-mono">{String(countdown.minutes).padStart(2, '0')}</span>
                        <span className="text-[8px] sm:text-[9px] text-primary-700">Menit</span>
                      </div>
                      <div className="bg-primary-50/90 p-1 sm:p-1.5 rounded-lg border border-primary-100 hover:border-primary-300 transition-colors">
                        <span className="block text-xs sm:text-sm font-bold text-primary-900 font-mono transition-all duration-300">{String(countdown.seconds).padStart(2, '0')}</span>
                        <span className="text-[8px] sm:text-[9px] text-primary-700">Detik</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions inside Mockup */}
                  <div className="p-3.5 sm:p-4 space-y-2">
                    <button className="w-full bg-primary-800 hover:bg-primary-900 active:scale-98 text-white py-2.5 rounded-xl text-xs font-bold shadow transition-all flex items-center justify-center space-x-2">
                      <Heart size={13} className="text-rose-400 fill-rose-400 animate-pulse" />
                      <span>Buka Undangan</span>
                    </button>
                    <div className="flex space-x-2 text-[10px]">
                      <div className="flex-1 bg-stone-100 text-stone-700 py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1 hover:bg-stone-200 transition-colors cursor-default">
                        <MapPin size={11} className="text-primary-700" />
                        <span>Google Maps</span>
                      </div>
                      <div className="flex-1 bg-stone-100 text-stone-700 py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1 hover:bg-stone-200 transition-colors cursor-default">
                        <Gift size={11} className="text-primary-700" />
                        <span>Kirim Kado</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 sm:w-28 h-1 bg-stone-700 rounded-full mx-auto mt-2.5 sm:mt-3" />
              </div>

              {/* Mobile Badges Row (Visible ONLY on phones < 540px) */}
              <div className="flex min-[540px]:hidden items-center justify-center gap-2 mt-4 w-full">
                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-stone-200/80 flex items-center space-x-2">
                  <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-bold text-stone-800">RSVP Real-Time</span>
                </div>
                <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-xs border border-stone-200/80 flex items-center space-x-2">
                  <Gift size={14} className="text-rose-600 shrink-0" />
                  <span className="text-[11px] font-bold text-stone-800">Amplop &amp; QRIS</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* METRICS STATS BAR */}
      <section className="bg-white border-y border-stone-200/80 py-8 sm:py-10 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8 text-center">
            <div className="bg-stone-50/60 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-stone-200/60 sm:border-none reveal-init delay-75 hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-900 font-cinzel">1.000+</div>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-1">Tamu Terlayani</p>
            </div>
            <div className="bg-stone-50/60 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-stone-200/60 sm:border-none reveal-init delay-150 hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-900 font-cinzel">99.8%</div>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-1">Kepuasan Pasangan</p>
            </div>
            <div className="bg-stone-50/60 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-stone-200/60 sm:border-none reveal-init delay-200 hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-900 font-cinzel">1 Tema</div>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-1">Split Floral</p>
            </div>
            <div className="bg-stone-50/60 sm:bg-transparent p-4 sm:p-0 rounded-2xl border border-stone-200/60 sm:border-none reveal-init delay-300 hover:scale-105 transition-all duration-300">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-900 font-cinzel">Real-Time</div>
              <p className="text-xs sm:text-sm font-semibold text-stone-500 mt-1">Notifikasi RSVP &amp; Doa</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full hover:bg-primary-100 transition-colors">
              <Sparkles size={14} className="animate-spin-slow" />
              <span>Fitur Premium &amp; Terlengkap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Semua yang Anda Butuhkan untuk Undangan Sempurna
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-normal">
              Dirancang dengan teliti agar setiap detik momen pernikahan Anda tersampaikan dengan indah, mudah dibagikan, dan berkesan mendalam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-75">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-amber-200 transition-all duration-300">
                <Smartphone size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Desain Mobile-First</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tampilan ultra-smooth dan responsif di seluruh layar smartphone (iPhone, Android) maupun tablet dan laptop.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-150">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-rose-200 transition-all duration-300">
                <Music size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Musik Latar Romantis</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Dilengkapi backsound musik autoplay dengan kontrol audio pintar untuk suasana sakral dan syahdu.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-200">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-emerald-200 transition-all duration-300">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">RSVP &amp; Buku Tamu</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Konfirmasi kehadiran tamu serta ucapan selamat tercatat real-time langsung ke dashboard admin dan database Anda.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-300">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-blue-200 transition-all duration-300">
                <Gift size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Amplop Digital &amp; QRIS</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Kemudahan kirim kado pernikahan secara cashless lewat transfer berbagai bank serta QRIS dengan satu tombol copy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-75">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-purple-200 transition-all duration-300">
                <MapPin size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Navigasi Google Maps</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tamu tidak akan tersesat. Cukup satu klik untuk membuka rute navigasi akurat langsung ke venue akad &amp; resepsi.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-150">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-indigo-200 transition-all duration-300">
                <Users size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Kustom Nama Tamu</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Buat tautan personal untuk tiap tamu (&apos;Kepada Yth. Bapak/Ibu...&apos;) agar penerima merasa sangat dihormati.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-200">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-orange-200 transition-all duration-300">
                <Heart size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Love Story &amp; Galeri</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Bagikan momen awal perjumpaan hingga lamaran dengan timeline kisah cinta dan galeri foto cinematic resolusi tinggi.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 group cursor-default reveal-init delay-300">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-primary-800 group-hover:text-teal-200 transition-all duration-300">
                <Calendar size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Pengingat Kalender</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Fitur otomatis simpan ke Google Calendar &amp; countdown timer interaktif agar para tamu selalu mengingat tanggal acara.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* THEMES SHOWCASE SECTION (Strictly reflects real data) */}
      <section id="themes" className="py-24 bg-stone-100/70 border-y border-stone-200/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3.5 py-1.5 rounded-full hover:bg-primary-50 transition-colors">
              <Palette size={14} className="animate-spin-slow" />
              <span>Tema Desain Tersedia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Koleksi Tema Desain Undangan
            </h2>
            <p className="text-base text-stone-600">
              Tema eksklusif siap pakai yang dirancang dengan detail arsitektur visual elegan dan fungsionalitas interaktif lengkap.
            </p>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Real Active Theme Cards (Split Floral & Secret Garden) */}
            {displayThemes.map((theme) => {
              const isGarden = theme.slug === 'secret-garden';

              return (
                <div 
                  key={theme.id || theme.slug}
                  className="bg-white rounded-3xl overflow-hidden border-2 border-primary-200 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col group col-span-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                    {/* Image Preview Container */}
                    <div className="sm:col-span-6 relative aspect-[16/10] sm:aspect-auto min-h-[220px] sm:min-h-full overflow-hidden bg-stone-200">
                      <img 
                        src={theme.preview_image || '/bg-floral.jpg'} 
                        alt={theme.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <span className="bg-primary-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                          {theme.category || (isGarden ? 'Botanical & Garden' : 'Floral & Classic')}
                        </span>
                        <span className="bg-amber-400 text-stone-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow w-fit">
                          {theme.badge || 'Tema Aktif'}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 shadow text-xs font-bold text-stone-800">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span>5.0</span>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="sm:col-span-6 p-6 sm:p-7 flex flex-col justify-between space-y-5">
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
                          <Sparkles size={14} className="text-amber-500" />
                          <span>{isGarden ? 'Trending Masterpiece' : 'Flagship Masterpiece'}</span>
                        </div>
                        <h3 className="font-bold text-2xl text-stone-900">{theme.name}</h3>
                        <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                          {theme.description || (isGarden 
                            ? 'Tema bernuansa taman romantis dusty rose & earthy mauve, bingkai foto lengkung oval, video entrance sinematik, dan ornamen bunga melayang.'
                            : 'Tema split screen klasik dengan ornamen floral melengkung vintage, entrance video arch, dan alunan saxophone romantis.')}
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs text-stone-700">
                          {isGarden ? (
                            <>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Video Entrance Sinematik HD</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Nuansa Dusty Rose &amp; Dresscode Swatches</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Bingkai Oval Arched &amp; Amplop Digital</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Hitung Mundur Real-Time &amp; Add to Calendar</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Transisi Video Cover Entrance Megah</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Tampilan Split-Screen Desktop &amp; Fullscreen Mobile</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>Backsound Saxophone &amp; Pemutar Audio Piringan Hitam</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Check size={14} className="text-emerald-600 flex-shrink-0" />
                                <span>RSVP, Buku Tamu, Amplop Digital &amp; Google Maps</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-stone-100">
                        <Link 
                          to="/themes"
                          className="w-full sm:flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-800 font-bold text-xs hover:bg-stone-50 hover:border-primary-400 text-center transition-all block"
                        >
                          Lihat Katalog
                        </Link>
                        <a 
                          href={`/invitation/bagas-siti?theme=${theme.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:flex-1 py-2.5 rounded-xl bg-primary-800 text-white font-bold text-xs hover:bg-primary-900 hover:shadow-lg text-center transition-all shadow-md block transform hover:-translate-y-0.5"
                        >
                          Demo Tema
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Coming Soon Banner Below */}
            <div className="bg-stone-50/80 rounded-3xl border-2 border-dashed border-stone-300 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left col-span-1 lg:col-span-2 gap-6 reveal-init delay-150 hover:border-primary-400 transition-colors">
              <div className="space-y-3 my-auto flex flex-col md:flex-row items-center gap-4 md:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Segera Hadir
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">Tema Baru Dalam Proses</h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed max-w-sm">
                    Koleksi tema berikutnya sedang dalam tahap perancangan visual eksklusif oleh tim desainer WD Group.
                  </p>
                </div>
              </div>

              <a 
                href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20apakah%20bisa%20request%20custom%20tema?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto lg:w-full py-2.5 px-6 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors text-center shrink-0"
              >
                Request Custom Desain
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
              <Zap size={14} className="text-amber-500" />
              <span>Mudah &amp; Praktis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              3 Langkah Mudah Membuat Undangan Pernikahan
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Tidak perlu keahlian teknis atau coding. Semuanya dapat diselesaikan dalam hitungan menit dari ponsel Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 relative text-center flex flex-col items-center group cursor-default reveal-init delay-100">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                01
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Pilih Tema Desain</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Pilih konsep desain elegan dari katalog pilihan kami yang sesuai dengan selera dan konsep pernikahan impian Anda.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 relative text-center flex flex-col items-center group cursor-default reveal-init delay-200">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                02
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Lengkapi Data Acara</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Masukkan informasi mempelai, jadwal akad &amp; resepsi, lokasi Google Maps, foto prewedding kenangan, serta rekening amplop kado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 hover:-translate-y-2 transition-all duration-300 relative text-center flex flex-col items-center group cursor-default reveal-init delay-300">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                03
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Bagikan Sekali Klik</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Undangan siap disebarkan ke keluarga, teman, dan kerabat via WhatsApp, Instagram, atau media sosial dengan format nama tamu khusus.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="pricing" className="py-16 sm:py-24 bg-stone-100/70 border-y border-stone-200/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3.5 py-1.5 rounded-full hover:bg-primary-50 transition-colors">
              <Gift size={14} className="text-rose-500" />
              <span>Pilihan Paket &amp; Harga</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Investasi Terbaik untuk Momen Seumur Hidup
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-stone-600">
              Pilih paket yang paling sesuai dengan kebutuhan pernikahan impian Anda dan pasangan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* 1. STARTER PLAN */}
            <div className="bg-[#faf7f2] rounded-3xl p-5 sm:p-7 md:p-8 border border-stone-200/90 shadow-md flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-init delay-100">
              <div>
                {/* Header */}
                <div className="text-center pb-5 border-b border-stone-200/70">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-wider font-cinzel">
                    STARTER
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">
                    Undangan Digital Hemat
                  </p>

                  {/* Price with strikethrough */}
                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-stone-400 text-sm sm:text-base font-semibold">
                        Rp 150.000
                      </span>
                      <span className="bg-rose-100 text-rose-700 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Hemat 67%
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-stone-950 font-cinzel mt-0.5">
                      Rp 50.000
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Template pilihan</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Nama &amp; foto mempelai</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Detail akad &amp; resepsi</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Countdown &amp; Maps</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Gallery, Love Story</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>RSVP, Ucapan &amp; Doa</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Amplop digital</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Custom data &amp; nama</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Revisi data 1x</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span><strong>Aktif 7 hari (1 minggu)</strong></span>
                  </li>
                </ul>
              </div>

              {/* Bottom Note & Button */}
              <div className="space-y-4 pt-2">
                <div className="bg-[#ede8df] rounded-xl p-3 text-center text-xs text-stone-700">
                  Cocok untuk yang ingin undangan <strong>simpel &amp; hemat</strong>.
                </div>
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Starter%20(Promo%20Rp%2050.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-primary-800 hover:bg-primary-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow transition-all hover:shadow-lg"
                >
                  Pilih Paket Starter
                </a>
              </div>
            </div>

            {/* 2. PREMIUM PLAN (Featured Best Seller) */}
            <div className="bg-[#1b2a47] text-white rounded-3xl p-5 sm:p-7 md:p-8 border-2 border-amber-300 shadow-2xl flex flex-col justify-between relative transform md:-translate-y-3 hover:-translate-y-5 hover:shadow-[0_25px_60px_-15px_rgba(27,42,71,0.6)] transition-all duration-500 reveal-scale delay-200">
              {/* Best Seller Top Ribbon */}
              <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 text-stone-950 text-[10px] sm:text-[11px] font-black px-4 sm:px-5 py-0.5 sm:py-1 rounded-full uppercase tracking-wider shadow-md whitespace-nowrap">
                BEST SELLER
              </div>

              <div>
                {/* Header */}
                <div className="text-center pb-5 border-b border-white/15 pt-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-wider font-cinzel">
                    PREMIUM
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-amber-200 mt-1">
                    Undangan Digital Lengkap
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-amber-200/70 text-sm sm:text-base font-semibold">
                        Rp 250.000
                      </span>
                      <span className="bg-amber-300 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Hemat 40%
                      </span>
                    </div>
                    <div className="text-3xl sm:text-4xl font-black text-white font-cinzel mt-0.5">
                      Rp 150.000
                    </div>
                  </div>
                </div>

                {/* Features List */}
                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-200">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span><strong>Semua fitur Starter</strong></span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Template premium</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Custom warna &amp; font</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Layout lebih fleksibel</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Gallery lebih banyak</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>RSVP + database</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Animasi / transisi</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Custom musik</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Digital envelope</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span>Revisi 3x</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-amber-300 flex-shrink-0" />
                    <span><strong>Aktif 1 bulan</strong></span>
                  </li>
                </ul>
              </div>

              {/* Bottom Note & Button with Shimmer Sweep */}
              <div className="space-y-4 pt-2">
                <div className="bg-[#121c30] rounded-xl p-3 text-center text-xs text-stone-200 border border-white/10">
                  Pilihan <strong>terbaik</strong> untuk hasil yang <strong>lebih maksimal</strong>.
                </div>
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Premium%20(Promo%20Rp%20150.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 hover:from-amber-300 hover:to-amber-100 font-extrabold text-xs sm:text-sm text-stone-950 shadow-lg hover:shadow-2xl transition-all relative overflow-hidden group active:scale-98"
                >
                  <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none" />
                  <span className="relative z-10">Pesan Paket Premium Sekarang</span>
                </a>
              </div>
            </div>

            {/* 3. CUSTOM PLAN */}
            <div className="bg-[#faf7f2] rounded-3xl p-5 sm:p-7 md:p-8 border border-stone-200/90 shadow-md flex flex-col justify-between hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 reveal-init delay-300 md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <div>
                {/* Header */}
                <div className="text-center pb-5 border-b border-stone-200/70">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-wider font-cinzel">
                    CUSTOM
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-stone-500 mt-1">
                    Fully Custom Wedding Website
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="bg-stone-200/80 text-stone-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Bebas Request
                      </span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-stone-950 font-cinzel mt-0.5">
                      Custom Design
                    </div>
                    <span className="text-[11px] font-medium text-stone-500 mt-0.5">
                      Menyesuaikan konsep &amp; kebutuhan Anda
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span><strong>Semua fitur Premium</strong></span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>100% custom design (Request tema)</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Sesuai tema &amp; dekorasi wedding</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Custom UI/UX &amp; layout</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Custom animation &amp; audio</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>QR Code &amp; Live Streaming</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>RSVP database + direct WA</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Digital envelope &amp; gift registry</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span>Revisi hingga 5x</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <CheckCircle2 size={16} className="text-primary-700 flex-shrink-0" />
                    <span><strong>Masa aktif menyesuaikan</strong></span>
                  </li>
                </ul>
              </div>

              {/* Bottom Note & Button */}
              <div className="space-y-4 pt-2">
                <div className="bg-[#ede8df] rounded-xl p-3 text-center text-xs text-stone-700">
                  Konsultasi gratis &amp; <strong>desain eksklusif</strong> sesuai konsep pernikahan Anda.
                </div>
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20desain%20undangan%20Paket%20Custom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-stone-900 hover:bg-stone-950 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-xl transition-all"
                >
                  Konsultasi Paket Custom
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full hover:bg-primary-100 transition-colors">
              <Heart size={14} className="text-rose-500 fill-rose-500 animate-pulse" />
              <span>Kisah Bahagia</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Cerita Dari Pasangan Pengantin Kami
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-stone-600">
              Banyak pasangan telah mempercayakan momen sakral mereka bersama WD Group. Inilah pengalaman mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between reveal-init delay-100 cursor-default">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-xs sm:text-sm leading-relaxed">
                  &ldquo;Sangat suka dengan desain dan detailnya baguss, dapat gratis undangan digital karena reservasi WO disini, pokoknya mantap sekali layanannya.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-100 mt-5">
                <img src="/photos/photo-4.jpg" alt="Rendy & Maya" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Rendy &amp; Maya</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Pernikahan di Jakarta • Tema Split Floral</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between reveal-init delay-200 cursor-default">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-xs sm:text-sm leading-relaxed">
                  &ldquo;Rekomendasi sekali pesan undangan digital disini, sesuai yang saya inginkan bahkan diluar ekspetasi saya.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-100 mt-5">
                <img src="/photos/photo-5.jpg" alt="Dimas & Nadia" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Dimas &amp; Nadia</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Pernikahan di Bandung • Tema Split Floral</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between reveal-init delay-300 cursor-default md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-xs sm:text-sm leading-relaxed">
                  &ldquo;Wajib order undangan digital disini, karena pelayanan yang cepattt, detail, harga terjangkau dan jelass sangatt sesuai ekspetasii.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-100 mt-5">
                <img src="/photos/photo-6.jpg" alt="Faris & Aisyah" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-xs sm:text-sm">Faris &amp; Aisyah</h4>
                  <p className="text-[11px] sm:text-xs text-stone-500">Pernikahan di Surabaya • Tema Split Floral</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-16 sm:py-24 bg-stone-100/70 border-t border-stone-200/70 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-10 sm:mb-16 space-y-3 reveal-init">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3.5 py-1.5 rounded-full">
              <span>Pertanyaan Umum</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Ada Pertanyaan? Kami Punya Jawabannya
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              Berikut hal-hal yang paling sering ditanyakan oleh calon pengantin.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 hover:border-primary-300 overflow-hidden transition-all shadow-xs reveal-init"
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-4 sm:p-6 text-left font-bold text-stone-900 flex justify-between items-center hover:text-primary-800 transition-colors gap-3"
                >
                  <span className="text-sm sm:text-base lg:text-lg leading-snug">{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-primary-700 transform transition-transform duration-300 flex-shrink-0 ${
                      openFaqIndex === idx ? 'rotate-180 text-primary-800' : ''
                    }`} 
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-4 pb-4 sm:px-6 sm:pb-6 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-3 sm:pt-4 animate-reveal-up">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-14 sm:py-20 relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src="/cover-lunar-bg.jpg" alt="Texture" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5 sm:space-y-6 reveal-scale">
          <span className="inline-block font-cinzel text-amber-300 uppercase tracking-widest text-xs sm:text-sm font-bold">
            WD GROUP DIGITAL INVITATION
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Wujudkan Undangan Pernikahan Impian Anda Hari Ini
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
            Mulai langkah awal menuju hari bahagia Anda. Ciptakan momen spesial yang abadi dan elegan bersama layanan profesional kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 text-stone-950 font-extrabold text-sm sm:text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center justify-center space-x-2 relative overflow-hidden group"
            >
              <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
              <MessageCircle size={18} className="relative z-10" />
              <span className="relative z-10">Hubungi Admin via WhatsApp</span>
            </a>

            <Link 
              to="/themes"
              className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2 transform hover:-translate-y-0.5"
            >
              <span>Katalog Tema</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-12 sm:py-16 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
            
            {/* Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-primary-800 flex items-center justify-center text-amber-200 font-cinzel font-bold">
                  WD
                </div>
                <span className="text-xl font-bold font-cinzel text-white tracking-wider">WD GROUP</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Penyedia solusi undangan pernikahan digital mewah, modern, dan profesional untuk menciptakan momen sakral pernikahan impian.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Navigasi Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Fitur Unggulan</a></li>
                <li><a href="#themes" className="hover:text-white transition-colors">Tema Desain</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Paket Harga</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimoni Pengantin</a></li>
              </ul>
            </div>

            {/* Themes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Tema Tersedia</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/themes" className="hover:text-white transition-colors">Split Floral Luxury</Link></li>
                <li><span className="text-stone-600">Tema berikutnya: Segera Hadir</span></li>
              </ul>
            </div>

            {/* Contact & Admin */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Layanan &amp; Dukungan</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20undangan%20pernikahan%20digital."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <span>WhatsApp: <span className="underline decoration-stone-600 group-hover:decoration-amber-300">+62 812-3456-7890</span></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:groupcompanywd@gmail.com?subject=Tanya%20Layanan%20Undangan%20Digital%20WD%20Group&body=Halo%20Tim%20WD%20Group,%0A%0ASaya%20ingin%20konsultasi%20mengenai%20layanan%20undangan%20pernikahan%20digital.%20Mohon%20informasi%20paket%20dan%20cara%20pemesanannya.%0A%0ATerima%20kasih."
                    className="hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <span>Email: <span className="underline decoration-stone-600 group-hover:decoration-amber-300">groupcompanywd@gmail.com</span></span>
                  </a>
                </li>
                <li>
                  <a 
                    href="https://maps.app.goo.gl/QQzuiA5vG9SgXRnG8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-300 transition-colors flex items-center group"
                  >
                    <span>Lokasi: <span className="underline decoration-stone-600 group-hover:decoration-amber-300">Surakarta, Jawa Tengah, Indonesia</span></span>
                  </a>
                </li>
                <li><span>Jam Kerja: 08.00 - 22.00 WIB</span></li>
                <li className="pt-2">
                  <Link to="/admin/login" className="text-amber-300 hover:underline font-semibold">
                    Masuk ke Admin Dashboard &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} WD Group. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" className="hover:text-stone-300">Kebijakan Privasi</a>
              <a href="#" className="hover:text-stone-300">Syarat &amp; Ketentuan</a>
              <a href="#" className="hover:text-stone-300">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION WIDGETS (Smooth & Interactive) */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-3 pointer-events-none">
        {/* Floating WhatsApp Quick Consultation Button with Pulse */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20tertarik%20konsultasi%20undangan%20pernikahan%20digital"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center space-x-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-2xl shadow-emerald-950/30 transition-all transform hover:scale-105 active:scale-95 group relative border border-emerald-400/30"
          aria-label="Konsultasi WhatsApp"
        >
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-30 animate-ping pointer-events-none" />
          <MessageCircle size={18} className="relative z-10 fill-white/20 shrink-0" />
          <span className="relative z-10 text-xs font-bold hidden sm:inline-block pr-1">Tanya Kami di WA</span>
        </a>

        {/* Floating Scroll-To-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md text-stone-700 border border-stone-200/90 shadow-xl hover:bg-primary-900 hover:text-amber-200 hover:border-primary-900 transition-all flex items-center justify-center transform hover:scale-110 active:scale-95 animate-reveal-up"
            aria-label="Scroll to top"
            title="Kembali ke Atas"
          >
            <ChevronUp size={20} />
          </button>
        )}
      </div>

    </div>
  );
};
