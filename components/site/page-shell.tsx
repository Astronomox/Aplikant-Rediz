import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Announcement } from "./announcement";
import { nav } from "./content";

/** Chrome shared by every page: announcement, header, content, CTA + footer. */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <main className="overflow-x-clip bg-cream text-navy">
      <Announcement />
      <SiteHeader nav={nav} />
      {children}
      <SiteFooter />
    </main>
  );
}
