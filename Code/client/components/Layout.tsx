"use client";

import dynamic from "next/dynamic";
import Footer from "./Footer";

// Dynamically import Navbar to prevent SSR execution
const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

export default function Layout({ children }: any) {
  return (
    <>
      <Navbar />
      {/* todo optimize */}
      <main className="min-h-[60vh] px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6">{children}</main>
      <Footer />
    </>
  );
}
