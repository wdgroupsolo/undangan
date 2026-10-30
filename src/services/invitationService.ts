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

export const INVITATION_BIMA_RATNA: Invitation & { theme?: any; client?: any } = {
  id: 'e3000000-0000-0000-0000-000000000003',
  client_id: 'c2000000-0000-0000-0000-000000000002',
  theme_id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  title: 'The Wedding of Bima & Ratna',
  slug: 'bima-ratna',
  status: 'published',
  wedding_date: '2026-12-12T10:00:00+07:00',
  settings: {
    use_barcode: true, // Klien Testimoni DENGAN Barcode VIP Pass Presensi
    theme_slug: 'royal-wayang-gold',
    default_guest_name: 'Bapak/Ibu Tamu Undangan',
    cover_title: 'BIMA & RATNA',
    cover_photo: '/themes/agni-putri/couple-outdoor.jpg',
    groom_instagram: '@bima_ardiansyah',
    bride_instagram: '@ratnakusuma',
    gift_recipient: 'BIMA ARDIANSYAH',
    gift_address: 'Jl. Slamet Riyadi No. 120, Solo, Jawa Tengah',
    entertainment_day: 'Live Campursari & Akustik Klasik',
    entertainment_night: 'Resepsi Elegan & Ramah Tamah',
    color_concept: 'Hitam & Emas (Royal Wayang Gold)',
    music_title: 'Landon Pigg - Falling In Love At A Coffee Shop',
    music_url: '/music/landon-pigg-falling-in-love.mp3',
    show_akad: true,
    show_resepsi: true,
    show_love_story: true,
    show_live_streaming: false
  },
  theme: {
    id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
    name: 'Royal Wayang Gold',
    slug: 'royal-wayang-gold'
  },
  client: {
    id: 'c2000000-0000-0000-0000-000000000002',
    name: 'BIMA & RATNA'
  },
  created_at: '2026-10-10T10:00:00Z'
};

export const INVITATION_DIMAS_ANISA: Invitation & { theme?: any; client?: any } = {
  id: 'e4000000-0000-0000-0000-000000000004',
  client_id: 'c3000000-0000-0000-0000-000000000003',
  theme_id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
  title: 'The Wedding of Dimas & Anisa',
  slug: 'dimas-anisa',
  status: 'published',
  wedding_date: '2026-11-20T09:00:00+07:00',
  settings: {
    use_barcode: false, // Klien Testimoni TANPA Barcode (Standard RSVP Langsung Muncul di Bawah Form)
    theme_slug: 'royal-wayang-gold',
    default_guest_name: 'Bapak/Ibu Tamu Undangan',
    cover_title: 'DIMAS & ANISA',
    cover_photo: '/themes/agni-putri/couple-outdoor.jpg',
    groom_instagram: '@dimas_pratama',
    bride_instagram: '@anisa_wardani',
    gift_recipient: 'DIMAS PRATAMA',
    gift_address: 'Jl. Malioboro No. 45, Danurejan, Yogyakarta',
    entertainment_day: 'Akustik & Musik Romantis',
    entertainment_night: 'Ramah Tamah & Doa Bersama',
    color_concept: 'Hitam & Emas (Royal Wayang Gold)',
    music_title: 'Landon Pigg - Falling In Love At A Coffee Shop',
    music_url: '/music/landon-pigg-falling-in-love.mp3',
    show_akad: true,
    show_resepsi: true,
    show_love_story: true,
    show_live_streaming: false
  },
  theme: {
    id: 'f4a5b6c7-8901-4345-a789-0bcdef012345',
    name: 'Royal Wayang Gold',
    slug: 'royal-wayang-gold'
  },
  client: {
    id: 'c3000000-0000-0000-0000-000000000003',
    name: 'DIMAS & ANISA'
  },
  created_at: '2026-10-11T09:00:00Z'
};

export const INVITATION_HAFIZ_SYAFIKA: Invitation & { theme?: any; client?: any } = {
  id: 'e5000000-0000-0000-0000-000000000005',
  client_id: 'c4000000-0000-0000-0000-000000000004',
  theme_id: 'c3d4e5f6-7890-4123-d456-7ef890123456',
  title: 'The Wedding of Hafiz & Syafika',
  slug: 'hafiz-syafika',
  status: 'published',
  wedding_date: '2026-11-28T10:00:00+08:00',
  settings: {
    theme_slug: 'kuala-lumpur-heritage',
    default_guest_name: 'Tuan/Puan/Saudara/Saudari',
    cover_title: 'HAFIZ & SYAFIKA',
    cover_photo: '/themes/kuala-lumpur-heritage/couple-portrait.jpg',
    music_title: 'Bergema Sampai Selamanya',
    music_url: '/music/bergema-sampai-selamanya.mp3',
    gift_recipient: 'HAFIZ & SYAFIKA',
    gift_address: 'No. 28, Jalan Ampang Hilir, Taman U-Thant, 55000 Kuala Lumpur, Malaysia',
    color_concept: 'Royal Songket & Rose Malay Heritage',
    show_akad: true,
    show_resepsi: true,
    show_love_story: true,
    show_live_streaming: false
  },
  theme: {
    id: 'c3d4e5f6-7890-4123-d456-7ef890123456',
    name: 'Kuala Lumpur Heritage',
    slug: 'kuala-lumpur-heritage'
  },
  client: {
    name: 'HAFIZ & SYAFIKA'
  },
  created_at: '2026-10-30T10:00:00Z'
};

