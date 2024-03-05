import AvatarComponent from "@/components/nav/AvatarComponent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import React from "react";

export default function UserForm({ user }: { user: UserType }) {
  return (
    <Card className="my-6">
      <CardHeader className="flex flex-row gap-3 items-center">
        <AvatarComponent fallback="US" src={user.image} />
        <CardTitle>User details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-y-2">
        <div className="text-sm">
          <Label className="text-muted-foreground">Email</Label>
          <h2>{user.email}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Password</Label>
          <h2>{[0, 1, 2, 3, 4, 5, 5, 6].map(() => "* ")}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Name</Label>
          <h2>{user.name}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Address</Label>
          <h2>{user.address}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">City / Town</Label>
          <h2>{user.town}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Country</Label>
          <h2>{user.country}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Email Verified</Label>
          <h2>{user.emailVerified ? <Check /> : <X />}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Date joined</Label>
          <h2>{format(user.createdAt, "dd MMM yyyy")}</h2>
        </div>
        <div className="text-sm">
          <Label className="text-muted-foreground">Phone</Label>
          <h2>{user.phone}</h2>
        </div>
      </CardContent>
    </Card>
  );
}
