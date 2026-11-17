"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/SectionRail.tsx
// Sticky docs-style section nav (desktop only). Highlights the
// section currently in view.
// ──────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { caseSections } from "./CaseSection";
import { cn } from "@/lib/utils";

export function SectionRail() {
  const [active, setActive] = useState<string>(caseSections[0].id);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    caseSections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <nav aria-label="Case study sections" className="hidden lg:block">
      <ul className="sticky top-32 mt-20 space-y-1 border-l border-line">
        {caseSections.map((s) => {
          const on = active === s.id;
          return (
            <li key={s.id} className="relative">
              {on && (
                <motion.span
                  layoutId="rail"
                  className="absolute top-0 -left-px h-full w-px bg-accent"
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                />
              )}
              <a
                href={`#${s.id}`}
                className={cn(
                  "block py-1.5 pl-4 text-sm transition-colors duration-150",
                  on ? "text-fg" : "text-fg-3 hover:text-fg-2",
                )}
              >
                <span className="mr-2 font-mono text-micro text-fg-3">{s.index}</span>
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