export const INVITATION_DEMO_TESTIMONI = INVITATION_BIMA_RATNA;

export const invitationService = {
  async getInvitations() {
    let result: any[] = [];
    try {
      const { data, error } = await supabase
        .from('invitations')
        .select('*, client:clients(name), theme:themes(name)')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        result = [...data];
      }
    } catch (e) {
      console.warn('Error fetching invitations from Supabase:', e);
    }

    const hasAgni = result.some(inv => inv.slug === 'agni-putri' || inv.slug === 'agni-kahuripan');
    const hasBima = result.some(inv => inv.id === INVITATION_BIMA_RATNA.id || inv.slug === 'bima-ratna');
    const hasDimas = result.some(inv => inv.id === INVITATION_DIMAS_ANISA.id || inv.slug === 'dimas-anisa');

    if (!hasDimas) result.unshift(INVITATION_DIMAS_ANISA);
    if (!hasBima) result.unshift(INVITATION_BIMA_RATNA);
    if (!hasAgni) result.unshift(INVITATION_AGNI_PUTRI);

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
    if (id === INVITATION_BIMA_RATNA.id) {
      return cachedStatus ? { ...INVITATION_BIMA_RATNA, status: cachedStatus } : INVITATION_BIMA_RATNA;
    }
    if (id === INVITATION_DIMAS_ANISA.id) {
      return cachedStatus ? { ...INVITATION_DIMAS_ANISA, status: cachedStatus } : INVITATION_DIMAS_ANISA;
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
    const isHafiz = cleanSlug === 'hafiz-syafika' || cleanSlug.includes('hafiz') || cleanSlug.includes('syafika') || cleanSlug === 'kuala-lumpur-heritage';
    const isAgni = cleanSlug.includes('agni') || cleanSlug.includes('kribo');
    const isBima = cleanSlug === 'bima-ratna' || cleanSlug === 'demo-testimoni' || cleanSlug === 'demo-undangan' || cleanSlug.includes('bima');
    const isDimas = cleanSlug === 'dimas-anisa' || cleanSlug.includes('dimas');

    // Check if status is paused or overridden in localStorage
    const cachedStatus = getSavedStatus(slug) || 
      getSavedStatus(cleanSlug) || 
      (isHafiz ? (getSavedStatus('e5000000-0000-0000-0000-000000000005') || getSavedStatus('hafiz-syafika')) : null) ||
      (isAgni ? (getSavedStatus('e2000000-0000-0000-0000-000000000002') || getSavedStatus('agni-putri') || getSavedStatus('agni-kahuripan')) : null) ||
      (isBima ? getSavedStatus('e3000000-0000-0000-0000-000000000003') : null) ||
      (isDimas ? getSavedStatus('e4000000-0000-0000-0000-000000000004') : null);

    if (isHafiz) {
      return {
        ...INVITATION_HAFIZ_SYAFIKA,
        slug: slug,
        status: cachedStatus || INVITATION_HAFIZ_SYAFIKA.status || 'published'
      };
    }

    if (isBima) {
      return {
        ...INVITATION_BIMA_RATNA,
        slug: slug,
        status: cachedStatus || INVITATION_BIMA_RATNA.status || 'published'
      };
    }

    if (isDimas) {
      return {
        ...INVITATION_DIMAS_ANISA,
        slug: slug,
        status: cachedStatus || INVITATION_DIMAS_ANISA.status || 'published'
      };
    }

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

    const targetSlug = (slug === 'bagas-siti' || slug === 'habib-adiba' || slug === 'bunga-steven' || slug === 'nirwana-sarangan') ? 'steven-bunga' : slug;
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

    // Resilient fallback for demo theme routes (Demo Tema di foto kedua)
    return {
      id: 'demo-theme-invitation',
      slug: targetSlug,
      title: slug === 'habib-adiba' ? 'The Wedding of Habib & Adiba' : 'The Wedding of Steven & Bunga',
      status: cachedStatus || 'published',
      wedding_date: '2026-10-12',
      settings: {
        is_theme_demo: true,
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
