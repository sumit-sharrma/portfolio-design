// ──────────────────────────────────────────────────────────────
// src/app/about/page.tsx  →  route: /about
// Identity switcher (from the reference video), experience
// timeline and toolkit.
// ──────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { IdentitySwitcher } from "@/components/about/IdentitySwitcher";
import { Reveal } from "@/components/motion/Reveal";
import { experience, toolkit } from "@/lib/about";

export const metadata: Metadata = {
  title: "About",
  description: "Lead Product Designer and former Software Engineer. Design systems at Cars24, Tide, Jupiter and Paytm.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pt-32 sm:px-6 sm:pt-40">
      <div className="grid gap-16 md:grid-cols-12 md:gap-4">
        <div className="md:col-span-7">
          <IdentitySwitcher />
        </div>

        {/* Experience */}
        <section aria-labelledby="exp" className="md:col-span-4 md:col-start-9">
          <Reveal>
            <h2 id="exp" className="mono-tag border-b border-line pb-3 font-mono font-normal text-fg-3">
              Experience
            </h2>
          </Reveal>
          {/* Not animated: the list is the page's largest content and must show on first paint */}
          <ol className="divide-y divide-line">
            {experience.map((e, i) => (
              <li key={e.company} className="py-5">
                <p className="flex items-center gap-2 font-mono text-micro text-fg-3">
                  {i === 0 && <span className="size-1.5 rounded-full bg-accent" aria-hidden="true" />}
                  {e.period}
                </p>
                <p className="display mt-1 text-xl font-semibold tracking-tight text-fg">{e.company}</p>
                <p className="text-sm text-fg-2">{e.role}</p>
                <p className="mt-2 text-sm leading-relaxed text-fg-3">{e.note}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Toolkit */}
      <section aria-labelledby="toolkit" className="mt-24 border-t border-line pt-10">
        <Reveal>
          <h2 id="toolkit" className="text-headline font-semibold text-fg" data-spec="text.headline · font.display · color.fg">
            What I work in
          </h2>
        </Reveal>
        <div className="panel mt-8 grid divide-y divide-line md:grid-cols-2 md:divide-x md:divide-y-0">
          {(
            [
              ["Design", toolkit.design],
              ["Engineering", toolkit.engineering],
            ] as const
          ).map(([label, items], i) => (
            <Reveal key={label} delay={i * 0.06} className="p-5">
              <p className="mono-tag text-fg-3">{label}</p>
              <ul className="mt-4 divide-y divide-line">
                {items.map((t) => (
                  <li key={t} className="py-2 text-sm text-fg-2">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
