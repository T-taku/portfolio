import About from "../components/About";
import Articles from "../components/Articles";
import Hero from "../components/Hero";
import Works from "../components/Works";

export const revalidate = 3600; // 1時間ごとにISRで再生成

type Article = {
  title: string;
  hosted: string;
  date: string;
  href: string;
};

async function getRssArticles(feedUrl: string, hosted: string): Promise<Article[]> {
  try {
    const res = await fetch(feedUrl, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const text = await res.text();

    const items: Article[] = [];
    const itemRegex = /<item>([\s\S]*?)<\/item>/g;
    let match;

    while ((match = itemRegex.exec(text)) !== null) {
      const itemContent = match[1];
      const titleMatch = itemContent.match(/<title>([\s\S]*?)<\/title>/);
      const linkMatch = itemContent.match(/<link>(.*?)<\/link>/);
      const dateMatch = itemContent.match(/<pubDate>(.*?)<\/pubDate>/);

      if (titleMatch && linkMatch && dateMatch) {
        const date = new Date(dateMatch[1]);
        const formattedDate = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, "0")}.${date.getDate().toString().padStart(2, "0")}`;

        items.push({
          title: titleMatch[1].replace("<![CDATA[", "").replace("]]>", "").trim(),
          hosted,
          date: formattedDate,
          href: linkMatch[1].trim(),
        });
      }
    }
    return items;
  } catch {
    return [];
  }
}

export default async function Home() {
  const [zennArticles, sizuArticles] = await Promise.all([
    getRssArticles("https://zenn.dev/t_taku0427/feed", "zenn"),
    getRssArticles("https://sizu.me/t_taku0427/rss", "しずかなインターネット"),
  ]);

  const allArticles = [
    {
      title: "PyCon JP 2025のWebサイトを支えた技術",
      hosted: "Speaker Deck",
      date: "2025.09.27",
      href: "https://speakerdeck.com/t_taku0427/pycon-jp-2025nouebusaitowozhi-etaji-shu",
    },
    ...zennArticles,
    ...sizuArticles,
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
