import SideNav from "@/components/Admin/SideNav";
import Navbar from "@/components/nav/NavBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alibaba Clone",
  description: "Designed, developed and Powered by Procyon",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideNav />
      <div className="grow p-6">{children}</div>
    </div>
  );
}
