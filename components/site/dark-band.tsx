import { ChartColumn, ClipboardList, FolderPlus, Users } from "lucide-react";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/motion/reveal";
import { DotGrid } from "@/components/texture/dot-grid";
import { BeyondShowcase } from "./beyond-showcase";
import { steps } from "./content";
import { COLUMN, Pill } from "./frame";

/*
 * The dark band (after Attio's "Universal Context" section).
 *   1. Heading over a glowing horizon arc: a planet edge with a gold -> mint rim light.
 *   2. The four steps as a hairline cell row.
 *   3. "More than applications": <BeyondShowcase />, a capability list beside a stage
 *      that plays a live moment of the active capability.
 */

const STEP_ICONS = [FolderPlus, ClipboardList, Users, ChartColumn];

/** The planet edge: an arc with a soft rim light that slowly shifts hue along it. */
function Horizon() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[220px] overflow-hidden sm:h-[300px] lg:h-[360px]"
    >
      <svg
        viewBox="0 0 1160 360"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="rim" x1="0" x2="1">
            <stop offset="0" stopColor="#f59e0b" stopOpacity="0" />
            <stop offset="0.25" stopColor="#f59e0b" />
            <stop offset="0.5" stopColor="#fde68a" />
            <stop offset="0.75" stopColor="#10b981" />
            <stop offset="1" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="planet" cx="0.5" cy="1.35" r="1.1">
            <stop offset="0.62" stopColor="#0b1222" />
            <stop offset="0.7" stopColor="#0f172a" />
          </radialGradient>
          <filter id="rim-blur" x="-10%" y="-50%" width="120%" height="200%">
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        {/* glow, then the crisp rim, then the planet body */}
        <path
          d="M-40 380 Q580 -40 1200 380"
          stroke="url(#rim)"
          strokeWidth="22"
          fill="none"
          filter="url(#rim-blur)"
          opacity="0.55"
        />
        <path d="M-40 380 Q580 -40 1200 380" stroke="url(#rim)" strokeWidth="1.5" fill="none" />
        <path d="M-40 381 Q580 -38 1200 381 Z" fill="url(#planet)" />
      </svg>
    </div>
  );
}

export function DarkBand() {
  return (
    <section id="how-it-works" className="relative border-b border-white/10 bg-navy text-white">
      <div className={`${COLUMN} relative lg:border-x lg:border-white/10`}>
        <PlayWhenVisible>
          {/* 1. Heading + horizon */}
          <div className="relative">
            <DotGrid id="band-grid" fade="top" />
            <Reveal className="relative px-5 pt-20 text-center sm:pt-28">
              <Pill tone="dark">How it works</Pill>
              <p className="mt-6 text-sm text-white/50">Four steps. One platform.</p>
              <h2 className="mt-2 text-[2.5rem] font-medium leading-none tracking-[-0.04em] sm:text-6xl lg:text-[5.5rem]">
                Up and running in minutes
              </h2>
            </Reveal>
            <Horizon />
          </div>

          {/* 2. Steps as cells */}
          <ol className="grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => {
              const Icon = STEP_ICONS[i] ?? FolderPlus;
              return (
                <li
                  key={s.n}
                  className={`px-6 py-8 lg:py-10 ${i > 0 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                    i % 2 === 1 ? "sm:border-l" : ""
                  } ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i > 0 ? "lg:border-l" : ""} border-white/10`}
                >
                  <Reveal index={i}>
                    <div className="flex items-center justify-between">
                      <Icon
                        className="h-5 w-5 text-white/70"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                      <span className="font-mono text-xs text-gold">{s.n}</span>
                    </div>
                    <h3 className="mt-10 text-[15px] font-medium">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{s.body}</p>
                  </Reveal>
                </li>
              );
            })}
          </ol>

          {/* 3. More than applications */}
          <BeyondShowcase />
        </PlayWhenVisible>
      </div>
    </section>
  );
}
