"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineMenu } from "react-icons/hi";
import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { SiZenn } from "react-icons/si";
import Link from "next/link";

interface SidemenuProps {
  isCurrentTop?: boolean;
}

const NavLink = ({ href, children, className, onClick }: { href: string; children: React.ReactNode; className?: string; onClick?: () => void }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const hashIndex = href.indexOf("#");
    if (hashIndex !== -1) {
      const targetId = href.substring(hashIndex + 1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        if (onClick) onClick();
        return;
      }
    }

    window.location.assign(href.startsWith("/") ? href : `/${href}`);
  };

  return (
    <a href={href} onClick={handleScroll} className={`relative w-fit group cursor-pointer ${className || ""}`}>
      {children}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100 group-hover:h-[2px]" />
    </a>
  );
};

export default function Sidemenu({ isCurrentTop }: SidemenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isWorksRoute = pathname.startsWith("/works");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="メニューを開く"
        aria-expanded={isOpen}
        className={`fixed top-0 z-[2100] flex h-16 w-16 items-center justify-center bg-black ${isWorksRoute ? "" : "lg:hidden"}`}
      >
        <HiOutlineMenu className="h-7 w-7 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className={`fixed inset-0 z-[2000] ${isWorksRoute ? "" : "lg:hidden"}`} onClick={() => setIsOpen(false)}>
            <motion.div
              className="absolute left-0 top-0 origin-top-left bg-black "
              initial={{ width: "4rem", height: "4rem" }}
              animate={{ width: "100vw", height: "100vh" }}
              exit={{ width: "4rem", height: "4rem" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            />

            <motion.div
              className="absolute left-6 top-24"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, delay: 0.16 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col space-y-4 text-[24px] font-bold text-white">
                <h3 className="text-[30px]">t-taku.app</h3>
                {isCurrentTop ? (
                  null
                ) : <NavLink href="/#top" className="w-fit" onClick={() => setIsOpen(false)}>
                    Top
                  </NavLink>}
                <NavLink href="/#about" className="w-fit" onClick={() => setIsOpen(false)}>
                  About
                </NavLink>
                <NavLink href="/#works" className="w-fit" onClick={() => setIsOpen(false)}>
                  Works
                </NavLink>
                <NavLink href="/#articles" className="w-fit" onClick={() => setIsOpen(false)}>
                  Articles
                </NavLink>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-20 right-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2, delay: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-5 text-white">
                <Link href="https://github.com/T-taku" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70" aria-label="GitHub">
                  <FaGithub size={22} />
                </Link>
                <Link href="https://x.com/T_taku0427" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70" aria-label="X">
                  <BsTwitterX size={22} />
                </Link>
                <Link href="https://zenn.dev/t_taku0427" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-70" aria-label="Zenn">
                  <SiZenn size={22} />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className={`fixed top-1/2 left-[70px] hidden -translate-y-1/2 ${isWorksRoute ? "" : "lg:block"}`}>
        <div className="flex flex-col space-y-[5px] text-[24px] font-bold">
          {isCurrentTop ? (
            <NavLink href="#top">Top</NavLink>
          ) : (
            <></>
          )}
          <NavLink href="/#about">About</NavLink>
          <NavLink href="/#works">Works</NavLink>
          <NavLink href="/#articles">Articles</NavLink>
        </div>
      </div >
    </>
  )
}