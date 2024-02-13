"use client";

import Header from "@/components/Admin/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { Loader2, Upload, Wrench } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { z } from "zod";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PersonalDetails from "./PersonalDetails";
import { DEVICE_TYPE } from "./DeviceType";
import Image from "next/image";

const RepairOrderSchema = z.object({
  userId: z.string().optional(),
  type: z.string().optional(), // select
  description: z
    .string()
    .min(2, { message: "must contain more than 2 characters" })
    .max(256, { message: "must have less than 2 characters" }),
  model: z
    .string()
    .min(2, { message: "must contain more than 2 characters" })
    .max(256, { message: "must have less than 2 characters" }),
  imageUrl: z.string().optional(),
});

type RepairOderType = z.infer<typeof RepairOrderSchema>;

const RepairsForm = () => {
  const [loading, setLoading] = useState(false);
  const [typeState, setTypeState] = useState("");

  const [domLoaded, setDomLoaded] = useState(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const session = useSession();
  const user = session.data?.user;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const form = useForm<RepairOderType>({
    resolver: zodResolver(RepairOrderSchema),
    defaultValues: {
      userId: user?.id,
      type: "",
      model: "",
      description: "",
      imageUrl: "",
    },
  });

  const type = form.watch("type");

  function onSubmit(data: RepairOderType) {
    data.userId = user?.id;
    data.type = typeState;
    data.imageUrl = imageUrl;
    axios
      .post(`/api/repair`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Repair Order Sent Successfully");
          form.reset();
          router.refresh();
          setImageUrl("");
          setIsImageInCloud(false);
        }
      })
      .catch((error) => {
        toast("Something went wrong", { description: "Contact site admin" });
        console.log("PRODUCT NEW - NewTagButton.tsx", error);
      });
  }

  const handleImageUpload = async (file: File) => {
    if (!file) return;
    setImageUpload(true);

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          toast.success("Image Uploaded to Cloud");
          setImageUpload(false);
          setImageUrl(
            `https://mctechfiji.s3.amazonaws.com/alibaba/${file?.name}`
          );
          setIsImageInCloud(true);
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

  return (
    <div className="px-20">
      <Header name="Repairs" showProfile={false}>
        <Wrench />
      </Header>
      {domLoaded && <PersonalDetails />}
      <Card className="my-6">
        <CardHeader>
          <CardTitle>Fill to receive a quote</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-11/12"
            >
              <div className="flex gap-6">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => {
                    return (
                      <FormItem className="grow">
                        <FormLabel>Select type of repair</FormLabel>
                        <Select
                          onValueChange={(e) => {
                            field.onChange;
                            setTypeState(e);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {DEVICE_TYPE.map((i) => (
                              <SelectItem key={i.name} value={i.name}>
                                {i.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="model"
                  render={({ field }) => (
                    <FormItem className="grow">
                      <FormLabel>Product model</FormLabel>
                      <FormControl>
                        <Input
                          autoComplete="off"
                          placeholder="enter product model. Eg. samusng s23"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Describe the issue</FormLabel>
                    <FormControl>
                      <Textarea
                        autoComplete="off"
                        placeholder="whats wrong, how old is the device, 2nd hand"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
              </div>

              <Button disabled={!isImageInCloud} type="submit">
                Submit
              </Button>
            </form>
          </Form>

          {isImageInCloud && (
            <div>
              <Image alt="image" width={200} height={200} src={imageUrl} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RepairsForm;
