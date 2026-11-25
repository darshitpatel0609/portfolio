import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';

export function SpotlightCanvas() {
  const { resolvedTheme } = useTheme();
  const mouseX = useMotionValue(-600);
  const mouseY = useMotionValue(-600);

  const smoothX = useSpring(mouseX, { stiffness: 260, damping: 36, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 260, damping: 36, mass: 0.4 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    const handleMove = (event: PointerEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [mouseX, mouseY]);

  const darkBackground = useMotionTemplate`radial-gradient(620px circle at ${smoothX}px ${smoothY}px, rgba(56, 189, 248, 0.085), transparent 72%)`;
  const lightBackground = useMotionTemplate`radial-gradient(560px circle at ${smoothX}px ${smoothY}px, rgba(37, 99, 235, 0.045), transparent 72%)`;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        background: resolvedTheme === 'dark' ? darkBackground : lightBackground,
      }}
      className="pointer-events-none fixed inset-0 z-10 hidden transition-opacity duration-300 lg:block"
    />
  );
}
