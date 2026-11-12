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
      <svg className="fixed top-0 left-0 w-0 h-0 pointer-events-none" aria-hidden="true">
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
          <radialGradient id="global_sakura_flower_grad" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#FFF0F5" />
            <stop offset="35%" stopColor="#FF6B8B" />
            <stop offset="75%" stopColor="#E61E50" />
            <stop offset="100%" stopColor="#B80D38" />
          </radialGradient>
          <radialGradient id="global_sakura_gold_pistil" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF275" />
            <stop offset="60%" stopColor="#FFB703" />
            <stop offset="100%" stopColor="#FB8500" />
          </radialGradient>
          <linearGradient id="global_sakura_leaf_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#52B788" />
            <stop offset="50%" stopColor="#2D6A4F" />
            <stop offset="100%" stopColor="#1B4332" />
          </linearGradient>
          {/* Wood Branch Gradients: Available Everywhere */}
          <linearGradient id="sakuraWoodBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1622" />
            <stop offset="50%" stopColor="#73273A" />
            <stop offset="100%" stopColor="#3E111C" />
          </linearGradient>
          <linearGradient id="sakuraWoodHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C3549" />
            <stop offset="100%" stopColor="#541B28" />
          </linearGradient>
          <linearGradient id="global_sakura_wood_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1622" />
            <stop offset="50%" stopColor="#73273A" />
            <stop offset="100%" stopColor="#3E111C" />
          </linearGradient>
          <linearGradient id="global_sakura_wood_highlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C3549" />
            <stop offset="100%" stopColor="#541B28" />
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
export const SakuraFlower: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
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
      {/* 5 Distinct Rounded Petals with Sakura Notch */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 50 50)`}>
          <path
            d="M50 50 C36 32, 28 14, 41 5 C46 2, 50 7, 50 7 C50 7, 54 2, 59 5 C72 14, 64 32, 50 50 Z"
            fill="url(#global_sakura_flower_grad)"
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
      <circle cx="50" cy="50" r="11" fill="url(#global_sakura_gold_pistil)" stroke="#D4AF37" strokeWidth="0.8" />
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
export const SakuraLeaves: React.FC<{ size?: number; rotation?: number; className?: string }> = ({
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
      {/* Primary Leaf */}
      <path
        d="M20 80 C25 50, 45 25, 80 20 C75 55, 55 75, 20 80 Z"
        fill="url(#global_sakura_leaf_grad)"
        stroke="#1B4332"
        strokeWidth="0.8"
        opacity="0.95"
      />
      <path d="M20 80 Q48 52 80 20" stroke="#95D5B2" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Secondary Flanking Leaf */}
      <path
        d="M35 70 C35 48, 50 32, 75 40 C65 62, 50 72, 35 70 Z"
        fill="url(#global_sakura_leaf_grad)"
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

// =========================================================================
// 5. VERTICAL BOTANICAL SAKURA BOUGH (Memanjang dari Atas Sampai Bawah)
// Continuous elegant cherry branch with 7 blossom clusters extending to bottom
// =========================================================================
export const SakuraVerticalBough: React.FC<{
  side?: 'left' | 'right';
  className?: string;
}> = ({ side = 'left', className = '' }) => {
  const isLeft = side === 'left';

  return (
    <div 
      className={`absolute top-0 -bottom-16 sm:-bottom-24 w-36 sm:w-44 pointer-events-none z-10 select-none ${className}`}
      style={{
        animation: isLeft ? 'sakura-bough-left-sway 7s ease-in-out infinite alternate' : 'sakura-bough-right-sway 7.8s ease-in-out infinite alternate',
        transformOrigin: isLeft ? 'bottom left' : 'bottom right'
      }}
      aria-hidden="true"
    >
      <div className={`relative w-full h-full ${isLeft ? '' : 'scale-x-[-1] origin-center'}`}>
        {/* Curving Natural Branch SVG Path running continuously from y: 15 to y: 915 */}
        <svg 
          viewBox="0 0 160 920" 
          className="w-full h-full overflow-visible drop-shadow-[0_3px_10px_rgba(110,35,53,0.25)]" 
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="localSakuraWoodBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4A1622" />
              <stop offset="50%" stopColor="#73273A" />
              <stop offset="100%" stopColor="#3E111C" />
            </linearGradient>
            <linearGradient id="localSakuraWoodHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8C3549" />
              <stop offset="100%" stopColor="#541B28" />
            </linearGradient>
          </defs>
          {/* Main Curved Bough running continuously to the very bottom */}
          <path
            d="M120,915 C95,850 75,790 75,730 C72,670 45,610 42,530 C40,450 25,390 28,330 C32,270 35,210 40,150 C45,100 48,50 55,15"
            fill="none"
            stroke="url(#localSakuraWoodBranchGrad)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />
          {/* Highlight ridge */}
          <path
            d="M118,910 C93,848 73,788 73,728 C70,668 43,608 40,528 C38,448 23,388 26,328 C30,268 33,208 38,148 C43,98 46,48 53,15"
            fill="none"
            stroke="url(#localSakuraWoodHighlight)"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.85"
          />

          {/* Botanical Spurs branching along the entire height */}
          <path d="M48,80 Q30,55 15,30" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M40,150 Q25,120 10,95" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M35,210 Q18,230 8,255" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M28,330 Q10,355 2,385" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M30,360 Q15,395 8,435" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M42,530 Q22,560 15,595" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.0" strokeLinecap="round" />
          <path d="M72,670 Q45,700 36,740" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M75,760 Q50,790 42,830" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M100,860 Q75,885 68,915" fill="none" stroke="url(#localSakuraWoodBranchGrad)" strokeWidth="2.2" strokeLinecap="round" />
        </svg>

      {/* --- Cluster 1: Top-High (top: 2%) --- */}
      <div className="absolute top-[2%] left-6 flex items-center justify-center">
        <div className="absolute -top-4 -left-4 pointer-events-none">
          <SakuraLeaves size={64} rotation={-30} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={60} rotation={12} />
        </div>
        <div className="absolute -top-6 left-8 z-15">
          <SakuraFlower size={42} rotation={-45} />
        </div>
        <div className="absolute top-10 -left-3 z-15">
          <SakuraFlower size={36} rotation={60} />
        </div>
        <div className="absolute -top-8 left-3 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white shadow-xs" />
        <div className="absolute top-14 left-8 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white" />
      </div>

      {/* --- Cluster 2: Upper-Mid (top: 18%) --- */}
      <div className="absolute top-[18%] left-3 flex items-center justify-center">
        <div className="absolute -top-3 -left-3 pointer-events-none">
          <SakuraLeaves size={56} rotation={15} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={54} rotation={-15} />
        </div>
        <div className="absolute -bottom-4 left-6 z-15">
          <SakuraFlower size={36} rotation={45} />
        </div>
        <div className="absolute -top-4 left-8 w-3 h-3 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-white" />
      </div>

      {/* --- Cluster 3: Center-Mid (top: 36%) --- */}
      <div className="absolute top-[36%] -left-1 -translate-y-1/2 flex items-center justify-center">
        <div className="absolute -top-4 -left-3 pointer-events-none">
          <SakuraLeaves size={70} rotation={45} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={66} rotation={-20} />
        </div>
        <div className="absolute -bottom-6 left-8 z-15">
          <SakuraFlower size={44} rotation={35} />
        </div>
        <div className="absolute -top-6 left-7 z-15">
          <SakuraFlower size={38} rotation={80} />
        </div>
        <div 
          className="absolute -left-5 top-2 w-2.5 h-2.5 rounded-full bg-[#FFD700] shadow-[0_0_8px_#FFD700]" 
          style={{ animation: 'sakura-sparkle-pulse 2.8s infinite' }}
        />
      </div>

      {/* --- Cluster 4: Lower-Mid (top: 54%) --- */}
      <div className="absolute top-[54%] left-4 flex items-center justify-center">
        <div className="absolute -top-2 -left-3 pointer-events-none">
          <SakuraLeaves size={58} rotation={75} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={52} rotation={20} />
        </div>
        <div className="absolute -top-5 left-6 z-15">
          <SakuraFlower size={34} rotation={-25} />
        </div>
        <div className="absolute bottom-5 left-7 z-15">
          <SakuraFlower size={30} rotation={60} />
        </div>
      </div>

      {/* --- Cluster 5: Low-Base (top: 70%) --- */}
      <div className="absolute top-[70%] left-6 flex items-center justify-center">
        <div className="absolute -bottom-2 -left-4 pointer-events-none">
          <SakuraLeaves size={70} rotation={105} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={60} rotation={25} />
        </div>
        <div className="absolute -top-6 left-8 z-15">
          <SakuraFlower size={42} rotation={-15} />
        </div>
        <div className="absolute bottom-6 left-10 z-15">
          <SakuraFlower size={34} rotation={70} />
        </div>
      </div>

      {/* --- Cluster 6: Bottom Ground (top: 84%) --- */}
      <div className="absolute top-[84%] left-8 flex items-center justify-center">
        <div className="absolute -bottom-3 -left-3 pointer-events-none">
          <SakuraLeaves size={66} rotation={95} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={58} rotation={-18} />
        </div>
        <div className="absolute -top-5 left-7 z-15">
          <SakuraFlower size={38} rotation={35} />
        </div>
        <div className="absolute bottom-5 left-8 z-15">
          <SakuraFlower size={32} rotation={-40} />
        </div>
      </div>

      {/* --- Cluster 7: Bottom Floor (bottom: 0% - Memanjang Sampe Bawah) --- */}
      <div className="absolute bottom-[-10px] left-10 flex items-center justify-center">
        <div className="absolute -bottom-2 -left-3 pointer-events-none">
          <SakuraLeaves size={64} rotation={80} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={56} rotation={30} />
        </div>
        <div className="absolute -top-6 left-7 z-15">
          <SakuraFlower size={38} rotation={-20} />
        </div>
      </div>
      </div>
    </div>
  );
};

// =========================================================================
// 6. SAKURA INVITATION SURROUND ("Bunga Sakura Memutari Undangan")
// Frames the 420px invitation card in the white background area on desktop
// Includes botanical branches, lush floral clusters, and orbiting petals
// =========================================================================
export const SakuraInvitationSurround: React.FC<{ className?: string }> = ({ 
  className = "" 
}) => {
  // 14 Orbiting Petals continuously encircling the invitation card in the white space
  const orbitingPetalsCW = [
    { id: 'cw_0', delay: 0, size: 26, opacity: 0.95, color: 'crimson' },
    { id: 'cw_1', delay: 2.1, size: 20, opacity: 0.75, color: 'rose' },
    { id: 'cw_2', delay: 4.2, size: 28, opacity: 0.9, color: 'blush' },
    { id: 'cw_3', delay: 6.3, size: 22, opacity: 0.85, color: 'crimson' },
    { id: 'cw_4', delay: 8.4, size: 30, opacity: 0.95, color: 'rose' },
    { id: 'cw_5', delay: 10.5, size: 19, opacity: 0.7, color: 'blush' },
    { id: 'cw_6', delay: 12.6, size: 25, opacity: 0.88, color: 'rose' },
  ];

  const orbitingPetalsCCW = [
    { id: 'ccw_0', delay: 1.0, size: 24, opacity: 0.9, color: 'rose' },
    { id: 'ccw_1', delay: 3.3, size: 27, opacity: 0.92, color: 'crimson' },
    { id: 'ccw_2', delay: 5.6, size: 21, opacity: 0.75, color: 'blush' },
    { id: 'ccw_3', delay: 7.9, size: 29, opacity: 0.95, color: 'rose' },
    { id: 'ccw_4', delay: 10.2, size: 22, opacity: 0.8, color: 'crimson' },
    { id: 'ccw_5', delay: 12.5, size: 26, opacity: 0.9, color: 'blush' },
    { id: 'ccw_6', delay: 14.8, size: 20, opacity: 0.78, color: 'crimson' },
  ];

  return (
    <div 
      className={`absolute inset-0 pointer-events-none select-none z-0 hidden sm:block ${className}`}
      aria-hidden="true"
    >
      <style>{`
        /* Smooth GPU Orbit Keyframes: Encircling the 420px x ~740px card perimeter */
        @keyframes sakura-orbit-cw {
          0% {
            transform: translate3d(0px, -415px, 0) rotateZ(0deg) scale(0.9);
            opacity: 0.5;
          }
          15% {
            opacity: 0.95;
          }
          25% {
            transform: translate3d(265px, -15px, 0) rotateZ(90deg) scale(1.06);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(0px, 415px, 0) rotateZ(180deg) scale(0.88);
            opacity: 0.7;
          }
          75% {
            transform: translate3d(-265px, 15px, 0) rotateZ(270deg) scale(1.05);
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translate3d(0px, -415px, 0) rotateZ(360deg) scale(0.9);
            opacity: 0.5;
          }
        }

        @keyframes sakura-orbit-ccw {
          0% {
            transform: translate3d(20px, -400px, 0) rotateZ(0deg) scale(1);
            opacity: 0.5;
          }
          15% {
            opacity: 0.95;
          }
          25% {
            transform: translate3d(-260px, -15px, 0) rotateZ(-90deg) scale(0.92);
            opacity: 0.95;
          }
          50% {
            transform: translate3d(-15px, 400px, 0) rotateZ(-180deg) scale(1.08);
            opacity: 0.7;
          }
          75% {
            transform: translate3d(260px, 15px, 0) rotateZ(-270deg) scale(0.95);
            opacity: 0.95;
          }
          90% {
            opacity: 0.95;
          }
          100% {
            transform: translate3d(20px, -400px, 0) rotateZ(-360deg) scale(1);
            opacity: 0.5;
          }
        }

        /* 3D Fluttering inside each orbiting petal */
        @keyframes sakura-petal-tumble {
          0%, 100% { transform: rotateY(0deg) rotateX(0deg); }
          50% { transform: rotateY(180deg) rotateX(40deg); }
        }

        /* Organic Gentle Sway for Left and Right Botanical Boughs */
        @keyframes sakura-bough-left-sway {
          0%, 100% {
            transform: translate3d(0px, 0px, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-6px, 4px, 0) rotate(-1.5deg);
          }
        }

        @keyframes sakura-bough-right-sway {
          0%, 100% {
            transform: translate3d(0px, 0px, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(6px, -4px, 0) rotate(1.8deg);
          }
        }

        @keyframes sakura-sparkle-pulse {
          0%, 100% { opacity: 0.25; transform: scale(0.8); }
          50% { opacity: 0.95; transform: scale(1.25); }
        }
      `}</style>

      {/* Shared Branch Gradients */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <linearGradient id="sakuraWoodBranchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4A1622" />
            <stop offset="50%" stopColor="#73273A" />
            <stop offset="100%" stopColor="#3E111C" />
          </linearGradient>
          <linearGradient id="sakuraWoodHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8C3549" />
            <stop offset="100%" stopColor="#541B28" />
          </linearGradient>
        </defs>
      </svg>

      {/* ===================================================================
          1. LEFT BOTANICAL SAKURA BOUGH (Memanjang dari Atas Sampai Bawah)
          =================================================================== */}
      <SakuraVerticalBough side="left" className="-left-16 sm:-left-24 md:-left-32 lg:-left-36" />

      {/* ===================================================================
          2. RIGHT BOTANICAL SAKURA BOUGH (Memanjang dari Atas Sampai Bawah)
          =================================================================== */}
      <SakuraVerticalBough side="right" className="-right-16 sm:-right-24 md:-right-32 lg:-right-36" />

      {/* ===================================================================
          3. TOP ARCH CROWN (Connecting across the top in white space)
          =================================================================== */}
      <div className="absolute -top-9 sm:-top-12 inset-x-0 flex items-center justify-center pointer-events-none z-15">
        <div className="relative flex items-center justify-center gap-4 sm:gap-6">
          <div className="relative">
            <div className="absolute -top-3 -left-3 pointer-events-none">
              <SakuraLeaves size={52} rotation={-50} />
            </div>
            <SakuraFlower size={46} rotation={-15} />
          </div>
          <div className="relative -top-1">
            <SakuraFlower size={54} rotation={8} />
          </div>
          <div className="relative -top-2.5 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#FFE066] to-[#E6A100] border-2 border-white shadow-[0_0_12px_rgba(255,224,102,0.95)]" />
          </div>
          <div className="relative -top-1 scale-x-[-1]">
            <SakuraFlower size={54} rotation={8} />
          </div>
          <div className="relative scale-x-[-1]">
            <div className="absolute -top-3 -left-3 pointer-events-none">
              <SakuraLeaves size={52} rotation={-50} />
            </div>
            <SakuraFlower size={46} rotation={-15} />
          </div>
        </div>
      </div>

      {/* ===================================================================
          4. BOTTOM GARDEN BASE (Resting in bottom white margin)
          =================================================================== */}
      <div className="absolute -bottom-8 sm:-bottom-11 inset-x-0 flex items-center justify-center pointer-events-none z-15">
        <div className="relative flex items-center justify-center gap-6 sm:gap-8">
          <div className="relative">
            <div className="absolute -bottom-2 -left-2 pointer-events-none">
              <SakuraLeaves size={48} rotation={120} />
            </div>
            <SakuraFlower size={46} rotation={35} />
          </div>
          <div className="relative -bottom-1.5">
            <SakuraFlower size={52} rotation={-12} />
          </div>
          <div className="relative -bottom-1">
            <SakuraFlower size={48} rotation={18} />
          </div>
          <div className="relative scale-x-[-1]">
            <div className="absolute -bottom-2 -left-2 pointer-events-none">
              <SakuraLeaves size={48} rotation={120} />
            </div>
            <SakuraFlower size={44} rotation={40} />
          </div>
        </div>
      </div>

      {/* ===================================================================
          5. ORBITING SWIRLING SAKURA PETALS ("Memutari Undangan")
          Continuous graceful elliptical orbit around the card perimeter
          =================================================================== */}
      {/* Clockwise Orbit Ribbon */}
      {orbitingPetalsCW.map((petal) => {
        const fill = petal.color === 'crimson' 
          ? 'url(#global_sakura_crimson)' 
          : (petal.color === 'rose' ? 'url(#global_sakura_rose)' : 'url(#global_sakura_blush)');

        return (
          <div
            key={petal.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              animation: 'sakura-orbit-cw 15s linear infinite',
              animationDelay: `${petal.delay}s`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            <div 
              style={{ 
                animation: 'sakura-petal-tumble 3.2s ease-in-out infinite alternate',
                transformStyle: 'preserve-3d' 
              }}
            >
              <svg 
                width={petal.size} 
                height={Math.round(petal.size * 1.2)} 
                viewBox="0 0 30 36" 
                className="overflow-visible drop-shadow-[0_2px_6px_rgba(180,20,60,0.35)]"
                style={{ opacity: petal.opacity }}
              >
                <path
                  d="M15 2 C21 2, 28 8, 28 17 C28 26, 21 31, 15 35 C9 31, 2 26, 2 17 C2 8, 9 2, 15 2 Z"
                  fill={fill}
                />
                <path
                  d="M15 6 Q15 18 15 28"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      })}

      {/* Counter-Clockwise Orbit Ribbon */}
      {orbitingPetalsCCW.map((petal) => {
        const fill = petal.color === 'crimson' 
          ? 'url(#global_sakura_crimson)' 
          : (petal.color === 'rose' ? 'url(#global_sakura_rose)' : 'url(#global_sakura_blush)');

        return (
          <div
            key={petal.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              animation: 'sakura-orbit-ccw 16s linear infinite',
              animationDelay: `${petal.delay}s`,
              willChange: 'transform, opacity',
              transform: 'translateZ(0)'
            }}
          >
            <div 
              style={{ 
                animation: 'sakura-petal-tumble 3.6s ease-in-out infinite alternate',
                transformStyle: 'preserve-3d' 
              }}
            >
              <svg 
                width={petal.size} 
                height={Math.round(petal.size * 1.2)} 
                viewBox="0 0 30 36" 
                className="overflow-visible drop-shadow-[0_2px_6px_rgba(180,20,60,0.35)]"
                style={{ opacity: petal.opacity }}
              >
                <path
                  d="M15 2 C21 2, 28 8, 28 17 C28 26, 21 31, 15 35 C9 31, 2 26, 2 17 C2 8, 9 2, 15 2 Z"
                  fill={fill}
                />
                <path
                  d="M15 6 Q15 18 15 28"
                  stroke="rgba(255, 255, 255, 0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </div>
          </div>
        );
      })}

      {/* Subtle Floating Golden Stardust Sparkles in the white margins */}
      {[
        { top: '12%', left: '-20%' },
        { top: '32%', right: '-18%' },
        { top: '62%', left: '-22%' },
        { top: '78%', right: '-20%' },
        { top: '-5%', left: '18%' },
        { bottom: '-5%', right: '20%' },
      ].map((pos, idx) => (
        <div
          key={`star_${idx}`}
          className="absolute rounded-full bg-[#FFDF80] pointer-events-none"
          style={{
            ...pos,
            width: '3.5px',
            height: '3.5px',
            boxShadow: '0 0 10px rgba(255, 223, 128, 0.95), 0 0 4px #FFFFFF',
            animation: `sakura-sparkle-pulse ${2.5 + (idx % 3) * 0.7}s ease-in-out infinite`,
            animationDelay: `${idx * 0.5}s`
          }}
        />
      ))}
    </div>
  );
};
