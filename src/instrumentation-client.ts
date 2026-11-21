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
// Only production builds send data, so local development is not counted.
// ──────────────────────────────────────────────────────────────
import posthog from "posthog-js";

const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

if (token && host && process.env.NODE_ENV === "production") {
  posthog.init(token, {
    api_host: host,
    // Page views on every in-app navigation, not only the first load
    capture_pageview: "history_change",
    // Profiles only for visitors who identify themselves; this site has none
    person_profiles: "identified_only",
  });
}
