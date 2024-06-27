"use client";

import { GetOrderById, GetOrderByTId } from "@/actions/orders";
import { OrderType } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderSync = () => {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as unknown as string;
  const [order, setOrder] = useState<OrderType | null>(null);

  if (!orderId || orderId == "") return `no id given`;

  useEffect(() => {
    const getData = async () => {
      const res = await GetOrderById(orderId)
        .then((r) => {
          setOrder(r);
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
