import {
  GetAllChildrenCategories,
  GetAllParentCategories,
} from "@/actions/category";
import { useParams } from "next/navigation";
import React from "react";

import ParentCategoryCard from "./ParentCategoryCard";

const ChildCategories = async ({ parent }: { parent: string }) => {
  if (parent == "undefined" || parent == null) return null;
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
