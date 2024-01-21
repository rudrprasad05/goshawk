"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

export const GetAdBasedOnLocation = async (location: string) => {
  const ad = await prisma.ad.findUnique({
    where: {
      location: location,
    },
    include: {
      seller: true,
    },
  });

  return ad;
};
