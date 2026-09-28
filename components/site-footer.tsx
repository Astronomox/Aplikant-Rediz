import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Aurora } from "@/components/fx/aurora";
import { PlayWhenVisible } from "@/components/fx/play-when-visible";
import { Reveal } from "@/components/motion/reveal";
import { footer } from "@/components/site/content";
import { BTN, COLUMN, PAD, TickStrip, TYPE } from "@/components/site/frame";
import { DotGrid } from "@/components/texture/dot-grid";

/*
 * Closing CTA + footer, one continuous navy block inside the page rails.
 * Copy and links are the live site's. "Follow Us" is omitted: the site does not say
 * which social networks it uses, and we do not guess.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className={`${COLUMN} relative lg:border-x lg:border-white/10`}>
        {/* CTA */}
        <div className="relative overflow-hidden border-b border-white/10">
          <DotGrid id="cta-grid" fade="radial" />
          <PlayWhenVisible className="absolute inset-0">
            <Aurora />
          </PlayWhenVisible>
          <TickStrip tone="dark" className="relative" />
          <Reveal
            className={`relative grid gap-6 ${PAD.x} ${PAD.y} lg:grid-cols-12 lg:items-center`}
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gold">
                AI Powered Program Management
              </p>
              <h2 className={`mt-3 ${TYPE.h2}`}>Ready to ditch the spreadsheets?</h2>
              <p className={`mt-3 max-w-xl ${TYPE.lede} text-white/55`}>
                Join 150+ Innovation Hubs, NGOs and Government Agencies across Africa using Aplikant
                to manage programs, track impact, and delight their funders.
              </p>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <div className="flex gap-2.5 lg:justify-end">
                <a href="#" className={BTN.gold}>
                  Get Started for Free
                </a>
                <a href="#pricing" className={BTN.secondaryDark}>
                  View Pricing
                </a>
              </div>
              <p className="mt-3 text-xs text-white/40 lg:text-right">
                Free forever · No credit card required
              </p>
            </div>
          </Reveal>
        </div>

        {/* Link columns */}
        <div className={`grid gap-8 ${PAD.x} py-10 sm:py-14 md:grid-cols-12`}>
          <div className="md:col-span-5">
            <Image
              src="/logo-white.png"
              alt="Aplikant"
              width={144}
              height={72}
              className="-my-4 h-auto w-[118px]"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">{footer.blurb}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-medium uppercase tracking-[0.16em] text-white/35">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="group inline-flex min-h-9 items-center gap-1 text-sm text-white/65 hover:text-white"
                      >
                        <span className="link-underline">{l.label}</span>
                        <ArrowRight
                          className="arrow-nudge h-3 w-3 opacity-0 group-hover:opacity-100"
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 px-5 py-6 text-xs text-white/40 sm:flex-row sm:justify-between sm:px-10 lg:px-12">
          <p>© {new Date().getFullYear()} Aplikant. All rights reserved.</p>
          <p>{footer.bottom}</p>
        </div>
      </div>

      {/* Oversized wordmark, cropped by the page edge: texture, not content */}
      <p
        aria-hidden="true"
        className="pointer-events-none relative -mb-[0.22em] select-none text-center text-[22vw] font-semibold leading-none tracking-tighter text-white/[0.035]"
      >
        Aplikant
      </p>
    </footer>
  );
}
