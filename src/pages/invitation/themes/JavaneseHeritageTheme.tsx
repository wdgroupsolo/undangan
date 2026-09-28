import React, { useEffect, useState, useRef } from 'react';
import { 
  Calendar, MapPin, Gift, CreditCard, Clock, Heart, Send, Check, X, Copy, 
  ChevronLeft, ChevronRight, Sparkles, Navigation, CheckCircle2, XCircle
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';

// Self-contained Instagram Icon SVG
const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Javanese Batik Truntum & Kawung Motif Corner Ornaments
const JavaneseBatikCorner: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full opacity-35 text-[#8c2d38]">
      {/* Central Flower Petals (Ceplok/Kawung geometry) */}
      <circle cx="50" cy="50" r="14" stroke="currentColor" strokeWidth="1.2" strokeDasharray="2 2" />
      <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.4" />
      {/* 4 Petals */}
      <path d="M50 20 C62 32, 62 42, 50 50 C38 42, 38 32, 50 20 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M50 80 C62 68, 62 58, 50 50 C38 58, 38 68, 50 80 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M20 50 C32 38, 42 38, 50 50 C42 62, 32 62, 20 50 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      <path d="M80 50 C68 38, 58 38, 50 50 C58 62, 68 62, 80 50 Z" fill="currentColor" opacity="0.25" stroke="currentColor" strokeWidth="1" />
      {/* Diagonal Starlets (Truntum motifs) */}
      <circle cx="28" cy="28" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="72" cy="28" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="28" cy="72" r="3" fill="currentColor" opacity="0.5" />
      <circle cx="72" cy="72" r="3" fill="currentColor" opacity="0.5" />
      <path d="M28 22 L28 34 M22 28 L34 28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M72 22 L72 34 M66 28 L78 28" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M28 66 L28 78 M22 72 L34 72" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
      <path d="M72 66 L72 78 M66 72 L78 72" stroke="currentColor" strokeWidth="0.8" opacity="0.4" />
    </svg>
  </div>
);

// Traditional Javanese Gunungan / Batik Floral Divider
const JavaneseDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#8c2d38]/50 to-[#8c2d38]" />
    <div className="flex items-center gap-1.5 text-[#8c2d38]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#8c2d38]">
        {/* Stylized Lotus / Gunungan Bud */}
        <path d="M12 2 C13 7, 18 10, 18 14 C18 17.5, 15.3 20.5, 12 21 C8.7 20.5, 6 17.5, 6 14 C6 10, 11 7, 12 2 Z" opacity="0.85" />
        <path d="M12 7 C12 11, 15 13, 15 15.5 C15 17.5, 13.5 19, 12 19.5 C10.5 19, 9 17.5, 9 15.5 C9 13, 12 11, 12 7 Z" fill="#fcf8f2" />
      </svg>
      <span className="w-1.5 h-1.5 rounded-full bg-[#8c2d38]" />
    </div>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent via-[#8c2d38]/50 to-[#8c2d38]" />
  </div>
);

// Traditional Javanese Gunungan (Kayon / Tree of Life) Watermark
const JavaneseGunungan: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 200 300" fill="none" className="w-full h-full text-[#6a1a24]">
      {/* Outer Kayon Leaf Silhouette */}
      <path
        d="M100 12 C115 45, 155 85, 178 135 C192 165, 195 205, 175 240 C158 270, 122 275, 100 275 C78 275, 42 270, 25 240 C5 205, 8 165, 22 135 C45 85, 85 45, 100 12 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="currentColor"
        fillOpacity="0.05"
      />
      {/* Inner Scalloped Filigree Border */}
      <path
        d="M100 24 C112 52, 145 88, 166 132 C178 160, 180 196, 164 230 C150 258, 118 263, 100 263 C82 263, 50 258, 36 230 C20 196, 22 160, 34 132 C55 88, 88 52, 100 24 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="2 3"
      />
      {/* Central Tree Trunk (Batang Pohon Hayat) */}
      <path d="M100 95 L100 270" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
      {/* Paduraksa / Sacred Temple Gate at Bottom */}
      <path d="M68 238 L100 212 L132 238" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="74" y="238" width="52" height="34" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path d="M88 272 L88 250 C88 245, 112 245, 112 250 L112 272" stroke="currentColor" strokeWidth="1.4" />
      {/* Tree Branches & Floral Swirls */}
      <path d="M100 175 C78 162, 55 180, 45 162 C38 148, 55 132, 72 138 C88 144, 98 160, 100 166" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M100 175 C122 162, 145 180, 155 162 C162 148, 145 132, 128 138 C112 144, 102 160, 100 166" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M100 140 C82 125, 68 135, 58 120 C48 105, 68 90, 82 100 C92 108, 98 128, 100 135" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M100 140 C118 125, 132 135, 142 120 C152 105, 132 90, 118 100 C108 108, 102 128, 100 135" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d="M100 95 C90 80, 80 88, 75 75 C70 65, 84 55, 94 64 L100 75" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M100 95 C110 80, 120 88, 125 75 C130 65, 116 55, 106 64 L100 75" stroke="currentColor" strokeWidth="1" fill="none" />
      {/* Bottom Tangkai / Handle */}
      <rect x="94" y="272" width="12" height="28" rx="3" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  </div>
);

// Traditional Batik Kawung White/Cream Motif Clusters for Maroon Background
const BatikKawungCluster: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 160 160" fill="none" className="w-full h-full text-[#fbf7f0]">
      {/* Authentic Intersecting Batik Kawung Geometry */}
      <g transform="translate(45, 45)">
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="currentColor" opacity="0.9" />
        <ellipse cx="0" cy="13" rx="7" ry="13" fill="currentColor" opacity="0.9" />
        <ellipse cx="-13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.9" />
        <ellipse cx="13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.9" />
        <circle cx="0" cy="0" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
        <circle cx="0" cy="-7" r="1.2" fill="#4e1017" />
        <circle cx="0" cy="7" r="1.2" fill="#4e1017" />
        <circle cx="-7" cy="0" r="1.2" fill="#4e1017" />
        <circle cx="7" cy="0" r="1.2" fill="#4e1017" />
      </g>
      <g transform="translate(115, 45)">
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="currentColor" opacity="0.8" />
        <ellipse cx="0" cy="13" rx="7" ry="13" fill="currentColor" opacity="0.8" />
        <ellipse cx="-13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.8" />
        <ellipse cx="13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.8" />
        <circle cx="0" cy="0" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(45, 115)">
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="currentColor" opacity="0.8" />
        <ellipse cx="0" cy="13" rx="7" ry="13" fill="currentColor" opacity="0.8" />
        <ellipse cx="-13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.8" />
        <ellipse cx="13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.8" />
        <circle cx="0" cy="0" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </g>
      <g transform="translate(115, 115)">
        <ellipse cx="0" cy="-13" rx="7" ry="13" fill="currentColor" opacity="0.9" />
        <ellipse cx="0" cy="13" rx="7" ry="13" fill="currentColor" opacity="0.9" />
        <ellipse cx="-13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.9" />
        <ellipse cx="13" cy="0" rx="13" ry="7" fill="currentColor" opacity="0.9" />
        <circle cx="0" cy="0" r="3.5" stroke="currentColor" strokeWidth="1" fill="none" />
        <circle cx="0" cy="0" r="1.5" fill="currentColor" />
      </g>
      {/* Center rosette */}
      <g transform="translate(80, 80)">
        <ellipse cx="0" cy="-11" rx="6" ry="11" fill="currentColor" opacity="0.75" />
        <ellipse cx="0" cy="11" rx="6" ry="11" fill="currentColor" opacity="0.75" />
        <ellipse cx="-11" cy="0" rx="11" ry="6" fill="currentColor" opacity="0.75" />
        <ellipse cx="11" cy="0" rx="11" ry="6" fill="currentColor" opacity="0.75" />
        <circle cx="0" cy="0" r="2.5" fill="currentColor" />
      </g>
      {/* Cross accent starlets */}
      <circle cx="80" cy="45" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="80" cy="115" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="45" cy="80" r="2" fill="currentColor" opacity="0.6" />
      <circle cx="115" cy="80" r="2" fill="currentColor" opacity="0.6" />
    </svg>
  </div>
);

// Traditional House / Roof Icon
const TraditionalHouseIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    {/* Traditional Peaked House Gable with Door */}
    <path d="M12 2.8 L2 10.5 L4.2 12.2 L5.5 11.2 L5.5 20.8 L18.5 20.8 L18.5 11.2 L19.8 12.2 L22 10.5 L12 2.8 Z M10 19.8 L10 13.8 C10 13.2 10.4 12.8 11 12.8 L13 12.8 C13.6 12.8 14 13.2 14 13.8 L14 19.8 L10 19.8 Z" />
  </svg>
);

// Intertwined Calligraphic Monogram Emblem (Matches Steven & Bunga / Javanese theme emblem)
export const JavaneseMonogram: React.FC<{ initials?: string; className?: string }> = ({ 
  initials = 'SB', 
  className = '' 
}) => {
  const isSB = initials.toUpperCase() === 'SB' || initials.toUpperCase() === 'S & B';
  return (
    <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
      {isSB ? (
        <svg 
          viewBox="0 0 110 135" 
          fill="none" 
          className="w-16 h-20 sm:w-20 sm:h-24 text-[#5c131c] drop-shadow-[0_2px_4px_rgba(92,19,28,0.22)]"
        >
          {/* Elegant S Curve intertwined with B */}
          <path 
            d="M66 28 C56 22, 40 22, 34 30 C28 38, 32 48, 42 54 C54 60, 62 66, 62 78 C62 92, 48 98, 36 94 C28 90, 24 82, 24 82" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none" 
          />
          {/* Letter B Stem */}
          <path 
            d="M56 25 L56 104 M48 25 L64 25 M48 104 L64 104" 
            stroke="currentColor" 
            strokeWidth="3.4" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
          {/* Letter B Upper Loop */}
          <path 
            d="M56 25 C78 25, 86 36, 86 48 C86 60, 76 63, 56 63" 
            stroke="currentColor" 
            strokeWidth="3.2" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Letter B Lower Loop */}
          <path 
            d="M56 63 C80 63, 89 73, 89 87 C89 104, 76 104, 56 104" 
            stroke="currentColor" 
            strokeWidth="3.4" 
            strokeLinecap="round" 
            fill="none" 
          />
          {/* Flourish swash wrapping below */}
          <path 
            d="M26 108 C38 116, 74 118, 88 110" 
            stroke="currentColor" 
            strokeWidth="1.6" 
            strokeDasharray="2 3" 
            strokeLinecap="round" 
          />
        </svg>
      ) : (
        <div 
          className="w-16 h-20 sm:w-20 sm:h-24 flex items-center justify-center font-serif text-3xl sm:text-4xl text-[#5c131c] tracking-widest italic drop-shadow-[0_2px_4px_rgba(92,19,28,0.22)]"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          {initials}
        </div>
      )}
    </div>
  );
};

