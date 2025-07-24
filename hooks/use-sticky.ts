import { type RefObject, useEffect, useState } from 'react';

export function useIsSticky<T extends HTMLElement>(ref: RefObject<T | null>) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSticky((entry?.intersectionRatio ?? 1) < 1),
      {
        threshold: [1],
      },
    );

    observer.observe(current as T);

    return () => {
      observer.unobserve(current as T);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return isSticky;
}
