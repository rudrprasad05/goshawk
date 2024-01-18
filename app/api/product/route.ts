import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProductType } from "@/types";
import { NewProductType } from "@/schemas/product";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, price, imageUrl, sellerId } = body;

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        sellerId,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const product = await prisma.products.findMany();

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
