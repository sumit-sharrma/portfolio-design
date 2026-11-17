// ──────────────────────────────────────────────────────────────
// src/components/projects/CaseProblem.tsx
// "The Problem": lede + numbered pain points in a ruled grid.
// ──────────────────────────────────────────────────────────────
import type { Project } from "@/lib/projects";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CaseSection } from "./CaseSection";
import { AreaTabs } from "./AreaTabs";

export function CaseProblem({ project }: { project: Project }) {
  const { lede, points, detail } = project.problem;
  return (
    <CaseSection id="problem" lede={lede}>
      <Stagger as="ol" onView className="panel grid divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
        {points.map((p, i) => (
          <StaggerItem as="li" key={p.title} className="p-5">
            <span className="font-mono text-micro text-warn">Issue {String(i + 1).padStart(2, "0")}</span>
            <h3 className="display mt-3 text-lg font-semibold tracking-tight text-fg">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-3">{p.body}</p>
          </StaggerItem>
        ))}
      </Stagger>
      {detail && (
        <div className="mt-12">
          <AreaTabs blocks={detail} />
        </div>
      )}
    </CaseSection>
  );
}
