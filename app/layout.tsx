import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import { CartContextProvider } from "@/context/CartContext";

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
        <AuthContext>
          <CartContextProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <Toaster />
              <main className="min-h-screen">{children}</main>
            </ThemeProvider>
          </CartContextProvider>
        </AuthContext>
      </body>
    </html>
  );
}
