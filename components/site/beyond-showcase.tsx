"use client";

import { animate, AnimatePresence, m } from "framer-motion";
import { Award, BookOpen, Check, Circle, Mail, Mic, Trophy, Video } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { useTicker } from "@/components/motion/use-ticker";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { beyond } from "./content";
import { BTN, Pill, TwoTone } from "./frame";

/*
 * "More than applications" (dark band): an auto-cycling capability list beside a stage
 * that plays a live moment of the active capability. Clicking an item selects it.
 */

const CYCLE_MS = 5200;
const EASE = [0.22, 1, 0.36, 1] as const;

function Glass({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.05] p-5 text-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/10 backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

function useCount(to: number, run: boolean) {
  const [v, setV] = useState(run ? 0 : to);
  useEffect(() => {
    if (!run) {
      setV(to);
      return;
    }
    const c = animate(0, to, {
      duration: 2.4,
      ease: EASE,
      onUpdate: (x) => {
        setV(Math.round(x));
      },
    });
    return () => {
      c.stop();
    };
  }, [to, run]);
  return v;
}

// ---------------------------------------------------------------- scenes

const MODULES = [
  "Problem discovery",
  "Customer interviews",
  "Business model",
  "Pricing",
  "Pitch deck",
];

function CourseScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 520);
  const done = reduced ? MODULES.length : Math.min(tick, MODULES.length);
  const graded = done === MODULES.length;
  return (
    <div ref={ref}>
      <Glass className="w-[310px] sm:w-[330px]">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/15 text-gold">
            <BookOpen className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold">Founder Foundations</p>
            <p className="text-[11px] text-white/50">Course · Tech Founders Bootcamp</p>
          </div>
        </div>
        <ul className="mt-4 space-y-2">
          {MODULES.map((mod, i) => {
            const ok = i < done;
            return (
              <li key={mod} className="flex items-center gap-2.5 text-[12px]">
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors duration-300 ${
                    ok ? "bg-mint text-navy" : "ring-1 ring-white/20"
                  }`}
                >
                  {ok && <Check className="h-2.5 w-2.5" strokeWidth={4} />}
                </span>
                <span className={ok ? "text-white" : "text-white/45"}>{mod}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
          <m.div
            className="h-full rounded-full bg-gradient-to-r from-gold to-mint"
            initial={false}
            animate={{ width: `${String((done / MODULES.length) * 100)}%` }}
            transition={{ duration: reduced ? 0 : 0.4, ease: EASE }}
          />
        </div>
        <div className="mt-4 h-10">
          <AnimatePresence>
            {graded && (
              <m.div
                initial={reduced ? false : { opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="flex items-center justify-between rounded-xl bg-mint/10 px-3 py-2 ring-1 ring-mint/30"
              >
                <span className="text-[12px] text-white/70">Final assessment · gradebook</span>
                <span className="text-sm font-bold text-mint">92%</span>
              </m.div>
            )}
          </AnimatePresence>
        </div>
      </Glass>
    </div>
  );
}

const SEAL_AT = 1.0; // s: seal slams down
const STAMP_AT = 1.9; // s: CERTIFIED stamp lands
const SLAM = { type: "spring", stiffness: 620, damping: 20, mass: 0.9 } as const;

function CertificateScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { reduced } = useTicker(ref, 1000);
  const sent = useCount(1085, !reduced);
  const still = reduced ? false : undefined;

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* The card jolts on each impact */}
      <m.div
        className="relative w-[300px] rounded-xl bg-[#fbf7ee] px-6 pb-6 pt-7 text-navy shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)] ring-1 ring-gold/40 sm:w-[340px]"
        style={{ rotate: -2 }}
        initial={still}
        animate={reduced ? undefined : { y: [0, 0, 5, -1, 0, 0, 4, -1, 0] }}
        transition={{
          duration: STAMP_AT + 0.5,
          times: [0, 0.5, 0.54, 0.6, 0.64, 0.87, 0.9, 0.95, 1],
        }}
      >
        <div className="pointer-events-none absolute inset-2 rounded-lg ring-1 ring-gold/30" />
        <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#b45309]">
          Certificate of completion
        </p>
        <m.p
          className="mt-3 font-serif text-[22px] leading-tight sm:text-[26px]"
          initial={reduced ? false : { clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
        >
          Adaeze Nwosu
        </m.p>
        <p className="mt-1 text-[11px] text-navy/55">has successfully completed</p>
        <p className="text-[13px] font-semibold">Tech Founders Bootcamp</p>
        <div className="mt-6 flex gap-6 pr-16">
          <span className="w-24 border-t border-navy/30 pt-1 text-[9px] text-navy/50">
            Program lead
          </span>
          <span className="border-t border-navy/30 pt-1 font-mono text-[9px] text-navy/50">
            APK-4F2K9Q
          </span>
        </div>

        {/* Seal: slams down onto the bottom-right corner */}
        <div className="absolute bottom-4 right-4">
          {!reduced && (
            <m.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full ring-2 ring-gold"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: [0.6, 0.6, 2.1], opacity: [0, 0.7, 0] }}
              transition={{ duration: SEAL_AT + 0.55, times: [0, SEAL_AT / (SEAL_AT + 0.55), 1] }}
            />
          )}
          <m.span
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-[0_6px_14px_-4px_rgba(180,83,9,0.6),inset_0_0_0_3px_rgba(255,255,255,0.35)]"
            initial={reduced ? false : { y: -130, scale: 1.9, rotate: -35, opacity: 0 }}
            animate={{ y: 0, scale: 1, rotate: -8, opacity: 1 }}
            transition={{ ...SLAM, delay: SEAL_AT }}
          >
            <span className="absolute inset-1.5 rounded-full border border-dashed border-white/60" />
            <Award className="h-6 w-6" />
          </m.span>
        </div>

        {/* CERTIFIED rubber stamp */}
        {/* Outer box sizes it per breakpoint; the inner box does the slam. */}
        <div className="absolute right-3 top-[3.25rem] origin-top-right scale-[0.78] mix-blend-multiply sm:right-5 sm:scale-100">
          <m.div
            className="rounded-md border-2 border-[#047857] p-0.5 text-[#047857]"
            initial={reduced ? false : { y: -90, scale: 2.4, rotate: -28, opacity: 0 }}
            animate={{ y: 0, scale: 1, rotate: -12, opacity: 0.88 }}
            transition={{ ...SLAM, delay: STAMP_AT }}
          >
            <span className="block rounded-[3px] border border-[#047857] px-2 py-0.5 text-[12px] font-extrabold tracking-[0.22em]">
              CERTIFIED
            </span>
          </m.div>
        </div>
      </m.div>

      <div className="mt-6 flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[12px] ring-1 ring-white/10">
        <Mail className="h-3.5 w-3.5 text-gold" />
        <span className="text-white/60">Certificate campaign sent to</span>
        <span className="font-bold tabular-nums text-white">{sent.toLocaleString("en-US")}</span>
        <span className="text-white/60">graduates</span>
      </div>
    </div>
  );
}

const TEAMS = ["AgroLink", "MedRoute", "EduNest", "PayLite"];
/** Judges' score increments per round; ranks change as they land. */
const ROUNDS = [
  [22, 18, 20, 17],
  [19, 24, 18, 21],
  [21, 23, 25, 19],
  [20, 22, 24, 23],
];

function CompetitionScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 1100);
  const round = reduced ? ROUNDS.length : Math.min(tick, ROUNDS.length);
  const totals = TEAMS.map((_, i) => ROUNDS.slice(0, round).reduce((s, r) => s + (r[i] ?? 0), 0));
  const order = TEAMS.map((_, i) => i).sort((a, b) => (totals[b] ?? 0) - (totals[a] ?? 0));
  const max = Math.max(1, ...totals);
  return (
    <div ref={ref}>
      <Glass className="w-[310px] sm:w-[340px]">
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Trophy className="h-4 w-4 text-gold" /> Pitch finals
          </p>
          <span className="text-[11px] text-white/50">
            Judges {round}/{ROUNDS.length}
          </span>
        </div>
        <div className="relative mt-4 h-[176px]">
          {TEAMS.map((team, i) => {
            const rank = order.indexOf(i);
            const total = totals[i] ?? 0;
            return (
              <m.div
                key={team}
                className="absolute inset-x-0 flex items-center gap-3"
                initial={false}
                animate={{ y: rank * 44 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-lg text-[11px] font-bold ${
                    rank === 0 ? "bg-gold text-navy" : "bg-white/10 text-white/70"
                  }`}
                >
                  {rank + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between text-[12px]">
                    <span className="font-semibold">{team}</span>
                    <span className="tabular-nums text-white/70">{total}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <m.div
                      className={`h-full rounded-full ${rank === 0 ? "bg-gold" : "bg-mint/70"}`}
                      initial={false}
                      animate={{ width: `${String((total / max) * 100)}%` }}
                      transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
                    />
                  </div>
                </div>
              </m.div>
            );
          })}
        </div>
        <p className="mt-1 text-[11px] text-white/45">Private judging · scores export to CSV</p>
      </Glass>
    </div>
  );
}

