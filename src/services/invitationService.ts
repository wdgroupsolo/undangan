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

export const INVITATION_AGNI_PUTRI: Invitation & { theme?: any; client?: any } = {
  id: 'e2000000-0000-0000-0000-000000000002',
  client_id: 'c1000000-0000-0000-0000-000000000001',
  theme_id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  title: 'The Wedding of Agni & Putri',
  slug: 'agni-putri',
  status: 'published',
  wedding_date: '2026-10-25T09:00:00+07:00',
  settings: {
    theme_slug: 'royal-wayang-gold',
    default_guest_name: 'Tamu Undangan',
    cover_title: 'AGNI & PUTRI',
    cover_photo: '/themes/agni-putri/couple-arch.jpg',
    groom_instagram: '@agnikahuripan',
    bride_instagram: '@_putrikahuripan',
    gift_recipient: 'AGNI KAHURIPAN',
    gift_address: 'Dk. Talang, Lemah Putih, RT 05, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur (No. HP: 0895 3401 92500)',
    entertainment_day: 'Campursari',
    entertainment_night: 'Wayang Kulit',
    color_concept: 'Hitam & Emas (Royal Wayang Gold)',
    music_title: 'Landon Pigg - Falling In Love At A Coffee Shop'
  },
  theme: {
    id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
    name: 'Royal Wayang Gold',
    slug: 'royal-wayang-gold'
  },
  client: {
    name: 'AGNI KAHURIPAN'
  },
  created_at: '2026-10-06T13:30:00Z'
};

export const invitationService = {
  async getInvitations() {
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*, client:clients(name), theme:themes(name)')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const hasAgni = data.some(inv => inv.slug === 'agni-putri');
        return hasAgni ? data : [INVITATION_AGNI_PUTRI, ...data];
      }
    } catch (e) {
      console.warn('Error fetching invitations from Supabase:', e);
    }
    return [INVITATION_AGNI_PUTRI];
  },

  async getInvitation(id: string) {
    if (id === INVITATION_AGNI_PUTRI.id) return INVITATION_AGNI_PUTRI;
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) return (data as unknown) as Invitation;
    } catch (e) {
      console.warn('Error fetching invitation by id:', e);
    }
    return INVITATION_AGNI_PUTRI;
  },

  async getInvitationBySlug(slug: string) {
    const cleanSlug = decodeURIComponent(slug || '').toLowerCase().trim();
    const isAgni = cleanSlug.includes('agni') || cleanSlug.includes('kribo');

    if (isAgni) {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*, theme:themes(*)')
          .eq('slug', slug)
          .eq('status', 'published')
          .maybeSingle();
        if (!error && data) return data;
      } catch {}
      return {
        ...INVITATION_AGNI_PUTRI,
        slug: slug
      };
    }

    const targetSlug = (slug === 'bagas-siti' || slug === 'habib-adiba') ? 'steven-bunga' : slug;
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*, theme:themes(*)')
        .eq('slug', targetSlug)
        .eq('status', 'published')
        .single();
      
      if (!error && data) {
        return data;
      }
      
      if (targetSlug !== 'steven-bunga') {
        const { data: fallbackData } = await supabase
          .from('invitations')
          .select('*, theme:themes(*)')
          .eq('slug', 'steven-bunga')
          .eq('status', 'published')
          .single();
        if (fallbackData) return fallbackData;
      }
    } catch {}

    // Resilient fallback for demo routes so invitation preview never fails
    return {
      id: 'demo-invitation-id',
      slug: targetSlug,
      title: slug === 'habib-adiba' ? 'The Wedding of Habib & Adiba' : 'The Wedding of Steven & Bunga',
      status: 'published',
      wedding_date: '2026-10-12',
      settings: {
        theme_slug: slug === 'habib-adiba' ? 'javanese-heritage' : 'maroon-gold'
      },
      theme: {
        slug: slug === 'habib-adiba' ? 'javanese-heritage' : 'maroon-gold',
        name: slug === 'habib-adiba' ? 'Javanese Heritage' : 'Maroon Gold'
      }
    };
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
