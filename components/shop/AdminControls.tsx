import { SellerType } from "@/types";
import React from "react";
import AdminControlDelete from "./AdminControlDelete";

const AdminControls = ({ seller }: { seller: SellerType }) => {
  return (
    <div className="w-full px-20 py-6">
      <h1 className="text-2xl ">Admin Controls</h1>
      <div>
        <AdminControlDelete seller={seller} />
      </div>
    </div>
  );
};

export default AdminControls;
