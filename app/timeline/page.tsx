import { Metadata } from "next";
import { getTimeline } from "@/lib/microcms";
import AnimatedText from "../components/_ui/AnimatedText";
import Timeline from "../components/Timeline";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      absolute: "Timeline | Takuma Tateishi",
    },
    description: "これまでのあゆみをまとめています",
    openGraph: {
      title: "Timeline | Takuma Tateishi",
      description: "これまでのあゆみをまとめています",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: "Timeline | Takuma Tateishi",
      description: "これまでのあゆみをまとめています",
    },
  };
}

export default async function TimelinePage() {
  const items = await getTimeline();

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white pb-20 pt-[100px]">
      <div className="mx-auto w-full px-4 lg:px-[160px]">
        <header className="flex items-center justify-between py-8">
          <div className="flex items-center gap-4">
            <AnimatedText tag="h1" className="text-[28px] font-bold lg:text-[36px]" text="Timeline" />
            <AnimatedText tag="p" className="text-sm" text="あゆみ" delay={0.16} />
          </div>
        </header>
        <Timeline items={items} full />
      </div>
    </div>
  );
}
