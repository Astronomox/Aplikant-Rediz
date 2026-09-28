"use client";

import { m } from "framer-motion";
import { CountUp } from "@/components/fx/count-up";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { stats } from "./content";
import { H2, Pill, TwoTone } from "./frame";

/*
 * "At any scale" (after Attio's "Run at any scale"): the four stats in a 2x2 with left
 * rules, over a growth curve with vertical hatching beneath it, spanning the section.
 * The curve is decorative (it plots no data); it draws itself as it scrolls in.
 */

const CURVE = "M0 380 C 380 378, 620 330, 820 250 S 1080 60, 1160 0";

export function Scale() {
  const reduced = usePrefersReducedMotion();
  return (
    <div className="relative overflow-hidden">
      {/* Curve + hatching */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1160 400"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-[70%] w-full lg:h-full"
      >
        <defs>
          <pattern id="hatch" width="7" height="400" patternUnits="userSpaceOnUse">
            <line x1="0.5" y1="0" x2="0.5" y2="400" stroke="#10b981" strokeOpacity="0.28" />
          </pattern>
          <linearGradient id="curve-stroke" x1="0" x2="1">
            <stop offset="0" stopColor="#10b981" />
            <stop offset="1" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        <path d={`${CURVE} L1160 400 L0 400 Z`} fill="url(#hatch)" />
        <m.path
          d={CURVE}
          fill="none"
          stroke="url(#curve-stroke)"
          strokeWidth={2}
          initial={{ pathLength: reduced ? 1 : 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "0px 0px -20% 0px" }}
          transition={{ duration: reduced ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <div className="relative px-5 pb-40 pt-16 sm:px-10 lg:px-12 lg:pb-48 lg:pt-24">
        <Reveal>
          <Pill>At any scale</Pill>
          <TwoTone
            lead="Built for programs at any scale."
            rest="From one bootcamp to a multi-program network."
            className={`mt-5 max-w-md ${H2}`}
          />
        </Reveal>
        <dl className="mt-12 grid max-w-md grid-cols-2 gap-x-8 gap-y-8">
          {stats.map((s) => (
            <div key={s.label} className="border-l border-navy/25 pl-4">
              <dt className="sr-only">{s.label}</dt>
              <dd className="text-3xl font-medium tracking-tight">
                <CountUp value={s.value} />
              </dd>
              <dd className="mt-1 text-sm text-navy/55">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
