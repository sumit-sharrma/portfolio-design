"use client";
// ──────────────────────────────────────────────────────────────
// src/components/motion/Reveal.tsx
// Scroll + load reveal primitives.
//   <Stagger>   parent that staggers its <StaggerItem> children
//   <Reveal>    single element that fades + slides up on view
// ──────────────────────────────────────────────────────────────
import { motion, type Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

type Tag = "div" | "section" | "ul" | "ol" | "li" | "header" | "article" | "p" | "span" | "h1" | "h2";

type BaseProps = {
  children: React.ReactNode;
  className?: string;
  as?: Tag;
};

export function Stagger({
  children,
  className,
  as = "div",
  delay = 0,
  gap = 0.08,
  onView = false,
}: BaseProps & { delay?: number; gap?: number; onView?: boolean }) {
  const M = motion[as];
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap, delayChildren: delay } },
  };
  return (
    <M
      className={className}
      variants={variants}
      initial="hidden"
      {...(onView
        ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } }
        : { animate: "show" })}
    >
      {children}
    </M>
  );
}

export function StaggerItem({ children, className, as = "div" }: BaseProps) {
  const M = motion[as];
  return (
    <M className={className} variants={fadeUp}>
      {children}
    </M>
  );
}

export function Reveal({
  children,
  className,
  as = "div",
  delay = 0,
}: BaseProps & { delay?: number }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}
