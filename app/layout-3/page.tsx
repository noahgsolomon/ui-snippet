'use client';

import { useQueryState, parseAsStringLiteral } from 'nuqs';
import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

const TABS = [
  {
    name: 'Payments',
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M0 3.884c0-.8.545-1.476 1.306-1.68l.018-.004L10.552.213c.15-.038.3-.055.448-.055.927.006 1.75.733 1.75 1.74V4.5h.75A2.5 2.5 0 0 1 16 7v6.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5V3.884ZM10.913 1.67c.199-.052.337.09.337.23v2.6H2.5c-.356 0-.694.074-1 .208v-.824c0-.092.059-.189.181-.227l9.216-1.984.016-.004ZM1.5 7v6.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-11a1 1 0 0 0-1 1Z"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M10.897 1.673 1.681 3.657c-.122.038-.181.135-.181.227v.824a2.492 2.492 0 0 1 1-.208h8.75V1.898c0-.14-.138-.281-.337-.23m0 0-.016.005Zm-9.59.532 9.23-1.987c.15-.038.3-.055.448-.055.927.006 1.75.733 1.75 1.74V4.5h.75A2.5 2.5 0 0 1 16 7v6.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 13.5V3.884c0-.8.545-1.476 1.306-1.68l.018-.004ZM1.5 13.5V7a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1ZM13 10.25c0 .688-.563 1.25-1.25 1.25-.688 0-1.25-.55-1.25-1.25 0-.688.563-1.25 1.25-1.25.688 0 1.25.562 1.25 1.25Z"
        ></path>
      </svg>
    ),
  },
  {
    name: 'Balances',
    icon: (
      <svg
        data-testid="primary-nav-item-icon"
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M1 2a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 1 2Zm0 8a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5h-5A.75.75 0 0 1 1 10Zm2.25-4.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5h-7.5ZM2.5 14a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5h-4A.75.75 0 0 1 2.5 14Z"
        ></path>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M16 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.5 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
        ></path>
      </svg>
    ),
  },
  {
    name: 'Customers',
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="currentColor"
          d="M2.5 14.4h11a.4.4 0 0 0 .4-.4 3.4 3.4 0 0 0-3.4-3.4h-5A3.4 3.4 0 0 0 2.1 14c0 .22.18.4.4.4Zm0 1.6h11a2 2 0 0 0 2-2 5 5 0 0 0-5-5h-5a5 5 0 0 0-5 5 2 2 0 0 0 2 2ZM8 6.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8ZM8 8a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
        ></path>
      </svg>
    ),
  },
  {
    name: 'Billing',
    icon: (
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="currentColor"
          d="M0 2.25A2.25 2.25 0 0 1 2.25 0h7.5A2.25 2.25 0 0 1 12 2.25v6a.75.75 0 0 1-1.5 0v-6a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0-.75.75v10.851a.192.192 0 0 0 .277.172l.888-.444a.75.75 0 1 1 .67 1.342l-.887.443A1.69 1.69 0 0 1 0 13.101V2.25Z"
        ></path>
        <path
          fill="currentColor"
          d="M5 10.7a.7.7 0 0 1 .7-.7h4.6a.7.7 0 1 1 0 1.4H7.36l.136.237c.098.17.193.336.284.491.283.483.554.907.855 1.263.572.675 1.249 1.109 2.365 1.109 1.18 0 2.038-.423 2.604-1.039.576-.626.896-1.5.896-2.461 0-.99-.42-1.567-.807-1.998a.75.75 0 1 1 1.115-1.004C15.319 8.568 16 9.49 16 11c0 1.288-.43 2.54-1.292 3.476C13.838 15.423 12.57 16 11 16c-1.634 0-2.706-.691-3.51-1.64-.386-.457-.71-.971-1.004-1.472L6.4 12.74v2.56a.7.7 0 1 1-1.4 0v-4.6ZM2.95 4.25a.75.75 0 0 1 .75-.75h2a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1-.75-.75ZM3.7 6.5a.75.75 0 0 0 0 1.5h4.6a.75.75 0 0 0 0-1.5H3.7Z"
        ></path>
      </svg>
    ),
  },
] as const;

