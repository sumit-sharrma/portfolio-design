// ──────────────────────────────────────────────────────────────
// src/components/projects/CaseImpact.tsx
// "The Impact": large metric typography with a count-up on view,
// plus an optional line on what has not been measured.
// ──────────────────────────────────────────────────────────────
import type { Project } from "@/lib/projects";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { CaseSection } from "./CaseSection";
import { CountUp } from "./CountUp";

export function CaseImpact({ project }: { project: Project }) {
  const { lede, metrics, notMeasured } = project.impact;
  const four = metrics.length === 4;
  return (
    <CaseSection id="impact" lede={lede}>
      <Stagger
        onView
        gap={0.08}
        className={cn(
          // 1px gaps over a line-colored background draw the inner rules at any column count
          "panel grid gap-px overflow-hidden bg-line",
          four ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3",
        )}
      >
        {metrics.map((m) => (
          <StaggerItem key={m.label} className="bg-surface p-5 sm:p-6">
            <p
              className={cn(
                "display leading-none font-semibold tracking-[-0.04em] text-fg",
                four ? "text-[clamp(2.75rem,4.6vw,3.75rem)]" : "text-[clamp(3rem,6vw,4.75rem)]",
              )}
              data-spec="text.metric · font.display · color.fg"
            >
              <CountUp value={m.value} />
            </p>
            <p className="mt-5 border-t border-line pt-3 text-base font-medium text-fg">{m.label}</p>
            {m.note && <p className="mt-1 font-mono text-micro text-fg-3">{m.note}</p>}
          </StaggerItem>
        ))}
      </Stagger>
      {notMeasured && (
        <p className="mt-4 max-w-[70ch] border-l-2 border-warn pl-4 text-sm leading-relaxed text-fg-3">{notMeasured}</p>
      )}
    </CaseSection>
  );
}