function SessionScene() {
  const ref = useRef<HTMLDivElement>(null);
  const { tick, reduced } = useTicker(ref, 1000);
  const secs = 1520 + (reduced ? 0 : tick);
  const clock = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const watching = 128 + (reduced ? 0 : Math.floor(tick / 2));
  return (
    <div ref={ref}>
      <Glass className="w-[310px] p-3 sm:w-[360px]">
        <div className="relative aspect-video overflow-hidden rounded-xl bg-[radial-gradient(circle_at_30%_30%,#1e3a8a,#0f172a_70%)]">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gold to-[#b45309] text-lg font-bold text-navy shadow-[0_0_0_6px_rgba(245,158,11,0.15)]">
              KM
            </span>
          </div>
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-md bg-[#ef4444] px-2 py-0.5 text-[10px] font-bold text-white">
            <Circle className="h-2 w-2 animate-pulse fill-white" /> LIVE
          </span>
          <span className="absolute right-3 top-3 rounded-md bg-black/40 px-2 py-0.5 font-mono text-[10px] text-white/90">
            {clock}
          </span>
          <div className="absolute inset-x-3 bottom-3 flex items-end justify-between">
            <span className="flex items-center gap-1.5 rounded-md bg-black/40 px-2 py-1 text-[10px] text-white/90">
              <Mic className="h-3 w-3" /> Kofi M. · Week 4 masterclass
            </span>
            <span className="flex h-6 items-end gap-0.5">
              {[0, 1, 2, 3, 4, 5, 6].map((b) => (
                <m.span
                  key={b}
                  className="w-1 rounded-full bg-mint"
                  animate={reduced ? { height: 8 } : { height: [4, 18, 7, 22, 5] }}
                  transition={{
                    duration: 1.1,
                    repeat: Infinity,
                    delay: b * 0.12,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between px-1 text-[11px]">
          <span className="flex items-center gap-1.5 text-white/60">
            <Video className="h-3.5 w-3.5 text-gold" /> Recording for replay
          </span>
          <span className="text-white/60">
            <span className="font-bold tabular-nums text-white">{watching}</span> watching
          </span>
        </div>
      </Glass>
    </div>
  );
}

const SCENES = [CourseScene, CertificateScene, CompetitionScene, SessionScene];

// ---------------------------------------------------------------- showcase

export function BeyondShowcase() {
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
    const id = window.setTimeout(() => {
      setActive((a) => (a + 1) % beyond.length);
    }, CYCLE_MS);
    return () => {
      window.clearTimeout(id);
    };
  }, [visible, reduced, active]);

  const Scene = SCENES[active] ?? CourseScene;

  return (
    <div ref={ref} className="grid border-t border-white/10 lg:grid-cols-2">
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
        <ul className="mt-12 max-w-md">
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

      {/* Stage */}
      <div
        aria-hidden="true"
        className="relative flex min-h-[380px] items-center justify-center overflow-hidden border-t border-white/10 bg-[radial-gradient(60%_60%_at_50%_50%,rgba(245,158,11,0.10),transparent_70%)] px-5 py-12 lg:min-h-[480px] lg:border-l lg:border-t-0"
      >
        <AnimatePresence mode="wait">
          <m.div
            key={active}
            initial={{ opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -16, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: reduced ? 0 : 0.5, ease: EASE }}
            className="max-w-full"
          >
            <Scene />
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
