"use client";
// ──────────────────────────────────────────────────────────────
// src/components/site/SiteFooter.tsx
// Footer: availability, quick links (LinkedIn, GitHub, Resume,
// Email) and a colophon naming what the site is set in.
// ──────────────────────────────────────────────────────────────
import { ArrowUpRight } from "lucide-react";
import posthog from "posthog-js";
import { site } from "@/lib/site";

const links = [
  { label: "LinkedIn", href: site.links.linkedin },
  { label: "GitHub", href: site.links.github },
  { label: "Resume", href: site.links.resume },
  { label: "Email", href: `mailto:${site.email}` },
];

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <p className="mono-tag text-fg-3">Contact</p>
            <p className="display mt-3 max-w-[22ch] text-3xl font-semibold tracking-tight text-fg" data-spec="text.title · color.fg">
              Open to design-systems leadership roles and consulting.
            </p>
            <p className="mt-3 text-sm text-fg-3">{site.location}</p>
          </div>

          <ul className="grid grid-cols-2 content-start gap-x-8 md:col-span-5 md:grid-cols-1">
            {links.map((l) => {
              const external = l.href.startsWith("http");
              return (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    onClick={() => {
                      const destination = l.label.toLowerCase();
                      posthog.capture("contact_link_clicked", { destination });
                      posthog.logger.info("Portfolio contact link selected", {
                        event_name: "portfolio_contact_link_selected",
                        destination,
                      });
                    }}
                    {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    className="group flex items-center justify-between py-3 text-sm text-fg-2 transition-colors duration-150 hover:text-accent"
                    data-spec="link · text.body · color.fg-2"
                  >
                    {l.label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 transition-transform duration-150 ease-snap group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="mt-12 flex flex-col gap-2 font-mono text-micro text-fg-3 sm:flex-row sm:justify-between">
          <span>© 2026 {site.name}</span>
          <span className="flex flex-wrap gap-x-4">
            <a href="/privacy" className="hover:text-accent">Privacy</a>
            <span>Set in Bricolage Grotesque and IBM Plex · press I to inspect</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
