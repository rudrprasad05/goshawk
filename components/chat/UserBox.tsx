"use client";

import { Seller, User } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import AvatarComponent from "../nav/AvatarComponent";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";

type UserListProps = Seller & {
  user: User;
};

const UserBox = ({ data }: { data: UserListProps }) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);

  const handleClick = useCallback(() => {
    setloading(true);

    axios
      .post("/api/conversations", {
        userId: data.user.id,
      })

      .then((data) => {
        router.push(`?c=${data.data.id}`);
        console.log("fired success");
      })

      .finally(() => {
        setloading(false);
        console.log("fired success");
      })
      .catch((e) => {
        console.log(e, "erro");
      });
  }, [data, router]);
  return (
    <>
      <Card
        onClick={handleClick}
        className={cn(
          "h-min text-sm hover:bg-border py-2 px-3 flex items-center gap-3 rounded-md "
        )}
      >
        <div className="rounded-full">
          <AvatarComponent fallback="AD" src={data.user.image} />
        </div>
        <div>{data?.user.name}</div>
      </Card>
    </>
  );
};

export default UserBox;
