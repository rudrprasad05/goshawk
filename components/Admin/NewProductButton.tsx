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
import { CategoryType, SubcategoryType, UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValue, useForm } from "react-hook-form";
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { MdHeadset, MdOutlineCheck } from "react-icons/md";
import { Loader2, Upload, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  closestCorners,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableImage from "./DraggableImage";

type CategoryTypeLocal = CategoryType & {
  subcategories: SubcategoryType[];
};

const NewProductButton = ({
  user,
  parentCategories,
}: {
  user: UserType;
  parentCategories: CategoryTypeLocal[];
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [catState, setcatState] = useState<FieldValue<String>>();
  const [imageUpload, setImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState<string[]>([]);
  const [isImageInCloud, setIsImageInCloud] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const form = useForm<NewProductType>({
    resolver: zodResolver(NewProductForm),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      sellerId: user.seller.id,
      subcategory: null,
      category: null,
    },
  });
  const category = form.watch("category");
  const subcategory = form.watch("subcategory");

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
    data.sellerId = user.seller.id;
    data.category = catState;

    console.log(data);

    axios
      .post(`/api/product`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Product Created Successfully");
          setOpen(false);
          form.reset();
          setImageUrl([]);
          setIsImageInCloud(false);
          router.refresh();
        }
      })
      .catch((error) => {
        toast("Something went wrong", { description: "Contact site admin" });
        console.log("PRODUCT NEW - NewTagButton.tsx", error);
      });
  }
  const getTaskPos = (id: any) => imageUrl.findIndex((task) => task === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(active, over);

    if (active.id === over?.id) return;

    setImageUrl((tasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over?.id);

      return arrayMove(tasks, originalPos, newPos);
    });

    setActiveId(null);
  };

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Product</div>
          <div className="absolute bottom-5 right-5">
            <MdHeadset className="group-hover:h-28 group-hover:w-28 group-hover:fill-muted-foreground/20 duration-200  w-16 h-16 stroke fill-muted-foreground" />
            {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-[720px]">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Create New Product</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <div className="grid gap-3 grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="enter product name"
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

            <div className="grid grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={(e) => {
                          field.onChange;
                          setcatState(e);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a Category" />
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
                    <FormItem className="w-full">
                      <FormLabel>Subcategory</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subcategory" />
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

              {isImageInCloud && (
                <div className="flex justify-between grow items-center">
                  <DndContext
                    // sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                  >
                    <div className="flex gap-2 items-center">
                      <SortableContext
                        items={imageUrl.map((item) => item)}
                        strategy={horizontalListSortingStrategy}
                      >
                        {imageUrl?.map((img, i) => (
                          <DraggableImage key={i} img={img} id={img} />
                        ))}
                      </SortableContext>
                      {/* <DragOverlay>
                        {activeId ? (
                          <div className="w-12 h-12 bg-slate-400 rounded-md">
                            img
                          </div>
                        ) : null}
                      </DragOverlay> */}
                    </div>
                  </DndContext>
                  <p className="italic h-min text-sm text-muted-foreground">
                    Drag to sort around
                  </p>
                </div>
              )}
            </div>

            <Button disabled={!!""} type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewProductButton;
