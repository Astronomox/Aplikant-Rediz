"use client";

import { m, type Transition, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { REVEAL_EASE, STAGGER } from "@/components/motion/reveal";

/*
 * Animated versions of the six lucide-react feature icons.
 *
 * Geometry is lucide-react 1.48.0's own icon node data (file-stack, clipboard-check,
 * users, chart-column, zap, shield-check), rendered with the same 24x24 grid, 2px
 * stroke and round caps/joins as <LucideIcon />. lucide-react does not export this
 * data publicly, and per-part motion (sheets fanning, figures separating, bars
 * growing) is impossible through its single opaque <svg>, so each element is
 * rendered here as an `m.*` SVG element. If lucide is upgraded and an icon's
 * design changes, update the matching `d`/attrs below.
 *
 * Variant labels propagate from the parent card:
 *   hidden  -> before scroll-in (strokes undrawn)
 *   visible -> strokes drawn in, staggered by the card's index
 *   hover   -> per-icon micro-interaction, same timing as the icon chip
 */

/** Shared by every icon part and by the chip, so they move as one. */
const HOVER_TRANSITION: Transition = { duration: 0.35, ease: REVEAL_EASE };

const DRAW_DURATION = 0.7;
const DRAW_START = 0.2; // after the card itself has started fading up
const PART_STAGGER = 0.08;

// Palette gold (#f59e0b in tailwind.config.ts). Used only for the Zap hover fill.
const GOLD = "#f59e0b";

/**
 * Stroke draw-in for one element of an icon.
 * `rest` holds the at-rest value of anything the hover state changes, so leaving
 * hover animates back with the quick hover timing instead of the draw-in delay.
 */
function draw(
  cardIndex: number,
  partIndex: number,
  { hover, rest }: { hover?: Variants["hover"]; rest?: Record<string, string | number> } = {},
): Variants {
  const delay = cardIndex * STAGGER + DRAW_START + partIndex * PART_STAGGER;
  return {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      ...rest,
      transition: {
        pathLength: { delay, duration: DRAW_DURATION, ease: "easeInOut" },
        // Round caps would show a dot at pathLength 0, so stay hidden until drawing starts.
        opacity: { delay, duration: 0.01 },
        default: HOVER_TRANSITION,
      },
    },
    ...(hover ? { hover } : {}),
  };
}

/**
 * A group that only moves on hover (no draw-in of its own).
 *
 * `hidden` must carry the at-rest transform: framer-motion 11 only measures an SVG
 * element's bbox (needed to apply any SVG transform) during a React render in which
 * the element already has a transform value. Hover is a gesture, not a render, so a
 * group with no transform at mount is never measured and its hover motion is dropped.
 */
function moveOnHover(hover: Variants["hover"], rest: Record<string, number>): Variants {
  return {
    hidden: rest,
    visible: { ...rest, transition: HOVER_TRANSITION },
    hover,
  };
}

/** Check mark re-draws on hover; ends at pathLength 1 so leaving hover is a no-op. */
const redrawCheck = { pathLength: [0, 1], transition: { duration: 0.45, ease: "easeOut" } };

function IconSvg({ children, className }: { children: ReactNode; className: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`overflow-visible ${className}`}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

interface IconProps {
  index: number;
  /** Size and colour; the icon strokes with currentColor. */
  className?: string;
}

/** Program Management (file-stack): the three sheets fan open along the diagonal. */
function ProgramsIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.g
        variants={moveOnHover({ x: -1.5, y: 1.5, transition: HOVER_TRANSITION }, { x: 0, y: 0 })}
      >
        <m.path
          d="M11 21a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1"
          variants={draw(index, 2)}
        />
      </m.g>
      <m.path d="M16 16a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1" variants={draw(index, 1)} />
      <m.g
        variants={moveOnHover({ x: 1.5, y: -1.5, transition: HOVER_TRANSITION }, { x: 0, y: 0 })}
      >
        <m.path
          d="M21 6a2 2 0 0 0-.586-1.414l-2-2A2 2 0 0 0 17 2h-3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1z"
          variants={draw(index, 0)}
        />
      </m.g>
    </IconSvg>
  );
}

