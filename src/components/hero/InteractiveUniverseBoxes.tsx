'use client';

import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiShieldCheck,
  HiLightningBolt,
  HiCode,
  HiCube,
  HiArrowRight,
  HiCheckCircle,
  HiExternalLink,
  HiSparkles,
} from 'react-icons/hi';
import { FaGithub, FaRocket } from 'react-icons/fa';
import { ActiveBoxType } from './UniverseBackground';

interface InteractiveUniverseBoxesProps {
  activeBox: ActiveBoxType;
  onHoverBox: (box: ActiveBoxType) => void;
  onSelectProject?: (projectId: string) => void;
}

interface BoxItem {
  id: 'sentrix' | 'nexa' | 'opensource' | 'tech';
  title: string;
  subtitle: string;
  badge: string;
  badgeStyle: string;
  icon: any;
  accentColor: string;
  borderColor: string;
  glowColor: string;
  description: string;
  specifications: string[];
  targetSection: string;
  actionText: string;
}

const BOXES: BoxItem[] = [
  {
    id: 'sentrix',
    title: 'SENTRIX',
    subtitle: 'Civil Defense & SEM Engine',
    badge: 'SEM Online • PGA Telemetry',
    badgeStyle: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
    icon: HiLightningBolt,
    accentColor: '#f59e0b',
    borderColor: 'hover:border-amber-500/60 focus-visible:border-amber-500/80',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    description:
      'Autonomous emergency response engine coordinating real-time seismic peak acceleration (PGA), Haversine geodesic routing, and civil hazard broadcasts.',
    specifications: [
      'Peak Ground Acceleration (PGA) seismic engine',
      'Haversine geodesic rescue dispatch algorithms',
      'Real-time WebSocket telemetry coordination',
    ],
    targetSection: '#projects',
    actionText: 'Inspect SENTRIX Architecture',
  },
  {
    id: 'nexa',
    title: 'NexaAPIX',
    subtitle: 'Distributed API Gateway',
    badge: 'Token Bucket • <2ms Proxy',
    badgeStyle: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
    icon: HiCube,
    accentColor: '#a855f7',
    borderColor: 'hover:border-purple-500/60 focus-visible:border-purple-500/80',
    glowColor: 'rgba(168, 85, 247, 0.25)',
    description:
      'High-throughput reverse proxy gateway featuring dynamic rate limiting, token-bucket validation, upstream health verification, and latency telemetry.',
    specifications: [
      'Distributed token-bucket rate limiter engine',
      'Zero-trust JWT verification & header sanitizer',
      'Dynamic reverse proxying with live metrics',
    ],
    targetSection: '#ventures',
    actionText: 'View NexaAPIX Platform',
  },
  {
    id: 'opensource',
    title: 'Open Source',
    subtitle: '50 Repositories Architecture',
    badge: '50 Repos • Live GitHub Sync',
    badgeStyle: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
    icon: FaGithub,
    accentColor: '#10b981',
    borderColor: 'hover:border-emerald-500/60 focus-visible:border-emerald-500/80',
    glowColor: 'rgba(16, 185, 129, 0.25)',
    description:
      "Alvin MS's 50-repository software engineering ecosystem across AI, distributed systems, full-stack SaaS, and cybersecurity. Zero vanity metrics, 100% verified.",
    specifications: [
      '20 Flagships + 30 Advanced Core Repositories',
      '100% verified with automated CI/CD workflows',
      'Live GitHub API auto-sync with @Soulofghost',
    ],
    targetSection: '#github',
    actionText: 'Explore 50 Repositories',
  },
  {
    id: 'tech',
    title: 'Tech Matrix',
    subtitle: 'Core Systems & AI Engineering',
    badge: 'Java • Python • Next.js',
    badgeStyle: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
    icon: HiCode,
    accentColor: '#06b6d4',
    borderColor: 'hover:border-cyan-500/60 focus-visible:border-cyan-500/80',
    glowColor: 'rgba(6, 182, 212, 0.25)',
    description:
      'High-concurrency enterprise Java Spring Boot backend services, Python AI/ML pipelines, modern Next.js 16 full-stack applications, and containerized Docker runtimes.',
    specifications: [
      'Java Spring Boot & PostgreSQL persistence',
      'Python FastAPI, PyTorch & RAG architecture',
      'Next.js 16, TypeScript & Tailwind full-stack',
    ],
    targetSection: '#skills',
    actionText: 'View Full Technology Stack',
  },
];

