import { MetadataRoute } from "next";
import { getWorks } from "@/lib/microcms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://t-taku.app";
  const works = await getWorks();

  const worksUrls = works.map((work) => ({
    url: `${baseUrl}/works/${work.id}`,
    lastModified: new Date(work.worksAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    ...worksUrls,
  ];
}