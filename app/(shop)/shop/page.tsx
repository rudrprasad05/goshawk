import LandingPage from "@/components/shop/LandingPage";
import { ShopSellerFeed } from "@/components/shop/ShopSellerFeed";
import React from "react";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = (props: PageProps) => {
  return (
    <div>
      <LandingPage />
      <ShopSellerFeed props={props} />
    </div>
  );
};

export default page;
