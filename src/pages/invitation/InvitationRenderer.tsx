import React, { useState, useRef } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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

  const coupleName = couple ? `${couple.groom_nickname} & ${couple.bride_nickname}` : invitation.title || 'Pasangan Berbahagia';

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
        <div className="absolute inset-0 bg-gray-900" style={{
          backgroundImage: `url(${invitation.theme?.preview_image || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center z-10">
          <div className="max-w-md w-full bg-black/40 backdrop-blur-md border border-white/10 p-8 rounded-3xl animate-fade-in-up">
            <h3 className="text-sm uppercase tracking-widest text-primary-300 mb-4">The Wedding Of</h3>
            <h1 className="text-4xl font-serif mb-8 text-white drop-shadow-lg">{coupleName}</h1>
            
            <p className="text-sm text-gray-300 mb-2">Kepada Yth.</p>
            <h2 className="text-2xl font-bold text-white mb-8 drop-shadow-md">{guestName}</h2>
            
            <button 
              onClick={handleOpen}
              className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors w-full shadow-lg shadow-primary-900/50 hover:scale-105 transform duration-200"
            >
              Buka Undangan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
