import React from 'react';

// =========================================================================
// 1. SILKY-SMOOTH FALLING SAKURA PETALS ANIMATION (60fps / 120fps GPU)
// =========================================================================
export const FallingSakuraPetals: React.FC<{ count?: number; className?: string }> = ({ 
  count = 20,
  className = "z-[60]" 
}) => {
  const isAbsolute = className.includes('absolute');
  
  // Distinct natural variation profiles for each petal
  const petals = Array.from({ length: count }, (_, i) => {
    const swayType = (i % 4) + 1; // 4 unique sway trajectories
    const durationFall = 7.5 + (i % 6) * 1.1; // 7.5s - 13s graceful descent
    const durationSway = 2.8 + (i % 5) * 0.45; // 2.8s - 4.6s natural oscillation
    const delay = (i * 0.48) % 6;
    const size = 16 + (i % 5) * 3; // 16px - 28px natural petal sizes
    const opacity = 0.55 + (i % 4) * 0.12; // 0.55 - 0.91 translucent depth
    const left = `${(i * 5.2 + 2) % 96}%`;
    const colorScheme = i % 3 === 0 ? 'crimson' : (i % 3 === 1 ? 'rose' : 'blush');
    
    return {
      id: i,
      swayType,
      durationFall,
      durationSway,
      delay,
      size,
      opacity,
      left,
      colorScheme
    };
  });

  return (
    <div 
      className={`${isAbsolute ? 'absolute' : 'fixed'} inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      style={{ perspective: '800px', transform: 'translateZ(0)' }}
      aria-hidden="true"
    >
      <style>{`
        /* Pure Compositor-Only GPU Keyframes (Zero Layout / Paint Overhead) */
        @keyframes sakura-fall-y {
          0% {
            transform: translate3d(0, -45px, 0);
            opacity: 0;
          }
          8% {
            opacity: 1;
          }
          88% {
            opacity: 1;
          }
          100% {
            transform: translate3d(0, 108vh, 0);
            opacity: 0;
          }
        }

        /* 4 Organic Fluttering Sway Profiles (Back & Forth Sine Wave with 3D Flip) */
        @keyframes sakura-sway-1 {
          0% {
            transform: translate3d(0px, 0, 0) rotateZ(0deg) rotateY(0deg) scale(0.9);
          }
          25% {
            transform: translate3d(32px, 0, 0) rotateZ(30deg) rotateY(70deg) scale(1.05);
          }
          50% {
            transform: translate3d(-20px, 0, 0) rotateZ(-22deg) rotateY(160deg) scale(0.92);
          }
          75% {
            transform: translate3d(26px, 0, 0) rotateZ(35deg) rotateY(250deg) scale(1.08);
          }
          100% {
            transform: translate3d(0px, 0, 0) rotateZ(0deg) rotateY(360deg) scale(0.9);
          }
        }

        @keyframes sakura-sway-2 {
          0% {
            transform: translate3d(0px, 0, 0) rotateZ(15deg) rotateX(0deg) scale(1);
          }
          30% {
            transform: translate3d(-34px, 0, 0) rotateZ(-35deg) rotateX(80deg) scale(0.95);
          }
          65% {
            transform: translate3d(28px, 0, 0) rotateZ(28deg) rotateX(175deg) scale(1.06);
          }
          100% {
            transform: translate3d(0px, 0, 0) rotateZ(15deg) rotateX(360deg) scale(1);
          }
        }

        @keyframes sakura-sway-3 {
          0% {
            transform: translate3d(0px, 0, 0) rotateZ(-10deg) rotateY(0deg) scale(0.95);
          }
          28% {
            transform: translate3d(25px, 0, 0) rotateZ(24deg) rotateY(90deg) scale(1.03);
          }
          60% {
            transform: translate3d(-28px, 0, 0) rotateZ(-28deg) rotateY(200deg) scale(0.92);
          }
          85% {
            transform: translate3d(18px, 0, 0) rotateZ(15deg) rotateY(290deg) scale(1.04);
          }
          100% {
            transform: translate3d(0px, 0, 0) rotateZ(-10deg) rotateY(360deg) scale(0.95);
          }
        }

        @keyframes sakura-sway-4 {
          0% {
            transform: translate3d(0px, 0, 0) rotateZ(20deg) scale(1.02);
          }
          35% {
            transform: translate3d(-30px, 0, 0) rotateZ(-25deg) scale(0.92);
          }
          70% {
            transform: translate3d(35px, 0, 0) rotateZ(32deg) scale(1.06);
          }
          100% {
            transform: translate3d(0px, 0, 0) rotateZ(20deg) scale(1.02);
          }
        }

        @keyframes sakura-stardust-glow {
          0%, 100% { opacity: 0.2; transform: translateZ(0) scale(0.85); }
          50% { opacity: 0.95; transform: translateZ(0) scale(1.2); }
        }
      `}</style>

      {/* Global Shared SVG Defs (Compiled once for maximum GPU memory efficiency) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="global_sakura_crimson" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5C7A" />
            <stop offset="50%" stopColor="#E01E4B" />
            <stop offset="100%" stopColor="#9B0B2E" />
          </linearGradient>
          <linearGradient id="global_sakura_rose" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA3B5" />
            <stop offset="60%" stopColor="#E83D62" />
            <stop offset="100%" stopColor="#C9184A" />
          </linearGradient>
          <linearGradient id="global_sakura_blush" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF0F3" />
            <stop offset="55%" stopColor="#FFB3C1" />
            <stop offset="100%" stopColor="#FF758F" />
          </linearGradient>
        </defs>
      </svg>

      {/* Falling Sakura Petals with 2-Layer Nested GPU Animation */}
      {petals.map((p) => {
        const fillUrl = p.colorScheme === 'crimson' 
          ? 'url(#global_sakura_crimson)' 
          : (p.colorScheme === 'rose' ? 'url(#global_sakura_rose)' : 'url(#global_sakura_blush)');

        return (
          /* Outer Layer: Handles continuous linear vertical descent via GPU compositor */
          <div
            key={p.id}
            className="absolute top-0 pointer-events-none"
            style={{
              left: p.left,
              opacity: p.opacity,
              animation: `sakura-fall-y ${p.durationFall}s linear infinite`,
              animationDelay: `${p.delay}s`,
              willChange: 'transform',
              transform: 'translateZ(0)'
            }}
          >
            {/* Inner Layer: Handles natural organic side-to-side sway & 3D flutter */}
            <div
              style={{
                animation: `sakura-sway-${p.swayType} ${p.durationSway}s ease-in-out infinite alternate`,
                willChange: 'transform',
                transformStyle: 'preserve-3d'
              }}
            >
              <svg 
                width={p.size} 
                height={Math.round(p.size * 1.2)} 
                viewBox="0 0 30 36" 
                className="overflow-visible"
              >
                {/* Soft natural petal shadow rendered via native SVG opacity, NOT heavy blur filter */}
                <path
                  d="M15 3 C21 3, 28 9, 28 18 C28 27, 21 32, 15 36 C9 32, 2 27, 2 18 C2 9, 9 3, 15 3 Z"
                  fill="rgba(155, 11, 46, 0.28)"
                  transform="translate(1, 2)"
                />
                {/* Master Sakura Petal Silhouette with heart-notched curvature */}
                <path
                  d="M15 2 C21 2, 28 8, 28 17 C28 26, 21 31, 15 35 C9 31, 2 26, 2 17 C2 8, 9 2, 15 2 Z"
                  fill={fillUrl}
                />
                {/* Delicate Translucent Inner Crease Highlight */}
                <path
                  d="M15 6 Q15 18 15 28"
                  stroke="rgba(255, 255, 255, 0.65)"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      })}

      {/* Floating Golden Stardust Specks (Lightweight hardware-accelerated sparkles) */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`dust_${i}`}
          className="absolute rounded-full bg-[#FFDF80] pointer-events-none"
          style={{
            top: `${10 + (i * 11) % 80}%`,
            left: `${8 + (i * 12) % 85}%`,
            width: `${2.5 + (i % 3) * 0.8}px`,
            height: `${2.5 + (i % 3) * 0.8}px`,
            boxShadow: '0 0 6px rgba(255, 223, 128, 0.85)',
            animation: `sakura-stardust-glow ${2.4 + (i % 3) * 0.6}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)'
          }}
        />
      ))}
    </div>
  );
};

