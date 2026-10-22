import type { Metadata } from "next";
import Link from "next/link";
import { profile, projects, researchIdeas } from "@/lib/content";
import { Section, TitleLink } from "@/components/sections";

// A hidden page: reached only from the "National" beside AP Scholar with
// Distinction. It stays out of the menu and the sitemap, and asks search
// engines not to list it either.
export const metadata: Metadata = {
  title: `Projects - ${profile.shortName}`,
  alternates: { canonical: "/projects/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ProjectsPage() {
  return (
    <>
      <header className="mx-auto w-full max-w-[1600px] px-5 pt-5 sm:px-8">
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-tight hover:text-accent"
        >
          {profile.shortName}
        </Link>
      </header>

      <main className="mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        <div className="space-y-14 pt-10 [&>section:first-child]:border-t-0 lg:space-y-20">
          <Section id="projects" label="Projects" as="h1">
            <ul className="space-y-8">
              {projects.map((p) => (
                <li key={p.title}>
                  <p className="text-[17px] leading-snug">
                    {p.title}
                    <span className="ml-2 align-middle text-[11px] uppercase tracking-wider text-muted">
                      {p.status}
                    </span>
                  </p>
                  <p className="mt-2 text-[15px] leading-6">{p.description}</p>
                  <p className="mt-1.5 text-[15px] leading-6 text-muted">
                    {p.why}
                  </p>
                  {p.links.length > 0 && (
                    <p className="mt-2 flex gap-4 text-[14px] text-accent">
                      {p.links.map((l) => (
                        <TitleLink key={l.href} href={l.href}>
                          {l.label}
                        </TitleLink>
                      ))}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Section>

          <Section id="research" label="Research Ideas">
            <ul className="space-y-6">
              {researchIdeas.map((r) => (
                <li key={r.title}>
                  <p className="text-[17px] leading-snug">{r.title}</p>
                  <p className="mt-2 text-[15px] leading-6 text-muted">
                    {r.description}
                  </p>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </main>

      <footer className="mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
