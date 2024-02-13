import React from "react";
import GiftCard from "./_components/GiftCard";
import Header from "@/components/Admin/Header";
import {
  Cake,
  CakeSlice,
  Candy,
  Flower2,
  Gift,
  Heart,
  MailOpen,
  Truck,
} from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type Params = {
  // params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

const gifts = [
  { name: "birthday", link: "birthday" },
  { name: "special occasion", link: "special" },
  { name: "funeral", link: "funeral" },
  { name: "proposal", link: "proposal" },
  { name: "surprise", link: "surprise" },
];

const page = (props: Params) => {
  console.log(props.searchParams.type);
  return (
    <div>
      <div className="px-20 py-6">
        <Header showProfile={false} name="Select a gift type">
          <Gift />
        </Header>
      </div>

      <main className="grid grid-cols-5 gap-6 px-20">
        {gifts.map((gift) => (
          <GiftCard props={props} data={gift} />
        ))}
      </main>

      <div className="px-20 py-6">
        <Header showProfile={false} name="Select items">
          <Gift />
        </Header>
      </div>

      <section className="px-20 grid grid-cols-5 gap-6">
        {/* <HandleItems props={props} /> */}
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>full cake</span>
            <Cake />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>slice cake</span>
            <CakeSlice />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>letter</span>
            <MailOpen />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>chocolates</span>
            <Candy />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>flowers</span>
            <Flower2 />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>giftcard</span>
            <Heart />
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className={"flex flex-row items-center justify-between"}>
            <span>delivery</span>
            <Truck />
          </CardHeader>
        </Card>
      </section>
    </div>
  );
};

const HandleItems = ({ props }: { props: Params }) => {
  switch (props.searchParams.type) {
    case "birthday":
      return <>birthday</>;
    case "special":
      return <>special</>;
    case "funeral":
      return <>funeral</>;
    case "proposal":
      return <>proposal</>;
    case "surprise":
      return <>surprise</>;
    default:
      return <>Select a gift type</>;
  }
};

export default page;
