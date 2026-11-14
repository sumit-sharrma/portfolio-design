"use client";

import { cn } from "@/lib/utils";
import { BitmapText } from "./BitmapText";
import { PixelButton } from "./PixelButton";
import { Copy, Eye, Palette, Square, Type, Ruler, Box } from "lucide-react";

interface TokenCategory {
  name: string;
  icon: React.ReactNode;
  tokens: TokenDisplay[];
}

interface TokenDisplay {
  name: string;
  value: string;
  cssVar: string;
  preview?: React.ReactNode;
  type: "color" | "spacing" | "typography" | "border" | "shadow";
  description?: string;
}

const tokenCategories: TokenCategory[] = [
  {
    name: "Brand Colors",
    icon: <Palette className="w-4 h-4" />,
    tokens: [
      { name: "Primary", value: "#00FF88", cssVar: "--color-primary", type: "color", description: "Primary actions, links, active states" },
      { name: "Secondary", value: "#00CC6A", cssVar: "--color-secondary", type: "color", description: "Hover states, secondary actions" },
      { name: "Primary Dark", value: "#009950", cssVar: "--color-brand-200", type: "color", description: "Pressed states, emphasis" },
      { name: "Primary Darker", value: "#006633", cssVar: "--color-brand-300", type: "color", description: "Subtle accents, borders" },
    ],
  },
  {
    name: "Background Scale",
    icon: <Square className="w-4 h-4" />,
    tokens: [
      { name: "BG 0 (Canvas)", value: "#0D0D0D", cssVar: "--color-bg-0", type: "color", description: "Page background, deepest layer" },
      { name: "BG 100 (Surface)", value: "#1A1A2E", cssVar: "--color-bg-100", type: "color", description: "Cards, panels, elevated surfaces" },
      { name: "BG 200 (Interactive)", value: "#2D2D44", cssVar: "--color-bg-200", type: "color", description: "Inputs, buttons hover, controls" },
      { name: "BG 300 (Muted)", value: "#3D3D5C", cssVar: "--color-bg-300", type: "color", description: "Disabled states, subtle separators" },
    ],
  },
  {
    name: "Foreground Scale",
    icon: <Type className="w-4 h-4" />,
    tokens: [
      { name: "FG 0 (Primary)", value: "#FFFFFF", cssVar: "--color-fg-0", type: "color", description: "Headlines, primary text" },
      { name: "FG 100 (Secondary)", value: "#E0E0E0", cssVar: "--color-fg-100", type: "color", description: "Body text, descriptions" },
      { name: "FG 200 (Muted)", value: "#A0A0A0", cssVar: "--color-fg-200", type: "color", description: "Labels, placeholders, meta" },
      { name: "FG 300 (Disabled)", value: "#606060", cssVar: "--color-fg-300", type: "color", description: "Disabled text, subtle hints" },
    ],
  },
  {
    name: "Semantic Colors",
    icon: <Box className="w-4 h-4" />,
    tokens: [
      { name: "Destructive", value: "#FF3366", cssVar: "--color-destructive", type: "color", description: "Errors, destructive actions" },
      { name: "Warning", value: "#FFCC00", cssVar: "--color-warning", type: "color", description: "Warnings, attention states" },
      { name: "Border", value: "#3D3D5C", cssVar: "--color-border", type: "color", description: "Default borders, dividers" },
      { name: "Ring/Focus", value: "#00FF88", cssVar: "--color-ring", type: "color", description: "Focus rings, selections" },
    ],
  },
  {
    name: "Spacing Scale (8px grid)",
    icon: <Ruler className="w-4 h-4" />,
    tokens: [
      { name: "Space 0.5", value: "4px", cssVar: "--space-0.5", type: "spacing", description: "Tight spacing, icon gaps" },
      { name: "Space 1", value: "8px", cssVar: "--space-1", type: "spacing", description: "Base unit, 1 grid unit" },
      { name: "Space 2", value: "16px", cssVar: "--space-2", type: "spacing", description: "Component padding, 2 grid units" },
      { name: "Space 3", value: "24px", cssVar: "--space-3", type: "spacing", description: "Element gaps, 3 grid units" },
      { name: "Space 4", value: "32px", cssVar: "--space-4", type: "spacing", description: "Section padding, 4 grid units" },
      { name: "Space 6", value: "48px", cssVar: "--space-6", type: "spacing", description: "Large gaps, 6 grid units" },
      { name: "Space 8", value: "64px", cssVar: "--space-8", type: "spacing", description: "Section margins, 8 grid units" },
    ],
  },
  {
    name: "Typography",
    icon: <Type className="w-4 h-4" />,
    tokens: [
      { name: "Display Font", value: "Silkscreen", cssVar: "--font-display", type: "typography", description: "Bitmap display font for headlines" },
      { name: "Mono Font", value: "JetBrains Mono", cssVar: "--font-mono", type: "typography", description: "UI monospace font" },
      { name: "Code Font", value: "Geist Mono", cssVar: "--font-code", type: "typography", description: "Code blocks, technical text" },
      { name: "Display 3XL", value: "96px", cssVar: "--text-display-3xl", type: "typography", description: "Hero headlines (12 grid units)" },
      { name: "Display XL", value: "48px", cssVar: "--text-display-xl", type: "typography", description: "Section headlines (6 grid units)" },
      { name: "Display Base", value: "24px", cssVar: "--text-display-base", type: "typography", description: "Card headlines (3 grid units)" },
      { name: "Mono Base", value: "13px", cssVar: "--text-mono-base", type: "typography", description: "Body text, UI labels" },
    ],
  },
  {
    name: "Borders & Radius",
    icon: <Box className="w-4 h-4" />,
    tokens: [
      { name: "Border Width", value: "1px", cssVar: "--border-width", type: "border", description: "Universal border width" },
      { name: "Radius None", value: "0px", cssVar: "--radius-none", type: "border", description: "Sharp corners" },
      { name: "Radius Default", value: "4px", cssVar: "--radius-default", type: "border", description: "Buttons, cards, inputs" },
      { name: "Radius LG", value: "8px", cssVar: "--radius-lg", type: "border", description: "Modals, large containers" },
    ],
  },
  {
    name: "Shadows (Hard/Pixelated)",
    icon: <Box className="w-4 h-4" />,
    tokens: [
      { name: "Shadow SM", value: "2px 2px 0 0", cssVar: "--shadow-sm", type: "shadow", description: "Subtle elevation" },
      { name: "Shadow Default", value: "4px 4px 0 0", cssVar: "--shadow-default", type: "shadow", description: "Cards, panels" },
      { name: "Shadow LG", value: "8px 8px 0 0", cssVar: "--shadow-lg", type: "shadow", description: "Hover elevation, modals" },
      { name: "Shadow XL", value: "12px 12px 0 0", cssVar: "--shadow-xl", type: "shadow", description: "Max elevation, DevTools" },
      { name: "Shadow Inset", value: "inset 2px 2px 0 0", cssVar: "--shadow-inset", type: "shadow", description: "Pressed/active states" },
      { name: "Shadow Focus", value: "0 0 0 2px", cssVar: "--shadow-focus", type: "shadow", description: "Focus rings" },
    ],
  },
];

