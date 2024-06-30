"use client";

import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import axios from "axios";
import Image from "next/image";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { GetSellerWithSubBySellerIdType } from "@/types";
import { GetSellerWithSubBySellerId } from "@/actions/seller";
import { ChangeMpaisaId } from "@/actions/orders";

const MpaisaButton = ({ data }: { data: GetSellerWithSubBySellerIdType }) => {
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();
  const handleClick = async () => {
    if (!data) return;

    if (data?.isPaid) {
      return;
    }

    let date = new Date();
    let mId = date.getTime() as number;
    // const changempaisaid = await ChangeMpaisaId(seller?.id, mId);
    const res = await axios.get(
      `/api/mpaisa?
      url=${process.env.URL}/seller/${data.id}/mpaisa/orderconfig
      &&tID=${mId.toString()}
      &&amt=${data}
      &&cID=26484&&iDet=detail`
    );
    console.log(res, data);
    router.push(res.data);
  };
  return (
    <button
      className="w-32 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      onClick={() => handleClick()}
    >
      <div className="w-full h-full rounded-md">
        <Image
          className="object-cover h-full w-full"
          alt="pay"
          width={150}
          height={70}
          src={"/mpaisa-pay.png"}
        />
      </div>
    </button>
  );
};

export default MpaisaButton;
