"use client";

import { cn } from "@/lib/utils";

interface BitmapTextProps {
  children: React.ReactNode;
  size?: "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "div" | "p";
  color?: "primary" | "secondary" | "accent" | "warning" | "fg-0" | "fg-100" | "fg-200";
  weight?: 400 | 700;
}

const sizeClasses = {
  xs: "text-display-xs",
  sm: "text-display-sm",
  base: "text-display-base",
  lg: "text-display-lg",
  xl: "text-display-xl",
  "2xl": "text-display-2xl",
  "3xl": "text-display-3xl",
};

const colorClasses = {
  primary: "text-[var(--color-primary)]",
  secondary: "text-[var(--color-secondary)]",
  accent: "text-[var(--color-accent-0)]",
  warning: "text-[var(--color-warning-0)]",
  "fg-0": "text-[var(--color-fg-0)]",
  "fg-100": "text-[var(--color-fg-100)]",
  "fg-200": "text-[var(--color-fg-200)]",
};

export function BitmapText({
  children,
  size = "base",
  className,
  as: Component = "span",
  color = "fg-0",
  weight = 400,
}: BitmapTextProps) {
  return (
    <Component
      className={cn(
        "bitmap-text font-display",
        sizeClasses[size],
        colorClasses[color],
        weight === 700 && "font-bold",
        className
      )}
      style={{ fontWeight: weight }}
    >
      {children}
    </Component>
  );
}