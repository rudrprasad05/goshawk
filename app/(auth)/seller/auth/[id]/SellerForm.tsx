"use client";

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
import { SellerRegisterType, SellerRegisterFormSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);
  const [imageLink, setimageLink] = useState("");
  const router = useRouter();

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
          console.log(res);
        })
        .catch((e) => {});
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
    await handleImageUpload();
    data.plan = additionalData.plan;
    data.userId = user;
    data.image = `https://mctechfiji.s3.amazonaws.com/alibaba/${file?.name}`;
    console.log(data);
    const res = await axios
      .post("/api/register/seller", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => {
        router.push(`/seller/${res.id}/dashboard`);
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

          <div className="">
            <div>
              <FormLabel>Logo</FormLabel>
              <AvatarComponent fallback="AD" src={session.data?.user.image} />
            </div>

            <ImageArea onclick={setFile} />
            {/* <Button
                className="flex items-center"
                type="button"
                onClick={() => handleImageUpload()}
              >
                {loadingImage && <Loader2 className={"animate-spin mr-3"} />}
                {!formReadyToUpload && "Upload"}
                {formReadyToUpload && (
                  <>
                    <Check className={"mr-3"} />
                    Uploaded
                  </>
                )}
              </Button> */}
          </div>

          <Button className="w-full" type="submit">
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
