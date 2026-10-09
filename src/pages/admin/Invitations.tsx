import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService } from '../../services/invitationService';
import { Plus, Search, Edit2, Trash2, ExternalLink, PauseCircle, PlayCircle } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export const Invitations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: invitations, isLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getInvitations,
  });

  const deleteMutation = useMutation({
    mutationFn: invitationService.deleteInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      toast.success('Undangan berhasil dihapus.');
    },
    onError: () => toast.error('Gagal menghapus undangan.')
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, slug, status }: { id: string; slug: string; status: 'published' | 'paused' }) =>
      invitationService.updateInvitation(id, { status, slug }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['invitations'] });
      queryClient.invalidateQueries({ queryKey: ['invitation', variables.slug] });
      if (variables.status === 'paused') {
        toast.info(`Undangan /invitation/${variables.slug} berhasil dijeda. Halaman publik otomatis dinonaktifkan.`);
      } else {
        toast.success(`Undangan /invitation/${variables.slug} berhasil diaktifkan kembali.`);
      }
    },
    onError: () => toast.error('Gagal mengubah status undangan.')
  });

  const filteredInvitations = invitations?.filter(inv => 
    (inv.title && inv.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.client?.name && inv.client.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.slug && inv.slug.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Invitations Management</h1>
        <Link 
          to="/admin/invitations/create"
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium cursor-pointer"
        >
          <Plus size={20} />
          <span>Create Invitation</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-xs border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search invitations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200 text-xs">
              <tr>
                <th className="px-6 py-4">Title / Slug</th>
                <th className="px-6 py-4">Client</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Wedding Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading invitations...</td>
                </tr>
              ) : filteredInvitations?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No invitations found.</td>
                </tr>
              ) : (
                filteredInvitations?.map(invitation => {
                  const isPublished = invitation.status === 'published';
                  const isPaused = invitation.status === 'paused';

                  return (
                    <tr key={invitation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{invitation.title || 'Untitled'}</div>
                        <div className="text-gray-400 text-xs mt-0.5 font-mono">/{invitation.slug}</div>
                      </td>
                      <td className="px-6 py-4">{invitation.client?.name || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${
                          isPublished ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 
                          isPaused ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                          invitation.status === 'archived' ? 'bg-red-50 text-red-700 border border-red-200' : 
                          'bg-gray-100 text-gray-700 border border-gray-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            isPublished ? 'bg-emerald-500 animate-pulse' :
                            isPaused ? 'bg-amber-500' : 'bg-gray-400'
                          }`} />
                          {invitation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500">
                        {invitation.wedding_date ? format(new Date(invitation.wedding_date), 'dd MMM yyyy') : '-'}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {/* 1. Pause / Resume Action Toggle */}
                        {isPublished ? (
                          <button
                            onClick={() => {
                              if (window.confirm(`Jeda undangan "${invitation.title}"?\n\nWebsite publik akan otomatis dinonaktifkan sementara dan menampilkan layar penangguhan ke tamu.`)) {
                                updateStatusMutation.mutate({ id: invitation.id, slug: invitation.slug, status: 'paused' });
                              }
                            }}
                            className="p-1.5 rounded-lg text-amber-600 hover:text-amber-800 hover:bg-amber-50 inline-block transition-colors cursor-pointer"
                            title="Jeda Undangan (Otomatis Nonaktifkan Web Publik)"
                          >
                            <PauseCircle size={19} />
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              updateStatusMutation.mutate({ id: invitation.id, slug: invitation.slug, status: 'published' });
                            }}
                            className="p-1.5 rounded-lg text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50 inline-block transition-colors cursor-pointer"
                            title="Aktifkan Kembali Undangan (Web Publik Live)"
                          >
                            <PlayCircle size={19} />
                          </button>
                        )}

                        {/* 2. View Public Page */}
                        <a 
                          href={`/invitation/${invitation.slug}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 inline-block transition-colors" 
                          title="View Public Page"
                        >
                          <ExternalLink size={18} />
                        </a>

                        {/* 3. Edit */}
                        <Link 
                          to={`/admin/invitations/${invitation.id}`} 
                          className="p-1.5 rounded-lg text-blue-600 hover:text-blue-800 hover:bg-blue-50 inline-block transition-colors" 
                          title="Edit"
                        >
                          <Edit2 size={18} />
                        </Link>

                        {/* 4. Delete */}
                        <button 
                          onClick={() => {
                            if(window.confirm('Are you sure you want to delete this invitation?')) {
                              deleteMutation.mutate(invitation.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-red-600 hover:text-red-800 hover:bg-red-50 inline-block transition-colors cursor-pointer" 
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
