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
  children,
  below,
}: {
  id: string;
  label: string;
  count?: number;
  children?: ReactNode;
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
        <div className="flex items-start justify-between gap-6">
          <h2 className="display">{label}</h2>
          {n && <span className="count lg:hidden">{n}</span>}
        </div>
        <div className="lg:pt-2">{children}</div>
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

const PORTRAIT_SIZE = "h-[min(64vw,320px)] w-[min(64vw,320px)]";

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
  src,
  name,
  className = PORTRAIT_SIZE,
}: {
  src: string | null;
  name: string;
  className?: string;
}) {
  if (!src) return <Monogram name={name} className={className} />;
  return (
    // 640px source against a 320px display box — sharp on a 2x screen.
    <Image
      src={src}
      alt={name}
      width={640}
      height={640}
      priority
      className={`shrink-0 rounded-full object-cover ${className}`}
    />
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
      className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
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
