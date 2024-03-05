import type { Metadata } from "next";
import NavBar2 from "@/components/nav/NavBar2";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Goswak Shops and Marketplace",
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
        {children}
        <Footer />
      </div>
    </main>
  );
}
