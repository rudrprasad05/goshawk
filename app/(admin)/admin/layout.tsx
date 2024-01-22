import SideNavServerCont from "@/components/superadmin/SideNavServerCont";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Goshawk Fiji. Ecommerce marketplace",
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
