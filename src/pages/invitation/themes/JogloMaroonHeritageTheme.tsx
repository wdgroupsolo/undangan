import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Gift, 
  Check, 
  X, 
  Copy, 
  Calendar as CalendarIcon, 
  Heart, 
  Clock,
  Send,
  User,
  CheckCircle2,
  Sparkles,
  Users,
  Video,
  Play,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronDown
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';

// ==========================================
// 1. SVG ORNAMENTS & THEME VISUAL ASSETS
// ==========================================

// Instagram Icon
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// WhatsApp Icon
export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.136 8.136 0 0 1-1.25-4.38c0-4.51 3.67-8.18 8.18-8.18 2.18 0 4.24.85 5.78 2.39a8.12 8.12 0 0 1 2.4 5.79c0 4.51-3.67 8.18-8.18 8.18zm4.49-6.13c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z"/>
  </svg>
);

// Golden Batak Gorga & Rumah Bolon Crest (Towering Horned Gable & Gorga Simeol-meol Spirals)
export const BatakGorgaCrest: React.FC<{ className?: string }> = ({ className = "w-14 h-16" }) => (
  <svg viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="batakGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C9982E" />
        <stop offset="100%" stopColor="#8A6310" />
      </linearGradient>
      <linearGradient id="batakMaroon" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#8A232F" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#4A1017" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="batakDark" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#2A0B10" />
        <stop offset="50%" stopColor="#4A141C" />
        <stop offset="100%" stopColor="#2A0B10" />
      </linearGradient>
    </defs>
    
    {/* Rumah Bolon Curved Saddle Horn Roof Silhouette */}
    <path 
      d="M50 8 C53 22 76 34 94 48 C86 52 74 54 68 56 L70 108 L30 108 L32 56 C26 54 14 52 6 48 C24 34 47 22 50 8 Z" 
      fill="url(#batakMaroon)" 
      stroke="url(#batakGold)" 
      strokeWidth="2" 
    />
    
    {/* Inner Gable Triangle (Dorpi Bolon) */}
    <path 
      d="M50 16 L65 54 L35 54 Z" 
      fill="url(#batakDark)" 
      stroke="url(#batakGold)" 
      strokeWidth="1.2" 
    />
    
    {/* Sacred Gorga Simeol-meol (Spirals of Life & Prosperity) */}
    <path 
      d="M50 20 L50 50 M50 28 C56 26 60 32 58 37 C56 42 50 40 48 35 M50 34 C44 32 40 38 42 43 C44 48 50 46 52 41" 
      stroke="url(#batakGold)" 
      strokeWidth="1.4" 
      strokeLinecap="round" 
    />
    
    {/* Gorga Sitompi / Geometrics on Lower Wall */}
    <path 
      d="M32 60 L68 60 M32 68 L68 68 M32 80 L68 80 M32 94 L68 94" 
      stroke="url(#batakGold)" 
      strokeWidth="1" 
      strokeOpacity="0.7" 
    />
    <path 
      d="M32 60 L41 68 L50 60 L59 68 L68 60 M32 72 L41 80 L50 72 L59 80 L68 72 M32 84 L41 92 L50 84 L59 92 L68 84" 
      stroke="url(#batakGold)" 
      strokeWidth="1.2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
    />
    
    {/* Horn / Peak Medallion (Mata Ni Ari / Ulu Paung) */}
    <circle cx="50" cy="8" r="3.5" fill="#FFF8D6" stroke="#8A6310" strokeWidth="1" />
    <path d="M50 2 L50 14 M44 8 L56 8" stroke="#E5C158" strokeWidth="1" />
  </svg>
);

