import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/nav/NavBar";
import ThemeSwitcher from "@/theme/ThemeSwitcher";

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
        <Navbar />
        {children}
      </div>
    </main>
  );
}
