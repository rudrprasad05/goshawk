"use client";
import { SellerType } from "@/types";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { buttonVariants } from "../ui/button";

const ShopSellerFeedCard = ({ seller }: { seller: SellerType }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{seller.companyName}</CardTitle>
      </CardHeader>
      <CardFooter>
        <Link
          className={"text-primary underline-offset-4 hover:underline"}
          href={`/shop/${seller.companyName}`}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ShopSellerFeedCard;
