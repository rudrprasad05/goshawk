"use client";

import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { ProductType } from "@/types";
import { useSession } from "next-auth/react";
import { ProductCard } from "../landing/ProductCard";
import Autoplay from "embla-carousel-autoplay";

export default function AdCaro({ products }: { products: ProductType[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const session = useSession();

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
    <Carousel
      className="w-full mx-auto py-6"
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 2000 })]}
    >
      <CarouselContent className="">
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
        {products.map((product, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
