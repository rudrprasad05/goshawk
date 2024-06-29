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
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { FiEye, FiEyeOff } from "react-icons/fi";
import { Icons } from "@/components/Icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { RegisterPageProps } from "./page";

const BuyerRegisterForm = (props: RegisterPageProps) => {
  const session = useSession();
  const params = useParams();
  const login: boolean = params.login as unknown as boolean;
  const isEmailSent: boolean = params.sent as unknown as boolean;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [showConfirmDialogue, setShowConfirmDialogue] = useState(isEmailSent);

  const rerouter = () => {
    if (session?.status == "authenticated") {
      router.push("/");
    }
  };

  useEffect(() => {
    if (login) rerouter();
  }, [params, login, rerouter]);

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
        signIn("credentials", { ...data, redirect: false });
        router.push(`?type=buyer&sent=true`);
      })
      .catch(() => {
        toast("Something went wrong", { description: "Contact site admin" });
      })
      .finally(() => {
        setIsLoading(false);
        setShowConfirmDialogue(true);
      });
  }

  const socialAction = async (action: string) => {
    setIsLoading(true);
    const res = await signIn(action, {
      redirect: true,
    })
      .then((callback) => {
        if (callback?.error) {
          toast("Invalid", {
            description: "wrong username or password",
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
        console.log("first");
      });

    // redirect("/");
  };

  if (showConfirmDialogue) {
    return (
      <div className="w-full h-[80vh] grid place-items-center">
        <Card className="w-[520px]">
          <CardHeader>
            <h1 className="text-2xl">Confirm your account</h1>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Login in to your email and click the link to confirm your email
              inorder to continue further. Dont see the link? Check your spam
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link
              className={"text-primary underline-offset-4 hover:underline"}
              target="_blank"
              href={`//${form.getValues("email").split("@")[1]}`}
            >
              open {form.getValues("email").split("@")[1]}
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container gap-10 h-[90vh]  relative flex py-10 items-center justify-center lg:px-0">
      <div className="grow px-12 flex flex-col justify-center space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Icons.logo className="h-20 w-20" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Create an Buyer Account
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
        </div>
      </div>
      <div className="relative h-full flex items-center justify-center">
        <div
          aria-hidden="true"
          className="absolute top-0 left-1/2 inset-0 flex items-center"
        >
          <span className="h-full w-[1px] bg-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background p-2 text-muted-foreground">or</span>
        </div>
      </div>
      <div className="w-64 flex items-center justify-center px-6 gap-6 flex-col h-full">
        <Button
          onClick={() => socialAction("google")}
          variant={"secondary"}
          className="w-full flex gap-6 items-center justify-start"
        >
          <span>
            <BsGoogle />
          </span>
          <span>Login with google</span>
        </Button>
        <Link
          href={"/register?type=seller"}
          className={`w-full flex gap-6 items-center justify-start ${buttonVariants(
            {
              variant: "secondary",
            }
          )}`}
        >
          <span>
            <ShoppingBag />
          </span>
          <span>Login as Seller</span>
        </Link>
      </div>
    </div>
  );
};

export default BuyerRegisterForm;
