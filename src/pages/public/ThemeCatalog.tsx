import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';

export const ThemeCatalog: React.FC = () => {
  const { data: themes, isLoading } = useQuery({
    queryKey: ['themes', 'public'],
    queryFn: themeService.getActiveThemes,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-primary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-800 tracking-tighter">WD GROUP</Link>
          <div className="flex space-x-4">
            <Link to="/admin/login" className="text-primary-700 font-medium hover:text-primary-900 transition-colors">Admin Login</Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 text-center">Pilih Tema Undanganmu</h1>
        <p className="text-lg text-gray-600 text-center mb-12">Kami menyediakan berbagai pilihan desain eksklusif untuk momen spesialmu.</p>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {themes?.map((theme) => (
              <div key={theme.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group">
                <div className="aspect-[3/4] bg-gray-200 relative overflow-hidden">
                  {theme.preview_image ? (
                    <img src={theme.preview_image} alt={theme.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                      <span>No Preview</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary-900/0 group-hover:bg-primary-900/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-white text-primary-900 px-6 py-2 rounded-full font-bold shadow-lg transform -translate-y-4 group-hover:translate-y-0 transition-all">
                      Preview Tema
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">{theme.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{theme.name}</h3>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">{theme.description}</p>
                </div>
              </div>
            ))}
            
            {themes?.length === 0 && (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed">
                Belum ada tema yang tersedia saat ini.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
