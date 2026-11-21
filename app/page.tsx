import {
  activities,
  awardRecord,
  bio,
  languages,
  links,
  profile,
  venues,
  videos,
  writing,
} from "@/lib/content";
import {
  Columns,
  Entry,
  LevelPill,
  Portrait,
  Section,
} from "@/components/sections";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { SiteNav } from "@/components/site-nav";
import { VideoGrid } from "@/components/video-grid";
import { nav } from "@/lib/nav";

/**
 * The photographs don't sit behind the whole page: each one belongs to a
 * section, and what it does there depends on the format.
 *
 * On laptop the page is split strictly in half. The photograph fills the left
 * half and fades into one solid colour before it reaches the middle, where the
 * text column begins — a wallpaper. Venues and Languages are the exception:
 * their picture sits at the foot of the pair instead. On mobile it
 * fills the section outright, under the writing as well as the label, and pays
 * for that with a far heavier wash.
 *
 * Mobile used to take a band instead: a strip behind the heading alone. That is
 * archived in `docs/bands-archive.md`, not deleted.
 *
 * Three widths each, and the browser takes what it needs.
 */
const WALLPAPERS = ["/hero-bridge", "/hero-houses", "/hero-canal"];

const srcSet = (base: string) =>
  `${base}-800.webp 800w, ${base}-1400.webp 1400w, ${base}.webp 1800w`;

/* The picture itself, bleeding to both edges of the screen. */
function Photo({
  base,
  position,
  overlay = "section-fade",
  sizes = "100vw",
}: {
  base: string;
  position: string;
  /** What the browser should assume the picture's width is. */
  sizes?: string;
  /**
   * The wash laid over the picture: `section-fade` where text sits beside it,
   * `section-veil` where text sits on top of it. `null` for none, where the
   * caller lays one over a wider area than the picture.
   */
  overlay?: string | null;
}) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export,
          so next/image would serve one size with no srcset at all. */}
      <img
        src={`${base}.webp`}
        srcSet={srcSet(base)}
        sizes={sizes}
        alt=""
        decoding="async"
        loading="lazy"
        className={`h-full w-full object-cover ${position}`}
      />
      {overlay && <div className={`${overlay} absolute inset-0`} />}
    </>
  );
}

/**
 * The mobile backdrop: the photograph filling a whole section below `lg`, where
 * the label sits above the writing and the text runs the full width of the
 * screen. There is no solid column for the writing to stand on at these widths,
 * so the wash has to do that work instead — see `section-veil`.
 *
 * A section can have one of these without having a wallpaper, and the other way
 * round. `position` is which part of the picture survives the crop, so two
 * sections can share a photograph and show different parts of it.
 */
function MobileBackdrop({
  base,
  position,
}: {
  base: string;
  position: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden lg:hidden"
    >
      <Photo base={base} position={position} overlay="section-veil" />
    </div>
  );
}

/**
 * A wallpaper: the photograph filling a whole section, from `lg` up, where the
 * label has moved beside the text and there is a field for it to fill.
 */
function SectionWallpaper({
  base,
  position,
}: {
  base: string;
  position: string;
}) {
  return (
    <div
      aria-hidden
      className="reveal-fade absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 overflow-hidden lg:block"
    >
      {/* The picture takes the left half and no more; the fade is laid over
          the whole wallpaper, so it also fills the right half with colour. */}
      <div className="absolute inset-y-0 left-0 w-1/2">
        <Photo base={base} position={position} overlay={null} sizes="50vw" />
      </div>
      <div className="section-fade absolute inset-0" />
    </div>
  );
}

/**
 * The picture at the foot of Venues and Languages: a background that fills
 * the bottom of the pair edge to edge and fades upward into the page colour.
 * The pair is padded by the same height (`photo-stage`), so it sits below the
 * last card rather than behind it.
 */
function BottomPhoto({ base, position }: { base: string; position: string }) {
  return (
    <div
      aria-hidden
      className="photo-bottom reveal-fade absolute bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden"
    >
      <Photo
        base={base}
        position={position}
        overlay="bottom-fade"
      />
    </div>
  );
}


