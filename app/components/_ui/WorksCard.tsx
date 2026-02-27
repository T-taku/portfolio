"use client";

import { motion } from "motion/react"
import Image from "next/image"
import Link from "next/link"

export default function WorksCard({ title, tag, image, href }: { title: string, tag: string, image: string, href: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Link href={href} className="block group">
        <div className="relative flex h-[355px] w-full flex-col gap-[26px] lg:w-[500px]">
          <div className="relative">
            <Image src={image} alt={title} width={500} height={300} className="h-[300px] w-full object-cover rounded-[20px]" />
            <span className="absolute top-0 left-0 bg-[#78A657] rounded-tl-[20px] rounded-br-[16px] px-4 py-2 text-white flex items-center justify-center">{tag}</span>
          </div>
          <div className="relative w-fit group">
            <h3 className="text-[18px] font-medium tracking-[5%]">{title}</h3>
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100 group-hover:h-[2px]" />
          </div>
        </div>
      </Link>
    </motion.div>
  )
}