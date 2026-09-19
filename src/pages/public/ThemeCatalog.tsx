import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';
import type { Theme } from '../../services/themeService';
import { 
  Sparkles, 
  Search, 
  Star, 
  Eye, 
  ArrowRight, 
  X, 
  Calendar, 
  Disc,
  Clock,
  MessageCircle,
  CheckCircle2
} from 'lucide-react';

export const ThemeCatalog: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [previewTheme, setPreviewTheme] = useState<Theme | null>(null);

  const { data: themes, isLoading } = useQuery({
    queryKey: ['themes', 'public'],
    queryFn: themeService.getActiveThemes,
  });

  const filteredThemes = themes?.filter((theme) => {
    return (
      theme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (theme.description && theme.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (theme.category && theme.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 font-jakarta selection:bg-primary-500 selection:text-white">
      
      {/* Top Notification */}
      <div className="bg-primary-900 text-primary-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2">
        <Sparkles size={14} className="text-amber-300 animate-pulse" />
        <span>Koleksi Tema Masterpiece: Split Floral Luxury siap digunakan untuk hari bahagia Anda</span>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/70 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 flex items-center justify-center text-white shadow-md shadow-primary-900/20 group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-xl font-bold tracking-widest text-amber-200">WD</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-primary-900 tracking-tight font-cinzel">WD GROUP</div>
              <div className="text-[10px] tracking-[0.25em] text-primary-600 font-semibold uppercase -mt-0.5">Katalog Tema Undangan</div>
            </div>
          </Link>

          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="text-sm font-semibold text-stone-600 hover:text-primary-800 transition-colors hidden sm:inline-block"
            >
              &larr; Kembali ke Beranda
            </Link>
            <Link 
              to="/admin/login" 
              className="text-xs font-semibold px-4 py-2 text-primary-800 bg-primary-50 hover:bg-primary-100 rounded-xl transition-all"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Page Title & Search */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
            <Sparkles size={14} className="text-amber-500" />
            <span>Katalog Tema Eksklusif</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-stone-900 tracking-tight font-cinzel">
            Tema Undangan Digital
          </h1>
          <p className="text-stone-600 text-sm sm:text-base">
            Tema eksklusif Split Floral telah dioptimalkan secara mendalam dengan video cover entrance, musik saxophone, dan formulir RSVP real-time.
          </p>

          {/* Search Input */}
          <div className="relative max-w-md mx-auto pt-2">
            <Search className="absolute left-4 top-5 text-stone-400" size={18} />
            <input 
              type="text"
              placeholder="Cari tema..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white border border-stone-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-24 space-y-4">
            <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-800 rounded-full animate-spin" />
            <p className="text-sm font-medium text-stone-500">Memuat koleksi tema...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Real Active Theme Cards (Split Floral & Secret Garden) */}
            {filteredThemes?.map((theme) => {
              const imageSrc = theme.preview_image || '/bg-floral.jpg';
              const isGarden = theme.slug === 'secret-garden';

              return (
                <div 
                  key={theme.id || theme.slug} 
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-2 border-primary-200 flex flex-col group col-span-1"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 h-full">
                    
                    {/* Theme Thumbnail Preview Container */}
                    <div className="sm:col-span-6 aspect-[4/3] sm:aspect-auto bg-stone-100 relative overflow-hidden min-h-[220px]">
                      <img 
                        src={imageSrc} 
                        alt={theme.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      
                      {/* Top Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                        <span className="bg-primary-950/85 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                          {theme.category || (isGarden ? 'Botanical & Garden' : 'Floral & Classic')}
                        </span>
                        <span className="bg-amber-400 text-stone-950 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow w-fit">
                          {theme.badge || 'Tema Aktif'}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 shadow text-xs font-bold text-stone-800 z-10">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span>5.0</span>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 bg-stone-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4 z-20">
                        <button 
                          onClick={() => setPreviewTheme(theme)}
                          className="bg-white hover:bg-stone-50 text-stone-900 font-bold px-6 py-2.5 rounded-xl text-sm shadow-xl transform -translate-y-2 group-hover:translate-y-0 transition-transform flex items-center space-x-2 cursor-pointer"
                        >
                          <Eye size={16} />
                          <span>Pratinjau Live Tema</span>
                        </button>
                      </div>
                    </div>

                    {/* Theme Content Details */}
                    <div className="sm:col-span-6 p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 px-2.5 py-1 rounded-md">
                          {isGarden ? 'Trending Masterpiece' : 'Masterpiece Edition'}
                        </span>
                        <h3 className="text-2xl font-bold text-stone-900 mt-2">{theme.name}</h3>
                        <p className="text-stone-600 text-xs mt-2 leading-relaxed">
                          {theme.description || (isGarden 
                            ? 'Tema bernuansa taman romantis dusty rose & earthy mauve, bingkai foto lengkung oval, video entrance, dan ornamen bunga melayang.' 
                            : 'Tema split screen klasik dengan ornamen floral, entrance video arch, dan alunan saxophone romantis.')}
                        </p>

                        <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-600">
                          {isGarden ? (
                            <>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Video Entrance Sinematik HD</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Nuansa Dusty Rose &amp; Dresscode Swatches</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Bingkai Oval Arched &amp; Amplop Digital</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Entrance Video Arch Cover</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Audio Saxophone Romantis</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <CheckCircle2 size={13} className="text-emerald-600" />
                                <span>Split Screen Desktop / Full Mobile</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 pt-4">
                        <button 
                          onClick={() => setPreviewTheme(theme)}
                          className="w-full sm:flex-1 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs hover:bg-stone-50 transition-colors flex items-center justify-center space-x-1 cursor-pointer"
                        >
                          <Eye size={14} />
                          <span>Preview Live</span>
                        </button>
                        <a 
                          href={`/invitation/bagas-siti?theme=${theme.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full sm:flex-1 py-2.5 rounded-xl bg-primary-800 hover:bg-primary-900 text-white font-bold text-xs text-center transition-colors shadow-xs flex items-center justify-center space-x-1"
                        >
                          <span>Buka Demo</span>
                          <ArrowRight size={14} />
                        </a>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Coming Soon Card (Spanning 2 columns horizontally below) */}
            <div className="bg-stone-50/80 rounded-3xl border-2 border-dashed border-stone-300 p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left col-span-1 lg:col-span-2 gap-6">
              <div className="space-y-3 my-auto flex flex-col md:flex-row items-center gap-4 md:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-stone-200 text-stone-600 flex items-center justify-center shrink-0 shadow-inner">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Koleksi Berikutnya
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">Tema Eksklusif Berikutnya Segera Hadir</h3>
                  <p className="text-xs text-stone-500 mt-1 leading-relaxed max-w-xl">
                    Tim desainer WD Group sedang merancang tema-tema premium baru dengan berbagai variasi gaya adat nusantara, modern minimalis monokrom, dan royal arabian.
                  </p>
                </div>
              </div>
              <a 
                href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20konsultasi%20custom%20desain%20tema%20undangan%20pernikahan" 
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-6 rounded-xl bg-stone-900 hover:bg-stone-950 text-white text-xs font-bold shrink-0 transition-colors inline-flex items-center gap-2"
              >
                <span>Request Tema Khusus</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        )}

      </main>

      {/* LIVE PREVIEW MODAL */}
      {previewTheme && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-reveal-up">
          <div className="bg-stone-900 text-white rounded-3xl max-w-xl w-full p-4 sm:p-6 relative border border-stone-700 shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center pb-3 sm:pb-4 border-b border-stone-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                  {previewTheme.category || 'Theme'}
                </span>
                <h3 className="text-lg sm:text-xl font-bold">{previewTheme.name}</h3>
              </div>
              <button 
                onClick={() => setPreviewTheme(null)}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-stone-800 hover:bg-stone-700 flex items-center justify-center transition-colors"
                aria-label="Tutup Pratinjau"
              >
                <X size={18} />
              </button>
            </div>

            {/* Simulated Phone Screen in Modal */}
            <div className="my-3 sm:my-4 overflow-y-auto flex-1 flex justify-center py-1 sm:py-2">
              <div className="w-[260px] min-[375px]:w-[280px] sm:w-[310px] rounded-[36px] sm:rounded-[40px] bg-stone-950 p-2.5 sm:p-3 border-4 border-stone-800 shadow-2xl relative">
                
                {/* Notch */}
                <div className="w-24 h-3.5 bg-stone-900 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-stone-950" />
                </div>

                {/* Inner Screen */}
                <div className="rounded-[28px] overflow-hidden bg-[#fbf9f6] text-stone-900 text-center relative border border-stone-300">
                  
                  {/* Music mini bar */}
                  <div className="bg-primary-900 text-white px-3 py-2 flex items-center justify-between text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <Disc size={13} className="animate-spin text-amber-300" />
                      <span className="font-semibold text-[10px] text-amber-200">Beautiful In White</span>
                    </div>
                    <span className="text-[9px] bg-amber-400 text-stone-900 px-1.5 py-0.5 rounded font-bold">Auto</span>
                  </div>

                  {/* Cover */}
                  <div className="relative h-56">
                    <img 
                      src={previewTheme.preview_image || '/bg-floral.jpg'} 
                      alt="Cover" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-4 text-white">
                      <p className="text-[10px] uppercase tracking-widest text-amber-200">The Wedding Of</p>
                      <h4 className="font-cinzel text-xl font-bold tracking-wide">Kevin &amp; Jessica</h4>
                      <p className="text-[10px] text-stone-300 mt-0.5">Sabtu, 24 Oktober 2026</p>
                    </div>
                  </div>

                  {/* Invitation details */}
                  <div className="p-4 space-y-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-primary-50 border border-primary-100 text-primary-900">
                      <p className="text-[10px] uppercase font-bold text-stone-400">Kepada Yth:</p>
                      <p className="text-sm font-bold mt-0.5">Bapak / Ibu Tamu Undangan</p>
                    </div>

                    <p className="text-[11px] text-stone-600 italic">
                      &ldquo;Merupakan suatu kehormatan bagi kami atas kehadiran Bapak/Ibu sekalian.&rdquo;
                    </p>

                    <div className="flex justify-center space-x-2 pt-1">
                      <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-[10px] font-semibold text-stone-700">
                        📍 Lokasi Maps
                      </span>
                      <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-[10px] font-semibold text-stone-700">
                        🎁 Amplop Kado
                      </span>
                      <span className="px-2.5 py-1 bg-stone-100 rounded-lg text-[10px] font-semibold text-stone-700">
                        💌 Buku Tamu
                      </span>
                    </div>
                  </div>

                </div>

                <div className="w-24 h-1 bg-stone-700 rounded-full mx-auto mt-2" />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row gap-2">
              <a 
                href={`https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20tertarik%20dengan%20tema%20${encodeURIComponent(previewTheme.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold text-xs text-center transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle size={16} />
                <span>Pesan via WhatsApp</span>
              </a>
              <Link 
                to="/admin/invitations/create"
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 text-stone-950 font-extrabold text-xs text-center transition-colors flex items-center justify-center space-x-2"
              >
                <span>Buat Undangan Sekarang</span>
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-400 py-10 border-t border-stone-800 text-xs text-center">
        <p>&copy; {new Date().getFullYear()} WD Group. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
      </footer>

    </div>
  );
};
