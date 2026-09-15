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
    const { data, error } = await supabase.from('gift_accounts').select('*').eq('invitation_id', invitationId);
    if (error) throw error; return data;
  },
  async saveGift(invitationId: string, giftData: any) {
    if (giftData.id) {
      const { data, error } = await supabase.from('gift_accounts').update(giftData).eq('id', giftData.id).select().single();
      if (error) throw error; return data;
    } else {
      const { data, error } = await supabase.from('gift_accounts').insert({ invitation_id: invitationId, ...giftData }).select().single();
      if (error) throw error; return data;
    }
  },
  async deleteGift(giftId: string) {
    const { error } = await supabase.from('gift_accounts').delete().eq('id', giftId);
    if (error) throw error;
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
