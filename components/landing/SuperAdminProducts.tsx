import { GetCurrentUserWishlistWithWishlistItems } from "@/actions/wishlist";
import { ProductType } from "@/types";

import LandingPageHorizontal from "../ads/LandingPageHorizontal";
import { ProductCard } from "./ProductCard";

const SuperAdminProducts = async ({ products }: { products: ProductType[] }) => {
  const wishlist = await GetCurrentUserWishlistWithWishlistItems();
  return (
    <div className="flex gap-6 py-6 grow">
      <div className="flex flex-col gap-6 w-full">
        <LandingPageHorizontal location="a1" />

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard wishlist={wishlist} key={product.id} product={product} />
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
