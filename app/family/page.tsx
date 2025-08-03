'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../test/styles.css';

export default function Example() {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [height, setHeight] = useState(0);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.target.getBoundingClientRect();
      setHeight(rect.height);
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grid h-screen w-screen place-items-center bg-[#0d0d0d] text-black">
      <button className="blue-button cursor-pointer" onClick={() => setShowExtraContent((b) => !b)}>
        Toggle height
      </button>
      <motion.div
        animate={{ height }}
        className="flex w-80 flex-col gap-2 overflow-hidden rounded-2xl bg-white"
      >
        <div ref={elementRef} className="px-4 py-[13px]">
          <h1 className="font-semibold">Fake Family Drawer</h1>
          <p>
            This is a fake family drawer. Animating height is tricky, but satisfying when it works.
          </p>
          {showExtraContent ? (
            <p className="text-[#63635d]">
              This extra content will change the height of the drawer. Some even more content to
              make the drawer taller and taller and taller...
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
