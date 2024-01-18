import { Feed } from "@/components/Admin/products/SiteProductFeed";
import React from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = (props: PageProps) => {
  return <Feed {...props} />;
};

export default page;
