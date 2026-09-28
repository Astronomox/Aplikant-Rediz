import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { NotFoundMascot } from "@/components/not-found-mascot";
import { BTN } from "@/components/site/frame";
import { DotGrid } from "@/components/texture/dot-grid";

export const metadata: Metadata = {
  title: "Page not found · Aplikant",
};

const HELP = [
  { label: "Features", href: "/features" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
];

/*
 * 404: logo, a centered card with the mark as a little character looking for the page,
 * a big 404, a short message and a detailed one, then one clear way home.
 */
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center overflow-hidden bg-[linear-gradient(160deg,#eef4fb_0%,#f0fdf4_50%,#fbf3ea_100%)] px-5 text-navy">
      <DotGrid id="nf-grid" tone="light" fade="radial" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-3xl" />

      <Link href="/" aria-label="Aplikant home" className="relative mt-8 sm:mt-10">
        <Image
          src="/logo.png"
          alt="Aplikant"
          width={144}
          height={72}
          priority
          className="-my-4 h-auto w-[120px] sm:w-[132px]"
        />
      </Link>

      <div className="relative my-auto w-full max-w-md py-10">
        <div className="rounded-3xl bg-white/80 px-6 pb-7 pt-9 text-center shadow-[0_30px_70px_-35px_rgba(15,23,42,0.35)] ring-1 ring-navy/10 backdrop-blur sm:px-10 sm:pb-9 sm:pt-11">
          <NotFoundMascot />

          <p className="mt-8 text-[4.5rem] font-bold leading-none tracking-[-0.05em] sm:text-[5.5rem]">
            4<span className="text-gold">0</span>4
          </p>
          <h1 className="mt-3 text-lg font-semibold sm:text-xl">Oops! This page wandered off.</h1>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-navy/55 sm:text-sm">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Check the address for
            a typo, or head back home and we&apos;ll get you where you&apos;re going.
          </p>

          <div className="mt-6 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Link href="/" className={BTN.primary}>
              <Home className="h-4 w-4" aria-hidden="true" />
              Return home
            </Link>
            <Link href="/discover" className={BTN.secondary}>
              Discover programs
            </Link>
          </div>

          <div className="mt-7 border-t border-navy/10 pt-5">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-navy/40">
              Or try one of these
            </p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
              {HELP.map((h) => (
                <li key={h.href}>
                  <Link
                    href={h.href}
                    className="group inline-flex items-center gap-1 rounded-full border border-navy/10 bg-white px-3 py-1 text-xs text-navy/70 hover:border-navy/25 hover:text-navy"
                  >
                    {h.label}
                    <ArrowRight className="arrow-nudge h-3 w-3" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[11px] text-navy/35">
          Error 404 · Page not found
        </p>
      </div>
    </main>
  );
}
