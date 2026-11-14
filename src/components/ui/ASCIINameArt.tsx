"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const PALETTES = [
  { name: "purple", gradient: "linear-gradient(180deg, #C9A8FF 0%, #9B6FE6 45%, #5e4694 100%)", accent: "#B585F2" },
  { name: "green", gradient: "linear-gradient(180deg, #A8E6A8 0%, #6FB983 45%, #467e54 100%)", accent: "#8FD79E" },
  { name: "blue", gradient: "linear-gradient(180deg, #A8C6F7 0%, #6E92DC 45%, #42588e 100%)", accent: "#8AAEE8" },
  { name: "gold", gradient: "linear-gradient(180deg, #F2DA78 0%, #D8B63E 45%, #7d6726 100%)", accent: "#E6C44C" },
  { name: "red", gradient: "linear-gradient(180deg, #EC9A9A 0%, #D06262 45%, #7e3a3a 100%)", accent: "#E18585" },
  { name: "silver", gradient: "linear-gradient(180deg, #E4E7EF 0%, #B2B7C6 45%, #6a6e7c 100%)", accent: "#D2D6E0" },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function ASCIINameArt({
  firstName = "Sumit",
  lastName = "Sharma",
  className,
}: {
  firstName?: string;
  lastName?: string;
  className?: string;
}) {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Initialize with random palette on mount
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random pick must run after mount so server and client markup match
    setMounted(true);
    setPaletteIndex(Math.floor(Math.random() * PALETTES.length));
  }, []);

  const shuffle = useCallback(() => {
    setPaletteIndex(Math.floor(Math.random() * PALETTES.length));
  }, []);

  const gradientStyle = (gradient: string) => ({
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    fontFamily: "ui-monospace, Menlo, Consolas, 'DejaVu Sans Mono', monospace",
    fontSize: "clamp(2rem, 8vw, 6rem)",
    fontWeight: 400,
    lineHeight: 1.1,
    display: "inline",
    whiteSpace: "nowrap",
  } as const);

  if (!mounted) {
    // SSR fallback: render plain text with gradient via CSS variable
    return (
      <button
        type="button"
        className={cn(
          "nameblock group relative cursor-pointer select-none -webkit-tap-highlight-transparent",
          className
        )}
        aria-label="Shuffle the name color palette"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <span
          className="nameart"
          aria-hidden="true"
          style={gradientStyle("var(--color-primary)")}
        >
          {firstName}
        </span>
        <br />
        <span
          className="nameart"
          aria-hidden="true"
          style={gradientStyle("var(--color-primary)")}
        >
          {lastName}
        </span>
      </button>
    );
  }

  const palette = PALETTES[paletteIndex];

  return (
    <button
      type="button"
      className={cn(
        "nameblock group relative cursor-pointer select-none -webkit-tap-highlight-transparent",
        className
      )}
      onClick={shuffle}
      aria-label="Shuffle the name color palette"
      style={{ background: "none", border: "none", padding: 0, lineHeight: 1.1 }}
    >
      <span
        className="nameart"
        aria-hidden="true"
        style={gradientStyle(palette.gradient)}
      >
        {firstName}
      </span>
      <br />
      <span
        className="nameart"
        aria-hidden="true"
        style={gradientStyle(palette.gradient)}
      >
        {lastName}
      </span>
      {/* Subtle hint on hover */}
      <span className="absolute bottom-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-fg-300)] text-mono-xs px-2 py-1">
        click to shuffle
      </span>
    </button>
  );
}