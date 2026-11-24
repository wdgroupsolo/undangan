import { supabase } from '../lib/supabase';

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  price?: number;
  preview_image: string | null;
  thumbnail: string | null;
  status: 'active' | 'inactive';
  features: any;
  theme_config: any;
  created_at: string;
  badge?: string;
  rating?: string;
}

export const THEME_PRICE_MAP: Record<string, number> = {
  'ivory-pearl': 50000,
  'ivory-pearl-minimalist': 50000,
  'noir-gold': 50000,
  'noir-gold-elegance': 50000,
  'rose-gold': 50000,
  'rose-gold-romance': 50000,
  'terracotta-boho': 50000,
  'kuala-lumpur-heritage': 70000,
  'kuala-lumpur': 70000,
  'hafiz-syafika': 70000,
  'sunda-siger': 70000,
  'minang-gadang': 70000,
  'bali-kamasan': 70000,
  'moroccan-nights': 70000,
  'emerald-velvet': 150000,
  'navy-silver': 150000,
  'burgundy-wine': 150000,
  'sakura-hanami': 150000,
  'nirwana-sarangan': 150000,
  'hotel-nirwana': 150000,
  'telaga-sarangan': 150000,
  'joglo-maroon-heritage': 150000,
  'joglo-maroon': 150000,
  'joglo-bloom': 150000,
  'pendopo-maroon': 150000,
  'royal-wayang-gold': 150000,
  'royal-wayang': 150000,
  'joglo-wayang': 150000,
  'javanese-heritage': 150000,
  'jawa-klasik': 150000,
  'borobudur': 150000,
  'split-floral': 150000,
  'secret-garden': 150000,
  'maroon-gold': 150000,
  'royal-elegance': 150000,
};

export const resolveThemePrice = (theme: { slug?: string; price?: number | null }): number => {
  if (typeof theme.price === 'number' && !isNaN(theme.price) && theme.price > 0) {
    return theme.price;
  }
  const slug = (theme.slug || '').toLowerCase();
  if (slug === 'ivory-pearl' || slug === 'ivory-pearl-minimalist' || slug === 'noir-gold' || slug === 'noir-gold-elegance' || slug === 'rose-gold' || slug === 'rose-gold-romance' || slug === 'terracotta-boho') return 50000;
  if (slug === 'kuala-lumpur-heritage' || slug === 'kuala-lumpur' || slug === 'hafiz-syafika' || slug === 'sunda-siger' || slug === 'minang-gadang' || slug === 'bali-kamasan' || slug === 'moroccan-nights') return 70000;
  return THEME_PRICE_MAP[slug] || 150000;
};

export const THEME_SCREENSHOT_MAP: Record<string, string> = {
  'ivory-pearl': '/themes/ivory-pearl/theme-preview.jpg',
  'ivory-pearl-minimalist': '/themes/ivory-pearl/theme-preview.jpg',
  'noir-gold': '/themes/noir-gold/theme-preview.jpg',
  'noir-gold-elegance': '/themes/noir-gold/theme-preview.jpg',
  'rose-gold': '/themes/rose-gold/theme-preview.jpg',
  'terracotta-boho': '/themes/terracotta-boho/theme-preview.jpg',
  'sunda-siger': '/themes/sunda-siger/theme-preview.jpg',
  'minang-gadang': '/themes/minang-gadang/theme-preview.jpg',
  'bali-kamasan': '/themes/bali-kamasan/theme-preview.jpg',
  'moroccan-nights': '/themes/moroccan-nights/theme-preview.jpg',
  'emerald-velvet': '/themes/emerald-velvet/theme-preview.jpg',
  'navy-silver': '/themes/navy-silver/theme-preview.jpg',
  'burgundy-wine': '/themes/burgundy-wine/theme-preview.jpg',
  'sakura-hanami': '/themes/sakura-hanami/theme-preview.jpg',
  'joglo-maroon-heritage': '/themes/joglo-maroon-theme-preview.png',
  'joglo-maroon': '/themes/joglo-maroon-theme-preview.png',
  'joglo-bloom': '/themes/joglo-maroon-theme-preview.png',
  'pendopo-maroon': '/themes/joglo-maroon-theme-preview.png',
  'royal-wayang-gold': '/themes/royal-wayang-theme-preview.png',
  'royal-wayang': '/themes/royal-wayang-theme-preview.png',
  'joglo-wayang': '/themes/royal-wayang-theme-preview.png',
  'javanese-heritage': '/themes/javanese-heritage-theme-preview.png',
  'jawa-klasik': '/themes/javanese-heritage-theme-preview.png',
  'borobudur': '/themes/javanese-heritage-theme-preview.png',
  'split-floral': '/themes/split-floral-theme-preview.png',
  'secret-garden': '/themes/secret-garden-theme-preview.png',
  'maroon-gold': '/themes/maroon-gold-theme-preview.png',
  'royal-elegance': '/themes/royal-elegance-theme-preview.png',
  'nirwana-sarangan': '/themes/nirwana-sarangan/nirwana-theme-preview.png',
  'hotel-nirwana': '/themes/nirwana-sarangan/nirwana-theme-preview.png',
  'kuala-lumpur-heritage': '/themes/kuala-lumpur-heritage/theme-preview.jpg',
  'kuala-lumpur': '/themes/kuala-lumpur-heritage/theme-preview.jpg',
  'hafiz-syafika': '/themes/kuala-lumpur-heritage/theme-preview.jpg',
};

