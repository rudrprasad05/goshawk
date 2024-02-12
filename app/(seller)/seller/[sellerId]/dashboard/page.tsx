import {
  GetAllParentCategories,
  GetAllParentWithChildCategories,
} from "@/actions/category";
import { getCurrentUser } from "@/actions/user";
import DashboardContent from "@/components/Admin/DashboardContent";
import Header from "@/components/Admin/Header";
import RedirectToSellerAuth from "@/components/Admin/RedirectToSellerAuth";
import { Shield } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  const categories = await GetAllParentWithChildCategories();
  return (
    <>
      <DashboardContent parentCategories={categories} user={user} />
    </>
  );
};

export default page;
