'use client';

import { useState, useCallback, useEffect, memo } from 'react';
import dynamic from 'next/dynamic';
import Transition from '@/components/layout/Transition';
import Header from '@/components/layout/Header';
import Nav from '@/components/layout/Nav';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import VenturesSection from '@/components/sections/VenturesSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ServicesSection from '@/components/sections/ServicesSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import GithubSection from '@/components/sections/GithubSection';
import LinkedInSection from '@/components/sections/LinkedInSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

// Code-split non-critical and below-the-fold sections for maximum initial LCP performance
const EducationSection = dynamic(() => import('@/components/sections/EducationSection'), { ssr: true });
const CertificatesSection = dynamic(() => import('@/components/sections/CertificatesSection'), { ssr: true });
const AchievementsSection = dynamic(() => import('@/components/sections/AchievementsSection'), { ssr: true });
const TestimonialsSection = dynamic(() => import('@/components/sections/TestimonialsSection'), { ssr: true });
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'), { ssr: true });

// Code-split interactive tools, modals & background canvas
const ParticlesContainer = dynamic(() => import('@/components/hero/ParticlesContainer'), { ssr: false });
const AIChatbot = dynamic(() => import('@/components/interactive/AIChatbot'), { ssr: false });
const ResumeModal = dynamic(() => import('@/components/interactive/ResumeModal'), { ssr: false });
const CommandPalette = dynamic(() => import('@/components/layout/CommandPalette'), { ssr: false });
const MatrixRain = dynamic(() => import('@/components/interactive/MatrixRain'), { ssr: false });
const AdminDashboardModal = dynamic(() => import('@/components/interactive/AdminDashboardModal'), { ssr: false });
const ScrollProgressBar = dynamic(() => import('@/components/layout/ScrollProgressBar'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/layout/BackToTop'), { ssr: false });
const MobileQuickNav = dynamic(() => import('@/components/layout/MobileQuickNav'), { ssr: false });

function Home() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const handleOpenResume = useCallback(() => setIsResumeModalOpen(true), []);
  const handleCloseResume = useCallback(() => setIsResumeModalOpen(false), []);
  const handleToggleMatrix = useCallback(() => setIsMatrixActive((prev) => !prev), []);
  const handleCloseMatrix = useCallback(() => setIsMatrixActive(false), []);
  const handleOpenCommandPalette = useCallback(() => setIsCommandPaletteOpen(true), []);
  const handleCloseCommandPalette = useCallback(() => setIsCommandPaletteOpen(false), []);
  const handleOpenAdmin = useCallback(() => setIsAdminModalOpen(true), []);
  const handleCloseAdmin = useCallback(() => setIsAdminModalOpen(false), []);

  // Universal Global Keyboard Shortcut Listener for Ctrl+K, Cmd+K, Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Toggle Command Palette on Ctrl+K (Windows/Linux) or Cmd+K (macOS)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      }
      // Escape closes open overlays if active
      if (e.key === 'Escape') {
        if (isResumeModalOpen) setIsResumeModalOpen(false);
        if (isMatrixActive) setIsMatrixActive(false);
        if (isAdminModalOpen) setIsAdminModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isResumeModalOpen, isMatrixActive, isAdminModalOpen]);

  return (
    <main className="relative min-h-screen bg-[#080c14] text-slate-100 overflow-x-hidden selection:bg-emerald-500 selection:text-black">
      {/* Scroll Progress Indicator Bar */}
      <ScrollProgressBar />

      {/* Page Entry Transition Curtains (auto-unmounts after 700ms) */}
      <Transition />

      {/* Lightweight Ambient Particles Canvas */}
      <ParticlesContainer />

      {/* Fixed Header */}
      <Header
        onToggleMatrix={handleToggleMatrix}
        onOpenCommandPalette={handleOpenCommandPalette}
        onOpenAdmin={handleOpenAdmin}
      />

      {/* Desktop Floating Right Dock Navigation */}
      <Nav />

      {/* Main Content Sections */}
      <HeroSection onOpenResumeModal={handleOpenResume} />
      <AboutSection />
      <VenturesSection />
      <SkillsSection />
      <ProjectsSection />
      <ServicesSection />
      <ExperienceSection />
      <EducationSection />
      <CertificatesSection />
      <GithubSection />
      <LinkedInSection />
      <AchievementsSection />
      <TestimonialsSection />
      <BlogSection />
      <ContactSection />

      {/* Footer */}
      <Footer onOpenAdmin={handleOpenAdmin} />

      {/* Mobile Bottom Quick Navigation Bar */}
      <MobileQuickNav
        onOpenResume={handleOpenResume}
        onOpenCommandPalette={handleOpenCommandPalette}
      />

      {/* Back To Top Floating Action */}
      <BackToTop />

      {/* Floating Interactive Assistants & Modals */}
      <AIChatbot />

      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={handleCloseResume}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={handleCloseCommandPalette}
        onOpenResume={handleOpenResume}
        onToggleMatrix={handleToggleMatrix}
        onOpenAdmin={handleOpenAdmin}
      />

      <AdminDashboardModal
        isOpen={isAdminModalOpen}
        onClose={handleCloseAdmin}
      />

      <MatrixRain
        active={isMatrixActive}
        onClose={handleCloseMatrix}
      />
    </main>
  );
}

export default memo(Home);
