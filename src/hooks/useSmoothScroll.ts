"use client";

import { useRef, useCallback } from "react";

// Easing function - easeOutCubic para un scroll más natural
const easeOutCubic = (t: number): number => {
  return 1 - Math.pow(1 - t, 3);
};

// Easing function - easeInOutCubic para scroll más suave
const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

interface UseSmoothScrollOptions {
  duration?: number;
  easing?: "easeOutCubic" | "easeInOutCubic";
}

export function useSmoothScroll<T extends HTMLElement>(
  options: UseSmoothScrollOptions = {}
) {
  const { duration = 500, easing = "easeOutCubic" } = options;
  const containerRef = useRef<T>(null);
  const animationRef = useRef<number | null>(null);

  const easingFn = easing === "easeInOutCubic" ? easeInOutCubic : easeOutCubic;

  const smoothScrollTo = useCallback(
    (targetPosition: number) => {
      const container = containerRef.current;
      if (!container) return;

      // Cancelar animación anterior si existe
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      const startPosition = container.scrollLeft;
      const distance = targetPosition - startPosition;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easingFn(progress);

        container.scrollLeft = startPosition + distance * easedProgress;

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        } else {
          animationRef.current = null;
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    },
    [duration, easingFn]
  );

  const scrollBy = useCallback(
    (amount: number) => {
      const container = containerRef.current;
      if (!container) return;

      const targetPosition = container.scrollLeft + amount;
      smoothScrollTo(targetPosition);
    },
    [smoothScrollTo]
  );

  const scrollLeft = useCallback(
    (amount?: number) => {
      const container = containerRef.current;
      if (!container) return;

      const scrollAmount = amount ?? container.clientWidth * 0.8;
      scrollBy(-scrollAmount);
    },
    [scrollBy]
  );

  const scrollRight = useCallback(
    (amount?: number) => {
      const container = containerRef.current;
      if (!container) return;

      const scrollAmount = amount ?? container.clientWidth * 0.8;
      scrollBy(scrollAmount);
    },
    [scrollBy]
  );

  const scrollToStart = useCallback(() => {
    smoothScrollTo(0);
  }, [smoothScrollTo]);

  const scrollToEnd = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    smoothScrollTo(container.scrollWidth - container.clientWidth);
  }, [smoothScrollTo]);

  return {
    containerRef,
    scrollLeft,
    scrollRight,
    scrollBy,
    scrollToStart,
    scrollToEnd,
    smoothScrollTo,
  };
}

export default useSmoothScroll;
