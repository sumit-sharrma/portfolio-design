// ──────────────────────────────────────────────────────────────
// src/components/ui/Card.tsx
// Flat ruled card. Inside a `group` link, hover is quick and
// mechanical: the border turns to the redline color and four
// corner ticks appear, like a selected frame in a design tool.
// ──────────────────────────────────────────────────────────────
import { cn } from "@/lib/utils";

const tick =
  "pointer-events-none absolute size-2 border-accent opacity-0 transition-opacity duration-100 group-hover:opacity-100 group-focus-visible:opacity-100";

export function Card({
  children,
  className,
  spec,
}: {
  children: React.ReactNode;
  className?: string;
  /** Token label shown in inspect mode. */
  spec?: string;
}) {
  return (
    <div
      data-spec={spec ?? "card · surface · radius.card · rule.line"}
      className={cn(
        "panel relative transition-colors duration-100 group-hover:border-accent group-focus-visible:border-accent",
        className,
      )}
    >
      <span aria-hidden="true" className={cn(tick, "-top-1 -left-1 border-t border-l")} />
      <span aria-hidden="true" className={cn(tick, "-top-1 -right-1 border-t border-r")} />
      <span aria-hidden="true" className={cn(tick, "-bottom-1 -left-1 border-b border-l")} />
      <span aria-hidden="true" className={cn(tick, "-right-1 -bottom-1 border-r border-b")} />
      {children}
    </div>
  );
}
