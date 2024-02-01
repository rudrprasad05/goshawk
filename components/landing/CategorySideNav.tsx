import { CategoryType, SubcategoryType } from "@/types";
import Link from "next/link";
import React from "react";

type CategoryTypeLocal = CategoryType & {
  subcategories: SubcategoryType[];
};

const CategorySideNav = ({ category }: { category: CategoryTypeLocal }) => {
  return (
    <div className="mb-1">
      <div className="capitalize">{category.name}</div>
      {category.subcategories.length > 0 && (
        <ul className="border-l ml-3">
          {category.subcategories.map((i) => (
            <li key={i.id} className="flex items-center gap-4">
              <div className="bg-border h-[1px] w-4" />
              <Link href={`/shop/products?search=${i.name}`}>{i.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySideNav;
