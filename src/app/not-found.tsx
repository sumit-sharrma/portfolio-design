// ──────────────────────────────────────────────────────────────
// src/app/not-found.tsx
// 404, including unknown /projects/:slug values.
// ──────────────────────────────────────────────────────────────
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start px-4 pt-44 sm:px-6">
      <p className="font-mono text-sm text-fg-3">
        <span className="text-accent">$</span> cd ./this-page
      </p>
      <p className="mt-1 font-mono text-sm text-warn">error: no such route (404)</p>
      <h1 className="mt-8 text-headline font-semibold text-fg">This page isn’t in the system.</h1>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-[var(--radius-control)] bg-fg px-5 text-sm font-medium text-bg transition-[background-color,transform] duration-150 ease-snap hover:bg-accent active:scale-[0.97]"
      >
        Back to work
      </Link>
    </div>
  );
}
