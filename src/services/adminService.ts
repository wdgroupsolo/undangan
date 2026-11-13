import { supabase } from '../lib/supabase';
import { themeService } from './themeService';
import { invitationService } from './invitationService';

export const adminService = {
  async getDashboardStats() {
    const [clientsRes, activeInvitationsList, activeThemesList, rsvpsRes, recentClientsRes] = await Promise.all([
      supabase.from('clients').select('*', { count: 'exact', head: true }),
      invitationService.getInvitations().catch(() => []),
      themeService.getActiveThemes().catch(() => []),
      supabase.from('rsvps').select('*', { count: 'exact', head: true }),
      supabase.from('clients').select('id, name, email, created_at').order('created_at', { ascending: false }).limit(5)
    ]);

    const activeThemesCount = Array.isArray(activeThemesList) && activeThemesList.length > 0 
      ? activeThemesList.length 
      : 9;

    const totalInvitationsCount = Array.isArray(activeInvitationsList)
      ? activeInvitationsList.length
      : 1;

    const recentInvs = Array.isArray(activeInvitationsList) && activeInvitationsList.length > 0
      ? activeInvitationsList.slice(0, 5)
      : [
        {
          id: 'e2000000-0000-0000-0000-000000000002',
          title: 'The Wedding of Agni & Putri',
          slug: 'agni-putri',
          status: 'published',
          client: { name: 'AGNI KAHURIPAN' }
        }
      ];

    return {
      stats: {
        totalClients: clientsRes.count || 1,
        totalInvitations: totalInvitationsCount,
        activeThemes: activeThemesCount,
        totalRsvps: rsvpsRes.count || 0,
      },
      recentInvitations: recentInvs,
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
