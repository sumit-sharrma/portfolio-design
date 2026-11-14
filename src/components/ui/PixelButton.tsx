"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface PixelButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  size?: "sm" | "base" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

export const PixelButton = forwardRef<HTMLButtonElement, PixelButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "base",
      loading = false,
      icon,
      iconPosition = "left",
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantClasses = {
      primary: "btn-pixel-primary",
      secondary: "btn-pixel-secondary",
      ghost: "btn-pixel-ghost",
      destructive: "btn-pixel-destructive",
    };

    const sizeClasses = {
      sm: "px-3 py-1.5 text-mono-xs gap-1.5",
      base: "px-4 py-2 text-mono-sm gap-2",
      lg: "px-6 py-3 text-mono-base gap-2",
    };

    return (
      <button
        ref={ref}
        className={cn(
          variantClasses[variant],
          sizeClasses[size],
          className,
          (loading || disabled) && "opacity-50 cursor-not-allowed"
        )}
        disabled={loading || disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="animate-spin">▋</span>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && iconPosition === "left" && <span>{icon}</span>}
            {children}
            {icon && iconPosition === "right" && <span>{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

PixelButton.displayName = "PixelButton";