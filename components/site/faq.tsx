import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { faqs } from "./content";
import { BTN, H2, Pill, TwoTone } from "./frame";

/*
 * FAQ: heading + contact cell on the left, accordion on the right.
 * Native <details>/<summary>: keyboard and screen-reader support for free, works
 * without JavaScript. The "+" turns into "×" when open.
 */
export function Faq() {
  return (
    <div className="grid lg:grid-cols-[1fr_1.45fr]">
      <div className="border-b border-navy/10 px-5 py-16 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-24">
        <Reveal className="lg:sticky lg:top-28">
          <Pill>FAQ</Pill>
          <TwoTone
            lead="Frequently asked questions."
            rest="Everything you need to know about Aplikant."
            className={`mt-5 max-w-sm ${H2}`}
          />
          <div className="mt-10 rounded-xl border border-navy/10 bg-white/70 p-5">
            <p className="text-[15px] font-medium">Still have questions?</p>
            <a href="#" className={`${BTN.secondary} mt-4`}>
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
      <ul>
        {faqs.map((f, i) => (
          <li key={f.q} className={i > 0 ? "border-t border-navy/10" : ""}>
            <details className="group px-5 sm:px-10 lg:px-12" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[15px] font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <Plus
                  className="h-4 w-4 shrink-0 text-navy/50 transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </summary>
              <p className="max-w-xl pb-6 text-[15px] leading-relaxed text-navy/60">{f.a}</p>
            </details>
          </li>
        ))}
      </ul>
    </div>
  );
}
