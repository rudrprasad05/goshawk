import { SellerType } from "@/types";
import React from "react";

import LandingPageHorizontal from "../ads/LandingPageHorizontal";
import { ProductCard } from "../landing/ProductCard";
import { ShopRecentFeed } from "./ShopRecentFeed";
import { useSession } from "next-auth/react";
import AdminControls from "./AdminControls";

const ShopPage = ({ seller }: { seller: SellerType }) => {
  return (
    <div className="px-20">
      <div className="w-full py-10">
        <h1 className="text-center text-4xl font-bold">{seller.companyName}</h1>
      </div>
      <div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {seller.products.slice(0, 3).map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="w-full py-6">
        <LandingPageHorizontal location="s1" />
      </div>
      <ShopRecentFeed user={seller} />
    </div>
  );
};

export default ShopPage;
