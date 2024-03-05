"use client";
import { SellerType } from "@/types";
import React from "react";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import AvatarComponent from "../nav/AvatarComponent";

const ShopSellerFeedCard = ({ seller }: { seller: SellerType }) => {
  console.log(seller);
  return (
    <Card className="flex flex-row justify-between items-center">
      <div>
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
      </div>
      <div className="pr-6">
        <AvatarComponent
          fallback={seller.companyName.slice(0, 2)}
          src={seller.image}
        />
      </div>
    </Card>
  );
};

export default ShopSellerFeedCard;
