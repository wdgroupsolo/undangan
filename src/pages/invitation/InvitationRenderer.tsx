import React, { useState, useRef } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Disc } from 'lucide-react';
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
  // 'cover'      -> Initial front cover (split on desktop, fullscreen on mobile) with [Buka Undangan] button
  // 'arch-video' -> Entrance video animation (on desktop: right 40% only; on mobile: fullscreen)
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

      {/* 1. Initial Front Cover Modal */}
      {openingStage === 'cover' && (
        <div className="fixed inset-0 z-50 flex flex-col md:flex-row transition-transform duration-700 ease-in-out">
          {/* Desktop Left Side (60% width): Photo with Text Overlay (HIDDEN ON MOBILE) */}
          <div className="hidden md:block md:w-[60%] h-full relative overflow-hidden bg-neutral-950">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Desktop Left Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 text-white z-10 select-none bg-gradient-to-t from-black/75 via-black/35 to-black/50">
              <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 text-gray-200" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Undangan Pernikahan
              </p>
              
              <h1 className="text-5xl lg:text-[4.5rem] xl:text-[5.2rem] mb-3 drop-shadow-lg tracking-wide uppercase leading-tight" style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}>
                <span style={{ fontVariantLigatures: 'common-ligatures' }}>{groom}</span>
                <span className="text-3xl lg:text-5xl mx-3 font-serif font-light italic opacity-90">&amp;</span>
                <span style={{ fontVariantLigatures: 'common-ligatures' }}>{bride}</span>
              </h1>
              
              <p className="font-serif italic text-2xl lg:text-3xl mb-6 opacity-90" style={{ fontFamily: 'Georgia, serif' }}>
                Selamat Datang
              </p>
              
              <p className="text-xs lg:text-sm leading-relaxed text-gray-200 max-w-md mb-8 opacity-90 font-light" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Every Love Story Is Beautiful, But Ours Is The Best One. I Loved Her Since The First Time I Saw Her. My Mother Told Me To Pick The Very Best One, And I Did. True Love Stories Never Have Endings.
              </p>

              <div className="space-y-1">
                <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Kepada Yth.</p>
                <p className="text-xs text-gray-300 font-medium" style={{ fontFamily: "'Montserrat', sans-serif" }}>Bapak/Ibu/Saudara/i:</p>
                <p className="text-xl lg:text-2xl font-bold drop-shadow-md text-white pt-0.5" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                  {guestName}
                </p>
              </div>
            </div>
            {/* Spinning Vinyl Record Icon */}
            <div className="absolute bottom-6 left-6 z-20">
              <div className="w-10 h-10 rounded-full bg-black/45 backdrop-blur-sm flex items-center justify-center animate-spin border border-white/20 shadow-md" style={{ animationDuration: '4s' }}>
                <Disc className="text-white w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Right Panel on Desktop (40%) / Fullscreen on Mobile (100%): Card with Buka Undangan Button */}
          <div 
            className="w-full md:w-[40%] h-full relative flex flex-col items-center justify-center p-6 text-center select-none bg-[#f4efdf] overflow-hidden"
            style={{
              backgroundImage: `radial-gradient(circle at center, rgba(250,246,238,0.92) 0%, rgba(239,231,219,0.95) 100%), url('/bg-floral.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Mobile Only: Fullscreen Couple Photo Background underneath (Left text is hidden) */}
            <div className="md:hidden absolute inset-0 bg-neutral-950 -z-10">
              <img 
                src={coverImage} 
                alt="Cover" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/60"></div>
            </div>

            {/* Title & Couple Names */}
            <p 
              className="text-xs sm:text-sm uppercase tracking-[0.25em] text-white md:text-[#4a3a2a] font-medium drop-shadow-md md:drop-shadow-none mb-2 sm:mb-3"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Undangan Pernikahan
            </p>

            <h1 
              className="text-4xl sm:text-5xl md:text-[3.6rem] text-white md:text-[#3d2e1f] font-normal tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] md:drop-shadow-none mb-6 sm:mb-8 flex items-center justify-center gap-2.5 sm:gap-3.5 uppercase"
              style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}
            >
              <span>{groom}</span>
              <span className="text-3xl sm:text-4xl font-serif font-light italic opacity-90">&amp;</span>
              <span>{bride}</span>
            </h1>
            
            <div className="text-center text-white md:text-[#4a3a2a] mb-6 sm:mb-8 space-y-0.5 sm:space-y-1 drop-shadow-md md:drop-shadow-none">
              <p className="text-xs sm:text-sm font-normal text-white/90 md:text-[#5a4836] tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Kepada Yth.
              </p>
              <p className="text-xs sm:text-sm font-normal text-white/90 md:text-[#5a4836] tracking-wide" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Bapak/Ibu/Saudara/i:
              </p>
              <p className="text-base sm:text-xl font-bold text-white md:text-[#2c1e14] tracking-wide pt-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {guestName}
              </p>
            </div>
            
            <button 
              onClick={handleOpen}
              className="inline-flex items-center gap-2.5 bg-white md:bg-[#3a291a] text-[#3a291a] md:text-white px-6 py-2.5 rounded-full font-semibold text-xs sm:text-sm shadow-[0_4px_20px_rgba(0,0,0,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Mail className="w-4 h-4" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Entrance Animation: Vintage Arch Video */}
      {/* On Desktop: plays ONLY on the right 40% panel, while left 60% shows photo + text */}
      {/* On Mobile: plays 100% FULLSCREEN without left text */}
      {openingStage === 'arch-video' && (
        <div 
          onClick={handleFinishAnimation}
          className={`fixed top-0 right-0 h-full w-full md:w-[40%] md:left-[60%] z-50 bg-[#f4efdf] flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-out overflow-hidden select-none ${
            isVideoExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          }`}
          style={{
            backgroundImage: 'radial-gradient(ellipse at center, #faf6ee 0%, #efe7db 100%)'
          }}
        >
          {/* Ambient subtle paper noise pattern */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#8c7b6c_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Video Container: Fills right 40% panel on desktop, and fills full screen on mobile */}
          <div className="relative w-full h-full max-h-[100dvh] flex items-center justify-center p-0">
            <video
              ref={videoRef}
              src="/video-cover.mp4"
              poster="/arch-clean.png"
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover object-center"
              onEnded={handleFinishAnimation}
            />
          </div>

          {/* Skip Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFinishAnimation();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 inline-flex items-center gap-1.5 bg-black/45 hover:bg-black/70 active:scale-95 text-white text-xs px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all duration-200 uppercase tracking-wider font-medium cursor-pointer"
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