export const enhanceThemeWithScreenshot = (theme: any): Theme => {
  const screenshot = THEME_SCREENSHOT_MAP[theme.slug];
  const price = resolveThemePrice(theme);
  return {
    ...theme,
    price,
    preview_image: screenshot || theme.preview_image,
    thumbnail: screenshot || theme.thumbnail,
  };
};

// Masterpiece Theme: Kuala Lumpur Heritage (Walimatulurus Modern Melayu)
export const REAL_KUALA_LUMPUR_HERITAGE_THEME: Theme = {
  id: 'c3d4e5f6-7890-4123-d456-7ef890123456',
  name: 'Kuala Lumpur Heritage',
  slug: 'kuala-lumpur-heritage',
  description: 'Tema pernikahan eksklusif bernuansa Modern Malay Heritage / Walimatulurus berlatar kemegahan arsitektur Kuala Lumpur (Menara Kembar Petronas & Bangunan Sultan Abdul Samad), gerbang ukiran Songket emas, dan keanggunan Bunga Raya.',
  category: 'Modern & Cultural',
  price: 70000,
  preview_image: '/themes/kuala-lumpur-heritage/theme-preview.jpg',
  thumbnail: '/themes/kuala-lumpur-heritage/theme-preview.jpg',
  status: 'active',
  badge: 'Tema Baru Malaysia',
  rating: '5.0',
  features: [
    'Kemegahan Menara Petronas & Bangunan Sultan Abdul Samad',
    'Gerbang Ukiran Songket Emas & Ornamen Bunga Raya',
    'Bottom Navigation Bar Praktis & Floating Music Button',
    'Salam Kaut, Lokasi Waze/Maps, Countdown & RSVP Digital'
  ],
  theme_config: { 
    primaryColor: '#7A243D', 
    secondaryColor: '#FFF8FA', 
    accentColor: '#D4AF37',
    style: 'kuala-lumpur-heritage',
    backgroundImage: '/themes/kuala-lumpur-heritage/cover-skyline.jpg',
    desktopBackground: '/themes/kuala-lumpur-heritage/cover-skyline.jpg',
    mobileBackground: '/themes/kuala-lumpur-heritage/cover-skyline.jpg',
  },
  created_at: '2026-10-30T12:00:00.000000+00:00'
};

// Masterpiece Starter Theme: Ivory Pearl Minimalist
export const REAL_IVORY_PEARL_THEME: Theme = {
  id: 'e2f3a4b5-6789-0123-4567-890123456789',
  name: 'Ivory Pearl Minimalist',
  slug: 'ivory-pearl',
  description: 'Tema pernikahan modern berkelas harga terjangkau dengan palet warna ivory pearl & champagne silk, tipografi editorial elegan, double hairline border, amplop buka otomatis, dan RSVP digital lengkap.',
  category: 'Starter',
  price: 50000,
  preview_image: '/themes/ivory-pearl/theme-preview.jpg',
  thumbnail: '/themes/ivory-pearl/theme-preview.jpg',
  status: 'active',
  badge: 'Starter Baru',
  rating: '4.9',
  features: [
    'Nuansa Elegan Ivory Pearl & Champagne Silk Minimalis',
    'Tipografi Editorial Mewah & Double Hairline Border',
    'Segel Lilin Mutiara & Amplop Digital Instant Open',
    'Hitung Mundur, Kisah Cinta, Hadiah Digital & RSVP Online'
  ],
  theme_config: { 
    primaryColor: '#C5A880', 
    secondaryColor: '#FAF8F5', 
    accentColor: '#5C6B5E',
    style: 'ivory-pearl',
    backgroundImage: '/themes/ivory-pearl/theme-preview.jpg',
    desktopBackground: '/themes/ivory-pearl/theme-preview.jpg',
    mobileBackground: '/themes/ivory-pearl/theme-preview.jpg',
  },
  created_at: '2026-11-15T12:00:00.000000+00:00'
};

// Masterpiece Starter Theme: Noir Gold Elegance
export const REAL_NOIR_GOLD_THEME: Theme = {
  id: 'd1e2f3a4-5678-9012-3456-789012345678',
  name: 'Noir Gold Elegance',
  slug: 'noir-gold',
  description: 'Tema pernikahan mewah harga terjangkau bernuansa hitam obsidian & emas champagne, double hairline border berkelas, segel lilin monogram royal, dan amplop digital VIP Black Gold.',
  category: 'Starter',
  price: 50000,
  preview_image: '/themes/noir-gold/theme-preview.jpg',
  thumbnail: '/themes/noir-gold/theme-preview.jpg',
  status: 'active',
  badge: 'Best Value',
  rating: '4.9',
  features: [
    'Nuansa Hitam Obsidian & Emas Champagne Mewah',
    'Double Hairline Border & Regal Corner Flourish',
    'Segel Lilin Monogram Kerajaan (Instant Open)',
    'VIP Black Gold Card & RSVP Buku Tamu Lengkap'
  ],
  theme_config: { 
    primaryColor: '#0B0C0E', 
    secondaryColor: '#141519', 
    accentColor: '#D4AF37',
    style: 'noir-gold',
    backgroundImage: '/photos/audi-ovyola/cover-audi-ovyola.jpg',
    desktopBackground: '/photos/audi-ovyola/cover-audi-ovyola.jpg',
    mobileBackground: '/photos/audi-ovyola/cover-audi-ovyola.jpg',
  },
  created_at: '2026-11-12T12:00:00.000000+00:00'
};

