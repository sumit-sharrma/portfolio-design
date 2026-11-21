// ──────────────────────────────────────────────────────────────
// src/lib/projects.ts
// Case-study content. Each entry renders at /projects/[slug]
// and as a card in the Home bento grid.
//
// Placeholder copy is marked with "TODO:" so it is easy to find
// and replace with real numbers, quotes and media.
// ──────────────────────────────────────────────────────────────

export type ProjectVisual = "lint" | "mcp" | "pipeline" | "tiers" | "contexts" | "halve" | "areas";

export type Metric = {
  value: string;
  label: string;
  note?: string;
};

export type MediaBlock = {
  kind: "diagram" | "code" | "ui" | "table" | "route" | "image" | "converge" | "layers";
  title: string;
  caption: string;
  /** Span both columns on desktop (use for tables). */
  wide?: boolean;
  /** kind: "layers" — a token-mapping diagram across three layers. */
  map?: LayerMap;
  /** kind: "converge" — animated "many files into one". `count` tiles, a few of them labelled. */
  count?: number;
  /** How many tiles to draw, if fewer than `count`. */
  shown?: number;
  labels?: string[];
  target?: string;
  targetNote?: string;
  /**
   * kind: "image". `src` is a file under public/ ("/projects/…") or a full https link
   * (for example Cloudinary), which is used as-is, not copied or re-processed.
   * `alt` is required; width/height are the image's pixel size.
   */
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  /** kind: "code" — shown verbatim in the code panel. */
  code?: string;
  lang?: string;
  /** kind: "table". `textual: true` left-aligns every column, for tables of words not numbers. */
  textual?: boolean;
  columns?: string[];
  rows?: string[][];
  /** kind: "route" — a chain of steps, top to bottom. `via` labels the hop below a step. */
  steps?: { token: string; via?: string }[];
  /** Small label in the panel header. Defaults to the kind (or the code language). */
  tag?: string;
};

/** Three layers and the real token routes that cross them. */
export type LayerMap = {
  layers: [LayerInfo, LayerInfo, LayerInfo];
  /** `via` is the middle-layer token; leave it out for a token held on its old value. */
  routes: { from: string; before: string; via?: string; to: string; after: string }[];
  footnote?: string;
};
type LayerInfo = { title: string; count: number; note: string };

/** One brand's resolved values, used by the context explorer. */
export type BrandSpec = {
  name: string;
  heading: string;
  body: string;
  weights: string;
  h1: { desktop: string; mweb: string };
  radius: number;
};

export type ProjectCategory = "case-study" | "tool";

export const categoryLabel: Record<ProjectCategory, string> = {
  "case-study": "Case study",
  tool: "Tool",
};

export type Project = {
  slug: string;
  /** Which group it appears under on Home. */
  category: ProjectCategory;
  /** Two-digit position within its category, e.g. "02". */
  index: string;
  title: string;
  shortTitle: string;
  summary: string;
  role: string;
  timeline: string;
  stack: string[];
  visual: ProjectVisual;
  /** Bento sizing on desktop: "full" spans the row, "wide" 2 cols, "tall" 2 rows. */
  size: "full" | "wide" | "tall" | "base";
  problem: {
    lede: string;
    points: { title: string; body: string }[];
    /** Full detail under the cards, e.g. one labelled table per area. */
    detail?: MediaBlock[];
  };
  solution: {
    lede: string;
    media: MediaBlock[];
    /** `cost` is what the decision gives up or requires. */
    decisions: { title: string; body: string; cost?: string }[];
    /** Renders the interactive brand explorer when present. */
    brands?: BrandSpec[];
  };
  impact: {
    lede: string;
    metrics: Metric[];
    /** What the evidence does not show yet. */
    notMeasured?: string;
  };
};

/** Resolved values per brand. Source: saved Figma snapshot, 5 Nov 2026 (Sans serif). */
export const turboBrands: BrandSpec[] = [
  { name: "Cars24", heading: "Geist", body: "Geist", weights: "400 / 500 / 600", h1: { desktop: "40 / 44", mweb: "24 / 27" }, radius: 8 },
  { name: "CarInfo", heading: "Manrope", body: "Manrope", weights: "500 / 600 / 700", h1: { desktop: "40 / 44", mweb: "24 / 27" }, radius: 2 },
  { name: "Vehicle Info", heading: "Metropolis", body: "Metropolis", weights: "400 / 500 / 600", h1: { desktop: "40 / 44", mweb: "24 / 27" }, radius: 999 },
  { name: "Team BHP", heading: "Archivo", body: "Google Sans Flex", weights: "400 / 500 / 600", h1: { desktop: "40 / 56", mweb: "24 / 34" }, radius: 8 },
  { name: "Kiwi", heading: "Google Sans Flex", body: "Google Sans Flex", weights: "400 / 500 / 600", h1: { desktop: "40 / 54", mweb: "24 / 32" }, radius: 12 },
];

