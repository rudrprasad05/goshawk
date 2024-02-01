import { ConversationType } from "@/types";
import React from "react";
import { CardContent, CardDescription } from "../ui/card";

const Messages = ({
  initialMessages,
}: {
  initialMessages: ConversationType;
}) => {
  if (initialMessages.messages.length == 0)
    return (
      <CardContent className="pt-6">
        <CardDescription>No messages so far</CardDescription>
      </CardContent>
    );
  return <CardContent>Messages</CardContent>;
};

export default Messages;
