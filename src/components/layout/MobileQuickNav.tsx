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
    const handleScroll = () => {
      const sections = ['home', 'projects', 'github', 'about', 'contact', 'skills', 'ventures', 'services', 'experience', 'education', 'certificates'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 shadow-[0_-8px_30px_rgba(0,0,0,0.6)] px-2 py-2 safe-area-pb"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {primaryLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex flex-col items-center justify-center p-1.5 min-w-[50px] rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-400 font-bold bg-cyan-950/40 border border-cyan-500/30 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`text-lg ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-mono mt-0.5 tracking-tight">{item.name}</span>
              </button>
            );
          })}

          {/* More Action Trigger */}
          <button
            onClick={() => setIsMoreOpen(true)}
            className={`flex flex-col items-center justify-center p-1.5 min-w-[50px] rounded-xl transition-all duration-200 ${
              isMoreOpen
                ? 'text-purple-400 font-bold bg-purple-950/40 border border-purple-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <HiDotsHorizontal className="text-lg" />
            <span className="text-[10px] font-mono mt-0.5 tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-up "More" Drawer for Mobile */}
      <AnimatePresence>
        {isMoreOpen && (
          <div
            className="xl:hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end justify-center"
            onClick={() => setIsMoreOpen(false)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-slate-900 border-t border-purple-500/40 rounded-t-3xl p-6 shadow-2xl shadow-purple-950/80 max-h-[85vh] overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 flex items-center justify-center text-white font-bold text-xs">
                    AM
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Quick Navigation</h4>
                    <span className="text-[10px] font-mono text-cyan-400">All Sections & Actions</span>
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
                  className="p-3 rounded-xl bg-purple-900/40 hover:bg-purple-900/70 border border-purple-500/40 text-purple-200 text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <HiDownload />
                  <span>Get Resume</span>
                </button>
                <button
                  onClick={() => {
                    setIsMoreOpen(false);
                    onOpenCommandPalette();
                  }}
                  className="p-3 rounded-xl bg-cyan-900/40 hover:bg-cyan-900/70 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-semibold flex items-center justify-center gap-2 shadow-sm"
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
                      className="p-3 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-2.5 transition-colors"
                    >
                      <Icon className="text-cyan-400 text-base flex-shrink-0" />
                      <span className="truncate">{link.name}</span>
                    </a>
                  );
                })}
              </div>

              <div className="text-center pt-2 text-[10px] font-mono text-slate-500">
                Alvin MS • Production Engineering Portfolio
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
