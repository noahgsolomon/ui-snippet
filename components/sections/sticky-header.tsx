// Credit to https://github.com/marcbouchenoire for the sticky header implementation

'use client';

import { useIsMounted } from '@/hooks/use-mounted';
import { useIsSticky } from '@/hooks/use-sticky';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

export default function StickyHeader() {
  const stickyRef = useRef<HTMLDivElement>(null!);
  const isSticky = useIsSticky(stickyRef);
  const isMounted = useIsMounted();

  return (
    <>
      <div
        className={cn(
          'pointer-events-none inset-x-0 z-40 h-13 w-full',
          isMounted ? 'fixed' : 'absolute',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 border-b bg-white/80 backdrop-blur-lg transition-opacity duration-100 ease-in-out',
            isSticky ? 'opacity-100' : 'opacity-0',
          )}
        >
          <div className="relative container h-full before:pointer-events-none before:absolute before:inset-x-4 before:inset-y-0 before:h-full md:before:inset-x-0" />
        </div>
      </div>
      <div
        className={cn(
          'pointer-events-none mt-24 pt-4 will-change-transform',
          isMounted ? 'sticky -top-px' : 'relative',
          isSticky ? 'z-40' : 'z-0',
        )}
        ref={stickyRef}
      >
        <span className="pointer-events-auto flex w-fit items-center gap-2">
          <a
            className="flex items-center gap-1.5 rounded-sm outline-offset-2 transition duration-200 ease-out hover:opacity-60 focus-visible:opacity-60"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <svg
              className="cursor-pointer transition delay-200 duration-300 ease-in-out hover:scale-110 hover:rotate-10"
              width="16"
              height="16"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.749159 4.42302C0.66252 2.76985 1.93359 1.35939 3.58817 1.27268L13.5745 0.74932C15.2291 0.662607 16.6406 1.93247 16.7272 3.58564L16.9894 8.58817L10.9976 8.90218C9.89457 8.95999 9.04719 9.9003 9.10495 11.0024L9.41798 16.9754L4.42483 17.2371C2.77025 17.3238 1.35871 16.054 1.27207 14.4008L0.749159 4.42302Z"
                fill="#b3b3b3"
              />
              <path
                d="M10.4173 16.9367L10.1297 11.449C10.0864 10.6224 10.7219 9.91715 11.5492 9.87379L17.0417 9.58595L10.4173 16.9367Z"
                fill="#b3b3b3"
              />
            </svg>
            <div>
              <h1 className="text-sm font-medium">Snippet</h1>
            </div>
          </a>
        </span>
      </div>
    </>
  );
}
