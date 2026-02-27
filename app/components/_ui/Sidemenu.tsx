"use client";

interface SidemenuProps {
  isCurrentTop?: boolean;
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const targetId = href.substring(1);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <a href={href} onClick={handleScroll} className="relative w-fit group cursor-pointer">
      {children}
      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-current origin-bottom-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-bottom-left group-hover:scale-x-100 group-hover:h-[2px]" />
    </a>
  );
};

export default function Sidemenu({ isCurrentTop }: SidemenuProps) {
  return (
    <>
      <div className="fixed top-1/2 -translate-y-1/2 left-[70px]">
        <div className="flex flex-col space-y-[5px] text-[24px] font-bold">
          {isCurrentTop ? (
            <NavLink href="#top">Top</NavLink>
          ) : (
            <></>
          )}
          <NavLink href="#about">About</NavLink>
          <NavLink href="#works">Works</NavLink>
          <NavLink href="#articles">Articles</NavLink>
        </div>
      </div >
    </>
  )
}