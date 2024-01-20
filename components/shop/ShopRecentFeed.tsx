"use client";

// import SearchFilter from "./SearchFilter";

import { Card } from "@/components/ui/card";
import { SellerType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";
import { ProductCard } from "../landing/ProductCard";
import { Input } from "../ui/input";

const PAGE_SIZE = 10;

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const ShopRecentFeed = ({
  props,
  user,
}: {
  props: PageProps;
  user: SellerType;
}) => {
  const [search, setSearch] = useState("");
  // const tags = await GetAllTags();

  return (
    <div className="">
      <Card className="w-full flex flex-row px-6 py-3">
        <div className="flex gap-3 items-center text-3xl">
          Browse Collection
        </div>
        <div className="flex gap-3 ml-auto">
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="m-0 px-3 py-2 border border-input rounded-md bg-background hover:bg-accent hover:text-accent-foreground">
            <Search className="h-5 w-5" />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {user.products
          .filter((product) =>
            product.name.toLowerCase().startsWith(search.toLowerCase().trim())
          )
          .map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
      {/* <Pagination {...props.searchParams} {...metadata} /> */}
    </div>
  );
};
