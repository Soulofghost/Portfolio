'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaCopy, FaCheck, FaExternalLinkAlt } from 'react-icons/fa';
import { HiX, HiSparkles } from 'react-icons/hi';

export interface ShareProjectData {
  title: string;
  description: string;
  githubUrl: string;
  liveUrl?: string;
  techStack?: string[];
  category?: string;
}

interface LinkedInShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ShareProjectData | null;
}

export default function LinkedInShareModal({ isOpen, onClose, project }: LinkedInShareModalProps) {
  const [postText, setPostText] = useState('');
  const [copied, setCopied] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;

    const stackHashtags = (project.techStack || [])
      .slice(0, 4)
      .map((t) => `#${t.replace(/[^a-zA-Z0-9]/g, '')}`)
      .join(' ');

    const defaultDraft = `🚀 Excited to share my latest engineering project: **${project.title}**!

${project.description}

🛠️ Technical Stack: ${(project.techStack || ['Full Stack', 'Modern Architecture']).join(', ')}

📂 GitHub Repository: ${project.githubUrl}
${project.liveUrl && project.liveUrl !== project.githubUrl ? `🌐 Live Demo: ${project.liveUrl}\n` : ''}
Building scalable, production-oriented software with clean architectures and automated testing. Would love to hear your feedback and thoughts!

#SoftwareEngineering #AlvinMS #WebDevelopment #OpenSource #TechInnovation ${stackHashtags}`;

    setPostText(defaultDraft);
    setCopied(false);
    setStatusMsg(null);
  }, [project]);

  if (!isOpen || !project) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setStatusMsg('Unable to copy automatically. Please copy text manually.');
    }
  };

  const handleOpenLinkedInShare = async () => {
    // 1. Copy text to clipboard so the user can easily paste if LinkedIn Web Share doesn't prefill text
    try {
      await navigator.clipboard.writeText(postText);
      setCopied(true);
    } catch {
      // ignore
    }

    // 2. Open LinkedIn feed share intent
    const shareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(postText)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleApiPublish = async () => {
    setIsSubmitting(true);
    setStatusMsg(null);
    try {
      const res = await fetch('/api/linkedin/share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: project.title,
          text: postText,
          url: project.liveUrl || project.githubUrl,
        }),
      });

      const data = await res.json();
      if (data.success && data.postUrn) {
        setStatusMsg('Successfully published directly via official LinkedIn API!');
      } else if (data.webShareUrl) {
        window.open(data.webShareUrl, '_blank', 'noopener,noreferrer');
        setStatusMsg('Opened LinkedIn share dialog with copied post draft.');
      } else {
        setStatusMsg(data.error || 'Opening manual share...');
        handleOpenLinkedInShare();
      }
    } catch {
      handleOpenLinkedInShare();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-xl bg-slate-900 border border-purple-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-purple-950/60 max-h-[92vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-[#0077b5]/20 text-[#0077b5] text-xl border border-[#0077b5]/40">
                <FaLinkedin />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Project Announcement</span>
                <h3 className="text-lg font-bold text-white">Share on LinkedIn</h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <p className="text-xs text-slate-300 mb-3">
            Review and refine your LinkedIn post announcement for <span className="font-bold text-white">{project.title}</span>:
          </p>

          {/* Editable Post Draft Textarea */}
          <div className="relative mb-4">
            <textarea
              rows={9}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full rounded-xl bg-slate-950/90 border border-slate-800 p-3.5 text-xs text-slate-200 font-sans focus:outline-none focus:border-cyan-400/60 resize-none leading-relaxed"
            />
            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500">
              {postText.length} characters
            </div>
          </div>

          {statusMsg && (
            <div className="mb-4 p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              {statusMsg}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleCopy}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-mono text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Post Text'}</span>
            </button>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleOpenLinkedInShare}
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0077b5] to-cyan-500 hover:from-[#006097] hover:to-cyan-400 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#0077b5]/30 transition-all"
              >
                <FaLinkedin className="text-sm" />
                <span>Share to LinkedIn</span>
                <FaExternalLinkAlt className="text-[10px]" />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center gap-1.5 justify-center">
            <HiSparkles className="text-cyan-400" />
            <span>Copies formatted text to clipboard and opens LinkedIn share dialog with all project metadata.</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

