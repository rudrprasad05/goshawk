import { User, Seller } from "@prisma/client";
import React from "react";
import UserBox from "./UserBox";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface UserListProps {
  items: Seller[] & {
    user: User;
  };
}

const UserList: React.FC<UserListProps> = ({ items }) => {
  return (
    <Card className="w-[250px] overflow-auto">
      <CardHeader>
        <CardTitle>
          <div className="text-xl">Users</div>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {items && items?.map((item) => <UserBox key={item.id} data={item} />)}
        {items && items?.map((item) => <UserBox key={item.id} data={item} />)}
      </CardContent>
    </Card>
  );
};

export default UserList;
