"use client";
// ──────────────────────────────────────────────────────────────
// src/components/inspect/Inspect.tsx
// Inspect mode: the site's signature idea. Press I (or the nav
// button) and the page turns into its own spec sheet:
//   • the 12-column layout grid appears
//   • hovering any element tagged with data-spec="…" draws
//     redlines around it and reports its tokens plus its real,
//     measured size and type settings
//
// To annotate an element:  <h1 data-spec="text.display · color.fg">
// ──────────────────────────────────────────────────────────────
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

type Ctx = { on: boolean; toggle: () => void };
const InspectContext = createContext<Ctx>({ on: false, toggle: () => {} });
export const useInspect = () => useContext(InspectContext);

export function InspectProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const toggle = useCallback(() => setOn((v) => !v), []);

  // Keyboard: I toggles, Esc exits. Ignored while typing in a field.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "i" || e.key === "I") setOn((v) => !v);
      if (e.key === "Escape") setOn(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.inspect = on ? "on" : "off";
  }, [on]);

  return (
    <InspectContext.Provider value={{ on, toggle }}>
      {children}
      {on && <InspectOverlay />}
    </InspectContext.Provider>
  );
}

type Reading = {
  rect: { x: number; y: number; w: number; h: number };
  spec: string;
  type: string | null;
};

function read(el: HTMLElement): Reading {
  const r = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  // Report type settings only for elements that carry text tokens.
  const isText = /text\./.test(el.dataset.spec ?? "");
  const lh = cs.lineHeight === "normal" ? "normal" : `${Math.round(parseFloat(cs.lineHeight))}`;
  return {
    rect: { x: r.left, y: r.top, w: r.width, h: r.height },
    spec: el.dataset.spec ?? "",
    type: isText ? `${Math.round(parseFloat(cs.fontSize))}/${lh} · ${cs.fontWeight}` : null,
  };
}

function InspectOverlay() {
  const [reading, setReading] = useState<Reading | null>(null);
  const target = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const update = () => setReading(target.current ? read(target.current) : null);
    const onMove = (e: PointerEvent) => {
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-spec]") ?? null;
      if (el !== target.current) {
        target.current = el;
        update();
      }
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onMove);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const r = reading?.rect;
  // Keep the label on screen: above the box if there is room, else inside the top edge.
  const labelAbove = r ? r.y > 96 : true;

  return (
    <div className="pointer-events-none fixed inset-0 z-[80]" aria-hidden="true">
      {/* 12-column layout grid, same container as the content */}
      <div className="mx-auto grid h-full max-w-6xl grid-cols-4 gap-4 px-4 sm:px-6 md:grid-cols-12">
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className={i > 3 ? "hidden bg-accent/[0.05] md:block" : "bg-accent/[0.05]"} />
        ))}
      </div>

      {r && reading && (
        <>
          {/* redlines: full-bleed guides on each edge of the box */}
          <div className="absolute inset-x-0 border-t border-dashed border-accent/50" style={{ top: r.y }} />
          <div className="absolute inset-x-0 border-t border-dashed border-accent/50" style={{ top: r.y + r.h }} />
          <div className="absolute inset-y-0 border-l border-dashed border-accent/50" style={{ left: r.x }} />
          <div className="absolute inset-y-0 border-l border-dashed border-accent/50" style={{ left: r.x + r.w }} />

          {/* the box */}
          <div
            className="absolute border border-accent bg-accent-wash"
            style={{ left: r.x, top: r.y, width: r.w, height: r.h }}
          />

          {/* token label */}
          <div
            className="absolute max-w-[min(90vw,34rem)] bg-accent px-1.5 py-1 font-mono text-[11px] leading-tight font-medium text-bg"
            style={{
              left: Math.max(4, Math.min(r.x, window.innerWidth - 240)),
              top: labelAbove ? r.y : r.y + 2,
              transform: labelAbove ? "translateY(-100%)" : undefined,
            }}
          >
            {reading.spec}
            {reading.type && <span className="opacity-70"> · {reading.type}</span>}
          </div>

          {/* measured size */}
          <div
            className="absolute bg-fg px-1.5 py-0.5 font-mono text-[10px] text-bg"
            style={{
              left: Math.max(4, r.x + r.w / 2),
              top: Math.min(r.y + r.h + 4, window.innerHeight - 64),
              transform: "translateX(-50%)",
            }}
          >
            {Math.round(r.w)} × {Math.round(r.h)}
          </div>
        </>
      )}

      {/* status bar */}
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 border-t border-accent bg-bg px-4 py-2 font-mono text-[11px] text-fg-2 sm:px-6">
        <span>
          <span className="text-accent">●</span> inspect · {reading ? "reading tokens" : "point at any element"}
        </span>
        <span className="hidden text-fg-3 sm:inline">12 col · 16 gutter · max 1152 · press I or Esc to exit</span>
        <span className="text-fg-3 sm:hidden">tap ◎ to exit</span>
      </div>
    </div>
  );
}
