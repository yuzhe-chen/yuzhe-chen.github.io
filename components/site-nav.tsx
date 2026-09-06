"use client";

import { useEffect, useRef, useState } from "react";

import { HeroLayer } from "./hero-backdrop";

export type NavItem = { id: string; label: string };

// Stroke weight 2 to sit alongside the bold nav type; currentColor so they
// inherit the text colour and the accent on hover.
const ICON =
  "h-[19px] w-[19px] shrink-0 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]";

function SunIcon() {
  return (
    <svg className={`theme-sun ${ICON}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 1.9v2.2M12 19.9v2.2M22.1 12h-2.2M4.1 12H1.9M19.14 4.86l-1.56 1.56M6.42 17.58l-1.56 1.56M19.14 19.14l-1.56-1.56M6.42 6.42L4.86 4.86" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className={`theme-moon ${ICON}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
    </svg>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const stored =
      typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null;
    if (stored === "light" || stored === "dark") setTheme(stored);
    else
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light",
      );
  }, []);

  const flip = () => {
    // Read the live DOM rather than React state, so the button works even if
    // it's clicked before the mount effect has run.
    const root = document.documentElement;
    const attr = root.getAttribute("data-theme");
    const isDark =
      attr === "dark" ||
      (attr === null &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing — the toggle still works for this visit.
    }
  };

  return (
    <button
      type="button"
      onClick={flip}
      // Generic until mounted, since the server can't know the visitor's
      // theme; the icon itself is correct from the first paint via CSS.
      aria-label={
        theme
          ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
          : "Toggle theme"
      }
      className="nav-tab inline-flex shrink-0 items-center justify-center px-3 py-2 hover:text-accent"
    >
      {/* Both render; CSS shows one, so the right icon is there on first
          paint. Drawn rather than typed, because the Unicode moon renders
          differently in every system font and badly in most. */}
      <MoonIcon />
      <SunIcon />
    </button>
  );
}

export function SiteNav({
  items,
  right,
}: {
  items: NavItem[];
  right: { label: string; href: string }[];
}) {
  const [active, setActive] = useState("");
  const visible = useRef<Set<string>>(new Set());

  useEffect(() => {
    const sections = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.current.add(entry.target.id);
          else visible.current.delete(entry.target.id);
        }
        // items is in document order, so the first match is the section
        // nearest the top of the viewport.
        const first = items.find((i) => visible.current.has(i.id));
        if (first) setActive(first.id);
      },
      { rootMargin: "-64px 0px -55% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  return (
    <header className="site-header no-print fixed inset-x-0 top-0 z-20 overflow-hidden">
      {/* The wallpaper, clipped to the bar. Absolutely positioned at the top
          of a header that is itself fixed to the viewport top, so it lands on
          exactly the same rect as the page-level copy. */}
      <HeroLayer className="absolute inset-x-0 top-0 h-screen" />
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center gap-6 px-5 text-[17px] font-bold sm:px-8">
        <nav className="no-scrollbar flex flex-1 gap-1.5 overflow-x-auto sm:gap-2">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              // Generous padding — these are the tap targets on a phone.
              // Active gets an underline rather than a colour change, so every
              // tab stays the same weight and colour as the body text.
              className={`nav-tab shrink-0 px-3 py-2 uppercase tracking-wide text-fg underline-offset-8 hover:text-accent ${
                active === item.id ? "underline decoration-2" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-1.5 text-fg sm:gap-2">
          {right.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              className="nav-tab hidden shrink-0 px-3 py-2 uppercase tracking-wide hover:text-accent sm:inline"
            >
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
