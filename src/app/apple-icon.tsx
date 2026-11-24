// ──────────────────────────────────────────────────────────────
// src/app/apple-icon.tsx  →  /apple-icon (home-screen icon, 180×180)
// Same mark as the browser tab icon (src/app/icon.svg).
// ──────────────────────────────────────────────────────────────
import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f0e0c",
          color: "#e8583a",
          fontSize: 84,
          fontWeight: 700,
          fontFamily: "sans-serif",
          letterSpacing: -3,
          borderRadius: 36,
        }}
      >
        SS
      </div>
    ),
    { ...size },
  );
}
