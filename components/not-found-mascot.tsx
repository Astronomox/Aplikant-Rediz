"use client";

import { m } from "framer-motion";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/*
 * The Aplikant mark as a little character for the 404 page: two eyes that blink and
 * glance around looking for the missing page, a gentle float, and a "?" that bobs
 * beside it. Still under prefers-reduced-motion.
 */

function Eye({ reduced }: { reduced: boolean }) {
  return (
    <m.span
      className="relative block h-[22px] w-[18px] overflow-hidden rounded-full bg-white shadow-[inset_0_-2px_0_rgba(15,23,42,0.08)]"
      animate={reduced ? undefined : { scaleY: [1, 1, 0.1, 1, 1] }}
      transition={{ duration: 4.2, times: [0, 0.46, 0.5, 0.54, 1], repeat: Infinity }}
    >
      <m.span
        className="absolute left-1/2 top-1/2 block h-[11px] w-[11px] rounded-full bg-navy"
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={reduced ? undefined : { x: [0, -4, -4, 4, 4, 0], y: [1, 1, 2, 2, 0, 1] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="absolute right-[2px] top-[2px] block h-[3px] w-[3px] rounded-full bg-white" />
      </m.span>
    </m.span>
  );
}

export function NotFoundMascot() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative mx-auto h-[104px] w-[112px]" aria-hidden="true">
      {/* soft shadow that breathes with the float */}
      <div className="absolute inset-x-0 -bottom-3 flex justify-center">
        <m.span
          className="block h-2.5 w-20 rounded-full bg-navy/10 blur-[2px]"
          animate={reduced ? undefined : { scaleX: [1, 0.85, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <m.div
        className="relative h-full w-full"
        animate={reduced ? undefined : { y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src="/mark.png" alt="" width={112} height={104} priority className="h-full w-full" />
        {/* eyes sit on the arch, either side of the centre gap */}
        <div className="absolute left-1/2 top-[30%] flex -translate-x-1/2 gap-[26px]">
          <Eye reduced={reduced} />
          <Eye reduced={reduced} />
        </div>
      </m.div>
      <m.span
        className="absolute -right-5 -top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white text-sm font-bold text-gold shadow-[0_6px_14px_-6px_rgba(15,23,42,0.35)] ring-1 ring-navy/10"
        animate={reduced ? undefined : { y: [0, -4, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
      >
        ?
      </m.span>
    </div>
  );
}
