import { GetSellerByName } from "@/actions/seller";
import ShopPage from "@/components/shop/ShopPage";
import React from "react";

const page = async ({ params }: { params: { companyName: string } }) => {
  const { companyName } = params;
  const seller = await GetSellerByName(companyName);

  return (
    <div>
      <ShopPage seller={seller} />
    </div>
  );
};

export default page;
