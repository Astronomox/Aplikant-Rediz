import type { ReactNode } from "react";

/*
 * Page frame, after Attio's construction: the page is a drawn grid, not stacked bands.
 *   - Every section spans the full width with a hairline on its bottom edge.
 *   - Inside, a fixed-width column is framed by two vertical hairline rails (lg+),
 *     so the rails run unbroken from the header to the footer.
 *   - Content sits in hairline-bordered cells (see <Cells>).
 * Two tones: "light" (cream, navy lines) and "dark" (navy, white lines).
 */

export type Tone = "light" | "dark";

const SECTION: Record<Tone, string> = {
  light: "bg-cream text-navy border-navy/10",
  dark: "bg-navy text-white border-white/10",
};
const RAILS: Record<Tone, string> = {
  light: "lg:border-navy/10",
  dark: "lg:border-white/10",
};

/** Width of the framed column (Attio's is ~1160px). */
export const COLUMN = "mx-auto w-full max-w-[72.5rem]";

export function Section({
  tone = "light",
  id,
  className = "",
  innerClassName = "",
  children,
}: {
  tone?: Tone;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative border-b ${SECTION[tone]} ${className}`}>
      <div className={`${COLUMN} relative lg:border-x ${RAILS[tone]} ${innerClassName}`}>
        {children}
      </div>
    </section>
  );
}

/** Small tinted label above a heading ("Platform", "Pricing"…). */
export function Pill({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${
        tone === "dark" ? "bg-gold/15 text-gold" : "bg-navy/[0.07] text-navy/80"
      }`}
    >
      {children}
    </span>
  );
}