function InteractiveUniverseBoxes({ activeBox, onHoverBox }: InteractiveUniverseBoxesProps) {
  const [selectedBox, setSelectedBox] = useState<ActiveBoxType>(null);
  const [mouseOffsets, setMouseOffsets] = useState<Record<string, { x: number; y: number }>>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    setMouseOffsets((prev) => ({
      ...prev,
      [id]: { x, y },
    }));
  }, []);

  const handleToggleSelect = useCallback((id: 'sentrix' | 'nexa' | 'opensource' | 'tech') => {
    setSelectedBox((prev) => (prev === id ? null : id));
  }, []);

  const handleScrollToSection = (targetId: string) => {
    const id = targetId.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full mt-10 lg:mt-12 relative z-20">
      {/* Constellation Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span className="text-white font-bold tracking-wide uppercase text-[11px]">
            Engineering Universe Matrix
          </span>
          <span className="text-slate-500 hidden sm:inline">—</span>
          <span className="text-slate-400 text-[10px] hidden sm:inline">
            Interactive Project Nodes (Hover to connect, click to inspect)
          </span>
        </div>

        <div className="text-[10px] font-mono text-cyan-400/90 bg-slate-900/80 px-2.5 py-1 rounded-full border border-cyan-500/20">
          4 Coordinated Nodes
        </div>
      </div>

      {/* 4 Interactive Project Boxes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 sm:gap-4">
        {BOXES.map((box) => {
          const IconComp = box.icon;
          const isHovered = activeBox === box.id;
          const isSelected = selectedBox === box.id;
          const offset = mouseOffsets[box.id] || { x: 120, y: 80 };

          return (
            <div
              key={box.id}
              role="button"
              tabIndex={0}
              aria-expanded={isSelected}
              onMouseEnter={() => onHoverBox(box.id)}
              onMouseLeave={() => onHoverBox(null)}
              onMouseMove={(e) => handleMouseMove(e, box.id)}
              onFocus={() => onHoverBox(box.id)}
              onBlur={() => onHoverBox(null)}
              onClick={() => handleToggleSelect(box.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleSelect(box.id);
                }
              }}
              className={`box-light-sweep group relative rounded-2xl p-4 sm:p-4.5 bg-[#0a0f18]/85 backdrop-blur-md border transition-all duration-300 cursor-pointer outline-none select-none ${
                isSelected
                  ? 'border-2 shadow-xl scale-[1.02]'
                  : isHovered
                  ? 'border-white/30 shadow-lg -translate-y-1'
                  : 'border-white/10 hover:border-white/20'
              } ${box.borderColor}`}
              style={{
                borderColor: isSelected || isHovered ? box.accentColor : undefined,
                boxShadow:
                  isSelected || isHovered
                    ? `0 12px 28px -6px ${box.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)`
                    : '0 4px 16px -2px rgba(0, 0, 0, 0.4)',
              }}
            >
              {/* Dynamic Cursor Spotlight Radial Highlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(180px circle at ${offset.x}px ${offset.y}px, ${box.glowColor}, transparent 70%)`,
                }}
              />

              {/* Card Header: Node Status, Icon & Title */}
              <div className="relative z-10 flex flex-wrap items-start justify-between gap-2 mb-2.5">
                <div className="flex items-center gap-2 min-w-0 max-w-[calc(100%-80px)]">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-sm shadow-inner transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    style={{
                      backgroundColor: `${box.accentColor}18`,
                      color: box.accentColor,
                      border: `1px solid ${box.accentColor}35`,
                    }}
                  >
                    <IconComp />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-extrabold text-white text-sm sm:text-base tracking-wide flex items-center gap-1.5 truncate">
                      <span className="truncate">{box.title}</span>
                      <span
                        className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
                        style={{ backgroundColor: box.accentColor }}
                      />
                    </h3>
                    <p className="text-[10px] font-mono text-slate-400 truncate">
                      {box.subtitle}
                    </p>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0 max-w-full truncate ${box.badgeStyle}`}
                >
                  {box.badge.split('•')[0].trim()}
                </span>
              </div>

              {/* Brief Technical Abstract */}
              <p className="relative z-10 text-slate-300 text-xs line-clamp-2 leading-relaxed mb-3">
                {box.description}
              </p>

              {/* Footer Interaction Hint */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                <span
                  className="font-semibold flex items-center gap-1 transition-colors"
                  style={{ color: isHovered || isSelected ? box.accentColor : '#94a3b8' }}
                >
                  <span>{isSelected ? 'Collapse Specs ▲' : 'Inspect Specs ▼'}</span>
                </span>
                <span className="text-slate-500 group-hover:text-slate-300 transition-colors">
                  {box.actionText.split(' ')[0]} →
                </span>
              </div>

              {/* Expandable Technical Detail Drawer (Accordion on Click/Tap) */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="overflow-hidden relative z-10 pt-3 mt-3 border-t border-slate-800/80"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mb-2">
                      Verified Capabilities:
                    </div>
                    <ul className="space-y-1.5 mb-3.5">
                      {box.specifications.map((spec, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-1.5 text-[11px] text-slate-200"
                        >
                          <HiCheckCircle
                            className="text-xs flex-shrink-0 mt-0.5"
                            style={{ color: box.accentColor }}
                          />
                          <span className="leading-tight">{spec}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Direct Action Link */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleScrollToSection(box.targetSection);
                      }}
                      className="w-full py-2 px-3 rounded-xl text-xs font-mono font-semibold flex items-center justify-center gap-2 transition-all shadow-md hover:scale-[1.02]"
                      style={{
                        backgroundColor: box.accentColor,
                        color: '#080c14',
                      }}
                    >
                      <span>{box.actionText}</span>
                      <HiArrowRight className="text-xs" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default memo(InteractiveUniverseBoxes);

