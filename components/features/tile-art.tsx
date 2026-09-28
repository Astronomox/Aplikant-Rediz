"use client";

import { animate, AnimatePresence, m } from "framer-motion";
import { Check, FileText, Loader2, Sparkles } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useTicker } from "@/components/motion/use-ticker";
import type { FeatureKey } from "@/components/site/content";

/*
 * Looping product vignettes for the platform feature panels: small, choreographed
 * moments of the real workflow (check-ins, an applications pipeline, a report building
 * itself…). Each runs on useTicker, so it pauses off screen and shows a finished
 * frame under prefers-reduced-motion. Figures match the hero dashboard.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 text-navy shadow-[0_24px_48px_-28px_rgba(15,23,42,0.45)] ring-1 ring-navy/10 ${className}`}
    >
      {children}
    </div>
  );
}

/** Counts up from 0 when mounted. */
function CountTo({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const c = animate(0, to, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (x) => {
        setV(Math.round(x));
      },
    });
    return () => {
      c.stop();
    };
  }, [to]);
  return (
    <span className="tabular-nums">
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const AVATAR_TONES = [
  "bg-[#fde68a] text-[#92400e]",
  "bg-[#bbf7d0] text-[#166534]",
  "bg-[#bfdbfe] text-[#1e3a8a]",
  "bg-[#fbcfe8] text-[#9d174d]",
  "bg-[#ddd6fe] text-[#5b21b6]",
  "bg-[#fed7aa] text-[#9a3412]",
];
const tone = (i: number) => AVATAR_TONES[i % AVATAR_TONES.length] ?? "";

// ---------------------------------------------------------------- Program management

const MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const TODAY = 0.58; // fraction of the year
const PORTFOLIO = [
  { name: "Agritech Accelerator", type: "Accelerator", from: 0.04, to: 0.42, progress: 1 },
  { name: "Tech Founders Bootcamp", type: "Bootcamp", from: 0.08, to: 0.8, progress: 0.65 },
  { name: "Women in STEM Fellowship", type: "Fellowship", from: 0.2, to: 0.95, progress: 0.32 },
  { name: "Youth Civic Fellowship", type: "Fellowship", from: 0.46, to: 0.99, progress: 0.18 },
];
const NEW_PROGRAM = { name: "Design Sprint Workshop", type: "Workshop", from: 0.66, to: 0.84 };

function Bar({
  from,
  to,
  progress,
  show,
  delay,
  instant,
  fresh = false,
}: {
  from: number;
  to: number;
  progress: number;
  show: boolean;
  delay: number;
  instant: boolean;
  fresh?: boolean;
}) {
  const done = progress >= 1;
  return (
    <div className="relative h-5">
      <m.div
        className={`absolute top-0 h-5 overflow-hidden rounded-md ${
          fresh ? "bg-gold/20 ring-1 ring-gold/50" : done ? "bg-mint/20" : "bg-navy/[0.07]"
        }`}
        style={{ left: `${String(from * 100)}%` }}
        initial={false}
        animate={{ width: show ? `${String((to - from) * 100)}%` : "0%" }}
        transition={{ duration: instant ? 0 : 0.7, delay: instant ? 0 : delay, ease: EASE }}
      >
        <m.div
          className={`h-full rounded-md ${done ? "bg-mint" : "bg-gradient-to-r from-gold to-mint"}`}
          initial={false}
          animate={{ width: show ? `${String(progress * 100)}%` : "0%" }}
          transition={{ duration: instant ? 0 : 0.8, delay: instant ? 0 : delay + 0.5, ease: EASE }}
        />
      </m.div>
      {done && show && (
        <m.span
          initial={instant ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: instant ? 0 : delay + 1.1 }}
          className="absolute top-0.5 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full bg-mint text-white ring-2 ring-white"
          style={{ left: `${String(to * 100)}%` }}
        >
          <Check className="h-2.5 w-2.5" strokeWidth={4} />
        </m.span>
      )}
    </div>
  );
}

function PortfolioVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 500);
  const t = reduced ? 12 : tick % 18;
  const show = t >= 1;
  const added = t >= 8;

  return (
    <div ref={ref} className="w-[320px] sm:w-[440px]">
      <Panel>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold">Program portfolio · 2026</p>
            <p className="text-[10px] text-navy/50">Trainings, bootcamps, fellowships, workshops</p>
          </div>
          <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
            Unlimited
          </span>
        </div>

        <div className="relative mt-4 grid grid-cols-[var(--label)_1fr] gap-x-3 [--label:92px] sm:[--label:152px]">
          <span />
          <div className="relative grid grid-cols-12 pb-1.5 text-center text-[9px] font-medium text-navy/35">
            {MONTHS.map((mo, i) => (
              <span key={i}>{mo}</span>
            ))}
          </div>

          {PORTFOLIO.map((p, i) => (
            <div key={p.name} className="contents">
              <div className="min-w-0 border-t border-navy/5 py-1.5">
                <p className="truncate text-[11px] font-semibold">{p.name}</p>
                <p className="text-[9px] text-navy/45">{p.type}</p>
              </div>
              <div className="border-t border-navy/5 py-2.5">
                <Bar
                  from={p.from}
                  to={p.to}
                  progress={p.progress}
                  show={show}
                  delay={i * 0.12}
                  instant={reduced}
                />
              </div>
            </div>
          ))}

          {/* A new program slides in: the portfolio has no ceiling */}
          <m.div
            className="col-span-2 grid grid-cols-subgrid overflow-hidden"
            initial={false}
            animate={{ height: added ? "auto" : 0, opacity: added ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
          >
            <div className="min-w-0 border-t border-navy/5 py-1.5">
              <p className="truncate text-[11px] font-semibold">{NEW_PROGRAM.name}</p>
              <p className="flex items-center gap-1 text-[9px] text-navy/45">
                {NEW_PROGRAM.type}
                <span className="rounded bg-gold/20 px-1 font-bold text-[#b45309]">New</span>
              </p>
            </div>
            <div className="border-t border-navy/5 py-2.5">
              <Bar
                from={NEW_PROGRAM.from}
                to={NEW_PROGRAM.to}
                progress={0}
                show={added}
                delay={0.25}
                instant={reduced}
                fresh
              />
            </div>
          </m.div>

          {/* Today marker across the timeline column */}
          <span
            className="pointer-events-none absolute bottom-0 top-5 w-px bg-[#ef4444]/70"
            style={{
              left: `calc(var(--label) + 0.75rem + (100% - var(--label) - 0.75rem) * ${String(TODAY)})`,
            }}
          >
            <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full rounded bg-[#ef4444] px-1 text-[8px] font-bold text-white">
              Today
            </span>
          </span>
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- Participant tracking

const ROSTER = [
  "Adaeze",
  "Tunde",
  "Ngozi",
  "Kofi",
  "Amara",
  "Bayo",
  "Chidi",
  "Zainab",
  "Emeka",
  "Fola",
  "Halima",
  "Ife",
  "Jide",
  "Kemi",
  "Lanre",
  "Musa",
  "Nneka",
  "Obi",
  "Remi",
  "Sade",
  "Tobi",
  "Uche",
  "Wale",
  "Yetunde",
];
/** Check-in order; the last three stay absent. */
const CHECKIN = [
  5, 12, 0, 19, 8, 22, 3, 15, 10, 1, 17, 6, 21, 13, 2, 9, 23, 16, 4, 11, 18, 7, 14, 20,
];
const PRESENT_MAX = 21;

function AttendanceVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 260);
  const t = tick % (PRESENT_MAX + 12);
  const present = reduced ? PRESENT_MAX : Math.min(t + 1, PRESENT_MAX);
  const presentSet = new Set(CHECKIN.slice(0, present));
  const lastIdx = CHECKIN[present - 1] ?? 0;
  const pct = present / ROSTER.length;

  return (
    <div ref={ref} className="w-[320px] sm:w-[400px]">
      <Panel>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[13px] font-semibold">Week 4 · Tech Founders Bootcamp</p>
            <p className="text-[11px] text-navy/50">Session attendance</p>
          </div>
          <span className="flex items-center gap-1.5 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> Live
          </span>
        </div>

        <div className="mt-3 flex items-center gap-4">
          <div className="grid flex-1 grid-cols-8 gap-1.5">
            {ROSTER.map((name, i) => {
              const on = presentSet.has(i);
              const fresh = i === lastIdx && !reduced;
              return (
                <span
                  key={name}
                  className="relative flex aspect-square items-center justify-center"
                >
                  {fresh && (
                    <m.span
                      key={`pulse-${String(present)}`}
                      className="absolute inset-0 rounded-full ring-2 ring-mint"
                      initial={{ scale: 1, opacity: 0.9 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 0.7 }}
                    />
                  )}
                  <span
                    className={`flex h-full w-full items-center justify-center rounded-full text-[9px] font-bold transition-all duration-300 ${
                      on ? `${tone(i)} ring-2 ring-mint` : "bg-navy/[0.06] text-navy/30"
                    }`}
                  >
                    {name.slice(0, 2)}
                  </span>
                  {on && (
                    <m.span
                      initial={reduced ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-full bg-mint text-white ring-2 ring-white"
                    >
                      <Check className="h-2 w-2" strokeWidth={4} />
                    </m.span>
                  )}
                </span>
              );
            })}
          </div>

          <div className="flex w-16 flex-col items-center">
            <div className="relative h-16 w-16">
              <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#0f172a"
                  strokeOpacity={0.07}
                  strokeWidth="3.5"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15.9"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  pathLength={100}
                  strokeDasharray={`${String(pct * 100)} 100`}
                  className="transition-[stroke-dasharray] duration-300"
                />
              </svg>
              <p className="absolute inset-0 flex items-center justify-center text-sm font-bold tabular-nums">
                {Math.round(pct * 100)}%
              </p>
            </div>
            <p className="mt-1 text-[10px] font-medium tabular-nums text-navy/50">
              {present}/{ROSTER.length} present
            </p>
          </div>
        </div>

        <div className="relative mt-3 h-8">
          <AnimatePresence initial={false}>
            <m.div
              key={present}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center gap-2 rounded-lg bg-cream px-2.5 text-[11px] ring-1 ring-mint/25"
            >
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-mint text-white">
                <Check className="h-2.5 w-2.5" strokeWidth={4} />
              </span>
              <span className="font-semibold">{ROSTER[lastIdx]}</span>
              <span className="text-navy/55">checked in via QR</span>
              <span className="ml-auto text-navy/40">just now</span>
            </m.div>
          </AnimatePresence>
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- Smart applications

const APPLICANTS = [
  { name: "Adaeze O.", score: 92 },
  { name: "Kofi M.", score: 88 },
  { name: "Zainab A.", score: 86 },
  { name: "Tunde B.", score: 71 },
  { name: "Ife K.", score: 64 },
];
const COLUMNS = ["Submitted", "Scored", "Shortlisted"] as const;
const COL_W = 118;
const COL_GAP = 10;
const ROW_H = 54;
const SHORTLIST_AT = 80;

/** 0 submitted, 1 scored, 2 shortlisted; applicant i moves every two ticks after 1 + 2i. */
function stageOf(i: number, t: number) {
  const start = 1 + i * 2;
  if (t < start) return 0;
  if (t < start + 2) return 1;
  return (APPLICANTS[i]?.score ?? 0) >= SHORTLIST_AT ? 2 : 1;
}

function PipelineVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 700);
  const t = reduced ? 6 : tick % 17;
  const stages = APPLICANTS.map((_, i) => stageOf(i, t));

  return (
    <div ref={ref} className="w-[320px] sm:w-[400px]">
      <Panel className="p-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-[13px] font-semibold">Applications · Tech Founders</p>
          <span className="flex items-center gap-1 text-[10px] text-navy/45">
            <Sparkles className="h-3 w-3 text-gold" /> Auto-scored
          </span>
        </div>
        <div className="mt-2 h-[248px] overflow-hidden sm:h-[310px]">
          <div className="relative h-[310px] w-[374px] origin-top-left scale-[0.8] sm:scale-100">
            {COLUMNS.map((c, col) => (
              <div
                key={c}
                className="absolute top-0 h-full rounded-xl bg-navy/[0.035] ring-1 ring-navy/5"
                style={{ left: col * (COL_W + COL_GAP), width: COL_W }}
              >
                <p className="flex items-center justify-between px-2 pt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-navy/50">
                  {c}
                  <span className="rounded-full bg-white px-1.5 text-navy/60 ring-1 ring-navy/10">
                    {stages.filter((s) => s === col).length}
                  </span>
                </p>
              </div>
            ))}
            {APPLICANTS.map((a, i) => {
              const stage = stages[i] ?? 0;
              const row = stages.slice(0, i).filter((s) => s === stage).length;
              const pass = a.score >= SHORTLIST_AT;
              return (
                <m.div
                  key={a.name}
                  className="absolute left-0 top-0 rounded-lg bg-white p-2 shadow-[0_6px_16px_-10px_rgba(15,23,42,0.45)] ring-1 ring-navy/10"
                  style={{ width: COL_W - 12 }}
                  initial={false}
                  animate={{ x: stage * (COL_W + COL_GAP) + 6, y: 30 + row * ROW_H }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                >
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[8px] font-bold ${tone(i)}`}
                    >
                      {a.name.slice(0, 1)}
                    </span>
                    <span className="truncate text-[11px] font-semibold">{a.name}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-[9px]">
                    {stage === 0 ? (
                      <span className="text-navy/45">New application</span>
                    ) : (
                      <>
                        <span
                          className={`rounded px-1 font-bold ${
                            pass ? "bg-mint/15 text-[#047857]" : "bg-gold/15 text-[#b45309]"
                          }`}
                        >
                          {reduced ? a.score : <CountTo to={a.score} />}
                        </span>
                        <span
                          className={stage === 2 ? "font-semibold text-[#047857]" : "text-navy/45"}
                        >
                          {stage === 2 ? "Shortlisted" : "score"}
                        </span>
                      </>
                    )}
                  </div>
                </m.div>
              );
            })}
          </div>
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- Impact reports

const REPORT_BARS = [42, 55, 50, 66, 71, 80, 87];
const KPIS = [
  { v: 1247, s: "", l: "participants" },
  { v: 87, s: "%", l: "completion" },
  { v: 55, s: "%", l: "women" },
];

function ReportVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 320);
  const t = reduced ? 14 : tick % 24;
  const has = (n: number) => t >= n;
  const exporting = t === 11 || t === 12;

  return (
    <div ref={ref} className="relative w-[320px] sm:w-[400px]">
      <Panel>
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gold/15 text-[#b45309]">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-semibold">Impact Report · Q3</p>
            <p className="text-[10px] text-navy/50">
              {has(2) ? "Generated from 8 programs" : "Generating…"}
            </p>
          </div>
          <span className="ml-auto rounded-full border border-gold/40 bg-gold/10 px-1.5 py-0.5 text-[9px] font-bold text-[#b45309]">
            ✦ AI
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {KPIS.map((k, i) => (
            <div key={k.l} className="rounded-lg bg-cream p-2 ring-1 ring-navy/5">
              <div className="h-6 text-base font-bold">
                {!has(3 + i) ? (
                  <span className="mt-1 block h-4 w-10 animate-pulse rounded bg-navy/10" />
                ) : reduced ? (
                  `${k.v.toLocaleString("en-US")}${k.s}`
                ) : (
                  <CountTo to={k.v} suffix={k.s} />
                )}
              </div>
              <p className="text-[9px] text-navy/50">{k.l}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-end gap-3">
          <div className="flex h-16 flex-1 items-end gap-1.5">
            {REPORT_BARS.map((h, i) => (
              <m.span
                key={i}
                className={`flex-1 rounded-t ${i === REPORT_BARS.length - 1 ? "bg-gold" : "bg-mint/60"}`}
                initial={false}
                animate={{ height: has(6) ? `${String(h)}%` : "6%" }}
                transition={{
                  duration: reduced ? 0 : 0.6,
                  delay: reduced ? 0 : i * 0.06,
                  ease: EASE,
                }}
              />
            ))}
          </div>
          <svg viewBox="0 0 36 36" className="h-16 w-16 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#0f172a"
              strokeOpacity={0.07}
              strokeWidth="4"
            />
            <m.circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#10b981"
              strokeWidth="4"
              strokeLinecap="round"
              initial={false}
              animate={{ pathLength: has(8) ? 0.87 : 0 }}
              transition={{ duration: reduced ? 0 : 0.9, ease: EASE }}
            />
          </svg>
        </div>

        <m.span
          className="mt-3 flex h-8 items-center justify-center gap-1.5 rounded-lg bg-navy text-[11px] font-semibold text-white"
          animate={{ scale: t === 11 ? 0.95 : 1 }}
          transition={{ duration: 0.15 }}
        >
          {exporting ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <FileText className="h-3.5 w-3.5" />
          )}
          {has(13) ? "Exported" : "Export PDF"}
        </m.span>
      </Panel>

      <AnimatePresence>
        {has(13) && (
          <m.div
            initial={reduced ? false : { opacity: 0, x: -40, y: 10, rotate: -8 }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="absolute -bottom-4 -right-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-[11px] font-semibold text-navy shadow-[0_16px_32px_-16px_rgba(15,23,42,0.5)] ring-1 ring-navy/10 sm:-right-10"
          >
            <span className="flex h-7 w-6 items-center justify-center rounded bg-[#ef4444] text-[7px] font-bold text-white">
              PDF
            </span>
            impact-report-q3.pdf
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ---------------------------------------------------------------- M&E surveys

const PRE = [22, 31, 26, 14, 7];
const POST = [4, 9, 19, 37, 31];
const DIST_MAX = Math.max(...PRE, ...POST);

function SurveyVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 240);
  const t = tick % 30;
  const post = reduced || t >= 15;
  const dist = post ? POST : PRE;
  const responses = reduced ? 412 : 380 + Math.min(t, 16) * 2;
  // A response drops into a bucket every tick.
  const dropBucket = (t * 7) % 5;

  return (
    <div ref={ref} className="w-[320px] sm:w-[400px]">
      <Panel>
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-navy/45">
            Q3 · M&amp;E survey
          </p>
          <span className="text-[10px] tabular-nums text-navy/45">{responses} responses</span>
        </div>
        <p className="mt-1.5 text-[13px] font-semibold">
          “I feel confident running my own venture.”
        </p>

        <div className="relative mt-3 flex w-fit rounded-full bg-navy/[0.06] p-0.5 text-[10px] font-semibold">
          <m.span
            className="absolute inset-y-0.5 left-0.5 w-[84px] rounded-full bg-white shadow-sm ring-1 ring-navy/10"
            initial={false}
            animate={{ x: post ? 84 : 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
          />
          <span
            className={`relative w-[84px] py-1 text-center ${post ? "text-navy/45" : "text-navy"}`}
          >
            Pre-program
          </span>
          <span
            className={`relative w-[84px] py-1 text-center ${post ? "text-navy" : "text-navy/45"}`}
          >
            Post-program
          </span>
        </div>

        <div className="relative mt-3 flex h-24 items-end gap-2">
          {dist.map((v, i) => (
            <div key={i} className="relative flex h-full flex-1 flex-col items-center justify-end">
              {!reduced && i === dropBucket && (
                <m.span
                  key={`drop-${String(tick)}`}
                  className={`absolute top-0 h-1.5 w-1.5 rounded-full ${post ? "bg-mint" : "bg-navy/40"}`}
                  initial={{ y: -6, opacity: 1 }}
                  animate={{ y: 60, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeIn" }}
                />
              )}
              <m.span
                className={`w-full rounded-t-md ${post ? (i >= 3 ? "bg-mint" : "bg-mint/40") : "bg-navy/25"}`}
                initial={false}
                animate={{ height: `${String((v / DIST_MAX) * 100)}%` }}
                transition={{
                  duration: reduced ? 0 : 0.7,
                  delay: reduced ? 0 : i * 0.05,
                  ease: EASE,
                }}
              />
            </div>
          ))}
        </div>
        <div className="mt-1 flex justify-between px-1 text-[9px] text-navy/40">
          <span>Strongly disagree</span>
          <span>Strongly agree</span>
        </div>

        <div className="mt-3 h-9">
          <AnimatePresence>
            {post && (
              <m.div
                initial={reduced ? false : { opacity: 0, scale: 0.7, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 20,
                  delay: reduced ? 0 : 0.5,
                }}
                className="flex items-center justify-between rounded-lg bg-mint/10 px-3 py-2 ring-1 ring-mint/25"
              >
                <span className="text-[11px] text-navy/65">Confidence vs. baseline</span>
                <span className="text-sm font-bold text-[#047857]">+41%</span>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Panel>
    </div>
  );
}

// ---------------------------------------------------------------- Role-based access

const AREAS = ["Programs", "Apps", "Attend.", "Reports"] as const;
const ROLES: { role: string; grants: readonly number[] }[] = [
  { role: "Org admin", grants: [1, 1, 1, 1] },
  { role: "Team member", grants: [1, 1, 1, 0] },
  { role: "Reviewer", grants: [0, 1, 0, 0] },
  { role: "Field staff", grants: [0, 0, 1, 0] },
];
const cellKey = (r: number, c: number) => `${String(r)}-${String(c)}`;
/** Every granted cell in reading order, so switches flip on one by one. */
const GRANT_ORDER = ROLES.flatMap((r, ri) =>
  r.grants.flatMap((g, ci) => (g ? [cellKey(ri, ci)] : [])),
);

function AccessVignette() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 280);
  const t = tick % (GRANT_ORDER.length + 10);
  const onCount = reduced ? GRANT_ORDER.length : Math.min(t, GRANT_ORDER.length);
  const on = new Set(GRANT_ORDER.slice(0, onCount));
  const latest = reduced ? undefined : GRANT_ORDER[onCount - 1];

  return (
    <div ref={ref} className="w-[320px] sm:w-[420px]">
      <Panel className="p-3">
        <div className="grid grid-cols-[1.4fr_repeat(4,1fr)] items-center text-[10px]">
          <span />
          {AREAS.map((a) => (
            <span
              key={a}
              className="pb-1 text-center font-semibold uppercase tracking-[0.08em] text-navy/45"
            >
              {a}
            </span>
          ))}
          {ROLES.map((r, ri) => (
            <div key={r.role} className="contents">
              <span className="flex items-center gap-1.5 border-t border-navy/5 py-2 pl-1">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-bold ${tone(ri + 1)}`}
                >
                  {r.role.slice(0, 1)}
                </span>
                <span className="font-semibold text-navy">{r.role}</span>
              </span>
              {r.grants.map((g, ci) => {
                const key = cellKey(ri, ci);
                const active = on.has(key);
                return (
                  <span key={key} className="flex justify-center border-t border-navy/5 py-2">
                    {g ? (
                      <span
                        className={`relative h-4 w-7 rounded-full transition-[background-color,box-shadow] duration-300 ${
                          active ? "bg-mint" : "bg-navy/15"
                        } ${key === latest ? "ring-4 ring-mint/25" : ""}`}
                      >
                        <m.span
                          className="absolute left-0 top-0.5 h-3 w-3 rounded-full bg-white shadow"
                          initial={false}
                          animate={{ x: active ? 14 : 2 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      </span>
                    ) : (
                      <span className="text-navy/20">—</span>
                    )}
                  </span>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between rounded-lg bg-cream px-2.5 py-1.5 text-[10px] ring-1 ring-navy/5">
          <span className="text-navy/60">Reviewer access</span>
          <span className="rounded-full bg-gold/15 px-2 py-0.5 font-semibold text-[#b45309]">
            Scoped · 1 form
          </span>
        </div>
      </Panel>
    </div>
  );
}

/** Vignette per feature. */
export function TileArt({ icon }: { icon: FeatureKey }) {
  switch (icon) {
    case "programs":
      return <PortfolioVignette />;
    case "applications":
      return <PipelineVignette />;
    case "participants":
      return <AttendanceVignette />;
    case "reports":
      return <ReportVignette />;
    case "surveys":
      return <SurveyVignette />;
    case "access":
      return <AccessVignette />;
  }
}
