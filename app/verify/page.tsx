import { VerifyEmail } from "@/actions/email";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MoveRight } from "lucide-react";

type PageProps = {
  params: { [key: string]: string | string[] | undefined };
  searchParams?: { token: string };
};

const page = async ({ searchParams }: PageProps) => {
  if (!searchParams?.token)
    return (
      <div className="w-full h-[80vh] grid place-items-center">
        <Card className="w-[520px]">
          <CardHeader>
            <h1 className="text-2xl">No token detected</h1>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Ensure you copy pasted the correct link
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  const verify = await VerifyEmail(searchParams?.token);
  if (!verify)
    return (
      <div className="w-full h-[80vh] grid place-items-center">
        <Card className="w-[520px]">
          <CardHeader>
            <h1 className="text-2xl">Invalid token detected</h1>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Ensure you copy pasted the correct link
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    );
  return (
    <div className="w-full h-[80vh] grid place-items-center">
      <Card className="w-[520px]">
        <CardHeader>
          <h1 className="text-2xl">Verified</h1>
        </CardHeader>
        <CardContent>
          <CardDescription>Your account has been verified</CardDescription>
        </CardContent>
        <CardFooter>
          <Link
            className={
              "flex gap-2 items-center text-sm text-primary underline-offset-4 hover:underline"
            }
            href={"/"}
          >
            Home
            <MoveRight className="w-5 h-5" />
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default page;
