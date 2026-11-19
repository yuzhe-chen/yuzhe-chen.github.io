import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { links, profile } from "@/lib/content";
import { projectBySlug, projects } from "@/lib/projects";
import { ProjectLinks } from "@/components/project-parts";
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

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-y-3 border-t border-rule pt-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-x-10">
      <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">{label}</h2>
      <div className="space-y-4 text-[17px] leading-7">{children}</div>
    </section>
  );
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

  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        <div className="pt-20 sm:pt-24">
          <Link href="/projects/" className="rule-hover text-[15px] font-semibold">
            All projects
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-x-10">
            <div>
              <h1 className="display">{p.title}</h1>
              <p className="mt-4 text-[17px] leading-snug text-muted">{p.status}</p>
              <p className="mt-4 max-w-md text-[17px] leading-7">{p.does}</p>
              <div className="mt-6">
                <ProjectLinks links={p.links} />
              </div>
            </div>
            <Image
              src={p.shots[0].src}
              alt={p.shots[0].alt}
              width={1280}
              height={800}
              sizes="(min-width: 1024px) 55vw, 92vw"
              priority
              className="block h-auto w-full border border-rule"
            />
          </div>

          <div className="mt-16 space-y-10 lg:mt-20">
            <Block label="Why I made it">
              {p.why.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
            <Block label="What it does">
              {p.what.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
            <Block label="How it was built">
              {p.built.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Block>
            <Block label="History">
              {p.timeline.length > 0 ? (
                <ol className="space-y-3">
                  {p.timeline.map((t) => (
                    <li key={t.date + t.text} className="grid gap-x-6 sm:grid-cols-[7rem_1fr]">
                      <time dateTime={t.date} className="text-[15px] text-muted">
                        {t.date}
                      </time>
                      <span>{t.text}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-muted">
                  The code for this project is private, so there is no public commit history to show here.
                </p>
              )}
            </Block>
            <Block label="What is next">
              <ul className="list-disc space-y-2 pl-5">
                {p.next.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Block>
            <section className="border-t border-rule pt-5">
              <h2 className="text-[13px] font-semibold uppercase tracking-[0.08em] text-muted">More screenshots</h2>
              <div className="mt-4 grid gap-6 md:grid-cols-2">
                {(p.shots.length > 1 ? p.shots.slice(1) : p.shots).map((s, n) => (
                  <figure key={s.src}>
                    <Image
                      src={s.src}
                      alt={s.alt}
                      width={1280}
                      height={800}
                      sizes="(min-width: 768px) 46vw, 92vw"
                      loading={n < 2 ? "eager" : "lazy"}
                      className="block h-auto w-full border border-rule"
                    />
                    <figcaption className="mt-2 text-[15px] leading-6 text-muted">{s.alt}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          </div>

          <nav
            aria-label="More projects"
            className="mt-16 grid gap-4 border-t border-rule pt-5 sm:grid-cols-2"
          >
            <a href={`/projects/${prev.slug}/`} className="group block">
              <span className="text-[13px] text-muted">Previous project</span>
              <span className="mt-1 block text-[17px] font-semibold group-hover:underline">{prev.title}</span>
            </a>
            <a href={`/projects/${next.slug}/`} className="group block sm:text-right">
              <span className="text-[13px] text-muted">Next project</span>
              <span className="mt-1 block text-[17px] font-semibold group-hover:underline">{next.title}</span>
            </a>
          </nav>
        </div>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
