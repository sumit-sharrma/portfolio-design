"use client";
// ──────────────────────────────────────────────────────────────
// src/components/about/IdentitySwitcher.tsx
// The "is a ___" effect. Clicking the role:
//   1. morphs the geometric avatar (shape + color, blur crossfade)
//   2. bursts small particles out of the word
//   3. retypes the About copy, with highlights in the new color
// Respects prefers-reduced-motion (no typing, no particles).
// ──────────────────────────────────────────────────────────────
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "framer-motion";
import posthog from "posthog-js";
import { identities, type Shape } from "@/lib/about";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function IdentitySwitcher() {
  const [index, setIndex] = useState(0);
  // Each click stores a fresh random burst (random values live in the
  // event handler, never in render, so prerendering stays deterministic).
  const [burst, setBurst] = useState<{ n: number; bits: Bit[] }>({ n: 0, bits: [] });
  const reduce = useReducedMotion();
  const id = identities[index];

  function next() {
    const nextIndex = (index + 1) % identities.length;
    posthog.capture("identity_view_changed", { identity_index: nextIndex });
    setIndex(nextIndex);
    setBurst((b) => ({ n: b.n + 1, bits: makeBits() }));
  }

  return (
    <div>
      <Avatar shape={id.shape} color={id.color} />

      <h1 className="display mt-6 text-3xl font-semibold tracking-tight text-fg sm:text-4xl">{site.name}</h1>
      <p className="display mt-1 text-3xl tracking-tight text-fg-3 sm:text-4xl" data-spec="text.title · font.display · color.fg-3">
        is a{" "}
        <span className="relative inline-block">
          <button
            type="button"
            onClick={next}
            className="group relative cursor-pointer rounded-md font-semibold text-fg underline decoration-line-2 decoration-dotted decoration-2 underline-offset-[6px] transition-colors duration-150 hover:decoration-[var(--id)]"
            style={{ "--id": id.color } as React.CSSProperties}
            aria-label={`${id.role}. Show another side of me`}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={id.role}
                className="inline-block"
                initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                transition={{ duration: 0.28, ease: EASE }}
              >
                {id.role}
              </motion.span>
            </AnimatePresence>
          </button>
          {!reduce && burst.n > 0 && <Particles key={burst.n} color={id.color} bits={burst.bits} />}
        </span>
      </p>
      <p className="mt-3 font-mono text-micro text-fg-3">
        <span style={{ color: id.color }}>↳</span> click the role · {index + 1}/{identities.length}
      </p>

      <div className="mt-14 max-w-[60ch]">
        <p className="mono-tag text-fg-3">About</p>
        <div className="mt-4 space-y-4 text-lede text-fg-2" aria-live="polite">
          {id.copy.map((para, i) => (
            <TypedParagraph
              key={`${index}-${i}`}
              text={para}
              color={id.color}
              delay={i * 0.55}
              instant={!!reduce}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Avatar ─────────────────────────────────────────────────────
   Every shape is a 12-point polygon so clip-path can tween
   smoothly between them. */
const shapes: Record<Shape, string> = (() => {
  const poly = (pts: [number, number][]) =>
    `polygon(${pts.map(([x, y]) => `${x.toFixed(1)}% ${y.toFixed(1)}%`).join(", ")})`;
  const ring = (n: number, r: (k: number) => number, rot = -90) =>
    Array.from({ length: n }, (_, k) => {
      const a = ((rot + (360 / n) * k) * Math.PI) / 180;
      return [50 + r(k) * Math.cos(a), 50 + r(k) * Math.sin(a)] as [number, number];
    });
  // hexagon: 6 corners, each repeated to reach 12 points
  const hex = ring(6, () => 48, -90).flatMap((p) => [p, p]);
  return {
    hexagon: poly(hex),
    squircle: poly(ring(12, (k) => (k % 3 === 0 ? 48 : 50), -45)),
    star: poly(ring(12, (k) => (k % 2 ? 30 : 50))),
    circle: poly(ring(12, () => 48)),
  };
})();

function Avatar({ shape, color }: { shape: Shape; color: string }) {
  const [scope, animate] = useAnimate();
  const first = useRef(true);

  // Blur pulse on each change (skipped on first paint).
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    animate(scope.current, { filter: ["blur(0px)", "blur(6px)", "blur(0px)"] }, { duration: 0.5, times: [0, 0.4, 1] });
  }, [shape, animate, scope]);

  return (
    <div ref={scope} className="relative size-20 sm:size-24" data-spec="avatar · 12-point polygon · identity.color">
      <motion.div
        className="absolute inset-0"
        animate={{ clipPath: shapes[shape], backgroundColor: color }}
        initial={false}
        transition={{ duration: 0.6, ease: EASE }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 35% 30%, rgba(255,255,255,.45), transparent 45%), radial-gradient(circle at 70% 80%, rgba(0,0,0,.35), transparent 55%)",
        }}
      />
      {/* eyes */}
      <div className="absolute inset-0 flex items-center justify-center gap-2.5 pt-1" aria-hidden="true">
        {[0, 1].map((e) => (
          <motion.span
            key={e}
            className="block h-2.5 w-2 rounded-full bg-[oklch(18%_0.01_265)]"
            animate={{ scaleY: [1, 1, 0.1, 1, 1] }}
            transition={{ duration: 4, times: [0, 0.9, 0.93, 0.96, 1], repeat: Infinity }}
          />
        ))}
      </div>
    </div>
  );
}

/* ── Particles ──────────────────────────────────────────────────
   A one-shot burst of tiny glyphs from the word. Remounted per
   click (via key), so each click gets a fresh burst. */
const glyphs = ["{", "}", "<>", "#", "◆", "●", "■", "/", "+"];

type Bit = { g: string; x: number; y: number; r: number; left: number; d: number };

// Called from the click handler only.
function makeBits(): Bit[] {
  return Array.from({ length: 12 }, (_, i) => {
    const angle = (-160 + Math.random() * 140) * (Math.PI / 180);
    const dist = 30 + Math.random() * 50;
    return {
      g: glyphs[i % glyphs.length],
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist,
      r: (Math.random() - 0.5) * 180,
      left: 10 + Math.random() * 80,
      d: 0.75 + Math.random() * 0.3,
    };
  });
}

function Particles({ color, bits }: { color: string; bits: Bit[] }) {
  return (
    <span className="pointer-events-none absolute inset-0" aria-hidden="true">
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute top-1/2 font-mono text-xs"
          style={{ left: `${b.left}%`, color: i % 3 === 0 ? "var(--color-fg)" : color }}
          initial={{ opacity: 1, x: 0, y: 0, scale: 0.6, rotate: 0 }}
          animate={{ opacity: 0, x: b.x, y: b.y, scale: 1, rotate: b.r }}
          transition={{ duration: b.d, ease: [0.2, 0.8, 0.3, 1] }}
        >
          {b.g}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Typed paragraph ────────────────────────────────────────────
   Types characters in; [[phrases]] render in the identity color. */
function TypedParagraph({
  text,
  color,
  delay,
  instant,
}: {
  text: string;
  color: string;
  delay: number;
  instant: boolean;
}) {
  const segments = useMemo(
    () =>
      text
        .split(/(\[\[.*?\]\])/g)
        .filter(Boolean)
        .reduce<{ t: string; hl: boolean; start: number }[]>((acc, s) => {
          const prev = acc[acc.length - 1];
          const start = prev ? prev.start + prev.t.length : 0;
          const hl = s.startsWith("[[");
          acc.push({ t: hl ? s.slice(2, -2) : s, hl, start });
          return acc;
        }, []),
    [text],
  );
  const total = segments.reduce((n, s) => n + s.t.length, 0);
  const [count, setCount] = useState(instant ? total : 0);

  useEffect(() => {
    if (instant) return;
    let raf = 0;
    let start = 0;
    const cps = 90; // characters per second
    const tick = (now: number) => {
      if (!start) start = now + delay * 1000;
      const n = Math.max(0, Math.floor(((now - start) / 1000) * cps));
      setCount(Math.min(total, n));
      if (n < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [total, delay, instant]);

  return (
    <p>
      <span className="sr-only">{segments.map((s) => s.t).join("")}</span>
      <span aria-hidden="true">
        {segments.map((s, i) => {
          const shown = s.t.slice(0, Math.max(0, count - s.start));
          return s.hl ? (
            <span key={i} className="font-medium" style={{ color }}>
              {shown}
            </span>
          ) : (
            <span key={i}>{shown}</span>
          );
        })}
        {count > 0 && count < total && (
          <span className="ml-0.5 inline-block h-[1em] w-[0.5ch] translate-y-[0.15em]" style={{ backgroundColor: color }} />
        )}
      </span>
    </p>
  );
}
