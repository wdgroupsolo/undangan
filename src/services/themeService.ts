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
}

export const themeService = {
  async getThemes() {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as unknown) as Theme[];
  },

  async getActiveThemes() {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return (data as unknown) as Theme[];
  },

  async getTheme(id: string) {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return (data as unknown) as Theme;
  },

  async getThemeBySlug(slug: string) {
    const { data, error } = await supabase
      .from('themes')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();
    
    if (error) throw error;
    return (data as unknown) as Theme;
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
