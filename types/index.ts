import { GetOrderWithProductsForOneCustomer } from "@/actions/orders";
import { GetProductDetails } from "@/actions/products";
import { GetSellerWithSubBySellerId } from "@/actions/seller";
import {
  Ad,
  Billboard,
  Category,
  Conversation,
  MerchantOrder,
  Message,
  Order,
  OrderList,
  Products,
  Seller,
  Subcategory,
  User,
  Prisma,
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

export type CategoryType = Category;

export type ConversationType = Conversation & {
  messages: Message[];
  users: User[];
};

export type SubcategoryType = Subcategory;

export type MessageType = Message;

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

export type OrderType = Order;

export type BillboardType = Billboard & {
  ad: Ad & {
    seller: Seller;
  };
};

// export type OrderWithMerchantOrderListAndProductsType = Order & {
//   merchantOrders: MerchantOrder[] & {
//     orderLists: OrderList[] & {
//       product: Products;
//     };
//   };
// };
export type OrderWithMerchantOrderListAndProductsType =
  Prisma.PromiseReturnType<typeof GetOrderWithProductsForOneCustomer>;

export type ProductDetialsPage = Prisma.PromiseReturnType<
  typeof GetProductDetails
>;

export type UserDataOnlyType = User;

export type GetSellerWithSubBySellerIdType = Prisma.PromiseReturnType<
  typeof GetSellerWithSubBySellerId
>;
