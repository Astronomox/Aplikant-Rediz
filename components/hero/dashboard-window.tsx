"use client";

import { animate, useInView } from "framer-motion";
import {
  Accessibility,
  BarChart3,
  Bell,
  CalendarCheck,
  ClipboardList,
  FileText,
  FolderKanban,
  Headphones,
  LayoutDashboard,
  Plus,
  Settings,
  SquareActivity,
  TrendingUp,
  UserRound,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";

/*
 * The hero's product window: Aplikant's dashboard, recreated from the live app's
 * layout (sidebar groups, stat cards with icon chips and caption pills, demographics,
 * programs by status, active programs). Everything animates in once on view.
 */

const NAV: { group: string; items: { label: string; icon: LucideIcon; active?: boolean }[] }[] = [
  {
    group: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, active: true },
      { label: "Programs", icon: FolderKanban },
    ],
  },
  { group: "Pipeline", items: [{ label: "Form Builder", icon: FileText }] },
  {
    group: "Execution",
    items: [
      { label: "Participants", icon: Users },
      { label: "Attendance", icon: CalendarCheck },
      { label: "Video Sessions", icon: Video },
    ],
  },
  {
    group: "Evaluation",
    items: [
      { label: "M&E", icon: SquareActivity },
      { label: "Reports", icon: BarChart3 },
    ],
  },
];

const STATS = [
  {
    label: "Active programs",
    value: 8,
    suffix: "",
    pill: "8 total",
    icon: FolderKanban,
    chip: "bg-navy/[0.07] text-navy",
  },
  {
    label: "Total participants",
    value: 1247,
    suffix: "",
    pill: "enrolled",
    icon: Users,
    chip: "bg-gold/15 text-[#b45309]",
  },
  {
    label: "Completion rate",
    value: 87,
    suffix: "%",
    pill: "1,085 completed",
    icon: TrendingUp,
    chip: "bg-mint/15 text-[#047857]",
  },
  {
    label: "Open applications",
    value: 342,
    suffix: "",
    pill: "pending review",
    icon: ClipboardList,
    chip: "bg-navy/[0.07] text-navy",
  },
] as const;

const DEMOGRAPHICS = [
  { label: "Females", value: 684, color: "#e11d48", icon: UserRound },
  { label: "Males", value: 541, color: "#3b82f6", icon: UserRound },
  { label: "PLWDs", value: 22, color: "#10b981", icon: Accessibility },
] as const;

const STATUS = [
  { label: "Active", value: 5, color: "bg-mint" },
  { label: "Upcoming", value: 2, color: "bg-gold" },
  { label: "Completed", value: 1, color: "bg-navy/70" },
] as const;

const PROGRAMS = [
  { name: "Tech Founders Bootcamp", type: "Bootcamp", progress: 65 },
  { name: "Women in STEM Fellowship", type: "Fellowship", progress: 32 },
  { name: "Youth Civic Fellowship", type: "Fellowship", progress: 18 },
] as const;

