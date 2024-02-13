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
import { UserType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FaSpinner } from "react-icons/fa";
import { MdHeadset, MdOutlineCheck } from "react-icons/md";
import { z } from "zod";

const Schema = z.object({
  name: z
    .string()
    .min(2, "Minimum length of 2 characters")
    .max(32, "Minimum length of 2 characters"),
});

type SchemaType = z.infer<typeof Schema>;

const NewCategoryButton = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(data: SchemaType) {
    axios
      .post(`/api/category`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("category Created Successfully");
          setOpen(false);
          form.reset();
          router.refresh();
        }
      })
      .catch((error) => {
        toast("Something went wrong", { description: "Contact site admin" });
        console.log("category NEW - NewTagButton.tsx", error);
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="bg-border duration-100 group group-hover:border-primary border rounded-md shadow-sm h-48 relative p-5 border-primary/20 hover:border-primary hover:cursor-pointer">
          <div className="font-light text-2xl text-primary">Category</div>
          <div className="absolute bottom-5 right-5">
            <Tag className="group-hover:h-28 group-hover:w-28 group-hover:stroke-muted-foreground duration-200  w-16 h-16 stroke" />
            {/* <IoPersonAddOutline className="group-hover:stroke-primary w-16 h-16 stroke stroke-muted-foreground" /> */}
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Category</DialogTitle>
          <DialogDescription>Create New Category</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Category Name</FormLabel>
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

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCategoryButton;
