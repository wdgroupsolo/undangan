import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Gift, CreditCard, Check, X, Copy, ChevronDown, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX, Maximize2, Sparkles } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

// Self-contained Instagram Icon SVG (safe across all lucide versions)
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

// Victorian Royal Gold Filigree Corner Ornaments
export const CardCornerFlourish: React.FC = () => (
  <>
    <div className="absolute top-2.5 left-2.5 w-7 h-7 pointer-events-none opacity-75 text-[#c4a46a]">
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 12 C2 6.5, 6.5 2, 12 2" />
        <path d="M2 20 C2 10, 10 2, 20 2" />
        <path d="M2 2 L2 24" />
        <path d="M2 2 L24 2" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <path d="M12 4 C12 8, 8 12, 4 12" />
      </svg>
    </div>
    <div className="absolute top-2.5 right-2.5 w-7 h-7 pointer-events-none opacity-75 text-[#c4a46a] -scale-x-100">
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 12 C2 6.5, 6.5 2, 12 2" />
        <path d="M2 20 C2 10, 10 2, 20 2" />
        <path d="M2 2 L2 24" />
        <path d="M2 2 L24 2" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <path d="M12 4 C12 8, 8 12, 4 12" />
      </svg>
    </div>
    <div className="absolute bottom-2.5 left-2.5 w-7 h-7 pointer-events-none opacity-75 text-[#c4a46a] -scale-y-100">
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 12 C2 6.5, 6.5 2, 12 2" />
        <path d="M2 20 C2 10, 10 2, 20 2" />
        <path d="M2 2 L2 24" />
        <path d="M2 2 L24 2" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <path d="M12 4 C12 8, 8 12, 4 12" />
      </svg>
    </div>
    <div className="absolute bottom-2.5 right-2.5 w-7 h-7 pointer-events-none opacity-75 text-[#c4a46a] -scale-x-100 -scale-y-100">
      <svg viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M2 12 C2 6.5, 6.5 2, 12 2" />
        <path d="M2 20 C2 10, 10 2, 20 2" />
        <path d="M2 2 L2 24" />
        <path d="M2 2 L24 2" />
        <circle cx="7" cy="7" r="1.5" fill="currentColor" />
        <path d="M12 4 C12 8, 8 12, 4 12" />
      </svg>
    </div>
  </>
);

