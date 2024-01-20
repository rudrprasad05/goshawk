import { ProductType } from "@/types";
import React from "react";

import { ProductCard } from "./ProductCard";
import LandingPageHorizontal from "../ads/LandingPageHorizontal";
import LandingPageVertical from "../ads/LandingPageVertical";

const SuperAdminProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="px-20">
      <h1 className="text-4xl font-bold">Top Picks</h1>
      <div className="flex gap-6 py-6">
        <div className="flex flex-col gap-6">
          <LandingPageHorizontal />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
        <div>
          <LandingPageVertical />
        </div>
      </div>
    </div>
  );
};

export default SuperAdminProducts;
