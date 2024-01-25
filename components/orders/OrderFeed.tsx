"use server";

// import SearchFilter from "./SearchFilter";
import {
  GetMerchantOrderForFeed,
  GetSingleMerchantOrders,
} from "@/actions/orders";
import { Card } from "@/components/ui/card";
import AwaitVerification from "../Admin/AwaitVerification";
import SearchBar from "../Admin/products/SearchBar";
import { Pagination } from "../Admin/products/pagination";
import { OrderFeedCard } from "./OrderFeedCard";
import { Blocks } from "lucide-react";
// import { TagType } from "@/types";
// import { GetAllTags } from "@/actions/tag";

const PAGE_SIZE = 12;

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const OrderFeed = async ({
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

  const { data, metadata } = await GetMerchantOrderForFeed({
    id: id,
    take,
    skip,
    search,
  });

  // const tags = await GetAllTags();

  if (!data) return <div>loading...</div>;

  return (
    <div className="">
      <Card className="w-full flex flex-row items-center px-6 py-3 bg-border">
        <div className="flex flex-row items-center gap-3">
          <Blocks />
          <div className="flex gap-3 items-center text-xl">Orders</div>
        </div>

        <div className="flex gap-3 ml-auto">
          <SearchBar defaultValue={search} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
        {data.map((merchantOrder) => {
          return <OrderFeedCard key={merchantOrder.id} order={merchantOrder} />;
        })}
        {data.length == 0 && <div className="">No Products here</div>}
      </div>
      <Pagination {...props.searchParams} {...metadata} />
    </div>
  );
};
