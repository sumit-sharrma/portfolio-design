// ──────────────────────────────────────────────────────────────
// src/app/opengraph-image.tsx
// Default social-share image (1200×630) for the whole site.
// Case-study pages can add their own by adding an opengraph-image file.
// ──────────────────────────────────────────────────────────────
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}, ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#0f0e0c",
          color: "#f5f3ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 2, color: "#e8583a" }}>
          DESIGN SYSTEMS · PORTFOLIO
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05 }}>
          Architecting systems where design meets logic.
        </div>
        <div style={{ fontSize: 30, color: "#b9b5ab" }}>{`${site.name} · ${site.role}`}</div>
      </div>
    ),
    { ...size },
  );
}
