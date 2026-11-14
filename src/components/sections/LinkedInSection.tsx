'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/variants';
import { FaLinkedin, FaShareAlt, FaCheck, FaExternalLinkAlt, FaUserPlus, FaNetworkWired } from 'react-icons/fa';
import { HiSparkles, HiShieldCheck } from 'react-icons/hi';
import LinkedInShareModal, { ShareProjectData } from '@/components/interactive/LinkedInShareModal';
import { PERSONAL_INFO } from '@/data/portfolioData';

export default function LinkedInSection() {
  const [activeShare, setActiveShare] = useState<ShareProjectData | null>(null);

  const handleSharePortfolio = () => {
    setActiveShare({
      title: 'Alvin MS — Production Engineering Portfolio',
      description:
        'Explore Alvin MS\'s software portfolio featuring 50 production-grade repositories across AI, Distributed Systems, Full-Stack SaaS, and Cybersecurity.',
      githubUrl: PERSONAL_INFO.githubUrl,
      liveUrl: 'https://alvinms.vercel.app',
      techStack: ['Java', 'Spring Boot', 'Next.js', 'FastAPI', 'Solidity', 'Docker'],
      category: 'Software Engineering',
    });
  };

  return (
    <section id="linkedin" className="py-20 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="glass-card rounded-3xl p-5 sm:p-8 lg:p-12 border border-[#0077b5]/40 shadow-2xl shadow-[#0077b5]/20 relative overflow-hidden"
        >
          {/* Ambient Corner Glow */}
          <div className="absolute top-0 right-0 w-40 sm:w-60 h-40 sm:h-60 rounded-full bg-[#0077b5]/20 blur-3xl pointer-events-none" />

          <div className="flex flex-col xl:flex-row items-center justify-between gap-8 relative z-10">
            {/* Left Content */}
            <div className="flex flex-col items-center xl:items-start text-center xl:text-left gap-4 w-full max-w-full xl:max-w-2xl">
              <span className="text-[10px] sm:text-xs font-mono tracking-widest text-cyan-400 uppercase bg-[#0077b5]/20 px-3 py-1.5 rounded-full border border-[#0077b5]/40 inline-flex items-center gap-2 max-w-full truncate">
                <FaLinkedin className="text-[#0077b5] text-sm flex-shrink-0" />
                <span className="truncate">Professional Network & Leadership</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                Connect on <span className="text-gradient">LinkedIn</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Connect with <span className="text-white font-bold">Alvin MS</span> on LinkedIn for engineering updates, startup breakthroughs at NEXAURON & HELIX, and project discussions.
              </p>

              <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs font-mono text-slate-300 flex items-center gap-2.5 sm:gap-3 w-full max-w-full overflow-hidden">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
                <span className="text-cyan-300 font-semibold truncate text-[11px] sm:text-xs min-w-0">
                  Headline: Computer Science & AI Student | Java Developer | Full Stack Engineer
                </span>
              </div>
            </div>

            {/* Right Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full xl:w-auto justify-center">
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-2xl bg-[#0077b5] hover:bg-[#006097] text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-[#0077b5]/40 transition-all duration-300 hover:scale-105"
              >
                <FaUserPlus className="text-sm" />
                <span>Follow & Connect</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </a>

              <button
                onClick={handleSharePortfolio}
                className="w-full sm:w-auto px-5 sm:px-6 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 font-semibold text-xs font-mono flex items-center justify-center gap-2 transition-all duration-300 shadow-md"
              >
                <FaShareAlt className="text-cyan-400 text-sm" />
                <span>Share Portfolio</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Modal */}
        <LinkedInShareModal
          isOpen={Boolean(activeShare)}
          onClose={() => setActiveShare(null)}
          project={activeShare}
        />
      </div>
    </section>
  );
}