// Masterpiece Theme: Nirwana Sarangan Resort (Telaga Sarangan & Hotel Nirwana)
export const REAL_NIRWANA_SARANGAN_THEME: Theme = {
  id: 'b2c3d4e5-6789-4012-c345-6def78901234',
  name: 'Nirwana Sarangan Resort',
  slug: 'nirwana-sarangan',
  description: 'Tema pernikahan eksklusif bernuansa pemandangan Telaga Sarangan yang sejuk dan menenangkan di lereng Gunung Lawu, berlatar kemegahan Hotel Nirwana Sarangan, riak air danau, kabut pegunungan, dan sentuhan intimate wedding & wisata.',
  category: 'Resort & Nature',
  price: 150000,
  preview_image: '/themes/nirwana-sarangan/nirwana-theme-preview.png',
  thumbnail: '/themes/nirwana-sarangan/nirwana-theme-preview.png',
  status: 'active',
  badge: 'Tema Resort Eksklusif',
  rating: '5.0',
  features: [
    'Kemegahan Hotel Nirwana & Panorama Telaga Sarangan',
    'Nuansa Hijau Pinus Lereng Lawu & Kabut Danau Romantis',
    'Resort Venue Peta Langsung & Lobi Nirwana Sarangan',
    'Amplop Digital, Salin Rekening & RSVP Online'
  ],
  theme_config: { 
    primaryColor: '#16382C', 
    secondaryColor: '#F5F8F6', 
    accentColor: '#C5A059',
    style: 'nirwana-sarangan',
    backgroundImage: '/themes/nirwana-sarangan/lakeview-panorama.jpg',
    desktopBackground: '/themes/nirwana-sarangan/lakeview-panorama.jpg',
    mobileBackground: '/themes/nirwana-sarangan/lakeview-mobile.jpg',
  },
  created_at: '2026-10-16T12:00:00.000000+00:00'
};

// Masterpiece Theme: Batak Maroon Heritage (Rumah Bolon, Ukiran Gorga & Ulos, Burgundy Peonies)
export const REAL_JOGLO_MAROON_THEME: Theme = {
  id: 'a1b2c3d4-5678-4901-b234-5cdef6789012',
  name: 'Batak Maroon Heritage',
  slug: 'joglo-maroon-heritage',
  description: 'Tema pernikahan adat Batak bernuansa Rumah Adat Bolon megah berhias ukiran Gorga dan hamparan bunga merah marun, diperkaya aksen tenun Ulos, kupu-kupu beterbangan, dan suasana sakral penuh kehormatan.',
  category: 'Traditional & Heritage',
  price: 150000,
  preview_image: '/themes/joglo-maroon-theme-preview.png',
  thumbnail: '/themes/joglo-maroon-theme-preview.png',
  status: 'active',
  badge: 'Tema Baru Populer',
  rating: '5.0',
  features: [
    'Kemegahan Rumah Adat Batak (Rumah Bolon)',
    'Ornamen Ukiran Gorga & Tenun Ulos Marun',
    'Bingkai Foto Lengkung & Hamparan Bunga Marun',
    'Amplop Digital, Salin Rekening & RSVP Online'
  ],
  theme_config: { 
    primaryColor: '#7e2231', 
    secondaryColor: '#fbf8f2', 
    accentColor: '#c9982e',
    style: 'joglo-maroon-heritage',
    backgroundImage: '/themes/joglo-maroon-bg-clean.jpg',
    desktopBackground: '/themes/joglo-maroon-bg-clean.jpg',
    entranceVideo: '/themes/joglo-maroon-entrance.mp4',
  },
  created_at: '2026-10-10T12:00:00.000000+00:00'
};

// New Masterpiece Theme: Royal Wayang Gold (Keraton Jawa & Pendopo Joglo)
export const REAL_ROYAL_WAYANG_THEME: Theme = {
  id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  name: 'Royal Wayang Gold',
  slug: 'royal-wayang-gold',
  description: 'Tema pernikahan agung bernuansa Keraton Jawa & Pendopo Joglo malam hari, diperkaya siluet wayang Kamajaya & Kamaratih berlapis emas, ornamen floral klasik, serta alunan sakral khas Nusantara.',
  category: 'Traditional & Heritage',
  price: 150000,
  preview_image: '/themes/royal-wayang-theme-preview.png',
  thumbnail: '/themes/royal-wayang-theme-preview.png',
  status: 'active',
  badge: 'Tema Keraton Baru',
  rating: '5.0',
  features: [
    'Kemegahan Pendopo Joglo & Siluet Wayang Emas',
    'Nuansa Hitam Emas Keraton & Paugeran Busana',
    'Split Screen Desktop & Full Mobile Interaktif',
    'Amplop Digital (BCA/BRI/Mandiri), QRIS & RSVP Online'
  ],
  theme_config: { 
    primaryColor: '#d4af37', 
    secondaryColor: '#1c150c', 
    style: 'royal-wayang',
    backgroundImage: '/themes/royal-wayang-bg.jpg',
    desktopBackground: '/themes/royal-wayang-bg.jpg'
  },
  created_at: '2026-10-02T22:00:00.000000+00:00'
};

