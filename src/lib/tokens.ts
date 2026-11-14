// Design Token System - Pixel/DevTools Hybrid Theme
// 16-color palette, 8px grid, bitmap typography

export const tokens = {
  // Grid system
  grid: {
    unit: 8, // 1 grid unit = 8px
    base: "8px",
    sizes: {
      0: "0",
      1: "8px",
      2: "16px",
      3: "24px",
      4: "32px",
      5: "40px",
      6: "48px",
      8: "64px",
      10: "80px",
      12: "96px",
      16: "128px",
      20: "160px",
      24: "192px",
    },
  },

  // Spacing scale (multiples of grid unit)
  space: {
    0: "0",
    px: "1px",
    0.5: "4px",
    1: "8px",
    1.5: "12px",
    2: "16px",
    2.5: "20px",
    3: "24px",
    3.5: "28px",
    4: "32px",
    5: "40px",
    6: "48px",
    8: "64px",
    10: "80px",
    12: "96px",
    16: "128px",
    20: "160px",
    24: "192px",
  },

  // 16-color system palette (DB-16 inspired)
  colors: {
    // Backgrounds (4 steps)
    bg: {
      0: "#0D0D0D", // Deepest
      100: "#1A1A2E",
      200: "#2D2D44",
      300: "#3D3D5C",
      400: "#4D4D6E",
    },
    // Foregrounds (4 steps)
    fg: {
      0: "#FFFFFF", // Pure white
      100: "#E0E0E0",
      200: "#A0A0A0",
      300: "#606060",
      400: "#404040",
    },
    // Brand Green (4 steps) - Primary
    brand: {
      0: "#00FF88", // Brightest
      100: "#00CC6A",
      200: "#009950",
      300: "#006633",
      400: "#004422",
    },
    // Accent Red (4 steps) - Danger/Error
    accent: {
      0: "#FF3366",
      100: "#CC2952",
      200: "#991F3D",
      300: "#661428",
      400: "#330A14",
    },
    // Warning Gold (4 steps)
    warning: {
      0: "#FFCC00",
      100: "#CC9900",
      200: "#997700",
      300: "#664D00",
      400: "#332600",
    },
    // Semantic aliases
    primary: "#00FF88",
    secondary: "#00CC6A",
    destructive: "#FF3366",
    warningColor: "#FFCC00",
    muted: "#3D3D5C",
    border: "#3D3D5C",
    ring: "#00FF88",
  },

  // Typography
  typography: {
    // Bitmap/Display fonts (for headlines)
    display: {
      fontFamily: '"Silkscreen", "Pixelify Sans", "Press Start 2P", monospace',
      fontWeight: 400,
      lineHeight: 1.2,
      sizes: {
        xs: "12px",   // 1.5 grid units
        sm: "16px",   // 2 grid units
        base: "24px", // 3 grid units
        lg: "32px",   // 4 grid units
        xl: "48px",   // 6 grid units
        "2xl": "64px", // 8 grid units
        "3xl": "96px", // 12 grid units
      },
    },
    // UI/Body font (monospace for code/terminal feel)
    mono: {
      fontFamily: '"JetBrains Mono", "IBM Plex Mono", "Geist Mono", monospace',
      fontWeight: 400,
      lineHeight: 1.6,
      sizes: {
        xs: "11px",
        sm: "12px",
        base: "13px",
        lg: "14px",
        xl: "16px",
      },
    },
    // Code font
    code: {
      fontFamily: '"Geist Mono", "Berkeley Mono", "JetBrains Mono", monospace',
      fontWeight: 400,
      lineHeight: 1.5,
      sizes: {
        xs: "11px",
        sm: "12px",
        base: "13px",
        lg: "14px",
      },
    },
  },

  // Borders
  borders: {
    width: "1px",
    radius: {
      none: "0",
      sm: "4px",
      DEFAULT: "4px",
      lg: "8px",
    },
    style: "solid",
  },

  // Shadows (hard, pixelated)
  shadows: {
    sm: "2px 2px 0 0",
    DEFAULT: "4px 4px 0 0",
    lg: "8px 8px 0 0",
    xl: "12px 12px 0 0",
    inset: "inset 2px 2px 0 0",
    focus: "0 0 0 2px",
  },

  // Transitions (stepped, no easing)
  transitions: {
    fast: "80ms steps(2)",
    DEFAULT: "120ms steps(3)",
    slow: "200ms steps(4)",
  },

  // Z-index scale
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    overlay: 300,
    modal: 400,
    popover: 500,
    tooltip: 600,
    devtools: 1000,
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
} as const;

export type Tokens = typeof tokens;

