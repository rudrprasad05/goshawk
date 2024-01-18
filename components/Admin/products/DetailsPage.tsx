"use client";

import { ProductType } from "@/types";
import React from "react";
import Header from "../Header";
import { Layers3, PanelsTopLeft } from "lucide-react";

const DetailsPage = ({ product }: { product: ProductType }) => {
  return (
    <div>
      <Header name={product.name} Icon={Layers3} />
      {product.name}
    </div>
  );
};

export default DetailsPage;
