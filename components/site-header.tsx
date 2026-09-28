"use client";

import { AnimatePresence, m } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/components/motion/use-prefers-reduced-motion";
import { COLUMN } from "@/components/site/frame";
import { DotGrid } from "@/components/texture/dot-grid";

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Light, Attio-style header: colour logo, compact links, outlined "Sign in" beside a
 * solid primary. Sticky, with a hairline bottom edge that gains a soft shadow once
 * scrolled. Nav items are pages; the current one is highlighted from the URL.
 * Below md the links move into a menu sheet that opens exactly below the header
 * (measured, so the announcement bar above it can never cover the first item).
 */
export function SiteHeader({ nav }: { nav: readonly NavItem[] }) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const active = nav.find((n) => n.href !== "/" && pathname.startsWith(n.href))?.href ?? null;
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(56);
  const menuButton = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus: boolean) => {
    setMenuOpen(false);
    if (restoreFocus) menuButton.current?.focus();
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b border-navy/10 bg-cream/85 backdrop-blur-md transition-shadow duration-300 motion-reduce:transition-none ${
          scrolled || menuOpen ? "shadow-[0_6px_20px_-14px_rgba(15,23,42,0.35)]" : ""
        }`}
      >
        <div className={`${COLUMN} flex h-14 items-center justify-between px-5 sm:h-16 lg:px-8`}>
          <div className="flex items-center gap-8">
            <Link href="/" aria-label="Aplikant home" className="flex h-11 items-center">
              {/* 2:1 wordmark with built-in padding; negative margin trims it */}
              <Image
                src="/logo.png"
                alt="Aplikant"
                width={144}
                height={72}
                priority
                className="-my-4 h-auto w-[118px]"
              />
            </a>
            <nav className="hidden items-center gap-1 text-sm md:flex" aria-label="Primary">
              {nav.map((n) => {
                const current = active === n.href;
                return (
                  <a
                    key={n.label}
                    href={n.href}
                    aria-current={current ? "location" : undefined}
                    className={`rounded-md px-2.5 py-1.5 transition-colors hover:bg-navy/[0.05] hover:text-navy ${
                      current ? "text-navy" : "text-navy/60"
                    }`}
                  >
                    {n.label}
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="#"
              className="btn-press hidden h-9 items-center rounded-none border border-navy/15 bg-white px-3.5 text-sm font-medium text-navy shadow-sm hover:bg-navy/[0.03] md:inline-flex"
            >
              Sign in
            </a>
            <a
              href="#"
              className="btn-press inline-flex h-9 items-center rounded-none bg-navy px-3.5 text-sm font-medium text-white shadow-sm hover:bg-navy/90"
            >
              <span className="md:hidden">Sign up</span>
              <span className="hidden md:inline">Sign up free</span>
            </a>
            <button
              ref={menuButton}
              type="button"
              className="-mr-2 flex h-11 w-11 items-center justify-center rounded-lg text-navy/80 hover:bg-navy/[0.05] md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => {
                setMenuOpen((o) => !o);
              }}
            >
              {menuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would make it the containing block
          for this fixed-position sheet. */}
      <AnimatePresence>
        {menuOpen && <MobileMenu nav={nav} active={active} onClose={closeMenu} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({
  nav,
  active,
  onClose,
}: {
  nav: readonly NavItem[];
  active: string | null;
  onClose: (restoreFocus: boolean) => void;
}) {
  const reduced = usePrefersReducedMotion();
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    firstLink.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(true);
    };
    const mql = window.matchMedia("(min-width: 768px)");
    const onWide = (e: MediaQueryListEvent) => {
      if (e.matches) onClose(false);
    };
    window.addEventListener("keydown", onKey);
    mql.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      mql.removeEventListener("change", onWide);
    };
  }, [onClose]);

  const t = reduced ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <m.div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      className="fixed inset-x-0 bottom-0 top-16 z-40 flex flex-col overflow-y-auto bg-navy text-white md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={t}
    >
      <DotGrid id="menu-grid" fade="top" />
      <nav aria-label="Mobile" className="relative px-5 pt-2">
        <ul>
          {nav.map((n, i) => (
            <m.li
              key={n.label}
              initial={{ opacity: 0, y: reduced ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...t, delay: reduced ? 0 : 0.04 + i * 0.04 }}
              className="border-b border-white/10"
            >
              <a
                ref={i === 0 ? firstLink : undefined}
                href={n.href}
                aria-current={active === n.href ? "location" : undefined}
                onClick={() => {
                  onClose(false);
                }}
                className="group flex items-center justify-between py-4 text-xl font-medium tracking-tight"
              >
                <span className={active === n.href ? "text-gold" : "text-white"}>{n.label}</span>
                <ArrowRight className="arrow-nudge h-4 w-4 text-white/40" aria-hidden="true" />
              </a>
            </m.li>
          ))}
        </ul>
      </nav>
      <div className="relative mt-auto space-y-2.5 px-5 pb-8 pt-8">
        <a
          href="#"
          onClick={() => {
            onClose(false);
          }}
          className="btn-gold flex h-12 items-center justify-center rounded-none text-[15px]"
        >
          Sign up free
        </a>
        <a
          href="#"
          onClick={() => {
            onClose(false);
          }}
          className="btn-press flex h-12 items-center justify-center rounded-none border border-white/20 text-[15px] font-medium hover:bg-white/5"
        >
          Sign in
        </a>
        <p className="pt-1 text-center text-xs text-white/40">
          Free forever · No credit card required
        </p>
      </div>
    </m.div>
  );
}
