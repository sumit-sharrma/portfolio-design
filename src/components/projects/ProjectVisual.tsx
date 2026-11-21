"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/ProjectVisual.tsx
// Abstract, code-built graphics for each project. No images
// needed. Each reacts to the parent card's hover via the
// `group` class (Tailwind group-hover), so motion stays in CSS.
// ──────────────────────────────────────────────────────────────
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { turboBrands, type ProjectVisual as Kind } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function ProjectVisual({ kind, className }: { kind: Kind; className?: string }) {
  return (
    <div className={cn("relative h-full w-full overflow-hidden", className)} aria-hidden="true">
      {kind === "lint" && <LintVisual />}
      {kind === "mcp" && <McpVisual />}
      {kind === "pipeline" && <PipelineVisual />}
      {kind === "tiers" && <TiersVisual />}
      {kind === "contexts" && <ContextsVisual />}
      {kind === "halve" && <HalveVisual />}
      {kind === "areas" && <AreasVisual />}
    </div>
  );
}

/* 01 — A layer list with one flagged row and its token fix. */
function LintVisual() {
  const rows = [
    { name: "Button / Primary", ok: true },
    { name: "Card / Elevated", ok: true },
    { name: "Frame 214", ok: false },
    { name: "Input / Default", ok: true },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-sm rounded-md border border-line-2 bg-bg p-3 font-mono text-[11px] transition-transform duration-300 ease-snap group-hover:-translate-y-1">
        <div className="mb-2 flex items-center justify-between px-1 text-fg-3">
          <span>layers</span>
          <span className="text-warn">1 issue</span>
        </div>
        <ul className="space-y-1">
          {rows.map((r) => (
            <li
              key={r.name}
              className={cn(
                "flex items-center justify-between rounded-sm px-2 py-1.5",
                r.ok ? "text-fg-3" : "border border-warn/30 bg-warn/10 text-fg",
              )}
            >
              <span className="flex items-center gap-2">
                <span className={cn("size-2.5 rounded-[3px] border", r.ok ? "border-fg-3/50" : "border-warn")} />
                {r.name}
              </span>
              <span className={r.ok ? "text-ok" : "text-warn"}>{r.ok ? "✓" : "#3B82F6"}</span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center gap-2 rounded-sm border border-accent/40 bg-accent-wash px-2 py-1.5 text-fg transition-[border-color] duration-150 group-hover:border-accent">
          <span className="text-accent">fix →</span> color.action.primary
        </div>
      </div>
    </div>
  );
}

/* 02 — Prompt → MCP core → component nodes, orbiting rings. */
function McpVisual() {
  const nodes = [
    { label: "<Button/>", x: "12%", y: "18%" },
    { label: "<ChipV2/>", x: "64%", y: "12%" },
    { label: "<PhoneInput/>", x: "8%", y: "72%" },
    { label: "tokens", x: "66%", y: "76%" },
  ];
  return (
    <div className="absolute inset-0">
      <svg className="absolute inset-0 size-full" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid slice">
        {[150, 110, 70].map((r, i) => (
          <circle
            key={r}
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke="white"
            strokeOpacity={0.06 + i * 0.03}
            strokeDasharray={i === 0 ? "2 6" : undefined}
            className="origin-center transition-transform duration-700 ease-out group-hover:rotate-[30deg]"
            style={{ transformBox: "fill-box" }}
          />
        ))}
        {[
          [200, 200, 80, 90],
          [200, 200, 300, 70],
          [200, 200, 70, 300],
          [200, 200, 310, 320],
        ].map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--color-accent)"
            strokeOpacity="0.5"
            strokeDasharray="3 5"
            className="[animation:dash_2.4s_linear_infinite]"
          />
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-md border border-accent bg-bg font-mono text-xs text-accent transition-transform duration-300 ease-snap group-hover:scale-110">
        MCP
      </div>
      {nodes.map((n) => (
        <span
          key={n.label}
          className="absolute rounded-sm border border-line-2 bg-surface px-2 py-1 font-mono text-[11px] text-fg-2"
          style={{ left: n.x, top: n.y }}
        >
          {n.label}
        </span>
      ))}
    </div>
  );
}

/* 03 — Slack → Sheets → Linear with a packet travelling the line. */
function PipelineVisual() {
  const steps = ["slack", "sheets", "linear"];
  return (
    <div className="absolute inset-0 flex items-center px-6">
      <div className="relative flex w-full items-center justify-between">
        <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-line-2 via-accent/60 to-line-2" />
        <span className="absolute top-1/2 left-4 size-2 -translate-y-1/2 rounded-full bg-accent [animation:packet_2.8s_cubic-bezier(.65,0,.35,1)_infinite]" />
        {steps.map((s, i) => (
          <div
            key={s}
            className="relative z-10 flex flex-col items-center gap-2 transition-transform duration-200 ease-snap group-hover:-translate-y-1"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <span className="grid size-11 place-items-center rounded-md border border-line-2 bg-bg font-mono text-[11px] text-fg">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-fg-3">{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 04 — Three stacked token tiers, fanning apart on hover. */
function TiersVisual() {
  const tiers = [
    { label: "saarthi alias", sample: "--bg-fill-brand", tone: "border-accent/60 text-accent" },
    { label: "turbo semantic", sample: "--bg-brand-base", tone: "border-line-2 text-fg" },
    { label: "primitive", sample: "--brand-500", tone: "border-line text-fg-3" },
  ];
  return (
    <div className="absolute inset-0 flex items-center justify-center [perspective:900px]">
      <div className="relative h-40 w-72 [transform-style:preserve-3d] [transform:rotateX(55deg)_rotateZ(-35deg)]">
        {tiers.map((t, i) => (
          <div
            key={t.label}
            className={cn(
              "tier-plane absolute inset-0 flex items-end justify-between rounded-md border bg-surface-2 p-3 font-mono text-[11px] transition-transform duration-500 ease-out [transform:translateZ(var(--rest))]",
              t.tone,
            )}
            style={
              {
                "--rest": `${(2 - i) * 26}px`,
                "--lift": `${(2 - i) * 46}px`,
              } as React.CSSProperties
            }
          >
            <span>{t.label}</span>
            <span className="opacity-70">{t.sample}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 05 — Four context axes. The selected brand cycles, and the same
   H1 role resolves to that brand's stored values. */
function ContextsVisual() {
  const reduce = useReducedMotion();
  const [b, setB] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setB((i) => (i + 1) % turboBrands.length), 1800);
    return () => clearInterval(id);
  }, [reduce]);

  const brand = turboBrands[b];
  const axes: { label: string; options: string[]; on: number }[] = [
    { label: "Brand", options: turboBrands.map((x) => x.name), on: b },
    { label: "Mode", options: ["Light", "Dark"], on: 1 },
    { label: "Device", options: ["Desktop", "Tablet", "M-web"], on: 2 },
    { label: "Typeface", options: ["Sans serif", "Serif"], on: 0 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-5">
      <div className="w-full max-w-xl font-mono text-[11px]">
        <ul className="divide-y divide-line rounded-md border border-line-2 bg-bg">
          {axes.map((a) => (
            <li key={a.label} className="flex items-center gap-3 px-3 py-2">
              <span className="w-16 shrink-0 text-fg-3 uppercase">{a.label}</span>
              <span className="flex flex-wrap gap-1">
                {a.options.map((o, i) => (
                  <span
                    key={o}
                    className={cn(
                      "rounded-sm border px-1.5 py-0.5 transition-colors duration-200",
                      i === a.on ? "border-accent text-accent" : "border-line text-fg-3",
                    )}
                  >
                    {o}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 rounded-md border border-line-2 bg-bg px-3 py-2">
          <span className="text-fg-3">heading / h1 →</span>
          <span className="text-fg">
            {brand.heading} · {brand.h1.mweb} · r{brand.radius}
          </span>
        </div>
        <p className="mt-2 text-right text-fg-3">5 × 2 × 3 × 2 = 60 contexts</p>
      </div>
    </div>
  );
}

/* 06 — A library of 104 components, half of them consolidated away.
   Solid squares are what remains; outlined ones were merged or removed. */
function HalveVisual() {
  const total = 104;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-5">
      <div className="grid grid-cols-[repeat(13,minmax(0,1fr))] gap-1.5">
        {Array.from({ length: total }, (_, i) => {
          // spread the removed ones through the grid so it reads as thinning, not truncation
          const removed = i % 2 === 1;
          return (
            <span
              key={i}
              className={cn(
                "size-3 rounded-[2px] border transition-colors duration-300",
                removed
                  ? "border-line bg-transparent group-hover:border-line/40"
                  : "border-fg-3 bg-fg-3 group-hover:border-accent group-hover:bg-accent",
              )}
              style={{ transitionDelay: `${(i % 13) * 15}ms` }}
            />
          );
        })}
      </div>
      <p className="font-mono text-[11px] text-fg-3">
        {total}+ components <span className="mx-1">→</span> <span className="text-fg">50% fewer</span>
      </p>
    </div>
  );
}

/* 07 — The four areas of the write-up. Built as a grid, not an overlay:
   each area's label sits in its own row, and its connector runs from the
   label's edge to the source box, which spans the rows and is centred on
   them. Every connector ends at the box's centre, so the lines always meet
   the labels and the box, whatever the card width. */
function AreasVisual() {
  const lanes = ["Handoff", "Components", "Support", "Documentation"];
  return (
    <div className="absolute inset-0 p-5 sm:p-7">
      <div className="grid h-full grid-cols-[auto_minmax(1rem,1fr)_minmax(0,36%)] grid-rows-4">
        {lanes.map((label, i) => (
          <div key={label} className="flex items-center gap-2" style={{ gridColumn: 1, gridRow: i + 1 }}>
            <span className="font-mono text-micro text-fg-3">0{i + 1}</span>
            <span className="display text-sm font-semibold tracking-tight whitespace-nowrap text-fg sm:text-lg">
              {label}
            </span>
          </div>
        ))}

        {lanes.map((label, i) => (
          <svg
            key={`line-${label}`}
            aria-hidden="true"
            className="h-full w-full overflow-visible"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            fill="none"
            style={{ gridColumn: 2, gridRow: i + 1 }}
          >
            {/* from the row's middle, out to the box's centre (row-relative y) */}
            <path
              d={`M 0 50 C 50 50, 50 ${(2 - i) * 100}, 100 ${(2 - i) * 100}`}
              stroke="var(--color-line-2)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ))}

        <div
          className="row-span-4 flex flex-col justify-center self-center border border-accent bg-surface px-3 py-5 text-center sm:px-5 sm:py-7"
          style={{ gridColumn: 3, gridRow: "1 / span 4" }}
        >
          <p className="display text-base font-semibold leading-tight tracking-tight text-fg sm:text-2xl">
            One source of truth
          </p>
          <p className="mt-2 font-mono text-micro text-fg-3">Figma · specs · tickets</p>
        </div>
      </div>
    </div>
  );
}
