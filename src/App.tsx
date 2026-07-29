import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { motion, useScroll, useSpring } from 'framer-motion';
import { AntiGravityCanvas } from './components/canvas/AntiGravityCanvas';
import { MagneticCursor } from './components/ui/MagneticCursor';
import { CinematicNavbar } from './components/ui/CinematicNavbar';
import { ProjectDetailModal } from './components/ui/ProjectDetailModal';
import { ChamberOverlaySections } from './components/ui/ChamberOverlaySections';
import { Project } from './types/portfolio';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentChamber, setCurrentChamber] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? window.scrollY / totalHeight : 0;
      setScrollProgress(progress);

      // Determine active chamber (0 to 4) based on scroll progress
      if (progress < 0.2) setCurrentChamber(0);
      else if (progress < 0.45) setCurrentChamber(1);
      else if (progress < 0.65) setCurrentChamber(2);
      else if (progress < 0.85) setCurrentChamber(3);
      else setCurrentChamber(4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030712] text-gray-100 selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden">
      {/* Top HUD Progress Line */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 z-50 transform-origin-left"
        style={{ scaleX }}
      />

      {/* Physics Inertia Magnetic Cursor */}
      <MagneticCursor />

      {/* Futuristic HUD Navbar */}
      <CinematicNavbar currentChamber={currentChamber} />

      {/* Background WebGL Anti-Gravity 3D Canvas */}
      <AntiGravityCanvas
        scrollProgress={scrollProgress}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Content Chamber HTML Overlays */}
      <ChamberOverlaySections
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Zero-G Technical Chamber Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}