// New Masterpiece Theme: Javanese Heritage (Borobudur & Nusantara Royal Floral)
export const REAL_JAVANESE_HERITAGE_THEME: Theme = {
  id: 'e3f4a5b6-7890-4234-9678-9abcdef01234',
  name: 'Javanese Heritage',
  slug: 'javanese-heritage',
  description: 'Tema tradisional bernuansa Candi Borobudur, ornamen batik klasik, paduan warna terracotta & merah marun, serta rangkaian anggrek vintage nusantara.',
  category: 'Traditional & Heritage',
  price: 150000,
  preview_image: '/themes/javanese-heritage-theme-preview.png',
  thumbnail: '/themes/javanese-heritage-theme-preview.png',
  status: 'active',
  badge: 'Tema Baru Populer',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { 
    primaryColor: '#6a1a24', 
    secondaryColor: '#df9b8e', 
    style: 'javanese-heritage',
    backgroundImage: '/themes/javanese-heritage-bg.jpg',
    desktopBackground: '/themes/javanese-heritage-desktop.jpg'
  },
  created_at: '2026-09-28T01:00:00.000000+00:00'
};

// Fallback theme sesuai data riil yang ada di database (Split Floral)
export const REAL_SPLIT_FLORAL_THEME: Theme = {
  id: '409ac803-1486-4995-9a5d-de5f65d170bc',
  name: 'Split Floral',
  slug: 'split-floral',
  description: 'Tema split screen klasik dengan ornamen floral, bingkai lengkung vintage, entrance video arch, dan alunan saxophone romantis.',
  category: 'Elegant & Classic',
  price: 150000,
  preview_image: '/themes/split-floral-theme-preview.png',
  thumbnail: '/themes/split-floral-theme-preview.png',
  status: 'active',
  badge: 'Tema Utama',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { primaryColor: '#846358', secondaryColor: '#faf6ee', style: 'classic' },
  created_at: '2026-09-09T08:15:59.286645+00:00'
};

// New Masterpiece Theme: Secret Garden (Dusty Rose & Earthy Mauve Botanical)
export const REAL_SECRET_GARDEN_THEME: Theme = {
  id: '7b8c9d0e-2345-4678-9abc-def012345678',
  name: 'Secret Garden',
  slug: 'secret-garden',
  description: 'Tema bernuansa taman romantis dusty rose & earthy mauve, bingkai foto lengkung oval, video entrance sinematik, dan ornamen bunga melayang.',
  category: 'Botanical & Garden',
  price: 150000,
  preview_image: '/themes/secret-garden-theme-preview.png',
  thumbnail: '/themes/secret-garden-theme-preview.png',
  status: 'active',
  badge: 'Tema Baru Populer',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { primaryColor: '#9A6E76', secondaryColor: '#E6DED8', style: 'botanical' },
  created_at: '2026-09-19T10:00:00.000000+00:00'
};

export const REAL_ROYAL_ELEGANCE_THEME: Theme = {
  id: 'c1d2e3f4-5678-9012-3456-789abcdef012',
  name: 'Royal Elegance',
  slug: 'royal-elegance',
  description: 'Tema elegan dengan cover layar penuh, gradien warna gelap maroon, dan sentuhan emas eksklusif.',
  category: 'Elegant & Classic',
  price: 150000,
  preview_image: '/themes/royal-elegance-theme-preview.png',
  thumbnail: '/themes/royal-elegance-theme-preview.png',
  status: 'active',
  badge: 'New Exclusive',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { primaryColor: '#D4AF37', secondaryColor: '#2F1515', style: 'elegant' },
  created_at: '2026-09-25T10:00:00.000000+00:00'
};

export const REAL_MAROON_GOLD_THEME: Theme = {
  id: 'd2e3f4a5-6789-4123-8567-89abcdef0123',
  name: 'Maroon Gold',
  slug: 'maroon-gold',
  description: 'Tema klasik mewah bernuansa merah marun & emas kerajaan, bingkai oval vintage, video entrance gerbang istana, dan pemandangan alam romantis.',
  category: 'Royal & Classic',
  price: 150000,
  preview_image: '/themes/maroon-gold-theme-preview.png',
  thumbnail: '/themes/maroon-gold-theme-preview.png',
  status: 'active',
  badge: 'Tema Baru Populer',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { 
    primaryColor: '#8a333c', 
    secondaryColor: '#c4a46a', 
    style: 'royal-classic',
    entranceVideo: '/maroon-gate-entrance.mp4',
    backgroundEnd: '/gate-bg-open.jpg'
  },
  created_at: '2026-09-27T12:00:00.000000+00:00'
};

