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
import { Textarea } from "@/components/ui/textarea";
import { NewProductForm, NewProductType } from "@/schemas/product";
import { CategoryType, ProductType, SubcategoryType, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useState } from "@/types";
import { useEffect, useState } from "react";
import { FieldValue, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { MdHeadset, MdOutlineCheck } from "react-icons/md";

type CategoryTypeLocal = CategoryType & {
  subcategories: SubcategoryType[];
};

const EditProductButton = ({
  user,
  product,
  parentCategories,
}: {
  user: UserType;
  product: ProductType;
  parentCategories: CategoryTypeLocal[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  useEffect(() => {
    parentCategories
      ?.filter((i) => i.id == catState)
      .map((j) => console.log(j.name));
    parentCategories
      ?.filter((i) => i.id == catState)[0]
      .subcategories.map((k) => console.log(k.name));
  }, [catState]);

  const form = useForm<NewProductType>({
    resolver: zodResolver(NewProductForm),
    defaultValues: {
      name: (product.name as string) || "",
      description: (product.description as string) || "",
      price: (product.price as string) || "",
      sellerId: user.seller.id,
      category: product.categoryId as string,
      subcategory: "",
    },
  });

  console.log(form.control._fields.category?._f.value);

  const category = form.watch("category");

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

  function onSubmit(data: NewProductType) {
    if (formReadyToUpload) {
      data.imageUrl = `https://mctechfiji.s3.amazonaws.com/alibaba/${file?.name}`;
    } else {
      data.imageUrl = product.imageUrl;
    }

    data.sellerId = user.seller.id;

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
        toast.error("An Error Occured");
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
            <div className="flex justify-between">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
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
                  <FormItem>
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

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select
                      onValueChange={(e) => {
                        field.onChange;
                        setcatState(e);
                      }}
                      defaultValue={product.categoryId}
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
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      // defaultValue={product.categoryId}
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
            {/* disabled={!formReadyToUpload} */}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductButton;
