import { getCurrentUser } from "@/actions/user";
import QuickActions from "@/components/Admin/products/QuickActions";
import { OrderFeed } from "@/components/orders/OrderFeed";
import React from "react";

export type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { [key: string]: string | string[] | undefined };
};

const page = async (props: PageProps) => {
  const user = await getCurrentUser();
  if (!user) return null;
  return (
    <div className="p-6">
      <OrderFeed user={user} props={props} />
    </div>
  );
};

export default page;
