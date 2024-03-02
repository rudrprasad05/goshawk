"use server";

import prisma from "@/lib/prismadb";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (payload: any, options?: any) => {
  const data = await resend.emails.send(payload, options);

  console.log("Email sent successfully");

  return data;
};

export const VerifyEmail = async (token: string) => {
  const find = await prisma.user.findFirst({
    where: {
      emailVerificationToken: token,
    },
  });
  if (!find) return null;

  const res = await prisma.user.update({
    where: {
      emailVerificationToken: token,
    },
    data: {
      emailVerified: new Date().toISOString(),
    },
  });
  if (!res) return null;

  return res;
};
