export const CONTACT_CONFIG = {
  whatsappNumber: '6285707909415',
  whatsappRaw: '085707909415',
  whatsappDisplay: '+62 857-0790-9415',
  email: 'groupcompanywd@gmail.com',
  getWhatsAppUrl: (message?: string) => {
    const textParam = message ? `?text=${encodeURIComponent(message)}` : '';
    return `https://wa.me/6285707909415${textParam}`;
  }
};
