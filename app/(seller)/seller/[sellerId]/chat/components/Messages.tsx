"use client";
import MessageBox from "@/components/chat/MessageBox";
import { pusherClient } from "@/lib/pusher";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";

const Messages: FC<any> = ({ initialMessages, conversationId, convo }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    pusherClient.subscribe(conversationId);

    pusherClient.bind("incoming-message", (text: any) => {
      setIncomingMessages((prev) => [...prev, text]);
      bottomRef?.current?.scrollIntoView();
    });

    bottomRef?.current?.scrollIntoView();

    return () => {
      pusherClient.unsubscribe(conversationId);
    };
  }, []);

  useEffect(() => {
    bottomRef?.current?.scrollIntoView();
    router.refresh();
  }, []);

  return (
    <div className="px-8 py-6">
      {convo.messages.map((i) => {
        return <MessageBox key={i.id} data={i} isLast={false} />;
      })}
      {incomingMessages.map((text, i) => {
        return <MessageBox key={text.id} data={text} isLast={false} />;
      })}
      <div ref={bottomRef} className={"pt-12"} />
    </div>
  );
};

export default Messages;
