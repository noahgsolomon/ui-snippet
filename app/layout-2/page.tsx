'use client';

import { motion } from 'motion/react';
import { useState } from 'react';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <motion.div
        transition={{
          bounce: 0,
          type: 'spring',
          duration: 0.3,
        }}
        layout
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer bg-yellow-300"
        style={
          open
            ? { position: 'fixed', inset: 0, width: '100%', height: '100%' }
            : { height: 48, width: 48 }
        }
      />
    </div>
  );
}