// Royal Javanese Gold Filigree & Floral Garland for Event Card Bottom (Pure Luxury, No Candi Stupas)
const RoyalCardBottomOrnament: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
    <svg viewBox="0 0 320 90" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="royalGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#aa771c" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#d4af37" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#fff2cf" stopOpacity="1" />
          <stop offset="75%" stopColor="#d4af37" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#aa771c" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient id="maroonFlowerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#a4333e" />
          <stop offset="100%" stopColor="#5c131c" />
        </linearGradient>
      </defs>

      {/* Primary Gold Arc Scroll */}
      <path 
        d="M20 85 C75 48, 115 50, 160 52 C205 50, 245 48, 300 85" 
        stroke="url(#royalGoldGrad)" 
        strokeWidth="1.8" 
        fill="none" 
      />
      {/* Secondary Dotted Gold Hairline */}
      <path 
        d="M40 86 C85 58, 120 60, 160 62 C200 60, 235 58, 280 86" 
        stroke="url(#royalGoldGrad)" 
        strokeWidth="0.8" 
        strokeDasharray="2 3" 
        fill="none" 
      />

      {/* Central Royal Lotus Rosette */}
      <g transform="translate(160, 52)">
        <path d="M0 -15 C-8 -5, -12 2, 0 8 C12 2, 8 -5, 0 -15 Z" fill="url(#maroonFlowerGrad)" stroke="#d4af37" strokeWidth="0.8" />
        <path d="M0 -4 C-14 -12, -18 4, 0 6" fill="url(#maroonFlowerGrad)" opacity="0.85" />
        <path d="M0 -4 C14 -12, 18 4, 0 6" fill="url(#maroonFlowerGrad)" opacity="0.85" />
        <circle cx="0" cy="5" r="3.5" fill="#fff2cf" stroke="#d4af37" strokeWidth="0.8" />
        <circle cx="0" cy="5" r="1.5" fill="#5c131c" />
        {/* Radiating golden starlets */}
        <circle cx="-25" cy="4" r="2" fill="#d4af37" />
        <circle cx="25" cy="4" r="2" fill="#d4af37" />
        <circle cx="-50" cy="9" r="1.6" fill="#d4af37" opacity="0.8" />
        <circle cx="50" cy="9" r="1.6" fill="#d4af37" opacity="0.8" />
        <circle cx="-75" cy="16" r="1.3" fill="#d4af37" opacity="0.6" />
        <circle cx="75" cy="16" r="1.3" fill="#d4af37" opacity="0.6" />
      </g>

      {/* Left Symmetrical Foliage Scrolls */}
      <path d="M125 54 C115 46, 100 48, 95 58 C90 68, 105 74, 115 66" stroke="url(#royalGoldGrad)" strokeWidth="1.2" fill="none" />
      <circle cx="95" cy="58" r="2.5" fill="#8c2530" />
      <path d="M85 60 C70 54, 60 61, 58 71" stroke="url(#royalGoldGrad)" strokeWidth="1" fill="none" />
      <circle cx="58" cy="71" r="2" fill="#d4af37" />

      {/* Right Symmetrical Foliage Scrolls */}
      <path d="M195 54 C205 46, 220 48, 225 58 C230 68, 215 74, 205 66" stroke="url(#royalGoldGrad)" strokeWidth="1.2" fill="none" />
      <circle cx="225" cy="58" r="2.5" fill="#8c2530" />
      <path d="M235 60 C250 54, 260 61, 262 71" stroke="url(#royalGoldGrad)" strokeWidth="1" fill="none" />
      <circle cx="262" cy="71" r="2" fill="#d4af37" />
    </svg>
  </div>
);

// Royal 24K Gold Corner Filigree (Keraton Lung-lungan Style) with Subtle Living Luster
const RoyalGoldCorner: React.FC<{ className?: string; flip?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' }> = ({ 
  className = '', 
  flip = 'top-left' 
}) => {
  const getTransform = () => {
    switch (flip) {
      case 'top-right': return 'scaleX(-1)';
      case 'bottom-left': return 'scaleY(-1)';
      case 'bottom-right': return 'scale(-1, -1)';
      case 'top-left':
      default: return 'none';
    }
  };

  return (
    <div 
      className={`pointer-events-none select-none ${className}`}
      style={{ transform: getTransform() }}
    >
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_2px_8px_rgba(212,175,55,0.35)]">
        <defs>
          <linearGradient id="goldCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff2cf" />
            <stop offset="35%" stopColor="#d4af37" />
            <stop offset="70%" stopColor="#aa771c" />
            <stop offset="100%" stopColor="#63440e" />
          </linearGradient>
        </defs>

        {/* Outer Corner Frame Borders */}
        <path d="M8 90 L8 8 L90 8" stroke="url(#goldCornerGrad)" strokeWidth="1.6" fill="none" />
        <path d="M14 80 L14 14 L80 14" stroke="url(#goldCornerGrad)" strokeWidth="0.8" strokeDasharray="3 3" fill="none" />

        {/* Corner Royal Rosette (Batik Truntum Motif) */}
        <g transform="translate(22, 22)">
          <circle cx="0" cy="0" r="4.5" fill="#d4af37" />
          <circle cx="0" cy="0" r="2" fill="#5c131c" />
          {/* 4 Petals */}
          <ellipse cx="0" cy="-7" rx="2" ry="3.5" fill="url(#goldCornerGrad)" />
          <ellipse cx="0" cy="7" rx="2" ry="3.5" fill="url(#goldCornerGrad)" />
          <ellipse cx="-7" cy="0" rx="3.5" ry="2" fill="url(#goldCornerGrad)" />
          <ellipse cx="7" cy="0" rx="3.5" ry="2" fill="url(#goldCornerGrad)" />
        </g>

        {/* Curling Royal Golden Foliage Swirls */}
        <path 
          d="M18 45 C24 34, 38 32, 45 18 C50 25, 62 22, 74 18" 
          stroke="url(#goldCornerGrad)" 
          strokeWidth="1.4" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M45 18 C38 38, 32 54, 18 72" 
          stroke="url(#goldCornerGrad)" 
          strokeWidth="1.2" 
          strokeLinecap="round" 
          fill="none" 
        />

        {/* Delicate Golden Leaves */}
        <path d="M38 32 C48 34, 52 44, 44 48 C36 50, 34 40, 38 32 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M26 58 C36 61, 38 70, 30 74 C24 74, 22 66, 26 58 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M58 22 C61 31, 70 34, 74 27 C74 21, 66 20, 58 22 Z" fill="url(#goldCornerGrad)" opacity="0.9" />

        {/* Little Golden Droplets / Stardust */}
        <circle cx="80" cy="18" r="1.8" fill="#fff2cf" />
        <circle cx="18" cy="80" r="1.8" fill="#fff2cf" />
        <circle cx="50" cy="50" r="1.4" fill="#d4af37" />
      </svg>
    </div>
  );
};

// Floating Gold Glitter & Prada Dust with Smooth Realistic Drift
const FloatingGoldenDust: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const particles = [
    { top: '8%', left: '15%', size: 4, dur: '6s', delay: '0s' },
    { top: '18%', left: '82%', size: 5, dur: '7.5s', delay: '1.2s' },
    { top: '28%', left: '25%', size: 3, dur: '5.5s', delay: '2.5s' },
    { top: '38%', left: '75%', size: 6, dur: '8s', delay: '0.8s' },
    { top: '48%', left: '10%', size: 4, dur: '6.5s', delay: '3.2s' },
    { top: '58%', left: '88%', size: 3.5, dur: '7s', delay: '1.8s' },
    { top: '68%', left: '30%', size: 5, dur: '6.2s', delay: '2.1s' },
    { top: '78%', left: '70%', size: 4, dur: '7.8s', delay: '0.4s' },
    { top: '88%', left: '18%', size: 4.5, dur: '6.8s', delay: '3.8s' },
    { top: '94%', left: '80%', size: 3, dur: '5.8s', delay: '1.5s' },
    { top: '14%', left: '50%', size: 3.5, dur: '7.2s', delay: '2.8s' },
    { top: '52%', left: '60%', size: 5.5, dur: '8.2s', delay: '0.2s' },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-25">
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
            animation: `gold-dust-float ${p.dur} ease-in-out infinite ${p.delay}`,
            willChange: 'transform, opacity',
          }}
        />
      ))}
    </div>
  );
};

// Climbing Ivy / Betel Vines on Left Arch Border (Curling over the maroon frame)
const ArchLeftVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`pointer-events-none select-none origin-bottom ${className}`}
    style={{ animation: 'organic-vine-sway 6.8s ease-in-out infinite' }}
  >
    <svg viewBox="0 0 50 110" fill="none" className="w-11 h-22 sm:w-13 sm:h-26 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      {/* Curling green stem */}
      <path 
        d="M18 105 C24 85, 12 70, 22 50 C28 36, 16 20, 26 6" 
        stroke="#4f633a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Leaf 1 (Bottom) */}
      <path 
        d="M18 90 C8 88, 2 76, 10 68 C22 62, 26 76, 18 90 Z" 
        fill="#556b3e" 
        stroke="#3c4d2b" 
        strokeWidth="0.8" 
      />
      <path d="M12 76 C15 78, 18 84, 18 90" stroke="#79945c" strokeWidth="0.8" />

      {/* Leaf 2 (Middle Left, Heart Shape) */}
      <path 
        d="M16 56 C4 52, 0 38, 12 30 C22 24, 28 40, 16 56 Z" 
        fill="#637c49" 
        stroke="#42552f" 
        strokeWidth="0.8" 
      />
      <path d="M12 36 C15 42, 16 48, 16 56" stroke="#87a666" strokeWidth="0.8" />

      {/* Leaf 3 (Middle Right, Curling Over Arch Border) */}
      <path 
        d="M24 44 C36 40, 46 46, 42 58 C36 68, 25 56, 24 44 Z" 
        fill="#4c6037" 
        stroke="#334224" 
        strokeWidth="0.8" 
      />
      <path d="M36 50 C31 52, 27 48, 24 44" stroke="#6f8c51" strokeWidth="0.8" />

      {/* Leaf 4 (Top Bud) */}
      <path 
        d="M26 14 C18 10, 16 0, 25 2 C32 4, 34 12, 26 14 Z" 
        fill="#6b854e" 
        stroke="#475a34" 
        strokeWidth="0.8" 
      />
    </svg>
  </div>
);

