"use server";

import { GetMerchantForFeed } from "@/actions/seller";
import { Card } from "@/components/ui/card";
import SearchBar from "../Admin/products/SearchBar";
import ShopSellerFeedCard from "./ShopSellerFeedCard";

const PAGE_SIZE = 10;

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const ShopSellerFeed = async ({
  props,
}: // user,
{
  props: PageProps;
  // user: UserType;
}) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const search = String(props?.searchParams?.search || "");
  const tag = String(props?.searchParams?.tag || "");
  const tagid = String(props?.searchParams?.tagid || "");

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await GetMerchantForFeed({
    take,
    skip,
    search,
  });

  // const tags = await GetAllTags();

  if (!data) return <div>loadinf</div>;

  return (
    <div className="px-20">
      {/* <div className="flex pb-10 gap-3">
        <h1 className="items-center grow text-3xl text-primary font-bold ">
          Products
        </h1>
        <SearchBar defaultValue={search} />
        {/* <SearchFilter tags={tags} /> 
      </div> */}

      <Card className="w-full flex flex-row px-6 py-3">
        <div className="flex gap-3 items-center text-xl">Browse</div>
        <div className="flex gap-3 ml-auto">
          <SearchBar defaultValue={search} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {data.map((seller) => {
          return <ShopSellerFeedCard key={seller.id} seller={seller} />;
        })}
        {data.length == 0 && <div className="">No Products here</div>}
      </div>
      {/* <Pagination {...props.searchParams} {...metadata} /> */}
    </div>
  );
};
