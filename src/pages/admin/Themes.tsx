import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';
import type { Theme } from '../../services/themeService';
import { Plus, Search, Edit2, Trash2, Tag, ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../context/ToastContext';

export const Themes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | '50000' | '70000' | '150000'>('all');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const queryClient = useQueryClient();
  const toast = useToast();

  const { data: themes, isLoading } = useQuery({
    queryKey: ['themes'],
    queryFn: themeService.getThemes,
  });

  const deleteMutation = useMutation({
    mutationFn: themeService.deleteTheme,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      toast.success('Tema berhasil dihapus!');
    },
    onError: () => toast.error('Gagal menghapus tema.'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string, data: Partial<Theme> }) => themeService.updateTheme(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['themes'] });
      setIsModalOpen(false);
      setEditingTheme(null);
      toast.success('Tema berhasil diperbarui!');
    },
    onError: () => toast.error('Gagal memperbarui tema.'),
  });

  const counts = useMemo(() => {
    if (!themes) return { all: 0, p50k: 0, p70k: 0, p150k: 0 };
    return {
      all: themes.length,
      p50k: themes.filter(t => (t.price || 150000) === 50000).length,
      p70k: themes.filter(t => (t.price || 150000) === 70000).length,
      p150k: themes.filter(t => (t.price || 150000) >= 150000).length,
    };
  }, [themes]);

  const filteredThemes = useMemo(() => {
    if (!themes) return [];
    
    return themes.filter(t => {
      const query = searchTerm.toLowerCase();
      const matchesSearch = 
        t.name.toLowerCase().includes(query) || 
        (t.category && t.category.toLowerCase().includes(query)) ||
        t.slug.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;

      const price = t.price || 150000;
      if (priceFilter === '50000') return price === 50000;
      if (priceFilter === '70000') return price === 70000;
      if (priceFilter === '150000') return price >= 150000;

      return true;
    }).sort((a, b) => {
      const priceA = a.price || 150000;
      const priceB = b.price || 150000;
      if (sortBy === 'price-asc') return priceA - priceB;
      if (sortBy === 'price-desc') return priceB - priceA;
      return 0;
    });
  }, [themes, searchTerm, priceFilter, sortBy]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Themes Management</h1>
          <p className="text-xs text-gray-500 mt-1">Kelola katalog tema undangan, status, dan klasifikasi harga paket.</p>
        </div>
        <button 
          onClick={() => { setEditingTheme(null); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          <span>Add Theme</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Filter Toolbar */}
        <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-gray-50/60">
          <div className="relative w-full lg:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search tema atau slug..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
            />
          </div>

          {/* Price Quick Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-1 flex items-center gap-1">
              <Tag size={13} className="text-gray-400" />
              <span>Harga:</span>
            </span>
            <button
              type="button"
              onClick={() => setPriceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                priceFilter === 'all'
                  ? 'bg-gray-900 text-white shadow-sm ring-1 ring-gray-900'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              <span>Semua</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${priceFilter === 'all' ? 'bg-gray-700 text-gray-200' : 'bg-gray-100 text-gray-600'}`}>
                {counts.all}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPriceFilter('50000')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                priceFilter === '50000'
                  ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40'
                  : 'bg-amber-50/70 text-amber-900 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <span>50k (Noir Gold)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${priceFilter === '50000' ? 'bg-amber-700 text-amber-100' : 'bg-amber-200/80 text-amber-900'}`}>
                {counts.p50k}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPriceFilter('70000')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                priceFilter === '70000'
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-400/40'
                  : 'bg-rose-50/70 text-rose-900 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <span>70k (Kuala Lumpur)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${priceFilter === '70000' ? 'bg-rose-700 text-rose-100' : 'bg-rose-200/80 text-rose-900'}`}>
                {counts.p70k}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setPriceFilter('150000')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                priceFilter === '150000'
                  ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-500/40'
                  : 'bg-emerald-50/70 text-emerald-900 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <span>150k+ (Masterpiece)</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${priceFilter === '150000' ? 'bg-emerald-800 text-emerald-100' : 'bg-emerald-200/80 text-emerald-900'}`}>
                {counts.p150k}
              </span>
            </button>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
            <ArrowUpDown size={14} className="text-gray-400 hidden sm:inline" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs border border-gray-300 rounded-lg px-2.5 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="default">Urutkan: Rekomendasi</option>
              <option value="price-asc">Harga: Termurah (50k → 150k)</option>
              <option value="price-desc">Harga: Termahal (150k → 50k)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-700 uppercase font-semibold border-b border-gray-200 text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Theme Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Harga Paket</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">Loading themes...</td>
                </tr>
              ) : filteredThemes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <p className="font-medium text-gray-700">Tidak ada tema yang cocok.</p>
                    <p className="text-xs text-gray-400 mt-1">Coba ubah kata kunci pencarian atau filter harga tema.</p>
                  </td>
                </tr>
              ) : (
                filteredThemes.map(theme => {
                  const price = theme.price || 150000;
                  return (
                    <tr key={theme.id} className="border-b border-gray-100 hover:bg-gray-50/80 transition-colors">
                      <td className="px-6 py-4 flex items-center space-x-4">
                        {(theme.thumbnail || theme.preview_image) ? (
                          <img 
                            src={theme.thumbnail || theme.preview_image!} 
                            alt={theme.name} 
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200 shadow-sm shrink-0" 
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs shrink-0">No Img</div>
                        )}
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            <span>{theme.name}</span>
                            {theme.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                                {theme.badge}
                              </span>
                            )}
                          </div>
                          <div className="text-gray-400 text-xs font-mono mt-0.5">/{theme.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 rounded-md bg-gray-100 text-gray-700 font-medium text-xs">
                          {theme.category || 'Uncategorized'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {price === 50000 ? (
                          <div className="inline-flex flex-col items-start">
                            <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                              Rp 50.000
                            </span>
                            <span className="text-[10px] text-amber-700 font-semibold mt-0.5">Starter Pack</span>
                          </div>
                        ) : price === 70000 ? (
                          <div className="inline-flex flex-col items-start">
                            <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-rose-50 text-rose-900 border border-rose-300 shadow-2xs">
                              Rp 70.000
                            </span>
                            <span className="text-[10px] text-rose-700 font-semibold mt-0.5">Malay Heritage</span>
                          </div>
                        ) : (
                          <div className="inline-flex flex-col items-start">
                            <span className="px-2.5 py-1 rounded-md font-bold text-xs bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
                              Rp {price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] text-emerald-700 font-semibold mt-0.5">Masterpiece</span>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                          theme.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {theme.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-500 text-xs">
                        {format(new Date(theme.created_at), 'dd MMM yyyy')}
                      </td>
                      <td className="px-6 py-4 text-right space-x-3">
                        <button 
                          onClick={() => { setEditingTheme(theme); setIsModalOpen(true); }}
                          className="text-blue-600 hover:text-blue-800 transition-colors p-1" title="Edit"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if(confirm('Are you sure you want to delete this theme?')) {
                              deleteMutation.mutate(theme.id);
                            }
                          }}
                          className="text-red-600 hover:text-red-800 transition-colors p-1" title="Delete"
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
      
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-900">{editingTheme ? 'Edit Theme' : 'Add New Theme'}</h2>
              <button onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} className="text-gray-400 hover:text-gray-600 text-xl font-bold">
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
                  const price = Number(formData.get('price')) || 150000;
                  const description = formData.get('description') as string;
                  const status = formData.get('status') as 'active' | 'inactive';
                  const thumbnail = formData.get('thumbnail') as string;
                  const preview_image = formData.get('preview_image') as string;
                  
                  if (!name || !slug) return toast.error('Nama dan slug tema wajib diisi!');
                  
                  const dataToSave = { 
                    name, slug, category, price, description, status, thumbnail, preview_image,
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
                        toast.success('Tema berhasil dibuat!');
                      })
                      .catch(err => {
                        console.error(err);
                        toast.error('Gagal membuat tema. Pastikan slug unik!');
                      });
                  }
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Theme Name *</label>
                    <input name="name" defaultValue={editingTheme?.name} type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="e.g. Elegant Gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                    <input name="slug" defaultValue={editingTheme?.slug} type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="e.g. elegant-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input name="category" defaultValue={editingTheme?.category || ''} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="e.g. Modern & Cultural" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Harga Tema (Rp) *</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold text-xs">Rp</span>
                      <input 
                        name="price" 
                        defaultValue={editingTheme?.price || 150000} 
                        type="number" 
                        step="1000"
                        required 
                        className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" 
                        placeholder="Contoh: 50000 atau 70000" 
                      />
                    </div>
                    <div className="flex gap-2 mt-1.5 text-[11px] text-gray-500">
                      <span className="text-gray-400">Preset:</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '50000';
                          }
                        }}
                        className="text-amber-700 hover:underline font-semibold"
                      >
                        50k
                      </button>
                      <span>•</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '70000';
                          }
                        }}
                        className="text-rose-700 hover:underline font-semibold"
                      >
                        70k
                      </button>
                      <span>•</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '150000';
                          }
                        }}
                        className="text-emerald-700 hover:underline font-semibold"
                      >
                        150k
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select name="status" defaultValue={editingTheme?.status || 'active'} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm">
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea name="description" defaultValue={editingTheme?.description || ''} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="Theme description..."></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                    <input name="thumbnail" defaultValue={editingTheme?.thumbnail || ''} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="/themes/... atau https://..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preview Image URL</label>
                    <input name="preview_image" defaultValue={editingTheme?.preview_image || ''} type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm" placeholder="/themes/... atau https://..." />
                  </div>
                </div>
              </form>
            </div>
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <button type="button" onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm">
                Cancel
              </button>
              <button type="submit" form="theme-form" disabled={updateMutation.isPending} className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium transition-colors disabled:opacity-50 text-sm">
                {updateMutation.isPending ? 'Saving...' : editingTheme ? 'Update Theme' : 'Save Theme'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
