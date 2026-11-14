"use client";

import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  className?: string;
}

export function StatusBar({ className }: StatusBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const sectionsRef = useRef<Map<string, { top: number; bottom: number }>>(new Map());

  useEffect(() => {
    const updateSections = () => {
      const sectionElements = document.querySelectorAll<HTMLElement>("section[id]");
      const map = new Map<string, { top: number; bottom: number }>();

      sectionElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        map.set(el.id, {
          top: rect.top + scrollTop,
          bottom: rect.top + scrollTop + rect.height,
        });
      });

      sectionsRef.current = map;
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;

      setScrollProgress(progress);
      setIsVisible(scrollTop > 100);

      // Find current section
      let activeSection = "";
      sectionsRef.current.forEach((bounds, id) => {
        if (scrollTop + window.innerHeight / 2 >= bounds.top && scrollTop + window.innerHeight / 2 <= bounds.bottom) {
          activeSection = id;
        }
      });
      setCurrentSection(activeSection);
    };

    // Initial calculation
    updateSections();
    handleScroll();

    // Recalculate on resize
    window.addEventListener("resize", updateSections);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", updateSections);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const formatSectionName = (id: string) => {
    const names: Record<string, string> = {
      hero: "hero",
      work: "work",
      systems: "tokens",
      writing: "writing",
      about: "about",
    };
    return names[id] || id;
  };

  const getMeterChars = (progress: number) => {
    const bars = "▁▂▃▄▅▆▇█";
    const index = Math.min(Math.floor(progress * (bars.length - 1)), bars.length - 1);
    return bars[index];
  };

  return (
    <footer
      id="sbar"
      className={cn(
        "fixed left-0 right-0 bottom-0 z-[60] flex items-center gap-4 px-4 py-2",
        "bg-[var(--color-bg-100)]/90 backdrop-blur-sm border-t border-[var(--color-border)]",
        "text-[var(--color-fg-300)] text-mono-xs",
        className
      )}
      style={{
        transform: isVisible ? "translateY(0)" : "translateY(100%)",
        transition: "transform 0.3s ease",
        fontSize: "11px",
        letterSpacing: "0.06em",
      }}
      aria-hidden="true"
    >
      <span className="host text-[var(--color-primary)]">portfolio</span>
      <span className="divider" style={{ opacity: 0.4 }}>·</span>
      <span className="sect text-[var(--color-fg-100)]">
        {currentSection ? formatSectionName(currentSection) : "home"}
      </span>
      <div className="right flex items-center gap-3 ml-auto">
        <span className="meter text-[var(--color-primary)]" style={{ letterSpacing: 0 }}>
          {getMeterChars(scrollProgress)}
        </span>
        <span className="progress-text" style={{ fontVariantNumeric: "tabular-nums" }}>
          {Math.round(scrollProgress * 100)}%
        </span>
      </div>
    </footer>
  );
}