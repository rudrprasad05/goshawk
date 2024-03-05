import Footer from "@/components/Footer";
import NavBar2 from "@/components/nav/NavBar2";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify your email",
  description: "Designed, developed and Powered by Procyon",
};

export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full h-full">
      <NavBar2 />
      <div className="w-full h-full ">{children}</div>
      <Footer />
    </main>
  );
}
