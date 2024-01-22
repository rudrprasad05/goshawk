import { SellerType } from "@/types";
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import Link from "next/link";
import Header from "../Admin/Header";
import { ShieldX } from "lucide-react";
import VerifySellerButton from "./VerifySellerButton";

const UnverifiedMerchant = ({ merchant }: { merchant: SellerType[] }) => {
  if (merchant.length == 0)
    return (
      <div>
        <Header name="Unverified" showProfile={false}>
          <ShieldX />
        </Header>
        <div className="p-6">No Unverified Sellers</div>
      </div>
    );
  return (
    <div>
      <Header name="Unverified" showProfile={false}>
        <ShieldX />
      </Header>
      <div className="grid gap-6 py-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {merchant.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle>{i.companyName}</CardTitle>
            </CardHeader>
            <CardFooter>
              <VerifySellerButton user={i} />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UnverifiedMerchant;
