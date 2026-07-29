import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Torus } from '@react-three/drei';
import * as THREE from 'three';
import { Project } from '../../types/portfolio';

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
    const speed = hovered ? 0.3 : 1;

    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5 * speed;
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.15;
    }

    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.x += delta * 0.8 * speed;
      innerCoreRef.current.rotation.z += delta * 0.6 * speed;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z -= delta * 0.4 * speed;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
      position={position}
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
        {/* Outer Levitating Geometric Orb */}
        <mesh ref={meshRef} scale={hovered ? 1.3 : 1.1}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={hovered ? 1.2 : 0.4}
            metalness={0.8}
            roughness={0.15}
            wireframe
          />
        </mesh>

        {/* Inner Solid Glowing Gem Core */}
        <mesh ref={innerCoreRef} scale={hovered ? 0.65 : 0.5}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color={accentColor}
            emissive={accentColor}
            emissiveIntensity={hovered ? 2.5 : 1.2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Perimeter Energy Ring */}
        <group ref={ringRef}>
          <Torus args={[1.6, 0.015, 16, 48]} rotation={[Math.PI / 2.5, 0, 0]}>
            <meshBasicMaterial
              color={accentColor}
              transparent
              opacity={hovered ? 0.9 : 0.4}
            />
          </Torus>
        </group>
      </group>
    </Float>
  );
};
