import { GetUseDataOnly, getCurrentUser } from "@/actions/user";
import React from "react";
import SideNav from "./SideNav";
import RedirectToSellerAuth from "./RedirectToSellerAuth";

const SideNavServerCont = async () => {
  const user = (await GetUseDataOnly()) || null;
  // if (user?.seller == null) return <RedirectToSellerAuth />;

  return <SideNav user={user} />;
};

export default SideNavServerCont;
