import { Metadata } from "next";
import { getWorks } from "@/lib/microcms";
import WorksCard from "../components/_ui/WorksCard";
import AnimatedText from "../components/_ui/AnimatedText";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Works - つくったモノ",
    description: "過去の制作物をまとめています",
    openGraph: {
      title: "Works - つくったモノ",
      description: "過去の制作物をまとめています",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Works - つくったモノ",
      description: "過去の制作物をまとめています",
    },
  };
}

export default function WorksPage() {
  return (
    <div className="min-h-screen w-full bg-white pb-20 pt-[100px] overflow-x-hidden">
      <div className="mx-auto w-full px-4 lg:px-[160px]">
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-4">
            <AnimatedText tag="h1" className="text-[28px] font-bold lg:text-[36px]" text="Works" />
            <AnimatedText tag="p" className="text-sm" text="つくったモノ" delay={0.16} />
          </div>
        </header>
        <WorksGrid />
      </div>
    </div>
  );
}

async function WorksGrid() {
  const works = await getWorks();
  const sortedWorks = [...works].sort((a, b) => new Date(b.worksAt).getTime() - new Date(a.worksAt).getTime());

  return (
    <section className="w-full pb-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px]">
        {sortedWorks.map((work) => (
          <WorksCard
            key={work.id}
            title={work.title}
            tag={work.category}
            image={work.thumbnail?.url || "/images/works-thumbnail.jpg"}
            href={work.id === "works" || work.id === "work" || work.id === "api-works" ? "/works" : `/works/${work.id}`}
            worksColor={work.worksColor}
          />
        ))}
      </div>
    </section>
  );
}