import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface CinematicCameraControllerProps {
  scrollProgress: number; // 0 to 1
}

export const CinematicCameraController: React.FC<CinematicCameraControllerProps> = ({ scrollProgress }) => {
  const { camera, mouse } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const baseZ = isMobile ? 10.5 : 8;

    const zPos = baseZ - scrollProgress * 48;
    const yPos = Math.sin(scrollProgress * Math.PI * 3) * (isMobile ? 0.8 : 1.5);
    const xPos = Math.cos(scrollProgress * Math.PI * 2) * (isMobile ? 0.4 : 1.2);

    // Mouse/Touch parallax contribution (subtle cinematic rotation)
    const parallaxX = mouse.x * (isMobile ? 0.4 : 1.2);
    const parallaxY = mouse.y * (isMobile ? 0.3 : 0.8);

    targetPos.current.set(xPos + parallaxX, yPos + parallaxY, zPos);
    targetLookAt.current.set(parallaxX * 0.5, parallaxY * 0.5, zPos - 10);

    // Smooth lerp for inertia camera movement
    camera.position.lerp(targetPos.current, 0.06);
    camera.lookAt(targetLookAt.current);
  });

  return null;
};
