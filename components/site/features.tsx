import {
  ChartColumn,
  Check,
  ClipboardCheck,
  FileStack,
  ShieldCheck,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { features, type FeatureKey } from "./content";
import { TYPE } from "./frame";

/*
 * Features: six capabilities in a hairline grid (1 / 2 / 3 columns). Each cell is an
 * icon, a title, one sentence and two concrete points. No illustrations: the product
 * itself is shown once, in the hero.
 */

const ICONS: Record<FeatureKey, LucideIcon> = {
  programs: FileStack,
  applications: ClipboardCheck,
  participants: Users,
  reports: ChartColumn,
  surveys: Zap,
  access: ShieldCheck,
};

export function Features({ cell = "bg-cream" }: { cell?: string }) {
  return (
    <div className="grid gap-px border-t border-navy/10 bg-navy/10 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((f, i) => {
        const Icon = ICONS[f.key];
        return (
          <Reveal key={f.key} index={i % 3} className="bg-cream">
            <article className="h-full px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-gold">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                {f.ai && (
                  <span className="rounded-full bg-mint/15 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-[#047857]">
                    AI POWERED
                  </span>
                )}
              </div>
              <h3 className={`mt-4 ${TYPE.h3}`}>{f.tab}</h3>
              <p className={`mt-1.5 text-navy/60 ${TYPE.body}`}>{f.rest}</p>
              <ul className="mt-4 space-y-1.5">
                {f.cells.map((c) => (
                  <li key={c.lead} className="flex items-start gap-2 text-[13px] text-navy/75">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint" aria-hidden="true" />
                    {c.lead.replace(/\.$/, "")}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
}
