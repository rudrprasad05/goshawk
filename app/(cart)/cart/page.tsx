"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PRODUCT_CATEGORIES } from "@/config";
import { CartContext } from "@/context/CartContext";
import { cn, formatPrice } from "@/lib/utils";
import axios from "axios";
import { Check, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const Page = () => {
  const { cartProducts, getTotal, removeCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = getTotal();

  const fee = 1;

  const handleClick = async () => {
    let groupingViaCommonProperty = Object.values(
      cartProducts.reduce((acc, current) => {
        acc[current.seller.id] = acc[current.seller.id] ?? [];
        acc[current.seller.id].push(current);
        return acc;
      }, {})
    );

    setLoading(true);
    await axios
      .post("/api/order", groupingViaCommonProperty)
      .then(() => {
        setLoading(false);
        toast.success("Order Sent Successfully");
      })
      .catch((error: any) => {
        console.log("error");
        toast.error("Something went wrong");
      });
  };

  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tightsm:text-4xl">
          Shopping Cart
        </h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div
            className={cn("lg:col-span-7", {
              "rounded-lg border-2 border-dashed p-12":
                isMounted && cartProducts.length === 0,
            })}
          >
            <h2 className="sr-only">Items in your shopping cart</h2>

            {isMounted && cartProducts.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center space-y-1">
                <div
                  aria-hidden="true"
                  className="relative mb-4 h-40 w-40 text-muted-foreground"
                >
                  <Image
                    src="/hippo-empty-cart.png"
                    fill
                    loading="eager"
                    alt="empty shopping cart hippo"
                  />
                </div>
                <h3 className="font-semibold text-2xl">Your cart is empty</h3>
                <p className="text-muted-foreground text-center">
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={cn({
                "divide-y border-b border-t":
                  isMounted && cartProducts.length > 0,
              })}
            >
              {isMounted &&
                cartProducts.map((product, index) => {
                  //   const label = PRODUCT_CATEGORIES.find(
                  //     (c) => c.value === product.seller.companyName
                  //   )?.label;

                  const image = product.imageUrl;

                  return (
                    <li key={product.id + index} className="flex py-6 sm:py-10">
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24">
                          <Image
                            fill
                            src={image}
                            alt="product image"
                            className="h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48"
                          />
                        </div>
                      </div>

                      <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                          <div>
                            <div className="flex justify-between">
                              <h3 className="text-sm">
                                <Link
                                  href={`/product/${product.id}`}
                                  className="font-medium text-secondary-foreground"
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className="mt-1 flex text-sm">
                              <p className="text-muted-foreground">
                                {product.sellerId}
                              </p>
                            </div>

                            <p className="mt-1 text-sm font-medium text-muted-foreground">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <div className="mt-4 sm:mt-0 sm:pr-9 w-20">
                            <div className="absolute right-0 top-0">
                              <Button
                                aria-label="remove product"
                                onClick={() => removeCart(product, false)}
                                variant="ghost"
                              >
                                <X className="h-5 w-5" aria-hidden="true" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                          <Check className="h-5 w-5 flex-shrink-0 text-green-500" />

                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <Card className="mt-16 rounded-lg sticky top-24 lg:col-span-5 lg:mt-0">
            <CardHeader>
              <h2 className="text-lg font-medium">Order summary</h2>
            </CardHeader>

            <CardContent className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Subtotal</p>
                <p className="text-sm font-medium text-muted-foreground">
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between border-tpt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <span>Flat Transaction Fee</span>
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between border-t pt-4">
                <div className="text-base font-medium">Order Total</div>
                <div className="text-base font-medium">
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                </div>
              </div>
            </CardContent>

            <CardFooter className="mt-6">
              <Button
                // disabled={cartProducts.length === 0 || loading}
                className="w-full"
                size="lg"
                onClick={() => handleClick()}
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
                Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
