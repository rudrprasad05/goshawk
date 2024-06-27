"use server";

import { GetOnlyCurrentUser } from "@/actions/user";
import React from "react";
import OrderSection from "./_components/OrderSection";
import { redirect } from "next/navigation";

const page = async () => {
  const user = await GetOnlyCurrentUser();
  if (!user) redirect("/login");

  return <OrderSection id={user?.id} />;
};

export default page;
