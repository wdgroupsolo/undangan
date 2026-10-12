export interface BarcodePassData {
  name: string;
  code: string;
  attendance?: string;
  guests?: number;
  timestamp?: string;
  isDemo?: boolean;
}

/**
 * Menghasilkan barcode code yang stabil dan deterministik untuk tamu dan undangan tertentu.
 * Kode barcode TIDAK AKAN BERGANTI meskipun website ditutup, dibuka kembali, atau direfresh.
 */
export const generateStableBarcodeCode = (
  prefix: string,
  invitationIdOrSlug?: string,
  guestName?: string,
  existingCode?: string
): string => {
  // Jika sudah ada kode sebelumnya, pertahankan kode tersebut secara permanen
  if (existingCode && existingCode.trim() !== '') {
    return existingCode.trim();
  }

  const cleanPrefix = (prefix || 'VIP').toUpperCase();
  const cleanId = (invitationIdOrSlug || 'PASS').slice(0, 4).toUpperCase();
  const normalized = (guestName || 'TAMU').trim().toLowerCase();

  // Algoritma hash deterministik konsisten (bukan Math.random())
  let hash = 0;
  const str = `${cleanId}_${normalized}`;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const stableNum = Math.abs(hash % 9000) + 1000;
  return `${cleanPrefix}-${cleanId}-${stableNum}`;
};

/**
 * Memuat tiket barcode yang telah tersimpan dari localStorage dengan beberapa fallback kunci.
 */
export const loadSavedBarcodePass = (
  invitationId?: string,
  invitationSlug?: string,
  guestName?: string,
  themeKey?: string
): BarcodePassData | null => {
  if (typeof window === 'undefined') return null;

  const cleanGuest = (guestName || '').trim().toLowerCase();
  const keysToTry = [
    invitationId ? `wd_rsvp_pass_${invitationId}` : null,
    invitationSlug ? `wd_rsvp_pass_${invitationSlug}` : null,
    invitationId && cleanGuest ? `wd_rsvp_pass_${invitationId}_${cleanGuest}` : null,
    invitationSlug && cleanGuest ? `wd_rsvp_pass_${invitationSlug}_${cleanGuest}` : null,
    themeKey ? `wd_rsvp_pass_${themeKey}` : null,
  ].filter(Boolean) as string[];

  for (const key of keysToTry) {
    try {
      const saved = localStorage.getItem(key);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.code) {
          return parsed as BarcodePassData;
        }
      }
    } catch {}
  }

  return null;
};

/**
 * Menyimpan tiket barcode secara permanen ke localStorage di semua kunci terkait
 * agar tidak pernah hilang atau berganti meskipun browser/website ditutup.
 */
export const saveBarcodePass = (
  passData: BarcodePassData,
  invitationId?: string,
  invitationSlug?: string,
  themeKey?: string
): void => {
  if (typeof window === 'undefined' || !passData) return;

  const cleanGuest = (passData.name || '').trim().toLowerCase();
  const keysToSave = [
    invitationId ? `wd_rsvp_pass_${invitationId}` : null,
    invitationSlug ? `wd_rsvp_pass_${invitationSlug}` : null,
    invitationId && cleanGuest ? `wd_rsvp_pass_${invitationId}_${cleanGuest}` : null,
    invitationSlug && cleanGuest ? `wd_rsvp_pass_${invitationSlug}_${cleanGuest}` : null,
    themeKey ? `wd_rsvp_pass_${themeKey}` : null,
  ].filter(Boolean) as string[];

  const json = JSON.stringify(passData);
  keysToSave.forEach(key => {
    try {
      localStorage.setItem(key, json);
    } catch {}
  });
};

/**
 * Menghapus tiket barcode dari penyimpanan saat tamu memilih untuk mengubah data.
 */
export const clearBarcodePass = (
  invitationId?: string,
  invitationSlug?: string,
  guestName?: string,
  themeKey?: string
): void => {
  if (typeof window === 'undefined') return;

  const cleanGuest = (guestName || '').trim().toLowerCase();
  const keysToRemove = [
    invitationId ? `wd_rsvp_pass_${invitationId}` : null,
    invitationSlug ? `wd_rsvp_pass_${invitationSlug}` : null,
    invitationId && cleanGuest ? `wd_rsvp_pass_${invitationId}_${cleanGuest}` : null,
    invitationSlug && cleanGuest ? `wd_rsvp_pass_${invitationSlug}_${cleanGuest}` : null,
    themeKey ? `wd_rsvp_pass_${themeKey}` : null,
  ].filter(Boolean) as string[];

  keysToRemove.forEach(key => {
    try {
      localStorage.removeItem(key);
    } catch {}
  });
};
