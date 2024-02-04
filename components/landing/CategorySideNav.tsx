"use client";

import { CategoryType, SubcategoryType } from "@/types";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type CategoryTypeLocal = CategoryType & {
  subcategories: SubcategoryType[];
};

const CategorySideNav = ({ category }: { category: CategoryTypeLocal }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (category.subcategories.length > 0)
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
        <div className="flex items-center justify-between space-x-4 px-4 text-md">
          <h4 className="text-sm ">{category.name}</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent className="space-y-2">
          {category.subcategories.map((i) => (
            <div
              key={i.id}
              className="flex items-center pl-6 text-sm text-muted-foreground"
            >
              <Link href={`/shop/products?search=${i.name}`}>{i.name}</Link>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    );
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-2">
      <div className="flex items-center justify-between space-x-4 px-4 text-md">
        <h4 className="text-sm ">{category.name}</h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="opacity-0 w-9 p-0">
            <ChevronsUpDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
    </Collapsible>
  );
};

export default CategorySideNav;
