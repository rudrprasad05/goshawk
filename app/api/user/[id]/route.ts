import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();

    const { town, country, address } = body;

    const product = await prisma.user.update({
      where: {
        id,
      },
      data: {
        town,
        country,
        address,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
