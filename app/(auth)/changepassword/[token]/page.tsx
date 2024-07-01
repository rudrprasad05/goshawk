"use client";

import { ChangePassword, CheckChangePasswordToken } from "@/actions/user";
import { UserDataOnlyType, UserType } from "@/types";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
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
import { z } from "zod";
import Pageloader from "@/components/global/Pageloader";
import { signOut } from "next-auth/react";

const page = () => {
  const router = useRouter();
  const params = useParams();
  const [user, setuser] = useState<UserDataOnlyType | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [gettingRes, setGettingRes] = useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const token = params.token;

  const ChangePasswordForm = z
    .object({
      password: z
        .string()
        .min(6, { message: "Password must contain more than 2 characters" })
        .max(32, { message: "Password must have less than 2 characters" }),
      confirmPassword: z.string(),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match",
          path: ["confirmPassword"],
        });
      }
    });
  type ChangePasswordFormType = z.infer<typeof ChangePasswordForm>;

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        // router.push("/");
        return;
      }
      const res = await CheckChangePasswordToken(token as string).then(
        (res) => {
          setuser(res);
          setGettingRes(false);
        }
      );
    };
    checkToken();
  }, [token]);

  const form = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordForm),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ChangePasswordFormType) => {
    setIsLoading(true);
    const res = await ChangePassword(token as string, data.password)
      .then(() => {
        setIsLoading(false);
        toast.success("Password Changed", { description: "Login again" });
        signOut({ callbackUrl: "/login" });
      })
      .catch((e: Error) => {
        toast.error("An Error occured", { description: e.message });
        setIsLoading(false);
      });
  };
  if (gettingRes) return <Pageloader />;
  if (!user) return <>no user</>;
  return (
    <Card className="my-12 max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <FiEyeOff className="stroke-muted-foreground w-5 h-5" />
                        ) : (
                          <FiEye className="stroke-muted-foreground w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isPasswordVisible ? "text" : "password"}
                        autoComplete="off"
                        placeholder="enter password"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (isPasswordVisible) setIsPasswordVisible(false);
                          else setIsPasswordVisible(true);
                        }}
                        className=" h-full aspect-square absolute top-0 right-0 grid place-items-center "
                      >
                        {isPasswordVisible ? (
                          <FiEyeOff className="stroke-muted-foreground w-5 h-5" />
                        ) : (
                          <FiEye className="stroke-muted-foreground w-5 h-5" />
                        )}
                      </button>
                    </div>
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
};

export default page;
