"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/CountUp.tsx
// Counts the numeric part of a metric ("−80%", "100+", "1,796")
// up when it scrolls into view. Non-numeric values render as-is.
// ──────────────────────────────────────────────────────────────
import { useEffect, useRef } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const NUM = /^([^\d]*)(\d[\d,]*)(.*)$/;

export function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();

  useEffect(() => {
    const match = value.match(NUM);
    if (!match || !inView || reduce || !ref.current) return;
    const [, pre, num, post] = match;
    const grouped = num.includes(",");
    const target = parseInt(num.replace(/,/g, ""), 10);
    const el = ref.current;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        const n = Math.round(v);
        el.textContent = `${pre}${grouped ? n.toLocaleString("en-US") : n}${post}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
    </span>
  );
}
