"use client";

import { User, Seller } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useSession } from "next-auth/react";
import { SellerType } from "@/types";

type UserListProps = Seller & {
  user: User;
};

const UserList = ({ items }: { items: UserListProps[] }) => {
  return <HandleAdmin items={items} />;
};

const HandleAdmin = ({ items }: { items: UserListProps[] }) => {
  const session = useSession();
  const isAdmin = session.data?.user.role?.toLowerCase() == "admin";
  const admin: UserListProps = items.filter(
    (i) => (i?.user?.role as string).toLowerCase() == "admin"
  )[0];
  if (isAdmin)
    return (
      <div className="flex flex-col gap-4">
        {items && items?.map((item) => <UserBox key={item.id} data={item} />)}
      </div>
    );
  return (
    <>
      <UserBox key={admin.id} data={admin} />
    </>
  );
};

export default UserList;
