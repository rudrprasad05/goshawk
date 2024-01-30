"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const ProductsCountApi = async () => {
  const user = await getCurrentUser();
  return await prisma.products.count({
    where: { seller: { userId: user?.id } },
  });
};

export const GetLandingCaroProducts = async () => {
  "use server";

  const results = await prisma.products.findMany({
    take: 20,
    where: {
      NOT: [
        {
          seller: {
            companyName: {
              contains: "Goshawk",
              mode: "insensitive",
            },
          },
        },
      ],
    },

    include: {
      seller: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
};

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
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          category: {
            name: {
              contains: search,
              mode: "insensitive",
            },
          },
        },
        {
          category: {
            parentCategory: {
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
      seller: true,
    },

    // orderBy: {
    //   createdAt: "desc",
    // }
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
          name: { contains: search, mode: "insensitive" },
        },
      ],
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

export const GetRelatedProducts = async (id: string) => {
  const product = await prisma.products.findMany({
    take: 8,
    where: {
      NOT: [
        {
          id: id,
        },
      ],
    },
    include: {
      seller: true,
    },
  });
  return product;
};

export const GetProductDetails = async (id: string) => {
  const product = await prisma.products.findUnique({
    where: {
      id,
    },
    include: {
      seller: true,
      category: {
        include: {
          parentCategory: true,
        },
      },
    },
  });
  return product;
};

export const GetSuperAdminProducts = async () => {
  const results = await prisma.products.findMany({
    take: 4,
    where: {
      seller: {
        companyName: { contains: "Goshawk", mode: "insensitive" },
      },
    },

    include: {
      seller: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
};
