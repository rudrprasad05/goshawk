"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaSpinner } from "react-icons/fa";
import { FiEyeOff, FiEye } from "react-icons/fi";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GenerateChangePasswordToken } from "@/actions/user";
import { toast } from "sonner";

export const ChangePasswordForm = z.object({
  email: z
    .string()
    .email("This is not a valid email.")
    .min(2, { message: "Should have more than 2 characters" })
    .max(50, { message: "Should have less than 50 characters" }),
});
export type ChangePasswordFormType = z.infer<typeof ChangePasswordForm>;

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordForm),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await GenerateChangePasswordToken(data.email).then(() => {
      setIsLoading(false);
      toast.success("Email Sent");
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder="enter email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit">
          {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
          Login
        </Button>
      </form>
    </Form>
  );
};

export default ChangePassword;
