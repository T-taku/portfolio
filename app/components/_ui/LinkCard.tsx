import Link from "next/link";
import { SiZenn, SiSpeakerdeck } from "react-icons/si";

export default function LinksCard({ title, hosted, date, href }: { title: string, hosted: string, date: string, href: string }) {
  return (
    <Link href={href} className="flex h-auto min-w-0 flex-col justify-between rounded-[10px] border border-[#D0CCCC] border-[2px] px-4 py-3 transition-all duration-300 hover:border-[#b5b3b3] min-h-[100px] lg:h-[110px] lg:min-w-[450px] lg:pr-[48px] lg:pl-[20px] lg:py-[14px]">
      <h3 className="text-[16px] font-medium tracking-[5%] lg:text-[18px]">{title}</h3>
      <div className="flex items-center gap-[10px]">
        {hosted === "zenn" && (
          <SiZenn size={20} color="#3EA8FF" />
        )}
        {hosted === "Speaker Deck" && (
          <SiSpeakerdeck size={20} color="#009287" />
        )}
        <span className="text-[12px] tracking-[5%] lg:text-[14px]">{hosted}・{date}</span>
      </div>
    </Link>
  )
}