import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWorkById } from "@/lib/microcms";
import WorkDetailClient from "@/app/components/WorkDetailClient";

interface WorkDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    return {
      title: "Work Not Found",
    };
  }

  const description = work.content.replace(/<[^>]*>?/gm, "").substring(0, 120) + "...";

  return {
    title: work.title,
    description: description,
    openGraph: {
      title: work.title,
      description: description,
      images: [work.thumbnail.url],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: work.title,
      description: description,
      images: [work.thumbnail.url],
    },
  };
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const work = await getWorkById(id);

  if (!work) {
    notFound();
  }

  return <WorkDetailClient id={id} initialWork={work} />;
}
