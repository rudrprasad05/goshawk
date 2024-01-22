import { getCurrentUser } from "@/actions/user";
import DashboardContent from "@/components/Admin/DashboardContent";
import Header from "@/components/Admin/Header";
import RedirectToSellerAuth from "@/components/Admin/RedirectToSellerAuth";
import { Shield } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  if (!user.seller) return null;

  return (
    <>
      <DashboardContent user={user} />
    </>
  );
};

export default page;
