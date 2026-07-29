import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../../types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, ShieldAlert, Cpu } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const accentColor = project.accentColor || '#38bdf8';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop Blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel-luxury rounded-3xl p-5 sm:p-10 border border-white/15 shadow-2xl z-10 my-auto custom-scroll-inside"
          style={{
            boxShadow: `0 25px 80px -15px ${accentColor}35`
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 sm:p-2.5 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors z-20"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Badge & Category */}
          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium uppercase tracking-widest border"
              style={{
                borderColor: `${accentColor}50`,
                backgroundColor: `${accentColor}15`,
                color: accentColor
              }}
            >
              {project.category}
            </span>
            <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full border ${
              project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
            }`}>
              ● {project.status} Chamber
            </span>
          </div>

          {/* Title & Tagline */}
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-heading mb-2">
            {project.title}
          </h2>
          <p className="text-sm sm:text-base text-cyan-300/80 font-mono mb-6">
            {project.tagline}
          </p>

          {/* Description */}
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Key Architectural Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-wider mb-2">
                <ShieldAlert className="w-4 h-4" /> Technical Challenge
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                {project.challenges}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-wider mb-2">
                <Cpu className="w-4 h-4" /> Engineering Solution
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-mono">
                {project.solutions}
              </p>
            </div>
          </div>

          {/* Features List */}
          <div className="mb-8">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
              // Core System Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-200 p-2.5 rounded-xl bg-white/[0.015] border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Chips */}
          <div className="mb-10">
            <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-3">
              // Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono bg-white/5 text-gray-300 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full text-sm font-semibold text-black transition-all flex items-center gap-2 shadow-lg"
                style={{ backgroundColor: accentColor }}
              >
                <ExternalLink className="w-4 h-4" /> Launch Live Demo
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 rounded-full glass-panel-luxury text-sm font-semibold text-white hover:border-cyan-400/50 transition-all flex items-center gap-2"
              >
                <Github className="w-4 h-4" /> Inspect Source Code
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
