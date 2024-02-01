"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const GetSelectedConvo = async (id: string) => {
  return await prisma.conversation.findUnique({
    where: { id: id },
    include: {
      users: true,
      messages: {
        include: {
          sender: true,
        },
      },
    },
  });
};
