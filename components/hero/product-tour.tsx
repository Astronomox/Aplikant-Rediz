"use client";

import { AnimatePresence, m, useInView } from "framer-motion";
import {
  Check,
  FileSpreadsheet,
  FileText,
  Loader2,
  Sparkles,
  Download,
  UploadCloud,
} from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { DashboardCanvas, DashboardWindow, Sidebar } from "./dashboard-window";

/*
 * The hero's product film. One scene timeline drives a virtual camera (zoom + pan), a
 * cursor that travels to real, measured targets, page changes, a file drop, the AI
 * analysis and a typed synopsis, then loops. Runs only while on screen; under
 * prefers-reduced-motion the still dashboard is shown instead.
 */

type SceneId =
  | "dash"
  | "toReports"
  | "click"
  | "report"
  | "drop"
  | "toGenerate"
  | "clickGen"
  | "analyze"
  | "synopsis"
  | "fade";

const SCENES: { id: SceneId; ms: number }[] = [
  { id: "dash", ms: 3400 },
  { id: "toReports", ms: 1300 },
  { id: "click", ms: 500 },
  { id: "report", ms: 1000 },
  { id: "drop", ms: 2400 },
  { id: "toGenerate", ms: 1000 },
  { id: "clickGen", ms: 450 },
  { id: "analyze", ms: 2600 },
  { id: "synopsis", ms: 6800 },
  { id: "fade", ms: 700 },
];
const idx = (id: SceneId) => SCENES.findIndex((s) => s.id === id);

/** Camera per scene: scale around the window centre, then translate (px). */
const CAMERA: Record<SceneId, { scale: number; x: number | number[]; y: number }> = {
  dash: { scale: 1, x: 0, y: 0 },
  toReports: { scale: 1.14, x: 150, y: -10 },
  click: { scale: 1.14, x: 150, y: -10 },
  report: { scale: 1, x: 0, y: 0 },
  drop: { scale: 1.16, x: 120, y: 40 },
  toGenerate: { scale: 1.12, x: 110, y: -20 },
  clickGen: { scale: 1.12, x: 110, y: -20 },
  analyze: { scale: 1.1, x: -110, y: 10 },
  synopsis: { scale: 1.2, x: [-60, -150], y: -10 },
  fade: { scale: 1, x: 0, y: 0 },
};

const EASE = [0.65, 0, 0.35, 1] as const;

// ---------------------------------------------------------------- content

const FILES = [
  { name: "attendance_q3.csv", size: "184 KB", icon: FileSpreadsheet },
  { name: "pre_post_survey.xlsx", size: "326 KB", icon: FileSpreadsheet },
  { name: "cohort_roster.pdf", size: "1.2 MB", icon: FileText },
] as const;

const STEPS = [
  "Reading 3 files",
  "Matching 1,247 participants",
  "Comparing pre and post surveys",
  "Writing the synopsis",
] as const;

const SYNOPSIS =
  "Across 8 programs, 1,247 participants enrolled and 87% completed. Women made up 55% of the cohort, and 22 participants living with disabilities were fully supported. Post-program surveys show confidence up 41% from baseline, led by Tech Founders Bootcamp, while attendance held above 92% for three straight months.";

const METRICS = [
  { value: "87%", label: "completion" },
  { value: "55%", label: "women" },
  { value: "+41%", label: "confidence" },
  { value: "92%", label: "attendance" },
] as const;

const TREND = [38, 46, 44, 58, 63, 71, 78, 84];

// ---------------------------------------------------------------- helpers

/** Layout position of `el` inside `root` (ignores CSS transforms, unlike getBoundingClientRect). */
function offsetWithin(el: HTMLElement, root: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x: x + el.offsetWidth / 2, y: y + el.offsetHeight / 2 };
}

function Typewriter({ text, run }: { text: string; run: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) {
      setN(0);
      return;
    }
    const id = window.setInterval(() => {
      setN((c) => (c >= text.length ? c : c + 2));
    }, 18);
    return () => {
      window.clearInterval(id);
    };
  }, [run, text]);
  // Numbers render bold as they type.
  const parts = text.split(/(\+?\d[\d,]*%?)/);
  let budget = n;
  return (
    <p className="text-[13px] leading-relaxed text-navy/75">
      {parts.map((p, i) => {
        if (budget <= 0) return null;
        const shown = p.slice(0, budget);
        budget -= p.length;
        return /^\+?\d/.test(p) ? (
          <strong key={i} className="font-semibold text-navy">
            {shown}
          </strong>
        ) : (
          <span key={i}>{shown}</span>
        );
      })}
      {n < text.length && run && (
        <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-gold" />
      )}
    </p>
  );
}

