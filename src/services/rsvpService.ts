import { supabase } from '../lib/supabase';

export interface RSVPItem {
  id: string;
  invitation_id: string;
  guest_id?: string | null;
  name: string;
  attendance: 'attending' | 'not_attending' | 'maybe';
  number_of_guests: number;
  message: string | null;
  created_at: string;
  invitation?: {
    id: string;
    title: string | null;
    slug: string;
    client?: {
      id: string;
      name: string;
    } | null;
  } | null;
}

const LOCAL_STORAGE_KEY = 'wd_rsvp_entries';

// Helper to get local stored RSVPs
const getLocalRsvps = (): RSVPItem[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

// Helper to save local stored RSVPs
const saveLocalRsvps = (items: RSVPItem[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
  } catch (err) {
    console.warn('Gagal menyimpan RSVP ke penyimpanan lokal:', err);
  }
};

export const rsvpService = {
  // Get RSVPs for a specific invitation (used on the public invitation page)
  async getRsvpsByInvitation(invitationId: string): Promise<RSVPItem[]> {
    const localItems = getLocalRsvps().filter(item => item.invitation_id === invitationId);

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', invitationId)
        .order('created_at', { ascending: false });

      if (!error && data) {
        // Merge Supabase data with any unsynced local items
        const dbMap = new Map(data.map((item: any) => [item.id, item]));
        const combined = [...data];

        for (const local of localItems) {
          if (!dbMap.has(local.id)) {
            combined.unshift(local);
          }
        }

        return combined as RSVPItem[];
      }
    } catch (err) {
      console.warn('Menggunakan data lokal RSVP karena jaringan Supabase:', err);
    }

    return localItems;
  },

  // Get all RSVPs with invitation & client information (used on Admin RSVP page)
  async getAllRsvps(filterInvitationId?: string): Promise<RSVPItem[]> {
    const localItems = getLocalRsvps();

    try {
      let query = supabase
        .from('rsvps')
        .select('*, invitation:invitations(id, title, slug, client:clients(id, name))')
        .order('created_at', { ascending: false });

      if (filterInvitationId) {
        query = query.eq('invitation_id', filterInvitationId);
      }

      const { data, error } = await query;

      if (!error && data) {
        const dbMap = new Map(data.map((item: any) => [item.id, item]));
        const combined = [...data];

        const relevantLocals = filterInvitationId 
          ? localItems.filter(item => item.invitation_id === filterInvitationId)
          : localItems;

        for (const local of relevantLocals) {
          if (!dbMap.has(local.id)) {
            combined.unshift(local);
          }
        }

        return combined as RSVPItem[];
      }
    } catch (err) {
      console.warn('Menggunakan data lokal untuk dashboard admin RSVP:', err);
    }

    return filterInvitationId
      ? localItems.filter(item => item.invitation_id === filterInvitationId)
      : localItems;
  },

  // Submit RSVP from the invitation page
  async submitRsvp(payload: {
    invitation_id: string;
    name: string;
    attendance: 'attending' | 'not_attending' | 'maybe';
    number_of_guests: number;
    message: string | null;
    invitation_title?: string;
    client_name?: string;
  }): Promise<RSVPItem> {
    const newEntry: RSVPItem = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'rsvp-' + Date.now(),
      invitation_id: payload.invitation_id,
      name: payload.name.trim(),
      attendance: payload.attendance,
      number_of_guests: payload.number_of_guests,
      message: payload.message ? payload.message.trim() : null,
      created_at: new Date().toISOString(),
      invitation: {
        id: payload.invitation_id,
        title: payload.invitation_title || 'The Wedding of Agni & Putri',
        slug: 'agni-putri',
        client: {
          id: 'c1000000-0000-0000-0000-000000000001',
          name: payload.client_name || 'AGNI KAHURIPAN',
        },
      },
    };

    // Store in local storage first for instant feedback and offline resilience
    const currentLocals = getLocalRsvps();
    saveLocalRsvps([newEntry, ...currentLocals]);

    try {
      const { data, error } = await supabase
        .from('rsvps')
        .insert({
          id: newEntry.id,
          invitation_id: payload.invitation_id,
          name: payload.name.trim(),
          attendance: payload.attendance,
          number_of_guests: payload.number_of_guests,
          message: payload.message ? payload.message.trim() : null,
        })
        .select()
        .single();

      if (!error && data) {
        return {
          ...newEntry,
          ...data,
        };
      }
    } catch (err) {
      console.warn('Gagal menyimpan ke Supabase, data tersimpan di penyimpanan lokal:', err);
    }

    return newEntry;
  },

  // Delete an RSVP record (admin action)
  async deleteRsvp(id: string): Promise<void> {
    // Remove from local storage
    const remaining = getLocalRsvps().filter(item => item.id !== id);
    saveLocalRsvps(remaining);

    try {
      await supabase.from('rsvps').delete().eq('id', id);
    } catch (err) {
      console.warn('Gagal menghapus dari Supabase:', err);
    }
  },

  // Check-in / Presensi Kehadiran via Scan Barcode atau QR Code
  async checkInRsvp(payload: {
    invitation_id?: string;
    name: string;
    attendance?: 'attending' | 'not_attending' | 'maybe';
    number_of_guests?: number;
    code?: string;
    invitation_title?: string;
    client_name?: string;
  }): Promise<{ rsvp: RSVPItem; isNew: boolean }> {
    const rawCheck = `${payload.code || ''} ${payload.name || ''} ${payload.invitation_id || ''}`.toUpperCase();
    if (rawCheck.includes('DEMO-TESTIMONIAL') || rawCheck.includes('WD-DEMO-SAMPLE') || rawCheck.includes('WD-DEMO-TESTIMONI') || rawCheck.includes('DO-NOT-SCAN')) {
      const err = new Error('DEMO_BARCODE_BLOCKED: Barcode ini adalah versi demo tema portofolio dan tidak dapat digunakan untuk konfirmasi presensi resmi.');
      (err as any).isDemoBlocked = true;
      throw err;
    }

    const all = await rsvpService.getAllRsvps(payload.invitation_id);
    const normalizedName = payload.name.trim().toLowerCase();

    // Check if RSVP exists by code or by name
    const existing = all.find(item => {
      const matchName = item.name.trim().toLowerCase() === normalizedName;
      const matchInv = !payload.invitation_id || item.invitation_id === payload.invitation_id;
      return matchName && matchInv;
    });

    if (existing) {
      const updatedAttendance = payload.attendance || 'attending';
      const updatedGuests = payload.number_of_guests || existing.number_of_guests || 1;

      // Update in local storage
      const locals = getLocalRsvps().map(item => {
        if (item.id === existing.id) {
          return {
            ...item,
            attendance: updatedAttendance,
            number_of_guests: updatedGuests,
          };
        }
        return item;
      });
      saveLocalRsvps(locals);

      // Update in Supabase
      try {
        await supabase
          .from('rsvps')
          .update({
            attendance: updatedAttendance,
            number_of_guests: updatedGuests,
          })
          .eq('id', existing.id);
      } catch (err) {
        console.warn('Gagal update check-in di Supabase:', err);
      }

      return {
        rsvp: {
          ...existing,
          attendance: updatedAttendance,
          number_of_guests: updatedGuests,
        },
        isNew: false,
      };
    }

    // Otherwise create a new check-in record
    const targetInvId = payload.invitation_id || 'e2000000-0000-0000-0000-000000000002';
    const newRecord = await rsvpService.submitRsvp({
      invitation_id: targetInvId,
      name: payload.name.trim(),
      attendance: payload.attendance || 'attending',
      number_of_guests: payload.number_of_guests || 1,
      message: 'Presensi check-in langsung via scan barcode di meja penerima tamu',
      invitation_title: payload.invitation_title,
      client_name: payload.client_name,
    });

    return {
      rsvp: newRecord,
      isNew: true,
    };
  },
};
