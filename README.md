# Sumit Sharma — Portfolio

Personal portfolio for Sumit Sharma, Lead Product Designer and Design Systems lead. It covers the home page, an About page with an interactive identity switcher, and a case study for each project, including a token-mapping diagram, a brand explorer, and embedded images and video.

- **Live site:** https://designerwhocode.com (also https://portfolio-sand-rho-pnkvelwzqi.vercel.app)
- **Stack:** Next.js 16 (App Router, Turbopack), React 19, TypeScript, Tailwind CSS v4, Framer Motion, PostHog (analytics, consent-gated), Vercel (hosting).

## Getting started

Requires Node.js 20 or later.

```bash
npm install
cp .env.example .env.local   # then fill in the PostHog values (see below)
npm run dev                   # http://localhost:3000
```

### Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | PostHog project token (`phc_…`). Public by design. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog host, for example `https://us.i.posthog.com`. |

These must also be set in the Vercel project (Production) for the live site to send analytics. `.env*` files are gitignored.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server with hot reload. |
| `npm run build` | Production build. Also runs the type check. |
| `npm run start` | Serves the production build locally. |
| `npm run lint` | ESLint. |

## Project structure

```
src/
├── app/                       Routes and site-wide files
│   ├── layout.tsx             Fonts, navigation, footer, cookie banner
│   ├── page.tsx               Home: hero and work grid
│   ├── about/                 About page
│   ├── projects/[slug]/       Case study template (one page per project)
│   ├── privacy/               Privacy notice
│   ├── icon.svg, apple-icon.tsx, opengraph-image.tsx   Tab, home-screen and share images
│   ├── robots.ts, sitemap.ts  Search engine files (generated from the content below)
│   └── globals.css            Design tokens (colours, type, spacing) and shared styles
├── components/
│   ├── home/                  Hero, work grid
│   ├── about/                 Identity switcher
│   ├── projects/              Case study sections, media, brand explorer, token map
│   ├── site/                  Navigation, footer, cookie banner
│   ├── inspect/               Inspect mode (press I to view design tokens)
│   ├── motion/                Scroll reveals and motion settings
│   └── ui/                    Shared building blocks
├── lib/
│   ├── projects.ts            All case studies (the main content file)
│   ├── about.ts               About page content: identities, experience, toolkit
│   ├── site.ts                Site URL, contact details and social links
│   └── analytics.ts           The only place PostHog is called, gated by consent
├── instrumentation-client.ts  Starts analytics for visitors who already accepted
public/
└── projects/<slug>/           Images and icons used by case studies
```

## Editing content

Almost all text, numbers and links live in three files:

- **`src/lib/projects.ts`:** each case study. A project has a `category` (`case-study` or `tool`), a `problem`, a `solution` with media and decisions, and an `impact` section. The field reference is in `.claude/skills/portfolio-case-study/SKILL.md`.
- **`src/lib/about.ts`:** the About page: the four identities, experience and toolkit.
- **`src/lib/site.ts`:** the site URL (used for the sitemap and share tags), email, LinkedIn, GitHub and resume links.

### Media in case studies

- **Images:** put files in `public/projects/<slug>/`, or link to a hosted file with a full `https://` address. Images open full size when clicked.
- **Video:** host the MP4 outside the repository (for example on Cloudinary) and link it with `videoSrc`. Keep the file under about 20 MB, so the page loads quickly.
- **Illustrations:** the diagrams and flows are SVG files in `public/`, drawn to match the site's style.

### Numbers and claims

Figures in case studies come from the source material and should be marked as the author's own where they weren't measured independently. Any `TODO` text left in `projects.ts` will show on the site, so search for it before publishing.

## Analytics and privacy

PostHog records anonymous usage only after a visitor accepts the cookie banner. Until then, no analytics script is downloaded, and nothing is stored or sent. Declining keeps it off for the visit. A visitor can change their choice with **Cookie settings** in the footer.

Analytics is also disabled in development, and when the site is served from `localhost`, `127.0.0.1` or `*.localhost`. Session replays are recorded only for visitors who accept. The full notice is at `/privacy`.

To check that tracking works on the live site, accept the banner on the site and look for `$pageview` events in PostHog's Live events.

## Security

`next.config.ts` sends security headers on every route: a Content-Security-Policy, `X-Frame-Options: DENY`, `nosniff`, a referrer policy and a permissions policy. The policy allows only the site itself, PostHog and Cloudinary. Development builds additionally allow `unsafe-eval`, which React needs for debugging. Production builds do not.

## Deployment

The site deploys to Vercel from the `main` branch. Each merge to `main` triggers a production deployment.

- **Domain:** `designerwhocode.com` (registered at BigRock, with DNS on Vercel).
- **Environment variables:** set the two PostHog variables in the Vercel project for Production.
- **Checks before deploying:** `npm run build` and `npm run lint`. Search for leftover `TODO` text.

## Notes for maintainers

- The file `instrumentation-client.ts` at the repository root is a duplicate of the one in `src/`. It now uses the same consent-gated start-up, so it is safe, but it can be deleted so that only `src/instrumentation-client.ts` remains. The live site uses the `src/` version.
- Visitors in the EU and the UK are asked for consent. Everyone else is measured by default. The country list is `EU_COUNTRIES` in `src/proxy.ts`.
- Several case studies were written from the author's own write-up. The source material is described in each project's comments in `projects.ts`.
- The Next.js security advisory fixed in 16.4.6 is applied. Keep Next.js and its ESLint configuration on matching versions when upgrading.
