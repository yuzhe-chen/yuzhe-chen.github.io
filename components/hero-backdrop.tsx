"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

/**
 * Fixed wallpaper behind the hero. Drifts up slower than the page (parallax)
 * and fades out by the time the About section reaches the top.
 */
export function HeroBackdrop({ light, dark }: { light: string; dark: string }) {
  const ref = useRef<HTMLDivElement>(null);

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

      const el = ref.current;
      if (el) {
        el.style.opacity = String(1 - p);
        el.style.transform = reduced.matches
          ? ""
          : `translate3d(0, ${(y * -0.35).toFixed(1)}px, 0)`;
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

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 will-change-[transform,opacity]"
    >
      {/* Coast — framed so the calm water sits under the type. */}
      <Image
        src={light}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-img-light object-cover object-[40%_60%]"
      />
      {/* Cloud sea — framed high, so the deep sky rather than the white
          cloud bank sits under the type. */}
      <Image
        src={dark}
        alt=""
        fill
        priority
        sizes="100vw"
        className="hero-img-dark object-cover object-[45%_28%]"
      />
      {/* Theme-aware scrim: keeps type legible and dissolves into the page. */}
      <div className="hero-scrim absolute inset-0" />
    </div>
  );
}
