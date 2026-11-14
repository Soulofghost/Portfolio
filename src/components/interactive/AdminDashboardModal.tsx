'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiX,
  HiShieldCheck,
  HiRefresh,
  HiCheckCircle,
  HiLockClosed,
  HiLightningBolt,
  HiCode,
  HiKey,
} from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaCopy, FaCheck } from 'react-icons/fa';
import { PROJECTS, Project } from '@/data/portfolioData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminDashboardModal({ isOpen, onClose }: AdminDashboardModalProps) {
  const [pin, setPin] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(false);

  const [activeTab, setActiveTab] = useState<'github' | 'linkedin' | 'projects'>('github');
  const [githubSyncData, setGithubSyncData] = useState<any>(null);
  const [syncing, setSyncing] = useState(false);
  const [linkedinStatus, setLinkedinStatus] = useState<any>(null);

  const [selectedProjectForAnnouncement, setSelectedProjectForAnnouncement] = useState<string>(PROJECTS[0]?.id || '');
  const [announcementText, setAnnouncementText] = useState('');
  const [copied, setCopied] = useState(false);

  // Authenticate PIN
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pin for Alvin MS
    if (pin === 'alvin2026' || pin === 'Soulofghost' || pin === '2026') {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleSyncGithub = async () => {
    setSyncing(true);
    try {
      const res = await fetch('/api/github/repos?refresh=true');
      const data = await res.json();
      setGithubSyncData(data);
    } catch (err) {
      console.error('Failed to sync:', err);
    } finally {
      setSyncing(false);
    }
  };

  const fetchLinkedinStatus = async () => {
    try {
      const res = await fetch('/api/linkedin/status');
      const data = await res.json();
      setLinkedinStatus(data);
    } catch (err) {
      console.error('Failed to fetch LinkedIn status:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      handleSyncGithub();
      fetchLinkedinStatus();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const proj = PROJECTS.find((p) => p.id === selectedProjectForAnnouncement);
    if (proj) {
      const text = `🚀 Proud to present: ${proj.title}!

${proj.description}

Key Engineering Stack: ${proj.techStack.join(', ')}

📂 Repository: ${proj.githubUrl}
${proj.liveUrl ? `🌐 Live Demo: ${proj.liveUrl}\n` : ''}
Engineered to production standards with automated test suites and clean architecture.

#SoftwareEngineering #AlvinMS #TechInnovation #OpenSource`;
      setAnnouncementText(text);
    }
  }, [selectedProjectForAnnouncement]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-3xl bg-slate-900 border border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/70 max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-purple-900/30 text-purple-400 border border-purple-500/30">
                <HiShieldCheck className="text-xl" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Restricted Access</span>
                <h3 className="text-xl font-bold text-white">Automation & Maintenance Console</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* PIN Gate */
            <form onSubmit={handleLogin} className="py-8 max-w-sm mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-cyan-400 flex items-center justify-center mx-auto text-2xl border border-slate-700">
                <HiLockClosed />
              </div>
              <h4 className="text-base font-bold text-white">Owner Authorization Required</h4>
              <p className="text-xs text-slate-400 font-mono">
                Enter your administrative PIN to access synchronization triggers and management controls.
              </p>
              <div>
                <input
                  type="password"
                  placeholder="Enter Security PIN..."
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setAuthError(false);
                  }}
                  autoFocus
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-950 border border-slate-700 text-center text-sm font-mono text-white tracking-widest focus:outline-none focus:border-cyan-400"
                />
                {authError && (
                  <p className="text-[11px] font-mono text-red-400 mt-2">
                    Invalid PIN. Please check authorization credentials.
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-mono font-semibold text-xs shadow-lg shadow-purple-600/30"
              >
                Authenticate & Unlock
              </button>
            </form>
          ) : (
            /* Authenticated Admin Dashboard */
            <div>
              {/* Tab Navigation */}
              <div className="flex gap-2 border-b border-slate-800 pb-3 mb-6">
                <button
                  onClick={() => setActiveTab('github')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'github'
                      ? 'bg-purple-600/30 text-purple-300 border border-purple-500/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FaGithub />
                  <span>GitHub Synchronization</span>
                </button>
                <button
                  onClick={() => setActiveTab('linkedin')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'linkedin'
                      ? 'bg-[#0077b5]/30 text-cyan-300 border border-[#0077b5]/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FaLinkedin />
                  <span>LinkedIn Hub</span>
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-colors flex items-center gap-2 ${
                    activeTab === 'projects'
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <HiCode />
                  <span>Featured Projects</span>
                </button>
              </div>

              {/* GitHub Synchronization Tab */}
              {activeTab === 'github' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Automatic Repository Sync Engine</span>
                        <span className="text-xs font-mono text-emerald-400">● Active</span>
                      </div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Endpoint: https://api.github.com/users/Soulofghost/repos
                      </div>
                    </div>
                    <button
                      onClick={handleSyncGithub}
                      disabled={syncing}
                      className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      <HiRefresh className={syncing ? 'animate-spin' : ''} />
                      <span>{syncing ? 'Syncing...' : 'Force Sync Now'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Total Repos Synced</span>
                      <span className="text-xl font-bold text-white">{githubSyncData?.totalCount || '42+'}</span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Rate Limit Left</span>
                      <span className="text-xl font-bold text-cyan-400">
                        {githubSyncData?.rateLimitRemaining ?? '5000 (Auth)'}
                      </span>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800">
                      <span className="text-slate-400 block mb-1">Cache Timestamp</span>
                      <span className="text-xs text-purple-300 truncate block">
                        {githubSyncData?.cachedAt ? new Date(githubSyncData.cachedAt).toLocaleTimeString() : 'Fresh'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* LinkedIn Hub Tab */}
              {activeTab === 'linkedin' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-white">LinkedIn Integration Status</div>
                      <div className="text-xs font-mono text-slate-400 mt-1">
                        Mode: <span className="text-cyan-400">{linkedinStatus?.mode || '1-Click Web Share Intent'}</span>
                      </div>
                    </div>
                    <a
                      href="/api/linkedin/auth"
                      className="px-4 py-2 rounded-xl bg-[#0077b5] hover:bg-[#006097] text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <HiKey />
                      <span>Authorize OAuth</span>
                    </a>
                  </div>

                  {/* Announcement Generator */}
                  <div>
                    <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Generate Project Announcement</h4>
                    <select
                      value={selectedProjectForAnnouncement}
                      onChange={(e) => setSelectedProjectForAnnouncement(e.target.value)}
                      className="w-full py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-white mb-3"
                    >
                      {PROJECTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title}
                        </option>
                      ))}
                    </select>

                    <textarea
                      rows={6}
                      value={announcementText}
                      onChange={(e) => setAnnouncementText(e.target.value)}
                      className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none"
                    />

                    <div className="flex justify-end mt-2">
                      <button
                        onClick={async () => {
                          await navigator.clipboard.writeText(announcementText);
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2500);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs flex items-center gap-2"
                      >
                        {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                        <span>{copied ? 'Copied!' : 'Copy Announcement'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Management Tab */}
              {activeTab === 'projects' && (
                <div className="space-y-4">
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    Verified Featured Projects in Portfolio Data:
                  </div>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                    {PROJECTS.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
                      >
                        <div>
                          <div className="text-white font-bold">{p.title}</div>
                          <div className="text-slate-500">{p.category}</div>
                        </div>
                        <span className="px-2.5 py-1 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                          {p.isFlagship ? '⭐ Flagship' : 'Featured'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
