import { supabase } from '../lib/supabase';

export interface Guest {
  id: string;
  invitation_id: string;
  name: string;
  phone?: string | null;
  email?: string | null;
  guest_code?: string | null;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

const LOCAL_STORAGE_KEY = 'wd_guest_entries';

// Pre-seeded 329 guests for Agni & Putri
export const INITIAL_AGNI_GUESTS: string[] = [
  "aan", "adel", "adenanta", "adikagilang", "adim bukori", "adinugros", "adipati argopuro", "aditya kukuh",
  "adji", "adriansah aliief", "afandi fandi", "agung", "agus cupplis", "ahmad", "aiziway", "ajeng chindy",
  "aji ilham", "ajiz mabu", "aliapcw", "aliev chandra", "alif yudhistira", "ALIT", "alwy", "alya",
  "amri", "amri fariel", "andra cemplon", "angga", "anggun putri", "anricoalamsyah", "apped", "ari showto",
  "ari simbolon", "arif kepek", "arinda", "arini nur eka", "arnold", "ary biyangane", "astrid", "atika gumilar",
  "atmo", "azifsu", "azza", "bagus alezar", "bagus fitroh", "bandieng", "BAYU", "BAYU BENJO",
  "bayu eka", "bela surya", "BELLA", "bendot", "berley", "BIMO TARA", "birma", "bowo",
  "bramgimb", "BRIAN ARINANDA", "brillian ahmad", "buangheng", "chandra kobo", "christriya", "ciplon", "dading",
  "danan bni", "danang prayogo", "darari", "deadty", "deddy yanuar", "dekjaw", "dena angga bali", "dendi",
  "denny", "denny ok", "denny uble", "deska", "desmaya", "dewi dipsy", "dhamar", "dhiniyah",
  "diangolda", "dimas pangestu", "dio angga", "dista", "dulas", "dwangga", "dwi muhadi", "dyah junjing",
  "dyon", "edward", "eliamarga", "ellena", "elly dan anchi", "ERISYAH", "erki", "ern.isme",
  "erren", "eryn", "esa", "eva putri", "ewsa dovik", "fais mur", "faisal amblong", "fajaradhik",
  "fake paxy", "farik", "farusi yabid", "fatia", "fatima kalila", "fatrisya", "fazyaaf", "febi putri",
  "febryan kusuma", "feldy", "ferly", "figa", "fuad", "galang", "galih herlambang", "gelegar mentog",
  "geligelo", "gesa pamungkas", "ghifari", "GILANG", "gilang risky", "GISUL", "glangimani", "gusti",
  "gusti dan alia", "halilintar", "hamida", "hananta", "harlina mega", "havandhi", "helmi pier", "hendrik",
  "heri pong", "hestu", "hima wiaya brodin", "hiras", "husen", "icha", "ichi", "ida",
  "igna amy", "iis", "ikke", "imade ade", "imona", "indah indun", "INDUS", "inggrid",
  "ipang", "iqbal", "irfandisk", "izha", "jarot", "jason gregorius", "jefrani", "johnnyclash",
  "jonathan kev", "josh fllush", "kamalevi", "katon langit", "ken", "khoirul bali", "knsnbll", "koh bud",
  "komodoracer", "krim", "krisna luthfan", "kunyup", "kurniawan eko", "kurniawanap", "kusna jamil", "lamtoro",
  "lasvellas", "levi", "lia piuw", "lindanoviviya", "lintang", "llisa tul kantil", "lukas", "LULU",
  "magda", "male", "manda", "marion", "marlin", "martin", "mas ervan", "mas nur",
  "mbah tito", "mego", "meita", "melano", "melinda madiun", "melly", "michel", "mirza pradika",
  "muhzaky", "nama", "nawfal utama", "nikenprior", "NINGGAR", "novia piud", "novitawd", "nunung",
  "nur hudi", "nur tiyasan", "octa tata", "okky otong", "oky dyah", "olyn", "onesonesan", "OZI & RATNA",
  "pahlefi lepek", "paijo", "paiz kuren", "pak fanny sampurna", "panadolmerah", "panduwicak", "pape", "petus",
  "pherdy", "pipit sarkowi", "pitoy", "pradana arief", "prasmita yoga", "pratiti westi", "primaaranii", "priyo hw",
  "pupun amanda", "putra sambiyo (bodong )", "qiqi biant", "radedya", "raga taruna", "rahardian seno", "rahmat t nugraha", "RAMA",
  "rama cuplis", "rara", "rara patok", "ravi wicaksono", "ray muntan", "rayhan algazali", "REA REO", "regga pengedar",
  "rehan sepetak", "relliart", "reza basro", "reza JB", "reza reso", "rezza rez", "rifky sigkek", "rimang",
  "rindupagi ryan", "rio kamil dan istri", "riska yudianto sakun", "RISTO", "riza puri", "rizky fatoni", "rizkygvndks", "rohmawan",
  "romy batawi", "rony sajang", "ropil", "run ngk official", "salim", "sanda", "sarah nila", "sartrio gumilang",
  "sekarnndita", "septianbayu", "seviaca", "shendy nasrul", "shinta ayu kartika", "sindy", "siping", "sirga",
  "slinkybones owi", "sorayaainii", "ssstriani", "sugeng ivy", "sultan ateng", "swasti ikak", "syahnaz", "t widi",
  "T Y", "taufanlandi", "tegar", "terry", "tista", "titis", "top zero", "totok kopapi",
  "triaditha", "tyas kartika", "ukiabrori", "ully", "usrok", "uwx", "vandripw", "vendy yustian",
  "veyradinda", "victy", "vina", "vionacandra", "virga", "viya", "wah22yudi", "wahyu cuyek",
  "wahyu mony", "wahyu tantra", "wakhid", "wejang", "widha wisnu", "widi bagong", "winda devi", "wisnupratama",
  "yanuar", "yanuarf", "yasin", "yass dinda", "yola", "yoza", "yusuf cahyo", "zahra", "zhella"
];

const DEFAULT_INVITATION_ID = 'e2000000-0000-0000-0000-000000000002';

const getLocalGuests = (): Guest[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Gagal membaca data tamu dari localStorage:', err);
  }

