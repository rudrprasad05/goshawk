import { PRODUCT_CATEGORIES } from "@/config";
import { CartContext } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { ProductType } from "@/types";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

const CartItem = ({ product }: { product: ProductType }) => {
  const { removeCart } = useContext(CartContext);

  // const label = PRODUCT_CATEGORIES.find(
  //   ({ value }) => value === product.category
  // )?.label

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="absolute object-cover"
            />
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="line-clamp-1 text-xs capitalize text-muted-foreground">
              {product.name}
            </span>

            <div className="mt-4 text-xs text-muted-foreground">
              <button
                onClick={() => removeCart(product, false)}
                className="flex items-center gap-0.5"
              >
                <X className="w-3 h-4" />
                Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium mr-6">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
