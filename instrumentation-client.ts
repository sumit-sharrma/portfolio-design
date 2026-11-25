// ──────────────────────────────────────────────────────────────
// instrumentation-client.ts (project root)
// Same consent-gated start-up as src/instrumentation-client.ts. Nothing
// is sent to PostHog unless the visitor accepted, or is outside the
// EU and UK (see src/proxy.ts). This file used to start PostHog for
// every visitor, which bypassed the consent rules.
// ──────────────────────────────────────────────────────────────
import { startIfConsented } from "@/lib/analytics";

startIfConsented();
