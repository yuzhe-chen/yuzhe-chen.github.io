import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { links, profile } from "@/lib/content";
import { projectBySlug, projects } from "@/lib/projects";
import { SiteNav } from "@/components/site-nav";
import { navFromElsewhere } from "@/lib/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} - ${profile.shortName}`,
    description: p.does,
    alternates: { canonical: `/projects/${p.slug}/` },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-09-05" to "Sep 5, 2026", with no time zone involved; anything else as written. */
function when(d: string) {
  const [y, m, day] = d.split("-").map(Number);
  if (!y || !m || !day) return d;
  return `${MONTHS[m - 1]} ${day}, ${y}`;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const site = p.links[0];
  const repo = p.links.find((l) => l !== site && /github\.com/.test(l.href));
  const shots = p.shots.length > 1 ? p.shots.slice(1) : p.shots;

  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} home="/" />

      <main className="grow">
        <section className="pp-hero" aria-labelledby="pp-title">
          <div className="pj-wrap">
            <p className="pj-eyebrow reveal">{p.status}</p>
            <h1 id="pp-title" className="display reveal" style={{ ["--d" as string]: "80ms" }}>
              {p.title}
            </h1>
            <p className="pj-lead reveal" style={{ ["--d" as string]: "160ms" }}>
              {p.tagline}
            </p>
            <div className="cta-row reveal" style={{ ["--d" as string]: "240ms" }}>
              {site && (
                <a className="btn" href={site.href} target="_blank" rel="noopener noreferrer">
                  {site.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {repo && (
                <a className="tlink" href={repo.href} target="_blank" rel="noopener noreferrer">
                  {repo.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          <div className="pp-shot reveal-scale" style={{ ["--d" as string]: "200ms" }}>
            <Image
              src={p.shots[0].src}
              alt={p.shots[0].alt}
              width={1280}
              height={800}
              sizes="(min-width: 1180px) 1120px, 92vw"
              priority
            />
          </div>
        </section>

        <section className="pj-band" aria-label="Overview">
          <div className="pj-wrap" style={{ display: "grid", gap: "clamp(3rem, 7vw, 5rem)" }}>
            <div className="split">
              <h2 className="t-h2 reveal">Motivation</h2>
              <div className="reveal">
                {p.story.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <div className="split">
              <h2 className="t-h2 reveal">Features</h2>
              <div className="reveal">
                {p.features.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <div className="split">
              <h2 className="t-h2 reveal">Build</h2>
              <div className="reveal">
                {p.build.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="pj-band" style={{ background: "none" }} aria-labelledby="history-h">
          <div className="pj-wrap">
            <h2 id="history-h" className="display reveal">
              History
            </h2>
          </div>
          {p.timeline.length > 0 ? (
            <div className="tl-wrap reveal">
              <ol className="tl pj-focus" tabIndex={0} aria-label={`${p.title} history, scroll sideways`}>
                {p.timeline.map((t) => (
                  <li key={t.date + t.label}>
                    <time dateTime={t.date}>{when(t.date)}</time>
                    <p className="detail">{t.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="pj-wrap">
              <p className="detail reveal mt-6 max-w-[52ch]">
                The code for this project is private, so there is no public commit history to show here.
              </p>
            </div>
          )}
        </section>

        <section className="pj-band" aria-labelledby="screens-h">
          <div className="pj-wide">
            <h2 id="screens-h" className="display pj-head reveal">
              Screens
            </h2>
            <ul className="shots">
              {shots.map((s, n) => (
                <li key={s.src} className="reveal" style={{ ["--d" as string]: `${(n % 2) * 80}ms` }}>
                  <figure>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1280}
                      height={800}
                      sizes="(min-width: 900px) 46vw, 92vw"
                      loading={n < 2 ? "eager" : "lazy"}
                    />
                    <figcaption className="detail">{s.alt}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section style={{ padding: "clamp(3.5rem, 8vw, 6rem) 0" }} aria-labelledby="next-h">
          <div className="pj-wrap">
            <div className="split">
              <h2 id="next-h" className="t-h2 reveal">
                Next
              </h2>
              <ul className="nextlist reveal">
                {p.next.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="pj-band" aria-label="More projects">
          <div className="pj-wrap pager">
            <Link href={`/projects/${prev.slug}/`}>
              <span className="detail block">Previous project</span>
              <span className="title mt-1 block">{prev.title}</span>
            </Link>
            <Link href={`/projects/${next.slug}/`}>
              <span className="detail block">Next project</span>
              <span className="title mt-1 block">{next.title}</span>
            </Link>
          </div>
        </section>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 pt-10 text-[13px] sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
