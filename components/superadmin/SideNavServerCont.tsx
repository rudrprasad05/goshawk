import { GetUseDataOnly, getCurrentUser } from "@/actions/user";
import React from "react";
import SideNav from "./SideNav";
import RedirectToSellerAuth from "../Admin/RedirectToSellerAuth";
import { redirect } from "next/navigation";

const SideNavServerCont = async () => {
  const user = (await GetUseDataOnly()) || null;
  if (user?.seller == null) return <RedirectToSellerAuth />;
  if (user.role != "ADMIN") return redirect("/");

  return <SideNav user={user} />;
};

export default SideNavServerCont;
