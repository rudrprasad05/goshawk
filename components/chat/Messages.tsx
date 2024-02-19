"use client";

import { ConversationType } from "@/types";
import React, { useEffect, useRef, useState } from "react";
import { CardContent, CardDescription } from "../ui/card";
import MessageBox from "./MessageBox";
import { pusherClient } from "@/lib/pusher";
import axios from "axios";
import { Conversation, Message, User } from "@prisma/client";
import { find } from "lodash";

export type FullMessageType = Message & {
  sender: User;
};

const Messages = ({
  initialMessages,
}: {
  initialMessages: ConversationType;
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages || []);

  // useEffect(() => {
  //   pusherClient.subscribe(initialMessages.id);
  //   bottomRef?.current?.scrollIntoView();

  //   const messageHandler = (message: FullMessageType) => {
  //     axios.post(`/api/conversations/${initialMessages.id}/seen`);

  //     setMessages((current: any) => {
  //       if (find(current, { id: message.id })) {
  //         return current;
  //       }

  //       return [...current, message];
  //     });

  //     bottomRef?.current?.scrollIntoView();
  //   };

  // const updateMessageHandler = (newMessage: FullMessageType) => {
  //   setMessages((current) =>
  //     current.map((currentMessage) => {
  //       if (currentMessage.id === newMessage.id) {
  //         return newMessage;
  //       }

  //       return currentMessage;
  //     })
  //   );
  // };

  // pusherClient.bind("messages:new", messageHandler);
  // pusherClient.bind("message:update", updateMessageHandler);
  // pusherClient.bind('message:update', updateMessageHandler);

  // return () => {
  //   pusherClient.unsubscribe(initialMessages.id);
  // pusherClient.unbind("messages:new", messageHandler);
  // pusherClient.unbind("message:update", updateMessageHandler);

  // pusherClient.unbind('message:update', updateMessageHandler)
  //   };
  // }, [initialMessages.id]);

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
      <div ref={bottomRef} className={"pt-12"} />
    </CardContent>
  );
};

export default Messages;
