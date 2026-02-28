"use client";

import { useRef, useState, type ComponentProps } from "react";
import { motion } from "motion/react"
import { SiNextdotjs, SiPython, SiReactrouter, SiAdobepremierepro, SiTailwindcss, SiFigma, SiCanva } from "react-icons/si";
import { GiPhotoCamera } from "react-icons/gi";
import FadeInImage from "./_ui/FadeInImage";
import IconBadge from "./_ui/IconBadge";
import TechSticker from "./_ui/Sticker";

type Position = { x: number; y: number; rotate: number };
type StickerProps = Omit<ComponentProps<typeof TechSticker>, "className">;
type BadgeProps = ComponentProps<typeof IconBadge>;

type AboutItem =
  | {
      id: string;
      type: "sticker";
      className: string;
      props: StickerProps;
    }
  | {
      id: string;
      type: "badge";
      className: string;
      props: BadgeProps;
    };

export default function About() {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const maxZIndexRef = useRef(100);

  const items: AboutItem[] = [
    {
      id: "python",
      type: "sticker",
      className: "absolute -right-3 top-3 h-[76px] w-[76px] lg:-right-4 lg:top-4 lg:h-[100px] lg:w-[100px]",
      props: {
        ringText: "PYTHON",
        icon: <SiPython className="h-[32px] w-[32px] lg:h-[42px] lg:w-[42px]" />,
        outerColor: "#3776AB",
        ringStrokeColor: "rgba(255, 212, 59, 0.95)",
        ringTextColor: "#FFE873",
        centerIconColor: "#FFD43B"
      }
    },
    {
      id: "premiere",
      type: "sticker",
      className: "absolute -left-6 bottom-16 h-[68px] w-[68px] lg:-left-10 lg:bottom-20 lg:h-[90px] lg:w-[90px] z-10",
      props: {
        ringText: "PREMIERE PRO",
        icon: <SiAdobepremierepro className="h-[28px] w-[28px] lg:h-[38px] lg:w-[38px]" />,
        outerColor: "#00005B",
        ringStrokeColor: "rgba(153, 153, 255, 0.95)",
        ringTextColor: "#9999FF",
        centerIconColor: "#9999FF"
      }
    },
    {
      id: "figma",
      type: "sticker",
      className: "absolute -left-2 top-12 h-[64px] w-[64px] lg:-left-4 lg:top-16 lg:h-[86px] lg:w-[86px] z-10",
      props: {
        ringText: "FIGMA",
        icon: <SiFigma className="h-[26px] w-[26px] lg:h-[36px] lg:w-[36px]" />,
        outerColor: "#F24E1E",
        ringStrokeColor: "rgba(255, 255, 255, 0.95)",
        ringTextColor: "#FFFFFF",
        centerIconColor: "#FFFFFF"
      }
    },
    {
      id: "nextjs",
      type: "sticker",
      className: "absolute -left-2 top-12 h-[64px] w-[64px] lg:-left-4 lg:top-16 lg:h-[86px] lg:w-[86px] z-10",
      props: {
        ringText: "NEXT.JS",
        icon: <SiNextdotjs className="h-[26px] w-[26px] lg:h-[36px] lg:w-[36px]" />,
        outerColor: "#000000",
        ringStrokeColor: "rgba(255, 255, 255, 0.95)",
        ringTextColor: "#FFFFFF",
        centerIconColor: "#FFFFFF"
      }
    },
    {
      id: "reactrouter",
      type: "badge",
      className: "absolute left-8 -top-2 z-10 lg:left-12 lg:-top-4",
      props: {
        icon: <SiReactrouter className="h-full w-full" />,
        label: "React Router",
        customColor: "#F97316" // オレンジ
      }
    },
    {
      id: "CameraA6400",
      type: "badge",
      className: "absolute left-8 -top-2 z-10 lg:left-12 lg:-top-4",
      props: {
        icon: <GiPhotoCamera className="h-full w-full" />,
        label: "α6400",
        customColor: "#000000"
      }
    },
    {
      id: "CameraEOS70d",
      type: "badge",
      className: "absolute left-8 -top-2 z-10 lg:left-12 lg:-top-4",
      props: {
        icon: <GiPhotoCamera className="h-full w-full" />,
        label: "EOS 70D",
        customColor: "#000000"
      }
    },
    {
      id: "tailwind",
      type: "badge",
      className: "absolute left-2/3 -top-4 -translate-x-1/2 z-10 lg:left-3/4 lg:-top-6",
      props: {
        icon: <SiTailwindcss className="h-full w-full" />,
        label: "Tailwind CSS",
        customColor: "#06B6D4" // 水色 (Cyan)
      }
    },
    {
      id: "canva",
      type: "badge",
      className: "absolute left-1/2 -bottom-4 -translate-x-1/2 z-10 lg:-bottom-6",
      props: {
        icon: <SiCanva className="h-full w-full" />,
        label: "Canva",
        customColor: "#00C4CC"
      }
    }
  ];

  const [positions] = useState<Record<string, Position>>(() => {
    const initialPositions: Record<string, Position> = {};
    items.forEach((item) => {
      initialPositions[item.id] = {
        x: Math.random() * 60 - 30,
        y: Math.random() * 60 - 30,
        rotate: Math.random() * 40 - 20,
      };
    });
    return initialPositions;
  });

  const [zIndices, setZIndices] = useState<Record<string, number>>(() => {
    const initialZIndices: Record<string, number> = {};
    items.forEach((item) => {
      initialZIndices[item.id] = 10;
    });
    return initialZIndices;
  });

  const handleDragStart = (id: string) => {
    maxZIndexRef.current += 1;
    setZIndices((prev) => ({
      ...prev,
      [id]: maxZIndexRef.current,
    }));
  };

  return (
    <section id="about" className="mx-auto flex w-full max-w-[1200px] flex-col justify-center gap-[13px] py-10 lg:py-0">
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:space-x-[120px] lg:gap-0">
        <div className="relative h-[240px] w-[240px] shrink-0 lg:h-[340px] lg:w-[340px]" ref={constraintsRef}>
          <motion.div
            className="h-full w-full overflow-hidden"
            style={{
              WebkitMaskImage: "-webkit-radial-gradient(white, black)",
              backfaceVisibility: "hidden",
              transform: "translateZ(0)",
            }}
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

          {items.map((item, index) => (
            <motion.div
              key={item.id}
              className={`${item.className} cursor-grab active:cursor-grabbing`}
              style={{ zIndex: zIndices[item.id] }}
              initial={{ opacity: 0, scale: 2, rotate: 0 }}
              animate={positions[item.id] ? {
                opacity: 1,
                scale: 1,
                x: positions[item.id].x,
                y: positions[item.id].y,
                rotate: positions[item.id].rotate
              } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 15, mass: 1, delay: 1.2 + (index * 0.1) }}
              whileDrag={{ scale: 1.1, zIndex: 1000, filter: "drop-shadow(0px 5px 10px rgba(0,0,0,0.3))" }}
              drag
              dragConstraints={constraintsRef}
              onDragStart={() => handleDragStart(item.id)}
            >
              {item.type === "sticker" ? (
                <TechSticker className="relative h-full w-full" {...item.props} />
              ) : (
                <IconBadge {...item.props} />
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex w-full flex-col justify-center gap-[13px] lg:w-[608px]">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col font-bold items-start md:items-end"
          >
            <div className="flex items-center justify-center space-x-[16px] font-bold lg:justify-end lg:space-x-[30px]">
              <span className="text-[32px]">About me</span>
              <span className="text-[16px]">私について</span>
            </div>
            <span>Takuma Tateishi / 立石 琢磨</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="text-[14px] tracking-[5%] lg:text-[16px]"
          >
            2006年、佐賀県生まれ。広島市立大学 情報科学部在学中。<br />幼少期は、国内・海外問わずたくさん旅行をする家庭で育ちました。また、小学5年生より、ScratchとPythonをはじめ、自分でモノを作る面白さに気づいて今に至ります。現在はPythonや、Next.jsを使用してWebアプリケーションや、Discord Botなどを開発したり、企業でインターン生として勤務したりしています。また、高校在学中には学校のInstagramアカウント運営等を行っていた経験があり、映像制作をすることもあります。
          </motion.p>
        </div>
      </div>
    </section>
  );
}