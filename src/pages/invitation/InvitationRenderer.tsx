import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Disc } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import { editorService } from '../../services/editorService';
import { BaseTheme } from './themes/BaseTheme';
import { LuxuryAnimatedTheme } from './themes/LuxuryAnimatedTheme';
import { SplitFloralTheme } from './themes/SplitFloralTheme';
import { AnimatedFloralTheme } from './themes/AnimatedFloralTheme';
import { WeddingLoadingScreen } from '../../components/WeddingLoadingScreen';

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
  const [isPlaying, setIsPlaying] = useState(false);
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

  const defaultMusicUrl = '/beautiful-in-white.mp3';
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string>(defaultMusicUrl);

  // Update audio source when music data loads or changes
  useEffect(() => {
    if (music?.music_url && music.music_url.trim() !== '') {
      setCurrentAudioSrc(encodeURI(music.music_url.trim()));
    } else {
      setCurrentAudioSrc(defaultMusicUrl);
    }
  }, [music?.music_url]);

  // Ensure audio element reloads buffer whenever source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentAudioSrc]);

  const formatName = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };
  const groom = formatName(couple?.groom_nickname || couple?.groom_name || couple?.groom_full_name) || (slug ? formatName(slug.split('-')[0]) : 'Bagas');
  const bride = formatName(couple?.bride_nickname || couple?.bride_name || couple?.bride_full_name) || (slug ? formatName(slug.split('-')[1]) : 'Siti');

  // Dynamically set page title in browser tab (Called unconditionally before any early returns)
  useEffect(() => {
    if (couple) {
      document.title = `The Wedding of ${groom} & ${bride}`;
    }
  }, [groom, bride, couple]);

  const toggleMusic = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.warn('Audio toggle play blocked or failed:', err);
            // Fallback to default music if custom url failed
            if (currentAudioSrc !== defaultMusicUrl) {
              setCurrentAudioSrc(defaultMusicUrl);
              setTimeout(() => {
                audioRef.current?.play().then(() => setIsPlaying(true)).catch(() => {});
              }, 100);
            }
          });
      }
    }
  };

  if (isLoadingInv || isLoadingCouple) {
    return <WeddingLoadingScreen groomName={groom} brideName={bride} />;
  }

  if (!invitation) {
    return <Navigate to="/404" replace />;
  }

  const coverImage = gallery?.[0]?.image_url || (invitation.theme?.preview_image && !invitation.theme.preview_image.includes('unsplash') ? invitation.theme.preview_image : '/cover-lunar-bg.jpg');

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
    if (audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            console.warn('Initial audio playback prevented by browser:', err);
            // Fallback: unlock audio on next user touch or click anywhere on document
            const unlockAudio = () => {
              if (audioRef.current) {
                audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
              }
              window.removeEventListener('click', unlockAudio);
              window.removeEventListener('touchstart', unlockAudio);
            };
            window.addEventListener('click', unlockAudio, { once: true });
            window.addEventListener('touchstart', unlockAudio, { once: true });
          });
      }
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

  const isSplitTheme = invitation.theme?.slug === 'split-floral';
  const isInvitationVisible = openingStage === 'opened' || (openingStage === 'arch-video' && (isSplitTheme || isVideoExiting));

  return (
    <div className="relative min-h-screen">
      {/* Background Audio */}
      <audio 
        ref={audioRef} 
        src={currentAudioSrc}
        loop 
        preload="auto"
        playsInline
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          console.warn('Audio error with source:', currentAudioSrc);
          if (currentAudioSrc !== defaultMusicUrl) {
            setCurrentAudioSrc(defaultMusicUrl);
          }
        }}
      />

      {/* Vinyl Disc Music Control Button (Stop & Start Audio, Responsive on Mobile & Desktop) */}
      {openingStage !== 'cover' && (
        <button
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Hentikan Lagu' : 'Putar Lagu'}
          title={isPlaying ? 'Hentikan Lagu' : 'Putar Lagu'}
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 md:bottom-7 md:left-7 z-40 group cursor-pointer transition-transform duration-300 hover:scale-110 active:scale-95 focus:outline-none select-none"
        >
          <div 
            className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-black/55 hover:bg-black/75 backdrop-blur-md flex items-center justify-center border border-white/25 shadow-xl transition-all ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Disc className="text-white w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </button>
      )}

      {/* Main Invitation Content */}
      <div className={`transition-opacity duration-1000 ${isInvitationVisible ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
        {(openingStage === 'opened' || openingStage === 'arch-video') && (
          (invitation.theme?.slug === 'animated-luxury' || invitation.theme?.slug === 'elegant-gold' || invitation.theme?.slug === 'navy-luxury') ? (
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
          ) : (invitation.theme?.slug === 'animated-floral' || invitation.theme?.slug === 'floral-romance' || invitation.theme?.slug === 'sakura-blossom') ? (
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

      {/* 1. Initial Front Cover: Fullscreen Cinematic (Desktop & Mobile) */}
      {openingStage === 'cover' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-neutral-950">
          {/* Fullscreen Photo with Cinematic Dark Vignette Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={coverImage} 
              alt="Cover" 
              className="w-full h-full object-cover object-center scale-105"
            />
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/60" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%)]" />
          </div>

          {/* Centered Content: Clean, High Luxury Typography, No Duplicates */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 sm:px-10 max-w-2xl mx-auto py-8 text-white">
            {/* Subtitle */}
            <p 
              className="text-xs sm:text-sm uppercase tracking-[0.35em] text-gray-200 font-medium mb-3 sm:mb-4 drop-shadow-md"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              Undangan Pernikahan
            </p>

            {/* Couple Names */}
            <h1 
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.2rem] text-white font-normal tracking-wide drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] mb-6 sm:mb-8 flex items-center justify-center gap-2 sm:gap-4 uppercase leading-none flex-wrap"
              style={{ fontFamily: '"Cinzel Decorative", Georgia, serif' }}
            >
              <span style={{ fontVariantLigatures: 'common-ligatures' }}>{groom}</span>
              <span className="text-2xl sm:text-4xl md:text-5xl font-serif font-light italic opacity-90 mx-1">&amp;</span>
              <span style={{ fontVariantLigatures: 'common-ligatures' }}>{bride}</span>
            </h1>

            {/* Recipient Glass Card */}
            <div className="backdrop-blur-md bg-black/30 border border-white/20 rounded-2xl px-6 sm:px-10 py-4 sm:py-5 max-w-sm w-full mx-auto mb-7 sm:mb-9 shadow-2xl space-y-1">
              <p className="text-xs sm:text-sm font-normal text-gray-300 tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Kepada Yth.
              </p>
              <p className="text-xs sm:text-sm font-normal text-gray-300 tracking-wider" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Bapak/Ibu/Saudara/i:
              </p>
              <p className="text-lg sm:text-2xl font-bold text-white tracking-wide pt-0.5 drop-shadow-md" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                {guestName}
              </p>
            </div>

            {/* Buka Undangan Button */}
            <button 
              onClick={handleOpen}
              className="group inline-flex items-center gap-2.5 sm:gap-3 bg-white hover:bg-[#f8f5ee] text-[#3a291a] px-8 sm:px-10 py-3.5 sm:py-4 rounded-full font-semibold text-xs sm:text-sm md:text-base shadow-[0_8px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_40px_rgba(255,255,255,0.25)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{ fontFamily: "'Montserrat', sans-serif" }}
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-[#3a291a] group-hover:scale-110 transition-transform duration-200" />
              <span>Buka Undangan</span>
            </button>
          </div>
        </div>
      )}

      {/* 2. Entrance Animation: Vintage Arch Video */}
      {/* On Desktop: plays ONLY on the right 42% panel, while left 58% shows photo + text */}
      {/* On Mobile & Tablet: plays 100% FULLSCREEN without left text */}
      {openingStage === 'arch-video' && (
        <div 
          onClick={handleFinishAnimation}
          className={`fixed top-0 right-0 h-full ${
            isSplitTheme ? 'w-full lg:w-[42%] lg:left-[58%]' : 'w-full inset-0'
          } z-50 bg-[#f4efdf] flex items-center justify-center cursor-pointer transition-opacity duration-700 ease-out overflow-hidden select-none ${
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
        </div>
      )}
    </div>
  );
};
