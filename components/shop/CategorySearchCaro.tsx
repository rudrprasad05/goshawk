"use client";

import { cn } from "@/lib/utils";
import { CategoryType } from "@/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Card } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CategorySearchCaro = ({
  data,
  search,
}: {
  data: CategoryType[];
  search: string;
}) => {
  return (
    <Carousel
      className="w-full mx-auto py-6"
      opts={{ align: "start", loop: true }}
    >
      <CarouselContent className="">
        {data.map((product, index) => (
          <div
            key={index}
            className="w-full flex items-center md:basis-1/6 lg:basis-[15%]"
          >
            <Card
              className={cn(
                "rounded-full mx-auto flex items-center text-sm",
                product.name.includes(search) && "bg-border"
              )}
            >
              <Link
                className="truncate line-clamp-1 px-4 py-2 rounded-md text-center"
                href={`?search=${product.name}`}
              >
                {product.name}
              </Link>
            </Card>
          </div>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default CategorySearchCaro;
