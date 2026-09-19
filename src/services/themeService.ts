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

// Fallback theme sesuai data riil yang ada di database (Split Floral)
export const REAL_SPLIT_FLORAL_THEME: Theme = {
  id: '409ac803-1486-4995-9a5d-de5f65d170bc',
  name: 'Split Floral',
  slug: 'split-floral',
  description: 'Tema split screen klasik dengan ornamen floral, bingkai lengkung vintage, entrance video arch, dan alunan saxophone romantis.',
  category: 'Elegant & Classic',
  preview_image: '/bg-floral.jpg',
  thumbnail: '/bg-floral.jpg',
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
  preview_image: '/themes/secret-garden/assets/preview.jpg',
  thumbnail: '/themes/secret-garden/assets/preview.jpg',
  status: 'active',
  badge: 'Tema Baru Populer',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { primaryColor: '#9A6E76', secondaryColor: '#E6DED8', style: 'botanical' },
  created_at: '2026-09-19T10:00:00.000000+00:00'
};

export const DEFAULT_THEMES: Theme[] = [
  REAL_SPLIT_FLORAL_THEME,
  REAL_SECRET_GARDEN_THEME,
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

      // Merge database themes with Secret Garden if not yet inserted to database
      const existingSlugs = new Set(data.map((t: any) => t.slug));
      const merged = [...data];
      if (!existingSlugs.has('secret-garden')) {
        merged.push(REAL_SECRET_GARDEN_THEME);
      }
      return (merged as unknown) as Theme[];
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
      if (!existingSlugs.has('secret-garden')) {
        merged.push(REAL_SECRET_GARDEN_THEME);
      }
      return (merged as unknown) as Theme[];
    } catch (err) {
      return DEFAULT_THEMES;
    }
  },

  async getTheme(id: string): Promise<Theme> {
    if (id === REAL_SECRET_GARDEN_THEME.id || id === 'secret-garden') {
      return REAL_SECRET_GARDEN_THEME;
    }
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return (data as unknown) as Theme;
      }
    } catch (_) {}

    return REAL_SPLIT_FLORAL_THEME;
  },

  async getThemeBySlug(slug: string): Promise<Theme> {
    if (slug === 'secret-garden') {
      return REAL_SECRET_GARDEN_THEME;
    }
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .eq('slug', slug)
        .eq('status', 'active')
        .single();
      
      if (!error && data) {
        return (data as unknown) as Theme;
      }
    } catch (_) {}

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