// Ambient Floating Gold Sparkles
export const GoldSparkles: React.FC<{ count?: number; className?: string }> = ({ count = 12, className = '' }) => {
  const sparkles = [
    { top: '12%', left: '15%', size: 3, duration: '6s', delay: '0s' },
    { top: '22%', left: '82%', size: 4, duration: '7.5s', delay: '1.2s' },
    { top: '42%', left: '18%', size: 2.5, duration: '5.5s', delay: '2.5s' },
    { top: '58%', left: '88%', size: 3.5, duration: '8s', delay: '0.8s' },
    { top: '74%', left: '10%', size: 3, duration: '6.5s', delay: '3.1s' },
    { top: '86%', left: '72%', size: 2.5, duration: '7s', delay: '1.7s' },
    { top: '32%', left: '65%', size: 4, duration: '6s', delay: '2s' },
    { top: '48%', left: '42%', size: 3, duration: '8.5s', delay: '0.5s' },
    { top: '18%', left: '48%', size: 2.5, duration: '7s', delay: '2.8s' },
    { top: '68%', left: '52%', size: 3.5, duration: '6s', delay: '1.5s' },
    { top: '92%', left: '32%', size: 3, duration: '7.5s', delay: '0.2s' },
    { top: '28%', left: '92%', size: 2.5, duration: '5.8s', delay: '3.5s' },
  ].slice(0, count);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {sparkles.map((s, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-[#f3da9f]"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            boxShadow: '0 0 8px 2px rgba(243, 218, 159, 0.85)',
            animation: `sparkle-float ${s.duration} ease-in-out infinite ${s.delay}`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

// Royal Wax Seal Monogram Badge
export const WaxSealBadge: React.FC<{ monogram: string }> = ({ monogram }) => (
  <div className="relative inline-flex items-center justify-center select-none my-2">
    {/* Outer uneven wax disc with rich crimson gradient & realistic seal rim */}
    <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-gradient-to-br from-[#801824] via-[#5c0e18] to-[#36060c] shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_2px_4px_rgba(255,255,255,0.22),inset_0_-3px_6px_rgba(0,0,0,0.6)] flex items-center justify-center border border-[#962330]/60 relative">
      {/* Inner debossed ring */}
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#d4af37]/45 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-center bg-[#4a0d14]/80">
        {/* Embossed gold monogram lettermark */}
        <span 
          className="text-xl sm:text-2xl font-serif text-[#f3da9f] font-normal tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
        >
          {monogram}
        </span>
      </div>
      {/* Realistic wax drip highlight */}
      <div className="absolute top-1.5 left-2 w-3 h-2 rounded-full bg-white/20 blur-[0.6px] pointer-events-none -rotate-45" />
    </div>
  </div>
);

interface MaroonGoldThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const MaroonGoldTheme: React.FC<MaroonGoldThemeProps> = ({
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

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showGiftDropdown, setShowGiftDropdown] = useState<boolean>(false);
  const quoteSectionRef = useRef<HTMLElement | null>(null);
  const [isQuoteVisible, setIsQuoteVisible] = useState(false);

  // Staggered on-scroll fade-in for Quote section (photo first, then text)
  // Staggered on-scroll fade-in for Quote section (replays on scroll)
  useEffect(() => {
    const el = quoteSectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsQuoteVisible(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const coupleIntroRef = useRef<HTMLParagraphElement | null>(null);
  const [isIntroVisible, setIsIntroVisible] = useState(false);

  const brideRef = useRef<HTMLDivElement | null>(null);
  const [isBrideVisible, setIsBrideVisible] = useState(false);

  const groomRef = useRef<HTMLDivElement | null>(null);
  const [isGroomVisible, setIsGroomVisible] = useState(false);

  const countdownSectionRef = useRef<HTMLElement | null>(null);
  const [isCountdownVisible, setIsCountdownVisible] = useState(false);

  const eventsSectionRef = useRef<HTMLElement | null>(null);
  const [isEventsVisible, setIsEventsVisible] = useState(false);

  const liveStreamSectionRef = useRef<HTMLElement | null>(null);
  const [isLiveStreamVisible, setIsLiveStreamVisible] = useState(false);

  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);

  // Video Greeting State (Konsep 2 - Royal Golden Arch Player)
  const videoGreetingRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState<string>('00:00');
  const [videoDuration, setVideoDuration] = useState<string>('00:00');
  const [showVideoControls, setShowVideoControls] = useState<boolean>(true);
  const controlsTimeoutRef = useRef<any>(null);

  const videoUrl = invitation?.settings?.video_url || couple?.greeting_video_url || couple?.video_url || '/maroon-video.mp4';

  const formatVideoTime = (seconds: number) => {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePlayVideo = () => {
    if (!videoGreetingRef.current) return;
    videoGreetingRef.current.play().then(() => {
      setIsVideoPlaying(true);
      // Pause background music so speech/video is clearly heard
      window.dispatchEvent(new CustomEvent('wedding:pause-bgm'));
    }).catch((err) => {
      console.warn('Video play blocked:', err);
    });
  };

  const handlePauseVideo = () => {
    if (!videoGreetingRef.current) return;
    videoGreetingRef.current.pause();
    setIsVideoPlaying(false);
    // Resume background music
    window.dispatchEvent(new CustomEvent('wedding:resume-bgm'));
  };

  const handleTogglePlayVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (isVideoPlaying) {
      handlePauseVideo();
    } else {
      handlePlayVideo();
    }
  };

  const handleToggleMute = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoGreetingRef.current) return;
    const newMuted = !isVideoMuted;
    videoGreetingRef.current.muted = newMuted;
    setIsVideoMuted(newMuted);
  };

  const handleVideoTimeUpdate = () => {
    if (!videoGreetingRef.current) return;
    const current = videoGreetingRef.current.currentTime;
    const duration = videoGreetingRef.current.duration || 0;
    setVideoCurrentTime(formatVideoTime(current));
    if (duration > 0) {
      setVideoProgress((current / duration) * 100);
    }
  };

  const handleVideoLoadedMetadata = () => {
    if (!videoGreetingRef.current) return;
    setVideoDuration(formatVideoTime(videoGreetingRef.current.duration || 0));
  };

  const handleVideoEnded = () => {
    setIsVideoPlaying(false);
    setVideoProgress(0);
    if (videoGreetingRef.current) {
      videoGreetingRef.current.currentTime = 0;
    }
    // Resume background music when video finishes
    window.dispatchEvent(new CustomEvent('wedding:resume-bgm'));
  };

  const handleSeekVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoGreetingRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const duration = videoGreetingRef.current.duration || 0;
    if (duration > 0) {
      const targetTime = (seekPercent / 100) * duration;
      videoGreetingRef.current.currentTime = targetTime;
      setVideoProgress(seekPercent);
    }
  };

  const handleFullscreenVideo = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoGreetingRef.current) return;
    if (videoGreetingRef.current.requestFullscreen) {
      videoGreetingRef.current.requestFullscreen();
    }
  };

  const handleVideoInteraction = () => {
    setShowVideoControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isVideoPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowVideoControls(false);
      }, 3500);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
      window.dispatchEvent(new CustomEvent('wedding:resume-bgm'));
    };
  }, []);

  // Staggered on-scroll entrance animations for Couple & Countdown sections (replays on scroll)
  useEffect(() => {
    const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -30px 0px' };

    const introObserver = new IntersectionObserver(([entry]) => {
      setIsIntroVisible(entry.isIntersecting);
    }, observerOptions);

    const brideObserver = new IntersectionObserver(([entry]) => {
      setIsBrideVisible(entry.isIntersecting);
    }, observerOptions);

    const groomObserver = new IntersectionObserver(([entry]) => {
      setIsGroomVisible(entry.isIntersecting);
    }, observerOptions);

    const countdownObserver = new IntersectionObserver(([entry]) => {
      setIsCountdownVisible(entry.isIntersecting);
    }, observerOptions);

    const eventsObserver = new IntersectionObserver(([entry]) => {
      setIsEventsVisible(entry.isIntersecting);
    }, observerOptions);

    const liveStreamObserver = new IntersectionObserver(([entry]) => {
      setIsLiveStreamVisible(entry.isIntersecting);
    }, observerOptions);

    if (coupleIntroRef.current) introObserver.observe(coupleIntroRef.current);
    if (brideRef.current) brideObserver.observe(brideRef.current);
    if (groomRef.current) groomObserver.observe(groomRef.current);
    if (countdownSectionRef.current) countdownObserver.observe(countdownSectionRef.current);
    if (eventsSectionRef.current) eventsObserver.observe(eventsSectionRef.current);
    if (liveStreamSectionRef.current) liveStreamObserver.observe(liveStreamSectionRef.current);

    return () => {
      introObserver.disconnect();
      brideObserver.disconnect();
      groomObserver.disconnect();
      countdownObserver.disconnect();
      eventsObserver.disconnect();
      liveStreamObserver.disconnect();
    };
  }, []);


  const [wishName, setWishName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [wishAttendance, setWishAttendance] = useState('Hadir');
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState<Array<{ name: string; attendance: string; message: string; date: string }>>([
    {
      name: 'Alyasha',
      attendance: 'Hadir',
      message: 'Happy Wedding Steven & Bunga ❤️',
      date: '4 menit lalu'
    }
  ]);

  // Default events fallback when events prop is empty
  const defaultEvents = [
    {
      id: 'default-akad',
      name: 'Akad Nikah',
      event_date: '2026-10-25',
      start_time: '09.00',
      end_time: '',
      location: 'Kediaman Mempelai Wanita',
      maps_url: 'https://maps.google.com',
    },
    {
      id: 'default-resepsi',
      name: 'Resepsi',
      event_date: '2026-10-25',
      start_time: '10.00',
      end_time: 'Selesai',
      location: 'Kediaman Mempelai Wanita',
      maps_url: 'https://maps.google.com',
    }
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  // Default gallery fallback matching reference layout using existing high-res prewedding photos
  const defaultGallery = [
    { image_url: '/photos/photo-1.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    { image_url: '/photos/photo-4.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    { image_url: '/photos/photo-5.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    { image_url: '/photos/photo-7.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    { image_url: '/photos/photo-6.jpg', span: 'col-span-2', aspect: 'aspect-[16/11]' },
    { image_url: '/photos/photo-8.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
    { image_url: '/photos/photo-9.jpg', span: 'col-span-1', aspect: 'aspect-[3/4]' },
  ];

  const displayGallery = (gallery && gallery.length > 0)
    ? gallery.map((item, idx) => ({
        image_url: item.image_url,
        span: idx === 4 ? 'col-span-2' : 'col-span-1',
        aspect: idx === 4 ? 'aspect-[16/11]' : 'aspect-[3/4]',
      }))
    : defaultGallery;

  // Keyboard navigation for gallery lightbox
  useEffect(() => {
    if (activeLightboxIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveLightboxIdx(null);
      if (e.key === 'ArrowLeft') {
        setActiveLightboxIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : displayGallery.length - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveLightboxIdx((prev) => (prev !== null && prev < displayGallery.length - 1 ? prev + 1 : 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIdx, displayGallery.length]);

  // Default stories fallback matching reference screenshots
  const defaultStories = [
    {
      title: 'Awal Bertemu',
      description: 'Berawal dari teman kuliah yang bersama-sama memperjuangkan S1 Teknik Sipil, kami bertemu pada tahun 2016 dan selalu bertemu untuk sesekali makan bersama, lalu menjalin hubungan pacaran pada 11 November 2017.',
    },
    {
      title: 'Lamaran',
      description: 'Pada tanggal 23 Maret 2019 kami mengikat diri pada pertunangan dan pada tanggal 20 Oktober 2020 kami pun mengadakan akad nikah. Alhamdulillah perjalanan ini sampai pada akhirnya,',
    },
    {
      title: 'Pernikahan',
      description: 'Dan pada hari Minggu, 25 Oktober 2020 kami melangsungkan acara resepsi pernikahan. Kami bersyukur dipertemukan dan dipersatukan dalam ikatan suci ini.',
    },
  ];

  const displayStories = stories && stories.length > 0 ? stories : defaultStories;

  // Format event date in Indonesian locale safely
  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return 'Minggu, 25 Oktober 2026';
    try {
      const cleanDate = String(dateStr).split('T')[0];
      const parts = cleanDate.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const day = parseInt(parts[2], 10);
        const d = new Date(year, month, day);
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
      const d = new Date(dateStr);
      if (!isNaN(d.getTime())) {
        return d.toLocaleDateString('id-ID', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        });
      }
      return 'Minggu, 25 Oktober 2026';
    } catch {
      return 'Minggu, 25 Oktober 2026';
    }
  };

  const formatTimeStr = (startTime?: string, endTime?: string) => {
    if (!startTime && !endTime) return 'Pukul : 09.00 WIB';
    const start = (startTime || '09.00').replace(':', '.');
    if (!endTime) {
      return `Pukul : ${start} WIB`;
    }
    const cleanEnd = endTime.trim();
    if (cleanEnd.toLowerCase() === 'selesai') {
      return `Pukul : ${start} WIB - Selesai`;
    }
    return `Pukul : ${start} - ${cleanEnd.replace(':', '.')} WIB`;
  };

  // Target event date for countdown
  const targetDateStr = displayEvents?.[0]?.event_date || '2026-10-25';
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

  const handleCopyAccount = (acc: string, idx: number) => {
    navigator.clipboard.writeText(acc);
    setCopiedIndex(idx);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) return;

    setWishes(prev => [
      {
        name: wishName.trim(),
        attendance: wishAttendance || 'Hadir',
        message: wishText.trim(),
        date: 'Baru saja'
      },
      ...prev
    ]);
    setWishName('');
    setWishText('');
    toast.success('Ucapan dan doa berhasil dikirim!');
  };

  const hadirCount = wishes.filter(w => w.attendance === 'Hadir').length;
  const tidakHadirCount = wishes.filter(w => w.attendance === 'Tidak Hadir').length;

  const groomNick = (() => {
    const nick = couple?.groom_nickname?.trim();
    const full = couple?.groom_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'bagas' && nick.toLowerCase() !== 'habib') return nick;
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'habib') return full.split(' ')[0];
    return 'Steven';
  })();

  const brideNick = (() => {
    const nick = couple?.bride_nickname?.trim();
    const full = couple?.bride_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'siti' && nick.toLowerCase() !== 'adiba') return nick;
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'adiba') return full.split(' ')[0];
    return 'Bunga';
  })();

  const groomName = (() => {
    const full = couple?.groom_full_name?.trim();
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'habib') return full;
    return 'Steven Pratama';
  })();

  const brideName = (() => {
    const full = couple?.bride_full_name?.trim();
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'adiba') return full;
    return 'Bunga Lestari';
  })();

  const monogram = `${groomNick[0] || 'S'}${brideNick[0] || 'B'}`.toUpperCase();

  // Default gifts fallback matching template
  const defaultGifts = [
    {
      provider: 'BCA',
      account_number: '1234567890',
      account_name: `${groomNick} / ${brideNick}`,
    },
    {
      provider: 'MANDIRI',
      account_number: '9876543210123',
      account_name: `${groomNick} / ${brideNick}`,
    }
  ];

  const displayGifts = (gifts && gifts.length > 0) ? gifts : defaultGifts;

  const couplePhoto = 
    couple?.cover_photo_url || 
    gallery?.[0]?.image_url || 
    '/photos/photo-3.jpg';

  const formattedEventDate = (() => {
    const rawDate = events?.[0]?.event_date;
    if (!rawDate) return 'Minggu, 25 Oktober 2026';
    try {
      const d = new Date(rawDate);
      if (isNaN(d.getTime())) return 'Minggu, 25 Oktober 2026';
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return 'Minggu, 25 Oktober 2026';
    }
  })();

  return (
    <div className="min-h-screen text-[#3d141b] bg-[#f4efe8] selection:bg-[#8a333c] selection:text-white relative overflow-x-hidden font-serif">
      
      {/* ========================================================================= */}
      {/* DESKTOP LEFT SIDE: Fixed 58% width panel                                  */}
      {/* ========================================================================= */}
      <div className="hidden lg:block lg:w-[58%] fixed top-0 left-0 h-screen z-0 overflow-hidden bg-[#180306]">
        {/* Background Image / Couple Photo */}
        <img
          src={couplePhoto}
          alt="Couple Background"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Cinematic Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#180306] via-transparent to-black/60" />

        {/* Ambient Gold Sparkles on Left Panel */}
        <GoldSparkles count={14} />

        {/* Content on Left Side */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-20 text-white z-10 select-none">
          <p 
            className="text-lg xl:text-2xl text-white font-normal mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Undangan Pernikahan
          </p>

          <h1 
            className="text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[#ffffff] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {groomNick} <span className="font-light italic text-[#d4af37]">&amp;</span> {brideNick}
          </h1>

          <p 
            className="text-xl xl:text-3xl text-white/95 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-8"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            {formattedEventDate}
          </p>

          <div className="bg-black/40 border border-[#d4af37]/30 backdrop-blur-md rounded-2xl px-6 py-3.5 max-w-sm">
            <p className="text-xs uppercase tracking-widest text-[#d4af37]/90 font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-lg font-semibold text-white tracking-wide mt-0.5 font-sans">
              {guestName}
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Scrollable Invitation (42% width on desktop, 100% on mobile) */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] lg:ml-[58%] min-h-screen relative z-10 bg-[#f4efe8] shadow-[0_0_60px_rgba(0,0,0,0.25)] border-l border-[#8a333c]/15">
        <style>{`
          @keyframes flower-sway-left {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
            30% {
              transform: translate3d(1px, 2px, 0) rotate(1.2deg) scale(1.01);
            }
            60% {
              transform: translate3d(2px, 3.5px, 0) rotate(2.2deg) scale(1.018);
            }
            85% {
              transform: translate3d(1px, 1.5px, 0) rotate(0.8deg) scale(1.008);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
          }

          @keyframes flower-sway-right {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
            25% {
              transform: translate3d(-1px, 1.5px, 0) rotate(-0.8deg) scale(1.008);
            }
            55% {
              transform: translate3d(-2px, 3.5px, 0) rotate(-2.2deg) scale(1.018);
            }
            80% {
              transform: translate3d(-1px, 2px, 0) rotate(-1deg) scale(1.01);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
          }

          @keyframes swan-float-left {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
            35% {
              transform: translate3d(1.5px, -5px, 0) rotate(1deg) scale(1.02);
            }
            70% {
              transform: translate3d(0.8px, -2px, 0) rotate(0.3deg) scale(1.008);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
          }

          @keyframes swan-float-right {
            0% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
            30% {
              transform: translate3d(-0.8px, -2px, 0) rotate(-0.3deg) scale(1.008);
            }
            65% {
              transform: translate3d(-1.5px, -5.5px, 0) rotate(-1deg) scale(1.02);
            }
            100% {
              transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
            }
          }

          @keyframes breathe-bg {
            0%, 100% { transform: scale(1.00); }
            50% { transform: scale(1.018); }
          }

          @keyframes shimmer-sweep {
            0% {
              transform: translateX(-150%) skewX(-20deg);
              opacity: 0;
            }
            30% {
              opacity: 0.65;
            }
            100% {
              transform: translateX(200%) skewX(-20deg);
              opacity: 0;
            }
          }

          @keyframes sparkle-float {
            0% {
              transform: translate3d(0, 0, 0) scale(0.7);
              opacity: 0.15;
            }
            50% {
              transform: translate3d(5px, -14px, 0) scale(1.3);
              opacity: 0.9;
            }
            100% {
              transform: translate3d(0, 0, 0) scale(0.7);
              opacity: 0.15;
            }
          }

          @keyframes button-shimmer {
            0%, 65% {
              transform: translateX(-150%) skewX(-20deg);
            }
            100% {
              transform: translateX(250%) skewX(-20deg);
            }
          }
        `}</style>

        {/* ========================================================================= */}
        {/* 1. HERO SECTION: Exactly matching user reference (Oval portrait + Peacocks)*/}
        {/* ========================================================================= */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-between text-center px-4 pt-10 pb-8 overflow-hidden select-none">
          
          {/* Background Scene: Scenic etching backdrop (matches video ending frame seamlessly) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/gate-bg-open.jpg" 
              alt="Vintage Botanical Backdrop" 
              className="w-full h-full object-cover object-center opacity-100 origin-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f4efe8] via-transparent via-15% to-transparent" />
          </div>

          {/* Floral Ornaments (Corners) - Ultra-Smooth Wind Sway */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Top Left Flower */}
            <div className="absolute top-0 left-0 w-[45%] sm:w-[35%] -scale-y-100 opacity-90 -translate-y-4 -translate-x-4">
              <img 
                src="/floral-edge-left.png" 
                alt="Floral Top Left" 
                className="w-full h-full object-contain origin-top-left"
                style={{
                  animation: 'flower-sway-left 8s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
            {/* Top Right Flower */}
            <div className="absolute top-0 right-0 w-[45%] sm:w-[35%] -scale-y-100 opacity-90 -translate-y-4 translate-x-4">
              <img 
                src="/floral-edge-right.png" 
                alt="Floral Top Right" 
                className="w-full h-full object-contain origin-top-right"
                style={{
                  animation: 'flower-sway-right 8.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite 1s',
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          </div>

          {/* Bottom Angsa / Swans (Left & Right) - Ultra-Smooth Lifelike Floating & Breathing */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {/* Bottom Left Swan */}
            <div 
              className="absolute bottom-0 left-0 w-[44%] sm:w-[36%] max-w-[230px] origin-bottom-left"
              style={{
                animation: 'swan-float-left 7s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <img 
                src="/peacock-left.png" 
                alt="Angsa Kiri" 
                className="w-full h-auto object-contain block drop-shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
              />
            </div>

            {/* Bottom Right Swan */}
            <div 
              className="absolute bottom-0 right-0 w-[44%] sm:w-[36%] max-w-[230px] origin-bottom-right"
              style={{
                animation: 'swan-float-right 7.5s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite 1.2s',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              <img 
                src="/peacock-right.png" 
                alt="Angsa Kanan" 
                className="w-full h-auto object-contain block drop-shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
              />
            </div>
          </div>

          {/* Top Title & Monogram */}
          <div className="relative z-10 pt-10 sm:pt-14 flex flex-col items-center">
            <p 
              className="text-xs sm:text-sm md:text-base lg:text-lg tracking-[0.35em] sm:tracking-[0.45em] text-[#241315] font-serif uppercase font-semibold mb-2 drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              THE WEDDING OF
            </p>
            {/* Monogram in rich black */}
            <span 
              className="text-4xl sm:text-5xl lg:text-6xl text-[#1a1113] font-serif tracking-[0.2em] font-medium drop-shadow-sm z-20 mb-3"
              style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
            >
              {monogram}
            </span>
          </div>

          {/* Center Oval Couple Portrait */}
          <div className="relative z-10 my-auto flex flex-col items-center pt-1">
            {/* Oval Frame with thin border */}
            <div className="relative w-52 h-64 sm:w-60 sm:h-72 rounded-[50%] overflow-hidden border-[1.5px] border-[#fdfcf9] shadow-[0_8px_30px_rgba(0,0,0,0.15)] z-10">
              <div className="w-full h-full rounded-[50%] overflow-hidden">
                <img 
                  src={couplePhoto} 
                  alt={`${groomNick} & ${brideNick}`}
                  className="w-full h-full object-cover object-center" 
                />
              </div>
            </div>

            {/* Couple Names */}
            <h1 
              className="text-4xl sm:text-5xl font-serif text-[#351e20] tracking-wide font-normal mt-6 mb-1.5 drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {groomNick} <span className="font-light text-[#7a2b33] mx-1" style={{ fontFamily: "'Playfair Display', serif" }}>&amp;</span> {brideNick}
            </h1>

            {/* Event Date */}
            <p 
              className="text-xs sm:text-sm font-serif text-[#4a3032] tracking-wider"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {formattedEventDate}
            </p>
          </div>

          {/* Bottom Scroll Indicator Pill */}
          <div className="relative z-10 flex flex-col items-center pb-8 sm:pb-10">
            <div className="w-4 h-7 rounded-full border border-[#503033]/60 flex items-start justify-center p-1 bg-transparent shadow-sm">
              <div className="w-[3px] h-[5px] bg-[#503033]/80 rounded-full animate-bounce mt-0.5" />
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. AYAT SUCI / QUOTE SECTION (Staggered On-Scroll Fade-In)                 */}
        {/* ========================================================================= */}
        <section 
          ref={quoteSectionRef}
          className="py-20 px-6 relative z-10 bg-[#301114] border-t-2 border-[#c4a46a]/20 overflow-hidden"
        >
          {/* Ambient Gold Sparkles */}
          <GoldSparkles count={10} />
          <div className="max-w-md mx-auto text-center space-y-10 flex flex-col items-center">
            
            {/* Floral Circle Icon (Fades in FIRST on scroll) */}
            <div 
              className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-[#c4a46a]/40 shadow-xl transition-all duration-1000 ease-out ${
                isQuoteVisible 
                  ? 'opacity-90 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-90'
              }`}
              style={{
                transitionDelay: isQuoteVisible ? '100ms' : '0ms',
                willChange: 'transform, opacity',
              }}
            >
              <img 
                src="/mempelai-flower-left.png" 
                alt="Floral Icon" 
                className="w-full h-full object-cover object-center bg-[#4a1c22] scale-110"
              />
            </div>

            <div className="space-y-6">
              {/* Quote Text (Fades in SECOND on scroll, independent delay) */}
              <p 
                className={`text-sm sm:text-base text-[#dfc5b4] font-normal leading-[1.8] transition-all duration-1000 ease-out ${
                  isQuoteVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif",
                  transitionDelay: isQuoteVisible ? '500ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                "Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir."
              </p>

              {/* Surah Citation (Fades in THIRD on scroll) */}
              <p 
                className={`text-[13px] sm:text-sm text-[#c4a46a] font-normal italic transition-all duration-1000 ease-out ${
                  isQuoteVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ 
                  fontFamily: "'Playfair Display', Georgia, serif",
                  transitionDelay: isQuoteVisible ? '850ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                (QS Ar-Rum : 21)
              </p>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. COUPLE SECTION (Mempelai)                                             */}
        {/* ========================================================================= */}
        <section className="py-20 px-4 sm:px-6 relative z-10 min-h-screen flex flex-col justify-center overflow-hidden">
          
          {/* Background Image for Couple Section (Rich Vintage Etching Backdrop) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/gate-bg-open.jpg" 
              alt="Vintage Botanical Backdrop" 
              className="w-full h-full object-cover object-center opacity-95"
            />
            {/* Soft Warm Tint Overlay that preserves etching artwork */}
            <div className="absolute inset-0 bg-[#f4efe8]/15" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f4efe8] via-transparent via-15% to-[#f4efe8]" />
          </div>

          <div className="relative z-10 max-w-md mx-auto space-y-12 sm:space-y-14 flex flex-col items-center text-center">
            
            {/* Intro Text (On-Scroll Fade-In) */}
            <p 
              ref={coupleIntroRef}
              className={`text-[13px] sm:text-sm text-[#4a3032] font-serif leading-relaxed px-4 transition-all duration-1000 ease-out ${
                isIntroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ 
                fontFamily: "'Playfair Display', Georgia, serif",
                willChange: 'transform, opacity',
              }}
            >
              Dengan memohon Rahmat dan Ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri pernikahan kami :
            </p>

            {/* Bride Section (Independent On-Scroll Trigger) */}
            <div ref={brideRef} className="flex flex-col items-center space-y-4">
              {/* Badge: The Bride */}
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isBrideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isBrideVisible ? '80ms' : '0ms',
                }}
              >
                <span 
                  className="inline-block text-[11px] sm:text-xs tracking-[0.35em] text-[#8a333c] font-serif uppercase font-semibold border-b border-[#c4a46a]/60 pb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Bride
                </span>
              </div>

              {/* Bride Portrait with Luxury Double Gold Frame & Lens Reveal */}
              <div 
                className={`relative p-2 rounded-[50%] border border-[#c4a46a]/55 shadow-[0_12px_40px_rgba(122,43,51,0.22)] bg-white/40 backdrop-blur-[2px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isBrideVisible
                    ? 'opacity-100 translate-y-0 scale-100 blur-0 rotate-0'
                    : 'opacity-0 translate-y-14 scale-[0.82] blur-[4px] -rotate-2'
                }`}
                style={{
                  willChange: 'transform, opacity, filter',
                  transitionDelay: isBrideVisible ? '150ms' : '0ms',
                }}
              >
                <div className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-[50%] overflow-hidden border-[2px] border-[#fdfcf9] shadow-inner">
                  <img 
                    src={couple?.bride_photo_url || '/bride-default.png'} 
                    alt={brideName}
                    className={`w-full h-full object-cover object-center transition-transform duration-[1800ms] ease-out ${
                      isBrideVisible ? 'scale-100' : 'scale-115'
                    }`} 
                  />
                  {/* Golden Light Sheen Sweep on Reveal */}
                  {isBrideVisible && (
                    <div 
                      className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                      style={{
                        animation: 'shimmer-sweep 1.5s ease-out 0.4s forwards'
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Bride Details (Staggered Fade-In AFTER Photo) */}
              <div
                className={`transition-all duration-1000 ease-out pt-1 ${
                  isBrideVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isBrideVisible ? '500ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <h3 
                  className="text-3xl sm:text-4xl text-[#351e20] font-normal mb-2 drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {brideName}
                </h3>
                <p 
                  className="text-[11.5px] sm:text-xs text-[#4a3032] font-serif font-medium leading-relaxed max-w-[280px] mx-auto"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Putri dari Pasangan Bapak {couple?.bride_father_name || 'Bapak'} <br />
                  &amp; Ibu {couple?.bride_mother_name || 'Ibu'}
                </p>

                {/* Social Button (Always visible matching reference) */}
                <div className="pt-3 flex justify-center">
                  <a 
                    href={`https://instagram.com/${(couple?.bride_instagram || brideNick).toLowerCase().replace('@', '')}`}
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex w-9 h-9 rounded-full bg-[#7a2b33] hover:bg-[#5c2d36] text-white items-center justify-center transition-all duration-700 shadow-md ${
                      isBrideVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{
                      transitionDelay: isBrideVisible ? '750ms' : '0ms',
                    }}
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Ornamental Ampersand '&' Divider */}
            <div 
              className={`flex items-center justify-center gap-3 w-full max-w-[240px] mx-auto py-1 transition-all duration-1000 ease-out ${
                isBrideVisible ? 'opacity-90 scale-100' : 'opacity-0 scale-75'
              }`}
              style={{ 
                transitionDelay: isBrideVisible ? '750ms' : '0ms',
              }}
            >
              <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-[#c4a46a]/70 to-[#7a2b33]/40" />
              <span 
                className="text-3xl sm:text-4xl text-[#7a2b33] font-serif font-light px-2 drop-shadow-xs"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                &amp;
              </span>
              <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-[#c4a46a]/70 to-[#7a2b33]/40" />
            </div>

            {/* Groom Section (Independent On-Scroll Trigger) */}
            <div ref={groomRef} className="flex flex-col items-center space-y-4 pb-10 sm:pb-14">
              {/* Badge: The Groom */}
              <div 
                className={`transition-all duration-1000 ease-out ${
                  isGroomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
                style={{
                  transitionDelay: isGroomVisible ? '80ms' : '0ms',
                }}
              >
                <span 
                  className="inline-block text-[11px] sm:text-xs tracking-[0.35em] text-[#8a333c] font-serif uppercase font-semibold border-b border-[#c4a46a]/60 pb-1"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  The Groom
                </span>
              </div>

              {/* Groom Portrait with Luxury Double Gold Frame & Lens Reveal */}
              <div 
                className={`relative p-2 rounded-[50%] border border-[#c4a46a]/55 shadow-[0_12px_40px_rgba(122,43,51,0.22)] bg-white/40 backdrop-blur-[2px] transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isGroomVisible
                    ? 'opacity-100 translate-y-0 scale-100 blur-0 rotate-0'
                    : 'opacity-0 translate-y-14 scale-[0.82] blur-[4px] rotate-2'
                }`}
                style={{
                  willChange: 'transform, opacity, filter',
                  transitionDelay: isGroomVisible ? '150ms' : '0ms',
                }}
              >
                <div className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-[50%] overflow-hidden border-[2px] border-[#fdfcf9] shadow-inner">
                  <img 
                    src={couple?.groom_photo_url || '/groom-default.png'} 
                    alt={groomName}
                    className={`w-full h-full object-cover object-center transition-transform duration-[1800ms] ease-out ${
                      isGroomVisible ? 'scale-100' : 'scale-115'
                    }`} 
                  />
                  {/* Golden Light Sheen Sweep on Reveal */}
                  {isGroomVisible && (
                    <div 
                      className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                      style={{
                        animation: 'shimmer-sweep 1.5s ease-out 0.4s forwards'
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Groom Details (Staggered Fade-In AFTER Photo) */}
              <div
                className={`transition-all duration-1000 ease-out pt-1 ${
                  isGroomVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: isGroomVisible ? '500ms' : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                <h3 
                  className="text-3xl sm:text-4xl text-[#351e20] font-normal mb-2 drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {groomName}
                </h3>
                <p 
                  className="text-[11.5px] sm:text-xs text-[#4a3032] font-serif font-medium leading-relaxed max-w-[280px] mx-auto"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Putra dari Pasangan Bapak {couple?.groom_father_name || 'Bapak'} <br />
                  &amp; Ibu {couple?.groom_mother_name || 'Ibu'}
                </p>

                {/* Social Button (Always visible matching reference) */}
                <div className="pt-3 flex justify-center">
                  <a 
                    href={`https://instagram.com/${(couple?.groom_instagram || groomNick).toLowerCase().replace('@', '')}`}
                    target="_blank" 
                    rel="noreferrer"
                    className={`inline-flex w-9 h-9 rounded-full bg-[#7a2b33] hover:bg-[#5c2d36] text-white items-center justify-center transition-all duration-700 shadow-md ${
                      isGroomVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                    }`}
                    style={{
                      transitionDelay: isGroomVisible ? '750ms' : '0ms',
                    }}
                    title="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3.5 VIDEO & COUNTDOWN SECTION (On-Scroll Staggered Reveal)               */}
        {/* ========================================================================= */}
        <section 
          ref={countdownSectionRef}
          className="pt-14 pb-10 px-4 sm:px-6 relative z-10 bg-[#301114] shadow-[0_-10px_40px_rgba(0,0,0,0.3)] overflow-hidden"
        >
          <div className="max-w-md mx-auto">
            {/* Featured Card (Card Entrance Animation with Soft Elevation Scale) */}
            <div 
              className={`relative bg-[#f4efe8] p-3 sm:p-4 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isCountdownVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-12 scale-[0.93]'
              }`}
              style={{
                willChange: 'transform, opacity',
                transitionDelay: isCountdownVisible ? '100ms' : '0ms',
              }}
            >
              
              {/* Subtle Floral Watermark Background */}
              <img 
                src="/mempelai-flower-left.png" 
                alt="" 
                className="absolute bottom-[-15%] left-[-20%] w-[90%] opacity-[0.07] pointer-events-none"
              />
              <img 
                src="/mempelai-flower-right.png" 
                alt="" 
                className="absolute bottom-[-15%] right-[-20%] w-[90%] opacity-[0.07] pointer-events-none"
              />

              <div className="relative z-10">
                {/* Section Header Tag */}
                <div className="text-center mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#801824]/10 border border-[#801824]/20 text-[#801824] text-[11px] font-serif uppercase tracking-widest font-medium shadow-sm">
                    <Sparkles className="w-3 h-3 text-[#c4a46a]" />
                    Video Ucapan &amp; Pesan Mempelai
                  </span>
                </div>

                {/* Royal Arched Video Stage Frame Container (Konsep 2) */}
                <div 
                  className={`rounded-[1.75rem] overflow-hidden aspect-[16/10] sm:aspect-video relative shadow-[0_14px_40px_rgba(0,0,0,0.35)] border-2 border-[#d4af37]/75 transition-all duration-[1200ms] ease-out group select-none bg-[#1a080b] ${
                    isCountdownVisible 
                      ? 'opacity-100 scale-100' 
                      : 'opacity-0 scale-[0.94]'
                  }`}
                  style={{
                    willChange: 'transform, opacity',
                    transitionDelay: isCountdownVisible ? '250ms' : '0ms',
                  }}
                  onMouseMove={handleVideoInteraction}
                  onClick={handleVideoInteraction}
                >
                  {/* HTML5 Video Element */}
                  <video 
                    ref={videoGreetingRef}
                    src={videoUrl} 
                    playsInline
                    preload="metadata"
                    onTimeUpdate={handleVideoTimeUpdate}
                    onLoadedMetadata={handleVideoLoadedMetadata}
                    onEnded={handleVideoEnded}
                    onClick={handleTogglePlayVideo}
                    className={`w-full h-full object-cover transition-opacity duration-700 ${
                      isVideoPlaying ? 'opacity-100' : 'opacity-0'
                    }`}
                  />

                  {/* INITIAL / PAUSED COVER STATE: Royal Golden Arch Frame with Roses & Chandelier (Matches Reference Screenshot) */}
                  {!isVideoPlaying && (
                    <div 
                      className="absolute inset-0 z-20 flex flex-col items-center justify-between p-4 cursor-pointer overflow-hidden"
                      onClick={handlePlayVideo}
                    >
                      {/* Background: Our Generated Royal Arch Frame with Roses, Chandelier, Amber Glow */}
                      <img 
                        src="/maroon-video-frame.jpg" 
                        alt="Royal Wedding Arch Frame" 
                        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.02] transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Warm Vignette Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/50 pointer-events-none" />

                      {/* Ambient Sparkles */}
                      <GoldSparkles count={8} />

                      {/* Top Header inside Arch: "WEDDING OF" */}
                      <div className="relative z-10 pt-1.5 text-center">
                        <p 
                          className="text-[10px] sm:text-xs tracking-[0.35em] uppercase text-[#fbf0d8] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          THE WEDDING OF
                        </p>
                        <h2 
                          className="text-2xl sm:text-3xl text-[#fff8ea] font-normal italic tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] mt-0.5"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {groomNick} <span className="text-[#f3da9f] font-light">&amp;</span> {brideNick}
                        </h2>
                      </div>

                      {/* Center: Luxury Royal Golden Play Button */}
                      <div className="relative z-10 flex flex-col items-center my-auto group/btn">
                        <div className="relative">
                          {/* Pulsing Outer Halo */}
                          <div className="absolute -inset-2.5 rounded-full bg-[#d4af37]/35 blur-sm animate-pulse pointer-events-none" />
                          
                          {/* 3D Gold Rimmed Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlayVideo();
                            }}
                            className="relative w-15 h-15 sm:w-18 sm:h-18 rounded-full bg-gradient-to-tr from-[#99732f] via-[#ffd778] to-[#99732f] p-[2.5px] shadow-[0_8px_24px_rgba(0,0,0,0.6)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer"
                            aria-label="Putar Video Ucapan"
                          >
                            <div className="w-full h-full rounded-full bg-[#4a0d14] flex items-center justify-center border border-[#ffd778]/50 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                              <Play className="w-6 h-6 sm:w-8 sm:h-8 text-[#f3da9f] fill-[#f3da9f] ml-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />
                            </div>
                          </button>
                        </div>

                        {/* Interactive Pill Tag */}
                        <div className="mt-2.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-[#d4af37]/50 shadow-lg flex items-center gap-1.5 transition-transform duration-300 group-hover/btn:scale-105">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ffd778] animate-ping" />
                          <span className="text-[10px] sm:text-xs text-[#fbf0d8] font-serif tracking-wider uppercase font-medium">
                            Putar Video Ucapan
                          </span>
                        </div>
                      </div>

                      {/* Bottom Footer Note inside Poster */}
                      <div className="relative z-10 pb-1 text-center">
                        <p className="text-[10px] text-[#fbf0d8]/85 font-sans tracking-wide drop-shadow-sm">
                          Pesan &amp; Doa Restu dari Kedua Mempelai
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ACTIVE PLAYING CONTROLS OVERLAY */}
                  {isVideoPlaying && (
                    <div 
                      className={`absolute inset-0 z-20 flex flex-col justify-between p-3 sm:p-4 bg-gradient-to-b from-black/60 via-transparent to-black/85 transition-opacity duration-300 ${
                        showVideoControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                      }`}
                    >
                      {/* Top Bar: Title & Sound Toggle Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                          <span className="text-xs text-white/95 font-serif tracking-wider drop-shadow-md">
                            {groomNick} &amp; {brideNick} • Video Ucapan
                          </span>
                        </div>

                        {/* Sound Toggle (Mute / Unmute) */}
                        <button
                          type="button"
                          onClick={handleToggleMute}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white hover:bg-black/85 hover:border-[#d4af37]/60 transition-all text-xs shadow-lg cursor-pointer"
                          aria-label={isVideoMuted ? "Nyalakan Suara" : "Bisukan Suara"}
                        >
                          {isVideoMuted ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-rose-300" />
                              <span className="text-[10px] text-white/90">Hening</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5 text-[#ffd778]" />
                              <span className="text-[10px] text-white/90">Suara Nyala</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Center Play/Pause Tap Button */}
                      <div className="flex items-center justify-center my-auto">
                        <button
                          type="button"
                          onClick={handleTogglePlayVideo}
                          className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl cursor-pointer"
                          aria-label="Pause Video"
                        >
                          <Pause className="w-5 h-5 text-white" />
                        </button>
                      </div>

                      {/* Bottom Bar: Progress Slider, Time & Fullscreen */}
                      <div className="space-y-1.5">
                        {/* Gold Progress Scrubber */}
                        <div className="relative w-full h-1.5 bg-white/25 rounded-full overflow-hidden cursor-pointer">
                          <div 
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ffd778] via-[#e2b755] to-[#c49735] transition-all duration-150"
                            style={{ width: `${videoProgress}%` }}
                          />
                          <input 
                            type="range"
                            min="0"
                            max="100"
                            value={videoProgress}
                            onChange={handleSeekVideo}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            aria-label="Video Progress"
                          />
                        </div>

                        {/* Controls Bottom Row */}
                        <div className="flex items-center justify-between text-[11px] text-white/90 font-mono">
                          <div className="flex items-center gap-2">
                            <span>{videoCurrentTime}</span>
                            <span className="text-white/40">/</span>
                            <span className="text-white/70">{videoDuration}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={handleFullscreenVideo}
                              className="p-1 hover:text-[#ffd778] transition-colors cursor-pointer"
                              aria-label="Fullscreen Video"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Card Corner Flourish */}
                  <CardCornerFlourish />
                </div>

                {/* Countdown Section Inside Card */}
                <div className="pt-10 pb-6 px-2 text-center space-y-6">
                  {/* Cursive Title: Menuju Hari Bahagia (Staggered Fade-In) */}
                  <h3 
                    className={`text-4xl sm:text-5xl text-[#5c2d36]/80 font-normal drop-shadow-sm transition-all duration-1000 ease-out ${
                      isCountdownVisible 
                        ? 'opacity-100 translate-y-0 scale-100' 
                        : 'opacity-0 translate-y-6 scale-95'
                    }`}
                    style={{ 
                      fontFamily: "'Brittany Signature', 'Great Vibes', cursive",
                      transitionDelay: isCountdownVisible ? '480ms' : '0ms',
                      willChange: 'transform, opacity',
                    }}
                  >
                    Menuju Hari Bahagia
                  </h3>
                  
                  {/* Countdown Timer Blocks (Staggered Ripple Pop) */}
                  <div className="grid grid-cols-4 gap-2 max-w-[260px] mx-auto pt-2">
                    {[
                      { label: 'Hari', value: timeLeft.days, delay: '650ms' },
                      { label: 'Jam', value: timeLeft.hours, delay: '750ms' },
                      { label: 'Menit', value: timeLeft.minutes, delay: '850ms' },
                      { label: 'Detik', value: timeLeft.seconds, delay: '950ms' },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={`flex flex-col items-center transition-all duration-700 ease-out ${
                          isCountdownVisible 
                            ? 'opacity-100 translate-y-0 scale-100' 
                            : 'opacity-0 translate-y-5 scale-90'
                        }`}
                        style={{
                          transitionDelay: isCountdownVisible ? item.delay : '0ms',
                          willChange: 'transform, opacity',
                        }}
                      >
                        <span 
                          className="text-2xl sm:text-3xl text-[#4a3032] font-normal"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {String(item.value)}
                        </span>
                        <span 
                          className="text-[10px] sm:text-xs text-[#7a4b54] mt-1 font-serif font-medium tracking-wide"
                          style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. RANGKAIAN ACARA (Events)                                              */}
        {/* ========================================================================= */}
        <section 
          ref={eventsSectionRef}
          className="py-14 sm:py-20 px-4 sm:px-6 relative z-10 overflow-hidden flex flex-col justify-center"
        >
          
          {/* Background Image for Events Section */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/gate-bg-open.jpg" 
              alt="Vintage Botanical Backdrop" 
              className="w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-[#f4efe8]/20" />
          </div>

          <div className="relative z-10 max-w-md mx-auto space-y-10 w-full">
            {displayEvents.map((event, idx) => (
              <div 
                key={event.id || idx}
                className={`bg-[#f5efe7]/95 rounded-[1.75rem] sm:rounded-[2rem] p-7 sm:p-9 shadow-xl border border-[#d8cebe]/60 relative overflow-hidden text-center transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isEventsVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-[0.94]'
                }`}
                style={{
                  transitionDelay: isEventsVisible ? `${idx * 240 + 150}ms` : '0ms',
                  willChange: 'transform, opacity',
                }}
              >
                {/* Filigree Corner Flourishes */}
                <CardCornerFlourish />

                {/* Subtle botanical branch watermark in top background of card */}
                <div className="absolute top-0 inset-x-0 h-40 opacity-15 pointer-events-none overflow-hidden">
                  <img src="/gate-bg-open.jpg" alt="" className="w-full h-full object-cover object-top" />
                </div>

                <div className="relative z-10 space-y-4">
                  
                  {/* Event Title */}
                  <h3 
                    className="text-3xl sm:text-4xl text-[#4a262b] font-normal tracking-wide"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {event.name || 'Akad Nikah'}
                  </h3>

                  {/* Thin horizontal divider line */}
                  <div className="w-[88%] h-[1px] bg-[#5a2e34]/25 mx-auto my-5 sm:my-6" />

                  {/* Event Details */}
                  <div 
                    className="space-y-3 text-[#4a3032] pb-2" 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    <p className="font-semibold text-base sm:text-[17px] text-[#3b2226]">
                      {formatEventDate(event.event_date)}
                    </p>
                    
                    <p className="text-sm sm:text-[14px] font-medium text-[#4a3032]">
                      {formatTimeStr(event.start_time, event.end_time)}
                    </p>

                    <p className="text-sm sm:text-[14px] font-medium text-[#4a3032] max-w-[280px] mx-auto leading-relaxed">
                      Tempat : {event.location || 'Kediaman Mempelai Wanita'}
                    </p>
                  </div>

                  {/* Location Button with Golden Shimmer Sweep */}
                  <div className="pt-3 flex justify-center">
                    <a 
                      href={event.maps_url || (event.location ? `https://maps.google.com/?q=${encodeURIComponent(event.location)}` : 'https://maps.google.com')}
                      target="_blank" 
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-8 rounded-full text-xs sm:text-[13px] text-white transition-all duration-300 hover:bg-[#3f191e] active:scale-95 shadow-md cursor-pointer relative overflow-hidden group"
                      style={{
                        backgroundColor: '#59272d',
                        fontFamily: "'Playfair Display', serif"
                      }}
                    >
                      {/* Subtle continuous golden light sweep */}
                      <div 
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        style={{
                          animation: 'button-shimmer 4.5s ease-in-out infinite 1s'
                        }}
                      />
                      <MapPin className="w-3.5 h-3.5 fill-white text-white relative z-10" />
                      <span className="font-medium tracking-wide relative z-10">Lokasi Acara</span>
                    </a>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LIVE STREAMING SECTION                                                */}
        {/* ========================================================================= */}
        <section 
          ref={liveStreamSectionRef}
          className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden flex flex-col justify-center min-h-[85vh]"
        >
          
          {/* Background Image with Peacocks & Waterfall at bottom */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/gate-bg-open.jpg" 
              alt="Vintage Botanical Backdrop" 
              className="w-full h-full object-cover object-bottom opacity-85"
            />
            <div className="absolute inset-0 bg-[#f4efe8]/15" />
          </div>

          <div className="relative z-10 max-w-md mx-auto w-full">
            <div 
              className={`bg-[#f5efe7]/95 rounded-[1.75rem] sm:rounded-[2rem] p-7 sm:p-9 shadow-xl border border-[#d8cebe]/60 relative overflow-hidden text-center transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isLiveStreamVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-12 scale-[0.94]'
              }`}
              style={{
                transitionDelay: isLiveStreamVisible ? '150ms' : '0ms',
                willChange: 'transform, opacity',
              }}
            >
              {/* Filigree Corner Flourishes */}
              <CardCornerFlourish />
              
              {/* Subtle botanical branch watermark in top background of card */}
              <div className="absolute top-0 inset-x-0 h-40 opacity-15 pointer-events-none overflow-hidden">
                <img src="/gate-bg-open.jpg" alt="" className="w-full h-full object-cover object-top" />
              </div>

              <div className="relative z-10 space-y-4">
                
                {/* Title */}
                <h3 
                  className="text-3xl sm:text-4xl text-[#4a262b] font-normal tracking-wide"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Live Streaming
                </h3>

                {/* Thin divider line */}
                <div className="w-[88%] h-[1px] bg-[#5a2e34]/25 mx-auto my-5 sm:my-6" />

                {/* Description */}
                <p 
                  className="text-[12.5px] sm:text-[13.5px] text-[#4a3032] font-serif leading-relaxed max-w-[320px] mx-auto mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual yang disiarkan langsung melalui media sosial di bawah ini:
                </p>

                {/* Date & Time */}
                <div 
                  className="space-y-2 text-[#4a3032] pb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  <p className="font-semibold text-base sm:text-[17px] text-[#3b2226]">
                    {formatEventDate(displayEvents?.[1]?.event_date || displayEvents?.[0]?.event_date || '2026-10-25')}
                  </p>
                  
                  <p className="text-sm sm:text-[14px] font-medium text-[#4a3032]">
                    Pukul : {(displayEvents?.[1]?.start_time || '10.00').replace(':', '.')} WIB
                  </p>
                </div>

                {/* Instagram Live Streaming Button */}
                <div className="pt-2 flex justify-center">
                  <a 
                    href={couple?.live_stream_url || (couple?.bride_instagram ? `https://instagram.com/${couple.bride_instagram.replace('@', '')}` : (couple?.groom_instagram ? `https://instagram.com/${couple.groom_instagram.replace('@', '')}` : 'https://instagram.com'))}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-2.5 px-8 rounded-full text-xs sm:text-[13px] text-white transition-all duration-300 hover:bg-[#3f191e] active:scale-95 shadow-md cursor-pointer"
                    style={{
                      backgroundColor: '#59272d',
                      fontFamily: "'Playfair Display', serif"
                    }}
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                    <span className="font-medium tracking-wide">Klik di sini</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </section>
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 6. ALBUM SECTION                                                          */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 bg-[#301114] text-white overflow-hidden">
          {/* Ambient Gold Sparkles */}
          <GoldSparkles count={12} />

          <div className="max-w-md mx-auto space-y-6 sm:space-y-7 relative z-10">
            <h2 
              className="text-3xl sm:text-4xl font-normal text-center text-[#f4efe8] drop-shadow-sm tracking-wide"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Album
            </h2>

            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {displayGallery.map((item, idx) => (
                <div 
                  key={idx}
                  onClick={() => setActiveLightboxIdx(idx)}
                  className={`${item.span} ${item.aspect} rounded-2xl overflow-hidden shadow-xl bg-black/20 group relative cursor-pointer`}
                >
                  <img 
                    src={item.image_url} 
                    alt={`Album ${idx + 1}`}
                    className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 select-none" 
                    loading="lazy"
                  />
                  {/* Subtle golden hover frame & zoom icon */}
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center border-2 border-transparent group-hover:border-[#d4af37]/60 rounded-2xl">
                    <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-xs border border-[#d4af37]/70 flex items-center justify-center text-[#f3da9f] shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6.5 LOVE STORY & 7. WEDDING GIFT COMBINED SECTION                         */}
        {/* ========================================================================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10 overflow-hidden flex flex-col justify-center bg-[#ede4d8]">
          
          {/* Subtle Vintage Kraft Texture & Ambient Watermarks (NO duplicate clashing arches!) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#eadecc] via-[#ede5da] to-[#e4d8c8]" />
            {/* Subtle vintage botanical branch watermark on edges */}
            <img 
              src="/mempelai-flower-left.png" 
              alt="" 
              className="absolute top-[10%] left-[-15%] w-[70%] max-w-[340px] opacity-15 pointer-events-none"
            />
            <img 
              src="/mempelai-flower-right.png" 
              alt="" 
              className="absolute top-[45%] right-[-15%] w-[70%] max-w-[340px] opacity-15 pointer-events-none"
            />
            <img 
              src="/mempelai-flower-left.png" 
              alt="" 
              className="absolute bottom-[-5%] left-[-10%] w-[60%] max-w-[300px] opacity-15 pointer-events-none rotate-45"
            />
          </div>

          <div className="relative z-10 max-w-md mx-auto w-full space-y-14 sm:space-y-16">
            
            {/* --- LOVE STORY CARD --- */}
            <div className="bg-[#f5efe7]/95 rounded-[1.75rem] sm:rounded-[2rem] p-6 sm:p-8 shadow-xl border border-[#d8cebe]/60 relative overflow-hidden">
              {/* Filigree Corner Flourishes */}
              <CardCornerFlourish />

              {/* Subtle botanical branch watermark in top background of card */}
              <div className="absolute top-0 inset-x-0 h-40 opacity-15 pointer-events-none overflow-hidden">
                <img src="/gate-bg-open.jpg" alt="" className="w-full h-full object-cover object-top" />
              </div>

              <div className="relative z-10">
                {/* Wax Seal Monogram Accent */}
                <div className="flex justify-center -mt-2 mb-2">
                  <WaxSealBadge monogram={monogram} />
                </div>
                {/* Title */}
                <h3 
                  className="text-3xl sm:text-4xl text-[#4a262b] font-normal tracking-wide text-center pt-2 pb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Love Story
                </h3>

                {/* Featured Photo with bottom maroon gradient fade */}
                <div className="rounded-2xl overflow-hidden relative shadow-md mb-8 group">
                  <img 
                    src={stories?.[0]?.image_url || '/photos/photo-6.jpg'} 
                    alt="Love Story" 
                    className="w-full h-auto object-cover object-center block"
                  />
                  {/* Bottom maroon gradient overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#4a1c22]/85 via-[#4a1c22]/30 to-transparent pointer-events-none" />
                </div>

                {/* Story Chapters List */}
                <div className="space-y-7 pb-2 text-center">
                  {displayStories.map((story: any, idx: number) => (
                    <div key={story.id || idx} className="space-y-2.5">
                      <h4 
                        className="text-base sm:text-[17px] font-normal text-[#4a262b] tracking-wide"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {story.title || story.chapter_title}
                      </h4>
                      <p 
                        className="text-[12px] sm:text-[13px] text-[#4a3032] font-serif leading-relaxed max-w-[330px] mx-auto opacity-95"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {story.description || story.content || story.story}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* --- WEDDING GIFT SECTION --- */}
            <div className="text-center space-y-6 pt-2 pb-4">
              {/* Title */}
              <h3 
                className="text-3xl sm:text-4xl text-[#4a262b] font-normal tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Wedding Gift
              </h3>

              {/* Description */}
              <p 
                className="text-xs sm:text-[13px] text-[#4a3032] font-serif leading-relaxed max-w-[340px] mx-auto opacity-95"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami, <br className="hidden sm:inline" />
                dan jika memberi adalah ungkapan tanda kasih, <br className="hidden sm:inline" />
                Anda dapat memberi kado secara cashless.
              </p>

              {/* Pill Button "Klik di sini" (Dropdown Accordion Toggle) */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowGiftDropdown(!showGiftDropdown)}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-7 rounded-full text-xs sm:text-[13px] text-white transition-all duration-300 hover:bg-[#3f191e] active:scale-95 shadow-md cursor-pointer"
                  style={{
                    backgroundColor: '#59272d',
                    fontFamily: "'Playfair Display', serif"
                  }}
                >
                  <Gift className="w-3.5 h-3.5 text-white" />
                  <span className="font-medium tracking-wide">Klik di sini</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-white/80 transition-transform duration-300 ${showGiftDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>

              {/* In-place Dropdown / Accordion */}
              {showGiftDropdown && (
                <div className="pt-4 max-w-sm mx-auto space-y-3.5 animate-fade-in text-center">
                  <p 
                    className="text-[11.5px] sm:text-xs text-[#7a4b54] font-serif italic"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Silakan transfer ke rekening berikut:
                  </p>

                  <div className="space-y-3">
                    {displayGifts.map((gift: any, idx: number) => (
                      <div 
                        key={idx}
                        className="bg-white/95 border border-[#d8cebe] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col items-center space-y-1.5 transition-all hover:shadow-md"
                      >
                        <div className="flex items-center gap-1.5 text-[#59272d]">
                          <CreditCard className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider font-sans">
                            {gift.provider || 'Bank'}
                          </span>
                        </div>

                        <p className="text-lg sm:text-xl font-mono tracking-widest text-[#3d141b] font-bold select-all">
                          {gift.account_number}
                        </p>

                        <p className="text-[11px] text-[#5c2d36] uppercase tracking-wide font-sans pb-1">
                          a.n {gift.account_name}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleCopyAccount(gift.account_number, idx)}
                          className="inline-flex items-center gap-1.5 py-1.5 px-5 rounded-full text-xs text-white transition-all duration-200 active:scale-95 shadow-xs cursor-pointer hover:bg-[#3f191e]"
                          style={{
                            backgroundColor: '#59272d',
                            fontFamily: "'Playfair Display', serif"
                          }}
                        >
                          {copiedIndex === idx ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-white" />
                              <span>Tersalin!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-white" />
                              <span>Salin No. Rekening</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}

                    {/* Physical Gift Address if available */}
                    {couple?.gift_address && (
                      <div className="bg-white/95 border border-[#d8cebe] rounded-2xl p-4 shadow-sm relative overflow-hidden flex flex-col items-center space-y-1.5">
                        <div className="flex items-center gap-1.5 text-[#59272d]">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider font-sans">
                            Alamat Pengiriman Kado
                          </span>
                        </div>
                        <p className="text-[11.5px] text-[#4a3032] font-serif leading-relaxed px-2">
                          {couple.gift_address}
                        </p>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(couple.gift_address);
                            toast.success('Alamat berhasil disalin!');
                          }}
                          className="inline-flex items-center gap-1.5 py-1.5 px-5 rounded-full text-xs text-white transition-all duration-200 active:scale-95 shadow-xs cursor-pointer hover:bg-[#3f191e]"
                          style={{
                            backgroundColor: '#59272d',
                            fontFamily: "'Playfair Display', serif"
                          }}
                        >
                          <Copy className="w-3.5 h-3.5 text-white" />
                          <span>Salin Alamat</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. WISHES SECTION                                                        */}
        {/* ========================================================================= */}
        <section className="py-20 sm:py-24 px-5 sm:px-6 relative z-10 bg-[#301114] text-white overflow-hidden">
          {/* Ambient Gold Sparkles */}
          <GoldSparkles count={10} />
          <div className="max-w-sm mx-auto space-y-6 relative z-10">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 
                className="text-3xl sm:text-4xl font-normal text-[#f4efe8] tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Wishes
              </h2>
              <p 
                className="text-[12px] sm:text-[13px] text-[#f4efe8]/80 font-serif leading-relaxed max-w-[280px] mx-auto"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Berikan ucapan harapan dan do'a kepada kedua mempelai
              </p>
            </div>

            {/* Comment Counter & Attendance Stats */}
            <div className="space-y-3">
              <p className="text-center text-xs sm:text-[13px] text-[#f4efe8]/90 font-serif tracking-wide">
                {wishes.length} {wishes.length === 1 ? 'Comment' : 'Comments'}
              </p>

              <div className="grid grid-cols-2 gap-3 max-w-[280px] mx-auto">
                {/* Hadir Card */}
                <div className="bg-[#d4edda] rounded-xl sm:rounded-2xl py-3 px-2 text-center border border-[#c3e6cb] shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-[#155724] leading-tight mb-0.5">
                    {hadirCount}
                  </div>
                  <div className="text-xs font-semibold text-[#155724]">
                    Hadir
                  </div>
                </div>

                {/* Tidak Hadir Card */}
                <div className="bg-[#f8d7da] rounded-xl sm:rounded-2xl py-3 px-2 text-center border border-[#f5c6cb] shadow-sm">
                  <div className="text-2xl sm:text-3xl font-bold text-[#721c24] leading-tight mb-0.5">
                    {tidakHadirCount}
                  </div>
                  <div className="text-xs font-semibold text-[#721c24]">
                    Tidak Hadir
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleAddWish} className="space-y-3 pt-1">
              <div>
                <input
                  type="text"
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Nama"
                  required
                  className="w-full bg-white rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f1c40f] border-0 shadow-xs"
                />
              </div>

              <div>
                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Ucapan"
                  rows={3}
                  required
                  className="w-full bg-white rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#f1c40f] border-0 resize-none shadow-xs"
                />
              </div>

              <div className="relative">
                <select
                  value={wishAttendance}
                  onChange={(e) => setWishAttendance(e.target.value)}
                  required
                  className="w-full bg-white rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#f1c40f] border-0 appearance-none cursor-pointer pr-10 shadow-xs"
                >
                  <option value="" disabled>Konfirmasi Kehadiran</option>
                  <option value="Hadir">Hadir</option>
                  <option value="Tidak Hadir">Tidak Hadir</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-md font-medium text-xs sm:text-sm text-[#2b2b2b] bg-[#f1c40f] hover:bg-[#e6b800] active:scale-98 transition-all shadow-md cursor-pointer tracking-wide"
              >
                Kirim
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-4 pt-3 border-t border-white/10 max-h-96 overflow-y-auto no-scrollbar">
              {wishes.map((w, idx) => (
                <div key={idx} className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#f1c40f]">
                      {w.name}
                    </span>
                    <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#10b981] text-white">
                      <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-white/95 leading-relaxed font-sans">
                    {w.message}
                  </p>
                  <div className="flex items-center gap-3 pt-0.5 text-[11px] text-white/50 font-sans">
                    <span>{w.date}</span>
                    <button 
                      type="button" 
                      onClick={() => {
                        setWishText(`@${w.name} `);
                      }}
                      className="text-white/80 font-semibold hover:text-white hover:underline cursor-pointer"
                    >
                      Reply
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FOOTER: Closing                                                       */}
        {/* ========================================================================= */}
        <footer className="relative z-10 overflow-hidden flex flex-col justify-between min-h-screen py-10 sm:py-14 bg-[#ede4d8]">
          {/* Background Image: Clean Great Wall & Peacocks Backdrop (NO columns/waterfall!) */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/maroon-closing-bg.jpg" 
              alt="Vintage Closing Backdrop" 
              className="w-full h-full object-cover object-bottom"
            />
          </div>

          <div className="relative z-10 max-w-md mx-auto w-full px-6 flex flex-col items-center justify-center flex-1 space-y-5 my-auto">
            {/* Oval Arch Couple Photo */}
            <div className="w-40 sm:w-48 aspect-[3/4.2] rounded-[999px] overflow-hidden border-[2.5px] border-white/95 shadow-xl relative bg-[#f4efe8]">
              <img 
                src={couple?.cover_photo_url || gallery?.[0]?.image_url || '/photos/photo-1.jpg'} 
                alt="Couple closing" 
                className="w-full h-full object-cover object-center block"
              />
            </div>

            {/* Closing Message */}
            <p 
              className="text-xs sm:text-[13px] text-[#4a3032] font-serif leading-relaxed max-w-[310px] mx-auto text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu. Atas kehadiran dan doa restunya, kami mengucapkan terima kasih.
            </p>

            {/* Couple Signature */}
            <div className="space-y-1.5 text-center pt-1 pb-4">
              <p 
                className="text-xs sm:text-[13px] text-[#4a3032] font-serif italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Kami yang berbahagia,
              </p>
              <h3 
                className="text-3xl sm:text-4xl text-[#4a262b] font-normal tracking-wide"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {groomNick} &amp; {brideNick}
              </h3>
            </div>
          </div>

          {/* Powered by WD Group */}
          <div className="pt-2 pb-6 text-center relative z-20">
            <a
              href="https://www.instagram.com/wdgroupcompany"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[10px] font-sans tracking-[0.3em] text-[#59272d]/70 hover:text-[#59272d] transition-colors uppercase cursor-pointer"
            >
              Powered by WD Group
            </a>
          </div>
        </footer>

      </div>

      {/* ========================================================================= */}
      {/* GALLERY LIGHTBOX MODAL                                                    */}
      {/* ========================================================================= */}
      {activeLightboxIdx !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col items-center justify-center p-4 select-none animate-fade-in"
          onClick={() => setActiveLightboxIdx(null)}
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="w-full max-w-2xl flex items-center justify-between px-2 py-3 text-white z-20">
            <span 
              className="text-xs sm:text-sm tracking-widest text-[#d4af37] font-serif"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {activeLightboxIdx + 1} / {displayGallery.length}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx(null);
              }}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main Photo Container */}
          <div 
            className="relative max-w-lg w-full max-h-[78vh] flex items-center justify-center overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-[#d4af37]/30 bg-black/40"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={displayGallery[activeLightboxIdx].image_url} 
              alt={`Album Fullscreen ${activeLightboxIdx + 1}`}
              className="w-full h-auto max-h-[78vh] object-contain object-center rounded-2xl" 
            />

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx((prev) => (prev !== null && prev > 0 ? prev - 1 : displayGallery.length - 1));
              }}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-[#d4af37]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-5 h-5 text-[#f3da9f]" />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx((prev) => (prev !== null && prev < displayGallery.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 border border-[#d4af37]/50 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-5 h-5 text-[#f3da9f]" />
            </button>
          </div>

          {/* Bottom Caption Pill */}
          <div className="pt-3 text-center z-20">
            <p 
              className="text-xs text-[#d4af37]/80 tracking-widest font-serif uppercase"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              The Wedding of {groomNick} &amp; {brideNick}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
