"use client";

import { AnimatePresence, m } from "framer-motion";
import { Check, ChevronDown, Loader2, RefreshCw } from "lucide-react";
import { useMemo, useRef, type ReactNode } from "react";
import { useTicker } from "@/components/motion/use-ticker";

/*
 * The two cards that float beside the hero window, as live vignettes:
 *   - FormFragment: an application is typed in, submitted and paid via Paystack.
 *   - QrFragment: a QR session is scanned, check-ins tick up, and it regenerates.
 * Both run on useTicker (paused off screen, a finished frame under reduced motion).
 */

const CARD =
  "rounded-xl bg-white p-4 text-navy shadow-[0_24px_48px_-24px_rgba(15,23,42,0.45)] ring-1 ring-navy/10";
const EASE = [0.22, 1, 0.36, 1] as const;

// ---------------------------------------------------------------- Application form

const NAME = "Tolu Adeyemi";
const REASON = "To launch my agritech startup";
// Timeline, in 110 ms ticks.
const T_PROGRAM = NAME.length + 2;
const T_REASON = T_PROGRAM + 2;
const T_SUBMIT = T_REASON + REASON.length + 4;
const T_PAID = T_SUBMIT + 9;
const T_CYCLE = T_PAID + 26;

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[10px] font-medium text-navy/50">{label}</p>
      <div className="mt-1 flex h-7 items-center rounded-md bg-navy/[0.03] px-2 text-[11px] ring-1 ring-navy/10">
        {children}
      </div>
    </div>
  );
}

function Caret({ show }: { show: boolean }) {
  return show ? <span className="ml-px inline-block h-3 w-px animate-pulse bg-navy" /> : null;
}

