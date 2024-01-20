"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";

export const GetAllProductsPagination = async ({
  take,
  skip,
  search,
}: {
  take: any;
  skip: any;
  search?: string;
}) => {
  "use server";

  const results = await prisma.products.findMany({
    take,
    skip,
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
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

export const GetSingleMerchantProducts = async ({
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

  const results = await prisma.products.findMany({
    take,
    skip,
    where: {
      AND: [
        {
          sellerId: id,
          // name: { contains: search, mode: "insensitive" },
        },
      ],
    },

    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(id);

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

export const GetProductDetails = async (id: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      seller: true,
    },
  });
  return product;
};

export const GetSuperAdminProducts = async () => {
  const results = await prisma.products.findMany({
    where: {
      seller: {
        companyName: { contains: "Goshawk", mode: "insensitive" },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
};