// Authentic Javanese Wayang Gunungan Golden Crest (Tree of Life / Kayon)
export const WayangGununganGoldenCrest: React.FC<{ className?: string }> = ({ className = "w-10 h-14" }) => (
  <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="gununganGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5d77f" />
        <stop offset="45%" stopColor="#c9982e" />
        <stop offset="100%" stopColor="#8a6310" />
      </linearGradient>
      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#8a6310" floodOpacity="0.4" />
      </filter>
    </defs>
    {/* Outer Kayon Leaf Silhouette */}
    <path
      d="M50 6 C58 23 78 43 89 68 C96 83 98 103 88 120 C79 135 61 138 50 138 C39 138 21 135 12 120 C2 103 4 83 11 68 C22 43 42 23 50 6 Z"
      fill="url(#gununganGoldGrad)"
      fillOpacity="0.15"
      stroke="url(#gununganGoldGrad)"
      strokeWidth="1.8"
      filter="url(#goldGlow)"
    />
    {/* Inner Scalloped Filigree Border */}
    <path
      d="M50 14 C56 28 73 46 83 68 C89 82 90 100 82 117 C75 131 59 133 50 133 C41 133 25 131 18 117 C10 100 11 82 17 68 C27 46 44 28 50 14 Z"
      stroke="url(#gununganGoldGrad)"
      strokeWidth="1"
      strokeDasharray="2 2"
    />
    {/* Central Tree Trunk (Batang Pohon Hayat) */}
    <path d="M50 48 L50 135" stroke="url(#gununganGoldGrad)" strokeWidth="1.8" strokeLinecap="round" />
    {/* Sacred Temple Gate (Paduraksa) */}
    <path d="M34 119 L50 106 L66 119" stroke="url(#gununganGoldGrad)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="37" y="119" width="26" height="17" rx="1.5" stroke="url(#gununganGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M44 136 L44 125 C44 122 56 122 56 125 L56 136" stroke="url(#gununganGoldGrad)" strokeWidth="1" />
    {/* Tree Branches & Floral Swirls */}
    <path d="M50 88 C39 82 28 90 23 81 C19 74 28 66 36 69 C44 72 49 80 50 83" stroke="url(#gununganGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M50 88 C61 82 72 90 77 81 C81 74 72 66 64 69 C56 72 51 80 50 83" stroke="url(#gununganGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M50 70 C41 63 34 68 29 60 C24 53 34 45 41 50 C46 54 49 64 50 68" stroke="url(#gununganGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M50 70 C59 63 66 68 71 60 C76 53 66 45 59 50 C54 54 51 64 50 68" stroke="url(#gununganGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M50 48 C45 40 40 44 38 38 C35 33 42 28 47 32 L50 38" stroke="url(#gununganGoldGrad)" strokeWidth="0.9" fill="none" />
    <path d="M50 48 C55 40 60 44 62 38 C65 33 58 28 53 32 L50 38" stroke="url(#gununganGoldGrad)" strokeWidth="0.9" fill="none" />
    {/* Bottom Tangkai */}
    <rect x="47" y="136" width="6" height="12" rx="1.5" fill="url(#gununganGoldGrad)" />
  </svg>
);

// Backward compatibility alias
export const GununganGoldenCrest = WayangGununganGoldenCrest;

// Batak Gorga Floral Arched Divider
export const BatakGorgaFlourish: React.FC<{ className?: string }> = ({ className = "w-full h-8" }) => (
  <svg viewBox="0 0 240 28" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="batakGoldLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#7E2231" stopOpacity="0" />
        <stop offset="25%" stopColor="#7E2231" />
        <stop offset="50%" stopColor="#C9982E" />
        <stop offset="75%" stopColor="#7E2231" />
        <stop offset="100%" stopColor="#7E2231" stopOpacity="0" />
      </linearGradient>
    </defs>
    {/* Traditional Gorga Wave (Simeol-meol) */}
    <path 
      d="M10 14 Q40 4 70 14 T120 14 T170 14 T230 14" 
      stroke="url(#batakGoldLine)" 
      strokeWidth="1.5" 
      fill="none" 
    />
    {/* Center Gorga Diamond / Sun Emblem */}
    <polygon points="120,6 126,14 120,22 114,14" fill="#C9982E" stroke="#7E2231" strokeWidth="0.8" />
    <circle cx="95" cy="14" r="2" fill="#7E2231" />
    <circle cx="145" cy="14" r="2" fill="#7E2231" />
    <circle cx="70" cy="14" r="1.5" fill="#C9982E" />
    <circle cx="170" cy="14" r="1.5" fill="#C9982E" />
  </svg>
);

// Backward compatibility alias
export const JavaneseArchFlourish = BatakGorgaFlourish;

// Antique Royal Gold Corner Filigree Ornament (Prada Emas Keraton / Gorga Corner Bracket)
export const RoyalCornerFiligree: React.FC<{ className?: string; position?: 'tl' | 'tr' | 'bl' | 'br' }> = ({ 
  className = "w-9 h-9", 
  position = 'tl' 
}) => {
  const transformMap = {
    tl: '',
    tr: 'scaleX(-1)',
    bl: 'scaleY(-1)',
    br: 'scale(-1, -1)',
  };

  return (
    <svg 
      viewBox="0 0 60 60" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
      style={{ transform: transformMap[position] }}
    >
      <defs>
        <linearGradient id="goldFiligreeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff2c2" />
          <stop offset="25%" stopColor="#d8a939" />
          <stop offset="65%" stopColor="#9a6e1a" />
          <stop offset="100%" stopColor="#5c3f0c" />
        </linearGradient>
      </defs>
      {/* Outer corner L-bracket */}
      <path d="M5 40 L5 14 C5 9.03 9.03 5 14 5 L40 5" stroke="url(#goldFiligreeGrad)" strokeWidth="1.8" strokeLinecap="round" />
      {/* Delicate Inner Spiral Scroll */}
      <path d="M13 28 C13 19 19 13 28 13 C34 13 38 17 38 22 C38 26 35 29 31 29 C27 29 25 26 26 23" stroke="url(#goldFiligreeGrad)" strokeWidth="1.4" strokeLinecap="round" />
      {/* Subtle dotted accent */}
      <path d="M26 8 L44 8 M8 26 L8 44" stroke="url(#goldFiligreeGrad)" strokeWidth="1.2" strokeDasharray="2 3" opacity="0.85" />
      {/* Corner Pearl Medallion */}
      <circle cx="9" cy="9" r="3.2" fill="#fff7d6" stroke="#9a6e1a" strokeWidth="1" />
      <circle cx="9" cy="9" r="1.3" fill="#9a6e1a" />
      {/* Accent Diamond */}
      <polygon points="21,21 24,25 21,29 18,25" fill="#edd59e" stroke="#9a6e1a" strokeWidth="0.8" />
    </svg>
  );
};

// Falling & Drifting Romantic Peony Petals Animation with Glowing Pollen & Realistic 3D Tumbling
export const JogloFallingPetals: React.FC<{ className?: string }> = ({ className = "z-25" }) => {
  const petals = [
    { left: '4%', delay: '0s', duration: '9s', size: 18, color: '#7a1928', type: 'petal', drift: 'petal-drift-1' },
    { left: '11%', delay: '2.5s', duration: '11s', size: 24, color: '#9e2637', type: 'petal', drift: 'petal-drift-2' },
    { left: '19%', delay: '5s', duration: '8.5s', size: 15, color: '#b83b4e', type: 'petal', drift: 'petal-drift-3' },
    { left: '26%', delay: '1.2s', duration: '12s', size: 20, color: '#d46b7a', type: 'petal', drift: 'petal-drift-1' },
    { left: '34%', delay: '3.8s', duration: '10s', size: 26, color: '#7a1928', type: 'petal', drift: 'petal-drift-2' },
    { left: '42%', delay: '0.6s', duration: '7.8s', size: 5, color: '#ffd778', type: 'pollen', drift: 'pollen-drift' },
    { left: '50%', delay: '1.5s', duration: '11.5s', size: 22, color: '#881f2f', type: 'petal', drift: 'petal-drift-3' },
    { left: '58%', delay: '4.2s', duration: '9.2s', size: 16, color: '#c45969', type: 'petal', drift: 'petal-drift-1' },
    { left: '66%', delay: '2.2s', duration: '8.2s', size: 6, color: '#ffe58f', type: 'pollen', drift: 'pollen-drift' },
    { left: '72%', delay: '1.8s', duration: '10.5s', size: 24, color: '#7a1928', type: 'petal', drift: 'petal-drift-2' },
    { left: '80%', delay: '5.2s', duration: '13s', size: 18, color: '#b83b4e', type: 'petal', drift: 'petal-drift-3' },
    { left: '88%', delay: '1.4s', duration: '8.8s', size: 15, color: '#9e2637', type: 'petal', drift: 'petal-drift-1' },
    { left: '94%', delay: '3.6s', duration: '10.2s', size: 20, color: '#d46b7a', type: 'petal', drift: 'petal-drift-2' },
    { left: '22%', delay: '6.5s', duration: '9.5s', size: 5, color: '#ffe58f', type: 'pollen', drift: 'pollen-drift' },
    { left: '76%', delay: '4.8s', duration: '11s', size: 5, color: '#ffd778', type: 'pollen', drift: 'pollen-drift' },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`} style={{ perspective: '800px' }}>
      <style>{`
        @keyframes petal-fall-3d-1 {
          0% {
            transform: translate3d(0, -40px, 0) rotateZ(0deg) rotateY(0deg) rotateX(0deg);
            opacity: 0;
          }
          10% { opacity: 0.95; }
          25% {
            transform: translate3d(24px, 26vh, 30px) rotateZ(90deg) rotateY(140deg) rotateX(50deg);
          }
          50% {
            transform: translate3d(-18px, 52vh, 10px) rotateZ(180deg) rotateY(280deg) rotateX(90deg);
          }
          75% {
            transform: translate3d(20px, 78vh, 25px) rotateZ(270deg) rotateY(420deg) rotateX(130deg);
            opacity: 0.95;
          }
          100% {
            transform: translate3d(-12px, 105vh, 0px) rotateZ(360deg) rotateY(560deg) rotateX(170deg);
            opacity: 0;
          }
        }
        @keyframes petal-fall-3d-2 {
          0% {
            transform: translate3d(0, -40px, 0) rotateZ(0deg) rotateY(0deg) rotateX(0deg);
            opacity: 0;
          }
          12% { opacity: 0.9; }
          30% {
            transform: translate3d(-28px, 30vh, 20px) rotateZ(-80deg) rotateY(-130deg) rotateX(-40deg);
          }
          60% {
            transform: translate3d(22px, 60vh, 35px) rotateZ(-170deg) rotateY(-270deg) rotateX(-80deg);
          }
          85% {
            transform: translate3d(-16px, 85vh, 15px) rotateZ(-260deg) rotateY(-400deg) rotateX(-120deg);
            opacity: 0.9;
          }
          100% {
            transform: translate3d(14px, 105vh, 0px) rotateZ(-340deg) rotateY(-520deg) rotateX(-150deg);
            opacity: 0;
          }
        }
        @keyframes petal-fall-3d-3 {
          0% {
            transform: translate3d(0, -40px, 0) rotateZ(45deg) rotateY(0deg) rotateX(0deg);
            opacity: 0;
          }
          10% { opacity: 0.92; }
          35% {
            transform: translate3d(18px, 35vh, 25px) rotateZ(140deg) rotateY(180deg) rotateX(60deg);
          }
          70% {
            transform: translate3d(-22px, 70vh, 15px) rotateZ(240deg) rotateY(360deg) rotateX(110deg);
            opacity: 0.92;
          }
          100% {
            transform: translate3d(10px, 105vh, 0px) rotateZ(320deg) rotateY(500deg) rotateX(160deg);
            opacity: 0;
          }
        }
        @keyframes pollen-sparkle-float {
          0% {
            transform: translate3d(0, -20px, 0) scale(0.7);
            opacity: 0;
          }
          20% {
            opacity: 0.95;
            transform: translate3d(12px, 20vh, 0) scale(1.15);
          }
          50% {
            opacity: 0.6;
            transform: translate3d(-14px, 50vh, 0) scale(0.85);
          }
          80% {
            opacity: 0.95;
            transform: translate3d(10px, 80vh, 0) scale(1.2);
          }
          100% {
            transform: translate3d(-6px, 103vh, 0) scale(0.6);
            opacity: 0;
          }
        }
      `}</style>
      {petals.map((p, idx) => {
        const animName = p.type === 'pollen' 
          ? 'pollen-sparkle-float' 
          : p.drift === 'petal-drift-1' 
            ? 'petal-fall-3d-1' 
            : p.drift === 'petal-drift-2' 
              ? 'petal-fall-3d-2' 
              : 'petal-fall-3d-3';
        return (
          <div
            key={idx}
            className="absolute top-0 pointer-events-none will-change-transform"
            style={{
              left: p.left,
              animation: `${animName} ${p.duration} cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite`,
              animationDelay: p.delay,
              width: `${p.size}px`,
              height: p.type === 'pollen' ? `${p.size}px` : `${p.size * 1.35}px`,
            }}
          >
            {p.type === 'pollen' ? (
              <div className="w-full h-full rounded-full bg-gradient-to-r from-[#ffe58f] to-[#d4af37] shadow-[0_0_8px_rgba(255,215,120,0.95)]" />
            ) : (
              <svg viewBox="0 0 24 32" fill="none" className="w-full h-full filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.22)]">
                <defs>
                  <linearGradient id={`petalGrad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffb8c3" stopOpacity="0.85" />
                    <stop offset="35%" stopColor={p.color} stopOpacity="0.95" />
                    <stop offset="100%" stopColor="#4a0f19" stopOpacity="1" />
                  </linearGradient>
                </defs>
                <path
                  d="M12 2 C18 2 23 8 22 18 C21 26 16 30 12 30 C8 30 3 26 2 18 C1 8 6 2 12 2 Z"
                  fill={`url(#petalGrad-${idx})`}
                />
                <path
                  d="M12 5 C15 5 18 10 17 18 C16 24 14 27 12 27"
                  stroke="#ffffff"
                  strokeWidth="0.8"
                  strokeOpacity="0.35"
                  fill="none"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
};

// Hyper-Realistic 3D Living Butterflies with Natural Gliding Physics & Organic Flapping
export const JogloButterflies: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 select-none">
      <style>{`
        /* Graceful, Gentle & Natural Left Wing 3D Flap (Slow Elegant Flutter & Peaceful Glide) */
        @keyframes real-wing-left {
          0%, 100% { transform: rotateY(0deg) rotateZ(0deg); }
          16% { transform: rotateY(58deg) rotateZ(-5deg); }
          32% { transform: rotateY(-8deg) rotateZ(1deg); }
          48% { transform: rotateY(52deg) rotateZ(-4deg); }
          64% { transform: rotateY(0deg) rotateZ(0deg); }
          78% { transform: rotateY(10deg) rotateZ(1deg); }  /* serene gliding pause */
          92% { transform: rotateY(0deg) rotateZ(0deg); }   /* serene gliding pause */
        }
        /* Graceful, Gentle & Natural Right Wing 3D Flap */
        @keyframes real-wing-right {
          0%, 100% { transform: rotateY(0deg) rotateZ(0deg); }
          16% { transform: rotateY(-58deg) rotateZ(5deg); }
          32% { transform: rotateY(8deg) rotateZ(-1deg); }
          48% { transform: rotateY(-52deg) rotateZ(4deg); }
          64% { transform: rotateY(0deg) rotateZ(0deg); }
          78% { transform: rotateY(-10deg) rotateZ(-1deg); } /* serene gliding pause */
          92% { transform: rotateY(0deg) rotateZ(0deg); }    /* serene gliding pause */
        }
        /* Flight Path 1: Amber Swallowtail hovering along right floral garland (Slow & graceful) */
        @keyframes butterfly-flight-right {
          0% { transform: translate3d(0, 0, 0) rotate(4deg); }
          22% { transform: translate3d(-35px, -30px, 15px) rotate(-10deg); }
          44% { transform: translate3d(-18px, -65px, 25px) rotate(12deg); }
          68% { transform: translate3d(20px, -40px, 10px) rotate(-6deg); }
          86% { transform: translate3d(15px, -12px, 5px) rotate(6deg); }
          100% { transform: translate3d(0, 0, 0) rotate(4deg); }
        }
        /* Flight Path 2: Velvet Peony Butterfly fluttering along left floral garland */
        @keyframes butterfly-flight-left {
          0% { transform: translate3d(0, 0, 0) rotate(-6deg); }
          25% { transform: translate3d(32px, -32px, 20px) rotate(14deg); }
          50% { transform: translate3d(14px, -68px, 12px) rotate(-10deg); }
          75% { transform: translate3d(-18px, -35px, 22px) rotate(8deg); }
          100% { transform: translate3d(0, 0, 0) rotate(-6deg); }
        }
        /* Flight Path 3: Rose Butterfly floating gracefully in the upper sky */
        @keyframes butterfly-flight-top {
          0% { transform: translate3d(0, 0, 0) rotate(2deg); }
          30% { transform: translate3d(-24px, 22px, 10px) rotate(-8deg); }
          62% { transform: translate3d(26px, -18px, 18px) rotate(10deg); }
          100% { transform: translate3d(0, 0, 0) rotate(2deg); }
        }
      `}</style>

      {/* Butterfly 1: Amber & Gold Swallowtail along the right flower border */}
      <div
        className="absolute top-[28%] right-[16%] sm:right-[20%] will-change-transform"
        style={{
          animation: 'butterfly-flight-right 16s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          perspective: '500px',
        }}
      >
        <div className="relative w-12 h-10 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.32)]">
          {/* Left Wing (Slow 3D Flapping) */}
          <div
            className="absolute right-1/2 top-0 w-6 h-9 origin-right"
            style={{
              animation: 'real-wing-left 1.9s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="wingGradRight1" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd778" />
                  <stop offset="35%" stopColor="#c9982e" />
                  <stop offset="70%" stopColor="#8a232f" />
                  <stop offset="100%" stopColor="#381014" />
                </linearGradient>
              </defs>
              <path d="M32 21 C22 6 6 5 10 24 C13 32 23 26 32 21 Z" fill="url(#wingGradRight1)" />
              <path d="M32 21 C23 26 12 36 18 40 C25 42 27 29 32 21 Z" fill="url(#wingGradRight1)" opacity="0.9" />
              <circle cx="16" cy="18" r="1.3" fill="#fff5ea" opacity="0.9" />
              <circle cx="20" cy="30" r="1.1" fill="#fff5ea" opacity="0.9" />
              <path d="M32 21 L16 18 M32 21 L20 30" stroke="#ffd778" strokeWidth="0.6" strokeOpacity="0.5" />
            </svg>
          </div>

          {/* Slender Thorax, Abdomen & Antennae in Center */}
          <div className="relative z-10 w-2 h-7 flex flex-col items-center">
            <div className="w-3 h-2 flex justify-between -mb-0.5">
              <span className="w-0.5 h-2 bg-[#ffd778] -rotate-30 rounded-full" />
              <span className="w-0.5 h-2 bg-[#ffd778] rotate-30 rounded-full" />
            </div>
            <div className="w-1.5 h-2 rounded-full bg-[#20080c]" />
            <div className="w-1.2 h-3.5 rounded-full bg-[#401219] mt-0.5" />
          </div>

          {/* Right Wing (Slow 3D Flapping) */}
          <div
            className="absolute left-1/2 top-0 w-6 h-9 origin-left"
            style={{
              animation: 'real-wing-right 1.9s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <path d="M0 21 C10 6 26 5 22 24 C19 32 9 26 0 21 Z" fill="url(#wingGradRight1)" />
              <path d="M0 21 C9 26 20 36 14 40 C7 42 5 29 0 21 Z" fill="url(#wingGradRight1)" opacity="0.9" />
              <circle cx="16" cy="18" r="1.3" fill="#fff5ea" opacity="0.9" />
              <circle cx="12" cy="30" r="1.1" fill="#fff5ea" opacity="0.9" />
              <path d="M0 21 L16 18 M0 21 L12 30" stroke="#ffd778" strokeWidth="0.6" strokeOpacity="0.5" />
            </svg>
          </div>
        </div>
      </div>

      {/* Butterfly 2: Velvet Peony Butterfly along the left flower border */}
      <div
        className="absolute top-[36%] left-[15%] sm:left-[19%] will-change-transform"
        style={{
          animation: 'butterfly-flight-left 18s cubic-bezier(0.4, 0, 0.2, 1) 1.5s infinite',
          perspective: '500px',
        }}
      >
        <div className="relative w-11 h-9 flex items-center justify-center filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
          {/* Left Wing (Slow 3D Flapping) */}
          <div
            className="absolute right-1/2 top-0 w-5.5 h-8 origin-right"
            style={{
              animation: 'real-wing-left 2.2s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="wingGradLeft2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#f3a9b5" />
                  <stop offset="40%" stopColor="#9e2637" />
                  <stop offset="100%" stopColor="#4a0f19" />
                </linearGradient>
              </defs>
              <path d="M32 21 C22 6 6 5 10 24 C13 32 23 26 32 21 Z" fill="url(#wingGradLeft2)" />
              <path d="M32 21 C23 26 12 36 18 40 C25 42 27 29 32 21 Z" fill="url(#wingGradLeft2)" opacity="0.9" />
              <circle cx="16" cy="18" r="1.2" fill="#fff" opacity="0.85" />
            </svg>
          </div>

          {/* Center Body */}
          <div className="relative z-10 w-2 h-6 flex flex-col items-center">
            <div className="w-2.5 h-1.5 flex justify-between -mb-0.5">
              <span className="w-0.5 h-1.5 bg-[#f3a9b5] -rotate-30 rounded-full" />
              <span className="w-0.5 h-1.5 bg-[#f3a9b5] rotate-30 rounded-full" />
            </div>
            <div className="w-1.3 h-1.8 rounded-full bg-[#20080c]" />
            <div className="w-1 h-3 rounded-full bg-[#401219] mt-0.5" />
          </div>

          {/* Right Wing (Slow 3D Flapping) */}
          <div
            className="absolute left-1/2 top-0 w-5.5 h-8 origin-left"
            style={{
              animation: 'real-wing-right 2.2s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <path d="M0 21 C10 6 26 5 22 24 C19 32 9 26 0 21 Z" fill="url(#wingGradLeft2)" />
              <path d="M0 21 C9 26 20 36 14 40 C7 42 5 29 0 21 Z" fill="url(#wingGradLeft2)" opacity="0.9" />
              <circle cx="16" cy="18" r="1.2" fill="#fff" opacity="0.85" />
            </svg>
          </div>
        </div>
      </div>

      {/* Butterfly 3: Rose Butterfly floating near the top arch */}
      <div
        className="absolute top-[16%] right-[22%] sm:right-[26%] will-change-transform"
        style={{
          animation: 'butterfly-flight-top 20s cubic-bezier(0.4, 0, 0.2, 1) 3s infinite',
          perspective: '500px',
        }}
      >
        <div className="relative w-10 h-8 flex items-center justify-center filter drop-shadow-[0_3px_6px_rgba(0,0,0,0.25)]">
          {/* Left Wing (Slow 3D Flapping) */}
          <div
            className="absolute right-1/2 top-0 w-5 h-7.5 origin-right"
            style={{
              animation: 'real-wing-left 2.5s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <defs>
                <linearGradient id="wingGradTop3" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffd7e2" />
                  <stop offset="45%" stopColor="#c45969" />
                  <stop offset="100%" stopColor="#661420" />
                </linearGradient>
              </defs>
              <path d="M32 21 C22 6 6 5 10 24 C13 32 23 26 32 21 Z" fill="url(#wingGradTop3)" />
              <path d="M32 21 C23 26 12 36 18 40 C25 42 27 29 32 21 Z" fill="url(#wingGradTop3)" opacity="0.9" />
            </svg>
          </div>

          {/* Center Body */}
          <div className="relative z-10 w-1.5 h-5 flex flex-col items-center">
            <div className="w-2 h-1.5 flex justify-between -mb-0.5">
              <span className="w-0.5 h-1.5 bg-[#ffd7e2] -rotate-30 rounded-full" />
              <span className="w-0.5 h-1.5 bg-[#ffd7e2] rotate-30 rounded-full" />
            </div>
            <div className="w-1.2 h-1.5 rounded-full bg-[#1a0508]" />
            <div className="w-1 h-2.5 rounded-full bg-[#360d13] mt-0.5" />
          </div>

          {/* Right Wing (Slow 3D Flapping) */}
          <div
            className="absolute left-1/2 top-0 w-5 h-7.5 origin-left"
            style={{
              animation: 'real-wing-right 2.5s ease-in-out infinite',
              transformStyle: 'preserve-3d',
            }}
          >
            <svg viewBox="0 0 32 42" fill="none" className="w-full h-full">
              <path d="M0 21 C10 6 26 5 22 24 C19 32 9 26 0 21 Z" fill="url(#wingGradTop3)" />
              <path d="M0 21 C9 26 20 36 14 40 C7 42 5 29 0 21 Z" fill="url(#wingGradTop3)" opacity="0.9" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subtle Royal Gold Dust & Shimmer Particles Floating in Golden Sky
export const JogloRoyalDust: React.FC = () => {
  const particles = [
    { top: '10%', left: '20%', size: 3.5, dur: '6s', delay: '0s' },
    { top: '15%', left: '80%', size: 4.5, dur: '7.5s', delay: '1.2s' },
    { top: '22%', left: '28%', size: 3, dur: '5.5s', delay: '2.5s' },
    { top: '26%', left: '72%', size: 5, dur: '8s', delay: '0.8s' },
    { top: '34%', left: '18%', size: 4, dur: '6.5s', delay: '3.2s' },
    { top: '38%', left: '82%', size: 3.5, dur: '7s', delay: '1.8s' },
    { top: '44%', left: '50%', size: 4.5, dur: '6.2s', delay: '2.1s' },
    { top: '48%', left: '25%', size: 3, dur: '7.8s', delay: '0.4s' },
    { top: '50%', left: '75%', size: 4, dur: '6.8s', delay: '3.8s' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-15">
      <style>{`
        @keyframes royal-dust-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(0.8);
            opacity: 0.35;
          }
          50% {
            transform: translate3d(8px, -14px, 0) scale(1.15);
            opacity: 0.95;
          }
        }
      `}</style>
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-gradient-to-tr from-[#caa772] via-[#ffd778] to-[#ffffff]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 8px 1px rgba(212, 175, 55, 0.75), 0 0 16px 2px rgba(255, 235, 170, 0.4)',
            animation: `royal-dust-float ${p.dur} ease-in-out infinite ${p.delay}`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

// ==========================================
// 2. MAIN COMPONENT PROPS & LOGIC
// ==========================================

export interface JogloMaroonHeritageThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: any;
  isOpening?: boolean;
}

export const JogloMaroonHeritageTheme: React.FC<JogloMaroonHeritageThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  isOpening = false,
}) => {
  const toast = useToast();

  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<CalendarEventData | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpAttendance, setRsvpAttendance] = useState<'attending' | 'not_attending' | 'maybe' | ''>('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Gift Confirm Form State
  const [giftConfirmName, setGiftConfirmName] = useState('');
  const [giftConfirmBank, setGiftConfirmBank] = useState('');
  const [giftConfirmAmount, setGiftConfirmAmount] = useState('');
  const [giftConfirmMessage, setGiftConfirmMessage] = useState('');
  const [giftConfirmFileName, setGiftConfirmFileName] = useState('');

  const handleGiftFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setGiftConfirmFileName(e.target.files[0].name);
    }
  };

  const handleGiftConfirmSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!giftConfirmName.trim()) {
      toast.error('Mohon isi nama Anda terlebih dahulu.');
      return;
    }

    const waPhone = couple?.groom_phone || couple?.bride_phone || invitation?.groom_phone || invitation?.bride_phone || '6285707909415';
    const cleanPhone = waPhone.replace(/[^0-9]/g, '');

    const messageLines = [
      `Halo ${groomName} & ${brideName}, saya ingin konfirmasi pengiriman tanda kasih / wedding gift:`,
      ``,
      `• *Nama:* ${giftConfirmName.trim()}`,
      giftConfirmBank.trim() ? `• *Nama Bank:* ${giftConfirmBank.trim()}` : null,
      giftConfirmAmount.trim() ? `• *Nominal:* ${giftConfirmAmount.trim()}` : null,
      giftConfirmMessage.trim() ? `• *Ucapan:* ${giftConfirmMessage.trim()}` : null,
      giftConfirmFileName ? `• *Bukti Transfer:* ${giftConfirmFileName}` : null,
      ``,
      `Terima kasih dan semoga lancar acaranya! ✨`
    ].filter(Boolean).join('\n');

    const waUrl = `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(messageLines)}`;
    window.open(waUrl, '_blank');
    toast.success('Membuka WhatsApp untuk konfirmasi gift...');
  };

  // Guest list & pagination
  const [rsvps, setRsvps] = useState<RSVPItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Guest Name from URL parameter (?to=...)
  const guestName = (() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const to = urlParams.get('to');
      if (to && to.trim()) {
        return decodeURIComponent(to.replace(/\+/g, ' ')).trim();
      }
    }
    return 'Tamu Undangan';
  })();

  // Couple names & nicknames (Default to Steven & Bunga)
  const groomName = couple?.groom_nickname || couple?.groom_full_name || 'Steven';
  const brideName = couple?.bride_nickname || couple?.bride_full_name || 'Bunga';
  const groomFullName = couple?.groom_full_name || 'Steven Pratama, S.Kom.';
  const brideFullName = couple?.bride_full_name || 'Bunga Citra Lestari, S.E.';
  const groomParents = couple?.groom_parents || 'Putra dari Bapak Bambang Pratama & Ibu Siti Rahayu';
  const brideParents = couple?.bride_parents || 'Putri dari Bapak Hendra Gunawan & Ibu Ratna Dewi';

  // Target event for countdown & hero display
  const mainEvent = events?.[0] || {
    event_name: 'Akad Nikah',
    event_date: '2026-04-12T08:30:00Z',
    start_time: '08.30 WIB',
    end_time: '09.30 WIB',
    venue_name: 'Kediaman Mempelai Wanita',
    address: 'Kampung Kalipace Rt 37 Rw 12 Desa Prapatan Kecamatan Purwadadi Kabupaten Subang - Jawa Barat',
    map_url: 'https://maps.google.com',
  };

  const receptionEvent = events?.[1] || {
    event_name: 'Resepsi Pernikahan',
    event_date: '2026-04-12T11:00:00Z',
    start_time: '11.00 WIB',
    end_time: 'Selesai',
    venue_name: 'Kediaman Mempelai Wanita',
    address: 'Kampung Kalipace Rt 37 Rw 12 Desa Prapatan Kecamatan Purwadadi Kabupaten Subang - Jawa Barat',
    map_url: 'https://maps.google.com',
  };

  // Formatted date for hero matching reference (e.g. 06.06.2025 or DD.MM.YYYY)
  const heroDate = (() => {
    if (mainEvent?.event_date) {
      const d = new Date(mainEvent.event_date);
      if (!isNaN(d.getTime())) {
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();
        return `${day}.${month}.${year}`;
      }
    }
    return '06.06.2025';
  })();

  const heroHashtag = couple?.hashtag || `#${groomName.replace(/\s+/g, '')}Dan${brideName.replace(/\s+/g, '')}`;

  // Couple photo (Steven & Bunga as canonical default)
  const coupleCoverPhoto = 
    invitation?.cover_image_url || 
    couple?.cover_photo_url || 
    gallery?.[0]?.image_url || 
    '/photos/photo-3.jpg';

  const groomPhoto = couple?.groom_photo_url || couple?.groom_photo || '/groom-default.png';
  const bridePhoto = couple?.bride_photo_url || couple?.bride_photo || '/bride-default.png';

  // Load RSVPs
  useEffect(() => {
    if (invitation?.id) {
      rsvpService.getRsvpsByInvitation(invitation.id).then((data) => {
        setRsvps(data || []);
      });
    }
  }, [invitation?.id]);

  // Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = mainEvent?.event_date ? new Date(mainEvent.event_date).getTime() : new Date('2026-11-28T09:00:00Z').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [mainEvent?.event_date]);

  // Copy account number
  const handleCopyAccount = (number: string, index: number) => {
    navigator.clipboard.writeText(number);
    setCopiedIndex(index);
    toast.success('Nomor rekening berhasil disalin');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Copy physical gift address
  const handleCopyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    toast.success('Alamat kirim kado berhasil disalin');
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  // Submit RSVP
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }

    if (!rsvpAttendance) {
      toast.error('Mohon pilih status kehadiran Anda');
      return;
    }

    if (!invitation?.id) {
      toast.error('Data undangan belum terhubung');
      return;
    }

    setRsvpSubmitting(true);
    try {
      const newItem = await rsvpService.submitRsvp({
        invitation_id: invitation.id,
        name: rsvpName.trim(),
        attendance: rsvpAttendance,
        number_of_guests: parseInt(rsvpGuests) || 1,
        message: rsvpMessage.trim() || null,
      });

      if (newItem) {
        setRsvps(prev => [newItem, ...prev]);
        setRsvpName('');
        setRsvpMessage('');
        setRsvpGuests('1');
        toast.success('Terima kasih, konfirmasi kehadiran berhasil dikirim!');
      }
    } catch {
      toast.error('Gagal mengirim RSVP. Silakan coba beberapa saat lagi.');
    } finally {
      setRsvpSubmitting(false);
    }
  };

  // Open Calendar reminder
  const handleAddToCalendar = (eventItem: any) => {
    setSelectedCalendarEvent({
      title: `${eventItem.event_name} - ${groomName} & ${brideName}`,
      description: `Pernikahan agung ${groomFullName} & ${brideFullName} bertempat di ${eventItem.venue_name}.`,
      location: eventItem.address,
      eventDate: eventItem.event_date || '2026-11-28',
      startTime: eventItem.start_time || '08:30',
      endTime: eventItem.end_time || '11:00',
    });
    setIsCalendarModalOpen(true);
  };

  // Effective Love Story
  const effectiveStories = stories && stories.length > 0 ? stories : [
    {
      id: 'story-1',
      title: 'Awal Bertemu',
      year: '2021',
      content: 'Di dunia yang luas ini, kami percaya bahwa tidak ada pertemuan yang benar-benar kebetulan. Tuhan mempertemukan dua hati pada waktu yang tepat dengan cara yang sederhana tapi bermakna.',
      image_url: '/story-1.jpg'
    },
    {
      id: 'story-2',
      title: 'Lamaran',
      year: 'Mei 2025',
      content: 'Atas kehendak-Nya, kami melangkah ke tahap yang lebih serius dengan melangsungkan lamaran pada bulan spesial kami yaitu bulan kelahiran kami berdua yaitu pada Mei 2025.',
      image_url: '/story-2.jpg'
    },
    {
      id: 'story-3',
      title: 'Hari Bahagia',
      year: 'April 2026',
      content: 'Kini kami menyempurnakan ibadah kami, melangkah bersama dalam ikatan suci pernikahan untuk mengarungi bahtera rumah tangga yang sakinah, mawaddah, warahmah.',
      image_url: '/story-3.jpg'
    }
  ];

  // Effective Gifts
  const effectiveGifts = gifts && gifts.length > 0 ? gifts : [
    {
      id: 'gift-1',
      bank_name: 'Bank Mandiri',
      account_number: '123123123',
      account_holder: couple?.bride_full_name && couple?.bride_full_name !== 'Tina Saputri' ? couple.bride_full_name : 'Elyana Azkiya Nur',
    },
    {
      id: 'gift-2',
      bank_name: 'Bank Mandiri',
      account_number: '123123123',
      account_holder: couple?.bride_full_name && couple?.bride_full_name !== 'Tina Saputri' ? couple.bride_full_name : 'Elyana Azkiya Nur',
    }
  ];

  const physicalAddress = invitation?.physical_address || 'Jalan Raya Bojongsari No.5, Gunung Putri';
  const physicalRecipient = couple?.bride_full_name && couple?.bride_full_name !== 'Tina Saputri' ? couple.bride_full_name : 'Elyana Azkiya Nur';

  // Pagination for guestbook
  const totalPages = Math.ceil(rsvps.length / itemsPerPage);
  const displayedRsvps = rsvps.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="relative w-full min-h-screen bg-[#140e0b] text-[#2c1d19] font-sans overflow-x-hidden selection:bg-[#7e2231] selection:text-white">
      
      {/* ========================================================================= */}
      {/* DESKTOP SPLIT VIEW: Left 58% Fixed Scenic Stage (Rumah Adat Bolon Batak)   */}
      {/* ========================================================================= */}
      <div className="hidden lg:block fixed top-0 left-0 w-[58%] h-screen z-0 overflow-hidden select-none">
        {/* Scenic Background with Clean Rumah Adat Bolon Batak Courtyard */}
        <img 
          src="/themes/joglo-maroon-bg-clean.jpg" 
          alt="Rumah Adat Bolon Batak Landscape" 
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Ambient Darkened Gradient for Typography Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#140e0b] via-transparent to-black/50" />

        {/* Living Courtyard Butterflies & Falling Petals */}
        <JogloButterflies />
        <JogloFallingPetals />

        {/* Left Side Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-24 text-white z-10 select-none">
          {/* Top Brand Banner */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#7e2231]/80 border border-[#c9982e]/50 backdrop-blur-md w-fit mb-5 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#edd59e]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#fbf8f2] font-serif font-medium">
              Pesta Adat Batak Heritage
            </span>
          </div>

          <p className="text-xs xl:text-sm uppercase tracking-[0.35em] text-[#edd59e] font-serif font-medium mb-3 drop-shadow">
            The Royal Wedding of
          </p>

          <h1 className="text-6xl xl:text-7xl 2xl:text-8xl font-serif font-normal mb-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)] text-white tracking-wide">
            {groomName} <span className="font-light italic text-[#edd59e]">&amp;</span> {brideName}
          </h1>

          <p className="text-xl xl:text-2xl text-[#f5efe4] font-serif font-light drop-shadow mb-6 flex items-center gap-3">
            <CalendarIcon className="w-5 h-5 text-[#c9982e]" />
            {mainEvent?.event_date 
              ? new Date(mainEvent.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
              : 'Sabtu, 28 November 2026'}
          </p>

          <p className="text-sm text-stone-300 max-w-md mb-8 leading-relaxed font-serif italic drop-shadow">
            &ldquo;Marbulung ma ampalu, marbatu ma da purba. Tubu ma anak na bisuk, boru na pande marroha. Sai horas jala gabe.&rdquo;
          </p>

          {/* Guest VIP Badge */}
          <div className="bg-black/60 border border-[#c9982e]/40 backdrop-blur-md rounded-2xl px-6 py-4 max-w-sm shadow-2xl">
            <p className="text-[11px] uppercase tracking-widest text-[#edd59e] font-serif">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-2xl font-serif font-medium text-white tracking-wide mt-1 drop-shadow-sm">
              {guestName}
            </p>
            <p className="text-xs text-white/70 italic mt-1 font-serif">
              Di Tempat
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE (DESKTOP 42% / MOBILE 100%): Scrollable Interactive Invitation */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] lg:ml-[58%] min-h-screen relative z-10 bg-[#fbf8f2] shadow-[-20px_0_60px_rgba(0,0,0,0.4)] border-l border-[#7e2231]/20">

        {/* Global Ambient Antique Texture */}
        <div 
          className="fixed top-0 right-0 w-full lg:w-[42%] h-screen z-0 pointer-events-none opacity-40 bg-repeat mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`
          }}
        />

        {/* ========================================================================= */}
        {/* 1. HERO SECTION: FULL-BLEED RUMAH ADAT BOLON BATAK SKY (Pristine Ultra HD)*/}
        {/* ========================================================================= */}
        <section className="relative min-h-[100dvh] w-full text-center select-none overflow-hidden">
          
          {/* Scenic Full-Bleed Ultra HD Background: Razor Sharp Rumah Bolon, Sky, Bunga Marun */}
          <div className="absolute inset-0 z-0 pointer-events-none select-none">
            <img 
              src="/themes/joglo-maroon-hero-clean.jpg" 
              alt="Rumah Adat Bolon Batak Sky Heritage" 
              className="w-full h-full object-cover object-center select-none brightness-[1.02]"
            />
            {/* Soft atmospheric gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/25 pointer-events-none" />
          </div>

          {/* Falling & Drifting Romantic Peony Petals Animation (Realistic 3D Physics) */}
          <JogloFallingPetals />

          {/* Hyper-Realistic 3D Flying & Flapping Butterflies */}
          <JogloButterflies />

          {/* Subtle Royal Floating Golden Dust */}
          <JogloRoyalDust />

          {/* Open Sky Centered Typography with Royal Crest, VIP Card & Umpasa */}
          <div className="absolute top-[7%] sm:top-[8%] inset-x-0 mx-auto z-10 w-full max-w-[320px] sm:max-w-md px-4 flex flex-col items-center">
            
            {/* Top Royal Batak Heritage Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7e2231]/8 border border-[#c9982e]/40 backdrop-blur-sm mb-1.5 shadow-sm">
              <Sparkles className="w-3 h-3 text-[#c9982e]" />
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#7e2231] font-serif font-semibold">
                Pesta Adat Batak Heritage
              </span>
            </div>

            {/* Sacred Batak Gorga Crest Monogram */}
            <BatakGorgaCrest className="w-9 h-11 text-[#c9982e] mb-1 filter drop-shadow-[0_2px_6px_rgba(201,152,46,0.3)]" />

            <p className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-[#6d1925] font-serif font-semibold mb-0.5 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              The Wedding Of
            </p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6d1925] tracking-[0.14em] uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] leading-tight">
              {groomName}
            </h1>

            <div className="relative my-0.5">
              <span className="text-lg sm:text-xl font-serif italic text-[#721c29] font-normal drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                &amp;
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#6d1925] tracking-[0.14em] uppercase drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] leading-tight mb-1">
              {brideName}
            </h2>

            <p className="text-xs sm:text-sm font-serif font-semibold tracking-[0.2em] text-[#6d1925] drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)] mb-0.5">
              {heroDate}
            </p>

            <p className="text-[10px] sm:text-xs font-serif italic tracking-wider text-[#6d1925]/90 drop-shadow-[0_1px_3px_rgba(255,255,255,0.9)]">
              {heroHashtag}
            </p>

            {/* Traditional Batak Gorga Divider Flourish */}
            <BatakGorgaFlourish className="w-36 h-4 my-1 opacity-80" />

            {/* VIP Guest Invitation Recipient Card */}
            <div className="mt-1.5 px-5 py-2 rounded-2xl bg-[#fffefc]/85 backdrop-blur-md border border-[#c9982e]/45 shadow-[0_4px_16px_rgba(110,25,37,0.1)] flex flex-col items-center max-w-[250px] mx-auto">
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#7e2231]/80 font-serif font-medium">
                Kepada Yth. Bapak/Ibu/Saudara/i:
              </span>
              <span className="text-sm font-serif font-bold text-[#6d1925] tracking-wide mt-0.5">
                {guestName}
              </span>
              <span className="text-[10px] text-[#7e2231]/70 font-serif italic">
                Di Tempat
              </span>
            </div>

            {/* Sacred Umpasa Blessing */}
            <p className="text-[10px] font-serif italic text-[#721c29]/80 max-w-[270px] text-center mt-1.5 leading-relaxed drop-shadow-[0_1px_2px_rgba(255,255,255,0.85)]">
              &ldquo;Sai horas jala gabe, marbulung ma ampalu marbatu ma da purba.&rdquo;
            </p>
          </div>

          {/* Bottom Interactive Scroll Indicator (Positioned gracefully at garden walkway) */}
          <div className="absolute bottom-5 sm:bottom-7 inset-x-0 mx-auto z-10 w-fit flex flex-col items-center justify-center">
            <button
              onClick={() => {
                const quoteSection = document.getElementById('wedding-couple-card');
                if (quoteSection) {
                  quoteSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#721c29]/92 hover:bg-[#59141f] text-[#fff5ea] border border-[#c9982e]/55 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.35)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-xs font-serif uppercase tracking-[0.2em] font-medium text-[#fff5ea]">
                Gulir ke Bawah
              </span>
              <ChevronDown className="w-4 h-4 text-[#edd59e] animate-bounce" />
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. CINEMATIC FULL PHOTO STAGE + AYAT SUCI AR-RUM 21 + LIVE COUNTDOWN      */}
        {/* ========================================================================= */}
        <section id="wedding-couple-card" className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-end items-center text-center select-none overflow-hidden pb-12 sm:pb-16 px-6">
          
          {/* Full-Bleed Master Pre-wedding Background Photo */}
          <div className="absolute inset-0 z-0">
            <img 
              src={coupleCoverPhoto || '/photos/photo-3.jpg'} 
              alt={`${groomName} & ${brideName}`} 
              className="w-full h-full object-cover object-top sm:object-center brightness-[0.95]"
            />
            {/* Cinematic Gradient Overlays for High Contrast Text Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/25 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/70 pointer-events-none" />
          </div>

          {/* Glowing Ambient Sparks & Floating Dust */}
          <JogloRoyalDust />

          {/* Center Content: Holy Scripture Verse (Ar-Rum Ayat 21) */}
          <div className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto flex flex-col items-center mb-8">
            <p className="text-xs sm:text-sm md:text-base font-serif italic text-white/95 leading-relaxed tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              &ldquo;{invitation?.settings?.quote || 'Di antara tanda-tanda (kebesaran)-Nya ialah bahwa Dia menciptakan pasangan-pasangan untukmu dari (jenis) dirimu sendiri agar kamu merasa tenteram kepadanya. Dia menjadikan di antaramu rasa cinta dan kasih sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.'}&rdquo;
            </p>

            <p className="text-xs sm:text-sm font-serif font-medium text-[#ffd778] tracking-widest uppercase mt-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              {invitation?.settings?.quote_source || 'Ar Rum Ayat 21'}
            </p>
          </div>

          {/* Live Horizontal Countdown Timer (0 : 0 : 0 : 0) */}
          <div className="relative z-10 w-full max-w-xs sm:max-w-sm mx-auto mb-8">
            <div className="flex items-center justify-center gap-3 sm:gap-5 text-white">
              {/* Hari */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-serif font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-w-[40px]">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#f5efe4]/80 mt-0.5">
                  Hari
                </span>
              </div>

              <span className="text-2xl sm:text-3xl font-light text-[#ffd778]/70 mb-4">:</span>

              {/* Jam */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-serif font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-w-[40px]">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#f5efe4]/80 mt-0.5">
                  Jam
                </span>
              </div>

              <span className="text-2xl sm:text-3xl font-light text-[#ffd778]/70 mb-4">:</span>

              {/* Menit */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-serif font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-w-[40px]">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#f5efe4]/80 mt-0.5">
                  Min
                </span>
              </div>

              <span className="text-2xl sm:text-3xl font-light text-[#ffd778]/70 mb-4">:</span>

              {/* Detik */}
              <div className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl font-serif font-light text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] min-w-[40px]">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-serif uppercase tracking-widest text-[#f5efe4]/80 mt-0.5">
                  Det
                </span>
              </div>
            </div>
          </div>

          {/* Action Button: [ 📅 SAVE THE DATE ] */}
          <div className="relative z-10 w-fit mx-auto">
            <button
              onClick={() => handleAddToCalendar(mainEvent)}
              className="group inline-flex items-center gap-2.5 px-7 py-3 rounded-md bg-[#7e2231]/95 hover:bg-[#631824] text-white border border-[#c9982e]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-sm"
            >
              <CalendarIcon className="w-4 h-4 text-[#ffd778] group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-sm font-serif uppercase tracking-[0.22em] font-semibold text-white">
                Save The Date
              </span>
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROFIL MEMPELAI (GROOM & BRIDE) - ROYAL MAROON ARCHED FRAME CARD      */}
        {/* ========================================================================= */}
        <section id="wedding-couple-section" className="relative px-3.5 sm:px-6 py-10 sm:py-14 text-center select-none overflow-hidden">
          
          {/* Section Micro-Animation Styles */}
          <style>{`
            @keyframes floralBreathe {
              0%, 100% {
                transform: scale(1) rotate(0deg);
              }
              50% {
                transform: scale(1.04) rotate(1.8deg);
              }
            }
            @keyframes floralBreatheReverse {
              0%, 100% {
                transform: scale(1) rotate(0deg);
              }
              50% {
                transform: scale(1.04) rotate(-1.8deg);
              }
            }
            @keyframes portraitGlowPulse {
              0%, 100% {
                box-shadow: 0 10px 25px rgba(0,0,0,0.15), 0 0 14px rgba(201,152,46,0.22);
              }
              50% {
                box-shadow: 0 14px 35px rgba(0,0,0,0.2), 0 0 24px rgba(201,152,46,0.45);
              }
            }
          `}</style>

          {/* Full scenic background framing with side floral garlands & bottom architectural heritage */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/themes/joglo-maroon-bg-clean.jpg" 
              alt="" 
              className="w-full h-full object-cover object-top brightness-100"
            />
            <div className="absolute inset-0 bg-[#fffdfa]/15 backdrop-blur-[0.5px]" />
          </div>

          {/* Drifting Petals & Golden Pollen Layer */}
          <JogloFallingPetals className="z-15" />

          {/* Glowing Ambient Sparks & Floating Dust */}
          <JogloRoyalDust />

          {/* Central Royal Invitation Card */}
          <div className="max-w-[365px] sm:max-w-md mx-auto bg-[#fffdfa]/95 backdrop-blur-md border-2 border-[#7e2231]/85 rounded-[32px] sm:rounded-[38px] p-6 sm:p-8 pb-10 sm:pb-12 shadow-[0_20px_50px_rgba(110,25,37,0.18)] relative z-10 overflow-hidden">
            
            {/* Antique Royal Gold Corner Filigrees (Prada Emas Keraton) */}
            <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              <RoyalCornerFiligree className="w-7 h-7 sm:w-8 sm:h-8" position="tl" />
            </div>
            <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              <RoyalCornerFiligree className="w-7 h-7 sm:w-8 sm:h-8" position="tr" />
            </div>
            <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              <RoyalCornerFiligree className="w-7 h-7 sm:w-8 sm:h-8" position="bl" />
            </div>
            <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
              <RoyalCornerFiligree className="w-7 h-7 sm:w-8 sm:h-8" position="br" />
            </div>

            {/* Royal Gold Foil Light Shimmer Sweep */}
            <div 
              className="absolute inset-0 pointer-events-none z-15 overflow-hidden rounded-[32px] sm:rounded-[38px]"
              style={{ mixBlendMode: 'screen' }}
            >
              <div 
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ffd778]/18 to-transparent will-change-transform"
                style={{ animation: 'cardGoldSheen 8s ease-in-out infinite' }}
              />
            </div>

            {/* Top Regal Flourish & Title */}
            <div className="relative z-10 flex flex-col items-center mb-4">
              <BatakGorgaFlourish className="w-36 sm:w-44 h-5 mx-auto mb-2 text-[#c9982e] drop-shadow-[0_1px_3px_rgba(201,152,46,0.3)]" />
              <span className="text-[10px] sm:text-[11px] font-serif uppercase tracking-[0.3em] text-[#8a1c2e] font-bold">
                Mempelai Pengantin
              </span>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c9982e] to-transparent mx-auto mt-2" />
            </div>

            {/* Top Polite Greeting & Honor Prose */}
            <p className="relative z-10 text-[11.5px] sm:text-xs text-[#523d38] font-serif leading-[1.85] tracking-wide text-center max-w-xs mx-auto mb-8 font-normal">
              Merupakan Suatu Kehormatan Dan Kebahagiaan Bagi Kami Apabila Bapak/Ibu/Saudara/i Berkenan Untuk Hadir Dan Memberikan Doa Restu. Atas Kehadiran Dan Doa Restunya Kami Ucapkan Terima Kasih.
            </p>

            {/* 1. Mempelai Pria (Groom) */}
            <div className="flex flex-col items-center relative z-10">
              
              {/* Outer Wrapper for Arch Portrait with Unclipped Botanical Accents */}
              <div className="relative mx-auto mb-14 sm:mb-16">
                {/* Golden Crown Crest atop the arch */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <BatakGorgaCrest className="w-6 h-8 mx-auto drop-shadow-[0_2px_4px_rgba(138,99,16,0.4)]" />
                </div>

                {/* Arched Oval Portrait Frame with Pulsing Golden Halo */}
                <div 
                  className="relative w-[185px] h-[280px] sm:w-[205px] sm:h-[305px] mx-auto rounded-t-full rounded-b-[70px] sm:rounded-b-[80px] overflow-hidden border-2 border-[#7e2231]/85 shadow-md group ring-2 ring-[#edd59e]/50"
                  style={{ animation: 'portraitGlowPulse 6s ease-in-out infinite' }}
                >
                  <img 
                    src={groomPhoto || '/groom-default.png'} 
                    alt={groomFullName} 
                    className="w-full h-full object-cover object-[center_20%] sm:object-center transform group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Ultra-HD Botanical Crescent Floral Garland hugging the oval base */}
                <div 
                  className="absolute -bottom-14 sm:-bottom-16 left-1/2 -translate-x-1/2 w-[305px] sm:w-[330px] z-20 pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
                  style={{ animation: 'floralBreathe 7s ease-in-out infinite' }}
                >
                  <img 
                    src="/themes/joglo-portrait-crescent-hd.png" 
                    alt="Floral Garland" 
                    className="w-full h-auto object-contain filter contrast-110 brightness-100" 
                  />
                </div>
              </div>

              {/* Groom Nickname (Cursive Script / Calligraphy) */}
              <p 
                className="text-4xl sm:text-5xl text-[#7e2231] font-normal tracking-wide mb-1 drop-shadow-sm leading-tight"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {groomName}
              </p>

              {/* Groom Full Name */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#3b231d] tracking-wide mb-1.5">
                {groomFullName}
              </h3>

              {/* Groom Parents */}
              <p className="text-xs sm:text-[13px] text-[#553b34] font-serif leading-relaxed mb-6 sm:mb-7 max-w-xs mx-auto">
                {groomParents}
              </p>

              {/* Instagram Button */}
              <a
                href={couple?.groom_instagram ? `https://instagram.com/${couple.groom_instagram.replace('@', '')}` : 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#8a1c2e] hover:bg-[#6e1423] text-white text-[11px] font-sans font-bold tracking-wider shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-white" />
                <span>INSTAGRAM</span>
              </a>
            </div>

            {/* Central Decorative Ampersand '&' with Royal Botanical Dividers */}
            <div className="my-8 flex items-center justify-center gap-3 max-w-[240px] mx-auto relative z-10">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c9982e]/60 to-[#7e2231]" />
              <div className="relative flex items-center justify-center w-11 h-11 rounded-full border border-[#c9982e]/60 bg-gradient-to-b from-[#fffdfa] to-[#fbf2e6] shadow-[0_4px_12px_rgba(201,152,46,0.25)]">
                <span className="text-2xl sm:text-3xl font-serif italic text-[#7e2231] font-light leading-none select-none drop-shadow-sm">
                  &amp;
                </span>
                {/* Small golden accent sparkles */}
                <div className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#edd59e] shadow-[0_0_6px_#c9982e]" />
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#edd59e] shadow-[0_0_6px_#c9982e]" />
              </div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c9982e]/60 to-[#7e2231]" />
            </div>

            {/* 2. Mempelai Wanita (Bride) */}
            <div className="flex flex-col items-center relative z-10">
              
              {/* Outer Wrapper for Arch Portrait with Unclipped Botanical Accents */}
              <div className="relative mx-auto mb-14 sm:mb-16">
                {/* Golden Crown Crest atop the arch */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                  <BatakGorgaCrest className="w-6 h-8 mx-auto drop-shadow-[0_2px_4px_rgba(138,99,16,0.4)]" />
                </div>

                {/* Arched Oval Portrait Frame with Pulsing Golden Halo */}
                <div 
                  className="relative w-[185px] h-[280px] sm:w-[205px] sm:h-[305px] mx-auto rounded-t-full rounded-b-[70px] sm:rounded-b-[80px] overflow-hidden border-2 border-[#7e2231]/85 shadow-md group ring-2 ring-[#edd59e]/50"
                  style={{ animation: 'portraitGlowPulse 6s ease-in-out infinite' }}
                >
                  <img 
                    src={bridePhoto || '/bride-default.png'} 
                    alt={brideFullName} 
                    className="w-full h-full object-cover object-[center_30%] sm:object-center transform group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>

                {/* Ultra-HD Botanical Crescent Floral Garland hugging the oval base */}
                <div 
                  className="absolute -bottom-14 sm:-bottom-16 left-1/2 -translate-x-1/2 w-[305px] sm:w-[330px] z-20 pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.32)]"
                  style={{ animation: 'floralBreathe 7s ease-in-out infinite' }}
                >
                  <img 
                    src="/themes/joglo-portrait-crescent-hd.png" 
                    alt="Floral Garland" 
                    className="w-full h-auto object-contain filter contrast-110 brightness-100" 
                  />
                </div>
              </div>

              {/* Bride Nickname (Cursive Script / Calligraphy) */}
              <p 
                className="text-4xl sm:text-5xl text-[#7e2231] font-normal tracking-wide mb-1 drop-shadow-sm leading-tight"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                {brideName}
              </p>

              {/* Bride Full Name */}
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#3b231d] tracking-wide mb-1.5">
                {brideFullName}
              </h3>

              {/* Bride Parents */}
              <p className="text-xs sm:text-[13px] text-[#553b34] font-serif leading-relaxed mb-8 sm:mb-9 max-w-xs mx-auto">
                {brideParents}
              </p>

              {/* Instagram Button */}
              <a
                href={couple?.bride_instagram ? `https://instagram.com/${couple.bride_instagram.replace('@', '')}` : 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-full bg-[#8a1c2e] hover:bg-[#6e1423] text-white text-[11px] font-sans font-bold tracking-wider shadow-sm transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase mb-2 relative z-10"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-white" />
                <span>INSTAGRAM</span>
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. ACARA PERNIKAHAN (WEDDING EVENT) - BESPOKE ROYAL FLORAL OVAL FRAMES     */}
        {/* ========================================================================= */}
        <section id="wedding-event-section" className="relative px-4 sm:px-6 py-16 text-center select-none overflow-hidden">
          
          {/* Card Gold Foil Sweep Animation Keyframe */}
          <style>{`
            @keyframes cardGoldSheen {
              0%, 35% {
                transform: translateX(-160%) skewX(-25deg);
                opacity: 0;
              }
              50% {
                opacity: 0.35;
              }
              65%, 100% {
                transform: translateX(260%) skewX(-25deg);
                opacity: 0;
              }
            }
          `}</style>

          {/* Full-Bleed Master Pre-wedding Background Photo */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src={coupleCoverPhoto || '/photos/photo-3.jpg'} 
              alt="Wedding Event Background" 
              className="w-full h-full object-cover object-top sm:object-center brightness-[0.75]"
            />
            {/* Cinematic Gradient Overlays for High Legibility & Drama */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/45 to-black/90 pointer-events-none" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />
          </div>

          {/* Drifting Petals & Golden Pollen Layer */}
          <JogloFallingPetals className="z-10" />

          {/* Glowing Ambient Sparks & Floating Dust */}
          <JogloRoyalDust />

          <div className="relative z-10 max-w-md mx-auto text-center">
            
            {/* Section Header */}
            <div className="mb-10 max-w-sm mx-auto">
              <span className="text-[10px] sm:text-xs font-serif uppercase tracking-[0.35em] text-[#edd59e] font-semibold drop-shadow mb-1.5 block">
                The Sacred Union
              </span>

              <h2 className="text-3xl sm:text-4xl font-serif font-light text-[#fff5ea] tracking-[0.12em] mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                Wedding Event
              </h2>

              {/* Regal Gable Flourish */}
              <BatakGorgaFlourish className="w-40 sm:w-48 h-5 mx-auto mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />

              <p className="text-xs sm:text-[13px] font-serif italic text-[#fbf5eb]/95 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-2 font-normal">
                Dengan mengucap puji dan syukur kepada Tuhan, kami bermaksud mengundang Anda untuk dapat menghadiri acara pernikahan kami yang akan dilaksanakan pada :
              </p>
            </div>

            {/* =================================================================== */}
            {/* Card 1: AKAD NIKAH / PEMBERKATAN                                    */}
            {/* =================================================================== */}
            <div className="relative w-full max-w-[335px] sm:max-w-[360px] aspect-[2/3] mx-auto mb-10 rounded-[36px] sm:rounded-[42px] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_25px_rgba(201,152,46,0.18)] border border-[#edd59e]/35 overflow-hidden flex flex-col justify-center items-center group transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Bespoke Fine Art Floral Oval Frame Background */}
              <img 
                src="/themes/joglo-event-floral-frame.jpg" 
                alt="Floral Frame" 
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
              />

              {/* Antique Royal Gold Corner Filigrees (Prada Emas Keraton) */}
              <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tl" />
              </div>
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tr" />
              </div>
              <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="bl" />
              </div>
              <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="br" />
              </div>

              {/* Royal Gold Foil Light Shimmer Sweep Animation */}
              <div 
                className="absolute inset-0 pointer-events-none z-15 overflow-hidden rounded-[36px] sm:rounded-[42px]"
                style={{ mixBlendMode: 'screen' }}
              >
                <div 
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ffd778]/25 to-transparent will-change-transform"
                  style={{ animation: 'cardGoldSheen 7.5s ease-in-out infinite' }}
                />
              </div>

              {/* Inner Content Layer strictly fitted inside the oval opening */}
              <div className="relative z-10 flex flex-col items-center justify-center py-3.5 sm:py-4 px-2.5 text-center w-[74%] max-w-[205px] mx-auto">
                
                {/* Golden Batak Gorga & Rumah Bolon Crest */}
                <BatakGorgaCrest className="w-6.5 h-8 sm:w-7 sm:h-9 mx-auto mb-1 filter drop-shadow-[0_2px_4px_rgba(138,99,16,0.35)]" />

                {/* Title */}
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#7e2231] tracking-[0.16em] uppercase mb-0.5">
                  {mainEvent.event_name || 'AKAD NIKAH'}
                </h3>

                {/* Heart Line Divider */}
                <div className="flex items-center justify-center gap-1.5 my-1 w-24 mx-auto">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#7e2231]/50" />
                  <Heart className="w-2 h-2 text-[#7e2231] fill-[#7e2231]" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#7e2231]/50" />
                </div>

                {/* Day & Date */}
                <p className="text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.12em] text-[#3d231e] uppercase">
                  {mainEvent.event_date 
                    ? new Date(mainEvent.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
                    : 'MINGGU, 12 APRIL 2026'}
                </p>

                {/* Time */}
                <p className="text-[9px] sm:text-[10px] font-serif font-medium tracking-wide text-[#6e5147] mb-1.5">
                  {mainEvent.start_time || '08.30 WIB'} - {mainEvent.end_time || '09.30 WIB'}
                </p>

                {/* Location Map Pin Icon */}
                <MapPin className="w-3 h-3 text-[#7e2231] fill-[#7e2231] mb-0.5" />

                {/* Venue Name */}
                <h4 className="text-[9.5px] sm:text-[10px] font-serif font-bold text-[#3d231e] tracking-[0.06em] uppercase mb-0.5 leading-snug">
                  {mainEvent.venue_name || 'KEDIAMAN MEMPELAI WANITA'}
                </h4>

                {/* Venue Address */}
                <p className="text-[8px] sm:text-[8.5px] text-[#5c3e35] font-serif leading-relaxed max-w-[175px] mx-auto mb-2 font-normal">
                  {mainEvent.address}
                </p>

                {/* Action Buttons: Calendar Reminder & Google Map - Symmetrical Luxury Duo */}
                <div className="flex items-center justify-center gap-2 mt-0.5 w-full max-w-[195px] mx-auto">
                  <button
                    type="button"
                    onClick={() => handleAddToCalendar(mainEvent)}
                    className="flex-1 h-7 inline-flex items-center justify-center gap-1 px-2 rounded-full bg-gradient-to-r from-[#8a1c2e] to-[#6e1423] hover:brightness-110 text-white text-[8px] sm:text-[8.5px] font-sans font-bold tracking-wider shadow-[0_2px_6px_rgba(110,25,37,0.3)] border border-[#edd59e]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer uppercase whitespace-nowrap"
                  >
                    <CalendarIcon className="w-2.5 h-2.5 text-[#f6d88b] shrink-0" />
                    <span>Ingatkan</span>
                  </button>

                  {mainEvent.map_url && (
                    <a
                      href={mainEvent.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-7 inline-flex items-center justify-center gap-1 px-2 rounded-full bg-gradient-to-r from-[#8a1c2e] to-[#6e1423] hover:brightness-110 text-white text-[8px] sm:text-[8.5px] font-sans font-bold tracking-wider shadow-[0_2px_6px_rgba(110,25,37,0.3)] border border-[#edd59e]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer uppercase whitespace-nowrap"
                    >
                      <MapPin className="w-2.5 h-2.5 text-[#f6d88b] shrink-0" />
                      <span>Google Map</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================================== */}
            {/* Card 2: RESEPSI PERNIKAHAN                                         */}
            {/* =================================================================== */}
            <div className="relative w-full max-w-[335px] sm:max-w-[360px] aspect-[2/3] mx-auto mb-6 rounded-[36px] sm:rounded-[42px] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_25px_rgba(201,152,46,0.18)] border border-[#edd59e]/35 overflow-hidden flex flex-col justify-center items-center group transition-transform duration-500 hover:scale-[1.01]">
              
              {/* Bespoke Fine Art Floral Oval Frame Background */}
              <img 
                src="/themes/joglo-event-floral-frame.jpg" 
                alt="Floral Frame" 
                className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none"
              />

              {/* Antique Royal Gold Corner Filigrees (Prada Emas Keraton) */}
              <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tl" />
              </div>
              <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tr" />
              </div>
              <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="bl" />
              </div>
              <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]">
                <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="br" />
              </div>

              {/* Royal Gold Foil Light Shimmer Sweep Animation */}
              <div 
                className="absolute inset-0 pointer-events-none z-15 overflow-hidden rounded-[36px] sm:rounded-[42px]"
                style={{ mixBlendMode: 'screen' }}
              >
                <div 
                  className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ffd778]/25 to-transparent will-change-transform"
                  style={{ animation: 'cardGoldSheen 7.5s ease-in-out infinite 3.75s' }}
                />
              </div>

              {/* Inner Content Layer strictly fitted inside the oval opening */}
              <div className="relative z-10 flex flex-col items-center justify-center py-3.5 sm:py-4 px-2.5 text-center w-[74%] max-w-[205px] mx-auto">
                
                {/* Golden Batak Gorga & Rumah Bolon Crest */}
                <BatakGorgaCrest className="w-6.5 h-8 sm:w-7 sm:h-9 mx-auto mb-1 filter drop-shadow-[0_2px_4px_rgba(138,99,16,0.35)]" />

                {/* Title */}
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#7e2231] tracking-[0.16em] uppercase leading-tight mb-0.5">
                  {receptionEvent.event_name === 'Resepsi Pernikahan' ? (
                    <>RESEPSI<br />PERNIKAHAN</>
                  ) : (
                    receptionEvent.event_name
                  )}
                </h3>

                {/* Heart Line Divider */}
                <div className="flex items-center justify-center gap-1.5 my-1 w-24 mx-auto">
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#7e2231]/50" />
                  <Heart className="w-2 h-2 text-[#7e2231] fill-[#7e2231]" />
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#7e2231]/50" />
                </div>

                {/* Day & Date */}
                <p className="text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.12em] text-[#3d231e] uppercase">
                  {receptionEvent.event_date 
                    ? new Date(receptionEvent.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
                    : 'MINGGU, 12 APRIL 2026'}
                </p>

                {/* Time */}
                <p className="text-[9px] sm:text-[10px] font-serif font-medium tracking-wide text-[#6e5147] mb-1.5">
                  {receptionEvent.start_time || '11.00 WIB'} - {receptionEvent.end_time || 'Selesai'}
                </p>

                {/* Location Map Pin Icon */}
                <MapPin className="w-3 h-3 text-[#7e2231] fill-[#7e2231] mb-0.5" />

                {/* Venue Name */}
                <h4 className="text-[9.5px] sm:text-[10px] font-serif font-bold text-[#3d231e] tracking-[0.06em] uppercase mb-0.5 leading-snug">
                  {receptionEvent.venue_name || 'KEDIAMAN MEMPELAI WANITA'}
                </h4>

                {/* Venue Address */}
                <p className="text-[8px] sm:text-[8.5px] text-[#5c3e35] font-serif leading-relaxed max-w-[175px] mx-auto mb-2 font-normal">
                  {receptionEvent.address}
                </p>

                {/* Action Buttons: Calendar Reminder & Google Map - Symmetrical Luxury Duo */}
                <div className="flex items-center justify-center gap-2 mt-0.5 w-full max-w-[195px] mx-auto">
                  <button
                    type="button"
                    onClick={() => handleAddToCalendar(receptionEvent)}
                    className="flex-1 h-7 inline-flex items-center justify-center gap-1 px-2 rounded-full bg-gradient-to-r from-[#8a1c2e] to-[#6e1423] hover:brightness-110 text-white text-[8px] sm:text-[8.5px] font-sans font-bold tracking-wider shadow-[0_2px_6px_rgba(110,25,37,0.3)] border border-[#edd59e]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer uppercase whitespace-nowrap"
                  >
                    <CalendarIcon className="w-2.5 h-2.5 text-[#f6d88b] shrink-0" />
                    <span>Ingatkan</span>
                  </button>

                  {receptionEvent.map_url && (
                    <a
                      href={receptionEvent.map_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 h-7 inline-flex items-center justify-center gap-1 px-2 rounded-full bg-gradient-to-r from-[#8a1c2e] to-[#6e1423] hover:brightness-110 text-white text-[8px] sm:text-[8.5px] font-sans font-bold tracking-wider shadow-[0_2px_6px_rgba(110,25,37,0.3)] border border-[#edd59e]/50 transition-all duration-300 hover:scale-[1.03] active:scale-95 cursor-pointer uppercase whitespace-nowrap"
                    >
                      <MapPin className="w-2.5 h-2.5 text-[#f6d88b] shrink-0" />
                      <span>Google Map</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. LIVE STREAMING - CINEMATIC ROYAL COUPLE PORTRAIT CARD                   */}
        {/* ========================================================================= */}
        <section id="live-streaming-section" className="relative px-4 sm:px-6 py-12 sm:py-16 select-none overflow-hidden">
          
          {/* Drifting Petals & Golden Royal Dust in Background */}
          <JogloFallingPetals className="z-5" />

          {/* Central Cinematic Live Streaming Card */}
          <div className="relative w-full max-w-[335px] sm:max-w-[360px] aspect-[3/4] sm:aspect-[4/5] mx-auto rounded-[34px] sm:rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.7),0_0_25px_rgba(201,152,46,0.22)] border border-[#edd59e]/40 overflow-hidden flex flex-col justify-end group transition-transform duration-500 hover:scale-[1.01]">
            
            {/* High-Resolution Traditional Royal Couple Portrait Background */}
            <img 
              src={invitation?.live_streaming_image || coupleCoverPhoto || '/photos/photo-3.jpg'} 
              alt="Live Streaming" 
              className="absolute inset-0 w-full h-full object-cover object-top filter brightness-[0.98] contrast-105 group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none" 
            />

            {/* Smooth Cinematic Dark Shading Gradient for Superior Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 via-50% to-transparent pointer-events-none z-10" />

            {/* Antique Royal Gold Corner Filigrees (Prada Emas Keraton) */}
            <div className="absolute top-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tl" />
            </div>
            <div className="absolute top-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="tr" />
            </div>
            <div className="absolute bottom-3.5 left-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="bl" />
            </div>
            <div className="absolute bottom-3.5 right-3.5 z-20 pointer-events-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
              <RoyalCornerFiligree className="w-8 h-8 sm:w-9 sm:h-9" position="br" />
            </div>

            {/* Royal Gold Foil Light Shimmer Sweep Animation */}
            <div 
              className="absolute inset-0 pointer-events-none z-15 overflow-hidden rounded-[34px] sm:rounded-[40px]"
              style={{ mixBlendMode: 'screen' }}
            >
              <div 
                className="w-1/2 h-full bg-gradient-to-r from-transparent via-[#ffd778]/25 to-transparent will-change-transform"
                style={{ animation: 'cardGoldSheen 7.5s ease-in-out infinite 1.5s' }}
              />
            </div>

            {/* Live Streaming Bottom Overlay Content - Authentic Left-Aligned Layout */}
            <div className="relative z-20 p-6 sm:p-7 flex flex-col items-start text-left">
              
              {/* Heading */}
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-[0.14em] uppercase mb-1.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                LIVE STREAMING
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-stone-200/95 font-serif leading-relaxed max-w-[240px] sm:max-w-[270px] mb-4 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] font-normal">
                Pernikahan kami dapat disaksikan secara langsung melalui live streaming di bawah ini.
              </p>

              {/* Action Button: [ 📹 JOIN LIVE ] */}
              <a
                href={invitation?.live_streaming_url || couple?.live_stream_url || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#8a1c2e] hover:bg-[#6e1423] text-white border-y border-[#edd59e] border-x border-[#edd59e]/35 shadow-[0_4px_16px_rgba(0,0,0,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer uppercase tracking-[0.22em] text-[10.5px] sm:text-[11px] font-serif font-semibold group/btn"
              >
                <Video className="w-3.5 h-3.5 text-[#f6d88b] group-hover/btn:scale-110 transition-transform" />
                <span className="text-white drop-shadow-xs">JOIN LIVE</span>
              </a>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. OUR GALLERY - BESPOKE FEATURED SHOWCASE & 3-COLUMN PORTRAIT GRID        */}
        {/* ========================================================================= */}
        <section id="gallery-section" className="relative px-4 sm:px-6 py-12 sm:py-16 select-none">
          <div className="max-w-md mx-auto text-center">
            
            {/* Header: OUR GALLERY with Gorga Flourish Accent */}
            <div className="flex flex-col items-center mb-6">
              <BatakGorgaFlourish className="w-36 sm:w-44 h-5 mx-auto mb-2 text-[#c9982e] drop-shadow-[0_1px_3px_rgba(201,152,46,0.3)]" />
              <h2 className="text-2xl sm:text-3xl font-serif font-bold tracking-[0.2em] text-[#7e2231] uppercase">
                OUR GALLERY
              </h2>
              <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-[#c9982e] to-transparent mx-auto mt-2.5" />
            </div>

            {/* Featured Landscape Showcase / Video Player */}
            <div className="w-full max-w-[340px] sm:max-w-[365px] aspect-[16/10] sm:aspect-[16/9] mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_35px_rgba(110,25,37,0.18)] border-2 border-[#edd59e]/50 relative group cursor-pointer mb-4 bg-black">
              {invitation?.video_url ? (
                invitation.video_url.includes('youtube') || invitation.video_url.includes('youtu.be') ? (
                  <iframe
                    src={invitation.video_url.replace('watch?v=', 'embed/')}
                    title="Prewedding Video"
                    className="w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video 
                    src={invitation.video_url} 
                    controls 
                    poster="/photos/photo-3.jpg" 
                    className="w-full h-full object-cover" 
                  />
                )
              ) : (
                <div 
                  onClick={() => setSelectedPhoto('/photos/photo-3.jpg')}
                  className="w-full h-full relative"
                >
                  <img 
                    src="/photos/photo-3.jpg" 
                    alt="Featured Prewedding" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/15 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#7e2231]/90 border border-[#edd59e] flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 text-[#f6d88b] ml-0.5 fill-[#f6d88b]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3-Column Prewedding Portrait Grid */}
            <div className="grid grid-cols-3 gap-2 sm:gap-2.5 max-w-[340px] sm:max-w-[365px] mx-auto">
              {(gallery && gallery.length > 0 ? gallery : [
                { image_url: '/photos/photo-1.jpg', id: '1' },
                { image_url: '/photos/photo-3.jpg', id: '2' },
                { image_url: '/photos/photo-4.jpg', id: '3' },
                { image_url: '/photos/photo-5.jpg', id: '4' },
                { image_url: '/photos/photo-6.jpg', id: '5' },
                { image_url: '/photos/photo-7.jpg', id: '6' },
                { image_url: '/photos/photo-8.jpg', id: '7' },
                { image_url: '/photos/photo-9.jpg', id: '8' },
                { image_url: '/groom-default.png', id: '9' },
              ]).map((item: any, idx: number) => (
                <div 
                  key={item.id || idx}
                  onClick={() => setSelectedPhoto(item.image_url)}
                  className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border border-[#7e2231]/20 shadow-sm cursor-pointer group bg-stone-100"
                >
                  <img 
                    src={item.image_url} 
                    alt={`Gallery ${idx + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                    <Sparkles className="w-4 h-4 text-[#edd59e]" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. LOVE STORY - JOGLO SCENIC WALLPAPER TIMELINE WITH ROYAL HEART NODES    */}
        {/* ========================================================================= */}
        <section id="love-story-section" className="relative px-4 sm:px-6 py-14 sm:py-18 select-none overflow-hidden">
          
          {/* Full scenic background framing with Joglo pavillion & floral heritage */}
          <div className="absolute inset-0 z-0 pointer-events-none">
            <img 
              src="/themes/joglo-maroon-bg-clean.jpg" 
              alt="" 
              className="w-full h-full object-cover object-top brightness-100"
            />
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
          </div>

          {/* Drifting Petals & Golden Royal Dust Layer */}
          <JogloFallingPetals className="z-5" />
          <JogloRoyalDust />

          <div className="relative z-10 max-w-md mx-auto text-center">
            
            {/* Header: Romantic Cursive Script Calligraphy matching reference */}
            <h2 
              className="text-4xl sm:text-5xl text-white font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] mb-8 tracking-wide"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Love Story
            </h2>

            {/* Continuous Vertical Timeline Wrapper */}
            <div className="relative space-y-6 sm:space-y-8 pl-1 sm:pl-2">
              
              {/* Continuous Vertical White Timeline Line */}
              <div className="absolute left-[18px] sm:left-[22px] top-6 bottom-6 w-[2px] bg-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] pointer-events-none" />

              {effectiveStories.map((story: any) => (
                <div key={story.id} className="relative flex items-start gap-3 sm:gap-4.5 pl-0.5">
                  
                  {/* White circular badge with red heart centered on the timeline line */}
                  <div className="relative z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.35)] flex items-center justify-center shrink-0 mt-3 border border-white">
                    <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#8a1c2e] fill-[#8a1c2e]" />
                  </div>

                  {/* White Story Card with Speech-Bubble Triangle Pointer Notch */}
                  <div className="relative flex-1 bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-3 sm:p-4 shadow-[0_15px_35px_rgba(0,0,0,0.25)] border border-white/70 transition-transform duration-300 hover:scale-[1.01]">
                    
                    {/* Triangle notch pointing to the heart badge */}
                    <div 
                      className="absolute -left-2 top-4 w-0 h-0 border-y-[7px] border-y-transparent border-r-[8px] border-r-white/95 drop-shadow-[-2px_0_2px_rgba(0,0,0,0.05)]" 
                    />

                    {/* Story Portrait Image (aspect 4/5) */}
                    {story.image_url && (
                      <div className="w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 shadow-sm border border-stone-200/50 bg-stone-100">
                        <img 
                          src={story.image_url} 
                          alt={story.title} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {/* Story Title & Description */}
                    <div className="px-1 text-left">
                      <h4 className="text-base sm:text-lg font-serif font-bold text-[#8a1c2e] mb-1.5 leading-snug">
                        {story.title}
                      </h4>
                      <p className="text-[11.5px] sm:text-xs text-[#523d38] font-serif leading-[1.8] font-normal">
                        {story.content}
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. WEDDING GIFT / AMPLOP DIGITAL & KIRIM KADO                             */}
        {/* ========================================================================= */}
        <section id="wedding-gift-section" className="relative py-16 sm:py-20 px-4 sm:px-6 select-none overflow-hidden">
          {/* Scenic Heritage Wallpaper & Mood Overlay */}
          <img 
            src="/themes/joglo-maroon-bg-clean.jpg" 
            alt="Scenic Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#250309]/85 via-[#38040e]/70 to-[#200207]/90 pointer-events-none" />

          {/* Floating Petals & Gold Dust */}
          <JogloFallingPetals />

          <div className="relative z-10 max-w-md mx-auto">
            {/* Arched Dome Vault Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto rounded-t-[175px] sm:rounded-t-[195px] rounded-b-[36px] sm:rounded-b-[44px] border-[2.5px] border-[#8a1c2e] bg-[#fffdfa]/95 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_25px_rgba(138,28,46,0.18)] overflow-hidden pt-20 sm:pt-24 px-6 sm:px-7 pb-8 sm:pb-9 text-center">
              
              {/* Subtle Joglo Pavilion Watermark inside card */}
              <img 
                src="/themes/joglo-maroon-bg-clean.jpg" 
                alt="Background Texture" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.09] mix-blend-multiply pointer-events-none select-none"
              />

              {/* Arch Floral Garland along Top Dome Rim */}
              <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
                <img 
                  src="/themes/joglo-portrait-crescent-hd.png" 
                  alt="Floral Arch Garland" 
                  className="w-[124%] max-w-none -translate-x-[10%] -translate-y-5 opacity-45 mix-blend-multiply"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Intertwined Wedding Gift Typography */}
                <div className="flex flex-col items-center justify-center relative mb-3">
                  <div className="relative inline-block text-left">
                    <span className="block font-['Great_Vibes'] text-[42px] sm:text-[48px] text-[#8a1c2e] leading-none drop-shadow-sm font-normal">
                      Wedding
                    </span>
                    <span className="block font-serif text-[28px] sm:text-[32px] font-bold text-[#7e2231] tracking-wide ml-12 sm:ml-14 -mt-2.5 leading-none">
                      Gift
                    </span>
                  </div>
                </div>

                {/* Courtesy Prose */}
                <p className="text-[11.5px] sm:text-xs text-[#523c34] font-serif italic leading-relaxed max-w-[275px] sm:max-w-[295px] mx-auto mt-3 mb-6">
                  Tanpa mengurangi rasa hormat, bagi rekan-rekan dan sahabat yang hendak memberikan tanda kasih untuk kami, dapat melalui nomor rekening di bawah ini.
                </p>

                {/* Bank Transfer Accounts */}
                <div className="space-y-0">
                  {effectiveGifts.map((gift: any, idx: number) => (
                    <div key={gift.id || idx}>
                      {idx > 0 && (
                        <div className="flex items-center justify-center gap-3 my-5 sm:my-6 w-3/4 max-w-[210px] mx-auto">
                          <div className="h-[1px] flex-1 bg-[#8a1c2e]/25"></div>
                          <Heart className="w-3.5 h-3.5 fill-[#8a1c2e] text-[#8a1c2e] shrink-0" />
                          <div className="h-[1px] flex-1 bg-[#8a1c2e]/25"></div>
                        </div>
                      )}
                      
                      <div className="text-center">
                        <p className="text-xs sm:text-[13px] font-serif text-[#5c3e38] font-medium tracking-wide">
                          {gift.bank_name || 'Bank Mandiri'}
                        </p>
                        <p className="text-xs sm:text-[13px] font-serif text-[#5c3e38] mt-0.5 tracking-wider font-normal">
                          No. Rekening {gift.account_number}
                        </p>
                        <p className="text-xs sm:text-[13px] font-serif text-[#5c3e38] mt-0.5">
                          a.n <span className="font-bold text-[#8a1c2e]">{gift.account_holder}</span>
                        </p>

                        <button
                          type="button"
                          onClick={() => handleCopyAccount(gift.account_number, idx)}
                          className="mt-2.5 inline-flex items-center justify-center gap-2 px-6 py-1.5 sm:py-2 rounded-full bg-[#962638] hover:bg-[#7e1c2c] text-white text-[11px] sm:text-xs font-sans font-semibold tracking-wide shadow-md transition-all active:scale-95"
                        >
                          <span>{copiedIndex === idx ? 'Tersalin' : 'Copy Rekening'}</span>
                          {copiedIndex === idx ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <Copy className="w-3.5 h-3.5 fill-current" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Heart Divider before Physical Gift */}
                <div className="flex items-center justify-center gap-3 my-5 sm:my-6 w-3/4 max-w-[210px] mx-auto">
                  <div className="h-[1px] flex-1 bg-[#8a1c2e]/25"></div>
                  <Heart className="w-3.5 h-3.5 fill-[#8a1c2e] text-[#8a1c2e] shrink-0" />
                  <div className="h-[1px] flex-1 bg-[#8a1c2e]/25"></div>
                </div>

                {/* Physical Gift / Kirim Kado */}
                <div className="text-center">
                  <p className="text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e]">
                    {physicalRecipient}
                  </p>
                  <p className="text-[11.5px] sm:text-xs text-[#5c3e38] font-serif leading-relaxed max-w-[260px] sm:max-w-[280px] mx-auto mt-0.5">
                    {physicalAddress}
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopyAddress(physicalAddress)}
                    className="mt-2.5 inline-flex items-center justify-center gap-2 px-6 py-1.5 sm:py-2 rounded-full bg-[#962638] hover:bg-[#7e1c2c] text-white text-[11px] sm:text-xs font-sans font-semibold tracking-wide shadow-md transition-all active:scale-95"
                  >
                    <span>{copiedAddress ? 'Alamat Tersalin' : 'Copy Alamat'}</span>
                    {copiedAddress ? (
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 fill-current" />
                    )}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8b. GIFT CONFIRM / KONFIRMASI PENGIRIMAN GIFT                             */}
        {/* ========================================================================= */}
        <section id="gift-confirm-section" className="relative py-14 sm:py-18 px-4 sm:px-6 select-none overflow-hidden">
          {/* Scenic Heritage Wallpaper & Mood Overlay */}
          <img 
            src="/themes/joglo-maroon-bg-clean.jpg" 
            alt="Scenic Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#200207]/90 via-[#38040e]/70 to-[#250309]/85 pointer-events-none" />

          {/* Floating Petals & Gold Dust */}
          <JogloFallingPetals />

          <div className="relative z-10 max-w-md mx-auto">
            {/* Arch Dome Oval Vault Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto rounded-[160px] sm:rounded-[180px] border-[2.5px] border-[#8a1c2e] bg-[#fffdfa]/95 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.55),0_0_25px_rgba(138,28,46,0.18)] overflow-hidden pt-20 sm:pt-24 px-6 sm:px-8 pb-16 sm:pb-20 text-center">
              
              {/* Subtle Joglo Pavilion Watermark inside card */}
              <img 
                src="/themes/joglo-maroon-bg-clean.jpg" 
                alt="Background Texture" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.09] mix-blend-multiply pointer-events-none select-none"
              />

              {/* Arch Floral Garland along Top Dome Rim */}
              <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
                <img 
                  src="/themes/joglo-portrait-crescent-hd.png" 
                  alt="Floral Arch Garland" 
                  className="w-[124%] max-w-none -translate-x-[10%] -translate-y-5 opacity-45 mix-blend-multiply"
                />
              </div>

              {/* Arch Floral Garland along Bottom Dome Rim */}
              <div className="absolute bottom-0 left-0 right-0 h-36 overflow-hidden pointer-events-none select-none z-0 [mask-image:linear-gradient(to_top,black_30%,transparent_95%)]">
                <img 
                  src="/themes/joglo-portrait-crescent-hd.png" 
                  alt="Floral Arch Garland Bottom" 
                  className="w-[124%] max-w-none -translate-x-[10%] translate-y-5 rotate-180 opacity-45 mix-blend-multiply"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Intertwined Gift Confirm Typography */}
                <div className="flex flex-col items-center justify-center relative mb-3">
                  <div className="relative inline-block text-left">
                    <span className="block font-['Great_Vibes'] text-[42px] sm:text-[48px] text-[#8a1c2e] leading-none drop-shadow-sm font-normal">
                      Gift
                    </span>
                    <span className="block font-serif text-[28px] sm:text-[32px] font-bold text-[#7e2231] tracking-wide ml-10 sm:ml-12 -mt-2.5 leading-none">
                      Confirm
                    </span>
                  </div>
                </div>

                {/* Courtesy Prose */}
                <p className="text-[11.5px] sm:text-xs text-[#523c34] font-serif italic leading-relaxed max-w-[250px] mx-auto mt-2 mb-6 text-center">
                  Mohon konfirmasi untuk pengiriman gift<br />Terima kasih
                </p>

                {/* Form */}
                <form onSubmit={handleGiftConfirmSubmit} className="space-y-3">
                  {/* Nama */}
                  <div className="text-left">
                    <label className="block text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e] mb-1">
                      Nama :
                    </label>
                    <input
                      type="text"
                      placeholder="Nama"
                      value={giftConfirmName}
                      onChange={(e) => setGiftConfirmName(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#d6c4bc] focus:border-[#8a1c2e] focus:ring-1 focus:ring-[#8a1c2e] bg-white text-xs font-serif text-[#3d2722] placeholder:text-stone-300 outline-none transition-all"
                    />
                  </div>

                  {/* Nama Bank */}
                  <div className="text-left">
                    <label className="block text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e] mb-1">
                      Nama Bank :
                    </label>
                    <input
                      type="text"
                      placeholder="Nama Bank"
                      value={giftConfirmBank}
                      onChange={(e) => setGiftConfirmBank(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#d6c4bc] focus:border-[#8a1c2e] focus:ring-1 focus:ring-[#8a1c2e] bg-white text-xs font-serif text-[#3d2722] placeholder:text-stone-300 outline-none transition-all"
                    />
                  </div>

                  {/* Nominal */}
                  <div className="text-left">
                    <label className="block text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e] mb-1">
                      Nominal :
                    </label>
                    <input
                      type="text"
                      placeholder="Nominal"
                      value={giftConfirmAmount}
                      onChange={(e) => setGiftConfirmAmount(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#d6c4bc] focus:border-[#8a1c2e] focus:ring-1 focus:ring-[#8a1c2e] bg-white text-xs font-serif text-[#3d2722] placeholder:text-stone-300 outline-none transition-all"
                    />
                  </div>

                  {/* Ucapan */}
                  <div className="text-left">
                    <label className="block text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e] mb-1">
                      Ucapan :
                    </label>
                    <input
                      type="text"
                      placeholder="Ucapan"
                      value={giftConfirmMessage}
                      onChange={(e) => setGiftConfirmMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded border border-[#d6c4bc] focus:border-[#8a1c2e] focus:ring-1 focus:ring-[#8a1c2e] bg-white text-xs font-serif text-[#3d2722] placeholder:text-stone-300 outline-none transition-all"
                    />
                  </div>

                  {/* Bukti TF */}
                  <div className="text-left">
                    <label className="block text-xs sm:text-[13px] font-serif font-bold text-[#8a1c2e] mb-1">
                      Bukti TF :
                    </label>
                    <div className="flex items-center gap-2 bg-white border border-[#d6c4bc] rounded p-1">
                      <label className="cursor-pointer px-2.5 py-1 rounded bg-[#efefef] hover:bg-stone-200 border border-stone-300 text-[11px] font-serif text-[#333] shrink-0 transition-colors">
                        Pilih File
                        <input
                          type="file"
                          accept="image/*,.pdf"
                          className="hidden"
                          onChange={handleGiftFileChange}
                        />
                      </label>
                      <span className="text-[11px] font-serif text-[#666] truncate flex-1 pr-1">
                        {giftConfirmFileName || 'Tidak ada file yang dipilih'}
                      </span>
                    </div>
                  </div>

                  {/* WhatsApp Konfirmasi Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 rounded bg-[#a0283c] hover:bg-[#851c2e] text-white text-xs sm:text-[13px] font-serif font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
                    >
                      <WhatsAppIcon className="w-4 h-4 fill-white" />
                      <span>Konfirmasi</span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. RSVP & UCAPAN DOA                                                      */}
        {/* ========================================================================= */}
        <section id="rsvp-section" className="relative py-16 sm:py-20 px-4 sm:px-6 select-none overflow-hidden">
          {/* Scenic Heritage Wallpaper & Mood Overlay */}
          <img 
            src="/themes/joglo-maroon-bg-clean.jpg" 
            alt="Scenic Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#200207]/90 via-[#38040e]/75 to-[#250309]/90 pointer-events-none" />

          {/* Floating Petals & Gold Dust */}
          <JogloFallingPetals />

          <div className="relative z-10 max-w-md mx-auto">
            {/* Arched Dome Vault Card with Prewedding Couple Background */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto rounded-t-[175px] sm:rounded-t-[195px] rounded-b-[36px] sm:rounded-b-[44px] border-[2.5px] border-[#8a1c2e] shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_25px_rgba(138,28,46,0.22)] overflow-hidden pt-16 sm:pt-20 px-6 sm:px-7 pb-8 sm:pb-10 text-center">
              
              {/* Prewedding Couple Portrait Background */}
              <img 
                src={coupleCoverPhoto || '/photos/photo-3.jpg'} 
                alt="Couple Prewedding" 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
              />

              {/* Dark Warm Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85 pointer-events-none" />

              {/* Arch Floral Garland at Top Dome Rim */}
              <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
                <img 
                  src="/themes/joglo-portrait-crescent-hd.png" 
                  alt="Floral Arch Garland" 
                  className="w-[124%] max-w-none -translate-x-[10%] -translate-y-5 opacity-40 mix-blend-screen"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Title */}
                <h2 className="font-serif font-bold text-2xl sm:text-[26px] text-white tracking-wider text-center mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  RSVP &amp; UCAPAN
                </h2>

                {/* Subtitle Prose */}
                <p className="text-[11.5px] sm:text-xs text-white/90 font-serif leading-relaxed max-w-[280px] mx-auto text-center mb-6 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] font-normal">
                  Berikan Harapan dan doa tulus anda disini karena kami sangat bersemangat untuk memulai perjalanan baru bersama.
                </p>

                {/* Form */}
                <form onSubmit={handleRsvpSubmit} className="space-y-3.5 mb-8 text-left">
                  {/* Nama Lengkap */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-sans font-bold text-white mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder=""
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white text-xs font-serif text-[#2d1b16] outline-none focus:ring-2 focus:ring-[#8a1c2e] shadow-sm transition-all"
                    />
                  </div>

                  {/* Status Kehadiran */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-sans font-bold text-white mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Status Kehadiran
                    </label>
                    <div className="relative">
                      <select
                        value={rsvpAttendance}
                        onChange={(e: any) => setRsvpAttendance(e.target.value)}
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-white text-xs font-serif ${!rsvpAttendance ? 'text-stone-400' : 'text-[#2d1b16]'} outline-none focus:ring-2 focus:ring-[#8a1c2e] appearance-none shadow-sm cursor-pointer pr-10`}
                      >
                        <option value="" disabled hidden>Pilih status kehadiran</option>
                        <option value="attending" className="text-[#2d1b16]">Hadir</option>
                        <option value="not_attending" className="text-[#2d1b16]">Tidak Hadir</option>
                        <option value="maybe" className="text-[#2d1b16]">Masih Ragu</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Ucapan / Pesan */}
                  <div>
                    <label className="block text-xs sm:text-[13px] font-sans font-bold text-white mb-1.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Ucapan/Pesan
                    </label>
                    <textarea
                      rows={3}
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Tulis ucapan atau pesan Anda..."
                      className="w-full px-3.5 py-2.5 rounded-lg bg-white text-xs font-serif text-[#2d1b16] placeholder:text-stone-400 outline-none focus:ring-2 focus:ring-[#8a1c2e] resize-none shadow-sm transition-all"
                    />
                  </div>

                  {/* Centered Kirim Button */}
                  <div className="text-center pt-2">
                    <button
                      type="submit"
                      disabled={rsvpSubmitting}
                      className="inline-flex items-center justify-center px-10 py-2.5 rounded-md bg-[#9e2a3b] hover:bg-[#831e2d] text-white text-xs sm:text-[13px] font-sans font-bold tracking-wider shadow-md transition-all active:scale-95 disabled:opacity-50"
                    >
                      {rsvpSubmitting ? 'Mengirim...' : 'Kirim'}
                    </button>
                  </div>
                </form>

                {/* List of Wishes / Komentar Doa */}
                <div className="space-y-3 text-left pt-2 border-t border-white/20">
                  <div className="text-center mb-4">
                    <span className="text-[11px] font-serif uppercase tracking-widest text-white/80">
                      Doa &amp; Ucapan ({rsvps.length > 0 ? rsvps.length : 1})
                    </span>
                  </div>

                  {(rsvps.length > 0 ? displayedRsvps : [
                    {
                      id: 'demo-1',
                      name: 'Tes',
                      attendance: 'attending',
                      message: 'Selamat berbahagia untuk kedua mempelai!',
                      created_at: new Date().toISOString()
                    }
                  ]).map((item: any) => (
                    <div 
                      key={item.id} 
                      className="bg-black/45 backdrop-blur-sm border border-white/15 rounded-xl p-3.5 shadow-sm text-left transition-all hover:bg-black/55"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {/* Circular Initial Avatar */}
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#edd59e] to-[#c9982e] text-[#4a101b] font-serif font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                            {(item.name || 'T')[0].toUpperCase()}
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-serif font-bold text-xs sm:text-[13px] text-white truncate">
                                {item.name}
                              </span>
                              <span className={`text-[9.5px] font-sans font-semibold px-2 py-0.5 rounded ${
                                item.attendance === 'attending' 
                                  ? 'bg-emerald-500 text-white' 
                                  : item.attendance === 'maybe' 
                                    ? 'bg-amber-500 text-white' 
                                    : 'bg-rose-500 text-white'
                              }`}>
                                {item.attendance === 'attending' ? 'Hadir' : item.attendance === 'maybe' ? 'Ragu' : 'Tidak Hadir'}
                              </span>
                            </div>
                            <span className="text-[10px] text-stone-300 font-sans block mt-0.5">
                              {new Date(item.created_at).toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                hour: '2-digit',
                                minute: '2-digit'
                              }).replace('pukul', 'pukul ')}
                            </span>
                          </div>
                        </div>
                      </div>

                      {item.message && (
                        <p className="text-xs text-stone-100 font-serif leading-relaxed mt-1.5 pl-9">
                          {item.message}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Pagination Controls */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-3 pt-3">
                      <button
                        disabled={currentPage <= 1}
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className="p-1.5 rounded-full border border-white/30 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-serif text-white/90">
                        {currentPage} / {totalPages}
                      </span>
                      <button
                        disabled={currentPage >= totalPages}
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className="p-1.5 rounded-full border border-white/30 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. CLOSING SHOWCASE & TERIMA KASIH                                       */}
        {/* ========================================================================= */}
        <section id="closing-section" className="relative py-16 sm:py-20 px-4 sm:px-6 select-none overflow-hidden">
          {/* Scenic Heritage Wallpaper & Mood Overlay */}
          <img 
            src="/themes/joglo-maroon-bg-clean.jpg" 
            alt="Scenic Background" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#200207]/90 via-[#38040e]/75 to-[#1a0206]/95 pointer-events-none" />

          {/* Floating Petals & Gold Dust */}
          <JogloFallingPetals />

          <div className="relative z-10 max-w-md mx-auto">
            {/* Grand Outer Arch Dome Card */}
            <div className="relative w-full max-w-[340px] sm:max-w-[370px] mx-auto rounded-t-[175px] sm:rounded-t-[195px] rounded-b-[40px] sm:rounded-b-[48px] border-[2.5px] border-[#c9982e]/60 bg-[#fffdfa]/95 backdrop-blur-md shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_25px_rgba(201,152,46,0.18)] overflow-hidden pt-12 sm:pt-14 px-5 sm:px-6 pb-24 sm:pb-28 text-center">
              
              {/* Subtle Joglo Pavilion Watermark inside card */}
              <img 
                src="/themes/joglo-maroon-bg-clean.jpg" 
                alt="Background Texture" 
                className="absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply pointer-events-none select-none"
              />

              {/* Arch Floral Garland at Top Dome Rim */}
              <div className="absolute top-0 left-0 right-0 h-40 overflow-hidden pointer-events-none select-none z-0 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]">
                <img 
                  src="/themes/joglo-portrait-crescent-hd.png" 
                  alt="Floral Arch Garland" 
                  className="w-[124%] max-w-none -translate-x-[10%] -translate-y-5 opacity-40 mix-blend-multiply"
                />
              </div>

              {/* Bottom Lush Floral Bouquets framing the card */}
              <div className="absolute -bottom-10 -left-10 w-44 h-44 pointer-events-none select-none z-10">
                <img 
                  src="/themes/joglo-flower-bl.png" 
                  alt="Floral Corner Left" 
                  className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-44 h-44 pointer-events-none select-none z-10">
                <img 
                  src="/themes/joglo-flower-br.png" 
                  alt="Floral Corner Right" 
                  className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]"
                />
              </div>

              {/* Content Container */}
              <div className="relative z-10">
                {/* Inner Arch Photo Frame */}
                <div className="relative w-full max-w-[245px] sm:max-w-[265px] mx-auto rounded-t-[130px] sm:rounded-t-[145px] rounded-b-[10px] border-[2px] border-[#8a1c2e] overflow-hidden shadow-md aspect-[3/4] mb-4 group">
                  <img 
                    src={coupleCoverPhoto || '/photos/photo-3.jpg'} 
                    alt="Couple Portrait" 
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette inside photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Closing Typography */}
                <div className="relative z-20 mb-8 sm:mb-10">
                  <p className="text-xs sm:text-[13px] font-serif italic text-[#7e2231] tracking-wide mb-1 font-medium">
                    Terima Kasih
                  </p>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#8a1c2e] tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                    {groomName} &amp; {brideName}
                  </h3>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX MODAL FOR GALLERY                                                */}
      {/* ========================================================================= */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-md cursor-pointer"
        >
          <button 
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedPhoto} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
          />
        </div>
      )}

      {/* Calendar reminder modal */}
      {selectedCalendarEvent && (
        <CalendarReminderModal
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          event={selectedCalendarEvent}
        />
      )}

    </div>
  );
};
