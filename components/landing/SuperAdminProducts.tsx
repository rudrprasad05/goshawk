import { ProductType } from "@/types";

import LandingPageHorizontal from "../ads/LandingPageHorizontal";
import { ProductCard } from "./ProductCard";

const SuperAdminProducts = ({ products }: { products: ProductType[] }) => {
  return (
    <div className="flex gap-6 py-6">
      <div className="flex flex-col gap-6">
        <LandingPageHorizontal location="a1" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  );
};

export default SuperAdminProducts;
