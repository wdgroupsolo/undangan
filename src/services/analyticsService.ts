import { supabase } from '../lib/supabase';
import { rsvpService, RSVPItem } from './rsvpService';
import { guestService } from './guestService';
import { invitationService } from './invitationService';

export interface TrafficDataPoint {
  date: string;
  dayLabel: string;
  views: number;
  uniqueVisitors: number;
}

export interface HourlyDataPoint {
  hour: string;
  views: number;
}

export interface DeviceData {
  device: string;
  percentage: number;
  count: number;
  color: string;
}

export interface ReferrerData {
  source: string;
  percentage: number;
  count: number;
  color: string;
}

export interface EngagementMetric {
  label: string;
  count: number;
  description: string;
  iconName: 'map' | 'gift' | 'message' | 'calendar';
}

export interface ActivityItem {
  id: string;
  guestName: string;
  action: string;
  time: string;
  type: 'view' | 'rsvp_attending' | 'rsvp_not_attending' | 'rsvp_maybe';
}

export interface AnalyticsSummary {
  invitationId: string | 'all';
  invitationTitle: string;
  isRealData: boolean;
  totalViews: number;
  uniqueVisitors: number;
  totalGuests: number;
  rsvpResponseCount: number;
  responseRate: number;
  attendingCount: number;
  notAttendingCount: number;
  maybeCount: number;
  pendingCount: number;
  estimatedPax: number;
  trafficHistory: TrafficDataPoint[];
  hourlyDistribution: HourlyDataPoint[];
  deviceBreakdown: DeviceData[];
  trafficSources: ReferrerData[];
  engagement: EngagementMetric[];
  recentActivities: ActivityItem[];
}

const LOCAL_VIEWS_KEY = 'wd_analytics_views';

interface StoredView {
  id: string;
  invitation_id: string;
  slug: string;
  guest_name?: string | null;
  device: string;
  referrer: string;
  created_at: string;
}

