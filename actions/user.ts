"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";

export const getCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        seller: {
          include: {
            products: true,
          },
        },
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export const GetUseDataOnly = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        seller: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};
