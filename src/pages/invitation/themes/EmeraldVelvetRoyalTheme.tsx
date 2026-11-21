import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, Copy, Check, 
  ChevronLeft, ChevronRight, Gift,
  X, Navigation, 
  Clock, Sparkles, ShieldCheck,
  Crown, Star, Award, CreditCard, Send,
  Maximize2, Package, MessageCircle, QrCode, Download, ExternalLink,
  Heart, User, Users, Shirt, Car, Wifi, Info, CheckCircle2, Compass, Gem
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode } from '../../../utils/barcodePass';

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

// Victorian Royal Gilded Acanthus Corner Ornaments for High-End Folios
export const EmeraldGoldCorner: React.FC<{ color?: string; size?: number; className?: string }> = ({ 
  color = '#ECC880', 
  size = 48,
  className = ''
}) => (
  <>
    {/* Top Left */}
    <div className={`absolute top-2 left-2 pointer-events-none opacity-90 z-20 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="emeraldGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="35%" stopColor="#ECC880" />
            <stop offset="75%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
        </defs>
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Top Right */}
    <div className={`absolute top-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Bottom Left */}
    <div className={`absolute bottom-2 left-2 pointer-events-none opacity-90 z-20 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
    {/* Bottom Right */}
    <div className={`absolute bottom-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#emeraldGoldGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#emeraldGoldGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#emeraldGoldGrad)" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#emeraldGoldGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#emeraldGoldGrad)" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    </div>
  </>
);

// High-end EMV Smart Gold Chip for Bank / Priority Cards
export const EMVGoldSmartChip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`w-11 h-8 rounded-md bg-gradient-to-br from-[#FFE9A0] via-[#D4AF37] to-[#8C6D2B] p-[1.5px] shadow-sm relative overflow-hidden flex-shrink-0 ${className}`}>
    <div className="w-full h-full rounded-[4px] bg-gradient-to-br from-[#E8D5A3] via-[#C5A059] to-[#997632] relative flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#61450C]/60" />
      <div className="absolute inset-y-0 left-1/3 w-[1px] bg-[#61450C]/60" />
      <div className="absolute inset-y-0 right-1/3 w-[1px] bg-[#61450C]/60" />
      <div className="w-4 h-3.5 rounded-sm border border-[#61450C]/70 relative z-1 bg-[#D4AF37]/40" />
    </div>
  </div>
);

// Bank Guilloche Fine-Line Watermark
export const GuillocheVelvetWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.06,
  className = ''
}) => (
  <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="guillochePatternEmerald" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="50" fill="none" stroke="#ECC880" strokeWidth="0.5" strokeDasharray="3 3" />
          <circle cx="60" cy="60" r="35" fill="none" stroke="#ECC880" strokeWidth="0.5" />
          <path d="M10 60 Q 60 10, 110 60 Q 60 110, 10 60 Z" fill="none" stroke="#ECC880" strokeWidth="0.4" />
          <path d="M60 10 Q 110 60, 60 110 Q 10 60, 60 10 Z" fill="none" stroke="#ECC880" strokeWidth="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#guillochePatternEmerald)" />
    </svg>
  </div>
);

// Floating Shimmering Emerald & Gold Stardust Particles
export const FloatingEmeraldStardust: React.FC<{ count?: number; className?: string }> = ({ count = 16, className = '' }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${(i % 3) * 2 + 2}px`,
            height: `${(i % 3) * 2 + 2}px`,
            backgroundColor: i % 2 === 0 ? '#ECC880' : '#4ADE80',
            top: `${(i * 17) % 95}%`,
            left: `${(i * 23) % 95}%`,
            opacity: (i % 6 + 3) / 10,
            filter: 'blur(0.5px) drop-shadow(0 0 6px #ECC880)',
            animation: `pulse ${(i % 3) + 2}s ease-in-out infinite alternate`,
            animationDelay: `${i * 0.2}s`
          }}
        />
      ))}
    </div>
  );
};

// Royal Crown Crest Monogram
export const EmeraldRoyalCrest: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg'; className?: string }> = ({
  initials,
  size = 'md',
  className = ''
}) => {
  const dim = size === 'sm' ? 'w-16 h-16' : size === 'lg' ? 'w-28 h-28' : 'w-20 h-20';
  const textSz = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-xl' : 'text-sm';
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <div className={`${dim} rounded-full bg-gradient-to-br from-[#ECC880] via-[#C5A059] to-[#8C6D2B] p-[2px] shadow-[0_4px_16px_rgba(0,0,0,0.5)]`}>
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#0c3123] via-[#072117] to-[#04150E] flex flex-col items-center justify-center border border-[#ECC880]/60 text-[#ECC880]">
          <Crown className="w-4 h-4 text-[#ECC880] mb-0.5" />
          <span className={`font-serif font-bold tracking-widest text-[#FFF8E2] ${textSz}`}>
            {initials}
          </span>
        </div>
      </div>
    </div>
  );
};

export interface EmeraldVelvetRoyalThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: any;
  isOpening?: boolean;
  guestName?: string;
}