function AnalyzeSteps({ run }: { run: boolean }) {
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (!run) {
      setDone(0);
      return;
    }
    const id = window.setInterval(() => {
      setDone((d) => Math.min(d + 1, STEPS.length));
    }, 600);
    return () => {
      window.clearInterval(id);
    };
  }, [run]);
  return (
    <ul className="space-y-2.5">
      {STEPS.map((s, i) => {
        const complete = i < done;
        const current = i === done;
        return (
          <m.li
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: i <= done ? 1 : 0.35, x: 0 }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center gap-2.5 text-[12px]"
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full ${
                complete ? "bg-mint text-white" : "bg-navy/[0.06] text-navy/50"
              }`}
            >
              {complete ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : current ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : null}
            </span>
            <span className={complete ? "text-navy" : "text-navy/60"}>{s}</span>
          </m.li>
        );
      })}
    </ul>
  );
}

// ---------------------------------------------------------------- report page

function ReportCanvas({ scene }: { scene: number }) {
  const dropping = scene >= idx("drop");
  const analyzing = scene >= idx("analyze");
  const writing = scene >= idx("synopsis");

  return (
    <div className="relative h-full min-w-0 flex-1 overflow-hidden bg-[linear-gradient(135deg,#dbe9fb_0%,#eef3ef_40%,#f6eee4_70%,#f8e3ec_100%)] p-6 text-navy">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-semibold tracking-tight">Reports</p>
          <p className="text-[11px] text-navy/55">
            View program performance summaries and export impact reports.
          </p>
        </div>
        <div className="flex gap-2 text-[11px] font-medium">
          <span className="flex items-center gap-1 rounded-md border border-navy/10 bg-white/70 px-2.5 py-1.5">
            <FileText className="h-3 w-3" /> Export PDF
          </span>
          <span className="flex items-center gap-1 rounded-md border border-navy/10 bg-white/70 px-2.5 py-1.5">
            <Download className="h-3 w-3" /> Export CSV
          </span>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-white/70 bg-white/55 p-5 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)] backdrop-blur">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-[#b45309]">
            <Sparkles className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Impact Report</p>
            <p className="text-[11px] text-navy/55">AI-assisted M&amp;E narrative report</p>
          </div>
          <span className="ml-auto rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-bold tracking-wide text-[#b45309]">
            ✦ AI POWERED
          </span>
        </div>

        <div className="mt-4 grid grid-cols-[0.9fr_1.1fr] gap-4">
          {/* Inputs */}
          <div>
            <div
              data-tour="dropzone"
              className={`flex h-[92px] flex-col items-center justify-center rounded-xl border-2 border-dashed text-center transition-colors duration-500 ${
                dropping ? "border-gold/70 bg-gold/[0.06]" : "border-navy/15 bg-white/40"
              }`}
            >
              <UploadCloud className={`h-5 w-5 ${dropping ? "text-gold" : "text-navy/40"}`} />
              <p className="mt-1 text-[11px] font-medium text-navy/70">
                Drop attendance, surveys or rosters
              </p>
              <p className="text-[10px] text-navy/40">CSV, XLSX or PDF</p>
            </div>

            <ul className="mt-3 space-y-2">
              {FILES.map((f, i) => (
                <m.li
                  key={f.name}
                  initial={{ opacity: 0, x: 140, y: -90, rotate: 8, scale: 0.9 }}
                  animate={
                    dropping
                      ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 }
                      : { opacity: 0, x: 140, y: -90, rotate: 8, scale: 0.9 }
                  }
                  transition={{ duration: 0.7, delay: dropping ? 0.15 + i * 0.28 : 0, ease: EASE }}
                  className="rounded-lg bg-white/80 p-2 shadow-sm ring-1 ring-navy/10"
                >
                  <div className="flex items-center gap-2 text-[11px]">
                    <f.icon className="h-3.5 w-3.5 shrink-0 text-[#047857]" />
                    <span className="min-w-0 flex-1 truncate font-medium">{f.name}</span>
                    <span className="text-[10px] text-navy/45">{f.size}</span>
                  </div>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-navy/[0.07]">
                    <m.div
                      className="h-full rounded-full bg-gradient-to-r from-gold to-mint"
                      initial={{ width: "0%" }}
                      animate={{ width: dropping ? "100%" : "0%" }}
                      transition={{
                        duration: 0.9,
                        delay: dropping ? 0.7 + i * 0.28 : 0,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </m.li>
              ))}
            </ul>

            <span
              data-tour="generate"
              className={`mt-3 flex h-9 items-center justify-center gap-1.5 rounded-lg text-[12px] font-semibold transition-colors duration-300 ${
                analyzing ? "bg-navy/80 text-white" : "bg-navy text-white"
              }`}
            >
              {analyzing && !writing ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 text-gold" />
              )}
              {writing ? "Report ready" : analyzing ? "Generating…" : "Generate report"}
            </span>
          </div>

          {/* Output */}
          <div className="relative min-h-[300px] rounded-xl bg-white/70 p-4 ring-1 ring-navy/10">
            <AnimatePresence mode="wait">
              {!analyzing && (
                <m.div
                  key="empty"
                  exit={{ opacity: 0 }}
                  className="flex h-full min-h-[268px] flex-col items-center justify-center text-center"
                >
                  <Sparkles className="h-5 w-5 text-navy/25" />
                  <p className="mt-2 text-[11px] text-navy/45">Your synopsis will appear here</p>
                </m.div>
              )}
              {analyzing && !writing && (
                <m.div
                  key="analyze"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-navy/45">
                    Analyzing
                  </p>
                  <div className="mt-3">
                    <AnalyzeSteps run />
                  </div>
                  <div className="mt-5 space-y-2">
                    {[92, 78, 85, 60].map((w, i) => (
                      <div
                        key={i}
                        className="h-2.5 animate-pulse rounded-full bg-navy/[0.07]"
                        style={{ width: `${String(w)}%`, animationDelay: `${String(i * 120)}ms` }}
                      />
                    ))}
                  </div>
                </m.div>
              )}
              {writing && (
                <m.div
                  key="synopsis"
                  data-tour="synopsis"
                  initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#b45309]">
                      <Sparkles className="h-3.5 w-3.5" /> Impact synopsis
                    </p>
                    <span className="text-[10px] text-navy/45">Q3 · all programs</span>
                  </div>
                  <div className="mt-2.5">
                    <Typewriter text={SYNOPSIS} run={writing} />
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-1.5">
                    {METRICS.map((mt, i) => (
                      <m.div
                        key={mt.label}
                        initial={{ opacity: 0, scale: 0.6, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{
                          delay: 2.6 + i * 0.18,
                          type: "spring",
                          stiffness: 380,
                          damping: 18,
                        }}
                        className="rounded-lg bg-cream px-2 py-1.5 text-center ring-1 ring-mint/25"
                      >
                        <p className="text-sm font-bold text-navy">{mt.value}</p>
                        <p className="text-[9px] text-navy/55">{mt.label}</p>
                      </m.div>
                    ))}
                  </div>
                  <div className="mt-3 flex h-12 items-end gap-1">
                    {TREND.map((h, i) => (
                      <m.span
                        key={i}
                        className={`flex-1 rounded-t ${i === TREND.length - 1 ? "bg-gold" : "bg-mint/60"}`}
                        initial={{ height: "0%" }}
                        animate={{ height: `${String(h)}%` }}
                        transition={{ delay: 3.4 + i * 0.07, duration: 0.6, ease: EASE }}
                      />
                    ))}
                  </div>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- cursor

const CURSOR_TARGET: Partial<Record<SceneId, string>> = {
  toReports: "nav-Reports",
  click: "nav-Reports",
  report: "nav-Reports",
  drop: "dropzone",
  toGenerate: "generate",
  clickGen: "generate",
  analyze: "generate",
};

function useCursor(stage: RefObject<HTMLDivElement | null>, scene: SceneId) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  useLayoutEffect(() => {
    const root = stage.current;
    const key = CURSOR_TARGET[scene];
    if (!root || !key) {
      setPos(null);
      return;
    }
    // Wait a frame so a newly mounted page is laid out.
    const raf = requestAnimationFrame(() => {
      const el = root.querySelector<HTMLElement>(`[data-tour="${key}"]`);
      if (el) setPos(offsetWithin(el, root));
    });
    return () => {
      cancelAnimationFrame(raf);
    };
  }, [stage, scene]);
  return pos;
}

function Cursor({ pos, clicking }: { pos: { x: number; y: number } | null; clicking: boolean }) {
  return (
    <m.div
      className="pointer-events-none absolute left-0 top-0 z-30"
      initial={false}
      animate={
        pos
          ? { x: pos.x, y: pos.y, opacity: 1, scale: clicking ? 0.85 : 1 }
          : { x: 900, y: 80, opacity: 0, scale: 1 }
      }
      transition={{ duration: 1.1, ease: EASE, scale: { duration: 0.15 } }}
    >
      {clicking && (
        <m.span
          className="absolute -left-4 -top-4 h-8 w-8 rounded-full border-2 border-gold"
          initial={{ scale: 0.3, opacity: 0.9 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
      <svg
        width="22"
        height="24"
        viewBox="0 0 22 24"
        className="drop-shadow-[0_4px_6px_rgba(15,23,42,0.45)]"
      >
        <path
          d="M2 2 L2 19 L6.5 14.8 L9.6 21.6 L12.6 20.3 L9.5 13.6 L15.8 13.6 Z"
          fill="white"
          stroke="#0f172a"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    </m.div>
  );
}

// ---------------------------------------------------------------- film

export function ProductTour() {
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const visible = useInView(root, { margin: "0px 0px -10% 0px" });
  const [scene, setScene] = useState(0);
  const [loop, setLoop] = useState(0);
  const running = visible && !reduced;

  useEffect(() => {
    if (!running) {
      setScene(0);
      return;
    }
    const current = SCENES[scene];
    if (!current) return;
    const t = window.setTimeout(() => {
      const next = (scene + 1) % SCENES.length;
      // Bump the loop as we leave the report page, so the fresh dashboard mounts once
      // (with its count-ups) and the restart doesn't swap it a second time.
      if (next === idx("fade")) setLoop((l) => l + 1);
      setScene(next);
    }, current.ms);
    return () => {
      window.clearTimeout(t);
    };
  }, [running, scene]);

  const id = SCENES[scene]?.id ?? "dash";
  const onReport = scene >= idx("click") + 1 && id !== "fade";
  const cam = CAMERA[id];
  const cursor = useCursor(stage, id);
  const clicking = id === "click" || id === "clickGen";

  if (reduced) return <DashboardWindow />;

  return (
    <div
      ref={root}
      role="img"
      aria-label="Aplikant in action: from the dashboard to Reports, files are dropped in and the AI writes an impact synopsis"
      className="relative h-[560px] overflow-hidden"
    >
      <m.div
        ref={stage}
        className="relative flex h-full text-navy"
        animate={{ scale: cam.scale, x: cam.x, y: cam.y }}
        transition={{
          duration: id === "synopsis" ? 6 : 1.2,
          ease: EASE,
          ...(id === "synopsis"
            ? { scale: { duration: 1.2, ease: EASE }, y: { duration: 1.2, ease: EASE } }
            : {}),
        }}
      >
        <Sidebar active={onReport || id === "click" ? "Reports" : "Dashboard"} />
        {/* Pages crossfade over one another on the canvas gradient, so a change of
            page never flashes the navy window behind them. */}
        <div className="relative min-w-0 flex-1 bg-[linear-gradient(135deg,#dbe9fb_0%,#eef3ef_40%,#f6eee4_70%,#f8e3ec_100%)]">
          <AnimatePresence initial={false}>
            {onReport ? (
              <m.div
                key={`report-${String(loop)}`}
                className="absolute inset-0 flex"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <ReportCanvas scene={scene} />
              </m.div>
            ) : (
              <m.div
                key={`dash-${String(loop)}`}
                className="absolute inset-0 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <DashboardCanvas on={running} />
              </m.div>
            )}
          </AnimatePresence>
        </div>
        <Cursor pos={cursor} clicking={clicking} />
      </m.div>
    </div>
  );
}
