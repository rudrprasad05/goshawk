"use server";

import prisma from "@/lib/prismadb";
import getSession from "./getSession";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

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
  return await prisma.subcategory.findMany({
    where: {
      parentCategoryId: parent,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
