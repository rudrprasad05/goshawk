"use client";
import { GetProductWithSeller } from "@/actions/products";
import ProductQuantityButton from "@/components/Admin/products/ProductQuantityButton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CartContext } from "@/context/CartContext";
import { EditorElement, useEditor } from "@/providers/editor/editor-provider";
import { ProductType } from "@/types";
import clsx from "clsx";
import { Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { MdAddShoppingCart, MdRemoveShoppingCart } from "react-icons/md";

type Props = {
  element: EditorElement;
};

const ProductComponent = (props: Props) => {
  const { dispatch, state } = useEditor();
  const [product, setProduct] = useState<ProductType | null>(null);
  const { cartProducts, addCart, removeCart } = useContext(CartContext);
  const [domLoaded, setDomLoaded] = useState(false);
  const [addToCart, setaddToCart] = useState(true);
  const router = useRouter();

  const handleDeleteElement = () => {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: { elementDetails: props.element },
    });
  };
  const styles = props.element.styles;

  const handleOnClickBody = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({
      type: "CHANGE_CLICKED_ELEMENT",
      payload: {
        elementDetails: props.element,
      },
    });
  };

  useEffect(() => {
    const getProduct = async () => {
      const res = await GetProductWithSeller(
        props.element.content.productId as string
      ).then((ress) => setProduct(ress));
    };

    getProduct();
  }, [product]);

  useEffect(() => {
    cartProducts.map((cartproduct: ProductType) => {
      if (
        cartProducts.filter(
          (e: ProductType) => e.id === props.element.content.productId
        ).length > 0
      ) {
        setaddToCart(false);
      } else if (
        cartProducts.filter(
          (e: ProductType) => e.id != props.element.content.productId
        ).length > 0
      ) {
        setaddToCart(true);
      }
    });
    setDomLoaded(true);
  }, [cartProducts, props.element.content.productId]);

  if (!domLoaded) return null;

  return (
    <div
      style={styles}
      className={clsx(
        "p-[2px] w-full m-[5px] relative text-[16px] transition-all",
        {
          "!border-blue-500":
            state.editor.selectedElement.id === props.element.id,

          "!border-solid": state.editor.selectedElement.id === props.element.id,
          "border-dashed border-[1px] border-slate-300": !state.editor.liveMode,
        }
      )}
      onClick={handleOnClickBody}
    >
      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <Badge className="absolute -top-[23px] -left-[1px] rounded-none rounded-t-lg">
            {state.editor.selectedElement.name}
          </Badge>
        )}

      <Card className="h-full bg-black flex flex-col justify-between">
        <CardHeader>
          <div className="w-full h-[220px]">
            <Image
              src={product?.imageUrl || ""}
              alt={product?.name || "no product selected"}
              width={220}
              height={220}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex gap-5 pt-5">
            <CardTitle className="grow p-0">{product?.name}</CardTitle>
            <Badge className="h-min">{product?.seller.companyName}</Badge>
          </div>
        </CardHeader>
        <CardDescription className="">
          <CardContent className="flex flex-col justify-between">
            <div className="line-clamp-2 text-ellipsis">
              {product?.description}
            </div>

            <div className="flex items-center py-2">
              <CardTitle className="grow">${product?.price}</CardTitle>
              <Link
                href={`/shop/products/details/${product?.id}`}
                className={`text-primary underline-offset-4 hover:underline px-0`}
              >
                Details
              </Link>
            </div>
          </CardContent>
        </CardDescription>

        <CardFooter className="flex justify-between">
          <div>
            {/* <ProductQuantityButton product={product} setButton={setaddToCart} /> */}
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

      {state.editor.selectedElement.id === props.element.id &&
        !state.editor.liveMode && (
          <div className="absolute bg-primary px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg !text-white">
            <Trash
              className="cursor-pointer"
              size={16}
              onClick={handleDeleteElement}
            />
          </div>
        )}
    </div>
  );
};

export default ProductComponent;
