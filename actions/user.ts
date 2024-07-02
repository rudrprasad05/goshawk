"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { sendEmail } from "./email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import { ChangePasswordEmail } from "@/components/email/ResetPasswordTemplate";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { UserDataOnlyType, UserType } from "@/types";
import { EditProfileSchemaType } from "@/app/(myaccount)/account/[id]/profile/_components/ProfileCont";

export const NavbarUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        seller: true,
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

export const GetOnlyCurrentUser = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
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

export const getCurrentUser = async () => {
  console.log("first");
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      include: {
        seller: {
          include: {
            products: true,
          },
        },
        orders: true,
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

export const GetUserForUserDash = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id as string,
      },
      include: {
        wishlist: true,
        orders: true,
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

export const GetUseDataOnly = async () => {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session?.user?.id as string,
      },
      include: {
        seller: true,
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

export const GenerateChangePasswordToken = async (email: string) => {
  let passwordToken = crypto.randomBytes(32).toString("base64url");

  const res = await prisma.user.update({
    where: {
      email,
    },
    data: {
      changePasswordToken: passwordToken,
    },
  });
  if (!res) throw new Error("user not found");
  await sendEmail({
    from: "no-reply <no-reply@goshawkfiji.com>",
    to: [email],
    subject: "Verify your email address",
    react: ChangePasswordEmail({
      email,
      token: passwordToken,
    }) as React.ReactElement,
  });
  return res;
};

export const CheckChangePasswordToken = async (token: string) => {
  const user = await prisma.user.findUnique({
    where: {
      changePasswordToken: token,
    },
  });
  console.log("first");

  if (!user) return null;
  if (user) return user;
};

export const ChangePassword = async (token: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  const createdUser = await prisma.user.update({
    where: {
      changePasswordToken: token,
    },
    data: {
      hashedPassword,
    },
  });
  return createdUser;
};

export const SaveUserDetailsProfile = async (data: EditProfileSchemaType) => {
  const user = prisma.user.update({
    where: {
      email: data.email,
    },
    data: data,
  });
  return user;
};
