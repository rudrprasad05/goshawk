import {
  Ad,
  Products,
  Seller,
  User,
  OrderList,
  Order,
  MerchantOrder,
  Billboard,
} from "@prisma/client";

export type UserType = User & {
  seller: SellerType;
};

export type SellerType = Seller & {
  products: Products[];
};

export type ProductType = Products & {
  seller: Seller;
};

export type AdsEndPoint = Seller & {
  ads: Ad[];
};

export type AdType = Ad;

export type OrderListType = OrderList & {
  product: Products;
  seller: Seller;
  order: Order;
};

export type MerchantOrderType = MerchantOrder & {
  order: Order & {
    customer: User;
  };
  seller: Seller;
  orderLists: OrderList[] & {
    product: Products;
  };
};

export type BillboardType = Billboard & {
  ad: Ad & {
    seller: Seller;
  };
};
