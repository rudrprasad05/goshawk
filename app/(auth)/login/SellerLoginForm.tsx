"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
// import AuthSocialButton from "./AuthSocialButton";
import { BsFacebook, BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "sonner";

import { signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { SignInForm, SignInFormType } from "@/schemas/auth";
import Link from "next/link";
import { FaSpinner } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Icons } from "@/components/Icons";
import { ArrowRight } from "lucide-react";
import { LoginPageProps } from "./page";

const SellerLoginForm = (props: LoginPageProps) => {
  const searchParamsType = String(props?.searchParams?.type);
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isSeller = searchParamsType === "seller";
  const isBuyer = searchParamsType === "buyer";

  useEffect(() => {
    if (session?.status == "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const form = useForm<SignInFormType>({
    resolver: zodResolver(SignInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid", {
            description: "Check credentials",
          });
        } else if (callback?.ok) {
          toast("Success", {
            description: "You have logged in",
          });
          toast("", {
            description: "'",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        router.push("/");
      });
  };

  const socialAction = (action: string) => {
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid credentials", {
            description: "'",
          });
        }

        toast("Success", {
          description: "Logged in",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container relative flex py-10 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your Seller account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="seller/auth"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-3"
              >
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
                              if (isPasswordVisible)
                                setIsPasswordVisible(false);
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

                <Button className="w-full" type="submit">
                  {isLoading && <FaSpinner className={"animate-spin mr-3"} />}
                  Login
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
              href={"/login?type=buyer"}
              className={buttonVariants({ variant: "secondary" })}
            >
              Continue as customer
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerLoginForm;
