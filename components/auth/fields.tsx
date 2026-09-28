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
