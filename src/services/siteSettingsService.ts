import { supabase } from '../lib/supabase';

export interface SiteSettings {
  // Web Client Status (Live vs Paused / Maintenance)
  client_status: 'live' | 'paused';
  maintenance_title: string;
  maintenance_message: string;

  // Web Client Brand & Information
  brand_name: string;
  tagline: string;
  primary_domain: string;
  contact_phone: string;
  contact_email: string;
  contact_instagram: string;
  office_address: string;

  // Web Admin Settings
  admin_name: string;
  admin_email: string;
  enable_rsvp_notifications: boolean;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  client_status: 'live',
  maintenance_title: 'Website Sedang Dalam Pemeliharaan',
  maintenance_message: 'Layanan website publik kami sedang dinonaktifkan sementara untuk pembaharuan sistem. Kami akan segera kembali online.',
  
  brand_name: 'WD GROUP',
  tagline: 'Exclusive Digital Wedding Invitation Management',
  primary_domain: 'https://rsvp.wdgroupcompany.biz.id',
  contact_phone: '6285707909415',
  contact_email: 'admin@wdgroup.com',
  contact_instagram: '@wdgroupcompany',
  office_address: 'Solo, Jawa Tengah & Magetan, Jawa Timur, Indonesia',

  admin_name: 'Admin WD Group',
  admin_email: 'admin@wdgroup.com',
  enable_rsvp_notifications: true
};

const LOCAL_STORAGE_KEY = 'wd_site_settings';

export const siteSettingsService = {
  getSettingsSync(): SiteSettings {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Fallback
    }
    return DEFAULT_SITE_SETTINGS;
  },

  async getSettings(): Promise<SiteSettings> {
    const local = this.getSettingsSync();

    try {
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'site_settings')
        .maybeSingle();

      if (!error && data && data.value) {
        const merged = { ...DEFAULT_SITE_SETTINGS, ...local, ...data.value };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged));
        return merged;
      }
    } catch (err) {
      console.warn('Gagal mengambil pengaturan dari Supabase, menggunakan lokal:', err);
    }

    return local;
  },

  async updateSettings(updates: Partial<SiteSettings>): Promise<SiteSettings> {
    const current = this.getSettingsSync();
    const updated = { ...current, ...updates };

    // 1. Save to local storage for zero-latency instant effect
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new CustomEvent('wedding:site-settings-changed', { detail: updated }));
    } catch (err) {
      console.warn('Gagal menyimpan pengaturan ke localStorage:', err);
    }

    // 2. Persist to Supabase in background
    try {
      const { error } = await supabase
        .from('settings')
        .upsert(
          { key: 'site_settings', value: updated, updated_at: new Date().toISOString() },
          { onConflict: 'key' }
        );

      if (error) {
        console.warn('Gagal upsert settings ke Supabase:', error.message);
      }
    } catch (err) {
      console.warn('Supabase settings update fallback to local:', err);
    }

    return updated;
  },

  async toggleClientPause(): Promise<SiteSettings> {
    const current = this.getSettingsSync();
    const nextStatus = current.client_status === 'live' ? 'paused' : 'live';
    return this.updateSettings({ client_status: nextStatus });
  }
};
