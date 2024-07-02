"use client";

import Header from "@/components/Admin/Header";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, Upload } from "lucide-react";
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
import { UserDataOnlyType } from "@/types";
import { Textarea } from "@/components/ui/textarea";
import { SendContactEmail, sendEmail } from "@/actions/email";
import { ContactUsTemplate } from "@/components/email/ContactUsTemplate";

const SendEmailSchema = z.object({
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
  message: z
    .string()
    .min(2, { message: "Should have more than 2 characters" })
    .max(1000, { message: "Should have less than 50 characters" }),

  image: z.string().optional(),
});

export type SendEmailSchemaType = z.infer<typeof SendEmailSchema>;

const HelpCont = ({ data }: { data: UserDataOnlyType }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<SendEmailSchemaType>({
    resolver: zodResolver(SendEmailSchema),
    defaultValues: {
      email: data.email,
      name: data.name,
      address: data.address || "",
      town: data.town || "",
      country: data.country || "",
      phone: data.phone || "",
      image: data.image || "",
      message: "",
    },
  });
  const onSubmit = async (data: SendEmailSchemaType) => {
    setIsLoading(true);
    const email = await SendContactEmail(data.message).then((res) => {
      toast.success("Email sent");
      setIsLoading(false);
    });
  };
  return (
    <div>
      <Header showProfile name="Send Us An Email">
        <Send />
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

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      autoComplete="off"
                      rows={10}
                      placeholder="enter message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} className="w-24" type="submit">
              {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
              Send
            </Button>
          </form>
        </Form>
      </main>
    </div>
  );
};

export default HelpCont;
