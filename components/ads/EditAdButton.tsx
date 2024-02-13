"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { NewAdSchema, NewAdType } from "@/schemas/ad";
import { SellerType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Megaphone, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";

const EditAdButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  const form = useForm<NewAdType>({
    resolver: zodResolver(NewAdSchema),
    defaultValues: {
      imageUrl: "",
    },
  });

  const handleImageUpload = async () => {
    setloadingImage(true);
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setloadingImage(false);
          setFormReadyToUpload(true);
          toast.success("Image Uploaded to Cloud");
          router.refresh();
        })
        .catch((e) => {
          toast("Something went wrong", { description: "Contact site admin" });
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  function onSubmit(data: NewAdType) {
    data.imageUrl = `https://mctechfiji.s3.amazonaws.com/alibaba/${file?.name}`;
    data.sellerId = id;

    console.log(data);

    axios
      .patch(`/api/ad/${id}`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Product Created Successfully");
          setOpen(false);
          form.reset();
        }
      })
      .catch((error) => {
        toast("Something went wrong", { description: "Contact site admin" });
        console.log("PRODUCT NEW - NewTagButton.tsx", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Ad</DialogTitle>
          <DialogDescription>Edit Ad</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <div className="flex gap-10">
              <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files?.[0])}
              />
              <Button
                className="flex items-center"
                type="button"
                onClick={() => handleImageUpload()}
              >
                {loadingImage && <FaSpinner className={"animate-spin mr-3"} />}
                {!formReadyToUpload && "Upload"}
                {formReadyToUpload && (
                  <>
                    <MdOutlineCheck className={"mr-3"} />
                    Uploaded
                  </>
                )}
              </Button>
            </div>

            <Button disabled={!formReadyToUpload} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditAdButton;
