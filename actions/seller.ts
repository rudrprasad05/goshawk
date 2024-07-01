"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { SellerRegisterType } from "@/schemas/auth";
import { Plan } from "@prisma/client";
import { getCurrentUser } from "./user";
import crypto from "crypto";

export const GetSellerByName = async (companyName: string) => {
  try {
    const seller = await prisma.seller.findUnique({
      where: {
        companyName,
      },
      include: {
        products: {
          where: {
            isVisible: true,
          },
          include: {
            seller: true,
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

  return {
    data: results,
    metadata: {
      hasNextPage: skip + take < total,
      totalPages: Math.ceil(total / take),
    },
  };
};

export const GetAllMerchants = async () => {
  "use server";

  const results = await prisma.seller.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const total = await prisma.products.count();

  return results;
};

export const ChatApi = async () => {
  const results = await prisma.seller.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return results;
};

export const CreateSellerAccount = async (data: SellerRegisterType) => {
  const { companyName, userId, address, city, country, phone, plan, image } =
    data;

  const findSellerName = await prisma.seller.findFirst({
    where: {
      companyName: companyName,
    },
  });

  if (findSellerName) throw new Error("Shop Name is already in use");

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      address,
      town: city,
      country,
      phone,
      image,
    },
  });

  const seller = await prisma.seller.create({
    data: {
      companyName: companyName as string,
      userId: userId as string,
      isPaid: false,
      isVerified: true,
      image,
      plan: plan,
    },
  });

  let date = new Date();
  let mId = date.getTime();
  let sha256 = crypto.randomBytes(32).toString("base64url");

  const sub = await prisma.subscription.create({
    data: {
      plan: plan as Plan,
      active: false,
      mId,
      sha256: sha256,
      currentPeriodEndDate: new Date(1000),
      sellerId: seller.id,
    },
  });

  return seller;
};

export const GetSellerWithSubBySellerId = async () => {
  const cUser = await getCurrentUser();
  if (!cUser) throw new Error("Authentication Error seller.ts");
  const res = await prisma.seller.findUnique({
    where: {
      userId: cUser.id,
    },
    include: {
      subscription: true,
    },
  });
  return res;
};

export const ChangeMpaisaId = async (id: string, mpaisa: number) => {
  const orderRes = await prisma.subscription.update({
    where: {
      id: id,
    },
    data: {
      mId: mpaisa as number,
    },
  });
  return orderRes;
};

export const UpdateSellerStatusAfterPayment = async (mId: number) => {
  console.log(mId);
  const res = await prisma.subscription.update({
    where: {
      mId: mId,
    },
    data: {
      active: true,
    },
  });

  const res2 = await prisma.seller.update({
    where: {
      id: res.sellerId,
    },
    data: {
      isPaid: true,
    },
  });
  return res2;
};
