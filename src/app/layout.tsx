// ──────────────────────────────────────────────────────────────
// src/app/layout.tsx
// Root layout: fonts, nav, footer, motion + inspect providers.
// Page content animates in via src/app/template.tsx.
// ──────────────────────────────────────────────────────────────
import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { InspectProvider } from "@/components/inspect/Inspect";
import { site } from "@/lib/site";

// Display: headlines, names, big numerals (uses the width axis)
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  variable: "--face-display",
  display: "swap",
});

// Text: everything you read
const text = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--face-text",
  display: "swap",
});

// Code: tags, metadata, spec labels
const code = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--face-code",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Lead Product Designer, Design Systems`,
    template: `%s — ${site.name}`,
  },
  description:
    "Lead Product Designer and former Software Engineer building scalable design systems, automated tooling and AI-assisted workflows.",
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Architecting systems where design meets logic`,
    description:
      "Design systems, automated tooling and AI-assisted workflows from a designer who used to ship code.",
  },
};

export const viewport: Viewport = {
  themeColor: "#100f0d",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${text.variable} ${code.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-fg focus:px-3 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        <MotionProvider>
          <InspectProvider>
            <SiteNav />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
          </InspectProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
