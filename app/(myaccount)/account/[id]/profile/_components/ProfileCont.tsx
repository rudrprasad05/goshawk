"use client";

import Header from "@/components/Admin/Header";
import { UserDataOnlyType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Upload, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

import { SaveUserDetailsProfile } from "@/actions/user";
import AvatarComponent from "@/components/nav/AvatarComponent";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";

const EditProfileSchema = z.object({
  email: z.string().email({ message: "Enter a Valid Email" }),
  name: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  address: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  town: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  country: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
  phone: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),

  image: z.string().optional(),
});
// .superRefine(({ confirmPassword, password }, ctx) => {
//   if (confirmPassword !== password) {
//     ctx.addIssue({
//       code: "custom",
//       message: "The passwords did not match",
//       path: ["confirmPassword"],
//     });
//   }
// });

export type EditProfileSchemaType = z.infer<typeof EditProfileSchema>;

const ProfileCont = ({ data }: { data: UserDataOnlyType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(data.image || "");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [imageUpload, setImageUpload] = useState(false);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const form = useForm<EditProfileSchemaType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      email: data.email,
      name: data.name,
      address: data.address || "",
      town: data.town || "",
      country: data.country || "",
      phone: data.phone || "",
      image: data.image || "",
    },
  });
  const onSubmit = async (data: EditProfileSchemaType) => {
    setIsLoading(true);
    data.image = imageUrl;
    const details = await SaveUserDetailsProfile(data)
      .then((res) => {
        toast.success("Details Updated");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Could not update profile");
        setIsLoading(false);
      });
  };
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
          setImageUrl(
            `https://mctechfiji.s3.amazonaws.com/alibaba/${
              "image" + salt.toString()
            }`
          );
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
  return (
    <div>
      <Header showProfile name="Profile">
        <User />
      </Header>
      <main className="my-5 grid">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        autoComplete="off"
                        placeholder="enter email"
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
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter your address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="town"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Town / City</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter your town / city"
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
                    <FormLabel>Country</FormLabel>
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

            <div className="flex gap-6">
              <div>
                <FormLabel>Logo</FormLabel>
                {imageUrl && <AvatarComponent fallback="AD" src={imageUrl} />}
                {!imageUrl && <AvatarComponent fallback="AD" src={""} />}
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

            <div className="flex items-center gap-5">
              <Button disabled={imageUpload} className="grow" type="submit">
                {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
                Save
              </Button>
              <Link
                className="text-primary underline-offset-4 hover:underline"
                href={"/changepassword"}
              >
                Change Password
              </Link>
            </div>
          </form>
        </Form>
      </main>
    </div>
  );
};

// name                   String
//   address                String?
//   town                   String?
//   country                String?
//   phone                  String?
//   email                  String         @unique
//   emailVerificationToken String?        @unique
//   emailVerified          DateTime?
//   image                  String?
//   hashedPassword         String?

export default ProfileCont;
