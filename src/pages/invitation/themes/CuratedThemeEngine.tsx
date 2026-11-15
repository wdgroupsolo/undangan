import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Calendar, Clock, MapPin, Copy, Check, Send, 
  Sparkles, Gift, Compass, MessageCircle, ChevronDown, 
  ExternalLink, Disc, Share2, Award, Bookmark, Moon, Sun, Flower2
} from 'lucide-react';

export const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

// =========================================================================
// MOTIF SVGS FOR EACH THEME
// =========================================================================

// 1. Sunda Siger Crown SVG
export const SundaSigerMotif: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#D4AF37' }) => (
  <svg width={size} height={size * 0.75} viewBox="0 0 64 48" fill="none">
    <path d="M4 40 C12 36, 18 32, 32 30 C46 32, 52 36, 60 40 L58 44 C44 40, 32 38, 6 44 Z" fill={color} opacity="0.85" />
    <path d="M32 6 L36 22 L46 16 L42 28 L54 26 L46 34 L32 32 L18 34 L10 26 L22 28 L18 16 L28 22 Z" fill={color} stroke={color} strokeWidth="1" />
    <circle cx="32" cy="10" r="3" fill="#FFF8E7" />
    <circle cx="18" cy="20" r="2.5" fill="#FFF8E7" />
    <circle cx="46" cy="20" r="2.5" fill="#FFF8E7" />
  </svg>
);

// 2. Minang Suntiang / Gonjong Roof Motif
export const MinangGonjongMotif: React.FC<{ size?: number; color?: string }> = ({ size = 36, color = '#E1A83E' }) => (
  <svg width={size} height={size * 0.65} viewBox="0 0 72 46" fill="none">
    <path d="M4 14 C16 32, 28 36, 36 36 C44 36, 56 32, 68 14 C62 30, 48 42, 36 42 C24 42, 10 30, 4 14 Z" fill={color} />
    <path d="M12 18 C18 6, 24 2, 26 2 C25 10, 23 22, 20 28 Z" fill={color} />
    <path d="M60 18 C54 6, 48 2, 46 2 C47 10, 49 22, 52 28 Z" fill={color} />
    <path d="M36 6 L38 24 L34 24 Z" fill={color} />
  </svg>
);

// 3. Bali Candi Bentar / Kamboja Flower Motif
export const BaliKambojaMotif: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#E4AC2D' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="5" fill="#FDF3A7" />
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <path
        key={i}
        d="M24 19 C21 8, 27 8, 24 2 C21 8, 27 8, 24 19 Z"
        fill={color}
        stroke="#FFF8E7"
        strokeWidth="0.8"
        transform={`rotate(${angle} 24 24)`}
      />
    ))}
  </svg>
);

// 4. Emerald Velvet Crest Motif
export const EmeraldCrestMotif: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#ECC880' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" stroke={color} strokeWidth="1.5" fill="none" />
    <polygon points="24,8 38,16 38,32 24,40 10,32 10,16" stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
    <path d="M24 16 L27 23 L34 24 L29 29 L30 36 L24 32 L18 36 L19 29 L14 24 L21 23 Z" fill={color} />
  </svg>
);

// 5. Rose Gold Peony Motif
export const RosePeonyMotif: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = '#D89B9B' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="6" fill={color} opacity="0.8" />
    <path d="M24 12 C28 12, 32 16, 32 20 C32 24, 28 28, 24 28 C20 28, 16 24, 16 20 C16 16, 20 12, 24 12 Z" stroke={color} strokeWidth="1.2" fill="none" />
    <path d="M14 24 C14 18, 18 14, 24 14 C30 14, 34 18, 34 24 C34 30, 30 34, 24 34 C18 34, 14 30, 14 24 Z" stroke={color} strokeWidth="1" fill="none" opacity="0.7" />
    <path d="M10 24 C10 16, 16 10, 24 10 C32 10, 38 16, 38 24 C38 32, 32 38, 24 38 C16 38, 10 32, 10 24 Z" stroke={color} strokeWidth="0.8" fill="none" opacity="0.4" />
  </svg>
);

// 6. Celestial Starlight Motif
export const CelestialStarMotif: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = '#CBD5E1' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z" fill={color} />
    <circle cx="38" cy="10" r="1.5" fill={color} />
    <circle cx="10" cy="38" r="1.5" fill={color} />
    <circle cx="12" cy="10" r="1" fill={color} opacity="0.7" />
    <circle cx="36" cy="38" r="1" fill={color} opacity="0.7" />
  </svg>
);

