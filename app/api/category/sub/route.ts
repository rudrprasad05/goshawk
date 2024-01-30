import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProductType } from "@/types";
import { NewProductType } from "@/schemas/product";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, id } = body;

    const product = await prisma.subcategory.create({
      data: {
        name,
        parentCategoryId: id,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.log(error, "NEW CATEGORY ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
