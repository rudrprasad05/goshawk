"use client";

import { SellerType } from "@/types";
import React from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

import { useRouter } from "next/navigation";

const AdminControlDelete = ({ seller }: { seller: SellerType }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const res = await axios
      .delete(`/api/seller/${seller.id}`)
      .then(() => {
        toast.success("Deleted");
        router.push("/shop");
      })
      .catch((error: any) => console.log(error));
  };
  return (
    <Button variant={"destructive"} onClick={() => handleDelete()}>
      Delete
    </Button>
  );
};

export default AdminControlDelete;
