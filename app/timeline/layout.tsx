import Sidemenu from "../components/_ui/Sidemenu";
import Footer from "../components/_ui/Footer";

export default function TimelineLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidemenu />
      <main>{children}</main>
      <Footer />
    </>
  );
}
