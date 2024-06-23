"use client";

import { GetOrderByTId } from "@/actions/orders";
import { OrderType } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const OrderConfig = () => {
  const sParams = useSearchParams();
  const router = useRouter();
  const tId = sParams.get("tID");
  const [order, setOrder] = useState<OrderType | null>(null);

  if (!tId || tId == "") return `no id given`;

  useEffect(() => {
    const getData = async () => {
      const res = await GetOrderByTId(parseInt(tId))
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