export const projects: Project[] = [
  // ── Case study 01 ─────────────────────────────────────────
  // Sources: multi-brand-system-case-study.html (evidence checked 11 Nov 2026) for the
  // variable architecture and numbers; the author's own account for the starting state
  // (45+ library files), the descriptions work and the Storybook changes.
  {
    slug: "multi-brand-variable-system",
    index: "01",
    category: "case-study",
    title: "Multi-Brand Variable System",
    shortTitle: "Multi-Brand System",
    summary:
      "Consolidated 45+ scattered library files into one source of truth: a Figma variable architecture that resolves the same components for five brands, two color modes, three devices and two typefaces.",
    role: "Lead Product Designer · System architecture and consolidation",
    timeline: "1 week, 2026",
    stack: ["Figma Variables", "Variable modes", "Figma API", "Storybook", "JavaScript resolver", "JSON export"],
    visual: "contexts",
    size: "full",
    problem: {
      lede:
        "The design system was spread over 45+ library files. Mobile typography sat in one file, desktop typography in another, tokens in a third, components in a fourth and complex components in a fifth. Nobody could point to one place and say: this is the system.",
      points: [
        {
          title: "No single source",
          body: "With tokens, type and components split across dozens of libraries, a change in one place did not reach the others, and it was hard to tell which file was current.",
        },
        {
          title: "Contexts the system could not express",
          body: "Multi-brand worked only partly. There was no Light or Dark mode and no responsive typography: the H1 variable was 24 / 28 everywhere.",
        },
        {
          title: "Development nobody could see",
          body: "Storybook ran only on a local build. Seeing a component meant cloning the repo, getting DevOps permissions and building it, so designers and everyone else worked blind.",
        },
      ],
    },
    solution: {
      lede:
        "My first task was to get Storybook published for the whole company, so progress was visible to everyone. Then I consolidated the libraries into one file built on four independent collections: Brand, Mode, Device and Typeface. Components bind to stable public roles and aliases route each role to the right brand decision, which gives 5 × 2 × 3 × 2 = 60 contexts of one system, not 60 libraries.",
      brands: turboBrands,
      media: [
        {
          kind: "converge",
          wide: true,
          tag: "consolidation",
          title: "45+ library files into one source",
          caption:
            "Every separate library file for typography, tokens, components and complex components, and the one system they now feed.",
          count: 45,
          shown: 15,
          labels: ["Typography · mobile", "Typography · desktop", "Tokens", "Components", "Molecules", "Organisms"],
          target: "Turbo UI",
          targetNote: "one source · 9 collections",
        },
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "What changed",
          caption: "The starting state and the result, area by area.",
          columns: ["Area", "Before", "After"],
          rows: [
            ["Library files", "45+ separate files", "One source for everyone"],
            ["Typography", "Mobile and desktop in different files, one size per role", "Responsive, selected by Device mode"],
            ["Color modes", "None", "Light and Dark"],
            ["Brands", "Worked only partly", "Five, each a Brand mode"],
            ["Storybook", "Local build only", "Published to the whole company"],
            ["Component docs", "No per-component tabs", "About, props and examples tabs, fetched from the Figma API"],
          ],
        },
        {
          kind: "table",
          wide: true,
          title: "Variable collections, before and after",
          caption:
            "Local variable definitions per collection, read from the live files on 11 Nov 2026. Core: 647 in six collections. Standalone: 1,796 in nine.",
          columns: ["Collection", "Turbo UI Core", "Standalone"],
          rows: [
            ["Primitive", "200", "470"],
            ["Theme / Brand", "49", "717"],
            ["Semantic / Mode", "162", "162"],
            ["Typography", "56", "66"],
            ["Device", "No separate collection", "76"],
            ["Typeface", "No separate collection", "66"],
            ["Layout", "No separate collection", "49"],
            ["Utility", "97", "107"],
            ["Misc", "83", "83"],
          ],
        },
        {
          kind: "route",
          title: "Color route",
          tag: "alias route",
          caption:
            "The component keeps one binding. For Team BHP this CTA role resolves to #D01B2D in both Light and Dark.",
          steps: [
            { token: "Mode / bg / brand / base-alt", via: "Light or Dark" },
            { token: "Brand / theme / {light|dark} / bg / brand / base-alt", via: "selected Brand" },
            { token: "Primitive color" },
          ],
        },
        {
          kind: "route",
          title: "Typography route: H1 line height",
          tag: "alias route",
          caption:
            "Same public binding, different result: 27 for Cars24 and 34 for Team BHP on M-web. Each is a stored choice, not a formula.",
          steps: [
            { token: "Typography / line-height / heading / h1", via: "alias" },
            { token: "Typeface / line-height / heading / h1", via: "Sans serif" },
            { token: "Device / sans-serif / line-height / heading / h1", via: "M-web" },
            { token: "Brand / type / sans-serif / line-height / m-web / heading / h1", via: "selected Brand" },
            { token: "Primitive / line-height / {value}" },
          ],
        },
        {
          kind: "code",
          wide: true,
          title: "Developer export: resolver",
          caption:
            "The JSON export keeps variable IDs, modes, aliases and scopes, with a schema, a resolver and a validation report. It is a Figma-native format, not DTCG or generated CSS.",
          lang: "js",
          code: `const tokens = createResolver(data, {
  Brand: 'Team BHP',
  Mode: 'Dark',
  Device: 'M-web',
  Typeface: 'Sans serif',
});

tokens.get('Typography', 'font/family/heading');    // Archivo
tokens.get('Typography', 'line-height/heading/h1'); // 34
tokens.get('Mode', 'bg/brand/base-alt');            // RGBA`,
        },
      ],
      decisions: [
        {
          title: "Publish Storybook before anything else",
          body: "Once everyone in the company could open Storybook in a browser, designers, PMs and developers were looking at the same components and tokens.",
          cost: "It took DevOps permissions and developer goodwill, so the relationship work came before the design work.",
        },
        {
          title: "One source, not 45 libraries",
          body: "Tokens, typography, components and complex components now live in one system that every team reads from.",
          cost: "One file is a single point of failure, so it needs clear ownership and review.",
        },
        {
          title: "Independent context collections",
          body: "Brand, color mode, device and typeface are separate selections, so it is always clear which one changed.",
          cost: "More alias hops and more modes to test.",
        },
        {
          title: "Explicit per-brand metrics",
          body: "CarInfo’s regular / medium / semibold are 500 / 600 / 700. Storing each brand’s numbers keeps differences like that intact.",
          cost: "The Brand collection is the largest layer at 717 definitions.",
        },
        {
          title: "Descriptions on everything, written for AI",
          body: "Every component, every variant and every token, primitives and surfaces included, carries a description, so an AI agent can read the system and design in context.",
          cost: "Descriptions are one more thing to keep current with every change.",
        },
        {
          title: "Storybook docs fetched from Figma",
          body: "Each component in Storybook has About, props and examples tabs populated from the Figma API, so documentation is not written twice.",
          cost: "The docs are only as accurate as the Figma file.",
        },
        {
          title: "Local ownership of variables",
          body: "The file resolves entirely from its own definitions. Two CarInfo colors with no exact palette match were kept as direct Brand values, not swapped for a near match.",
          cost: "Local copies can drift from the upstream library.",
        },
      ],
    },
    impact: {
      lede:
        "One system where there were 45+ files, visible to the whole company and readable by AI. The numbers below come from the files and the validation reports.",
      metrics: [
        { value: "45+", label: "Library files consolidated", note: "Into one source of truth" },
        { value: "5", label: "Brands, one system", note: "Cars24, CarInfo, Vehicle Info, Team BHP, Kiwi" },
        { value: "60", label: "Resolvable contexts", note: "5 brands × 2 modes × 3 devices × 2 typefaces" },
        { value: "0", label: "Broken or external references", note: "107,760 evaluations across 1,796 variables" },
      ],
      notMeasured:
        "Not measured yet: team adoption, time saved when adding a brand, and visual parity in production apps. TODO: add these once there is data.",
    },
  },

  // ── Case study 02 ─────────────────────────────────────────
  // Source: saarthi-ui repo, branch feature/token-mapping (commits of 15–16 Jul 2026),
  // docs/saarthi-to-turbo-token-migration.md, and the Storybook comparison stories.
  {
    slug: "zero-downtime-system-migration",
    index: "02",
    category: "case-study",
    title: "Zero-Downtime Token Migration",
    shortTitle: "Zero-Downtime Migration",
    summary:
      "Brought Saarthi, an internal dashboard two design-system generations behind, onto Turbo UI by remapping its tokens underneath, without renaming a variable or pausing development.",
    role: "Lead Product Designer · did the mapping in code",
    timeline: "A weekend in Jul 2026",
    stack: ["SCSS custom properties", "Turbo UI tokens", "Storybook", "Turborepo", "Figma variables"],
    visual: "tiers",
    size: "base",
    problem: {
      lede:
        "Saarthi was two generations behind the current design system, still on its older orange branding. Its components could not all be rebuilt on Turbo UI without breaking a product that teams ship to every week.",
      points: [
        {
          title: "Token names were a production API",
          body: "Variables such as --bg-fill-default-primary are referenced across a shared UI package and nine apps in one monorepo. Renaming them would break screens nobody was looking at.",
        },
        {
          title: "A rebuild was off the table",
          body: "Replacing every component with its Turbo UI equivalent meant a long freeze, and the risk of regressions across operational tools people rely on daily.",
        },
        {
          title: "No developer time to spare",
          body: "Feature work could not stop for a design-system upgrade, so the migration had to cost the developers close to nothing.",
        },
      ],
    },
    solution: {
      lede:
        "I left the components alone and changed what their tokens point to. Turbo’s primitives and semantic tokens went in underneath, and every existing Saarthi name became an alias to them. I made the change myself in the repo, on a parallel branch, and built a before-and-after page in the team’s existing Storybook so anyone could review it.",
      media: [
        {
          kind: "image",
          wide: true,
          title: "Storybook: before and after mapping",
          caption:
            "The same Button and Modal stories rendered twice, with the old token values and with the Turbo mapping. No component code differs between the two sides.",
          src: "/projects/zero-downtime-system-migration/storybook-before-after.jpg",
          alt: "Two Storybook panels side by side. Before mapping, buttons are orange. After Turbo token mapping, the same buttons are blue.",
          width: 1100,
          height: 880,
        },
        {
          kind: "layers",
          wide: true,
          tag: "token mapping",
          title: "The layer between old tokens and Turbo UI",
          caption:
            "Real routes from colors.scss. Components still ask for the name on the left; the swatches show what that name resolved to before and what it resolves to now.",
          map: {
            layers: [
              { title: "Saarthi names", count: 121, note: "What components already use. Not one was renamed." },
              { title: "Turbo semantic", count: 49, note: "The new layer in between. Shared meaning from Turbo UI." },
              { title: "Primitives", count: 55, note: "Turbo palettes, plus legacy values kept on purpose." },
            ],
            routes: [
              { from: "--bg-fill-brand", before: "#ef6e0b", via: "--bg-brand-base", to: "--brand-500", after: "#4736fe" },
              { from: "--bg-fill-brand-hover", before: "#d4620a", via: "--bg-brand-base-hover", to: "--brand-600", after: "#351ed8" },
              { from: "--bg-fill-brand-secondary", before: "#fce7d6", via: "--bg-brand-subtle", to: "--brand-100", after: "#e1e3fd" },
              { from: "--text-default-primary", before: "#0f0f10", via: "--text-primary", to: "--color-slate-950", after: "#020617" },
              { from: "--text-default-secondary", before: "#717272", via: "--text-secondary", to: "--color-slate-500", after: "#64748b" },
              { from: "--border-default-primary", before: "#d6d6d6", via: "--border-primary", to: "--color-slate-200", after: "#e2e8f0" },
              { from: "--bg-fill-state-error", before: "#b4272e", via: "--bg-danger-base", to: "--color-red-600", after: "#dc2626" },
              { from: "--bg-fill-misc-teal", before: "#0c534f", to: "--legacy-teal-500", after: "#0c534f" },
            ],
            footnote:
              "All 121 names are aliases now: 73 route through the Turbo semantic layer, 12 point straight at a Turbo primitive, and 36 are held on their legacy value until a visual decision is made.",
          },
        },
        {
          kind: "code",
          title: "Three layers in one :root",
          caption: "Old names stay. They now resolve through Turbo’s semantic layer to Turbo’s primitives.",
          lang: "scss",
          code: `:root {
  /* Primitive layer */
  --brand-500: #4736fe;
  --color-slate-950: #020617;

  /* Turbo semantic layer */
  --bg-brand-base: var(--brand-500);
  --text-primary: var(--color-slate-950);

  /* Saarthi compatibility layer */
  --bg-fill-brand: var(--bg-brand-base);
  --text-default-primary: var(--text-primary);
}`,
        },
        {
          kind: "route",
          tag: "alias route",
          title: "How one old name resolves",
          caption: "Components keep asking for --bg-fill-brand. The answer changed from orange to the current brand blue.",
          steps: [
            { token: "--bg-fill-brand", via: "Saarthi compatibility alias" },
            { token: "--bg-brand-base", via: "Turbo semantic token" },
            { token: "--brand-500", via: "primitive" },
            { token: "#4736fe" },
          ],
        },
        {
          kind: "table",
          title: "Mapping inventory",
          caption: "The plan, from the migration document: candidates per token group. Anything without a clear equivalent was held back, not aliased blindly.",
          columns: ["Token group", "Mapped"],
          rows: [
            ["Background", "32"],
            ["Text", "19"],
            ["Border", "10"],
            ["Icon", "17"],
            ["Spacing", "29"],
            ["Typography", "12"],
            ["Size and radius", "12"],
            ["Held for a decision", "10"],
          ],
        },
        {
          kind: "image",
          wide: true,
          title: "Saarthi on staging, after the mapping",
          caption:
            "A vendor list in the dashboard with the current blue branding applied through the remapped tokens. Vendor names, phone numbers and emails are masked.",
          src: "/projects/zero-downtime-system-migration/saarthi-staging.jpg",
          alt: "Saarthi dashboard on staging: a left navigation and a vendor table with a blue primary button, blue toggles and status badges. Personal details are covered with grey bars.",
          width: 1273,
          height: 786,
        },
      ],
      decisions: [
        {
          title: "Alias the old names, never rename",
          body: "Every existing variable still exists and still resolves, so nothing that references it can break.",
          cost: "Two naming systems live side by side until old components are retired.",
        },
        {
          title: "No component changes in the first pass",
          body: "Beyond the color variables file, only four component source files were touched: Button, Checkbox, Modal and Tooltip.",
          cost: "Components modernize in value, not in structure or API.",
        },
        {
          title: "A decision bucket for anything ambiguous",
          body: "Ten token groups, such as misc colors, gradients and the single shadow, stayed on their legacy values until someone approved a visual change.",
          cost: "Those parts of the product still look like the old system.",
        },
        {
          title: "Review inside the existing Storybook",
          body: "Before-and-after stories for 51 components, plus a token migration page, went into the Storybook the team already runs.",
          cost: "The comparison stories need removing once the rollout is done.",
        },
        {
          title: "Done by the designer, in parallel",
          body: "The work sat on its own branch, so developers reviewed a finished change and kept shipping features meanwhile.",
          cost: "It still needs engineering review before it merges.",
        },
      ],
    },
    impact: {
      lede:
        "Saarthi’s typography, spacing and color now resolve from Turbo UI, and its branding moved from the legacy orange to the current blue, with no pause in development. The change is on staging.",
      metrics: [
        { value: "121", label: "Saarthi names aliased", note: "73 through the Turbo semantic layer" },
        { value: "51", label: "Components with before/after stories", note: "In the existing Storybook" },
        { value: "0", label: "Token names renamed", note: "Every old variable still resolves" },
        { value: "4", label: "Component files changed", note: "Button, Checkbox, Modal, Tooltip" },
      ],
      notMeasured:
        "Not measured yet: production rollout, visual regressions found in review, and developer hours saved. TODO: add these after release.",
    },
  },

  // ── Case study 03 ─────────────────────────────────────────
  // Source: https://www.designerwhocode.com/pds-2/ (the author’s own write-up). Images are
  // linked from the author’s Cloudinary account, not copied into the project.
  {
    slug: "tide-portal-design-system-2",
    index: "03",
    category: "case-study",
    title: "Portal Design System 2.0",
    shortTitle: "Tide · Portal 2.0",
    summary:
      "Rebuilt Tide’s component library on Figma’s current component model, halving the number of components designers have to search and maintain.",
    role: "Sr. Product Designer · Design Systems, Tide",
    timeline: "2025",
    stack: ["Figma component properties", "Nested components", "Design tokens", "Migration plan", "Onboarding"],
    visual: "halve",
    size: "base",
    problem: {
      lede:
        "A component library is the shared set of reusable UI elements, such as buttons, forms, icons, headers and navigation bars, that teams build products from. Tide’s library, Portal, had 104+ components split across App, Web and Cross-platform files, and it was still built on Figma’s pre-2022 component model. Every small change meant repeating a whole component.",
      points: [
        {
          title: "Built on Figma’s old model",
          body: "Figma’s 2022 release added component properties, which Portal never used. Adding an icon, a button or a sub-heading meant a new repeated variant. Banner became overly complicated and still had no success state.",
        },
        {
          title: "Organised by platform, not component",
          body: "Files were split into Cross-platform, App and Mobile, so web got little attention. A designer could not tell whether a component existed for their platform. A well-designed table for web was missing, so List was used to show data. Platform filtering belongs on the component, not in the folder structure.",
        },
        {
          title: "Unrelated components in the same file",
          body: "AccordionTitle sat in the Button file, BSMenu on the Input page and BusinessName under List. Search was unreliable, and finding a component meant remembering where it lived. Web and page actions and filtering were a component in their own right, and Dialog/app was not designed correctly.",
        },
        {
          title: "No nested parts for complex components",
          body: "Segment control, Tabs and Bottom navigation had no local structure. Their states and designs were repeated across variants, so simple iterations needed new variants.",
        },
        {
          title: "The cost to the business",
          body: "Designers found it hard to find what they needed, according to an anonymous questionnaire. Missing properties raised support tickets and back-and-forth between designers, developers and the Design System team. The Design System team took about twice as long to update a component, and the delays reached 8,00,000+ members in India and 5,00,000+ in the UK.",
        },
      ],
    },
    solution: {
      lede:
        "I started small. I redesigned Button, Banner and Segment control with the properties they were missing, and support queries for them fell by almost half. That result made the case for the whole library, which became a team OKR in Q1 2025. Then I compared two routes, patching the old library or building a new one, and chose the new one.",
      media: [
        {
          kind: "image",
          title: "Issue 1: old Figma structure",
          caption: "Banner in the old structure: repeated variants for every icon, button or sub-heading, and no success state.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762085873/Issue-1_qhkmb1.webp",
          alt: "Slide from the write-up showing the old Banner component structure.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "Issue 2: platform-first structure",
          caption: "Components filed by platform. Web was not in focus, and the structure was harder to search than it should be.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086160/Issue-2_kevhmz.webp",
          alt: "Slide from the write-up showing the platform-first file structure.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "Issue 2.1: misplaced components",
          caption: "Non-related components sitting in the same file, such as AccordionTitle in the Button file.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086159/Issue-3_knadv4.webp",
          alt: "Slide from the write-up showing components placed in unrelated files.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "Issue 3: no local structure",
          caption: "Complex components such as Segment control had no nested parts, so every change repeated the whole component.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086159/Issue-4_ejyvnj.webp",
          alt: "Slide from the write-up showing Segment control without nested parts.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "New library, or keep releasing on the old one",
          caption:
            "The comparison from before the decision. I tried branching the old library first, but Figma merges broke overrides and variants, and every change to a component destroyed its instances. A new library was the only route that could move forward in real time.",
          columns: ["Option", "Pro", "Con"],
          rows: [
            ["New library", "Clean break: no legacy baggage, and the old library stays untouched for legacy files.", "Old designs no longer connect to the new components, so they stay as they are or are updated by hand."],
            ["", "Instant access: the whole team gets standardised components from day one.", "The initial migration takes planning and time, especially with many dependencies."],
            ["", "Avoids merge conflicts, which in Figma lose overrides, break variants and nest conflicts.", ""],
            ["", "Designers and developers can adopt it project by project.", ""],
            ["", "A clean, well-structured library is easier to document and teach.", ""],
            ["Existing library", "Single source of truth: no second library, and existing projects stay connected.", "Merge conflicts: Figma has weak merging tools, so branches cause overwrites and broken components."],
            ["", "Lower immediate overhead: only instances need updating, if everything merges.", "High maintenance: precise merging, clean-up, renaming and testing across files, continuously."],
            ["", "", "Inconsistent behaviour: instances in other files need manual updates, so UI drifts."],
            ["", "", "Naming conflicts: splitting Banner into ProductBanner and AlertBanner breaks existing usage."],
            ["", "", "Figma debt grows with every patch and pulls the library away from the design direction."],
          ],
        },
        {
          kind: "image",
          wide: true,
          title: "Component updates: before and after",
          caption: "The full comparison from the write-up: each Portal 1.0 component, its Portal 2.0 counterpart, its category and what changed.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086698/Before-v-after_hupy5r.webp",
          alt: "Long table comparing Portal 1.0 components with Portal 2.0 components, their category, and the changes made.",
          width: 2380,
          height: 2508,
        },
        {
          kind: "image",
          title: "Banner, before",
          caption: "One component, dozens of near-identical variants. Each new button or sub-heading had needed its own copy.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086160/Outcome-before_q0qkd3.webp",
          alt: "The old Banner component in Figma: several columns of repeated banner variants in different colors.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "Banner, after",
          caption: "The same component rebuilt on properties: every state and variant present, with toggles for the optional parts.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086160/Outcome-after_rd9bkx.webp",
          alt: "The new Banner component: two tidy columns of variants with all states present and toggles for optional parts.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "File structure, old and new",
          caption: "From platform folders to general categories, so a designer searches by what a component is, not where it runs.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086159/Outcome-after-1_r4fl1p.webp",
          alt: "Two Figma page lists side by side: the old list grouped by platform, the new one grouped by component category.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          title: "Component structure, old and new",
          caption: "Segment control rebuilt from a nested part that holds its own states, so the main component no longer repeats them.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086160/Outcome-after-2_obm39y.webp",
          alt: "Segment control before and after: a large grid of repeated variants on the left, a short list built from one nested item on the right.",
          width: 1920,
          height: 1080,
        },
        {
          kind: "image",
          wide: true,
          title: "Removed components",
          caption: "Components that were not carried into Portal 2.0, with the reason and the component to use instead. Examples: Business name moved to bottom sheet plus list, Transaction review to progress, and the action bars to chips.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086805/Removed_i3b9mu.webp",
          alt: "Table of Portal 1.0 components removed in Portal 2.0, with the comments on what to use instead.",
          width: 2568,
          height: 2782,
        },
        {
          kind: "route",
          tag: "rollout",
          title: "Rollout order",
          caption:
            "Developers went first, so the code was ready before any designer’s file changed. The design rollout was one go, to avoid confusion and repeated back-and-forth between teams.",
          steps: [
            { token: "Weekly design meeting: what is changing and why", via: "feedback on components and docs" },
            { token: "Design-system developers get the new components", via: "code catches up first" },
            { token: "Team call + migration document", via: "changes, merged and deprecated components, dates" },
            { token: "Designers switch in one go", via: "onboarding guide and a file to play with" },
            { token: "Old library deleted after the support deadline" },
          ],
        },
        {
          kind: "table",
          textual: true,
          title: "What the migration document covered",
          caption: "Shared with every designer on a common call, alongside a file of the new components to try.",
          columns: ["Question", "Answer it gave"],
          rows: [
            ["Why", "The reason for the exercise"],
            ["What", "The exact changes to each component"],
            ["What is gone", "Deprecated and merged components"],
            ["When", "Publish date, old-library deletion date, support deadlines"],
            ["What to do", "What each designer is expected to do in their files"],
          ],
        },
        {
          kind: "image",
          wide: true,
          title: "Rollout calendar",
          caption: "Component releases to the design-system developers, grouped into rollout batches across the calendar.",
          src: "https://res.cloudinary.com/dcx5qfzvy/image/upload/v1762086161/rollout_u2fesf.webp",
          alt: "A month calendar with green bars marking rollout batches, beside lists of the components in each batch.",
          width: 1920,
          height: 1080,
        },
      ],
      decisions: [
        {
          title: "Prove it on three components first",
          body: "Button, Banner and Segment control were redesigned before anything was proposed. The numbers from that pilot carried the larger plan.",
          cost: "The wider problems stayed in place while the pilot ran.",
        },
        {
          title: "A new library, not patches",
          body: "A fresh library avoided merge conflicts and let teams move across project by project.",
          cost: "Old designs keep their old components unless someone updates them by hand.",
        },
        {
          title: "Platform is a property, not a folder",
          body: "Each component is designed for every platform, with the platform chosen on the component, so there is one thing to find and maintain. Web gets its own proper components, such as a table in place of List.",
          cost: "Every component has to be thought through for web as well, which is more work per component.",
        },
        {
          title: "Remove what is not a component",
          body: "Web and page actions, and several action bars and banners, were removed rather than migrated, because chips, headers or progress elements already cover them.",
          cost: "Teams that used those patterns need to move to the replacement.",
        },
        {
          title: "Nested parts for complex components",
          body: "Segment control, Tabs and Bottom navigation are built from local sub-components that hold their own states.",
          cost: "One more layer for designers to understand.",
        },
        {
          title: "Developers first, designers in one go",
          body: "Code changed before design files did, and designers switched together to avoid weeks of mixed libraries.",
          cost: "Designers waited for the release, and the timing needed close co-ordination.",
        },
      ],
    },
    impact: {
      lede:
        "The library that 1.3 million Tide members’ products are designed with got smaller and easier to maintain.",
      metrics: [
        { value: "50%", label: "Fewer components", note: "Down from 104+" },
        { value: "~50%", label: "Fewer support queries", note: "Almost half, after the three-component pilot" },
        { value: "~2x", label: "Design-system team speed", note: "Almost doubled, after the pilot" },
        { value: "3", label: "Components in the pilot", note: "Button, Banner, Segment control" },
      ],
      notMeasured:
        "Designer test: rebuilding a pattern with the old and the new List component took about the same time. Designers said the new one was easier, so video onboarding for complex components was added afterwards.",
    },
  },

  // ── Case study 04 ─────────────────────────────────────────
  // Source: https://www.designerwhocode.com/tide-overview/ (the author’s own write-up).
  // Every point from the write-up is kept. Figures are the author’s own and not independently measured.
  {
    slug: "tide-beyond-the-library",
    index: "04",
    category: "case-study",
    title: "Beyond the library",
    shortTitle: "Beyond the library",
    summary:
      "The work around Tide’s component library: developer handoff, token and colour governance, a support pipeline, and documentation engineers can build from.",
    role: "Sr. Product Designer · Design Systems, Tide",
    timeline: "Tide · 2023–2026",
    stack: ["Figma Specs plugin", "Figma component docs", "Design tokens", "Slack Block Kit"],
    visual: "areas",
    size: "base",
    problem: {
      lede:
        "These were not part of the component case study, but they were part of the same system, and as a senior designer I worked on the broader processes too. The write-up is organised into four areas. Each one is set out below as the challenges I found, with their labels kept.",
      points: [
        {
          title: "Handoff: no protocol, no single source",
          body: "Developer handoff ran on ad-hoc calls and meetings, with no documentation system behind it.",
        },
        {
          title: "Components: no governance",
          body: "New components went into the central library without vetting, and there was no token system or colour rule set.",
        },
        {
          title: "Support: no tracking, no owners",
          body: "Requests went through a 170+ member Slack channel, where they were lost, logged nowhere and owned by no one.",
        },
        {
          title: "Documentation: outdated and incomplete",
          body: "Component pages lacked usage guidance, states and anatomy, and much of what they said was out of date.",
        },
      ],
      detail: [
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "Handoff: current situation",
          caption: "Upon joining, the organisation had no formal developer handoff protocol and no dedicated documentation system.",
          columns: ["Challenge", "What it looked like"],
          rows: [
            ["Information Degradation", "Reliance on verbal communication and impromptu discussions increased the risk of information loss or misinterpretation between design and engineering."],
            ["Operational Friction", "With no single source of truth, frequent unscheduled clarification meetings consumed time from both design and development."],
            ["Reduced Velocity", "The disorganised handoff increased development turnaround time (TAT), hindering product velocity and deployment schedules."],
          ],
        },
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "Components and standards: current situation",
          caption: "On joining, I could not find any guidelines on what happens when a component is modified or added to the design system.",
          columns: ["Challenge", "What it looked like"],
          rows: [
            ["Design Workflow & Governance", "The design team did not know that local, project-specific components were possible. Every new component went straight to the central library without vetting."],
            ["Component Usage", "Without sharing protocols, designers copy-pasted components between files. That blocked updates and spread inconsistencies."],
            ["Tokenization Debt", "No formal token system existed. Values were managed by hand, and design attributes linked directly to code, which raised maintenance costs."],
            ["Color Palette Chaos", "The whole palette was unrestricted and available for any use case, which caused inconsistency and visual noise."],
            ["Lack of Structure", "Colours were not categorised, for example semantic against utility, so colour choice was arbitrary and error-prone."],
            ["Component Modularity", "Components were built for highly specific, single use cases rather than generalisation, which caused component sprawl."],
            ["Technical Debt (Legacy System)", "Components were built on outdated or legacy Figma features, which increased the effort needed for every update."],
            ["Missing Documentation", "No documentation for defined states (active, hover, disabled), clear usage guidelines (when to use and when not to), or component types and variations."],
          ],
        },
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "Design system support: current situation",
          caption: "Formal support requests, questions and doubts went through a high-volume common channel such as Slack, which caused governance and operational issues.",
          columns: ["Challenge", "What it looked like"],
          rows: [
            ["Lack of Traceability", "No mechanism logged incoming requests, so past queries could not be audited and support volume could not be measured."],
            ["Absence of Accountability", "Items could not be formally followed up or assigned an owner, so they went unresolved."],
            ["Information Siloing", "Requests were easily misplaced or lost in the volume of a group of 170+ members."],
            ["Resource Management", "The process could not time-bound or prioritise tasks, which hurt workload management and service level agreements (SLAs)."],
            ["Poor Resolution Visibility", "No central place broadcast resolutions or frequently asked questions, so the same queries recurred."],
            ["Systemic Deficit", "No automated ticket creation existed, which held back process maturity and metric collection."],
          ],
        },
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "Documentation and communication: current situation",
          caption: "The existing component documentation was severely deficient.",
          columns: ["Challenge", "What it looked like"],
          rows: [
            ["Documentation Deficiencies", "Documentation was outdated, and it had no usage guidance at all."],
            ["Missing Core Content", "Usage guidelines (when to use and when not to), definitions of component types and states, and detailed component anatomy were not documented."],
          ],
        },
      ],
    },
    solution: {
      lede:
        "The solution ran across all four areas. Some changes were immediate, such as a plugin request in the first week. Others were structural, such as the token architecture and the Slackbot. The outcome the write-up describes is one source of truth for designers and engineers, with the process written down where people already work.",
      media: [
        {
          kind: "table",
          wide: true,
          textual: true,
          title: "What I did, and what it changed",
          caption: "Every action from the write-up, grouped by area, with the result the write-up gives for it.",
          columns: ["Area", "Action", "Result"],
          rows: [
            ["Handoff", "Requested a technical specification tool as a Figma plugin in the first week", "Simplified documentation for engineering teams"],
            ["Handoff", "Standardised, clear specifications for new features", "Teams ship in days instead of weeks"],
            ["Handoff", "Reduced rework and duplication across cross-functional teams", "Lower design and development costs; better turnaround time (TAT)"],
            ["Handoff", "Embedded all technical documentation in the Figma files", "A single source of truth; design–engineering miscommunication removed"],
            ["Handoff", "Moved developer support from public group channels to direct 1:1 communication", "Faster, more focused issue resolution"],
            ["Handoff", "Added developer notes on the design files for complex interactions and technical requirements", "Clearer implementation"],
            ["Handoff", "Involved developers early and continuously in design", "Real-time technical feedback, feasible designs, less late-stage rework"],
            ["Components and tokens", "Established a hierarchical token architecture: base, semantic and component-specific levels", "Consistency and modularity"],
            ["Components and tokens", "Streamlined the tokenization pipeline", "Value leakage between design and development reduced; design intent carried into code"],
            ["Components and tokens", "Categorised and scoped the colour palette by use, for example limiting colours for text", "A 100% improvement in critical consistency metrics (text, background, borders, icons) within one quarter"],
            ["Components and tokens", "Wrote comprehensive design guidelines on component creation and maintenance", "Best practice available to everyone"],
            ["Components and tokens", "Ran internal demos and training when new components were released", "Proper adoption and use"],
            ["Components and tokens", "Encouraged designers to join the bi-weekly Design System drop hour", "A 15% increase in designer participation"],
            ["Support", "Built a custom Slackbot that captures support queries through a standard GUI form", "Support requests are standardised"],
            ["Support", "Connected the Slackbot to ticket tracking", "Formal tickets created and tracked automatically"],
            ["Documentation", "Formally introduced mandated technical documentation for the first time", "Engineering-ready specifications"],
            ["Documentation", "Used the Figma Specs plugin to generate specs automatically: anatomy, visual spacing maps, properties overview", "Specs stay with the component"],
            ["Documentation", "Rebuilt component pages: clear labels, nested components marked as local for DS design use, real-world examples, integrated specs", "A consistent page structure for every component"],
          ],
        },
      ],
      decisions: [
        {
          title: "Plug the handoff gap first",
          body: "A technical specification tool was requested in the first week, and developer notes and early developer involvement followed. That cut the meetings and the lost information.",
          cost: "It relies on the team adopting the tool and the habit of early involvement.",
        },
        {
          title: "Put the source of truth inside Figma",
          body: "Technical documentation, specs and developer notes live in the Figma files, so there is one place to look.",
          cost: "The Figma files have to be kept current.",
        },
        {
          title: "Set token and colour rules before tooling",
          body: "Base, semantic and component token levels, plus a colour palette scoped by use, came before the wider rollout of components.",
          cost: "Designers have fewer free colour choices.",
        },
        {
          title: "Move support into a tracked channel",
          body: "Requests come through a standard GUI form in Slack and become tracked tickets, so each one has an owner and a record.",
          cost: "Support now depends on the Slackbot and the ticket tool being maintained.",
        },
        {
          title: "Mandate documentation for every component",
          body: "Technical documentation became part of the Design System workflow for the first time, with one page structure for every component.",
          cost: "Every component needs its documentation maintained alongside it.",
        },
      ],
    },
    impact: {
      lede:
        "The results in the write-up are about speed, consistency and how the team works together. They are the author’s own figures.",
      metrics: [
        { value: "100%", label: "Visual consistency", note: "Text, background, border and icon colours, in one quarter" },
        { value: "+15%", label: "Designer participation", note: "In the bi-weekly Design System drop hour" },
        { value: "Days", label: "Feature release speed", note: "Releases in days, not weeks, with standard specs" },
        { value: "1:1", label: "Developer support", note: "Moved from public group channels to direct messages" },
      ],
      notMeasured:
        "Not measured in the write-up: the number of support tickets, development turnaround time (TAT), and the rework saved. TODO: add these figures if they exist.",
    },
  },

  // ── Tool 01 ─────────────────────────────────────────
  {
    slug: "ai-figma-linting-plugin",
    index: "01",
    category: "tool",
    title: "AI-Powered Figma Linting Plugin",
    shortTitle: "Figma Linter",
    summary:
      "A Figma plugin, built with Cursor and Claude, that catches detached components and raw HEX values before they reach engineering.",
    role: "Lead Product Designer · Plugin author",
    timeline: "8 weeks · 2026",
    stack: ["Figma Plugin API", "TypeScript", "Cursor", "Claude", "Design Tokens"],
    visual: "lint",
    size: "base",
    problem: {
      lede:
        "Design-system drift starts small: one detached button, one hard-coded hex. Across 10+ product teams it compounds into hundreds of untracked variants that engineering rebuilds from scratch.",
      points: [
        {
          title: "Silent detachment",
          body: "Designers detached components to make quick tweaks. Nothing in Figma flagged it, so variants multiplied unseen.",
        },
        {
          title: "Raw values everywhere",
          body: "Fills and strokes used raw HEX instead of variables, breaking theming and making token migrations manual.",
        },
        {
          title: "Review didn’t scale",
          body: "The DS team audited files by hand. With 130+ stakeholders, reviews became the bottleneck. TODO: add audit-hours figure.",
        },
      ],
    },
    solution: {
      lede:
        "A linter that runs inside Figma, explains every issue in plain language and offers a one-click fix that maps the raw value back to the nearest token.",
      media: [
        {
          kind: "code",
          title: "Rule: no-raw-fill",
          caption: "Each rule is a small pure function. The AI layer only suggests fixes; it never edits without a click.",
          lang: "ts",
          code: `export const noRawFill: Rule = (node) => {
  if (!("fills" in node)) return [];
  return node.fills
    .filter((f) => f.type === "SOLID" && !f.boundVariables?.color)
    .map((f) => ({
      id: "no-raw-fill",
      node: node.id,
      message: \`Raw \${toHex(f.color)} — use a color token\`,
      fix: nearestToken(f.color, tokens.color),
    }));
};`,
        },
        {
          kind: "ui",
          title: "Plugin panel",
          caption: "TODO: replace with a screenshot of the lint panel, issue list on the left and the token fix preview on the right.",
        },
      ],
      decisions: [
        {
          title: "Deterministic rules first, AI second",
          body: "Detection is rule-based and testable. Claude is used only to rank token suggestions and write the explanation.",
        },
        {
          title: "Built with Cursor in the loop",
          body: "Cursor scaffolded the plugin and the rule tests, which let a designer ship a production plugin without a dedicated engineer.",
        },
        {
          title: "Fix, don’t just flag",
          body: "Every issue comes with an action. A linter that only complains gets uninstalled.",
        },
      ],
    },
    impact: {
      lede: "The plugin moved governance from after-the-fact review to the moment of design.",
      metrics: [
        { value: "100+", label: "Components governed", note: "Covered by detachment checks" },
        { value: "0", label: "Raw HEX at handoff", note: "TODO: confirm over the last quarter" },
        { value: "−30%", label: "QA cycles", note: "Fewer visual bugs filed after handoff" },
      ],
    },
  },

  // ── Tool 02 ─────────────────────────────────────────
  // Source: turbo-ui-mcp-skills (ai-loader.md, ai-mcp-contract.md, ai-skills/, ai-rules/,
  // generated/ snapshot synced 12 Jun 2026).
  {
    slug: "turbo-ui-mcp-workflows",
    index: "02",
    category: "tool",
    title: "Turbo UI MCP & Agent Skills",
    shortTitle: "Turbo UI · MCP",
    summary:
      "An MCP server and a set of agent skills that let designers, developers and PMs prompt Cars24 screens built only from Turbo UI components and tokens, in Figma or in running code.",
    role: "Lead Product Designer · MCP and skill author",
    timeline: "Ongoing · 2026",
    stack: ["Model Context Protocol", "Agent skills", "Turbo UI (@cspl)", "Tailwind v4 tokens", "Figma"],
    visual: "mcp",
    size: "base",
    problem: {
      lede:
        "AI tools can draw a screen in seconds, but not a Cars24 screen. And the people with the most ideas to try, PMs and engineers included, were the least likely to know the design system well enough to build with it.",
      points: [
        {
          title: "Generic output is off-system",
          body: "Turbo UI uses its own numeric scale: gap-80 is 0.5rem. A model that assumes Tailwind’s defaults produces spacing, colors and components that do not exist here.",
        },
        {
          title: "The system needed an expert",
          body: "Choosing the right component and props meant knowing the library. Anyone else waited for a designer or guessed.",
        },
        {
          title: "Trying an idea meant setup",
          body: "Before the MCP server, working with the system started with cloning a repo and installing a toolchain, which rules out most non-engineers.",
        },
      ],
    },
    solution: {
      lede:
        "A hosted MCP server exposes the design system as tools an agent can call. A loader file routes each request into a task profile, skills define the workflow, and hard rules decide what the agent may never do. The user can ask for a Figma design or for running code, then raise a PR for review.",
      media: [
        {
          kind: "route",
          title: "Required tool sequence",
          tag: "tool calls",
          caption:
            "Every delivery follows this order. The agent may not skip validation, and it must report a missing component or token instead of guessing.",
          steps: [
            { token: "get_design_rules(profile)", via: "load hard rules first" },
            { token: "search_components(query)", via: "reuse before custom UI" },
            { token: "get_component_api(slug)", via: "for every component used" },
            { token: "search_tokens(query)", via: "no hardcoded values" },
            { token: "validate_design_output(content, profile)" },
          ],
        },
        {
          kind: "route",
          title: "From prompt to pull request",
          tag: "workflow",
          caption:
            "Two outputs from the same rules. Designing in Figma needs only the MCP server; runnable code on localhost also needs the Turbo UI repo.",
          steps: [
            { token: "Prompt from a designer, developer or PM", via: "agent reads turbo-ui://docs/ai-loader" },
            { token: "Task profile + skills + hard rules", via: "components and tokens resolved over MCP" },
            { token: "Figma design  |  running code", via: "validated, with a receipt" },
            { token: "Pull request for code review" },
          ],
        },
        {
          kind: "table",
          title: "What the server exposes",
          caption: "17 tools in three groups, plus five read-only resources such as the component catalog and token reference.",
          columns: ["Group", "Tools", "Example"],
          rows: [
            ["Discovery", "6", "recommend_component(intent)"],
            ["Tokens and icons", "8", "resolve_token(token)"],
            ["Rules and validation", "3", "check_tokens(text)"],
          ],
        },
        {
          kind: "table",
          title: "Task profiles",
          caption: "The loader picks one profile per request and loads only the skills and rules that profile needs.",
          columns: ["Profile", "Docs loaded"],
          rows: [
            ["New screen from prompt", "8"],
            ["New or reworked form flow", "7"],
            ["Component from design", "6"],
            ["Design QA / parity audit", "5"],
          ],
        },
        {
          kind: "code",
          title: "Connecting a client",
          caption: "One entry in any MCP client. No clone is needed for prompt-based design work. Host name removed here.",
          lang: "json",
          code: `{
  "mcpServers": {
    "turbo-ui": {
      "type": "http",
      "url": "https://<internal-host>/mcp"
    }
  }
}`,
        },
        {
          kind: "code",
          title: "Final validation receipt",
          caption: "Every final response ends with this receipt, so a reviewer can see what was checked and what was assumed.",
          lang: "fields",
          code: `taskProfile
componentsUsed
componentApisChecked
tokensUsed
figmaMetadataUsed        // yes/no, plus missing coverage
validationResult         // pass/fail, remaining warnings
unsupportedAssumptions   // explicit list, or none`,
        },
        {
          kind: "ui",
          wide: true,
          title: "A prompted screen",
          caption: "TODO: add a screenshot or short recording of a screen generated through the MCP server, in Figma and as running code.",
        },
      ],
      decisions: [
        {
          title: "Snapshots, not live Figma calls",
          body: "The agent reads generated snapshots of the repo, and warns when the snapshot is more than seven days old.",
          cost: "The snapshot can lag behind Figma until it is regenerated.",
        },
        {
          title: "Stop instead of guess",
          body: "If a component API or token cannot be resolved, or validation still fails after one fix, the agent stops and reports the blocker.",
          cost: "More blocked runs while coverage is incomplete.",
        },
        {
          title: "Hosted over HTTP, no clone",
          body: "A PM can connect from any MCP client and start prompting without a local toolchain.",
          cost: "Runnable localhost output still needs the repo cloned.",
        },
        {
          title: "Only source-backed component APIs",
          body: "The server exposes 46 components whose APIs are generated from source, so props are never inferred from how something looks.",
          cost: "227 of 273 component directories are not exposed yet.",
        },
        {
          title: "Twelve pre-ship gates",
          body: "Generated code must pass checks for tokens, icons, component sources, rendered primitives and accessibility before delivery.",
          cost: "Slower than raw generation; that is the trade.",
        },
      ],
    },
    impact: {
      lede:
        "The aim is that anyone at Cars24 can go from a prompt to an on-system prototype and then a reviewable PR, without waiting on a design-system expert. This is what exists today.",
      metrics: [
        { value: "17", label: "MCP tools", note: "Discovery, tokens and icons, rules and validation" },
        { value: "46", label: "Components exposed", note: "APIs generated from source" },
        { value: "897", label: "Icons searchable", note: "With names and sizes" },
        { value: "4", label: "Task profiles", note: "18 skill and rule documents behind them" },
      ],
      notMeasured:
        "Not measured yet: time from prompt to PR, validation pass rate and number of people using it. The 10x speed goal is a target, not a result. TODO: add numbers from a pilot.",
    },
  },

  // ── Tool 03 ─────────────────────────────────────────
  {
    slug: "automated-ds-support-ecosystem",
    index: "03",
    category: "tool",
    title: "Automated DS Support Ecosystem",
    shortTitle: "DS Support Ops",
    summary:
      "A GUI Slackbot feeding a Google Sheets-to-Linear triage pipeline, so design-system requests are captured, routed and tracked automatically.",
    role: "Lead Product Designer · Service design + automation",
    timeline: "2 days · 2026",
    stack: ["Slack Block Kit", "Google Sheets", "Linear API", "Apps Script"],
    visual: "pipeline",
    size: "base",
    problem: {
      lede:
        "DS support ran through DMs and scattered threads. Requests were lost, duplicated, or answered by whoever happened to see them.",
      points: [
        {
          title: "No intake",
          body: "130+ partners asked for help in a dozen channels with no shared format.",
        },
        {
          title: "No triage",
          body: "Bugs, component requests and questions all landed in the same pile.",
        },
        {
          title: "No visibility",
          body: "Leadership couldn’t see demand, so the roadmap was built on anecdotes.",
        },
      ],
    },
    solution: {
      lede:
        "A structured Slack form captures each request in one step. A Sheets pipeline scores and routes requests into Linear, so the DS team works from one queue.",
      media: [
        {
          kind: "diagram",
          title: "Intake → Triage → Delivery",
          caption: "TODO: replace with the flow diagram. Slack modal → Sheets scoring → Linear issue → Slack status reply.",
        },
        {
          kind: "ui",
          title: "Slackbot modal",
          caption: "TODO: replace with a screenshot of the Block Kit request form.",
        },
      ],
      decisions: [
        {
          title: "Meet people in Slack",
          body: "Nobody had to learn a new tool to ask for help. The form lives where the questions already were.",
        },
        {
          title: "Score, then route",
          body: "Sheets acted as a lightweight rules engine the DS team could edit without a deploy.",
        },
      ],
    },
    impact: {
      lede: "Support became a measurable service instead of a background task.",
      metrics: [
        { value: "130+", label: "Partners served", note: "Through one intake" },
        { value: "100%", label: "Requests tracked", note: "Every ask has a ticket" },
        { value: "2 days", label: "Median response time", note: "Add before/after figure" },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacent(slug: string) {
  const i = projects.findIndex((p) => p.slug === slug);
  return {
    prev: i > 0 ? projects[i - 1] : undefined,
    next: projects[(i + 1) % projects.length],
  };
}

export function inCategory(category: ProjectCategory) {
  return projects.filter((p) => p.category === category);
}
