import About from "../components/About";
import Articles from "../components/Articles";
import Hero from "../components/Hero";
import Works from "../components/Works";

async function getZennArticles() {
  try {
    const res = await fetch("https://zenn.dev/t_taku0427/feed", { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const text = await res.text();

    const items = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(text)) !== null) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title>(.*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);

      if (titleMatch && linkMatch && dateMatch) {
        const date = new Date(dateMatch[1]);
        const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

        items.push({
          title: titleMatch[1].replace("<![CDATA[", "").replace("]]>", ""),
          hosted: "zenn",
          date: formattedDate,
          href: linkMatch[1],
        });
      }
    }
    return items.slice(0, 4);
  } catch {
    return [];
  }
}

export default async function Home() {
  const articles = await getZennArticles();
  const allArticles = [
    {
      title: "PyCon JP 2025のWebサイトを支えた技術",
      hosted: "Speaker Deck",
      date: "2025.09.27",
      href: "https://speakerdeck.com/t_taku0427/pycon-jp-2025nouebusaitowozhi-etaji-shu",
    },
    ...articles,
  ];

  allArticles.sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="flex min-h-screen w-full flex-col max-lg:gap-[60px] px-[20px] lg:px-[70px]">
      <Hero />
      <About />
      <Works />
      <Articles articles={allArticles} />
    </div>
  );
}
