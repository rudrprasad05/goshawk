"use server";

import { UserType } from "@/types";
import { Shield } from "lucide-react";
import React from "react";

import Header from "./Header";
import NewProductButton from "./NewProductButton";
import OrderCount from "./OrderCount";
import ProductCount from "./ProductCount";

const DashboardContent = ({ user }: { user: any }) => {
  return (
    <>
      <div className="flex flex-col gap-6">
        <Header name="Dashboard">
          <Shield />
        </Header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <NewProductButton user={user} />
          <NewProductButton user={user} />
          <NewProductButton user={user} />
          <NewProductButton user={user} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <OrderCount />
          <ProductCount user={user} />
        </div>
      </div>
    </>
  );
};

export default DashboardContent;