// 1. Sunda Siger Parahyangan (Rp 70.000 / Adat & Heritage)
export const REAL_SUNDA_SIGER_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555501',
  name: 'Sunda Siger Parahyangan',
  slug: 'sunda-siger',
  description: 'Tema pernikahan adat Sunda bernuansa hijau sage Parahyangan dan mahkota Siger emas berhias melati ronce, ornamen daun sirih ayun, dan alunan suling kecapi sakral.',
  category: 'Adat & Heritage',
  price: 70000,
  preview_image: '/themes/sunda-siger/theme-preview.jpg',
  thumbnail: '/themes/sunda-siger/theme-preview.jpg',
  status: 'active',
  badge: 'Adat Sunda',
  rating: '5.0',
  features: ['Siger Emas 9 Lekuk & Ronce Melati', 'Nuansa Sage Green Priangan & Bambu', 'Kisah Cinta, Doa & Hadiah Digital', 'RSVP & Ucapan Tamu Real-time'],
  theme_config: { primaryColor: '#2B4A37', secondaryColor: '#F4F7F4', accentColor: '#D4AF37', style: 'sunda-siger' },
  created_at: '2026-11-15T15:00:00.000000+00:00'
};

// 2. Minang Rumah Gadang (Rp 70.000 / Adat & Heritage)
export const REAL_MINANG_GADANG_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555502',
  name: 'Minang Rumah Gadang',
  slug: 'minang-gadang',
  description: 'Tema pernikahan adat Minangkabau berlatar atap gonjong Rumah Gadang megah, mahkota Suntiang emas bertingkat, motif tenun songket Pandai Sikek, dan rona merah marun marawa.',
  category: 'Adat & Heritage',
  price: 70000,
  preview_image: '/themes/minang-gadang/theme-preview.jpg',
  thumbnail: '/themes/minang-gadang/theme-preview.jpg',
  status: 'active',
  badge: 'Adat Minang',
  rating: '5.0',
  features: ['Gonjong Rumah Gadang & Suntiang Emas', 'Ornamen Songket Pandai Sikek Mewah', 'Akad & Baralek Salin Rekening', 'Buku Tamu Interaktif Digital'],
  theme_config: { primaryColor: '#7A1822', secondaryColor: '#FCF7F2', accentColor: '#E1A83E', style: 'minang-gadang' },
  created_at: '2026-11-15T15:01:00.000000+00:00'
};

// 3. Bali Royal Kamasan (Rp 70.000 / Adat & Heritage)
export const REAL_BALI_KAMASAN_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555503',
  name: 'Bali Royal Kamasan',
  slug: 'bali-kamasan',
  description: 'Tema pernikahan adat Bali eksotis bernuansa gerbang Candi Bentar pura agung, ukiran emas prada Kamasan, kamboja kuning dupa wangi, dan kain poleng sakral.',
  category: 'Adat & Heritage',
  price: 70000,
  preview_image: '/themes/bali-kamasan/theme-preview.jpg',
  thumbnail: '/themes/bali-kamasan/theme-preview.jpg',
  status: 'active',
  badge: 'Adat Bali',
  rating: '5.0',
  features: ['Gerbang Candi Bentar & Prada Kamasan', 'Bunga Kamboja & Ornamen Ukir Bali', 'Peta Lokasi Pawiwahan & Pura Waze', 'RSVP Digital & Angpao QRIS'],
  theme_config: { primaryColor: '#783A1E', secondaryColor: '#FDFBF7', accentColor: '#E4AC2D', style: 'bali-kamasan' },
  created_at: '2026-11-15T15:02:00.000000+00:00'
};

// 4. Moroccan Arabian Nights (Rp 70.000 / Adat & Heritage)
export const REAL_MOROCCAN_NIGHTS_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555504',
  name: 'Moroccan Arabian Nights',
  slug: 'moroccan-nights',
  description: 'Tema pernikahan bertema Arabian & Timur Tengah bernuansa kubah moriska istana Alhambra, lampion tembaga bercahaya hangat, motif bintang zelije, dan rona biru lapis lazuli amber.',
  category: 'Adat & Heritage',
  price: 70000,
  preview_image: '/themes/moroccan-nights/theme-preview.jpg',
  thumbnail: '/themes/moroccan-nights/theme-preview.jpg',
  status: 'active',
  badge: 'Arabian Nights',
  rating: '5.0',
  features: ['Kubah Moriska Moresque & Bintang 8 Zelije', 'Lampion Tembaga & Nuansa Lapis Amber', 'Amplop Digital Hadiah & Salin No Rek', 'RSVP Buku Doa Selamat Pengantin'],
  theme_config: { primaryColor: '#0E3A52', secondaryColor: '#FAF7F2', accentColor: '#DE9B35', style: 'moroccan-nights' },
  created_at: '2026-11-15T15:03:00.000000+00:00'
};

