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

// Intertwined Calligraphic Monogram Emblem (Matches User Reference Top Logo exactly)
export const JavaneseMonogram: React.FC<{ initials?: string; className?: string }> = ({ 
  initials = 'HA', 
  className = '' 
}) => (
  <div className={`relative inline-flex items-center justify-center select-none ${className}`}>
    <svg 
      viewBox="0 0 110 135" 
      fill="none" 
      className="w-16 h-20 sm:w-20 sm:h-24 text-[#5c131c] drop-shadow-[0_2px_4px_rgba(92,19,28,0.22)]"
    >
      {/* Front Serif D Stem */}
      <path 
        d="M58 24 L58 108 M50 24 L66 24 M50 108 L66 108" 
        stroke="currentColor" 
        strokeWidth="3.6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      {/* Front D Outer Curve */}
      <path 
        d="M58 24 C90 24, 98 44, 98 66 C98 88, 90 108, 58 108" 
        stroke="currentColor" 
        strokeWidth="3.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Back Intertwined D / Calligraphic Flourish Swash */}
      <path 
        d="M36 86 C22 76, 26 56, 38 42 C48 30, 68 26, 76 25 M76 25 L76 96 C76 108, 62 116, 46 116 C30 116, 18 104, 34 90 C48 78, 72 86, 82 95" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none" 
      />
    </svg>
  </div>
);

// Climbing Ivy / Betel Vines on Left Arch Border (Curling over the maroon frame)
const ArchLeftVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
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

// Climbing Ivy / Betel Vines on Right Arch Border (Curling over the maroon frame)
const ArchRightVine: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`pointer-events-none select-none ${className}`}>
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
  <div className={`pointer-events-none select-none ${className}`}>
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
  <div className={`pointer-events-none select-none ${className}`}>
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

