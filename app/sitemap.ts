import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

// A sitemap is a Route Handler under the hood, and this build exports to plain
// files with no server behind them. Without this, the build fails rather than
// writing sitemap.xml.
export const dynamic = "force-static";

/**
 * Builds sitemap.xml. It's a one-page site, so this lists exactly one URL --
 * the point is less "help Google find the pages" than giving Search Console
 * something to submit, which is how a brand-new site gets crawled sooner.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${profile.siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
