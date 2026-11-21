// ──────────────────────────────────────────────────────────────
// src/components/projects/CaseSolution.tsx
// "Architecture / Solution": media blocks, then key decisions.
// Media kinds:
//   code    real code in a panel
//   table   a data table (set wide: true to span both columns)
//   route   a chain of steps drawn top to bottom
//   layers  a token-mapping diagram across three layers (map)
//   converge  animated "many files into one" (count, labels, target)
//   image   a real screenshot from public/ (needs src, alt, width, height)
//   diagram / ui   empty slots waiting for an image
// If the project has `solution.brands`, the interactive brand
// explorer renders above the media.
// ──────────────────────────────────────────────────────────────
import type { MediaBlock, Project } from "@/lib/projects";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";
import { CaseSection } from "./CaseSection";
import { BrandExplorer } from "./BrandExplorer";
import { ConvergeVisual } from "./ConvergeVisual";
import { LayerMapVisual } from "./LayerMapVisual";
import { ImageLightbox } from "./ImageLightbox";

export function CaseSolution({ project }: { project: Project }) {
  const { lede, media, decisions, brands } = project.solution;
  return (
    <CaseSection id="solution" lede={lede}>
      {brands && (
        <Reveal className="mb-4">
          <BrandExplorer brands={brands} />
        </Reveal>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        {media.map((m, i) => (
          <Reveal key={m.title} delay={(i % 2) * 0.06} className={cn("min-w-0", m.wide && "lg:col-span-2")}>
            <Media block={m} />
          </Reveal>
        ))}
      </div>

      <Stagger as="ul" onView className="panel mt-12 divide-y divide-line">
        {decisions.map((d, i) => (
          <StaggerItem as="li" key={d.title} className="grid gap-2 p-5 sm:grid-cols-[6rem_14rem_1fr] sm:gap-6">
            <span className="font-mono text-micro text-accent">Decision {String(i + 1).padStart(2, "0")}</span>
            <h3 className="display font-semibold tracking-tight text-fg">{d.title}</h3>
            <div>
              <p className="text-sm leading-relaxed text-fg-2">{d.body}</p>
              {d.cost && (
                <p className="mt-2 text-sm leading-relaxed text-fg-3">
                  <span className="mono-tag mr-2 text-warn">Cost</span>
                  {d.cost}
                </p>
              )}
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </CaseSection>
  );
}

export function Media({ block }: { block: MediaBlock }) {
  const tag = block.tag ?? (block.kind === "code" ? block.lang : block.kind);
  return (
    <figure className="flex h-full flex-col">
      <div className="panel flex flex-1 flex-col overflow-hidden" data-spec="media · surface · radius.card">
        <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
          <span className="font-mono text-micro text-fg-2">{block.title}</span>
          <span className="mono-tag text-fg-3">{tag}</span>
        </div>
        <MediaBody block={block} />
      </div>
      <figcaption className="mt-3 text-sm leading-relaxed text-fg-3">{block.caption}</figcaption>
    </figure>
  );
}

function MediaBody({ block }: { block: MediaBlock }) {
  if (block.kind === "code") {
    return (
      <pre className="flex-1 overflow-x-auto bg-bg p-5 font-mono text-[12.5px] leading-6 text-fg-2">
        <code>{block.code}</code>
      </pre>
    );
  }

  if (block.kind === "layers" && block.map) {
    return <LayerMapVisual map={block.map} />;
  }

  if (block.kind === "converge" && block.count && block.target) {
    return (
      <ConvergeVisual
        count={block.count}
        shown={block.shown}
        labels={block.labels ?? []}
        target={block.target}
        targetNote={block.targetNote}
      />
    );
  }

  if (block.kind === "image" && block.src && block.width && block.height) {
    return (
      <div className="bg-bg p-3 sm:p-5">
        <ImageLightbox
          src={block.src}
          alt={block.alt ?? ""}
          width={block.width}
          height={block.height}
        />
      </div>
    );
  }

  if (block.kind === "table" && block.columns && block.rows) {
    return (
      <div className="overflow-x-auto bg-bg">
        <table className="w-full min-w-[26rem] text-left text-sm">
          <thead>
            <tr className="border-b border-line">
              {block.columns.map((c, i) => (
                <th
                  key={c}
                  scope="col"
                  className={cn("mono-tag px-4 py-2.5 font-normal text-fg-3", i > 0 && !block.textual && "text-right")}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-line">
            {block.rows.map((row, r) => (
              <tr key={`${r}-${row[0]}`}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={cn(
                      "px-4 py-2 align-top",
                      i === 0 && "text-fg",
                      i > 0 && !block.textual && "text-right font-mono text-[13px] tabular-nums",
                      i > 0 && (cell === "none" || cell.startsWith("No separate") ? "text-fg-3" : "text-fg-2"),
                      // in a textual Before/After table, the last column is the outcome
                      block.textual && i === row.length - 1 && "text-fg",
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (block.kind === "route" && block.steps) {
    return (
      <ol className="flex flex-1 flex-col justify-center gap-0 bg-bg p-5">
        {block.steps.map((s, i) => (
          <li key={s.token}>
            <code
              className={cn(
                "block rounded-sm border px-3 py-2 font-mono text-[12px] leading-snug break-words",
                i === 0 ? "border-accent text-fg" : "border-line-2 text-fg-2",
              )}
            >
              {s.token}
            </code>
            {i < block.steps!.length - 1 && (
              <div className="ml-4 flex h-8 items-center gap-3 border-l border-dashed border-line-2 pl-3">
                <span className="font-mono text-micro text-fg-3">↓ {s.via ?? "then"}</span>
              </div>
            )}
          </li>
        ))}
      </ol>
    );
  }

  // Empty slot. Swap for: <Image src="/projects/<slug>/diagram.png" alt="…" fill className="object-cover" />
  return (
    <div className="grid min-h-56 flex-1 place-items-center bg-bg p-8">
      <p className="max-w-[26ch] text-center font-mono text-micro leading-relaxed text-fg-3">
        {block.kind === "diagram" ? "Diagram" : "Screenshot"} to be added
      </p>
    </div>
  );
}
