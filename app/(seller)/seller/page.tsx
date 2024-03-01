import { NavbarUser, getCurrentUser } from "@/actions/user";
import RedirectPage from "@/components/Admin/products/RedirectPage";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const user = await NavbarUser();
  if (!user)
    return (
      <div>
        <RedirectPage />
      </div>
    );

  if (!user.seller)
    return (
      <div>
        <RedirectPage />
      </div>
    );

  redirect(`/seller/${user.seller.id}/dashboard`);
};

export default page;
