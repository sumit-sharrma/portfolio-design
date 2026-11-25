// ──────────────────────────────────────────────────────────────
// src/proxy.ts
// Works out whether the visitor is in the EU or UK, once per request, using
// the country Vercel reads from the connection. Stores the answer in a
// cookie, which the browser reads to decide whether to show the cookie banner.
//
//   visitor-region=eu     EU member state or the UK (GB), or the country is unknown
//                         (unknown is treated as EU, the safer default)
//   visitor-region=other  any other country
//
// Asset and file requests are skipped.
// ──────────────────────────────────────────────────────────────
import { NextResponse, type NextRequest } from "next/server";

// EU member states, plus the UK, which has its own equivalent rules (UK GDPR, PECR).
export const EU_COUNTRIES = new Set([
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE",
  "GB",
]);

export const REGION_COOKIE = "visitor-region";

export function proxy(request: NextRequest) {
  const response = NextResponse.next();
  // Keep the first answer for a visit; the country does not change while browsing.
  if (request.cookies.has(REGION_COOKIE)) return response;

  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase() ?? "";
  const region = country === "" || EU_COUNTRIES.has(country) ? "eu" : "other";

  response.cookies.set(REGION_COOKIE, region, {
    path: "/",
    sameSite: "lax",
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|icon\\.svg|apple-icon|opengraph-image|robots\\.txt|sitemap\\.xml).*)"],
};
