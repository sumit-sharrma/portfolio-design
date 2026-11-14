import Link from "next/link";
import { GlyphPortrait } from "./GlyphPortrait";

export function HeroSection() {
  return (
    <section id="hero" className="hero" aria-label="Home">
      <div className="container">
        <div className="hero-text">
          <p className="prompt mb-4">$ whoami</p>
          <h1 className="hero-head">
            <span className="block">design systems,</span>
            <span className="block">measured.</span>
          </h1>
          <p className="hero-lede lead">
            Token pipelines, governance, and components that scale: Cars24,
            Tide, Jupiter Money, Paytm.
          </p>
          <div className="hero-actions">
            <Link href="#work" className="btn btn--quiet">
              view work
            </Link>
            <Link
              href="mailto:sumitsp04@gmail.com"
              className="btn btn--primary"
            >
              get in touch
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <GlyphPortrait />
          {/* <p className="text-[var(--color-muted)] text-[var(--text-xs)] mt-3 leading-relaxed">
            picture printed in type: 64 × 53 cells, one character per cell
          </p> */}
        </div>
      </div>
    </section>
  );
}
