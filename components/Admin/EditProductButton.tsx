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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NewProductForm, NewProductType } from "@/schemas/product";
import {
  CategoryType,
  ProductType,
  SellerType,
  SubcategoryType,
  UserType,
} from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useState } from "@/types";
import { useEffect, useState } from "react";
import { FieldValue, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import Image from "next/image";

type CategoryTypeLocal = CategoryType & {
  subcategories: SubcategoryType[];
};

export type ProductTypeLocal = ProductType & {
  seller: SellerType;
  category: SubcategoryType;
  parentCategory: CategoryType;
};

const EditProductButton = ({
  product,
  parentCategories,
}: {
  product: ProductTypeLocal;
  parentCategories: CategoryTypeLocal[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>(
    product.parentCategoryId
  );
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>(product.imageUrl);
  const [isImageInCloud, setIsImageInCloud] = useState(false);

  const form = useForm<NewProductType>({
    resolver: zodResolver(NewProductForm),
    defaultValues: {
      name: (product.name as string) || "",
      description: (product.description as string) || "",
      price: (product.price as string) || "",
      subcategory: (product.categoryId as string) || null,
      category: product.parentCategoryId || null,
    },
  });

  const category = form.watch("category");
  const subcategory = form.watch("subcategory");

  const handleImageUpload = async (file: File) => {
    const salt = Date.now();
    console.log(salt.toString() + file.name);
    setImageUpload(true);

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

  function onSubmit(data: NewProductType) {
    data.imageUrl = imageUrl;
    data.category = catState;

    axios
      .patch(`/api/product/${product.id}`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Product Created Successfully");
          setOpen(false);
          router.refresh();
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
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Edit</div>
          <div className="absolute bottom-5 right-5">
            <Pencil className="group-hover:h-28 group-hover:w-28 group-hover:stroke-muted-foreground/20 duration-200  w-16 h-16 stroke stroke-muted-foreground" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Change the details of your product
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grow">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter tag name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-24">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        autoComplete="off"
                        placeholder="enter product price"
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
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      placeholder="enter product description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem className="grow">
                      <FormLabel>Parent Category</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange;
                          setcatState(e);
                          console.log(e);
                        }}
                        defaultValue={product.parentCategoryId as string}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tag" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {parentCategories?.map((i) => (
                            <SelectItem key={i.id} value={i?.id}>
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
                name="subcategory"
                render={({ field }) => {
                  return (
                    <FormItem className="grow">
                      <FormLabel>Sub Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={product.categoryId as string}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tag" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {parentCategories
                            ?.filter((i) => i.id == catState)
                            .map((j) =>
                              j.subcategories.map((k) => (
                                <SelectItem key={k.id} value={k?.id}>
                                  {k.name}
                                </SelectItem>
                              ))
                            )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

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

              <div className="flex gap-2">
                {imageUrl &&
                  imageUrl.map((img) => (
                    <div key={img} className="relative aspect-square h-[50px]">
                      <Image
                        className="rounded-md h-full object-cover"
                        src={img}
                        alt="image"
                        width={50}
                        height={50}
                      />
                      <button
                        onClick={() =>
                          setImageUrl((prev) => {
                            return prev.filter((i) => i != img);
                          })
                        }
                        className="p-[4px] absolute top-[-10px] right-[-10px] bg-rose-500 rounded-full"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductButton;
