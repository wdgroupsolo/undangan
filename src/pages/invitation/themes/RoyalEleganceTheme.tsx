import React, { useEffect } from 'react';
import { Calendar, MapPin, Gift, CreditCard, Clock, Heart, Music, Quote } from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

interface BaseThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const RoyalEleganceTheme: React.FC<BaseThemeProps> = ({ invitation, couple, events, stories, gallery, gifts }) => {
  const toast = useToast();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Lora:ital,wght@0,400;0,500;1,400&family=Montserrat:wght@300;400;500&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const goldGradient = 'linear-gradient(90deg, #d4af37 0%, #f3e5ab 50%, #d4af37 100%)';
  const textGold = { background: goldGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' };

  return (
    <div className="min-h-screen bg-[#110e0c] text-[#eae0d5] overflow-x-hidden" style={{ fontFamily: "'Lora', serif" }}>
      
      {/* Fixed Gold Border */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50" style={{ background: goldGradient }} />
      <div className="fixed bottom-0 left-0 w-full h-1.5 z-50" style={{ background: goldGradient }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#110e0c] via-transparent to-[#110e0c]"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-3xl mx-auto flex flex-col items-center animate-fade-in-up">
          {/* Ornamental Divider */}
          <div className="mb-8 opacity-80">
            <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 15h30m40 0h30M50 15a10 10 0 1020 0 10 10 0 10-20 0z" stroke="url(#gold)" strokeWidth="1.5" />
              <defs>
                <linearGradient id="gold" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#d4af37" />
                  <stop offset="0.5" stopColor="#f3e5ab" />
                  <stop offset="1" stopColor="#d4af37" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            The Wedding Celebration Of
          </p>
          
          <h1 className="text-6xl md:text-8xl font-normal mb-8 leading-tight drop-shadow-2xl" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
            {couple?.groom_nickname || 'Romeo'}<br/>
            <span className="text-4xl md:text-6xl italic font-light">&amp;</span><br/>
            {couple?.bride_nickname || 'Juliet'}
          </h1>
          
          <div className="w-px h-16 bg-gradient-to-b from-[#d4af37] to-transparent mb-8"></div>
          
          {events?.[0]?.event_date && (
            <p className="text-lg md:text-xl font-light tracking-widest uppercase text-[#eae0d5]/80" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-6 bg-[#15110f] border-y border-[#d4af37]/20 relative">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <Quote className="w-10 h-10 mx-auto text-[#d4af37] mb-8 opacity-50" />
          <p className="text-lg md:text-xl italic leading-relaxed text-[#eae0d5]/90 mb-6 font-light" style={{ fontFamily: "'Playfair Display', serif" }}>
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."
          </p>
          <p className="text-sm font-medium tracking-widest text-[#d4af37]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            (QS. AR-RUM: 21)
          </p>
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-32 px-6 bg-[#110e0c]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
              Sang Mempelai
            </h2>
            <div className="w-20 h-px bg-[#d4af37]/50 mx-auto"></div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
            {/* Groom */}
            <div className="flex-1 text-center w-full">
              <div className="w-56 h-72 mx-auto rounded-t-full bg-[#1a1315] border border-[#d4af37]/30 p-2 shadow-[0_0_40px_rgba(212,175,55,0.05)] mb-8">
                <div className="w-full h-full rounded-t-full bg-[#2a1f22] overflow-hidden relative">
                  {/* Fallback silhouette if no photo */}
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl mb-4 font-semibold" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                {couple?.groom_full_name || 'Nama Mempelai Pria'}
              </h2>
              <p className="text-[#eae0d5]/60 text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Putra dari Bapak {couple?.groom_father_name || 'Nama Ayah'}<br/>
                &amp; Ibu {couple?.groom_mother_name || 'Nama Ibu'}
              </p>
            </div>

            <div className="text-6xl italic font-light opacity-50" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
              &amp;
            </div>

            {/* Bride */}
            <div className="flex-1 text-center w-full">
              <div className="w-56 h-72 mx-auto rounded-t-full bg-[#1a1315] border border-[#d4af37]/30 p-2 shadow-[0_0_40px_rgba(212,175,55,0.05)] mb-8">
                <div className="w-full h-full rounded-t-full bg-[#2a1f22] overflow-hidden relative">
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl mb-4 font-semibold" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                {couple?.bride_full_name || 'Nama Mempelai Wanita'}
              </h2>
              <p className="text-[#eae0d5]/60 text-sm leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Putri dari Bapak {couple?.bride_father_name || 'Nama Ayah'}<br/>
                &amp; Ibu {couple?.bride_mother_name || 'Nama Ibu'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events?.length > 0 && (
        <section className="py-32 px-6 bg-[#15110f] border-y border-[#d4af37]/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-24">
              <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                Rangkaian Acara
              </h2>
              <div className="w-20 h-px bg-[#d4af37]/50 mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {events.map((event, idx) => (
                <div key={idx} className="bg-[#110e0c] rounded-lg p-10 border border-[#d4af37]/20 relative overflow-hidden group hover:border-[#d4af37]/50 transition-colors duration-500">
                  {/* Decorative corner accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#d4af37] opacity-50 m-4"></div>
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#d4af37] opacity-50 m-4"></div>
                  
                  <h3 className="text-3xl text-center mb-8 font-medium" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                    {event.name}
                  </h3>
                  
                  <div className="space-y-6 text-[#eae0d5]/80 text-center">
                    <div className="flex flex-col items-center">
                      <Calendar className="w-6 h-6 text-[#d4af37] mb-3" />
                      <p className="font-semibold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                        {new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                      <div className="flex items-center text-sm mt-2 opacity-80">
                        <Clock className="w-4 h-4 mr-2 text-[#d4af37]" />
                        <span>{event.start_time} - {event.end_time || 'Selesai'}</span>
                      </div>
                    </div>
                    
                    <div className="w-12 h-px bg-[#d4af37]/30 mx-auto my-6"></div>

                    <div className="flex flex-col items-center">
                      <MapPin className="w-6 h-6 text-[#d4af37] mb-3" />
                      <p className="font-semibold text-lg" style={{ fontFamily: "'Montserrat', sans-serif" }}>{event.location}</p>
                      <p className="text-sm mt-2 opacity-70 leading-relaxed max-w-[250px]">{event.address}</p>
                      
                      {event.maps_url && (
                        <a 
                          href={event.maps_url} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-block mt-8 text-xs tracking-widest px-8 py-3 border border-[#d4af37] text-[#d4af37] uppercase hover:bg-[#d4af37] hover:text-[#110e0c] transition-all duration-300"
                          style={{ fontFamily: "'Montserrat', sans-serif" }}
                        >
                          Lihat Peta
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery?.length > 0 && (
        <section className="py-32 px-6 bg-[#110e0c]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                Momen Bahagia
              </h2>
              <div className="w-20 h-px bg-[#d4af37]/50 mx-auto"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
              {gallery.map((image, idx) => (
                <div key={idx} className="aspect-square bg-[#1a1315] border border-[#d4af37]/20 p-1 relative group overflow-hidden">
                  <div className="w-full h-full relative overflow-hidden">
                    {image.image_url ? (
                      <img 
                        src={image.image_url} 
                        alt="Gallery" 
                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" 
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2a1f22]"></div>
                    )}
                    <div className="absolute inset-0 bg-[#d4af37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {gifts?.length > 0 && (
        <section className="py-32 px-6 bg-[#15110f] border-t border-[#d4af37]/20">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-16">
              <Gift className="w-10 h-10 text-[#d4af37] mx-auto mb-6" />
              <h2 className="text-3xl md:text-5xl mb-6" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
                Tanda Kasih
              </h2>
              <div className="w-20 h-px bg-[#d4af37]/50 mx-auto mb-8"></div>
              <p className="text-[#eae0d5]/70 leading-relaxed font-light">
                Doa restu Bapak/Ibu/Saudara/i merupakan karunia yang sangat berarti bagi kami. 
                Namun, apabila Bapak/Ibu/Saudara/i bermaksud memberikan tanda kasih, dapat melalui fitur di bawah ini:
              </p>
            </div>

            <div className="space-y-6">
              {gifts.map((gift, idx) => (
                <div key={idx} className="bg-[#110e0c] p-10 border border-[#d4af37]/30 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 opacity-5 p-4 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-700">
                    <CreditCard className="w-32 h-32 text-[#d4af37]" />
                  </div>
                  <h3 className="text-xl md:text-2xl mb-2 font-medium tracking-wide text-[#d4af37]" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {gift.provider}
                  </h3>
                  <p className="text-3xl md:text-4xl font-light tracking-[0.1em] text-[#eae0d5] my-6 font-mono">
                    {gift.account_number}
                  </p>
                  <p className="text-sm text-[#eae0d5]/60 uppercase tracking-widest mb-8" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                    A.N {gift.account_name}
                  </p>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(gift.account_number);
                      toast.success('Nomor rekening berhasil disalin!');
                    }}
                    className="px-8 py-3 border border-[#d4af37] text-[#d4af37] text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-[#110e0c] transition-all duration-300"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Salin Nomor Rekening
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-24 bg-[#110e0c] text-center px-6 border-t border-[#d4af37]/10">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#eae0d5]/60 font-light leading-relaxed mb-12">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kedua mempelai.
          </p>
          <h2 className="text-4xl italic mb-12" style={{ fontFamily: "'Playfair Display', serif", ...textGold }}>
            {couple?.groom_nickname || 'R'} &amp; {couple?.bride_nickname || 'A'}
          </h2>
          <a
            href="https://www.instagram.com/wdgroupcompany"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs uppercase tracking-widest text-[#d4af37]/50 hover:text-[#d4af37] transition-colors"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Powered by WD Group Invitation
          </a>
        </div>
      </footer>
    </div>
  );
};
