import React from 'react';
import { Calendar, MapPin, Gift, CreditCard, Clock, Heart } from 'lucide-react';
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

export const BaseTheme: React.FC<BaseThemeProps> = ({ invitation, couple, events, stories, gallery, gifts }) => {
  const toast = useToast();
  // Use theme colors if available, otherwise fallback to elegant defaults
  const colors = invitation.theme?.colors || {
    primary: '#4f46e5',
    secondary: '#818cf8',
    background: '#ffffff',
    text: '#1f2937'
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800" style={{ backgroundColor: colors.background, color: colors.text }}>
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {invitation.theme?.preview_image && (
          <div className="absolute inset-0 z-0">
            <img src={invitation.theme.preview_image} alt="Hero Background" className="w-full h-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
          </div>
        )}
        <div className="relative z-10 px-4 pt-20 pb-12 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[0.3em] mb-4 text-gray-500">The Wedding Of</p>
          <h1 className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 drop-shadow-sm">
            {couple?.groom_nickname || 'Romeo'} & {couple?.bride_nickname || 'Juliet'}
          </h1>
          {events?.[0]?.event_date && (
            <p className="text-xl text-gray-600 font-light mt-4">
              {new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </div>
      </section>

      {/* Couple Section */}
      <section className="py-20 px-4 bg-gray-50/50">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="mx-auto text-rose-300 w-8 h-8 mb-6" />
          <p className="text-lg italic text-gray-600 max-w-2xl mx-auto mb-16 px-4">
            "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya..."
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            {/* Groom */}
            <div className="flex-1 space-y-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 border-4 border-white shadow-xl overflow-hidden">
                {/* Fallback silhouette if no photo */}
                <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100"></div>
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">{couple?.groom_full_name || 'Nama Mempelai Pria'}</h2>
              <p className="text-gray-500">
                Putra dari<br/>
                Bapak {couple?.groom_father_name || 'Nama Ayah'} & Ibu {couple?.groom_mother_name || 'Nama Ibu'}
              </p>
            </div>

            <div className="text-4xl font-serif text-gray-300">&amp;</div>

            {/* Bride */}
            <div className="flex-1 space-y-4">
              <div className="w-40 h-40 mx-auto rounded-full bg-gray-200 border-4 border-white shadow-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-tr from-gray-300 to-gray-100"></div>
              </div>
              <h2 className="text-3xl font-serif font-bold text-gray-900">{couple?.bride_full_name || 'Nama Mempelai Wanita'}</h2>
              <p className="text-gray-500">
                Putri dari<br/>
                Bapak {couple?.bride_father_name || 'Nama Ayah'} & Ibu {couple?.bride_mother_name || 'Nama Ibu'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events?.length > 0 && (
        <section className="py-24 px-4 bg-white relative">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Rangkaian Acara</h2>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {events.map((event, idx) => (
                <div key={idx} className="bg-gray-50 rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 rounded-bl-full -mr-16 -mt-16 opacity-50 group-hover:bg-primary-100 transition-colors"></div>
                  
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6 relative z-10">{event.name}</h3>
                  
                  <div className="space-y-4 text-gray-600 relative z-10">
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800">{new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <div className="flex items-center text-sm mt-1">
                          <Clock className="w-4 h-4 mr-1 text-gray-400" />
                          <span>{event.start_time} - {event.end_time || 'Selesai'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 mr-3 text-gray-400 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800">{event.location}</p>
                        <p className="text-sm mt-1">{event.address}</p>
                        {event.maps_url && (
                          <a href={event.maps_url} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm px-4 py-1.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors">
                            Buka Google Maps
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

      {/* Story Section */}
      {stories?.length > 0 && (
        <section className="py-24 px-4 bg-gray-50/50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Perjalanan Cinta</h2>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-3 md:mx-auto md:w-0">
              {stories.map((story, idx) => (
                <div key={idx} className={`mb-12 flex flex-col md:flex-row items-center w-full ${idx % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-gray-400 border-4 border-white -translate-x-[9px] mt-1.5 md:mt-0 ${idx % 2 === 0 ? 'bg-primary-500' : 'bg-rose-400'}`}></div>
                  
                  <div className={`ml-8 md:ml-0 md:w-5/12 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${idx % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <span className="text-sm font-bold text-primary-600 tracking-wider uppercase mb-1 block">{story.date}</span>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{story.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {gallery?.length > 0 && (
        <section className="py-24 px-4 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Galeri</h2>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {gallery.map((image, idx) => (
                <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  {image.image_url ? (
                    <img src={image.image_url} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full bg-gray-200"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gift Section */}
      {gifts?.length > 0 && (
        <section className="py-24 px-4 bg-gray-50/50">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-12">
              <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">Wedding Gift</h2>
              <p className="text-gray-600">Bagi keluarga dan sahabat yang ingin memberikan tanda kasih, dapat mengirimkan kado melalui opsi di bawah ini:</p>
            </div>

            <div className="space-y-6">
              {gifts.map((gift, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
                  <div className="absolute top-0 right-0 opacity-5 p-4">
                    <CreditCard className="w-32 h-32" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{gift.provider}</h3>
                  <p className="text-2xl font-mono tracking-widest text-gray-800 my-4">{gift.account_number}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-widest">A.N {gift.account_name}</p>
                  
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(gift.account_number);
                      toast.success('Nomor rekening berhasil disalin!');
                    }}
                    className="mt-6 px-6 py-2 border-2 border-gray-900 text-gray-900 rounded-full text-sm font-bold hover:bg-gray-900 hover:text-white transition-colors"
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
      <footer className="py-12 bg-gray-900 text-center text-gray-500 text-sm px-4">
        <p>Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.</p>
        <p className="mt-8 font-serif text-2xl text-white">
          {couple?.groom_nickname || 'R'} &amp; {couple?.bride_nickname || 'A'}
        </p>
        <p className="mt-12 text-xs opacity-50">Powered by WD Group Invitation</p>
      </footer>
    </div>
  );
};
