// ──────────────────────────────────────────────────────────────
// src/lib/site.ts
// Site-wide constants: identity, navigation, external links.
// Swap the URLs here and every page picks them up.
// ──────────────────────────────────────────────────────────────

export const site = {
  name: "Sumit Sharma",
  role: "Lead Product Designer · Design Systems",
  url: "https://sumitsharma.design",
  email: "sumitsp04@gmail.com",
  location: "India · Remote",
  links: {
    linkedin: "https://linkedin.com/in/sumitsharma",
    github: "https://github.com/sumit-sharrma",
    // Drop your PDF at public/resume.pdf and this link works as-is.
    resume: "/resume.pdf",
  },
} as const;

export const nav = [
  { href: "/", label: "Work", index: "01" },
  { href: "/about", label: "About", index: "02" },
] as const;
