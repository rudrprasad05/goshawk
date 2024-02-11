"use client";

import { Delete, Pen } from "lucide-react";

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
import { NewProductForm, NewProductType } from "@/schemas/product";
import { AdType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
// import { useState } from "@/types";
import { DeleteAd, VerifyAd } from "@/actions/ad";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import EditAdButton from "./EditAdButton";

const AdControls = ({ ad }: { ad: AdType }) => {
  return (
    <div className="absolute flex gap-3 top-0 right-0">
      <EditAdButton id={ad.id} />
      <DeleteAdButton ad={ad} />
    </div>
  );
};

export const DeleteAdButton = ({ ad }: { ad: AdType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<NewProductType>({
    resolver: zodResolver(NewProductForm),
    defaultValues: {
      name: "",
      description: "",
      price: "",
    },
  });

  async function handleDelete() {
    await DeleteAd(ad.id).then(() => {
      toast.success("Advertisment Deleted succefully");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>
          <Delete />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Ad</DialogTitle>
          <DialogDescription>Delete Advertisment</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant={"destructive"} onClick={() => handleDelete()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const VerifyAdButton = ({ ad }: { ad: AdType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleDelete() {
    await VerifyAd(ad.id).then(() => {
      toast.success("Advertisment Verified succefully");
      setOpen(false);
      router.refresh();
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"default"}>
          <Pen />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Verify Ad</DialogTitle>
          <DialogDescription>
            Undergoing this action will make it visible to all users
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant={"secondary"} onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button variant={"default"} onClick={() => handleDelete()}>
            Verify
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AdControls;
