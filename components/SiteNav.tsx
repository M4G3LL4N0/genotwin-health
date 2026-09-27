"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/demo", label: "Demo" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-[#f5f8fc]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-indigo-950 sm:text-base" onClick={() => setOpen(false)}>
          GenoTwin<span className="font-normal text-slate-500"> Health</span>
        </Link>
        <nav className="hidden items-center gap-2 text-sm font-medium text-slate-600 md:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-2 py-1 transition hover:bg-sky-100/80 hover:text-indigo-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/demo" className="rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white" onClick={() => setOpen(false)}>
            Demo
          </Link>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 text-slate-700"
            aria-expanded={open}
            aria-controls="genotwin-mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden>{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="genotwin-mobile-nav"
          className="mx-auto flex max-w-6xl flex-col gap-1 border-t border-slate-200 px-4 py-3 sm:py-4 md:hidden"
          aria-label="Mobile"
        >
          <p className="px-2 pb-2 text-sm text-slate-500">Wellness education only — not medical diagnosis or treatment.</p>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-xl px-3 py-2.5 text-sm text-slate-700 hover:bg-sky-50"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