/** Counts from 0 to `to` once `on` flips true. */
function Count({ to, on, suffix = "" }: { to: number; on: boolean; suffix?: string }) {
  const [v, setV] = useState(on ? to : 0);
  useEffect(() => {
    if (!on) return;
    const c = animate(0, to, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (x) => {
        setV(Math.round(x));
      },
    });
    return () => {
      c.stop();
    };
  }, [on, to]);
  return (
    <span className="tabular-nums">
      {v.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

const ease =
  "transition-all duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

function Donut({ on }: { on: boolean }) {
  const total = DEMOGRAPHICS.reduce((s, d) => s + d.value, 0);
  const R = 15.915; // circumference = 100
  let offset = 25; // start at 12 o'clock
  return (
    <svg viewBox="0 0 42 42" className="h-24 w-24 shrink-0 -rotate-0" aria-hidden="true">
      <circle
        cx="21"
        cy="21"
        r={R}
        fill="none"
        stroke="#0f172a"
        strokeOpacity={0.07}
        strokeWidth="6"
      />
      {DEMOGRAPHICS.map((d, i) => {
        const pct = (d.value / total) * 100;
        const el = (
          <circle
            key={d.label}
            cx="21"
            cy="21"
            r={R}
            fill="none"
            stroke={d.color}
            strokeWidth="6"
            strokeDasharray={`${on ? String(Math.max(pct - 1, 0.6)) : "0"} 100`}
            strokeDashoffset={offset}
            className={ease}
            style={{ transitionDelay: `${String(200 + i * 150)}ms` }}
          />
        );
        offset -= pct;
        return el;
      })}
      <text x="21" y="22.5" textAnchor="middle" className="fill-navy text-[5px] font-semibold">
        {total.toLocaleString("en-US")}
      </text>
    </svg>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl border border-white/70 bg-white/55 shadow-[0_8px_24px_-16px_rgba(15,23,42,0.25)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function DashboardWindow() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = usePrefersReducedMotion();
  const on = inView || reduced;
  const maxStatus = Math.max(...STATUS.map((s) => s.value));

  return (
    <div
      ref={ref}
      role="img"
      aria-label="Aplikant dashboard: programs, participants, completion rate, applications, demographics and program progress"
      className="flex text-navy lg:h-[560px]"
    >
      {/* Sidebar */}
      <aside className="hidden w-[196px] shrink-0 flex-col bg-[#0e1a36] px-3 py-4 text-white lg:flex">
        <div className="flex items-center gap-1.5 px-2">
          <Image
            src="/logo-white.png"
            alt=""
            width={96}
            height={48}
            className="-my-3 h-auto w-[86px]"
          />
        </div>
        <nav className="mt-4 space-y-3.5">
          {NAV.map((g) => (
            <div key={g.group}>
              <p className="px-2 text-[9px] font-semibold uppercase tracking-[0.14em] text-white/35">
                {g.group}
              </p>
              <ul className="mt-1 space-y-0.5">
                {g.items.map((it) => (
                  <li
                    key={it.label}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] font-medium ${
                      it.active ? "bg-white/10 text-white ring-1 ring-white/15" : "text-white/60"
                    }`}
                  >
                    <it.icon className="h-3.5 w-3.5" aria-hidden="true" />
                    {it.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <ul className="mt-auto space-y-0.5 border-t border-white/10 pt-3 text-[11px] font-medium text-white/60">
          {[
            { label: "Notifications", icon: Bell },
            { label: "Support", icon: Headphones },
            { label: "Settings", icon: Settings },
          ].map((it) => (
            <li key={it.label} className="flex items-center gap-2 px-2 py-1.5">
              <it.icon className="h-3.5 w-3.5" aria-hidden="true" />
              {it.label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Canvas */}
      <div className="relative min-w-0 flex-1 overflow-hidden bg-[linear-gradient(135deg,#dbe9fb_0%,#eef3ef_40%,#f6eee4_70%,#f8e3ec_100%)] p-4 lg:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-semibold tracking-tight lg:text-xl">Dashboard</p>
            <p className="text-[11px] text-navy/55">Overview of your programs and activities</p>
          </div>
          <span className="flex items-center gap-1 rounded-md bg-navy px-2.5 py-1.5 text-[11px] font-semibold text-white">
            <Plus className="h-3 w-3" aria-hidden="true" /> New Program
          </span>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-2 gap-2.5 lg:grid-cols-4 lg:gap-3">
          {STATS.map((s, i) => (
            <Card key={s.label} className="p-3">
              <div className="flex items-start justify-between">
                <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-navy/55">
                  {s.label}
                </p>
                <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${s.chip}`}>
                  <s.icon className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
              <p className="-mt-1 text-2xl font-bold tracking-tight">
                <Count to={s.value} on={on} suffix={s.suffix} />
              </p>
              <span
                className={`mt-1 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-medium ${
                  i === 1 ? "bg-mint/15 text-[#047857]" : "bg-navy/[0.06] text-navy/60"
                }`}
              >
                {s.pill}
              </span>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="mt-3 hidden gap-3 lg:grid lg:grid-cols-2">
          <Card className="p-4">
            <p className="text-xs font-semibold">Participant Demographics</p>
            <div className="mt-3 flex items-center gap-5">
              <Donut on={on} />
              <ul className="space-y-2 text-[11px]">
                {DEMOGRAPHICS.map((d) => (
                  <li key={d.label} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
                    <span className="w-14 text-navy/60">{d.label}</span>
                    <span className="font-semibold">
                      <Count to={d.value} on={on} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-xs font-semibold">Programs by Status</p>
            <div className="mt-4 space-y-3">
              {STATUS.map((s, i) => (
                <div key={s.label} className="flex items-center gap-3 text-[11px]">
                  <span className="w-16 text-navy/60">{s.label}</span>
                  <span className="relative h-3 flex-1 overflow-hidden rounded-full bg-navy/[0.06]">
                    <span
                      className={`absolute inset-y-0 left-0 rounded-full ${s.color} ${ease}`}
                      style={{
                        width: on ? `${String((s.value / maxStatus) * 100)}%` : "0%",
                        transitionDelay: `${String(300 + i * 120)}ms`,
                      }}
                    />
                  </span>
                  <span className="w-3 text-right font-semibold">{s.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Active programs */}
        <Card className="mt-3 p-4">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold">Active Programs</p>
            <p className="text-[10px] font-medium text-navy/45">View all</p>
          </div>
          <ul className="mt-3 space-y-3">
            {PROGRAMS.map((p, i) => (
              <li key={p.name} className="flex items-center gap-3 text-[11px]">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
                  <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold">{p.name}</span>
                  <span className="text-[10px] text-navy/50">{p.type}</span>
                </span>
                <span className="relative hidden h-2 w-40 overflow-hidden rounded-full bg-navy/[0.07] sm:block">
                  <span
                    className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-gold to-mint ${ease}`}
                    style={{
                      width: on ? `${String(p.progress)}%` : "0%",
                      transitionDelay: `${String(500 + i * 150)}ms`,
                    }}
                  />
                </span>
                <span className="w-9 text-right font-semibold tabular-nums">{p.progress}%</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
