import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const HeroChamber: React.FC = () => {
  const coreMeshRef = useRef<THREE.Mesh>(null);
  const ringGroupRef = useRef<THREE.Group>(null);
  const outerSphereRef = useRef<THREE.Mesh>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (coreMeshRef.current) {
      coreMeshRef.current.rotation.y = t * 0.25;
      coreMeshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }

    if (outerSphereRef.current) {
      outerSphereRef.current.rotation.y = -t * 0.15;
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = t * 0.12;
    }
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Central Floating Futuristic Metallic Core */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[0, 0, 0]}>
        <mesh ref={coreMeshRef} scale={isMobile ? 1.2 : 1.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0284c7"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.15}
            wireframe
          />
        </mesh>

        <mesh ref={outerSphereRef} scale={isMobile ? 0.7 : 1.1}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#9333ea"
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </Float>

      {/* Sleek Concentric Anti-Gravity Energy Rings */}
      <group ref={ringGroupRef} position={[0, 0, 0]}>
        <Torus args={[isMobile ? 2.4 : 3.4, 0.015, 16, 80]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </Torus>
        <Torus args={[isMobile ? 3.2 : 4.4, 0.012, 16, 80]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
          <meshBasicMaterial color="#c084fc" transparent opacity={0.35} />
        </Torus>
      </group>

      {/* Lightweight Ambient Particles */}
      <Sparkles
        count={isMobile ? 40 : 90}
        scale={16}
        size={3}
        speed={0.3}
        opacity={0.5}
        color="#38bdf8"
      />
    </group>
  );
};
