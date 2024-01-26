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

import { SellerType } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Megaphone, Presentation } from "lucide-react";
import { useRouter } from "next/navigation";
// import { useState } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { MdOutlineCheck } from "react-icons/md";
import { z } from "zod";
import { Input } from "@/components/ui/input";

const locations = [{ name: "a1" }, { name: "a2" }, { name: "a3" }];

export const NewBillboardSchema = z.object({
  location: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
});

type NewBillboardType = z.infer<typeof NewBillboardSchema>;

const NewBillboard = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [loadingImage, setloadingImage] = useState<boolean>(false);
  const [formReadyToUpload, setFormReadyToUpload] = useState<boolean>(false);

  const form = useForm<NewBillboardType>({
    resolver: zodResolver(NewBillboardSchema),
    defaultValues: {
      location: "",
      name: "",
      description: "",
    },
  });

  const location = form.watch("location");

  function onSubmit(data: NewBillboardType) {
    axios
      .post(`/api/ad/billboard`, data)
      .then((res) => {
        if (res.status == 200) {
          toast.success("Product Created Successfully");
          setOpen(false);
          form.reset();
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
          <div className="font-light text-2xl text-primary">Billboard</div>
          <div className="absolute bottom-5 right-5">
            <Presentation className="group-hover:h-28 group-hover:w-28  duration-200  w-16 h-16 stroke " />
          </div>
          <div className=" text-muted-foreground">New</div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New billboard</DialogTitle>
          <DialogDescription>Create New Billboard</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-11/12"
          >
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>location</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter location"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>name</FormLabel>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>description</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="enter description"
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

export default NewBillboard;
