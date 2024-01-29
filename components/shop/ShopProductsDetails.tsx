import { getCurrentUser } from "@/actions/user";
import { ProductType } from "@/types";
import { Layers3, PanelsTopLeft } from "lucide-react";
import React from "react";

import { DeleteProductButton } from "../Admin/DeleteProductButton";
import EditProductButton from "../Admin/EditProductButton";
import Header from "../Admin/Header";
import { HideProductButton } from "../Admin/HideProductButton";
import { ProductView } from "./ProductView";
import { GetRelatedProducts } from "@/actions/products";

export const ShopProductsDetails = async ({
  product,
}: {
  product: ProductType;
}) => {
  const user = await getCurrentUser();
  const related = await GetRelatedProducts(product.id);

  if (user)
    if (user.seller)
      return (
        <>
          <ProductView related={related} product={product} user={user} />
          <EditGrid user={user} product={product} />
        </>
      );

  return (
    <>
      <ProductView related={related} product={product} user={user} />
    </>
  );
};

const EditGrid = ({ user, product }: { user: any; product: ProductType }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <EditProductButton product={product} user={user} />
      <DeleteProductButton product={product} user={user} />
      <HideProductButton product={product} user={user} />
    </div>
  );
};
