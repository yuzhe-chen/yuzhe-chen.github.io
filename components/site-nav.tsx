"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

export type NavItem = {
  id: string;
  label: string;
  /** Where the tab points, if not at its own section. */
  href?: string;
};

// Stroke weight 2 to sit alongside the bold nav type; currentColor so they
// inherit the text colour and the accent on hover.
const ICON =
  "h-[19px] w-[19px] shrink-0 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]";

function SunIcon() {
  return (
    <svg className={`theme-sun ${ICON}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      {/* Filled disc, drawn rays. */}
      <circle cx="12" cy="12" r="4.25" fill="currentColor" />
      <path d="M12 1.9v2.2M12 19.9v2.2M22.1 12h-2.2M4.1 12H1.9M19.14 4.86l-1.56 1.56M6.42 17.58l-1.56 1.56M19.14 19.14l-1.56-1.56M6.42 6.42L4.86 4.86" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className={`theme-moon ${ICON}`} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"
        fill="currentColor"
      />
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

function YouTubeIcon() {
  return (
    <svg
      className="h-[22px] w-[22px] shrink-0"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M23.5 6.9a3 3 0 0 0-2.1-2.1C19.5 4.3 12 4.3 12 4.3s-7.5 0-9.4.5A3 3 0 0 0 .5 6.9 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.1 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.1zM9.6 15.6V8.4l6.3 3.6z" />
    </svg>
  );
}

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
      className="nav-tab icon-pop inline-flex shrink-0 items-center justify-center px-3 py-2"
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
  name,
}: {
  items: NavItem[];
  right: { label: string; href: string }[];
  /** Sits in the corner of the bar and goes back to the top. */
  name: string;
}) {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  // How many tabs fit on the line at this width; the rest go under More.
  const [shown, setShown] = useState(items.length);
  const [moreOpen, setMoreOpen] = useState(false);
  // The bar is a window onto the page at the very top and solid once anything
  // has scrolled under it.
  const [scrolled, setScrolled] = useState(false);
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
    // The first measurement happens in a fallback face, because the real one
    // is still loading. Fallback metrics are usually narrower, so the row
    // looks like it fits, More never appears, and the tabs are quietly clipped
    // the moment the real font lands. Measure again once it has.
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [items]);

  useEffect(() => {
    let raf = 0;
    // Through a frame rather than straight from the handler: this reads the
    // scroll position and sets state from it, and doing that synchronously
    // re-renders ahead of the paint it belongs to.
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

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
    `nav-tab rule-hover px-3 py-2 uppercase tracking-wide text-fg ${
      active === id ? "is-active" : ""
    }`;

  return (
    <header
      className={`site-header no-print fixed inset-x-0 top-0 z-20 ${
        scrolled ? "is-solid" : ""
      }`}
    >
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-2 text-[17px] font-bold sm:gap-6 sm:px-8">
        {/* The name holds the corner at a size of its own and goes back to the
            top. Pulled left by its own padding so it starts on the page's own
            margin. It's the page's h1 — the only one. */}
        <h1 className="shrink-0">
          <a
            href="#top"
            className="brand nav-tab rule-hover -ml-3 block px-3 py-2 text-fg"
          >
            {name}
          </a>
        </h1>

        {/* Everything else sits at the other end of the bar. */}
        <nav
          ref={rowRef}
          className="hidden min-w-0 flex-1 items-center justify-end gap-1.5 sm:flex sm:gap-2"
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
                href={item.href ?? `#${item.id}`}
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
                className={`absolute left-0 top-full min-w-[11rem] bg-bg py-1 transition duration-150 ease-out ${
                  moreOpen
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-1 opacity-0"
                }`}
              >
                {items.slice(shown).map((item) => (
                  <a
                    key={item.id}
                    href={item.href ?? `#${item.id}`}
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


        {/* The phone's stand-in for the whole row, at the far end like the
            tabs it replaces. */}
        <button
          type="button"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="nav-tab rule-hover is-active ml-auto flex shrink-0 items-center gap-1.5 px-3 py-2 uppercase tracking-wide text-fg sm:hidden"
        >
          Menu
          <ChevronIcon open={open} />
        </button>

        <div className="flex shrink-0 items-center gap-1.5 text-fg sm:gap-2">
          {/* An icon rather than a word, and at every width: it's one of only
              two things that live at this end of the bar. */}
          {right.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel={l.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={l.label}
              className="nav-tab icon-pop inline-flex shrink-0 items-center justify-center px-2 py-2 sm:px-3"
            >
              <YouTubeIcon />
            </a>
          ))}
          <ThemeToggle />
        </div>
      </div>

      {/* Every section, plus the links the bar has no room for at this width.
          Opaque, because the wallpaper runs behind it. */}
      <div
        id="site-menu"
        // Same colour as the bar and no rule between them, so the menu reads
        // as the bar growing rather than as a panel laid over the page.
        className={`relative z-10 bg-bg sm:hidden ${open ? "" : "hidden"}`}
      >
        <ul className="mx-auto flex max-w-[1600px] flex-col px-5 py-2 text-[17px] font-bold">
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href ?? `#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                className={`${tabClass(item.id)} -ml-3 block`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
