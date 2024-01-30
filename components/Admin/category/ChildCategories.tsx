import {
  GetAllChildrenCategories,
  GetAllParentCategories,
} from "@/actions/category";
import React from "react";
import ParentCategoryCard from "./ParentCategoryCard";
import { useParams } from "next/navigation";

const ChildCategories = async ({ parent }: { parent: string }) => {
  const data = await GetAllChildrenCategories(parent);

  if (data.length == 0)
    return <div className="py-6">No sub categories exist</div>;
  return (
    <div className="grid grid-cols-4 py-6 gap-6">
      {data.map((category) => (
        <ParentCategoryCard selected="" key={category.id} category={category} />
      ))}
    </div>
  );
};

export default ChildCategories;
