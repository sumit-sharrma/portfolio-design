---
name: portfolio-case-study
description: Add or edit a case study entry in src/lib/caseStudies.tsx for the portfolio, following the existing CaseStudy shape and writing rules. Use when the user adds, updates or reviews a project on the portfolio.
---

# Portfolio case study

## Where it goes
`src/lib/caseStudies.tsx`, in the `caseStudies` array. Each entry is a `CaseStudy` object. Copy an existing entry (for example `cars24`) as the starting shape.

## Required fields
- `id`: short lowercase slug, unique in the array.
- `title`, `subtitle`, `role`, `period`, `company`.
- `metrics`: built with `createMetric(label, value, key)`. `key` is one of `velocity`, `quality`, `cost`, `adoption`, `time`, `automation`.
- `specs`: `{ label, value, tokenRef? }` rows.
- `tokens`: token names used in the project.
- `challenges`, `solutions`, `outcomes`: string arrays.
- Optional: `links`, `tags`, `featured`.

## Writing rules
- **Never invent numbers.** Metric values come from the user. If a value is missing, use a clearly marked placeholder such as `"TBD"` and list it in your reply.
- The site's readings say "record, not forecast". Use past tense for completed work, and do not promise outcomes.
- Use `—` only in the data the way existing entries do. The page converts it to "to" or commas for display, so check the rendered output.
- Keep subtitles under about 12 words.

## Steps
1. Ask the user for the facts you lack: role, period, metrics with sources, and at least two outcomes.
2. Add or edit the entry.
3. Run the `verify-change` skill and check that the project appears in the Work section.
4. Summarise what you changed and which values are still placeholders.
