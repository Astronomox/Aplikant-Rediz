"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only framer-motion's DOM animation feature set (animations, variants,
 * hover/tap/in-view gestures). `strict` makes any accidental use of the full
 * `motion.*` components throw, so every animated element must use the light `m.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
