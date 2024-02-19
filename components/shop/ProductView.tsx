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
import AdCaro from "../ads/AdCaro";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export const ProductView = ({
  product,
  related,
}: {
  product: ProductType;
  related: ProductType[];
}) => {
  const { cartProducts, addCart, removeCart } = useContext(CartContext);
  const [domLoaded, setDomLoaded] = useState(false);
  const [addToCart, setaddToCart] = useState(true);
  const router = useRouter();
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current, count]);

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
          <Carousel
            setApi={setApi}
            className="w-[500px] mx-auto py-6"
            opts={{ align: "start" }}
            // plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent className="">
              {product.imageUrl.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="w-full h-full">
                    <Image
                      className="object-cover h-full rounded-md"
                      alt={img}
                      width={500}
                      height={500}
                      src={img}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="w-min flex gap-3 mx-auto">
            {[...Array(count)].map((_i, index) => (
              <div
                key={index}
                onClick={() => api.scrollTo(index)}
                className="w-[50px] aspect-square cursor-pointer"
              >
                <div className="w-full h-full">
                  <Image
                    className={cn(
                      "object-cover h-full rounded-md opacity-50 transition",
                      current == index + 1 &&
                        "border-2 border-primary opacity-100"
                    )}
                    alt={product.imageUrl[index]}
                    width={100}
                    height={100}
                    src={product.imageUrl[index]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grow">
          <div className="flex gap-5">
            <h1 className="mb-5 text-lg text-primary">
              {product.seller.companyName}
            </h1>
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
      <div className="px-20">
        <AdCaro products={related} />
      </div>
    </div>
  );
};
