"use client";

import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import parse, { Element, DOMNode, domToReact, attributesToProps } from "html-react-parser";
import LinksCard from "@/app/components/_ui/LinkCard";
import type { Work } from "@/lib/microcms";
import {
  SiNextdotjs,
  SiPython,
  SiReactrouter,
  SiAdobepremierepro,
  SiTailwindcss,
  SiFigma,
  SiCanva,
  SiTypescript,
  SiReact,
  SiVercel,
  SiGithub,
  SiNodedotjs,
  SiHono,
  SiJavascript,
  SiHtml5,
  SiCss3,
} from "react-icons/si";
import { FaHandshake } from "react-icons/fa";
import { MdConstruction } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";

const fetcher = async (url: string): Promise<Work | null> => {
  const response = await fetch(url, { cache: "no-store" });
  if (response.status === 404) {
    return null;
  }
  if (!response.ok) {
    throw new Error("Failed to fetch work");
  }
  return response.json();
};

interface WorkDetailClientProps {
  id: string;
  initialWork: Work;
}

export default function WorkDetailClient({ id, initialWork }: WorkDetailClientProps) {
  const { data: work = initialWork } = useSWR<Work | null>(`/api/works/${id}`, fetcher, {
    fallbackData: initialWork,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    revalidateIfStale: true,
    dedupingInterval: 0,
    refreshInterval: 5000,
  });

  if (!work) {
    return null;
  }

  const themeColor = work.worksColor || "#252525";

  const isLightBg = ((hex: string) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 140;
  })(themeColor);

  const textColorClass = isLightBg ? "text-black" : "text-white";

  const formattedDate = new Date(work.worksAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).replace(/\//g, ".");

  const getTechIcon = (tech: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "Next.js": <SiNextdotjs />,
      "Python": <SiPython />,
      "React-router": <SiReactrouter />,
      "Premiere Pro": <SiAdobepremierepro />,
      "Tailwind CSS": <SiTailwindcss />,
      "Figma": <SiFigma />,
      "Canva": <SiCanva />,
      "TypeScript": <SiTypescript />,
      "React": <SiReact />,
      "Vercel": <SiVercel />,
      "GitHub": <SiGithub />,
      "Node.js": <SiNodedotjs />,
      "Hono": <SiHono />,
      "JavaScript": <SiJavascript />,
      "HTML": <SiHtml5 />,
      "CSS": <SiCss3 />,
    };
    return icons[tech] || null;
  };

  const isLinkCard = (domNode: DOMNode): boolean => {
    if (!(domNode instanceof Element && domNode.name === "a" && domNode.attribs?.href)) return false;

    const hasLinkCardClass = (node: DOMNode): boolean => {
      if (node instanceof Element) {
        if (node.attribs?.class?.includes("link-card")) return true;
        if (node.children) {
          return node.children.some((child) => hasLinkCardClass(child as DOMNode));
        }
      }
      return false;
    };

    return (domNode.attribs.class?.includes("link-card") || hasLinkCardClass(domNode)) ?? false;
  };

  const renderLinkCard = (domNode: Element) => {
    const href = domNode.attribs.href!;

    const getText = (node: DOMNode): string => {
      if (node.type === "text") return (node as any).data || "";
      if (node instanceof Element && node.children) {
        return node.children.map((child) => getText(child as DOMNode)).join("");
      }
      return "";
    };

    const title = getText(domNode) || href;

    let hosted: string;
    if (href.includes("zenn.dev")) hosted = "zenn";
    else if (href.includes("speakerdeck.com")) hosted = "Speaker Deck";
    else if (href.includes("github.com")) hosted = "GitHub";
    else {
      try {
        hosted = new URL(href).hostname.replace(/^www\./, "");
      } catch {
        hosted = "Link";
      }
    }

    return (
      <div className="my-6 not-prose">
        <LinksCard title={title} href={href} hosted={hosted} />
      </div>
    );
  };

  const parseOptions = {
    replace: (domNode: DOMNode) => {
      if (domNode instanceof Element && domNode.name === "p" && domNode.children) {
        const elementChildren = domNode.children.filter((child) => !(child.type === "text" && (child as any).data.trim() === ""));
        if (elementChildren.length === 1 && isLinkCard(elementChildren[0] as DOMNode)) {
          return renderLinkCard(elementChildren[0] as Element);
        }
      }
      if (isLinkCard(domNode)) {
        return renderLinkCard(domNode as Element);
      }

      if (domNode instanceof Element && domNode.attribs?.style) {
        const props = attributesToProps(domNode.attribs);
        const Tag = domNode.name as any;
        return (
          <Tag {...props} suppressHydrationWarning>
            {domToReact(domNode.children as DOMNode[], parseOptions)}
          </Tag>
        );
      }
    },
  };

  return (
    <div className="min-h-screen w-full bg-white pb-20">
      <section className="relative max-md:pt-[60px] max-md:pb-[40px] flex w-full flex-col lg:h-[490px] lg:flex-row" style={{ backgroundColor: themeColor }}>
        <div className="relative flex w-full flex-col justify-center gap-6 px-6 py-10 lg:w-1/2 lg:px-[70px] lg:py-0">
          <div className="flex flex-col items-start gap-4">
            <h1 className={`text-[28px] font-black lg:text-[36px] ${textColorClass}`}>{work.title}</h1>
            <div className={`flex flex-col gap-3 border-l-[2px] pl-4 ${isLightBg ? "border-black/20" : "border-white/20"}`}>
              {work.client && (
                <div className="flex items-center gap-3">
                  <FaHandshake className={`shrink-0 text-[20px] lg:text-[24px] ${textColorClass}`} />
                  <span className={`text-[16px] font-medium lg:text-[20px] ${textColorClass}`}>{work.client}</span>
                </div>
              )}
              {work.link && (
                <div className="flex items-center gap-3">
                  <FaLink className={`shrink-0 text-[20px] lg:text-[24px] ${textColorClass}`} />
                  <Link href={work.link} target="_blank" rel="noopener noreferrer" className={`relative w-fit group cursor-pointer break-all text-[16px] font-medium lg:text-[20px] ${textColorClass}`}>
                    {work.link}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100 group-hover:h-[2px]" />
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-3">
                <FaCalendarAlt className={`shrink-0 text-[20px] lg:text-[24px] ${textColorClass}`} />
                <span className={`text-[16px] font-medium lg:text-[20px] ${textColorClass}`}>{formattedDate}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                <MdConstruction className={`shrink-0 text-[20px] lg:text-[24px] ${textColorClass}`} />
                {work.techStack?.map((tech, index, array) => (
                  <div key={tech} className="flex items-center gap-2">
                    <span className={`flex items-center ${textColorClass}`}>
                      {getTechIcon(tech)}
                    </span>
                    <span className={`text-[16px] font-medium lg:text-[20px] ${textColorClass}`}>
                      {tech}
                    </span>
                    {index < array.length - 1 && <span className={textColorClass}>/</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative h-[300px] w-full lg:h-full lg:w-1/2">
          <Image src={work.thumbnail.url} alt={work.title} fill className="object-cover" />
        </div>
      </section>

      <div className="mx-auto mt-12 max-md:px-[50px] px-[240px] prose:text-black">
        <div className="flex items-center justify-center">
          <div className="prose prose-stone prose-sm md:prose-lg max-w-none">
            {parse(work.content, parseOptions)}
          </div>
        </div>
      </div>
    </div>
  );
}
