import Sidemenu from "../components/_ui/Sidemenu";
import Footer from "../components/_ui/Footer";
export default function WorksLayout({
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