// Floating Floral & Gold Sparkle Particles
export const JavanesePetals: React.FC<{ count?: number }> = ({ count = 10 }) => {
  const petals = [
    { top: '10%', left: '12%', size: 14, duration: '9s', delay: '0s', rot: '25deg' },
    { top: '24%', left: '85%', size: 18, duration: '12s', delay: '1.5s', rot: '-40deg' },
    { top: '40%', left: '16%', size: 12, duration: '8.5s', delay: '3s', rot: '65deg' },
    { top: '56%', left: '82%', size: 16, duration: '11s', delay: '0.8s', rot: '-15deg' },
    { top: '72%', left: '10%', size: 14, duration: '10s', delay: '2.2s', rot: '45deg' },
    { top: '88%', left: '76%', size: 20, duration: '13s', delay: '1.8s', rot: '-50deg' },
    { top: '32%', left: '70%', size: 12, duration: '9.5s', delay: '2.5s', rot: '30deg' },
    { top: '64%', left: '25%', size: 15, duration: '10.5s', delay: '0.4s', rot: '-35deg' },
  ].slice(0, count);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {petals.map((p, idx) => (
        <div
          key={idx}
          className="absolute opacity-65"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            transform: `rotate(${p.rot})`,
            animation: `javanese-petal-float ${p.duration} ease-in-out infinite ${p.delay}`,
            willChange: 'transform, opacity',
          }}
        >
          {/* Burgundy / Terracotta Orchid Petal Shape */}
          <svg viewBox="0 0 30 30" fill="none" className="w-full h-full text-[#7a1e28]">
            <path 
              d="M15 2 C22 8, 28 16, 26 23 C24 28, 17 29, 13 26 C8 22, 6 14, 15 2 Z" 
              fill="currentColor" 
              opacity="0.75" 
            />
          </svg>
        </div>
      ))}
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
      message: 'Happy Wedding Habib & Adiba',
      date: '1 menit lalu'
    }
  ]);

  const hadirCount = wishes.filter(w => w.attendance === 'Hadir').length;
  const tidakHadirCount = wishes.filter(w => w.attendance === 'Tidak Hadir').length;

  // Couple names - Habib & Adiba as canonical demo
  const groomNick = (() => {
    const nick = couple?.groom_nickname?.trim();
    const full = couple?.groom_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'bagas' && nick.toLowerCase() !== 'steven') return nick;
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'steven') return full.split(' ')[0];
    return 'Habib';
  })();

  const brideNick = (() => {
    const nick = couple?.bride_nickname?.trim();
    const full = couple?.bride_full_name?.trim();
    if (nick && nick.toLowerCase() !== 'siti' && nick.toLowerCase() !== 'bunga') return nick;
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'bunga') return full.split(' ')[0];
    return 'Adiba';
  })();

  const groomFullName = (() => {
    const full = couple?.groom_full_name?.trim();
    if (full && full.toLowerCase() !== 'bagas' && full.toLowerCase() !== 'steven pratama') return full;
    return 'HABIB YULIANTO';
  })();

  const brideFullName = (() => {
    const full = couple?.bride_full_name?.trim();
    if (full && full.toLowerCase() !== 'siti' && full.toLowerCase() !== 'bunga lestari') return full;
    return 'ADIBA PUTRI SYAKILLA';
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

  // Gallery fallback matching user reference screenshots (Habib & Adiba)
  const defaultGallery = [
    { 
      image_url: '/themes/gallery-habib-adiba-1.png', 
      caption: 'Langkah Bersama Menuju Hari Bahagia' 
    },
    { 
      image_url: '/themes/gallery-habib-adiba-2.png', 
      caption: 'Dalam Kehangatan Pendopo Jawa' 
    },
    { 
      image_url: '/themes/gallery-habib-adiba-3.png', 
      caption: 'Duduk Berdua Mengukir Janji Kasih' 
    },
    { 
      image_url: '/themes/gallery-habib-adiba-4.png', 
      caption: 'Adat Luhur & Keagungan Cinta' 
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

          {/* Floating Petals Drift */}
          <JavanesePetals count={8} />

          {/* ========================================================================= */}
          {/* THE SIGNATURE DOUBLE MAROON OVAL ARCH FRAME (Matching 'seperti ini' screenshot) */}
          {/* ========================================================================= */}
          <div className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] min-h-[580px] sm:min-h-[620px] max-h-[92vh] flex flex-col items-center justify-between p-4 sm:p-5 my-auto">
            
            {/* Outer Maroon Arch Line */}
            <div className="absolute inset-0 rounded-[190px] sm:rounded-[215px] border-[2.5px] border-[#5c131c] shadow-[0_4px_24px_rgba(92,19,28,0.18)] pointer-events-none z-10" />

            {/* Inner Maroon Arch Line with 5px gap */}
            <div className="absolute inset-[5px] rounded-[185px] sm:rounded-[210px] border-[1.5px] border-[#5c131c]/90 pointer-events-none z-10" />

            {/* Soft inner radial parchment glow for contrast */}
            <div className="absolute inset-[7px] rounded-[183px] sm:rounded-[208px] bg-gradient-to-b from-[#fbf7f0]/60 via-[#fbf7f0]/25 to-[#fbf7f0]/50 pointer-events-none z-0" />

            {/* Climbing Green Ivy / Betel Vines on Left Arch Border */}
            <ArchLeftVine className="absolute -left-3.5 top-[32%] z-20 pointer-events-none" />

            {/* Climbing Green Ivy / Betel Vines on Right Arch Border */}
            <ArchRightVine className="absolute -right-3.5 top-[37%] z-20 pointer-events-none" />

            {/* TOP: Calligraphic Monogram */}
            <div className="relative z-20 pt-7 sm:pt-9">
              <JavaneseMonogram />
            </div>

            {/* MIDDLE: Typography - THE WEDDING OF HABIB & ADIBA */}
            <div className="relative z-20 my-auto py-2 space-y-2 text-center">
              <p 
                className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-[#6a1a24] font-serif font-semibold drop-shadow-xs"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                THE WEDDING OF
              </p>

              <h1 
                className="text-[32px] sm:text-[38px] leading-tight text-[#4e0e16] font-normal tracking-wide drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomNick.toUpperCase()} <span className="font-light italic text-[#7c1d29]">&amp;</span> {brideNick.toUpperCase()}
              </h1>

              <p 
                className="text-xs sm:text-[13px] tracking-[0.25em] text-[#6a1a24] font-serif pt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {formattedArchDate}
              </p>
            </div>

            {/* BOTTOM: Vertical Capsule Scroll Down Indicator matching 'seperti ini' screenshot */}
            <div className="relative z-20 pb-7 sm:pb-9 flex flex-col items-center">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('ayat-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Scroll ke Bawah"
                className="flex flex-col items-center group cursor-pointer animate-fade-in transition-transform hover:scale-110 active:scale-95"
              >
                <div className="w-[22px] h-[42px] rounded-full border-[1.8px] border-[#6a1a24] flex items-start justify-center pt-2 shadow-xs group-hover:border-[#4e0e16] transition-colors">
                  {/* Animated sliding scroll pill dot */}
                  <div 
                    className="w-[3px] h-[7px] rounded-full bg-[#6a1a24] group-hover:bg-[#4e0e16]"
                    style={{ animation: 'scroll-pill-bounce 2s ease-in-out infinite' }}
                  />
                </div>
              </button>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. WITH LOVE & AYAT SUCI (Exact recreation of 'ini bawahnya' screenshot)   */}
        {/* ========================================================================= */}
        <section id="ayat-section" className="py-14 px-5 sm:px-8 relative z-10 bg-[#fbf7f0] border-t border-[#8c2d38]/15 text-center overflow-hidden">
          {/* Subtle Ambient Petals */}
          <JavanesePetals count={6} />

          <div className="max-w-md mx-auto relative z-10 space-y-7">
            
            {/* Couple Window Photo Card with Corner Floral Sprays */}
            <div className="relative mx-auto max-w-[310px] sm:max-w-[340px] px-2 pt-2">
              
              {/* Floral Accent Top Right Corner */}
              <PhotoCornerFloralTopRight className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

              {/* Floral Accent Bottom Left Corner */}
              <PhotoCornerFloralBottomLeft className="absolute -bottom-4 -left-4 w-20 h-20 sm:w-24 sm:h-24 z-20 pointer-events-none" />

              {/* Photo Container */}
              <div className="relative z-10 w-full aspect-[4/3.2] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(92,19,28,0.18)] border border-[#8c2d38]/20 bg-[#efe7db]">
                <img 
                  src="/themes/habib-adiba-window.jpg" 
                  alt="Habib & Adiba" 
                  className="w-full h-full object-cover object-center scale-102"
                />
              </div>
            </div>

            {/* WITH LOVE Heading */}
            <div className="space-y-4 pt-1">
              <h2 
                className="text-2xl sm:text-3xl font-normal text-[#5c131c] tracking-[0.2em] uppercase font-serif drop-shadow-xs"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                WITH LOVE
              </h2>

              {/* Holy Verse Quote (Exact Wording from Screenshot) */}
              <p className="text-xs sm:text-[13px] text-[#42151b] font-serif leading-[1.85] px-2 sm:px-4 drop-shadow-xs">
                &ldquo;Dan diantara tanda-tanda kekuasaanNya ialah Dia menciptakan untukmu pasangan-pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikanNya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berpikir.&rdquo;
              </p>

              {/* Citation */}
              <p 
                className="text-xs sm:text-[13px] font-serif font-medium text-[#5c131c] tracking-wide"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                (Q.S. Ar. Rum : 21)
              </p>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
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

          {/* Centered Thin Maroon Border Card Container */}
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-5 py-8 sm:px-8 sm:py-10 flex flex-col items-center text-center">
            
            {/* Header: BRIDE & GROOM */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.25em] text-[#5c131c] font-normal uppercase mb-3 select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              BRIDE &amp; GROOM
            </h2>

            {/* Greeting & Invitation Intro */}
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

            {/* ========================================================================= */}
            {/* BRIDE (Adiba - Comes First Matching Reference)                           */}
            {/* ========================================================================= */}
            <div className="w-full flex flex-col items-center">
              {/* Bride Oval Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[1.5px] border-[#5c131c]/50 p-1 bg-[#fbf7f0] shadow-md mb-2">
                <img 
                  src={couple?.bride_photo_url || '/themes/adiba-portrait.png'} 
                  alt={brideNick}
                  className="w-full h-full object-cover object-top rounded-[50%]"
                />
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
                Putri dari Pasangan Bapak {couple?.bride_father_name || 'Anas Rifai'}<br />
                &amp; Ibu {couple?.bride_mother_name || 'Kholifah'}
              </p>

              {/* Circular Maroon Instagram Button */}
              <a
                href={`https://instagram.com/${(couple?.bride_instagram || 'adibasyakilla').replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${brideNick}`}
                className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
            </div>

            {/* ========================================================================= */}
            {/* FLORAL AMPERSAND DIVIDER (Matching Reference)                            */}
            {/* ========================================================================= */}
            <div className="flex items-center justify-center my-7 select-none">
              <img 
                src="/themes/floral-ampersand.png" 
                alt="&" 
                className="w-7 h-9 object-contain drop-shadow-xs"
              />
            </div>

            {/* ========================================================================= */}
            {/* GROOM (Habib - Comes Second Matching Reference)                          */}
            {/* ========================================================================= */}
            <div className="w-full flex flex-col items-center">
              {/* Groom Oval Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-58 rounded-[50%] overflow-hidden border-[1.5px] border-[#5c131c]/50 p-1 bg-[#fbf7f0] shadow-md mb-2">
                <img 
                  src={couple?.groom_photo_url || '/themes/habib-portrait.png'} 
                  alt={groomNick}
                  className="w-full h-full object-cover object-top rounded-[50%]"
                />
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
                Putra dari Pasangan Bapak {couple?.groom_father_name || 'H. M. Dawam'}<br />
                &amp; Ibu {couple?.groom_mother_name || 'Dewi Sudarwati (Almh)'}
              </p>

              {/* Circular Maroon Instagram Button */}
              <a
                href={`https://instagram.com/${(couple?.groom_instagram || 'habibyulianto').replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label={`Instagram ${groomNick}`}
                className="w-8 h-8 rounded-full bg-[#5c131c] flex items-center justify-center text-white shadow-md hover:scale-110 active:scale-95 transition-all cursor-pointer mt-3"
              >
                <InstagramIcon className="w-4 h-4 text-white" />
              </a>
            </div>

          </div>
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
                <div 
                  key={evt.id || idx}
                  id={idx === 0 ? 'card-akad' : 'card-resepsi'}
                  className="relative z-10 w-full max-w-[340px] sm:max-w-[370px] min-h-[580px] sm:min-h-[620px] mx-auto rounded-[190px] sm:rounded-[215px] border-[2px] border-[#c5a880] bg-[#faf3e8] shadow-[0_12px_40px_rgba(0,0,0,0.45)] overflow-hidden flex flex-col items-center justify-between p-5 pt-12 sm:pt-14 pb-8 text-center transition-all duration-300"
                >
                  {/* Soft Radial Parchment Warmth */}
                  <div className="absolute inset-0 bg-radial from-[#fdf9f2] via-[#faf2e6] to-[#f4e8d3] pointer-events-none" />

                  {/* Gunungan Wayang (Kayon) Watermark */}
                  <JavaneseGunungan className="absolute inset-x-0 top-1/2 -translate-y-1/2 w-[220px] sm:w-[250px] h-[340px] sm:h-[380px] mx-auto opacity-[0.18] pointer-events-none text-[#5c131c]" />

                  {/* Climbing Green Ivy Vine on Upper Right Gold Rim */}
                  <ArchRightVine className="absolute -right-3 top-8 sm:top-10 z-20 pointer-events-none" />

                  {/* Delicate Botanical Twig Buds in Top Right Corner */}
                  <PhotoCornerFloralTopRight className="absolute -top-3 -right-3 w-20 h-20 sm:w-24 sm:h-24 z-15 pointer-events-none opacity-80" />

                  {/* Curved Bottom Floral Garland of Burgundy Orchids and Cream Peonies */}
                  <div className="absolute inset-x-0 bottom-0 h-44 sm:h-52 overflow-hidden rounded-b-[188px] sm:rounded-b-[213px] pointer-events-none z-10">
                    <img 
                      src="/themes/javanese-heritage-bg.jpg" 
                      alt="Curved Floral Garland" 
                      className="w-full h-full object-cover object-bottom scale-110"
                    />
                    {/* Subtle gradient feather at top of garland */}
                    <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#faf2e6] via-[#faf2e6]/40 to-transparent" />
                  </div>

                  {/* Card Top Section: Title & Date */}
                  <div className="relative z-20 w-full flex flex-col items-center">
                    
                    {/* Event Title */}
                    <h3 
                      className="text-2xl sm:text-[28px] font-normal tracking-[0.18em] text-[#5c131c] uppercase"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {title}
                    </h3>

                    {/* Day */}
                    <p 
                      className="text-xs sm:text-[13px] tracking-[0.25em] text-[#6a1a24] font-serif uppercase font-medium mt-2"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {dayName}
                    </p>

                    {/* Big Date Number (27 for Akad, 28 for Resepsi) */}
                    <div 
                      className="text-[48px] sm:text-[56px] font-light text-[#5c131c] leading-none my-1"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {dayNum}
                    </div>

                    {/* Month & Year */}
                    <p 
                      className="text-xs sm:text-[13px] tracking-[0.22em] text-[#6a1a24] font-serif uppercase font-medium"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {monthYear}
                    </p>

                    {/* Horizontal Divider Line with Time ABOVE and Peaked Joglo House Icon strictly matching both screenshots */}
                    <div className="w-full max-w-[240px] sm:max-w-[260px] flex flex-col items-center mt-5 sm:mt-6 mb-2">
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

                  </div>

                  {/* Card Bottom Section: Location & Frosted 'LIHAT LOKASI' Button */}
                  <div className="relative z-20 w-full flex flex-col items-center mt-12 sm:mt-16 mb-4 sm:mb-6 px-4">
                    
                    <p 
                      className="text-sm sm:text-base font-serif text-[#4e1b22] font-medium tracking-wide drop-shadow-xs"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {location}
                    </p>

                    {address && address !== location && (
                      <p className="text-[11px] sm:text-xs text-[#6e2b34] font-serif leading-relaxed mt-1 max-w-[240px]">
                        {address}
                      </p>
                    )}

                    {/* Frosted Glass 'LIHAT LOKASI' Pill Button Matching Reference Images */}
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-6 py-2 rounded-full bg-[#f4e8d3]/45 hover:bg-[#f4e8d3]/70 text-[#5c131c] border border-[#c5a880]/60 backdrop-blur-[3px] text-[11px] sm:text-xs font-serif uppercase tracking-[0.22em] font-semibold transition-all shadow-[0_2px_10px_rgba(92,19,28,0.15)] hover:scale-105 active:scale-95 cursor-pointer mt-3 z-20"
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#5c131c]" />
                        <span>Lihat Lokasi</span>
                      </a>
                    )}

                  </div>

                </div>
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
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-5 py-8 sm:px-7 sm:py-10 flex flex-col text-left">
            
            {/* Header: LOVE STORY (Centered) */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.2em] text-[#5c131c] font-normal uppercase text-center mb-1.5 select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              LOVE STORY
            </h2>

            {/* Subtitle Quote (Centered) */}
            <div className="text-center text-xs sm:text-[13px] font-serif text-[#5c131c] leading-relaxed mb-6 px-2">
              <p>Setiap Kisah Cinta Itu Indah,</p>
              <p>Tapi Miliki Kamu Adalah Favoritku</p>
            </div>

            {/* Couple Window Photo */}
            <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-[#5c131c]/25 mb-8 bg-[#efe7db]">
              <img 
                src="/themes/habib-adiba-window.jpg" 
                alt="Habib & Adiba Love Story" 
                className="w-full h-full object-cover object-center scale-102"
              />
            </div>

            {/* Chapters (Left aligned) */}
            <div className="space-y-6 sm:space-y-7">
              {displayStories.map((story, i) => (
                <div key={i} className="space-y-1.5">
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
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. OUR GALLERY (Exact Recreation of User Reference Screenshot)             */}
        {/* ========================================================================= */}
        <section id="gallery-section" className="relative py-10 px-3 sm:px-6 z-10 bg-[#fbf7f0] overflow-hidden">
          
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
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-4 py-8 sm:px-6 sm:py-10 flex flex-col text-center">
            
            {/* Header: OUR GALLERY (Centered) */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.2em] text-[#5c131c] font-normal uppercase text-center mb-6 select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              OUR GALLERY
            </h2>

            {/* 2-Column Photo Grid Matching Screenshot Exactly */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
              {displayGallery.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveLightboxIdx(idx)}
                  className="aspect-[3/4.2] rounded-[18px] sm:rounded-2xl overflow-hidden shadow-sm border border-[#5c131c]/20 relative group cursor-pointer bg-[#efe7db] transition-transform duration-300 hover:scale-[1.02] active:scale-98"
                >
                  <img 
                    src={item.image_url} 
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2.5">
                    <span className="text-[11px] text-white font-serif italic line-clamp-1">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. LIVE STREAMING (Exact Recreation of User Reference Screenshot)         */}
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
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[36px] border-[1.5px] border-[#5c131c] bg-[#fbf7f0]/85 backdrop-blur-[2px] shadow-[0_4px_24px_rgba(92,19,28,0.12)] px-5 py-8 sm:px-7 sm:py-10 flex flex-col items-center text-center">
            
            {/* Header: LIVE STREAMING */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.18em] text-[#5c131c] font-normal uppercase mb-3 select-none"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              LIVE STREAMING
            </h2>

            {/* Description Text */}
            <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mb-6">
              - Kami mengundang Bapak/Ibu/Saudara/i untuk menyaksikan pernikahan kami secara virtual yang disiarkan langsung melalui media sosial di bawah ini:
            </p>

            {/* Event Date (Sunday, 28 December 2025) */}
            <h3 
              className="text-sm sm:text-base font-bold text-[#5c131c] uppercase tracking-wide font-serif mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              MINGGU, 28 DESEMBER 2025
            </h3>

            {/* Event Time */}
            <p className="text-xs sm:text-[13px] font-serif italic text-[#5c131c] mb-6 tracking-wide">
              10.00 WIB – Selesai
            </p>

            {/* Golden Pill Instagram Button (KLIK DI SINI) */}
            <a
              href={couple?.streaming_url || `https://instagram.com/${(couple?.bride_instagram || 'adibasyakilla').replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Tonton Live Streaming di Instagram"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-[#caa772] hover:bg-[#b8955f] text-white shadow-[0_4px_16px_rgba(184,150,95,0.45)] border border-[#dfbf8e] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none group"
            >
              <InstagramIcon className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] uppercase">
                KLIK DI SINI
              </span>
            </a>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. WEDDING GIFT & WISHES (Exact Recreation of User Reference Screenshots) */}
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
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-[#c5a880] bg-[#faf3e8] shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-8 sm:px-7 sm:py-9 flex flex-col items-center text-center overflow-hidden mb-8">
            
            {/* Ambient Watermark Texture & Gunungan Wayang in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
              <JavaneseGunungan className="w-64 sm:w-72 h-auto" />
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[radial-gradient(#caa772_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Title: WEDDING GIFT */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.18em] text-[#5c131c] font-normal uppercase mb-3.5 select-none relative z-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              WEDDING GIFT
            </h2>

            {/* Paragraph Text */}
            <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mx-auto mb-6 relative z-10">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami, dan jika memberi adalah ungkapan tanda kasih, Anda dapat memberi kado secara cashless.
            </p>

            {/* Golden Pill Button: ➔ KLIK DI SINI */}
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

          {/* ------------------------------------------------------------------------- */}
          {/* Card 2: WISHES                                                            */}
          {/* ------------------------------------------------------------------------- */}
          <div className="relative z-10 w-full max-w-[360px] sm:max-w-[400px] mx-auto rounded-[28px] sm:rounded-[34px] border-[2px] border-[#c5a880] bg-[#faf3e8] shadow-[0_8px_32px_rgba(0,0,0,0.4)] px-5 py-8 sm:px-7 sm:py-9 flex flex-col text-center relative overflow-hidden">
            
            {/* Ambient Watermark Texture & Gunungan Wayang in Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-20">
              <JavaneseGunungan className="w-64 sm:w-72 h-auto" />
            </div>
            <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply bg-[radial-gradient(#caa772_1px,transparent_1px)] [background-size:16px_16px]" />

            {/* Header: WISHES */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.2em] text-[#5c131c] font-normal uppercase mb-2 select-none relative z-10"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              WISHES
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed max-w-[310px] mx-auto mb-4 relative z-10">
              Berikan ucapan harapan dan do'a kepada kedua mempelai
            </p>

            {/* Comment Counter (e.g. 1 Comment) */}
            <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22]/90 mb-4 select-none relative z-10 font-medium">
              {wishes.length} {wishes.length === 1 ? 'Comment' : 'Comments'}
            </p>

            {/* Stats Summary Pills (Hadir & Tidak Hadir) */}
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

            {/* Form */}
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

            {/* Comments Feed */}
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

          </div>

        </section>

        {/* ========================================================================= */}
        {/* 9. PENUTUP & UCAPAN TERIMA KASIH (Exact User Reference Screenshot)        */}
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

          <div className="relative z-10 w-full max-w-[380px] sm:max-w-[420px] mx-auto flex flex-col items-center text-center">
            
            {/* Arch Photo Frame (Rounded Top Arch, Flat Bottom, Deep Maroon Border) */}
            <div className="relative w-[215px] sm:w-[245px] aspect-[3/4.1] rounded-t-[110px] sm:rounded-t-[125px] rounded-b-none border-[3px] border-[#5c131c] overflow-hidden shadow-[0_10px_28px_rgba(92,19,28,0.22)] bg-[#f5ebe1] mb-6">
              <img 
                src="/themes/habib-adiba-closing.jpg" 
                alt={`${groomNick} & ${brideNick}`} 
                className="w-full h-full object-cover object-[center_18%]"
              />
            </div>

            {/* Closing Thank You Text */}
            <div className="space-y-3 px-3 max-w-[320px] sm:max-w-[340px] mx-auto mb-7">
              <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed">
                Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restunya untuk pernikahan kami.
              </p>
              <p className="text-xs sm:text-[13px] font-serif text-[#4e1b22] leading-relaxed">
                Atas doa &amp; restunya, kami ucapkan terima kasih.
              </p>
            </div>

            {/* Names: HABIB & ADIBA (Strictly matching screenshot) */}
            <h2 
              className="text-2xl sm:text-[28px] tracking-[0.08em] text-[#5c131c] font-normal uppercase select-none pb-24 sm:pb-28"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {groomNick.toUpperCase()} <span className="italic font-serif font-normal">&amp;</span> {brideNick.toUpperCase()}
            </h2>

          </div>

        </section>

        {/* Lightbox Modal for Gallery */}
        {activeLightboxIdx !== null && (
          <div 
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 select-none"
            onClick={() => setActiveLightboxIdx(null)}
          >
            <button 
              className="absolute top-5 right-5 text-white/80 hover:text-white p-2"
              onClick={() => setActiveLightboxIdx(null)}
            >
              <X className="w-7 h-7" />
            </button>

            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx(prev => (prev! > 0 ? prev! - 1 : displayGallery.length - 1));
              }}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <img 
              src={displayGallery[activeLightboxIdx].image_url} 
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-2"
              onClick={(e) => {
                e.stopPropagation();
                setActiveLightboxIdx(prev => (prev! < displayGallery.length - 1 ? prev! + 1 : 0));
              }}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
