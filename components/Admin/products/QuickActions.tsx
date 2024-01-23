"use client";

import React from "react";
import Header from "../Header";
import { Box } from "lucide-react";
import NewProductButton from "../NewProductButton";
import { UserType } from "@/types";

const QuickActions = ({ user }: { user: UserType }) => {
  return (
    <div>
      <Header name="Quick Actions">
        <Box />
      </Header>
      <div className="py-6 grid grid-cols-1 md:grid-cols-4">
        <NewProductButton user={user} />
      </div>
    </div>
  );
};

export default QuickActions;
