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
import { zodResolver } from "@hookform/resolvers/zod";
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
    router.push(`?search=${data.search}`);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-2 items-center"
      >
        <div className="flex gap-3">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <Input
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
