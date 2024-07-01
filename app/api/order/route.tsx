import getSession from "@/actions/getSession";
import prisma from "@/lib/prismadb";
import { NewProductType } from "@/schemas/product";
import { ProductType } from "@/types";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, customer } = body;
    const session = await getSession();

    let total = 0;
    let orderListArr = [];
    let res = data.map((i: ProductType[]) =>
      i.map((j: ProductType) => (total += j.price))
    );

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    if (!user) return new NextResponse("no user found, error", { status: 500 });

    let date = new Date().getTime();
    let sha256 = crypto.randomBytes(32).toString("base64url");

    const order = await prisma.order.create({
      data: {
        sha256: sha256,
        total,
        mpaisaId: date as number,
        address: user.address as string,
        city: user.town as string,
        country: user.country as string,
        contact: user.phone as string,
        customerId: user.id,
      },
    });

    for (let i = 0; i < data.length; i++) {
      let tempMerchantOrder = await prisma.merchantOrder.create({
        data: {
          orderId: order.id,
          sellerId: data[i][0].sellerId,
          // isPaid set this after payment system
        },
      });

      for (let j = 0; j < data[i].length; j++) {
        let tempOrderList = await prisma.orderList.create({
          data: {
            merchantOrdersId: tempMerchantOrder.id,
            productId: data[i][j].id,
            quanity: 1,
            price: parseInt(data[i][j].price),
          },
        });
      }
      orderListArr.push(tempMerchantOrder);
    }

    return NextResponse.json(order);
  } catch (error: any) {
    console.log(error, "ORDER CREATION ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