// 5. Rose Gold Romance (Rp 50.000 / Starter)
export const REAL_ROSE_GOLD_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555505',
  name: 'Rose Gold Romance',
  slug: 'rose-gold',
  description: 'Tema pernikahan romantis feminin bernuansa dusty rose pastel, aksen metalik foil rose gold berkilau, rangkaian bunga peony mekar, dan estetika modern bersih.',
  category: 'Starter',
  price: 50000,
  preview_image: '/themes/rose-gold/theme-preview.jpg',
  thumbnail: '/themes/rose-gold/theme-preview.jpg',
  status: 'active',
  badge: 'Starter Romantis',
  rating: '4.9',
  features: ['Nuansa Lembut Dusty Rose & Peony Mawar', 'Aksen Kilau Rose Gold Metallic Foil', 'Hitung Mundur Acara & Love Timeline', 'Buku Tamu Online & Amplop Digital'],
  theme_config: { primaryColor: '#8C4D58', secondaryColor: '#FFF8FA', accentColor: '#D89B9B', style: 'rose-gold' },
  created_at: '2026-11-15T15:04:00.000000+00:00'
};

// 6. Terracotta Boho Rustic (Rp 50.000 / Starter)
export const REAL_TERRACOTTA_BOHO_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555506',
  name: 'Terracotta Boho Rustic',
  slug: 'terracotta-boho',
  description: 'Tema pernikahan earthy rustic bernuansa tanah liat terracotta hangat, rumput pampas kering lembut, lengkung gerbang senja, dan gaya bohemian estetik kekinian.',
  category: 'Starter',
  price: 50000,
  preview_image: '/themes/terracotta-boho/theme-preview.jpg',
  thumbnail: '/themes/terracotta-boho/theme-preview.jpg',
  status: 'active',
  badge: 'Starter Rustic',
  rating: '4.9',
  features: ['Nuansa Hangat Terracotta & Pampas Grass', 'Desain Arched Minimalis Modern Bohemian', 'Integrasi Google Maps & Kalender', 'RSVP Responsif Semua Perangkat'],
  theme_config: { primaryColor: '#964B35', secondaryColor: '#FAF5EE', accentColor: '#C47B5D', style: 'terracotta-boho' },
  created_at: '2026-11-15T15:05:00.000000+00:00'
};

// 7. Emerald Velvet Royal (Rp 150.000 / Masterpiece)
export const REAL_EMERALD_VELVET_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555507',
  name: 'Emerald Velvet Royal',
  slug: 'emerald-velvet',
  description: 'Tema pernikahan megah kemewahan ballroom internasional bernuansa hijau zamrud tua beludru, aksen emas champagne berkilap, monogram tameng mahkota, dan pencahayaan kristal dramatis.',
  category: 'Royal & Classic',
  price: 150000,
  preview_image: '/themes/emerald-velvet/theme-preview.jpg',
  thumbnail: '/themes/emerald-velvet/theme-preview.jpg',
  status: 'active',
  badge: 'Kemewahan Royal',
  rating: '5.0',
  features: ['Palet Deep Emerald Velvet & Champagne Gold', 'Monogram Crest Royal Tameng Kerajaan', 'Floating Navigation & Fitur Musik Eksklusif', 'Galeri Lightbox & Live RSVP Real-time'],
  theme_config: { primaryColor: '#0F3025', secondaryColor: '#174033', accentColor: '#ECC880', style: 'emerald-velvet' },
  created_at: '2026-11-15T15:06:00.000000+00:00'
};

// 8. Midnight Celestial Star (Promo Rp 150.000 / Normal Rp 250.000 - Masterpiece)
export const REAL_NAVY_SILVER_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555508',
  name: 'Midnight Celestial Star',
  slug: 'navy-silver',
  description: 'Tema pernikahan modern puitis bernuansa langit malam navy midnight, gugusan bintang konstelasi perak berkilau, siluet bulan sabit anggun, dan tipografi seremonial agung.',
  category: 'Modern & Cultural',
  price: 150000,
  preview_image: '/themes/navy-silver/theme-preview.jpg',
  thumbnail: '/themes/navy-silver/theme-preview.jpg',
  status: 'active',
  badge: 'Masterpiece Promo (Hemat 40%)',
  rating: '5.0',
  features: ['Nuansa Langit Midnight Navy & Taburan Bintang', 'Aksen Perak Starlight & Bulan Sabit Romantis', 'Kisah Cinta, Countdown & Lokasi Acara', 'RSVP Digital & Hadiah Pernikahan Bank'],
  theme_config: { primaryColor: '#0C172E', secondaryColor: '#142242', accentColor: '#CBD5E1', style: 'navy-silver' },
  created_at: '2026-11-15T15:07:00.000000+00:00'
};

