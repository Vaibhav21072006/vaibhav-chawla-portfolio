import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html, MeshTransmissionMaterial, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '../../types/portfolio';
import { ArrowRight } from 'lucide-react';

interface FloatingProjectPodProps {
  project: Project;
  onSelect: (project: Project) => void;
}

export const FloatingProjectPod: React.FC<FloatingProjectPodProps> = ({ project, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const rawPosition = project.position3D || [0, 0, 0];
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const position: [number, number, number] = [
    isMobile ? rawPosition[0] * 0.45 : rawPosition[0],
    isMobile ? rawPosition[1] * 0.7 : rawPosition[1],
    rawPosition[2]
  ];
  const accentColor = project.accentColor || '#3b82f6';

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    const speedMultiplier = hovered ? 0.3 : 1;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4 * speedMultiplier;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.8 * speedMultiplier;
      innerCoreRef.current.rotation.z += delta * 0.6 * speedMultiplier;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.5 * speedMultiplier;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.6}
      floatIntensity={1.2}
      position={position as [number, number, number]}
    >
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(project);
        }}
      >
        {/* Outer Anti-Gravity Levitating Glass Shell */}
        <mesh ref={meshRef} scale={hovered ? 1.4 : 1.2}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshTransmissionMaterial
            backside
            samples={6}
            resolution={256}
            transmission={0.88}
            roughness={hovered ? 0.05 : 0.15}
            thickness={0.6}
            ior={1.35}
            chromaticAberration={hovered ? 0.12 : 0.04}
            color={hovered ? accentColor : '#ffffff'}
          />
        </mesh>

        {/* Inner Rotating Energy Core */}
        <mesh ref={innerCoreRef} scale={hovered ? 0.7 : 0.55}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
            roughness={0.2}
            metalness={0.8}
            wireframe={!hovered}
          />
        </mesh>

        {/* Levitating Perimeter Energy Ring */}
        <group ref={ringRef}>
          <Torus args={[1.75, 0.018, 16, 64]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={hovered ? 0.9 : 0.4}
            />
          </Torus>
        </group>

        {/* Floating 3D HUD Tag Overlay */}
        <Html
          position={[0, hovered ? 2.2 : 1.8, 0]}
          center
          distanceFactor={12}
          zIndexRange={[100, 0]}
        >
          <div
            className={`transition-all duration-300 pointer-events-none select-none px-4 py-2.5 rounded-2xl glass-panel-luxury whitespace-nowrap flex flex-col items-center gap-1 ${
              hovered ? 'scale-110 shadow-2xl border-cyan-400/50' : 'opacity-90 scale-100'
            }`}
            style={{
              borderColor: hovered ? accentColor : 'rgba(255, 255, 255, 0.15)',
              boxShadow: hovered ? `0 0 30px ${accentColor}40` : 'none'
            }}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2 h-2 rounded-full animate-ping"
                style={{ backgroundColor: accentColor }}
              />
              <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                {project.category}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white tracking-wide font-heading">
              {project.title}
            </h3>

            {hovered && (
              <div className="flex items-center gap-1.5 text-[11px] text-blue-300 mt-1 font-medium">
                <span>Enter Chamber</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            )}
          </div>
        </Html>
      </group>
    </Float>
  );
};
