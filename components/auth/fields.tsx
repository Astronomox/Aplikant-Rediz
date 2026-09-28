"use client";

import { Eye, EyeOff } from "lucide-react";
import { useId, useState, type InputHTMLAttributes, type ReactNode } from "react";

/*
 * Form primitives for the auth pages. Labels are real <label>s, errors are announced
 * via aria-describedby, and inputs are 44px tall for comfortable touch targets.
 */

/**
 * Where a valid form goes. The marketing site has no auth backend of its own, so this
 * hands off to the Aplikant app's auth page. Replace with the real auth call
 * (e.g. Supabase) when this site and the app share a backend.
 */
export const APP_AUTH_URL = "https://www.aplikant.app/auth";

export const INPUT =
  "h-11 w-full rounded-lg border border-navy/15 bg-white px-3 text-sm text-navy outline-none transition-colors placeholder:text-navy/35 focus:border-navy/50 focus:ring-4 focus:ring-navy/5 aria-[invalid=true]:border-[#ef4444]";

export function Field({
  label,
  error,
  hint,
  aside,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  aside?: ReactNode;
  children: (props: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <label htmlFor={id} className="text-xs font-medium text-navy/80">
          {label}
        </label>
        {aside}
      </div>
      {children({ id, describedBy: error || hint ? msgId : undefined, invalid: Boolean(error) })}
      {(error ?? hint) && (
        <p id={msgId} className={`mt-1.5 text-[11px] ${error ? "text-[#b91c1c]" : "text-navy/45"}`}>
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

export function PasswordInput(
  props: Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "className">,
) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input {...props} type={show ? "text" : "password"} className={`${INPUT} pr-11`} />
      <button
        type="button"
        onClick={() => {
          setShow((s) => !s);
        }}
        aria-label={show ? "Hide password" : "Show password"}
        className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-navy/45 hover:text-navy"
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}
