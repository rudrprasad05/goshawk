"use client";

import { GetOrderById } from "@/actions/orders";
import { OrderType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderConfig = () => {
  const sParams = useSearchParams();
  const router = useRouter();
  const tId = sParams.get("tID");
  const [order, setOrder] = useState<OrderType | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!tId || tId == "") return `no id given`;

      const res = await GetOrderById(tId)
        .then((r) => {
          setOrder(r);
          router.push("/");
          toast.success("Paid Successfully");
          console.log("first");
        })
        .catch((e) => {
          console.log(e);
        });
    };
    getData();
  }, [order]);

  return <></>;
};

export default OrderConfig;
