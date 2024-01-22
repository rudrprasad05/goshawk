import { GetSellerByName } from "@/actions/seller";
import { getCurrentUser } from "@/actions/user";
import AdminControls from "@/components/shop/AdminControls";
import ShopPage from "@/components/shop/ShopPage";
import React from "react";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const { companyName } = props.params;
  const seller = await GetSellerByName(companyName as string);
  const currentUser = await getCurrentUser();

  return (
    <div>
      {currentUser?.role == "admin" && <AdminControls seller={seller} />}
      <ShopPage seller={seller} />
    </div>
  );
};

export default page;
