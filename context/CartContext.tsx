"use client";

import { ProductType } from "@/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { number } from "zod";

export type CartContextType = {
  cartProducts: ProductType[];
  removeCart: (product: ProductType, all: any) => any;
  addCart: (product: ProductType) => void;
  cartCount: number;
  // setCartCount: () => void;
  totalPrice: number;
  getTotal: () => number;
  getQuantity: () => [{}];
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  removeCart: (product: ProductType, all: any) => {},
  addCart: (product: ProductType) => {},
  cartCount: 0,
  totalPrice: 0,
  getTotal: () => 0,
  getQuantity: () => [{}],
  clearCart: () => {},
});

export function CartContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const user = useSession();

  const ls = typeof window != "undefined" ? window.localStorage : null;
  const defaultProducts = ls ? JSON.parse(ls?.getItem("cart") as string) : [];
  const defaultTotalPrice: number = ls
    ? parseInt(JSON.parse(ls?.getItem("totalPrice") as string))
    : 0;

  const [cartProducts, setCartProducts] = useState<ProductType[]>(
    defaultProducts || []
  );
  const [cartCount, setCartCount] = useState<number>(
    defaultProducts?.length || 0
  );

  const [totalPrice, setTotalPrice] = useState<number>(defaultTotalPrice || 0);

  const getTotal = () => {
    var temp: number = 0;
    cartProducts.map((e) => (temp += parseFloat(e.price)));
    setTotalPrice(temp);
    return temp;
  };

  const getQuantity = () => {
    const data: [{}] = [{}];
    let id: string;
    let quanity: number = 0;
    let temp = { id: "", quanity: 0 };
    // cartProducts.map((e) => {
    //   id = e.id;
    //   cartProducts.map((f) => {
    //     if (f.id == id) {
    //       quanity++
    //     }
    //   });
    // });
    for (let i = 0; i < cartProducts.length - 1; i++) {
      id = cartProducts[i].id;
      for (let j = i + 1; j < cartProducts.length - 1; j++) {
        if (cartProducts[j].id == id) {
          quanity++;
          cartProducts.splice(j, 1);
        }
      }
      temp.id = id;
      temp.quanity = quanity;
      data.push(temp);
    }

    return data;
  };

  const addCart = (product: ProductType) => {
    if (user.status == "unauthenticated") {
      toast.error("Login first");
      router.push("/login");

      return null;
    }
    setTotalPrice((prev: number) => prev + parseInt(product.price));
    setCartProducts((prev: any) => [...prev, product]);
    setCartCount((prev: number) => prev + 1);
    toast.success("Product Added");
  };

  const removeCart = (product: ProductType, all: any) => {
    if (user.status == "unauthenticated") {
      toast.error("Login first");
      router.push("/login");

      return null;
    }
    // [...prev.filter((prevProduct) => prevProduct != productId)]
    if (!all) {
      setCartProducts((prev: any) => {
        const arr = [...prev];
        const index = arr.indexOf(product);
        if (index > -1) {
          // only splice array when item is found
          arr.splice(index, 1); // 2nd parameter means remove one item only
        }

        setCartCount(arr.length);

        return arr;
      });
      setTotalPrice((prev2: number) => prev2 - parseInt(product.price));
    } else {
      setCartProducts((prev: ProductType[]) => {
        var i = 0;
        let arr: ProductType[] = [...prev];
        while (i < arr.length) {
          if (arr[i].id === product.id) {
            setTotalPrice((prev2: number) => prev2 - parseInt(product.price));
            arr.splice(i, 1);
          } else {
            ++i;
          }
        }
        setCartCount(arr.length);

        return arr;
      });
    }
    toast.success("Product Deleted");
  };

  const clearCart = () => {
    setCartCount(0);
    setCartProducts([]);
    setTotalPrice(0);
    ls?.removeItem("cart");
  };

  useEffect(() => {
    if (cartProducts.length >= 0 && cartProducts[0] != null) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
    if (cartProducts.length == 0) {
      ls?.removeItem("cart");
    }

    if (totalPrice >= 0) {
      ls?.setItem("totalPrice", JSON.stringify(totalPrice));
    }
    if (totalPrice < 0) {
      ls?.removeItem("totalPrice");
    }
  }, [cartProducts, totalPrice]);

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart") || ""));
    }

    if (ls && ls.getItem("totalPrice")) {
      setTotalPrice(JSON.parse(ls.getItem("totalPrice") || "0"));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        removeCart,
        addCart,
        cartCount,
        totalPrice,
        getTotal,
        getQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
