import type { MetadataRoute } from "next";

import { getAreaSlugs, getUnitSlugs } from "@/lib/api/catalogue";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [unitSlugs, areaSlugs] = await Promise.all([getUnitSlugs(), getAreaSlugs()]);
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
      { url: `${site.url}/`, priority: 1, changeFrequency: "monthly" },
      { url: `${site.url}/fleet`, priority: 0.9, changeFrequency: "monthly" },
      { url: `${site.url}/quote`, priority: 0.9, changeFrequency: "yearly" },
      { url: `${site.url}/services`, priority: 0.8, changeFrequency: "yearly" },
      { url: `${site.url}/gallery`, priority: 0.7, changeFrequency: "monthly" },
      { url: `${site.url}/about`, priority: 0.6, changeFrequency: "yearly" },
      { url: `${site.url}/contact`, priority: 0.8, changeFrequency: "yearly" },
    ] satisfies MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified }));

  return [
    ...staticRoutes,
    ...unitSlugs.map((slug) => ({
      url: `${site.url}/fleet/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...areaSlugs.map((slug) => ({
      url: `${site.url}/areas/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