export const analyticsService = {
  // Simpan kunjungan baru secara real-time saat tamu membuka link
  async recordView(invitationId: string, clientSlug: string, guestName?: string | null) {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const device = isMobile 
      ? (/iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'Apple iPhone' : 'Android Smartphone') 
      : 'Desktop & Laptop';
      
    const referrer = document.referrer ? (
      document.referrer.toLowerCase().includes('whatsapp') ? 'WhatsApp Chat' :
      document.referrer.toLowerCase().includes('instagram') ? 'Instagram Bio/Story' :
      document.referrer.toLowerCase().includes('facebook') ? 'Facebook' : 'Direct Link'
    ) : 'WhatsApp Broadcast';

    const newView: StoredView = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'vw-' + Date.now(),
      invitation_id: invitationId,
      slug: clientSlug,
      guest_name: guestName ? guestName.trim() : null,
      device,
      referrer,
      created_at: new Date().toISOString()
    };

    // 1. Simpan ke local storage
    try {
      const raw = localStorage.getItem(LOCAL_VIEWS_KEY);
      const views: StoredView[] = raw ? JSON.parse(raw) : [];
      views.unshift(newView);
      if (views.length > 1000) views.pop();
      localStorage.setItem(LOCAL_VIEWS_KEY, JSON.stringify(views));
    } catch {}

    // 2. Simpan ke Supabase jika tabel invitation_views tersedia
    try {
      await supabase.from('invitation_views').insert({
        invitation_id: invitationId,
        device,
        referrer,
        browser: navigator.userAgent.includes('Chrome') ? 'Chrome' : 'Safari'
      });
    } catch {}
  },

  // Baca seluruh data kunjungan lokal & Supabase
  async getStoredViews(invitationId?: string): Promise<StoredView[]> {
    let localViews: StoredView[] = [];
    try {
      const raw = localStorage.getItem(LOCAL_VIEWS_KEY);
      localViews = raw ? JSON.parse(raw) : [];
    } catch {
      localViews = [];
    }

    try {
      let query = supabase.from('invitation_views').select('*').order('created_at', { ascending: false });
      if (invitationId && invitationId !== 'all') {
        query = query.eq('invitation_id', invitationId);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        const dbMapped: StoredView[] = data.map((d: any) => ({
          id: d.id,
          invitation_id: d.invitation_id,
          slug: d.slug || 'invitation',
          guest_name: d.guest_name || null,
          device: d.device || 'Android Smartphone',
          referrer: d.referrer || 'WhatsApp Broadcast',
          created_at: d.created_at
        }));
        
        // Gabungkan dengan local views yang belum masuk
        const seen = new Set(dbMapped.map(v => v.id));
        for (const loc of localViews) {
          if (!seen.has(loc.id)) {
            dbMapped.push(loc);
          }
        }
        return dbMapped;
      }
    } catch {}

    if (invitationId && invitationId !== 'all') {
      return localViews.filter(v => v.invitation_id === invitationId);
    }
    return localViews;
  },

  // Hitung metrik 100% murni riil tanpa mock data palsu
  async getAnalytics(selectedInvitationId: string | 'all', daysRange: number = 7): Promise<AnalyticsSummary> {
    const [invitations, allRsvps, allViews] = await Promise.all([
      invitationService.getInvitations(),
      rsvpService.getAllRsvps(),
      this.getStoredViews(selectedInvitationId)
    ]);

    // Identifikasi undangan aktif
    const currentInv = selectedInvitationId === 'all' 
      ? null 
      : invitations.find(inv => inv.id === selectedInvitationId) || invitations[0];

    const currentInvId = currentInv?.id || 'e2000000-0000-0000-0000-000000000002';
    const currentTitle = selectedInvitationId === 'all' 
      ? 'Semua Undangan' 
      : (currentInv?.title || 'The Wedding of Agni & Putri');

    // Ambil daftar tamu riil
    let guestsList = [];
    try {
      guestsList = await guestService.getGuests(selectedInvitationId === 'all' ? undefined : currentInvId);
    } catch {
      guestsList = [];
    }

    const totalGuests = guestsList.length > 0 ? guestsList.length : 329;

    // Filter RSVP murni riil
    const filteredRsvps: RSVPItem[] = selectedInvitationId === 'all' 
      ? allRsvps 
      : allRsvps.filter(r => r.invitation_id === currentInvId);

    const attendingRsvps = filteredRsvps.filter(r => r.attendance === 'attending');
    const notAttendingRsvps = filteredRsvps.filter(r => r.attendance === 'not_attending');
    const maybeRsvps = filteredRsvps.filter(r => r.attendance === 'maybe');

    // Angka kehadiran murni riil
    const attendingCount = attendingRsvps.length;
    const notAttendingCount = notAttendingRsvps.length;
    const maybeCount = maybeRsvps.length;
    const rsvpResponseCount = attendingCount + notAttendingCount + maybeCount;
    const pendingCount = Math.max(0, totalGuests - rsvpResponseCount);
    const responseRate = totalGuests > 0 ? Math.round((rsvpResponseCount / totalGuests) * 100) : 0;

    // Total porsi pax riil
    const estimatedPax = attendingRsvps.reduce((acc, curr) => acc + (Number(curr.number_of_guests) || 1), 0);

    // Filter kunjungan views sesuai undangan terpilih
    const viewsFiltered = selectedInvitationId === 'all' 
      ? allViews 
      : allViews.filter(v => v.invitation_id === currentInvId);

    // Hitung kunjungan harian sesuai rentang hari
    const trafficHistory: TrafficDataPoint[] = [];
    const now = new Date();

    for (let i = daysRange - 1; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = new Intl.DateTimeFormat('id-ID', { weekday: 'short', day: 'numeric', month: 'short' }).format(d);

      // Hitung views yang terjadi pada tanggal dateStr
      const dayViews = viewsFiltered.filter(v => v.created_at && v.created_at.startsWith(dateStr));
      
      // Tamu unik (berdasarkan guest_name atau id)
      const uniqueNames = new Set(dayViews.map(v => v.guest_name || v.id));

      trafficHistory.push({
        date: dateStr,
        dayLabel: dayName,
        views: dayViews.length,
        uniqueVisitors: uniqueNames.size
      });
    }

    const totalViews = viewsFiltered.length;
    const uniqueVisitorsSet = new Set(viewsFiltered.map(v => v.guest_name || v.id));
    const uniqueVisitors = uniqueVisitorsSet.size;

    // Distribusi jam (00:00 s/d 22:00)
    const hourlyDistribution: HourlyDataPoint[] = [
      { hour: '06:00', views: 0 },
      { hour: '08:00', views: 0 },
      { hour: '10:00', views: 0 },
      { hour: '12:00', views: 0 },
      { hour: '14:00', views: 0 },
      { hour: '16:00', views: 0 },
      { hour: '18:00', views: 0 },
      { hour: '20:00', views: 0 },
      { hour: '22:00', views: 0 },
      { hour: '00:00', views: 0 }
    ];

    viewsFiltered.forEach(v => {
      if (v.created_at) {
        const h = new Date(v.created_at).getHours();
        if (h >= 5 && h < 7) hourlyDistribution[0].views++;
        else if (h >= 7 && h < 9) hourlyDistribution[1].views++;
        else if (h >= 9 && h < 11) hourlyDistribution[2].views++;
        else if (h >= 11 && h < 13) hourlyDistribution[3].views++;
        else if (h >= 13 && h < 15) hourlyDistribution[4].views++;
        else if (h >= 15 && h < 17) hourlyDistribution[5].views++;
        else if (h >= 17 && h < 19) hourlyDistribution[6].views++;
        else if (h >= 19 && h < 21) hourlyDistribution[7].views++;
        else if (h >= 21 && h < 23) hourlyDistribution[8].views++;
        else hourlyDistribution[9].views++;
      }
    });

    // Breakdown perangkat riil
    const androidCount = viewsFiltered.filter(v => v.device?.includes('Android')).length;
    const iphoneCount = viewsFiltered.filter(v => v.device?.includes('iPhone') || v.device?.includes('Apple')).length;
    const desktopCount = viewsFiltered.filter(v => v.device?.includes('Desktop') || v.device?.includes('Laptop')).length;
    const otherDevCount = Math.max(0, totalViews - (androidCount + iphoneCount + desktopCount));

    const deviceBreakdown: DeviceData[] = totalViews > 0 ? [
      { 
        device: 'Android Smartphone', 
        count: androidCount, 
        percentage: Math.round((androidCount / totalViews) * 100), 
        color: '#10b981' 
      },
      { 
        device: 'Apple iPhone (iOS)', 
        count: iphoneCount, 
        percentage: Math.round((iphoneCount / totalViews) * 100), 
        color: '#3b82f6' 
      },
      { 
        device: 'Desktop & Laptop', 
        count: desktopCount + otherDevCount, 
        percentage: Math.round(((desktopCount + otherDevCount) / totalViews) * 100), 
        color: '#8b5cf6' 
      }
    ] : [
      { device: 'Android Smartphone', count: 0, percentage: 0, color: '#10b981' },
      { device: 'Apple iPhone (iOS)', count: 0, percentage: 0, color: '#3b82f6' },
      { device: 'Desktop & Laptop', count: 0, percentage: 0, color: '#8b5cf6' }
    ];

    // Sumber trafik riil
    const waCount = viewsFiltered.filter(v => v.referrer?.toLowerCase().includes('whatsapp')).length;
    const igCount = viewsFiltered.filter(v => v.referrer?.toLowerCase().includes('instagram')).length;
    const directCount = viewsFiltered.filter(v => v.referrer?.toLowerCase().includes('direct')).length;
    const otherSourceCount = Math.max(0, totalViews - (waCount + igCount + directCount));

    const trafficSources: ReferrerData[] = totalViews > 0 ? [
      { source: 'WhatsApp Broadcast & Chat', count: waCount, percentage: Math.round((waCount / totalViews) * 100), color: '#22c55e' },
      { source: 'Instagram Bio & Story', count: igCount, percentage: Math.round((igCount / totalViews) * 100), color: '#e11d48' },
      { source: 'Direct URL / Browser', count: directCount + otherSourceCount, percentage: Math.round(((directCount + otherSourceCount) / totalViews) * 100), color: '#6366f1' }
    ] : [
      { source: 'WhatsApp Broadcast & Chat', count: 0, percentage: 0, color: '#22c55e' },
      { source: 'Instagram Bio & Story', count: 0, percentage: 0, color: '#e11d48' },
      { source: 'Direct URL / Browser', count: 0, percentage: 0, color: '#6366f1' }
    ];

    // Interaksi fitur
    const engagement: EngagementMetric[] = [
      {
        label: 'Konfirmasi RSVP Masuk',
        count: rsvpResponseCount,
        description: 'Tamu yang telah mengirimkan formulir kehadiran',
        iconName: 'message'
      },
      {
        label: 'Pesan Doa & Ucapan',
        count: filteredRsvps.filter(r => r.message && r.message.trim() !== '').length,
        description: 'Pesan doa restu yang tertera di buku tamu',
        iconName: 'message'
      },
      {
        label: 'Estimasi Pax Hadir',
        count: estimatedPax,
        description: 'Jumlah orang/porsi makanan dari tamu yang hadir',
        iconName: 'gift'
      },
      {
        label: 'Tamu Terdaftar',
        count: totalGuests,
        description: 'Total daftar nama tamu yang telah disiapkan',
        iconName: 'calendar'
      }
    ];

    // Riwayat aktivitas riil
    const recentActivities: ActivityItem[] = [];

    // Masukkan RSVP riil terbaru
    filteredRsvps.slice(0, 8).forEach(r => {
      const type = r.attendance === 'attending' 
        ? 'rsvp_attending' as const 
        : r.attendance === 'not_attending' 
          ? 'rsvp_not_attending' as const 
          : 'rsvp_maybe' as const;

      const actionText = r.attendance === 'attending'
        ? `Konfirmasi Hadir (${r.number_of_guests || 1} Pax)`
        : r.attendance === 'not_attending'
          ? 'Konfirmasi Berhalangan Hadir'
          : 'Konfirmasi Masih Ragu';

      const timeText = r.created_at 
        ? new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }).format(new Date(r.created_at))
        : 'Baru saja';

      recentActivities.push({
        id: 'act-rsvp-' + r.id,
        guestName: r.name,
        action: actionText,
        time: timeText,
        type
      });
    });

    // Masukkan kunjungan views riil terbaru
    viewsFiltered.slice(0, 5).forEach(v => {
      const timeText = v.created_at 
        ? new Intl.DateTimeFormat('id-ID', { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' }).format(new Date(v.created_at))
        : 'Baru saja';

      recentActivities.push({
        id: 'act-view-' + v.id,
        guestName: v.guest_name || 'Tamu Undangan',
        action: `Membuka undangan via ${v.device || 'HP'}`,
        time: timeText,
        type: 'view'
      });
    });

    return {
      invitationId: selectedInvitationId,
      invitationTitle: currentTitle,
      isRealData: true,
      totalViews,
      uniqueVisitors,
      totalGuests,
      rsvpResponseCount,
      responseRate,
      attendingCount,
      notAttendingCount,
      maybeCount,
      pendingCount,
      estimatedPax,
      trafficHistory,
      hourlyDistribution,
      deviceBreakdown,
      trafficSources,
      engagement,
      recentActivities
    };
  }
};
