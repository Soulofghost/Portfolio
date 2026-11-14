'use client';

import { useState, useEffect, memo } from 'react';
import {
  HiHome,
  HiUser,
  HiCode,
  HiViewGrid,
  HiBriefcase,
  HiAcademicCap,
  HiBadgeCheck,
  HiDesktopComputer,
  HiMail,
  HiSparkles,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export const navData = [
  { name: 'home', path: '#home', label: 'Home', icon: <HiHome /> },
  { name: 'about', path: '#about', label: 'About', icon: <HiUser /> },
  { name: 'ventures', path: '#ventures', label: 'Ventures', icon: <HiSparkles /> },
  { name: 'skills', path: '#skills', label: 'Skills', icon: <HiCode /> },
  { name: 'projects', path: '#projects', label: 'Projects', icon: <HiViewGrid /> },
  { name: 'services', path: '#services', label: 'Services', icon: <HiDesktopComputer /> },
  { name: 'experience', path: '#experience', label: 'Experience', icon: <HiBriefcase /> },
  { name: 'education', path: '#education', label: 'Education', icon: <HiAcademicCap /> },
  { name: 'certificates', path: '#certificates', label: 'Certificates', icon: <HiBadgeCheck /> },
  { name: 'github', path: '#github', label: 'GitHub', icon: <FaGithub /> },
  { name: 'linkedin', path: '#linkedin', label: 'LinkedIn', icon: <FaLinkedin /> },
  { name: 'contact', path: '#contact', label: 'Contact', icon: <HiMail /> },
];

function Nav() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-25% 0px -40% 0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navData.forEach((item) => {
      const el = document.getElementById(item.name);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className="hidden xl:flex flex-col items-center justify-center fixed h-max bottom-0 mt-auto right-[1.5%] z-40 top-0 w-12 max-w-md h-screen pointer-events-none"
      aria-label="Desktop Navigation"
    >
      {/* Curved floating dock container for Desktop */}
      <div className="flex flex-col items-center justify-center gap-y-2.5 px-0 py-4 bg-slate-900/85 backdrop-blur-xl border border-white/10 rounded-full pointer-events-auto shadow-2xl shadow-purple-900/25">
        {navData.map((link, index) => {
          const isActive = activeSection === link.name;
          return (
            <a
              key={index}
              href={link.path}
              className={`relative flex items-center group transition-all duration-200 p-2 rounded-full ${
                isActive
                  ? 'text-cyan-400 font-bold scale-110 bg-cyan-950/40'
                  : 'text-slate-400 hover:text-purple-400 hover:scale-105'
              }`}
              title={link.label}
              aria-label={link.label}
            >
              {/* Tooltip on left */}
              <div className="absolute pr-12 right-0 hidden group-hover:flex items-center pointer-events-none">
                <div className="bg-slate-900/95 backdrop-blur-md relative flex text-white items-center px-2.5 py-1 rounded-lg border border-purple-500/40 shadow-xl">
                  <div className="text-[11px] leading-none font-semibold capitalize font-mono text-cyan-300">
                    {link.label}
                  </div>
                  <div className="border-solid border-l-purple-500/40 border-l-[5px] border-y-transparent border-y-[4px] border-r-0 absolute -right-1" />
                </div>
              </div>

              {/* Icon */}
              <div className="text-base relative">
                {link.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_#22d3ee]" />
                )}
              </div>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default memo(Nav);
