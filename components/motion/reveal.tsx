"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/** Shared timing for every scroll reveal on the page. */
export const REVEAL_EASE = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DURATION = 0.45;
/** Delay between siblings in a staggered group (cards, steps). */
export const STAGGER = 0.09;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Position within a staggered group; multiplied by STAGGER. */
  index?: number;
}

/** Fades content up 16px the first time it scrolls into view. */
export function Reveal({ children, className, index = 0 }: RevealProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: REVEAL_DURATION, ease: REVEAL_EASE, delay: index * STAGGER }}
    >
      {children}
    </m.div>
  );
}
