// ──────────────────────────────────────────────────────────────
// src/app/projects/[slug]/page.tsx  →  route: /projects/:slug
// Case-study template: Hero → Problem → Architecture/Solution →
// Impact → Next project. Every slug in projects.ts is prerendered.
// Used for both categories (case studies and tools).
// (Cache Components is on, so unknown slugs 404 via notFound().)
// ──────────────────────────────────────────────────────────────
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects, getProject, getAdjacent } from "@/lib/projects";
import { CaseHero } from "@/components/projects/CaseHero";
import { CaseProblem } from "@/components/projects/CaseProblem";
import { CaseSolution } from "@/components/projects/CaseSolution";
import { CaseImpact } from "@/components/projects/CaseImpact";
import { NextProject } from "@/components/projects/NextProject";
import { SectionRail } from "@/components/projects/SectionRail";
import { ScrollProgress } from "@/components/projects/ScrollProgress";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

// `params` is read inside <Suspense> so the route shell can render instantly
// on navigation (Cache Components guidance for dynamic segments).
export default function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/projects/[slug]">, "params">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const { next } = getAdjacent(slug);

  return (
    <article>
      <ScrollProgress />
      <CaseHero project={project} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:grid lg:grid-cols-[10rem_1fr] lg:gap-12">
        <SectionRail />
        <div className="min-w-0">
          <CaseProblem project={project} />
          <CaseSolution project={project} />
          <CaseImpact project={project} />
        </div>
      </div>
      <NextProject project={next} />
    </article>
  );
}
