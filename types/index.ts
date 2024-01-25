import { Ad, Products, Seller, User, OrderList, Order } from "@prisma/client";

export type UserType = User & {
  seller: SellerType;
};

export type SellerType = Seller & {
  products: Products[];
};

export type ProductType = Products & {
  seller: Seller;
};

export type AdsEndPoint = User & {
  seller: Seller & {
    ad: Ad;
  };
};

export type AdType = Ad;

export type OrderListType = OrderList & {
  product: Products;
  seller: Seller;
  order: Order;
};
