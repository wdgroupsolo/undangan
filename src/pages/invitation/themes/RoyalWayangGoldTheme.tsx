import React, { useEffect, useState } from 'react';
import { 
  MapPin, 
  Gift, 
  Check, 
  X, 
  Copy, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Heart, 
  Clock,
  Send,
  MessageCircle,
  User,
  CheckCircle2,
  Sparkles,
  Users
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { supabase } from '../../../lib/supabase';

// ==========================================
// 1. ROYAL JAVANESE SVG VECTOR ORNAMENTS
// ==========================================

// Instagram SVG Icon for Mempelai Social Links
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Top Center: Royal Javanese Mahkota / Carved Crown Crest
export const RoyalWayangCrown: React.FC<{ className?: string }> = ({ className = "w-44 h-16" }) => (
  <svg 
    viewBox="0 0 320 110" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0 4px 12px rgba(212, 175, 55, 0.45))' }}
  >
    <defs>
      <linearGradient id="goldGradRoyal" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="25%" stopColor="#E5C158" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#AA7C11" />
        <stop offset="100%" stopColor="#F9E28C" />
      </linearGradient>
      <linearGradient id="goldGlowDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#553805" stopOpacity="0.2" />
      </linearGradient>
    </defs>

    {/* Central Crown Flame / Kuncup Mahkota Keraton */}
    <path 
      d="M160 8 C164 22, 178 36, 178 48 C178 62, 168 70, 160 70 C152 70, 142 62, 142 48 C142 36, 156 22, 160 8 Z" 
      fill="url(#goldGradRoyal)" 
      stroke="#6B4B03" 
      strokeWidth="1.2"
    />
    <circle cx="160" cy="46" r="4.5" fill="#FFF7CC" stroke="#8A6305" strokeWidth="1" />

    {/* Flanking Tier 1 Spire Arches */}
    <path 
      d="M160 40 C175 25, 205 32, 212 55 C215 65, 208 78, 192 82 C178 85, 168 76, 160 70" 
      fill="none" 
      stroke="url(#goldGradRoyal)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />
    <path 
      d="M160 40 C145 25, 115 32, 108 55 C105 65, 112 78, 128 82 C142 85, 152 76, 160 70" 
      fill="none" 
      stroke="url(#goldGradRoyal)" 
      strokeWidth="2.5" 
      strokeLinecap="round"
    />

    {/* Intricate Javanese Floral Scrolls Left & Right */}
    <path 
      d="M192 78 C215 76, 245 62, 258 45 C264 36, 258 26, 246 30 C234 35, 230 48, 240 58 C250 68, 275 66, 290 80 C298 88, 292 98, 280 98 C262 98, 240 85, 222 84 C205 84, 185 92, 160 94" 
      fill="none" 
      stroke="url(#goldGradRoyal)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />
    <path 
      d="M128 78 C105 76, 75 62, 62 45 C56 36, 62 26, 74 30 C86 35, 90 48, 80 58 C70 68, 45 66, 30 80 C22 88, 28 98, 40 98 C58 98, 80 85, 98 84 C115 84, 135 92, 160 94" 
      fill="none" 
      stroke="url(#goldGradRoyal)" 
      strokeWidth="2" 
      strokeLinecap="round"
    />

    {/* Secondary filigree curls & decorative beads */}
    <circle cx="218" cy="48" r="3" fill="url(#goldGradRoyal)" />
    <circle cx="102" cy="48" r="3" fill="url(#goldGradRoyal)" />
    <circle cx="270" cy="56" r="2.5" fill="url(#goldGradRoyal)" />
    <circle cx="50" cy="56" r="2.5" fill="url(#goldGradRoyal)" />
    <circle cx="288" cy="88" r="2" fill="url(#goldGradRoyal)" />
    <circle cx="32" cy="88" r="2" fill="url(#goldGradRoyal)" />

    {/* Base Lotus Plinth Band */}
    <path 
      d="M110 94 Q160 102 210 94 Q160 90 110 94 Z" 
      fill="url(#goldGradRoyal)" 
    />
    <circle cx="160" cy="95" r="3" fill="#FFF2B2" />
  </svg>
);

// Bottom Left: Raden Kamajaya (Wayang Kulit Siluet Emas)
export const RoyalWayangKamajaya: React.FC<{ className?: string }> = ({ className = "w-28 h-48" }) => (
  <svg 
    viewBox="0 0 140 240" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0 6px 14px rgba(212, 175, 55, 0.45))' }}
  >
    <defs>
      <linearGradient id="wayangGoldLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4BD" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C59B27" />
        <stop offset="100%" stopColor="#7E5804" />
      </linearGradient>
    </defs>

    {/* Head & Gelung Supat Urang (Crown Headdress) */}
    <path 
      d="M62 25 C64 12, 78 8, 86 16 C92 23, 90 35, 78 38 C84 32, 85 24, 78 20 C72 16, 65 20, 62 25 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <path 
      d="M74 36 C82 37, 88 42, 84 50 C80 56, 70 58, 62 52 C58 48, 59 40, 66 37 C70 35, 72 36, 74 36 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    {/* Profile Face (Halus / Luruh Khas Kamajaya) */}
    <path 
      d="M64 45 L76 49 L70 55 L74 58 L66 64 L62 60 L60 52 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    {/* Long Earring & Sumping */}
    <path 
      d="M58 48 C52 44, 46 52, 50 60 C52 64, 57 65, 59 58 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Neck & Royal Kalung Ulur */}
    <path 
      d="M63 65 L66 78 C60 82, 52 80, 48 74 L52 65 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <path 
      d="M54 75 C60 90, 72 98, 84 96 C76 100, 58 98, 48 82 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Torso & Praba Wings */}
    <path 
      d="M52 80 C40 85, 28 102, 34 122 C38 136, 52 144, 60 142 C54 135, 48 120, 52 108 C54 100, 56 90, 52 80 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <path 
      d="M58 88 L72 92 L76 120 L58 124 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Front Arm & Gesture (Driji Nuding Nyempurit) */}
    <path 
      d="M70 92 C82 98, 98 105, 108 118 C115 128, 122 136, 128 132 C132 128, 126 120, 118 112 C106 100, 92 90, 78 88 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <circle cx="108" cy="116" r="3" fill="#FFEAA0" />
    <path 
      d="M124 132 L134 140 L130 144 L120 136 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Back Arm / Tangan Mburi */}
    <path 
      d="M48 90 C36 100, 24 115, 18 132 C14 145, 18 152, 22 148 C25 142, 28 130, 36 118 L46 106 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Keris Gayaman at the Back Waist */}
    <path 
      d="M48 122 L32 110 L28 114 L42 128 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <path 
      d="M32 110 L20 98 L24 94 L36 106 Z" 
      fill="#FFF3B8" 
    />

    {/* Jarik Batik / Dodot Kampuh with Symmetrical Drapery */}
    <path 
      d="M54 122 C68 126, 85 130, 88 148 C90 165, 82 188, 76 210 L52 215 C58 190, 62 165, 58 150 C54 138, 50 128, 54 122 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    {/* Uncal Kencana Ribbons & Sumping Kain */}
    <path 
      d="M70 142 C74 165, 85 190, 96 218 C88 218, 76 195, 70 170 C66 155, 66 145, 70 142 Z" 
      fill="#FFE58F" 
    />
    <path 
      d="M54 145 C48 165, 38 190, 28 215 C36 212, 48 190, 52 168 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Lower Feet (Kaki Jangkah Nyatriya) */}
    <path 
      d="M74 210 L84 235 L96 235 L88 210 Z" 
      fill="url(#wayangGoldLeft)" 
    />
    <path 
      d="M52 212 L44 232 L34 232 L46 210 Z" 
      fill="url(#wayangGoldLeft)" 
    />

    {/* Traditional Wayang Cempurit (Control Rod Base) */}
    <line x1="68" y1="50" x2="68" y2="238" stroke="url(#wayangGoldLeft)" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// Bottom Right: Dewi Kamaratih (Wayang Kulit Siluet Emas)
export const RoyalWayangKamaratih: React.FC<{ className?: string }> = ({ className = "w-28 h-48" }) => (
  <svg 
    viewBox="0 0 140 240" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0 6px 14px rgba(212, 175, 55, 0.45))' }}
  >
    <defs>
      <linearGradient id="wayangGoldRight" x1="100%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFF4BD" />
        <stop offset="35%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#C59B27" />
        <stop offset="100%" stopColor="#7E5804" />
      </linearGradient>
    </defs>

    {/* Graceful Sanggul Gelung Putri & Jamang Mahkota */}
    <path 
      d="M78 22 C76 10, 62 6, 54 14 C48 21, 50 33, 62 36 C56 30, 55 22, 62 18 C68 14, 75 18, 78 22 Z" 
      fill="url(#wayangGoldRight)" 
    />
    <path 
      d="M66 34 C58 35, 52 40, 56 48 C60 54, 70 56, 78 50 C82 46, 81 38, 74 35 C70 33, 68 34, 66 34 Z" 
      fill="url(#wayangGoldRight)" 
    />
    {/* Gentle Smiling Female Face Profile */}
    <path 
      d="M76 43 L64 47 L70 53 L66 56 L74 62 L78 58 L80 50 Z" 
      fill="url(#wayangGoldRight)" 
    />
    {/* Elegant Dangling Sumping Earring */}
    <path 
      d="M82 46 C88 42, 94 50, 90 58 C88 62, 83 63, 81 56 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Slender Neck & Royal Kalung Susun */}
    <path 
      d="M77 63 L74 76 C80 80, 88 78, 92 72 L88 63 Z" 
      fill="url(#wayangGoldRight)" 
    />
    <path 
      d="M86 73 C80 88, 68 96, 56 94 C64 98, 82 96, 92 80 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Kemben Bodice & Subtle Slender Waist */}
    <path 
      d="M82 86 C88 94, 94 110, 90 128 C86 138, 76 142, 70 140 C75 132, 78 118, 76 106 C74 98, 74 90, 82 86 Z" 
      fill="url(#wayangGoldRight)" 
    />
    <path 
      d="M82 86 L68 90 L64 118 L82 122 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Graceful Front Arm & Delicate Hand Gesture */}
    <path 
      d="M70 90 C58 96, 42 103, 32 116 C25 126, 18 134, 12 130 C8 126, 14 118, 22 110 C34 98, 48 88, 62 86 Z" 
      fill="url(#wayangGoldRight)" 
    />
    <circle cx="32" cy="114" r="3" fill="#FFEAA0" />
    <path 
      d="M16 130 L6 138 L10 142 L20 134 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Back Hand Clasping Kemben Fabric */}
    <path 
      d="M92 88 C104 98, 116 113, 122 130 C126 143, 122 150, 118 146 C115 140, 112 128, 104 116 L94 104 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Long Flowing Royal Jarik Batik with Gold Pleats (Kain Wiron) */}
    <path 
      d="M86 120 C72 124, 55 128, 52 146 C50 163, 58 186, 64 208 L88 213 C82 188, 78 163, 82 148 C86 136, 90 126, 86 120 Z" 
      fill="url(#wayangGoldRight)" 
    />
    {/* Flowing Gold Shawl / Sampur Sutra Emas */}
    <path 
      d="M70 140 C66 163, 55 188, 44 216 C52 216, 64 193, 70 168 C74 153, 74 143, 70 140 Z" 
      fill="#FFE58F" 
    />
    <path 
      d="M86 143 C92 163, 102 188, 112 213 C104 210, 92 188, 88 166 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Feet / Langkah Anggun Putri */}
    <path 
      d="M66 208 L56 233 L44 233 L52 208 Z" 
      fill="url(#wayangGoldRight)" 
    />
    <path 
      d="M88 210 L96 230 L106 230 L94 208 Z" 
      fill="url(#wayangGoldRight)" 
    />

    {/* Traditional Wayang Cempurit Control Rod */}
    <line x1="72" y1="48" x2="72" y2="236" stroke="url(#wayangGoldRight)" strokeWidth="1.5" opacity="0.6" />
  </svg>
);

// Left & Right Symmetrical Vertical Gold Floral Garlands
export const RoyalGoldenBorderFloral: React.FC<{ side: 'left' | 'right'; className?: string }> = ({ side, className = "w-16 h-full" }) => (
  <div className={`${className} pointer-events-none select-none ${side === 'right' ? '-scale-x-100' : ''}`}>
    <svg 
      viewBox="0 0 70 650" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="w-full h-full object-cover"
      style={{ filter: 'drop-shadow(0 4px 10px rgba(212, 175, 55, 0.4))' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="goldFloralGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF7D1" />
          <stop offset="30%" stopColor="#ECC460" />
          <stop offset="60%" stopColor="#C49B28" />
          <stop offset="100%" stopColor="#875E06" />
        </linearGradient>
      </defs>

      {/* Top Floral Cluster */}
      <g transform="translate(10, 20)">
        <circle cx="25" cy="25" r="14" fill="url(#goldFloralGrad)" opacity="0.9" />
        <circle cx="25" cy="25" r="6" fill="#FFFBE6" />
        {/* Petals */}
        <path d="M25 5 C32 15, 32 25, 25 25 C18 25, 18 15, 25 5 Z" fill="url(#goldFloralGrad)" />
        <path d="M45 25 C35 32, 25 32, 25 25 C25 18, 35 18, 45 25 Z" fill="url(#goldFloralGrad)" />
        <path d="M25 45 C18 35, 18 25, 25 25 C32 25, 32 35, 25 45 Z" fill="url(#goldFloralGrad)" />
        <path d="M5 25 C15 18, 25 18, 25 25 C25 32, 15 32, 5 25 Z" fill="url(#goldFloralGrad)" />
        {/* Leaves */}
        <path d="M12 8 C6 2, 2 12, 14 18 C18 16, 16 10, 12 8 Z" fill="url(#goldFloralGrad)" opacity="0.8" />
        <path d="M38 8 C44 2, 48 12, 36 18 C32 16, 34 10, 38 8 Z" fill="url(#goldFloralGrad)" opacity="0.8" />
      </g>

      {/* Vertical Connecting Vines & Leaves */}
      <path 
        d="M35 65 Q15 140 38 210 Q60 280 25 350 Q-5 420 32 490 Q65 560 25 630" 
        stroke="url(#goldFloralGrad)" 
        strokeWidth="2.8" 
        fill="none" 
        strokeLinecap="round"
      />

      {/* Mid Blossom 1 */}
      <g transform="translate(14, 180)">
        <circle cx="20" cy="20" r="11" fill="url(#goldFloralGrad)" />
        <circle cx="20" cy="20" r="4.5" fill="#FFFBE6" />
        <path d="M20 5 C26 12, 26 20, 20 20 C14 20, 14 12, 20 5 Z" fill="url(#goldFloralGrad)" />
        <path d="M35 20 C28 26, 20 26, 20 20 C20 14, 28 14, 35 20 Z" fill="url(#goldFloralGrad)" />
        <path d="M20 35 C14 28, 14 20, 20 20 C26 20, 26 28, 20 35 Z" fill="url(#goldFloralGrad)" />
        <path d="M5 20 C12 14, 20 14, 20 20 C20 26, 12 26, 5 20 Z" fill="url(#goldFloralGrad)" />
      </g>

      {/* Mid Blossom 2 */}
      <g transform="translate(8, 330)">
        <circle cx="22" cy="22" r="13" fill="url(#goldFloralGrad)" />
        <circle cx="22" cy="22" r="5" fill="#FFFBE6" />
        <path d="M22 4 C29 13, 29 22, 22 22 C15 22, 15 13, 22 4 Z" fill="url(#goldFloralGrad)" />
        <path d="M40 22 C31 29, 22 29, 22 22 C22 15, 31 15, 40 22 Z" fill="url(#goldFloralGrad)" />
        <path d="M22 40 C15 31, 15 22, 22 22 C29 22, 29 31, 22 40 Z" fill="url(#goldFloralGrad)" />
        <path d="M4 22 C13 15, 22 15, 22 22 C22 29, 13 29, 4 22 Z" fill="url(#goldFloralGrad)" />
      </g>

      {/* Bottom Flourish Clusters */}
      <g transform="translate(10, 480)">
        <circle cx="24" cy="24" r="12" fill="url(#goldFloralGrad)" />
        <circle cx="24" cy="24" r="5" fill="#FFFBE6" />
        <path d="M24 6 C30 14, 30 24, 24 24 C18 24, 18 14, 24 6 Z" fill="url(#goldFloralGrad)" />
        <path d="M42 24 C34 30, 24 30, 24 24 C24 18, 34 18, 42 24 Z" fill="url(#goldFloralGrad)" />
        <path d="M24 42 C18 34, 18 24, 24 24 C30 24, 30 34, 24 42 Z" fill="url(#goldFloralGrad)" />
        <path d="M6 24 C14 18, 24 18, 24 24 C24 30, 14 30, 6 24 Z" fill="url(#goldFloralGrad)" />
      </g>

      {/* Decorative Bud Sprigs along the Vine */}
      <circle cx="36" cy="115" r="4.5" fill="url(#goldFloralGrad)" />
      <circle cx="20" cy="155" r="4" fill="url(#goldFloralGrad)" />
      <circle cx="48" cy="260" r="4.5" fill="url(#goldFloralGrad)" />
      <circle cx="16" cy="405" r="4" fill="url(#goldFloralGrad)" />
      <circle cx="45" cy="540" r="4.5" fill="url(#goldFloralGrad)" />
      <circle cx="22" cy="595" r="4" fill="url(#goldFloralGrad)" />
    </svg>
  </div>
);

// Inner Frame Filigree Corner
export const RoyalGoldCorner: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg 
    viewBox="0 0 32 32" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0 2px 6px rgba(212, 175, 55, 0.4))' }}
  >
    <path d="M2 2 L2 24" stroke="#E5C158" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 2 L24 2" stroke="#E5C158" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6 L6 18" stroke="#AA7C11" strokeWidth="1" strokeLinecap="round" />
    <path d="M6 6 L18 6" stroke="#AA7C11" strokeWidth="1" strokeLinecap="round" />
    <circle cx="10" cy="10" r="2" fill="#FFEAA0" />
    <path d="M2 2 Q14 14 26 26" stroke="#E5C158" strokeWidth="0.8" opacity="0.6" />
  </svg>
);

// Top Corner Floral Bouquets (Lush Gold & Black Leaf Clusters matching Reference Screenshot 2)
export const RoyalTopCornerFloral: React.FC<{ side: 'left' | 'right'; className?: string }> = ({ 
  side, 
  className = "w-28 sm:w-36 h-28 sm:h-36" 
}) => {
  const isRight = side === 'right';
  return (
    <div className={`${className} pointer-events-none select-none ${isRight ? '-scale-x-100' : ''}`}>
      <svg 
        viewBox="0 0 140 140" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 6px 14px rgba(0, 0, 0, 0.7))' }}
      >
        <defs>
          <linearGradient id={`goldCornerGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4BD" />
            <stop offset="30%" stopColor="#E5C158" />
            <stop offset="65%" stopColor="#C49B28" />
            <stop offset="100%" stopColor="#6E4C03" />
          </linearGradient>
          <radialGradient id={`petalRadial_${side}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFDE6" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#4A3405" />
            <stop offset="100%" stopColor="#1E1402" />
          </radialGradient>
        </defs>

        {/* Outer Dark Leaves spreading along top and left edges */}
        <path d="M0 0 C35 8, 75 22, 105 55 C82 58, 62 48, 48 35 C28 22, 12 12, 0 0 Z" fill="#201810" stroke={`url(#goldCornerGrad_${side})`} strokeWidth="1.2" />
        <path d="M0 0 C8 35, 22 75, 55 105 C58 82, 48 62, 35 48 C22 28, 12 12, 0 0 Z" fill="#201810" stroke={`url(#goldCornerGrad_${side})`} strokeWidth="1.2" />

        {/* Secondary Gold Leaves */}
        <path d="M8 8 C42 22, 85 45, 115 88 C94 85, 74 72, 60 55 C40 38, 22 22, 8 8 Z" fill={`url(#petalRadial_${side})`} stroke="#E5C158" strokeWidth="1.5" />
        <path d="M8 8 C22 42, 45 85, 88 115 C85 94, 72 74, 55 60 C38 40, 22 22, 8 8 Z" fill={`url(#petalRadial_${side})`} stroke="#E5C158" strokeWidth="1.5" />

        {/* Central Prominent Blossom Petal Pointing Diagonally */}
        <path d="M0 0 C38 38, 78 78, 124 124 C104 102, 78 72, 0 0 Z" fill={`url(#goldCornerGrad_${side})`} />
        
        {/* Veins & Filigree Curls */}
        <path d="M12 12 Q50 48 95 90" stroke="#FFF7D6" strokeWidth="1.5" strokeLinecap="round" opacity="0.85" />
        <path d="M42 42 Q65 35 82 45" stroke="#FFF7D6" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
        <path d="M42 42 Q35 65 45 82" stroke="#FFF7D6" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* Golden Stamens and Decorative Droplets */}
        <circle cx="36" cy="36" r="5" fill="#FFFBE6" stroke="#9C7718" strokeWidth="1.2" />
        <circle cx="58" cy="46" r="3.5" fill="#FFF2B2" />
        <circle cx="46" cy="58" r="3.5" fill="#FFF2B2" />
        <circle cx="82" cy="70" r="3" fill="#E5C158" />
        <circle cx="70" cy="82" r="3" fill="#E5C158" />
      </svg>
    </div>
  );
};

