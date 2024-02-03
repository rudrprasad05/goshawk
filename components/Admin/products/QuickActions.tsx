import React from "react";
import Header from "../Header";
import { Box } from "lucide-react";
import NewProductButton from "../NewProductButton";
import { UserType } from "@/types";
import { GetAllParentWithChildCategories } from "@/actions/category";

const QuickActions = async ({ user }: { user: UserType }) => {
  const categories = await GetAllParentWithChildCategories();

  return (
    <div>
      <Header name="Quick Actions">
        <Box />
      </Header>
      <div className="py-6 grid grid-cols-1 md:grid-cols-4">
        <NewProductButton parentCategories={categories} user={user} />
      </div>
    </div>
  );
};

export default QuickActions;