export default function Page() {
  // keeps the active tab in the URL (?tab=ARE) so refreshing preserves state
  const [selected, setSelected] = useQueryState(
    'tab',
    parseAsStringLiteral(TABS.map((t) => t.name)).withDefault(TABS[0].name),
  );

  // debug helper – reveal the whole blue bar without clipping
  const [showFull, setShowFull] = useState(false);

  // animation speed multiplier
  const [speedMultiplier, setSpeedMultiplier] = useState(1);

  // store the clip-path value for animation
  const [clipPath, setClipPath] = useState<string>('');

  // store shadow position values for animation
  const [shadowPosition, setShadowPosition] = useState({ left: 0, width: 0 });

  /* refs to the pieces we need to measure / move */
  const wrapperRef = useRef<HTMLDivElement>(null); // outer white pill
  const clipLayerRef = useRef<HTMLDivElement>(null); // blue gradient layer that gets clipped
  const activeTabRef = useRef<HTMLSpanElement>(null); // <span> of the current tab

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    const layer = clipLayerRef.current;
    const active = activeTabRef.current;
    if (!wrapper || !layer || !active) return;

    /* ==== geometric constants (match Tailwind spacing) ==== */
    const GAP = 4; // gap-1 → 0.25 rem
    const T = 4; // top/bottom inset = py-1
    const R = 8; // outer radius → rounded-lg (8 px)

    /* ==== measure everything in actual pixels ==== */
    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    const leftPx = activeRect.left - wrapperRect.left - GAP / 2; // pill start − half the gap
    const rightInset = wrapperRect.right - activeRect.right - GAP / 2; // distance from wrapper's right edge

    /* ==== shape the blue layer (clip‑path) ==== */
    if (showFull) {
      setClipPath('none');
      setShadowPosition({ left: -1000, width: 0 }); // hide shadow off-screen
    } else {
      setClipPath(`inset(${T}px ${rightInset}px ${T}px ${leftPx}px round ${R}px)`);
      setShadowPosition({
        left: leftPx + 0.25,
        width: wrapperRect.width - leftPx - rightInset - 0.45,
      });
    }
  }, [selected, showFull]);

  const cycleSpeed = () => {
    setSpeedMultiplier((current) => {
      if (current === 1) return 2;
      if (current === 2) return 0.2;
      if (current === 0.2) return 0.5;
      return 1;
    });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="space-y-3">
        {/* toggle to reveal the whole blue layer */}
        <div className="flex items-center justify-center gap-2">
          <button
            className="cursor-pointer rounded border px-3 py-1 text-xs shadow hover:bg-gray-100"
            onClick={() => setShowFull((v) => !v)}
          >
            {showFull ? 'Hide full layer' : 'Show full layer'}
          </button>
          <button
            className="cursor-pointer rounded border px-3 py-1 text-xs shadow hover:bg-gray-100"
            onClick={cycleSpeed}
          >
            Speed: {speedMultiplier.toFixed(1)}x
          </button>
        </div>

        <div
          ref={wrapperRef}
          className="relative flex h-10 items-center gap-1 overflow-hidden rounded-lg bg-gradient-to-b from-white to-gray-50 px-1 py-1 text-[13px] font-medium shadow-[0_0_1px_1px_rgba(0,0,0,0.08)_inset,0_1px_1.5px_0_rgba(0,0,0,0.16),0_0_0_0.5px_#e5e7eb]"
        >
          {/* neutral text layer */}
          {TABS.map((tab) => (
            <span
              key={tab.name}
              ref={tab.name === selected ? activeTabRef : null}
              onClick={() => setSelected(tab.name)}
              className="relative z-10 flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-gray-600 transition-colors hover:text-gray-900"
            >
              {tab.icon}
              {tab.name}
            </span>
          ))}

          {!showFull && (
            <motion.div
              animate={{
                left: shadowPosition.left,
                width: shadowPosition.width,
                opacity: showFull ? 0 : 1,
              }}
              transition={{
                duration: 0.3 / speedMultiplier,
                ease: 'easeInOut',
              }}
              className="pointer-events-none absolute top-1 h-8 rounded-lg shadow-[0_1px_1.5px_0_rgba(0,0,0,0.32),0_0_0_0.5px_#1a94ff]"
            />
          )}

          <motion.div
            animate={{ clipPath }}
            transition={{
              clipPath: {
                duration: 0.3 / speedMultiplier,
                ease: 'easeInOut',
              },
            }}
            ref={clipLayerRef}
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
          >
            <div className="flex h-10 items-center gap-1 bg-gradient-to-b from-[#1994ffc9] to-[#157cff] px-1 py-1 shadow-[inset_0_0_1px_1px_rgba(255,255,255,0.08)]">
              {TABS.map((tab) => (
                <span
                  key={tab.name}
                  onClick={() => setSelected(tab.name)}
                  className="pointer-events-auto flex h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 font-medium text-white"
                >
                  {tab.icon}
                  {tab.name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
