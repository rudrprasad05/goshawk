import { GetOrderWithProductsForOneCustomer } from "@/actions/orders";
import React from "react";
import OrderCard from "./OrderCard";
import Pageloader from "@/components/global/Pageloader";

interface props {
  id: string;
}

const OrderSection: React.FC<props> = async (props: props) => {
  const orders = await GetOrderWithProductsForOneCustomer(props.id);

  console.log(orders);
  return (
    <main className="w-[90vw] mx-auto my-12">
      <OrderCard order={orders} />
    </main>
  );
};

export default OrderSection;
