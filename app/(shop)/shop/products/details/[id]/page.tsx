import { GetProductDetails } from "@/actions/products";
import DetailsPage from "@/components/Admin/products/DetailsPage";
import { ShopProductsDetails } from "@/components/shop/ShopProductsDetails";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const product = await GetProductDetails(id);

  return <ShopProductsDetails product={product} />;
};

export default page;
