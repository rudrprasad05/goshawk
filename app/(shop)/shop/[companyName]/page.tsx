import { GetSellerByName } from "@/actions/seller";
import ShopPage from "@/components/shop/ShopPage";
import React from "react";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const { companyName } = props.params;
  const seller = await GetSellerByName(companyName as string);

  return (
    <div>
      <ShopPage seller={seller} props={props} />
    </div>
  );
};

export default page;
