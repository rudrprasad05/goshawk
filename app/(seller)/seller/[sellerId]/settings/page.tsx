import Header from "@/components/Admin/Header";
import { Cog } from "lucide-react";
import React, { Suspense } from "react";
import UserForm from "./_components/UserForm";
import ShopForm from "./_components/ShopForm";
import { NavbarUser } from "@/actions/user";
import { UserType } from "@/types";
import LoadingPage from "@/components/global/loading-page";

const page = async () => {
  const user = await NavbarUser();
  return (
    <div className="p-6">
      <Header showProfile name="Settings">
        <Cog />
      </Header>
      <HandleLoading user={user} />
    </div>
  );
};
const HandleLoading = ({ user }: { user: UserType }) => {
  if (!user) return <LoadingPage />;
  return (
    <>
      <UserForm user={user} />
      <ShopForm user={user} />
    </>
  );
};

export default page;
