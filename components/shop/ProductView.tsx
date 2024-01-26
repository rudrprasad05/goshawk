"use client";

import { ProductType, UserType } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CartContext } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import ProductQuantityButton from "../Admin/products/ProductQuantityButton";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

export const ProductView = ({
  product,
  user,
}: {
  product: ProductType;
  user: UserType;
}) => {
  const { cartProducts, addCart, removeCart } = useContext(CartContext);
  const [domLoaded, setDomLoaded] = useState(false);
  const [addToCart, setaddToCart] = useState(true);
  const router = useRouter();

  useEffect(() => {
    cartProducts.map((cartproduct: ProductType) => {
      if (
        cartProducts.filter((e: ProductType) => e.id === product.id).length > 0
      ) {
        setaddToCart(false);
      } else if (
        cartProducts.filter((e: ProductType) => e.id != product.id).length > 0
      ) {
        setaddToCart(true);
      }
    });
    setDomLoaded(true);
  }, [cartProducts, product.id]);
  return (
    <div>
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
          <div className="flex gap-5">
            <h1 className="mb-5 text-lg text-primary">
              {product.seller.companyName}
            </h1>
            <div>
              {user.seller && (
                <Badge variant={"secondary"}>
                  {product.isVisible ? "Visible" : "Hidden"}
                </Badge>
              )}
            </div>
          </div>

          <h2 className="text-5xl font-bold capitalize">{product.name}</h2>
          <p className="my-8 text-muted-foreground">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
          <div className="flex items-center gap-5 py-3">
            <div>
              <ProductQuantityButton
                product={product}
                setButton={setaddToCart}
              />
            </div>
            <div>
              {addToCart ? (
                <Button
                  onClick={() => {
                    setaddToCart(false);
                    addCart(product);
                  }}
                >
                  <span>
                    <ShoppingCart className="w-6 h-6 " />
                  </span>
                </Button>
              ) : (
                <Button
                  variant={"destructive"}
                  onClick={() => {
                    setaddToCart(true);
                    removeCart(product, true);
                  }}
                >
                  <span>
                    <ShoppingCart className="w-6 h-6 " />
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
