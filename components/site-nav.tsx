"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { links } from "@/lib/content";
import type { NavItem } from "@/lib/nav";
import { SearchButton, SearchOverlay } from "@/components/site-search";

/*
 * The theme lives outside React: data-theme on <html> (set before first paint
 * by the script in the layout) and localStorage. The toggle reads it from
 * there, so the right icon is chosen by CSS on the very first paint.
 */
const listeners = new Set<() => void>();
const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
};
const readTheme = () =>
  document.documentElement.getAttribute("data-theme") ?? "system";
const readThemeOnServer = () => "system";

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, readThemeOnServer);
  const flip = () => {
    const root = document.documentElement;
    const attr = root.getAttribute("data-theme");
    const isDark =
      attr === "dark" ||
      (attr === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing: the toggle still works for this visit.
    }
    listeners.forEach((l) => l());
  };
  return (
    <button
      type="button"
      className="ibtn"
      onClick={flip}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
    >
      <svg
        className="theme-moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
      <svg
        className="theme-sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        aria-hidden
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
      </svg>
    </button>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

/**
 * The global bar. `items` are the tabs; on the home page the ones without an
 * href scroll to their section and the topmost visible section is marked.
 */
export function SiteNav({
  items,
  name,
  current,
}: {
  items: NavItem[];
  name: string;
  /** The tab that is the current page (for pages other than the home page). */
  current?: string;
}) {
  const [active, setActive] = useState<string | null>(current ?? null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (current) return;
    const ids = items.filter((i) => !i.href).map((i) => i.id);
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        const first = ids.find((id) => seen.get(id));
        setActive(first ?? null);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [items, current]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const hrefOf = (i: NavItem) => i.href ?? `#${i.id}`;
  const yt = links[0];

  return (
    <>
      <header className="bar no-print">
        <div className="bar-in">
          <Link href="/" className="bar-name" onClick={() => setOpen(false)}>
            {name}
          </Link>
          <nav aria-label="Sections">
            <ul className="bar-links">
              {items.map((i) => (
                <li key={i.id}>
                  <Link
                    href={hrefOf(i)}
                    aria-current={active === i.id ? "true" : undefined}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bar-icons">
            <SearchButton />
            {yt && (
              <a
                className="ibtn"
                href={yt.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube channel (opens in a new tab)"
              >
                <YouTubeIcon />
              </a>
            )}
            <ThemeToggle />
            <button
              type="button"
              className="ibtn menu-btn"
              aria-expanded={open}
              aria-controls="sheet"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                aria-hidden
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 9h16M4 15h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>
      <div id="sheet" className="sheet no-print" hidden={!open}>
        <ul>
          {items.map((i) => (
            <li key={i.id}>
              <Link href={hrefOf(i)} onClick={() => setOpen(false)}>
                {i.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <SearchOverlay />
    </>
  );
}
