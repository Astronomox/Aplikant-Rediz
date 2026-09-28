"use client";

import {
  BarChart3,
  CalendarCheck,
  FileText,
  FolderKanban,
  LayoutDashboard,
  SquareActivity,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";

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
      </aside>
    </div>
  );
}
