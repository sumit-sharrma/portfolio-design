"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#work", label: "work" },
  { href: "#writing", label: "writing" },
  { href: "#about", label: "about" },
  { href: "#contact", label: "contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="mast" role="banner">
      <div className="container">
        <Link
          href="/"
          className="wordmark"
          aria-label="Sumit Sharma - Home"
        >
          sumit.sharma
        </Link>

        <nav aria-label="Main navigation">
          <ul className="nav-list">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="actions">
          <Link href="#work" className="btn btn--quiet">
            view work
          </Link>
          <Link
            href="mailto:sumitsp04@gmail.com"
            className="btn btn--primary"
          >
            get in touch
          </Link>
          <button
            className="mobile-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {open && (
          <div id="mobile-menu" className="mobile-menu" role="menu">
            <ul className="nav-list mobile-nav">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="nav-link mobile-link"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