// Climbing Ivy / Betel Vines on Right Arch Border (Curling over the maroon frame with living sway)
const ArchRightVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`pointer-events-none select-none origin-bottom ${className}`}
    style={{ animation: 'organic-vine-sway 7.6s ease-in-out infinite 0.9s' }}
  >
    <svg viewBox="0 0 50 110" fill="none" className="w-11 h-22 sm:w-13 sm:h-26 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]">
      {/* Curling green stem */}
      <path 
        d="M32 105 C26 85, 38 70, 28 50 C22 36, 34 20, 24 6" 
        stroke="#4f633a" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
      />
      {/* Leaf 1 (Bottom Right) */}
      <path 
        d="M32 90 C42 88, 48 76, 40 68 C28 62, 24 76, 32 90 Z" 
        fill="#4c6037" 
        stroke="#334224" 
        strokeWidth="0.8" 
      />
      <path d="M38 76 C35 78, 32 84, 32 90" stroke="#6f8c51" strokeWidth="0.8" />

      {/* Leaf 2 (Middle Right, Heart Shape) */}
      <path 
        d="M34 56 C46 52, 50 38, 38 30 C28 24, 22 40, 34 56 Z" 
        fill="#637c49" 
        stroke="#42552f" 
        strokeWidth="0.8" 
      />
      <path d="M38 36 C35 42, 34 48, 34 56" stroke="#87a666" strokeWidth="0.8" />

      {/* Leaf 3 (Middle Left, Curling Inwards) */}
      <path 
        d="M26 44 C14 40, 4 46, 8 58 C14 68, 25 56, 26 44 Z" 
        fill="#556b3e" 
        stroke="#3c4d2b" 
        strokeWidth="0.8" 
      />
      <path d="M14 50 C19 52, 23 48, 26 44" stroke="#79945c" strokeWidth="0.8" />

      {/* Leaf 4 (Top Bud) */}
      <path 
        d="M24 14 C32 10, 34 0, 25 2 C18 4, 16 12, 24 14 Z" 
        fill="#6b854e" 
        stroke="#475a34" 
        strokeWidth="0.8" 
      />
    </svg>
  </div>
);

// Realistic Burgundy Orchid & Cream Peony Floral Corner for Photo Card (Top Right)
const PhotoCornerFloralTopRight: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`pointer-events-none select-none origin-top-right ${className}`}
    style={{ animation: 'gentle-floral-breathe 8s ease-in-out infinite' }}
  >
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      {/* Delicate twig with buds */}
      <path d="M40 85 C65 60, 75 35, 92 10" stroke="#5a1820" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="85" cy="18" r="3" fill="#8c2530" />
      <circle cx="75" cy="28" r="3.5" fill="#a4333e" />
      <circle cx="94" cy="10" r="2.5" fill="#f0d5b0" />

      {/* Main Burgundy Orchid Center Flower */}
      <g transform="translate(62, 45)">
        <path d="M0 0 C-10 -18, 10 -18, 0 0" fill="#7a1d27" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C-18 12, -22 -2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C18 12, 22 -2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <ellipse cx="-10" cy="-6" rx="10" ry="7" fill="#68151e" transform="rotate(-20 -10 -6)" />
        <ellipse cx="10" cy="-6" rx="10" ry="7" fill="#68151e" transform="rotate(20 10 -6)" />
        <path d="M-6 2 C-10 12, 10 12, 6 2 Z" fill="#9e2b36" />
        <circle cx="0" cy="0" r="2.5" fill="#f3da9f" />
      </g>

      {/* Cream / Golden Peony Flower Accent */}
      <g transform="translate(80, 68)">
        <circle cx="0" cy="0" r="14" fill="#e8cfad" stroke="#c4a57b" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="10" fill="#f3dfc3" />
        <circle cx="0" cy="0" r="6" fill="#faebd7" />
        <circle cx="0" cy="0" r="3" fill="#df9b8e" />
      </g>

      {/* Small Orchid Blossom */}
      <g transform="translate(42, 68)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#781c25" />
        <circle cx="0" cy="0" r="2" fill="#fadcaf" />
      </g>
    </svg>
  </div>
);

// Realistic Burgundy Orchid & Cream Peony Floral Corner for Photo Card (Bottom Left)
const PhotoCornerFloralBottomLeft: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div 
    className={`pointer-events-none select-none origin-bottom-left ${className}`}
    style={{ animation: 'gentle-floral-breathe 8.8s ease-in-out infinite 1.4s' }}
  >
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)]">
      {/* Delicate twig with buds */}
      <path d="M60 15 C35 40, 25 65, 8 90" stroke="#5a1820" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="15" cy="82" r="3" fill="#8c2530" />
      <circle cx="25" cy="72" r="3.5" fill="#a4333e" />
      <circle cx="6" cy="90" r="2.5" fill="#f0d5b0" />

      {/* Main Burgundy Orchid Center Flower */}
      <g transform="translate(38, 55)">
        <path d="M0 0 C-10 18, 10 18, 0 0" fill="#7a1d27" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C-18 -12, -22 2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <path d="M0 0 C18 -12, 22 2, 0 0" fill="#8a232e" stroke="#4d1016" strokeWidth="0.8" />
        <ellipse cx="-10" cy="6" rx="10" ry="7" fill="#68151e" transform="rotate(20 -10 6)" />
        <ellipse cx="10" cy="6" rx="10" ry="7" fill="#68151e" transform="rotate(-20 10 6)" />
        <path d="M-6 -2 C-10 -12, 10 -12, 6 -2 Z" fill="#9e2b36" />
        <circle cx="0" cy="0" r="2.5" fill="#f3da9f" />
      </g>

      {/* Cream / Golden Peony Flower Accent */}
      <g transform="translate(20, 32)">
        <circle cx="0" cy="0" r="14" fill="#e8cfad" stroke="#c4a57b" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="10" fill="#f3dfc3" />
        <circle cx="0" cy="0" r="6" fill="#faebd7" />
        <circle cx="0" cy="0" r="3" fill="#df9b8e" />
      </g>

      {/* Small Orchid Blossom */}
      <g transform="translate(58, 32)">
        <ellipse cx="0" cy="0" rx="9" ry="7" fill="#781c25" />
        <circle cx="0" cy="0" r="2" fill="#fadcaf" />
      </g>
    </svg>
  </div>
);

