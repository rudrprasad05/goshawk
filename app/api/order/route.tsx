import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProductType } from "@/types";
import { NewProductType } from "@/schemas/product";
import getSession from "@/actions/getSession";

export async function POST(request: Request) {
  try {
    const body: ProductType[][] = await request.json();
    const session = await getSession();

    let total = 0;
    let orderListArr = [];
    let res = body.map((i: ProductType[]) =>
      i.map((j: ProductType) => (total += parseInt(j.price)))
    );

    const order = await prisma.order.create({
      data: {
        customerId: session?.user.id as string,
        total,
        address: session?.user.address as string,
        city: session?.user.town as string,
        country: session?.user.country as string,
        contact: "911",
      },
    });

    for (let i = 0; i < body.length; i++) {
      let temp = await prisma.orderList.create({
        data: {
          orderId: order.id,
          sellerId: body[i][0].sellerId,
          productId: body[i][0].id,
          quanity: body[i].length,
          price: parseInt(body[i][0].price),
        },
      });
      orderListArr.push(temp);
    }

    return NextResponse.json(orderListArr);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
