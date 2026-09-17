import { supabase } from '../lib/supabase';

export const editorService = {
  // Couple Info
  async getCouple(invitationId: string) {
    const { data, error } = await supabase.from('couples').select('*').eq('invitation_id', invitationId).maybeSingle();
    if (error) throw error;
    return data;
  },
  async upsertCouple(invitationId: string, coupleData: any) {
    const existing = await this.getCouple(invitationId);
    if (existing) {
      const { data, error } = await supabase.from('couples').update(coupleData).eq('invitation_id', invitationId).select().single();
      if (error) throw error;
      return data;
    } else {
      const { data, error } = await supabase.from('couples').insert({ invitation_id: invitationId, ...coupleData }).select().single();
      if (error) throw error;
      return data;
    }
  },

  // Events
  async getEvents(invitationId: string) {
    const { data, error } = await supabase.from('events').select('*').eq('invitation_id', invitationId).order('sort_order');
    if (error) throw error;
    return data;
  },
  async saveEvent(invitationId: string, eventData: any) {
    if (eventData.id) {
      const { data, error } = await supabase.from('events').update(eventData).eq('id', eventData.id).select().single();
      if (error) throw error; return data;
    } else {
      const { data, error } = await supabase.from('events').insert({ invitation_id: invitationId, ...eventData }).select().single();
      if (error) throw error; return data;
    }
  },
  async deleteEvent(eventId: string) {
    const { error } = await supabase.from('events').delete().eq('id', eventId);
    if (error) throw error;
  },

  // Stories
  async getStories(invitationId: string) {
    const { data, error } = await supabase.from('stories').select('*').eq('invitation_id', invitationId).order('sort_order');
    if (error) throw error;
    return data;
  },
  async saveStory(invitationId: string, storyData: any) {
    if (storyData.id) {
      const { data, error } = await supabase.from('stories').update(storyData).eq('id', storyData.id).select().single();
      if (error) throw error; return data;
    } else {
      const { data, error } = await supabase.from('stories').insert({ invitation_id: invitationId, ...storyData }).select().single();
      if (error) throw error; return data;
    }
  },
  async deleteStory(storyId: string) {
    const { error } = await supabase.from('stories').delete().eq('id', storyId);
    if (error) throw error;
  },

  // Gallery
  async getGallery(invitationId: string) {
    const { data, error } = await supabase.from('gallery').select('*').eq('invitation_id', invitationId).order('sort_order');
    if (error) throw error;
    return data;
  },
  async saveGalleryImage(invitationId: string, imageUrl: string) {
    const { data, error } = await supabase.from('gallery').insert({ invitation_id: invitationId, image_url: imageUrl }).select().single();
    if (error) throw error; return data;
  },
  async deleteGalleryImage(imageId: string) {
    const { error } = await supabase.from('gallery').delete().eq('id', imageId);
    if (error) throw error;
  },

  // Music & Gifts
  async getMusic(invitationId: string) {
    const { data, error } = await supabase.from('music').select('*').eq('invitation_id', invitationId).maybeSingle();
    if (error) throw error; return data;
  },
  async upsertMusic(invitationId: string, musicData: any) {
    const existing = await this.getMusic(invitationId);
    if (existing) {
      const { data, error } = await supabase.from('music').update(musicData).eq('invitation_id', invitationId).select().single();
      if (error) throw error; return data;
    } else {
      const { data, error } = await supabase.from('music').insert({ invitation_id: invitationId, ...musicData }).select().single();
      if (error) throw error; return data;
    }
  },
  
  async getGifts(invitationId: string) {
    // 1. Check gift_accounts table in Supabase
    try {
      const { data, error } = await supabase.from('gift_accounts').select('*').eq('invitation_id', invitationId);
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Could not fetch from gift_accounts table:', e);
    }

    // 2. Check localStorage
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem(`gifts_${invitationId}`);
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        }
      } catch (e) {
        console.warn('Could not parse local gifts:', e);
      }
    }

    // 3. Check invitation settings
    try {
      const { data: inv } = await supabase.from('invitations').select('settings').eq('id', invitationId).maybeSingle();
      if (inv?.settings?.gifts && Array.isArray(inv.settings.gifts) && inv.settings.gifts.length > 0) {
        return inv.settings.gifts;
      }
    } catch (e) {
      console.warn('Could not fetch gifts from settings:', e);
    }

    return [];
  },

  async saveGift(invitationId: string, giftData: any) {
    const { id, ...payload } = giftData;
    const isNew = !id || id.trim() === '';
    const giftId = isNew ? `gift_${Date.now()}_${Math.random().toString(36).substring(2, 6)}` : id;

    const giftRecord = {
      id: giftId,
      invitation_id: invitationId,
      type: payload.type || 'bank',
      provider: payload.provider || 'BCA',
      account_name: payload.account_name || '',
      account_number: payload.account_number || '',
      is_active: payload.is_active !== undefined ? payload.is_active : true,
    };

    // 1. Try Supabase gift_accounts
    try {
      if (isNew) {
        // Exclude empty id so postgres uses uuid_generate_v4() if valid uuid expected
        const { data } = await supabase
          .from('gift_accounts')
          .insert({ invitation_id: invitationId, ...payload })
          .select()
          .single();
        if (data?.id) giftRecord.id = data.id;
      } else {
        await supabase
          .from('gift_accounts')
          .update(payload)
          .eq('id', id);
      }
    } catch (e) {
      console.warn('Supabase gift_accounts insert/update warning:', e);
    }

    // 2. Always persist in localStorage for instant offline & dev persistence
    if (typeof window !== 'undefined') {
      try {
        const local = localStorage.getItem(`gifts_${invitationId}`);
        const list = local ? JSON.parse(local) : [];
        const existingIdx = list.findIndex((g: any) => g.id === giftRecord.id);
        if (existingIdx >= 0) {
          list[existingIdx] = giftRecord;
        } else {
          list.push(giftRecord);
        }
        localStorage.setItem(`gifts_${invitationId}`, JSON.stringify(list));
      } catch (e) {
        console.warn('Local storage save error:', e);
      }
    }

    return giftRecord;
  },

  async deleteGift(giftId: string, invitationId?: string) {
    // 1. Try Supabase
    try {
      await supabase.from('gift_accounts').delete().eq('id', giftId);
    } catch (e) {
      console.warn('Supabase delete gift error:', e);
    }

    // 2. Remove from localStorage
    if (typeof window !== 'undefined' && invitationId) {
      try {
        const local = localStorage.getItem(`gifts_${invitationId}`);
        if (local) {
          const list = JSON.parse(local);
          const filtered = list.filter((g: any) => g.id !== giftId);
          localStorage.setItem(`gifts_${invitationId}`, JSON.stringify(filtered));
        }
      } catch (e) {
        console.warn('Local storage delete error:', e);
      }
    }
  },

  // Generic file upload
  async uploadFile(bucket: string, path: string, file: File) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `${path}/${fileName}`;

    const { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);
    if (uploadError) throw uploadError;

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
  }
};
