import FadeInImage from "./_ui/FadeInImage";

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen w-full justify-center">
      <div className="relative flex w-full items-center justify-center">
        <div className="relative flex items-center justify-center space-x-[80px]">
          <FadeInImage src={"/heroes/hero_1.png"} alt={"hero image"} width={800} height={800} className="w-[292px] h-[481px] rounded-[200px] object-cover object-left" delay={0} />
          <FadeInImage src={"/heroes/hero_2.png"} alt={"hero image"} width={800} height={800} className="w-[292px] h-[481px] rounded-[200px] object-cover" delay={0.2} />
          <FadeInImage src={"/heroes/hero_3.png"} alt={"hero image"} width={800} height={800} className="w-[292px] h-[481px] rounded-[200px] object-cover" delay={0.4} />
        </div>
      </div>
      <div className="absolute right-0 bottom-[48px]">
        <div className="text-[16px] font-medium">web developer</div>
        <div className="text-[24px] font-medium">Takuma Tateishi</div>
      </div>
    </section>
  )
}