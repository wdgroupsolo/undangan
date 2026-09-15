import React, { useState, useRef } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import { editorService } from '../../services/editorService';
import { BaseTheme } from './themes/BaseTheme';
import { LuxuryAnimatedTheme } from './themes/LuxuryAnimatedTheme';
import { SplitFloralTheme } from './themes/SplitFloralTheme';
import { AnimatedFloralTheme } from './themes/AnimatedFloralTheme';

export const InvitationRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { data: invitation, isLoading: isLoadingInv } = useQuery({
    queryKey: ['invitation', slug],
    queryFn: () => slug ? invitationService.getInvitationBySlug(slug) : null,
    enabled: !!slug,
  });

  const invId = invitation?.id;

  const { data: couple, isLoading: isLoadingCouple } = useQuery({ queryKey: ['couple', invId], queryFn: () => editorService.getCouple(invId!), enabled: !!invId });
  const { data: events } = useQuery({ queryKey: ['events', invId], queryFn: () => editorService.getEvents(invId!), enabled: !!invId });
  const { data: stories } = useQuery({ queryKey: ['stories', invId], queryFn: () => editorService.getStories(invId!), enabled: !!invId });
  const { data: gallery } = useQuery({ queryKey: ['gallery', invId], queryFn: () => editorService.getGallery(invId!), enabled: !!invId });
  const { data: gifts } = useQuery({ queryKey: ['gifts', invId], queryFn: () => editorService.getGifts(invId!), enabled: !!invId });
  const { data: music } = useQuery({ queryKey: ['music', invId], queryFn: () => editorService.getMusic(invId!), enabled: !!invId });

  if (isLoadingInv || isLoadingCouple) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Memuat undangan...</div>;
  }

  if (!invitation) {
    return <Navigate to="/404" replace />;
  }

  const formatName = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  const groom = formatName(couple?.groom_nickname || couple?.groom_name || couple?.groom_full_name) || 'Jessi';
  const bride = formatName(couple?.bride_nickname || couple?.bride_name || couple?.bride_full_name) || 'Maudy';
  const coverImage = gallery?.[0]?.image_url || invitation.theme?.preview_image || '/cover-lunar-bg.jpg';

  const handleOpen = () => {
    setIsOpened(true);
    if (music?.music_url && audioRef.current) {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Audio */}
      {music?.music_url && (
        <audio ref={audioRef} loop>
          <source src={music.music_url} type="audio/mpeg" />
        </audio>
      )}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${isOpened ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {isOpened && (
          invitation.theme?.slug === 'animated-luxury' ? (
            <LuxuryAnimatedTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : invitation.theme?.slug === 'split-floral' ? (
            <SplitFloralTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : invitation.theme?.slug === 'animated-floral' ? (
            <AnimatedFloralTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (
            <BaseTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          )
        )}
      </div>

      {/* Cover Modal */}
      <div 
        className={`fixed inset-0 z-50 transition-transform duration-1000 ease-in-out ${isOpened ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Fullscreen Photo Background */}
        <div className="absolute inset-0 bg-neutral-900">
          <img 
            src={coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          />
          {/* Subtle contrast gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/40"></div>
        </div>

        {/* Centered Overlay matching reference screenshot */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 select-none">
          <p 
            className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white font-medium drop-shadow-md mb-2 sm:mb-3"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Undangan Pernikahan
          </p>

          <h1 
            className="text-4xl sm:text-6xl md:text-[4.5rem] text-white font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] mb-6 sm:mb-8 flex items-center justify-center gap-2.5 sm:gap-4 uppercase"
            style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}
          >
            <span>{groom}</span>
            <span className="text-3xl sm:text-5xl font-serif font-light italic opacity-90">&amp;</span>
            <span>{bride}</span>
          </h1>
          
          <div className="text-center text-white mb-6 sm:mb-8 space-y-0.5 sm:space-y-1 drop-shadow-md">
            <p className="text-xs sm:text-sm font-normal text-white/90 tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Kepada Yth.
            </p>
            <p className="text-xs sm:text-sm font-normal text-white/90 tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-base sm:text-xl font-bold text-white tracking-wide pt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {guestName}
            </p>
          </div>
          
          <button 
            onClick={handleOpen}
            className="inline-flex items-center gap-2.5 bg-white hover:bg-neutral-100 text-[#3a291a] px-6 py-2 sm:py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_6px_25px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <Mail className="w-4 h-4 text-[#3a291a]" />
            <span>Buka Undangan</span>
          </button>
        </div>
      </div>
    </div>
  );
};
