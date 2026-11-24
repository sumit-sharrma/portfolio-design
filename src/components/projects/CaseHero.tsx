// ──────────────────────────────────────────────────────────────
// src/components/projects/CaseHero.tsx
// Case-study hero: back link, title, one-line summary, metadata
// (Role · Timeline · Stack) and the project's generated visual.
// ──────────────────────────────────────────────────────────────
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { categoryLabel, inCategory, type Project } from "@/lib/projects";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProjectVisual } from "./ProjectVisual";

export function CaseHero({ project }: { project: Project }) {
  return (
    <header className="mx-auto max-w-6xl px-4 pt-28 sm:px-6 sm:pt-36">
      <Stagger gap={0.06}>
        <StaggerItem className="flex items-center justify-between">
          <Link
            href={project.category === "tool" ? "/#tools" : "/#case-studies"}
            className="group inline-flex items-center gap-2 font-mono text-micro uppercase tracking-wider text-fg-3 transition-colors duration-150 hover:text-accent"
          >
            <ArrowLeft className="size-3.5 transition-transform duration-150 ease-snap group-hover:-translate-x-0.5" aria-hidden="true" />
            All work
          </Link>
          <span className="mono-tag text-fg-3">
            {categoryLabel[project.category]} {project.index} / {String(inCategory(project.category).length).padStart(2, "0")}
          </span>
        </StaggerItem>

        <StaggerItem
          as="h1"
          className="mt-8 max-w-[18ch] text-display font-semibold text-fg"
        >
          <span data-spec="text.display · font.display · color.fg">{project.title}</span>
        </StaggerItem>

        {/* Not animated: the summary is the page's largest text and must show on first paint */}
        <p className="mt-6 max-w-[60ch] text-lede text-fg-2">
          <span data-spec="text.lede · font.sans · color.fg-2">{project.summary}</span>
        </p>

        <StaggerItem>
          <dl
            className="panel mt-12 grid divide-y divide-line sm:grid-cols-[1fr_1fr_2fr] sm:divide-x sm:divide-y-0"
            data-spec="meta · surface · rule.line"
          >
            <Meta label="Role">{project.role}</Meta>
            <Meta label="Timeline">{project.timeline}</Meta>
            <Meta label="Stack / Tools">
              <ul className="flex flex-wrap gap-x-3 gap-y-1">
                {project.stack.map((t) => (
                  <li key={t} className="font-mono text-[11px] text-fg-2">
                    {t}
                  </li>
                ))}
              </ul>
            </Meta>
          </dl>
        </StaggerItem>

        <StaggerItem className="panel group relative mt-4 h-72 overflow-hidden sm:h-96">
          <ProjectVisual kind={project.visual} />
        </StaggerItem>
      </Stagger>
    </header>
  );
}

function Meta({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="p-4">
      <dt className="mono-tag text-fg-3">{label}</dt>
      <dd className="mt-2 text-sm text-fg">{children}</dd>
    </div>
  );
}
