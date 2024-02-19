import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      description,
      price,
      imageUrl,
      sellerId,
      subcategory,
      category,
    } = body;

    console.log(body);
    parseFloat(price);
    console.log(price, typeof price);

    const product = await prisma.products.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        imageUrl,
        sellerId,
        parentCategoryId: category,
        categoryId: subcategory,
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
