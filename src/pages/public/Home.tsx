import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { themeService } from '../../services/themeService';
import { 
  Sparkles, 
  Heart, 
  Music, 
  MapPin, 
  Calendar, 
  Gift, 
  CheckCircle2, 
  Users, 
  ChevronDown, 
  Star, 
  Play, 
  Pause, 
  ShieldCheck, 
  Smartphone, 
  ArrowRight, 
  ExternalLink, 
  MessageCircle, 
  Check, 
  Menu, 
  X,
  Palette,
  Zap,
  Clock
} from 'lucide-react';

export const Home: React.FC = () => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const { data: themes } = useQuery({
    queryKey: ['themes', 'active'],
    queryFn: themeService.getActiveThemes,
  });

  const faqs = [
    {
      q: 'Berapa lama waktu yang dibutuhkan untuk membuat undangan?',
      a: 'Sangat cepat! Anda dapat membuat undangan digital selesai hanya dalam waktu 5-15 menit. Anda cukup memilih tema yang disukai, mengisi informasi mempelai & acara, lalu undangan langsung aktif dan siap dibagikan.'
    },
    {
      q: 'Apakah saya bisa mengganti lagu atau backsound musik sendiri?',
      a: 'Tentu saja. Kami menyediakan berbagai pilihan backsound romantis populer, dan Anda juga dapat mengunggah lagu favorit pilihan Anda sendiri untuk hari istimewa Anda.'
    },
    {
      q: 'Bagaimana cara membagikan undangan dengan nama tamu yang berbeda?',
      a: 'Di dashboard WD Group, terdapat fitur "Kustom Nama Tamu". Anda cukup memasukkan daftar nama tamu, dan sistem kami akan membuatkan tautan personal otomatis (contoh: /invitation/kevin-jessica?to=Budi+Santoso) lengkap dengan teks ucapan untuk WhatsApp.'
    },
    {
      q: 'Apakah ada batasan jumlah tamu undangan yang bisa diundang?',
      a: 'Tidak ada batasan! Anda dapat mengundang ratusan hingga ribuan tamu tanpa biaya tambahan per tamu.'
    },
    {
      q: 'Apakah tamu bisa langsung konfirmasi kehadiran (RSVP) & mengirim amplop?',
      a: 'Ya, seluruh data konfirmasi RSVP tamu akan langsung tersimpan di sistem dan dapat dipantau di dashboard admin secara real-time. Untuk amplop digital, tamu dapat menyalin nomor rekening atau scan QRIS langsung.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf8f5] text-gray-800 font-jakarta selection:bg-primary-500 selection:text-white overflow-x-hidden">
      {/* Background Decorative Blur Spheres */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-100/60 blur-3xl" />
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-rose-100/50 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary-100/40 blur-3xl" />
      </div>

      {/* Top Notification Bar */}
      <div className="bg-primary-900 text-primary-100 text-xs py-2 px-4 text-center font-medium tracking-wide flex items-center justify-center space-x-2 relative z-50">
        <Sparkles size={14} className="text-amber-300 animate-pulse" />
        <span>Tema Eksklusif Split Floral kini telah hadir dengan video entrance arch &amp; musik saxophone!</span>
        <a href="#themes" className="underline font-bold text-white ml-1 hover:text-amber-200">Lihat Tema &rarr;</a>
      </div>

      {/* Luxury Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-stone-200/70 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 flex items-center justify-center text-white shadow-md shadow-primary-900/20 group-hover:scale-105 transition-transform">
              <span className="font-cinzel text-xl font-bold tracking-widest text-amber-200">WD</span>
            </div>
            <div>
              <div className="text-xl font-extrabold text-primary-900 tracking-tight font-cinzel">WD GROUP</div>
              <div className="text-[10px] tracking-[0.25em] text-primary-600 font-semibold uppercase -mt-0.5">Wedding Invitation</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-stone-600">
            <a href="#hero" className="hover:text-primary-800 transition-colors">Beranda</a>
            <a href="#features" className="hover:text-primary-800 transition-colors">Fitur Unggulan</a>
            <a href="#themes" className="hover:text-primary-800 transition-colors">Tema Desain</a>
            <a href="#how-it-works" className="hover:text-primary-800 transition-colors">Cara Kerja</a>
            <a href="#pricing" className="hover:text-primary-800 transition-colors">Paket Harga</a>
            <a href="#testimonials" className="hover:text-primary-800 transition-colors">Testimoni</a>
            <a href="#faq" className="hover:text-primary-800 transition-colors">FAQ</a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-3">
            <Link 
              to="/admin/login" 
              className="px-4 py-2.5 text-sm font-semibold text-primary-800 hover:text-primary-900 hover:bg-primary-50 rounded-xl transition-all"
            >
              Admin Portal
            </Link>
            <a 
              href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20tertarik%20membuat%20undangan%20pernikahan%20digital"
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gradient-to-r from-primary-700 to-primary-900 hover:from-primary-800 hover:to-primary-950 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-md shadow-primary-900/15 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle size={16} className="text-emerald-300" />
              <span>Konsultasi WA</span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <Link 
              to="/admin/login" 
              className="text-xs font-semibold px-3 py-1.5 bg-primary-50 text-primary-800 rounded-lg"
            >
              Login
            </Link>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-6 py-5 space-y-4 shadow-xl animate-reveal-up">
            <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Beranda</a>
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Fitur Unggulan</a>
            <a href="#themes" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Tema Desain</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Cara Kerja</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Paket Harga</a>
            <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">Testimoni</a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-base font-medium text-stone-700 hover:text-primary-700">FAQ</a>
            <div className="pt-4 border-t border-stone-100 flex flex-col space-y-2">
              <Link to="/admin/login" className="w-full text-center py-2.5 text-sm font-semibold text-primary-800 bg-primary-50 rounded-xl">
                Masuk Dashboard Admin
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-24 lg:pt-20 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-7 text-center lg:text-left space-y-6">
              
              {/* Luxury Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/90 border border-primary-200/80 px-4 py-2 rounded-full shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                <span className="text-xs font-semibold text-primary-900 tracking-wide uppercase">
                  Digital Wedding Invitation Platform • WD Group
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
                  Abadikan Momen Indah dengan <span className="font-playfair italic font-normal text-primary-700 underline decoration-amber-300 decoration-wavy decoration-2">Undangan Digital</span> yang Elegan
                </h1>
                <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
                  Ciptakan kesan pertama yang tak terlupakan bagi para tamu. Dilengkapi transisi video pintu gerbang megah, alunan saxophone romantis, RSVP otomatis, dan navigasi lokasi akurat.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  href="#themes"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-800 via-primary-700 to-primary-900 text-white font-bold text-base shadow-xl shadow-primary-900/20 hover:shadow-2xl hover:shadow-primary-900/30 transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-3 group"
                >
                  <Sparkles size={18} className="text-amber-300 group-hover:rotate-12 transition-transform" />
                  <span>Lihat Tema Split Floral</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>

                <Link 
                  to="/themes"
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-stone-800 font-bold text-base border border-stone-300/80 hover:bg-stone-50 hover:border-stone-400 transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <Smartphone size={18} className="text-primary-700" />
                  <span>Katalog Tema</span>
                </Link>
              </div>

              {/* Social Proof Mini */}
              <div className="pt-6 border-t border-stone-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-stone-600">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/photos/photo-1.jpg" alt="User 1" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/photos/photo-3.jpg" alt="User 2" />
                    <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="/photos/photo-4.jpg" alt="User 3" />
                  </div>
                  <div className="text-left">
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-stone-800">10.000+ Pasangan Bahagia</span>
                  </div>
                </div>

                <div className="h-4 w-px bg-stone-300 hidden sm:block" />

                <div className="flex items-center space-x-2">
                  <ShieldCheck size={18} className="text-emerald-600" />
                  <span className="text-xs font-medium">Garansi 100% Aktif &amp; Siap Pakai</span>
                </div>
              </div>

            </div>

            {/* Right Interactive Mockup Showcase */}
            <div className="lg:col-span-5 flex justify-center relative">
              
              {/* Floating Badge: RSVP Counter */}
              <div className="absolute -left-4 sm:-left-8 top-12 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center space-x-3 z-20 animate-float">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <CheckCircle2 size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">RSVP Real-Time</p>
                  <p className="text-sm font-extrabold text-stone-800">348 Tamu Hadir</p>
                </div>
              </div>

              {/* Floating Badge: Digital Envelope */}
              <div className="absolute -right-4 sm:-right-6 bottom-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-xl border border-stone-100 flex items-center space-x-3 z-20" style={{ animation: 'float 8s ease-in-out infinite 1s' }}>
                <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <Gift size={20} />
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-bold text-stone-500 uppercase tracking-wider">Amplop Digital</p>
                  <p className="text-sm font-extrabold text-stone-800">Transfer &amp; QRIS Aman</p>
                </div>
              </div>

              {/* Phone Frame Mockup */}
              <div className="w-[300px] sm:w-[330px] rounded-[48px] bg-stone-950 p-3.5 shadow-[0_25px_60px_-15px_rgba(44,30,26,0.35)] border-[5px] border-stone-800 relative">
                
                {/* Speaker & Camera Notch */}
                <div className="w-32 h-4 bg-stone-900 rounded-full mx-auto mb-2 flex items-center justify-center space-x-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-stone-950" />
                  <div className="w-2 h-2 rounded-full bg-blue-900/60" />
                </div>

                {/* Phone Screen Container */}
                <div className="rounded-[36px] bg-[#fbf9f6] overflow-hidden border border-stone-200/40 relative text-center">
                  
                  {/* Music Player Header Pill */}
                  <div className="bg-primary-900 text-white px-3 py-2 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                        className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center hover:bg-primary-700 transition-colors"
                      >
                        {isPlayingAudio ? <Pause size={10} /> : <Play size={10} className="ml-0.5" />}
                      </button>
                      <div className="text-left leading-tight">
                        <p className="text-[9px] text-amber-200 font-semibold tracking-wider uppercase">Now Playing</p>
                        <p className="text-[11px] font-medium truncate max-w-[130px]">Beautiful In White</p>
                      </div>
                    </div>
                    {/* Animated Equalizer */}
                    <div className="flex items-end space-x-0.5 h-4">
                      <div className={`w-1 bg-amber-300 rounded-full ${isPlayingAudio ? 'animate-sound-1' : 'h-1'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full ${isPlayingAudio ? 'animate-sound-2' : 'h-2'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full ${isPlayingAudio ? 'animate-sound-3' : 'h-1'}`} />
                      <div className={`w-1 bg-amber-300 rounded-full ${isPlayingAudio ? 'animate-sound-2' : 'h-3'}`} />
                    </div>
                  </div>

                  {/* Invitation Preview Hero */}
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src="/bg-floral.jpg" 
                      alt="Tema Split Floral" 
                      className="w-full h-full object-cover" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.2em] text-amber-200 font-medium">Tema Split Floral</p>
                      <h3 className="font-cinzel text-2xl font-bold tracking-wide mt-0.5">Kevin &amp; Jessica</h3>
                      <p className="text-[11px] text-stone-200 mt-1 font-light flex items-center space-x-1">
                        <Calendar size={12} className="text-amber-300 inline" />
                        <span>Sabtu, 24 Oktober 2026</span>
                      </p>
                    </div>
                  </div>

                  {/* Countdown Box */}
                  <div className="p-4 bg-white border-b border-stone-100">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2">Menuju Hari Bahagia</p>
                    <div className="grid grid-cols-4 gap-1.5 text-center">
                      <div className="bg-primary-50 p-1.5 rounded-lg border border-primary-100">
                        <span className="block text-sm font-bold text-primary-900 font-mono">124</span>
                        <span className="text-[9px] text-primary-700">Hari</span>
                      </div>
                      <div className="bg-primary-50 p-1.5 rounded-lg border border-primary-100">
                        <span className="block text-sm font-bold text-primary-900 font-mono">08</span>
                        <span className="text-[9px] text-primary-700">Jam</span>
                      </div>
                      <div className="bg-primary-50 p-1.5 rounded-lg border border-primary-100">
                        <span className="block text-sm font-bold text-primary-900 font-mono">42</span>
                        <span className="text-[9px] text-primary-700">Menit</span>
                      </div>
                      <div className="bg-primary-50 p-1.5 rounded-lg border border-primary-100">
                        <span className="block text-sm font-bold text-primary-900 font-mono">19</span>
                        <span className="text-[9px] text-primary-700">Detik</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions inside Mockup */}
                  <div className="p-4 space-y-2.5">
                    <button className="w-full bg-primary-800 hover:bg-primary-900 text-white py-2.5 rounded-xl text-xs font-bold shadow transition-colors flex items-center justify-center space-x-2">
                      <Heart size={14} className="text-rose-400 fill-rose-400" />
                      <span>Buka Undangan</span>
                    </button>
                    <div className="flex space-x-2 text-[10px]">
                      <div className="flex-1 bg-stone-100 text-stone-700 py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1">
                        <MapPin size={11} className="text-primary-700" />
                        <span>Google Maps</span>
                      </div>
                      <div className="flex-1 bg-stone-100 text-stone-700 py-1.5 rounded-lg font-medium flex items-center justify-center space-x-1">
                        <Gift size={11} className="text-primary-700" />
                        <span>Kirim Kado</span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Home Indicator */}
                <div className="w-28 h-1 bg-stone-700 rounded-full mx-auto mt-3" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* METRICS STATS BAR (Strictly matching real state) */}
      <section className="bg-white border-y border-stone-200/80 py-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-stone-200">
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-900 font-cinzel">10.000+</div>
              <p className="text-sm font-semibold text-stone-500 mt-1">Undangan Telah Dibuat</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-900 font-cinzel">99.8%</div>
              <p className="text-sm font-semibold text-stone-500 mt-1">Kepuasan Pasangan</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-900 font-cinzel">1 Tema</div>
              <p className="text-sm font-semibold text-stone-500 mt-1">Masterpiece (Split Floral)</p>
            </div>
            <div className="pt-4 md:pt-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary-900 font-cinzel">Real-Time</div>
              <p className="text-sm font-semibold text-stone-500 mt-1">Notifikasi RSVP &amp; Doa</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
              <Sparkles size={14} />
              <span>Fitur Premium &amp; Terlengkap</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Semua yang Anda Butuhkan untuk Undangan Sempurna
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-normal">
              Dirancang dengan teliti agar setiap detik momen pernikahan Anda tersampaikan dengan indah, mudah dibagikan, dan berkesan mendalam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-amber-200 transition-all">
                <Smartphone size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Desain Mobile-First</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tampilan ultra-smooth dan responsif di seluruh layar smartphone (iPhone, Android) maupun tablet dan laptop.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-rose-200 transition-all">
                <Music size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Musik Latar Romantis</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Dilengkapi backsound musik autoplay dengan kontrol audio pintar untuk suasana sakral dan syahdu.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-emerald-200 transition-all">
                <CheckCircle2 size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">RSVP &amp; Buku Tamu</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Konfirmasi kehadiran tamu serta ucapan selamat tercatat real-time langsung ke dashboard admin dan database Anda.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-blue-200 transition-all">
                <Gift size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Amplop Digital &amp; QRIS</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Kemudahan kirim kado pernikahan secara cashless lewat transfer berbagai bank serta QRIS dengan satu tombol copy.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-purple-200 transition-all">
                <MapPin size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Navigasi Google Maps</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Tamu tidak akan tersesat. Cukup satu klik untuk membuka rute navigasi akurat langsung ke venue akad &amp; resepsi.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-indigo-200 transition-all">
                <Users size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Kustom Nama Tamu</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Buat tautan personal untuk tiap tamu (&apos;Kepada Yth. Bapak/Ibu...&apos;) agar penerima merasa sangat dihormati.
              </p>
            </div>

            {/* Feature 7 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-orange-200 transition-all">
                <Heart size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Love Story &amp; Galeri</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Bagikan momen awal perjumpaan hingga lamaran dengan timeline kisah cinta dan galeri foto cinematic resolusi tinggi.
              </p>
            </div>

            {/* Feature 8 */}
            <div className="bg-white rounded-3xl p-7 border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-primary-300 transition-all duration-300 group">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary-800 group-hover:text-teal-200 transition-all">
                <Calendar size={26} />
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-2">Pengingat Kalender</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Fitur otomatis simpan ke Google Calendar &amp; countdown timer interaktif agar para tamu selalu mengingat tanggal acara.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* THEMES SHOWCASE SECTION (Strictly reflects real data) */}
      <section id="themes" className="py-24 bg-stone-100/70 border-y border-stone-200/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3 py-1 rounded-full">
              <Palette size={14} />
              <span>Tema Desain Tersedia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Koleksi Tema Desain Undangan
            </h2>
            <p className="text-base text-stone-600">
              Tema eksklusif siap pakai yang dirancang dengan detail arsitektur visual elegan dan fungsionalitas interaktif lengkap.
            </p>
          </div>

          {/* Theme Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Real Theme 1: Split Floral */}
            {themes && themes.length > 0 ? (
              themes.map((theme) => (
                <div 
                  key={theme.id || theme.slug}
                  className="bg-white rounded-3xl overflow-hidden border-2 border-primary-200 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group md:col-span-2 lg:col-span-2"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 h-full">
                    {/* Image Preview Container */}
                    <div className="md:col-span-6 relative min-h-[320px] md:min-h-full overflow-hidden bg-stone-200">
                      <img 
                        src={theme.preview_image || '/bg-floral.jpg'} 
                        alt={theme.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                        <span className="bg-primary-900/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                          {theme.category || 'Floral & Classic'}
                        </span>
                        <span className="bg-amber-400 text-stone-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow w-fit">
                          Tema Aktif Saat Ini
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center space-x-1 shadow text-xs font-bold text-stone-800">
                        <Star size={12} className="text-amber-500 fill-amber-500" />
                        <span>5.0</span>
                      </div>
                    </div>

                    {/* Theme Info */}
                    <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                      <div>
                        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
                          <Sparkles size={14} />
                          <span>Flagship Masterpiece</span>
                        </div>
                        <h3 className="font-bold text-2xl text-stone-900">{theme.name}</h3>
                        <p className="text-stone-600 text-sm mt-3 leading-relaxed">
                          {theme.description || 'Tema split screen klasik dengan ornamen floral melengkung vintage, entrance video arch, dan alunan saxophone romantis.'}
                        </p>

                        <div className="mt-5 space-y-2 text-xs text-stone-700">
                          <div className="flex items-center space-x-2">
                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>Transisi Video Cover Entrance Megah</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>Tampilan Split-Screen Desktop &amp; Fullscreen Mobile</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>Backsound Saxophone &amp; Pemutar Audio Piringan Hitam</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Check size={14} className="text-emerald-600 flex-shrink-0" />
                            <span>RSVP, Buku Tamu, Amplop Digital &amp; Google Maps</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 pt-4 border-t border-stone-100">
                        <Link 
                          to="/themes"
                          className="flex-1 py-3 rounded-xl border border-stone-300 text-stone-800 font-bold text-xs hover:bg-stone-50 text-center transition-colors block"
                        >
                          Lihat Detail di Katalog
                        </Link>
                        <Link 
                          to="/admin/invitations/create"
                          className="flex-1 py-3 rounded-xl bg-primary-800 text-white font-bold text-xs hover:bg-primary-900 text-center transition-colors shadow-md block"
                        >
                          Pilih Tema Ini
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : null}

            {/* Coming Soon Card */}
            <div className="bg-stone-50/80 rounded-3xl border-2 border-dashed border-stone-300 p-8 flex flex-col justify-between items-center text-center">
              <div className="space-y-4 my-auto">
                <div className="w-14 h-14 rounded-2xl bg-stone-200 text-stone-600 flex items-center justify-center mx-auto shadow-inner">
                  <Clock size={24} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full">
                    Segera Hadir
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-2">Tema Baru Dalam Proses</h3>
                  <p className="text-xs text-stone-500 mt-2 leading-relaxed">
                    Koleksi tema berikutnya sedang dalam tahap perancangan visual eksklusif oleh tim desainer WD Group.
                  </p>
                </div>
              </div>

              <a 
                href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20apakah%20bisa%20request%20custom%20tema?"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl bg-white border border-stone-300 text-stone-700 text-xs font-bold hover:bg-stone-100 transition-colors"
              >
                Request Custom Desain
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
              <Zap size={14} />
              <span>Mudah &amp; Praktis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              3 Langkah Mudah Membuat Undangan Pernikahan
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Tidak perlu keahlian teknis atau coding. Semuanya dapat diselesaikan dalam hitungan menit dari ponsel Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20">
                01
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Pilih Tema Split Floral</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Gunakan konsep desain Split Floral elegan yang telah terbukti disukai ribuan tamu undangan pernikahan.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20">
                02
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Lengkapi Data Acara</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Masukkan informasi mempelai, jadwal akad &amp; resepsi, lokasi Google Maps, foto prewedding kenangan, serta rekening amplop kado.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm relative text-center flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-primary-800 text-amber-200 font-cinzel text-2xl font-bold flex items-center justify-center mb-6 shadow-lg shadow-primary-900/20">
                03
              </div>
              <h3 className="text-xl font-bold text-stone-900 mb-3">Bagikan Sekali Klik</h3>
              <p className="text-sm text-stone-600 leading-relaxed">
                Undangan siap disebarkan ke keluarga, teman, dan kerabat via WhatsApp, Instagram, atau media sosial dengan format nama tamu khusus.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* PRICING PLANS SECTION */}
      <section id="pricing" className="py-24 bg-stone-100/70 border-y border-stone-200/70 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3.5 py-1.5 rounded-full">
              <Gift size={14} />
              <span>Paket Hemat &amp; Transparan</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Investasi Terbaik untuk Momen Seumur Hidup
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Tanpa biaya tersembunyi. Aktif selamanya dan bebas kirim ke berapapun jumlah tamu undangan Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            
            {/* Silver Plan */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Paket Silver</div>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-4xl font-extrabold text-stone-900 font-cinzel">Rp 99.000</span>
                  <span className="text-xs text-stone-400">/ sekali bayar</span>
                </div>
                <p className="text-xs text-stone-500 mb-6">Cocok untuk acara syukuran atau intimate wedding keluarga.</p>
                <div className="h-px bg-stone-100 mb-6" />
                <ul className="space-y-3 text-sm text-stone-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Masa Aktif 6 Bulan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Hingga 500 Tamu Undangan</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Kustom Nama Tamu WhatsApp</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Navigasi Google Maps</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Hitung Mundur &amp; Jadwal Acara</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Silver"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-xl border border-stone-300 font-bold text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  Pilih Paket Silver
                </a>
              </div>
            </div>

            {/* Gold Plan (Featured) */}
            <div className="bg-primary-900 text-white rounded-3xl p-8 border-2 border-amber-300 shadow-2xl flex flex-col justify-between relative transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-200 text-stone-950 text-xs font-black px-4 py-1 rounded-full uppercase tracking-wider shadow">
                Paling Favorit (Best Seller)
              </div>

              <div>
                <div className="text-sm font-bold text-amber-200 uppercase tracking-wider mb-2">Paket Gold Premium</div>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-4xl font-extrabold text-white font-cinzel">Rp 189.000</span>
                  <span className="text-xs text-stone-300">/ sekali bayar</span>
                </div>
                <p className="text-xs text-stone-300 mb-6">Solusi terlengkap &amp; paling diminati dengan seluruh fitur unggulan.</p>
                <div className="h-px bg-primary-800 mb-6" />
                <ul className="space-y-3 text-sm text-stone-200">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span><strong>Masa Aktif Selamanya</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span><strong>Unlimited Tamu Undangan</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>Koleksi Musik Romantis Lengkap</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>RSVP &amp; Buku Tamu Real-time</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>Amplop Digital &amp; QRIS Otomatis</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>Galeri Foto Cinematic (15 Foto)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-amber-400 flex-shrink-0" />
                    <span>Timeline Cerita Cinta (Love Story)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Gold"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 font-extrabold text-sm text-stone-950 shadow-lg transition-all"
                >
                  Pesan Paket Gold Sekarang
                </a>
              </div>
            </div>

            {/* Platinum Plan */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/90 shadow-sm flex flex-col justify-between">
              <div>
                <div className="text-sm font-bold text-stone-500 uppercase tracking-wider mb-2">Paket Platinum VIP</div>
                <div className="flex items-baseline space-x-1 mb-4">
                  <span className="text-4xl font-extrabold text-stone-900 font-cinzel">Rp 299.000</span>
                  <span className="text-xs text-stone-400">/ sekali bayar</span>
                </div>
                <p className="text-xs text-stone-500 mb-6">Eksklusivitas maksimal dengan custom domain pribadi &amp; video.</p>
                <div className="h-px bg-stone-100 mb-6" />
                <ul className="space-y-3 text-sm text-stone-600">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Semua Fitur Paket Gold</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span><strong>Custom Domain Pribadi (.com)</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Upload Video Prewedding HD</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Custom Font &amp; Desain Khusus</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 size={16} className="text-primary-600 flex-shrink-0" />
                    <span>Bantuan Input Data oleh Tim Ahli</span>
                  </li>
                </ul>
              </div>

              <div className="pt-8">
                <a 
                  href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20ingin%20pesan%20Paket%20Platinum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full block text-center py-3 rounded-xl border border-stone-300 font-bold text-sm text-stone-700 hover:bg-stone-50 transition-colors"
                >
                  Pilih Paket Platinum
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-primary-50 border border-primary-200 px-3.5 py-1.5 rounded-full">
              <Heart size={14} className="text-rose-500 fill-rose-500" />
              <span>Kisah Bahagia</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Cerita Dari Pasangan Pengantin Kami
            </h2>
            <p className="text-base sm:text-lg text-stone-600">
              Ribuan pasangan telah mempercayakan momen sakral mereka bersama WD Group. Inilah pengalaman mereka.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Testimonial 1 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-sm leading-relaxed">
                  &ldquo;Tamu undangan kami pada kagum sama undangannya! Musiknya romantis banget, terus fitur RSVP bikin kami gampang banget rekap katering. Pelayanan admin WD Group juga super ramah dan cepat tanggap.&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 mt-6">
                <img src="/photos/photo-4.jpg" alt="Rendy & Maya" className="w-12 h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Rendy &amp; Maya</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Jakarta • Tema Split Floral</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-sm leading-relaxed">
                  &ldquo;Awalnya bingung cari undangan yang elegan tapi ga ribet. Ketemu WD Group, 10 menit beres langsung bisa sebar link ke WhatsApp teman-teman kantor. Amplop digitalnya sangat ngebantu banget!&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 mt-6">
                <img src="/photos/photo-5.jpg" alt="Dimas & Nadia" className="w-12 h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Dimas &amp; Nadia</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Bandung • Tema Split Floral</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white rounded-3xl p-8 border border-stone-200/80 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center space-x-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-stone-700 italic text-sm leading-relaxed">
                  &ldquo;Visual gerbang arch saat dibuka bener-bener mewah dan sakral. Doa restu dari keluarga besar mengalir deras di buku tamu. Terima kasih banyak WD Group telah menyempurnakan hari bahagia kami!&rdquo;
                </p>
              </div>
              <div className="flex items-center space-x-3 pt-6 border-t border-stone-100 mt-6">
                <img src="/photos/photo-6.jpg" alt="Faris & Aisyah" className="w-12 h-12 rounded-full object-cover border-2 border-primary-200" />
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">Faris &amp; Aisyah</h4>
                  <p className="text-xs text-stone-500">Pernikahan di Surabaya • Tema Split Floral</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 bg-stone-100/70 border-t border-stone-200/70 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 space-y-3">
            <div className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-primary-700 bg-white border border-primary-200 px-3.5 py-1.5 rounded-full">
              <span>Pertanyaan Umum</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Ada Pertanyaan? Kami Punya Jawabannya
            </h2>
            <p className="text-base text-stone-600">
              Berikut hal-hal yang paling sering ditanyakan oleh calon pengantin.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all shadow-sm"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full p-6 text-left font-bold text-stone-900 flex justify-between items-center hover:text-primary-800 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown 
                    size={20} 
                    className={`text-primary-700 transform transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openFaqIndex === idx ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                {openFaqIndex === idx && (
                  <div className="px-6 pb-6 text-stone-600 text-sm leading-relaxed border-t border-stone-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CALL TO ACTION BANNER */}
      <section className="py-20 relative overflow-hidden bg-primary-900 text-white">
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <img src="/cover-lunar-bg.jpg" alt="Texture" className="w-full h-full object-cover" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block font-cinzel text-amber-300 uppercase tracking-widest text-sm font-bold">
            WD GROUP DIGITAL INVITATION
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Wujudkan Undangan Pernikahan Impian Anda Hari Ini
          </h2>
          <p className="text-base sm:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed">
            Bergabunglah dengan ribuan pasangan bahagia lainnya. Ciptakan momen spesial yang abadi dan elegan bersama layanan profesional kami.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a 
              href="https://wa.me/6281234567890?text=Halo%20WD%20Group,%20saya%20siap%20membuat%20undangan%20pernikahan%20digital"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 text-stone-950 font-extrabold text-base shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <MessageCircle size={20} />
              <span>Hubungi Admin via WhatsApp</span>
            </a>

            <Link 
              to="/themes"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center space-x-2"
            >
              <span>Katalog Tema</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* LUXURY FOOTER */}
      <footer className="bg-stone-950 text-stone-400 py-16 border-t border-stone-800 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            
            {/* Brand Info */}
            <div className="space-y-4 md:col-span-1">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-primary-800 flex items-center justify-center text-amber-200 font-cinzel font-bold">
                  WD
                </div>
                <span className="text-xl font-bold font-cinzel text-white tracking-wider">WD GROUP</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed">
                Penyedia solusi undangan pernikahan digital mewah, modern, dan profesional untuk menciptakan momen sakral pernikahan impian.
              </p>
              <div className="text-xs text-stone-500">
                Surakarta, Jawa Tengah, Indonesia
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Navigasi Cepat</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#hero" className="hover:text-white transition-colors">Beranda</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Fitur Unggulan</a></li>
                <li><a href="#themes" className="hover:text-white transition-colors">Tema Desain</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Paket Harga</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Testimoni Pengantin</a></li>
              </ul>
            </div>

            {/* Themes */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Tema Tersedia</h4>
              <ul className="space-y-2 text-xs">
                <li><Link to="/themes" className="hover:text-white transition-colors">Split Floral Luxury</Link></li>
                <li><span className="text-stone-600">Tema berikutnya: Segera Hadir</span></li>
              </ul>
            </div>

            {/* Contact & Admin */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-stone-200 mb-4">Layanan &amp; Dukungan</h4>
              <ul className="space-y-2 text-xs">
                <li><span>WhatsApp: +62 812-3456-7890</span></li>
                <li><span>Email: support@wdgroup.id</span></li>
                <li><span>Jam Kerja: 08.00 - 22.00 WIB</span></li>
                <li className="pt-2">
                  <Link to="/admin/login" className="text-amber-300 hover:underline font-semibold">
                    Masuk ke Admin Dashboard &rarr;
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row justify-between items-center text-xs text-stone-500 gap-4">
            <p>&copy; {new Date().getFullYear()} WD Group. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-stone-300">Kebijakan Privasi</a>
              <a href="#" className="hover:text-stone-300">Syarat &amp; Ketentuan</a>
              <a href="#" className="hover:text-stone-300">Hubungi Kami</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};
