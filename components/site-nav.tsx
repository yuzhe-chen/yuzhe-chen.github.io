"use client";

import type { CSSProperties } from "react";
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
      // The glyph is drawn to three decimals rather than one. At one, the two
      // long arcs that round the left and right ends don't quite meet the
      // straight top and bottom, and the join shows as a kink at each corner --
      // which at 22px is most of what you see of the shape.
      shapeRendering="geometricPrecision"
      aria-hidden
    >
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
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

function ThemeToggle({ className = "" }: { className?: string }) {
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
      className={`nav-tab icon-pop inline-flex shrink-0 items-center justify-center px-3 py-2 ${className}`}
    >
      {/* Both render; CSS shows one, so the right icon is there on first
          paint. Drawn rather than typed, because the Unicode moon renders
          differently in every system font and badly in most. */}
      <MoonIcon />
      <SunIcon />
    </button>
  );
}

/**
 * The two things at the end of the bar that aren't sections. From `sm` up — the
 * tablet bar, which carries tabs and a More button — they sit in the bar itself.
 * On a phone the bar holds only the name and the Menu button, so they move
 * inside the menu, onto its first row.
 *
 * `className` carries the display rather than this setting `flex` itself: the
 * bar's copy has to be hidden below `sm`, and when both `hidden` and `flex` are
 * on one element it's Tailwind's own ordering that decides, not the order they
 * are written in.
 */
