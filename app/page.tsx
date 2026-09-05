import {
  about,
  activities,
  awardRecord,
  honors,
  languages,
  links,
  profile,
  projects,
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
  { id: "honors", label: "Honors", show: honors.length > 0 },
  { id: "performances", label: "Performances", show: videos.length > 0 },
  { id: "record", label: "Record", show: awardRecord.length > 0 },
  { id: "activities", label: "Activities", show: activities.length > 0 },
  { id: "contact", label: "Contact", show: true },
];

const recordCount = awardRecord.reduce((n, g) => n + g.items.length, 0);

export default function Home() {
  const email = links.find((l) => l.label === "Email")?.href ?? "";

  return (
    <>
      <HeroBackdrop light="/hero-light.jpg" dark="/hero-dark.jpg" />

      <SiteNav
        items={nav.filter((s) => s.show).map(({ id, label }) => ({ id, label }))}
        right={links.filter((l) => l.label !== "Résumé (PDF)")}
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
          className="flex min-h-[100vh] flex-col justify-center gap-10 pt-24 pb-8 sm:flex-row sm:items-center sm:gap-12"
        >
          <div className="min-w-0 flex-1">
            <h1 className="display-xl">{profile.name}</h1>
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
          {/* Solid disc so the portrait doesn't dissolve into the sky — in the
              text colour, so it reads as part of the type, not a stray blob. */}
          <div className="shrink-0 self-start rounded-full bg-fg p-3 sm:self-auto">
            <Portrait src={profile.photo} name={profile.name} />
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

          {honors.length > 0 && (
            <Section id="honors" label="Honors" count={honors.length}>
              <Columns>
                {honors.map((a) => (
                  <Entry
                    key={a.title}
                    title={a.title}
                    meta={`${a.org} · ${a.year}`}
                    body={a.note || undefined}
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
            <Section id="record" label="Record" count={recordCount}>
              <Columns>
                {awardRecord.map((group) => (
                  <div key={group.year} className="mb-8">
                    <p className="mb-2.5 text-[13px] uppercase tracking-wider text-muted">
                      {group.year}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item) => (
                        <li key={item.title} className="text-[16px] leading-snug">
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
              <TitleLink href={email || undefined}>
                {email.replace("mailto:", "")}
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
