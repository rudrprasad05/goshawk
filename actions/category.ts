"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";
import { NextResponse } from "next/server";

export const GetAllParentCategories = async () => {
  return await prisma.category.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const GetAllParentWithChildCategories = async () => {
  return await prisma.category.findMany({
    include: {
      subcategories: true,
    },
  });
};

export const GetAllChildrenCategories = async (parent: string) => {
  console.log(typeof parent);
  if (parent.length == 0 || parent == "undefined")
    return new NextResponse("error", { status: 500 });
  return await prisma.subcategory.findMany({
    where: {
      parentCategoryId: parent,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
