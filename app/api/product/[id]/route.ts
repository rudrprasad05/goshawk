import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/form";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;

    const product = await prisma.product.delete({
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
    const body: NewProductType = await request.json();

    console.log(body);

    const { name, price, tag, description } = body;

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        price,
        tagId: tag,
        description,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
