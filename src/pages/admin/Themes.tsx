import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { themeService, resolveThemePrice } from '../../services/themeService';
import type { Theme } from '../../services/themeService';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Tag, 
  ExternalLink, 
  Palette, 
  Sparkles, 
  Crown, 
  X 
} from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '../../context/ToastContext';

export const Themes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | '50000' | '70000' | '150000'>('all');
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
    mutationFn: ({ id, data }: { id: string; data: Partial<Theme> }) => themeService.updateTheme(id, data),
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
      p50k: themes.filter(t => resolveThemePrice(t) === 50000).length,
      p70k: themes.filter(t => resolveThemePrice(t) === 70000).length,
      p150k: themes.filter(t => resolveThemePrice(t) >= 150000).length,
    };
  }, [themes]);

  const filteredThemes = useMemo(() => {
    if (!themes) return [];
    
    return themes.filter(t => {
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch = 
        !query ||
        t.name.toLowerCase().includes(query) || 
        (t.category && t.category.toLowerCase().includes(query)) ||
        t.slug.toLowerCase().includes(query);
      
      if (!matchesSearch) return false;

      const price = resolveThemePrice(t);
      if (priceFilter === '50000') return price === 50000;
      if (priceFilter === '70000') return price === 70000;
      if (priceFilter === '150000') return price >= 150000;

      return true;
    });
  }, [themes, searchTerm, priceFilter]);

  const getDemoUrl = (theme: Theme) => {
    if (theme.slug === 'noir-gold' || theme.slug === 'noir-gold-elegance') {
      return '/invitation/audi-ovyola?theme=noir-gold&demo=true';
    }
    if (theme.slug === 'kuala-lumpur-heritage' || theme.slug === 'kuala-lumpur' || theme.slug === 'hafiz-syafika') {
      return '/invitation/hafiz-syafika?theme=kuala-lumpur-heritage&demo=true';
    }
    return `/invitation/steven-bunga?theme=${theme.slug}&demo=true`;
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Themes Management</h1>
          <p className="text-xs text-gray-500 mt-1">
            Kelola katalog tema undangan pernikahan, kategori paket harga, dan status rilis.
          </p>
        </div>
        <button 
          onClick={() => { setEditingTheme(null); setIsModalOpen(true); }}
          className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2.5 rounded-xl transition-all font-semibold shadow-sm text-sm cursor-pointer active:scale-95"
        >
          <Plus size={18} />
          <span>Tambah Tema Baru</span>
        </button>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Themes Card */}
        <button
          type="button"
          onClick={() => setPriceFilter('all')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            priceFilter === 'all' 
              ? 'bg-white border-primary-500 ring-2 ring-primary-500/10 shadow-sm' 
              : 'bg-white border-gray-100 hover:border-gray-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">Semua Katalog</span>
            <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center">
              <Palette size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">{counts.all}</span>
            <span className="text-xs text-gray-500">Tema Aktif</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">Seluruh koleksi undangan</p>
        </button>

        {/* Starter Card */}
        <button
          type="button"
          onClick={() => setPriceFilter('50000')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            priceFilter === '50000' 
              ? 'bg-amber-50/60 border-amber-500 ring-2 ring-amber-500/20 shadow-sm' 
              : 'bg-white border-gray-100 hover:border-amber-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-900">Starter</span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Tag size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-amber-950">{counts.p50k}</span>
            <span className="text-xs font-semibold text-amber-700">Noir Gold</span>
          </div>
          <p className="text-[11px] text-amber-800/80 mt-1">Best Value Luxury</p>
        </button>

        {/* 70k Heritage Card */}
        <button
          type="button"
          onClick={() => setPriceFilter('70000')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            priceFilter === '70000' 
              ? 'bg-rose-50/60 border-rose-500 ring-2 ring-rose-500/20 shadow-sm' 
              : 'bg-white border-gray-100 hover:border-rose-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-900">Paket 70k (Heritage)</span>
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-rose-950">{counts.p70k}</span>
            <span className="text-xs font-semibold text-rose-700">Kuala Lumpur</span>
          </div>
          <p className="text-[11px] text-rose-800/80 mt-1">Malay Heritage Rp 70.000</p>
        </button>

        {/* 150k+ Masterpiece Card */}
        <button
          type="button"
          onClick={() => setPriceFilter('150000')}
          className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
            priceFilter === '150000' 
              ? 'bg-emerald-50/60 border-emerald-500 ring-2 ring-emerald-500/20 shadow-sm' 
              : 'bg-white border-gray-100 hover:border-emerald-200 hover:shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-900">Paket 150k+ (Masterpiece)</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Crown size={16} />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-emerald-950">{counts.p150k}</span>
            <span className="text-xs font-semibold text-emerald-700">Tema Sultan</span>
          </div>
          <p className="text-[11px] text-emerald-800/80 mt-1">Nirwana, Wayang, Batak, dll.</p>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 overflow-hidden">
        
        {/* Controls Bar */}
        <div className="p-4 sm:p-5 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={17} />
              <input 
                type="text" 
                placeholder="Cari nama tema, slug (/noir-gold), atau kategori..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white placeholder:text-gray-400 shadow-2xs"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            
            {(priceFilter !== 'all' || searchTerm) && (
              <button
                type="button"
                onClick={() => { setPriceFilter('all'); setSearchTerm(''); }}
                className="text-xs bg-gray-200/80 hover:bg-gray-300 text-gray-700 font-semibold px-3 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
              >
                <span>Reset Filter</span>
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-100/70 text-gray-700 uppercase font-bold border-b border-gray-200 text-[11px] tracking-wider">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">Tema &amp; Detail</th>
                <th className="px-6 py-4 whitespace-nowrap">Kategori</th>
                <th className="px-6 py-4 whitespace-nowrap">Harga Paket</th>
                <th className="px-6 py-4 whitespace-nowrap">Status</th>
                <th className="px-6 py-4 whitespace-nowrap">Tanggal Rilis</th>
                <th className="px-6 py-4 text-right whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      <span className="text-xs">Memuat katalog tema...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredThemes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-14 text-center">
                    <div className="max-w-xs mx-auto text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center mx-auto">
                        <Search size={22} />
                      </div>
                      <p className="font-bold text-gray-800 text-sm">Tidak ada tema yang cocok</p>
                      <p className="text-xs text-gray-500">
                        Coba sesuaikan kata kunci pencarian atau ubah filter harga tema.
                      </p>
                      <button
                        onClick={() => { setPriceFilter('all'); setSearchTerm(''); }}
                        className="mt-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                      >
                        Tampilkan Semua Tema
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredThemes.map(theme => {
                  const price = resolveThemePrice(theme);
                  const isNoirGold = price === 50000;
                  const isKualaLumpur = price === 70000;
                  const demoUrl = getDemoUrl(theme);

                  return (
                    <tr key={theme.id} className="hover:bg-gray-50/70 transition-colors group">
                      {/* Theme Details */}
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3.5">
                          {(theme.thumbnail || theme.preview_image) ? (
                            <img 
                              src={theme.thumbnail || theme.preview_image!} 
                              alt={theme.name} 
                              className="w-13 h-13 rounded-xl object-cover border border-gray-200/90 shadow-2xs shrink-0 group-hover:scale-105 transition-transform" 
                            />
                          ) : (
                            <div className="w-13 h-13 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-400 text-xs shrink-0">
                              No Img
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="font-bold text-gray-900 text-sm leading-snug">
                                {theme.name}
                              </span>
                              {theme.badge && (
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200/60 shadow-2xs whitespace-nowrap">
                                  {theme.badge}
                                </span>
                              )}
                            </div>
                            <div className="text-gray-400 text-xs font-mono mt-0.5">
                              /{theme.slug}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 font-medium text-xs border border-stone-200/60">
                          {theme.category || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Price Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {isNoirGold ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                              Rp 50.000
                            </span>
                            <span className="text-[10px] font-semibold text-amber-700 pl-0.5">Starter Pack</span>
                          </div>
                        ) : isKualaLumpur ? (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs bg-rose-50 text-rose-900 border border-rose-300 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
                              Rp 70.000
                            </span>
                            <span className="text-[10px] font-semibold text-rose-700 pl-0.5">Malay Heritage</span>
                          </div>
                        ) : (
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg font-bold text-xs bg-emerald-50 text-emerald-900 border border-emerald-300 shadow-2xs">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Rp {price.toLocaleString('id-ID')}
                            </span>
                            <span className="text-[10px] font-semibold text-emerald-700 pl-0.5">Masterpiece</span>
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                          theme.status === 'active' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-gray-100 text-gray-600 border border-gray-200'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${theme.status === 'active' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                          {theme.status === 'active' ? 'Aktif' : 'Nonaktif'}
                        </span>
                      </td>

                      {/* Release Date */}
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-xs">
                        {format(new Date(theme.created_at), 'dd MMM yyyy')}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end space-x-1.5">
                          {/* Live Demo Link */}
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-primary-50 text-gray-500 hover:text-primary-600 transition-colors flex items-center justify-center cursor-pointer"
                            title="Buka Live Demo Tema"
                          >
                            <ExternalLink size={16} />
                          </a>

                          {/* Edit Button */}
                          <button 
                            onClick={() => { setEditingTheme(theme); setIsModalOpen(true); }}
                            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-blue-50 text-gray-500 hover:text-blue-600 transition-colors flex items-center justify-center cursor-pointer" 
                            title="Edit Tema"
                          >
                            <Edit2 size={16} />
                          </button>

                          {/* Delete Button */}
                          <button 
                            onClick={() => {
                              if(confirm(`Yakin ingin menghapus tema "${theme.name}"?`)) {
                                deleteMutation.mutate(theme.id);
                              }
                            }}
                            className="w-8 h-8 rounded-lg bg-gray-50 hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors flex items-center justify-center cursor-pointer" 
                            title="Hapus Tema"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Modal Add / Edit Theme */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingTheme ? 'Edit Detail Tema' : 'Tambah Tema Baru'}
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Lengkapi identitas, kategori paket harga, dan preview tampilan tema.
                </p>
              </div>
              <button 
                onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} 
                className="w-8 h-8 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={18} />
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
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Nama Tema *
                    </label>
                    <input 
                      name="name" 
                      defaultValue={editingTheme?.name} 
                      type="text" 
                      required 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white" 
                      placeholder="e.g. Noir Gold Elegance" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Slug URL *
                    </label>
                    <input 
                      name="slug" 
                      defaultValue={editingTheme?.slug} 
                      type="text" 
                      required 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-mono bg-white" 
                      placeholder="e.g. noir-gold" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Kategori Tema
                    </label>
                    <input 
                      name="category" 
                      defaultValue={editingTheme?.category || ''} 
                      type="text" 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white" 
                      placeholder="e.g. Starter" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Harga Paket (Rp) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">
                        Rp
                      </span>
                      <input 
                        name="price" 
                        defaultValue={editingTheme ? resolveThemePrice(editingTheme) : 150000} 
                        type="number" 
                        step="1000"
                        required 
                        className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm font-semibold bg-white" 
                        placeholder="50000 atau 70000" 
                      />
                    </div>
                    {/* Presets */}
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="text-gray-400 font-medium">Preset Cepat:</span>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '50000';
                          }
                        }}
                        className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-bold transition-colors cursor-pointer text-[11px]"
                      >
                        50k
                      </button>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '70000';
                          }
                        }}
                        className="px-2 py-0.5 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-200 font-bold transition-colors cursor-pointer text-[11px]"
                      >
                        70k
                      </button>
                      <button 
                        type="button" 
                        onClick={(e) => {
                          const form = e.currentTarget.closest('form');
                          if (form) {
                            const input = form.querySelector('input[name="price"]') as HTMLInputElement;
                            if (input) input.value = '150000';
                          }
                        }}
                        className="px-2 py-0.5 rounded-md bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold transition-colors cursor-pointer text-[11px]"
                      >
                        150k
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Status Rilis
                    </label>
                    <select 
                      name="status" 
                      defaultValue={editingTheme?.status || 'active'} 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white cursor-pointer"
                    >
                      <option value="active">Active (Publik &amp; Terbuka)</option>
                      <option value="inactive">Inactive (Disembunyikan)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Deskripsi Tema
                    </label>
                    <textarea 
                      name="description" 
                      defaultValue={editingTheme?.description || ''} 
                      rows={3} 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white" 
                      placeholder="Jelaskan keunggulan visual, nuansa, dan fitur tema..."
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Thumbnail URL / Path
                    </label>
                    <input 
                      name="thumbnail" 
                      defaultValue={editingTheme?.thumbnail || ''} 
                      type="text" 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white font-mono" 
                      placeholder="/themes/noir-gold/theme-preview.jpg" 
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                      Preview Image URL / Path
                    </label>
                    <input 
                      name="preview_image" 
                      defaultValue={editingTheme?.preview_image || ''} 
                      type="text" 
                      className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm bg-white font-mono" 
                      placeholder="/themes/noir-gold/theme-preview.jpg" 
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="p-5 border-t border-gray-100 bg-gray-50 flex justify-end space-x-3">
              <button 
                type="button" 
                onClick={() => { setIsModalOpen(false); setEditingTheme(null); }} 
                className="px-4 py-2.5 text-gray-600 hover:bg-gray-200/60 rounded-xl font-semibold transition-colors text-sm cursor-pointer"
              >
                Batal
              </button>
              <button 
                type="submit" 
                form="theme-form" 
                disabled={updateMutation.isPending} 
                className="px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 text-sm shadow-sm cursor-pointer"
              >
                {updateMutation.isPending ? 'Menyimpan...' : editingTheme ? 'Perbarui Tema' : 'Simpan Tema'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
