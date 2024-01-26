import React from "react";
import { Card } from "../ui/card";
import { BarChart4 } from "lucide-react";
import { UserType } from "@/types";
import { OrderCountApi } from "@/actions/orders";

const OrderCount = async () => {
  const count = await OrderCountApi();
  return (
    <Card className="flex bg-border border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
      <div>
        <h1 className="font-light text-2xl text-primary">Orders</h1>
        <h2 className=" text-muted-foreground">{count}</h2>
      </div>
      <div className="absolute bottom-5 right-5">
        <BarChart4 className="w-16 h-16 stroke stroke-muted-foreground" />
      </div>
    </Card>
  );
};

export default OrderCount;
