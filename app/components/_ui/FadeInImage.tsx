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
      // Prevent long-press/save on mobile and context menu on desktop
      onContextMenu={(e) => e.preventDefault()}
      style={{
        WebkitTouchCallout: "none",
        WebkitUserSelect: "none",
        userSelect: "none",
        WebkitUserDrag: "none",
      }}
    >
      {/* Disable dragging and rely on wrapper to block context menu / touch callout */}
      <Image {...props} draggable={false} />
    </motion.div>
  );
}