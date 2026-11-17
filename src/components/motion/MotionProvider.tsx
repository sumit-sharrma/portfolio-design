"use client";
// ──────────────────────────────────────────────────────────────
// src/components/motion/MotionProvider.tsx
// Global motion config. reducedMotion="user" makes every Framer
// animation respect the OS "reduce motion" setting automatically.
// ──────────────────────────────────────────────────────────────
import { MotionConfig } from "framer-motion";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
