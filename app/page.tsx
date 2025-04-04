'use client';

import { ProgressiveBlur } from '@/components/core/progressive-blur';
import Showcase from '@/components/sections/showcase';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

export default function Home() {
  const [hideBlur, setHideBlur] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setHideBlur(scrollY + windowHeight >= documentHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        'relative mx-auto flex max-w-[720px] flex-col px-4 font-[family-name:var(--font-inter)] md:px-0',
      )}
    >
      <Toaster duration={6000} />
      <Header />
      <Showcase />
      <Footer />
      <ProgressiveBlur
        className={cn(
          'pointer-events-none fixed bottom-0 left-0 h-[60px] w-screen',
          hideBlur ? 'opacity-0' : 'opacity-100',
        )}
        blurIntensity={0.2}
      />
    </div>
  );
}
