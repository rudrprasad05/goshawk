import { GetOneMerchantList, GetOrdertListDetails } from "@/actions/orders";
import { GetProductDetails } from "@/actions/products";
import DetailsPage from "@/components/Admin/products/DetailsPage";
import OrderDetailsPage from "@/components/orders/OrderDetailsPage";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const order = await GetOneMerchantList(id);

  return <OrderDetailsPage order={order} />;
};

export default page;
