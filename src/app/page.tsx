import { HeroSection } from "@/components/layout/HeroSection";
import { caseStudies } from "@/lib/caseStudies";
import Link from "next/link";

// Old-theme data used an em dash as a separator; the register reads it as a word.
const toRange = (s: string) => s.toLowerCase().split(/\s*—\s*/).join(" to ");
const toPhrase = (s: string) => s.split(/\s*—\s*/).join(", ");

const writing = [
  {
    title: "design-token-pipeline",
    args: "figma → style dictionary → multi-platform",
    line: "oct 2026",
    excerpt: "Figma, Style Dictionary, multi-platform, in production.",
  },
  {
    title: "zero-downtime-migration",
    args: "100+ components, 10 products, parallel tracks",
    line: "sep 2026",
    excerpt: "Zero-downtime design system migration without blocking releases.",
  },
  {
    title: "ai-constrained-generation",
    args: "mcp-constrained agents, approved tokens only",
    line: "aug 2026",
    excerpt: "AI-constrained design generation from approved tokens.",
  },
  {
    title: "figma-linter-plugin",
    args: "token usage enforcement, detached component detection",
    line: "jul 2026",
    excerpt: "Figma linter plugin enforcing token usage and attachment.",
  },
  {
    title: "eightshapes-specs",
    args: "standardized spec annotations, designer–developer handoff",
    line: "jun 2026",
    excerpt: "EightShapes Specs cutting QA cycles and visual discrepancies.",
  },
  {
    title: "slack-jira-intake",
    args: "automated intake, 130+ partners",
    line: "may 2026",
    excerpt: "Automated DS intake with Slack and Jira.",
  },
];

const readings = [
  {
    value: "−80%",
    struck: "100%",
    label: "docs cost",
    source: "cars24",
    note: "token pipeline migrated documentation to a lower-cost platform",
    time: "may 2026 to present",
  },
  {
    value: "−30%+",
    struck: "—",
    label: "qa cycles",
    source: "cars24",
    note: "eightshapes specs standardized designer–developer handoffs",
    time: "may 2026 to present",
  },
  {
    value: "100+",
    struck: "—",
    label: "components governed",
    source: "cars24",
    note: "automated figma linting enforces token usage and attachment",
    time: "may 2026 to present",
  },
  {
    value: "130+",
    struck: "—",
    label: "stakeholders served",
    source: "tide / cars24",
    note: "governance process across 10+ products",
    time: "2023 to present",
  },
];

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Readings — a drafting frame around the measured figures */}
      <section id="readings" aria-label="Readings" className="section bg-[var(--color-paper-2)]">
        <div className="container">
          <div className="section-head">
            <h2 className="mb-2">readings</h2>
            <p className="section-lede">What the instrument measured, kept as a record.</p>
          </div>
          <figure className="draft">
            <div className="draft-head">
              <span>measured</span>
              <span>cars24 / tide</span>
              <span>fig. 01 of 04</span>
            </div>

            <div className="draft-cells">
              {readings.map((r, i) => (
                <div key={r.label} className="draft-cell">
                  <div className="draft-cell-head">
                    <span>fig. {String(i + 1).padStart(2, "0")}</span>
                    <span className="draft-src">{r.source}</span>
                  </div>
                  <p className={`draft-old${r.struck === "—" ? "" : " is-struck"}`}>{r.struck === "—" ? "" : r.struck}</p>
                  <p className="figure">{r.value}</p>
                  <p className="draft-label">{r.label}</p>
                  <p className="draft-note">{r.note}</p>
                  <p className="draft-time">{r.time}</p>
                </div>
              ))}
            </div>

            <figcaption className="draft-foot">
              <span>source: caseStudies.tsx</span>
              <span>record, not forecast</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Work — leader-lined register */}
      <section id="work" aria-label="Work" className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="mb-2">work</h2>
            <p className="section-lede">Design systems built or refactored at scale.</p>
          </div>
          <ol className="register">
            {caseStudies.map((study, i) => (
              <li key={study.id} className="reg-item">
                <div className="reg-line">
                  <span className="reg-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="reg-name">{study.title}</span>
                  <span className="reg-leader" aria-hidden="true" />
                  <span className="reg-period">{toRange(study.period)}</span>
                </div>
                <p className="reg-note">{toPhrase(study.role)}</p>
                <p className="reg-note">{study.subtitle}</p>
              </li>
            ))}
          </ol>
          <div className="mt-6">
            <Link href="#contact" className="btn btn--primary">
              get in touch
            </Link>
          </div>
        </div>
      </section>

      {/* Writing — leader-lined register */}
      <section id="writing" aria-label="Writing" className="section bg-[var(--color-paper-2)]">
        <div className="container">
          <div className="section-head">
            <h2 className="mb-2">writing</h2>
            <p className="section-lede">Notes on design systems, token pipelines, and shipping.</p>
          </div>
          <ol className="register">
            {writing.map((article, i) => (
              <li key={article.title} className="reg-item">
                <div className="reg-line">
                  <span className="reg-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className="reg-name">{article.title}</span>
                  <span className="reg-leader" aria-hidden="true" />
                  <span className="reg-period">{article.line}</span>
                </div>
                <p className="reg-note">{article.args}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* About — session at size */}
      <section id="about" aria-label="About" className="section">
        <div className="container">
          <div className="section-head">
            <h2 className="mb-2">about</h2>
            <p className="section-lede">The session, typed once.</p>
          </div>
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="session p-6">
                <p className="prompt mb-2">$ cat about</p>
                <div className="space-y-2 text-[var(--color-ink-2)] text-[var(--text-md)] leading-relaxed">
                  <p>i’m sumit sharma, a product designer based in india with 10+ years across consumer and enterprise software.</p>
                  <p>i design design systems and platform ux that help teams build, evaluate, and scale consistent interfaces into reliable real-world products.</p>
                  <p>previously: cars24, tide, jupiter money, paytm.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="well p-6">
                <p className="text-[var(--color-muted)] text-[var(--text-xs)] mb-3">session diagram</p>
                <pre
                  className="mx-auto w-fit text-[var(--color-ink)] text-[var(--text-sm)] leading-none font-mono"
                  aria-hidden="true"
                >{`┌─────────┐     ┌─────────┐
│ design  │────▶│ systems │
└─────────┘     └─────────┘
     ▲               ▼
┌─────────┐     ┌─────────┐
│  ship   │◀────│  code   │
└─────────┘     └─────────┘`}</pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact — install line */}
      <section id="contact" aria-label="Contact" className="section bg-[var(--color-paper-2)]">
        <div className="container max-w-[42ch]">
          <div className="well p-6">
            <p className="prompt mb-2">$ curl -s https://sumitsharma.design | mail sumitsp04@gmail.com</p>
            <p className="text-[var(--color-ink-2)] text-[var(--text-md)] leading-relaxed mb-4">
              available for design-systems leadership, consulting, or senior IC
              roles, remote or hybrid, worldwide.
            </p>
            <Link href="mailto:sumitsp04@gmail.com" className="btn btn--primary">
              get in touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
