import React from "react";
import ProfileCont from "./_components/ProfileCont";
import { GetOnlyCurrentUser } from "@/actions/user";
import { headers } from "next/headers";

const page = async () => {
  const headerList = headers();
  const pathname = headerList.get("urlpath");
  const userId = pathname?.split("/")[pathname?.split("/").length - 2];
  const user = await GetOnlyCurrentUser();

  if (!user) return null;
  return <ProfileCont data={user} />;
};

export default page;
