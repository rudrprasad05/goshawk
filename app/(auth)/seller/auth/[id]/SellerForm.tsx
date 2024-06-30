"use client";

import { CreateSellerAccount } from "@/actions/seller";
import AvatarComponent from "@/components/nav/AvatarComponent";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { SellerRegisterType, SellerRegisterFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Check, Upload } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export const Step2 = ({
  additionalData,
  user,
}: {
  additionalData: { plan: string };
  user: any;
}) => {
  const session = useSession();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const router = useRouter();

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    setImageUpload(true);
    if (!file) return;

    try {
      let data = new FormData();
      data.append("file", file, "image" + salt.toString());

      const res = await fetch("/api/s3-upload", {
        method: "POST",
        body: data,
      })
        .then(() => {
          setImageUpload(false);
          setImageUrl((prev) => [
            ...prev,
            `https://mctechfiji.s3.amazonaws.com/alibaba/${
              "image" + salt.toString()
            }`,
          ]);
          setIsImageInCloud(true);
          setReloadKey((prev) => prev + 1);
          toast.success("Image Uploaded to Cloud");
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

  const form = useForm<SellerRegisterType>({
    resolver: zodResolver(SellerRegisterFormSchema),
    defaultValues: {
      companyName: "",
      address: "",
      city: "",
      country: "",
      phone: "",
      userId: user,
      image: "",
      plan: additionalData.plan || "Personal",
    },
  });

  const onSubmit: SubmitHandler<SellerRegisterType> = async (data) => {
    setIsLoading(true);
    // await handleImageUpload();
    data.plan = additionalData.plan.toUpperCase();
    data.userId = user;
    data.image = imageUrl[imageUrl.length - 1];
    console.log(data);
    const res = await CreateSellerAccount(data)
      .then((res) => {
        setIsLoading(false);
        console.log(res);
        toast.success("Seller account created");
        router.push(`${res.id}/mpaisa`);
      })
      .catch((e: Error) => {
        setIsLoading(false);
        toast.error(e.message);
        console.log(e);
      });
  };
  return (
    <>
      <h1 className=" text-center text-xl font-semibold tracking-tight">
        Fill out your personal details
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter shop name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter phone number"
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
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street address</FormLabel>
                <FormControl>
                  <Input
                    autoComplete="off"
                    placeholder="enter street address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter city name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country Name</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* avatar component */}
          <div className="flex gap-6">
            <div>
              <FormLabel>Logo</FormLabel>
              {imageUrl.length > 0 && (
                <AvatarComponent
                  fallback="AD"
                  src={imageUrl[imageUrl.length - 1]}
                />
              )}
              {imageUrl.length == 0 && (
                <AvatarComponent fallback="AD" src={""} />
              )}
            </div>

            {/* logo image upload */}
            <div className="flex gap-3 my-6 items-center">
              <label
                htmlFor="file"
                className={cn(
                  "cursor-pointer",
                  imageUpload && "opacity-50 cursor-not-allowed"
                )}
              >
                <div className="items-center rounded-md p-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 flex gap-3">
                  <Upload />
                  <h2 className="text-sm">Upload Image</h2>
                </div>
                <input
                  id="file"
                  type="file"
                  name="file"
                  disabled={imageUpload}
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
          </div>

          <Button disabled={imageUpload} className="w-full" type="submit">
            {isLoading && <Loader2 className={"animate-spin mr-3"} />}
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

const ImageArea = ({ onclick }: { onclick: (e: any) => void }) => {
  const handleChange = (e: any) => {
    onclick(e);
  };
  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        <input
          type="file"
          name="file"
          id="dropzone-file"
          className="hidden"
          aria-describedby="file_input_help"
          onChange={(e) => handleChange(e.target.files?.[0])}
        />
      </label>
    </div>
  );
};
