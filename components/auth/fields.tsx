"use client";

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
