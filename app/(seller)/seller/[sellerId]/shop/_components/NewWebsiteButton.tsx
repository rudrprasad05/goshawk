"use client";

import { CreateNewWebsite } from "@/actions/queries";
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
export const NewWebsiteSchema = z.object({
  name: z.string(),
  subDomainName: z.string(),
  favicon: z.string().optional(),
  sellerId: z.string().optional(),
});

export type NewWebsiteType = z.infer<typeof NewWebsiteSchema>;

export const NewWebsiteButton = ({ seller }: { seller: SellerType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [isImageInCloud, setIsImageInCloud] = useState(false);

  const form = useForm<NewWebsiteType>({
    resolver: zodResolver(NewWebsiteSchema),
    defaultValues: {
      name: "",
      subDomainName: "",
      favicon: "",
      sellerId: "",
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

  async function onSubmit(data: NewWebsiteType) {
    data.favicon = imageUrl;
    data.sellerId = seller.id;
    await CreateNewWebsite(data).then((res) => console.log(res));
  }

  console.log(seller);

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
      {!seller.Funnels && (
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

              <FormField
                control={form.control}
                name="subDomainName"
                render={({ field }) => {
                  return (
                    <FormItem className="">
                      <FormLabel>Subdomain Name</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="enter url name. will be shown in url"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <div className="flex gap-3 my-6 items-center">
                <label htmlFor="file" className="cursor-pointer">
                  <div className="items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3">
                    <Upload />
                    <h2 className="text-sm">Upload Image</h2>
                  </div>
                  <input
                    id="file"
                    type="file"
                    name="file"
                    hidden
                    onChange={(e) => {
                      handleImageUpload(e.target.files?.[0] as File);
                    }}
                  />
                </label>

                {imageUpload && (
                  <div>
                    <Loader2 className="animate-spin" />
                  </div>
                )}

                {isImageInCloud && (
                  <div>
                    <Image src={imageUrl} alt="image" width={50} height={50} />
                  </div>
                )}
              </div>

              <Button disabled={!isImageInCloud} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      )}

      {!!seller.Funnels && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Error</DialogTitle>
            <DialogDescription>
              Your current package only allows 1 website per merchant
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      )}
    </Dialog>
  );
};
