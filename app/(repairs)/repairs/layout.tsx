import type { Metadata } from "next";
import Navbar from "@/components/nav/NavBar";
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
        <Navbar />
        {children}
        <Footer />
      </div>
    </main>
  );
}
