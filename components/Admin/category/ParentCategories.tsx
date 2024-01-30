import { GetAllParentCategories } from "@/actions/category";
import React from "react";
import ParentCategoryCard from "./ParentCategoryCard";

const ParentCategories = async ({ selected }: { selected: string }) => {
  const data = await GetAllParentCategories();
  return (
    <div className="grid grid-cols-4 py-6 gap-6">
      {data.map((category) => (
        <ParentCategoryCard
          key={category.id}
          category={category}
          selected={selected}
        />
      ))}
    </div>
  );
};

export default ParentCategories;
