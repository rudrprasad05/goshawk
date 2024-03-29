import { getCurrentUser } from "@/actions/user";
import QuickActions from "@/components/Admin/products/QuickActions";
import { Feed } from "@/components/Admin/products/SiteProductFeed";
import { ProductFeed } from "@/components/shop/ProductFeed";
import React from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  return (
    <>
      <ProductFeed props={props} />
    </>
  );
};

export default page;
