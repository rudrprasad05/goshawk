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
      let tempMerchantOrder = await prisma.merchantOrder.create({
        data: {
          orderId: order.id,
          sellerId: body[i][0].sellerId,
          // isPaid set this after payment system
        },
      });

      for (let j = 0; j < body[i].length; j++) {
        let tempOrderList = await prisma.orderList.create({
          data: {
            merchantOrdersId: tempMerchantOrder.id,
            productId: body[i][j].id,
            quanity: 1,
            price: parseInt(body[i][j].price),
          },
        });
      }
      orderListArr.push(tempMerchantOrder);
    }

    return NextResponse.json(orderListArr);
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
