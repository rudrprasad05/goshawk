import prisma from "@/lib/prismadb";
import { RegisterFormType } from "@/schemas/auth";
import bcrypt from "bcrypt";
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

  const user = await prisma.user.create({
    data: {
      email,
      hashedPassword,
      name,
      role,
    },
  });

  return NextResponse.json(user);
}
