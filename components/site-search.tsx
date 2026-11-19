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
      className="h-[19px] w-[19px] shrink-0 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
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
      className={`nav-tab icon-pop inline-flex shrink-0 items-center justify-center px-2 py-2 sm:px-3 ${className}`}
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
      className="no-print fixed inset-0 z-[60] bg-bg/80 px-5 pt-[12vh]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search the site"
        className="mx-auto w-full max-w-xl border border-fg bg-bg"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-rule px-4">
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
            placeholder="Search pages and projects"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            className="h-14 w-full bg-transparent text-[16px] text-fg placeholder:text-muted focus:outline-none"
          />
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="shrink-0 px-2 py-2 text-[14px] font-semibold text-muted hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Esc
          </button>
        </div>
        <ul id={listId} role="listbox" aria-label="Suggestions" className="max-h-[50vh] overflow-y-auto">
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
              className={`flex cursor-pointer items-baseline justify-between gap-4 border-b border-rule px-4 py-3 last:border-b-0 ${
                i === active ? "bg-fg text-bg" : ""
              }`}
            >
              <span className="min-w-0">
                <span className="block text-[16px] font-semibold leading-snug">{r.title}</span>
                <span className={`block truncate text-[14px] leading-snug ${i === active ? "text-bg/80" : "text-muted"}`}>
                  {r.description}
                </span>
              </span>
              <span className={`shrink-0 text-[13px] ${i === active ? "text-bg/80" : "text-muted"}`}>{r.kind}</span>
            </li>
          ))}
          {query.trim() !== "" && results.length === 0 && (
            <li className="px-4 py-3 text-[14px] text-muted" role="presentation">
              Nothing matches that.
            </li>
          )}
        </ul>
      </div>
    </div>,
    document.body,
  );
}
