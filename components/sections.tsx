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
  as: Heading = "h2",
  children,
  aside,
  below,
  backdrop,
}: {
  id: string;
  label: string;
  /** The first section's label is the page's name, so it's the page's h1. */
  as?: "h1" | "h2";
  children?: ReactNode;
  /** Sits under the label, in the label's own column — for the portrait. */
  aside?: ReactNode;
  /** Rendered full-width beneath the label row — for the video grid. */
  below?: ReactNode;
  /**
   * A layer behind the section's own content — the photograph that bleeds out
   * to the edge of the screen and fades into the page colour. Sits under
   * everything here via `isolate`, so it can't come out over the text.
   */
  backdrop?: ReactNode;
}) {
  return (
    <section
      id={id}
      // Room under the text on a laptop, where a wallpaper fills the section
      // and would otherwise stop on the last line of writing. Below that the
      // photograph is only a band behind the heading, so there is nothing
      // down there needing room.
      className={`relative isolate border-t border-rule pt-5 lg:pt-7 ${
        backdrop ? "lg:pb-16" : ""
      }`}
    >
      {backdrop}
      {/* Label on the left, everything it introduces on the right, running to
          the margin — there is no third column now that nothing is counted. */}
      {/* More air under the label on a phone, where the photograph is a band
          behind it and the writing would otherwise start against its edge.
          The band is a phone thing, so the extra air is too. */}
      <div className="grid gap-y-9 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-x-10 lg:gap-y-6">
        <div>
          <Heading className="display">{label}</Heading>
          {aside}
        </div>
        <div className="lg:pt-2">{children}</div>
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
  position = "object-center",
}: {
  light: string | null;
  name: string;
  className?: string;
  /** Which part of the picture survives the crop. */
  position?: string;
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
        className={`object-cover ${position}`}
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
