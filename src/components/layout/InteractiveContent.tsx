"use client";

import { BitmapText } from "@/components/ui/BitmapText";
import { PixelButton } from "@/components/ui/PixelButton";
import { CaseStudySpec } from "@/components/ui/CaseStudySpec";
import { caseStudies } from "@/lib/caseStudies";
import { CritterDivider } from "@/components/ui/CritterDivider";
import { CanvasPortrait } from "@/components/ui/CanvasPortrait";
import { StatusBar } from "@/components/ui/StatusBar";
import { 
  ChevronRight, 
  ExternalLink, 
  GitBranch,
  PenTool,
  Code, 
  Layers, 
  FileText,
  Mail,
  User,
  MessageSquare,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Terminal,
} from "lucide-react";
import Link from "next/link";

export { caseStudies };

export function InteractiveContent() {
  return (
    <>
      <CritterDivider />

      {/* Work Section */}
      <section id="work" className="section-pixel">
        <div className="container-pixel">
          <header className="mb-12 md:mb-16">
            <BitmapText size="xl" color="primary" className="mb-4">Selected Work</BitmapText>
            <p className="text-[var(--color-fg-100)] text-mono-base max-w-2xl">
              Four design systems built from scratch or refactored at scale. 
              Each case study includes specs, tokens used, challenges, solutions, and measurable outcomes.
            </p>
          </header>

          <div className="space-y-8">
            {caseStudies.map((study, index) => (
              <CaseStudySpec
                key={study.id}
                {...study}
                featured={index === 0}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <PixelButton variant="ghost" size="lg" asChild>
              <a href="/work" className="flex items-center gap-2 justify-center">
                <FileText className="w-4 h-4" />
                <span>View All Case Studies</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </PixelButton>
          </div>
        </div>
      </section>

      {/* Writing/Resources Section */}
      <section id="writing" className="section-pixel">
        <div className="container-pixel">
          <header className="mb-12 md:mb-16">
            <BitmapText size="xl" color="primary" className="mb-4">Writing & Resources</BitmapText>
            <p className="text-[var(--color-fg-100)] text-mono-base max-w-2xl">
              Deep dives on design system architecture, token pipelines, migration strategies, and governance.
            </p>
          </header>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Design Token Pipeline Architecture",
                excerpt: "How to build a Figma → Style Dictionary → Multi-platform pipeline that actually works in production.",
                tags: ["Tokens", "Style Dictionary", "Figma", "Automation"],
                link: "#",
              },
              {
                title: "Zero-Downtime Design System Migration",
                excerpt: "Running parallel tracks: migrating 100+ components across 10 products without blocking feature releases.",
                tags: ["Migration", "Governance", "Strategy", "Scale"],
                link: "#",
              },
              {
                title: "AI-Constrained Design Generation",
                excerpt: "Using Model Context Protocol (MCP) to constrain AI agents to approved tokens, components, and patterns.",
                tags: ["AI/ML", "MCP", "Figma", "Automation"],
                link: "#",
              },
              {
                title: "Figma Linter Plugin Development",
                excerpt: "Building a custom plugin that enforces token usage, prevents detached components, and catches legacy assets.",
                tags: ["Figma Plugin", "TypeScript", "Governance", "Quality"],
                link: "#",
              },
              {
                title: "EightShapes Specs for Handoff Standardization",
                excerpt: "How standardized spec annotations reduced QA cycles by 30%+ and eliminated visual discrepancies.",
                tags: ["Handoff", "EightShapes", "Process", "Quality"],
                link: "#",
              },
              {
                title: "Automated DS Intake with Slack & Jira",
                excerpt: "From manual triage to automated workflow: reducing response time from hours to minutes for 130+ partners.",
                tags: ["Automation", "Slack", "Jira", "Operations"],
                link: "#",
              },
            ].map((article, i) => (
              <article key={i} className="card-pixel group">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-200)] border border-[var(--color-border)] text-[var(--color-primary)] group-hover:text-[var(--color-brand-0)] transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <BitmapText size="base" color="fg-0" className="leading-tight group-hover:text-[var(--color-primary)] transition-colors">
                    {article.title}
                  </BitmapText>
                </div>
                <p className="text-[var(--color-fg-100)] text-mono-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {article.tags.map((tag) => (
                    <span key={tag} className="badge-pixel text-mono-xs">{tag}</span>
                  ))}
                </div>
                <PixelButton variant="ghost" size="sm" asChild className="w-full">
                  <a href={article.link} className="flex items-center justify-center gap-1 w-full">
                    <span>Read Article</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </a>
                </PixelButton>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <PixelButton variant="ghost" size="lg" asChild>
              <a href="/writing" className="flex items-center gap-2 justify-center">
                <FileText className="w-4 h-4" />
                <span>View All Articles</span>
                <ChevronRight className="w-4 h-4" />
              </a>
            </PixelButton>
          </div>
        </div>
      </section>

      <CritterDivider />

      {/* About/Contact Section */}
      <section id="about" className="section-pixel bg-[var(--color-bg-100)]">
        <div className="container-pixel max-w-4xl">
          <div className="about-grid">
            <div>
              <BitmapText size="xl" color="primary" className="mb-6">About</BitmapText>
              
              <div className="space-y-6 text-[var(--color-fg-100)] text-mono-base leading-relaxed">
                <p className="lead" style={{ fontSize: '1.06rem', marginBottom: '16px' }}>
                  I’m <span className="text-[var(--color-primary)] font-medium">Sumit Sharma</span>, a product designer based in India, with 10+ years of experience across consumer and enterprise software. I’ve shipped design systems for millions of users, as well as technical tools for AI, design infrastructure, and developer platforms.
                </p>
                <p className="lead soft" style={{ fontSize: '1.06rem', color: 'var(--color-fg-200)' }}>
                  I design <span className="text-[var(--color-primary)] font-medium">Design Systems</span> and <span className="text-[var(--color-primary)] font-medium">Platform UX</span> that help teams <span className="text-[var(--color-primary)] font-medium">build, evaluate, and scale</span> consistent interfaces into reliable real-world products.
                </p>
                <p>
                  My work sits at the intersection of <strong>design</strong> and <strong>code</strong> — 
                  building token pipelines (Figma Tokens → Style Dictionary), governance tooling 
                  (Figma linter plugins, automated intake), component libraries (React Native + Web, Storybook), 
                  and migration playbooks that scale across 130+ stakeholders.
                </p>
                <p>
                  Previously: <strong>Cars24</strong> (AI-assisted workflows, zero-downtime migration), 
                  <strong>Tide</strong> (100→50 component refactor, 80% docs cost reduction), 
                  <strong>Jupiter Money</strong> (built &lsquo;Europa&rsquo; DS from 0→30 components), 
                  <strong>Paytm</strong> (Analytics redesign for millions, BEM/SCSS architecture).
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-[var(--color-border)]">
                <BitmapText size="sm" color="primary" className="mb-4">Core Competencies</BitmapText>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Design Tokens", "Theming", "Figma Variables", "Style Dictionary",
                    "Storybook", "Governance", "Migration", "Spec Automation",
                    "React Native", "TypeScript", "CSS Architecture", "BEM",
                    "SCSS Linting", "Atomic Design", "EightShapes", "MCP/AI"
                  ].map((skill) => (
                    <span key={skill} className="badge-pixel">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="portrait-slot">
              <CanvasPortrait width={220} height={272} />
            </div>
          </div>

          {/* Contact Card */}
          <div className="mt-12 grid lg:grid-cols-2 gap-6">
            <div className="card-pixel">
              <BitmapText size="lg" color="primary" className="mb-6">Let’s Work Together</BitmapText>
              <p className="text-[var(--color-fg-100)] text-mono-base mb-6">
                Available for Design Systems leadership, consulting, or senior IC roles. 
                Based in India, open to remote/hybrid globally.
              </p>
              <div className="space-y-3">
                <PixelButton variant="primary" size="lg" className="w-full" asChild>
                  <a href="mailto:sumitsp04@gmail.com" className="flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    <span>sumitsp04@gmail.com</span>
                  </a>
                </PixelButton>
                <PixelButton variant="secondary" size="lg" className="w-full" asChild>
                  <a href="https://designerwhocode.com" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <ExternalLink className="w-5 h-5" />
                    <span>designerwhocode.com</span>
                  </a>
                </PixelButton>
                <PixelButton variant="ghost" size="lg" className="w-full" asChild>
                  <a href="https://github.com/sumitsp04" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                </PixelButton>
                <PixelButton variant="ghost" size="lg" className="w-full" asChild>
                  <a href="https://linkedin.com/in/sumitsharma" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                    <User className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                </PixelButton>
              </div>
            </div>

            {/* Quick Links */}
            <div className="card-pixel">
              <BitmapText size="sm" color="primary" className="mb-4">Quick Links</BitmapText>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { href: "#work", label: "Case Studies", icon: FileText },
                  { href: "/components", label: "Components", icon: Layers },
                  { href: "/writing", label: "Articles", icon: FileText },
                  { href: "https://github.com/sumitsp04", label: "GitHub", icon: GitBranch, external: true },
                  { href: "mailto:sumitsp04@gmail.com", label: "Email", icon: Mail, external: true },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-2 px-3 py-2 text-mono-sm text-[var(--color-fg-200)] hover:text-[var(--color-primary)] hover:bg-[var(--color-bg-200)] rounded-[4px] transition-colors duration-[80ms]"
                  >
                    <link.icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatusBar />
    </>
  );
}