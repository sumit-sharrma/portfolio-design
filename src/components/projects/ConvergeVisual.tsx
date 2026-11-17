"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/ConvergeVisual.tsx
// "Many files into one", shown as two sides that are always
// visible:
//   left   every library file, each its own tile
//   right  the single source they feed
// A thin line runs from each file to the source. Pulses travel
// along the lines one after another, and each file blips as its
// pulse leaves, so the picture reads as a steady convergence.
//
// On narrow screens the layout turns vertical (files on top,
// source below). With reduced motion the lines stay and the
// pulses are not drawn.
//
// Tile positions come from a small seeded generator, so they are
// the same on every render.
// ──────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

type Tile = { u: number; v: number; r: number; label?: string };

/**
 * Positions in a unit square (0..1). Tiles sit on a loose grid and are then
 * nudged and tilted, so they look scattered but never stack. Each label gets
 * its own row, in a middle column, so wide labelled tiles stay clear of each
 * other and of the edges.
 */
function buildTiles(count: number, labels: string[]): Tile[] {
  let seed = 11;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const rows = Math.max(labels.length, Math.ceil(Math.sqrt(count * 1.2)), 1);
  const cols = Math.max(1, Math.ceil(count / rows));
  const mid = Math.floor(cols / 2);

  const cells: { row: number; col: number }[] = [];
  for (let row = 0; row < rows; row++) for (let col = 0; col < cols; col++) cells.push({ row, col });
  // drop spare cells from the sides, never the middle column
  let spare = cells.length - count;
  for (let row = rows - 1; row >= 0 && spare > 0; row -= 2) {
    const side = row % 4 < 2 ? 0 : cols - 1;
    const i = cells.findIndex((c) => c.row === row && c.col === side && c.col !== mid);
    if (i >= 0) {
      cells.splice(i, 1);
      spare--;
    }
  }

  return cells.slice(0, count).map(({ row, col }) => {
    const labelled = col === mid && row < labels.length;
    const jitter = labelled ? 0.15 : 0.3;
    return {
      u: Math.min(1, Math.max(0, (col + 0.5 + (rand() - 0.5) * jitter * 2) / cols)),
      v: Math.min(1, Math.max(0, (row + 0.5 + (rand() - 0.5) * (labelled ? 0.12 : 0.5)) / rows)),
      r: (rand() - 0.5) * (labelled ? 6 : 14),
      label: labelled ? labels[row] : undefined,
    };
  });
}

const PERIOD = 4.5; // seconds between two pulses from the same file
const TRAVEL = 0.34; // share of the period a pulse spends travelling