function NavIcons({
  right,
  className,
  spread = false,
  style,
}: {
  right: { label: string; href: string }[];
  className: string;
  /**
   * Hold the two icons at the ends of the box instead of letting them sit
   * together, and cancel their own padding while doing it — so what lands on
   * the edges is the glyphs, which is what you can see, rather than their
   * buttons' invisible boxes.
   */
  spread?: boolean;
  /** Carries the measured width the spread is measured against. */
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className={`shrink-0 items-center gap-1.5 text-fg sm:gap-2 ${
        spread ? "justify-between" : ""
      } ${className}`}
    >
      {/* An icon rather than a word: wherever these two end up, they are the
          only things there that aren't a destination. */}
      {right.map((l, i) => (
        <a
          key={l.label}
          href={l.href}
          target={l.href.startsWith("http") ? "_blank" : undefined}
          rel={l.href.startsWith("http") ? "noreferrer" : undefined}
          aria-label={l.label}
          className={`nav-tab icon-pop inline-flex shrink-0 items-center justify-center px-2 py-2 sm:px-3 ${
            spread && i === 0 ? "-ml-2" : ""
          }`}
        >
          <YouTubeIcon />
        </a>
      ))}
      <ThemeToggle className={spread ? "-mr-3" : ""} />
    </div>
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
  // How wide the rule under the Menu button is; the icons in the menu span it.
  const [menuSpan, setMenuSpan] = useState<number | null>(null);
  const visible = useRef<Set<string>>(new Set());
  const rowRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const probeRef = useRef<HTMLDivElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

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

  /**
   * The icons in the menu are hung on the Menu button's own rule: one at each
   * end of it. That rule is inset from the button's box by its padding, so its
   * width is the button's content box — which is a measurement, since the word
   * and the chevron size with the type.
   *
   * Measured for the same reason the tab row is, and with the same care: the
   * first reading happens in a fallback face, so take another once the real one
   * has landed.
   */
  useEffect(() => {
    const button = menuBtnRef.current;
    if (!button) return;
    let raf = 0;

    const measure = () => {
      raf = 0;
      const style = getComputedStyle(button);
      const span =
        button.clientWidth -
        parseFloat(style.paddingLeft) -
        parseFloat(style.paddingRight);
      // Zero from `sm` up, where the button is display:none and the menu it
      // belongs to is gone with it.
      setMenuSpan(span > 0 ? span : null);
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(button);
    document.fonts?.ready.then(schedule).catch(() => {});
    return () => {
      observer.disconnect();
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

  /**
   * Scrolling closes the phone menu. It stands in for the entire row of tabs and
   * sits over the top of the page while it is open, so moving the page under it
   * is as good as saying you are done with it.
   *
   * Only the phone menu: `open` is set by a button that exists below `sm` alone,
   * so there is nothing to guard. The More menu on a tablet is deliberately left
   * to stand — it hangs off a single tab in a bar that is still entirely visible,
   * and scrolling past it is not the same as dismissing it.
   *
   * Hung on `open` so there is no listener at all until there is a menu to shut,
   * and so tapping an item — which closes the menu itself, then smooth-scrolls —
   * has already removed this by the time the scrolling starts.
   */
  useEffect(() => {
    if (!open) return;

    /**
     * A scroll event says the page moved, never what moved it — and a scroll
     * that began inside the menu is someone reading it, not someone done with
     * it. So the origin is taken from the gesture that starts the scroll and
     * remembered until the next one, which also covers the momentum still
     * arriving after a finger has lifted.
     */
    let fromMenu = false;
    const note = (e: Event) => {
      fromMenu =
        e.target instanceof Node &&
        (menuRef.current?.contains(e.target) ?? false);
    };
    const close = () => {
      if (!fromMenu) setOpen(false);
    };

    window.addEventListener("touchstart", note, { passive: true });
    window.addEventListener("wheel", note, { passive: true });
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("touchstart", note);
      window.removeEventListener("wheel", note);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  // Generous padding — these are the tap targets on a phone. Active gets an
  // underline rather than a colour change, so every tab stays the same weight
  // and colour as the body text.
  const tabClass = (id: string) =>
    `nav-tab rule-hover px-3 py-2 uppercase tracking-wide text-fg ${
      active === id ? "is-active" : ""
    }`;

  // A tab that has been pushed under More is still the section you are in, so
  // More wears the mark that tab would have worn.
  const moreHoldsActive = items.slice(shown).some((item) => item.id === active);

  return (
    <header className="site-header no-print fixed inset-x-0 top-0 z-20">
      {/* Smaller type on a phone: it holds the name clear of the menu beside
          it, and takes width off a bar that already carries four things. */}
      <div className="relative z-10 mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-2 text-[15px] font-bold sm:gap-6 sm:px-8 sm:text-[17px]">
        {/* The name holds the corner at a size of its own and goes back to the
            top. Pulled left by its own padding so it starts on the page's own
            margin. It's the page's h1 — the only one. */}
        <h1 className="shrink-0">
          <a
            // The document's own top, not `#top`, which is where `main` and so
            // the biography begins. On a phone the profile picture has the
            // screen above that, and the name is how you get back to it. On a
            // laptop there is no picture up there and `main` starts at the top
            // of the page anyway, so the one target serves both.
            href="#page-top"
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
                className={`${tabClass("")} ${
                  moreHoldsActive ? "is-active" : ""
                } flex items-center gap-1.5`}
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


        {/* The phone's stand-in for the whole row. With the icons gone from the
            bar at this width it is the last thing on the line, so it takes the
            corner outright rather than stopping short of it — pulled right by
            its own padding so the word ends on the page's margin, which is what
            the name does on the left. */}
        <button
          ref={menuBtnRef}
          type="button"
          onClick={() => setOpen((wasOpen) => !wasOpen)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="nav-tab rule-hover is-active -mr-3 ml-auto flex shrink-0 items-center gap-1.5 px-3 py-2 uppercase tracking-wide text-fg sm:hidden"
        >
          Menu
          <ChevronIcon open={open} />
        </button>

        <NavIcons right={right} className="hidden sm:flex" />
      </div>

      {/* Every section, plus the two icons the bar has no room for at this
          width. Opaque, because the wallpaper runs behind it.

          Hung below the bar rather than sitting in it, and kept in the DOM and
          faded rather than switched off — which is what gives it something to
          animate when a scroll dismisses it, instead of the whole menu
          blinking out from under your thumb. Out of the flow because the bar's
          background is the header's: left in it, a menu at zero opacity would
          still have the header painting a tall block of page colour over the
          picture below. Same colour as the bar and no rule between them, so it
          still reads as the bar growing rather than as a panel laid over the
          page. */}
      <div
        id="site-menu"
        ref={menuRef}
        aria-hidden={!open}
        inert={!open}
        // It rolls up rather than fading on the spot: squashed towards its own
        // top edge and lifted under the bar as it goes, which is the shape of
        // going back where it came from. Slight, and over in a fifth of a
        // second -- reduced-motion drops it along with every other transition.
        className={`absolute inset-x-0 top-full origin-top bg-bg transition duration-200 ease-out sm:hidden ${
          open
            ? "translate-y-0 scale-y-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
        }`}
      >
        {/* No top padding: the icons' own row answers for the space under the
            bar, and it wants less of it than a tab would. */}
        <ul className="mx-auto flex max-w-[1600px] flex-col px-5 pb-2 text-[17px] font-bold">
          {/* A row of their own, spanning the rule under the Menu button — the
              YouTube glyph at its left end, the theme toggle at its right — so
              they read as having dropped out of the button rather than as two
              more things to go to.

              Pulled up into the bar's own bottom padding to take the slack out
              of the gap. The tap areas follow them up into it, which is empty:
              the button's box stops where that padding starts. */}
          {/* -mb-3 as well as -mt-2: the row is a tap target a good deal taller
              than the glyphs in it, and the tabs below were being held off by
              the whole of it. Pulled up at both ends, so the list starts closer
              to the name in the bar while the tap areas stay the size they
              were. */}
          <li className="-mb-3 -mt-2 flex justify-end">
            <NavIcons
              right={right}
              spread
              className="flex"
              style={menuSpan ? { width: `${menuSpan}px` } : undefined}
            />
          </li>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={item.href ?? `#${item.id}`}
                onClick={() => setOpen(false)}
                aria-current={active === item.id ? "true" : undefined}
                // -mr-3 as much as -ml-3. A tab's rule is inset from its own
                // box, so without it every rule in here would stop short of
                // the one under the Menu button they came out of, and the
                // right-hand ends wouldn't line up.
                className={`${tabClass(item.id)} -ml-3 -mr-3 block`}
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
