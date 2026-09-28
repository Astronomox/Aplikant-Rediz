"use client";

import { AnimatePresence, m } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { satellites, stages } from "./stages";

/*
 * Desktop hero motion graphic: the "program engine".
 *
 *   - Hub: the Aplikant mark (cropped from the real logo file) with ping rings.
 *   - Outer orbit: the three lifecycle stages. Inner orbit: supporting capabilities.
 *     Orbits rotate in opposite directions; nodes counter-rotate to stay upright.
 *   - Spokes carry gold/mint signal pulses into the hub. A radar sweep turns behind.
 *   - The active stage auto-cycles (Apply -> Track -> Report) and drives the readout
 *     card. Clicking a node selects it and pauses the cycle for a few seconds.
 *
 * Rotation, pulses and sweep are CSS (fx-* in globals.css): compositor-only, paused
 * off screen by the parent <PlayWhenVisible>, disabled under reduced motion.
 * Decorative geometry is aria-hidden; the stage buttons and readout are real UI.
 */

const SIZE = 520;
const C = SIZE / 2;
const OUTER = 206;
const INNER = 124;
const CYCLE_MS = 3200;
const RESUME_AFTER_MS = 9000;

const STAGE_ANGLES = [-90, 30, 150];
const SATELLITE_ANGLES = [-30, 90, 210];

function polar(r: number, deg: number) {
  const a = (deg * Math.PI) / 180;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
}
const pct = (v: number) => `${String((v / SIZE) * 100)}%`;

