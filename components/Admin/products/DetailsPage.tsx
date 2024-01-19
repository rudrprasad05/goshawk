"use server";

import { ProductType, UserType } from "@/types";
import React from "react";
import Header from "../Header";
import { Layers3, PanelsTopLeft } from "lucide-react";
import Image from "next/image";
import EditProductButton from "../EditProductButton";
import { getCurrentUser } from "@/actions/user";
import { DeleteProductButton } from "../DeleteProductButton";

const DetailsPage = async ({ product }: { product: ProductType }) => {
  const user = await getCurrentUser();
  return (
    <>
      <ProductView product={product} />
      <EditGrid user={user} product={product} />
    </>
  );
};

const ProductView = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <Header name={product.name}>
        <Layers3 />
      </Header>
      <div className="px-20 py-10 flex gap-20 items-center">
        <div>
          <Image
            className="rounded-md"
            alt={product.name}
            width={500}
            height={500}
            src={product.imageUrl}
          />
        </div>
        <div className="grow">
          <h1 className="mb-5 text-lg text-primary">
            {product.seller.companyName}
          </h1>
          <h2 className="text-5xl font-bold capitalize">{product.name}</h2>
          <p className="my-8 text-muted-foreground">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
        </div>
      </div>
    </div>
  );
};

const EditGrid = ({
  user,
  product,
}: {
  user: UserType;
  product: ProductType;
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <EditProductButton product={product} user={user} />
      <DeleteProductButton product={product} user={user} />
    </div>
  );
};

export default DetailsPage;
