import { sendEmail } from "@/actions/email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";
import prisma from "@/lib/prismadb";
import { RegisterFormType } from "@/schemas/auth";
import { Role } from "@prisma/client";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { string } from "zod";

export async function POST(request: Request) {
  const body: RegisterFormType = await request.json();
  const { email, name, password, role } = body;

  if (!email || !name || !password) {
    return new NextResponse("Missing Info", { status: 400 });
  }

  const isEmailUsed = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (isEmailUsed)
    return new NextResponse("Email already in use", { status: 401 });

  const hashedPassword = await bcrypt.hash(password, 12);
  const emailVerificationToken = crypto.randomBytes(32).toString("base64url");
  const createdUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role: role as Role,
      changePasswordToken: emailVerificationToken,
      emailVerificationToken: emailVerificationToken,
    },
  });

  const wishList = await prisma.wishlist.create({
    data: {
      userId: createdUser.id,
    },
  });

  await sendEmail({
    from: "no-reply <no-reply@goshawkfiji.com>",
    to: [email],
    subject: "Verify your email address",
    react: VerifyEmailTemplate({
      email,
      emailVerificationToken,
    }) as React.ReactElement,
  });

  return NextResponse.json(createdUser);
}
