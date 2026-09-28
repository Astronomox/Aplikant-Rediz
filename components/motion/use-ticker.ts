"use client";

import { useInView } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * A heartbeat for looping UI vignettes: `tick` increases every `ms` while `ref` is on
 * screen, and stops while it is off screen or under prefers-reduced-motion. Vignettes
 * derive their state from `tick % cycleLength`, and show a finished frame when
 * `reduced` is true.
 */
export function useTicker(ref: RefObject<Element | null>, ms: number) {
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setInterval(() => {
      setTick((t) => t + 1);
    }, ms);
    return () => {
      window.clearInterval(id);
    };
  }, [inView, reduced, ms]);

  return { tick, reduced };
}
