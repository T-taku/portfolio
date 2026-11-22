"use client";

import { useState, type ComponentType } from "react";
import { motion } from "motion/react";
import { FiArrowDownCircle } from "react-icons/fi";
import { LuMic, LuPartyPopper, LuSparkles, LuTrophy } from "react-icons/lu";
import { rotateBlobKeyframes } from "@/lib/blob";
import type { TimelineCategory, TimelineItem } from "@/lib/microcms";
import SeeMoreLink from "./_ui/SeeMoreLink";
import TimelineCard from "./_ui/TimelineCard";

const INITIAL_COUNT = 5;

function getTimelineYear(date: string): string {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
  }).format(parsed);
}

function groupByYear(items: TimelineItem[]): { year: string; items: TimelineItem[] }[] {
  const groups: { year: string; items: TimelineItem[] }[] = [];

  for (const item of items) {
    const year = getTimelineYear(item.date);
    const current = groups[groups.length - 1];
    if (!current || current.year !== year) {
      groups.push({ year, items: [item] });
    } else {
      current.items.push(item);
    }
  }

  return groups;
}

const CATEGORY_STYLE: Record<TimelineCategory, { icon: ComponentType<{ size?: number; "aria-hidden"?: boolean }>; color: string }> = {
  release: { icon: LuPartyPopper, color: "#7BA05B" },
  talk: { icon: LuMic, color: "#4A90C2" },
  award: { icon: LuTrophy, color: "#D4A33B" },
  other: { icon: LuSparkles, color: "#888888" },
};

function BlobIcon({ category, index }: { category: TimelineCategory; index: number }) {
  const { icon: Icon, color } = CATEGORY_STYLE[category];

  return (
    <motion.span
      className="flex size-10 shrink-0 items-center justify-center text-white lg:size-12"
      style={{ backgroundColor: color }}
      animate={{ borderRadius: rotateBlobKeyframes(index) }}
      transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <Icon size={20} aria-hidden />
    </motion.span>
  );
}

export default function Timeline({ items, full = false }: { items: TimelineItem[]; full?: boolean }) {
  const [expanded, setExpanded] = useState(full);

  if (items.length === 0) {
    return null;
  }

  const visibleItems = full || expanded ? items : items.slice(0, INITIAL_COUNT);
  const hasMore = !full && items.length > INITIAL_COUNT;

  return (
    <section id="timeline" className={full ? "relative flex w-full flex-col gap-[13px]" : "relative mx-auto flex w-full max-w-[1200px] flex-col justify-center gap-[13px] lg:pt-[140px]"}>
      {!full && <motion.h1
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        className="relative z-30 mb-[24px] flex items-center font-bold lg:mb-[30px]"
      >
        <span className="flex items-center space-x-[14px] lg:space-x-[30px]">
          <span className="text-[32px]">Timeline</span>
          <span className="text-[16px]">あゆみ</span>
        </span>
      </motion.h1>}

      <ul>
        {groupByYear(visibleItems).map((group, groupIndex, groups) => (
          <li key={group.year || "unknown"}>
            {group.year && (
              <div className="flex items-center gap-4 pb-[28px] lg:gap-[30px]">
                <div className="w-10 shrink-0 lg:w-12" />
                <p className="text-[20px] font-bold lg:text-[24px]">{group.year}</p>
              </div>
            )}
            <ul>
              {group.items.map((item, index) => {
                const isLastInYear = index === group.items.length - 1;
                const isLastGroup = groupIndex === groups.length - 1;

                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: Math.min(index, INITIAL_COUNT - 1) * 0.1, ease: "easeOut" }}
                    className="flex gap-4 lg:gap-[30px]"
                  >
                    <div className="flex flex-col items-center self-stretch">
                      <BlobIcon category={item.category} index={index} />
                      {!isLastInYear && <span className="mt-3 w-[2px] flex-1 bg-[#D6E4C8]" />}
                    </div>
                    <div className={`min-w-0 flex-1 ${isLastInYear ? (isLastGroup ? "" : "pb-[28px]") : "pb-[40px]"}`}>
                      <TimelineCard
                        title={item.title}
                        description={item.description}
                        url={item.url}
                        thumbnail={item.thumbnail}
                        date={item.date}
                      />
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      {hasMore && !expanded && (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[16px] font-medium tracking-[5%] text-[#666] shadow-[0_2px_16px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_4px_20px_rgba(0,0,0,0.18)] lg:text-[18px]"
          >
            <FiArrowDownCircle size={24} aria-hidden="true" />
            もっと見る
          </button>
        </div>
      )}
      {!full && (
        <div className="mt-[23px] flex justify-end">
          <SeeMoreLink href="/timeline" />
        </div>
      )}
    </section>
  );
}
