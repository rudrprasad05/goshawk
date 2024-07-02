"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { sendEmail } from "./email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import { ChangePasswordEmail } from "@/components/email/ResetPasswordTemplate";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { getCurrentUser } from "./user";

export const AddItemToWishlist = async (userId: string, productId: string) => {
  try {
    const session = await getSession();

    const currentUser = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
      include: {
        wishlist: true,
      },
    });

    if (!currentUser) return null;

    const wishlistItem = await prisma.wishlistItem.create({
      data: {
        productId,
        wishlistId: currentUser.wishlist?.id as string,
      },
    });

    if (!currentUser) {
      return null;
    }

    return currentUser;
  } catch (error) {
    return null;
  }
};

export const RemoveItemFromWishlist = async (
  userId: string,
  productId: string
) => {
  try {
    const session = await getSession();

    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId: userId as string,
      },
      include: {
        wishlistItems: true,
      },
    });

    if (!wishlist) return null;

    let wlI = wishlist.wishlistItems;
    let deleteElementIndex = wlI.findIndex((e) => e.productId == productId);
    let deleteElementId = wlI[deleteElementIndex].id;

    const deletedWishlistItem = prisma.wishlistItem.delete({
      where: {
        id: deleteElementId,
      },
    });

    return deletedWishlistItem;
  } catch (error) {
    return null;
  }
};

export const GetCurrentUserWishlistWithWishlistItems = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId: user.id,
    },
    include: {
      wishlistItems: true,
    },
  });
  return wishlist;
};

export const GetCurrentUserWithWishlistAndProducts = async (id: string) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: {
      userId: id,
    },
    include: {
      wishlistItems: {
        include: {
          product: {
            include: {
              seller: true,
            },
          },
        },
      },
    },
  });
  return wishlist;
};
