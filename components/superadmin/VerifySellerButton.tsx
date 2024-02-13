"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SellerType, UserType } from "@/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const VerifySellerButton = ({ user }: { user: SellerType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleVerify = async () => {
    axios
      .patch(`/api/seller/${user.id}`, { isVerified: true })
      .then(() => {
        toast.success("Verified");
        setOpen(false);
      })
      .catch((error: any) => console.log(error));
  };

  const handleDelete = async () => {
    axios
      .delete(`/api/seller/${user.id}`)
      .then(() => {
        toast.success("Deleted");
        setOpen(false);
        router.refresh();
      })
      .catch((error: any) => console.log(error));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="text-primary underline-offset-4 hover:underline cursor-pointer">
          Details
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Seller</DialogTitle>
          <DialogDescription>
            Allow this merchant account to sell on yoru platform
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => handleVerify()}>Verify</Button>
          <Button onClick={() => handleDelete()} variant={"destructive"}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerifySellerButton;
