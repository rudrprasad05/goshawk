"use client";

import Header from "@/components/Admin/Header";
import { ProductCard } from "@/components/landing/ProductCard";
import { UserWithWishlistProducts } from "@/types";
import { Bookmark } from "lucide-react";
import React from "react";

const WishlistCont = ({ data }: { data: UserWithWishlistProducts }) => {
  return (
    <div>
      <Header showProfile name="Wishlist">
        <Bookmark />
      </Header>
      <main className="my-5 grid grid-cols-4">
        {data?.wishlistItems.map((item) => (
          <ProductCard wishlist={data} key={item.id} product={item.product} />
        ))}
      </main>
    </div>
  );
};

export default WishlistCont;
