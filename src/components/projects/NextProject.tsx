"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/NextProject.tsx
// Full-width link to the next case study (wraps to the first).
// ──────────────────────────────────────────────────────────────
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { categoryLabel, type Project } from "@/lib/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";

export function NextProject({ project }: { project: Project }) {
  return (
    <Reveal className="mx-auto mt-8 max-w-6xl px-4 sm:px-6">
      <Link
        href={`/projects/${project.slug}`}
        onClick={() =>
          track("project_opened", {
            project_slug: project.slug,
            project_category: project.category,
            navigation_source: "next_project",
          })
        }
        className="group block focus-visible:outline-none"
      >
        <Card className="flex items-center justify-between gap-6 p-5 sm:p-8">
          <div>
            <p className="mono-tag text-fg-3">
              Next · {categoryLabel[project.category]} {project.index}
            </p>
            <p className="display mt-3 text-headline font-semibold text-fg">{project.title}</p>
          </div>
          <ArrowRight
            className="size-6 shrink-0 text-fg-3 transition-[color,transform] duration-150 ease-snap group-hover:translate-x-1 group-hover:text-accent"
            aria-hidden="true"
          />
        </Card>
      </Link>
    </Reveal>
  );
}
