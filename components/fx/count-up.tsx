"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/**
 * Counts a stat like "12,000+" up from zero the first time it scrolls into view.
 * Desktop only (lg+) and not under reduced motion. Server and no-JS render the
 * final value, so the number is always correct without JavaScript.
 */
export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduced = usePrefersReducedMotion();
  const [text, setText] = useState(value);

  const match = /^(\D*)([\d,]+)(.*)$/.exec(value);
  const prefix = match?.[1] ?? "";
  const target = Number((match?.[2] ?? "").replace(/,/g, ""));
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (!inView || reduced || !Number.isFinite(target) || target === 0) return;
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const controls = animate(0, target, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        setText(`${prefix}${Math.round(v).toLocaleString("en-US")}${suffix}`);
      },
    });
    return () => {
      controls.stop();
    };
  }, [inView, reduced, target, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {text}
    </span>
  );
}
