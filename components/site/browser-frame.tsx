import type { ReactNode } from "react";

/** A browser window frame for showing the product. */
export function BrowserFrame({ url, children }: { url: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-navy/10 bg-navy text-white shadow-[0_24px_60px_-30px_rgba(15,23,42,0.5)] sm:rounded-2xl">
      <div className="flex h-8 items-center gap-3 border-b border-white/10 px-3 sm:h-10 sm:px-4">
        <span className="flex gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-[#ff5f57] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#febc2e] sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-[#28c840] sm:h-2.5 sm:w-2.5" />
        </span>
        <span className="text-[11px] text-white/45 sm:text-xs">{url}</span>
      </div>
      {children}
    </div>
  );
}
