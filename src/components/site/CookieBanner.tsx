"use client";
// ──────────────────────────────────────────────────────────────
// src/components/site/CookieBanner.tsx
// Asks the visitor before any analytics runs. Shown until they
// choose Accept or Decline. The choice is remembered on this device.
// The footer's "Cookie settings" button reopens it.
// ──────────────────────────────────────────────────────────────
import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { acceptAnalytics, declineAnalytics, getConsent } from "@/lib/analytics";

export const OPEN_COOKIE_SETTINGS = "open-cookie-settings";

// Reads the saved choice without an effect. The server renders "pending", so the banner
// never flashes for a visitor who has already decided.
const noSubscribe = () => () => {};

export function CookieBanner() {
  const stored = useSyncExternalStore(noSubscribe, getConsent, () => "pending" as const);
  // null = follow the saved choice; true/false = set by the buttons or the footer link
  const [override, setOverride] = useState<boolean | null>(null);
  const visible = override ?? stored === null;

  useEffect(() => {
    const show = () => setOverride(true);
    window.addEventListener(OPEN_COOKIE_SETTINGS, show);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS, show);
  }, []);

  if (!visible) return null;

  const accept = () => {
    acceptAnalytics();
    setOverride(false);
  };
  const decline = () => {
    declineAnalytics();
    setOverride(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-2xl border border-line-2 bg-surface p-5 shadow-2xl sm:p-6"
    >
      <p id="cookie-title" className="mono-tag text-fg-3">Cookies</p>
      <p className="mt-3 text-sm leading-relaxed text-fg-2">
        This site uses PostHog to count visits and see which parts of the portfolio are used. It only
        starts if you accept. If you decline, nothing is stored or sent. Read the{" "}
        <Link href="/privacy" className="text-accent underline underline-offset-4">privacy notice</Link>.
      </p>
      <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={decline}
          className="h-10 rounded-[var(--radius-control)] border border-line-2 px-4 text-sm font-medium text-fg-2 transition-colors duration-150 hover:border-fg-3 hover:text-fg"
        >
          Decline
        </button>
        <button
          type="button"
          onClick={accept}
          className="h-10 rounded-[var(--radius-control)] bg-fg px-4 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent"
        >
          Accept analytics
        </button>
      </div>
    </div>
  );
}

/** Footer button that reopens the banner so a visitor can change their choice. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className="hover:text-accent"
    >
      Cookie settings
    </button>
  );
}
