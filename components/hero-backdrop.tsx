"use client";

import { useEffect } from "react";

/*
 * Renamed whenever a photo changes, so cached copies of the old one can't
 * linger under the same URL.
 *
 * Day is a set that cycles; night is one photo. Which set shows is decided in
 * CSS by theme, and the cycling is a CSS animation — see `hero-cycle`.
 *
 * Every photo ships at three widths and the browser takes the one it needs:
 * the day set costs about 280KB on a phone against 1.2MB at full size.
 *
 * Plain `img` rather than `next/image` because this site exports statically
 * with the optimizer off, and an unoptimized `next/image` serves the single
 * file it was given — no srcset, which would make `sizes` decoration.
 */
type Photo = { base: string; full: number; position: string };

const WIDTHS = [800, 1400];

const DAY: Photo[] = [
  { base: "/hero-bridge", full: 1800, position: "object-[50%_55%]" },
  { base: "/hero-houses", full: 1800, position: "object-[50%_50%]" },
  { base: "/hero-canal", full: 1800, position: "object-[45%_55%]" },
];
/** Seconds each photo holds the screen before crossing to the next. */
const TURN = 20;

/*
 * A phone gets no wallpaper at all, and the point is that it shouldn't pay for
 * one either: hiding the photos in CSS would still fetch every byte. So each
 * is a `picture` whose only source is gated on the width where the wallpaper
 * appears, over a transparent single pixel. Below that width nothing matches,
 * the pixel stands in, and no photograph is requested.
 */
const BLANK =
  "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";

const srcSet = (photo: Photo) =>
  [
    ...WIDTHS.map((width) => `${photo.base}-${width}.webp ${width}w`),
    `${photo.base}.webp ${photo.full}w`,
  ].join(", ");

const FILL = "absolute inset-0 h-full w-full object-cover";

/**
 * The wallpaper itself, rendered twice: once behind the page, and once inside
 * the header clipped to the bar's height. Both copies are positioned against
 * the viewport at exactly the same rect, so the strip showing through the menu
 * lines up seamlessly with the one behind the hero — the bar looks transparent
 * while still occluding the hero text that scrolls up underneath it.
 *
 * Both are tagged `data-hero-layer` and driven together by HeroBackdrop below.
 */
export function HeroLayer({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none ${className}`}>
      {/* Only the photograph drifts and fades. */}
      <div
        data-hero-layer
        className="absolute inset-0 will-change-[transform,opacity]"
      >
        {DAY.map((photo, i) => (
          <picture key={photo.base}>
            <source
              media="(min-width: 640px)"
              srcSet={srcSet(photo)}
              sizes="100vw"
            />
            <img
              src={BLANK}
              alt=""
              decoding="async"
              // Only the one on screen at load competes for bandwidth; the rest
              // have twenty seconds or more before their turn comes.
              fetchPriority={i === 0 ? "high" : "low"}
              className={`hero-rotate ${FILL} ${photo.position}`}
              style={{
                // Each photo's turn comes a stretch after the one before it.
                // The delay is negative, which starts it partway through a
                // loop that has notionally already been running, rather than
                // making the page wait for its first turn to come round.
                animationDelay: `${i === 0 ? 0 : -(DAY.length - i) * TURN}s`,
                // What shows before the animation takes hold, and the only one
                // left showing if there is no animation at all, as under
                // reduced motion.
                opacity: i === 0 ? undefined : 0,
              }}
            />
          </picture>
        ))}
      </div>
      {/* The wash stays put. It belongs to the top of the screen — the fade
          out from under the bar — not to the photo drifting behind it, so it
          holds its place while you scroll instead of sliding up and exposing
          a hard edge. Keeping it out of the transformed layer also keeps it
          repainting when the theme changes: a promoted layer can hold its old
          colours until something forces a repaint. */}
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}

/**
 * Page-level wallpaper. Drifts up slower than the page (parallax) and fades
 * out by the time the About section reaches the top.
 */
export function HeroBackdrop() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    /*
     * The drift is the part that can't hold up on a phone or a tablet. Those
     * browsers scroll on the compositor and hand the scroll event over late,
     * so a layer moved from JavaScript arrives a frame or more behind the page
     * — worst under a momentum flick, where it visibly detaches and judders.
     * Below `lg` the wallpaper stays put and only fades; the fade is a cheap
     * property to change and has to stay, or the page would scroll over a
     * washed-out photograph instead of the page colour.
     */
    const drifts = window.matchMedia("(min-width: 1024px)");
    let raf = 0;

    const apply = () => {
      raf = 0;
      // The wallpaper belongs to the top of the page — the name and the
      // biography under it — and is gone by the time that's behind you.
      const zone = document.getElementById("biography") ?? document.getElementById("hero");
      const bottom = zone
        ? zone.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight;
      const y = window.scrollY;
      const p = Math.min(1, Math.max(0, y / Math.max(1, bottom * 0.85)));
      const transform =
        reduced.matches || !drifts.matches
          ? ""
          : `translate3d(0, ${(y * -0.35).toFixed(1)}px, 0)`;

      for (const el of document.querySelectorAll<HTMLElement>(
        "[data-hero-layer]",
      )) {
        el.style.opacity = String(1 - p);
        el.style.transform = transform;
        // Stop compositing it once it's invisible.
        el.style.visibility = p >= 1 ? "hidden" : "visible";
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Crossing the width where the drift starts or stops has to clear or
    // restore the transform, not wait for the next scroll.
    drifts.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      drifts.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Nothing behind the page on a phone: no photograph, and so no wash over it
  // either — which is what made the top of it look cut off against the bar.
  return <HeroLayer className="fixed inset-0 z-0 hidden sm:block" />;
}
