import React from "react";
import { Website } from "@prisma/client";
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

const DisplayWebsites = async ({ websites }: { websites: Website }) => {
  if (websites == null)
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
          <div>
            <Image
              src={websites.favicon || ""}
              alt="website favicon"
              height={50}
              width={50}
            />
          </div>
          <h1 className="text-xl">{websites.name}</h1>
        </CardHeader>
        <CardFooter>
          <Link prefetch={false} href={`shop/${websites.id}`}>
            Edit
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default DisplayWebsites;
