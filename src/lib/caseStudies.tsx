// Case-study data shared between the server page and the client layout component.
// Kept out of the "use client" module so the server can import it directly.
import { TrendingUp, Check, Database, Layers, Clock, Zap } from "lucide-react";

export interface Metric {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

export interface SpecItem {
  label: string;
  value: string;
  tokenRef?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  company: string;
  logo?: React.ReactNode;
  metrics: Metric[];
  specs: SpecItem[];
  tokens: string[];
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  links?: {
    live?: string;
    github?: string;
    figma?: string;
    caseStudy?: string;
  };
  tags?: string[];
  featured?: boolean;
}

const metricIcons: Record<string, React.ReactNode> = {
  velocity: <TrendingUp className="w-4 h-4" />,
  quality: <Check className="w-4 h-4" />,
  cost: <Database className="w-4 h-4" />,
  adoption: <Layers className="w-4 h-4" />,
  time: <Clock className="w-4 h-4" />,
  automation: <Zap className="w-4 h-4" />,
};

export function createMetric(label: string, value: string, key: string): Metric {
  return { label, value, icon: metricIcons[key], trend: key as Metric["trend"] };
}

export const caseStudies: CaseStudy[] = [
  {
    id: "cars24",
    title: "Cars24 Design System",
    subtitle: "AI-assisted workflows, Figma plugins, zero-downtime migration for B2B dashboards",
    role: "Lead Product Designer — Design Systems",
    period: "May 2026 — Present",
    company: "Cars24",
    metrics: [
      createMetric("Docs Cost", "−80%", "cost"),
      createMetric("QA Cycles", "−30%+", "quality"),
      createMetric("Components", "100+", "adoption"),
      createMetric("Stakeholders", "130+", "velocity"),
    ],
    specs: [
      { label: "Token Pipeline", value: "Figma Variables → Style Dictionary → Multi-platform", tokenRef: "tokens.brand" },
      { label: "Component Library", value: "React Native + Web (Storybook)", tokenRef: "components.ds" },
      { label: "Governance", value: "Custom Figma Linter Plugin", tokenRef: "plugin.linter" },
      { label: "Handoff", value: "EightShapes Specs + Visual Inspection", tokenRef: "specs.handoff" },
      { label: "Migration", value: "Zero-downtime, parallel tracks", tokenRef: "process.migration" },
      { label: "AI Workflow", value: "MCP-constrained prompt-to-design", tokenRef: "ai.mcp" },
    ],
    tokens: [
      "color-brand-primary", "color-brand-secondary", "color-bg-0", "color-bg-100",
      "space-1", "space-2", "space-4", "font-display", "font-mono",
      "radius-default", "shadow-default", "shadow-focus"
    ],
    challenges: [
      "Legacy B2B dashboards with inconsistent UI across 10+ products",
      "Design-dev handoff friction causing 30%+ QA cycles",
      "No centralized token system — hardcoded values everywhere",
      "Team of 130+ stakeholders with no governance process",
    ],
    solutions: [
      "Built Figma Variables + Style Dictionary pipeline for multi-platform tokens",
      "Created custom Figma linter plugin enforcing token usage & component attachment",
      "Deployed Storybook to public URL as single source of truth",
      "Implemented EightShapes Specs for standardized, token-annotated handoffs",
      "Designed MCP-constrained AI workflow for prompt-to-design generation",
      "Executed zero-downtime migration running parallel to active roadmaps",
    ],
    outcomes: [
      "80% reduction in documentation costs via platform migration",
      "30%+ reduction in QA cycles through spec automation",
      "100+ components governed with automated linting",
      "AI-assisted workflow adopted by designers & PMs for rapid prototyping",
    ],
    links: {
      live: "https://cars24.design",
      github: "https://github.com/cars24/design-system",
      figma: "https://figma.com/@cars24/design-system",
      caseStudy: "#",
    },
    tags: ["Design Systems", "Figma Plugins", "AI/ML", "React Native", "Storybook", "MCP"],
  },
  {
    id: "tide",
    title: "Tide Design System Refactor",
    subtitle: "Consolidated 100+ components to 50, 80% docs cost reduction, automated intake",
    role: "Sr. Product Designer — Design Systems",
    period: "Jun 2023 — Jan 2026",
    company: "Tide",
    metrics: [
      createMetric("Components", "100→50", "velocity"),
      createMetric("Docs Cost", "−80%", "cost"),
      createMetric("Intake Time", "−60%", "time"),
      createMetric("Partners", "130+", "adoption"),
    ],
    specs: [
      { label: "Refactor", value: "Figma Variables/Variants migration", tokenRef: "migration.variants" },
      { label: "Intake", value: "Slack–Jira automated workflow", tokenRef: "automation.intake" },
      { label: "Documentation", value: "Migrated to lower-cost platform", tokenRef: "platform.docs" },
      { label: "Handoff", value: "EightShapes Specs integration", tokenRef: "specs.handoff" },
      { label: "Linting", value: "Cursor AI-powered Figma plugin", tokenRef: "plugin.linter" },
      { label: "Governance", value: "SOPs for contribution & release", tokenRef: "process.gov" },
    ],
    tokens: [
      "color-brand-primary", "color-bg-100", "color-border", "space-2", "space-4",
      "font-mono", "radius-default", "shadow-default"
    ],
    challenges: [
      "100+ components with duplicate variants causing maintenance burden",
      "Manual Slack/Jira intake for DS queries creating bottlenecks",
      "Documentation platform costs unsustainable at scale",
      "Inconsistent handoffs leading to visual/functional discrepancies",
    ],
    solutions: [
      "Refactored libraries using Figma Variables/Variants — 100→50 components",
      "Automated Slack–Jira intake with SOPs reducing handoff churn",
      "Migrated docs to cost-effective platform saving 80% spend",
      "Integrated EightShapes Specs standardizing designer-dev handoffs",
      "Built AI-assisted linting plugin for real-time design validation",
    ],
    outcomes: [
      "50% component reduction with improved adoption & spec accuracy",
      "80% documentation cost reduction with better discoverability",
      "60% faster intake resolution unblocking release cycles",
      "30%+ QA cycle reduction via standardized handoffs",
    ],
    links: {
      live: "https://tide.design",
      github: "https://github.com/tide/design-system",
      figma: "https://figma.com/@tide/design-system",
      caseStudy: "#",
    },
    tags: ["Design Systems", "Figma Variables", "Automation", "EightShapes", "AI", "Governance"],
  },
  {
    id: "jupiter",
    title: "Jupiter Money 'Europa' Design System",
    subtitle: "Built from 0 to 30 components using Atomic Design, token pipeline automation",
    role: "Sr. Product Designer — Design Systems",
    period: "Nov 2021 — May 2023",
    company: "Jupiter Money",
    metrics: [
      createMetric("Components", "0→30", "velocity"),
      createMetric("Coverage", "75%+", "adoption"),
      createMetric("Back-and-forth", "−25%", "time"),
      createMetric("CSAT/NPS", "Improved", "quality"),
    ],
    specs: [
      { label: "Foundation", value: "Figma Tokens + Style Dictionary pipeline", tokenRef: "pipeline.tokens" },
      { label: "Methodology", value: "Atomic Design (atoms→molecules→organisms)", tokenRef: "method.atomic" },
      { label: "Themes", value: "Auto-sync light/dark/brand themes", tokenRef: "themes.auto" },
      { label: "Search", value: "Designed Jupiter App Search framework", tokenRef: "feature.search" },
      { label: "Email", value: "Organization-wide template system", tokenRef: "system.email" },
      { label: "Coverage", value: "75%+ journey coverage at launch", tokenRef: "metric.coverage" },
    ],
    tokens: [
      "color-brand-primary", "color-bg-0", "color-bg-100", "color-fg-0",
      "space-1", "space-2", "space-3", "font-display", "font-mono",
      "radius-default", "shadow-default"
    ],
    challenges: [
      "No existing design system — starting from zero",
      "Inconsistent UI across app journeys",
      "Design-dev back-and-forth slowing delivery",
      "Need for multi-theme support (light/dark/brand)",
    ],
    solutions: [
      "Established 'Europa' DS with Figma Tokens + Style Dictionary pipeline",
      "Built 30 components using Atomic Design methodology",
      "Automated theme sync reducing design-dev iteration by 25%",
      "Designed Search framework and email template system",
    ],
    outcomes: [
      "75%+ component coverage across key journeys at launch",
      "Improved CSAT/NPS and release consistency",
      "Foundation for scalable design system growth",
    ],
    links: {
      live: "https://jupiter.money",
      github: "https://github.com/jupiter-money/design-system",
      figma: "https://figma.com/@jupiter/europa",
      caseStudy: "#",
    },
    tags: ["Design Systems", "Atomic Design", "Style Dictionary", "Theming", "Figma Tokens"],
  },
  {
    id: "paytm",
    title: "Paytm Dashboard & Design System",
    subtitle: "Analytics redesign for millions of merchants, BEM/SCSS architecture, DS implementation",
    role: "Product Designer & Developer",
    period: "Jun 2018 — Sep 2021",
    company: "Paytm",
    metrics: [
      createMetric("Merchants", "Millions", "adoption"),
      createMetric("TAT Reduction", "Significant", "velocity"),
      createMetric("Teams Using DS", "Multiple", "adoption"),
      createMetric("Code Quality", "SCSS Linting", "quality"),
    ],
    specs: [
      { label: "Analytics", value: "Redesigned real-time transaction dashboard", tokenRef: "feature.analytics" },
      { label: "CSS Architecture", value: "BEM methodology + Atomic CSS", tokenRef: "arch.css" },
      { label: "Design System", value: "Dashboard Web Components library", tokenRef: "lib.dashboard" },
      { label: "Quality", value: "SCSS Linting + structured handoffs", tokenRef: "quality.lint" },
      { label: "Structure", value: "Full dashboard CSS architecture setup", tokenRef: "arch.structure" },
      { label: "Feedback", value: "Atomic CSS for Feedback Engine", tokenRef: "engine.feedback" },
    ],
    tokens: [
      "color-brand-primary", "color-bg-0", "color-bg-100", "color-fg-0",
      "space-1", "space-2", "font-mono", "radius-default"
    ],
    challenges: [
      "Analytics dashboard used by millions of merchants needed redesign",
      "Inconsistent CSS across teams causing maintenance issues",
      "No shared component library — duplicated effort",
      "Handoff cycles slow due to lack of standards",
    ],
    solutions: [
      "Redesigned Analytics feature for real-time transactions & success rates",
      "Implemented BEM methodology + Atomic CSS for scalable architecture",
      "Built Dashboard Web Components design system for multiple teams",
      "Established SCSS Linting improving code quality & handoff cycles",
    ],
    outcomes: [
      "Reduced TAT for new module development significantly",
      "Multiple Paytm domain teams adopted the design system",
      "Improved handoff cycles through linting & standards",
      "Foundation for consistent merchant-facing products",
    ],
    links: {
      live: "https://dashboard.paytm.com",
      github: "#",
      figma: "#",
      caseStudy: "#",
    },
    tags: ["Product Design", "Frontend", "BEM", "SCSS", "Design Systems", "Analytics"],
  },
];
