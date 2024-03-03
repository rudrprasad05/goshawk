import { VerifyGoogleAccount } from "@/actions/email";
import { GetOnlyCurrentUser, GetUseDataOnly } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await GetOnlyCurrentUser();
  const verify = await VerifyGoogleAccount(user?.id as string);
  if (verify) redirect("/");
  return <div>Loading</div>;
};

export default page;
