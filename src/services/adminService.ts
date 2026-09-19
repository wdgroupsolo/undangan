import { supabase } from '../lib/supabase';

export const adminService = {
  async getDashboardStats() {
    const [clientsRes, invRes, themesRes, rsvpsRes, recentInvRes, recentClientsRes] = await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      supabase.from('invitations').select('*', { count: 'exact', head: true }),
      supabase.from('themes').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('rsvps').select('*', { count: 'exact', head: true }),
      supabase.from('invitations').select('id, title, slug, status, client:clients(name)').order('created_at', { ascending: false }).limit(5),
      supabase.from('clients').select('id, name, email, created_at').order('created_at', { ascending: false }).limit(5)
    ]);

    return {
      stats: {
        totalClients: clientsRes.count || 0,
        totalInvitations: invRes.count || 0,
        activeThemes: themesRes.count ?? 1,
        totalRsvps: rsvpsRes.count || 0,
      },
      recentInvitations: recentInvRes.data || [],
      recentClients: recentClientsRes.data || []
    };
  }
};
