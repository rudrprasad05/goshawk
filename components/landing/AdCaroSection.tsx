import React from "react";
import AdCaro from "../ads/AdCaro";
import { ProductType } from "@/types";

const AdCaroSection = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="px-12">
      <AdCaro products={products} />
    </div>
  );
};

export default AdCaroSection;
