"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";

export const GetSellerByName = async (companyName: string) => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const seller = await prisma.seller.findUnique({
      where: {
        companyName,
      },
      include: {
        products: true,
      },
    });

    if (!seller) {
      return null;
    }

    return seller;
  } catch (error) {
    return null;
  }
};
