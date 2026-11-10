import React from 'react';

// =========================================================================
// 1. FALLING SAKURA PETALS ANIMATION (Bunga Jatuh Berguguran)
// =========================================================================
export const FallingSakuraPetals: React.FC<{ count?: number; className?: string }> = ({ 
  count = 20,
  className = "z-30" 
}) => {
  const petals = Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 5.3 + 2) % 96}%`,
    duration: `${6 + (i % 7) * 1.3}s`,
    delay: `${(i * 0.6) % 6}s`,
    size: 14 + (i % 5) * 4,
    opacity: 0.4 + (i % 4) * 0.15,
    rotate: (i * 55) % 360,
    swayAmount: (i % 2 === 0 ? 1 : -1) * (40 + (i % 4) * 15),
    colorScheme: i % 3 === 0 ? 'crimson' : (i % 3 === 1 ? 'rose' : 'blush')
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden select-none ${className}`}>
      <style>{`
        @keyframes sakura-fall-sway {
          0% {
            transform: translate3d(0, -30px, 0) rotate(0deg) scale(0.75);
            opacity: 0;
          }
          10% {
            opacity: var(--sakura-opacity);
          }
          85% {
            opacity: var(--sakura-opacity);
          }
          100% {
            transform: translate3d(var(--sakura-sway), 108vh, 0) rotate(380deg) scale(1.05);
            opacity: 0;
          }
        }
        @keyframes sakura-shimmer {
          0%, 100% { opacity: 0.2; transform: scale(0.8); }
          50% { opacity: 0.85; transform: scale(1.2); }
        }
      `}</style>

      {/* Falling Sakura Petals */}
      {petals.map((p) => {
        const gradientId = `sakura_grad_${p.id}`;
        const fillUrl = `url(#${gradientId})`;
        
        return (
          <div
            key={p.id}
            className="absolute top-0 pointer-events-none will-change-transform"
            style={{
              left: p.left,
              animation: `sakura-fall-sway ${p.duration} linear infinite`,
              animationDelay: p.delay,
              // @ts-ignore
              '--sakura-opacity': p.opacity,
              '--sakura-sway': `${p.swayAmount}px`
            }}
          >
            <svg 
              width={p.size} 
              height={p.size * 1.25} 
              viewBox="0 0 30 36" 
              style={{ transform: `rotate(${p.rotate}deg)` }}
              className="drop-shadow-[0_2px_6px_rgba(216,48,77,0.35)]"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  {p.colorScheme === 'crimson' ? (
                    <>
                      <stop offset="0%" stopColor="#E63956" />
                      <stop offset="60%" stopColor="#D82042" />
                      <stop offset="100%" stopColor="#9E1932" />
                    </>
                  ) : p.colorScheme === 'rose' ? (
                    <>
                      <stop offset="0%" stopColor="#FF758F" />
                      <stop offset="65%" stopColor="#E83D62" />
                      <stop offset="100%" stopColor="#C9184A" />
                    </>
                  ) : (
                    <>
                      <stop offset="0%" stopColor="#FFF0F3" />
                      <stop offset="50%" stopColor="#FFB3C1" />
                      <stop offset="100%" stopColor="#FF758F" />
                    </>
                  )}
                </linearGradient>
              </defs>

              {/* Heart/Notched Sakura Petal Silhouette */}
              <path
                d="M15 2 C21 2, 28 8, 28 17 C28 26, 21 31, 15 35 C9 31, 2 26, 2 17 C2 8, 9 2, 15 2 Z"
                fill={fillUrl}
              />
              {/* Petal Center Crease Accent */}
              <path
                d="M15 7 Q15 20 15 28"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="1.2"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </div>
        );
      })}

      {/* Floating Golden Stardust Specks */}
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={`dust_${i}`}
          className="absolute rounded-full bg-[#FFDF80] pointer-events-none"
          style={{
            top: `${12 + (i * 11) % 80}%`,
            left: `${8 + (i * 13) % 85}%`,
            width: `${3 + (i % 3)}px`,
            height: `${3 + (i % 3)}px`,
            boxShadow: '0 0 8px rgba(255,223,128,0.9), 0 0 15px rgba(212,175,55,0.6)',
            animation: `sakura-shimmer ${2.5 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`
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

