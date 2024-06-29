import { getCurrentUser } from "@/actions/user";
import QuickActions from "@/components/Admin/products/QuickActions";
import { Feed } from "@/components/Admin/products/SiteProductFeed";
import { ProductFeed } from "@/components/shop/ProductFeed";
import React, { Suspense } from "react";
import Loading from "./loading";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductFeed props={props} />
    </Suspense>
  );
};

export default page;