// 9. Burgundy Wine Classic (Promo Rp 150.000 / Normal Rp 250.000 - Masterpiece)
export const REAL_BURGUNDY_WINE_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555509',
  name: 'Burgundy Wine Classic',
  slug: 'burgundy-wine',
  description: 'Tema pernikahan mewah Eropa klasik bordeaux wine velvet, ornamen filigree emas perunggu antik, frame cameo oval aristokrat, dan perjamuan agung chateau.',
  category: 'Royal & Classic',
  price: 150000,
  preview_image: '/themes/burgundy-wine/theme-preview.jpg',
  thumbnail: '/themes/burgundy-wine/theme-preview.jpg',
  status: 'active',
  badge: 'Masterpiece Promo (Hemat 40%)',
  rating: '5.0',
  features: ['Nuansa Bordeaux Wine Velvet & Antique Bronze Gold', 'Frame Cameo Oval Aristokrat & Segel Lilin Romantis', 'AR Photobooth Kamera & Tiket Barcode VIP', 'Kisah Cinta, Countdown & Amplop Digital Bank EMV'],
  theme_config: { primaryColor: '#26050C', secondaryColor: '#1A0307', accentColor: '#B88B4A', style: 'burgundy-wine' },
  created_at: '2026-11-15T15:08:00.000000+00:00'
};

// 10. Sakura Kyoto Blossom (Rp 150.000 / Masterpiece)
export const REAL_SAKURA_HANAMI_THEME: Theme = {
  id: 'a1111111-2222-3333-4444-555555555510',
  name: 'Sakura Kyoto Blossom',
  slug: 'sakura-hanami',
  description: 'Tema pernikahan oriental estetis bernuansa musim semi sakura mekar di Kyoto, siluet gerbang Torii merah vermilion, tekstur kertas washi beras, dan sentuhan cinta minimalis Zen.',
  category: 'Modern & Cultural',
  price: 150000,
  preview_image: '/themes/sakura-hanami/theme-preview.jpg',
  thumbnail: '/themes/sakura-hanami/theme-preview.jpg',
  status: 'active',
  badge: 'Oriental Zen',
  rating: '5.0',
  features: ['Kelopak Sakura Hanami & Aksen Gerbang Torii', 'Tekstur Kertas Washi Jepang & Pastel Pink', 'Hitung Mundur Kalender & Peta Lokasi', 'Amplop Digital Instant & Kirim Doa'],
  theme_config: { primaryColor: '#9C3A4E', secondaryColor: '#FFF8FA', accentColor: '#E88B9E', style: 'sakura-hanami' },
  created_at: '2026-11-15T15:09:00.000000+00:00'
};

export const DEFAULT_THEMES: Theme[] = [
  REAL_IVORY_PEARL_THEME,
  REAL_NOIR_GOLD_THEME,
  REAL_ROSE_GOLD_THEME,
  REAL_TERRACOTTA_BOHO_THEME,
  REAL_KUALA_LUMPUR_HERITAGE_THEME,
  REAL_SUNDA_SIGER_THEME,
  REAL_MINANG_GADANG_THEME,
  REAL_BALI_KAMASAN_THEME,
  REAL_MOROCCAN_NIGHTS_THEME,
  REAL_EMERALD_VELVET_THEME,
  REAL_NAVY_SILVER_THEME,
  REAL_BURGUNDY_WINE_THEME,
  REAL_SAKURA_HANAMI_THEME,
  REAL_NIRWANA_SARANGAN_THEME,
  REAL_JOGLO_MAROON_THEME,
  REAL_ROYAL_WAYANG_THEME,
  REAL_JAVANESE_HERITAGE_THEME,
  REAL_MAROON_GOLD_THEME,
  REAL_SECRET_GARDEN_THEME,
  REAL_SPLIT_FLORAL_THEME,
  REAL_ROYAL_ELEGANCE_THEME,
];

// Persistent tracking for deleted themes
const DELETED_THEMES_STORAGE_KEY = 'wd_deleted_theme_slugs_v1';

export const getDeletedThemeSlugs = (): Set<string> => {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_THEMES_STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    return new Set(Array.isArray(parsed) ? parsed.map((s: string) => String(s).toLowerCase().trim()) : []);
  } catch {
    return new Set();
  }
};

export const markThemeDeleted = (idOrSlug: string) => {
  if (typeof window === 'undefined' || !idOrSlug) return;
  try {
    const deleted = getDeletedThemeSlugs();
    deleted.add(String(idOrSlug).toLowerCase().trim());
    localStorage.setItem(DELETED_THEMES_STORAGE_KEY, JSON.stringify(Array.from(deleted)));
  } catch (err) {
    console.error('Failed to save deleted theme:', err);
  }
};

export const restoreThemeSlug = (idOrSlug: string) => {
  if (typeof window === 'undefined' || !idOrSlug) return;
  try {
    const deleted = getDeletedThemeSlugs();
    deleted.delete(String(idOrSlug).toLowerCase().trim());
    localStorage.setItem(DELETED_THEMES_STORAGE_KEY, JSON.stringify(Array.from(deleted)));
  } catch (err) {
    console.error('Failed to restore theme slug:', err);
  }
};

