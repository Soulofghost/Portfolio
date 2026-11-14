'use client';

import { memo, useEffect, useState, useRef } from 'react';

export type ActiveBoxType = 'sentrix' | 'nexa' | 'opensource' | 'tech' | null;

interface UniverseBackgroundProps {
  activeBox: ActiveBoxType;
  mousePos?: { x: number; y: number };
}

const ACCENT_COLORS: Record<string, { orb: string; trail: string }> = {
  sentrix: {
    orb: 'rgba(245, 158, 11, 0.18)',
    trail: '#f59e0b',
  },
  nexa: {
    orb: 'rgba(168, 85, 247, 0.18)',
    trail: '#a855f7',
  },
  opensource: {
    orb: 'rgba(16, 185, 129, 0.18)',
    trail: '#10b981',
  },
  tech: {
    orb: 'rgba(6, 182, 212, 0.18)',
    trail: '#06b6d4',
  },
};

function UniverseBackground({ activeBox, mousePos = { x: 0, y: 0 } }: UniverseBackgroundProps) {
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Pause background animations when offscreen to conserve CPU/GPU
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const activeAccent = activeBox ? ACCENT_COLORS[activeBox] : null;

  // Very subtle parallax offset (clamped to prevent any layout shift)
  const px = Math.max(-12, Math.min(12, mousePos.x * 14));
  const py = Math.max(-12, Math.min(12, mousePos.y * 14));

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-0 overflow-hidden max-w-full ${
        isVisible ? '' : 'paused-animations'
      }`}
      aria-hidden="true"
    >
      {/* 1. Slowly Moving Gradient Mesh Layer */}
      <div
        className="absolute inset-0 w-full h-full animate-mesh-drift opacity-70 will-change-transform"
        style={{
          background:
            'radial-gradient(circle at 25% 30%, rgba(16, 185, 129, 0.08) 0%, transparent 45%), ' +
            'radial-gradient(circle at 75% 25%, rgba(6, 182, 212, 0.09) 0%, transparent 45%), ' +
            'radial-gradient(circle at 50% 70%, rgba(139, 92, 246, 0.07) 0%, transparent 50%), ' +
            'radial-gradient(circle at 80% 75%, rgba(245, 158, 11, 0.05) 0%, transparent 40%)',
          transform: `translate3d(${px * 0.4}px, ${py * 0.4}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* 2. Technical Coordinate Blueprint Grid */}
      <svg
        className="absolute inset-0 w-full h-full opacity-35"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 80%)',
          transform: `translate3d(${px * 0.25}px, ${py * 0.25}px, 0)`,
          transition: 'transform 0.3s ease-out',
        }}
      >
        <defs>
          <pattern id="universe-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="rgba(255, 255, 255, 0.035)"
              strokeWidth="1"
            />
            {/* Coordinate Crosshairs at intersections */}
            <circle cx="0" cy="0" r="1" fill="rgba(52, 211, 153, 0.25)" />
            <path
              d="M -3 0 L 3 0 M 0 -3 L 0 3"
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="0.75"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#universe-grid)" />
      </svg>

      {/* 3. Flowing Light Trails & Circuit Connection Lines */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-45"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="trail-grad-sentrix" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trail-grad-nexa" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trail-grad-opensource" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trail-grad-tech" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="trail-grad-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(52, 211, 153, 0.4)" />
            <stop offset="100%" stopColor="rgba(6, 182, 212, 0.1)" />
          </linearGradient>
        </defs>

        {/* Diagonal interconnected circuit bus lines */}
        <path
          d="M 150 220 L 480 220 L 620 380 L 1050 380"
          fill="none"
          stroke={activeBox === 'sentrix' ? 'url(#trail-grad-sentrix)' : 'url(#trail-grad-base)'}
          strokeWidth={activeBox === 'sentrix' ? 2 : 1}
          className="animate-circuit-flow transition-all duration-300"
          opacity={activeBox === 'sentrix' ? 1 : 0.4}
        />
        <path
          d="M 220 540 L 520 540 L 700 420 L 1080 420"
          fill="none"
          stroke={activeBox === 'nexa' ? 'url(#trail-grad-nexa)' : 'url(#trail-grad-base)'}
          strokeWidth={activeBox === 'nexa' ? 2 : 1}
          className="animate-circuit-flow transition-all duration-300"
          opacity={activeBox === 'nexa' ? 1 : 0.35}
          style={{ animationDirection: 'reverse', animationDuration: '16s' }}
        />
        <path
          d="M 100 360 L 380 360 L 540 500 L 980 500"
          fill="none"
          stroke={activeBox === 'opensource' ? 'url(#trail-grad-opensource)' : 'url(#trail-grad-base)'}
          strokeWidth={activeBox === 'opensource' ? 2 : 1}
          className="animate-circuit-flow transition-all duration-300"
          opacity={activeBox === 'opensource' ? 1 : 0.3}
          style={{ animationDuration: '14s' }}
        />
        <path
          d="M 300 160 L 650 160 L 800 300 L 1120 300"
          fill="none"
          stroke={activeBox === 'tech' ? 'url(#trail-grad-tech)' : 'url(#trail-grad-base)'}
          strokeWidth={activeBox === 'tech' ? 2 : 1}
          className="animate-circuit-flow transition-all duration-300"
          opacity={activeBox === 'tech' ? 1 : 0.35}
          style={{ animationDuration: '18s' }}
        />

        {/* Central Hub Intersection Node Markers */}
        <circle
          cx="620"
          cy="380"
          r={activeBox === 'sentrix' ? 4.5 : 3}
          fill={activeBox === 'sentrix' ? '#f59e0b' : '#10b981'}
          className="transition-all duration-300"
        />
        <circle
          cx="700"
          cy="420"
          r={activeBox === 'nexa' ? 4.5 : 3}
          fill={activeBox === 'nexa' ? '#a855f7' : '#06b6d4'}
          className="transition-all duration-300"
        />
        <circle
          cx="540"
          cy="500"
          r={activeBox === 'opensource' ? 4.5 : 3}
          fill={activeBox === 'opensource' ? '#10b981' : '#34d399'}
          className="transition-all duration-300"
        />
        <circle
          cx="800"
          cy="300"
          r={activeBox === 'tech' ? 4.5 : 3}
          fill={activeBox === 'tech' ? '#06b6d4' : '#6366f1'}
          className="transition-all duration-300"
        />
      </svg>

      {/* 4. Ambient Glowing Orbs with Coordinated Asynchronous Float */}
      {/* Orb 1: Emerald/Teal (top-left) */}
      <div
        className="absolute top-8 left-4 sm:left-16 w-44 sm:w-[380px] h-44 sm:h-[380px] rounded-full bg-emerald-500/10 blur-[80px] animate-orb-1 will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(${px * 0.6}px, ${py * 0.6}px, 0)`,
        }}
      />

      {/* Orb 2: Cyan/Sky (top-right) */}
      <div
        className="absolute top-16 right-4 sm:right-16 w-44 sm:w-[340px] h-44 sm:h-[340px] rounded-full bg-cyan-500/10 blur-[75px] animate-orb-2 will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(${-px * 0.5}px, ${-py * 0.5}px, 0)`,
        }}
      />

      {/* Orb 3: Violet/Indigo (bottom-center) */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 w-48 sm:w-[360px] h-48 sm:h-[360px] rounded-full bg-purple-600/10 blur-[80px] animate-orb-3 will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(${px * 0.5}px, ${-py * 0.5}px, 0)`,
        }}
      />

      {/* 5. Dynamic Interactive Spotlight Orb (Reacts to Hovered Box) */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 sm:w-[460px] h-56 sm:h-[460px] rounded-full blur-[90px] transition-all duration-700 pointer-events-none opacity-80"
        style={{
          backgroundColor: activeAccent ? activeAccent.orb : 'rgba(16, 185, 129, 0.08)',
          transform: `translate3d(calc(-50% + ${px}px), calc(-50% + ${py}px), 0)`,
        }}
      />
    </div>
  );
}

export default memo(UniverseBackground);

