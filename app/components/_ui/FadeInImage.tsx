"use client";

import { motion } from "motion/react"
import Image, { ImageProps } from "next/image";

interface FadeInImageProps extends ImageProps {
  delay?: number;
}

export default function FadeInImage({ delay = 0, ...props }: FadeInImageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, ease: "easeOut", delay: delay }}
    >
      <Image {...props} />
    </motion.div>
  );
}