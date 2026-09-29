"use client";

import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

/** Top strip (Attio's "Orchestrate revenue agents…" bar). Copy is a real Growth feature. */
export function Announcement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-[#0a1020] text-white">
      <a
        href="/pricing"
        className="group mx-auto flex h-8 max-w-[72.5rem] items-center justify-center gap-1.5 px-10 text-center text-xs font-medium sm:h-10 sm:px-12 sm:text-[13px]"
      >
        <span className="truncate">
          <span className="text-gold">New</span> · Run pitch competitions & hackathons on Growth
        </span>
        <ArrowRight className="arrow-nudge h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      </a>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => {
          setOpen(false);
        }}
        className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
      >
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
