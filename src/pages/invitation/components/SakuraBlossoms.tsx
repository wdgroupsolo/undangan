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
      className={`drop-shadow-[0_4px_10px_rgba(158,25,50,0.35)] ${className}`}
    >
      <defs>
        <radialGradient id="sakuraPetalGrad" cx="50%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF5F7" />
          <stop offset="30%" stopColor="#FF85A1" />
          <stop offset="75%" stopColor="#E63956" />
          <stop offset="100%" stopColor="#A81832" />
        </radialGradient>
        <radialGradient id="sakuraCenterGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE066" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </radialGradient>
      </defs>

      {/* 5 Petals arranged radially */}
      {[0, 72, 144, 216, 288].map((angle, idx) => (
        <g key={idx} transform={`rotate(${angle} 50 50)`}>
          {/* Main Petal with Characteristic Sakura Tip Notch */}
          <path
            d="M50 50 C40 32, 33 16, 43 7 C47 4, 50 8, 50 8 C50 8, 53 4, 57 7 C67 16, 60 32, 50 50 Z"
            fill="url(#sakuraPetalGrad)"
            stroke="#9E1932"
            strokeWidth="0.8"
            opacity="0.96"
          />
          {/* Inner Petal Vein Accent */}
          <path
            d="M50 50 Q50 30 50 16"
            stroke="rgba(255, 235, 240, 0.6)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* Golden Pistil & Stamens Center */}
      <circle cx="50" cy="50" r="11" fill="url(#sakuraCenterGrad)" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((stamenAngle, sIdx) => (
        <g key={`stamen_${sIdx}`} transform={`rotate(${stamenAngle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="40" stroke="#FFFBEB" strokeWidth="1.2" />
          <circle cx="50" cy="39" r="1.6" fill="#FBBF24" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4.5" fill="#92400E" opacity="0.8" />
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
        <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#40916C" />
          <stop offset="50%" stopColor="#2D6A4F" />
          <stop offset="100%" stopColor="#1B4332" />
        </linearGradient>
      </defs>
      {/* Primary Leaf */}
      <path
        d="M20 80 C25 50, 45 25, 80 20 C75 55, 55 75, 20 80 Z"
        fill="url(#leafGrad)"
        stroke="#1B4332"
        strokeWidth="0.8"
        opacity="0.95"
      />
      {/* Primary Vein */}
      <path d="M20 80 Q48 52 80 20" stroke="#74C69D" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Secondary Flanking Leaf */}
      <path
        d="M35 70 C35 48, 50 32, 75 40 C65 62, 50 72, 35 70 Z"
        fill="url(#leafGrad)"
        opacity="0.85"
      />
    </svg>
  );
};

// =========================================================================
// 4. SAKURA FRAME COMPONENT (Kanan, Kiri, Atas, Bawah Bunga Sakura)
// =========================================================================
export const SakuraCoverFrame: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-25 ${className}`}>
      
      {/* ================= ATAS KIRI (TOP LEFT) ================= */}
      <div className="absolute -top-3 -left-3 sm:-top-2 sm:-left-2 flex items-center justify-center">
        {/* Leaves behind */}
        <div className="absolute top-1 left-2">
          <SakuraLeaves size={75} rotation={-15} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10 animate-pulse" style={{ animationDuration: '4s' }}>
          <SakuraFlower size={68} rotation={12} />
        </div>
        {/* Secondary Smaller Blossom */}
        <div className="absolute top-9 left-11 z-15">
          <SakuraFlower size={42} rotation={45} />
        </div>
        {/* Little Bud */}
        <div className="absolute top-1 left-16 z-5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-[#FFF0F3]" />
      </div>

      {/* ================= ATAS KANAN (TOP RIGHT) ================= */}
      <div className="absolute -top-3 -right-3 sm:-top-2 sm:-right-2 flex items-center justify-center scale-x-[-1]">
        {/* Leaves behind */}
        <div className="absolute top-1 left-2">
          <SakuraLeaves size={75} rotation={-15} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10 animate-pulse" style={{ animationDuration: '4.5s' }}>
          <SakuraFlower size={68} rotation={12} />
        </div>
        {/* Secondary Smaller Blossom */}
        <div className="absolute top-9 left-11 z-15">
          <SakuraFlower size={42} rotation={45} />
        </div>
        {/* Little Bud */}
        <div className="absolute top-1 left-16 z-5 w-3.5 h-3.5 rounded-full bg-gradient-to-br from-[#FF758F] to-[#C9184A] border border-[#FFF0F3]" />
      </div>

      {/* ================= KIRI TENGAH (LEFT MIDDLE) ================= */}
      <div className="absolute top-[48%] -left-3 sm:-left-2 -translate-y-1/2 flex items-center justify-center">
        <div className="absolute -top-3 left-1">
          <SakuraLeaves size={60} rotation={25} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={52} rotation={-20} />
        </div>
        <div className="absolute -bottom-5 left-4 z-15">
          <SakuraFlower size={34} rotation={35} />
        </div>
      </div>

      {/* ================= KANAN TENGAH (RIGHT MIDDLE) ================= */}
      <div className="absolute top-[48%] -right-3 sm:-right-2 -translate-y-1/2 flex items-center justify-center scale-x-[-1]">
        <div className="absolute -top-3 left-1">
          <SakuraLeaves size={60} rotation={25} />
        </div>
        <div className="relative z-10">
          <SakuraFlower size={52} rotation={-20} />
        </div>
        <div className="absolute -bottom-5 left-4 z-15">
          <SakuraFlower size={34} rotation={35} />
        </div>
      </div>

      {/* ================= BAWAH KIRI (BOTTOM LEFT) ================= */}
      <div className="absolute -bottom-4 -left-4 sm:-bottom-3 sm:-left-3 flex items-center justify-center">
        {/* Leaves behind */}
        <div className="absolute bottom-2 left-3">
          <SakuraLeaves size={85} rotation={75} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10">
          <SakuraFlower size={74} rotation={-35} />
        </div>
        {/* Companion Blossom */}
        <div className="absolute bottom-11 left-9 z-15">
          <SakuraFlower size={46} rotation={15} />
        </div>
        {/* Tertiary Blossom on Bottom Edge */}
        <div className="absolute bottom-3 left-14 z-15">
          <SakuraFlower size={38} rotation={60} />
        </div>
      </div>

      {/* ================= BAWAH KANAN (BOTTOM RIGHT) ================= */}
      <div className="absolute -bottom-4 -right-4 sm:-bottom-3 sm:-right-3 flex items-center justify-center scale-x-[-1]">
        {/* Leaves behind */}
        <div className="absolute bottom-2 left-3">
          <SakuraLeaves size={85} rotation={75} />
        </div>
        {/* Main Corner Blossom */}
        <div className="relative z-10">
          <SakuraFlower size={74} rotation={-35} />
        </div>
        {/* Companion Blossom */}
        <div className="absolute bottom-11 left-9 z-15">
          <SakuraFlower size={46} rotation={15} />
        </div>
        {/* Tertiary Blossom on Bottom Edge */}
        <div className="absolute bottom-3 left-14 z-15">
          <SakuraFlower size={38} rotation={60} />
        </div>
      </div>

    </div>
  );
};
