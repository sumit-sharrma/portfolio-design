"use client";
// ──────────────────────────────────────────────────────────────
// src/components/home/Hero.tsx
// Home hero: staggered word reveal on the headline, the
// subheadline, two actions, and a "title block" (the fact table
// in the corner of a drawing sheet) with role, history and
// measured outcomes.
// ──────────────────────────────────────────────────────────────
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const line1 = ["Architecting", "systems"];
const line2 = ["where", "design", "meets", "logic."];

function Word({ children, i, dim }: { children: string; i: number; dim?: boolean }) {
  return (
    <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
      <motion.span
        className={dim ? "inline-block text-fg-3" : "inline-block"}
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.05 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

const facts: [string, string][] = [
  ["Role", "Lead Product Designer, Design Systems"],
  ["Now", "Cars24"],
  ["Before", "Tide · Jupiter Money · Paytm"],
  ["Started as", "Front-end engineer"],
  ["Based", site.location],
];

const figures = [
  { value: "10+", label: "years" },
  { value: "100+", label: "components governed" },
  { value: "130+", label: "partners served" },
];

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40">
      <Stagger>
        <StaggerItem as="p" className="mono-tag text-fg-3">
          Portfolio · 2018 to 2026
        </StaggerItem>
      </Stagger>

      <h1
        className="mt-6 max-w-[15ch] text-display font-semibold text-fg"
        data-spec="text.display · font.display · color.fg"
      >
        <span className="sr-only">Architecting systems where design meets logic.</span>
        <span aria-hidden="true">
          {line1.map((w, i) => (
            <span key={w}>
              <Word i={i}>{w}</Word>{" "}
            </span>
          ))}
          {line2.map((w, i) => (
            <span key={w}>
              <Word i={i + line1.length} dim={w === "where" || w === "meets"}>
                {w}
              </Word>{" "}
            </span>
          ))}
        </span>
      </h1>

      <div className="mt-12 grid gap-12 border-t border-line pt-8 md:grid-cols-12 md:gap-4">
        <Stagger delay={0.45} gap={0.09} className="md:col-span-6">
          <StaggerItem as="p" className="max-w-[52ch] text-lede text-fg-2">
            <span data-spec="text.lede · font.sans · color.fg-2">
              I’m <span className="text-fg">{site.name}</span>. A Lead Product Designer and former Software
              Engineer who builds scalable design systems, automated tooling, and AI-assisted workflows.
            </span>
          </StaggerItem>

          <StaggerItem className="mt-8 flex flex-wrap gap-3">
            <a
              href="#work"
              className="group inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] bg-fg px-5 text-sm font-medium text-bg transition-[background-color,transform] duration-150 ease-snap hover:bg-accent active:scale-[0.97]"
              data-spec="button.primary · radius.control · color.fg"
            >
              See the work
              <ArrowDown aria-hidden="true" className="size-4 transition-transform duration-150 ease-snap group-hover:translate-y-0.5" />
            </a>
            <Link
              href="/about"
              className="group inline-flex h-11 items-center gap-2 rounded-[var(--radius-control)] border border-line-2 px-5 text-sm font-medium text-fg transition-colors duration-150 hover:border-accent hover:text-accent"
              data-spec="button.secondary · radius.control · rule.line-2"
            >
              About me
              <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-150 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </StaggerItem>
        </Stagger>

        {/* Title block */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.6 }}
          className="md:col-span-5 md:col-start-8"
          data-spec="title-block · surface · rule.line"
        >
          <dl className="panel divide-y divide-line">
            {facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-2.5">
                <dt className="mono-tag pt-0.5 text-fg-3">{k}</dt>
                <dd className="text-sm text-fg">{v}</dd>
              </div>
            ))}
            <div className="grid grid-cols-3 divide-x divide-line">
              {figures.map((f) => (
                <div key={f.label} className="px-4 py-3">
                  <dd className="display text-2xl font-semibold tracking-tight text-fg">{f.value}</dd>
                  <dt className="mt-0.5 font-mono text-micro text-fg-3">{f.label}</dt>
                </div>
              ))}
            </div>
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
