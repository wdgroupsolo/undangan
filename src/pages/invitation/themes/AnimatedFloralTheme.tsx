import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Gift, CreditCard, Clock, Heart } from 'lucide-react';

interface AnimatedFloralThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const AnimatedFloralTheme: React.FC<AnimatedFloralThemeProps> = ({ invitation, couple, events, stories, gallery, gifts }) => {
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    // Generate random leaves for animation
    const newLeaves = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 8 + 8}s`,
      animationDelay: `${Math.random() * 10}s`,
      size: `${Math.random() * 1.5 + 1}rem`,
      rotation: Math.random() * 360
    }));
    setLeaves(newLeaves);
  }, []);

  // Placeholder images for vintage floral decorations
  const floralFrameUrl = "https://images.unsplash.com/photo-1550624021-39cbf8159b34?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"; // Using an abstract vintage texture as placeholder
  const flowerCorner1 = "https://images.unsplash.com/photo-1457089328109-e5d9f4f15f0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"; // Placeholder flower

  // Leaf SVG component
  const FallingLeaf = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute top-0 opacity-0 animate-leaf-fall pointer-events-none z-50" style={style}>
      <svg width="1em" height="1em" viewBox="0 0 24 24" fill="#6b5c46" opacity="0.6">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10C22 6.48 17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" opacity="0.2"/>
        <path d="M17 8C14.24 8 12 10.24 12 13c0 2.76 2.24 5 5 5s5-2.24 5-5c0-2.76-2.24-5-5-5zm-5 10c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f4f0e6] font-serif text-[#5a4f40] relative overflow-x-hidden selection:bg-[#9c8471] selection:text-white">
      
      {/* Falling Leaves Animation Layer */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
        {leaves.map(leaf => (
          <FallingLeaf key={leaf.id} style={{
            left: leaf.left,
            fontSize: leaf.size,
            animationDuration: leaf.animationDuration,
            animationDelay: leaf.animationDelay,
            transform: `rotate(${leaf.rotation}deg)`
          }} />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20 z-10 border-[16px] border-transparent" style={{
        borderImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='none' stroke='%23d1c5b4' stroke-width='4'/%3E%3C/svg%3E") 30 stretch`
      }}>
        {/* Background Vintage Texture */}
        <div className="absolute inset-0 z-0 opacity-10 mix-blend-multiply pointer-events-none" style={{
          backgroundImage: `url(${floralFrameUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}></div>

        {/* Floral Corners Animated */}
        <div className="absolute top-0 left-0 w-64 h-64 -translate-x-1/4 -translate-y-1/4 opacity-80 mix-blend-multiply animate-floral-sway pointer-events-none z-20">
          <img src={flowerCorner1} alt="flower" className="w-full h-full object-cover rounded-full blur-[2px]" />
        </div>
        <div className="absolute bottom-0 right-0 w-80 h-80 translate-x-1/4 translate-y-1/4 opacity-80 mix-blend-multiply animate-floral-sway pointer-events-none z-20" style={{ animationDelay: '1.5s' }}>
          <img src={flowerCorner1} alt="flower" className="w-full h-full object-cover rounded-full blur-[2px]" />
        </div>

        {/* Content */}
        <div className="relative z-30 text-center animate-fade-in-up">
          <p className="text-xs uppercase tracking-[0.4em] mb-12 text-[#8b7e6a] font-sans font-medium">Undangan Pernikahan</p>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-serif text-[#5a4f40] drop-shadow-sm tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {couple?.groom_nickname || couple?.groom_full_name || 'Jessi'}
            </h1>
            
            <div className="text-4xl md:text-5xl font-serif italic text-[#a39178] my-4 px-4 py-2">&amp;</div>
            
            <h1 className="text-6xl md:text-8xl font-serif text-[#5a4f40] drop-shadow-sm tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              {couple?.bride_nickname || couple?.bride_full_name || 'Maudy'}
            </h1>
          </div>

          <p className="mt-12 text-sm tracking-[0.3em] text-[#8b7e6a] font-sans border-t border-[#d1c5b4] pt-6 mx-auto w-48 inline-block">
            {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '. ') : '01. 09. 2028'}
          </p>
        </div>
      </section>

      {/* Profiles Section */}
      <section className="py-24 px-8 relative z-10 bg-[#f4f0e6]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20 relative">
            <h2 className="text-3xl font-serif text-[#6b5c46] tracking-widest uppercase relative z-10 bg-[#f4f0e6] inline-block px-8">Mempelai</h2>
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#d1c5b4] -z-0"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Groom */}
            <div className="text-center relative group">
              <div className="absolute -inset-4 border border-[#d1c5b4] rounded-t-full rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="aspect-[3/4] bg-gray-200 rounded-t-[1000px] overflow-hidden mb-8 relative shadow-md border-4 border-white mx-auto max-w-sm">
                <img 
                  src={couple?.groom_photo || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                  alt={couple?.groom_full_name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <p className="font-serif italic text-3xl mb-3 text-[#a39178]">{couple?.groom_nickname || couple?.groom_full_name || 'Groom'}</p>
              <h3 className="text-xl font-serif text-[#5a4f40] mb-4">{couple?.groom_full_name || 'Groom Full Name'}</h3>
              <p className="text-sm text-[#8b7e6a] font-light leading-relaxed">
                Putra dari<br/>Bapak {couple?.groom_father_name} & Ibu {couple?.groom_mother_name}
              </p>
            </div>

            {/* Bride */}
            <div className="text-center relative group">
              <div className="absolute -inset-4 border border-[#d1c5b4] rounded-t-full rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="aspect-[3/4] bg-gray-200 rounded-t-[1000px] overflow-hidden mb-8 relative shadow-md border-4 border-white mx-auto max-w-sm">
                <img 
                  src={couple?.bride_photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'} 
                  alt={couple?.bride_full_name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
              </div>
              <p className="font-serif italic text-3xl mb-3 text-[#a39178]">{couple?.bride_nickname || couple?.bride_full_name || 'Bride'}</p>
              <h3 className="text-xl font-serif text-[#5a4f40] mb-4">{couple?.bride_full_name || 'Bride Full Name'}</h3>
              <p className="text-sm text-[#8b7e6a] font-light leading-relaxed">
                Putri dari<br/>Bapak {couple?.bride_father_name} & Ibu {couple?.bride_mother_name}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      {events?.length > 0 && (
        <section className="py-24 px-8 relative z-10 bg-[#ebe5d9]">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-[#6b5c46] tracking-widest uppercase">Rangkaian Acara</h2>
              <div className="w-16 h-px bg-[#a39178] mx-auto mt-6"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {events.map((event, idx) => (
                <div key={idx} className="bg-white p-10 text-center shadow-sm border border-[#e2d5c3] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#f4f0e6] rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110 duration-700"></div>
                  
                  <h3 className="text-2xl font-serif text-[#6b5c46] mb-6 relative z-10">{event.name}</h3>
                  
                  <div className="space-y-5 text-sm text-[#8b7e6a] font-light relative z-10">
                    <p className="font-serif italic text-lg text-[#5a4f40]">
                      {new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="tracking-widest uppercase text-xs">{event.start_time} - {event.end_time || 'Selesai'}</p>
                    
                    <div className="w-12 h-px bg-[#d1c5b4] mx-auto my-4"></div>
                    
                    <p className="font-semibold text-[#5a4f40]">{event.location}</p>
                    <p className="leading-relaxed">{event.address}</p>
                    
                    {event.maps_url && (
                      <a href={event.maps_url} target="_blank" rel="noreferrer" className="inline-block mt-6 text-xs uppercase tracking-[0.2em] px-8 py-3 border border-[#a39178] text-[#6b5c46] hover:bg-[#a39178] hover:text-white transition-colors duration-300">
                        View Location
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-20 bg-[#f4f0e6] text-center px-8 relative z-10">
        <Heart className="w-6 h-6 text-[#a39178] mx-auto mb-8 animate-pulse" />
        <p className="text-sm text-[#8b7e6a] font-light mb-8 max-w-md mx-auto leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
        </p>
        <h2 className="text-3xl font-serif text-[#6b5c46] mb-4">
          {couple?.groom_nickname || couple?.groom_full_name || 'Groom'} & {couple?.bride_nickname || couple?.bride_full_name || 'Bride'}
        </h2>
        <a
          href="https://www.instagram.com/wdgroupcompany"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-16 inline-block text-xs uppercase tracking-[0.3em] text-[#a39178] hover:text-[#5c4f3d] opacity-70 hover:opacity-100 transition-all cursor-pointer"
        >
          Powered by WD Group
        </a>
      </footer>
    </div>
  );
};
