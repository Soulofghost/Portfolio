'use client';

import { useState, useMemo, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { fadeIn } from '@/utils/variants';
import { PROJECTS, Project } from '@/data/portfolioData';
import { FaGithub, FaExternalLinkAlt, FaLinkedin, FaStar, FaShieldAlt } from 'react-icons/fa';
import {
  HiCheckCircle,
  HiX,
  HiSparkles,
  HiArrowRight,
  HiOutlineCube,
  HiLightningBolt,
  HiChip,
} from 'react-icons/hi';
import LinkedInShareModal, { ShareProjectData } from '@/components/interactive/LinkedInShareModal';

const CATEGORIES = [
  'All',
  'Flagship Systems',
  'AI & Systems Platform',
  'Full Stack / React',
  'Java / Backend',
  'Blockchain & FinTech',
  'Cybersecurity',
];

function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeShareProject, setActiveShareProject] = useState<ShareProjectData | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    if (selectedCategory === 'Flagship Systems') return PROJECTS.filter((p) => p.isFlagship);
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="projects" className="py-24 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 max-w-7xl">
        {/* Section Heading */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase bg-slate-900/90 px-3.5 py-1.5 rounded-full border border-cyan-500/30 inline-flex items-center gap-2 shadow-lg shadow-cyan-950/40">
            <HiSparkles className="text-cyan-400" />
            <span>Production Engineering Portfolio</span>
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 tracking-tight">
            Featured <span className="text-gradient">Projects & Platforms</span>
          </h2>
          <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed mt-4">
            Production-grade systems designed with strict architectural separation, verified algorithms, automated test suites, and zero vanity mockups.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-pink-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-14">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 border border-purple-400/50 scale-105'
                  : 'bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            const isSentrix = project.id === 'sentrix-platform';

            return (
              <motion.div
                key={project.id}
                variants={fadeIn('up', 0.15 + (index % 3) * 0.1)}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className={`group glass-card glass-card-hover rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                  isSentrix
                    ? 'border-cyan-500/60 shadow-2xl shadow-cyan-950/60 hover:border-cyan-400'
                    : project.isFlagship
                    ? 'border-purple-500/40 hover:border-purple-400/60'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header Banner */}
                <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-950 p-4 sm:p-6 flex flex-col justify-between">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      isSentrix
                        ? 'from-cyan-950/70 via-slate-950 to-purple-950/60'
                        : 'from-purple-950/50 via-slate-950 to-slate-900'
                    }`}
                  />

                  {/* Corner Badges */}
                  <div className="relative z-10 flex items-center justify-between w-full">
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-950/80 border border-cyan-500/40 text-cyan-300 backdrop-blur-md">
                      {project.category}
                    </span>

                    {project.isFlagship && (
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center gap-1 backdrop-blur-md shadow-sm">
                        <FaStar className="text-[9px]" />
                        <span>Flagship</span>
                      </span>
                    )}
                  </div>

                  {/* Hero Graphic / Badge */}
                  <div className="relative z-10 flex flex-col gap-1">
                    {isSentrix && (
                      <span className="text-[10px] font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                        <FaShieldAlt />
                        <span>Civil Defense • SEM Engine</span>
                      </span>
                    )}
                    <h3 className="font-extrabold text-white text-lg tracking-wide group-hover:text-cyan-300 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-slate-300 text-xs line-clamp-3 leading-relaxed mb-4">
                      {project.description}
                    </p>

                    {/* SEM Highlight for SENTRIX */}
                    {isSentrix && (
                      <div className="mb-4 p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] font-mono text-cyan-200">
                        <div className="font-bold text-cyan-300 flex items-center gap-1 mb-1">
                          <HiLightningBolt />
                          <span>SEM Automated Algorithms:</span>
                        </div>
                        <div>Peak Ground Acceleration ($g$) • Haversine Geodesic Dispatch</div>
                      </div>
                    )}

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900/90 text-slate-300 border border-slate-800"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 5 && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-900 text-slate-500">
                          +{project.techStack.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setActiveModalTab('overview');
                        setActiveModalProject(project);
                      }}
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 group/btn"
                    >
                      <span>Case Study</span>
                      <HiArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          setActiveShareProject({
                            title: project.title,
                            description: project.description,
                            githubUrl: project.githubUrl,
                            liveUrl: project.liveUrl,
                            techStack: project.techStack,
                            category: project.category,
                          })
                        }
                        className="p-2 rounded-lg bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#0077b5] hover:text-white border border-[#0077b5]/40 transition-colors"
                        title="Share on LinkedIn"
                        aria-label="Share project on LinkedIn"
                      >
                        <FaLinkedin className="text-xs" />
                      </button>

                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
                        title="View GitHub Repository"
                        aria-label="View repository on GitHub"
                      >
                        <FaGithub className="text-xs" />
                      </a>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-purple-900/40 hover:bg-purple-900/80 text-purple-300 hover:text-white border border-purple-500/40 transition-colors"
                          title="View Live / Code"
                          aria-label="View live deployment or code"
                        >
                          <FaExternalLinkAlt className="text-[10px]" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Case Study Deep Dive Modal */}
        <AnimatePresence>
          {activeModalProject && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
              onClick={() => setActiveModalProject(null)}
            >
              <motion.div
                initial={{ scale: 0.94, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.94, opacity: 0, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-3xl bg-slate-900 border border-purple-500/40 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl shadow-purple-950/60 max-h-[90vh] overflow-y-auto"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-slate-800 pb-5 mb-5">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300">
                        {activeModalProject.category}
                      </span>
                      {activeModalProject.isFlagship && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                          <FaStar className="text-[9px]" />
                          <span>Flagship Software</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                      {activeModalProject.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                  >
                    <HiX className="text-xl" />
                  </button>
                </div>

                {/* Modal Navigation Tabs */}
                <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6">
                  <button
                    onClick={() => setActiveModalTab('overview')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      activeModalTab === 'overview'
                        ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Overview & Solution
                  </button>
                  {activeModalProject.semDetails && (
                    <button
                      onClick={() => setActiveModalTab('architecture')}
                      className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                        activeModalTab === 'architecture'
                          ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/50'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <HiLightningBolt />
                      <span>SEM Engine Architecture</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveModalTab('features')}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors ${
                      activeModalTab === 'features'
                        ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Core Capabilities
                  </button>
                </div>

                {/* Tab Content */}
                {activeModalTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">Executive Summary</h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {activeModalProject.fullDescription}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-red-500/20">
                        <span className="text-[11px] font-mono uppercase text-red-400 font-bold block mb-1">
                          The Problem
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {activeModalProject.problemStatement}
                        </p>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-500/20">
                        <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold block mb-1">
                          The Engineering Solution
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {activeModalProject.solution}
                        </p>
                      </div>
                    </div>

                    {activeModalProject.architectureOverview && (
                      <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-500/20">
                        <span className="text-[11px] font-mono uppercase text-purple-400 font-bold block mb-1">
                          System Architecture Overview
                        </span>
                        <p className="text-slate-300 text-xs leading-relaxed">
                          {activeModalProject.architectureOverview}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {activeModalTab === 'architecture' && activeModalProject.semDetails && (
                  <div className="space-y-5">
                    <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/40">
                      <h4 className="text-sm font-bold text-cyan-300 mb-2 flex items-center gap-2">
                        <HiChip className="text-lg" />
                        <span>{activeModalProject.semDetails.moduleName}</span>
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        Structural & Environmental Monitoring coordinates real-time vibration analytics and geodesic algorithms during major seismic or hydrological crises.
                      </p>

                      <div className="space-y-3 font-mono text-xs text-slate-200">
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-purple-400 font-bold block mb-1">1. Seismic Peak Ground Acceleration (PGA):</span>
                          <span>{activeModalProject.semDetails.pgaRating}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-cyan-400 font-bold block mb-1">2. Geodesic Emergency Routing:</span>
                          <span>{activeModalProject.semDetails.geoRouting}</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                          <span className="text-red-400 font-bold block mb-1">3. Automated Civil Broadcast:</span>
                          <span>{activeModalProject.semDetails.alertSystem}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === 'features' && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4">Production Capabilities</h4>
                    <ul className="space-y-3 mb-6">
                      {activeModalProject.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-slate-200 p-2.5 rounded-xl bg-slate-950/50 border border-slate-800/80">
                          <HiCheckCircle className="text-emerald-400 text-lg flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tech Stack Pills */}
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                    Verified Technology Stack:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-slate-950 text-cyan-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-6 mt-6 border-t border-slate-800">
                  <button
                    onClick={() => {
                      const proj = activeModalProject;
                      setActiveModalProject(null);
                      setActiveShareProject({
                        title: proj.title,
                        description: proj.description,
                        githubUrl: proj.githubUrl,
                        liveUrl: proj.liveUrl,
                        techStack: proj.techStack,
                        category: proj.category,
                      });
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#0077b5]/20 hover:bg-[#0077b5]/40 text-[#0077b5] hover:text-white border border-[#0077b5]/40 font-mono text-xs flex items-center gap-2 transition-colors"
                  >
                    <FaLinkedin />
                    <span>Share on LinkedIn</span>
                  </button>

                  <div className="flex items-center gap-3">
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-2 transition-colors"
                    >
                      <FaGithub />
                      <span>View GitHub Repo</span>
                    </a>

                    {activeModalProject.liveUrl && (
                      <a
                        href={activeModalProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono font-semibold text-xs flex items-center gap-2 shadow-lg shadow-purple-600/30 transition-all"
                      >
                        <FaExternalLinkAlt className="text-xs" />
                        <span>Live / Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* LinkedIn Share Modal Component */}
        <LinkedInShareModal
          isOpen={Boolean(activeShareProject)}
          onClose={() => setActiveShareProject(null)}
          project={activeShareProject}
        />
      </div>
    </section>
  );
}

export default memo(ProjectsSection);
