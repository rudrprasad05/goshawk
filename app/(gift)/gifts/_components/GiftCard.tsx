import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Params = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [type: string]: string | string[] | undefined };
};

const GiftCard = ({
  data,
  props,
}: {
  data: { name: string; link: string };
  props: Params;
}) => {
  const search = props.searchParams.type;
  return (
    <Card className={cn("", search == data.link && "border-primary")}>
      <CardHeader>
        <CardTitle>{data.name}</CardTitle>
      </CardHeader>
      <CardFooter className="text-sm text-muted-foreground">
        <Link href={`?type=${data.link}`}>Select</Link>
      </CardFooter>
    </Card>
  );
};

export default GiftCard;
