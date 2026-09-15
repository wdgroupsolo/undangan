import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { invitationService } from '../../services/invitationService';
import { Plus, Search, Edit2, Trash2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

export const Invitations: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: invitations, isLoading } = useQuery({
    queryKey: ['invitations'],
    queryFn: invitationService.getInvitations,
  });

  const deleteMutation = useMutation({
    mutationFn: invitationService.deleteInvitation,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['invitations'] }),
  });

  const filteredInvitations = invitations?.filter(inv => 
    (inv.title && inv.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (inv.client?.name && inv.client.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Invitations Management</h1>
        <Link 
          to="/admin/invitations/create"
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <Plus size={20} />
          <span>Create Invitation</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search invitations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200">
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
                filteredInvitations?.map(invitation => (
                  <tr key={invitation.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{invitation.title || 'Untitled'}</div>
                      <div className="text-gray-400 text-xs mt-1">/{invitation.slug}</div>
                    </td>
                    <td className="px-6 py-4">{invitation.client?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        invitation.status === 'published' ? 'bg-green-100 text-green-700' : 
                        invitation.status === 'archived' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {invitation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {invitation.wedding_date ? format(new Date(invitation.wedding_date), 'dd MMM yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <a href={`/invitation/${invitation.slug}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600 inline-block transition-colors" title="View Public Page">
                        <ExternalLink size={18} />
                      </a>
                      <Link to={`/admin/invitations/${invitation.id}`} className="text-blue-600 hover:text-blue-800 inline-block transition-colors" title="Edit">
                        <Edit2 size={18} />
                      </Link>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this invitation?')) {
                            deleteMutation.mutate(invitation.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 inline-block transition-colors" title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
