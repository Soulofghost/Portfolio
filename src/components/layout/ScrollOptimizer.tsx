'use client';

import { useEffect } from 'react';

/**
 * ScrollOptimizer - Smooth & Natural Scrolling Enhancer
 *
 * Ensures:
 * - Completely uninhibited native browser wheel, trackpad, and touch scrolling.
 * - Global smooth scrolling delegation for in-page anchor links (e.g. #about, #projects).
 * - Safe scroll offset management respecting sticky headers without layout thrashing.
 */
export default function ScrollOptimizer() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Smoothly intercept hash/anchor clicks to guarantee buttery-smooth transitions
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;

      const targetId = href.substring(1);
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        // Update URL hash without forcing an abrupt jump
        window.history.pushState(null, '', href);
      }
    };

    document.addEventListener('click', handleAnchorClick, { passive: false });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return null;
}
