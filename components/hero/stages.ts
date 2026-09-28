import { type LucideIcon } from "lucide-react";

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