export const EmeraldVelvetRoyalTheme: React.FC<EmeraldVelvetRoyalThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  guestName: propGuestName
}) => {
  const toast = useToast();

  const [activeSection, setActiveSection] = useState('cover');
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [activeGalleryTab, setActiveGalleryTab] = useState<'all' | 'prewedding' | 'ceremony' | 'reception'>('all');
  const [giftTab, setGiftTab] = useState<'transfer' | 'physical'>('transfer');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [calendarModalEvent, setCalendarModalEvent] = useState<CalendarEventData | null>(null);
  const [attireGender, setAttireGender] = useState<'gentlemen' | 'ladies'>('gentlemen');
  const [selectedSwatch, setSelectedSwatch] = useState<string | null>(null);

  // Guest Name Resolution
  const guestName = (() => {
    if (propGuestName && propGuestName.trim() !== '') return propGuestName.trim();
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const to = urlParams.get('to');
      if (to && to.trim()) {
        return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
      }
    }
    return invitation?.settings?.default_guest_name || 'Tamu Undangan';
  })();

  // Couple Info
  const groomName = couple?.groom_nickname || couple?.groom_name || 'Steven';
  const brideName = couple?.bride_nickname || couple?.bride_name || 'Bunga';
  const groomFullName = couple?.groom_full_name || couple?.groom_name || 'Steven Pratama, S.Kom.';
  const brideFullName = couple?.bride_full_name || couple?.bride_name || 'Bunga Citra Lestari, S.E.';
  const groomParents = couple?.groom_parents || 'Putra pertama dari Bpk. Bambang Pratama & Ibu Siti Rahayu';
  const brideParents = couple?.bride_parents || 'Putri kedua dari Bpk. Hendra Gunawan & Ibu Ratna Dewi';
  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/photos/photo-7.jpg';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/photos/photo-4.jpg';
  const coupleInitials = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;

  // Default Photos fallback
  const displayGallery = (gallery && gallery.length > 0) ? gallery : [
    { id: '1', image_url: '/photos/photo-1.jpg', caption: 'Kebersamaan & Tawa Bahagia' },
    { id: '2', image_url: '/photos/photo-3.jpg', caption: 'Romansa Kasih Steven & Bunga' },
    { id: '3', image_url: '/photos/photo-4.jpg', caption: 'Pesona Anggun Mempelai Putri' },
    { id: '4', image_url: '/photos/photo-5.jpg', caption: 'Genggaman Menuju Masa Depan' },
    { id: '5', image_url: '/photos/photo-6.jpg', caption: 'Senyum Bahagia Hari Sakral' },
    { id: '6', image_url: '/photos/photo-7.jpg', caption: 'Ketulusan Hati Mempelai Pria' },
    { id: '7', image_url: '/photos/photo-8.jpg', caption: 'Langkah Menuju Janji Suci' },
    { id: '8', image_url: '/photos/photo-9.jpg', caption: 'Menuju Pelaminan Bahagia' },
  ];

  // Love Story default fallback
  const displayStories = (stories && stories.length > 0) ? stories : [
    {
      id: 'st-1',
      title: 'Awal Mula Pertemuan',
      date: '14 Februari 2022',
      story: 'Takdir mempertemukan kami di sebuah simposium arsitektur di Yogyakarta. Dari sekadar obrolan hangat tentang estetika, berlanjut menjadi ikatan yang tak terpisahkan.',
      image_url: '/photos/photo-1.jpg'
    },
    {
      id: 'st-2',
      title: 'Menyemai Komitmen',
      date: '20 Mei 2024',
      story: 'Setelah dua tahun saling mengenal dan membersamai dalam setiap suka dan duka, kami memutuskan untuk melangkah ke jenjang yang lebih serius.',
      image_url: '/photos/photo-5.jpg'
    },
    {
      id: 'st-3',
      title: 'Lamaran Khidmat',
      date: '10 Januari 2026',
      story: 'Di hadapan kedua keluarga besar yang kami muliakan, kami mengikat janji pertunangan dengan penuh rasa syukur dan doa tulus.',
      image_url: '/photos/photo-3.jpg'
    },
    {
      id: 'st-4',
      title: 'Menuju Pelaminan Suci',
      date: '12 Oktober 2026',
      story: 'Kini saatnya kami menyempurnakan separuh agama dalam ikatan pernikahan yang agung, dipenuhi berkah dan rahmat Allah SWT.',
      image_url: '/photos/photo-9.jpg'
    }
  ];

  // Bank Gift default fallback
  const displayGifts = (gifts && gifts.length > 0) ? gifts : [
    {
      id: 'g-1',
      bank_name: 'BCA',
      account_number: '7825 0918 22',
      account_name: 'Steven Pratama',
      qr_image: ''
    },
    {
      id: 'g-2',
      bank_name: 'Bank Mandiri',
      account_number: '138 00 2918 2011',
      account_name: 'Bunga Citra Lestari',
      qr_image: ''
    }
  ];

  // Events fallback
  const displayEvents = (events && events.length > 0) ? events : [
    {
      id: 'ev-1',
      event_type: 'Akad Nikah',
      event_name: 'Akad Nikah Suci',
      date: '2026-10-12',
      start_time: '08:00',
      end_time: '10:00',
      location: 'Grand Ballroom Sahara Hotel',
      address: 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah',
      map_url: 'https://maps.google.com'
    },
    {
      id: 'ev-2',
      event_type: 'Resepsi',
      event_name: 'Grand Royal Banquet',
      date: '2026-10-12',
      start_time: '11:00',
      end_time: '14:00',
      location: 'Grand Ballroom Sahara Hotel',
      address: 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah',
      map_url: 'https://maps.google.com'
    }
  ];

  // Countdown timer
  const weddingDateStr = invitation?.wedding_date || '2026-10-12T08:00:00+07:00';
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

  // Barcode / Check-in Pass
  const [savedPass, setSavedPass] = useState<any>(() => {
    return loadSavedBarcodePass(invitation?.id, invitation?.slug, guestName, 'emerald') || null;
  });
  const [showBarcodePreview, setShowBarcodePreview] = useState(false);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'uncertain'>('attending');
  const [rsvpCount, setRsvpCount] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [wishes, setWishes] = useState<Array<{ id: string; name: string; message: string; date: string; status: string }>>([
    {
      id: 'w-1',
      name: 'Bpk. Hendra & Ibu Ratna',
      message: 'Selamat menempuh hidup baru Steven & Bunga. Semoga menjadi keluarga yang sakinah, mawaddah, warahmah serta senantiasa dalam limpahan berkah.',
      date: 'Baru saja',
      status: 'attending'
    },
    {
      id: 'w-2',
      name: 'dr. Dimas & Nadia, S.Ked',
      message: 'Happy wedding! Undangan pernikahannya luar biasa megah dan anggun. Bahagia selalu selamanya!',
      date: '1 jam yang lalu',
      status: 'attending'
    },
    {
      id: 'w-3',
      name: 'Rian Pratama & Rekan Kantor',
      message: 'Selamat berbahagia bro Steven! Lancar sampai hari H resepsi agung.',
      date: '3 jam yang lalu',
      status: 'attending'
    }
  ]);

  const activeBarcodePass = savedPass || (showBarcodePreview ? {
    name: (rsvpName.trim() || (guestName !== 'Tamu Undangan' ? guestName : '') || 'Bpk. Muhammad Ilham'),
    attendance: rsvpStatus,
    guests: rsvpCount,
    code: generateStableBarcodeCode(invitation?.id || 'EMERALD-ROYAL', guestName),
    table: 'VVIP Royal Table 01'
  } : null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    toast.success('Nomor rekening berhasil disalin');
    setTimeout(() => setIsCopied(null), 2500);
  };

  const handleSavePass = () => {
    if (!activeBarcodePass) return;
    saveBarcodePass(activeBarcodePass, invitation?.id, invitation?.slug, 'emerald');
    setSavedPass(activeBarcodePass);
    toast.success('Tiket VIP Pass berhasil disimpan ke perangkat');
  };

  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      const newWish = {
        id: `w-${Date.now()}`,
        name: rsvpName.trim(),
        message: rsvpMessage.trim() || 'Semoga berbahagia selalu.',
        date: 'Baru saja',
        status: rsvpStatus
      };

      setWishes(prev => [newWish, ...prev]);

      const passData = {
        name: rsvpName.trim(),
        attendance: rsvpStatus,
        guests: rsvpCount,
        code: generateStableBarcodeCode(invitation?.id || 'EMERALD-ROYAL', rsvpName.trim()),
        table: 'VVIP Royal Table 01'
      };

      saveBarcodePass(passData, invitation?.id, invitation?.slug, 'emerald');
      setSavedPass(passData);
      setShowBarcodePreview(true);

      toast.success('Konfirmasi RSVP & doa restu berhasil dikirim!');
      setRsvpMessage('');
    } catch {
      toast.error('Gagal mengirim RSVP, silakan coba lagi');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#041610] text-[#F5FFF9] font-sans selection:bg-[#ECC880] selection:text-[#041610] overflow-x-hidden">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#041610] via-[#08231A] to-[#041610]" />
        <GuillocheVelvetWatermark opacity={0.05} />
        <FloatingEmeraldStardust count={20} />
      </div>

      {/* DESKTOP SPLIT LAYOUT CONTAINER */}
      <div className="flex flex-col lg:flex-row min-h-screen">

        {/* DESKTOP LEFT ASIDE (Fixed on Large Screens) */}
        <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-8 xl:p-12 overflow-hidden bg-[#041610] border-r border-[#ECC880]/30 shadow-2xl">
          {/* Background image & deep velvet atmosphere */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ backgroundImage: `url(${couple?.cover_photo_url || couple?.cover_photo || '/photos/photo-3.jpg'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#041610] via-[#041610]/80 via-60% to-[#041610]/70" />
          <GuillocheVelvetWatermark opacity={0.06} />
          <FloatingEmeraldStardust count={14} />

          {/* Top Aside Header */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/85 border border-[#ECC880]/50 text-[#ECC880] text-[11px] tracking-[0.25em] uppercase font-serif font-bold shadow-md">
              <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
              <span>THE ROYAL MASTERPIECE</span>
            </div>
          </div>

          {/* Center Couple Profile & Monogram */}
          <div className="relative z-10 my-auto text-left py-6">
            <EmeraldRoyalCrest initials={coupleInitials} size="lg" className="!items-start mb-6" />
            <span className="text-xs font-serif uppercase tracking-[0.3em] text-[#ECC880] font-semibold block mb-2">
              THE WEDDING CELEBRATION OF
            </span>
            <h1 className="font-serif text-4xl xl:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E2] via-[#ECC880] to-[#E2C792] drop-shadow-md">
              {groomName} &amp; {brideName}
            </h1>
            <p className="font-serif italic text-sm xl:text-base text-[#A0C4B4] mt-2">
              Senin, 12 Oktober 2026 • Solo, Jawa Tengah
            </p>
            <div className="w-24 h-0.5 bg-gradient-to-r from-[#ECC880] to-transparent my-6" />
            <p className="text-xs text-white/80 max-w-sm leading-relaxed font-light">
              Menyatukan dua hati dan keluarga dalam ikatan suci pernikahan yang agung dan penuh berkah.
            </p>

            {/* Aside Live Countdown */}
            <div className="mt-8 pt-6 border-t border-[#ECC880]/30 max-w-sm">
              <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#ECC880] block mb-3 font-semibold">
                HITUNG MUNDUR MENUJU HARI SAKRAL
              </span>
              <div className="grid grid-cols-4 gap-2.5">
                {[
                  { label: 'HARI', val: timeLeft.days },
                  { label: 'JAM', val: timeLeft.hours },
                  { label: 'MENIT', val: timeLeft.minutes },
                  { label: 'DETIK', val: timeLeft.seconds },
                ].map((tile, idx) => (
                  <div key={idx} className="bg-[#051C14]/90 rounded-xl p-2.5 border border-[#ECC880]/40 text-center shadow-md">
                    <span className="font-serif text-2xl font-bold text-[#FFF8E2] block leading-tight">
                      {String(tile.val).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] font-sans tracking-widest text-[#ECC880] uppercase">
                      {tile.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sultan VIP Perks Badge Row */}
              <div className="mt-6 pt-4 border-t border-[#ECC880]/20 grid grid-cols-3 gap-2 text-center">
                <div className="p-2 rounded-xl bg-[#051C14]/80 border border-[#ECC880]/30 shadow-xs">
                  <Car className="w-4 h-4 text-[#ECC880] mx-auto mb-1" />
                  <span className="text-[9px] text-white/90 block font-serif font-medium">Free Valet</span>
                </div>
                <div className="p-2 rounded-xl bg-[#051C14]/80 border border-[#ECC880]/30 shadow-xs">
                  <Shirt className="w-4 h-4 text-[#ECC880] mx-auto mb-1" />
                  <span className="text-[9px] text-white/90 block font-serif font-medium">Black Tie</span>
                </div>
                <div className="p-2 rounded-xl bg-[#051C14]/80 border border-[#ECC880]/30 shadow-xs">
                  <Crown className="w-4 h-4 text-[#ECC880] mx-auto mb-1" />
                  <span className="text-[9px] text-white/90 block font-serif font-medium">VVIP Table</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Venue Footer */}
          <div className="relative z-10 flex items-center justify-between text-xs text-[#A0C4B4] pt-6 border-t border-[#ECC880]/20">
            <span>Grand Ballroom Sahara Hotel</span>
            <span className="text-[#ECC880] font-serif font-bold">WD Royal Edition</span>
          </div>
        </aside>

        {/* RIGHT SIDE (Scrollable Folio on Desktop, Full Width on Mobile) */}
        <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen bg-[#041610] relative z-10 px-4 sm:px-8 xl:px-12 py-8 pb-36">
        
        {/* ========================================================================= */}
        {/* 1. HERO COVER SECTION                                                    */}
        {/* ========================================================================= */}
        <section id="cover" className="relative text-center py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 max-w-2xl mx-auto">
          <EmeraldGoldCorner size={36} color="#ECC880" />
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>ROYAL WEDDING CELEBRATION</span>
            <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
          </div>

          <EmeraldRoyalCrest initials={coupleInitials} size="lg" className="my-4" />

          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E2] via-[#ECC880] to-[#E2C792] drop-shadow-md mt-4">
            {groomName} &amp; {brideName}
          </h1>

          <p className="font-serif italic text-sm text-[#A0C4B4] mt-3">
            Senin, 12 Oktober 2026
          </p>

          {/* Couple Arch Portrait in Right Folio Cover */}
          <div className="relative w-44 h-60 sm:w-52 sm:h-68 mx-auto my-6 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] p-1 bg-gradient-to-b from-[#ECC880]/40 via-[#ECC880]/10 to-[#041610] shadow-[0_15px_35px_rgba(0,0,0,0.7)] group">
            <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
              <img 
                src={couple?.cover_photo_url || couple?.cover_photo || '/photos/photo-3.jpg'} 
                alt={`${groomName} & ${brideName}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Guest Greeting Card */}
          <div className="mt-8 mx-auto max-w-sm p-4 rounded-2xl bg-[#041610]/90 border border-[#ECC880]/40 shadow-inner text-center">
            <span className="text-[10px] tracking-widest uppercase font-serif text-[#A0C4B4]">
              KEPADA YTH. BAPAK/IBU/SAUDARA/I :
            </span>
            <div className="text-lg font-serif font-bold text-white mt-1 drop-shadow-xs">
              {guestName}
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#ECC880]/15 text-[#ECC880] text-[10px] font-serif font-semibold mt-2 border border-[#ECC880]/30">
              <Crown className="w-3 h-3 text-[#ECC880]" />
              <span>Tamu Undangan VIP</span>
            </div>
          </div>

          {/* Live Countdown Timer 4-Tile */}
          <div className="mt-8 pt-6 border-t border-[#ECC880]/20">
            <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#ECC880] block mb-3 font-semibold">
              HITUNG MUNDUR HARI BAHAGIA
            </span>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {[
                { label: 'HARI', val: timeLeft.days },
                { label: 'JAM', val: timeLeft.hours },
                { label: 'MENIT', val: timeLeft.minutes },
                { label: 'DETIK', val: timeLeft.seconds },
              ].map((tile, idx) => (
                <div key={idx} className="bg-[#051C14] rounded-xl p-2 border border-[#ECC880]/30 text-center shadow-xs">
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#FFF8E2] block leading-tight">
                    {String(tile.val).padStart(2, '0')}
                  </span>
                  <span className="text-[8px] font-sans tracking-widest text-[#ECC880] uppercase">
                    {tile.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. COUPLE PRESENTATION SECTION                                           */}
        {/* ========================================================================= */}
        <section id="couple" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          {/* Ayat / Holy Verse */}
          <div className="max-w-md mx-auto mb-10">
            <p className="font-serif italic text-xs sm:text-sm text-[#ECC880] leading-relaxed">
              &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
            </p>
            <span className="text-[10px] font-serif tracking-widest text-[#A0C4B4] uppercase block mt-2 font-bold">
              (QS. AR-RUM : 21)
            </span>
          </div>

          <div className="space-y-8">
            {/* Groom Card */}
            <div className="relative p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 max-w-md mx-auto shadow-md">
              <div className="relative w-36 h-48 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] shadow-lg mb-4">
                <img src={groomPhoto} alt={groomName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/80 via-transparent to-transparent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#FFF8E2]">
                {groomFullName}
              </h3>
              <p className="text-xs text-[#A0C4B4] mt-1 font-sans">
                {groomParents}
              </p>
              {couple?.groom_instagram && (
                <a 
                  href={`https://instagram.com/${couple.groom_instagram.replace('@', '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECC880]/15 hover:bg-[#ECC880]/30 text-[#ECC880] text-[11px] font-sans font-medium mt-3 border border-[#ECC880]/40 transition-colors"
                >
                  <InstagramIcon size={13} />
                  <span>{couple.groom_instagram}</span>
                </a>
              )}
            </div>

            <div className="flex items-center justify-center gap-3 my-2 text-[#ECC880]">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#ECC880]" />
              <Heart className="w-5 h-5 text-[#ECC880] fill-[#ECC880]/30" />
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#ECC880]" />
            </div>

            {/* Bride Card */}
            <div className="relative p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 max-w-md mx-auto shadow-md">
              <div className="relative w-36 h-48 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#ECC880] shadow-lg mb-4">
                <img src={bridePhoto} alt={brideName} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/80 via-transparent to-transparent" />
              </div>
              <h3 className="font-serif text-xl font-bold text-[#FFF8E2]">
                {brideFullName}
              </h3>
              <p className="text-xs text-[#A0C4B4] mt-1 font-sans">
                {brideParents}
              </p>
              {couple?.bride_instagram && (
                <a 
                  href={`https://instagram.com/${couple.bride_instagram.replace('@', '')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ECC880]/15 hover:bg-[#ECC880]/30 text-[#ECC880] text-[11px] font-sans font-medium mt-3 border border-[#ECC880]/40 transition-colors"
                >
                  <InstagramIcon size={13} />
                  <span>{couple.bride_instagram}</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. EVENT AGENDA SECTION                                                  */}
        {/* ========================================================================= */}
        <section id="event" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Calendar className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>RANGKAIAN ACARA</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-8">
            Waktu &amp; Tempat Resepsi
          </h2>

          <div className="space-y-6 max-w-md mx-auto">
            {displayEvents.map((ev, idx) => (
              <div key={idx} className="p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 text-center relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 px-4 py-1 rounded-bl-xl bg-[#ECC880]/20 border-b border-l border-[#ECC880]/40 text-[#ECC880] text-[10px] font-serif font-bold uppercase">
                  {ev.event_type}
                </div>

                <h3 className="font-serif text-xl font-bold text-[#ECC880] mt-2 mb-3">
                  {ev.event_name}
                </h3>

                <div className="flex items-center justify-center gap-2 text-sm text-white/90 mb-1">
                  <Calendar className="w-4 h-4 text-[#ECC880]" />
                  <span>{ev.date}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-xs text-[#A0C4B4] mb-4">
                  <Clock className="w-3.5 h-3.5 text-[#ECC880]" />
                  <span>{ev.start_time} - {ev.end_time} WIB</span>
                </div>

                <div className="pt-3 border-t border-[#ECC880]/20 text-xs text-white/80 mb-5 leading-relaxed">
                  <strong className="block text-white font-serif text-sm mb-1">{ev.location}</strong>
                  {ev.address}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                  <a
                    href={ev.map_url || 'https://maps.google.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#ECC880] hover:bg-[#D4AF37] text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Petunjuk Lokasi</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setCalendarModalEvent({
                        title: `Pernikahan ${groomName} & ${brideName} - ${ev.event_name}`,
                        description: `Pernikahan agung ${groomFullName} & ${brideFullName} bertempat di ${ev.location}`,
                        location: `${ev.location}, ${ev.address}`,
                        eventDate: ev.date,
                        startTime: ev.start_time,
                        endTime: ev.end_time
                      });
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full bg-[#041610] hover:bg-[#08261C] border border-[#ECC880]/50 text-[#ECC880] text-xs font-serif font-semibold tracking-wider uppercase transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Simpan Kalender</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* ROYAL DRESS CODE & PALETTE CONCIERGE                                      */}
        {/* ========================================================================= */}
        <section id="dresscode" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Shirt className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>PANDUAN BUSANA RESMI</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-3">
            Royal Attire &amp; Dress Code
          </h2>

          <p className="text-xs text-[#A0C4B4] max-w-md mx-auto mb-6 font-light">
            Untuk menyempurnakan suasana agung pesta malam kerajaan, kami mengundang para tamu kehormatan untuk mengenakan busana bertema <strong>Royal Black Tie &amp; Emerald Velvet</strong>.
          </p>

          {/* Gender Tab Switcher */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setAttireGender('gentlemen')}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                attireGender === 'gentlemen'
                  ? 'bg-[#ECC880] text-[#041610] shadow-md'
                  : 'bg-[#051C14] text-[#A0C4B4] border border-[#ECC880]/30 hover:text-white'
              }`}
            >
              <User size={14} />
              <span>Tamu Pria (Gentlemen)</span>
            </button>
            <button
              type="button"
              onClick={() => setAttireGender('ladies')}
              className={`inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-serif font-bold transition-all cursor-pointer ${
                attireGender === 'ladies'
                  ? 'bg-[#ECC880] text-[#041610] shadow-md'
                  : 'bg-[#051C14] text-[#A0C4B4] border border-[#ECC880]/30 hover:text-white'
              }`}
            >
              <Users size={14} />
              <span>Tamu Wanita (Ladies)</span>
            </button>
          </div>

          {/* Attire Guide Card */}
          <div className="p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 text-left max-w-md mx-auto shadow-md mb-8">
            {attireGender === 'gentlemen' ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center flex-shrink-0 text-[#ECC880]">
                    <Shirt size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                      Setelan Jas Formal / Batik Tulis Sutra
                    </h4>
                    <p className="text-xs text-[#A0C4B4] leading-relaxed">
                      Black tie tuxedo, formal suit berwarna emerald gelap atau hitam arang, atau kemeja batik tulis sutra motif klasik lengan panjang.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#ECC880]/20">
                  <div className="w-8 h-8 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center flex-shrink-0 text-[#ECC880]">
                    <Gem size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                      Aksesoris &amp; Sepatu
                    </h4>
                    <p className="text-xs text-[#A0C4B4] leading-relaxed">
                      Dasi kupu-kupu atau dasi sutra warna emas/champagne, serta sepatu pantofel formal berbahan kulit mengkilap.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center flex-shrink-0 text-[#ECC880]">
                    <Shirt size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                      Gaun Malam Velvet / Kebaya Mewah
                    </h4>
                    <p className="text-xs text-[#A0C4B4] leading-relaxed">
                      Evening gown berbahan beludru (velvet) emerald, gaun satin sutra elegan, atau kebaya modern bertabur payet benang emas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-3 border-t border-[#ECC880]/20">
                  <div className="w-8 h-8 rounded-full bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center flex-shrink-0 text-[#ECC880]">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-bold text-white mb-0.5">
                      Aksesoris &amp; Tata Rias
                    </h4>
                    <p className="text-xs text-[#A0C4B4] leading-relaxed">
                      Clutch bag bernuansa emas/emerald, perhiasan emas atau mutiara, serta sepatu heels atau selop pesta yang anggun.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Etiquette Alert */}
            <div className="mt-4 pt-3 border-t border-[#ECC880]/20 flex items-center gap-2.5 text-[11px] text-[#ECC880]">
              <Info size={14} className="flex-shrink-0" />
              <span>Dimohon tidak mengenakan busana dominan putih polos demi menghormati gaun pengantin.</span>
            </div>
          </div>

          {/* Interactive Official Color Palette Swatches */}
          <div className="max-w-md mx-auto">
            <span className="text-[10px] tracking-[0.2em] font-serif uppercase text-[#ECC880] block mb-3 font-semibold">
              PALET WARNA RESMI PERAYAAN
            </span>
            <div className="grid grid-cols-4 gap-2.5">
              {[
                { hex: '#041610', name: 'Imperial Emerald', desc: 'Warna utama beludru pekat' },
                { hex: '#0D3B2E', name: 'Royal Pine', desc: 'Aksen hijau hutan bangsawan' },
                { hex: '#ECC880', name: '24K Gold', desc: 'Sentuhan bordir & perhiasan' },
                { hex: '#FDFBF7', name: 'Imperial Ivory', desc: 'Aksen sutra kemeja & mutiara' },
              ].map((swatch, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setSelectedSwatch(swatch.name);
                    toast.info(`${swatch.name} (${swatch.hex}): ${swatch.desc}`);
                  }}
                  className="cursor-pointer group flex flex-col items-center p-2 rounded-2xl bg-[#051C14] border border-[#ECC880]/30 hover:border-[#ECC880] transition-all hover:scale-105 shadow-xs"
                >
                  <div 
                    className="w-10 h-10 rounded-full border-2 border-white/20 shadow-md mb-1.5 transition-transform group-hover:ring-2 ring-[#ECC880]"
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="font-serif text-[10px] text-white font-bold block truncate max-w-full">
                    {swatch.name}
                  </span>
                  <span className="font-mono text-[8px] text-[#ECC880]">
                    {swatch.hex}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* VVIP CONCIERGE & VALET SERVICE SECTION                                    */}
        {/* ========================================================================= */}
        <section id="concierge" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>FASILITAS SULTAN &amp; LAYANAN KHUSUS</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-3">
            Layanan &amp; Protokol Tamu VVIP
          </h2>

          <p className="text-xs text-[#A0C4B4] max-w-md mx-auto mb-8 font-light">
            Sebagai tamu kehormatan, Anda berhak menikmati serangkaian fasilitas eksklusif yang telah disiapkan khusus oleh keluarga kedua mempelai.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-md sm:max-w-xl mx-auto mb-8 text-left">
            {/* Perk 1: Valet */}
            <div className="p-4 rounded-2xl bg-[#051C14]/90 border border-[#ECC880]/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center text-[#ECC880] mb-3">
                  <Car size={18} />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                  Valet Parking Gratis
                </h4>
                <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                  Layanan parkir valet khusus tanpa biaya di Lobby Barat. Tunjukkan tiket VIP QR Pass Anda kepada petugas.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold">
                ✓ Bebas Antrean Parkir
              </div>
            </div>

            {/* Perk 2: Private Table */}
            <div className="p-4 rounded-2xl bg-[#051C14]/90 border border-[#ECC880]/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center text-[#ECC880] mb-3">
                  <Crown size={18} />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                  Royal Table 01
                </h4>
                <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                  Tempat duduk sofa VIP di baris utama dengan layanan hidangan pribadi oleh waiter &amp; butler pesta.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold">
                ✓ Emerald Suite Table
              </div>
            </div>

            {/* Perk 3: Fast-Track QR */}
            <div className="p-4 rounded-2xl bg-[#051C14]/90 border border-[#ECC880]/40 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#ECC880]/15 border border-[#ECC880]/40 flex items-center justify-center text-[#ECC880] mb-3">
                  <QrCode size={18} />
                </div>
                <h4 className="font-serif text-sm font-bold text-[#FFF8E2] mb-1">
                  Fast-Track Presensi
                </h4>
                <p className="text-[11px] text-[#A0C4B4] leading-relaxed">
                  Pintu masuk prioritas dengan pemindaian barcode instan untuk pengambilan souvenir dan pengantaran ke meja tamu.
                </p>
              </div>
              <div className="mt-3 pt-2 border-t border-[#ECC880]/20 text-[10px] text-[#ECC880] font-serif font-semibold">
                ✓ Pintu Masuk Barat VVIP
              </div>
            </div>
          </div>

          {/* Concierge Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 max-w-md mx-auto">
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#ECC880] hover:bg-[#D4AF37] text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md"
            >
              <Navigation size={14} />
              <span>Rute Jalur Drop-Off VVIP</span>
            </a>
            <a
              href={`https://wa.me/6285707909415?text=${encodeURIComponent(`Halo Concierge Wedding Steven & Bunga, saya ${guestName} ingin menanyakan info perihal kedatangan tamu VVIP.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#041610] hover:bg-[#08261C] border border-[#ECC880]/50 text-[#ECC880] text-xs font-serif font-semibold tracking-wider uppercase transition-colors"
            >
              <MessageCircle size={14} />
              <span>Hubungi Concierge Tamu</span>
            </a>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. INTERACTIVE LOVE STORY JOURNEY                                        */}
        {/* ========================================================================= */}
        <section id="story" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Heart className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>OUR LOVE JOURNEY</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-8">
            Kisah Cinta &amp; Janji Abadi
          </h2>

          <div className="space-y-6 max-w-md mx-auto text-left">
            {displayStories.map((st, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-[#051C14]/90 border border-[#ECC880]/30 flex flex-col sm:flex-row gap-4 items-center sm:items-start shadow-md">
                {st.image_url && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#ECC880]/50 flex-shrink-0 shadow-sm">
                    <img src={st.image_url} alt={st.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-serif font-bold tracking-widest text-[#ECC880] uppercase block mb-1">
                    {st.date}
                  </span>
                  <h3 className="font-serif text-base font-bold text-white mb-1.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-[#A0C4B4] leading-relaxed font-sans">
                    {st.story}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. PHOTO MASONRY GALLERY & FULL LIGHTBOX                                */}
        {/* ========================================================================= */}
        <section id="gallery" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>MOMEN BAHAGIA</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-6">
            Galeri Momen Berharga
          </h2>

          {/* Gallery Category Tabs */}
          <div className="flex items-center justify-center gap-1.5 max-w-sm mx-auto mb-6 flex-wrap">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'prewedding', label: 'Prewedding' },
              { id: 'ceremony', label: 'Seremonial' },
              { id: 'reception', label: 'Romansa' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveGalleryTab(tab.id as any)}
                className={`px-3 py-1 rounded-full text-[11px] font-serif transition-all cursor-pointer ${
                  activeGalleryTab === tab.id
                    ? 'bg-[#ECC880] text-[#041610] font-bold shadow-xs'
                    : 'bg-[#051C14] text-[#A0C4B4] border border-[#ECC880]/30 hover:border-[#ECC880]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Photo Masonry Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {displayGallery.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPhoto(img.image_url)}
                className={`relative group rounded-2xl overflow-hidden border border-[#ECC880]/40 cursor-pointer shadow-md aspect-[3/4] ${
                  idx % 3 === 0 ? 'col-span-2 aspect-[16/10]' : ''
                }`}
              >
                <img 
                  src={img.image_url} 
                  alt={img.caption || `Galeri ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <span className="text-xs text-[#FFF8E2] font-serif italic truncate">
                    {img.caption || 'Steven & Bunga'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <button 
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#041610] border border-[#ECC880] text-[#ECC880] flex items-center justify-center cursor-pointer"
            >
              <X size={20} />
            </button>
            <img 
              src={selectedPhoto} 
              alt="Zoomed Galeri" 
              className="max-w-full max-h-[85vh] rounded-2xl border-2 border-[#ECC880] shadow-2xl object-contain"
            />
          </div>
        )}

        {/* ========================================================================= */}
        {/* BESPOKE ROYAL SOUVENIR PREVIEW                                            */}
        {/* ========================================================================= */}
        <section id="souvenir" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Gift className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>CINDERAMATA EKSKLUSIF</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-3">
            Royal Wedding Favors
          </h2>

          <p className="text-xs text-[#A0C4B4] max-w-md mx-auto mb-6 font-light">
            Sebagai wujud penghargaan atas kehadiran Anda, sebuah kenang-kenangan eksklusif berukir monogram resmi kedua mempelai telah disiapkan di meja registrasi.
          </p>

          <div className="p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 max-w-md mx-auto text-left shadow-lg relative overflow-hidden">
            <GuillocheVelvetWatermark opacity={0.06} />

            <div className="flex flex-col sm:flex-row items-center gap-5 relative z-10">
              <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-[#ECC880]/20 to-[#041610] border-2 border-[#ECC880]/60 flex flex-col items-center justify-center flex-shrink-0 shadow-inner">
                <Crown className="w-10 h-10 text-[#ECC880] mb-1" />
                <span className="font-serif text-[10px] font-bold text-[#ECC880] tracking-widest uppercase">
                  SULTAN GIFT
                </span>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ECC880]/15 text-[#ECC880] text-[9px] font-serif font-semibold mb-2 border border-[#ECC880]/30">
                  <Star size={10} className="fill-[#ECC880]" />
                  <span>Limited Edition Keepsake</span>
                </div>
                <h4 className="font-serif text-base font-bold text-white mb-1.5">
                  Bespoke Scented Wax Diffuser &amp; Royal Monogram Box
                </h4>
                <p className="text-xs text-[#A0C4B4] leading-relaxed font-sans">
                  Aromaterapi beraroma kayu cendana &amp; melati keraton khas Jawa dalam kotak beludru hijau zamrud dengan cap segel emas Steven &amp; Bunga.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#ECC880]/20 flex items-center justify-between text-[11px] text-[#ECC880] relative z-10 font-serif">
              <span>Pengambilan: VVIP Reception Desk</span>
              <span className="font-bold">1 Tamu = 1 Gift Box</span>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. WEDDING GIFT & EMV SMART DEBIT CARD                                   */}
        {/* ========================================================================= */}
        <section id="gift" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <Gift className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>TANDA KASIH &amp; KADO DIGITAL</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-3">
            Amplop Digital &amp; Hadiah
          </h2>

          <p className="text-xs text-[#A0C4B4] max-w-md mx-auto mb-6 font-light">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda hendak memberikan tanda kasih, dapat melalui rekening eksklusif di bawah ini.
          </p>

          {/* Tab Selector */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setGiftTab('transfer')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer ${
                giftTab === 'transfer'
                  ? 'bg-[#ECC880] text-[#041610] font-bold shadow-md'
                  : 'bg-[#051C14] text-[#A0C4B4] border border-[#ECC880]/30'
              }`}
            >
              <CreditCard size={14} />
              <span>Transfer Bank &amp; QRIS</span>
            </button>

            <button
              type="button"
              onClick={() => setGiftTab('physical')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-serif transition-all cursor-pointer ${
                giftTab === 'physical'
                  ? 'bg-[#ECC880] text-[#041610] font-bold shadow-md'
                  : 'bg-[#051C14] text-[#A0C4B4] border border-[#ECC880]/30'
              }`}
            >
              <Package size={14} />
              <span>Kirim Kado Fisik</span>
            </button>
          </div>

          {giftTab === 'transfer' ? (
            <div className="space-y-6 max-w-sm mx-auto">
              {displayGifts.map((gift, idx) => (
                <div 
                  key={idx}
                  className="relative p-6 rounded-3xl bg-gradient-to-br from-[#0c3324] via-[#08261a] to-[#041610] border-2 border-[#ECC880] shadow-[0_16px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(236,200,128,0.25)] text-left overflow-hidden"
                >
                  <GuillocheVelvetWatermark opacity={0.08} />

                  {/* Header Card: Bank & Chip */}
                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                      <span className="font-serif font-bold text-lg tracking-wider text-[#FFF8E2]">
                        {gift.bank_name}
                      </span>
                      <span className="text-[9px] tracking-widest font-mono uppercase px-2 py-0.5 rounded-full bg-[#ECC880]/20 text-[#ECC880] border border-[#ECC880]/40">
                        PRIORITY
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Wifi size={16} className="text-[#ECC880] rotate-90 opacity-80" />
                      <EMVGoldSmartChip />
                    </div>
                  </div>

                  {/* Card Number */}
                  <div className="mb-4 relative z-10">
                    <span className="text-[10px] font-serif uppercase tracking-widest text-[#ECC880]/80 block">
                      NOMOR REKENING PRIORITAS
                    </span>
                    <div className="font-mono text-xl sm:text-2xl font-bold tracking-widest text-[#FFF8E2] mt-0.5">
                      {gift.account_number}
                    </div>
                  </div>

                  {/* Card Holder & Copy Button */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#ECC880]/20 relative z-10">
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-wider text-[#A0C4B4] block">
                        ATAS NAMA
                      </span>
                      <span className="font-serif text-xs font-semibold text-white">
                        {gift.account_name}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopy(gift.account_number.replace(/\s+/g, ''), gift.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ECC880] hover:bg-[#D4AF37] text-[#041610] text-[11px] font-serif font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                    >
                      {isCopied === gift.id ? (
                        <>
                          <Check size={12} className="text-[#041610]" />
                          <span>Tersalin</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} className="text-[#041610]" />
                          <span>Salin No. Rek</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 max-w-sm mx-auto text-center shadow-md">
              <Package className="w-8 h-8 text-[#ECC880] mx-auto mb-3" />
              <h4 className="font-serif text-base font-bold text-[#FFF8E2] mb-1">
                Alamat Kirim Hadiah Fisik
              </h4>
              <p className="text-xs text-[#A0C4B4] leading-relaxed mb-4 font-sans">
                {couple?.gift_address || 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah (Kediaman Mempelai)'}
              </p>
              <button
                type="button"
                onClick={() => handleCopy(couple?.gift_address || 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah', 'addr')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ECC880] text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all cursor-pointer"
              >
                {isCopied === 'addr' ? <Check size={14} /> : <Copy size={14} />}
                <span>{isCopied === 'addr' ? 'Alamat Tersalin' : 'Salin Alamat Lengkap'}</span>
              </button>
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 7. VIP GUEST CHECK-IN PASS & RSVP LIVE WISHES                           */}
        {/* ========================================================================= */}
        <section id="pass" className="relative py-12 px-4 sm:px-6 rounded-[36px] bg-gradient-to-b from-[#0A261D]/90 via-[#071F17]/95 to-[#041610] border border-[#ECC880]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden mb-12 text-center max-w-2xl mx-auto">
          <EmeraldGoldCorner size={32} color="#ECC880" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#041610]/80 border border-[#ECC880]/40 text-[#ECC880] text-[10px] tracking-[0.25em] uppercase font-serif font-bold shadow-md mb-4">
            <QrCode className="w-3.5 h-3.5 text-[#ECC880]" />
            <span>VIP PASS &amp; CHECK-IN PRESENSI</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#FFF8E2] mb-3">
            Konfirmasi Kehadiran &amp; Tiket VIP
          </h2>

          <p className="text-xs text-[#A0C4B4] max-w-md mx-auto mb-8 font-light">
            Sistem otomatis menerbitkan <strong>Tiket QR Resmi</strong> untuk discan petugas saat tiba di lokasi resepsi.
          </p>

          {/* Toggle View Pass Ticket */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setShowBarcodePreview(prev => !prev)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-serif font-bold tracking-wider uppercase bg-[#ECC880]/20 hover:bg-[#ECC880]/30 text-[#ECC880] border border-[#ECC880]/50 transition-colors cursor-pointer"
            >
              <QrCode size={14} />
              <span>{activeBarcodePass ? (showBarcodePreview && !savedPass ? 'Tutup Tiket' : 'Tampilkan Tiket VIP Pass') : 'Lihat Contoh Tiket VIP'}</span>
            </button>
          </div>

          {/* VIP GUEST VERIFIED PASS CARD */}
          {activeBarcodePass && (
            <div className="relative bg-gradient-to-br from-[#0c3324] via-[#072017] to-[#041610] text-white p-6 sm:p-8 rounded-[32px] border-2 border-[#ECC880] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(236,200,128,0.35)] mb-10 text-center overflow-hidden max-w-sm mx-auto">
              <EmeraldGoldCorner size={28} color="#ECC880" />
              <GuillocheVelvetWatermark opacity={0.09} />

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ECC880]/20 text-[10px] text-[#ECC880] mb-3 border border-[#ECC880]/50">
                <Crown size={12} className="text-[#ECC880]" />
                <span className="font-serif tracking-widest font-bold uppercase">
                  ROYAL VIP ACCESS PASS
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-white mb-1">
                {activeBarcodePass.name}
              </h3>

              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-sans font-semibold my-2 bg-emerald-950/90 text-emerald-200 border border-emerald-400/50">
                <span>✓ Terkonfirmasi Hadir ({activeBarcodePass.guests || 1} Tamu)</span>
              </div>

              <p className="text-[11px] text-[#ECC880] mb-3 font-serif">
                Grand Ballroom Sahara Hotel • Solo
              </p>

              {/* Sultan VVIP Seating & Gate Info */}
              <div className="grid grid-cols-2 gap-2 my-3 max-w-xs mx-auto text-left">
                <div className="p-2 rounded-xl bg-[#041610]/80 border border-[#ECC880]/30 shadow-inner">
                  <span className="text-[8px] text-[#A0C4B4] block uppercase font-sans">Meja Jamuan</span>
                  <span className="text-[11px] font-serif font-bold text-[#ECC880] truncate block">Table 01 - Emerald</span>
                </div>
                <div className="p-2 rounded-xl bg-[#041610]/80 border border-[#ECC880]/30 shadow-inner">
                  <span className="text-[8px] text-[#A0C4B4] block uppercase font-sans">Pintu Akses</span>
                  <span className="text-[11px] font-serif font-bold text-[#ECC880] truncate block">Lobby Barat Valet</span>
                </div>
              </div>

              {/* QR Code Graphic */}
              <div className="w-36 h-36 mx-auto bg-white p-2 rounded-2xl border-2 border-[#ECC880] shadow-md flex items-center justify-center my-3">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(`INV:${invitation?.id || 'EMERALD'}|GUEST:${activeBarcodePass.name}|ATT:attending|CODE:${activeBarcodePass.code}`)}`}
                  alt="QR Code Tiket"
                  className="w-full h-full object-contain"
                />
              </div>

              <span className="font-mono text-xs text-[#ECC880] tracking-widest block mb-4">
                {activeBarcodePass.code}
              </span>

              <button
                type="button"
                onClick={handleSavePass}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ECC880] hover:bg-[#D4AF37] text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
              >
                <Download size={14} />
                <span>Simpan Tiket ke Galeri</span>
              </button>
            </div>
          )}

          {/* RSVP Submission Form */}
          <form onSubmit={handleRsvpSubmit} className="max-w-md mx-auto p-6 rounded-3xl bg-[#051C14]/90 border border-[#ECC880]/40 text-left shadow-md">
            <h4 className="font-serif text-lg font-bold text-[#FFF8E2] text-center mb-4">
              Formulir RSVP Kehadiran
            </h4>

            <div className="mb-4">
              <label className="text-xs font-serif text-[#ECC880] block mb-1">
                Nama Lengkap Anda
              </label>
              <input 
                type="text" 
                value={rsvpName}
                onChange={e => setRsvpName(e.target.value)}
                placeholder="Masukkan nama lengkap..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880]"
                required
              />
            </div>

            <div className="mb-4">
              <label className="text-xs font-serif text-[#ECC880] block mb-1">
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'attending', label: 'Hadir' },
                  { id: 'uncertain', label: 'Ragu-ragu' },
                  { id: 'not_attending', label: 'Berhalangan' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRsvpStatus(opt.id as any)}
                    className={`py-2 rounded-xl text-xs font-serif transition-all cursor-pointer ${
                      rsvpStatus === opt.id
                        ? 'bg-[#ECC880] text-[#041610] font-bold shadow-xs'
                        : 'bg-[#041610] text-[#A0C4B4] border border-[#ECC880]/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-xs font-serif text-[#ECC880] block mb-1">
                Jumlah Tamu Hadir
              </label>
              <select
                value={rsvpCount}
                onChange={e => setRsvpCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880]"
              >
                <option value={1}>1 Orang</option>
                <option value={2}>2 Orang</option>
                <option value={3}>3 Orang</option>
                <option value={4}>4 Orang</option>
              </select>
            </div>

            <div className="mb-5">
              <label className="text-xs font-serif text-[#ECC880] block mb-1">
                Ucapan Doa &amp; Harapan
              </label>
              <textarea
                rows={3}
                value={rsvpMessage}
                onChange={e => setRsvpMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa restu untuk kedua mempelai..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#041610] border border-[#ECC880]/40 text-white text-xs focus:outline-hidden focus:border-[#ECC880] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmittingRsvp}
              className="w-full py-3 rounded-full bg-[#ECC880] hover:bg-[#D4AF37] text-[#041610] text-xs font-serif font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmittingRsvp ? (
                <span>Mengirim Konfirmasi...</span>
              ) : (
                <>
                  <Send size={14} />
                  <span>Kirim Konfirmasi &amp; Terbitkan Tiket</span>
                </>
              )}
            </button>
          </form>

          {/* Live Guestbook Wishes List */}
          <div className="mt-10 max-w-md mx-auto text-left">
            <h4 className="font-serif text-base font-bold text-[#ECC880] mb-4 flex items-center gap-2">
              <MessageCircle size={16} />
              <span>Untaian Doa &amp; Ucapan ({wishes.length})</span>
            </h4>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {wishes.map(w => (
                <div key={w.id} className="p-4 rounded-2xl bg-[#051C14]/90 border border-[#ECC880]/20 text-xs">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-serif font-bold text-white text-sm">
                      {w.name}
                    </span>
                    <span className="text-[10px] text-[#A0C4B4]">
                      {w.date}
                    </span>
                  </div>
                  <p className="text-[#A0C4B4] leading-relaxed font-sans">
                    {w.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. CLOSING & FOOTER                                                      */}
        {/* ========================================================================= */}
        <footer className="text-center py-8">
          <EmeraldRoyalCrest initials={coupleInitials} size="sm" className="mb-3" />
          <p className="font-serif text-sm text-[#A0C4B4] italic max-w-sm mx-auto mb-2">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.
          </p>
          <div className="font-serif text-lg font-bold text-[#FFF8E2] mt-3">
            {groomName} &amp; {brideName}
          </div>
          <span className="text-[10px] font-serif tracking-[0.2em] text-[#ECC880]/70 uppercase block mt-1">
            WD DIGITAL INVITATION • MASTERPIECE ROYAL EDITION
          </span>
        </footer>

        </main>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 max-w-[96vw] sm:max-w-max px-2 pointer-events-auto">
        <div className="bg-[#041610]/92 backdrop-blur-md border border-[#ECC880]/50 rounded-full py-1.5 px-2.5 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'cover', label: 'Cover', icon: Sparkles },
            { id: 'couple', label: 'Mempelai', icon: User },
            { id: 'event', label: 'Acara', icon: Calendar },
            { id: 'dresscode', label: 'Busana', icon: Shirt },
            { id: 'concierge', label: 'VVIP', icon: Crown },
            { id: 'story', label: 'Cerita', icon: Heart },
            { id: 'gallery', label: 'Galeri', icon: Maximize2 },
            { id: 'souvenir', label: 'Cinderamata', icon: Gem },
            { id: 'gift', label: 'Kado', icon: CreditCard },
            { id: 'pass', label: 'RSVP', icon: QrCode },
          ].map(item => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`p-2 rounded-full flex flex-col items-center justify-center transition-all ${
                  isActive 
                    ? 'text-[#041610] bg-[#ECC880] shadow-sm font-bold scale-105' 
                    : 'text-[#ECC880]/80 hover:text-white hover:bg-white/5'
                }`}
                title={item.label}
              >
                <IconComponent size={15} />
              </a>
            );
          })}
        </div>
      </nav>

      {/* Calendar Modal */}
      {calendarModalEvent && (
        <CalendarReminderModal
          isOpen={Boolean(calendarModalEvent)}
          onClose={() => setCalendarModalEvent(null)}
          event={calendarModalEvent}
        />
      )}

    </div>
  );
};

export default EmeraldVelvetRoyalTheme;
