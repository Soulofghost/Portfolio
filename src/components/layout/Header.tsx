'use client';

import Link from 'next/link';
import { FaGithub, FaLinkedin, FaInstagram, FaTerminal } from 'react-icons/fa';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface HeaderProps {
  onToggleMatrix?: () => void;
  onOpenCommandPalette?: () => void;
  onOpenAdmin?: () => void;
}

export default function Header({
  onToggleMatrix,
  onOpenCommandPalette,
  onOpenAdmin,
}: HeaderProps) {
  const scrollToHome = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('home');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full flex items-center px-3.5 sm:px-6 lg:px-12 h-[68px] bg-[#080c14]/85 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        {/* Brand Logo */}
        <a href="#home" onClick={scrollToHome} className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-[1.5px] transition-transform duration-200 group-hover:scale-105">
            <div className="w-full h-full bg-[#080c14] rounded-[10px] flex items-center justify-center font-bold text-white text-sm">
              AM
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-wide text-sm group-hover:text-emerald-400 transition-colors">
              Alvin MS
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
              Engineer & Founder
            </span>
          </div>
        </a>

        {/* Live Availability Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/70 border border-emerald-500/30 text-xs text-emerald-400 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for Roles & Ventures</span>
        </div>

        {/* Quick Actions & Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700/80 font-mono transition-all hover:border-emerald-500/40"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <span className="hidden sm:inline">Commands</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-emerald-400 border border-slate-800">
              Ctrl+K
            </kbd>
          </button>

          {/* Terminal / Matrix Easter Egg */}
          <button
            onClick={onToggleMatrix}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-slate-400 hover:text-emerald-400 transition-colors text-sm"
            title="Toggle Matrix Mode"
            aria-label="Toggle Matrix Mode"
          >
            <FaTerminal />
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-1 text-slate-400 text-base">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-white hover:scale-105 transition-all"
              title="GitHub (@Soulofghost)"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-emerald-400 hover:scale-105 transition-all"
              title="LinkedIn (Alvin MS)"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
