import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { LaptopKeynoteExperience } from './components/LaptopKeynoteExperience';
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCE, CERTIFICATIONS } from './data/resumeData';
import { 
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight, 
  Code2, Brain, Send, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.8 } });
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-gray-100 selection:bg-blue-500/30 selection:text-blue-200">
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 z-50 transform-origin-left"
        style={{ scaleX }}
      />

      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-40 px-6 py-3 rounded-full glass-panel border border-white/10 flex items-center gap-8 shadow-2xl backdrop-blur-xl">
        <a href="#hero" className="text-xs font-semibold tracking-wider uppercase hover:text-blue-400 transition-colors">Intro</a>
        <a href="#projects" className="text-xs font-semibold tracking-wider uppercase hover:text-blue-400 transition-colors">Projects</a>
        <a href="#skills" className="text-xs font-semibold tracking-wider uppercase hover:text-blue-400 transition-colors">Skills</a>
        <a href="#experience" className="text-xs font-semibold tracking-wider uppercase hover:text-blue-400 transition-colors">Experience</a>
        <a href="#contact" className="text-xs font-semibold tracking-wider uppercase text-blue-400 hover:text-blue-300 transition-colors">Contact</a>
      </nav>

      <LaptopKeynoteExperience>
        <section id="hero" className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
              <Brain className="w-3.5 h-3.5" /> Specializing in AIML & Creative Web Architecture
            </div>

            <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight text-white mb-6 leading-none">
              {PERSONAL_INFO.name}
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl leading-relaxed mb-8">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-gray-200 transition-all flex items-center gap-2 shadow-lg"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <Mail className="w-4 h-4" />}
                {copiedEmail ? "Email Copied!" : "Get In Touch"}
              </button>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full glass-card hover:border-blue-500/50 transition-all text-gray-300 hover:text-white"
              >
                <Github className="w-5 h-5" />
              </a>

              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full glass-card hover:border-blue-500/50 transition-all text-gray-300 hover:text-white"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-24 px-6 md:px-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Featured Work</span>
                <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Engineered Systems.</h2>
              </div>
              <p className="text-gray-400 max-w-md text-sm mt-4 md:mt-0">
                A selection of applied machine learning pipelines, spatial visualizers, and intelligent web applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PROJECTS.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  onClick={() => {
                    const targetUrl = project.liveUrl || project.githubUrl;
                    if (targetUrl) {
                      window.open(targetUrl, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="glass-card rounded-3xl p-8 flex flex-col justify-between relative group hover:border-blue-500/40 cursor-pointer"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-mono bg-white/5 text-blue-300 border border-white/10">
                        {project.category}
                      </span>
                      <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        project.status === 'Live' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
                    </h3>

                    <p className="text-xs text-gray-400 font-mono mt-1 mb-4">{project.tagline}</p>
                    <p className="text-sm text-gray-300 leading-relaxed mb-6">{project.description}</p>

                    <div className="space-y-3 mb-6 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <p className="text-xs font-mono text-gray-400"><strong className="text-blue-400">Challenge:</strong> {project.challenges}</p>
                      <p className="text-xs font-mono text-gray-400"><strong className="text-cyan-400">Solution:</strong> {project.solutions}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techStack.map(tech => (
                        <span key={tech} className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-blue-400 transition-colors z-10"
                      >
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors z-10"
                      >
                        <Github className="w-3.5 h-3.5" /> Source Code
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="py-24 px-6 md:px-16 border-t border-white/5 bg-black/40">
          <div className="max-w-6xl mx-auto">
            <div className="mb-16">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Technical Capabilities</span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-2">Skills & Toolkit.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category} className="glass-panel p-8 rounded-3xl border border-white/5">
                  <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-blue-400" /> {cat.category}
                  </h3>
                  <div className="space-y-5">
                    {cat.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between text-xs font-medium mb-2">
                          <span className={skill.highlight ? 'text-blue-300 font-semibold' : 'text-gray-300'}>
                            {skill.name}
                          </span>
                          <span className="text-gray-500 font-mono">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className={`h-full rounded-full ${
                              skill.highlight 
                                ? 'bg-gradient-to-r from-blue-500 to-cyan-400' 
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

        <section id="experience" className="py-24 px-6 md:px-16 border-t border-white/5">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Track Record</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-8">Experience</h2>

              {EXPERIENCE.map((exp, idx) => (
                <div key={idx} className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500 mb-6">
                  <span className="text-xs font-mono text-blue-400">{exp.period}</span>
                  <h3 className="text-lg font-bold text-white mt-1">{exp.role}</h3>
                  <p className="text-sm text-gray-400 mb-4">{exp.company}</p>
                  <ul className="space-y-2">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">•</span> {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">// Background</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-8">Education & Certifications</h2>

              <div className="glass-card p-6 rounded-2xl mb-8">
                <span className="text-xs font-mono text-cyan-400">{PERSONAL_INFO.education.timeline}</span>
                <h3 className="text-lg font-bold text-white mt-1">{PERSONAL_INFO.education.degree}</h3>
                <p className="text-sm text-gray-400">{PERSONAL_INFO.education.institution}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Certifications & Honors</h4>
                {CERTIFICATIONS.map((cert, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl glass-panel text-xs">
                    <span className="text-gray-200 font-medium">{cert.title}</span>
                    <span className="text-gray-500 font-mono">{cert.issuer}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer id="contact" className="py-20 px-6 border-t border-white/10 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">Let’s Build the Future.</h2>
            <p className="text-gray-400 text-sm mb-8">
              Open to high-impact AI/ML engineering positions and innovative creative web projects.
            </p>
            <button
              onClick={handleCopyEmail}
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-xl shadow-blue-500/20 inline-flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Initiate Contact ({PERSONAL_INFO.email})
            </button>
            <p className="text-xs text-gray-600 mt-12 font-mono">
              © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React, Vite, Tailwind CSS & GSAP.
            </p>
          </div>
        </footer>
      </LaptopKeynoteExperience>
    </div>
  );
}