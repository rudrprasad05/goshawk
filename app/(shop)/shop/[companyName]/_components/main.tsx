import Header from "@/components/Admin/Header";
import { ProductCard } from "@/components/landing/ProductCard";
import { SellerType } from "@/types";
import React from "react";

type Local = {
  seller: SellerType;
};

const Main = ({ seller }: { seller: SellerType }) => {
  return (
    <div>
      <Header name={seller.companyName} showProfile={false}>
        <>{null}</>
      </Header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {seller.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Main;
