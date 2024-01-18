"use client";
import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { BarChart4 } from "lucide-react";
import { UserType } from "@/types";

const ProductCount = ({ user }: { user: UserType }) => {
  const [count, setCount] = useState(() => {
    return user.seller.products.length;
  });

  return (
    <Card className="flex bg-border border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
      <div>
        <h1 className="font-light text-2xl text-primary">Products</h1>
        <h2 className=" text-muted-foreground">{count}</h2>
      </div>
      <div className="absolute bottom-5 right-5">
        <BarChart4 className="w-16 h-16 stroke stroke-muted-foreground" />
        {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
      </div>
    </Card>
  );
};

export default ProductCount;
