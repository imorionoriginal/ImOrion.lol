import type { MetadataRoute } from "next";
import { PAGES } from "@/content/projects";
import { SITE } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", ...PAGES.map((page) => `${page.href}/`)].map((path) => ({
    url: `${SITE.url}${path}`,
  }));
}
