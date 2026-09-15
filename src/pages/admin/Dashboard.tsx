import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Users, Mail, Palette, MessageSquareHeart } from 'lucide-react';
import { adminService } from '../../services/adminService';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: adminService.getDashboardStats
  });

  const stats = [
    { name: 'Total Clients', value: data?.stats.totalClients || 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    { name: 'Total Invitations', value: data?.stats.totalInvitations || 0, icon: Mail, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { name: 'Active Themes', value: data?.stats.activeThemes || 0, icon: Palette, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { name: 'Total RSVPs', value: data?.stats.totalRsvps || 0, icon: MessageSquareHeart, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  if (isLoading) return <div className="p-8 text-center">Loading dashboard...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Invitations</h2>
            <Link to="/admin/invitations" className="text-sm text-primary-600 hover:text-primary-800">View All</Link>
          </div>
          <div className="space-y-4">
            {data?.recentInvitations.map(inv => (
              <div key={inv.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{inv.title || 'Untitled'}</p>
                  <p className="text-xs text-gray-500">{inv.client?.name} • /{inv.slug}</p>
                </div>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${inv.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {inv.status}
                </span>
              </div>
            ))}
            {data?.recentInvitations.length === 0 && <p className="text-gray-500 text-sm py-4 text-center">No invitations yet</p>}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Clients</h2>
            <Link to="/admin/clients" className="text-sm text-primary-600 hover:text-primary-800">View All</Link>
          </div>
          <div className="space-y-4">
            {data?.recentClients.map(client => (
              <div key={client.id} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{client.name}</p>
                  <p className="text-xs text-gray-500">{client.email || 'No email'}</p>
                </div>
              </div>
            ))}
            {data?.recentClients.length === 0 && <p className="text-gray-500 text-sm py-4 text-center">No clients yet</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
