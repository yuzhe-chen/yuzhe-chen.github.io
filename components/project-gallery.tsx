"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";

const AUTOPLAY_MS = 5200;

/** Where a card sits relative to the centred one, wrapping around. */
function position(i: number, active: number, n: number): "0" | "-1" | "1" | "far" {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  if (d === 0) return "0";
  if (d === -1) return "-1";
  if (d === 1) return "1";
  return "far";
}

function Chevron({ dir }: { dir: "l" | "r" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * The floating wheel: the current project centred and large, the one before and
 * the one after showing at either side, turning on its own until it is paused,
 * hovered or focused. Clicking a side card brings it to the middle; clicking the
 * middle card jumps to its box further down the page, when there is one, and
 * outlines it. Each card has a "Read more" button to the project's own page.
 */
export function ProjectGallery({ projects }: { projects: Project[] }) {
  const n = projects.length;
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const [reduced, setReduced] = useState(true);
  const drag = useRef<{ x: number } | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const set = () => setReduced(mq.matches);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const go = useCallback((d: number) => setActive((a) => (a + d + n) % n), [n]);

  useEffect(() => {
    if (paused || hover || reduced || n < 2) return;
    const t = window.setInterval(() => {
      if (!document.hidden) go(1);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(t);
  }, [paused, hover, reduced, go, n]);

  const pick = (slug: string) => {
    const el = document.getElementById(`project-${slug}`);
    if (!el) return;
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    el.classList.add("is-picked");
    window.setTimeout(() => el.classList.remove("is-picked"), 2600);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  return (
    <section
      className="wheel pj-focus"
      aria-roledescription="carousel"
      aria-label="Projects, use the left and right arrow keys"
      tabIndex={0}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onKeyDown={onKeyDown}
    >
      <div
        className="wheel-stage"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX };
          moved.current = false;
        }}
        onPointerUp={(e) => {
          const s = drag.current;
          drag.current = null;
          if (!s) return;
          const dx = e.clientX - s.x;
          if (Math.abs(dx) > 48) {
            moved.current = true;
            go(dx < 0 ? 1 : -1);
          }
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
      >
        {projects.map((p, i) => {
          const pos = position(i, active, n);
          const here = pos === "0";
          return (
            <article
              key={p.slug}
              className="wheel-card"
              data-pos={pos}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${n}: ${p.title}`}
              aria-hidden={!here}
              onClick={() => {
                if (moved.current) {
                  moved.current = false;
                  return;
                }
                if (here) pick(p.slug);
                else if (pos !== "far") setActive(i);
              }}
            >
              <div className="wheel-img fade-img">
                <Image
                  src={p.shots[0].src}
                  alt={here ? p.shots[0].alt : ""}
                  width={1280}
                  height={800}
                  sizes="(min-width: 900px) 760px, 78vw"
                  loading={i < 3 ? "eager" : "lazy"}
                />
              </div>
              <div className="wheel-copy">
                <h3 className="card-title">{p.title}</h3>
                <p>{p.tagline}</p>
                <Link
                  className="btn btn-sm"
                  href={`/projects/${p.slug}/`}
                  tabIndex={here ? 0 : -1}
                  onClick={(e) => e.stopPropagation()}
                >
                  Read more
                </Link>
              </div>
            </article>
          );
        })}
      </div>

      <div className="wheel-ctl no-print">
        <div className="ctl-pill">
          <button type="button" className="ctl-btn" aria-label="Previous project" onClick={() => go(-1)}>
            <Chevron dir="l" />
          </button>
          <ul className="dots">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <button
                  type="button"
                  className="dot"
                  aria-label={`Show ${p.title}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => setActive(i)}
                />
              </li>
            ))}
          </ul>
          <button type="button" className="ctl-btn" aria-label="Next project" onClick={() => go(1)}>
            <Chevron dir="r" />
          </button>
        </div>
        {!reduced && (
          <button
            type="button"
            className="ctl-pill ctl-btn"
            style={{ width: 44, height: 44 }}
            aria-label={paused ? "Start rotating" : "Pause rotating"}
            aria-pressed={paused}
            onClick={() => setPaused((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ width: 16, height: 16 }}>
              {paused ? <path d="M8 5v14l11-7z" /> : <path d="M7 5h4v14H7zM13 5h4v14h-4z" />}
            </svg>
          </button>
        )}
      </div>
      <p className="sr-only" aria-live={paused || hover ? "polite" : "off"}>
        {projects[active].title}
      </p>
    </section>
  );
}
