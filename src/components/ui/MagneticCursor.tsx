import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const MagneticCursor: React.FC = () => {
  const [isPointer, setIsPointer] = useState(false);

  const cursorX = useSpring(0, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 400, damping: 28 });

  const trailingX = useSpring(0, { stiffness: 150, damping: 20 });
  const trailingY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailingX.set(e.clientX);
      trailingY.set(e.clientY);

      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'BUTTON' || target.tagName === 'A' || target.closest('button') || target.closest('a') || target.getAttribute('role') === 'button')) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, trailingX, trailingY]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden hidden md:block">
      {/* Inner Dot Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-400 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Outer Floating Glass Inertia Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-cyan-400/40 bg-cyan-500/5 backdrop-blur-xs transition-all duration-150"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: '-50%',
          translateY: '-50%',
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          borderColor: isPointer ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.3)',
          boxShadow: isPointer ? '0 0 25px rgba(56, 189, 248, 0.5)' : 'none',
        }}
      />
    </div>
  );
};
