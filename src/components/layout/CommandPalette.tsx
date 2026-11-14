'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiSearch,
  HiX,
  HiCode,
  HiDownload,
  HiUser,
  HiBriefcase,
  HiMail,
  HiViewGrid,
  HiAcademicCap,
  HiBadgeCheck,
  HiDesktopComputer,
  HiSparkles,
  HiTerminal,
  HiShieldCheck,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { PERSONAL_INFO } from '@/data/portfolioData';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onToggleMatrix: () => void;
  onOpenAdmin?: () => void;
}

interface CommandAction {
  id: string;
  label: string;
  category: 'Navigation' | 'Actions' | 'Social' | 'Featured Projects' | 'System';
  shortcut?: string;
  icon: any;
  action?: () => void;
  href?: string;
  external?: boolean;
}

export default function CommandPalette({
  isOpen,
  onClose,
  onOpenResume,
  onToggleMatrix,
  onOpenAdmin,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  const actions: CommandAction[] = [
    // Navigation
    { id: 'nav-home', label: 'Go to Home', category: 'Navigation', shortcut: 'Home', href: '#home', icon: HiUser },
    { id: 'nav-about', label: 'View About Bio & Vision', category: 'Navigation', href: '#about', icon: HiUser },
    { id: 'nav-skills', label: 'Explore Skills Matrix', category: 'Navigation', href: '#skills', icon: HiCode },
    { id: 'nav-projects', label: 'Browse Featured Projects & Case Studies', category: 'Navigation', href: '#projects', icon: HiViewGrid },
    { id: 'nav-ventures', label: 'Startups & Ventures (NEXAURON & HELIX)', category: 'Navigation', href: '#ventures', icon: HiSparkles },
    { id: 'nav-services', label: 'Services & Engineering Capabilities', category: 'Navigation', href: '#services', icon: HiDesktopComputer },
    { id: 'nav-experience', label: 'Work Experience (TekLearn)', category: 'Navigation', href: '#experience', icon: HiBriefcase },
    { id: 'nav-education', label: 'Education (MBCCET B.Tech CS & AI)', category: 'Navigation', href: '#education', icon: HiAcademicCap },
    { id: 'nav-certificates', label: 'Verified Certificates', category: 'Navigation', href: '#certificates', icon: HiBadgeCheck },
    { id: 'nav-github', label: 'GitHub Repositories Live Showcase', category: 'Navigation', href: '#github', icon: FaGithub },
    { id: 'nav-contact', label: 'Contact Alvin MS', category: 'Navigation', shortcut: 'End', href: '#contact', icon: HiMail },

    // Featured Projects
    {
      id: 'proj-sentrix',
      label: 'Featured: SENTRIX (Smart Disaster Response & SEM Platform)',
      category: 'Featured Projects',
      href: '#projects',
      icon: HiShieldCheck,
    },
    {
      id: 'proj-civix',
      label: 'Featured: CIVIX (Smart Civic Issue Reporting)',
      category: 'Featured Projects',
      href: '#projects',
      icon: HiViewGrid,
    },
    {
      id: 'proj-nexa',
      label: 'Featured: NexaAPIX (AI API Marketplace & Governance)',
      category: 'Featured Projects',
      href: '#projects',
      icon: HiCode,
    },

    // Actions & Tools
    { id: 'act-resume', label: 'Download Resume (CV)', category: 'Actions', shortcut: 'R', action: onOpenResume, icon: HiDownload },
    { id: 'act-matrix', label: 'Toggle Matrix Rain Mode Easter Egg', category: 'Actions', shortcut: 'M', action: onToggleMatrix, icon: HiTerminal },
    ...(onOpenAdmin
      ? [{ id: 'act-admin', label: 'Open Automation & Admin Dashboard', category: 'System' as const, action: onOpenAdmin, icon: HiCode }]
      : []),

    // External Profiles
    {
      id: 'soc-github',
      label: 'Open GitHub Profile (@Soulofghost)',
      category: 'Social',
      href: PERSONAL_INFO.githubUrl,
      icon: FaGithub,
      external: true,
    },
    {
      id: 'soc-linkedin',
      label: 'Open LinkedIn Profile (Alvin MS)',
      category: 'Social',
      href: PERSONAL_INFO.linkedinUrl,
      icon: FaLinkedin,
      external: true,
    },
  ];

  const filtered = actions.filter((a) =>
    `${a.label} ${a.category}`.toLowerCase().includes(query.toLowerCase())
  );

  // Auto focus input on open
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Keep selected index in bounds when filtering
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation inside open palette
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = filtered[selectedIndex];
        if (selected) {
          executeAction(selected);
        }
      } else if (e.key === 'Home' && !query) {
        e.preventDefault();
        window.location.href = '#home';
        onClose();
      } else if (e.key === 'End' && !query) {
        e.preventDefault();
        window.location.href = '#contact';
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filtered, query, onClose]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIndex]);

  const executeAction = (action: CommandAction) => {
    onClose();
    if (action.action) {
      action.action();
    } else if (action.href) {
      if (action.external) {
        window.open(action.href, '_blank', 'noopener,noreferrer');
      } else {
        const targetId = action.href.replace('#', '');
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = action.href;
        }
      }
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl bg-slate-900 border border-purple-500/40 rounded-2xl overflow-hidden shadow-2xl shadow-purple-950/70 flex flex-col max-h-[80vh]"
        >
          {/* Input Header */}
          <div className="relative border-b border-slate-800 p-4 flex items-center gap-3">
            <HiSearch className="text-cyan-400 text-xl flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search sections, projects, actions or shortcuts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none font-mono"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs font-mono text-slate-500 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                Clear
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <HiX className="text-lg" />
            </button>
          </div>

          {/* Results List */}
          <div ref={listRef} className="overflow-y-auto p-2 space-y-1 flex-1">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-500 font-mono text-xs">
                No matching actions found for "{query}".
              </div>
            ) : (
              filtered.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => executeAction(item)}
                    className={`px-4 py-3 rounded-xl flex items-center justify-between cursor-pointer transition-colors text-xs font-mono ${
                      isSelected
                        ? 'bg-gradient-to-r from-purple-900/60 to-cyan-950/60 text-white border border-purple-500/40 shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800/80 hover:text-white border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        <Icon className="text-base" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-100 flex items-center gap-2">
                          <span>{item.label}</span>
                          {item.external && <span className="text-[10px] text-cyan-400">↗</span>}
                        </div>
                        <span className="text-[10px] text-slate-500">{item.category}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.shortcut && (
                        <kbd className="px-2 py-0.5 rounded bg-slate-800 text-[10px] text-cyan-400 border border-slate-700">
                          {item.shortcut}
                        </kbd>
                      )}
                      <span className="text-[10px] text-slate-500 hidden sm:inline">↵</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Guide */}
          <div className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-400 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">↑↓</kbd> Navigate</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">↵</kbd> Select</span>
              <span><kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">ESC</kbd> Close</span>
            </div>
            <div className="text-cyan-400">
              Ctrl+K / ⌘K to open anytime
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
