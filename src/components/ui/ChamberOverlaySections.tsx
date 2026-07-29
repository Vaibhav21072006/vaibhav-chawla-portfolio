import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCE, CERTIFICATIONS } from '../../data/resumeData';
import { Project } from '../../types/portfolio';
import { Mail, CheckCircle2, Github, Linkedin, ArrowUpRight, Brain, Sparkles, ChevronDown, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChamberOverlaySectionsProps {
  onSelectProject: (project: Project) => void;
}

export const ChamberOverlaySections: React.FC<ChamberOverlaySectionsProps> = ({ onSelectProject }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <div className="relative z-10 w-full pointer-events-none">
      {/* =========================================================================
          CHAMBER I: HERO CHAMBER
         ========================================================================= */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-24 pt-20 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-luxury text-cyan-400 text-xs font-mono mb-6 border border-cyan-500/20">
            <Sparkles className="w-3.5 h-3.5" /> Next-Gen Anti-Gravity AI & Web Architecture
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-white mb-6 font-heading leading-none">
            {PERSONAL_INFO.name}
          </h1>

          <p className="text-lg sm:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed mb-8">
            {PERSONAL_INFO.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleCopyEmail}
              className="px-6 py-3.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 shadow-xl"
            >
              {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Mail className="w-4 h-4" />}
              {copiedEmail ? "Email Copied!" : "Initiate Contact"}
            </button>

            <a
              href="#projects"
              className="px-6 py-3.5 rounded-full glass-panel-luxury text-white font-semibold text-sm hover:border-cyan-400/50 transition-all flex items-center gap-2"
            >
              <Brain className="w-4 h-4 text-cyan-400" /> Explore Floating Pods
            </a>
          </div>
        </motion.div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-xs font-mono text-gray-400 mb-2 uppercase tracking-widest">
            Scroll to Navigate 3D Space
          </p>
          <ChevronDown className="w-5 h-5 mx-auto text-cyan-400 animate-bounce" />
        </div>
      </section>

      {/* =========================================================================
          CHAMBER II: FLOATING PROJECTS CHAMBER
         ========================================================================= */}
      <section id="projects" className="min-h-screen py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 pointer-events-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Chamber II</span>
              <h2 className="text-4xl sm:text-6xl font-bold text-white font-heading mt-2">
                Suspended Innovations.
              </h2>
            </div>
            <p className="text-gray-400 max-w-md text-sm mt-4 md:mt-0 font-mono">
              Floating 3D project pods drifting in zero-gravity space. Click any pod to open its full technical chamber view.
            </p>
          </div>

          {/* Quick Access Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                onClick={() => onSelectProject(project)}
                className="glass-card-3d rounded-3xl p-8 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-cyan-300 border border-white/10">
                      {project.category}
                    </span>
                    <span className={`text-xs font-mono px-2.5 py-0.5 rounded-full ${
                      project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between font-heading">
                    {project.title}
                    <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
                  </h3>

                  <p className="text-xs text-cyan-300/70 font-mono mt-1 mb-4">{project.tagline}</p>
                  <p className="text-sm text-gray-300 leading-relaxed mb-6 line-clamp-2">{project.description}</p>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-white/5 text-xs text-blue-400 font-mono font-medium">
                  <span>Enter Technical Chamber</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAMBER III: COGNITIVE MATRIX (SKILLS)
         ========================================================================= */}
      <section id="skills" className="min-h-screen py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 pointer-events-auto">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Chamber III</span>
            <h2 className="text-4xl sm:text-6xl font-bold text-white font-heading mt-2">
              Cognitive Matrix.
            </h2>
            <p className="text-gray-400 max-w-md text-sm mt-3 font-mono">
              3D Orbital skill telemetry across Machine Learning, Computer Vision, Frontend Architecture, and Spatial AR.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="glass-panel-luxury p-8 rounded-3xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6 font-heading flex items-center gap-2">
                  <Brain className="w-5 h-5 text-cyan-400" /> {cat.category}
                </h3>
                <div className="space-y-5">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs font-medium mb-2">
                        <span className={skill.highlight ? 'text-cyan-300 font-semibold' : 'text-gray-300'}>
                          {skill.name}
                        </span>
                        <span className="text-gray-400 font-mono">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          className={`h-full rounded-full ${
                            skill.highlight
                              ? 'bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500'
                              : 'bg-gray-600'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAMBER IV: CHRONO ARCHITECTURE (EXPERIENCE & CERTIFICATIONS)
         ========================================================================= */}
      <section id="experience" className="min-h-screen py-32 px-6 sm:px-12 md:px-24 border-t border-white/5 pointer-events-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Chamber IV</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading mt-2 mb-8">
              Work History
            </h2>

            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="glass-panel-luxury p-8 rounded-3xl border-l-4 border-l-cyan-400 mb-6">
                <span className="text-xs font-mono text-cyan-400">{exp.period}</span>
                <h3 className="text-xl font-bold text-white font-heading mt-1">{exp.role}</h3>
                <p className="text-sm text-gray-400 mb-4">{exp.company}</p>
                <ul className="space-y-2.5">
                  {exp.highlights.map((h, i) => (
                    <li key={i} className="text-xs text-gray-300 flex items-start gap-2 leading-relaxed">
                      <span className="text-cyan-400 shrink-0 mt-0.5">•</span> {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Academic & Honors</span>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-heading mt-2 mb-8">
              Education & Badges
            </h2>

            <div className="glass-panel-luxury p-8 rounded-3xl mb-8">
              <span className="text-xs font-mono text-cyan-400">{PERSONAL_INFO.education.timeline}</span>
              <h3 className="text-xl font-bold text-white font-heading mt-1">{PERSONAL_INFO.education.degree}</h3>
              <p className="text-sm text-gray-400 mt-1">{PERSONAL_INFO.education.institution}</p>
              <span className="inline-block mt-3 px-3 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-cyan-300 border border-blue-500/20">
                {PERSONAL_INFO.education.status}
              </span>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-mono text-gray-400 uppercase tracking-wider mb-4">
                // Certifications & Recognitions
              </h4>
              {CERTIFICATIONS.map((cert, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl glass-panel-luxury text-xs">
                  <span className="text-gray-200 font-medium">{cert.title}</span>
                  <span className="text-gray-400 font-mono">{cert.issuer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAMBER V: COSMIC TERMINAL (CONTACT)
         ========================================================================= */}
      <footer id="contact" className="py-32 px-6 sm:px-12 md:px-24 border-t border-white/10 text-center relative overflow-hidden pointer-events-auto">
        <div className="max-w-3xl mx-auto">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">// Final Chamber</span>
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white font-heading mt-2 mb-6">
            Initiate Contact.
          </h2>
          <p className="text-gray-300 text-sm sm:text-base mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Open for high-impact AI/ML engineering roles, computer vision research, and creative web architecture collaborations.
          </p>

          <button
            onClick={handleCopyEmail}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm transition-all shadow-2xl shadow-cyan-500/25 inline-flex items-center gap-2.5"
          >
            <Send className="w-4 h-4" /> {copiedEmail ? "Email Copied to Clipboard!" : `Initiate Contact (${PERSONAL_INFO.email})`}
          </button>

          <div className="flex items-center justify-center gap-6 mt-12">
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-gray-400 hover:text-cyan-400 transition-colors text-sm font-mono flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-16 font-mono">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React Three Fiber, Three.js, GSAP & Framer Motion.
          </p>
        </div>
      </footer>
    </div>
  );
};
