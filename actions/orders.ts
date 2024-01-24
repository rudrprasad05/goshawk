"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

export const GetSingleMerchantOrders = async ({
  id,
  take,
  skip,
  search,
}: {
  id: string;
  take: any;
  skip: any;
  search?: string;
}) => {
  "use server";

  const results = await prisma.orderList.findMany({
    take,
    skip,
    where: {
      AND: [
        {
          sellerId: id,
          order: {
            customer: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        },
      ],
    },
    include: {
      product: true,
    },

    // orderBy: {
    //   createdAt: "desc",
    // },
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
