import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "./content";
import { BTN, PAD, SectionHead } from "./frame";

/*
 * FAQ: heading + contact cell on the left, accordion on the right.
 * Native <details>/<summary>: keyboard and screen-reader support for free, works
 * without JavaScript. The "+" turns into "×" when open.
 */

function List() {
  return (
    <ul>
      {faqs.map((f, i) => (
        <li key={f.q} className={i > 0 ? "border-t border-navy/10" : ""}>
          <details className={`group ${PAD.x}`} open={i === 0}>
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-medium sm:gap-6 sm:py-5 sm:text-[15px] [&::-webkit-details-marker]:hidden">
              {f.q}
              <Plus
                className="h-4 w-4 shrink-0 text-navy/50 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <p className="max-w-xl pb-4 text-[13px] leading-relaxed text-navy/60 sm:pb-5 sm:text-[15px]">
              {f.a}
            </p>
          </details>
        </li>
      ))}
    </ul>
  );
}

function Contact({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border border-navy/10 bg-white/70 p-4 sm:block sm:p-5 ${className}`}
    >
      <p className="text-sm font-medium sm:text-[15px]">Still have questions?</p>
      <a href="#" className={`${BTN.secondary} shrink-0 sm:mt-4`}>
        Get in touch
      </a>
    </div>
  );
}

/** `head={false}`: just the questions and the contact card (the /faq page). */
export function Faq({ index, head = true }: { index?: string; head?: boolean }) {
  if (!head) {
    return (
      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        <List />
        <div className={`border-t border-navy/10 ${PAD.x} ${PAD.y} lg:border-l lg:border-t-0`}>
          <Contact className="lg:sticky lg:top-28" />
        </div>
      </div>
    );
  }
  return (
    <div className="grid lg:grid-cols-[1fr_1.45fr]">
      <div className={`border-b border-navy/10 ${PAD.x} ${PAD.y} lg:border-b-0 lg:border-r`}>
        <Reveal className="lg:sticky lg:top-28">
          <SectionHead
            index={index}
            eyebrow="FAQ"
            title="Frequently asked questions."
            lede="Everything you need to know about Aplikant."
          />
          <Contact className="mt-6 sm:mt-10" />
        </Reveal>
      </div>
      <List />
    </div>
  );
}
