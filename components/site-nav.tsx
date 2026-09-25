"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

/**
 * The theme already lives in two places outside React: the data-theme
 * attribute, stamped on <html> before first paint by the script in the layout,
 * and localStorage. So the toggle reads it from there instead of copying it
 * into state inside an effect, which would render the page a second time on
 * every visit just to label one button.
 */
const themeListeners = new Set<() => void>();

function subscribeTheme(onChange: () => void) {
  themeListeners.add(onChange);
  // A visitor who has never used the toggle follows the system setting, which
  // can change while the page is open.
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  return () => {
    themeListeners.delete(onChange);
    media.removeEventListener("change", onChange);
  };
}

function readTheme(): "light" | "dark" {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

// The server can't know the visitor's theme, so it renders the generic label
// and the specific one swaps in once the page is interactive.
const readThemeOnServer = () => null;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`${ICON} transition-transform ${open ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d="M5 8.5L12 15.5L19 8.5" />
    </svg>
  );
}

function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    readTheme,
    readThemeOnServer,
  );

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
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private browsing — the toggle still works for this visit.
    }
    // The attribute is the source of truth, so tell the readers it moved.
    for (const listener of themeListeners) listener();
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
  const [open, setOpen] = useState(false);
  // How many tabs fit on the line at this width; the rest go under More.
  const [shown, setShown] = useState(items.length);
  const [moreOpen, setMoreOpen] = useState(false);
  const visible = useRef<Set<string>>(new Set());
  const rowRef = useRef<HTMLElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);

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

  /**
   * Between the phone menu and a screen wide enough for every tab there's a
   * band — tablets, half-screen windows — where some fit and some don't.
   * Rather than pick a width and guess, measure it: an invisible copy of the
   * row gives the natural width of each tab and of the More button, and the
   * visible row takes as many as the space actually holds.
   */
  useEffect(() => {
    const row = rowRef.current;
    const probe = probeRef.current;
    if (!row || !probe) return;

    const GAP = 8; // matches sm:gap-2
    let raf = 0;

    const measure = () => {
      raf = 0;
      // Zero on a phone, where the row is display:none and the menu button
      // has taken over; nothing to fit in that case.
      const available = row.clientWidth;
      if (available === 0) return;

      const tabs = Array.from(
        probe.querySelectorAll<HTMLElement>("[data-probe-tab]"),
      ).map((el) => el.offsetWidth);
      const more =
        probe.querySelector<HTMLElement>("[data-probe-more]")?.offsetWidth ?? 0;

      const whole = tabs.reduce((sum, w) => sum + w + GAP, -GAP);
      if (whole <= available) {
        setShown(tabs.length);
        return;
      }

      // Everything shown now has to share the line with the More button.
      let used = more + GAP;
      let fits = 0;
      for (const width of tabs) {
        if (used + width > available) break;
        used += width + GAP;
        fits += 1;
      }
      setShown(fits);
    };

    // Deliberately out of the effect body: measuring reads layout, and setting
    // state from it synchronously would re-render before the browser paints.
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(row);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  // Escape closes either menu, and so does widening the window back to where
  // the full row of tabs fits — otherwise one is left open behind the tabs.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMoreOpen(false);
      }
    };
    const wide = window.matchMedia("(min-width: 640px)");
    const onWiden = () => {
      setOpen(false);
      setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWiden);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWiden);
    };
  }, []);

  // Generous padding — these are the tap targets on a phone. Active gets an
  // underline rather than a colour change, so every tab stays the same weight
  // and colour as the body text.
  const tabClass = (id: string) =>
    `nav-tab px-3 py-2 uppercase tracking-wide text-fg underline-offset-8 hover:text-accent ${
      active === id ? "underline decoration-2" : ""
    }`;

  return (
    <header className="site-header no-print fixed inset-x-0 top-0 z-20">
      {/* The wallpaper, clipped to its own box rather than by the header, so
          that the menu opening below it isn't clipped away with it. Only from
          `sm` up: on a phone the bar is solid, since a strip of photo behind
          one line of menu reads as a mistake rather than as continuity. */}
      <div className="absolute inset-0 hidden overflow-hidden sm:block">
        <HeroLayer className="absolute inset-x-0 top-0 h-screen" />
      </div>
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center gap-6 px-5 text-[17px] font-bold sm:px-8">
        {/* The full row doesn't fit on a phone, and a row that scrolls
            sideways hides the sections at the end of it with nothing on
            screen to say they're there. One button instead. */}
        <button
          type="button"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          aria-expanded={open}
          aria-controls="site-menu"
          // Pulled left by its own padding so the word starts on the same
          // line as the name in the hero, not three pixels off it.
          className="nav-tab -ml-3 flex flex-1 items-center gap-1.5 px-3 py-2 uppercase tracking-wide text-fg hover:text-accent sm:hidden"
        >
          Menu
          <ChevronIcon open={open} />
        </button>

        <nav
          ref={rowRef}
          className="hidden min-w-0 flex-1 items-center gap-1.5 sm:flex sm:gap-2"
        >
          {/* The tabs are what gets clipped when they don't fit. The More
              button and its menu stay outside that box, or the menu would be
              clipped along with them. No flex-1 here: the box is only as wide
              as the tabs it holds, so More sits against the last one rather
              than being pushed to the far end of the bar. */}
          <div className="flex min-w-0 gap-1.5 overflow-hidden sm:gap-2">
            {items.slice(0, shown).map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={active === item.id ? "true" : undefined}
                className={`${tabClass(item.id)} shrink-0`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {shown < items.length && (
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setMoreOpen((wasOpen) => !wasOpen)}
                aria-expanded={moreOpen}
                aria-controls="site-more"
                className={`${tabClass("")} flex items-center gap-1.5`}
              >
                More
                <ChevronIcon open={moreOpen} />
              </button>
              {/* Hung from the button, so it drops from the thing that was
                  clicked rather than from the far corner of the bar. Kept in
                  the DOM and faded rather than switched on and off, so it has
                  something to animate; reduced-motion drops the transition
                  along with every other one on the page. */}
              <div
                id="site-more"
                aria-hidden={!moreOpen}
                className={`absolute left-0 top-full min-w-[11rem] border border-rule bg-bg py-1 transition duration-150 ease-out ${
                  moreOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {items.slice(shown).map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMoreOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`${tabClass(item.id)} block whitespace-nowrap`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </nav>

        {/* Measured, never seen: the natural width of every tab and of the
            More button, so the row above can be cut to what fits. Absolute, so
            it costs the layout nothing. */}
        <div
          ref={probeRef}
          aria-hidden
          className="pointer-events-none invisible absolute left-0 top-0 hidden gap-1.5 sm:flex sm:gap-2"
        >
          {items.map((item) => (
            <span
              key={item.id}
              data-probe-tab
              className={`${tabClass(item.id)} shrink-0`}
            >
              {item.label}
            </span>
          ))}
          <span
            data-probe-more
            className={`${tabClass("")} flex shrink-0 items-center gap-1.5`}
          >
            More
            <ChevronIcon open={false} />
          </span>
        </div>


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

      {/* Every section, plus the links the bar has no room for at this width.
          Opaque, because the wallpaper runs behind it. */}
      <div
        id="site-menu"
        className={`relative z-10 border-t border-rule bg-bg sm:hidden ${
          open ? "" : "hidden"
        }`}
      >
        <ul className="mx-auto flex max-w-[1600px] flex-col px-5 py-2 text-[17px] font-bold">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={`${tabClass(item.id)} -ml-3 block`}
              >
                {item.label}
              </a>
            </li>
          ))}
          {right.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className="nav-tab -ml-3 block px-3 py-2 uppercase tracking-wide text-fg hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
