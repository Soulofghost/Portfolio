'use client';

import { useEffect, useRef, memo } from 'react';

/**
 * CustomCursor - Global Interactive Desktop Cursor for Alvin MS Portfolio
 * 
 * Features:
 * - Glowing central core dot with smooth trailing outer ring.
 * - Buttery-smooth lerp interpolation via requestAnimationFrame (0 React re-renders during mouse move).
 * - Context-sensitive expansion and glow over links, buttons, cards, and interactive nodes.
 * - Text-input aware (hides/diminishes over text fields to preserve native editing experience).
 * - Auto-disabled on mobile / touchscreen / coarse pointers.
 * - Strictly pointer-events: none (never interferes with clicks, drags, or text selection).
 */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 1. Check for pointer: fine. If touch or coarse pointer, do not activate.
    if (typeof window === 'undefined') return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let dotX = -100;
    let dotY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isHoveringTextInput = false;
    let rafId: number | null = null;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        ringX = mouseX;
        ringY = mouseY;
        dotX = mouseX;
        dotY = mouseY;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }

      // Check element under cursor for interactive states
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, [role="button"], input[type="submit"], input[type="button"], .glass-card, [data-cursor="interactive"]')
        );
        const isTextInput = Boolean(
          target.closest('input[type="text"], input[type="email"], input[type="search"], textarea, select, [contenteditable="true"]')
        );

        if (isTextInput !== isHoveringTextInput) {
          isHoveringTextInput = isTextInput;
          if (isTextInput) {
            dot.style.opacity = '0.15';
            ring.style.opacity = '0.2';
          } else {
            dot.style.opacity = '1';
            ring.style.opacity = '1';
          }
        }

        if (isInteractive !== isHoveringInteractive) {
          isHoveringInteractive = isInteractive;
          if (isInteractive) {
            ring.classList.add('cursor-ring-active');
            dot.classList.add('cursor-dot-active');
          } else {
            ring.classList.remove('cursor-ring-active');
            dot.classList.remove('cursor-dot-active');
          }
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    };

    // Smooth animation loop
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      if (isVisible) {
        if (prefersReducedMotion) {
          ringX = mouseX;
          ringY = mouseY;
          dotX = mouseX;
          dotY = mouseY;
        } else {
          // Inner dot snaps tightly (0.75 lerp)
          dotX = lerp(dotX, mouseX, 0.75);
          dotY = lerp(dotY, mouseY, 0.75);
          // Outer ring smoothly trails behind (0.22 lerp)
          ringX = lerp(ringX, mouseX, 0.22);
          ringY = lerp(ringY, mouseY, 0.22);
        }

        dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none hidden md:block"
      aria-hidden="true"
    >
      {/* Outer Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-emerald-400/50 pointer-events-none opacity-0 transition-[width,height,border-color,background-color] duration-200 ease-out will-change-transform flex items-center justify-center shadow-[0_0_12px_rgba(16,185,129,0.15)]"
      />

      {/* Inner Glowing Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-emerald-400 pointer-events-none opacity-0 transition-[transform,background-color] duration-150 ease-out will-change-transform shadow-[0_0_8px_rgba(52,211,153,0.9)]"
      />

      <style jsx global>{`
        .cursor-ring-active {
          width: 48px !important;
          height: 48px !important;
          border-color: rgba(6, 182, 212, 0.8) !important;
          background-color: rgba(6, 182, 212, 0.08) !important;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.35) !important;
        }
        .cursor-dot-active {
          background-color: #22d3ee !important;
          box-shadow: 0 0 12px rgba(34, 211, 238, 1) !important;
          transform: translate(-50%, -50%) scale(1.4);
        }
      `}</style>
    </div>
  );
}

export default memo(CustomCursor);
