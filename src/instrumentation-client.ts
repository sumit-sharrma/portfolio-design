// ──────────────────────────────────────────────────────────────
// src/instrumentation-client.ts
// Starts PostHog in the browser, once, before the app is interactive.
// The components call posthog.capture(...) directly, so this file is
// what makes those events reach PostHog.
//
// Settings come from .env.local (see .env.example):
//   NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN  the public project token (phc_…)
//   NEXT_PUBLIC_POSTHOG_HOST           https://us.i.posthog.com or eu
//
// Only production builds send data, and only when the site is served from a
// real domain. Anything served from localhost, 127.0.0.1 or [::1] (local
// previews and testing) is never sent to PostHog.
// ──────────────────────────────────────────────────────────────
import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);
const isLocal = LOCAL_HOSTS.has(window.location.hostname) || window.location.hostname.endsWith(".localhost");

if (token && host && process.env.NODE_ENV === "production" && !isLocal) {
  posthog.init(token, {
    api_host: host,
    // Page views on every in-app navigation, not only the first load
    capture_pageview: "history_change",
    // Profiles only for visitors who identify themselves; this site has none
    person_profiles: "identified_only",
  });
}
