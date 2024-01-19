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
import { ProductType, UserType } from "@/types";
import axios from "axios";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

// interface props {
//   tags: TagType[];
// }
// TODO make sure the image name is unique by appending date to the end if not previous image will be deleted
export const DeleteProductButton = ({
  user,
  product,
}: {
  user: UserType;
  product: ProductType;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await axios.delete(`/api/product/${product.id}`).then(() => {
      toast.success("Product Deleted");
      setLoading(false);
      router.back();
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Delete</div>
          <div className="absolute bottom-5 right-5">
            <Trash2 className="group-hover:h-28 group-hover:w-28 group-hover:stroke-muted-foreground/20 duration-200  w-16 h-16 stroke stroke-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            This action can not be reversed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={() => handleDelete()}>
            {loading && <Loader2 className="mr-3 animate-spin" />}
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
