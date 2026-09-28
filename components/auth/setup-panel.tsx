"use client";

import { m } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/*
 * Sign-up panel: a workspace setting itself up. A setup checklist ticks through while
 * the first program's application funnel fills in beside it. Loops while visible.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

const SETUP = [
  "Create your organization",
  "Create your first program",
  "Build the application form",
  "Share your branded link",
  "Invite your team",
];

const FUNNEL = [
  { label: "Applied", value: 342, color: "bg-white/80" },
  { label: "Scored", value: 268, color: "bg-gold/80" },
  { label: "Shortlisted", value: 120, color: "bg-gold" },
  { label: "Enrolled", value: 48, color: "bg-mint" },
];

const CYCLE = SETUP.length + 4;
const APPLIED = 342;

export function SetupPanel() {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setTick((t) => (t + 1) % CYCLE);
    }, 900);
    return () => {
      window.clearInterval(id);
    };
  }, [reduced]);

  const done = reduced ? SETUP.length : Math.min(tick, SETUP.length);
  const pct = Math.round((done / SETUP.length) * 100);
  const funnelOn = reduced || done >= 3;

  return (
    <m.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.8, ease: EASE }}
      className="w-full max-w-[460px] rounded-2xl bg-navy/70 p-5 text-white shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-white/10 backdrop-blur-xl"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45">
            New workspace
          </p>
          <p className="mt-0.5 text-sm font-semibold">Ready in 5 minutes</p>
        </div>
        <span className="text-2xl font-bold tabular-nums text-gold">{pct}%</span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <m.div
          className="h-full rounded-full bg-gradient-to-r from-gold to-mint"
          animate={{ width: `${String(pct)}%` }}
          transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
        />
      </div>

      <ul className="mt-4 space-y-2">
        {SETUP.map((s, i) => {
          const ok = i < done;
          const now = i === done && !reduced;
          return (
            <li
              key={s}
              className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-xs ring-1 transition-colors duration-300 ${
                now ? "bg-white/[0.07] ring-gold/40" : "ring-transparent"
              }`}
            >
              <span
                className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                  ok ? "bg-mint text-navy" : "ring-1 ring-white/20"
                }`}
              >
                {ok ? (
                  <Check className="h-3 w-3" strokeWidth={3} aria-hidden="true" />
                ) : now ? (
                  <Loader2 className="h-3 w-3 animate-spin text-gold" aria-hidden="true" />
                ) : null}
              </span>
              <span className={ok ? "text-white" : "text-white/55"}>{s}</span>
            </li>
          );
        })}
      </ul>

      {/* First program: application funnel */}
      <div className="mt-4 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold">Tech Founders Bootcamp</span>
          <span className="text-white/45">Applications</span>
        </div>
        <div className="mt-3 space-y-2">
          {FUNNEL.map((f, i) => (
            <div key={f.label} className="flex items-center gap-2 text-[10px]">
              <span className="w-16 text-white/55">{f.label}</span>
              <span className="relative h-3 flex-1 overflow-hidden rounded-sm bg-white/[0.06]">
                <m.span
                  className={`absolute inset-y-0 left-0 rounded-sm ${f.color}`}
                  initial={false}
                  animate={{ width: funnelOn ? `${String((f.value / APPLIED) * 100)}%` : "0%" }}
                  transition={{
                    duration: reduced ? 0 : 0.8,
                    delay: reduced ? 0 : i * 0.12,
                    ease: EASE,
                  }}
                />
              </span>
              <span className="w-7 text-right font-semibold tabular-nums">
                {funnelOn ? f.value : 0}
              </span>
            </div>
          ))}
        </div>
      </div>
    </m.div>
  );
}
