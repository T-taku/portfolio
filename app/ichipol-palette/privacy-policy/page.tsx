import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/app/components/_ui/Footer";

const title = "いちぽる履修パレット プライバシーポリシー";
const description = "Chrome 拡張機能「いちぽる履修パレット」のプライバシーポリシーです。";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ichipol-palette/privacy-policy" },
  openGraph: { title, description, type: "article" },
  twitter: { card: "summary", title, description },
};

export default function IchipolPalettePrivacyPolicyPage() {
  return (
    <>
      <main className="min-h-screen w-full bg-white px-5 pb-24 pt-12">
        <div className="mx-auto w-full max-w-2xl">
          <Link href="/" className="text-sm text-neutral-500 transition-opacity hover:opacity-70">
            t-taku.app
          </Link>

          <article className="prose prose-neutral mt-10 max-w-none prose-h1:text-[26px] prose-h1:leading-snug prose-h2:mt-10 prose-h2:text-lg">
            <h1>いちぽる履修パレット プライバシーポリシー</h1>
            <p className="text-sm text-neutral-500">最終更新: 2026年9月27日</p>

            <p>
              いちぽる履修パレット（以下「この拡張機能」）は、広島市立大学の UNIPA（いちぽる）で、履修科目を自学科・他学科・共通科目に色分けする
              Chrome 拡張機能です。広島市立大学の公式機能ではなく、個人が開発しています。
            </p>

            <h2>扱う情報</h2>
            <p>色分けのため、次の情報を利用者のブラウザの中だけで読みます。</p>
            <ul>
              <li>履修登録とシラバスの画面に表示された科目名、授業コード、開講所属</li>
              <li>いちぽる自身が同じサイト内で受け取った応答のうち、科目に関係する部分</li>
              <li>利用者が設定した学部、学科、色</li>
            </ul>
            <p>
              パスワード、クッキー、学籍番号は読み取りません。いちぽる以外のサイトでは動作しません。
            </p>

            <h2>外部への送信</h2>
            <p>
              この拡張機能は、読み取った情報を開発者のサーバや第三者へ送信しません。アクセス解析、広告、外部のフォントや CDN も使っていません。
            </p>

            <h2>保存</h2>
            <ul>
              <li>
                学部、学科、色の設定は、そのブラウザの <code>chrome.storage.local</code> に保存します。
              </li>
              <li>
                画面から取り出した科目の一時データは <code>chrome.storage.session</code> に置き、ブラウザを閉じると消えます。
              </li>
              <li>授業コードの一覧は拡張機能に同梱したファイルで、実行時に外から取得しません。</li>
            </ul>
            <p>拡張機能を削除すると、これらのデータもブラウザから消えます。</p>

            <h2>利用目的</h2>
            <p>読み取った情報は、画面上の色分けと、その色になった理由の表示にだけ使います。</p>
            <ul>
              <li>第三者に販売したり、渡したりしません。</li>
              <li>色分け以外の目的（広告、信用度の判断や貸付を含みます）には使いません。</li>
              <li>開発者がその内容を見ることはありません。利用者が自分から問い合わせに添付した場合を除きます。</li>
            </ul>

            <h2>改定</h2>
            <p>内容を変えるときは、このページを更新し、最終更新日を改めます。</p>

            <h2>お問い合わせ</h2>
            <p>
              このポリシーや拡張機能についての連絡は、X の{" "}
              <a href="https://x.com/T_taku0427" target="_blank" rel="noopener noreferrer">
                @T_taku0427
              </a>{" "}
              までお願いします。広島市立大学へのお問い合わせはご遠慮ください。
            </p>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
