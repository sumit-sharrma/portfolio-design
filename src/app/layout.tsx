import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { GridOverlayProvider } from "@/components/ui/GridOverlay";
import { DevToolsPanel } from "@/components/ui/DevToolsPanel";
import { GridOverlayShortcut } from "@/components/ui/GridOverlayShortcut";

export const metadata: Metadata = {
  title: "Sumit Sharma — Lead Product Designer, Design Systems Engineer",
  description: "Design Systems & Platform UX Lead. Building token pipelines, governance tools, and component libraries that scale across 130+ stakeholders. Previously Cars24, Tide, Jupiter Money, Paytm.",
  keywords: [
    "Design Systems",
    "Design Tokens",
    "Figma",
    "Style Dictionary",
    "Storybook",
    "Product Design",
    "Platform UX",
    "Frontend Engineering",
    "Design Engineering",
    "Component Libraries",
  ],
  authors: [{ name: "Sumit Sharma" }],
  creator: "Sumit Sharma",
  publisher: "Sumit Sharma",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sumitsharma.design",
    title: "Sumit Sharma — Design Systems Engineer",
    description: "Design Systems & Platform UX Lead. Building token pipelines, governance tools, and component libraries that scale.",
    siteName: "Sumit Sharma Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sumit Sharma — Design Systems Engineer",
    description: "Design Systems & Platform UX Lead. Building token pipelines, governance tools, and component libraries that scale.",
    creator: "@sumitsp04",
  },
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0D0D0D" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Martian+Mono:wdth,wght@75..112.5,400..700&display=swap" />
      </head>
      <body className="min-h-screen flex flex-col">
        <div id="crt" aria-hidden="true"></div>
        <GridOverlayProvider>
          <Header />
          <main className="flex-1 pt-[48px] md:pt-[48px]" id="main-content">
            {children}
          </main>
          <Footer />
          <DevToolsPanel />
          <GridOverlayShortcut />
        </GridOverlayProvider>
      </body>
    </html>
  );
}
