import React from "react";
import AdCaro from "../ads/AdCaro";
import { ProductType } from "@/types";

const AdCaroSection = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <AdCaro products={products} />
    </div>
  );
};

export default AdCaroSection;
