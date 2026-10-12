import { supabase } from '../lib/supabase';

export interface Client {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  status: 'active' | 'inactive';
  created_at: string;
}

export const CLIENT_AGNI_PUTRI: Client = {
  id: 'c1000000-0000-0000-0000-000000000001',
  name: 'AGNI KAHURIPAN',
  phone: '0895 3401 92500',
  email: 'agnikahuripan@gmail.com',
  address: 'Dk. Talang, Lemah Putih, RT 05, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur',
  notes: 'Konsep Hitam & Emas (Royal Wayang Gold). Resepsi: 25 Oktober 2026. Hiburan: Siang Campursari & Malam Wayang Kulit. Rek BRI 6361 0100 2988 509 a.n. AGNI KAHURIPAN',
  status: 'active',
  created_at: '2026-10-06T13:30:00Z',
};

export const CLIENT_BIMA_RATNA: Client = {
  id: 'c2000000-0000-0000-0000-000000000002',
  name: 'BIMA & RATNA',
  phone: '0812-3456-7890',
  email: 'bima.ratna@wdgroup.com',
  address: 'Solo, Jawa Tengah',
  notes: 'Klien Testimoni WD Group (Pakai Barcode VIP Pass Presensi). Konsep Elegan Royal Wayang Gold.',
  status: 'active',
  created_at: '2026-10-10T10:00:00Z',
};

export const CLIENT_DIMAS_ANISA: Client = {
  id: 'c3000000-0000-0000-0000-000000000003',
  name: 'DIMAS & ANISA',
  phone: '0821-9876-5432',
  email: 'dimas.anisa@wdgroup.com',
  address: 'Yogyakarta, D.I. Yogyakarta',
  notes: 'Klien Testimoni WD Group (Tanpa Barcode). Model RSVP standar langsung masuk ke database dan tampil di bawah form ucapan.',
  status: 'active',
  created_at: '2026-10-11T09:00:00Z',
};

export const CLIENT_DEMO_TESTIMONI = CLIENT_BIMA_RATNA;

export const clientService = {
  async getClients() {
    let list: Client[] = [];
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (!error && data && data.length > 0) {
        list = data as Client[];
      }
    } catch (e) {
      console.warn('Error fetching clients from Supabase:', e);
    }

    // Ensure Agni Putri, Bima Ratna (Testi Barcode), and Dimas Anisa (Testi Tanpa Barcode) clients are present
    const hasAgni = list.some(c => c.name.toLowerCase().includes('agni'));
    const hasBima = list.some(c => c.id === CLIENT_BIMA_RATNA.id || c.name.toLowerCase().includes('bima'));
    const hasDimas = list.some(c => c.id === CLIENT_DIMAS_ANISA.id || c.name.toLowerCase().includes('dimas'));

    const result = [...list];
    if (!hasDimas) result.unshift(CLIENT_DIMAS_ANISA);
    if (!hasBima) result.unshift(CLIENT_BIMA_RATNA);
    if (!hasAgni) result.unshift(CLIENT_AGNI_PUTRI);

    return result;
  },

  async getClient(id: string) {
    if (id === CLIENT_AGNI_PUTRI.id) return CLIENT_AGNI_PUTRI;
    if (id === CLIENT_BIMA_RATNA.id || id === 'demo-client') return CLIENT_BIMA_RATNA;
    if (id === CLIENT_DIMAS_ANISA.id) return CLIENT_DIMAS_ANISA;
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('id', id)
        .single();
      
      if (!error && data) return data as unknown as Client;
    } catch (e) {
      console.warn('Error fetching client by id:', e);
    }
    return CLIENT_AGNI_PUTRI;
  },

  async createClient(client: Partial<Client>) {
    const { data, error } = await supabase
      .from('clients')
      .insert(client)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Client;
  },

  async updateClient(id: string, client: Partial<Client>) {
    const { data, error } = await supabase
      .from('clients')
      .update(client)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    return (data as unknown) as Client;
  },

  async deleteClient(id: string) {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
  }
};
