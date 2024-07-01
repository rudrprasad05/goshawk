"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const OrderCountApi = async () => {
  const user = await getCurrentUser();
  return await prisma.merchantOrder.count({
    where: { seller: { userId: user?.id } },
  });
};

export const GetOrderWithProductsForOneCustomer = async (cusId: string) => {
  const res = await prisma.order.findMany({
    where: {
      customerId: cusId,
    },
    include: {
      merchantOrders: {
        include: {
          orderLists: {
            include: {
              product: true,
            },
          },
          seller: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return res;
};

export const ChangeDeliveryStatusApi = async (val: boolean, id: string) => {
  return await prisma.merchantOrder.update({
    where: {
      id,
    },
    data: {
      isDelivered: val,
    },
  });
};

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
      order: {
        include: {
          customer: true,
        },
      },
    },

    orderBy: {
      orderId: "desc",
    },
  });

  const total = await prisma.products.count();

  //

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};

export const GetOneOrderDetails = async (id: string) => {
  const orderRes = await prisma.order.findUnique({
    where: {
      id,
    },
  });
  return orderRes;
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

export const GetOrdersForSingleProduct = async (id: string) => {
  const orderRes = await prisma.orderList.findMany({
    where: {
      productId: id,
    },
    include: {
      merchantOrders: true,
    },
  });
  return orderRes;
};

export const ChangeMpaisaId = async (id: string, sha256: string) => {
  const orderRes = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      sha256: sha256,
    },
  });
  return orderRes;
};

export const GetOrderById = async (id: string) => {
  const orderRes = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      isPaid: true,
    },
  });
  return orderRes;
};

export const FindOrderBySha256AndUpdateOrderStatus = async (sha256: string) => {
  const res = await prisma.order.update({
    where: { sha256 },
    data: { isPaid: true },
  });
  return res;
};
