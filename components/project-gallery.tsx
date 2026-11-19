"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import type { Project } from "@/lib/projects";

const AUTOPLAY_MS = 6000;
const SWIPE_PX = 48;

/** Scrolls to a project's box and outlines it for a couple of seconds. */
export function jumpToProject(slug: string) {
  const box = document.getElementById(`project-${slug}`);
  if (!box) return;
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  box.scrollIntoView({ behavior: calm ? "auto" : "smooth", block: "center" });
  box.classList.remove("project-flash");
  void box.offsetWidth; // restart the animation if it is already running
  box.classList.add("project-flash");
  window.setTimeout(() => box.classList.remove("project-flash"), 2700);
}

const calmQuery = "(prefers-reduced-motion: reduce)";
function subscribeCalm(onChange: () => void) {
  const m = window.matchMedia(calmQuery);
  m.addEventListener("change", onChange);
  return () => m.removeEventListener("change", onChange);
}
const readCalm = () => window.matchMedia(calmQuery).matches;

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg
      className="h-[18px] w-[18px] stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path d={dir === "prev" ? "M15 5L8 12l7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

const btn =
  "inline-flex h-10 w-10 items-center justify-center border border-rule text-fg transition-colors hover:border-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ProjectGallery({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  // "auto" follows the visitor's motion setting until they press the button.
  const [mode, setMode] = useState<"auto" | "play" | "pause">("auto");
  const calm = useSyncExternalStore(subscribeCalm, readCalm, () => true);
  const playing = mode === "play" || (mode === "auto" && !calm);
  const [held, setHeld] = useState(false);
  const drag = useRef<{ x: number; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const count = projects.length;

  const go = useCallback((n: number) => setIndex(((n % count) + count) % count), [count]);

  useEffect(() => {
    if (!playing || held) return;
    const id = window.setInterval(() => {
      if (!document.hidden) setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [playing, held, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(0);
    } else if (e.key === "End") {
      e.preventDefault();
      go(count - 1);
    }
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Project gallery"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      className="pj-focus"
    >
      <div
        className="overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onPointerDown={(e) => {
          drag.current = { x: e.clientX, moved: false };
        }}
        onPointerUp={(e) => {
          const d = drag.current;
          drag.current = null;
          if (!d) return;
          const dx = e.clientX - d.x;
          if (Math.abs(dx) >= SWIPE_PX) {
            suppressClick.current = true;
            window.setTimeout(() => (suppressClick.current = false), 0);
            go(index + (dx < 0 ? 1 : -1));
          }
        }}
        onPointerCancel={() => (drag.current = null)}
      >
        <div className="gal-track" style={{ ["--i" as string]: index }} aria-live={playing && !held ? "off" : "polite"}>
          {projects.map((p, i) => {
            const active = i === index;
            const tab = active ? 0 : -1;
            return (
              <article
                key={p.slug}
                className="gal-slide"
                data-active={active}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${count}: ${p.title}`}
                aria-hidden={active ? undefined : true}
                onClick={(e) => {
                  if (suppressClick.current) return;
                  if ((e.target as HTMLElement).closest("a,button")) return;
                  if (!active) go(i);
                  else jumpToProject(p.slug);
                }}
              >
                <div className="cursor-pointer border border-rule">
                  <Image
                    src={p.shots[0].src}
                    alt={p.shots[0].alt}
                    width={1280}
                    height={800}
                    sizes="(min-width: 1024px) 66vw, 84vw"
                    priority={i === 0}
                    loading={i === 0 ? "eager" : "lazy"}
                    draggable={false}
                    className="gal-img block h-auto w-full"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-semibold leading-snug">
                      <button
                        type="button"
                        tabIndex={tab}
                        onClick={() => jumpToProject(p.slug)}
                        className="text-left hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        {p.title}
                      </button>
                    </h3>
                    <p className="text-[15px] leading-6 text-muted">{p.tagline}</p>
                  </div>
                  <a
                    href={`/projects/${p.slug}/`}
                    tabIndex={tab}
                    className="shrink-0 border border-fg px-3.5 py-2 text-[15px] font-semibold leading-none transition-colors hover:bg-fg hover:text-bg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    Read more
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center" role="group" aria-label="Choose a project">
          {projects.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              aria-label={`Show ${p.title}`}
              aria-current={i === index ? "true" : undefined}
              onClick={() => go(i)}
              className="group flex h-8 w-4 items-center justify-center sm:w-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
            >
              <span
                className={`block h-[3px] transition-all duration-300 ease-out ${
                  i === index ? "w-4 bg-fg sm:w-5" : "w-2.5 bg-rule group-hover:bg-muted sm:w-3"
                }`}
              />
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button type="button" className={btn} aria-label="Previous project" onClick={() => go(index - 1)}>
            <Arrow dir="prev" />
          </button>
          <button
            type="button"
            className={btn}
            aria-label={playing ? "Pause the gallery" : "Play the gallery"}
            aria-pressed={!playing}
            onClick={() => setMode(playing ? "pause" : "play")}
          >
            <svg
              className="h-[16px] w-[16px] fill-current"
              viewBox="0 0 24 24"
              aria-hidden
            >
              {playing ? <path d="M6 4h4v16H6zM14 4h4v16h-4z" /> : <path d="M7 4l13 8-13 8z" />}
            </svg>
          </button>
          <button type="button" className={btn} aria-label="Next project" onClick={() => go(index + 1)}>
            <Arrow dir="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
