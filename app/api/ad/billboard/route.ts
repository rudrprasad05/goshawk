import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, name, description } = body;

    const product = await prisma.billboard.create({
      data: {
        location,
        name,
        description,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
