import React from "react";
import { Website, WebPages } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { GetWebPages } from "@/actions/queries";

type Local = Website & {
  webpages: WebPages[];
};

const DisplayWebpages = async ({ websites }: { websites: Local }) => {
  if (websites.webpages.length == 0)
    return (
      <Card className="border-dotted">
        <CardContent className="py-6">
          <CardDescription>
            No websites to display. Create one now
          </CardDescription>
        </CardContent>
      </Card>
    );
  return (
    <>
      <Card className="flex-row">
        <CardHeader className="flex-row items-center gap-3">
          <h1 className="text-xl">{websites.webpages[0].name}</h1>
        </CardHeader>
        <CardFooter>
          <Link
            prefetch={false}
            href={`/seller/${websites.sellerId}/shop/${websites.id}/editor/${websites.webpages[0].id}`}
          >
            Edit
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default DisplayWebpages;