export const THEME_ALIASES: Record<string, string> = {
  'ivory-pearl-minimalist': 'ivory-pearl',
  'noir-gold-elegance': 'noir-gold',
  'kuala-lumpur': 'kuala-lumpur-heritage',
  'hafiz-syafika': 'kuala-lumpur-heritage',
  'hotel-nirwana': 'nirwana-sarangan',
  'telaga-sarangan': 'nirwana-sarangan',
  'joglo-maroon': 'joglo-maroon-heritage',
  'joglo-bloom': 'joglo-maroon-heritage',
  'pendopo-maroon': 'joglo-maroon-heritage',
  'royal-wayang': 'royal-wayang-gold',
  'joglo-wayang': 'royal-wayang-gold',
  'jawa-klasik': 'javanese-heritage',
  'borobudur': 'javanese-heritage',
};

export const themeService = {
  async getThemes(): Promise<Theme[]> {
    const deletedSlugs = getDeletedThemeSlugs();
    const filterNotDeleted = (list: Theme[]) => 
      list.filter(t => !deletedSlugs.has(t.id?.toLowerCase()) && !deletedSlugs.has(t.slug?.toLowerCase()));

    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        return filterNotDeleted(DEFAULT_THEMES).map(enhanceThemeWithScreenshot);
      }

      // Merge database themes with default curated themes
      const existingSlugs = new Set(data.map((t: any) => t.slug));
      const merged = [...data];

      for (const defTheme of DEFAULT_THEMES) {
        if (!existingSlugs.has(defTheme.slug) && !deletedSlugs.has(defTheme.slug)) {
          merged.push(defTheme);
        }
      }

      return filterNotDeleted(merged).map(enhanceThemeWithScreenshot);
    } catch (err) {
      console.warn('Menggunakan fallback data tema riil:', err);
      return filterNotDeleted(DEFAULT_THEMES).map(enhanceThemeWithScreenshot);
    }
  },

  async getActiveThemes(): Promise<Theme[]> {
    const deletedSlugs = getDeletedThemeSlugs();
    const filterNotDeleted = (list: Theme[]) => 
      list.filter(t => !deletedSlugs.has(t.id?.toLowerCase()) && !deletedSlugs.has(t.slug?.toLowerCase()));

    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        return filterNotDeleted(DEFAULT_THEMES).map(enhanceThemeWithScreenshot);
      }

      const existingSlugs = new Set(data.map((t: any) => t.slug));
      const merged = [...data];

      for (const defTheme of DEFAULT_THEMES) {
        if (!existingSlugs.has(defTheme.slug) && !deletedSlugs.has(defTheme.slug)) {
          merged.push(defTheme);
        }
      }

      return filterNotDeleted(merged).map(enhanceThemeWithScreenshot);
    } catch (err) {
      console.warn('Gagal memuat tema aktif Supabase, fallback:', err);
      return filterNotDeleted(DEFAULT_THEMES).map(enhanceThemeWithScreenshot);
    }
  },

  async getTheme(id: string): Promise<Theme> {
    const normalized = (id || '').toLowerCase().trim();
    const targetSlug = THEME_ALIASES[normalized] || normalized;
    const foundDefault = DEFAULT_THEMES.find(t => t.id === normalized || t.slug === targetSlug);
    if (foundDefault) {
      return enhanceThemeWithScreenshot(foundDefault);
    }

    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return enhanceThemeWithScreenshot(data);
      }
    } catch {}

    return REAL_KUALA_LUMPUR_HERITAGE_THEME;
  },

  async getThemeBySlug(slug: string): Promise<Theme> {
    const normalized = (slug || '').toLowerCase().trim();
    const targetSlug = THEME_ALIASES[normalized] || normalized;
    const foundDefault = DEFAULT_THEMES.find(t => t.slug === targetSlug);
    if (foundDefault) {
      return enhanceThemeWithScreenshot(foundDefault);
    }

    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();
      
      if (!error && data) {
        return enhanceThemeWithScreenshot(data);
      }
    } catch {}

    return slug === 'secret-garden' ? REAL_SECRET_GARDEN_THEME : (slug === 'nirwana-sarangan' ? REAL_NIRWANA_SARANGAN_THEME : REAL_SPLIT_FLORAL_THEME);
  },

  async createTheme(theme: Partial<Theme>) {
    if (theme.slug) {
      restoreThemeSlug(theme.slug);
    }
    const { data, error } = await supabase
      .from('themes')
      .insert(theme)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Theme;
  },

  async updateTheme(id: string, theme: Partial<Theme>) {
    if (theme.slug) {
      restoreThemeSlug(theme.slug);
    }
    const { data, error } = await supabase
      .from('themes')
      .update(theme)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Theme;
  },

  async deleteTheme(id: string) {
    try {
      // Find theme to capture both id and slug
      const allThemes = await themeService.getThemes().catch(() => []);
      const target = allThemes.find(t => t.id === id || t.slug === id);

      markThemeDeleted(id);
      if (target?.slug) {
        markThemeDeleted(target.slug);
      }

      const { error } = await supabase
        .from('themes')
        .delete()
        .eq('id', id);
        
      if (target?.slug) {
        await supabase.from('themes').delete().eq('slug', target.slug);
      }

      if (error) {
        console.warn('Supabase delete error (persisted via local blacklist):', error);
      }
    } catch (err) {
      console.warn('deleteTheme fallback applied:', err);
      markThemeDeleted(id);
    }
  }
};
