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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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
  const sParams = useSearchParams();
  const sent = sParams.get("sent") as unknown as boolean;

  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordForm),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const res = await GenerateChangePasswordToken(data.email)
      .then(() => {
        setIsLoading(false);
        toast.success("Email Sent");
      })
      .catch((e) => {
        toast.error("An Error occured", { description: e.message });
        setIsLoading(false);
      });
  };
  if (!sent)
    return (
      <Card className="my-12 max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
        <CardContent>
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

              <Button disabled={isLoading} className="w-full" type="submit">
                {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
                Verify
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    );

  return (
    <Card className="my-12 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Check your Email</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Check your inbox for the verification link. Not there? Check your spam
        </CardDescription>
      </CardContent>
      <CardFooter>
        <CardDescription>
          <Link href={`//${form.getValues("email").split("@")[1]}`}>
            open {form.getValues("email").split("@")[1]}
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
