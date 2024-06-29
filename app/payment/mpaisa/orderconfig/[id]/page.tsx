"use client";

import { GetOrderById } from "@/actions/orders";
import { CartContext } from "@/context/CartContext";
import { OrderType } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const OrderSync = () => {
  const { cartProducts, getTotal, removeCart, clearCart } =
    useContext(CartContext);
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as unknown as string;
  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!orderId || orderId == "") return;
      const res = await GetOrderById(orderId)
        .then((r) => {
          setOrder(r);
          clearCart();
          router.push("/");
          toast.success("Paid Successfully");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }, [order]);

  return <></>;
};

export default OrderSync;
