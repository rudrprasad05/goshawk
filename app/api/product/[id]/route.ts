import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;

    const product = await prisma.products.delete({
      where: {
        id,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();

    const {
      name,
      price,
      description,
      imageUrl,
      isVisible,
      category,
      subcategory,
    } = body;

    console.log(body);

    const product = await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        parentCategoryId: category,
        description,
        imageUrl,
        isVisible: isVisible,
        categoryId: subcategory || null,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
