import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { ProductType } from "@/types";
import { NewProductType } from "@/schemas/product";
import getSession from "@/actions/getSession";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { data, customer } = body;
    const session = await getSession();

    let total = 0;
    let orderListArr = [];
    let res = data.map((i: ProductType[]) =>
      i.map((j: ProductType) => (total += parseInt(j.price)))
    );

    const user = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });

    console.log(user);

    if (!user) return new NextResponse("internal error", { status: 500 });

    const order = await prisma.order.create({
      data: {
        total,
        address: user.address as string,
        city: user.town as string,
        country: user.country as string,
        contact: user.phone as string,
        customerId: customer,
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

    return NextResponse.json("orderListArr");
  } catch (error: any) {
    console.log(error, "NEW BRANCH ERROR");
    return new NextResponse("internal error", { status: 500 });
  }
}
