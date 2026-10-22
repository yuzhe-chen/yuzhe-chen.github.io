import type { Metadata } from "next";
import { links, profile, projects, researchIdeas } from "@/lib/content";
import { Columns, Entry, Section, TitleLink } from "@/components/sections";
import { SiteNav } from "@/components/site-nav";
import { navFromElsewhere } from "@/lib/nav";

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
      <div id="top" aria-hidden />

      {/* The same bar as the home page, its tabs pointing back to their
          sections there. Projects is deliberately not one of them. */}
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} />

      {/* Same frame as the home page's main column. */}
      <main className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        <div className="space-y-14 pt-14 [&>section:first-child]:border-t-0 sm:pt-[4.25rem] lg:space-y-20">
          <Section id="projects" label="Projects">
            <Columns>
              {projects.map((p) => (
                <Entry
                  key={p.title}
                  title={p.title}
                  meta={p.status}
                  body={`${p.description} ${p.why}`}
                >
                  {p.links.length > 0 && (
                    <p className="mt-2 flex gap-4 text-[15px] leading-snug">
                      {p.links.map((l) => (
                        <TitleLink key={l.href} href={l.href}>
                          {l.label}
                        </TitleLink>
                      ))}
                    </p>
                  )}
                </Entry>
              ))}
            </Columns>
          </Section>

          <Section id="research" label="Research Ideas">
            <Columns>
              {researchIdeas.map((r) => (
                <Entry key={r.title} title={r.title} body={r.description} />
              ))}
            </Columns>
          </Section>
        </div>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
