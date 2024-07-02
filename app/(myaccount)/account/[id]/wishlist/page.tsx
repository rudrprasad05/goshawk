import React from "react";
import { headers } from "next/headers";
import { GetCurrentUserWithWishlistAndProducts } from "@/actions/wishlist";
import WishlistCont from "./_components/WishlistCont";

const page = async () => {
  const headerList = headers();
  const pathname = headerList.get("urlpath");
  const userId = pathname?.split("/")[pathname?.split("/").length - 2];

  if (!userId) return "Invalid Url";
  const user = await GetCurrentUserWithWishlistAndProducts(userId);

  if (!user) return null;

  return <WishlistCont data={user} />;
};

export default page;
