import Sidemenu from "../components/_ui/Sidemenu";
import Footer from "../components/_ui/Footer";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidemenu />
      <main className="lg:pl-[248px]">{children}</main>
      <Footer />
    </>
  );
}
