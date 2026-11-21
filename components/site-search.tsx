"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { searchEntries } from "@/lib/search-data";

const OPEN_EVENT = "site-search-open";

/**
 * The hidden page is reached by typing its name exactly and pressing Enter.
 * It is deliberately not in the search data, so it can never be suggested.
 */
const HIDDEN_WORD = "research";
const HIDDEN_HREF = "/research/";

function SearchIcon() {
  return (
    <svg
      className="h-5 w-5 shrink-0 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L21 21" />
    </svg>
  );
}

/** The button in the header. It only asks the one overlay to open. */
export function SearchButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      aria-label="Search the site"
      aria-haspopup="dialog"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={`ibtn ${className}`}
    >
      <SearchIcon />
    </button>
  );
}

function matches(query: string) {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return [];
  return searchEntries
    .map((e) => {
      const title = e.title.toLowerCase();
      const rest = `${e.description} ${e.keywords}`.toLowerCase();
      let score = 0;
      for (const w of words) {
        // A word counts when it starts a word, so "lat" finds Latin but not translator.
        const starts = new RegExp(`(^|[^a-z0-9])${w.replace(/[^a-z0-9]/g, "")}`);
        if (title.startsWith(w)) score += 4;
        else if (starts.test(title)) score += 3;
        else if (starts.test(rest)) score += 1;
        else return { e, score: 0 };
      }
      return { e, score };
    })
    .filter((m) => m.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((m) => m.e);
}

/** One of these per page. It listens for the header buttons. */
export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const listId = useId();

  const results = useMemo(() => matches(query), [query]);

  useEffect(() => {
    const show = () => {
      returnTo.current = document.activeElement as HTMLElement | null;
      setQuery("");
      setActive(0);
      setOpen(true);
    };
    window.addEventListener(OPEN_EVENT, show);
    return () => window.removeEventListener(OPEN_EVENT, show);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    returnTo.current?.focus();
  };

  const go = (href: string) => {
    setOpen(false);
    window.location.assign(href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (results.length) setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (results.length) setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim().toLowerCase() === HIDDEN_WORD) go(HIDDEN_HREF);
      else if (results[active]) go(results[active].href);
    }
  };

  if (!open) return null;

  return createPortal(
    <div
      className="search-scrim no-print"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="search-box"
        onKeyDown={onKeyDown}
      >
        <div className="search-top">
          <SearchIcon />
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="go"
            placeholder="Search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
          />
          <button type="button" className="t-cap muted" onClick={close} aria-label="Close search">
            Esc
          </button>
        </div>
        <ul id={listId} role="listbox" aria-label="Suggestions" className="search-list">
          {results.map((r, i) => (
            <li
              key={r.href + r.title}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onMouseDown={(e) => {
                e.preventDefault();
                go(r.href);
              }}
              className="search-item"
            >
              <span className="min-w-0">
                <span className="search-t">{r.title}</span>
                <span className="search-d">{r.description}</span>
              </span>
              <small>{r.kind}</small>
            </li>
          ))}
          {query.trim() !== "" && results.length === 0 && (
            <li className="search-item muted" role="presentation">
              Nothing matches that.
            </li>
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
