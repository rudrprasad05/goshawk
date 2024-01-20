import { GetUseDataOnly, getCurrentUser } from "@/actions/user";
import React from "react";
import SideNav from "./SideNav";

const SideNavServerCont = async () => {
  const user = await GetUseDataOnly();
  if (!user) return null;

  return <SideNav user={user} />;
};

export default SideNavServerCont;
