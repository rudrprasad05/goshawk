"use client";

import { DeleteParentCategory } from "@/actions/category";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CategoryType } from "@/types";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { string } from "zod";

const ParentCategoryCard = ({
  category,
  selected,
}: {
  category: CategoryType;
  selected: string;
}) => {
  const router = useRouter();
  const params = useParams();
  console.log(params.parent);
  return (
    <Card className={cn(selected == category.id && "border border-primary")}>
      <CardHeader>
        <CardTitle>{category.name}</CardTitle>
      </CardHeader>
      <CardFooter className="mt-auto flex justify-between">
        <button
          className="text-primary underline-offset-4 hover:underline"
          onClick={() => router.push(`?parent=${category.id}`)}
        >
          Details
        </button>
        <button
          className="text-rose-500 underline-offset-4 hover:underline"
          onClick={async () => {
            await DeleteParentCategory(category.id);
            toast.success("Category deleted");
          }}
        >
          Delete
        </button>
      </CardFooter>
    </Card>
  );
};

export default ParentCategoryCard;
