import { getCurrentUser } from "@/actions/user";
import DashboardContent from "@/components/Admin/DashboardContent";
import Header from "@/components/Admin/Header";
import { Shield } from "lucide-react";
import React from "react";

const page = async () => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <>
      <DashboardContent user={user} />
    </>
  );
};

export default page;
