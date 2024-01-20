"use client";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { ProductType } from "@/types";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ProductQuantityButton from "../Admin/products/ProductQuantityButton";

interface props {
  product: ProductType;
}

export const ProductCard: React.FC<props> = ({ product }) => {
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

  if (!domLoaded) return null;

  return (
    <Card className=" flex flex-col justify-between">
      <CardHeader>
        <div className="w-full h-40">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={200}
            height={200}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="flex gap-5 pt-5">
          <CardTitle className="grow p-0">{product.name}</CardTitle>
          {/* <Badge className="h-min">{product.tag.name}</Badge> */}
        </div>
      </CardHeader>
      <CardDescription className="">
        <CardContent className="flex flex-col justify-between">
          <div className="line-clamp-2 text-ellipsis">
            {product.description}
          </div>

          <div className="flex items-center py-2">
            <CardTitle className="grow">${product.price}</CardTitle>
            <Link
              href={`/seller/products/details/${product.id}`}
              className={`text-primary underline-offset-4 hover:underline px-0`}
            >
              Details
            </Link>
          </div>
        </CardContent>
      </CardDescription>

      <CardFooter className="flex justify-between">
        <div>
          <Link
            href={`products/${product.id}`}
            className={`${buttonVariants({ variant: "link" })} px-0 py-0 p-0`}
          >
            <div className="p-0">Details</div>
          </Link>
          <ProductQuantityButton product={product} />
        </div>
        <div>
          {cartProducts && addToCart && (
            <Button
              onClick={() => {
                setaddToCart(false);
                addCart(product);
              }}
            >
              <span>
                <MdAddShoppingCart className="w-6 h-6 stroke-primary" />
              </span>
            </Button>
          )}

          {cartProducts && !addToCart && (
            <Button
              variant={"destructive"}
              onClick={() => {
                setaddToCart(true);
                removeCart(product, true);
              }}
            >
              <span>
                <MdRemoveShoppingCart className="w-6 h-6 stroke-primary" />
              </span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
