import FadeInImage from "./_ui/FadeInImage";

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen w-full justify-center py-20 lg:h-screen lg:py-0">
      <div className="relative flex w-full items-center justify-center">
        <div className="relative flex flex-col items-center justify-center gap-6 lg:flex-row lg:gap-0 lg:space-x-[80px]">
          <FadeInImage src={"/heroes/hero_1.png"} alt={"hero image"} width={800} height={800} className="h-[180px] w-[360px] md:h-[360px] md:w-[220px] rounded-[200px] object-cover object-left lg:h-[481px] lg:w-[292px]" delay={0} />
          <FadeInImage src={"/heroes/hero_2.png"} alt={"hero image"} width={800} height={800} className="h-[180px] w-[360px] md:h-[360px] md:w-[220px] rounded-[200px] object-cover lg:h-[481px] lg:w-[292px]" delay={0.2} />
          <FadeInImage src={"/heroes/hero_3.png"} alt={"hero image"} width={800} height={800} className="h-[180px] w-[360px] md:h-[360px] md:w-[220px] rounded-[200px] object-cover lg:h-[481px] lg:w-[292px]" delay={0.4} />
        </div>
      </div>
      <div className="mt-6 absolute bottom-[48px] right-0 lg:mt-0 text-right">
        <div className="text-[14px] font-medium lg:text-[16px]">web developer</div>
        <div className="text-[20px] font-medium lg:text-[24px]">Takuma Tateishi</div>
      </div>
    </section>
  )
}