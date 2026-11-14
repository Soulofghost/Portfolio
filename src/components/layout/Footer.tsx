'use client';

import { PERSONAL_INFO } from '@/data/portfolioData';
import { FaGithub, FaLinkedin, FaInstagram, FaDiscord, FaEnvelope } from 'react-icons/fa';
import { HiArrowUp, HiShieldCheck } from 'react-icons/hi';
import WeatherWidget from '@/components/interactive/WeatherWidget';
import SpotifyWidget from '@/components/interactive/SpotifyWidget';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export default function Footer({ onOpenAdmin }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 bg-slate-950 border-t border-slate-900 pt-16 pb-28 xl:pb-12 text-slate-400 overflow-x-clip">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-12">
          {/* Brand Col */}
          <div className="sm:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-500 p-[1.5px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-white text-base">
                  AM
                </div>
              </div>
              <span className="text-xl font-bold text-white tracking-wide">Alvin MS</span>
            </div>

            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              {PERSONAL_INFO.tagline} Focused on high-reliability distributed systems, Java enterprise architecture, AI platforms, and modern full-stack web applications.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <WeatherWidget />
              <SpotifyWidget />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">Quick Navigation</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#home" className="hover:text-cyan-400 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-cyan-400 transition-colors">About Bio</a></li>
              <li><a href="#ventures" className="hover:text-cyan-400 transition-colors">Ventures</a></li>
              <li><a href="#skills" className="hover:text-cyan-400 transition-colors">Skills Matrix</a></li>
              <li><a href="#projects" className="hover:text-cyan-400 transition-colors">Featured Projects</a></li>
              <li><a href="#services" className="hover:text-cyan-400 transition-colors">Services</a></li>
              <li><a href="#github" className="hover:text-cyan-400 transition-colors">GitHub Sync</a></li>
              <li><a href="#linkedin" className="hover:text-cyan-400 transition-colors">LinkedIn Network</a></li>
              <li><a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials & Status */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-200 font-bold mb-4">Connect</h4>
            <div className="flex flex-wrap items-center gap-2.5 text-lg text-slate-300 mb-6">
              <a href={PERSONAL_INFO.githubUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-cyan-400 hover:border-cyan-500 transition-all"><FaGithub /></a>
              <a href={PERSONAL_INFO.linkedinUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-purple-400 hover:border-purple-500 transition-all"><FaLinkedin /></a>
              <a href={PERSONAL_INFO.instagramUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-pink-400 hover:border-pink-500 transition-all"><FaInstagram /></a>
              <a href={PERSONAL_INFO.discordUrl} target="_blank" rel="noreferrer" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-indigo-400 hover:border-indigo-500 transition-all"><FaDiscord /></a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:text-amber-400 hover:border-amber-500 transition-all"><FaEnvelope /></a>
            </div>

            <div className="text-xs font-mono text-slate-500 space-y-1">
              <div>Location: Kerala, India</div>
              <div>Available for Software Roles & Startups</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            Designed & Engineered by <span className="text-slate-200 font-bold">Alvin MS</span>
          </div>

          <div className="flex items-center gap-4">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
                title="Open Owner Maintenance Console"
              >
                <HiShieldCheck />
                <span>Console</span>
              </button>
            )}
            <span>© 2026 Alvin MS. All Rights Reserved.</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-md flex items-center gap-1.5"
            title="Back to Top"
            aria-label="Back to Top"
          >
            <span>Top</span>
            <HiArrowUp className="text-sm text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
}
