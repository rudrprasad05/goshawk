"use client";

import {
  FindOrderBySha256AndUpdateOrderStatus,
  UpdateOrderById,
} from "@/actions/orders";
import { CartContext } from "@/context/CartContext";
import { OrderType } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const OrderSync = () => {
  const { cartProducts, getTotal, removeCart, clearCart } =
    useContext(CartContext);
  const params = useParams();
  const sparams = useSearchParams();
  const router = useRouter();
  const orderId = params.id as unknown as string;
  const sha256 = sparams.get("token") as unknown as string;

  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!orderId || orderId == "") return;
      const res = await UpdateOrderById(orderId, sha256)
        .then((r) => {
          setOrder(r);
          clearCart();
          toast.success("Paid Successfully");
          router.push("/");
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
