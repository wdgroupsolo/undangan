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
  Globe,
  Search,
  Star,
  Compass,
  ShieldCheck,
  Award,
  SlidersHorizontal,
  Volume2,
  VolumeX
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

  // Modern Luxury Hero & Capsule States
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [isLikedFeatured, setIsLikedFeatured] = useState(false);
  const [activeConceptFilter, setActiveConceptFilter] = useState('all');
  const [activeFeatureFilter, setActiveFeatureFilter] = useState('all');
  const [activeTimelineFilter, setActiveTimelineFilter] = useState('2026-2027');

  // Showcase Themes for Hero Phone Mockup Slider
  const showcaseBadges = t('showcaseBadge') as unknown as string[];
  const showcaseThemes = [
    {
      id: 'nirwana-sarangan',
      name: 'Nirwana Sarangan Resort',
      slug: 'nirwana-sarangan',
      badge: 'Tema Resort Eksklusif',
      couple: 'Steven & Bunga',
      date: 'Minggu, 18 Oktober 2026',
      preview: '/themes/nirwana-sarangan/theme-preview.jpg',
      musicTitle: 'Bergema Sampai Selamanya - Nadhief Basalamah (Piano)',
      musicUrl: '/music/bergema-sampai-selamanya.mp3',
      demoUrl: '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true'
    },
    {
      id: 'joglo-maroon-heritage',
      name: 'Batak Maroon Heritage',
      slug: 'joglo-maroon-heritage',
      badge: 'Tema Baru Populer',
      couple: 'Steven & Bunga',
      date: 'Minggu, 12 April 2026',
      preview: '/themes/joglo-maroon-theme-preview.png',
      musicTitle: 'Pesta Adat Batak Heritage',
      musicUrl: '/music/joglo-maroon-heritage.mp3',
      demoUrl: '/invitation/steven-bunga?theme=joglo-maroon-heritage&demo=true'
    },
    {
      id: 'royal-wayang-gold',
      name: 'Royal Wayang Gold',
      slug: 'royal-wayang-gold',
      badge: showcaseBadges[0] || 'Tema Keraton',
      couple: 'Steven & Bunga',
      date: 'Minggu, 28 Desember 2025',
      preview: '/themes/royal-wayang-theme-preview.png',
      musicTitle: 'Ladrang Wilujeng Keraton',
      musicUrl: '/music/royal-wayang-heritage.mp3',
      demoUrl: '/invitation/steven-bunga?theme=royal-wayang-gold&demo=true'
    },
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
      demoUrl: '/invitation/steven-bunga?theme=javanese-heritage&demo=true'
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
      demoUrl: '/invitation/steven-bunga?theme=maroon-gold&demo=true'
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
      demoUrl: '/invitation/steven-bunga?theme=secret-garden&demo=true'
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
      demoUrl: '/invitation/steven-bunga?theme=split-floral&demo=true'
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
  const isInitialChatMount = useRef(true);
  const chatMessagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isInitialChatMount.current) {
      isInitialChatMount.current = false;
      return;
    }
    if (chatMessagesContainerRef.current) {
      chatMessagesContainerRef.current.scrollTo({
        top: chatMessagesContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
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

      {/* Modern Luxury Resort Frame Hero (Editorial Travel & Wedding Architecture) */}
      <div id="hero" className="max-w-[1400px] mx-auto p-2 sm:p-4 md:p-6 lg:p-8">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden bg-stone-900 shadow-2xl border border-stone-200/40 min-h-[760px] lg:min-h-[840px] flex flex-col justify-between">
          
          {/* Panoramic Resort Background with Mediterranean Sea & Cliffside Villas */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2400&q=85" 
              alt="Mediterranean Coastal Resort View" 
              className="w-full h-full object-cover object-[center_35%] filter brightness-[0.98] contrast-[1.02]"
            />
            {/* Luminous atmospheric lighting overlays */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-white/70 via-white/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-stone-900/10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-stone-950/60 via-stone-900/25 to-transparent pointer-events-none" />
          </div>

          {/* Floating Top Navigation Bar */}
          <header className="relative z-30 p-4 sm:p-6 lg:p-8 flex items-center justify-between">
            {/* Brand Monogram & Title */}
            <Link to="/" className="flex items-center space-x-3 group select-none">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-stone-900/85 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-sm transition-transform group-hover:scale-105">
                <span className="font-cinzel text-base sm:text-lg font-bold tracking-wider">WD</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-extrabold tracking-[0.22em] text-stone-900 uppercase font-sans">
                  WD PRODUCTION
                </span>
                <span className="text-[9px] tracking-[0.25em] text-stone-600 font-semibold uppercase">
                  LUXURY WEDDING INVITATIONS
                </span>
              </div>
            </Link>

            {/* Frosted Glass Capsule Navigation Pill */}
            <nav className="hidden lg:flex items-center bg-white/80 backdrop-blur-md rounded-full p-1.5 shadow-sm border border-white/60 text-xs font-semibold text-stone-700">
              <a 
                href="#hero" 
                className="bg-stone-900 text-white rounded-full px-4 py-1.5 transition-all shadow-xs"
              >
                Home
              </a>
              <a 
                href="#themes" 
                className="px-3.5 py-1.5 rounded-full hover:text-stone-950 hover:bg-white/60 transition-all"
              >
                {lang === 'id' ? 'Destinasi Tema' : 'Destinations'}
              </a>
              <a 
                href="#keunggulan" 
                className="px-3.5 py-1.5 rounded-full hover:text-stone-950 hover:bg-white/60 transition-all"
              >
                {lang === 'id' ? 'Keunggulan' : 'Features'}
              </a>
              <a 
                href="#alur" 
                className="px-3.5 py-1.5 rounded-full hover:text-stone-950 hover:bg-white/60 transition-all"
              >
                {lang === 'id' ? 'Alur Pesan' : 'Experiences'}
              </a>
              <a 
                href="#pricing" 
                className="px-3.5 py-1.5 rounded-full hover:text-stone-950 hover:bg-white/60 transition-all"
              >
                {lang === 'id' ? 'Paket Harga' : 'Pricing'}
              </a>
              <a 
                href="#faq" 
                className="px-3.5 py-1.5 rounded-full hover:text-stone-950 hover:bg-white/60 transition-all"
              >
                {lang === 'id' ? 'Tanya Jawab' : 'FAQ'}
              </a>
            </nav>

            {/* Right Buttons: Search pill, Action CTA, Language switcher, Mobile menu */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Trigger Pill */}
              <a 
                href="#themes"
                className="w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-white/60 text-stone-800 flex items-center justify-center shadow-xs transition-all cursor-pointer"
                title={lang === 'id' ? 'Cari tema undangan' : 'Search themes'}
                aria-label="Search"
              >
                <Search size={15} />
              </a>

              {/* Language Switcher Pill */}
              <button
                onClick={toggleLang}
                className="hidden min-[480px]:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-white/60 text-stone-800 text-xs font-bold transition-all shadow-xs cursor-pointer"
                title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              >
                <Globe size={13} />
                <span>{lang.toUpperCase()}</span>
              </button>

              {/* Dark Pill CTA: Book a Journey / Konsultasi */}
              <a
                href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20tertarik%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital%20mewah"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-semibold shadow-md transition-all group"
              >
                <span>{lang === 'id' ? 'Pesan Undangan' : 'Book a Journey'}</span>
                <span className="w-6 h-6 rounded-full bg-white text-stone-900 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight size={13} />
                </span>
              </a>

              {/* Mobile Hamburger Drawer Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden w-9 h-9 rounded-full bg-white/85 hover:bg-white backdrop-blur-md border border-white/60 text-stone-800 flex items-center justify-center transition-all shadow-xs"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </header>

          {/* Mobile Navigation Drawer inside frame */}
          {mobileMenuOpen && (
            <div className="lg:hidden relative z-40 mx-4 sm:mx-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-xl border border-white/80 animate-reveal-up space-y-3">
              <nav className="flex flex-col space-y-2 text-xs font-bold text-stone-700 uppercase tracking-wider">
                <a href="#themes" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  {lang === 'id' ? 'Destinasi Tema' : 'Destinations'}
                </a>
                <a href="#keunggulan" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  {lang === 'id' ? 'Keunggulan' : 'Features'}
                </a>
                <a href="#alur" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  {lang === 'id' ? 'Alur Pesan' : 'Experiences'}
                </a>
                <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  {lang === 'id' ? 'Paket Harga' : 'Pricing'}
                </a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-stone-100 transition-colors">
                  {lang === 'id' ? 'Tanya Jawab' : 'FAQ'}
                </a>
              </nav>
              <div className="pt-2 border-t border-stone-200/80 flex items-center justify-between">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 text-stone-800 text-xs font-bold"
                >
                  <Globe size={13} />
                  <span>{lang === 'id' ? 'English' : 'Bahasa Indonesia'}</span>
                </button>
                <a
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Production"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-stone-900 underline"
                >
                  WhatsApp Support &rarr;
                </a>
              </div>
            </div>
          )}

          {/* Hero Main Content */}
          <div className="relative z-20 px-4 sm:px-8 lg:px-12 pt-4 sm:pt-8 pb-8 flex-1 flex flex-col justify-between">
            
            {/* Top row: Headline + Right Tag */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              
              {/* Left Headline Area */}
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                
                {/* Spaced Kicker */}
                <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-700 uppercase flex items-center gap-2 select-none">
                  <span>TRAVEL</span>
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  <span>EXPLORE</span>
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  <span>EXPERIENCE</span>
                  <span className="w-1 h-1 rounded-full bg-stone-400" />
                  <span>BELONG</span>
                </div>

                {/* Editorial Serif Dual-Tone Headline */}
                <h1 className="text-4xl sm:text-6xl lg:text-[4.5rem] font-serif font-medium tracking-tight text-stone-900 leading-[1.06]">
                  Discover Journeys <br />
                  <span className="italic font-serif font-normal text-[#9b6f38] drop-shadow-xs">
                    Beyond Ordinary
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-sm sm:text-base text-stone-700 font-normal leading-relaxed max-w-xl">
                  {lang === 'id' 
                    ? 'Koleksi undangan pernikahan digital eksklusif berarsitektur visual mewah. Lebih dari sekadar undangan, kami merangkai kisah sakral yang abadi untuk dikenang selamanya.'
                    : 'Curated digital wedding invitations crafted for extraordinary celebrations. More than invitations, we create digital stories you will cherish forever.'}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#themes"
                    className="inline-flex items-center gap-2 bg-stone-900 hover:bg-stone-800 active:scale-98 text-white text-xs sm:text-sm font-semibold px-6 py-3 rounded-full shadow-lg transition-all"
                  >
                    <span>{lang === 'id' ? 'Eksplorasi Tema' : 'Explore Destinations'}</span>
                    <ArrowRight size={15} />
                  </a>

                  <button
                    onClick={() => setVideoModalOpen(true)}
                    className="inline-flex items-center gap-2.5 bg-white/80 hover:bg-white text-stone-900 text-xs sm:text-sm font-semibold px-5 py-3 rounded-full backdrop-blur-md border border-white/70 shadow-sm transition-all cursor-pointer group"
                  >
                    <span className="w-6 h-6 rounded-full bg-stone-900 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={10} className="ml-0.5 fill-current" />
                    </span>
                    <span>{lang === 'id' ? 'Lihat Video Teaser' : 'Watch Guide'}</span>
                  </button>
                </div>

              </div>

              {/* Right Corner Editorial Text */}
              <div className="hidden lg:block text-right select-none">
                <div className="text-[10px] font-bold tracking-[0.25em] text-stone-700 uppercase leading-relaxed font-sans">
                  EXTRAORDINARY<br />
                  DESTINATIONS<br />
                  MEANINGFUL<br />
                  EXPERIENCES
                </div>
              </div>

            </div>

            {/* Center Floating Quick Search Bar */}
            <div className="my-8 sm:my-10">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl lg:rounded-full p-2.5 sm:p-3 shadow-xl border border-white/80 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 text-stone-800 transition-all">
                
                {/* 1. Destination Field */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2 border-b lg:border-b-0 lg:border-r border-stone-200/80">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Compass size={17} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">
                      {lang === 'id' ? 'Tema Destinasi' : 'Destinations'}
                    </span>
                    <select
                      value={activeConceptFilter}
                      onChange={(e) => setActiveConceptFilter(e.target.value)}
                      className="text-xs text-stone-500 bg-transparent border-none p-0 focus:ring-0 font-medium cursor-pointer"
                    >
                      <option value="all">{lang === 'id' ? 'Semua Pilihan Tema' : 'Where to go?'}</option>
                      <option value="nirwana-sarangan">Nirwana Sarangan Resort</option>
                      <option value="royal-wayang-gold">Royal Wayang Gold</option>
                      <option value="joglo-maroon-heritage">Batak Maroon Heritage</option>
                      <option value="javanese-heritage">Javanese Heritage</option>
                      <option value="secret-garden">Secret Botanical Garden</option>
                    </select>
                  </div>
                </div>

                {/* 2. Dates Field */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2 border-b lg:border-b-0 lg:border-r border-stone-200/80">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Calendar size={17} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">
                      {lang === 'id' ? 'Jadwal Acara' : 'Dates'}
                    </span>
                    <select
                      value={activeTimelineFilter}
                      onChange={(e) => setActiveTimelineFilter(e.target.value)}
                      className="text-xs text-stone-500 bg-transparent border-none p-0 focus:ring-0 font-medium cursor-pointer"
                    >
                      <option value="2026-2027">2026 - 2027</option>
                      <option value="q1-2027">Q1 2027 (Jan - Mar)</option>
                      <option value="q2-2027">Q2 2027 (Apr - Jun)</option>
                      <option value="express-24h">{lang === 'id' ? 'Kilat 24 Jam Siap' : '24-Hour Express'}</option>
                    </select>
                  </div>
                </div>

                {/* 3. Travelers / Guest Count Field */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2 border-b lg:border-b-0 lg:border-r border-stone-200/80">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Users size={17} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">
                      {lang === 'id' ? 'Jumlah Tamu' : 'Travelers'}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === 'id' ? 'Tamu Tanpa Batas' : 'Unlimited Guests'}
                    </span>
                  </div>
                </div>

                {/* 4. Budget / Package Field */}
                <div className="flex-1 flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-700 shrink-0">
                    <Sparkles size={17} />
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[11px] font-bold text-stone-900 uppercase tracking-wider">
                      {lang === 'id' ? 'Paket Investasi' : 'Budget'}
                    </span>
                    <span className="text-xs text-stone-500 font-medium">
                      {lang === 'id' ? 'Mulai Rp 49.000' : 'Any budget'}
                    </span>
                  </div>
                </div>

                {/* Search Button */}
                <a
                  href="#themes"
                  className="bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold px-7 py-3.5 rounded-xl lg:rounded-full flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer whitespace-nowrap active:scale-98"
                >
                  <Search size={15} />
                  <span>{lang === 'id' ? 'Cari Tema' : 'Search Journeys'}</span>
                </a>

              </div>
            </div>

            {/* Bottom Bento Grid: 3 Modern Floating Cards */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
              
              {/* Card 1: Featured Destination / Theme (md:col-span-4) */}
              <div className="md:col-span-4 bg-white/92 backdrop-blur-md rounded-[26px] p-3.5 shadow-xl border border-white/80 flex flex-col justify-between group">
                <div>
                  {/* Card Image Thumbnail with badges */}
                  <div className="relative h-36 rounded-2xl overflow-hidden mb-3">
                    <img 
                      src="https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80" 
                      alt="Santorini Greece Luxury Destination" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full bg-white/85 backdrop-blur-md text-stone-800 shadow-xs border border-white/60">
                        FEATURED DESTINATION
                      </span>
                    </div>
                    <button
                      onClick={() => setIsLikedFeatured(!isLikedFeatured)}
                      className={`absolute top-2.5 right-2.5 w-7 h-7 rounded-full backdrop-blur-md flex items-center justify-center transition-all cursor-pointer ${
                        isLikedFeatured 
                          ? 'bg-rose-500 text-white' 
                          : 'bg-white/80 text-stone-700 hover:bg-white'
                      }`}
                      aria-label="Favorite destination"
                    >
                      <Heart size={14} className={isLikedFeatured ? 'fill-current' : ''} />
                    </button>
                  </div>

                  {/* Title & Reviews */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif font-bold text-base text-stone-900">
                      Santorini, Greece
                    </h3>
                    <div className="flex items-center text-xs text-stone-800 font-semibold gap-1">
                      <Star size={13} className="text-amber-500 fill-amber-500" />
                      <span>4.9</span>
                      <span className="text-stone-400 font-normal">(1.2K)</span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-500 mt-1 leading-snug">
                    Iconic views, timeless charm and unforgettable sunsets.
                  </p>
                </div>

                {/* Bottom Link Arrow */}
                <div className="pt-3 flex justify-end">
                  <a
                    href="#themes"
                    className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-900 hover:text-white text-stone-700 flex items-center justify-center transition-all shadow-2xs"
                    aria-label="Lihat tema destinasi"
                  >
                    <ArrowRight size={14} />
                  </a>
                </div>
              </div>

              {/* Card 2: Metrics & Social Proof (md:col-span-5) */}
              <div className="md:col-span-5 bg-white/92 backdrop-blur-md rounded-[26px] p-5 shadow-xl border border-white/80 flex flex-col justify-between">
                
                {/* 4 Stats Grid */}
                <div className="grid grid-cols-4 gap-2 text-center pb-4 border-b border-stone-200/80">
                  <div className="space-y-0.5">
                    <div className="flex justify-center text-stone-600 mb-1">
                      <Compass size={16} />
                    </div>
                    <span className="block text-sm sm:text-base font-extrabold text-stone-900 font-sans">250+</span>
                    <span className="block text-[9px] text-stone-500 leading-tight uppercase font-medium">Destinasi Unik</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-center text-stone-600 mb-1">
                      <Users size={16} />
                    </div>
                    <span className="block text-sm sm:text-base font-extrabold text-stone-900 font-sans">50K+</span>
                    <span className="block text-[9px] text-stone-500 leading-tight uppercase font-medium">Tamu Bahagia</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-center text-stone-600 mb-1">
                      <Award size={16} />
                    </div>
                    <span className="block text-sm sm:text-base font-extrabold text-stone-900 font-sans">1,200+</span>
                    <span className="block text-[9px] text-stone-500 leading-tight uppercase font-medium">Karya Kurasi</span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex justify-center text-stone-600 mb-1">
                      <Globe size={16} />
                    </div>
                    <span className="block text-sm sm:text-base font-extrabold text-stone-900 font-sans">95+</span>
                    <span className="block text-[9px] text-stone-500 leading-tight uppercase font-medium">Kota & Wilayah</span>
                  </div>
                </div>

                {/* Bottom Testimonial Row */}
                <div className="pt-3.5 flex flex-col sm:flex-row items-center gap-3">
                  {/* Avatar stack */}
                  <div className="flex items-center -space-x-2 shrink-0">
                    <img 
                      src="/photos/avatar-rendy-maya.jpg" 
                      alt="Reviewer 1" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                    />
                    <img 
                      src="/photos/avatar-dimas-nadia.jpg" 
                      alt="Reviewer 2" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                    />
                    <img 
                      src="/photos/avatar-faris-aisyah.jpg" 
                      alt="Reviewer 3" 
                      className="w-8 h-8 rounded-full border-2 border-white object-cover" 
                    />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-900 text-white text-[10px] font-bold flex items-center justify-center">
                      +
                    </div>
                  </div>

                  {/* Quote + Reviewer Note */}
                  <div className="text-left space-y-1">
                    <p className="text-[11px] text-stone-700 italic leading-snug line-clamp-2">
                      &ldquo;Incredible planning, unforgettable experiences. Truly a celebration of a lifetime!&rdquo;
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className="fill-amber-500" />
                        ))}
                      </div>
                      <span className="font-semibold text-stone-700">Sarah M.</span>
                      <span>&bull;</span>
                      <span>Traveled to Sarangan</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card 3: Real Places. Real Stories. Teaser Thumbnail (md:col-span-3) */}
              <div 
                onClick={() => setVideoModalOpen(true)}
                className="md:col-span-3 relative rounded-[26px] overflow-hidden min-h-[170px] p-4 flex flex-col justify-between text-white shadow-xl cursor-pointer group border border-white/50"
              >
                {/* Background Image */}
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80" 
                  alt="Overwater resort villas and beach stories" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/30 to-transparent pointer-events-none" />

                {/* Top Play Button */}
                <div className="relative z-10 flex justify-start">
                  <div className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-stone-900 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                    <Play size={14} className="ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Bottom Story Text */}
                <div className="relative z-10 space-y-0.5">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-white tracking-wide">
                    Real Places. Real Stories.
                  </h4>
                  <p className="text-[10px] sm:text-[11px] text-stone-200 leading-tight">
                    Watch traveler stories from around the world.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Video Modal Preview */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-md animate-reveal-up">
          <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden bg-stone-950 shadow-2xl border border-white/20">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Tutup video"
            >
              <X size={18} />
            </button>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <video 
                src="/gemini_generated_video_1f694672.mp4" 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-stone-900 text-stone-200 text-xs flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm text-white">Cinematic Wedding Journey Teaser</p>
                <p className="text-stone-400 text-[11px]">WD Wedding Production &bull; Experience Timeless Elegance</p>
              </div>
              <a 
                href="#themes"
                onClick={() => setVideoModalOpen(false)}
                className="px-4 py-2 rounded-full bg-white text-stone-900 font-semibold hover:bg-stone-100 transition-colors"
              >
                {lang === 'id' ? 'Pilih Tema Sekarang' : 'Explore Themes'}
              </a>
            </div>
          </div>
        </div>
      )}

      {/* POPULAR DESTINATIONS & SIGNATURE THEMES (Directly Below Hero Frame) */}
      <section id="themes" className="py-20 sm:py-28 bg-[#f5f1eb] border-y border-stone-200/80 relative">
        <div id="destinations" className="absolute -top-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>POPULAR DESTINATIONS</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>SIGNATURE THEMES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Jelajahi Destinasi Tema &' : 'Explore Extraordinary Destinations &'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Koleksi Sakral' : 'Signature Journeys'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {lang === 'id'
                ? 'Dari pesona resort tepi danau hingga kemegahan budaya Nusantara, temukan tema undangan pernikahan digital yang sempurna untuk hari bahagia Anda.'
                : 'From serene lakeside mountain resorts to timeless royal heritage, discover curated digital wedding journeys crafted for extraordinary celebrations.'}
            </p>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {displayThemes.map((theme) => {
              const isNirwana = theme.slug === 'nirwana-sarangan' || theme.slug === 'hotel-nirwana' || theme.slug === 'telaga-sarangan';
              const isJogloMaroon = theme.slug === 'joglo-maroon-heritage' || theme.slug === 'joglo-maroon' || theme.slug === 'joglo-bloom';
              const isRoyalWayang = theme.slug === 'royal-wayang-gold' || theme.slug === 'royal-wayang';
              const isGarden = theme.slug === 'secret-garden';
              const isJavanese = theme.slug === 'javanese-heritage' || theme.slug === 'jawa-klasik' || theme.slug === 'borobudur';
              const isMaroon = theme.slug === 'maroon-gold';
              const isSplit = theme.slug === 'split-floral';

              const previewImg = theme.preview_image || theme.thumbnail || (isNirwana
                ? '/themes/nirwana-sarangan/theme-preview.jpg'
                : (isJogloMaroon
                  ? '/themes/joglo-maroon-theme-preview.png'
                  : (isRoyalWayang
                    ? '/themes/royal-wayang-theme-preview.png'
                    : (isGarden 
                        ? '/themes/secret-garden-theme-preview.png'
                        : (isSplit 
                            ? '/themes/split-floral-theme-preview.png' 
                            : '/themes/javanese-heritage-theme-preview.png')))));

              const demoUrl = isNirwana
                ? '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true'
                : (isJogloMaroon
                  ? '/invitation/steven-bunga?theme=joglo-maroon-heritage&demo=true'
                  : (isRoyalWayang
                    ? '/invitation/steven-bunga?theme=royal-wayang-gold&demo=true'
                    : (isJavanese 
                        ? '/invitation/steven-bunga?theme=javanese-heritage&demo=true' 
                        : (theme.slug ? `/invitation/steven-bunga?theme=${theme.slug}&demo=true` : '/themes'))));

              const featuresList = isNirwana ? [
                'Kemegahan Hotel Nirwana & Panorama Telaga Sarangan',
                'Nuansa Hijau Pinus Lereng Lawu & Kabut Danau Romantis',
                'Resort Venue Peta Langsung & Lobi Nirwana Sarangan',
                'Amplop Digital, Salin Rekening & RSVP Online'
              ] : isJogloMaroon ? [
                'Kemegahan Rumah Adat Batak (Rumah Bolon)',
                'Ornamen Ukiran Gorga & Aksen Tenun Ulos',
                'Bingkai Foto Lengkung & Hamparan Bunga Marun',
                'Amplop Digital (BCA/Mandiri), Salin Rekening & RSVP'
              ] : isRoyalWayang ? [
                'Kemegahan Pendopo Joglo & Siluet Wayang Emas',
                'Nuansa Hitam Emas Keraton & Paugeran Busana',
                'Split Screen Desktop & Full Mobile Interaktif',
                'Amplop Digital (BCA/BRI/Mandiri), QRIS & RSVP Online'
              ] : isJavanese ? [
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
                  className="bg-white rounded-[28px] overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                    
                    {/* Image Preview with Editorial Badges */}
                    <div className="sm:col-span-5 relative aspect-[4/3] sm:aspect-auto min-h-[230px] sm:min-h-full overflow-hidden bg-stone-900">
                      <img 
                        src={previewImg} 
                        alt={theme.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        <span className="bg-stone-950/80 backdrop-blur-md text-white text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full border border-white/10 shadow-xs">
                          {theme.category || (isNirwana ? 'Resort & Nature' : isJogloMaroon ? 'Traditional & Heritage' : isRoyalWayang ? 'Traditional & Heritage' : isJavanese ? 'Traditional & Heritage' : isGarden ? 'Botanical & Garden' : 'Floral & Classic')}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-white/90 backdrop-blur-md text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs border border-white/60">
                          <Star size={11} className="text-amber-500 fill-amber-500" />
                          <span>4.9</span>
                        </span>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="sm:col-span-7 p-6 sm:p-7 flex flex-col justify-between space-y-4">
                      <div>
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9b6f38] mb-1 font-sans">
                          {isNirwana ? 'Resort Telaga Sarangan Masterpiece' : isJogloMaroon ? 'Batak Heritage Masterpiece' : isRoyalWayang ? 'Keraton Masterpiece' : isJavanese ? 'Nusantara Masterpiece' : isGarden ? 'Botanical Romance' : isMaroon ? 'Royal Classic' : isSplit ? 'Flagship Masterpiece' : (theme.category || 'Special Edition')}
                        </div>
                        <h3 className="font-serif font-bold text-xl sm:text-2xl text-stone-900 tracking-tight">{theme.name}</h3>
                        <p className="text-stone-600 text-xs mt-2 leading-relaxed line-clamp-2 sm:line-clamp-3 font-normal">
                          {isNirwana
                            ? 'Tema pernikahan eksklusif bernuansa pemandangan Telaga Sarangan yang sejuk dan menenangkan di lereng Gunung Lawu, berlatar kemegahan Hotel Nirwana Sarangan, riak air danau, kabut pegunungan, dan sentuhan intimate wedding & wisata.'
                            : isJogloMaroon
                            ? 'Tema pernikahan adat Batak bernuansa Rumah Adat Bolon megah berhias ukiran Gorga dan hamparan bunga merah marun, diperkaya aksen tenun Ulos, kupu-kupu beterbangan, dan suasana sakral penuh kehormatan.'
                            : isRoyalWayang
                              ? 'Tema pernikahan agung bernuansa Keraton Jawa & Pendopo Joglo malam hari, diperkaya siluet wayang Kamajaya & Kamaratih berlapis emas, ornamen floral klasik, serta alunan sakral khas Nusantara.'
                              : theme.description || (isJavanese
                                ? 'Tema bernuansa kemegahan Candi Borobudur, ornamen batik klasik, paduan warna terracotta & merah marun, serta rangkaian anggrek vintage.'
                                : isGarden 
                                ? 'Tema bernuansa taman romantis dusty rose & earthy mauve, bingkai foto lengkung oval, video entrance sinematik, dan ornamen bunga melayang.'
                                : 'Tema split screen klasik dengan ornamen floral melengkung vintage, entrance video arch, dan alunan saxophone romantis.')
                          }
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

                      <div className="flex flex-col sm:flex-row gap-2.5 pt-4 border-t border-stone-100">
                        <Link 
                          to="/themes"
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-full border border-stone-300 text-stone-800 font-semibold text-xs hover:bg-stone-100 transition-colors text-center block"
                        >
                          {t('themeCatalogBtn') as string}
                        </Link>
                        <a 
                          href={demoUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:flex-1 py-2.5 px-4 rounded-full bg-stone-900 text-white font-semibold text-xs hover:bg-stone-800 transition-colors text-center flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>{t('themeDemoBtn') as string}</span>
                          <ArrowRight size={13} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

          {/* Custom Theme Bespoke Request Banner */}
          <div className="mt-10 max-w-6xl mx-auto bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white rounded-[28px] border border-white/10 p-7 sm:p-9 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-6 shadow-xl">
            <div className="space-y-1 max-w-xl">
              <span className="text-[10px] font-bold tracking-[0.25em] text-amber-300 uppercase font-sans">
                BESPOKE ATELIER
              </span>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-white">{t('themeCustomTitle') as string}</h3>
              <p className="text-xs text-stone-300 leading-relaxed font-light">
                {t('themeCustomDesc') as string}
              </p>
            </div>
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20apakah%20bisa%20konsultasi%20request%20custom%20tema?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full bg-white hover:bg-stone-100 text-stone-900 text-xs font-semibold shadow-md transition-all shrink-0 active:scale-95"
            >
              {t('themeCustomBtn') as string} &rarr;
            </a>
          </div>

        </div>
      </section>

      {/* CURATED EXPERIENCES SECTION (Modern Editorial Bento Architecture) */}
      <section id="experiences" className="py-20 sm:py-28 bg-[#faf8f5] border-b border-stone-200/70 relative">
        <div id="keunggulan" className="absolute -top-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>EXTRAORDINARY EXPERIENCES</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>MEANINGFUL MOMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Pengalaman Berkesan yang' : 'Extraordinary Experiences for a'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Tak Terlupakan' : 'Timeless Celebration'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {lang === 'id'
                ? 'Setiap detik perayaan dikurasi dengan arsitektur visual sinematik, harmoni musik sakral, dan kenyamanan digital bagi seluruh tamu undangan.'
                : 'Every moment is elevated with cinematic visual architecture, orchestral audio ambiance, and effortless digital hospitality.'}
            </p>
          </div>

          {/* Bento Experience Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            
            {/* Experience 1: Cinematic Entrance & Music (md:col-span-7) */}
            <div className="md:col-span-7 bg-stone-950 text-white rounded-[32px] p-8 sm:p-10 border border-white/10 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md text-amber-300 flex items-center justify-center border border-white/15 shadow-sm group-hover:scale-105 transition-transform">
                    <Play size={18} className="ml-0.5 fill-current" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-stone-300 border border-white/10">
                    CINEMATIC GATE
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                    {lang === 'id' ? 'Video Gerbang Sinematik & Musik Latar Sakral' : 'Cinematic Gate Video & Sacred Background Music'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-2 leading-relaxed font-light">
                    {lang === 'id' 
                      ? 'Menyambut tamu dengan transisi video pembuka pintu gerbang megah berkualitas HD, disusul alunan instrumen piano & strings romantis yang berputar otomatis.'
                      : 'Welcomes guests with a high-definition majestic opening gate video transition, followed by romantic piano & strings instrumental.'}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-white/10 mt-6 flex flex-wrap gap-2 text-xs text-stone-300">
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-medium">HD Gate Animation</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-medium">Auto-Play Symphony</span>
                <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 font-medium">Independent Controls</span>
              </div>
            </div>

            {/* Experience 2: Live RSVP & Digital Guestbook (md:col-span-5) */}
            <div className="md:col-span-5 bg-white rounded-[32px] p-8 sm:p-10 border border-stone-200/90 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-stone-100 text-stone-900 flex items-center justify-center border border-stone-200 shadow-sm group-hover:scale-105 transition-transform">
                    <CheckCircle2 size={20} className="text-[#9b6f38]" />
                  </div>
                  <span className="text-[9px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-stone-100 text-stone-700 border border-stone-200">
                    REAL-TIME RSVP
                  </span>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 tracking-tight">
                    {lang === 'id' ? 'Buku Tamu Digital & Konfirmasi Kehadiran' : 'Digital Guestbook & Live RSVP Management'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed font-normal">
                    {lang === 'id'
                      ? 'Tamu mengonfirmasi kehadiran serta menuliskan doa restu hangat secara instan. Data kehadiran terkapitulasi otomatis di dashboard admin.'
                      : 'Guests confirm attendance and share warm blessings instantly, synchronized directly into the real-time admin portal.'}
                  </p>
                </div>
              </div>

              <div className="relative z-10 pt-6 border-t border-stone-100 mt-6 flex flex-wrap gap-2 text-xs text-stone-700">
                <span className="px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200 font-medium">Instant Confirmation</span>
                <span className="px-3 py-1.5 rounded-full bg-stone-50 border border-stone-200 font-medium">Guest Database</span>
              </div>
            </div>

            {/* Experience 3: Precision Venue Navigation (md:col-span-6) */}
            <div className="md:col-span-6 bg-white rounded-[32px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800">
                  <MapPin size={18} className="text-[#9b6f38]" />
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  NAVIGATION
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">
                  {lang === 'id' ? 'Navigasi Lokasi & Google Maps Presisi' : 'Precision Maps & Venue Navigation'}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-normal">
                  {lang === 'id'
                    ? 'Panduan penunjuk arah dan peta Google Maps terintegrasi untuk akad nikah, temu manten, dan resepsi di venue pilihan Anda.'
                    : 'Interactive Google Maps with accurate pinpoint navigation directly to your ceremony and reception venues.'}
                </p>
              </div>
            </div>

            {/* Experience 4: Cashless Digital Envelope & QRIS (md:col-span-6) */}
            <div className="md:col-span-6 bg-white rounded-[32px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-800">
                  <Gift size={18} className="text-[#9b6f38]" />
                </div>
                <span className="text-[9px] font-bold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-stone-100 text-stone-600">
                  CASHLESS GIFT
                </span>
              </div>
              <div>
                <h4 className="font-serif font-bold text-stone-900 text-lg">
                  {lang === 'id' ? 'Amplop Digital & Salin Rekening Instan' : 'Digital Envelope & Cashless QRIS'}
                </h4>
                <p className="text-xs text-stone-600 mt-1.5 leading-relaxed font-normal">
                  {lang === 'id'
                    ? 'Kemudahan transfer tanda kasih langsung ke rekening mempelai (BCA, BRI, Mandiri, BSI) dilengkapi fitur salin nomor rekening satu klik dan scan QRIS.'
                    : 'Seamless digital gifting with one-click bank account number copying and instant QRIS payment scanning.'}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* THE JOURNEY / ALUR PEMESANAN (Editorial Roadmap Layout) */}
      <section id="alur" className="py-20 sm:py-28 bg-white border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>THE JOURNEY</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>FROM VISION TO CELEBRATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Alur Pemesanan Cepat &' : 'Seamless Process from Discovery to'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Praktis' : 'Perfection'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t('workflowDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="p-7 sm:p-8 rounded-[26px] bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#9b6f38]/60 group-hover:text-[#9b6f38] transition-colors">
                    01
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 px-2 py-0.5 rounded-full bg-stone-200/60">
                    STEP ONE
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{t('step1Title') as string}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('step1Desc') as string}
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-7 sm:p-8 rounded-[26px] bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#9b6f38]/60 group-hover:text-[#9b6f38] transition-colors">
                    02
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 px-2 py-0.5 rounded-full bg-stone-200/60">
                    STEP TWO
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{t('step2Title') as string}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('step2Desc') as string}
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-7 sm:p-8 rounded-[26px] bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#9b6f38]/60 group-hover:text-[#9b6f38] transition-colors">
                    03
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 px-2 py-0.5 rounded-full bg-stone-200/60">
                    STEP THREE
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{t('step3Title') as string}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('step3Desc') as string}
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-7 sm:p-8 rounded-[26px] bg-[#faf8f5] border border-stone-200/90 h-full flex flex-col justify-between space-y-4 hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#9b6f38]/60 group-hover:text-[#9b6f38] transition-colors">
                    04
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-stone-400 px-2 py-0.5 rounded-full bg-stone-200/60">
                    STEP FOUR
                  </span>
                </div>
                <h3 className="font-serif font-bold text-stone-900 text-lg">{t('step4Title') as string}</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-normal">
                  {t('step4Desc') as string}
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* PRICING SUITES SECTION (Luxury Editorial Investment Collections) */}
      <section id="pricing" className="py-20 sm:py-28 bg-[#f5f1eb] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>INVESTMENT SUITES</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>TRANSPARENT VALUE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Pilihan Paket Investasi' : 'Transparent Investment Suites for'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Undangan Pernikahan' : 'Your Sacred Celebration'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t('pricingDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* 1. STARTER SUITE */}
            <div className="bg-white rounded-[28px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="text-center pb-5 border-b border-stone-200">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                    PRACTICAL SUITE
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-wide mt-1">
                    STARTER
                  </h3>
                  <p className="text-xs font-normal text-stone-500 mt-1">
                    Undangan Digital Praktis &amp; Elegan
                  </p>

                  <div className="mt-5 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-stone-400 text-xs font-semibold">
                        Rp 150.000
                      </span>
                      <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Hemat 67%
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mt-1.5 font-sans">
                      Start from
                    </span>
                    <div className="text-3xl font-serif font-bold text-stone-950 mt-0.5">
                      Rp 50.000
                    </div>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700 font-normal">
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
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20pesan%20Paket%20Starter%20(Start%20from%20Rp%2050.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  Pilih Paket Starter
                </a>
              </div>
            </div>

            {/* 2. SIGNATURE PREMIUM SUITE (Featured Flagship Tier) */}
            <div className="bg-stone-950 text-white rounded-[30px] p-7 sm:p-9 border-2 border-amber-400 shadow-2xl flex flex-col justify-between relative ring-2 ring-amber-400/20 transform lg:-translate-y-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-amber-400 text-stone-950 text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-sm font-sans">
                {t('premiumBadge') as string}
              </div>

              <div>
                <div className="text-center pb-5 border-b border-white/15 pt-2">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-amber-300 uppercase">
                    MOST POPULAR SIGNATURE
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white tracking-wide mt-1">
                    PREMIUM
                  </h3>
                  <p className="text-xs font-normal text-amber-200 mt-1">
                    Undangan Digital Fitur Lengkap &amp; Eksklusif
                  </p>

                  <div className="mt-5 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="line-through text-stone-400 text-xs font-semibold">
                        Rp 250.000
                      </span>
                      <span className="bg-amber-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Hemat 40%
                      </span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-amber-300 mt-1.5 font-sans">
                      Start from
                    </span>
                    <div className="text-3xl font-serif font-bold text-white mt-0.5">
                      Rp 150.000
                    </div>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-200 font-normal">
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
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20pesan%20Paket%20Premium%20(Start%20from%20Rp%20150.000)"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 font-bold text-xs sm:text-sm text-stone-950 transition-colors shadow-md"
                >
                  Pesan Paket Premium
                </a>
              </div>
            </div>

            {/* 3. BESPOKE ROYAL ATELIER (Custom Plan) */}
            <div className="bg-white rounded-[28px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <div>
                <div className="text-center pb-5 border-b border-stone-200">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-stone-400 uppercase">
                    HAUTE COUTURE
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-stone-900 tracking-wide mt-1">
                    CUSTOM
                  </h3>
                  <p className="text-xs font-normal text-stone-500 mt-1">
                    Bespoke Wedding Architecture
                  </p>

                  <div className="mt-5 flex flex-col items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        Bebas Request
                      </span>
                    </div>
                    <div className="text-2xl font-serif font-bold text-stone-950 mt-2">
                      Custom Design
                    </div>
                    <span className="text-[11px] font-normal text-stone-500 mt-0.5">
                      Menyesuaikan konsep &amp; dekorasi Anda
                    </span>
                  </div>
                </div>

                <ul className="py-6 space-y-3 text-xs sm:text-sm text-stone-700 font-normal">
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
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20konsultasi%20desain%20undangan%20Paket%20Custom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
                >
                  Konsultasi Paket Custom
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION (Stories of Love & Real Celebrations) */}
      <section id="testimonials" className="py-20 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>STORIES OF LOVE</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>REAL CELEBRATIONS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Kisah Bahagia &' : 'Cherished Stories &'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Apresiasi Tamu' : 'Guest Impressions'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t('testimonialsDesc') as string}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#faf8f5] rounded-[28px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic font-serif">
                  &ldquo;Sangat suka dengan detail visual dan ornamen batiknya. Tamu-tamu keluarga besar kami sangat mengapresiasi karena mudah dibuka di HP dan musiknya sakral.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3.5 pt-5 border-t border-stone-200/70">
                <img src="/photos/avatar-rendy-maya.jpg" alt="Rendy & Maya" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">Rendy &amp; Maya</h4>
                  <p className="text-xs text-stone-500 font-sans">Pernikahan di Solo • Tema Javanese Heritage</p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf8f5] rounded-[28px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic font-serif">
                  &ldquo;Pelayanan cepat dan ramah, revisi langsung dibantu admin. Fitur generator nama tamu di WhatsApp sangat membantu menghemat waktu sebar undangan.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3.5 pt-5 border-t border-stone-200/70">
                <img src="/photos/avatar-dimas-nadia.jpg" alt="Dimas & Nadia" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">Dimas &amp; Nadia</h4>
                  <p className="text-xs text-stone-500 font-sans">Pernikahan di Yogyakarta • Tema Split Floral</p>
                </div>
              </div>
            </div>

            <div className="bg-[#faf8f5] rounded-[28px] p-7 sm:p-8 border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6 md:col-span-2 lg:col-span-1 md:max-w-xl md:mx-auto md:w-full lg:max-w-none">
              <div className="space-y-3">
                <div className="flex text-amber-500 gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-stone-700 text-sm leading-relaxed italic font-serif">
                  &ldquo;Transisi video gerbang pembukanya sangat mewah. Banyak teman kami yang memuji undangannya terasa eksklusif dan beda dari undangan digital biasa.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3.5 pt-5 border-t border-stone-200/70">
                <img src="/photos/avatar-faris-aisyah.jpg" alt="Faris & Aisyah" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs" />
                <div>
                  <h4 className="font-serif font-bold text-stone-900 text-base">Faris &amp; Aisyah</h4>
                  <p className="text-xs text-stone-500 font-sans">Pernikahan di Semarang • Tema Maroon Gold</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* CONCIERGE FAQ & INTERACTIVE CHATBOT SECTION */}
      <section id="faq" className="py-20 sm:py-28 bg-[#f5f1eb] border-t border-stone-200/80 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-stone-600 uppercase flex items-center justify-center gap-2 select-none">
              <span>ASSISTANCE</span>
              <span className="w-1 h-1 rounded-full bg-stone-400" />
              <span>CONCIERGE FAQ</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-medium text-stone-900 tracking-tight leading-[1.12]">
              {lang === 'id' ? 'Pusat Bantuan &' : 'Concierge Assistance &'}{' '}
              <span className="italic font-serif font-normal text-[#9b6f38]">
                {lang === 'id' ? 'Tanya Jawab' : 'Frequently Asked'}
              </span>
            </h2>
            <p className="text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              {t('faqDesc') as string}
            </p>
          </div>

          {/* Chatbot Window Container (Luxury Frosted Architecture) */}
          <div className="bg-white rounded-[30px] border border-stone-300/80 shadow-2xl overflow-hidden flex flex-col">
            
            {/* Chatbot Header */}
            <div className="bg-stone-950 text-white px-6 py-4.5 flex items-center justify-between border-b border-stone-800">
              <div className="flex items-center space-x-3.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center text-amber-300 font-bold border border-amber-300/30 shadow-xs">
                    <Bot size={20} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-stone-950 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-serif font-bold text-white flex items-center gap-2">
                    <span>WD Digital Concierge</span>
                    <span className="text-[9px] font-sans font-semibold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">Active</span>
                  </h3>
                  <p className="text-xs text-stone-400 font-sans">{t('faqBotStatus') as string}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleResetChat}
                  className="px-3 py-1.5 rounded-full bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-white text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={t('faqResetTitle') as string}
                >
                  <RotateCcw size={13} />
                  <span className="hidden sm:inline">Reset</span>
                </button>
                <a
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20tanya%20langsung%20dengan%20tim%20desainer"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <MessageCircle size={13} />
                  <span className="hidden sm:inline">{t('faqChatWa') as string}</span>
                </a>
              </div>
            </div>

            {/* Chat Messages Log Area */}
            <div
              ref={chatMessagesContainerRef}
              className="h-[360px] sm:h-[420px] overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fbf9f6]/90 text-xs sm:text-sm font-sans"
            >
              <div className="text-center my-1">
                <span className="text-[10px] font-medium text-stone-500 bg-stone-100 px-3 py-1 rounded-full">
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
                      <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 text-xs shadow-2xs">
                        <Bot size={14} />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 shadow-2xs leading-relaxed space-y-2 ${
                        isUser
                          ? 'bg-stone-900 text-white rounded-br-xs text-right'
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
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors shadow-2xs"
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
                  <div className="w-7 h-7 rounded-full bg-stone-900 text-amber-300 flex items-center justify-center shrink-0 text-xs">
                    <Bot size={14} />
                  </div>
                  <div className="bg-white border border-stone-200/90 rounded-2xl rounded-bl-xs px-4 py-3 shadow-2xs flex items-center space-x-1.5">
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full bg-stone-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div />
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
                    className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-white hover:bg-stone-900 hover:text-white border border-stone-300/80 text-stone-700 transition-colors whitespace-nowrap cursor-pointer shrink-0 shadow-2xs active:scale-95"
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
                className="flex-1 px-4 py-2.5 rounded-full bg-stone-50 border border-stone-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-stone-900/20 focus:border-stone-900 transition-all placeholder:text-stone-400"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="w-10 h-10 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xs cursor-pointer shrink-0 active:scale-95"
                title={t('faqSendTitle') as string}
                aria-label={t('faqSendTitle') as string}
              >
                <Send size={15} />
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
              href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-stone-900 hover:underline flex items-center gap-1"
            >
              <span>{t('faqSupportLink') as string}</span>
              <ArrowRight size={13} />
            </a>
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER (Luxury Ambient Editorial Finish) */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white relative overflow-hidden border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="text-[10px] sm:text-[11px] font-bold tracking-[0.28em] text-amber-300 uppercase select-none">
            WD WEDDING PRODUCTION • TIMELESS ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-medium tracking-tight leading-[1.12]">
            {lang === 'id' ? 'Siap Mengabadikan Momen Bahagia Anda Bersama' : 'Ready to Immortalize Your Sacred Celebration with'}{' '}
            <span className="italic font-serif font-normal text-amber-300">
              WD Production?
            </span>
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            {t('ctaDesc') as string}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-95"
            >
              <MessageCircle size={16} />
              <span>{t('ctaBtn1') as string}</span>
            </a>

            <Link 
              to="/themes"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 transition-all flex items-center justify-center space-x-2 backdrop-blur-md active:scale-95"
            >
              <span>{t('ctaBtn2') as string}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER (Refined Luxury Editorial Signature) */}
      <footer className="bg-stone-950 text-stone-400 py-16 sm:py-20 border-t border-stone-800/80 text-sm font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            
            {/* Brand Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-stone-900 border border-white/20 flex items-center justify-center text-white font-cinzel font-bold text-lg shadow-xs">
                  WD
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold tracking-[0.2em] text-white uppercase font-sans">
                    WD PRODUCTION
                  </span>
                  <span className="text-[9px] tracking-[0.22em] text-stone-400 font-medium uppercase">
                    LUXURY WEDDINGS
                  </span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-light">
                {t('footerDesc') as string}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200 mb-4 font-sans">{t('footerNavTitle') as string}</h4>
              <ul className="space-y-2.5 text-xs">
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
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200 mb-4 font-sans">{t('footerDesignTitle') as string}</h4>
              <ul className="space-y-2.5 text-xs">
                <li><Link to="/themes" className="hover:text-white transition-colors">Nirwana Sarangan Resort</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Royal Wayang Gold (Keraton)</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Batak Maroon Heritage</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Javanese Heritage (Adat)</Link></li>
                <li><Link to="/themes" className="hover:text-white transition-colors">Secret Botanical Garden</Link></li>
              </ul>
            </div>

            {/* Contact & Admin */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-200 mb-4 font-sans">{t('footerContactTitle') as string}</h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a 
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20konsultasi%20mengenai%20pembuatan%20undangan%20pernikahan%20digital."
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
                  <Link to="/admin/login" className="text-amber-300 hover:underline font-semibold">
                    {t('footerAdminLink') as string} &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4 text-center sm:text-left">
            <p>&copy; {new Date().getFullYear()} WD Production. {t('footerCopyright') as string}</p>
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
