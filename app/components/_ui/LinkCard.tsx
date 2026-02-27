import Link from "next/link";
import { SiZenn, SiSpeakerdeck } from "react-icons/si";

export default function LinksCard({ title, hosted, date, href }: { title: string, hosted: string, date: string, href: string }) {
  return (
    <Link href={href} className="min-w-[450px] h-[110px] rounded-[10px] border border-[#D0CCCC] border-[2px] hover:border-[#b5b3b3] transition-all duration-300 pr-[48px] pl-[20px] py-[14px] flex flex-col justify-between">
      <h3 className="text-[18px] font-medium tracking-[5%]">{title}</h3>
      <div className="flex items-center gap-[10px]">
        {hosted === "zenn" && (
          <SiZenn size={20} color="#3EA8FF" />
        )}
        {hosted === "Speaker Deck" && (
          <SiSpeakerdeck size={20} color="#009287" />
        )}
        <span className="text-[14px] tracking-[5%]">{hosted}・{date}</span>
      </div>
    </Link>
  )
}