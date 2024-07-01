"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { sendEmail } from "./email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import { ChangePasswordEmail } from "@/components/email/ResetPasswordTemplate";
import crypto from "crypto";
import bcrypt from "bcrypt";

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
