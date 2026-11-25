// ──────────────────────────────────────────────────────────────
// src/app/privacy/page.tsx  →  route: /privacy
// Privacy notice for the site. DRAFT: review the wording before publishing.
// ──────────────────────────────────────────────────────────────
import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How this site collects and uses anonymous usage data.",
};

const updated = "25 November 2026";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pt-32 pb-24 sm:px-6 sm:pt-40">
      <p className="mono-tag text-fg-3">Privacy</p>
      <h1 className="display mt-4 text-4xl font-semibold tracking-tight text-fg">Privacy notice</h1>
      <p className="mt-3 font-mono text-micro text-fg-3">Last updated {updated}</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-fg-2">
        <section>
          <h2 className="display text-xl font-semibold text-fg">What this site collects</h2>
          <p className="mt-3">
            This site has no accounts, comment sections or contact forms. It uses PostHog, an analytics
            service, to record anonymous usage: page views, how you move between pages, and clicks on
            features such as the case-study image viewer, the Inspect mode, and the contact links.
          </p>
          <p className="mt-3">
            Whether you are asked first depends on where you are. Visitors in the European Union or the United
            Kingdom see a cookie banner and are measured only if they accept. If you decline, none of this is
            recorded. Visitors from anywhere else do not see a banner, and anonymous usage is recorded for them
            by default.
          </p>
          <p className="mt-3">
            PostHog may also record session replays, which show how pages are scrolled and clicked. The site
            has no forms, so visitors do not enter personal details into it.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-fg">Cookies and local storage</h2>
          <p className="mt-3">
            The site sets a cookie called <span className="font-mono text-[13px]">visitor-region</span> that
            records whether your request came from the EU or UK, or from elsewhere. The country is detected from your
            IP address by the hosting provider, Vercel. The cookie holds no personal details and expires after
            30 days. It decides whether the cookie banner is shown.
          </p>
          <p className="mt-3">
            Choices made in the banner (accept or decline) are stored in the browser’s local storage, so the
            banner does not ask again. PostHog stores a random identifier in the browser, in a cookie and local
            storage, only once analytics is running for you: after you accept in the EU or UK, or by default
            elsewhere. The identifier lets PostHog count visits without knowing who you are. Visitors in the EU or UK can change their choice
            at any time with “Cookie settings” in the footer, or clear the stored data in the browser.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-fg">Where the data goes</h2>
          <p className="mt-3">
            Analytics data is sent to PostHog’s servers in the United States and kept for up to 30 days
            for session recordings. The site is hosted on Vercel, which keeps standard server logs.
          </p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-fg">Local development</h2>
          <p className="mt-3">Analytics is switched off when the site is viewed from localhost, so testing is not recorded.</p>
        </section>

        <section>
          <h2 className="display text-xl font-semibold text-fg">Contact</h2>
          <p className="mt-3">
            Questions about this notice: <a className="text-accent underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
