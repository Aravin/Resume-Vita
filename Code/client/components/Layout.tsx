"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

// Dynamically import Navbar to prevent SSR execution
const Navbar = dynamic(() => import("./Navbar"), {
  ssr: false,
});

export default function Layout({ children }: any) {
  const pathname = usePathname();
  const isPublicResumeRoute = pathname?.startsWith("/public/");

  if (isPublicResumeRoute) {
    return children;
  }

  return (
    <>
      <Navbar />
      {/* todo optimize */}
      <main className="min-h-[60vh] px-4 pb-3 pt-2 md:px-6 md:pb-5 md:pt-4 lg:px-8 lg:pb-6 lg:pt-4">{children}</main>
      <Footer />
    </>
  );
}
