import { SellerType } from "@/types";
import React from "react";

const ShopPage = ({ seller }: { seller: SellerType }) => {
  return <div>{seller.companyName}</div>;
};

export default ShopPage;
