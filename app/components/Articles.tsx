"use client"
import { motion } from "motion/react"
import LinksCard from "./_ui/LinkCard";

export default function Articles({ articles }: { articles: { title: string, hosted: string, date: string, href: string }[] }) {
  return (
    <section id="articles" className="flex w-[calc(100%+70px)] flex-col justify-center gap-[13px] mr-[-70px] relative overflow-hidden mb-[120px]">
      <div className="mx-auto w-full max-w-[1200px] pr-[70px] relative z-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="font-bold flex items-center justify-between mb-[30px] relative z-30"
        >
          <div className="flex items-center space-x-[30px]">
            <span className="text-[32px]">Articles</span>
            <span>書いたもの</span>
          </div>
        </motion.h1>
        <div className="grid grid-cols-2 gap-[30px]">
          {articles.map((article, index) => (
            <LinksCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  );
}