export function FormFragment() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 110);
  const t = reduced ? T_PAID + 2 : tick % T_CYCLE;
  const name = NAME.slice(0, Math.min(t, NAME.length));
  const reason = REASON.slice(0, Math.max(0, Math.min(t - T_REASON, REASON.length)));
  const submitting = t >= T_SUBMIT && t < T_PAID;
  const paid = t >= T_PAID;

  return (
    <div ref={ref} className={`w-[252px] ${CARD}`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Application form</p>
        <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
          Paid · Paystack
        </span>
      </div>

      <div className="relative mt-3">
        <div
          className={`space-y-2 transition-opacity duration-300 ${paid ? "opacity-0" : "opacity-100"}`}
        >
          <Field label="Full name">
            {name}
            <Caret show={!reduced && t < T_PROGRAM} />
          </Field>
          <Field label="Program">
            <span className={t >= T_PROGRAM ? "text-navy" : "text-navy/35"}>
              {t >= T_PROGRAM ? "Tech Founders Bootcamp" : "Select a program"}
            </span>
            <ChevronDown className="ml-auto h-3 w-3 text-navy/40" />
          </Field>
          <Field label="Why this program?">
            <span className="truncate">{reason}</span>
            <Caret show={!reduced && t >= T_REASON && t < T_SUBMIT} />
          </Field>
          <m.span
            className="mt-1 flex h-8 items-center justify-center gap-1.5 rounded-md bg-navy text-[11px] font-semibold text-white"
            animate={{ scale: t === T_SUBMIT ? 0.95 : 1 }}
            transition={{ duration: 0.12 }}
          >
            {submitting && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
            {submitting ? "Processing payment…" : "Submit & pay ₦5,000"}
          </m.span>
        </div>

        <AnimatePresence>
          {paid && (
            <m.div
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center"
            >
              <m.span
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 420,
                  damping: 16,
                  delay: reduced ? 0 : 0.1,
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-mint text-white shadow-[0_0_0_6px_rgba(16,185,129,0.15)]"
              >
                <Check className="h-5 w-5" strokeWidth={3} />
              </m.span>
              <p className="mt-3 text-[13px] font-semibold">Application submitted</p>
              <p className="mt-0.5 text-[11px] text-navy/55">₦5,000 paid via Paystack</p>
              <span className="mt-3 rounded-full bg-navy/[0.05] px-2.5 py-1 font-mono text-[10px] text-navy/60">
                APK-4F2K9Q
              </span>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------- QR attendance

const QR_N = 21;

/** A deterministic QR-like module grid: three finder patterns + seeded noise. */
function qrModules(seed: number) {
  let s = (seed * 9301 + 49297) % 233280;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  const cells: [number, number][] = [];
  const inFinder = (x: number, y: number) =>
    (x < 8 && y < 8) || (x >= QR_N - 8 && y < 8) || (x < 8 && y >= QR_N - 8);
  for (let y = 0; y < QR_N; y++) {
    for (let x = 0; x < QR_N; x++) {
      if (inFinder(x, y)) continue;
      if (y === 6 || x === 6) {
        if ((x + y) % 2 === 0) cells.push([x, y]); // timing pattern
      } else if (rand() > 0.52) cells.push([x, y]);
    }
  }
  return cells;
}

function Finder({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={7} height={7} fill="#0f172a" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#0f172a" />
    </g>
  );
}

const CHECKINS = ["AO", "TB", "NK", "ZA", "KM", "IF", "SE", "BU"];
const Q_CYCLE = 16;
const Q_REGEN = 12;

export function QrFragment() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 600);
  const t = reduced ? 8 : tick % Q_CYCLE;
  const seed = reduced ? 1 : Math.floor(tick / Q_CYCLE) + (t > Q_REGEN ? 2 : 1);
  const modules = useMemo(() => qrModules(seed), [seed]);
  const count = 29 + Math.min(t, Q_REGEN - 1);
  const regenerating = t === Q_REGEN;
  const recent = [0, 1, 2, 3].map((k) => CHECKINS[(count - k) % CHECKINS.length] ?? "");

  return (
    <div ref={ref} className={`w-[232px] ${CARD}`}>
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">QR attendance</p>
        <span className="flex items-center gap-1 rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold text-[#047857]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" />
          Session open
        </span>
      </div>

      <div className="relative mt-3 flex items-center justify-center overflow-hidden rounded-lg bg-cream py-3 ring-1 ring-navy/5">
        <AnimatePresence mode="wait" initial={false}>
          <m.svg
            key={seed}
            viewBox={`-1 -1 ${String(QR_N + 2)} ${String(QR_N + 2)}`}
            className="h-[104px] w-[104px]"
            initial={{ opacity: 0, filter: "blur(4px)", scale: 0.94 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(4px)", scale: 1.04 }}
            transition={{ duration: 0.35 }}
          >
            <rect x={-1} y={-1} width={QR_N + 2} height={QR_N + 2} fill="white" />
            {modules.map(([x, y]) => (
              <rect
                key={`${String(x)}-${String(y)}`}
                x={x + 0.08}
                y={y + 0.08}
                width={0.84}
                height={0.84}

                fill="#0f172a"
              />
            ))}
            <Finder x={0} y={0} />
            <Finder x={QR_N - 7} y={0} />
            <Finder x={0} y={QR_N - 7} />
          </m.svg>
        </AnimatePresence>
        {!reduced && (
          <m.span
            aria-hidden="true"
            className="absolute inset-x-6 h-8 bg-gradient-to-b from-transparent via-mint/35 to-transparent"
            animate={{ y: [-70, 70] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <span className="absolute inset-x-0 top-1/2 h-px bg-mint shadow-[0_0_8px_#10b981]" />
          </m.span>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex -space-x-1.5">
          {recent.map((ini, k) => (
            <m.span
              key={`${ini}-${String(count - k)}`}
              initial={reduced || k > 0 ? false : { scale: 0, x: -6 }}
              animate={{ scale: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#bbf7d0] text-[8px] font-bold text-[#166534] ring-2 ring-white"
            >
              {ini}
            </m.span>
          ))}
        </div>
        <p className="text-[11px] text-navy/55">
          <span className="font-bold tabular-nums text-navy">{count}</span> checked in
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-1.5 text-[11px] font-medium">
        <span className="flex h-7 items-center justify-center rounded-md ring-1 ring-navy/15">
          Reopen
        </span>
        <m.span
          className={`flex h-7 items-center justify-center gap-1 rounded-md ring-1 transition-colors ${
            regenerating ? "bg-navy text-white ring-navy" : "ring-navy/15"
          }`}
          animate={{ scale: regenerating ? 0.95 : 1 }}
        >
          <m.span
            className="flex"
            animate={{ rotate: regenerating ? 360 : 0 }}
            transition={{ duration: regenerating ? 0.6 : 0, ease: "easeInOut" }}
          >
            <RefreshCw className="h-3 w-3" aria-hidden="true" />
          </m.span>
          Regenerate
        </m.span>
      </div>
    </div>
  );
}
