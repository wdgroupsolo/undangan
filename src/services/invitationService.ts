import { supabase } from '../lib/supabase';

export interface Invitation {
  id: string;
  client_id: string;
  theme_id: string | null;
  title: string | null;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  wedding_date: string | null;
  settings: any;
  created_at: string;
}

export const invitationService = {
  async getInvitations() {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, client:clients(name), theme:themes(name)')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data as any[];
  },

  async getInvitation(id: string) {
    const { data, error } = await supabase
      .from('invitations')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return (data as unknown) as Invitation;
  },

  async getInvitationBySlug(slug: string) {
    const { data, error } = await supabase
      .from('invitations')
      .select('*, theme:themes(*)')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    
    if (error) throw error;
    return data;
  },

  async createInvitation(invitation: Partial<Invitation>) {
    const { data, error } = await supabase
      .from('invitations')
      .insert(invitation)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Invitation;
  },

  async updateInvitation(id: string, invitation: Partial<Invitation>) {
    const { data, error } = await supabase
      .from('invitations')
      .update(invitation)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Invitation;
  },

  async deleteInvitation(id: string) {
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};
