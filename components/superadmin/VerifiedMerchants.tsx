import { SellerType } from "@/types";
import { ShieldX, ShieldCheck } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardTitle, CardFooter } from "../ui/card";
import Header from "../Admin/Header";
import Link from "next/link";

const VerifiedMerchants = ({ merchant }: { merchant: SellerType[] }) => {
  if (merchant.length == 0)
    return (
      <div>
        <Header name="Verified" showProfile={false}>
          <ShieldCheck />
        </Header>
        <div className="p-6">No Verified Sellers</div>
      </div>
    );
  return (
    <div className="py-6">
      <Header name="Verified" showProfile={false}>
        <ShieldCheck />
      </Header>
      <div className="grid gap-6 py-6 grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {merchant.map((i) => (
          <Card key={i.id}>
            <CardHeader>
              <CardTitle>{i.companyName}</CardTitle>
            </CardHeader>
            <CardFooter>
              <Link
                className={"text-primary underline-offset-4 hover:underline"}
                href={`/shop/${i.companyName}`}
              >
                Details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VerifiedMerchants;
