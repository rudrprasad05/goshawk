"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartContext } from "@/context/CartContext";
import { OrderListType, ProductType } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

interface props {
  order: OrderListType;
}

export const OrderFeedCard: React.FC<props> = ({ order }) => {
  const router = useRouter();
  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <div className="flex flex-col gap-5 pt-5">
          <CardTitle className="grow p-0">
            Customer: {order.order.customer.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardDescription className="">
        <CardContent className="flex flex-col justify-between">
          <div className="text-sm text-muted-foreground">
            Order Id: {order.id}
          </div>
          <div className="flex items-center py-2">
            <CardTitle className="grow">Total: ${order.order.total}</CardTitle>
            <Link
              href={`/seller/orders/details/${order.id}`}
              className={`text-primary underline-offset-4 hover:underline px-0`}
            >
              Details
            </Link>
          </div>
        </CardContent>
      </CardDescription>
    </Card>
  );
};
