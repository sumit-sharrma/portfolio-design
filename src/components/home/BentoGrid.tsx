"use client";
// ──────────────────────────────────────────────────────────────
// src/components/home/BentoGrid.tsx
// The Work section on Home, in two groups driven by each
// project's `category` in src/lib/projects.ts:
//
//   Case studies   (lg: 2 equal cols)
//     [ first: full-width feature          ]
//     [ case study ][ case study ]
//     [ case study ][ record      ]
//   Tools created  (lg: 3 equal cols)
//     [ tool ][ tool ][ tool ]
//
// Tablet: 2 cols. Mobile: single column, same order.
// ──────────────────────────────────────────────────────────────
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { track } from "@/lib/analytics";
import { inCategory, type Project } from "@/lib/projects";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Case studies sit in two columns, so the feature spans both.
// Tools sit in three, so the feature spans all three.
const spanTwo: Record<Project["size"], string> = {
  full: "md:col-span-2",
  wide: "md:col-span-2",
  tall: "",
  base: "",
};
const spanThree: Record<Project["size"], string> = {
  full: "md:col-span-2 lg:col-span-3",
  wide: "md:col-span-2",
  tall: "lg:row-span-2",
  base: "",
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

const two = (n: number) => String(n).padStart(2, "0");

export function BentoGrid() {
  const studies = inCategory("case-study");
  const tools = inCategory("tool");

  return (
    <div id="work" className="scroll-mt-24">
      {/* ── Case studies ─────────────────────────────────── */}
      <section aria-labelledby="case-studies" className="mx-auto max-w-6xl px-4 pt-28 sm:px-6">
        <GroupHeading
          id="case-studies"
          title="Case studies"
          note="System-level work, told start to finish."
          count={studies.length}
        />
        <Grid columns="two">
          {studies.map((p, i) => (
            <motion.li key={p.slug} variants={item} className={spanTwo[p.size]}>
              <ProjectCard project={p} feature={i === 0} />
            </motion.li>
          ))}
          <motion.li variants={item}>
            <RecordTile />
          </motion.li>
        </Grid>
      </section>

      {/* ── Tools created ────────────────────────────────── */}
      <section aria-labelledby="tools" className="mx-auto max-w-6xl px-4 pt-24 sm:px-6">
        <GroupHeading
          id="tools"
          title="Tools created"
          note="Things I built so the system enforces itself."
          count={tools.length}
        />
        <Grid columns="three">
          {tools.map((p) => (
            <motion.li key={p.slug} variants={item} className={spanThree[p.size]}>
              <ProjectCard project={p} />
            </motion.li>
          ))}
        </Grid>
      </section>
    </div>
  );
}

function GroupHeading({ id, title, note, count }: { id: string; title: string; note: string; count: number }) {
  return (
    <Reveal className="mb-8 flex flex-col gap-2 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2
          id={id}
          className="scroll-mt-24 text-headline font-semibold text-fg"
          data-spec="text.headline · font.display · color.fg"
        >
          {title}
        </h2>
        <p className="mt-2 text-sm text-fg-3">{note}</p>
      </div>
      <p className="mono-tag shrink-0 text-fg-3">{two(count)}</p>
    </Reveal>
  );
}

function Grid({ children, columns }: { children: React.ReactNode; columns: "two" | "three" }) {
  return (
    <motion.ul
      className={cn(
        "grid grid-flow-dense auto-rows-[minmax(24rem,auto)] grid-cols-1 gap-4 md:grid-cols-2",
        columns === "three" && "lg:grid-cols-3",
      )}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.07 }}
    >
      {children}
    </motion.ul>
  );
}

function ProjectCard({ project, feature }: { project: Project; feature?: boolean }) {
  const kind = project.category === "tool" ? "tool" : "case study";
  return (
    <Link
      href={`/projects/${project.slug}`}
      onClick={() =>
        track("project_opened", {
          project_slug: project.slug,
          project_category: project.category,
          navigation_source: "home_work_grid",
        })
      }
      className="group block h-full focus-visible:outline-none"
      aria-label={`${project.title}: read the ${kind}`}
    >
      <Card className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="mono-tag text-fg-3">
            {project.index} / {project.timeline}
          </span>
          <ArrowUpRight
            className="size-4 text-fg-3 transition-[color,transform] duration-150 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            aria-hidden="true"
          />
        </div>

        {/* The feature card puts the visual beside the text on desktop */}
        <div className={cn("flex flex-1 flex-col", feature && "lg:grid lg:grid-cols-[1.35fr_1fr]")}>
          <ProjectVisual
            kind={project.visual}
            className={cn("min-h-60 flex-1", feature && "min-h-[23rem] lg:min-h-72")}
          />

          <div className={cn("border-t border-line p-4", feature && "lg:flex lg:flex-col lg:justify-end lg:border-t-0 lg:border-l lg:p-6")}>
            <h3
              className={cn("display font-semibold tracking-tight text-fg", feature ? "text-2xl lg:text-4xl" : "text-xl")}
              data-spec="text.title · font.display · color.fg"
            >
              {project.title}
            </h3>
            <p className={cn("mt-2 text-sm leading-relaxed text-fg-3", feature ? "lg:mt-3 lg:text-base" : "line-clamp-3")}>
              {project.summary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1" aria-label="Stack">
              {project.stack.slice(0, feature ? 5 : 4).map((t) => (
                <li key={t} className="font-mono text-[11px] text-fg-2" data-spec="tag · text.micro · font.mono">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </Link>
  );
}

/* Measured outcomes, with where each one was measured. */
function RecordTile() {
  const rows = [
    { value: "0 min", label: "downtime during migration", src: "Cars24" },
    { value: "−80%", label: "documentation cost", src: "Tide" },
    { value: "−30%", label: "QA cycles after handoff", src: "Cars24" },
  ];
  return (
    <Card className="flex h-full flex-col" spec="card.record · surface · rule.line">
      <div className="border-b border-line px-4 py-2.5">
        <span className="mono-tag text-fg-3">Measured, not projected</span>
      </div>
      <dl className="flex flex-1 flex-col divide-y divide-line">
        {rows.map((r) => (
          <div key={r.label} className="flex flex-1 flex-col-reverse justify-center px-4 py-3">
            <dt className="mt-1 flex items-baseline justify-between gap-3 text-sm text-fg-2">
              {r.label}
              <span className="font-mono text-micro text-fg-3">{r.src}</span>
            </dt>
            <dd className="display text-4xl font-semibold tracking-tight text-fg">{r.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