// Drifting Golden Sparkles Background Particles
export const GoldenSparkleDust: React.FC = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
    <div className="absolute top-[12%] left-[18%] w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping opacity-75" style={{ animationDuration: '3.2s' }} />
    <div className="absolute top-[28%] right-[22%] w-2 h-2 rounded-full bg-yellow-200 animate-pulse opacity-85" style={{ animationDuration: '2.5s' }} />
    <div className="absolute top-[52%] left-[14%] w-1 h-1 rounded-full bg-amber-200 animate-ping opacity-60" style={{ animationDuration: '4s' }} />
    <div className="absolute top-[70%] right-[16%] w-2 h-2 rounded-full bg-yellow-300 animate-pulse opacity-90" style={{ animationDuration: '3s' }} />
    <div className="absolute top-[85%] left-[30%] w-1.5 h-1.5 rounded-full bg-amber-100 animate-ping opacity-70" style={{ animationDuration: '3.6s' }} />
  </div>
);

// Symmetrical Royal Javanese Arched Tassel Poles (Lengkung Janur Ronce Melati Kencana)
export const RoyalGoldenArchTassel: React.FC<{ side: 'left' | 'right'; className?: string }> = ({ 
  side, 
  className = "w-28 sm:w-36 h-48 sm:h-64" 
}) => {
  const isRight = side === 'right';
  return (
    <div 
      className={`${className} pointer-events-none select-none ${isRight ? '-scale-x-100' : ''}`}
      style={{ filter: 'drop-shadow(0 6px 14px rgba(212, 175, 55, 0.45))' }}
    >
      <svg 
        viewBox="0 0 160 260" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-full h-full"
      >
        <defs>
          <linearGradient id={`goldArchGrad_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="25%" stopColor="#E5C158" />
            <stop offset="55%" stopColor="#D4AF37" />
            <stop offset="85%" stopColor="#8C6307" />
            <stop offset="100%" stopColor="#F9E28C" />
          </linearGradient>
          <radialGradient id={`glowSphere_${side}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#7E5804" />
          </radialGradient>
        </defs>

        {/* 1. Main Golden Sweeping Arch Pole */}
        <path 
          d="M18 255 C16 195, 24 135, 52 82 C72 45, 105 20, 138 35 C156 44, 158 66, 144 80 C130 92, 114 84, 118 70 C122 58, 135 62, 136 68" 
          stroke={`url(#goldArchGrad_${side})`} 
          strokeWidth="8" 
          strokeLinecap="round" 
          fill="none" 
        />
        <path 
          d="M18 255 C16 195, 24 135, 52 82 C72 45, 105 20, 138 35 C156 44, 158 66, 144 80 C130 92, 114 84, 118 70 C122 58, 135 62, 136 68" 
          stroke="#FFFDF0" 
          strokeWidth="2" 
          strokeLinecap="round" 
          fill="none" 
          opacity="0.75" 
        />

        {/* 2. Outer Ornamental Flame / Scalloped Crests along the arch spine */}
        <path 
          d="M32 205 C26 198, 28 186, 38 188 C40 178, 48 174, 46 166 C42 155, 48 145, 56 148 C58 138, 68 132, 68 122 C66 110, 78 102, 86 108 C90 96, 104 90, 106 80 C108 70, 122 65, 128 72" 
          fill={`url(#goldArchGrad_${side})`} 
          stroke="#684A05" 
          strokeWidth="0.8" 
        />
        {/* Decorative beads along outer spine */}
        <circle cx="28" cy="195" r="3" fill="#FFF9E0" />
        <circle cx="42" cy="155" r="3.5" fill="#FFF9E0" />
        <circle cx="62" cy="118" r="4" fill="#FFF9E0" />
        <circle cx="92" cy="80" r="4" fill="#FFF9E0" />
        <circle cx="126" cy="50" r="4.5" fill="#FFF9E0" />

        {/* 3. Hanging Chain of Pearl / Ronce Melati Beads */}
        <g transform="translate(0, 0)">
          <line x1="128" y1="86" x2="128" y2="135" stroke={`url(#goldArchGrad_${side})`} strokeWidth="1.5" strokeDasharray="2 3" />
          <circle cx="128" cy="94" r="2.5" fill={`url(#glowSphere_${side})`} />
          <circle cx="128" cy="106" r="3" fill={`url(#glowSphere_${side})`} />
          <circle cx="128" cy="118" r="3.5" fill={`url(#glowSphere_${side})`} />
          <circle cx="128" cy="130" r="4" fill={`url(#glowSphere_${side})`} />

          {/* Golden Flower Medallion / Rosette */}
          <g transform="translate(128, 142)">
            <circle cx="0" cy="0" r="9" fill={`url(#goldArchGrad_${side})`} stroke="#6E4D04" strokeWidth="0.8" />
            <path d="M0 -11 C3 -7, 3 -3, 0 0 C-3 -3, -3 -7, 0 -11 Z" fill="#FFF4BD" />
            <path d="M11 0 C7 3, 3 3, 0 0 C3 -3, 7 -3, 11 0 Z" fill="#FFF4BD" />
            <path d="M0 11 C-3 7, -3 3, 0 0 C3 3, 3 7, 0 11 Z" fill="#FFF4BD" />
            <path d="M-11 0 C-7 -3, -3 -3, 0 0 C-3 3, -7 3, -11 0 Z" fill="#FFF4BD" />
            <path d="M7 -7 C6 -4, 4 -2, 0 0 C2 -4, 4 -6, 7 -7 Z" fill="#E5C158" />
            <path d="M7 7 C4 6, 2 4, 0 0 C4 2, 6 4, 7 7 Z" fill="#E5C158" />
            <path d="M-7 7 C-4 6, -2 4, 0 0 C-4 2, -6 4, -7 7 Z" fill="#E5C158" />
            <path d="M-7 -7 C-6 -4, -4 -2, 0 0 C-2 -4, -4 -6, -7 -7 Z" fill="#E5C158" />
            <circle cx="0" cy="0" r="4" fill="#FFFFFF" stroke="#8C6307" strokeWidth="0.8" />
          </g>

          {/* Hanging Golden Tassel / Rumbai Kencana */}
          <g transform="translate(128, 154)">
            <path d="M-6 0 C-6 -3, 6 -3, 6 0 L8 8 C8 10, -8 10, -8 8 Z" fill={`url(#goldArchGrad_${side})`} stroke="#5B3F02" strokeWidth="0.8" />
            <circle cx="0" cy="4" r="2" fill="#FFFDF0" />

            <path 
              d="M-8 8 L-16 48 C-10 52, 10 52, 16 48 L8 8 Z" 
              fill={`url(#goldArchGrad_${side})`} 
              stroke="#684A05" 
              strokeWidth="0.8" 
            />
            <line x1="-12" y1="12" x2="-14" y2="47" stroke="#FFF7D6" strokeWidth="0.9" opacity="0.8" />
            <line x1="-8" y1="10" x2="-9" y2="48" stroke="#FFE999" strokeWidth="0.8" />
            <line x1="-4" y1="10" x2="-4" y2="49" stroke="#FFF7D6" strokeWidth="0.9" opacity="0.8" />
            <line x1="0" y1="10" x2="0" y2="50" stroke="#FFFDF0" strokeWidth="1.1" />
            <line x1="4" y1="10" x2="4" y2="49" stroke="#FFF7D6" strokeWidth="0.9" opacity="0.8" />
            <line x1="8" y1="10" x2="9" y2="48" stroke="#FFE999" strokeWidth="0.8" />
            <line x1="12" y1="12" x2="14" y2="47" stroke="#FFF7D6" strokeWidth="0.9" opacity="0.8" />
          </g>
        </g>
      </svg>
    </div>
  );
};

// Flying Birds Silhouettes in Formation
export const FlyingBirdsSilhouettes: React.FC<{ className?: string }> = ({ className = "w-28 sm:w-36 h-12" }) => (
  <svg viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} opacity="0.8">
    <path d="M22 28 Q26 23 30 26 Q34 23 38 28 Q34 25 30 27 Q26 25 22 28 Z" fill="#D4AF37" opacity="0.85" />
    <path d="M48 20 Q52 15 56 18 Q60 15 64 20 Q60 17 56 19 Q52 17 48 20 Z" fill="#ECC460" opacity="0.9" />
    <path d="M72 14 Q75 10 78 12 Q81 10 84 14 Q81 11 78 13 Q75 11 72 14 Z" fill="#FFF2B2" opacity="0.95" />
    <path d="M96 22 Q99 18 102 20 Q105 18 108 22 Q105 19 102 21 Q99 19 96 22 Z" fill="#ECC460" opacity="0.8" />
    <path d="M118 32 Q121 28 124 30 Q127 28 130 32 Q127 29 124 31 Q121 29 118 32 Z" fill="#D4AF37" opacity="0.75" />
    <path d="M60 36 Q63 32 66 34 Q69 32 72 36 Q69 33 66 35 Q63 33 60 36 Z" fill="#AA7C11" opacity="0.7" />
  </svg>
);

// Ornate Gold Baroque Crest for Top of Event Capsule Card
export const RoyalCapsuleCrestTop: React.FC<{ className?: string }> = ({ className = "w-32 h-10" }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="crestGoldGradTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="30%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#B38728" />
        <stop offset="100%" stopColor="#7E5804" />
      </linearGradient>
    </defs>
    <path 
      d="M100 6 C105 16, 115 22, 118 32 C118 42, 110 48, 100 48 C90 48, 82 42, 82 32 C85 22, 95 16, 100 6 Z" 
      fill="url(#crestGoldGradTop)" 
      stroke="#5A3E05" 
      strokeWidth="0.8" 
    />
    <circle cx="100" cy="30" r="3" fill="#FFF9DF" />
    <path 
      d="M100 28 C85 18, 65 20, 50 34 C42 42, 46 50, 56 48 C66 46, 74 38, 88 44 C95 47, 98 48, 100 48" 
      fill="none" 
      stroke="url(#crestGoldGradTop)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <path 
      d="M50 34 C35 32, 18 40, 10 50 C22 50, 32 44, 46 48" 
      fill="none" 
      stroke="url(#crestGoldGradTop)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M100 28 C115 18, 135 20, 150 34 C158 42, 154 50, 144 48 C134 46, 126 38, 112 44 C105 47, 102 48, 100 48" 
      fill="none" 
      stroke="url(#crestGoldGradTop)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <path 
      d="M150 34 C165 32, 182 40, 190 50 C178 50, 168 44, 154 48" 
      fill="none" 
      stroke="url(#crestGoldGradTop)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <circle cx="70" cy="28" r="2" fill="#FFF2B2" />
    <circle cx="130" cy="28" r="2" fill="#FFF2B2" />
    <circle cx="36" cy="38" r="1.8" fill="#FFF2B2" />
    <circle cx="164" cy="38" r="1.8" fill="#FFF2B2" />
  </svg>
);

// Matching Ornate Gold Baroque Crest for Bottom of Event Capsule Card
export const RoyalCapsuleCrestBottom: React.FC<{ className?: string }> = ({ className = "w-32 h-10" }) => (
  <svg viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="crestGoldGradBottom" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFF2B2" />
        <stop offset="30%" stopColor="#E5C158" />
        <stop offset="70%" stopColor="#B38728" />
        <stop offset="100%" stopColor="#7E5804" />
      </linearGradient>
    </defs>
    <path 
      d="M100 54 C105 44, 115 38, 118 28 C118 18, 110 12, 100 12 C90 12, 82 18, 82 28 C85 38, 95 44, 100 54 Z" 
      fill="url(#crestGoldGradBottom)" 
      stroke="#5A3E05" 
      strokeWidth="0.8" 
    />
    <circle cx="100" cy="30" r="3" fill="#FFF9DF" />
    <path 
      d="M100 32 C85 42, 65 40, 50 26 C42 18, 46 10, 56 12 C66 14, 74 22, 88 16 C95 13, 98 12, 100 12" 
      fill="none" 
      stroke="url(#crestGoldGradBottom)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <path 
      d="M50 26 C35 28, 18 20, 10 10 C22 10, 32 16, 46 12" 
      fill="none" 
      stroke="url(#crestGoldGradBottom)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <path 
      d="M100 32 C115 42, 135 40, 150 26 C158 18, 154 10, 144 12 C134 14, 126 22, 112 16 C105 13, 102 12, 100 12" 
      fill="none" 
      stroke="url(#crestGoldGradBottom)" 
      strokeWidth="2" 
      strokeLinecap="round" 
    />
    <path 
      d="M150 26 C165 28, 182 20, 190 10 C178 10, 168 16, 154 12" 
      fill="none" 
      stroke="url(#crestGoldGradBottom)" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
    />
    <circle cx="70" cy="32" r="2" fill="#FFF2B2" />
    <circle cx="130" cy="32" r="2" fill="#FFF2B2" />
    <circle cx="36" cy="22" r="1.8" fill="#FFF2B2" />
    <circle cx="164" cy="22" r="1.8" fill="#FFF2B2" />
  </svg>
);

// Traditional Joglo Pendopo Roofline Silhouette for Card Watermark
export const RoyalJogloLineWatermark: React.FC<{ className?: string }> = ({ className = "w-64 h-64" }) => (
  <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M106 30 L134 30 L138 36 L102 36 Z" stroke="#8C6F3D" strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="120" cy="25" r="2" fill="#8C6F3D" />
    <path d="M102 36 L72 90 L168 90 L138 36 Z" stroke="#8C6F3D" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="110" y1="36" x2="94" y2="90" stroke="#8C6F3D" strokeWidth="0.8" opacity="0.6" />
    <line x1="120" y1="36" x2="120" y2="90" stroke="#8C6F3D" strokeWidth="0.8" opacity="0.6" />
    <line x1="130" y1="36" x2="146" y2="90" stroke="#8C6F3D" strokeWidth="0.8" opacity="0.6" />
    <path d="M72 90 L30 135 L210 135 L168 90 Z" stroke="#8C6F3D" strokeWidth="1.2" strokeLinejoin="round" />
    <line x1="50" y1="112" x2="190" y2="112" stroke="#8C6F3D" strokeWidth="0.8" opacity="0.5" />
    <path d="M30 135 L18 152 L222 152 L210 135 Z" stroke="#8C6F3D" strokeWidth="1" strokeLinejoin="round" />
    <path d="M26 152 C26 160, 24 168, 22 174" stroke="#8C6F3D" strokeWidth="0.9" strokeLinecap="round" />
    <path d="M214 152 C214 160, 216 168, 218 174" stroke="#8C6F3D" strokeWidth="0.9" strokeLinecap="round" />
    <line x1="58" y1="152" x2="58" y2="215" stroke="#8C6F3D" strokeWidth="1.5" />
    <line x1="94" y1="152" x2="94" y2="215" stroke="#8C6F3D" strokeWidth="1.8" />
    <line x1="146" y1="152" x2="146" y2="215" stroke="#8C6F3D" strokeWidth="1.8" />
    <line x1="182" y1="152" x2="182" y2="215" stroke="#8C6F3D" strokeWidth="1.5" />
    <rect x="44" y="215" width="152" height="6" stroke="#8C6F3D" strokeWidth="1" />
    <rect x="36" y="221" width="168" height="6" stroke="#8C6F3D" strokeWidth="1" />
  </svg>
);

