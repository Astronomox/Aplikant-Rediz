import {
  Award,
  BookOpen,
  ChartColumn,
  ClipboardList,
  FolderPlus,
  Trophy,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { DotGrid } from "@/components/texture/dot-grid";
import { beyond, steps } from "./content";
import { BTN, COLUMN, Eyebrow, PAD, SectionHead, TYPE } from "./frame";

/*
 * The dark band (after Attio's "Universal Context" section).
 *   1. Heading over a glowing horizon arc: a planet edge with a gold -> mint rim light.
 *   2. The four steps as a hairline cell row.
 *   3. "More than applications": the Growth-plan capabilities as a four-cell grid.
 * Steps and Beyond are exported separately for the /how-it-works and /features pages.
 */

const STEP_ICONS = [FolderPlus, ClipboardList, Users, ChartColumn];
const BEYOND_ICONS = [BookOpen, Award, Trophy, Video];

/** The planet edge: an arc with a soft rim light that slowly shifts hue along it. */
function Horizon() {
  return (
    <div
      aria-hidden="true"
      className="relative h-[110px] overflow-hidden sm:h-[200px] lg:h-[260px]"
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

/** The four steps as a row of hairline cells (navy). */
export function Steps() {
  return (
    <ol className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s, i) => {
        const Icon = STEP_ICONS[i] ?? FolderPlus;
        return (
          <li key={s.n} className={`bg-navy ${PAD.x} py-5 sm:py-7 lg:px-7`}>
            <Reveal index={i}>
              <div className="flex items-center justify-between">
                <Icon
                  className="h-4 w-4 text-white/70 sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <span className="font-mono text-xs text-gold">{s.n}</span>
              </div>
              <h3 className={`mt-3 sm:mt-5 ${TYPE.h3}`}>{s.title}</h3>
              <p className={`mt-1 ${TYPE.body} text-white/55`}>{s.body}</p>
            </Reveal>
          </li>
        );
      })}
    </ol>
  );
}

/** Growth-plan capabilities as a four-cell grid (navy). */
export function Beyond({ index }: { index?: string }) {
  return (
    <div className={`${PAD.x} ${PAD.y}`}>
      <Reveal>
        <SectionHead
          tone="dark"
          index={index}
          eyebrow="Growth & up"
          title="More than applications."
          lede="Courses, certificates, competitions and live sessions, in the same place."
        />
      </Reveal>
      <ul className="mt-6 grid gap-px bg-white/10 sm:mt-10 sm:grid-cols-2 lg:grid-cols-4">
        {beyond.map((b, i) => {
          const Icon = BEYOND_ICONS[i] ?? BookOpen;
          return (
            <li key={b.title} className="bg-navy py-4 sm:p-6">
              <Reveal index={i}>
                <Icon
                  className="h-4 w-4 text-gold sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <h3 className={`mt-3 sm:mt-4 ${TYPE.h3}`}>{b.title}</h3>
                <p className={`mt-1 ${TYPE.body} text-white/55`}>{b.body}</p>
              </Reveal>
            </li>
          );
        })}
      </ul>
      <Link href="/pricing" className={`${BTN.smallDark} mt-6 sm:mt-8`}>
        See plans <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

/** Homepage band: heading over the horizon, the steps, then Beyond. */
export function DarkBand({ index }: { index?: string }) {
  return (
    <section id="how-it-works" className="relative border-b border-white/10 bg-navy text-white">
      <div className={`${COLUMN} relative lg:border-x lg:border-white/10`}>
        <div className="relative">
          <DotGrid id="band-grid" fade="top" />
          <Reveal className={`relative ${PAD.x} pt-10 text-center sm:pt-16 lg:pt-24`}>
            <Eyebrow tone="dark" index={index}>
              How it works
            </Eyebrow>
            <h2 className={`mt-3 sm:mt-4 ${TYPE.display}`}>Up and running in minutes</h2>
            <p className={`mx-auto mt-3 max-w-md ${TYPE.lede} text-white/55`}>
              Four simple steps to transform how you manage programs.
            </p>
          </Reveal>
          <Horizon />
        </div>
        <Steps />
        <div className="border-t border-white/10">
          <Beyond />
        </div>
      </div>
    </section>
  );
}
