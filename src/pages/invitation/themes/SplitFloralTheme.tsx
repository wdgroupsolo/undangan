import React, { useEffect, useState } from 'react';
import { Disc, Gift, Copy, Check, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';

// Gallery Slideshow Component with Continuous Auto-Slide & Touch/Mouse Swipe
const GallerySlideshow: React.FC<{ gallery: any[] }> = ({ gallery }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = React.useRef<number | null>(null);
  const touchEndX = React.useRef<number | null>(null);
  const isDragging = React.useRef(false);

  const defaultImages = [
    '/gallery-slide-1.jpg',
    '/gallery-slide-2.jpg',
    '/gallery-slide-3.jpg',
    '/bride-default.png',
    '/groom-default.png',
  ];

  const images = gallery?.length > 0 
    ? gallery.map((g: any) => g.image_url) 
    : defaultImages;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Continuous auto-slide every 3 seconds
  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex, images.length]);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Mouse Drag Handlers (Desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
    touchEndX.current = null;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (touchStartX.current === null || touchEndX.current === null) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div 
      className="relative w-full aspect-[4/4.4] sm:aspect-[4/4] overflow-hidden group select-none cursor-grab active:cursor-grabbing bg-[#3d3228]"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        isDragging.current = false;
      }}
    >
      {/* Sliding Track with smooth ease-out horizontal slide */}
      <div 
        className="flex w-full h-full transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((img: string, idx: number) => (
          <div key={idx} className="w-full h-full shrink-0 relative overflow-hidden bg-black/20">
            <img 
              src={img} 
              alt={`Gallery ${idx + 1}`} 
              className="w-full h-full object-cover select-none pointer-events-none" 
            />
            {/* Subtle Gradient Overlays for Cinematic Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Slide Indicators (Dots) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
        {images.map((_: string, idx: number) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === currentIndex 
                ? 'bg-white w-7 shadow-md' 
                : 'bg-white/50 hover:bg-white/80 w-2'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Countdown Timer Component
const CountdownTimer: React.FC<{ eventDate: string }> = ({ eventDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = eventDate ? new Date(eventDate) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const items = [
    { value: timeLeft.days, label: 'Hari' },
    { value: timeLeft.hours, label: 'Jam' },
    { value: timeLeft.minutes, label: 'Menit' },
    { value: timeLeft.seconds, label: 'Detik' },
  ];

  return (
    <div className="flex justify-center items-center gap-3 sm:gap-4 md:gap-5">
      {items.map((item, idx) => (
        <div 
          key={idx} 
          className="w-[68px] sm:w-[76px] h-[98px] sm:h-[108px] rounded-[18px] sm:rounded-[20px] bg-[#9e958c] flex flex-col items-center justify-center shadow-md select-none transition-transform duration-300 hover:scale-105"
        >
          <span 
            className="text-2xl sm:text-3xl font-normal text-white leading-none mb-1.5" 
            style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', Georgia, serif" }}
          >
            {String(item.value).padStart(2, '0')}
          </span>
          <span 
            className="text-xs sm:text-[13px] font-normal text-white tracking-wide" 
            style={{ fontFamily: "'Cinzel Decorative', 'Playfair Display', Georgia, serif" }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

interface SplitFloralThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const SplitFloralTheme: React.FC<SplitFloralThemeProps> = ({ invitation, couple, events, stories, gallery, gifts }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const guestName = searchParams.get('to') || 'Nama Tamu';

  // Helper to capitalize/format names properly (e.g. "bagas" -> "Bagas", "siti" -> "Siti")
  const formatName = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const groomNickname = formatName(couple?.groom_nickname || couple?.groom_name || couple?.groom_full_name) || 'Bagas';
  const brideNickname = formatName(couple?.bride_nickname || couple?.bride_name || couple?.bride_full_name) || 'Siti';
  const groomFullName = formatName(couple?.groom_full_name || couple?.groom_nickname || couple?.groom_name) || groomNickname;
  const brideFullName = formatName(couple?.bride_full_name || couple?.bride_nickname || couple?.bride_name) || brideNickname;
  const coupleNamesCombined = `${groomNickname} & ${brideNickname}`;
  const groomFather = formatName(couple?.groom_father_name) || 'Bapak Mempelai Pria';
  const groomMother = formatName(couple?.groom_mother_name) || 'Ibu Mempelai Pria';
  const brideFather = formatName(couple?.bride_father_name) || 'Bapak Mempelai Wanita';
  const brideMother = formatName(couple?.bride_mother_name) || 'Ibu Mempelai Wanita';
  const brandName = invitation?.settings?.powered_by || 'WD Group';
  const brandUrl = invitation?.settings?.powered_by_url || 'https://instagram.com/wdgroup';

  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [rsvpName, setRsvpName] = useState(guestName || '');
  const [rsvpStatus, setRsvpStatus] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpNote, setRsvpNote] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  const storageKey = `wedding_wishes_${invitation?.slug || invitation?.id || 'wdgroup'}`;

  const defaultWishes = [
    {
      name: `${brandName} & Team`,
      socialMedia: '@wdgroup',
      message: 'Congratulations on your special day! Wishing you everlasting happiness 😊',
      date: 'Baru saja',
    },
    {
      name: 'Dimas & Anisa',
      socialMedia: '@dimas_anisa',
      message: `Selamat menempuh hidup baru ${coupleNamesCombined}! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin.`,
      date: '1 jam yang lalu',
    },
  ];

  const [wishes, setWishes] = useState<Array<{ name: string; socialMedia?: string; message: string; date?: string }>>(() => {
    const saved = localStorage.getItem(storageKey) || localStorage.getItem('wedding_wishes_assa');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((item: any) => ({
            ...item,
            name: item.name ? item.name.replace(/Kedaigrafis/gi, 'WD Group') : item.name,
            socialMedia: item.socialMedia ? item.socialMedia.replace(/kedaigrafis/gi, 'wdgroup') : item.socialMedia,
            message: item.message ? item.message.replace(/Jessi (&|dan) Maudy/gi, coupleNamesCombined) : item.message,
          }));
        }
      } catch {}
    }
    return defaultWishes;
  });

  // Automatically synchronize wishes if couple data or branding changes
  useEffect(() => {
    setWishes(prev => {
      let changed = false;
      const updated = prev.map(item => {
        let name = item.name;
        let social = item.socialMedia;
        let message = item.message;
        if (name && name.includes('Kedaigrafis')) {
          name = name.replace(/Kedaigrafis/gi, brandName);
          changed = true;
        }
        if (social && social.includes('kedaigrafis')) {
          social = social.replace(/kedaigrafis/gi, 'wdgroup');
          changed = true;
        }
        if (message && (/Jessi (&|dan) Maudy/i.test(message) || message.includes('Mempelai Pria & Mempelai Wanita'))) {
          message = message.replace(/Jessi (&|dan) Maudy/gi, coupleNamesCombined).replace(/Mempelai Pria & Mempelai Wanita/gi, coupleNamesCombined);
          changed = true;
        }
        return { ...item, name, socialMedia: social, message };
      });
      if (changed) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {}
      }
      return updated;
    });
  }, [coupleNamesCombined, brandName, storageKey]);

  const [wishName, setWishName] = useState(guestName !== 'Nama Tamu' ? guestName : '');
  const [wishSocial, setWishSocial] = useState('');
  const [wishMessage, setWishMessage] = useState('');
  const [wishSuccess, setWishSuccess] = useState(false);

  // Load latest comments / wishes from Supabase if available
  useEffect(() => {
    if (invitation?.id) {
      supabase
        .from('comments')
        .select('*')
        .eq('invitation_id', invitation.id)
        .order('created_at', { ascending: false })
        .then(({ data, error }) => {
          if (!error && data && data.length > 0) {
            const mapped = data.map((c: any) => {
              let social = '@Guest';
              let msg = c.message || '';
              const socialMatch = c.message?.match(/^\[(@?[^\]]+)\]\s*(.*)$/);
              if (socialMatch) {
                social = socialMatch[1].startsWith('@') ? socialMatch[1] : `@${socialMatch[1]}`;
                msg = socialMatch[2];
              }
              return {
                name: c.name,
                socialMedia: social,
                message: msg,
                date: new Date(c.created_at).toLocaleDateString('id-ID', { hour: '2-digit', minute: '2-digit' }),
              };
            });
            setWishes(mapped);
          }
        });
    }
  }, [invitation?.id]);

  const handleAddWish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishMessage.trim()) return;

    const formattedSocial = wishSocial.trim() ? (wishSocial.startsWith('@') ? wishSocial.trim() : `@${wishSocial.trim()}`) : '@Guest';
    const newWish = {
      name: wishName.trim(),
      socialMedia: formattedSocial,
      message: wishMessage.trim(),
      date: 'Baru saja',
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem(storageKey, JSON.stringify(updated));
      localStorage.removeItem('wedding_wishes_assa');
    } catch {}

    // Persist to Supabase comments
    if (invitation?.id) {
      try {
        await supabase.from('comments').insert({
          invitation_id: invitation.id,
          name: wishName.trim(),
          message: `[${formattedSocial}] ${wishMessage.trim()}`,
          status: 'approved'
        });
      } catch (err) {
        console.error('Failed to save comment to db:', err);
      }
    }

    setWishMessage('');
    setWishSuccess(true);
    setTimeout(() => setWishSuccess(false), 3000);
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) return;

    if (invitation?.id) {
      try {
        await supabase.from('rsvps').insert({
          invitation_id: invitation.id,
          name: rsvpName.trim(),
          attendance: rsvpStatus === 'hadir' ? 'attending' : rsvpStatus === 'tidak_hadir' ? 'not_attending' : 'maybe',
          number_of_guests: parseInt(rsvpGuests, 10) || 1,
          message: rsvpNote.trim() || null,
        });
      } catch (err) {
        console.error('Error saving RSVP:', err);
      }
    }

    try {
      localStorage.setItem(`rsvp_${invitation?.id || 'assa'}`, JSON.stringify({
        name: rsvpName,
        status: rsvpStatus,
        guests: rsvpGuests,
        note: rsvpNote
      }));
    } catch {}

    setRsvpSubmitted(true);
  };

  const getEmbedUrl = (url?: string) => {
    if (!url) return "https://www.youtube.com/embed/5qap5aO4i9A";
    if (url.includes("embed/")) return url;
    const matchWatch = url.match(/[?&]v=([^&]+)/);
    if (matchWatch) return `https://www.youtube.com/embed/${matchWatch[1]}`;
    const matchShort = url.match(/youtu\.be\/([^?&]+)/);
    if (matchShort) return `https://www.youtube.com/embed/${matchShort[1]}`;
    return url;
  };

  const defaultGifts = [
    {
      provider: 'BCA',
      account_number: '1234567890',
      account_name: groomFullName
    },
    {
      provider: 'MANDIRI',
      account_number: '0987654321',
      account_name: brideFullName
    }
  ];

  const giftList = gifts && gifts.length > 0 ? gifts : defaultGifts;

  const defaultStories = [
    {
      year: 'Tahun 2016',
      title: 'Pertemuan Pertama',
      content: 'Kami pertama kali bertemu di bangku kuliah pada tahun 2016. Dari pertemanan sederhana, kami mulai saling mengenal lebih dekat dan merasa nyaman satu sama lain.',
      image_url: '/story-1.jpg',
    },
    {
      year: 'Tahun 2021',
      title: 'Menjalin Hubungan',
      content: 'Setelah melewati berbagai cerita dan waktu bersama, kami memantapkan hati untuk melangkah ke jenjang yang lebih serius dalam sebuah komitmen saling mendukung.',
      image_url: '/story-2.jpg',
    },
    {
      year: 'Tahun 2024',
      title: 'Menuju Pelaminan',
      content: 'Dengan penuh rasa syukur dan restu keluarga besar, kami siap mengikrarkan janji suci pernikahan untuk memulai babak baru perjalanan hidup kami berdua.',
      image_url: '/story-3.jpg',
    },
  ];

  const storyList = stories && stories.length > 0 ? stories : defaultStories;

  // Format event date in Indonesian uppercase (e.g. SENIN, 28 MARET 2028)
  const formatEventDate = (dateString?: string, customDate?: string) => {
    if (customDate) return customDate.toUpperCase();
    if (!dateString) return 'SENIN, 28 MARET 2028';
    if (/[a-zA-Z]/.test(dateString)) return dateString.toUpperCase();
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return dateString.toUpperCase();
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).toUpperCase();
    } catch {
      return dateString.toUpperCase();
    }
  };

  const displayEvents = events && events.length > 0 ? events : [
    {
      name: 'AKAD',
      event_date: '2028-03-28',
      formatted_date: 'SENIN, 28 MARET 2028',
      start_time: '13:00',
      end_time: '17:00',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      maps_url: 'https://maps.google.com'
    },
    {
      name: 'RESEPSI PERNIKAHAN 1',
      event_date: '2028-03-29',
      formatted_date: 'SELASA, 29 MARET 2028',
      start_time: '13:00',
      end_time: '17:00',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      maps_url: ''
    },
    {
      name: 'RESEPSI PERNIKAHAN 2',
      event_date: '2028-03-30',
      formatted_date: 'RABU, 30 MARET 2028',
      start_time: '13:00',
      end_time: '17:00',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      maps_url: 'https://maps.google.com'
    }
  ];

  // Realistic Bird Silhouette SVG (curved swallow wings, no cross/insect shape)
  const BirdSilhouette = ({ flapClass, size = 26 }: { flapClass: string; size?: number }) => (
    <div className={flapClass}>
      <svg 
        width={size} 
        height={Math.round(size * 0.46)} 
        viewBox="0 0 32 15" 
        fill="currentColor"
        className="text-[#3a291a] opacity-80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.15)]"
      >
        <path d="M 0 3 C 6 -1, 13 4, 16 7 C 19 4, 26 -1, 32 3 C 25 4, 19 8, 16 14 C 13 8, 7 4, 0 3 Z" />
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-sans text-gray-800 overflow-x-hidden bg-[#f4f0e6]">
      
      {/* LEFT SIDE - FIXED ON DESKTOP (Approx 60% width) */}
      <div className="w-full md:w-[60%] md:fixed md:top-0 md:left-0 h-screen relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={invitation.theme?.preview_image || gallery?.[0]?.image_url || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80'} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 text-white z-10">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4 text-gray-200">Undangan Pernikahan</p>
          
          {/* Couple Names - Highly stylized serif to match reference */}
          <h1 className="text-5xl md:text-[5rem] mb-2 drop-shadow-lg tracking-tight" style={{ fontFamily: '"Cinzel Decorative", serif' }}>
            <span className="uppercase" style={{ fontVariantLigatures: 'common-ligatures' }}>
              {groomNickname}
            </span> 
            <span className="text-4xl md:text-5xl mx-3 font-sans font-light">&amp;</span> 
            <span className="uppercase" style={{ fontVariantLigatures: 'common-ligatures' }}>
              {brideNickname}
            </span>
          </h1>
          
          <p className="font-serif italic text-2xl mb-8 opacity-90" style={{ fontFamily: 'Georgia, serif' }}>Selamat Datang</p>
          
          <p className="text-sm md:text-base leading-relaxed text-gray-200 max-w-md mb-12 opacity-90 font-light">
            Every Love Story Is Beautiful, But Ours Is The Best One. I Loved Her Since The First Time I Saw Her. My Mother Told Me To Pick The Very Best One, And I Did. True Love Stories Never Have Endings.
          </p>

          <div>
            <p className="text-sm mb-1 text-gray-300 font-semibold">Kepada Yth.</p>
            <p className="text-sm mb-4 text-gray-300 font-semibold">Bapak/Ibu/Saudara/i:</p>
            <p className="text-2xl font-serif font-bold drop-shadow-md">{guestName}</p>
          </div>
        </div>
        
        {/* Record/Disc Icon */}
        <div className="absolute bottom-8 left-8">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur flex items-center justify-center animate-spin border border-white/20" style={{ animationDuration: '4s' }}>
            <Disc className="text-white w-4 h-4" />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - SCROLLABLE VINTAGE THEME (Approx 40% width) */}
      <div className="w-full md:w-[40%] md:ml-[60%] min-h-screen relative z-0 bg-[#f4f0e6] shadow-2xl">
        
        {/* Global Background for Right Side - Fixed to viewport */}
        <div 
          className="fixed top-0 right-0 w-full md:w-[40%] h-screen z-0 bg-[#f4efdf] pointer-events-none" 
          style={{
            backgroundImage: `url('/bg-floral.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'top center',
            backgroundRepeat: 'no-repeat',
          }}
        />

        {/* Flying Birds Animation Layer - Focused in the upper sky & moon area */}
        <div className="fixed top-0 right-0 w-full md:w-[40%] h-screen pointer-events-none z-30 overflow-hidden">
          {/* Flock 1: 4 birds flying together across the moon */}
          <div className="absolute top-[17%] left-0 w-full animate-flock-1">
            <div className="relative">
              {/* Lead bird */}
              <div className="absolute top-0 left-0">
                <BirdSilhouette flapClass="animate-bird-flap-1" size={26} />
              </div>
              {/* Companion 1 - slightly lower & behind */}
              <div className="absolute top-4 -left-8">
                <BirdSilhouette flapClass="animate-bird-flap-2" size={21} />
              </div>
              {/* Companion 2 - slightly higher & behind */}
              <div className="absolute -top-3 -left-14">
                <BirdSilhouette flapClass="animate-bird-flap-3" size={18} />
              </div>
              {/* Companion 3 - trailing */}
              <div className="absolute top-2 -left-20">
                <BirdSilhouette flapClass="animate-bird-flap-4" size={15} />
              </div>
            </div>
          </div>

          {/* Flock 2: Distant pair of birds gliding back across the moon */}
          <div className="absolute top-[22%] left-0 w-full animate-flock-2">
            <div className="relative">
              <div className="absolute top-0 left-0">
                <BirdSilhouette flapClass="animate-bird-flap-2" size={17} />
              </div>
              <div className="absolute -top-2.5 left-7">
                <BirdSilhouette flapClass="animate-bird-flap-1" size={13} />
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section (Right Side) */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-4 md:p-8 z-10">
          <div className="relative z-30 text-center animate-fade-in-up flex flex-col justify-center items-center w-full max-w-sm mx-auto">
            <p className="text-xs md:text-sm tracking-[0.25em] mb-6 md:mb-8 text-[#4a3a2a] font-serif uppercase relative z-20 font-medium">
              Undangan Pernikahan
            </p>
            
            <div className="flex flex-col items-center justify-center space-y-1 relative z-20">
              <h1 
                className="text-5xl sm:text-6xl md:text-[4.6rem] text-[#3d2e1f] font-normal tracking-wide uppercase leading-tight" 
                style={{ fontFamily: '"Cinzel Decorative", serif' }}
              >
                {groomNickname.toUpperCase()}
              </h1>
              
              <div className="text-3xl md:text-4xl font-serif text-[#4a3a2a] my-2 italic font-light" style={{ fontFamily: 'Georgia, serif' }}>
                &amp;
              </div>
              
              <h1 
                className="text-5xl sm:text-6xl md:text-[4.6rem] text-[#3d2e1f] font-normal tracking-wide uppercase leading-tight" 
                style={{ fontFamily: '"Cinzel Decorative", serif' }}
              >
                {brideNickname.toUpperCase()}
              </h1>

              <p className="mt-4 text-xs md:text-sm tracking-[0.25em] text-[#4a3a2a] font-serif font-semibold">
                {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '. ') : '01. 09. 2028'}
              </p>
            </div>
          </div>
        </section>

        {/* Welcome / Guest Section */}
        <section className="py-20 px-6 relative z-10 bg-[#695a4a]">
          <div className="max-w-md mx-auto text-center text-[#f4f0e6]">
            <h2 
              className="text-4xl md:text-5xl mb-8 font-normal tracking-wide" 
              style={{ fontFamily: '"Cinzel Decorative", serif' }}
            >
              Guest
            </h2>
            <p className="text-sm md:text-base leading-relaxed font-light opacity-95">
              Tanpa mengurangi rasa hormat, kami memberikan kabar bahagia ini dan memohon restu dari rekan sekalian untuk senantiasa mendoakan kelancaran acara pernikahan kami.
            </p>
          </div>
        </section>

        {/* Quotes Section */}
        <section className="py-14 px-3 sm:px-4 relative z-10">
          <div className="max-w-[420px] w-full mx-auto bg-[#f1e9df] rounded-[24px] sm:rounded-[28px] shadow-[0_18px_40px_rgba(0,0,0,0.12)] overflow-hidden border-none">
            {/* Top Photo with taller aspect ratio matching reference */}
            <div className="w-full aspect-[4/3.5] sm:aspect-[4/3.3] relative overflow-hidden">
              <img 
                src={gallery?.[0]?.image_url || 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
                alt="Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Card Body */}
            <div className="pt-8 pb-10 px-6 sm:px-8 text-center flex flex-col items-center">
              {/* Quotes Signature Heading */}
              <div className="mb-6 flex justify-center items-center">
                <img 
                  src="/quotes-script-hd.png" 
                  alt="Quotes" 
                  className="h-10 sm:h-12 w-auto object-contain select-none" 
                />
              </div>

              {/* Quote Text */}
              <p 
                className="text-[14px] sm:text-[15px] text-[#7d6e61] leading-[1.8] font-light mb-8 max-w-[310px] mx-auto text-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {invitation?.settings?.quote || 'Every love story is beautiful, but ours is the best one. I loved her since the first time I saw her. My mother told me to pick the very best one, and I did. True love stories never have endings.'}
              </p>

              {/* Hashtag / Source */}
              <p 
                className="font-bold text-[#4a3628] text-lg sm:text-xl tracking-tight"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {invitation?.settings?.quote_source 
                  ? invitation.settings.quote_source 
                  : `#${couple?.groom_nickname || couple?.groom_full_name || 'Leon'}${couple?.bride_nickname || couple?.bride_full_name || 'Fiona'}Day`}
              </p>
            </div>
          </div>
        </section>

        {/* Profiles Section (Mempelai) */}
        <section className="relative z-10 bg-[#f5efe6] text-[#4a3828] py-20 overflow-hidden shadow-sm">
          <div className="text-center mb-16 relative z-10 px-4">
            <h2 
              className="text-4xl md:text-5xl font-normal tracking-[0.2em] uppercase" 
              style={{ 
                fontFamily: "'Cinzel Decorative', serif",
                color: '#4a3828',
              }}
            >
              Mempelai
            </h2>
          </div>

          <div className="space-y-20">
            {/* Groom */}
            <div className="relative text-center w-full">
              {/* Left Floral Accent - Hugs left screen edge, starts mid-arch down */}
              <img 
                src="/floral-edge-left.png" 
                alt="" 
                className="absolute left-0 top-14 w-28 sm:w-36 pointer-events-none z-20 select-none drop-shadow-[0_4px_10px_rgba(74,56,40,0.1)]" 
              />

              {/* Right Floral Accent - Hugs right screen edge, starts near bottom of arch */}
              <img 
                src="/floral-edge-right.png" 
                alt="" 
                className="absolute right-0 top-48 w-32 sm:w-40 pointer-events-none z-20 select-none drop-shadow-[0_4px_10px_rgba(74,56,40,0.1)]" 
              />

              {/* Arch Groom Photo */}
              <div className="w-[275px] sm:w-[285px] aspect-[4/5] bg-[#e6dfd3] rounded-t-[140px] rounded-b-none overflow-hidden mb-6 relative shadow-[0_12px_28px_rgba(74,56,40,0.16)] mx-auto z-10">
                <img 
                  src={couple?.groom_photo || '/groom-default.png' || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                  alt={groomFullName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              
              {/* Text Info */}
              <div className="relative z-30 pt-2 flex flex-col items-center px-4">
                <p 
                  className="text-4xl sm:text-[2.6rem] mb-2 drop-shadow-sm font-normal tracking-wide" 
                  style={{ fontFamily: "'Brittany Signature', 'Great Vibes', cursive", color: '#4a3828', lineHeight: '1.2' }}
                >
                  {groomNickname}
                </p>
                <h3 
                  className="text-2xl sm:text-[1.65rem] mb-3 font-light text-[#4a3828] tracking-[0.06em]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {groomFullName}
                </h3>
                <p 
                  className="text-xs sm:text-[13px] text-[#6d5b4b] font-normal leading-relaxed mb-4 max-w-[260px] mx-auto text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Anak Dari Bapak {groomFather} dan Ibu {groomMother}
                </p>
                <p 
                  className="text-xs font-semibold text-[#524032] cursor-pointer hover:text-black tracking-wider transition-colors text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Instagram &gt;&gt;&gt;
                </p>
              </div>
            </div>

            {/* Ampersand Separator */}
            <div className="text-center py-4">
              <span className="text-5xl md:text-6xl font-serif italic text-[#8c745d]" style={{ fontFamily: 'Georgia, serif' }}>&amp;</span>
            </div>

            {/* Bride */}
            <div className="relative text-center w-full pb-8">
              {/* Left Floral Accent - Hugs left screen edge, shoulder height down */}
              <img 
                src="/floral-edge-left.png" 
                alt="" 
                className="absolute left-0 top-14 w-28 sm:w-36 pointer-events-none z-20 select-none drop-shadow-[0_4px_10px_rgba(74,56,40,0.1)]" 
              />

              {/* Right Floral Accent - Hugs right screen edge, waist height cascading down */}
              <img 
                src="/floral-edge-right.png" 
                alt="" 
                className="absolute right-0 top-48 w-32 sm:w-40 pointer-events-none z-20 select-none drop-shadow-[0_4px_10px_rgba(74,56,40,0.1)]" 
              />

              {/* Arch Bride Photo */}
              <div className="w-[275px] sm:w-[285px] aspect-[4/5] bg-[#e6dfd3] rounded-t-[140px] rounded-b-none overflow-hidden mb-6 relative shadow-[0_12px_28px_rgba(74,56,40,0.16)] mx-auto z-10">
                <img 
                  src={couple?.bride_photo || '/bride-default.png' || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'} 
                  alt={brideFullName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
                />
              </div>
              
              {/* Text Info */}
              <div className="relative z-30 pt-2 flex flex-col items-center px-4">
                <p 
                  className="text-4xl sm:text-[2.6rem] mb-2 drop-shadow-sm font-normal tracking-wide" 
                  style={{ fontFamily: "'Brittany Signature', 'Great Vibes', cursive", color: '#4a3828', lineHeight: '1.2' }}
                >
                  {brideNickname}
                </p>
                <h3 
                  className="text-2xl sm:text-[1.65rem] mb-3 font-light text-[#4a3828] tracking-[0.06em]"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  {brideFullName}
                </h3>
                <p 
                  className="text-xs sm:text-[13px] text-[#6d5b4b] font-normal leading-relaxed mb-4 max-w-[270px] mx-auto text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Anak Dari Bapak {brideFather} dan Ibu {brideMother}
                </p>
                <p 
                  className="text-xs font-semibold text-[#524032] cursor-pointer hover:text-black tracking-wider transition-colors text-center"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  Instagram &gt;&gt;&gt;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Slideshow Section */}
        <section className="relative z-10 w-full overflow-hidden">
          <GallerySlideshow gallery={gallery} />
        </section>

        {/* Countdown Section */}
        <section className="py-20 px-4 relative z-10 bg-[#625445] text-white">
          <div className="text-center max-w-md mx-auto">
            <p 
              className="text-3xl sm:text-4xl md:text-[2.6rem] font-normal mb-8 sm:mb-10 text-white tracking-wide select-none" 
              style={{ fontFamily: "'Brittany Signature', 'Great Vibes', cursive", lineHeight: '1.2' }}
            >
              Tambahkan ke Kalender
            </p>
            <CountdownTimer eventDate={displayEvents[0]?.event_date} />
          </div>
        </section>

        {/* Events Section */}
        <section className="pt-2 pb-24 px-4 sm:px-6 relative z-10 bg-[#625445]">
          <div className="space-y-16 max-w-sm mx-auto">
            {displayEvents.map((event: any, idx: number) => (
              <div 
                key={idx} 
                className="relative w-full max-w-[340px] sm:max-w-[360px] mx-auto overflow-hidden bg-[#f4ede2] shadow-[0_20px_45px_rgba(0,0,0,0.28)] flex flex-col items-center justify-center text-center px-6 sm:px-8 py-16 select-none"
                style={{
                  borderRadius: '175px',
                  minHeight: '540px',
                }}
              >
                {/* Left Vintage Floral Accent - Constrained to outer edge with fade-out */}
                <img 
                  src="/floral-edge-left.png" 
                  alt="" 
                  className="absolute left-0 top-0 h-full w-[34%] max-w-[120px] object-cover object-left opacity-35 mix-blend-multiply pointer-events-none select-none z-0" 
                  style={{
                    maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* Right Vintage Floral Accent - Constrained to outer edge with fade-out */}
                <img 
                  src="/floral-edge-right.png" 
                  alt="" 
                  className="absolute right-0 top-0 h-full w-[34%] max-w-[120px] object-cover object-right opacity-35 mix-blend-multiply pointer-events-none select-none z-0" 
                  style={{
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 35%, rgba(0,0,0,0) 100%)',
                  }}
                />

                {/* Soft Cream Center Veil to keep center clear and text 100% legible */}
                <div 
                  className="absolute inset-0 z-[1] pointer-events-none" 
                  style={{
                    background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(244, 237, 226, 0.97) 0%, rgba(244, 237, 226, 0.88) 45%, rgba(244, 237, 226, 0) 80%)'
                  }}
                />

                {/* Event Details Content */}
                <div className="relative z-10 flex flex-col items-center justify-center text-center w-full px-2">
                  {/* Event Name */}
                  <h3 
                    className={`font-bold tracking-[0.14em] uppercase mb-3.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)] text-[#1f130b] leading-tight ${
                      (event.name || '').length > 12 
                        ? 'text-xl sm:text-[1.55rem] max-w-[280px]' 
                        : 'text-3xl sm:text-[2.3rem]'
                    }`}
                    style={{ 
                      fontFamily: "'Cinzel Decorative', serif",
                      fontVariantLigatures: 'common-ligatures'
                    }}
                  >
                    {event.name || 'AKAD'}
                  </h3>
                  
                  {/* Date */}
                  <p 
                    className="text-[13.5px] sm:text-[14.5px] font-bold text-[#1f130b] uppercase tracking-[0.16em] mb-1.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {formatEventDate(event.event_date, event.formatted_date)}
                  </p>
                  
                  {/* Time */}
                  <p 
                    className="text-xs sm:text-[13.5px] font-semibold text-[#2b1b10] tracking-wider mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.5)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {event.start_time || '13:00'} – {event.end_time || '17:00'} WIB
                  </p>

                  {/* Separator with Home Icon */}
                  <div className="flex items-center justify-center gap-3.5 mb-6 w-full max-w-[240px]">
                    <div className="flex-1 h-[2px] bg-[#2b1b10]" />
                    <div className="text-[#2b1b10] flex items-center justify-center shrink-0">
                      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3L2 12h3v8a1 1 0 0 0 1 1h4v-5a2 2 0 0 1 2-2 2 2 0 0 1 2 2v5h4a1 1 0 0 0 1-1v-8h3L12 3z"/>
                      </svg>
                    </div>
                    <div className="flex-1 h-[2px] bg-[#2b1b10]" />
                  </div>

                  {/* Location Name */}
                  <p 
                    className="text-base sm:text-[1.15rem] text-[#1f130b] font-bold tracking-wide mb-6 max-w-[250px] leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.6)]"
                    style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                  >
                    {event.location || 'Gedung Muhammadiyah Mataram'}
                  </p>
                  
                  {event.address && event.address !== event.location && (
                    <p className="text-xs text-[#3a281c] font-medium leading-relaxed -mt-4 mb-6 max-w-[220px]">
                      {event.address}
                    </p>
                  )}

                  {/* Location Button (rendered only if maps_url is provided) */}
                  {event.maps_url ? (
                    <a 
                      href={event.maps_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center justify-center gap-2 bg-[#3e2e22] text-white px-7 py-2.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase shadow-lg hover:bg-[#251b14] transition-all duration-300 active:scale-95"
                    >
                      <svg className="w-3.5 h-3.5 text-white shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                      </svg>
                      <span>Arahkan ke Lokasi</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Dresscode & Digital Envelope Section */}
        <section className="pt-2 pb-24 px-4 sm:px-6 relative z-10 bg-[#625445]">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto space-y-6 sm:space-y-8">
            
            {/* DRESSCODE CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 text-center shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-3.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                DRESSCODE
              </h3>
              <p 
                className="text-xs sm:text-[13px] text-[#6e5d50] font-normal leading-relaxed max-w-[270px] mx-auto mb-7"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {invitation?.settings?.dresscode_note || 'Mohon mengenakan pakaian yang senada dengan palet warna kami.'}
              </p>
              
              {/* 4 Palette Swatches */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                {(invitation?.settings?.dresscode_colors?.length === 4 
                  ? invitation.settings.dresscode_colors 
                  : ['#f3e8d2', '#87695e', '#41362e', '#dca15c']
                ).map((col: string, idx: number) => (
                  <div 
                    key={idx}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.15)] transition-transform duration-300 hover:scale-110 cursor-pointer" 
                    style={{ backgroundColor: col }}
                    title={col}
                  />
                ))}
              </div>
            </div>

            {/* KIRIM AMPLOP CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 text-center shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-3.5 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                KIRIM AMPLOP
              </h3>
              <p 
                className="text-xs sm:text-[13px] text-[#6e5d50] font-normal leading-relaxed max-w-[280px] mx-auto mb-6"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Jika berkenan memberikan hadiah, bisa dikirim melalui rekening berikut
              </p>

              {/* Amplop Digital Button */}
              <button 
                type="button"
                onClick={() => setShowGiftDetails(!showGiftDetails)}
                className="inline-flex items-center justify-center gap-2 bg-[#5c4e41] text-white px-7 py-2.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <Gift className="w-3.5 h-3.5 fill-white text-white shrink-0" />
                <span>Amplop Digital</span>
              </button>

              {/* Expandable Gift Accounts */}
              {showGiftDetails && (
                <div className="mt-6 pt-6 border-t border-[#e2d6c6] space-y-4 animate-in fade-in slide-in-from-top-3 duration-300">
                  {giftList.map((gift: any, gIdx: number) => (
                    <div key={gIdx} className="bg-[#ebdcc9]/60 rounded-2xl p-4 text-left border border-[#dfceba]">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#3e2e22]">
                          {gift.provider || 'Bank Transfer'}
                        </span>
                        <span className="text-[10px] text-[#736354] uppercase tracking-wide">
                          A.N {gift.account_name}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2 bg-white/70 px-3 py-2 rounded-xl">
                        <span className="font-mono text-sm tracking-wider font-semibold text-[#2c1d13]">
                          {gift.account_number}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(gift.account_number);
                            setCopiedIndex(gIdx);
                            setTimeout(() => setCopiedIndex(null), 2000);
                          }}
                          className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-[#5c4e41] text-white rounded-lg hover:bg-[#43372c] transition-colors cursor-pointer"
                        >
                          {copiedIndex === gIdx ? (
                            <>
                              <Check className="w-3 h-3 text-green-300" />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* LIVE STREAMING CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 text-center shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                LIVE STREAMING
              </h3>

              {/* 4 Streaming Pill Buttons */}
              <div className="flex flex-col gap-3 sm:gap-3.5">
                {/* YouTube */}
                <a
                  href={invitation?.settings?.youtube_url || "https://youtube.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#5c4e41] text-white py-3 px-6 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>LINK STREAMING YOUTUBE</span>
                </a>

                {/* Instagram */}
                <a
                  href={invitation?.settings?.instagram_live_url || "https://instagram.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#5c4e41] text-white py-3 px-6 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-none stroke-white stroke-2 shrink-0" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span>LINK STREAMING INSTAGRAM</span>
                </a>

                {/* TikTok */}
                <a
                  href={invitation?.settings?.tiktok_live_url || "https://tiktok.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#5c4e41] text-white py-3 px-6 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.27 6.27 0 0 0 1.89-4.49V8.4a8.28 8.28 0 0 0 4.88 1.6V6.69z"/>
                  </svg>
                  <span>LINK STREAMING TIKTOK</span>
                </a>

                {/* Zoom */}
                <a
                  href={invitation?.settings?.zoom_url || "https://zoom.us"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-[#5c4e41] text-white py-3 px-6 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
                >
                  <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M15 8v8H5a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h10zm2 1.8l4-2.4v9.2l-4-2.4V9.8z"/>
                  </svg>
                  <span>LINK STREAMING ZOOM</span>
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Gallery Section */}
        <section className="pt-4 pb-20 px-4 sm:px-6 relative z-10 bg-[#625445]">
          <div className="max-w-[360px] sm:max-w-[390px] mx-auto">
            {/* Gallery Heading */}
            <div className="text-center mb-6 select-none">
              <h2 
                className="text-3xl sm:text-[2.2rem] text-[#f4ede2] font-normal tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                GALLERY
              </h2>
            </div>

            {/* Embedded Video Player */}
            <div className="w-full aspect-video rounded-xl overflow-hidden shadow-[0_14px_35px_rgba(0,0,0,0.35)] mb-2.5 bg-black/40">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(invitation?.settings?.video_url)}
                title="Wedding Video Gallery"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Photo 1: Ceremony (Full Width) */}
            <div 
              className="w-full aspect-[2/1] overflow-hidden shadow-md mb-2 cursor-pointer group"
              onClick={() => setSelectedPhoto('/gallery-ceremony.jpg')}
            >
              <img 
                src="/gallery-ceremony.jpg" 
                alt="Akad & Resepsi Ceremony" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Photos 2 & 3: Hanbok Hill & Javanese Traditional (2 cols) */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div 
                className="w-full aspect-[4/4.5] overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-slide-2.jpg')}
              >
                <img 
                  src="/gallery-slide-2.jpg" 
                  alt="Outdoor Hanbok" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div 
                className="w-full aspect-[4/4.5] overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-slide-1.jpg')}
              >
                <img 
                  src="/gallery-slide-1.jpg" 
                  alt="Traditional Attire" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Photos 4 & 5: Beskap & Red Kebaya + Hanbok Portrait (2 cols) */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div 
                className="w-full aspect-[6/5] overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-grid-1.jpg')}
              >
                <img 
                  src="/gallery-grid-1.jpg" 
                  alt="Javanese Royal Attire" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div 
                className="w-full aspect-[6/5] overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-grid-2.jpg')}
              >
                <img 
                  src="/gallery-grid-2.jpg" 
                  alt="Hanbok Close-up" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Photos 6 & 7: Modern Ceremony Outdoors & Maudy Solo Bouquet (2 cols) */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div 
                className="w-full aspect-square overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-grid-3.jpg')}
              >
                <img 
                  src="/gallery-grid-3.jpg" 
                  alt="Outdoor Wedding Party" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
              <div 
                className="w-full aspect-square overflow-hidden shadow-md cursor-pointer group"
                onClick={() => setSelectedPhoto('/gallery-grid-4.jpg')}
              >
                <img 
                  src="/gallery-grid-4.jpg" 
                  alt="Bride Solo" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Photo 8: Jessi Solo Tuxedo (Full Width) */}
            <div 
              className="w-full aspect-[2/1] overflow-hidden shadow-md mb-2 cursor-pointer group"
              onClick={() => setSelectedPhoto('/gallery-grid-5.jpg')}
            >
              <img 
                src="/gallery-grid-5.jpg" 
                alt="Groom Solo" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>

            {/* Photo 9: Couple on Wicker Couch (Full Width) */}
            <div 
              className="w-full aspect-[2/1] overflow-hidden shadow-md cursor-pointer group"
              onClick={() => setSelectedPhoto('/gallery-grid-6.jpg')}
            >
              <img 
                src="/gallery-grid-6.jpg" 
                alt="Couple Romance" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </section>

        {/* Reservasi Tamu Section */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto">
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] pt-10 pb-9 px-6 sm:px-8 text-center shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-3xl sm:text-[2.25rem] mb-1 font-normal tracking-wide" 
                style={{ 
                  fontFamily: "'Brittany Signature', 'Great Vibes', cursive", 
                  color: '#8c6f4b', 
                  lineHeight: '1.2' 
                }}
              >
                Reservasi Tamu
              </h3>
              <p 
                className="text-xs sm:text-[13px] text-[#8c7b6d] font-normal tracking-wide mb-7"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Konfirmasi Kehadiran
              </p>

              {/* QR Code Container */}
              <div className="w-44 h-44 sm:w-48 sm:h-48 mx-auto mb-7 bg-white p-3.5 rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-[#e2d5c5] flex items-center justify-center">
                <img 
                  src={invitation?.settings?.reservation_qr || '/qr-code.png'} 
                  alt="QR Code Reservasi" 
                  className="w-full h-full object-contain"
                />
              </div>

              {/* KIRIM RSVP Button */}
              <button
                type="button"
                onClick={() => setShowRsvpModal(true)}
                className="inline-flex items-center justify-center bg-[#5c4e41] text-white py-2.5 px-8 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                KIRIM RSVP
              </button>
            </div>
          </div>
        </section>

        {/* Cerita Kami Section */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 relative z-10 bg-[#625445]">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto text-center">
            {/* Title */}
            <div className="mb-8 select-none">
              <h2 
                className="text-3xl sm:text-[2.2rem] text-[#f4ede2] font-normal tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                CERITA KAMI
              </h2>
            </div>

            {/* Story Milestones List */}
            <div className="space-y-14 sm:space-y-16">
              {storyList.map((story: any, idx: number) => (
                <div key={idx} className="flex flex-col items-center select-none">
                  {/* Photo */}
                  <div 
                    className="w-[260px] sm:w-[280px] aspect-[3/4] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.32)] mb-5 cursor-pointer group bg-black/20"
                    onClick={() => setSelectedPhoto(story.image_url || '/story-1.jpg')}
                  >
                    <img 
                      src={story.image_url || '/story-1.jpg'} 
                      alt={story.title || 'Story'} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  </div>

                  {/* Year */}
                  <h3 
                    className="text-2xl sm:text-[1.85rem] text-[#f4ede2] font-normal tracking-wide mb-3"
                    style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
                  >
                    {story.year || `Tahun ${2016 + idx * 3}`}
                  </h3>

                  {/* Divider Line */}
                  <div className="w-full max-w-[240px] h-[1px] bg-[#d9cfc1]/40 mb-4" />

                  {/* Milestone Title */}
                  <p 
                    className="text-sm sm:text-[15px] font-bold text-white tracking-wide mb-2.5 drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {story.title || 'Pertemuan Pertama'}
                  </p>

                  {/* Story Content */}
                  <p 
                    className="text-xs sm:text-[13px] text-[#ece4d9] font-normal leading-relaxed max-w-[310px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {story.content || story.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Turut Mengundang & Story Instagram Section */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto space-y-7 sm:space-y-8">
            
            {/* TURUT MENGUNDANG CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] py-10 px-6 sm:px-8 text-center shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                TURUT MENGUNDANG
              </h3>

              <div className="space-y-3 flex flex-col items-center">
                {(invitation?.settings?.turut_mengundang && invitation.settings.turut_mengundang.length > 0
                  ? invitation.settings.turut_mengundang
                  : ['Ir. H. Joko Widodo', "Prof. Dr. (H.C.) K. H. Ma'ruf Amin"]
                ).map((name: string, idx: number) => (
                  <p 
                    key={idx}
                    className="text-sm sm:text-[15px] text-[#4a3b2f] font-normal flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    <span className="text-[#5c4e41] font-bold">✓</span>
                    <span>{name}</span>
                  </p>
                ))}
              </div>
            </div>

            {/* STORY INSTAGRAM CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] py-10 px-6 sm:px-8 text-center shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                STORY · INSTAGRAM
              </h3>

              <p 
                className="text-xs sm:text-[13px] text-[#6e5d50] font-normal leading-relaxed max-w-[280px] mx-auto mb-7"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Bagikan momenmu melalui Story Instagram, lalu mention akun kami agar mudah kami repost.
              </p>

              <a
                href={invitation?.settings?.instagram_url || couple?.instagram || "https://instagram.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-[#5c4e41] text-white py-2.5 px-8 rounded-full text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer"
              >
                STORY INSTAGRAM
              </a>
            </div>

          </div>
        </section>

        {/* Adab Walimah & Informasi Tambahan Section */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto space-y-7 sm:space-y-8">

            {/* ADAB WALIMAH CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] pt-9 pb-10 px-5 sm:px-6 text-center shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                ADAB WALIMAH
              </h3>

              {/* White Inner Card with 6 Icons */}
              <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_6px_20px_rgba(0,0,0,0.06)] border border-[#e8dfd2]/80">
                <div className="grid grid-cols-3 gap-y-6 gap-x-2 sm:gap-x-3 text-center">
                  
                  {/* 1. Sholat */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 stroke-[#4a7862] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="3" width="14" height="18" rx="2" />
                        <path d="M7 8c1-2.5 3-3.5 5-3.5s4 1 5 3.5" />
                        <circle cx="12" cy="11.5" r="2.5" />
                        <path d="M12 10.5v1.2l.8.8" />
                        <path d="M5 18h14" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Memperhatikan waktu sholat
                    </p>
                  </div>

                  {/* 2. Makan & Minum */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 fill-[#4a7862]" viewBox="0 0 24 24">
                        <path d="M8 2a2.5 2.5 0 0 0-2.5 2.5c0 1.3 1.1 2.3 2.5 2.3v15.2h1.5V6.8c1.4 0 2.5-1 2.5-2.3A2.5 2.5 0 0 0 9.5 2H8zm8 0v4.5a1.2 1.2 0 0 1-1.2 1.2v14.3h1.5v-6.5h1.4v6.5h1.5V7.7a1.2 1.2 0 0 1-1.2-1.2V2h-2z" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Memperhatikan adab makan & minum
                    </p>
                  </div>

                  {/* 3. Doa Mempelai */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 stroke-[#4a7862] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 16c0-3 2-6 2-9a1.5 1.5 0 0 1 3 0v4" />
                        <path d="M17 16c0-3-2-6-2-9a1.5 1.5 0 0 0-3 0v4" />
                        <path d="M8.5 13c1 1.5 2 2 3.5 2s2.5-.5 3.5-2" />
                        <path d="M6 16c1.5 3 4 4 6 4s4.5-1 6-4" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Mendoakan Kedua Mempelai
                    </p>
                  </div>

                  {/* 4. Menjaga Jarak */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 fill-[#4a7862]" viewBox="0 0 24 24">
                        <circle cx="5" cy="5" r="2.2" />
                        <path d="M2.5 10c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v6.5H6V21H4v-4.5H2.5V10z" />
                        <circle cx="19" cy="5" r="2.2" />
                        <path d="M16.5 10c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2l1.2 7h-2.2V21h-2v-4h-2.2l1.2-7z" />
                        <path d="M8.5 15.5l1.5-1.5v1h4v-1l1.5 1.5-1.5 1.5v-1h-4v1l-1.5-1.5z" />
                        <path d="M10.5 10.5l1.5 1.5 3-3" fill="none" stroke="#4a7862" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Memperhatikan adab lawan jenis, dan menjaga jarak
                    </p>
                  </div>

                  {/* 5. Menutup Aurat */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 stroke-[#4a7862] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 3C8 3 6 5.5 6 10c0 4 2.5 8 3.5 11h5c1-3 3.5-7 3.5-11 0-4.5-2-7-6-7z" />
                        <path d="M9.5 9c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-1 3.5-2.5 3.5S9.5 11 9.5 9z" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Memakai pakaian yang sopan dan menutup aurat
                    </p>
                  </div>

                  {/* 6. Dilarang Foto */}
                  <div className="flex flex-col items-center text-center">
                    <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full border-2 border-[#4a7862] flex items-center justify-center mb-2 text-[#4a7862]">
                      <svg className="w-6 h-6 stroke-[#4a7862] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 15h10a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2l-1-1.5h-4L9 9H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1z" />
                        <circle cx="12" cy="12" r="2" />
                        <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.2" />
                      </svg>
                    </div>
                    <p 
                      className="text-[9.5px] sm:text-[10px] font-bold text-[#4a7862] leading-[1.25] max-w-[85px] mx-auto text-center"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      Dilarang mengambil foto tanpa izin
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* INFORMASI TAMBAHAN CARD */}
            <div className="bg-[#f4ede2] rounded-[28px] sm:rounded-[32px] py-9 px-6 sm:px-8 text-center shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-[#e8dfd2] select-none">
              <h3 
                className="text-2xl sm:text-[1.85rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase mb-4 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
                style={{ 
                  fontFamily: "'Cinzel Decorative', serif",
                  fontVariantLigatures: 'common-ligatures'
                }}
              >
                INFORMASI TAMBAHAN
              </h3>

              <p 
                className="text-xs sm:text-[13px] text-[#6e5d50] font-normal leading-relaxed max-w-[280px] mx-auto"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {invitation?.settings?.info_tambahan || 'Tamu yang hadir diharapkan memakai masker dan tidak membawa bayi'}
              </p>
            </div>

          </div>
        </section>

        {/* Ucapan & Doa Section */}
        <section className="py-14 sm:py-16 px-4 sm:px-6 relative z-10">
          <div className="max-w-[340px] sm:max-w-[370px] mx-auto">
            {/* Title */}
            <h2 
              className="text-3xl sm:text-[2.25rem] text-[#2c1d13] font-bold tracking-[0.14em] uppercase text-center mb-7 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]" 
              style={{ 
                fontFamily: "'Cinzel Decorative', serif",
                fontVariantLigatures: 'common-ligatures'
              }}
            >
              UCAPAN &amp; DOA
            </h2>

            {/* Form */}
            <form onSubmit={handleAddWish} className="space-y-4 mb-6 text-left">
              <div>
                <label className="block text-[13px] font-medium text-[#2c1d13] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Nama
                </label>
                <input
                  type="text"
                  required
                  value={wishName}
                  onChange={(e) => setWishName(e.target.value)}
                  placeholder="Nama Anda"
                  className="w-full bg-white text-[#2c1d13] px-3.5 py-2.5 rounded-lg border border-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c4e41]/30 transition-all text-xs sm:text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#2c1d13] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Sosial Media
                </label>
                <input
                  type="text"
                  value={wishSocial}
                  onChange={(e) => setWishSocial(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-white text-[#2c1d13] px-3.5 py-2.5 rounded-lg border border-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c4e41]/30 transition-all text-xs sm:text-[13px]"
                />
              </div>

              <div>
                <label className="block text-[13px] font-medium text-[#2c1d13] mb-1.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  Ucapan &amp; Doa
                </label>
                <textarea
                  required
                  rows={3}
                  value={wishMessage}
                  onChange={(e) => setWishMessage(e.target.value)}
                  placeholder="Tuliskan ucapan & doa restu..."
                  className="w-full bg-white text-[#2c1d13] px-3.5 py-2.5 rounded-lg border border-white/60 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#5c4e41]/30 transition-all text-xs sm:text-[13px] min-h-[90px] resize-none"
                />
              </div>

              {wishSuccess && (
                <p className="text-xs font-semibold text-emerald-800 bg-emerald-100/90 py-2 px-3 rounded-lg text-center animate-in fade-in">
                  ✓ Ucapan & doa Anda berhasil dikirim!
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#5c4e41] hover:bg-[#43372c] text-white py-3 px-4 rounded-lg font-bold text-xs tracking-wider uppercase shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                Kirimkan Ucapan
              </button>
            </form>

            {/* Wishes Feed */}
            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-0.5">
              {wishes.map((item, idx) => (
                <div key={idx} className="bg-white/95 rounded-lg p-3.5 shadow-sm border border-white/80 text-left transition-all hover:shadow-md">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs sm:text-[13px] text-[#2c1d13]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {item.name}
                    </span>
                    {item.socialMedia && (
                      <span className="text-[10.5px] text-[#7a6b5c] font-medium">
                        {item.socialMedia}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#5c4e41] leading-relaxed font-normal" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RSVP Modal Dialog */}
        {showRsvpModal && (
          <div 
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setShowRsvpModal(false)}
          >
            <div 
              className="bg-[#f4ede2] w-full max-w-[380px] rounded-[28px] p-6 sm:p-7 shadow-2xl border border-[#e8dfd2] relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setShowRsvpModal(false)}
                className="absolute top-4 right-4 text-[#8c7b6d] hover:text-[#2c1d13] p-1.5 rounded-full hover:bg-black/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {rsvpSubmitted ? (
                <div className="text-center py-8 space-y-4 animate-in fade-in">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <h3 
                    className="text-xl font-bold text-[#2c1d13] tracking-wide"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Terima Kasih!
                  </h3>
                  <p className="text-xs text-[#6e5d50] max-w-[260px] mx-auto leading-relaxed">
                    Konfirmasi kehadiran atas nama <span className="font-semibold text-[#2c1d13]">{rsvpName || guestName}</span> ({rsvpStatus === 'hadir' ? 'Hadir' : rsvpStatus === 'tidak_hadir' ? 'Tidak Hadir' : 'Masih Ragu'}) telah kami catat.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRsvpModal(false);
                      setRsvpSubmitted(false);
                    }}
                    className="mt-4 inline-flex items-center justify-center bg-[#5c4e41] text-white py-2 px-6 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#43372c] transition-colors cursor-pointer"
                  >
                    Tutup
                  </button>
                </div>
              ) : (
                <div>
                  <div className="text-center mb-5">
                    <h3 
                      className="text-xl sm:text-2xl font-bold text-[#2c1d13] uppercase tracking-[0.1em] mb-1"
                      style={{ 
                        fontFamily: "'Cinzel Decorative', serif",
                        fontVariantLigatures: 'common-ligatures'
                      }}
                    >
                      Reservasi Tamu
                    </h3>
                    <p className="text-xs text-[#7e6d60]">
                      Mohon konfirmasi kehadiran Anda di bawah ini
                    </p>
                  </div>

                  <form 
                    onSubmit={handleRsvpSubmit} 
                    className="space-y-4 text-left"
                  >
                    {/* Nama */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a3a2d] mb-1">
                        Nama Tamu
                      </label>
                      <input 
                        type="text" 
                        required
                        value={rsvpName}
                        onChange={(e) => setRsvpName(e.target.value)}
                        placeholder="Nama lengkap Anda"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-[#d8ccbe] text-sm text-[#2c1d13] focus:outline-none focus:ring-2 focus:ring-[#8c6f4b]/50 focus:bg-white transition-all"
                      />
                    </div>

                    {/* Status Kehadiran */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a3a2d] mb-1">
                        Konfirmasi Kehadiran
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'hadir', label: 'Hadir' },
                          { id: 'tidak_hadir', label: 'Tidak Hadir' },
                          { id: 'ragu', label: 'Ragu-ragu' }
                        ].map((opt) => (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => setRsvpStatus(opt.id as any)}
                            className={`py-2 px-1 text-center rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                              rsvpStatus === opt.id
                                ? 'bg-[#5c4e41] text-white border-[#5c4e41] shadow-sm'
                                : 'bg-white/60 text-[#5c4e41] border-[#d8ccbe] hover:bg-white'
                            }`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Jumlah Tamu */}
                    {rsvpStatus === 'hadir' && (
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a3a2d] mb-1">
                          Jumlah Tamu
                        </label>
                        <select 
                          value={rsvpGuests}
                          onChange={(e) => setRsvpGuests(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-white/80 border border-[#d8ccbe] text-sm text-[#2c1d13] focus:outline-none focus:ring-2 focus:ring-[#8c6f4b]/50 focus:bg-white transition-all cursor-pointer"
                        >
                          <option value="1">1 Orang</option>
                          <option value="2">2 Orang</option>
                          <option value="3">3 Orang</option>
                          <option value="4">4 Orang</option>
                        </select>
                      </div>
                    )}

                    {/* Pesan / Doa */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#4a3a2d] mb-1">
                        Pesan atau Ucapan (Opsional)
                      </label>
                      <textarea 
                        rows={2}
                        value={rsvpNote}
                        onChange={(e) => setRsvpNote(e.target.value)}
                        placeholder="Tuliskan ucapan selamat & doa restu..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white/80 border border-[#d8ccbe] text-xs text-[#2c1d13] focus:outline-none focus:ring-2 focus:ring-[#8c6f4b]/50 focus:bg-white transition-all resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-2.5 px-4 bg-[#5c4e41] text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#43372c] transition-all duration-300 active:scale-95 cursor-pointer mt-2"
                    >
                      Kirim Konfirmasi
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Fullscreen Lightbox Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-pointer select-none"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-5 right-5 text-white/80 hover:text-white bg-white/15 hover:bg-white/25 p-2 rounded-full transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Preview" 
              className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Closing & Footer Section */}
        <footer className="relative z-10 select-none mt-12">
          {/* Upper Cream Box */}
          <div className="bg-[#f4ede2] py-14 sm:py-16 px-6 sm:px-8 text-center border-t border-[#e8dfd2]">
            <p 
              className="text-xs sm:text-[13px] text-[#615244] font-normal leading-[1.8] max-w-[330px] mx-auto mb-7"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {invitation?.settings?.closing_greeting || "Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do'a restu kepada kedua mempelai."}
            </p>

            <p 
              className="text-xs sm:text-[13px] text-[#524335] font-semibold mb-2"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Hormat Kami Yang Mengundang
            </p>

            <h2 
              className="text-2xl sm:text-[1.75rem] font-bold text-[#3a2a1d] tracking-tight"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              {invitation?.settings?.closing_couple_name || `${groomNickname} dan ${brideNickname}`}
            </h2>
          </div>

          {/* Bottom Dark Mocha Bar */}
          <div className="bg-[#524538] py-6 px-4 text-center text-white">
            <p 
              className="text-xs sm:text-[12px] text-[#f4ede2]/90 font-normal tracking-wide"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Powered by {brandName}
            </p>

            <a
              href={brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2.5 text-white/80 hover:text-white transition-colors"
              aria-label={`Instagram ${brandName}`}
            >
              <svg 
                className="w-5 h-5 mx-auto" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};
