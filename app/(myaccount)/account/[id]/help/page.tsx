import React from "react";
import HelpCont from "./_components/HelpCont";
import { headers } from "next/headers";
import { GetOnlyCurrentUser } from "@/actions/user";

const Page = async () => {
  const headerList = headers();
  const pathname = headerList.get("urlpath");
  const userId = pathname?.split("/")[pathname?.split("/").length - 2];
  const user = await GetOnlyCurrentUser();

  if (!user) return null;

  return <HelpCont data={user} />;
};

export default Page;
