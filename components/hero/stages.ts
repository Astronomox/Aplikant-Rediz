import {
  ChartColumn,
  ClipboardCheck,
  FileStack,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";

/*
 * Program lifecycle data for the hero visuals. Every label is taken from the
 * homepage's own feature and pricing copy: no invented names, numbers or data.
 */

export interface Stage {
  step: string;
  label: string;
  icon: LucideIcon;
  title: string;
  tags: string[];
  ai?: boolean;
}

/** The three lifecycle stages the hero cycles through. */
export const stages: Stage[] = [
  {
    step: "01",
    label: "Apply",
    icon: ClipboardCheck,
    title: "Branded application link",
    tags: ["Custom forms", "Scoring", "Shortlisting"],
  },
  {
    step: "02",
    label: "Track",
    icon: Users,
    title: "Attendance, manual + QR",
    tags: ["Cohorts", "Engagement", "Demographics"],
  },
  {
    step: "03",
    label: "Report",
    icon: ChartColumn,
    title: "Donor-ready impact report",
    tags: ["Completion rates", "Gender", "Geography", "Outcomes"],
    ai: true,
  },
];

/** Supporting capabilities that orbit closer to the hub (decorative). */
export const satellites: { label: string; icon: LucideIcon }[] = [
  { label: "Programs", icon: FileStack },
  { label: "M&E Surveys", icon: Zap },
  { label: "Role-based access", icon: ShieldCheck },
];