/**
 * Structured data. The prose on this page tells a reader who Julian is; this
 * tells Google the same thing in the form it actually parses -- a person, a
 * pianist, at this school, with this channel -- so a search for his name can
 * match this page rather than one of the other pianists named Chen.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: ["Julian Chen", "Yuzhe Chen"],
  jobTitle: "Pianist",
  description: profile.metaDescription,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.photoLight ?? "/portrait-light.jpg"}`,
  affiliation: [
    { "@type": "EducationalOrganization", name: "Langley High School" },
    { "@type": "MusicGroup", name: "National Symphony Orchestra" },
  ],
  // The awards carry the competition names people search alongside his.
  award: awardRecord.flatMap((g) =>
    g.items.map((i) => `${i.title} (${g.year})`),
  ),
  knowsLanguage: languages.map((l) => l.name),
  // Ties this page to the channel, so the two reinforce each other.
  sameAs: links.map((l) => l.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* The top of the page: above the profile picture, and above `main`. A
          phone opens on the picture, so anything anchored to where the writing
          starts would skip it. Both the name in the bar and the arrow at the
          foot of the page come back here. */}
      <div id="top" aria-hidden />

      <SiteNav
        items={nav}
        right={links}
        name={profile.shortName}
      />

      {/*
        * Below `lg` — phones and tablets alike — the page opens on the portrait
        * itself, filling the screen edge to edge, with the arrow at its foot
        * going down to the Biography. A laptop has it bleeding in beside the
        * text instead, so this stops there.
        *
        * The crop is held high: the face is the reason the picture is here, and
        * a centred crop on a tall box puts the chin at the bottom edge.
        */}
      <div className="reveal-fade relative h-[78svh] w-full overflow-hidden lg:hidden">
        <Portrait
          light={profile.photoLight}
          name={profile.name}
          className="portrait-breathe absolute inset-0 h-full w-full"
          position="object-[50%_18%]"
        />
        <div className="portrait-wash absolute inset-0" />

        <a
          href="#biography"
          aria-label="Skip to the biography"
          className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-12 justify-center text-fg"
        >
          <svg
            className="hero-nudge h-7 w-7 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 9.5L12 15.5L18 9.5" />
          </svg>
        </a>
      </div>

      {/* No id of its own. What used to be anchored here is the biography,
          and the biography is a section with its own. */}
      <main className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        {/* The name is in the bar now, and the first section carries it at
            full size, so the page opens straight into it. Every section is
            ruled off from the one above — except the first, whose rule would
            be a line across the top of the page with nothing above it. */}
        {/* Only the bar's own thickness above the first section — nothing
            else between the menu and the picture under it. */}
        <div className="space-y-14 pt-14 [&>section:first-child]:border-t-0 sm:pt-[4.25rem] lg:space-y-20">
          {bio.length > 0 && (
            <Section
              large
              id="biography"
              label="Biography"
              // On mobile the profile picture has already had the screen above
              // this section, so the section itself takes a scenery photograph
              // like every other one — hero-bridge, which nothing else wears at
              // these widths.
              mobileBackdrop={
                <MobileBackdrop
                  base={WALLPAPERS[0]}
                  position="object-[50%_22%]"
                />
              }
              // On laptop the profile picture is this section's wallpaper: it
              // sits on the heading side and bleeds to the edge of the screen,
              // fading rightward into the page colour so the text sits on solid
              // ground.
              backdrop={
                <div
                  aria-hidden
                  className="reveal-fade absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 overflow-hidden bg-[var(--wash)] lg:block"
                >
                  {/* The picture is square, so its box is too: half the page
                      wide and as tall as it is wide. Nothing is cropped
                      sideways at any width, which is what a box stretched to
                      the section's height couldn't promise — its crop moved
                      with the length of the text and the size of the window,
                      and took half the face with it. A section shorter than
                      the square crops the foot of the picture; a taller one
                      lets the picture fade out into the colour beneath it. The
                      fade-out is inside the breathing box, so the two stay
                      together as it moves. */}
                  <div className="portrait-breathe absolute left-0 top-0 aspect-square w-1/2">
                    <Portrait
                      light={profile.photoLight}
                      name=""
                      className="h-full w-full"
                      position="object-center"
                    />
                    <div className="portrait-fade-y absolute inset-0" />
                  </div>
                  <div className="portrait-fade-x absolute inset-0" />
                </div>
              }
            >
              <div className="space-y-4 text-[17px] leading-7">
                {bio.map((p, i) => (
                  <p
                    key={i}
                    className="reveal"
                    style={{ ["--d" as string]: `${Math.min(i, 3) * 80}ms` }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            </Section>
          )}

          {activities.length > 0 && (
            <Section
              large
              id="activities"
              label="Activities"
              // Two different photographs, one per format: hero-bridge is the
              // Biography's on mobile, so this takes hero-houses there — the one
              // Selected Honors wears on laptop, which no longer carries a
              // picture at those widths.
              mobileBackdrop={
                <MobileBackdrop
                  base={WALLPAPERS[1]}
                  position="object-[50%_28%]"
                />
              }
              backdrop={
                <SectionWallpaper
                  base={WALLPAPERS[0]}
                  position="object-[50%_28%]"
                />
              }
            >
              <Columns>
                {activities.map((a, i) => (
                  <Entry
                    key={a.title + a.org}
                    index={i}
                    title={a.title}
                    meta={`${a.org} - ${a.period}`}
                    body={a.description}
                  />
                ))}
              </Columns>
            </Section>
          )}

          {videos.length > 0 && (
            <Section large id="performances" label="Performances" stacked>
              <VideoGrid videos={videos} />
            </Section>
          )}

          {awardRecord.length > 0 && (
            <Section large id="honors" label="Selected Honors" stacked>
              <ol className="years">
                {awardRecord.map((group) => (
                  <li key={group.year} className="year reveal">
                    <h3 className="year-n title">{group.year}</h3>
                    <ul>
                      {group.items.map((item, i) => (
                        <li
                          key={item.title}
                          // A hairline where the music awards end. It rides on
                          // the first academic entry rather than sitting in its
                          // own row, so there's nothing to collapse or overflow
                          // on a narrow screen.
                          className={`award${
                            item.kind === "academic" &&
                            group.items[i - 1]?.kind === "music"
                              ? " sep"
                              : ""
                          }`}
                        >
                          <span>{item.title}</span>
                          <LevelPill level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Section>
          )}

          {/* The pair shares one picture, at its foot: rows for the venues,
              cards for the languages, and the canal underneath. */}
          {(venues.length > 0 || languages.length > 0) && (
            <div className="photo-stage relative isolate space-y-14 lg:space-y-20">
              <BottomPhoto base={WALLPAPERS[2]} position="object-[50%_60%]" />

              {venues.length > 0 && (
                <Section large id="venues" label="Venues" stacked>
                  <div className="venue-split">
                    <ul className="rows">
                      {venues.map((v, i) => (
                        <li
                          key={v.name}
                          className="row reveal"
                          style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
                        >
                          <span className="row-n title">{v.name}</span>
                          <span className="row-m detail">{v.city}</span>
                        </li>
                      ))}
                    </ul>
                    <div
                      aria-hidden
                      className="venue-photo reveal-scale"
                    >
                      {/* Filled by the cell, not sized by the picture: the list
                          sets the height. */}
                      <div className="absolute inset-0">
                        <Photo
                          base={WALLPAPERS[1]}
                          position="object-[50%_40%]"
                          overlay={null}
                          sizes="(min-width: 1024px) 50vw, 100vw"
                        />
                      </div>
                    </div>
                  </div>
                </Section>
              )}

              {languages.length > 0 && (
                <Section large id="languages" label="Languages" stacked>
                  <ul className="langs">
                    {languages.map((l, i) => (
                      <li
                        key={l.name}
                        className="lang reveal"
                        style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
                      >
                        <h3 className="lang-n title">{l.name}</h3>
                        <p className="detail">{l.level}</p>
                      </li>
                    ))}
                  </ul>
                </Section>
              )}
            </div>
          )}

          {/* The Projects page's wheel, on a band of the off-white that bleeds to
              both edges. The band stops at the wheel: the button under it is
              the same off-white, and would vanish on it. */}
          {projects.length > 0 && (
            <Section large id="projects" label="Projects" stacked>
              <div className="relative isolate">
                <div
                  aria-hidden
                  className="reveal-fade absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-[var(--wash)]"
                />
                <div className="-mx-5 py-8 sm:-mx-8">
                  <ProjectGallery projects={projects} />
                </div>
              </div>
              <p className="reveal mt-10 text-center">
                <Link href="/projects/" className="btn">
                  View projects
                </Link>
              </p>
            </Section>
          )}

          {writing.length > 0 && (
            <Section large id="writing" label="Writing">
              <Columns>
                {writing.map((w, i) => (
                  <Entry
                    key={w.title}
                    index={i}
                    title={w.title}
                    meta={`${w.where} - ${w.year}`}
                    href={w.href}
                  />
                ))}
              </Columns>
            </Section>
          )}

        </div>

        {/* At the foot of the page rather than under the name — there's no
            screenful of hero for it to sit at the bottom of any more. It points
            back the way you came, as far as the page goes: on a phone that is
            the profile picture, not the first line of writing. The smooth
            scroll is already set in the stylesheet, so the plain anchor is the
            whole mechanism. */}
        <a
          href="#top"
          aria-label="Back to the top"
          className="mx-auto mt-16 flex w-12 justify-center text-muted"
        >
          <svg
            className="hero-nudge h-7 w-7 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 15.5L12 9.5L18 15.5" />
          </svg>
        </a>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
