"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

export const GetAdBasedOnLocation = async (location: string) => {
  const ad = await prisma.billboard.findUnique({
    where: {
      location: location,
    },
    include: {
      ad: true,
    },
  });

  return ad;
};

export const GetAllBillboardsAdmin = async () => {
  const ad = await prisma.billboard.findMany({
    include: {
      ad: {
        include: {
          seller: true,
        },
      },
    },
  });

  return ad;
};

export const GetAllBillboardsNewAd = async () => {
  const ad = await prisma.billboard.findMany({
    include: {
      ad: true,
    },
  });

  return ad;
};

export const GetAdForEachMerchant = async () => {
  const session = await getSession();

  if (!session?.user?.email) {
    return null;
  }

  const currentUser = await prisma.seller.findUnique({
    where: {
      userId: session?.user?.id as string,
    },
    include: {
      ads: true,
    },
  });

  return currentUser;
};
