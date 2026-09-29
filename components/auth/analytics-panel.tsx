"use client";

import { animate, AnimatePresence, m } from "framer-motion";
import { Activity, Check, FileText, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/*
 * Sign-in panel: a dense, live analytics readout floating over the photo.
 * KPI row with sparklines, an area chart that draws in, a cohort-retention heatmap
 * and a live event feed. Figures match the rest of the site.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function Count({ to, suffix = "", run }: { to: number; suffix?: string; run: boolean }) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) return;
    const c = animate(0, to, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (x) => {
        setV(Math.round(x));
      },
    });
    return () => {
      c.stop();
    };
  }, [to, run]);
  return (
    <span className="tabular-nums">
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const KPIS = [
  { label: "Participants", value: 1247, suffix: "", delta: "+18%", spark: [4, 6, 5, 8, 9, 12, 14] },
  {
    label: "Completion",
    value: 87,
    suffix: "%",
    delta: "+6 pts",
    spark: [60, 64, 70, 69, 78, 83, 87],
  },
  {
    label: "Attendance",
    value: 92,
    suffix: "%",
    delta: "+3 pts",
    spark: [85, 88, 86, 90, 89, 91, 92],
  },
];

const SERIES = [38, 42, 40, 51, 55, 53, 62, 68, 66, 74, 81, 87];
const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/** Cohort retention: rows = cohorts, cols = weeks since start. */
const HEAT = [
  [100, 96, 93, 91, 90, 88, 87, 86],
  [100, 95, 92, 90, 87, 85, 84],
  [100, 97, 95, 92, 90, 89],
  [100, 94, 91, 88, 86],
  [100, 96, 94, 92],
  [100, 98, 95],
];

const EVENTS = [
  { icon: Check, text: "Adaeze N. checked in · Week 4", tone: "text-mint" },
  { icon: UserPlus, text: "New application · Women in STEM", tone: "text-gold" },
  { icon: FileText, text: "Impact report exported · Q3", tone: "text-white/80" },
  { icon: Check, text: "Kofi M. completed Pricing module", tone: "text-mint" },
  { icon: UserPlus, text: "New application · Agritech Accelerator", tone: "text-gold" },
];

function Spark({ data }: { data: number[] }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const pts = data
    .map(
      (d, i) =>
        `${String((i / (data.length - 1)) * 60)},${String(18 - ((d - min) / (max - min || 1)) * 16)}`,
    )
    .join(" ");
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-full" aria-hidden="true">
      <polyline
        points={pts}
        fill="none"
        stroke="#10b981"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AreaChart({ run }: { run: boolean }) {
  const W = 320;
  const H = 110;
  const max = 100;
  const x = (i: number) => (i / (SERIES.length - 1)) * W;
  const y = (v: number) => H - (v / max) * H;
  const line = SERIES.map((v, i) => `${i === 0 ? "M" : "L"}${String(x(i))},${String(y(v))}`).join(
    " ",
  );
  const area = `${line} L${String(W)},${String(H)} L0,${String(H)} Z`;
  return (
    <svg viewBox={`0 0 ${String(W)} ${String(H + 14)}`} className="w-full" aria-hidden="true">
      <defs>
        <linearGradient id="auth-area" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#f59e0b" stopOpacity="0.45" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((g) => (
        <line key={g} x1="0" x2={W} y1={H * g} y2={H * g} stroke="white" strokeOpacity="0.07" />
      ))}
      <m.path
        d={area}
        fill="url(#auth-area)"
        initial={{ opacity: run ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      />
      <m.path
        d={line}
        fill="none"
        stroke="#f59e0b"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: run ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.6, ease: EASE, delay: 0.3 }}
      />
      <m.circle
        cx={x(SERIES.length - 1)}
        cy={y(SERIES[SERIES.length - 1] ?? 0)}
        r="4"
        fill="#f59e0b"
        stroke="#0f172a"
        strokeWidth="2"
        initial={{ scale: run ? 0 : 1 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.9 }}
      />
      {MONTHS.map((mo, i) => (
        <text key={i} x={x(i)} y={H + 12} textAnchor="middle" className="fill-white/35 text-[8px]">
          {mo}
        </text>
      ))}
    </svg>
  );
}

export function AnalyticsPanel() {
  const reduced = usePrefersReducedMotion();
  const run = !reduced;
  const [event, setEvent] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setEvent((e) => (e + 1) % EVENTS.length);
    }, 2600);
    return () => {
      window.clearInterval(id);
    };
  }, [reduced]);

  const feed = [0, 1, 2]
    .map((k) => EVENTS[(event + k) % EVENTS.length])
    .filter((e) => e !== undefined);

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
            Impact overview
          </p>
          <p className="mt-0.5 text-sm font-semibold">All programs · 2026</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-mint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Live
        </span>
      </div>

      {/* KPIs */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {KPIS.map((k) => (
          <div key={k.label} className="rounded-xl bg-white/[0.05] p-2.5 ring-1 ring-white/10">
            <p className="text-[10px] text-white/50">{k.label}</p>
            <p className="mt-0.5 text-lg font-bold leading-tight">
              <Count to={k.value} suffix={k.suffix} run={run} />
            </p>
            <p className="text-[10px] font-semibold text-mint">{k.delta}</p>
            <Spark data={k.spark} />
          </div>
        ))}
      </div>

      {/* Trend */}
      <div className="mt-3 rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold">Completion rate</span>
          <span className="text-white/45">Monthly · %</span>
        </div>
        <div className="mt-2">
          <AreaChart run={run} />
        </div>
      </div>

      <div className="mt-3 grid grid-cols-[1.1fr_1fr] gap-3">
        {/* Cohort heatmap */}
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
          <p className="text-[11px] font-semibold">Cohort retention</p>
          <div className="mt-2 space-y-1">
            {HEAT.map((row, r) => (
              <div key={r} className="flex gap-1">
                {Array.from({ length: 8 }, (_, c) => {
                  const v = row[c];
                  return (
                    <m.span
                      key={c}
                      className="h-2.5 flex-1 rounded-[2px]"
                      style={{
                        background:
                          v === undefined
                            ? "rgba(255,255,255,0.04)"
                            : `rgba(16,185,129,${String(0.15 + ((v - 84) / 16) * 0.8)})`,
                      }}
                      initial={{ opacity: run ? 0 : 1 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: run ? 0.6 + (r + c) * 0.04 : 0 }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-2 text-[9px] text-white/40">Weeks since start →</p>
        </div>

        {/* Live feed */}
        <div className="rounded-xl bg-white/[0.04] p-3 ring-1 ring-white/10">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold">
            <Activity className="h-3 w-3 text-gold" aria-hidden="true" /> Activity
          </p>
          <ul className="relative mt-2 h-[84px] overflow-hidden">
            <AnimatePresence initial={false}>
              {feed.map((e, k) => (
                <m.li
                  key={`${String(event)}-${String(k)}`}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1 - k * 0.25, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0 : 0.35 }}
                  className="flex items-start gap-1.5 py-1 text-[10px] leading-snug text-white/75"
                >
                  <e.icon className={`mt-px h-3 w-3 shrink-0 ${e.tone}`} aria-hidden="true" />
                  {e.text}
                </m.li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </m.div>
  );
}
