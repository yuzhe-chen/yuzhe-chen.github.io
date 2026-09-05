"use client";

import Image from "next/image";
import { useEffect } from "react";

const LIGHT = "/hero-light.jpg";
const DARK = "/hero-dark.jpg";

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
    <div
      data-hero-layer
      aria-hidden
      className={`pointer-events-none will-change-[transform,opacity] ${className}`}
    >
      <Image
        src={LIGHT}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-img-light object-cover object-[40%_60%]"
      />
      <Image
        src={DARK}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-img-dark object-cover object-[45%_28%]"
      />
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
    let raf = 0;

    const apply = () => {
      raf = 0;
      const hero = document.getElementById("hero");
      const height = hero?.offsetHeight ?? window.innerHeight;
      const y = window.scrollY;
      // Fully gone a little before the hero has finished scrolling past.
      const p = Math.min(1, Math.max(0, y / Math.max(1, height * 0.8)));
      const transform = reduced.matches
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <HeroLayer className="fixed inset-0 z-0" />;
}
