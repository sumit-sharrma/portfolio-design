// ──────────────────────────────────────────────────────────────
// src/components/projects/LayerMapVisual.tsx
// A token-mapping diagram: how old names are routed through a
// new layer to new values.
//
//   [ old names ] ──▶ [ layer in between ] ──▶ [ primitives ]
//
// Each row is one real token. The swatches at either end show
// the value it resolved to before and after. A row with no
// middle token is one that was deliberately held on its old
// value.
//
// Desktop: three aligned columns. Mobile: each route stacks.
// ──────────────────────────────────────────────────────────────
import type { LayerMap } from "@/lib/projects";
import { cn } from "@/lib/utils";

export function LayerMapVisual({ map }: { map: LayerMap }) {
  const [a, b, c] = map.layers;
  return (
    <div className="bg-bg">
      {/* column headers (desktop) */}
      <div className="hidden grid-cols-[1.25fr_1fr_1.1fr] border-b border-line md:grid">
        {[a, b, c].map((layer, i) => (
          <div key={layer.title} className={cn("px-4 py-3", i > 0 && "border-l border-line", i === 1 && "bg-accent-wash")}>
            <p className={cn("mono-tag", i === 1 ? "text-accent" : "text-fg-2")}>
              {layer.title} · {layer.count}
            </p>
            <p className="mt-1 text-xs leading-snug text-fg-3">{layer.note}</p>
          </div>
        ))}
      </div>

      {/* legend (mobile) */}
      <ol className="space-y-1 border-b border-line px-4 py-3 md:hidden">
        {[a, b, c].map((layer, i) => (
          <li key={layer.title} className="text-xs text-fg-3">
            <span className={cn("mono-tag mr-2", i === 1 ? "text-accent" : "text-fg-2")}>
              {i + 1}. {layer.title} · {layer.count}
            </span>
            {layer.note}
          </li>
        ))}
      </ol>

      <ul className="divide-y divide-line">
        {map.routes.map((r) => {
          const held = !r.via;
          return (
            <li key={r.from} className="grid md:grid-cols-[1.25fr_1fr_1.1fr]">
              {/* old name + old value */}
              <div className="flex items-center gap-2 px-4 pt-3 md:py-3">
                <Swatch color={r.before} label={`before ${r.before}`} />
                <code className="min-w-0 font-mono text-[12px] break-words text-fg">{r.from}</code>
                <Arrow className="ml-auto hidden md:block" />
              </div>

              {/* the layer in between */}
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-1.5 md:border-l md:border-line md:py-3",
                  !held && "md:bg-accent-wash",
                )}
              >
                <span className="font-mono text-micro text-fg-3 md:hidden">↓</span>
                {held ? (
                  <span className="font-mono text-[11px] text-fg-3">held · no Turbo equivalent yet</span>
                ) : (
                  <code className="min-w-0 font-mono text-[12px] break-words text-accent">{r.via}</code>
                )}
                <Arrow className="ml-auto hidden md:block" />
              </div>

              {/* primitive + new value */}
              <div className="flex items-center gap-2 px-4 pb-3 md:border-l md:border-line md:py-3">
                <span className="font-mono text-micro text-fg-3 md:hidden">↓</span>
                <code className="min-w-0 font-mono text-[12px] break-words text-fg-2">{r.to}</code>
                <span className="ml-auto flex shrink-0 items-center gap-2">
                  <span className="font-mono text-[11px] text-fg-3">{r.after}</span>
                  <Swatch color={r.after} label={`after ${r.after}`} />
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {map.footnote && (
        <p className="border-t border-line px-4 py-2.5 font-mono text-micro leading-relaxed text-fg-3">{map.footnote}</p>
      )}
    </div>
  );
}

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <span
      role="img"
      aria-label={label}
      title={color}
      className="inline-block size-4 shrink-0 rounded-sm border border-white/20"
      style={{ backgroundColor: color }}
    />
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width="22"
      height="8"
      viewBox="0 0 22 8"
      fill="none"
      className={cn("shrink-0 text-line-2", className)}
    >
      <path d="M0 4h20M17 1l3 3-3 3" stroke="currentColor" />
    </svg>
  );
}
