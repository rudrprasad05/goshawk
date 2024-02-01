import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { GetOnlyCurrentUser } from "@/actions/user";
// import { pusherClient, pusherServer } from "@/app/libs/pusher";

interface props {
  conversationId?: string;
}

export async function DELETE(request: Request, { params }: { params: props }) {
  try {
    const { conversationId } = params;
    const currentUser = await GetOnlyCurrentUser();

    if (!currentUser) {
      return new NextResponse("unauth", { status: 401 });
    }

    const existingConversation = await prisma.conversation.findUnique({
      where: {
        id: conversationId,
      },
      include: {
        users: true,
      },
    });

    if (!existingConversation) {
      return new NextResponse("invalid id", { status: 400 });
    }

    const deletedConversation = await prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userIds: {
          hasSome: [currentUser.id],
        },
      },
    });

    // existingConversation.users.forEach((user) => {
    //     if(user.email){
    //         pusherServer.trigger(user.email, "conversation:remove", existingConversation)
    //     }
    // })

    return NextResponse.json(deletedConversation);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("internal error", { status: 500 });
  }
}
