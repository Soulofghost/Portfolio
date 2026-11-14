'use client';

import { useEffect } from 'react';

export default function ScrollOptimizer() {
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === 'undefined') return;

    // Detect if target is inside a scrollable modal/dropdown
    const isInsideScrollable = (target: EventTarget | null): boolean => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        const overflowY = window.getComputedStyle(el).overflowY;
        if (
          (overflowY === 'auto' || overflowY === 'scroll') &&
          el.scrollHeight > el.clientHeight
        ) {
          return true;
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      // 1. Never intercept pinch-to-zoom (ctrlKey) or horizontal shift scrolls
      if (e.ctrlKey || e.shiftKey || e.altKey || e.metaKey) return;

      // 2. Never interfere with scrollable modal dialogs
      if (isInsideScrollable(e.target)) return;

      // 3. Distinguish physical mouse wheels from trackpads:
      // Trackpads emit continuous fractional deltas (e.g. 0.5, 1.25, 3.7) or tiny steps.
      // Physical wheel ticks are discrete integers, typically >= 40 (often 100, 120, etc.) or deltaMode !== 0.
      const isDiscreteWheel =
        e.deltaMode !== 0 ||
        (Number.isInteger(e.deltaY) && Math.abs(e.deltaY) >= 40);

      if (isDiscreteWheel && e.deltaY !== 0) {
        // Apply ~1.25x speed multiplier to native scroll (adding +25% delta)
        window.scrollBy({
          top: e.deltaY * 0.25,
          left: 0,
          behavior: 'auto',
        });
      }
    };

    // Passive listener ensures zero scroll blocking or thread delays
    window.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return null;
}

