import Link from "next/link";
import { SiZenn, SiSpeakerdeck, SiGithub } from "react-icons/si";
import { FaExternalLinkAlt } from "react-icons/fa";

const FAVICON_SOURCES: Record<string, string> = {
  sizu: "https://static.sizu.me/images/logo-favicon.png",
};

function getFaviconSrc(hosted: string | undefined, href: string): string | null {
  if (hosted && FAVICON_SOURCES[hosted]) {
    return FAVICON_SOURCES[hosted];
  }

  try {
    return `https://www.google.com/s2/favicons?domain=${new URL(href).hostname}&sz=64`;
  } catch {
    return null;
  }
}

function HostIcon({ hosted, href }: { hosted?: string; href: string }) {
  if (hosted === "zenn") {
    return <SiZenn size={20} color="#3EA8FF" aria-hidden="true" />;
  }
  if (hosted === "Speaker Deck") {
    return <SiSpeakerdeck size={20} color="#009287" aria-hidden="true" />;
  }
  if (hosted === "GitHub") {
    return <SiGithub size={20} color="#181717" aria-hidden="true" />;
  }

  const faviconSrc = getFaviconSrc(hosted, href);
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

export default function LinksCard({ title, hosted, date, href }: { title: string, hosted?: string, date?: string, href: string }) {
  return (
    <Link href={href} className="flex h-auto min-w-0 flex-col justify-between rounded-[10px] border border-[#D0CCCC] border-[2px] px-4 py-3 transition-all duration-300 hover:border-[#b5b3b3] hover:shadow-lg min-h-[100px] lg:h-[110px] lg:min-w-[450px] lg:pr-[48px] lg:pl-[20px] lg:py-[14px] bg-white">
      <h3 className="text-[16px] font-medium tracking-[5%] lg:text-[18px]">{title}</h3>
      <div className="flex items-center gap-[10px]">
        <HostIcon hosted={hosted} href={href} />
        <span className="text-[12px] tracking-[5%] lg:text-[14px]">
          {hosted || "Link"}
          {date && `・${date}`}
        </span>
      </div>
    </Link>
  )
}
