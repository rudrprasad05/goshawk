import { GetSelectedConvo } from "@/actions/chat";
import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import { GetOnlyCurrentUser, getCurrentUser } from "@/actions/user";
import AvatarComponent from "../nav/AvatarComponent";
import { ConversationType } from "@/types";
import Messages from "./Messages";
import MessageInputContainer from "./Form";

const ChatSection = async ({ id }: { id: string }) => {
  const convo = await GetSelectedConvo(id);

  return (
    <Card className="w-full h-full flex flex-col overflow-auto">
      <Header convo={convo} />
      <Messages initialMessages={convo} />
      <MessageInputContainer id={id} />
    </Card>
  );
};

const Header = async ({ convo }: { convo: ConversationType }) => {
  const currentUser = await GetOnlyCurrentUser();
  const otherUser = convo?.users.filter((i) => i.id != currentUser?.id)[0];
  return (
    <CardHeader className="border-b">
      <CardTitle className="flex gap-3 items-center">
        <AvatarComponent
          src={otherUser?.image || ""}
          fallback={otherUser?.name.slice(0, 2) || "AD"}
        />
        <h1>{otherUser?.name}</h1>
      </CardTitle>
    </CardHeader>
  );
};

export default ChatSection;
