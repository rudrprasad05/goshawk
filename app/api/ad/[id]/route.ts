import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(request: Request, { params }: any) {
  try {
    const { id } = params;
    const body = await request.json();

    console.log(body, id);

    const { imageUrl, sellerId } = body;

    const product = await prisma.ad.update({
      where: {
        id,
      },
      data: {
        imageUrl,
      },
    });
    return NextResponse.json(product);
  } catch (error: any) {
    return [];
  }
}
