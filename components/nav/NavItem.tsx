"use client";

import { PRODUCT_CATEGORIES } from "@/config";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "../MaxWidthWrapper";

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  close: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({
  isAnyOpen,
  category,
  handleOpen,
  close,
  isOpen,
}: NavItemProps) => {
  return (
    <div className="flex hshshs">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={handleOpen}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          onClick={() => close()}
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground bg-card",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div
            className="absolute inset-0 top-1/2 bg-card shadow"
            aria-hidden="true"
          />

          <div className="relative bg-card mb-6">
            <MaxWidthWrapper className="">
              <div className="grid grid-cols-5 pb-6  border-b">
                {category.featured.map((item) => (
                  <div
                    onClick={() => close}
                    key={item.name}
                    className="group p-6 text-center relative text-base sm:text-sm"
                  >
                    <Link href={item.href} className="block font-medium ">
                      {item.name}
                    </Link>
                  </div>
                ))}
              </div>
            </MaxWidthWrapper>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavItem;