// CSS Variable generator
export function generateCSSVariables(tokens: Tokens): string {
  const lines: string[] = [":root {"];

  // Grid
  lines.push(`  --grid-unit: ${tokens.grid.unit}px;`);

  // Colors
  Object.entries(tokens.colors.bg).forEach(([key, value]) => {
    lines.push(`  --color-bg-${key}: ${value};`);
  });
  Object.entries(tokens.colors.fg).forEach(([key, value]) => {
    lines.push(`  --color-fg-${key}: ${value};`);
  });
  Object.entries(tokens.colors.brand).forEach(([key, value]) => {
    lines.push(`  --color-brand-${key}: ${value};`);
  });
  Object.entries(tokens.colors.accent).forEach(([key, value]) => {
    lines.push(`  --color-accent-${key}: ${value};`);
  });
  Object.entries(tokens.colors.warning).forEach(([key, value]) => {
    lines.push(`  --color-warning-${key}: ${value};`);
  });

  // Semantic colors
  lines.push(`  --color-primary: ${tokens.colors.primary};`);
  lines.push(`  --color-secondary: ${tokens.colors.secondary};`);
  lines.push(`  --color-destructive: ${tokens.colors.destructive};`);
  lines.push(`  --color-warning: ${tokens.colors.warning};`);
  lines.push(`  --color-muted: ${tokens.colors.muted};`);
  lines.push(`  --color-border: ${tokens.colors.border};`);
  lines.push(`  --color-ring: ${tokens.colors.ring};`);

  // Typography
  lines.push(`  --font-display: ${tokens.typography.display.fontFamily};`);
  lines.push(`  --font-mono: ${tokens.typography.mono.fontFamily};`);
  lines.push(`  --font-code: ${tokens.typography.code.fontFamily};`);

  // Borders
  lines.push(`  --border-width: ${tokens.borders.width};`);
  lines.push(`  --radius-none: ${tokens.borders.radius.none};`);
  lines.push(`  --radius-sm: ${tokens.borders.radius.sm};`);
  lines.push(`  --radius-default: ${tokens.borders.radius.DEFAULT};`);
  lines.push(`  --radius-lg: ${tokens.borders.radius.lg};`);

  // Shadows
  lines.push(`  --shadow-sm: ${tokens.shadows.sm} var(--color-bg-0);`);
  lines.push(`  --shadow-default: ${tokens.shadows.DEFAULT} var(--color-bg-0);`);
  lines.push(`  --shadow-lg: ${tokens.shadows.lg} var(--color-bg-0);`);
  lines.push(`  --shadow-xl: ${tokens.shadows.xl} var(--color-bg-0);`);
  lines.push(`  --shadow-inset: ${tokens.shadows.inset} var(--color-bg-0);`);
  lines.push(`  --shadow-focus: ${tokens.shadows.focus} var(--color-ring);`);

  // Transitions
  lines.push(`  --transition-fast: ${tokens.transitions.fast};`);
  lines.push(`  --transition-default: ${tokens.transitions.DEFAULT};`);
  lines.push(`  --transition-slow: ${tokens.transitions.slow};`);

  // Z-index
  Object.entries(tokens.zIndex).forEach(([key, value]) => {
    lines.push(`  --z-${key}: ${value};`);
  });

  lines.push("}");
  return lines.join("\n");
}

// Tailwind config extender
export function generateTailwindConfig(tokens: Tokens) {
  return {
    theme: {
      extend: {
        colors: {
          bg: tokens.colors.bg,
          fg: tokens.colors.fg,
          brand: tokens.colors.brand,
          accent: tokens.colors.accent,
          warning: tokens.colors.warning,
          primary: tokens.colors.primary,
          secondary: tokens.colors.secondary,
          destructive: tokens.colors.destructive,
          muted: tokens.colors.muted,
          border: tokens.colors.border,
          ring: tokens.colors.ring,
        },
        fontFamily: {
          display: [tokens.typography.display.fontFamily],
          mono: [tokens.typography.mono.fontFamily],
          code: [tokens.typography.code.fontFamily],
        },
        fontSize: {
          // Display sizes (bitmap)
          "display-xs": [tokens.typography.display.sizes.xs, { lineHeight: "1.2", fontWeight: "400" }],
          "display-sm": [tokens.typography.display.sizes.sm, { lineHeight: "1.2", fontWeight: "400" }],
          "display-base": [tokens.typography.display.sizes.base, { lineHeight: "1.2", fontWeight: "400" }],
          "display-lg": [tokens.typography.display.sizes.lg, { lineHeight: "1.2", fontWeight: "400" }],
          "display-xl": [tokens.typography.display.sizes.xl, { lineHeight: "1.2", fontWeight: "400" }],
          "display-2xl": [tokens.typography.display.sizes["2xl"], { lineHeight: "1.2", fontWeight: "400" }],
          "display-3xl": [tokens.typography.display.sizes["3xl"], { lineHeight: "1.2", fontWeight: "400" }],
          // Mono sizes
          "mono-xs": [tokens.typography.mono.sizes.xs, { lineHeight: "1.6", fontWeight: "400" }],
          "mono-sm": [tokens.typography.mono.sizes.sm, { lineHeight: "1.6", fontWeight: "400" }],
          "mono-base": [tokens.typography.mono.sizes.base, { lineHeight: "1.6", fontWeight: "400" }],
          "mono-lg": [tokens.typography.mono.sizes.lg, { lineHeight: "1.6", fontWeight: "400" }],
          "mono-xl": [tokens.typography.mono.sizes.xl, { lineHeight: "1.6", fontWeight: "400" }],
        },
        spacing: tokens.space,
        borderWidth: {
          DEFAULT: tokens.borders.width,
          0: "0",
          1: tokens.borders.width,
        },
        borderRadius: tokens.borders.radius,
        boxShadow: {
          sm: tokens.shadows.sm + " var(--color-bg-0)",
          DEFAULT: tokens.shadows.DEFAULT + " var(--color-bg-0)",
          lg: tokens.shadows.lg + " var(--color-bg-0)",
          xl: tokens.shadows.xl + " var(--color-bg-0)",
          inset: tokens.shadows.inset + " var(--color-bg-0)",
          focus: tokens.shadows.focus + " var(--color-ring)",
        },
        transitionDuration: {
          fast: "80ms",
          DEFAULT: "120ms",
          slow: "200ms",
        },
        transitionTimingFunction: {
          stepped: "steps(3)",
          "stepped-fast": "steps(2)",
          "stepped-slow": "steps(4)",
        },
        zIndex: tokens.zIndex,
        screens: tokens.breakpoints,
      },
    },
  };
}