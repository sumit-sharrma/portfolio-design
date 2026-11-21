"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/AreaTabs.tsx
// Shows one area of detail at a time. Each tab carries its row
// count, so the reader can see how much is behind it before
// opening it. Click a tab, or use the left/right arrow keys.
// Used for a case study's Problem detail (`problem.detail`).
// ──────────────────────────────────────────────────────────────
import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import posthog from "posthog-js";
import type { MediaBlock } from "@/lib/projects";
import { Media } from "./CaseSolution";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

export function AreaTabs({ blocks }: { blocks: MediaBlock[] }) {
  const [i, setI] = useState(0);
  const active = blocks[i];
  const base = "tide-area";

  const select = (n: number) => {
    posthog.capture("case_area_selected", { area_index: n });
    setI(n);
    document.getElementById(`${base}-tab-${n}`)?.focus();
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowRight") select((i + 1) % blocks.length);
    if (e.key === "ArrowLeft") select((i - 1 + blocks.length) % blocks.length);
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Areas of the current situation"
        className="flex gap-1 overflow-x-auto border-b border-line pb-3"
      >
        {blocks.map((b, n) => {
          const on = n === i;
          const rows = b.rows?.length ?? 0;
          return (
            <button
              key={b.title}
              id={`${base}-tab-${n}`}
              role="tab"
              type="button"
              aria-selected={on}
              aria-controls={`${base}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => select(n)}
              onKeyDown={onKey}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-[var(--radius-control)] border px-3 py-2 text-sm transition-colors duration-150",
                on
                  ? "border-accent bg-accent-wash text-fg"
                  : "border-line-2 text-fg-3 hover:border-fg-3 hover:text-fg-2",
              )}
            >
              {b.title.split(":")[0]}
              <span className={cn("font-mono text-micro", on ? "text-accent" : "text-fg-3")}>{rows}</span>
            </button>
          );
        })}
      </div>

      <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${i}`} className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Media block={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
