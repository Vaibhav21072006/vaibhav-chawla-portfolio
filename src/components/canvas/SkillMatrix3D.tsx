import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../../data/resumeData';

// Generate 3D orbital node positions for skill cluster
const SKILL_NODES_3D = SKILL_CATEGORIES.flatMap((cat, catIdx) => {
  return cat.skills.map((skill, skillIdx) => {
    const angle = (skillIdx / cat.skills.length) * Math.PI * 2 + catIdx * 1.5;
    const radius = 2.8 + catIdx * 0.9;
    const x = Math.cos(angle) * radius;
    const y = (catIdx - 1.5) * 1.8 + Math.sin(skillIdx) * 0.6;
    const z = -20 + Math.sin(angle) * radius * 0.8;
    return {
      name: skill.name,
      position: [x, y, z] as [number, number, number],
      color: skill.highlight ? '#38bdf8' : catIdx === 0 ? '#a855f7' : catIdx === 1 ? '#3b82f6' : catIdx === 2 ? '#10b981' : '#f59e0b'
    };
  });
});

export const SkillMatrix3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {SKILL_NODES_3D.map((node, i) => (
        <SkillNode3D key={node.name + i} node={node} />
      ))}
    </group>
  );
};

interface SkillNodeProps {
  node: typeof SKILL_NODES_3D[0];
}

const SkillNode3D: React.FC<SkillNodeProps> = ({ node }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const position: [number, number, number] = [
    isMobile ? node.position[0] * 0.45 : node.position[0],
    isMobile ? node.position[1] * 0.7 : node.position[1],
    node.position[2]
  ];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.6;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1} position={position}>
      <mesh ref={meshRef} scale={isMobile ? 0.3 : 0.45}>
        <octahedronGeometry />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};
