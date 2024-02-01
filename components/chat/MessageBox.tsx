"use client";

import { clsx } from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { MessageType, UserType } from "@/types";
import AvatarComponent from "../nav/AvatarComponent";
import { Card } from "../ui/card";

interface props {
  data: MessageType & {
    sender: UserType;
  };
  isLast: boolean;
}
const MessageBox: React.FC<props> = ({ data, isLast }) => {
  const session = useSession();
  console.log(data);
  const [imageModelOpen, setImageModelOpen] = useState(false);
  const isOwn = session?.data?.user?.id === data?.senderId;
  //   const seenList = (data.seen || [])
  //     .filter((user) => user.email != data?.sender?.email)
  //     .map((user) => user.name)
  //     .join(", ");

  const container = clsx("flex gap-3 p-4 ", isOwn && "justify-end");
  const avatar = clsx(isOwn && "order-2");
  const body = clsx("flex flex-col gap-2", isOwn && "items-end");
  const message = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={clsx("flex gap-3 p-4 ", isOwn && "justify-end")}>
      <div className={clsx(isOwn && "order-2")}>
        <AvatarComponent src={"data"} fallback="dd" />
      </div>
      <div className={clsx("flex flex-col gap-2", isOwn && "items-end")}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-600">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <Card
          className={clsx(
            "text-sm w-fit overflow-hidden",
            isOwn ? "bg-card " : "bg-secondary-foreground text-secondary",
            data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
          )}
        >
          <div>{data.body}</div>
        </Card>
        {/* {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs text-gray-500">{`Seen by ${seenList}`}</div>
        )} */}
      </div>
    </div>
  );
  return <></>;
};

export default MessageBox;
