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
  Mail,
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
  Star,
  ShieldCheck
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
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [themeFilter, setThemeFilter] = useState<'all' | 'traditional' | 'resort' | 'modern'>('all');
  const [showAllThemes, setShowAllThemes] = useState(false);

  // Showcase Themes for Hero Showcase
  const showcaseBadges = t('showcaseBadge') as unknown as string[];
  const showcaseThemes = [
    {
      id: 'nirwana-sarangan',
      name: 'Nirwana Sarangan Resort',
      slug: 'nirwana-sarangan',
      badge: 'Tema Resort Eksklusif',
      couple: 'Steven & Bunga',
      date: 'Minggu, 18 Oktober 2026',
      preview: '/themes/nirwana-sarangan/nirwana-theme-preview.png',
      videoUrl: '/gemini_generated_video_1f694672.mp4',
      musicTitle: 'Bergema Sampai Selamanya - Nadhief Basalamah (Piano)',
      musicUrl: '/music/bergema-sampai-selamanya.mp3',
      demoUrl: '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true'
    },
    {
      id: 'royal-wayang-gold',
      name: 'Royal Wayang Gold',
      slug: 'royal-wayang-gold',
      badge: showcaseBadges[0] || 'Tema Keraton & Mewah',
      couple: 'Steven & Bunga',
      date: 'Minggu, 28 Desember 2025',
      preview: '/themes/royal-wayang-theme-preview.png',
      videoUrl: '/themes/royal-wayang-portal-zoom.mp4',
      musicTitle: 'Ladrang Wilujeng Keraton',
      musicUrl: '/music/royal-wayang-heritage.mp3',
      demoUrl: '/invitation/steven-bunga?theme=royal-wayang-gold&demo=true'
    },
    {
      id: 'joglo-maroon-heritage',
      name: 'Batak Maroon Heritage',
      slug: 'joglo-maroon-heritage',
      badge: 'Tema Pesta Adat Batak',
      couple: 'Steven & Bunga',
      date: 'Minggu, 12 April 2026',
      preview: '/themes/joglo-maroon-theme-preview.png',
      videoUrl: '/themes/joglo-maroon-entrance.mp4',
      musicTitle: 'Pesta Adat Batak Heritage',
      musicUrl: '/music/joglo-maroon-heritage.mp3',
      demoUrl: '/invitation/steven-bunga?theme=joglo-maroon-heritage&demo=true'
    },
    {
      id: 'javanese-heritage',
      name: 'Javanese Heritage',
      slug: 'javanese-heritage',
      badge: showcaseBadges[0] || 'Tema Tradisional Jawa',
      couple: 'Habib & Adiba',
      date: 'Sabtu, 24 Oktober 2026',
      preview: '/themes/javanese-heritage-theme-preview.png',
      videoUrl: '/themes/javanese-heritage-entrance.mp4',
      musicTitle: 'Bergema Sampai Selamanya - Nadhief Basalamah (Piano)',
      musicUrl: '/music/bergema-sampai-selamanya.mp3',
      demoUrl: '/invitation/steven-bunga?theme=javanese-heritage&demo=true'
    },
    {
      id: 'maroon-gold',
      name: 'Maroon Gold',
      slug: 'maroon-gold',
      badge: showcaseBadges[1] || 'Tema Royal Maroon',
      couple: 'Faris & Aisyah',
      date: 'Minggu, 15 November 2026',
      preview: '/themes/maroon-gold-theme-preview.png',
      videoUrl: '/maroon-gate-entrance.mp4',
      musicTitle: 'Canon in D (Royal Strings)',
      musicUrl: '/music/maroon-gold-canon.mp3',
      demoUrl: '/invitation/steven-bunga?theme=maroon-gold&demo=true'
    },
    {
      id: 'secret-garden',
      name: 'Secret Botanical Garden',
      slug: 'secret-garden',
      badge: showcaseBadges[2] || 'Tema Romantis Botanical',
      couple: 'Dimas & Nadia',
      date: 'Sabtu, 12 Desember 2026',
      preview: '/themes/secret-garden-theme-preview.png',
      videoUrl: '/themes/secret-garden/assets/video.mp4',
      musicTitle: 'A Thousand Years (Piano)',
      musicUrl: '/music/secret-garden.mp3',
      demoUrl: '/invitation/steven-bunga?theme=secret-garden&demo=true'
    },
    {
      id: 'split-floral',
      name: 'Split Floral Classical',
      slug: 'split-floral',
      badge: showcaseBadges[3] || 'Tema Klasik Modern',
      couple: 'Steven & Bunga',
      date: 'Minggu, 20 Desember 2026',
      preview: '/themes/split-floral-theme-preview.png',
      videoUrl: '',
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

  // Interactive Swift-style Demo Launcher State
  const [demoCoupleName, setDemoCoupleName] = useState('');
  const [demoSelectedTheme, setDemoSelectedTheme] = useState('nirwana-sarangan');
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const handleLaunchDemo = (e: React.FormEvent) => {
    e.preventDefault();
    const rawInput = demoCoupleName.trim();
    if (rawInput) {
      const parts = rawInput.split(/\s*(?:&|dan|and|\+)\s*/i);
      const groomInput = parts[0]?.trim() || rawInput;
      const brideInput = parts[1]?.trim() || (lang === 'id' ? 'Bunga' : 'Bunga');

      const testCoupleData = {
        groom_nickname: groomInput,
        groom_full_name: groomInput,
        groom_name: groomInput,
        bride_nickname: brideInput,
        bride_full_name: brideInput,
        bride_name: brideInput,
        is_session_test: true,
        timestamp: Date.now()
      };

      try {
        sessionStorage.setItem('wd_demo_couple', JSON.stringify(testCoupleData));
        localStorage.setItem('wd_demo_couple_session', JSON.stringify(testCoupleData));
      } catch (err) {
        console.warn('Storage not available', err);
      }
    } else {
      try {
        sessionStorage.removeItem('wd_demo_couple');
        localStorage.removeItem('wd_demo_couple_session');
      } catch {}
    }

    const url = `/invitation/steven-bunga?theme=${demoSelectedTheme}&demo=true`;
    window.open(url, '_blank');
  };

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

  const ALL_DEMO_THEMES = [
    {
      id: 'nirwana-sarangan',
      name: 'Nirwana Sarangan Resort',
      category: 'resort',
      categoryLabel: 'Resort & Nature',
      tag: 'Resort Telaga Sarangan',
      preview: '/themes/nirwana-sarangan/nirwana-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true',
      desc: lang === 'id' 
        ? 'Nuansa Telaga Sarangan sejuk, kemegahan Hotel Nirwana & intimate wedding pegunungan.'
        : 'Serene lakeside mountain scenery, grand Hotel Nirwana & intimate destination ceremonies.'
    },
    {
      id: 'royal-wayang-gold',
      name: 'Royal Wayang Gold',
      category: 'traditional',
      categoryLabel: 'Adat & Keraton',
      tag: 'Keraton Jawa Klasik',
      preview: '/themes/royal-wayang-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=royal-wayang-gold&demo=true',
      desc: lang === 'id'
        ? 'Kemegahan Pendopo Joglo malam hari, siluet wayang Kamajaya & Kamaratih berbalut emas murni.'
        : 'Grand Javanese Joglo at night with pure gold Kamajaya & Kamaratih wayang silhouettes.'
    },
    {
      id: 'joglo-maroon-heritage',
      name: 'Batak Maroon Heritage',
      category: 'traditional',
      categoryLabel: 'Adat & Nusantara',
      tag: 'Batak Bolon Heritage',
      preview: '/themes/joglo-maroon-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=joglo-maroon-heritage&demo=true',
      desc: lang === 'id'
        ? 'Kemegahan Rumah Bolon adat Batak, ornamen ukiran Gorga otentik & aksen tenun Ulos.'
        : 'Majestic Batak Bolon traditional house, authentic Gorga carvings & Ulos fabric accents.'
    },
    {
      id: 'javanese-heritage',
      name: 'Javanese Heritage',
      category: 'traditional',
      categoryLabel: 'Adat & Nusantara',
      tag: 'Nusantara Heritage',
      preview: '/themes/javanese-heritage-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=javanese-heritage&demo=true',
      desc: lang === 'id'
        ? 'Sentuhan sakral Candi Borobudur, ornamen batik Truntum klasik & nuansa terracotta marun.'
        : 'Sacred Borobudur temple motifs, classic Truntum batik patterns & terracotta maroon.'
    },
    {
      id: 'secret-garden',
      name: 'Secret Garden',
      category: 'modern',
      categoryLabel: 'Modern & Botanical',
      tag: 'Botanical Romance',
      preview: '/themes/secret-garden-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=secret-garden&demo=true',
      desc: lang === 'id'
        ? 'Nuansa taman romantis dusty rose & earthy mauve, bingkai arched oval & kelopak bunga.'
        : 'Romantic dusty rose botanical garden, elegant arched frames & floating flower petals.'
    },
    {
      id: 'split-floral',
      name: 'Split Floral Luxury',
      category: 'modern',
      categoryLabel: 'Modern & Floral',
      tag: 'Flagship Luxury',
      preview: '/themes/split-floral-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=split-floral&demo=true',
      desc: lang === 'id'
        ? 'Tampilan split-screen modern, ornamen floral vintage, saxophone jazz & piringan hitam.'
        : 'Modern split-screen layout, vintage florals, smooth saxophone & vinyl record player.'
    },
    {
      id: 'maroon-gold',
      name: 'Maroon Gold Royal',
      category: 'traditional',
      categoryLabel: 'Royal Classic',
      tag: 'Royal Vintage',
      preview: '/themes/maroon-gold-theme-preview.png',
      demoUrl: '/invitation/steven-bunga?theme=maroon-gold&demo=true',
      desc: lang === 'id'
        ? 'Nuansa merah marun & emas kerajaan, bingkai vintage berornamen & transisi gerbang istana.'
        : 'Royal maroon & imperial gold tones, ornate vintage frames & palace gate entrance.'
    }
  ];

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

      {/* Main Navigation Header (Swift Modern Minimalist Pill Style) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 transition-all shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
          
          {/* Brand Identity */}
          <Link to="/" className="flex items-center space-x-2.5 group select-none">
            <div className="w-10 h-10 rounded-2xl bg-primary-900 flex items-center justify-center text-amber-200 shadow-sm transition-transform group-hover:scale-105">
              <span className="font-cinzel text-lg font-bold tracking-wider">WD</span>
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight font-sans block leading-none">
                wdproduction<span className="text-primary-800">.</span>
              </span>
              <span className="text-[9px] tracking-[0.2em] text-stone-400 font-semibold uppercase mt-0.5 block">
                {t('brandSubtitle') as string}
              </span>
            </div>
          </Link>

          {/* Streamlined Desktop Floating Capsule Navigation */}
          <nav className="hidden lg:flex items-center bg-stone-100/80 backdrop-blur-md rounded-full p-1 border border-stone-200/70 text-xs font-semibold text-stone-700">
            <a href="#themes" className="px-4 py-1.5 rounded-full hover:text-stone-950 hover:bg-white transition-all shadow-2xs">
              {lang === 'id' ? 'Koleksi Tema' : 'Themes'}
            </a>
            <a href="#keunggulan" className="px-4 py-1.5 rounded-full hover:text-stone-950 hover:bg-white transition-all shadow-2xs">
              {lang === 'id' ? 'Fitur Unggulan' : 'Features'}
            </a>
            <a href="#alur" className="px-4 py-1.5 rounded-full hover:text-stone-950 hover:bg-white transition-all shadow-2xs">
              {lang === 'id' ? 'Alur Pesan' : 'How it Works'}
            </a>
            <a href="#pricing" className="px-4 py-1.5 rounded-full hover:text-stone-950 hover:bg-white transition-all shadow-2xs">
              {lang === 'id' ? 'Paket Harga' : 'Pricing'}
            </a>
            <a href="#faq" className="px-4 py-1.5 rounded-full hover:text-stone-950 hover:bg-white transition-all shadow-2xs">
              {lang === 'id' ? 'Tanya Jawab' : 'FAQ'}
            </a>
          </nav>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Language Switcher Pill */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100 text-stone-700 text-xs font-bold transition-all cursor-pointer shadow-2xs"
              aria-label={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
              title={lang === 'id' ? 'Switch to English' : 'Ganti ke Bahasa Indonesia'}
            >
              <Globe size={13} />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Elegant Pill CTA */}
            <a 
              href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20tertarik%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital"
              target="_blank" 
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-primary-900 hover:bg-primary-950 text-white pl-4 pr-1.5 py-1.5 rounded-full text-xs font-bold shadow-sm transition-all transform hover:-translate-y-0.5 active:scale-95 group"
            >
              <span>{lang === 'id' ? 'Pesan Sekarang' : 'Order Now'}</span>
              <span className="w-6 h-6 rounded-full bg-primary-800 text-amber-200 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                <ArrowRight size={13} />
              </span>
            </a>

            {/* Mobile Menu Toggle Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-5 py-6 space-y-4 animate-reveal-up shadow-lg">
            <nav className="flex flex-col space-y-3 text-sm font-semibold text-stone-700">
              <a href="#themes" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{lang === 'id' ? 'Koleksi Tema' : 'Themes'}</a>
              <a href="#keunggulan" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{lang === 'id' ? 'Fitur Unggulan' : 'Features'}</a>
              <a href="#alur" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{lang === 'id' ? 'Alur Pesan' : 'How it Works'}</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{lang === 'id' ? 'Paket Harga' : 'Pricing'}</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-primary-800 transition-colors">{lang === 'id' ? 'Tanya Jawab' : 'FAQ'}</a>
            </nav>
            <div className="pt-4 border-t border-stone-100 flex flex-col gap-2.5">
              <a 
                href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20tertarik%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital"
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full text-center py-2.5 text-xs font-bold text-white bg-primary-900 hover:bg-primary-950 rounded-full shadow-xs"
              >
                {lang === 'id' ? 'Konsultasi via WhatsApp' : 'Consult via WhatsApp'}
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

      {/* HERO SECTION (Swift Modern Layout with Real Digital Theme Mockup Showcase) */}
      <section id="hero" className="pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-20 relative overflow-hidden bg-gradient-to-b from-[#faf9f6] via-white to-[#faf9f6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* Left Column: Dignified Wedding Copy + Interactive Demo Capsule + Metrics */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Kicker Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-50 border border-primary-200/80 text-[11px] font-bold tracking-[0.15em] text-primary-800 uppercase select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-800 animate-pulse" />
                <span>{t('heroLabel') as string}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-stone-900 tracking-tight leading-[1.12]">
                {t('heroHeadline') as string}{' '}
                <span className="font-playfair italic font-normal text-primary-800 block sm:inline">{t('heroAccent') as string}</span>
              </h1>

              {/* Subheadline Prose */}
              <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {t('heroSubheadline') as string}
              </p>

              {/* Interactive Action Capsule (Swift Search Pill Style) */}
              <form onSubmit={handleLaunchDemo} className="pt-2">
                <div className="bg-white rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-xl border border-stone-200/90 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 max-w-xl mx-auto lg:mx-0 transition-all hover:border-primary-300 hover:shadow-2xl">
                  
                  {/* Input 1: Couple Names for 1-Session Testing */}
                  <div className="flex-1 flex items-center gap-2.5 px-3 py-1.5 sm:border-r border-stone-200">
                    <div className="w-8 h-8 rounded-full bg-primary-50 text-primary-800 flex items-center justify-center shrink-0">
                      <Heart size={16} className="fill-primary-700/20 text-primary-800" />
                    </div>
                    <input
                      type="text"
                      value={demoCoupleName}
                      onChange={(e) => setDemoCoupleName(e.target.value)}
                      placeholder={lang === 'id' ? 'Nama Mempelai (misal: Steven & Bunga)' : 'Couple Names (e.g. Steven & Bunga)'}
                      className="w-full text-xs sm:text-sm text-stone-800 placeholder-stone-400 bg-transparent border-none p-0 focus:ring-0 font-medium outline-none"
                    />
                  </div>

                  {/* Input 2: Theme Selector */}
                  <div className="flex-1 flex items-center gap-2 px-3 py-1.5">
                    <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center shrink-0">
                      <Sparkles size={15} />
                    </div>
                    <select
                      value={demoSelectedTheme}
                      onChange={(e) => {
                        setDemoSelectedTheme(e.target.value);
                        const foundIdx = showcaseThemes.findIndex(s => s.slug === e.target.value);
                        if (foundIdx !== -1) {
                          pauseAutoSlide();
                          setActiveMockupThemeIndex(foundIdx);
                        }
                      }}
                      className="w-full text-xs sm:text-sm text-stone-700 bg-transparent border-none p-0 focus:ring-0 font-medium cursor-pointer outline-none"
                    >
                      <option value="nirwana-sarangan">Nirwana Sarangan Resort</option>
                      <option value="royal-wayang-gold">Royal Wayang Gold (Keraton)</option>
                      <option value="joglo-maroon-heritage">Batak Maroon Heritage</option>
                      <option value="javanese-heritage">Javanese Heritage (Adat)</option>
                      <option value="secret-garden">Secret Botanical Garden</option>
                      <option value="split-floral">Split Floral Classical</option>
                    </select>
                  </div>

                  {/* Action Button: Round Luxury Primary Arrow */}
                  <button
                    type="submit"
                    title={lang === 'id' ? 'Buka Undangan Demo' : 'Launch Live Demo'}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-primary-900 hover:bg-primary-950 text-amber-200 flex items-center justify-center shrink-0 shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer mx-auto sm:mx-0"
                  >
                    <ArrowRight size={18} />
                  </button>

                </div>
                
                {/* Hint caption */}
                <div className="flex items-center justify-center lg:justify-start gap-2 mt-2.5 px-2 text-[11px] text-stone-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span>
                    {lang === 'id' 
                      ? 'Ketik nama Anda & pasangan untuk uji coba live preview langsung (khusus 1 sesi browser).'
                      : 'Type your & partner names for a live 1-session demo preview.'}
                  </span>
                </div>
              </form>

              {/* Bottom 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-4 pt-6 sm:pt-8 border-t border-stone-200/80 max-w-lg mx-auto lg:mx-0">
                <div>
                  <span className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight block">1,500+</span>
                  <span className="text-[11px] sm:text-xs text-stone-500 leading-tight block mt-0.5">
                    {lang === 'id' ? 'Pasangan Bahagia' : 'Happy Couples'}
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight block">99.8%</span>
                  <span className="text-[11px] sm:text-xs text-stone-500 leading-tight block mt-0.5">
                    {lang === 'id' ? 'Tamu Terkesan' : 'Positive Reviews'}
                  </span>
                </div>
                <div>
                  <span className="text-xl sm:text-3xl font-black text-stone-900 tracking-tight block">24 Jam</span>
                  <span className="text-[11px] sm:text-xs text-stone-500 leading-tight block mt-0.5">
                    {lang === 'id' ? 'Siap Sebar Kilat' : 'Fast Delivery'}
                  </span>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Digital Wedding Invitation Theme Showcase Card (Uncropped, Elegant Size) */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center w-full">
              
              {/* Outer Showcase Card (Sized so the theme photo is never oversized or cropped) */}
              <div className="relative w-full max-w-[320px] sm:max-w-[350px] rounded-[28px] sm:rounded-[32px] overflow-hidden bg-stone-950 shadow-2xl border border-stone-200/80 group">
                
                {/* Photo Container: Clean Digital Invitation Photo (Full View, No Cropping) */}
                <div className="relative aspect-[3/4] w-full bg-stone-950 flex items-center justify-center overflow-hidden">
                  <img 
                    key={currentShowcase.slug}
                    src={currentShowcase.preview} 
                    alt={`Tema Undangan Digital ${currentShowcase.name}`} 
                    className="w-full h-full object-contain transition-all duration-500 ease-out"
                  />

                  {/* Left & Right Slide Chevrons (Hover to reveal) */}
                  <button
                    type="button"
                    onClick={handlePrevTheme}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 opacity-80 sm:opacity-0 group-hover:opacity-100 border border-white/20 active:scale-95 cursor-pointer shadow-md"
                    aria-label="Tema Sebelumnya"
                    title="Tema Sebelumnya"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextTheme}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-stone-950/70 hover:bg-stone-950 text-white backdrop-blur-md flex items-center justify-center transition-all z-20 opacity-80 sm:opacity-0 group-hover:opacity-100 border border-white/20 active:scale-95 cursor-pointer shadow-md"
                    aria-label="Tema Selanjutnya"
                    title="Tema Selanjutnya"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>

                {/* Bottom Details Bar (Outside the photo area, never covers the invitation design) */}
                <div className="p-3.5 bg-stone-900 border-t border-stone-800/90 flex items-center justify-between text-white">
                  <div className="truncate mr-2.5">
                    <span className="text-xs font-bold block truncate text-stone-100">{currentShowcase.name}</span>
                    <span className="text-[10px] text-stone-400 block truncate">{currentShowcase.couple}</span>
                  </div>
                  <a
                    href={currentShowcase.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 bg-primary-800 hover:bg-primary-700 text-amber-200 border border-amber-300/30 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95"
                    title="Buka Undangan Demo Langsung"
                  >
                    <span>Live Demo</span>
                    <ArrowRight size={12} />
                  </a>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

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
                src={currentShowcase.videoUrl || "/gemini_generated_video_1f694672.mp4"} 
                controls 
                autoPlay 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 bg-stone-900 text-stone-200 text-xs flex items-center justify-between">
              <div>
                <p className="font-serif font-bold text-sm text-white">Cinematic Wedding Entrance &bull; {currentShowcase.name}</p>
                <p className="text-stone-400 text-[11px]">WD Production &bull; {currentShowcase.couple}</p>
              </div>
              <a 
                href={currentShowcase.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-primary-800 hover:bg-primary-700 text-amber-200 font-semibold transition-colors flex items-center gap-1.5 border border-amber-300/30"
              >
                <span>{lang === 'id' ? 'Buka Live Demo' : 'Open Live Demo'}</span>
                <ArrowRight size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* DIGITAL INVITATION ORDER WORKFLOW (Swift-Style Showcase Card) */}
      <section id="alur" className="py-16 sm:py-24 bg-[#faf9f6] border-y border-stone-200/80 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Grand Panoramic Showcase Card: Alur Pemesanan Undangan Digital */}
          <div className="relative w-full rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] bg-white border border-stone-200/90 shadow-2xl shadow-stone-200/60 overflow-hidden mb-12 sm:mb-16">
            
            {/* Desktop Background: 3D Isometric Wedding Studio & Invitation Crafting Diorama */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[60%] pointer-events-none overflow-hidden">
              <img 
                src="/images/wedding_order_workflow_diorama.jpg" 
                alt="3D Isometric Wedding Invitation Creation Studio" 
                className="w-full h-full object-cover object-left"
              />
              <div className="absolute inset-y-0 left-0 w-36 bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>

            {/* Inner Content Grid */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 p-7 sm:p-10 lg:p-14 items-center">
              
              {/* Left Column: Narrative Copy & Order Actions */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Eyebrow Pill Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-300/40 text-amber-900 text-[11px] font-bold uppercase tracking-widest font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse" />
                  <span>
                    {lang === 'id' ? 'ALUR PEMESANAN • 4 LANGKAH MUDAH' : 'ORDER WORKFLOW • 4 EASY STEPS'}
                  </span>
                </div>

                {/* Main Headline */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
                  {lang === 'id' ? (
                    <>
                      Wujudkan Undangan Impian.
                      <span className="text-primary-900 block mt-1">Praktis, Cepat &amp; Bebas Repot.</span>
                    </>
                  ) : (
                    <>
                      Craft Your Dream Invitation.
                      <span className="text-primary-900 block mt-1">Fast, Elegant &amp; Seamless.</span>
                    </>
                  )}
                </h2>

                {/* Subtitle Description */}
                <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl">
                  {lang === 'id' 
                    ? 'Proses kolaboratif yang terarah dan praktis. Mulai dari memilih tema impian, mengisi data acara sakral, peninjauan draf kilat 24 jam, hingga tautan resmi siap disebar ke WhatsApp seluruh keluarga & sahabat.'
                    : 'A guided, practical collaborative process. From choosing your dream theme, submitting event details, fast 24-hour draft review, to official invitation links ready to share via WhatsApp.'}
                </p>

                {/* Action Buttons: Primary Order Now + Secondary Explore Themes */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20tertarik%20memesan%20undangan%20pernikahan%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary-900 hover:bg-primary-950 text-amber-200 px-6 py-3.5 rounded-full font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md shadow-primary-900/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <span>{lang === 'id' ? 'Pesan Undangan Sekarang' : 'Order Invitation Now'}</span>
                    <ArrowRight size={16} />
                  </a>

                  <a
                    href="#themes"
                    className="flex items-center gap-2.5 px-4 py-3 rounded-full hover:bg-stone-100 text-stone-700 font-semibold text-xs sm:text-sm transition-all cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-xs">
                      <Play size={13} className="ml-0.5" />
                    </div>
                    <span>{lang === 'id' ? 'Lihat Katalog Tema' : 'Explore Themes'}</span>
                  </a>
                </div>

              </div>

              {/* Mobile / Tablet 3D Diorama Image (Shown only on screens < lg) */}
              <div className="lg:hidden relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-stone-200 shadow-md">
                <img 
                  src="/images/wedding_order_workflow_diorama.jpg" 
                  alt="3D Isometric Wedding Invitation Creation Studio" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right Column: Floating Order Workflow Timeline Card & Calligraphy Accent */}
              <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center w-full">
                
                {/* Floating Status Card */}
                <div className="relative w-full max-w-[310px] sm:max-w-[340px] bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_20px_50px_rgba(44,30,26,0.14)] border border-stone-200/90 space-y-4">
                  
                  {/* Card Header: Icon + Workflow Status Title */}
                  <div className="flex items-center gap-3.5 pb-3 border-b border-stone-100">
                    <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-300/40 text-amber-800 flex items-center justify-center shrink-0">
                      <Sparkles size={22} className="text-amber-700" />
                    </div>
                    <div>
                      <span className="block font-bold text-stone-900 text-sm sm:text-base leading-tight">
                        {lang === 'id' ? 'Proses Pembuatan Undangan' : 'Invitation Order Status'}
                      </span>
                      <span className="block text-[11px] text-stone-500 mt-0.5">
                        {lang === 'id' ? 'Estimasi Pengerjaan: 1x24 Jam' : 'Estimated Completion: 24 Hours'}
                      </span>
                    </div>
                  </div>

                  {/* Vertical Stepper Timeline (4 Order Steps) */}
                  <div className="space-y-3.5 relative pl-1">
                    
                    {/* Step 1: Pilih Tema & Konsultasi */}
                    <div className="flex items-start gap-3 relative">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="w-0.5 h-6 bg-emerald-300 my-0.5" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-xs">
                            {lang === 'id' ? '1. Pilih Tema & Konsultasi' : '1. Choose Theme & Consult'}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold font-mono">SELESAI</span>
                        </div>
                        <span className="text-[10.5px] text-stone-500 block">Katalog eksklusif / kustom konsep</span>
                      </div>
                    </div>

                    {/* Step 2: Kirimkan Detail Acara */}
                    <div className="flex items-start gap-3 relative">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] shadow-xs">
                          <Check size={11} strokeWidth={3} />
                        </span>
                        <span className="w-0.5 h-6 bg-amber-300 my-0.5" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-stone-900 text-xs">
                            {lang === 'id' ? '2. Kirimkan Data Acara' : '2. Submit Event Details'}
                          </span>
                          <span className="text-[10px] text-emerald-700 font-bold font-mono">SELESAI</span>
                        </div>
                        <span className="text-[10.5px] text-stone-500 block">Mempelai, jadwal, Maps &amp; foto</span>
                      </div>
                    </div>

                    {/* Step 3: Pengerjaan Draf & Revisi (Active / Pulsing) */}
                    <div className="flex items-start gap-3 relative">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white flex items-center justify-center text-[10px] ring-4 ring-amber-100 animate-pulse shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-white" />
                        </span>
                        <span className="w-0.5 h-6 bg-stone-200 my-0.5" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-amber-950 text-xs">
                            {lang === 'id' ? '3. Draf Kilat & Revisi' : '3. Draft & Revisions'}
                          </span>
                          <span className="text-[10px] text-amber-700 font-bold font-mono">PROSES</span>
                        </div>
                        <span className="text-[10.5px] text-amber-800 font-medium block">
                          {lang === 'id' ? 'Pratinjau online & bebas revisi' : 'Online preview & free revisions'}
                        </span>
                      </div>
                    </div>

                    {/* Step 4: Undangan Siap Disebar (Upcoming / Target) */}
                    <div className="flex items-start gap-3 relative">
                      <div className="flex flex-col items-center">
                        <span className="w-5 h-5 rounded-full border-2 border-stone-300 bg-white flex items-center justify-center" />
                      </div>
                      <div className="flex-1 pt-0.5">
                        <span className="font-medium text-stone-500 text-xs block">
                          {lang === 'id' ? '4. Undangan Siap Disebar' : '4. Ready to Distribute'}
                        </span>
                        <span className="text-[10.5px] text-stone-400 block">
                          {lang === 'id' ? 'Tautan aktif + generator nama tamu WA' : 'Live link + WhatsApp guest generator'}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

                {/* Elegant Handwritten Script on the side (Matching Swift's 'Closer Deliveries Happier Days.') */}
                <div className="mt-3.5 text-center lg:text-right w-full max-w-[310px] sm:max-w-[340px] pr-2">
                  <span className="font-serif italic text-stone-400 text-xs sm:text-sm tracking-wide select-none">
                    {lang === 'id' ? 'Siap Disebar Dalam 24 Jam.' : 'Ready to Share in 24 Hours.'}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* SWIFT-STYLE SECTION 1: FITUR UNGGULAN (Delivery for Every Need style) */}
          <div id="keunggulan" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start scroll-mt-20 pt-4 pb-14 border-b border-stone-200/80">
            
            {/* Left Header Column */}
            <div className="lg:col-span-3 space-y-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-primary-800 font-mono block">
                {lang === 'id' ? 'FITUR LENGKAP' : 'OUR FEATURES'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-tight">
                {lang === 'id' ? (
                  <>
                    Undangan Mewah untuk <span className="text-primary-900">Setiap Momen.</span>
                  </>
                ) : (
                  <>
                    Luxury Invitations for <span className="text-primary-900">Every Moment.</span>
                  </>
                )}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'id' 
                  ? 'Solusi digital terintegrasi yang memudahkan pengantin dan memanjakan seluruh tamu undangan.'
                  : 'Integrated digital solutions designed for effortless hosting and memorable guest experiences.'}
              </p>
              <div className="pt-2">
                <a
                  href="#themes"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer shadow-2xs"
                >
                  <span>{lang === 'id' ? 'Eksplorasi Fitur' : 'Explore Features'}</span>
                  <ArrowRight size={13} />
                </a>
              </div>
            </div>

            {/* Right Column: 4 Visual 3D Feature Cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              
              {/* Card 1: Personalisasi Nama Tamu */}
              <div 
                onClick={() => {
                  const url = '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true';
                  window.open(url, '_blank');
                }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf9f6] flex items-center justify-center p-3 mb-3.5 border border-stone-100">
                    <img 
                      src="/images/features/feat_personalisasi_tamu.png" 
                      alt="Personalisasi Nama Tamu WhatsApp" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center mb-2.5 shadow-2xs">
                    <Mail size={13} />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-primary-900 transition-colors">
                    {lang === 'id' ? 'Personalisasi Nama Tamu' : 'Guest Personalization'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed mt-1 line-clamp-2">
                    {lang === 'id' 
                      ? 'Kirim tautan undangan resmi per nama tamu via WhatsApp dalam satu klik otomatis.'
                      : 'Send official personalized invitation links per guest via WhatsApp in one click.'}
                  </p>
                </div>
                <div className="flex justify-end pt-3 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Card 2: Amplop Digital */}
              <div 
                onClick={() => {
                  const url = '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true';
                  window.open(url, '_blank');
                }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf9f6] flex items-center justify-center p-3 mb-3.5 border border-stone-100">
                    <img 
                      src="/images/features/feat_amplop_digital.png" 
                      alt="Amplop Digital & QRIS" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center mb-2.5 shadow-2xs">
                    <Gift size={13} />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-primary-900 transition-colors">
                    {lang === 'id' ? 'Amplop Digital & QRIS' : 'Digital Envelope & QRIS'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed mt-1 line-clamp-2">
                    {lang === 'id' 
                      ? 'Kirim tanda kasih cashless via transfer bank & QRIS resmi tanpa potongan.'
                      : 'Cashless wedding gifts via direct bank transfer and official instant QRIS.'}
                  </p>
                </div>
                <div className="flex justify-end pt-3 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Card 3: Buku Tamu & RSVP */}
              <div 
                onClick={() => {
                  const url = '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true';
                  window.open(url, '_blank');
                }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf9f6] flex items-center justify-center p-3 mb-3.5 border border-stone-100">
                    <img 
                      src="/images/features/feat_buku_tamu.png" 
                      alt="Buku Tamu & RSVP Real-time" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center mb-2.5 shadow-2xs">
                    <CheckCircle2 size={13} />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-primary-900 transition-colors">
                    {lang === 'id' ? 'Buku Tamu & RSVP' : 'Live Guestbook & RSVP'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed mt-1 line-clamp-2">
                    {lang === 'id' 
                      ? 'Konfirmasi kehadiran langsung dan catatan doa restu terekam rapi di dashboard.'
                      : 'Instant attendance confirmations and blessings recorded neatly on dashboard.'}
                  </p>
                </div>
                <div className="flex justify-end pt-3 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight size={15} />
                </div>
              </div>

              {/* Card 4: Navigasi & Kalender */}
              <div 
                onClick={() => {
                  const url = '/invitation/steven-bunga?theme=nirwana-sarangan&demo=true';
                  window.open(url, '_blank');
                }}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#faf9f6] flex items-center justify-center p-3 mb-3.5 border border-stone-100">
                    <img 
                      src="/images/features/feat_navigasi_kalender.png" 
                      alt="Navigasi Google Maps & Kalender" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-stone-900 text-white flex items-center justify-center mb-2.5 shadow-2xs">
                    <MapPin size={13} />
                  </div>
                  <h4 className="font-bold text-stone-900 text-sm group-hover:text-primary-900 transition-colors">
                    {lang === 'id' ? 'Navigasi & Kalender' : 'Navigation & Calendar'}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-relaxed mt-1 line-clamp-2">
                    {lang === 'id' 
                      ? 'Petunjuk rute akurat Google Maps & satu klik simpan jadwal ke Google/Apple Calendar.'
                      : 'Accurate Google Maps directions and one-tap save date to mobile calendar.'}
                  </p>
                </div>
                <div className="flex justify-end pt-3 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 transition-all">
                  <ArrowRight size={15} />
                </div>
              </div>

            </div>

          </div>

          {/* SWIFT-STYLE SECTION 2: DIGITAL WEDDING INVITATION THEMES & LIVE DEMOS */}
          <div id="themes" className="pt-16 border-t border-stone-200/80">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
              
              {/* Left Header Column */}
              <div className="lg:col-span-3 space-y-5 text-left sticky top-24">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary-800 font-mono block mb-2">
                    {lang === 'id' ? 'KOLEKSI TEMA EKSKLUSIF' : 'CURATED THEMES'}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight leading-[1.18]">
                    {lang === 'id' ? (
                      <>
                        Desain Elegan Siap <span className="text-primary-900">Disesuaikan.</span>
                      </>
                    ) : (
                      <>
                        Elegant Themes Ready to <span className="text-primary-900">Customize.</span>
                      </>
                    )}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mt-3">
                    {lang === 'id' 
                      ? 'Setiap tema dirancang dengan komposisi visual matang, tipografi premium, dan fitur interaktif lengkap. Coba live demo langsung di ponsel Anda.'
                      : 'Each theme is crafted with refined visual composition, premium typography, and complete interactive features. Try live demos directly on mobile.'}
                  </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                    {lang === 'id' ? 'Filter Kategori:' : 'Category Filter:'}
                  </span>
                  <div className="flex flex-wrap lg:flex-col gap-1.5">
                    {[
                      { key: 'all', label: lang === 'id' ? 'Semua Tema (7)' : 'All Themes (7)' },
                      { key: 'traditional', label: lang === 'id' ? 'Adat & Keraton' : 'Traditional' },
                      { key: 'resort', label: lang === 'id' ? 'Resort & Danau' : 'Resort & Nature' },
                      { key: 'modern', label: lang === 'id' ? 'Modern & Botanical' : 'Modern & Botanical' },
                    ].map((tab) => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          setThemeFilter(tab.key as any);
                          setShowAllThemes(false);
                        }}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold text-left transition-all cursor-pointer flex items-center justify-between ${
                          themeFilter === tab.key
                            ? 'bg-stone-900 text-white shadow-xs'
                            : 'bg-white hover:bg-stone-100 text-stone-600 border border-stone-200/80'
                        }`}
                      >
                        <span>{tab.label}</span>
                        {themeFilter === tab.key && <Check size={13} className="text-amber-400" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom Request Pill */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20apakah%20bisa%20konsultasi%20request%20custom%20tema?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-stone-300 text-stone-800 text-xs font-bold hover:bg-stone-100 hover:border-stone-400 transition-all cursor-pointer shadow-2xs w-full justify-center"
                  >
                    <span>{lang === 'id' ? 'Konsultasi Desain Khusus' : 'Bespoke Custom Request'}</span>
                    <ArrowRight size={13} />
                  </a>
                </div>
              </div>

              {/* Right Column: Dynamic Theme Cards with Live Demos */}
              <div className="lg:col-span-9 space-y-6">
                {(() => {
                  const filtered = ALL_DEMO_THEMES.filter((theme) => {
                    if (themeFilter === 'all') return true;
                    return theme.category === themeFilter;
                  });
                  const displayed = showAllThemes ? filtered : filtered.slice(0, 6);

                  return (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                        {displayed.map((theme) => (
                          <div 
                            key={theme.id}
                            className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                          >
                            <div>
                              {/* Image Preview with Badges */}
                              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-stone-900 mb-3.5 relative border border-stone-100">
                                <img 
                                  src={theme.preview} 
                                  alt={theme.name} 
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                {/* Badges Overlay */}
                                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between z-10 pointer-events-none">
                                  <span className="bg-stone-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-2xs">
                                    {theme.categoryLabel}
                                  </span>
                                  <span className="bg-white/90 backdrop-blur-xs text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shadow-2xs">
                                    <Star size={10} className="text-amber-500 fill-amber-500" />
                                    <span>4.9</span>
                                  </span>
                                </div>
                              </div>

                              {/* Theme Header & Text */}
                              <div className="space-y-1 mb-3">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary-800 font-mono block">
                                  {theme.tag}
                                </span>
                                <h4 className="font-bold text-stone-900 text-base group-hover:text-primary-900 transition-colors">
                                  {theme.name}
                                </h4>
                                <p className="text-xs text-stone-500 leading-relaxed line-clamp-2 pt-0.5">
                                  {theme.desc}
                                </p>
                              </div>
                            </div>

                            {/* Direct Live Demo CTA Button */}
                            <div className="pt-3 border-t border-stone-100 mt-2">
                              <a
                                href={theme.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95"
                              >
                                <span>{lang === 'id' ? 'Buka Live Demo' : 'Open Live Demo'}</span>
                                <ArrowRight size={14} />
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Expand / Collapse Button if more than 6 themes */}
                      {filtered.length > 6 && (
                        <div className="flex justify-center pt-2">
                          <button
                            onClick={() => setShowAllThemes(!showAllThemes)}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-stone-200/90 text-stone-800 text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
                          >
                            <span>
                              {showAllThemes
                                ? (lang === 'id' ? 'Tampilkan Lebih Sedikit' : 'Show Less')
                                : (lang === 'id' ? 'Lihat Selengkapnya' : 'View All Themes')}
                            </span>
                            <ChevronDown 
                              size={15} 
                              className={`text-stone-500 group-hover:text-stone-800 transition-transform duration-300 ${
                                showAllThemes ? 'rotate-180' : ''
                              }`} 
                            />
                          </button>
                        </div>
                      )}
                    </>
                  );
                })()}

                {/* Custom Design Notice Card */}
                <div className="bg-[#faf8f5] rounded-3xl border border-stone-200/90 p-5 sm:p-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left gap-4">
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-stone-900">
                      {lang === 'id' ? 'Ingin Desain Khusus Sesuai Konsep Pernikahan Anda?' : 'Want a Custom Design for Your Wedding Concept?'}
                    </h4>
                    <p className="text-xs text-stone-500 mt-0.5">
                      {lang === 'id' 
                        ? 'Tim desainer kami siap membuat konsep visual baru dari nol yang selaras dengan dekorasi & busana.'
                        : 'Our design team is ready to create a bespoke visual concept from scratch.'}
                    </p>
                  </div>
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20apakah%20bisa%20konsultasi%20request%20custom%20tema?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-full bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold transition-colors shrink-0 shadow-xs"
                  >
                    {lang === 'id' ? 'Konsultasi Desain Khusus' : 'Consult Designers'}
                  </a>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>



      {/* PRICING SECTION - Swift Style Layout */}
      <section id="pricing" className="py-20 sm:py-24 bg-[#faf8f5] border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            
            {/* Left Header Column */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 font-sans block mb-3">
                  {lang === 'id' ? 'INVESTASI & PAKET' : 'SIMPLE PRICING'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                  {lang === 'id' ? 'Paket yang Mengikuti Kebutuhan Anda.' : 'Plans That Move With You.'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
                  {lang === 'id' 
                    ? 'Pilihan paket transparan tanpa biaya tersembunyi. Siap disebar dengan mudah, anggun, dan berkesan.'
                    : 'Transparent pricing. No hidden fees. Just reliable and elegant delivery.'}
                </p>
              </div>

              <div className="pt-6 lg:pt-0">
                <a
                  href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20tanya%20detail%20seluruh%20paket%20undangan%20digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 text-xs font-bold shadow-xs transition-all"
                >
                  <span>{lang === 'id' ? 'Lihat Semua Rincian' : 'View All Plans'}</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Right Cards: 3 Pricing Cards + 1 3D Isometric Accent Box */}
            <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 items-stretch">
              
              {/* 1. Standard / Starter Plan */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="pb-4 border-b border-stone-100">
                    <h3 className="text-lg font-bold text-stone-900">
                      Standard
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {lang === 'id' ? 'Undangan Digital Praktis' : 'Essential Digital Invitation'}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-stone-950">
                        Rp 50rb
                      </span>
                      <span className="text-[11px] text-stone-400 font-medium">
                        / paket
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-stone-400 text-xs font-semibold">
                        Rp 150.000
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        Hemat 67%
                      </span>
                    </div>
                  </div>

                  <ul className="py-5 space-y-2.5 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Pengerjaan 3-5 hari kerja' : '3-5 business days delivery'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Pilihan tema standar pilihan' : 'Standard theme catalogue'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Hitung mundur & Google Maps' : 'Countdown timer & maps'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Amplop transfer & RSVP' : 'Digital envelope & RSVP'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span><strong>{lang === 'id' ? 'Masa aktif 7 hari' : 'Active for 7 days'}</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Starter%20(Rp%2050.000)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-colors shadow-2xs"
                  >
                    {lang === 'id' ? 'Pilih Paket' : 'Choose Plan'}
                  </a>
                </div>
              </div>

              {/* 2. Express / Premium Plan - FEATURED (Orange/Amber Accent) */}
              <div className="bg-white rounded-3xl p-6 border-2 border-orange-500 shadow-md flex flex-col justify-between relative ring-2 ring-orange-500/20">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-black px-3.5 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  {lang === 'id' ? 'Paling Diminati' : 'Most Popular'}
                </div>

                <div>
                  <div className="pb-4 border-b border-stone-100 pt-1">
                    <h3 className="text-lg font-bold text-stone-900">
                      Express
                    </h3>
                    <p className="text-[11px] text-orange-600 font-semibold mt-0.5">
                      {lang === 'id' ? 'Fitur Lengkap & Video Gate' : 'Full Features & Video Gate'}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-stone-950">
                        Rp 150rb
                      </span>
                      <span className="text-[11px] text-stone-400 font-medium">
                        / paket
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="line-through text-stone-400 text-xs font-semibold">
                        Rp 250.000
                      </span>
                      <span className="text-[10px] font-bold text-orange-700 bg-orange-100 px-2 py-0.5 rounded-full">
                        Hemat 40%
                      </span>
                    </div>
                  </div>

                  <ul className="py-5 space-y-2.5 text-xs text-stone-700">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-600 shrink-0 font-bold" />
                      <span>{lang === 'id' ? 'Pengerjaan 1-2 hari kerja' : '1-2 business days delivery'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-600 shrink-0 font-bold" />
                      <span>{lang === 'id' ? 'Seluruh fitur Paket Standard' : 'All standard features included'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-600 shrink-0 font-bold" />
                      <span>{lang === 'id' ? 'Transisi video gerbang sinematik' : 'Cinematic video entrance gate'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-600 shrink-0 font-bold" />
                      <span>{lang === 'id' ? 'Akses seluruh tema premium' : 'All premium themes included'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-orange-600 shrink-0 font-bold" />
                      <span><strong>{lang === 'id' ? 'Masa aktif 1 bulan penuh' : 'Active for 1 full month'}</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Express%20Premium%20(Rp%20150.000)"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    {lang === 'id' ? 'Pilih Paket' : 'Choose Plan'}
                  </a>
                </div>
              </div>

              {/* 3. Same-Day / Custom Plan */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                <div>
                  <div className="pb-4 border-b border-stone-100">
                    <h3 className="text-lg font-bold text-stone-900">
                      Same-Day / Custom
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {lang === 'id' ? 'Desain Khusus Bebas Request' : 'Bespoke Custom Design'}
                    </p>
                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="text-2xl sm:text-3xl font-black text-stone-950">
                        Custom
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-stone-600 bg-stone-100 px-2 py-0.5 rounded-full">
                        {lang === 'id' ? 'Prioritas Ekspres' : 'Priority Express'}
                      </span>
                    </div>
                  </div>

                  <ul className="py-5 space-y-2.5 text-xs text-stone-600">
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Selesai di hari yang sama / fleksibel' : 'Within the same day / flexible'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Desain eksklusif 100% dari nol' : '100% bespoke from scratch'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Integrasi QR Code check-in' : 'QR code guest check-in'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span>{lang === 'id' ? 'Revisi intensif bersama tim' : 'Intensive revision with team'}</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check size={14} className="text-emerald-600 shrink-0" />
                      <span><strong>{lang === 'id' ? 'Masa aktif menyesuaikan' : 'Custom active duration'}</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="pt-3">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20Paket%20Custom%20Same-Day"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-2.5 rounded-full bg-white hover:bg-stone-100 text-stone-900 border border-stone-300 font-bold text-xs transition-colors shadow-2xs"
                  >
                    {lang === 'id' ? 'Pilih Paket' : 'Choose Plan'}
                  </a>
                </div>
              </div>

              {/* 4. 3D Visual Accent Box (Isometric Diorama Style) */}
              <div className="bg-gradient-to-b from-[#fff6ed] to-[#ffeedb] rounded-3xl p-6 border border-orange-200/80 shadow-xs flex flex-col items-center justify-between text-center relative overflow-hidden group">
                <div className="w-full flex items-center justify-between text-[11px] font-bold text-orange-950">
                  <span className="font-cinzel tracking-wider">WD EXCLUSIVE</span>
                  <Sparkles size={14} className="text-orange-500" />
                </div>

                <div className="my-3 py-2 flex flex-col items-center justify-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 relative flex items-center justify-center">
                    <img
                      src="/images/features/feat_amplop_digital.png"
                      alt="Digital Wedding Stationery"
                      className="w-full h-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <p className="font-serif italic text-sm text-orange-950 font-semibold mt-2 leading-snug">
                    &ldquo;Momen Sakral, Berawal Dari Sini.&rdquo;
                  </p>
                </div>

                <div className="w-full pt-2 border-t border-orange-200/70 flex items-center justify-between text-[10px] text-stone-600 font-medium">
                  <span>WD Studio Magetan</span>
                  <span className="font-bold text-orange-700">★ 4.9 Rating</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS & TRUST SECTION - Swift Style Layout */}
      <section id="testimonials" className="py-20 sm:py-24 bg-[#faf9f6] border-b border-stone-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main 3-column row: Header & Arrows / 3 Testimonials / Stats Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-stretch">
            
            {/* Left Header Column with Slider Arrows */}
            <div className="lg:col-span-3 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-stone-500 font-sans block mb-3">
                  {lang === 'id' ? 'DIPERCAYA RIBUAN PENGANTIN' : 'TRUSTED BY THOUSANDS'}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                  {lang === 'id' ? 'Keluarga Bahagia. Momen yang Lebih Bermakna.' : 'Happier Couples. A More Connected Day.'}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-4 leading-relaxed">
                  {lang === 'id'
                    ? 'Kesan pertama yang tak terlupakan bagi setiap tamu undangan pernikahan Anda.'
                    : 'Unforgettable first impressions for every invited guest at your sacred celebration.'}
                </p>
              </div>

              {/* Slider Arrow Controls */}
              <div className="flex items-center gap-2 pt-6 lg:pt-0">
                <button
                  type="button"
                  onClick={() => setTestimonialIdx(prev => (prev === 0 ? 2 : prev - 1))}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setTestimonialIdx(prev => (prev === 2 ? 0 : prev + 1))}
                  className="w-10 h-10 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-stone-800 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            {/* Middle 3 Testimonial Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-stretch">
              
              {/* Card 1 */}
              <div className={`bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-xs ${
                testimonialIdx === 0 ? 'border-orange-500/80 ring-1 ring-orange-500/20' : 'border-stone-200/90'
              }`}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/photos/avatar-rendy-maya.jpg"
                      alt="Rendy & Maya"
                      className="w-9 h-9 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-[11px] font-bold text-stone-900 truncate">Rendy &amp; Maya</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;Sangat suka dengan detail visual dan ornamen batiknya. Tamu keluarga besar kami sangat mengapresiasi karena mudah dibuka dan sakral.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4">
                  <span className="text-[11px] font-medium text-stone-500 block">- Rendy &amp; Maya (Solo)</span>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className={`bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-xs ${
                testimonialIdx === 1 ? 'border-orange-500/80 ring-1 ring-orange-500/20' : 'border-stone-200/90'
              }`}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/photos/avatar-dimas-nadia.jpg"
                      alt="Dimas & Nadia"
                      className="w-9 h-9 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-[11px] font-bold text-stone-900 truncate">Dimas &amp; Nadia</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;Pelayanan super cepat &amp; ramah! Fitur generator nama tamu WhatsApp sangat membantu menghemat waktu sebar undangan kami.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4">
                  <span className="text-[11px] font-medium text-stone-500 block">- Dimas &amp; Nadia (Yogya)</span>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className={`bg-white rounded-3xl p-5 border transition-all duration-300 flex flex-col justify-between shadow-xs ${
                testimonialIdx === 2 ? 'border-orange-500/80 ring-1 ring-orange-500/20' : 'border-stone-200/90'
              }`}>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <img
                      src="/photos/avatar-faris-aisyah.jpg"
                      alt="Faris & Aisyah"
                      className="w-9 h-9 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-[11px] font-bold text-stone-900 truncate">Faris &amp; Aisyah</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed italic">
                    &ldquo;Transisi video gerbang pembukanya sangat mewah. Banyak teman yang memuji undangannya terasa eksklusif dan beda dari yang lain.&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-100 mt-4">
                  <span className="text-[11px] font-medium text-stone-500 block">- Faris &amp; Aisyah (Semarang)</span>
                  <div className="flex items-center gap-0.5 mt-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Summary Metrics Card */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs flex flex-col justify-between">
              <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-700 flex items-center justify-center mb-4">
                <ShieldCheck size={22} />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    1,500+
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {lang === 'id' ? 'Pasangan Bahagia' : 'Happy Couples'}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    99.8%
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {lang === 'id' ? 'Tamu Terkesan' : 'Delighted Guests'}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100">
                  <div className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
                    4.9/5
                  </div>
                  <p className="text-[11px] text-stone-500 font-medium">
                    {lang === 'id' ? 'Rating Kepuasan' : 'Customer Rating'}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* WD Group Divisions Ecosystem Strip */}
          <div className="mt-12 pt-8 border-t border-stone-200/70">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-stone-400 font-mono">
                {lang === 'id' ? 'EKOSISTEM & DIVISI RESMI PT WD GROUP' : 'OFFICIAL WD GROUP DIVISIONS'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 items-stretch">
              {/* Division 1: WD Sky Wedding Organizer */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_sky_wo.png"
                    alt="WD Sky Wedding Organizer"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Sky Wedding Organizer
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    PT WD Group Solo
                  </span>
                </div>
              </div>

              {/* Division 2: WD Digital Invitation */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_digital_invitation.png"
                    alt="WD Digital Invitation"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Digital Invitation
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    {lang === 'id' ? 'Undangan Digital' : 'Digital Invitation'}
                  </span>
                </div>
              </div>

              {/* Division 3: WD Music Entertainment */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_music.png"
                    alt="WD Music Entertainment"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Music Entertainment
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    {lang === 'id' ? 'Tata Musik & Akustik' : 'Music & Acoustic'}
                  </span>
                </div>
              </div>

              {/* Division 4: WD Music Class */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_music_class.png"
                    alt="WD Music Class"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Music Class
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    Play • Learn • Grow
                  </span>
                </div>
              </div>

              {/* Division 5: WD Edu */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_edu.png"
                    alt="WD Edu Learning Center"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Edu
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    Learning Center
                  </span>
                </div>
              </div>

              {/* Division 6: WD Jaya Workshop */}
              <div className="bg-white rounded-2xl p-3.5 sm:p-4 border border-stone-200/80 shadow-2xs hover:shadow-xs hover:border-amber-400/60 transition-all flex flex-col items-center justify-between text-center group">
                <div className="h-14 sm:h-16 w-full flex items-center justify-center py-1">
                  <img
                    src="/images/divisions/div_wd_jaya_workshop.png"
                    alt="WD Jaya Workshop"
                    className="max-h-full max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="pt-2 border-t border-stone-100 w-full mt-2">
                  <h5 className="font-bold text-xs text-stone-800 group-hover:text-primary-900 transition-colors leading-tight">
                    WD Jaya Workshop
                  </h5>
                  <span className="text-[10px] text-stone-400 font-medium block mt-0.5">
                    {lang === 'id' ? 'Workshop & Las' : 'Workshop & Metal'}
                  </span>
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
            <div
              ref={chatMessagesContainerRef}
              className="h-[360px] sm:h-[420px] overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#fbf9f6]/80 text-xs sm:text-sm"
            >
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

      {/* CALL TO ACTION BANNER - Swift Style Panoramic Card */}
      <section className="py-16 sm:py-20 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] sm:rounded-[40px] bg-[#171513] text-white p-8 sm:p-12 lg:p-14 relative overflow-hidden border border-stone-800 shadow-2xl">
            
            {/* Subtle background glow effect */}
            <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Heading, Copy, Pill CTA */}
              <div className="lg:col-span-6 space-y-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-orange-400 font-sans block">
                  {lang === 'id' ? 'SIAP MERAYAKAN HARI BAHAGIA?' : 'READY TO CELEBRATE?'}
                </span>
                
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.12] text-white">
                  {lang === 'id' ? 'Abadikan Hari Bahagia Anda Sekarang.' : "Let's Move a Brighter Tomorrow."}
                </h2>

                <p className="text-xs sm:text-sm text-stone-300 max-w-lg leading-relaxed font-light pt-1">
                  {lang === 'id'
                    ? 'Bergabunglah bersama ribuan pasangan yang mempercayakan undangan pernikahan digital mereka kepada WD Production. Cepat, anggun, dan tanpa repot.'
                    : 'Join thousands of couples who trust WD Production for fast, elegant, and worry-free digital wedding invitations.'}
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <a
                    href="https://wa.me/6285707909415?text=Halo%20WD%20Group,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-orange-950/40 transition-all active:scale-95"
                  >
                    <span>{lang === 'id' ? 'Pesan Sekarang' : 'Get Started Now'}</span>
                    <ArrowRight size={16} />
                  </a>

                  <Link
                    to="/themes"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-stone-800/90 hover:bg-stone-800 text-stone-200 hover:text-white font-semibold text-xs sm:text-sm border border-stone-700 transition-all"
                  >
                    <span>{lang === 'id' ? 'Koleksi Tema' : 'Theme Catalog'}</span>
                  </Link>
                </div>
              </div>

              {/* Right Column: 3D Diorama & Cursive Badge */}
              <div className="lg:col-span-6 relative">
                
                {/* Floating cursive text */}
                <div className="hidden sm:flex items-center gap-2 absolute top-3 right-4 z-20 pointer-events-none">
                  <span className="font-serif italic text-stone-300 text-sm sm:text-base tracking-wide drop-shadow-md">
                    More Than An Invitation
                  </span>
                  <Sparkles size={14} className="text-amber-400" />
                </div>

                {/* 3D Wedding Journey Diorama Image */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-stone-900 group">
                  <img
                    src="/images/wedding_journey_realtime_diorama.jpg"
                    alt="Wedding Journey Real-Time Diorama"
                    className="w-full h-auto max-h-[360px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Subtle caption pill on bottom */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/90 px-3.5 py-2 rounded-2xl bg-stone-950/60 backdrop-blur-md border border-white/10">
                    <span className="font-medium">WD Production • Magetan, Jawa Timur</span>
                    <span className="text-orange-400 font-bold">24 Jam Pengerjaan</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* FOOTER - Swift Design System Style */}
      <footer className="bg-[#faf8f5] text-stone-600 py-12 sm:py-16 border-t border-stone-200/80 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left: Brand & Subtitle */}
            <div className="md:col-span-3 space-y-2">
              <Link to="/" className="inline-block group select-none">
                <span className="text-2xl font-black text-stone-900 tracking-tight font-sans">
                  wdproduction<span className="text-orange-500">.</span>
                </span>
              </Link>
              <p className="text-xs text-stone-400 font-medium">
                {lang === 'id' ? 'Momen Sakral, Cinta Abadi' : 'Moments People Memories'}
              </p>
            </div>

            {/* Middle: 3 Navigation Columns */}
            <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
              
              {/* Column 1: Company */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 font-sans tracking-tight">
                  {lang === 'id' ? 'Company' : 'Company'}
                </h4>
                <ul className="space-y-2 text-xs text-stone-500">
                  <li>
                    <a href="#hero" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Tentang Kami' : 'About Us'}
                    </a>
                  </li>
                  <li>
                    <a href="#alur" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Alur Pesan' : 'Process'}
                    </a>
                  </li>
                  <li>
                    <a href="#themes" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Koleksi Tema' : 'Themes'}
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20ingin%20konsultasi%20pembuatan%20undangan%20pernikahan%20digital"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-stone-900 transition-colors"
                    >
                      {lang === 'id' ? 'Kontak Kami' : 'Contact'}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 2: Solutions */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 font-sans tracking-tight">
                  {lang === 'id' ? 'Solutions' : 'Solutions'}
                </h4>
                <ul className="space-y-2 text-xs text-stone-500">
                  <li>
                    <Link to="/themes" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Adat & Keraton' : 'Traditional'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/themes" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Resort & Danau' : 'Resort & Intimate'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/themes" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Secret Botanical' : 'Botanical Modern'}
                    </Link>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Custom Desain' : 'Bespoke Custom'}
                    </a>
                  </li>
                </ul>
              </div>

              {/* Column 3: Support */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-stone-900 font-sans tracking-tight">
                  {lang === 'id' ? 'Support' : 'Support'}
                </h4>
                <ul className="space-y-2 text-xs text-stone-500">
                  <li>
                    <a href="#faq" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Tanya Jawab (FAQ)' : 'Help Center'}
                    </a>
                  </li>
                  <li>
                    <a href="#pricing" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Daftar Paket' : 'Pricing Plans'}
                    </a>
                  </li>
                  <li>
                    <Link to="/admin/login" className="hover:text-stone-900 transition-colors">
                      {lang === 'id' ? 'Portal Pengantin' : 'Portal Login'}
                    </Link>
                  </li>
                  <li>
                    <a 
                      href="https://wa.me/6285707909415?text=Halo%20WD%20Production,%20saya%20butuh%20bantuan%20seputar%20undangan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-stone-900 transition-colors"
                    >
                      {lang === 'id' ? 'Bantuan WA' : 'Live Chat'}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

            {/* Right: Social Media Icons & Copyright */}
            <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between space-y-4 pt-2 md:pt-0">
              {/* Social Icons Strip */}
              <div className="flex items-center space-x-4 text-stone-800">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-600 transition-colors"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </a>
              </div>

              {/* Copyright Text */}
              <p className="text-xs text-stone-400">
                &copy; {new Date().getFullYear()} WD Production. All rights reserved.
              </p>
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