// 7. Terracotta Pampas Motif
export const TerracottaPampasMotif: React.FC<{ size?: number; color?: string }> = ({ size = 28, color = '#A3583E' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <path d="M10 44 Q 24 28 38 4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <path d="M38 4 Q 32 12 30 20" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    <path d="M38 4 Q 26 8 20 18" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
    <path d="M30 14 Q 20 20 16 30" stroke={color} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
  </svg>
);

// 8. Moroccan Arabesque Star Motif
export const MoroccanStarMotif: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#DE9B35' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="10" y="10" width="28" height="28" stroke={color} strokeWidth="1.2" fill="none" />
    <rect x="10" y="10" width="28" height="28" stroke={color} strokeWidth="1.2" fill="none" transform="rotate(45 24 24)" />
    <circle cx="24" cy="24" r="6" fill={color} opacity="0.4" stroke={color} strokeWidth="1" />
  </svg>
);

// 9. Burgundy Cameo Frame Motif
export const BurgundyCameoMotif: React.FC<{ size?: number; color?: string }> = ({ size = 32, color = '#B88B4A' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="24" rx="14" ry="19" stroke={color} strokeWidth="1.5" fill="none" />
    <ellipse cx="24" cy="24" rx="11" ry="16" stroke={color} strokeWidth="0.8" fill="none" opacity="0.6" />
    <circle cx="24" cy="10" r="2" fill={color} />
    <circle cx="24" cy="38" r="2" fill={color} />
    <circle cx="10" cy="24" r="2" fill={color} />
    <circle cx="38" cy="24" r="2" fill={color} />
  </svg>
);

// 10. Sakura Kyoto Blossom Motif
export const SakuraKyotoMotif: React.FC<{ size?: number; color?: string }> = ({ size = 30, color = '#F472B6' }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
    <circle cx="24" cy="24" r="4" fill="#FDE047" />
    {[0, 72, 144, 216, 288].map((angle, idx) => (
      <path
        key={idx}
        d="M24 20 C22 12, 18 8, 22 2 C24 6, 26 6, 26 2 C30 8, 26 12, 24 20 Z"
        fill={color}
        opacity="0.85"
        stroke="#FFF1F2"
        strokeWidth="0.8"
        transform={`rotate(${angle} 24 24)`}
      />
    ))}
  </svg>
);

// =========================================================================
// THEME CONFIGURATION DICTIONARY
// =========================================================================
export interface ThemePreset {
  slug: string;
  name: string;
  cultureTitle: string;
  bgMain: string;
  bgCard: string;
  textColor: string;
  textMuted: string;
  primaryColor: string;
  accentColor: string;
  borderColor: string;
  isDark: boolean;
  cornerClass: string;
  badgeText: string;
  motif: (color: string) => React.ReactNode;
}

export const CURATED_THEMES: Record<string, ThemePreset> = {
  'sunda-siger': {
    slug: 'sunda-siger',
    name: 'Sunda Siger Parahyangan',
    cultureTitle: 'Walimatulurus Adat Sunda',
    bgMain: '#F7F9F7',
    bgCard: '#FFFFFF',
    textColor: '#1E2D24',
    textMuted: '#586E60',
    primaryColor: '#2D4638',
    accentColor: '#D4AF37',
    borderColor: '#D4AF37',
    isDark: false,
    cornerClass: 'rounded-tl-[40px] rounded-br-[40px]',
    badgeText: 'Adat Sunda Parahyangan',
    motif: (c) => <SundaSigerMotif color={c} size={36} />
  },
  'minang-gadang': {
    slug: 'minang-gadang',
    name: 'Minang Rumah Gadang',
    cultureTitle: 'Baralek Gadang Minangkabau',
    bgMain: '#1A0E10',
    bgCard: '#271417',
    textColor: '#FFF6E9',
    textMuted: '#D8B8B8',
    primaryColor: '#801B2B',
    accentColor: '#E1A83E',
    borderColor: '#E1A83E',
    isDark: true,
    cornerClass: 'rounded-2xl',
    badgeText: 'Adat Minangkabau',
    motif: (c) => <MinangGonjongMotif color={c} size={40} />
  },
  'bali-kamasan': {
    slug: 'bali-kamasan',
    name: 'Bali Royal Kamasan',
    cultureTitle: 'Pawiwahan Agung Adat Bali',
    bgMain: '#FAF6EE',
    bgCard: '#FFFFFF',
    textColor: '#2E1E17',
    textMuted: '#785A4E',
    primaryColor: '#8A3D28',
    accentColor: '#E4AC2D',
    borderColor: '#E4AC2D',
    isDark: false,
    cornerClass: 'rounded-t-[44px] rounded-b-xl',
    badgeText: 'Adat Bali & Kamasan',
    motif: (c) => <BaliKambojaMotif color={c} size={34} />
  },
  'emerald-velvet': {
    slug: 'emerald-velvet',
    name: 'Emerald Velvet Royal',
    cultureTitle: 'Royal Luxury Velvet Banquet',
    bgMain: '#051811',
    bgCard: '#0C2A1E',
    textColor: '#F5FFF9',
    textMuted: '#A0C4B4',
    primaryColor: '#0E3E2D',
    accentColor: '#ECC880',
    borderColor: '#ECC880',
    isDark: true,
    cornerClass: 'rounded-3xl',
    badgeText: 'Royal Velvet Exclusive',
    motif: (c) => <EmeraldCrestMotif color={c} size={34} />
  },
  'rose-gold': {
    slug: 'rose-gold',
    name: 'Rose Gold Romance',
    cultureTitle: 'Dusty Rose & Peony Romance',
    bgMain: '#FFF7F8',
    bgCard: '#FFFFFF',
    textColor: '#332024',
    textMuted: '#805B63',
    primaryColor: '#B26974',
    accentColor: '#D89B9B',
    borderColor: '#E8B6BA',
    isDark: false,
    cornerClass: 'rounded-[32px]',
    badgeText: 'Paket Starter • Rose Gold',
    motif: (c) => <RosePeonyMotif color={c} size={32} />
  },
  'navy-silver': {
    slug: 'navy-silver',
    name: 'Midnight Celestial',
    cultureTitle: 'Starlight & Silver Constellation',
    bgMain: '#060B1A',
    bgCard: '#0E172F',
    textColor: '#F8FAFC',
    textMuted: '#94A3B8',
    primaryColor: '#1E293B',
    accentColor: '#CBD5E1',
    borderColor: '#94A3B8',
    isDark: true,
    cornerClass: 'rounded-2xl',
    badgeText: 'Celestial Starlight Gala',
    motif: (c) => <CelestialStarMotif color={c} size={32} />
  },
  'terracotta-boho': {
    slug: 'terracotta-boho',
    name: 'Terracotta Boho Rustic',
    cultureTitle: 'Bohemian Sunset & Pampas',
    bgMain: '#FBF5EE',
    bgCard: '#FFFFFF',
    textColor: '#2E1D16',
    textMuted: '#785E53',
    primaryColor: '#A3583E',
    accentColor: '#C88D76',
    borderColor: '#DDBBAE',
    isDark: false,
    cornerClass: 'rounded-t-full rounded-b-2xl',
    badgeText: 'Paket Starter • Boho Rustic',
    motif: (c) => <TerracottaPampasMotif color={c} size={32} />
  },
  'moroccan-nights': {
    slug: 'moroccan-nights',
    name: 'Moroccan Arabian Nights',
    cultureTitle: 'Kubah Moresque & Golden Lantern',
    bgMain: '#0A172E',
    bgCard: '#122547',
    textColor: '#FFF9EF',
    textMuted: '#C2CEDB',
    primaryColor: '#18305A',
    accentColor: '#DE9B35',
    borderColor: '#DE9B35',
    isDark: true,
    cornerClass: 'rounded-t-[60px] rounded-b-2xl',
    badgeText: 'Arabian Moroccan Heritage',
    motif: (c) => <MoroccanStarMotif color={c} size={34} />
  },
  'burgundy-wine': {
    slug: 'burgundy-wine',
    name: 'Burgundy Wine Classic',
    cultureTitle: 'Bordeaux Velvet & Antique Bronze',
    bgMain: '#1F050A',
    bgCard: '#2E0911',
    textColor: '#FFF7F8',
    textMuted: '#D4B4B9',
    primaryColor: '#480D17',
    accentColor: '#B88B4A',
    borderColor: '#B88B4A',
    isDark: true,
    cornerClass: 'rounded-[30px]',
    badgeText: 'Classic Bordeaux Banquet',
    motif: (c) => <BurgundyCameoMotif color={c} size={34} />
  },
  'sakura-hanami': {
    slug: 'sakura-hanami',
    name: 'Sakura Kyoto Blossom',
    cultureTitle: 'Kyoto Cherry Blossom & Washi',
    bgMain: '#FCFAF8',
    bgCard: '#FFFFFF',
    textColor: '#241E20',
    textMuted: '#736067',
    primaryColor: '#BE395B',
    accentColor: '#F472B6',
    borderColor: '#F9A8D4',
    isDark: false,
    cornerClass: 'rounded-3xl',
    badgeText: 'Oriental Kyoto Blossom',
    motif: (c) => <SakuraKyotoMotif color={c} size={34} />
  }
};

interface CuratedThemeEngineProps {
  themeSlug: string;
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

export const CuratedThemeEngine: React.FC<CuratedThemeEngineProps> = ({
  themeSlug,
  invitation,
  couple,
  events,
  gallery,
  gifts,
  guestName = 'Tamu Undangan',
}) => {
  const preset: ThemePreset = CURATED_THEMES[themeSlug] || CURATED_THEMES['sunda-siger'];

  const [activeTab, setActiveTab] = useState<'opening' | 'couple' | 'event' | 'story' | 'gallery' | 'gift' | 'wishes'>('opening');
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
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
      message: 'Selamat menempuh hidup baru. Semoga senantiasa sakinah, mawaddah, warahmah serta diberkahi keberlimpahan rezeki dan kebahagiaan.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: '2',
      name: 'Rian & Sarah',
      message: 'Happy wedding! Desain undangannya sangat berkesan dan anggun. Bahagia selalu sampai akhir hayat.',
      date: '1 jam yang lalu',
      status: 'attending'
    }
  ]);

  // Countdown timer
  const weddingDateStr = invitation?.wedding_date || '2026-12-28T09:00:00+07:00';
  const [timeLeft, setTimeLeft] = useState({ days: 45, hours: 14, minutes: 28, seconds: 15 });

  useEffect(() => {
    const updateTimer = () => {
      const now = Date.now();
      let target = new Date(weddingDateStr).getTime();
      if (isNaN(target) || target <= now) {
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

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2500);
  };

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

  // Safe couple display data
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
      location_name: 'The Grand Ballroom',
      address: 'Jl. Jenderal Sudirman Kav. 12, Jakarta Pusat',
      maps_url: 'https://maps.google.com'
    }
  ];

  // Love Story Milestones
  const loveStories = [
    {
      year: '2022',
      title: 'Pertemuan Pertama',
      desc: 'Takdir mempertemukan kami dalam satu ruang dan waktu yang sederhana, memulai kisah penuh tawa dan percakapan tulus.'
    },
    {
      year: '2024',
      title: 'Menjalin Komitmen',
      desc: 'Dua hati yang sepakat untuk saling melengkapi, belajar memahami, dan bertumbuh bersama dalam ikatan cinta.'
    },
    {
      year: '2025',
      title: 'Ikrar Lamaran',
      desc: 'Dengan restu kedua orang tua dan keluarga besar, langkah suci diresmikan menuju mahligai pernikahan.'
    },
    {
      year: '2026',
      title: 'Hari Kemenangan Cinta',
      desc: 'Bersama Anda yang terkasih, kami mengikrarkan janji suci di hadapan Sang Maha Kuasa.'
    }
  ];

  // Gallery items
  const galleryItems = (gallery && gallery.length >= 3) ? gallery.slice(0, 3) : [
    { id: 'g1', image_url: couplePhoto, caption: 'Janji Suci Dua Insan', tag: 'The Beginning' },
    { id: 'g2', image_url: '/photos/photo-1.jpg', caption: 'Kisah Kasih Abadi', tag: 'Romantic Walk' },
    { id: 'g3', image_url: '/photos/photo-5.jpg', caption: 'Langkah Menuju Hari Bahagia', tag: 'Forever Yours' }
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
    <div 
      className="relative min-h-screen font-sans selection:bg-amber-400 selection:text-black antialiased transition-colors duration-500"
      style={{ backgroundColor: preset.bgMain, color: preset.textColor }}
    >
      {/* Background Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 10%, ${preset.accentColor}18 0%, transparent 65%)`
          }}
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-6 pb-28">

        {/* ================================================================= */}
        {/* SECTION 1: HERO / OPENING CARD                                    */}
        {/* ================================================================= */}
        <section id="section-opening" className="min-h-[85vh] flex flex-col items-center justify-center pt-4 pb-12">
          <div 
            className={`relative w-full p-6 sm:p-8 border shadow-xl flex flex-col items-center text-center ${preset.cornerClass}`}
            style={{ 
              backgroundColor: preset.bgCard, 
              borderColor: `${preset.borderColor}55`,
              boxShadow: `0 20px 50px ${preset.isDark ? 'rgba(0,0,0,0.7)' : 'rgba(160,140,120,0.18)'}`
            }}
          >
            {/* Theme Motif */}
            <div className="mb-3">
              {preset.motif(preset.accentColor)}
            </div>

            {/* Culture / Category Tag */}
            <span 
              className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.28em] font-bold mb-3 px-3 py-0.5 rounded-full border"
              style={{ 
                color: preset.accentColor,
                borderColor: `${preset.accentColor}40`,
                backgroundColor: preset.isDark ? 'rgba(255,255,255,0.05)' : `${preset.accentColor}15`
              }}
            >
              {preset.cultureTitle}
            </span>

            {/* Couple Photo in Themed Frame */}
            <div 
              className="relative w-48 h-64 sm:w-56 sm:h-72 overflow-hidden p-1.5 shadow-lg mb-6 group rounded-t-[100px] rounded-b-2xl border-2"
              style={{ borderColor: preset.accentColor }}
            >
              <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                <img 
                  src={couplePhoto} 
                  alt={`${groomName} & ${brideName}`}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Couple Names */}
            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              {groomName} <span className="font-light italic" style={{ color: preset.accentColor }}>&amp;</span> {brideName}
            </h1>

            {/* Date */}
            <p className="text-xs sm:text-sm font-sans tracking-[0.2em] uppercase mb-6 font-medium" style={{ color: preset.textMuted }}>
              {new Date(weddingDateStr).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
            </p>

            {/* Guest Greeting Box */}
            <div 
              className="w-full max-w-xs p-3 rounded-2xl border mb-6 shadow-xs"
              style={{ 
                backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)',
                borderColor: `${preset.borderColor}40`
              }}
            >
              <span className="text-[10px] uppercase tracking-widest block mb-0.5" style={{ color: preset.textMuted }}>
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="font-serif text-sm font-bold block truncate" style={{ color: preset.accentColor }}>
                {guestName}
              </span>
            </div>

            {/* Countdown Timer */}
            <div className="w-full max-w-sm pt-4 border-t flex items-center justify-between px-2" style={{ borderColor: `${preset.borderColor}30` }}>
              {[
                { label: 'Hari', val: timeLeft.days },
                { label: 'Jam', val: timeLeft.hours },
                { label: 'Menit', val: timeLeft.minutes },
                { label: 'Detik', val: timeLeft.seconds },
              ].map((item, idx) => (
                <React.Fragment key={idx}>
                  <div className="flex flex-col items-center">
                    <span className="font-mono text-xl sm:text-2xl font-bold" style={{ color: preset.accentColor }}>
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest font-semibold mt-0.5" style={{ color: preset.textMuted }}>
                      {item.label}
                    </span>
                  </div>
                  {idx < 3 && <div className="h-6 w-[1px]" style={{ backgroundColor: `${preset.borderColor}35` }} />}
                </React.Fragment>
              ))}
            </div>

          </div>

          <div className="flex flex-col items-center gap-1.5 mt-6 animate-bounce" style={{ color: preset.accentColor }}>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">Scroll Ke Bawah</span>
            <ChevronDown size={14} />
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 2: GREETING & AYAT SUCI                                   */}
        {/* ================================================================= */}
        <section className="py-10 text-center">
          <div 
            className={`p-6 sm:p-8 border shadow-sm ${preset.cornerClass}`}
            style={{ 
              backgroundColor: preset.bgCard,
              borderColor: `${preset.borderColor}40`
            }}
          >
            <div className="mb-3">
              {preset.motif(preset.accentColor)}
            </div>

            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-3" style={{ color: preset.accentColor }}>
              Doa &amp; Harapan Suci
            </span>

            <p className="font-serif italic text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-4" style={{ color: preset.textColor }}>
              &ldquo;Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.&rdquo;
            </p>
            
            <span className="text-xs font-sans tracking-widest uppercase font-semibold" style={{ color: preset.accentColor }}>
              (QS. Ar-Rum: 21)
            </span>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 3: MEMPELAI PROFILES                                      */}
        {/* ================================================================= */}
        <section id="section-couple" className="py-12 space-y-8">
          <div className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Kedua Mempelai
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Maha Suci Allah yang Mempersatukan
            </h2>
          </div>

          {/* Groom Card */}
          <div 
            className={`p-6 border shadow-sm flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left ${preset.cornerClass}`}
            style={{ 
              backgroundColor: preset.bgCard, 
              borderColor: `${preset.borderColor}40` 
            }}
          >
            <div 
              className="relative w-32 h-40 sm:w-36 sm:h-44 overflow-hidden p-1 shrink-0 shadow-md rounded-2xl border-2"
              style={{ borderColor: preset.accentColor }}
            >
              <img 
                src={groomPhoto} 
                alt={groomFullName}
                className="w-full h-full object-cover object-center rounded-xl" 
              />
            </div>
            <div className="flex-1 space-y-2">
              <span 
                className="inline-block px-3 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider"
                style={{ 
                  color: preset.accentColor,
                  borderColor: `${preset.accentColor}50`,
                  backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : `${preset.accentColor}15`
                }}
              >
                Mempelai Pria
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {groomFullName}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: preset.textMuted }}>
                {groomParents}
              </p>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity"
                style={{ color: preset.accentColor }}
              >
                <InstagramIcon size={14} />
                <span>@{groomName.toLowerCase()}_pratama</span>
              </a>
            </div>
          </div>

          {/* Ampersand Divider */}
          <div className="flex items-center justify-center py-2">
            <div className="w-12 h-[1px]" style={{ backgroundColor: `${preset.borderColor}40` }} />
            <span className="font-serif italic text-2xl px-4 font-light" style={{ color: preset.accentColor }}>&amp;</span>
            <div className="w-12 h-[1px]" style={{ backgroundColor: `${preset.borderColor}40` }} />
          </div>

          {/* Bride Card */}
          <div 
            className={`p-6 border shadow-sm flex flex-col sm:flex-row-reverse items-center gap-6 text-center sm:text-right ${preset.cornerClass}`}
            style={{ 
              backgroundColor: preset.bgCard, 
              borderColor: `${preset.borderColor}40` 
            }}
          >
            <div 
              className="relative w-32 h-40 sm:w-36 sm:h-44 overflow-hidden p-1 shrink-0 shadow-md rounded-2xl border-2"
              style={{ borderColor: preset.accentColor }}
            >
              <img 
                src={bridePhoto} 
                alt={brideFullName}
                className="w-full h-full object-cover object-center rounded-xl" 
              />
            </div>
            <div className="flex-1 space-y-2">
              <span 
                className="inline-block px-3 py-0.5 rounded-full border text-[10px] uppercase font-bold tracking-wider"
                style={{ 
                  color: preset.accentColor,
                  borderColor: `${preset.accentColor}50`,
                  backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : `${preset.accentColor}15`
                }}
              >
                Mempelai Wanita
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold">
                {brideFullName}
              </h3>
              <p className="text-xs leading-relaxed" style={{ color: preset.textMuted }}>
                {brideParents}
              </p>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium hover:opacity-80 transition-opacity"
                style={{ color: preset.accentColor }}
              >
                <InstagramIcon size={14} />
                <span>@{brideName.toLowerCase()}_lestari</span>
              </a>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 4: LOVE STORY TIMELINE                                    */}
        {/* ================================================================= */}
        <section id="section-story" className="py-12 space-y-6">
          <div className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Kisah Kasih
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Perjalanan Dua Insan
            </h2>
          </div>

          <div className="relative border-l-2 ml-4 sm:ml-6 space-y-8 pl-6" style={{ borderColor: `${preset.borderColor}50` }}>
            {loveStories.map((story, idx) => (
              <div key={idx} className="relative">
                <div 
                  className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 shadow-xs flex items-center justify-center"
                  style={{ backgroundColor: preset.bgCard, borderColor: preset.accentColor }}
                >
                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                </div>

                <div 
                  className={`p-4 sm:p-5 border shadow-xs ${preset.cornerClass}`}
                  style={{ backgroundColor: preset.bgCard, borderColor: `${preset.borderColor}35` }}
                >
                  <span 
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full border inline-block mb-1.5"
                    style={{ 
                      color: preset.accentColor,
                      borderColor: `${preset.accentColor}40`,
                      backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : `${preset.accentColor}15`
                    }}
                  >
                    {story.year}
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold mb-1">
                    {story.title}
                  </h3>
                  <p className="text-xs leading-relaxed" style={{ color: preset.textMuted }}>
                    {story.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 5: EVENTS / RANGKAIAN ACARA                               */}
        {/* ================================================================= */}
        <section id="section-event" className="py-12 space-y-6">
          <div className="text-center mb-6">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Jadwal &amp; Lokasi
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Rangkaian Acara
            </h2>
          </div>

          {mainEvents.map((evt, idx) => (
            <div 
              key={evt.id || idx}
              className={`p-6 border shadow-sm ${preset.cornerClass}`}
              style={{ backgroundColor: preset.bgCard, borderColor: `${preset.borderColor}40` }}
            >
              <div className="flex items-center justify-between border-b pb-4 mb-5" style={{ borderColor: `${preset.borderColor}30` }}>
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                    style={{ borderColor: `${preset.accentColor}40`, color: preset.accentColor }}
                  >
                    <Calendar size={15} />
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold">
                    {evt.title}
                  </h3>
                </div>
                <span 
                  className="text-[11px] font-sans font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                  style={{ 
                    color: preset.accentColor, 
                    borderColor: `${preset.accentColor}40`,
                    backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : `${preset.accentColor}15`
                  }}
                >
                  Sesi {idx + 1}
                </span>
              </div>

              <div className="space-y-3.5 mb-6 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="shrink-0 mt-0.5" style={{ color: preset.accentColor }} />
                  <span className="font-medium">{evt.date}</span>
                </div>

                <div className="flex items-start gap-3">
                  <Clock size={16} className="shrink-0 mt-0.5" style={{ color: preset.accentColor }} />
                  <span>{evt.time}</span>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={16} className="shrink-0 mt-0.5" style={{ color: preset.accentColor }} />
                  <div>
                    <p className="font-bold">{evt.location_name}</p>
                    <p className="text-xs mt-0.5" style={{ color: preset.textMuted }}>{evt.address}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a 
                  href={evt.maps_url || 'https://maps.google.com'} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-opacity hover:opacity-90"
                  style={{ 
                    borderColor: `${preset.accentColor}50`, 
                    color: preset.accentColor,
                    backgroundColor: preset.isDark ? 'rgba(255,255,255,0.05)' : `${preset.accentColor}10`
                  }}
                >
                  <Compass size={14} />
                  <span>Google Maps</span>
                </a>

                <a 
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.title + ' ' + groomName + ' & ' + brideName)}&details=${encodeURIComponent('Pernikahan ' + groomName + ' & ' + brideName + ' di ' + evt.location_name)}&location=${encodeURIComponent(evt.address)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-white text-xs font-semibold shadow-xs"
                  style={{ backgroundColor: preset.primaryColor }}
                >
                  <Bookmark size={14} />
                  <span>Simpan Agenda</span>
                </a>
              </div>
            </div>
          ))}
        </section>

        {/* ================================================================= */}
        {/* SECTION 6: GALLERY                                                */}
        {/* ================================================================= */}
        <section id="section-gallery" className="py-12 space-y-6">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Galeri Momen
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Potret Kebahagiaan
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {galleryItems.map((item, idx) => (
              <div 
                key={item.id || idx}
                onClick={() => setSelectedPhoto(item.image_url)}
                className="relative group cursor-pointer overflow-hidden p-2.5 pb-4 border shadow-xs hover:shadow-md transition-all rounded-2xl"
                style={{ backgroundColor: preset.bgCard, borderColor: `${preset.borderColor}40` }}
              >
                <div className="aspect-[4/5] rounded-xl overflow-hidden mb-2.5 bg-black/10">
                  <img 
                    src={item.image_url} 
                    alt={item.caption || 'Foto Prewedding'} 
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="px-1 text-center">
                  <span className="text-[9px] font-mono uppercase tracking-widest block" style={{ color: preset.accentColor }}>
                    {item.tag || `Momen ${idx + 1}`}
                  </span>
                  <p className="text-xs font-serif font-medium mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

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
        {/* SECTION 7: WEDDING GIFT / KADO DIGITAL                            */}
        {/* ================================================================= */}
        <section id="section-gift" className="py-12 space-y-6">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Tanda Kasih
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Kado &amp; Amplop Digital
            </h2>
          </div>

          <div className="space-y-4">
            {bankAccounts.map((bank, idx) => (
              <div 
                key={bank.id || idx}
                className={`p-5 sm:p-6 border shadow-sm ${preset.cornerClass}`}
                style={{ backgroundColor: preset.bgCard, borderColor: `${preset.borderColor}40` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl border flex items-center justify-center"
                      style={{ borderColor: `${preset.accentColor}50`, color: preset.accentColor }}
                    >
                      <Gift size={18} />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider block">
                        {bank.bank_name}
                      </span>
                      <span className="text-[11px]" style={{ color: preset.textMuted }}>Transfer Bank Digital</span>
                    </div>
                  </div>
                  <span 
                    className="text-[10px] font-serif font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                    style={{ 
                      color: preset.accentColor,
                      borderColor: `${preset.accentColor}40`,
                      backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : `${preset.accentColor}15`
                    }}
                  >
                    Terverifikasi
                  </span>
                </div>

                <div 
                  className="p-3.5 rounded-xl border flex items-center justify-between gap-3"
                  style={{ 
                    backgroundColor: preset.isDark ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)',
                    borderColor: `${preset.borderColor}30`
                  }}
                >
                  <div>
                    <p className="text-[10px] uppercase tracking-wider" style={{ color: preset.textMuted }}>Nomor Rekening:</p>
                    <p className="font-mono text-base sm:text-lg font-bold tracking-wider mt-0.5">
                      {bank.account_number}
                    </p>
                    <p className="text-xs mt-0.5" style={{ color: preset.textMuted }}>
                      a.n {bank.account_holder}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(bank.account_number, bank.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer text-white shadow-xs"
                    style={{ backgroundColor: copiedAccount === bank.id ? '#10B981' : preset.primaryColor }}
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
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* SECTION 8: RSVP & WISHES                                          */}
        {/* ================================================================= */}
        <section id="section-wishes" className="py-12 space-y-6">
          <div className="text-center mb-4">
            <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold block mb-2" style={{ color: preset.accentColor }}>
              Konfirmasi Kehadiran
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              RSVP &amp; Doa Restu
            </h2>
          </div>

          <div 
            className={`p-6 border shadow-sm ${preset.cornerClass}`}
            style={{ backgroundColor: preset.bgCard, borderColor: `${preset.borderColor}40` }}
          >
            {rsvpSuccess && (
              <div className="mb-5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs flex items-center gap-2.5">
                <Check size={16} className="shrink-0" />
                <span>Terima kasih! Konfirmasi kehadiran dan doa restu Anda telah tersimpan.</span>
              </div>
            )}

            <form onSubmit={handleSubmitRsvp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: preset.textMuted }}>
                  Nama Lengkap *
                </label>
                <input 
                  type="text" 
                  value={rsvpName}
                  onChange={(e) => setRsvpName(e.target.value)}
                  placeholder="Contoh: Bpk. Budi Santoso & Keluarga"
                  required
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                  style={{ 
                    backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)',
                    borderColor: `${preset.borderColor}40`,
                    color: preset.textColor
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: preset.textMuted }}>
                  Konfirmasi Kehadiran *
                </label>
                <select
                  value={rsvpStatus}
                  onChange={(e) => setRsvpStatus(e.target.value as any)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors"
                  style={{ 
                    backgroundColor: preset.isDark ? '#141824' : '#FFFFFF',
                    borderColor: `${preset.borderColor}40`,
                    color: preset.textColor
                  }}
                >
                  <option value="attending">✓ Hadir Memenuhi Undangan</option>
                  <option value="uncertain">? Masih Ragu / Belum Pasti</option>
                  <option value="absent">✕ Maaf, Berhalangan Hadir</option>
                </select>
              </div>

              {rsvpStatus === 'attending' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: preset.textMuted }}>
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
                            ? 'text-white shadow-xs'
                            : 'border hover:opacity-80'
                        }`}
                        style={{
                          backgroundColor: rsvpCount === num ? preset.primaryColor : (preset.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)'),
                          borderColor: `${preset.borderColor}40`,
                          color: rsvpCount === num ? '#FFFFFF' : preset.textColor
                        }}
                      >
                        {num === 3 ? '3+ Orang' : `${num} Orang`}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1.5" style={{ color: preset.textMuted }}>
                  Ucapan &amp; Doa Restu *
                </label>
                <textarea 
                  value={rsvpMessage}
                  onChange={(e) => setRsvpMessage(e.target.value)}
                  rows={3}
                  placeholder="Tuliskan ucapan selamat serta doa restu tulus Anda..."
                  required
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none transition-colors resize-none"
                  style={{ 
                    backgroundColor: preset.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.02)',
                    borderColor: `${preset.borderColor}40`,
                    color: preset.textColor
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmittingRsvp}
                className="w-full py-3.5 px-6 rounded-2xl text-white font-serif text-sm font-bold tracking-widest uppercase shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 hover:brightness-105"
                style={{ backgroundColor: preset.primaryColor }}
              >
                <Send size={15} />
                <span>{isSubmittingRsvp ? 'Mengirim...' : 'Kirim RSVP & Doa Restu'}</span>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t space-y-3" style={{ borderColor: `${preset.borderColor}30` }}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider" style={{ color: preset.textMuted }}>
                  Ucapan Tamu ({wishes.length})
                </span>
                <span className="text-[10px] font-semibold" style={{ color: preset.accentColor }}>Terkonfirmasi</span>
              </div>

              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {wishes.map((w) => (
                  <div 
                    key={w.id} 
                    className="p-3.5 rounded-2xl border text-xs"
                    style={{ 
                      backgroundColor: preset.isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)',
                      borderColor: `${preset.borderColor}25`
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold">{w.name}</span>
                      <span className="text-[10px]" style={{ color: preset.accentColor }}>{w.date}</span>
                    </div>
                    <p className="leading-relaxed mt-1" style={{ color: preset.textMuted }}>
                      {w.message}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* CLOSING / FOOTER                                                  */}
        {/* ================================================================= */}
        <footer className="pt-8 pb-12 text-center space-y-4">
          <div className="mx-auto flex justify-center">
            {preset.motif(preset.accentColor)}
          </div>

          <h3 className="font-serif text-2xl font-bold">
            {groomName} &amp; {brideName}
          </h3>

          <p className="text-xs max-w-xs mx-auto leading-relaxed" style={{ color: preset.textMuted }}>
            Terima kasih atas doa restu dan kehadiran Bapak/Ibu/Saudara/i di hari bahagia kami.
          </p>

          <p className="text-[10px] tracking-widest uppercase font-semibold pt-4" style={{ color: preset.accentColor }}>
            WD DIGITAL INVITATION • {preset.badgeText.toUpperCase()}
          </p>
        </footer>

      </div>

      {/* ================================================================= */}
      {/* BOTTOM FLOATING NAVIGATION BAR                                    */}
      {/* ================================================================= */}
      <nav 
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md backdrop-blur-md border rounded-full py-2 px-3 shadow-2xl flex items-center justify-around"
        style={{ 
          backgroundColor: preset.isDark ? 'rgba(15,23,42,0.92)' : 'rgba(255,255,255,0.92)',
          borderColor: `${preset.borderColor}50`
        }}
      >
        {[
          { id: 'section-opening', tab: 'opening' as const, label: 'Sampul', icon: Calendar },
          { id: 'section-couple', tab: 'couple' as const, label: 'Mempelai', icon: Heart },
          { id: 'section-story', tab: 'story' as const, label: 'Cerita', icon: Bookmark },
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
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-full transition-all cursor-pointer ${
                isActive ? 'font-bold scale-105' : 'hover:opacity-80'
              }`}
              style={{
                color: isActive ? preset.accentColor : preset.textMuted,
                backgroundColor: isActive ? (preset.isDark ? 'rgba(255,255,255,0.1)' : `${preset.accentColor}20`) : 'transparent'
              }}
            >
              <Icon size={15} />
              <span className="text-[8.5px] tracking-wider uppercase mt-0.5">{item.label}</span>
            </button>
          );
        })}
      </nav>

    </div>
  );
};