  // Generate initial seeds if empty
  const initialData: Guest[] = INITIAL_AGNI_GUESTS.map((name, idx) => ({
    id: `seed-guest-${idx + 1}`,
    invitation_id: DEFAULT_INVITATION_ID,
    name,
    guest_code: `GUEST-${String(idx + 1).padStart(3, '0')}`,
    status: 'active',
    created_at: new Date(Date.now() - (INITIAL_AGNI_GUESTS.length - idx) * 60000).toISOString()
  }));

  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialData));
  } catch {
    // Ignore storage quota
  }

  return initialData;
};

const saveLocalGuests = (guests: Guest[]) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guests));
  } catch (err) {
    console.warn('Gagal menyimpan tamu ke localStorage:', err);
  }
};

export const guestService = {
  async getGuests(invitationId?: string): Promise<Guest[]> {
    const local = getLocalGuests();
    const filteredLocal = invitationId ? local.filter(g => g.invitation_id === invitationId) : local;

    try {
      let query = supabase
        .from('guests')
        .select('*')
        .order('created_at', { ascending: true });

      if (invitationId) {
        query = query.eq('invitation_id', invitationId);
      }

      const { data, error } = await query;

      if (!error && data && data.length > 0) {
        // Merge Supabase with local items
        const dbMap = new Map(data.map((item: any) => [item.id, item]));
        const combined = [...data];

        for (const loc of filteredLocal) {
          if (!dbMap.has(loc.id)) {
            combined.push(loc);
          }
        }
        return combined as Guest[];
      }
    } catch (err) {
      console.warn('Menggunakan data tamu lokal:', err);
    }

    return filteredLocal;
  },

  async addGuest(guest: Omit<Guest, 'id'>): Promise<Guest> {
    const newGuest: Guest = {
      ...guest,
      id: `gst-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString()
    };

    // Save locally
    const current = getLocalGuests();
    current.unshift(newGuest);
    saveLocalGuests(current);

    // Try Supabase in background
    try {
      await supabase.from('guests').insert([{
        invitation_id: guest.invitation_id,
        name: guest.name,
        phone: guest.phone || null,
        email: guest.email || null,
        guest_code: guest.guest_code || null,
        status: guest.status || 'active'
      }]);
    } catch (err) {
      console.warn('Supabase insert guest fallback to local:', err);
    }

    return newGuest;
  },

  async addBatchGuests(newGuests: Omit<Guest, 'id'>[]): Promise<Guest[]> {
    const created: Guest[] = newGuests.map((g, idx) => ({
      ...g,
      id: `gst-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date(Date.now() + idx).toISOString()
    }));

    const current = getLocalGuests();
    const updated = [...created, ...current];
    saveLocalGuests(updated);

    // Try Supabase in background
    try {
      const dbPayload = newGuests.map(g => ({
        invitation_id: g.invitation_id,
        name: g.name,
        phone: g.phone || null,
        email: g.email || null,
        guest_code: g.guest_code || null,
        status: g.status || 'active'
      }));
      await supabase.from('guests').insert(dbPayload);
    } catch (err) {
      console.warn('Supabase batch insert fallback to local:', err);
    }

    return created;
  },

  async updateGuest(id: string, updates: Partial<Guest>): Promise<Guest> {
    const current = getLocalGuests();
    const idx = current.findIndex(g => g.id === id);
    if (idx !== -1) {
      current[idx] = { ...current[idx], ...updates, updated_at: new Date().toISOString() };
      saveLocalGuests(current);
    }

    try {
      await supabase.from('guests').update(updates).eq('id', id);
    } catch {
      // Ignore
    }

    return current[idx] || (updates as Guest);
  },

  async deleteGuest(id: string): Promise<void> {
    const current = getLocalGuests().filter(g => g.id !== id);
    saveLocalGuests(current);

    try {
      await supabase.from('guests').delete().eq('id', id);
    } catch {
      // Ignore
    }
  },

  async clearGuests(invitationId?: string): Promise<void> {
    if (invitationId) {
      const current = getLocalGuests().filter(g => g.invitation_id !== invitationId);
      saveLocalGuests(current);
      try {
        await supabase.from('guests').delete().eq('invitation_id', invitationId);
      } catch {
        // Ignore
      }
    } else {
      saveLocalGuests([]);
      try {
        await supabase.from('guests').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      } catch {
        // Ignore
      }
    }
  }
};
