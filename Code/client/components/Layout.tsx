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
      <main className="p-4 md:p-8 lg:p-12 min-h-[60vh]">{children}</main>
      <Footer />
    </>
  );
}
