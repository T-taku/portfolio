"use client";

import { useCallback } from "react";
import { motion } from "motion/react"
import useEmblaCarousel from "embla-carousel-react";
import useSWR from "swr";
import WorksCard from "./_ui/WorksCard";
import type { Work } from "@/lib/microcms";

const fetcher = async (url: string): Promise<Work[]> => {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Failed to fetch works");
  }
  return response.json();
};

export default function Works() {
  const { data: works = [] } = useSWR<Work[]>("/api/works", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    dedupingInterval: 0,
    refreshInterval: 5000,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const slides = works.length > 0 ? [...works, ...works, ...works] : [];

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="works" className="relative flex max-lg:mb-[40px] lg:min-h-screen w-full flex-col justify-center gap-[13px] overflow-hidden lg:mr-[-70px] lg:w-[calc(100%+70px)]">
      <div className="relative z-20 mx-auto w-full max-w-[1200px] lg:pr-[70px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-bold flex items-center justify-between mb-[30px] relative z-30"
        >
          <div className="flex items-center space-x-[30px]">
            <span className="text-[32px]">Works</span>
            <span>つくったモノ</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              className="cursor-pointer h-9 w-9 rounded-full border border-black/20 text-[18px] leading-none"
              aria-label="前へ"
            >
              ←
            </button>
            <button
              type="button"
              onClick={scrollNext}
              className="cursor-pointer h-9 w-9 rounded-full border border-black/20 text-[18px] leading-none"
              aria-label="次へ"
            >
              →
            </button>
          </div>
        </motion.h1>
        <div className="lg:-mr-[50vw] lg:w-[calc(100%+50vw)]">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-[30px]">
              {slides.map((work, index) => (
                <div key={`${work.id}-${index}`} className="min-w-0 shrink-0 flex-[0_0_100%] lg:flex-[0_0_500px]">
                  <WorksCard
                    title={work.title}
                    tag={work.category}
                    image={work.thumbnail.url}
                    href={work.id === "works" || work.id === "work" || work.id === "api-works" ? "/works" : `/works/${work.id}`}
                    worksColor={work.worksColor}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute right-0 top-[calc(50%+40px)] z-40 hidden h-[360px] w-[150px] -translate-y-1/2 bg-gradient-to-l from-white to-transparent lg:block" />
    </section>
  );
}
