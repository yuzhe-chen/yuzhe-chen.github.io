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
  mobileBackdrop,
  stacked = false,
  large = false,
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
   * The laptop layer behind the section's own content — the wallpaper that
   * bleeds out to the edge of the screen and fades rightward into the page
   * colour. Sits under everything here via `isolate`, so it can't come out
   * over the text.
   */
  backdrop?: ReactNode;
  /**
   * The same slot for mobile, where the picture fills the section outright
   * rather than sitting beside the text. Separate from `backdrop` because the
   * two formats want different room underneath, and a single `ReactNode` can't
   * be asked which widths it covers.
   */
  mobileBackdrop?: ReactNode;
  /**
   * Heading above the content at full width, rather than the heading in the
   * left half and the content in the right. For content that wants the whole
   * row: the rail of videos, the honors, the rows and cards.
   */
  stacked?: boolean;
  /**
   * The home page's heading: large, in the Apple version's type, and revealed
   * as it scrolls in. Without it the heading is the small `t-h2` that the
   * Projects and Research pages use.
   */
  large?: boolean;
}) {
  // Room under the text wherever a picture fills the section and would
  // otherwise stop dead on the last line of writing.
  //
  // Mobile is asked separately because it only recently started needing this:
  // a section is padded there when it carries a picture of its own, and left
  // alone when it doesn't. The laptop figure answers to either slot, so a
  // section whose laptop wallpaper is hung on a wrapper around it — Venues and
  // Languages share one — still gets its room from the mobile slot.
  const roomBelow = [
    mobileBackdrop ? "pb-10" : "",
    backdrop || mobileBackdrop ? "lg:pb-16" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={`relative isolate border-t border-rule pt-5 lg:pt-7 ${roomBelow}`}
    >
      {backdrop}
      {mobileBackdrop}
      {/* Two strict halves from `lg`: the label in the left one, everything it
          introduces in the right. The gap is padding inside each half rather
          than a grid gap, so the boundary is exactly the middle of the page
          — which is where the wallpaper's fade has to be finished by. Stacked
          sections put the heading above instead. */}
      <div
        className={
          stacked ? "" : "grid gap-y-9 lg:grid-cols-2 lg:gap-y-6"
        }
      >
        <div className={stacked ? "mb-9 lg:mb-12" : "lg:pr-10"}>
          <Heading
            className={
              Heading === "h1"
                ? "display"
                : large
                  ? "heading reveal"
                  : "t-h2"
            }
          >
            {label}
          </Heading>
          {aside}
        </div>
        {children && (
          <div className={stacked ? "" : "lg:pl-10 lg:pt-2"}>{children}</div>
        )}
      </div>
      {below}
    </section>
  );
}

/**
 * Two-column flow, the way the reference sets its lists: entries run down the
 * first column, then continue in the second. Groups never split across columns.
 * From `lg` the content is only half the page, so it takes one column there and
 * goes back to two once the half is wide enough (`2xl`, 1536px) to hold them.
 */
export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="gap-x-10 md:columns-2 lg:columns-1 2xl:columns-2 [&>*]:break-inside-avoid">
      {children}
    </div>
  );
}

export function Entry({
  title,
  meta,
  body,
  href,
  index,
  children,
}: {
  title: string;
  meta?: string;
  body?: string;
  href?: string;
  /** Position in its list. Giving one makes the entry reveal on scroll, later
   *  the further down the list it is; without one it simply appears. */
  index?: number;
  /** Anything that follows the body, such as a row of links. */
  children?: ReactNode;
}) {
  return (
    <div
      className={`mb-6${index === undefined ? "" : " reveal"}`}
      style={
        index === undefined
          ? undefined
          : { ["--d" as string]: `${(index % 3) * 80}ms` }
      }
    >
      <p className="text-[17px] leading-snug">
        <TitleLink href={href}>{title}</TitleLink>
      </p>
      {meta && <p className="mt-1 text-[15px] leading-snug text-muted">{meta}</p>}
      {body && <p className="mt-2 text-[15px] leading-6 text-muted">{body}</p>}
      {children}
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

/**
 * International and National read as the top tier, filled in; the rest are
 * outlined.
 */
export function LevelPill({ level }: { level: string }) {
  const loud = level === "International" || level === "National";
  const className = `pill${loud ? " loud" : ""}`;
  return <span className={className}>{level}</span>;
}
