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

    console.log(body);

    const { name, price, description, imageUrl, isVisible } = body;

    const product = await prisma.products.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        // tagId: tag,
        description,
        imageUrl,
        isVisible: isVisible,
      },
    });
    console.log(product);
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
