"use client"
import { motion } from "motion/react"
import LinksCard from "./_ui/LinkCard";

export default function Articles({ articles }: { articles: { title: string, hosted: string, date: string, href: string }[] }) {
  return (
    <section id="articles" className="relative mb-[120px] flex w-full flex-col justify-center gap-[13px] overflow-hidden lg:mr-[-70px] lg:w-[calc(100%+70px)]">
      <div className="relative z-20 mx-auto w-full max-w-[1200px] lg:pr-[70px]">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="relative z-30 mb-[24px] flex items-center justify-between font-bold lg:mb-[30px]"
        >
          <div className="flex items-center space-x-[14px] lg:space-x-[30px]">
            <span className="text-[32px]">Articles</span>
            <span className="text-[16px]">書いたもの</span>
          </div>
        </motion.h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-[30px]">
          {articles.map((article, index) => (
            <LinksCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
