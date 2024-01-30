import { GetProductDetails } from "@/actions/products";
import DetailsPage from "@/components/Admin/products/DetailsPage";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const product = await GetProductDetails(id);

  console.log(product);

  return <DetailsPage product={product} />;
};

export default page;
