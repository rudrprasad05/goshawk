"use client";

import { CreateNewWebPage, CreateNewWebsite } from "@/actions/queries";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SellerType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { User, Website, WebPages } from "@prisma/client";

export const NewWebsitePageSchema = z.object({
  name: z.string(),
  order: z.number().optional(),
  websiteId: z.string().optional(),
});

type Local = Website & {
  webpages: WebPages[];
};

export type NewWebsitePageType = z.infer<typeof NewWebsitePageSchema>;

export const NewWebPageButton = ({ website }: { website: Local }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);

  const form = useForm<NewWebsitePageType>({
    resolver: zodResolver(NewWebsitePageSchema),
    defaultValues: {
      name: "",
      order: 1,
      websiteId: "",
    },
  });

  const handleImageUpload = async (file: File) => {
    setImageUpload(true);
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setImageUpload(false);
          setImageUrl(
            `https://mctechfiji.s3.amazonaws.com/alibaba/${file?.name}`
          );
          setIsImageInCloud(true);
          toast.success("Image Uploaded to Cloud");
        })
        .catch((e) => {
          toast.error("Error. Contact Site Admin");
        });
      // handle the error
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  async function onSubmit(data: NewWebsitePageType) {
    data.order = 1;
    data.websiteId = website.id;
    await CreateNewWebPage(data).then((res) => console.log(res));
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div
          className={`flex items-center justify-between gap-3   cursor-pointer ${buttonVariants(
            {
              variant: "default",
            }
          )}`}
        >
          <Plus />
          <p>New</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Website</DialogTitle>
          <DialogDescription>Create New Website</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Website Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter website name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