/** Smart Applications (clipboard-check): tilts back on its base; the check re-draws. */
function ApplicationsIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.g
        style={{ originX: 0.5, originY: 1 }}
        variants={moveOnHover({ rotate: -8, transition: HOVER_TRANSITION }, { rotate: 0 })}
      >
        <m.rect width="8" height="4" x="8" y="2" rx="1" ry="1" variants={draw(index, 1)} />
        <m.path
          d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"
          variants={draw(index, 0)}
        />
        <m.path d="m9 14 2 2 4-4" variants={draw(index, 2, { hover: redrawCheck })} />
      </m.g>
    </IconSvg>
  );
}

/** Participant Tracking (users): the two figures step apart. */
function ParticipantsIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.g variants={moveOnHover({ x: -1.25, transition: HOVER_TRANSITION }, { x: 0 })}>
        <m.circle cx="9" cy="7" r="4" variants={draw(index, 0)} />
        <m.path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" variants={draw(index, 1)} />
      </m.g>
      <m.g variants={moveOnHover({ x: 1.5, transition: HOVER_TRANSITION }, { x: 0 })}>
        <m.path d="M16 3.128a4 4 0 0 1 0 7.744" variants={draw(index, 2)} />
        <m.path d="M22 21v-2a4 4 0 0 0-3-3.87" variants={draw(index, 3)} />
      </m.g>
    </IconSvg>
  );
}

/**
 * Impact Reports (chart-column): bars grow left to right.
 * Animates each bar's `d` (same command shape, longer vertical) rather than scaleY,
 * so the round caps keep their shape instead of stretching.
 */
const BARS = [
  { rest: "M8 17v-3", grown: "M8 17v-7" },
  { rest: "M13 17V5", grown: "M13 17V3" },
  { rest: "M18 17V9", grown: "M18 17V5.5" },
] as const;

function ReportsIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.path d="M3 3v16a2 2 0 0 0 2 2h16" variants={draw(index, 0)} />
      {BARS.map((bar, i) => (
        <m.path
          key={bar.rest}
          d={bar.rest}
          variants={draw(index, i + 1, {
            rest: { d: bar.rest },
            hover: { d: bar.grown, transition: { ...HOVER_TRANSITION, delay: i * 0.05 } },
          })}
        />
      ))}
    </IconSvg>
  );
}

/** M&E Surveys (zap): a short jolt as it "charges" with a gold fill. */
function SurveysIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.g
        variants={{
          hidden: { rotate: 0, scale: 1 }, // see moveOnHover: needed so the group is measured
          visible: { rotate: 0, scale: 1, transition: HOVER_TRANSITION },
          hover: {
            rotate: [0, -10, 7, -3, 0],
            scale: [1, 1.08, 1],
            transition: { duration: 0.45, ease: "easeOut" },
          },
        }}
      >
        <m.path
          d="M15.914 4a1.5 1.5 0 00-2.474-1.561l-9 9A1.5 1.5 0 005.5 14h4.002a.5.5 0 01.471.666L8.086 20a1.5 1.5 0 002.475 1.56l9-9A1.5 1.5 0 0018.5 10h-3.997a.5.5 0 01-.472-.667z"
          fill={GOLD}
          fillOpacity={0}
          variants={draw(index, 0, {
            rest: { fillOpacity: 0 },
            hover: { fillOpacity: 1, transition: HOVER_TRANSITION },
          })}
        />
      </m.g>
    </IconSvg>
  );
}

/** Role-Based Access (shield-check): the shield lifts and its check re-draws. */
function AccessIcon({ index, className = "h-5 w-5" }: IconProps) {
  return (
    <IconSvg className={className}>
      <m.g variants={moveOnHover({ y: -1.5, transition: HOVER_TRANSITION }, { y: 0 })}>
        <m.path
          d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
          variants={draw(index, 0)}
        />
        <m.path d="m9 12 2 2 4-4" variants={draw(index, 1, { hover: redrawCheck })} />
      </m.g>
    </IconSvg>
  );
}

export const animatedFeatureIcons = {
  programs: ProgramsIcon,
  applications: ApplicationsIcon,
  participants: ParticipantsIcon,
  reports: ReportsIcon,
  surveys: SurveysIcon,
  access: AccessIcon,
} as const;
