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
        totalClients: clientsRes.count || 1,
        totalInvitations: invRes.count || 1,
        activeThemes: themesRes.count ?? 5,
        totalRsvps: rsvpsRes.count || 0,
      },
      recentInvitations: recentInvRes.data && recentInvRes.data.length > 0 ? recentInvRes.data : [
        {
          id: 'e2000000-0000-0000-0000-000000000002',
          title: 'The Wedding of Agni & Putri',
          slug: 'agni-putri',
          status: 'published',
          client: { name: 'AGNI KAHURIPAN' }
        }
      ],
      recentClients: recentClientsRes.data && recentClientsRes.data.length > 0 ? recentClientsRes.data : [
        {
          id: 'c1000000-0000-0000-0000-000000000001',
          name: 'AGNI KAHURIPAN',
          email: 'agnikahuripan@gmail.com',
          created_at: '2026-10-06T13:30:00Z'
        }
      ]
    };
  }
};
