import prisma from "@/lib/prismadb";
import { RegisterFormType } from "@/schemas/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, type, model, description, imageUrl } = body;

  const repair = await prisma.repairOrder.create({
    data: {
      userId,
      type,
      model,
      description,
      imageUrl,
    },
  });

  return NextResponse.json(repair);
}
