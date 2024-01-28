"use server";

// import SearchFilter from "./SearchFilter";
import {
  GetAllProductsPagination,
  GetSingleMerchantProducts,
} from "@/actions/products";
import { Card } from "@/components/ui/card";
import AwaitVerification from "../Admin/AwaitVerification";
import SearchBar from "../Admin/products/SearchBar";
import { SiteProductCard } from "../Admin/products/SiteProductCard";
import { Pagination } from "../Admin/products/pagination";
import { ProductCard } from "../landing/ProductCard";
// import { TagType } from "@/types";
// import { GetAllTags } from "@/actions/tag";

const PAGE_SIZE = 12;

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

export const ProductFeed = async ({ props }: { props: PageProps }) => {
  const pageNumber = Number(props?.searchParams?.page || 1);
  const search = String(props?.searchParams?.search || "");
  const tag = String(props?.searchParams?.tag || "");
  const tagid = String(props?.searchParams?.tagid || "");

  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;

  const { data, metadata } = await GetAllProductsPagination({
    take,
    skip,
    search,
  });

  return (
    <div className="px-20 py-8">
      <Card className="w-full flex flex-row px-6 py-3 bg-border">
        <div className="flex gap-3 items-center text-xl">Products</div>
        <div className="flex gap-3 ml-auto">
          <SearchBar defaultValue={search} />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {!data && <>Loading</>}
        {data.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
        {data.length == 0 && <div className="">No Products here</div>}
      </div>
      <Pagination {...props.searchParams} {...metadata} />
    </div>
  );
};
