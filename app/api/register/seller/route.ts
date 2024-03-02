import prisma from "@/lib/prismadb";
import { RegisterFormType, SellerRegisterType } from "@/schemas/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { Plan } from "@prisma/client";

export async function POST(request: Request) {
  const body: SellerRegisterType = await request.json();
  const { companyName, userId, address, city, country, phone, plan, image } =
    body;

  console.log(body);

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

  const findSellerName = await prisma.seller.findFirst({
    where: {
      companyName: companyName,
    },
  });

  if (findSellerName) throw new Error("Company Name is already in use");

  const seller = await prisma.seller.create({
    data: {
      companyName: companyName as string,
      userId: userId as string,
      isPaid: true,
      isVerified: true,
    },
  });

  const sub = await prisma.subscription.create({
    //@ts-ignore
    data: {
      plan: plan as Plan,
      active: true,
      currentPeriodEndDate: new Date(1000),
      sellerId: seller.id,
    },
  });

  return NextResponse.json(seller);
}
