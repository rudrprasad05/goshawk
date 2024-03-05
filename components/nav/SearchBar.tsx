"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductSearchSchema, ProductSearchType } from "@/schemas/product";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { MdOutlineSearch } from "react-icons/md";

type props = {
  defaultValue?: string;
};

const SearchBar: React.FC<props> = ({ defaultValue }) => {
  const router = useRouter();
  const form = useForm<ProductSearchType>({
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: {
      search: defaultValue || "",
    },
  });
  function onSubmit(data: ProductSearchType) {
    router.push(`/shop/products?search=${data.search}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        className="flex gap-2 items-center w-full"
      >
        <div className="flex gap-3  w-full">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className=" w-full">
                <FormControl>
                  <Input
                    className=" w-full"
                    type="text"
                    autoComplete="off"
                    placeholder="Search..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="m-0 px-3 py-2" variant={"outline"}>
          <MdOutlineSearch />
        </Button>
      </form>
    </Form>
  );
};

export default SearchBar;
