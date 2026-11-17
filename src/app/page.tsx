// ──────────────────────────────────────────────────────────────
// src/app/page.tsx  →  route: /
// Home / hub: hero + featured-work bento grid.
// ──────────────────────────────────────────────────────────────
import { Hero } from "@/components/home/Hero";
import { BentoGrid } from "@/components/home/BentoGrid";

export default function HomePage() {
  return (
    <>
      <Hero />
      <BentoGrid />
    </>
  );
}
