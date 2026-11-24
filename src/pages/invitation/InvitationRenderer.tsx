import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Mail, Disc, Sparkles, MailOpen, Crown, Play, Pause, Heart, MapPin, Moon, Star, Calendar, Wine } from 'lucide-react';
import { invitationService } from '../../services/invitationService';
import { editorService, COUPLE_AGNI_PUTRI, COUPLE_DEMO_TESTIMONI, COUPLE_STEVEN_BUNGA, GALLERY_STEVEN_BUNGA, COUPLE_HAFIZ_SYAFIKA, COUPLE_YOGA_FATMA, COUPLE_AUDI_OVYOLA } from '../../services/editorService';
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
import { 
  JogloMaroonHeritageTheme, 
  JogloButterflies 
} from './themes/JogloMaroonHeritageTheme';
import { NirwanaSaranganTheme, FloatingLakeMist } from './themes/NirwanaSaranganTheme';
import { KualaLumpurHeritageTheme } from './themes/KualaLumpurHeritageTheme';
import { NoirGoldTheme, RegalCorner, GildedFloralCornerCluster } from './themes/NoirGoldTheme';
import { IvoryPearlTheme, PearlCorner, IvoryFloralCornerCluster, IvoryArchFloralCrown } from './themes/IvoryPearlTheme';
import { RoseGoldTheme, RoseGoldCorner, RoseGoldFloralCornerCluster, RoseGoldArchFloralCrown } from './themes/RoseGoldTheme';
import { TerracottaBohoTheme, BohoCorner, BohoFloralCornerCluster, BohoArchFloralCrown } from './themes/TerracottaBohoTheme';
import { SundaSigerTheme, SundaSigerCrown, RonceMelatiTitisan, SundaFloralCornerCluster, SundaArchCrown, SundaBatikWatermark } from './themes/SundaSigerTheme';
import { MinangGadangTheme, MinangGonjongRoof, MinangSuntiangCrown, MinangRoyalSuntiangCrown, MinangCornerSongketCluster, MinangArchGonjong, MinangSongketWatermark, MinangRoyalOctagonFrame } from './themes/MinangGadangTheme';
import { BaliKamasanTheme, BaliCandiBentarPortal, BaliKamasanCornerCluster, BaliPolengWatermark, BaliRoyalPradaFrame, BaliKambojaFlower, BaliMajesticPuraFrame, BaliKambojaCrownApex, BaliPenjorFlank, BaliCandiBentarTowerWing, BaliPadmaBase } from './themes/BaliKamasanTheme';
import { 
  MoroccanNightsTheme, 
  MoroccanKhatimStar, 
  MoroccanFanousLantern, 
  MoroccanHorseshoeArch, 
  MoroccanCornerArabesque, 
  MoroccanZellijWatermark, 
  FloatingSaharaStardust 
} from './themes/MoroccanNightsTheme';
import { 
  EmeraldVelvetRoyalTheme, 
  EmeraldGoldCorner, 
  FloatingEmeraldStardust 
} from './themes/EmeraldVelvetRoyalTheme';
import { 
  MidnightCelestialTheme, 
  CelestialCrescentFrame, 
  CelestialCornerFlourish, 
  CelestialStarlightDivider, 
  CelestialBackgroundCanvas 
} from './themes/MidnightCelestialTheme';
import {
  BurgundyWineTheme,
  BurgundyCameoFrame,
  BurgundyBaroqueCornerFlourish,
  BurgundyGoldDivider,
  FloatingBurgundyStardust
} from './themes/BurgundyWineTheme';
import { CuratedThemeEngine, CURATED_THEMES } from './themes/CuratedThemeEngine';
import { FallingSakuraPetals, SakuraCoverFrame, SakuraInvitationSurround } from './components/SakuraBlossoms';
import { BatakHeritageEntrancePortal } from './components/BatakHeritageEntrancePortal';
import { NirwanaSaranganEntrancePortal } from './components/NirwanaSaranganEntrancePortal';
import { EmeraldVelvetEntrancePortal } from './components/EmeraldVelvetEntrancePortal';
import { WeddingLoadingScreen } from '../../components/WeddingLoadingScreen';
import { InvitationPausedScreen } from '../../components/InvitationPausedScreen';
import { analyticsService } from '../../services/analyticsService';
import { resolveThemePrice } from '../../services/themeService';

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
  const isVideoExitingRef = useRef(false);

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
  const isAudiOvyolaSlug = rawSlug === 'audi-ovyola' || rawSlug === 'ovyola-audi' || rawSlug.includes('audi') || rawSlug.includes('ovyola');
  const isYogaFatmaSlug = !isAudiOvyolaSlug && (rawSlug === 'yoga-fatma' || rawSlug === 'fatma-yoga' || rawSlug.includes('yoga') || rawSlug.includes('fatma'));
  const isAgniSlug = !isAudiOvyolaSlug && !isYogaFatmaSlug && (rawSlug.includes('agni') || rawSlug.includes('kribo'));
  const isHafizSlug = !isAudiOvyolaSlug && !isYogaFatmaSlug && (rawSlug.includes('hafiz') || rawSlug.includes('syafika') || rawSlug === 'kuala-lumpur-heritage');
  const isNirwanaSlug = isYogaFatmaSlug || rawSlug === 'nirwana-sarangan' || rawSlug === 'hotel-nirwana' || rawSlug === 'telaga-sarangan' || rawSlug.includes('nirwana');

  const activeThemeSlug = requestedTheme || (
    isAudiOvyolaSlug
      ? 'royal-wayang-gold'
      : (isYogaFatmaSlug
        ? 'nirwana-sarangan'
        : (isHafizSlug
          ? 'kuala-lumpur-heritage'
          : (isNirwanaSlug
            ? 'nirwana-sarangan'
            : (isAgniSlug
              ? 'royal-wayang-gold'
              : ((slug === 'benny-indah' || (!requestedTheme && slug === 'steven-bunga'))
                ? 'royal-wayang-gold' 
                : (slug === 'habib-adiba' 
                  ? 'javanese-heritage' 
                  : ((invitation?.settings as any)?.theme_slug || invitation?.theme?.slug || 'royal-wayang-gold')))))))
  );

  const getThemeDefaultMusic = (themeSlug?: string) => {
    if (isAudiOvyolaSlug) {
      return '/music/tiara-andini-tulang-dan-nadi-reff.mp3';
    }
    if (isAgniSlug) {
      return '/music/landon-pigg-falling-in-love.mp3';
    }
    switch (themeSlug) {
      case 'ivory-pearl':
      case 'ivory-pearl-minimalist':
      case 'noir-gold':
      case 'noir-gold-elegance':
      case 'emerald-velvet':
      case 'navy-silver':
      case 'burgundy-wine':
        return '/music/maroon-gold-canon.mp3';
      case 'kuala-lumpur-heritage':
      case 'kuala-lumpur':
      case 'hafiz-syafika':
      case 'minang-gadang':
      case 'bali-kamasan':
      case 'moroccan-nights':
        return '/music/bergema-sampai-selamanya.mp3';
      case 'sunda-siger':
        return '/music/javanese-gamelan.mp3';
      case 'rose-gold':
      case 'terracotta-boho':
      case 'sakura-hanami':
      case 'secret-garden':
        return '/music/secret-garden.mp3';
      case 'joglo-maroon-heritage':
      case 'joglo-maroon':
      case 'joglo-bloom':
      case 'pendopo-maroon':
        return '/music/joglo-maroon-heritage.mp3';
      case 'nirwana-sarangan':
      case 'hotel-nirwana':
      case 'telaga-sarangan':
      case 'royal-wayang-gold':
      case 'royal-wayang':
      case 'joglo-wayang':
      case 'javanese-heritage':
      case 'jawa-klasik':
      case 'borobudur':
        return '/music/bergema-sampai-selamanya.mp3';
      case 'maroon-gold':
        return '/music/maroon-gold-canon.mp3';
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

  const isStevenBungaSlug = !isAudiOvyolaSlug && !isYogaFatmaSlug && (rawSlug === 'steven-bunga' || rawSlug === 'bunga-steven' || (!slug && !couple));
  const isBimaSlug = !isAudiOvyolaSlug && !isYogaFatmaSlug && !isStevenBungaSlug && (rawSlug === 'bima-ratna' || rawSlug.includes('testimoni'));

  // Prioritize real database/props couple data over demo presets
  const hasRealCoupleData = couple && (
    (couple.groom_nickname && couple.groom_nickname.trim() !== '') ||
    (couple.groom_full_name && couple.groom_full_name.trim() !== '') ||
    (couple.bride_nickname && couple.bride_nickname.trim() !== '') ||
    (couple.bride_full_name && couple.bride_full_name.trim() !== '')
  );

  const activeCouple = hasRealCoupleData
    ? couple
    : (cachedCouple || (isAudiOvyolaSlug ? COUPLE_AUDI_OVYOLA : (isYogaFatmaSlug ? COUPLE_YOGA_FATMA : (isStevenBungaSlug ? COUPLE_STEVEN_BUNGA : (isBimaSlug ? COUPLE_DEMO_TESTIMONI : (isAgniSlug ? COUPLE_AGNI_PUTRI : COUPLE_STEVEN_BUNGA))))));

  // 1-Session browser test override (from Home interactive pill launcher)
  const [sessionTestCouple] = useState<{
    groom_nickname?: string;
    groom_full_name?: string;
    groom_name?: string;
    bride_nickname?: string;
    bride_full_name?: string;
    bride_name?: string;
  } | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const sess = sessionStorage.getItem('wd_demo_couple');
      if (sess) return JSON.parse(sess);
      const local = localStorage.getItem('wd_demo_couple_session');
      if (local) {
        const parsed = JSON.parse(local);
        if (Date.now() - (parsed.timestamp || 0) < 2 * 3600 * 1000) {
          return parsed;
        }
      }
    } catch {}
    return null;
  });

  const isDemoParam = searchParams.get('demo') === 'true';
  const isSessionTestMode = (isStevenBungaSlug || isDemoParam) && !!sessionTestCouple;
  const isDemoWatermarkVisible = isSessionTestMode || isDemoParam || isStevenBungaSlug;

  const displayCouple = useMemo(() => {
    if (!isSessionTestMode || !sessionTestCouple) {
      return activeCouple;
    }
    return {
      ...(activeCouple || {}),
      groom_nickname: sessionTestCouple.groom_nickname || activeCouple?.groom_nickname,
      groom_full_name: sessionTestCouple.groom_full_name || activeCouple?.groom_full_name,
      groom_name: sessionTestCouple.groom_nickname || activeCouple?.groom_name,
      bride_nickname: sessionTestCouple.bride_nickname || activeCouple?.bride_nickname,
      bride_full_name: sessionTestCouple.bride_full_name || activeCouple?.bride_full_name,
      bride_name: sessionTestCouple.bride_nickname || activeCouple?.bride_name,
    };
  }, [activeCouple, sessionTestCouple, isSessionTestMode]);

  const rawGroomNick = displayCouple?.groom_nickname?.trim();
  const rawGroomFull = displayCouple?.groom_full_name?.trim();
  const groom = rawGroomNick
    ? formatName(rawGroomNick)
    : (rawGroomFull ? formatName(rawGroomFull.split(/[\s,]+/)[0]) : (isAudiOvyolaSlug ? 'Audi' : (isYogaFatmaSlug ? 'Yoga' : (isAgniSlug ? 'Agni' : (isBimaSlug ? 'Bima' : 'Steven')))));

  const rawBrideNick = displayCouple?.bride_nickname?.trim();
  const rawBrideFull = displayCouple?.bride_full_name?.trim();
  const bride = rawBrideNick
    ? formatName(rawBrideNick)
    : (rawBrideFull ? formatName(rawBrideFull.split(/[\s,]+/)[0]) : (isAudiOvyolaSlug ? 'Ovyola' : (isYogaFatmaSlug ? 'Fatma' : (isAgniSlug ? 'Putri' : (isBimaSlug ? 'Ratna' : 'Bunga')))));

  // Dynamically set page title and Open Graph meta tags in browser tab (Called unconditionally)
  useEffect(() => {
    const pageTitle = `The Wedding of ${groom} & ${bride}`;
    document.title = pageTitle;

    const setMetaTag = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('property', 'og:title', pageTitle);
    setMetaTag('name', 'twitter:title', pageTitle);
    const domain = typeof window !== 'undefined' ? window.location.origin : 'https://rsvp.wdgroupcompany.biz.id';
    let previewImg = `${domain}/og-audi-ovyola.jpg`;
    if (isAudiOvyolaSlug) {
      previewImg = `${domain}/og-audi-ovyola.jpg`;
    } else if (isYogaFatmaSlug) {
      previewImg = `${domain}/themes/nirwana-sarangan/nirwana-theme-preview.png`;
    } else if (isHafizSlug) {
      previewImg = `${domain}/themes/kuala-lumpur-heritage/cover-skyline.jpg`;
    } else if (isAgniSlug) {
      previewImg = `${domain}/og-agni-kahuripan.jpg`;
    } else if (displayCouple?.cover_photo_url) {
      previewImg = displayCouple.cover_photo_url.startsWith('http')
        ? displayCouple.cover_photo_url
        : `${domain}${displayCouple.cover_photo_url}`;
    }
    setMetaTag('property', 'og:image', previewImg);
    setMetaTag('property', 'og:image:secure_url', previewImg);
    setMetaTag('name', 'twitter:image', previewImg);

    const descText = rawTo
      ? `Kepada Yth. Bapak/Ibu/Saudara/i ${rawTo}, kami mengundang Anda untuk menghadiri acara pernikahan ${groom} & ${bride}.`
      : `Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan ${groom} & ${bride}.`;
    setMetaTag('property', 'og:description', descText);
    setMetaTag('name', 'description', descText);
    setMetaTag('name', 'twitter:description', descText);
  }, [groom, bride, isAudiOvyolaSlug, isYogaFatmaSlug, isHafizSlug, isAgniSlug, displayCouple, rawTo]);

  // Track invitation view in analytics
  useEffect(() => {
    if (slug) {
      analyticsService.recordView(invId || 'e2000000-0000-0000-0000-000000000002', slug, rawTo);
    }
  }, [slug, invId, rawTo]);

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

  const groomDisplayName = isAudiOvyolaSlug ? 'Audi' : (isYogaFatmaSlug ? 'Yoga' : (isHafizSlug ? 'Hafiz' : (isAgniSlug ? 'Agni' : (groom || 'Steven'))));
  const brideDisplayName = isAudiOvyolaSlug ? 'Ovyola' : (isYogaFatmaSlug ? 'Fatma' : (isHafizSlug ? 'Syafika' : (isAgniSlug ? 'Putri' : (bride || 'Bunga'))));

  // Automatic paused screen when invitation status is 'paused'
  if (invitation?.status === 'paused') {
    return (
      <InvitationPausedScreen 
        groomName={groomDisplayName} 
        brideName={brideDisplayName}
        weddingTitle={invitation.title || `The Wedding of ${groomDisplayName} & ${brideDisplayName}`}
        contactPhone={invitation?.client?.phone || '6285707909415'}
      />
    );
  }

  const isRoseGold = activeThemeSlug === 'rose-gold' || activeThemeSlug === 'rose-gold-romance' || activeThemeSlug === 'rose';
  const isTerracottaBoho = activeThemeSlug === 'terracotta-boho' || activeThemeSlug === 'terracotta' || activeThemeSlug === 'boho-rustic';
  const isSundaSiger = activeThemeSlug === 'sunda-siger' || activeThemeSlug === 'sunda' || activeThemeSlug === 'siger';
  const isMinangGadang = activeThemeSlug === 'minang-gadang' || activeThemeSlug === 'minang' || activeThemeSlug === 'rumah-gadang' || activeThemeSlug === 'gadang';
  const isBaliKamasan = activeThemeSlug === 'bali-kamasan' || activeThemeSlug === 'bali' || activeThemeSlug === 'kamasan';
  const isMoroccanNights = activeThemeSlug === 'moroccan-nights' || activeThemeSlug === 'moroccan' || activeThemeSlug === 'arabian-nights';
  const isEmeraldVelvet = activeThemeSlug === 'emerald-velvet' || activeThemeSlug === 'emerald' || activeThemeSlug === 'emerald-velvet-royal';
  const isMidnightCelestial = activeThemeSlug === 'navy-silver' || activeThemeSlug === 'midnight-celestial' || activeThemeSlug === 'celestial-star' || activeThemeSlug === 'starlight';
  const isBurgundyWine = activeThemeSlug === 'burgundy-wine' || activeThemeSlug === 'burgundy' || activeThemeSlug === 'wine-classic';
  const isCuratedTheme = Boolean(CURATED_THEMES[activeThemeSlug]) && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isBurgundyWine;
  const curatedPreset = CURATED_THEMES[activeThemeSlug];

  const currentThemePrice = resolveThemePrice({
    slug: activeThemeSlug,
    price: (invitation?.theme as any)?.price || (invitation?.settings as any)?.price
  });

  const is50kTheme = currentThemePrice === 50000 || 
    activeThemeSlug === 'ivory-pearl' || 
    activeThemeSlug === 'ivory-pearl-minimalist' || 
    activeThemeSlug === 'noir-gold' || 
    activeThemeSlug === 'noir-gold-elegance' || 
    activeThemeSlug === 'rose-gold' || 
    activeThemeSlug === 'rose-gold-romance' || 
    activeThemeSlug === 'rose' || 
    activeThemeSlug === 'terracotta-boho' || 
    activeThemeSlug === 'terracotta' || 
    activeThemeSlug === 'boho-rustic';

  const is70kTheme = currentThemePrice === 70000 || 
    activeThemeSlug === 'kuala-lumpur-heritage' || 
    activeThemeSlug === 'kuala-lumpur' || 
    activeThemeSlug === 'hafiz-syafika' || 
    activeThemeSlug === 'sunda-siger' || 
    activeThemeSlug === 'minang-gadang' || 
    activeThemeSlug === 'minang' || 
    activeThemeSlug === 'rumah-gadang' || 
    activeThemeSlug === 'gadang' || 
    activeThemeSlug === 'bali-kamasan' || 
    activeThemeSlug === 'moroccan-nights' || 
    isMoroccanNights ||
    isHafizSlug;
  const isKualaLumpur = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && (activeThemeSlug === 'kuala-lumpur-heritage' || activeThemeSlug === 'kuala-lumpur' || isHafizSlug);
  const isNoirGold = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isKualaLumpur && (activeThemeSlug === 'noir-gold' || activeThemeSlug === 'noir' || activeThemeSlug === 'noir-gold-elegance');
  const isIvoryPearl = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isKualaLumpur && !isNoirGold && (activeThemeSlug === 'ivory-pearl' || activeThemeSlug === 'ivory' || activeThemeSlug === 'ivory-pearl-minimalist');
  const isNirwanaSarangan = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isKualaLumpur && !isNoirGold && !isIvoryPearl && (activeThemeSlug === 'nirwana-sarangan' || activeThemeSlug === 'hotel-nirwana' || activeThemeSlug === 'telaga-sarangan');
  const isJogloMaroon = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isKualaLumpur && !isNoirGold && !isIvoryPearl && !isNirwanaSarangan && (activeThemeSlug === 'joglo-maroon-heritage' || activeThemeSlug === 'joglo-maroon' || activeThemeSlug === 'joglo-bloom' || activeThemeSlug === 'pendopo-maroon');
  const isRoyalWayang = !isCuratedTheme && !isRoseGold && !isTerracottaBoho && !isSundaSiger && !isMinangGadang && !isBaliKamasan && !isMoroccanNights && !isEmeraldVelvet && !isMidnightCelestial && !isKualaLumpur && !isNoirGold && !isIvoryPearl && !isNirwanaSarangan && !isJogloMaroon && (activeThemeSlug === 'royal-wayang-gold' || activeThemeSlug === 'royal-wayang' || activeThemeSlug === 'joglo-wayang' || isAudiOvyolaSlug || slug === 'benny-indah' || (!requestedTheme && slug === 'steven-bunga') || isAgniSlug);
  const isSecretGarden = !isCuratedTheme && activeThemeSlug === 'secret-garden';
  const isRoyalElegance = !isCuratedTheme && activeThemeSlug === 'royal-elegance';
  const isMaroonGold = !isCuratedTheme && activeThemeSlug === 'maroon-gold';
  const isJavaneseHeritage = !isCuratedTheme && (activeThemeSlug === 'javanese-heritage' || activeThemeSlug === 'jawa-klasik' || activeThemeSlug === 'borobudur');
  const isSplitTheme = !isCuratedTheme && (activeThemeSlug === 'split-floral' || isSecretGarden || isMaroonGold || isJavaneseHeritage || isRoyalWayang || isJogloMaroon || isNirwanaSarangan || isEmeraldVelvet || isMidnightCelestial || isBurgundyWine);

  const guestName = (rawTo && rawTo.trim() !== '') 
    ? rawTo.trim() 
    : (invitation?.settings?.default_guest_name?.trim() || (isKualaLumpur ? 'Tuan/Puan/Saudara/Saudari' : 'Tamu Undangan'));

  const coverImage = 
    (isAudiOvyolaSlug ? '/photos/audi-ovyola/entrance-audi-ovyola.jpg' : null) ||
    (isKualaLumpur ? '/themes/kuala-lumpur-heritage/cover-skyline.jpg' : null) ||
    (isAgniSlug ? '/themes/agni-putri/couple-arch.jpg' : null) ||
    (isMidnightCelestial ? '/photos/photo-7.jpg' : null) ||
    (isBurgundyWine ? '/photos/photo-7.jpg' : null) ||
    invitation?.settings?.cover_photo ||
    couple?.cover_photo_url || 
    couple?.cover_photo ||
    invitation?.cover_image_url || 
    gallery?.[0]?.image_url || 
    (isNirwanaSarangan ? '/themes/nirwana-sarangan/couple-cover.jpg' : isJogloMaroon ? '/photos/photo-3.jpg' : isRoyalWayang ? '/photos/audi-ovyola/cover-audi-ovyola.jpg' : isMaroonGold ? '/photos/photo-3.jpg' : (invitation?.theme?.preview_image && !invitation.theme.preview_image.includes('unsplash') ? invitation.theme.preview_image : '/cover-lunar-bg.jpg'));

  const entranceVideoSrc = isNirwanaSarangan
    ? '/gemini_generated_video_1f694672.mp4'
    : isJogloMaroon
      ? '/themes/joglo-maroon-entrance.mp4'
      : isRoyalWayang
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
    if (isVideoExitingRef.current) return;
    isVideoExitingRef.current = true;
    if (animTimeoutRef.current) {
      clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = null;
    }
    setIsVideoExiting(true);
    const exitDelay = (isNirwanaSarangan || isEmeraldVelvet || isMidnightCelestial || isBurgundyWine) ? 180 : 1000;
    setTimeout(() => {
      setOpeningStage('opened');
      setIsVideoExiting(false);
      setCanSkipVideo(false);
      isVideoExitingRef.current = false;
    }, exitDelay);
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

    // Untuk tema 50k, 70k, dan Masterpiece (smooth starlight fade-out)
    if (is50kTheme || is70kTheme || isCuratedTheme || isNoirGold || isKualaLumpur || isIvoryPearl || isRoseGold || isTerracottaBoho || isSundaSiger || isMinangGadang || isBaliKamasan || isMoroccanNights || isMidnightCelestial || isBurgundyWine) {
      setIsCoverExiting(true);
      setTimeout(() => {
        setOpeningStage('opened');
        setIsCoverExiting(false);
      }, 700);
      return;
    }

    if (isEmeraldVelvet) {
      // Cinematic 3D Royal Velvet Curtain & Wax Seal Entrance Portal
      setCanSkipVideo(false);
      setOpeningStage('arch-video');
      setTimeout(() => {
        setCanSkipVideo(true);
      }, 500);
      return;
    }

    if (isNirwanaSarangan) {
      // Cinematic 3D Royal Gate Entrance Portal
      setCanSkipVideo(false);
      setOpeningStage('arch-video');
      setTimeout(() => {
        setCanSkipVideo(true);
      }, 600);
      return;
    }

    if (isJogloMaroon) {
      // Elegant 3D Batak Heritage Entrance Portal
      setOpeningStage('arch-video');
      return;
    }

    if (isRoyalWayang) {
      // Authentic Royal Wayang Portal Zoom entrance video animation as originally designed
      setCanSkipVideo(false);
      setOpeningStage('arch-video');

      // Allow skip after 1.2s delay
      setTimeout(() => {
        setCanSkipVideo(true);
      }, 1200);

      // Trigger video playback immediately
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.defaultMuted = true;
          videoRef.current.muted = true;
          videoRef.current.play().catch(err => console.warn('Video play error:', err));
        }
      }, 60);

      // Fallback timeout in case onTimeUpdate doesn't fire
      if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);
      animTimeoutRef.current = setTimeout(() => {
        handleFinishAnimation();
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
      handleFinishAnimation();
    }, timeoutDuration);
  };

  const isInvitationVisible = openingStage === 'opened' || (openingStage === 'arch-video' && isVideoExiting);

  return (
    <div className="relative min-h-screen no-scrollbar overflow-x-clip">
      {/* Ambient Falling Sakura Petals & Golden Stardust across whole screen for Kuala Lumpur Heritage (GPU 60fps) */}
      {isKualaLumpur && (
        <FallingSakuraPetals count={22} className="z-[60]" />
      )}

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
              : (isNirwanaSarangan || isEmeraldVelvet)
                ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-[#041610]/90 hover:bg-[#08261B] backdrop-blur-md border border-[#ECC880] text-[#ECC880] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(236,200,128,0.4)]'
              : isMidnightCelestial
                ? 'top-4 right-4 sm:top-5 sm:right-5 h-10 sm:h-11 px-3 sm:px-3.5 bg-[#050B18]/90 hover:bg-[#0A132B] backdrop-blur-md border border-[#38BDF8] text-[#38BDF8] hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_15px_rgba(56,189,248,0.4)] flex items-center gap-1.5'
              : isBurgundyWine
                ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-[#19030A]/90 hover:bg-[#2B0713] backdrop-blur-md border border-[#E5C57B] text-[#E5C57B] hover:scale-110 active:scale-95 shadow-[0_4px_18px_rgba(0,0,0,0.65)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F5E5C9]'
                : isSundaSiger
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-md border border-[#D4AF37] text-[#2D4638] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(45,70,56,0.25)]'
                : isMinangGadang
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-md border border-[#E1A83E] text-[#7A1822] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(122,24,34,0.25)]'
                : isBaliKamasan
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/95 backdrop-blur-md border border-[#E5B232] text-[#783A1E] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(120,58,30,0.25)]'
                : isMoroccanNights
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-[#102242]/90 backdrop-blur-md border border-[#DE9B35] text-[#DE9B35] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(222,155,53,0.35)]'
                : isTerracottaBoho
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-md border border-[#DDBBAE] text-[#964B35] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(150,75,53,0.25)]'
                : isRoseGold
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 backdrop-blur-md border border-[#E8C5C8] text-[#9B5365] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(232,197,200,0.4)]'
                : (isNoirGold || isIvoryPearl || is70kTheme || isCuratedTheme)
                  ? 'top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 bg-white/90 dark:bg-[#141519]/90 backdrop-blur-md border border-[#C5A880]/50 text-[#8C6D3F] hover:scale-110 active:scale-95 shadow-[0_4px_20px_rgba(180,160,140,0.35)]'
                  : 'bottom-6 right-6 w-12 h-12 bg-black/70 backdrop-blur-md border border-white/20 text-white hover:scale-110 active:scale-95'
          }`}
        >
          {isRoyalWayang ? (
            isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-white fill-white" />
            ) : (
              <Play className="w-3.5 h-3.5 text-white fill-white ml-0.5" />
            )
          ) : isMidnightCelestial ? (
            <div className="flex items-center gap-1.5">
              <Disc 
                className={`w-4 h-4 sm:w-5 sm:h-5 text-[#38BDF8] transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
                style={{ animationDuration: '3.5s' }}
              />
              <div className="flex items-end gap-[2px] h-3">
                <span className={`w-[2.5px] rounded-full bg-[#38BDF8] transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse' : 'h-1 opacity-40'}`} />
                <span className={`w-[2.5px] rounded-full bg-white transition-all duration-300 ${isPlaying ? 'h-2 animate-bounce' : 'h-1 opacity-40'}`} style={{ animationDelay: '150ms' }} />
                <span className={`w-[2.5px] rounded-full bg-[#818CF8] transition-all duration-300 ${isPlaying ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'}`} style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          ) : isBurgundyWine ? (
            <Disc 
              className={`w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
              style={{ animationDuration: '4s' }}
            />
          ) : (isNirwanaSarangan || isEmeraldVelvet) ? (
            <Disc 
              className={`w-5 h-5 sm:w-6 sm:h-6 text-[#ECC880] transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
              style={{ animationDuration: '4s' }}
            />
          ) : (
            <Disc 
              className={`w-6 h-6 text-white group-hover:text-primary-300 transition-colors ${isPlaying ? 'animate-spin' : 'opacity-60'}`} 
              style={{ animationDuration: '4s' }}
            />
          )}
        </button>
      )}

      {/* Testing Demo Background Watermark Pattern */}
      {isDemoWatermarkVisible && (
        <div 
          aria-hidden="true" 
          className="fixed inset-0 pointer-events-none select-none z-[80] overflow-hidden"
        >
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="testing-demo-watermark"
                width="320"
                height="180"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(-25)"
              >
                <text
                  x="20"
                  y="45"
                  fill="rgba(255, 255, 255, 0.15)"
                  stroke="rgba(0, 0, 0, 0.28)"
                  strokeWidth="0.5"
                  fontSize="15"
                  fontWeight="800"
                  letterSpacing="3"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  TESTING DEMO
                </text>
                <text
                  x="20"
                  y="72"
                  fill="rgba(212, 175, 55, 0.22)"
                  stroke="rgba(0, 0, 0, 0.25)"
                  strokeWidth="0.5"
                  fontSize="9.5"
                  fontWeight="700"
                  letterSpacing="2"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  WD DIGITAL INVITATION
                </text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#testing-demo-watermark)" />
          </svg>
        </div>
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
        {(isSplitTheme || isInvitationVisible || isCoverExiting || openingStage === 'arch-video' || isCuratedTheme) && (
          isCuratedTheme ? (
            <CuratedThemeEngine 
              themeSlug={activeThemeSlug}
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isRoseGold ? (
            <RoseGoldTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isTerracottaBoho ? (
            <TerracottaBohoTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isSundaSiger ? (
            <SundaSigerTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isMinangGadang ? (
            <MinangGadangTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isBaliKamasan ? (
            <BaliKamasanTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              guestName={guestName}
            />
          ) : isMoroccanNights ? (
            <MoroccanNightsTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
        ) : isIvoryPearl ? (
            <IvoryPearlTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isNoirGold ? (
            <NoirGoldTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isKualaLumpur ? (
            <KualaLumpurHeritageTheme 
              invitation={invitation}
              couple={displayCouple || COUPLE_HAFIZ_SYAFIKA}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isEmeraldVelvet ? (
            <EmeraldVelvetRoyalTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={(gallery && gallery.length > 0 && !gallery[0]?.image_url?.includes('agni-putri')) ? gallery : (isStevenBungaSlug ? GALLERY_STEVEN_BUNGA : (gallery || []))}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isMidnightCelestial ? (
            <MidnightCelestialTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={(gallery && gallery.length > 0 && !gallery[0]?.image_url?.includes('agni-putri')) ? gallery : (isStevenBungaSlug ? GALLERY_STEVEN_BUNGA : (gallery || []))}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isBurgundyWine ? (
            <BurgundyWineTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={(gallery && gallery.length > 0 && !gallery[0]?.image_url?.includes('agni-putri')) ? gallery : (isStevenBungaSlug ? GALLERY_STEVEN_BUNGA : (gallery || []))}
              gifts={gifts || []}
              music={music}
              guestName={guestName}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isNirwanaSarangan ? (
            <NirwanaSaranganTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={(gallery && gallery.length > 0 && !gallery[0]?.image_url?.includes('agni-putri')) ? gallery : (isStevenBungaSlug ? GALLERY_STEVEN_BUNGA : (gallery || []))}
              gifts={gifts || []}
              music={music}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isJogloMaroon ? (
            <JogloMaroonHeritageTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
              isOpening={isVideoExiting || openingStage === 'opened'}
            />
          ) : isRoyalWayang ? (
            <RoyalWayangGoldTheme 
              invitation={invitation}
              couple={displayCouple}
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
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isRoyalElegance ? (
            <RoyalEleganceTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isMaroonGold ? (
            <MaroonGoldTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : isSecretGarden ? (
            <SecretGardenTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (activeThemeSlug === 'animated-luxury' || activeThemeSlug === 'elegant-gold' || activeThemeSlug === 'navy-luxury') ? (
            <LuxuryAnimatedTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : activeThemeSlug === 'split-floral' ? (
            <SplitFloralTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (activeThemeSlug === 'animated-floral' || activeThemeSlug === 'floral-romance' || activeThemeSlug === 'sakura-blossom') ? (
            <AnimatedFloralTheme 
              invitation={invitation}
              couple={displayCouple}
              events={events || []}
              stories={stories || []}
              gallery={gallery || []}
              gifts={gifts || []}
              music={music}
            />
          ) : (
            <BaseTheme 
              invitation={invitation}
              couple={displayCouple}
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
      {openingStage === 'cover' && (
        isCuratedTheme && curatedPreset ? (
          /* Curated Theme Cover: Mobile & Desktop Centered Luxury Modal Frame */
          <div 
            className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}
            style={{ backgroundColor: curatedPreset.bgMain }}
          >
            {/* Ambient Radial Glow */}
            <div 
              className="absolute inset-0 z-0 pointer-events-none opacity-40"
              style={{
                background: `radial-gradient(circle at center, ${curatedPreset.accentColor}30 0%, transparent 70%)`
              }}
            />

            {/* Desktop Scenic Panorama Backdrop if available */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block opacity-25 filter blur-[6px]">
              <img 
                src={`/themes/${curatedPreset.slug}/theme-preview.jpg`} 
                alt={curatedPreset.name} 
                className="w-full h-full object-cover object-center scale-110" 
              />
            </div>

            {/* Centered Mobile/Portrait Cover Frame */}
            <div 
              className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:border"
              style={{ 
                backgroundColor: curatedPreset.bgCard,
                borderColor: `${curatedPreset.borderColor}60`,
                color: curatedPreset.textColor
              }}
            >
              {/* TOP: Motif & Subtitle */}
              <div className="relative z-20 flex flex-col items-center pt-4 sm:pt-6">
                <div className="mb-2">
                  {curatedPreset.motif(curatedPreset.accentColor)}
                </div>
                <span 
                  className="text-[10px] sm:text-xs tracking-[0.3em] uppercase font-serif font-bold"
                  style={{ color: curatedPreset.accentColor }}
                >
                  THE WEDDING INVITATION
                </span>
                <h1 
                  className="font-serif text-3xl sm:text-4xl font-bold tracking-tight mt-1.5"
                  style={{ color: curatedPreset.textColor }}
                >
                  {groomDisplayName} <span className="font-light italic" style={{ color: curatedPreset.accentColor }}>&amp;</span> {brideDisplayName}
                </h1>
                <p 
                  className="text-[11px] font-sans tracking-[0.2em] uppercase mt-1.5 font-medium"
                  style={{ color: curatedPreset.textMuted }}
                >
                  {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* CENTER: Arched / Oval Couple Portrait Window */}
              <div className="relative z-20 my-auto py-2 flex flex-col items-center">
                <div 
                  className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 shadow-xl group border"
                  style={{ 
                    borderColor: `${curatedPreset.accentColor}70`,
                    background: `linear-gradient(180deg, ${curatedPreset.bgCard} 0%, ${curatedPreset.bgMain} 100%)`
                  }}
                >
                  <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                    <img 
                      src={coverImage} 
                      alt={`${groomDisplayName} & ${brideDisplayName}`}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                <div 
                  className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full border text-[10px] font-serif uppercase tracking-[0.2em] font-semibold"
                  style={{ 
                    backgroundColor: curatedPreset.bgMain, 
                    borderColor: `${curatedPreset.borderColor}50`,
                    color: curatedPreset.accentColor 
                  }}
                >
                  <Sparkles size={11} />
                  <span>{curatedPreset.badgeText}</span>
                </div>
              </div>

              {/* BOTTOM: Recipient & Open Invitation Button */}
              <div className="relative z-20 w-full flex flex-col items-center pb-3 sm:pb-5">
                <div 
                  className="w-full max-w-xs p-3 rounded-2xl border shadow-xs mb-3 text-center"
                  style={{ 
                    backgroundColor: curatedPreset.bgMain, 
                    borderColor: `${curatedPreset.borderColor}50`
                  }}
                >
                  <span 
                    className="text-[10px] uppercase tracking-widest block mb-0.5"
                    style={{ color: curatedPreset.textMuted }}
                  >
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span 
                    className="font-serif text-sm font-bold block truncate"
                    style={{ color: curatedPreset.accentColor }}
                  >
                    {guestName}
                  </span>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-lg transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer border"
                  style={{ 
                    background: `linear-gradient(135deg, ${curatedPreset.primaryColor} 0%, ${curatedPreset.accentColor} 100%)`,
                    borderColor: curatedPreset.accentColor,
                    color: '#FFFFFF'
                  }}
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <MailOpen className="w-4 h-4 text-white" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white">
                      BUKA UNDANGAN
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isRoseGold ? (
          /* Rose Gold Romance: Elegant Dusty Rose & Peony Arched Cover (Paket Starter 50k) */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#FDF8F7] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}>
            {/* Background Ambient Radial Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(232,197,200,0.38)_0%,rgba(253,248,247,0.98)_70%)]" />

            {/* Centered Mobile/Portrait Cover Frame */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-7 shadow-[0_25px_80px_rgba(183,110,121,0.22),0_0_30px_rgba(232,197,200,0.25)] sm:border border-[#E8C5C8] bg-white">
              
              {/* Rich Blooming Floral Corner Frames */}
              <div className="absolute -top-1 -left-1"><RoseGoldFloralCornerCluster position="top-left" size={96} /></div>
              <div className="absolute -top-1 -right-1"><RoseGoldFloralCornerCluster position="top-right" size={96} /></div>
              <div className="absolute -bottom-1 -left-1"><RoseGoldFloralCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute -bottom-1 -right-1"><RoseGoldFloralCornerCluster position="bottom-right" size={96} /></div>

              {/* Four Rose Gold Corners (Metallic Filigree Accents) */}
              <div className="absolute top-3.5 left-3.5 opacity-70"><RoseGoldCorner position="top-left" size={26} /></div>
              <div className="absolute top-3.5 right-3.5 opacity-70"><RoseGoldCorner position="top-right" size={26} /></div>
              <div className="absolute bottom-3.5 left-3.5 opacity-70"><RoseGoldCorner position="bottom-left" size={26} /></div>
              <div className="absolute bottom-3.5 right-3.5 opacity-70"><RoseGoldCorner position="bottom-right" size={26} /></div>

              {/* TOP: "THE WEDDING INVITATION" */}
              <div className="relative z-20 flex flex-col items-center pt-5 sm:pt-6">
                <span className="text-[10px] sm:text-xs tracking-[0.32em] uppercase text-[#9B5365] font-serif font-bold">
                  THE WEDDING INVITATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#44222B] mt-1.5">
                  {groomDisplayName} <span className="font-light italic text-[#B76E79]">&amp;</span> {brideDisplayName}
                </h1>
                <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#82535F] mt-1.5 font-medium">
                  {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* CENTER: Arched Couple Portrait Window with Floral Garland Crown */}
              <div className="relative z-20 my-auto py-3 flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <RoseGoldArchFloralCrown size={190} />
                  </div>
                  <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#F7D8DC] via-[#DDA7A5] to-[#B76E79] shadow-[0_12px_35px_rgba(183,110,121,0.22)] group">
                    <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                      <img 
                        src={coverImage} 
                        alt={`${groomDisplayName} & ${brideDisplayName}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 rounded-full bg-[#FFF0F2] border border-[#E8C5C8]/70">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#9B5365] font-semibold">
                    Rose Gold Romance
                  </span>
                </div>
              </div>

              {/* BOTTOM: Recipient & Open Invitation Button */}
              <div className="relative z-20 w-full flex flex-col items-center pb-4 sm:pb-5">
                <div className="w-full max-w-xs p-3 rounded-2xl bg-[#FFF5F6] border border-[#E8C5C8]/70 shadow-xs mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#82535F] block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#8C3A4F] block truncate">
                    {guestName}
                  </span>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(183,110,121,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#B76E79] via-[#D28D98] to-[#9E5363] border border-[#FADDE1]"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <MailOpen className="w-4 h-4 text-white" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white">
                      BUKA UNDANGAN
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isTerracottaBoho ? (
          /* Terracotta Boho Rustic: Earthy Pampas & Palm Arched Cover (Paket Starter 50k) */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#FAF5EE] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}>
            {/* Background Ambient Radial Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(223,156,123,0.32)_0%,rgba(250,245,238,0.98)_70%)]" />

            {/* Centered Mobile/Portrait Cover Frame */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-7 shadow-[0_25px_80px_rgba(150,75,53,0.22),0_0_30px_rgba(223,156,123,0.2)] sm:border border-[#DDBBAE] bg-white">
              
              {/* Rich Dried Botanical Corner Frames */}
              <div className="absolute -top-1 -left-1"><BohoFloralCornerCluster position="top-left" size={96} /></div>
              <div className="absolute -top-1 -right-1"><BohoFloralCornerCluster position="top-right" size={96} /></div>
              <div className="absolute -bottom-1 -left-1"><BohoFloralCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute -bottom-1 -right-1"><BohoFloralCornerCluster position="bottom-right" size={96} /></div>

              {/* Four Boho Corners (Terracotta Arch Accents) */}
              <div className="absolute top-3.5 left-3.5 opacity-65"><BohoCorner position="top-left" size={26} /></div>
              <div className="absolute top-3.5 right-3.5 opacity-65"><BohoCorner position="top-right" size={26} /></div>
              <div className="absolute bottom-3.5 left-3.5 opacity-65"><BohoCorner position="bottom-left" size={26} /></div>
              <div className="absolute bottom-3.5 right-3.5 opacity-65"><BohoCorner position="bottom-right" size={26} /></div>

              {/* TOP: "THE WEDDING INVITATION" */}
              <div className="relative z-20 flex flex-col items-center pt-5 sm:pt-6">
                <span className="text-[10px] sm:text-xs tracking-[0.32em] uppercase text-[#964B35] font-serif font-bold">
                  THE WEDDING INVITATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2E1D16] mt-1.5">
                  {groomDisplayName} <span className="font-light italic text-[#C47B5D]">&amp;</span> {brideDisplayName}
                </h1>
                <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#8A6B5F] mt-1.5 font-medium">
                  {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* CENTER: Arched Couple Portrait Window with Pampas Garland Crown */}
              <div className="relative z-20 my-auto py-3 flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <BohoArchFloralCrown size={190} />
                  </div>
                  <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FAF5EE] via-[#DDBBAE] to-[#964B35] shadow-[0_12px_35px_rgba(150,75,53,0.22)] group">
                    <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                      <img 
                        src={coverImage} 
                        alt={`${groomDisplayName} & ${brideDisplayName}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 rounded-full bg-[#FAF5EE] border border-[#DDBBAE]">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#964B35] font-semibold">
                    Terracotta Boho Rustic
                  </span>
                </div>
              </div>

              {/* BOTTOM: Recipient & Open Invitation Button */}
              <div className="relative z-20 w-full flex flex-col items-center pb-4 sm:pb-5">
                <div className="w-full max-w-xs p-3 rounded-2xl bg-[#FAF5EE] border border-[#DDBBAE] shadow-xs mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#8A6B5F] block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#964B35] block truncate">
                    {guestName}
                  </span>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(150,75,53,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#964B35] via-[#BA654C] to-[#7A3926] border border-[#DDBBAE]"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <MailOpen className="w-4 h-4 text-white" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white">
                      BUKA UNDANGAN
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isSundaSiger ? (
          /* Sunda Siger Parahyangan: Royal Siger & Cascading Melati Cover (Paket Heritage 70k) */
          <div className={`fixed inset-0 z-50 overflow-hidden select-none bg-[#F7F9F7] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}>
            
            {/* DESKTOP FIXED LEFT ASIDE (5/12 or 1/2 screen) */}
            <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#1B3326] text-white border-r border-[#D4AF37]/40">
              {/* Panoramic Parahyangan Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={`${groomDisplayName} & ${brideDisplayName}`} 
                  className="w-full h-full object-cover object-center filter brightness-90 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14261D] via-[#1E3A2B]/85 to-[#0F1E16]/90" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#14261D]/40 to-[#14261D]/90" />
                <SundaBatikWatermark className="opacity-[0.06]" />
              </div>

              {/* Gilded Inner Arch Frame Line */}
              <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#D4AF37]/45 pointer-events-none z-10" />

              {/* Central Content Column */}
              <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
                {/* TOP: Badges */}
                <div className="w-full flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183123]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Walimatul'ursy</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183123]/85 backdrop-blur-md border border-[#D4AF37]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Sunda Siger</span>
                  </div>
                </div>

                {/* CENTER: Couple Portrait & Recipient Guest Card */}
                <div className="my-auto w-full flex flex-col items-center text-center py-4">
                  <div className="relative mb-3">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                      <SundaArchCrown size={195} />
                    </div>
                    <div className="relative mx-auto w-40 h-52 xl:w-48 xl:h-60 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-1 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] group">
                      <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                        <img 
                          src={coverImage} 
                          alt={`${groomDisplayName} & ${brideDisplayName}`}
                          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14261D]/70 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1 text-[#FFF1BA]">
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                    <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                      THE WEDDING CELEBRATION OF
                    </p>
                    <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
                  </div>

                  <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#F5D77F] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {groomDisplayName} <span className="text-xl xl:text-2xl text-[#D4AF37] font-light italic font-serif">&amp;</span> {brideDisplayName}
                  </h1>

                  <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-3" />

                  {/* Recipient Guest Card */}
                  <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#254634]/90 via-[#183123]/95 to-[#0E1E15]/98 backdrop-blur-md border border-[#D4AF37]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(212,175,55,0.25)] mb-3">
                    <div className="absolute inset-1.5 rounded-xl border border-[#D4AF37]/25 pointer-events-none" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-serif font-semibold mb-0.5 text-center">
                      Kepada Yth. Bapak/Ibu/Saudara/i :
                    </p>
                    <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                      {guestName}
                    </h2>
                    <p className="text-[9.5px] tracking-wider text-[#DFE8E2] text-center font-sans mt-0.5">
                      Merupakan satu kehormatan atas kehadiran &amp; doa restu Anda
                    </p>
                  </div>
                </div>

                {/* BOTTOM: Venue Info */}
                <div className="w-full flex items-center justify-between text-xs text-[#DFE8E2] border-t border-[#D4AF37]/35 pt-3">
                  <span className="font-serif tracking-wide text-[#F9E5BA] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Bale Sawala Parahyangan
                  </span>
                  <span className="font-sans text-[#FFF8E7]">Bandung, Jawa Barat</span>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: FULL-HEIGHT & FULL-WIDTH OF RIGHT COLUMN ON DESKTOP, FULLSCREEN ON MOBILE */}
            <div className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto h-[100dvh] relative z-20 flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#F7F9F7] lg:border-l lg:border-[#D4AF37]/35 shadow-2xl overflow-hidden">
              {/* Background Ambient Radial Glow & Batik Watermark */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.22)_0%,rgba(247,249,247,0.98)_70%)]" />
              <SundaBatikWatermark />

              {/* 4 Corner Floral Ornaments pinned to actual edges */}
              <div className="absolute top-0 left-0"><SundaFloralCornerCluster position="top-left" size={96} /></div>
              <div className="absolute top-0 right-0"><SundaFloralCornerCluster position="top-right" size={96} /></div>
              <div className="absolute bottom-0 left-0"><SundaFloralCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute bottom-0 right-0"><SundaFloralCornerCluster position="bottom-right" size={96} /></div>

              {/* Inner Content Centered */}
              <div className="relative z-10 max-w-sm sm:max-w-md w-full h-full my-auto flex flex-col justify-between items-center py-2">
                {/* TOP: "WALIMATUL'URSY ADAT SUNDA" */}
                <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">
                  <span className="text-[10.5px] sm:text-xs tracking-[0.34em] uppercase text-[#D4AF37] font-serif font-bold">
                    WALIMATUL'URSY ADAT SUNDA
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1E2D24] mt-1.5">
                    {groomDisplayName} <span className="font-light italic text-[#D4AF37]">&amp;</span> {brideDisplayName}
                  </h1>
                  <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#586E60] mt-1.5 font-medium">
                    {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* CENTER: Arched Couple Portrait Window with Grand Siger Crown */}
                <div className="relative z-20 my-auto py-2 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                      <SundaArchCrown size={195} />
                    </div>
                    <div className="relative w-44 h-56 sm:w-50 sm:h-64 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FFF1BA] via-[#D4AF37] to-[#2D4638] shadow-[0_14px_35px_rgba(45,70,56,0.22)] group">
                      <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                        <img 
                          src={coverImage} 
                          alt={`${groomDisplayName} & ${brideDisplayName}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1 px-3.5 py-1 rounded-full bg-white/95 border border-[#D4AF37]/50 shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#2D4638] font-bold">
                      Sunda Siger Parahyangan
                    </span>
                  </div>
                </div>

                {/* BOTTOM: Recipient & Open Invitation Button */}
                <div className="relative z-20 w-full flex flex-col items-center pb-3 sm:pb-4">
                  <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#D4AF37]/45 shadow-xs mb-3.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#586E60] block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <span className="font-serif text-sm font-bold text-[#2D4638] block truncate">
                      {guestName}
                    </span>
                  </div>

                  <button
                    onClick={handleOpen}
                    className="group relative w-full max-w-xs overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(45,70,56,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#2D4638] via-[#3E5C4B] to-[#1E3326] border border-[#D4AF37]/60"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <MailOpen className="w-4 h-4 text-[#FFF1BA]" />
                      <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#FFF1BA]">
                        BUKA UNDANGAN
                      </span>
                    </div>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : isMinangGadang ? (
          /* Minang Rumah Gadang: Royal Songket Arch Cover (Paket Heritage 70k) */
          <div className={`fixed inset-0 z-50 overflow-hidden select-none bg-[#120A0B] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}>
            <style>{`
              @keyframes goldShimmerSweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                40%, 100% { transform: translateX(350%) skewX(-20deg); }
              }
            `}</style>
            
            {/* DESKTOP FIXED LEFT ASIDE (5/12 or 1/2 screen) */}
            <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#7A1822] text-white border-r border-[#E1A83E]/40">
              {/* Panoramic Marawa Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={`${groomDisplayName} & ${brideDisplayName}`} 
                  className="w-full h-full object-cover object-center filter brightness-90 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#140608] via-[#7A1822]/85 to-[#2A050A]/90" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#140608]/40 to-[#140608]/90" />
                <MinangSongketWatermark className="opacity-[0.07]" />
              </div>

              {/* Gilded Inner Arch Frame Line */}
              <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#E1A83E]/45 pointer-events-none z-10" />

              {/* Central Content Column */}
              <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
                {/* TOP: Badges */}
                <div className="w-full flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D0A11]/85 backdrop-blur-md border border-[#E1A83E]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Crown className="w-3.5 h-3.5 text-[#E1A83E]" />
                    <span>Walimatul'ursy</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D0A11]/85 backdrop-blur-md border border-[#E1A83E]/60 shadow-lg text-[#FFF1BA] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E1A83E]" />
                    <span>Baralek Gadang</span>
                  </div>
                </div>

                {/* CENTER: Couple Portrait & Recipient Guest Card */}
                <div className="my-auto w-full flex flex-col items-center text-center py-4">
                  {/* Royal Octagon Couple Photo Frame with Songket Gold Border */}
                  <div className="mb-3">
                    <MinangRoyalOctagonFrame
                      imageSrc={coverImage}
                      altText={`${groomDisplayName} & ${brideDisplayName}`}
                      frameWidthClass="w-44 xl:w-52"
                      frameHeightClass="h-58 xl:h-68"
                      variant="crimson"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1 text-[#FFF1BA]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E1A83E] animate-pulse" />
                    <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                      THE WEDDING CELEBRATION OF
                    </p>
                    <Sparkles className="w-3.5 h-3.5 text-[#E1A83E] animate-pulse" />
                  </div>

                  <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#F5D77F] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {groomDisplayName} <span className="text-xl xl:text-2xl text-[#E1A83E] font-light italic font-serif">&amp;</span> {brideDisplayName}
                  </h1>

                  <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E1A83E] to-transparent mb-3" />

                  {/* Recipient Guest Card */}
                  <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#4A0D15]/90 via-[#3D0A11]/95 to-[#1A0406]/98 backdrop-blur-md border border-[#E1A83E]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(225,168,62,0.25)] mb-3">
                    <div className="absolute inset-1.5 rounded-xl border border-[#E1A83E]/25 pointer-events-none" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#E1A83E] font-serif font-semibold mb-0.5 text-center">
                      Kepada Yth. Bapak/Ibu/Saudara/i :
                    </p>
                    <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                      {guestName}
                    </h2>
                    <p className="text-[9.5px] tracking-wider text-[#FCEEE2] text-center font-sans mt-0.5">
                      Merupakan satu kehormatan atas kehadiran &amp; doa restu Anda
                    </p>
                  </div>
                </div>

                {/* BOTTOM: Venue Info */}
                <div className="w-full flex items-center justify-between text-xs text-[#FCEEE2] border-t border-[#E1A83E]/35 pt-3">
                  <span className="font-serif tracking-wide text-[#F9E5BA] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E1A83E]" />
                    Rumah Gadang Balai Adat
                  </span>
                  <span className="font-sans text-[#FFF8E7]">Bukittinggi, Sumatera Barat</span>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: FULL-HEIGHT & FULL-WIDTH OF RIGHT COLUMN ON DESKTOP, FULLSCREEN ON MOBILE */}
            <div className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto h-[100dvh] relative z-20 flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FAF6F0] lg:border-l lg:border-[#E1A83E]/35 shadow-2xl overflow-hidden">
              {/* Background Ambient Radial Glow & Songket Watermark */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(225,168,62,0.22)_0%,rgba(250,246,240,0.98)_70%)]" />
              <MinangSongketWatermark />

              {/* 4 Corner Songket Ornaments pinned to actual edges */}
              <div className="absolute top-0 left-0"><MinangCornerSongketCluster position="top-left" size={96} /></div>
              <div className="absolute top-0 right-0"><MinangCornerSongketCluster position="top-right" size={96} /></div>
              <div className="absolute bottom-0 left-0"><MinangCornerSongketCluster position="bottom-left" size={96} /></div>
              <div className="absolute bottom-0 right-0"><MinangCornerSongketCluster position="bottom-right" size={96} /></div>

              {/* Inner Content Centered */}
              <div className="relative z-10 max-w-sm sm:max-w-md w-full h-full my-auto flex flex-col justify-between items-center py-2">
                {/* TOP: "BARALEK GADANG MINANGKABAU" */}
                <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">
                  <span className="text-[10.5px] sm:text-xs tracking-[0.34em] uppercase text-[#C48E2E] font-serif font-bold">
                    BARALEK GADANG MINANGKABAU
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#1A1113] mt-1.5">
                    {groomDisplayName} <span className="font-light italic text-[#E1A83E]">&amp;</span> {brideDisplayName}
                  </h1>
                  <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#7D6B6E] mt-1.5 font-medium">
                    {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* CENTER: Royal Octagon Couple Portrait Window with Songket Gold Border */}
                <div className="relative z-20 my-auto py-2 flex flex-col items-center">
                  <div className="mb-2">
                    <MinangRoyalOctagonFrame
                      imageSrc={coverImage}
                      altText={`${groomDisplayName} & ${brideDisplayName}`}
                      frameWidthClass="w-48 sm:w-56"
                      frameHeightClass="h-62 sm:h-74"
                      variant="cream"
                    />
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1 px-4 py-1.5 rounded-full bg-white/95 border border-[#E1A83E]/50 shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-[#E1A83E]" />
                    <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#7A1822] font-bold">
                      Minang Rumah Gadang
                    </span>
                  </div>
                </div>

                {/* BOTTOM: Recipient & Open Invitation Button */}
                <div className="relative z-20 w-full flex flex-col items-center pb-3 sm:pb-4">
                  <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#E1A83E]/45 shadow-xs mb-3.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#7D6B6E] block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <span className="font-serif text-sm font-bold text-[#7A1822] block truncate">
                      {guestName}
                    </span>
                  </div>

                  <button
                    onClick={handleOpen}
                    className="group relative w-full max-w-xs overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(122,24,34,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#7A1822] via-[#8C1D28] to-[#5A1018] border border-[#E1A83E]/60"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <MailOpen className="w-4 h-4 text-[#FFF1BA]" />
                      <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#FFF1BA]">
                        BUKA UNDANGAN
                      </span>
                    </div>
                  </button>
                </div>
              </div>

            </div>

          </div>
        ) : isBaliKamasan ? (
          /* Bali Royal Kamasan: Full-Bleed Desktop Split Cover (Paket Heritage 70k) */
          <div className={`fixed inset-0 z-50 overflow-hidden select-none bg-[#1A0502] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}>
            <style>{`
              @keyframes goldShimmerSweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                40%, 100% { transform: translateX(350%) skewX(-20deg); }
              }
            `}</style>
            
            {/* DESKTOP FIXED LEFT ASIDE (5/12 or 1/2 screen) */}
            <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#240A04] text-white border-r border-[#E5B232]/40">
              {/* Panoramic Bali Pura Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={`${groomDisplayName} & ${brideDisplayName}`} 
                  className="w-full h-full object-cover object-center filter brightness-90 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A0502] via-[#381308]/90 to-[#1F0703]/95" />
                <div className="absolute inset-0 bg-radial from-transparent via-[#1A0502]/40 to-[#1A0502]/90" />
                <BaliPolengWatermark className="opacity-[0.06]" />
              </div>

              {/* Gilded Inner Frame Line */}
              <div className="absolute inset-5 xl:inset-7 rounded-[32px] border border-[#E5B232]/45 pointer-events-none z-10" />

              {/* Central Content Column */}
              <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-1">
                {/* TOP: Badges */}
                <div className="w-full flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D140A]/85 backdrop-blur-md border border-[#E5B232]/60 shadow-lg text-[#FFFDF5] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Crown className="w-3.5 h-3.5 text-[#E5B232]" />
                    <span>Pawiwahan Agung</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D140A]/85 backdrop-blur-md border border-[#E5B232]/60 shadow-lg text-[#FFFDF5] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B232]" />
                    <span>Adat Bali Kamasan</span>
                  </div>
                </div>

                {/* CENTER: Couple Portrait & Recipient Guest Card */}
                <div className="my-auto w-full flex flex-col items-center text-center py-4">
                  {/* Royal Majestic Pura Candi Bentar Frame */}
                  <div className="mb-3 pt-2">
                    <BaliMajesticPuraFrame
                      imageSrc={coverImage}
                      altText={`${groomDisplayName} & ${brideDisplayName}`}
                      frameWidthClass="w-44 xl:w-52"
                      frameHeightClass="h-58 xl:h-68"
                      variant="terracotta"
                    />
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1 text-[#FFFDF5]">
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B232] animate-pulse" />
                    <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                      PAWIWAHAN AGUNG OF
                    </p>
                    <Sparkles className="w-3.5 h-3.5 text-[#E5B232] animate-pulse" />
                  </div>

                  <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF8E7] to-[#FCE59F] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {groomDisplayName} <span className="text-xl xl:text-2xl text-[#E5B232] font-light italic font-serif">&amp;</span> {brideDisplayName}
                  </h1>

                  <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#E5B232] to-transparent mb-3" />

                  {/* Recipient Guest Card */}
                  <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#3D140A]/90 via-[#2A0C06]/95 to-[#150402]/98 backdrop-blur-md border border-[#E5B232]/65 shadow-[0_16px_40px_rgba(0,0,0,0.65),0_0_20px_rgba(229,178,50,0.25)] mb-3">
                    <div className="absolute inset-1.5 rounded-xl border border-[#E5B232]/25 pointer-events-none" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#E5B232] font-serif font-semibold mb-0.5 text-center">
                      Kepada Yth. Bapak/Ibu/Saudara/i :
                    </p>
                    <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                      {guestName}
                    </h2>
                    <p className="text-[9.5px] tracking-wider text-[#FCE5D8] text-center font-sans mt-0.5">
                      Matur suksma atas kehadiran &amp; doa restu semeton sinamian
                    </p>
                  </div>
                </div>

                {/* BOTTOM: Venue Info */}
                <div className="w-full flex items-center justify-between text-xs text-[#FCE5D8] border-t border-[#E5B232]/35 pt-3">
                  <span className="font-serif tracking-wide text-[#FCE59F] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E5B232]" />
                    Puri Ageng Kamasan
                  </span>
                  <span className="font-sans text-[#FFF8E7]">Klungkung, Bali</span>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: FULLSCREEN ON MOBILE, 7/12 OR 1/2 ON DESKTOP */}
            <div className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto h-[100dvh] relative z-20 flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FDFBF7] lg:border-l lg:border-[#E5B232]/35 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(229,178,50,0.22)_0%,rgba(253,251,247,0.98)_70%)]" />
              <BaliPolengWatermark />

              {/* Regal Double Prada Border Stationery Frame */}
              <div className="absolute inset-2.5 sm:inset-4 rounded-[28px] border border-[#E5B232]/40 pointer-events-none z-10" />
              <div className="absolute inset-3.5 sm:inset-5 rounded-[24px] border border-[#E5B232]/20 border-dashed pointer-events-none z-10" />

              {/* 4 Corner Kamasan Clusters */}
              <div className="absolute top-0 left-0"><BaliKamasanCornerCluster position="top-left" size={96} /></div>
              <div className="absolute top-0 right-0"><BaliKamasanCornerCluster position="top-right" size={96} /></div>
              <div className="absolute bottom-0 left-0"><BaliKamasanCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute bottom-0 right-0"><BaliKamasanCornerCluster position="bottom-right" size={96} /></div>

              {/* Content Column */}
              <div className="relative z-10 max-w-sm sm:max-w-md w-full h-full my-auto flex flex-col justify-between items-center py-2">
                <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">
                  <span className="text-[10.5px] sm:text-xs tracking-[0.34em] uppercase text-[#783A1E] font-serif font-bold">
                    PAWIWAHAN AGUNG ADAT BALI
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2E1E17] mt-1.5">
                    {groomDisplayName} <span className="font-light italic text-[#E5B232]">&amp;</span> {brideDisplayName}
                  </h1>
                  <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#785A4E] mt-1.5 font-medium">
                    {new Date(invitation?.wedding_date || '2026-10-12').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* CENTER: Couple Portrait Window */}
                <div className="relative z-20 my-auto py-2 pt-6 flex flex-col items-center">
                  <div className="mb-2">
                    <BaliMajesticPuraFrame
                      imageSrc={coverImage}
                      altText={`${groomDisplayName} & ${brideDisplayName}`}
                      frameWidthClass="w-48 sm:w-56"
                      frameHeightClass="h-62 sm:h-74"
                      variant="cream"
                    />
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1 px-4 py-1.5 rounded-full bg-white/95 border border-[#E5B232]/50 shadow-xs">
                    <Crown className="w-3.5 h-3.5 text-[#E5B232]" />
                    <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#783A1E] font-bold">
                      Bali Royal Kamasan
                    </span>
                  </div>
                </div>

                {/* BOTTOM: Recipient & Open Invitation Button */}
                <div className="relative z-20 w-full flex flex-col items-center pb-3 sm:pb-4">
                  <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#E5B232]/45 shadow-xs mb-3.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#785A4E] block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <span className="font-serif text-sm font-bold text-[#783A1E] block truncate">
                      {guestName}
                    </span>
                  </div>

                  <button
                    onClick={handleOpen}
                    className="group relative w-full max-w-xs overflow-hidden rounded-full py-3.5 px-8 shadow-[0_12px_35px_rgba(120,58,30,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#783A1E] via-[#A85228] to-[#63220E] border border-[#FCE59F]"
                  >
                    <div className="relative flex items-center justify-center gap-2.5">
                      <MailOpen className="w-4 h-4 text-[#FCE59F]" />
                      <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white">
                        BUKA UNDANGAN
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isMoroccanNights ? (
          /* Moroccan Arabian Nights: Grand Moorish Alhambra Palace Cover (Paket Heritage 70k) */
          <div className={`fixed inset-0 z-50 overflow-hidden select-none bg-[#081224] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'}`}>
            <style>{`
              @keyframes moroccanGoldSweep {
                0% { transform: translateX(-150%) skewX(-20deg); }
                50%, 100% { transform: translateX(250%) skewX(-20deg); }
              }
              .moroccan-gold-sweep {
                animation: moroccanGoldSweep 3.5s ease-in-out infinite;
              }
            `}</style>

            {/* DESKTOP FIXED LEFT ASIDE (5/12 or 1/2 screen) - VISUAL STAGE & WEDDING PORTRAIT */}
            <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between items-center p-8 xl:p-12 overflow-hidden select-none bg-[#0B1A33] text-white border-r border-[#DE9B35]/40 shadow-2xl">
              {/* Starry Night Sky & Panoramic Palace Backdrop */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <img 
                  src={coverImage} 
                  alt={`${groomDisplayName} & ${brideDisplayName}`} 
                  className="w-full h-full object-cover object-center filter brightness-90 scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060D1A] via-[#0A172E]/90 to-[#0B1A33]/92" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(222,155,53,0.25)_0%,rgba(6,13,26,0.92)_75%)]" />
                <MoroccanZellijWatermark className="opacity-[0.08]" />
                <FloatingSaharaStardust />
              </div>

              {/* Hanging Moroccan Filigree Lanterns at Top */}
              <div className="absolute top-0 left-0 right-0 z-10 flex justify-between px-6 pointer-events-none">
                <MoroccanFanousLantern size={46} chainHeight={40} />
                <MoroccanFanousLantern size={36} chainHeight={20} />
                <div className="flex-1" />
                <MoroccanFanousLantern size={38} chainHeight={28} />
                <MoroccanFanousLantern size={50} chainHeight={50} />
              </div>

              {/* Gilded Inner Arch Frame Line */}
              <div className="absolute inset-5 xl:inset-7 rounded-[36px] border border-[#DE9B35]/40 pointer-events-none z-10" />

              {/* Central Content Column */}
              <div className="relative z-20 w-full max-w-[440px] xl:max-w-[480px] mx-auto flex flex-col justify-between h-full py-2">
                {/* TOP: Badges */}
                <div className="w-full flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102242]/90 backdrop-blur-md border border-[#DE9B35]/70 shadow-lg text-[#FFF4D0] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Moon className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
                    <span>Walimatul 'Ursy</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#102242]/90 backdrop-blur-md border border-[#DE9B35]/70 shadow-lg text-[#FFF4D0] text-[10.5px] font-serif uppercase tracking-[0.2em]">
                    <Star className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
                    <span>Moroccan Royal</span>
                  </div>
                </div>

                {/* CENTER: Grand Couple Portrait in Moorish Horseshoe Arch */}
                <div className="my-auto w-full flex flex-col items-center text-center py-2">
                  <div className="relative mb-3">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                      <MoroccanHorseshoeArch size={230} />
                    </div>
                    <div className="relative mx-auto w-48 h-60 xl:w-56 xl:h-72 rounded-t-[110px] rounded-b-2xl overflow-hidden border-2 border-[#DE9B35] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(222,155,53,0.35)] p-1.5 bg-gradient-to-b from-[#FFF4D0] via-[#DE9B35] to-[#102242] group">
                      <div className="w-full h-full rounded-t-[102px] rounded-b-xl overflow-hidden relative">
                        <img 
                          src={coverImage} 
                          alt={`${groomDisplayName} & ${brideDisplayName}`}
                          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#081224]/80 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1 text-[#FFF4D0]">
                    <Sparkles className="w-3.5 h-3.5 text-[#DE9B35] animate-pulse" />
                    <p className="text-[11px] tracking-[0.3em] uppercase font-serif font-semibold">
                      THE WEDDING CELEBRATION OF
                    </p>
                    <Sparkles className="w-3.5 h-3.5 text-[#DE9B35] animate-pulse" />
                  </div>

                  <h1 className="font-serif text-3xl xl:text-4xl 2xl:text-5xl font-normal leading-[1.08] tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0C2] to-[#DE9B35] drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
                    {groomDisplayName} <span className="text-xl xl:text-2xl text-[#DE9B35] font-light italic font-serif">&amp;</span> {brideDisplayName}
                  </h1>

                  <div className="w-24 h-0.5 mx-auto bg-gradient-to-r from-transparent via-[#DE9B35] to-transparent mb-3" />

                  {/* Recipient Guest Card */}
                  <div className="w-full relative p-3.5 xl:p-4 rounded-2xl bg-gradient-to-b from-[#102242]/95 via-[#0A172E]/98 to-[#060D1A]/98 backdrop-blur-md border border-[#DE9B35]/70 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(222,155,53,0.3)] mb-2">
                    <div className="absolute inset-1.5 rounded-xl border border-[#DE9B35]/30 pointer-events-none" />
                    <p className="text-[10px] uppercase tracking-[0.25em] text-[#DE9B35] font-serif font-semibold mb-0.5 text-center">
                      Kepada Yth. Bapak/Ibu/Saudara/i :
                    </p>
                    <h2 className="text-lg xl:text-xl font-serif font-bold text-white tracking-wide text-center drop-shadow-sm my-0.5">
                      {guestName}
                    </h2>
                    <p className="text-[9.5px] tracking-wider text-[#D1DCE8] text-center font-sans mt-0.5">
                      Merupakan satu kehormatan atas kehadiran &amp; doa restu Anda
                    </p>
                  </div>
                </div>

                {/* BOTTOM: Date & Venue Info */}
                <div className="w-full flex items-center justify-between text-xs text-[#D1DCE8] border-t border-[#DE9B35]/40 pt-3">
                  <span className="font-serif tracking-wide text-[#FFF4D0] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#DE9B35]" />
                    Grand Sahara Pavilion
                  </span>
                  <span className="font-sans text-[#FFF4D0]">
                    {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL: OFFICIAL ROYAL INVITATION CARD ON WARM IVORY STATIONERY */}
            <div className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto h-[100dvh] relative z-20 flex flex-col justify-between items-center text-center p-6 sm:p-8 bg-[#FAF7F2] lg:border-l lg:border-[#DE9B35]/35 shadow-2xl overflow-hidden">
              {/* Background Ambient Radial Glow & Zellij Tile Watermark */}
              <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(222,155,53,0.18)_0%,rgba(250,247,242,0.98)_70%)]" />
              <MoroccanZellijWatermark className="opacity-[0.06]" />

              {/* 4 Corner Arabesque Filigree Clusters */}
              <div className="absolute top-0 left-0"><MoroccanCornerArabesque position="top-left" size={96} /></div>
              <div className="absolute top-0 right-0"><MoroccanCornerArabesque position="top-right" size={96} /></div>
              <div className="absolute bottom-0 left-0"><MoroccanCornerArabesque position="bottom-left" size={96} /></div>
              <div className="absolute bottom-0 right-0"><MoroccanCornerArabesque position="bottom-right" size={96} /></div>

              {/* Inner Content Centered */}
              <div className="relative z-10 max-w-sm sm:max-w-md w-full h-full my-auto flex flex-col justify-between items-center py-2">
                {/* TOP: "WALIMATUL'URSY ADAT MAROKO" */}
                <div className="relative z-20 flex flex-col items-center pt-3 sm:pt-4">
                  <span className="text-[10.5px] sm:text-xs tracking-[0.34em] uppercase text-[#DE9B35] font-serif font-bold">
                    WALIMATUL'URSY ADAT MAROKO
                  </span>
                  <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#0B1A33] mt-1.5">
                    {groomDisplayName} <span className="font-light italic text-[#DE9B35]">&amp;</span> {brideDisplayName}
                  </h1>
                  <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#705A42] mt-1.5 font-medium">
                    {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>

                {/* CENTER: Arched Couple Portrait Window with Moorish Horseshoe Arch */}
                <div className="relative z-20 my-auto py-2 flex flex-col items-center">
                  <div className="relative mb-2">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                      <MoroccanHorseshoeArch size={195} />
                    </div>
                    <div className="relative w-44 h-56 sm:w-50 sm:h-64 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#FFF4D0] via-[#DE9B35] to-[#0B1A33] shadow-[0_14px_35px_rgba(11,26,51,0.22)] group">
                      <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                        <img 
                          src={coverImage} 
                          alt={`${groomDisplayName} & ${brideDisplayName}`}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-2 mt-1 px-3.5 py-1 rounded-full bg-white/95 border border-[#DE9B35]/50 shadow-xs">
                    <Moon className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
                    <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#0B1A33] font-bold">
                      Moroccan Arabian Nights
                    </span>
                    <Star className="w-3.5 h-3.5 text-[#DE9B35] fill-[#DE9B35]" />
                  </div>
                </div>

                {/* BOTTOM: Recipient & Open Invitation Button */}
                <div className="relative z-20 w-full flex flex-col items-center pb-3 sm:pb-4">
                  <div className="w-full max-w-xs p-3 rounded-2xl bg-white/95 border border-[#DE9B35]/45 shadow-xs mb-3.5">
                    <span className="text-[10px] uppercase tracking-widest text-[#705A42] block mb-0.5">
                      Kepada Yth. Bapak/Ibu/Saudara/i:
                    </span>
                    <span className="font-serif text-sm font-bold text-[#0B1A33] block truncate">
                      {guestName}
                    </span>
                  </div>

                  <button
                    onClick={handleOpen}
                    className="group relative w-full max-w-xs overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(11,26,51,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#0B1A33] via-[#162D55] to-[#0B1A33] border border-[#DE9B35]"
                  >
                    <div className="relative flex items-center justify-center gap-2">
                      <MailOpen className="w-4 h-4 text-[#FFF4D0]" />
                      <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#FFF4D0]">
                        BUKA UNDANGAN
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : isIvoryPearl ? (
          /* Ivory Pearl: Modern Editorial Fine-Art Arched Cover (Distinct from Noir Gold) */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#FAF8F5] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}>
            {/* Background Ambient Radial Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.22)_0%,rgba(250,248,245,0.98)_70%)]" />

            {/* Centered Mobile/Portrait Cover Frame */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[94vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-7 shadow-[0_25px_80px_rgba(180,160,140,0.25),0_0_30px_rgba(197,168,128,0.15)] sm:border border-[#C5A880]/50 bg-white">
              
              {/* Rich Blooming Floral Corner Frames */}
              <div className="absolute -top-1 -left-1"><IvoryFloralCornerCluster position="top-left" size={96} /></div>
              <div className="absolute -top-1 -right-1"><IvoryFloralCornerCluster position="top-right" size={96} /></div>
              <div className="absolute -bottom-1 -left-1"><IvoryFloralCornerCluster position="bottom-left" size={96} /></div>
              <div className="absolute -bottom-1 -right-1"><IvoryFloralCornerCluster position="bottom-right" size={96} /></div>

              {/* Four Pearl Corners (Fine Metallic Accents) */}
              <div className="absolute top-3.5 left-3.5 opacity-70"><PearlCorner position="top-left" size={26} /></div>
              <div className="absolute top-3.5 right-3.5 opacity-70"><PearlCorner position="top-right" size={26} /></div>
              <div className="absolute bottom-3.5 left-3.5 opacity-70"><PearlCorner position="bottom-left" size={26} /></div>
              <div className="absolute bottom-3.5 right-3.5 opacity-70"><PearlCorner position="bottom-right" size={26} /></div>

              {/* TOP: "THE WEDDING INVITATION" */}
              <div className="relative z-20 flex flex-col items-center pt-5 sm:pt-6">
                <span className="text-[10px] sm:text-xs tracking-[0.32em] uppercase text-[#8C6D3F] font-serif font-bold">
                  THE WEDDING INVITATION
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#2A241E] mt-1.5">
                  {groomDisplayName} <span className="font-light italic text-[#B38F5C]">&amp;</span> {brideDisplayName}
                </h1>
                <p className="text-[11px] font-sans tracking-[0.22em] uppercase text-[#7D736A] mt-1.5 font-medium">
                  {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* CENTER: Arched Couple Portrait Window with Floral Garland Crown */}
              <div className="relative z-20 my-auto py-3 flex flex-col items-center">
                <div className="relative mb-2">
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20">
                    <IvoryArchFloralCrown size={190} />
                  </div>
                  <div className="relative w-44 h-56 sm:w-48 sm:h-60 rounded-t-[100px] rounded-b-2xl overflow-hidden p-1.5 bg-gradient-to-b from-[#EADBCC] via-[#C5A880] to-[#9E7B4B] shadow-[0_12px_35px_rgba(180,150,120,0.25)] group">
                    <div className="w-full h-full rounded-t-[94px] rounded-b-xl overflow-hidden relative">
                      <img 
                        src={coverImage} 
                        alt={`${groomDisplayName} & ${brideDisplayName}`}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 mt-1 px-3 py-0.5 rounded-full bg-[#FAF5EE] border border-[#C5A880]/30">
                  <span className="text-[10px] font-serif uppercase tracking-[0.2em] text-[#8C6D3F] font-semibold">
                    Special Invitation
                  </span>
                </div>
              </div>

              {/* BOTTOM: Recipient & Open Invitation Button */}
              <div className="relative z-20 w-full flex flex-col items-center pb-4 sm:pb-5">
                <div className="w-full max-w-xs p-3 rounded-2xl bg-[#FAF6F0] border border-[#C5A880]/35 shadow-xs mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#7D736A] block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#8C6D3F] block truncate">
                    {guestName}
                  </span>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(180,160,140,0.35)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#C5A880] via-[#B8976C] to-[#9A7B52] border border-[#EADBCC]"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <MailOpen className="w-4 h-4 text-white" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white">
                      BUKA UNDANGAN
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isNoirGold ? (
          /* Noir & Champagne Gold Luxury Cover */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#090A0C] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}>
            {/* Background Radial Glow */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.15)_0%,rgba(9,10,12,0.95)_70%)]" />

            {/* Centered Mobile/Portrait Cover Frame */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[92vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_30px_rgba(212,175,55,0.15)] sm:border border-[#D4AF37]/50 bg-[#0E0F13]">
              
              {/* Gilded Floral Corner Clusters */}
              <div className="absolute -top-1 -left-1"><GildedFloralCornerCluster position="top-left" size={90} /></div>
              <div className="absolute -top-1 -right-1"><GildedFloralCornerCluster position="top-right" size={90} /></div>
              <div className="absolute -bottom-1 -left-1"><GildedFloralCornerCluster position="bottom-left" size={90} /></div>
              <div className="absolute -bottom-1 -right-1"><GildedFloralCornerCluster position="bottom-right" size={90} /></div>

              {/* Four Regal Corners */}
              <div className="absolute top-3 left-3 opacity-60"><RegalCorner position="top-left" size={30} /></div>
              <div className="absolute top-3 right-3 opacity-60"><RegalCorner position="top-right" size={30} /></div>
              <div className="absolute bottom-3 left-3 opacity-60"><RegalCorner position="bottom-left" size={30} /></div>
              <div className="absolute bottom-3 right-3 opacity-60"><RegalCorner position="bottom-right" size={30} /></div>

              {/* TOP: "THE WEDDING OF" */}
              <div className="relative z-20 flex flex-col items-center pt-6 sm:pt-8">
                <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#F5D77F] font-serif font-bold">
                  THE WEDDING OF
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-[#FFF1BA] via-[#ECC880] to-[#C99E3D] bg-clip-text text-transparent mt-2">
                  {groomDisplayName} &amp; {brideDisplayName}
                </h1>
                <p className="text-[11px] font-sans tracking-[0.2em] uppercase text-stone-400 mt-2 font-medium">
                  {new Date(invitation?.wedding_date || '2026-12-28').toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>

              {/* CENTER: Royal Wax Seal Monogram */}
              <div className="relative z-20 my-auto py-6 flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#8A6A1E] via-[#F5D77F] to-[#D4AF37] shadow-[0_10px_35px_rgba(212,175,55,0.35)] flex items-center justify-center animate-pulse" style={{ animationDuration: '4s' }}>
                  <div className="w-full h-full rounded-full bg-[#18191F] border border-[#F5D77F]/60 flex flex-col items-center justify-center text-center">
                    <Crown className="w-6 h-6 text-[#F5D77F] mb-1" />
                    <span className="font-serif text-lg font-bold tracking-widest text-[#FFF1BA]">
                      {groomDisplayName.charAt(0)}&amp;{brideDisplayName.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>

              {/* BOTTOM: Recipient & Open Invitation Button */}
              <div className="relative z-20 w-full flex flex-col items-center pb-4 sm:pb-6">
                <div className="w-full max-w-xs p-3 rounded-2xl bg-black/50 border border-[#D4AF37]/30 backdrop-blur-xs mb-5">
                  <span className="text-[10px] uppercase tracking-widest text-stone-400 block mb-0.5">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <span className="font-serif text-sm font-bold text-[#F5D77F] block truncate">
                    {guestName}
                  </span>
                </div>

                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_35px_rgba(212,175,55,0.3)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#D4AF37] via-[#F5D77F] to-[#B38F24] border border-[#FFF1BA]"
                >
                  <div className="relative flex items-center justify-center gap-2">
                    <MailOpen className="w-4 h-4 text-black" />
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-black">
                      BUKA UNDANGAN
                    </span>
                  </div>
                </button>
              </div>

            </div>
          </div>
        ) : isKualaLumpur ? (
          /* Kuala Lumpur Heritage Royal Songket Cover (Matches Fullscreen Centered Mobile/Desktop) */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#FDF8F7] transition-all duration-700 ease-out ${isCoverExiting ? 'opacity-0 scale-95 translate-y-[-24px] pointer-events-none' : 'opacity-100 scale-100 translate-y-0'} shadow-2xl`}>
            
            {/* Ambient Scenic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/themes/kuala-lumpur-heritage/cover-skyline.jpg" 
                alt="Kuala Lumpur Skyline Watercolor" 
                className="w-full h-full object-cover object-center filter blur-[4px] scale-105 opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#FDF8F7]/85 via-[#FFF2F5]/90 to-[#FDF8F7]/95" />
            </div>

            {/* Centered Mobile/Portrait Cover Frame matching Screenshot 1 */}
            <div className="relative z-10 flex items-center justify-center w-full h-[100dvh] sm:h-auto sm:w-auto">
              {/* Botanical Sakura Surround in the White Outer Area ("Bunga Sakura Memutari Undangan") */}
              <SakuraInvitationSurround />

              <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:min-h-[700px] sm:max-h-[95vh] sm:rounded-[36px] overflow-hidden flex flex-col justify-between items-center text-center p-6 sm:p-7 shadow-[0_25px_80px_rgba(180,90,110,0.3)] sm:border-[2px] sm:border-[#E8B5BE] bg-white">
              
              {/* Cover Art Image Background */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <img 
                  src="/themes/kuala-lumpur-heritage/cover-skyline.jpg" 
                  alt="Kuala Lumpur Skyline & Royal Songket Arch" 
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/30 via-transparent to-transparent" />
              </div>

              {/* Sakura Blossoms Frame: Kanan, Kiri, Atas, Bawah */}
              <SakuraCoverFrame />

              {/* TOP: "THE WEDDING OF" */}
              <div className="relative z-20 flex flex-col items-center pt-8 sm:pt-10">
                <p 
                  className="text-xs sm:text-[13px] tracking-[0.25em] uppercase text-[#6B2F3D] font-serif font-bold drop-shadow-sm"
                  style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}
                >
                  THE WEDDING OF
                </p>
              </div>

              {/* CENTER: Couple Names "Hafiz" & "Syafika" in Editorial High-Contrast Serif */}
              <div className="relative z-20 flex flex-col items-center my-auto py-2 w-full max-w-[320px]">
                <h1 
                  className="text-5xl sm:text-6xl text-[#6D2637] font-normal tracking-tight leading-[1.05] drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {groomDisplayName}
                </h1>
                <h1 
                  className="text-5xl sm:text-6xl text-[#6D2637] font-normal tracking-tight leading-[1.05] drop-shadow-sm mt-1"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  {brideDisplayName}
                </h1>
              </div>

              {/* BOTTOM: "KEPADA", Guest Name & "OPEN INVITATION" Button */}
              <div className="relative z-20 flex flex-col items-center w-full max-w-[320px] gap-3 pb-8 sm:pb-10">
                {/* Kepada Label */}
                <p className="text-[11px] tracking-[0.3em] uppercase text-[#7A3648] font-serif font-semibold">
                  KEPADA
                </p>

                {/* Recipient Guest Name */}
                <p className="text-sm sm:text-base font-serif font-bold text-[#4A1A26] tracking-wide line-clamp-1 drop-shadow-sm mb-1">
                  {guestName}
                </p>

                {/* OPEN INVITATION Button (Screenshot 1 Match: Plum/Berry Pill with Soft Glow & Light Sweep) */}
                <button
                  onClick={handleOpen}
                  className="group relative w-full overflow-hidden rounded-full py-3.5 px-8 shadow-[0_10px_30px_rgba(148,59,78,0.45)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer bg-gradient-to-r from-[#943B4E] via-[#853042] to-[#6A2434] border border-[#F0CDD4]"
                >
                  <div 
                    className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                  <div className="relative flex items-center justify-center gap-2">
                    <span className="text-xs font-serif font-bold uppercase tracking-[0.25em] text-white drop-shadow-sm">
                      OPEN INVITATION
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#FFDF80] animate-pulse" />
                  </div>
                </button>
              </div>

            </div>
          </div>
        </div>
        ) : isMidnightCelestial ? (
          /* Midnight Celestial Star Masterpiece Cover - Split Desktop (Right 58%/50% on Desktop, 100% on Mobile) */
          <div className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#38BDF8]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#030712] transition-opacity duration-700 ${isCoverExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Celestial Starlight Portal Gate Flash when Opening */}
            {isCoverExiting && (
              <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="w-[180vw] h-[180vh] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.95)_0%,rgba(56,189,248,0.7)_35%,rgba(129,140,248,0.3)_60%,transparent_80%)] animate-pulse" />
              </div>
            )}

            {/* Background Nebula & Twinkling Stars */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={coverImage || '/photos/photo-7.jpg'} 
                alt="Midnight Celestial Sky" 
                className="w-full h-full object-cover object-center scale-105 filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-[#050B18]/90 to-[#030712]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.2)_0%,rgba(3,7,18,0.95)_75%)]" />
            </div>

            {/* Corner Constellations */}
            <div className="absolute top-3 left-3"><CelestialCornerFlourish position="top-left" size={60} /></div>
            <div className="absolute top-3 right-3"><CelestialCornerFlourish position="top-right" size={60} /></div>
            <div className="absolute bottom-3 left-3"><CelestialCornerFlourish position="bottom-left" size={60} /></div>
            <div className="absolute bottom-3 right-3"><CelestialCornerFlourish position="bottom-right" size={60} /></div>

            {/* Centered Invitation Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:max-h-[94vh] sm:rounded-3xl overflow-hidden flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#0A132B]/95 via-[#060D1E]/98 to-[#030712] text-white shadow-[0_25px_70px_rgba(0,0,0,0.85),_0_0_40px_rgba(56,189,248,0.3)] sm:border-2 sm:border-[#38BDF8]/40 p-4 xs:p-6 sm:p-7">
              {/* Top Banner */}
              <div className="w-full bg-[#050B18]/90 py-1.5 xs:py-2 px-3 xs:px-4 rounded-full border border-[#38BDF8]/40 flex items-center justify-center gap-2 shadow-xs">
                <Star className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
                <p className="text-[9px] xs:text-[10px] font-serif font-bold tracking-[0.25em] uppercase text-[#BAE6FD]">
                  MIDNIGHT CELESTIAL • MASTERPIECE
                </p>
                <Star className="w-3.5 h-3.5 text-[#38BDF8] animate-pulse" />
              </div>

              {/* Middle Card Content */}
              <div className="flex-1 w-full flex flex-col items-center justify-center px-2 xs:px-4 py-2 xs:py-3 overflow-y-auto">
                <div className="mb-2 xs:mb-2.5">
                  <CelestialCrescentFrame
                    imageSrc={coverImage}
                    altText={`${groomDisplayName} & ${brideDisplayName}`}
                    frameWidthClass="w-32 xs:w-36 sm:w-44"
                    frameHeightClass="h-42 xs:h-48 sm:h-56"
                  />
                </div>

                <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.3em] text-[#38BDF8] font-serif font-semibold mb-1">
                  THE WEDDING INVITATION
                </p>

                <h1 className="text-xl xs:text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#BAE6FD] mb-1 xs:mb-1.5 tracking-wide drop-shadow-sm">
                  {groomDisplayName} <span className="font-light italic text-[#38BDF8]">&amp;</span> {brideDisplayName}
                </h1>

                {/* Event Date Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#050B18]/90 border border-[#38BDF8]/40 text-[#BAE6FD] text-[9.5px] xs:text-[10px] sm:text-[11px] font-serif font-medium mb-1.5 xs:mb-2">
                  <Calendar className="w-3 h-3 text-[#38BDF8]" />
                  <span>
                    {events?.[0]?.event_date 
                      ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Senin, 12 Oktober 2026'}
                  </span>
                </div>

                {/* Guest Box */}
                <div className="w-full bg-[#050B18]/90 p-2 xs:p-2.5 rounded-2xl border border-[#94A3B8]/30 mb-2 xs:mb-2.5 shadow-inner text-center">
                  <p className="text-[8.5px] xs:text-[9px] text-[#94A3B8] uppercase tracking-wider mb-0.5 font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </p>
                  <p className="font-serif text-sm xs:text-base font-bold text-white line-clamp-1">
                    {guestName}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] text-[8.5px] xs:text-[9px] font-serif font-semibold mt-1">
                    <Crown size={10} />
                    <span>Tamu Undangan VIP</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Open Invitation Button */}
              <div className="w-full pt-1">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="w-full py-2.5 xs:py-3 px-4 xs:px-6 rounded-full bg-gradient-to-r from-[#38BDF8] via-white to-[#38BDF8] text-[#030712] font-serif font-bold text-[11px] xs:text-xs uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(56,189,248,0.5)] hover:shadow-[0_10px_28px_rgba(56,189,248,0.7)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Moon className="w-4 h-4 text-[#030712]" />
                  <span>BUKA UNDANGAN</span>
                  <Sparkles className="w-4 h-4 text-[#030712] animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        ) : isBurgundyWine ? (
          /* Burgundy Wine Classic Masterpiece Cover - Full Editorial Right Folio (Right 58%/50% Desktop, Fullscreen Mobile) */
          <div className={`fixed top-0 right-0 h-[100dvh] w-full lg:w-7/12 xl:w-1/2 z-50 flex flex-col justify-between items-center text-center p-6 sm:p-8 overflow-hidden select-none lg:border-l lg:border-[#D4AF37]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#19030A] transition-opacity duration-700 ${isCoverExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Burgundy Portal Flash when Opening */}
            {isCoverExiting && (
              <div className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden">
                <div className="w-[180vw] h-[180vh] bg-[radial-gradient(circle_at_center,rgba(255,247,248,0.95)_0%,rgba(229,197,123,0.65)_35%,rgba(128,22,54,0.45)_60%,transparent_80%)]" />
              </div>
            )}

            {/* Background Velvet Radiance */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={coverImage || '/photos/photo-7.jpg'} 
                alt="Burgundy Wine Velvet Backdrop" 
                className="w-full h-full object-cover object-center scale-105 opacity-25 filter blur-[2px]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#19030A]/92 via-[#2B0713]/85 to-[#19030A]/96" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(128,22,54,0.42)_0%,rgba(43,7,19,0.28)_55%,rgba(25,3,10,0.95)_100%)]" />
            </div>

            {/* Ambient Stardust */}
            <FloatingBurgundyStardust count={14} />

            {/* Architectural Gold Border & Corner Flourishes Framing the Cover Folio */}
            <div className="absolute inset-3 sm:inset-5 rounded-3xl border border-[#D4AF37]/25 pointer-events-none z-10" />
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4"><BurgundyBaroqueCornerFlourish position="top-left" size={50} /></div>
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4"><BurgundyBaroqueCornerFlourish position="top-right" size={50} /></div>
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4"><BurgundyBaroqueCornerFlourish position="bottom-left" size={50} /></div>
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4"><BurgundyBaroqueCornerFlourish position="bottom-right" size={50} /></div>

            {/* Inner Editorial Content Column */}
            <div className="relative z-20 w-full max-w-sm sm:max-w-md h-full mx-auto flex flex-col justify-between items-center text-center py-2 sm:py-4 overflow-y-auto no-scrollbar">
              {/* Top Editorial Title */}
              <div className="w-full pt-2 sm:pt-3 shrink-0">
                <p className="text-[10px] sm:text-xs font-serif font-bold tracking-[0.34em] uppercase text-[#E5C57B] mb-1.5">
                  BURGUNDY WINE CLASSIC
                </p>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7F8] via-[#F9EEDB] to-[#E5C57B] tracking-tight leading-tight drop-shadow-sm">
                  {groomDisplayName} <span className="font-light italic text-[#E5C57B]">&amp;</span> {brideDisplayName}
                </h1>
                <p className="text-[11px] sm:text-xs text-[#E0C2CA] font-serif tracking-[0.18em] uppercase mt-1.5">
                  {events?.[0]?.event_date 
                    ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Senin, 12 Oktober 2026'}
                </p>
              </div>

              {/* Center Royal Cameo Frame with Generous Clearance for Crest & Single-line Seal */}
              <div className="my-auto pt-7 pb-6 shrink-0 flex flex-col items-center justify-center">
                <BurgundyCameoFrame
                  imageSrc={coverImage || '/photos/photo-7.jpg'}
                  altText={`${groomDisplayName} & ${brideDisplayName}`}
                  frameWidthClass="w-36 xs:w-42 sm:w-52"
                  frameHeightClass="h-46 xs:h-54 sm:h-68"
                />
              </div>

              {/* Bottom Recipient Card & Primary Open Action */}
              <div className="w-full max-w-xs flex flex-col items-center gap-3 pb-2 shrink-0">
                <div className="w-full px-4 py-3 rounded-2xl bg-[#260611]/90 border border-[#E5C57B]/35 text-center shadow-md">
                  <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#E0C2CA] block font-serif">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </span>
                  <p className="font-serif text-sm sm:text-base font-bold text-[#FFF7F8] line-clamp-1 mt-0.5">
                    {guestName}
                  </p>
                  <p className="text-[10px] text-[#E5C57B] font-serif mt-0.5 tracking-wider">
                    Tamu Undangan VIP
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleOpen}
                  className="w-full min-h-[48px] py-3 px-6 rounded-full bg-gradient-to-r from-[#F2E0B6] via-[#E5C57B] to-[#C8A252] border border-[#FFF5DF]/75 text-[#19030A] font-serif font-bold text-xs uppercase tracking-[0.22em] shadow-[0_8px_24px_rgba(25,3,10,0.75)] hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFF5DF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#19030A]"
                >
                  <MailOpen className="w-4 h-4 text-[#19030A] shrink-0" />
                  <span>BUKA UNDANGAN</span>
                </button>
              </div>
            </div>
          </div>
        ) : isEmeraldVelvet ? (
          /* Royal Emerald Velvet Masterpiece Cover - Split Desktop Card (Right 58%/50% on Desktop, 100% on Mobile) */
          <div className={`fixed top-0 right-0 h-full w-full lg:w-7/12 xl:w-1/2 z-50 flex items-center justify-center overflow-hidden select-none border-l border-[#ECC880]/30 shadow-[-20px_0_60px_rgba(0,0,0,0.9)] bg-[#041610] transition-opacity duration-700 ${isCoverExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Desktop Scenic Background - Velvet Ballroom Panorama */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src={coverImage || '/photos/photo-3.jpg'} 
                alt="Emerald Velvet Royal Ballroom" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/85" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#041610] via-transparent to-black/60" />
            </div>

            {/* Shimmering Stardust */}
            <FloatingEmeraldStardust count={18} />

            {/* Centered Mobile/Portrait Invitation Cover Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:max-h-[94vh] sm:rounded-3xl overflow-hidden flex flex-col justify-between items-center text-center bg-gradient-to-b from-[#08261B] via-[#051C14] to-[#041610] text-[#FFF8E2] shadow-[0_25px_70px_rgba(0,0,0,0.85),_0_0_40px_rgba(236,200,128,0.3)] sm:border-2 sm:border-[#ECC880]/50 p-4 xs:p-6 sm:p-7">
              <EmeraldGoldCorner size={32} color="#ECC880" />
              
              {/* Top Crown & Gold Banner */}
              <div className="w-full bg-[#041610]/80 py-1.5 xs:py-2 px-3 xs:px-4 rounded-full border border-[#ECC880]/40 flex items-center justify-center gap-2 shadow-xs">
                <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
                <p className="text-[9px] xs:text-[10px] font-serif font-bold tracking-[0.25em] uppercase text-[#ECC880]">
                  EMERALD VELVET ROYAL • SULTAN
                </p>
                <Crown className="w-3.5 h-3.5 text-[#ECC880]" />
              </div>

              {/* Middle Card Content */}
              <div className="flex-1 w-full flex flex-col items-center justify-center px-2 xs:px-4 py-2 xs:py-4 overflow-y-auto">
                {/* Arched Photo Frame with Crown Crest */}
                <div className="relative mx-auto w-32 h-40 xs:w-36 xs:h-44 sm:w-40 sm:h-48 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#ECC880] shadow-lg mb-2 xs:mb-3 group shrink-0">
                  <img 
                    src={coverImage} 
                    alt={`${groomDisplayName} & ${brideDisplayName}`} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#041610]/70 via-transparent to-transparent" />
                </div>

                <p className="text-[9px] xs:text-[10px] uppercase tracking-[0.3em] text-[#A0C4B4] font-serif font-semibold mb-1">
                  WALIMATUL &apos;URSY • ROYAL BANQUET
                </p>

                <h1 className="text-2xl xs:text-3xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E2] via-[#ECC880] to-[#E2C792] mb-1.5 xs:mb-2 tracking-wide drop-shadow-sm">
                  {groomDisplayName} <span className="font-light italic text-[#ECC880]">&amp;</span> {brideDisplayName}
                </h1>

                {/* Event Date Badge */}
                <div className="inline-flex items-center gap-1.5 px-2.5 xs:px-3 py-0.5 xs:py-1 rounded-full bg-[#041610]/80 border border-[#ECC880]/30 text-[#ECC880] text-[10px] xs:text-[11px] font-serif font-medium mb-2 xs:mb-3">
                  <Calendar className="w-3 h-3 text-[#ECC880]" />
                  <span>
                    {events?.[0]?.event_date 
                      ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Senin, 12 Oktober 2026'}
                  </span>
                </div>

                {/* Guest Invitation Box */}
                <div className="w-full bg-[#041610]/90 p-2.5 xs:p-3 rounded-2xl border border-[#ECC880]/40 mb-2.5 xs:mb-3 shadow-inner text-center">
                  <p className="text-[9px] xs:text-[9.5px] text-[#A0C4B4] uppercase tracking-wider mb-0.5 font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </p>
                  <p className="font-serif text-sm xs:text-base font-bold text-white line-clamp-1">
                    {guestName}
                  </p>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ECC880]/15 text-[#ECC880] text-[9px] xs:text-[9.5px] font-serif font-semibold mt-1">
                    <Crown size={11} />
                    <span>Tamu Undangan VIP</span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Open Invitation Button */}
              <div className="w-full pt-1">
                <button
                  type="button"
                  onClick={handleOpen}
                  className="w-full py-2.5 xs:py-3 px-4 xs:px-6 rounded-full bg-gradient-to-r from-[#ECC880] via-[#D4AF37] to-[#C5A059] text-[#041610] font-serif font-bold text-[11px] xs:text-xs uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(236,200,128,0.4)] hover:shadow-[0_10px_28px_rgba(236,200,128,0.6)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Crown className="w-4 h-4 text-[#041610]" />
                  <span>BUKA UNDANGAN</span>
                  <Sparkles className="w-4 h-4 text-[#041610] animate-pulse" />
                </button>
              </div>
            </div>
          </div>
        ) : isNirwanaSarangan ? (
          /* Hotel Nirwana Sarangan Resort & Lakeview Cover */
          <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#0D2018] transition-opacity duration-700 ${isCoverExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            {/* Desktop Scenic Background - Lakeview Panorama */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/themes/nirwana-sarangan/lakeview-panorama.jpg" 
                alt="Pemandangan Telaga Sarangan & Gunung Lawu" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/80" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2018]/90 via-transparent to-black/50" />
            </div>

            {/* Floating Lake Mist */}
            <FloatingLakeMist />

            {/* Centered Mobile/Portrait Invitation Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:max-h-[94vh] sm:rounded-3xl overflow-hidden flex flex-col justify-between items-center text-center bg-[#F8FAF9] shadow-[0_25px_70px_rgba(0,0,0,0.85),_0_0_40px_rgba(22,56,44,0.35)] sm:border-2 sm:border-[#16382C]/30">
              {/* Top Pine & Gold Banner */}
              <div className="w-full bg-[#16382C] text-white py-2.5 px-4 shadow-sm border-b border-[#C5A059]/40 flex items-center justify-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
                <p className="text-[11px] font-serif font-semibold tracking-[0.25em] uppercase text-[#E2C792]">
                  HOTEL NIRWANA • TELAGA SARANGAN
                </p>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse" />
              </div>

              {/* Middle Card Content */}
              <div className="flex-1 w-full flex flex-col items-center justify-center px-6 py-5 overflow-y-auto">
                {/* Arched Photo Frame */}
                <div className="relative mx-auto w-44 h-52 rounded-t-[88px] rounded-b-xl overflow-hidden border-2 border-[#16382C]/50 shadow-lg mb-4 group">
                  <img 
                    src={coverImage} 
                    alt={`${groomDisplayName} & ${brideDisplayName}`} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#C5A059]/40 rounded-t-[88px] rounded-b-xl" />
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-[#16382C] font-serif font-medium mb-1">
                  The Wedding Of
                </p>

                <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#16382C] mb-3 tracking-wide">
                  {groomDisplayName} <span className="font-light italic text-[#C5A059]">&amp;</span> {brideDisplayName}
                </h1>

                {/* Event Date Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16382C]/10 text-[#16382C] text-xs font-serif font-medium mb-4">
                  <span>
                    {events?.[0]?.event_date 
                      ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                      : 'Minggu, 20 November 2026'}
                  </span>
                </div>

                {/* Guest Invitation Box */}
                <div className="w-full bg-[#EBF2EE] p-3.5 rounded-2xl border border-[#16382C]/15 mb-4 shadow-inner">
                  <p className="text-[11px] text-[#476054] uppercase tracking-wider mb-1 font-medium">
                    Kepada Yth. Bapak/Ibu/Saudara/i:
                  </p>
                  <p className="font-serif text-base sm:text-lg font-bold text-[#16382C] line-clamp-1">
                    {guestName}
                  </p>
                  <p className="text-[10px] text-[#476054] italic mt-0.5">
                    *Mohon maaf apabila ada kesalahan penulisan nama/gelar
                  </p>
                </div>
              </div>

              {/* Bottom "Buka Undangan" Button */}
              <div className="w-full p-4 bg-gradient-to-t from-white via-white/95 to-transparent">
                <button
                  type="button"
                  onClick={handleOpen}
                  aria-label="Buka Undangan / Open Invitation"
                  className="group relative w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#16382C] via-[#2A5241] to-[#122E24] text-[#E2C792] font-serif text-sm font-semibold tracking-widest uppercase shadow-lg shadow-[#16382C]/30 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-[#C5A059]/40 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C5A059] focus:ring-offset-2 focus:ring-offset-[#0D2018]"
                >
                  <MailOpen className="w-4 h-4 text-[#C5A059] transition-transform group-hover:scale-110" />
                  <span className="flex items-center gap-2">
                    <span>Buka Undangan</span>
                    <span className="text-[#C5A059]/60 font-sans text-[10px] tracking-wider font-normal">|</span>
                    <span className="text-[11px] tracking-[0.2em] text-[#F3E5AB]/90 font-medium">OPEN INVITATION</span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        ) : isJogloMaroon ? (
          /* Joglo Maroon Heritage Cover - Exact replica of the user reference video */
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden select-none bg-[#140e0b]">
            {/* Desktop Scenic Background */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <img 
                src="/themes/joglo-maroon-bg-clean.jpg" 
                alt="Rumah Adat Bolon Batak Heritage" 
                className="w-full h-full object-cover object-center scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/75" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b]/85 via-transparent to-black/50" />
            </div>

            {/* Courtyard Butterflies */}
            <JogloButterflies />

            {/* Centered Mobile/Portrait Invitation Card */}
            <div className="relative z-10 w-full h-[100dvh] sm:h-auto sm:max-w-[420px] sm:max-h-[94vh] sm:rounded-3xl overflow-hidden flex flex-col justify-between items-center text-center bg-[#fbf8f2] shadow-[0_25px_70px_rgba(0,0,0,0.8),_0_0_40px_rgba(126,34,49,0.35)] sm:border-2 sm:border-[#7e2231]/40">
              {/* Top Burgundy Banner */}
              <div className="w-full bg-[#7e2231] text-white py-2 px-4 shadow-sm border-b border-[#c9982e]/30">
                <p className="text-xs font-serif font-semibold tracking-[0.25em] uppercase text-[#fff5ea]">
                  {invitation?.title ? invitation.title.toUpperCase() : `${groomDisplayName.toUpperCase()} & ${brideDisplayName.toUpperCase()}`}
                </p>
              </div>

              {/* Middle Card Content */}
              <div className="flex-1 w-full flex flex-col items-center justify-center px-6 py-5 overflow-y-auto">
                {/* Arched Photo Frame */}
                <div className="relative mx-auto w-44 h-52 rounded-t-[88px] rounded-b-xl overflow-hidden border-2 border-[#7e2231]/40 shadow-md mb-4 group">
                  <img 
                    src={coverImage} 
                    alt={`${groomDisplayName} & ${brideDisplayName}`} 
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#c9982e]/40 rounded-t-[88px] rounded-b-xl" />
                </div>

                <p className="text-xs uppercase tracking-[0.3em] text-[#7e2231] font-serif font-medium mb-1">
                  The Wedding Of
                </p>

                <h1 className="text-3xl sm:text-4xl font-serif font-medium text-[#7e2231] mb-4 tracking-wide">
                  {groomDisplayName} <span className="font-light italic text-[#c9982e]">&amp;</span> {brideDisplayName}
                </h1>

                {/* Guest VIP Box */}
                <div className="w-full max-w-xs bg-white/95 border border-[#7e2231]/25 rounded-xl p-3.5 shadow-sm mb-5">
                  <p className="text-[11px] text-[#6d4d42] font-serif uppercase tracking-wider mb-0.5">
                    Kepada Bapak/Ibu/Saudara/i
                  </p>
                  <p className="text-lg font-serif font-bold text-[#7e2231]">
                    {guestName}
                  </p>
                  <p className="text-xs text-[#8c6b5e] italic mt-0.5 font-serif">
                    Di Tempat
                  </p>
                </div>

                {/* Buka Undangan Button */}
                <button
                  id="open-invitation-btn"
                  onClick={handleOpen}
                  className="inline-flex items-center justify-center gap-2 w-full max-w-xs py-3 px-6 rounded-full bg-[#7e2231] hover:bg-[#651722] text-white font-serif text-xs tracking-widest uppercase transition-all duration-300 shadow-[0_6px_20px_rgba(126,34,49,0.4)] hover:shadow-[0_8px_25px_rgba(126,34,49,0.6)] active:scale-95 cursor-pointer"
                >
                  <MailOpen className="w-4 h-4 text-[#edd59e]" />
                  <span>Buka Undangan</span>
                </button>
              </div>

              {/* Bottom Footer Note */}
              <div className="w-full py-2 bg-[#f4ece0] border-t border-[#7e2231]/15 text-[11px] text-[#7a5b51] font-serif">
                Mohon maaf apabila ada kesalahan penulisan nama/gelar
              </div>
            </div>
          </div>
        ) : isRoyalWayang ? (
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
              <div className="relative z-20 w-full flex flex-col items-center pt-5 sm:pt-6">
                {/* Arched Medallion Card Container */}
                <div className="relative w-full max-w-[86%] sm:max-w-[84%] mx-auto rounded-t-[96px] sm:rounded-t-[115px] rounded-b-2xl bg-gradient-to-b from-[#1c120a]/94 via-[#120a06]/96 to-[#090604]/98 backdrop-blur-md border border-[#d4af37]/65 shadow-[0_16px_40px_rgba(0,0,0,0.9),_0_0_25px_rgba(212,175,55,0.18)] p-2 sm:p-2.5 flex flex-col items-center">
                  
                  {/* Royal Keraton Crown resting directly on top of the arch apex */}
                  <div 
                    className="absolute -top-7 sm:-top-8.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                    style={{ animation: 'royal-crown-float 4s ease-in-out infinite' }}
                  >
                    <img 
                      src="/themes/royal-crown-luxury.png" 
                      alt="Mahkota Keraton" 
                      className="w-18 sm:w-22 h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(212,175,55,0.7)]" 
                    />
                    {/* Delicate Gold Crown Mount Bar resting along arch apex */}
                    <div className="w-12 sm:w-14 h-1 -mt-0.5 rounded-full bg-gradient-to-r from-transparent via-[#ffd778] to-transparent shadow-[0_0_8px_rgba(255,215,120,0.85)]" />
                  </div>

                  {/* Delicate Inset Gold Hairline Frame */}
                  <div className="absolute inset-1.5 rounded-t-[90px] sm:rounded-t-[108px] rounded-b-xl border border-[#d4af37]/35 pointer-events-none z-20" />

                  {/* Arched Couple Photo Container */}
                  <div className="w-full aspect-[5/4] rounded-t-[86px] sm:rounded-t-[104px] rounded-b-lg overflow-hidden border border-[#d4af37]/50 shadow-inner bg-black/50 relative z-10">
                    <img 
                      src={coverImage} 
                      alt={`${groomDisplayName} & ${brideDisplayName}`} 
                      className="w-full h-full object-cover object-[center_top] filter brightness-[1.01] contrast-[1.03]"
                    />
                    {/* Delicate Inset Bevel inside photo */}
                    <div className="absolute inset-1 rounded-t-[82px] sm:rounded-t-[98px] rounded-b-md border border-[#ffd778]/25 pointer-events-none" />
                    {/* Inner subtle vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#120a06]/75 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Subtitle: The Wedding Of */}
                  <p 
                    className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.32em] text-[#dfca9e] font-serif font-semibold mt-2.5 mb-0.5 drop-shadow-sm"
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
                  <div className="flex items-center justify-center gap-2 mt-0.5 w-full max-w-[210px]">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                    <span className="text-[9.5px] sm:text-[10px] tracking-[0.16em] text-[#f5dfa8]/90 font-serif font-medium whitespace-nowrap drop-shadow-sm">
                      {events?.[0]?.event_date 
                        ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                        : 'Minggu, 25 Oktober 2026'}
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

      {/* 2. Entrance Animation: Emerald Velvet Portal, Nirwana Sarangan Portal, Batak Heritage Portal, or Gate Video */}
      {openingStage === 'arch-video' && (
        isEmeraldVelvet ? (
          <EmeraldVelvetEntrancePortal
            onComplete={handleFinishAnimation}
            guestName={guestName}
            groomName={groomDisplayName}
            brideName={brideDisplayName}
            coverImage={coverImage}
            weddingDate={events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Senin, 12 Oktober 2026'}
          />
        ) : isNirwanaSarangan ? (
          <NirwanaSaranganEntrancePortal
            onComplete={handleFinishAnimation}
            guestName={guestName}
            groomName={groomDisplayName}
            brideName={brideDisplayName}
            coverImage={coverImage}
            weddingDate={events?.[0]?.event_date ? new Date(events[0].event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : (isYogaFatmaSlug ? "Jum'at, 26 Maret 2027" : 'Jumat, 20 November 2026')}
            themeSlug={activeThemeSlug}
          />
        ) : isJogloMaroon ? (
          <BatakHeritageEntrancePortal
            onComplete={handleFinishAnimation}
            guestName={guestName}
            groomName={groomDisplayName}
            brideName={brideDisplayName}
          />
        ) : (
          <div 
            onClick={() => {
              if (canSkipVideo) handleFinishAnimation();
            }}
            className={`fixed top-0 right-0 h-full ${
              isNirwanaSarangan
                ? 'w-full lg:w-7/12 xl:w-1/2'
                : (isSplitTheme ? 'w-full lg:w-[42%]' : 'w-full inset-0')
            } z-50 bg-[#071712] flex items-center justify-center transition-opacity duration-1000 ease-out overflow-hidden select-none ${
              isVideoExiting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
            } ${canSkipVideo ? 'cursor-pointer' : ''}`}
          >
            {/* Background image matching video final frame for seamless zero-gap crossfade */}
            <div 
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{
                backgroundImage: `url(${
                  isNirwanaSarangan
                    ? '/themes/nirwana-sarangan/gate-terrace.jpg'
                    : isRoyalWayang
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
                ref={(node) => {
                  videoRef.current = node;
                  if (node) {
                    node.muted = true;
                    node.defaultMuted = true;
                    node.playsInline = true;
                    node.play().catch(() => {});
                  }
                }}
                src={entranceVideoSrc}
                poster={
                  isNirwanaSarangan
                    ? '/themes/nirwana-sarangan/gate-closed.jpg'
                    : isRoyalWayang
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
                onError={handleFinishAnimation}
                onTimeUpdate={() => {
                  if (isNirwanaSarangan && videoRef.current && videoRef.current.currentTime >= 3.4) {
                    handleFinishAnimation();
                  } else if (isRoyalWayang && videoRef.current && videoRef.current.currentTime >= 3.35) {
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
        )
      )}
    </div>
  );
};
