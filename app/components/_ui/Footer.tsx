import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiZenn } from "react-icons/si";

export default function Footer() {
  return (
    <>
      <footer className="flex w-full h-[260px] items-center justify-center bg-[#252525] text-white lg:pl-[248px]">
        <div className="flex w-full max-w-[1200px] justify-between items-center px-[70px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[36px] font-medium tracking-[5%]">Takuma Tateishi</span>
          </div>
          <div className="flex gap-[20px] transition-all duration-500">
            <Link href="https://github.com/T-taku" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <FaGithub size={24} />
            </Link>
            <Link href="https://x.com/T_taku0427" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <BsTwitterX size={24} />
            </Link>
            <a href="https://zenn.dev/t_taku0427" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
              <SiZenn size={24} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}