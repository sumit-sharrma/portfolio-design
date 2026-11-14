"use client";

import { useGridOverlay } from "@/components/ui/GridOverlay";

export function GridIndicator() {
  const { isVisible } = useGridOverlay();

  return (
    isVisible && (
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[var(--color-brand-300)] text-mono-xs">
        <span>████████</span>
        <span>8px Grid Active</span>
        <span>████████</span>
      </div>
    )
  );
}