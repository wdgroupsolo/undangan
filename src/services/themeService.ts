import { supabase } from '../lib/supabase';

export interface Theme {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string | null;
  preview_image: string | null;
  thumbnail: string | null;
  status: 'active' | 'inactive';
  features: any;
  theme_config: any;
  created_at: string;
  badge?: string;
  rating?: string;
}

export const THEME_SCREENSHOT_MAP: Record<string, string> = {
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
};

export const enhanceThemeWithScreenshot = (theme: any): Theme => {
  const screenshot = THEME_SCREENSHOT_MAP[theme.slug];
  if (screenshot) {
    return {
      ...theme,
      preview_image: screenshot,
      thumbnail: screenshot,
    };
  }
  return theme as Theme;
};

// New Masterpiece Theme: Royal Wayang Gold (Keraton Jawa & Pendopo Joglo)
export const REAL_ROYAL_WAYANG_THEME: Theme = {
  id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  name: 'Royal Wayang Gold',
  slug: 'royal-wayang-gold',
  description: 'Tema pernikahan agung bernuansa Keraton Jawa & Pendopo Joglo malam hari, diperkaya siluet wayang Kamajaya & Kamaratih berlapis emas, ornamen floral klasik, serta alunan sakral khas Nusantara.',
  category: 'Traditional & Heritage',
  preview_image: '/themes/royal-wayang-theme-preview.png',
  thumbnail: '/themes/royal-wayang-theme-preview.png',
  status: 'active',
  badge: 'Tema Keraton Baru',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
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

export const DEFAULT_THEMES: Theme[] = [
  REAL_ROYAL_WAYANG_THEME,
  REAL_JAVANESE_HERITAGE_THEME,
  REAL_MAROON_GOLD_THEME,
  REAL_SECRET_GARDEN_THEME,
  REAL_SPLIT_FLORAL_THEME,
  REAL_ROYAL_ELEGANCE_THEME,
];

export const themeService = {
  async getThemes(): Promise<Theme[]> {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        return DEFAULT_THEMES;
      }

      // Merge database themes with Royal Wayang, Secret Garden, Maroon Gold, and Javanese Heritage
      const existingSlugs = new Set(data.map((t: any) => t.slug));
      const merged = [...data];

      if (!existingSlugs.has('royal-wayang-gold')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_ROYAL_WAYANG_THEME.id,
              name: REAL_ROYAL_WAYANG_THEME.name,
              slug: REAL_ROYAL_WAYANG_THEME.slug,
              description: REAL_ROYAL_WAYANG_THEME.description,
              category: REAL_ROYAL_WAYANG_THEME.category,
              preview_image: REAL_ROYAL_WAYANG_THEME.preview_image,
              thumbnail: REAL_ROYAL_WAYANG_THEME.thumbnail,
              status: 'active',
              features: REAL_ROYAL_WAYANG_THEME.features,
              theme_config: REAL_ROYAL_WAYANG_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_ROYAL_WAYANG_THEME);
          }
        } catch {
          merged.push(REAL_ROYAL_WAYANG_THEME);
        }
      }

      if (!existingSlugs.has('secret-garden')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_SECRET_GARDEN_THEME.id,
              name: REAL_SECRET_GARDEN_THEME.name,
              slug: REAL_SECRET_GARDEN_THEME.slug,
              description: REAL_SECRET_GARDEN_THEME.description,
              category: REAL_SECRET_GARDEN_THEME.category,
              preview_image: REAL_SECRET_GARDEN_THEME.preview_image,
              thumbnail: REAL_SECRET_GARDEN_THEME.thumbnail,
              status: 'active',
              features: REAL_SECRET_GARDEN_THEME.features,
              theme_config: REAL_SECRET_GARDEN_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_SECRET_GARDEN_THEME);
          }
        } catch {
          merged.push(REAL_SECRET_GARDEN_THEME);
        }
      }

      if (!existingSlugs.has('maroon-gold')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_MAROON_GOLD_THEME.id,
              name: REAL_MAROON_GOLD_THEME.name,
              slug: REAL_MAROON_GOLD_THEME.slug,
              description: REAL_MAROON_GOLD_THEME.description,
              category: REAL_MAROON_GOLD_THEME.category,
              preview_image: REAL_MAROON_GOLD_THEME.preview_image,
              thumbnail: REAL_MAROON_GOLD_THEME.thumbnail,
              status: 'active',
              features: REAL_MAROON_GOLD_THEME.features,
              theme_config: REAL_MAROON_GOLD_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_MAROON_GOLD_THEME);
          }
        } catch {
          merged.push(REAL_MAROON_GOLD_THEME);
        }
      }

      if (!existingSlugs.has('javanese-heritage')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_JAVANESE_HERITAGE_THEME.id,
              name: REAL_JAVANESE_HERITAGE_THEME.name,
              slug: REAL_JAVANESE_HERITAGE_THEME.slug,
              description: REAL_JAVANESE_HERITAGE_THEME.description,
              category: REAL_JAVANESE_HERITAGE_THEME.category,
              preview_image: REAL_JAVANESE_HERITAGE_THEME.preview_image,
              thumbnail: REAL_JAVANESE_HERITAGE_THEME.thumbnail,
              status: 'active',
              features: REAL_JAVANESE_HERITAGE_THEME.features,
              theme_config: REAL_JAVANESE_HERITAGE_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_JAVANESE_HERITAGE_THEME);
          }
        } catch {
          merged.push(REAL_JAVANESE_HERITAGE_THEME);
        }
      }

      return merged.map(enhanceThemeWithScreenshot);
    } catch (err) {
      console.warn('Menggunakan fallback data tema riil:', err);
      return DEFAULT_THEMES;
    }
  },

  async getActiveThemes(): Promise<Theme[]> {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        return DEFAULT_THEMES;
      }

      const existingSlugs = new Set(data.map((t: any) => t.slug));
      const merged = [...data];

      if (!existingSlugs.has('royal-wayang-gold')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_ROYAL_WAYANG_THEME.id,
              name: REAL_ROYAL_WAYANG_THEME.name,
              slug: REAL_ROYAL_WAYANG_THEME.slug,
              description: REAL_ROYAL_WAYANG_THEME.description,
              category: REAL_ROYAL_WAYANG_THEME.category,
              preview_image: REAL_ROYAL_WAYANG_THEME.preview_image,
              thumbnail: REAL_ROYAL_WAYANG_THEME.thumbnail,
              status: 'active',
              features: REAL_ROYAL_WAYANG_THEME.features,
              theme_config: REAL_ROYAL_WAYANG_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_ROYAL_WAYANG_THEME);
          }
        } catch {
          merged.push(REAL_ROYAL_WAYANG_THEME);
        }
      }

      if (!existingSlugs.has('javanese-heritage')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_JAVANESE_HERITAGE_THEME.id,
              name: REAL_JAVANESE_HERITAGE_THEME.name,
              slug: REAL_JAVANESE_HERITAGE_THEME.slug,
              description: REAL_JAVANESE_HERITAGE_THEME.description,
              category: REAL_JAVANESE_HERITAGE_THEME.category,
              preview_image: REAL_JAVANESE_HERITAGE_THEME.preview_image,
              thumbnail: REAL_JAVANESE_HERITAGE_THEME.thumbnail,
              status: 'active',
              features: REAL_JAVANESE_HERITAGE_THEME.features,
              theme_config: REAL_JAVANESE_HERITAGE_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_JAVANESE_HERITAGE_THEME);
          }
        } catch {
          merged.push(REAL_JAVANESE_HERITAGE_THEME);
        }
      }

      if (!existingSlugs.has('secret-garden')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_SECRET_GARDEN_THEME.id,
              name: REAL_SECRET_GARDEN_THEME.name,
              slug: REAL_SECRET_GARDEN_THEME.slug,
              description: REAL_SECRET_GARDEN_THEME.description,
              category: REAL_SECRET_GARDEN_THEME.category,
              preview_image: REAL_SECRET_GARDEN_THEME.preview_image,
              thumbnail: REAL_SECRET_GARDEN_THEME.thumbnail,
              status: 'active',
              features: REAL_SECRET_GARDEN_THEME.features,
              theme_config: REAL_SECRET_GARDEN_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_SECRET_GARDEN_THEME);
          }
        } catch {
          merged.push(REAL_SECRET_GARDEN_THEME);
        }
      }

      if (!existingSlugs.has('maroon-gold')) {
        try {
          const { data: inserted, error: insertErr } = await supabase
            .from('themes')
            .insert({
              id: REAL_MAROON_GOLD_THEME.id,
              name: REAL_MAROON_GOLD_THEME.name,
              slug: REAL_MAROON_GOLD_THEME.slug,
              description: REAL_MAROON_GOLD_THEME.description,
              category: REAL_MAROON_GOLD_THEME.category,
              preview_image: REAL_MAROON_GOLD_THEME.preview_image,
              thumbnail: REAL_MAROON_GOLD_THEME.thumbnail,
              status: 'active',
              features: REAL_MAROON_GOLD_THEME.features,
              theme_config: REAL_MAROON_GOLD_THEME.theme_config
            })
            .select()
            .single();

          if (!insertErr && inserted) {
            merged.push(inserted as Theme);
          } else {
            merged.push(REAL_MAROON_GOLD_THEME);
          }
        } catch {
          merged.push(REAL_MAROON_GOLD_THEME);
        }
      }

      return merged.map(enhanceThemeWithScreenshot);
    } catch {
      return DEFAULT_THEMES;
    }
  },

  async getTheme(id: string): Promise<Theme> {
    if (id === REAL_ROYAL_WAYANG_THEME.id || id === 'royal-wayang-gold' || id === 'royal-wayang' || id === 'joglo-wayang') {
      return REAL_ROYAL_WAYANG_THEME;
    }
    if (id === REAL_JAVANESE_HERITAGE_THEME.id || id === 'javanese-heritage' || id === 'jawa-klasik' || id === 'borobudur') {
      return REAL_JAVANESE_HERITAGE_THEME;
    }
    if (id === REAL_SECRET_GARDEN_THEME.id || id === 'secret-garden') {
      return REAL_SECRET_GARDEN_THEME;
    }
    if (id === REAL_ROYAL_ELEGANCE_THEME.id || id === 'royal-elegance') {
      return REAL_ROYAL_ELEGANCE_THEME;
    }
    if (id === REAL_MAROON_GOLD_THEME.id || id === 'maroon-gold') {
      return REAL_MAROON_GOLD_THEME;
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

    return REAL_ROYAL_WAYANG_THEME;
  },

  async getThemeBySlug(slug: string): Promise<Theme> {
    if (slug === 'royal-wayang-gold' || slug === 'royal-wayang' || slug === 'joglo-wayang') {
      return REAL_ROYAL_WAYANG_THEME;
    }
    if (slug === 'javanese-heritage' || slug === 'jawa-klasik' || slug === 'borobudur') {
      return REAL_JAVANESE_HERITAGE_THEME;
    }
    if (slug === 'secret-garden') {
      return REAL_SECRET_GARDEN_THEME;
    }
    if (slug === 'royal-elegance') {
      return REAL_ROYAL_ELEGANCE_THEME;
    }
    if (slug === 'maroon-gold') {
      return REAL_MAROON_GOLD_THEME;
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

    return slug === 'secret-garden' ? REAL_SECRET_GARDEN_THEME : REAL_SPLIT_FLORAL_THEME;
  },

  async createTheme(theme: Partial<Theme>) {
    const { data, error } = await supabase
      .from('themes')
      .insert(theme)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Theme;
  },

  async updateTheme(id: string, theme: Partial<Theme>) {
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
    const { error } = await supabase
      .from('themes')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};
