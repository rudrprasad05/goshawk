import { getCurrentUser } from "@/actions/user";
import SideNav from "@/components/Admin/SideNav";
import SideNavServerCont from "@/components/Admin/SideNavServerCont";
import Pageloader from "@/components/global/Pageloader";
import VerifyEmailFirst from "@/components/global/VerifyEmailFirst";
import NavBar2 from "@/components/nav/NavBar2";

import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

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
  if (!user.emailVerified) return <VerifyEmailFirst />;
  if (!user.seller) return redirect(`/seller/auth/${user.id}`);

  return (
    <div className="flex">
      <SideNavServerCont />
      <Suspense fallback={<Pageloader />}>
        <div className="grow">{children}</div>
      </Suspense>
    </div>
  );
}
