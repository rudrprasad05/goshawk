import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeSwitcher from "@/theme/ThemeSwitcher";
import Footer from "@/components/Footer";
import NavBar2 from "@/components/nav/NavBar2";
import SideNavServerCont from "./_components/SideNavServerCont";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goshawk Fiji",
  description: "Designed, developed and Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNavServerCont />
      <div className="grow p-6">{children}</div>
    </div>
  );
}
