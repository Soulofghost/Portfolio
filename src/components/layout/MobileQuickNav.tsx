'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiHome,
  HiUser,
  HiViewGrid,
  HiMail,
  HiDotsHorizontal,
  HiCode,
  HiAcademicCap,
  HiBriefcase,
  HiBadgeCheck,
  HiDesktopComputer,
  HiDownload,
  HiX,
  HiSparkles,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

interface MobileQuickNavProps {
  onOpenResume: () => void;
  onOpenCommandPalette: () => void;
}

export default function MobileQuickNav({ onOpenResume, onOpenCommandPalette }: MobileQuickNavProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  useEffect(() => {
    // Off-thread IntersectionObserver avoids synchronous layout thrashing during scrolls
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0,
      }
    );

    const sections = ['home', 'projects', 'github', 'about', 'contact', 'skills', 'ventures', 'services', 'experience', 'education', 'certificates'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Lock body scroll only while mobile slide-up drawer is open, restore on close
  useEffect(() => {
    if (isMoreOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isMoreOpen]);

  const primaryLinks = [
    { name: 'Home', id: 'home', icon: HiHome },
    { name: 'Projects', id: 'projects', icon: HiViewGrid },
    { name: 'GitHub', id: 'github', icon: FaGithub },
    { name: 'About', id: 'about', icon: HiUser },
    { name: 'Contact', id: 'contact', icon: HiMail },
  ];

  const moreLinks = [
    { name: 'Skills Matrix', href: '#skills', icon: HiCode },
    { name: 'Startups & Ventures', href: '#ventures', icon: HiSparkles },
    { name: 'Services Offered', href: '#services', icon: HiDesktopComputer },
    { name: 'Experience', href: '#experience', icon: HiBriefcase },
    { name: 'Education', href: '#education', icon: HiAcademicCap },
    { name: 'Certificates', href: '#certificates', icon: HiBadgeCheck },
    { name: 'LinkedIn Profile', href: 'https://www.linkedin.com/in/alvin-ms-b812a836b/', icon: FaLinkedin, external: true },
  ];

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080c14]/92 backdrop-blur-lg border-t border-white/10 px-2 py-2 safe-area-pb max-w-full overflow-hidden"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around w-full max-w-md mx-auto">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center p-1.5 flex-1 min-w-0 max-w-[64px] rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-emerald-400 font-bold bg-emerald-950/40 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`text-lg ${isActive ? 'scale-105' : ''}`} />
                <span className="text-[10px] font-mono mt-0.5 tracking-tight truncate w-full text-center">{item.name}</span>
              </button>
            );
          })}

          {/* More Action Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center p-1.5 flex-1 min-w-0 max-w-[64px] rounded-xl transition-all duration-200 ${
              isMoreOpen
                ? 'text-teal-400 font-bold bg-teal-950/40 border border-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HiDotsHorizontal className="text-lg" />
            <span className="text-[10px] font-mono mt-0.5 tracking-tight truncate w-full text-center">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-up "More" Drawer for Mobile */}
      <AnimatePresence>
        {isMoreOpen && (
          <div
            className="xl:hidden fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-end justify-center"
            onClick={() => setIsMoreOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#0d131f] border-t border-white/10 rounded-t-3xl p-6 shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Quick Navigation</h4>
                    <span className="text-[10px] font-mono text-emerald-400">All Sections & Actions</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMoreOpen(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <HiX className="text-lg" />
                </button>
              </div>

              {/* Action Buttons: Resume & Command Palette */}
              <div className="grid grid-cols-2 gap-2.5 mb-5">
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenResume();
                  }}
                  className="p-3 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold flex items-center justify-center gap-2"
                >
                  <HiDownload />
                  <span>Get Resume</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-xs font-mono font-semibold flex items-center justify-center gap-2"
                >
                  <HiCode />
                  <span>Cmd Palette</span>
                </button>
              </div>

              {/* Navigation Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {moreLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.name}
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onClick={() => setIsMoreOpen(false)}
                      className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center gap-2.5 transition-colors"
                    >
                      <Icon className="text-emerald-400 text-base flex-shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <div className="text-center pt-2 text-[10px] font-mono text-slate-500">
                Alvin MS • Software, AI & Ventures
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
