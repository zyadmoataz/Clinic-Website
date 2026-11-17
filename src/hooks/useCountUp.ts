import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './useScrollReveal';

export function useCountUp(target: number, active: boolean, durationMs = 1000): number {
  const [value, setValue] = useState(0);
  const skipMotion = prefersReducedMotion();

  useEffect(() => {
    if (!active || skipMotion) return;

    let rafId = 0;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [active, durationMs, skipMotion, target]);

  if (active && skipMotion) return target;
  return value;
}
