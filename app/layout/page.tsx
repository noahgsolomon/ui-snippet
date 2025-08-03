'use client';
import { motion, MotionConfig } from 'motion/react';
import { useState } from 'react';
import '../test/styles.css';

export default function Layout() {
  const [isOn, setIsOn] = useState(false);

  const toggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <MotionConfig transition={{ type: 'spring', duration: 0.3, bounce: 0 }}>
        <button
          className={`blue-button flex !w-14 cursor-pointer items-center ${isOn ? 'justify-end' : 'justify-start'} px-1 text-white`}
          onClick={toggle}
        >
          <motion.div layout className="h-6 w-6 rounded-[8px] bg-white" />
        </button>
      </MotionConfig>
    </div>
  );
}
