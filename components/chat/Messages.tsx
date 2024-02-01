import { ConversationType } from "@/types";
import React from "react";
import { CardContent, CardDescription } from "../ui/card";
import MessageBox from "./MessageBox";

const Messages = ({
  initialMessages,
}: {
  initialMessages: ConversationType;
}) => {
  if (initialMessages.messages.length == 0)
    return (
      <CardContent className="pt-6 h-full overflow-auto">
        <CardDescription>No messages so far</CardDescription>
      </CardContent>
    );
  return (
    <CardContent>
      {initialMessages.messages.map((i) => (
        <MessageBox key={i.id} data={i} isLast={false} />
      ))}
    </CardContent>
  );
};

export default Messages;
