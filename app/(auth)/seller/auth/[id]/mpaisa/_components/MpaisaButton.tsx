"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ChangeMpaisaId, GetOneOrderDetails } from "@/actions/orders";
import { OrderType } from "@/types";

const MpaisaButton = () => {
  const params = useSearchParams();
  const id = params.get("id");

  const [order, setOrder] = useState<OrderType | null>();

  useEffect(() => {
    const GetOrder = async () => {
      if (id == null || id == undefined) return;
      const orderreq = await GetOneOrderDetails(id);
      setOrder(orderreq);
    };
    GetOrder();
  });

  const router = useRouter();
  const handleClick = async () => {
    if (!order) return;
    if (order?.isPaid) {
      return;
    }
    let date = new Date();
    let mId = date.getTime() as number;
    const changempaisaid = await ChangeMpaisaId(order?.id, mId);
    const res = await axios.get(
      `/api/mpaisa?
      url=http://localhost:3000/cart/mpaisa/orderconfig
      &&tID=${mId.toString()}
      &&amt=${order?.total}
      &&cID=26484&&iDet=detail`
    );
    console.log(res, order);
    router.push(res.data);
  };
  return (
    <button
      className="w-32 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={() => handleClick()}
    >
      <div className="w-full h-full rounded-md">
        <img
          className="object-cover h-full w-full"
          alt="pay"
          src={"/mpaisa-pay.png"}
        />
      </div>
    </button>
  );
};

export default MpaisaButton;
