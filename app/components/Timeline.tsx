"use client";

import { useState, type ComponentType } from "react";
import { motion } from "motion/react";
import { FiArrowDownCircle } from "react-icons/fi";
import {
	LuLibrary,
	LuMic,
	LuPartyPopper,
	LuSparkles,
	LuTrophy,
} from "react-icons/lu";
import { liquidBlobKeyframes, liquidBlobTransition } from "@/lib/blob";
import type { TimelineCategory, TimelineItem } from "@/lib/microcms";
import SeeMoreLink from "./_ui/SeeMoreLink";
import TimelineCard from "./_ui/TimelineCard";

const INITIAL_COUNT = 6;

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

function groupByYear(
	items: TimelineItem[],
): { year: string; items: TimelineItem[] }[] {
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

function softenLineColor(hex: string): string {
	const ratio = 0.32;
	const value = hex.replace("#", "");
	const channels = [0, 2, 4].map((start) =>
		parseInt(value.slice(start, start + 2), 16),
	);
	const mix = (channel: number) =>
		Math.round(channel * ratio + 255 * (1 - ratio));
	const [red, green, blue] = channels.map(mix);
	return `rgb(${red}, ${green}, ${blue})`;
}

const CATEGORY_STYLE: Record<
	TimelineCategory,
	{
		icon: ComponentType<{
			size?: number;
			className?: string;
			"aria-hidden"?: boolean;
		}>;
		color: string;
		label: string;
	}
> = {
	release: { icon: LuPartyPopper, color: "#7BA05B", label: "Release" },
	talk: { icon: LuMic, color: "#4A90C2", label: "Talk" },
	award: { icon: LuTrophy, color: "#D4A33B", label: "Award" },
	other: { icon: LuSparkles, color: "#888888", label: "Other" },
};

const FILTERS: {
	id: "all" | "release" | "talk" | "award" | "other";
	label: string;
	icon: ComponentType<{
		size?: number;
		className?: string;
		"aria-hidden"?: boolean;
	}>;
	color: string;
}[] = [
	{ id: "all", label: "All", icon: LuLibrary, color: "#222222" },
	...(["release", "talk", "award", "other"] as const).map((id) => ({
		id,
		label: CATEGORY_STYLE[id].label,
		icon: CATEGORY_STYLE[id].icon,
		color: CATEGORY_STYLE[id].color,
	})),
];

function CategoryFilter({
	selected,
	onSelect,
	centered,
}: {
	selected: TimelineCategory | "all";
	onSelect: (id: TimelineCategory | "all") => void;
	centered: boolean;
}) {
	return (
		<div
			className={`mb-[28px] flex w-full flex-nowrap items-start justify-between gap-1 sm:w-auto sm:gap-x-5 ${centered ? "sm:mx-auto sm:justify-center" : ""}`}
		>
			{FILTERS.map((filter, index) => {
				const isSelected = selected === filter.id;
				const Icon = filter.icon;

				return (
					<button
						key={filter.id}
						type="button"
						onClick={() => onSelect(filter.id)}
						aria-pressed={isSelected}
						className="group flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-1.5 sm:flex-none sm:gap-2"
						style={{ "--theme": filter.color } as React.CSSProperties}
					>
						<motion.span
							className={`flex size-12 items-center justify-center bg-[var(--theme)] sm:size-16 ${isSelected ? "p-[3px]" : "p-[2px] group-hover:p-[3px]"}`}
							animate={{ borderRadius: liquidBlobKeyframes(index) }}
							transition={liquidBlobTransition}
						>
							<span
								className={`flex size-full items-center justify-center transition-colors duration-300 [border-radius:inherit] ${isSelected ? "bg-[var(--theme)] text-white" : "bg-white text-[var(--theme)] group-hover:bg-[var(--theme)] group-hover:text-white"}`}
							>
								<Icon size={18} className="sm:hidden" aria-hidden />
								<Icon size={22} className="hidden sm:block" aria-hidden />
							</span>
						</motion.span>
						<span
							className={`whitespace-nowrap text-[10px] tracking-[0.02em] sm:text-[13px] sm:tracking-[0.04em] ${isSelected ? "font-bold text-black" : "text-[#9A9A9A]"}`}
						>
							{filter.label}
						</span>
					</button>
				);
			})}
		</div>
	);
}

function BlobIcon({
	category,
	index,
}: {
	category: TimelineCategory;
	index: number;
}) {
	const { icon: Icon, color } = CATEGORY_STYLE[category];

	return (
		<motion.span
			className="flex size-10 shrink-0 items-center justify-center text-white lg:size-12"
			style={{ backgroundColor: color }}
			animate={{ borderRadius: liquidBlobKeyframes(index) }}
			transition={liquidBlobTransition}
		>
			<Icon size={20} aria-hidden />
		</motion.span>
	);
}

export default function Timeline({
	items,
	full = false,
}: {
	items: TimelineItem[];
	full?: boolean;
}) {
	const [expanded, setExpanded] = useState(full);
	const [filter, setFilter] = useState<TimelineCategory | "all">("all");

	if (items.length === 0) {
		return null;
	}

	const filteredItems =
		filter === "all" ? items : items.filter((item) => item.category === filter);
	const visibleItems =
		full || expanded ? filteredItems : filteredItems.slice(0, INITIAL_COUNT);
	const hasMore = !full && !expanded && filteredItems.length > INITIAL_COUNT;

	function selectFilter(next: TimelineCategory | "all") {
		setFilter(next);
		setExpanded(true);
	}

	return (
		<section
			id="timeline"
			className={
				full
					? "relative flex w-full flex-col gap-[13px]"
					: "relative mx-auto flex w-full max-w-[1200px] flex-col justify-center gap-[13px] lg:pt-[140px]"
			}
		>
			{!full && (
				<motion.h1
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
				</motion.h1>
			)}

			<CategoryFilter
				selected={filter}
				onSelect={selectFilter}
				centered={full}
			/>

			{filteredItems.length === 0 ? (
				<p className={`text-[14px] text-[#888] ${full ? "text-center" : ""}`}>
					このカテゴリはまだありません
				</p>
			) : null}

			<ul
				className={
					full ? "mx-auto w-full max-w-[596px] lg:max-w-[618px]" : undefined
				}
			>
				{groupByYear(visibleItems).map((group, groupIndex, groups) => (
					<li key={group.year || "unknown"}>
						{group.year && (
							<p className="pb-[28px] text-[20px] font-bold lg:text-[24px]">
								{group.year}
							</p>
						)}
						<ul>
							{group.items.map((item, index) => {
								const isLastInYear = index === group.items.length - 1;
								const isLastGroup = groupIndex === groups.length - 1;
								const fromColor = softenLineColor(
									CATEGORY_STYLE[item.category].color,
								);
								const toColor = isLastInYear
									? fromColor
									: softenLineColor(
											CATEGORY_STYLE[group.items[index + 1].category].color,
										);

								return (
									<motion.li
										key={item.id}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										viewport={{ once: true }}
										transition={{
											duration: 0.6,
											delay: Math.min(index, INITIAL_COUNT - 1) * 0.1,
											ease: "easeOut",
										}}
										className="flex gap-4 lg:gap-[30px]"
									>
										<div className="flex flex-col items-center self-stretch">
											<BlobIcon category={item.category} index={index} />
											{!isLastInYear && (
												<span
													className="mb-[15px] mt-[15px] w-[2px] flex-1"
													style={
														fromColor === toColor
															? { backgroundColor: fromColor }
															: {
																	backgroundImage: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
																}
													}
												/>
											)}
										</div>
										<div
											className={`min-w-0 flex-1 ${isLastInYear ? (isLastGroup ? "" : "pb-[28px]") : "pb-[40px]"}`}
										>
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
						className="flex cursor-pointer items-center gap-3 rounded-full bg-white px-4 py-2 text-[16px] font-medium tracking-[5%] text-[#666] shadow-[2px_2px_16px_rgba(0,0,0,0.12)] transition-color duration-300 hover:bg-[#7BA05B] hover:text-white lg:text-[18px]"
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
