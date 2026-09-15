import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';
import type { Theme } from '../../services/themeService';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

export const Themes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const queryClient = useQueryClient();

  const { data: themes, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: themeService.getThemes,
  });

  const deleteMutation = useMutation({
    mutationFn: themeService.deleteTheme,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['themes'] }),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Theme> }) => themeService.updateTheme(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      setIsModalOpen(false);
      setEditingTheme(null);
    }
  });

  const filteredThemes = themes?.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (t.category && t.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Themes Management</h1>
        <button 
          onClick={() => { setEditingTheme(null); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          <Plus size={20} />
          <span>Add Theme</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search themes..." 
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
                <th className="px-6 py-4">Theme Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading themes...</td>
                </tr>
              ) : filteredThemes?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No themes found.</td>
                </tr>
              ) : (
                filteredThemes?.map(theme => (
                  <tr key={theme.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-6 py-4 flex items-center space-x-4">
                      {theme.thumbnail ? (
                        <img src={theme.thumbnail} alt={theme.name} className="w-12 h-12 rounded object-cover border border-gray-200" />
                      ) : (
                        <div className="w-12 h-12 rounded bg-gray-200 border border-gray-300 flex items-center justify-center text-gray-400 text-xs">No Img</div>
                      )}
                      <div>
                        <div className="font-medium text-gray-900">{theme.name}</div>
                        <div className="text-gray-400 text-xs mt-1">/{theme.slug}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium text-xs">
                        {theme.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        theme.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {theme.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {format(new Date(theme.created_at), 'dd MMM yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-3">
                      <button 
                        onClick={() => { setEditingTheme(theme); setIsModalOpen(true); }}
                        className="text-blue-600 hover:text-blue-800 transition-colors" title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          if(confirm('Are you sure you want to delete this theme?')) {
                            deleteMutation.mutate(theme.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 transition-colors" title="Delete"
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
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingTheme ? 'Edit Theme' : 'Add New Theme'}</h2>
              <button onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} className="text-gray-400 hover:text-gray-600">
                &times;
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <form 
                id="theme-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const slug = formData.get('slug') as string;
                  const category = formData.get('category') as string;
                  const description = formData.get('description') as string;
                  const status = formData.get('status') as 'active' | 'inactive';
                  const thumbnail = formData.get('thumbnail') as string;
                  const preview_image = formData.get('preview_image') as string;
                  
                  if (!name || !slug) return alert('Name and slug are required');
                  
                  const dataToSave = { 
                    name, slug, category, description, status, thumbnail, preview_image,
                    features: editingTheme?.features || [],
                    theme_config: editingTheme?.theme_config || {}
                  };

                  if (editingTheme) {
                    updateMutation.mutate({ id: editingTheme.id, data: dataToSave });
                  } else {
                    themeService.createTheme(dataToSave)
                      .then(() => {
                        setIsModalOpen(false);
                        queryClient.invalidateQueries({ queryKey: ['themes'] });
                      })
                      .catch(err => {
                        console.error(err);
                        alert('Failed to create theme. Make sure slug is unique.');
                      });
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme Name *</label>
                    <input name="name" defaultValue={editingTheme?.name} type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. Elegant Gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input name="slug" defaultValue={editingTheme?.slug} type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. elegant-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input name="category" defaultValue={editingTheme?.category || ''} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="e.g. Minimalist" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" defaultValue={editingTheme?.status || 'active'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" defaultValue={editingTheme?.description || ''} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="Theme description..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                    <input name="thumbnail" defaultValue={editingTheme?.thumbnail || ''} type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview Image URL</label>
                    <input name="preview_image" defaultValue={editingTheme?.preview_image || ''} type="url" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" placeholder="https://..." />
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <button type="button" onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors">
                Cancel
              </button>
              <button type="submit" form="theme-form" disabled={updateMutation.isPending} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50">
                {updateMutation.isPending ? 'Saving...' : editingTheme ? 'Update Theme' : 'Save Theme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
