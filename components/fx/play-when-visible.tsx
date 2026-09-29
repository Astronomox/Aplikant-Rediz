"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Sets data-fx-play="true|false" on a wrapper as it enters/leaves the viewport.
 * globals.css pauses every CSS animation inside a "false" region, so looping
 * motion graphics cost nothing while off screen.
 */
export function PlayWhenVisible({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry) setVisible(entry.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);

  return (
    <div ref={ref} data-fx-play={visible} className={className}>
      {children}
    </div>
  );
}
