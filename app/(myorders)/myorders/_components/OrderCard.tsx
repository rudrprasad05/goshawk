"use client";

import Pageloader from "@/components/global/Pageloader";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { OrderWithMerchantOrderListAndProductsType } from "@/types";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";
import clsx from "clsx";
import { ChevronDownIcon, DollarSign, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface props {
  order: OrderWithMerchantOrderListAndProductsType;
}
// TODO make order page
const OrderCard: React.FC<props> = (props: props) => {
  const orders = props.order;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Pageloader />;
  }

  return (
    <Accordion type="multiple" className="w-full">
      {orders.map((order) => (
        <AccordionItem key={order.id} value={order.id} className="my-4">
          <AccordionTrigger className="AccordionTrigger w-full">
            <Card className="w-full flex items-center">
              <CardHeader>
                <CardTitle className="text-left text-lg flex gap-4 items-center">
                  Order ID:
                  <CardDescription className="text-sm">
                    {order.id}
                  </CardDescription>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 pr-8 items-center flex gap-2">
                <Tooltip>
                  <TooltipTrigger>
                    <DollarSign
                      className={clsx(
                        `${order.isPaid ? "text-green-400" : "text-rose-500"}`
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {order.isPaid ? "Paid" : "Not Paid"}
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger>
                    <Truck
                      className={clsx(
                        `${
                          order.isDelivered ? "text-green-400" : "text-rose-500"
                        }`
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {order.isDelivered ? "Delivered" : "Not Delivered"}
                  </TooltipContent>
                </Tooltip>
              </CardContent>
              <CardFooter className="p-0 pr-8 items-center flex ml-auto gap-4">
                <CardTitle className="text-left text-lg flex gap-4 items-center">
                  Total:
                  <CardDescription className="text-sm">
                    {order.total} FJD
                  </CardDescription>
                </CardTitle>
                <CardTitle className="text-left text-lg flex gap-4 items-center">
                  Date:
                  <CardDescription className="text-sm">
                    {order.createdAt.toUTCString()}
                  </CardDescription>
                </CardTitle>
                <ChevronDownIcon className="AccordionChevron" aria-hidden />
              </CardFooter>
            </Card>
          </AccordionTrigger>
          <AccordionContent>
            {order.merchantOrders.map((mo) =>
              mo.orderLists.map((ol) => (
                <Card key={ol.id} className="flex w-[90%] ml-auto my-2">
                  <CardHeader className="flex flex-row gap-4">
                    <Image
                      src={ol.product.imageUrl[0]}
                      alt={ol.product.name}
                      width={50}
                      height={50}
                    />
                    <CardTitle className="text-left text-lg flex gap-4 items-center">
                      {ol.product.name}
                    </CardTitle>
                  </CardHeader>
                  <CardFooter className="p-0 pr-8 items-center flex ml-auto gap-4">
                    <CardTitle className="text-left text-lg flex gap-4 items-center">
                      Price:
                      <CardDescription className="text-sm">
                        {ol.product.price} FJD
                      </CardDescription>
                    </CardTitle>
                    <Link
                      className={
                        "text-primary text-sm underline-offset-4 hover:underline"
                      }
                      href={`/shop/${mo.seller.companyName}`}
                    >
                      View Seller
                    </Link>
                    <Link
                      className={
                        "text-primary text-sm underline-offset-4 hover:underline"
                      }
                      href={`/shop/products/details/${ol.productId}`}
                    >
                      View Product
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const RemoveDups = (mo: any) => {};

export default OrderCard;
