import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { SKILL_CATEGORIES } from '../../data/resumeData';

// Flatten skills with generated 3D orbital positions
const SKILL_NODES_3D = SKILL_CATEGORIES.flatMap((cat, catIdx) => {
  return cat.skills.map((skill, skillIdx) => {
    const angle = (skillIdx / cat.skills.length) * Math.PI * 2 + catIdx * 1.5;
    const radius = 2.8 + catIdx * 0.9;
    const x = Math.cos(angle) * radius;
    const y = (catIdx - 1.5) * 1.8 + Math.sin(skillIdx) * 0.6;
    const z = -20 + Math.sin(angle) * radius * 0.8;
    return {
      ...skill,
      category: cat.category,
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
  const [hovered, setHovered] = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const position: [number, number, number] = [
    isMobile ? node.position[0] * 0.45 : node.position[0],
    isMobile ? node.position[1] * 0.7 : node.position[1],
    node.position[2]
  ];

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.7;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.5} position={position}>
      <group
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef} scale={hovered ? 0.6 : 0.4}>
          <octahedronGeometry />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={hovered ? 2.5 : 0.8}
            roughness={0.2}
            metalness={0.8}
            wireframe={!node.highlight && !hovered}
          />
        </mesh>

        <Html distanceFactor={14} center position={[0, hovered ? 0.8 : 0.6, 0]}>
          <div
            className={`transition-all duration-300 pointer-events-none select-none px-3 py-1.5 rounded-xl glass-panel-luxury text-center whitespace-nowrap ${
              hovered ? 'scale-110 shadow-xl border-blue-400' : 'opacity-80 scale-95'
            }`}
            style={{
              borderColor: hovered ? node.color : 'rgba(255, 255, 255, 0.1)',
              boxShadow: hovered ? `0 0 20px ${node.color}50` : 'none'
            }}
          >
            <p className="text-xs font-semibold text-white font-heading tracking-wide">
              {node.name}
            </p>
            <p className="text-[10px] font-mono text-cyan-300">
              {node.level}% Mastery
            </p>
          </div>
        </Html>
      </group>
    </Float>
  );
};
