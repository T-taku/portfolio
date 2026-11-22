import Link from "next/link";

export default function SeeMoreLink({ href }: { href: string }) {
  return (
    <Link href={href} className="group relative inline-flex w-fit items-center gap-2 text-[14px] font-medium tracking-[0.14em] lg:text-[16px]">
      SEE MORE
      <span aria-hidden="true">→</span>
      <span className="absolute -bottom-1 left-0 h-[1px] w-full origin-bottom-right scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100" />
    </Link>
  );
}
