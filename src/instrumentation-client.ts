// ──────────────────────────────────────────────────────────────
// src/instrumentation-client.ts
// Runs once in the browser before the app becomes interactive.
// Resumes analytics only for visitors who have already accepted
// the cookie banner. Everyone else gets no analytics code at all.
// ──────────────────────────────────────────────────────────────
import { startIfConsented } from "@/lib/analytics";

startIfConsented();
