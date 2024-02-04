import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DollarSign, Pencil } from "lucide-react";
import React from "react";
import { DialogHeader } from "../ui/dialog";
import { MerchantOrderType, OrderListType } from "@/types";
import Link from "next/link";

type OrderLocal = OrderListType[] & { merchantOrders: MerchantOrderType };

const SalesAmountDisplay = ({ orders }: { orders: OrderLocal }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Orders</div>
          <div className="font-light text-lg text-muted-foreground">
            {orders.length}
          </div>
          <div className="absolute bottom-5 right-5">
            <Pencil className="group-hover:h-28 group-hover:w-28 group-hover:stroke-muted-foreground/20 duration-200  w-16 h-16 stroke stroke-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sales</DialogTitle>
          <DialogDescription>View the sales of your products</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col">
          {orders.map((order) => (
            <div key={order.id} className="flex justify-between">
              <p>{order.merchantOrders.id}</p>
              <Link
                className="text-primary underline-offset-4 hover:underline"
                href={`/seller/orders/details/${order.merchantOrders.id}`}
              >
                View
              </Link>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalesAmountDisplay;
