import { GetOrderWithProductsForOneCustomer } from "@/actions/orders";
import Header from "@/components/Admin/Header";
import Pageloader from "@/components/global/Pageloader";
import { Box } from "lucide-react";
import React from "react";

import OrderCard from "./OrderCard";

interface props {
  id: string;
}

const OrderSection: React.FC<props> = async (props: props) => {
  const orders = await GetOrderWithProductsForOneCustomer(props.id);

  console.log(orders);
  return (
    <div>
      <Header showProfile name="Wishlist">
        <Box />
      </Header>
      <main className="my-5">
        <OrderCard order={orders} />
      </main>
    </div>
  );
};

export default OrderSection;
