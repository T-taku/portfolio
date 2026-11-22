import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import { getFaviconSrc, getHostname } from "@/lib/favicon";
import type { MicroCMSImage } from "@/lib/microcms";

function formatTimelineDate(date: string): string {
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) {
		return date;
	}

	return new Intl.DateTimeFormat("ja-JP", {
		timeZone: "Asia/Tokyo",
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).format(parsed);
}

function Favicon({ href }: { href: string }) {
	const faviconSrc = getFaviconSrc(undefined, href);
	if (faviconSrc) {
		return (
			// eslint-disable-next-line @next/next/no-img-element -- third-party favicons; avoid next/image remote config for tiny icons
			<img
				src={faviconSrc}
				alt=""
				width={20}
				height={20}
				className="size-5 shrink-0 rounded-sm object-contain"
			/>
		);
	}

	return <FaExternalLinkAlt size={16} color="#555" aria-hidden="true" />;
}

export default function TimelineCard({
	title,
	description,
	url,
	thumbnail,
	date,
}: {
	title: string;
	description?: string;
	url?: string;
	thumbnail?: MicroCMSImage;
	date: string;
}) {
	const hostname = url ? getHostname(url) : "";
	const formattedDate = formatTimelineDate(date);
	const className =
		"flex h-auto w-[540px] max-w-full flex-col gap-3 rounded-[10px] border-[2px] border-[#D0CCCC] bg-white px-4 py-3 lg:px-5 lg:py-[14px]";
	const interactiveClassName = `${className} transition-all duration-300 hover:border-[#b5b3b3] hover:shadow-lg`;

	const body = (
		<>
			<h3 className="text-[16px] font-medium tracking-[5%] lg:text-[18px]">
				{title}
			</h3>
			{description && (
				<p className="whitespace-pre-wrap text-[14px] leading-relaxed tracking-[5%] text-[#555]">
					{description}
				</p>
			)}
			{thumbnail?.url && (
				<Image
					src={thumbnail.url}
					alt=""
					width={thumbnail.width || 1200}
					height={thumbnail.height || 630}
					sizes="540px"
					className="block h-auto max-h-[400px] w-full rounded-[6px] object-cover"
				/>
			)}
			<div className="flex items-center gap-[10px]">
				{url && <Favicon href={url} />}
				<span className="text-[12px] tracking-[5%] lg:text-[14px]">
					{hostname ? `${hostname}・${formattedDate}` : formattedDate}
				</span>
			</div>
		</>
	);

	if (!url) {
		return <div className={className}>{body}</div>;
	}

	return (
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			className={interactiveClassName}
		>
			{body}
		</a>
	);
}
