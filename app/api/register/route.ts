import prisma from "@/lib/prismadb";
import { RegisterFormType } from "@/schemas/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { string } from "zod";
import { Role } from "@prisma/client";
import crypto from "crypto";
import { sendEmail } from "@/actions/email";
import { VerifyEmailTemplate } from "@/components/email/VerifyEmailTemplate";

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

  const createdUser = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role: role as Role,
    },
  });

  const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

  await prisma.user.update({
    where: {
      id: createdUser.id,
    },
    data: {
      emailVerificationToken: emailVerificationToken,
    },
  });

  await sendEmail({
    from: "Admin <onboarding@resend.dev>",
    to: [email],
    subject: "Verify your email address",
    react: VerifyEmailTemplate({
      email,
      emailVerificationToken,
    }) as React.ReactElement,
  });

  return NextResponse.json(createdUser);
}
