import { supabase } from '../lib/supabase';

export interface Invitation {
  id: string;
  client_id: string;
  theme_id: string | null;
  title: string | null;
  slug: string;
  status: 'draft' | 'published' | 'paused' | 'archived';
  wedding_date: string | null;
  settings: any;
  created_at: string;
  client?: any;
  theme?: any;
}

const getSavedStatus = (idOrSlug: string): 'draft' | 'published' | 'paused' | 'archived' | null => {
  try {
    return (localStorage.getItem(`wd_inv_status_${idOrSlug}`) as any) || null;
  } catch {
    return null;
  }
};

const setSavedStatus = (id: string, slug?: string, status?: string) => {
  if (!status) return;
  try {
    localStorage.setItem(`wd_inv_status_${id}`, status);
    if (slug) {
      localStorage.setItem(`wd_inv_status_${slug}`, status);
    }
    // Also broadcast custom event so other components or tabs update immediately
    window.dispatchEvent(new CustomEvent('wedding:status-changed', { detail: { id, slug, status } }));
  } catch {}
};

export const INVITATION_AGNI_PUTRI: Invitation & { theme?: any; client?: any } = {
  id: 'e2000000-0000-0000-0000-000000000002',
  client_id: 'c1000000-0000-0000-0000-000000000001',
  theme_id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  title: 'The Wedding of Agni & Putri',
  slug: 'agni-kahuripan',
  status: 'published',
  wedding_date: '2026-10-25T10:00:00+07:00',
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
    music_title: 'Landon Pigg - Falling In Love At A Coffee Shop',
    music_url: '/music/landon-pigg-falling-in-love.mp3',
    show_akad: false,
    show_resepsi: true,
    show_love_story: false,
    show_live_streaming: false
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
    let result: any[] = [];
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*, client:clients(name), theme:themes(name)')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        const hasAgni = data.some(inv => inv.slug === 'agni-putri' || inv.slug === 'agni-kahuripan');
        result = hasAgni ? data : [INVITATION_AGNI_PUTRI, ...data];
      } else {
        result = [INVITATION_AGNI_PUTRI];
      }
    } catch (e) {
      console.warn('Error fetching invitations from Supabase:', e);
      result = [INVITATION_AGNI_PUTRI];
    }

    // Apply any locally cached status updates (e.g., 'paused')
    return result.map(inv => {
      const cached = getSavedStatus(inv.id) || getSavedStatus(inv.slug);
      return cached ? { ...inv, status: cached } : inv;
    });
  },

  async getInvitation(id: string) {
    const cachedStatus = getSavedStatus(id);
    if (id === INVITATION_AGNI_PUTRI.id) {
      return cachedStatus ? { ...INVITATION_AGNI_PUTRI, status: cachedStatus } : INVITATION_AGNI_PUTRI;
    }
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) {
        return (cachedStatus ? { ...data, status: cachedStatus } : data) as Invitation;
      }
    } catch (e) {
      console.warn('Error fetching invitation by id:', e);
    }
    return cachedStatus ? { ...INVITATION_AGNI_PUTRI, status: cachedStatus } : INVITATION_AGNI_PUTRI;
  },

  async getInvitationBySlug(slug: string) {
    const cleanSlug = decodeURIComponent(slug || '').toLowerCase().trim();
    const isAgni = cleanSlug.includes('agni') || cleanSlug.includes('kribo');

    // Check if status is paused or overridden in localStorage
    const cachedStatus = getSavedStatus(slug) || 
      getSavedStatus(cleanSlug) || 
      (isAgni ? (getSavedStatus('e2000000-0000-0000-0000-000000000002') || getSavedStatus('agni-putri') || getSavedStatus('agni-kahuripan')) : null);

    if (isAgni) {
      try {
        const { data, error } = await supabase
          .from('invitations')
          .select('*, theme:themes(*)')
          .or(`slug.eq.${slug},slug.eq.agni-putri,slug.eq.agni-kahuripan`)
          .maybeSingle();
        if (!error && data) {
          return {
            ...data,
            status: cachedStatus || data.status || 'published'
          };
        }
      } catch {}
      return {
        ...INVITATION_AGNI_PUTRI,
        slug: slug,
        status: cachedStatus || INVITATION_AGNI_PUTRI.status || 'published'
      };
    }

    const targetSlug = (slug === 'bagas-siti' || slug === 'habib-adiba') ? 'steven-bunga' : slug;
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*, theme:themes(*)')
        .eq('slug', targetSlug)
        .maybeSingle();
      
      if (!error && data) {
        return {
          ...data,
          status: cachedStatus || data.status || 'published'
        };
      }
      
      if (targetSlug !== 'steven-bunga') {
        const { data: fallbackData } = await supabase
          .from('invitations')
          .select('*, theme:themes(*)')
          .eq('slug', 'steven-bunga')
          .maybeSingle();
        if (fallbackData) {
          return {
            ...fallbackData,
            status: cachedStatus || fallbackData.status || 'published'
          };
        }
      }
    } catch {}

    // Resilient fallback for demo routes so invitation preview never fails
    return {
      id: 'demo-invitation-id',
      slug: targetSlug,
      title: slug === 'habib-adiba' ? 'The Wedding of Habib & Adiba' : 'The Wedding of Steven & Bunga',
      status: cachedStatus || 'published',
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
    if (invitation.status) {
      setSavedStatus(id, invitation.slug, invitation.status);
      if (id === INVITATION_AGNI_PUTRI.id) {
        INVITATION_AGNI_PUTRI.status = invitation.status as any;
        setSavedStatus(id, 'agni-putri', invitation.status);
        setSavedStatus(id, 'agni-kahuripan', invitation.status);
      }
    }

    try {
      const { data, error } = await supabase
        .from('invitations')
        .update(invitation)
        .eq('id', id)
        .select()
        .single();
        
      if (!error && data) {
        return (data as unknown) as Invitation;
      }
    } catch (err) {
      console.warn('Update invitation in Supabase fallback to local:', err);
    }

    return {
      ...INVITATION_AGNI_PUTRI,
      id,
      ...invitation
    } as Invitation;
  },

  async deleteInvitation(id: string) {
    try {
      localStorage.removeItem(`wd_inv_status_${id}`);
    } catch {}
    const { error } = await supabase
      .from('invitations')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};
