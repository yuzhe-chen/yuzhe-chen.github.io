"use client";

import { useEffect, useRef, useState } from "react";
import { greetings } from "@/lib/greetings";

const EVERY_MS = 3800;
const FADE_MS = 350;

/**
 * The title: a greeting in one of the languages he speaks, then his name, which
 * never changes. The greeting turns over every few seconds with a short fade,
 * and stops while the pointer is over it.
 *
 * It opens on English, or on the visitor's own language if it is one of these,
 * and stays on English throughout for anyone who has asked their device for
 * reduced motion. The heading is named "Yuzhe Chen" for screen readers, which
 * would otherwise have the whole thing read out again each time it changed.
 */
export function Greeting({ name }: { name: string }) {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  const hover = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Start on the visitor's language. This happens while the title is still
    // fading in, so there is nothing to see.
    const mine = (navigator.languages?.length ? navigator.languages : [navigator.language])
      .map((l) => l?.toLowerCase().split("-")[0])
      .find((l) => greetings.some((g) => g.code.split("-")[0] === l));
    const start = Math.max(0, greetings.findIndex((g) => g.code.split("-")[0] === mine));
    // In a callback rather than the body of the effect, which would render twice.
    const first = window.setTimeout(() => {
      if (start > 0) setI(start);
    }, 0);
    if (reduced) return () => window.clearTimeout(first);

    let swap: number | undefined;
    const t = window.setInterval(() => {
      if (hover.current || document.hidden) return;
      setOut(true);
      swap = window.setTimeout(() => {
        setI((n) => (n + 1) % greetings.length);
        setOut(false);
      }, FADE_MS);
    }, EVERY_MS);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(t);
      window.clearTimeout(swap);
    };
  }, []);

  const g = greetings[i];
  return (
    <h1
      className="bio-name reveal"
      aria-label={name}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
    >
      <span className={`greet${out ? " is-out" : ""}`} aria-hidden>
        <span lang={g.code}>{g.before}</span> {name}
      </span>
    </h1>
  );
}
