"use client";

import { useRef, useState } from "react";
import { TitleLink } from "@/components/sections";

type Video = { id: string; title: string; detail?: string };

function Chevron({ dir }: { dir: "l" | "r" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={dir === "l" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * A sideways rail of performances. Each one is its thumbnail until it is
 * pressed, and only then loads the player (from youtube-nocookie), so the page
 * doesn't pull in six players just to be looked at.
 */
export function VideoRail({ videos }: { videos: Video[] }) {
  const rail = useRef<HTMLUListElement>(null);
  const [playing, setPlaying] = useState<string | null>(null);

  const scrollBy = (dir: number) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = (card?.getBoundingClientRect().width ?? 600) + 24;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div>
      <ul
        className="rail"
        ref={rail}
        tabIndex={0}
        aria-label="Performances, scroll sideways"
      >
        {videos.map((v, i) => (
          <li key={v.id}>
            <div
              className="reveal-scale"
              style={{ ["--d" as string]: `${Math.min(i, 3) * 80}ms` }}
            >
              {playing === v.id ? (
                <div className="vid no-print">
                  <iframe
                    // nocookie so a visitor isn't tracked just for landing here
                    src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`}
                    title={v.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <button
                  type="button"
                  className="vid"
                  onClick={() => setPlaying(v.id)}
                  aria-label={`Play ${v.title}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- a remote thumbnail */}
                  <img
                    src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="vid-play" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7 4.5v15l13-7.5z" />
                    </svg>
                  </span>
                </button>
              )}
            </div>
            <p className="mt-2.5 text-[17px] leading-snug">
              <TitleLink href={`https://www.youtube.com/watch?v=${v.id}`}>
                {v.title}
              </TitleLink>
            </p>
            {v.detail && (
              <p className="mt-1 text-[15px] leading-snug">{v.detail}</p>
            )}
          </li>
        ))}
      </ul>
      <div className="rail-ctl no-print">
        <button
          type="button"
          className="rail-btn"
          aria-label="Earlier performances"
          onClick={() => scrollBy(-1)}
        >
          <Chevron dir="l" />
        </button>
        <button
          type="button"
          className="rail-btn"
          aria-label="Later performances"
          onClick={() => scrollBy(1)}
        >
          <Chevron dir="r" />
        </button>
      </div>
    </div>
  );
}
