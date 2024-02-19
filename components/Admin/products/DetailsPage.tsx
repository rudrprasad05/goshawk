"use server";

import {
  CategoryType,
  ProductType,
  SellerType,
  SubcategoryType,
  UserType,
} from "@/types";
import React, { useEffect } from "react";
import { PanelsTopLeft } from "lucide-react";
import EditProductButton from "../EditProductButton";
import { getCurrentUser } from "@/actions/user";
import { DeleteProductButton } from "../DeleteProductButton";
import { HideProductButton } from "../HideProductButton";
import {
  GetAllParentCategories,
  GetAllParentWithChildCategories,
} from "@/actions/category";
import SalesAmountDisplay from "../SalesAmountDisplay";
import { GetOrdersForSingleProduct } from "@/actions/orders";
import { useSession } from "next-auth/react";
import { ProductView } from "./ProductView";

export type ProductTypeLocal = ProductType & {
  seller: SellerType;
  category: SubcategoryType;
  parentCategory: CategoryType;
};

const DetailsPage = async ({ product }: { product: ProductTypeLocal }) => {
  const user = await getCurrentUser();
  const date = new Date();

  if (!user) return null;

  return (
    <>
      <ProductView product={product} />
      <EditGrid user={user} product={product} />
    </>
  );
};

const EditGrid = async ({
  user,
  product,
}: {
  user: any;
  product: ProductTypeLocal;
}) => {
  const cat = await GetAllParentWithChildCategories();
  const orders = await GetOrdersForSingleProduct(product.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <EditProductButton parentCategories={cat} product={product} />
      <DeleteProductButton product={product} user={user} />
      <HideProductButton product={product} user={user} />
      <SalesAmountDisplay orders={orders} />
    </div>
  );
};

export default DetailsPage;
