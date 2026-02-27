import { createClient } from "microcms-js-sdk";

export interface MicroCMSImage {
  url: string;
  width?: number;
  height?: number;
}

export interface Work {
  id: string;
  title: string;
  worksColor: string;
  category: string;
  worksAt: string;
  client?: string;
  link?: string;
  techStack?: string[];
  thumbnail: MicroCMSImage;
  content: string;
}

interface WorkRaw {
  id?: string;
  title: string;
  worksColor: string;
  category: string | string[];
  worksAt: string;
  client?: string;
  link?: string;
  techStack?: string[];
  thumbnail: MicroCMSImage;
  content: string;
}

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
const worksEndpointFromEnv = process.env.MICROCMS_WORKS_ENDPOINT;

if (!serviceDomain) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}

if (!apiKey) {
  throw new Error("MICROCMS_API_KEY is required");
}

const client = createClient({
  serviceDomain,
  apiKey,
});

const worksEndpoints = Array.from(
  new Set([
    worksEndpointFromEnv,
    "works",
    "work",
    "api-works",
  ].filter((endpoint): endpoint is string => Boolean(endpoint && endpoint.trim())))
);

function normalizeWork(work: WorkRaw, fallbackId: string): Work {
  return {
    id: work.id ?? fallbackId,
    title: work.title,
    worksColor: work.worksColor,
    category: Array.isArray(work.category) ? work.category.join(" / ") : work.category,
    worksAt: work.worksAt,
    client: work.client,
    link: work.link,
    techStack: work.techStack,
    thumbnail: work.thumbnail,
    content: work.content,
  };
}

export async function getWorks(): Promise<Work[]> {
  for (const endpoint of worksEndpoints) {
    try {
      const data = await client.getList<WorkRaw>({
        endpoint,
        customRequestInit: {
          next: { revalidate: 3600 },
        },
      });

      return data.contents.map((work) => normalizeWork(work, endpoint));
    } catch {

      try {
        const objectData = await client.getObject<WorkRaw>({
          endpoint,
          customRequestInit: {
            next: { revalidate: 3600 },
          },
        });

        return [normalizeWork(objectData, endpoint)];
      } catch (objectError) {
        const objectMessage = objectError instanceof Error ? objectError.message : "";
        if (!objectMessage.includes("404")) {
          return [];
        }
      }
    }
  }

  return [];
}

export async function getWorkById(id: string): Promise<Work | null> {
  for (const endpoint of worksEndpoints) {
    try {
      const detail = await client.getListDetail<WorkRaw>({
        endpoint,
        contentId: id,
        customRequestInit: {
          next: { revalidate: 3600 },
        },
      });

      return normalizeWork(detail, id);
    } catch {

      try {
        const objectData = await client.getObject<WorkRaw>({
          endpoint,
          customRequestInit: {
            next: { revalidate: 3600 },
          },
        });

        if (id === endpoint || id === "works") {
          return normalizeWork(objectData, endpoint);
        }
      } catch (objectError) {
        const objectMessage = objectError instanceof Error ? objectError.message : "";
        if (!objectMessage.includes("404")) {
          return null;
        }
      }
    }
  }

  return null;
}
