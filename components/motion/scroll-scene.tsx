"use client";

import { m, useScroll, useTransform, type MotionValue, type UseScrollOptions } from "framer-motion";
import { createContext, useContext, useRef, type ReactNode } from "react";
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

interface ParallaxLayerProps {
  children?: ReactNode;
  className?: string;
  /** Vertical offset in px at scene progress 1 (0 at progress 0). Positive = lags behind the scroll. */
  y: number;
  /** Optional opacity at progress 1; fades linearly from 1. */
  fadeTo?: number;
}

/** A layer that moves at its own rate as its ScrollScene scrolls. Static under reduced motion. */
export function ParallaxLayer({ children, className, y, fadeTo }: ParallaxLayerProps) {
  const progress = useContext(SceneProgress);
  if (!progress) {
    return <div className={className}>{children}</div>;
  }
  return (
    <MovingLayer progress={progress} className={className} y={y} fadeTo={fadeTo}>
      {children}
    </MovingLayer>
  );
}

function MovingLayer({
  progress,
  children,
  className,
  y,
  fadeTo,
}: ParallaxLayerProps & { progress: MotionValue<number> }) {
  const translateY = useTransform(progress, [0, 1], [0, y]);
  const opacity = useTransform(progress, [0, 1], [1, fadeTo ?? 1]);
  return (
    <m.div className={className} style={{ y: translateY, opacity }}>
      {children}
    </m.div>
  );
}
