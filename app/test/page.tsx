'use client';

import { AnimatePresence, MotionConfig } from 'motion/react';
import { motion } from 'motion/react';
import { Spinner } from './spinner';
import { useState } from 'react';

const buttonCopy = {
  idle: 'Send me a login link',
  loading: <Spinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  success: 'Login link sent!',
};

export default function SmoothButton() {
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  return (
    <div className="outer-wrapper">
      <MotionConfig transition={{ type: 'spring', duration: 0.3, bounce: 0 }}>
        <button
          className="blue-button cursor-pointer"
          disabled={buttonState !== 'idle'}
          onClick={() => {
            // This code is just a placeholder
            setButtonState('loading');

            setTimeout(() => {
              setButtonState('success');
            }, 1750);

            setTimeout(() => {
              setButtonState('idle');
            }, 3500);
          }}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={buttonState}
              initial={{ y: -25, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 25 }}
            >
              {buttonCopy[buttonState]}
            </motion.span>
          </AnimatePresence>
        </button>
      </MotionConfig>
    </div>
  );
}
