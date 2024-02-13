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
import { Eye, Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const HideProductButton = ({
  user,
  product,
}: {
  user: UserType;
  product: ProductType;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isVisible = product.isVisible;

  const handleDelete = async () => {
    setLoading(true);
    await axios
      .patch(`/api/product/${product.id}`, { isVisible: !isVisible })
      .then(() => {
        toast.success("Product Updated");
        setLoading(false);
        router.refresh();
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Hide</div>
          <div className="absolute bottom-5 right-5">
            <Eye className="group-hover:h-28 group-hover:w-28 group-hover:stroke-muted-foreground/20 duration-200  w-16 h-16 stroke stroke-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isVisible ? "Hide" : "Show"} product</DialogTitle>
          <DialogDescription>
            This will make the product {isVisible ? "invisible" : "visible"} to
            the users.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant={"destructive"} onClick={() => handleDelete()}>
            {loading && <Loader2 className="mr-3 animate-spin" />}
            {isVisible ? "Hide" : "Show"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
