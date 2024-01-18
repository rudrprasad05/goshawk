"use client";

import { CartContext } from "@/context/CartContext";
import { ProductType } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import { MdAdd, MdHorizontalRule } from "react-icons/md";
import { Button } from "@/components/ui/button";

interface props {
  product: ProductType;
}

const ProductQuantityButton: React.FC<props> = ({ product }) => {
  const [isButtonDiabled, setIsButtonDiabled] = useState<boolean>(false);
  const { removeCart, addCart, cartProducts } = useContext(CartContext);
  const [count, setCount] = useState<number>(0);

  var tempCount = 0;

  useEffect(() => {
    tempCount = 0;
    cartProducts.map((e) => {
      if (e.id == product.id) {
        tempCount++;
      }
    });
    setCount(tempCount);
    setIsButtonDiabled(tempCount == 0 ? true : false);
  }, [cartProducts]);

  const handleCountDec = () => {
    if (count === 0) {
      setIsButtonDiabled(true);
      return;
    } else {
      setIsButtonDiabled(false);
      setCount(count - 1);
    }
    removeCart(product, false);
  };
  const handleCountInc = () => {
    setCount((prev) => prev + 1);
    addCart(product);
  };

  return (
    <div className="flex gap-3">
      <Button
        className="p-0 h-6 w-6 rounded-full"
        disabled={isButtonDiabled}
        variant={"outline"}
        onClick={handleCountDec}
      >
        <MdHorizontalRule />
      </Button>

      <div>{count}</div>

      <Button
        className="p-0 h-6 w-6 rounded-full"
        variant={"outline"}
        onClick={handleCountInc}
      >
        <MdAdd />
      </Button>
    </div>
  );
};

export default ProductQuantityButton;
