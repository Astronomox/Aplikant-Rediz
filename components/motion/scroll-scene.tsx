"use client";

import { useScroll, type MotionValue, type UseScrollOptions } from "framer-motion";
import { createContext, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "./use-prefers-reduced-motion";

/**
 * A section whose scroll progress drives its child layers.
 *
 * One useScroll per scene; layers read the shared progress from context. Values are
 * motion values, so scrolling never re-renders React. useTransform clamps by default,
 * so once the scene is fully off screen its outputs stop changing and nothing is
 * written to the DOM.
 */

const SceneProgress = createContext<MotionValue<number> | null>(null);

type Offset = NonNullable<UseScrollOptions["offset"]>;

interface ScrollSceneProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Maps scroll position to 0..1. Default: scene top at viewport top -> scene bottom at viewport top. */
  offset?: Offset;
}

export function ScrollScene({
  children,
  className,
  id,
  offset = ["start start", "end start"],
}: ScrollSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });

  return (
    <section ref={ref} id={id} className={className}>
      <SceneProgress.Provider value={reduced ? null : scrollYProgress}>
        {children}
      </SceneProgress.Provider>
    </section>
  );
}