export function TokenGrid() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section className="space-y-12">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <BitmapText size="xl" color="fg-0">Design Tokens</BitmapText>
          <p className="mt-2 text-[var(--color-fg-100)] text-mono-base max-w-2xl">
            The complete token system powering this portfolio. 16-color palette, 8px grid, 
            pixel-perfect shadows, bitmap typography. Every value is a CSS variable — 
            inspect, copy, and use directly.
          </p>
        </div>
        <PixelButton variant="ghost" size="sm" onClick={() => copyToClipboard(tokenCategories.flatMap(c => c.tokens).map(t => `${t.cssVar}: ${t.value};`).join("\n"))}>
          <Copy className="w-3.5 h-3.5" />
          <span>Export All CSS</span>
        </PixelButton>
      </header>

      <div className="space-y-12">
        {tokenCategories.map((category) => (
          <section key={category.name} className="card-pixel">
            <header className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-[var(--color-bg-200)] border border-[var(--color-border)] text-[var(--color-primary)]">
                  {category.icon}
                </div>
                <BitmapText size="lg" color="fg-0">{category.name}</BitmapText>
              </div>
              <PixelButton variant="ghost" size="sm" onClick={() => copyToClipboard(category.tokens.map(t => `${t.cssVar}: ${t.value};`).join("\n"))}>
                <Copy className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Copy Category</span>
              </PixelButton>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {category.tokens.map((token) => (
                <TokenCard key={token.name} token={token} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Quick Reference */}
      <section className="card-pixel">
        <BitmapText size="lg" color="fg-0" className="mb-6">Quick Reference</BitmapText>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <BitmapText size="sm" color="primary" className="mb-3">CSS Variables</BitmapText>
            <div className="code-block">
              <code>{`/* Colors */
--color-primary: #00FF88;
--color-bg-0: #0D0D0D;
--color-bg-100: #1A1A2E;
--color-fg-0: #FFFFFF;
--color-border: #3D3D5C;

/* Spacing */
--space-1: 8px;
--space-2: 16px;
--space-4: 32px;

/* Typography */
--font-display: "Silkscreen", monospace;
--font-mono: "JetBrains Mono", monospace;

/* Borders & Shadows */
--border-width: 1px;
--radius-default: 4px;
--shadow-default: 4px 4px 0 0 #0D0D0D;`}</code>
            </div>
          </div>
          <div>
            <BitmapText size="sm" color="primary" className="mb-3">Tailwind Classes</BitmapText>
            <div className="code-block">
              <code>{`/* Colors */
bg-primary, text-primary, border-primary
bg-bg-0, bg-bg-100, text-fg-0
border-border

/* Spacing */
p-2 (8px), p-4 (16px), p-8 (32px)
gap-2, gap-4, gap-8

/* Typography */
font-display, font-mono, font-code
text-display-xl, text-display-base
text-mono-base, text-mono-sm

/* Effects */
shadow-pixel (4px 4px 0 0)
rounded-pixel (4px)
border-pixel (1px)`}</code>
            </div>
          </div>
          <div>
            <BitmapText size="sm" color="primary" className="mb-3">Figma Variables</BitmapText>
            <div className="code-block">
              <code>{`/* Figma Variable Structure */
Brand/
  Primary/
    500: #00FF88  ← --color-primary
    400: #00CC6A  ← --color-secondary
    300: #009950  ← --color-brand-200
    200: #006633  ← --color-brand-300

Background/
  0: #0D0D0D      ← --color-bg-0
  100: #1A1A2E    ← --color-bg-100
  200: #2D2D44    ← --color-bg-200

Spacing/
  8: 8px          ← --space-1
  16: 16px        ← --space-2
  32: 32px        ← --space-4

Typography/
  Display: Silkscreen
  Mono: JetBrains Mono`}</code>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

function TokenCard({ token }: { token: TokenDisplay }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="card-pixel p-4 relative group">
      <div className="mb-3">
        <BitmapText size="xs" color="fg-200" className="mb-1">{token.name}</BitmapText>
        <div className="flex items-center gap-2">
          {token.type === "color" && (
            <div
              className="w-8 h-8 flex-shrink-0 border border-[var(--color-border)]"
              style={{ backgroundColor: token.value }}
              title={token.value}
            />
          )}
          <span className="font-code text-mono-xs text-[var(--color-fg-0)]">
            {token.value}
          </span>
        </div>
      </div>

      <div className="mb-3">
        <span className="text-[var(--color-fg-300)] text-mono-xs">CSS Var:</span>
        <div className="flex items-center gap-1 mt-1">
          <code className="font-code text-mono-xs text-[var(--color-brand-0)] flex-1 truncate">{token.cssVar}</code>
          <PixelButton
            variant="ghost"
            size="sm"
            className="p-1.5"
            onClick={() => copyToClipboard(token.cssVar)}
            aria-label={`Copy ${token.cssVar}`}
          >
            <Copy className="w-3.5 h-3.5" />
          </PixelButton>
        </div>
      </div>

      {token.description && (
        <p className="text-[var(--color-fg-200)] text-mono-xs mb-3 line-clamp-2">{token.description}</p>
      )}

      {/* Type badge */}
      <div className="absolute bottom-3 right-3">
        <span className={cn(
          "badge-pixel text-mono-xs px-2 py-0.5",
          token.type === "color" && "bg-[var(--color-brand-300)]",
          token.type === "spacing" && "bg-[var(--color-warning-200)]",
          token.type === "typography" && "bg-[var(--color-accent-300)]",
          token.type === "border" && "bg-[var(--color-bg-300)]",
          token.type === "shadow" && "bg-[var(--color-fg-200)] text-[var(--color-bg-0)]",
        )}>
          {token.type}
        </span>
      </div>
    </div>
  );
}