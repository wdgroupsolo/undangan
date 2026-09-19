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
  category: 'Elegant',
  preview_image: '/bg-floral.jpg',
  thumbnail: '/bg-floral.jpg',
  status: 'active',
  badge: 'Tema Utama',
  rating: '5.0',
  features: ['cover', 'couple', 'countdown', 'events', 'gallery', 'story', 'rsvp', 'guestbook', 'gift', 'music'],
  theme_config: { primaryColor: '#846358', secondaryColor: '#faf6ee', style: 'classic' },
  created_at: '2026-09-09T08:15:59.286645+00:00'
};

export const themeService = {
  async getThemes(): Promise<Theme[]> {
    try {
      const { data, error } = await supabase
        .from('themes')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error || !data || data.length === 0) {
        return [REAL_SPLIT_FLORAL_THEME];
      }

      return (data as unknown) as Theme[];
    } catch (err) {
      console.warn('Menggunakan fallback data tema riil:', err);
      return [REAL_SPLIT_FLORAL_THEME];
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
        return [REAL_SPLIT_FLORAL_THEME];
      }

      return (data as unknown) as Theme[];
    } catch (err) {
      return [REAL_SPLIT_FLORAL_THEME];
    }
  },

  async getTheme(id: string): Promise<Theme> {
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

    return REAL_SPLIT_FLORAL_THEME;
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
