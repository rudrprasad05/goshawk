"use client";

import { ChangeDeliveryStatusApi } from "@/actions/orders";
import { cn, formatPrice } from "@/lib/utils";
import { MerchantOrderType, OrderListType } from "@/types";
import { BadgeDollarSign, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../Admin/Header";
import { Card, CardContent, CardHeader } from "../ui/card";

const OrderDetailsPage = ({ order }: { order: MerchantOrderType }) => {
  return (
    <div className="">
      <Header name="Order Details">
        <BadgeDollarSign />
      </Header>
      <div className="mx-auto px-6 pb-24 lg:px-6">
        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className={cn("lg:col-span-7")}>
            <ul className={"divide-y border-b border-t"}>
              <OrderCard order={order} />
            </ul>
          </div>
          <SummaryCard order={order} />
        </div>
      </div>
    </div>
  );
};

const OrderCard = ({ order }: { order: any }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted)
    return (
      <>
        {order.orderLists.map((i: OrderListType, index: number) => (
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
            </div>
          </li>
        ))}
      </>
    );
  else
    return (
      <div className="h-full w-full">
        <div className="w-min mx-auto">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </div>
    );
};

const SummaryCard = ({ order }: { order: MerchantOrderType }) => {
  let total = 0;
  const res = order.orderLists.map((i) => (total += i.price * i.quanity));

  return (
    <Card className="mt-16 rounded-lg sticky top-24 lg:col-span-5 lg:mt-0">
      <CardHeader>
        <h2 className="text-lg font-medium">Order summary</h2>
      </CardHeader>

      <CardContent className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-base font-medium">Order Total</div>
          <div className="text-base font-medium">{formatPrice(total)}</div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-base font-medium">Delivery</div>
          <div
            className={cn(
              "text-base font-medium flex gap-3",
              order.isDelivered ? "text-green-500" : "text-rose-500"
            )}
          >
            <div>{order.isDelivered ? "Delivered" : "Pending"}</div>
            <ChangeDeliveryStatus order={order} />
          </div>
        </div>
        <div className="flex items-center justify-between border-t pt-4">
          <div className="text-base font-medium">Address</div>
          <div className="text-base font-medium">
            {order.order.address}, {order.order.city}, {order.order.country}
            <Link
              className="ml-3 text-primary underline-offset-4 hover:underline"
              // href={`/shop/products/${order.product.id}`}
              href={`https://www.google.com/maps/place/${order.order.address}+${order.order.city}+${order.order.country}`}
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

      {/* <CardFooter className="mt-6"></CardFooter> */}
    </Card>
  );
};

const ChangeDeliveryStatus = ({ order }: { order: MerchantOrderType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await ChangeDeliveryStatusApi(!order.isDelivered, order.id).then(() => {
      toast.success("Status changed successfully");
      router.refresh();
    });
  };
  return (
    <button
      className="text-primary underline-offset-4 hover:underline"
      onClick={() => handleClick()}
    >
      Change
    </button>
  );
};

export default OrderDetailsPage;
