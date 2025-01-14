import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { Toaster } from "react-hot-toast";
import AuthContext from "@/context/AuthContext";
import { CartContextProvider } from "@/context/CartContext";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";  

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Goshawk, Your one stop shop for anything online",
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
              <SonnarToaster />
              <TooltipProvider>
                <main className="min-h-screen">{children}</main>
              </TooltipProvider>
            </ThemeProvider>
          </CartContextProvider>
        </AuthContext>
      </body>
    </html>
  );
}
