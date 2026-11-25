// ──────────────────────────────────────────────────────────────
// src/lib/analytics.ts
// The only place the site talks to PostHog.
//
// Nothing is loaded, stored or sent until the visitor accepts the
// cookie banner. Until then, track() does nothing, and PostHog's
// script is not downloaded at all. That keeps the first page load light.
//
// Analytics also stays off in development builds and when the site
// is served from localhost, 127.0.0.1, [::1] or *.localhost.
// ──────────────────────────────────────────────────────────────
import type { PostHog } from "posthog-js";

const CONSENT_KEY = "analytics-consent";
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

export type Consent = "accepted" | "declined";

function isLiveSite(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production" || !token || !host) return false;
  const h = window.location.hostname;
  const local = ["localhost", "127.0.0.1", "[::1]", "::1"].includes(h) || h.endsWith(".localhost");
  return !local;
}

/** The visitor's saved choice, or null if they have not chosen yet. */
export function getStoredChoice(): Consent | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "declined" ? v : null;
  } catch {
    return null;
  }
}

/** "eu" or "other", from the cookie set by src/proxy.ts. Null before it is set. */
export function getRegion(): "eu" | "other" | null {
  const match = document.cookie.match(/(?:^|;\s*)visitor-region=(eu|other)/);
  return match ? (match[1] as "eu" | "other") : null;
}

/**
 * Whether analytics may run. Outside the EU there is no banner, so analytics runs by default.
 * Inside the EU, it runs only after the visitor accepts.
 */
export function getConsent(): Consent | null {
  const stored = getStoredChoice();
  if (stored !== null) return stored;
  return getRegion() === "other" ? "accepted" : null;
}

function saveConsent(value: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the choice simply lasts for this visit only.
  }
}

// PostHog is downloaded and started the first time it is needed, and only once.
let client: Promise<PostHog> | null = null;

function load(): Promise<PostHog> {
  if (!client) {
    client = import("posthog-js").then(({ default: posthog }) => {
      posthog.init(token as string, {
        api_host: host,
        // Page views on every in-app navigation, not only the first load
        capture_pageview: "history_change",
        // Profiles only for visitors who identify themselves; this site has none
        person_profiles: "identified_only",
      });
      return posthog;
    });
  }
  return client;
}

/** Call once on startup: resumes analytics for a visitor who already accepted. */
export function startIfConsented() {
  if (isLiveSite() && getConsent() === "accepted") void load();
}

/** Records an event. Does nothing unless the visitor has accepted analytics. */
export function track(event: string, properties?: Record<string, unknown>) {
  if (!isLiveSite() || getConsent() !== "accepted") return;
  void load().then((ph) => ph.capture(event, properties));
}

/** Reports an unexpected error. Only when the visitor has accepted analytics. */
export function captureError(error: unknown) {
  if (!isLiveSite() || getConsent() !== "accepted") return;
  void load().then((ph) => ph.captureException(error));
}

export function acceptAnalytics() {
  saveConsent("accepted");
  if (isLiveSite()) void load();
}

export function declineAnalytics() {
  saveConsent("declined");
  // If PostHog was already running in this visit, stop it sending anything more.
  if (client) void client.then((ph) => ph.opt_out_capturing());
}
