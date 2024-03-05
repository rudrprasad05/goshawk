import AvatarComponent from "@/components/nav/AvatarComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types";
import { format } from "date-fns";
import { Check, ShoppingBasket, X } from "lucide-react";
import React from "react";

export default function ShopForm({ user }: { user: UserType }) {
  const shop = user.seller;

  return (
    <Card className="my-6">
      <CardHeader className="flex flex-row gap-3 items-center">
        <AvatarComponent fallback="US" src={shop.image} />
        <CardTitle>Shop details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-y-2">
        <div className="text-sm">
          <Label className="text-muted-foreground">Shop Name</Label>
          <h2>{shop.companyName}</h2>
        </div>

        <div className="text-sm">
          <Label className="text-muted-foreground">Plan</Label>
          <h2>{shop.plan}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Paid</Label>
          <h2>{shop.isPaid ? <Check /> : <X />}</h2>
        </div>

        <div className="text-sm">
          <Label className="text-muted-foreground">Email Verified</Label>
          <h2>{shop.isVerified ? <Check /> : <X />}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Date joined</Label>
          <h2>{format(shop.createdAt, "dd MMM yyyy")}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
