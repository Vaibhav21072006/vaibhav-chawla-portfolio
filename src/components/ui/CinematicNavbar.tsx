import { PERSONAL_INFO } from '../../data/resumeData';
import { Github, Linkedin } from 'lucide-react';

interface CinematicNavbarProps {
  currentChamber: number;
}

export const CinematicNavbar: React.FC<CinematicNavbarProps> = ({ currentChamber }) => {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-6 py-4 flex items-center justify-between pointer-events-none">
        {/* Brand HUD Logo */}
        <div className="pointer-events-auto flex items-center gap-2.5 glass-panel-luxury px-3.5 sm:px-4 py-2 rounded-full border border-white/10">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_#38bdf8]" />
          <span className="text-xs sm:text-sm font-bold tracking-wider sm:tracking-widest text-white uppercase font-heading">
            {PERSONAL_INFO.name}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-cyan-300 font-mono hidden sm:inline">
            Zero-G Build
          </span>
        </div>

        {/* Floating Desktop Chamber Navigation */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-6 glass-panel-luxury px-6 py-2.5 rounded-full border border-white/10 shadow-2xl">
          <a href="#hero" className={`text-xs font-mono uppercase tracking-wider transition-colors ${currentChamber === 0 ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'}`}>
            01 // Intro
          </a>
          <a href="#projects" className={`text-xs font-mono uppercase tracking-wider transition-colors ${currentChamber === 1 ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'}`}>
            02 // Pods
          </a>
          <a href="#skills" className={`text-xs font-mono uppercase tracking-wider transition-colors ${currentChamber === 2 ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'}`}>
            03 // Matrix
          </a>
          <a href="#experience" className={`text-xs font-mono uppercase tracking-wider transition-colors ${currentChamber === 3 ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'}`}>
            04 // Chrono
          </a>
          <a href="#contact" className={`text-xs font-mono uppercase tracking-wider transition-colors ${currentChamber === 4 ? 'text-cyan-400 font-semibold' : 'text-gray-400 hover:text-white'}`}>
            05 // Contact
          </a>
        </nav>

        {/* Social Actions */}
        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noreferrer"
            className="p-2 sm:p-2.5 rounded-full glass-panel-luxury text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-2 sm:p-2.5 rounded-full glass-panel-luxury text-gray-300 hover:text-cyan-400 hover:border-cyan-400/40 transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Floating Mobile Bottom Navigation HUD */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex md:hidden items-center gap-3 px-4 py-2 rounded-full glass-panel-luxury border border-white/15 shadow-2xl backdrop-blur-2xl">
        <a href="#hero" className={`text-[11px] font-mono transition-colors ${currentChamber === 0 ? 'text-cyan-400 font-bold' : 'text-gray-400'}`}>01</a>
        <span className="text-gray-700 text-xs">•</span>
        <a href="#projects" className={`text-[11px] font-mono transition-colors ${currentChamber === 1 ? 'text-cyan-400 font-bold' : 'text-gray-400'}`}>02 Pods</a>
        <span className="text-gray-700 text-xs">•</span>
        <a href="#skills" className={`text-[11px] font-mono transition-colors ${currentChamber === 2 ? 'text-cyan-400 font-bold' : 'text-gray-400'}`}>03 Skills</a>
        <span className="text-gray-700 text-xs">•</span>
        <a href="#experience" className={`text-[11px] font-mono transition-colors ${currentChamber === 3 ? 'text-cyan-400 font-bold' : 'text-gray-400'}`}>04 History</a>
        <span className="text-gray-700 text-xs">•</span>
        <a href="#contact" className={`text-[11px] font-mono transition-colors ${currentChamber === 4 ? 'text-cyan-400 font-bold' : 'text-gray-400'}`}>05 Contact</a>
      </div>
    </>
  );
};
