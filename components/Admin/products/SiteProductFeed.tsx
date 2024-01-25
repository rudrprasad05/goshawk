"use server";

import React from "react";
import { revalidatePath } from "next/cache";
import { string } from "zod";
import SearchBar from "./SearchBar";
// import SearchFilter from "./SearchFilter";
import {
  GetAllProductsPagination,
  GetSingleMerchantProducts,
} from "@/actions/products";
import { SiteProductCard } from "./SiteProductCard";
import { Pagination } from "./pagination";
import { Card } from "@/components/ui/card";
import EditProfileSheet from "@/components/nav/EditProfileSheet";
import AvatarComponent from "@/components/nav/AvatarComponent";
import { UserType } from "@/types";
import AwaitVerification from "../AwaitVerification";
// import { TagType } from "@/types";
// import { GetAllTags } from "@/actions/tag";

const PAGE_SIZE = 10;

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const Feed = async ({
  props,
  user,
}: {
  props: PageProps;
  user: any;
}) => {
  if (!user.seller.isVerified) {
    return <AwaitVerification />;
  }

  const pageNumber = Number(props?.searchParams?.page || 1);
  const id = user.seller.id;
  const search = String(props?.searchParams?.search || "");
  const tag = String(props?.searchParams?.tag || "");
  const tagid = String(props?.searchParams?.tagid || "");

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await GetSingleMerchantProducts({
    id: id,
    take,
    skip,
    search,
  });

  // const tags = await GetAllTags();

  if (!data) return <div>loading...</div>;

  return (
    <div className="">
      {/* <div className="flex pb-10 gap-3">
        <h1 className="items-center grow text-3xl text-primary font-bold ">
          Products
        </h1>
        <SearchBar defaultValue={search} />
        {/* <SearchFilter tags={tags} /> 
      </div> */}

      <Card className="w-full flex flex-row px-6 py-3 bg-border">
        <div className="flex gap-3 items-center text-xl">Products</div>
        <div className="flex gap-3 ml-auto">
          <SearchBar defaultValue={search} />

          {/* <div className="text-right">
            <p className="font-bold text-lg">{user?.name}</p>
            <p className="text-sm">Merchant</p>
          </div> */}
          {/* <EditProfileSheet user={user}>
            <AvatarComponent
              fallback={user?.name?.slice(0, 2).toUpperCase() || "AD"}
              src={user?.image}
            />
          </EditProfileSheet> */}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {data.map((product) => {
          return <SiteProductCard key={product.id} product={product} />;
        })}
        {data.length == 0 && <div className="">No Products here</div>}
      </div>
      <Pagination {...props.searchParams} {...metadata} />
    </div>
  );
};
