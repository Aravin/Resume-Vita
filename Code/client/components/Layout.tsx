import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {/* todo optimize */}
      <main className="p-4 md:p-8 lg:p-12 min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