// Delicate Side Floral Vine Accents Hugging the Capsule Card Borders
export const RoyalCapsuleFloralBorder: React.FC<{ className?: string; flip?: boolean }> = ({ className = "w-4 h-64", flip = false }) => (
  <svg 
    viewBox="0 0 30 200" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${flip ? '-scale-x-100' : ''}`}
  >
    <path d="M6 10 C16 35, 20 70, 18 100 C16 135, 20 170, 6 190" stroke="#7A6345" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
    <path d="M12 30 C20 26, 26 34, 16 40 Z" fill="#8C7450" opacity="0.6" />
    <path d="M8 65 C16 60, 22 68, 14 74 Z" fill="#8C7450" opacity="0.6" />
    <path d="M16 100 C24 96, 28 104, 18 110 Z" fill="#8C7450" opacity="0.6" />
    <path d="M10 135 C18 130, 24 138, 16 144 Z" fill="#8C7450" opacity="0.6" />
    <path d="M14 170 C22 165, 26 172, 17 178 Z" fill="#8C7450" opacity="0.6" />
  </svg>
);

// Ornate Baroque Gold Arch Frame with Rope Relief and Acanthus Scrolls
export const RoyalBaroqueGoldFrame: React.FC<{ className?: string }> = ({ className = "w-full h-full" }) => (
  <svg 
    viewBox="0 0 380 540" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    style={{ filter: 'drop-shadow(0 10px 30px rgba(0, 0, 0, 0.9))' }}
  >
    <defs>
      <linearGradient id="goldBaroque1" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF7D6" />
        <stop offset="25%" stopColor="#E5C158" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="75%" stopColor="#8A6305" />
        <stop offset="100%" stopColor="#F9E28C" />
      </linearGradient>
      <linearGradient id="goldBaroqueBorder" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFEAA0" />
        <stop offset="50%" stopColor="#D4AF37" />
        <stop offset="100%" stopColor="#684A05" />
      </linearGradient>
    </defs>

    {/* Top Crest Baroque Crown Cartouche */}
    <g transform="translate(190, 24)">
      {/* Central Shell / Acanthus Palmette */}
      <path d="M0 -16 C14 -8, 20 8, 16 18 C10 24, -10 24, -16 18 C-20 8, -14 -8, 0 -16 Z" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="1" />
      <path d="M0 -16 C8 -6, 10 6, 0 16 C-10 6, -8 -6, 0 -16 Z" fill="#FFFBE6" opacity="0.6" />
      {/* Flanking Rococo Volutes */}
      <path d="M12 8 C28 -4, 50 4, 42 24 C36 32, 20 28, 16 20" fill="none" stroke="url(#goldBaroque1)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M-12 8 C-28 -4, -50 4, -42 24 C-36 32, -20 28, -16 20" fill="none" stroke="url(#goldBaroque1)" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="38" cy="20" r="3.5" fill="#FFF7D6" />
      <circle cx="-38" cy="20" r="3.5" fill="#FFF7D6" />
    </g>

    {/* Main Outer Arch & Pillars Border (R=155) */}
    <path 
      d="M32 505 L32 180 C32 92.7, 102.7 22, 190 22 C277.3 22, 348 92.7, 348 180 L348 505 Z" 
      fill="none" 
      stroke="url(#goldBaroque1)" 
      strokeWidth="6.5" 
      strokeLinejoin="round" 
    />
    {/* Inner Braided Rope Relief Accent */}
    <path 
      d="M42 496 L42 180 C42 98.2, 108.2 32, 190 32 C271.8 32, 338 98.2, 338 180 L338 496 Z" 
      fill="none" 
      stroke="#5A3E05" 
      strokeWidth="3.5" 
    />
    <path 
      d="M42 496 L42 180 C42 98.2, 108.2 32, 190 32 C271.8 32, 338 98.2, 338 180 L338 496 Z" 
      fill="none" 
      stroke="url(#goldBaroque1)" 
      strokeWidth="2.5" 
      strokeDasharray="4 3" 
    />

    {/* Acanthus Corner Flourishes Top-Left */}
    <g transform="translate(32, 75)">
      <path d="M0 0 C-20 -18, -16 -50, 14 -46 C24 -44, 22 -28, 12 -22 C-2 -18, 6 -6, 0 0 Z" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="0.8" />
      <circle cx="-8" cy="-30" r="3" fill="#FFFBE6" />
    </g>
    {/* Acanthus Corner Flourishes Top-Right */}
    <g transform="translate(348, 75) scale(-1, 1)">
      <path d="M0 0 C-20 -18, -16 -50, 14 -46 C24 -44, 22 -28, 12 -22 C-2 -18, 6 -6, 0 0 Z" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="0.8" />
      <circle cx="-8" cy="-30" r="3" fill="#FFFBE6" />
    </g>

    {/* Mid Arch Rosette Medallions Left & Right */}
    <g transform="translate(20, 240)">
      <circle cx="0" cy="0" r="9" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="1" />
      <circle cx="0" cy="0" r="4" fill="#FFFBE6" />
    </g>
    <g transform="translate(360, 240)">
      <circle cx="0" cy="0" r="9" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="1" />
      <circle cx="0" cy="0" r="4" fill="#FFFBE6" />
    </g>

    {/* Bottom Base Plinth Corner Flourishes Left */}
    <g transform="translate(32, 505)">
      <path d="M-12 16 C-24 10, -28 -10, -6 -14 C12 -16, 12 6, 0 12 Z" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="0.8" />
      <circle cx="-14" cy="2" r="3.5" fill="#FFFBE6" />
      <path d="M-18 16 L28 16" stroke="url(#goldBaroque1)" strokeWidth="3" strokeLinecap="round" />
    </g>
    {/* Bottom Base Plinth Corner Flourishes Right */}
    <g transform="translate(348, 505) scale(-1, 1)">
      <path d="M-12 16 C-24 10, -28 -10, -6 -14 C12 -16, 12 6, 0 12 Z" fill="url(#goldBaroque1)" stroke="#5A3E05" strokeWidth="0.8" />
      <circle cx="-14" cy="2" r="3.5" fill="#FFFBE6" />
      <path d="M-18 16 L28 16" stroke="url(#goldBaroque1)" strokeWidth="3" strokeLinecap="round" />
    </g>

    {/* Bottom Base Plinth Connecting Bar */}
    <line x1="20" y1="520" x2="360" y2="520" stroke="url(#goldBaroque1)" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="190" cy="520" r="5" fill="#FFFBE6" stroke="#684A05" strokeWidth="1.2" />
  </svg>
);

// ==========================================
// 2. MAIN THEME PROPS & COMPONENT
// ==========================================

export interface RoyalWayangGoldThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories?: any[];
  gallery?: any[];
  gifts?: any[];
  music?: any;
  isOpening?: boolean;
}

export const RoyalWayangGoldTheme: React.FC<RoyalWayangGoldThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  isOpening = false,
}) => {
  const toast = useToast();
  const isDirectOpened = typeof window !== 'undefined' && (
    window.location.search.includes('opened=true') ||
    !window.location.pathname.includes('/invitation/')
  );
  const [hasTriggeredEntrance, setHasTriggeredEntrance] = useState(isDirectOpened);

  useEffect(() => {
    if (isOpening) {
      setHasTriggeredEntrance(true);
    } else {
      const timer = setTimeout(() => {
        setHasTriggeredEntrance(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpening]);

  const [selectedCalendarEvent, setSelectedCalendarEvent] = useState<CalendarEventData | null>(null);
  const [isCalendarModalOpen, setIsCalendarModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpGuests, setRsvpGuests] = useState('1');
  const [rsvpAttendance, setRsvpAttendance] = useState('hadir');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitting, setRsvpSubmitting] = useState(false);
  const [rsvpList, setRsvpList] = useState<any[]>([]);
  const [showWishes, setShowWishes] = useState(false);

  // Curated dignified sample wishes when rsvpList is empty
  const sampleWishes = [
    {
      id: 'sample-1',
      name: 'Keluarga Besar Bpk. H. Bambang Soediro',
      attending: true,
      message: 'Nderek mangayubagyo awit keparengipun dhaup suci Steven & Bunga. Mugi tansah pinaringan berkah, sakinah mawaddah warahmah.',
      created_at: '2026-10-24T14:20:00Z',
    },
    {
      id: 'sample-2',
      name: 'Anisa & Dimas Pratama',
      attending: true,
      message: 'Selamat berbahagia untuk Steven & Bunga! Semoga senantiasa rukun, saling melengkapi, dan cinta kasih mekar abadi hingga kakek nenek.',
      created_at: '2026-10-24T16:45:00Z',
    },
    {
      id: 'sample-3',
      name: 'Raden Mas Haryo Wicaksono',
      attending: false,
      message: 'Selamat menempuh babak baru sahabatku. Mohon maaf belum bisa hadir langsung, doa terbaik senantiasa menyertai kalian berdua.',
      created_at: '2026-10-25T08:10:00Z',
    },
  ];

  const displayWishes = rsvpList.length > 0 ? rsvpList : sampleWishes;

  // Photobooth Modal State
  const [isPhotoboothOpen, setIsPhotoboothOpen] = useState(false);

  // Photobooth 3-Photo Slide State
  const [activePhotoboothSlide, setActivePhotoboothSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActivePhotoboothSlide(prev => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(slideTimer);
  }, []);

  // Dynamic Names matching Database
  const formatTitleCase = (str?: string) => {
    if (!str) return '';
    return str.trim().split(/\s+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
  };

  const isAgni = typeof window !== 'undefined' && (
    window.location.pathname.toLowerCase().includes('agni') ||
    window.location.pathname.toLowerCase().includes('kribo') ||
    (invitation?.slug && (invitation.slug.toLowerCase().includes('agni') || invitation.slug.toLowerCase().includes('kribo')))
  );

  const groomName = isAgni ? 'Agni' : (
    (couple?.groom_full_name ? formatTitleCase(couple.groom_full_name.split(/\s+/)[0]) : '') ||
    (couple?.groom_nickname && couple.groom_nickname.toLowerCase() !== 'bagas' ? formatTitleCase(couple.groom_nickname) : '') ||
    couple?.groom_name || 'Steven'
  );

  const brideName = isAgni ? 'Putri' : (
    (couple?.bride_full_name ? formatTitleCase(couple.bride_full_name.split(/\s+/)[0]) : '') ||
    (couple?.bride_nickname && couple.bride_nickname.toLowerCase() !== 'siti' ? formatTitleCase(couple.bride_nickname) : '') ||
    couple?.bride_name || 'Bunga'
  );

  const groomFullName = couple?.groom_full_name || couple?.groom_name || couple?.groom_nickname || (isAgni ? 'AGNI KAHURIPAN (KRIBO)' : 'Steven');
  const brideFullName = couple?.bride_full_name || couple?.bride_name || couple?.bride_nickname || (isAgni ? 'PUTRI ANNISA' : 'Bunga');

  const groomParents = couple?.groom_parents || (
    couple?.groom_father_name && couple?.groom_mother_name
      ? `Putra dari Bpk. ${formatTitleCase(couple.groom_father_name)} & Ibu ${formatTitleCase(couple.groom_mother_name)}`
      : (isAgni ? 'Putra ke-2 dari Bpk. Sofyan & Ibu Warsilah' : 'Putra dari Bpk. Bagus & Ibu Sasa')
  );
  const brideParents = couple?.bride_parents || (
    couple?.bride_father_name && couple?.bride_mother_name
      ? `Putri dari Bpk. ${formatTitleCase(couple.bride_father_name)} & Ibu ${formatTitleCase(couple.bride_mother_name)}`
      : (isAgni ? 'Putri ke-3 dari Bpk. Syahrudin & Ibu Eliyana' : 'Putri dari Bpk. Agus & Ibu Sisi')
  );

  const couplePhoto = (invitation?.settings?.cover_photo && invitation.settings.cover_photo.trim() !== '')
    ? invitation.settings.cover_photo
    : ((couple?.cover_photo_url && couple.cover_photo_url.trim() !== '') 
      ? couple.cover_photo_url 
      : ((couple?.cover_photo && couple.cover_photo.trim() !== '') ? couple.cover_photo : '/photos/photo-3.jpg'));

  const groomPhoto = (couple?.groom_photo_url && couple.groom_photo_url.trim() !== '') 
    ? couple.groom_photo_url 
    : ((couple?.groom_photo && couple.groom_photo.trim() !== '') ? couple.groom_photo : '/groom-default.png');

  const bridePhoto = (couple?.bride_photo_url && couple.bride_photo_url.trim() !== '') 
    ? couple.bride_photo_url 
    : ((couple?.bride_photo && couple.bride_photo.trim() !== '') ? couple.bride_photo : '/bride-default.png');

  const groomFullPhoto = groomPhoto;
  const brideFullPhoto = bridePhoto;

  const groomInstagram = invitation?.settings?.groom_instagram || couple?.groom_instagram || (isAgni ? '@agnikahuripan' : undefined);
  const brideInstagram = invitation?.settings?.bride_instagram || couple?.bride_instagram || (isAgni ? '@_putrikahuripan' : undefined);

  // Helper for YouTube Embed URLs
  const getEmbedUrl = (url?: string) => {
    if (!url) return '';
    if (url.includes('embed/')) return url;
    const matchWatch = url.match(/[?&]v=([^&]+)/);
    if (matchWatch) return `https://www.youtube.com/embed/${matchWatch[1]}`;
    const matchShort = url.match(/youtu\.be\/([^?&]+)/);
    if (matchShort) return `https://www.youtube.com/embed/${matchShort[1]}`;
    return url;
  };

  // Love Story Milestones (Database stories or romantic defaults)
  const defaultStories = [
    {
      chapter: 'BABAK I',
      date: '2019',
      title: 'Awal Bertemu',
      photo: '/photos/photo-7.jpg',
      description: 'Aku memandangi mu tanpa perlu menatap, aku mendengar mu tanpa alat, aku menemui mu tanpa perlu hadir. Aku mencintai mu tanpa perlu apa-apa. Karna kini kumiliki segalanya.'
    },
    {
      chapter: 'BABAK II',
      date: '2023',
      title: 'Menjalin Kasih',
      photo: '/photos/photo-3.jpg',
      description: 'Setelah bertahun-tahun saling mengenal dan membersamai, kami meyakini hati masing-masing untuk melangkah ke jenjang yang lebih serius dengan restu keluarga besar.'
    },
    {
      chapter: 'BABAK III',
      date: '2026',
      title: 'Menuju Pelaminan',
      photo: '/photos/photo-1.jpg',
      description: 'Dengan penuh rasa syukur dan doa yang tulus, kami siap mengikat janji suci pernikahan untuk melangkah bersama mengarungi samudra kehidupan.'
    }
  ];

  const displayStories = (stories && stories.length > 0)
    ? stories.map((s: any, idx: number) => ({
        chapter: `BABAK ${idx === 0 ? 'I' : idx === 1 ? 'II' : idx === 2 ? 'III' : (idx + 1)}`,
        date: s.date || (idx === 0 ? '2019' : idx === 1 ? '2023' : '2026'),
        title: s.title || (idx === 0 ? 'Awal Bertemu' : idx === 1 ? 'Menjalin Kasih' : 'Menuju Pelaminan'),
        photo: s.photo || s.photo_url || defaultStories[idx % defaultStories.length].photo,
        description: s.description || s.content || defaultStories[idx % defaultStories.length].description
      }))
    : defaultStories;

  // Wedding Gifts fallback matching preview & database
  const defaultGifts = [
    {
      provider: 'Bank Mandiri',
      account_number: '123123123',
      account_name: 'Elyana Azkiya Nur',
    },
    {
      provider: 'Bank Mandiri',
      account_number: '123123123',
      account_name: 'Elyana Azkiya Nur',
    }
  ];

  const displayGifts = (gifts && gifts.length > 0) ? gifts : defaultGifts;
  const giftRecipient = invitation?.settings?.gift_recipient || couple?.gift_recipient || (isAgni ? 'AGNI KAHURIPAN' : (couple?.bride_full_name || 'Elyana Azkiya Nur'));
  const giftAddress = invitation?.settings?.gift_address || couple?.gift_address || (isAgni ? 'Dk. Talang, Lemah Putih, RT 05, RW 01, Selotinatah, Ngariboyo, Magetan, Jawa Timur (No. HP: 0895 3401 92500)' : 'Jalan Raya Bojongsari No.5, Gunung Putri, Citeureup, Bogor, Jawa Barat');

  // Target Wedding Date (e.g. from first event or defaults to Saturday)
  const targetDateStr = events[0]?.event_date
    ? `${events[0].event_date.split('T')[0]}T${events[0].start_time || '09:00:00'}`
    : (events[0]?.date || invitation?.wedding_date || '2026-11-28T09:00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const difference = +new Date(targetDateStr) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Load RSVP List from Supabase
  useEffect(() => {
    if (!invitation?.id) return;
    const fetchRsvps = async () => {
      const { data } = await supabase
        .from('rsvps')
        .select('*')
        .eq('invitation_id', invitation.id)
        .order('created_at', { ascending: false })
        .limit(20);
      if (data) setRsvpList(data);
    };
    fetchRsvps();
  }, [invitation?.id]);

  // Submit RSVP
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon isi nama Anda.');
      return;
    }

    setRsvpSubmitting(true);
    try {
      if (invitation?.id) {
        const { error } = await supabase.from('rsvps').insert({
          invitation_id: invitation.id,
          name: rsvpName.trim(),
          attending: rsvpAttendance === 'hadir',
          guests_count: parseInt(rsvpGuests) || 1,
          message: rsvpMessage.trim() || 'Selamat berbahagia untuk kedua mempelai.',
        });
        if (error) throw error;
      }

      toast.success('Konfirmasi kehadiran & doa berhasil dikirim!');
      setRsvpList(prev => [
        {
          id: 'temp-' + Date.now(),
          name: rsvpName.trim(),
          attending: rsvpAttendance === 'hadir',
          guests_count: parseInt(rsvpGuests) || 1,
          message: rsvpMessage.trim() || 'Selamat berbahagia untuk kedua mempelai.',
          created_at: new Date().toISOString(),
        },
        ...prev,
      ]);
      setShowWishes(true);
      setRsvpName('');
      setRsvpMessage('');
    } catch {
      toast.error('Gagal mengirim RSVP. Silakan coba lagi.');
    } finally {
      setRsvpSubmitting(false);
    }
  };

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyText = (text: string, label: string, key?: string) => {
    navigator.clipboard.writeText(text);
    if (key) {
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 2500);
    }
    toast.success(`${label} berhasil disalin!`);
  };

  const searchParams = new URLSearchParams(window.location.search);
  const rawTo = searchParams.get('to');
  const guestName = (rawTo && rawTo.trim() !== '') 
    ? rawTo.trim() 
    : (invitation?.settings?.default_guest_name?.trim() || 'Tamu Undangan');

  // Helper to format event date to uppercase Indonesian string matching reference
  const formatEventDateID = (dateStr?: string, fallback = 'SABTU, 25 OKTOBER 2026') => {
    if (!dateStr) return fallback;
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr.toUpperCase();
      return d.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).toUpperCase();
    } catch {
      return fallback;
    }
  };

  // Helper to format event time nicely
  const formatEventTimeID = (start?: string, end?: string, fallback = '10.00 WIB - Selesai') => {
    if (!start && !end) return fallback;
    const cleanStart = start ? (start.includes(':') ? start.replace(':', '.') : start) : '10.00';
    const cleanEnd = end ? (end.toLowerCase() === 'selesai' ? 'Selesai' : (end.includes(':') ? end.replace(':', '.') : end) + ' WIB') : 'Selesai';
    return `${cleanStart} WIB - ${cleanEnd}`;
  };

  const akadEvt = events && events.length > 0 ? events[0] : null;
  const resepsiEvt = events && events.length > 1 ? events[1] : null;

  const akadTitle = akadEvt?.name || 'AKAD NIKAH';
  const akadDateFormatted = formatEventDateID(akadEvt?.date || akadEvt?.event_date, 'SABTU, 25 OKTOBER 2026');
  const akadTimeFormatted = formatEventTimeID(akadEvt?.start_time, akadEvt?.end_time, '10.00 WIB - Selesai');
  const akadVenueTitle = akadEvt?.venue_name || akadEvt?.location || 'KEDIAMAN MEMPELAI WANITA';
  const akadVenueAddress = akadEvt?.address || akadEvt?.location || 'Jl Harapan Dusun X Tanjung Morawa';
  const akadMapUrl = akadEvt?.maps_url || akadEvt?.map_url || (akadEvt?.location ? `https://maps.google.com/?q=${encodeURIComponent(akadEvt.location + ' ' + (akadEvt.address || ''))}` : 'https://maps.google.com/?q=Tanjung+Morawa');
  const akadRawDate = akadEvt?.date ? akadEvt.date.split('T')[0] : (akadEvt?.event_date ? akadEvt.event_date.split('T')[0] : '2026-10-25');
  const akadRawStart = akadEvt?.start_time || '10:00';
  const akadRawEnd = akadEvt?.end_time || '13:00';

  const rawResepsiTitle = resepsiEvt?.name || 'RESEPSI PERNIKAHAN';
  const resepsiTitleLines = rawResepsiTitle.toLowerCase().includes('resepsi') && rawResepsiTitle.toLowerCase().includes('pernikahan')
    ? ['RESEPSI', 'PERNIKAHAN']
    : [rawResepsiTitle];
  const resepsiDateFormatted = formatEventDateID(resepsiEvt?.date || resepsiEvt?.event_date, 'SABTU, 25 OKTOBER 2026');
  const resepsiTimeFormatted = formatEventTimeID(resepsiEvt?.start_time, resepsiEvt?.end_time, '10.00 WIB - Selesai');
  const resepsiVenueTitle = resepsiEvt?.venue_name || resepsiEvt?.location || 'KEDIAMAN MEMPELAI WANITA';
  const resepsiVenueAddress = resepsiEvt?.address || resepsiEvt?.location || 'Jl Harapan Dusun X Tanjung Morawa';
  const resepsiMapUrl = resepsiEvt?.maps_url || resepsiEvt?.map_url || (resepsiEvt?.location ? `https://maps.google.com/?q=${encodeURIComponent(resepsiEvt.location + ' ' + (resepsiEvt.address || ''))}` : 'https://maps.google.com/?q=Tanjung+Morawa');
  const resepsiRawDate = resepsiEvt?.date ? resepsiEvt.date.split('T')[0] : (resepsiEvt?.event_date ? resepsiEvt.event_date.split('T')[0] : '2026-10-25');
  const resepsiRawStart = resepsiEvt?.start_time || '10:00';
  const resepsiRawEnd = resepsiEvt?.end_time || '14:00';

  return (
    <div className="relative min-h-screen bg-[#100d0b] text-[#FBF7F0] font-sans overflow-x-hidden selection:bg-amber-400 selection:text-stone-950">
      
      {/* ========================================================================= */}
      {/* DESKTOP LEFT SIDE: Fixed 58% Panoramic Royal Pendopo Joglo View           */}
      {/* ========================================================================= */}
      <div className="hidden lg:block lg:w-[58%] fixed top-0 left-0 h-screen z-0 overflow-hidden bg-[#0c0806]">
        {/* Background Image: Majestic Joglo Night Scene */}
        <img 
          src="/themes/royal-wayang-bg.jpg" 
          alt="Royal Joglo Pendopo Landscape" 
          className="w-full h-full object-cover object-center scale-105"
        />

        {/* Cinematic Vignette Overlays for Royal Ambiance */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0a08] via-transparent to-black/60" />

        {/* Left Side Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-10 xl:px-20 text-white z-10 select-none">
          {/* Top Royal Crown */}
          <div className="mb-4">
            <img 
              src="/themes/royal-crown-luxury.png" 
              alt="Mahkota Keraton" 
              className="w-40 xl:w-52 h-auto object-contain filter drop-shadow-[0_6px_20px_rgba(212,175,55,0.5)]" 
            />
          </div>

          <p 
            className="text-xs xl:text-sm uppercase tracking-[0.35em] text-[#e6cfab] font-serif font-medium mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          >
            Pawiwahan Ageng Jawa Klasik
          </p>

          <h1 
            className="text-6xl xl:text-7xl 2xl:text-8xl font-normal mb-5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] text-white tracking-wide font-serif"
          >
            {groomName} <span className="font-light italic text-[#ffd778]">&amp;</span> {brideName}
          </h1>

          <p 
            className="text-xl xl:text-2xl text-[#f3da9f] font-serif font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] mb-6"
          >
            Sabtu, 28 November 2026
          </p>

          <p className="text-xs xl:text-sm text-stone-300/90 max-w-md mb-8 leading-relaxed font-serif italic">
            &ldquo;Mugi Gusti paring berkah lumantar ikatan suci ingkang pinaringan katresnan abadi.&rdquo;
          </p>

          <div className="bg-black/55 border border-[#d4af37]/45 backdrop-blur-md rounded-2xl px-6 py-4 max-w-sm shadow-[0_12px_36px_rgba(0,0,0,0.8)]">
            <p className="text-[11px] uppercase tracking-widest text-[#e6cfab] font-serif">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-xl font-bold text-white tracking-wide mt-1 font-serif drop-shadow-sm">
              {guestName}
            </p>
            <p className="text-[11px] text-white/70 italic mt-1 font-serif">
              Di Tempat
            </p>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP RIGHT SIDE: Scrollable Invitation (42% on desktop, 100% on mobile) */}
      {/* ========================================================================= */}
      <div className="w-full lg:w-[42%] lg:ml-[58%] min-h-screen relative z-10 bg-[#120e0c] shadow-[0_0_80px_rgba(0,0,0,0.9)] border-l border-amber-500/25">

        {/* Global Ambient Background for the Right Side */}
        <div className="fixed top-0 right-0 w-full lg:w-[42%] h-screen z-0 pointer-events-none overflow-hidden">
          <img 
            src="/themes/royal-wayang-bg.jpg" 
            alt="Joglo Pendopo Royal Background" 
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0a08]/90 via-[#100d0b]/80 to-[#0e0a08]/95" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0e0a08]/50 to-[#080504]/90" />
        </div>

        {/* ==================================================== */}
        {/* 1. HERO COVER SECTION (ROYAL WAYANG SHOWCASE)        */}
        {/* Arsitektur Multi-Layer Terpisah untuk Animasi Penuh  */}
        {/* ==================================================== */}
        <header className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden select-none bg-[#0a0705]">
          <style>{`
            @keyframes royal-frame-fade-in {
              0% {
                opacity: 0;
                transform: scale(0.90) translateY(18px);
                filter: blur(10px) brightness(1.3);
              }
              50% {
                opacity: 0.85;
                filter: blur(2px) brightness(1.1);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0);
                filter: blur(0px) brightness(1);
              }
            }
            @keyframes royal-crown-emerge {
              0% {
                opacity: 0;
                transform: translateX(-50%) translateY(-22px) scale(0.8);
                filter: drop-shadow(0 0 0 rgba(212,175,55,0));
              }
              100% {
                opacity: 1;
                transform: translateX(-50%) translateY(0) scale(1);
                filter: drop-shadow(0 4px 18px rgba(212,175,55,0.7));
              }
            }
            @keyframes royal-wayang-in-left {
              0% {
                opacity: 0;
                transform: translateX(-35px) scale(0.92);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            @keyframes royal-wayang-in-right {
              0% {
                opacity: 0;
                transform: translateX(35px) scale(0.92);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
            @keyframes royal-wayang-sway-left {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(-1.4deg); }
            }
            @keyframes royal-wayang-sway-right {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-5px) rotate(1.4deg); }
            }
            @keyframes royal-glow-breathe {
              0%, 100% { box-shadow: 0 0 15px rgba(212,175,55,0.35), inset 0 0 10px rgba(212,175,55,0.2); transform: scale(1); }
              50% { box-shadow: 0 0 30px rgba(212,175,55,0.7), inset 0 0 18px rgba(212,175,55,0.45); transform: scale(1.04); }
            }
            @keyframes royal-star-twinkle {
              0%, 100% { opacity: 0.4; transform: scale(0.85); }
              50% { opacity: 1; transform: scale(1.15); }
            }
          `}</style>

          {/* 1. LAYER BACKGROUND: Lanskap Pendopo Rumah Joglo Asli (royal-wayang-bg.jpg) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Rumah Joglo Pendopo Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.02]"
            />
            {/* Ambient Radial Vignette */}
            <div className="absolute inset-0 bg-radial from-transparent via-[#0a0705]/20 to-[#080503]/75" />
          </div>

          {/* 2. LAYER PARTICLES: Floating Golden Sparkles */}
          <GoldenSparkleDust />

          {/* 3. LAYER TOP FLORAL CORNERS (Luxury Bronze-Gold Peonies & Filigree Leaves) */}
          <div className="absolute -top-1 -left-1 z-20 pointer-events-none">
            <img 
              src="/themes/royal-floral-corner-luxury.png" 
              alt="Floral Ornamen Kiri" 
              className="w-24 sm:w-36 h-24 sm:h-36 object-contain filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]" 
            />
          </div>
          <div className="absolute -top-1 -right-1 z-20 pointer-events-none">
            <img 
              src="/themes/royal-floral-corner-luxury.png" 
              alt="Floral Ornamen Kanan" 
              className="w-24 sm:w-36 h-24 sm:h-36 object-contain -scale-x-100 filter drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)]" 
            />
          </div>

          {/* 5. LAYER MAIN BAROQUE FRAME & COUPLE PHOTO & NAMES */}
          <div 
            className="relative z-10 w-[84%] max-w-[340px] sm:max-w-[390px] aspect-[896/1200] max-h-[72vh] mx-auto flex flex-col items-center justify-center -translate-y-11 sm:-translate-y-14"
            style={hasTriggeredEntrance ? {
              animation: 'royal-frame-fade-in 1.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            } : { opacity: 0 }}
          >
            {/* Crown At Top Peak of Baroque Frame */}
            <div 
              className="absolute -top-[7.5%] sm:-top-[8.5%] left-1/2 -translate-x-1/2 z-30 pointer-events-none w-22 sm:w-26 drop-shadow-[0_4px_16px_rgba(212,175,55,0.7)]"
              style={hasTriggeredEntrance ? {
                animation: 'royal-crown-emerge 1.4s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both'
              } : { opacity: 0 }}
            >
              <img 
                src="/themes/royal-crown-luxury.png" 
                alt="Mahkota Keraton" 
                className="w-full h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(212,175,55,0.7)]" 
              />
            </div>

            {/* Foto Mempelai dalam Kubah Lengkung (HD Crystal Clear) */}
            <div className="absolute top-[22%] left-[17%] right-[17%] bottom-[14%] rounded-t-[100px] overflow-hidden z-10 bg-[#160f09] shadow-inner">
              <img 
                src={couplePhoto} 
                alt={`${groomName} & ${brideName}`} 
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
              />
            </div>

            {/* 3D Carved Gold Baroque Arch Frame */}
            <img 
              src="/themes/royal-baroque-frame-luxury.png" 
              alt="Royal Baroque Gold Arch Frame" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]" 
            />

            {/* Kotak Tipografi Mempelai di Bagian Bawah Bingkai */}
            <div className="absolute bottom-[9%] left-[12%] right-[12%] py-2 sm:py-2.5 px-3 rounded-xl bg-gradient-to-b from-[#22150a]/96 via-[#180e06]/98 to-[#0b0603] border border-[#d4af37]/80 backdrop-blur-md text-center shadow-[0_8px_25px_rgba(0,0,0,0.95)] z-30">
              <h1 
                className="font-serif text-base sm:text-lg font-bold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {groomName} &amp; {brideName}
              </h1>
              <div className="flex items-center justify-center gap-2 my-0.5 sm:my-1">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#d4af37]/80" />
                <span className="text-[#ffd778] text-[8px]">✦</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#d4af37]/80" />
              </div>
              <p 
                className="text-[8.5px] sm:text-[9.5px] font-serif tracking-[0.24em] text-[#f7e6c4] uppercase font-semibold drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {formatEventDateID(events[0]?.date || events[0]?.event_date || '2026-09-30T09:00:00', 'RABU, 30 SEPTEMBER 2026')}
              </p>
            </div>
          </div>

          {/* 6. LAYER WAYANG KAMAJAYA (Kiri Bawah) */}
          <div 
            className="absolute bottom-1 sm:bottom-2 -left-3 sm:left-1 z-25 pointer-events-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.95)]"
            style={hasTriggeredEntrance ? {
              animation: 'royal-wayang-in-left 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both'
            } : { opacity: 0 }}
          >
            <div style={{ animation: 'royal-wayang-sway-left 6s ease-in-out infinite 1.3s' }}>
              <img 
                src="/themes/royal-kamajaya-luxury.png" 
                alt="Wayang Raden Kamajaya" 
                className="w-28 sm:w-40 h-auto object-contain" 
              />
            </div>
          </div>

          {/* 7. LAYER WAYANG KAMARATIH (Kanan Bawah) */}
          <div 
            className="absolute bottom-1 sm:bottom-2 -right-3 sm:right-1 z-25 pointer-events-none drop-shadow-[0_10px_28px_rgba(0,0,0,0.95)]"
            style={hasTriggeredEntrance ? {
              animation: 'royal-wayang-in-right 1.3s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both'
            } : { opacity: 0 }}
          >
            <div style={{ animation: 'royal-wayang-sway-right 6s ease-in-out infinite 1.3s' }}>
              <img 
                src="/themes/royal-kamaratih-luxury.png" 
                alt="Wayang Dewi Kamaratih" 
                className="w-28 sm:w-40 h-auto object-contain -scale-x-100" 
              />
            </div>
          </div>
        </header>

        {/* ==================================================== */}
        {/* 3. MEMPELAI PRIA & WANITA (THE ROYAL COUPLE SHOWCASE) */}
        {/* Luxury Unified Royal Presentation (No Awkward Split)  */}
        {/* ==================================================== */}
        <section 
          id="mempelai-detail" 
          className="relative w-full bg-[#0a0705] py-16 sm:py-20 select-none overflow-hidden border-t border-amber-500/20"
        >
          <style>{`
            @keyframes royal-crown-shimmer {
              0%, 100% { filter: drop-shadow(0 3px 8px rgba(212,175,55,0.6)) drop-shadow(0 2px 4px rgba(0,0,0,0.95)); }
              50% { filter: drop-shadow(0 4px 18px rgba(212,175,55,1)) drop-shadow(0 2px 4px rgba(0,0,0,0.95)); }
            }
            @keyframes royal-wayang-sway-left {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(-1.5deg); }
            }
            @keyframes royal-wayang-sway-right {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              50% { transform: translateY(-6px) rotate(1.5deg); }
            }
            @keyframes royal-glow-breathe {
              0%, 100% { box-shadow: 0 0 15px rgba(212,175,55,0.35), inset 0 0 10px rgba(212,175,55,0.2); transform: scale(1); }
              50% { box-shadow: 0 0 28px rgba(212,175,55,0.65), inset 0 0 16px rgba(212,175,55,0.45); transform: scale(1.04); }
            }
          `}</style>

          {/* Ambient Lighting & Royal Background Texture */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Pendopo Ambient Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.32] blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705] via-[#0d0907]/90 to-[#0a0705]" />
          </div>

          <GoldenSparkleDust />

          {/* Section Header: Regal Javanese Blessing */}
          <div className="relative z-10 text-center px-6 mb-12 sm:mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
              <img 
                src="/themes/royal-crown-luxury.png" 
                alt="Crown" 
                className="w-7 h-7 object-contain filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.6)]" 
              />
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
            </div>

            <span className="text-[11px] sm:text-xs font-serif tracking-[0.35em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm">
              SANG MEMPELAI
            </span>
            <h2 
              className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.08em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Penganten Kekalih
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-300/90 font-serif italic max-w-sm mx-auto leading-relaxed drop-shadow-sm">
              &ldquo;Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan, dengan memohon rahmat dan ridho-Nya kami bermaksud menyelenggarakan syukuran pernikahan kami:&rdquo;
            </p>
          </div>

          {/* Dual Royal Cards Container - Screen Fitting */}
          <div className="relative z-10 w-full flex flex-col items-center space-y-4">
            
            {/* 1. Penganten Kakung Slide (100dvh Screen Fitting) */}
            <div className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center px-3 sm:px-4 py-4 sm:py-6">
              <div className="relative w-full max-w-[420px] h-[calc(100dvh-2.5rem)] max-h-[820px] min-h-[580px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#221811]/98 via-[#150f0a]/98 to-[#0a0704] border-2 border-[#d4af37]/50 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between backdrop-blur-md">
                {/* Inner Royal Hairline Border */}
                <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#d4af37]/30 pointer-events-none z-10" />

                {/* Top Right Luxury Peony Floral Flourish */}
                <div className="absolute -top-3 -right-3 w-20 sm:w-24 pointer-events-none z-20 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
                  <img 
                    src="/themes/royal-floral-corner-luxury.png" 
                    alt="" 
                    className="w-full h-auto object-contain -scale-x-100 filter brightness-[1.08]" 
                  />
                </div>

                {/* Bottom Corner Filigrees */}
                <div className="absolute -bottom-2 -left-2 w-16 sm:w-18 pointer-events-none opacity-85 z-10 drop-shadow-md">
                  <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-full object-contain -scale-y-100" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 sm:w-18 pointer-events-none opacity-85 z-10 drop-shadow-md">
                  <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-full object-contain -scale-x-100 -scale-y-100" />
                </div>

                {/* Wayang Kamajaya Flank Ornament with Sway */}
                <div 
                  className="absolute -top-9 -left-4 sm:-left-7 w-24 sm:w-28 pointer-events-none z-25 drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]"
                  style={{ animation: 'royal-wayang-sway-left 6s ease-in-out infinite' }}
                >
                  <img 
                    src="/themes/royal-kamajaya-luxury.png" 
                    alt="Raden Kamajaya" 
                    className="w-full h-auto object-contain filter brightness-[1.08]" 
                  />
                </div>

                {/* Arched Portrait Photo Area */}
                <div className="w-full flex-1 min-h-0 flex items-center justify-center pt-8 sm:pt-9 pb-2">
                  {/* Exact Arch & Crown Anchored Box */}
                  <div className="relative w-full max-w-[270px] sm:max-w-[300px] aspect-[4/5] max-h-[46vh] flex items-center justify-center">
                    
                    {/* Crown resting directly on top of the arch apex (flush against the curve) */}
                    <div 
                      className="absolute -top-5 sm:-top-5.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                      style={{ animation: 'royal-crown-shimmer 3s ease-in-out infinite' }}
                    >
                      <img 
                        src="/themes/royal-crown-luxury.png" 
                        alt="Royal Crown" 
                        className="w-22 sm:w-26 h-auto object-contain filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.7)]" 
                      />
                      {/* Delicate Gold Crown Mount Bar resting along arch apex */}
                      <div className="w-14 sm:w-16 h-1 -mt-1 rounded-full bg-gradient-to-r from-transparent via-[#ffd778] to-transparent shadow-[0_0_8px_rgba(255,215,120,0.85)]" />
                    </div>

                    {/* Arched Portrait Photo Frame */}
                    <div className="relative w-full h-full rounded-t-[135px] sm:rounded-t-[150px] rounded-b-2xl overflow-hidden border-2 border-[#d4af37]/65 shadow-[0_12px_36px_rgba(0,0,0,0.9)] bg-[#120e0c]">
                      <img 
                        src={groomFullPhoto} 
                        alt={groomFullName} 
                        className="w-full h-full object-cover object-[center_20%] filter brightness-[1.02] contrast-[1.03]"
                      />
                      {/* Inner Arch Hairline Border for Depth */}
                      <div className="absolute inset-1.5 rounded-t-[129px] sm:rounded-t-[144px] rounded-b-xl border border-[#ffd778]/35 pointer-events-none" />
                      {/* Subtle vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Typography Details */}
                <div className="w-full flex-shrink-0 pt-2 pb-1 flex flex-col items-center text-center">
                  <h3 
                    className="text-2xl sm:text-3xl font-bold tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {groomFullName}
                  </h3>
                  
                  <p 
                    className="text-xs sm:text-[13px] text-[#D8D2C6] font-serif italic leading-relaxed max-w-[290px] mx-auto drop-shadow-sm my-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {groomParents}
                  </p>

                  {/* Keraton Diamond Divider */}
                  <div className="flex items-center justify-center gap-2.5 w-full max-w-[220px] my-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                    <span className="text-[#ffd778] text-[9px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                  </div>

                  {/* Elegant Outlined Instagram Button */}
                  <a
                    href={groomInstagram ? (groomInstagram.startsWith('http') ? groomInstagram : `https://instagram.com/${groomInstagram.replace('@', '')}`) : "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-2 rounded-full border border-[#d4af37]/70 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/90 via-[#3a2717]/85 to-[#2a1d12]/90 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-[10.5px] tracking-[0.28em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] group cursor-pointer active:scale-95"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <InstagramIcon className="w-4 h-4 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                    <span className="font-semibold tracking-[0.25em]">INSTAGRAM</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Sacred Royal Ampersand Medallion Connector */}
            <div className="flex items-center justify-center gap-3.5 my-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-14 sm:w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                <span className="text-[#ffd778] text-[10px] filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">✦</span>
              </div>

              <div 
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#3a2514] via-[#1a1108] to-[#0c0804] border-2 border-[#d4af37] flex items-center justify-center relative group shadow-[0_0_24px_rgba(212,175,55,0.5)]"
                style={{ animation: 'royal-glow-breathe 4s ease-in-out infinite' }}
              >
                <div className="absolute inset-1 rounded-full border border-[#ffd778]/40 pointer-events-none" />
                <span 
                  className="font-serif italic text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C2] to-[#ECC460] drop-shadow-sm select-none" 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  &amp;
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[#ffd778] text-[10px] filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">✦</span>
                <div className="w-14 sm:w-24 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              </div>
            </div>

            {/* 2. Penganten Putri Slide (100dvh Screen Fitting) */}
            <div className="relative w-full min-h-[100dvh] flex flex-col justify-center items-center px-3 sm:px-4 py-4 sm:py-6">
              <div className="relative w-full max-w-[420px] h-[calc(100dvh-2.5rem)] max-h-[820px] min-h-[580px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#221811]/98 via-[#150f0a]/98 to-[#0a0704] border-2 border-[#d4af37]/50 p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center justify-between backdrop-blur-md">
                {/* Inner Royal Hairline Border */}
                <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#d4af37]/30 pointer-events-none z-10" />

                {/* Top Left Luxury Peony Floral Flourish */}
                <div className="absolute -top-3 -left-3 w-20 sm:w-24 pointer-events-none z-20 drop-shadow-[0_6px_14px_rgba(0,0,0,0.85)]">
                  <img 
                    src="/themes/royal-floral-corner-luxury.png" 
                    alt="" 
                    className="w-full h-auto object-contain filter brightness-[1.08]" 
                  />
                </div>

                {/* Bottom Corner Filigrees */}
                <div className="absolute -bottom-2 -left-2 w-16 sm:w-18 pointer-events-none opacity-85 z-10 drop-shadow-md">
                  <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-full object-contain -scale-y-100" />
                </div>
                <div className="absolute -bottom-2 -right-2 w-16 sm:w-18 pointer-events-none opacity-85 z-10 drop-shadow-md">
                  <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-full object-contain -scale-x-100 -scale-y-100" />
                </div>

                {/* Wayang Kamaratih Flank Ornament with Sway */}
                <div 
                  className="absolute -top-9 -right-4 sm:-right-7 w-24 sm:w-28 pointer-events-none z-25 drop-shadow-[0_12px_24px_rgba(0,0,0,0.95)]"
                  style={{ animation: 'royal-wayang-sway-right 6s ease-in-out infinite' }}
                >
                  <img 
                    src="/themes/royal-kamaratih-luxury.png" 
                    alt="Dewi Kamaratih" 
                    className="w-full h-auto object-contain filter brightness-[1.08] -scale-x-100" 
                  />
                </div>

                {/* Arched Portrait Photo Area */}
                <div className="w-full flex-1 min-h-0 flex items-center justify-center pt-8 sm:pt-9 pb-2">
                  {/* Exact Arch & Crown Anchored Box */}
                  <div className="relative w-full max-w-[270px] sm:max-w-[300px] aspect-[4/5] max-h-[46vh] flex items-center justify-center">
                    
                    {/* Royal Bridal Tiara resting gracefully on top of the arch apex */}
                    <div 
                      className="absolute -top-5 sm:-top-5.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex flex-col items-center"
                      style={{ animation: 'royal-crown-shimmer 3s ease-in-out infinite' }}
                    >
                      <img 
                        src="/themes/royal-bridal-tiara-luxury.png" 
                        alt="Royal Bridal Tiara" 
                        className="w-24 sm:w-28 h-auto object-contain filter drop-shadow-[0_4px_14px_rgba(212,175,55,0.75)]" 
                      />
                      {/* Delicate Gold Crown Mount Bar resting along arch apex */}
                      <div className="w-16 sm:w-18 h-1 -mt-1 rounded-full bg-gradient-to-r from-transparent via-[#ffd778] to-transparent shadow-[0_0_8px_rgba(255,215,120,0.85)]" />
                    </div>

                    {/* Arched Portrait Photo Frame */}
                    <div className="relative w-full h-full rounded-t-[135px] sm:rounded-t-[150px] rounded-b-2xl overflow-hidden border-2 border-[#d4af37]/65 shadow-[0_12px_36px_rgba(0,0,0,0.9)] bg-[#120e0c]">
                      <img 
                        src={brideFullPhoto} 
                        alt={brideFullName} 
                        className="w-full h-full object-cover object-[center_20%] filter brightness-[1.02] contrast-[1.03]"
                      />
                      {/* Inner Arch Hairline Border for Depth */}
                      <div className="absolute inset-1.5 rounded-t-[129px] sm:rounded-t-[144px] rounded-b-xl border border-[#ffd778]/35 pointer-events-none" />
                      {/* Subtle vignette overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/35 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Typography Details */}
                <div className="w-full flex-shrink-0 pt-2 pb-1 flex flex-col items-center text-center">
                  <h3 
                    className="text-2xl sm:text-3xl font-bold tracking-[0.05em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] mb-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {brideFullName}
                  </h3>
                  
                  <p 
                    className="text-xs sm:text-[13px] text-[#D8D2C6] font-serif italic leading-relaxed max-w-[290px] mx-auto drop-shadow-sm my-1"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {brideParents}
                  </p>

                  {/* Keraton Diamond Divider */}
                  <div className="flex items-center justify-center gap-2.5 w-full max-w-[220px] my-3">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                    <span className="text-[#ffd778] text-[9px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                  </div>

                  {/* Elegant Outlined Instagram Button */}
                  <a
                    href={brideInstagram ? (brideInstagram.startsWith('http') ? brideInstagram : `https://instagram.com/${brideInstagram.replace('@', '')}`) : "https://instagram.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-2 rounded-full border border-[#d4af37]/70 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/90 via-[#3a2717]/85 to-[#2a1d12]/90 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-[10.5px] tracking-[0.28em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] group cursor-pointer active:scale-95"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <InstagramIcon className="w-4 h-4 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                    <span className="font-semibold tracking-[0.25em]">INSTAGRAM</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ==================================================== */}
        {/* 4. SAVE THE DATE & AYAT SUCI (AR-RUM: 21) & COUNTDOWN */}
        {/* Sesuai dengan screenshot: Foto berdua dengan payung */}
        {/* teks ayat suci Ar-Rum 21, live countdown & tombol Save The Date */}
        {/* ==================================================== */}
        {/* ==================================================== */}
        {/* 4. SAVE THE DATE & AYAT SUCI (AR-RUM: 21) & COUNTDOWN */}
        {/* Luxury Royal Presentation with 100dvh Screen Fitting */}
        {/* ==================================================== */}
        <section id="save-the-date" className="relative w-full border-t border-amber-500/20 bg-[#0c0806] select-none">
          
          {/* Slide Utama Save The Date (100dvh Screen Fitting) */}
          <div className="relative w-full min-h-[100dvh] h-[100dvh] flex flex-col justify-between items-center px-4 py-8 sm:py-10 overflow-hidden bg-[#0c0806]">
            
            {/* Cinematic Background Image with Dark Royal Vignette */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <img 
                src={couplePhoto || "/photos/photo-1.jpg"} 
                alt={`Save The Date - ${groomName} & ${brideName}`} 
                className="w-full h-full object-cover object-[center_30%] filter brightness-[0.42] contrast-[1.08] scale-105"
              />
              {/* Royal Gradient Vignettes */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705]/90 via-black/40 to-[#0a0705]/95" />
              <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/85" />
            </div>

            {/* Sparkle Golden Dust */}
            <GoldenSparkleDust />

            {/* Inner Royal Hairline Border Framing the Screen */}
            <div className="absolute inset-3 sm:inset-5 rounded-[28px] sm:rounded-[32px] border border-[#d4af37]/35 pointer-events-none z-15" />

            {/* Luxury Corner Flourishes */}
            <div className="absolute top-2 left-2 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-md">
              <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
            </div>
            <div className="absolute top-2 right-2 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-md">
              <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
            </div>
            <div className="absolute bottom-2 left-2 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-md">
              <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-y-100" />
            </div>
            <div className="absolute bottom-2 right-2 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-md">
              <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100 -scale-y-100" />
            </div>

            {/* 1. Header: Royal Blessing Title */}
            <div className="relative z-20 w-full text-center flex flex-col items-center pt-2 sm:pt-4">
              <div className="flex items-center justify-center gap-2 mb-1.5">
                <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                <span className="text-[#ffd778] text-[11px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
              </div>

              <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.35em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm mb-1">
                PENGINGAT HARI BAHAGIA
              </span>

              <h2 
                className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                SAVE THE DATE
              </h2>
            </div>

            {/* 2. Middle: Ayat Suci Ar-Rum 21 Card (Glassmorphism Luxury) */}
            <div className="relative z-20 w-full max-w-[360px] sm:max-w-[420px] rounded-2xl bg-gradient-to-b from-[#221811]/90 via-[#150f0a]/92 to-[#0a0704]/95 border border-[#d4af37]/45 p-4 sm:p-5 backdrop-blur-md shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col items-center text-center my-auto">
              <div className="absolute inset-1.5 rounded-xl border border-[#ffd778]/20 pointer-events-none" />

              {/* Decorative Basmalah / Floral accent */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#d4af37]/70" />
                <span className="text-[#ffd778] text-xs">❦</span>
                <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#d4af37]/70" />
              </div>

              <p 
                className="text-xs sm:text-[13px] text-[#E0D9CC] font-serif italic leading-relaxed drop-shadow-sm px-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                &ldquo;{invitation?.settings?.quote || "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang."}&rdquo;
              </p>

              {/* Surah Reference Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-[#d4af37]/50 bg-gradient-to-r from-[#d4af37]/20 to-[#ecc460]/10 text-[#ffd778] text-[10px] sm:text-[11px] font-serif tracking-[0.2em] font-semibold mt-3 shadow-sm">
                <span>✦ {invitation?.settings?.quote_source || "QS. AR-RUM : 21"} ✦</span>
              </div>
            </div>

            {/* 3. Bottom: Luxury Gold Countdown Cards & Action Button */}
            <div className="relative z-20 w-full flex flex-col items-center pb-2 sm:pb-4 space-y-3">
              
              {/* Dynamic Live Countdown Timer with 4 Regal Cards */}
              <div className="flex items-center justify-center gap-2 sm:gap-3.5">
                
                {/* HARI */}
                <div className="w-[66px] sm:w-[76px] py-2.5 sm:py-3 rounded-2xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#2a1d12]/95 via-[#1a1109]/95 to-[#0b0805]/98 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden backdrop-blur-md group hover:border-[#ffd778] transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent pointer-events-none" />
                  <span 
                    className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9.5px] text-[#D8D2C6] font-serif uppercase tracking-[0.22em] font-semibold mt-0.5">
                    HARI
                  </span>
                </div>

                <span className="text-[#ffd778] text-xl font-bold animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.9)] pb-2">:</span>

                {/* JAM */}
                <div className="w-[66px] sm:w-[76px] py-2.5 sm:py-3 rounded-2xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#2a1d12]/95 via-[#1a1109]/95 to-[#0b0805]/98 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden backdrop-blur-md group hover:border-[#ffd778] transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent pointer-events-none" />
                  <span 
                    className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9.5px] text-[#D8D2C6] font-serif uppercase tracking-[0.22em] font-semibold mt-0.5">
                    JAM
                  </span>
                </div>

                <span className="text-[#ffd778] text-xl font-bold animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.9)] pb-2">:</span>

                {/* MENIT */}
                <div className="w-[66px] sm:w-[76px] py-2.5 sm:py-3 rounded-2xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#2a1d12]/95 via-[#1a1109]/95 to-[#0b0805]/98 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden backdrop-blur-md group hover:border-[#ffd778] transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent pointer-events-none" />
                  <span 
                    className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9.5px] text-[#D8D2C6] font-serif uppercase tracking-[0.22em] font-semibold mt-0.5">
                    MENIT
                  </span>
                </div>

                <span className="text-[#ffd778] text-xl font-bold animate-pulse drop-shadow-[0_0_8px_rgba(212,175,55,0.9)] pb-2">:</span>

                {/* DETIK */}
                <div className="w-[66px] sm:w-[76px] py-2.5 sm:py-3 rounded-2xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-[#2a1d12]/95 via-[#1a1109]/95 to-[#0b0805]/98 shadow-[0_8px_20px_rgba(0,0,0,0.8)] flex flex-col items-center relative overflow-hidden backdrop-blur-md group hover:border-[#ffd778] transition-all">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#d4af37]/10 to-transparent pointer-events-none" />
                  <span 
                    className="font-serif text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9.5px] text-[#D8D2C6] font-serif uppercase tracking-[0.22em] font-semibold mt-0.5">
                    DETIK
                  </span>
                </div>
              </div>

              {/* Interactive SAVE THE DATE Calendar Button */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (events.length > 0) {
                      const firstEvt = events[0];
                      setSelectedCalendarEvent({
                        title: `Pernikahan ${groomName} & ${brideName}`,
                        description: `Walimatul Ursy ${groomFullName} & ${brideFullName}`,
                        location: firstEvt.location_name ? `${firstEvt.location_name}, ${firstEvt.location_address || ''}` : 'Lokasi Acara',
                        eventDate: firstEvt.date ? firstEvt.date.split('T')[0] : '2026-11-28',
                        startTime: firstEvt.start_time || '09:00',
                        endTime: firstEvt.end_time || '13:00',
                      });
                      setIsCalendarModalOpen(true);
                    } else {
                      setSelectedCalendarEvent({
                        title: `Pernikahan ${groomName} & ${brideName}`,
                        description: `Walimatul Ursy ${groomFullName} & ${brideFullName}`,
                        location: 'Gedung Pernikahan Keraton',
                        eventDate: '2026-11-28',
                        startTime: '09:00',
                        endTime: '13:00',
                      });
                      setIsCalendarModalOpen(true);
                    }
                  }}
                  className="inline-flex items-center justify-center gap-3 px-8 py-2.5 sm:px-9 sm:py-3 rounded-full border-2 border-[#d4af37]/80 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/95 via-[#3a2717]/95 to-[#2a1d12]/95 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-xs tracking-[0.25em] font-serif uppercase shadow-[0_6px_24px_rgba(0,0,0,0.8)] group cursor-pointer active:scale-95"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <CalendarIcon className="w-4 h-4 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                  <span className="font-semibold tracking-[0.25em]">SIMPAN TANGGAL ACARA</span>
                </button>
              </div>

            </div>
          </div>

        </section>

        {/* ==================================================== */}
        {/* 5. RANGKAIAN ACARA (WEDDING EVENT)                   */}
        {/* Luxury Royal Presentation with Gold Lacquer Cards    */}
        {/* ==================================================== */}
        <section id="wedding-event" className="relative w-full bg-[#0a0705] py-16 sm:py-20 select-none overflow-hidden border-t border-amber-500/20">
          
          {/* Ambient Royal Pendopo Texture & Lighting */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.25] blur-sm scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0705] via-[#0d0907]/90 to-[#0a0705]" />
          </div>

          <GoldenSparkleDust />

          {/* Section Header: Pawiwahan Ageng Blessing */}
          <div className="relative z-10 text-center px-6 mb-12 sm:mb-14 space-y-3">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
              <span className="text-[#ffd778] text-[11px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
            </div>

            <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.35em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm">
              PAWIWAHAN AGENG
            </span>
            <h2 
              className="font-serif text-3xl sm:text-4xl font-bold tracking-[0.1em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] drop-shadow-md"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Rangkaian Acara
            </h2>
            <p className="text-xs sm:text-[13px] text-stone-300/90 font-serif italic max-w-sm mx-auto leading-relaxed drop-shadow-sm">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri hari bahagia kami yang akan diselenggarakan pada:
            </p>
          </div>

          {/* Event Cards Container */}
          <div className="relative z-10 w-full flex flex-col items-center px-3 sm:px-4 space-y-6 sm:space-y-8">
            
            {/* Card 1: Akad Nikah */}
            <div className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#221811]/98 via-[#150f0a]/98 to-[#0a0704] border-2 border-[#d4af37]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center backdrop-blur-md relative overflow-hidden group">
              {/* Inner Royal Hairline Border */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#d4af37]/30 pointer-events-none z-10" />

              {/* Corner Filigrees */}
              <div className="absolute top-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute top-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
              </div>
              <div className="absolute bottom-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-y-100" />
              </div>
              <div className="absolute bottom-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100 -scale-y-100" />
              </div>

              {/* Top Accent Divider */}
              <div className="flex items-center gap-2 mb-2 relative z-20">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#d4af37]/80" />
                <span className="text-[#ffd778] text-xs filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">❦</span>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#d4af37]/80" />
              </div>

              {/* Title: AKAD NIKAH */}
              <h3 
                className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] mb-1 relative z-20 uppercase"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {akadTitle}
              </h3>

              {/* Keraton Diamond Divider */}
              <div className="flex items-center justify-center gap-2.5 w-full max-w-[180px] my-2 relative z-20">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                <span className="text-[#ffd778] text-[9px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              </div>

              {/* Date & Time Box */}
              <div className="w-full py-3 px-4 rounded-2xl border border-[#d4af37]/45 bg-gradient-to-b from-[#2a1d12]/75 via-[#1b1209]/80 to-[#100b06]/90 flex flex-col items-center my-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)] relative z-20">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon className="w-4 h-4 text-[#ffd778]" />
                  <span 
                    className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {akadDateFormatted}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ffd778]/80" />
                  <span className="text-xs sm:text-[13px] font-serif text-[#D8D2C6] tracking-wide">
                    {akadTimeFormatted}
                  </span>
                </div>
              </div>

              {/* Venue Information */}
              <div className="space-y-1.5 max-w-[280px] mx-auto my-2 text-center relative z-20">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 bg-gradient-to-b from-[#3a2514] via-[#22160c] to-[#120c07] flex items-center justify-center mx-auto mb-2 shadow-[0_0_14px_rgba(212,175,55,0.45)]">
                  <MapPin className="w-4 h-4 text-[#ffd778]" />
                </div>
                <h4 
                  className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase leading-tight" 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {akadVenueTitle}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#D8D2C6] font-serif leading-relaxed italic">
                  {akadVenueAddress}
                </p>
                {akadEvt?.description && (
                  <div className="mt-2.5 px-3 py-1.5 rounded-xl border border-[#d4af37]/35 bg-[#25170d]/85 text-[#ffd778] text-[11px] font-serif tracking-wide shadow-sm">
                    {akadEvt.description}
                  </div>
                )}
              </div>

              {/* Dual Action Buttons (Google Maps & Calendar) */}
              <div className="w-full flex items-center justify-center gap-3 pt-3 relative z-20">
                <a
                  href={akadMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 max-w-[170px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#d4af37]/75 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/95 via-[#3a2717]/95 to-[#2a1d12]/95 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-[11px] tracking-[0.2em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] group cursor-pointer active:scale-95"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                  <span className="font-semibold tracking-[0.18em]">GOOGLE MAPS</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedCalendarEvent({
                      title: `Akad Nikah ${groomName} & ${brideName}`,
                      description: `Pernikahan suci ${groomFullName} dan ${brideFullName}.`,
                      location: akadVenueAddress,
                      eventDate: akadRawDate,
                      startTime: akadRawStart,
                      endTime: akadRawEnd,
                    });
                    setIsCalendarModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#d4af37]/50 hover:border-[#ffd778] bg-gradient-to-r from-[#1f1610] to-[#120c07] hover:bg-[#d4af37]/20 text-[#D8D2C6] hover:text-white transition-all duration-300 text-[11px] tracking-[0.18em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] cursor-pointer active:scale-95 group"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  title="Simpan Kalender"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                  <span className="font-semibold tracking-[0.15em]">KALENDER</span>
                </button>
              </div>
            </div>

            {/* Sacred Royal Connector Medallion */}
            <div className="flex items-center justify-center gap-3.5 my-2 relative z-10">
              <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#3a2514] via-[#1a1108] to-[#0c0804] border-2 border-[#d4af37] flex items-center justify-center relative shadow-[0_0_20px_rgba(212,175,55,0.45)]">
                <span className="font-serif italic text-lg text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5C2] to-[#ECC460]">❖</span>
              </div>
              <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
            </div>

            {/* Card 2: Resepsi Pernikahan */}
            <div className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#221811]/98 via-[#150f0a]/98 to-[#0a0704] border-2 border-[#d4af37]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center backdrop-blur-md relative overflow-hidden group">
              {/* Inner Royal Hairline Border */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#d4af37]/30 pointer-events-none z-10" />

              {/* Corner Filigrees */}
              <div className="absolute top-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
              </div>
              <div className="absolute top-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
              </div>
              <div className="absolute bottom-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-y-100" />
              </div>
              <div className="absolute bottom-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100 -scale-y-100" />
              </div>

              {/* Top Accent Divider */}
              <div className="flex items-center gap-2 mb-2 relative z-20">
                <div className="w-10 h-px bg-gradient-to-r from-transparent to-[#d4af37]/80" />
                <span className="text-[#ffd778] text-xs filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">❦</span>
                <div className="w-10 h-px bg-gradient-to-l from-transparent to-[#d4af37]/80" />
              </div>

              {/* Title: RESEPSI PERNIKAHAN */}
              <h3 
                className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] mb-1 relative z-20 uppercase"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {resepsiTitleLines[0]}
                {resepsiTitleLines[1] && (
                  <>
                    <br />
                    {resepsiTitleLines[1]}
                  </>
                )}
              </h3>

              {/* Keraton Diamond Divider */}
              <div className="flex items-center justify-center gap-2.5 w-full max-w-[180px] my-2 relative z-20">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-[#d4af37]" />
                <span className="text-[#ffd778] text-[9px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#d4af37]/60 to-[#d4af37]" />
              </div>

              {/* Date & Time Box */}
              <div className="w-full py-3 px-4 rounded-2xl border border-[#d4af37]/45 bg-gradient-to-b from-[#2a1d12]/75 via-[#1b1209]/80 to-[#100b06]/90 flex flex-col items-center my-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)] relative z-20">
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon className="w-4 h-4 text-[#ffd778]" />
                  <span 
                    className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {resepsiDateFormatted}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#ffd778]/80" />
                  <span className="text-xs sm:text-[13px] font-serif text-[#D8D2C6] tracking-wide">
                    {resepsiTimeFormatted}
                  </span>
                </div>
              </div>

              {/* Venue Information */}
              <div className="space-y-1.5 max-w-[280px] mx-auto my-2 text-center relative z-20">
                <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 bg-gradient-to-b from-[#3a2514] via-[#22160c] to-[#120c07] flex items-center justify-center mx-auto mb-2 shadow-[0_0_14px_rgba(212,175,55,0.45)]">
                  <MapPin className="w-4 h-4 text-[#ffd778]" />
                </div>
                <h4 
                  className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase leading-tight" 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {resepsiVenueTitle}
                </h4>
                <p className="text-xs sm:text-[13px] text-[#D8D2C6] font-serif leading-relaxed italic">
                  {resepsiVenueAddress}
                </p>
                {resepsiEvt?.description && (
                  <div className="mt-2.5 px-3 py-1.5 rounded-xl border border-[#d4af37]/40 bg-[#25170d]/90 text-[#ffd778] text-[11px] sm:text-xs font-serif tracking-wide shadow-sm">
                    {resepsiEvt.description}
                  </div>
                )}
              </div>

              {/* Dual Action Buttons (Google Maps & Calendar) */}
              <div className="w-full flex items-center justify-center gap-3 pt-3 relative z-20">
                <a
                  href={resepsiMapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 max-w-[170px] inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#d4af37]/75 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/95 via-[#3a2717]/95 to-[#2a1d12]/95 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-[11px] tracking-[0.2em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] group cursor-pointer active:scale-95"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  <MapPin className="w-3.5 h-3.5 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                  <span className="font-semibold tracking-[0.18em]">GOOGLE MAPS</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedCalendarEvent({
                      title: `Resepsi Pernikahan ${groomName} & ${brideName}`,
                      description: `Resepsi pernikahan ${groomFullName} dan ${brideFullName}.`,
                      location: resepsiVenueAddress,
                      eventDate: resepsiRawDate,
                      startTime: resepsiRawStart,
                      endTime: resepsiRawEnd,
                    });
                    setIsCalendarModalOpen(true);
                  }}
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full border border-[#d4af37]/50 hover:border-[#ffd778] bg-gradient-to-r from-[#1f1610] to-[#120c07] hover:bg-[#d4af37]/20 text-[#D8D2C6] hover:text-white transition-all duration-300 text-[11px] tracking-[0.18em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] cursor-pointer active:scale-95 group"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  title="Simpan Kalender"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                  <span className="font-semibold tracking-[0.15em]">KALENDER</span>
                </button>
              </div>
            </div>

            {/* Extra Events (if any) */}
            {events.length > 2 && events.slice(2).map((evt: any, idx: number) => {
              const extraTitle = evt.name || `Adicara ${idx + 3}`;
              const extraDateFormatted = formatEventDateID(evt.date || evt.event_date);
              const extraTimeFormatted = formatEventTimeID(evt.start_time, evt.end_time);
              const extraVenueTitle = evt.venue_name || 'TEMPAT ACARA';
              const extraVenueAddress = evt.location || 'Alamat lokasi acara';
              const extraMapUrl = evt.map_url || (evt.location ? `https://maps.google.com/?q=${encodeURIComponent(evt.location)}` : 'https://maps.google.com/?q=Tanjung+Morawa');

              return (
                <div key={evt.id || idx} className="relative w-full max-w-[390px] sm:max-w-[420px] rounded-[28px] sm:rounded-[32px] bg-gradient-to-b from-[#221811]/98 via-[#150f0a]/98 to-[#0a0704] border-2 border-[#d4af37]/50 p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col items-center text-center backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute inset-2 sm:inset-2.5 rounded-[22px] sm:rounded-[26px] border border-[#d4af37]/30 pointer-events-none z-10" />

                  {/* Corner Filigrees */}
                  <div className="absolute top-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                    <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
                  </div>
                  <div className="absolute top-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                    <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
                  </div>
                  <div className="absolute bottom-1 left-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                    <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-y-100" />
                  </div>
                  <div className="absolute bottom-1 right-1 w-14 sm:w-16 pointer-events-none z-20 opacity-80 drop-shadow-md">
                    <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100 -scale-y-100" />
                  </div>

                  <h3 
                    className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF7CE] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_12px_rgba(212,175,55,0.45)] mb-1 relative z-20 uppercase"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {extraTitle}
                  </h3>

                  <div className="w-full py-3 px-4 rounded-2xl border border-[#d4af37]/45 bg-gradient-to-b from-[#2a1d12]/75 via-[#1b1209]/80 to-[#100b06]/90 flex flex-col items-center my-3 shadow-[0_4px_16px_rgba(0,0,0,0.5)] relative z-20">
                    <div className="flex items-center gap-2 mb-1">
                      <CalendarIcon className="w-4 h-4 text-[#ffd778]" />
                      <span className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                        {extraDateFormatted}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-[#ffd778]/80" />
                      <span className="text-xs sm:text-[13px] font-serif text-[#D8D2C6] tracking-wide">
                        {extraTimeFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 max-w-[280px] mx-auto my-2 text-center relative z-20">
                    <div className="w-10 h-10 rounded-full border border-[#d4af37]/60 bg-gradient-to-b from-[#3a2514] via-[#22160c] to-[#120c07] flex items-center justify-center mx-auto mb-2 shadow-[0_0_14px_rgba(212,175,55,0.45)]">
                      <MapPin className="w-4 h-4 text-[#ffd778]" />
                    </div>
                    <h4 className="font-serif text-sm sm:text-base font-bold tracking-wider text-[#FFF5C2] uppercase leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {extraVenueTitle}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#D8D2C6] font-serif leading-relaxed italic">
                      {extraVenueAddress}
                    </p>
                  </div>

                  <div className="w-full flex items-center justify-center gap-3 pt-3 relative z-20">
                    <a
                      href={extraMapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 py-2.5 px-6 rounded-full border border-[#d4af37]/75 hover:border-[#ffd778] bg-gradient-to-r from-[#2a1d12]/95 via-[#3a2717]/95 to-[#2a1d12]/95 hover:from-[#d4af37]/30 hover:to-[#ecc460]/20 text-[#f5dfa8] hover:text-white transition-all duration-300 text-[11px] tracking-[0.2em] font-serif uppercase shadow-[0_4px_16px_rgba(0,0,0,0.7)] group cursor-pointer active:scale-95"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#ffd778] group-hover:scale-110 group-hover:text-white transition-all duration-300" />
                      <span className="font-semibold tracking-[0.18em]">GOOGLE MAPS</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ==================================================== */}
        {/* 6. LIVE STREAMING (ROYAL PALACE BROADCAST SHOWCASE)  */}
        {/* Pixel-Perfect Proportions & Safe-Zone Alignment      */}
        {/* ==================================================== */}
        <section id="live-streaming" className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-between items-center overflow-hidden bg-[#080503] select-none border-t border-amber-500/20 px-4 py-3 sm:py-5">
          
          {/* Ambient Royal Twilight Pendopo Texture & Lighting */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.15] blur-[0.5px] scale-105"
            />
            {/* Deep Vignette with Golden Horizon Ambient Light */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.20)_0%,_rgba(8,5,3,0.88)_55%,_#040302_100%)]" />
          </div>

          <GoldenSparkleDust />

          {/* Outer Royal Screen Framing Hairline */}
          <div className="absolute inset-3 sm:inset-5 rounded-[28px] sm:rounded-[32px] border border-[#d4af37]/35 pointer-events-none z-15" />

          {/* Top Corner Peony Bouquets (Compact, Clear of Music Disc Button) */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-20 opacity-80 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Top Clearance Spacer */}
          <div className="w-full h-3 sm:h-5 pointer-events-none" />

          {/* ========================================================= */}
          {/* Central Baroque Arched Mirror Frame & Virtual Showcase    */}
          {/* ========================================================= */}
          <div className="relative w-[min(88vw,375px)] aspect-[896/1200] max-h-[70vh] flex items-center justify-center z-20 my-auto">
            
            {/* 1. Inner Arched Glass Window (Calibrated strictly inside the mirror opening) */}
            <div className="absolute inset-x-[18.5%] top-[25.5%] bottom-[16.5%] rounded-t-[80px] sm:rounded-t-[100px] rounded-b-[14px] bg-gradient-to-b from-[#22140b]/94 via-[#130b06]/96 to-[#080503]/98 border border-[#d4af37]/35 shadow-[inset_0_4px_24px_rgba(0,0,0,0.9)] backdrop-blur-md flex flex-col items-center justify-center text-center px-4 sm:px-5 pt-4 pb-3 z-10 overflow-hidden">
              
              {/* Subtle Joglo Pavilion Reflection in Mirror Glass */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 mix-blend-screen">
                <img 
                  src="/themes/royal-wayang-bg.jpg" 
                  alt="" 
                  className="w-full h-full object-cover object-[center_35%] filter brightness-[0.9] contrast-[1.3]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#180f08]/75 via-[#0e0804]/85 to-[#060402]/95" />
              </div>

              {/* Inner Fine Gold Hairline Tracing */}
              <div className="absolute inset-1 rounded-t-[76px] sm:rounded-t-[96px] rounded-b-[10px] border border-[#d4af37]/25 pointer-events-none" />

              {/* Ambient Golden Radial Light from Crown */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#d4af37]/25 via-transparent to-transparent pointer-events-none" />

              {/* Top Royal Monogram Divider */}
              <div className="flex items-center justify-center gap-1.5 mb-1.5 opacity-90 relative z-20">
                <span className="text-[#ffd778] text-[8px] filter drop-shadow-[0_0_6px_rgba(212,175,55,0.8)]">✦ ❖ ✦</span>
              </div>

              {/* Main Heading: LIVE STREAMING (Sized to fit comfortably within the arch) */}
              <h3 
                className="font-serif text-[12px] sm:text-[14px] font-bold tracking-[0.24em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF9DC] via-[#ECC460] to-[#FFEAA0] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] leading-tight whitespace-nowrap relative z-20"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                LIVE STREAMING
              </h3>

              {/* Elegant Calligraphic Script: Live Streaming */}
              <div 
                className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#ffe39c] font-normal tracking-wide drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] mt-0.5 mb-1 relative z-20 whitespace-nowrap"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Live Streaming
              </div>

              {/* Middle Diamond Divider */}
              <div className="flex items-center justify-center gap-2 my-0.5 relative z-20 opacity-75">
                <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
                <span className="text-[#ffd778] text-[7px]">❦</span>
                <div className="w-6 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent" />
              </div>

              {/* Invitation Subtext (Constrained width so it NEVER clips against the frame) */}
              <p 
                className="text-[10px] sm:text-[11px] text-[#E8DEC7] font-serif leading-relaxed italic max-w-[165px] sm:max-w-[185px] mx-auto my-1 sm:my-1.5 drop-shadow-sm relative z-20"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Pernikahan kami dapat disaksikan secara langsung melalui live streaming di bawah ini.
              </p>

              {/* Interactive Luxury Outline Button */}
              <div className="pt-1.5 sm:pt-2 relative z-30 w-full flex justify-center">
                <a 
                  href={invitation?.settings?.youtube_url || invitation?.settings?.instagram_live_url || invitation?.settings?.tiktok_live_url || invitation?.settings?.zoom_url || invitation?.streaming_url || couple?.streaming_url || "https://youtube.com"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-md border border-[#d4af37] hover:border-[#ffd778] bg-[#180f07]/90 hover:bg-[#d4af37]/25 text-[#FFF4CC] hover:text-white transition-all duration-300 text-[10px] sm:text-[11px] font-serif font-bold tracking-[0.2em] uppercase shadow-[0_4px_16px_rgba(0,0,0,0.85)] hover:shadow-[0_0_18px_rgba(212,175,55,0.6)] hover:scale-105 active:scale-95 group cursor-pointer relative overflow-hidden"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {/* Subtle Light Sweep Effect on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transition-transform" />
                  
                  {/* YouTube Video Play Icon */}
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-500 group-hover:scale-110 transition-transform">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                  <span className="tracking-[0.2em] font-semibold">JOIN LIVE</span>
                </a>
              </div>
            </div>

            {/* 2. Outer Carved Baroque Golden Mirror Frame (Overlays Window) */}
            <img 
              src="/themes/royal-baroque-frame-luxury.png" 
              alt="Royal Baroque Golden Frame" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-[0_15px_40px_rgba(0,0,0,0.95)]" 
            />
          </div>

          {/* Bottom Flanking Wayang Figures (Kamajaya & Kamaratih - Positioned Gracefully) */}
          <div 
            className="absolute bottom-1 -left-2 sm:left-4 w-20 sm:w-28 pointer-events-none z-15 opacity-75 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]"
            style={{ animation: 'royal-wayang-sway-left 6s ease-in-out infinite' }}
          >
            <img src="/themes/royal-kamajaya-luxury.png" alt="Raden Kamajaya" className="w-full h-auto object-contain" />
          </div>

          <div 
            className="absolute bottom-1 -right-2 sm:right-4 w-20 sm:w-28 pointer-events-none z-15 opacity-75 drop-shadow-[0_6px_20px_rgba(0,0,0,0.9)]"
            style={{ animation: 'royal-wayang-sway-right 6s ease-in-out infinite' }}
          >
            <img src="/themes/royal-kamaratih-luxury.png" alt="Dewi Kamaratih" className="w-full h-auto object-contain -scale-x-100" />
          </div>

        </section>

        {/* ==================================================== */}
        {/* PAUGERAN BUSANA / DRESSCODE (Royal Wayang Gold)      */}
        {/* ==================================================== */}
        {(invitation?.settings?.dresscode_note || invitation?.settings?.dresscode_colors?.length) && (
          <section id="dresscode" className="relative w-full py-12 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <img src="/themes/royal-wayang-bg.jpg" alt="" className="w-full h-full object-cover filter brightness-50" />
            </div>
            
            <div className="relative z-10 w-[92%] max-w-[360px] p-6 rounded-2xl bg-gradient-to-b from-[#24170d]/95 via-[#190f08]/95 to-[#100804] border border-[#d4af37]/60 shadow-[0_12px_32px_rgba(0,0,0,0.85)] text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 mb-2.5">
                <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
                <span className="text-[10px] font-serif tracking-[0.25em] text-[#FFF4CC] uppercase font-bold">
                  PAUGERAN BUSANA
                </span>
                <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
              </div>

              <h3 
                className="font-serif font-bold text-xl sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] tracking-wider uppercase mb-2"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                DRESSCODE
              </h3>

              <p 
                className="text-xs sm:text-[13px] text-[#EADFC9]/90 font-serif leading-relaxed italic max-w-xs mx-auto mb-5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {invitation?.settings?.dresscode_note || 'Mohon mengenakan pakaian yang senada dengan palet warna berikut:'}
              </p>

              <div className="flex items-center justify-center gap-3.5 sm:gap-4">
                {(invitation?.settings?.dresscode_colors?.length === 4
                  ? invitation.settings.dresscode_colors
                  : ['#f3e8d2', '#87695e', '#41362e', '#dca15c']
                ).map((col: string, idx: number) => (
                  <div 
                    key={idx}
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full border-2 border-[#d4af37]/80 shadow-[0_4px_14px_rgba(0,0,0,0.6)] transition-transform duration-300 hover:scale-110 cursor-pointer"
                    style={{ backgroundColor: col }}
                    title={col}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* 7. PHOTOBOOTH KAMI (CLEAN 3-PHOTO SLIDESHOW)         */}
        {/* ==================================================== */}
        <section id="photobooth" className="relative w-full h-[100dvh] min-h-[640px] flex flex-col justify-end items-center text-center overflow-hidden bg-[#080503] border-t border-amber-500/20 select-none pb-12 sm:pb-14 px-6">
          
          {/* 3-Photo Background Slideshow Track with Smooth Crossfade */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {[
              couple?.cover_photo_url || "/photos/photo-7.jpg",
              "/photos/photo-3.jpg",
              "/photos/photo-1.jpg"
            ].map((photoUrl, idx) => (
              <div 
                key={idx}
                className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                  activePhotoboothSlide === idx 
                    ? 'opacity-100 scale-100 z-10' 
                    : 'opacity-0 scale-105 z-0 pointer-events-none'
                }`}
              >
                <img 
                  src={photoUrl} 
                  alt={`Photobooth Slide ${idx + 1} - ${groomName} & ${brideName}`}
                  className="w-full h-full object-cover object-[center_18%] filter brightness-[0.88] contrast-[1.05]"
                />
              </div>
            ))}

            {/* Seamless Bottom Gradient Shade */}
            <div className="absolute inset-0 z-15 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
          </div>

          <GoldenSparkleDust />

          {/* Navigation Chevron Arrows (Left & Right) */}
          <button
            onClick={() => setActivePhotoboothSlide((prev) => (prev === 0 ? 2 : prev - 1))}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-[#ffd778] text-white hover:text-[#ffd778] flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-90 shadow-lg group"
            aria-label="Foto Sebelumnya"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          
          <button
            onClick={() => setActivePhotoboothSlide((prev) => (prev === 2 ? 0 : prev + 1))}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-[#ffd778] text-white hover:text-[#ffd778] flex items-center justify-center transition-all duration-300 backdrop-blur-sm cursor-pointer active:scale-90 shadow-lg group"
            aria-label="Foto Selanjutnya"
          >
            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Clean Overlay Content directly on the photo (No Heavy Card Box) */}
          <div className="relative z-20 max-w-sm mx-auto space-y-3 pb-2 text-center">
            
            {/* Minimal Subtle Slide Dots */}
            <div className="flex items-center justify-center gap-2 mb-2">
              {[0, 1, 2].map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoboothSlide(idx)}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
                    activePhotoboothSlide === idx 
                      ? 'w-6 h-1.5 bg-gradient-to-r from-[#ffd778] to-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.8)]' 
                      : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <h3 
              className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-white uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              PHOTOBOOTH KAMI
            </h3>
            
            <p 
              className="text-xs sm:text-[13px] text-stone-200 font-serif leading-relaxed max-w-xs mx-auto drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] italic"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Jangan lupa abadikan momen bahagia bersama kami dengan menggunakan photobooth virtual yang sudah kami siapkan
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => setIsPhotoboothOpen(true)}
                className="px-8 py-3 rounded-full bg-[#1e1712]/85 hover:bg-[#d4af37]/30 text-[#FFF4CC] hover:text-white font-serif uppercase tracking-[0.2em] text-xs font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.85)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-[#d4af37]/70 hover:border-[#ffd778] backdrop-blur-md"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                BUKA PHOTOBOOTH
              </button>
            </div>
          </div>

        </section>

        {/* ==================================================== */}
        {/* 8. GALERI FOTO (Royal Wayang Gold Harmonized)         */}
        {/* Layout Foto Tetap Preserved: 3 - 2 - 3 - 2 Grid       */}
        {/* ==================================================== */}
        <section id="galeri-foto" className="relative w-full bg-[#080503] text-stone-100 overflow-hidden py-14 sm:py-16 px-4 sm:px-6 border-t border-amber-500/20 select-none">
          {/* Background Joglo Pendopo Royal Night */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Royal Gallery Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#080503] via-[#080503]/50 to-[#080503]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_75%)]" />
          </div>

          <GoldenSparkleDust />

          {/* Top Corner Floral Flourishes */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-10 opacity-70 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-10 opacity-70 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Header Galeri Foto */}
          <div className="relative z-20 text-center pb-6 sm:pb-8 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
              <span className="text-[#ffd778] text-[10px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
            </div>

            <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.35em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm mb-1">
              MOMEN BAHAGIA
            </span>

            <h2 className="text-3xl sm:text-4xl text-center">
              <span 
                className="font-serif italic text-3xl sm:text-4xl text-[#FFF4D0] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Galeri
              </span>{' '}
              <span 
                className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
              >
                Foto
              </span>
            </h2>

            <p 
              className="text-xs sm:text-[13px] text-[#EADFC9]/85 font-serif leading-relaxed max-w-xs mx-auto text-center mt-2 italic drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Setiap potret mengabadikan rasa bahagia dan awal perjalanan suci kami
            </p>
          </div>

          {/* Embedded YouTube Video Player (if video_url is set in admin) */}
          {invitation?.settings?.video_url && (
            <div className="relative z-20 w-full max-w-md mx-auto aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/60 shadow-[0_10px_30px_rgba(0,0,0,0.8)] mb-5 bg-black/60">
              <iframe
                className="w-full h-full"
                src={getEmbedUrl(invitation.settings.video_url)}
                title="Wedding Video Gallery"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          )}

          {/* Gallery Photos Grid: Uploaded Photos or Curated Royal Showcase */}
          {gallery && gallery.length > 0 ? (
            <div className="relative z-20 grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-md mx-auto">
              {gallery.map((g: any, idx: number) => {
                const photoSrc = typeof g === 'string' ? g : (g.image_url || '');
                if (!photoSrc) return null;
                return (
                  <div 
                    key={idx}
                    onClick={() => setSelectedPhoto(photoSrc)} 
                    className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img src={photoSrc} alt={`Galeri ${idx + 1}`} className="w-full h-full object-cover object-center filter brightness-[0.94] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {/* Row 1: 3 Portrait Photos (Groom, Couple, Bride) */}
              <div className="relative z-20 grid grid-cols-3 gap-2.5 sm:gap-3 max-w-md mx-auto mb-2.5 sm:mb-3">
                <div 
                  onClick={() => setSelectedPhoto(groomFullPhoto)} 
                  className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src={groomFullPhoto} alt="Groom Portrait" className="w-full h-full object-cover object-top filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedPhoto(couplePhoto)} 
                  className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src={couplePhoto} alt="Couple Portrait" className="w-full h-full object-cover object-top filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedPhoto(brideFullPhoto)} 
                  className="group relative aspect-[3/4] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src={brideFullPhoto} alt="Bride Portrait" className="w-full h-full object-cover object-top filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: 2 Highlight Moments */}
              <div className="relative z-20 grid grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto mb-2.5 sm:mb-3">
                <div 
                  onClick={() => setSelectedPhoto('/photos/photo-1.jpg')} 
                  className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src="/photos/photo-1.jpg" alt="Moment 1" className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
                <div 
                  onClick={() => setSelectedPhoto('/photos/photo-4.jpg')} 
                  className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <img src="/photos/photo-4.jpg" alt="Moment 2" className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                    <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: 3 Candid Moments */}
              <div className="relative z-20 grid grid-cols-3 gap-2.5 sm:gap-3 max-w-md mx-auto mb-2.5 sm:mb-3">
                {['/photos/photo-5.jpg', '/photos/photo-6.jpg', '/photos/photo-7.jpg'].map((photoSrc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedPhoto(photoSrc)} 
                    className="group relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img src={photoSrc} alt={`Moment ${idx + 3}`} className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Row 4: 2 Romantic Moments */}
              <div className="relative z-20 grid grid-cols-2 gap-2.5 sm:gap-3 max-w-md mx-auto">
                {['/photos/photo-8.jpg', '/photos/photo-9.jpg'].map((photoSrc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedPhoto(photoSrc)} 
                    className="group relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4af37]/45 hover:border-[#ffd778] bg-[#120a06] cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img src={photoSrc} alt={`Moment ${idx + 6}`} className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover:brightness-105 group-hover:scale-108 transition-all duration-500 ease-out" />
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/10 pointer-events-none z-10" />
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 pointer-events-none">
                      <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md transform scale-75 group-hover:scale-100 transition-transform">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>

        {/* ==================================================== */}
        {/* 9. LOVE STORY (Royal Wayang Gold Masterpiece)         */}
        {/* ==================================================== */}
        <section id="love-story" className="relative w-full min-h-[720px] py-14 sm:py-16 px-4 sm:px-6 overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none">
          {/* Background Joglo Pendopo Royal Night */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Joglo Pendopo Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806] via-[#0c0806]/55 to-[#0c0806]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_75%)]" />
          </div>

          <GoldenSparkleDust />

          {/* Top Corner Floral Flourishes */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Symmetrical Flanking Wayang Figures at Bottom */}
          <div className="absolute bottom-2 left-2 sm:left-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamajaya-luxury.png" alt="Raden Kamajaya" className="w-16 sm:w-22 h-auto object-contain" />
          </div>
          <div className="absolute bottom-2 right-2 sm:right-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamaratih-luxury.png" alt="Dewi Kamaratih" className="w-16 sm:w-22 h-auto object-contain -scale-x-100" />
          </div>

          {/* Title Header: Love Story */}
          <div className="relative z-20 text-center pb-8 sm:pb-10 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <div className="w-10 sm:w-16 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
              <span className="text-[#ffd778] text-[10px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
              <div className="w-10 sm:w-16 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
            </div>

            <span className="text-[10px] sm:text-[11px] font-serif tracking-[0.35em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm mb-1">
              PERJALANAN CINTA
            </span>

            <h2 
              className="font-serif italic text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Love Story
            </h2>

            <p 
              className="text-xs sm:text-[13px] text-[#EADFC9]/85 font-serif leading-relaxed max-w-xs mx-auto text-center mt-2 italic drop-shadow-sm"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Kisah kasih yang terajut indah, bermula dari pertemuan hingga bersatu dalam ikatan suci
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div className="relative z-20 max-w-md mx-auto pl-1 sm:pl-2 pr-1">
            {/* Story Milestone Items */}
            <div className="space-y-8 sm:space-y-10 relative">
              {/* Glowing Golden Timeline Vertical Track - Exactly aligned with node center */}
              <div className="absolute left-[19px] sm:left-[21px] top-6 bottom-8 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#ffd778] via-[#d4af37] to-[#8c671a]/30 shadow-[0_0_10px_rgba(212,175,55,0.5)] pointer-events-none z-0" />

              {displayStories.map((story, idx) => (
                <div key={idx} className="relative flex items-start group">
                  {/* Timeline Golden Medallion Node Column: width 38px/42px -> Center is exactly at 19px/21px */}
                  <div className="relative z-20 mt-4 w-[38px] sm:w-[42px] flex items-center justify-center shrink-0">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-b from-[#ffe699] via-[#d4af37] to-[#8c671a] p-[1.5px] shadow-[0_0_16px_rgba(212,175,55,0.85)] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-full h-full rounded-full bg-[#120a06] flex items-center justify-center border border-[#ffd778]/60">
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#ffd778] fill-[#ffd778] translate-y-[0.75px] filter drop-shadow-[0_0_4px_rgba(255,215,120,0.6)]"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Luxury Royal Card */}
                  <div className="ml-3 sm:ml-5 flex-1 rounded-[22px] sm:rounded-[26px] bg-gradient-to-b from-[#1c120a]/94 via-[#120a06]/96 to-[#090503]/98 border-2 border-[#d4af37]/55 hover:border-[#ffd778] p-4 sm:p-5 shadow-[0_16px_40px_rgba(0,0,0,0.92)] text-stone-100 backdrop-blur-md relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.4)]">
                    {/* Inner Hairline */}
                    <div className="absolute inset-1.5 sm:inset-2 rounded-[16px] sm:rounded-[20px] border border-[#d4af37]/30 pointer-events-none z-10" />

                    {/* Photo with Luxury Arched / Rounded Framing */}
                    {story.photo && (
                      <div 
                        onClick={() => setSelectedPhoto(story.photo)}
                        className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 border border-[#d4af37]/50 shadow-[0_8px_20px_rgba(0,0,0,0.8)] cursor-pointer group/photo"
                      >
                        <img 
                          src={story.photo} 
                          alt={story.title} 
                          className="w-full h-full object-cover object-center filter brightness-[0.92] group-hover/photo:brightness-105 group-hover/photo:scale-105 transition-all duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-black/25 opacity-0 group-hover/photo:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                          <div className="w-7 h-7 rounded-full bg-black/75 border border-[#d4af37] flex items-center justify-center text-[#ffd778] shadow-md">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Chapter Badge & Year */}
                    <div className="flex items-center justify-between mb-2 relative z-20">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/45 text-[9px] font-serif tracking-[0.22em] text-[#ffd778] uppercase font-semibold">
                        {story.chapter}
                      </span>
                      <span className="text-[11px] font-serif tracking-widest text-[#e6ca85] font-semibold">
                        {story.date}
                      </span>
                    </div>

                    {/* Milestone Title */}
                    <h3 
                      className="font-serif text-base sm:text-lg font-bold tracking-[0.12em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] uppercase drop-shadow-sm mb-1.5"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {story.title}
                    </h3>

                    {/* Story Description Text */}
                    <p 
                      className="text-xs sm:text-[13px] text-[#EADFC9] font-serif leading-relaxed italic drop-shadow-sm"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {story.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* 10. WEDDING GIFT (Royal Wayang Gold Masterpiece)     */}
        {/* ==================================================== */}
        <section id="wedding-gift" className="relative w-full min-h-[720px] py-14 sm:py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none">
          {/* Background Joglo Pendopo Royal Night */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Joglo Pendopo Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806] via-[#0c0806]/55 to-[#0c0806]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.12)_0%,_transparent_75%)]" />
          </div>

          <GoldenSparkleDust />

          {/* Top Corner Floral Flourishes */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Symmetrical Flanking Wayang Figures at Bottom */}
          <div className="absolute bottom-2 left-2 sm:left-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamajaya-luxury.png" alt="Raden Kamajaya" className="w-16 sm:w-22 h-auto object-contain" />
          </div>
          <div className="absolute bottom-2 right-2 sm:right-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamaratih-luxury.png" alt="Dewi Kamaratih" className="w-16 sm:w-22 h-auto object-contain -scale-x-100" />
          </div>

          {/* Arched Capsule Card */}
          <div className="relative z-20 w-full max-w-[340px] sm:max-w-[400px] rounded-t-[160px] sm:rounded-t-[180px] rounded-b-[36px] sm:rounded-b-[40px] bg-gradient-to-b from-[#1c120a]/96 via-[#130b07]/98 to-[#0a0604] border-2 border-[#d4af37]/65 shadow-[0_24px_60px_rgba(0,0,0,0.95)] flex flex-col items-center text-center px-5 sm:px-6 pt-16 pb-7 overflow-hidden backdrop-blur-md relative">
            {/* Top Carved Crest */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none z-30">
              <RoyalCapsuleCrestTop className="w-32 sm:w-36 h-10 text-amber-400 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" />
            </div>

            {/* Inner Hairline Frame */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-t-[150px] sm:rounded-t-[170px] rounded-b-[30px] sm:rounded-b-[34px] border border-[#d4af37]/30 pointer-events-none z-10" />

            {/* Content Layer */}
            <div className="relative z-20 flex flex-col items-center w-full my-auto space-y-3.5">
              {/* Header */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center gap-2 mb-1.5">
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                  <span className="text-[#ffd778] text-[9px] filter drop-shadow-[0_0_8px_rgba(212,175,55,0.9)]">✦ ❖ ✦</span>
                  <div className="w-8 sm:w-12 h-px bg-gradient-to-l from-transparent via-[#d4af37]/70 to-[#d4af37]" />
                </div>

                <span className="text-[9.5px] font-serif tracking-[0.3em] text-[#e6ca85] uppercase block font-semibold drop-shadow-sm mb-0.5">
                  TANDA KASIH
                </span>

                <h2 className="text-3xl sm:text-4xl text-center">
                  <span 
                    className="font-serif italic text-3xl sm:text-4xl text-[#FFF4D0] drop-shadow-md"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    Wedding
                  </span>{' '}
                  <span 
                    className="font-cinzel text-2xl sm:text-3xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] uppercase drop-shadow-md"
                  >
                    Gift
                  </span>
                </h2>

                <p 
                  className="text-xs text-[#EADFC9]/85 font-serif italic text-center max-w-[270px] mx-auto leading-relaxed mt-1.5 drop-shadow-sm"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Tanpa mengurangi rasa hormat, bagi rekan-rekan dan sahabat yang hendak memberikan tanda kasih untuk kami, dapat melalui nomor rekening di bawah ini.
                </p>
              </div>

              {/* Bank Cards */}
              <div className="w-full space-y-3 pt-1">
                {displayGifts.map((gift, idx) => (
                  <div 
                    key={idx} 
                    className="w-full rounded-2xl p-3.5 sm:p-4 bg-gradient-to-br from-[#24170d]/95 via-[#190f08]/95 to-[#100804] border border-[#d4af37]/50 hover:border-[#ffd778] shadow-[0_8px_20px_rgba(0,0,0,0.7)] hover:shadow-[0_0_20px_rgba(212,175,55,0.35)] transition-all duration-300 relative overflow-hidden group text-left"
                  >
                    {/* Top Row: Microchip & Provider */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {/* Realistic Gold EMV Microchip */}
                        <div className="w-7 h-5 rounded-[4px] bg-gradient-to-br from-[#ffd778] via-[#e5c158] to-[#8c671a] p-0.5 shadow-sm border border-[#ffd778]/70 flex items-center justify-center relative overflow-hidden">
                          <div className="w-full h-px bg-[#4a3505] opacity-60" />
                          <div className="h-full w-px bg-[#4a3505] opacity-60 absolute" />
                          <div className="w-2.5 h-2 rounded-[2px] border border-[#4a3505]/60 absolute" />
                        </div>
                        <span className="font-serif font-bold text-xs tracking-wider text-[#ffd778] uppercase">
                          {gift.provider}
                        </span>
                      </div>
                      <span className="text-[9px] font-mono tracking-widest text-[#d4af37]/75 uppercase px-2 py-0.5 rounded bg-[#d4af37]/10 border border-[#d4af37]/30">
                        DEBIT
                      </span>
                    </div>

                    {/* Middle Row: Account Number in luxury tracking */}
                    <div className="my-1.5 py-0.5">
                      <p className="font-mono text-sm sm:text-base font-bold tracking-[0.16em] text-[#FFF8D6] drop-shadow-sm select-all">
                        {gift.account_number}
                      </p>
                    </div>

                    {/* Bottom Row: Account Holder & Copy Action */}
                    <div className="flex items-end justify-between pt-2 border-t border-[#d4af37]/25">
                      <div>
                        <span className="text-[8.5px] font-serif uppercase tracking-widest text-[#d4af37]/80 block mb-0.5">
                          Atas Nama
                        </span>
                        <p className="text-xs font-serif font-bold text-white tracking-wide">
                          {gift.account_name}
                        </p>
                      </div>

                      <button
                        onClick={() => handleCopyText(gift.account_number, `No. Rekening ${gift.provider}`, `gift-${idx}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/25 to-[#ffd778]/30 hover:from-[#d4af37] hover:to-[#ecc460] border border-[#d4af37] text-[#ffd778] hover:text-stone-950 font-serif text-[10.5px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                      >
                        {copiedKey === `gift-${idx}` ? (
                          <>
                            <Check size={11} className="stroke-[3]" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <span>Copy Rekening</span>
                            <Copy size={11} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Heart Divider */}
              <div className="flex items-center justify-center gap-2.5 w-3/4 mx-auto my-1">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
                <Heart size={11} className="fill-[#ffd778] text-[#ffd778] shrink-0" />
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent" />
              </div>

              {/* Physical Gift Section */}
              <div className="w-full rounded-2xl p-4 bg-gradient-to-br from-[#24170d]/95 via-[#190f08]/95 to-[#100804] border border-[#d4af37]/50 hover:border-[#ffd778] shadow-[0_8px_20px_rgba(0,0,0,0.7)] text-center relative overflow-hidden group">
                <div className="w-8 h-8 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/50 mx-auto flex items-center justify-center text-[#ffd778] mb-1.5 shadow-inner">
                  <Gift size={18} />
                </div>
                <p className="text-[9.5px] font-serif uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-1">
                  KIRIM KADO
                </p>
                <p className="text-xs sm:text-sm font-serif font-bold text-[#FFF8D6] tracking-wide mb-1">
                  {giftRecipient}
                </p>
                <p className="text-[11px] text-[#EADFC9]/90 font-serif leading-relaxed max-w-[260px] mx-auto mb-2.5 italic">
                  {giftAddress}
                </p>
                <button
                  onClick={() => handleCopyText(giftAddress, 'Alamat Pengiriman Kado', 'gift-address')}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/25 to-[#ffd778]/30 hover:from-[#d4af37] hover:to-[#ecc460] border border-[#d4af37] text-[#ffd778] hover:text-stone-950 font-serif text-[10.5px] font-bold tracking-wider uppercase transition-all duration-300 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                >
                  {copiedKey === 'gift-address' ? (
                    <>
                      <Check size={11} className="stroke-[3]" />
                      <span>Alamat Tersalin</span>
                    </>
                  ) : (
                    <>
                      <span>Copy Alamat</span>
                      <Copy size={11} />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* 11. RSVP & WISHES (Royal Wayang Gold Masterpiece)    */}
        {/* ==================================================== */}
        <section id="rsvp" className="relative w-full min-h-[780px] py-14 sm:py-16 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none">
          {/* Background Joglo Pendopo Royal Night */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Joglo Pendopo Royal Background" 
              className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806] via-[#0c0806]/60 to-[#0c0806]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18)_0%,_rgba(180,120,20,0.08)_50%,_transparent_80%)]" />
          </div>

          <GoldenSparkleDust />

          {/* Top Corner Floral Flourishes */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Symmetrical Flanking Wayang Figures */}
          <div className="absolute bottom-2 left-2 sm:left-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamajaya-luxury.png" alt="Raden Kamajaya" className="w-16 sm:w-22 h-auto object-contain" />
          </div>
          <div className="absolute bottom-2 right-2 sm:right-4 z-10 pointer-events-none opacity-40 hover:opacity-75 transition-opacity drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <img src="/themes/royal-kamaratih-luxury.png" alt="Dewi Kamaratih" className="w-16 sm:w-22 h-auto object-contain -scale-x-100" />
          </div>

          {/* Arched Capsule Card */}
          <div className="relative z-20 w-full max-w-[340px] sm:max-w-[400px] rounded-t-[160px] sm:rounded-t-[180px] rounded-b-[36px] sm:rounded-b-[40px] bg-gradient-to-b from-[#24170d]/98 via-[#160e07]/98 to-[#090503] border-2 border-[#d4af37]/75 shadow-[0_24px_70px_rgba(0,0,0,0.98),_0_0_35px_rgba(212,175,55,0.2)] flex flex-col items-center text-center px-5 sm:px-6 pt-16 pb-7 overflow-visible backdrop-blur-md">
            {/* Top Carved 3D Royal Mahkota Crest */}
            <div className="absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 pointer-events-none z-30 flex flex-col items-center">
              <img 
                src="/themes/royal-crown-luxury.png" 
                alt="Mahkota Keraton" 
                className="w-22 sm:w-26 h-auto object-contain filter drop-shadow-[0_8px_20px_rgba(212,175,55,0.7)]" 
              />
            </div>

            {/* Inner Hairline Frame */}
            <div className="absolute inset-2 sm:inset-2.5 rounded-t-[150px] sm:rounded-t-[170px] rounded-b-[30px] sm:rounded-b-[34px] border border-[#d4af37]/40 shadow-[inset_0_0_30px_rgba(212,175,55,0.08)] pointer-events-none z-10" />

            {/* Content Layer */}
            <div className="relative z-20 flex flex-col items-center w-full my-auto space-y-4">
              {/* Header */}
              <div className="flex flex-col items-center">
                {/* Gilded Tag Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#ffd778]/30 to-[#d4af37]/20 border border-[#ffd778]/50 shadow-[0_2px_12px_rgba(0,0,0,0.6)] mb-1">
                  <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
                  <span className="text-[10px] sm:text-[10.5px] font-serif tracking-[0.32em] text-[#FFF6D8] uppercase font-bold drop-shadow-sm">
                    KONFIRMASI KEHADIRAN
                  </span>
                  <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
                </div>

                <h2 className="text-3xl sm:text-4xl text-center leading-tight">
                  <span 
                    className="font-serif italic text-3xl sm:text-4xl text-[#FFF7DC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    RSVP &amp;
                  </span>{' '}
                  <span className="font-cinzel text-3xl sm:text-4xl font-extrabold tracking-[0.16em] text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF2] via-[#FCE38A] via-[#ECC460] to-[#C99126] uppercase drop-shadow-[0_4px_18px_rgba(212,175,55,0.6)]">
                    Wishes
                  </span>
                </h2>

                <div className="flex items-center justify-center gap-2.5 my-2 w-full max-w-[220px]">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd778]/80 to-[#d4af37]" />
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#ffd778] shadow-[0_0_8px_#ffd778]" />
                  <span className="text-[#ffd778] text-[11px] filter drop-shadow-[0_0_6px_rgba(255,215,120,0.8)]">❖</span>
                  <div className="w-1.5 h-1.5 rotate-45 bg-[#ffd778] shadow-[0_0_8px_#ffd778]" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#ffd778]/80 to-[#d4af37]" />
                </div>

                <p className="text-[12px] sm:text-[13px] text-[#ebe0cd]/95 font-serif italic text-center max-w-[290px] leading-relaxed mx-auto">
                  &ldquo;Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir serta memberikan doa restu.&rdquo;
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleRsvpSubmit} className="w-full space-y-3.5 text-left">
                {/* Nama Lengkap */}
                <div>
                  <label className="flex items-center justify-between text-[12px] font-serif text-[#FBF5D8] mb-1.5 font-medium tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#ffd778] text-xs">✦</span>
                      <span>Nama Lengkap</span>
                      <span className="text-amber-400 font-bold">*</span>
                    </span>
                    <span className="text-[10px] text-[#ecc460]/90 font-sans tracking-wider px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40">
                      {rsvpName.length}/100
                    </span>
                  </label>
                  <div className="relative w-full flex items-center rounded-xl bg-gradient-to-b from-[#26190f]/95 via-[#1b1008]/95 to-[#120a05]/98 border border-[#d4af37]/55 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85),_0_2px_8px_rgba(0,0,0,0.6)] focus-within:border-[#ffd778] focus-within:shadow-[0_0_16px_rgba(212,175,55,0.4),_inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all overflow-hidden">
                    <div className="pl-3.5 pr-2.5 py-3 flex items-center justify-center text-[#e5c158] border-r border-[#d4af37]/25 shrink-0">
                      <User size={15} className="filter drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                    </div>
                    <input
                      type="text"
                      required
                      maxLength={100}
                      value={rsvpName}
                      onChange={(e) => setRsvpName(e.target.value)}
                      placeholder="Contoh: Bpk. Bambang & Keluarga"
                      className="w-full px-3 py-2.5 bg-transparent text-[#FFF8D6] text-xs sm:text-sm placeholder-[#c5a880]/50 focus:outline-none font-serif tracking-wide"
                    />
                  </div>
                </div>

                {/* Status Kehadiran */}
                <div>
                  <label className="flex items-center gap-1.5 text-[12px] font-serif text-[#FBF5D8] mb-1.5 font-medium tracking-wide">
                    <span className="text-[#ffd778] text-xs">✦</span>
                    <span>Status Kehadiran</span>
                    <span className="text-amber-400 font-bold">*</span>
                  </label>
                  <div className="relative w-full flex items-center rounded-xl bg-gradient-to-b from-[#26190f]/95 via-[#1b1008]/95 to-[#120a05]/98 border border-[#d4af37]/55 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85),_0_2px_8px_rgba(0,0,0,0.6)] focus-within:border-[#ffd778] focus-within:shadow-[0_0_16px_rgba(212,175,55,0.4)] transition-all overflow-hidden">
                    <div className="pl-3.5 pr-2.5 py-3 flex items-center justify-center text-[#e5c158] border-r border-[#d4af37]/25 shrink-0">
                      <CheckCircle2 size={15} className="filter drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                    </div>
                    <select
                      value={rsvpAttendance}
                      onChange={(e) => setRsvpAttendance(e.target.value)}
                      className="w-full appearance-none px-3 py-2.5 bg-transparent text-[#FFF8D6] text-xs sm:text-sm focus:outline-none pr-10 cursor-pointer font-serif tracking-wide"
                    >
                      <option value="hadir" className="bg-[#1c120a] text-[#FFF8D6] py-2">✓ Hadir Memenuhi Undangan</option>
                      <option value="tidak" className="bg-[#1c120a] text-[#FFF8D6] py-2">✕ Berhalangan Hadir</option>
                      <option value="ragu" className="bg-[#1c120a] text-[#FFF8D6] py-2">? Masih Ragu-ragu</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#ecc460] pointer-events-none filter drop-shadow" />
                  </div>
                </div>

                {/* Jumlah Tamu (Conditional when Hadir) */}
                {rsvpAttendance === 'hadir' && (
                  <div>
                    <label className="flex items-center gap-1.5 text-[12px] font-serif text-[#FBF5D8] mb-1.5 font-medium tracking-wide">
                      <Users size={13} className="text-[#ffd778]" />
                      <span>Jumlah Tamu yang Hadir</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
                      {[
                        { val: '1', label: '1 Orang' },
                        { val: '2', label: '2 Orang' },
                        { val: '3', label: '3+ Orang' },
                      ].map((opt) => {
                        const isSelected = rsvpGuests === opt.val;
                        return (
                          <button
                            type="button"
                            key={opt.val}
                            onClick={() => setRsvpGuests(opt.val)}
                            className={`py-2 px-3 rounded-xl text-xs font-serif font-bold transition-all flex items-center justify-center gap-1.5 relative overflow-hidden cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] via-[#B38728] to-[#AA771C] text-stone-950 shadow-[0_4px_16px_rgba(212,175,55,0.6),_inset_0_1px_1px_rgba(255,255,255,0.9)] border border-[#FFF6D8] scale-[1.02]'
                                : 'bg-gradient-to-b from-[#24170d]/90 to-[#140b06]/95 border border-[#d4af37]/45 text-[#e5d8c3] hover:border-[#ffd778] hover:text-[#FFF8D6] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]'
                            }`}
                          >
                            {isSelected && <span className="text-[10px]">✓</span>}
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Ucapan/Pesan */}
                <div>
                  <label className="flex items-center justify-between text-[12px] font-serif text-[#FBF5D8] mb-1.5 font-medium tracking-wide">
                    <span className="flex items-center gap-1.5">
                      <span className="text-[#ffd778] text-xs">✦</span>
                      <span>Ucapan &amp; Doa Restu</span>
                    </span>
                    <span className="text-[10px] text-[#ecc460]/90 font-sans tracking-wider px-2 py-0.5 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40">
                      {rsvpMessage.length}/500
                    </span>
                  </label>
                  <div className="relative w-full flex rounded-xl bg-gradient-to-b from-[#26190f]/95 via-[#1b1008]/95 to-[#120a05]/98 border border-[#d4af37]/55 shadow-[inset_0_2px_6px_rgba(0,0,0,0.85),_0_2px_8px_rgba(0,0,0,0.6)] focus-within:border-[#ffd778] focus-within:shadow-[0_0_16px_rgba(212,175,55,0.4),_inset_0_2px_4px_rgba(0,0,0,0.8)] transition-all overflow-hidden">
                    <div className="pt-3 pl-3.5 pr-2.5 flex items-start justify-center text-[#e5c158] border-r border-[#d4af37]/25 shrink-0">
                      <Sparkles size={15} className="filter drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
                    </div>
                    <textarea
                      rows={3}
                      maxLength={500}
                      value={rsvpMessage}
                      onChange={(e) => setRsvpMessage(e.target.value)}
                      placeholder="Tuliskan ucapan selamat & doa restu tulus Anda untuk kedua mempelai..."
                      className="w-full px-3 py-2.5 bg-transparent text-[#FFF8D6] text-xs sm:text-sm placeholder-[#c5a880]/50 focus:outline-none resize-none leading-relaxed font-serif tracking-wide"
                    />
                  </div>
                </div>

                {/* 24K Prada Gold Bar Submit Button */}
                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    disabled={rsvpSubmitting}
                    className="relative group overflow-hidden w-full max-w-[290px] py-3.5 px-8 rounded-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] via-[#B38728] via-[#FBF5B7] to-[#AA771C] hover:brightness-110 active:scale-95 text-[#181005] font-serif font-black uppercase tracking-[0.22em] text-xs shadow-[0_8px_30px_rgba(212,175,55,0.6),_inset_0_1px_2px_rgba(255,255,255,0.95),_inset_0_-2px_4px_rgba(100,60,10,0.6)] transition-all cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2.5 mx-auto border-2 border-[#FFF2B8]"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
                    {rsvpSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="inline-block w-3.5 h-3.5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                        <span>Mengirimkan Doa...</span>
                      </span>
                    ) : (
                      <>
                        <span className="drop-shadow-sm font-bold tracking-[0.22em]">KIRIM KONFIRMASI</span>
                        <Send size={14} className="text-[#181005] stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </div>
              </form>

              {/* Wishes Feed (Doa & Ucapan) Toggle Accordion */}
              <div className="w-full pt-5 mt-3 border-t-2 border-[#d4af37]/35 flex flex-col items-center">
                {/* Clickable Header Button to Toggle / Tampilkan */}
                <button
                  type="button"
                  onClick={() => setShowWishes(prev => !prev)}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#26190f]/95 via-[#190f08]/98 to-[#26190f]/95 border border-[#d4af37]/50 hover:border-[#ffd778] active:scale-[0.99] transition-all flex items-center justify-between shadow-[0_4px_14px_rgba(0,0,0,0.6)] cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c671a] flex items-center justify-center shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                      <MessageCircle size={13} className="text-stone-950 stroke-[2.5]" />
                    </div>
                    <span className="text-xs font-serif font-bold tracking-[0.16em] text-[#FFF4D0] uppercase">
                      Buku Tamu &amp; Doa
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gradient-to-r from-[#d4af37]/25 to-[#ffd778]/30 border border-[#ffd778]/40 text-[#FFF9DF] font-sans font-bold">
                      {displayWishes.length}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#ffd778] text-[11px] font-serif font-semibold">
                    <span>{showWishes ? 'Sembunyikan' : 'Tampilkan'}</span>
                    {showWishes ? (
                      <ChevronUp size={15} className="transition-transform text-[#ffd778]" />
                    ) : (
                      <ChevronDown size={15} className="transition-transform group-hover:translate-y-0.5 text-[#ffd778]" />
                    )}
                  </div>
                </button>

                {/* Wishes Feed List (Hanya tampil saat tombol Tampilkan diklik) */}
                {showWishes && (
                  <div className="w-full space-y-3 max-h-60 overflow-y-auto pr-1 text-left mt-3.5 pt-1 animate-in fade-in slide-in-from-top-2 duration-300">
                    {displayWishes.map((item, idx) => (
                      <div 
                        key={item.id || idx} 
                        className="p-3.5 rounded-xl bg-gradient-to-b from-[#24170d]/95 via-[#180f08]/95 to-[#100804]/98 border border-[#d4af37]/50 text-xs space-y-2 shadow-[0_4px_16px_rgba(0,0,0,0.7)] hover:border-[#ffd778] transition-all relative overflow-hidden group"
                      >
                        {/* Gold Accent Left Bar */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ffd778] via-[#d4af37] to-[#8c671a]" />
                        
                        <div className="flex items-center justify-between gap-2 pl-1.5">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#d4af37] to-[#6d4c13] text-stone-950 font-bold flex items-center justify-center text-[10px] shadow-sm shrink-0">
                              {item.name.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-serif font-bold text-[#FFF6D8] truncate text-[12.5px] tracking-wide">
                              {item.name}
                            </span>
                          </div>
                          
                          <span className={`text-[9.5px] px-2.5 py-0.5 rounded-full font-serif font-semibold whitespace-nowrap shadow-sm ${
                            item.attending 
                              ? 'bg-gradient-to-r from-emerald-950/90 to-emerald-900/90 text-emerald-200 border border-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                              : 'bg-gradient-to-r from-amber-950/90 to-amber-900/90 text-amber-200 border border-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]'
                          }`}>
                            {item.attending ? '✓ Hadir' : 'Berhalangan'}
                          </span>
                        </div>
                        
                        <p className="text-[#efe5d5]/95 font-serif italic text-[12px] leading-relaxed pl-1.5 break-words">
                          &ldquo;{item.message}&rdquo;
                        </p>
                        
                        {item.created_at && (
                          <p className="text-[9.5px] text-[#ecc460]/75 font-sans text-right pt-0.5 pr-1">
                            {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================== */}
        {/* TURUT MENGUNDANG (Royal Wayang Gold)                 */}
        {/* ==================================================== */}
        {invitation?.settings?.turut_mengundang && invitation.settings.turut_mengundang.length > 0 && (
          <section id="turut-mengundang" className="relative w-full py-10 px-4 flex flex-col items-center justify-center overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none">
            <div className="relative z-10 w-[92%] max-w-[360px] p-6 rounded-2xl bg-gradient-to-b from-[#24170d]/95 via-[#190f08]/95 to-[#100804] border border-[#d4af37]/60 shadow-[0_12px_32px_rgba(0,0,0,0.85)] text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 mb-2.5">
                <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
                <span className="text-[10px] font-serif tracking-[0.25em] text-[#FFF4CC] uppercase font-bold">
                  KELUARGA BESAR
                </span>
                <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
              </div>

              <h3 
                className="font-serif font-bold text-lg sm:text-xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] tracking-wider uppercase mb-3.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                TURUT MENGUNDANG
              </h3>

              <div className="space-y-2.5 flex flex-col items-center">
                {invitation.settings.turut_mengundang.map((name: string, idx: number) => (
                  <p 
                    key={idx} 
                    className="text-xs sm:text-sm text-[#EADFC9] font-serif flex items-center justify-center gap-2"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    <span className="text-[#ffd778] font-bold text-xs">ꕥ</span>
                    <span>{name}</span>
                  </p>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ==================================================== */}
        {/* 13. CLOSING (TERIMA KASIH)                           */}
        {/* ==================================================== */}
        <section id="closing" className="relative w-full min-h-[100dvh] py-8 sm:py-10 px-4 flex flex-col justify-between items-center text-center overflow-hidden bg-[#0c0806] border-t border-amber-500/20 select-none pb-6">
          {/* Background Joglo Pendopo with Radial Vignette */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <img 
              src="/themes/royal-wayang-bg.jpg" 
              alt="Royal Joglo Pendopo Closing" 
              className="w-full h-full object-cover object-center filter brightness-[0.60] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0c0806]/85 via-transparent to-[#0c0806]/90" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0a0705]/40 to-[#080503]/85" />
          </div>

          <GoldenSparkleDust />

          {/* Top Corner Floral Flourishes */}
          <div className="absolute top-1 left-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain" />
          </div>
          <div className="absolute top-1 right-1 w-16 sm:w-20 pointer-events-none z-10 opacity-75 drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
            <img src="/themes/royal-floral-corner-luxury.png" alt="" className="w-full h-auto object-contain -scale-x-100" />
          </div>

          {/* Top Header Above Baroque Frame (Agak besar, rapi, premium, keren) */}
          <div className="relative z-20 pt-2 sm:pt-4 px-2 flex flex-col items-center text-center max-w-[340px] sm:max-w-[380px] mx-auto space-y-1 mb-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#d4af37]/20 via-[#ffd778]/30 to-[#d4af37]/20 border border-[#ffd778]/50 shadow-[0_2px_12px_rgba(0,0,0,0.6)] mb-1">
              <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
              <span className="text-[10px] font-serif tracking-[0.3em] text-[#FFF6D8] uppercase font-bold drop-shadow-sm">
                UNGKAPAN TERIMA KASIH
              </span>
              <span className="text-[#ffd778] text-[9px] animate-pulse">✦</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif text-center tracking-wide leading-tight">
              <span 
                className="italic text-3xl sm:text-4xl text-[#FFF7DC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Matur
              </span>{' '}
              <span className="font-cinzel font-extrabold tracking-[0.18em] uppercase text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF2] via-[#FCE38A] via-[#ECC460] to-[#C99126] drop-shadow-[0_4px_18px_rgba(212,175,55,0.6)]">
                Nuwun
              </span>
            </h2>

            <div className="flex items-center justify-center gap-2.5 my-1.5 w-full max-w-[200px] mx-auto">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#ffd778]/80 to-[#d4af37]" />
              <div className="w-1.5 h-1.5 rotate-45 bg-[#ffd778] shadow-[0_0_8px_#ffd778]" />
              <span className="text-[#ffd778] text-[11px] filter drop-shadow-[0_0_6px_rgba(255,215,120,0.8)]">❖</span>
              <div className="w-1.5 h-1.5 rotate-45 bg-[#ffd778] shadow-[0_0_8px_#ffd778]" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-[#ffd778]/80 to-[#d4af37]" />
            </div>

            <p className="text-[12px] sm:text-[13px] text-[#efe5d5]/95 font-serif italic text-center leading-relaxed drop-shadow-sm">
              &ldquo;{invitation?.settings?.closing_greeting || "Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian."}&rdquo;
            </p>
          </div>

          {/* Center 3D Baroque Frame with Couple Photo */}
          <div className="relative z-10 w-[78%] max-w-[310px] sm:max-w-[340px] aspect-[896/1200] max-h-[52vh] sm:max-h-[55vh] mx-auto flex flex-col items-center justify-center my-auto">
            {/* Foto Mempelai dalam Kubah Lengkung */}
            <div className="absolute top-[22%] left-[17%] right-[17%] bottom-[14%] rounded-t-[90px] overflow-hidden z-10 bg-[#160f09] shadow-inner">
              <img 
                src={couplePhoto} 
                alt={`${groomName} & ${brideName}`} 
                className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.03]"
              />
            </div>

            {/* 3D Carved Gold Baroque Arch Frame */}
            <img 
              src="/themes/royal-baroque-frame-luxury.png" 
              alt="Royal Baroque Gold Arch Frame" 
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 filter drop-shadow-[0_12px_32px_rgba(0,0,0,0.95)]" 
            />

            {/* Plaque Terima Kasih & Nama Mempelai */}
            <div className="absolute bottom-[8%] left-[10%] right-[10%] py-2 sm:py-2.5 px-3 rounded-lg bg-gradient-to-b from-[#25180c]/95 via-[#180f05]/98 to-[#0b0703] border border-[#d4af37]/75 backdrop-blur-md text-center shadow-[0_8px_25px_rgba(0,0,0,0.95)] z-30">
              <p 
                className="font-serif italic text-xs sm:text-sm text-[#F3DEB0] mb-0.5 drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Kami yang Berbahagia
              </p>
              <h3 
                className="font-serif text-sm sm:text-base font-bold tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5C2] via-[#ECC460] to-[#FFEAA0] drop-shadow-sm"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {invitation?.settings?.closing_couple_name || `${groomName} & ${brideName}`}
              </h3>
              <p className="text-[7.5px] sm:text-[8px] text-stone-300/80 font-serif tracking-widest uppercase mt-0.5">
                Beserta Keluarga Besar
              </p>
            </div>
          </div>

          {/* Wayang Flanks */}
          <div className="absolute bottom-6 left-2 sm:left-4 z-15 pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] opacity-85">
            <img 
              src="/themes/royal-kamajaya-luxury.png" 
              alt="Wayang Raden Kamajaya" 
              className="w-20 sm:w-28 h-auto object-contain" 
            />
          </div>
          <div className="absolute bottom-6 right-2 sm:right-4 z-15 pointer-events-none drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)] opacity-85">
            <img 
              src="/themes/royal-kamaratih-luxury.png" 
              alt="Wayang Dewi Kamaratih" 
              className="w-20 sm:w-28 h-auto object-contain -scale-x-100" 
            />
          </div>

          {/* Bottom Watermark / Copyright */}
          <div className="relative z-20 text-[9px] text-stone-400/60 font-mono tracking-widest uppercase mt-3">
            {invitation?.settings?.powered_by_url ? (
              <a href={invitation.settings.powered_by_url} target="_blank" rel="noopener noreferrer" className="hover:text-[#ffd778] transition-colors">
                {invitation?.settings?.powered_by || "WD Group • Royal Wayang Gold Edition"}
              </a>
            ) : (
              <span>{invitation?.settings?.powered_by || "WD Group • Royal Wayang Gold Edition"}</span>
            )}
          </div>
        </section>

      </div>

      {/* Lightbox Modal for Photo Gallery */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl max-h-[88vh] rounded-2xl overflow-hidden border-2 border-[#d4af37]/60 shadow-[0_20px_60px_rgba(0,0,0,0.95)] bg-[#080503]"
          >
            <img src={selectedPhoto} alt="Preview Foto" className="w-full h-full max-h-[82vh] object-contain" />
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 p-2 rounded-full bg-black/75 border border-[#d4af37]/50 text-[#ffd778] hover:bg-black/95 transition-colors shadow-lg cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Virtual Photobooth Modal */}
      {isPhotoboothOpen && (
        <div 
          onClick={() => setIsPhotoboothOpen(false)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-sm w-full rounded-[28px] bg-gradient-to-b from-[#1f150d] via-[#120c07] to-[#0a0604] border-2 border-[#d4af37]/60 p-6 text-center shadow-[0_25px_60px_rgba(0,0,0,0.95)] text-white space-y-4"
          >
            <button 
              onClick={() => setIsPhotoboothOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-black/60 border border-[#d4af37]/40 text-[#ffd778] hover:bg-black/90 transition-colors"
            >
              <X size={18} />
            </button>

            <div className="flex items-center justify-center gap-1.5 mb-1">
              <span className="text-[#ffd778] text-[9px]">✦ ❖ ✦</span>
            </div>

            <h3 
              className="font-serif text-xl font-bold tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8D6] via-[#ECC460] to-[#FFEAA0] uppercase"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Virtual Photobooth
            </h3>

            <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-[#d4af37]/50 relative shadow-2xl">
              <img src="/photos/photo-8.jpg" alt="Photobooth Frame" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 border-2 border-[#d4af37]/40 rounded-2xl pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 text-center pointer-events-none bg-gradient-to-t from-black/90 via-black/60 to-transparent py-2.5">
                <p 
                  className="font-serif text-sm font-bold text-[#ffd778] tracking-[0.2em] uppercase"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  {groomName} &amp; {brideName}
                </p>
                <p className="text-[10px] text-stone-300 font-serif tracking-widest uppercase">The Royal Wedding</p>
              </div>
            </div>

            <p className="text-xs text-[#EADFC9] font-serif leading-relaxed italic">
              Fitur virtual photobooth dapat langsung digunakan untuk berfoto bersama bingkai eksklusif pernikahan kami.
            </p>

            <button
              onClick={() => {
                toast.success('Kamera photobooth siap!');
                setIsPhotoboothOpen(false);
              }}
              className="w-full py-3 rounded-full border border-[#d4af37] bg-gradient-to-r from-[#d4af37] via-[#ecc460] to-[#d4af37] text-stone-950 font-serif font-bold text-xs tracking-[0.2em] uppercase shadow-[0_4px_16px_rgba(212,175,55,0.4)] hover:brightness-110 active:scale-95 transition-all cursor-pointer"
            >
              MULAI BERFOTO
            </button>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {selectedCalendarEvent && (
        <CalendarReminderModal 
          isOpen={isCalendarModalOpen}
          onClose={() => setIsCalendarModalOpen(false)}
          event={selectedCalendarEvent}
          themeStyle="gold"
        />
      )}

    </div>
  );
};
