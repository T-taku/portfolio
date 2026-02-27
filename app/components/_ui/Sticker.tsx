import { useId, ReactNode } from "react";

interface TechStickerProps {
  className?: string;
  ringText: string;
  icon: ReactNode;
  outerColor?: string;
  ringStrokeColor?: string;
  ringTextColor?: string;
  centerIconColor?: string;
}

export default function TechSticker({
  className = "",
  ringText,
  icon,
  outerColor = "#3776AB",
  ringStrokeColor = "rgba(255, 212, 59, 0.95)",
  ringTextColor = "#FFE873",
  centerIconColor = "#FFD43B"
}: TechStickerProps) {
  const pathId = useId().replace(/:/g, "");
  
  const estimatedCharWidth = 8; 
  const repeatCount = Math.max(1, Math.floor(414 / ((ringText.length + 3) * estimatedCharWidth)));
  
  const repeatedText = Array(repeatCount).fill(ringText + " •\u00A0").join("");

  const circumference = Math.PI * 2 * 66;
  const adjustedTextLength = circumference - 5; 

  return (
    <div aria-hidden className={`relative ${className}`}>
      <svg viewBox="0 0 160 160" className="h-full w-full">
        <defs>
          <path
            id={`sticker-circle-text-${pathId}`}
            d="M 80,80 m -66,0 a 66,66 0 1,1 132,0 a 66,66 0 1,1 -132,0"
          />
        </defs>

        <circle cx="80" cy="80" r="78" fill={outerColor} />
        <circle cx="80" cy="80" r="62" fill="none" stroke={ringStrokeColor} strokeWidth="1.8" />

        <text 
          fill={ringTextColor} 
          fontSize="10" 
          fontWeight="500" 
          textLength={adjustedTextLength} 
          lengthAdjust="spacing"
          xmlSpace="preserve"
        >
          <textPath href={`#sticker-circle-text-${pathId}`} startOffset="0%">
            {repeatedText}
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex items-center justify-center" style={{ color: centerIconColor }}>
        {icon}
      </div>
    </div>
  );
}