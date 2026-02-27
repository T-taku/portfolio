import type { ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  label: string;
  className?: string;
  customColor?: string;
}

export default function IconBadge({ icon, label, className = "", customColor }: IconBadgeProps) {
  return (
    <div
      className={`flex w-max items-center justify-center gap-1 rounded-full border border-white bg-black px-2 py-1 text-white lg:px-3 lg:py-1.5 ${className}`}
      style={customColor ? { backgroundColor: customColor } : undefined}
    >
      <span className="h-[11px] w-[11px] shrink-0 lg:h-[14px] lg:w-[14px]">
        {icon}
      </span>
      <span className="whitespace-nowrap text-[9px] font-medium tracking-[0.08em] lg:text-[11px]">{label}</span>
    </div>
  );
}
