---
name: portfolio-case-study
description: Add or edit a case study entry in src/lib/projects.ts for the portfolio, following the Project shape and writing rules. Use when the user adds, updates or reviews a project on the portfolio.
---

# Portfolio case study

## Where it goes
`src/lib/projects.ts`, in the `projects` array. Each entry is a `Project` object and renders in two places:
- a card in the Home work section (`src/components/home/BentoGrid.tsx`), under Case studies or Tools created
- its own page at `/projects/<slug>` (`src/app/projects/[slug]/page.tsx`, prerendered via `generateStaticParams`)

Copy an existing entry as the starting shape.

## Fields
- `slug`: lowercase, hyphenated, unique. It becomes the URL.
- `category`: `"case-study"` or `"tool"`. It decides which group the card appears under on Home (Case studies or Tools created). Keep entries of the same category together in the array.
- `index`: two-digit position within its category, e.g. `"02"`.
- `title`, `shortTitle`, `summary` (one sentence), `role`, `timeline`, `stack` (tool names).
- `visual`: one of `lint`, `mcp`, `pipeline`, `tiers`, `contexts`, `halve`, `areas` (code-drawn graphics in `src/components/projects/ProjectVisual.tsx`). A new kind needs a new component there.
- `size`: bento footprint, `full`, `wide`, `tall` or `base`. In `BentoGrid.tsx` the first case study is the full-width feature and the other case studies share a row with the record tile; tools sit three across as `base`. Check the grid when adding a card.
- `problem`: `lede` + `points[]` of `{ title, body }`.
- `solution`: `lede`, `media[]` and `decisions[]` (`title`, `body`, optional `cost` for what the decision gives up). Media kinds: `code` (`code`, `lang`), `table` (`columns`, `rows`; `textual: true` for tables of words), `route` (`steps` of `{ token, via? }` for an alias chain or tool sequence), `layers` (a token-mapping diagram: `map` with three `layers` and `routes` of `{ from, before, via?, to, after }`), `video` (`videoSrc`: an https link to an MP4 hosted outside the repo), `converge` (many files feeding one source, both always visible, with pulses along the lines: `count`, `labels`, `target`, `targetNote`), `image` (`src` as a file under `public/` or a full https link such as Cloudinary, plus `alt`, `width`, `height`), and `diagram` / `ui` placeholders. `wide: true` spans both columns; `tag` overrides the small header label. Optional `brands` (a `BrandSpec[]`) renders the interactive brand explorer.
- `impact`: `lede` + `metrics[]` of `{ value, label, note? }` (three or four). Numeric values count up on scroll. Optional `notMeasured` states what the evidence does not show.

## Writing rules
- **Never invent numbers.** Metric values come from the user. If a value is missing, use `"TODO"` or a `TODO:` note and list it in your reply.
- Use past tense for completed work and do not promise outcomes.
- Keep `summary` to one sentence.
- Diagram and UI media are placeholders until an image is supplied; put the file in `public/projects/<slug>/` and change the block to `kind: "image"`.
- Before adding a screenshot, check it for personal data (names, phone numbers, emails, watermarks) and crop or mask it.

## Steps
1. Ask the user for the facts you lack: role, timeline, metrics with sources, and at least two decisions.
2. Add or edit the entry.
3. Run the `verify-change` skill and check the card on `/` and the page at `/projects/<slug>`.
4. Summarise what you changed and which values are still placeholders (`grep -n TODO src/lib/projects.ts`).
