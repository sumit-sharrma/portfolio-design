// ──────────────────────────────────────────────────────────────
// src/app/robots.ts  →  /robots.txt
// Allow all crawlers and point them at the sitemap.
// ──────────────────────────────────────────────────────────────
import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
