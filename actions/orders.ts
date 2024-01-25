"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

export const GetMerchantOrderForFeed = async ({
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

  const results = await prisma.merchantOrder.findMany({
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
      order: true,
    },

    orderBy: {
      orderId: "desc",
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

export const GetOneMerchantList = async (id: string) => {
  const orderRes = await prisma.merchantOrder.findUnique({
    where: {
      id,
    },
    include: {
      seller: true,
      order: {
        include: {
          customer: true,
        },
      },
      orderLists: {
        include: {
          product: true,
        },
      },
    },
  });
  return orderRes;
};
