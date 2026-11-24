"use client";
// ──────────────────────────────────────────────────────────────
// src/components/projects/BrandExplorer.tsx
// Interactive proof of the multi-brand system: pick a brand and
// a device, and the same component "bindings" resolve to that
// brand's stored values (families, weights, H1 metrics, radius).
// Values come from `turboBrands` in src/lib/projects.ts.
// The sample is drawn in this site's typeface; the brand fonts
// themselves are not loaded here.
// ──────────────────────────────────────────────────────────────
import { useState } from "react";
import { motion } from "framer-motion";
import { track } from "@/lib/analytics";
import type { BrandSpec } from "@/lib/projects";
import { cn } from "@/lib/utils";

const devices = [
  { key: "desktop", label: "Desktop" },
  { key: "mweb", label: "M-web" },
] as const;

export function BrandExplorer({ brands }: { brands: BrandSpec[] }) {
  const [b, setB] = useState(0);
  const [device, setDevice] = useState<(typeof devices)[number]["key"]>("mweb");
  const brand = brands[b];
  const [size, line] = brand.h1[device].split(" / ").map(Number);
  // Scale the sample so desktop metrics still fit the panel.
  const k = device === "desktop" ? 0.7 : 1;
  const radius = Math.min(brand.radius, 22);
  const selectBrand = (index: number) => {
    track("brand_explorer_changed", { control: "brand", option_index: index });
    setB(index);
  };
  const selectDevice = (index: number) => {
    track("brand_explorer_changed", { control: "device", option_index: index });
    setDevice(devices[index].key);
  };

  const rows: [string, string][] = [
    ["Typography / font / family / heading", brand.heading],
    ["Typography / font / family / body", brand.body],
    ["Typography / weight (reg / med / semi)", brand.weights],
    ["Typography / heading / h1 (size / line)", brand.h1[device]],
    ["Brand / radius / alt / sm", String(brand.radius)],
  ];

  return (
    <div className="panel overflow-hidden" data-spec="explorer · surface · radius.card">
      <div className="flex flex-col gap-3 border-b border-line px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Segmented label="Brand" options={brands.map((x) => x.name)} value={b} onChange={selectBrand} />
        <Segmented
          label="Device"
          options={devices.map((d) => d.label)}
          value={devices.findIndex((d) => d.key === device)}
          onChange={selectDevice}
        />
      </div>

      <div className="grid md:grid-cols-[1fr_1.2fr]">
        {/* sample: same structure, values swap */}
        <div className="flex min-h-56 flex-col justify-center gap-4 border-b border-line bg-bg p-6 md:border-r md:border-b-0">
          <motion.p
            className="display font-semibold text-fg"
            animate={{ fontSize: size * k, lineHeight: `${line * k}px` }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            One role,
            <br />
            five results
          </motion.p>
          <motion.span
            className="inline-flex h-10 w-fit items-center border border-accent px-4 text-sm font-medium text-accent"
            animate={{ borderRadius: radius }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            Primary action
          </motion.span>
          <p className="font-mono text-micro text-fg-3">
            H1 at {size} / {line}
            {k !== 1 && " (drawn at 70%)"} · radius {brand.radius}
          </p>
        </div>

        {/* resolved values */}
        <dl className="divide-y divide-line">
          {rows.map(([token, value]) => (
            <div key={token} className="flex flex-col gap-0.5 px-4 py-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <dt className="font-mono text-[11px] text-fg-3">{token}</dt>
              <dd className="font-mono text-[13px] text-fg">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="border-t border-line px-4 py-2.5 font-mono text-micro text-fg-3">
        Sans serif values from the Figma snapshot of 5 Nov 2026. Sample text is set in this site’s typeface.
      </p>
    </div>
  );
}

function Segmented({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="mono-tag shrink-0 text-fg-3">{label}</span>
      <div role="group" aria-label={label} className="flex flex-wrap gap-1">
        {options.map((o, i) => (
          <button
            key={o}
            type="button"
            aria-pressed={i === value}
            onClick={() => onChange(i)}
            className={cn(
              "h-8 rounded-[var(--radius-control)] border px-2.5 text-[13px] transition-colors duration-100",
              i === value
                ? "border-accent bg-accent text-bg"
                : "border-line-2 text-fg-2 hover:border-fg-3 hover:text-fg",
            )}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
