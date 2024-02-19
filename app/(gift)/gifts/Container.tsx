"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Admin/Header";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Cake,
  CakeSlice,
  Candy,
  Cross,
  DollarSign,
  Flower2,
  Gift,
  Heart,
  MailOpen,
  Truck,
  X,
} from "lucide-react";

import GiftCard from "./_components/GiftCard";
import { redirect, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Gloock } from "next/font/google";
import AnimationPlayer from "./_components/AnimationPlayer";
import { setGlobal } from "next/dist/trace";
import { SubmitGiftOrder } from "@/actions/queries";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

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

const Container = ({ props }: { props: Params }) => {
  const search = props.searchParams.type;
  const router = useRouter();
  const session = useSession();

  if (session.status != "authenticated") {
    toast("Login first", {
      description: "To purchase a gift, login or create an account",
    });
    return redirect("/login");
  }

  const [fullCake, setFullCake] = useState<string[]>([]);
  const [sliceCake, setSliceCake] = useState<string[]>([]);
  const [letter, setLetter] = useState<string[]>([]);
  const [chocolates, setChocolates] = useState<string[]>([]);
  const [flowers, setFlowers] = useState<string[]>([]);
  const [giftcard, setGiftcard] = useState<string[]>([]);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [coffin, setCoffin] = useState<boolean>(false);
  const [global, setGlobal] = useState<string[]>([]);

  useEffect(() => {
    resetUseState();
  }, [props.searchParams.type]);

  const resetUseState = () => {
    setFullCake([]);
    setSliceCake([]);
    setLetter([]);
    setChocolates([]);
    setFlowers([]);
    setGiftcard([]);
    setDelivery(false);
    setCoffin(false);
    setGlobal([]);
  };
  // TODO change the price; depending on requirements.

  const sendOrder = async () => {
    const data = {
      type: search,
      chocolates: chocolates.length,
      fullCake: fullCake.length,
      sliceCake: sliceCake.length,
      letter: letter.length,
      flowers: flowers.length,
      giftcard: giftcard.length,
      coffin: coffin,
      delivery: delivery,
      price: 0,
      userId: session.data?.user.id,
    };

    const res = await SubmitGiftOrder(data);
    console.log(res);
  };

  return (
    <div>
      <div className="px-20 py-6">
        <Header showProfile={false} name="Select a gift type">
          <Gift />
        </Header>
      </div>

      <main className="grid grid-cols-5 gap-6 px-20">
        {gifts.map((gift) => (
          <GiftCard key={gift.name} props={props} data={gift} />
        ))}
      </main>

      <div className="px-20 py-6">
        <Header showProfile={false} name="Select items">
          <Gift />
        </Header>
      </div>
      {search == undefined && (
        <div className="px-20 grid grid-cols-5 gap-6">
          Select a gift type first
        </div>
      )}
      {search != undefined && (
        <section className="px-20 grid grid-cols-5 gap-6">
          {search != "funeral" && (
            <>
              <Card
                className={cn(
                  "relative",
                  fullCake.length > 0 && "border border-primary"
                )}
                onClick={() => {
                  setFullCake([...fullCake, "fullCake"]);
                  setGlobal([...global, "fullCake"]);
                }}
              >
                <CardHeader
                  className={"flex flex-row items-center justify-between"}
                >
                  <span>full cake</span>
                  <Cake />
                </CardHeader>
              </Card>
              <Card
                className={cn(
                  "relative",
                  sliceCake.length > 0 && "border border-primary"
                )}
                onClick={() => {
                  setSliceCake([...sliceCake, "sliceCake"]);
                  setGlobal([...global, "sliceCake"]);
                }}
              >
                <CardHeader
                  className={"flex flex-row items-center justify-between"}
                >
                  <span>slice cake</span>
                  <CakeSlice />
                </CardHeader>
              </Card>
            </>
          )}

          <Card
            className={cn(
              "relative",
              letter.length > 0 && "border border-primary"
            )}
            onClick={() => {
              setLetter([...letter, "letter"]);
              setGlobal([...global, "letter"]);
            }}
          >
            <CardHeader
              className={"flex flex-row items-center justify-between"}
            >
              <span>letter</span>
              <MailOpen />
            </CardHeader>
          </Card>

          {search != "funeral" && (
            <>
              <Card
                className={cn(
                  "relative",
                  chocolates.length > 0 && "border border-primary"
                )}
                onClick={() => {
                  setChocolates([...chocolates, "chocolates"]);
                  setGlobal([...global, "chocolates"]);
                }}
              >
                <CardHeader
                  className={"flex flex-row items-center justify-between"}
                >
                  <span>chocolates</span>
                  <Candy />
                </CardHeader>
              </Card>
            </>
          )}

          {search == "funeral" && (
            <>
              <Card
                className={cn("relative", !!coffin && "border border-primary")}
                onClick={() => setCoffin(!coffin)}
              >
                <CardHeader
                  className={"flex flex-row items-center justify-between"}
                >
                  <span>coffin</span>
                  <Cross />
                </CardHeader>
              </Card>
            </>
          )}

          <Card
            className={cn(
              "relative",
              flowers.length > 0 && "border border-primary"
            )}
            onClick={() => {
              setFlowers([...flowers, "flowers"]);
              setGlobal([...global, "flowers"]);
            }}
          >
            <CardHeader
              className={"flex flex-row items-center justify-between"}
            >
              <span>flowers</span>
              <Flower2 />
            </CardHeader>
          </Card>

          {search != "funeral" && (
            <>
              <Card
                className={cn(
                  "relative",
                  giftcard.length > 0 && "border border-primary"
                )}
                onClick={() => {
                  setGiftcard([...giftcard, "giftcard"]);
                  setGlobal([...global, "giftcard"]);
                }}
              >
                <CardHeader
                  className={"flex flex-row items-center justify-between"}
                >
                  <span>giftcard</span>
                  <Heart />
                </CardHeader>
              </Card>
            </>
          )}

          <Card
            className={cn("relative", !!delivery && "border border-primary")}
            onClick={() => setDelivery(!delivery)}
          >
            <CardHeader
              className={"flex flex-row items-center justify-between"}
            >
              <span>delivery</span>
              <Truck />
            </CardHeader>
          </Card>
        </section>
      )}

      <div className="px-20 py-6">
        <Header showProfile={false} name="Your basket">
          <Gift />
        </Header>
      </div>

      <div className="px-20 flex">
        <div className="w-[400px]">
          <p>Type: {search}</p>
          <div className="flex flex-col">
            <Helper prop={fullCake} func={setFullCake} global={setGlobal} />
            <Helper prop={sliceCake} func={setSliceCake} global={setGlobal} />
            <Helper prop={letter} func={setLetter} global={setGlobal} />
            <Helper prop={chocolates} func={setChocolates} global={setGlobal} />
            <Helper prop={flowers} func={setFlowers} global={setGlobal} />
            <Helper prop={giftcard} func={setGiftcard} global={setGlobal} />

            <div>
              {!!delivery && (
                <p className="flex gap-3 items-center">
                  <p>{`delivery: ${delivery ? "yes" : "no"}`}</p>
                  <Button
                    variant={"secondary"}
                    onClick={() => setDelivery(false)}
                  >
                    clear
                  </Button>
                </p>
              )}
            </div>

            <div>
              {!!coffin && (
                <p className="flex gap-3 items-center">
                  <p>{`coffin: ${coffin ? "yes" : "no"}`}</p>
                  <Button
                    variant={"secondary"}
                    onClick={() => setCoffin(false)}
                  >
                    clear
                  </Button>
                </p>
              )}
            </div>
          </div>
        </div>
        <AnimationPlayer global={global} />
      </div>
      <Button variant={"default"} onClick={() => sendOrder()}>
        Send Order
      </Button>
    </div>
  );
};

const Helper = ({
  prop,
  func,
  global,
}: {
  prop: any;
  func: any;
  global: (prev: any) => void;
}) => {
  const help = () => {
    func([]);
    global((prev) => {
      const temp = prev.filter((i) => i != prop[0]);
      return [...temp];
    });
  };
  return (
    <div>
      {prop.length > 0 && (
        <p className="flex justify-between items-center">
          <p>{`${prop[0]}: ${prop.length}`}</p>
          <Button variant={"secondary"} onClick={() => help()}>
            clear
          </Button>
        </p>
      )}
    </div>
  );
};

export default Container;
