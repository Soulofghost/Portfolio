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
  return (
    <header className="fixed top-0 left-0 right-0 z-40 w-full flex items-center px-6 lg:px-16 h-[72px] bg-slate-950/70 backdrop-blur-md border-b border-white/5">
      <div className="container mx-auto max-w-7xl flex justify-between items-center">
        {/* Logo */}
        <Link href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-cyan-500 to-blue-600 p-[1.5px] shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span className="font-extrabold text-base text-gradient tracking-wider">AM</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-100 tracking-wide text-sm group-hover:text-purple-400 transition-colors">
              Alvin MS
            </span>
            <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">
              CS & AI Engineer
            </span>
          </div>
        </Link>

        {/* Live Availability Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 text-xs text-emerald-400 font-mono shadow-sm shadow-emerald-500/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for Roles & Projects</span>
        </div>

        {/* Quick Actions & Social Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 border border-slate-700 font-mono transition-all hover:border-cyan-500/40"
            title="Open Command Palette (Ctrl+K or ⌘K)"
            aria-label="Open Command Palette"
          >
            <span className="hidden sm:inline">Commands</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-cyan-400 border border-slate-700">
              Ctrl+K
            </kbd>
          </button>

          {/* Terminal / Matrix Easter Egg */}
          <button
            onClick={onToggleMatrix}
            className="p-2 sm:p-2.5 rounded-xl bg-slate-900/80 hover:bg-purple-950/80 border border-purple-500/30 text-purple-400 hover:text-purple-300 transition-all text-sm"
            title="Toggle Matrix Mode"
            aria-label="Toggle Matrix Mode"
          >
            <FaTerminal />
          </button>

          {/* Social Icons */}
          <div className="flex items-center gap-1 sm:gap-2 text-slate-300 text-base">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-cyan-400 hover:scale-110 transition-all"
              title="GitHub Profile (@Soulofghost)"
              aria-label="GitHub Profile"
            >
              <FaGithub />
            </a>
            <a
              href={PERSONAL_INFO.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 hover:text-purple-400 hover:scale-110 transition-all"
              title="LinkedIn Profile (Alvin MS)"
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
