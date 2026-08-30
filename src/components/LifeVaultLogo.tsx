import React from 'react';

interface LifeVaultLogoProps {
  className?: string;
  size?: number | string;
  glow?: boolean;
  animated?: boolean;
}

export const LifeVaultLogo: React.FC<LifeVaultLogoProps> = ({
  className = 'w-9 h-9',
  glow = true,
  animated = false,
}) => {
  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      {glow && (
        <div className="absolute inset-0 rounded-2xl bg-emerald-500/25 blur-md pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full relative z-10 transition-transform ${
          animated ? 'hover:scale-105' : ''
        }`}
      >
        <defs>
          <linearGradient id="lvShieldGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="35%" stopColor="#22C55E" />
            <stop offset="70%" stopColor="#16C47F" />
            <stop offset="100%" stopColor="#00FF87" />
          </linearGradient>

          <linearGradient id="lvKeyholeGrad" x1="60" y1="35" x2="80" y2="85" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="45%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>

          <filter id="lvNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#22C55E" floodOpacity="0.65" />
          </filter>
        </defs>

        {/* Outer Shield Outline: Right Flank & Crest */}
        <path
          d="M 64 14 L 98 30 C 98 72 78 98 64 110 C 53 100 40 85 36 72"
          stroke="url(#lvShieldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#lvNeonGlow)"
        />

        {/* Top-Left Shield Arch branching to Circuit */}
        <path
          d="M 64 14 L 38 28 L 38 48"
          stroke="url(#lvShieldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Horizontal Input Circuit Bus on Left */}
        <path
          d="M 12 60 L 52 60"
          stroke="url(#lvShieldGrad)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        {/* Terminal Left Circuit Node */}
        <circle cx="12" cy="60" r="5.5" fill="url(#lvShieldGrad)" />
        <circle cx="12" cy="60" r="2.2" fill="#0A0A0A" />

        {/* Upper Circuit Trace inside Shield */}
        <path
          d="M 48 48 L 48 34 L 56 34 L 56 42"
          stroke="url(#lvShieldGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="56" cy="44" r="4.2" fill="url(#lvShieldGrad)" />

        {/* Lower Circuit Trace inside Shield */}
        <path
          d="M 38 72 L 56 72 L 56 86"
          stroke="url(#lvShieldGrad)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="56" cy="88" r="4.2" fill="url(#lvShieldGrad)" />

        {/* Center Keyhole Core */}
        <path
          d="M 72 40 A 9 9 0 0 1 79 53 L 81 76 C 81 78 79 80 77 80 L 67 80 C 65 80 63 78 63 76 L 65 53 A 9 9 0 0 1 72 40 Z"
          fill="url(#lvKeyholeGrad)"
          filter="url(#lvNeonGlow)"
        />
      </svg>
    </div>
  );
};
