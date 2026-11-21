"use client";

import { useState } from "react";

type Video = { id: string; title: string; detail?: string };

/**
 * The performances, two across. Each one is its thumbnail until it is pressed,
 * and only then loads the player (from youtube-nocookie), so the page does not
 * pull in six players to be looked at.
 */
export function VideoGrid({ videos }: { videos: Video[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <ul className="vgrid">
      {videos.map((v, i) => (
        <li key={v.id}>
          <div className="reveal-scale" style={{ ["--d" as string]: `${(i % 2) * 80}ms` }}>
            {playing === v.id ? (
              <div className="vid">
                <iframe
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
          <p className="vid-title">{v.title}</p>
          {v.detail && <p className="vid-detail">{v.detail}</p>}
        </li>
      ))}
    </ul>
  );
}
