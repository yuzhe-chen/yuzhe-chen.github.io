import Image from "next/image";
import type { Project } from "@/lib/projects";

/** The links as buttons: the live site filled, the rest outlined. */
export function ProjectLinks({ links, raised = false }: { links: Project["links"]; raised?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-2 ${raised ? "relative z-10" : ""}`}>
      {links.map((l, i) => (
        <a
          key={l.href}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center border border-fg px-3.5 py-2 text-[15px] font-semibold leading-none transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            i === 0 ? "bg-fg text-bg hover:bg-transparent hover:text-fg" : "hover:bg-fg hover:text-bg"
          }`}
        >
          {l.label}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ))}
    </div>
  );
}

/** One project's box on the projects page. The whole box opens its own page. */
export function ProjectBox({ p }: { p: Project }) {
  return (
    <article
      id={`project-${p.slug}`}
      className="group relative flex scroll-mt-24 flex-col border border-rule transition-colors hover:border-fg"
    >
      <Image
        src={p.shots[0].src}
        alt={p.shots[0].alt}
        width={1280}
        height={800}
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
        loading="lazy"
        className="block h-auto w-full border-b border-rule"
      />
      <div className="flex grow flex-col p-5">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-[17px] font-semibold leading-snug">
            <a
              href={`/projects/${p.slug}/`}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              {p.title}
            </a>
          </h3>
          <span className="shrink-0 text-[13px] text-muted">{p.status}</span>
        </div>
        <p className="mt-3 text-[15px] leading-6 text-muted">{p.motivation}</p>
        <p className="mt-2 text-[15px] leading-6 text-muted">{p.does}</p>
        <div className="mt-auto pt-5">
          <ProjectLinks links={p.links} raised />
        </div>
      </div>
    </article>
  );
}
