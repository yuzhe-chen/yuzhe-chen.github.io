import type { MetadataRoute } from "next";
import { profile } from "@/lib/content";

// Same as the sitemap: mark it static so the export writes robots.txt.
export const dynamic = "force-static";

/**
 * Builds robots.txt. Nothing here is private, so every crawler gets the whole
 * site, and the sitemap line points them at it.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${profile.siteUrl}/sitemap.xml`,
  };
}
