import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sparkles, Torus } from '@react-three/drei';
import * as THREE from 'three';

export const HeroChamber: React.FC = () => {
  const laptopGroupRef = useRef<THREE.Group>(null);
  const screenLidRef = useRef<THREE.Group>(null);
  const ringGroupRef = useRef<THREE.Group>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating 3D Laptop gentle sway
    if (laptopGroupRef.current) {
      laptopGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      laptopGroupRef.current.rotation.x = Math.cos(t * 0.3) * 0.08;
    }

    // Opening & closing lid smooth animation (opens smoothly up to 105 degrees)
    if (screenLidRef.current) {
      const targetAngle = -1.65 + Math.sin(t * 0.5) * 0.12;
      screenLidRef.current.rotation.x = THREE.MathUtils.lerp(screenLidRef.current.rotation.x, targetAngle, 0.05);
    }

    if (ringGroupRef.current) {
      ringGroupRef.current.rotation.z = t * 0.1;
    }
  });

  return (
    <group position={[0, -0.3, -2]}>
      {/* 3D Floating Anti-Gravity Laptop Model */}
      <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8} position={[0, 0, 0]}>
        <group ref={laptopGroupRef} scale={isMobile ? 0.9 : 1.35}>
          
          {/* Laptop Base (Chassis) */}
          <mesh position={[0, -0.05, 0]}>
            <boxGeometry args={[3.2, 0.1, 2.2]} />
            <meshStandardMaterial
              color="#0f172a"
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>

          {/* Trackpad */}
          <mesh position={[0, -0.001, 0.6]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[0.9, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
          </mesh>

          {/* Keyboard Deck */}
          <mesh position={[0, -0.001, -0.3]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[2.6, 1.0]} />
            <meshStandardMaterial color="#020617" emissive="#38bdf8" emissiveIntensity={0.15} wireframe />
          </mesh>

          {/* Laptop Screen Lid (Hinge at Z = -1.1) */}
          <group ref={screenLidRef} position={[0, 0, -1.1]} rotation={[-1.65, 0, 0]}>
            {/* Screen Back Cover */}
            <mesh position={[0, 1.1, 0]}>
              <boxGeometry args={[3.2, 2.2, 0.08]} />
              <meshStandardMaterial color="#0f172a" metalness={0.95} roughness={0.15} />
            </mesh>

            {/* Glowing Screen Display */}
            <mesh position={[0, 1.1, 0.045]}>
              <planeGeometry args={[3.0, 2.0]} />
              <meshStandardMaterial
                color="#0284c7"
                emissive="#0369a1"
                emissiveIntensity={1.4}
                metalness={0.8}
                roughness={0.1}
              />
            </mesh>
            
            {/* Inner Screen Code UI Preview */}
            <mesh position={[0, 1.1, 0.046]}>
              <planeGeometry args={[2.8, 1.8]} />
              <meshStandardMaterial
                color="#38bdf8"
                emissive="#38bdf8"
                emissiveIntensity={0.8}
                wireframe
              />
            </mesh>
          </group>

        </group>
      </Float>

      {/* Concentric Floating Energy Rings Around 3D Laptop */}
      <group ref={ringGroupRef}>
        <Torus args={[isMobile ? 2.8 : 3.8, 0.015, 16, 80]} rotation={[Math.PI / 3, 0, 0]}>
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} />
        </Torus>
        <Torus args={[isMobile ? 3.6 : 4.8, 0.012, 16, 80]} rotation={[-Math.PI / 4, Math.PI / 5, 0]}>
          <meshBasicMaterial color="#c084fc" transparent opacity={0.35} />
        </Torus>
      </group>

      {/* Ambient Sci-Fi Particles */}
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
