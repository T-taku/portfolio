"use client";

import { motion } from "motion/react";
import React from "react";

type Props = {
  text: string;
  tag?: string;
  className?: string;
  stagger?: number;
  delay?: number;
};

export default function AnimatedText({ text, tag = "span", className = "", stagger = 0.04, delay = 0 }: Props) {
  const Tag: any = tag;

  return (
    <Tag className={className} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: 8, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: delay + i * stagger, ease: "easeOut" }}
          className="inline-block"
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </Tag>
  );
}
