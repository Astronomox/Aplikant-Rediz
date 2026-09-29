"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => {
    mql.removeEventListener("change", onChange);
  };
}

/**
 * True when the user has asked the OS for reduced motion.
 *
 * Uses useSyncExternalStore rather than framer-motion's useReducedMotion so the
 * server snapshot (false) is used during hydration and React re-renders with the
 * real value afterwards, with no hydration mismatch. It also tracks live changes.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}
