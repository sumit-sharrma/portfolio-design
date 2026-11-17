// ──────────────────────────────────────────────────────────────
// src/lib/about.ts
// Content for /about.
//   identities → the clickable "is a ___" switcher
//   experience → timeline
//   toolkit    → design + engineering tools
//
// In identity copy, wrap a phrase in [[double brackets]] to
// highlight it in that identity's color.
// ──────────────────────────────────────────────────────────────

export type Shape = "hexagon" | "squircle" | "star" | "circle";

export type Identity = {
  role: string;
  shape: Shape;
  /** Any CSS color. Drives avatar fill, highlights and particles. */
  color: string;
  copy: string[];
};

export const identities: Identity[] = [
  {
    role: "design systems lead",
    shape: "hexagon",
    color: "oklch(68% 0.21 32)",
    copy: [
      "I lead the design system at Cars24: [[tokens, components and governance]] that keep 10+ product teams consistent.",
      "Before that I refactored Tide’s system from 100+ components down to 50, and built Jupiter’s from zero.",
    ],
  },
  {
    role: "former software engineer",
    shape: "squircle",
    color: "oklch(78% 0.15 155)",
    copy: [
      "I shipped production front-end code at Paytm before I moved into design. [[I still read the diff.]]",
      "That background is why my specs map one-to-one to components, and why engineers trust the tokens.",
    ],
  },
  {
    role: "tool builder",
    shape: "star",
    color: "oklch(82% 0.14 75)",
    copy: [
      "I build the tools my team uses: [[Figma plugins, Slackbots and MCP servers]], mostly with Cursor and Claude.",
      "If a rule can be automated, I would rather write the linter than the guideline.",
    ],
  },
  {
    role: "systems thinker",
    shape: "circle",
    color: "oklch(74% 0.12 250)",
    copy: [
      "Token tiers, triage pipelines, migration plans. I like problems where [[the structure is the solution]].",
      "Good systems make the right choice the easy one. That is most of the job.",
    ],
  },
  // TODO: add a personal one, e.g. { role: "weekend runner", shape: "circle", color: "...", copy: [...] }
];

export const experience = [
  {
    company: "Cars24",
    role: "Lead Product Designer · Design Systems",
    period: "May 2026 — Present",
    note: "AI-assisted workflows, Figma linting, zero-downtime migration for B2B dashboards.",
  },
  {
    company: "Tide",
    role: "Sr. Product Designer · Design Systems",
    period: "Jun 2023 — Jan 2026",
    note: "Consolidated 100+ components to 50, cut docs cost 80%, automated DS intake.",
  },
  {
    company: "Jupiter Money",
    role: "Sr. Product Designer · Design Systems",
    period: "Nov 2021 — May 2023",
    note: "Built the ‘Europa’ design system from 0 to 30 components with a token pipeline.",
  },
  {
    company: "Paytm",
    role: "Product Designer & Developer",
    period: "Jun 2018 — Sep 2021",
    note: "Merchant analytics redesign, BEM/SCSS architecture, design system implementation.",
  },
];

export const toolkit = {
  design: ["Figma Variables", "Design Tokens", "Storybook", "EightShapes Specs", "Prototyping", "Accessibility"],
  engineering: ["TypeScript", "React", "Style Dictionary", "Figma Plugin API", "MCP", "Cursor · Claude"],
};
