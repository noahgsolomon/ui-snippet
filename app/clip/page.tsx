'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

export default function Page() {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setCoords({
        x: Math.max(0, Math.min(x, rect.width)),
        y: Math.max(0, Math.min(y, rect.height)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const height = ref.current?.getBoundingClientRect().height ?? 256;
  const isTopHalf = coords.y < height / 2;

  const gradientWidth = 50;
  const gradientLeft = Math.max(0, coords.x - gradientWidth / 2);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div
        ref={ref}
        className="relative size-64 bg-blue-500 overflow-hidden border rounded-2xl shadow-xl"
      >
        <motion.div
          className="absolute inset-0 bg-yellow-500"
          animate={{
            clipPath: `inset(0px 0px 0px ${coords.x}px)`,
            WebkitClipPath: `inset(0px 0px 0px ${coords.x}px)`,
          }}
          transition={{ duration: 0.2 }}
        />


        <motion.div
          className="absolute top-0 h-full bg-gradient-to-r from-blue-500 to-yellow-500 pointer-events-none"
          style={{
            width: `${gradientWidth}px`,
          }}
          animate={{
            left: gradientLeft,
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Green layer: vertical reveal with simulated z-index */}
        <motion.div
          className="absolute inset-0 bg-green-500 mix-blend-overlay"
          animate={{
            clipPath: `inset(${coords.y}px 0 0 0)`,
            WebkitClipPath: `inset(${coords.y}px 0 0 0)`,
            opacity: isTopHalf ? 1 : 0.5,
          }}
          style={{
            /* make the top of the visible area transparent, fade in over 40 px */
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)',

            /* << the important part – keep the gradient glued to the clip edge >> */
            WebkitMaskPosition: `0px ${coords.y}px`,
            maskPosition: `0px ${coords.y}px`,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',

            pointerEvents: isTopHalf ? 'auto' : 'none',
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </div>
  );
}
