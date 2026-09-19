import React, { useState, useEffect } from 'react';
import { 
  Heart, Calendar, MapPin, Clock, Copy, Check, ExternalLink, 
  Send, ChevronLeft, ChevronRight, Gift, Disc, Music, CheckCircle2,
  X, MessageCircle
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

  // Format name helper
  const formatName = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const groomFullName = formatName(couple?.groom_full_name || couple?.groom_nickname || couple?.groom_name) || 'Steven Pratama';
  const rawGroomNick = couple?.groom_nickname?.trim();
  const rawGroomFull = couple?.groom_full_name?.trim();
  const groomNickname = (rawGroomNick && (!rawGroomFull || (rawGroomNick.toLowerCase() !== 'bagas' || rawGroomFull.toLowerCase() === 'bagas')))
    ? formatName(rawGroomNick)
    : (rawGroomFull ? formatName(rawGroomFull.split(/\s+/)[0]) : 'Steven');

  const brideFullName = formatName(couple?.bride_full_name || couple?.bride_nickname || couple?.bride_name) || 'Bunga Citra';
  const rawBrideNick = couple?.bride_nickname?.trim();
  const rawBrideFull = couple?.bride_full_name?.trim();
  const brideNickname = (rawBrideNick && (!rawBrideFull || (rawBrideNick.toLowerCase() !== 'siti' || rawBrideFull.toLowerCase() === 'siti')))
    ? formatName(rawBrideNick)
    : (rawBrideFull ? formatName(rawBrideFull.split(/\s+/)[0]) : 'Bunga');

  const coupleNamesCombined = `${groomNickname} & ${brideNickname}`;
  const groomFather = formatName(couple?.groom_father_name) || 'Bpk. Bambang Pratama';
  const groomMother = formatName(couple?.groom_mother_name) || 'Ibu Sri Wahyuni';
  const brideFather = formatName(couple?.bride_father_name) || 'Bpk. Hendra Wijaya';
  const brideMother = formatName(couple?.bride_mother_name) || 'Ibu Ratna Dewi';

  const groomPhoto = couple?.groom_photo_url || '/groom-default.jpg';
  const bridePhoto = couple?.bride_photo_url || '/bride-default.jpg';
  const heroPhoto = invitation?.cover_image_url || '/themes/secret-garden/assets/preview.jpg';

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

  // Countdown timer state
  const targetDateStr = events[0]?.event_date || '2026-10-24T09:00:00';
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

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpAttendance, setRsvpAttendance] = useState<'hadir' | 'tidak_hadir' | 'ragu'>('hadir');
  const [rsvpGuestCount, setRsvpGuestCount] = useState('1');
  const [rsvpWishes, setRsvpWishes] = useState('');
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
    if (!rsvpName.trim()) return;
    setIsRsvpSubmitting(true);

    setTimeout(() => {
      if (rsvpWishes.trim()) {
        const newWish = {
          name: rsvpName.trim(),
          sosmed: '@tamu_undangan',
          message: rsvpWishes.trim(),
          date: 'Baru saja'
        };
        const updated = [newWish, ...wishes];
        setWishes(updated);
        try {
          localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch {}
      }
      setIsRsvpSubmitting(false);
      setRsvpSuccess(true);
      toast.success('Konfirmasi kehadiran & ucapan berhasil terkirim!');
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

  // Default Stories if none provided
  const displayStories = stories?.length > 0 ? stories : [
    {
      judul: 'Awal Bertemu',
      tanggal: '12 Januari 2022',
      cerita: 'Pertemuan pertama kami berawal dari sebuah proyek kantor di mana kami sering bertukar ide hingga menumbuhkan rasa saling mengagumi satu sama lain.',
      photo: '/gallery-slide-1.jpg'
    },
    {
      judul: 'Menjalin Komitmen',
      tanggal: '18 Mei 2024',
      cerita: 'Setelah melewati berbagai perjalanan suka dan duka bersama, kami mantap untuk melangkah ke jenjang yang lebih serius dengan saling berkomitmen.',
      photo: '/gallery-slide-2.jpg'
    },
    {
      judul: 'Lamaran & Menuju Pelaminan',
      tanggal: '14 Agustus 2026',
      cerita: 'Di hadapan keluarga besar kedua belah pihak, ikatan cinta ini diteguhkan dalam momen lamaran yang hangat dan penuh rasa syukur.',
      photo: '/gallery-slide-3.jpg'
    }
  ];

  // Default Gallery photos
  const displayGallery = gallery?.length > 0 ? gallery : [
    { image_url: '/gallery-ceremony.jpg', caption: 'Prewedding Moment' },
    { image_url: '/gallery-slide-1.jpg', caption: 'Sweet Memories' },
    { image_url: '/gallery-slide-2.jpg', caption: 'Outdoor Session' },
    { image_url: '/gallery-slide-3.jpg', caption: 'Eternal Promise' },
    { image_url: '/gallery-grid-6.jpg', caption: 'Love Story' }
  ];

  return (
    <div className="min-h-screen bg-[#E6DED8] text-[#2B2B2B] select-none font-sans overflow-x-hidden">
      
      {/* Desktop Split-Screen Wrapper */}
      <div className="flex flex-col lg:flex-row min-h-screen relative">

        {/* LEFT PANEL (Desktop Only 58%): Sticky Grand Hero */}
        <div className="hidden lg:block lg:w-[58%] h-screen sticky top-0 left-0 overflow-hidden bg-stone-900 select-none">
          <img 
            src={heroPhoto} 
            alt="Hero Wedding" 
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
          {/* Subtle Vignette & Gradient Overlays */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Left Hero Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-12 xl:p-16 z-10 text-white">
            <p 
              className="text-xs tracking-[0.3em] font-light text-white/90 uppercase mb-3 drop-shadow-md"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Undangan Pernikahan
            </p>
            <h1 
              className="text-6xl xl:text-7xl font-normal leading-tight drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mb-4"
              style={{ fontFamily: "'Imperial Script', cursive", color: '#ffffff' }}
            >
              {groomNickname} &amp; {brideNickname}
            </h1>
            <p 
              className="text-sm xl:text-base font-light tracking-widest text-stone-200 uppercase drop-shadow"
              style={{ fontFamily: "'Lora', serif" }}
            >
              Sabtu, 24 Oktober 2026
            </p>
          </div>
        </div>

        {/* RIGHT PANEL (Mobile: 100%, Desktop: 42%): Scrollable Content */}
        <div className="w-full lg:w-[42%] bg-[#E6DED8] relative min-h-screen overflow-x-hidden">
          
          {/* SECTION 1: Inner Cover / Title Header */}
          <section className="relative w-full py-16 sm:py-20 px-6 flex flex-col items-center justify-center text-center bg-[#E6DED8]">
            <p 
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-stone-600 font-medium mb-5 sm:mb-6"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Undangan Pernikahan
            </p>

            <div className="flex flex-col items-center justify-center my-2">
              <h1 
                className="text-5xl sm:text-6xl font-normal tracking-wide leading-tight"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                {groomNickname}
              </h1>
              <span 
                className="text-3xl sm:text-4xl my-1 text-stone-800"
                style={{ fontFamily: "'Imperial Script', cursive" }}
              >
                &amp;
              </span>
              <h1 
                className="text-5xl sm:text-6xl font-normal tracking-wide leading-tight"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                {brideNickname}
              </h1>
            </div>

            <p 
              className="mt-6 text-xs sm:text-sm font-medium tracking-[0.25em] text-stone-700 uppercase"
              style={{ fontFamily: "'Lora', serif" }}
            >
              24 . 10 . 2026
            </p>
          </section>

          {/* SECTION BORDER 1 */}
          <div className="relative w-full z-20 pointer-events-none border-t-2 border-b-2 border-[#9A6E76] bg-[#E6DED8] leading-none">
            <img src={bgBorder} alt="Lace Border" className="w-full h-auto object-cover object-top block" />
          </div>

          {/* SECTION 2: Kata Mutiara & Holy Verse */}
          <section className="relative w-full py-12 px-6 overflow-hidden text-center bg-[#E6DED8]">
            {/* Background Pattern */}
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              <h2 
                className="text-2xl sm:text-3xl mb-3 capitalize"
                style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#9A6E76' }}
              >
                Assalamu&apos;alaikum Wr. Wb.
              </h2>
              <p 
                className="text-xs sm:text-sm font-light text-stone-700 leading-relaxed my-4"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Dengan memohon rahmat dan ridho Allah Subhanahu Wa Ta&apos;ala, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia pernikahan kami:
              </p>

              {/* Arched Oval Photo Frame with Swaying Flowers */}
              <div className="relative my-8 flex justify-center items-center">
                {/* Left Floral Sway */}
                <div className="absolute -left-8 sm:-left-12 z-0 animate-wind-left pointer-events-none" style={{ top: '15%' }}>
                  <img src={bunga2} alt="Bunga Ornament" className="w-24 sm:w-28 h-auto" />
                </div>
                <div className="absolute -left-8 sm:-left-12 z-10 animate-wind-left pointer-events-none" style={{ top: '15%' }}>
                  <img src={bunga1} alt="Bunga Ornament" className="w-24 sm:w-28 h-auto" />
                </div>

                {/* Right Floral Sway */}
                <div className="absolute -right-8 sm:-right-12 z-0 animate-wind-right pointer-events-none" style={{ top: '25%' }}>
                  <img src={bunga2} alt="Bunga Ornament" className="w-24 sm:w-28 h-auto -scale-x-100" />
                </div>
                <div className="absolute -right-8 sm:-right-12 z-10 animate-wind-right pointer-events-none" style={{ top: '25%' }}>
                  <img src={bunga1} alt="Bunga Ornament" className="w-24 sm:w-28 h-auto -scale-x-100" />
                </div>

                {/* Arched Photo Frame */}
                <div 
                  className="relative z-20 w-[240px] sm:w-[260px] h-[340px] sm:h-[370px] rounded-[180px] overflow-hidden border-[4px] border-[#D9D0C7] shadow-xl bg-stone-200"
                >
                  <img 
                    src={heroPhoto} 
                    alt="Couple Portrait" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </div>

              {/* Quote / Ayat Suci */}
              <div className="mt-6 px-2">
                <h3 
                  className="text-4xl sm:text-5xl mb-4"
                  style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
                >
                  Ar-Rum : 21
                </h3>
                <p 
                  className="text-xs sm:text-sm font-light text-stone-800 leading-relaxed italic"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                </p>
                <p 
                  className="text-xs font-bold text-stone-800 mt-4 tracking-wider"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  #{groomNickname}{brideNickname}Wedding
                </p>
              </div>
            </div>

            {/* Bottom Hill Illustration */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-40">
              <img src={bgBukit} alt="Bukit Ornament" className="w-full h-auto object-cover object-bottom" />
            </div>
          </section>

          {/* SECTION 3: Profil Mempelai (The Couple) */}
          <section className="relative w-full py-16 px-6 overflow-hidden bg-[#E6DED8]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-35"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto text-center space-y-12">
              
              <h2 
                className="text-3xl sm:text-4xl capitalize"
                style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', color: '#9A6E76' }}
              >
                Mempelai
              </h2>

              {/* Groom Card */}
              <div className="flex flex-col items-center">
                {/* Groom Photo with Floral & Star Ornament */}
                <div className="relative flex justify-center items-center mb-5">
                  <div className="absolute -left-10 z-0 animate-wind-left pointer-events-none" style={{ top: '0%' }}>
                    <img src={bunga2} alt="Ornament" className="w-20 h-auto" />
                  </div>
                  <div className="absolute -left-10 z-10 animate-wind-left pointer-events-none" style={{ top: '0%' }}>
                    <img src={bunga1} alt="Ornament" className="w-20 h-auto" />
                  </div>

                  <div 
                    className="relative z-20 w-[230px] sm:w-[250px] h-[330px] sm:h-[350px] rounded-[180px] p-1.5 border-2 border-[#9A6E76] shadow-lg bg-stone-100"
                  >
                    <img 
                      src={groomPhoto} 
                      alt={groomFullName} 
                      className="w-full h-full object-cover rounded-[172px]"
                    />
                  </div>

                  {/* Star Badge Ornament */}
                  <img 
                    src={starOrnament} 
                    alt="Star Ornament" 
                    className="absolute z-30 pointer-events-none w-48 h-auto"
                    style={{ bottom: '-15px', right: '-15px', transform: 'rotate(6deg)' }}
                  />
                </div>

                <h3 
                  className="text-4xl sm:text-5xl mt-2 mb-1 capitalize"
                  style={{ fontFamily: "'Imperial Script', cursive", color: '#774B53' }}
                >
                  {groomNickname}
                </h3>
                <h4 
                  className="text-base sm:text-lg font-bold text-stone-900 tracking-wide mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {groomFullName}
                </h4>
                <p 
                  className="text-xs sm:text-sm text-stone-700 max-w-xs leading-relaxed"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Putra tercinta dari <br />
                  <span className="font-semibold text-stone-900">{groomFather}</span> &amp; <span className="font-semibold text-stone-900">{groomMother}</span>
                </p>

                {couple?.groom_instagram && (
                  <a 
                    href={`https://instagram.com/${couple.groom_instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-white px-4 py-1.5 rounded-full shadow hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#9A6E76' }}
                  >
                    <InstagramIcon size={13} />
                    <span>@{couple.groom_instagram.replace('@', '')}</span>
                  </a>
                )}
              </div>

              {/* Ampersand Divider */}
              <div 
                className="text-4xl sm:text-5xl text-stone-800"
                style={{ fontFamily: "'Imperial Script', cursive" }}
              >
                &amp;
              </div>

              {/* Bride Card */}
              <div className="flex flex-col items-center">
                {/* Bride Photo with Floral & Star Ornament */}
                <div className="relative flex justify-center items-center mb-5">
                  <div className="absolute -right-10 z-0 animate-wind-right pointer-events-none" style={{ top: '0%' }}>
                    <img src={bunga2} alt="Ornament" className="w-20 h-auto -scale-x-100" />
                  </div>
                  <div className="absolute -right-10 z-10 animate-wind-right pointer-events-none" style={{ top: '0%' }}>
                    <img src={bunga1} alt="Ornament" className="w-20 h-auto -scale-x-100" />
                  </div>

                  <div 
                    className="relative z-20 w-[230px] sm:w-[250px] h-[330px] sm:h-[350px] rounded-[180px] p-1.5 border-2 border-[#9A6E76] shadow-lg bg-stone-100"
                  >
                    <img 
                      src={bridePhoto} 
                      alt={brideFullName} 
                      className="w-full h-full object-cover rounded-[172px]"
                    />
                  </div>

                  {/* Star Badge Ornament */}
                  <img 
                    src={starOrnament} 
                    alt="Star Ornament" 
                    className="absolute z-30 pointer-events-none w-48 h-auto"
                    style={{ bottom: '-15px', left: '-15px', transform: 'rotate(-6deg)' }}
                  />
                </div>

                <h3 
                  className="text-4xl sm:text-5xl mt-2 mb-1 capitalize"
                  style={{ fontFamily: "'Imperial Script', cursive", color: '#774B53' }}
                >
                  {brideNickname}
                </h3>
                <h4 
                  className="text-base sm:text-lg font-bold text-stone-900 tracking-wide mb-2"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {brideFullName}
                </h4>
                <p 
                  className="text-xs sm:text-sm text-stone-700 max-w-xs leading-relaxed"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Putri tercinta dari <br />
                  <span className="font-semibold text-stone-900">{brideFather}</span> &amp; <span className="font-semibold text-stone-900">{brideMother}</span>
                </p>

                {couple?.bride_instagram && (
                  <a 
                    href={`https://instagram.com/${couple.bride_instagram.replace('@', '')}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs text-white px-4 py-1.5 rounded-full shadow hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: '#9A6E76' }}
                  >
                    <InstagramIcon size={13} />
                    <span>@{couple.bride_instagram.replace('@', '')}</span>
                  </a>
                )}
              </div>

            </div>

            {/* Bottom Hill Illustration */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-40">
              <img src={bgBukit} alt="Bukit Ornament" className="w-full h-auto object-cover object-bottom" />
            </div>
          </section>

          {/* SECTION 4: Our Love Story */}
          <section className="relative w-full py-16 px-6 overflow-hidden bg-[#9A6E76] text-white">
            <div className="relative z-20 max-w-md mx-auto text-center">
              <h2 
                className="text-5xl sm:text-6xl mb-8 capitalize"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#ffffff' }}
              >
                Our Love Story
              </h2>

              <div className="flex flex-col gap-6 items-center">
                {displayStories.map((story: any, index: number) => (
                  <div 
                    key={index}
                    className="w-full max-w-sm p-6 text-center flex flex-col items-center shadow-xl rounded-[32px] text-stone-900 border border-black/5"
                    style={{ backgroundColor: '#E6DED8' }}
                  >
                    {story.photo && (
                      <div className="w-full h-48 rounded-2xl overflow-hidden mb-4 shadow-sm bg-stone-300">
                        <img 
                          src={story.photo} 
                          alt={story.judul} 
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}
                    <h3 
                      className="text-lg font-semibold mb-1"
                      style={{ fontFamily: "'Lora', serif", color: '#9A6E76' }}
                    >
                      {story.judul}
                    </h3>
                    {story.tanggal && (
                      <p 
                        className="text-xs text-stone-500 mb-3"
                        style={{ fontFamily: "'Lora', serif" }}
                      >
                        {story.tanggal}
                      </p>
                    )}
                    <p 
                      className="text-xs sm:text-sm text-stone-700 leading-relaxed"
                      style={{ fontFamily: "'Lora', serif" }}
                    >
                      {story.cerita}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Corner Flower Ornament */}
            <div className="w-full mt-10 pointer-events-none leading-none">
              <img src={bgStoryFlower} alt="Story Flower Ornament" className="w-full h-auto block scale-110 origin-bottom" />
            </div>
          </section>

          {/* SECTION 5: Countdown Timer & Save The Date */}
          <section className="relative w-full py-16 px-6 overflow-hidden flex flex-col items-center justify-center text-center bg-[#E6DED8]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${bgArch})`, transform: 'scale(1.15)' }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center max-w-[240px] mx-auto py-8">
              <h2 
                className="text-3xl sm:text-4xl mb-4"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                Save The Date
              </h2>

              {/* 2x2 Countdown Grid */}
              <div className="grid grid-cols-2 gap-3 w-full my-3">
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 shadow-sm flex flex-col items-center border border-stone-200">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-none">{countdown.days}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 mt-1 font-medium">Hari</span>
                </div>
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 shadow-sm flex flex-col items-center border border-stone-200">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-none">{countdown.hours}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 mt-1 font-medium">Jam</span>
                </div>
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 shadow-sm flex flex-col items-center border border-stone-200">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-none">{countdown.minutes}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 mt-1 font-medium">Menit</span>
                </div>
                <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-3 shadow-sm flex flex-col items-center border border-stone-200">
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 leading-none">{countdown.seconds}</span>
                  <span className="text-[10px] uppercase tracking-wider text-stone-500 mt-1 font-medium">Detik</span>
                </div>
              </div>

              {/* Add to Calendar Button */}
              <a 
                href={getGoogleCalendarUrl()} 
                target="_blank" 
                rel="noreferrer"
                className="mt-5 px-6 py-2.5 rounded-full text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:opacity-95 active:scale-95 transition-all inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(241.84deg, #D7A5AE 0%, #774B53 100%)' }}
              >
                <Calendar size={13} />
                <span>Simpan Tanggal</span>
              </a>
            </div>
          </section>

          {/* SECTION BORDER 2 */}
          <div className="relative w-full z-20 pointer-events-none border-t-2 border-b-2 border-[#9A6E76] bg-[#E6DED8] leading-none">
            <img src={bgBorder} alt="Lace Border" className="w-full h-auto object-cover object-top block" />
          </div>

          {/* SECTION 6: Rangkaian Acara (Events Schedule) */}
          <section className="relative w-full py-16 px-6 overflow-hidden text-center bg-[#E6DED8]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-40"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            {/* Top Botanical Canopy */}
            <div className="absolute top-0 left-0 w-full z-0 pointer-events-none">
              <img src={bgTop} alt="Top Canopy" className="w-full h-36 object-cover object-top" />
            </div>

            <div className="relative z-10 max-w-md mx-auto pt-10 space-y-12">
              
              {/* Event 1: Akad Nikah */}
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-7 border border-[#9A6E76]/30 shadow-lg flex flex-col items-center">
                <h3 
                  className="text-xl sm:text-2xl uppercase tracking-wider mb-2 font-normal"
                  style={{ fontFamily: "'Lora', serif", color: '#9A6E76' }}
                >
                  Akad Nikah
                </h3>
                <div className="w-24 border-t border-stone-400 my-2" />

                <span className="uppercase text-sm tracking-widest text-stone-700 my-1" style={{ fontFamily: "'Lora', serif" }}>
                  SABTU
                </span>
                <span className="text-5xl font-bold my-1 text-[#9A6E76]" style={{ fontFamily: "'Lora', serif" }}>
                  24
                </span>
                <span className="uppercase text-sm tracking-widest text-stone-700 my-1" style={{ fontFamily: "'Lora', serif" }}>
                  OKTOBER 2026
                </span>

                <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2 mb-4 font-medium">
                  <Clock size={14} className="text-[#9A6E76]" />
                  <span>Pukul 08:00 - 10:00 WIB</span>
                </div>

                <div className="w-12 border-t border-stone-300 my-2" />

                <div className="text-center text-xs sm:text-sm text-stone-800 leading-relaxed my-2" style={{ fontFamily: "'Lora', serif" }}>
                  <strong className="block text-sm font-bold text-stone-900 mb-1">Masjid Agung Surakarta</strong>
                  Jl. Alun-Alun Utara No. 1, Gajahan, Kec. Pasar Kliwon, Kota Surakarta, Jawa Tengah
                </div>

                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 px-6 py-2.5 rounded-full text-white text-xs font-medium uppercase tracking-wider shadow hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(239.4deg, #D7A5AE 0%, #774B53 100%)' }}
                >
                  <MapPin size={13} />
                  <span>Lihat Lokasi</span>
                </a>
              </div>

              {/* Event 2: Resepsi Pernikahan */}
              <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-7 border border-[#9A6E76]/30 shadow-lg flex flex-col items-center">
                <h3 
                  className="text-xl sm:text-2xl uppercase tracking-wider mb-2 font-normal"
                  style={{ fontFamily: "'Lora', serif", color: '#9A6E76' }}
                >
                  Resepsi Pernikahan
                </h3>
                <div className="w-24 border-t border-stone-400 my-2" />

                <span className="uppercase text-sm tracking-widest text-stone-700 my-1" style={{ fontFamily: "'Lora', serif" }}>
                  SABTU
                </span>
                <span className="text-5xl font-bold my-1 text-[#9A6E76]" style={{ fontFamily: "'Lora', serif" }}>
                  24
                </span>
                <span className="uppercase text-sm tracking-widest text-stone-700 my-1" style={{ fontFamily: "'Lora', serif" }}>
                  OKTOBER 2026
                </span>

                <div className="flex items-center gap-1.5 text-xs text-stone-600 mt-2 mb-4 font-medium">
                  <Clock size={14} className="text-[#9A6E76]" />
                  <span>Pukul 11:00 - 14:00 WIB</span>
                </div>

                <div className="w-12 border-t border-stone-300 my-2" />

                <div className="text-center text-xs sm:text-sm text-stone-800 leading-relaxed my-2" style={{ fontFamily: "'Lora', serif" }}>
                  <strong className="block text-sm font-bold text-stone-900 mb-1">The Royal Ballroom Heritage</strong>
                  Jl. Slamet Riyadi No. 280, Sriwedari, Kec. Laweyan, Kota Surakarta, Jawa Tengah
                </div>

                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="mt-4 px-6 py-2.5 rounded-full text-white text-xs font-medium uppercase tracking-wider shadow hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-2"
                  style={{ background: 'linear-gradient(239.4deg, #D7A5AE 0%, #774B53 100%)' }}
                >
                  <MapPin size={13} />
                  <span>Lihat Lokasi</span>
                </a>
              </div>

            </div>

            {/* Bottom Twin Flower Ornament */}
            <div className="w-full mt-10 pointer-events-none leading-none">
              <img src={bgTwinFlower} alt="Twin Flower Ornament" className="w-full h-auto block" />
            </div>
          </section>

          {/* SECTION 7: Dresscode */}
          <section className="relative w-full py-16 px-6 overflow-hidden text-center bg-[#9A6E76] text-white">
            <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
              <h2 
                className="text-2xl sm:text-3xl uppercase tracking-wider mb-4 font-normal"
                style={{ fontFamily: "'Lora', serif" }}
              >
                DRESSCODE
              </h2>

              <div className="my-4 flex justify-center">
                <img src={bgDresscode} alt="Dresscode Illustration" className="w-28 sm:w-32 h-auto object-contain" />
              </div>

              <p 
                className="text-xs sm:text-sm leading-relaxed max-w-xs text-white/95 my-3"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Merupakan suatu kehormatan apabila Bapak/Ibu/Saudara/i berkenan mengenakan busana bernuansa warna berikut:
              </p>

              {/* Color Swatch Circles */}
              <div className="flex justify-center gap-3 sm:gap-4 my-5">
                {[
                  { color: '#D7A5AE', label: 'Soft Blush' },
                  { color: '#9A6E76', label: 'Dusty Rose' },
                  { color: '#774B53', label: 'Mauve Plum' },
                  { color: '#E6DED8', label: 'Warm Sand' },
                  { color: '#FFFFFF', label: 'Pure White' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <div 
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white/60 shadow-md transform hover:scale-110 transition-transform"
                      style={{ backgroundColor: item.color }}
                      title={item.label}
                    />
                    <span className="text-[9px] text-white/80 font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Duck & Twin Flower Ornament */}
            <div className="w-full mt-6 flex justify-center items-end relative" style={{ minHeight: '140px' }}>
              <img 
                src={bgBebek} 
                alt="Bebek" 
                className="absolute bottom-2 z-10 w-40 sm:w-44 h-auto left-1/2 transform -translate-x-1/2" 
              />
              <img 
                src={bgTwinFlower} 
                alt="Twin Flower" 
                className="w-full h-auto object-cover object-bottom relative z-20" 
              />
            </div>
          </section>

          {/* SECTION 8: Gallery & Moments */}
          <section className="relative w-full py-16 px-6 overflow-hidden text-center bg-[#E6DED8]">
            <div className="relative z-10 max-w-md mx-auto">
              <h2 
                className="text-5xl sm:text-6xl mb-6 capitalize"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                Our Gallery
              </h2>

              {/* Gallery Grid */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 my-6">
                {displayGallery.map((img: any, idx: number) => (
                  <div 
                    key={idx}
                    onClick={() => setActivePhoto(img.image_url)}
                    className="relative aspect-square rounded-2xl overflow-hidden shadow-md cursor-pointer group bg-stone-300 border border-[#9A6E76]/20"
                  >
                    <img 
                      src={img.image_url} 
                      alt={img.caption || `Gallery ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <ExternalLink size={20} className="drop-shadow" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION BORDER 3 */}
          <div className="relative w-full z-20 pointer-events-none border-t-2 border-b-2 border-[#9A6E76] bg-[#E6DED8] leading-none">
            <img src={bgBorder} alt="Lace Border" className="w-full h-auto object-cover object-top block" />
          </div>

          {/* SECTION 9: Amplop Digital & Kirim Hadiah */}
          <section className="relative w-full py-16 px-6 overflow-hidden text-center bg-[#E6DED8]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-35"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto">
              <h2 
                className="text-2xl sm:text-3xl uppercase tracking-wider mb-3 font-normal"
                style={{ fontFamily: "'Lora', serif", color: '#9A6E76' }}
              >
                WEDDING GIFT
              </h2>

              <p 
                className="text-xs sm:text-sm text-stone-700 leading-relaxed mb-6"
                style={{ fontFamily: "'Lora', serif" }}
              >
                Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih secara digital, Anda dapat melalui:
              </p>

              <button 
                onClick={() => setPaymentOpen(!paymentOpen)}
                className="px-8 py-3 rounded-full text-white text-xs font-semibold tracking-wider uppercase shadow-md hover:opacity-95 active:scale-95 transition-all inline-flex items-center gap-2"
                style={{ background: 'linear-gradient(239.54deg, #D7A5AE 0%, #774B53 100%)' }}
              >
                <Gift size={15} />
                <span>{paymentOpen ? 'Tutup Amplop Digital' : 'Kirim Kado / Amplop'}</span>
              </button>

              {/* Collapsible Payment Card */}
              {paymentOpen && (
                <div className="mt-8 space-y-4 text-left transition-all duration-300">
                  {defaultBankAccounts.map((account: any, idx: number) => (
                    <div 
                      key={idx}
                      className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-[#9A6E76]/25 shadow-md flex flex-col justify-between gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#774B53]" style={{ fontFamily: "'Lora', serif" }}>
                          {account.bank}
                        </span>
                        {account.logo && (
                          <img src={account.logo} alt={account.bank} className="h-5 max-w-[70px] object-contain" />
                        )}
                      </div>

                      <div className="my-1">
                        <p className="text-xl sm:text-2xl font-mono font-bold tracking-wider text-stone-800 select-all">
                          {account.no_rek}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-[#9A6E76]/15">
                        <span className="text-xs font-medium text-[#774B53]" style={{ fontFamily: "'Lora', serif" }}>
                          a.n {account.an}
                        </span>
                        <button 
                          onClick={() => copyToClipboard(account.no_rek, account.bank)}
                          className="px-3.5 py-1.5 rounded-full text-white text-[11px] font-medium tracking-wide uppercase shadow hover:opacity-90 active:scale-95 transition-all inline-flex items-center gap-1.5"
                          style={{ background: 'linear-gradient(239.54deg, #D7A5AE 0%, #774B53 100%)' }}
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
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 border border-[#9A6E76]/20 shadow-sm text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#774B53] mb-1" style={{ fontFamily: "'Lora', serif" }}>
                      Alamat Pengiriman Kado
                    </p>
                    <p className="text-xs text-stone-700 leading-relaxed my-2" style={{ fontFamily: "'Lora', serif" }}>
                      Kediaman Mempelai, Jl. Melati Putih No. 12, Solo, Jawa Tengah (Kode Pos: 57126)
                    </p>
                    <button 
                      onClick={() => copyToClipboard('Kediaman Mempelai, Jl. Melati Putih No. 12, Solo, Jawa Tengah (Kode Pos: 57126)', 'Alamat')}
                      className="mt-2 px-4 py-1.5 rounded-full text-white text-[11px] font-medium uppercase tracking-wider shadow inline-flex items-center gap-1.5"
                      style={{ background: 'linear-gradient(239.54deg, #D7A5AE 0%, #774B53 100%)' }}
                    >
                      <Copy size={12} />
                      <span>Salin Alamat</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bridge Ornament at bottom */}
            <div className="absolute bottom-0 left-0 w-full z-0 pointer-events-none opacity-40">
              <img src={bgBridge} alt="Bridge Ornament" className="w-full h-auto object-cover object-bottom" />
            </div>
          </section>

          {/* SECTION 10: RSVP & Kehadiran */}
          <section className="relative w-full py-16 px-6 overflow-hidden bg-[#E6DED8]">
            <div className="relative z-10 max-w-md mx-auto text-center">
              <h2 
                className="text-2xl sm:text-3xl uppercase tracking-wider mb-2 font-normal"
                style={{ fontFamily: "'Lora', serif", color: '#9A6E76' }}
              >
                RSVP
              </h2>
              <p 
                className="text-xs text-stone-600 mb-6"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Mohon konfirmasi kehadiran Anda demi kelancaran acara kami:
              </p>

              {/* RSVP Form */}
              <form onSubmit={handleRsvpSubmit} className="bg-white/90 backdrop-blur-md rounded-3xl p-6 border border-[#9A6E76]/25 shadow-lg text-left space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Nama Lengkap
                  </label>
                  <input 
                    type="text" 
                    required
                    value={rsvpName}
                    onChange={(e) => setRsvpName(e.target.value)}
                    placeholder="Masukkan nama Anda..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs focus:outline-none focus:border-[#9A6E76]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Konfirmasi Kehadiran
                  </label>
                  <select 
                    value={rsvpAttendance}
                    onChange={(e: any) => setRsvpAttendance(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs focus:outline-none focus:border-[#9A6E76]"
                  >
                    <option value="hadir">Hadir</option>
                    <option value="tidak_hadir">Tidak Hadir</option>
                    <option value="ragu">Masih Ragu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Jumlah Tamu
                  </label>
                  <select 
                    value={rsvpGuestCount}
                    onChange={(e) => setRsvpGuestCount(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs focus:outline-none focus:border-[#9A6E76]"
                  >
                    <option value="1">1 Orang</option>
                    <option value="2">2 Orang</option>
                    <option value="3">3 Orang</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Ucapan &amp; Doa Restu
                  </label>
                  <textarea 
                    rows={3}
                    value={rsvpWishes}
                    onChange={(e) => setRsvpWishes(e.target.value)}
                    placeholder="Tuliskan pesan & doa restu untuk kedua mempelai..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 bg-white text-stone-800 text-xs focus:outline-none focus:border-[#9A6E76] resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isRsvpSubmitting}
                  className="w-full py-3 rounded-full text-white text-xs font-semibold uppercase tracking-wider shadow-md hover:opacity-95 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                  style={{ background: 'linear-gradient(239.94deg, #D7A5AE 0%, #774B53 100%)' }}
                >
                  <Send size={13} />
                  <span>{isRsvpSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}</span>
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 11: Doa & Ucapan (Wishes List) */}
          <section className="relative w-full py-16 px-6 overflow-hidden bg-[#E6DED8]">
            <div className="relative z-10 max-w-md mx-auto text-center">
              <h2 
                className="text-4xl sm:text-5xl mb-6 capitalize"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                Doa &amp; Ucapan
              </h2>

              <div className="space-y-4 text-left">
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
                    style={{ background: 'linear-gradient(239.94deg, #D7A5AE 0%, #774B53 100%)' }}
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
                    style={{ background: 'linear-gradient(239.94deg, #D7A5AE 0%, #774B53 100%)' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 12: Penutup & Closing */}
          <section className="relative w-full pt-16 pb-28 px-6 overflow-hidden text-center bg-[#E7E0D3]">
            <div 
              className="absolute inset-0 z-0 bg-cover bg-center pointer-events-none opacity-30"
              style={{ backgroundImage: `url(${bgMempelai})` }}
            />

            <div className="relative z-10 max-w-md mx-auto flex flex-col items-center">
              <h2 
                className="text-4xl sm:text-5xl mb-3 capitalize"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                Terima Kasih
              </h2>
              <p 
                className="text-xs sm:text-sm text-stone-800 leading-relaxed mb-4 max-w-xs"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.
              </p>
              <p 
                className="text-xs sm:text-sm text-stone-800 font-light mb-2"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Wassalamu&apos;alaikum Wr. Wb.
              </p>
              <h3 
                className="text-3xl sm:text-4xl mb-8"
                style={{ fontFamily: "'Imperial Script', cursive", color: '#9A6E76' }}
              >
                Kami yang berbahagia
              </h3>

              {/* Closing Couple Photo Framed with Left & Right Borders */}
              <div className="relative flex justify-center items-center my-4">
                {/* Right Top Border */}
                <div className="absolute z-30 pointer-events-none -right-8 -top-6">
                  <img src={bgRightBorderClosing} alt="Ornament" className="w-32 sm:w-36 h-auto" />
                </div>

                {/* Arched Photo Frame */}
                <div 
                  className="relative z-20 w-[230px] sm:w-[250px] h-[330px] sm:h-[360px] rounded-[150px] overflow-hidden border-4 border-[#9A6E76] shadow-xl bg-stone-300"
                >
                  <img 
                    src={heroPhoto} 
                    alt="Closing Portrait" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Left Bottom Border */}
                <div className="absolute z-30 pointer-events-none -left-8 -bottom-4">
                  <img src={bgLeftBorderClosing} alt="Ornament" className="w-32 sm:w-36 h-auto" />
                </div>
              </div>

              <h4 
                className="text-3xl sm:text-4xl mt-6 text-[#774B53]"
                style={{ fontFamily: "'Imperial Script', cursive" }}
              >
                {groomNickname} &amp; {brideNickname}
              </h4>
            </div>

            {/* Bottom Flower wave */}
            <div className="w-full mt-10 pointer-events-none leading-none">
              <img src={bgStoryFlower} alt="Story Flower" className="w-full h-auto block scale-110 origin-bottom" />
            </div>
          </section>

          {/* SECTION BORDER 4 */}
          <div className="relative w-full z-20 pointer-events-none border-t-2 border-b-2 border-[#9A6E76] bg-[#9A6E76] leading-none">
            <img src={bgBorder} alt="Lace Border" className="w-full h-auto object-cover object-top block brightness-90 invert opacity-60" />
          </div>

          {/* FOOTER: WD Group Watermark */}
          <footer className="w-full py-8 text-center text-white bg-[#9A6E76]">
            <p className="text-xs tracking-wider opacity-90 font-sans">
              Undangan Pernikahan Digital Eksklusif oleh
            </p>
            <p className="text-sm font-bold tracking-widest uppercase mt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              WD GROUP
            </p>
            <div className="flex justify-center mt-3">
              <a 
                href="https://www.instagram.com/wdgroupcompany" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
                title="Instagram WD Group"
              >
                <InstagramIcon size={16} />
              </a>
            </div>
          </footer>

        </div>
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
