import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LaptopExperienceProps {
  children: React.ReactNode;
}

export const LaptopKeynoteExperience: React.FC<LaptopExperienceProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const laptopScreenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      });

      timeline
        .to(laptopScreenRef.current, {
          scale: 1,
          width: '100vw',
          maxWidth: '100vw',
          height: '100vh',
          maxHeight: '100vh',
          borderRadius: '0px',
          borderWidth: '0px',
          boxShadow: 'none',
          ease: 'power2.inOut',
          duration: 2
        })
        .to('.keynote-overlay-text', {
          opacity: 0,
          y: -50,
          duration: 0.8
        }, '<');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-background flex items-center justify-center">
      <div className="absolute inset-0 bg-radial-gradient blur-3xl opacity-30 pointer-events-none" 
           style={{ background: 'radial-gradient(circle at 50% 50%, rgba(59,130,246,0.15), transparent 70%)' }} />

      <div className="keynote-overlay-text absolute top-4 md:top-6 lg:top-8 z-30 text-center pointer-events-none px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-[11px] md:text-xs tracking-widest text-cyan-400 uppercase mb-2 md:mb-3">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen AI & Web Engineering
        </div>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white font-sans leading-tight">
          Designed for Precision. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500">
            Engineered for Intelligence.
          </span>
        </h1>
        <p className="mt-1 md:mt-2 text-xs md:text-sm text-gray-400 max-w-md mx-auto">
          Scroll to unpack the keynote experience.
        </p>
        <ChevronDown className="w-5 h-5 md:w-6 md:h-6 mx-auto mt-2 md:mt-3 text-blue-400 animate-bounce" />
      </div>

      <div
        ref={laptopScreenRef}
        className="relative z-20 w-[95vw] max-w-[1400px] h-[65vw] max-h-[820px] rounded-[24px] border border-white/20 shadow-2xl overflow-hidden bg-black transition-all duration-300 transform-gpu will-change-transform"
        style={{
          boxShadow: '0 25px 80px -15px rgba(0, 0, 0, 0.9), 0 0 50px 0 rgba(59, 130, 246, 0.2)'
        }}
      >
        <div className="relative w-full h-full overflow-y-auto overflow-x-hidden custom-scroll-inside">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none mix-blend-screen"
          >
            <source src="/laptop-animation.mp4" type="video/mp4" />
          </video>

          <div className="relative z-10 w-full min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};