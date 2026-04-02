import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://t-taku.app";
  let works: Array<{ id: string; worksAt: string }> = [];

  try {
    const { getWorks } = await import("@/lib/microcms");
    works = await getWorks();
  } catch {
    works = [];
  }

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
      changeFrequency: "yearly" as const,
      priority: 1,
    },
    ...worksUrls,
  ];
}