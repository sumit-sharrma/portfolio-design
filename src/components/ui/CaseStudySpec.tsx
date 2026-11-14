"use client";

import { cn } from "@/lib/utils";
import { BitmapText } from "./BitmapText";
import { PixelButton } from "./PixelButton";
import { 
  ChevronRight, 
  ChevronDown, 
  ExternalLink, 
  GitBranch,
  PenTool,
  Copy,
  Check,
  AlertTriangle,
  Clock,
  TrendingUp,
  Database,
  Layers,
  Code,
  Zap,
} from "lucide-react";

interface Metric {
  label: string;
  value: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
}

interface SpecItem {
  label: string;
  value: string;
  tokenRef?: string;
}

interface CaseStudySpecProps {
  title: string;
  subtitle?: string;
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

export function CaseStudySpec({
  title,
  subtitle,
  role,
  period,
  company,
  logo,
  metrics,
  specs,
  tokens,
  challenges,
  solutions,
  outcomes,
  links,
  tags = [],
  featured = false,
}: CaseStudySpecProps) {
  return (
    <article className={cn("card-pixel relative overflow-hidden", featured && "ring-2 ring-[var(--color-primary)]")}>
      {/* Header */}
      <header className="mb-8 pb-6 border-b border-[var(--color-border)]">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            {logo && (
              <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-[var(--color-bg-200)] border border-[var(--color-border)]">
                {logo}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2 text-[var(--color-fg-200)] text-mono-xs mb-1">
                <span className="px-2 py-0.5 bg-[var(--color-bg-200)] border border-[var(--color-border)]">{company}</span>
                <span>·</span>
                <span className="px-2 py-0.5 bg-[var(--color-bg-200)] border border-[var(--color-border)]">{period}</span>
              </div>
              <BitmapText size="xl" color="fg-0" className="leading-tight">
                {title}
              </BitmapText>
              {subtitle && (
                <p className="mt-2 text-[var(--color-fg-100)] text-mono-base max-w-2xl">{subtitle}</p>
              )}
            </div>
          </div>
          
          {links && (
            <div className="flex flex-wrap gap-2">
              {links.live && (
                <PixelButton variant="ghost" size="sm" asChild>
                  <a href={links.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live</span>
                  </a>
                </PixelButton>
              )}
              {links.github && (
                <PixelButton variant="ghost" size="sm" asChild>
                  <a href={links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <GitBranch className="w-3.5 h-3.5" />
                    <span>Code</span>
                  </a>
                </PixelButton>
              )}
              {links.figma && (
                <PixelButton variant="ghost" size="sm" asChild>
                  <a href={links.figma} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <PenTool className="w-3.5 h-3.5" />
                    <span>Figma</span>
                  </a>
                </PixelButton>
              )}
              {links.caseStudy && (
                <PixelButton variant="primary" size="sm" asChild>
                  <a href={links.caseStudy} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span>Case Study</span>
                  </a>
                </PixelButton>
              )}
            </div>
          )}
        </div>

        {/* Role & Tags */}
        <div className="flex flex-wrap items-center gap-3 text-mono-sm">
          <div className="flex items-center gap-2 text-[var(--color-fg-200)]">
            <span>Role:</span>
            <span className="font-medium text-[var(--color-fg-0)]">{role}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag) => (
              <span
                key={tag}
                className="badge-pixel"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Metrics */}
      {metrics.length > 0 && (
        <section className="mb-8">
          <BitmapText size="sm" color="primary" className="mb-4">Metrics</BitmapText>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <div
                key={i}
                className={cn(
                  "card-pixel p-4 text-center",
                  featured && "bg-[var(--color-brand-300)] text-[var(--color-bg-0)]"
                )}
              >
                {metric.icon && (
                  <div className={cn(
                    "flex justify-center mb-2",
                    featured ? "text-[var(--color-bg-0)]" : "text-[var(--color-primary)]"
                  )}>
                    {metric.icon}
                  </div>
                )}
                <BitmapText size="lg" color={featured ? "fg-0" : "primary"} className="mb-1">
                  {metric.value}
                </BitmapText>
                <p className={cn(
                  "text-mono-sm",
                  featured ? "text-[var(--color-bg-0)]/80" : "text-[var(--color-fg-200)]"
                )}>
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Specs */}
      {specs.length > 0 && (
        <section className="mb-8">
          <BitmapText size="sm" color="primary" className="mb-4">Spec Sheet</BitmapText>
          <div className="overflow-x-auto">
            <table className="spec-table">
              <thead>
                <tr>
                  <th className="w-1/3">Property</th>
                  <th>Value</th>
                  <th className="w-24"></th>
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={i}>
                    <td className="font-medium text-[var(--color-fg-200)]">{spec.label}</td>
                    <td className="font-code text-[var(--color-fg-0)]">{spec.value}</td>
                    <td>
                      {spec.tokenRef && (
                        <PixelButton
                          variant="ghost"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(spec.tokenRef!)}
                          aria-label={`Copy token reference: ${spec.tokenRef}`}
                        >
                          <Code className="w-3.5 h-3.5" />
                        </PixelButton>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Tokens Used */}
      {tokens.length > 0 && (
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <BitmapText size="sm" color="primary">Tokens Used</BitmapText>
            <PixelButton variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(tokens.join(", "))}>
              <Copy className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Copy All</span>
            </PixelButton>
          </div>
          <div className="flex flex-wrap gap-2">
            {tokens.map((token) => (
              <span
                key={token}
                className="badge-pixel-primary cursor-pointer hover:bg-[var(--color-brand-200)] transition-colors duration-[80ms]"
                onClick={() => navigator.clipboard.writeText(token)}
                title={`Copy: ${token}`}
              >
                {token}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Challenges / Solutions / Outcomes */}
      <div className="grid md:grid-cols-3 gap-6">
        {challenges.length > 0 && (
          <section>
            <BitmapText size="sm" color="accent" className="mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Challenges
            </BitmapText>
            <ul className="space-y-2 text-[var(--color-fg-100)] text-mono-sm">
              {challenges.map((challenge, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-accent-0)] mt-1">→</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {solutions.length > 0 && (
          <section>
            <BitmapText size="sm" color="primary" className="mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Solutions
            </BitmapText>
            <ul className="space-y-2 text-[var(--color-fg-100)] text-mono-sm">
              {solutions.map((solution, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-primary)] mt-1">→</span>
                  <span>{solution}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {outcomes.length > 0 && (
          <section>
            <BitmapText size="sm" color="warning" className="mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Outcomes
            </BitmapText>
            <ul className="space-y-2 text-[var(--color-fg-100)] text-mono-sm">
              {outcomes.map((outcome, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-[var(--color-warning-0)] mt-1">→</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

// Helper to create metric objects
export function createMetric(
  label: string,
  value: string,
  type: keyof typeof metricIcons = "velocity"
): Metric {
  return { label, value, icon: metricIcons[type] };
}