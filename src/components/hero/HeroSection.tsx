'use client';

import { useState, useEffect, useCallback, memo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/variants';
import { PERSONAL_INFO } from '@/data/portfolioData';
import { HiDownload, HiArrowRight, HiMail, HiLocationMarker, HiShieldCheck } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import UniverseBackground, { ActiveBoxType } from './UniverseBackground';
import InteractiveUniverseBoxes from './InteractiveUniverseBoxes';

interface HeroSectionProps {
  onOpenResumeModal: () => void;
}

const ROLES = [
  'Computer Science & AI Student',
  'Full Stack Developer',
  'Java Developer',
  'AI Enthusiast',
  'Entrepreneur',
];

function HeroSection({ onOpenResumeModal }: HeroSectionProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeBox, setActiveBox] = useState<ActiveBoxType>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    }
  }, []);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    const typingSpeed = isDeleting ? 30 : 65;

    const timeout = setTimeout(() => {
      if (!isDeleting && displayedText.length < currentRole.length) {
        setDisplayedText(currentRole.slice(0, displayedText.length + 1));
      } else if (!isDeleting && displayedText.length === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayedText.length > 0) {
        setDisplayedText(currentRole.slice(0, displayedText.length - 1));
      } else if (isDeleting && displayedText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, roleIndex]);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      onMouseMove={handleHeroMouseMove}
      className="relative w-full pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
    >
      {/* Multi-Layer Live Animated Universe Background */}
      <UniverseBackground activeBox={activeBox} mousePos={mousePos} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Introduction & Core Manifesto (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            
            {/* Identity Overline Pill */}
            <motion.div
              variants={fadeIn('down', 0.15)}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-mono text-slate-300 mb-6 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-white font-semibold tracking-wider uppercase">ALVIN MS</span>
              <span className="text-slate-500">—</span>
              <span className="text-emerald-400 font-medium">SOFTWARE / AI / VENTURES</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-cyan-400 font-medium hidden sm:inline">BUILDING DIGITAL SYSTEMS</span>
            </motion.div>

            {/* Editorial Main Headline */}
            <motion.h1
              variants={fadeIn('down', 0.25)}
              initial="hidden"
              animate="show"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.12] mb-5"
            >
              Building software. <br className="hidden sm:inline" />
              Designing systems. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Creating ideas that matter.
              </span>
            </motion.h1>

            {/* Dynamic Typewriter Role */}
            <motion.div
              variants={fadeIn('down', 0.35)}
              initial="hidden"
              animate="show"
              className="h-9 text-base sm:text-lg font-mono text-emerald-400 font-semibold mb-5 flex items-center justify-center lg:justify-start"
            >
              <span className="text-slate-400 font-normal">Focus:&nbsp;</span>
              <span className="text-white">{displayedText}</span>
              <span className="animate-pulse text-emerald-400 ml-0.5">_</span>
            </motion.div>

            {/* Supporting Description */}
            <motion.p
              variants={fadeIn('down', 0.45)}
              initial="hidden"
              animate="show"
              className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mb-8 font-normal"
            >
              I am a Computer Science & Artificial Intelligence student, software developer and entrepreneur interested in building intelligent applications, scalable digital platforms and technology-driven products. My focus includes software engineering, AI, full-stack development, backend systems and entrepreneurship.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={fadeIn('down', 0.55)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 mb-8 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, 'projects')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-[#080c14] font-bold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all duration-200"
              >
                <span>Explore My Projects</span>
                <HiArrowRight className="text-sm" />
              </a>

              <button
                onClick={onOpenResumeModal}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] border border-slate-700/80 hover:border-emerald-500/40 text-slate-200 hover:text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
              >
                <HiDownload className="text-sm text-emerald-400" />
                <span>Download Resume</span>
              </button>

              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <HiMail className="text-sm text-cyan-400" />
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Secondary Social Links */}
            <motion.div
              variants={fadeIn('down', 0.65)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3 text-slate-400 text-sm font-mono"
            >
              <span className="text-[11px] uppercase tracking-wider text-slate-500">Connect:</span>
              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 hover:text-white flex items-center gap-1.5 transition-colors text-xs"
                title="GitHub (@Soulofghost)"
              >
                <FaGithub />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:text-emerald-400 flex items-center gap-1.5 transition-colors text-xs"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a
                href={PERSONAL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-pink-500/40 hover:text-pink-400 flex items-center gap-1.5 transition-colors text-xs"
                title="Instagram Profile"
              >
                <FaInstagram />
                <span>Instagram</span>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Signature Technical Identity Composition (5 cols on desktop) */}
          <div className="lg:col-span-5 flex justify-center w-full">
            <motion.div
              variants={fadeIn('up', 0.3)}
              initial="hidden"
              animate="show"
              className="w-full max-w-sm sm:max-w-md"
            >
              {/* Technical Identity Framing Panel */}
              <div className="rounded-2xl bg-[#0b101b] border border-white/10 p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-all duration-300 hover:border-emerald-500/30">
                
                {/* Header Bar: Status & Geolocation */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4 text-[10px] font-mono">
                  <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>SYSTEM ONLINE</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-400">
                    <HiLocationMarker className="text-slate-500 text-xs" />
                    <span>KERALA, INDIA</span>
                  </div>
                </div>

                {/* Profile Portrait Container */}
                <div className="relative aspect-[4/5] w-full rounded-xl overflow-hidden bg-slate-950 mb-4 border border-white/5">
                  <Image
                    src="/profile.jpg"
                    alt="Alvin MS Portrait Photo"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 440px"
                    className="object-cover object-top transition-transform duration-500 hover:scale-[1.02]"
                  />
                  {/* Subtle bottom gradient to enhance technical readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-transparent to-transparent opacity-60 pointer-events-none" />

                  {/* Overlaid Identity Badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-[#080c14]/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                    <div>
                      <div className="text-white font-bold leading-none">Alvin MS</div>
                      <div className="text-[10px] text-slate-400 mt-1">CS & AI Student • MBCCET</div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-semibold">
                        Engineer
                      </span>
                    </div>
                  </div>
                </div>

                {/* Technical Metadata Matrix */}
                <div className="space-y-2 text-[11px] font-mono">
                  <div className="p-2.5 rounded-lg bg-slate-900/70 border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">Current Focus:</span>
                    <span className="text-white font-semibold">Distributed Systems & AI Platforms</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Startups</span>
                      <span className="text-emerald-400 font-semibold">NEXAURON & HELIX</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/50 border border-slate-800/80">
                      <span className="text-slate-500 block text-[9px] uppercase tracking-wider">Portfolio</span>
                      <span className="text-cyan-400 font-semibold">50 Repos Architecture</span>
                    </div>
                  </div>
                </div>

                {/* Footer Assurance Tag */}
                <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <HiShieldCheck className="text-emerald-400 text-xs" />
                    <span>Verified Production Architecture</span>
                  </div>
                  <span className="text-slate-400">© 2026</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>

        {/* 4 Multi-Effect Interactive Project Boxes (SENTRIX, NexaAPIX, Open Source, Tech Matrix) */}
        <InteractiveUniverseBoxes
          activeBox={activeBox}
          onHoverBox={setActiveBox}
        />
      </div>
    </section>
  );
}

export default memo(HeroSection);
