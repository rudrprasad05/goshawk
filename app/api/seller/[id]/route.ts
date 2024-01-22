import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const { id } = params;

    console.log(id);

    const product = await prisma.seller.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    return new NextResponse("error", { status: 500 });
  }
}

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log(body);

    const { isVerified } = body;

    const product = await prisma.seller.update({
      where: {
        id,
      },
      data: {
        isVerified,
      },
    });
    console.log(product);
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
