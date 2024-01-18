import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <AuthContext>
            <Toaster />
            <main className="min-h-screen">{children}</main>
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
