import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { themeService, REAL_SPLIT_FLORAL_THEME, DEFAULT_THEMES } from '../../services/themeService';
import { translations, Lang } from '../../i18n/translations';
import { 
  Heart, 
  Music, 
  MapPin, 
  Calendar, 
  Gift, 
  CheckCircle2, 
  Users, 
  ChevronDown, 
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Play, 
  Pause, 
  Smartphone, 
  ArrowRight, 
  MessageCircle, 
  Check, 
  Menu, 
  X,
  Palette,
  ExternalLink,
  Sparkles,
  HelpCircle,
  Bot,
  Send,
  RotateCcw,
  Globe
} from 'lucide-react';

export const Home: React.FC = () => {
  const [lang, setLang] = useState<Lang>('id');
  const t = useCallback((key: keyof typeof translations): any => {
    return translations[key][lang];
  }, [lang]);
  const toggleLang = () => setLang(prev => prev === 'id' ? 'en' : 'id');

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Showcase Themes for Hero Phone Mockup Slider
  const showcaseBadges = t('showcaseBadge') as unknown as string[];
  const showcaseThemes = [
    {
      id: 'javanese-heritage',
      name: 'Javanese Heritage',
      slug: 'javanese-heritage',
      badge: showcaseBadges[0],
      couple: 'Habib & Adiba',
      date: 'Sabtu, 24 Oktober 2026',
      preview: '/themes/javanese-heritage-theme-preview.png',
      musicTitle: 'Bergema Sampai Selamanya - Nadhief Basalamah (Piano)',
      musicUrl: '/music/bergema-sampai-selamanya.mp3',
      demoUrl: '/invitation/steven-bunga?theme=javanese-heritage'
    },
    {
      id: 'maroon-gold',
      name: 'Maroon Gold',
      slug: 'maroon-gold',
      badge: showcaseBadges[1],
      couple: 'Faris & Aisyah',
      date: 'Minggu, 15 November 2026',
      preview: '/themes/maroon-gold-theme-preview.png',
      musicTitle: 'Canon in D (Royal Strings)',
      musicUrl: '/music/maroon-gold-canon.mp3',
      demoUrl: '/invitation/steven-bunga?theme=maroon-gold'
    },
    {
      id: 'secret-garden',
      name: 'Secret Garden',
      slug: 'secret-garden',
      badge: showcaseBadges[2],
      couple: 'Dimas & Nadia',
      date: 'Sabtu, 12 Desember 2026',
      preview: '/themes/secret-garden-theme-preview.png',
      musicTitle: 'A Thousand Years (Piano)',
      musicUrl: '/music/secret-garden.mp3',
      demoUrl: '/invitation/steven-bunga?theme=secret-garden'
    },
    {
      id: 'split-floral',
      name: 'Split Floral',
      slug: 'split-floral',
      badge: showcaseBadges[3],
      couple: 'Steven & Bunga',
      date: 'Minggu, 20 Desember 2026',
      preview: '/themes/split-floral-theme-preview.png',
      musicTitle: 'Beautiful In White',
      musicUrl: '/beautiful-in-white.mp3',
      demoUrl: '/invitation/steven-bunga?theme=split-floral'
    }
  ];

  const [activeMockupThemeIndex, setActiveMockupThemeIndex] = useState(0);
  const currentShowcase = showcaseThemes[activeMockupThemeIndex];
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const mockupAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const autoSlideTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const autoSlideResumeRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [autoSlidePaused, setAutoSlidePaused] = useState(false);

  // Auto-slide: cycle themes every 5 seconds
  useEffect(() => {
    if (autoSlidePaused) {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
        autoSlideTimerRef.current = null;
      }
      return;
    }

    autoSlideTimerRef.current = setInterval(() => {
      setActiveMockupThemeIndex(prev => (prev + 1) % showcaseThemes.length);
    }, 5000);

    return () => {
      if (autoSlideTimerRef.current) {
        clearInterval(autoSlideTimerRef.current);
      }
    };
  }, [autoSlidePaused, showcaseThemes.length]);

  // Pause auto-slide on manual interaction, resume after 8s
  const pauseAutoSlide = () => {
    setAutoSlidePaused(true);
    if (autoSlideResumeRef.current) {
      clearTimeout(autoSlideResumeRef.current);
    }
    autoSlideResumeRef.current = setTimeout(() => {
      setAutoSlidePaused(false);
    }, 8000);
  };

  // Cleanup resume timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSlideResumeRef.current) {
        clearTimeout(autoSlideResumeRef.current);
      }
    };
  }, []);

  // Sync audio source when theme changes if playing
  useEffect(() => {
    if (mockupAudioRef.current) {
      mockupAudioRef.current.src = currentShowcase.musicUrl;
      if (isPlayingAudio) {
        mockupAudioRef.current.play().catch(() => setIsPlayingAudio(false));
      }
    }
  }, [activeMockupThemeIndex]);

  const toggleMockupAudio = () => {
    if (!mockupAudioRef.current) return;
    if (isPlayingAudio) {
      mockupAudioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      mockupAudioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.warn('Playback blocked by browser policy:', err);
        setIsPlayingAudio(false);
      });
    }
  };

  const handlePrevTheme = () => {
    pauseAutoSlide();
    setActiveMockupThemeIndex(prev => (prev - 1 + showcaseThemes.length) % showcaseThemes.length);
  };

  const handleNextTheme = () => {
    pauseAutoSlide();
    setActiveMockupThemeIndex(prev => (prev + 1) % showcaseThemes.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 40) {
      handlePrevTheme();
    } else if (diff < -40) {
      handleNextTheme();
    }
    setTouchStartX(null);
  };

  // Live countdown ticker inside the phone mockup preview
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

  // Scroll to top button visibility
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

  // Guaranteed fallback to active themes or default themes
  const displayThemes = React.useMemo(() => {
    return (activeThemes && activeThemes.length > 0) 
      ? activeThemes 
      : DEFAULT_THEMES;
  }, [activeThemes]);

  // IntersectionObserver for clean scroll reveals with safety fallback
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

  interface ChatMessage {
    id: string;
    sender: 'bot' | 'user';
    text: string;
    time: string;
    actionUrl?: string;
    actionLabel?: string;
  }

  const faqChips = t('faqChips') as unknown as string[];
  const faqQuestions = t('faqQuestions') as unknown as string[];
  const faqAnswers = t('faqAnswers') as unknown as string[];

  const FAQ_KNOWLEDGE_BASE = [
    { id: 'proses', chip: faqChips[0], keywords: ['lama', 'waktu', 'proses', 'cepat', 'berapa lama', 'hari', 'kilat', 'draf', 'selesai', 'how long', 'time', 'fast'], question: faqQuestions[0], answer: faqAnswers[0] },
    { id: 'musik', chip: faqChips[1], keywords: ['musik', 'lagu', 'audio', 'sound', 'backsound', 'request lagu', 'mp3', 'gamelan', 'piano', 'music', 'song'], question: faqQuestions[1], answer: faqAnswers[1] },
    { id: 'wa-generator', chip: faqChips[2], keywords: ['wa', 'whatsapp', 'nama tamu', 'tamu', 'generator', 'kirim', 'sebar', 'link', 'tautan', 'guest name', 'send'], question: faqQuestions[2], answer: faqAnswers[2] },
    { id: 'kuota', chip: faqChips[3], keywords: ['kuota', 'batas', 'jumlah', 'tamu', 'berapa orang', 'masa aktif', 'aktif', 'kadaluarsa', 'limit', 'guest', 'active'], question: faqQuestions[3], answer: faqAnswers[3] },
    { id: 'rsvp', chip: faqChips[4], keywords: ['rsvp', 'amplop', 'kado', 'hadiah', 'rekening', 'qris', 'bank', 'kehadiran', 'ucapan', 'envelope', 'gift'], question: faqQuestions[4], answer: faqAnswers[4] },
    { id: 'revisi', chip: faqChips[5], keywords: ['revisi', 'garansi', 'ubah', 'ganti', 'jadwal', 'lokasi', 'batal', 'geser', 'revision', 'guarantee', 'change'], question: faqQuestions[5], answer: faqAnswers[5] },
    { id: 'harga', chip: faqChips[6], keywords: ['harga', 'biaya', 'paket', 'biaya buat', 'promo', 'murah', 'starter', 'premium', 'custom', 'bayar', 'price', 'cost', 'package'], question: faqQuestions[6], answer: faqAnswers[6] }
  ];

  const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
    {
      id: 'bot-init-1',
      sender: 'bot',
      text: t('chatInit1') as string,
      time: 'Online'
    },
    {
      id: 'bot-init-2',
      sender: 'bot',
      text: t('chatInit2') as string,
      time: 'Online'
    }
  ];

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatMessagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatMessagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleAskQuestion = (questionText: string, customAnswer?: string) => {
    const trimmed = questionText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: trimmed,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsTyping(true);

    setTimeout(() => {
      let botResponse = customAnswer;
      let actionUrl: string | undefined = undefined;
      let actionLabel: string | undefined = undefined;

      if (!botResponse) {
        const lower = trimmed.toLowerCase();
        const found = FAQ_KNOWLEDGE_BASE.find(f => 
          f.question.toLowerCase() === lower || 
          f.keywords.some(k => lower.includes(k))
        );

         if (found) {
          botResponse = found.answer;
        } else {
          botResponse = t('faqFallback') as string;
          actionUrl = `https://wa.me/6285707909415?text=${encodeURIComponent(`Halo WD Group, saya ingin konsultasi: "${trimmed}"`)}`;
          actionLabel = t('faqWaAction') as string;
        }
      }

      const botMsg: ChatMessage = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString(lang === 'id' ? 'id-ID' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
        actionUrl,
        actionLabel
      };

      setIsTyping(false);
      setChatMessages(prev => [...prev, botMsg]);
    }, 400);
  };

  const handleResetChat = () => {
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIsTyping(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-jakarta selection:bg-primary-700 selection:text-white overflow-x-clip">
      
      {/* Top Announcement Bar */}
      <div className="bg-[#1c1917] text-stone-200 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center gap-2 relative z-50">
        <span>{t('announcementText') as string}</span>
        <a href="#themes" className="underline font-semibold text-amber-300 hover:text-white transition-colors">
          {t('announcementLink') as string} &rarr;
        </a>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary-900 flex items-center justify-center text-amber-200 shadow-sm transition-transform group-hover:scale-105">
              <span className="font-cinzel text-lg font-bold tracking-wider">WD</span>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold font-cinzel text-stone-900 tracking-wider block leading-none">
                WD GROUP
              </span>
              <span className="text-[10px] tracking-[0.2em] text-stone-500 font-semibold uppercase mt-0.5 block">
                {t('brandSubtitle') as string}
              </span>
            </div>
          </Link>

          {/* Streamlined Desktop Navigation Links (5 Clean Links) */}
          <nav className="hidden lg:flex items-center space-x-8 text-xs font-bold text-stone-600 tracking-wider uppercase">
            <a href="#themes" className="hover:text-primary-800 transition-colors">{t('navThemes') as string}</a>
            <a href="#keunggulan" className="hover:text-primary-800 transition-colors">{t('navFeatures') as string}</a>
            <a href="#alur" className="hover:text-primary-800 transition-colors">{t('navWorkflow') as string}</a>
            <a href="#pricing" className="hover:text-primary-800 transition-colors">{t('navPricing') as string}</a>
            <a href="#faq" className="hover:text-primary-800 transition-colors">{t('navFaq') as string}</a>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20tertarik%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital"
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center space-x-2 bg-primary-900 hover:bg-primary-950 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle size={15} className="text-amber-300" />
              <span>{t('navConsult') as string}</span>
            </a>

            {/* Language Toggle */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-colors cursor-pointer"
              aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe size={14} />
              <span className="hidden min-[420px]:inline">{t('langToggle') as string}</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-5 py-6 space-y-4 animate-reveal-up shadow-lg">
            <nav className="flex flex-col space-y-3.5 text-sm font-semibold text-stone-700">
              <a href="#themes" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{t('navThemes') as string}</a>
              <a href="#keunggulan" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{t('mobileNavFeatures') as string}</a>
              <a href="#alur" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{t('mobileNavWorkflow') as string}</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{t('navPricing') as string}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{t('mobileNavFaq') as string}</a>
            </nav>
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
              <a 
                href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20tertarik%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-primary-900 rounded-xl"
              >
                {t('mobileNavConsultWa') as string}
              </a>
              <Link 
                to="/admin/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 text-xs font-medium text-stone-500 hover:text-stone-800"
              >
                {t('mobileNavAdmin') as string} &rarr;
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="pt-12 sm:pt-16 pb-16 sm:pb-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Editorial Category Label */}
              <div className="text-xs font-bold tracking-[0.2em] text-primary-800 uppercase font-serif">
                {t('heroLabel') as string}
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-stone-900 tracking-tight leading-[1.18]">
                {t('heroHeadline') as string} <span className="font-playfair italic font-normal text-primary-800" style={{ whiteSpace: 'nowrap' }}>{t('heroAccent') as string}</span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                {t('heroSubheadline') as string}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
                <a 
                  href="#themes"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-primary-800 hover:bg-primary-900 active:scale-98 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <span>{t('heroCta1') as string}</span>
                  <ArrowRight size={16} />
                </a>

                <Link 
                  to="/themes"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-stone-800 font-bold text-xs sm:text-sm border border-stone-300 hover:bg-stone-50 hover:border-stone-400 transition-all flex items-center justify-center space-x-2"
                >
                  <Smartphone size={16} className="text-stone-600" />
                  <span>{t('heroCta2') as string}</span>
                </Link>
              </div>

              {/* Trust Indicators (Centered on mobile, left-aligned on desktop) */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-6 text-xs text-stone-600">
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>{t('trustOriginal') as string}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>{t('trustWa') as string}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={16} className="text-emerald-700 shrink-0" />
                  <span>{t('trustResponsive') as string}</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Mockup Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full">
              
              {/* Real Audio Player for Mockup Preview */}
              <audio 
                ref={mockupAudioRef} 
                src={currentShowcase.musicUrl} 
                preload="none" 
                onEnded={() => setIsPlayingAudio(false)} 
              />

              {/* Phone Frame Mockup */}
              <div className="w-full max-w-[280px] min-[380px]:max-w-[310px] sm:max-w-[330px] rounded-[44px] bg-stone-950 p-3 sm:p-3.5 shadow-2xl border-4 border-stone-800 relative mx-auto select-none">
                
                {/* Speaker & Notch */}
                <div className="w-28 h-3.5 bg-stone-900 rounded-full mx-auto mb-2.5 flex items-center justify-center space-x-1.5">
                  <div className="w-2 h-2 rounded-full bg-stone-950" />
                  <div className="w-1.5 h-1.5 rounded-full bg-stone-800" />
                </div>

                {/* Phone Screen Container */}
                <div className="rounded-[32px] bg-[#fbf9f6] overflow-hidden border border-stone-200/40 text-center">
                  
                  {/* Music Player Bar */}
                  <div className="bg-primary-900 text-white px-3.5 py-2.5 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={toggleMockupAudio}
                        className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-colors cursor-pointer"
                        title={isPlayingAudio ? t('mockupPause') as string : t('mockupPlay') as string}
                        aria-label={isPlayingAudio ? t('mockupPause') as string : t('mockupPlay') as string}
                      >
                        {isPlayingAudio ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                      </button>
                      <div className="text-left leading-tight">
                        <p className="text-[9px] text-amber-200 font-semibold tracking-wider uppercase">{t('mockupMusicLabel') as string}</p>
                        <p className="text-[11px] font-medium truncate max-w-[130px] text-stone-100">{currentShowcase.musicTitle}</p>
                      </div>
                    </div>
                    <Music size={13} className={`text-amber-200 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                  </div>

                  {/* Invitation Preview Hero with Slide Controls & Touch Swipe */}
                  <div 
                    className="relative h-60 sm:h-64 overflow-hidden group touch-pan-y"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    <img 
                      key={currentShowcase.slug}
                      src={currentShowcase.preview} 
                      alt={`Tema ${currentShowcase.name}`} 
                      className="w-full h-full object-cover transition-all duration-300" 
                    />

                    {/* Prev Slide Arrow */}
                    <button
                      onClick={handlePrevTheme}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-950/65 hover:bg-stone-950/90 text-white backdrop-blur-xs flex items-center justify-center transition-all z-20 shadow-md border border-white/25 active:scale-95 cursor-pointer"
                      aria-label="Tema Sebelumnya"
                      title="Tema Sebelumnya"
                    >
                      <ChevronLeft size={16} />
                    </button>

                    {/* Next Slide Arrow */}
                    <button
                      onClick={handleNextTheme}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-stone-950/65 hover:bg-stone-950/90 text-white backdrop-blur-xs flex items-center justify-center transition-all z-20 shadow-md border border-white/25 active:scale-95 cursor-pointer"
                      aria-label="Tema Selanjutnya"
                      title="Tema Selanjutnya"
                    >
                      <ChevronRight size={16} />
                    </button>

                    {/* Overlay Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent flex flex-col justify-end p-4 text-white text-left pointer-events-none">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[10px] uppercase tracking-widest text-amber-300 font-bold drop-shadow-xs">
                          {currentShowcase.name}
                        </span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-xs text-white/90 font-mono font-bold">
                          {activeMockupThemeIndex + 1}/{showcaseThemes.length}
                        </span>
                      </div>
                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow-xs">
                        {currentShowcase.couple}
                      </h3>
                      <p className="text-[11px] text-stone-200 mt-1 font-light flex items-center space-x-1">
                        <Calendar size={12} className="text-amber-300 inline shrink-0" />
                        <span>{currentShowcase.date}</span>
                      </p>
                    </div>
                  </div>

                  {/* Slide Indicators */}
                  <div className="flex items-center justify-center gap-1.5 pt-2 pb-1 bg-white">
                    {showcaseThemes.map((th, i) => (
                      <button
                        key={th.id}
                        onClick={() => { pauseAutoSlide(); setActiveMockupThemeIndex(i); }}
                        className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                          activeMockupThemeIndex === i 
                            ? 'w-5 bg-primary-900' 
                            : 'w-1.5 bg-stone-300 hover:bg-stone-400'
                        }`}
                        aria-label={`Pilih tema ${th.name}`}
                      />
                    ))}
                  </div>

                  {/* Live Dynamic Countdown Box */}
                  <div className="p-3.5 bg-white border-b border-stone-100">
                    <p className="text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-2">
                      {t('mockupCountdownLabel') as string}
                    </p>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                        <span className="block text-xs sm:text-sm font-bold text-stone-900 font-mono">{countdown.days}</span>
                        <span className="text-[8px] text-stone-500 uppercase">{t('mockupCountdownDays') as string}</span>
                      </div>
                      <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                        <span className="block text-xs sm:text-sm font-bold text-stone-900 font-mono">{String(countdown.hours).padStart(2, '0')}</span>
                        <span className="text-[8px] text-stone-500 uppercase">{t('mockupCountdownHours') as string}</span>
                      </div>
                      <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                        <span className="block text-xs sm:text-sm font-bold text-stone-900 font-mono">{String(countdown.minutes).padStart(2, '0')}</span>
                        <span className="text-[8px] text-stone-500 uppercase">{t('mockupCountdownMin') as string}</span>
                      </div>
                      <div className="bg-stone-50 p-1.5 rounded-lg border border-stone-200">
                        <span className="block text-xs sm:text-sm font-bold text-stone-900 font-mono">{String(countdown.seconds).padStart(2, '0')}</span>
                        <span className="text-[8px] text-stone-500 uppercase">{t('mockupCountdownSec') as string}</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Demo Button - changes link and name based on active theme */}
                  <div className="p-3.5 bg-[#faf8f5]">
                    <a 
                      href={currentShowcase.demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full bg-primary-800 hover:bg-primary-900 text-white py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-sm group active:scale-98"
                    >
                      <span>{t('mockupDemoBtn') as string} ({currentShowcase.name})</span>
                      <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </div>

                </div>

                {/* Bottom Home Indicator */}
                <div className="w-24 h-1 bg-stone-700 rounded-full mx-auto mt-2.5" />
              </div>


            </div>

          </div>
        </div>
      </section>

      {/* UNIFIED KEUNGGULAN & FITUR SECTION (Merged Cleanly) */}
      <section id="keunggulan" className="py-20 sm:py-24 bg-white border-y border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-800 font-serif">
              {t('featuresLabel') as string}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('featuresTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {t('featuresDesc') as string}
            </p>
          </div>

          {/* Two Flagship Showcase Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            
            {/* Flagship 1: Cinematic Video & Audio */}
            <div className="bg-[#faf8f5] rounded-3xl p-7 sm:p-9 border border-stone-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary-900 text-amber-200 flex items-center justify-center">
                  <Play size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {t('flagship1Title') as string}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('flagship1Desc') as string}
                </p>
              </div>
              <div className="pt-6 border-t border-stone-200/70 mt-6 grid grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>{t('flagship1Check1') as string}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>{t('flagship1Check2') as string}</span>
                </div>
              </div>
            </div>

            {/* Flagship 2: RSVP & Digital Guestbook */}
            <div className="bg-[#faf8f5] rounded-3xl p-7 sm:p-9 border border-stone-200 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-primary-900 text-amber-200 flex items-center justify-center">
                  <CheckCircle2 size={20} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900">
                  {t('flagship2Title') as string}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {t('flagship2Desc') as string}
                </p>
              </div>
              <div className="pt-6 border-t border-stone-200/70 mt-6 grid grid-cols-2 gap-3 text-xs text-stone-700">
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>{t('flagship2Check1') as string}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check size={14} className="text-emerald-700 shrink-0" />
                  <span>{t('flagship2Check2') as string}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Four Core Capabilities (Clean 4-column row) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200/70 flex items-center justify-center text-primary-900">
                <Gift size={18} />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{t('cap1Title') as string}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('cap1Desc') as string}
              </p>
            </div>

            <div className="bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200/70 flex items-center justify-center text-primary-900">
                <MapPin size={18} />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{t('cap2Title') as string}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('cap2Desc') as string}
              </p>
            </div>

            <div className="bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200/70 flex items-center justify-center text-primary-900">
                <Users size={18} />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{t('cap3Title') as string}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('cap3Desc') as string}
              </p>
            </div>

            <div className="bg-[#faf8f5] rounded-2xl p-6 border border-stone-200/90 space-y-3">
              <div className="w-10 h-10 rounded-lg bg-stone-200/70 flex items-center justify-center text-primary-900">
                <Calendar size={18} />
              </div>
              <h4 className="font-bold text-stone-900 text-sm">{t('cap4Title') as string}</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t('cap4Desc') as string}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* THEMES SHOWCASE SECTION */}
      <section id="themes" className="py-20 sm:py-24 bg-[#f5f1eb] border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-800 font-serif">
              {t('themesLabel') as string}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('themesTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              {t('themesDesc') as string}
            </p>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {displayThemes.map((theme) => {
              const isGarden = theme.slug === 'secret-garden';
              const isJavanese = theme.slug === 'javanese-heritage' || theme.slug === 'jawa-klasik' || theme.slug === 'borobudur';
              const isMaroon = theme.slug === 'maroon-gold';
              const isSplit = theme.slug === 'split-floral';

              const previewImg = theme.preview_image || theme.thumbnail || (isGarden 
                ? '/themes/secret-garden-theme-preview.png'
                : (isSplit 
                    ? '/themes/split-floral-theme-preview.png' 
                    : '/themes/javanese-heritage-theme-preview.png'));

              const demoUrl = isJavanese 
                ? '/invitation/steven-bunga?theme=javanese-heritage' 
                : (theme.slug ? `/invitation/steven-bunga?theme=${theme.slug}` : '/themes');

              const featuresList = isJavanese ? [
                'Ilustrasi Candi Borobudur & Batik Truntum',
                'Ornamen Anggrek Marun & Nuansa Terracotta',
                'Split Screen Desktop & Full Mobile Interaktif',
                'Amplop Digital (BCA/Mandiri/BSI), RSVP & Buku Tamu'
              ] : isMaroon ? [
                'Transisi Video Gerbang Istana Kerajaan',
                'Nuansa Merah Marun & Bingkai Emas Vintage',
                'Timeline Kisah Cinta & Galeri Lightbox',
                'RSVP Real-Time & Rekening Amplop Digital'
              ] : isGarden ? [
                'Video Entrance Sinematik HD',
                'Nuansa Dusty Rose & Dresscode Swatches',
                'Bingkai Oval Arched & Amplop Digital',
                'Hitung Mundur Real-Time & Add to Calendar'
              ] : isSplit ? [
                'Transisi Video Cover Entrance Megah',
                'Tampilan Split-Screen Desktop & Fullscreen Mobile',
                'Backsound Saxophone & Pemutar Audio Piringan Hitam',
                'RSVP, Buku Tamu, Amplop Digital & Google Maps'
              ] : (
                Array.isArray(theme.features) && theme.features.length > 0
                  ? theme.features.slice(0, 4).map((f: any) => typeof f === 'string' ? f : f.name || 'Fitur Lengkap')
                  : [
                    'Desain Responsif Mobile & Desktop',
                    'Formulir RSVP & Ucapan Online',
                    'Amplop Digital & Navigasi Lokasi',
                    'Musik Latar & Countdown Interaktif'
                  ]
              );

              return (
                <div 
                  key={theme.id || theme.slug}
                  className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                    
                    {/* Image Preview */}
                    <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto min-h-[220px] sm:min-h-full overflow-hidden bg-stone-900">
                      <img 
                        src={previewImg} 
                        alt={theme.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out" 
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
                          {theme.category || (isJavanese ? 'Traditional & Heritage' : isGarden ? 'Botanical & Garden' : 'Floral & Classic')}
                        </span>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="sm:col-span-7 p-6 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider text-primary-800 mb-1">
                          {isJavanese ? 'Nusantara Masterpiece' : isGarden ? 'Botanical Romance' : isMaroon ? 'Royal Classic' : isSplit ? 'Flagship Masterpiece' : (theme.category || 'Special Edition')}
                        </div>
                        <h3 className="font-bold text-xl sm:text-2xl text-stone-900">{theme.name}</h3>
                        <p className="text-stone-600 text-xs mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {theme.description || (isJavanese
                            ? 'Tema bernuansa kemegahan Candi Borobudur, ornamen batik klasik, paduan warna terracotta & merah marun, serta rangkaian anggrek vintage.'
                            : isGarden 
                            ? 'Tema bernuansa taman romantis dusty rose & earthy mauve, bingkai foto lengkung oval, video entrance sinematik, dan ornamen bunga melayang.'
                            : 'Tema split screen klasik dengan ornamen floral melengkung vintage, entrance video arch, dan alunan saxophone romantis.')}
                        </p>

                        <div className="mt-4 space-y-1.5 text-xs text-stone-700">
                          {featuresList.map((featureText, idx) => (
                            <div key={idx} className="flex items-center space-x-2">
                              <Check size={14} className="text-emerald-700 shrink-0" />
                              <span className="line-clamp-1">{featureText}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-stone-100">
                        <Link 
                          to="/themes"
                          className="w-full sm:flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-800 font-bold text-xs hover:bg-stone-50 transition-colors text-center block"
                        >
                          {t('themeCatalogBtn') as string}
                        </Link>
                        <a 
                          href={demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:flex-1 py-2.5 rounded-xl bg-primary-800 text-white font-bold text-xs hover:bg-primary-900 transition-colors text-center block"
                        >
                          {t('themeDemoBtn') as string}
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Theme Request Notice */}
          <div className="mt-8 max-w-6xl mx-auto bg-white rounded-2xl border border-stone-200 p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900">{t('themeCustomTitle') as string}</h3>
              <p className="text-xs text-stone-600 mt-0.5">
                {t('themeCustomDesc') as string}
              </p>
            </div>
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20apakah%20bisa%20konsultasi%20request%20custom%20tema?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-bold hover:bg-stone-800 transition-colors shrink-0"
            >
              {t('themeCustomBtn') as string}
            </a>
          </div>

        </div>
      </section>

      {/* ALUR PEMESANAN (Workflow Narrative) */}
      <section id="alur" className="py-20 sm:py-24 bg-white border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-800 font-serif">
              {t('workflowLabel') as string}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('workflowTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              {t('workflowDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-900 text-amber-200 font-cinzel text-base font-bold flex items-center justify-center">
                01
              </div>
              <h3 className="font-bold text-stone-900 text-base">{t('step1Title') as string}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t('step1Desc') as string}
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-900 text-amber-200 font-cinzel text-base font-bold flex items-center justify-center">
                02
              </div>
              <h3 className="font-bold text-stone-900 text-base">{t('step2Title') as string}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t('step2Desc') as string}
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-900 text-amber-200 font-cinzel text-base font-bold flex items-center justify-center">
                03
              </div>
              <h3 className="font-bold text-stone-900 text-base">{t('step3Title') as string}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t('step3Desc') as string}
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-6 rounded-2xl bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-start space-y-3">
              <div className="w-10 h-10 rounded-xl bg-primary-900 text-amber-200 font-cinzel text-base font-bold flex items-center justify-center">
                04
              </div>
              <h3 className="font-bold text-stone-900 text-base">{t('step4Title') as string}</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t('step4Desc') as string}
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING SECTION (Preserves Requested 'Start from' Labels) */}
      <section id="pricing" className="py-20 sm:py-24 bg-[#f5f1eb] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-800 font-serif">
              {t('pricingLabel') as string}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('pricingTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              {t('pricingDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* 1. STARTER PLAN */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-center pb-5 border-b border-stone-200">
                  <h3 className="text-2xl font-extrabold text-stone-900 tracking-wider font-cinzel">
                    STARTER
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-1">
                    Undangan Digital Praktis
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-stone-400 text-sm font-semibold">
                        Rp 150.000
                      </span>
                      <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Hemat 67%
                      </span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 mt-1.5">
                      Start from
                    </span>
                    <div className="text-3xl font-black text-stone-950 font-cinzel mt-0.5">
                      Rp 50.000
                    </div>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Pilihan tema standar pilihan</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Foto &amp; informasi kedua mempelai</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Detail jadwal akad &amp; resepsi</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Hitung mundur acara &amp; Google Maps</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Konfirmasi RSVP &amp; ucapan doa restu</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Amplop transfer digital</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Revisi data 1 kali</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span><strong>Masa aktif 7 hari</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Starter%20(Start%20from%20Rp%2050.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-xl bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  Pilih Paket Starter
                </a>
              </div>
            </div>

            {/* 2. PREMIUM PLAN */}
            <div className="bg-[#1c1917] text-white rounded-3xl p-6 sm:p-8 border-2 border-amber-400 shadow-2xl flex flex-col justify-between relative ring-1 ring-amber-400/30">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm">
                {t('premiumBadge') as string}
              </div>

              <div>
                <div className="text-center pb-5 border-b border-white/15 pt-2">
                  <h3 className="text-2xl font-extrabold text-white tracking-wider font-cinzel">
                    PREMIUM
                  </h3>
                  <p className="text-xs font-medium text-amber-200 mt-1">
                    Undangan Digital Fitur Lengkap
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-stone-400 text-sm font-semibold">
                        Rp 250.000
                      </span>
                      <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Hemat 40%
                      </span>
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 mt-1.5">
                      Start from
                    </span>
                    <div className="text-3xl font-black text-white font-cinzel mt-0.5">
                      Rp 150.000
                    </div>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-100">
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span><strong>Seluruh fitur Paket Starter</strong></span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Akses seluruh tema premium eksklusif</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Kustomisasi warna &amp; tipografi tema</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Galeri foto lebih banyak &amp; love story</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Manajemen RSVP &amp; database tamu</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Transisi video gerbang &amp; musik custom</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span>Revisi data hingga 3 kali</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-amber-300 shrink-0" />
                    <span><strong>Masa aktif 1 bulan penuh</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Premium%20(Start%20from%20Rp%20150.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 font-extrabold text-xs sm:text-sm text-stone-950 transition-colors shadow-md"
                >
                  Pesan Paket Premium
                </a>
              </div>
            </div>

            {/* 3. CUSTOM PLAN */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm flex flex-col justify-between md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <div>
                <div className="text-center pb-5 border-b border-stone-200">
                  <h3 className="text-2xl font-extrabold text-stone-900 tracking-wider font-cinzel">
                    CUSTOM
                  </h3>
                  <p className="text-xs font-medium text-stone-500 mt-1">
                    Bespoke Wedding Website
                  </p>

                  <div className="mt-4 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Bebas Request
                      </span>
                    </div>
                    <div className="text-2xl font-black text-stone-950 font-cinzel mt-1">
                      Custom Design
                    </div>
                    <span className="text-[11px] font-medium text-stone-500 mt-0.5">
                      Menyesuaikan konsep &amp; dekorasi Anda
                    </span>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span><strong>Seluruh fitur Paket Premium</strong></span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Desain khusus 100% dari nol sesuai tema</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Kustomisasi animasi, ilustrasi &amp; layout</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Integrasi QR Code kehadiran di lokasi</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span>Revisi hingga 5 kali bersama desainer</span>
                  </li>
                  <li className="flex items-center space-x-2.5">
                    <Check size={16} className="text-emerald-700 shrink-0" />
                    <span><strong>Masa aktif fleksibel menyesuaikan</strong></span>
                  </li>
                </ul>
              </div>

              <div className="pt-2">
                <a 
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20desain%20undangan%20Paket%20Custom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-xl bg-stone-900 hover:bg-stone-950 text-white font-bold text-xs sm:text-sm transition-colors"
                >
                  Konsultasi Paket Custom
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary-800 font-serif">
              {t('testimonialsLabel') as string}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              {t('testimonialsTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600">
              {t('testimonialsDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#faf8f5] rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                &ldquo;Sangat suka dengan detail visual dan ornamen batiknya. Tamu-tamu keluarga besar kami sangat mengapresiasi karena mudah dibuka di HP dan musiknya sakral.&rdquo;
              </p>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-200/70 mt-6">
                <img src="/photos/avatar-rendy-maya.jpg" alt="Rendy & Maya" className="w-11 h-11 rounded-full object-cover border border-stone-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Rendy &amp; Maya</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Solo • Tema Javanese Heritage</p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf8f5] rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                &ldquo;Pelayanan cepat dan ramah, revisi langsung dibantu admin. Fitur generator nama tamu di WhatsApp sangat membantu menghemat waktu sebar undangan.&rdquo;
              </p>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-200/70 mt-6">
                <img src="/photos/avatar-dimas-nadia.jpg" alt="Dimas & Nadia" className="w-11 h-11 rounded-full object-cover border border-stone-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Dimas &amp; Nadia</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Yogyakarta • Tema Split Floral</p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf8f5] rounded-3xl p-7 border border-stone-200/90 shadow-xs flex flex-col justify-between md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <p className="text-stone-700 text-sm leading-relaxed italic">
                &ldquo;Transisi video gerbang pembukanya sangat mewah. Banyak teman kami yang memuji undangannya terasa eksklusif dan beda dari undangan digital biasa.&rdquo;
              </p>
              <div className="flex items-center space-x-3 pt-5 border-t border-stone-200/70 mt-6">
                <img src="/photos/avatar-faris-aisyah.jpg" alt="Faris & Aisyah" className="w-11 h-11 rounded-full object-cover border border-stone-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Faris &amp; Aisyah</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Semarang • Tema Maroon Gold</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FAQ CHATBOT SECTION */}
      <section id="faq" className="py-20 sm:py-24 bg-[#f7f4ee] border-t border-stone-200/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-200/80 text-stone-800 text-xs font-semibold tracking-wide">
              <Bot size={15} className="text-primary-800" />
              <span>{t('faqBotLabel') as string}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              {t('faqTitle') as string}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              {t('faqDesc') as string}
            </p>
          </div>

          {/* Chatbot Window Container */}
          <div className="bg-white rounded-3xl border border-stone-300/80 shadow-xl overflow-hidden flex flex-col">
            
            {/* Chatbot Header */}
            <div className="bg-stone-950 text-white px-5 py-4 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-primary-800 flex items-center justify-center text-amber-300 font-bold border border-amber-300/30 shadow-xs">
                    <Bot size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-stone-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>WD Wedding Assistant</span>
                    <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">Bot FAQ</span>
                  </h3>
                  <p className="text-xs text-stone-400">{t('faqBotStatus') as string}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetChat}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={t('faqResetTitle') as string}
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <a
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20tanya%20langsung%20dengan%20tim%20desainer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle size={13} />
                  <span className="hidden sm:inline">{t('faqChatWa') as string}</span>
                </a>
              </div>
            </div>

            {/* Chat Messages Log Area */}
            <div className="h-[360px] sm:h-[420px] overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fbf9f6]/80 text-xs sm:text-sm">
              <div className="text-center my-1">
                <span className="text-[10px] font-medium text-stone-400 bg-stone-100 px-3 py-1 rounded-full">
                  {t('faqConvoStart') as string}
                </span>
              </div>

              {chatMessages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isUser && (
                      <div className="w-7 h-7 rounded-full bg-primary-900 text-amber-300 flex items-center justify-center shrink-0 text-xs shadow-2xs">
                        <Bot size={14} />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs leading-relaxed space-y-2 ${
                        isUser
                          ? 'bg-primary-900 text-white rounded-br-xs text-right'
                          : 'bg-white text-stone-800 border border-stone-200/90 rounded-bl-xs text-left'
                      }`}
                    >
                      <p className="whitespace-pre-line text-xs sm:text-sm">{msg.text}</p>

                      {msg.actionUrl && (
                        <div className="pt-2">
                          <a
                            href={msg.actionUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                          >
                            <MessageCircle size={14} />
                            <span>{msg.actionLabel || 'Hubungi WhatsApp'}</span>
                          </a>
                        </div>
                      )}

                      <span
                        className={`block text-[10px] font-mono mt-1 ${
                          isUser ? 'text-amber-200/80 text-right' : 'text-stone-400 text-left'
                        }`}
                      >
                        {msg.time}
                      </span>
                    </div>

                    {isUser && (
                      <div className="w-7 h-7 rounded-full bg-stone-300 text-stone-700 flex items-center justify-center shrink-0 text-xs font-bold">
                        {t('faqYou') as string}
                      </div>
                    )}
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex items-center gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-primary-900 text-amber-300 flex items-center justify-center shrink-0 text-xs">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-stone-200/90 rounded-2xl rounded-bl-xs px-4 py-3 shadow-2xs flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatMessagesEndRef} />
            </div>

            {/* Quick Questions Chips Bar */}
            <div className="p-3 bg-stone-100/90 border-t border-stone-200">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-[11px] font-bold text-stone-600 flex items-center gap-1">
                  <Sparkles size={12} className="text-amber-600" />
                  <span>{t('faqQuickLabel') as string}</span>
                </span>
                <span className="text-[10px] text-stone-400">{t('faqQuickHint') as string}</span>
              </div>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                {FAQ_KNOWLEDGE_BASE.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleAskQuestion(item.question, item.answer)}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-amber-100 hover:text-amber-900 border border-stone-300/80 text-stone-700 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-2xs active:scale-95"
                  >
                    {item.chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Chat Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskQuestion(chatInput);
              }}
              className="p-3 sm:p-4 bg-white border-t border-stone-200 flex items-center gap-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={t('faqInputPlaceholder') as string}
                className="flex-1 px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-800/20 focus:border-primary-800 transition-all placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-xl bg-primary-900 hover:bg-primary-950 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer shrink-0 active:scale-95"
                title={t('faqSendTitle') as string}
                aria-label={t('faqSendTitle') as string}
              >
                <Send size={16} />
              </button>
            </form>

          </div>

          {/* Under-Chat Reassurance Card */}
          <div className="mt-6 p-4 rounded-2xl bg-stone-200/50 border border-stone-300/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <div className="flex items-center space-x-2.5 text-xs text-stone-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>{t('faqSupportText') as string} <strong>{t('faqSupportHours') as string}</strong></span>
            </div>
            <a
              href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-primary-900 hover:text-primary-950 underline flex items-center gap-1"
            >
              <span>{t('faqSupportLink') as string}</span>
              <ArrowRight size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-16 sm:py-20 bg-primary-900 text-white relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <span className="font-cinzel text-amber-200 uppercase tracking-widest text-xs font-bold block">
            WD Group Wedding Invitation
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            {t('ctaTitle') as string}
          </h2>
          <p className="text-sm sm:text-base text-stone-200 max-w-xl mx-auto font-light leading-relaxed">
            {t('ctaDesc') as string}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-300 hover:bg-amber-200 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle size={16} />
              <span>{t('ctaBtn1') as string}</span>
            </a>

            <Link 
              to="/themes"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center space-x-2"
            >
              <span>{t('ctaBtn2') as string}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-12 sm:py-16 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-primary-800 flex items-center justify-center text-amber-200 font-cinzel font-bold">
                  WD
                </div>
                <span className="text-xl font-bold font-cinzel text-white tracking-wider">WD GROUP</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                {t('footerDesc') as string}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4 font-serif">{t('footerNavTitle') as string}</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">{t('footerHome') as string}</a></li>
                <li><a href="#themes" className="hover:text-white transition-colors">{t('footerThemes') as string}</a></li>
                <li><a href="#keunggulan" className="hover:text-white transition-colors">{t('footerFeaturesLink') as string}</a></li>
                <li><a href="#alur" className="hover:text-white transition-colors">{t('footerWorkflow') as string}</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">{t('footerPricing') as string}</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">{t('footerFaq') as string}</a></li>
              </ul>
            </div>

            {/* Themes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4 font-serif">{t('footerDesignTitle') as string}</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/themes" className="hover:text-white transition-colors">Javanese Heritage (Adat)</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Maroon Gold (Royal)</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Secret Garden (Botanical)</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Split Floral (Luxury)</Link></li>
              </ul>
            </div>

            {/* Contact & Admin */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4 font-serif">{t('footerContactTitle') as string}</h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <a 
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20undangan%20pernikahan%20digital."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-200 transition-colors"
                  >
                    WhatsApp: +62 857-0790-9415
                  </a>
                </li>
                <li>
                  <a 
                    href="mailto:groupcompanywd@gmail.com"
                    className="hover:text-amber-200 transition-colors"
                  >
                    Email: groupcompanywd@gmail.com
                  </a>
                </li>
                <li><span>{t('footerLocation') as string}</span></li>
                <li><span>{t('footerHours') as string}</span></li>
                <li className="pt-2">
                  <Link to="/admin/login" className="text-amber-200 hover:underline font-semibold">
                    {t('footerAdminLink') as string} &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} WD Group. {t('footerCopyright') as string}</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <Link to="/themes" className="hover:text-stone-300">{t('footerCatalog') as string}</Link>
              <a href="#faq" className="hover:text-stone-300">{t('footerHelp') as string}</a>
              <Link to="/admin/login" className="hover:text-stone-300">{t('mobileNavAdmin') as string}</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* FLOATING ACTION WIDGETS */}
      <div className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-3 pointer-events-none">
        {/* WhatsApp Contact */}
        <a
          href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20tertarik%20konsultasi%20undangan%20pernikahan%20digital"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center space-x-2 bg-emerald-700 hover:bg-emerald-800 text-white px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full shadow-lg transition-all transform hover:scale-105 active:scale-95"
          aria-label={t('floatingConsultWa') as string}
        >
          <MessageCircle size={18} />
          <span className="text-xs font-bold hidden sm:inline-block pr-1">{t('floatingWa') as string}</span>
        </a>

        {/* Scroll-To-Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="pointer-events-auto w-10 h-10 rounded-full bg-white text-stone-700 border border-stone-200 shadow-md hover:bg-stone-900 hover:text-white transition-colors flex items-center justify-center"
            aria-label={t('floatingScrollTop') as string}
            title={t('floatingScrollTopTitle') as string}
          >
            <ChevronUp size={18} />
          </button>
        )}
      </div>

    </div>
  );
};
