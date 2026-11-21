"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Adds `is-in` to every .reveal, .reveal-scale and .reveal-fade element as it
 * scrolls into view; the rules in globals.css do the animating. They only hide
 * anything when scripts run (html.js, set in the layout before first paint), so
 * a visitor without JavaScript sees everything, and reduced motion shows it all
 * at once.
 */
export function RevealInit() {
  const path = usePathname();
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".reveal, .reveal-scale, .reveal-fade",
      ),
    );
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries) {
          if (en.isIntersecting) {
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [path]);
  return null;
}
