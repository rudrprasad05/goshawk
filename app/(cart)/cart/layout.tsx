import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavBar2 from "@/components/nav/NavBar2";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goshawk Cart",
  description: "Designed, developed and Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="">
        <NavBar2 />
        <Suspense fallback={<Loading />}>{children}</Suspense>

        <Footer />
      </div>
    </main>
  );
}
