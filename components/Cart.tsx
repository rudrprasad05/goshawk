"use client";

import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { CartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import CartItem from "./cart/CartItem";
import { Badge } from "./ui/badge";

const Cart = () => {
  const { cartProducts, getTotal } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = getTotal();

  const fee = 1;

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <div className="relative">
          <ShoppingCart
            aria-hidden="true"
            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
          />
          {cartProducts.length > 0 && (
            <Badge className="absolute top-[-10px] right-[-10px] p-1 h-5 w-5 flex items-center justify-center">
              {cartProducts.length}
            </Badge>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          {/* <SheetTitle>Cart ({itemCount})</SheetTitle> */}
        </SheetHeader>
        {cartProducts.length > 0 ? (
          <>
            <div className="relative overflow-auto flex w-full flex-col pr-6">
              <ScrollArea>
                {cartProducts.map((product) => (
                  <CartItem product={product} key={product.id} />
                ))}
              </ScrollArea>
            </div>
            <div className="mt-auto space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Transaction Fee</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal + fee)}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue to Checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>
            <div className="text-xl font-semibold">Your cart is empty</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Add items to your cart to checkout
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