export function ConvergeVisual({
  count,
  shown,
  labels,
  target,
  targetNote,
}: {
  /** The real number, used in the label ("45+ library files"). */
  count: number;
  /** How many tiles to draw. Defaults to `count`. */
  shown?: number;
  labels: string[];
  target: string;
  targetNote?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [tiles] = useState(() => buildTiles(shown ?? count, labels));

  // measure, so lines can be drawn in real pixels
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // pause the pulses while off screen
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (inView) svg.unpauseAnimations();
    else svg.pauseAnimations();
  }, [inView, size]);

  const vertical = size ? size.w < 560 : false;

  // where things sit, in pixels
  const place = (t: Tile) =>
    !size
      ? { x: 0, y: 0 }
      : vertical
        ? { x: size.w * (0.1 + t.u * 0.8), y: size.h * (0.09 + t.v * 0.56) }
        : { x: size.w * (0.05 + t.u * 0.5), y: size.h * (0.14 + t.v * 0.76) };
  const hub = !size
    ? { x: 0, y: 0 }
    : vertical
      ? { x: size.w * 0.5, y: size.h * 0.87 }
      : { x: size.w * 0.84, y: size.h * 0.52 };

  const curve = (p: { x: number; y: number }) => {
    if (vertical) {
      const my = p.y + (hub.y - p.y) * 0.55;
      return `M${p.x},${p.y} C${p.x},${my} ${hub.x},${my} ${hub.x},${hub.y}`;
    }
    const mx = p.x + (hub.x - p.x) * 0.55;
    return `M${p.x},${p.y} C${mx},${p.y} ${mx},${hub.y} ${hub.x},${hub.y}`;
  };

  return (
    <div
      ref={ref}
      className="relative h-[30rem] overflow-hidden bg-bg sm:h-96"
      role="img"
      aria-label={`${count}+ separate library files, each feeding into one source: ${target}`}
    >
      {size && (
        <>
          {/* side labels */}
          <p className="absolute top-3 left-4 font-mono text-micro text-fg-2">Before · {count}+ library files</p>
          <p
            className="absolute font-mono text-micro text-accent"
            style={
              vertical
                ? { left: 16, top: hub.y - 62 }
                : { left: hub.x, top: 12, transform: "translateX(-50%)" }
            }
          >
            After · 1 source
          </p>

          {/* lines + pulses */}
          <svg
            ref={svgRef}
            aria-hidden="true"
            className="absolute inset-0"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            fill="none"
          >
            {tiles.map((t, i) => {
              const d = curve(place(t));
              // negative start times put the loop in its steady state from the first frame
              const begin = `${-((i * 0.83) % PERIOD).toFixed(2)}s`;
              return (
                <g key={i}>
                  <path d={d} stroke="var(--color-line-2)" strokeOpacity="0.55" strokeWidth="1" />
                  {!reduce && (
                    <circle r="2.5" fill="var(--color-accent)" opacity="0">
                      <animateMotion
                        path={d}
                        dur={`${PERIOD}s`}
                        begin={begin}
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyPoints="0;1;1"
                        keyTimes={`0;${TRAVEL};1`}
                        keySplines="0.5 0 0.3 1;0 0 1 1"
                      />
                      <animate
                        attributeName="opacity"
                        dur={`${PERIOD}s`}
                        begin={begin}
                        repeatCount="indefinite"
                        values="0;1;1;0;0"
                        keyTimes={`0;0.03;${TRAVEL - 0.05};${TRAVEL};1`}
                      />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* the files: always there */}
          {tiles.map((t, i) => {
            const p = place(t);
            return (
              <div
                key={i}
                aria-hidden="true"
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${t.label ? "z-[1]" : ""}`}
                style={{ left: p.x, top: p.y, rotate: `${t.r}deg` }}
              >
                <FileTile
                  label={t.label}
                  pulse={!reduce}
                  delay={-((i * 0.83) % PERIOD)}
                />
              </div>
            );
          })}

          {/* the single source: always there */}
          <div
            aria-hidden="true"
            className="absolute z-[2] -translate-x-1/2 -translate-y-1/2"
            style={{ left: hub.x, top: hub.y }}
          >
            {!reduce && (
              <span className="absolute inset-0 rounded-md border border-accent [animation:hub-ping_1.5s_ease-out_infinite]" />
            )}
            <div className="relative rounded-md border border-accent bg-surface px-4 py-3 text-center sm:px-5 sm:py-4">
              <span className="absolute -top-1 -left-1 size-2 border-t border-l border-accent" />
              <span className="absolute -top-1 -right-1 size-2 border-t border-r border-accent" />
              <span className="absolute -bottom-1 -left-1 size-2 border-b border-l border-accent" />
              <span className="absolute -right-1 -bottom-1 size-2 border-r border-b border-accent" />
              <p className="display text-xl font-semibold tracking-tight whitespace-nowrap text-fg">{target}</p>
              {targetNote && <p className="mt-1 font-mono text-micro whitespace-nowrap text-fg-3">{targetNote}</p>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function FileTile({ label, pulse, delay }: { label?: string; pulse: boolean; delay: number }) {
  return (
    <div
      className="flex items-center gap-1.5 rounded-sm border border-line-2 bg-surface px-1.5 py-1 whitespace-nowrap"
      style={
        pulse
          ? { animation: `file-blip ${PERIOD}s linear infinite`, animationDelay: `${delay.toFixed(2)}s` }
          : undefined
      }
    >
      {/* tiny document glyph with a folded corner */}
      <svg width="9" height="11" viewBox="0 0 9 11" fill="none" className="shrink-0 text-fg-3">
        <path d="M0.5 0.5h5l3 3v7h-8z" stroke="currentColor" />
        <path d="M5.5 0.5v3h3" stroke="currentColor" />
      </svg>
      {label ? (
        <span className="font-mono text-[10px] text-fg-2">{label}</span>
      ) : (
        <span className="h-1 w-6 rounded-full bg-line-2" />
      )}
    </div>
  );
}
