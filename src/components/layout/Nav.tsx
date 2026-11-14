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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    const id = path.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="hidden xl:flex flex-col items-center justify-center fixed h-max bottom-0 mt-auto right-[1.5%] z-40 top-0 w-12 max-w-md h-screen pointer-events-none"
      aria-label="Desktop Navigation"
    >
      {/* Curved floating dock container for Desktop */}
      <div className="flex flex-col items-center justify-center gap-y-2 px-0 py-3.5 bg-[#0a0f18]/90 backdrop-blur-md border border-white/10 rounded-full pointer-events-auto shadow-2xl">
        {navData.map((link, index) => {
          const isActive = activeSection === link.name;
          return (
            <a
              key={index}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              className={`relative flex items-center group transition-colors duration-200 p-2 rounded-full ${
                isActive
                  ? 'text-emerald-400 font-bold bg-emerald-950/40'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
              title={link.label}
              aria-label={link.label}
            >
              {/* Tooltip on left */}
              <div className="absolute pr-12 right-0 hidden group-hover:flex items-center pointer-events-none">
                <div className="bg-[#0f172a] relative flex text-white items-center px-2.5 py-1 rounded-lg border border-white/10 shadow-xl">
                  <div className="text-[11px] leading-none font-semibold capitalize font-mono text-emerald-300">
                    {link.label}
                  </div>
                  <div className="border-solid border-l-[#0f172a] border-l-[5px] border-y-transparent border-y-[4px] border-r-0 absolute -right-1" />
                </div>
              </div>

              {/* Icon */}
              <div className="text-base relative">
                {link.icon}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-emerald-400 rounded-full" />
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
