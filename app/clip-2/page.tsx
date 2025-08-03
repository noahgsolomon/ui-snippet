
'use client';

import { useEffect, useRef, useState } from 'react';

const TABS = ['Home', 'Explore', 'Pricing', 'Compute'] as const;

export default function Page() {

  const [selectedTab, setSelectedTab] = useState<typeof TABS[number]>(TABS[0]);
  const selectedTabRef = useRef<HTMLLIElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)


  useEffect(() => {
    if (!selectedTabRef.current || !containerRef.current) return;

    const { offsetLeft, offsetWidth } = selectedTabRef.current;
    const containerWidth = containerRef.current.offsetWidth;

    const leftPercent = (offsetLeft / containerWidth) * 100;
    const rightPercent = 100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;

    containerRef.current.style.clipPath =
      `inset(0 ${rightPercent}% 0 ${leftPercent}% round 12px)`;
  }, [selectedTab]);

  return (<div className="flex h-screen w-full items-center justify-center">
    <div className='relative'>
      <div className='inset-0 absolute flex flex-row gap-2 p-2 cursor-pointer'>
        {TABS.map((tab) => (
          <li onClick={() => setSelectedTab(tab)} key={tab} className='list-none font-bold cursor-pointer px-3'>
            {tab}
          </li>
        ))}
      </div>
      <div ref={containerRef} className='flex duration-300 flex-row gap-2 bg-blue-500 p-2 transition-all'>
        {TABS.map((tab) => (
          <li ref={tab === selectedTab ? selectedTabRef : undefined} key={tab} className='list-none cursor-pointer font-bold px-3 text-white z-10'>
            {tab}
          </li>
        ))}
      </div>
    </div>
  </div>);
}
