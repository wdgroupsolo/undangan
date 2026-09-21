import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, MapPin, Clock, Copy, Check, ExternalLink, 
  Send, ChevronLeft, ChevronRight, Gift, Disc, Music, CheckCircle2,
  X, MessageCircle, FileText, Video, Play, Navigation
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const VenueBuildingIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect x="5" y="3" width="14" height="18" rx="1" fill="#1A1617"/>
    <rect x="8" y="6" width="2.5" height="2.5" fill="#D8CBCF"/>
    <rect x="13.5" y="6" width="2.5" height="2.5" fill="#D8CBCF"/>
    <rect x="8" y="10.5" width="2.5" height="2.5" fill="#D8CBCF"/>
    <rect x="13.5" y="10.5" width="2.5" height="2.5" fill="#D8CBCF"/>
    <rect x="10" y="16" width="4" height="5" fill="#D8CBCF"/>
  </svg>
);

// Floating Botanical Rose Petals Animation Component
const FloatingPetals: React.FC = () => {
  const petals = [
    { left: '10%', delay: '0s', duration: '9s', size: 14, opacity: 0.7 },
    { left: '26%', delay: '3.2s', duration: '12s', size: 18, opacity: 0.8 },
    { left: '44%', delay: '1.5s', duration: '10.5s', size: 15, opacity: 0.65 },
    { left: '62%', delay: '5.5s', duration: '13s', size: 20, opacity: 0.75 },
    { left: '80%', delay: '2.8s', duration: '11s', size: 16, opacity: 0.7 },
    { left: '92%', delay: '7s', duration: '14s', size: 14, opacity: 0.6 },
    { left: '18%', delay: '8.5s', duration: '10s', size: 19, opacity: 0.8 },
    { left: '72%', delay: '9.8s', duration: '11.5s', size: 17, opacity: 0.75 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden select-none">
      {petals.map((petal, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: petal.left,
            top: '-25px',
            animation: `floatPetal ${petal.duration} linear infinite`,
            animationDelay: petal.delay,
            opacity: petal.opacity,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 30 40"
            fill="none"
            className="drop-shadow-xs"
          >
            <path
              d="M15 0 C25 8 30 22 24 33 C18 42 6 38 2 28 C-2 18 5 5 15 0 Z"
              fill="url(#petalGradient)"
            />
            <defs>
              <linearGradient id="petalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F8D4DC" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#EAA8B7" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#CE7E8F" stopOpacity="0.75" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
};

interface SecretGardenThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const SecretGardenTheme: React.FC<SecretGardenThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  music,
}) => {
  const toast = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const rightPanelRef = useRef<HTMLDivElement>(null);

  // Lock root viewport overflow on desktop so Opera GX / Chrome native window scrollbar cannot appear
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sec = searchParams.get('section');
    if (!sec) return;

    let targetId = '';
    if (sec === '1' || sec === 'hero') targetId = 'section-1';
    else if (sec === '2' || sec === 'quotes' || sec === 'quote') targetId = 'section-quotes';
    else if (sec === 'bride') targetId = 'section-bride';
    else if (sec === 'bride-bottom') targetId = 'section-bride-bottom';
    else if (sec === '3' || sec === 'mempelai') targetId = 'section-3';
    else if (sec === '4' || sec === 'story') targetId = 'section-story';
    else if (sec === 'story-bottom') targetId = 'section-story-bottom';
    else if (sec === '5' || sec === 'countdown') targetId = 'section-countdown';
    else if (sec === 'countdown-bottom') targetId = 'section-countdown';
    else if (sec === '6' || sec === 'event' || sec === 'events' || sec === 'akad') targetId = 'section-events';
    else if (sec === 'resepsi' || sec === 'resepsi-1') targetId = 'section-resepsi-1';
    else if (sec === 'resepsi-2') targetId = 'section-resepsi-2';
    else if (sec === '7' || sec === 'dresscode') targetId = 'section-dresscode';
    else if (sec === '8' || sec === 'adab' || sec === 'info') targetId = 'section-adab';
    else if (sec === '9' || sec === 'gallery') targetId = 'section-gallery';
    else if (sec === '10' || sec === 'amplop' || sec === 'gift') targetId = 'section-amplop';
    else if (sec === 'streaming') targetId = 'section-streaming';
    else if (sec === '11' || sec === 'rsvp') targetId = 'section-rsvp';
    else if (sec === 'story-ig') targetId = 'section-story-ig';
    else if (sec === '12' || sec === 'ucapan') targetId = 'section-ucapan';
    else if (sec === '13' || sec === 'closing') targetId = 'section-closing';

    if (targetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          if (rightPanelRef.current && window.innerWidth >= 1024) {
            const containerRect = rightPanelRef.current.getBoundingClientRect();
            const targetRect = el.getBoundingClientRect();
            const exactScrollTop = targetRect.top - containerRect.top + rightPanelRef.current.scrollTop;
            rightPanelRef.current.scrollTo({ top: exactScrollTop, behavior: 'instant' });
          } else {
            const y = el.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: y, behavior: 'instant' });
          }
        }
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const handleLeftWheel = (e: React.WheelEvent) => {
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTop += e.deltaY;
    }
  };

  // Format name helper
  const formatName = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  // Assets path
  const ASSETS = '/themes/secret-garden/assets';
  const bgBorder = `${ASSETS}/border.webp`;
  const bgMempelai = `${ASSETS}/mempelai.webp`;
  const bgBukit = `${ASSETS}/bukit.webp`;
  const bgArch = `${ASSETS}/arch.webp`;
  const bunga1 = `${ASSETS}/bunga-1.webp`;
  const bunga2 = `${ASSETS}/bunga-2.webp`;
  const bgTop = `${ASSETS}/top.webp`;
  const bgTwinFlower = `${ASSETS}/twin-flower.webp`;
  const bgDresscode = `${ASSETS}/dresscode.webp`;
  const bgBebek = `${ASSETS}/bebek.webp`;
  const bgStoryFlower = `${ASSETS}/story-flower.webp`;
  const bgBridge = `${ASSETS}/bridge.webp`;
  const bgLeftBorderClosing = `${ASSETS}/left-border-closing.webp`;
  const bgRightBorderClosing = `${ASSETS}/right-border-closing.webp`;
  const starOrnament = `${ASSETS}/star.webp`;

  const groomFullName = formatName(couple?.groom_full_name || couple?.groom_nickname || couple?.groom_name) || 'Jessi Choi';
  const rawGroomNick = couple?.groom_nickname?.trim();
  const rawGroomFull = couple?.groom_full_name?.trim();
  const groomNickname = (rawGroomNick && (!rawGroomFull || (rawGroomNick.toLowerCase() !== 'bagas' || rawGroomFull.toLowerCase() === 'bagas')))
    ? formatName(rawGroomNick)
    : (rawGroomFull ? formatName(rawGroomFull.split(/\s+/)[0]) : 'Jessi');

  const brideFullName = formatName(couple?.bride_full_name || couple?.bride_nickname || couple?.bride_name) || 'Maudy Ayunda';
  const rawBrideNick = couple?.bride_nickname?.trim();
  const rawBrideFull = couple?.bride_full_name?.trim();
  const brideNickname = (rawBrideNick && (!rawBrideFull || (rawBrideNick.toLowerCase() !== 'siti' || rawBrideFull.toLowerCase() === 'siti')))
    ? formatName(rawBrideNick)
    : (rawBrideFull ? formatName(rawBrideFull.split(/\s+/)[0]) : 'Maudy');

  const coupleNamesCombined = `${groomNickname} & ${brideNickname}`;
  const groomFather = formatName(couple?.groom_father_name) || 'Roni';
  const groomMother = formatName(couple?.groom_mother_name) || 'Ridha';
  const brideFather = formatName(couple?.bride_father_name) || 'Hendra';
  const brideMother = formatName(couple?.bride_mother_name) || 'Yaselin';

  const groomPhoto = couple?.groom_photo_url || ((couple as any)?.groom_photo && (couple as any).groom_photo.trim() !== '' ? (couple as any).groom_photo : '/groom-default.png');
  const bridePhoto = couple?.bride_photo_url || ((couple as any)?.bride_photo && (couple as any).bride_photo.trim() !== '' ? (couple as any).bride_photo : '/bride-default.png');
  const heroPhoto = 
    couple?.cover_photo_url ||
    invitation?.cover_image_url || 
    gallery?.[0]?.image_url || 
    '/cover-lunar-bg.jpg';

  // Countdown timer state & formatted dates matching reference photo
  const targetDateStr = events[0]?.event_date || '2028-09-27T09:00:00';
  const targetDate = new Date(targetDateStr);
  const dayNames = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthNames = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const dayName = isNaN(targetDate.getTime()) ? 'Minggu' : dayNames[targetDate.getDay()];
  const dateNum = isNaN(targetDate.getTime()) ? '27' : String(targetDate.getDate()).padStart(2, '0');
  const monthNum = isNaN(targetDate.getTime()) ? '09' : String(targetDate.getMonth() + 1).padStart(2, '0');
  const monthName = isNaN(targetDate.getTime()) ? 'September' : monthNames[targetDate.getMonth()];
  const yearNum = isNaN(targetDate.getTime()) ? '2028' : String(targetDate.getFullYear());

  const formattedDateLong = (events && events.length > 0 && events[0]?.event_date)
    ? `${dayName}, ${dateNum} ${monthName} ${yearNum}`
    : 'Minggu, 27 September 2028';
  const formattedDateDot = `${dateNum} . ${monthNum} . ${yearNum}`;

  // Helper function to format event dates matching reference photo
  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) {
      return {
        day: 'SENIN',
        date: '28',
        monthYear: 'MARET 2028',
      };
    }
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return {
        day: 'SENIN',
        date: '28',
        monthYear: 'MARET 2028',
      };
    }
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const months = ['JANUARI', 'FEBRUARI', 'MARET', 'APRIL', 'MEI', 'JUNI', 'JULI', 'AGUSTUS', 'SEPTEMBER', 'OKTOBER', 'NOVEMBER', 'DESEMBER'];
    return {
      day: days[d.getDay()],
      date: String(d.getDate()),
      monthYear: `${months[d.getMonth()]} ${d.getFullYear()}`,
    };
  };

  const defaultEventsList = [
    {
      name: 'AKAD',
      event_date: '2028-03-28',
      day_name: 'SENIN',
      date_num: '28',
      month_year: 'MARET 2028',
      time: '13:00 - 17:00 WIB',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      has_map: true,
      maps_url: 'https://maps.google.com/?q=Gedung+Muhammadiyah+Mataram'
    },
    {
      name: 'RESEPSI PERNIKAHAN 1',
      event_date: '2028-03-29',
      day_name: 'SELASA',
      date_num: '29',
      month_year: 'MARET 2028',
      time: '13:00 - 17:00 WIB',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      has_map: false,
      maps_url: ''
    },
    {
      name: 'RESEPSI PERNIKAHAN 2',
      event_date: '2028-03-30',
      day_name: 'RABU',
      date_num: '30',
      month_year: 'MARET 2028',
      time: '13:00 - 17:00 WIB',
      location: 'Gedung Muhammadiyah Mataram',
      address: '',
      has_map: true,
      maps_url: 'https://maps.google.com/?q=Gedung+Muhammadiyah+Mataram'
    }
  ];

  const displayEvents = (events && events.length > 0) ? events.map((e: any, index: number) => {
    const rawDate = e.event_date || (index === 0 ? '2028-03-28' : (index === 1 ? '2028-03-29' : '2028-03-30'));
    const parsed = formatEventDate(rawDate);
    const rawName = e.name || e.event_name || (index === 0 ? 'AKAD' : (index === 1 ? 'RESEPSI PERNIKAHAN 1' : `RESEPSI PERNIKAHAN ${index}`));
    const title = rawName.toUpperCase();

    const startTime = e.start_time ? e.start_time.slice(0, 5) : '13:00';
    const endTime = e.end_time ? e.end_time.slice(0, 5) : '17:00';
    const tz = e.timezone || 'WIB';

    const loc = e.location_name || e.location || 'Gedung Muhammadiyah Mataram';
    const hasMap = e.has_map !== undefined 
      ? Boolean(e.has_map) 
      : (index === 1 ? false : (Boolean(e.maps_url) && e.maps_url.trim() !== ''));

    return {
      name: title,
      day_name: parsed.day,
      date_num: parsed.date,
      month_year: parsed.monthYear,
      time: `${startTime} - ${endTime} ${tz}`,
      location: loc,
      has_map: hasMap,
      maps_url: e.maps_url || (hasMap ? `https://maps.google.com/?q=${encodeURIComponent(loc)}` : '')
    };
  }) : defaultEventsList;

  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const target = new Date(targetDateStr).getTime();
    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;
      if (difference <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((difference % (1000 * 60)) / 1000);
      setCountdown({
        days: d < 10 ? `0${d}` : `${d}`,
        hours: h < 10 ? `0${h}` : `${h}`,
        minutes: m < 10 ? `0${m}` : `${m}`,
        seconds: s < 10 ? `0${s}` : `${s}`,
      });
    };
    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [targetDateStr]);

  // Digital Envelope state
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(text);
    toast.success(`${label} berhasil disalin!`);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

  // Lightbox Preview
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // Photo Slide Animation (photos sliding vertically inside capsule frame)
  const [photoSlideIndex, setPhotoSlideIndex] = useState(0);
  const slidePhotos = [
    '/gallery-slide-1.jpg',
    '/gallery-slide-2.jpg',
    '/gallery-slide-3.jpg',
    '/gallery-ceremony.jpg',
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setPhotoSlideIndex((prev) => (prev + 1) % slidePhotos.length);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, [slidePhotos.length]);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpAttendance, setRsvpAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpWishes, setRsvpWishes] = useState('');
  const [rsvpSosmed, setRsvpSosmed] = useState('');
  const [isRsvpSubmitting, setIsRsvpSubmitting] = useState(false);
  const [rsvpSuccess, setRsvpSuccess] = useState(false);

  // Wishes List & Pagination
  const storageKey = `sg_wishes_${invitation?.slug || 'secret-garden'}`;
  const initialWishes = [
    {
      name: 'Dimas & Anisa',
      sosmed: '@dimas_anisa',
      message: `Selamat menempuh hidup baru ${coupleNamesCombined}! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin!`,
      date: 'Baru saja'
    },
    {
      name: 'Rian Pratama',
      sosmed: '@rian.pratama',
      message: 'Happy wedding brother! Wishing you both a lifetime of happiness, peace, and endless joy.',
      date: '1 jam yang lalu'
    },
    {
      name: 'WD Group Team',
      sosmed: '@wdgroupcompany',
      message: 'Selamat dan sukses atas pernikahannya. Semoga cinta kalian terus bersemi dan abadi selamanya.',
      date: '3 jam yang lalu'
    }
  ];

  const [wishes, setWishes] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : initialWishes;
    } catch {
      return initialWishes;
    }
  });

  const [commentPage, setCommentPage] = useState(1);
  const commentsPerPage = 4;
  const totalPages = Math.ceil(wishes.length / commentsPerPage) || 1;
  const paginatedComments = wishes.slice((commentPage - 1) * commentsPerPage, commentPage * commentsPerPage);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim() || !rsvpWishes.trim()) return;
    setIsRsvpSubmitting(true);

    setTimeout(() => {
      const newWish = {
        name: rsvpName.trim(),
        sosmed: rsvpSosmed.trim() ? (rsvpSosmed.startsWith('@') ? rsvpSosmed.trim() : `@${rsvpSosmed.trim()}`) : '@tamu_undangan',
        message: rsvpWishes.trim(),
        date: 'Baru saja'
      };
      const updated = [newWish, ...wishes];
      setWishes(updated);
      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch {}
      setRsvpWishes('');
      setIsRsvpSubmitting(false);
      setRsvpSuccess(true);
      toast.success('Ucapan dan doa restu berhasil dikirimkan!');
    }, 600);
  };

  // Google Calendar Link generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`The Wedding of ${coupleNamesCombined}`);
    const details = encodeURIComponent(`Undangan Pernikahan ${coupleNamesCombined}. Mohon doa restu atas pernikahan kami.`);
    const location = encodeURIComponent(events[0]?.location_name || 'Lokasi Resepsi');
    const startIso = new Date(targetDateStr).toISOString().replace(/-|:|\.\d{3}/g, '');
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${startIso}/${startIso}`;
  };

  // Helper for YouTube embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return 'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?controls=1';
    if (url.includes('embed/')) return url;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}?controls=1` : url;
  };

  // Default Bank Accounts
  const defaultBankAccounts = gifts?.length > 0 ? gifts : [
    {
      bank: 'BCA',
      no_rek: '8165092182',
      an: groomFullName,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg'
    },
    {
      bank: 'MANDIRI',
      no_rek: '1370018928172',
      an: brideFullName,
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg'
    }
  ];

  // Default Stories if none provided (Matching Split Floral Theme photos)
  const displayStories = stories?.length > 0 ? stories : [
    {
      judul: 'Pertemuan Pertama',
      tanggal: 'Tahun 2016',
      cerita: 'Kami pertama kali bertemu di bangku kuliah pada tahun 2016. Dari pertemanan sederhana, kami mulai saling mengenal lebih dekat dan merasa nyaman satu sama lain.',
      photo: '/gallery-slide-1.jpg'
    },
    {
      judul: 'Mulai Menjalin Hubungan',
      tanggal: 'Tahun 2017',
      cerita: 'Seiring berjalannya waktu, kebersamaan kami tumbuh menjadi komitmen. Tahun ini menjadi awal perjalanan kami sebagai pasangan.',
      photo: '/gallery-slide-2.jpg'
    },
    {
      judul: 'Hari Bahagia Kami',
      tanggal: 'Tahun 2023',
      cerita: 'InsyaAllah kami akan melangsungkan akad dan resepsi pernikahan. Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu.',
      photo: '/gallery-slide-3.jpg'
    }
  ];

  // Default Gallery photos matching Split Floral Theme
  const displayGallery = gallery?.length > 0 ? gallery : [
    { image_url: '/gallery-ceremony.jpg', caption: 'Akad Nikah' },
    { image_url: '/gallery-slide-2.jpg', caption: 'Kebersamaan' },
    { image_url: '/gallery-slide-1.jpg', caption: 'Prewedding Moments' },
    { image_url: '/gallery-slide-3.jpg', caption: 'Romantic Walk' },
    { image_url: '/gallery-grid-1.jpg', caption: 'Sweet Memories' },
    { image_url: '/gallery-grid-2.jpg', caption: 'Cherished Moments' },
    { image_url: '/gallery-grid-3.jpg', caption: 'Golden Hour' },
    { image_url: '/gallery-grid-5.jpg', caption: 'Happy Smiles' },
    { image_url: '/gallery-grid-6.jpg', caption: 'Love & Promise' },
  ];

  return (
    <div className="flex flex-col lg:flex-row h-auto lg:h-screen lg:overflow-hidden bg-[#E6DED8] text-[#2B2B2B] select-none font-sans relative no-scrollbar">
      
      {/* LEFT PANEL - FIXED ON DESKTOP & LAPTOP (58% width, stays permanently fixed while scrolling) */}
      <div 
        onWheel={handleLeftWheel}
        className="hidden lg:block lg:w-[58%] h-screen relative overflow-hidden bg-stone-900 select-none z-10 no-scrollbar shrink-0"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroPhoto} 
            alt="Hero Wedding" 
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle Vignette & Gradient Overlays - keeping couple bright, creating contrast for left text */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25 pointer-events-none" />
        </div>

        {/* Left Hero Content - Centered vertically on left side, matching reference photo */}
        <div className="absolute inset-0 flex flex-col justify-center items-start px-10 md:px-14 lg:px-16 xl:px-20 text-white z-20 select-none">
          <p 
            className="text-2xl lg:text-3xl font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] tracking-normal mb-1" 
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            Undangan Pernikahan
          </p>
          
          <h1 
            className="text-5xl lg:text-[4.75rem] xl:text-[5.4rem] my-1 drop-shadow-[0_3px_16px_rgba(0,0,0,0.95)] tracking-wide font-normal leading-[1.15]" 
            style={{ fontFamily: "'Great Vibes', 'Imperial Script', cursive", color: '#ffffff' }}
          >
            <span>{groomNickname}</span>
            <span className="mx-1">&amp;</span>
            <span>{brideNickname}</span>
          </h1>
          
          <p 
            className="text-lg lg:text-2xl font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] tracking-normal mt-1" 
            style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
          >
            {formattedDateLong}
          </p>

          {guestName && guestName !== 'Tamu Undangan' && (
            <div className="mt-8 bg-black/45 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3 shadow-xl max-w-sm">
              <p className="text-xs text-stone-300 font-medium tracking-wider uppercase font-sans">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
              <p className="text-lg font-bold text-white font-sans mt-0.5">{guestName}</p>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PANEL (Mobile: 100%, Desktop: 42%): Independent smooth scrolling panel without browser scrollbar */}
      <div 
        ref={rightPanelRef}
        className="w-full lg:w-[42%] bg-[#E6DED8] relative min-h-screen lg:h-screen lg:overflow-y-auto lg:overflow-x-hidden z-0 shadow-2xl no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        
        {/* Ambient Falling Flower Petals */}
        <FloatingPetals />

        {/* SECTION 1: Inner Cover / Botanical Garden Arch Gateway */}
          <section className="relative w-full flex flex-col items-center justify-start text-center overflow-hidden" style={{ minHeight: '100svh' }}>
            {/* Single Composite Background Image - covers the entire section */}
            <div className="absolute inset-0 z-0">
              <img 
                src={`${ASSETS}/inner-cover.jpg`}
                alt="Secret Garden Inner Cover" 
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Couple Info - In an elegant frosted glass cartouche so text is 100% crisp and readable against botanical background */}
            <div className="relative z-10 flex flex-col items-center justify-center pt-[18vh] sm:pt-[20vh] md:pt-[22vh] px-4 max-w-md mx-auto text-center select-none">
              <div className="backdrop-blur-md bg-white/75 border border-white/80 shadow-[0_12px_40px_rgba(60,30,40,0.15)] rounded-[2rem] px-6 sm:px-8 py-5 sm:py-6 w-full max-w-[320px] sm:max-w-sm flex flex-col items-center">
                <p 
                  className="text-xs sm:text-sm uppercase tracking-[0.26em] font-semibold mb-2 sm:mb-3 text-[#3d2028] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', 'Cinzel', serif" }}
                >
                  UNDANGAN PERNIKAHAN
                </p>

                <div className="flex flex-col items-center justify-center my-0.5 sm:my-1">
                  <h1 
                    className="text-5xl sm:text-[3.8rem] md:text-[4.2rem] font-normal tracking-wide leading-[1.05]"
                    style={{ 
                      fontFamily: "'Great Vibes', cursive", 
                      color: '#5e2332',
                      textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.7)'
                    }}
                  >
                    {groomNickname}
                  </h1>
                  <span 
                    className="text-2xl sm:text-3xl my-0.5 leading-none font-serif italic text-[#3d2028] font-medium"
                    style={{ 
                      fontFamily: "'Playfair Display', 'Lora', serif",
                      textShadow: '0 1px 2px rgba(255,255,255,0.9)'
                    }}
                  >
                    &amp;
                  </span>
                  <h1 
                    className="text-5xl sm:text-[3.8rem] md:text-[4.2rem] font-normal tracking-wide leading-[1.05]"
                    style={{ 
                      fontFamily: "'Great Vibes', cursive", 
                      color: '#5e2332',
                      textShadow: '0 1px 2px rgba(255,255,255,0.9), 0 0 12px rgba(255,255,255,0.7)'
                    }}
                  >
                    {brideNickname}
                  </h1>
                </div>

                <div className="w-16 h-[1px] bg-[#5e2332]/25 my-2.5 sm:my-3" />

                <p 
                  className="text-xs sm:text-sm font-semibold tracking-[0.38em] uppercase text-[#3d2028] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                >
                  {formattedDateDot}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION BORDER 1 */}
          <div className="relative w-full z-20 pointer-events-none border-t border-b border-[#82515E] bg-[#E3D6D0] leading-none py-1 shadow-sm">
            <img src={bgBorder} alt="Lace Border" className="w-full h-auto object-contain max-h-12 block mx-auto" />
          </div>

          {/* SECTION 2: Selamat Datang & Photo Slider & Quotes (Matching Reference Photos) */}
          <section id="section-2" className="relative w-full pt-12 pb-16 px-4 overflow-hidden text-center bg-[#F4ECE7]">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-60"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              {/* Selamat Datang Header */}
              <h2 
                className="text-3xl sm:text-4xl md:text-[2.6rem] mb-3 select-none"
                style={{ fontFamily: "'Great Vibes', cursive", color: '#85525E' }}
              >
                Selamat Datang
              </h2>

              {/* Welcoming Paragraph */}
              <p 
                className="text-xs sm:text-[13px] font-normal text-[#2C2226] leading-[1.8] mb-6 max-w-[340px] mx-auto px-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Tanpa mengurangi rasa hormat, kami memberikan kabar bahagia ini dan memohon restu dari rekan sekalian untuk senantiasa mendoakan kelancaran acara pernikahan kami.
              </p>

              {/* Arched Capsule Photo Frame with Flanking Floral Branches (Matching Photo 1 & 2) */}
              <div className="relative my-6 inline-block max-w-full">
                
                {/* 1. LEFT FLORAL BRANCH (BEHIND PHOTO) */}
                <div 
                  className="absolute -left-14 sm:-left-20 bottom-[-15px] sm:bottom-[-20px] z-0 pointer-events-none animate-flower-bottom-left"
                >
                  <img 
                    src={bunga2} 
                    alt="Bunga Bush Background" 
                    className="absolute -left-6 -top-8 w-36 sm:w-40 h-auto opacity-75 pointer-events-none select-none" 
                  />
                  <img 
                    src={bunga1} 
                    alt="Bunga Kiri Bawah" 
                    className="relative w-48 sm:w-56 h-auto drop-shadow-md select-none pointer-events-none" 
                  />
                </div>

                {/* 2. RIGHT FLORAL BRANCH (BEHIND PHOTO) */}
                <div 
                  className="absolute -right-14 sm:-right-20 top-6 sm:top-10 z-0 pointer-events-none animate-flower-top-right"
                >
                  <img 
                    src={bunga2} 
                    alt="Bunga Bush Background" 
                    className="absolute -right-6 -top-6 w-36 sm:w-40 h-auto opacity-75 -scale-x-100 pointer-events-none select-none" 
                  />
                  <img 
                    src={bunga1} 
                    alt="Bunga Kanan Atas" 
                    className="relative w-48 sm:w-56 h-auto -scale-x-100 drop-shadow-md select-none pointer-events-none" 
                  />
                </div>

                {/* 3. ARCHED CAPSULE PHOTO FRAME (Pill Shape with straight vertical sides) */}
                <div 
                  className="relative z-10 w-[260px] sm:w-[280px] h-[410px] sm:h-[440px] overflow-hidden shadow-2xl bg-stone-200 mx-auto"
                  style={{ 
                    borderRadius: '140px',
                    border: '5px solid #D6C8BC',
                    boxShadow: '0 16px 44px rgba(119, 75, 83, 0.2)'
                  }}
                >
                  {/* Photo Stack - slides vertically */}
                  <div 
                    className="absolute inset-0 flex flex-col transition-transform duration-[1200ms] ease-in-out"
                    style={{ transform: `translateY(-${photoSlideIndex * 100}%)` }}
                  >
                    {slidePhotos.map((photo, idx) => (
                      <img 
                        key={idx}
                        src={photo} 
                        alt={`Couple Photo ${idx + 1}`} 
                        className="w-full flex-shrink-0 object-cover object-center"
                        style={{ height: '100%', minHeight: '100%' }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Quotes Section (Matching Photo 2) */}
              <div id="section-quotes" className="mt-10 px-3 relative z-10">
                <h3 
                  className="text-3xl sm:text-4xl md:text-[2.6rem] mb-3 select-none"
                  style={{ fontFamily: "'Great Vibes', cursive", color: '#85525E' }}
                >
                  Quotes
                </h3>
                <p 
                  className="text-xs sm:text-[13px] font-normal text-[#2C2226] leading-[1.8] max-w-[340px] mx-auto px-4"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Every love story is beautiful, but ours is the best one. I loved her since the first time I saw her. My mother told me to pick the very best one, and I did. True love stories never have endings.
                </p>
                <p 
                  className="text-sm sm:text-base font-bold text-[#1A1617] mt-6 tracking-normal select-none"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  #LeonFionaDay
                </p>
              </div>
            </div>

            {/* Bottom Hill Illustration (Matching Photo 2) */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-75">
              <img src={bgBukit} alt="Bukit Ornament" className="w-full h-auto object-cover object-bottom block" />
            </div>
          </section>

          {/* SECTION 3: Profil Mempelai (The Couple - Matching Reference Photos) */}
          <section id="section-3" className="relative w-full pt-16 pb-36 sm:pb-44 md:pb-48 px-6 overflow-hidden bg-[#F4ECE7]">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-60"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto text-center space-y-16 sm:space-y-20">
              
              <h2 
                className="text-3xl sm:text-4xl md:text-[2.6rem] capitalize mb-8 select-none tracking-wide"
                style={{ fontFamily: "'Playfair Display', 'Lora', serif", fontStyle: 'italic', color: '#85525E' }}
              >
                Mempelai
              </h2>

              {/* Groom Card (Jessi Choi) */}
              <div className="flex flex-col items-center">
                {/* Groom Photo with Floral & Star Sparkles */}
                <div className="relative my-4 inline-block">
                  
                  {/* Left Floral Sway (Lush Pink Bush + Detailed Rose Branch on Left - BEHIND PHOTO) */}
                  <div 
                    className="absolute -left-14 sm:-left-18 top-4 sm:top-6 z-0 pointer-events-none animate-flower-bottom-left"
                  >
                    {/* Back layer: Pink Bush foliage */}
                    <img 
                      src={bunga2} 
                      alt="Foliage Background" 
                      className="absolute -left-6 -top-6 w-36 sm:w-44 h-auto opacity-75 pointer-events-none select-none" 
                    />
                    {/* Front layer: Primary botanical pink flower branch */}
                    <img 
                      src={bunga1} 
                      alt="Bunga Kiri" 
                      className="relative w-48 sm:w-56 h-auto drop-shadow-sm select-none pointer-events-none" 
                    />
                  </div>

                  {/* Oval Photo Frame with Concentric Double Ring */}
                  <div 
                    className="relative z-10 w-[240px] sm:w-[260px] h-[350px] sm:h-[380px] rounded-[50%] p-1.5 shadow-xl mx-auto"
                    style={{ 
                      border: '1.5px solid #9D6470',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[50%] p-1"
                      style={{ border: '1.5px solid #9D6470' }}
                    >
                      <div className="w-full h-full rounded-[50%] overflow-hidden bg-stone-200">
                        <img 
                          src={groomPhoto} 
                          alt={groomFullName} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Star Sparkles across the bottom curve of the oval */}
                  <div 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-72 z-30 pointer-events-none select-none"
                  >
                    <img 
                      src={starOrnament} 
                      alt="Star Sparkles" 
                      className="w-full h-auto drop-shadow animate-star-twinkle"
                    />
                  </div>
                </div>

                <h3 
                  className="text-4xl sm:text-5xl mt-3 mb-0.5 capitalize select-none"
                  style={{ fontFamily: "'Imperial Script', 'Great Vibes', cursive", color: '#85525E' }}
                >
                  {groomNickname}
                </h3>
                <h4 
                  className="text-base sm:text-lg font-bold text-[#1C1917] tracking-wide mb-2"
                  style={{ fontFamily: "'Lora', 'Playfair Display', serif" }}
                >
                  {groomFullName}
                </h4>
                <p 
                  className="text-xs sm:text-[13px] text-[#2D2327] max-w-[270px] sm:max-w-[290px] mx-auto leading-relaxed font-normal"
                  style={{ fontFamily: "'Lora', 'Playfair Display', serif" }}
                >
                  {couple?.groom_bio || `Anak Pertama Dari Bapak ${groomFather.replace(/^Bpk\.?\s*/i, '').replace(/^Bapak\s*/i, '')} dan Ibu ${groomMother.replace(/^Ibu\s*/i, '')}`}
                </p>

                {/* Groom Circular Instagram Button */}
                <a 
                  href={`https://instagram.com/${(couple?.groom_instagram || 'jessichoi').replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all duration-300 select-none cursor-pointer"
                  style={{ backgroundColor: '#82515E' }}
                  title="Instagram Jessi Choi"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>

              {/* Bride Card (Maudy Ayunda) */}
              <div id="section-bride" className="flex flex-col items-center relative z-10">
                {/* Bride Photo with Floral & Star Sparkles */}
                <div className="relative my-4 inline-block">
                  
                  {/* Right Floral Sway (Lush Pink Bush + Detailed Rose Branch on Right - BEHIND PHOTO) */}
                  <div 
                    className="absolute -right-14 sm:-right-18 top-4 sm:top-6 z-0 pointer-events-none animate-flower-top-right"
                  >
                    {/* Back layer: Pink Bush foliage */}
                    <img 
                      src={bunga2} 
                      alt="Foliage Background" 
                      className="absolute -right-6 -top-6 w-36 sm:w-44 h-auto opacity-75 -scale-x-100 pointer-events-none select-none" 
                    />
                    {/* Front layer: Primary botanical pink flower branch (flipped horizontally) */}
                    <img 
                      src={bunga1} 
                      alt="Bunga Kanan" 
                      className="relative w-48 sm:w-56 h-auto -scale-x-100 drop-shadow-sm select-none pointer-events-none" 
                    />
                  </div>

                  {/* Oval Photo Frame with Concentric Double Ring */}
                  <div 
                    className="relative z-10 w-[240px] sm:w-[260px] h-[350px] sm:h-[380px] rounded-[50%] p-1.5 shadow-xl mx-auto"
                    style={{ 
                      border: '1.5px solid #9D6470',
                    }}
                  >
                    <div 
                      className="w-full h-full rounded-[50%] p-1"
                      style={{ border: '1.5px solid #9D6470' }}
                    >
                      <div className="w-full h-full rounded-[50%] overflow-hidden bg-stone-200">
                        <img 
                          src={bridePhoto} 
                          alt={brideFullName} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Star Sparkles across the bottom curve of the oval */}
                  <div 
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-64 sm:w-72 z-30 pointer-events-none select-none"
                  >
                    <img 
                      src={starOrnament} 
                      alt="Star Sparkles" 
                      className="w-full h-auto drop-shadow animate-star-twinkle"
                    />
                  </div>
                </div>

                <h3 
                  className="text-4xl sm:text-5xl mt-3 mb-0.5 capitalize select-none"
                  style={{ fontFamily: "'Imperial Script', 'Great Vibes', cursive", color: '#85525E' }}
                >
                  {brideNickname}
                </h3>
                <h4 
                  className="text-base sm:text-lg font-bold text-[#1C1917] tracking-wide mb-2"
                  style={{ fontFamily: "'Lora', 'Playfair Display', serif" }}
                >
                  {brideFullName}
                </h4>
                <p 
                  className="text-xs sm:text-[13px] text-[#2D2327] max-w-[270px] sm:max-w-[290px] mx-auto leading-relaxed font-normal"
                  style={{ fontFamily: "'Lora', 'Playfair Display', serif" }}
                >
                  {couple?.bride_bio || `Anak Ketiga Dari Bapak ${brideFather.replace(/^Bpk\.?\s*/i, '').replace(/^Bapak\s*/i, '')} dan Ibu ${brideMother.replace(/^Ibu\s*/i, '')}`}
                </p>

                {/* Bride Circular Instagram Button */}
                <a 
                  id="section-bride-bottom"
                  href={`https://instagram.com/${(couple?.bride_instagram || 'maudyayunda').replace('@', '')}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-5 w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all duration-300 select-none cursor-pointer relative z-10"
                  style={{ backgroundColor: '#82515E' }}
                  title="Instagram Maudy Ayunda"
                >
                  <InstagramIcon size={18} />
                </a>
              </div>

            </div>

            {/* Bottom Hill Illustration (Matching Reference Photo) */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-90 overflow-hidden">
              <img 
                src={bgBukit} 
                alt="Bukit Ornament" 
                className="w-full min-h-[480px] sm:min-h-[560px] md:min-h-[620px] object-cover object-bottom block select-none" 
              />
            </div>
          </section>

          {/* SECTION 4: Cerita Kami (Our Love Story - Matching Reference Photos) */}
          <section id="section-story" className="relative w-full pt-14 sm:pt-16 pb-0 overflow-hidden bg-[#8D5E6A] text-white">
            <div className="relative z-20 max-w-md mx-auto text-center px-4 sm:px-6">
              <h2 
                className="text-4xl sm:text-5xl md:text-[3.2rem] mb-7 sm:mb-8 capitalize select-none tracking-wide"
                style={{ fontFamily: "'Great Vibes', cursive", color: '#ffffff' }}
              >
                Cerita Kami
              </h2>

              <div className="flex flex-col gap-9 sm:gap-11 items-center">
                {displayStories.map((story: any, index: number) => (
                  <div 
                    key={index}
                    id={index === displayStories.length - 1 ? "section-story-bottom" : undefined}
                    className="w-full max-w-[340px] sm:max-w-[360px] p-5 sm:p-6 pb-6 sm:pb-7 text-center flex flex-col items-center shadow-xl rounded-[32px] text-stone-900 bg-[#EAE2DA] transition-all duration-300 hover:scale-[1.01]"
                  >
                    {story.photo && (
                      <div className="w-full aspect-[4/3] rounded-[22px] overflow-hidden mb-4 shadow-sm bg-stone-200">
                        <img 
                          src={story.photo} 
                          alt={story.judul} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <h3 
                      className="text-lg sm:text-xl font-normal tracking-normal mb-1"
                      style={{ fontFamily: "'Lora', 'Playfair Display', serif", color: '#A06E7B' }}
                    >
                      {story.judul}
                    </h3>
                    {story.tanggal && (
                      <p 
                        className="text-xs sm:text-[13px] text-[#2C2125] font-normal mb-3 sm:mb-3.5 tracking-normal"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {story.tanggal}
                      </p>
                    )}
                    <p 
                      className="text-xs sm:text-[13.5px] text-[#2C2125] leading-[1.8] px-2 sm:px-3 font-normal text-center"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {story.cerita}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Flower Ornament - stretches edge-to-edge flush with bottom to rest on arch */}
            <div className="w-full mt-8 sm:mt-10 pointer-events-none leading-none relative z-10 -mb-1 overflow-hidden">
              <img 
                src={bgStoryFlower} 
                alt="Cerita Kami Flower Ornament" 
                className="w-[110%] -ml-[5%] sm:w-[116%] sm:-ml-[8%] h-auto block select-none pointer-events-none max-w-none" 
              />
            </div>
          </section>

          {/* SECTION 5: Countdown Timer & Save The Date (Stone Arch with Integrated Countdown - Matching Reference Photo) */}
          <section id="section-countdown" className="relative w-full overflow-hidden bg-[#E3D8D2] z-0">
            <div className="relative w-full overflow-hidden -mb-[1px]">
              {/* Stone Arch Archway Image - Scaled edge-to-edge so columns touch boundaries and top cornice is cropped */}
              <img 
                src={bgArch} 
                alt="Stone Arch" 
                className="w-[138%] -ml-[19%] -mt-[9.5%] block select-none pointer-events-none max-w-none" 
              />

              {/* Centered Content Positioned Inside Archway Opening */}
              <div className="absolute top-[44.5%] left-0 right-0 flex flex-col items-center justify-start text-center z-10 px-4 select-none">
                {/* Script Title */}
                <h2 
                  className="text-[29px] sm:text-[32px] mb-5 sm:mb-6 capitalize tracking-wide select-none leading-none"
                  style={{ fontFamily: "'Great Vibes', cursive", color: '#936370' }}
                >
                  Counting Down To Forever
                </h2>

                {/* 2x2 Countdown Grid without boxes/cards */}
                <div className="grid grid-cols-2 gap-x-14 sm:gap-x-16 gap-y-5 sm:gap-y-6 w-full max-w-[220px] sm:max-w-[240px] mx-auto text-center mb-7 sm:mb-8">
                  {/* Days */}
                  <div className="flex flex-col items-center justify-center">
                    <span 
                      className="text-[26px] sm:text-[28px] font-normal tracking-normal text-[#1A1617] leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {countdown.days}
                    </span>
                    <span 
                      className="text-[13px] sm:text-[13.5px] text-[#1A1617] mt-1.5 font-normal leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      Hari
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="flex flex-col items-center justify-center">
                    <span 
                      className="text-[26px] sm:text-[28px] font-normal tracking-normal text-[#1A1617] leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {countdown.hours}
                    </span>
                    <span 
                      className="text-[13px] sm:text-[13.5px] text-[#1A1617] mt-1.5 font-normal leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      Jam
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="flex flex-col items-center justify-center">
                    <span 
                      className="text-[26px] sm:text-[28px] font-normal tracking-normal text-[#1A1617] leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {countdown.minutes}
                    </span>
                    <span 
                      className="text-[13px] sm:text-[13.5px] text-[#1A1617] mt-1.5 font-normal leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      Menit
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="flex flex-col items-center justify-center">
                    <span 
                      className="text-[26px] sm:text-[28px] font-normal tracking-normal text-[#1A1617] leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {countdown.seconds}
                    </span>
                    <span 
                      className="text-[13px] sm:text-[13.5px] text-[#1A1617] mt-1.5 font-normal leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      Detik
                    </span>
                  </div>
                </div>

                {/* Tambahkan Ke Kalender Pill Button */}
                <a 
                  href={getGoogleCalendarUrl()} 
                  target="_blank" 
                  rel="noreferrer"
                  className="py-2.5 px-7 sm:px-8 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-[0_4px_14px_rgba(150,96,110,0.38)] hover:shadow-[0_6px_20px_rgba(150,96,110,0.5)] hover:scale-102 active:scale-95 transition-all duration-300 inline-flex items-center justify-center gap-2 select-none cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #B97C8B 0%, #98606E 100%)' }}
                >
                  <Calendar size={14} className="text-white shrink-0" />
                  <span>TAMBAHKAN KE KALENDER</span>
                </a>
              </div>
            </div>

            {/* Bottom Lace Geometric Divider (Matching Reference Photo) */}
            <div className="relative w-full z-20 pointer-events-none border-t-[1.5px] border-b-[1.5px] border-[#82515E] bg-[#E3D6D0] leading-none py-1 shadow-sm -mt-0.5">
              <img src={bgBorder} alt="Lace Border" className="w-full h-11 sm:h-12 object-cover object-center block opacity-95" />
            </div>
          </section>

          {/* SECTION 6: Rangkaian Acara (Events Schedule - Matching Reference Photos) */}
          <section id="section-events" className="relative w-full overflow-hidden bg-[#D8CBCF]">
            {displayEvents.map((evt: any, index: number) => {
              const locationQuery = encodeURIComponent(evt.location || 'Gedung Muhammadiyah Mataram');
              const mapEmbedUrl = `https://maps.google.com/maps?q=${locationQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

              return (
                <div 
                  key={index} 
                  id={index === 0 ? "section-akad" : `section-resepsi-${index}`} 
                  className={`relative w-full overflow-hidden ${!evt.has_map ? 'min-h-[700px] sm:min-h-[740px] flex flex-col justify-between' : ''}`}
                >
                  {/* Background bamboo grove illustration */}
                  <div 
                    className="absolute inset-0 z-0 bg-cover bg-top pointer-events-none"
                    style={{ backgroundImage: `url(${bgMempelai})` }}
                  />

                  {/* Top Decorative Arched Frame Header */}
                  <div className="relative w-full z-10 pointer-events-none leading-none select-none">
                    <img src={bgTop} alt="Arch Frame" className="w-full h-auto block max-w-none" />
                  </div>

                  {/* Main Event Details */}
                  <div className={`relative z-20 w-full ${evt.name.length > 8 ? '-mt-[84px] sm:-mt-[90px]' : '-mt-[98px] sm:-mt-[106px]'} flex flex-col items-center text-center px-5 ${evt.has_map ? 'pb-20 sm:pb-24' : 'pb-24 sm:pb-28'} select-none`}>
                    {/* Event Title (e.g. AKAD or RESEPSI PERNIKAHAN 1) */}
                    <h3 
                      className={`${evt.name.length > 8 ? 'text-[18px] sm:text-[20px] tracking-[0.14em]' : 'text-[26px] sm:text-[28px] tracking-[0.22em]'} font-medium uppercase leading-none mb-3.5 whitespace-nowrap`}
                      style={{ fontFamily: "'Lora', 'Playfair Display', serif", color: '#885461' }}
                    >
                      {evt.name}
                    </h3>

                    {/* Thin Horizontal Divider */}
                    <div className="w-52 h-[1px] bg-[#3D3035] opacity-85 mb-6.5" />

                    {/* Day of Week */}
                    <span 
                      className="text-base font-normal tracking-[0.14em] uppercase text-[#1A1617] mb-1 leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {evt.day_name}
                    </span>

                    {/* Big Date Number */}
                    <span 
                      className="text-[52px] sm:text-[56px] font-normal leading-[1.05] mb-1"
                      style={{ fontFamily: "'Lora', Georgia, serif", color: '#885461' }}
                    >
                      {evt.date_num}
                    </span>

                    {/* Month & Year */}
                    <span 
                      className="text-base font-normal tracking-[0.12em] uppercase text-[#1A1617] mt-0.5 mb-7 leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {evt.month_year}
                    </span>

                    {/* Event Time */}
                    <p 
                      className="text-[16.5px] sm:text-[17px] font-normal text-[#1A1617] mb-5 leading-none"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {evt.time}
                    </p>

                    {/* Building Icon Divider */}
                    <div className="flex items-center justify-center gap-3 mb-5">
                      <div className="w-9 sm:w-10 h-[1px] bg-[#3D3035] opacity-85" />
                      <VenueBuildingIcon className="w-3.5 h-3.5 text-[#1A1617]" />
                      <div className="w-9 sm:w-10 h-[1px] bg-[#3D3035] opacity-85" />
                    </div>

                    {/* Venue Name */}
                    <h4 
                      className="text-[15.5px] sm:text-[16px] font-bold text-[#1A1617] max-w-[310px] mx-auto leading-snug mb-6.5"
                      style={{ fontFamily: "'Lora', Georgia, serif" }}
                    >
                      {evt.location}
                    </h4>

                    {/* Wedding-Themed Google Maps Section */}
                    {evt.has_map && (
                      <div className="w-full max-w-[340px] sm:max-w-[360px] mx-auto mt-2 text-center">
                        <div 
                          className="p-2.5 sm:p-3 rounded-[22px] shadow-lg border relative overflow-hidden"
                          style={{
                            background: 'rgba(255, 255, 255, 0.88)',
                            backdropFilter: 'blur(8px)',
                            borderColor: 'rgba(136, 84, 97, 0.25)',
                            boxShadow: '0 10px 30px rgba(119, 75, 83, 0.12)'
                          }}
                        >
                          {/* Card Header Badge */}
                          <div className="flex items-center justify-center gap-1.5 pb-2 text-[#7A4B56]">
                            <MapPin size={14} className="text-[#885461]" />
                            <span 
                              className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase"
                              style={{ fontFamily: "'Lora', Georgia, serif" }}
                            >
                              Petunjuk Lokasi Acara
                            </span>
                          </div>

                          {/* Map Window with Wedding-Harmonized Filter */}
                          <div className="w-full h-[180px] sm:h-[195px] rounded-[16px] overflow-hidden relative shadow-inner border border-[#885461]/15 bg-stone-100">
                            <iframe 
                              title={`Peta Lokasi ${evt.location}`}
                              src={mapEmbedUrl}
                              className="w-full h-full border-0 block"
                              style={{ filter: 'contrast(96%) saturate(90%) sepia(8%)' }}
                              loading="lazy"
                            />
                          </div>

                          {/* Action Button: Buka Google Maps */}
                          <a 
                            href={evt.maps_url || `https://maps.google.com/?q=${locationQuery}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 w-full py-2.5 px-4 rounded-full text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:scale-[1.02] active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer select-none"
                            style={{ 
                              background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)',
                              fontFamily: "'Poppins', sans-serif"
                            }}
                          >
                            <Navigation size={13} />
                            <span>Buka Google Maps</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </section>

          {/* SECTION 7: Dresscode (Matching Reference Photo) */}
          <section id="section-dresscode" className="relative w-full pt-14 sm:pt-16 overflow-hidden text-center bg-[#9A6E76] text-white">
            <div className="relative z-10 max-w-md mx-auto flex flex-col items-center px-6">
              {/* Section Title */}
              <h2 
                className="text-[22px] sm:text-[24px] uppercase tracking-[0.16em] mb-4.5 sm:mb-5 font-normal"
                style={{ fontFamily: "'Lora', 'Playfair Display', serif" }}
              >
                DRESSCODE
              </h2>

              {/* Suit & Dress Outline Illustration */}
              <div className="mb-4.5 sm:mb-5 flex justify-center">
                <img 
                  src={bgDresscode} 
                  alt="Dresscode Illustration" 
                  className="w-[110px] sm:w-[120px] h-auto object-contain" 
                />
              </div>

              {/* Description matching reference photo exactly */}
              <p 
                className="text-[13.5px] sm:text-[14.5px] leading-[1.65] max-w-[310px] sm:max-w-[340px] text-white/95 mb-6 sm:mb-7 font-normal"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                Mohon mengenakan pakaian yang senada dengan palet warna kami.
              </p>

              {/* Exactly 4 Color Swatch Circles */}
              <div className="flex justify-center items-center gap-3.5 sm:gap-4 mb-16 sm:mb-20">
                {[
                  { color: '#F5E6CA' }, // Soft Champagne / Cream
                  { color: '#8C6A5D' }, // Warm Taupe Mocha
                  { color: '#4A3C31' }, // Deep Dark Charcoal Brown
                  { color: '#D9A566' }, // Warm Caramel Ochre
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="w-11 h-11 sm:w-11.5 sm:h-11.5 rounded-full border-[1.5px] border-white shadow-md transition-transform duration-300 hover:scale-105 select-none"
                    style={{ backgroundColor: item.color }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Twin Swans & Flower Foliage */}
            <div className="w-full relative flex justify-center items-end leading-none select-none pointer-events-none -mt-4 sm:-mt-6">
              <img 
                src={bgBebek} 
                alt="Bebek" 
                className="absolute bottom-1 sm:bottom-1.5 z-10 w-44 sm:w-48 h-auto left-1/2 transform -translate-x-1/2" 
              />
              <img 
                src={bgTwinFlower} 
                alt="Twin Flower" 
                className="w-full h-auto object-cover object-bottom relative z-20 block" 
              />
            </div>

            {/* Bottom Lace Geometric Divider (matching reference photo bottom edge) */}
            <div className="relative w-full z-30 pointer-events-none border-t-[1.5px] border-b-[1.5px] border-[#82515E] bg-[#E3D6D0] leading-none py-1 shadow-sm -mt-0.5">
              <img src={bgBorder} alt="Lace Border" className="w-full h-11 sm:h-12 object-cover object-center block opacity-95" />
            </div>
          </section>

          {/* SECTION 8: Informasi Tambahan, Turut Mengundang, Adab Walimah (Matching Reference Photos) */}
          <section id="section-adab" className="relative w-full pt-12 sm:pt-14 pb-0 overflow-hidden text-center bg-[#EAE2DA]">
            {/* Background bamboo sketch */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-top pointer-events-none"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            {/* Classical Stone Bridge & Water Fountain Backdrop at bottom of section */}
            <div className="absolute bottom-6 sm:bottom-7 left-0 right-0 w-full flex justify-center pointer-events-none z-10 opacity-55">
              <img 
                src={bgBridge} 
                alt="Stone Bridge and Fountain" 
                className="w-[108%] -ml-[4%] sm:w-full h-auto object-contain block" 
              />
            </div>

            {/* Content Container */}
            <div className="relative z-20 max-w-md mx-auto px-5 select-none">
              {/* 1. INFORMASI TAMBAHAN */}
              <h3 
                className="text-[20px] sm:text-[22px] uppercase tracking-[0.14em] mb-3.5 font-normal"
                style={{ fontFamily: "'Lora', 'Playfair Display', serif", color: '#885461' }}
              >
                INFORMASI TAMBAHAN
              </h3>
              <p 
                className="text-[14px] sm:text-[14.5px] leading-[1.65] max-w-[310px] mx-auto text-[#332A2D] mb-12 sm:mb-14 font-normal"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                Tamu yang hadir diharapkan memakai masker dan tidak membawa bayi
              </p>

              {/* 2. TURUT MENGUNDANG */}
              <h3 
                className="text-[20px] sm:text-[22px] uppercase tracking-[0.14em] mb-4 font-normal"
                style={{ fontFamily: "'Lora', 'Playfair Display', serif", color: '#885461' }}
              >
                TURUT MENGUNDANG
              </h3>
              <div 
                className="space-y-1.5 text-[14.5px] sm:text-[15.5px] text-[#332A2D] leading-[1.8] mb-14 sm:mb-16 font-normal"
                style={{ fontFamily: "'Lora', Georgia, serif" }}
              >
                <div>&#10003; Ir. H. Joko Widodo</div>
                <div>&#10003; Prof. Dr. (H.C.) K. H. Ma'ruf Amin</div>
              </div>

              {/* 3. ADAB WALIMAH */}
              <h3 
                className="text-[21px] sm:text-[23px] uppercase tracking-[0.14em] mb-7 sm:mb-8 font-normal"
                style={{ fontFamily: "'Lora', 'Playfair Display', serif", color: '#885461' }}
              >
                ADAB WALIMAH
              </h3>

              {/* 6 Circular Icons Grid */}
              <div className="grid grid-cols-3 gap-y-7 gap-x-2 sm:gap-x-4 max-w-[350px] sm:max-w-[365px] mx-auto mb-14 sm:mb-16">
                {/* 1. Sholat */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#2C5E55] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="3" width="14" height="18" rx="2" fill="#2C5E55" fillOpacity="0.12" />
                      <path d="M7 8c1-2.5 3-3.5 5-3.5s4 1 5 3.5" />
                      <circle cx="12" cy="11.5" r="2.5" />
                      <path d="M12 10.5v1.2l.8.8" />
                      <path d="M5 18h14" />
                    </svg>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[85px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Memperhatikan waktu sholat
                  </p>
                </div>

                {/* 2. Makan & Minum */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#2C5E55] flex items-center justify-center">
                      <svg className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-white" viewBox="0 0 24 24">
                        <path d="M7 2a2.5 2.5 0 0 0-2.5 2.5c0 1.3 1.1 2.3 2.5 2.3v14.2h1.5V6.8c1.4 0 2.5-1 2.5-2.3A2.5 2.5 0 0 0 8.5 2H7zm8 0v4.5a1.2 1.2 0 0 1-1.2 1.2v13.3h1.5v-5.5h1.4v5.5h1.5V7.7a1.2 1.2 0 0 1-1.2-1.2V2h-2z" />
                      </svg>
                    </div>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[85px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Memperhatikan adab makan & minum
                  </p>
                </div>

                {/* 3. Mendoakan */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#2C5E55] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 16c0-3 2-6 2-9a1.5 1.5 0 0 1 3 0v4" />
                      <path d="M17 16c0-3-2-6-2-9a1.5 1.5 0 0 0-3 0v4" />
                      <path d="M8.5 13c1 1.5 2 2 3.5 2s2.5-.5 3.5-2" />
                      <path d="M6 16c1.5 3 4 4 6 4s4.5-1 6-4" />
                    </svg>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[85px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Mendoakan Kedua Mempelai
                  </p>
                </div>

                {/* 4. Menjaga Jarak */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-[#2C5E55]" viewBox="0 0 24 24">
                      <circle cx="5.5" cy="5.5" r="2.2" />
                      <path d="M3 10c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2v6.5H6.5V21H4.5v-4.5H3V10z" />
                      <circle cx="18.5" cy="5.5" r="2.2" />
                      <path d="M16 10c0-1.1.9-2 2-2h1c1.1 0 2 .9 2 2l1.2 7h-2.2V21h-2v-4h-2.2l1.2-7z" />
                      <path d="M8.5 15.5l1.5-1.5v1h4v-1l1.5 1.5-1.5 1.5v-1h-4v1l-1.5-1.5z" />
                      <path d="M10.5 10.5l1.5 1.5 3-3" fill="none" stroke="#2C5E55" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[88px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Memperhatikan adab lawan jenis, dan menjaga jarak
                  </p>
                </div>

                {/* 5. Menutup Aurat */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#2C5E55] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3C8 3 6 5.5 6 10c0 4 2.5 8 3.5 11h5c1-3 3.5-7 3.5-11 0-4.5-2-7-6-7z" />
                      <path d="M9.5 9c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5c0 2-1 3.5-2.5 3.5S9.5 11 9.5 9z" />
                    </svg>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[88px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Memakai pakaian yang sopan dan menutup aurat
                  </p>
                </div>

                {/* 6. Dilarang Foto */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-[58px] h-[58px] sm:w-[62px] sm:h-[62px] rounded-full border-2 border-[#2C5E55] flex items-center justify-center mb-2 bg-[#F3ECE5]/45">
                    <svg className="w-7 h-7 sm:w-8 sm:h-8 stroke-[#2C5E55] stroke-[1.8] fill-none" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 15h10a1 1 0 0 0 1-1V10a1 1 0 0 0-1-1h-2l-1-1.5h-4L9 9H7a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1z" />
                      <circle cx="12" cy="12" r="2" />
                      <line x1="4" y1="4" x2="20" y2="20" strokeWidth="2.2" />
                    </svg>
                  </div>
                  <p 
                    className="text-[9px] sm:text-[9.5px] font-bold text-[#2C5E55] leading-tight max-w-[85px] mx-auto text-center"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Dilarang mengambil foto tanpa izin
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Lace Geometric Divider */}
            <div className="relative w-full z-30 pointer-events-none border-t-[1.5px] border-b-[1.5px] border-[#82515E] bg-[#E3D6D0] leading-none py-1 shadow-sm">
              <img src={bgBorder} alt="Lace Border" className="w-full h-11 sm:h-12 object-cover object-center block opacity-95" />
            </div>
          </section>

          {/* SECTION 9: Gallery & Video */}
          <section id="section-gallery" className="relative w-full pt-14 pb-12 px-5 sm:px-6 overflow-hidden text-center bg-[#E6DED8]">
            <div className="relative z-10 max-w-md mx-auto">
              <h2 
                className="text-5xl sm:text-6xl mb-6 capitalize text-center"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#885461' }}
              >
                Gallery
              </h2>

              {/* YouTube Video Player in Custom Plum-Bordered Card */}
              <div className="w-full max-w-[365px] sm:max-w-[385px] mx-auto aspect-video rounded-2xl sm:rounded-[20px] overflow-hidden border-[2.5px] border-[#885461] shadow-lg mb-6 sm:mb-8 relative bg-black">
                <iframe 
                  src={getEmbedUrl(invitation?.youtube_url)} 
                  title="Wedding Video"
                  className="w-full h-full object-cover"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                />
              </div>

              {/* 3x3 Photo Grid with Tight Spacing matching Reference Screenshots */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2 max-w-[385px] sm:max-w-[405px] mx-auto mb-2">
                {displayGallery.slice(0, 9).map((img: any, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setActivePhoto(img.image_url)}
                    className="relative aspect-square overflow-hidden cursor-pointer group bg-stone-300 shadow-sm"
                  >
                    <img 
                      src={img.image_url} 
                      alt={img.caption || `Gallery ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ExternalLink size={18} className="drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10: Kirim Amplop & Live Streaming */}
          <section id="section-amplop" className="relative w-full pt-12 pb-16 px-6 overflow-hidden text-center bg-[#E6DED8]">
            {/* Bamboo Sketch Background */}
            <div 
              className="absolute inset-0 z-0 bg-repeat bg-center pointer-events-none opacity-35"
              style={{ backgroundImage: `url(${bgMempelai})`, backgroundSize: '400px auto' }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              {/* Header: KIRIM AMPLOP */}
              <h2 
                className="text-2xl sm:text-[26px] uppercase tracking-[0.18em] mb-2 font-normal"
                style={{ fontFamily: "'Lora', serif", color: '#885461' }}
              >
                KIRIM AMPLOP
              </h2>

              <p 
                className="text-xs sm:text-[13px] text-stone-700 leading-relaxed mb-6 max-w-[290px] mx-auto font-normal"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Jika berkenan memberikan hadiah, bisa dikirim melalui rekening berikut
              </p>

              {/* Button: GIFT */}
              <button 
                onClick={() => setPaymentOpen(!paymentOpen)}
                className="w-fit min-w-[130px] px-8 py-2.5 sm:py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 mx-auto mb-14 sm:mb-16 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
              >
                <Gift size={15} />
                <span>GIFT</span>
              </button>

              {/* Collapsible Payment Card */}
              {paymentOpen && (
                <div className="mb-14 space-y-4 text-left transition-all duration-300 max-w-[340px] mx-auto">
                  {defaultBankAccounts.map((account: any, idx: number) => (
                    <div 
                      key={idx}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#9A6E76]/25 shadow-md flex flex-col justify-between gap-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#774B53]" style={{ fontFamily: "'Lora', serif" }}>
                          {account.bank}
                        </span>
                        {account.logo && (
                          <img src={account.logo} alt={account.bank} className="h-4 max-w-[60px] object-contain" />
                        )}
                      </div>

                      <div>
                        <p className="text-lg sm:text-xl font-mono font-bold tracking-wider text-stone-800 select-all">
                          {account.no_rek}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#9A6E76]/15">
                        <span className="text-xs font-medium text-[#774B53]" style={{ fontFamily: "'Lora', serif" }}>
                          a.n {account.an}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(account.no_rek, account.bank)}
                          className="px-3.5 py-1.5 rounded-full text-white text-[11px] font-semibold tracking-wide uppercase shadow hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                          style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                        >
                          {copiedAccount === account.no_rek ? (
                            <>
                              <Check size={12} />
                              <span>Tersalin</span>
                            </>
                          ) : (
                            <>
                              <Copy size={12} />
                              <span>Salin</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Kado Fisik & Alamat Pengiriman */}
                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#9A6E76]/20 shadow-sm text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#774B53] mb-1" style={{ fontFamily: "'Lora', serif" }}>
                      Alamat Pengiriman Kado
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed my-2" style={{ fontFamily: "'Lora', serif" }}>
                      Kediaman Mempelai, Jl. Melati Putih No. 12, Solo, Jawa Tengah (Kode Pos: 57126)
                    </p>
                    <button 
                      onClick={() => copyToClipboard('Kediaman Mempelai, Jl. Melati Putih No. 12, Solo, Jawa Tengah (Kode Pos: 57126)', 'Alamat')}
                      className="mt-1 px-4 py-1.5 rounded-full text-white text-[11px] font-medium uppercase tracking-wider shadow inline-flex items-center gap-1.5 cursor-pointer"
                      style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                    >
                      <Copy size={12} />
                      <span>Salin Alamat</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Header: LIVE STREAMING */}
              <div id="section-streaming">
                <h2 
                  className="text-2xl sm:text-[26px] uppercase tracking-[0.18em] mb-6 font-normal"
                  style={{ fontFamily: "'Lora', serif", color: '#885461' }}
                >
                  LIVE STREAMING
                </h2>

                {/* 4 Streaming Buttons */}
                <div className="space-y-3 max-w-[310px] mx-auto mb-10 sm:mb-12 relative z-10">
                  <a 
                    href={invitation?.youtube_stream_url || "https://youtube.com"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 sm:py-3 px-5 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    <span>LINK STREAMING YOUTUBE</span>
                  </a>

                  <a 
                    href={invitation?.instagram_stream_url || "https://instagram.com"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 sm:py-3 px-5 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <InstagramIcon size={15} className="shrink-0" />
                    <span>LINK STREAMING INSTAGRAM</span>
                  </a>

                  <a 
                    href={invitation?.tiktok_stream_url || "https://tiktok.com"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 sm:py-3 px-5 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <svg className="w-4 h-4 fill-white shrink-0" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.32 6.32 0 0 0 1.86-4.49V8.65a8.21 8.21 0 0 0 4.91 1.6V6.8a4.8 4.8 0 0 1-1-.11z"/>
                    </svg>
                    <span>LINK STREAMING TIKTOK</span>
                  </a>

                  <a 
                    href={invitation?.zoom_stream_url || "https://zoom.us"} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-full py-2.5 sm:py-3 px-5 rounded-full text-white text-[11px] sm:text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center gap-2.5 hover:scale-[1.02] active:scale-95 transition-all"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <Video size={15} className="shrink-0" />
                    <span>LINK STREAMING ZOOM</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Classical Stone Bridge Illustration at Section Bottom */}
            <div className="w-full pointer-events-none -mb-16 mt-4 leading-none relative z-0 opacity-50">
              <img src={bgBridge} alt="Bridge Ornament" className="w-full h-auto object-cover object-bottom" />
            </div>
          </section>

          {/* SECTION 11: Reservasi Tamu & Story Instagram */}
          <section id="section-rsvp" className="relative w-full pt-14 pb-20 px-6 overflow-hidden text-center bg-[#E6DED8]">
            {/* Bamboo Sketch Background */}
            <div 
              className="absolute inset-0 z-0 bg-repeat bg-center pointer-events-none opacity-35"
              style={{ backgroundImage: `url(${bgMempelai})`, backgroundSize: '400px auto' }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              {/* Header: RESERVASI TAMU */}
              <h2 
                className="text-2xl sm:text-[26px] uppercase tracking-[0.18em] mb-6 font-normal"
                style={{ fontFamily: "'Lora', serif", color: '#885461' }}
              >
                RESERVASI TAMU
              </h2>

              {/* White Card with QR Code */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl inline-block border border-black/5 mb-4">
                <img 
                  src="/qr-code.png" 
                  alt="QR Code Kehadiran" 
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto" 
                />
              </div>

              <p 
                className="text-xs sm:text-[13px] text-stone-700 font-medium mb-3"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Konfirmasi Kehadiran
              </p>

              {/* Button: KIRIM RSVP */}
              <button 
                onClick={() => {
                  const el = document.getElementById('ucapan-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-fit min-w-[160px] px-8 py-2.5 sm:py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 mx-auto mb-14 sm:mb-16 cursor-pointer"
                style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
              >
                <FileText size={15} />
                <span>KIRIM RSVP</span>
              </button>

              {/* Header: STORY INSTAGRAM */}
              <div id="section-story-ig">
                <h2 
                  className="text-2xl sm:text-[26px] uppercase tracking-[0.18em] mb-2 font-normal"
                  style={{ fontFamily: "'Lora', serif", color: '#885461' }}
                >
                  STORY INSTAGRAM
                </h2>

                <p 
                  className="text-xs sm:text-[13px] text-stone-700 leading-relaxed mb-6 max-w-[310px] mx-auto font-normal"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Bagikan momenmu melalui Story Instagram, lalu mention akun kami agar mudah kami repost.
                </p>

                {/* Button: STORY INSTAGRAM */}
                <a 
                  href={invitation?.ig_filter_url || "https://instagram.com/maudyayunda"}
                  target="_blank"
                  rel="noreferrer"
                  className="w-fit min-w-[210px] px-8 py-2.5 sm:py-3 rounded-full text-white text-xs font-bold tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 mx-auto mb-10 cursor-pointer"
                  style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                >
                  <InstagramIcon size={15} />
                  <span>STORY INSTAGRAM</span>
                </a>
              </div>
            </div>

            {/* Twin Flower Stalks at Bottom Corners */}
            <div className="absolute -bottom-2 left-0 w-24 sm:w-32 pointer-events-none z-10 leading-none">
              <img src={`${ASSETS}/story-ig-flower.webp`} alt="Ornament Left" className="w-full h-auto block" />
            </div>
            <div className="absolute -bottom-2 right-0 w-24 sm:w-32 pointer-events-none z-10 leading-none">
              <img src={`${ASSETS}/story-ig-flower.webp`} alt="Ornament Right" className="w-full h-auto block scale-x-[-1]" />
            </div>
          </section>

          {/* Lace Geometric Divider */}
          <div className="relative w-full z-30 pointer-events-none border-t-[1.5px] border-b-[1.5px] border-[#82515E] bg-[#E3D6D0] leading-none py-1 shadow-sm">
            <img src={bgBorder} alt="Lace Border" className="w-full h-11 sm:h-12 object-cover object-center block opacity-95" />
          </div>

          {/* SECTION 12: Ucapan & Doa */}
          <section id="section-ucapan" className="relative w-full pt-12 pb-16 px-5 sm:px-6 overflow-hidden bg-[#E6DED8]">
            {/* Bamboo Sketch Background */}
            <div 
              className="absolute inset-0 z-0 bg-repeat bg-center pointer-events-none opacity-45"
              style={{ backgroundImage: `url(${bgMempelai})`, backgroundSize: '400px auto' }}
            />

            <div className="relative z-10 max-w-md mx-auto text-center">
              <h2 
                className="text-[46px] sm:text-6xl mb-6 capitalize leading-none"
                style={{ fontFamily: "'Great Vibes', cursive", color: '#7B4B57' }}
              >
                Ucapan &amp; Doa
              </h2>

              {/* Form matching user screenshot */}
              <form id="ucapan-form" onSubmit={handleRsvpSubmit} className="max-w-[360px] sm:max-w-[380px] w-full mx-auto text-left space-y-4 mb-10">
                <div>
                  <label className="block text-[14px] font-medium text-[#2E2227] mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Nama
                  </label>
                  <input 
                    type="text" 
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#B0A2AA] bg-white text-stone-800 text-sm focus:outline-none focus:border-[#7B4B57] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E2227] mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Sosial Media
                  </label>
                  <input 
                    type="text" 
                    value={rsvpSosmed}
                    onChange={(e) => setRsvpSosmed(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#B0A2AA] bg-white text-stone-800 text-sm focus:outline-none focus:border-[#7B4B57] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#2E2227] mb-1.5" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Ucapan &amp; Doa
                  </label>
                  <textarea 
                    rows={5}
                    required
                    value={rsvpWishes}
                    onChange={(e) => setRsvpWishes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-[5px] border border-[#B0A2AA] bg-white text-stone-800 text-sm focus:outline-none focus:border-[#7B4B57] resize-none transition-colors"
                  />
                </div>

                <div className="pt-1 text-left">
                  <button 
                    type="submit" 
                    disabled={isRsvpSubmitting}
                    className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-[5px] text-white text-[13.5px] sm:text-sm font-semibold tracking-wide shadow hover:opacity-95 active:scale-95 transition-all cursor-pointer"
                    style={{ 
                      background: 'linear-gradient(to right, #693C47 0%, #AF7C89 100%)', 
                      fontFamily: "'Poppins', sans-serif" 
                    }}
                  >
                    {isRsvpSubmitting ? 'Mengirim...' : 'Kirimkan Ucapan'}
                  </button>
                </div>
              </form>

              {/* Wishes List & Pagination */}
              <div className="space-y-3.5 text-left max-w-[360px] mx-auto">
                {paginatedComments.map((item, idx) => (
                  <div 
                    key={idx}
                    className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-[#9A6E76]/15 shadow-sm space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-[#774B53]" style={{ fontFamily: "'Lora', serif" }}>
                        {item.name}
                      </h4>
                      {item.date && (
                        <span className="text-[10px] text-stone-400 font-sans">{item.date}</span>
                      )}
                    </div>
                    {item.sosmed && (
                      <p className="text-[11px] text-stone-500 font-mono">{item.sosmed}</p>
                    )}
                    <p className="text-xs text-stone-700 leading-relaxed pt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button 
                    onClick={() => setCommentPage(p => Math.max(1, p - 1))}
                    disabled={commentPage <= 1}
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow transition-opacity cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="text-xs font-semibold text-stone-700 font-sans">
                    {commentPage} / {totalPages}
                  </span>
                  <button 
                    onClick={() => setCommentPage(p => Math.min(totalPages, p + 1))}
                    disabled={commentPage >= totalPages}
                    className="w-8 h-8 rounded-full text-white flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed shadow transition-opacity cursor-pointer"
                    style={{ background: 'linear-gradient(135deg, #784E59 0%, #BA8995 100%)' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 13: Closing & Thanks */}
          <section id="section-closing" className="relative w-full pt-12 pb-0 px-6 overflow-hidden text-center bg-[#E6DED8]">
            {/* Bamboo Sketch Background */}
            <div 
              className="absolute inset-0 z-0 bg-repeat bg-center pointer-events-none opacity-40"
              style={{ backgroundImage: `url(${bgMempelai})`, backgroundSize: '400px auto' }}
            />

            <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
              <h2 
                className="text-[54px] sm:text-[60px] mb-4 capitalize text-center leading-none"
                style={{ fontFamily: "'Great Vibes', cursive", color: '#7B4B57' }}
              >
                Thanks
              </h2>

              <p 
                className="text-[13px] sm:text-[13.5px] text-[#2E2227] leading-relaxed mb-6 max-w-[340px] mx-auto text-center font-normal"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Merupakan suatu kebahagiaan dan kehormatan bagi kami, apabila Bapak/Ibu/Saudara/i, berkenan hadir dan memberikan do&apos;a restu kepada kedua mempelai.
              </p>

              <p 
                className="text-[13.5px] sm:text-[14px] text-[#2E2227] font-normal mb-1.5 text-center"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Hormat Kami Yang Mengundang
              </p>

              <h3 
                className="text-[38px] sm:text-[44px] mb-8 text-center leading-tight"
                style={{ fontFamily: "'Great Vibes', cursive", color: '#7B4B57' }}
              >
                {groomNickname} dan {brideNickname}
              </h3>

              {/* Closing Arched Capsule Couple Photo Framed with Left & Right Floral Ornaments */}
              <div className="relative flex justify-center items-center my-4 w-[250px] sm:w-[270px] h-[370px] sm:h-[400px]">
                {/* Right Top Floral Bouquet Ornament */}
                <div className="absolute z-20 pointer-events-none -right-10 -top-8 w-36 sm:w-40">
                  <img src={bgRightBorderClosing} alt="Floral Top Right" className="w-full h-auto drop-shadow-md" />
                </div>

                {/* Arched Photo Frame */}
                <div 
                  className="relative z-10 w-full h-full rounded-[140px] overflow-hidden border-[2.5px] border-[#7B4B57] shadow-lg bg-stone-300"
                >
                  <img 
                    src={slidePhotos[photoSlideIndex]} 
                    alt="Closing Portrait" 
                    className="w-full h-full object-cover object-center transition-all duration-700"
                  />
                </div>

                {/* Left Bottom Floral Garland Ornament */}
                <div className="absolute z-20 pointer-events-none -left-10 -bottom-8 w-44 sm:w-48">
                  <img src={bgLeftBorderClosing} alt="Floral Left Bottom" className="w-full h-auto drop-shadow-md" />
                </div>
              </div>
            </div>

            {/* Bottom Mirrored Peonies Bouquet (story-flower.webp) */}
            <div className="w-full mt-6 pointer-events-none leading-none relative z-10">
              <img src={bgStoryFlower} alt="Story Flower" className="w-full h-auto block scale-105 origin-bottom" />
            </div>
          </section>

          {/* FOOTER WITH INTEGRATED WHITE LACE PATTERN */}
          <footer className="relative w-full pt-2 pb-6 text-center text-white bg-[#82515E]">
            {/* Lace Pattern with white filter */}
            <div className="w-full leading-none overflow-hidden mb-3">
              <img 
                src={bgBorder} 
                alt="Lace Border" 
                className="w-full h-11 sm:h-12 object-cover object-center block" 
                style={{ filter: 'brightness(0) invert(1) opacity(0.9)' }}
              />
            </div>

            <p className="text-xs tracking-wide text-white/95 font-normal" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Powered by {(invitation?.settings as any)?.footer_brand || 'WD Group'}
            </p>
          </footer>

        </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div 
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
        >
          <button 
            onClick={() => setActivePhoto(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-black/50"
          >
            <X size={24} />
          </button>
          <img 
            src={activePhoto} 
            alt="Enlarged Moment" 
            className="max-w-full max-h-[90vh] rounded-2xl object-contain shadow-2xl"
          />
        </div>
      )}

    </div>
  );
};
