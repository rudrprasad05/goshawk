import { ProductType } from "@/types";
import React from "react";

import LandingPageHorizontal from "../ads/LandingPageHorizontal";
import LandingPageVertical from "../ads/LandingPageVertical";
import { ProductCard } from "./ProductCard";

const SuperAdminProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="lg:px-20 px-6">
      <div className="flex gap-6 py-6">
        <div className="flex flex-col gap-6 grow">
          <LandingPageHorizontal location="a1" />
          <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <LandingPageHorizontal location="a2" />
        </div>
        {/* <div className="">
          <LandingPageVertical />
        </div> */}
      </div>
    </div>
  );
};

export default SuperAdminProducts;
