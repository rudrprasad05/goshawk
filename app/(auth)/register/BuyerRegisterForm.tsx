"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterFormSchema, RegisterFormType } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FiEye, FiEyeOff } from "react-icons/fi";
// import AuthSocialButton from "../login/AuthSocialButton";
import { Icons } from "@/components/Icons";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { RegisterPageProps } from "./page";
import { NextResponse } from "next/server";

const BuyerRegisterForm = (props: RegisterPageProps) => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  // useEffect(() => {
  //   if (session?.status == "authenticated") {
  //     router.push("/");
  //   }
  // }, [session?.status, router]);

  const form = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "USER",
    },
  });

  function onSubmit(data: RegisterFormType) {
    setIsLoading(true);
    data.role = "USER";

    axios
      .post("/api/register", data)
      .then((res) => {
        signIn("credentials", data);
        router.push(`/seller/auth/verify/${res.data.id}`);
      })
      .catch((e: any) => {
        toast("error", {
          description: e,
        });
        console.log(e.request.response);
      })
      .finally(() => setIsLoading(false));
  }

  const socialAction = (action: string) => {
    setIsLoading(true);

    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid", {
            description: "wrong username or password",
          });
        }

        toast("Success", {
          description: "logged in",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container relative flex py-10 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an account
          </h1>

          <Link
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            href="/login"
          >
            Already have an account? Sign-in
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
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
                        autoComplete="off"
                        placeholder="enter email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

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

              {/* <FormField
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
                  <div>{confirmPasswordError}</div>
                </FormItem>
              )}
            /> */}

              <Button className="w-full" type="submit">
                {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
                Register
              </Button>
            </form>
          </Form>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <Link
            href={"/register?type=seller"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Continue as seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyerRegisterForm;
