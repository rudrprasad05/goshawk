"use client";
import React, { useEffect } from "react";
import Header from "../Header";
import { ChevronRight, Layers3 } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { ProductTypeLocal } from "./DetailsPage";
import { cn } from "@/lib/utils";

export const ProductView = ({ product }: { product: ProductTypeLocal }) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current, count]);
  return (
    <div>
      <Header name={product.name}>
        <Layers3 />
      </Header>
      <div className="px-20 py-10 flex gap-20 items-center">
        <div>
          <Carousel
            setApi={setApi}
            className="w-[500px] mx-auto py-6"
            opts={{ align: "start" }}
            // plugins={[Autoplay({ delay: 2000 })]}
          >
            <CarouselContent className="">
              {product.imageUrl.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/1">
                  <div className="w-full h-full">
                    <Image
                      className="object-cover h-full rounded-md"
                      alt={img}
                      width={500}
                      height={500}
                      src={img}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>

          <div className="w-min flex gap-3 mx-auto">
            {[...Array(count)].map((_i, index) => (
              <div
                key={index}
                onClick={() => api.scrollTo(index)}
                className="w-[50px] aspect-square cursor-pointer"
              >
                <div className="w-full h-full">
                  <Image
                    className={cn(
                      "object-cover h-full rounded-md opacity-50 transition",
                      current == index + 1 &&
                        "border-2 border-primary opacity-100"
                    )}
                    alt={product.imageUrl[index]}
                    width={100}
                    height={100}
                    src={product.imageUrl[index]}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grow">
          <div className="flex gap-5">
            <h1 className="mb-5 text-lg text-primary">
              {product.seller.companyName}
            </h1>
            <div>
              <Badge variant={"secondary"}>
                {product.isVisible ? "Visible" : "Hidden"}
              </Badge>
            </div>
          </div>

          <h2 className="text-5xl font-bold capitalize">{product.name}</h2>
          <p className="mt-8 text-muted-foreground flex gap-2">
            {product.parentCategory?.name}
            <ChevronRight />
            {product.category?.name}
          </p>
          <p className="mb-8 text-muted-foreground">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
        </div>
      </div>
    </div>
  );
};
