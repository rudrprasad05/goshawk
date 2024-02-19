import { getCurrentUser } from "@/actions/user";
import SideNav from "@/components/Admin/SideNav";
import SideNavServerCont from "@/components/Admin/SideNavServerCont";
import Navbar from "@/components/nav/NavBar";

import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Alibaba Clone",
  description: "Designed, developed and Powered by Procyon",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) return redirect(`/`);
  if (user.seller == null) return redirect(`/seller/auth/${user.id}`);

  return (
    <div className="flex">
      <SideNavServerCont />
      <div className="grow">{children}</div>
    </div>
  );
}
