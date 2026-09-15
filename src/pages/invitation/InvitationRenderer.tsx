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

  // Opening sequence states:
  // 'cover'      -> Initial front cover with couple photo & [Buka Undangan] button
  // 'arch-video' -> Entrance video animation (starts with arch illustration, then zooms into landscape)
  // 'opened'     -> Invitation fully opened and interactive
  const [openingStage, setOpeningStage] = useState<'cover' | 'arch-video' | 'opened'>('cover');
  const [isVideoExiting, setIsVideoExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Finish animation and go directly into the opened invitation
  const handleFinishAnimation = () => {
    setIsVideoExiting(true);
    setTimeout(() => {
      setOpeningStage('opened');
      setIsVideoExiting(false);
    }, 700);
  };

  // Handle clicking "Buka Undangan": starts audio and triggers entrance animation sequence
  const handleOpen = () => {
    if (music?.music_url && audioRef.current) {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }

    setOpeningStage('arch-video');

    // Video plays arch entrance and zooms through, then transitions directly into the invitation (~5.2s)
    setTimeout(() => {
      setOpeningStage((prev) => {
        if (prev === 'arch-video') {
          handleFinishAnimation();
        }
        return prev;
      });
    }, 5200);
  };

  const isInvitationVisible = openingStage === 'opened' || (openingStage === 'arch-video' && isVideoExiting);

  return (
    <div className="relative min-h-screen">
      {/* Background Audio */}
      {music?.music_url && (
        <audio ref={audioRef} loop>
          <source src={music.music_url} type="audio/mpeg" />
        </audio>
      )}

      {/* Main Invitation Content */}
      <div className={`transition-opacity duration-1000 ${isInvitationVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {(openingStage === 'opened' || openingStage === 'arch-video') && (
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

      {/* 1. Initial Front Cover Modal (Shows only once before clicking "Buka Undangan") */}
      {openingStage === 'cover' && (
        <div className="fixed inset-0 z-50 transition-transform duration-700 ease-in-out">
          {/* Fullscreen Photo Background (Couple Photo) */}
          <div className="absolute inset-0 bg-neutral-950">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
            />
            {/* Subtle contrast gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/55"></div>
          </div>

          {/* Centered Cover Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20 select-none">
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
      )}

      {/* 2. Entrance Animation: Vintage Arch Video (Plays right AFTER clicking "Buka Undangan", then reveals invitation) */}
      {openingStage === 'arch-video' && (
        <div 
          onClick={handleFinishAnimation}
          className={`fixed inset-0 z-50 bg-[#f4efdf] flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-out overflow-hidden select-none ${
            isVideoExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, #faf6ee 0%, #efe7db 100%)'
          }}
        >
          {/* Ambient subtle paper noise pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8c7b6c_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Responsive Video Container: maintains 880:1920 aspect ratio without clipping on any device */}
          <div className="relative w-full h-full max-h-[100dvh] flex items-center justify-center p-0 sm:p-2 md:p-4">
            <video
              ref={videoRef}
              src="/video-cover.mp4"
              poster="/arch-clean.png"
              autoPlay
              playsInline
              muted
              className="w-auto h-full max-h-[100dvh] max-w-full object-contain object-center transition-transform duration-700 md:rounded-2xl md:shadow-[0_20px_60px_rgba(60,40,20,0.22)]"
              style={{
                aspectRatio: '880 / 1920',
              }}
              onEnded={handleFinishAnimation}
            />
          </div>

          {/* Skip Button: Touch-friendly & clear on mobile & desktop */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFinishAnimation();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center gap-1.5 bg-black/45 hover:bg-black/70 active:scale-95 text-white text-xs sm:text-sm px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all duration-200 uppercase tracking-wider font-medium cursor-pointer"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            <span>Lewati</span>
            <span className="text-white/80">✕</span>
          </button>
        </div>
      )}
    </div>
  );
};
