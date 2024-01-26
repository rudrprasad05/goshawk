"use client";

import { cn, formatPrice } from "@/lib/utils";
import { MerchantOrderType, OrderListType } from "@/types";
import { X, Check, Loader2, BadgeDollarSign } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import Link from "next/link";
import Header from "../Admin/Header";

const OrderDetailsPage = ({ order }: { order: MerchantOrderType }) => {
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  console.log(order);

  let total = 0;
  const res = order.orderLists.map((i) => (total += i.price * i.quanity));

  return (
    <div className="">
      <Header name="Order Details">
        <BadgeDollarSign />
      </Header>
      <div className="mx-auto px-6 pb-24 lg:px-6">
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className={cn("lg:col-span-7")}>
            <ul className={"divide-y border-b border-t"}>
              {isMounted &&
                order.orderLists.map((i, index) => (
                  <li key={order.id + index} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <div className="relative h-24 w-24">
                        <Image
                          fill
                          src={i.product.imageUrl}
                          alt="product image"
                          className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                        />
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <Link
                                href={`/product/${i.product.id}`}
                                className="font-medium text-secondary-foreground"
                              >
                                {i.product.name}
                              </Link>
                            </h3>
                          </div>

                          <div className="mt-1 flex text-sm">
                            <p className="text-muted-foreground">
                              {i.product.sellerId}
                            </p>
                          </div>

                          <p className="mt-1 text-sm font-medium text-muted-foreground">
                            {formatPrice(i.product.price)}
                          </p>
                        </div>
                      </div>

                      <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                        <span>Eligible for instant delivery</span>
                      </p>
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <Card className="mt-16 rounded-lg sticky top-24 lg:col-span-5 lg:mt-0">
            <CardHeader>
              <h2 className="text-lg font-medium">Order summary</h2>
            </CardHeader>

            <CardContent className="mt-6 space-y-4">
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-base font-medium">Order Total</div>
                <div className="text-base font-medium">
                  {formatPrice(total)}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-base font-medium">Delivery</div>
                <div className="text-base font-medium">
                  {order.isDelivered ? "Delivered" : "Pending"}
                  <Link
                    className="ml-3 text-primary underline-offset-4 hover:underline"
                    // href={`/shop/products/${order.product.id}`}
                    href={`seller/user/${order.order.customerId}`}
                  >
                    Change
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-base font-medium">Address</div>
                <div className="text-base font-medium">
                  {order.order.address}, {order.order.city},{" "}
                  {order.order.country}
                  <Link
                    className="ml-3 text-primary underline-offset-4 hover:underline"
                    // href={`/shop/products/${order.product.id}`}
                    href={`seller/user/${order.order.customerId}`}
                  >
                    View
                  </Link>
                </div>
              </div>
              <div className="flex items-start justify-between border-t pt-4">
                <div className="text-base font-medium">Contact</div>
                <div className="text-base font-medium flex flex-col gap-2 items-end">
                  <div>{order.order.customer.phone}</div>
                  <div>{order.order.customer.email}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-base font-medium">Customer</div>
                <div className="text-base font-medium">
                  {order.order.customer.name}
                  <Link
                    className="ml-3 text-primary underline-offset-4 hover:underline"
                    // href={`/shop/products/${order.product.id}`}
                    href={`seller/user/${order.order.customerId}`}
                  >
                    View
                  </Link>
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-6">
              <Button
                // disabled={cartProducts.length === 0 || loading}
                className="w-full"
                size="lg"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