function Spokes({
  radius,
  angles,
  active,
  tone,
}: {
  radius: number;
  angles: number[];
  active: number | null;
  tone: "gold" | "mint";
}) {
  const color = tone === "gold" ? "#f59e0b" : "#10b981";
  return (
    <svg viewBox={`0 0 ${String(SIZE)} ${String(SIZE)}`} className="absolute inset-0 h-full w-full">
      {angles.map((deg, i) => {
        const p = polar(radius, deg);
        const on = active === i;
        return (
          <g key={deg}>
            <line
              x1={p.x}
              y1={p.y}
              x2={C}
              y2={C}
              stroke={on ? color : "white"}
              strokeOpacity={on ? 0.45 : 0.08}
              strokeWidth={1}
            />
            {/* Signal pulse travelling from the node into the hub */}
            <line
              x1={p.x}
              y1={p.y}
              x2={C}
              y2={C}
              pathLength={100}
              stroke={color}
              strokeWidth={on ? 2.5 : 1.5}
              strokeOpacity={on ? 1 : 0.6}
              strokeLinecap="round"
              strokeDasharray="7 93"
              strokeDashoffset={100}
              className="fx-dash"
              style={{ animationDelay: `${String(-i * 0.8)}s` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

const READOUT_BELOW = "left-1/2 top-[calc(100%-1.5rem)] -translate-x-1/2";

/**
 * @param readoutClassName positions the readout card relative to the orbit
 *   (default: centred below it, hanging over whatever comes next).
 */
export function HeroEngine({ readoutClassName = READOUT_BELOW }: { readoutClassName?: string }) {
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [auto, setAuto] = useState(true);
  const [visible, setVisible] = useState(true);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e) setVisible(e.isIntersecting);
    });
    io.observe(el);
    return () => {
      io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!auto || !visible || reduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % stages.length);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [auto, visible, reduced]);

  useEffect(
    () => () => {
      window.clearTimeout(resumeTimer.current);
    },
    [],
  );

  const select = (i: number) => {
    setActive(i);
    setAuto(false);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      setAuto(true);
    }, RESUME_AFTER_MS);
  };

  const stage = stages[active];
  if (!stage) return null;
  const running = auto && visible && !reduced;
  const t = reduced ? { duration: 0 } : { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <div ref={root} className="relative mx-auto aspect-square w-full max-w-[520px]">
      {/* Radar sweep */}
      <div
        aria-hidden="true"
        className="absolute inset-[4%] rounded-full [mask-image:radial-gradient(circle,black_25%,transparent_70%)]"
      >
        <div className="fx-radar absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,158,11,0.22)_50deg,transparent_75deg)]" />
      </div>

      {/* Static orbit rings */}
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${String(SIZE)} ${String(SIZE)}`}
        className="absolute inset-0 h-full w-full"
      >
        <circle cx={C} cy={C} r={OUTER + 40} fill="none" stroke="white" strokeOpacity={0.04} />
        <circle
          cx={C}
          cy={C}
          r={OUTER}
          fill="none"
          stroke="white"
          strokeOpacity={0.12}
          strokeDasharray="2 7"
        />
        <circle
          cx={C}
          cy={C}
          r={INNER}
          fill="none"
          stroke="white"
          strokeOpacity={0.1}
          strokeDasharray="2 5"
        />
        <circle cx={C} cy={C} r={70} fill="none" stroke="#f59e0b" strokeOpacity={0.18} />
      </svg>

      {/* Inner orbit: supporting capabilities (decorative) */}
      <div aria-hidden="true" className="fx-spin-60-rev absolute inset-0">
        <Spokes radius={INNER} angles={SATELLITE_ANGLES} active={null} tone="mint" />
        {satellites.map((s, i) => {
          const p = polar(INNER, SATELLITE_ANGLES[i] ?? 0);
          return (
            <div
              key={s.label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(p.x), top: pct(p.y) }}
            >
              <div className="fx-spin-60 flex h-10 w-10 items-center justify-center rounded-xl bg-navy/80 text-mint ring-1 ring-mint/30 backdrop-blur">
                <s.icon className="h-[18px] w-[18px]" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Outer orbit: lifecycle stages (interactive) */}
      <div className="fx-spin-90 absolute inset-0">
        <div aria-hidden="true">
          <Spokes radius={OUTER} angles={STAGE_ANGLES} active={active} tone="gold" />
        </div>
        {stages.map((s, i) => {
          const p = polar(OUTER, STAGE_ANGLES[i] ?? 0);
          const on = i === active;
          return (
            <div
              key={s.step}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pct(p.x), top: pct(p.y) }}
            >
              <div className="fx-spin-90-rev flex flex-col items-center gap-2">
                <button
                  type="button"
                  aria-pressed={on}
                  aria-label={`${s.label}: ${s.title}`}
                  onClick={() => {
                    select(i);
                  }}
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 motion-reduce:transition-none ${
                    on
                      ? "scale-110 bg-gold text-navy shadow-[0_0_0_6px_rgba(245,158,11,0.18),0_0_48px_rgba(245,158,11,0.55)]"
                      : "bg-navy/80 text-gold ring-1 ring-white/15 backdrop-blur hover:ring-gold/60"
                  }`}
                >
                  <s.icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <span
                  className={`text-[11px] font-semibold uppercase tracking-[0.18em] transition-colors duration-500 ${
                    on ? "text-gold" : "text-white/45"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hub */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <span className="fx-ping absolute inset-0 rounded-full ring-2 ring-gold/50" />
        <span
          className="fx-ping absolute inset-0 rounded-full ring-2 ring-mint/40"
          style={{ animationDelay: "-1.3s" }}
        />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-navy shadow-[0_0_0_1px_rgba(245,158,11,0.45),0_0_60px_rgba(245,158,11,0.35),inset_0_0_24px_rgba(245,158,11,0.18)]">
          {/* The mark, cropped from the real 2:1 wordmark file */}
          <div className="relative h-12 w-12 overflow-hidden">
            <Image
              src="/logo-white.png"
              alt=""
              width={220}
              height={110}
              className="absolute max-w-none"
              style={{ left: -3, top: -32 }}
            />
          </div>
        </div>
      </div>

      {/* Readout: the active stage. Sits below the orbit (so no rotating node ever
          passes under it) and hangs across the hero/features seam. */}
      <div
        className={`absolute w-[320px] rounded-2xl bg-white p-5 text-navy shadow-[0_30px_60px_-24px_rgba(0,0,0,0.6)] ring-1 ring-navy/10 ${readoutClassName}`}
      >
        {/* Outgoing and incoming stages share one grid cell and crossfade, so the
            card is never empty mid-transition. */}
        <div className="grid">
          <AnimatePresence initial={false}>
            <m.div
              key={stage.step}
              className="[grid-area:1/1]"
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={t}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold">
                  <stage.icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-navy/45">
                  {stage.step} · {stage.label}
                </span>
                {stage.ai && (
                  <span className="ml-auto rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
                    AI POWERED
                  </span>
                )}
              </div>
              <p className="mt-3 font-semibold">{stage.title}</p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {stage.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-cream px-2 py-1 text-[11px] font-medium text-navy/65 ring-1 ring-navy/5"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>
        {/* Time until the next stage */}
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-navy/10" aria-hidden="true">
          <m.div
            key={`${stage.step}-${String(running)}`}
            className="h-full origin-left rounded-full bg-gradient-to-r from-gold to-mint"
            initial={{ scaleX: running ? 0 : 1 }}
            animate={{ scaleX: 1 }}
            transition={running ? { duration: CYCLE_MS / 1000, ease: "linear" } : { duration: 0 }}
          />
        </div>
      </div>
    </div>
  );
}
