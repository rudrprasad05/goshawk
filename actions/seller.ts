"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

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
        products: {
          where: {
            isVisible: true,
          },
        },
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

export const GetMerchantForFeed = async ({
  take,
  skip,
  search,
}: {
  take: any;
  skip: any;
  search?: string;
}) => {
  "use server";

  const results = await prisma.seller.findMany({
    take,
    skip,
    where: {
      companyName: {
        contains: search,
        mode: "insensitive",
      },
      // name: { contains: search, mode: "insensitive" },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.products.count();

  revalidatePath("/");

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};
