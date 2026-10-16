import React, { useState, useEffect, useRef } from 'react';
import { 
  Calendar, MapPin, Copy, Check, ExternalLink, 
  ChevronLeft, ChevronRight, ChevronDown, Gift,
  X, FileText, Video, Navigation, QrCode,
  Clock, Heart, Sparkles, Compass, ShieldCheck,
  Crown, Star, Award, CreditCard, Send, Wifi,
  Maximize2, Package, MessageCircle
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext';
import { CalendarReminderModal } from '../../../components/CalendarReminderModal';
import { CalendarEventData } from '../../../utils/calendar';
import { rsvpService, RSVPItem } from '../../../services/rsvpService';
import { loadSavedBarcodePass, saveBarcodePass, generateStableBarcodeCode, clearBarcodePass } from '../../../utils/barcodePass';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 16, className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Victorian Royal Gilded Acanthus Corner Ornaments for High-End Folios
export const NirwanaGoldCorner: React.FC<{ color?: string; size?: number; className?: string }> = ({ 
  color = '#C5A059', 
  size = 52,
  className = ''
}) => (
  <>
    {/* Top Left */}
    <div className={`absolute top-2 left-2 pointer-events-none opacity-90 z-20 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <defs>
          <linearGradient id="goldCornerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF2" />
            <stop offset="35%" stopColor="#E5CBA0" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
        </defs>
        {/* Outer Corner Frame Lines with Finials */}
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#goldCornerGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#goldCornerGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        {/* Corner Blossom / Fleur-de-lis Knot */}
        <circle cx="12" cy="12" r="3" fill="url(#goldCornerGrad)" />
        <circle cx="12" cy="12" r="1.2" fill="#FFFDF8" />
        {/* Acanthus / Scrolling Leaf Tendril */}
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        {/* Diagonal Ray & Star Jewel */}
        <path d="M12 12 L34 34" stroke="url(#goldCornerGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M34 34 C31 32, 28 35, 30 38 C32 41, 37 38, 34 34 Z" fill="url(#goldCornerGrad)" />
        {/* Fine Filigree Pearls */}
        <circle cx="24" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="38" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="24" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="38" r="1.4" fill="url(#goldCornerGrad)" />
      </svg>
    </div>
    {/* Top Right */}
    <div className={`absolute top-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#goldCornerGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#goldCornerGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#goldCornerGrad)" />
        <circle cx="12" cy="12" r="1.2" fill="#FFFDF8" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#goldCornerGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M34 34 C31 32, 28 35, 30 38 C32 41, 37 38, 34 34 Z" fill="url(#goldCornerGrad)" />
        <circle cx="24" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="38" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="24" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="38" r="1.4" fill="url(#goldCornerGrad)" />
      </svg>
    </div>
    {/* Bottom Left */}
    <div className={`absolute bottom-2 left-2 pointer-events-none opacity-90 z-20 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#goldCornerGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#goldCornerGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#goldCornerGrad)" />
        <circle cx="12" cy="12" r="1.2" fill="#FFFDF8" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#goldCornerGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M34 34 C31 32, 28 35, 30 38 C32 41, 37 38, 34 34 Z" fill="url(#goldCornerGrad)" />
        <circle cx="24" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="38" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="24" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="38" r="1.4" fill="url(#goldCornerGrad)" />
      </svg>
    </div>
    {/* Bottom Right */}
    <div className={`absolute bottom-2 right-2 pointer-events-none opacity-90 z-20 -scale-x-100 -scale-y-100 ${className}`} style={{ width: size, height: size, color }}>
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full drop-shadow-xs">
        <path d="M4 60 L4 12 C4 7.5, 7.5 4, 12 4 L60 4" stroke="url(#goldCornerGrad)" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M8 52 L8 16 C8 11.5, 11.5 8, 16 8 L52 8" stroke="url(#goldCornerGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
        <circle cx="12" cy="12" r="3" fill="url(#goldCornerGrad)" />
        <circle cx="12" cy="12" r="1.2" fill="#FFFDF8" />
        <path d="M12 12 C18 18, 28 22, 40 18 C30 25, 20 28, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 C18 18, 22 28, 18 40 C25 30, 28 20, 12 12 Z" fill="url(#goldCornerGrad)" opacity="0.9" />
        <path d="M12 12 L34 34" stroke="url(#goldCornerGrad)" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M34 34 C31 32, 28 35, 30 38 C32 41, 37 38, 34 34 Z" fill="url(#goldCornerGrad)" />
        <circle cx="24" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="38" cy="6" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="24" r="1.4" fill="url(#goldCornerGrad)" />
        <circle cx="6" cy="38" r="1.4" fill="url(#goldCornerGrad)" />
      </svg>
    </div>
  </>
);

// Realistic 24K Gold EMV Smart Microchip with Contact Circuitry
export const EMVGoldSmartChip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`relative w-12 h-9 rounded-md bg-gradient-to-br from-[#FFE8A3] via-[#D4AF37] to-[#8C6D2B] p-[1.5px] shadow-[0_3px_8px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.6)] border border-[#FFF4D9]/80 ${className}`}>
    <div className="w-full h-full rounded-[3px] bg-gradient-to-br from-[#E8CD8C] via-[#C5A059] to-[#997732] relative overflow-hidden flex items-center justify-center">
      {/* Precision Micro-Etched Contact Traces */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#6B4F1A]/80 shadow-[0_0.5px_0_rgba(255,255,255,0.4)]" />
      <div className="absolute inset-y-0 left-[36%] w-[1px] bg-[#6B4F1A]/80 shadow-[0.5px_0_0_rgba(255,255,255,0.4)]" />
      <div className="absolute inset-y-0 right-[36%] w-[1px] bg-[#6B4F1A]/80 shadow-[0.5px_0_0_rgba(255,255,255,0.4)]" />
      {/* Center Microcontroller Pad */}
      <div className="w-3.5 h-3.5 rounded-[2px] border border-[#6B4F1A]/80 bg-gradient-to-br from-[#FFF0C0] to-[#C5A059] shadow-inner" />
      {/* Corner Contact Grooves */}
      <div className="absolute top-1 left-1 w-1 h-1 rounded-full bg-[#6B4F1A]/60" />
      <div className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#6B4F1A]/60" />
      <div className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-[#6B4F1A]/60" />
      <div className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-[#6B4F1A]/60" />
    </div>
  </div>
);

// Banknote Guilloché Rosette Parchment Watermark (Tactile Luxury Texture)
export const GuillocheParchmentWatermark: React.FC<{ opacity?: number; className?: string }> = ({
  opacity = 0.07,
  className = ''
}) => (
  <div 
    className={`absolute inset-0 pointer-events-none overflow-hidden rounded-3xl select-none z-0 ${className}`}
    style={{ opacity }}
  >
    <svg viewBox="0 0 400 600" fill="none" className="w-full h-full text-[#C5A059]">
      <g stroke="currentColor" strokeWidth="0.8">
        <circle cx="200" cy="300" r="140" strokeDasharray="3 3" />
        <circle cx="200" cy="300" r="110" />
        <circle cx="200" cy="300" r="80" strokeDasharray="4 2" />
        <circle cx="200" cy="300" r="50" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(0 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(30 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(60 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(90 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(120 200 300)" />
        <ellipse cx="200" cy="300" rx="90" ry="30" transform="rotate(150 200 300)" />
        <path d="M40 80 Q200 20 360 80" strokeWidth="1" />
        <path d="M40 520 Q200 580 360 520" strokeWidth="1" />
      </g>
    </svg>
  </div>
);

// Royal Calligraphic Flourish Underline (Symmetrical Spiraling Ribbon with Diamond Jewel)
export const RoyalCalligraphicDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center w-full max-w-[280px] mx-auto select-none ${className}`}>
    <svg viewBox="0 0 280 28" fill="none" className="w-full h-auto drop-shadow-xs">
      <defs>
        <linearGradient id="calliGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="30%" stopColor="#E8CD8C" />
          <stop offset="70%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8C6D2B" />
        </linearGradient>
      </defs>
      {/* Center 4-Point Diamond Jewel */}
      <path d="M140 6 L143.5 14 L140 22 L136.5 14 Z" fill="url(#calliGoldGrad)" />
      <circle cx="140" cy="14" r="1.5" fill="#FFFDF5" />
      <circle cx="130" cy="14" r="1.8" fill="url(#calliGoldGrad)" />
      <circle cx="150" cy="14" r="1.8" fill="url(#calliGoldGrad)" />

      {/* Left Calligraphic Swirl */}
      <path d="M124 14 C105 14, 85 8, 65 14 C52 18, 44 12, 38 6 C32 0, 24 4, 26 12 C28 20, 38 22, 48 18 C60 14, 75 16, 95 14" stroke="url(#calliGoldGrad)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="28" cy="10" r="1.5" fill="url(#calliGoldGrad)" />
      <path d="M20 14 L6 14" stroke="url(#calliGoldGrad)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="2" cy="14" r="1.2" fill="url(#calliGoldGrad)" />

      {/* Right Calligraphic Swirl */}
      <path d="M156 14 C175 14, 195 8, 215 14 C228 18, 236 12, 242 6 C248 0, 256 4, 254 12 C252 20, 242 22, 232 18 C220 14, 205 16, 185 14" stroke="url(#calliGoldGrad)" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="252" cy="10" r="1.5" fill="url(#calliGoldGrad)" />
      <path d="M260 14 L274 14" stroke="url(#calliGoldGrad)" strokeWidth="0.8" strokeLinecap="round" />
      <circle cx="278" cy="14" r="1.2" fill="url(#calliGoldGrad)" />
    </svg>
  </div>
);

// Imperial Royal Emerald & 24K Gold Monogram Wax Seal with Sculpted Laurel Wreath & Crown
export const NirwanaEmeraldSeal: React.FC<{ initials: string; size?: 'sm' | 'md' | 'lg'; showWreath?: boolean }> = ({ 
  initials, 
  size = 'md',
  showWreath = true 
}) => {
  const dim = size === 'sm' ? 'w-13 h-13 text-sm' : size === 'lg' ? 'w-22 h-22 text-2xl' : 'w-18 h-18 text-xl';
  return (
    <div className="relative inline-flex items-center justify-center select-none my-4 group">
      {/* Outer Golden Aura Halo */}
      <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#C5A059]/25 via-[#FFE7A8]/30 to-[#C5A059]/25 blur-xl animate-pulse pointer-events-none" />
      
      {/* Handcrafted Sculpted Laurel & Pine Wreath with Crown Pediment */}
      {showWreath && (
        <div className="absolute -inset-6 sm:-inset-7 pointer-events-none z-0">
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full opacity-90">
            <defs>
              <linearGradient id="imperialGoldWreath" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF9E8" />
                <stop offset="25%" stopColor="#E2C792" />
                <stop offset="65%" stopColor="#C5A059" />
                <stop offset="100%" stopColor="#8C6D2B" />
              </linearGradient>
              <linearGradient id="leafHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#E2C792" stopOpacity="0.2" />
              </linearGradient>
            </defs>

            {/* Top Crown Pediment */}
            <g transform="translate(56, 4) scale(0.7)">
              <path d="M5 24 L8 9 L17 19 L25 4 L33 19 L42 9 L45 24 Z" fill="url(#imperialGoldWreath)" stroke="#8C6D2B" strokeWidth="0.8" />
              <circle cx="25" cy="4" r="2.5" fill="#FFF9E8" />
              <circle cx="8" cy="9" r="2" fill="#FFF9E8" />
              <circle cx="42" cy="9" r="2" fill="#FFF9E8" />
              <rect x="5" y="24" width="40" height="3" rx="1.5" fill="url(#imperialGoldWreath)" />
            </g>

            {/* Left Laurel Branch */}
            <g>
              <path d="M70 128 C45 125, 20 102, 22 68 C24 45, 38 28, 55 18" stroke="url(#imperialGoldWreath)" strokeWidth="1.8" strokeLinecap="round" />
              {/* Sculpted Laurel Leaf Pairs with Solid Fills */}
              <path d="M22 68 C14 62, 10 50, 15 44 C20 48, 22 58, 22 68 Z" fill="url(#imperialGoldWreath)" />
              <path d="M22 68 C26 58, 32 50, 36 55 C32 62, 26 66, 22 68 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M28 88 C18 84, 14 74, 18 68 C24 72, 26 80, 28 88 Z" fill="url(#imperialGoldWreath)" />
              <path d="M28 88 C32 80, 38 72, 42 77 C38 83, 32 87, 28 88 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M38 106 C28 104, 24 96, 28 90 C34 94, 36 100, 38 106 Z" fill="url(#imperialGoldWreath)" />
              <path d="M38 106 C42 98, 48 92, 52 96 C48 102, 42 105, 38 106 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M53 120 C43 120, 38 114, 42 108 C48 112, 50 116, 53 120 Z" fill="url(#imperialGoldWreath)" />
              
              <path d="M26 48 C22 38, 24 28, 30 24 C34 30, 32 40, 26 48 Z" fill="url(#imperialGoldWreath)" />
              <path d="M38 34 C34 24, 38 16, 44 14 C46 22, 42 30, 38 34 Z" fill="url(#imperialGoldWreath)" />
            </g>

            {/* Right Laurel Branch (Symmetrical) */}
            <g transform="translate(140, 0) scale(-1, 1)">
              <path d="M70 128 C45 125, 20 102, 22 68 C24 45, 38 28, 55 18" stroke="url(#imperialGoldWreath)" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M22 68 C14 62, 10 50, 15 44 C20 48, 22 58, 22 68 Z" fill="url(#imperialGoldWreath)" />
              <path d="M22 68 C26 58, 32 50, 36 55 C32 62, 26 66, 22 68 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M28 88 C18 84, 14 74, 18 68 C24 72, 26 80, 28 88 Z" fill="url(#imperialGoldWreath)" />
              <path d="M28 88 C32 80, 38 72, 42 77 C38 83, 32 87, 28 88 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M38 106 C28 104, 24 96, 28 90 C34 94, 36 100, 38 106 Z" fill="url(#imperialGoldWreath)" />
              <path d="M38 106 C42 98, 48 92, 52 96 C48 102, 42 105, 38 106 Z" fill="url(#imperialGoldWreath)" opacity="0.9" />
              
              <path d="M53 120 C43 120, 38 114, 42 108 C48 112, 50 116, 53 120 Z" fill="url(#imperialGoldWreath)" />
              
              <path d="M26 48 C22 38, 24 28, 30 24 C34 30, 32 40, 26 48 Z" fill="url(#imperialGoldWreath)" />
              <path d="M38 34 C34 24, 38 16, 44 14 C46 22, 42 30, 38 34 Z" fill="url(#imperialGoldWreath)" />
            </g>

            {/* Bottom Silk Ribbon Knot */}
            <g transform="translate(62, 122)">
              <ellipse cx="8" cy="4" rx="4" ry="3" fill="url(#imperialGoldWreath)" />
              <path d="M4 4 C-2 7, -8 12, -7 16 C-2 15, 2 8, 4 4 Z" fill="url(#imperialGoldWreath)" />
              <path d="M12 4 C18 7, 24 12, 23 16 C18 15, 14 8, 12 4 Z" fill="url(#imperialGoldWreath)" />
            </g>
          </svg>
        </div>
      )}

      {/* Realistic 3D Hot-Wax Stamped Disc (Scalloped Molten Wax Rim) */}
      <div className={`${dim} rounded-full bg-gradient-to-br from-[#1E5243] via-[#12352B] to-[#0A1F18] shadow-[0_12px_32px_rgba(10,31,24,0.65),inset_0_2px_5px_rgba(255,255,255,0.4),inset_0_-4px_8px_rgba(0,0,0,0.8)] flex items-center justify-center border-2 border-[#C5A059]/80 relative transition-transform duration-500 group-hover:scale-105 z-10`}>
        {/* Inner Debossed 24K Gold Rope Ring */}
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-[#E2C792]/80 shadow-[inset_0_3px_6px_rgba(0,0,0,0.75)] flex items-center justify-center bg-[#0F2D24]/95">
          {/* Inner Hairline */}
          <div className="w-[88%] h-[88%] rounded-full border border-[#C5A059]/40 flex items-center justify-center">
            {/* 24K Embossed Monogram */}
            <span 
              className="font-serif font-normal text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF8] via-[#F2D7A5] to-[#B89045] tracking-widest drop-shadow-[0_2px_3px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {initials}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Royal Gilded Botanical Arch Garland (Lush Sculpted 24K Gold Foliage Framing Photo Arch)
export const GildedPineArchFlourish: React.FC<{ side: 'left' | 'right'; className?: string }> = ({ side, className = '' }) => {
  const isRight = side === 'right';
  return (
    <div 
      className={`absolute top-0 ${isRight ? '-right-6 sm:-right-8 scale-x-[-1]' : '-left-6 sm:-left-8'} pointer-events-none z-25 w-20 sm:w-26 h-36 sm:h-46 ${className}`}
      style={{
        filter: 'drop-shadow(0 6px 14px rgba(18, 46, 36, 0.35))',
        animation: `royalBranchSway ${isRight ? '8s' : '7s'} ease-in-out infinite alternate`,
      }}
    >
      <svg viewBox="0 0 90 150" fill="none" className="w-full h-full">
        <defs>
          <linearGradient id={`royalGoldLeaf_${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E8" />
            <stop offset="30%" stopColor="#E5CBA0" />
            <stop offset="70%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
          <linearGradient id={`pineNeedleGrad_${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF2D6" />
            <stop offset="100%" stopColor="#9C7934" />
          </linearGradient>
        </defs>

        {/* Curving Main Gilded Stem Hugging the Arch Contour */}
        <path 
          d="M10 145 C18 100, 38 55, 78 12" 
          stroke={`url(#royalGoldLeaf_${side})`} 
          strokeWidth="2.8" 
          strokeLinecap="round" 
        />

        {/* TOP APEX FOLIAGE CLUSTERS (Broad Sculpted Leaves + Berries) */}
        <g>
          {/* Leaf 1 - Apex Crown */}
          <path d="M78 12 C85 6, 88 1, 90 0 C87 6, 83 14, 78 12 Z" fill={`url(#royalGoldLeaf_${side})`} />
          <path d="M78 12 C72 5, 65 3, 60 4 C66 7, 73 10, 78 12 Z" fill={`url(#royalGoldLeaf_${side})`} opacity="0.95" />
          
          {/* Leaf 2 - Upper Shoulder Pair */}
          <path d="M68 32 C78 24, 88 23, 90 26 C84 31, 74 34, 68 32 Z" fill={`url(#royalGoldLeaf_${side})`} />
          <path d="M68 32 C76 36, 82 43, 84 50 C78 46, 72 40, 68 32 Z" fill={`url(#royalGoldLeaf_${side})`} opacity="0.9" />
          <path d="M68 32 C58 28, 50 30, 45 34 C52 35, 60 35, 68 32 Z" fill={`url(#royalGoldLeaf_${side})`} opacity="0.85" />
          
          {/* Golden Berries at Upper Node */}
          <circle cx="71" cy="27" r="2.5" fill="#FFF9E8" stroke="#8C6D2B" strokeWidth="0.5" />
          <circle cx="76" cy="30" r="2" fill="#E2C792" />
        </g>

        {/* MID-CURVE MOUNTAIN FERN FRONDS (Pakis Lawu & Cemara) */}
        <g>
          {/* Fan Spray of Pine Needles with Solid Tapered Strokes */}
          <path d="M50 60 C64 52, 78 52, 86 56" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 60 C66 62, 78 70, 84 78" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 60 C58 70, 68 80, 72 90" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.6" strokeLinecap="round" />
          <path d="M50 60 C38 56, 28 58, 20 64" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.5" strokeLinecap="round" />

          {/* Broad Sculpted Mid Leaf Pair */}
          <path d="M50 60 C60 48, 72 45, 78 48 C72 56, 62 60, 50 60 Z" fill={`url(#royalGoldLeaf_${side})`} />
          <path d="M50 60 C42 68, 38 78, 36 84 C38 76, 44 68, 50 60 Z" fill={`url(#royalGoldLeaf_${side})`} opacity="0.9" />

          {/* Gilded Pinecone with Shimmering Scales */}
          <g transform="translate(48, 64) rotate(-20)">
            <ellipse cx="0" cy="0" rx="5.5" ry="7.5" fill={`url(#royalGoldLeaf_${side})`} />
            <path d="M-4 -3 L4 3 M-4 3 L4 -3 M-5 0 L5 0" stroke="#0F2D24" strokeWidth="0.8" opacity="0.6" />
            <circle cx="0" cy="-6" r="1.2" fill="#FFF9E8" />
          </g>
        </g>

        {/* LOWER CASCADING STEM FOLIAGE */}
        <g>
          <path d="M30 98 C44 92, 58 96, 66 104" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.5" strokeLinecap="round" />
          <path d="M30 98 C40 106, 50 116, 54 126" stroke={`url(#pineNeedleGrad_${side})`} strokeWidth="1.5" strokeLinecap="round" />
          
          <path d="M30 98 C42 86, 52 86, 58 90 C50 96, 40 100, 30 98 Z" fill={`url(#royalGoldLeaf_${side})`} />
          <path d="M30 98 C20 94, 12 96, 6 102 C14 102, 22 100, 30 98 Z" fill={`url(#royalGoldLeaf_${side})`} opacity="0.9" />

          {/* Lower Pinecone */}
          <g transform="translate(26, 110) rotate(15)">
            <ellipse cx="0" cy="0" rx="4.5" ry="6.5" fill={`url(#royalGoldLeaf_${side})`} />
            <path d="M-3 -2 L3 2 M-3 2 L3 -2" stroke="#0F2D24" strokeWidth="0.7" opacity="0.6" />
          </g>

          {/* Starlight Jewels at Leaf Apexes */}
          <circle cx="88" cy="1" r="1.5" fill="#FFF9E8" />
          <circle cx="90" cy="26" r="1.5" fill="#FFF9E8" />
          <circle cx="78" cy="48" r="1.5" fill="#FFF9E8" />
          <circle cx="66" cy="104" r="1.5" fill="#FFF9E8" />
        </g>
      </svg>
    </div>
  );
};

// Floating 24K Gold Foil Flakes & Twinkling Starlight Diamonds (Replaces inverted V sticks)
export const FallingPineParticles: React.FC<{ count?: number; className?: string }> = ({ count = 14, className = '' }) => {
  const particles = [
    { left: '6%', duration: '14s', delay: '0s', size: 14, type: 'foil', rot: 45 },
    { left: '18%', duration: '18s', delay: '2.5s', size: 18, type: 'star', rot: 0 },
    { left: '32%', duration: '16s', delay: '1.2s', size: 12, type: 'foil', rot: 120 },
    { left: '48%', duration: '20s', delay: '4.8s', size: 20, type: 'star', rot: 15 },
    { left: '65%', duration: '15s', delay: '3.1s', size: 16, type: 'foil', rot: 210 },
    { left: '82%', duration: '19s', delay: '6.4s', size: 14, type: 'star', rot: 0 },
    { left: '92%', duration: '17s', delay: '1.8s', size: 13, type: 'foil', rot: 75 },
    { left: '12%', duration: '21s', delay: '7.5s', size: 16, type: 'foil', rot: 160 },
    { left: '42%', duration: '16.5s', delay: '8.8s', size: 15, type: 'star', rot: 30 },
    { left: '74%', duration: '18.5s', delay: '5.2s', size: 14, type: 'foil', rot: 290 },
    { left: '26%', duration: '22s', delay: '10.1s', size: 18, type: 'star', rot: 0 },
    { left: '58%', duration: '17.5s', delay: '9.3s', size: 12, type: 'foil', rot: 95 },
    { left: '88%', duration: '23s', delay: '11.4s', size: 15, type: 'foil', rot: 180 },
    { left: '38%', duration: '19.5s', delay: '12.8s', size: 16, type: 'star', rot: 45 },
  ].slice(0, count);

  return (
    <div className={`pointer-events-none absolute inset-0 z-15 overflow-hidden select-none ${className}`}>
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: '-35px',
            left: p.left,
            animation: `goldParticleDrift ${p.duration} linear infinite`,
            animationDelay: p.delay,
            transformOrigin: 'center center',
          }}
        >
          {p.type === 'star' ? (
            /* Twinkling 4-Point Diamond Star */
            <svg 
              width={p.size} 
              height={p.size} 
              viewBox="0 0 24 24" 
              fill="none" 
              style={{
                animation: 'starTwinkle 3s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 6px rgba(255, 231, 168, 0.95))',
              }}
            >
              <path 
                d="M12 0 C12 7, 17 12, 24 12 C17 12, 12 17, 12 24 C12 17, 7 12, 0 12 C7 12, 12 7, 12 0 Z" 
                fill="url(#goldStarGrad)" 
              />
              <circle cx="12" cy="12" r="2.5" fill="#FFFFFF" />
            </svg>
          ) : (
            /* Shimmering 24K Gold Leaf Flake */
            <svg 
              width={p.size} 
              height={p.size} 
              viewBox="0 0 20 20" 
              fill="none" 
              style={{
                animation: 'goldFoilTumble 4.5s ease-in-out infinite alternate',
                filter: 'drop-shadow(0 0 4px rgba(226, 199, 146, 0.8))',
              }}
            >
              <polygon points="10,1 18,5 17,16 9,19 2,13 4,5" fill="url(#goldFoilGrad)" />
            </svg>
          )}
        </div>
      ))}

      {/* Global Particle SVG Gradients */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="goldStarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFF2D6" />
            <stop offset="70%" stopColor="#E2C792" />
            <stop offset="100%" stopColor="#C5A059" />
          </linearGradient>
          <linearGradient id="goldFoilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E8" />
            <stop offset="40%" stopColor="#E5CBA0" />
            <stop offset="80%" stopColor="#C5A059" />
            <stop offset="100%" stopColor="#8C6D2B" />
          </linearGradient>
        </defs>
      </svg>

      <style>{`
        @keyframes goldParticleDrift {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          12% { opacity: 0.95; }
          88% { opacity: 0.85; }
          100% { transform: translateY(115vh) rotate(360deg); opacity: 0; }
        }
        @keyframes starTwinkle {
          0% { transform: scale(0.7) rotate(0deg); opacity: 0.35; }
          50% { transform: scale(1.3) rotate(45deg); opacity: 1; }
          100% { transform: scale(0.7) rotate(90deg); opacity: 0.35; }
        }
        @keyframes goldFoilTumble {
          0% { transform: rotate3d(1, 1, 0, 0deg) scale(0.85); }
          50% { transform: rotate3d(1, 0.5, 1, 180deg) scale(1.2); }
          100% { transform: rotate3d(0.5, 1, 0.5, 360deg) scale(0.85); }
        }
        @keyframes royalBranchSway {
          0% { transform: rotate(0deg) translateY(0px); }
          100% { transform: rotate(1.8deg) translateY(-2px); }
        }
        @keyframes photoAuraPulse {
          0% { box-shadow: 0 0 15px rgba(197, 160, 89, 0.4), 0 10px 25px rgba(0, 0, 0, 0.4); }
          100% { box-shadow: 0 0 35px rgba(226, 199, 146, 0.8), 0 15px 35px rgba(12, 36, 27, 0.6); }
        }
        @keyframes goldShimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          40%, 100% { transform: translateX(350%) skewX(-20deg); }
        }
        @keyframes ambientAuraPulse {
          0%, 100% { transform: scale(1); opacity: 0.12; }
          50% { transform: scale(1.15); opacity: 0.28; }
        }
        @keyframes crestGleam {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(197, 160, 89, 0.3)); }
          50% { filter: drop-shadow(0 0 12px rgba(226, 199, 146, 0.85)); }
        }
      `}</style>
    </div>
  );
};

// Grand Imperial Mount Lawu & Pine Heritage Crest (Fine Banknote Engraving Craft)
export const MountainPineHeritageCrest: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center w-full max-w-[340px] mx-auto my-3 ${className}`}>
    <svg viewBox="0 0 320 64" fill="none" className="w-full h-auto max-w-[320px] drop-shadow-xs select-none">
      <defs>
        <linearGradient id="crestGoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF2" />
          <stop offset="25%" stopColor="#E8CD8C" />
          <stop offset="60%" stopColor="#C5A059" />
          <stop offset="100%" stopColor="#8C6D2B" />
        </linearGradient>
      </defs>

      {/* Symmetrical Left Wing Scrollwork */}
      <path d="M120 32 C105 32, 85 24, 65 24 C45 24, 25 32, 10 32" stroke="url(#crestGoldGrad2)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M100 32 C85 36, 70 42, 50 40 C35 38, 20 34, 4 32" stroke="url(#crestGoldGrad2)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
      <path d="M65 24 C60 16, 50 14, 42 18 C36 22, 40 28, 48 26" stroke="url(#crestGoldGrad2)" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="38" cy="18" r="1.8" fill="url(#crestGoldGrad2)" />
      <circle cx="16" cy="32" r="2.2" fill="url(#crestGoldGrad2)" />
      <circle cx="2" cy="32" r="1.5" fill="url(#crestGoldGrad2)" />

      {/* Symmetrical Right Wing Scrollwork */}
      <path d="M200 32 C215 32, 235 24, 255 24 C275 24, 295 32, 310 32" stroke="url(#crestGoldGrad2)" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M220 32 C235 36, 250 42, 270 40 C285 38, 300 34, 316 32" stroke="url(#crestGoldGrad2)" strokeWidth="0.9" strokeLinecap="round" opacity="0.75" />
      <path d="M255 24 C260 16, 270 14, 278 18 C284 22, 280 28, 272 26" stroke="url(#crestGoldGrad2)" strokeWidth="1.1" strokeLinecap="round" />
      <circle cx="282" cy="18" r="1.8" fill="url(#crestGoldGrad2)" />
      <circle cx="304" cy="32" r="2.2" fill="url(#crestGoldGrad2)" />
      <circle cx="318" cy="32" r="1.5" fill="url(#crestGoldGrad2)" />

      {/* Center Mountain Medallion / Banknote Arch */}
      <g transform="translate(110, 2)">
        {/* Sunburst Rays Behind Peak */}
        <path d="M50 16 L50 4 M42 18 L34 10 M58 18 L66 10 M36 22 L26 18 M64 22 L74 18" stroke="url(#crestGoldGrad2)" strokeWidth="1" strokeLinecap="round" opacity="0.85" />
        
        {/* Lawu Peaks */}
        <path d="M10 44 L32 20 L50 8 L68 20 L90 44 Z" fill="none" stroke="url(#crestGoldGrad2)" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Peak Etch Hatch Lines */}
        <path d="M50 8 L50 36 M42 16 L38 32 M58 16 L62 32 M34 22 L28 38 M66 22 L72 38" stroke="url(#crestGoldGrad2)" strokeWidth="0.9" opacity="0.7" />

        {/* Flanking Pine Trees */}
        <path d="M22 28 L22 42 M22 28 L17 33 M22 28 L27 33 M22 32 L15 38 M22 32 L29 38" stroke="url(#crestGoldGrad2)" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M78 28 L78 42 M78 28 L73 33 M78 28 L83 33 M78 32 L71 38 M78 32 L85 38" stroke="url(#crestGoldGrad2)" strokeWidth="1.3" strokeLinecap="round" />

        {/* Lake Sarangan Ripples */}
        <path d="M16 42 Q32 39 50 42 T84 42" stroke="url(#crestGoldGrad2)" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M24 45 Q38 43 50 45 T76 45" stroke="url(#crestGoldGrad2)" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />

        {/* 8-Point Apex Star Jewel */}
        <path d="M50 2 L51.5 6 L55.5 7.5 L51.5 9 L50 13 L48.5 9 L44.5 7.5 L48.5 6 Z" fill="#FFFDF2" stroke="#8C6D2B" strokeWidth="0.5" />
      </g>

      {/* Engraved Gilded Ribbon Banner at Bottom */}
      <g transform="translate(68, 48)">
        <path d="M10 8 L30 2 L154 2 L174 8 L158 14 L26 14 Z" fill="#12352B" stroke="url(#crestGoldGrad2)" strokeWidth="1" />
        <text 
          x="92" 
          y="10.2" 
          textAnchor="middle" 
          fill="#F2D7A5" 
          fontSize="6.8" 
          fontFamily="'Playfair Display', Georgia, serif" 
          fontWeight="bold" 
          letterSpacing="2.5"
        >
          HOTEL NIRWANA SARANGAN
        </text>
      </g>
    </svg>
  </div>
);

// Ambient Floating Golden Dust Particles (Glittering Lake Sparkles)
export const FloatingGoldenDust: React.FC<{ count?: number; className?: string }> = ({ count = 14, className = '' }) => {
  const particles = [
    { top: '8%', left: '12%', size: 3, duration: '6.5s', delay: '0s' },
    { top: '22%', left: '85%', size: 3.5, duration: '8s', delay: '1.2s' },
    { top: '36%', left: '18%', size: 2.5, duration: '7s', delay: '2.5s' },
    { top: '48%', left: '78%', size: 4, duration: '9s', delay: '0.8s' },
    { top: '64%', left: '14%', size: 3, duration: '7.5s', delay: '3.1s' },
    { top: '78%', left: '86%', size: 2.5, duration: '6.8s', delay: '1.7s' },
    { top: '16%', left: '50%', size: 3.5, duration: '8.2s', delay: '2s' },
    { top: '42%', left: '40%', size: 3, duration: '7.2s', delay: '0.5s' },
    { top: '70%', left: '55%', size: 2.5, duration: '8.5s', delay: '2.8s' },
    { top: '88%', left: '28%', size: 3.5, duration: '6.2s', delay: '1.5s' },
    { top: '28%', left: '92%', size: 3, duration: '7.8s', delay: '0.2s' },
    { top: '58%', left: '8%', size: 2.5, duration: '8.7s', delay: '3.5s' },
    { top: '84%', left: '68%', size: 3, duration: '7s', delay: '1.9s' },
    { top: '14%', left: '72%', size: 2, duration: '6s', delay: '2.2s' },
  ].slice(0, count);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-10 ${className}`}>
      {particles.map((p, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-[#FFE8B8]"
          style={{
            top: p.top,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            boxShadow: '0 0 10px 2.5px rgba(226, 199, 146, 0.85)',
            animation: `goldParticleFloat ${p.duration} ease-in-out infinite ${p.delay}`,
          }}
        />
      ))}
      <style>{`
        @keyframes goldParticleFloat {
          0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.25; }
          50% { transform: translateY(-28px) scale(1.3); opacity: 0.95; }
        }
      `}</style>
    </div>
  );
};

// Symmetrical 24K Gold Divider with Diamond Accents
export const LuxuryGoldDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-2.5 w-full max-w-[240px] mx-auto my-3 ${className}`}>
    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C5A059]/60 to-[#C5A059]" />
    <div className="flex items-center gap-1.5 text-[#C5A059]">
      <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059] bg-[#C5A059]" />
      <Sparkles className="w-3.5 h-3.5 text-[#E2C792] animate-pulse" />
      <div className="w-1.5 h-1.5 rotate-45 border border-[#C5A059] bg-[#C5A059]" />
    </div>
    <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#C5A059]/60 to-[#C5A059]" />
  </div>
);

// Floating Pine Needles & Lake Mist Particles Component
export const FloatingLakeMist: React.FC = () => {
  const mists = [
    { top: '15%', delay: '0s', duration: '14s', opacity: 0.25, width: '320px', height: '140px' },
    { top: '35%', delay: '4s', duration: '18s', opacity: 0.2, width: '400px', height: '160px' },
    { top: '65%', delay: '2s', duration: '16s', opacity: 0.22, width: '350px', height: '150px' },
    { top: '85%', delay: '7s', duration: '20s', opacity: 0.18, width: '420px', height: '170px' },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden select-none">
      {mists.map((mist, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl pointer-events-none"
          style={{
            top: mist.top,
            left: '-20%',
            width: mist.width,
            height: mist.height,
            background: 'radial-gradient(ellipse at center, rgba(162, 210, 195, 0.45) 0%, rgba(240, 247, 244, 0) 70%)',
            animation: `floatMist ${mist.duration} ease-in-out infinite alternate`,
            animationDelay: mist.delay,
            opacity: mist.opacity,
          }}
        />
      ))}
      <style>{`
        @keyframes floatMist {
          0% { transform: translateX(0) scale(1); }
          50% { transform: translateX(45vw) scale(1.15); }
          100% { transform: translateX(90vw) scale(1); }
        }
        @keyframes goldShimmerSweep {
          0% { transform: translateX(-150%) skewX(-20deg); }
          40%, 100% { transform: translateX(350%) skewX(-20deg); }
        }
        @keyframes goldGlowPulse {
          0%, 100% { box-shadow: 0 10px 30px rgba(22, 56, 44, 0.25), 0 0 15px rgba(197, 160, 89, 0.2); }
          50% { box-shadow: 0 15px 40px rgba(22, 56, 44, 0.4), 0 0 25px rgba(197, 160, 89, 0.5); }
        }
      `}</style>
    </div>
  );
};

export interface NirwanaSaranganThemeProps {
  invitation: any;
  couple: any;
  events: any[];
  stories: any[];
  gallery: any[];
  gifts: any[];
  music?: any;
  isOpening?: boolean;
}

export const NirwanaSaranganTheme: React.FC<NirwanaSaranganThemeProps> = ({
  invitation,
  couple,
  events = [],
  stories = [],
  gallery = [],
  gifts = [],
  music,
}) => {
  const toast = useToast();

  // Active section for bottom nav
  const [activeSection, setActiveSection] = useState('cover');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeGalleryIdx, setActiveGalleryIdx] = useState(0);
  const [giftTab, setGiftTab] = useState<'transfer' | 'physical'>('transfer');
  const [isCopied, setIsCopied] = useState<string | null>(null);
  const [calendarModalEvent, setCalendarModalEvent] = useState<CalendarEventData | null>(null);

  // RSVP Form State
  const [rsvpName, setRsvpName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'not_attending' | 'maybe'>('attending');
  const [rsvpGuests, setRsvpGuests] = useState(1);
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpItems, setRsvpItems] = useState<RSVPItem[]>([]);
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [hasSubmittedRsvp, setHasSubmittedRsvp] = useState(false);

  // Barcode / Check-in Pass
  const [savedPass, setSavedPass] = useState<any>(null);

  // Dynamic names & defaults (Steven & Bunga canonical demo)
  const isStevenBunga = !couple || 
    couple?.groom_nickname === 'Steven' || 
    couple?.groom_full_name?.includes('Steven') ||
    couple?.groom_nickname === 'Bagus' ||
    couple?.groom_full_name === 'Bagus Pratama, S.T.' ||
    invitation?.slug === 'steven-bunga' ||
    invitation?.slug === 'bunga-steven' ||
    invitation?.slug === 'nirwana-sarangan';

  const groomName = isStevenBunga ? 'Steven' : (couple?.groom_nickname || couple?.groom_name || couple?.groom_full_name || 'Steven');
  const brideName = isStevenBunga ? 'Bunga' : (couple?.bride_nickname || couple?.bride_name || couple?.bride_full_name || 'Bunga');
  const groomFullName = isStevenBunga ? 'Steven Pratama, S.Kom.' : (couple?.groom_full_name || 'Steven Pratama, S.Kom.');
  const brideFullName = isStevenBunga ? 'Bunga Citra Lestari, S.E.' : (couple?.bride_full_name || 'Bunga Citra Lestari, S.E.');
  const groomFather = isStevenBunga ? 'Bpk. Bambang Pratama' : (couple?.groom_father || couple?.groom_father_name || 'Bpk. Bambang Pratama');
  const groomMother = isStevenBunga ? 'Ibu Siti Rahayu' : (couple?.groom_mother || couple?.groom_mother_name || 'Ibu Siti Rahayu');
  const brideFather = isStevenBunga ? 'Bpk. Hendra Gunawan' : (couple?.bride_father || couple?.bride_father_name || 'Bpk. Hendra Gunawan');
  const brideMother = isStevenBunga ? 'Ibu Ratna Dewi' : (couple?.bride_mother || couple?.bride_mother_name || 'Ibu Ratna Dewi');
  const groomInstagram = isStevenBunga ? '@steven_pratama' : (couple?.groom_instagram || '@steven_pratama');
  const brideInstagram = isStevenBunga ? '@bunga_lestari' : (couple?.bride_instagram || '@bunga_lestari');

  // Key Images (Canonical demo wedding photos & Hotel Nirwana Sarangan backdrop)
  const hotelExteriorImg = '/themes/nirwana-sarangan/hotel-exterior.jpg';
  const hotelLobbyImg = '/themes/nirwana-sarangan/hotel-lobby.jpg';
  const lakePanoramaImg = '/themes/nirwana-sarangan/lakeview-panorama.jpg';
  const lakeMobileImg = '/themes/nirwana-sarangan/lakeview-mobile.jpg';
  const coupleCoverImg = isStevenBunga ? '/photos/photo-3.jpg' : (couple?.cover_photo_url || '/photos/photo-3.jpg');
  const groomPhotoImg = isStevenBunga ? '/photos/photo-7.jpg' : (couple?.groom_photo_url || '/photos/photo-7.jpg');
  const bridePhotoImg = isStevenBunga ? '/photos/photo-4.jpg' : (couple?.bride_photo_url || '/photos/photo-4.jpg');

  // Countdown timer calculation
  const targetDateStr = events[0]?.event_date || invitation?.settings?.countdown_date || '2026-11-20T09:00:00';
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  // Load RSVP items
  useEffect(() => {
    if (invitation?.id) {
      rsvpService.getRsvpsByInvitation(invitation.id).then(data => {
        setRsvpItems(data || []);
      }).catch(err => {
        console.warn('Gagal memuat RSVP:', err);
      });
      const pass = loadSavedBarcodePass(invitation.id);
      if (pass) setSavedPass(pass);
    }
  }, [invitation?.id]);

  // Scroll spy to update active bottom navigation link automatically
  useEffect(() => {
    const sectionIds = ['cover', 'couple', 'event', 'story', 'gallery', 'rsvp'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 280;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Copy to clipboard helper
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(id);
    toast.success('Berhasil disalin ke clipboard');
    setTimeout(() => setIsCopied(null), 2500);
  };

  // Submit RSVP
  const handleSubmitRsvp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpName.trim()) {
      toast.error('Mohon masukkan nama Anda');
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      const res = await rsvpService.submitRsvp({
        invitation_id: invitation?.id || 'e2000000-0000-0000-0000-000000000002',
        name: rsvpName.trim(),
        attendance: rsvpStatus,
        number_of_guests: rsvpStatus === 'attending' ? rsvpGuests : 0,
        message: rsvpMessage.trim() || null,
        invitation_title: invitation?.title || `The Wedding of ${groomName} & ${brideName}`,
      });

      setRsvpItems(prev => [res, ...prev]);

      if (rsvpStatus === 'attending' && invitation?.id) {
        const pass = {
          name: rsvpName.trim(),
          code: generateStableBarcodeCode('NIRWANA', invitation.id, rsvpName),
          attendance: rsvpStatus,
          guests: rsvpGuests,
          timestamp: new Date().toISOString(),
        };
        saveBarcodePass(pass, invitation.id);
        setSavedPass(pass);
      }

      setHasSubmittedRsvp(true);
      toast.success('Konfirmasi kehadiran & ucapan berhasil dikirim. Terima kasih!');
    } catch {
      toast.error('Gagal mengirim RSVP. Silakan coba kembali.');
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Canonical prewedding demo photos (photo-1 through photo-9)
  const DEMO_GALLERY_PHOTOS = [
    { id: '1', image_url: '/photos/photo-1.jpg', caption: 'Kebersamaan & Tawa Bahagia' },
    { id: '2', image_url: '/photos/photo-3.jpg', caption: 'Romansa Kasih Steven & Bunga' },
    { id: '3', image_url: '/photos/photo-4.jpg', caption: 'Pesona Anggun Mempelai Putri' },
    { id: '4', image_url: '/photos/photo-5.jpg', caption: 'Genggaman Menuju Masa Depan' },
    { id: '5', image_url: '/photos/photo-6.jpg', caption: 'Senyum Bahagia Hari Sakral' },
    { id: '6', image_url: '/photos/photo-7.jpg', caption: 'Ketulusan Hati Mempelai Pria' },
    { id: '7', image_url: '/photos/photo-8.jpg', caption: 'Langkah Menuju Janji Suci' },
    { id: '8', image_url: '/photos/photo-9.jpg', caption: 'Menuju Pelaminan Bahagia' },
  ];

  const hasCustomGallery = gallery && gallery.length > 0 && 
    !gallery[0]?.image_url?.includes('agni-putri') && 
    !gallery[0]?.image_url?.includes('nirwana-sarangan');

  const displayGallery = hasCustomGallery ? gallery : DEMO_GALLERY_PHOTOS;

  // Default love stories if empty
  const displayStories = stories.length > 0 ? stories : [
    {
      id: '1',
      title: 'Awal Perjumpaan',
      date: '14 Juli 2022',
      story: 'Takdir mempertemukan kami di sebuah perjalanan wisata menikmati dinginnya hawa kabut Telaga Sarangan. Sebuah tegur sapa sederhana menjadi awal mula dari cerita panjang kami berdua.'
    },
    {
      id: '2',
      title: 'Komitmen & Kebersamaan',
      date: '28 Mei 2024',
      story: 'Melalui lika-liku perjalanan waktu, kami saling menguatkan mimpi dan visi bersama. Di bawah sejuknya lereng Lawu, kami meyakinkan hati untuk melangkah ke jenjang yang lebih sakral.'
    },
    {
      id: '3',
      title: 'Menuju Hari Bahagia',
      date: '2026',
      story: 'Dengan restu kedua orang tua dan limpahan rahmat Ilahi, kami memilih Hotel Nirwana Sarangan sebagai saksi suci penyatuan dua hati dalam ikatan pernikahan kudus.'
    }
  ];

  // Default events if empty
  const displayEvents = events.length > 0 ? events : [
    {
      id: '1',
      title: 'Akad Nikah',
      event_date: '2026-11-20',
      start_time: '08:00',
      end_time: '10:00',
      location_name: 'Ballroom & Lakeside Terrace Hotel Nirwana Sarangan',
      address: 'Jl. Raya Telaga Sarangan No. 187, Plaosan, Kab. Magetan, Jawa Timur',
      google_maps_url: 'https://maps.google.com/?q=Hotel+Nirwana+Sarangan+Magetan'
    },
    {
      id: '2',
      title: 'Resepsi Pernikahan',
      event_date: '2026-11-20',
      start_time: '11:00',
      end_time: '14:00',
      location_name: 'Grand Lakeview Hall - Hotel Nirwana Sarangan',
      address: 'Jl. Raya Telaga Sarangan No. 187, Plaosan, Kab. Magetan, Jawa Timur',
      google_maps_url: 'https://maps.google.com/?q=Hotel+Nirwana+Sarangan+Magetan'
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#F5F8F6] text-[#1E3329] font-sans antialiased overflow-x-hidden selection:bg-[#2A5949] selection:text-white">
      {/* Floating Lake Mist Effect */}
      <FloatingLakeMist />

      {/* DESKTOP SPLIT LAYOUT CONTAINER */}
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* DESKTOP LEFT SIDE: HERO PANORAMA OF HOTEL NIRWANA & TELAGA SARANGAN */}
        <aside className="hidden lg:flex lg:w-5/12 xl:w-1/2 fixed inset-y-0 left-0 z-20 flex-col justify-between p-12 overflow-hidden bg-[#102B22]">
          {/* Background image with mountain lake overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out hover:scale-105"
            style={{ backgroundImage: `url(${lakePanoramaImg})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C1F18] via-[#0C1F18]/50 to-black/40" />

          {/* Inset 24K Gold Hairline Frame & Corner Flourishes */}
          <div className="absolute inset-6 rounded-3xl border border-[#C5A059]/35 pointer-events-none z-15" />
          <NirwanaGoldCorner size={40} color="#E2C792" />

          {/* Golden Floating Stardust Particles */}
          <FloatingGoldenDust count={16} />

          {/* Top Brand & Location Badge */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#122E24]/80 backdrop-blur-md border border-[#C5A059]/50 shadow-xl text-white text-xs tracking-widest uppercase font-medium">
              <Crown className="w-3.5 h-3.5 text-[#E2C792]" />
              <span className="text-[#E2C792]">Telaga Sarangan • Hotel Nirwana</span>
            </div>
            <span className="text-white/80 text-xs tracking-wider font-serif italic">Exclusive Wedding Resort</span>
          </div>

          {/* Center Couple Showcase */}
          <div className="relative z-10 text-white my-auto max-w-lg text-center sm:text-left">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#E2C792] animate-pulse" />
              <p className="text-[#E2C792] text-xs sm:text-sm tracking-[0.35em] uppercase font-serif font-semibold">
                THE INTIMATE DESTINATION WEDDING
              </p>
            </div>
            
            <h1 className="font-serif text-5xl xl:text-6xl font-normal leading-tight tracking-wide mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF2D6] to-[#E2C792] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              {groomName} <span className="text-[#E2C792] font-light italic">&amp;</span> {brideName}
            </h1>

            <div className="w-24 h-0.5 bg-gradient-to-r from-[#C5A059] to-transparent mb-6" />

            <p className="text-white/85 text-sm leading-relaxed mb-8 font-light">
              Menyatukan dua insan dalam ikatan suci pernikahan berlatar kemegahan danau Telaga Sarangan dan sejuknya lereng Gunung Lawu.
            </p>

            {/* Countdown Badge on Desktop - Luxury Gilded Cartouche */}
            <div className="relative p-5 rounded-2xl bg-gradient-to-b from-[#122E24]/90 via-[#0D241C]/95 to-[#081712]/98 backdrop-blur-md border border-[#C5A059]/60 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(197,160,89,0.25)] text-center">
              <div className="absolute inset-1.5 rounded-xl border border-[#C5A059]/25 pointer-events-none" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E2C792] font-serif font-semibold mb-3">
                HITUNG MUNDUR HARI BAHAGIA
              </p>
              <div className="grid grid-cols-4 gap-3">
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E2C792]">{timeLeft.days}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80">Hari</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E2C792]">{timeLeft.hours}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80">Jam</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E2C792]">{timeLeft.minutes}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80">Menit</span>
                </div>
                <div className="p-2 rounded-xl bg-white/5 border border-white/10">
                  <span className="block text-2xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-[#E2C792]">{timeLeft.seconds}</span>
                  <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80">Detik</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Info on Desktop */}
          <div className="relative z-10 text-white/70 text-xs flex items-center justify-between border-t border-white/15 pt-6">
            <span className="font-serif tracking-wide text-[#E2C792]">Hotel Nirwana Sarangan Resort</span>
            <span>Jl. Raya Telaga Sarangan No. 187</span>
          </div>
        </aside>

        {/* RIGHT SIDE: SCROLLABLE MAIN INVITATION CONTENT */}
        <main className="w-full lg:w-7/12 xl:w-1/2 lg:ml-auto min-h-screen bg-[#F5F8F6] relative z-10 pb-28">

          {/* SECTION 1: COVER / HERO SECTION */}
          <section id="cover" className="relative min-h-screen flex flex-col items-center justify-start text-center px-4 sm:px-6 pt-12 pb-36 sm:pt-16 sm:pb-40 overflow-hidden bg-[#0A1F18]">
            {/* Dramatic Mountain Forest & Lakeview Ambient Backdrop (All screen sizes) */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105 opacity-60 pointer-events-none"
              style={{ backgroundImage: `url(${lakePanoramaImg})` }}
            />
            {/* Deep Emerald Velvet Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#071712]/92 via-[#0E281F]/85 to-[#0A1F18]/95 pointer-events-none" />

            {/* Falling 24K Gold Foil Flakes & Starlight Particles */}
            <FallingPineParticles count={16} />
            <FloatingGoldenDust count={16} />

            {/* BESPOKE ROYAL WEDDING STATIONERY FOLIO CARD (Warm Ivory & Gold Velvet) */}
            <div className="relative z-10 max-w-md sm:max-w-lg w-full mx-auto flex flex-col items-center bg-gradient-to-b from-[#FFFDF8] via-[#FAF6ED] to-[#F3ECE0] rounded-3xl p-6 sm:p-9 border-2 border-[#C5A059] shadow-[0_30px_90px_rgba(10,31,24,0.5),0_0_45px_rgba(197,160,89,0.25),inset_0_1px_3px_rgba(255,255,255,0.9)] overflow-hidden">
              
              {/* Tactile Banknote Guilloché Watermark Texture */}
              <GuillocheParchmentWatermark />

              {/* Concentric Double Gold Rope & Hairline Frame */}
              <div className="absolute inset-2 sm:inset-3 rounded-2xl border border-dashed border-[#C5A059]/60 pointer-events-none z-10" />
              <div className="absolute inset-3.5 sm:inset-4.5 rounded-xl border border-[#C5A059]/25 pointer-events-none z-10" />

              {/* Victorian Baroque Gilded Acanthus Corner Ornaments */}
              <NirwanaGoldCorner size={56} />

              {/* Royal Wax Seal Monogram with Sculpted Laurel Wreath & Crown */}
              <div className="mb-2 z-10">
                <NirwanaEmeraldSeal 
                  initials={`${groomName[0] || 'S'}&${brideName[0] || 'B'}`} 
                  size="md" 
                  showWreath={true} 
                />
              </div>

              {/* Top Venue Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16382C]/90 backdrop-blur-md border border-[#C5A059]/70 shadow-lg text-[#E2C792] text-xs tracking-widest uppercase font-medium mb-3 z-10">
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Hotel Nirwana Sarangan Resort</span>
              </div>

              {/* Dignified Royal Title Ribbon */}
              <div className="flex items-center justify-center gap-2 mb-2 z-10">
                <div className="h-px w-6 sm:w-10 bg-gradient-to-r from-transparent to-[#8C6D2B]" />
                <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#8C6D2B] font-serif font-bold">
                  THE SACRED WEDDING OF
                </span>
                <div className="h-px w-6 sm:w-10 bg-gradient-to-l from-transparent to-[#8C6D2B]" />
              </div>

              {/* Arch Photo Frame with Sculpted Gilded Pine Garland & 24K Gold Shimmer */}
              <div className="relative my-2 z-10">
                {/* Flanking Gilded Pine & Laurel Botanical Garland */}
                <GildedPineArchFlourish side="left" />
                <GildedPineArchFlourish side="right" />

                <div className="relative w-56 h-72 sm:w-64 sm:h-80 rounded-t-full rounded-b-3xl overflow-hidden shadow-[0_20px_50px_rgba(18,46,36,0.35)] border-2 border-[#C5A059] p-1 bg-gradient-to-b from-[#FFF2D6] via-[#C5A059] to-[#8C6D2B] group">
                  <div className="w-full h-full rounded-t-full rounded-b-2xl overflow-hidden relative">
                    <img 
                      src={coupleCoverImg} 
                      alt={`${groomName} & ${brideName}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 ring-1 ring-inset ring-[#C5A059]/40 rounded-t-full rounded-b-2xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0D2018]/75 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Metallic Gold Light Sweep Animation */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-full rounded-b-2xl">
                      <div 
                        className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none"
                        style={{ animation: 'goldShimmerSweep 6s ease-in-out infinite' }}
                      />
                    </div>

                    <div className="absolute bottom-3 inset-x-0 text-white text-center">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-[#E2C792] font-serif font-medium drop-shadow-sm">
                        Intimate Destination Wedding
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grand Couple Headline with 24K Multi-stop Gold Foil & Deep Emerald Shadow */}
              <div className="relative my-2 py-1 text-center z-10">
                <h1 
                  className="font-serif text-4xl xs:text-5xl sm:text-6xl font-normal tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#244E3F] via-[#16382C] to-[#0E261E] drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] leading-tight"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  <span>{groomName}</span>
                  <span className="inline-block mx-2.5 sm:mx-3 text-3xl xs:text-4xl sm:text-5xl font-light italic text-transparent bg-clip-text bg-gradient-to-b from-[#FFF2D6] via-[#DFBA73] to-[#8C6D2B] drop-shadow-[0_2px_6px_rgba(140,109,43,0.5)]">
                    &amp;
                  </span>
                  <span>{brideName}</span>
                </h1>

                {/* Royal Calligraphic Flourish Underline with Golden Lotus & Filigree Ribbons */}
                <RoyalCalligraphicDivider className="my-2.5" />
              </div>

              {/* Bespoke Mount Lawu & Pine Heritage Banknote Engraving Crest */}
              <MountainPineHeritageCrest className="my-2 z-10" />

              {/* Imperial Date & Venue Cartouche */}
              <div className="relative my-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#16382C]/5 via-[#16382C]/10 to-[#16382C]/5 border border-[#C5A059]/60 shadow-[0_2px_8px_rgba(197,160,89,0.12)] flex flex-col items-center z-10">
                <div className="flex items-center gap-2 text-[#8C6D2B] text-[11px] sm:text-xs font-serif font-bold tracking-[0.22em] uppercase">
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Jumat, 20 November 2026</span>
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </div>
                <span className="text-[9.5px] sm:text-[10.5px] text-[#2D5A48] font-serif tracking-widest mt-0.5 uppercase font-medium">
                  Telaga Sarangan • Magetan, Jawa Timur
                </span>
              </div>

              {/* OPULENT 24K ROYAL HOROLOGY CHRONOMETER VAULT */}
              <div className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-[#123126] via-[#0E281F] to-[#071712] text-white p-4 sm:p-5 rounded-2xl border-2 border-[#C5A059] shadow-[0_16px_40px_rgba(10,31,24,0.45),inset_0_1px_2px_rgba(255,255,255,0.25)] text-center my-3 overflow-hidden group z-10">
                {/* Inset Gold Hairline Frame */}
                <div className="absolute inset-1.5 rounded-xl border border-[#C5A059]/40 pointer-events-none" />
                
                {/* Subtle Gold Shimmer Light Sweep */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                  <div 
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none -translate-x-full"
                    style={{ animation: 'goldShimmerSweep 5s ease-in-out infinite' }}
                  />
                </div>

                {/* Chronometer Ribbon Header */}
                <div className="relative z-10 flex items-center justify-center gap-2 mb-3">
                  <div className="h-px w-6 bg-gradient-to-r from-transparent to-[#E2C792]" />
                  <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#E2C792] font-serif font-semibold drop-shadow-xs">
                    ✦ HITUNG MUNDUR HARI BAHAGIA ✦
                  </span>
                  <div className="h-px w-6 bg-gradient-to-l from-transparent to-[#E2C792]" />
                </div>

                {/* 4 Gilded Time Capsules */}
                <div className="grid grid-cols-4 gap-2 sm:gap-2.5 relative z-10">
                  {/* Hari */}
                  <div className="bg-[#0A2219]/90 border border-[#C5A059]/60 rounded-xl py-2 px-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex flex-col items-center">
                    <span className="block text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F5E1B7] to-[#C5A059] drop-shadow-sm">
                      {String(timeLeft.days).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E2C792]/90 font-medium mt-0.5">
                      HARI
                    </span>
                  </div>

                  {/* Jam */}
                  <div className="bg-[#0A2219]/90 border border-[#C5A059]/60 rounded-xl py-2 px-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex flex-col items-center">
                    <span className="block text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F5E1B7] to-[#C5A059] drop-shadow-sm">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E2C792]/90 font-medium mt-0.5">
                      JAM
                    </span>
                  </div>

                  {/* Menit */}
                  <div className="bg-[#0A2219]/90 border border-[#C5A059]/60 rounded-xl py-2 px-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex flex-col items-center">
                    <span className="block text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F5E1B7] to-[#C5A059] drop-shadow-sm">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E2C792]/90 font-medium mt-0.5">
                      MENIT
                    </span>
                  </div>

                  {/* Detik */}
                  <div className="bg-[#0A2219]/90 border border-[#C5A059]/60 rounded-xl py-2 px-1 shadow-[inset_0_2px_6px_rgba(0,0,0,0.6)] flex flex-col items-center">
                    <span className="block text-2xl sm:text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#FFFDF5] via-[#F5E1B7] to-[#C5A059] drop-shadow-sm animate-pulse">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                    <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#E2C792]/90 font-medium mt-0.5">
                      DETIK
                    </span>
                  </div>
                </div>
              </div>

              {/* Regal Scroll Prompt */}
              <div className="flex flex-col items-center gap-1.5 text-[#4A7263] text-xs pt-2 z-10">
                <div className="flex items-center gap-1.5 text-[#8C6D2B]">
                  <span className="tracking-[0.3em] uppercase text-[9px] font-serif font-bold">GULIR KE BAWAH</span>
                </div>
                <div className="flex flex-col items-center -space-y-1">
                  <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
                  <ChevronDown className="w-4 h-4 text-[#8C6D2B] opacity-60" />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: BISMILLAH & AYAT SUCI (Royal Illuminated Manuscript Folio) */}
          <section className="py-24 px-4 sm:px-10 text-center relative overflow-hidden bg-gradient-to-b from-[#123026] via-[#0C241B] to-[#091E16]">
            {/* Ambient Gold Mist Aura behind folio */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[600px] h-[500px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none" 
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={16} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-2xl mx-auto relative p-8 sm:p-14 rounded-[36px] bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#F2E8D7] border-2 border-[#C5A059] shadow-[0_30px_70px_rgba(0,0,0,0.5),0_0_45px_rgba(197,160,89,0.25)] overflow-hidden">
              {/* Banknote Lacework Guilloche Watermark */}
              <GuillocheParchmentWatermark opacity={0.07} />

              {/* Multi-layered Concentric Gilded Rope & Hairline Frames */}
              <div className="absolute inset-3 sm:inset-4 rounded-[28px] border-2 border-dashed border-[#C5A059]/45 pointer-events-none" />
              <div className="absolute inset-5 sm:inset-6 rounded-[22px] border border-[#C5A059]/25 pointer-events-none" />
              
              {/* Majestic Victorian Acanthus Corner Flourishes (Size 56) */}
              <NirwanaGoldCorner size={56} />

              {/* Gold Shimmer Sweep across the card */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[36px]">
                <div 
                  className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none"
                  style={{ animation: 'goldShimmerSweep 7s ease-in-out infinite' }}
                />
              </div>

              {/* Illuminated Manuscript Small-Caps Header Badge */}
              <div className="relative z-10 inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/10 border border-[#C5A059]/50 text-[#8C6D2B] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-5 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>Kalam Ilahi • Ayat Suci</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              </div>

              {/* Gilded Arabic Bismillah Cartouche Medallion */}
              <div className="relative z-10 my-2 inline-block">
                <div className="relative px-7 sm:px-11 py-3.5 sm:py-4 rounded-2xl sm:rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] border-2 border-[#C5A059] shadow-[0_12px_28px_rgba(12,36,27,0.35)] flex items-center justify-center">
                  <div className="absolute inset-1 rounded-xl sm:rounded-full border border-[#E2C792]/30 pointer-events-none" />
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F7E7B4] tracking-widest drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] select-none">
                    بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                  </span>
                </div>
              </div>
              
              {/* Grand Title */}
              <h2 className="relative z-10 font-serif text-3xl sm:text-4xl text-[#123326] mt-6 mb-1 font-bold tracking-tight">
                Kurnia Suci Pernikahan
              </h2>

              {/* Calligraphic Flourish Divider */}
              <RoyalCalligraphicDivider className="my-2.5 relative z-10" />

              {/* Banknote Mountain Pine Crest */}
              <MountainPineHeritageCrest className="my-2 relative z-10" />

              {/* Illuminated Ayat Parchment Scroll Panel */}
              <div className="relative z-10 mt-6 mb-6 p-6 sm:p-9 rounded-2xl bg-gradient-to-b from-[#16382C]/[0.05] via-[#C5A059]/[0.08] to-[#16382C]/[0.05] border border-[#C5A059]/50 shadow-inner">
                {/* Decorative Illuminated Watermark Quotation Marks */}
                <div className="absolute -top-3 left-4 text-[#C5A059]/25 text-6xl sm:text-7xl font-serif select-none pointer-events-none leading-none">
                  “
                </div>
                <div className="absolute -bottom-6 right-4 text-[#C5A059]/25 text-6xl sm:text-7xl font-serif select-none pointer-events-none leading-none">
                  ”
                </div>

                <blockquote className="font-serif italic text-sm sm:text-base text-[#15382B] leading-relaxed relative z-10 px-3 sm:px-6 font-normal">
                  &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
                </blockquote>
              </div>
              
              {/* Royal Seal Badge */}
              <div className="relative z-10 inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-[#0C241B] via-[#1A4535] to-[#0C241B] text-[#E8D5A3] border-2 border-[#C5A059] shadow-lg text-xs sm:text-sm font-serif uppercase tracking-[0.25em] font-semibold">
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>QS. Ar-Rum: 21</span>
                <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
              </div>
            </div>
          </section>

          {/* SECTION 3: MEMPELAI (BRIDE & GROOM) */}
          <section id="couple" className="pt-24 pb-44 px-4 sm:px-10 bg-gradient-to-b from-[#091E16] via-[#0E2C20] to-[#123729] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura behind couple cards */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[750px] h-[750px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Continuous Cascade of 24K Gold Foil Flakes & Twinkling Diamond Stars */}
            <FallingPineParticles count={22} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-2xl mx-auto text-center relative z-10">
              {/* Royal Small-Caps Pill Header Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>Mahakarya Cinta • Pasangan Mempelai</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                Mempelai Bahagia
              </h2>
              
              <RoyalCalligraphicDivider className="my-2.5 max-w-[260px] mx-auto" />
              <MountainPineHeritageCrest className="mb-4" />
              
              <p className="text-xs sm:text-sm text-white/85 mb-12 max-w-lg mx-auto leading-relaxed font-light">
                Dengan penuh rasa syukur dan memohon ridho Allah SWT, kami menyatukan dua hati dan cinta dalam ikatan suci pernikahan.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
                {/* Mempelai Pria */}
                <div className="flex flex-col items-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#F2E8D7] text-[#123326] p-7 sm:p-9 rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(197,160,89,0.25)] border-2 border-[#C5A059] relative overflow-hidden group hover:border-[#E2C792] hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(197,160,89,0.35)] transition-all duration-500">
                  <GuillocheParchmentWatermark opacity={0.06} />
                  <div className="absolute inset-3 rounded-[28px] border-2 border-dashed border-[#C5A059]/45 pointer-events-none" />
                  <div className="absolute inset-5 rounded-[22px] border border-[#C5A059]/25 pointer-events-none" />
                  <NirwanaGoldCorner size={52} />

                  {/* Top Monogram Seal Badge */}
                  <div className="relative z-10 mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] border border-[#C5A059] shadow-md">
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-serif text-[11px] font-bold tracking-[0.2em] uppercase">The Groom • Mempelai Pria</span>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  </div>

                  {/* Arched Photo Frame with Gilded Pine Branches, Aura Pulse & Twinkling Sparkles */}
                  <div className="relative my-3 z-10">
                    <GildedPineArchFlourish side="left" className="!w-12 !h-24 !-left-5" />
                    <GildedPineArchFlourish side="right" className="!w-12 !h-24 !-right-5" />

                    <Sparkles className="w-4 h-4 text-[#C5A059] absolute -top-2.5 -left-1.5 animate-pulse z-20 drop-shadow-[0_0_6px_#E2C792]" />
                    <Sparkles className="w-4 h-4 text-[#C5A059] absolute -top-2.5 -right-1.5 animate-pulse z-20 drop-shadow-[0_0_6px_#E2C792]" />

                    <div 
                      className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#C5A059] p-1 bg-gradient-to-b from-[#FFF2D6] via-[#C5A059] to-[#8C6D2B] shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      style={{ animation: 'photoAuraPulse 3.5s ease-in-out infinite alternate' }}
                    >
                      <img 
                        src={groomPhotoImg} 
                        alt={groomFullName}
                        className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                      />
                      {/* Gold Shimmer Sweep */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-full rounded-b-xl">
                        <div 
                          className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
                          style={{ animation: 'goldShimmerSweep 4.5s ease-in-out infinite' }}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#123326] font-bold mt-2 mb-1 tracking-tight relative z-10 text-center">
                    {groomFullName}
                  </h3>
                  
                  <RoyalCalligraphicDivider className="my-2 max-w-[160px] relative z-10" />

                  {/* Parents Information Plaque */}
                  <div className="w-full my-3 py-3.5 px-4 rounded-2xl bg-gradient-to-b from-[#16382C]/[0.05] via-[#C5A059]/[0.08] to-[#16382C]/[0.05] border border-[#C5A059]/40 text-center relative z-10 shadow-xs">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D2B] font-serif font-bold block mb-1">
                      ✦ Putra Tercinta Dari ✦
                    </span>
                    <p className="font-serif font-bold text-sm text-[#123326] leading-snug">
                      {groomFather} <span className="font-normal text-xs text-[#4A7263]">&amp;</span> {groomMother}
                    </p>
                  </div>

                  {groomInstagram && (
                    <a 
                      href={`https://instagram.com/${groomInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full max-w-[240px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] hover:brightness-125 text-xs font-serif font-bold tracking-wider uppercase border-2 border-[#C5A059] shadow-lg transition-all hover:scale-105 active:scale-95 relative z-10 overflow-hidden group/btn"
                    >
                      <div 
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full"
                        style={{ animation: 'goldShimmerSweep 3s ease-in-out infinite' }}
                      />
                      <InstagramIcon size={14} className="text-[#C5A059]" />
                      <span>{groomInstagram}</span>
                    </a>
                  )}
                </div>

                {/* Mempelai Wanita */}
                <div className="flex flex-col items-center bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#F2E8D7] text-[#123326] p-7 sm:p-9 rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.45),0_0_35px_rgba(197,160,89,0.25)] border-2 border-[#C5A059] relative overflow-hidden group hover:border-[#E2C792] hover:-translate-y-2 hover:shadow-[0_35px_80px_rgba(197,160,89,0.35)] transition-all duration-500">
                  <GuillocheParchmentWatermark opacity={0.06} />
                  <div className="absolute inset-3 rounded-[28px] border-2 border-dashed border-[#C5A059]/45 pointer-events-none" />
                  <div className="absolute inset-5 rounded-[22px] border border-[#C5A059]/25 pointer-events-none" />
                  <NirwanaGoldCorner size={52} />

                  {/* Top Monogram Seal Badge */}
                  <div className="relative z-10 mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] border border-[#C5A059] shadow-md">
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-serif text-[11px] font-bold tracking-[0.2em] uppercase">The Bride • Mempelai Wanita</span>
                    <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  </div>

                  {/* Arched Photo Frame with Gilded Pine Branches, Aura Pulse & Twinkling Sparkles */}
                  <div className="relative my-3 z-10">
                    <GildedPineArchFlourish side="left" className="!w-12 !h-24 !-left-5" />
                    <GildedPineArchFlourish side="right" className="!w-12 !h-24 !-right-5" />

                    <Sparkles className="w-4 h-4 text-[#C5A059] absolute -top-2.5 -left-1.5 animate-pulse z-20 drop-shadow-[0_0_6px_#E2C792]" />
                    <Sparkles className="w-4 h-4 text-[#C5A059] absolute -top-2.5 -right-1.5 animate-pulse z-20 drop-shadow-[0_0_6px_#E2C792]" />

                    <div 
                      className="relative w-48 h-60 sm:w-52 sm:h-64 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#C5A059] p-1 bg-gradient-to-b from-[#FFF2D6] via-[#C5A059] to-[#8C6D2B] shadow-2xl group-hover:scale-105 transition-transform duration-500"
                      style={{ animation: 'photoAuraPulse 3.5s ease-in-out infinite alternate 0.5s' }}
                    >
                      <img 
                        src={bridePhotoImg} 
                        alt={brideFullName}
                        className="w-full h-full object-cover rounded-t-full rounded-b-xl"
                      />
                      {/* Gold Shimmer Sweep */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-t-full rounded-b-xl">
                        <div 
                          className="absolute inset-y-0 w-28 bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none"
                          style={{ animation: 'goldShimmerSweep 4.5s ease-in-out infinite 0.8s' }}
                        />
                      </div>
                    </div>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-[#123326] font-bold mt-2 mb-1 tracking-tight relative z-10 text-center">
                    {brideFullName}
                  </h3>
                  
                  <RoyalCalligraphicDivider className="my-2 max-w-[160px] relative z-10" />

                  {/* Parents Information Plaque */}
                  <div className="w-full my-3 py-3.5 px-4 rounded-2xl bg-gradient-to-b from-[#16382C]/[0.05] via-[#C5A059]/[0.08] to-[#16382C]/[0.05] border border-[#C5A059]/40 text-center relative z-10 shadow-xs">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D2B] font-serif font-bold block mb-1">
                      ✦ Putri Tercinta Dari ✦
                    </span>
                    <p className="font-serif font-bold text-sm text-[#123326] leading-snug">
                      {brideFather} <span className="font-normal text-xs text-[#4A7263]">&amp;</span> {brideMother}
                    </p>
                  </div>

                  {brideInstagram && (
                    <a 
                      href={`https://instagram.com/${brideInstagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 w-full max-w-[240px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] hover:brightness-125 text-xs font-serif font-bold tracking-wider uppercase border-2 border-[#C5A059] shadow-lg transition-all hover:scale-105 active:scale-95 relative z-10 overflow-hidden group/btn"
                    >
                      <div 
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full"
                        style={{ animation: 'goldShimmerSweep 3s ease-in-out infinite 0.5s' }}
                      />
                      <InstagramIcon size={14} className="text-[#C5A059]" />
                      <span>{brideInstagram}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: VENUE SPOTLIGHT & ACARA (HOTEL NIRWANA SARANGAN) */}
          <section id="event" className="pt-24 pb-44 px-4 sm:px-10 bg-gradient-to-b from-[#123729] via-[#0E2A1F] to-[#0A2017] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura behind venue card */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[750px] h-[750px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={20} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-2xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span>Rangkaian Acara • Wedding Schedule</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                  Waktu &amp; Tempat Pelaksanaan
                </h2>
                <RoyalCalligraphicDivider className="my-2.5 max-w-[260px] mx-auto" />
                <MountainPineHeritageCrest className="mb-4" />
                <p className="text-xs sm:text-sm text-white/85 max-w-lg mx-auto leading-relaxed font-light">
                  Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.
                </p>
              </div>

              {/* HOTEL NIRWANA VENUE HIGHLIGHT CARD - 5-Star Luxury Resort Showcase */}
              <div className="relative bg-[#122E24] text-white rounded-3xl overflow-hidden shadow-2xl mb-14 border-2 border-[#C5A059]/60 group">
                <div className="absolute inset-2 rounded-2xl border border-[#C5A059]/20 pointer-events-none z-20" />
                <NirwanaGoldCorner size={32} color="#E2C792" />

                <div className="relative h-68 sm:h-80 w-full overflow-hidden">
                  <img 
                    src={hotelExteriorImg} 
                    alt="Hotel Nirwana Sarangan Resort"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#122E24] via-black/40 to-transparent" />
                  
                  {/* Top VIP 5-Star Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#122E24]/90 backdrop-blur-md border border-[#C5A059]/60 shadow-lg text-xs text-[#E2C792] z-20">
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-serif tracking-wider uppercase text-[10px] font-semibold">Resor Pernikahan Bintang 5</span>
                  </div>

                  {/* 5 Gold Star Rating */}
                  <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 z-20">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-[#FFD700] fill-[#FFD700]" />
                    ))}
                  </div>

                  <div className="absolute bottom-5 left-6 right-6 z-20">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#E2C792] font-serif block mb-1">
                      EXCLUSIVE DESTINATION RESORT
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-normal text-white">
                      Hotel Nirwana Sarangan
                    </h3>
                    <p className="text-xs text-white/85 flex items-center gap-1.5 mt-1 font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>Kawasan Wisata Tepian Telaga Sarangan, Magetan, Jawa Timur</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 sm:p-8 relative z-20">
                  {/* 4 Feature Highlights Grid */}
                  <div className="grid grid-cols-2 gap-3 text-xs text-white/90 mb-6">
                    <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                      <Compass className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <div>
                        <strong className="block text-white text-[11px]">Tepi Danau Alami</strong>
                        <span className="text-[10px] text-white/70">Pemandangan Telaga Sarangan</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                      <Crown className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <div>
                        <strong className="block text-white text-[11px]">Grand Lake Ballroom</strong>
                        <span className="text-[10px] text-white/70">Kapasitas Tamu Luas &amp; Megah</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                      <div>
                        <strong className="block text-white text-[11px]">Fasilitas Bintang 5</strong>
                        <span className="text-[10px] text-white/70">Lift, Restoran &amp; Kamar Mewah</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2.5 bg-white/5 p-3 rounded-2xl border border-white/10 hover:border-[#C5A059]/40 transition-colors">
                      <Award className="w-4 h-4 text-[#C5A059] shrink-0" />
                      <div>
                        <strong className="block text-white text-[11px]">VIP Valet &amp; Parking</strong>
                        <span className="text-[10px] text-white/70">Keamanan &amp; Parkir Luas</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15">
                    <div className="text-xs text-white/80">
                      <span className="block font-medium text-[#E2C792]">Jl. Raya Telaga Sarangan No. 187</span>
                      <span className="text-[11px] text-white/60">Kec. Plaosan, Kabupaten Magetan 63361</span>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Hotel+Nirwana+Sarangan+Magetan"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/btn relative overflow-hidden inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#C5A059] via-[#E2C792] to-[#B38B3F] text-[#122E24] font-serif font-bold text-xs tracking-widest uppercase transition-all shadow-lg hover:scale-105 active:scale-95"
                    >
                      <div 
                        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full"
                        style={{ animation: 'goldShimmerSweep 2.5s ease-in-out infinite' }}
                      />
                      <Navigation className="w-4 h-4 text-[#122E24]" />
                      <span>Petunjuk Arah Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* EVENT CARDS - Royal Stationery Folios (Ultra-Luxury Bespoke Layout) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {displayEvents.map((evt, idx) => {
                  const eventTitle = evt.title || (evt as any).name || (idx === 0 ? 'Akad Nikah' : 'Resepsi Pernikahan');
                  
                  // For Nirwana Sarangan theme, venue is strictly Hotel Nirwana Sarangan Magetan
                  const isSoloVenue = 
                    ((evt as any).location && String((evt as any).location).toLowerCase().includes('zayed')) ||
                    ((evt as any).venue_name && String((evt as any).venue_name).toLowerCase().includes('zayed')) ||
                    ((evt as any).location && String((evt as any).location).toLowerCase().includes('saba')) ||
                    (evt.address && String(evt.address).toLowerCase().includes('surakarta'));

                  const eventVenue = !isSoloVenue && evt.location_name && !evt.location_name.toLowerCase().includes('zayed') && !evt.location_name.toLowerCase().includes('saba')
                    ? evt.location_name
                    : (idx === 0 ? 'Ballroom & Lakeside Terrace - Hotel Nirwana Sarangan' : 'Grand Lakeview Hall - Hotel Nirwana Sarangan');

                  const eventAddress = !isSoloVenue && evt.address && !evt.address.toLowerCase().includes('surakarta')
                    ? evt.address
                    : 'Jl. Raya Telaga Sarangan No. 187, Plaosan, Kabupaten Magetan, Jawa Timur 63361';

                  const eventMapsUrl = 'https://maps.google.com/?q=Hotel+Nirwana+Sarangan+Magetan';

                  const eventDesc = idx === 0 
                    ? 'Prosesi Ijab Qabul Sakral Berlatar Sejuknya Panorama Telaga Sarangan' 
                    : 'Resepsi Pernikahan Megah & Santap Siang Berlatar Danau Alami';

                  const rawDate = evt.event_date || (evt as any).date || '2026-12-12';
                  const dateObj = new Date(rawDate);
                  const formattedDate = !isNaN(dateObj.getTime())
                    ? dateObj.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Sabtu, 12 Desember 2026';

                  return (
                    <div 
                      key={evt.id || idx}
                      className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#F2E8D7] text-[#123326] p-8 sm:p-9 rounded-[36px] border-2 border-[#C5A059] text-center flex flex-col justify-between hover:border-[#E2C792] hover:shadow-[0_30px_70px_rgba(197,160,89,0.35)] hover:-translate-y-1.5 transition-all duration-500 shadow-[0_20px_50px_rgba(10,31,24,0.35)] overflow-hidden group"
                    >
                      {/* Tactile Guilloché Banknote Watermark */}
                      <GuillocheParchmentWatermark opacity={0.07} />
                      <div className="absolute inset-3 rounded-[28px] border-2 border-dashed border-[#C5A059]/45 pointer-events-none" />
                      <div className="absolute inset-5 rounded-[22px] border border-[#C5A059]/20 pointer-events-none" />
                      <NirwanaGoldCorner size={52} />

                      {/* Gold Light Sweep Animation */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[36px]">
                        <div 
                          className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none -translate-x-full"
                          style={{ animation: `goldShimmerSweep 5s ease-in-out infinite ${idx * 0.8}s` }}
                        />
                      </div>

                      <div className="relative z-10 flex flex-col items-center">
                        {/* Top Category Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#16382C]/10 border border-[#C5A059]/50 text-[#8C6D2B] text-[10.5px] font-serif uppercase tracking-[0.25em] font-bold mb-4 shadow-xs">
                          <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                          <span>{idx === 0 ? 'Sacred Solemnization' : 'Grand Celebration'}</span>
                          <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                        </div>

                        {/* 3D Emerald & Gold Royal Heraldic Seal */}
                        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0C241B] via-[#163D2E] to-[#081712] text-[#E8D5A3] flex items-center justify-center mx-auto mb-4 border-2 border-[#C5A059] shadow-[0_10px_25px_rgba(12,36,27,0.45),inset_0_1px_2px_rgba(255,255,255,0.3)] group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                          <div className="absolute inset-1 rounded-xl border border-[#C5A059]/40 pointer-events-none" />
                          {idx === 0 ? (
                            <Crown className="w-8 h-8 text-[#E2C792] drop-shadow-[0_2px_8px_rgba(197,160,89,0.5)]" />
                          ) : (
                            <Sparkles className="w-8 h-8 text-[#E2C792] drop-shadow-[0_2px_8px_rgba(197,160,89,0.5)]" />
                          )}
                        </div>
                        
                        {/* Event Title with Rich Gold-Emerald Gradient */}
                        <h3 
                          className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#123326] via-[#1F4E3B] to-[#123326] font-bold mb-1 tracking-wide uppercase drop-shadow-xs"
                          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        >
                          {eventTitle}
                        </h3>

                        <RoyalCalligraphicDivider className="my-2 max-w-[200px] mx-auto" />

                        {/* Date Cartouche */}
                        <div className="my-2 px-4 py-1.5 rounded-full bg-[#16382C]/[0.05] border border-[#C5A059]/35 shadow-xs">
                          <p className="text-xs sm:text-[13px] uppercase tracking-[0.2em] text-[#8C6D2B] font-serif font-bold">
                            ✦ {formattedDate} ✦
                          </p>
                        </div>

                        {/* Time & Session Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] border border-[#C5A059] text-xs font-serif font-bold tracking-wider uppercase my-2.5 shadow-md">
                          <Clock className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                          <span>Pukul {evt.start_time} - {evt.end_time || 'Selesai'} WIB</span>
                        </div>

                        {/* Venue & Location Cartouche */}
                        <div className="w-full my-3 py-3.5 px-4 rounded-2xl bg-white/80 border border-[#C5A059]/40 backdrop-blur-xs shadow-xs text-center">
                          <div className="flex items-center justify-center gap-1.5 mb-1 text-[#8C6D2B]">
                            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
                            <span className="font-serif font-bold text-sm sm:text-base text-[#123326] tracking-tight">
                              {eventVenue}
                            </span>
                          </div>
                          <p className="text-xs text-[#2A4D3E] leading-relaxed font-light">
                            {eventAddress}
                          </p>
                          {eventDesc && (
                            <p className="text-[11px] text-[#8C6D2B] italic mt-2 font-serif border-t border-[#C5A059]/20 pt-1.5">
                              &ldquo;{eventDesc}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons: Google Maps & Save to Calendar */}
                      <div className="flex flex-col gap-3 pt-4 border-t border-[#C5A059]/30 relative z-20">
                        <a
                          href={eventMapsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#C5A059] via-[#E2C792] to-[#B38B3F] text-[#122E24] text-xs font-serif font-bold uppercase tracking-widest hover:brightness-110 active:scale-98 transition-all shadow-[0_6px_20px_rgba(197,160,89,0.35)] group/btn"
                        >
                          <div 
                            className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full"
                            style={{ animation: 'goldShimmerSweep 3s ease-in-out infinite' }}
                          />
                          <Navigation className="w-4 h-4 text-[#122E24]" />
                          <span>Petunjuk Arah Google Maps</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setCalendarModalEvent({
                            title: `The Wedding of ${groomName} & ${brideName} - ${eventTitle}`,
                            description: `Pernikahan ${groomFullName} & ${brideFullName} bertempat di ${eventVenue}.`,
                            location: eventAddress,
                            eventDate: evt.event_date || (evt as any).date,
                            startTime: evt.start_time,
                            endTime: evt.end_time,
                          })}
                          className="relative overflow-hidden inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-[#0C241B] via-[#163D2E] to-[#0C241B] text-[#E8D5A3] text-xs font-serif font-bold uppercase tracking-widest hover:brightness-125 border-2 border-[#C5A059] active:scale-98 transition-all shadow-md cursor-pointer group/btn"
                        >
                          <Calendar className="w-4 h-4 text-[#C5A059]" />
                          <span>Simpan ke Kalender</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 5: LOVE STORY */}
          <section id="story" className="pt-24 pb-44 px-4 sm:px-10 bg-gradient-to-b from-[#0A2017] via-[#0E2C20] to-[#123729] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[650px] h-[650px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 6s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={16} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-2xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span>Kisah Kasih • Love Journey</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                  Cerita Cinta Kami
                </h2>
                <RoyalCalligraphicDivider className="my-2.5 max-w-[260px] mx-auto" />
                <MountainPineHeritageCrest className="mb-4" />
                <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto leading-relaxed">
                  Sebuah perjalanan indah yang bersemi dan berlabuh di pelukan suci pernikahan.
                </p>
              </div>

              <div className="relative pl-8 sm:pl-10 space-y-12 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#C5A059] before:via-[#E2C792] before:to-[#8C6D2B]">
                {displayStories.map((story, i) => {
                  const storyContent = (story as any).content || (story as any).story || (story as any).description || 'Sebuah kisah cinta penuh makna yang membawa kami berdua menuju pelaminan suci.';
                  
                  return (
                    <div key={story.id || i} className="relative group">
                      {/* 24K Gold 3D Timeline Heraldic Node */}
                      <div className="absolute -left-[38px] sm:-left-[46px] top-1.5 w-7 h-7 rounded-lg rotate-45 bg-gradient-to-br from-[#0C241B] via-[#163D2E] to-[#071712] border-2 border-[#C5A059] shadow-[0_4px_12px_rgba(0,0,0,0.6),0_0_8px_rgba(197,160,89,0.5)] flex items-center justify-center group-hover:scale-125 group-hover:border-[#FFE5A3] transition-all duration-300">
                        <Sparkles className="w-3.5 h-3.5 text-[#E2C792] -rotate-45" />
                      </div>
                      
                      {/* Date Badge */}
                      <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0C241B] to-[#163D2E] text-[#E8D5A3] text-[11px] font-serif font-bold tracking-widest uppercase mb-2.5 border border-[#C5A059] shadow-md">
                        <Calendar className="w-3 h-3 text-[#C5A059]" />
                        <span>{story.date}</span>
                      </div>

                      {/* Story Chapter Title */}
                      <h3 
                        className="font-serif text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] font-normal mb-3 tracking-wide"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {story.title}
                      </h3>

                      {/* Bespoke Story Parchment Folio Card (Clean, Elegant & Royal) */}
                      <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF5EA] to-[#F2E8D7] p-7 sm:p-9 rounded-[28px] border-2 border-[#C5A059] shadow-[0_20px_45px_rgba(0,0,0,0.35)] text-sm text-[#1A3D2F] leading-relaxed overflow-hidden group-hover:border-[#E2C792] group-hover:shadow-[0_25px_60px_rgba(197,160,89,0.3)] transition-all duration-500">
                        {/* Guilloché Watermark */}
                        <GuillocheParchmentWatermark opacity={0.07} />
                        
                        {/* Inset Gold Dashed Frame */}
                        <div className="absolute inset-2.5 rounded-[20px] border border-dashed border-[#C5A059]/40 pointer-events-none" />
                        <NirwanaGoldCorner size={32} />

                        {/* Gold Shimmer Sweep */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
                          <div 
                            className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none -translate-x-full"
                            style={{ animation: `goldShimmerSweep 5s ease-in-out infinite ${i * 1.2}s` }}
                          />
                        </div>

                        {/* Large Calligraphic Opening Quote */}
                        <div className="relative z-10 flex gap-3 sm:gap-4 items-start">
                          <span className="text-3xl sm:text-4xl font-serif text-[#C5A059]/60 select-none leading-none -mt-1">&ldquo;</span>
                          <div className="flex-1">
                            <p className="font-serif text-[14px] sm:text-base text-[#1D4032] leading-relaxed font-light italic">
                              {storyContent}
                            </p>
                          </div>
                          <span className="text-3xl sm:text-4xl font-serif text-[#C5A059]/60 select-none leading-none self-end -mb-2">&rdquo;</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 6: GALERI FOTO PREWEDDING */}
          <section id="gallery" className="pt-24 pb-36 px-6 sm:px-12 bg-gradient-to-b from-[#123729] via-[#0E281F] to-[#0A1F17] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[650px] h-[650px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={16} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-3xl mx-auto relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span>Dokumentasi Bahagia • Gallery</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                  Galeri Romansa
                </h2>
                <RoyalCalligraphicDivider className="my-2.5 max-w-[240px] mx-auto" />
                <MountainPineHeritageCrest className="mb-4" />
                <p className="text-xs sm:text-sm text-white/85 max-w-lg mx-auto leading-relaxed font-light">
                  Momen-momen bahagia yang terabadikan dalam kehangatan cinta berlatar keindahan Telaga Sarangan.
                </p>
              </div>

              {/* Royal Carousel & Featured Showcase */}
              {(() => {
                const totalPhotos = displayGallery.length;
                const safeIdx = totalPhotos > 0 ? ((activeGalleryIdx % totalPhotos) + totalPhotos) % totalPhotos : 0;
                const currentPhoto = displayGallery[safeIdx] || displayGallery[0] || {
                  image_url: '/photos/photo-3.jpg',
                  caption: 'Romansa Kasih Steven & Bunga'
                };

                return (
                  <div className="relative max-w-2xl mx-auto">
                    {/* Outer Gilded Royal Frame */}
                    <div className="relative p-2 sm:p-2.5 rounded-3xl sm:rounded-[32px] bg-gradient-to-b from-[#E2C792]/40 via-[#C5A059]/25 to-[#8C6D2B]/40 border border-[#C5A059]/70 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(197,160,89,0.25)]">
                      
                      {/* Inner Showcase Box */}
                      <div className="relative rounded-2xl sm:rounded-[26px] overflow-hidden bg-[#0A1B14] group">
                        {/* Royal Gilded Acanthus Corner Ornaments */}
                        <NirwanaGoldCorner size={40} className="opacity-85 pointer-events-none" />

                        {/* Top Badges Bar: Counter & Enlarge Button */}
                        <div className="absolute top-3.5 inset-x-3.5 sm:top-4 sm:inset-x-4 z-20 flex items-center justify-between pointer-events-none">
                          {/* Photo Counter Pill */}
                          <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E281F]/85 backdrop-blur-md border border-[#C5A059]/70 text-[#FFF0D0] text-[11px] font-serif shadow-md">
                            <Sparkles className="w-3 h-3 text-[#E2C792]" />
                            <span>Foto {safeIdx + 1} dari {totalPhotos}</span>
                          </div>

                          {/* Quick Enlarge Lightbox Button */}
                          <button
                            type="button"
                            onClick={() => setSelectedImage(currentPhoto.image_url)}
                            className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0E281F]/85 hover:bg-[#C5A059] backdrop-blur-md border border-[#C5A059]/70 text-[#FFF0D0] hover:text-[#0E281F] text-[11px] font-serif transition-all shadow-md group/zoom cursor-pointer"
                            title="Lihat Layar Penuh"
                          >
                            <Maximize2 className="w-3 h-3 text-[#E2C792] group-hover/zoom:text-[#0E281F] transition-colors" />
                            <span className="hidden sm:inline">Perbesar</span>
                          </button>
                        </div>

                        {/* Featured Main Photo */}
                        <div 
                          onClick={() => setSelectedImage(currentPhoto.image_url)}
                          className="relative aspect-[4/3] sm:aspect-[16/10] w-full cursor-pointer overflow-hidden flex items-center justify-center bg-black/40"
                        >
                          <img 
                            key={currentPhoto.id || safeIdx}
                            src={currentPhoto.image_url} 
                            alt={currentPhoto.caption || `Galeri ${safeIdx + 1}`}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          />

                          {/* Subtle Vignette & Gradient Overlays */}
                          <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#081510]/95 via-transparent to-black/30 pointer-events-none" />
                        </div>

                        {/* Navigation Arrow: Prev */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGalleryIdx((prev) => (prev > 0 ? prev - 1 : totalPhotos - 1));
                          }}
                          aria-label="Foto Sebelumnya"
                          className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0E281F]/85 hover:bg-[#C5A059] backdrop-blur-md border border-[#C5A059]/80 text-[#FFF0D0] hover:text-[#0E281F] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 z-20 cursor-pointer"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Navigation Arrow: Next */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveGalleryIdx((prev) => (prev < totalPhotos - 1 ? prev + 1 : 0));
                          }}
                          aria-label="Foto Selanjutnya"
                          className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#0E281F]/85 hover:bg-[#C5A059] backdrop-blur-md border border-[#C5A059]/80 text-[#FFF0D0] hover:text-[#0E281F] flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95 z-20 cursor-pointer"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        {/* Bottom Caption Overlay Strip */}
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#081510] via-[#081510]/85 to-transparent pt-8 pb-3.5 px-4 text-center pointer-events-none">
                          <p className="font-serif text-sm sm:text-base text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] drop-shadow-sm font-medium">
                            ✦ {currentPhoto.caption || 'Romansa Kasih Steven & Bunga'} ✦
                          </p>
                          <p className="text-[10px] text-white/50 tracking-wider uppercase font-sans mt-0.5">
                            Ketuk foto untuk melihat layar penuh
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Horizontal Filmstrip Thumbnail Dock */}
                    <div className="mt-5 sm:mt-6">
                      <div className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 py-2 px-1 overflow-x-auto no-scrollbar scroll-smooth">
                        {displayGallery.map((item, idx) => {
                          const isActive = idx === safeIdx;
                          return (
                            <button
                              key={item.id || idx}
                              type="button"
                              onClick={() => setActiveGalleryIdx(idx)}
                              className={`relative flex-shrink-0 w-14 h-18 sm:w-16 sm:h-20 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                                isActive 
                                  ? 'border-2 border-[#E2C792] scale-105 shadow-[0_0_16px_rgba(197,160,89,0.7)] ring-2 ring-[#C5A059]/70 opacity-100 z-10' 
                                  : 'border border-[#C5A059]/40 opacity-55 hover:opacity-100 hover:border-[#E2C792]/80 hover:scale-102'
                              }`}
                            >
                              <img 
                                src={item.image_url} 
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                              {isActive && (
                                <div className="absolute inset-0 bg-[#C5A059]/15 pointer-events-none ring-1 ring-inset ring-[#E2C792]" />
                              )}
                              <div className="absolute bottom-1 right-1 px-1 rounded bg-black/70 text-[9px] font-mono text-[#FFF0D0] leading-tight">
                                {idx + 1}
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </section>

          {/* SECTION 7: WEDDING GIFT / AMPLOP DIGITAL (Luxury VIP Concierge Cards) */}
          <section id="gift" className="pt-24 pb-36 px-6 sm:px-12 bg-gradient-to-b from-[#0A1F17] via-[#0D241C] to-[#102F23] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[650px] h-[650px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={16} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-xl mx-auto text-center relative z-10">
              <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                <span>Tanda Kasih • Wedding Gift</span>
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                Amplop Digital &amp; Kado
              </h2>
              <RoyalCalligraphicDivider className="my-2.5 max-w-[240px] mx-auto" />
              <MountainPineHeritageCrest className="mb-4" />
              <p className="text-xs sm:text-sm text-white/85 leading-relaxed mb-10 font-light">
                Doa restu Anda merupakan karunia terindah bagi kami. Namun apabila ingin memberikan tanda kasih berupa kado pernikahan, dapat disalurkan melalui:
              </p>

              {/* Royal Segmented Tab Switcher */}
              <div className="inline-flex p-1.5 rounded-2xl bg-[#081711]/90 backdrop-blur-md border border-[#C5A059]/60 shadow-xl mb-8">
                <button
                  type="button"
                  onClick={() => setGiftTab('transfer')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all cursor-pointer ${
                    giftTab === 'transfer'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#0A1F17] font-bold shadow-md scale-[1.02]'
                      : 'text-[#FFF0D0]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Transfer Bank / E-Wallet</span>
                </button>
                <button
                  type="button"
                  onClick={() => setGiftTab('physical')}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-serif font-semibold transition-all cursor-pointer ${
                    giftTab === 'physical'
                      ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#0A1F17] font-bold shadow-md scale-[1.02]'
                      : 'text-[#FFF0D0]/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Package className="w-4 h-4" />
                  <span>Kirim Kado Fisik</span>
                </button>
              </div>

              {/* TAB 1: ROYAL VIP METAL CARDS */}
              {giftTab === 'transfer' && (
                <div className="space-y-6">
                  {(() => {
                    const hasValidCustomGifts = gifts && gifts.length > 0 && 
                      !gifts.some((g: any) => 
                        !g.bank_name || 
                        g.account_name?.includes('DEMO') || 
                        g.account_name?.includes('BIMA') || 
                        g.account_number === '1234 5678 90'
                      );

                    const activeGifts = hasValidCustomGifts ? gifts : [
                      {
                        id: 'bca',
                        bank_name: 'BANK CENTRAL ASIA',
                        bank_code: 'BCA',
                        tier: 'BCA PRIORITAS • EMERALD METAL',
                        account_number: '0141 8892 31',
                        raw_number: '0141889231',
                        account_name: groomFullName || 'Steven Pratama, S.Kom.',
                      },
                      {
                        id: 'mandiri',
                        bank_name: 'BANK MANDIRI',
                        bank_code: 'MANDIRI',
                        tier: 'MANDIRI PRIORITAS • ROYAL GOLD',
                        account_number: '1380 0214 7821',
                        raw_number: '138002147821',
                        account_name: brideFullName || 'Bunga Citra Lestari, S.E.',
                      }
                    ];

                    return activeGifts.map((gift: any, idx: number) => {
                      const isBca = gift.bank_code === 'BCA' || gift.bank_name?.includes('BCA') || gift.bank_name?.includes('CENTRAL ASIA');
                      const isMandiri = gift.bank_code === 'MANDIRI' || gift.bank_name?.includes('MANDIRI');

                      return (
                        <div 
                          key={gift.id || idx}
                          className="relative bg-gradient-to-br from-[#123125] via-[#0B2018] to-[#05110D] text-white p-6 sm:p-7 rounded-3xl border-2 border-[#C5A059]/75 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(197,160,89,0.22)] text-left overflow-hidden group transition-all duration-300 hover:border-[#E2C792]"
                        >
                          {/* High-End Metallic Diagonal Highlights */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C5A059]/10 to-white/5 pointer-events-none" />
                          <div className="absolute inset-1.5 rounded-2xl border border-[#C5A059]/30 pointer-events-none" />
                          <NirwanaGoldCorner size={28} color="#E2C792" />

                          {/* Top Row: Official Bank Brand Badge & Contactless Chip */}
                          <div className="flex items-center justify-between mb-5 relative z-10">
                            <div className="flex items-center gap-3">
                              {isBca ? (
                                <div className="px-2.5 py-1 rounded-md bg-[#003B82] border border-white/30 shadow-sm flex items-center justify-center">
                                  <span className="font-sans font-black text-xs tracking-wider text-white">BCA</span>
                                </div>
                              ) : isMandiri ? (
                                <div className="px-2.5 py-1 rounded-md bg-[#002D5A] border border-[#F5A623]/40 shadow-sm flex items-center justify-center">
                                  <span className="font-sans font-bold text-xs tracking-wider text-[#F5A623]">mandiri</span>
                                </div>
                              ) : (
                                <div className="px-2.5 py-1 rounded-md bg-[#C5A059] border border-white/30 shadow-sm flex items-center justify-center">
                                  <span className="font-sans font-black text-xs tracking-wider text-[#0A1F17] uppercase">{gift.bank_code || 'BANK'}</span>
                                </div>
                              )}

                              <div>
                                <span className="font-serif font-bold text-xs sm:text-sm tracking-wider text-[#E2C792] uppercase block">
                                  {gift.bank_name || 'BANK CENTRAL ASIA'}
                                </span>
                                <span className="text-[9px] font-sans tracking-widest text-white/50 uppercase block">
                                  {gift.tier || 'Prioritas • VIP Metal Card'}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <Wifi className="w-5 h-5 text-[#E2C792] rotate-90 drop-shadow-sm" />
                              <CreditCard className="w-5 h-5 text-[#C5A059] drop-shadow-sm" />
                            </div>
                          </div>

                          {/* Realistic EMV Smart Chip */}
                          <div className="mb-5 relative z-10 flex items-center justify-between">
                            <EMVGoldSmartChip />
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 border border-[#C5A059]/40 text-[#E2C792] text-[10px] font-serif">
                              <ShieldCheck className="w-3.5 h-3.5 text-[#E2C792]" />
                              <span>Secure Transfer</span>
                            </div>
                          </div>

                          {/* Embossed Metallic Foil Card Number */}
                          <div className="mb-4 relative z-10">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-[#E2C792]/70 block mb-1 font-sans">Nomor Rekening</span>
                            <div className="font-mono text-xl sm:text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-[#FFFDF8] via-[#FFF0D0] to-[#E2C792] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                              {gift.account_number}
                            </div>
                          </div>

                          {/* Cardholder & Salin Rekening Button */}
                          <div className="flex items-center justify-between pt-3 border-t border-white/15 relative z-10">
                            <div>
                              <span className="text-[9px] uppercase tracking-widest text-[#E2C792]/80 block">Atas Nama (Penerima)</span>
                              <span className="font-serif text-xs sm:text-sm font-semibold text-white tracking-wide">{gift.account_name}</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopy(gift.raw_number || String(gift.account_number).replace(/\s+/g, ''), `gift-${gift.id || idx}`)}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E2C792] to-[#B38F46] hover:from-[#E2C792] hover:to-[#C5A059] text-[#0D241C] text-xs font-bold font-serif uppercase tracking-wider shadow-lg hover:shadow-[0_0_18px_rgba(197,160,89,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                            >
                              {isCopied === `gift-${gift.id || idx}` ? (
                                <>
                                  <Check className="w-4 h-4 text-[#0D241C]" />
                                  <span>Tersalin</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-4 h-4 text-[#0D241C]" />
                                  <span>Salin Rekening</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              )}

              {/* TAB 2: KIRIM KADO FISIK / PARCEL */}
              {giftTab === 'physical' && (
                <div className="relative bg-gradient-to-br from-[#123125] via-[#0B2018] to-[#05110D] text-white p-6 sm:p-8 rounded-3xl border-2 border-[#C5A059]/75 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_25px_rgba(197,160,89,0.22)] text-left overflow-hidden">
                  <div className="absolute inset-1.5 rounded-2xl border border-[#C5A059]/30 pointer-events-none" />
                  <NirwanaGoldCorner size={28} color="#E2C792" />

                  {/* Header with Gift Icon */}
                  <div className="flex items-center gap-4 mb-6 relative z-10">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#C5A059]/30 via-[#1A4232] to-[#0B2018] border border-[#C5A059] flex items-center justify-center shadow-lg flex-shrink-0">
                      <Gift className="w-7 h-7 text-[#E2C792]" />
                    </div>
                    <div>
                      <span className="font-serif text-lg sm:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] block">
                        Pengiriman Kado Fisik
                      </span>
                      <span className="text-xs text-white/70 font-light">
                        Alamat Penerimaan Kado Pernikahan &amp; Parcel
                      </span>
                    </div>
                  </div>

                  {/* Address Details Card */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-[#C5A059]/40 mb-6 relative z-10 space-y-3.5 text-xs sm:text-sm">
                    <div className="flex items-start gap-2.5">
                      <Crown className="w-4 h-4 text-[#E2C792] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80 block font-sans">Penerima Paket</span>
                        <span className="font-serif font-bold text-white text-sm sm:text-base">{groomFullName} &amp; {brideFullName}</span>
                        <span className="text-white/60 text-xs block">d/a Hotel Nirwana Sarangan (Wedding Reception)</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2.5 border-t border-white/10">
                      <MapPin className="w-4 h-4 text-[#E2C792] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80 block font-sans">Alamat Tujuan Pengiriman</span>
                        <p className="text-white/90 leading-relaxed font-light mt-0.5">
                          Hotel Nirwana Sarangan (Front Desk / Panitia Resepsi Steven &amp; Bunga)<br />
                          Jl. Raya Telaga Sarangan No. 187, Ngluweng, Plaosan,<br />
                          Kabupaten Magetan, Jawa Timur 63361
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5 pt-2.5 border-t border-white/10">
                      <Clock className="w-4 h-4 text-[#E2C792] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-[#E2C792]/80 block font-sans">Kontak / Penerima</span>
                        <span className="text-white font-mono font-medium">0812-3456-7890 (Panitia Pernikahan)</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Actions: Salin Alamat & Konfirmasi WhatsApp */}
                  <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10">
                    <button
                      type="button"
                      onClick={() => handleCopy('Hotel Nirwana Sarangan (Front Desk / Resepsi Steven & Bunga), Jl. Raya Telaga Sarangan No. 187, Ngluweng, Plaosan, Kabupaten Magetan, Jawa Timur 63361 (Telp: 0812-3456-7890)', 'gift-physical-addr')}
                      className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E2C792] to-[#B38F46] hover:from-[#E2C792] hover:to-[#C5A059] text-[#0D241C] text-xs sm:text-sm font-bold font-serif uppercase tracking-wider shadow-lg hover:shadow-[0_0_18px_rgba(197,160,89,0.5)] hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      {isCopied === 'gift-physical-addr' ? (
                        <>
                          <Check className="w-4 h-4 text-[#0D241C]" />
                          <span>Alamat Berhasil Disalin</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-[#0D241C]" />
                          <span>Salin Alamat Lengkap</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`https://wa.me/6281234567890?text=${encodeURIComponent('Halo Steven & Bunga, saya ingin mengonfirmasi bahwa saya telah mengirimkan kado pernikahan / tanda kasih ke alamat Hotel Nirwana Sarangan. Terima kasih!')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/60 text-[#25D366] text-xs sm:text-sm font-serif font-bold tracking-wider hover:scale-102 active:scale-98 transition-all cursor-pointer"
                    >
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                      <span>Konfirmasi via WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 8: RSVP & BUKU UCAPAN (Ultra-Luxury Gilded Form) */}
          <section id="rsvp" className="pt-24 pb-44 px-6 sm:px-12 bg-gradient-to-b from-[#102F23] via-[#0C2219] to-[#122E24] relative text-white overflow-hidden">
            {/* Ambient Gold Mist Aura */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div 
                className="w-[650px] h-[650px] rounded-full bg-[#C5A059]/15 blur-3xl pointer-events-none"
                style={{ animation: 'ambientAuraPulse 5s ease-in-out infinite alternate' }}
              />
            </div>

            {/* Falling 24K Gold Foil Flakes & Twinkling Stars */}
            <FallingPineParticles count={18} />

            {/* Top and Bottom Royal Golden Hairline Rules */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C5A059]/50 to-transparent" />

            <div className="max-w-xl mx-auto relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#16382C]/70 backdrop-blur-md border border-[#C5A059] text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-4 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                  <span>Konfirmasi Kehadiran • RSVP</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#C5A059] animate-pulse" />
                </div>
                <h2 className="font-serif text-3xl sm:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                  RSVP &amp; Doa Restu
                </h2>
                <RoyalCalligraphicDivider className="my-2.5 max-w-[240px] mx-auto" />
                <MountainPineHeritageCrest className="mb-4" />
                <p className="text-xs sm:text-sm text-white/85 max-w-lg mx-auto leading-relaxed font-light">
                  Mohon kesediaan Bapak/Ibu/Saudara/i untuk mengonfirmasi kehadiran serta mengirimkan untaian doa.
                </p>
              </div>

              {/* RSVP Form Card with Royal Emerald-Gold VIP Aesthetic */}
              <form onSubmit={handleSubmitRsvp} className="relative bg-gradient-to-br from-[#123125] via-[#0B2018] to-[#05110D] text-white p-7 sm:p-10 rounded-[32px] border-2 border-[#C5A059]/80 shadow-[0_25px_60px_rgba(0,0,0,0.6),0_0_35px_rgba(197,160,89,0.25)] mb-12 overflow-hidden">
                {/* High-End Metallic Sheen & Watermark */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C5A059]/10 to-white/5 pointer-events-none" />
                <GuillocheParchmentWatermark opacity={0.06} />
                <div className="absolute inset-2 sm:inset-3 rounded-[24px] border border-[#C5A059]/35 pointer-events-none" />
                <NirwanaGoldCorner size={36} color="#E2C792" />

                <div className="space-y-5 relative z-10">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E2C792] mb-2 font-serif">
                      Nama Lengkap Anda *
                    </label>
                    <input 
                      type="text"
                      required
                      value={rsvpName}
                      onChange={e => setRsvpName(e.target.value)}
                      placeholder="Contoh: Bpk. Muhammad Ilham"
                      className="w-full px-4 py-3.5 rounded-xl border border-[#C5A059]/50 focus:border-[#E2C792] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 bg-[#071711]/90 text-white placeholder-white/40 text-xs sm:text-sm font-sans transition-all shadow-inner"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E2C792] mb-2 font-serif">
                      Konfirmasi Kehadiran *
                    </label>
                    <div className="relative">
                      <select
                        value={rsvpStatus}
                        onChange={e => setRsvpStatus(e.target.value as any)}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#C5A059]/50 focus:border-[#E2C792] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 bg-[#071711]/90 text-white text-xs sm:text-sm font-sans transition-all shadow-inner appearance-none pr-10 cursor-pointer"
                      >
                        <option value="attending" className="bg-[#0B2018] text-white">Hadir (Saya akan hadir di Hotel Nirwana Sarangan)</option>
                        <option value="not_attending" className="bg-[#0B2018] text-white">Maaf, Tidak Bisa Hadir</option>
                        <option value="maybe" className="bg-[#0B2018] text-white">Masih Ragu / Belum Pasti</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#C5A059] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {rsvpStatus === 'attending' && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#E2C792] mb-2 font-serif">
                        Jumlah Tamu yang Hadir
                      </label>
                      <input 
                        type="number"
                        min="1"
                        max="5"
                        value={rsvpGuests}
                        onChange={e => setRsvpGuests(parseInt(e.target.value) || 1)}
                        className="w-full px-4 py-3.5 rounded-xl border border-[#C5A059]/50 focus:border-[#E2C792] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 bg-[#071711]/90 text-white text-xs sm:text-sm font-sans transition-all shadow-inner"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#E2C792] mb-2 font-serif">
                      Untaian Doa &amp; Ucapan Selamat
                    </label>
                    <textarea 
                      rows={3}
                      value={rsvpMessage}
                      onChange={e => setRsvpMessage(e.target.value)}
                      placeholder="Tuliskan ucapan selamat dan doa terbaik Anda untuk kedua mempelai..."
                      className="w-full px-4 py-3.5 rounded-xl border border-[#C5A059]/50 focus:border-[#E2C792] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/40 bg-[#071711]/90 text-white placeholder-white/40 text-xs sm:text-sm font-sans resize-none transition-all shadow-inner"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingRsvp}
                    className="relative overflow-hidden w-full py-4 rounded-xl bg-gradient-to-r from-[#C5A059] via-[#E2C792] to-[#B38F46] hover:from-[#E2C792] hover:to-[#C5A059] text-[#0A1F17] font-serif font-bold text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:shadow-[0_0_25px_rgba(197,160,89,0.6)] transition-all duration-300 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  >
                    <div 
                      className="absolute inset-0 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      style={{ animation: 'goldShimmerSweep 2.5s ease-in-out infinite' }}
                    />
                    <div className="relative flex items-center justify-center gap-2">
                      <Send className="w-4 h-4 text-[#0A1F17]" />
                      <span>{isSubmittingRsvp ? 'Mengirim Konfirmasi...' : 'Kirim Konfirmasi & Doa Restu'}</span>
                    </div>
                  </button>
                </div>
              </form>

              {/* VIP GUEST VERIFIED PASS (Holographic Card) */}
              {savedPass && (
                <div className="relative bg-gradient-to-br from-[#123125] via-[#0B2018] to-[#05110D] text-white p-7 rounded-3xl border-2 border-[#C5A059] shadow-2xl mb-12 text-center overflow-hidden">
                  <div className="absolute inset-1.5 rounded-2xl border border-[#C5A059]/30 pointer-events-none" />
                  <NirwanaGoldCorner size={28} color="#E2C792" />

                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C5A059]/20 text-xs text-[#E2C792] mb-3 border border-[#C5A059]/40">
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="font-serif tracking-wider font-semibold uppercase text-[10px]">VIP Guest Pass Terverifikasi</span>
                  </div>

                  <h3 className="font-serif text-xl font-medium text-white mb-1">
                    {savedPass.name || savedPass.guestName}
                  </h3>
                  <p className="text-xs text-[#E2C792] mb-4 font-serif">
                    Jumlah Kehadiran: {savedPass.guests || savedPass.pax || 1} Orang • Hotel Nirwana Sarangan
                  </p>

                  <div className="bg-white p-3.5 rounded-2xl inline-block shadow-md">
                    <div className="font-mono text-sm tracking-widest text-[#16382C] font-bold py-2 px-6 border-2 border-dashed border-[#C5A059] rounded-lg">
                      {savedPass.code}
                    </div>
                  </div>

                  <p className="text-[11px] text-white/70 mt-3 font-light">
                    Tunjukkan barcode VIP ini kepada resepsionis saat tiba di lokasi Hotel Nirwana Sarangan.
                  </p>
                </div>
              )}

              {/* LIST OF GUEST WISHES (Royal Registry Ledger) */}
              <div className="space-y-4">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#E2C792] mb-4 flex items-center justify-between font-serif">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Doa &amp; Ucapan dari Sahabat</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#081812] border border-[#C5A059]/50 text-[#E2C792] font-mono text-xs font-bold">
                    {rsvpItems.length}
                  </span>
                </h3>
                <div className="max-h-80 overflow-y-auto space-y-3 pr-1 no-scrollbar">
                  {rsvpItems.length > 0 ? (
                    rsvpItems.map((item, idx) => (
                      <div 
                        key={item.id || idx} 
                        className="relative bg-gradient-to-br from-[#123125] via-[#0B2018] to-[#05110D] p-5 rounded-2xl border border-[#C5A059]/60 text-xs shadow-lg overflow-hidden group hover:border-[#E2C792] transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[#FFF0D0] font-serif text-sm tracking-wide">
                            {item.name || (item as any).guest_name || 'Tamu Undangan'}
                          </span>
                          <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-serif font-medium ${
                            (item.attendance || (item as any).status) === 'attending' 
                              ? 'bg-[#C5A059]/20 text-[#E2C792] border border-[#C5A059]/50' 
                              : 'bg-white/10 text-white/60 border border-white/20'
                          }`}>
                            {(item.attendance || (item as any).status) === 'attending' ? '✦ Hadir' : 'Berhalangan'}
                          </span>
                        </div>
                        {item.message && (
                          <p className="text-white/85 leading-relaxed mt-1.5 italic font-light">
                            &ldquo;{item.message}&rdquo;
                          </p>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-white/60 bg-[#081812]/80 rounded-2xl border border-dashed border-[#C5A059]/30">
                      Jadilah yang pertama mengirimkan ucapan doa restu.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: CLOSING */}
          <section className="pt-24 pb-44 px-6 sm:px-12 bg-gradient-to-b from-[#102F23] via-[#0C2219] to-[#05110D] text-white text-center relative overflow-hidden">
            {/* Romantic Couple Backdrop with Cinematic Vignette */}
            <div 
              className="absolute inset-0 bg-cover bg-center sm:bg-[center_30%] opacity-35 scale-105 transition-transform duration-1000 ease-out"
              style={{ backgroundImage: `url(${coupleCoverImg})` }}
            />
            
            {/* Multi-layered Obsidian & Emerald Vignette Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#05110D] via-[#091E16]/85 to-[#0E2A1F]/80 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(14,40,30,0.5),rgba(5,17,13,0.92))] pointer-events-none" />
            
            {/* Falling Gold Particles & Dust */}
            <FloatingGoldenDust count={14} />
            <FallingPineParticles count={10} />

            <div className="relative z-10 max-w-xl mx-auto">
              {/* Glassmorphic Gilded Card Frame */}
              <div className="relative bg-gradient-to-br from-[#0B2219]/80 via-[#071912]/85 to-[#040E0A]/90 backdrop-blur-md p-8 sm:p-12 rounded-[36px] border-2 border-[#C5A059]/75 shadow-[0_30px_70px_rgba(0,0,0,0.65),0_0_35px_rgba(197,160,89,0.22)] overflow-hidden">
                {/* High-End Metallic Sheen & Watermark */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#C5A059]/10 to-white/5 pointer-events-none" />
                <GuillocheParchmentWatermark opacity={0.05} />
                <div className="absolute inset-2 sm:inset-3 rounded-[26px] border border-[#C5A059]/30 pointer-events-none" />
                <NirwanaGoldCorner size={36} color="#E2C792" />

                {/* Royal Seal & Closing Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="mb-4">
                    <NirwanaEmeraldSeal 
                      initials={`${groomName[0] || 'S'}&${brideName[0] || 'B'}`} 
                      size="md" 
                      showWreath={true}
                    />
                  </div>

                  {/* Golden Pill Tag */}
                  <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#16382C]/80 border border-[#C5A059]/60 text-[#E2C792] text-[10px] sm:text-xs font-serif uppercase tracking-[0.3em] font-bold mb-3 shadow-md">
                    <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                    <span>Ungkapan Terima Kasih</span>
                    <Sparkles className="w-3 h-3 text-[#C5A059] animate-pulse" />
                  </div>

                  {/* Heading */}
                  <h2 className="font-serif text-3xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFF0D0] to-[#E2C792] mb-3 font-normal drop-shadow-md">
                    Sampai Berjumpa di Sarangan
                  </h2>

                  <RoyalCalligraphicDivider className="my-2 max-w-[220px] mx-auto" />
                  <MountainPineHeritageCrest className="mb-5" />

                  {/* Farewell Body Prose */}
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-light mb-8 max-w-md mx-auto">
                    Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, atas kesediaan Bapak/Ibu/Saudara/i yang telah meluangkan waktu serta mengiringi langkah kami dengan doa restu.
                  </p>

                  {/* Couple's Signoff */}
                  <div className="mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#E2C792]/80 block font-serif mb-1">
                      Kami yang berbahagia
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl text-[#E2C792] italic tracking-wide font-normal drop-shadow-sm">
                      {groomName} &amp; {brideName}
                    </h3>
                    <span className="text-xs text-white/60 font-light block mt-1">
                      Beserta Keluarga Besar Kedua Mempelai
                    </span>
                  </div>

                  {/* Venue & System Badge */}
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-black/40 text-white/80 text-xs border border-[#C5A059]/40 backdrop-blur-md shadow-inner">
                    <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span className="tracking-wide">Hotel Nirwana Sarangan • Magetan, Jawa Timur</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* LIGHTBOX MODAL */}
          {selectedImage && (
            <div 
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedImage(null)}
            >
              <button 
                type="button" 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full bg-white/10"
              >
                <X className="w-6 h-6" />
              </button>
              <img 
                src={selectedImage} 
                alt="Enlarged" 
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl" 
                onClick={e => e.stopPropagation()}
              />
            </div>
          )}

          {/* CALENDAR REMINDER MODAL */}
          {calendarModalEvent && (
            <CalendarReminderModal
              isOpen={!!calendarModalEvent}
              onClose={() => setCalendarModalEvent(null)}
              event={calendarModalEvent}
              themeStyle="vintage"
            />
          )}

        </main>
      </div>

      {/* FLOATING BOTTOM NAVIGATION BAR (Centered on mobile screen, centered within right invitation pane on desktop) */}
      <nav className="fixed bottom-5 left-1/2 -translate-x-1/2 lg:left-[70.83%] xl:left-[75%] z-40 bg-gradient-to-r from-[#0C241B]/95 via-[#163D2E]/95 to-[#0C241B]/95 backdrop-blur-xl px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#C5A059] shadow-[0_12px_35px_rgba(0,0,0,0.5),0_0_20px_rgba(197,160,89,0.35)] flex items-center gap-1 sm:gap-2 max-w-[92vw] overflow-x-auto no-scrollbar">
        <a 
          href="#cover"
          onClick={(e) => handleNavClick(e, 'cover')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'cover' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Cover
        </a>
        <a 
          href="#couple"
          onClick={(e) => handleNavClick(e, 'couple')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'couple' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Mempelai
        </a>
        <a 
          href="#event"
          onClick={(e) => handleNavClick(e, 'event')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'event' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Acara
        </a>
        <a 
          href="#story"
          onClick={(e) => handleNavClick(e, 'story')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'story' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Cerita
        </a>
        <a 
          href="#gallery"
          onClick={(e) => handleNavClick(e, 'gallery')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'gallery' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          Galeri
        </a>
        <a 
          href="#rsvp"
          onClick={(e) => handleNavClick(e, 'rsvp')}
          className={`px-3 py-1.5 rounded-full text-xs font-serif font-medium transition-all ${
            activeSection === 'rsvp' 
              ? 'bg-gradient-to-r from-[#C5A059] to-[#E2C792] text-[#122E24] font-bold shadow-md scale-105' 
              : 'text-[#E2C792]/80 hover:text-white hover:bg-white/5'
          }`}
        >
          RSVP
        </a>
      </nav>
    </div>
  );
};
export default NirwanaSaranganTheme;
