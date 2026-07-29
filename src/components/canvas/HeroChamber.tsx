import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const HeroChamber: React.FC = () => {
  const monolithRef = useRef<THREE.Mesh>(null);
  const dodecaRef = useRef<THREE.Mesh>(null);
  const torusKnotRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (monolithRef.current) {
      monolithRef.current.rotation.y = t * 0.15;
      monolithRef.current.rotation.x = Math.sin(t * 0.2) * 0.1;
    }

    if (dodecaRef.current) {
      dodecaRef.current.rotation.x = t * 0.25;
      dodecaRef.current.rotation.z = t * 0.2;
    }

    if (torusKnotRef.current) {
      torusKnotRef.current.rotation.y = -t * 0.3;
      torusKnotRef.current.rotation.z = t * 0.15;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central Floating Glass Monolith */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8} position={[0, 0.5, -2]}>
        <mesh ref={monolithRef} scale={isMobile ? [1.5, 2.8, 0.3] : [2.2, 3.8, 0.4]}>
          <boxGeometry />
          <MeshTransmissionMaterial
            backside
            samples={isMobile ? 4 : 8}
            resolution={isMobile ? 256 : 512}
            transmission={0.92}
            roughness={0.1}
            thickness={0.8}
            ior={1.4}
            chromaticAberration={0.06}
            anisotropy={0.1}
            color="#e0f2fe"
          />
        </mesh>
      </Float>

      {/* Floating Geometric Artifact 1 (Left Dodecahedron) */}
      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2} position={isMobile ? [-2.2, 2.4, -3] : [-4.5, 1.8, -3]}>
        <mesh ref={dodecaRef} scale={isMobile ? 0.75 : 1.1}>
          <dodecahedronGeometry />
          <meshPhysicalMaterial
            color="#38bdf8"
            metalness={0.2}
            roughness={0.15}
            transmission={0.8}
            thickness={0.5}
            transparent
            opacity={0.85}
          />
        </mesh>
      </Float>

      {/* Floating Geometric Artifact 2 (Right Torus Knot) */}
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1} position={isMobile ? [2.2, -2.2, -4] : [4.5, -1.2, -4]}>
        <mesh ref={torusKnotRef} scale={isMobile ? 0.6 : 0.9}>
          <torusKnotGeometry args={[1, 0.28, 128, 32]} />
          <meshPhysicalMaterial
            color="#c084fc"
            metalness={0.4}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.1}
            wireframe={false}
          />
        </mesh>
      </Float>

      {/* Concentric Anti-Gravity Energy Rings */}
      <group ref={ringGroupRef} position={[0, 0.5, -2]}>
        <Torus args={[3.2, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.3} />
        </Torus>
        <Torus args={[4.2, 0.015, 16, 100]} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
          <meshBasicMaterial color="#a855f7" transparent opacity={0.25} />
        </Torus>
      </group>

      {/* Volumetric Floating Particles Field */}
      <Sparkles
        count={120}
        scale={18}
        size={3}
        speed={0.4}
        opacity={0.6}
        color="#38bdf8"
      />
      <Sparkles
        count={80}
        scale={22}
        size={4}
        speed={0.3}
        opacity={0.4}
        color="#c084fc"
      />
    </group>
  );
};
