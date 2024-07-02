"use client";

import ThemeSwitcherOneClick from "@/theme/ThemeSwitcherOneClick";
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  Bell,
  Blocks,
  Cog,
  Home,
  LayoutDashboard,
  LucideIcon,
  Megaphone,
  MessageSquareMore,
  Package,
  ShoppingCart,
  Store,
  Info,
  User,
  Bookmark,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { DashUser, UserType } from "@/types";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Items = {
  name: string;
  icon: LucideIcon;
  link: string;
};
const SideNav = ({ user }: { user: DashUser }) => {
  // if (!user) return;
  const items: Items[] = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      link: `/account/${user?.id}/mydash`,
    },
    {
      name: "Order",
      icon: Package,
      link: `/account/${user?.id}/myorders`,
    },
    { name: "Profile", icon: User, link: `/account/${user?.id}/profile` },

    { name: "Cart", icon: ShoppingCart, link: `/cart` },
    { name: "Help", icon: Info, link: `/account/${user?.id}/help` },
    {
      name: "Wishlist",
      icon: Bookmark,
      link: `/account/${user?.id}/wishlist`,
    },
  ];

  const [openNav, setOpenNav] = useState(true);

  const toggleCollapse = () => {
    if (openNav) setOpenNav(false);
    else setOpenNav(true);
  };

  return (
    <Card
      className={cn(
        "rounded-none h-screen sticky top-0 w-[100px] flex flex-col bg-border",
        openNav && "w-max"
      )}
    >
      <div className="flex flex-col items-center gap-3 p-5 grow">
        <div className="w-full hover:bg-accent hover:text-accent-foreground flex items-start transition rounded-md">
          <Link
            className={cn("h-min w-min", openNav && "flex gap-3 items-center")}
            href={"/"}
          >
            <div className="p-3">
              <Home className="stroke-primary h-6 w-6" />
            </div>
            <div>{openNav && "Home"}</div>
          </Link>
        </div>
        <Separator className="bg-primary/50" />
        <div
          className={cn(
            "flex flex-col w-full items-center gap-3",
            openNav && "items-start"
          )}
        >
          {items.map((i) => (
            <div
              key={i.name}
              className="w-full hover:bg-background/60 hover:text-accent-foreground transition rounded-md"
            >
              <Link
                className={cn(
                  "h-min w-min",
                  openNav && "flex gap-3 items-center"
                )}
                href={i.link}
              >
                <div className="p-3 flex items-center">
                  <i.icon className="mx-auto stroke-primary h-6 w-6" />
                </div>
                <div className="">{openNav && i.name}</div>
              </Link>
            </div>
          ))}
        </div>

        <div
          className={cn(
            "flex mt-auto flex-col w-full items-center gap-2",
            openNav && "items-start"
          )}
        >
          <Separator className="bg-primary/50" />

          <ThemeSwitcherOneClick seeName={openNav} />

          <div className="w-min h-min hover:bg-accent hover:text-accent-foreground transition rounded-md">
            <button
              onClick={() => toggleCollapse()}
              className={cn("w-full", openNav && "flex gap-3 items-center")}
            >
              <div className="p-2">
                {!openNav && (
                  <ArrowRightToLine className="stroke-primary h-6 w-6" />
                )}
                {openNav && (
                  <ArrowLeftToLine className="stroke-primary h-6 w-6" />
                )}
              </div>
              {openNav && <div>Collapse</div>}
            </button>
          </div>

          <div className="w-min h-min hover:bg-accent hover:text-accent-foreground transition rounded-md">
            <Link
              className={cn(
                "h-min w-min",
                openNav && "flex gap-3 items-center"
              )}
              href={`/seller/${user?.id}/settings`}
            >
              <div className="p-2">
                <Cog className="stroke-primary h-6 w-6" />
              </div>
              <div>{openNav && "Settings"}</div>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SideNav;
