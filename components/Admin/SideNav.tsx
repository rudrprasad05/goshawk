import ThemeSwitcherOneClick from "@/theme/ThemeSwitcherOneClick";
import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import {
  Blocks,
  Cog,
  DollarSign,
  Home,
  MessageSquareMore,
  PackagePlus,
  PanelsTopLeft,
  SeparatorVertical,
} from "lucide-react";
import { Separator } from "../ui/separator";

const items = [
  { name: "Shop", icon: PanelsTopLeft, link: "" },
  { name: "Sales", icon: DollarSign, link: "" },
  { name: "Chat", icon: MessageSquareMore, link: "" },
  { name: "Product", icon: PackagePlus, link: "" },
  { name: "Orders", icon: Blocks, link: "" },
  { name: "Chat", icon: MessageSquareMore, link: "" },
];

const SideNav = () => {
  return (
    <Card className="rounded-none h-screen sticky top-0 w-[100px] flex flex-col bg-border">
      <div className="flex flex-col items-center gap-5 p-5 grow">
        <div className="w-min bg-background text-secondary-foreground hover:bg-background/60 transition rounded-md">
          <Link className="h-min w-min" href={"/seller/dashboard"}>
            <div className="p-3">
              <Home className="h-6 w-6" />
            </div>
          </Link>
        </div>
        <Separator />
        <div className="flex flex-col items-center gap-3">
          {items.map((i) => (
            <div
              key={i.name}
              className="w-min hover:bg-background/60 hover:text-accent-foreground transition rounded-md"
            >
              <Link className="h-min w-min" href={i.link}>
                <div className="p-3">
                  <i.icon className="h-6 w-6" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col items-center gap-3">
          <Separator />

          <ThemeSwitcherOneClick />
          <div className="w-min hover:bg-accent hover:text-accent-foreground transition rounded-md">
            <Link className="h-min w-min" href={"/seller/dashboard"}>
              <div className="p-3">
                <Cog className="h-6 w-6" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideNav;
