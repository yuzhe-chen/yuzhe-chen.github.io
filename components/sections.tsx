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
   * The home page's heading: the large uppercase label, in a box that stays
   * under the bar, revealed as it scrolls in. Without it the heading is the
   * small `t-h2` that the Projects and Research pages use.
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
      // The Projects pages still rule each section off; the home page doesn't.
      className={`relative isolate pt-5 lg:pt-7 ${
        large ? "" : "border-t border-rule"
      } ${roomBelow}`}
    >
      {backdrop}
      {mobileBackdrop}
      {/* Two strict halves from `lg`: the label in the left one, everything it
          introduces in the right. The gap is padding inside the right half
          rather than a grid gap, so the boundary is exactly the middle of the
          page — which is where the wallpaper's fade has to be finished by.
          Stacked sections put the heading above instead.

          A large heading sits in a box of the page colour, rounded, so it
          reads as a label where it lies over a photograph. Over plain page
          colour the box is the same colour as what's behind it and simply
          isn't there. */}
      <div className={stacked ? "" : "lg:grid lg:grid-cols-2 lg:gap-y-6"}>
        <div
          className={
            large
              ? `-ml-3 mb-8 w-fit rounded-2xl bg-bg py-1 pl-3 pr-5 ${
                  stacked ? "lg:mb-10" : "lg:mb-0 lg:self-start"
                }`
              : stacked
                ? "mb-9 lg:mb-12"
                : "mb-9 lg:mb-0"
          }
        >
          <Heading
            className={
              Heading === "h1"
                ? "display"
                : large
                  ? "display reveal"
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
 * Entries in a grid: two across where the content has the whole width (tablet),
 * one down the right half from `lg`, where it only has half the page. A grid
 * rather than CSS columns: columns balance by height and break entries across
 * the gap unevenly, and an entry that is still sliding in (see `reveal`) is
 * transformed, which columns lay out badly. Reading order is left to right.
 */
export function Columns({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-x-10 md:grid-cols-2 lg:grid-cols-1">
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
      className={`pb-6${index === undefined ? "" : " reveal"}`}
      style={
        index === undefined
          ? undefined
          : { ["--d" as string]: `${(index % 3) * 80}ms` }
      }
    >
      {/* Everything is the body colour now, so what sets the title apart is
          its weight. */}
      <p className="title">
        <TitleLink href={href}>{title}</TitleLink>
      </p>
      {meta && <p className="detail mt-1">{meta}</p>}
      {body && <p className="detail mt-2 leading-6">{body}</p>}
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

/** One badge for every level: the same colour and the same size. */
export function LevelPill({ level }: { level: string }) {
  return <span className="pill">{level}</span>;
}