// Floating Floral & Gold Sparkle Particles with Smooth Realistic 3D Tumbling
export const JavanesePetals: React.FC<{ count?: number }> = ({ count = 10 }) => {
  const petals = [
    { top: '8%', left: '12%', size: 15, dur: '10s', delay: '0s', rot: '25deg', type: 'maroon' },
    { top: '22%', left: '84%', size: 13, dur: '13s', delay: '1.8s', rot: '-35deg', type: 'gold' },
    { top: '36%', left: '15%', size: 14, dur: '9.5s', delay: '3.2s', rot: '55deg', type: 'blush' },
    { top: '50%', left: '82%', size: 18, dur: '12s', delay: '0.9s', rot: '-20deg', type: 'maroon' },
    { top: '65%', left: '9%', size: 12, dur: '11s', delay: '2.4s', rot: '40deg', type: 'gold' },
    { top: '79%', left: '78%', size: 19, dur: '14s', delay: '1.5s', rot: '-45deg', type: 'maroon' },
    { top: '91%', left: '22%', size: 14, dur: '10.5s', delay: '3.7s', rot: '30deg', type: 'blush' },
    { top: '28%', left: '68%', size: 12, dur: '9.8s', delay: '2.1s', rot: '15deg', type: 'gold' },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rot})`,
            animation: `realistic-petal-drift ${p.dur} cubic-bezier(0.4, 0, 0.2, 1) infinite ${p.delay}`,
            willChange: 'transform, opacity',
          }}
        >
          {p.type === 'maroon' && (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-[#7a1e28] drop-shadow-[0_2px_4px_rgba(92,19,28,0.3)]">
              <path 
                d="M15 2 C22 8, 28 16, 26 23 C24 28, 17 29, 13 26 C8 22, 6 14, 15 2 Z" 
                fill="currentColor" 
                opacity="0.85" 
              />
            </svg>
          )}
          {p.type === 'gold' && (
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]">
              <circle cx="12" cy="12" r="6" fill="#d4af37" opacity="0.85" />
              <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill="#fff5d0" opacity="0.95" />
            </svg>
          )}
          {p.type === 'blush' && (
            <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-[#e8c0ad] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
              <path 
                d="M15 3 C21 9, 27 15, 25 22 C23 27, 18 28, 14 25 C9 21, 7 14, 15 3 Z" 
                fill="currentColor" 
                opacity="0.85" 
              />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
};

// Premium On-Scroll Reveal Component (Replays on scroll, matching previous MaroonGold theme)
const ScrollReveal: React.FC<{
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'zoom-in' | 'slide-left' | 'slide-right' | 'arch-reveal' | 'fade-in';
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ children, animation = 'fade-up', delay = 0, duration = 900, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getAnimClass = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-10 scale-[0.98]';
        case 'fade-down':
          return 'opacity-0 -translate-y-8';
        case 'zoom-in':
          return 'opacity-0 scale-[0.88]';
        case 'slide-left':
          return 'opacity-0 -translate-x-12';
        case 'slide-right':
          return 'opacity-0 translate-x-12';
        case 'arch-reveal':
          return 'opacity-0 translate-y-14 scale-[0.92] blur-[1px]';
        case 'fade-in':
        default:
          return 'opacity-0';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100 blur-0';
  };

  return (
    <div
      ref={ref}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${getAnimClass()} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: isVisible ? `${delay}ms` : '0ms',
        willChange: 'transform, opacity',
      }}
    >
      {children}
    </div>
  );
};

interface JavaneseHeritageThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music: any;
}

export const JavaneseHeritageTheme: React.FC<JavaneseHeritageThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
}) => {
  const toast = useToast();
  const searchParams = new URLSearchParams(window.location.search);
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  // State management
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeLightboxIdx, setActiveLightboxIdx] = useState<number | null>(null);
  const [showGiftDetails, setShowGiftDetails] = useState(false);
  const [wishName, setWishName] = useState(guestName !== 'Tamu Undangan' ? guestName : '');
  const [wishAttendance, setWishAttendance] = useState('Hadir');
  const [wishText, setWishText] = useState('');
  const [wishes, setWishes] = useState<Array<{ name: string; attendance: string; message: string; date: string }>>([
    {
      name: 'Della',
      attendance: 'Hadir',
      message: 'Happy Wedding Steven & Bunga ❤️',
      date: '1 menit lalu'
    }
  ]);

  const hadirCount = wishes.filter(w => w.attendance === 'Hadir').length;
  const tidakHadirCount = wishes.filter(w => w.attendance === 'Tidak Hadir').length;

  // Couple names - Steven & Bunga as canonical demo
  const groomNick = (() => {
    const nick = couple?.groom_nickname?.trim();
    const full = couple?.groom_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'bagas' && nick.toLowerCase() !== 'habib') return nick;
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'habib') return full.split(' ')[0];
    return 'Steven';
  })();

  const brideNick = (() => {
    const nick = couple?.bride_nickname?.trim();
    const full = couple?.bride_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'siti' && nick.toLowerCase() !== 'adiba') return nick;
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'adiba') return full.split(' ')[0];
    return 'Bunga';
  })();

  const groomFullName = (() => {
    const full = couple?.groom_full_name?.trim();
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'habib yulianto') return full;
    return 'STEVEN PRATAMA';
  })();

  const brideFullName = (() => {
    const full = couple?.bride_full_name?.trim();
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'adiba putri syakilla') return full;
    return 'BUNGA LESTARI';
  })();

  // Active Event Tab Index (0: Akad Nikah, 1: Resepsi)
  const [activeEventIndex, setActiveEventIndex] = useState<number>(0);

  // Events fallback matching user reference screenshots
  const defaultEvents = [
    {
      id: 'default-akad',
      name: 'Akad Nikah',
      event_date: '2025-12-27',
      start_time: '10:00 WIB',
      end_time: 'Selesai',
      location: 'Kediaman Mempelai Wanita',
      address: 'Kawasan Wisata Candi Borobudur, Magelang, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Candi+Borobudur',
    },
    {
      id: 'default-resepsi',
      name: 'Resepsi',
      event_date: '2025-12-28',
      start_time: '10:00 WIB',
      end_time: 'Selesai',
      location: 'Kediaman Mempelai Wanita',
      address: 'Kawasan Wisata Candi Borobudur, Magelang, Jawa Tengah',
      maps_url: 'https://maps.google.com/?q=Candi+Borobudur',
    }
  ];

  const displayEvents = events && events.length > 0 ? events : defaultEvents;

  // Helper to parse event fields for the arch card strictly matching reference format
  const parseEventDisplay = (evt: any, idx: number) => {
    const isAkad = idx === 0 || (evt?.name && evt.name.toLowerCase().includes('akad'));
    let dayName = 'MINGGU';
    let dayNum = isAkad ? '27' : '28';
    let monthYear = 'DESEMBER 2025';

    if (evt?.event_date) {
      try {
        const clean = String(evt.event_date).split('T')[0];
        const parts = clean.split('-');
        if (parts.length === 3) {
          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          if (!isNaN(d.getTime())) {
            dayName = d.toLocaleDateString('id-ID', { weekday: 'long' }).toUpperCase();
            dayNum = String(d.getDate());
            monthYear = d.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' }).toUpperCase();
          }
        }
      } catch (_) {}
    }

    const title = evt?.name 
      ? (evt.name.toLowerCase() === 'resepsi pernikahan' ? 'RESEPSI' : evt.name.toUpperCase()) 
      : (isAkad ? 'AKAD NIKAH' : 'RESEPSI');
    const start = evt?.start_time || '10:00 WIB';
    const end = evt?.end_time || 'Selesai';
    const timeStr = `${start} - ${end}`;
    const location = evt?.location || 'Kediaman Mempelai Wanita';
    const address = evt?.address || '';
    const mapsUrl = evt?.maps_url || 'https://maps.google.com/?q=Candi+Borobudur';

    return { title, dayName, dayNum, monthYear, timeStr, location, address, mapsUrl };
  };

  // Countdown timer
  const targetDateStr = displayEvents?.[0]?.event_date || '2025-12-28';
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Gallery fallback matching user photos (Steven & Bunga)
  const defaultGallery = [
    { 
      image_url: '/photos/photo-1.jpg', 
      caption: 'Langkah Bersama Menuju Hari Bahagia' 
    },
    { 
      image_url: '/photos/photo-4.jpg', 
      caption: 'Dalam Kehangatan Janji Kasih' 
    },
    { 
      image_url: '/photos/photo-5.jpg', 
      caption: 'Duduk Berdua Mengukir Cerita Cinta' 
    },
    { 
      image_url: '/photos/photo-6.jpg', 
      caption: 'Adat Luhur & Keagungan Cinta' 
    },
    { 
      image_url: '/photos/photo-7.jpg', 
      caption: 'Bersama Menatap Masa Depan' 
    },
    { 
      image_url: '/photos/photo-8.jpg', 
      caption: 'Tawa & Bahagia yang Terpatri' 
    },
  ];

  const displayGallery = (gallery && gallery.length > 0)
    ? gallery.map((item) => ({
        image_url: item.image_url,
        caption: item.caption || 'Momen Bahagia'
      }))
    : defaultGallery;

  // Love stories fallback strictly matching reference screenshots
  const defaultStories = [
    {
      title: 'Awal Bertemu',
      description: 'Awal mengenal dimulai sejak duduk di bangku SMA, namun saat itu kami tidak saling akrab. Pada tahun 2019, kami mulai dekat dan saling mengenal satu sama lain.'
    },
    {
      title: 'Lamaran',
      description: 'Setelah 4 tahun mengenal dekat, kami berdua meyakini mampu melangkah ke jenjang yang lebih serius. Pada 18 November 2023, kami pun resmi bertunangan dengan restu dari kedua orang tua dan keluarga besar.'
    },
    {
      title: 'Pernikahan',
      description: 'Akhirnya, Kapal kami segera berlayar.. terima kasih kepada keluarga besar dan juga teman-teman yang telah menjadi saksi perjalanan cinta kami. Semoga kami dapat membawa kapal ini terus berlayar dan berlabuh di tujuan yang sama'
    }
  ];

  const displayStories = stories && stories.length > 0 ? stories : defaultStories;

  // Gifts fallback
  const defaultGifts = [
    {
      provider: 'BCA',
      account_number: '7820192831',
      account_name: `${groomNick} Pratama`,
    },
    {
      provider: 'MANDIRI',
      account_number: '1370019283741',
      account_name: `${brideNick} Shakila`,
    },
    {
      provider: 'BSI (Bank Syariah Indonesia)',
      account_number: '7192837465',
      account_name: `${groomNick} & ${brideNick}`,
    }
  ];

  const displayGifts = (gifts && gifts.length > 0) ? gifts : defaultGifts;

  // Copy helper
  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Nomor rekening berhasil disalin!');
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  // Submit wish
  const handleSubmitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishName.trim() || !wishText.trim()) {
      toast.error('Mohon isi nama dan ucapan Anda');
      return;
    }

    setWishes(prev => [
      {
        name: wishName,
        attendance: wishAttendance,
        message: wishText,
        date: 'Baru saja'
      },
      ...prev
    ]);
    setWishName('');
    setWishText('');
    toast.success('Terima kasih atas doa dan restu Anda!');
  };

  // Format date helper
  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return 'Minggu, 28 Desember 2025';
    try {
      const clean = String(dateStr).split('T')[0];
      const parts = clean.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        if (!isNaN(d.getTime())) {
          return d.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
        }
      }
      return 'Minggu, 28 Desember 2025';
    } catch {
      return 'Minggu, 28 Desember 2025';
    }
  };

  // Format arch date strictly matching reference format (e.g. 28 . 12 . 2025)
  const formattedArchDate = (() => {
    const rawDate = events?.[0]?.event_date;
    if (rawDate) {
      try {
        const clean = String(rawDate).split('T')[0];
        const parts = clean.split('-');
        if (parts.length === 3) {
          return `${parts[2]} . ${parts[1]} . ${parts[0]}`;
        }
      } catch (_) {}
    }
    return '28 . 12 . 2025';
  })();

  return (
    <div className="min-h-screen text-[#3d1117] bg-[#fbf7f0] selection:bg-[#7c1d29] selection:text-white relative overflow-x-hidden font-serif">
      
      {/* Inline Keyframes & Micro-animations */}
      <style>{`
        @keyframes organic-vine-sway {
          0%, 100% {
            transform: rotate(0deg) translateY(0);
          }
          30% {
            transform: rotate(1.6deg) translateY(-0.8px);
          }
          70% {
            transform: rotate(-1.3deg) translateY(0.4px);
          }
        }

        @keyframes gentle-floral-breathe {
          0%, 100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.025) rotate(0.6deg);
          }
        }

        @keyframes gold-dust-float {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(0.85);
            opacity: 0.35;
          }
          50% {
            transform: translate3d(6px, -15px, 0) scale(1.2);
            opacity: 0.95;
          }
        }

        @keyframes realistic-petal-drift {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
            opacity: 0.35;
          }
          35% {
            transform: translate3d(8px, -14px, 0) rotate(14deg) scale(1.06);
            opacity: 0.85;
          }
          70% {
            transform: translate3d(-6px, -24px, 0) rotate(-10deg) scale(1);
            opacity: 0.75;
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(0.9);
            opacity: 0.35;
          }
        }

        @keyframes gold-filigree-shimmer {
          0%, 100% {
            filter: drop-shadow(0 0 2px rgba(212, 175, 55, 0.45));
            opacity: 0.92;
          }
          50% {
            filter: drop-shadow(0 0 8px rgba(255, 225, 120, 0.85));
            opacity: 1;
          }
        }

        @keyframes royal-pulse-glow {
          0%, 100% {
            box-shadow: 0 16px 45px rgba(92, 19, 28, 0.22), 0 0 20px rgba(212, 175, 55, 0.18);
            border-color: rgba(212, 175, 55, 0.75);
          }
          50% {
            box-shadow: 0 20px 55px rgba(92, 19, 28, 0.3), 0 0 32px rgba(212, 175, 55, 0.4);
            border-color: rgba(255, 225, 120, 0.95);
          }
        }

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

        @keyframes gentle-pulse {
          0%, 100% { transform: scale(1); opacity: 0.95; }
          50% { transform: scale(1.03); opacity: 1; }
        }

        @keyframes scroll-pill-bounce {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.85;
          }
          50% {
            transform: translateY(12px);
            opacity: 1;
          }
        }

        @keyframes scroll-dot-slide {
          0%, 100% {
            transform: translateX(0);
            opacity: 0.85;
          }
          50% {
            transform: translateX(24px);
            opacity: 1;
          }
        }
      `}</style>

      {/* ========================================================================= */}
      {/* DESKTOP LEFT SIDE: Fixed 58% Panoramic Borobudur Landscape View           */}
      {/* ========================================================================= */}
      <div className="hidden lg:block lg:w-[58%] fixed top-0 left-0 h-screen z-0 overflow-hidden bg-[#24090d]">
        {/* Background Image: High-res Borobudur Sunset Landscape */}
        <img
          src="/themes/javanese-heritage-desktop.jpg"
          alt="Borobudur Heritage Landscape"
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Ambient Dark Gradient Vignette for Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24090d] via-transparent to-black/60" />

        {/* Ambient Petal Drift on Left Panel */}
        <JavanesePetals count={8} />

        {/* Content on Left Side */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-20 text-white z-10 select-none">
          <p 
            className="text-sm xl:text-base uppercase tracking-[0.35em] text-[#e8c5b8] font-sans font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            The Wedding of
          </p>

          <h1 
            className="text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] text-[#ffffff] tracking-wide"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {groomNick} <span className="font-light italic text-[#df9b8e]">&amp;</span> {brideNick}
          </h1>

          <p 
            className="text-xl xl:text-2xl text-[#f5e6d8] font-serif font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-8"
          >
            {formatEventDate(targetDateStr)}
          </p>

          <div className="bg-black/45 border border-[#df9b8e]/40 backdrop-blur-md rounded-2xl px-6 py-4 max-w-sm shadow-2xl">
            <p className="text-[11px] uppercase tracking-widest text-[#e8c5b8] font-sans">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-xl font-semibold text-white tracking-wide mt-1 font-serif">
              {guestName}
            </p>
            <p className="text-[11px] text-white/70 italic mt-1 font-serif">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: Scrollable Invitation (42% width on desktop, 100% on mobile)  */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] lg:ml-[58%] min-h-screen relative z-10 bg-[#fbf7f0] shadow-[0_0_60px_rgba(0,0,0,0.3)] border-l border-[#8c2d38]/20">

        {/* ========================================================================= */}
        {/* 1. HERO / COVER CARD (Exact recreation of 'seperti ini' reference)         */}
        {/* ========================================================================= */}
        <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-3 py-6 sm:py-8 overflow-hidden select-none">
          
          {/* Background Scene: Authentic Borobudur Stupas & Vintage Orchid Borders */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Backdrop" 
              className="w-full h-full object-cover object-center origin-center"
            />
            {/* Subtle Gradient Veil */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0]/15 via-transparent to-[#fbf7f0]/25" />
          </div>

          {/* Floating Petals Drift & Living Golden Prada Dust */}
          <JavanesePetals count={8} />
          <FloatingGoldenDust count={10} />

          {/* ========================================================================= */}
          {/* ARCH CONTENT AREA (Matching the entrance video's Borobudur Arch scene)     */}
          {/* ========================================================================= */}
          <ScrollReveal animation="arch-reveal" duration={1000} delay={60} className="w-full flex justify-center my-auto">
            <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] min-h-[580px] sm:min-h-[620px] max-h-[92vh] flex flex-col items-center justify-between p-4 sm:p-5 my-auto">
            
            {/* Soft inner radial parchment glow for contrast behind text in open sky */}
            <div className="absolute inset-0 rounded-[180px] bg-gradient-to-b from-[#fbf7f0]/45 via-transparent to-[#fbf7f0]/25 pointer-events-none z-0" />
            <div className="absolute top-10 inset-x-4 h-64 rounded-full bg-gradient-to-b from-[#fbf7f0]/75 via-[#fbf7f0]/50 to-transparent blur-md pointer-events-none z-10" />

            {/* Royal Gold Filigree on Arch Shoulders */}
            <RoyalGoldCorner className="absolute top-2 left-2 w-12 h-12 pointer-events-none opacity-75" flip="top-left" />
            <RoyalGoldCorner className="absolute top-2 right-2 w-12 h-12 pointer-events-none opacity-75" flip="top-right" />

            {/* UPPER BLOCK: Monogram & Typography in the luminous open sky area (above stupa peak) */}
            <div className="relative z-20 w-full flex flex-col items-center pt-6 sm:pt-8">
              {/* TOP: Calligraphic Monogram */}
              <JavaneseMonogram initials="SB" className="mb-3 sm:mb-4" />

              {/* Typography Group: Perfectly Centered */}
              <div className="space-y-1.5 sm:space-y-2 text-center flex flex-col items-center w-full px-2">
                <p 
                  className="text-[11px] sm:text-xs tracking-[0.3em] indent-[0.3em] uppercase text-[#6a1a24] font-serif font-semibold drop-shadow-xs text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  THE WEDDING OF
                </p>

                <h1 
                  className="text-[25px] xs:text-[28px] sm:text-[34px] leading-tight text-[#4e0e16] font-normal tracking-wide drop-shadow-sm whitespace-nowrap text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {groomNick.toUpperCase()} <span className="font-light italic text-[#7c1d29] mx-1">&amp;</span> {brideNick.toUpperCase()}
                </h1>

                <p 
                  className="text-xs sm:text-[13px] tracking-[0.25em] indent-[0.25em] text-[#6a1a24] font-serif pt-0.5 text-center"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {formattedArchDate}
                </p>
              </div>
            </div>

            {/* BOTTOM: Horizontal Capsule Scroll Down Indicator matching video reference */}
            <div className="relative z-20 pb-7 sm:pb-9 flex flex-col items-center mt-auto">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('ayat-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll ke Bawah"
                className="group flex items-center justify-between w-[68px] h-[30px] px-2.5 rounded-full bg-[#fbf7f0]/90 hover:bg-[#ffffff] border border-[#5c131c]/30 shadow-[0_2px_8px_rgba(92,19,28,0.12)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                {/* Sliding Maroon Dot */}
                <div 
                  className="w-2.5 h-2.5 rounded-full bg-[#5c131c] group-hover:bg-[#3d1117] transition-colors"
                  style={{ animation: 'scroll-dot-slide 2.2s ease-in-out infinite' }}
                />
                <div className="w-[1px] h-3.5 bg-[#5c131c]/25" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#5c131c]/20" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

        {/* ========================================================================= */}
        {/* 2. WITH LOVE & AYAT SUCI (Exact recreation of 'ini bawahnya' screenshot)   */}
        {/* ========================================================================= */}
        <section id="ayat-section" className="py-14 px-5 sm:px-8 relative z-10 bg-[#fbf7f0] border-t border-[#8c2d38]/15 text-center overflow-hidden">
          {/* Subtle Ambient Petals & Golden Stardust */}
          <JavanesePetals count={6} />
          <FloatingGoldenDust count={8} />

          <div className="max-w-md mx-auto relative z-10 space-y-7">
            
            {/* Couple Window Photo Card with Corner Floral Sprays */}
            <ScrollReveal animation="arch-reveal" delay={80}>
              <div className="relative mx-auto max-w-[310px] sm:max-w-[340px] px-2 pt-2">
                
                {/* Floral Accent Top Right Corner */}
                <PhotoCornerFloralTopRight className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

                {/* Floral Accent Bottom Left Corner */}
                <PhotoCornerFloralBottomLeft className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

                {/* Photo Container with Luxurious Gold Border and Glow */}
                <div className="relative z-10 w-full aspect-[4/3.2] rounded-2xl overflow-hidden shadow-[0_12px_36px_rgba(92,19,28,0.22),_0_0_20px_rgba(212,175,55,0.25)] border-[2px] border-[#d4af37]/80 bg-[#efe7db]">
                  <img 
                    src={couple?.cover_photo_url || '/photos/photo-3.jpg'} 
                    alt={`${groomNick} & ${brideNick}`} 
                    className="w-full h-full object-cover object-center scale-102"
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* WITH LOVE Heading */}
            <div className="space-y-4 pt-1">
              <ScrollReveal animation="fade-up" delay={200}>
                <h2 
                  className="text-2xl sm:text-3xl font-normal text-[#5c131c] tracking-[0.2em] uppercase font-serif drop-shadow-xs"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  WITH LOVE
                </h2>
              </ScrollReveal>

              {/* Holy Verse Quote (Exact Wording from Screenshot) */}
              <ScrollReveal animation="fade-up" delay={320}>
                <p className="text-xs sm:text-[13px] text-[#42151b] font-serif leading-[1.85] px-2 sm:px-4 drop-shadow-xs">
                  &ldquo;Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
                </p>
              </ScrollReveal>

              {/* Citation */}
              <ScrollReveal animation="fade-up" delay={440}>
                <p 
                  className="text-xs sm:text-[13px] font-serif font-medium text-[#5c131c] tracking-wide"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  (Q.S. Ar. Rum : 21)
                </p>
              </ScrollReveal>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. BRIDE & GROOM SECTION (Exact recreation of user reference screenshots)  */}
        {/* ========================================================================= */}
        <section id="mempelai-section" className="relative py-12 px-3 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden">
          
          {/* Subtle Ambient Background Borobudur & Floral Garland Motif */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Background" 
              className="w-full h-full object-cover object-bottom opacity-70 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0] via-[#fbf7f0]/40 to-[#fbf7f0]/85" />
          </div>

          {/* Floating Golden Dust Particles */}
          <FloatingGoldenDust count={8} />

          {/* Centered Thin Maroon Border Card Container */}
          <ScrollReveal animation="fade-up" delay={80} className="w-full">
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center">
              
              {/* Header: BRIDE & GROOM */}
              <ScrollReveal animation="fade-up" delay={120}>
                <h2 
                  className="text-2xl sm:text-[28px] tracking-[0.25em] text-[#5c131c] font-normal uppercase mb-3 select-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  BRIDE &amp; GROOM
                </h2>
              </ScrollReveal>

              {/* Greeting & Invitation Intro */}
              <ScrollReveal animation="fade-up" delay={180}>
                <div className="space-y-1.5 text-center mb-8 px-1">
                  <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] font-semibold leading-relaxed">
                    Assalamualaikum Wr. Wb.
                  </p>
                  <p className="text-[11px] sm:text-xs font-serif text-[#5a1c24] leading-relaxed">
                    Dengan memohon rahmat dan ridho Allah SWT,<br />
                    kami bermaksud mengundang<br />
                    Bapak/Ibu/Saudara/i untuk menghadiri acara<br />
                    pernikahan putra-putri kami:
                  </p>
                </div>
              </ScrollReveal>

              {/* BRIDE */}
              <ScrollReveal animation="slide-left" delay={240} className="w-full">
                <div className="w-full flex flex-col items-center">
                  {/* Bride Oval Photo with Royal Gold Frame & Halo */}
                  <div className="relative group my-2">
                    <div className="absolute -inset-1 rounded-[50%] bg-gradient-to-tr from-[#d4af37] via-[#fff2cf] to-[#aa771c] opacity-65 blur-[3px]" />
                    <div className="relative w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[2.5px] border-[#d4af37] p-1 bg-[#faf2e6] shadow-[0_10px_26px_rgba(92,19,28,0.22)]">
                      <img 
                        src={couple?.bride_photo_url || '/bride-default.png'} 
                        alt={brideNick}
                        className="w-full h-full object-cover object-top rounded-[50%]"
                      />
                    </div>
                  </div>

                  {/* Script Nickname */}
                  <p 
                    className="text-3xl sm:text-4xl text-[#5c131c] tracking-wide my-1 select-none"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {brideNick}
                  </p>

                  {/* Full Name in All-Caps Serif */}
                  <h3 
                    className="text-base sm:text-lg text-[#5c131c] font-bold tracking-[0.14em] uppercase font-serif mt-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {brideFullName}
                  </h3>

                  {/* Parents Info */}
                  <p className="text-xs sm:text-[13px] text-[#4e1b22] font-serif leading-relaxed mt-2 max-w-[260px]">
                    Putri dari Pasangan Bapak {couple?.bride_father_name || 'Bapak'}<br />
                    &amp; Ibu {couple?.bride_mother_name || 'Ibu'}
                  </p>

                  {/* Circular Maroon Instagram Button */}
                  <a
                    href={`https://instagram.com/${(couple?.bride_instagram || 'bungalestari').replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Instagram ${brideNick}`}
                    className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </a>
                </div>
              </ScrollReveal>

              {/* FLORAL AMPERSAND DIVIDER */}
              <ScrollReveal animation="zoom-in" delay={300}>
                <div className="flex items-center justify-center my-7 select-none">
                  <img 
                    src="/themes/floral-ampersand.png" 
                    alt="&" 
                    className="w-7 h-9 object-contain drop-shadow-xs"
                  />
                </div>
              </ScrollReveal>

              {/* GROOM */}
              <ScrollReveal animation="slide-right" delay={240} className="w-full">
                <div className="w-full flex flex-col items-center">
                  {/* Groom Oval Photo with Royal Gold Frame & Halo */}
                  <div className="relative group my-2">
                    <div className="absolute -inset-1 rounded-[50%] bg-gradient-to-tr from-[#d4af37] via-[#fff2cf] to-[#aa771c] opacity-65 blur-[3px]" />
                    <div className="relative w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[2.5px] border-[#d4af37] p-1 bg-[#faf2e6] shadow-[0_10px_26px_rgba(92,19,28,0.22)]">
                      <img 
                        src={couple?.groom_photo_url || '/groom-default.png'} 
                        alt={groomNick}
                        className="w-full h-full object-cover object-top rounded-[50%]"
                      />
                    </div>
                  </div>

                  {/* Script Nickname */}
                  <p 
                    className="text-3xl sm:text-4xl text-[#5c131c] tracking-wide my-1 select-none"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    {groomNick}
                  </p>

                  {/* Full Name in All-Caps Serif */}
                  <h3 
                    className="text-base sm:text-lg text-[#5c131c] font-bold tracking-[0.14em] uppercase font-serif mt-0.5"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {groomFullName}
                  </h3>

                  {/* Parents Info */}
                  <p className="text-xs sm:text-[13px] text-[#4e1b22] font-serif leading-relaxed mt-2 max-w-[260px]">
                    Putra dari Pasangan Bapak {couple?.groom_father_name || 'Bapak'}<br />
                    &amp; Ibu {couple?.groom_mother_name || 'Ibu'}
                  </p>

                  {/* Circular Maroon Instagram Button */}
                  <a
                    href={`https://instagram.com/${(couple?.groom_instagram || 'stevenpratama').replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Instagram ${groomNick}`}
                    className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
                  >
                    <InstagramIcon className="w-4 h-4 text-white" />
                  </a>
                </div>
              </ScrollReveal>

            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* 4. RANGKAIAN ACARA (AKAD NIKAH & RESEPSI OVAL ARCH CARDS)                 */}
        {/* ========================================================================= */}
        <section id="acara-section" className="relative py-12 sm:py-16 px-3 sm:px-6 z-10 bg-[#4e1017] overflow-hidden text-center select-none shadow-[inset_0_4px_30px_rgba(0,0,0,0.4)]">
          
          {/* Deep Royal Maroon Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4e1017] via-[#400b12] to-[#34070d] pointer-events-none" />

          {/* White/Cream Batik Kawung Motifs on Background Corners */}
          <BatikKawungCluster className="absolute -top-3 -right-3 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-55" />
          <BatikKawungCluster className="absolute top-[28%] -right-8 w-28 h-28 pointer-events-none opacity-35" />
          <BatikKawungCluster className="absolute top-[52%] -left-8 w-28 h-28 pointer-events-none opacity-35" />
          <BatikKawungCluster className="absolute -bottom-3 -left-3 w-36 h-36 sm:w-48 sm:h-48 pointer-events-none opacity-55" />
          <BatikKawungCluster className="absolute -bottom-4 -right-4 w-32 h-32 pointer-events-none opacity-45" />

          {/* Quick Jump Buttons for Akad Nikah & Resepsi */}
          <ScrollReveal animation="fade-up" delay={80}>
            <div className="relative z-20 flex items-center justify-center gap-2 mb-8">
              {displayEvents.map((evt, idx) => (
                <button
                  key={evt.id || idx}
                  type="button"
                  onClick={() => {
                    const el = document.getElementById(idx === 0 ? 'card-akad' : 'card-resepsi');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-5 py-2 rounded-full text-[11px] sm:text-xs font-serif uppercase tracking-[0.2em] bg-black/35 hover:bg-black/55 text-[#fbf7f0]/85 border border-[#c5a880]/35 transition-all duration-300 cursor-pointer shadow-sm hover:scale-105 active:scale-95"
                >
                  {idx === 0 ? 'Akad Nikah' : 'Resepsi'}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Sequential Cards Container: AKAD NIKAH first, RESEPSI second directly below it */}
          <div className="relative z-10 space-y-12 sm:space-y-16 max-w-[380px] mx-auto">
            {displayEvents.map((evt, idx) => {
              const { 
                title, 
                dayName, 
                dayNum, 
                monthYear, 
                timeStr, 
                location, 
                address, 
                mapsUrl 
              } = parseEventDisplay(evt, idx);

              return (
                <ScrollReveal 
                  key={evt.id || idx}
                  animation="arch-reveal" 
                  delay={100}
                  duration={1000}
                  className="w-full flex justify-center"
                >
                  <div 
                    id={idx === 0 ? 'card-akad' : 'card-resepsi'}
                    className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] min-h-[580px] sm:min-h-[620px] mx-auto rounded-[190px] sm:rounded-[215px] border-[2.5px] border-[#d4af37] bg-gradient-to-b from-[#fdfbf6] via-[#faf2e6] to-[#f5ebd8] shadow-[0_18px_50px_rgba(92,19,28,0.28),_0_0_25px_rgba(212,175,55,0.22)] overflow-hidden flex flex-col items-center justify-between p-5 pt-12 sm:pt-14 pb-8 text-center transition-all duration-300"
                    style={{ animation: 'royal-pulse-glow 7.5s ease-in-out infinite' }}
                  >
                    {/* Soft Radial Parchment Warmth */}
                    <div className="absolute inset-0 bg-radial from-[#fdf9f2] via-[#faf2e6] to-[#f4e8d3] pointer-events-none" />

                    {/* Royal 24K Gold Corner Filigree on Upper Arch Shoulders */}
                    <RoyalGoldCorner className="absolute top-2.5 left-2.5 w-14 h-14 sm:w-16 sm:h-16 z-15 pointer-events-none opacity-85" flip="top-left" />
                    <RoyalGoldCorner className="absolute top-2.5 right-2.5 w-14 h-14 sm:w-16 sm:h-16 z-15 pointer-events-none opacity-85" flip="top-right" />

                    {/* Gunungan Wayang (Kayon) Watermark */}
                    <JavaneseGunungan className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[220px] sm:w-[250px] h-[340px] sm:h-[380px] mx-auto opacity-[0.16] pointer-events-none text-[#5c131c]" />

                    {/* Climbing Green Ivy Vines on Upper Left & Right Arch Borders with Smooth Living Sway */}
                    <ArchLeftVine className="absolute -left-3 top-16 sm:top-20 z-20 pointer-events-none" />
                    <ArchRightVine className="absolute -right-3 top-8 sm:top-10 z-20 pointer-events-none" />

                    {/* Delicate Botanical Twig Buds in Top Right Corner */}
                    <PhotoCornerFloralTopRight className="absolute -top-3 -right-3 w-20 h-20 sm:w-24 sm:h-24 z-15 pointer-events-none opacity-80" />

                    {/* Floating Golden Dust Particles Inside Card */}
                    <FloatingGoldenDust count={8} />

                    {/* Ultra-Luxurious Royal Gold Filigree Bottom Garland (NO CANDI STUPAS) */}
                    <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 overflow-hidden rounded-b-[188px] sm:rounded-b-[213px] pointer-events-none z-10 flex flex-col justify-end">
                      {/* Rich Silk Amber & Gold Gradient Backdrop */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#f5ebd8] via-[#faf2e6]/85 to-transparent" />
                      
                      {/* Living Shimmering Gold Filigree Garland */}
                      <div 
                        className="relative z-10 pb-1 px-2"
                        style={{ animation: 'gold-filigree-shimmer 6s ease-in-out infinite' }}
                      >
                        <RoyalCardBottomOrnament className="w-full h-24 sm:h-28 text-[#d4af37]" />
                      </div>
                    </div>

                    {/* Card Top Section: Title & Date */}
                    <div className="relative z-20 w-full flex flex-col items-center">
                      
                      {/* Event Title */}
                      <ScrollReveal animation="fade-up" delay={160}>
                        <h3 
                          className="text-2xl sm:text-[28px] font-normal tracking-[0.18em] text-[#5c131c] uppercase"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {title}
                        </h3>
                      </ScrollReveal>

                      {/* Day */}
                      <ScrollReveal animation="fade-up" delay={220}>
                        <p 
                          className="text-xs sm:text-[13px] tracking-[0.25em] text-[#6a1a24] font-serif uppercase font-medium mt-2"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {dayName}
                        </p>
                      </ScrollReveal>

                      {/* Big Date Number (27 for Akad, 28 for Resepsi) */}
                      <ScrollReveal animation="zoom-in" delay={280}>
                        <div 
                          className="text-[48px] sm:text-[56px] font-light text-[#5c131c] leading-none my-1"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {dayNum}
                        </div>
                      </ScrollReveal>

                      {/* Month & Year */}
                      <ScrollReveal animation="fade-up" delay={340}>
                        <p 
                          className="text-xs sm:text-[13px] tracking-[0.22em] text-[#6a1a24] font-serif uppercase font-medium"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {monthYear}
                        </p>
                      </ScrollReveal>

                      {/* Horizontal Divider Line with Time ABOVE and Peaked Joglo House Icon */}
                      <ScrollReveal animation="fade-up" delay={400} className="w-full max-w-[240px] sm:max-w-[260px]">
                        <div className="w-full flex flex-col items-center mt-5 sm:mt-6 mb-2">
                          <p className="text-xs sm:text-[13px] text-[#5c131c] font-serif italic mb-1.5 tracking-wide font-normal">
                            {timeStr}
                          </p>
                          <div className="w-full flex items-center justify-center">
                            <div className="h-[1px] flex-1 bg-[#5c131c]/60" />
                            <div className="px-3 text-[#5c131c]">
                              <TraditionalHouseIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#5c131c]" />
                            </div>
                            <div className="h-[1px] flex-1 bg-[#5c131c]/60" />
                          </div>
                        </div>
                      </ScrollReveal>

                    </div>

                    {/* Card Bottom Section: Location & Lavish Royal Gold 'LIHAT LOKASI' Button */}
                    <div className="relative z-20 w-full flex flex-col items-center mt-12 sm:mt-16 mb-4 sm:mb-6 px-4">
                      <ScrollReveal animation="fade-up" delay={460}>
                        <p 
                          className="text-sm sm:text-base font-serif text-[#4e1b22] font-semibold tracking-wide drop-shadow-xs"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {location}
                        </p>
                      </ScrollReveal>

                      {address && address !== location && (
                        <ScrollReveal animation="fade-up" delay={500}>
                          <p className="text-[11px] sm:text-xs text-[#6e2b34] font-serif leading-relaxed mt-1 max-w-[240px]">
                            {address}
                          </p>
                        </ScrollReveal>
                      )}

                      {/* Royal Gold 'LIHAT LOKASI' Button */}
                      {mapsUrl && (
                        <ScrollReveal animation="zoom-in" delay={540}>
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e30] text-[#4e0e16] font-serif uppercase tracking-[0.22em] text-[11px] sm:text-xs font-bold transition-all duration-300 shadow-[0_4px_18px_rgba(212,175,55,0.45),_0_2px_8px_rgba(92,19,28,0.2)] hover:shadow-[0_6px_25px_rgba(212,175,55,0.7)] hover:scale-105 active:scale-95 cursor-pointer mt-3 z-20 border border-[#fff2cf] overflow-hidden"
                          >
                            {/* Golden Shimmer Sweep */}
                            <span 
                              className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-25deg] pointer-events-none"
                              style={{ animation: 'shimmer-sweep-gold 4.5s ease-in-out infinite' }}
                            />
                            <MapPin className="w-3.5 h-3.5 text-[#5c131c] drop-shadow-xs transition-transform group-hover:scale-110" />
                            <span className="drop-shadow-xs">Lihat Lokasi</span>
                          </a>
                        </ScrollReveal>
                      )}

                    </div>

                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </section>

        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* 5. LOVE STORY (Exact Recreation of 'ini bawahnya' reference screenshots)   */}
        {/* ========================================================================= */}
        <section id="love-story-section" className="relative py-12 px-3 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden">
          
          {/* Subtle Ambient Background Borobudur & Floral Garland Motif */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Background" 
              className="w-full h-full object-cover object-bottom opacity-70 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0] via-[#fbf7f0]/45 to-[#fbf7f0]/85" />
          </div>

          {/* Centered Thin Maroon Border Card Container matching Screenshot */}
          <ScrollReveal animation="fade-up" delay={80} className="w-full">
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#d4af37]/80 bg-[#fbf7f0]/90 backdrop-blur-[3px] shadow-[0_8px_30px_rgba(92,19,28,0.12),_0_0_20px_rgba(212,175,55,0.12)] px-5 py-8 sm:px-7 sm:py-10 flex flex-col text-left">
              
              {/* Royal Gold Filigree Corners */}
              <RoyalGoldCorner className="absolute top-2.5 left-2.5 w-11 h-11 pointer-events-none opacity-65" flip="top-left" />
              <RoyalGoldCorner className="absolute top-2.5 right-2.5 w-11 h-11 pointer-events-none opacity-65" flip="top-right" />

              {/* Header: LOVE STORY (Centered) */}
              <ScrollReveal animation="fade-up" delay={140}>
                <h2 
                  className="text-2xl sm:text-[28px] tracking-[0.2em] text-[#5c131c] font-normal uppercase text-center mb-1.5 select-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  LOVE STORY
                </h2>
              </ScrollReveal>

              {/* Subtitle Quote (Centered) */}
              <ScrollReveal animation="fade-up" delay={200}>
                <div className="text-center text-xs sm:text-[13px] font-serif text-[#5c131c] leading-relaxed mb-6 px-2">
                  <p>Setiap Kisah Cinta Itu Indah,</p>
                  <p>Tapi Miliki Kamu Adalah Favoritku</p>
                </div>
              </ScrollReveal>

              {/* Couple Window Photo */}
              <ScrollReveal animation="zoom-in" delay={260}>
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-[2px] border-[#d4af37]/60 mb-8 bg-[#efe7db]">
                  <img 
                    src={couple?.cover_photo_url || '/photos/photo-6.jpg'} 
                    alt={`${groomNick} & ${brideNick} Love Story`} 
                    className="w-full h-full object-cover object-center scale-102"
                  />
                </div>
              </ScrollReveal>

              {/* Chapters (Left aligned) */}
              <div className="space-y-6 sm:space-y-7">
                {displayStories.map((story, i) => (
                  <ScrollReveal key={i} animation="fade-up" delay={300 + i * 120}>
                    <div className="space-y-1.5">
                      <h3 
                        className="text-base sm:text-lg text-[#5c131c] font-bold tracking-wide font-serif"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {story.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#42151b] font-serif leading-[1.85] text-justify sm:text-left">
                        {story.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* 6. LIVE STREAMING (Exact Recreation of User Reference Screenshot)         */}
        {/* ========================================================================= */}
        <section id="streaming-section" className="relative py-12 px-3 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden">
          
          {/* Subtle Ambient Background Borobudur & Floral Garland Motif */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Background" 
              className="w-full h-full object-cover object-bottom opacity-70 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0] via-[#fbf7f0]/45 to-[#fbf7f0]/85" />
          </div>

          {/* Centered Thin Maroon Border Card Container matching Screenshot */}
          <ScrollReveal animation="fade-up" delay={80} className="w-full">
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#d4af37]/80 bg-[#fbf7f0]/90 backdrop-blur-[3px] shadow-[0_8px_30px_rgba(92,19,28,0.12),_0_0_20px_rgba(212,175,55,0.12)] px-5 py-8 sm:px-7 sm:py-10 flex flex-col items-center text-center">
              
              {/* Royal Gold Filigree Corners */}
              <RoyalGoldCorner className="absolute top-2.5 left-2.5 w-11 h-11 pointer-events-none opacity-65" flip="top-left" />
              <RoyalGoldCorner className="absolute top-2.5 right-2.5 w-11 h-11 pointer-events-none opacity-65" flip="top-right" />

              {/* Header: LIVE STREAMING */}
              <ScrollReveal animation="fade-up" delay={140}>
                <h2 
                  className="text-2xl sm:text-[28px] tracking-[0.18em] text-[#5c131c] font-normal uppercase mb-3 select-none"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  LIVE STREAMING
                </h2>
              </ScrollReveal>

              {/* Description Text */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mb-6">
                  - Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual yang disiarkan langsung melalui media sosial di bawah ini:
                </p>
              </ScrollReveal>

              {/* Event Date (Sunday, 28 December 2025) */}
              <ScrollReveal animation="fade-up" delay={260}>
                <h3 
                  className="text-sm sm:text-base font-bold text-[#5c131c] uppercase tracking-wide font-serif mb-1"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  MINGGU, 28 DESEMBER 2025
                </h3>
              </ScrollReveal>

              {/* Event Time */}
              <ScrollReveal animation="fade-up" delay={300}>
                <p className="text-xs sm:text-[13px] font-serif italic text-[#5c131c] mb-6 tracking-wide">
                  10.00 WIB – Selesai
                </p>
              </ScrollReveal>

              {/* Golden Pill Instagram Button (KLIK DI SINI) */}
              <ScrollReveal animation="zoom-in" delay={360}>
                <a
                  href={couple?.streaming_url || `https://instagram.com/${(couple?.bride_instagram || 'bungalestari').replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Tonton Live Streaming di Instagram"
                  className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f5e2a3] to-[#c59e30] text-[#4e0e16] font-bold shadow-[0_4px_18px_rgba(212,175,55,0.45)] border border-[#fff2cf] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none group"
                >
                  <InstagramIcon className="w-4 h-4 text-[#4e0e16] group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase">
                    KLIK DI SINI
                  </span>
                </a>
              </ScrollReveal>

            </div>
          </ScrollReveal>
        </section>

        {/* ========================================================================= */}
        {/* 7. WEDDING GIFT & WISHES (Exact Recreation of User Reference Screenshots) */}
        {/* ========================================================================= */}
        <section id="gift-wishes-section" className="relative py-12 px-3 sm:px-6 z-10 bg-[#4e1017] text-white overflow-hidden">
          
          {/* Ambient Deep Maroon Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4e1017] via-[#3a0b11] to-[#4e1017] pointer-events-none" />

          {/* Corner Rosettes: Batik Kawung */}
          <BatikKawungCluster className="absolute -top-12 -right-12 w-48 h-48 sm:w-60 sm:h-60 opacity-90 z-0 pointer-events-none" />
          <BatikKawungCluster className="absolute -bottom-10 -right-10 w-44 h-44 sm:w-56 sm:h-56 opacity-85 z-0 pointer-events-none" />

          {/* Left Climbing Foliage Vines */}
          <ArchLeftVine className="absolute top-16 -left-1 sm:left-2 opacity-95 z-0 pointer-events-none" />
          <ArchLeftVine className="absolute top-[48%] -left-1 sm:left-2 opacity-85 z-0 pointer-events-none" />
          <ArchLeftVine className="absolute bottom-24 -left-1 sm:left-2 opacity-90 z-0 pointer-events-none" />

          {/* ------------------------------------------------------------------------- */}
          {/* Card 1: WEDDING GIFT                                                      */}
          {/* ------------------------------------------------------------------------- */}
          <ScrollReveal animation="arch-reveal" delay={80} className="w-full mb-8">
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-[#c5a880] bg-[#faf3e8] shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-8 sm:px-7 sm:py-9 flex flex-col items-center text-center overflow-hidden">
              
              {/* Ambient Watermark Texture & Gunungan Wayang in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <JavaneseGunungan className="w-64 sm:w-72 h-auto" />
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[radial-gradient(#caa772_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Title: WEDDING GIFT */}
              <ScrollReveal animation="fade-up" delay={140}>
                <h2 
                  className="text-2xl sm:text-[28px] tracking-[0.18em] text-[#5c131c] font-normal uppercase mb-3.5 select-none relative z-10"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  WEDDING GIFT
                </h2>
              </ScrollReveal>

              {/* Paragraph Text */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mx-auto mb-6 relative z-10">
                  Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
                </p>
              </ScrollReveal>

              {/* Golden Pill Button: ➔ KLIK DI SINI */}
              <ScrollReveal animation="zoom-in" delay={260}>
                <button
                  type="button"
                  onClick={() => setShowGiftDetails(prev => !prev)}
                  aria-label="Buka Rincian Rekening Hadiah"
                  className="relative z-10 inline-flex items-center justify-center gap-2 px-8 py-2.5 rounded-full bg-gradient-to-r from-[#d1b07c] via-[#caa772] to-[#b8955f] hover:from-[#caa772] hover:to-[#a8854f] text-white shadow-[0_4px_16px_rgba(184,150,95,0.45)] border border-[#dfbf8e] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none group"
                >
                  <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5">
                    {showGiftDetails ? (
                      <>
                        <X className="w-3.5 h-3.5" />
                        <span>TUTUP</span>
                      </>
                    ) : (
                      <>
                        <span className="text-base leading-none">➔</span>
                        <span>KLIK DI SINI</span>
                      </>
                    )}
                  </span>
                </button>
              </ScrollReveal>

              {/* Expandable Bank Account Cards when clicked */}
              {showGiftDetails && (
                <div className="w-full mt-6 space-y-3.5 text-left relative z-10 animate-in fade-in slide-in-from-top-3 duration-300">
                  {displayGifts.map((gift, idx) => (
                    <div 
                      key={idx}
                      className="bg-[#fbf7f0]/95 backdrop-blur-xs rounded-2xl p-4 shadow-sm border border-[#caa772]/50 space-y-2 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between border-b border-[#8c2d38]/15 pb-2">
                        <span className="font-sans font-bold text-xs sm:text-sm text-[#4e0e16] tracking-wider">
                          {gift.provider}
                        </span>
                        <CreditCard className="w-4 h-4 text-[#8c2d38]" />
                      </div>

                      <div className="space-y-0.5">
                        <p className="text-[10px] text-[#7a2832] font-serif uppercase tracking-wider">
                          Nomor Rekening :
                        </p>
                        <p className="text-base sm:text-lg font-mono font-bold text-[#3d1117] tracking-wider">
                          {gift.account_number}
                        </p>
                        <p className="text-xs text-[#5c242c] font-serif">
                          a.n {gift.account_name}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleCopy(gift.account_number, idx)}
                        className="w-full py-2 px-3 rounded-xl bg-[#8c3d49]/10 hover:bg-[#8c3d49] text-[#8c3d49] hover:text-white transition-all text-xs font-serif flex items-center justify-center gap-1.5 cursor-pointer border border-[#8c3d49]/30"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-semibold text-emerald-700">Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Nomor Rekening</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          </ScrollReveal>

          {/* ------------------------------------------------------------------------- */}
          {/* Card 2: WISHES                                                            */}
          {/* ------------------------------------------------------------------------- */}
          <ScrollReveal animation="arch-reveal" delay={120} className="w-full">
            <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-[#c5a880] bg-[#faf3e8] shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-8 sm:px-7 sm:py-9 flex flex-col text-center relative overflow-hidden">
              
              {/* Ambient Watermark Texture & Gunungan Wayang in Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
                <JavaneseGunungan className="w-64 sm:w-72 h-auto" />
              </div>
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[radial-gradient(#caa772_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Header: WISHES */}
              <ScrollReveal animation="fade-up" delay={160}>
                <h2 
                  className="text-2xl sm:text-[28px] tracking-[0.2em] text-[#5c131c] font-normal uppercase mb-2 select-none relative z-10"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  WISHES
                </h2>
              </ScrollReveal>

              {/* Subtitle */}
              <ScrollReveal animation="fade-up" delay={200}>
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mx-auto mb-4 relative z-10">
                  Berikan ucapan harapan dan do'a kepada kedua mempelai
                </p>
              </ScrollReveal>

              {/* Comment Counter (e.g. 1 Comment) */}
              <ScrollReveal animation="fade-up" delay={240}>
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22]/90 mb-4 select-none relative z-10 font-medium">
                  {wishes.length} {wishes.length === 1 ? 'Comment' : 'Comments'}
                </p>
              </ScrollReveal>

              {/* Stats Summary Pills (Hadir & Tidak Hadir) */}
              <ScrollReveal animation="zoom-in" delay={280}>
                <div className="grid grid-cols-2 gap-3 mb-5 max-w-[310px] w-full mx-auto relative z-10">
                  {/* Hadir Pill */}
                  <div className="bg-[#dcfce7] border border-[#bbf7d0] rounded-2xl py-3 px-3 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl sm:text-[26px] font-bold text-[#166534] leading-tight">
                      {hadirCount}
                    </span>
                    <span className="text-xs font-serif text-[#166534] mt-0.5">
                      Hadir
                    </span>
                  </div>

                  {/* Tidak Hadir Pill */}
                  <div className="bg-[#fee2e2] border border-[#fecaca] rounded-2xl py-3 px-3 flex flex-col items-center justify-center shadow-xs">
                    <span className="text-2xl sm:text-[26px] font-bold text-[#991b1b] leading-tight">
                      {tidakHadirCount}
                    </span>
                    <span className="text-xs font-serif text-[#991b1b] mt-0.5">
                      Tidak Hadir
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Form */}
              <ScrollReveal animation="fade-up" delay={320} className="w-full">
                <form onSubmit={handleSubmitWish} className="space-y-3 relative z-10 w-full text-left">
                  {/* Nama */}
                  <div>
                    <input
                      type="text"
                      value={wishName}
                      onChange={(e) => setWishName(e.target.value)}
                      placeholder="Nama"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6c7b2] bg-white text-xs sm:text-sm text-[#3d1117] placeholder:text-[#a09081] focus:outline-none focus:border-[#8c3d49] shadow-xs"
                    />
                  </div>

                  {/* Ucapan */}
                  <div>
                    <textarea
                      id="wishes-message-input"
                      rows={3}
                      value={wishText}
                      onChange={(e) => setWishText(e.target.value)}
                      placeholder="Ucapan"
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6c7b2] bg-white text-xs sm:text-sm text-[#3d1117] placeholder:text-[#a09081] focus:outline-none focus:border-[#8c3d49] shadow-xs resize-none"
                    />
                  </div>

                  {/* Konfirmasi Kehadiran Select */}
                  <div className="relative">
                    <select
                      value={wishAttendance}
                      onChange={(e) => setWishAttendance(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#d6c7b2] bg-white text-xs sm:text-sm text-[#5a483e] focus:outline-none focus:border-[#8c3d49] shadow-xs appearance-none cursor-pointer"
                    >
                      <option value="Hadir">Hadir</option>
                      <option value="Tidak Hadir">Tidak Hadir</option>
                      <option value="Ragu-ragu">Ragu-ragu</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#a09081]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                      </svg>
                    </div>
                  </div>

                  {/* Kirim Button */}
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-[#8c3d49] hover:bg-[#782f3a] active:bg-[#63242e] text-white text-xs sm:text-sm font-medium tracking-wide transition-all shadow-[0_2px_8px_rgba(140,61,73,0.35)] cursor-pointer"
                  >
                    Kirim
                  </button>
                </form>
              </ScrollReveal>

              {/* Comments Feed */}
              <ScrollReveal animation="fade-up" delay={360} className="w-full">
                <div className="mt-6 pt-4 border-t border-[#8c2d38]/15 space-y-4 text-left relative z-10 w-full max-h-80 overflow-y-auto pr-1">
                  {wishes.map((w, idx) => (
                    <div key={idx} className="pb-3 border-b border-[#8c2d38]/10 last:border-b-0 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-[13px] text-[#4e1017]">
                          {w.name}
                        </span>
                        {/* Green verified check badge */}
                        <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-[#16a34a] text-white shrink-0">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#4e1b22] font-serif leading-relaxed">
                        {w.message}
                      </p>
                      <div className="flex items-center gap-3 pt-0.5">
                        <span className="text-[11px] text-[#7d3f47]/80 font-serif">
                          {w.date}
                        </span>
                        <button 
                          type="button"
                          onClick={() => {
                            setWishText(`@${w.name} `);
                            const inputEl = document.getElementById('wishes-message-input');
                            if (inputEl) inputEl.focus();
                          }}
                          className="text-[11px] font-semibold text-[#8c3d49] hover:underline cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </ScrollReveal>

        </section>

        {/* ========================================================================= */}
        {/* 8. PENUTUP & UCAPAN TERIMA KASIH (Exact User Reference Screenshot)        */}
        {/* ========================================================================= */}
        <section id="closing-section" className="relative pt-10 pb-16 px-4 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden min-h-[640px] flex flex-col items-center justify-between">
          
          {/* Authentic Javanese Heritage Background with Stupas & Florals */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/javanese-heritage-bg.jpg" 
              alt="Javanese Heritage Background" 
              className="w-full h-full object-cover object-bottom opacity-85 select-none"
            />
            {/* Soft vignette to blend with previous section */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#fbf7f0]/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Floating Gold Prada Dust */}
          <FloatingGoldenDust count={8} />

          <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] mx-auto flex flex-col items-center text-center">
            
            {/* Arch Photo Frame with Royal Gold Border and Subtle Halo */}
            <ScrollReveal animation="arch-reveal" delay={80}>
              <div className="relative w-[215px] sm:w-[245px] aspect-[3/4.1] rounded-t-[110px] sm:rounded-t-[125px] rounded-b-none border-[3px] border-[#d4af37] overflow-hidden shadow-[0_12px_36px_rgba(92,19,28,0.28),_0_0_24px_rgba(212,175,55,0.25)] bg-[#f5ebe1] mb-6">
                <img 
                  src={couple?.cover_photo_url || '/photos/photo-3.jpg'} 
                  alt={`${groomNick} & ${brideNick}`} 
                  className="w-full h-full object-cover object-[center_18%]"
                />
              </div>
            </ScrollReveal>

            {/* Closing Thank You Text */}
            <ScrollReveal animation="fade-up" delay={220}>
              <div className="space-y-3 px-3 max-w-[320px] sm:max-w-[340px] mx-auto mb-7">
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restunya untuk pernikahan kami.
                </p>
                <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed">
                  Atas doa &amp; restunya, kami ucapkan terima kasih.
                </p>
              </div>
            </ScrollReveal>

            {/* Names: STEVEN & BUNGA (Strictly matching screenshot) */}
            <ScrollReveal animation="fade-up" delay={340}>
              <h2 
                className="text-2xl sm:text-[28px] tracking-[0.08em] text-[#5c131c] font-normal uppercase select-none pb-24 sm:pb-28"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomNick.toUpperCase()} <span className="italic font-serif font-normal">&amp;</span> {brideNick.toUpperCase()}
              </h2>
            </ScrollReveal>

          </div>

        </section>

      </div>
    </div>
  );
};
