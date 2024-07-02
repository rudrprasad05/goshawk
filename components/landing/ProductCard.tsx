"use client";
import { CartContext } from "@/context/CartContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

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
import { ProductType, WishlistWithItems } from "@/types";

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import ProductQuantityButton from "../Admin/products/ProductQuantityButton";
import { Heart } from "lucide-react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { AddItemToWishlist, RemoveItemFromWishlist } from "@/actions/wishlist";

interface props {
  product: ProductType;
  wishlist: WishlistWithItems;
}

export const ProductCard: React.FC<props> = ({ product, wishlist }) => {
  const { cartProducts, addCart, removeCart } = useContext(CartContext);
  const user = useSession();
  const [domLoaded, setDomLoaded] = useState(false);
  const [addToCart, setaddToCart] = useState(true);
  const [addToWishList, setAddToWishList] = useState(false);

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
    wishlist?.wishlistItems.map((wi) => {
      if (wi.productId == product.id) {
        setAddToWishList(true);
      }
    });
    setDomLoaded(true);
  }, [cartProducts, product.id]);

  const handleWishList = async () => {
    if (!user.data?.user) {
      toast.error("Login first");
      router.push("/login");
      return;
    }
    if (!addToWishList) {
      setAddToWishList((prev) => !prev);
      await AddItemToWishlist(user.data?.user.id, product.id).then(() =>
        toast.success("Added to wishlist")
      );
    } else {
      setAddToWishList((prev) => !prev);
      await RemoveItemFromWishlist(user.data?.user.id, product.id).then(() =>
        toast.success("Removed from wishlist")
      );
    }
  };

  if (!domLoaded) return null;

  return (
    <Card className="h-full  flex flex-col justify-between">
      <CardHeader>
        <div className="relative w-full h-[220px]">
          <Image
            src={product.imageUrl[0]}
            alt={product.name}
            width={220}
            height={220}
            className="object-cover w-full h-full"
          />
          <button onClick={handleWishList} className="absolute top-0 right-0">
            <Heart
              className={clsx(`${addToWishList ? "fill-white" : "fill-none"}`)}
            />
          </button>
        </div>
        <div className="flex gap-5 pt-5">
          <CardTitle className="grow truncate line-clamp-2 p-0">
            {product.name}
          </CardTitle>
          <Badge className="h-min">{product.seller.companyName}</Badge>
        </div>
      </CardHeader>
      <CardDescription className="">
        <CardContent className="flex flex-col justify-between">
          <div className="flex items-center py-2">
            <CardTitle className="grow">${product.price}</CardTitle>
            <Link
              href={`/shop/products/details/${product.id}`}
              className={`text-primary underline-offset-4 hover:underline px-0`}
            >
              Details
            </Link>
          </div>
        </CardContent>
      </CardDescription>

      <CardFooter className="flex justify-between">
        <div>
          <ProductQuantityButton product={product} setButton={setaddToCart} />
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
                <MdAddShoppingCart className="w-6 h-6 stroke-primary" />
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
                <MdRemoveShoppingCart className="w-6 h-6 stroke-primary" />
              </span>
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
