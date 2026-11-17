// ──────────────────────────────────────────────────────────────
// src/components/projects/CaseSection.tsx
// Shared section shell for the case-study body: anchor id for the
// side rail, mono index, heading and lede paragraph.
// ──────────────────────────────────────────────────────────────
import { Reveal } from "@/components/motion/Reveal";

export const caseSections = [
  { id: "problem", index: "01", label: "The Problem" },
  { id: "solution", index: "02", label: "Architecture" },
  { id: "impact", index: "03", label: "Impact" },
] as const;

export function CaseSection({
  id,
  lede,
  children,
}: {
  id: (typeof caseSections)[number]["id"];
  lede: string;
  children: React.ReactNode;
}) {
  const meta = caseSections.find((s) => s.id === id)!;
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-24 border-t border-line pt-10 pb-20 first:mt-20">
      <Reveal>
        <p className="mono-tag text-fg-3">{meta.index}</p>
        <h2 id={`${id}-h`} className="mt-3 text-headline font-semibold text-fg" data-spec="text.headline · font.display · color.fg">
          {meta.label}
        </h2>
        <p className="mt-6 max-w-[62ch] text-lede text-fg-2">{lede}</p>
      </Reveal>
      <div className="mt-10">{children}</div>
    </section>
  );
}
