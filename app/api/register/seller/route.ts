import prisma from "@/lib/prismadb";
import { RegisterFormType, SellerRegisterType } from "@/schemas/auth";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: SellerRegisterType = await request.json();
    const { companyName, userId, address, city, country, phone, plan, image } =
      body;

    if (!userId) {
      return new NextResponse("Missing Info", { status: 400 });
    }

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
        plan,
        companyName: companyName as string,
        userId: userId,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
