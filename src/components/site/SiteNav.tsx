"use client";
// ──────────────────────────────────────────────────────────────
// src/components/site/SiteNav.tsx
// Flat top bar on a hairline rule. The active route gets a
// redline underline that slides between links. The Inspect
// button toggles the spec overlay (same as pressing I).
// ──────────────────────────────────────────────────────────────
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { nav, site } from "@/lib/site";
import { useInspect } from "@/components/inspect/Inspect";
import { cn } from "@/lib/utils";

export function SiteNav() {
  const pathname = usePathname();
  const { on, toggle } = useInspect();
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname.startsWith("/projects") : pathname.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg" data-spec="nav · color.bg · rule.line">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="display text-base font-semibold tracking-tight text-fg" aria-label={`${site.name}, home`}>
          Sumit Sharma
        </Link>

        <nav aria-label="Primary" className="flex h-full items-center gap-1 sm:gap-2">
          <ul className="flex h-full items-center">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href} className="h-full">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-full items-center px-3 text-sm transition-colors duration-150",
                      active ? "text-fg" : "text-fg-3 hover:text-fg",
                    )}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-px h-px bg-accent"
                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={toggle}
            aria-pressed={on}
            title="Inspect this site's design tokens (I)"
            className={cn(
              "flex h-8 items-center gap-2 rounded-[var(--radius-control)] border px-2.5 font-mono text-[11px] uppercase tracking-wider transition-colors duration-150",
              on
                ? "border-accent bg-accent text-bg"
                : "border-line-2 text-fg-2 hover:border-accent hover:text-accent",
            )}
          >
            <span aria-hidden="true">◎</span>
            Inspect
            <kbd className={cn("hidden rounded-sm border px-1 font-mono text-[10px] sm:inline", on ? "border-bg/40" : "border-line-2")}>I</kbd>
          </button>
        </nav>
      </div>
    </header>
  );
}
