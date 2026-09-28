"use client";

import { m } from "framer-motion";
import { ChartColumn, ClipboardList, FolderPlus, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/motion/reveal";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { DotGrid } from "@/components/texture/dot-grid";
import { beyond, steps } from "./content";
import { BTN, COLUMN, Pill, TwoTone } from "./frame";

/*
 * The dark band (after Attio's "Universal Context" section).
 *   1. Heading over a glowing horizon arc: a planet edge with a gold -> mint rim light.
 *   2. The four steps as a hairline cell row.
 *   3. "More than applications": auto-cycling capability list with a progress
 *      underline beside a wireframe tunnel (Attio's Signals pattern).
 */

const STEP_ICONS = [FolderPlus, ClipboardList, Users, ChartColumn];
const CYCLE_MS = 3600;

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

/** Round to 2dp so server and client render identical attributes (trig differs in the last bits). */
const r2 = (v: number) => Math.round(v * 100) / 100;

/** Wireframe tunnel: ellipses receding to a vanishing point, rings drifting inward. */
function Tunnel() {
  const rings = [0, 1, 2, 3, 4, 5];
  const rays = Array.from({ length: 12 }, (_, i) => (i / 12) * Math.PI * 2);
  return (
    <svg viewBox="0 0 480 400" className="h-full w-full" aria-hidden="true" fill="none">
      {rays.map((a) => (
        <line
          key={a}
          x1={240}
          y1={230}
          x2={r2(240 + Math.cos(a) * 320)}
          y2={r2(230 + Math.sin(a) * 260)}
          stroke="white"
          strokeOpacity={0.09}
        />
      ))}
      {rings.map((i) => (
        <ellipse
          key={i}
          cx={240}
          cy={230}
          rx={40 + i * 42}
          ry={14 + i * 16}
          stroke={i === 2 ? "#f59e0b" : "white"}
          strokeOpacity={i === 2 ? 0.55 : 0.12}
          className="fx-tunnel"
          style={{ animationDelay: `${String(-i * 1.1)}s` }}
        />
      ))}
      {/* signal points falling into the tunnel */}
      {[0.4, 1.9, 3.3, 4.6].map((a, i) => (
        <circle
          key={a}
          cx={r2(240 + Math.cos(a) * 170)}
          cy={r2(230 + Math.sin(a) * 90)}
          r={2.2}
          fill={i % 2 ? "#10b981" : "#fde68a"}
          className="fx-fall"
          style={{ animationDelay: `${String(-i * 0.9)}s`, transformOrigin: "240px 230px" }}
        />
      ))}
    </svg>
  );
}

function BeyondList() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
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
    if (!visible || reduced) return;
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % beyond.length);
    }, CYCLE_MS);
    return () => {
      window.clearInterval(id);
    };
  }, [visible, reduced, active]);

  return (
    <div ref={ref}>
      <ul>
        {beyond.map((b, i) => {
          const on = i === active;
          return (
            <li key={b.title} className="border-b border-white/10">
              <button
                type="button"
                aria-expanded={on}
                onClick={() => {
                  setActive(i);
                }}
                className="w-full py-4 text-left"
              >
                <span
                  className={`block text-[15px] font-medium ${on ? "text-white" : "text-white/45"}`}
                >
                  {b.title}
                </span>
                <span
                  className={`grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none ${
                    on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="block pt-1.5 text-sm text-white/55">{b.body}</span>
                  </span>
                </span>
              </button>
              {/* progress underline for the active item */}
              <div className="-mb-px h-px overflow-hidden">
                {on && (
                  <m.div
                    key={`${String(active)}-${String(visible)}`}
                    className="h-px origin-left bg-gold"
                    initial={{ scaleX: reduced || !visible ? 1 : 0 }}
                    animate={{ scaleX: 1 }}
                    transition={
                      reduced || !visible
                        ? { duration: 0 }
                        : { duration: CYCLE_MS / 1000, ease: "linear" }
                    }
                  />
                )}
              </div>
            </li>
          );
        })}
      </ul>
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
          <div className="grid border-t border-white/10 lg:grid-cols-2">
            <div className="px-5 py-14 sm:px-10 lg:px-12 lg:py-20">
              <Reveal>
                <Pill tone="dark">Growth &amp; up</Pill>
                <TwoTone
                  tone="dark"
                  lead="More than applications."
                  rest="Courses, certificates, competitions and live sessions, in the same place."
                  className="mt-5 max-w-xl text-[1.75rem] leading-[1.12] sm:text-3xl lg:text-[2.25rem]"
                />
                <a href="#pricing" className={`${BTN.smallDark} mt-6`}>
                  See plans <span aria-hidden="true">→</span>
                </a>
              </Reveal>
              <div className="mt-12 max-w-md">
                <BeyondList />
              </div>
            </div>
            <div className="relative hidden min-h-[440px] items-center justify-center border-l border-white/10 lg:flex">
              <Tunnel />
            </div>
          </div>
        </PlayWhenVisible>
      </div>
    </section>
  );
}
