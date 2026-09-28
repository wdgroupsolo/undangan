import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Disc, Sparkles } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import { editorService } from '../../services/editorService';
import { BaseTheme } from './themes/BaseTheme';
import { LuxuryAnimatedTheme } from './themes/LuxuryAnimatedTheme';
import { SplitFloralTheme } from './themes/SplitFloralTheme';
import { AnimatedFloralTheme } from './themes/AnimatedFloralTheme';
import { SecretGardenTheme } from './themes/SecretGardenTheme';
import { RoyalEleganceTheme } from './themes/RoyalEleganceTheme';
import { MaroonGoldTheme } from './themes/MaroonGoldTheme';
import { JavaneseHeritageTheme, JavaneseMonogram, JavanesePetals } from './themes/JavaneseHeritageTheme';
import { WeddingLoadingScreen } from '../../components/WeddingLoadingScreen';

export const InvitationRenderer: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';
  const requestedTheme = searchParams.get('theme');

  // Opening sequence states:
  // 'cover'      -> Initial front cover (split on desktop, fullscreen on mobile) with [Buka Undangan] button
  // 'arch-video' -> Entrance video animation (on desktop: right 40% only; on mobile: fullscreen)
  const isDirectOpened = searchParams.get('opened') === 'true';
  const [openingStage, setOpeningStage] = useState<'cover' | 'arch-video' | 'opened'>(isDirectOpened ? 'opened' : 'cover');
  const [isVideoExiting, setIsVideoExiting] = useState(false);
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

  const activeCouple = couple || cachedCouple;

  const rawGroomNick = activeCouple?.groom_nickname?.trim();
  const rawGroomFull = activeCouple?.groom_full_name?.trim();
  const groom = (rawGroomNick && (!rawGroomFull || (rawGroomNick.toLowerCase() !== 'bagas' || rawGroomFull.toLowerCase() === 'bagas')))
    ? formatName(rawGroomNick)
    : (rawGroomFull ? formatName(rawGroomFull.split(/\s+/)[0]) : (rawGroomNick && rawGroomNick.toLowerCase() !== 'bagas' ? formatName(rawGroomNick) : 'Steven'));

  const rawBrideNick = activeCouple?.bride_nickname?.trim();
  const rawBrideFull = activeCouple?.bride_full_name?.trim();
  const bride = (rawBrideNick && (!rawBrideFull || (rawBrideNick.toLowerCase() !== 'siti' || rawBrideFull.toLowerCase() === 'siti')))
    ? formatName(rawBrideNick)
    : (rawBrideFull ? formatName(rawBrideFull.split(/\s+/)[0]) : (rawBrideNick && rawBrideNick.toLowerCase() !== 'siti' ? formatName(rawBrideNick) : 'Bunga'));

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

  const activeThemeSlug = requestedTheme || (slug === 'habib-adiba' || slug === 'steven-bunga' ? 'javanese-heritage' : ((invitation?.settings as any)?.theme_slug || invitation?.theme?.slug || 'split-floral'));
  const isSecretGarden = activeThemeSlug === 'secret-garden';
  const isRoyalElegance = activeThemeSlug === 'royal-elegance';
  const isMaroonGold = activeThemeSlug === 'maroon-gold';
  const isJavaneseHeritage = activeThemeSlug === 'javanese-heritage' || activeThemeSlug === 'jawa-klasik' || activeThemeSlug === 'borobudur';
  const isSplitTheme = activeThemeSlug === 'split-floral' || isSecretGarden || isMaroonGold || isJavaneseHeritage;

  const groomDisplayName = isJavaneseHeritage ? (groom && groom !== 'Bagas' && groom !== 'Habib' ? groom : 'Steven') : (isSecretGarden && (groom === 'Steven' || groom === 'Bagas') ? 'Jessi' : groom);
  const brideDisplayName = isJavaneseHeritage ? (bride && bride !== 'Siti' && bride !== 'Adiba' ? bride : 'Bunga') : (isSecretGarden && (bride === 'Bunga' || bride === 'Siti') ? 'Maudy' : bride);

  const coverImage = 
    couple?.cover_photo_url || 
    invitation?.cover_image_url || 
    gallery?.[0]?.image_url || 
    (isMaroonGold ? '/photos/photo-3.jpg' : (invitation?.theme?.preview_image && !invitation.theme.preview_image.includes('unsplash') ? invitation.theme.preview_image : '/cover-lunar-bg.jpg'));

  const entranceVideoSrc = isJavaneseHeritage
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
    }, 700);
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

      {/* Vinyl Disc Music Control Button (Stop & Start Audio, Responsive on Mobile & Desktop) */}
      {(openingStage !== 'cover' || (isJavaneseHeritage && isPlaying)) && (
        <button
          onClick={toggleMusic}
          aria-label="Toggle Background Music"
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
        >
          <Disc 
            className={`w-6 h-6 text-white group-hover:text-primary-300 transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
            style={{ animationDuration: '4s' }}
          />
        </button>
      )}

      {/* Main Invitation Content */}
      <div className={`transition-opacity duration-1000 ${
        isInvitationVisible 
          ? 'opacity-100' 
          : (isSplitTheme && openingStage === 'arch-video' ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden')
      }`}>
        {(isInvitationVisible || openingStage === 'arch-video') && (
          isJavaneseHeritage ? (
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

      {/* 1. Initial Front Cover: Fullscreen Cinematic (Desktop & Mobile) with [Buka Undangan] Button */}
      {openingStage === 'cover' && (
        isJavaneseHeritage ? (
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
            <div className="relative z-10 w-full h-full sm:h-auto sm:max-w-[410px] sm:min-h-[620px] sm:max-h-[92vh] sm:rounded-[26px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#fbf7f0] shadow-[0_25px_70px_rgba(0,0,0,0.7)] sm:border sm:border-[#8c2d38]/30">
              
              {/* Card Background: Authentic Borobudur Stupas & Vintage Floral Frame */}
              <img 
                src="/themes/javanese-cover-poster.jpg" 
                alt="Javanese Heritage Background" 
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
              />
              
              {/* Soft radial parchment glow */}
              <div className="absolute inset-0 bg-radial-at-c from-[#fbf7f0]/45 via-transparent to-[#fbf7f0]/20 pointer-events-none" />

              {/* TOP: Calligraphic Monogram */}
              <div className="relative z-10 pt-7 sm:pt-9">
                <JavaneseMonogram initials="SB" />
              </div>

              {/* MIDDLE: Typography - THE WEDDING OF STEVEN & BUNGA */}
              <div className="relative z-10 my-auto py-3 space-y-2 text-center flex flex-col items-center">
                <p 
                  className="text-xs tracking-[0.3em] indent-[0.3em] uppercase text-[#6a1a24] font-serif font-semibold drop-shadow-xs text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  THE WEDDING OF
                </p>

                <h1 
                  className="text-[25px] xs:text-[28px] sm:text-[34px] leading-tight text-[#4e0e16] font-normal tracking-wide drop-shadow-sm font-serif whitespace-nowrap text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {groomDisplayName.toUpperCase()} <span className="font-light italic text-[#7c1d29] mx-1">&amp;</span> {brideDisplayName.toUpperCase()}
                </h1>
              </div>

              {/* BOTTOM: Dear Recipient + BUKA UNDANGAN Pill Button */}
              <div className="relative z-10 pb-7 sm:pb-9 flex flex-col items-center w-full max-w-[260px]">
                <div className="text-center mb-5">
                  <p className="text-xs text-[#7a2832] font-serif italic mb-0.5">
                    Dear :
                  </p>
                  <p className="text-base sm:text-lg font-serif italic font-semibold text-[#3d1117] tracking-wide line-clamp-1">
                    {guestName}
                  </p>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3 px-8 shadow-[0_8px_25px_rgba(92,19,28,0.38)] transition-all duration-300 hover:scale-[1.04] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#7c1d29] via-[#63141f] to-[#4e0e16] border border-[#d4af37]/60"
                >
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full"
                    style={{ animation: 'shimmer-sweep-gold 2.6s ease-in-out infinite' }}
                  />
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#fff6e6] drop-shadow-sm">
                      BUKA UNDANGAN
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#f3da9f]" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isMaroonGold ? (
          /* Maroon Gold Cover matching exactly the user reference image */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#301114]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Cover Maroon Gold" 
                className="w-full h-full object-cover object-center scale-105"
              />
              {/* Very strong dark maroon vignette at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3a1518] via-[#3a1518]/60 to-transparent" />
            </div>

            <div className="relative z-10 w-full h-full flex flex-col justify-end items-center pb-16 px-6 text-center text-white">
              {/* Cover Text */}
              <div className="w-full mb-8 space-y-4">
                <p 
                  className="text-sm text-gray-200 tracking-wide drop-shadow-md font-serif"
                >
                  The Wedding Of
                </p>
                <h1 
                  className="text-5xl sm:text-6xl text-white font-normal drop-shadow-lg leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {groom} &amp; {bride}
                </h1>
              </div>

              {/* Recipient */}
              <div className="w-full mb-10 space-y-3">
                <p 
                  className="text-sm text-gray-200 font-serif drop-shadow-md"
                >
                  Dear :
                </p>
                <p 
                  className="text-base sm:text-lg text-white font-medium drop-shadow-md font-serif"
                >
                  {guestName}
                </p>
              </div>

              {/* Buka Undangan Button */}
              <button 
                onClick={handleOpen} 
                className="px-10 py-3.5 rounded-[50px] text-xs font-semibold tracking-widest transition-transform hover:scale-105 shadow-xl cursor-pointer"
                style={{ 
                  background: 'linear-gradient(90deg, #d3b474 0%, #aa8740 100%)', 
                  color: '#FFFFFF',
                  fontFamily: "'Montserrat', sans-serif" 
                }}
              >
                BUKA UNDANGAN
              </button>
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
          /* Exact Cover matching Secret Garden theme */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#0e0b08]">
            {/* Background image matching theme */}
            <div className="absolute inset-0 z-0">
              <img 
                src={coverImage} 
                alt="Cover Secret Garden" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-black/45" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50" />
            </div>

            {/* Secret Garden Cover Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center py-12 px-6 gap-y-8 sm:gap-y-12 text-center text-white">
              <div className="flex flex-col items-center justify-center w-full">
                <p 
                  className="text-xs sm:text-sm font-medium text-white/90 tracking-[0.3em] uppercase mb-3 drop-shadow"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  UNDANGAN PERNIKAHAN
                </p>
                <div className="flex flex-row items-center justify-center gap-x-2 sm:gap-x-3 flex-wrap">
                  <h1 
                    className="text-5xl sm:text-6xl md:text-7xl text-white tracking-wide font-normal leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
                    style={{ fontFamily: "'Great Vibes', 'Imperial Script', cursive" }}
                  >
                    {groomDisplayName}
                  </h1>
                  <span 
                    className="text-3xl sm:text-4xl text-white font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mx-1"
                    style={{ fontFamily: "'Great Vibes', 'Imperial Script', cursive" }}
                  >
                    &amp;
                  </span>
                  <h1 
                    className="text-5xl sm:text-6xl md:text-7xl text-white tracking-wide font-normal leading-tight drop-shadow-[0_4px_18px_rgba(0,0,0,0.95)]"
                    style={{ fontFamily: "'Great Vibes', 'Imperial Script', cursive" }}
                  >
                    {brideDisplayName}
                  </h1>
                </div>
                <p 
                  className="text-sm sm:text-base font-serif text-white/90 drop-shadow-md tracking-wider mt-2"
                  style={{ fontFamily: "'Playfair Display', 'Lora', serif" }}
                >
                  Minggu, 27 September 2028
                </p>
              </div>

              {/* Bottom Section: Nama Tamu & Button */}
              <div className="flex flex-col items-center gap-y-1 w-full">
                <p 
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Kepada Yth.<br />
                  Bapak/Ibu/Saudara/i:
                </p>
                <p 
                  className="text-white text-center text-base sm:text-lg font-semibold tracking-wide mb-6 drop-shadow"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {guestName}
                </p>
                <button 
                  onClick={handleOpen} 
                  className="btn-open-invitation px-8 py-3 rounded-full text-sm font-medium transition-transform hover:scale-105 shadow-xl tracking-wider cursor-pointer"
                  style={{ 
                    background: 'linear-gradient(239.94deg, #D7A5AE 0%, #774B53 100%)', 
                    color: '#FFFFFF',
                    fontFamily: "'Poppins', sans-serif" 
                  }}
                >
                  BUKA UNDANGAN
                </button>
              </div>
            </div>
          </div>
        ) : (
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
          } z-50 bg-[#0e0b08] flex items-center justify-center transition-opacity duration-700 ease-out overflow-hidden select-none ${
            isVideoExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
          } ${canSkipVideo ? 'cursor-pointer' : ''}`}
        >
          {/* Background image matching video final frame for seamless zero-gap crossfade */}
          <div 
            className="absolute inset-0 bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${
                isJavaneseHeritage
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
                isJavaneseHeritage
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
                if (isJavaneseHeritage && videoRef.current && videoRef.current.currentTime >= 18.0) {
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
