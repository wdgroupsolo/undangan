import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Gift, CreditCard, Clock, Heart, Sparkles } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface LuxuryAnimatedThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const LuxuryAnimatedTheme: React.FC<LuxuryAnimatedThemeProps> = ({ invitation, couple, events, stories, gallery, gifts }) => {
  const toast = useToast();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Intersection Observer for scroll animations
      const elements = document.querySelectorAll('.animate-on-scroll');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85;
        if (isVisible) {
          el.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on load
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const colors = invitation.theme?.colors || {
    primary: '#D4AF37', // Gold
    secondary: '#1A1A1A', // Dark
    background: '#0a0a0a', // Almost black
    text: '#ffffff'
  };

  return (
    <div className="min-h-screen font-serif overflow-hidden bg-black text-white selection:bg-yellow-600 selection:text-black">
      
      {/* Decorative Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-yellow-500/20 blur-sm animate-float"
            style={{
              width: Math.random() * 8 + 2 + 'px',
              height: Math.random() * 8 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden z-10 px-4">
        {invitation.theme?.preview_image && (
          <div className="absolute inset-0 z-0">
            <img 
              src={invitation.theme.preview_image} 
              alt="Hero" 
              className="w-full h-full object-cover opacity-30 transform scale-105"
              style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.05)` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
          </div>
        )}
        
        <div className="relative z-10 animate-reveal-up opacity-0" style={{ animationFillMode: 'forwards', animationDelay: '0.2s' }}>
          <Sparkles className="mx-auto text-yellow-500 w-8 h-8 mb-6 animate-pulse-glow" />
          <p className="text-sm uppercase tracking-[0.4em] mb-6 text-yellow-500/80 font-sans">The Wedding Celebration Of</p>
          <h1 className="text-6xl md:text-8xl font-serif text-white mb-8 drop-shadow-2xl" style={{ textShadow: '0 0 30px rgba(212, 175, 55, 0.3)' }}>
            {couple?.groom_nickname || 'Romeo'} & {couple?.bride_nickname || 'Juliet'}
          </h1>
          
          <div className="w-px h-24 bg-gradient-to-b from-yellow-500/80 to-transparent mx-auto mb-8 animate-grow-down"></div>
          
          {events?.[0]?.event_date && (
            <p className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase">
              {new Date(events[0].event_date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-4 relative z-10 border-t border-white/5 bg-gradient-to-b from-black to-zinc-950">
        <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000 ease-out">
          <p className="text-xl md:text-2xl italic text-gray-400 font-light leading-relaxed">
            "We loved with a love that was more than love."
          </p>
          <p className="text-sm text-yellow-600/80 mt-4 uppercase tracking-widest font-sans">— Edgar Allan Poe</p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-32 px-4 relative z-10 bg-zinc-950">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-8">
            
            {/* Groom */}
            <div className="flex-1 space-y-6 text-center md:text-right animate-on-scroll opacity-0 -translate-x-10 transition-all duration-1000 ease-out">
              <div className="w-48 h-64 md:ml-auto mx-auto rounded-full bg-zinc-900 border border-yellow-900/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div>
                <h2 className="text-4xl font-serif text-yellow-500 mb-2">{couple?.groom_full_name || 'Groom Name'}</h2>
                <p className="text-gray-400 font-sans font-light tracking-wide text-sm">
                  Putra dari Bapak {couple?.groom_father_name || 'Ayah'} & Ibu {couple?.groom_mother_name || 'Ibu'}
                </p>
              </div>
            </div>

            <div className="text-6xl font-serif text-yellow-900/40 animate-pulse-slow">&amp;</div>

            {/* Bride */}
            <div className="flex-1 space-y-6 text-center md:text-left animate-on-scroll opacity-0 translate-x-10 transition-all duration-1000 ease-out">
              <div className="w-48 h-64 mx-auto md:mr-auto rounded-full bg-zinc-900 border border-yellow-900/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              </div>
              <div>
                <h2 className="text-4xl font-serif text-yellow-500 mb-2">{couple?.bride_full_name || 'Bride Name'}</h2>
                <p className="text-gray-400 font-sans font-light tracking-wide text-sm">
                  Putri dari Bapak {couple?.bride_father_name || 'Ayah'} & Ibu {couple?.bride_mother_name || 'Ibu'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Events Section */}
      {events?.length > 0 && (
        <section className="py-32 px-4 relative z-10 bg-black">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24 animate-on-scroll opacity-0 scale-95 transition-all duration-1000 ease-out">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wide">Wedding Events</h2>
              <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {events.map((event, idx) => (
                <div key={idx} className="group relative bg-zinc-950 p-10 border border-white/5 hover:border-yellow-600/30 transition-colors duration-500 animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 200}ms` }}>
                  {/* Decorative corners */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-yellow-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-yellow-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <h3 className="text-3xl font-serif text-yellow-500 mb-8">{event.name}</h3>
                  
                  <div className="space-y-6 text-gray-300 font-sans font-light tracking-wide">
                    <div className="flex items-start group-hover:text-white transition-colors">
                      <Calendar className="w-5 h-5 mr-4 text-yellow-600/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-2 uppercase tracking-widest">
                          <Clock className="w-4 h-4 mr-2" />
                          <span>{event.start_time} - {event.end_time || 'Selesai'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5 mr-4 text-yellow-600/70 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-lg">{event.location}</p>
                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">{event.address}</p>
                        {event.maps_url && (
                          <a href={event.maps_url} target="_blank" rel="noreferrer" className="inline-block mt-6 text-xs uppercase tracking-[0.2em] px-6 py-3 border border-yellow-600/50 text-yellow-500 hover:bg-yellow-600 hover:text-black transition-all duration-300">
                            View Location
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section with Parallax Effect */}
      {gallery?.length > 0 && (
        <section className="py-32 px-4 relative z-10 bg-zinc-950 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 tracking-wide">Our Moments</h2>
              <div className="w-12 h-0.5 bg-yellow-600 mx-auto"></div>
            </div>

            <div className="columns-2 md:columns-3 gap-6 space-y-6">
              {gallery.map((image, idx) => (
                <div key={idx} className="break-inside-avoid animate-on-scroll opacity-0 scale-95 transition-all duration-1000" style={{ transitionDelay: `${(idx % 3) * 150}ms` }}>
                  <div className="group relative overflow-hidden bg-zinc-900 rounded-sm">
                    {image.image_url ? (
                      <img 
                        src={image.image_url} 
                        alt="Gallery" 
                        className="w-full h-auto object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-[2s] ease-out opacity-80 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0" 
                      />
                    ) : (
                      <div className="w-full aspect-[3/4] bg-zinc-900 border border-white/5"></div>
                    )}
                    <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {gifts?.length > 0 && (
        <section className="py-32 px-4 relative z-10 bg-black">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mb-16 animate-on-scroll opacity-0 translate-y-10 transition-all duration-1000">
              <Gift className="w-8 h-8 text-yellow-600 mx-auto mb-6" />
              <h2 className="text-4xl font-serif text-white mb-6">Wedding Gift</h2>
              <p className="text-gray-400 font-sans font-light tracking-wide leading-relaxed max-w-xl mx-auto">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
                Namun jika Anda bermaksud memberikan tanda kasih, Anda dapat mengirimkannya melalui:
              </p>
            </div>

            <div className="space-y-6 max-w-xl mx-auto">
              {gifts.map((gift, idx) => (
                <div key={idx} className="bg-zinc-950 p-8 border border-white/5 hover:border-yellow-600/30 transition-colors animate-on-scroll opacity-0 translate-y-10" style={{ transitionDelay: `${idx * 200}ms` }}>
                  <CreditCard className="w-6 h-6 text-yellow-600/50 mb-4 mx-auto" />
                  <h3 className="text-xl font-sans tracking-widest text-yellow-500 mb-2 uppercase">{gift.provider}</h3>
                  <p className="text-3xl font-mono tracking-widest text-white my-6 drop-shadow-md">{gift.account_number}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest mb-8">A.N {gift.account_name}</p>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(gift.account_number);
                      toast.success('Nomor rekening berhasil disalin!');
                    }}
                    className="text-xs uppercase tracking-[0.2em] px-8 py-3 bg-yellow-600 text-black font-bold hover:bg-yellow-500 transition-colors"
                  >
                    Salin Nomor
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 bg-zinc-950 text-center px-4 relative z-10 border-t border-white/5">
        <p className="text-gray-500 font-sans font-light tracking-widest text-sm max-w-md mx-auto leading-relaxed">
          Terima kasih atas segala doa dan restu yang diberikan.
        </p>
        <p className="mt-12 font-serif text-4xl text-yellow-500 drop-shadow-lg">
          {couple?.groom_nickname || 'R'} &amp; {couple?.bride_nickname || 'A'}
        </p>
        <div className="mt-24 text-xs font-sans tracking-[0.3em] text-gray-700 uppercase">
          Powered by WD Group
        </div>
      </footer>
    </div>
  );
};
