'use client';

import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { AnimateNumber, Cursor } from 'motion-plus/react';
import { useState } from 'react';

export default function LineGraph({ data = [30, 8, 36, 29, 50, 78] }: { data?: number[] }) {
  // Calculate points for the SVG path
  const points = data.map((value, index) => ({
    x: 50 + index * 100,
    y: 250 - value * 2,
    value,
  }));

  const pathD = points.reduce(buildPath, '');

  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const [percentageChange, setPercentageChange] = useState<number | null>(null);
  const startHover = (index: number) => {
    setHoveredPoint(index);

    if (index > 0) {
      const currentValue = data[index];
      const previousValue = data[index - 1];
      const percentageChange = ((currentValue - previousValue) / previousValue) * 100;
      setPercentageChange(percentageChange);
    } else {
      setPercentageChange(null);
    }
  };

  const endHover = () => {
    setHoveredPoint(null);
    setPercentageChange(null);
  };

  return (
    <div className="rounded-xl border border-[#1d2628] bg-[#0b1011] p-5" onPointerLeave={endHover}>
      <svg width="600" height="300" className="overflow-visible">
        <defs>
          <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#8df0cc" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#8df0cc" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background grid lines */}
        {[50, 100, 150, 200, 250].map((y) => (
          <motion.line
            key={y}
            x1="50"
            y1={y}
            x2="550"
            y2={y}
            stroke="#1d2628"
            strokeWidth="1"
            strokeDasharray="5,5"
          />
        ))}

        {/* Area fill under the line */}
        <motion.path d={`${pathD} L 550,250 L 50,250 Z`} fill="url(#areaGradient)" />

        {/* Main graph line */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#8df0cc"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* Points */}
        <motion.g
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                delayChildren: 0.1,
                staggerChildren: 1.5 / 6,
              },
            },
          }}
        >
          {points.map((point, index) => (
            <g key={index}>
              {/* Hit area */}
              <motion.rect
                x={point.x - 50}
                y={0}
                width={100}
                height={300}
                fill="transparent"
                onHoverStart={() => startHover(index)}
                className="cursor-pointer"
              />
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#0b1011"
                stroke="#8df0cc"
                strokeWidth="1"
                animate={hoveredPoint === index ? { scale: 1.5 } : { scale: 1 }}
                variants={{
                  hidden: { scale: 0.5, opacity: 0 },
                  visible: { scale: 1, opacity: 1 },
                }}
              />
            </g>
          ))}
        </motion.g>
      </svg>
      <AnimatePresence>
        {percentageChange !== null && (
          <Cursor
            follow
            initial={{ opacity: 0, scale: 0.5 }}
            offset={{ x: 20, y: 20 }}
            key="cursor"
          >
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0b1011] px-3 py-1.5 will-change-transform">
              <MotionConfig
                transition={{
                  type: 'spring',
                  visualDuration: 0.6,
                  bounce: 0.2,
                }}
              >
                <motion.div
                  initial={false}
                  animate={{
                    rotate: percentageChange < 0 ? 180 : 0,
                    color: percentageChange < 0 ? '#ff0088' : '#8df0cc',
                  }}
                  className="text-2xl font-bold"
                >
                  ↑
                </motion.div>
                <AnimateNumber
                  initial={false}
                  animate={{
                    color: percentageChange < 0 ? '#ff0088' : '#8df0cc',
                  }}
                  className="text-2xl"
                  format={{
                    notation: 'compact',
                    compactDisplay: 'short',
                  }}
                  suffix={'%'}
                >
                  {percentageChange}
                </AnimateNumber>
              </MotionConfig>
            </div>
          </Cursor>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * ==============   Utils   ================
 */

function buildPath(path: string, point: { x: number; y: number }, i: number) {
  if (i === 0) return `M ${point.x},${point.y}`;
  return `${path} L ${point.x},${point.y}`;
}
