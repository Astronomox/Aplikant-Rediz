"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState, type ReactNode } from "react";

/**
 * Content that is collapsible below lg and always shown from lg up.
 * The toggle is a real button with aria-expanded/aria-controls; from lg it is hidden
 * and the content is forced visible, so desktop behaves as plain static content.
 */
export function Disclosure({
  label,
  children,
  className = "",
  onDark = false,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  /** Light toggle text for use on navy backgrounds. */
  onDark?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => {
          setOpen((o) => !o);
        }}
        className={`flex min-h-11 w-full items-center justify-between gap-2 text-left text-xs font-semibold lg:hidden ${
          onDark ? "text-white/70" : "text-navy/60"
        }`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>
      <div id={id} className={`${open ? "block" : "hidden"} lg:block`}>
        {children}
      </div>
    </div>
  );
}
