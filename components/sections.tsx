import Image from "next/image";
import type { ReactNode } from "react";

/**
 * The page's one structural idea, lifted from the reference: a hairline rule,
 * a giant uppercase label on the left, the content pushed right, and a big
 * recessed count at the far edge. Stacks vertically below `lg`.
 */
export function Section({
  id,
  label,
  count,
  as: Heading = "h2",
  children,
  aside,
  below,
}: {
  id: string;
  label: string;
  count?: number;
  /** The first section's label is the page's name, so it's the page's h1. */
  as?: "h1" | "h2";
  children?: ReactNode;
  /** Sits under the label, in the label's own column — for the portrait. */
  aside?: ReactNode;
  /** Rendered full-width beneath the label row — for the video grid. */
  below?: ReactNode;
}) {
  const n = count === undefined ? null : String(count).padStart(2, "0");
  return (
    <section id={id} className="border-t border-rule pt-5 lg:pt-7">
      {/* The count column is a fixed width and always present, even when a
          section has no count — otherwise About and Contact would claim its
          space and their text would start further left than everything else. */}
      <div className="grid gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)_5.5rem] lg:gap-x-10">
        {/* Tighter gap on a phone: every pixel between the label and its
            count is a pixel the longest label doesn't have. */}
        <div>
          <div className="flex items-start justify-between gap-3 sm:gap-6">
            <Heading className="display">{label}</Heading>
            {n && <span className="count lg:hidden">{n}</span>}
          </div>
          {aside}
        </div>
        {/* A section with no count has no use for the column that holds it,
            so its text takes that space too and runs to the right margin. */}
        <div className={`lg:pt-2 ${n ? "" : "lg:col-span-2"}`}>{children}</div>
        <span className="count hidden text-right lg:block">{n}</span>
      </div>
      {below}
    </section>
  );
}

/**
 * Two-column flow, the way the reference sets its lists: entries run down the
 * first column, then continue in the second. Groups never split across columns.
 */
export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="gap-x-10 md:columns-2 [&>*]:break-inside-avoid">
      {children}
    </div>
  );
}

export function Entry({
  title,
  meta,
  body,
  href,
}: {
  title: string;
  meta?: string;
  body?: string;
  href?: string;
}) {
  return (
    <div className="mb-6">
      <p className="text-[17px] leading-snug">
        <TitleLink href={href}>{title}</TitleLink>
      </p>
      {meta && <p className="mt-1 text-[15px] leading-snug text-muted">{meta}</p>}
      {body && <p className="mt-2 text-[15px] leading-6 text-muted">{body}</p>}
    </div>
  );
}

// The default: the disc that sits beside the name on a wide screen. The phone
// hero passes its own shape instead — a square as wide as the column. The
// source images are already square, so neither one crops.
const PORTRAIT_SIZE = "h-[min(64vw,320px)] w-[min(64vw,320px)] rounded-full";

export function Monogram({
  name,
  className = PORTRAIT_SIZE,
}: {
  name: string;
  className?: string;
}) {
  const initials = name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      aria-hidden
      className={`flex shrink-0 items-center justify-center rounded-full border border-rule text-5xl font-extrabold tracking-tight ${className}`}
    >
      {initials}
    </div>
  );
}

export function Portrait({
  light,
  name,
  className = PORTRAIT_SIZE,
}: {
  light: string | null;
  name: string;
  className?: string;
}) {
  if (!light) return <Monogram name={name} className={className} />;

  return (
    <div className={`relative shrink-0 overflow-hidden ${className}`}>
      <Image
        src={light}
        alt={name}
        fill
        priority
        sizes="(max-width: 640px) 100vw, 320px"
        className="object-cover"
      />
    </div>
  );
}

export function TitleLink({
  href,
  children,
}: {
  href?: string;
  children: ReactNode;
}) {
  if (!href) return <>{children}</>;
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="rule-hover"
    >
      {children}
    </a>
  );
}

export function VideoEmbed({
  id,
  title,
  detail,
}: {
  id: string;
  title: string;
  detail?: string;
}) {
  return (
    <li>
      <div className="no-print aspect-video w-full overflow-hidden border border-rule">
        <iframe
          // nocookie so a visitor isn't tracked just for landing on the page
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
      <p className="mt-2.5 text-[17px] leading-snug">
        <TitleLink href={`https://www.youtube.com/watch?v=${id}`}>
          {title}
        </TitleLink>
      </p>
      {detail && (
        <p className="mt-1 text-[15px] leading-snug text-muted">{detail}</p>
      )}
    </li>
  );
}

/** International and National read as the top tier; the rest stay quiet. */
export function LevelTag({ level }: { level: string }) {
  const loud = level === "International" || level === "National";
  return (
    <span
      className={`ml-2 align-middle text-[11px] uppercase tracking-wider ${
        loud ? "text-fg" : "text-muted"
      }`}
    >
      {level}
    </span>
  );
}
