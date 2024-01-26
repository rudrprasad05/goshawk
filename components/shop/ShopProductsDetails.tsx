import { ProductType } from "@/types";
import React from "react";
import { Layers3, PanelsTopLeft } from "lucide-react";
import { getCurrentUser } from "@/actions/user";
import Header from "../Admin/Header";
import { DeleteProductButton } from "../Admin/DeleteProductButton";
import EditProductButton from "../Admin/EditProductButton";
import { HideProductButton } from "../Admin/HideProductButton";
import { ProductView } from "./ProductView";

export const ShopProductsDetails = async ({
  product,
}: {
  product: ProductType;
}) => {
  const user = await getCurrentUser();

  if (!user) return null;
  if (user.seller)
    return (
      <>
        <ProductView product={product} user={user} />
        <EditGrid user={user} product={product} />
      </>
    );

  return (
    <>
      <ProductView product={product} user={user} />
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
