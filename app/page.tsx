import {
  about,
  activities,
  awardRecord,
  languages,
  links,
  profile,
  projects,
  venues,
  videos,
  writing,
} from "@/lib/content";
import {
  Columns,
  Entry,
  LevelTag,
  Portrait,
  Section,
  TitleLink,
  VideoEmbed,
} from "@/components/sections";
import { SiteNav } from "@/components/site-nav";
import { HeroBackdrop } from "@/components/hero-backdrop";

// Document order matters — the nav highlights the topmost visible entry.
const nav = [
  { id: "about", label: "About", show: about.length > 0 },
  { id: "activities", label: "Activities", show: activities.length > 0 },
  { id: "performances", label: "Performances", show: videos.length > 0 },
  { id: "honors", label: "Honors", show: awardRecord.length > 0 },
  { id: "venues", label: "Venues", show: venues.length > 0 },
  { id: "contact", label: "Contact", show: true },
];

const recordCount = awardRecord.reduce((n, g) => n + g.items.length, 0);

const [city, region] = profile.location.split(", ");

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
  email: `mailto:${profile.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: city,
    addressRegion: region,
    addressCountry: "US",
  },
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

      <HeroBackdrop />

      <SiteNav
        items={nav.filter((s) => s.show).map(({ id, label }) => ({ id, label }))}
        right={links}
      />

      <main
        id="top"
        className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8"
      >
        {/* Hero: name and everything under it left, matching the section
            labels below; portrait right. Sized so the wallpaper reads. */}
        <div
          id="hero"
          // Full viewport, with the nav's height reserved at the top so the
          // content lands optically centred on screen rather than under it.
          className="flex min-h-[100vh] flex-col justify-center gap-8 pt-24 pb-8 sm:flex-row sm:items-center sm:gap-12"
        >
          <div className="min-w-0 flex-1">
            <h1 className="display-hero">
              {/* The middle name is what stops this holding one line on a
                  phone, and the name reads worse broken than shortened. */}
              <span className="sm:hidden">{profile.shortName}</span>
              <span className="hidden sm:inline">{profile.name}</span>
            </h1>
            <p className="mt-6 max-w-[40ch] text-[22px] leading-snug sm:text-[26px]">
              {profile.tagline}
            </p>
            <p className="mt-4 text-[15px] text-muted">
              {profile.school} · {profile.location}
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel={l.href.startsWith("http") ? "noreferrer" : undefined}
                    className="underline decoration-rule underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* A solid mat in the page background colour, so the portrait reads
              as sitting on the page rather than floating on the wallpaper.
              Square on a phone, where the outside of the mat lines up with the
              name above it; a disc beside the name from `sm` up. */}
          <div className="shrink-0 self-start bg-bg p-3 sm:self-auto sm:rounded-full">
            <Portrait
              light={profile.photoLight}
              dark={profile.photoDark}
              name={profile.name}
            />
          </div>
        </div>

        <div className="space-y-14 lg:space-y-20">
          {about.length > 0 && (
            <Section id="about" label="About">
              <div className="space-y-4 text-[17px] leading-7">
                {about.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Section>
          )}

          {activities.length > 0 && (
            <Section
              id="activities"
              label="Activities"
              count={activities.length}
            >
              <Columns>
                {activities.map((a) => (
                  <Entry
                    key={a.title + a.org}
                    title={a.title}
                    meta={`${a.org} · ${a.period}`}
                    body={a.description}
                  />
                ))}
              </Columns>
            </Section>
          )}

          {videos.length > 0 && (
            <Section
              id="performances"
              label="Performances"
              count={videos.length}
              below={
                <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10">
                  {videos.map((v) => (
                    <VideoEmbed
                      key={v.id}
                      id={v.id}
                      title={v.title}
                      detail={v.detail}
                    />
                  ))}
                </ul>
              }
            />
          )}

          {awardRecord.length > 0 && (
            <Section id="honors" label="Selected Honors" count={recordCount}>
              <Columns>
                {awardRecord.map((group) => (
                  <div key={group.year} className="mb-8">
                    <p className="mb-2.5 text-[13px] uppercase tracking-wider text-muted">
                      {group.year}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li
                          key={item.title}
                          // A hairline where the music awards end. It rides on
                          // the first academic entry rather than sitting in its
                          // own row, so there's nothing to collapse or overflow
                          // on a narrow screen.
                          className={`text-[16px] leading-snug ${
                            item.kind === "academic" &&
                            group.items[i - 1]?.kind === "music"
                              ? "border-t border-rule pt-2.5"
                              : ""
                          }`}
                        >
                          {item.title}
                          <LevelTag level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Columns>
            </Section>
          )}

          {venues.length > 0 && (
            <Section id="venues" label="Venues" count={venues.length}>
              <Columns>
                {venues.map((v) => (
                  <Entry key={v.name} title={v.name} meta={v.city} />
                ))}
              </Columns>
            </Section>
          )}

          {languages.length > 0 && (
            <Section id="languages" label="Languages" count={languages.length}>
              <Columns>
                {languages.map((l) => (
                  <Entry key={l.name} title={l.name} meta={l.level} />
                ))}
              </Columns>
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="projects" label="Projects" count={projects.length}>
              <Columns>
                {projects.map((p) => (
                  <Entry
                    key={p.title}
                    title={p.title}
                    meta={`${p.role} · ${p.year}`}
                    body={p.description}
                    href={p.href}
                  />
                ))}
              </Columns>
            </Section>
          )}

          {writing.length > 0 && (
            <Section id="writing" label="Writing" count={writing.length}>
              <Columns>
                {writing.map((w) => (
                  <Entry
                    key={w.title}
                    title={w.title}
                    meta={`${w.where} · ${w.year}`}
                    href={w.href}
                  />
                ))}
              </Columns>
            </Section>
          )}

          <Section id="contact" label="Contact">
            <p className="text-[17px] leading-7">
              The fastest way to reach me is email.
            </p>
            <p className="mt-4 text-[22px] leading-snug sm:text-[26px]">
              <TitleLink href={`mailto:${profile.email}`}>
                {profile.email}
              </TitleLink>
            </p>
          </Section>
        </div>

      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
