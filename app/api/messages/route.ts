import { GetOnlyCurrentUser } from "@/actions/user";
import { NextResponse } from "next/server";
// import { pusherServer } from "@/app/libs/pusher"
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  try {
    const currentUser = await GetOnlyCurrentUser();
    const body = await request.json();

    const { message, image, conversationId } = body;

    if (!currentUser?.id || !currentUser.email) {
      return new NextResponse("Unauthoruzed", { status: 401 });
    }

    const newMessage = await prisma.message.create({
      data: {
        body: message,
        image: image,
        conversation: {
          connect: {
            id: conversationId,
          },
        },
        sender: {
          connect: {
            id: currentUser.id,
          },
        },
      },
      include: {
        sender: true,
      },
    });

    const updatedConversation = await prisma.conversation.update({
      where: {
        id: conversationId,
      },
      data: {
        messages: {
          connect: {
            id: newMessage.id,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      },
    });

    // await pusherServer.trigger(conversationId, "messages:new", newMessage);

    // const lastMessage =
    //   updatedConversation.messages[updatedConversation.messages.length - 1];

    // updatedConversation.users.map((user) => {
    //   pusherServer.trigger(user.email!, "conversation:update", {
    //     id: conversationId,
    //     messages: [lastMessage],
    //   });
    // });

    return NextResponse.json(newMessage);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Internal Server", { status: 500 });
  }
}
