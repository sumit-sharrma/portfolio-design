"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/ScrollProgress.tsx
// 1px reading-progress line pinned to the top of the viewport.
// ──────────────────────────────────────────────────────────────
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
