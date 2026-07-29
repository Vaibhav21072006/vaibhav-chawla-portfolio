import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Preload, Stars } from '@react-three/drei';
import { HeroChamber } from './HeroChamber';
import { FloatingProjectPod } from './FloatingProjectPod';
import { SkillMatrix3D } from './SkillMatrix3D';
import { CinematicCameraController } from './CinematicCameraController';
import { PROJECTS } from '../../data/resumeData';
import { Project } from '../../types/portfolio';

interface AntiGravityCanvasProps {
  scrollProgress: number;
  onSelectProject: (project: Project) => void;
}

export const AntiGravityCanvas: React.FC<AntiGravityCanvasProps> = ({ scrollProgress, onSelectProject }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-auto z-0 bg-[#030712]">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 10.5 : 8], fov: isMobile ? 55 : 50 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#030712']} />
        <fogExp2 attach="fog" args={['#030712', isMobile ? 0.028 : 0.022]} />

        {/* Ambient & Volumetric Sci-Fi Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 15]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[10, 10, -25]} intensity={1.5} color="#c084fc" />
        <pointLight position={[0, -5, -35]} intensity={1.8} color="#3b82f6" />

        <Suspense fallback={null}>
          {/* Deep Space Background Stars */}
          <Stars radius={100} depth={50} count={isMobile ? 1200 : 3000} factor={4} saturation={0} fade speed={1} />

          {/* Camera Controller */}
          <CinematicCameraController scrollProgress={scrollProgress} />

          {/* Chamber I: Hero Scene */}
          <HeroChamber />

          {/* Chamber II: Levitating Floating Project Pods */}
          <group position={[0, 0, 0]}>
            {PROJECTS.map((project) => (
              <FloatingProjectPod
                key={project.id}
                project={project}
                onSelect={onSelectProject}
              />
            ))}
          </group>

          {/* Chamber III: 3D Orbital Skill Matrix */}
          <SkillMatrix3D />

          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
};
