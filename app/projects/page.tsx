import type { Metadata } from "next";
import { links, profile } from "@/lib/content";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectBox } from "@/components/project-parts";
import { SiteNav } from "@/components/site-nav";
import { navFromElsewhere } from "@/lib/nav";

export const metadata: Metadata = {
  title: `Projects - ${profile.shortName}`,
  description: "Websites and apps built by Yuzhe Chen: language tools, games and a planner.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        <section id="projects" className="pt-20 sm:pt-24 lg:pt-28">
          <h1 className="display">Projects</h1>
          <p className="mt-4 max-w-xl text-[17px] leading-snug text-muted">
            Websites and apps I have built.
          </p>

          <div className="mt-10 lg:mt-14">
            <ProjectGallery projects={projects} />
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:mt-24 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectBox key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
