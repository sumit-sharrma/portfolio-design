import Link from "next/link";
import { Mail, GitBranch, User } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="wordmark" aria-label="Sumit Sharma - Home">
              sumit.sharma
            </Link>
            <p className="text-[var(--color-ink-2)] text-[var(--text-sm)] leading-relaxed mb-6 max-w-[42ch]">
              Design systems and platform UX that help teams build, evaluate,
              and scale consistent interfaces into reliable real-world products.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="https://github.com/sumitsp04"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
              >
                <GitBranch className="w-4 h-4" />
              </Link>
              <Link
                href="https://linkedin.com/in/sumitsharma"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--quiet"
              >
                <User className="w-4 h-4" />
              </Link>
              <Link
                href="mailto:sumitsp04@gmail.com"
                className="btn btn--quiet"
              >
                <Mail className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <nav aria-label="Work navigation">
            <h3 className="footer-head">work</h3>
            <ul className="footer-links">
              <li><Link href="/work">case studies</Link></li>
            </ul>
          </nav>

          <nav aria-label="Resources navigation">
            <h3 className="footer-head">resources</h3>
            <ul className="footer-links">
              <li><Link href="/writing">articles</Link></li>
            </ul>
          </nav>
        </div>

        <p className="footer-note">
          © Sumit Sharma. Terminal theme — graphite ground, phosphor green,
          Martian Mono. The page is the surface; its pictures are printed in
          type.
        </p>
      </div>
    </footer>
  );
}
