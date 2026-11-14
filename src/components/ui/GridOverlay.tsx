"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";

interface GridOverlayContextType {
  isVisible: boolean;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}

const GridOverlayContext = createContext<GridOverlayContextType | null>(null);

export function GridOverlayProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("grid-overlay");
    if (saved !== null) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- saved visibility is only readable on the client; reading it during render would cause a hydration mismatch
      setIsVisible(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("grid-overlay", JSON.stringify(isVisible));
  }, [isVisible]);

  const toggle = () => setIsVisible((v) => !v);
  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return (
    <GridOverlayContext.Provider value={{ isVisible, toggle, show, hide }}>
      {children}
      <GridOverlay isVisible={isVisible} />
    </GridOverlayContext.Provider>
  );
}

export function useGridOverlay() {
  const context = useContext(GridOverlayContext);
  if (!context) {
    throw new Error("useGridOverlay must be used within GridOverlayProvider");
  }
  return context;
}

function GridOverlay({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div
      className="grid-overlay"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(var(--color-brand-300) 1px, transparent 1px),
          linear-gradient(90deg, var(--color-brand-300) 1px, transparent 1px)
        `,
        backgroundSize: "64px 64px",
      }}
    />
  );
}

// Grid coordinate display
export function GridCoordinates() {
  const { isVisible } = useGridOverlay();
  
  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-[var(--z-tooltip)]"
      style={{
        background: "var(--color-bg-0)",
        border: "var(--border-width) solid var(--color-border)",
        boxShadow: "var(--shadow-lg)",
        padding: "var(--space-2) var(--space-3)",
        fontFamily: "var(--font-display)",
        fontSize: "var(--text-display-xs)",
        color: "var(--color-brand-0)",
      }}
      aria-live="polite"
    >
      Grid: 8px baseline · 64px major
    </div>
  );
}

// Keyboard shortcut handler
export function useGridOverlayShortcut() {
  const { toggle } = useGridOverlay();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // G key to toggle grid
      if (e.key === "g" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement;
        if (!target.matches("input, textarea, [contenteditable]")) {
          e.preventDefault();
          toggle();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);
}