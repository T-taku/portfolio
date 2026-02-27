"use client";

import { motion } from "motion/react"
import FadeInImage from "./_ui/FadeInImage";

export default function About() {
  return (
    <section id="about" className="mx-auto flex w-full max-w-[1200px] flex-col justify-center gap-[13px]">
      <div className="flex w-full items-center space-x-[120px]">
        <motion.div
          className="h-[340px] w-[340px] shrink-0 overflow-hidden"
          animate={{
            borderRadius: [
              "72% 28% 68% 32% / 30% 70% 34% 66%",
              "26% 74% 34% 66% / 68% 30% 70% 32%",
              "78% 22% 42% 58% / 36% 64% 28% 72%",
              "38% 62% 24% 76% / 74% 26% 62% 38%",
              "66% 34% 76% 24% / 28% 72% 46% 54%",
              "72% 28% 68% 32% / 30% 70% 34% 66%"
            ]
          }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FadeInImage src={"/logo.png"} alt={"hero image"} width={800} height={800} className="h-full w-full object-cover object-bottom" delay={0.4} />
        </motion.div>
        <div className="flex w-[608px] flex-col justify-center gap-[13px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="font-bold text-right flex items-center space-x-[30px]"
          >
            <span className="text-[32px]">About</span>
            <span>私について</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-[16px] tracking-[5%]"
          >
            2006年、佐賀県生まれ。広島市立大学 情報科学部在学中。<br />幼少期は、国内・海外問わずたくさん旅行をする家庭で育ちました。また、小学5年生より、ScratchとPythonをはじめ、自分でモノを作る面白さに気づいて今に至ります。現在はPythonや、Next.jsを使用してWebアプリケーションや、Discord Botなどを開発したり、企業でインターン生として勤務したりしています。また、高校在学中には学校のInstagramアカウント運営等を行っていた経験があり、映像制作をすることもあります。
          </motion.p>
        </div>
      </div>
    </section>
  );
}