// =========================================================================
// 2. DETAILED SAKURA BLOSSOM FLOWER (Single Flower SVG Component)
// =========================================================================
const SakuraFlower: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 56,
  rotation = 0,
  className = ""
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`drop-shadow-[0_3px_8px_rgba(180,20,60,0.45)] filter ${className}`}
    >
      <defs>
        <radialGradient id="sakuraVibrantGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="35%" stopColor="#FF6B8B" />
          <stop offset="75%" stopColor="#E61E50" />
          <stop offset="100%" stopColor="#B80D38" />
        </radialGradient>
        <radialGradient id="sakuraGoldPistil" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="60%" stopColor="#FFB703" />
          <stop offset="100%" stopColor="#FB8500" />
        </radialGradient>
      </defs>

      {/* 5 Distinct Rounded Petals with Sakura Notch */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 50 C36 32, 28 14, 41 5 C46 2, 50 7, 50 7 C50 7, 54 2, 59 5 C72 14, 64 32, 50 50 Z"
            fill="url(#sakuraVibrantGrad)"
            stroke="#94082B"
            strokeWidth="0.8"
            opacity="0.98"
          />
          <path
            d="M50 48 Q50 28 50 14"
            stroke="rgba(255, 240, 245, 0.7)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Golden Pistil Core & Stamens */}
      <circle cx="50" cy="50" r="11" fill="url(#sakuraGoldPistil)" stroke="#D4AF37" strokeWidth="0.8" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((stamenAngle, sIdx) => (
        <g key={`stamen_${sIdx}`} transform={`rotate(${stamenAngle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="39" stroke="#FFFDF0" strokeWidth="1.2" />
          <circle cx="50" cy="38" r="1.8" fill="#FFB703" stroke="#D4AF37" strokeWidth="0.5" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4.5" fill="#D97706" opacity="0.9" />
    </svg>
  );
};

// =========================================================================
// 3. BOTANICAL LEAF SPRAY COMPONENT (Emerald / Jade Watercolor Leaves)
// =========================================================================
const SakuraLeaves: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
  size = 64,
  rotation = 0,
  className = ""
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`drop-shadow-sm ${className}`}
    >
      <defs>
        <linearGradient id="sakuraLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52B788" />
          <stop offset="50%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>
      </defs>
      {/* Primary Leaf */}
      <path
        d="M20 80 C25 50, 45 25, 80 20 C75 55, 55 75, 20 80 Z"
        fill="url(#sakuraLeafGrad)"
        stroke="#1B4332"
        strokeWidth="0.8"
        opacity="0.95"
      />
      <path d="M20 80 Q48 52 80 20" stroke="#95D5B2" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Secondary Flanking Leaf */}
      <path
        d="M35 70 C35 48, 50 32, 75 40 C65 62, 50 72, 35 70 Z"
        fill="url(#sakuraLeafGrad)"
        opacity="0.85"
      />
    </svg>
  );
};

// =========================================================================
// 4. SAKURA FRAME COMPONENT (Kanan, Kiri, Atas, Bawah Bunga Sakura)
// Matches User's Exact Annotation Circles in media_1794296870582_014bcbfd.jpg
// =========================================================================
export const SakuraCoverFrame: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none select-none z-30 ${className}`}>
      
      {/* ================= 1. ATAS KIRI (TOP LEFT) ================= */}
      <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex items-center justify-center">
        {/* Leaves behind */}
        <div className="absolute top-0 left-1 pointer-events-none">
          <SakuraLeaves size={62} rotation={-10} />
        </div>
        {/* Main Blooming Sakura Flower */}
        <div className="relative z-10 animate-pulse" style={{ animationDuration: '4.5s' }}>
          <SakuraFlower size={56} rotation={15} />
        </div>
        {/* Secondary Blooming Sakura Flower */}
        <div className="absolute top-7 left-8 z-15">
          <SakuraFlower size={38} rotation={50} />
        </div>
        {/* Little Bud */}
        <div className="absolute top-1 left-12 z-5 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF6B8B] to-[#C9184A] border border-[#FFF0F3] shadow-xs" />
      </div>

      {/* ================= 2. ATAS KANAN (TOP RIGHT) ================= */}
      <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex items-center justify-center scale-x-[-1]">
        {/* Leaves behind */}
        <div className="absolute top-0 left-1 pointer-events-none">
          <SakuraLeaves size={62} rotation={-10} />
        </div>
        {/* Main Blooming Sakura Flower */}
        <div className="relative z-10 animate-pulse" style={{ animationDuration: '5s' }}>
          <SakuraFlower size={56} rotation={15} />
        </div>
        {/* Secondary Blooming Sakura Flower */}
        <div className="absolute top-7 left-8 z-15">
          <SakuraFlower size={38} rotation={50} />
        </div>
        {/* Little Bud */}
        <div className="absolute top-1 left-12 z-5 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF6B8B] to-[#C9184A] border border-[#FFF0F3] shadow-xs" />
      </div>

      {/* ================= 3. KIRI TENGAH (LEFT MIDDLE) ================= */}
      <div className="absolute top-[52%] left-1.5 sm:left-2.5 -translate-y-1/2 flex items-center justify-center">
        <div className="absolute -top-3 left-0 pointer-events-none">
          <SakuraLeaves size={50} rotation={30} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={48} rotation={-20} />
        </div>
        <div className="absolute -bottom-5 left-3 z-15">
          <SakuraFlower size={32} rotation={40} />
        </div>
      </div>

      {/* ================= 4. KANAN TENGAH (RIGHT MIDDLE) ================= */}
      <div className="absolute top-[52%] right-1.5 sm:right-2.5 -translate-y-1/2 flex items-center justify-center scale-x-[-1]">
        <div className="absolute -top-3 left-0 pointer-events-none">
          <SakuraLeaves size={50} rotation={30} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={48} rotation={-20} />
        </div>
        <div className="absolute -bottom-5 left-3 z-15">
          <SakuraFlower size={32} rotation={40} />
        </div>
      </div>

      {/* ================= 5. BAWAH KIRI (BOTTOM LEFT) ================= */}
      <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 flex items-center justify-center">
        {/* Leaves behind */}
        <div className="absolute bottom-1 left-2 pointer-events-none">
          <SakuraLeaves size={70} rotation={80} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10">
          <SakuraFlower size={62} rotation={-30} />
        </div>
        {/* Companion Blossom */}
        <div className="absolute bottom-8 left-8 z-15">
          <SakuraFlower size={42} rotation={20} />
        </div>
        {/* Tertiary Blossom */}
        <div className="absolute bottom-2 left-11 z-15">
          <SakuraFlower size={34} rotation={65} />
        </div>
      </div>

      {/* ================= 6. BAWAH KANAN (BOTTOM RIGHT) ================= */}
      <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 flex items-center justify-center scale-x-[-1]">
        {/* Leaves behind */}
        <div className="absolute bottom-1 left-2 pointer-events-none">
          <SakuraLeaves size={70} rotation={80} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10">
          <SakuraFlower size={62} rotation={-30} />
        </div>
        {/* Companion Blossom */}
        <div className="absolute bottom-8 left-8 z-15">
          <SakuraFlower size={42} rotation={20} />
        </div>
        {/* Tertiary Blossom */}
        <div className="absolute bottom-2 left-11 z-15">
          <SakuraFlower size={34} rotation={65} />
        </div>
      </div>

    </div>
  );
};

