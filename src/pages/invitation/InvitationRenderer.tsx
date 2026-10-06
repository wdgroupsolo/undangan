import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Disc, Sparkles, MailOpen, Crown, Play, Pause } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import { editorService, COUPLE_AGNI_PUTRI } from '../../services/editorService';
import { BaseTheme } from './themes/BaseTheme';
import { LuxuryAnimatedTheme } from './themes/LuxuryAnimatedTheme';
import { SplitFloralTheme } from './themes/SplitFloralTheme';
import { AnimatedFloralTheme } from './themes/AnimatedFloralTheme';
import { SecretGardenTheme } from './themes/SecretGardenTheme';
import { RoyalEleganceTheme } from './themes/RoyalEleganceTheme';
import { MaroonGoldTheme, CardCornerFlourish, GoldSparkles, WaxSealBadge } from './themes/MaroonGoldTheme';
import { JavaneseHeritageTheme, JavaneseMonogram, JavanesePetals, RoyalGoldCorner, FloatingGoldenDust } from './themes/JavaneseHeritageTheme';
import { 
  RoyalWayangGoldTheme, 
  GoldenSparkleDust 
} from './themes/RoyalWayangGoldTheme';
import { WeddingLoadingScreen } from '../../components/WeddingLoadingScreen';

export const InvitationRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const rawTo = searchParams.get('to');
  const requestedTheme = searchParams.get('theme');

  // Opening sequence states:
  // 'cover'      -> Initial front cover (split on desktop, fullscreen on mobile) with [Buka Undangan] button
  // 'arch-video' -> Entrance video animation (for Javanese Heritage, Maroon Gold, etc.)
  // 'opened'     -> Full interactive wedding invitation
  const isDirectOpened = searchParams.get('opened') === 'true';
  const [openingStage, setOpeningStage] = useState<'cover' | 'arch-video' | 'opened'>(isDirectOpened ? 'opened' : 'cover');
  const [isVideoExiting, setIsVideoExiting] = useState(false);
  const [isCoverExiting, setIsCoverExiting] = useState(false);
  const [canSkipVideo, setCanSkipVideo] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const animTimeoutRef = useRef<any>(null);

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

  const rawSlug = decodeURIComponent(slug || '').toLowerCase().trim();
  const isAgniSlug = rawSlug.includes('agni') || rawSlug.includes('kribo');

  const activeThemeSlug = requestedTheme || (
    isAgniSlug
      ? 'royal-wayang-gold'
      : ((slug === 'benny-indah' || slug === 'steven-bunga')
        ? 'royal-wayang-gold' 
        : (slug === 'habib-adiba' 
          ? 'javanese-heritage' 
          : ((invitation?.settings as any)?.theme_slug || invitation?.theme?.slug || 'royal-wayang-gold')))
  );

  const getThemeDefaultMusic = (themeSlug?: string) => {
    switch (themeSlug) {
      case 'royal-wayang-gold':
      case 'royal-wayang':
      case 'joglo-wayang':
      case 'javanese-heritage':
      case 'jawa-klasik':
      case 'borobudur':
        return '/music/bergema-sampai-selamanya.mp3';
      case 'maroon-gold':
        return '/music/maroon-gold-canon.mp3';
      case 'secret-garden':
        return '/music/secret-garden.mp3';
      case 'split-floral':
      default:
        return '/beautiful-in-white.mp3';
    }
  };

  const defaultMusicUrl = getThemeDefaultMusic(activeThemeSlug);
  const [currentAudioSrc, setCurrentAudioSrc] = useState<string>(defaultMusicUrl);

  useEffect(() => {
    if (music?.music_url && music.music_url.trim() !== '' && music.music_url !== '/beautiful-in-white.mp3') {
      setCurrentAudioSrc(encodeURI(music.music_url.trim()));
    } else {
      setCurrentAudioSrc(defaultMusicUrl);
    }
  }, [music?.music_url, defaultMusicUrl]);

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

  // Instant local cache for zero-latency name display on first paint & loading screen
  const cachedCouple = (() => {
    try {
      const saved = localStorage.getItem(`wd_couple_${slug}`);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  })();

  // Keep cache synchronized whenever couple query returns fresh data
  useEffect(() => {
    if (couple && (couple.groom_full_name || couple.groom_nickname)) {
      try {
        localStorage.setItem(`wd_couple_${slug}`, JSON.stringify({
          groom_full_name: couple.groom_full_name,
          groom_nickname: couple.groom_nickname,
          bride_full_name: couple.bride_full_name,
          bride_nickname: couple.bride_nickname,
        }));
      } catch {}
    }
  }, [couple, slug]);

  const activeCouple = couple || cachedCouple || (isAgniSlug ? COUPLE_AGNI_PUTRI : null);

  const rawGroomNick = activeCouple?.groom_nickname?.trim();
  const rawGroomFull = activeCouple?.groom_full_name?.trim();
  const groom = isAgniSlug ? 'Agni' : (
    (rawGroomNick && (!rawGroomFull || (rawGroomNick.toLowerCase() !== 'bagas' || rawGroomFull.toLowerCase() === 'bagas')))
      ? formatName(rawGroomNick)
      : (rawGroomFull ? formatName(rawGroomFull.split(/\s+/)[0]) : (rawGroomNick && rawGroomNick.toLowerCase() !== 'bagas' ? formatName(rawGroomNick) : 'Steven'))
  );

  const rawBrideNick = activeCouple?.bride_nickname?.trim();
  const rawBrideFull = activeCouple?.bride_full_name?.trim();
  const bride = isAgniSlug ? 'Putri' : (
    (rawBrideNick && (!rawBrideFull || (rawBrideNick.toLowerCase() !== 'siti' || rawBrideFull.toLowerCase() === 'siti')))
      ? formatName(rawBrideNick)
      : (rawBrideFull ? formatName(rawBrideFull.split(/\s+/)[0]) : (rawBrideNick && rawBrideNick.toLowerCase() !== 'siti' ? formatName(rawBrideNick) : 'Bunga'))
  );

  // Dynamically set page title in browser tab (Called unconditionally before any early returns)
  useEffect(() => {
    if (couple) {
      document.title = `The Wedding of ${groom} & ${bride}`;
    }
  }, [groom, bride, couple]);

  // Completely hide browser scrollbar on invitation view while preserving smooth scrolling
  useEffect(() => {
    document.documentElement.classList.add('no-scrollbar');
    document.body.classList.add('no-scrollbar');
    return () => {
      document.documentElement.classList.remove('no-scrollbar');
      document.body.classList.remove('no-scrollbar');
    };
  }, []);

  // Prevent background scrolling while front cover or entrance animation is active
  useEffect(() => {
    if (openingStage !== 'opened') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [openingStage]);

  // Coordinate background music with interactive video elements (e.g. video greeting)
  useEffect(() => {
    const handlePauseBgm = () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    const handleResumeBgm = () => {
      if (audioRef.current && audioRef.current.paused && openingStage === 'opened') {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    const handleStartBgm = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener('wedding:play-bgm', handleStartBgm);
    window.addEventListener('wedding:pause-bgm', handlePauseBgm);
    window.addEventListener('wedding:resume-bgm', handleResumeBgm);
    return () => {
      window.removeEventListener('wedding:play-bgm', handleStartBgm);
      window.removeEventListener('wedding:pause-bgm', handlePauseBgm);
      window.removeEventListener('wedding:resume-bgm', handleResumeBgm);
    };
  }, [openingStage]);

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

  const isRoyalWayang = activeThemeSlug === 'royal-wayang-gold' || activeThemeSlug === 'royal-wayang' || activeThemeSlug === 'joglo-wayang' || slug === 'benny-indah' || slug === 'steven-bunga' || isAgniSlug;
  const isSecretGarden = activeThemeSlug === 'secret-garden';
  const isRoyalElegance = activeThemeSlug === 'royal-elegance';
  const isMaroonGold = activeThemeSlug === 'maroon-gold';
  const isJavaneseHeritage = activeThemeSlug === 'javanese-heritage' || activeThemeSlug === 'jawa-klasik' || activeThemeSlug === 'borobudur';
  const isSplitTheme = activeThemeSlug === 'split-floral' || isSecretGarden || isMaroonGold || isJavaneseHeritage || isRoyalWayang;

  const groomDisplayName = isAgniSlug ? 'Agni' : (groom || 'Steven');
  const brideDisplayName = isAgniSlug ? 'Putri' : (bride || 'Bunga');

  const guestName = (rawTo && rawTo.trim() !== '') 
    ? rawTo.trim() 
    : (invitation?.settings?.default_guest_name?.trim() || 'Tamu Undangan');

  const coverImage = 
    (isAgniSlug ? '/themes/agni-putri/couple-arch.jpg' : null) ||
    invitation?.settings?.cover_photo ||
    couple?.cover_photo_url || 
    couple?.cover_photo ||
    invitation?.cover_image_url || 
    gallery?.[0]?.image_url || 
    (isRoyalWayang ? '/photos/photo-3.jpg' : isMaroonGold ? '/photos/photo-3.jpg' : (invitation?.theme?.preview_image && !invitation.theme.preview_image.includes('unsplash') ? invitation.theme.preview_image : '/cover-lunar-bg.jpg'));

  const entranceVideoSrc = isRoyalWayang
    ? '/themes/royal-wayang-portal-zoom.mp4'
    : isJavaneseHeritage
      ? '/themes/javanese-heritage-entrance.mp4'
      : isSecretGarden
        ? '/themes/secret-garden/assets/video.mp4'
        : isMaroonGold
          ? '/maroon-gate-entrance.mp4'
          : '/video-cover.mp4';

  // Finish animation and go directly into the opened invitation
  const handleFinishAnimation = () => {
    if (animTimeoutRef.current) {
      clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    setIsVideoExiting(true);
    setTimeout(() => {
      setOpeningStage('opened');
      setIsVideoExiting(false);
      setCanSkipVideo(false);
    }, 1000);
  };

  // Handle clicking "Buka Undangan": starts audio and triggers entrance animation sequence
  const handleOpen = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }

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

    if (isRoyalWayang) {
      // Authentic Royal Portal 3D Zoom entrance video animation matching user's reference
      setCanSkipVideo(false);
      setOpeningStage('arch-video');

      // Allow skip after 1.2s delay
      setTimeout(() => {
        setCanSkipVideo(true);
      }, 1200);

      // Trigger video playback immediately
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch(err => console.warn('Video play error:', err));
        }
      }, 40);

      // Fallback timeout in case onTimeUpdate doesn't fire
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        setOpeningStage((prev) => {
          if (prev === 'arch-video') {
            handleFinishAnimation();
          }
          return prev;
        });
      }, 3700);
      return;
    }

    // Reset skip guard so initial button click/tap cannot dismiss the video prematurely
    setCanSkipVideo(false);
    setOpeningStage('arch-video');

    // Allow skip ONLY after 1.5s delay to prevent accidental tap/click-through from "Buka Undangan"
    setTimeout(() => {
      setCanSkipVideo(true);
    }, 1500);

    // Trigger video playback immediately on user interaction
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(err => console.warn('Video play error:', err));
      }
    }, 50);

    // Entrance animation duration: ~18.2s for javanese-heritage, ~10.2s for maroon-gold gate video, ~5.2s for others
    const timeoutDuration = isJavaneseHeritage ? 18200 : isMaroonGold ? 10200 : 5200;
    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
    animTimeoutRef.current = setTimeout(() => {
      setOpeningStage((prev) => {
        if (prev === 'arch-video') {
          handleFinishAnimation();
        }
        return prev;
      });
    }, timeoutDuration);
  };

  const isInvitationVisible = openingStage === 'opened' || (openingStage === 'arch-video' && isVideoExiting);

  return (
    <div className="relative min-h-screen no-scrollbar overflow-x-clip">
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

      {/* Audio Control Button (Top-Right pause icon for Royal Wayang matching screenshot 2, Vinyl Disc for others) */}
      {(openingStage !== 'cover' || ((isJavaneseHeritage || isRoyalWayang) && isPlaying)) && (
        <button
          onClick={toggleMusic}
          aria-label="Toggle Background Music"
          className={`fixed z-50 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
            isRoyalWayang 
              ? 'top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 bg-white/20 hover:bg-white/35 backdrop-blur-md border border-white/50 text-white hover:scale-110 active:scale-95'
              : 'bottom-6 right-6 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/20 text-white hover:scale-110 active:scale-95'
          }`}
        >
          {isRoyalWayang ? (
            isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            )
          ) : (
            <Disc 
              className={`w-6 h-6 text-white group-hover:text-primary-300 transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
              style={{ animationDuration: '4s' }}
            />
          )}
        </button>
      )}

      {/* Main Invitation Content */}
      <div className={
        isSplitTheme
          ? 'w-full min-h-screen opacity-100'
          : `transition-opacity duration-700 ease-out ${
              isInvitationVisible || isCoverExiting
                ? 'opacity-100' 
                : 'opacity-0 pointer-events-none'
            }`
      }>
        {(isSplitTheme || isInvitationVisible || isCoverExiting || openingStage === 'arch-video') && (
          isRoyalWayang ? (
            <RoyalWayangGoldTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isJavaneseHeritage ? (
            <JavaneseHeritageTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isRoyalElegance ? (
            <RoyalEleganceTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isMaroonGold ? (
            <MaroonGoldTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isSecretGarden ? (
            <SecretGardenTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (activeThemeSlug === 'animated-luxury' || activeThemeSlug === 'elegant-gold' || activeThemeSlug === 'navy-luxury') ? (
            <LuxuryAnimatedTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : activeThemeSlug === 'split-floral' ? (
            <SplitFloralTheme 
              invitation={invitation}
              couple={couple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (activeThemeSlug === 'animated-floral' || activeThemeSlug === 'floral-romance' || activeThemeSlug === 'sakura-blossom') ? (
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

      {/* 1. Initial Front Cover: Right 42% Panel on Desktop, Fullscreen on Mobile */}
      {/* 1. Initial Front Cover: Right 42% Panel on Desktop, Fullscreen on Mobile */}
      {openingStage === 'cover' && (
        isRoyalWayang ? (
          /* Royal Wayang Gold Cover - Split Desktop Card (Right 42% on Desktop, 100% on Mobile) */
          <div 
            className="fixed top-0 right-0 h-full w-full lg:w-[42%] z-50 flex items-center justify-center overflow-hidden select-none shadow-[-15px_0_50px_rgba(0,0,0,0.85)] border-l border-amber-500/25 bg-[#0e0a08]"
          >
            <style>{`
              @keyframes royal-pulse-btn {
                0%, 100% {
                  transform: scale(1);
                  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.45);
                }
                50% {
                  transform: scale(1.03);
                  box-shadow: 0 6px 30px rgba(212, 175, 55, 0.75);
                }
              }
              @keyframes royal-crown-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
            `}</style>

            {/* Ambient Wide Screen Backdrop */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              <img 
                src="/themes/royal-wayang-bg.jpg" 
                alt="Joglo Ambience" 
                className="w-full h-full object-cover object-center filter blur-xl brightness-[0.35] contrast-[1.1] scale-110"
              />
              <div className="absolute inset-0 bg-radial from-transparent via-[#080503]/70 to-[#080503]" />
            </div>

            {/* Centered 9:16 Portrait Canvas (Framed with Double Gold Hairline Border on Desktop) */}
            <div className="relative z-10 h-full max-h-[100dvh] aspect-[9/16] w-full max-w-[430px] flex flex-col justify-between items-center text-center px-4 py-4 sm:py-5 overflow-hidden sm:rounded-[28px] sm:border-2 sm:border-[#d4af37]/60 sm:ring-1 sm:ring-[#ffe58f]/30 sm:shadow-[0_25px_80px_rgba(0,0,0,0.95),_0_0_50px_rgba(212,175,55,0.25)] sm:my-auto sm:max-h-[96vh]">
              
              {/* Background Joglo Pendopo Artwork with Rich Atmospheric Lighting */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img 
                  src="/themes/royal-wayang-bg.jpg" 
                  alt="Pendopo Joglo Malam" 
                  className="w-full h-full object-cover object-top filter brightness-[0.62] contrast-[1.05]"
                />
                {/* Deep Rich Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#080503]/85 via-transparent to-[#080503]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080503] via-[#080503]/80 via-35% to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.12)_0%,_transparent_70%)]" />
              </div>

              {/* Ambient Floating Golden Sparkles */}
              <div className="absolute inset-0 pointer-events-none z-10">
                <GoldenSparkleDust />
              </div>

              {/* Luxury Corner Bronze-Gold Peonies Flourishes */}
              <div className="absolute top-0 left-0 w-20 sm:w-24 h-auto pointer-events-none z-20 opacity-80 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-auto pointer-events-none z-20 opacity-80 filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
              </div>

              {/* UPPER SECTION: Mahkota Crown & Architectural Royal Arched Medallion Card */}
              <div className="relative z-20 w-full flex flex-col items-center pt-1 sm:pt-2">
                {/* Royal Keraton Crown */}
                <div className="mb-0.5 pointer-events-none z-30" style={{ animation: 'royal-crown-float 4s ease-in-out infinite' }}>
                  <img 
                    src="/themes/royal-crown-luxury.png" 
                    alt="Mahkota Keraton" 
                    className="w-18 sm:w-22 h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(212,175,55,0.6)]" 
                  />
                </div>

                {/* Arched Medallion Card Container */}
                <div className="relative w-full max-w-[86%] sm:max-w-[84%] mx-auto rounded-t-[90px] sm:rounded-t-[110px] rounded-b-2xl bg-gradient-to-b from-[#1c120a]/94 via-[#120a06]/96 to-[#090604]/98 backdrop-blur-md border border-[#d4af37]/65 shadow-[0_16px_40px_rgba(0,0,0,0.9),_0_0_25px_rgba(212,175,55,0.18)] p-2 sm:p-2.5 flex flex-col items-center overflow-hidden">
                  {/* Delicate Inset Gold Hairline Frame */}
                  <div className="absolute inset-1.5 rounded-t-[84px] sm:rounded-t-[102px] rounded-b-xl border border-[#d4af37]/35 pointer-events-none z-20" />

                  {/* Arched Couple Photo Container */}
                  <div className="w-full aspect-[16/11] rounded-t-[80px] sm:rounded-t-[98px] rounded-b-lg overflow-hidden border border-[#d4af37]/50 shadow-inner bg-black/50 relative z-10">
                    <img 
                      src={coverImage} 
                      alt={`${groomDisplayName} & ${brideDisplayName}`} 
                      className="w-full h-full object-cover object-[center_22%] filter brightness-[0.98] contrast-[1.04]"
                    />
                    {/* Inner subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120a06]/70 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Subtitle: The Wedding Of */}
                  <p 
                    className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.3em] text-[#e6cfab] font-serif font-semibold mt-2 mb-0.5 drop-shadow-sm"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    THE WEDDING OF
                  </p>

                  {/* Couple Names in Opulent Gold Foil Gradient */}
                  <h1 
                    className="text-lg sm:text-xl font-serif tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] my-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {groomDisplayName} <span className="font-light italic text-[#ffd778] mx-0.5">&amp;</span> {brideDisplayName}
                  </h1>

                  {/* Royal Date Line */}
                  <div className="flex items-center justify-center gap-2 mt-0.5 w-full max-w-[200px]">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                    <span className="text-[9.5px] sm:text-[10px] tracking-[0.16em] text-[#f5dfa8]/90 font-serif font-medium whitespace-nowrap drop-shadow-sm">
                      {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sabtu, 28 November 2026'}
                    </span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                  </div>
                </div>
              </div>

              {/* MIDDLE SECTION: Luxury Guest Invitation Placard (Kartu Tamu Terhormat) */}
              <div className="relative z-20 w-full max-w-[84%] sm:max-w-[80%] mx-auto my-auto py-2 px-3.5 sm:py-2.5 sm:px-4 rounded-xl bg-gradient-to-b from-[#1c120a]/92 via-[#140c07]/95 to-[#0b0604]/96 border border-[#d4af37]/55 shadow-[0_10px_28px_rgba(0,0,0,0.9)] backdrop-blur-md relative overflow-hidden flex flex-col items-center">
                {/* Inset Hairline Frame */}
                <div className="absolute inset-1 rounded-lg border border-[#d4af37]/25 pointer-events-none" />

                <p 
                  className="text-[9px] sm:text-[9.5px] uppercase tracking-[0.24em] text-[#dfca9e] font-serif font-semibold drop-shadow-sm"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                >
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>

                <p 
                  className="text-sm sm:text-base font-serif font-bold text-white tracking-wide my-0.5 sm:my-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)] line-clamp-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {guestName}
                </p>

                <p 
                  className="text-[9.5px] sm:text-[10px] text-[#f5dfa8]/80 font-serif italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Di Tempat
                </p>

                <p className="text-[8px] sm:text-[8.5px] text-[#c9b58c]/60 font-serif italic mt-0.5">
                  *Mohon maaf apabila ada kesalahan penulisan nama/gelar
                </p>
              </div>

              {/* BOTTOM SECTION: Real Luxury Wayang Guardians & Opulent Gold CTA Button */}
              <div className="relative z-20 w-full flex flex-col items-center mt-2 sm:mt-3 pb-3.5 sm:pb-5">
                
                {/* Authentic Carved Prada Wayang Figures */}
                <div className="absolute -bottom-0.5 sm:bottom-0 left-0 sm:left-1 w-13 sm:w-16 pointer-events-none z-20 drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)] opacity-95 transition-transform duration-500 hover:scale-105">
                  <img 
                    src="/themes/royal-kamajaya-luxury.png" 
                    alt="Raden Kamajaya" 
                    className="w-full h-auto object-contain" 
                  />
                </div>
                <div className="absolute -bottom-0.5 sm:bottom-0 right-0 sm:right-1 w-13 sm:w-16 pointer-events-none z-20 drop-shadow-[0_6px_18px_rgba(0,0,0,0.95)] opacity-95 transition-transform duration-500 hover:scale-105">
                  <img 
                    src="/themes/royal-kamaratih-luxury.png" 
                    alt="Dewi Kamaratih" 
                    className="w-full h-auto object-contain -scale-x-100" 
                  />
                </div>

                {/* Opulent Gold "Buka Undangan" Button */}
                <button
                  onClick={handleOpen}
                  className="group relative flex items-center justify-center gap-2 px-6 sm:px-7 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7df8f] to-[#d4af37] text-stone-950 font-serif font-bold text-xs tracking-[0.2em] uppercase border border-[#fff4c2] shadow-[0_4px_22px_rgba(212,175,55,0.5)] hover:shadow-[0_6px_30px_rgba(212,175,55,0.75)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-30"
                  style={{ animation: 'royal-pulse-btn 3s ease-in-out infinite' }}
                >
                  <Mail className="w-3.5 h-3.5 text-stone-950" />
                  <span 
                    className="text-xs sm:text-[12.5px] font-serif font-bold text-stone-950 tracking-[0.2em] uppercase drop-shadow-sm"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Buka Undangan
                  </span>
                </button>
              </div>

            </div>
          </div>
        ) : isJavaneseHeritage ? (
          /* Javanese Heritage Cover matching media_1790532676505.png */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#24090d]">
            {/* Inline Keyframes for Cover */}
            <style>{`
              @keyframes javanese-petal-float {
                0% {
                  transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
                  opacity: 0.3;
                }
                50% {
                  transform: translate3d(8px, -18px, 0) rotate(20deg) scale(1.1);
                  opacity: 0.85;
                }
                100% {
                  transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
                  opacity: 0.3;
                }
              }

              @keyframes shimmer-sweep-gold {
                0% {
                  transform: translateX(-150%) skewX(-20deg);
                }
                100% {
                  transform: translateX(250%) skewX(-20deg);
                }
              }
            `}</style>

            {/* Desktop Panoramic Backdrop */}
            <div className="absolute inset-0 z-0">
              <img 
                src="/themes/javanese-heritage-desktop.jpg" 
                alt="Borobudur Heritage Landscape" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#24090d] via-transparent to-black/60" />
            </div>

            {/* Ambient Petals */}
            <JavanesePetals count={10} />

            {/* Centered Mobile/Portrait Invitation Card (100% on mobile, max-w-[410px] on desktop) */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[410px] sm:min-h-[620px] sm:max-h-[92vh] sm:rounded-[28px] overflow-hidden flex flex-col items-center justify-center text-center p-4 sm:p-7 bg-[#fbf7f0] shadow-[0_25px_70px_rgba(48,17,20,0.5),_0_0_35px_rgba(212,175,55,0.3)] sm:border-[2.5px] sm:border-[#d4af37] sm:ring-1 sm:ring-[#c5a880]/50 sm:ring-offset-2 sm:ring-offset-[#fbf7f0]">
              
              {/* Card Background: Authentic Gunungan Wayang & Vintage Floral Frame */}
              <img 
                src="/themes/javanese-cover-poster.jpg" 
                alt="Javanese Heritage Background" 
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />
              
              {/* Soft radial parchment veil to soften background and enhance contrast */}
              <div className="absolute inset-0 bg-radial from-[#ffffff]/75 via-[#fdf9f2]/40 to-transparent pointer-events-none" />

              {/* Royal 24K Gold Filigree Corners */}
              <RoyalGoldCorner className="absolute top-2.5 left-2.5 w-10 h-10 pointer-events-none opacity-80 z-20" flip="top-left" />
              <RoyalGoldCorner className="absolute top-2.5 right-2.5 w-10 h-10 pointer-events-none opacity-80 z-20" flip="top-right" />
              <RoyalGoldCorner className="absolute bottom-2.5 left-2.5 w-10 h-10 pointer-events-none opacity-80 z-20" flip="bottom-left" />
              <RoyalGoldCorner className="absolute bottom-2.5 right-2.5 w-10 h-10 pointer-events-none opacity-80 z-20" flip="bottom-right" />

              {/* Floating Golden Dust Particles */}
              <FloatingGoldenDust count={8} />

              {/* ========================================================================= */}
              {/* UNIFIED CENTERED INVITATION CONTENT (Optically Centered on Mobile & Desktop) */}
              {/* ========================================================================= */}
              <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-[325px] mx-auto gap-3 sm:gap-3.5 py-1">
                
                {/* 1. CENTRAL ROYAL IVORY SILK CARTOUCHE */}
                <div className="w-full rounded-3xl bg-gradient-to-b from-[#ffffff]/95 via-[#fdfbf7]/92 to-[#f6ede0]/95 backdrop-blur-[8px] border-[1.5px] border-[#d4af37] shadow-[0_10px_35px_rgba(92,19,28,0.22),_0_0_20px_rgba(212,175,55,0.25)] p-4 sm:p-5 flex flex-col items-center text-center">
                  
                  {/* Monogram in Royal Gold Medallion Ring */}
                  <div className="relative mb-2 flex items-center justify-center">
                    <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full border-[1.5px] border-[#d4af37] bg-gradient-to-b from-[#fffbf2] to-[#f5ebd8] shadow-[0_2px_10px_rgba(212,175,55,0.35)] flex items-center justify-center p-1 overflow-hidden">
                      <JavaneseMonogram initials="SB" className="scale-75" />
                    </div>
                  </div>

                  {/* PERNIKAHAN */}
                  <p 
                    className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#7c1d29] font-serif font-bold text-center drop-shadow-xs mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    PERNIKAHAN
                  </p>

                  {/* STEVEN & BUNGA (Crisp, Single-Line, Optically Centered) */}
                  <h1 
                    className="text-[22px] xs:text-[25px] sm:text-[28px] leading-tight text-[#4e0e16] font-normal tracking-[0.04em] whitespace-nowrap text-center drop-shadow-xs font-serif my-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {groomDisplayName.toUpperCase()} <span className="font-light italic text-[#8c2530] mx-1">&amp;</span> {brideDisplayName.toUpperCase()}
                  </h1>

                  {/* Traditional Gold Filigree Divider with Event Date */}
                  <div className="flex items-center justify-center gap-2 mt-1.5 w-full max-w-[210px]">
                    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                    <p 
                      className="text-[10px] sm:text-[11px] tracking-[0.12em] text-[#6a1a24] font-serif font-semibold text-center whitespace-nowrap"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      28 Desember 2025
                    </p>
                    <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                  </div>

                </div>

                {/* 2. RECIPIENT GUEST PLAQUE */}
                <div className="w-full max-w-[290px] rounded-2xl bg-gradient-to-b from-[#ffffff]/94 to-[#fdf9f2]/90 backdrop-blur-[6px] border border-[#d4af37]/80 shadow-[0_4px_16px_rgba(92,19,28,0.14)] py-2.5 px-4 text-center">
                  <p className="text-[10px] sm:text-[11px] tracking-[0.18em] uppercase text-[#7c1d29] font-serif font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i :
                  </p>
                  <p className="text-sm sm:text-base font-serif font-bold text-[#3d1117] tracking-wide mt-0.5 line-clamp-1">
                    {guestName}
                  </p>
                </div>

                {/* 3. BUKA UNDANGAN BUTTON */}
                <div className="w-full max-w-[290px]">
                  <button
                    onClick={handleOpen}
                    className="group relative w-full overflow-hidden rounded-full py-3 px-8 shadow-[0_8px_25px_rgba(92,19,28,0.48),_0_0_22px_rgba(212,175,55,0.38)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#6e131d] via-[#8c2530] to-[#550c14] border-[1.5px] border-[#d4af37]"
                  >
                    <div 
                      className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                      style={{ animation: 'shimmer-sweep-gold 2.4s ease-in-out infinite' }}
                    />
                    <div className="relative flex items-center justify-center gap-2">
                      <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#fff6e6] drop-shadow-sm">
                        BUKA UNDANGAN
                      </span>
                      <Sparkles className="w-4 h-4 text-[#ffd778] animate-pulse" />
                    </div>
                  </button>
                </div>

              </div>

            </div>
          </div>
        ) : isMaroonGold ? (
          /* Royal Maroon & Gold Grand Luxury Cover */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#1a0407]">
            {/* Inline Keyframes for Shimmer & Royal Glow */}
            <style>{`
              @keyframes royal-shimmer-sweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                100% { transform: translateX(250%) skewX(-20deg); }
              }
              @keyframes royal-pulse-glow {
                0%, 100% { 
                  box-shadow: 0 0 15px rgba(212, 175, 55, 0.35), 0 8px 30px rgba(117, 16, 28, 0.55); 
                }
                50% { 
                  box-shadow: 0 0 30px rgba(212, 175, 55, 0.65), 0 12px 42px rgba(117, 16, 28, 0.75); 
                }
              }
            `}</style>

            {/* Desktop Panoramic Backdrop with Dark Damask & Velvet Ambience */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Maroon Gold Landscape" 
                className="w-full h-full object-cover object-center scale-105 filter blur-[3px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#140204]/95 via-[#29050b]/88 to-[#140204]/95" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#1a0407]/65 to-[#0b0103]" />
            </div>

            {/* Ambient Floating Golden Sparkles */}
            <GoldSparkles count={14} className="z-1" />

            {/* Centered Luxury Portrait Invitation Card (100% on Mobile, max-w-[420px] on Desktop) */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[660px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-5 sm:p-7 bg-[#230508] shadow-[0_25px_80px_rgba(0,0,0,0.85),_0_0_45px_rgba(212,175,55,0.3)] sm:border-[2.5px] sm:border-[#d4af37]/85 sm:ring-1 sm:ring-[#f3da9f]/40 sm:ring-offset-2 sm:ring-offset-[#180306]">
              
              {/* Card Photo Backdrop with Radial & Bottom Vignette */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src={coverImage} 
                  alt="Couple Cover" 
                  className="w-full h-full object-cover object-center scale-105"
                />
                {/* Deep Royal Burgundy Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#230508] via-[#230508]/80 via-50% to-black/40" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#230508]/50 to-[#230508]/95" />
              </div>

              {/* Victorian Royal Gold Filigree Corners */}
              <CardCornerFlourish />

              {/* Subtle Gold Inset Arched Frame Line */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-[28px] sm:rounded-[30px] border border-[#d4af37]/40 pointer-events-none z-10" />

              {/* TOP HEADER: Wax Seal & Royal Monogram */}
              <div className="relative z-20 flex flex-col items-center pt-2 sm:pt-3">
                <WaxSealBadge monogram={`${groomDisplayName[0] || 'S'}${brideDisplayName[0] || 'B'}`.toUpperCase()} />
                
                <div className="flex items-center justify-center gap-1.5 mt-1 text-[#f3da9f]">
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                  <p 
                    className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#f3da9f] font-serif font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    THE WEDDING OF
                  </p>
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* CENTER: Couple Names & Wedding Date */}
              <div className="relative z-20 flex flex-col items-center my-auto py-2 w-full max-w-[340px]">
                <h1 
                  className="text-3xl sm:text-4xl lg:text-[40px] leading-tight text-white font-normal tracking-[0.03em] text-center drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] my-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {groomDisplayName} <span className="italic font-light text-[#f3da9f] mx-1">&amp;</span> {brideDisplayName}
                </h1>

                {/* Royal Gold Line Divider with Event Date */}
                <div className="flex items-center justify-center gap-2 mt-2 w-full max-w-[240px]">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                  <p 
                    className="text-[11px] sm:text-xs tracking-[0.15em] text-[#f5dfa8] font-serif font-medium whitespace-nowrap drop-shadow-sm"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '25 Oktober 2026'}
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                </div>
              </div>

              {/* BOTTOM: Recipient Guest Card & BUKA UNDANGAN Button */}
              <div className="relative z-20 flex flex-col items-center w-full max-w-[330px] gap-3 pb-2 sm:pb-3">
                {/* Royal Recipient Cartouche */}
                <div className="w-full rounded-2xl bg-gradient-to-b from-[#3a0a10]/85 via-[#2b070c]/90 to-[#1d0407]/95 backdrop-blur-md border border-[#d4af37]/65 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] py-2.5 px-4 text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#e2b96f] font-serif font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i :
                  </p>
                  <p className="text-base sm:text-lg font-serif font-bold text-white tracking-wide mt-0.5 line-clamp-1 drop-shadow-sm">
                    {guestName}
                  </p>
                </div>

                {/* Buka Undangan Royal Button */}
                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_35px_rgba(128,20,31,0.65),_0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#7a121d] via-[#a82433] to-[#610c15] border-[1.5px] border-[#e8c872]"
                  style={{ animation: 'royal-pulse-glow 3.5s ease-in-out infinite' }}
                >
                  {/* Shimmer Light Reflection */}
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    style={{ animation: 'royal-shimmer-sweep 2.6s ease-in-out infinite' }}
                  />
                  <div className="relative flex items-center justify-center gap-2.5">
                    <MailOpen className="w-4 h-4 text-[#ffd778]" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.28em] text-[#fff8ee] drop-shadow-sm">
                      BUKA UNDANGAN
                    </span>
                    <Sparkles className="w-4 h-4 text-[#ffd778] animate-pulse" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isRoyalElegance ? (
          /* Exact Cover matching Royal Elegance (from reference image) */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#110e0c]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Cover Royal Elegance" 
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* Very strong dark maroon/brown vignette at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1315] via-[#2c1315]/70 to-transparent" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-20 px-6 text-center text-white">
              {/* Cover Text */}
              <div className="w-full mb-8 space-y-4">
                <p 
                  className="text-xs sm:text-sm text-gray-200 tracking-[0.1em]"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  The Wedding Of
                </p>
                <h1 
                  className="text-5xl sm:text-6xl text-white font-normal drop-shadow-md leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {groom} &amp; {bride}
                </h1>
              </div>

              {/* Recipient */}
              <div className="w-full mb-10 space-y-2">
                <p 
                  className="text-xs sm:text-sm text-gray-200 tracking-wider"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  Dear :
                </p>
                <p 
                  className="text-base sm:text-lg text-white font-medium tracking-wide drop-shadow"
                  style={{ fontFamily: "'Lora', serif" }}
                >
                  {guestName}
                </p>
              </div>

              {/* Buka Undangan Button */}
              <button 
                onClick={handleOpen} 
                className="btn-open-invitation px-8 py-3.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase transition-transform hover:scale-105 shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
                style={{ 
                  background: 'linear-gradient(90deg, #d4af37 0%, #aa771c 100%)', 
                  color: '#FFFFFF',
                  fontFamily: "'Montserrat', sans-serif" 
                }}
              >
                BUKA UNDANGAN
              </button>
            </div>
          </div>
        ) : isSecretGarden ? (
          /* Romantic Botanical Secret Garden Luxury Cover */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#140b0d]">
            {/* Inline Keyframes for Shimmer & Glow */}
            <style>{`
              @keyframes garden-shimmer-sweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                100% { transform: translateX(250%) skewX(-20deg); }
              }
              @keyframes garden-pulse-glow {
                0%, 100% { box-shadow: 0 0 15px rgba(216, 164, 175, 0.4), 0 8px 30px rgba(120, 60, 72, 0.5); }
                50% { box-shadow: 0 0 30px rgba(216, 164, 175, 0.7), 0 12px 40px rgba(120, 60, 72, 0.7); }
              }
            `}</style>

            {/* Desktop Panoramic Backdrop with Soft Botanical Ambiance */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Secret Garden Landscape" 
                className="w-full h-full object-cover object-center scale-105 filter blur-[4px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#12080a]/95 via-[#231014]/85 to-[#12080a]/95" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#140b0d]/70 to-[#0a0405]" />
            </div>

            {/* Centered Luxury Portrait Invitation Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[660px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-5 sm:p-7 bg-[#231216] shadow-[0_25px_80px_rgba(0,0,0,0.85),_0_0_40px_rgba(216,164,175,0.25)] sm:border-[2.5px] sm:border-[#d8a4af]/80 sm:ring-1 sm:ring-[#f5d5db]/30 sm:ring-offset-2 sm:ring-offset-[#170a0d]">
              
              {/* Card Photo Backdrop with Radial & Bottom Vignette */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src={coverImage} 
                  alt="Couple Cover" 
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#231216] via-[#231216]/80 via-48% to-black/35" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#231216]/45 to-[#231216]/95" />
              </div>

              {/* Romantic Botanical Arch Inset Frame */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-[28px] sm:rounded-[30px] border border-[#d8a4af]/40 pointer-events-none z-10" />

              {/* TOP: Monogram Medallion & Title */}
              <div className="relative z-20 flex flex-col items-center pt-2 sm:pt-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#803e4d] via-[#5c2431] to-[#38111b] shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-center justify-center border border-[#d8a4af]/60 p-1 mb-1.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#f0c5ce]/40 flex items-center justify-center bg-[#461a24]/80">
                    <span 
                      className="text-lg sm:text-xl font-serif text-[#fbebf0] font-normal tracking-widest drop-shadow-sm"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {`${groomDisplayName[0] || 'J'}${brideDisplayName[0] || 'M'}`.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-0.5 text-[#f5d5db]">
                  <Sparkles className="w-3.5 h-3.5 text-[#d8a4af]" />
                  <p 
                    className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#f5d5db] font-serif font-bold drop-shadow-sm"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    UNDANGAN PERNIKAHAN
                  </p>
                  <Sparkles className="w-3.5 h-3.5 text-[#d8a4af]" />
                </div>
              </div>

              {/* CENTER: Couple Names in Romantic Cursive Calligraphy */}
              <div className="relative z-20 flex flex-col items-center my-auto py-2 w-full max-w-[340px]">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-[54px] leading-tight text-white font-normal text-center drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] my-1"
                  style={{ fontFamily: "'Great Vibes', 'Imperial Script', cursive" }}
                >
                  {groomDisplayName} <span className="text-2xl sm:text-3xl text-[#f5d5db] mx-1 font-serif">&amp;</span> {brideDisplayName}
                </h1>

                {/* Soft Mauve Line Divider with Event Date */}
                <div className="flex items-center justify-center gap-2 mt-2 w-full max-w-[240px]">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d8a4af]/70 to-[#d8a4af]" />
                  <p 
                    className="text-[11px] sm:text-xs tracking-[0.15em] text-[#fae6eb] font-serif font-medium whitespace-nowrap drop-shadow-sm"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '27 September 2028'}
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d8a4af]/70 to-[#d8a4af]" />
                </div>
              </div>

              {/* BOTTOM: Recipient Guest Card & BUKA UNDANGAN Button */}
              <div className="relative z-20 flex flex-col items-center w-full max-w-[330px] gap-3 pb-2 sm:pb-3">
                {/* Guest Cartouche */}
                <div className="w-full rounded-2xl bg-gradient-to-b from-[#3d1921]/85 via-[#2b1016]/90 to-[#1c080d]/95 backdrop-blur-md border border-[#d8a4af]/60 shadow-[0_8px_24px_rgba(0,0,0,0.55),inset_0_1px_1px_rgba(255,255,255,0.15)] py-2.5 px-4 text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#e8b5be] font-serif font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i :
                  </p>
                  <p className="text-base sm:text-lg font-serif font-bold text-white tracking-wide mt-0.5 line-clamp-1 drop-shadow-sm">
                    {guestName}
                  </p>
                </div>

                {/* Buka Undangan Button */}
                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_35px_rgba(148,85,99,0.65),_0_0_25px_rgba(216,164,175,0.45)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#803d4a] via-[#a85868] to-[#6a2c38] border-[1.5px] border-[#f0c5ce]"
                  style={{ animation: 'garden-pulse-glow 3.5s ease-in-out infinite' }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    style={{ animation: 'garden-shimmer-sweep 2.6s ease-in-out infinite' }}
                  />
                  <div className="relative flex items-center justify-center gap-2.5">
                    <MailOpen className="w-4 h-4 text-[#ffd7e2]" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.28em] text-[#fff5f7] drop-shadow-sm">
                      BUKA UNDANGAN
                    </span>
                    <Sparkles className="w-4 h-4 text-[#ffd7e2] animate-pulse" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : (
          /* Split Floral Masterpiece Luxury Cover */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#130f0c]">
            {/* Inline Keyframes */}
            <style>{`
              @keyframes split-shimmer-sweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                100% { transform: translateX(250%) skewX(-20deg); }
              }
              @keyframes split-pulse-glow {
                0%, 100% { box-shadow: 0 0 15px rgba(212, 175, 55, 0.4), 0 8px 30px rgba(74, 48, 30, 0.55); }
                50% { box-shadow: 0 0 30px rgba(212, 175, 55, 0.7), 0 12px 42px rgba(74, 48, 30, 0.75); }
              }
            `}</style>

            {/* Desktop Panoramic Backdrop with Warm Golden Luxury Mood */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Split Floral Landscape" 
                className="w-full h-full object-cover object-center scale-105 filter blur-[3px]"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#120d0a]/95 via-[#231a14]/88 to-[#120d0a]/95" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#140e0b]/70 to-[#0a0705]" />
            </div>

            {/* Centered Luxury Portrait Invitation Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[660px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-5 sm:p-7 bg-[#1c1511] shadow-[0_25px_80px_rgba(0,0,0,0.85),_0_0_45px_rgba(212,175,55,0.3)] sm:border-[2.5px] sm:border-[#d4af37]/85 sm:ring-1 sm:ring-[#f3da9f]/40 sm:ring-offset-2 sm:ring-offset-[#140e0b]">
              
              {/* Card Photo Backdrop with Radial & Bottom Vignette */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src={coverImage} 
                  alt="Couple Cover" 
                  className="w-full h-full object-cover object-center scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1511] via-[#1c1511]/80 via-48% to-black/35" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#1c1511]/45 to-[#1c1511]/95" />
              </div>

              {/* Vintage Floral Edge Accents */}
              <img 
                src="/floral-edge-left.png" 
                alt="Floral Left" 
                className="absolute top-0 left-0 w-28 h-auto opacity-35 pointer-events-none z-10 -translate-x-3 -translate-y-3"
              />
              <img 
                src="/floral-edge-right.png" 
                alt="Floral Right" 
                className="absolute top-0 right-0 w-28 h-auto opacity-35 pointer-events-none z-10 translate-x-3 -translate-y-3"
              />

              {/* 24K Gold Inset Arched Frame Line */}
              <div className="absolute inset-2.5 sm:inset-3 rounded-[28px] sm:rounded-[30px] border border-[#d4af37]/45 pointer-events-none z-10" />

              {/* TOP: Royal Medallion & Title */}
              <div className="relative z-20 flex flex-col items-center pt-2 sm:pt-3">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#4a3420] via-[#2c1d10] to-[#1a1109] shadow-[0_6px_20px_rgba(0,0,0,0.4),inset_0_1px_2px_rgba(255,255,255,0.25)] flex items-center justify-center border border-[#d4af37]/70 p-1 mb-1.5">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#f3da9f]/40 flex items-center justify-center bg-[#23170e]/80">
                    <span 
                      className="text-lg sm:text-xl font-serif text-[#f3da9f] font-normal tracking-widest drop-shadow-sm"
                      style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                    >
                      {`${groom[0] || 'S'}${bride[0] || 'B'}`.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-0.5 text-[#f3da9f]">
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                  <p 
                    className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#f3da9f] font-serif font-bold drop-shadow-sm"
                    style={{ fontFamily: "'Cinzel', 'Playfair Display', serif" }}
                  >
                    THE WEDDING OF
                  </p>
                  <Crown className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>

              {/* CENTER: Couple Names & Event Date */}
              <div className="relative z-20 flex flex-col items-center my-auto py-2 w-full max-w-[340px]">
                <h1 
                  className="text-3xl sm:text-4xl lg:text-[40px] leading-tight text-white font-normal tracking-[0.03em] text-center drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] my-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {groom} <span className="italic font-light text-[#f3da9f] mx-1">&amp;</span> {bride}
                </h1>

                {/* Gold Line Divider with Event Date */}
                <div className="flex items-center justify-center gap-2 mt-2 w-full max-w-[240px]">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                  <p 
                    className="text-[11px] sm:text-xs tracking-[0.15em] text-[#f5dfa8] font-serif font-medium whitespace-nowrap drop-shadow-sm"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '24 Oktober 2026'}
                  </p>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                </div>
              </div>

              {/* BOTTOM: Recipient Guest Card & BUKA UNDANGAN Button */}
              <div className="relative z-20 flex flex-col items-center w-full max-w-[330px] gap-3 pb-2 sm:pb-3">
                {/* Guest Cartouche */}
                <div className="w-full rounded-2xl bg-gradient-to-b from-[#2e2116]/85 via-[#20160d]/90 to-[#140e08]/95 backdrop-blur-md border border-[#d4af37]/65 shadow-[0_8px_24px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] py-2.5 px-4 text-center">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-[#e2b96f] font-serif font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i :
                  </p>
                  <p className="text-base sm:text-lg font-serif font-bold text-white tracking-wide mt-0.5 line-clamp-1 drop-shadow-sm">
                    {guestName}
                  </p>
                </div>

                {/* Buka Undangan Royal Gold Button */}
                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_35px_rgba(143,112,52,0.6),_0_0_25px_rgba(212,175,55,0.45)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#6b4e20] via-[#9e7631] to-[#543c17] border-[1.5px] border-[#e8c872]"
                  style={{ animation: 'split-pulse-glow 3.5s ease-in-out infinite' }}
                >
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full"
                    style={{ animation: 'split-shimmer-sweep 2.6s ease-in-out infinite' }}
                  />
                  <div className="relative flex items-center justify-center gap-2.5">
                    <MailOpen className="w-4 h-4 text-[#ffd778]" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.28em] text-[#fff8ee] drop-shadow-sm">
                      BUKA UNDANGAN
                    </span>
                    <Sparkles className="w-4 h-4 text-[#ffd778] animate-pulse" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        )
      )}

      {/* 2. Entrance Animation: Gate Entrance Video */}
      {openingStage === 'arch-video' && (
        <div 
          onClick={() => {
            if (canSkipVideo) handleFinishAnimation();
          }}
          className={`fixed top-0 right-0 h-full ${
            isSplitTheme ? 'w-full lg:w-[42%]' : 'w-full inset-0'
          } z-50 bg-[#0e0b08] flex items-center justify-center transition-opacity duration-1000 ease-out overflow-hidden select-none ${
            isVideoExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          } ${canSkipVideo ? 'cursor-pointer' : ''}`}
        >
          {/* Background image matching video final frame for seamless zero-gap crossfade */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${
                isRoyalWayang
                  ? '/themes/royal-wayang-bg.jpg'
                  : isJavaneseHeritage
                    ? '/themes/javanese-heritage-bg.jpg'
                    : isMaroonGold 
                      ? '/gate-bg-open.jpg' 
                      : isSecretGarden 
                        ? '/themes/secret-garden/assets/inner-cover.jpg' 
                        : '/arch-clean.png'
              })`
            }}
          />

          {/* Ambient subtle paper noise pattern */}
          <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#8c7b6c_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Video Container */}
          <div className="relative w-full h-full flex items-center justify-center p-0">
            <video
              ref={videoRef}
              src={entranceVideoSrc}
              poster={
                isRoyalWayang
                  ? '/themes/royal-wayang-portal-poster.jpg'
                  : isJavaneseHeritage
                    ? '/themes/javanese-cover-poster.jpg'
                    : isMaroonGold 
                      ? '/gate-bg-open.jpg' 
                      : isSecretGarden 
                        ? '/themes/secret-garden/assets/inner-cover.jpg' 
                        : '/arch-clean.png'
              }
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover object-center"
              onTimeUpdate={() => {
                if (isRoyalWayang && videoRef.current && videoRef.current.currentTime >= 3.35) {
                  handleFinishAnimation();
                } else if (isJavaneseHeritage && videoRef.current && videoRef.current.currentTime >= 18.0) {
                  handleFinishAnimation();
                }
              }}
              onEnded={handleFinishAnimation}
            />
          </div>

          {/* Skip hint */}
          <div 
            onClick={(e) => {
              if (canSkipVideo) {
                e.stopPropagation();
                handleFinishAnimation();
              }
            }}
            className={`absolute bottom-6 right-6 z-10 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-[11px] font-sans tracking-wider uppercase transition-opacity duration-300 ${
              canSkipVideo ? 'opacity-100 cursor-pointer hover:bg-black/70' : 'opacity-60 pointer-events-none'
            }`}
          >
            Ketuk untuk lewati
          </div>
        </div>
      )}
    </div>
  );
};
