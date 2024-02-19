import UserList from "@/components/chat/UserList";
import MessageField from "./components/MessageField";
import Messages from "./components/Messages";
import prisma from "@/lib/prismadb";
import { ChatApi } from "@/actions/seller";
import { GetSelectedConvo } from "@/actions/chat";
import { notFound } from "next/navigation";
import { Card, CardDescription } from "@/components/ui/card";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const id = props.searchParams?.c;
  const seller = await ChatApi();

  if (!id)
    return (
      <div className="flex gap-6 grow h-screen p-6">
        <div className="w-[320px]">
          <UserList items={seller} />
        </div>

        {/* <HandleChatSection id={convoId} /> */}
        <Card className="relative grow h-full overflow-scroll grid place-items-center">
          <CardDescription>Select a conversation</CardDescription>
        </Card>
      </div>
    );

  const convo = await GetSelectedConvo(id);

  const existingMessages = await prisma.message.findMany({
    where: {
      conversationId: id as string,
    },
  });

  const serializedMessages = existingMessages.map((message) => ({
    text: message.body,
    id: message.id,
  }));

  const convoId = props.searchParams?.c;
  return (
    <div className="flex gap-6 grow h-screen p-6">
      <div className="w-[320px]">
        <UserList items={seller} />
      </div>

      {/* <HandleChatSection id={convoId} /> */}
      <Card className="relative grow h-full overflow-scroll">
        <Messages
          convo={convo}
          conversationId={id}
          initialMessages={existingMessages}
        />
        <MessageField conversationId={id} />
      </Card>
    </div>
  );
};

export default page;
