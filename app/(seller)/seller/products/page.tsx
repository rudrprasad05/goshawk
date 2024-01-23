import { getCurrentUser } from "@/actions/user";
import QuickActions from "@/components/Admin/products/QuickActions";
import { Feed } from "@/components/Admin/products/SiteProductFeed";
import React from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <>
      <QuickActions user={user} />
      <Feed user={user} props={props} />
    </>
  );
};

export default page;
