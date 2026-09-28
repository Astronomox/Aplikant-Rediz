"use client";

import {
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
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { type ReactNode } from "react";

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
  return (
    <div
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
          {STATS.map((s) => (
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
                {s.value.toLocaleString("en-US")}
                {s.suffix}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
